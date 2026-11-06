import { test, expect } from './fixtures.js';
import fs from 'node:fs/promises';

const reviewKey = 'ccrn_review_v2';
const originalReview = { Cardiology: { interval: 2, ease: 2.3, due: 0 } };
const history = [{ stem: 'Practice question', topic: 'Cardiology', sys: 'cv', correct: false, at: '2026-11-01T12:00:00.000Z', mode: 'quiz' }];

test.afterEach(async ({ runtimeErrors }) => {
  expect(runtimeErrors, 'No uncaught errors in the local app').toEqual([]);
});

async function openLab(page, { review = originalReview, attempts = history } = {}) {
  await page.addInitScript(({ review, attempts }) => {
    if (sessionStorage.getItem('learning-lab-test-seeded')) return;
    localStorage.setItem('ccrn_review_v2', JSON.stringify(review));
    localStorage.setItem('ccrn_attempts', JSON.stringify(attempts));
    sessionStorage.setItem('learning-lab-test-seeded', '1');
  }, { review, attempts });
  await page.goto('/');
  await page.locator('[data-view="progress"]').click();
  await expect(page.locator('#ccrnExtension')).toBeVisible();
  return page.locator('#ccrnExtension');
}

async function importText(page, text, { accept = true } = {}) {
  const lab = page.locator('#ccrnExtension');
  await lab.getByRole('button', { name: 'Backup', exact: true }).click();
  page.once('dialog', dialog => accept ? dialog.accept() : dialog.dismiss());
  await lab.locator('input[type="file"]').setInputFiles({ name: 'backup.json', mimeType: 'application/json', buffer: Buffer.from(text) });
}

test('malformed saved review data does not crash or overwrite the original record', async ({ page }) => {
  const bad = { Cardiology: null };
  const lab = await openLab(page, { review: bad });
  await expect(lab.getByRole('heading', { name: 'Spaced review queue' })).toBeVisible();
  await expect(lab.locator('#ccrnStorageStatus')).toContainText(/review.*could not be loaded/i);
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)), reviewKey)).toEqual(bad);
});

test('malformed attempt history is ignored safely without overwriting it', async ({ page }) => {
  const bad = [null, false, { correct: 'false', topic: 'Fake topic' }, ...history];
  const lab = await openLab(page, { attempts: bad });
  await lab.getByRole('button', { name: 'Analytics', exact: true }).click();
  await expect(lab).toContainText('1 recorded answers');
  await expect(lab.locator('#ccrnStorageStatus')).toContainText(/answer history.*ignored/i);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('ccrn_attempts')))).toEqual(bad);
});

test('prototype-shaped system labels are counted without poisoning analytics', async ({ page }) => {
  const lab = await openLab(page, { attempts: [{ ...history[0], sys: '__proto__' }, { ...history[0], sys: 'constructor', correct: true }] });
  await lab.getByRole('button', { name: 'Analytics', exact: true }).click();
  await expect(lab.locator('tbody tr')).toHaveCount(2);
  await expect(lab.locator('tbody')).toContainText('1/1');
  await expect(lab.locator('tbody')).toContainText('0/1');
});

const invalidBackups = [
  ['array schedule', '{"version":2,"review":[]}'],
  ['null entry', '{"version":2,"review":{"New":null}}'],
  ['missing due date', '{"version":2,"review":{"New":{"interval":1,"ease":2.3}}}'],
  ['string due date', '{"version":2,"review":{"New":{"interval":1,"ease":2.3,"due":"0"}}}'],
  ['negative interval', '{"version":2,"review":{"New":{"interval":-1,"ease":2.3,"due":0}}}'],
  ['overflowing due date', '{"version":2,"review":{"New":{"interval":1,"ease":2.3,"due":1e999}}}'],
  ['prototype key', '{"version":2,"review":{"__proto__":{"interval":1,"ease":2.3,"due":0}}}'],
  ['constructor key', '{"version":2,"review":{"constructor":{"interval":1,"ease":2.3,"due":0}}}'],
  ['prototype field', '{"version":2,"review":{"New":{"interval":1,"ease":2.3,"due":0,"prototype":{}}}}'],
  ['wrong version', '{"version":1,"review":{}}'],
  ['fractional interval', '{"version":2,"review":{"New":{"interval":1.5,"ease":2.3,"due":0}}}'],
  ['invalid ease', '{"version":2,"review":{"New":{"interval":1,"ease":"2.3","due":0}}}'],
  ['negative last-review date', '{"version":2,"review":{"New":{"interval":1,"ease":2.3,"due":0,"last":-1}}}'],
];
for (const [label, json] of invalidBackups) {
  test(`rejects ${label} without losing the existing schedule`, async ({ page }) => {
    await openLab(page);
    await importText(page, json);
    await expect(page.locator('#ccrnBackupStatus')).toContainText(/invalid backup/i);
    expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)), reviewKey)).toEqual(originalReview);
  });
}

test('oversized imports explain the limit without replacing data', async ({ page }) => {
  await openLab(page);
  await importText(page, ' '.repeat(2_000_001));
  await expect(page.locator('#ccrnBackupStatus')).toContainText(/2 MB/i);
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)), reviewKey)).toEqual(originalReview);
});

test('a file read failure is reported and preserves the schedule', async ({ page }) => {
  await openLab(page);
  await page.evaluate(() => { File.prototype.text = () => Promise.reject(new Error('Simulated file access error')); });
  await importText(page, JSON.stringify({ version: 2, review: {} }));
  await expect(page.locator('#ccrnBackupStatus')).toContainText(/could not read/i);
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)), reviewKey)).toEqual(originalReview);
});

test('cancelled import leaves the saved schedule and answer history unchanged', async ({ page }) => {
  await openLab(page);
  await importText(page, JSON.stringify({ version: 2, review: {} }), { accept: false });
  await expect(page.locator('#ccrnBackupStatus')).toContainText(/cancelled/i);
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)), reviewKey)).toEqual(originalReview);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('ccrn_attempts')))).toEqual(history);
});

test('failed import write keeps both saved and displayed schedule unchanged', async ({ page }) => {
  const lab = await openLab(page);
  await page.evaluate(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === 'ccrn_review_v2') throw new DOMException('Storage full', 'QuotaExceededError');
      return original.call(this, key, value);
    };
  });
  await importText(page, JSON.stringify({ version: 2, review: { Respiratory: { interval: 1, ease: 2.3, due: 0 } } }));
  await expect(lab.locator('#ccrnStorageStatus')).toContainText(/could not save/i);
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)), reviewKey)).toEqual(originalReview);
  await lab.getByRole('button', { name: 'Review queue', exact: true }).click();
  await expect(lab.locator('.ccrn-box')).toContainText('Cardiology');
  await expect(lab.locator('.ccrn-box')).not.toContainText('Respiratory');
});

test('failed review write retains a due item and reports that it was not saved', async ({ page }) => {
  const lab = await openLab(page);
  await page.evaluate(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === 'ccrn_review_v2') throw new DOMException('Storage full', 'QuotaExceededError');
      return original.call(this, key, value);
    };
  });
  await lab.getByRole('button', { name: 'Reviewed today' }).click();
  await expect(lab.locator('#ccrnStorageStatus')).toContainText(/could not save/i);
  await expect(lab.getByRole('button', { name: 'Reviewed today' })).toBeVisible();
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)), reviewKey)).toEqual(originalReview);
});

test('a real download exports the schedule and history; import restores only the schedule', async ({ page }, testInfo) => {
  const lab = await openLab(page);
  await lab.getByRole('button', { name: 'Backup', exact: true }).click();
  const downloadPromise = page.waitForEvent('download');
  await lab.getByRole('button', { name: 'Export learning backup JSON' }).click();
  const download = await downloadPromise;
  const path = testInfo.outputPath('learning-backup.json');
  await download.saveAs(path);
  const exported = JSON.parse(await fs.readFile(path, 'utf8'));
  expect(exported.version).toBe(2);
  expect(exported.review).toEqual(originalReview);
  expect(exported.attempts).toEqual(history);
  await importText(page, JSON.stringify({ ...exported, review: { Respiratory: { interval: 3, ease: 2, due: 4_000_000_000_000 } }, attempts: [] }));
  await expect(lab.locator('#ccrnBackupStatus')).toContainText(/imported/i);
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)), reviewKey)).toEqual({ Respiratory: { interval: 3, ease: 2, due: 4_000_000_000_000 } });
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('ccrn_attempts')))).toEqual(history);
});

test('current quiz provenance metadata survives analytics and a learning-backup round trip', async ({ page }, testInfo) => {
  const recent = [{ ...history[0], questionId: 'q001', contentVersion: '2026-11-06' }];
  const lab = await openLab(page, { attempts: recent });
  await lab.getByRole('button', { name: 'Analytics', exact: true }).click();
  await expect(lab).toContainText('1 recorded answers');
  await lab.getByRole('button', { name: 'Backup', exact: true }).click();
  const downloadPromise = page.waitForEvent('download');
  await lab.getByRole('button', { name: 'Export learning backup JSON' }).click();
  const download = await downloadPromise;
  const path = testInfo.outputPath('provenance-backup.json');
  await download.saveAs(path);
  const text = await fs.readFile(path, 'utf8');
  expect(JSON.parse(text).attempts).toEqual(recent);
  await importText(page, text);
  await expect(lab.locator('#ccrnBackupStatus')).toContainText(/imported/i);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('ccrn_attempts')))).toEqual(recent);
});

test('reviewing a due topic saves its new date through a reload and keeps keyboard focus', async ({ page }) => {
  const lab = await openLab(page);
  await lab.getByRole('button', { name: 'Reviewed today' }).focus();
  await page.keyboard.press('Enter');
  await expect(lab.locator('#ccrnReviewHeading')).toBeFocused();
  await expect(lab).toContainText('0 topics due');
  const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), reviewKey);
  expect(saved.Cardiology.interval).toBe(5);
  expect(saved.Cardiology.due).toBeGreaterThan(Date.now());
  await page.reload();
  await page.locator('[data-view="progress"]').click();
  await expect(lab).toContainText('0 topics due');
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)), reviewKey)).toEqual(saved);
});

test('invalid JSON in stored review data is preserved and reported after reload', async ({ page }) => {
  const lab = await openLab(page);
  await page.evaluate(key => localStorage.setItem(key, '{broken'), reviewKey);
  await page.reload();
  await page.locator('[data-view="progress"]').click();
  await expect(lab.locator('#ccrnStorageStatus')).toContainText(/review.*could not be loaded/i);
  expect(await page.evaluate(key => localStorage.getItem(key), reviewKey)).toBe('{broken');
});

test('keyboard answers preserve focus through both stages and expose their sources', async ({ page }) => {
  const lab = await openLab(page);
  await lab.getByRole('button', { name: 'Case simulations', exact: true }).click();
  for (const title of ['Shock physiology', 'Respiratory deterioration']) {
    await lab.getByRole('button', { name: title, exact: true }).click();
    for (let step = 0; step < 2; step++) {
      await expect(lab.locator('[data-case-stage]')).toHaveAttribute('data-source-status', 'source-checked');
      const choice = lab.locator('[data-answer]').nth(step === 0 ? 0 : 1);
      await choice.focus();
      await page.keyboard.press('Enter');
      await expect(lab.locator('#ccrnCaseFeedback')).toBeFocused();
      await expect(lab.locator('#ccrnCaseFeedback')).toContainText(step === 0 ? 'Correct' : 'Review the reasoning');
      await expect(lab.locator('#ccrnCaseFeedback')).toContainText(/source.checked.*no licensed clinical review/i);
      await expect(lab.locator('#ccrnCaseFeedback a')).not.toHaveCount(0);
      if (step === 0) {
        const next = lab.getByRole('button', { name: 'Next stage' });
        for (let tab = 0; tab < 8 && !(await next.evaluate(el => el === document.activeElement)); tab++) await page.keyboard.press('Tab');
        await expect(next).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(lab.locator('#ccrnCasePrompt')).toBeFocused();
      } else {
        await expect(lab.locator('#ccrnCaseFeedback')).toContainText('Case complete');
        await expect(lab.getByRole('button', { name: 'Choose another case' })).toBeVisible();
      }
    }
  }
});

test('a clinical text edit cannot silently inherit a prior source-check status', async ({ page }) => {
  await page.route('**/learning-lab.js', async route => {
    const response = await route.fetch();
    const original = await response.text();
    await route.fulfill({ response, body: original.replace('MAP 54', 'MAP 99') });
  });
  const lab = await openLab(page);
  await lab.getByRole('button', { name: 'Case simulations', exact: true }).click();
  await expect(lab.locator('[data-case-stage]')).toHaveAttribute('data-source-status', 'quarantined');
  await expect(lab.locator('[data-answer]')).toHaveCount(0);
  await expect(lab).toContainText(/source check.*renew/i);
  await expect(lab).not.toContainText('Source-checked 2026-11-06');
  await lab.getByRole('button', { name: 'References & quality', exact: true }).click();
  await expect(lab.locator('.ccrn-box').filter({ hasText: 'shock-1' })).toContainText(/source check.*renew/i);
});

test('a real missed quiz answer appears in the review queue, analytics and downloaded history', async ({ page }, testInfo) => {
  const lab = await openLab(page, { review: {}, attempts: [] });
  await page.getByRole('button', { name: 'Quiz', exact: true }).click();
  await expect(page.locator('#startQuiz')).toBeEnabled();
  await page.locator('#startQuiz').click();
  const question = await page.evaluate(() => ({ answer: quiz[qIdx].a, options: quiz[qIdx].o.length, topic: quiz[qIdx].topic }));
  await page.locator('#qOpts [data-i="' + ((question.answer + 1) % question.options) + '"]').click();
  await expect(page.locator('#qRationale')).toContainText('Not quite');
  await page.getByRole('button', { name: 'Progress', exact: true }).click();
  await lab.getByRole('button', { name: 'Review queue', exact: true }).click();
  await expect(lab.locator('.ccrn-box')).toContainText(question.topic);
  await lab.getByRole('button', { name: 'Analytics', exact: true }).click();
  await expect(lab).toContainText('1 recorded answers');
  await lab.getByRole('button', { name: 'Backup', exact: true }).click();
  const downloadPromise = page.waitForEvent('download');
  await lab.getByRole('button', { name: 'Export learning backup JSON' }).click();
  const download = await downloadPromise;
  const path = testInfo.outputPath('real-quiz-backup.json');
  await download.saveAs(path);
  const backup = JSON.parse(await fs.readFile(path, 'utf8'));
  expect(backup.attempts).toHaveLength(1);
  expect(backup.attempts[0]).toMatchObject({ correct: false, topic: question.topic, contentVersion: '2026-11-06' });
  expect(backup.attempts[0].questionId).toMatch(/^q\d{3}$/);
  await importText(page, JSON.stringify(backup));
  await expect(lab.locator('#ccrnBackupStatus')).toContainText(/imported/i);
});

test('learning controls remain aligned and inside the panel at desktop and narrow phone widths', async ({ page }, testInfo) => {
  const lab = await openLab(page);
  const widths = testInfo.project.name.startsWith('mobile') ? [390, 320] : [1280];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await lab.getByRole('button', { name: 'Case simulations', exact: true }).click();
    await lab.locator('[data-answer]').first().click();
    const bounds = await lab.evaluate(element => {
      const panel = element.getBoundingClientRect();
      const misaligned = [...element.querySelectorAll('.ccrn-ext-tabs,.ccrn-cases')].some(group => {
        const boxes = [...group.children].map(button => button.getBoundingClientRect());
        return boxes.some((a, i) => boxes.slice(i + 1).some(b =>
          Math.max(a.top, b.top) < Math.min(a.bottom, b.bottom) && (Math.abs(a.top - b.top) > 1 || Math.abs(a.height - b.height) > 1)));
      });
      return {
        misaligned,
        splitVersion: element.querySelector('h2 small').getClientRects().length > 1,
        overflows: element.scrollWidth > element.clientWidth + 1,
        outside: [...element.querySelectorAll('button')].some(button => {
          const box = button.getBoundingClientRect();
          return box.left < panel.left || box.right > panel.right + 1 || box.height < 44;
        })
      };
    });
    expect(bounds).toEqual({ misaligned: false, splitVersion: false, overflows: false, outside: false });
    await lab.screenshot({ path: testInfo.outputPath('learning-lab-' + width + '.png') });
    await lab.getByRole('button', { name: 'Backup', exact: true }).click();
    const file = lab.locator('input[type="file"]');
    const inputBounds = await file.boundingBox();
    const panelBounds = await lab.boundingBox();
    expect(inputBounds.x + inputBounds.width).toBeLessThanOrEqual(panelBounds.x + panelBounds.width + 1);
  }
});
