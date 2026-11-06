# CCRN Study Hub improvement branch

This draft is an educational prototype, not a clinically validated CCRN preparation product or patient-care tool.

## Implemented and retained

- Paused generated 150-item exams and removed exam-pass prediction claims.
- Preserved owner-scoped anonymous Firebase paths; added state validation, delayed-response handling, serialized writes and failed-save recovery. Provider behavior is tested through isolated browser mocks.
- Preserved answer history, per-system analytics, missed-question prioritization, a basic review queue and study suggestions.
- Added evidence for all 33 original questions: 15 source-supported for informal learning; 18 excluded pending repair/review. Exact-content checks prevent stale evidence from clearing changed questions.
- Compared all four fictional case stages with primary references, clarified wording and linked evidence. No licensed review is claimed.
- Hardened review-schedule import/export and storage error handling, including a real quiz-to-backup round trip.
- Improved keyboard focus, labels, reduced-motion behavior and compact phone layouts.
- Added state/content tests, real desktop/mobile Chromium automation, network-isolated Firebase mocks, reports and read-only CI.

See [VERIFICATION.md](VERIFICATION.md) for executed results and precise limits.

## Still outstanding

Licensed clinical and educator review of every item; full Topic Library validation; reviewed scored exam banks and psychometric validation; real Firebase SDK/security-rule testing in an approved safe environment; durable cross-device identity and a separately approved migration plan; broader engine/device and human assistive-technology testing; a modular refactor of the remaining large HTML file; and a grounded AI coach rather than basic suggestions.

The scheduler is a simple learning aid, not a validated spaced-repetition algorithm. No production Firebase change, data migration, merge or deployment is included.
