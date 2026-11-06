const { test: base, expect } = require('@playwright/test');

// Firestore merge:true updates leaf fields. Arrays and explicitly empty maps
// replace that field; omitted nested fields remain. This models only the
// JSON-compatible subset used by this app, not SDK cache/rule behavior.
function mergeFirestoreData(current, patch) {
  if (!patch || typeof patch !== 'object' || Array.isArray(patch)) return structuredClone(patch);
  const entries = Object.entries(patch);
  if (!entries.length) return {};
  const result = current && typeof current === 'object' && !Array.isArray(current) ? structuredClone(current) : {};
  for (const [key, value] of entries) Object.defineProperty(result, key, { value: mergeFirestoreData(result[key], value), enumerable: true, configurable: true, writable: true });
  return result;
}

const appModule = `
export function initializeApp(config) {
  window.__ccrnFirebaseCall('initializeApp', { config });
  return { name: 'isolated-browser-test', options: config };
}`;
const authModule = `
export function getAuth() { return { currentUser: null }; }
export async function signInAnonymously(auth) {
  const user = await window.__ccrnFirebaseCall('signInAnonymously', {});
  auth.currentUser = user;
  return { user };
}`;
const firestoreModule = `
const listeners = new Set();
const snapshot = data => ({ exists: () => data !== null, data: () => structuredClone(data) });
export function getFirestore() { return { name: 'isolated-browser-test' }; }
export function doc(db, ...segments) { return { path: segments.join('/') }; }
export function serverTimestamp() { return { __testServerTimestamp: true }; }
export async function getDoc(ref) {
  return snapshot(await window.__ccrnFirebaseCall('getDoc', { path: ref.path }));
}
export async function setDoc(ref, data, options) {
  const saved = await window.__ccrnFirebaseCall('setDoc', { path: ref.path, data, options });
  for (const listener of listeners) listener.next(snapshot(saved));
}
export function onSnapshot(ref, next, error) {
  const listener = { next, error };
  listeners.add(listener);
  window.__ccrnFirebaseCall('subscribe', { path: ref.path });
  return () => listeners.delete(listener);
}
window.__ccrnMockRemote = data => { for (const listener of listeners) listener.next(snapshot(data)); };
window.__ccrnMockSnapshotError = () => { for (const listener of listeners) listener.error?.(new Error('Synthetic snapshot failure')); };
`;

const test = base.extend({
  firebaseMock: [{ enabled: false }, { option: true }],
  expectedBlockedRequests: [[], { option: true }],
  firebase: async ({ firebaseMock }, use) => {
    const pendingReads = [], pendingAuth = [], pendingWrites = new Map();
    const state = {
      enabled: false, uid: 'browser-test-owner', initialData: null,
      failAuth: false, failRead: false, failWrites: 0,
      ...structuredClone(firebaseMock),
      calls: [], reads: [], writes: [], completedWrites: [], modules: [], blocked: [], local: [],
      data: structuredClone(firebaseMock.initialData ?? null),
      releaseReads() { pendingReads.splice(0).forEach(release => release()); },
      releaseAuth() { pendingAuth.splice(0).forEach(release => release()); },
      releaseWrite(index) { const release = pendingWrites.get(index); pendingWrites.delete(index); release?.(); },
      releaseWrites() { for (const release of pendingWrites.values()) release(); pendingWrites.clear(); },
      waitForRead() { return new Promise(resolve => pendingReads.push(resolve)); },
      waitForAuth() { return new Promise(resolve => pendingAuth.push(resolve)); },
      waitForWrite(index) { return new Promise(resolve => pendingWrites.set(index, resolve)); },
      async emitRemote(page, data) {
        state.data = structuredClone(data);
        await page.evaluate(value => window.__ccrnMockRemote(value), data);
      },
      async emitSnapshotError(page) {
        await page.evaluate(() => window.__ccrnMockSnapshotError());
      }
    };
    try { await use(state); } finally { state.releaseReads(); state.releaseAuth(); state.releaseWrites(); }
  },
  networkSafety: [async ({ context, firebase, baseURL, expectedBlockedRequests }, use, testInfo) => {
    const appOrigin = new URL(baseURL).origin;
    await context.exposeBinding('__ccrnFirebaseCall', async (_, action, payload) => {
      firebase.calls.push({ action, payload });
      if (action === 'initializeApp') return null;
      if (action === 'signInAnonymously') {
        if (firebase.holdAuth) await firebase.waitForAuth();
        if (firebase.failAuth) throw new Error('Synthetic authentication failure');
        return { uid: firebase.uid };
      }
      if (action === 'getDoc') {
        firebase.reads.push(payload);
        if (firebase.holdReads) await firebase.waitForRead();
        if (firebase.failRead) throw new Error('Synthetic read failure');
        return structuredClone(firebase.data);
      }
      if (action === 'setDoc') {
        const index = firebase.writes.push(structuredClone(payload)) - 1;
        if (firebase.holdWrites) await firebase.waitForWrite(index);
        if (firebase.failWrites > 0) { firebase.failWrites--; throw new Error('Synthetic write failure'); }
        firebase.data = payload.options?.merge ? mergeFirestoreData(firebase.data, payload.data) : structuredClone(payload.data);
        firebase.completedWrites.push(index);
        return structuredClone(firebase.data);
      }
      return null;
    });
    await context.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.origin === appOrigin && url.pathname === '/firebase-config.js') {
        const config = firebase.config ?? (firebase.enabled ? {
          apiKey: 'test-only-no-network-key', projectId: 'demo-ccrn-browser-tests',
          authDomain: 'firebase-test.invalid', appId: 'synthetic-browser-app'
        } : {});
        return route.fulfill({ contentType: 'text/javascript', body: `window.CCRN_FIREBASE_CONFIG=${JSON.stringify(config)};window.CCRN_FIREBASE_DOC_PATH='study/SHARED-PATH-MUST-NOT-BE-USED';` });
      }
      if (firebase.enabled && url.origin === 'https://www.gstatic.com') {
        const match = /^\/firebasejs\/10\.12\.5\/(firebase-app|firebase-auth|firebase-firestore)\.js$/.exec(url.pathname);
        if (match) {
          firebase.modules.push(match[1]);
          return route.fulfill({ contentType: 'text/javascript', headers: { 'Access-Control-Allow-Origin': '*' }, body: {
            'firebase-app': appModule, 'firebase-auth': authModule, 'firebase-firestore': firestoreModule
          }[match[1]] });
        }
      }
      if (url.origin === appOrigin) { firebase.local.push(url.pathname); return route.continue(); }
      firebase.blocked.push(url.href);
      return route.abort('blockedbyclient');
    });
    await context.routeWebSocket('**/*', socket => { firebase.blocked.push(socket.url()); socket.close(); });
    await use();
    await testInfo.attach('network-boundary.json', {
      body: JSON.stringify({ mockedModules: firebase.modules, blocked: firebase.blocked, local: firebase.local, firebaseCalls: firebase.calls }, null, 2),
      contentType: 'application/json'
    });
    expect(firebase.blocked.filter(url => !expectedBlockedRequests.includes(url)), 'Unexpected external requests were blocked by the test boundary').toEqual([]);
  }, { auto: true }],
  runtimeErrors: [async ({ context }, use, testInfo) => {
    const errors = [];
    context.on('page', page => page.on('pageerror', error => errors.push(error.message)));
    await use(errors);
    if (errors.length) await testInfo.attach('browser-errors.json', { body: JSON.stringify(errors, null, 2), contentType: 'application/json' });
    expect(errors, 'Unhandled browser exceptions').toEqual([]);
  }, { auto: true }]
});

module.exports = { test, expect };
