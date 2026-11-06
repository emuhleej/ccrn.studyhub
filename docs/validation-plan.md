# Clinical validation and browser regression plan

Goal: continue draft PR #1 on `feature/ccrn-studyhub-improvements-20261106`, independently compare the existing 33 questions and four simulation stages with current primary references, quarantine unsupported material, and run reproducible browser regressions.

Baseline: `d1e81ecb1b52d9211881a7eb8db5551d63f9ffdb`; main observed at `6bd874e5f32935226f192b572b9ffaaa922d2537`. There was no package manifest, automated test suite, CI, or item-level evidence register. The existing production Firebase configuration contains placeholders.

## Boundaries

- No main changes, merge, deployment, production Firebase access, or production data migration.
- AI source comparison is distinct from licensed clinical review. No expert sign-off is available.
- Keep unsupported originals available to reviewers in source, excluded from learner quizzes. Exams remain paused.
- Tests serve loopback files and intercept external requests before navigation. Firebase uses synthetic modules, never production credentials.

## Tasks

- [x] Assess each original question's stem, answer, distractors and rationale; record exact source, edition, section, limitations, status and content fingerprint in `clinical-review.js` and `docs/clinical-question-audit.md`.
- [x] Assess all four fictional simulation stages; document evidence and limitations. Add import, storage and keyboard regressions before fixing `learning-lab.js`.
- [x] Add Playwright infrastructure, desktop/mobile cases, isolated Firebase module mocks and read-only CI. Capture baseline failures before fixes.
- [x] Gate question eligibility on evidence status and exact content, expose review limitations, fix reproduced app defects and run the combined suite.
- [x] Review the final changes; document actual passes and outstanding clinical, accessibility and Firebase limits; update the existing draft branch and PR without merging.

## Review focus

Exercise corrupt and unavailable storage; malformed and hostile backup content; keyboard focus after disabled answers; mobile overflow at 320 pixels; unavailable/malformed clinical evidence; delayed/failed cloud reads and writes; and untrusted stored text. A local mock passing is not deployed-rule or production integration verification.

## Execution record

The user explicitly requested implementation and continuation of the existing draft; research, local fixes, tests and draft-branch updates proceed within that authorization. Independent clinical research and test infrastructure are delegated with separate file ownership. The repository is a fresh isolated checkout under this task's `work` folder.

Final local evidence: 11 unit checks and 142 browser checks passed, with zero skips or retries. Read-only code review findings were reproduced and repaired, including failed-save snapshots/reloads, strict nested cloud validation, startup reconciliation and retry-baseline accounting. Delivery target: the existing draft branch. No merge or deployment is authorized.
