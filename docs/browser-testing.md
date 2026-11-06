# Browser regression tests

These tests exercise the static app in real Chromium, at desktop 1280 × 900 and mobile 390 × 844 sizes. A separate layout check covers 320 px. They use fresh browser contexts and synthetic learning records. No production Firebase project, deployed site, user account, or real learning record is needed.

## Run locally

Use Node.js 20 or newer. From the repository directory:

```powershell
npm ci --cache .npm-cache
npx playwright install chromium
npm test
```

`npm test` runs the pure state/clinical-gate checks, then both browser projects. The dependency and lockfile pin Playwright 1.62.1. If its Chromium build is already installed, the browser installation command reuses it.

Useful smaller runs:

```powershell
npm run test:unit
npm run test:desktop
npm run test:mobile
npm run test:e2e -- tests/firebase.spec.js --project=desktop-chromium
npm run test:report
```

The wrapper stores temporary browser profiles and the transform cache under ignored `test-artifacts/`, which also works in the restricted Windows workspace. It forks the allowlisted local server directly, waits for its ready signal, and shuts it down over IPC after tests. This avoids a shell-based Windows process-tree cleanup problem. A run fails if its port is already occupied; it never reuses an unknown server.

For parallel independent work, set a separate port and report destination:

```powershell
$env:CCRN_TEST_PORT = '4180'
$env:CCRN_TEST_REPORT_DIR = 'test-artifacts/focused-run'
npm run test:e2e -- tests/learning-lab.spec.js --project=desktop-chromium
```

Remove those environment settings in the same shell when returning to the default run. No environment changes are required for ordinary `npm test`.

## Coverage

- Primary navigation, study-hour allocation, reference links, notes, and checklist persistence.
- Quiz system filters, length, answer locking, correct/incorrect history, weak areas, score, reset, and adaptive ordering.
- Keyboard operation, feedback focus, accessible notes, and narrow layout.
- Corrupt or invalid saved data, storage failures, and untrusted text rendering.
- Learning laboratory review scheduling, case stages, analytics, backup download/import, invalid/oversized files, and preservation on import or storage errors.
- Clinical evidence gating and withheld-question behavior.
- Firebase configuration absence, offline initialization, successful reads/writes, owner path, authentication/read/write/listener errors, invalid top-level/nested remote state, and local fallback. Controlled delayed responses cover edits during initial authentication/read, preservation of untouched remote records, an older save completing after a newer edit, snapshots following a failed save, and recovery of an unsynced note after reload. Retrying a failed initial merge must count each new miss once and retain newer remote notes in untouched topics.

`tests/fixtures.js` exports `{ test, expect }`. Every browser spec must import this fixture. It asserts that no unhandled browser exception occurs and that no unexpected external request is attempted.

## Network and Firebase boundary

Before navigation, the fixture intercepts every HTTP request in the browser context. Only the exact loopback app origin may reach the local server. WebSockets and every other destination are blocked. Service workers are disabled. A test that intentionally probes a blocked address must name that exact address in `expectedBlockedRequests`.

The local server listens only on `127.0.0.1` and serves an explicit list of app files. It does not expose repository metadata, tests, package files, arbitrary paths, or symlink targets outside the selected root.

The fixture always replaces `firebase-config.js` with empty or synthetic configuration. Cloud tests fulfill the three exact Firebase 10.12.5 ES module imports with local test implementations. They never download or execute the Firebase SDK and never contact Firebase services. In-memory state, reads, attempted writes, injected errors, and snapshots are scoped to one browser test. `holdAuth`, `holdReads`, and `holdWrites` pause the test-side promises until the test explicitly releases them; the virtual browser clock advances the app's debounce. No fixed network sleeps are used. Each test report includes `network-boundary.json` with mocked modules and request/call evidence.

This tests the application's Firebase adapter contract and recovery behavior. It does **not** verify production Firestore rules, deployed authentication configuration, SDK internals, real cross-device conflicts, or production connectivity. Those require a separately authorized emulator or disposable project exercise.

For this app's JSON-compatible state, the mock models Firestore's granular `merge: true` behavior: omitted nested fields stay, supplied arrays replace the array, and an explicitly empty map replaces that map. The initial test fixture replaced whole documents and was corrected before the final preservation checks. Earlier baseline assertions about local storage, attempted write payloads, scalar overwrites, and replaced history arrays remain valid; do not infer deletion of every omitted nested cloud field from that early mock. See the primary [Firestore set/merge documentation](https://firebase.google.com/docs/firestore/manage-data/add-data).

## Reports and reproducing the original baseline

The default report is `playwright-report/index.html`; structured JSON/JUnit and failure screenshots/traces are under `test-results/`. Successful navigation, quiz, reader, and learning-lab checks also attach screenshots for visual review. Reports and temporary artifacts are ignored by Git. Tests have no retries, so failures are visible rather than hidden by reruns.

For the recorded original baseline, the app files came from commit `d1e81ec` before these changes. To reproduce that baseline without modifying the working files:

```powershell
New-Item -ItemType Directory -Force .test-baseline | Out-Null
foreach ($file in @('index.html', 'learning-lab.js', 'firebase-config.js')) {
  $source = git show "d1e81ec:$file"
  [IO.File]::WriteAllText((Join-Path (Resolve-Path .test-baseline) $file), ($source -join "`n"), [Text.UTF8Encoding]::new($false))
}
$env:CCRN_TEST_ROOT = (Resolve-Path .test-baseline).Path
$env:CCRN_TEST_REPORT_DIR = 'test-artifacts/baseline'
npm run test:e2e -- tests/app.spec.js tests/firebase.spec.js --project=desktop-chromium
```

Reset `CCRN_TEST_ROOT` before testing the changed app. Baseline failures are expected; the same assertions are used for the final app. Do not add expected-failure markers or weaken assertions to make the baseline green.

The recorded core/Firebase baseline report initially contained 14 passes and 12 failures. One of those failures was a test locator that indexed a changing list of selected system buttons. The test was corrected to capture the system IDs before toggling, and it passed against the original app. The other 11 failures were application defects. A separate original-app run recorded the zero-hours failure and all three delayed-cloud data-loss failures, while confirming the corrected system-selection test. These original reports remain intact. A later keyboard-test correction follows the new citation links in normal Tab order before asserting the Next button, rather than assuming there are no links in the feedback.

## CI and scope

The GitHub workflow runs `npm ci`, installs Chromium, runs `npm test`, and uploads reports. Its repository permission is read-only. It contains no deployment, merge, credential, or production-provider operation.

Chromium desktop and mobile emulation are the automated browser coverage. These checks do not claim physical-device, Firefox, WebKit, screen-reader, clinical expert, or exam-readiness validation. Responsive and keyboard checks supplement the functional tests; they are not a complete accessibility audit.

The implementation follows the primary Playwright documentation for [fixtures](https://playwright.dev/docs/test-fixtures), [network interception](https://playwright.dev/docs/network), and [reports](https://playwright.dev/docs/test-reporters).
