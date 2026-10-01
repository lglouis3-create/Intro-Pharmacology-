// Drives the built page in Chromium: every view, quiz answers (single and
// select-all), confidence buttons, a full exam, and a phone-width layout check.
// Run: NODE_PATH=$(npm root -g) node browser_test.js
const path = require('path'), fs = require('fs');
let chromium;
try { ({chromium} = require('playwright')); } catch (e) { console.log('browser_test.js: NOT RUN (playwright not found)'); process.exit(0); }
const course = fs.readFileSync(path.join(__dirname, 'course.js'), 'utf8');
const out = path.join(__dirname, '..', course.match(/output:\s*'([^']+)'/)[1]);
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('dialog', d => d.accept());
  await page.goto('file://' + out);
  const fail = m => { console.log('FAIL', m); process.exitCode = 1; };
  for (const v of ['topics', 'quiz', 'weak', 'exam', 'graphs', 'map', 'ref', 'tell', 'guide', 'data']) {
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
    if (isMulti) { multiSeen++; const opts = await page.$$('[data-o]'); if (opts.length) await opts[0].click(); else for (const sel of await page.$$('select[data-l]')) await sel.selectOption({index: 1}); await page.click('#check'); }
    else { const opts = await page.$$('[data-o]'); if (!opts.length) { fail('no options on quiz item'); break; } await opts[i % opts.length].click(); }
    const why = await page.$$('.why'); if (!why.length) fail('no explanations shown after answering');
    const c = await page.$$('[data-c]'); if (!c.length) { fail('no confidence/next buttons'); break; }
    await c[i % c.length].click(); answered++;
  }
  // keyboard: pick with a letter, continue with Enter
  const before = await page.textContent('#view');
  await page.keyboard.press('a');
  const ck2 = await page.$('#check'); if (ck2) await page.keyboard.press('Enter');
  if (!(await page.$$('.why')).length) fail('keyboard pick did not answer the question');
  await page.keyboard.press('Enter');
  if ((await page.textContent('#view')) === before) fail('Enter did not advance the quiz');
  // last-updated stamp present
  await page.click('nav button[data-v="topics"]');
  if (!/Last updated \w+ \d+, \d{4}/.test(await page.textContent('#view'))) fail('last-updated stamp missing');
  // terms: glossary renders figures, flashcard flips and grades, quiz starts
  await page.click('nav button[data-v="terms"]');
  if (!(await page.$$('.term')).length) fail('glossary shows no terms');
  if (!(await page.$$('figure.fig svg')).length) fail('glossary shows no figures');
  await page.click('[data-mode="flash"]'); await page.click('#fcshow');
  if (!(await page.$$('[data-fc]')).length) fail('flashcard did not flip'); await page.click('[data-fc="sure"]');
  if (!(await page.textContent('#view')).includes('1/')) fail('flashcard grade not recorded');
  await page.click('[data-mode="quiz"]'); await page.click('#tq');
  const topts = await page.$$('[data-o]'); if (!topts.length) fail('term quiz did not start'); await topts[0].click();
  if (!(await page.$$('[data-c]')).length) fail('term question did not grade');
  // reopening a topic after a miss does not start on the same question
  let rep = 0;
  for (let i = 0; i < 8; i++) {
    await page.click('nav button[data-v="topics"]'); await page.click('[data-topic="L02"]');
    const first = await page.evaluate(() => Q.cur.id);
    const wrong = await page.evaluate(() => Q.cur.options.findIndex(o => !o.correct));
    await page.click(`[data-o="${wrong}"]`); const ck3 = await page.$('#check'); if (ck3) await ck3.click();
    await (await page.$('[data-c]')).click();
    await page.click('nav button[data-v="topics"]'); await page.click('[data-topic="L02"]');
    if ((await page.evaluate(() => Q.cur.id)) === first) rep++;
  }
  if (rep) fail(`reopened topic repeated the last question ${rep} of 8 times`);
  // a question with its own graph shows it above the options
  const hasGraphQ = await page.evaluate(() => QUESTIONS.some(q => q.graph));
  if (hasGraphQ) {
    await page.evaluate(() => startQuiz(QUESTIONS.filter(q => q.graph), 'graph', 'pass'));
    if (!(await page.$('.stemfig svg'))) fail('graph question did not draw its plot in the stem');
  }
  // weak spots now populated
  await page.click('nav button[data-v="weak"]');
  if (!(await page.textContent('#view')).includes('By topic')) fail('weak spots did not populate');
  // exam: smallest length, answer all, submit
  await page.click('nav button[data-v="exam"]');
  await page.click('#startx');
  const total = await page.$$eval('.grid button', b => b.length);
  const nTerm = await page.evaluate(() => EX.qs.filter(id => byId[id].skill === 'term').length);
  if (nTerm > Math.round(total * 0.15) + 1) fail(`exam draws too many definition questions (${nTerm} of ${total})`);
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
  // question map: every pool question has a tile; answered ones are marked; a tile opens its question
  await page.click('nav button[data-v="map"]');
  const mp = await page.evaluate(() => ({tiles: document.querySelectorAll('.qt[data-q]').length, marked: document.querySelectorAll('.qt.right[data-q], .qt.wrong[data-q]').length, unseen: document.querySelectorAll('.qt.unseen[data-q]').length}));
  if (mp.tiles !== mp.marked + mp.unseen) fail('map tiles do not add up: ' + JSON.stringify(mp));
  if (mp.marked < 1) fail('map shows no answered questions after a quiz');
  await page.click('[data-show="wrong"]');
  if (await page.evaluate(() => document.querySelectorAll('.qt[data-q]:not(.wrong)').length)) fail('wrong filter shows other tiles');
  await page.click('[data-show="all"]');
  await page.click('.qt[data-q]');
  if (!(await page.$('.opt'))) fail('map tile did not open a question');
  // graphs: one card per registered figure; Drill opens a question on that figure with its image
  await page.click('nav button[data-v="graphs"]');
  const gc = await page.evaluate(() => ({cards: document.querySelectorAll('.gcard').length, reg: typeof GRAPHS === 'undefined' ? 0 : GRAPHS.length}));
  if (gc.reg && gc.cards !== gc.reg) fail('graphs cards do not match the registry: ' + JSON.stringify(gc));
  if (gc.reg) {
    await page.click('.gcard [data-g]');
    if (!(await page.$('.stemfig img'))) fail('graph drill did not open a question with its figure');
    await page.click('.opt'); const gck = await page.$('#check'); if (gck) await gck.click();
    if (!(await page.$('.gread'))) fail('graph drill answer shows no figure reading');
  }
  // flags and the all-on-one-page layout
  await page.click('nav button[data-v="quiz"]');
  await page.click('[data-flag]');
  if (!(await page.evaluate(() => Object.keys(S.flags).length))) fail('flag button did not flag the question');
  await page.click('nav button[data-v="topics"]');
  if (!(await page.$('#drillflag'))) fail('topics page shows no flagged drill after flagging');
  await page.click('[data-layout="all"]');
  await (await page.$$('[data-topic]'))[0].click();
  const nCards = await page.evaluate(() => document.querySelectorAll('.qcard').length);
  if (nCards < 2) fail('all-on-one-page drill shows ' + nCards + ' cards');
  const logBefore = await page.evaluate(() => S.log.length);
  await page.evaluate(() => { const c = [...document.querySelectorAll('.qcard')].find(x => !x.querySelector('[data-check]') && x.querySelector('[data-o]')); c.querySelector('[data-o]').click(); });
  if ((await page.evaluate(() => S.log.length)) !== logBefore + 1) fail('all-on-one-page answer was not recorded');
  await page.click('nav button[data-v="map"]'); await page.click('[data-show="flagged"]');
  if (!(await page.$('.qt.flagged'))) fail('question map flagged filter shows no flagged tile');
  await page.click('nav button[data-v="topics"]'); await page.click('[data-layout="one"]');
  // regressions: Enter on a finished pass records nothing; a flag on the exam result keeps the result; profile switch with an exam open throws nothing
  await page.click('nav button[data-v="map"]'); await page.click('.qt[data-q]');
  const o1 = await page.$('[data-o]'); if (o1) { await o1.click(); const ck4 = await page.$('#check'); if (ck4) await ck4.click(); }
  const c1 = await page.$('[data-c]'); if (c1) await c1.click();
  const logN = await page.evaluate(() => S.log.length);
  await page.keyboard.press('Enter'); await page.keyboard.press('Enter');
  if ((await page.evaluate(() => S.log.length)) !== logN) fail('Enter on the finished pass recorded an answer');
  await page.click('nav button[data-v="exam"]'); await page.click('[data-layout="all"]'); await page.click('#startx');
  await page.click('.qcard [data-o]'); await page.click('#submit');
  if (!/Exam result/.test(await page.textContent('#view'))) fail('exam all-on-one-page did not submit');
  await page.click('[data-flag]');
  if (!/Exam result/.test(await page.textContent('#view'))) fail('flag on the exam result replaced the result page');
  await page.click('nav button[data-v="topics"]'); await page.click('[data-layout="one"]');
  await page.click('nav button[data-v="exam"]'); await page.click('#startx');
  await page.click('nav button[data-v="data"]'); await page.fill('#prof', 'other'); await page.click('#setprof');
  await page.waitForTimeout(1500);
  await page.fill('#prof', 'default'); await page.click('#setprof');
  // theme control
  await page.selectOption('#theme', 'dark');
  if ((await page.getAttribute('html', 'data-theme')) !== 'dark') fail('theme select did not apply dark');
  await page.selectOption('#theme', 'system');
  if (await page.getAttribute('html', 'data-theme')) fail('system theme left data-theme set');
  // phone width: no horizontal scroll on any view
  await page.setViewportSize({width: 375, height: 800});
  for (const v of ['topics', 'ref', 'tell', 'exam', 'weak', 'map', 'graphs', 'data']) {
    await page.click(`nav button[data-v="${v}"]`);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (over > 1) fail(`horizontal scroll on ${v} at 375px (${over}px)`);
  }
  await page.click('nav button[data-v="tell"]');
  const stacked = await page.evaluate(() => { const td = document.querySelector('table.stack tbody td'); return td && getComputedStyle(td).display === 'block' && td.getAttribute('data-label'); });
  if (!stacked) fail('tables do not stack at phone width');
  if (errors.length) fail('page errors: ' + errors.join(' | '));
  console.log(`answered ${answered} quiz items (${multiSeen} select-all), exam of ${total}`);
  console.log(`browser_test.js: ${process.exitCode ? 'FAILED' : 'passed'}`);
  await browser.close();
})().catch(e => { console.log('browser_test.js: FAILED', e.message); process.exit(1); });
