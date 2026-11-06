const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createHash, webcrypto } = require('node:crypto');
const { eligibleQuestions } = require('../clinical-gate.js');
const question = { sys: 'cv', topic: 'test fixture', q: 'Synthetic nonclinical fixture?', o: ['A', 'B', 'C', 'D'], a: 0, r: 'Fixture rationale.' };
const digest = createHash('sha256').update(JSON.stringify(question)).digest('hex');
const review = () => ({ references: { source: { title: 'Fixture reference', url: 'https://example.org/reference' } }, questions: [{ id: 'q001', index: 0, status: 'source-supported', contentSha256: digest, references: ['source'], clinicalReviewer: null }] });

test('only exact source-supported content enters a learning quiz', async () => {
  assert.equal((await eligibleQuestions([question], review(), webcrypto.subtle)).length, 1);
  assert.deepEqual(await eligibleQuestions([{ ...question, r: 'Unreviewed changed rationale.' }], review(), webcrypto.subtle), []);
  const quarantined = review(); quarantined.questions[0].status = 'quarantined';
  assert.deepEqual(await eligibleQuestions([question], quarantined, webcrypto.subtle), []);
});

test('missing, duplicate or incomplete evidence fails closed', async () => {
  assert.deepEqual(await eligibleQuestions([question], undefined, webcrypto.subtle), []);
  assert.deepEqual(await eligibleQuestions([question], review(), null), []);
  const missing = review(); missing.references = {};
  assert.deepEqual(await eligibleQuestions([question], missing, webcrypto.subtle), []);
  const duplicate = review(); duplicate.questions.push({ ...duplicate.questions[0] });
  assert.deepEqual(await eligibleQuestions([question], duplicate, webcrypto.subtle), []);
  const wrongId = review(); wrongId.questions[0].id = 'q002';
  assert.deepEqual(await eligibleQuestions([question], wrongId, webcrypto.subtle), []);
});
