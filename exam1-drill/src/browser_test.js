// Drives the built page in Chromium: every view, quiz answers (single and
// select-all), confidence buttons, a full exam, and a phone-width layout check.
// Run: NODE_PATH=$(npm root -g) node browser_test.js
const path = require('path'), fs = require('fs');
let chromium;
try { ({chromium} = require('playwright')); } catch (e) { console.log('browser_test.js: NOT RUN (playwright not found)'); process.exit(0); }
const course = fs.readFileSync(path.join(__dirname, 'course.js'), 'utf8');
const out = path.join(__dirname, '..', course.match(/output:\s*'([^']+)'/)[1]);
(async () => {
  const exe = fs.existsSync('/opt/pw-browsers/chromium') ? undefined : undefined;
  const browser = await chromium.launch(exe ? {executablePath: exe} : {});
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('dialog', d => d.accept());
  await page.goto('file://' + out);
  const fail = m => { console.log('FAIL', m); process.exitCode = 1; };
  for (const v of ['topics', 'quiz', 'weak', 'exam', 'ref', 'tell', 'guide', 'data']) {
    const b = await page.$(`nav button[data-v="${v}"]`);
    if (!b) { if (v !== 'guide') fail('no nav button ' + v); continue; }
    await b.click();
    const txt = await page.textContent('#view');
    if (!txt || txt.trim().length < 20) fail('view ' + v + ' rendered empty');
  }
  // quiz: answer 40 questions, alternating confidence
  await page.click('nav button[data-v="topics"]');
  await page.click('#due');
  let multiSeen = 0, answered = 0;
  for (let i = 0; i < 40; i++) {
    const isMulti = await page.$('#check');
    if (isMulti) { multiSeen++; const opts = await page.$$('[data-o]'); await opts[0].click(); await page.click('#check'); }
    else { const opts = await page.$$('[data-o]'); if (!opts.length) { fail('no options on quiz item'); break; } await opts[i % opts.length].click(); }
    const why = await page.$$('.why'); if (!why.length) fail('no explanations shown after answering');
    const c = await page.$$('[data-c]'); if (!c.length) { fail('no confidence/next buttons'); break; }
    await c[i % c.length].click(); answered++;
  }
  // weak spots now populated
  await page.click('nav button[data-v="weak"]');
  if (!(await page.textContent('#view')).includes('By topic')) fail('weak spots did not populate');
  // exam: smallest length, answer all, submit
  await page.click('nav button[data-v="exam"]');
  await page.click('#startx');
  const total = await page.$$eval('.grid button', b => b.length);
  for (let i = 0; i < total; i++) {
    const opts = await page.$$('[data-o]'); await opts[0].click();
    const nx = await page.$('#next:not([disabled])'); if (nx) await nx.click();
  }
  await page.click('#submit');
  const res = await page.textContent('#view');
  if (!/Exam result: \d+\/\d+/.test(res)) fail('exam result not shown');
  // persistence across reload
  await page.reload();
  await page.click('nav button[data-v="data"]');
  if (!/ answers /.test(await page.textContent('#view'))) fail('progress page missing counts');
  // phone width: no horizontal scroll on any view
  await page.setViewportSize({width: 375, height: 800});
  for (const v of ['topics', 'ref', 'tell', 'exam', 'weak']) {
    await page.click(`nav button[data-v="${v}"]`);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (over > 1) fail(`horizontal scroll on ${v} at 375px (${over}px)`);
  }
  if (errors.length) fail('page errors: ' + errors.join(' | '));
  console.log(`answered ${answered} quiz items (${multiSeen} select-all), exam of ${total}`);
  console.log(`browser_test.js: ${process.exitCode ? 'FAILED' : 'passed'}`);
  await browser.close();
})().catch(e => { console.log('browser_test.js: FAILED', e.message); process.exit(1); });
