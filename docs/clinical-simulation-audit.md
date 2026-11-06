# Clinical simulation source audit

Checked 2026-11-06. Scope: **both existing cases, all four original stages, all 12 options, their answer keys, and all four explanations** in `learning-lab.js`. This is an AI-assisted comparison with primary sources, **not licensed clinical review, clinical expert signoff, AACN endorsement, or validation of exam readiness**. The cases remain unscored fictional educational exercises. No bedside treatment protocol is supplied.

## Disposition

All four answer keys are supportable within their limited recognition/assessment scope. Retain four stages with the revisions below. Zero original stages are omitted from this inventory. No stage is approved for a scored examination. A source check attaches to a fingerprint of the exact stage content and its reference metadata; a later mismatch quarantines the stage and removes its answer controls until its source check is renewed. A fingerprint detects drift; it does not establish clinical correctness or authorize a new review.

## Original stage audit

### shock-1 — Shock physiology, step 1

Original prompt: “A fictional postoperative patient has MAP 54, HR 122, cool extremities and falling urine output. What is the priority?”

| Original option | Original key | Assessment |
| --- | --- | --- |
| Assess perfusion and urgently escalate deterioration | Correct | Supported by the presentation and early-help/assessment principles. |
| Wait until the next routine vital signs | Incorrect | Defers response to active deterioration. |
| Document and continue without reassessment | Incorrect | Documentation alone does not address deterioration. |

Original explanation: “Hypotension plus organ hypoperfusion requires immediate assessment and escalation. Determine the cause before selecting cause-specific treatment.”

The original final sentence could be read as postponing initial support. Revised explanation makes assessment, immediate support and escalation concurrent with investigation. Add adult context and explicit mmHg / beats per minute units. ESICM identifies this constellation as compatible with shock; RCUK supports early help and ongoing reassessment. Neither provides the fictional values as a universal diagnostic threshold. [S1, S2]

### shock-2 — Shock physiology, step 2

Original prompt: “The patient has distended neck veins and new muffled heart sounds. Which mechanism warrants urgent consideration?”

| Original option | Original key | Assessment |
| --- | --- | --- |
| Obstructive physiology such as tamponade | Correct | Supported as an urgent consideration, not a confirmed diagnosis. |
| Isolated mild dehydration | Incorrect | Does not explain the complete stated pattern. |
| Uncomplicated postoperative pain | Incorrect | Does not account for the new findings and hypoperfusion. |

Original explanation: “These findings can suggest obstructive shock. Real patients require immediate team assessment and diagnostic confirmation.”

Retain the mechanism. Revise to explain impaired filling, preserve the difference between suspicion and diagnosis, and state that the classic triad can be absent. The original nonspecific “diagnostic confirmation” should not imply that unstable patients can wait. Revised language directs urgent team assessment and echocardiography, with no procedural instructions. [S3 §§11.8–11.8.3]

### resp-1 — Respiratory deterioration, step 1

Original prompt: “A fictional ventilated patient develops sudden desaturation and high airway pressure. What should be assessed first?”

| Original option | Original key | Assessment |
| --- | --- | --- |
| Patient, airway, tube and ventilator circuit | Correct | Supported as rapid bedside assessment, with simultaneous escalation/support. |
| Wait for routine chest imaging | Incorrect | Delays response to acute deterioration. |
| Ignore the change if pulse is present | Incorrect | A pulse does not exclude respiratory failure. |

Original explanation: “Rapid bedside assessment of airway and equipment alongside patient status is essential in sudden deterioration.”

The question's single “first” action understates parallel work. Ask about the appropriate immediate assessment approach and explicitly call for help. AARC supports patient-centred assessment including the airway and ventilator; its 2024 guideline concerns assessment and is not itself an emergency troubleshooting algorithm. RCUK supplies the immediate deterioration and escalation context; the Association's currently listed QRH supplies the breathing-system checks. Its operating-theatre sequence is not transplanted as an ICU treatment protocol. [S2, S4, S6]

### resp-2 — Respiratory deterioration, step 2

Original prompt: “The patient has unilateral absent breath sounds and hypotension. Which emergency should be considered?”

| Original option | Original key | Assessment |
| --- | --- | --- |
| Tension pneumothorax | Correct | Supported as an urgent concern in this evolving presentation. |
| Stable chronic anemia | Incorrect | Does not explain the acute unilateral respiratory findings. |
| Mild seasonal allergies | Incorrect | Does not explain this pattern; this is not a claim about anaphylaxis. |

Original explanation: “This combination raises concern for tension physiology and requires emergency escalation.”

Keep the concern and escalation. Clarify that findings alone do not establish the diagnosis; tube position/obstruction remain relevant alternatives. Escalation must not become a suggestion to wait for routine imaging in an unstable patient. ERC discusses the pattern in its traumatic-arrest section; only the recognition/urgency principles are used here, not its trauma-specific procedural recommendations. [S5 p.32; S6]

## Primary references inspected

- **S1 — ESICM, 2025, _Circulatory shock and hemodynamic monitoring_.** [Society-hosted guideline visual abstract](https://www.esicm.org/wp-content/uploads/2025/10/Visual-abstract-final.pdf), PDF page 1, “SHOCK” definition and serial perfusion-assessment summary. The society's [guideline registry](https://www.esicm.org/resources/guidelines-consensus-statements/) identifies the 2025 guideline and DOI `10.1007/s00134-025-08137-z`. Used only for shock recognition and perfusion assessment; no fluid dose or blood-pressure target was inferred.
- **S2 — Resuscitation Council UK, _The ABCDE Approach_, updated July 2024.** [Official guidance](https://www.resus.org.uk/library/abcde-approach), “Underlying principles” items 1–8; “First steps” items 2–5; “Breathing (B)” opening paragraph; “Circulation (C)” items 1–9. Used for simultaneous assessment/support, early help and reassessment.
- **S3 — ESC, 2025, _Guidelines for the management of myocarditis and pericarditis_.** [Guideline publication](https://academic.oup.com/eurheartj/article/46/40/3952/8234483), §11.8 (mechanism), §11.8.1 (presentation and incomplete triad), §11.8.2 (clinical assessment plus echocardiographic confirmation), §11.8.3 (unstable patients require urgent management). DOI `10.1093/eurheartj/ehaf192`. Relevant full section text was retrieved through the indexed primary publication; direct article and official-slide opens were access-blocked. No missing page number is invented.
- **S4 — AARC, 2024, _Clinical Practice Guideline: Patient-Ventilator Assessment_.** [Society-hosted PDF](https://www.aarc.org/wp-content/uploads/2024/10/patient-ventilator-assessment-aarc-cpg.pdf), printed p.1043 (PDF p.2), definition/Introduction; printed p.1042 (PDF p.1), recommendation 15 on airway placement and securement. DOI `10.4187/respcare.12007`. The [AARC guideline list](https://www.aarc.org/resource/clinical-practice-guidelines/) still lists this assessment guideline; no newer replacement was found in this check.
- **S5 — ERC, 2025, _Special Circumstances in Resuscitation_.** [Council-hosted PDF](https://www.erc.edu/media/wwufbysp/gl2025-06-spec-circ-e.pdf), printed/PDF p.32, “Tension pneumothorax”; p.43, “Treatment of cardiac arrest caused by obstructive lung disease” for the pressure-ventilation context. DOI `10.1016/j.resuscitation.2025.110753`. The stage asks recognition and escalation, not a decompression technique or an independent treatment order.
- **S6 — Association of Anaesthetists, _Quick Reference Handbook_, page 2-3, Increased airway pressure v1 (2018).** [Society-hosted page PDF](https://anaesthetists.org/Portals/0/PDFs/QRH/QRH_2-3_Increased_airway_pressure_v1.pdf?ver=2018-07-25-112713-237), assessment steps 1–4, Box A and Box D. This remains the version linked by the [current QRH index](https://anaesthetists.org/Guidelines-and-publications/Quick-reference-handbook/PDF-version), checked on the audit date. Supports checking the breathing system, airway position/patency, patient findings and alternate causes. It is an anaesthetic-emergency reference; only these assessment concepts are used, without reproducing its interventions.

All links were checked 2026-11-06. “Current” means these authoritative editions were found and inspected on that date, not continuous surveillance. No claim of a comprehensive systematic literature search is made.

## Residual limitations

- Simple, visibly implausible distractors make these introductory recognition exercises. Answering correctly does not demonstrate bedside competence, discriminate exam readiness, or validate a psychometric score.
- The cases omit the examination, differential diagnosis, medications, trends, procedures and local protocols required for real care. They are never used to recommend action for an identified patient.
- No licensed reviewer has assessed the case wording, sources or relevance to the AACN test plan. Expert review remains outstanding and is shown in the UI.
- Source freshness and a matching fingerprint are necessary provenance checks, not proof of accuracy. A future revision requires a new documented content comparison before changing the fingerprint.

## Browser verification record

Focused regression tests live in `tests/learning-lab.spec.js`. They exercise actual local browser UI, storage, file selection and download, while the shared test fixture blocks external services. Final observed results and limits are recorded in the task verification report; this audit does not label a test as passed merely because a test file exists.

Observed focused result on 2026-11-06: **58 passed** (29 scenarios each in desktop and phone-size Chromium, command exit 0). This includes both cases and all four stage transitions; correct/wrong feedback; actual quiz-to-Lab history; metadata-preserving JSON download/import; malformed storage and import preservation; cancelled, oversized and unreadable imports; write failures; keyboard focus; reload persistence; and source-text drift quarantine. After screenshot inspection found unequal wrapped-button heights, the alignment fix passed **2 additional layout checks** (desktop plus 390/320 px), command exit 0. Final screenshots were inspected at 1280, 390 and 320 px. The all-project final run remains the responsibility of the task's consolidated verification report.

Limits: Chromium device/viewport emulation is not physical-device, cross-browser or assistive-technology certification. Storage and downloads are real browser operations; file-read and storage-write errors are deliberately injected to exercise those branches. These software checks do not validate clinical correctness. The original representative baseline failed 7/7 checks; additional metadata, stale-label and layout failures were reproduced before their fixes.

## Checked content fingerprints

| Stage ID | Fingerprint | Disposition |
| --- | --- | --- |
| shock-1 | `f0b26139` | Source-checked; no licensed signoff; unscored |
| shock-2 | `ef45386d` | Source-checked; no licensed signoff; unscored |
| resp-1 | `78188dfa` | Source-checked; no licensed signoff; unscored |
| resp-2 | `3a4dacef` | Source-checked; no licensed signoff; unscored |

The fingerprint covers stable ID, prompt, option order, correct index, explanation and resolved source title/URL/locator records. The algorithm is a non-security drift detector, not a tamper-proof signature.
