# Evidence status and release limitations

Checked 2026-11-06. The assessment is an AI-assisted comparison with independently obtained primary sources. No licensed clinician reviewed or signed off this app. No question is approved for a scored certification exam. No score predicts examination success.

## What the labels mean

- **Source-supported:** the original question, answer choices and rationale were compared with the cited source sections; the assessed claims were supported within the documented limitations. Eligible only for informal learning. This is not clinical validation or expert approval.
- **Quarantined:** a material claim is outdated, unsupported, oversimplified, ambiguous, or cannot be verified from the accessible authoritative references. The original is retained in source and excluded from quiz selection.
- **Needs licensed clinical review:** applies to every question and simulation, including source-supported items. A qualified reviewer must assess the complete item, plausible distractors, omitted context, nursing scope, contraindications, source applicability and educational validity.

The evidence register includes a SHA-256 fingerprint of each original question. Changes to stems, answer options, keys, topics or rationales invalidate eligibility. Missing evidence and failed fingerprint verification default to exclusion. This detects stale review metadata; it is not a security signature or independent approval mechanism.

## Scope

The item-level audit covers all 33 original questions and all four stages of both fictional cases. Reports distinguish original claims from any revised simulation wording. Source access failures and indirect support are recorded, not interpreted as verification.

The much larger Topic Library contains generated domain text, legacy summaries, generic study scaffolding, and image/video search links. It has not received a line-by-line clinical review and does not inherit question review status. Known contradictory reader sections are withheld; other library prose is explicitly flagged as unvalidated. Search links are discovery aids, not evidence citations. Personal notes are user content, not reviewed teaching material.

The six domain weights (13%, 12%, 21%, 18%, 16%, 20%) and effective date were checked against the **July 2026 AACN Direct Care handbook**, printed pages 10–11 (PDF pages 15–16): [AACN handbook](https://www.aacn.org/-/media/aacn-website/certification/get-certified/handbooks/ccrnexamhandbook.pdf). The app's study-hour adjustments, topic priority labels and practice scores have not been validated by AACN or a psychometrician. Topic tagging is informal; there is no item-level official blueprint certification.

## Before a later release

1. A named licensed critical-care clinician reviews each item and documents credentials, date, decision, exact content version, sources and corrections. Re-check guideline currency and local scope/protocol applicability.
2. A separate educator assesses distractor quality, ambiguous wording, learning objectives and coverage. Psychometric validation is required before making exam-readiness claims.
3. Re-run the content integrity and browser suite after every content change. Review all quarantine decisions; do not silently convert missing evidence to approval.
4. Validate actual Firebase authentication and security rules in a separately approved emulator or nonproduction project, then plan identity/migration work independently. Browser-module mocks cannot validate Firestore rule enforcement.
5. Complete human screen-reader and assistive-technology testing and broaden engine/device coverage. Automated keyboard checks are only one part of accessibility review.

This PR does not authorize any merge, deployment, security-rule publication, data migration or production Firebase access.
