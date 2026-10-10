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
  // the flows below drive Exam 1 items, so study Exam 1 (its groups open); the group check covers both
  await page.evaluate(() => localStorage.setItem(COURSE.ns + ':exam', '1')); await page.reload();
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
  // a finished paper stays on its result page until "New exam"
  await page.click('nav button[data-v="exam"]');
  if (!/Exam result/.test(await page.textContent('#view'))) fail('returning to the exam tab after submitting did not show the result');
  await page.click('#newx'); await page.click('#startx');
  await page.click('nav button[data-v="data"]'); await page.fill('#prof', 'other'); await page.click('#setprof');
  await page.waitForTimeout(1500);
  await page.fill('#prof', 'default'); await page.click('#setprof');
  // explain-more link: jumps to a page section and the back button restores the question
  await page.click('nav button[data-v="quiz"]');
  { const o5 = await page.$('[data-o]'); if (o5) await o5.click(); const ck5 = await page.$('#check'); if (ck5) await ck5.click(); }
  const jl = await page.$('[data-jump]');
  if (!jl) fail('answered question shows no explain-more link');
  else {
    const qid = await page.evaluate(() => Q.cur.id);
    const target = (await jl.getAttribute('data-jump')).split(':')[1];
    await jl.click();
    if (!(await page.$('#' + target))) fail('explain-more anchor missing: ' + target);
    if (!(await page.$('#backbtn'))) fail('no back button after an explain-more jump');
    await page.click('#backbtn');
    if ((await page.evaluate(() => CUR)) !== 'quiz' || (await page.evaluate(() => Q.cur.id)) !== qid) fail('back button did not return to the same question');
  }
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
  // ---- regressions (engine review, 10/10) ----
  await page.setViewportSize({width: 1100, height: 800});
  await page.evaluate(() => { localStorage.setItem(COURSE.ns + ':exam', '1'); }); await page.reload();
  // a matching question does not inherit the previous matching question's choices
  const mt = await page.evaluate(() => {
    const ms = QUESTIONS.filter(q => q.type === 'match'); if (ms.length < 2) return 'skip';
    S.layout = 'one'; startQuiz(ms.slice(0, 2), 'match', 'pass');
    document.querySelectorAll('select[data-l]').forEach(s => { s.selectedIndex = 1; s.dispatchEvent(new Event('change')); });
    check(); finish(Q.ok ? 'sure' : 'wrong');
    return Q.mpick == null && ![...document.querySelectorAll('select[data-l]')].some(s => s.value);
  });
  if (mt === false) fail('a matching question started with the previous one\'s choices');
  // the question map's last-answer cache follows a profile switch with a log of the same length
  const lm = await page.evaluate(() => {
    const keep = S, q = QUESTIONS[0];
    S = normalize({q: {[q.id]: {n: 1, ok: 1}}, log: [{id: q.id, t: 1, ok: true}]}); const a = lastOutcome(q);
    S = normalize({q: {[q.id]: {n: 1, ok: 0}}, log: [{id: q.id, t: 1, ok: false}]}); const b = lastOutcome(q);
    S = keep; return a === 'right' && b === 'wrong';
  });
  if (!lm) fail('question map kept the last answers of another profile');
  // a bad import neither breaks the scheduler nor puts markup on the page
  const bi = await page.evaluate(() => {
    const keep = S; let err = '';
    S = normalize({q: {}, log: 'x', pace: 'zzz', exams: [{t: 1, n: 2, score: '<img id=pwn>'}, {t: 2, n: 4, score: 3}]});
    try { schedule(QUESTIONS[0].id, 'sure'); } catch (e) { err = e.message; }
    EX = null; go('exam'); const inj = !!document.getElementById('pwn'), n = S.exams.length;
    S = keep; return {err, inj, n};
  });
  if (bi.err || bi.inj || bi.n !== 1) fail('bad import: ' + JSON.stringify(bi));
  // opening a question from deep in a long page starts at the top
  await page.click('nav button[data-v="tell"]');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.evaluate(() => [...document.querySelectorAll('[data-q] a')].pop().click());
  if (await page.evaluate(() => scrollY) > 0) fail('a question opened from the Tell apart page kept the old scroll position');
  // a ladder chip works in a quiz while an exam waits in the background; the review's back button returns to the result
  await page.click('nav button[data-v="exam"]'); await page.click('#startx');
  const lad = await page.evaluate(() => {
    CUR = 'map';   // left the exam page (the exam is kept)
    const lq = QUESTIONS.find(q => q.ladder && !q.multi && !q.type && ladderQs(q.ladder).length > 1); if (!lq) return 'skip';
    startQuiz([lq], 'one', 'pass'); pick(Q.order[0]);
    document.querySelector('[data-climb]').click();
    return /^Ladder/.test(Q.label) && EX && !EX.done;
  });
  if (lad === false) fail('ladder chip ignored while an exam was kept in the background');
  await page.click('nav button[data-v="exam"]');
  const nv = await page.evaluate(() => { const k = EX.qs.findIndex(id => byId[id].multi); if (k >= 0) EX.ans[EX.qs[k]] = []; submitExam(); return k >= 0 ? byId[EX.qs[k]].stem : null; });
  if (nv) { const v = await page.evaluate(s => [...document.querySelectorAll('#view .card')].find(c => c.querySelector('.stem') && c.querySelector('.stem').textContent === s).querySelector('.verdict').textContent, nv); if (!/Not answered/.test(v)) fail('an emptied select-all was graded "' + v + '", not "Not answered"'); }
  await page.click('#view [data-jump]'); await page.click('#backbtn');
  if (!/Exam result/.test(await page.textContent('#view'))) fail('back from an exam-review link did not return to the result');
  // keyboard shortcuts work with focus on a tab (not only on the page)
  await page.evaluate(() => { endExam(); S.layout = 'one'; startQuiz(QUESTIONS.filter(q => !q.multi && !q.type).slice(0, 2), 'keys', 'pass'); document.querySelector('#nav button').focus(); });
  await page.keyboard.press('a');
  if (!(await page.evaluate(() => Q.answered))) fail('letter shortcut ignored while a tab had focus');
  // filter chips are buttons; pictures are attached after a page is built
  await page.click('nav button[data-v="topics"]');
  if (await page.$('span.chip[data-sk], span.chip[data-show], span.chip[data-mode], span.chip[data-n]')) fail('a filter chip is not a button');
  for (const v of ['guide', 'graphs']) { await page.click(`nav button[data-v="${v}"]`); if (await page.evaluate(() => document.querySelectorAll('#view img[data-img]:not([src])').length)) fail(v + ': a figure has no picture'); }
  // Exam 2: blueprint paper, "All" length, tiers, tell-apart drill and flashcards follow the exam studied
  await page.evaluate(() => { localStorage.setItem(COURSE.ns + ':exam', '2'); }); await page.reload();
  const e2 = await page.evaluate(() => {
    const ex = active(), bad = [];
    for (let i = 0; i < 40; i++) {
      const p = drawBlueprint(ex.blueprint);
      if (p.length !== ex.questions) bad.push('paper of ' + p.length);
      if (p.filter(q => q.multi).length !== ex.blueprint.sata) bad.push('select-all ' + p.filter(q => q.multi).length);
      if (p.some(q => q.lowYield || q.type || q.skill === 'term' || examOf(q) !== 2)) bad.push('ineligible question drawn');
      const ids = new Set(p.map(q => q.id)); if (ids.size !== p.length || p.some(q => q.dupOf && ids.has(q.dupOf))) bad.push('duplicate or dupOf pair');
    }
    // a topic with too few questions still gives a full paper
    const short = drawBlueprint({sata: ex.blueprint.sata, parts: [{key: 'none', name: 'none', n: 5, test: () => false}].concat(ex.blueprint.parts)});
    if (short.length !== ex.questions) bad.push('short topic left a paper of ' + short.length);
    go('exam'); const all = [...document.querySelectorAll('[data-n]')].pop(), n = +all.dataset.n;
    if (drawExam(n).length !== n) bad.push('"All ' + n + '" drew ' + drawExam(n).length);
    go('topics'); if (!document.querySelector('[data-tier]')) bad.push('no tier buttons');
    go('tell'); const tl = document.getElementById('tellq'); tl.click(); if (Q.list.some(q => examOf(q) !== 2)) bad.push('tell-apart drill mixes exams');
    TM.mode = 'flash'; TM.card = null; go('terms'); if (!TM.card || lecExam(TM.card.lecture) !== 2) bad.push('flashcard not from Exam 2');
    TM.mode = 'glossary';
    return [...new Set(bad)];
  });
  if (e2.length) fail('Exam 2: ' + e2.join('; '));
  // every Why? button on the Exam 2 reference fills its group's explanation box
  await page.click('nav button[data-v="ref"]');
  const xb = await page.evaluate(() => [...document.querySelectorAll('details[data-ex="2"] [data-xpick]')].filter(w => { w.click(); const o = document.querySelector(`[data-xout="${w.dataset.xpick.split(':')[0]}"]`); return !o || o.textContent.trim().length < 20; }).map(w => w.dataset.xpick));
  if (xb.length) fail('Why? buttons with no explanation: ' + xb.join(', '));
  // ---- regressions from the student audit (10/10) ----
  // B2: after a mouse click on Flag, letter keys and Enter still drive the quiz (and Enter does not unflag)
  await page.evaluate(() => { S.layout = 'one'; startQuiz(examPool().filter(q => !q.multi && !q.type).slice(0, 3), 'flag', 'pass'); });
  const fid = await page.evaluate(() => Q.cur.id);
  await page.click('.qcard [data-flag]'); await page.keyboard.press('a');
  if (!(await page.evaluate(() => Q.answered))) fail('letter key ignored after clicking Flag');
  await page.keyboard.press('Enter');
  const fl = await page.evaluate(id => ({moved: Q.cur.id !== id, flagged: isFlagged(id)}), fid);
  if (!fl.moved || !fl.flagged) fail('Enter after Flag: ' + JSON.stringify(fl));
  await page.evaluate(id => toggleFlag(id), fid);
  // B3: the "Studying for" chip of the exam already studied keeps the drill; the other exam's chip ends a drill of this exam
  await page.click('nav button[data-v="topics"]');
  const keepQ = await page.evaluate(() => { const q0 = Q; document.querySelector('[data-exsw="2"]').click(); const same = Q === q0; document.querySelector('[data-exsw="1"]').click(); const gone = Q === null; document.querySelector('[data-exsw="2"]').click(); return same && gone; });
  if (!keepQ) fail('Studying-for chip: drill kept/ended wrongly');
  // C12: the skill filter applies to "Study what is due"
  const sk = await page.evaluate(() => { document.querySelector('[data-sk="recall"]').click(); document.getElementById('due').click(); const ok = Q.list.every(q => q.skill === 'recall'); FILT.skill = 'all'; return ok; });
  if (!sk) fail('skill filter ignored by Study what is due');
  // C1: a map tile opens its question with a way back, and the finished one-question drill offers it too
  await page.click('nav button[data-v="map"]'); await page.click('details[open] .qt[data-q]');
  if (!/map/.test(await page.textContent('#backbtn').catch(() => ''))) fail('map tile question has no back button');
  { const o = await page.$('[data-o]'); if (o) await o.click(); const ck = await page.$('#check'); if (ck) await ck.click(); const c = await page.$('[data-c]'); if (c) await c.click(); }
  if (!(await page.$('#qback'))) fail('finished one-question drill offers no way back');
  await page.click('#qback'); if ((await page.evaluate(() => CUR)) !== 'map') fail('back from a map question did not reopen the map');
  // C5: Check on an untouched matching question records nothing
  const m5 = await page.evaluate(() => { const m = QUESTIONS.find(q => q.type === 'match'); if (!m) return true; startQuiz([m], 'm', 'pass'); const n = S.log.length; check(); return S.log.length === n && !Q.answered; });
  if (!m5) fail('empty matching Check was graded');
  // C13: "Build up: Tier 1 → 2" drills only up to Tier 2
  const c13 = await page.evaluate(() => { const q = QUESTIONS.find(x => x.ladder && x.level === 2 && ladderQs(x.ladder).some(y => y.level === 3)); if (!q) return true; climbLadder(q.ladder, 2); return Q.list.every(x => (x.level || 0) <= 2); });
  if (!c13) fail('Build up to Tier 2 included Tier 3');
  // C3: Weak spots shows only the exam studied
  const c3 = await page.evaluate(() => { const keep = S; S = normalize({q: {}, log: [{id: examPool()[0].id, t: Date.now(), ok: false, conf: 'wrong'}]}); localStorage.setItem(COURSE.ns + ':exam', '1'); go('weak'); const t = document.getElementById('view').textContent; localStorage.setItem(COURSE.ns + ':exam', '2'); S = keep; return /No Exam 1 answers yet/.test(t) && !/Retry the/.test(t); });
  if (!c3) fail('Weak spots for Exam 1 showed Exam 2 answers');
  // C9, C10: a group chip of the other exam opens that exam's section; search results name their exam
  const c9 = await page.evaluate(() => { TM.mode = 'glossary'; TM.q = ''; TM.order = 'group'; go('terms'); const g1 = TERMS.find(t => (lecExam(t.lecture) || 1) === 1).group; TM.group = g1; go('terms'); const open = document.querySelector('details.exgroup[data-ex="1"]').open; TM.group = 'all'; TM.q = 'receptor'; go('terms'); const lab = !!document.querySelector('.term .exlabel'); TM.q = ''; go('terms'); return open && lab; });
  if (!c9) fail('glossary: other exam group stayed closed or search cards carry no exam label');
  // C8: an Exam 2 tracing names tracing questions, not curve questions
  const c8 = await page.evaluate(() => { const g = GR.find(x => x.exam === 2); if (!g) return true; const q = graphQs(g).find(x => x.options && x.options.some(o => !o.correct && o.miss)); if (!q) return true; const wrong = q.options.findIndex(o => !o.correct && o.miss); const h = graphFeedback(q, {ok: false, picked: wrong}), skip = (h.match(/<div class="gskip">[\s\S]*?<\/div>/) || [''])[0]; return skip && !/curve/i.test(skip) && /tracing/.test(h); });
  if (!c8) fail('Exam 2 tracing feedback uses curve wording');
  // K2, K3: dates read "Oct 9, 2026"; tiers in order
  await page.click('nav button[data-v="data"]');
  if (/\b\d{4}-\d{2}-\d{2}\b/.test(await page.textContent('#view'))) fail('change log shows ISO dates');
  const k3 = await page.evaluate(() => { EX = {exam: 2, qs: examPool().filter(q => q.level && q.options && !q.type).slice(0, 30).concat(examPool().filter(q => !q.level && q.options && !q.type).slice(0, 2)).map(q => q.id), ans: {}, done: true, score: 0, i: 0}; CUR = 'exam'; examResult(); const h = [...document.querySelectorAll('h3')].find(x => x.textContent === 'By tier'); const rows = h ? [...h.nextElementSibling.querySelectorAll('tbody td:first-child')].map(td => td.textContent) : []; endExam(); return rows.join(','); });
  if (k3 && !/^(Tier 1,)?(Tier 2,)?(Tier 3,)?(No tier)?$/.test(k3)) fail('By tier rows out of order: ' + k3);
  // C7: the all-on-one-page exam keeps its clock bar in sight
  await page.click('nav button[data-v="topics"]'); await page.click('[data-layout="all"]');
  await page.click('nav button[data-v="exam"]'); await page.click('#startx');
  await page.evaluate(() => window.scrollTo(0, 3000));
  const c7 = await page.evaluate(() => { const r = document.querySelector('.xhead').getBoundingClientRect(); return r.top >= 0 && r.bottom < innerHeight; });
  if (!c7) fail('exam clock bar scrolled off screen');
  await page.evaluate(() => { endExam(); S.layout = 'one'; save(); }); await page.click('nav button[data-v="topics"]');
  // phone: compact header (C2), denser map (C15), read-strips fit (K10), a Why? card scrolls into view
  await page.setViewportSize({width: 375, height: 800});
  await page.click('nav button[data-v="topics"]');
  const hh = await page.evaluate(() => document.querySelector('header').getBoundingClientRect().height);
  if (hh > 110) fail('phone header is ' + Math.round(hh) + ' px tall');
  await page.click('nav button[data-v="map"]');
  const cols = await page.evaluate(() => getComputedStyle(document.querySelector('details[open] .qgrid')).gridTemplateColumns.split(' ').length);
  if (cols < 2) fail('question map shows one tile per row on a phone');
  await page.evaluate(() => { const b = document.createElement('div'); b.id = 'rs'; b.innerHTML = '<table class="readstrip"><tr><th>Receptor</th><th>Agonist</th><th>Antagonist</th><th>Where</th></tr><tr><td>muscarinic-M3-receptor-on-smooth-muscle</td><td>bethanechol-pilocarpine-carbachol</td><td>atropine-scopolamine-ipratropium</td><td>bladder-gut-bronchi-eye</td></tr></table>'; document.querySelector('.card').appendChild(b); });
  if (await page.evaluate(() => { const t = document.querySelector('#rs table'); return t.getBoundingClientRect().width > t.parentElement.getBoundingClientRect().width + 1; })) fail('read-strip table wider than its box on a phone');
  await page.click('nav button[data-v="ref"]');
  await page.evaluate(() => { const w = document.querySelector('details[open] [data-xpick]'); w.scrollIntoView(); w.click(); });
  await page.waitForTimeout(1200);
  const wy = await page.evaluate(() => { const w = document.querySelector('details[open] [data-xpick]'); const o = document.querySelector(`[data-xout="${w.dataset.xpick.split(':')[0]}"]`); return o.getBoundingClientRect().top - document.querySelector('header').getBoundingClientRect().height; });
  if (wy < -5 || wy > 160) fail('Why? card not scrolled into view (' + Math.round(wy) + ' px below the header)');
  await page.setViewportSize({width: 1100, height: 800});
  if (errors.length) fail('page errors: ' + errors.join(' | '));
  console.log(`answered ${answered} quiz items (${multiSeen} select-all), exam of ${total}`);
  console.log(`browser_test.js: ${process.exitCode ? 'FAILED' : 'passed'}`);
  await browser.close();
})().catch(e => { console.log('browser_test.js: FAILED', e.message); process.exit(1); });
