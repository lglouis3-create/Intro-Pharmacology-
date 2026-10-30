// Drives the built page in Chromium: every view, quiz answers (single and
// select-all), confidence buttons, a full exam, and a phone-width layout check.
// Run: NODE_PATH=$(npm root -g) node browser_test.js
const path = require('path'), fs = require('fs');
let chromium;
try { ({chromium} = require('playwright')); } catch (e) { console.log('browser_test.js: NOT RUN (playwright not found)'); process.exit(0); }
const course = fs.readFileSync(path.join(__dirname, 'course.js'), 'utf8');
const out = path.join(__dirname, '..', course.match(/output:\s*'([^']+)'/)[1]);
(async () => {
  const browser = await chromium.launch({args: ['--autoplay-policy=no-user-gesture-required']});   // the scenes narration check plays audio
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  // a scene's narration clip does not exist yet: that one failed load is expected (the device voice takes over)
  page.on('console', m => { if (m.type() === 'error' && !/\/audio\/sc-[a-z]+-[a-z_]+\.mp3$/.test(((m.location && m.location()) || {}).url || '')) errors.push(m.text()); });
  page.on('dialog', d => d.accept());
  await page.goto('file://' + out);
  // the flows below drive Exam 1 items, so study Exam 1 (its groups open); the group check covers both
  // the flows below drive Exam 1 items: study Exam 1 with Smith focus off (focus is on by default and shows Exam 3 only)
  await page.evaluate(() => { localStorage.setItem(COURSE.ns + ':exam', '1'); localStorage.setItem(COURSE.ns + ':focus', '0'); }); await page.reload();
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
    await page.waitForTimeout(380);   // a tap within 350 ms of a new question is taken as the tail of a double tap
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
  // last-updated stamp present (in the header, once; the Topics page no longer repeats it)
  await page.click('nav button[data-v="topics"]');
  if (!/updated \w+ \d+, \d{4}/.test(await page.textContent('#apptitle'))) fail('last-updated stamp missing from the header');
  if (/Last updated/.test(await page.textContent('#view')) || (await page.$$('#view h2')).length) fail('Topics repeats the header title or stamp');
  // terms: glossary renders figures, flashcard flips and grades, quiz starts
  await page.click('nav button[data-v="terms"]');
  if (!(await page.$$('.term')).length) fail('glossary shows no terms');
  if (!(await page.$$('figure.fig svg')).length) fail('glossary shows no figures');
  await page.click('[data-mode="flash"]'); await page.click('#fcshow');
  if (!(await page.$$('[data-fc]')).length) fail('flashcard did not flip'); await page.click('[data-fc="sure"]');
  if (!(await page.textContent('#view')).includes('1/')) fail('flashcard grade not recorded');
  await page.click('[data-mode="quiz"]'); await page.click('#tq');
  await page.waitForTimeout(380);   // a tap within 350 ms of a new question is taken as the tail of a double tap
  const topts = await page.$$('[data-o]'); if (!topts.length) fail('term quiz did not start'); await topts[0].click();
  if (!(await page.$$('[data-c]')).length) fail('term question did not grade');
  // reopening a topic after a miss does not start on the same question
  let rep = 0;
  for (let i = 0; i < 8; i++) {
    await page.click('nav button[data-v="topics"]'); await page.click('[data-topic="L02"]');
    const first = await page.evaluate(() => Q.cur.id);
    const wrong = await page.evaluate(() => Q.cur.options.findIndex(o => !o.correct));
    await page.waitForTimeout(380);   // a tap within 350 ms of a new question is taken as the tail of a double tap
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
    await page.waitForTimeout(380);   // a tap within 350 ms of a new question is taken as the tail of a double tap
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
    await page.waitForTimeout(380); await page.click('.opt'); const gck = await page.$('#check'); if (gck) await gck.click();
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
  await page.waitForTimeout(380);   // a tap within 350 ms of a new question is taken as the tail of a double tap
  const o1 = await page.$('[data-o]'); if (o1) { await o1.click(); const ck4 = await page.$('#check'); if (ck4) await ck4.click(); }
  const c1 = await page.$('[data-c]'); if (c1) await c1.click();
  const logN = await page.evaluate(() => S.log.length);
  await page.keyboard.press('Enter'); await page.keyboard.press('Enter');
  if ((await page.evaluate(() => S.log.length)) !== logN) fail('Enter on the finished pass recorded an answer');
  // (the submitted paper above is kept across the reload, on its result page: start afresh)
  await page.click('nav button[data-v="exam"]'); { const nx0 = await page.$('#newx'); if (nx0) await nx0.click(); }
  await page.click('[data-layout="all"]'); await page.click('#startx');
  await page.waitForTimeout(380);   // a tap within 350 ms of a new question is taken as the tail of a double tap
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
  await page.waitForTimeout(380);   // a tap within 350 ms of a new question is taken as the tail of a double tap
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
  // step-throughs in the guide: six drawings, Next moves one step, the dots jump
  await page.click('nav button[data-v="guide"]');
  { const n = await page.evaluate(() => document.querySelectorAll('#view figure.step3').length); if (n < 6) fail('guide: ' + n + ' step-throughs (want 6)');
    const r = await page.evaluate(() => { const f = document.querySelector('#view figure.step3[data-s3="haplotype"]'); f.closest('details') && (f.closest('details').open = true); f.querySelector('[data-s3go="1"]').click();
      const g = document.querySelector('#view figure.step3[data-s3="haplotype"]'); const a = g.dataset.i; g.querySelector('[data-s3to="5"]').click();
      const h = document.querySelector('#view figure.step3[data-s3="haplotype"]'); return [a, h.dataset.i, !!h.querySelector('[data-s3go="1"]').disabled, h.querySelectorAll('.s3svg svg').length]; });
    if (r.join() !== '1,5,true,1') fail('step-through navigation: ' + r.join()); }
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
  await page.waitForTimeout(380);   // a tap within 350 ms of a new question is taken as the tail of a double tap
  { const o = await page.$('[data-o]'); if (o) await o.click(); const ck = await page.$('#check'); if (ck) await ck.click(); const c = await page.$('[data-c]'); if (c) await c.click(); }
  // a finished one-question drill opened from elsewhere returns there directly (its card already showed the verdict)
  await page.waitForTimeout(200); if ((await page.evaluate(() => CUR)) !== 'map') fail('finished one-question drill did not return to the map');
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
  // the glossary follows the exam studied: with Exam 2 active no Exam 1 term and no exam fold is on the page, in any order or a search
  const c9a = await page.evaluate(() => { TM.mode = 'glossary'; TM.scope = 'exam'; TM.group = 'all'; TM.q = ''; TM.order = 'group'; go('terms'); const ex1 = () => [...document.querySelectorAll('.term')].some(d => { const t = TERMS.find(x => 'term-' + x.id === d.id); return t && lecExam(t.lecture) === 1; }); const r1 = !ex1() && !document.querySelector('.exgroup') && document.querySelectorAll('.term').length === TERMS.filter(t => lecExam(t.lecture) === 2).length; TM.order = 'az'; go('terms'); const r2 = !ex1() && !document.querySelector('.term .exlabel'); TM.q = 'receptor'; go('terms'); const r3 = !ex1() && document.querySelectorAll('.term').length > 0; const chips = [...document.querySelectorAll('[data-group]')].map(c => c.dataset.group); const r4 = !chips.some(g => g !== 'all' && !TERMS.some(t => t.group === g && lecExam(t.lecture) === 2)); TM.q = ''; TM.order = 'group'; go('terms'); return r1 && r2 && r3 && r4; });
  if (!c9a) fail('glossary shows Exam 1 terms or groups while Exam 2 is studied');
  const c9 = await page.evaluate(() => { TM.mode = 'glossary'; TM.scope = 'both'; TM.q = ''; TM.order = 'group'; go('terms'); const g1 = TERMS.find(t => (lecExam(t.lecture) || 1) === 1).group; TM.group = g1; go('terms'); const open = document.querySelector('details.exgroup[data-ex="1"]').open; TM.group = 'all'; TM.q = 'receptor'; go('terms'); const lab = !!document.querySelector('.term .exlabel'); TM.q = ''; TM.scope = 'exam'; go('terms'); return open && lab; });
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
  // ---- regressions from the re-audit (10/10) ----
  // 1: "The idea" in the review plan never opens with the answer it sits under (a term's meaning, JP-019)
  const r1 = await page.evaluate(() => {
    const bad = QUESTIONS.filter(q => { const r = (q.options || []).filter(o => o.correct); if (r.length !== 1 || !q.teach) return false; const a = r[0].t.trim().replace(/[.!?]+$/, '').toLowerCase(); const i = planIdea(q).toLowerCase(); return a.length > 3 && i.startsWith(a) && /^([.!?:]|\s(is|was|binds|activates|blocks)\b|$)/.test(i.slice(a.length)); }).map(q => q.id);
    const tw = QUESTIONS.find(q => /^T-.*-2$/.test(q.id) && /Twins poll/.test(q.teach || ''));
    if (tw && !/^Twins poll/.test(planIdea(tw))) bad.push(tw.id + ' lost its second sentence');
    return bad;
  });
  if (r1.length) fail('review plan idea repeats the answer: ' + r1.slice(0, 5).join(', '));
  // 2: the session strip counts the exam studied only, and says that guesses are not counted
  const r2 = await page.evaluate(() => {
    const keep = S, e1 = QUESTIONS.find(q => examOf(q) === 1), e2 = QUESTIONS.filter(q => examOf(q) === 2).slice(0, 2), now = Date.now();
    S = normalize({q: {}, log: [{id: e1.id, t: now - 3000, ok: true, conf: 'sure'}, {id: e2[0].id, t: now - 2000, ok: true, conf: 'guess'}, {id: e2[1].id, t: now - 1000, ok: true, conf: 'sure'}]});
    store.set(EXAM_KEY, '2'); const t = document.createElement('div'); t.innerHTML = sessStrip(); S = keep; return t.textContent;
  });
  if (!/1\/2 solid/.test(r2) || !/guesses not counted/.test(r2) || !/1 right but guessed/.test(r2)) fail('session strip: ' + r2);
  // 6: the exam result page has the exam switch and the past attempts (dates as "Oct 10, 2026, 4:12 AM"); switching keeps the result
  const r6 = await page.evaluate(() => {
    const bad = [], keep = S.exams.slice(); store.set(EXAM_KEY, '2'); S.layout = 'one'; go('exam'); document.getElementById('startx').click(); submitExam();
    if (!document.querySelector('#view [data-exsw="1"]')) bad.push('no exam switch on the result');
    const past = document.getElementById('pastx'); if (!past) bad.push('no past attempts on the result');
    else if (!/^[A-Z][a-z]{2} \d{1,2}, \d{4}, \d{1,2}:\d{2}\s?[AP]M$/.test(past.querySelector('span').textContent.trim())) bad.push('past attempt date "' + past.querySelector('span').textContent + '"');
    document.querySelector('#view [data-exsw="1"]').click();
    if (!document.getElementById('startx') || !document.getElementById('keptres')) bad.push('switching exam from the result did not open the other start page with the kept result noted');
    document.querySelector('#view [data-exsw="2"]').click();
    if (!/Exam result/.test(document.querySelector('#view h2').textContent)) bad.push('switching back did not show the kept result');
    endExam(); S.exams = keep; save(); return bad;
  });
  if (r6.length) fail('exam result: ' + r6.join('; '));
  // 9: a section drill is labelled "Topic: section"; a Weak spots area drill has no "Guide:" prefix
  const r9 = await page.evaluate(() => {
    const bad = []; FILT.skill = 'all'; go('topics');
    const b = document.querySelector('details[open] [data-sub]'); b.click();
    const t = TOPIC[b.dataset.topic], sb = t.subs.find(x => x.id === b.dataset.sub);
    if (Q.label !== t.name + ': ' + sb.name) bad.push('section drill label "' + Q.label + '"');
    const keep = S; S = normalize({q: {}, log: examPool().filter(q => q.options && !q.type).slice(0, 20).map((q, i) => ({id: q.id, t: Date.now() - 1000 + i, ok: false, conf: 'wrong', picked: q.options.findIndex(o => !o.correct)}))});
    go('weak'); const a = document.querySelector('[data-practice]'); if (a) { a.click(); if (/^(Guide|Reference|Tell apart)\b/.test(Q.label)) bad.push('concept drill label "' + Q.label + '"'); } else bad.push('no concept drill');
    S = keep; Q = null; return bad;
  });
  if (r9.length) fail('drill labels: ' + r9.join('; '));
  // 10: the tier buttons follow the skill filter, with their counts
  const r10 = await page.evaluate(() => {
    const bad = []; store.set(EXAM_KEY, '2'); go('topics');
    for (const k of [...document.querySelectorAll('[data-sk]')].map(c => c.dataset.sk)) {
      FILT.skill = k; go('topics');
      for (const b of [...document.querySelectorAll('[data-tier]')]) { const n = +(b.textContent.match(/· (\d+) /) || [])[1]; b.click(); if (Q.list.length !== n || (k !== 'all' && Q.list.some(q => q.skill !== k))) bad.push(k + ' ' + b.textContent); go('topics'); }
    }
    FILT.skill = 'all'; Q = null; return bad;
  });
  if (r10.length) fail('tier buttons ignore the skill filter: ' + r10.slice(0, 3).join('; '));
  // ---- Weak spots: concept-level remediation (10/11) ----
  const wk = await page.evaluate(() => {
    const bad = [], keep = S, keepEx = store.get(EXAM_KEY), H = 3600e3, now = Date.now();
    store.set(EXAM_KEY, '2'); FILT.skill = 'all';
    const pool = examPool(), poolIds = new Set(pool.map(q => q.id));
    const plain = q => q.options && !q.type && !q.multi && poolIds.has(q.id);
    const cc = Object.keys(CQ).filter(c => CQ[c].length >= 2 && CQ[c].every(plain));
    const c1 = cc.find(c => CQ[c].some(q => q.ladder && ladderQs(q.ladder).some(y => (y.level || 0) > (q.level || 0)))) || cc[0];
    const [qa, qb] = CQ[c1], cOther = cc.find(c => c !== c1), qo = CQ[cOther][0];
    const wrongOf = q => q.options.findIndex(o => !o.correct), rightOf = q => q.options.findIndex(o => o.correct);
    const E = (q, t, ok, conf, picked) => ({id: q.id, t, ok, conf, picked: picked == null ? (ok ? rightOf(q) : wrongOf(q)) : picked, ms: 1});
    const render = () => { go('weak'); return document.getElementById('view'); };
    const stat = c => (S.c[c] || {}).s, card = (v, c) => v.querySelector(`.wcard[data-c="${c}"]`);
    try {
      // empty history
      S = normalize({q: {}, log: []}); let v = render();
      if (!/No Exam 2 answers yet/.test(v.textContent)) bad.push('empty history: ' + v.textContent.slice(0, 80));
      // one miss: unfamiliar, never "struggling"
      S = normalize({q: {}, log: [E(qa, now - 1000, false, 'wrong')]}); v = render();
      if (stat(c1) !== 'unfamiliar') bad.push('one miss → ' + stat(c1));
      let k = card(v, c1); if (!k || !/Unfamiliar/.test(k.textContent) || /Struggling/.test(k.textContent) || !/Seen once, missed once/.test(k.textContent)) bad.push('one-miss card');
      // one right answer never masters, and is not weak
      S = normalize({q: {}, log: [E(qa, now - 1000, true, 'sure')]}); v = render();
      if (stat(c1) !== 'learning' || card(v, c1)) bad.push('one right answer → ' + stat(c1) + (card(v, c1) ? ' with a card' : ''));
      // repeated misses, the same wrong option twice: struggling, the option and its why, exact counts; a one-miss concept sorts after it
      S = normalize({q: {}, log: [E(qa, now - 3 * H, false, 'wrong'), E(qb, now - 2 * H, false, 'wrong'), E(qo, now - 2000, false, 'wrong'), E(qa, now - 1000, false, 'wrong')]}); v = render();
      if (stat(c1) !== 'struggling') bad.push('three misses → ' + stat(c1));
      k = card(v, c1); const why = qa.options[wrongOf(qa)].why;
      if (!k) bad.push('no struggling card');
      else {
        if (!/You keep choosing \(2×\):/.test(k.textContent) || !k.textContent.includes(qa.options[wrongOf(qa)].t) || !k.textContent.includes(why)) bad.push('recurring wrong option or its why missing');
        if (!/Missed 3 of 3 · 2 questions · 0 retests passed · 3 sessions/.test(k.querySelector('.wreason').textContent)) bad.push('reason line: ' + k.querySelector('.wreason').textContent);
        if (!k.querySelector('.wmore .teach') && qa.teach) bad.push('no folded teach');
        if (!k.querySelector('[data-practice]') || !k.querySelector('[data-jump]')) bad.push('card lacks Practice or Read');
      }
      const order = [...v.querySelectorAll('.wcard')].map(x => x.dataset.c);
      if (order[0] !== c1 || order.indexOf(cOther) < 0) bad.push('sort order: ' + order.slice(0, 3).join(','));
      if (!/Struggling/.test(card(v, c1).textContent) || !/Unfamiliar/.test(card(v, cOther).textContent)) bad.push('chips');
      // partial credit on a select-all
      const qm = pool.find(q => q.multi && q.options.filter(o => o.correct).length >= 2), rights = qm.options.map((o, i) => o.correct ? i : -1).filter(i => i >= 0);
      S = normalize({q: {}, log: [E(qm, now - 1000, false, 'wrong', [rights[0], wrongOf(qm)])]}); v = render();
      k = card(v, conceptOf(qm)); if (!k || !k.textContent.includes(`Select all: 1 of ${rights.length} right, 1 wrong tick`)) bad.push('partial credit: ' + (k ? k.querySelector('.wclar').textContent.slice(0, 100) : 'no card'));
      // practice concept: a different wording first, then the summary, status improving
      S = normalize({q: {}, log: [E(qa, now - 2 * H, false, 'wrong'), E(qa, now - 1000, false, 'wrong')]}); v = render();
      card(v, c1).querySelector('[data-practice]').click();
      if (Q.mode !== 'concept' || Q.cur.id === qa.id || conceptOf(Q.cur) !== c1) bad.push('practice did not open another wording of the concept first (' + (Q.cur && Q.cur.id) + ')');
      pick(rightOf(Q.cur)); finish('sure');
      if (!Q.finished && Q.cur && conceptOf(Q.cur) === c1) { pick(rightOf(Q.cur)); finish('sure'); }   // a second wording, when the concept has one
      let guard = 0; while (!Q.finished && guard++ < 5) { const q = Q.cur; if (q.type === 'match') { Q.mpick = {}; q.left.forEach((l, i) => { Q.mpick[i] = pairOf(q, l); }); check(); } else if (q.multi) { Q.picked = new Set(q.options.map((o, i) => o.correct ? i : -1).filter(i => i >= 0)); check(); } else pick(rightOf(q)); finish('sure'); }
      const sum = document.getElementById('view').textContent;
      if (!Q.finished || !/Practice finished/.test(sum) || !sum.includes(conceptTitle(c1)) || !/now improving/.test(sum)) bad.push('practice summary: ' + sum.slice(0, 160));
      if (stat(c1) !== 'improving') bad.push('after practice → ' + stat(c1));
      // the same question is not served twice in a row within 10 minutes when another exists
      startConceptQuiz([c1], 't'); const first = Q.cur.id; pick(wrongOf(Q.cur)); finish('wrong');
      if (!Q.finished && Q.cur.id === first) bad.push('same question served twice in a row');
      // mastery: 3 solid on 2 questions across 2 sessions; a later miss → returning; the spaced check comes due
      S = normalize({q: {}, log: [E(qa, now - 8 * H, true, 'sure'), E(qb, now - 8 * H + 60e3, true, 'sure'), E(qa, now - 7 * H, true, 'unsure')]});
      if (S.c !== null) bad.push('normalize kept a missing S.c'); v = render();
      if (stat(c1) !== 'mastered' || !S.c[c1].m) bad.push('mastery → ' + stat(c1));
      if (card(v, c1)) bad.push('mastered concept shown as weak');
      if (!/Mastered \(1\)/.test(v.textContent)) bad.push('no folded mastered list');
      if (!/Due for spaced review \(1\)/.test(v.textContent)) bad.push('spaced check not due (due ' + new Date(conceptDue(c1)).toISOString() + ')');
      S = normalize({q: {}, log: [E(qa, now - 2 * H, true, 'sure'), E(qb, now - 2 * H + 60e3, true, 'sure'), E(qa, now - 1 * H, true, 'unsure')]}); v = render();
      if (stat(c1) !== 'mastered' || /Due for spaced review/.test(v.textContent)) bad.push('spaced check due too early');
      if (!/3 solid on 2 questions across 2 sessions/.test(v.textContent)) bad.push('mastered reason line');
      // the same answers in one session do not master
      S = normalize({q: {}, log: [E(qa, now - 3000, true, 'sure'), E(qb, now - 2000, true, 'sure'), E(qa, now - 1000, true, 'sure')]}); render();
      if (stat(c1) === 'mastered') bad.push('mastered within one session');
      // a missed spaced check → returning, back with the strugglers
      S = normalize({q: {}, log: [E(qa, now - 8 * H, true, 'sure'), E(qb, now - 8 * H + 60e3, true, 'sure'), E(qa, now - 7 * H, true, 'unsure')]}); v = render();
      document.getElementById('duecheck').click();
      if (Q.mode !== 'concept' || !Q.cq.check || conceptOf(Q.cur) !== c1) bad.push('spaced check did not open the concept');
      pick(wrongOf(Q.cur)); finish('wrong');
      if (!Q.finished || !/Spaced review finished/.test(document.getElementById('view').textContent)) bad.push('spaced check did not end with its summary');
      if (stat(c1) !== 'returning') bad.push('missed check → ' + stat(c1));
      v = render(); k = card(v, c1);
      if (!k || !/Returned/.test(k.textContent) || !/Was mastered, missed again/.test(k.textContent)) bad.push('returning card');
      // a log entry whose question is gone never crashes a view and is ignored
      S = normalize({q: {}, log: [E(qa, now - 1000, false, 'wrong'), {id: 'ghost-id', t: now - 500, ok: false, conf: 'wrong', picked: 0, ms: 1}]}); v = render();
      if (!card(v, c1) || Object.keys(S.c).length !== 1) bad.push('ghost log entry');
      // ID_ALIASES remaps an old id in the log, the record and the flags
      ID_ALIASES['old-id-x'] = qa.id;
      const t = normalize({q: {'old-id-x': {n: 1, ok: 0, box: 0, due: 0, last: 5}, [qa.id]: {n: 2, ok: 2, box: 1, due: 9, last: 3}}, log: [{id: 'old-id-x', t: 1, ok: false, conf: 'wrong'}], flags: {'old-id-x': 7}});
      delete ID_ALIASES['old-id-x'];
      if (t.q['old-id-x'] || t.q[qa.id].n !== 3 || t.q[qa.id].last !== 5 || t.log[0].id !== qa.id || t.flags[qa.id] !== 7) bad.push('ID_ALIASES: ' + JSON.stringify([t.q[qa.id], t.log[0].id, t.flags]));
      // export/import round trip keeps S.c; reload keeps it
      S = normalize({q: {}, log: [E(qa, now - 3 * H, false, 'wrong'), E(qb, now - 1000, false, 'wrong')]}); render();
      const back = normalize(JSON.parse(JSON.stringify(S)));
      if (JSON.stringify(back.c) !== JSON.stringify(S.c) || back.c[c1].s !== 'struggling') bad.push('export/import lost S.c');
      save();
    } catch (e) { bad.push('threw: ' + e.message); }
    return {bad, c1, keepEx};
  });
  if (wk.bad.length) fail('weak spots: ' + wk.bad.join('; '));
  await page.reload();
  const kept = await page.evaluate(c => S.c && S.c[c] && S.c[c].s, wk.c1);
  if (kept !== 'struggling') fail('reload lost the concept record (' + kept + ')');
  await page.setViewportSize({width: 375, height: 800});
  await page.click('nav button[data-v="weak"]');
  const wover = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (wover > 1) fail('horizontal scroll on Weak spots with concept cards at 375px (' + wover + 'px)');
  if (!(await page.$('.wcard'))) fail('no concept card at phone width');
  await page.setViewportSize({width: 1100, height: 800});
  await page.evaluate(ex => { S = normalize({q: {}, log: []}); save(); store.set(EXAM_KEY, ex || '2'); }, wk.keepEx);
  // ---- regressions from the independent audit (10/11) ----
  // 1: a paper in progress survives a reload: same questions, same answers, clock still counting; an expired one is submitted
  await page.click('nav button[data-v="topics"]'); await page.click('[data-layout="one"]');
  await page.click('nav button[data-v="exam"]'); await page.click('#startx');
  const px = await page.evaluate(() => { for (let k = 0; k < 3; k++) { EX.i = k; renderExam(); document.querySelector('[data-o]').click(); } return {qs: EX.qs.slice(), ans: Object.assign({}, EX.ans), ends: EX.ends, saved: !!localStorage.getItem(EXKEY())}; });
  if (!px.saved || Object.keys(px.ans).length !== 3) fail('exam not saved after answering: ' + JSON.stringify({saved: px.saved, n: Object.keys(px.ans).length}));
  await page.reload();
  const px2 = await page.evaluate(() => ({cur: CUR, qs: EX && EX.qs, ans: EX && EX.ans, ends: EX && EX.ends, clock: (document.getElementById('clock') || {}).textContent, ticking: TICK != null}));
  if (px2.cur !== 'exam' || JSON.stringify(px2.qs) !== JSON.stringify(px.qs) || JSON.stringify(px2.ans) !== JSON.stringify(px.ans) || px2.ends !== px.ends || !/left/.test(px2.clock || '') || !px2.ticking) fail('reload lost the exam: ' + JSON.stringify({cur: px2.cur, same: JSON.stringify(px2.qs) === JSON.stringify(px.qs), ans: px2.ans, clock: px2.clock}));
  await page.evaluate(() => { EX.ends = Date.now() - 1000; saveExam(); });
  await page.reload();
  if (!/Exam result: \d+\/\d+/.test(await page.textContent('#view'))) fail('an expired saved paper was not submitted on return');
  if (await page.evaluate(() => { const s = (S.exams || []).slice(-1)[0]; return !s || Date.now() - s.t > 10000; })) fail('the auto-submitted paper was not recorded');
  await page.click('#newx');
  if (await page.evaluate(() => !!localStorage.getItem(EXKEY()) || EX)) fail('New exam did not clear the saved paper');
  // 2: matching: the all-or-nothing note, "n of m pairs right" after a partial answer, Enter continues
  const mp2 = await page.evaluate(() => {
    const m = QUESTIONS.find(q => q.type === 'match' && q.left.length >= 2); if (!m) return 'skip';
    S.layout = 'one'; startQuiz([m, QUESTIONS[0]], 'match', 'pass');
    const note = /scored all-or-nothing/.test(document.querySelector('.qcard').textContent);
    Q.mpick = {}; m.left.forEach((l, i) => { Q.mpick[i] = i === 0 ? pairOf(m, l) : m.right.find(r => r !== pairOf(m, l)); });
    check(); const txt = document.querySelector('.verdict').textContent;
    return {note, verdict: txt, ok: Q.ok, answered: Q.answered};
  });
  if (mp2 !== 'skip') { if (!mp2.note || mp2.ok || !/1 of \d+ pairs right/.test(mp2.verdict)) fail('matching feedback: ' + JSON.stringify(mp2)); await page.keyboard.press('Enter'); if (await page.evaluate(() => Q.cur.type === 'match')) fail('Enter did not continue after a matching answer'); }
  // 3: after a write the browser refuses, store.get returns the value kept in memory, not the stale stored one
  const sg = await page.evaluate(() => { const k = COURSE.ns + ':probe'; localStorage.setItem(k, 'old'); const orig = Storage.prototype.setItem; Storage.prototype.setItem = function () { throw new Error('quota'); }; const ok = store.set(k, 'new'); const got = store.get(k); Storage.prototype.setItem = orig; const ok2 = store.set(k, 'new2'); const got2 = store.get(k); store.del(k); return {ok, got, ok2, got2, gone: store.get(k)}; });
  if (sg.ok || sg.got !== 'new' || !sg.ok2 || sg.got2 !== 'new2' || sg.gone !== null) fail('store.get after a failed write: ' + JSON.stringify(sg));
  // 4: an Exam 1 Why? card fills its explanation box
  await page.evaluate(() => { store.set(EXAM_KEY, '1'); go('ref'); });
  const w1 = await page.evaluate(() => { const w = document.querySelector('details[data-ex="1"] [data-xpick]'); if (!w) return 'none'; w.click(); const o = document.querySelector(`[data-xout="${w.dataset.xpick.split(':')[0]}"]`); return o ? o.textContent.trim().length : 0; });
  if (w1 === 'none' || w1 < 20) fail('Exam 1 Why? card empty (' + w1 + ')');
  // 5: an import with box 99 is clamped to the top box and still schedules
  const b99 = await page.evaluate(() => { const q = QUESTIONS[0]; const t = normalize({q: {[q.id]: {n: 1, ok: 1, box: 99, due: 0, last: 0}}, log: []}); const keep = S; S = t; let err = ''; try { schedule(q.id, 'sure'); } catch (e) { err = e.message; } const r = {box: S.q[q.id].box, due: S.q[q.id].due > Date.now(), err}; S = keep; return r; });
  if (b99.err || b99.box !== 5 || !b99.due) fail('box 99 import: ' + JSON.stringify(b99));
  // 6: the answer card: every option's why shows; the cite sits behind "More" (closed)
  const fold = await page.evaluate(() => {
    const q = examPool().find(x => x.options && !x.type && !x.multi && x.options.length >= 4 && x.options.every(o => o.why)); S.layout = 'one'; startQuiz([q], 'fold', 'pass');
    const wrong = q.options.findIndex(o => !o.correct); pick(wrong);
    const card = document.querySelector('.qcard'), more = card.querySelector('details.qmore');
    const visibleWhys = [...card.querySelectorAll(':scope > .why')].length, hiddenWhys = more ? more.querySelectorAll('.why').length : -1;
    const r = {visibleWhys, hiddenWhys, open: more && more.open, citeInMore: !!(more && more.querySelector('.cite')), citeOutside: !!card.querySelector(':scope > .cite'), explain: !!card.querySelector('[data-jump]'), teach: !!card.querySelector(':scope > .teach') || !q.teach};
    r.nopts = q.options.length; more.open = true; r.opens = more.querySelector('.cite').getBoundingClientRect().height > 0; return r;
  });
  if (fold.visibleWhys !== fold.nopts || fold.hiddenWhys !== 0 || fold.open || !fold.citeInMore || fold.citeOutside || !fold.explain || !fold.teach || !fold.opens) fail('folded answer card: ' + JSON.stringify(fold));
  // 7: flashcards: "Did not know" does not serve the same card straight back; the meta line counts due and new
  const fc = await page.evaluate(() => { TM.mode = 'flash'; TM.group = 'all'; TM.card = null; TM.last = null; go('terms'); let rep = 0; for (let i = 0; i < 6; i++) { const id = TM.card.id; document.getElementById('fcshow').click(); document.querySelector('[data-fc="wrong"]').click(); if (TM.card.id === id) rep++; } const meta = ([...document.querySelectorAll('#view .meta')].find(m => /cards seen/.test(m.textContent)) || {}).textContent || ''; TM.mode = 'glossary'; return {rep, meta}; });
  if (fc.rep || !/\d+ due · \d+ new/.test(fc.meta)) fail('flashcards: ' + JSON.stringify(fc));
  // 8: Topics first screen on a phone: What's new folded to one line, study buttons above the fold, no duplicate title
  await page.setViewportSize({width: 390, height: 844});
  await page.evaluate(() => { store.del(NEWS_KEY); go('topics'); });
  const tp = await page.evaluate(() => { const n = document.getElementById('news'), d = document.getElementById('due'); return {news: !!n, open: n && n.open, newsH: n ? Math.round(n.getBoundingClientRect().height) : 0, dueBottom: d ? Math.round(d.getBoundingClientRect().bottom) : 9999, h2: document.querySelectorAll('#view h2').length, hdr: Math.round(document.querySelector('header').getBoundingClientRect().height)}; });
  if (!tp.news || tp.open || tp.newsH > 70 || tp.dueBottom > 844 || tp.h2 || tp.hdr > 110) fail('Topics first screen at 390px: ' + JSON.stringify(tp));
  await page.setViewportSize({width: 1100, height: 800});
  // 9: the words read for a step are printed under its caption (Captions only: no sound), the transcript marks the
  // line, a figure without a script shows no line, and Off removes it
  const ns = await page.evaluate(() => {
    go('diagrams'); setNarr('cap'); const a = document.querySelector('[data-anim="e2-adrc"]'); if (!a) return {nofig: true};
    const fig = a.closest('figure'); openTo(fig); a.querySelector('[data-go="1"]').click();
    const i = [...fig.querySelectorAll('.st')].findIndex(s => s.classList.contains('on')), d = fig.querySelector('.nsaid');
    const r = {i, said: !!d && d.textContent === NARRATION['e2-adrc'].steps[i].text, li: [...fig.querySelectorAll('.ntr li.on')].map(l => +l.dataset.ni).join(), order: d && fig.querySelector('.stcap').getBoundingClientRect().bottom <= d.getBoundingClientRect().top + 1 && d.getBoundingClientRect().bottom <= a.getBoundingClientRect().top + 1, cur: !!NAR.cur};
    const b = [...document.querySelectorAll('[data-anim]')].find(x => !NARRATION[x.dataset.anim]); if (b) { openTo(b); b.querySelector('[data-go="1"]').click(); r.plain = !b.closest('figure').querySelector('.nsaid'); }
    setNarr('off'); r.off = !document.querySelector('.nsaid'); return r; });
  if (ns.nofig || !ns.said || ns.li !== String(ns.i) || !ns.order || ns.cur || ns.plain === false || !ns.off) fail('narration line under the caption: ' + JSON.stringify(ns));
  // 10: answered questions come weakest box first and in a different order each run; the one-page layout too
  const ro = await page.evaluate(() => {
    const pool = examPool().filter(q => !q.lowYield && !q.type).slice(0, 60), now = Date.now();
    const run = () => { startQuiz(pool, 't', 'sr'); const ids = [], boxes = []; for (let i = 0; i < 20 && Q.cur; i++) { ids.push(Q.cur.id); boxes.push(S.q[Q.cur.id].box); Q.doneIds.add(Q.cur.id); nextQ(); } return {ids, boxes}; };
    S = normalize({q: {}, log: []}); pool.forEach((q, i) => { S.q[q.id] = {n: 2, ok: 2, box: i < 10 ? 1 : 3, due: now + (i + 1) * 60000, last: now - 3600e3}; });
    const a = run(), b = run();
    const weakFirst = l => l.boxes.slice(0, 10).every(x => x === 1);
    const r = {ahead: a.ids.join() !== b.ids.join(), weakFirst: weakFirst(a) && weakFirst(b)};
    pool.forEach((q, i) => { S.q[q.id].due = now - (i + 1) * 1000; });
    startQuiz(pool, 't', 'sr'); const l1 = allList(); startQuiz(pool, 't', 'sr'); const l2 = allList();
    r.page = l1.map(q => q.id).join() !== l2.map(q => q.id).join() && l1.slice(0, 10).every(q => S.q[q.id].box === 1) && l2.slice(0, 10).every(q => S.q[q.id].box === 1);
    S = normalize({q: {}, log: []}); return r; });
  if (!ro.ahead || !ro.weakFirst || !ro.page) fail('drill order: ' + JSON.stringify(ro));
  // 11: Scenes: 15 scenes under the Exam 2 group with a cite each, the TOC chips and jump() land on a scene, a mode pick
  //     updates the title and steps, Play toggles, 390 px has no horizontal scroll, and with no clip the device voice reads
  //     the script while the clock runs once and holds at the end
  await page.click('nav button[data-v="scenes"]');
  const sc1 = await page.evaluate(() => { const secs = [...document.querySelectorAll('.sc-scene')]; const d = document.querySelector('details[data-ex="2"]'); return {n: secs.length, ids: secs.map(s => s.id), toc: document.querySelectorAll('[data-scgo]').length, inEx2: !!(d && d.querySelector('.sc-scene')), open: !!(d && d.open), canvases: document.querySelectorAll('.sc-cv').length, drawn: [...document.querySelectorAll('.sc-cv')].every(c => c.width > 0 && c.getBoundingClientRect().width > 100), cites: [...document.querySelectorAll('.sc-cite')].every(c => c.textContent.length > 20), chips: document.querySelectorAll('.sc-scene [data-nmode]').length, tiles: document.querySelectorAll('#sc-dumb .sc-org').length}; });
  if (sc1.n !== 15 || sc1.toc !== 15 || !sc1.inEx2 || !sc1.open || sc1.canvases !== 14 || !sc1.drawn || !sc1.cites || !sc1.ids.includes('sc-raas') || sc1.chips !== 45 || sc1.tiles !== 12) fail('scenes page: ' + JSON.stringify(sc1));
  await page.click('[data-scgo="raas"]'); await page.waitForTimeout(900);
  const sc2 = await page.evaluate(() => { const r = document.getElementById('sc-raas').getBoundingClientRect(); return {top: Math.round(r.top), active: SC_ACTIVE && SC_ACTIVE.s.key}; });
  if (sc2.top < -40 || sc2.top > 200 || sc2.active !== 'raas') fail('scenes TOC jump: ' + JSON.stringify(sc2));
  const sc3 = await page.evaluate(() => { const sec = document.getElementById('sc-raas'); const before = sec.querySelector('.sc-title').textContent; sec.querySelector('.sc-drug[data-mode="los"]').click(); const st = SC_ST.get('raas'); const r = {before, after: sec.querySelector('.sc-title').textContent, mk: st.mk, pressed: sec.querySelector('.sc-drug[aria-pressed="true"]').dataset.mode, steps: sec.querySelectorAll('.sc-steps li').length, lede: sec.querySelector('.sc-lede').textContent, tip: sec.querySelector('.sc-tip span').textContent, playing: st.playing, btn: sec.querySelector('.sc-play').textContent}; sec.querySelector('.sc-play').click(); r.paused = !st.playing; r.btn2 = sec.querySelector('.sc-play').textContent; sec.querySelector('.sc-play').click(); r.resumed = st.playing; return r; });
  if (sc3.before === sc3.after || sc3.mk !== 'los' || sc3.pressed !== 'los' || sc3.steps !== 4 || !/AT1/.test(sc3.lede) || !/valsartan/.test(sc3.tip) || !sc3.playing || sc3.btn !== 'Pause' || !sc3.paused || sc3.btn2 !== 'Play' || !sc3.resumed) fail('scenes mode pick / play: ' + JSON.stringify(sc3));
  const sc3b = await page.evaluate(async () => { const st = SC_ST.get('raas'); const a = st.t; await new Promise(r => setTimeout(r, 300)); return {moved: st.t !== a, loopOn: SC_RAF > 0}; });
  if (!sc3b.moved || !sc3b.loopOn) fail('scenes clock not running: ' + JSON.stringify(sc3b));
  await page.evaluate(() => { go('topics'); jump('scenes', 'sc-raas'); }); await page.waitForTimeout(400);
  const sc4 = await page.evaluate(() => ({cur: CUR, top: Math.round(document.getElementById('sc-raas').getBoundingClientRect().top), back: (document.getElementById('backbtn') || {}).textContent || ''}));
  if (sc4.cur !== 'scenes' || sc4.top > 200 || sc4.top < -40 || !/Back to/.test(sc4.back)) fail('jump to a scene: ' + JSON.stringify(sc4));
  await page.setViewportSize({width: 390, height: 844});
  await page.evaluate(() => { RET.length = 0; backBtn(); go('scenes'); }); await page.waitForTimeout(300);
  const sc5 = await page.evaluate(() => { const g = document.querySelector('.sc-grid'); const cols = getComputedStyle(g).gridTemplateColumns.split(' ').length; const wide = [...document.querySelectorAll('.sc-scene *')].filter(el => el.getBoundingClientRect().right > 391).length; return {over: document.documentElement.scrollWidth - window.innerWidth, cols, cvw: Math.round(document.querySelector('.sc-cv').getBoundingClientRect().width), wide}; });
  if (sc5.over > 1 || sc5.cols !== 1 || sc5.cvw > 390 || sc5.wide) fail('scenes at 390px: ' + JSON.stringify(sc5));
  await page.setViewportSize({width: 1100, height: 800});
  const sc6 = await page.evaluate(async () => {
    const spoken = [], utts = [];
    Object.defineProperty(window, 'speechSynthesis', {value: {speak: u => { spoken.push(u.text); utts.push(u); }, cancel: () => {}, pause: () => {}, resume: () => {}, getVoices: () => [], addEventListener: () => {}}, configurable: true});
    Object.defineProperty(window, 'SpeechSynthesisUtterance', {value: function (t) { this.text = t; }, configurable: true});
    // every mode has a clip now: block clip playback so the device-voice fallback is what runs
    const realPlay = HTMLMediaElement.prototype.play; HTMLMediaElement.prototype.play = function () { return Promise.reject(new Error('clip blocked')); };
    go('scenes'); setNarr('tap'); NAR.muted = false;
    const sec = document.getElementById('sc-gp'), st = SC_ST.get('gp'); sec.scrollIntoView(); await new Promise(r => setTimeout(r, 100));
    sec.querySelector('.sc-drug[data-mode="gs"]').click();
    const t0 = Date.now(); while (!(st.nar && st.nar.synth) && Date.now() - t0 < 5000) await new Promise(r => setTimeout(r, 50));
    const r = {fell: !!(st.nar && st.nar.synth), said: spoken.join(' '), nsaid: (sec.querySelector('.nsaid') || {}).textContent || '', once: st.once, playing: st.playing, speaking: sec.classList.contains('speaking'), active: SC_ACTIVE === st};
    const L = st.s.modes.gs.L; st.t = L - .05;
    await new Promise(r2 => setTimeout(r2, 250));
    r.held = Math.abs(st.t - L) < 1e-6 && !st.playing; r.stillNar = !!st.nar;
    utts.forEach(u => u.onend && u.onend());
    await new Promise(r2 => setTimeout(r2, 50));
    r.done = [...sec.querySelectorAll('.sc-steps li')].every(li => li.classList.contains('done')); r.narCleared = !st.nar; r.btn = sec.querySelector('.sc-play').textContent;
    r.tAfter = st.t; await new Promise(r2 => setTimeout(r2, 200)); r.tStill = st.t;
    setNarr('off'); r.offRemoves = !document.querySelector('.nsaid'); HTMLMediaElement.prototype.play = realPlay;
    return r; });
  const scriptGs = await page.evaluate(() => speakable(SC.SCENES.find(s => s.key === 'gp').modes.gs.script).replace(/\s+/g, ' '));
  if (!sc6.fell || sc6.said.replace(/\s+/g, ' ') !== scriptGs || sc6.nsaid !== (await page.evaluate(() => SC.SCENES.find(s => s.key === 'gp').modes.gs.script)) || !sc6.once || !sc6.speaking || !sc6.active || !sc6.held || !sc6.stillNar || !sc6.done || !sc6.narCleared || sc6.btn !== 'Play' || sc6.tAfter !== sc6.tStill || !sc6.offRemoves) fail('scenes narration fallback: ' + JSON.stringify(Object.assign({}, sc6, {said: sc6.said.slice(0, 80), nsaid: sc6.nsaid.slice(0, 40)})));
  await page.evaluate(() => { go('topics'); });
  if (await page.evaluate(() => SC_RAF !== 0 || SC_ST.size !== 0)) fail('leaving the scenes page did not stop its loop');

  // 12: the drug ↔ receptor drill: every table row has an answer line, five answers with the table's line among them,
  // a right and a wrong tap, the redo round, name-the-drug options
  const rx1 = await page.evaluate(async () => {
    localStorage.removeItem(COURSE.ns + ':rx'); localStorage.removeItem(COURSE.ns + ':rx:miss'); go('rxq'); await new Promise(r => setTimeout(r, 200));
    const rows = rxRows(), out = {rows: rows.length, empty: rows.filter(x => !rxRecText(x)).length, nav: !!document.querySelector('#nav [data-v="rxq"]')};
    const cur = () => RX.queue[RX.i];
    // every drug: five distinct answers, the table's own line among them, no "None" wording left in them
    out.fiveEach = rows.every(x => { const a = rxAnswers(x); return a.length === 5 && new Set(a).size === 5 && a.includes(rxSig(x)) && a.every(t => !/^None/.test(t)); });
    let r = cur(); const opts = [...document.querySelectorAll('[data-rxans]')];
    out.shown = opts.length === 5 && opts.some(o => o.dataset.rxans === rxSig(r)) && /Pick one/.test(document.querySelector('.rxq').textContent);
    opts.find(o => o.dataset.rxans === rxSig(r)).click();
    out.right = RX.result.ok && document.querySelector('.pfbr').classList.contains('ok') && document.querySelectorAll('.rxopt.ok').length === 1 && !!document.querySelector('.pfbr [data-jumpx], .pfbr [data-jump^="ref:"]');
    document.querySelector('#rxnext').click(); r = cur();
    [...document.querySelectorAll('[data-rxans]')].find(o => o.dataset.rxans !== rxSig(r)).click();
    out.wrong = !RX.result.ok && RX.redo.length === 1 && /You said/.test(document.querySelector('.pfbr').textContent) && document.querySelectorAll('.rxopt.bad').length === 1 && document.querySelectorAll('.rxopt.ok').length === 1 && /1 to redo/.test(document.querySelector('.meta').textContent);
    // the rest of the round right: the redo round holds the one miss and the best score is kept as JSON
    document.querySelector('#rxnext').click();
    for (;;) { const x = cur(); [...document.querySelectorAll('[data-rxans]')].find(o => o.dataset.rxans === rxSig(x)).click(); if (RX.i + 1 >= RX.queue.length) break; document.querySelector('#rxnext').click(); }
    out.endLabel = document.querySelector('#rxnext').textContent; document.querySelector('#rxnext').click();
    out.redo = RX.round === 2 && RX.queue.length === 1 && storeObj(COURSE.ns + ':rx').rec === `${rows.length - 1}/${rows.length}` && localStorage.getItem(COURSE.ns + ':rx:miss') === RX.queue[0].id;
    // name the drug: four options, the right one among them, none of the others with the same receptor-plus-action
    document.querySelector('[data-rxmode="drug"]').click(); await new Promise(r => setTimeout(r, 100));
    const x = cur(), dopts = [...document.querySelectorAll('.rxopt')], sig = y => rxLabel(rxKey(y)[0], rxKey(y)[2]);
    out.drug = dopts.length === 4 && dopts.some(o => o.dataset.rxpick === x.id) && RX.opts.filter(o => o.id !== x.id).every(o => sig(o) !== sig(x)) && /Which drug is:/.test(document.querySelector('.rxq').textContent);
    dopts.find(o => o.dataset.rxpick !== x.id).click(); out.drugWrong = !RX.result.ok && document.querySelectorAll('.rxopt.ok').length === 1 && document.querySelectorAll('.rxopt.bad').length === 1;
    document.querySelector('#rxnext').click(); const y = cur(); [...document.querySelectorAll('.rxopt')].find(o => o.dataset.rxpick === y.id).click(); out.drugRight = RX.result.ok;
    localStorage.removeItem(COURSE.ns + ':rx'); localStorage.removeItem(COURSE.ns + ':rx:miss'); return out; });
  if (rx1.empty || rx1.rows < 30 || !rx1.nav || !rx1.fiveEach || !rx1.shown || !rx1.right || !rx1.wrong || !/Redo the 1 missed/.test(rx1.endLabel) || !rx1.redo || !rx1.drug || !rx1.drugWrong || !rx1.drugRight) fail('drug-receptor drill: ' + JSON.stringify(rx1));
  // Pair up's best score survives a reload (it is kept as JSON)
  const pr1 = await page.evaluate(() => { store.set(COURSE.ns + ':pair', JSON.stringify({rec: '3/7'})); return storeObj(COURSE.ns + ':pair').rec; });
  if (pr1 !== '3/7') fail('pair best score as JSON: ' + pr1);
  await page.evaluate(ex => { S = normalize({q: {}, log: []}); save(); store.set(EXAM_KEY, ex || '2'); endExam(); }, wk.keepEx);
  if (errors.length) fail('page errors: ' + errors.join(' | '));
  console.log(`answered ${answered} quiz items (${multiSeen} select-all), exam of ${total}`);
  console.log(`browser_test.js: ${process.exitCode ? 'FAILED' : 'passed'}`);
  await browser.close();
})().catch(e => { console.log('browser_test.js: FAILED', e.message); process.exit(1); });
