const { test, expect } = require('./fixtures.js');

async function openQuiz(page) {
  await page.getByRole('button', { name: 'Quiz', exact: true }).click();
  await expect(page.locator('#startQuiz')).toBeEnabled();
}
async function currentQuestion(page) {
  return page.evaluate(() => ({ ...quiz[qIdx] }));
}
async function openFirstTopic(page) {
  await page.getByRole('button', { name: 'Topic Library', exact: true }).click();
  await page.locator('.sys-head').first().click();
  await page.locator('.sys-body.open .sub').first().click();
  await expect(page.locator('#view-reader')).toBeVisible();
  return page.locator('#rdTitle').innerText();
}
async function localValue(page, key) {
  return page.evaluate(name => JSON.parse(localStorage.getItem(name)), key);
}

test('navigation, study allocation, references and progress render without runtime errors', async ({ page, runtimeErrors, firebase }, testInfo) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'CCRN Study Hub' })).toBeVisible();
  await page.getByLabel('Total study hours').fill('160');
  await page.getByRole('button', { name: '8 wk', exact: true }).click();
  await expect(page.locator('#perWeek')).toHaveText('20.0 h');
  for (const [name, view] of [['Topic Library', 'library'], ['Visuals & References', 'visuals'], ['Quiz', 'quiz'], ['Progress', 'progress']]) {
    await page.getByRole('button', { name, exact: true }).click();
    await expect(page.locator(`#view-${view}`)).toBeVisible();
  }
  const links = await page.locator('#visualLibrary a').evaluateAll(nodes => nodes.map(node => ({ href: node.href, rel: node.rel })));
  expect(links.length).toBeGreaterThan(0);
  expect(links.every(link => link.href.startsWith('https://') && link.rel.includes('noopener'))).toBe(true);
  expect(runtimeErrors).toEqual([]);
  expect(firebase.calls).toEqual([]);
  await testInfo.attach('progress-view.png', { body: await page.screenshot({ animations: 'disabled' }), contentType: 'image/png' });
});

test('zero study hours produce finite empty allocation bars', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Total study hours').fill('0');
  await expect(page.locator('#perWeek')).toHaveText('0.0 h');
  expect(await page.locator('#bpBars .bar-fill').evaluateAll(bars => bars.some(bar => /NaN|Infinity/.test(bar.getAttribute('style'))))).toBe(false);
});

test('correct and wrong answers are recorded once, scored, persisted and reset for a new quiz', async ({ page }, testInfo) => {
  await page.goto('/');
  await openQuiz(page);
  await page.locator('#startQuiz').click();
  await testInfo.attach('quiz-view.png', { body: await page.screenshot({ animations: 'disabled' }), contentType: 'image/png' });
  const count = Number((await page.locator('#qCount').innerText()).match(/of (\d+)/)[1]);
  expect(count).toBeGreaterThan(1);
  const questions = [];
  for (let index = 0; index < count; index++) {
    const question = await currentQuestion(page);
    questions.push(question);
    const choice = index === 1 ? (question.a + 1) % question.o.length : question.a;
    await page.locator(`#qOpts [data-i="${choice}"]`).dblclick();
    await expect(page.locator('#qRationale')).toContainText(index === 1 ? 'Not quite' : 'Correct');
    await expect(page.locator('#qOpts button:disabled')).toHaveCount(question.o.length);
    expect(await localValue(page, 'ccrn_attempts')).toHaveLength(index + 1);
    await page.locator('#qNext').click();
  }
  await expect(page.locator('#rsScore')).toHaveText(`${Math.round((count - 1) / count * 100)}%`);
  await expect(page.locator('#rsSub')).toContainText(`${count - 1} of ${count} correct`);
  expect((await localValue(page, 'ccrn_weak'))[questions[1].topic]).toBe(1);
  await page.getByRole('button', { name: 'New quiz', exact: true }).click();
  await expect(page.locator('#quizSetup')).toBeVisible();
  await expect(page.locator('#quizRunner')).toBeHidden();
  await expect(page.locator('#quizResults')).toBeHidden();
  await page.locator('#startQuiz').click();
  await expect(page.locator('#qCount')).toContainText('Q 1 of');
  await expect(page.locator('#qRationale')).not.toHaveClass(/show/);
  await page.reload();
  expect(await localValue(page, 'ccrn_attempts')).toHaveLength(count);
});

test('system selection and All available length contain only the chosen system', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);
  const { sys, available } = await page.evaluate(() => {
    const pool = typeof sourceCheckedQuestions === 'undefined' ? QBANK : sourceCheckedQuestions;
    const sys = pool[0].sys;
    return { sys, available: pool.filter(question => question.sys === sys).length };
  });
  const selectedIds = await page.locator('#quizSysChips .sys.on').evaluateAll(chips => chips.map(chip => chip.dataset.sys));
  for (const id of selectedIds) if (id !== sys) await page.locator(`#quizSysChips [data-sys="${id}"]`).click();
  await page.locator(`#quizSysChips [data-sys="${sys}"]`).click();
  await expect(page.locator('#quizSysChips .sys.on')).toHaveCount(1);
  await page.getByRole('button', { name: 'All available', exact: true }).click();
  await page.locator('#startQuiz').click();
  await expect(page.locator('#qCount')).toHaveText(`Q 1 of ${available}`);
  expect(await page.evaluate(() => quiz.every(question => question.sys === quiz[0].sys))).toBe(true);
  expect((await currentQuestion(page)).sys).toBe(sys);
});

test('adaptive ordering places a previously missed question first without changing the score', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);
  const target = await page.evaluate(() => {
    const pool = typeof sourceCheckedQuestions === 'undefined' ? QBANK : sourceCheckedQuestions;
    return pool[pool.length - 1];
  });
  await page.evaluate(question => localStorage.setItem('ccrn_attempts', JSON.stringify([
    { stem: question.q, topic: question.topic, sys: question.sys, correct: false, at: '2026-11-01T10:00:00.000Z', mode: 'quiz' }
  ])), target);
  await page.reload();
  await page.getByRole('button', { name: 'Progress', exact: true }).click();
  await page.getByRole('checkbox', { name: 'Prioritize previously missed questions in topic quizzes' }).check();
  await openQuiz(page);
  await page.locator('#startQuiz').click();
  expect((await currentQuestion(page)).q).toBe(target.q);
  await page.locator(`#qOpts [data-i="${target.a}"]`).click();
  expect((await localValue(page, 'ccrn_attempts')).at(-1).correct).toBe(true);
});

test('topic notes and all five checklist states survive a reload', async ({ page }, testInfo) => {
  await page.goto('/');
  const topic = await openFirstTopic(page);
  await testInfo.attach('reader-view.png', { body: await page.screenshot({ animations: 'disabled' }), contentType: 'image/png' });
  await page.locator('#rdContent textarea').fill('My study note: compare the assessment trend.');
  for (const checkbox of await page.locator('#rdContent input[type="checkbox"]').all()) await checkbox.check();
  await page.reload();
  expect(await openFirstTopic(page)).toBe(topic);
  await expect(page.locator('#rdContent textarea')).toHaveValue('My study note: compare the assessment trend.');
  await expect(page.locator('#rdContent input:checked')).toHaveCount(5);
  await page.getByRole('button', { name: 'Progress', exact: true }).click();
  await expect(page.locator('#progKpis .kpi').filter({ hasText: 'Topics completed' }).locator('.n')).toHaveText('1');
});

test('keyboard users can expand the library and enter a topic', async ({ page }) => {
  await page.goto('/');
  const tab = page.getByRole('button', { name: 'Topic Library', exact: true });
  await tab.focus();
  await page.keyboard.press('Enter');
  const header = page.locator('.sys-head').first();
  await expect(header).toHaveAttribute('aria-expanded', 'false');
  await header.focus();
  await expect(header).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(header).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  const topic = page.locator('.sys-body.open .sub').first();
  await expect(topic).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#view-reader')).toBeVisible();
  await expect(page.locator('#rdContent textarea')).toHaveAccessibleName(/notes/i);
});

test('keyboard quiz answers transfer focus to feedback and the next question', async ({ page }) => {
  await page.goto('/');
  await openQuiz(page);
  await page.locator('#startQuiz').focus();
  await page.keyboard.press('Enter');
  const firstOption = page.locator('#qOpts button').first();
  await firstOption.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#qRationale')).toBeFocused();
  await page.keyboard.press('Tab');
  for (const sourceLink of await page.locator('#qRationale a').all()) {
    await expect(sourceLink).toBeFocused();
    await page.keyboard.press('Tab');
  }
  await expect(page.locator('#qNext')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#qCount')).toContainText('Q 2 of');
  await expect(page.locator('#qStem')).toBeFocused();
});

for (const seed of [
  { name: 'malformed JSON', entries: { ccrn_progress: '{bad', ccrn_weak: '{bad', ccrn_attempts: '{bad' } },
  { name: 'wrong saved types', entries: { ccrn_progress: 'null', ccrn_weak: '[]', ccrn_attempts: '{}' } },
  { name: 'invalid nested entries', entries: { ccrn_progress: '{"Acute coronary syndrome":{"notes":7,"chk":null}}', ccrn_weak: '{"ACS":{}}', ccrn_attempts: '[null,7,{}]' } }
]) {
  test(`${seed.name} falls back to a usable page without overwriting storage on load`, async ({ page, runtimeErrors }) => {
    await page.addInitScript(entries => { for (const [key, value] of Object.entries(entries)) localStorage.setItem(key, value); }, seed.entries);
    await page.goto('/');
    await page.getByRole('button', { name: 'Progress', exact: true }).click();
    await expect(page.locator('#progKpis .kpi')).toHaveCount(5);
    expect(runtimeErrors).toEqual([]);
    for (const [key, value] of Object.entries(seed.entries)) expect(await page.evaluate(k => localStorage.getItem(k), key)).toBe(value);
    await openQuiz(page);
    await page.locator('#startQuiz').click();
    await expect(page.locator('#qStem')).not.toBeEmpty();
  });
}

test('saved weak-area text and notes never become active HTML', async ({ page }) => {
  const payload = '<img src=x onerror="window.__injected=1">';
  await page.addInitScript(value => {
    localStorage.setItem('ccrn_weak', JSON.stringify({ [value]: 2 }));
  }, payload);
  await page.goto('/');
  await page.getByRole('button', { name: 'Progress', exact: true }).click();
  await expect(page.locator('#weakList img')).toHaveCount(0);
  expect(await page.evaluate(() => window.__injected)).toBeUndefined();
  const topic = await openFirstTopic(page);
  await page.locator('#rdContent textarea').fill('</textarea><img src=x onerror="window.__injected=2">');
  await page.reload();
  expect(await openFirstTopic(page)).toBe(topic);
  await expect(page.locator('#rdContent textarea')).toHaveValue('</textarea><img src=x onerror="window.__injected=2">');
  expect(await page.evaluate(() => window.__injected)).toBeUndefined();
});

test('unavailable local storage preserves the current session and warns that it is temporary', async ({ page, runtimeErrors }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = function () { throw new DOMException('Synthetic quota exceeded', 'QuotaExceededError'); };
  });
  await page.goto('/');
  const topic = await openFirstTopic(page);
  await page.locator('#rdContent textarea').fill('Temporary session note');
  await expect(page.locator('#noteStatus')).toContainText(/session|temporary|could not save/i);
  await page.getByRole('button', { name: 'Progress', exact: true }).click();
  await openFirstTopic(page);
  await expect(page.locator('#rdTitle')).toHaveText(topic);
  await expect(page.locator('#rdContent textarea')).toHaveValue('Temporary session note');
  expect(runtimeErrors).toEqual([]);
});

test('every primary view and the topic reader fit a 320 pixel viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto('/');
  for (const name of ['Study Blueprint', 'Topic Library', 'Visuals & References', 'Quiz', 'Progress']) {
    await page.getByRole('button', { name, exact: true }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth), `${name} exceeds the viewport`).toBeLessThanOrEqual(321);
  }
  await openFirstTopic(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth), 'Reader exceeds the viewport').toBeLessThanOrEqual(321);
});

test.describe('test server and browser network boundary', () => {
  test.use({ expectedBlockedRequests: ['https://network-boundary.invalid/must-not-leave-browser'] });
  test('does not expose repository files or permit external requests', async ({ page, firebase }) => {
    await page.goto('/');
    const outcomes = await page.evaluate(async () => {
      const files = await Promise.all(['/package.json', '/.git/config', '/tests/fixtures.js', '/%2e%2e/package.json'].map(async url => (await fetch(url)).status));
      let externalRejected = false;
      try { await fetch('https://network-boundary.invalid/must-not-leave-browser'); } catch { externalRejected = true; }
      return { files, externalRejected };
    });
    expect(outcomes.files).toEqual([404, 404, 404, 404]);
    expect(outcomes.externalRejected).toBe(true);
    expect(firebase.blocked).toEqual(['https://network-boundary.invalid/must-not-leave-browser']);
  });
});
