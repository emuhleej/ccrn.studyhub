'use strict';
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const root = path.resolve(process.env.CCRN_TEST_ROOT || path.join(__dirname, '..'));
const port = Number(process.env.CCRN_TEST_PORT || 4173);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Invalid test port');
const allowed = new Map([
  ['/', 'index.html'], ['/index.html', 'index.html'],
  ['/learning-lab.js', 'learning-lab.js'], ['/firebase-config.js', 'firebase-config.js'],
  ['/study-state.js', 'study-state.js'], ['/clinical-gate.js', 'clinical-gate.js'],
  ['/clinical-review.js', 'clinical-review.js']
]);
const server = http.createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return;
  }
  const rawPath = req.url.split('?')[0];
  if (rawPath === '/__test_health') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('CCRN isolated browser test server'); return;
  }
  const filename = allowed.get(rawPath);
  if (!filename) { res.writeHead(404); res.end('Not found'); return; }
  try {
    const realRoot = await fs.realpath(root);
    const file = await fs.realpath(path.join(realRoot, filename));
    if (path.dirname(file).toLowerCase() !== realRoot.toLowerCase()) throw new Error('Outside test root');
    const body = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type': filename.endsWith('.html') ? 'text/html; charset=utf-8' : 'text/javascript; charset=utf-8' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch {
    res.writeHead(404); res.end('Not found');
  }
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Isolated browser test server: http://127.0.0.1:${port}`);
  process.send?.({ ready: true });
});
process.on('message', message => { if (message === 'shutdown') server.close(() => process.exit(0)); });
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.close(() => process.exit(0)));
