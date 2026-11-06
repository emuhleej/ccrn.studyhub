const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');

test('every question has one current evidence decision tied to its complete content', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const bank = vm.runInNewContext('(' + html.match(/const QBANK = (\[[\s\S]*?\n\]);/)[1] + ')');
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'clinical-review.js'), 'utf8'), context);
  const review = context.window.CCRN_CLINICAL_REVIEW;
  assert.equal(review.questions.length, bank.length, 'New or removed content needs a matching audit update');
  assert.equal(new Set(review.questions.map(item => item.id)).size, bank.length);
  bank.forEach((question, index) => {
    const id = 'q' + String(index + 1).padStart(3, '0');
    const items = review.questions.filter(item => item.id === id && item.index === index);
    assert.equal(items.length, 1, `${id} must have exactly one evidence decision`);
    const item = items[0];
    assert.equal(item.contentSha256, createHash('sha256').update(JSON.stringify(question)).digest('hex'), `${id} changed; recheck all claims before updating its evidence`);
    assert.ok(['source-supported', 'quarantined'].includes(item.status));
    assert.ok(item.finding && item.requiredReview, `${id} needs findings and reviewer limitations`);
    assert.ok(item.references.length, `${id} must identify its evidence or contradiction`);
    for (const source of item.references) {
      assert.ok(review.references[source]?.locator, `${id}: missing source section`);
      assert.match(review.references[source].url, /^https:\/\//);
    }
    assert.equal(question.o.length, 4);
    assert.ok(Number.isInteger(question.a) && question.a >= 0 && question.a < 4);
  });
});
