(function (root) {
  'use strict';
  const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const safeKey = key => typeof key === 'string' && key.length > 0 && key.length <= 300 && !(key in Object.prototype);
  const systems = new Set(['cv', 'resp', 'ehgri', 'mnb', 'multi', 'pc']);
  function normalizeProgress(value, topics) {
    const result = {};
    if (!record(value)) return result;
    for (const topic of topics) {
      if (!safeKey(topic) || !Object.hasOwn(value, topic) || !record(value[topic])) continue;
      const item = value[topic], chk = {};
      if (record(item.chk)) for (let i = 0; i < 5; i++) if (typeof item.chk[i] === 'boolean') chk[i] = item.chk[i];
      result[topic] = { notes: typeof item.notes === 'string' ? item.notes.slice(0, 100000) : '', chk };
    }
    return result;
  }
  function normalizeWeak(value) {
    const result = {};
    if (!record(value)) return result;
    for (const [key, count] of Object.entries(value)) if (safeKey(key) && Number.isSafeInteger(count) && count >= 0) result[key] = count;
    return result;
  }
  function normalizeAttempts(value) {
    if (!Array.isArray(value)) return [];
    return value.filter(item => record(item) && typeof item.stem === 'string' && item.stem.length <= 10000 &&
      safeKey(item.topic) && systems.has(item.sys) && typeof item.correct === 'boolean' &&
      typeof item.at === 'string' && Number.isFinite(Date.parse(item.at)) && ['quiz', 'exam1', 'exam2'].includes(item.mode))
      .slice(-5000).map(item => {
        const result = { stem: item.stem, topic: item.topic, sys: item.sys, correct: item.correct, at: item.at, mode: item.mode };
        if (/^q\d{3}$/.test(item.questionId)) result.questionId = item.questionId;
        if (/^\d{4}-\d{2}-\d{2}$/.test(item.contentVersion)) result.contentVersion = item.contentVersion;
        return result;
      });
  }
  function validCloudState(value) {
    return record(value) && ['progress', 'weak', 'attempts'].some(key => Object.hasOwn(value, key)) &&
      (!Object.hasOwn(value, 'progress') || (record(value.progress) && Object.entries(value.progress).every(([topic, item]) =>
        safeKey(topic) && record(item) &&
        (!Object.hasOwn(item, 'notes') || (typeof item.notes === 'string' && item.notes.length <= 100000)) &&
        (!Object.hasOwn(item, 'chk') || (record(item.chk) && Object.entries(item.chk).every(([key, checked]) => /^[0-4]$/.test(key) && typeof checked === 'boolean')))))) &&
      (!Object.hasOwn(value, 'weak') || (record(value.weak) && Object.entries(value.weak).every(([topic, count]) => safeKey(topic) && Number.isSafeInteger(count) && count >= 0))) &&
      (!Object.hasOwn(value, 'attempts') || (Array.isArray(value.attempts) && normalizeAttempts(value.attempts).length === value.attempts.length && value.attempts.every(item =>
        (!Object.hasOwn(item, 'questionId') || /^q\d{3}$/.test(item.questionId)) &&
        (!Object.hasOwn(item, 'contentVersion') || /^\d{4}-\d{2}-\d{2}$/.test(item.contentVersion)))));
  }
  function mergeConnectingState(remote, before, local, topics) {
    if (!validCloudState(remote)) throw new Error('Invalid cloud state');
    const currentProgress = normalizeProgress(local.progress, topics);
    const priorProgress = normalizeProgress(before.progress, topics);
    const mergedProgress = normalizeProgress(Object.hasOwn(remote, 'progress') ? remote.progress : local.progress, topics);
    for (const [topic, current] of Object.entries(currentProgress)) {
      if (!mergedProgress[topic]) { mergedProgress[topic] = current; continue; }
      const prior = priorProgress[topic] || { notes: '', chk: {} };
      if (current.notes !== prior.notes) mergedProgress[topic].notes = current.notes;
      for (const [key, checked] of Object.entries(current.chk)) {
        if (checked !== prior.chk[key]) mergedProgress[topic].chk[key] = checked;
      }
    }
    const priorWeak = normalizeWeak(before.weak);
    const mergedWeak = normalizeWeak(Object.hasOwn(remote, 'weak') ? remote.weak : local.weak);
    for (const [topic, count] of Object.entries(normalizeWeak(local.weak))) {
      if (!Object.hasOwn(mergedWeak, topic)) mergedWeak[topic] = count;
      else if (Object.hasOwn(remote, 'weak')) mergedWeak[topic] = Math.min(Number.MAX_SAFE_INTEGER, mergedWeak[topic] + Math.max(0, count - (priorWeak[topic] || 0)));
    }
    // Historical attempts lack globally unique IDs. Deduplicate identical records;
    // this is startup reconciliation, not a multi-device conflict algorithm.
    const seen = new Set();
    const mergedAttempts = [...normalizeAttempts(remote.attempts), ...normalizeAttempts(local.attempts)]
      .filter(item => { const key = JSON.stringify(item); if (seen.has(key)) return false; seen.add(key); return true; })
      .sort((a, b) => Date.parse(a.at) - Date.parse(b.at)).slice(-5000);
    return { progress: mergedProgress, weak: mergedWeak, attempts: mergedAttempts };
  }
  const api = { normalizeProgress, normalizeWeak, normalizeAttempts, validCloudState, mergeConnectingState };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CCRN_STATE = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
