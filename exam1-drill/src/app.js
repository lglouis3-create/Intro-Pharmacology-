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
/* Options that name curves (A, B, C, D, None of the above) or True/False keep
   their written order; shuffling them would put "C" under the letter B. */
const fixedOrder = q => !q.multi && (q.options || []).every(o => /^((Drug|Curve|DRC) )?[A-E]$|^None of the above$|^All of the above$|^True$|^False$/i.test(o.t.trim()));
const optOrder = q => fixedOrder(q) ? q.options.map((o, i) => i) : shuffle(q.options.map((o, i) => i));
/* What a question shows above its options: its own drawn graph, or one of
   the professor's poll figures (a data URL in IMAGES, answer marks cropped off). */
const IMG = typeof IMAGES === 'undefined' ? {} : IMAGES;
function stemMedia(q) {
  let h = '';
  if (q.img && IMG[q.img]) h += `<figure class="fig stemfig"><img src="${IMG[q.img]}" alt="${esc(q.imgAlt || 'figure')}">${q.imgCap ? `<figcaption>${esc(q.imgCap)}</figcaption>` : ''}</figure>`;
  if (q.graph) h += [].concat(q.graph).map(g => `<div class="stemfig">${FIG.graph(g)}</div>`).join('');
  return h;
}
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
/* Theme: 'system' follows the device setting; 'light' or 'dark' overrides it
   through the data-theme attribute the stylesheet reads. */
const THEMES = [['system', 'System'], ['light', 'Light'], ['dark', 'Dark']];
function applyTheme(v) {
  if (v === 'light' || v === 'dark') document.documentElement.setAttribute('data-theme', v);
  else document.documentElement.removeAttribute('data-theme');
  store.set(COURSE.ns + ':theme', v);
}
const themeSelect = () => `<select id="theme" title="Theme" aria-label="Theme">${THEMES.map(([k, l]) => `<option value="${k}" ${k === (store.get(COURSE.ns + ':theme') || 'system') ? 'selected' : ''}>${l}</option>`).join('')}</select>`;
applyTheme(store.get(COURSE.ns + ':theme') || 'system');
const KEY = () => COURSE.ns + ':p:' + PROFILE;
const normalize = s => { s.q = s.q || {}; s.log = s.log || []; s.pace = s.pace || COURSE.paceDefault; s.exams = s.exams || []; s.flags = s.flags || {}; s.layout = s.layout === 'all' ? 'all' : 'one'; return s; };
function loadState() {
  try { const s = JSON.parse(store.get(KEY()) || 'null'); if (s && s.q) return normalize(s); } catch (e) {}
  return normalize({});
}
let S = loadState();
/* Flags: the student marks any question to come back to; the set is a drill of its own. */
const isFlagged = id => !!(S.flags && S.flags[id]);
function toggleFlag(id) { S.flags = S.flags || {}; if (S.flags[id]) delete S.flags[id]; else S.flags[id] = Date.now(); save(); }
const flagBtn = id => `<button type="button" class="btn ghost flagb ${isFlagged(id) ? 'on' : ''}" aria-pressed="${isFlagged(id)}" data-flag="${id}" title="Flag this question to come back to it">⚑ ${isFlagged(id) ? 'Flagged' : 'Flag'}</button>`;
const flaggedPool = () => examPool().filter(q => isFlagged(q.id));
/* Layout: one question at a time, or every question of the drill on one page. */
const layoutToggle = () => `<span class="row layoutsel" style="gap:4px">${[['one', 'One at a time'], ['all', 'All on one page']].map(([k, l]) => `<button type="button" class="chip ${S.layout === k ? 'on' : ''}" aria-pressed="${S.layout === k}" data-layout="${k}">${l}</button>`).join('')}</span>`;
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
  ['graphs', 'Graphs'], ['diagrams', 'Diagrams'], ['map', 'Question map'], ['ref', 'Reference'], ['tell', 'Tell apart'], ['guide', 'Guides'], ['data', 'Progress']
];
let CUR = 'topics';
function nav() {
  $('#nav').innerHTML = VIEWS.filter(([k]) => k !== 'guide' || (typeof GUIDE_HTML !== 'undefined' && GUIDE_HTML.trim()))
    .map(([k, l]) => `<button data-v="${k}" class="${k === CUR ? 'on' : ''}">${l}</button>`).join('') + themeSelect();
  $('#nav').querySelectorAll('button').forEach(b => b.onclick = () => { RET.length = 0; backBtn(); go(b.dataset.v); });
  $('#theme').onchange = e => applyTheme(e.target.value);
}
const clearView = () => { const v = $('#view'); v.onclick = null; v.onchange = null; };
function go(v) {
  if (CUR === 'exam' && EX && !EX.done && v !== 'exam' && !confirm('Leave the exam in progress? It will be kept until you return.')) return;
  CUR = v; nav(); window.scrollTo(0, 0); clearView();
  VIEWFN[v]();
}
/* "Explain more": a question links to the pages that teach its concept. The link
   keeps the quiz or exam exactly where it was and a floating button brings the
   student back to it, scroll position included. */
const RET = [];
const LINKS = [
  [/fa-plus|competitive|inverse|irreversible|allosteric|shift|three-questions|five-drug|drug-x|rule-out|pindolol|partial|classif|baseline|symmetr|antagonist-syn|intrinsic|negative-efficacy|two-state|neutral|classes/, [['guide', 'guide-10', 'Guide 10: how to read a curve'], ['tell', 'tell-shifts', 'Tell apart: the shift panels'], ['ref', 'ref-2', 'Reference: drug classes and the curve']]],
  [/potency|efficacy|emax|ed50|ec50|kd|affinity|bond|covalent|most-potent|leftmost|units/, [['guide', 'guide-1', 'Guide 1: affinity, efficacy, potency'], ['ref', 'ref-1', 'Reference: reading a curve'], ['ref', 'ref-4', 'Reference: affinity, bonds and Kd']]],
  [/transporter|indirect|pde|ras|carbidopa|ache|cholinesterase|ssri|snri|upstream|downstream/, [['guide', 'guide-9', 'Guide 9: indirect antagonists'], ['tell', 'tell-indirect', 'Tell apart: where each drug acts'], ['ref', 'ref-7', 'Reference: indirect antagonists']]],
  [/regulat|desens|tolerance|spare|receptor-number|arrestin|endocyt|up-reg|down-reg/, [['guide', 'guide-9', 'Guide 9: spare receptors and regulation'], ['tell', 'tell-gpcr', 'Tell apart: the GPCR process and regulation'], ['ref', 'ref-6', 'Reference: spare receptors and regulation']]],
  [/gpcr|g-protein|signal|transduc|effector|messenger|cross|alpha|camp|plc|gs-|gi-|gq-|steps/, [['guide', 'guide-6', 'Guide 6: receptors and signalling'], ['tell', 'tell-gpcr', 'Tell apart: the GPCR process'], ['ref', 'ref-5', 'Reference: receptors and signalling']]],
  [/quantal|therapeutic|ti-|safety|ld50|graded|window/, [['guide', 'guide-9', 'Guide 9: quantal responses and TI'], ['ref', 'ref-8', 'Reference: quantal, TI and SI']]],
  [/enhance|synerg|addition|potentiation/, [['tell', 'tell-enhance', 'Tell apart: addition, synergism, potentiation'], ['guide', 'guide-9', 'Guide 9: enhancement of drug effects']]],
  [/nds|supplement|moa|soa|selectiv|receptor-class|ion-chan|superfam|drug-def|must-know|desired|undesired|side-effect|metoprolol-predict|ddi|poison|pharmacolog|pharmacokinet|pharmacodynam|term-drug|term-receptor/, [['guide', 'guide-7', 'Guide 7: drug basics he tests'], ['ref', 'ref-9', 'Reference: drug basics'], ['tell', 'tell-day1', 'Tell apart: Day 1']]],
  [/slope|threshold|drc|normalized|ligand|reversibility|theory|lowest-effective/, [['guide', 'guide-1', 'Guide 1: affinity, efficacy, potency'], ['ref', 'ref-1', 'Reference: reading a curve']]],
  [/orthosteric|mass-action|saturab|pam-nam|site|diazepam/, [['guide', 'guide-4', 'Guide 4: orthosteric vs allosteric'], ['tell', 'tell-day2', 'Tell apart: Day 2']]],
  [/chemical|physiological|antagonism|antag/, [['guide', 'guide-3', 'Guide 3: kinds of antagonists'], ['ref', 'ref-2', 'Reference: drug classes and the curve']]],
  [/rtk|nuclear|aldosterone|gtp|gprotein|voltage|ion|review/, [['guide', 'guide-6', 'Guide 6: receptors and signalling'], ['ref', 'ref-5', 'Reference: receptors and signalling']]]
];
const BY_LECTURE = {L01: ['guide', 'guide-7', 'Guide 7: drug basics he tests'], L02: ['guide', 'guide-6', 'Guide 6: receptors and signalling'], L03: ['guide', 'guide-1', 'Guide 1: affinity, efficacy, potency'], L04: ['guide', 'guide-2', 'Guide 2: agonist classes'], L05: ['guide', 'guide-9', 'Guide 9: Day 5'], L06: ['guide', 'guide-10', 'Guide 10: how to read a curve'], PE: ['guide', 'guide-10', 'Guide 10: how to read a curve'], JP: ['guide', 'guide-10', 'Guide 10: how to read a curve'], FG: ['guide', 'guide-10', 'Guide 10: how to read a curve']};
const BY_GROUP = {g1: ['guide', 'guide-7', 'Guide 7: drug basics he tests'], g2: ['guide', 'guide-4', 'Guide 4: orthosteric vs allosteric'], g3: ['guide', 'guide-2', 'Guide 2: agonist classes'], g4: ['guide', 'guide-1', 'Guide 1: affinity, efficacy, potency'], g5: ['guide', 'guide-6', 'Guide 6: receptors and signalling']};
function linksFor(q) {
  if (q.lecture === 'DL1') return [['guide', 'guide-8', 'Guide 8: the drug list'], ['ref', 'ref-druglist', 'Reference: the drug list']];
  const key = [q.concept, q.fg, q.sub, (q.tags || []).join(' ')].join(' ').toLowerCase();
  for (const [re, links] of LINKS) if (re.test(key)) return links;
  if (BY_GROUP[q.sub]) return [BY_GROUP[q.sub]];
  return BY_LECTURE[q.lecture] ? [BY_LECTURE[q.lecture]] : [];
}
const explainHTML = q => { const l = linksFor(q); return l.length ? `<div class="row explain"><span class="meta" style="margin:0">Explain more:</span>${l.map(([v, a, t]) => `<button type="button" class="chip" data-jump="${v}:${a}">${esc(t)}</button>`).join('')}</div>` : ''; };
function jump(view, anchor) {
  RET.push({view: CUR, y: window.scrollY});
  go(view);
  const t = document.getElementById(anchor);
  if (t) { t.scrollIntoView({block: 'start'}); window.scrollBy(0, -70); }
  backBtn();
}
function backBtn() {
  let b = document.getElementById('backbtn');
  if (!RET.length) { if (b) b.remove(); return; }
  if (!b) { b = document.createElement('button'); b.id = 'backbtn'; b.type = 'button'; b.className = 'btn'; document.body.appendChild(b); b.onclick = () => { const r = RET.pop(); backBtn(); go(r.view); window.scrollTo(0, r.y); }; }
  b.textContent = '← Back to ' + ({quiz: 'the question', exam: 'the exam', graphs: 'the figures', map: 'the map', terms: 'the terms'}[RET[RET.length - 1].view] || 'where you were');
}
document.addEventListener('click', e => { const j = e.target.closest('[data-jump]'); if (j) { const [v, a] = j.dataset.jump.split(':'); jump(v, a); } });
const VIEWFN = {topics: vTopics, quiz: vQuiz, terms: vTerms, weak: vWeak, exam: vExam, map: vMap, graphs: vGraphs, diagrams: vDiagrams, ref: vRef, tell: vTell, guide: vGuide, data: vData};
const rerender = () => { const y = window.scrollY; if (CUR === 'quiz' && Q) renderQ(); else if (CUR === 'exam' && EX && !EX.done) renderExam(); else if (CUR === 'exam' && EX && EX.done) examResult(); else VIEWFN[CUR](); window.scrollTo(0, y); };
document.addEventListener('click', e => {
  const f = e.target.closest('[data-flag]');
  if (f) {
    toggleFlag(f.dataset.flag);
    // only the buttons for this id change; a full re-render would reset in-progress forms
    document.querySelectorAll(`[data-flag="${f.dataset.flag}"]`).forEach(b => { b.classList.toggle('on', isFlagged(f.dataset.flag)); b.setAttribute('aria-pressed', isFlagged(f.dataset.flag)); b.textContent = '⚑ ' + (isFlagged(f.dataset.flag) ? 'Flagged' : 'Flag'); });
    if (CUR === 'topics' || CUR === 'map') rerender();
    return;
  }
  const l = e.target.closest('[data-layout]');
  if (l) {
    S.layout = l.dataset.layout; save();
    if (CUR === 'exam' && !(EX && !EX.done)) { document.querySelectorAll('[data-layout]').forEach(b => { b.classList.toggle('on', b.dataset.layout === S.layout); b.setAttribute('aria-pressed', b.dataset.layout === S.layout); }); return; }
    rerender();
  }
});
/* The exam is over (or abandoned): stop the clock before the state goes. */
function endExam() { clearInterval(TICK); TICK = null; EX = null; }

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
   <div class="row" style="margin-top:10px;justify-content:space-between"><span class="row"><span class="meta" style="margin:0">Answer:</span>${layoutToggle()}</span>
   <span class="row"><span class="meta" style="margin:0">⚑ Flagged: <b>${flaggedPool().length}</b></span>${flaggedPool().length ? `<button class="btn ghost" id="drillflag">Drill flagged</button><button class="btn ghost" id="clearflag">Clear flags</button>` : ''}</span></div>
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
    const subs = (t.subs || []).filter(sb => tq.some(q => q.sub === sb.id));
    if (subs.length > 1) subs.forEach(s => {
      const sq = tq.filter(q => q.sub === s.id);
      const sa = acc(sq);
      const sseen = seenCount(sq);
      h += `<div class="topicrow subrow"><span>${esc(s.name)}<small>${sq.length} questions${s.cite && s.cite !== t.cite ? ' · ' + esc(fmtCite(s.cite)) : ''}</small>
        <span class="bar-meter seen"><span style="width:${Math.round(100 * sseen / sq.length)}%"></span></span></span>
        <span class="row"><small>${sseen}/${sq.length} seen · ${sa.pct == null ? '—' : sa.pct + '%'}</small><button class="btn ghost" data-topic="${t.id}" data-sub="${s.id}">Drill</button></span></div>`;
    });
    h += '</div>';
  });
  $('#view').innerHTML = h;
  $('#due').onclick = () => startQuiz(pool, 'Due and unseen', 'sr');
  const wn = $('#whatsnew'); if (wn) wn.onclick = e => { e.preventDefault(); go('data'); };
  $('#all').onclick = () => startQuiz(shuffle(pool), 'All questions, one pass', 'pass');
  const df = $('#drillflag'); if (df) df.onclick = () => startQuiz(flaggedPool(), 'Flagged questions', 'pass');
  const cf = $('#clearflag'); if (cf) cf.onclick = () => { if (confirm('Remove every flag?')) { S.flags = {}; save(); vTopics(); } };
  document.querySelectorAll('[data-sk]').forEach(c => c.onclick = () => { FILT.skill = c.dataset.sk; vTopics(); });
  document.querySelectorAll('[data-topic]').forEach(b => b.onclick = () => {
    const list = pool.filter(q => q.topic === b.dataset.topic && (!b.dataset.sub || q.sub === b.dataset.sub) && (FILT.skill === 'all' || q.skill === FILT.skill));
    startQuiz(list, (TOPIC[b.dataset.topic] || {}).name, 'sr');
  });
}

/* ---------- Quiz ---------- */
let Q = null;
function startQuiz(list, label, mode, opts = {}) {
  if (!list.length) { alert('No questions match that selection.'); return; }
  Q = {list: list.slice(), label, mode, i: 0, done: 0, right: 0, retest: [], doneIds: new Set(), st: {}, graph: opts.graph || null};
  RET.length = 0; backBtn();
  CUR = 'quiz'; nav(); nextQ();
}
const allDone = () => Q.list.every(q => Q.doneIds.has(q.id));
/* Pick the next question. Pass mode walks the list once. SR mode takes a
   missed concept's sibling first (a different wording of the same idea), then
   what is due, then what is unseen, then the soonest due. */
function pickSR() {
  const now = Date.now(), list = Q.list, recent = Q.cur ? Q.cur.id : null;
  // A question answered in the last few minutes is not served again at the
  // start of a new session; a fresh open of a topic begins somewhere else.
  const fresh = id => (!(S.q[id] && S.q[id].last > now - 3 * MIN) || id === (Q.retest[0] || {}).not) && !Q.doneIds.has(id);
  while (Q.retest.length) {
    const {concept, not} = Q.retest.shift();
    const sib = list.filter(q => q.concept === concept && q.id !== not && q.id !== recent && !Q.doneIds.has(q.id));
    if (sib.length) return shuffle(sib)[0];
  }
  const due = shuffle(list.filter(q => S.q[q.id] && S.q[q.id].n && S.q[q.id].due <= now && q.id !== recent && fresh(q.id)));
  if (due.length) return due.sort((a, b) => S.q[a.id].box - S.q[b.id].box)[0];
  const unseen = list.filter(q => !(S.q[q.id] && S.q[q.id].n) && !Q.doneIds.has(q.id));
  if (unseen.length) return shuffle(unseen)[0];
  const rest = shuffle(list.filter(q => q.id !== recent && fresh(q.id))).sort((a, b) => S.q[a.id].due - S.q[b.id].due);
  // everything was answered minutes ago: anything but the very last one
  const lastId = list.reduce((m, q) => (S.q[q.id] && (!m || S.q[q.id].last > S.q[m].last)) ? q.id : m, null);
  return rest[0] || shuffle(list.filter(q => q.id !== recent && q.id !== lastId && !Q.doneIds.has(q.id)))[0] || list.find(q => !Q.doneIds.has(q.id)) || list[0];
}
function nextQ() {
  let q;
  if (Q.mode === 'pass') { while (Q.i < Q.list.length && Q.doneIds.has(Q.list[Q.i].id)) Q.i++; if (Q.i >= Q.list.length) return quizDone(); q = Q.list[Q.i++]; }
  else { if (allDone()) return quizDone(); q = pickSR(); }
  Q.cur = q; Q.order = q.type === 'match' ? null : optOrder(q);
  Q.picked = q.multi ? new Set() : null; Q.answered = false; Q.t0 = Date.now();
  if (q.type === 'match') Q.rightOrder = shuffle(q.right.slice());
  renderQ();
}
function quizDone() {
  Q.finished = true; Q.answered = false; clearView();
  if (Q.graph) return graphDone();
  $('#view').innerHTML = `<div class="card"><h2>Pass finished</h2><p>${Q.right} of ${Q.done} correct.</p>
    <div class="row"><button class="btn" id="again">Study what is due</button><button class="btn ghost" id="totopics">Topics</button></div></div>`;
  $('#again').onclick = () => startQuiz(examPool(), 'Due and unseen', 'sr');
  $('#totopics').onclick = () => go('topics');
}
function vQuiz() { if (!Q) return startQuiz(examPool(), 'Due and unseen', 'sr'); if (Q.finished) return quizDone(); renderQ(); }

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
/* One question card. `st` holds the answer state (order, rightOrder, picked, mpick, answered, ok);
   in the one-at-a-time view that is Q itself, on the all-on-one-page view one object per question. */
function qCard(q, st, opts = {}) {
  const sq = S.q[q.id], tag = opts.idx != null ? `${opts.idx + 1}. ` : '';
  let h = `<div class="card qcard" data-qid="${q.id}"><div class="row" style="justify-content:space-between"><span class="meta">${tag}${metaLine(q)}${opts.seen ? ' · ' + (sq && sq.n ? 'seen ' + sq.n + '×' : 'new') : ''}</span>${flagBtn(q.id)}</div><div class="stem">${esc(q.stem)}</div>${stemMedia(q)}`;
  if (q.type === 'match') {
    h += q.left.map((l, i) => `<div class="row" style="margin-bottom:8px"><span style="flex:1 1 200px">${esc(l)}</span>
      <select data-qid="${q.id}" data-l="${i}" ${st.answered ? 'disabled' : ''}><option value="">—</option>${st.rightOrder.map(r => `<option ${st.mpick && st.mpick[i] === r ? 'selected' : ''}>${esc(r)}</option>`).join('')}</select>
      ${st.answered ? (st.mpick[i] === pairOf(q, l) ? '<b style="color:var(--ok)">✓</b>' : `<b style="color:var(--bad)">✗ ${esc(pairOf(q, l))}</b>`) : ''}</div>`).join('');
  } else {
    st.order.forEach((oi, n) => {
      const o = q.options[oi];
      let cls = 'opt';
      const sel = q.multi ? st.picked.has(oi) : st.picked === oi;
      if (st.answered) { if (o.correct) cls += ' right'; else if (sel) cls += ' wrong'; }
      else if (sel) cls += ' sel';
      h += `<button class="${cls}" data-qid="${q.id}" data-o="${oi}" ${st.answered ? 'disabled' : ''}><span class="k">${q.multi ? (sel ? '☑' : '☐') : LETTERS[n]}</span><span>${esc(o.t)}</span></button>`;
      if (st.answered && o.why) h += `<div class="why">${esc(o.why)}</div>`;
    });
  }
  if (!st.answered && (q.multi || q.type === 'match')) h += `<button class="btn" ${opts.single ? 'id="check"' : ''} data-qid="${q.id}" data-check="1">Check</button>`;
  if (st.answered) {
    h += `<div class="verdict ${st.ok ? 'ok' : 'bad'}">${st.ok ? '✓ Correct' : '✗ Not correct'}</div>`;
    if (q.type === 'match' && q.pairs) h += q.pairs.filter(p => p.why).map(p => `<div class="why"><b>${esc(p.l)}</b>: ${esc(p.why)}</div>`).join('');
    if (q.teach) h += `<div class="teach">${teachHTML(q.teach)}</div>`;
    if (q.fg) h += figHTML(q.fg);
    h += graphFeedback(q, st);
    if (q.note) h += `<div class="note">${esc(q.note)}</div>`;
    h += readingHTML(q.reading);
    if (q.quote) h += `<div class="quote">“${esc(q.quote)}”</div>`;
    h += `<div class="cite">${esc(fmtCite(q.cite))}</div>` + explainHTML(q);
    if (opts.conf) h += opts.conf(st);
  }
  if (opts.foot) h += opts.foot;
  return h + '</div>';
}
function renderQ() {
  if (Q.finished) return quizDone();
  if (S.layout === 'all') return renderAll();
  // the current question may have been answered on the all-on-one-page view
  if (Q.cur && !Q.answered && Q.doneIds.has(Q.cur.id)) return nextQ();
  const q = Q.cur; clearView();
  let h = `<div class="row" style="justify-content:space-between"><span class="meta">${esc(Q.label || '')} · ${Q.done} answered${Q.done ? ' · ' + Q.right + ' right' : ''}</span>${layoutToggle()}</div><div class="row" style="margin:-4px 0 8px">${sessStrip()}</div>`;
  h += qCard(q, Q, {seen: true, single: true,
    conf: () => Q.ok ? `<div class="row" style="margin-top:12px"><span class="meta" style="margin:0">How sure were you?</span>
      <button class="btn" data-c="sure">Knew it</button><button class="btn ghost" data-c="unsure">Not sure</button><button class="btn ghost" data-c="guess">I guessed</button></div>`
      : `<div class="row" style="margin-top:12px"><button class="btn" data-c="wrong">Next</button></div>`,
    foot: `<div class="meta kbd">Keys: A–E or 1–5 pick an option · Enter checks or continues</div>`});
  $('#view').innerHTML = h;
  document.querySelectorAll('[data-o]').forEach(b => b.onclick = () => pick(+b.dataset.o));
  document.querySelectorAll('select[data-l]').forEach(s => s.onchange = () => { Q.mpick = Q.mpick || {}; Q.mpick[+s.dataset.l] = s.value; });
  const ck = document.querySelector('[data-check]'); if (ck) ck.onclick = check;
  document.querySelectorAll('[data-c]').forEach(b => b.onclick = () => finish(b.dataset.c));
}
/* All on one page: every question of the drill in order, each graded as it is answered.
   A wrong answer is recorded at once; a right one is recorded as "Knew it" and can be
   downgraded with "Not sure" or "I guessed". SR drills take their due-first order; 40 show at a time. */
function allList() {
  // the order is fixed once; questions answered one at a time (no card state) drop out each time
  const keep = q => !Q.doneIds.has(q.id) || (Q.st[q.id] && Q.st[q.id].answered);
  if (Q.allList) return Q.allList.filter(keep);
  let list = Q.list.filter(keep);
  if (Q.mode === 'sr') {
    const now = Date.now(), due = [], unseen = [], rest = [];
    list.forEach(q => { const st = S.q[q.id]; if (!(st && st.n)) unseen.push(q); else if (st.due <= now) due.push(q); else rest.push(q); });
    list = due.sort((a, b) => S.q[a.id].box - S.q[b.id].box).concat(shuffle(unseen), rest.sort((a, b) => S.q[a.id].due - S.q[b.id].due));
  }
  Q.allList = list; Q.allN = 40; Q.st = Q.st || {};
  return list;
}
function renderAll() {
  const list = allList(), shown = list.slice(0, Q.allN);
  shown.forEach(q => { if (!Q.st[q.id]) Q.st[q.id] = {order: q.type === 'match' ? null : optOrder(q), rightOrder: q.type === 'match' ? shuffle(q.right.slice()) : null, picked: q.multi ? new Set() : null, mpick: null, answered: false, ok: null, t0: Date.now()}; });
  const done = shown.filter(q => Q.st[q.id].answered).length, right = shown.filter(q => Q.st[q.id].ok).length;
  const earlier = Q.list.length - list.length;
  let h = `<div class="row allhead" style="justify-content:space-between"><span class="meta" id="allcount">${esc(Q.label || '')} · ${done} of ${shown.length} answered${done ? ' · ' + right + ' right' : ''}${list.length > shown.length ? ' · ' + list.length + ' in the drill' : ''}${earlier ? ' · ' + earlier + ' answered one at a time' : ''}</span>${layoutToggle()}</div><div class="row" style="margin:-4px 0 8px">${sessStrip()}</div>`;
  shown.forEach((q, i) => {
    const st = Q.st[q.id];
    h += qCard(q, st, {idx: i, conf: s2 => allConf(q, s2)});
  });
  if (list.length > shown.length) h += `<div class="row"><button class="btn" id="more">Show the next ${Math.min(40, list.length - shown.length)}</button></div>`;
  else h += `<div class="row"><button class="btn ghost" id="alldone">Finish</button></div>`;
  const view = $('#view'); view.innerHTML = h;
  // one delegated handler for every card; a card is re-rendered on its own when it changes
  view.onclick = e => {
    const t = e.target.closest('[data-o],[data-check],[data-down],#more,#alldone'); if (!t) return;
    if (t.id === 'more') { Q.allN += 40; renderAll(); return; }
    if (t.id === 'alldone') { quizDone(); return; }
    if (t.dataset.down) downgrade(t.dataset.qid, t.dataset.down);
    else if (t.dataset.check) checkAll(t.dataset.qid);
    else pickAll(t.dataset.qid, +t.dataset.o);
  };
  view.onchange = e => { const s = e.target.closest('select[data-l]'); if (!s) return; const st = Q.st[s.dataset.qid]; st.mpick = st.mpick || {}; st.mpick[+s.dataset.l] = s.value; };
}
const allConf = (q, s2) => s2.ok ? `<div class="row" style="margin-top:10px"><span class="meta" style="margin:0">Recorded as ${s2.conf === 'guess' ? '"I guessed"' : s2.conf === 'unsure' ? '"Not sure"' : '"Knew it"'}</span>${s2.conf === 'sure' ? `<button class="btn ghost" data-qid="${q.id}" data-down="unsure">Not sure</button><button class="btn ghost" data-qid="${q.id}" data-down="guess">I guessed</button>` : ''}</div>` : '';
/* Replace one card in place and refresh the count line; nothing else on the page is rebuilt. */
function refreshCard(id) {
  const el = document.querySelector(`.qcard[data-qid="${id}"]`); if (!el) return renderAll();
  const idx = [...document.querySelectorAll('.qcard')].indexOf(el);
  const tmp = document.createElement('div'); tmp.innerHTML = qCard(byId[id], Q.st[id], {idx, conf: s2 => allConf(byId[id], s2)});
  el.replaceWith(tmp.firstElementChild);
  const list = allList(), shown = list.slice(0, Q.allN), done = shown.filter(q => Q.st[q.id] && Q.st[q.id].answered).length, right = shown.filter(q => Q.st[q.id] && Q.st[q.id].ok).length;
  const c = $('#allcount'); if (c) c.textContent = `${Q.label || ''} · ${done} of ${shown.length} answered${done ? ' · ' + right + ' right' : ''}`;
}
function pickAll(id, oi) {
  const q = byId[id], st = Q.st[id]; if (st.answered) return;
  if (q.multi) { st.picked.has(oi) ? st.picked.delete(oi) : st.picked.add(oi); refreshCard(id); return; }
  st.picked = oi; checkAll(id);
}
function checkAll(id) {
  const q = byId[id], st = Q.st[id];
  if (q.type === 'match') { st.mpick = st.mpick || {}; st.ok = q.left.every((l, i) => st.mpick[i] === pairOf(q, l)); }
  else if (q.multi) { if (!st.picked.size) return; st.ok = gradeMulti(q, st.picked); }
  else st.ok = q.options[st.picked].correct;
  st.answered = true; st.conf = st.ok ? 'sure' : 'wrong';
  const sq = qs(q.id); st.box0 = sq.box; sq.n++; if (st.ok) sq.ok++;
  const picked = q.type === 'match' ? st.mpick : q.multi ? [...st.picked] : st.picked;
  S.log.push({id: q.id, t: Date.now(), ok: st.ok, conf: st.conf, picked, ms: Date.now() - st.t0});
  setTimeout(refreshSess, 0);
  if (S.log.length > 5000) S.log = S.log.slice(-5000);
  schedule(q.id, st.conf);
  Q.done++; if (st.ok) Q.right++; Q.doneIds.add(q.id);
  if (!st.ok) Q.retest.push({concept: q.concept, not: q.id});
  save(); refreshCard(id);
}
function downgrade(id, conf) {
  const st = Q.st[id]; if (!st.answered || !st.ok || st.conf !== 'sure') return;
  st.conf = conf; const sq = qs(id);
  if (conf === 'guess') { sq.ok = Math.max(0, sq.ok - 1); Q.retest.push({concept: byId[id].concept, not: id}); }
  for (let i = S.log.length - 1; i >= 0; i--) if (S.log[i].id === id) { S.log[i].conf = conf; break; }
  sq.box = st.box0 || 0;   // reschedule from the box the answer started in, as the one-at-a-time flow does
  schedule(id, conf); save(); refreshCard(id);
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
  setTimeout(refreshSess, 0);
  if (S.log.length > 5000) S.log = S.log.slice(-5000);
  schedule(q.id, Q.ok ? conf : 'wrong');
  if (!Q.ok || conf === 'guess') Q.retest.push({concept: q.concept, not: q.id});
  Q.done++; if (Q.ok) Q.right++; Q.doneIds.add(q.id);
  save(); nextQ();
}

/* ---------- Weak spots ---------- */
/* ---------- Session progress ----------
   A session is the run of answers with no gap longer than 30 minutes, ending with
   the latest answer, so it survives a page reload. sessStrip() is the one-line
   version shown above the quiz and refreshed after every answer. */
const SESSION_GAP = 30 * MIN;
function sessionLog() {
  const L = S.log; if (!L.length) return [];
  let k = L.length - 1;
  while (k > 0 && L[k].t - L[k - 1].t < SESSION_GAP) k--;
  return Date.now() - L[L.length - 1].t < SESSION_GAP ? L.slice(k) : [];
}
const solid = e => e.ok && e.conf !== 'guess';
function sessStrip() {
  const ses = sessionLog(); if (!ses.length) return '<span class="meta" id="sess" style="margin:0">This session: no answers yet</span>';
  const ok = ses.filter(solid).length, last = ses.slice(-10);
  return `<span class="meta" id="sess" style="margin:0">This session: ${ok}/${ses.length} (${Math.round(100 * ok / ses.length)}%) · last ${last.length}: <span class="sdots10">${last.map(e => `<i class="${solid(e) ? 'y' : 'n'}" title="${esc(e.id)}"></i>`).join('')}</span></span>`;
}
const refreshSess = () => { const el = $('#sess'); if (el) el.outerHTML = sessStrip(); };

/* ---------- Weak spots ----------
   1. This session: answers, accuracy, the last 20 in order, first half vs second half.
   2. What to review next: questions not yet solid (last three answers, a correct
      "I guessed" counts as a miss), grouped by the guide section that teaches them,
      ranked by how much is missing. Each area lists the concepts, the wrong option
      chosen most recently with why it is wrong, the idea to learn, where to read it,
      and a drill button. 3. By topic and by skill, folded away. */
function vWeak() {
  const pool = examPool();
  if (!S.log.length) { $('#view').innerHTML = '<h2>Weak spots</h2><div class="empty">Answer some questions and this fills in: your progress this session, the concepts to review first, what you keep choosing and why it is wrong, and where to read about each one.</div>'; return; }
  const recent = {};
  S.log.forEach(e => { (recent[e.id] = recent[e.id] || []).push(e); });
  const score = q => { const r = (recent[q.id] || []).slice(-3); if (!r.length) return null; return r.filter(solid).length / r.length; };
  const notSolid = pool.filter(q => score(q) != null && score(q) < 1);
  let h = `<h2>Weak spots</h2>`, retryList = [];

  // 1. this session
  const ses = sessionLog();
  if (ses.length) {
    const ok = ses.filter(solid).length, pct = Math.round(100 * ok / ses.length);
    const half = Math.floor(ses.length / 2), a = ses.slice(0, half), b = ses.slice(half);
    const pa = a.length ? Math.round(100 * a.filter(solid).length / a.length) : null, pb = b.length ? Math.round(100 * b.filter(solid).length / b.length) : null;
    const missedNow = [...new Set(ses.filter(e => !solid(e)).map(e => e.id))].filter(id => byId[id] && score(byId[id]) < 1).map(id => byId[id]);
    const mins = Math.max(1, Math.round((ses[ses.length - 1].t - ses[0].t) / MIN));
    h += `<h3>This session</h3><div class="card"><div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:12px">
      <span><b style="font-size:22px">${pct}%</b> <span class="meta" style="margin:0">${ok} of ${ses.length} solid in ${mins} min</span></span>
      ${pa != null && ses.length >= 6 ? `<span class="meta" style="margin:0">first half ${pa}% → second half ${pb}%</span>` : ''}</div>
      <div class="sdots10 big" style="margin:10px 0 4px">${ses.slice(-20).map(e => `<i class="${solid(e) ? 'y' : 'n'}" title="${esc(e.id)}${e.conf === 'guess' ? ' (guessed)' : ''}"></i>`).join('')}</div>
      <div class="meta" style="margin:0">Last ${Math.min(20, ses.length)} answers, oldest on the left; filled = solid, outlined = missed or guessed. A session ends after 30 minutes with no answer.</div>
      ${missedNow.length ? `<div class="row" style="margin-top:10px"><button class="btn" id="retrysess">Retry the ${missedNow.length} missed this session</button></div>` : ''}</div>`;
    retryList = missedNow;
  }

  // 2. what to review next
  const areas = {};
  notSolid.forEach(q => {
    const l = linksFor(q)[0] || ['', '', 'Other'];
    const A = areas[l[2]] = areas[l[2]] || {name: l[2], links: linksFor(q), qs: [], gap: 0, concepts: {}};
    A.qs.push(q); A.gap += 1 - score(q);
    const c = A.concepts[q.concept] = A.concepts[q.concept] || {qs: [], last: null};
    c.qs.push(q);
    const lastMiss = (recent[q.id] || []).filter(e => !solid(e)).pop();
    if (lastMiss && (!c.last || lastMiss.t > c.last.e.t)) c.last = {e: lastMiss, q};
  });
  const ranked = Object.values(areas).sort((x, y) => y.gap - x.gap);
  const firstSentence = t => { const m = String(t || '').replace(/<[^>]+>/g, '').match(/^(.*?[.!?](\s|$)){1,2}/); const r = (m ? m[0] : String(t || '')).trim(); return r.length > 320 ? r.slice(0, 317) + '…' : r; };
  const cap1 = t => t.charAt(0).toUpperCase() + t.slice(1);
  const pickedText = (q, e) => { const p = [].concat(e.picked == null ? [] : e.picked); return p.map(i => q.options && q.options[i]).filter(Boolean); };
  if (ranked.length) {
    h += `<h3>What to review next</h3><p class="sub">${notSolid.length} question${notSolid.length === 1 ? '' : 's'} not yet solid, grouped by the section that teaches them, most missing first. Read the section, then drill its questions.</p>`;
    ranked.slice(0, 6).forEach((A, ai) => {
      const cs = Object.entries(A.concepts).sort((x, y) => y[1].qs.length - x[1].qs.length);
      h += `<div class="card plan"><div class="row" style="justify-content:space-between;flex-wrap:wrap"><b>${ai + 1}. ${esc(cap1(A.name.replace(/^(Guide|Reference|Tell apart) ?\d*: ?/, '')))}</b><span class="meta" style="margin:0">${A.qs.length} question${A.qs.length === 1 ? '' : 's'} · ${cs.length} concept${cs.length === 1 ? '' : 's'}</span></div>`;
      cs.slice(0, 4).forEach(([cid, c]) => {
        const q = (c.last && c.last.q) || c.qs[0], wrong = c.last ? pickedText(c.last.q, c.last.e).filter(o => !o.correct) : [];
        const right = (q.options || []).filter(o => o.correct).map(o => o.t);
        h += `<div class="pconcept"><div class="pq">${esc(q.stem.length > 160 ? q.stem.slice(0, 160) + '…' : q.stem)}</div>`;
        if (wrong.length) h += `<div class="pw"><b>You chose:</b> ${esc(wrong.map(o => o.t).join(' · '))}<br><span class="meta" style="margin:0">Why it is not the answer: ${esc(wrong.map(o => o.why || '').join(' '))}</span></div>`;
        else if (c.last && c.last.e.conf === 'guess') h += `<div class="pw"><b>You got it right but marked it a guess.</b></div>`;
        if (right.length) h += `<div class="pr"><b>Answer:</b> ${esc(right.join(' · '))}</div>`;
        if (q.teach) h += `<div class="pi"><b>The idea:</b> ${esc(firstSentence(q.teach))}</div>`;
        if (c.qs.length > 1) h += `<div class="meta" style="margin:2px 0 0">${c.qs.length} questions on this concept are not solid.</div>`;
        h += `</div>`;
      });
      if (cs.length > 4) h += `<div class="meta">+ ${cs.length - 4} more concept${cs.length - 4 === 1 ? '' : 's'} in this section.</div>`;
      h += `<div class="row" style="margin-top:8px;flex-wrap:wrap">${A.links.map(([v, a, t]) => `<button type="button" class="chip" data-jump="${v}:${a}">Read: ${esc(t)}</button>`).join('')}<button class="btn" data-area="${ai}">Drill these ${A.qs.length}</button></div></div>`;
    });
    if (ranked.length > 6) h += `<p class="meta">${ranked.length - 6} more section${ranked.length - 6 === 1 ? '' : 's'} have questions to review; they appear here as these are solved.</p>`;
    h += `<div class="row" style="margin:6px 0 14px"><button class="btn ghost" id="missall">Drill all ${notSolid.length} not-solid questions</button></div>`;
  } else h += `<div class="card">Every question you have answered is solid on its last three answers.</div>`;

  // 3. by topic / by skill (folded)
  const group = (keyFn, nameFn) => {
    const g = {};
    pool.forEach(q => { const k = keyFn(q); (g[k] = g[k] || []).push(q); });
    return Object.entries(g).map(([k, list]) => {
      const sc = list.map(score).filter(x => x != null);
      return {k, name: nameFn(k), n: list.length, seen: sc.length, pct: sc.length ? Math.round(100 * sc.reduce((a, b) => a + b, 0) / sc.length) : null, miss: list.filter(q => score(q) != null && score(q) < 1)};
    }).sort((a, b) => (a.pct == null ? 101 : a.pct) - (b.pct == null ? 101 : b.pct));
  };
  const table = (rows, title) => `<details class="gread"><summary>${title}</summary><div class="card">${rows.map(r => `<div class="topicrow"><span>${esc(r.name)}<small>${r.seen}/${r.n} seen</small></span>
    <span class="row"><span class="bar-meter"><span style="width:${r.pct || 0}%"></span></span><small>${r.pct == null ? '—' : r.pct + '%'}</small>
    ${r.miss.length ? `<button class="btn ghost" data-miss="${esc(title)}|${esc(r.k)}">Drill ${r.miss.length}</button>` : ''}</span></div>`).join('')}</div></details>`;
  const byTopic = group(q => q.topic, k => (TOPIC[k] || {}).name || k);
  const bySkill = group(q => q.skill, k => (SKILL[k] || {}).label || k);
  h += `<h3>All-time, by topic and by skill</h3>` + table(byTopic, 'By topic') + table(bySkill, 'By skill');
  $('#view').innerHTML = h;
  const ma = $('#missall'); if (ma) ma.onclick = () => startQuiz(notSolid, 'Weak spots', 'sr');
  const rs = $('#retrysess'); if (rs) rs.onclick = () => startQuiz(retryList, 'Missed this session', 'sr');
  document.querySelectorAll('[data-area]').forEach(b => b.onclick = () => { const A = ranked[+b.dataset.area]; startQuiz(A.qs, A.name, 'sr'); });
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
/* Blueprint paper: the topic counts in COURSE.exams[].blueprint. Each question
   falls in one topic by keyword (first match wins: rtk, reg, ti, galpha), else
   graph (a figure question) or other. Definition drills (skill 'term') are left
   out because his papers ask definitions inside his own stems. */
const BP_RX = {
  rtk: /tyrosine kinase|\bRTKs?\b|dimeri[sz]/i,
  reg: /up-?regulat|down-?regulat|desensiti[sz]|internali[sz]|tachyphylaxis|receptor[- ]regulation|\bGRK|arrestin|tolerance/i,
  ti: /therapeutic index|safety index|therapeutic window|\bTI\b|\bSI\b|LD50|ED99|\bLD1\b|TD50|ti-from|safety-index|therapeutic-index/i,
  galpha: /\bG[sqi]\b|\bGα[sqi]\b|α[sqi]\b|alpha[- ]?[sqi]\b|transducer|second messenger|effector|G[- ]protein/i
};
const bpCat = q => {
  const t = [q.stem, q.concept, (q.tags || []).join(' ')].join(' ');
  for (const k of ['rtk', 'reg', 'ti']) if (BP_RX[k].test(t)) return k;
  const curve = q.img || q.graph || /\bDRC\b|curve|dashed|dotted/i.test(q.stem);
  if (BP_RX.galpha.test(t) && !curve) return 'galpha';
  return curve || q.skill === 'figure' ? 'graph' : 'other';
};
function drawBlueprint(bp) {
  const elig = examPool().filter(q => !q.lowYield && !q.type && q.skill !== 'term');
  const by = {}; elig.forEach(q => (by[bpCat(q)] = by[bpCat(q)] || []).push(q));
  const total = active().questions, out = [], used = new Set();
  const ok = q => !used.has(q.id) && !(q.dupOf && used.has(q.dupOf)) && ![...used].some(u => byId[u].dupOf === q.id);
  const cat = new Map();
  const take = (key, n) => {
    const list = shuffle((by[key] || []).slice()), seen = new Set();
    const firsts = list.filter(q => !seen.has(q.concept) && seen.add(q.concept));   // one per concept before repeats
    for (const q of firsts.concat(list)) { if (n <= 0) break; if (!ok(q)) continue; out.push(q); used.add(q.id); cat.set(q.id, key); n--; }
  };
  let left = total;
  bp.parts.forEach(p => { if (p.rest || p.min) return; const n = Array.isArray(p.n) ? p.n[0] + Math.floor(Math.random() * (p.n[1] - p.n[0] + 1)) : p.n; take(p.key, n); left -= n; });
  const g = bp.parts.find(p => p.min); if (g) { take(g.key, g.min); left -= g.min; }
  const r = bp.parts.find(p => p.rest); if (r) take(r.key, left);
  // exactly bp.sata select-all items: swap one for another in the same topic
  const swap = (from, wantMulti) => {
    for (const q of shuffle(out.filter(x => !!x.multi === from))) {
      const k = cat.get(q.id), alt = shuffle((by[k] || []).slice()).find(x => !!x.multi === wantMulti && ok(x));
      if (alt) { out[out.indexOf(q)] = alt; used.delete(q.id); used.add(alt.id); cat.set(alt.id, k); return true; }
    }
    return false;
  };
  while (out.filter(q => q.multi).length > bp.sata && swap(true, false));
  while (out.filter(q => q.multi).length < bp.sata && swap(false, true));
  return shuffle(out);
}
function vExam() {
  const ex = active(), max = examPool().filter(q => !q.lowYield && !q.type).length;
  if (EX && !EX.done && EX.expired) { submitExam(); return; }
  if (EX && !EX.done) return renderExam();
  const lens = [...new Set([ex.questions, 25, 50, max].filter(x => x && x <= max))].sort((a, b) => a - b);
  let h = `<h2>Exam simulator</h2><p class="sub">${esc(ex.name)}: ${ex.questions ? ex.questions + ' questions' : 'question count not yet announced'}, ${ex.minutes} minutes allotted.
    Answers are not shown until you submit. Select-all items are scored all-or-nothing. ${ex.blueprint ? 'With his topic counts on, the paper follows them; otherwise' : ''} definition questions make up at most 15% of the paper.</p>
    <div class="card"><div class="row"><span>Length:</span>${lens.map(n => `<span class="chip ${n === (ex.questions || lens[0]) ? 'on' : ''}" data-n="${n}">${n === max ? 'All ' + n : n}</span>`).join('')}</div>
    ${ex.blueprint ? `<div class="row" style="margin-top:10px"><label><input type="checkbox" id="bp" checked> Match his topic counts at ${ex.questions} questions: ${ex.blueprint.parts.map(p => esc(p.name) + ' ' + (p.rest ? '(the rest)' : p.min ? '(at least ' + p.min + ')' : Array.isArray(p.n) ? p.n.join('–') : p.n)).join(' · ')} · ${ex.blueprint.sata} select-all</label></div>` : ''}
    <div class="row" style="margin-top:10px"><label><input type="checkbox" id="scale" checked> Scale the clock to the length (${ex.minutes} min for the full paper)</label></div>
    <div class="row" style="margin-top:10px"><span class="meta" style="margin:0">Answer:</span>${layoutToggle()}</div>
    <div class="row" style="margin-top:12px"><button class="btn" id="startx">Start</button></div></div>`;
  if (S.exams && S.exams.length) h += `<h3>Past attempts</h3><div class="card">${S.exams.slice(-8).reverse().map(e => `<div class="topicrow"><span>${new Date(e.t).toLocaleString()}</span><span>${e.score}/${e.n} (${Math.round(100 * e.score / e.n)}%)</span></div>`).join('')}</div>`;
  $('#view').innerHTML = h;
  let n = ex.questions || lens[0];
  document.querySelectorAll('[data-n]').forEach(c => c.onclick = () => { n = +c.dataset.n; document.querySelectorAll('[data-n]').forEach(x => x.classList.toggle('on', x === c)); });
  // (the layout chips on this page only restyle themselves: see the delegated handler)
  $('#startx').onclick = () => {
    const paper = ex.blueprint && n === ex.questions && $('#bp') && $('#bp').checked ? drawBlueprint(ex.blueprint) : drawExam(n);
    const full = ex.questions || max;
    const mins = $('#scale').checked ? Math.max(5, Math.round(ex.minutes * paper.length / full)) : ex.minutes;
    EX = {qs: paper.map(q => q.id), i: 0, ans: {}, flag: {}, orders: paper.map(q => optOrder(q)), ends: Date.now() + mins * MIN, done: false};
    renderExam();
  };
}
let TICK = null;
const examTick = () => {
  const tick = () => {
    if (!EX) { clearInterval(TICK); return; }
    const ms = EX.ends - Date.now(), el = $('#clock');
    if (ms <= 0) { clearInterval(TICK); if (CUR === 'exam') submitExam(); else EX.expired = true; return; }
    if (el) el.textContent = `${Math.floor(ms / HOUR)}:${String(Math.floor(ms % HOUR / MIN)).padStart(2, '0')}:${String(Math.floor(ms % MIN / 1000)).padStart(2, '0')} left`;
  };
  clearInterval(TICK); tick(); TICK = setInterval(tick, 1000);
};
const examAnswered = id => EX.ans[id] != null && !(Array.isArray(EX.ans[id]) && !EX.ans[id].length);
function examPick(q, oi) {
  if (q.multi) { const s = new Set(EX.ans[q.id] || []); s.has(oi) ? s.delete(oi) : s.add(oi); EX.ans[q.id] = [...s]; }
  else EX.ans[q.id] = oi;
}
function askSubmit() {
  const left = EX.qs.filter(id => !examAnswered(id)).length;
  if (confirm(left ? `${left} unanswered. Submit anyway?` : 'Submit the exam?')) submitExam();
}
/* Every exam question on one page; answers are kept in EX.ans exactly as in the one-at-a-time view. */
function renderExamAll() {
  const n = EX.qs.filter(examAnswered).length;
  let h = `<div class="row allhead" style="justify-content:space-between"><b id="xcount">${n} of ${EX.qs.length} answered</b><span class="row"><span class="timer" id="clock"></span>${layoutToggle()}<button class="btn" id="submit">Submit exam</button></span></div>`;
  EX.qs.forEach((id, k) => {
    const q = byId[id], ord = EX.orders[k], a = EX.ans[id];
    h += `<div class="card qcard" id="xq${k}"><div class="row" style="justify-content:space-between"><b>Question ${k + 1}</b>${flagBtn(id)}</div><div class="stem">${esc(q.stem)}</div>${stemMedia(q)}`;
    ord.forEach((oi, m) => {
      const sel = q.multi ? (a || []).includes(oi) : a === oi;
      h += `<button class="opt ${sel ? 'sel' : ''}" data-k="${k}" data-o="${oi}"><span class="k">${q.multi ? (sel ? '☑' : '☐') : LETTERS[m]}</span><span>${esc(q.options[oi].t)}</span></button>`;
    });
    h += '</div>';
  });
  h += `<div class="row"><button class="btn" id="submit2">Submit exam</button></div>`;
  $('#view').innerHTML = h;
  $('#view').onclick = e => {
    const b = e.target.closest('[data-k][data-o]'); if (!b) return;
    const k = +b.dataset.k, q = byId[EX.qs[k]]; examPick(q, +b.dataset.o);
    const card = $('#xq' + k), a = EX.ans[q.id];
    card.querySelectorAll('[data-o]').forEach((o, m) => { const oi = +o.dataset.o, sel = q.multi ? (a || []).includes(oi) : a === oi; o.classList.toggle('sel', sel); if (q.multi) o.querySelector('.k').textContent = sel ? '☑' : '☐'; });
    const n = EX.qs.filter(examAnswered).length; const hd = $('#xcount'); if (hd) hd.textContent = `${n} of ${EX.qs.length} answered`;
  };
  $('#submit').onclick = askSubmit; $('#submit2').onclick = askSubmit;
  examTick();
}
function renderExam() {
  clearInterval(TICK);
  if (EX.done) return examResult();
  if (S.layout === 'all') return renderExamAll();
  clearView();
  const q = byId[EX.qs[EX.i]], ord = EX.orders[EX.i], a = EX.ans[q.id];
  let h = `<div class="row" style="justify-content:space-between"><b>Question ${EX.i + 1} of ${EX.qs.length}</b><span class="row"><span class="timer" id="clock"></span>${layoutToggle()}</span></div>
    <div class="grid">${EX.qs.map((id, k) => `<button data-j="${k}" class="${examAnswered(id) ? 'ans' : ''} ${k === EX.i ? 'cur' : ''} ${isFlagged(id) ? 'flag' : ''}">${k + 1}</button>`).join('')}</div>
    <div class="card"><div class="stem">${esc(q.stem)}</div>${stemMedia(q)}`;
  ord.forEach((oi, n) => {
    const sel = q.multi ? (a || []).includes(oi) : a === oi;
    h += `<button class="opt ${sel ? 'sel' : ''}" data-o="${oi}"><span class="k">${q.multi ? (sel ? '☑' : '☐') : LETTERS[n]}</span><span>${esc(q.options[oi].t)}</span></button>`;
  });
  h += `</div><div class="row"><button class="btn ghost" id="prev" ${EX.i ? '' : 'disabled'}>Previous</button>
    ${flagBtn(q.id)}
    <button class="btn ghost" id="next" ${EX.i < EX.qs.length - 1 ? '' : 'disabled'}>Next</button>
    <button class="btn" id="submit">Submit exam</button></div>`;
  $('#view').innerHTML = h;
  document.querySelectorAll('[data-o]').forEach(b => b.onclick = () => { examPick(q, +b.dataset.o); renderExam(); });
  document.querySelectorAll('[data-j]').forEach(b => b.onclick = () => { EX.i = +b.dataset.j; renderExam(); });
  $('#prev').onclick = () => { EX.i--; renderExam(); };
  $('#next').onclick = () => { EX.i++; renderExam(); };
  $('#submit').onclick = askSubmit;
  examTick();
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
  clearView();
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
    h += `<div class="card"><div class="row" style="justify-content:space-between"><span class="meta">${k + 1}. ${metaLine(q)}</span>${flagBtn(q.id)}</div><div class="stem">${esc(q.stem)}</div>${stemMedia(q)}
      <div class="verdict ${ok ? 'ok' : 'bad'}">${ok ? '✓ Correct' : a == null ? '✗ Not answered' : '✗ Not correct'}</div>`;
    if (!ok) {
      q.options.forEach((o, oi) => { if (o.correct || pickedSet.has(oi)) h += `<div class="opt ${o.correct ? 'right' : 'wrong'}" style="cursor:default"><span>${esc(o.t)}</span></div><div class="why">${esc(o.why || '')}</div>`; });
      if (q.teach) h += `<div class="teach">${teachHTML(q.teach)}</div>`;
      if (q.fg) h += figHTML(q.fg);
      if (q.note) h += `<div class="note">${esc(q.note)}</div>`;
      h += readingHTML(q.reading);
    }
    h += `<div class="cite">${esc(fmtCite(q.cite))}</div>${explainHTML(q)}</div>`;
  });
  $('#view').innerHTML = h;
  $('#newx').onclick = () => { endExam(); vExam(); };
  const missed = qsx.filter(q => !exRight(q, EX.ans[q.id]));
  if (!missed.length) $('#missx').disabled = true;
  $('#missx').onclick = () => { if (!missed.length) return; endExam(); startQuiz(missed, 'Missed on the exam', 'sr'); };
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
  let h = `<h2>Terms</h2><p class="sub">${all.length} terms from the Day 1–6 lectures, each with its source. Each term has a one-line meaning, a situation that shows it in action, and, where one applies, a figure.</p>
  <div class="card"><div class="row">${[['glossary', 'Glossary'], ['flash', 'Flashcards'], ['quiz', 'Quiz me']].map(([k, l]) => `<span class="chip ${TM.mode === k ? 'on' : ''}" data-mode="${k}">${l}</span>`).join('')}
   <span class="meta" style="margin:0 0 0 12px">Group:</span>${['all'].concat(groups).map(g => `<span class="chip ${TM.group === g ? 'on' : ''}" data-group="${esc(g)}">${g === 'all' ? 'All' : esc(g)}</span>`).join('')}</div></div>`;
  const list = termList();
  if (TM.mode === 'glossary') {
    groups.filter(g => TM.group === 'all' || g === TM.group).forEach(g => {
      h += `<h3>${esc(g)}</h3><div class="card">` + all.filter(t => t.group === g).map(t => `<div class="term"><b>${esc(t.term)}</b>${t.gist ? `<div class="gist">${esc(t.gist)}</div>` : ''}<div>${esc(t.def)}</div>${t.scene ? `<div class="hook"><b>In action:</b> ${esc(t.scene)}</div>` : ''}${t.hook ? `<div class="hook">${esc(t.hook)}</div>` : ''}${t.fig ? figHTML(t.fig) : ''}<div class="cite">${esc(fmtCite(t.cite))}</div></div>`).join('') + '</div>';
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
    h += `<div class="meta">${seen}/${list.length} cards seen · ${st ? 'seen ' + st.n + '×' : 'new'}</div><div class="card"><div class="flash"><div class="meta">${esc(t.group)}</div>`;
    // front of the card: the situation, with the term hidden; the term and its meaning come on the back
    if (t.scene && !TM.shown) h += `<div class="meta" style="margin-bottom:6px">Which term is this?</div><div style="font-size:18px">${esc(t.scene)}</div>`;
    else h += `<div class="t">${esc(t.term)}</div>${t.gist ? `<div class="gist" style="margin-top:4px">${esc(t.gist)}</div>` : ''}`;
    if (TM.shown) h += `<div style="text-align:left;margin-top:14px">${t.scene ? `<div class="hook" style="margin-bottom:6px"><b>In action:</b> ${esc(t.scene)}</div>` : ''}<div>${esc(t.def)}</div>${t.hook ? `<div class="hook" style="color:var(--muted);margin-top:4px">${esc(t.hook)}</div>` : ''}${t.fig ? figHTML(t.fig) : ''}<div class="cite">${esc(fmtCite(t.cite))}</div></div>
      <div class="row" style="justify-content:center;margin-top:14px"><button class="btn" data-fc="sure">Knew it</button><button class="btn ghost" data-fc="unsure">Not sure</button><button class="btn ghost" data-fc="wrong">Did not know</button></div>`;
    else h += `<div class="row" style="justify-content:center;margin-top:14px"><button class="btn" id="fcshow">${t.scene ? 'Show the term' : 'Show definition'}</button></div>`;
    h += `</div></div>`;
  } else {
    const pool = tq.filter(q => TM.group === 'all' || (TOPIC.TERMS.subs.find(s => s.id === q.sub) || {}).name === TM.group);
    h += `<div class="card"><p>${pool.length} questions in three forms: recognise the term from a situation, pick the term's one-line meaning, or name the term from its definition. They count toward Weak spots under the skill "Terms".</p>
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
function vRef() { $('#view').innerHTML = `<div class="tablewrap">${expandFigs(REFERENCE_HTML)}</div>`; stackTables($('#view')); }
function vTell() {
  $('#view').innerHTML = `<div class="tablewrap">${expandFigs(TELL_HTML)}</div>
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
/* Static pages carry figure markers: <!--FIG:key-->, <!--IMG:key--> (one of his
   poll figures) and <!--GRAPH:{json}--> (a drawn dose–response plot). */
/* Step-through figures: buttons under a figure move between its data-step groups.
   Moving between two steps animates the change: a shape or label present in both
   steps glides from its old position to its new one (matched by data-k, else by
   tag + text + class in order), shapes that are new fade in, and shapes that are
   gone fade out. Only end positions are set here; CSS does the motion, and
   prefers-reduced-motion turns it off. */
let ANIM = null;   // the one figure playing: {t: interval, b: its Play button}
const RM = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const leafSel = 'text,circle,rect,ellipse,line,polyline,polygon,path';
const sigOf = el => el.getAttribute('data-k') || [el.tagName, el.getAttribute('class') || '', el.tagName === 'text' ? el.textContent : (el.getAttribute('fill') || '')].join('|');
const centre = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2, r.width + r.height]; };
function stepTo(fig, from, to) {
  const steps = [...fig.querySelectorAll('.st')], svg = fig.querySelector('svg');
  fig.querySelectorAll('.st-out').forEach(n => n.remove());
  const old = from != null && from !== to ? steps[from] : null;
  const before = new Map();   // signature → queue of old screen positions
  if (old && !RM()) old.querySelectorAll(leafSel).forEach(el => { if (el.classList.contains('capt')) return; const k = sigOf(el), c = centre(el); if (c[2]) (before.get(k) || before.set(k, []).get(k)).push({el, c}); });
  steps.forEach((s, j) => s.classList.toggle('on', j === to));
  fig.querySelectorAll('.sdot').forEach((d, j) => { d.classList.toggle('on', j === to); d.setAttribute('aria-current', j === to ? 'step' : 'false'); });
  if (RM()) return;
  const now = steps[to], scale = svg.viewBox.baseVal.width / (svg.getBoundingClientRect().width || 1), used = new Set();
  const leaves = [...now.querySelectorAll(leafSel)];
  leaves.forEach(el => { el.classList.remove('fadein', 'glide'); el.style.transform = ''; });
  svg.getBoundingClientRect();                        // restart the fade-in animations
  leaves.forEach(el => {
    if (el.classList.contains('capt')) { el.classList.add('fadein'); return; }
    const q = before.get(sigOf(el)), m = q && q.shift();
    if (!m) { el.classList.add('fadein'); return; }
    used.add(m.el);
    const c = centre(el), dx = (m.c[0] - c[0]) * scale, dy = (m.c[1] - c[1]) * scale;
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
    el.style.transform = `translate(${dx}px,${dy}px)`;
    el.getBoundingClientRect();                       // commit the start position
    el.classList.add('glide'); el.style.transform = '';
  });
  if (!old) return;
  // the shapes that are gone fade out from where they were
  const ghost = old.cloneNode(true); ghost.classList.remove('on', 'st'); ghost.classList.add('st-out'); ghost.removeAttribute('data-step');
  const oldLeaves = [...old.querySelectorAll(leafSel)], ghostLeaves = [...ghost.querySelectorAll(leafSel)];
  oldLeaves.forEach((el, k) => { if (used.has(el) || el.classList.contains('capt')) ghostLeaves[k].remove(); });
  svg.appendChild(ghost); setTimeout(() => ghost.remove(), 600);
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-anim] button'); if (!b) return;
  const fig = b.closest('figure'); const steps = [...fig.querySelectorAll('.st')]; if (!steps.length) return;
  const cur = steps.findIndex(s => s.classList.contains('on')), n = steps.length;
  const playBtn = fig.querySelector('[data-go="play"]');
  const stop = () => { if (ANIM) { clearInterval(ANIM.t); ANIM.b.textContent = '▶ Play all'; ANIM = null; } };
  const go = b.dataset.go;
  if (go === 'play') {
    const same = ANIM && ANIM.b === b; stop(); if (same) return;
    b.textContent = '❚❚ Pause'; stepTo(fig, null, 0);
    ANIM = {b, t: setInterval(() => {
      if (!document.body.contains(fig)) return stop();
      const i = steps.findIndex(s => s.classList.contains('on'));
      if (i >= n - 1) return stop();
      stepTo(fig, i, i + 1); if (i + 1 === n - 1) stop();
    }, 3200)};
    return;
  }
  if (ANIM && ANIM.b === playBtn) stop();
  if (go === 'replay') return stepTo(fig, cur > 0 ? cur - 1 : null, cur);
  if (go === 'dot') return stepTo(fig, cur, +b.dataset.i);
  stepTo(fig, cur, (cur + (+go) + n) % n);
});
/* A question's or term's figure; the static GPCR figure brings the step-through with it. */
const figHTML = key => (typeof FIG === 'function' && key) ? FIG(key) + (key === 'gpcr-steps' ? FIG('gpcr-anim') : '') : '';
function expandFigs(html) {
  return html
    .replace(/<!--FIG:([\w-]+)-->/g, (m, k) => FIG(k))
    .replace(/<!--IMG:([\w-]+)-->/g, (m, k) => IMG[k] ? `<figure class="fig"><img src="${IMG[k]}" alt="${esc(k)}"></figure>` : '')
    .replace(/<!--GRAPH:([\s\S]*?)-->/g, (m, j) => { try { return FIG.graph(JSON.parse(j)); } catch (e) { return ''; } });
}
function vGuide() {
  $('#view').innerHTML = `<div class="tablewrap">${expandFigs(typeof GUIDE_HTML === 'undefined' ? '' : GUIDE_HTML)}</div>`;
  stackTables($('#view'));
  document.querySelectorAll('.guidenav a').forEach(a => a.onclick = e => { const t = document.querySelector(a.getAttribute('href')); if (t) { e.preventDefault(); t.scrollIntoView({behavior: 'smooth'}); } });
}

/* ---------- Progress: profile, pace, export ---------- */
function download(name, text, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], {type}));
  a.download = name; document.body.appendChild(a); a.click(); a.remove();
}
/* ---------- Question map: every question in the bank, colour-coded ----------
   unseen = never answered; right / wrong = the outcome of the most recent
   answer (quiz, exam simulator or term quiz). Colour is backed by a mark
   (✓, ✗, blank) so the states read without colour. */
/* The most recent answer per question, built once per render. */
let LAST = null, LAST_N = -1;
function lastMap() {
  if (LAST && LAST_N === S.log.length) return LAST;
  LAST = {}; S.log.forEach(e => LAST[e.id] = e.ok); LAST_N = S.log.length; return LAST;
}
function lastOutcome(q) {
  const st = S.q[q.id];
  if (!st || !st.n) return 'unseen';
  const last = lastMap();
  if (q.id in last) return last[q.id] ? 'right' : 'wrong';
  return st.ok >= st.n ? 'right' : 'wrong';
}
/* ---------- Graphs: drill one of his figures ---------- */
const GR = typeof GRAPHS === 'undefined' ? [] : GRAPHS;
const MISS = {
  shift: ['Shift', 'Did the curve move left or right of the point of reference (the agonist alone)?'],
  baseline: ['Baseline', 'Where does the curve start? Only an agonist raises it; only an inverse agonist takes it down to 0.'],
  emax: ['Emax', 'Does the maximum change? Only an irreversible antagonist, or an allosteric antagonist that affects efficacy, lowers it.'],
  symmetry: ['Symmetry', 'Are the steps equal for equal doses (competitive, no limit) or shrinking and then stopping (allosteric, saturable)?'],
  direction: ['Helping or hurting', 'Is the second drug helping the agonist (left) or making life more difficult (right)?'],
  potency: ['Potency', 'Which curve reaches the response at the lowest dose? The one furthest left (smallest ED50).'],
  efficacy: ['Efficacy', 'Which curve reaches the highest maximum? Potency says nothing about how high it goes.'],
  affinity: ['Affinity', 'The smaller the Kd, the greater the affinity; check the units (nM < µM < mM).'],
  class: ['Drug class', 'The reading was right; match it to the class: which drug on the list produces that curve?'],
  steps: ['Steps', 'Signal → receptor → transducer (G protein) → effector → second messenger; GDP off, GTP on.'],
  ti: ['Therapeutic index', 'TI = LD50 / ED50: find both 50% points on the quantal curves and divide; the larger, the safer.'],
  read: ['Read the figure', 'Axes, legend and point of reference first: which curve is the agonist alone?']
};
const graphOf = img => GR.find(g => g.key === img || (g.alts || []).includes(img));
let GQ = null;   // image key → questions, built once
const graphQs = g => { if (!GQ) { GQ = {}; examPool().forEach(q => { if (q.img) (GQ[q.img] = GQ[q.img] || []).push(q); }); } return [g.key].concat(g.alts || []).flatMap(k => GQ[k] || []); };
/* What the student skipped on this figure: the miss tags of the wrong options they chose, across the log. */
function missTally(g) {
  const ids = {}; graphQs(g).forEach(q => ids[q.id] = q);
  const t = {};
  S.log.forEach(e => {
    const q = ids[e.id]; if (!q || e.ok || q.type === 'match') return;
    [].concat(e.picked == null ? [] : e.picked).forEach(i => { const o = q.options[i]; if (o && !o.correct && o.miss) t[o.miss] = (t[o.miss] || 0) + 1; });
  });
  return Object.entries(t).sort((a, b) => b[1] - a[1]);
}
function graphFeedback(q, st) {
  const g = q.img && graphOf(q.img); if (!g) return '';
  let h = '';
  if (!st.ok && q.type !== 'match') {
    const picked = [].concat(st.picked == null ? [] : st.picked instanceof Set ? [...st.picked] : st.picked);
    const misses = [...new Set(picked.map(i => q.options[i]).filter(o => o && !o.correct && o.miss).map(o => o.miss))];
    if (misses.length) h += `<div class="gskip"><b>The question you skipped:</b> ${misses.map(m => { const d = MISS[m] || [m, '']; return `<span class="chip on">${esc(d[0])}</span> ${esc(d[1])}`; }).join('<br>')}</div>`;
  }
  h += `<details class="gread"${st.ok ? '' : ' open'}><summary>Read this figure his way</summary><ul>${(g.read || []).map(r => `<li>${esc(r)}</li>`).join('')}</ul>${g.method ? `<div class="meta">${esc(g.method)}</div>` : ''}</details>`;
  return h;
}
function graphDone() {
  const g = GR.find(x => x.key === Q.graph);
  const tally = missTally(g);
  $('#view').innerHTML = `<div class="card"><h2>${esc(g.title)}: pass finished</h2><p>${Q.right} of ${Q.done} correct.</p>
    ${tally.length ? `<p><b>What you keep skipping on this figure</b></p><ul>${tally.map(([m, n]) => { const d = MISS[m] || [m, '']; return `<li><b>${esc(d[0])}</b> (${n}×): ${esc(d[1])}</li>`; }).join('')}</ul>` : '<p>No reading question was skipped on this pass.</p>'}
    <div class="row"><button class="btn" id="gagain">Drill this figure again</button><button class="btn ghost" id="gback">All figures</button></div></div>`;
  $('#gagain').onclick = () => startGraph(g.key);
  $('#gback').onclick = () => go('graphs');
}
function startGraph(key) {
  const g = GR.find(x => x.key === key); if (!g) return;
  const list = shuffle(graphQs(g)); if (!list.length) { alert('No questions on this figure yet.'); return; }
  startQuiz(list, g.title, 'pass', {graph: key});
}
/* Diagrams: every process diagram and step-through figure on one page, grouped,
   with a contents list at the top that jumps to each one. */
const DIAGRAMS = [
  ['Signal transduction', ['gpcr-steps', 'gpcr-anim', 'galpha-chain', 'galpha-anim', 'rtk-steps', 'rtk-anim', 'rtk-scenarios-anim']],
  ['Two drugs at one receptor: how the curve moves', ['shift-competitive-anim', 'shift-irreversible-anim', 'shift-inverse-anim', 'shift-fafa-anim', 'shift-fapa-anim', 'shift-fapa-down-anim', 'shift-allo-agonist-anim', 'shift-allo-antagonist-anim']],
  ['Indirect antagonists and drug combinations', ['ind-ssri-anim', 'ind-snri-anim', 'ind-ache-anim', 'ind-carbidopa-anim', 'ind-pde-anim', 'ind-ras-anim', 'enhance-anim']],
  ['Receptor regulation', ['reg-chain', 'desens-rapid-anim', 'desens-long-anim', 'upreg-anim', 'downreg-anim']]
];
const DG_NAMES = {'rtk-steps': 'RTK activation: the five steps'};
function vDiagrams() {
  const have = new Set(typeof FIG === 'function' ? FIG.keys() : []);
  const titleOf = html => { const m = html.match(/<text class="title"[^>]*>([^<]*)</); return m ? m[1] : ''; };
  let toc = '', body = '';
  DIAGRAMS.forEach(([name, keys], gi) => {
    const ks = keys.filter(k => have.has(k)); if (!ks.length) return;
    const figs = ks.map(k => { const html = FIG(k); return {k, html, t: (DG_NAMES[k] || titleOf(html) || k).replace(/ ?·? step by step/, '')}; });
    toc += `<div class="card"><b>${esc(name)}</b><div class="row" style="flex-wrap:wrap;margin-top:6px">${figs.map(f => `<a class="chip" href="#dg-${f.k}" data-dg="${f.k}">${esc(f.t)}${/-anim$/.test(f.k) ? ' ▶' : ''}</a>`).join('')}</div></div>`;
    body += `<h3 id="dgg-${gi}">${esc(name)}</h3><div class="shiftgrid">${figs.map(f => `<div id="dg-${f.k}">${f.html}</div>`).join('')}</div>`;
  });
  $('#view').innerHTML = `<h2>Diagrams</h2><p class="sub">Every process diagram in one place. ▶ marks a step-through figure: use Next, Play all or the step dots under it.</p>${toc}${body}`;
  $('#view').querySelectorAll('[data-dg]').forEach(a => a.onclick = e => { e.preventDefault(); const el = document.getElementById('dg-' + a.dataset.dg); if (el) el.scrollIntoView({behavior: RM() ? 'auto' : 'smooth', block: 'start'}); });
}
function vGraphs() {
  const pool = examPool();
  if (!GR.length) { $('#view').innerHTML = '<h2>Graphs</h2><div class="empty">No figures are registered.</div>'; return; }
  let h = `<h2>Graphs</h2><p class="sub">His own figures (PollEV, Jeopardy, the 9/30 review, Part 3). Pick one and every question written on it is asked in turn; a wrong answer names the reading question you skipped, and the end of the pass shows which one you keep skipping.</p>`;
  const groups = {}; GR.forEach(g => (groups[g.group || 'Other'] = groups[g.group || 'Other'] || []).push(g));
  Object.entries(groups).forEach(([name, gs]) => {
    h += `<h3>${esc(name)}</h3><div class="ggrid">`;
    gs.forEach(g => {
      const qs = graphQs(g); const c = {unseen: 0, right: 0, wrong: 0}; qs.forEach(q => c[lastOutcome(q)]++);
      const tally = missTally(g).slice(0, 3);
      h += `<div class="card gcard"><div class="gthumb">${IMG[g.key] ? `<img src="${IMG[g.key]}" alt="${esc(g.title)}">` : ''}</div>
        <div><b>${esc(g.title)}</b><div class="meta">${qs.length} questions · ${c.unseen} unseen · ${c.right} right · ${c.wrong} wrong${g.source ? ' · ' + esc(g.source) : ''}</div>
        ${g.asks && g.asks.length ? `<div class="meta">He asks: ${g.asks.map(esc).join(' · ')}</div>` : ''}
        ${tally.length ? `<div class="meta">You skip: ${tally.map(([m, n]) => esc((MISS[m] || [m])[0]) + ' ×' + n).join(', ')}</div>` : ''}
        <div class="row" style="margin-top:6px"><button class="btn" data-g="${g.key}" ${qs.length ? '' : 'disabled'}>Drill this figure</button>
        ${c.wrong ? `<button class="btn ghost" data-g="${g.key}" data-wrong="1">Redo wrong</button>` : ''}</div></div></div>`;
    });
    h += '</div>';
  });
  $('#view').innerHTML = h;
  document.querySelectorAll('[data-g]').forEach(b => b.onclick = () => {
    const g = GR.find(x => x.key === b.dataset.g);
    if (b.dataset.wrong) { const list = graphQs(g).filter(q => lastOutcome(q) === 'wrong'); if (!list.length) return; startQuiz(shuffle(list), g.title + ' · wrong', 'pass', {graph: g.key}); }
    else startGraph(g.key);
  });
}

let MAPF = {show: 'all'};
function vMap() {
  const pool = examPool();
  const counts = {unseen: 0, right: 0, wrong: 0};
  const state = {}; pool.forEach(q => { state[q.id] = lastOutcome(q); counts[state[q.id]]++; });
  const mark = {unseen: '', right: '✓', wrong: '✗'};
  const tile = q => { const k = state[q.id], st = S.q[q.id]; return `<button class="qt ${k}${isFlagged(q.id) ? ' flagged' : ''}" data-q="${q.id}" title="${esc(q.stem)}"><span class="qm">${mark[k]}</span><span class="qid">${esc(q.id)}${isFlagged(q.id) ? ' ⚑' : ''}</span>${st && st.n ? `<span class="qn">${st.ok}/${st.n}</span>` : ''}<span class="qs">${esc(q.stem.slice(0, 64))}${q.stem.length > 64 ? '…' : ''}</span></button>`; };
  let h = `<h2>Question map</h2>
  <p class="sub">Every question in the bank, grouped by lecture and concept. The colour and mark show the most recent answer; a count shows correct answers over attempts. Click a tile to open that question.</p>
  <div class="card"><div class="row">
    ${[['all', `All ${pool.length}`], ['unseen', `Unseen ${counts.unseen}`], ['right', `Right ${counts.right}`], ['wrong', `Wrong ${counts.wrong}`], ['flagged', `⚑ Flagged ${pool.filter(q => isFlagged(q.id)).length}`]].map(([k, l]) => `<span class="chip ${MAPF.show === k ? 'on' : ''} lg-${k}" data-show="${k}">${l}</span>`).join('')}
  </div>
  <div class="row" style="margin-top:8px"><span class="qt unseen lg"><span class="qm"></span>unseen</span><span class="qt right lg"><span class="qm">✓</span>last answer right</span><span class="qt wrong lg"><span class="qm">✗</span>last answer wrong</span></div></div>`;
  TOPICS.forEach(t => {
    const tq = pool.filter(q => q.topic === t.id);
    if (!tq.length) return;
    const tc = {unseen: 0, right: 0, wrong: 0}; tq.forEach(q => tc[state[q.id]]++);
    const sel = tq.filter(q => MAPF.show === 'all' || (MAPF.show === 'flagged' ? isFlagged(q.id) : state[q.id] === MAPF.show));
    h += `<div class="card"><div class="topicrow"><span><b>${esc(t.name)}</b><small>${tq.length} questions · ${tc.unseen} unseen · ${tc.right} right · ${tc.wrong} wrong</small></span>
      <span class="row">${tq.some(q => isFlagged(q.id)) ? `<button class="btn ghost" data-drill="${t.id}" data-what="flagged">Drill flagged</button>` : ''}${tc.wrong ? `<button class="btn ghost" data-drill="${t.id}" data-what="wrong">Redo wrong</button>` : ''}${tc.unseen ? `<button class="btn ghost" data-drill="${t.id}" data-what="unseen">Drill unseen</button>` : ''}</span></div>`;
    const subs = (t.subs || []).slice();
    const known = new Set(subs.map(x => x.id));
    tq.forEach(q => { if (q.sub && !known.has(q.sub)) { known.add(q.sub); subs.push({id: q.sub, name: q.sub}); } });
    if (tq.some(q => !q.sub)) subs.push({id: null, name: 'Other'});
    subs.forEach(sb => {
      const sq = sel.filter(q => (q.sub || null) === sb.id);
      if (!sq.length) return;
      h += `<h4 class="mapsub">${esc(sb.name)}</h4><div class="qgrid">${sq.map(tile).join('')}</div>`;
    });
    if (!sel.length) h += `<p class="empty">Nothing in this section matches the filter.</p>`;
    h += '</div>';
  });
  $('#view').innerHTML = h;
  document.querySelectorAll('[data-show]').forEach(c => c.onclick = () => { MAPF.show = c.dataset.show; vMap(); });
  document.querySelectorAll('.qt[data-q]').forEach(b => b.onclick = () => startQuiz([byId[b.dataset.q]], 'From the question map', 'pass'));
  document.querySelectorAll('[data-drill]').forEach(b => b.onclick = () => {
    const list = pool.filter(q => q.topic === b.dataset.drill && (b.dataset.what === 'flagged' ? isFlagged(q.id) : state[q.id] === b.dataset.what));
    startQuiz(shuffle(list), `${(TOPIC[b.dataset.drill] || {}).name}: ${b.dataset.what}`, 'pass');
  });
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
  $('#setprof').onclick = () => { const v = $('#prof').value.trim(); if (!v) return; PROFILE = v; store.set(COURSE.ns + ':profile', v); S = loadState(); Q = null; endExam(); GQ = null; vData(); };
  $('#pace').onchange = e => { S.pace = e.target.value; save(); };
  $('#exp').onclick = () => download(`${COURSE.ns}-${PROFILE}.json`, JSON.stringify(S), 'application/json');
  $('#imp').onchange = e => { const f = e.target.files[0]; if (!f) return; f.text().then(t => { try { const o = JSON.parse(t); if (!o.q) throw 0; S = normalize(o); Q = null; endExam(); save(); vData(); } catch (err) { alert('That file is not a progress export.'); } }); };
  $('#expmiss').onclick = () => {
    const rows = [['id', 'topic', 'skill', 'answers', 'correct', 'stem', 'answer', 'cite']];
    pool.filter(q => S.q[q.id] && S.q[q.id].n > S.q[q.id].ok).forEach(q => rows.push([q.id, (TOPIC[q.topic] || {}).name, q.skill, S.q[q.id].n, S.q[q.id].ok, q.stem,
      (q.options || []).filter(o => o.correct).map(o => o.t).join(' | '), q.cite]));
    download(`${COURSE.ns}-missed.csv`, rows.map(r => r.map(c => '"' + String(c == null ? '' : c).replace(/"/g, '""') + '"').join(',')).join('\n'), 'text/csv');
  };
  $('#reset').onclick = () => { if (confirm('Erase all progress for this profile?')) { S = {q: {}, log: [], pace: COURSE.paceDefault, exams: [], flags: {}, layout: S.layout || 'one'}; save(); vData(); } };
}

document.addEventListener('keydown', e => {
  if (e.target && /INPUT|SELECT|TEXTAREA|BUTTON|A/.test(e.target.tagName)) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key;
  if (CUR === 'quiz' && Q && Q.cur && !Q.finished && Q.cur.type !== 'match' && S.layout !== 'all') {
    let n = -1;
    if (/^[1-9]$/.test(k)) n = +k - 1; else if (/^[a-jA-J]$/.test(k)) n = LETTERS.indexOf(k.toUpperCase());
    if (n >= 0 && !Q.answered) { const oi = Q.order[n]; if (oi != null) { pick(oi); e.preventDefault(); } return; }
    if (k === 'Enter') {
      e.preventDefault();
      if (!Q.answered) { if (Q.cur.multi) check(); }
      else finish(Q.ok ? 'sure' : 'wrong');
    }
  } else if (CUR === 'exam' && EX && !EX.done && S.layout !== 'all') {
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
