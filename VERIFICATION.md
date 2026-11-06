# Verification report — 2026-11-06

This continues draft PR #1 on `feature/ccrn-studyhub-improvements-20261106`, from `d1e81ecb1b52d9211881a7eb8db5551d63f9ffdb`. Main was observed at `6bd874e5f32935226f192b572b9ffaaa922d2537`. No merge, deployment, production Firebase access or data migration is included.

## Clinical evidence

| Material | Scope and result | Limits |
| --- | --- | --- |
| Original question bank | All 33 stems, 132 options, 33 keys and complete rationales compared with primary/institutional references; 15 source-supported, 18 quarantined | AI-assisted independent source comparison; zero licensed clinical sign-offs |
| Fictional simulations | Both cases, all four stages, 12 options and four explanations assessed; four keys retained with clarified wording/citations | Unscored introductory recognition exercises, not bedside protocols or validated examinations |
| AACN domain weights | Six weights checked against the July 2026 Direct Care handbook, printed pp.10–11 | Topic tagging, hour adjustments and score interpretation are not AACN-certified |
| Topic Library | Explicitly labeled unvalidated; three known conflicting sections withheld | Remaining prose, search results and media are outside the item-level audit |

The [question audit](docs/clinical-question-audit.md) records all original text, option-by-option and rationale findings, 38 source records, editions, locators, access limitations and proposed reviewer repairs. It distinguishes inspected passages from inaccessible full text. The [simulation audit](docs/clinical-simulation-audit.md) records original wording and reasons for revisions. Every question's `clinicalReviewer` is `null`.

Unsupported originals remain in source for review, excluded from learner quizzes. Exact-content SHA-256 checks reject changed, missing or quarantined question evidence. Simulation fingerprints also invalidate stale review labels and controls. These detect editorial drift, not clinical truth or malicious modification. Both generated 150-item exams remain paused.

## Executed software checks

Final command: **`npm test` exited 0** on 2026-11-06T20:31:34.829Z. **11 unit checks and 142 browser checks passed**, with zero failures, skips or flaky results and no retries. Browser duration: 141.3 seconds. Environment: Windows x64, Node v24.18.0, Playwright 1.62.1, bundled Chromium 151.0.7922.34.

| Browser suite | Desktop | Mobile |
| --- | ---: | ---: |
| App/navigation/quiz/storage | 15 | 15 |
| Clinical gate and labels | 5 | 5 |
| Firebase adapter and recovery | 22 | 22 |
| Learning Lab/import/export/cases | 29 | 29 |
| **Total** | **71** | **71** |

See [machine-readable results](docs/test-results-summary.json). Final screenshots cover desktop, 390 px and 320 px. The local HTML/JSON/JUnit reports and screenshots are supplied with the task deliverables; CI generates equivalent artifacts for its own run.

Reproduce with Node.js 20+:

```sh
npm ci
npx playwright install chromium
npm test
```

The pinned runner uses desktop Chromium at 1280 × 900 and mobile Chromium at 390 × 844, plus 320 px layout checks. Each test has fresh browser storage. There are no retries. Every browser case asserts no unhandled page exceptions and no unexpected external request attempts. HTML, JSON, JUnit, screenshots and per-test network-boundary evidence are generated; see [run instructions](docs/browser-testing.md).

Coverage includes navigation; keyboard library/quiz flows; system and length filters; answer locking, scoring, reset and adaptive ordering; notes/checklists and reload; corrupt/unavailable storage; stored-text injection; all case stages; review scheduling and analytics; actual JSON downloads/uploads; invalid, oversized, cancelled and unreadable imports; preservation after write failures; evidence loss/drift; and Firebase adapter reads, writes, owner paths, delayed responses and recovery.

## Reproduced defects and corrections

- Native keyboard-operable library headers, answer/next/reset focus, labels, visible focus and narrow layouts. Reduced-motion styles override active-view animation. Screenshot review corrected uneven wrapped Lab buttons.
- Safe local record normalization and text escaping. Strict nested cloud validation prevents malformed records from erasing valid notes/history.
- Failed cloud reads/listeners stop further writes. Startup reconciles changed fields while preserving unrelated remote records. Serialized writes and acknowledged revisions protect unsaved edits against stale snapshots. A durable pending baseline supports recovery after failed saves and reload.
- Visible session-only warnings on storage failure. Validated schedule imports preserve existing records on error and accept provenance metadata from actual quiz attempts. Import does not restore notes or replace answer history.
- Source-gated questions, answer citations and explicit review limits. Zero-hour study plans produce finite bar widths.

Real original-app failures were recorded before repairs. One early system-selector assertion and a later keyboard assertion were corrected because the test assumptions were wrong; these are not app defects. Environment-only startup/cleanup failures are also excluded from functional results. Review findings were reproduced before repair, including nested malformed cloud records and failed-save reload loss. The earlier simplified Firebase mock was corrected to approximate documented granular merge behavior; the final run uses that corrected mock.

## Remaining unverified work

- No independent licensed clinical expert or educator sign-off. Every item still needs it. Source-supported does not mean clinically validated; exam readiness, distractor quality and psychometric validity remain unverified.
- Firebase tests replace three SDK imports with synthetic modules and block external HTTP/WebSocket traffic before navigation. No real SDK, production endpoint, credentials or deployed rules are exercised. This is not an emulator or security-rules test.
- Anonymous identity remains browser-scoped. Real cross-device conflicts, ambiguous server acknowledgements/exactly-once counters, authentication lifecycle, old shared-document migration and production connectivity remain unverified. Pending-sync recovery depends on available browser storage.
- Chromium mobile emulation is not physical-device coverage. Firefox, WebKit, human screen-reader use and a complete accessibility audit remain unverified.
- Source currency was checked on the audit date, without continuous monitoring or a comprehensive systematic review. Inaccessible primary full texts are identified in the evidence register.

The GitHub workflow runs unit/browser checks with read-only repository permissions and uploads reports. It has no merge or deployment step. Remote CI execution status is separate from a local pass.
