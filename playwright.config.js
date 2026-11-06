const { defineConfig } = require('@playwright/test');
const path = require('node:path');

const port = Number(process.env.CCRN_TEST_PORT || 4173);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Invalid test port');
const baseURL = `http://127.0.0.1:${port}`;
const reportRoot = process.env.CCRN_TEST_REPORT_DIR || '.';

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: process.env.CI ? 2 : 3,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  outputDir: path.join(reportRoot, 'test-results'),
  reporter: [
    ['list'],
    ['html', { outputFolder: path.join(reportRoot, 'playwright-report'), open: 'never' }],
    ['json', { outputFile: path.join(reportRoot, 'test-results', 'results.json') }],
    ['junit', { outputFile: path.join(reportRoot, 'test-results', 'results.xml') }]
  ],
  use: {
    baseURL,
    serviceWorkers: 'block',
    acceptDownloads: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    reducedMotion: 'reduce'
  },
  projects: [
    { name: 'desktop-chromium', use: { browserName: 'chromium', viewport: { width: 1280, height: 900 } } },
    { name: 'mobile-chromium', use: { browserName: 'chromium', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 } }
  ],
  webServer: process.env.CCRN_TEST_MANAGED_SERVER ? undefined : {
    command: 'node tests/server.cjs',
    url: `${baseURL}/__test_health`,
    reuseExistingServer: false,
    timeout: 15_000,
    env: { CCRN_TEST_PORT: String(port) }
  }
});
