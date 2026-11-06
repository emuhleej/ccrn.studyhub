# Adult CCRN Study Hub

Educational study prototype under review in draft PR #1. It is not clinically validated, an exam-readiness predictor, or a patient-care tool. No merge or deployment is part of this work.

## Files

- `index.html` - the Adult CCRN Study Hub app.
- `firebase-config.js` - optional Firebase config for browser-scoped notes/progress sync.
- `study-state.js` - validation of saved study data.
- `clinical-review.js` - evidence decisions and fingerprints for all 33 original questions.
- `clinical-gate.js` - excludes unsupported or changed content from learning quizzes.
- `learning-lab.js` - review scheduling, unscored fictional cases, analytics and backup.
- `DEPLOY.md` - setup steps for GitHub Pages, Notion, and optional Firebase.
- `.nojekyll` - keeps GitHub Pages from changing how the site is served.

## Notion Use

After GitHub Pages publishes the site, paste the public URL into Notion and choose `Embed`.

## Evidence and tests

- [Question audit](docs/clinical-question-audit.md): each stem, answer, rationale, source, limitation and quarantine decision.
- [Simulation audit](docs/clinical-simulation-audit.md): original and revised fictional stages and their sources.
- [Review process and boundaries](docs/clinical-review-process.md): source checks versus licensed review and unreviewed library text.
- [Verification report](VERIFICATION.md) and [reproduction instructions](docs/browser-testing.md).

Install Node.js 20 or newer, then run:

```sh
npm ci
npx playwright install chromium
npm test
```

Tests run a loopback static server, isolate browser storage and block external requests. Firebase cases replace SDK modules with synthetic test modules; no production project is contacted. The test runner uses workspace-local temporary files and shuts down its own test server. CI performs the same unit and desktop/mobile Chromium checks, with no deployment step.

## Sync Note

Notes, progress checks and weak areas save on each browser/device by default. Storage failures are reported; session-only data will not survive closing the page. The optional Firebase adapter uses an anonymous identity scoped to that browser and does not provide dependable cross-device identity. Review schedules remain local; importing a learning backup restores only the review schedule, not answer history or notes. No production rules, identity changes or data migration were tested or applied.
