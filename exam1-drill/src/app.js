/* ==========================================================================
   Drill engine. Course-agnostic: reads COURSE, TOPICS, QUESTIONS,
   REFERENCE_HTML, TELL_HTML, GUIDE_HTML.
   ========================================================================== */
'use strict';

const LETTERS = 'ABCDEFGHIJ';
const $ = sel => document.querySelector(sel);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const byId = {}; QUESTIONS.forEach(q => { byId[q.id] = q; });
const LECT = {}; COURSE.lectures.forEach(l => { LECT[l.id] = l; });
const SKILL = {}; COURSE.skills.forEach(s => { SKILL[s.id] = s; });
const TOPIC = {}; TOPICS.forEach(t => { TOPIC[t.id] = t; });
const lectureOf = q => LECT[q.lecture] || {};
/* Slide ranges are stored as "~7–~12" (every number marked approximate);
   print the mark once per range. */
const fmtCite = s => String(s == null ? '' : s).replace(/–~/g, '–');
const BUILD = typeof BUILD_INFO === 'undefined' ? {} : BUILD_INFO;
const fmtDate = iso => { const d = new Date(iso); return isNaN(d) ? '' : d.toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'}); };
function daysToExam() {
  const ex = COURSE.exams.find(e => e.id === COURSE.activeExam) || COURSE.exams[0];
  if (!ex || !ex.when) return null;
  const ms = new Date(ex.when) - Date.now();
  return Math.ceil(ms / (24 * 3600 * 1000));
}
function examCountdown() {
  const d = daysToExam();
  if (d == null) return '';
  if (d < 0) return 'Exam day has passed.';
  if (d === 0) return 'Exam day is today.';
  return `${d} day${d === 1 ? '' : 's'} until the exam.`;
}
/* On a phone a wide table becomes a stack of cards: each cell carries its
   column heading as a label (CSS shows it under 560px). */
function stackTables(root) {
  root.querySelectorAll('table').forEach(t => {
    const heads = [...t.querySelectorAll('thead th')].map(th => th.textContent.trim());
    if (!heads.length) return;
    t.classList.add('stack');
    t.querySelectorAll('tbody tr').forEach(tr => [...tr.children].forEach((td, i) => { if (heads[i]) td.setAttribute('data-label', heads[i]); }));
  });
}
const examOf = q => lectureOf(q).exam;

/* ---------- storage: localStorage with an in-memory fallback ---------- */
const MEM = {};
const store = {
  get(k) { try { const v = localStorage.getItem(k); return v == null ? (MEM[k] || null) : v; } catch (e) { return MEM[k] || null; } },
  set(k, v) { MEM[k] = v; try { localStorage.setItem(k, v); } catch (e) {} }
};
let PROFILE = store.get(COURSE.ns + ':profile') || 'default';
const KEY = () => COURSE.ns + ':p:' + PROFILE;
function loadState() {
  try { const s = JSON.parse(store.get(KEY()) || 'null'); if (s && s.q) return s; } catch (e) {}
  return {q: {}, log: [], pace: COURSE.paceDefault, exams: []};
}
let S = loadState();
const save = () => store.set(KEY(), JSON.stringify(S));
const qs = id => (S.q[id] = S.q[id] || {n: 0, ok: 0, box: 0, due: 0, last: 0});

/* ---------- scheduler ----------
   Leitner boxes. A wrong answer or "I guessed" resets the box and the item is
   due now; "Not sure" keeps the box; "Knew it" moves it up. The pace sets the
   interval each box waits. */
const MIN = 60000, HOUR = 60 * MIN, DAY = 24 * HOUR;
const PACES = {
  cram:     {label:'Cram (exam within days)', steps:[0, 10*MIN, HOUR, 6*HOUR, DAY, 2*DAY]},
  weekly:   {label:'Weekly (exam in 1–2 weeks)', steps:[0, 30*MIN, 6*HOUR, DAY, 3*DAY, 7*DAY]},
  semester: {label:'Semester (spread out)', steps:[0, HOUR, DAY, 3*DAY, 7*DAY, 21*DAY]}
};
function schedule(id, outcome) {
  const st = qs(id), steps = PACES[S.pace || COURSE.paceDefault].steps, now = Date.now();
  if (outcome === 'wrong' || outcome === 'guess') st.box = 0;
  else if (outcome === 'unsure') st.box = Math.max(1, st.box);
  else st.box = Math.min(steps.length - 1, st.box + 1);
  st.due = now + steps[st.box];
  st.last = now;
}

/* ---------- views ---------- */
const VIEWS = [
  ['topics', 'Topics'], ['quiz', 'Quiz'], ['terms', 'Terms'], ['weak', 'Weak spots'], ['exam', 'Exam sim'],
  ['ref', 'Reference'], ['tell', 'Tell apart'], ['guide', 'Guides'], ['data', 'Progress']
];
let CUR = 'topics';
function nav() {
  $('#nav').innerHTML = VIEWS.filter(([k]) => k !== 'guide' || (typeof GUIDE_HTML !== 'undefined' && GUIDE_HTML.trim()))
    .map(([k, l]) => `<button data-v="${k}" class="${k === CUR ? 'on' : ''}">${l}</button>`).join('');
  $('#nav').querySelectorAll('button').forEach(b => b.onclick = () => go(b.dataset.v));
}
function go(v) {
  if (CUR === 'exam' && EX && !EX.done && v !== 'exam' && !confirm('Leave the exam in progress? It will be kept until you return.')) return;
  CUR = v; nav(); window.scrollTo(0, 0);
  ({topics: vTopics, quiz: vQuiz, terms: vTerms, weak: vWeak, exam: vExam, ref: vRef, tell: vTell, guide: vGuide, data: vData})[v]();
}

/* Questions eligible for practice and for the active exam. */
const active = () => COURSE.exams.find(e => e.id === COURSE.activeExam) || COURSE.exams[0];
const inFilter = (q, f) => Object.keys(f).every(k => {
  const want = [].concat(f[k]);
  const have = k === 'exam' ? examOf(q) : k === 'lecture' ? q.lecture : q[k];
  return want.includes(have);
});
const examPool = () => QUESTIONS.filter(q => active().pools.some(p => inFilter(q, p.filter)));

function acc(list) {
  let n = 0, ok = 0; list.forEach(q => { const s = S.q[q.id]; if (s) { n += s.n; ok += s.ok; } });
  return {n, ok, pct: n ? Math.round(100 * ok / n) : null};
}
const seenCount = list => list.filter(q => S.q[q.id] && S.q[q.id].n).length;

/* ---------- Topics ---------- */
let FILT = {skill: 'all'};
function vTopics() {
  const ex = active(), pool = examPool();
  const seen = seenCount(pool), a = acc(pool);
  let h = `<h2>${esc(COURSE.short)}</h2>
  <p class="sub">${esc(ex.name)} · ${esc(ex.date)} · ${ex.minutes ? ex.minutes + ' minutes allotted' : ''}${ex.questions ? ' · ' + ex.questions + ' questions' : ''}. ${esc(ex.blurb)} <b>${esc(examCountdown())}</b></p>
  <p class="sub stamp">Last updated ${esc(fmtDate(BUILD.built))}${BUILD.changelog && BUILD.changelog.length ? ' — ' + esc(BUILD.changelog[0].items[0] || '') + ' <a href="#" id="whatsnew">What changed</a>' : ''}</p>
  <div class="card"><div class="row" style="justify-content:space-between">
   <div><b>${pool.length}</b> questions in the bank · <b>${seen}</b> seen · accuracy <b>${a.pct == null ? '—' : a.pct + '%'}</b></div>
   <div class="row"><button class="btn" id="due">Study what is due</button><button class="btn ghost" id="all">One pass, all questions</button></div></div>
   <div class="row" style="margin-top:10px"><span class="meta" style="margin:0">Skill:</span>
   ${['all'].concat(COURSE.skills.map(s => s.id)).filter(k => k === 'all' || pool.some(q => q.skill === k))
     .map(k => `<span class="chip ${FILT.skill === k ? 'on' : ''}" data-sk="${k}">${k === 'all' ? 'All' : esc(SKILL[k].short)}</span>`).join('')}</div></div>`;
  TOPICS.forEach(t => {
    const tq = pool.filter(q => q.topic === t.id && (FILT.skill === 'all' || q.skill === FILT.skill));
    if (!tq.length) return;
    const ta = acc(tq);
    const tseen = seenCount(tq);
    h += `<div class="card"><div class="topicrow"><span><b>${esc(t.name)}</b><small>${esc(fmtCite(t.cite))}</small>
      <span class="bar-meter seen"><span style="width:${Math.round(100 * tseen / tq.length)}%"></span></span></span>
      <span class="row"><small>${tseen}/${tq.length} seen · ${ta.pct == null ? '—' : ta.pct + '%'}</small>
      <button class="btn ghost" data-topic="${t.id}">Drill</button></span></div>`;
    (t.subs || []).forEach(s => {
      const sq = tq.filter(q => q.sub === s.id);
      if (!sq.length) return;
      const sa = acc(sq);
      const sseen = seenCount(sq);
      h += `<div class="topicrow"><span>${esc(s.name)}<small>${sq.length} questions · ${esc(fmtCite(s.cite))}</small>
        <span class="bar-meter seen"><span style="width:${Math.round(100 * sseen / sq.length)}%"></span></span></span>
        <span class="row"><small>${sseen}/${sq.length} seen · ${sa.pct == null ? '—' : sa.pct + '%'}</small><button class="btn ghost" data-topic="${t.id}" data-sub="${s.id}">Drill</button></span></div>`;
    });
    h += '</div>';
  });
  $('#view').innerHTML = h;
  $('#due').onclick = () => startQuiz(pool, 'Due and unseen', 'sr');
  const wn = $('#whatsnew'); if (wn) wn.onclick = e => { e.preventDefault(); go('data'); };
  $('#all').onclick = () => startQuiz(shuffle(pool), 'All questions, one pass', 'pass');
  document.querySelectorAll('[data-sk]').forEach(c => c.onclick = () => { FILT.skill = c.dataset.sk; vTopics(); });
  document.querySelectorAll('[data-topic]').forEach(b => b.onclick = () => {
    const list = pool.filter(q => q.topic === b.dataset.topic && (!b.dataset.sub || q.sub === b.dataset.sub) && (FILT.skill === 'all' || q.skill === FILT.skill));
    startQuiz(list, (TOPIC[b.dataset.topic] || {}).name, 'sr');
  });
}

/* ---------- Quiz ---------- */
let Q = null;
function startQuiz(list, label, mode) {
  if (!list.length) { alert('No questions match that selection.'); return; }
  Q = {list: list.slice(), label, mode, i: 0, done: 0, right: 0, retest: []};
  CUR = 'quiz'; nav(); nextQ();
}
/* Pick the next question. Pass mode walks the list once. SR mode takes a
   missed concept's sibling first (a different wording of the same idea), then
   what is due, then what is unseen, then the soonest due. */
function pickSR() {
  const now = Date.now(), list = Q.list, recent = Q.cur ? Q.cur.id : null;
  while (Q.retest.length) {
    const {concept, not} = Q.retest.shift();
    const sib = list.filter(q => q.concept === concept && q.id !== not && q.id !== recent);
    if (sib.length) return shuffle(sib)[0];
  }
  const due = list.filter(q => S.q[q.id] && S.q[q.id].n && S.q[q.id].due <= now && q.id !== recent);
  if (due.length) return due.sort((a, b) => S.q[a.id].box - S.q[b.id].box || S.q[a.id].due - S.q[b.id].due)[0];
  const unseen = list.filter(q => !(S.q[q.id] && S.q[q.id].n));
  if (unseen.length) return shuffle(unseen)[0];
  const rest = list.filter(q => q.id !== recent).sort((a, b) => S.q[a.id].due - S.q[b.id].due);
  return rest[0] || list[0];
}
function nextQ() {
  let q;
  if (Q.mode === 'pass') { if (Q.i >= Q.list.length) return quizDone(); q = Q.list[Q.i++]; }
  else q = pickSR();
  Q.cur = q; Q.order = q.type === 'match' ? null : shuffle(q.options.map((o, i) => i));
  Q.picked = q.multi ? new Set() : null; Q.answered = false; Q.t0 = Date.now();
  if (q.type === 'match') Q.rightOrder = shuffle(q.right.slice());
  renderQ();
}
function quizDone() {
  $('#view').innerHTML = `<div class="card"><h2>Pass finished</h2><p>${Q.right} of ${Q.done} correct.</p>
    <button class="btn" id="again">Study what is due</button></div>`;
  $('#again').onclick = () => startQuiz(examPool(), 'Due and unseen', 'sr');
}
function vQuiz() { if (!Q) return startQuiz(examPool(), 'Due and unseen', 'sr'); renderQ(); }

function teachHTML(t) {
  if (!t) return '';
  if (Array.isArray(t)) return t.map(s => `<h4>${esc(s.h)}</h4><div>${esc(s.t)}</div>`).join('');
  return esc(t);
}
/* Textbook notes: what the assigned reading says about the concept. */
function readingHTML(r) {
  if (!r) return '';
  const list = Array.isArray(r) ? r : [r];
  return `<div class="reading"><h4>From the textbook</h4>${list.map(x => `<div>${esc(x.t)}</div><div class="cite">${esc(x.src)}${x.sec ? ' — ' + esc(x.sec) : ''}</div>`).join('')}</div>`;
}
function metaLine(q) {
  const t = TOPIC[q.topic], sk = SKILL[q.skill];
  return `${esc(t ? t.name : q.topic)}${sk ? ' · ' + esc(sk.short) : ''}${q.multi ? ' · select all' : ''}`;
}
function renderQ() {
  const q = Q.cur, st = S.q[q.id];
  let h = `<div class="row" style="justify-content:space-between"><span class="meta">${esc(Q.label || '')} · ${Q.done} answered${Q.done ? ' · ' + Q.right + ' right' : ''}</span>
    <span class="meta">${st && st.n ? 'seen ' + st.n + '×' : 'new'}</span></div>
    <div class="card"><div class="meta">${metaLine(q)}</div><div class="stem">${esc(q.stem)}</div>`;
  if (q.type === 'match') {
    h += q.left.map((l, i) => `<div class="row" style="margin-bottom:8px"><span style="flex:1 1 200px">${esc(l)}</span>
      <select data-l="${i}" ${Q.answered ? 'disabled' : ''}><option value="">—</option>${Q.rightOrder.map(r => `<option ${Q.mpick && Q.mpick[i] === r ? 'selected' : ''}>${esc(r)}</option>`).join('')}</select>
      ${Q.answered ? (Q.mpick[i] === pairOf(q, l) ? '<b style="color:var(--ok)">✓</b>' : `<b style="color:var(--bad)">✗ ${esc(pairOf(q, l))}</b>`) : ''}</div>`).join('');
  } else {
    Q.order.forEach((oi, n) => {
      const o = q.options[oi];
      let cls = 'opt';
      const sel = q.multi ? Q.picked.has(oi) : Q.picked === oi;
      if (Q.answered) { if (o.correct) cls += ' right'; else if (sel) cls += ' wrong'; }
      else if (sel) cls += ' sel';
      h += `<button class="${cls}" data-o="${oi}" ${Q.answered ? 'disabled' : ''}><span class="k">${q.multi ? (sel ? '☑' : '☐') : LETTERS[n]}</span><span>${esc(o.t)}</span></button>`;
      if (Q.answered && o.why) h += `<div class="why">${esc(o.why)}</div>`;
    });
  }
  if (!Q.answered && (q.multi || q.type === 'match')) h += `<button class="btn" id="check">Check</button>`;
  if (Q.answered) {
    h += `<div class="verdict ${Q.ok ? 'ok' : 'bad'}">${Q.ok ? '✓ Correct' : '✗ Not correct'}</div>`;
    if (q.type === 'match' && q.pairs) h += q.pairs.filter(p => p.why).map(p => `<div class="why"><b>${esc(p.l)}</b>: ${esc(p.why)}</div>`).join('');
    if (q.teach) h += `<div class="teach">${teachHTML(q.teach)}</div>`;
    if (q.fg && typeof FIG === 'function') h += FIG(q.fg);
    if (q.note) h += `<div class="note">${esc(q.note)}</div>`;
    h += readingHTML(q.reading);
    if (q.quote) h += `<div class="quote">“${esc(q.quote)}”</div>`;
    h += `<div class="cite">${esc(fmtCite(q.cite))}</div>`;
    if (Q.ok) h += `<div class="row" style="margin-top:12px"><span class="meta" style="margin:0">How sure were you?</span>
      <button class="btn" data-c="sure">Knew it</button><button class="btn ghost" data-c="unsure">Not sure</button><button class="btn ghost" data-c="guess">I guessed</button></div>`;
    else h += `<div class="row" style="margin-top:12px"><button class="btn" data-c="wrong">Next</button></div>`;
  }
  h += `<div class="meta kbd">Keys: A–E or 1–5 pick an option · Enter checks or continues</div></div>`;
  $('#view').innerHTML = h;
  document.querySelectorAll('[data-o]').forEach(b => b.onclick = () => pick(+b.dataset.o));
  document.querySelectorAll('select[data-l]').forEach(s => s.onchange = () => { Q.mpick = Q.mpick || {}; Q.mpick[+s.dataset.l] = s.value; });
  const ck = $('#check'); if (ck) ck.onclick = check;
  document.querySelectorAll('[data-c]').forEach(b => b.onclick = () => finish(b.dataset.c));
}
const pairOf = (q, l) => (q.pairs.find(p => p.l === l) || {}).r;
function pick(oi) {
  const q = Q.cur; if (Q.answered) return;
  if (q.multi) { Q.picked.has(oi) ? Q.picked.delete(oi) : Q.picked.add(oi); renderQ(); return; }
  Q.picked = oi; check();
}
function gradeMulti(q, set) { return q.options.every((o, i) => !!o.correct === set.has(i)); }
function check() {
  const q = Q.cur;
  if (q.type === 'match') {
    Q.mpick = Q.mpick || {};
    Q.ok = q.left.every((l, i) => Q.mpick[i] === pairOf(q, l));
  } else if (q.multi) {
    if (!Q.picked.size) return;
    Q.ok = gradeMulti(q, Q.picked);
  } else Q.ok = q.options[Q.picked].correct;
  Q.answered = true;
  renderQ();
}
function finish(conf) {
  const q = Q.cur, st = qs(q.id);
  st.n++; if (Q.ok && conf !== 'guess') st.ok++;
  const picked = q.type === 'match' ? Q.mpick : q.multi ? [...Q.picked] : Q.picked;
  S.log.push({id: q.id, t: Date.now(), ok: Q.ok, conf, picked, ms: Date.now() - Q.t0});
  if (S.log.length > 5000) S.log = S.log.slice(-5000);
  schedule(q.id, Q.ok ? conf : 'wrong');
  if (!Q.ok || conf === 'guess') Q.retest.push({concept: q.concept, not: q.id});
  Q.done++; if (Q.ok) Q.right++;
  save(); nextQ();
}

/* ---------- Weak spots ---------- */
function vWeak() {
  const pool = examPool();
  if (!S.log.length) { $('#view').innerHTML = '<h2>Weak spots</h2><div class="empty">Answer some questions and this fills in by topic, by skill, and with the wrong options you keep choosing.</div>'; return; }
  const recent = {}; // last 3 answers per question
  S.log.forEach(e => { (recent[e.id] = recent[e.id] || []).push(e); });
  const score = q => { const r = (recent[q.id] || []).slice(-3); if (!r.length) return null; return r.filter(e => e.ok && e.conf !== 'guess').length / r.length; };
  const group = (keyFn, nameFn) => {
    const g = {};
    pool.forEach(q => { const k = keyFn(q); (g[k] = g[k] || []).push(q); });
    return Object.entries(g).map(([k, list]) => {
      const sc = list.map(score).filter(x => x != null);
      return {k, name: nameFn(k), n: list.length, seen: sc.length, pct: sc.length ? Math.round(100 * sc.reduce((a, b) => a + b, 0) / sc.length) : null,
        miss: list.filter(q => score(q) != null && score(q) < 1)};
    }).sort((a, b) => (a.pct == null ? 101 : a.pct) - (b.pct == null ? 101 : b.pct));
  };
  const table = (rows, title) => `<h3>${title}</h3><div class="card">${rows.map(r => `<div class="topicrow"><span>${esc(r.name)}<small>${r.seen}/${r.n} seen</small></span>
    <span class="row"><span class="bar-meter"><span style="width:${r.pct || 0}%"></span></span><small>${r.pct == null ? '—' : r.pct + '%'}</small>
    ${r.miss.length ? `<button class="btn ghost" data-miss="${esc(title)}|${esc(r.k)}">Drill ${r.miss.length} missed</button>` : ''}</span></div>`).join('')}</div>`;
  const byTopic = group(q => q.topic, k => (TOPIC[k] || {}).name || k);
  const bySkill = group(q => q.skill, k => (SKILL[k] || {}).label || k);
  const allMiss = pool.filter(q => score(q) != null && score(q) < 1);
  // confusions: wrong option picked vs right
  const conf = {};
  S.log.filter(e => !e.ok && byId[e.id] && typeof e.picked === 'number').forEach(e => {
    const q = byId[e.id], w = q.options[e.picked]; if (!w) return;
    const key = e.id + '|' + e.picked;
    conf[key] = conf[key] || {q, wrong: w.t, right: q.options.filter(o => o.correct).map(o => o.t).join(' · '), n: 0};
    conf[key].n++;
  });
  const confs = Object.values(conf).sort((a, b) => b.n - a.n).slice(0, 12);
  let h = `<h2>Weak spots</h2><p class="sub">Scored on the last three answers to each question; a correct answer marked "I guessed" counts as a miss.</p>
    <div class="card row" style="justify-content:space-between"><span><b>${allMiss.length}</b> questions not yet solid</span>
    <button class="btn" id="missall" ${allMiss.length ? '' : 'disabled'}>Drill all of them</button></div>`;
  h += table(byTopic, 'By topic') + table(bySkill, 'By skill');
  if (confs.length) h += `<h3>Wrong answers you chose</h3><div class="card tablewrap"><table><thead><tr><th>Question</th><th>You chose</th><th>Answer</th><th>×</th></tr></thead><tbody>
    ${confs.map(c => `<tr><td>${esc(c.q.stem.slice(0, 110))}${c.q.stem.length > 110 ? '…' : ''}</td><td>${esc(c.wrong)}</td><td>${esc(c.right)}</td><td>${c.n}</td></tr>`).join('')}</tbody></table></div>`;
  $('#view').innerHTML = h;
  $('#missall').onclick = () => startQuiz(allMiss, 'Weak spots', 'sr');
  document.querySelectorAll('[data-miss]').forEach(b => b.onclick = () => {
    const [t, k] = b.dataset.miss.split('|');
    const rows = t === 'By topic' ? byTopic : bySkill;
    const r = rows.find(x => x.k === k); if (r) startQuiz(r.miss, r.name, 'sr');
  });
}

/* ---------- Exam simulator ----------
   Draws to the pools in COURSE. When the paper length has not been announced
   the student picks a length; each pool then gets a share proportional to its
   marks, or to its size in the bank when marks are not set. lowYield items are
   left out, and dupOf keeps two wordings of one fact off one paper. */
let EX = null;
function drawExam(n) {
  const ex = active(), pools = ex.pools;
  // Definition questions are capped at 15% of the paper, whatever their share of the bank.
  const nTerm = Math.round(n * 0.15);
  const termPool = shuffle(QUESTIONS.filter(q => q.skill === 'term' && !q.lowYield && pools.some(p => inFilter(q, p.filter))));
  const termPick = []; const termSeen = new Set();
  for (const q of termPool) { if (termPick.length >= nTerm) break; if (termSeen.has(q.concept)) continue; termPick.push(q); termSeen.add(q.concept); }
  n -= termPick.length;
  const eligible = p => QUESTIONS.filter(q => inFilter(q, p.filter) && !q.lowYield && !q.type && q.skill !== 'term');
  const sizes = pools.map(p => p.marks || eligible(p).length);
  const tot = sizes.reduce((a, b) => a + b, 0);
  let want = sizes.map(s => Math.floor(n * s / tot));
  let short = n - want.reduce((a, b) => a + b, 0);
  for (let i = 0; short > 0; i = (i + 1) % pools.length) { want[i]++; short--; }
  const out = [], used = new Set(), concepts = new Set();
  pools.forEach((p, i) => {
    // spread across topics: shuffle, one per concept before repeats
    const list = shuffle(eligible(p)).sort((a, b) => (concepts.has(a.concept) ? 1 : 0) - (concepts.has(b.concept) ? 1 : 0));
    for (const q of list) {
      if (want[i] <= 0) break;
      if (used.has(q.id) || (q.dupOf && used.has(q.dupOf)) || [...used].some(u => byId[u].dupOf === q.id)) continue;
      if (concepts.has(q.concept) && list.some(o => !used.has(o.id) && !concepts.has(o.concept))) continue;
      out.push(q); used.add(q.id); concepts.add(q.concept); want[i]--;
    }
    for (const q of list) { if (want[i] <= 0) break; if (!used.has(q.id)) { out.push(q); used.add(q.id); want[i]--; } }
  });
  return shuffle(out.concat(termPick));
}
function vExam() {
  const ex = active(), max = examPool().filter(q => !q.lowYield && !q.type).length;
  if (EX && !EX.done) return renderExam();
  const lens = [...new Set([ex.questions, 25, 50, max].filter(x => x && x <= max))].sort((a, b) => a - b);
  let h = `<h2>Exam simulator</h2><p class="sub">${esc(ex.name)}: ${ex.questions ? ex.questions + ' questions' : 'question count not yet announced'}, ${ex.minutes} minutes allotted.
    Answers are not shown until you submit. Select-all items are scored all-or-nothing; definition questions make up at most 15% of the paper.</p>
    <div class="card"><div class="row"><span>Length:</span>${lens.map(n => `<span class="chip ${n === (ex.questions || lens[0]) ? 'on' : ''}" data-n="${n}">${n === max ? 'All ' + n : n}</span>`).join('')}</div>
    <div class="row" style="margin-top:10px"><label><input type="checkbox" id="scale" checked> Scale the clock to the length (${ex.minutes} min for the full paper)</label></div>
    <div class="row" style="margin-top:12px"><button class="btn" id="startx">Start</button></div></div>`;
  if (S.exams && S.exams.length) h += `<h3>Past attempts</h3><div class="card">${S.exams.slice(-8).reverse().map(e => `<div class="topicrow"><span>${new Date(e.t).toLocaleString()}</span><span>${e.score}/${e.n} (${Math.round(100 * e.score / e.n)}%)</span></div>`).join('')}</div>`;
  $('#view').innerHTML = h;
  let n = ex.questions || lens[0];
  document.querySelectorAll('[data-n]').forEach(c => c.onclick = () => { n = +c.dataset.n; document.querySelectorAll('[data-n]').forEach(x => x.classList.toggle('on', x === c)); });
  $('#startx').onclick = () => {
    const paper = drawExam(n);
    const full = ex.questions || max;
    const mins = $('#scale').checked ? Math.max(5, Math.round(ex.minutes * paper.length / full)) : ex.minutes;
    EX = {qs: paper.map(q => q.id), i: 0, ans: {}, flag: {}, orders: paper.map(q => shuffle(q.options.map((o, k) => k))), ends: Date.now() + mins * MIN, done: false};
    renderExam();
  };
}
let TICK = null;
function renderExam() {
  clearInterval(TICK);
  if (EX.done) return examResult();
  const q = byId[EX.qs[EX.i]], ord = EX.orders[EX.i], a = EX.ans[q.id];
  let h = `<div class="row" style="justify-content:space-between"><b>Question ${EX.i + 1} of ${EX.qs.length}</b><span class="timer" id="clock"></span></div>
    <div class="grid">${EX.qs.map((id, k) => `<button data-j="${k}" class="${EX.ans[id] != null && !(Array.isArray(EX.ans[id]) && !EX.ans[id].length) ? 'ans' : ''} ${k === EX.i ? 'cur' : ''} ${EX.flag[id] ? 'flag' : ''}">${k + 1}</button>`).join('')}</div>
    <div class="card"><div class="stem">${esc(q.stem)}</div>`;
  ord.forEach((oi, n) => {
    const sel = q.multi ? (a || []).includes(oi) : a === oi;
    h += `<button class="opt ${sel ? 'sel' : ''}" data-o="${oi}"><span class="k">${q.multi ? (sel ? '☑' : '☐') : LETTERS[n]}</span><span>${esc(q.options[oi].t)}</span></button>`;
  });
  h += `</div><div class="row"><button class="btn ghost" id="prev" ${EX.i ? '' : 'disabled'}>Previous</button>
    <button class="btn ghost" id="flag">${EX.flag[q.id] ? 'Unflag' : 'Flag'}</button>
    <button class="btn ghost" id="next" ${EX.i < EX.qs.length - 1 ? '' : 'disabled'}>Next</button>
    <button class="btn" id="submit">Submit exam</button></div>`;
  $('#view').innerHTML = h;
  document.querySelectorAll('[data-o]').forEach(b => b.onclick = () => {
    const oi = +b.dataset.o;
    if (q.multi) { const s = new Set(EX.ans[q.id] || []); s.has(oi) ? s.delete(oi) : s.add(oi); EX.ans[q.id] = [...s]; }
    else EX.ans[q.id] = oi;
    renderExam();
  });
  document.querySelectorAll('[data-j]').forEach(b => b.onclick = () => { EX.i = +b.dataset.j; renderExam(); });
  $('#prev').onclick = () => { EX.i--; renderExam(); };
  $('#next').onclick = () => { EX.i++; renderExam(); };
  $('#flag').onclick = () => { EX.flag[q.id] = !EX.flag[q.id]; renderExam(); };
  $('#submit').onclick = () => {
    const left = EX.qs.filter(id => EX.ans[id] == null || (Array.isArray(EX.ans[id]) && !EX.ans[id].length)).length;
    if (confirm(left ? `${left} unanswered. Submit anyway?` : 'Submit the exam?')) submitExam();
  };
  const tick = () => {
    const ms = EX.ends - Date.now(), el = $('#clock');
    if (ms <= 0) { clearInterval(TICK); submitExam(); return; }
    if (el) el.textContent = `${Math.floor(ms / HOUR)}:${String(Math.floor(ms % HOUR / MIN)).padStart(2, '0')}:${String(Math.floor(ms % MIN / 1000)).padStart(2, '0')} left`;
  };
  tick(); TICK = setInterval(tick, 1000);
}
const exRight = (q, a) => q.multi ? (Array.isArray(a) && gradeMulti(q, new Set(a))) : (a != null && q.options[a].correct);
function submitExam() {
  clearInterval(TICK);
  EX.done = true;
  let score = 0;
  EX.qs.forEach(id => {
    const q = byId[id], a = EX.ans[id], ok = exRight(q, a);
    if (ok) score++;
    const st = qs(id); st.n++; if (ok) st.ok++;
    S.log.push({id, t: Date.now(), ok, conf: 'exam', picked: a, ms: 0});
    schedule(id, ok ? 'unsure' : 'wrong');
  });
  S.exams = S.exams || []; S.exams.push({t: Date.now(), n: EX.qs.length, score});
  EX.score = score; save(); examResult();
}
function examResult() {
  const qsx = EX.qs.map(id => byId[id]);
  const by = (fn, nm) => { const g = {}; qsx.forEach(q => { const k = fn(q); g[k] = g[k] || {n: 0, ok: 0}; g[k].n++; if (exRight(q, EX.ans[q.id])) g[k].ok++; });
    return Object.entries(g).map(([k, v]) => `<tr><td>${esc(nm(k))}</td><td>${v.ok}/${v.n}</td><td>${Math.round(100 * v.ok / v.n)}%</td></tr>`).join(''); };
  let h = `<h2>Exam result: ${EX.score}/${EX.qs.length} (${Math.round(100 * EX.score / EX.qs.length)}%)</h2>
    <div class="row"><button class="btn" id="newx">New exam</button><button class="btn ghost" id="missx">Drill the ones I missed</button></div>
    <h3>By topic</h3><div class="tablewrap"><table><thead><tr><th>Topic</th><th>Right</th><th>%</th></tr></thead><tbody>${by(q => q.topic, k => (TOPIC[k] || {}).name || k)}</tbody></table></div>
    <h3>By skill</h3><div class="tablewrap"><table><thead><tr><th>Skill</th><th>Right</th><th>%</th></tr></thead><tbody>${by(q => q.skill, k => (SKILL[k] || {}).label || k)}</tbody></table></div>
    <h3>Review</h3>`;
  qsx.forEach((q, k) => {
    const a = EX.ans[q.id], ok = exRight(q, a), pickedSet = new Set([].concat(a == null ? [] : a));
    h += `<div class="card"><div class="meta">${k + 1}. ${metaLine(q)}</div><div class="stem">${esc(q.stem)}</div>
      <div class="verdict ${ok ? 'ok' : 'bad'}">${ok ? '✓ Correct' : a == null ? '✗ Not answered' : '✗ Not correct'}</div>`;
    if (!ok) {
      q.options.forEach((o, oi) => { if (o.correct || pickedSet.has(oi)) h += `<div class="opt ${o.correct ? 'right' : 'wrong'}" style="cursor:default"><span>${esc(o.t)}</span></div><div class="why">${esc(o.why || '')}</div>`; });
      if (q.teach) h += `<div class="teach">${teachHTML(q.teach)}</div>`;
      if (q.fg && typeof FIG === 'function') h += FIG(q.fg);
      if (q.note) h += `<div class="note">${esc(q.note)}</div>`;
      h += readingHTML(q.reading);
    }
    h += `<div class="cite">${esc(fmtCite(q.cite))}</div></div>`;
  });
  $('#view').innerHTML = h;
  $('#newx').onclick = () => { EX = null; vExam(); };
  $('#missx').onclick = () => { const m = qsx.filter(q => !exRight(q, EX.ans[q.id])); EX = null; startQuiz(m, 'Missed on the exam', 'sr'); };
}

/* ---------- Terms: glossary with figures, flashcards, generated questions ---------- */
let TM = {mode: 'glossary', group: 'all', card: null, shown: false};
const termList = () => (typeof TERMS === 'undefined' ? [] : TERMS).filter(t => TM.group === 'all' || t.group === TM.group);
const termKey = t => 'term:' + t.id;
function vTerms() {
  const all = typeof TERMS === 'undefined' ? [] : TERMS;
  if (!all.length) { $('#view').innerHTML = '<h2>Terms</h2><div class="empty">No glossary in this build.</div>'; return; }
  const groups = [...new Set(all.map(t => t.group))];
  const tq = QUESTIONS.filter(q => q.topic === 'TERMS');
  let h = `<h2>Terms</h2><p class="sub">${all.length} terms from the Day 1–3 lectures, each with its source. Figures show where a term is read off a curve or a diagram.</p>
  <div class="card"><div class="row">${[['glossary', 'Glossary'], ['flash', 'Flashcards'], ['quiz', 'Quiz me']].map(([k, l]) => `<span class="chip ${TM.mode === k ? 'on' : ''}" data-mode="${k}">${l}</span>`).join('')}
   <span class="meta" style="margin:0 0 0 12px">Group:</span>${['all'].concat(groups).map(g => `<span class="chip ${TM.group === g ? 'on' : ''}" data-group="${esc(g)}">${g === 'all' ? 'All' : esc(g)}</span>`).join('')}</div></div>`;
  const list = termList();
  if (TM.mode === 'glossary') {
    groups.filter(g => TM.group === 'all' || g === TM.group).forEach(g => {
      h += `<h3>${esc(g)}</h3><div class="card">` + all.filter(t => t.group === g).map(t => `<div class="term"><b>${esc(t.term)}</b><div>${esc(t.def)}</div>${t.hook ? `<div class="hook">${esc(t.hook)}</div>` : ''}${t.fig ? FIG(t.fig) : ''}<div class="cite">${esc(fmtCite(t.cite))}</div></div>`).join('') + '</div>';
    });
  } else if (TM.mode === 'flash') {
    if (!TM.card || !list.includes(TM.card)) {
      const now = Date.now();
      const due = list.filter(t => S.q[termKey(t)] && S.q[termKey(t)].due <= now);
      const unseen = list.filter(t => !S.q[termKey(t)]);
      TM.card = (due.length ? shuffle(due) : unseen.length ? shuffle(unseen) : shuffle(list))[0]; TM.shown = false;
    }
    const t = TM.card, st = S.q[termKey(t)];
    const seen = list.filter(x => S.q[termKey(x)]).length;
    h += `<div class="meta">${seen}/${list.length} cards seen · ${st ? 'seen ' + st.n + '×' : 'new'}</div><div class="card"><div class="flash"><div class="meta">${esc(t.group)}</div><div class="t">${esc(t.term)}</div>`;
    if (TM.shown) h += `<div style="text-align:left;margin-top:14px"><div>${esc(t.def)}</div>${t.hook ? `<div class="hook" style="color:var(--muted);margin-top:4px">${esc(t.hook)}</div>` : ''}${t.fig ? FIG(t.fig) : ''}<div class="cite">${esc(fmtCite(t.cite))}</div></div>
      <div class="row" style="justify-content:center;margin-top:14px"><button class="btn" data-fc="sure">Knew it</button><button class="btn ghost" data-fc="unsure">Not sure</button><button class="btn ghost" data-fc="wrong">Did not know</button></div>`;
    else h += `<div class="row" style="justify-content:center;margin-top:14px"><button class="btn" id="fcshow">Show definition</button></div>`;
    h += `</div></div>`;
  } else {
    const pool = tq.filter(q => TM.group === 'all' || (TOPIC.TERMS.subs.find(s => s.id === q.sub) || {}).name === TM.group);
    h += `<div class="card"><p>${pool.length} generated questions: pick the term for a definition, or the definition for a term. They count toward Weak spots under the skill "Terms".</p>
      <div class="row"><button class="btn" id="tq">Start</button></div></div>`;
  }
  $('#view').innerHTML = h;
  document.querySelectorAll('[data-mode]').forEach(c => c.onclick = () => { TM.mode = c.dataset.mode; vTerms(); });
  document.querySelectorAll('[data-group]').forEach(c => c.onclick = () => { TM.group = c.dataset.group; TM.card = null; vTerms(); });
  const sh = $('#fcshow'); if (sh) sh.onclick = () => { TM.shown = true; vTerms(); };
  document.querySelectorAll('[data-fc]').forEach(b => b.onclick = () => {
    const k = termKey(TM.card), st = qs(k), ok = b.dataset.fc !== 'wrong';
    st.n++; if (b.dataset.fc === 'sure') st.ok++;
    schedule(k, ok ? b.dataset.fc : 'wrong'); save();
    TM.card = null; vTerms();
  });
  const tqb = $('#tq'); if (tqb) tqb.onclick = () => {
    const pool = tq.filter(q => TM.group === 'all' || (TOPIC.TERMS.subs.find(s => s.id === q.sub) || {}).name === TM.group);
    startQuiz(pool, 'Terms', 'sr');
  };
}

/* ---------- static pages ---------- */
function vRef() { $('#view').innerHTML = `<div class="tablewrap">${REFERENCE_HTML}</div>`; stackTables($('#view')); }
function vTell() {
  $('#view').innerHTML = `<div class="tablewrap">${TELL_HTML}</div>
    <div class="row" style="margin-top:12px"><button class="btn" id="tellq">Drill every tell-apart question</button></div>`;
  const ids = [...document.querySelectorAll('[data-q]')].map(td => td.dataset.q).filter(id => byId[id]);
  document.querySelectorAll('[data-q]').forEach(td => {
    if (!byId[td.dataset.q]) return;
    td.innerHTML = `<a href="#" style="color:var(--accent)">Try it</a>`;
    td.onclick = e => { e.preventDefault(); startQuiz([byId[td.dataset.q]], 'Tell apart', 'pass'); };
  });
  $('#tellq').onclick = () => startQuiz(shuffle(ids.map(id => byId[id])), 'Tell apart', 'pass');
  stackTables($('#view'));
}
function vGuide() { $('#view').innerHTML = `<div class="tablewrap">${typeof GUIDE_HTML === 'undefined' ? '' : GUIDE_HTML}</div>`; }

/* ---------- Progress: profile, pace, export ---------- */
function download(name, text, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], {type}));
  a.download = name; document.body.appendChild(a); a.click(); a.remove();
}
function vData() {
  const pool = examPool(), a = acc(pool);
  let h = `<h2>Progress</h2>
  <div class="card"><div class="row"><span>Profile:</span><input type="text" id="prof" value="${esc(PROFILE)}" style="width:12em"><button class="btn ghost" id="setprof">Switch</button></div>
  <p class="sub" style="margin-top:8px">Progress is kept in this browser under the profile name. Two people on one device keep separate histories.</p></div>
  <div class="card"><div class="row"><span>Pace:</span><select id="pace">${Object.entries(PACES).map(([k, p]) => `<option value="${k}" ${k === (S.pace || COURSE.paceDefault) ? 'selected' : ''}>${esc(p.label)}</option>`).join('')}</select></div>
  <p class="sub" style="margin-top:8px">The pace and the confidence buttons set how soon a question returns: a wrong answer or "I guessed" brings it back at once, "Not sure" holds it at its current interval, "Knew it" lengthens the interval.</p></div>
  <div class="card"><p>${seenCount(pool)} of ${pool.length} seen · ${a.n} answers · accuracy ${a.pct == null ? '—' : a.pct + '%'}</p>
  <div class="row"><button class="btn ghost" id="exp">Export progress (JSON)</button>
  <label class="btn ghost">Import progress<input type="file" id="imp" accept=".json" style="display:none"></label>
  <button class="btn ghost" id="expmiss">Export missed questions (CSV)</button>
  <button class="btn ghost" id="reset">Reset this profile</button></div></div>
  <h3>Last updated</h3>
  <div class="card"><p style="margin:0 0 6px"><b>${esc(fmtDate(BUILD.built))}</b>${BUILD.commit ? ` · build ${esc(BUILD.commit)}` : ''} · ${QUESTIONS.length} questions · ${QUESTIONS.filter(q => q.reading).length} with textbook notes</p>
  ${(BUILD.changelog || []).map(c => `<h4 style="margin:10px 0 4px">${esc(c.date)}</h4><ul style="margin:0;padding-left:20px">${c.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`).join('')}</div>
  <p class="sub">${QUESTIONS.length} questions in the bank. Built from the course decks, lecture transcripts and the Exam 1 drug list; each question cites its deck and slide. Slide numbers marked ~ were counted from the deck text and may be off by one or two.</p>`;
  $('#view').innerHTML = h;
  $('#setprof').onclick = () => { const v = $('#prof').value.trim(); if (!v) return; PROFILE = v; store.set(COURSE.ns + ':profile', v); S = loadState(); Q = null; EX = null; vData(); };
  $('#pace').onchange = e => { S.pace = e.target.value; save(); };
  $('#exp').onclick = () => download(`${COURSE.ns}-${PROFILE}.json`, JSON.stringify(S), 'application/json');
  $('#imp').onchange = e => { const f = e.target.files[0]; if (!f) return; f.text().then(t => { try { const o = JSON.parse(t); if (!o.q) throw 0; S = o; save(); vData(); } catch (err) { alert('That file is not a progress export.'); } }); };
  $('#expmiss').onclick = () => {
    const rows = [['id', 'topic', 'skill', 'answers', 'correct', 'stem', 'answer', 'cite']];
    pool.filter(q => S.q[q.id] && S.q[q.id].n > S.q[q.id].ok).forEach(q => rows.push([q.id, (TOPIC[q.topic] || {}).name, q.skill, S.q[q.id].n, S.q[q.id].ok, q.stem,
      (q.options || []).filter(o => o.correct).map(o => o.t).join(' | '), q.cite]));
    download(`${COURSE.ns}-missed.csv`, rows.map(r => r.map(c => '"' + String(c == null ? '' : c).replace(/"/g, '""') + '"').join(',')).join('\n'), 'text/csv');
  };
  $('#reset').onclick = () => { if (confirm('Erase all progress for this profile?')) { S = {q: {}, log: [], pace: COURSE.paceDefault, exams: []}; save(); vData(); } };
}

document.addEventListener('keydown', e => {
  if (e.target && /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key;
  if (CUR === 'quiz' && Q && Q.cur && Q.cur.type !== 'match') {
    let n = -1;
    if (/^[1-9]$/.test(k)) n = +k - 1; else if (/^[a-jA-J]$/.test(k)) n = LETTERS.indexOf(k.toUpperCase());
    if (n >= 0 && !Q.answered) { const oi = Q.order[n]; if (oi != null) { pick(oi); e.preventDefault(); } return; }
    if (k === 'Enter') {
      e.preventDefault();
      if (!Q.answered) { if (Q.cur.multi) check(); }
      else finish(Q.ok ? 'sure' : 'wrong');
    }
  } else if (CUR === 'exam' && EX && !EX.done) {
    const q = byId[EX.qs[EX.i]], ord = EX.orders[EX.i];
    let n = -1;
    if (/^[1-9]$/.test(k)) n = +k - 1; else if (/^[a-jA-J]$/.test(k)) n = LETTERS.indexOf(k.toUpperCase());
    if (n >= 0 && ord[n] != null) { const b = document.querySelector(`[data-o="${ord[n]}"]`); if (b) b.click(); e.preventDefault(); return; }
    if (k === 'ArrowRight' || k === 'Enter') { if (EX.i < EX.qs.length - 1) { EX.i++; renderExam(); } e.preventDefault(); }
    if (k === 'ArrowLeft') { if (EX.i > 0) { EX.i--; renderExam(); } e.preventDefault(); }
  }
});
document.title = COURSE.title;
$('#apptitle').innerHTML = `${esc(COURSE.short)} <span class="stamp">updated ${esc(fmtDate(BUILD.built))}</span>`;
nav(); go('topics');
