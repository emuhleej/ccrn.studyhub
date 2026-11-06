# Clinical audit of the original 33-question bank

Checked on **2026-11-06**. **15 source-supported; 18 quarantined.**

Method: **AI-assisted independent source comparison; no licensed review.** No clinician has signed off these items. The labels are source-comparison decisions, not accreditation, clinical certification, or a claim that a question is on the CCRN examination.

All 33 original objects were assessed: stem, four options, keyed answer, and the entire rationale. Stable IDs follow original source order. The SHA-256 values cover UTF-8 bytes of `JSON.stringify(originalQuestionObject)`, including HTML entities and property order. The original text is reproduced below without correction. Proposed repairs are reviewer suggestions and have not been substituted into the learner bank.

A supported item has a defensible key and rationale in its stated teaching context. Ordinary vignette limitations are recorded rather than treated as an exhaustive bedside protocol. An item is quarantined when a substantive claim is outdated, insufficiently supported, overly absolute, or ambiguous enough to misteach assessment or treatment. A correct key alone does not clear the item. Quarantine preserves the original in the repository while withholding learner access.

Source-supported status applies only to the exact hashed object. Missing records, changed content, and quarantined records must not be eligible for practice. The application’s gate implementation and its tests are separate from this clinical evidence file. Any edited question needs a fresh complete review and hash. Every `clinicalReviewer` is intentionally `null`.

## Coverage and decisions

The detail sections supply the option-by-option assessment, whole-rationale assessment, source locator, uncertainty and proposed repair for every row. A/B/C/D are presentation labels for original option indices 0/1/2/3.

| ID | Topic | Original key | Status | Finding | Sources |
| --- | --- | --- | --- | --- | --- |
| [q001](#q001) | ACS | A | quarantined | The preferred choice is plausible, but the fluid instruction is insufficiently conditioned. | [aha_acs_2025](#aha-acs-2025), [aha_rv_2018](#aha-rv-2018), [ucsf_rv](#ucsf-rv) |
| [q002](#q002) | ACS | B | quarantined | The rationale combines an outdated symptom label with an unverified exam-frequency claim. | [aha_chest_pain_2021](#aha-chest-pain-2021) |
| [q003](#q003) | Cardiogenic shock | C | quarantined | The keyed hemodynamic comparison is sound; the universal shock/fluid conclusion is not. | [esc_acvc_2025](#esc-acvc-2025), [aha_rv_2018](#aha-rv-2018) |
| [q004](#q004) | Tamponade | B | source-supported | The postoperative pattern, key and urgent escalation rationale are supported. | [aats_tamponade](#aats-tamponade) |
| [q005](#q005) | Dysrhythmias | B | quarantined | The key is correct; the rationale overgeneralizes shock and antiarrhythmic indications. | [aha_als_2025](#aha-als-2025) |
| [q006](#q006) | Dysrhythmias | A | quarantined | The stem can imply that shock is required only after pulse loss. | [aha_als_2025](#aha-als-2025) |
| [q007](#q007) | Aortic dissection | B | source-supported | The treatment sequence and keyed order to question are supported. | [aha_aorta_2022](#aha-aorta-2022) |
| [q008](#q008) | ARDS | B | quarantined | The unqualified PEEP escalation lacks essential patient and ventilator context. | [ats_ards_2024](#ats-ards-2024) |
| [q009](#q009) | ARDS | A | source-supported | The answer lies within the recommended protective range and the rationale is supported. | [ats_ventilation_2017](#ats-ventilation-2017), [ats_ards_2024](#ats-ards-2024) |
| [q010](#q010) | PE | A | source-supported | The most-likely diagnosis and physiological teaching point are supported. | [aha_pe_2026](#aha-pe-2026), [esc_pe_2019](#esc-pe-2019) |
| [q011](#q011) | Status asthmaticus | B | source-supported | The deterioration pattern, keyed response and rationale are supported. | [gina_2026](#gina-2026) |
| [q012](#q012) | Vent complications | A | quarantined | The intended assessment is reasonable, but the proposed binary diagnosis is not. | [stanford_em](#stanford-em) |
| [q013](#q013) | ARF | C | source-supported | The initial oxygen target and avoidance of both hypoxemia and over-oxygenation are supported. | [copd_standard_2024](#copd-standard-2024), [gold_2026](#gold-2026) |
| [q014](#q014) | DKA | B | quarantined | The keyed action remains correct, but the potassium cutoff is obsolete. | [ada_hospital_2026](#ada-hospital-2026), [ada_crises_2024](#ada-crises-2024) |
| [q015](#q015) | DKA | B | quarantined | Neither the stated resolution endpoint nor the dextrose threshold is current. | [ada_crises_2024](#ada-crises-2024), [ada_hospital_2026](#ada-hospital-2026) |
| [q016](#q016) | HHS | B | source-supported | The fluid-first HHS teaching point and gradual correction rationale are supported. | [ada_hospital_2026](#ada-hospital-2026), [ada_crises_2024](#ada-crises-2024) |
| [q017](#q017) | HIT | B | quarantined | The immediate management is supported, but the platelet prohibition is absolute and incorrect. | [ash_hit_2018](#ash-hit-2018), [ash_hit_status](#ash-hit-status) |
| [q018](#q018) | Transfusion | B | quarantined | The limited findings favor TRALI but do not support the categorical exclusion of alternatives. | [lifeblood_trali](#lifeblood-trali), [lifeblood_taco](#lifeblood-taco) |
| [q019](#q019) | AKI | B | quarantined | The calcium priority is supported; the removal-therapy explanation needs updating. | [ukka_hyperkalemia_2026](#ukka-hyperkalemia-2026) |
| [q020](#q020) | Stroke | A | quarantined | The alteplase threshold is current; the no-tPA blood-pressure rule is too broad. | [aha_stroke_2026](#aha-stroke-2026) |
| [q021](#q021) | TBI | B | source-supported | The named late emergency pattern and urgent interpretation are supported. | [enls_icp_v5](#enls-icp-v5), [acs_tbi_2024](#acs-tbi-2024) |
| [q022](#q022) | ICP | B | quarantined | No source substantiates the universal earliest-and-most-reliable ranking. | [acs_tbi_2024](#acs-tbi-2024), [enls_icp_v5](#enls-icp-v5) |
| [q023](#q023) | SCI | B | quarantined | The neurogenic-shock pattern is supported; the contrast with all other shock is not. | [acs_spine_2022](#acs-spine-2022), [esc_acvc_2025](#esc-acvc-2025) |
| [q024](#q024) | Stroke | A | source-supported | Nimodipine and the delayed-ischemia teaching point are supported for aneurysmal SAH. | [aha_sah_2023](#aha-sah-2023), [eso_sah_2026](#eso-sah-2026) |
| [q025](#q025) | Sepsis | B | source-supported | The usual first-line agent and escalation sequence remain supported in 2026. | [ssc_2026](#ssc-2026), [ssc_2016_evidence](#ssc-2016-evidence) |
| [q026](#q026) | Sepsis | A | source-supported | The culture-before-antibiotics principle and avoidance of treatment delay are supported. | [ssc_2026](#ssc-2026) |
| [q027](#q027) | Shock | B | quarantined | The first-line answer is correct; the adjunct-steroid teaching is insufficiently qualified. | [rcuk_anaphylaxis_2021](#rcuk-anaphylaxis-2021) |
| [q028](#q028) | Acid-base | B | quarantined | The primary-disorder answer is plausible, but the supplied ABG is internally inconsistent. | [ats_abg](#ats-abg) |
| [q029](#q029) | Acid-base | A | quarantined | The question overattributes mechanism and supplies an inconsistent ABG triplet. | [ats_abg](#ats-abg), [esicm_sepsis_education_2026](#esicm-sepsis-education-2026) |
| [q030](#q030) | Electrolytes | B | source-supported | The magnesium association, keyed assessment and rationale are supported. | [whang_mg_1992](#whang-mg-1992), [umaryland_mg_2026](#umaryland-mg-2026) |
| [q031](#q031) | Advocacy | B | source-supported | The response reflects advocacy and appropriate escalation of an unresolved safety concern. | [aacn_synergy](#aacn-synergy), [wsna_chain_2023](#wsna-chain-2023) |
| [q032](#q032) | Response to diversity | B | source-supported | The answer and rationale match AACN’s Response to Diversity competency. | [aacn_synergy](#aacn-synergy) |
| [q033](#q033) | Clinical inquiry | B | source-supported | The answer and rationale match AACN’s Clinical Inquiry competency. | [aacn_synergy](#aacn-synergy) |

## Source register and access limits

References prioritize issuing organizations, professional-society guidelines and original publications. Current editions were checked where available, including 2026 sepsis, stroke, PE, diabetes, asthma and COPD publications; AHA ALS 2025; and the July 2026 UK Kidney Association amendment. Some foundational physiological and professional-competency sources are older and are labeled accordingly. Publication dates were not inferred from search crawl dates. Undated pages are explicitly identified.

Some publisher sites blocked direct full-text access. Those records identify the exact indexed primary-source passages actually inspected rather than implying that the complete document was read. ENLS version 6 was identified but not retrieved; its contents are not claimed as evidence. The accessible version 5 is used only for established diagnostic descriptions, alongside ACS 2024 assessment guidance. GOLD 2026 confirms the edition check; the exact COPD saturation target is traced to the directly inspected clinical care standard. Source comparison cannot establish every individual treatment decision or replace licensed review.

### aha-acs-2025

[2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute Coronary Syndromes](https://www.jacc.org/doi/10.1016/j.jacc.2024.11.009)

- **Version:** 2025 guideline.
- **Locator:** Table 6: nitrates; evaluation of inferior STEMI for RV involvement.
- **Accessed:** 2026-11-06. Publisher-indexed guideline passages inspected; direct full-text request was blocked.

### aha-rv-2018

[Evaluation and Management of Right-Sided Heart Failure: A Scientific Statement From the AHA](https://www.ahajournals.org/doi/pdf/10.1161/CIR.0000000000000560)

- **Version:** 2018 scientific statement.
- **Locator:** Acute RV failure management algorithm: preload optimization and RV myocardial infarction.
- **Accessed:** 2026-11-06. Publisher-indexed algorithm and accompanying passages inspected.

### ucsf-rv

[UCSF Hospital Handbook: Right Ventricular Myocardial Infarction](https://hospitalhandbook.ucsf.edu/05-right-ventricular-rv-myocardial-infarction/05-right-ventricular-rv-myocardial-infarction)

- **Version:** Undated institutional teaching page; accessed 2026-11-06.
- **Locator:** Management: fluid administration according to JVP.
- **Accessed:** 2026-11-06. Institution-authored indexed passages inspected; direct page returned 503.

### aha-chest-pain-2021

[2021 Guideline for the Evaluation and Diagnosis of Chest Pain: Top Things to Know](https://professional.heart.org/en/science-news/2021-guideline-for-the-evaluation-and-diagnosis-of-chest-pain/top-things-to-know)

- **Version:** 2021 AHA/ACC guideline summary.
- **Locator:** Items 1, 7 and 9: anginal equivalents, sex differences and terminology.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### esc-acvc-2025

[ESC Acute Cardiovascular Care Toolkit: Chapter 4, Acute Heart Failure and Cardiogenic Shock](https://www.escardio.org/static-file/Escardio/Subspecialty/ACCA/Education/ACVC%20Toolkit/CHAP4.pdf)

- **Version:** 2025 toolkit.
- **Locator:** Sections 4.1 and 4.2: hemodynamic profiles and fluid challenge.
- **Accessed:** 2026-11-06. Issuing-society indexed PDF passages inspected; direct download was blocked.

### aats-tamponade

[AATS TSRA Primer: Heart Emergencies](https://www.aats.org/tsra-primer-heart-emergencies)

- **Version:** Undated current TSRA Primer page; accessed 2026-11-06.
- **Locator:** Cardiac tamponade: postoperative bleeding, drainage obstruction and surgical management.
- **Accessed:** 2026-11-06. Issuing-society indexed section inspected; direct request timed out.

### aha-als-2025

[2025 AHA Guidelines for CPR and ECC: Part 9, Adult Advanced Life Support](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support/)

- **Version:** 2025 guidelines.
- **Locator:** Sections 15 (wide-complex tachycardia) and 16 (polymorphic ventricular tachycardia).
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### aha-aorta-2022

[2022 ACC/AHA Guideline for the Diagnosis and Management of Aortic Disease](https://www.jacc.org/doi/10.1016/j.jacc.2022.08.004)

- **Version:** 2022 guideline.
- **Locator:** Section 7.3.1: acute medical management of acute aortic syndromes.
- **Accessed:** 2026-11-06. Publisher-indexed recommendation section inspected.

### ats-ards-2024

[An Update on Management of Adult Patients with ARDS: An Official ATS Clinical Practice Guideline](https://pmc.ncbi.nlm.nih.gov/articles/PMC10870893/)

- **Version:** 2024 guideline; DOI 10.1164/rccm.202311-2011ST.
- **Locator:** Question 4: higher PEEP; implementation considerations; retained ventilation recommendations.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### ats-ventilation-2017

[ATS/ESICM/SCCM Clinical Practice Guideline: Mechanical Ventilation in Adult Patients with ARDS](https://www.thoracic.org/statements/resources/cc/ards-guidelines.pdf)

- **Version:** 2017 guideline; ventilation recommendation retained in ATS 2024 update.
- **Locator:** Question 1: low tidal volume and inspiratory pressure limitation.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### aha-pe-2026

[2026 AHA/ACC Multisociety Acute Pulmonary Embolism Guideline: Top Things to Know](https://professional.heart.org/en/science-news/2026-guideline-for-the-evaluation-and-management-of-acute-pulmonary-embolism-in-adults/top-things-to-know)

- **Version:** 2026 guideline summary.
- **Locator:** Clinical evaluation, diagnostic assessment and risk stratification.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### esc-pe-2019

[2019 ESC Guidelines for the Diagnosis and Management of Acute Pulmonary Embolism, with ERS](https://academic.oup.com/eurheartj/article/41/4/543/5556136)

- **Version:** 2019 ESC/ERS guideline; European Heart Journal 2020 publication.
- **Locator:** Section 4: clinical presentation and pathophysiology.
- **Accessed:** 2026-11-06. Publisher-indexed clinical-presentation passages inspected.

### gina-2026

[Global Strategy for Asthma Management and Prevention](https://ginasthma.org/wp-content/uploads/2026/05/GINA-2026-Strategy-Report-WMS.pdf)

- **Version:** GINA 2026 strategy report.
- **Locator:** Printed pages 31, 170 and 185: silent chest and blood gases in exacerbations.
- **Accessed:** 2026-11-06. Official PDF downloaded and relevant page text inspected.

### stanford-em

[Stanford Anesthesia Emergency Manual](https://web.stanford.edu/dept/anesthesia/em/epic-manual.pdf)

- **Version:** Undated linked PDF; edition not verified.
- **Locator:** Hypoxemia emergency: manual ventilation, independent oxygen source, airway and equipment checks.
- **Accessed:** 2026-11-06. Institution-authored indexed emergency section inspected; direct PDF retrieval failed TLS verification.

### copd-standard-2024

[COPD Clinical Care Standard](https://www.safetyandquality.gov.au/clinical-care-standards/chronic-obstructive-pulmonary-disease)

- **Version:** Australian Commission on Safety and Quality in Health Care, 2024.
- **Locator:** Quality statement 8: controlled oxygen therapy during exacerbation.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### gold-2026

[GOLD 2026 Report](https://goldcopd.org/wp-content/uploads/2026/01/GOLD-REPORT-2026-v1.3-8Dec2025_WMV2.pdf)

- **Version:** 2026 report, version 1.3 dated 8 December 2025.
- **Locator:** Report identification and exacerbation chapter; edition check only.
- **Accessed:** 2026-11-06. Official edition page and PDF inspected; not used as the locator for the oxygen target.

### ada-crises-2024

[Hyperglycemic Crises in Adults With Diabetes: A Consensus Report](https://pmc.ncbi.nlm.nih.gov/articles/PMC11272983/)

- **Version:** ADA/EASD/JBDS/AACE/DTS 2024 consensus; DOI 10.2337/dci24-0032.
- **Locator:** Section 4: potassium, fluid therapy, resolution criteria and transition.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### ada-hospital-2026

[Diabetes Care in the Hospital: Standards of Care in Diabetes—2026](https://diabetesjournals.org/care/article-pdf/49/Supplement_1/S339/848851/dc26s016.pdf)

- **Version:** ADA Standards of Care 2026, section 16.
- **Locator:** Recommendation 16.16; Table 16.1; Figure 16.1, printed S348.
- **Accessed:** 2026-11-06. Publisher-indexed table and full Figure 16.1 text inspected.

### ash-hit-2018

[ASH 2018 Guidelines for Management of VTE: Heparin-Induced Thrombocytopenia](https://pmc.ncbi.nlm.nih.gov/articles/PMC6258919/)

- **Version:** 2018 guideline; ASH current guideline page still lists this edition.
- **Locator:** Recommendations 2.6, 3.1 and 3.6; 4Ts assessment.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### ash-hit-status

[ASH Heparin-Induced Thrombocytopenia Guideline Resource Page](https://www.hematology.org/resources/clinical-practice-guidelines/venous-thromboembolism-guidelines/heparin-induced-thrombocytopenia)

- **Version:** Current resource page; 2018 recommendations retained after February 2022 review.
- **Locator:** Guideline status and supporting resources.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### lifeblood-trali

[Australian Red Cross Lifeblood: Transfusion-Related Acute Lung Injury](https://www.lifeblood.com.au/health-professionals/clinical-practice/adverse-events/TRALI)

- **Version:** Undated current professional guidance; accessed 2026-11-06.
- **Locator:** When to suspect; investigation; immediate management.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### lifeblood-taco

[Australian Red Cross Lifeblood: Transfusion-Associated Circulatory Overload](https://www.lifeblood.com.au/health-professionals/clinical-practice/adverse-events/TACO)

- **Version:** Undated current professional guidance; accessed 2026-11-06.
- **Locator:** Clinical features, diagnostic criteria and distinction from TRALI.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### ukka-hyperkalemia-2026

[UK Kidney Association: Hyperkalaemia in Hospital, Guidelines 16.1–16.6](https://guidelines.ukkidney.org/hyperkalaemia/11-1-ii-hyperkalaemia-in-hospital/11-1-4-ii-hyperkalaemia-in-hospital-16-1-16-6/)

- **Version:** Guideline amended July 2026; active edition checked 2026-11-06.
- **Locator:** 16.2a–b: IV calcium; 16.3–16.4: shifting; 16.6.3: cation-exchange resins.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### aha-stroke-2026

[2026 AHA/ASA Guideline for the Early Management of Patients With Acute Ischemic Stroke](https://www.ahajournals.org/doi/10.1161/STR.0000000000000513)

- **Version:** 2026 guideline.
- **Locator:** Blood Pressure Management: IV thrombolysis, EVT and no-reperfusion recommendations.
- **Accessed:** 2026-11-06. Publisher-indexed recommendation and supporting-text passages inspected; direct full-text request was blocked.

### enls-icp-v5

[Emergency Neurological Life Support: Intracranial Hypertension and Herniation Protocol](https://www.neurocriticalcare.org/Portals/0/Docs/ENLS/ENLS_5_Protocol_ICP.pdf)

- **Version:** ENLS version 5; older accessible protocol, not the current edition.
- **Locator:** Diagnosis section, page 4: signs of intracranial hypertension and herniation.
- **Accessed:** 2026-11-06. Issuing-society indexed protocol section inspected. ENLS version 6 was identified but its PDF could not be retrieved.

### acs-tbi-2024

[ACS Best Practices Guidelines: The Management of Traumatic Brain Injury](https://www.facs.org/media/vgfgjpfk/best-practices-guidelines-traumatic-brain-injury.pdf)

- **Version:** American College of Surgeons, 2024.
- **Locator:** Neurological assessment, printed pages 7–9; ICP monitoring section, printed page 22.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### acs-spine-2022

[ACS Best Practices Guidelines: Spine Injury](https://www.facs.org/media/3iknlu30/acs-tqip-best-practices-spine-injury-guidelines.pdf)

- **Version:** American College of Surgeons, March 2022.
- **Locator:** Initial stabilization, printed page 17; cardiovascular management, printed page 46.
- **Accessed:** 2026-11-06. Official PDF downloaded and relevant sections inspected.

### aha-sah-2023

[2023 AHA/ASA Guideline for the Management of Patients With Aneurysmal Subarachnoid Hemorrhage](https://www.ahajournals.org/doi/pdf/10.1161/STR.0000000000000436)

- **Version:** 2023 guideline.
- **Locator:** Sections 8.2 and 8.3; printed e338–e339: DCI timing and enteral nimodipine.
- **Accessed:** 2026-11-06. Publisher-indexed recommendation sections inspected.

### eso-sah-2026

[ESO/EANS/ESMINT Guideline on Aneurysmal Subarachnoid Haemorrhage](https://pubmed.ncbi.nlm.nih.gov/42095754/)

- **Version:** 2026 European guideline.
- **Locator:** Author abstract and PICO 4 recommendation.
- **Accessed:** 2026-11-06. Primary guideline author abstract inspected through PubMed; full publisher page was inaccessible.

### ssc-2026

[Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2026](https://www.sccm.org/survivingsepsiscampaign/guidelines-and-resources/surviving-sepsis-campaign-adult-guidelines)

- **Version:** SCCM/ESICM 2026 guideline, superseding the 2021 edition.
- **Locator:** Blood culture; antibiotic initiation; mean arterial pressure; vasopressors.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### ssc-2016-evidence

[Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2016](https://doi.org/10.1097/CCM.0000000000002255)

- **Version:** 2016 guideline published 2017; historical evidence only.
- **Locator:** Vasoactive medications: norepinephrine versus dopamine meta-analysis.
- **Accessed:** 2026-11-06. Publisher-indexed evidence paragraph inspected; not used as the current treatment guideline.

### rcuk-anaphylaxis-2021

[Resuscitation Council UK: Emergency Treatment of Anaphylaxis](https://www.resus.org.uk/sites/default/files/2021-05/Emergency%20Treatment%20of%20Anaphylaxis%20May%202021_0.pdf)

- **Version:** May 2021 guideline; current RCUK guidance page identifies it as the latest version.
- **Locator:** Adrenaline first line; antihistamines; section 5.5 corticosteroids.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### ats-abg

[American Thoracic Society: Interpretation of Arterial Blood Gases](https://site.thoracic.org/assemblies/cc/clinical-education/interpretation-of-abgs)

- **Version:** Undated current ATS clinical education page; accessed 2026-11-06.
- **Locator:** Steps 1–4: internal consistency, primary disorder and expected compensation.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### esicm-sepsis-education-2026

[ESICM Academy: Sepsis and Septic Shock Part II](https://academy.esicm.org/pluginfile.php/103868/mod_resource/content/16/Sepsis%20and%20Septic%20Shock%20Part%20II.pdf)

- **Version:** ESICM educational PDF accessed 2026-11-06; publication date not verified.
- **Locator:** Blood lactate interpretation and causes of elevation in sepsis.
- **Accessed:** 2026-11-06. Issuing-society indexed PDF passage inspected.

### whang-mg-1992

[Refractory Potassium Repletion: A Consequence of Magnesium Deficiency](https://jamanetwork.com/journals/jamainternalmedicine/article-abstract/615872)

- **Version:** Whang et al., Archives of Internal Medicine 1992;152:40–45.
- **Locator:** Abstract: magnesium deficiency and refractory potassium repletion.
- **Accessed:** 2026-11-06. Original article abstract inspected; older physiological evidence, not a current dosing protocol.

### umaryland-mg-2026

[University of Maryland Emergency Medicine: Approach to Hypomagnesemia](https://www.medschool.umaryland.edu/em/cme/umem-educational-pearls/?id=5126)

- **Version:** Posted 10 July 2026; updated 12 October 2026.
- **Locator:** Pediatric Electrolytes pearl: refractory potassium and magnesium; stated adult applicability.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### aacn-synergy

[AACN Synergy Model for Patient Care](https://www.aacn.org/-/media/aacn-website/nursing-excellence/standards/aacnsynergymodelforpatientcare.pdf?hash=9984AB2CF439B41D6EA0668C6F7489D88FA0F106&la=en)

- **Version:** Undated official model PDF linked by current AACN standards page.
- **Locator:** PDF pages 4, 7 and 8: Advocacy/Moral Agency, Response to Diversity, Clinical Inquiry.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

### wsna-chain-2023

[Washington State Nurses Association: Chain of Command—What Nurses Need to Know](https://www.wsna.org/news/2023/chain-of-command-what-nurses-need-to-know)

- **Version:** 2023 nursing-association guidance.
- **Locator:** Escalating unresolved patient-care concerns.
- **Accessed:** 2026-11-06. Publisher or issuing-organization text inspected.

## Individual item records

The JSON blocks are the original user-provided bank content. They are retained for audit, including text classified as unsupported. They are not corrected clinical instructions. The assessments below them are the audit’s comparison and inference from the cited sources.

### q001

**Status:** quarantined. **Original key:** A (index 0). **Clinical reviewer:** none.

**Content SHA-256:** `c2abd5153b64fd9e955624dc667b2b6f1425c6d6a04c9e81f666ffcd0afb8dad`

```json
{
  "sys": "cv",
  "topic": "ACS",
  "q": "A patient with an inferior STEMI becomes hypotensive (BP 82/50) shortly after receiving sublingual nitroglycerin. Lungs are clear. What is the priority action?",
  "o": [
    "Administer a 250&ndash;500 mL isotonic fluid bolus",
    "Give a second dose of nitroglycerin",
    "Start a nitroprusside infusion",
    "Administer IV furosemide"
  ],
  "a": 0,
  "r": "Inferior STEMIs frequently involve the RV, which is <b>preload dependent</b>. Nitroglycerin drops preload and causes profound hypotension. The fix is a fluid bolus to restore preload &mdash; not more vasodilators or diuretics."
}
```

- **Stem, key and distractors:** A is the intended choice. B and C further lower pressure; D reduces preload. Clear lungs alone do not establish a safe volume-loading state.
- **Whole rationale:** The nitrate/RV mechanism is supported; describing a bolus as the fix omits assessment of venous congestion and response.
- **Uncertainty/context:** RV involvement is suspected, not proved; a universal 250–500 mL instruction is not established by this stem.
- **Proposed repair:** Specify suspected RV infarction with low/normal filling pressure; use a cautious fluid challenge with reassessment and urgent reperfusion evaluation.
- **Source sections:** [aha_acs_2025](#aha-acs-2025): Table 6: nitrates; evaluation of inferior STEMI for RV involvement; [aha_rv_2018](#aha-rv-2018): Acute RV failure management algorithm: preload optimization and RV myocardial infarction; [ucsf_rv](#ucsf-rv): Management: fluid administration according to JVP.
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q002

**Status:** quarantined. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `bc17c473fe342d2d0006808fdbbcbebc17a9ddeaf8c226eb8cbf2a299c7e8c2d`

```json
{
  "sys": "cv",
  "topic": "ACS",
  "q": "Which patient presentation should raise the highest suspicion for an atypical acute coronary syndrome?",
  "o": [
    "A 45-year-old man with crushing substernal chest pain and diaphoresis",
    "A 72-year-old woman with diabetes reporting new fatigue, nausea, and dyspnea",
    "A 30-year-old with sharp pain that worsens with inspiration",
    "A 55-year-old with chest wall tenderness reproducible on palpation"
  ],
  "a": 1,
  "r": "Women, older adults, and diabetics often present <b>without</b> classic chest pain &mdash; fatigue, dyspnea, nausea, or epigastric discomfort. This is a heavily tested pattern because the atypical presentation is easy to miss."
}
```

- **Stem, key and distractors:** B best matches a non-chest symptom presentation. A is also highly concerning for ACS. C and D are less characteristic, but cannot alone exclude ACS.
- **Whole rationale:** The demographic generalization can obscure the fact that chest pain remains common in women. No source validates the heavily-tested claim.
- **Uncertainty/context:** Risk factors change suspicion; this item does not establish comparative probability across real patients.
- **Proposed repair:** Ask about possible anginal equivalents, avoid atypical, and remove claims about examination frequency.
- **Source sections:** [aha_chest_pain_2021](#aha-chest-pain-2021): Items 1, 7 and 9: anginal equivalents, sex differences and terminology.
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q003

**Status:** quarantined. **Original key:** C (index 2). **Clinical reviewer:** none.

**Content SHA-256:** `fa1ee4704d7b520ae3402c3ee7428466000986417cb7000a72ba04337e883e4a`

```json
{
  "sys": "cv",
  "topic": "Cardiogenic shock",
  "q": "A post-MI patient has CI 1.8, PCWP 24, SVR elevated, and MAP 58. Which finding most distinguishes this from hypovolemic shock?",
  "o": [
    "The low cardiac index",
    "The elevated SVR",
    "The elevated PCWP",
    "The low MAP"
  ],
  "a": 2,
  "r": "Cardiogenic and hypovolemic shock both show low CI and high SVR. The <b>PCWP (preload)</b> separates them: elevated in cardiogenic (backward failure), low in hypovolemic. That's why a fluid bolus helps hypovolemia but worsens cardiogenic shock."
}
```

- **Stem, key and distractors:** C best distinguishes this congested post-MI profile. A, B and D can occur in both shock categories.
- **Whole rationale:** PCWP 24 supports elevated left-sided filling pressure here. Cardiogenic shock has several profiles, so fluid always worsens it is too broad.
- **Uncertainty/context:** PCWP interpretation depends on measurement quality, ventilation and the ventricular pathology.
- **Proposed repair:** Limit the explanation to this congested phenotype; distinguish measured pressure from volume responsiveness.
- **Source sections:** [esc_acvc_2025](#esc-acvc-2025): Sections 4.1 and 4.2: hemodynamic profiles and fluid challenge; [aha_rv_2018](#aha-rv-2018): Acute RV failure management algorithm: preload optimization and RV myocardial infarction.
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q004

**Status:** source-supported. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `705e928a49fd8bd7d46375c51961565df14465bb0d25cc98a1f0c1e5ab1ad1ad`

```json
{
  "sys": "cv",
  "topic": "Tamponade",
  "q": "A patient 6 hours post-cardiac surgery develops hypotension, rising CVP, JVD, and a sudden drop in chest tube output. What complication is most likely?",
  "o": [
    "Tension pneumothorax",
    "Cardiac tamponade",
    "Acute pulmonary embolus",
    "Hypovolemic shock"
  ],
  "a": 1,
  "r": "A sudden <b>decrease in chest-tube drainage</b> with rising filling pressures and hypotension post-op suggests <b>clot causing tamponade</b>. Blood that can't drain compresses the heart. Escalate immediately for possible re-exploration."
}
```

- **Stem, key and distractors:** B best unifies rising CVP with abrupt loss of drain output. A and C can cause obstructive shock but do not explain the drainage change as directly; D generally lowers filling pressure.
- **Whole rationale:** Obstructed postoperative drainage, tamponade suspicion and immediate surgical escalation are supported.
- **Uncertainty/context:** This is a most-likely complication question, not a definitive diagnostic test.
- **Proposed repair:** Optional refinement: mention urgent bedside assessment/echocardiography without delaying surgical response.
- **Source sections:** [aats_tamponade](#aats-tamponade): Cardiac tamponade: postoperative bleeding, drainage obstruction and surgical management.
- **Required review:** No blocking discrepancy identified by this source comparison. Licensed clinical review remains outstanding; any content edit requires renewed review and a new hash.

### q005

**Status:** quarantined. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `4dccd0f26d2e97c301e03cac674e40c6819e81a2de1ec04d746f8874372b3eb4`

```json
{
  "sys": "cv",
  "topic": "Dysrhythmias",
  "q": "A patient in monomorphic VT with a pulse becomes unresponsive with BP 68/40. What is the correct intervention?",
  "o": [
    "Amiodarone 150 mg IV over 10 minutes",
    "Synchronized cardioversion",
    "Defibrillation at 200 J",
    "Vagal maneuvers"
  ],
  "a": 1,
  "r": "VT <b>with a pulse</b> that is <b>unstable</b> (hypotension, altered mental status) calls for <b>synchronized cardioversion</b>. Defibrillation is for pulseless VT/VF. Amiodarone is for the stable patient."
}
```

- **Stem, key and distractors:** B fits unstable monomorphic VT with a pulse. A and D must not delay shock. C is not the usual initial mode for this rhythm.
- **Whole rationale:** The statements assigning defibrillation only to pulseless rhythms and amiodarone only to stable patients are incomplete.
- **Uncertainty/context:** Rhythm morphology, pulse and ability to synchronize matter; drug indications cannot be reduced to stable versus unstable.
- **Proposed repair:** Keep synchronized cardioversion for this case; describe sustained polymorphic VT and failed/unavailable synchronization exceptions separately.
- **Source sections:** [aha_als_2025](#aha-als-2025): Sections 15 (wide-complex tachycardia) and 16 (polymorphic ventricular tachycardia).
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q006

**Status:** quarantined. **Original key:** A (index 0). **Clinical reviewer:** none.

**Content SHA-256:** `68166bd6aad7f38534728f160975577b2a157f0af26b72a5066d840ca8d8c5ec`

```json
{
  "sys": "cv",
  "topic": "Dysrhythmias",
  "q": "A patient develops torsades de pointes. In addition to defibrillation if pulseless, what is the priority medication?",
  "o": [
    "Magnesium sulfate",
    "Adenosine",
    "Calcium gluconate",
    "Amiodarone"
  ],
  "a": 0,
  "r": "Torsades (polymorphic VT with prolonged QT) is treated with <b>IV magnesium</b>, and correcting the underlying QT prolongation/electrolytes. Amiodarone can prolong QT further."
}
```

- **Stem, key and distractors:** A is the relevant medication for recurrent long-QT polymorphic VT; B and C do not treat torsades, and D may aggravate QT prolongation.
- **Whole rationale:** Magnesium is not a substitute for immediate unsynchronized shock in sustained polymorphic VT with or without a pulse.
- **Uncertainty/context:** The stem omits duration and clinical stability, so medication priority is unsafe as written.
- **Proposed repair:** State sustained versus recurrent/self-terminating torsades; make shock priority explicit and then ask about magnesium.
- **Source sections:** [aha_als_2025](#aha-als-2025): Sections 15 (wide-complex tachycardia) and 16 (polymorphic ventricular tachycardia).
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q007

**Status:** source-supported. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `268ad704372f129a5511e1c2f6219b60c250ecf16083d63ed474382532093cfa`

```json
{
  "sys": "cv",
  "topic": "Aortic dissection",
  "q": "A patient with a suspected aortic dissection has BP 190/110 and HR 96. Which order should the nurse question if written to be given FIRST?",
  "o": [
    "Esmolol infusion",
    "Nitroprusside infusion",
    "Labetalol IV",
    "Pain management with opioid"
  ],
  "a": 1,
  "r": "In dissection you must lower <b>shear stress</b> first with a beta-blocker before adding a vasodilator. Starting <b>nitroprusside alone</b> causes reflex tachycardia that increases shear and can extend the dissection. Beta-blockade first."
}
```

- **Stem, key and distractors:** B is the order to question when given first. A and C provide anti-impulse treatment; D is appropriate analgesia.
- **Whole rationale:** Avoiding isolated vasodilator-induced tachycardia before rate control is supported for the scenario.
- **Uncertainty/context:** This is initial medical stabilization; anatomy and complications determine definitive treatment.
- **Proposed repair:** Optional refinement: say unless beta-blockade is contraindicated, and identify an appropriate alternative.
- **Source sections:** [aha_aorta_2022](#aha-aorta-2022): Section 7.3.1: acute medical management of acute aortic syndromes.
- **Required review:** No blocking discrepancy identified by this source comparison. Licensed clinical review remains outstanding; any content edit requires renewed review and a new hash.

### q008

**Status:** quarantined. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `0d06ce08282e6b5d0e0a2a94eb1578672fb345b3cd7e05c50b04edbf8b6874ca`

```json
{
  "sys": "resp",
  "topic": "ARDS",
  "q": "An ARDS patient on the ventilator has a PaO2 of 55 despite FiO2 increased to 90%. What ventilator change most directly addresses the problem?",
  "o": [
    "Increase the respiratory rate",
    "Increase PEEP",
    "Increase tidal volume to 10 mL/kg",
    "Decrease the inspiratory time"
  ],
  "a": 1,
  "r": "Refractory hypoxemia in ARDS is driven by <b>shunt</b> (collapsed alveoli). <b>Increasing PEEP</b> recruits alveoli and improves oxygenation. Raising tidal volume violates lung-protective ventilation; more FiO2 alone can't fix shunt."
}
```

- **Stem, key and distractors:** B may improve oxygenation. A targets ventilation, C exceeds protective volumes, and D is not a general remedy. None establishes safe PEEP titration without current settings.
- **Whole rationale:** Recruitment is possible, not guaranteed; further PEEP can overdistend lung and impair circulation.
- **Uncertainty/context:** Recruitability and tolerance are unknown; the PaO2/FiO2 ratio alone does not prescribe the next PEEP level.
- **Proposed repair:** Include current PEEP, plateau pressure and hemodynamics; ask about individualized higher-PEEP assessment in moderate-to-severe ARDS.
- **Source sections:** [ats_ards_2024](#ats-ards-2024): Question 4: higher PEEP; implementation considerations; retained ventilation recommendations.
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q009

**Status:** source-supported. **Original key:** A (index 0). **Clinical reviewer:** none.

**Content SHA-256:** `fab8dc8bca77df2fba906c0f5adab94d7c8814d620b93e7976d92d3e33efc7bb`

```json
{
  "sys": "resp",
  "topic": "ARDS",
  "q": "Which ventilator setting is the cornerstone lung-protective strategy proven to reduce mortality in ARDS?",
  "o": [
    "Tidal volume 4&ndash;6 mL/kg predicted body weight",
    "Tidal volume 10&ndash;12 mL/kg actual body weight",
    "Plateau pressure maintained above 35 cmH2O",
    "FiO2 maintained at 100%"
  ],
  "a": 0,
  "r": "<b>Low tidal volume (4&ndash;6 mL/kg PBW)</b> with plateau pressure &lt;30 is the survival intervention in ARDS, limiting volutrauma to already-damaged alveoli."
}
```

- **Stem, key and distractors:** A is the only protective-volume choice. B uses excessive volume and the wrong weight basis; C permits excessive plateau pressure; D is not a mortality-reducing strategy.
- **Whole rationale:** 4–6 mL/kg PBW is within the guideline 4–8 range, with usual initiation at 6 and plateau pressure below 30.
- **Uncertainty/context:** Source-supported does not mean 6 is a universal maximum or that tidal volume is the only useful intervention.
- **Proposed repair:** Optional clarification: present 4–8 mL/kg PBW, adjusted to pressure and clinical response; avoid implying exclusivity among beneficial ARDS therapies.
- **Source sections:** [ats_ventilation_2017](#ats-ventilation-2017): Question 1: low tidal volume and inspiratory pressure limitation; [ats_ards_2024](#ats-ards-2024): Question 4: higher PEEP; implementation considerations; retained ventilation recommendations.
- **Required review:** No blocking discrepancy identified by this source comparison. Licensed clinical review remains outstanding; any content edit requires renewed review and a new hash.

### q010

**Status:** source-supported. **Original key:** A (index 0). **Clinical reviewer:** none.

**Content SHA-256:** `b2d385d0ca3befba4f885f079b257b3c2ea122e27f89e6289ebb843caed5e225`

```json
{
  "sys": "resp",
  "topic": "PE",
  "q": "A patient is 2 days post-op with sudden dyspnea, HR 122, SpO2 86%, and pleuritic chest pain. ABG shows respiratory alkalosis with hypoxemia. What is the most likely diagnosis?",
  "o": [
    "Acute pulmonary embolus",
    "Cardiogenic pulmonary edema",
    "Status asthmaticus",
    "Tension pneumothorax"
  ],
  "a": 0,
  "r": "Sudden dyspnea, tachycardia, hypoxia, pleuritic pain, and <b>respiratory alkalosis</b> in a post-op (immobile) patient is the classic <b>PE</b> presentation from dead-space ventilation and CO2 washout."
}
```

- **Stem, key and distractors:** A best combines recent surgery, abrupt symptoms and pleuritic pain. B lacks congestion clues; C lacks obstructive-airway history/findings; D needs immediate assessment but has no supporting unilateral/tension findings.
- **Whole rationale:** PE can produce increased dead space with compensatory hyperventilation, hypoxemia and hypocapnia. The described constellation is compatible, not confirmatory.
- **Uncertainty/context:** PE may occur without hypoxemia or hypocapnia, and the competing emergencies remain bedside differentials.
- **Proposed repair:** Optional refinement: explicitly require a diagnostic pathway rather than diagnosing from ABG alone.
- **Source sections:** [aha_pe_2026](#aha-pe-2026): Clinical evaluation, diagnostic assessment and risk stratification; [esc_pe_2019](#esc-pe-2019): Section 4: clinical presentation and pathophysiology.
- **Required review:** No blocking discrepancy identified by this source comparison. Licensed clinical review remains outstanding; any content edit requires renewed review and a new hash.

### q011

**Status:** source-supported. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `a6e30075f7313e9b09ee146b055b4cfdfeb9a0ffa13d8dae1bec579bf132aed6`

```json
{
  "sys": "resp",
  "topic": "Status asthmaticus",
  "q": "A patient in status asthmaticus was tachypneic with loud wheezing. The nurse now notes a 'quiet chest' and a PaCO2 that has risen from 30 to 45. This indicates:",
  "o": [
    "The patient is improving and can be weaned off treatment",
    "Impending respiratory failure requiring intubation readiness",
    "Successful bronchodilator response",
    "A need to decrease supplemental oxygen"
  ],
  "a": 1,
  "r": "A <b>silent chest</b> and a <b>normalizing/rising CO2</b> in a previously tachypneic asthmatic signal <b>severe air trapping and fatigue</b> &mdash; impending respiratory failure. This is a deterioration, not improvement."
}
```

- **Stem, key and distractors:** B is the appropriate interpretation. A and C misread declining airflow as improvement; D does not address ventilatory failure.
- **Whole rationale:** A newly silent chest with rising PaCO2 during severe asthma signals dangerous loss of ventilation and need for immediate escalation.
- **Uncertainty/context:** The question appropriately asks for readiness, not an automatic intubation decision from one value.
- **Proposed repair:** Optional refinement: state urgent senior/critical-care assessment; intubation is based on the whole clinical picture.
- **Source sections:** [gina_2026](#gina-2026): Printed pages 31, 170 and 185: silent chest and blood gases in exacerbations.
- **Required review:** No blocking discrepancy identified by this source comparison. Licensed clinical review remains outstanding; any content edit requires renewed review and a new hash.

### q012

**Status:** quarantined. **Original key:** A (index 0). **Clinical reviewer:** none.

**Content SHA-256:** `b53ad55348159a8af53f43875c8a6f3e96f0dc3eb44df16a3a16f62b95743f49`

```json
{
  "sys": "resp",
  "topic": "Vent complications",
  "q": "A ventilated patient suddenly desaturates and becomes agitated with a high-pressure alarm. After disconnecting and manually bagging, what is the nurse assessing?",
  "o": [
    "Whether the problem is the patient or the equipment",
    "The patient's sedation depth",
    "The need to increase PEEP",
    "The FiO2 setting"
  ],
  "a": 0,
  "r": "Manual bagging (the 'B' approach with <b>DOPE</b>) separates a patient problem from a machine problem. If bagging is easy and sats improve, it's the equipment; if bagging is hard, look at the patient (obstruction, pneumothorax, tube displacement)."
}
```

- **Stem, key and distractors:** A describes the purpose better than B, C or D. Bagging response can guide investigation but cannot prove equipment versus patient causation.
- **Whole rationale:** Improvement after disconnection can also follow altered ventilation or relief of air trapping. The cited manual supports systematic airway, patient and equipment checks, not the asserted rule.
- **Uncertainty/context:** The DOPE B wording is unexplained and no authoritative source for that exact mnemonic expansion was verified.
- **Proposed repair:** Replace the easy/hard binary with assessment of compliance, oxygen supply, circuit, tube and reversible patient causes.
- **Source sections:** [stanford_em](#stanford-em): Hypoxemia emergency: manual ventilation, independent oxygen source, airway and equipment checks.
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q013

**Status:** source-supported. **Original key:** C (index 2). **Clinical reviewer:** none.

**Content SHA-256:** `52082bb09a905e297ae234e206046484f14c61dc17c791a5e3a3051ac28a72ee`

```json
{
  "sys": "resp",
  "topic": "ARF",
  "q": "A COPD patient in acute respiratory failure has SpO2 84%. The nurse should titrate oxygen to a target SpO2 of approximately:",
  "o": [
    "100%",
    "95&ndash;100%",
    "88&ndash;92%",
    "80&ndash;85%"
  ],
  "a": 2,
  "r": "In COPD, target <b>SpO2 88&ndash;92%</b>. Over-oxygenation can worsen hypercapnia and CO2 narcosis &mdash; but never leave them frankly hypoxic. Titrate to the window."
}
```

- **Stem, key and distractors:** C is the standard initial target. A and B risk excessive oxygen exposure; D leaves the patient inadequately oxygenated.
- **Whole rationale:** Controlled oxygen and risk of oxygen-related hypercapnia are supported.
- **Uncertainty/context:** This does not replace assessment for noninvasive ventilation or other support in hypercapnic acidosis.
- **Proposed repair:** Optional refinement: add blood-gas reassessment and any documented individualized target.
- **Source sections:** [copd_standard_2024](#copd-standard-2024): Quality statement 8: controlled oxygen therapy during exacerbation; [gold_2026](#gold-2026): Report identification and exacerbation chapter; edition check only.
- **Required review:** No blocking discrepancy identified by this source comparison. Licensed clinical review remains outstanding; any content edit requires renewed review and a new hash.

### q014

**Status:** quarantined. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `60fac78bcfceaa3cc48577f33041038392fafef0bb4ea5cca4b336ad7612229e`

```json
{
  "sys": "ehgri",
  "topic": "DKA",
  "q": "A patient in DKA has a serum potassium of 3.1 mEq/L. The provider orders an insulin infusion. What should the nurse do?",
  "o": [
    "Start the insulin infusion immediately",
    "Hold insulin and notify the provider to replace potassium first",
    "Give the insulin at half the ordered rate",
    "Administer a potassium-sparing diuretic"
  ],
  "a": 1,
  "r": "Insulin drives potassium <b>into cells</b>. Starting insulin with K &lt;3.3 can cause <b>life-threatening hypokalemia</b> and arrhythmia. Replace potassium first, then start insulin."
}
```

- **Stem, key and distractors:** B fits potassium 3.1. A and C expose the patient to further potassium shift; D is not acute deficit replacement.
- **Whole rationale:** The original uses 3.3; current guidance delays insulin below 3.5 until potassium exceeds 3.5.
- **Uncertainty/context:** The numeric error matters even though it does not change this case’s answer.
- **Proposed repair:** Update the cutoff and require monitored replacement under the local protocol.
- **Source sections:** [ada_hospital_2026](#ada-hospital-2026): Recommendation 16.16; Table 16.1; Figure 16.1, printed S348; [ada_crises_2024](#ada-crises-2024): Section 4: potassium, fluid therapy, resolution criteria and transition.
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q015

**Status:** quarantined. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `96b910d8df3f7df318f96864be2cbdfa92d628cefab61d9a7e09b3df2530ea60`

```json
{
  "sys": "ehgri",
  "topic": "DKA",
  "q": "When treating DKA, what indicates the insulin infusion has done its job and can be transitioned?",
  "o": [
    "Blood glucose reaches 200 mg/dL",
    "The anion gap closes / ketones clear",
    "Urine output normalizes",
    "The patient reports feeling better"
  ],
  "a": 1,
  "r": "The endpoint of DKA treatment is <b>closing the anion gap</b>, not just normalizing glucose. Dextrose is added around glucose 200 so insulin keeps running until the gap/ketones resolve."
}
```

- **Stem, key and distractors:** A, C and D alone do not establish resolution; B mixes an obsolete criterion with unspecified ketones.
- **Whole rationale:** The 2024 criteria use blood ketones below 0.6 plus pH at least 7.3 or bicarbonate at least 18; exclude anion gap/urine ketones. Add dextrose below 250.
- **Uncertainty/context:** The 2026 Figure 16.1 prints strict greater-than for pH/bicarbonate, versus the 2024 greater-than-or-equal criteria. The reviewer must explicitly select the protocol and ketone assay.
- **Proposed repair:** Replace B and rationale; specify subcutaneous insulin overlap at transition.
- **Source sections:** [ada_crises_2024](#ada-crises-2024): Section 4: potassium, fluid therapy, resolution criteria and transition; [ada_hospital_2026](#ada-hospital-2026): Recommendation 16.16; Table 16.1; Figure 16.1, printed S348.
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q016

**Status:** source-supported. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `8ef0d848439cf9575b527e711cec2d64af94f1abd1d8271ab5e9da6cf7cbdb4e`

```json
{
  "sys": "ehgri",
  "topic": "HHS",
  "q": "A patient presents with glucose 780, minimal ketones, pH 7.34, serum osmolality 340, and altered mental status. What is the priority intervention?",
  "o": [
    "High-dose insulin bolus",
    "Aggressive isotonic fluid resuscitation",
    "Sodium bicarbonate",
    "Rapid correction of glucose to normal"
  ],
  "a": 1,
  "r": "This is <b>HHS</b> &mdash; profound dehydration with huge fluid deficits and minimal acidosis. <b>Fluids</b> are the priority. Glucose/osmolality must be corrected <b>gradually</b> to avoid cerebral edema."
}
```

- **Stem, key and distractors:** B is best. A, C and D do not address the priority described.
- **Whole rationale:** The HHS pattern and controlled restoration of hydration are supported.
- **Uncertainty/context:** Volume/rate must account for age, cardiac/renal function and osmolality trajectory; bicarbonate and quantitative ketones would complete diagnostic criteria.
- **Proposed repair:** Optional wording improvement: replace aggressive with individualized isotonic crystalloid replacement and reassessment.
- **Source sections:** [ada_hospital_2026](#ada-hospital-2026): Recommendation 16.16; Table 16.1; Figure 16.1, printed S348; [ada_crises_2024](#ada-crises-2024): Section 4: potassium, fluid therapy, resolution criteria and transition.
- **Required review:** No blocking discrepancy identified by this source comparison. Licensed clinical review remains outstanding; any content edit requires renewed review and a new hash.

### q017

**Status:** quarantined. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `c4392482b93761f8ed3aed5f1dc26dffab6ab618581f5628e61532e74ab9a2b5`

```json
{
  "sys": "ehgri",
  "topic": "HIT",
  "q": "A patient on heparin for 6 days has a platelet drop from 240,000 to 110,000 and a new DVT. What is the priority action?",
  "o": [
    "Transfuse platelets",
    "Stop all heparin and start a non-heparin anticoagulant",
    "Continue heparin and add aspirin",
    "Flush all lines with heparin to maintain patency"
  ],
  "a": 1,
  "r": "This is <b>HIT</b> &mdash; despite low platelets the danger is <b>thrombosis</b>. <b>Stop all heparin</b> (including flushes/coated lines) and start a non-heparin anticoagulant like argatroban. Do <b>not</b> transfuse platelets."
}
```

- **Stem, key and distractors:** B fits a high-probability HIT pattern. C and D continue heparin exposure; A is not routine first-line treatment.
- **Whole rationale:** This is suspected HIT pending appropriate testing. Platelet transfusion is generally avoided, but active bleeding or high bleeding risk can justify it.
- **Uncertainty/context:** Other platelet-drop causes and bleeding risk still require assessment; do not wait for confirmatory testing in a high-probability case.
- **Proposed repair:** Use suspected HIT, include 4Ts/testing, and replace never-transfuse wording with the guideline’s conditional recommendation.
- **Source sections:** [ash_hit_2018](#ash-hit-2018): Recommendations 2.6, 3.1 and 3.6; 4Ts assessment; [ash_hit_status](#ash-hit-status): Guideline status and supporting resources.
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q018

**Status:** quarantined. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `a5d73ea718e852e801d3ada33dcd1ee388f206baea8273915d8a5d007f2ff9d2`

```json
{
  "sys": "ehgri",
  "topic": "Transfusion",
  "q": "Thirty minutes into a PRBC transfusion, a patient develops acute dyspnea and hypoxemia. Filling pressures are normal and there is no JVD. This is most consistent with:",
  "o": [
    "TACO (circulatory overload)",
    "TRALI",
    "Acute hemolytic reaction",
    "Febrile non-hemolytic reaction"
  ],
  "a": 1,
  "r": "Acute hypoxemia within 6 hours with <b>normal</b> filling pressures points to <b>TRALI</b> (non-cardiogenic lung injury). TACO would show hypertension, JVD, and volume overload and responds to diuretics."
}
```

- **Stem, key and distractors:** B is plausible. A is not excluded merely by absent JVD; C can also cause acute dyspnea; D is less consistent without fever but the reaction requires investigation.
- **Whole rationale:** TRALI assessment needs pulmonary edema and alternative-cause evaluation. TACO does not require every listed sign, and overlap is possible.
- **Uncertainty/context:** Normal filling pressure alone is insufficient to label this reaction.
- **Proposed repair:** Add imaging and relevant clinical context; make immediate transfusion cessation/escalation explicit and use probabilistic comparison.
- **Source sections:** [lifeblood_trali](#lifeblood-trali): When to suspect; investigation; immediate management; [lifeblood_taco](#lifeblood-taco): Clinical features, diagnostic criteria and distinction from TRALI.
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q019

**Status:** quarantined. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `d3ab25c89243b116a5a4c04fb3da51381cf8fdb287387de4c75b9b74fd08873e`

```json
{
  "sys": "ehgri",
  "topic": "AKI",
  "q": "An AKI patient has peaked T waves and a widening QRS. What is the FIRST medication to administer?",
  "o": [
    "Regular insulin with dextrose",
    "IV calcium gluconate",
    "Sodium polystyrene sulfonate",
    "Albuterol nebulizer"
  ],
  "a": 1,
  "r": "With ECG changes from hyperkalemia, give <b>IV calcium first</b> to stabilize the cardiac membrane. Insulin/glucose and albuterol shift K intracellularly; kayexalate/dialysis remove it &mdash; but calcium buys time immediately."
}
```

- **Stem, key and distractors:** B treats immediate ECG toxicity. A and D shift potassium but do not replace calcium’s role; C is not an appropriate emergency first choice.
- **Whole rationale:** The original groups Kayexalate with dialysis without disclosing its delayed, unpredictable effect and lack of routine acute-treatment recommendation.
- **Uncertainty/context:** Confirm hyperkalemia and monitor urgently; formulation and dose depend on arrest/peri-arrest context and local protocol.
- **Proposed repair:** Keep calcium priority; distinguish stabilization, shifting and effective removal, and remove the implied routine emergency role for polystyrene resin.
- **Source sections:** [ukka_hyperkalemia_2026](#ukka-hyperkalemia-2026): 16.2a–b: IV calcium; 16.3–16.4: shifting; 16.6.3: cation-exchange resins.
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q020

**Status:** quarantined. **Original key:** A (index 0). **Clinical reviewer:** none.

**Content SHA-256:** `56a29c2b9a6ebc45224a108fa8c08ecf75e0588cf0279ed4c34d8fadcc1ec38b`

```json
{
  "sys": "mnb",
  "topic": "Stroke",
  "q": "A patient with an acute ischemic stroke is a thrombolytic candidate. What blood pressure must be achieved before administering alteplase?",
  "o": [
    "Below 185/110 mmHg",
    "Below 220/120 mmHg",
    "Below 140/90 mmHg",
    "Any BP is acceptable"
  ],
  "a": 0,
  "r": "Before IV thrombolytics for ischemic stroke, BP must be <b>&lt;185/110</b> to reduce hemorrhagic conversion risk. Without tPA, higher pressures are tolerated to perfuse the penumbra."
}
```

- **Stem, key and distractors:** A is the relevant pre-alteplase limit. B is not a thrombolysis threshold; C is unnecessarily restrictive; D is unsafe.
- **Whole rationale:** Absence of alteplase does not establish eligibility for permissive hypertension: EVT plans and other urgent conditions also matter.
- **Uncertainty/context:** The original collapses several distinct stroke-treatment pathways into one rule.
- **Proposed repair:** Retain the threshold; scope any higher-pressure discussion to patients without reperfusion therapy or a separate urgent BP indication.
- **Source sections:** [aha_stroke_2026](#aha-stroke-2026): Blood Pressure Management: IV thrombolysis, EVT and no-reperfusion recommendations.
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q021

**Status:** source-supported. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `b94c5b76a194052384604d5ddb2bdde8cd2ed20b459e7fbaa1f51c8910c15bd8`

```json
{
  "sys": "mnb",
  "topic": "TBI",
  "q": "A TBI patient develops hypertension with a widening pulse pressure, bradycardia, and irregular respirations. This represents:",
  "o": [
    "Adequate cerebral perfusion",
    "Cushing's triad indicating impending herniation",
    "Neurogenic shock",
    "A normal response to sedation"
  ],
  "a": 1,
  "r": "<b>Cushing's triad</b> (hypertension/widening pulse pressure, bradycardia, irregular respirations) is a <b>late, ominous</b> sign of dangerously high ICP and impending herniation &mdash; act now."
}
```

- **Stem, key and distractors:** B identifies the described triad. A and D falsely reassure; C ordinarily involves hypotension rather than this hypertension pattern.
- **Whole rationale:** The triad is a late, ominous warning of intracranial hypertension/herniation risk; prompt action is appropriate.
- **Uncertainty/context:** Clinical signs are not a direct ICP measurement; the accessible ENLS source is older, cross-checked with contemporary ACS assessment guidance.
- **Proposed repair:** Optional refinement: use concerning for herniation and integrate the full neurological assessment.
- **Source sections:** [enls_icp_v5](#enls-icp-v5): Diagnosis section, page 4: signs of intracranial hypertension and herniation; [acs_tbi_2024](#acs-tbi-2024): Neurological assessment, printed pages 7–9; ICP monitoring section, printed page 22.
- **Required review:** No blocking discrepancy identified by this source comparison. Licensed clinical review remains outstanding; any content edit requires renewed review and a new hash.

### q022

**Status:** quarantined. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `84b16bee61c1ce39728004d146300faaf9ea828470bfacb51e93bbb217bdc3f8`

```json
{
  "sys": "mnb",
  "topic": "ICP",
  "q": "Which is the earliest and most reliable indicator of increasing intracranial pressure?",
  "o": [
    "Fixed, dilated pupils",
    "A change in level of consciousness",
    "Cushing's triad",
    "Decorticate posturing"
  ],
  "a": 1,
  "r": "A <b>change in LOC</b> is the earliest and most sensitive sign of rising ICP. Pupillary changes, Cushing's triad, and posturing are <b>late</b> findings."
}
```

- **Stem, key and distractors:** B can be an important early warning. A and D are concerning findings and C is often late; this does not prove a universal sequence.
- **Whole rationale:** Sedation and other causes confound consciousness. Quantitative pupil changes may be early, so all pupillary changes cannot be labeled late.
- **Uncertainty/context:** The stem gives no injury, monitoring, baseline examination or sedation context.
- **Proposed repair:** Ask which new bedside change warrants urgent reassessment in a specified examinable patient; remove universal sensitivity claims.
- **Source sections:** [acs_tbi_2024](#acs-tbi-2024): Neurological assessment, printed pages 7–9; ICP monitoring section, printed page 22; [enls_icp_v5](#enls-icp-v5): Diagnosis section, page 4: signs of intracranial hypertension and herniation.
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q023

**Status:** quarantined. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `d448d59fc85b87016c57bc73641f957accb83bc67dac740bcb882a8b379d8624`

```json
{
  "sys": "mnb",
  "topic": "SCI",
  "q": "A patient with a cervical spinal cord injury has BP 84/50 and HR 48, with warm, dry skin. This presentation is most consistent with:",
  "o": [
    "Hypovolemic shock",
    "Neurogenic shock",
    "Septic shock",
    "Cardiogenic shock"
  ],
  "a": 1,
  "r": "<b>Neurogenic shock</b> from loss of sympathetic tone causes hypotension <b>with bradycardia</b> and warm, dry skin &mdash; unlike hypovolemic/other shock, which produce compensatory <b>tachycardia</b>."
}
```

- **Stem, key and distractors:** B is best. A must still be excluded after trauma; C can have warm skin; D can include bradyarrhythmic low output.
- **Whole rationale:** Loss of sympathetic tone explains the case, but other shock states do not invariably cause tachycardia.
- **Uncertainty/context:** Warm skin and bradycardia are clues, not exclusive diagnostic criteria.
- **Proposed repair:** Remove the universal contrast and explicitly assess hemorrhage and other causes before attributing hypotension to neurogenic shock.
- **Source sections:** [acs_spine_2022](#acs-spine-2022): Initial stabilization, printed page 17; cardiovascular management, printed page 46; [esc_acvc_2025](#esc-acvc-2025): Sections 4.1 and 4.2: hemodynamic profiles and fluid challenge.
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q024

**Status:** source-supported. **Original key:** A (index 0). **Clinical reviewer:** none.

**Content SHA-256:** `f1d44737117fa8bf9f3fec655135675d652d784e892c767b89d95513bc5a0110`

```json
{
  "sys": "mnb",
  "topic": "Stroke",
  "q": "A patient with subarachnoid hemorrhage is at risk for cerebral vasospasm on days 4&ndash;14. Which medication is given to improve outcomes?",
  "o": [
    "Nimodipine",
    "Mannitol",
    "Labetalol",
    "Phenytoin"
  ],
  "a": 0,
  "r": "<b>Nimodipine</b>, a calcium channel blocker, reduces vasospasm-related deficits after aneurysmal SAH and improves neurologic outcomes."
}
```

- **Stem, key and distractors:** A improves outcome in this intended context. B treats selected ICP problems, C controls BP, and D is an antiseizure medication; none substitutes for nimodipine.
- **Whole rationale:** The rationale correctly specifies aneurysmal SAH. Benefit is reduction of DCI and poor outcomes, not proof of preventing angiographic vasospasm.
- **Uncertainty/context:** Do not generalize this recommendation to every traumatic/nonaneurysmal SAH or to IV administration.
- **Proposed repair:** Optional refinement: say aneurysmal in the stem and specify early enteral nimodipine.
- **Source sections:** [aha_sah_2023](#aha-sah-2023): Sections 8.2 and 8.3; printed e338–e339: DCI timing and enteral nimodipine; [eso_sah_2026](#eso-sah-2026): Author abstract and PICO 4 recommendation.
- **Required review:** No blocking discrepancy identified by this source comparison. Licensed clinical review remains outstanding; any content edit requires renewed review and a new hash.

### q025

**Status:** source-supported. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `7e150f7752cf141966ed0085c10a956e2e14b6a09e00825797edccdc8fec2148`

```json
{
  "sys": "multi",
  "topic": "Sepsis",
  "q": "A patient meets septic shock criteria. Which vasopressor is first-line to maintain MAP &ge;65 after adequate fluids?",
  "o": [
    "Dopamine",
    "Norepinephrine",
    "Phenylephrine",
    "Vasopressin"
  ],
  "a": 1,
  "r": "<b>Norepinephrine</b> is the first-line vasopressor in septic shock (better survival, fewer arrhythmias than dopamine). Vasopressin is typically added second; epinephrine third."
}
```

- **Stem, key and distractors:** B is the usual first choice among these options; A has worse safety evidence, while C and D are not routine first-line choices.
- **Whole rationale:** The comparative evidence and typically-qualified escalation sequence are supported.
- **Uncertainty/context:** SSC 2026 permits a 60–65 target in adults aged 65 or older and norepinephrine or epinephrine with cardiac dysfunction.
- **Proposed repair:** Optional refinement: describe an initial MAP target near 65 rather than a rigid floor.
- **Source sections:** [ssc_2026](#ssc-2026): Blood culture; antibiotic initiation; mean arterial pressure; vasopressors; [ssc_2016_evidence](#ssc-2016-evidence): Vasoactive medications: norepinephrine versus dopamine meta-analysis.
- **Required review:** No blocking discrepancy identified by this source comparison. Licensed clinical review remains outstanding; any content edit requires renewed review and a new hash.

### q026

**Status:** source-supported. **Original key:** A (index 0). **Clinical reviewer:** none.

**Content SHA-256:** `459ba5e2ff85e2fde03cbe27870d74590f6cfbecc4bef1bce84dce6150b59c9e`

```json
{
  "sys": "multi",
  "topic": "Sepsis",
  "q": "Which action in the sepsis hour-1 bundle should occur BEFORE administering broad-spectrum antibiotics when feasible?",
  "o": [
    "Obtaining blood cultures",
    "Starting vasopressors",
    "Giving the second liter of fluid",
    "Measuring urine output"
  ],
  "a": 0,
  "r": "Obtain <b>blood cultures before antibiotics</b> to preserve diagnostic yield &mdash; but never significantly delay antibiotics in true septic shock if cultures can't be drawn quickly."
}
```

- **Stem, key and distractors:** A is preferred when feasible. B, C and D are not prerequisites to antibiotic delivery.
- **Whole rationale:** The explanation correctly prevents culture collection from causing important delay in septic shock.
- **Uncertainty/context:** SSC 2026 distinguishes shock/probable-definite sepsis from possible sepsis without shock.
- **Proposed repair:** Optional refinement: use current antibiotic-timing language rather than suggesting every sepsis presentation has the same hour-one rule.
- **Source sections:** [ssc_2026](#ssc-2026): Blood culture; antibiotic initiation; mean arterial pressure; vasopressors.
- **Required review:** No blocking discrepancy identified by this source comparison. Licensed clinical review remains outstanding; any content edit requires renewed review and a new hash.

### q027

**Status:** quarantined. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `db634be02bda1b4acae9391ef17f0652a7838a31b5600770b75befa2de49320c`

```json
{
  "sys": "multi",
  "topic": "Shock",
  "q": "A patient with anaphylactic shock has stridor and hypotension. What is the first-line treatment?",
  "o": [
    "IV diphenhydramine",
    "IM epinephrine",
    "IV methylprednisolone",
    "Nebulized albuterol"
  ],
  "a": 1,
  "r": "<b>IM epinephrine</b> is first-line for anaphylaxis &mdash; it reverses airway edema, bronchospasm, and vasodilation. Antihistamines and steroids are adjuncts, not the priority."
}
```

- **Stem, key and distractors:** B treats the airway/circulatory emergency. A, C and D must not delay epinephrine and cannot replace it.
- **Whole rationale:** Steroids are not recommended routinely; antihistamines address residual skin symptoms after stabilization, not ABC compromise.
- **Uncertainty/context:** The existing explanation can reinforce outdated routine steroid use despite a correct key.
- **Proposed repair:** Keep IM epinephrine first; remove routine adjunct language and identify the limited steroid exceptions if discussed.
- **Source sections:** [rcuk_anaphylaxis_2021](#rcuk-anaphylaxis-2021): Adrenaline first line; antihistamines; section 5.5 corticosteroids.
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q028

**Status:** quarantined. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `af37c8051dd7459e7f98d7772acbc0771470d0065c0eb72a2692407732265188`

```json
{
  "sys": "multi",
  "topic": "Acid-base",
  "q": "An ABG shows pH 7.30, PaCO2 60, HCO3 26. What is the primary disorder?",
  "o": [
    "Metabolic acidosis",
    "Respiratory acidosis",
    "Respiratory alkalosis",
    "Metabolic alkalosis"
  ],
  "a": 1,
  "r": "Low pH with <b>high PaCO2</b> and a near-normal HCO3 = <b>respiratory acidosis</b> (pH and CO2 move opposite directions &rarr; respiratory problem). The kidneys haven't compensated yet."
}
```

- **Stem, key and distractors:** B follows low pH/high PaCO2; A, C and D do not match the intended primary pattern.
- **Whole rationale:** Calculated pH from PaCO2 60/HCO3 26 is about 7.26, not 7.30. The unsupported statement about absent renal compensation also overstates what one sample shows.
- **Uncertainty/context:** The bicarbonate source and sampling times are unspecified. This numerical check is an audit calculation, not patient data.
- **Proposed repair:** Use a consistent triplet and describe expected acute versus chronic compensation without inventing timing.
- **Source sections:** [ats_abg](#ats-abg): Steps 1–4: internal consistency, primary disorder and expected compensation.
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q029

**Status:** quarantined. **Original key:** A (index 0). **Clinical reviewer:** none.

**Content SHA-256:** `9cb9295e01eb5bc3b7959441589abb79eaa45babba354226add2731e30645e23`

```json
{
  "sys": "multi",
  "topic": "Acid-base",
  "q": "A septic patient has pH 7.28, PaCO2 30, HCO3 15, with an elevated anion gap. The most likely cause of the acidosis is:",
  "o": [
    "Lactic acidosis from hypoperfusion",
    "Respiratory failure",
    "Vomiting",
    "Excess bicarbonate administration"
  ],
  "a": 0,
  "r": "High-anion-gap metabolic acidosis in sepsis is usually <b>lactic acidosis</b> from tissue hypoperfusion. The low PaCO2 reflects respiratory compensation (Kussmaul breathing)."
}
```

- **Stem, key and distractors:** A is the intended cause; B does not explain this metabolic pattern, while C and D favor alkalosis. Lactate is not actually supplied.
- **Whole rationale:** PaCO2 30/HCO3 15 gives pH about 7.32. Compensation does not establish observed Kussmaul breathing or prove tissue hypoperfusion.
- **Uncertainty/context:** Septic lactate elevation can have non-hypoperfusion mechanisms; the causal claim needs evidence beyond sepsis alone.
- **Proposed repair:** Use consistent numbers, supply lactate/perfusion findings, and avoid assigning a single lactate mechanism.
- **Source sections:** [ats_abg](#ats-abg): Steps 1–4: internal consistency, primary disorder and expected compensation; [esicm_sepsis_education_2026](#esicm-sepsis-education-2026): Blood lactate interpretation and causes of elevation in sepsis.
- **Required review:** Correct the documented item defects, then obtain a licensed adult critical-care reviewer’s full-item approval and a new content hash before release.

### q030

**Status:** source-supported. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `0db7347aaa0bf05f9e2472931c352fe436e6630f85fc7f40782f6f2fff626681`

```json
{
  "sys": "multi",
  "topic": "Electrolytes",
  "q": "A patient's potassium remains low despite repeated replacement. What electrolyte should the nurse check that may be preventing correction?",
  "o": [
    "Calcium",
    "Magnesium",
    "Phosphate",
    "Sodium"
  ],
  "a": 1,
  "r": "<b>Hypomagnesemia</b> causes refractory hypokalemia &mdash; you often can't correct potassium until magnesium is replaced. They travel together."
}
```

- **Stem, key and distractors:** B identifies the recognized contributor to refractory hypokalemia. A, C and D are not the described impediment to potassium correction.
- **Whole rationale:** Coexisting magnesium deficiency can prevent successful potassium repletion; often avoids claiming it occurs in every case.
- **Uncertainty/context:** This supports checking/correcting deficiency, not automatic magnesium dosing in every patient.
- **Proposed repair:** Optional refinement: mention renal function and other continuing potassium losses when planning replacement.
- **Source sections:** [whang_mg_1992](#whang-mg-1992): Abstract: magnesium deficiency and refractory potassium repletion; [umaryland_mg_2026](#umaryland-mg-2026): Pediatric Electrolytes pearl: refractory potassium and magnesium; stated adult applicability.
- **Required review:** No blocking discrepancy identified by this source comparison. Licensed clinical review remains outstanding; any content edit requires renewed review and a new hash.

### q031

**Status:** source-supported. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `bed1431dbd2cf7771b62c868ad56cc3ef459b1ab9c29da54a4f1a7897dcf9004`

```json
{
  "sys": "pc",
  "topic": "Advocacy",
  "q": "A nurse receives an order that appears unsafe for the patient's current condition. The action that best reflects advocacy/moral agency is to:",
  "o": [
    "Carry out the order as written to avoid conflict",
    "Clarify the order with the provider and escalate the concern if unresolved",
    "Refuse and document without further communication",
    "Ask another nurse to give the medication"
  ],
  "a": 1,
  "r": "Advocacy means keeping the <b>patient's safety and voice</b> central: clarify the concern with the provider and escalate up the chain if unresolved. Silently complying or refusing without communication both fail the patient."
}
```

- **Stem, key and distractors:** B is the appropriate action. A ignores the concern; C ends communication; D transfers the unresolved problem.
- **Whole rationale:** Patient-centered advocacy and continued escalation are supported by the model and professional guidance.
- **Uncertainty/context:** An immediately dangerous order also requires timely protective action; this is not a legal scope-of-practice ruling.
- **Proposed repair:** No substantive repair identified; institutional escalation procedures can be added.
- **Source sections:** [aacn_synergy](#aacn-synergy): PDF pages 4, 7 and 8: Advocacy/Moral Agency, Response to Diversity, Clinical Inquiry; [wsna_chain_2023](#wsna-chain-2023): Escalating unresolved patient-care concerns.
- **Required review:** No blocking discrepancy identified by this source comparison. Licensed clinical review remains outstanding; any content edit requires renewed review and a new hash.

### q032

**Status:** source-supported. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `80a19f69c724680347dc5ea79f29099e6a7bf367d42ea92da51f6a7855003711`

```json
{
  "sys": "pc",
  "topic": "Response to diversity",
  "q": "A patient's cultural beliefs conflict with a standard care recommendation. The response that best reflects the Synergy Model competency of Response to Diversity is to:",
  "o": [
    "Explain that hospital policy must be followed",
    "Incorporate the patient's beliefs and preferences into an individualized plan",
    "Ask the family to overrule the patient",
    "Document refusal and move on"
  ],
  "a": 1,
  "r": "Response to Diversity means <b>integrating</b> the patient's cultural and individual differences into the plan of care, not overriding them. Individualized, patient-centered planning is the credited answer."
}
```

- **Stem, key and distractors:** B incorporates patient differences. A, C and D dismiss the individual’s participation rather than build a suitable plan.
- **Whole rationale:** Individualized integration of beliefs/preferences is supported.
- **Uncertainty/context:** Individualization does not itself authorize unsafe care or remove informed-consent requirements.
- **Proposed repair:** No substantive repair identified; a future example could show shared planning and informed refusal.
- **Source sections:** [aacn_synergy](#aacn-synergy): PDF pages 4, 7 and 8: Advocacy/Moral Agency, Response to Diversity, Clinical Inquiry.
- **Required review:** No blocking discrepancy identified by this source comparison. Licensed clinical review remains outstanding; any content edit requires renewed review and a new hash.

### q033

**Status:** source-supported. **Original key:** B (index 1). **Clinical reviewer:** none.

**Content SHA-256:** `983a8ef388f98b2dd322a7d2eaa36097c7476241a0ed4b88d08ab45a936bd2a2`

```json
{
  "sys": "pc",
  "topic": "Clinical inquiry",
  "q": "A nurse notices a unit practice that conflicts with current evidence. Demonstrating Clinical Inquiry, the nurse should:",
  "o": [
    "Continue the current practice since it's the unit norm",
    "Question the practice and pursue evidence-based change",
    "Wait for management to notice",
    "Only change their own individual practice quietly"
  ],
  "a": 1,
  "r": "Clinical Inquiry is the competency of questioning practice and using <b>evidence/EBP</b> to improve care &mdash; raising the concern and pursuing evidence-based change reflects it."
}
```

- **Stem, key and distractors:** B pursues inquiry and improvement. A and C leave the evidence conflict unaddressed; D avoids a coordinated practice-change process.
- **Whole rationale:** Questioning practice and applying evidence to improve care is supported.
- **Uncertainty/context:** Implementation still follows appropriate professional and organizational processes.
- **Proposed repair:** No substantive repair identified.
- **Source sections:** [aacn_synergy](#aacn-synergy): PDF pages 4, 7 and 8: Advocacy/Moral Agency, Response to Diversity, Clinical Inquiry.
- **Required review:** No blocking discrepancy identified by this source comparison. Licensed clinical review remains outstanding; any content edit requires renewed review and a new hash.

## Re-review and release record

This audit does not overwrite any original question or authorize deployment. Quarantined items need correction and licensed full-item approval before release; a new hash must bind the reviewed wording. Source-supported items still lack licensed sign-off. Future reviewers should record name/credentials, review date, explicit disposition of stem/options/key/rationale, sources/editions consulted, and content hash. No clinician identity or approval has been invented.
