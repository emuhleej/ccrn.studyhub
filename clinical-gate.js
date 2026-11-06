(function (root) {
  'use strict';
  // A content edit invalidates its evidence. This protects against stale review
  // metadata, not against a malicious editor controlling the whole application.
  async function eligibleQuestions(bank, review, subtle) {
    if (!Array.isArray(bank) || !Array.isArray(review?.questions) || !review.references || !subtle) return [];
    const accepted = [];
    for (let index = 0; index < bank.length; index++) {
      const matches = review.questions.filter(item => item.index === index);
      if (matches.length !== 1) continue;
      const item = matches[0];
      if (item.id !== 'q' + String(index + 1).padStart(3, '0') || item.status !== 'source-supported' ||
          !Array.isArray(item.references) || !item.references.length ||
          item.references.some(id => !Object.hasOwn(review.references, id) || !/^https:\/\//.test(review.references[id]?.url))) continue;
      try {
        const bytes = new TextEncoder().encode(JSON.stringify(bank[index]));
        const hash = Array.from(new Uint8Array(await subtle.digest('SHA-256', bytes)), byte => byte.toString(16).padStart(2, '0')).join('');
        if (hash === item.contentSha256) accepted.push(bank[index]);
      } catch { /* Missing crypto or invalid evidence keeps the item withheld. */ }
    }
    return accepted;
  }
  const api = { eligibleQuestions };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CCRN_CLINICAL_GATE = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
