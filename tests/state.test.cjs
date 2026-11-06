const { test } = require('node:test');
const assert = require('node:assert/strict');
const { normalizeProgress, normalizeWeak, normalizeAttempts, validCloudState, mergeConnectingState } = require('../study-state.js');

test('malformed storage values cannot crash notes, progress or analytics', () => {
  for (const value of [null, [], true, 7, 'bad']) {
    assert.deepEqual(normalizeProgress(value, ['ACS']), {});
    assert.deepEqual(normalizeWeak(value), {});
    assert.deepEqual(normalizeAttempts(value), []);
  }
  assert.deepEqual(normalizeProgress({ ACS: { notes: 42, chk: { 0: true, 1: 'yes', 9: true } } }, ['ACS']), { ACS: { notes: '', chk: { 0: true } } });
});

test('notes and genuine progress survive normalization without modifying the input', () => {
  const input = { ACS: { notes: '<b>my notes</b>', chk: { 0: true, 1: false } }, other: { notes: 'unknown topic' } };
  const result = normalizeProgress(input, ['ACS']);
  assert.deepEqual(result, { ACS: { notes: '<b>my notes</b>', chk: { 0: true, 1: false } } });
  result.ACS.chk[0] = false;
  assert.equal(input.ACS.chk[0], true);
});

test('untrusted map keys and nonfinite counters cannot become prototype or arithmetic state', () => {
  const hostile = JSON.parse('{"__proto__":8,"constructor":3,"toString":2,"ACS":2,"bad":-1,"fraction":1.5,"text":"4"}');
  assert.deepEqual(normalizeWeak(hostile), { ACS: 2 });
  assert.equal({}.polluted, undefined);
});

test('attempts require actual booleans, dates and known systems; history is bounded', () => {
  const valid = { stem: 'An original question', topic: 'ACS', sys: 'cv', correct: false, at: '2026-11-06T12:00:00.000Z', mode: 'quiz', questionId: 'q001' };
  assert.deepEqual(normalizeAttempts([null, valid, { ...valid, correct: 'false' }, { ...valid, at: 'invalid' }, { ...valid, sys: '__proto__' }]), [valid]);
  assert.equal(normalizeAttempts(Array(5001).fill(valid)).length, 5000);
});

test('cloud envelopes reject malformed fields while accepting legitimate partial historical state', () => {
  assert.equal(validCloudState({ progress: {}, weak: {}, attempts: [] }), true);
  assert.equal(validCloudState({ progress: {} }), true);
  for (const data of [null, [], { progress: [] }, { weak: 'bad' }, { attempts: {} }, {}]) assert.equal(validCloudState(data), false);
});

test('nested malformed cloud records are rejected instead of erasing valid local data', () => {
  for (const data of [
    { progress: { ACS: { notes: 7, chk: null } } },
    { progress: { ACS: { notes: 'Valid', chk: { 0: 'true' } } } },
    { progress: { ACS: { notes: 'x'.repeat(100001) } } },
    { weak: { ACS: {} } }, { weak: { ACS: -1 } },
    { attempts: [null, 7, {}] }
  ]) assert.equal(validCloudState(data), false);
  assert.equal(validCloudState({ progress: { ACS: { chk: { 0: false } } }, weak: { ACS: 2 }, attempts: [] }), true);
});

test('connecting merge preserves local field edits and untouched remote records without duplication', () => {
  const oldAttempt = { stem: 'Old answer', topic: 'ACS', sys: 'cv', correct: false, at: '2026-11-01T12:00:00.000Z', mode: 'quiz' };
  const newAttempt = { ...oldAttempt, stem: 'New answer', at: '2026-11-06T12:00:00.000Z' };
  const before = { progress: { ACS: { notes: 'Before', chk: { 0: false } } }, weak: { ACS: 2 }, attempts: [oldAttempt] };
  const local = { progress: { ACS: { notes: 'Typed during connection', chk: { 0: false, 1: true } } }, weak: { ACS: 3 }, attempts: [oldAttempt, newAttempt] };
  const remote = { progress: { ACS: { notes: 'Remote', chk: { 0: true } }, Shock: { notes: 'Remote only', chk: {} } }, weak: { ACS: 7, Shock: 4 }, attempts: [oldAttempt] };
  const originals = JSON.stringify([before, local, remote]);
  const merged = mergeConnectingState(remote, before, local, ['ACS', 'Shock']);
  assert.deepEqual(merged.progress, { ACS: { notes: 'Typed during connection', chk: { 0: true, 1: true } }, Shock: { notes: 'Remote only', chk: {} } });
  assert.deepEqual(merged.weak, { ACS: 8, Shock: 4 });
  assert.deepEqual(merged.attempts, [oldAttempt, newAttempt]);
  assert.equal(JSON.stringify([before, local, remote]), originals);
});

test('connecting merge rejects invalid cloud envelopes and preserves local fields absent from partial cloud data', () => {
  const local = { progress: { ACS: { notes: 'Local note', chk: {} } }, weak: { ACS: 2 }, attempts: [] };
  assert.throws(() => mergeConnectingState({ progress: [] }, local, local, ['ACS']), /Invalid cloud/);
  assert.deepEqual(mergeConnectingState({ weak: { Shock: 3 } }, local, local, ['ACS']), { ...local, weak: { Shock: 3, ACS: 2 } });
});
