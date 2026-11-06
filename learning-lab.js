/* CCRN Study Hub learning tools. Educational only; no clinical decision support.
   Source-check provenance is documented in docs/clinical-simulation-audit.md. */
(() => {
  'use strict';
  const KEY = 'ccrn_review_v2', LOG = 'ccrn_attempts', VERSION = '2026-11-06';
  const DAY = 86400000, MAX_FILE_BYTES = 2000000, MAX_INTERVAL = 36500;
  const forbiddenKeys = new Set(['__proto__', 'prototype', 'constructor']);
  const notices = new Map();
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const validTopic = value => typeof value === 'string' && value.trim().length > 0 && value.length <= 300 && !forbiddenKeys.has(value);
  const timestamp = value => Number.isSafeInteger(value) && value >= 0 && value <= 8640000000000000;
  let review = Object.create(null), reviewBlocked = false, caseId = 0, stage = 0, answered = false, importBusy = false;

  function notice(key, message) {
    if (message) notices.set(key, message); else notices.delete(key);
    const host = document.getElementById('ccrnStorageStatus');
    if (host) host.textContent = [...notices.values()].join(' ');
  }
  function stored(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? { missing: true } : { value: JSON.parse(raw) };
    } catch { return { error: true }; }
  }
  function validateReview(value) {
    if (!record(value) || Object.keys(value).length > 1000) throw new Error('Invalid review schedule');
    const result = Object.create(null);
    for (const [topic, entry] of Object.entries(value)) {
      if (!validTopic(topic) || !record(entry) ||
          Object.keys(entry).some(key => !['interval', 'ease', 'due', 'last'].includes(key)) ||
          !Number.isInteger(entry.interval) || entry.interval < 1 || entry.interval > MAX_INTERVAL ||
          !Number.isFinite(entry.ease) || entry.ease < 1 || entry.ease > 5 ||
          !timestamp(entry.due) || (own(entry, 'last') && !timestamp(entry.last))) {
        throw new Error('Invalid review entry');
      }
      result[topic] = { interval: entry.interval, ease: entry.ease, due: entry.due };
      if (own(entry, 'last')) result[topic].last = entry.last;
    }
    return result;
  }
  function validAttempt(value) {
    if (!record(value) || typeof value.correct !== 'boolean' ||
        Object.keys(value).some(key => !['stem', 'topic', 'sys', 'correct', 'at', 'mode', 'questionId', 'contentVersion'].includes(key))) return false;
    if (own(value, 'topic') && !validTopic(value.topic)) return false;
    if (own(value, 'questionId') && (typeof value.questionId !== 'string' || !/^q\d{3}$/.test(value.questionId))) return false;
    if (own(value, 'contentVersion') && (typeof value.contentVersion !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value.contentVersion))) return false;
    for (const key of ['stem', 'sys', 'at', 'mode']) {
      if (own(value, key) && (typeof value[key] !== 'string' || value[key].length > (key === 'stem' ? 10000 : 200))) return false;
    }
    return true;
  }
  function attempts() {
    const saved = stored(LOG);
    if (saved.missing) { notice('attempts', ''); return []; }
    if (saved.error || !Array.isArray(saved.value)) {
      notice('attempts', 'Saved answer history could not be loaded and was ignored here. Original stored data was kept.');
      return [];
    }
    const valid = saved.value.filter(validAttempt);
    notice('attempts', valid.length === saved.value.length ? '' : 'Malformed answer history entries were ignored here. Original stored data was kept.');
    return valid;
  }
  function saveReview(next) {
    try { localStorage.setItem(KEY, JSON.stringify(next)); }
    catch {
      notice('write', 'Could not save the review schedule. The change was not applied; the previous schedule is unchanged.');
      return false;
    }
    review = next;
    reviewBlocked = false;
    notice('review', '');
    notice('write', '');
    return true;
  }
  const savedReview = stored(KEY);
  try {
    if (savedReview.error) throw new Error('Unreadable review data');
    review = validateReview(savedReview.missing ? {} : savedReview.value);
  } catch {
    reviewBlocked = true;
    notice('review', 'Saved review data could not be loaded. Original stored data was kept. Import a valid backup or reset the schedule to continue.');
  }

  const references = {
  "S1": {
    "title": "ESICM shock guidance (2025)",
    "url": "https://www.esicm.org/wp-content/uploads/2025/10/Visual-abstract-final.pdf",
    "locator": "Visual abstract p.1: SHOCK definition and perfusion assessment"
  },
  "S2": {
    "title": "RCUK ABCDE approach (updated 2024)",
    "url": "https://www.resus.org.uk/library/abcde-approach",
    "locator": "Underlying principles 1–8; Breathing; Circulation 1–9"
  },
  "S3": {
    "title": "ESC myocarditis and pericarditis guideline (2025)",
    "url": "https://academic.oup.com/eurheartj/article/46/40/3952/8234483",
    "locator": "Sections 11.8–11.8.3: tamponade mechanism, presentation, diagnosis and urgency"
  },
  "S4": {
    "title": "AARC patient-ventilator assessment (2024)",
    "url": "https://www.aarc.org/wp-content/uploads/2024/10/patient-ventilator-assessment-aarc-cpg.pdf",
    "locator": "Printed pp.1042–1043: recommendation 15 and definition of assessment"
  },
  "S5": {
    "title": "ERC special circumstances guideline (2025)",
    "url": "https://www.erc.edu/media/wwufbysp/gl2025-06-spec-circ-e.pdf",
    "locator": "p.32: Tension pneumothorax (trauma context); recognition principles only"
  },
  "S6": {
    "title": "Association of Anaesthetists: increased airway pressure",
    "url": "https://anaesthetists.org/Portals/0/PDFs/QRH/QRH_2-3_Increased_airway_pressure_v1.pdf?ver=2018-07-25-112713-237",
    "locator": "Current QRH page 2-3, v1 (2018): assessment steps 1–4; Box D"
  }
};
  const cases = [
  {
    "id": "shock",
    "title": "Shock physiology",
    "stages": [
      {
        "id": "shock-1",
        "prompt": "A fictional adult postoperative patient has MAP 54 mmHg, HR 122 beats/min, cool extremities and falling urine output. What is the priority?",
        "options": [
          "Assess perfusion and urgently escalate deterioration",
          "Wait until the next routine vital signs",
          "Document and continue without reassessment"
        ],
        "correct": 0,
        "explain": "Hypotension with cool skin and falling urine output suggests impaired perfusion. Assess and support airway, breathing and circulation, call for urgent help and reassess while the team investigates the cause. Waiting for routine observations or documenting without reassessment delays the response.",
        "sources": [
          "S1",
          "S2"
        ],
        "sourceCheck": {
          "checkedAt": "2026-11-06",
          "fingerprint": "f0b26139",
          "licensedReviewer": null
        }
      },
      {
        "id": "shock-2",
        "prompt": "The same patient remains hypotensive and now has distended neck veins and muffled heart sounds. Which mechanism warrants urgent consideration?",
        "options": [
          "Obstructive physiology such as cardiac tamponade",
          "Isolated mild dehydration",
          "Uncomplicated postoperative pain"
        ],
        "correct": 0,
        "explain": "Tamponade can reduce cardiac filling and output. This pattern warrants urgent consideration, but does not establish the diagnosis; the classic triad can be absent. Urgent team assessment and echocardiography help confirm the cause, without delaying emergency management in an unstable patient. Mild dehydration or uncomplicated pain does not explain the whole pattern.",
        "sources": [
          "S3"
        ],
        "sourceCheck": {
          "checkedAt": "2026-11-06",
          "fingerprint": "ef45386d",
          "licensedReviewer": null
        }
      }
    ]
  },
  {
    "id": "resp",
    "title": "Respiratory deterioration",
    "stages": [
      {
        "id": "resp-1",
        "prompt": "A fictional adult ventilated patient develops sudden oxygen desaturation and a high airway-pressure alarm. Which immediate assessment approach is appropriate?",
        "options": [
          "Assess the patient, airway, tube and circuit while calling for help",
          "Wait for routine chest imaging",
          "Ignore the change if pulse is present"
        ],
        "correct": 0,
        "explain": "Rapidly assess the patient and oxygenation, then the airway, tube position and patency, and breathing system while the team provides support. Call for help early and reassess. A pulse does not exclude respiratory failure; waiting for routine imaging or ignoring the change delays the response.",
        "sources": [
          "S2",
          "S4",
          "S6"
        ],
        "sourceCheck": {
          "checkedAt": "2026-11-06",
          "fingerprint": "78188dfa",
          "licensedReviewer": null
        }
      },
      {
        "id": "resp-2",
        "prompt": "The patient now has absent breath sounds on one side and hypotension. Which emergency should be considered?",
        "options": [
          "Tension pneumothorax",
          "Stable chronic anemia",
          "Mild seasonal allergies"
        ],
        "correct": 0,
        "explain": "This pattern raises urgent concern for tension pneumothorax, but the findings alone do not confirm it; tube position or obstruction must also be considered. Escalate immediately for bedside assessment and emergency management. An unstable patient with suspected tension physiology must not wait for routine imaging. Stable anemia and mild seasonal allergies do not explain the acute unilateral findings.",
        "sources": [
          "S5",
          "S6"
        ],
        "sourceCheck": {
          "checkedAt": "2026-11-06",
          "fingerprint": "3a4dacef",
          "licensedReviewer": null
        }
      }
    ]
  }
];

  // These fingerprints were recorded after the documented source check.
  // Recompute only after reviewing every changed statement against its cited source.
  function fingerprint(question) {
    let hash = 2166136261;
    const content = [question.id, question.prompt, question.options, question.correct, question.explain, question.sources.map(id => references[id])];
    for (const char of JSON.stringify(content)) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
    return (hash >>> 0).toString(16).padStart(8, '0');
  }
  function sourceChecked(question) {
    return question.sourceCheck?.checkedAt === VERSION &&
      question.sourceCheck.fingerprint === fingerprint(question);
  }
  function sourceLinks(question) {
    return '<ul class="ccrn-sources">' + question.sources.map(id => {
      const ref = references[id];
      return '<li><a href="' + esc(ref.url) + '" target="_blank" rel="noopener noreferrer">' + esc(ref.title) + '</a> — ' + esc(ref.locator) + '</li>';
    }).join('') + '</ul>';
  }
  function focus(selector) { document.querySelector(selector)?.focus(); }
  function due() {
    return Object.entries(review).filter(([, value]) => value.due <= Date.now()).sort((a, b) => a[1].due - b[1].due);
  }
  function seedMissedTopics() {
    const missed = [...new Set(attempts().filter(item => !item.correct && validTopic(item.topic)).map(item => item.topic))];
    if (reviewBlocked) return;
    const next = Object.assign(Object.create(null), review);
    let changed = false;
    for (const topic of missed) {
      if (!own(next, topic) && Object.keys(next).length < 1000) {
        next[topic] = { interval: 1, ease: 2.3, due: Date.now() };
        changed = true;
      }
    }
    if (changed) saveReview(next);
  }
  function grade(topic) {
    if (reviewBlocked || !own(review, topic)) return;
    const value = review[topic], now = Date.now();
    const interval = Math.min(MAX_INTERVAL, Math.max(1, Math.round(value.interval * value.ease)));
    const next = Object.assign(Object.create(null), review);
    next[topic] = { interval, ease: value.ease, due: now + interval * DAY, last: now };
    if (saveReview(next)) show('reviews', '#ccrnReviewHeading');
  }
  function backupStatus(message) {
    const host = document.getElementById('ccrnBackupStatus');
    if (host) host.textContent = message;
  }
  function validateBackup(value) {
    if (!record(value) || value.version !== 2 || !own(value, 'review') ||
        Object.keys(value).some(key => !['version', 'exportedAt', 'review', 'attempts'].includes(key)) ||
        (own(value, 'exportedAt') && (typeof value.exportedAt !== 'string' || value.exportedAt.length > 40 || !Number.isFinite(Date.parse(value.exportedAt)))) ||
        (own(value, 'attempts') && (!Array.isArray(value.attempts) || !value.attempts.every(validAttempt)))) {
      throw new Error('Invalid backup');
    }
    return validateReview(value.review);
  }
  async function importData(input) {
    const file = input.files?.[0];
    if (!file || importBusy) return;
    if (file.size > MAX_FILE_BYTES) {
      backupStatus('The file is too large. Choose a JSON backup of 2 MB or less. Your saved schedule is unchanged.');
      input.value = '';
      return;
    }
    importBusy = true;
    input.disabled = true;
    backupStatus('Reading backup…');
    try {
      let text;
      try { text = await file.text(); }
      catch { backupStatus('Could not read this file. Try selecting it again. Your saved schedule is unchanged.'); return; }
      let next;
      try { next = validateBackup(JSON.parse(text)); }
      catch { backupStatus('Invalid backup. Choose a version 2 learning backup with valid review entries. Your saved schedule is unchanged.'); return; }
      if (!confirm('Replace only your review schedule with this backup? Your answer history will stay unchanged.')) {
        backupStatus('Import cancelled. Your saved schedule is unchanged.');
        return;
      }
      if (saveReview(next)) backupStatus('Review schedule imported. Answer history was not changed.');
      else backupStatus('Import was not saved. Your previous review schedule is unchanged.');
    } finally {
      input.disabled = false;
      input.value = '';
      importBusy = false;
    }
  }
  function show(pane, focusTarget) {
    const host = document.getElementById('ccrnExtContent');
    if (!host) return;
    document.querySelectorAll('#ccrnExtension [data-pane]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.pane === pane)));
    let html = '';
    if (pane === 'reviews') {
      seedMissedTopics();
      const list = due();
      html = '<h3 id="ccrnReviewHeading" tabindex="-1">Spaced review queue</h3><p>' + list.length + ' topics due · based on your missed-question topics</p>' +
        (list.length ? list.map(([topic]) => '<div class="ccrn-box"><b>' + esc(topic) + '</b><p>Mark reviewed to schedule the next review.</p><button data-grade="' + esc(topic) + '">Reviewed today</button></div>').join('') : '<p>No topics due. Complete topic quizzes to populate the queue.</p>') +
        '<button data-reset="1">Reset review schedule</button>';
    }
    if (pane === 'sim') {
      answered = false;
      const current = cases[caseId], question = current.stages[stage], checked = sourceChecked(question);
      html = '<h3>Fictional clinical cases</h3><p>Unscored reasoning practice. ' + (checked ? 'Source-checked ' + VERSION + '.' : 'This stage needs a renewed source check.') + ' No licensed clinical review or exam-readiness validation.</p><div class="ccrn-cases" role="group" aria-label="Choose a fictional case">' +
        cases.map((item, index) => '<button data-case="' + index + '" aria-pressed="' + (index === caseId) + '">' + esc(item.title) + '</button>').join('') + '</div>' +
        '<div class="ccrn-box" data-case-stage="' + esc(question.id) + '" data-source-status="' + (checked ? 'source-checked' : 'quarantined') + '"><b>' + esc(current.title) + ' · Step ' + (stage + 1) + ' of ' + current.stages.length + '</b>' +
        (checked ? '<p id="ccrnCasePrompt" tabindex="-1">' + esc(question.prompt) + '</p><div class="ccrn-options">' +
          question.options.map((option, index) => '<button data-answer="' + index + '">' + esc(option) + '</button>').join('') + '</div><div id="ccrnCaseFeedback" role="region" aria-label="Case feedback" tabindex="-1" aria-live="polite"></div>'
        : '<p id="ccrnCasePrompt" tabindex="-1">This stage is unavailable: its source check needs renewal after a content change.</p>') + '</div>';
    }
    if (pane === 'insights') {
      const history = attempts(), groups = Object.create(null);
      history.forEach(item => {
        const key = item.sys || 'Other', group = groups[key] || (groups[key] = { n: 0, c: 0 });
        group.n++;
        if (item.correct) group.c++;
      });
      html = '<h3>Attempt analytics</h3><p>' + history.length + ' recorded answers. Repeated questions count as additional attempts.</p><table><thead><tr><th scope="col">System</th><th scope="col">Correct</th><th scope="col">Accuracy</th></tr></thead><tbody>' +
        Object.entries(groups).map(([key, value]) => '<tr><th scope="row">' + esc(key) + '</th><td>' + value.c + '/' + value.n + '</td><td>' + Math.round(100 * value.c / value.n) + '%</td></tr>').join('') +
        '</tbody></table><p>No score here predicts CCRN exam success.</p>';
    }
    if (pane === 'sources') {
      const checkedCount = cases.flatMap(item => item.stages).filter(sourceChecked).length;
      html = '<h3>Content review standards</h3><p>Clinical source checks do not replace licensed clinical review. ' + checkedCount + ' of 4 fictional case stages match their source comparison dated ' + VERSION + '. All remain unscored. No licensed reviewer has signed them off.</p><p>The exact case text and source details are linked to the dated check; changed stages are withheld until checked again.</p>' +
        '<p><a href="docs/clinical-simulation-audit.md" target="_blank" rel="noopener">Read the complete simulation audit</a></p>' +
        cases.flatMap(item => item.stages.map(question => '<div class="ccrn-box"><b>' + esc(item.title) + ' · ' + esc(question.id) + '</b><p>' + (sourceChecked(question) ? 'Source-checked; no licensed clinical review.' : 'Source check needs renewal; stage unavailable.') + '</p>' + sourceLinks(question) + '</div>')).join('');
    }
    if (pane === 'backup') {
      html = '<h3>Portable learning backup</h3><p>Export your review schedule and answer history. Import replaces only the review schedule. Maximum file size: 2 MB.</p><button data-export="1">Export learning backup JSON</button><label class="ccrn-import">Import backup <input id="ccrnImport" type="file" accept=".json,application/json"></label><p id="ccrnBackupStatus" role="status" aria-live="polite"></p>';
    }
    host.innerHTML = html;
    if (focusTarget) focus(focusTarget);
  }
  function answerCase(index) {
    const current = cases[caseId], question = current.stages[stage], feedback = document.getElementById('ccrnCaseFeedback');
    if (!feedback || answered || !sourceChecked(question) || !Number.isInteger(index) || index < 0 || index >= question.options.length) return;
    answered = true;
    feedback.innerHTML = '<p><b>' + (index === question.correct ? 'Correct' : 'Review the reasoning') + '</b></p><p>' + esc(question.explain) + '</p>' +
      (stage + 1 < current.stages.length ? '<button data-next="1">Next stage</button>' : '<p>Case complete. Choose another case to continue.</p><button data-choose="1">Choose another case</button>') +
      '<p class="ccrn-source-note">Source-checked ' + esc(question.sourceCheck.checkedAt) + ' · No licensed clinical review</p>' + sourceLinks(question);
    document.querySelectorAll('#ccrnExtension [data-answer]').forEach(button => {
      button.disabled = true;
      button.setAttribute('aria-pressed', String(Number(button.dataset.answer) === index));
    });
    feedback.focus();
  }
  function exportData() {
    if (reviewBlocked) {
      backupStatus('Review data could not be loaded. Original data was kept; import a valid backup or reset before exporting.');
      return;
    }
    const data = JSON.stringify({ version: 2, exportedAt: new Date().toISOString(), review, attempts: attempts() }, null, 2);
    const url = URL.createObjectURL(new Blob([data], { type: 'application/json' })), link = document.createElement('a');
    link.href = url;
    link.download = 'ccrn-learning-backup.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    backupStatus(notices.has('attempts') ? 'Backup exported. The malformed history entries noted above were omitted.' : 'Learning backup exported.');
  }
  function build() {
    if (document.getElementById('ccrnExtension')) return;
    const root = document.createElement('section');
    root.id = 'ccrnExtension';
    root.className = 'card';
    root.setAttribute('aria-labelledby', 'ccrnLabHeading');
    root.innerHTML = '<h2 id="ccrnLabHeading">Learning laboratory <small>v' + VERSION + '</small></h2><p>Educational tools. Not clinical guidance or validated exam readiness.</p><p id="ccrnStorageStatus" role="status" aria-live="polite"></p><div class="ccrn-ext-tabs" role="group" aria-label="Learning tools"><button data-pane="reviews">Review queue</button><button data-pane="sim">Case simulations</button><button data-pane="insights">Analytics</button><button data-pane="sources">References & quality</button><button data-pane="backup">Backup</button></div><div id="ccrnExtContent"></div>';
    const style = document.createElement('style');
    style.textContent = '#ccrnExtension{margin:20px 0;padding:20px;max-width:1120px;min-width:0}#ccrnExtension h2{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 8px}#ccrnExtension h2 small{font-size:12px;line-height:1.3;white-space:nowrap}#ccrnExtension button{min-height:44px;margin:0;padding:9px 13px;border:1px solid #729b8d;border-radius:12px;background:#e5f3ef;color:#163b37;font:inherit;cursor:pointer;max-width:100%;overflow-wrap:anywhere}#ccrnExtension :focus-visible{outline:3px solid #bd704a;outline-offset:2px}#ccrnExtension button[aria-pressed=true]{background:#163b37;color:white}#ccrnExtension button:disabled{cursor:default}#ccrnExtension .ccrn-ext-tabs,#ccrnExtension .ccrn-cases{display:flex;flex-wrap:wrap;gap:6px;align-items:stretch}#ccrnExtension .ccrn-box{border:1px solid #cbdcd5;padding:14px;border-radius:12px;margin:12px 0;overflow-wrap:anywhere}#ccrnExtension .ccrn-options{display:grid;gap:6px}#ccrnExtension .ccrn-options button{text-align:left}#ccrnExtension table{width:100%;border-collapse:collapse;table-layout:fixed}#ccrnExtension th,#ccrnExtension td{text-align:left;padding:8px;border-bottom:1px solid #ddd;overflow-wrap:anywhere}#ccrnExtension input{min-height:44px;max-width:100%;font:inherit}#ccrnExtension .ccrn-import{display:grid;gap:6px;margin-top:12px}#ccrnExtension .ccrn-sources{padding-left:20px;overflow-wrap:anywhere}#ccrnExtension .ccrn-sources li{margin:6px 0}#ccrnExtension .ccrn-source-note{font-size:13px}#ccrnStorageStatus:empty,#ccrnBackupStatus:empty{display:none}#ccrnStorageStatus:not(:empty){padding:10px;border:1px solid #bd704a;border-radius:8px}#ccrnCaseFeedback:focus{outline:2px solid #bd704a;outline-offset:4px}@media(max-width:480px){#ccrnExtension{padding:14px}#ccrnExtension .ccrn-ext-tabs button{flex:1 1 130px}#ccrnExtension .ccrn-cases button{flex:1 1 150px}}';
    document.head.appendChild(style);
    (document.getElementById('view-progress') || document.querySelector('.wrap') || document.body).appendChild(root);
    notice('initial', '');
    root.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button || !root.contains(button)) return;
      if (button.dataset.pane) show(button.dataset.pane);
      else if (button.dataset.grade) grade(button.dataset.grade);
      else if (button.dataset.case !== undefined) {
        const index = Number(button.dataset.case);
        if (Number.isInteger(index) && cases[index]) { caseId = index; stage = 0; show('sim', '#ccrnCasePrompt'); }
      } else if (button.dataset.answer !== undefined) answerCase(Number(button.dataset.answer));
      else if (button.dataset.next && answered && stage + 1 < cases[caseId].stages.length) { stage++; show('sim', '#ccrnCasePrompt'); }
      else if (button.dataset.choose) focus('#ccrnExtension [data-case]');
      else if (button.dataset.export) exportData();
      else if (button.dataset.reset && confirm('Reset review timing? Missed topics will become due again. Answer history stays unchanged.')) {
        if (saveReview(Object.create(null))) show('reviews', '#ccrnReviewHeading');
      }
    });
    root.addEventListener('change', event => { if (event.target.id === 'ccrnImport') void importData(event.target); });
    show('reviews');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
