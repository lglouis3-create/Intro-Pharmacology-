// Daily click-through: every tab, exam sim to result, refreshes, guides walkthroughs, back gesture, at 390 and 1200 px.
// Run from the repo root with the site served:  python3 -m http.server 8767 &  NODE_PATH=$(npm root -g) node exam1-drill/src/daily/glitch.js
const {chromium} = require('playwright');
const URL = process.env.DRILL_URL || 'http://localhost:8767/exam1-drill/PHAR4344_Exam1_Drill.html';
(async () => { const b = await chromium.launch({executablePath: '/opt/pw-browsers/chromium'});
const issues = [], info = [];
for (const vp of [{width: 390, height: 844}, {width: 1200, height: 900}]) {
  const p = await b.newPage({viewport: vp, hasTouch: vp.width < 500}); const tag = vp.width;
  p.on('pageerror', e => issues.push(`${tag} pageerror ${e.message}`)); p.on('console', m => { if (m.type() === 'error' && !/favicon|404/.test(m.text())) issues.push(`${tag} console ${m.text()}`); });
  p.on('dialog', d => d.accept());
  await p.goto(URL); await p.waitForTimeout(1500);
  const check = async name => {
    const r = await p.evaluate(() => ({hs: document.documentElement.scrollWidth > innerWidth + 1,
      off: [...document.querySelectorAll('#view button, #view a, #view input, #view select')].filter(e => { const b = e.getBoundingClientRect(); return b.width && (b.right > innerWidth + 2 || b.left < -2); }).slice(0, 3).map(e => (e.textContent || e.id || e.tagName).trim().slice(0, 30)),
      empty: !document.querySelector('#view') || !document.querySelector('#view').textContent.trim()}));
    if (r.hs) issues.push(`${tag} ${name}: horizontal scroll`); if (r.off.length) issues.push(`${tag} ${name}: off-screen ${JSON.stringify(r.off)}`); if (r.empty) issues.push(`${tag} ${name}: empty view`);
  };
  for (const v of await p.evaluate(() => [...document.querySelectorAll('#nav button[data-v]')].map(b => b.dataset.v))) { await p.evaluate(v => go(v), v); await p.waitForTimeout(400); await check('tab ' + v); }
  await p.evaluate(() => startQuiz(examPool().slice(0, 3), 'Check', 'pass')); await p.waitForTimeout(300); await check('quiz');
  await p.reload(); await p.waitForTimeout(1500); info.push(`${tag} refresh mid-quiz -> ${await p.evaluate(() => CUR)}`);
  await p.evaluate(() => go('exam')); await p.waitForTimeout(400);
  const n25 = await p.$('#view [data-n="25"]'); if (n25) await n25.click(); const sx = await p.$('#startx'); if (sx) { await sx.click(); await p.waitForTimeout(500); }
  await p.evaluate(() => { if (EX && !EX.done) submitExam(); }); await p.waitForTimeout(800); await check('exam result');
  await p.reload(); await p.waitForTimeout(1500); info.push(`${tag} refresh on result -> ${await p.evaluate(() => CUR)} ${await p.evaluate(() => /Exam result/.test((document.querySelector('#view h2') || {}).textContent || ''))}`);
  await p.evaluate(() => go('weak')); await p.waitForTimeout(400); await check('weak');
  await p.evaluate(() => go('guide')); await p.waitForTimeout(400);
  for (const id of await p.evaluate(() => [...document.querySelectorAll('#view [data-gwopen]')].map(b => b.dataset.gwopen))) {
    await p.evaluate(id => { scrollToEl(document.getElementById(id)); document.querySelector(`[data-gwopen="${id}"]`).click(); gwPause(); }, id);
    try { await p.waitForFunction(id => { const q = document.querySelector(`.gwpanel[data-gwp="${id}"]`); const im = q && q.querySelector('.gwslide img'); return q && (!im || (im.complete && im.naturalWidth > 0)) && (im || q.querySelector('.gwslide table')); }, id, {timeout: 6000}); }
    catch (e) { issues.push(`${tag} walkthrough ${id}: panel, slide or table missing`); }
    await p.evaluate(id => gwClose(id), id);
  }
  await check('guide');
  await p.evaluate(() => go('readings')); await p.waitForTimeout(300); await p.goBack(); await p.waitForTimeout(400); info.push(`${tag} back from readings -> ${await p.evaluate(() => CUR)}`);
  await p.close();
}
console.log(info.join('\n')); console.log(issues.length ? 'ISSUES\n' + issues.join('\n') : 'no issues'); await b.close(); })();
