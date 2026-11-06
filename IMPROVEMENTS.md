# CCRN Study Hub improvement branch

This is an educational prototype, not a validated CCRN preparation product or clinical decision-support system.

## Implemented
- Paused two automatically generated 150-item exams until individually reviewed banks are available.
- Removed the misleading pass-range claim.
- Owner-scoped Firebase document path and sample Firestore ownership rules.
- Answer-attempt history, per-system analytics and recent-answer summaries.
- Optional missed-question priority in topic quizzes.
- Basic spaced review queue based on missed topics (not a validated SM-2 implementation).
- Two fictional, two-stage clinical reasoning simulations.
- Local JSON export and limited import of learning data.
- Basic study-coach suggestions.
- Focus visibility and mobile-friendly minimum targets for the added learning panel.
- Source/review standards displayed in the learning laboratory.

## Outstanding before production
- Clinical review of every question and simulation; source citations, test-plan mapping and reviewer sign-off.
- Full secure cross-device identity and migration from the old shared Firestore document.
- Automated browser, keyboard and screen-reader tests; content-security and XSS review.
- Modular refactor of the original monolithic HTML, plus unit tests and CI.
- Validated scheduling algorithm and independent psychometric exam forms.
- AI coach grounded in reviewed content rather than a keyword-based suggestion engine.

## Important
The old topic quiz question bank is still available for informal learning and is **not** independently validated. No exam-readiness prediction is provided. Do not merge into production until tests and security rules have been deployed and reviewed.