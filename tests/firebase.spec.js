const { test, expect } = require('./fixtures.js');

const ownerPath = 'users/browser-test-owner/study/adult-ccrn-hub';
const topic = 'Acute coronary syndrome';
const remoteState = {
  progress: { [topic]: { notes: 'Synthetic cloud note', chk: { 0: true } } },
  weak: { ACS: 2 },
  attempts: [{ stem: 'Synthetic previous question', topic: 'ACS', sys: 'cv', correct: false, at: '2026-11-01T10:00:00.000Z', mode: 'quiz' }]
};

async function reader(page) {
  await page.getByRole('button', { name: 'Topic Library', exact: true }).click();
  await page.locator('.sys-head').first().click();
  await page.locator('.sys-body.open .sub').filter({ hasText: topic }).click();
  return page.locator('#rdContent textarea');
}
async function saved(page, key) {
  return page.evaluate(name => JSON.parse(localStorage.getItem(name)), key);
}

test('empty configuration stays local and never loads Firebase modules', async ({ page, firebase }) => {
  await page.goto('/');
  await expect(page.locator('#syncStatus')).toHaveText('Saved on this device');
  await (await reader(page)).fill('Local-only note');
  expect((await saved(page, 'ccrn_progress'))[topic].notes).toBe('Local-only note');
  expect(firebase.calls).toEqual([]);
  expect(firebase.modules).toEqual([]);
});

test.describe('placeholder configuration', () => {
  test.use({ firebaseMock: { config: { apiKey: 'PASTE_API_KEY', projectId: 'PASTE_PROJECT_ID' } } });
  test('does not initialize a cloud connection', async ({ page, firebase }) => {
    await page.goto('/');
    await expect(page.locator('#syncStatus')).toHaveText('Saved on this device');
    expect(firebase.calls).toEqual([]);
    expect(firebase.modules).toEqual([]);
  });
});

test.describe('unreachable module', () => {
  test.use({
    firebaseMock: { config: { apiKey: 'synthetic-offline-key', projectId: 'demo-offline-tests' } },
    expectedBlockedRequests: ['https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js']
  });
  test('offline Firebase initialization keeps local notes usable', async ({ page, firebase }) => {
    await page.goto('/');
    await expect(page.locator('#syncStatus')).toContainText('Saved on this device');
    await (await reader(page)).fill('Still available offline');
    expect((await saved(page, 'ccrn_progress'))[topic].notes).toBe('Still available offline');
    expect(firebase.writes).toEqual([]);
  });
});

test.describe('mocked Firebase ES modules', () => {
  test.use({ firebaseMock: { enabled: true, initialData: remoteState } });

  test('reads real application state through the owner path and restores the reader', async ({ page, firebase }) => {
    await page.goto('/');
    await expect(page.locator('#syncStatus')).toHaveText('Synced');
    expect(firebase.modules).toEqual(['firebase-app', 'firebase-auth', 'firebase-firestore']);
    expect(firebase.reads).toEqual([{ path: ownerPath }]);
    expect(firebase.calls.find(call => call.action === 'subscribe').payload.path).toBe(ownerPath);
    await expect(await reader(page)).toHaveValue('Synthetic cloud note');
    await expect(page.locator('#rdContent input[type="checkbox"]').first()).toBeChecked();
    expect(await saved(page, 'ccrn_attempts')).toEqual(remoteState.attempts);
    expect(firebase.writes).toEqual([]);
  });

  test('writes edited notes, checkbox state, weak areas and actual quiz attempts to the owner document', async ({ page, firebase }) => {
    await page.goto('/');
    await expect(page.locator('#syncStatus')).toHaveText('Synced');
    await (await reader(page)).fill('Changed through the visible notes field');
    await page.locator('#rdContent input[type="checkbox"]').nth(1).check();
    await page.getByRole('button', { name: 'Quiz', exact: true }).click();
    await page.locator('#startQuiz').click();
    const question = await page.evaluate(() => quiz[qIdx]);
    await page.locator(`#qOpts [data-i="${(question.a + 1) % question.o.length}"]`).click();
    await expect.poll(() => firebase.data?.attempts?.length).toBe(2);
    expect(firebase.writes.every(write => write.path === ownerPath && write.options.merge === true)).toBe(true);
    expect(firebase.data.progress[topic].notes).toBe('Changed through the visible notes field');
    expect(firebase.data.progress[topic].chk[1]).toBe(true);
    expect(firebase.data.attempts.at(-1)).toMatchObject({ stem: question.q, topic: question.topic, sys: question.sys, correct: false, mode: 'quiz' });
    expect(firebase.data.weak[question.topic]).toBe((remoteState.weak[question.topic] || 0) + 1);
    expect(firebase.data.updatedAt).toEqual({ __testServerTimestamp: true });
  });

  test('a failed write keeps local edits and the next edit can sync successfully', async ({ page, firebase }) => {
    await page.goto('/');
    await expect(page.locator('#syncStatus')).toHaveText('Synced');
    const notes = await reader(page);
    firebase.failWrites = 1;
    await notes.fill('Kept locally after synthetic failure');
    await expect.poll(() => firebase.writes.length).toBe(1);
    await expect(page.locator('#syncStatus')).toContainText('Saved on this device');
    expect((await saved(page, 'ccrn_progress'))[topic].notes).toBe('Kept locally after synthetic failure');
    expect(firebase.data.progress[topic].notes).toBe('Synthetic cloud note');
    await notes.fill('Recovered on the next save');
    await expect.poll(() => firebase.data.progress[topic].notes).toBe('Recovered on the next save');
    await expect(page.locator('#syncStatus')).toHaveText('Synced');
    expect(firebase.writes).toHaveLength(2);
  });

  test('an old snapshot after a failed write cannot discard an unsynced local note', async ({ page, firebase }) => {
    await page.goto('/');
    await expect(page.locator('#syncStatus')).toHaveText('Synced');
    const notes = await reader(page);
    firebase.failWrites = 1;
    await notes.fill('Unsynced local note must survive');
    await expect.poll(() => firebase.writes.length).toBe(1);
    await expect(page.locator('#syncStatus')).toContainText('Saved on this device');
    await firebase.emitRemote(page, {
      ...remoteState,
      progress: { ...remoteState.progress, 'Heart failure': { notes: 'Another remote note', chk: { 2: true } } }
    });
    expect((await saved(page, 'ccrn_progress'))[topic].notes).toBe('Unsynced local note must survive');
    await expect(page.locator('#syncStatus')).not.toHaveText('Synced');
    await notes.fill('Retried local note');
    await expect.poll(() => firebase.data.progress[topic].notes).toBe('Retried local note');
    expect(firebase.data.progress['Heart failure'].notes).toBe('Another remote note');
    await expect(page.locator('#syncStatus')).toHaveText('Synced');
  });

  test('a note saved locally after a cloud write failure survives reload and retries', async ({ page, firebase }) => {
    await page.goto('/');
    await expect(page.locator('#syncStatus')).toHaveText('Synced');
    firebase.failWrites = 1;
    await (await reader(page)).fill('Unsynced note kept across reload');
    await expect.poll(() => firebase.writes.length).toBe(1);
    await expect(page.locator('#syncStatus')).toContainText('Saved on this device');
    expect((await saved(page, 'ccrn_progress'))[topic].notes).toBe('Unsynced note kept across reload');
    expect(firebase.data.progress[topic].notes).toBe('Synthetic cloud note');
    await page.reload();
    await expect(page.locator('#syncStatus')).toHaveText('Synced');
    expect((await saved(page, 'ccrn_progress'))[topic].notes).toBe('Unsynced note kept across reload');
    await expect.poll(() => firebase.data.progress[topic].notes).toBe('Unsynced note kept across reload');
    await expect(await reader(page)).toHaveValue('Unsynced note kept across reload');
  });

  test('remote snapshot updates the current progress view without executing supplied text', async ({ page, firebase }) => {
    await page.goto('/');
    await expect(page.locator('#syncStatus')).toHaveText('Synced');
    await page.getByRole('button', { name: 'Progress', exact: true }).click();
    const unsafe = '<img src=x onerror="window.__cloudInjected=1">';
    await firebase.emitRemote(page, { ...remoteState, weak: { [unsafe]: 3 } });
    await expect(page.locator('#weakList img')).toHaveCount(0);
    expect(await page.evaluate(() => window.__cloudInjected)).toBeUndefined();
    expect((await saved(page, 'ccrn_weak'))[unsafe]).toBe(3);
    expect(firebase.writes).toEqual([]);
  });

  test('snapshot errors stop cloud writes while local edits remain available', async ({ page, firebase }) => {
    await page.goto('/');
    await expect(page.locator('#syncStatus')).toHaveText('Synced');
    await firebase.emitSnapshotError(page);
    await expect(page.locator('#syncStatus')).toContainText('Saved on this device');
    await page.clock.install();
    await (await reader(page)).fill('Local after snapshot failure');
    await page.clock.runFor(1000);
    expect(firebase.writes).toEqual([]);
    expect((await saved(page, 'ccrn_progress'))[topic].notes).toBe('Local after snapshot failure');
  });
});

test.describe('failed cloud read', () => {
  test.use({ firebaseMock: { enabled: true, failRead: true, initialData: remoteState } });
  test('does not overwrite an unread remote document after a local edit', async ({ page, firebase }) => {
    await page.goto('/');
    await expect.poll(() => firebase.reads.length).toBe(1);
    await expect(page.locator('#syncStatus')).toContainText('Saved on this device');
    await page.clock.install();
    await (await reader(page)).fill('Local data survives a read failure');
    await page.clock.runFor(1000);
    expect(firebase.writes).toEqual([]);
    expect(firebase.data).toEqual(remoteState);
    expect((await saved(page, 'ccrn_progress'))[topic].notes).toBe('Local data survives a read failure');
  });
});

test.describe('failed authentication', () => {
  test.use({ firebaseMock: { enabled: true, failAuth: true } });
  test('does not read or write a document without an authenticated owner', async ({ page, firebase }) => {
    await page.goto('/');
    await expect(page.locator('#syncStatus')).toContainText('Saved on this device');
    await (await reader(page)).fill('Local after auth failure');
    expect(firebase.reads).toEqual([]);
    expect(firebase.writes).toEqual([]);
  });
});

test.describe('invalid cloud schema', () => {
  test.use({ firebaseMock: { enabled: true, initialData: { progress: [], weak: 'bad', attempts: {} } } });
  test('rejects invalid cloud shapes while preserving existing local records', async ({ page, firebase }) => {
    await page.addInitScript(state => {
      localStorage.setItem('ccrn_progress', JSON.stringify(state.progress));
      localStorage.setItem('ccrn_weak', JSON.stringify(state.weak));
      localStorage.setItem('ccrn_attempts', JSON.stringify(state.attempts));
    }, remoteState);
    await page.goto('/');
    await expect.poll(() => firebase.reads.length).toBe(1);
    await expect(page.locator('#syncStatus')).toContainText('Saved on this device');
    await expect(await reader(page)).toHaveValue('Synthetic cloud note');
    expect(await saved(page, 'ccrn_weak')).toEqual(remoteState.weak);
    expect(await saved(page, 'ccrn_attempts')).toEqual(remoteState.attempts);
    expect(firebase.writes).toEqual([]);
  });
});

const malformedNestedState = { progress: { [topic]: { notes: 7, chk: null } }, weak: { ACS: {} }, attempts: [null, 7, {}] };
test.describe('invalid nested initial cloud state', () => {
  test.use({ firebaseMock: { enabled: true, initialData: malformedNestedState } });
  test('malformed nested cloud fields cannot erase valid local records on initial read', async ({ page, firebase }) => {
    await page.addInitScript(state => {
      localStorage.setItem('ccrn_progress', JSON.stringify(state.progress));
      localStorage.setItem('ccrn_weak', JSON.stringify(state.weak));
      localStorage.setItem('ccrn_attempts', JSON.stringify(state.attempts));
    }, remoteState);
    await page.goto('/');
    await expect.poll(() => firebase.reads.length).toBe(1);
    await expect(page.locator('#syncStatus')).not.toHaveText('Connecting...');
    expect(await saved(page, 'ccrn_progress')).toEqual(remoteState.progress);
    expect(await saved(page, 'ccrn_weak')).toEqual(remoteState.weak);
    expect(await saved(page, 'ccrn_attempts')).toEqual(remoteState.attempts);
    await expect(page.locator('#syncStatus')).toContainText('Saved on this device');
    expect(firebase.writes).toEqual([]);
  });
});

test.describe('invalid nested cloud snapshot', () => {
  test.use({ firebaseMock: { enabled: true, initialData: remoteState } });
  test('malformed nested snapshot fields cannot erase valid local records', async ({ page, firebase }) => {
    await page.goto('/');
    await expect(page.locator('#syncStatus')).toHaveText('Synced');
    await firebase.emitRemote(page, malformedNestedState);
    expect(await saved(page, 'ccrn_progress')).toEqual(remoteState.progress);
    expect(await saved(page, 'ccrn_weak')).toEqual(remoteState.weak);
    expect(await saved(page, 'ccrn_attempts')).toEqual(remoteState.attempts);
    await expect(page.locator('#syncStatus')).toContainText('Saved on this device');
    expect(firebase.writes).toEqual([]);
  });
});

test.describe('new owner document', () => {
  test.use({ firebaseMock: { enabled: true, initialData: null } });
  test('creates only the current anonymous owner document from the local state', async ({ page, firebase }) => {
    await page.addInitScript(state => localStorage.setItem('ccrn_progress', JSON.stringify(state.progress)), remoteState);
    await page.goto('/');
    await expect.poll(() => firebase.writes.length).toBe(1);
    expect(firebase.writes[0].path).toBe(ownerPath);
    expect(firebase.data.progress[topic]).toEqual(remoteState.progress[topic]);
    expect(firebase.data.attempts).toEqual([]);
    await expect(page.locator('#syncStatus')).toHaveText('Synced');
  });

  test('a failed first upload keeps existing local notes when a remote snapshot arrives', async ({ page, firebase }) => {
    firebase.failWrites = 1;
    const localNote = 'Existing local note before the first cloud document';
    await page.addInitScript(({ topic, note }) => localStorage.setItem('ccrn_progress', JSON.stringify({ [topic]: { notes: note, chk: { 0: true } } })), { topic, note: localNote });
    await page.goto('/');
    await expect.poll(() => firebase.writes.length).toBe(1);
    await expect(page.locator('#syncStatus')).toContainText('Saved on this device');
    expect((await saved(page, 'ccrn_progress'))[topic].notes).toBe(localNote);
    await firebase.emitRemote(page, remoteState);
    expect.soft((await saved(page, 'ccrn_progress'))[topic].notes).toBe(localNote);
    await expect(page.locator('#syncStatus')).not.toHaveText('Synced');
  });
});

for (const phase of ['read', 'authentication']) {
  test.describe(`delayed initial ${phase}`, () => {
    test.use({ firebaseMock: { enabled: true, initialData: remoteState, [phase === 'read' ? 'holdReads' : 'holdAuth']: true } });
    test(`notes typed while the initial ${phase} is pending survive the cloud response`, async ({ page, firebase }) => {
      await page.goto('/');
      await expect.poll(() => phase === 'read' ? firebase.reads.length : firebase.calls.filter(call => call.action === 'signInAnonymously').length).toBe(1);
      await (await reader(page)).fill(`Typed while ${phase} is pending`);
      if (phase === 'read') firebase.releaseReads(); else firebase.releaseAuth();
      await expect(page.locator('#syncStatus')).toHaveText('Synced');
      expect((await saved(page, 'ccrn_progress'))[topic].notes).toBe(`Typed while ${phase} is pending`);
      await expect.poll(() => firebase.data.progress[topic].notes).toBe(`Typed while ${phase} is pending`);
    });
  });
}

test.describe('delayed overlapping writes', () => {
  test.use({ firebaseMock: { enabled: true, initialData: remoteState, holdWrites: true } });
  test('an older slow save cannot overwrite the newer edit', async ({ page, firebase }) => {
    await page.goto('/');
    await expect(page.locator('#syncStatus')).toHaveText('Synced');
    await page.clock.install();
    const notes = await reader(page);
    await notes.fill('First edit');
    await page.clock.runFor(500);
    await expect.poll(() => firebase.writes.length).toBe(1);
    await notes.fill('Latest edit');
    await page.clock.runFor(500);
    // A concurrent adapter permits the newer response to arrive first. A
    // serialized adapter starts its second write only after the first settles.
    if (firebase.writes.length > 1) {
      firebase.releaseWrite(1);
      await expect.poll(() => firebase.completedWrites).toContain(1);
      firebase.releaseWrite(0);
    } else {
      firebase.releaseWrite(0);
      await expect.poll(() => firebase.writes.length).toBe(2);
      firebase.releaseWrite(1);
    }
    await expect.poll(() => firebase.completedWrites.length).toBe(2);
    expect(firebase.data.progress[topic].notes).toBe('Latest edit');
    expect((await saved(page, 'ccrn_progress'))[topic].notes).toBe('Latest edit');
    await expect(notes).toHaveValue('Latest edit');
  });
});

test.describe('edits during an initial read with remote-only records', () => {
  const remoteWithUntouchedTopic = {
    ...remoteState,
    progress: { ...remoteState.progress, 'Heart failure': { notes: 'Remote-only study note', chk: { 2: true } } }
  };
  test.use({ firebaseMock: { enabled: true, holdReads: true, initialData: remoteWithUntouchedTopic } });
  test('preserves untouched cloud notes and history alongside new local learning', async ({ page, firebase }) => {
    await page.goto('/');
    await expect.poll(() => firebase.reads.length).toBe(1);
    await (await reader(page)).fill('New local note while the cloud read is pending');
    await page.getByRole('button', { name: 'Quiz', exact: true }).click();
    await page.locator('#startQuiz').click();
    const question = await page.evaluate(() => quiz[qIdx]);
    await page.locator(`#qOpts [data-i="${(question.a + 1) % question.o.length}"]`).click();
    firebase.releaseReads();
    await expect(page.locator('#syncStatus')).toHaveText('Synced');
    await expect.poll(() => firebase.writes.length).toBe(1);
    const localProgress = await saved(page, 'ccrn_progress');
    expect(localProgress[topic].notes).toBe('New local note while the cloud read is pending');
    expect(localProgress['Heart failure']).toEqual(remoteWithUntouchedTopic.progress['Heart failure']);
    expect(firebase.data.progress).toEqual(localProgress);
    const localAttempts = await saved(page, 'ccrn_attempts');
    expect(localAttempts).toHaveLength(2);
    expect(localAttempts).toContainEqual(remoteState.attempts[0]);
    expect(localAttempts).toEqual(expect.arrayContaining([expect.objectContaining({ stem: question.q, correct: false })]));
    expect(firebase.data.attempts).toEqual(localAttempts);
    const expectedWeak = { ...remoteState.weak, [question.topic]: (remoteState.weak[question.topic] || 0) + 1 };
    expect(await saved(page, 'ccrn_weak')).toEqual(expectedWeak);
    expect(firebase.data.weak).toEqual(expectedWeak);
  });
});

test.describe('retrying an initial merge after upload failure', () => {
  test.use({ firebaseMock: {
    enabled: true, holdReads: true, failWrites: 1,
    initialData: { ...remoteState, weak: {}, progress: { ...remoteState.progress, 'Heart failure': { notes: 'Original remote-only note', chk: { 2: true } } } }
  } });
  test('a merged retry counts a new miss once and keeps newer untouched remote notes', async ({ page, firebase }) => {
    await page.goto('/');
    await expect.poll(() => firebase.reads.length).toBe(1);
    await page.getByRole('button', { name: 'Quiz', exact: true }).click();
    await page.locator('#startQuiz').click();
    const question = await page.evaluate(() => quiz[qIdx]);
    await page.locator(`#qOpts [data-i="${(question.a + 1) % question.o.length}"]`).click();
    expect((await saved(page, 'ccrn_weak'))[question.topic]).toBe(1);
    firebase.data.weak = { [question.topic]: 2 };
    firebase.holdReads = false;
    firebase.releaseReads();
    await expect.poll(() => firebase.writes.length).toBe(1);
    await expect(page.locator('#syncStatus')).toContainText('Saved on this device');
    expect((await saved(page, 'ccrn_weak'))[question.topic]).toBe(3);
    expect((await saved(page, 'ccrn_progress'))['Heart failure'].notes).toBe('Original remote-only note');
    expect(firebase.data.weak[question.topic]).toBe(2);
    firebase.data.progress['Heart failure'].notes = 'Newer remote-only note';
    await page.reload();
    await expect(page.locator('#syncStatus')).toHaveText('Synced');
    await expect.poll(() => firebase.writes.length).toBe(2);
    expect.soft((await saved(page, 'ccrn_weak'))[question.topic]).toBe(3);
    expect.soft(firebase.data.weak[question.topic]).toBe(3);
    expect.soft((await saved(page, 'ccrn_progress'))['Heart failure'].notes).toBe('Newer remote-only note');
    expect.soft(firebase.data.progress['Heart failure'].notes).toBe('Newer remote-only note');
    expect((await saved(page, 'ccrn_attempts')).filter(attempt => attempt.stem === question.q)).toHaveLength(1);
  });
});
