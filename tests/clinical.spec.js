const { test, expect } = require('./fixtures.js');

test('quiz explains source comparison, withheld content and paused exams', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Quiz', exact: true }).click();
  await expect(page.locator('#qBankNote')).toContainText('source-checked');
  await expect(page.locator('#qBankNote')).not.toContainText('150');
  await expect(page.locator('#clinicalNotice')).toContainText('licensed clinical review');
  await expect(page.getByRole('button', { name: 'Start Exam 1' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Start Exam 2' })).toBeDisabled();
});

test('outdated and unsupported original questions stay out of actual quiz flows', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Quiz', exact: true }).click();
  await page.getByRole('button', { name: 'All available' }).click();
  await page.getByRole('button', { name: 'Start quiz', exact: true }).click();
  const indices = await page.evaluate(() => quiz.map(q => QBANK.indexOf(q) + 1));
  expect(indices.length).toBeGreaterThan(0);
  for (const forbidden of [6, 14, 15, 17, 22]) expect(indices).not.toContain(forbidden);
  await page.locator('#qOpts button').first().click();
  await expect(page.locator('#qRationale')).toContainText('Source comparison');
  await expect(page.locator('#qRationale a').first()).toHaveAttribute('href', /^https:\/\//);
  const attempt = await page.evaluate(() => JSON.parse(localStorage.getItem('ccrn_attempts')).at(-1));
  expect(attempt.questionId).toMatch(/^q\d{3}$/);
  expect(attempt.contentVersion).toBe('2026-11-06');
});

test('missing evidence disables quiz and cannot be bypassed by the start handler', async ({ page }) => {
  await page.route('**/clinical-review.js', route => route.fulfill({ contentType: 'application/javascript', body: 'window.CCRN_CLINICAL_REVIEW = undefined;' }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Quiz', exact: true }).click();
  await expect(page.locator('#startQuiz')).toBeDisabled();
  page.once('dialog', dialog => dialog.dismiss());
  await page.evaluate(() => startQuiz());
  await expect(page.locator('#quizRunner')).toBeHidden();
});

test('unreviewed rationale edits invalidate the source gate', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Quiz', exact: true }).click();
  await expect(page.locator('#startQuiz')).toBeEnabled();
  await page.evaluate(async () => {
    QBANK.forEach(q => q.r += ' Unreviewed change.');
    await initClinicalReview();
  });
  await expect(page.locator('#startQuiz')).toBeDisabled();
  await expect(page.locator('#qBankNote')).toContainText('0 source-checked');
});

test('topic library does not inherit the question-bank review status', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Topic Library', exact: true }).click();
  await expect(page.locator('#libraryReviewNotice')).toContainText('not clinically validated');
});
