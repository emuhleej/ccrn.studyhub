'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { spawn, fork } = require('node:child_process');

const artifacts = path.join(__dirname, '..', 'test-artifacts');
const temporary = path.join(artifacts, 'tmp');
const cache = path.join(artifacts, 'cache');
fs.mkdirSync(temporary, { recursive: true });
fs.mkdirSync(cache, { recursive: true });
const args = process.argv.slice(2);
const environment = { ...process.env, TMP: temporary, TEMP: temporary, TMPDIR: temporary, PWTEST_CACHE_DIR: cache };
let server;
let runner;
let finished = false;
function finish(code) {
  if (finished) return;
  finished = true;
  if (server?.connected) server.send('shutdown');
  const timer = setTimeout(() => { server?.kill(); process.exit(code); }, 2_000);
  timer.unref();
  if (server && server.exitCode === null) server.once('exit', () => { clearTimeout(timer); process.exit(code); });
  else { clearTimeout(timer); process.exit(code); }
}
function run() {
  runner = spawn(process.execPath, [require.resolve('@playwright/test/cli'), ...args], { stdio: 'inherit', env: environment });
  runner.on('error', error => { console.error(error.message); finish(1); });
  runner.on('exit', code => finish(code ?? 1));
}
if (args[0] === 'test' && !args.includes('--list')) {
  environment.CCRN_TEST_MANAGED_SERVER = '1';
  server = fork(path.join(__dirname, 'server.cjs'), [], { stdio: ['ignore', 'inherit', 'inherit', 'ipc'], env: environment });
  server.once('message', message => { if (message.ready) run(); });
  server.once('error', error => { console.error(error.message); finish(1); });
  server.once('exit', code => { if (!runner && !finished) finish(code || 1); });
} else run();
process.on('SIGINT', () => { runner?.kill('SIGINT'); finish(130); });
process.on('SIGTERM', () => { runner?.kill('SIGTERM'); finish(143); });
