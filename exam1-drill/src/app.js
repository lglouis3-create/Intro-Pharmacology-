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
/* Stable identifiers: a renamed question or concept keeps its history. When an id or a concept
   changes, add the old → new pair here (ENGINE_UPGRADES.md, item 2). ID_ALIASES is applied to
   S.log, S.q and S.flags in normalize(); CONCEPT_ALIASES to S.c and to every concept lookup. */
const ID_ALIASES = {};
const CONCEPT_ALIASES = {};
const aliasId = id => ID_ALIASES[id] || id;
const conceptOf = q => CONCEPT_ALIASES[q.concept] || q.concept;
const CSTAT = ['unfamiliar', 'struggling', 'improving', 'mastered', 'returning', 'learning'];
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
  /* simg: a slide figure from the deck (Exam 3), read by the student; labels that print the answer are masked. */
  if (q.simg && IMG[q.simg]) h += `<figure class="fig stemfig"><img src="${IMG[q.simg]}" alt="${esc(q.simgAlt || 'figure from the slide')}"></figure>`;
  return h;
}
/* Slide ranges are stored as "~7–~12" (every number marked approximate);
   print the mark once per range. */
const fmtCite = s => String(s == null ? '' : s).replace(/–~/g, '–');
const BUILD = typeof BUILD_INFO === 'undefined' ? {} : BUILD_INFO;
const fmtDate = iso => { const d = new Date(iso); return isNaN(d) ? '' : d.toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'}); };
// the same style with the time: "Oct 10, 2026, 4:12 AM"
const fmtDateTime = t => { const d = new Date(t); return isNaN(d) ? '' : d.toLocaleString(undefined, {month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'}); };
// a change-log heading "2026-10-09 (title)" reads "Oct 9, 2026 (title)"; the date is a calendar day, so no time-zone shift
const fmtDay = t => String(t || '').replace(/^(\d{4})-(\d{2})-(\d{2})/, (m, y, mo, d) => new Date(+y, +mo - 1, +d).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'}));
// Calendar days between today and the exam date (local time), not hours rounded up.
function daysToExam() {
  const ex = active();
  if (!ex || !ex.when) return null;
  const day = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
  return Math.round((day(ex.when) - day(Date.now())) / (24 * 3600 * 1000));
}
function examCountdown() {
  const ex = active();
  const d = daysToExam();
  if (d == null) return '';
  const start = new Date(ex.when).getTime(), end = start + (ex.minutes || 0) * 60000, now = Date.now();
  if (now >= end) return 'This exam is over.';
  if (now >= start) return 'The exam is in progress.';
  if (d <= 0) return 'Exam day is today.';
  return `${d} day${d === 1 ? '' : 's'} until the exam.`;
}
/* On a phone a wide table becomes a stack of cards: each cell carries its
   column heading as a label (CSS shows it under 560px). */
function stackTables(root) {
  root.querySelectorAll('table').forEach(t => {
    let heads = [...t.querySelectorAll('thead th')].map(th => th.textContent.trim()), headRow = null;
    // a read-strip carries its headings in its first row (no thead); on a phone it stacks too, so words are not split mid-word
    if (!heads.length && t.classList.contains('readstrip')) { const r0 = t.querySelector('tr'); if (r0 && r0.children.length > 1 && [...r0.children].every(c => c.tagName === 'TH')) { headRow = r0; heads = [...r0.children].map(th => th.textContent.trim()); } }
    if (!heads.length) return;
    t.classList.add('stack'); if (headRow) headRow.classList.add('shead');
    t.querySelectorAll('tbody tr').forEach(tr => { if (tr !== headRow) [...tr.children].forEach((td, i) => { if (heads[i]) td.setAttribute('data-label', heads[i]); }); });
  });
}
const examOf = q => lectureOf(q).exam;

/* ---------- storage: localStorage with an in-memory fallback ---------- */
const MEM = {}, FAILED = new Set();   // FAILED: keys whose last write the browser refused; their value lives in MEM until a write succeeds
const store = {
  get(k) { if (FAILED.has(k)) return MEM[k] == null ? null : MEM[k]; try { const v = localStorage.getItem(k); return v == null ? (MEM[k] == null ? null : MEM[k]) : v; } catch (e) { return MEM[k] == null ? null : MEM[k]; } },
  // true when the browser kept it; false when storage is full or blocked (it is then kept for this visit only)
  set(k, v) { MEM[k] = v; try { localStorage.setItem(k, v); FAILED.delete(k); return true; } catch (e) { FAILED.add(k); return false; } },
  del(k) { delete MEM[k]; FAILED.delete(k); try { localStorage.removeItem(k); } catch (e) { /* nothing to remove */ } }
};
// an object kept in the store as JSON (an object handed to store.set would be saved as "[object Object]")
const storeObj = k => { const v = store.get(k); if (v && typeof v === 'object') return v; try { return JSON.parse(v || '{}') || {}; } catch (e) { return {}; } };
/* Progress that cannot be saved (storage full, blocked, or a private window) would be lost on
   reload without a word: say so once, and point to the export. */
let SAVE_WARNED = false;
function saveWarn() {
  if (SAVE_WARNED || !document.body) return; SAVE_WARNED = true;
  const d = document.createElement('div'); d.id = 'savewarn'; d.setAttribute('role', 'alert');
  d.innerHTML = 'This browser did not save your progress (storage is full or blocked). It is kept until you close the page: use <b>Progress → Export progress</b> to keep a copy. <button type="button" class="btn ghost">OK</button>';
  d.querySelector('button').onclick = () => d.remove();
  document.body.appendChild(d);
}
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
/* Saved or imported progress is checked field by field: an export from another version, or an
   edited file, must not break the scheduler or put markup on the page. */
const isObj = x => !!x && typeof x === 'object' && !Array.isArray(x);
const normalize = s => {
  s = isObj(s) ? s : {};
  s.q = isObj(s.q) ? s.q : {};
  // box is an index into the pace's steps (0…5): an edited export with box 99 would schedule nothing
  Object.keys(s.q).forEach(k => { const v = s.q[k]; if (!isObj(v)) { delete s.q[k]; return; } ['n', 'ok', 'box', 'due', 'last'].forEach(f => { v[f] = Number.isFinite(+v[f]) ? +v[f] : 0; }); v.box = Math.max(0, Math.min(5, Math.round(v.box))); });
  s.log = Array.isArray(s.log) ? s.log.filter(e => isObj(e) && typeof e.id === 'string') : [];
  s.pace = ['cram', 'weekly', 'semester'].includes(s.pace) ? s.pace : COURSE.paceDefault;
  s.exams = Array.isArray(s.exams) ? s.exams.filter(e => isObj(e) && Number.isFinite(+e.n) && +e.n > 0 && Number.isFinite(+e.score)).map(e => Object.assign(e, {n: +e.n, score: +e.score, t: +e.t || 0})) : [];
  s.flags = isObj(s.flags) ? s.flags : {};
  s.layout = s.layout === 'all' ? 'all' : 'one';
  // renamed questions: the old id's record moves to the new id (merged when both exist), as do its log entries and flag
  Object.keys(ID_ALIASES).forEach(o => {
    const n = ID_ALIASES[o], a = s.q[o], b = s.q[n];
    if (a) { s.q[n] = b ? {n: a.n + b.n, ok: a.ok + b.ok, box: Math.max(a.box, b.box), due: Math.max(a.due, b.due), last: Math.max(a.last, b.last)} : a; delete s.q[o]; }
    if (s.flags[o] != null) { if (s.flags[n] == null) s.flags[n] = s.flags[o]; delete s.flags[o]; }
  });
  s.log.forEach(e => { e.id = aliasId(e.id); });
  // per-concept records; missing (an older export) → null, rebuilt from the log by ensureC()
  if (isObj(s.c)) Object.keys(s.c).forEach(k => {
    const v = s.c[k]; if (!isObj(v) || !CSTAT.includes(v.s)) { delete s.c[k]; return; }
    v.m = +v.m || 0; v.box = Math.max(0, Math.min(5, Math.round(+v.box || 0))); v.due = +v.due || 0; v.r = v.r ? 1 : 0;
    v.hist = Array.isArray(v.hist) ? v.hist.filter(x => Array.isArray(x) && Number.isFinite(+x[0])).map(x => [+x[0], x[1] ? 1 : 0]).slice(-10) : [];
    const n = CONCEPT_ALIASES[k]; if (n && n !== k) { if (!s.c[n]) s.c[n] = v; delete s.c[k]; }
  }); else s.c = null;
  return s;
};
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
const save = () => { if (!store.set(KEY(), JSON.stringify(S))) saveWarn(); };
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
  const st = qs(id), steps = (PACES[S.pace] || PACES[COURSE.paceDefault] || PACES.cram).steps, now = Date.now();
  if (outcome === 'wrong' || outcome === 'guess') st.box = 0;
  else if (outcome === 'unsure') st.box = st.n > 1 ? Math.max(1, st.box) : 0;   // "not sure" on a first answer comes back soon, like a miss
  else st.box = Math.min(steps.length - 1, st.box + 1);
  st.due = now + steps[st.box];
  st.last = now;
}

/* ---------- views ---------- */
const VIEWS = [
  ['topics', 'Topics'], ['quiz', 'Quiz'], ['terms', 'Terms'], ['weak', 'Weak spots'], ['exam', 'Exam sim'], ['sa', 'Short answer'],
  ['graphs', 'Graphs'], ['diagrams', 'Diagrams'], ['scenes', 'Scenes'], ['map', 'Question map'], ['drugs', 'All drugs'], ['ref', 'Reference'], ['tell', 'Tell apart'], ['pair', 'Pair up'], ['rxq', 'Drug ↔ receptor'], ['ptab', 'Poisoning table'], ['guide', 'Guides'], ['readings', 'Readings'], ['data', 'Progress']
];
let CUR = 'topics';
/* Smith focus: one switch that keeps only the pages her exam uses, locks the exam to Exam 3, hides the other
   exams' groups and puts her own words about what to study at the top of Topics. Remembered per browser. */
// her current exam: the latest exam she teaches (Exam 3, then Exam 4); the poisoning table and short-answer pages are Exam 3 only
const FOCUS_KEY = COURSE.ns + ':focus', FOCUS_EXAM = Math.max(...COURSE.exams.filter(e => COURSE.lectures.some(l => l.exam === e.id && l.prof === 'Smith')).map(e => e.id));
const FOCUS_VIEWS = ['topics', 'quiz', 'terms', 'weak', 'exam', 'guide', 'readings', 'ref', 'tell', 'data'].concat(FOCUS_EXAM === 3 ? ['sa', 'ptab'] : []);
const focusOn = () => (store.get(FOCUS_KEY) || '1') === '1' && COURSE.exams.some(e => e.id === FOCUS_EXAM);
function setFocus(on) {
  store.set(FOCUS_KEY, on ? '1' : '0');
  if (on) { const was = store.get(EXAM_KEY); if (was && was !== String(FOCUS_EXAM)) store.set(COURSE.ns + ':focusprev', was); store.set(EXAM_KEY, String(FOCUS_EXAM));
    if (typeof Q !== 'undefined' && Q && Q.list.some(q => examOf(q) !== FOCUS_EXAM)) { Q = null; RET.length = 0; backBtn(); } }   // the way back led into the dropped quiz
  else { const prev = store.get(COURSE.ns + ':focusprev'); if (prev) { store.set(EXAM_KEY, prev); store.del(COURSE.ns + ':focusprev'); } }
  if (on && !FOCUS_VIEWS.includes(CUR)) { go('topics'); return; }
  nav(); VIEWFN[CUR] && VIEWFN[CUR]();
}
const focusBtn = () => COURSE.exams.some(e => e.id === FOCUS_EXAM) ? `<button type="button" id="focusbtn" class="focusbtn ${focusOn() ? 'on' : ''}" aria-pressed="${focusOn()}" title="Show only what Dr. Smith's Exam ${FOCUS_EXAM} uses">${focusOn() ? '★ Smith focus: on' : '☆ Smith focus'}</button>` : '';
function nav() {
  const fo = focusOn();
  $('#nav').innerHTML = focusBtn() + VIEWS.filter(([k]) => (k !== 'guide' || (typeof GUIDE_HTML !== 'undefined' && GUIDE_HTML.trim())) && (!fo || FOCUS_VIEWS.includes(k)))
    .map(([k, l]) => `<button type="button" data-v="${k}" class="${k === CUR ? 'on' : ''}"${k === CUR ? ' aria-current="page"' : ''}>${l}</button>`).join('') + themeSelect();
  const fb = $('#focusbtn'); if (fb) fb.onclick = () => setFocus(!focusOn());
  $('#nav').querySelectorAll('button[data-v]').forEach(b => b.onclick = e => {
    const v = b.dataset.v;
    if (!go(v)) return;           // the learner chose to stay in the exam: keep the way back too
    RET.length = 0; backBtn();
    // the nav is redrawn, so a keyboard user would lose their place: put focus back on this tab
    if (e.detail === 0) { const nb = $('#nav').querySelector(`[data-v="${v}"]`); if (nb) nb.focus(); }
  });
  $('#theme').onchange = e => applyTheme(e.target.value);
  // on a phone the tabs scroll sideways in one row: keep the open one in sight
  const on = $('#nav .on'), nv = $('#nav'); if (on && nv.scrollWidth > nv.clientWidth) { const x = on.offsetLeft - nv.offsetLeft; if (x < nv.scrollLeft || x + on.offsetWidth > nv.scrollLeft + nv.clientWidth) nv.scrollLeft = Math.max(0, x - 40); }
  hdrVar();
}
/* The header's height, for things that stick under it (the exam clock on the all-on-one-page paper). */
const hdrVar = () => { const hd = document.querySelector('header'); if (hd) document.documentElement.style.setProperty('--hdr', hd.getBoundingClientRect().height + 'px'); };
window.addEventListener('resize', hdrVar);
const clearView = () => { const v = $('#view'); v.onclick = null; v.onchange = null; v.oninput = null; const t = document.getElementById('totop'); if (t) t.hidden = true; };
/* Leaving a page: back to the top, and the floating buttons and scroll watcher of the old page go. */
function leaveView() {
  window.scrollTo(0, 0); clearView();
  if (typeof rdStop === 'function') rdStop();
  if (typeof xBack === 'function') xBack(null);
  const tb = document.getElementById('tback'); if (tb) tb.remove();
  if (TIO) { TIO.disconnect(); TIO = null; }
  if (typeof playStop === 'function') playStop();
  if (typeof scenesStop === 'function') scenesStop();
  if (typeof gwStop === 'function') gwStop();
}
/* Open a view. Returns false when the learner stays in a running exam. `back` is set by the
   "Back to …" button: the exam then reopens on its result page, not on a new paper. */
function go(v, back) {
  if (CUR === 'exam' && EX && !EX.done && v !== 'exam' && !confirm('Leave the exam in progress? It will be kept until you return.')) return false;
  CUR = v; nav(); leaveView();
  (back && v === 'exam' && EX && EX.done ? examResult : VIEWFN[v])();
  pushNav({v});
  return true;
}
/* The browser's back gesture moves within the drill: every page change (and the diagram panel) is a history
   entry; back closes the panel, else follows the drill's own way back, else returns to Topics. */
let NAV_READY = false, POPPING = false, SKIPPOP = 0;
function pushNav(st) { if (!NAV_READY || POPPING) return; try { history.pushState(Object.assign({drill: 1}, st), ''); } catch (e) {} }
window.addEventListener('popstate', () => {
  if (SKIPPOP) { SKIPPOP--; return; }
  POPPING = true;
  try {
    if (ANTI) antiClose(true);
    else if (RET.length) goBack();
    else if (CUR !== 'topics' && !go('topics')) { POPPING = false; pushNav({v: CUR}); }   // stayed in the exam: keep an entry to come back to
  } finally { POPPING = false; }
});
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
/* Exam 2: keyword rows first (tested against concept, sub and tags), then the lecture's guide. */
const G2 = (n, t) => ['guide', 'guide2-' + n, 'Guide: ' + t];
const LINKS2 = [
  [/tracing|compound|drug-?x|skm-|ne-drug-b|epi-two|gi-tracing/, [G2(8, 'reading his tracings')]],
  [/ach-?bolus|reflex-?tachy|polygraph|atropine-pretreat/, [G2(8, 'reading his tracings'), ['diagrams', 'dg-e2-ach-bolus-anim', 'Diagram: the acetylcholine bolus tracing'], ['tell', 'tell2-heart', 'Tell apart: M2 vs β1 at the heart']]],
  [/dual-?innerv|single-?innerv|gut-?alpha2|alpha2-?gut|constipat|innervation-?map|exceptions?/, [G2(1, 'the autonomic layout'), ['diagrams', 'dg-e2-innervation-map', 'Diagram: dual innervation and its exceptions'], ['diagrams', 'dg-e2-gi-dual-anim', 'Diagram: the gut α2 brake'], ['tell', 'tell2-organ', 'Tell apart: SNS vs PNS per organ']]],
  [/baroref|barorecept|stand-?up|orthostat/, [G2(1, 'the autonomic layout'), ['diagrams', 'dg-e2-baroreflex-anim', 'Diagram: baroreceptor reflex'], ['ref', 'ref2-2', 'Reference: organ by organ, PNS vs SNS'], ['tell', 'tell2-organ', 'Tell apart: SNS vs PNS per organ']]],
  [/cross-?talk|ach-?bolus|atropine-pretreat|m2-vs-b1|predominant-?tone/, [G2(7, 'β drugs, epinephrine, NE'), ['tell', 'tell2-heart', 'Tell apart: M2 vs β1 at the heart'], ['diagrams', 'dg-crosstalk', 'Diagram: cross-talk']]],
  [/who-runs|\borgan\b|dual-?innerv|predominant|lungs-pns|receptor-map|g-?protein-table/, [G2(1, 'the autonomic layout'), ['ref', 'ref2-2', 'Reference: organ by organ, PNS vs SNS'], ['ref', 'ref2-1', 'Reference: receptors and G proteins'], ['tell', 'tell2-organ', 'Tell apart: SNS vs PNS per organ']]],
  [/organophos|echothio|pralidox/, [G2(3, 'cholinesterase inhibitors'), ['diagrams', 'dg-e2-op-anim', 'Diagram: organophosphates'], ['tell', 'tell2-ache', 'Tell apart: reversible vs irreversible']]],
  [/stigmine|cholinesterase|\bache\b|donepezil|rivastig|physostig|neostig|edroph/, [G2(3, 'cholinesterase inhibitors'), ['diagrams', 'dg-e2-chol-synapse-anim', 'Diagram: cholinergic synapse'], ['tell', 'tell2-ache', 'Tell apart: reversible vs irreversible'], ['tell', 'tell2-direct-indirect', 'Tell apart: direct vs indirect']]],
  [/nn-?vs-?nm|varenicl|alpha4|α4|\bnn\b|ganglion/, [G2(2, 'nicotinic receptors, NMJ'), ['ref', 'ref2-nmj', 'Reference: NMJ drugs'], ['tell', 'tell2-nn-nm', 'Tell apart: Nn vs Nm']]],
  [/succinyl|curare|rocuron|pancuron|\bnm\b|nicotinic|botul|depolariz/, [G2(2, 'nicotinic receptors, NMJ'), ['diagrams', 'dg-e2-nmj-anim', 'Diagram: neuromuscular junction'], ['ref', 'ref2-nmj', 'Reference: NMJ drugs'], ['tell', 'tell2-depolarizing', 'Tell apart: depolarizing vs not']]],
  [/muscarin|atropine|scopol|pilocarp|carbachol|bethanechol|oxybut|trospium|solifen|tiotrop|ipratrop|benztrop|dumbbel/, [G2(4, 'muscarinic drugs'), ['diagrams', 'dg-e2-musc-map', 'Diagram: muscarinic receptors'], ['ref', 'ref2-chol', 'Reference: muscarinic drugs'], ['tell', 'tell2-antimuscarinic', 'Tell apart: the antimuscarinics']]],
  [/nitric|nitro|sildenafil|\bpde\b|cgmp|\bsgc\b|\bnos\b/, [G2(9, 'nitric oxide'), ['diagrams', 'dg-e2-no-pathway-anim', 'Diagram: nitric oxide'], ['ref', 'ref2-no', 'Reference: nitric oxide drugs'], ['tell', 'tell2-nitrate-pde', 'Tell apart: nitrate vs PDE inhibitor']]],
  [/renin|angiotens|\bace\b|ace-inhib|\barbs?\b|losartan|valsartan|lisinopril|captopril|aliskiren|spironol|eplerenone|aldosteron|bradykinin|hyperkal|raas/, [G2(10, 'RAAS'), ['diagrams', 'dg-e2-raas-anim', 'Diagram: RAAS drugs'], ['ref', 'ref2-4', 'Reference: what each RAAS drug changes'], ['ref', 'ref2-raas', 'Reference: RAAS drugs'], ['tell', 'tell2-raas', 'Tell apart: ACE inhibitor vs ARB vs others']]],
  [/phenoxybenz|hypertensive-?crisis/, [G2(6, 'α1 and α2 drugs'), ['ref', 'ref2-alpha', 'Reference: α drugs'], ['tell', 'tell2-alpha', 'Tell apart: α1 vs α2 drugs']]],
  [/\bmao|phenelzine|selegil|tyramine/, [G2(5, 'indirect-acting adrenergic drugs'), ['diagrams', 'dg-e2-maoi-tyramine-anim', 'Diagram: MAO inhibitors and tyramine'], ['ref', 'ref2-ind', 'Reference: indirect-acting drugs'], ['tell', 'tell2-indirect-adrenergic', 'Tell apart: cocaine vs amphetamine vs MAOI']]],
  [/cocaine|amphet|methylphen|reuptake|\bnet\b|ephedrine/, [G2(5, 'indirect-acting adrenergic drugs'), ['diagrams', 'dg-e2-adr-synapse-anim', 'Diagram: adrenergic synapse'], ['ref', 'ref2-ind', 'Reference: indirect-acting drugs'], ['tell', 'tell2-indirect-adrenergic', 'Tell apart: cocaine vs amphetamine vs MAOI']]],
  [/blocker|olol\b|metoprolol|propranolol|carvedilol|labetalol|atenolol|pindolol|nebivolol/, [G2(7, 'β drugs, epinephrine, NE'), ['diagrams', 'dg-e2-beta-blockers', 'Diagram: β blockers (MAN)'], ['ref', 'ref2-beta', 'Reference: β drugs'], ['tell', 'tell2-beta-blockers', 'Tell apart: β blockers (MAN)']]],
  [/epinephrine|reversal|epi-/, [G2(7, 'β drugs, epinephrine, NE'), ['diagrams', 'dg-e2-epi-reversal-anim', 'Diagram: epinephrine at α1 and β2'], ['ref', 'ref2-beta', 'Reference: β drugs'], ['tell', 'tell2-catecholamines', 'Tell apart: the catecholamines']]],
  [/beta|β|albuterol|dobutamine|isoproterenol|mirabegron|catechol|-terol/, [G2(7, 'β drugs, epinephrine, NE'), ['ref', 'ref2-beta', 'Reference: β drugs'], ['tell', 'tell2-catecholamines', 'Tell apart: the catecholamines']]],
  [/alpha|α|phenylephr|prazosin|tamsulosin|clonidine|mirtazap|oxymetaz/, [G2(6, 'α1 and α2 drugs'), ['ref', 'ref2-alpha', 'Reference: α drugs'], ['tell', 'tell2-alpha', 'Tell apart: α1 vs α2 drugs']]]
];
const BY_LECTURE2 = {L07: G2(1, 'the autonomic layout'), L07ref: ['ref', 'ref2-2', 'Reference: organ by organ, PNS vs SNS'], L08: G2(2, 'nicotinic receptors, NMJ'), L09: G2(4, 'muscarinic drugs'), L10: G2(5, 'indirect-acting adrenergic drugs'), L11: G2(7, 'β drugs, epinephrine, NE'), L12: G2(10, 'RAAS'), PE2: G2(1, 'the autonomic layout')};
const TERM_SUB2 = {g6: G2(1, 'the autonomic layout'), g7: G2(1, 'the autonomic layout'), g8: G2(4, 'muscarinic drugs'), g9: G2(6, 'α1 and α2 drugs'), g10: G2(9, 'nitric oxide'), g11: G2(10, 'RAAS')};
const DL2_SUB = {nmj: G2(2, 'nicotinic receptors, NMJ'), chol: G2(4, 'muscarinic drugs'), adr: G2(6, 'α1 and α2 drugs'), no: G2(9, 'nitric oxide'), raas: G2(10, 'RAAS')};
const DRUGS_LINK = ['drugs', 'drugs-top', 'All drugs: both lists in one table'];
function linksFor(q) { let l = linksFor0(q); if (examOf(q) === 3) l = routeBySlide3(q, l); else if (examOf(q) === 1 || examOf(q) === 2) l = routeByWords12(q, l); return q.lecture === 'DL1' || q.lecture === 'DL2' ? l.concat([DRUGS_LINK]) : l; }
/* Exam 3 (Dr. Smith): each section of the L13 bank maps to the guide section written from her objective. */
const G3 = (n, t) => ['guide', 'guide3-' + n, 'Guide: ' + t];
const SUB3 = {defs: [G3(1, 'definitions'), ['ref', 'ref3-1', 'Reference: the words'], ['tell', 'tell3-words', 'Tell apart: the words']], princ: [G3(2, 'the five principles'), ['ref', 'ref3-2', 'Reference: the five principles']], source: [G3(3, 'source')],
  route: [G3(4, 'exposure'), ['ref', 'ref3-3', 'Reference: routes'], ['tell', 'tell3-words', 'Tell apart: common vs effective route']], duration: [G3(4, 'exposure'), ['ref', 'ref3-4', 'Reference: durations'], ['tell', 'tell3-words', 'Tell apart: durations']], freq: [G3(4, 'exposure'), ['ref', 'ref3-5', 'Reference: frequency and half-life']],
  admet: [G3(5, 'ADMET and acetaminophen'), ['ref', 'ref3-6', 'Reference: acetaminophen'], ['tell', 'tell3-words', 'Tell apart: bioactivation vs detoxification']], dose: [G3(6, 'dose and LD50'), ['ref', 'ref3-7', 'Reference: the LD50 table']],
  curves: [G3(7, 'dose–response curves'), ['ref', 'ref3-8', 'Reference: curve types'], ['tell', 'tell3-curves', 'Tell apart: individual vs population']], shape: [G3(7, 'dose–response curves'), ['ref', 'ref3-8', 'Reference: curve types'], ['tell', 'tell3-curves', 'Tell apart: U-shapes and thresholds']],
  indices: [G3(8, 'indices, target, the reading'), ['ref', 'ref3-9', 'Reference: TI, MOS, MOE'], ['tell', 'tell3-curves', 'Tell apart: TI vs MOS vs MOE']], reading: [G3(8, 'the reading')]};
const TERM_SUB3 = G3(1, 'definitions');
/* Later Exam 3 lectures: keys are "<lecture>:<sub>" (filled in below, next to each lecture's sections). */
const LINKS3 = {"L14:potency": [["guide", "guide3-l14-1", "Guide: potency, ED/TD/LD and the indices"], ["ref", "ref3-l14-2", "Reference: potency and the three curves"], ["tell", "tell3-l14", "Tell apart: Day 14"]], "L14:edtdld": [["guide", "guide3-l14-1", "Guide: potency, ED/TD/LD and the indices"], ["ref", "ref3-l14-2", "Reference: potency and the three curves"], ["tell", "tell3-l14", "Tell apart: Day 14"]], "L14:indices": [["guide", "guide3-l14-1", "Guide: potency, ED/TD/LD and the indices"], ["ref", "ref3-l14-1", "Reference: TI, MOS, MOE"], ["tell", "tell3-l14", "Tell apart: Day 14"]], "L14:target": [["guide", "guide3-l14-2", "Guide: target and mechanism of action"], ["ref", "ref3-l14-2", "Reference: potency and the three curves"], ["tell", "tell3-l14", "Tell apart: Day 14"]], "L14:reading": [["guide", "guide3-l14-3", "Guide: the reading discussed"], ["ref", "ref3-l14-3", "Reference: the reading by principle"], ["tell", "tell3-l14", "Tell apart: Day 14"]], "L14:general": [["guide", "guide3-l14-4", "Guide: undesired effects, general concepts"], ["ref", "ref3-l14-4", "Reference: the general-concept pairs"], ["tell", "tell3-l14", "Tell apart: Day 14"]], "L14:interact": [["guide", "guide3-l14-4", "Guide: undesired effects, general concepts"], ["ref", "ref3-l14-4", "Reference: the general-concept pairs"], ["tell", "tell3-l14", "Tell apart: Day 14"]], "L14:tolerance": [["guide", "guide3-l14-4", "Guide: undesired effects, general concepts"], ["ref", "ref3-l14-4", "Reference: the general-concept pairs"], ["tell", "tell3-l14", "Tell apart: Day 14"]], "L14:variation": [["guide", "guide3-l14-4", "Guide: undesired effects, general concepts"], ["ref", "ref3-l14-4", "Reference: the general-concept pairs"], ["tell", "tell3-l14", "Tell apart: Day 14"]], "L14:ontarget": [["guide", "guide3-l14-5", "Guide: on-target and off-target"], ["ref", "ref3-l14-5", "Reference: on- and off-target examples"], ["tell", "tell3-l14", "Tell apart: Day 14"]], "L14:nonorgan": [["guide", "guide3-l14-6", "Guide: non-organ-specific endpoints"], ["ref", "ref3-l14-6", "Reference: non-organ-specific endpoints"], ["tell", "tell3-l14", "Tell apart: Day 14"]], "L15:pulm": [["guide", "guide3-l15-1", "Guide: pulmonary toxicity"], ["ref", "ref3-l15-1", "Reference: pulmonary toxicity"], ["tell", "tell3-l15", "Tell apart: organ toxicity and treating poisonings"]], "L15:neuro": [["guide", "guide3-l15-2", "Guide: neurotoxicity"], ["ref", "ref3-l15-2", "Reference: neurotoxicity"], ["tell", "tell3-l15", "Tell apart: organ toxicity and treating poisonings"]], "L15:hepat": [["guide", "guide3-l15-3", "Guide: why the liver is susceptible; kinds of liver injury"], ["ref", "ref3-l15-3", "Reference: hepatotoxicity"], ["tell", "tell3-l15", "Tell apart: organ toxicity and treating poisonings"]], "L15:zones": [["guide", "guide3-l15-4", "Guide: liver zones, oxygen and CYP2E1"], ["ref", "ref3-l15-3", "Reference: hepatotoxicity"], ["tell", "tell3-l15", "Tell apart: organ toxicity and treating poisonings"]], "L15:nephro": [["guide", "guide3-l15-5", "Guide: nephrotoxicity"], ["ref", "ref3-l15-4", "Reference: nephrotoxicity"], ["tell", "tell3-l15", "Tell apart: organ toxicity and treating poisonings"]], "L15:immune": [["guide", "guide3-l15-6", "Guide: idiosyncratic and immunologic responses; her four polls"], ["ref", "ref3-l15-5", "Reference: idiosyncratic and immunologic responses"], ["tell", "tell3-l15", "Tell apart: organ toxicity and treating poisonings"]], "L15:polls": [["guide", "guide3-l15-6", "Guide: idiosyncratic and immunologic responses; her four polls"], ["ref", "ref3-l15-3", "Reference: hepatotoxicity"], ["tell", "tell3-l15", "Tell apart: organ toxicity and treating poisonings"]], "L15:odkin": [["guide", "guide3-l15-7", "Guide: overdose changes kinetics"], ["ref", "ref3-l15-6", "Reference: overdose kinetics and pharmacodynamics"], ["tell", "tell3-l15", "Tell apart: organ toxicity and treating poisonings"]], "L15:odpd": [["guide", "guide3-l15-8", "Guide: overdose changes pharmacodynamics"], ["ref", "ref3-l15-6", "Reference: overdose kinetics and pharmacodynamics"], ["tell", "tell3-l15", "Tell apart: organ toxicity and treating poisonings"]], "L15:approach": [["guide", "guide3-l15-9", "Guide: three angles, four toxicokinetic methods, preventing absorption"], ["ref", "ref3-l15-7", "Reference: treatment approaches and preventing absorption"], ["tell", "tell3-l15", "Tell apart: organ toxicity and treating poisonings"]], "L15:absorb": [["guide", "guide3-l15-9", "Guide: three angles, four toxicokinetic methods, preventing absorption"], ["ref", "ref3-l15-7", "Reference: treatment approaches and preventing absorption"], ["tell", "tell3-l15", "Tell apart: organ toxicity and treating poisonings"]], "L15:guide": [["guide", "guide3-l15-10", "Guide: evidence-based guidelines; what moved to 10/19"], ["ref", "ref3-l15-8", "Reference: evidence-based guidelines"], ["tell", "tell3-l15", "Tell apart: organ toxicity and treating poisonings"]], "L16:absorbrev": [["guide", "guide3-l16-1", "Guide: Preventing absorption revisited; inhibit bioactivation"], ["ref", "ref3-l16-1", "Reference: Toxicokinetic treatments II"], ["tell", "tell3-l16", "Tell apart: Day 16"]], "L16:bioact": [["guide", "guide3-l16-1", "Guide: Preventing absorption revisited; inhibit bioactivation"], ["ref", "ref3-l16-1", "Reference: Toxicokinetic treatments II"], ["tell", "tell3-l16", "Tell apart: Day 16"]], "L16:detect": [["guide", "guide3-l16-2", "Guide: Recognizing the poisoning: blood draws, toxidromes"], ["ref", "ref3-l16-1", "Reference: Toxicokinetic treatments II"], ["tell", "tell3-l16", "Tell apart: Day 16"]], "L16:metab": [["guide", "guide3-l16-3", "Guide: Enhance metabolism: cyanide and acetaminophen"], ["ref", "ref3-l16-1", "Reference: Toxicokinetic treatments II"], ["tell", "tell3-l16", "Tell apart: Day 16"]], "L16:renal": [["guide", "guide3-l16-4", "Guide: Enhance elimination: ion trapping, extracorporeal methods"], ["ref", "ref3-l16-1", "Reference: Toxicokinetic treatments II"], ["tell", "tell3-l16", "Tell apart: Day 16"]], "L16:extra": [["guide", "guide3-l16-4", "Guide: Enhance elimination: ion trapping, extracorporeal methods"], ["ref", "ref3-l16-1", "Reference: Toxicokinetic treatments II"], ["tell", "tell3-l16", "Tell apart: Day 16"]], "L16:inact": [["guide", "guide3-l16-5", "Guide: Inactivation: chelators, antivenoms, digoxin immune Fab"], ["ref", "ref3-l16-2", "Reference: Inactivation of poisons"], ["tell", "tell3-l16", "Tell apart: Day 16"]], "L16:antibody": [["guide", "guide3-l16-5", "Guide: Inactivation: chelators, antivenoms, digoxin immune Fab"], ["ref", "ref3-l16-2", "Reference: Inactivation of poisons"], ["tell", "tell3-l16", "Tell apart: Day 16"]], "L16:pharmrec": [["guide", "guide3-l16-6", "Guide: Pharmacological treatment: the four categories"], ["ref", "ref3-l16-3", "Reference: Pharmacological treatment"], ["tell", "tell3-l16", "Tell apart: Day 16"]], "L16:pharmsite": [["guide", "guide3-l16-6", "Guide: Pharmacological treatment: the four categories"], ["ref", "ref3-l16-3", "Reference: Pharmacological treatment"], ["tell", "tell3-l16", "Tell apart: Day 16"]], "L16:guideline": [["guide", "guide3-l16-7", "Guide: The beta-blocker and calcium channel blocker guideline discussion"], ["ref", "ref3-l16-4", "Reference: The guidelines, her key"], ["tell", "tell3-l16", "Tell apart: Day 16"]], "L16:table": [["guide", "guide3-l16-8", "Guide: The poisoning table and what moved to 10/20"], ["ref", "ref3-l16-4", "Reference: The guidelines, her key"], ["tell", "tell3-l16", "Tell apart: Day 16"]], "TBL3:cardio": [["ref", "ref3-tbl-1", "Reference: poisoning treatment table (her key)"], ["ptab", "ptab-top", "Drill: poisoning table"]], "TBL3:cns": [["ref", "ref3-tbl-1", "Reference: poisoning treatment table (her key)"], ["ptab", "ptab-top", "Drill: poisoning table"]], "TBL3:metabolic": [["ref", "ref3-tbl-1", "Reference: poisoning treatment table (her key)"], ["ptab", "ptab-top", "Drill: poisoning table"]], "TBL3:ironop": [["ref", "ref3-tbl-1", "Reference: poisoning treatment table (her key)"], ["ptab", "ptab-top", "Drill: poisoning table"]], "TBL3:match": [["ref", "ref3-tbl-1", "Reference: poisoning treatment table (her key)"], ["ptab", "ptab-top", "Drill: poisoning table"]], "TBL3:about": [["ref", "ref3-tbl-1", "Reference: poisoning treatment table (her key)"], ["ptab", "ptab-top", "Drill: poisoning table"]], "L17:history": [["guide", "guide3-l17-1", "Guide: Why pharmacogenomics: primaquine, the timeline, twin studies"], ["ref", "ref3-l17-1", "Reference: Pharmacogenomics history and the four target areas"], ["tell", "tell3-l17", "Tell apart: Day 17 pharmacogenomics terms"]], "L17:defs": [["guide", "guide3-l17-2", "Guide: Pharmacogenetics vs pharmacogenomics; impact, uses and limitations"], ["ref", "ref3-l17-2", "Reference: Pharmacogenomics terminology"], ["tell", "tell3-l17", "Tell apart: Day 17 pharmacogenomics terms"]], "L17:impact": [["guide", "guide3-l17-2", "Guide: Pharmacogenetics vs pharmacogenomics; impact, uses and limitations"], ["ref", "ref3-l17-1", "Reference: Pharmacogenomics history and the four target areas"], ["tell", "tell3-l17", "Tell apart: Day 17 pharmacogenomics terms"]], "L17:targets": [["guide", "guide3-l17-3", "Guide: The four target areas; PK, PD and the two outcome buckets"], ["ref", "ref3-l17-1", "Reference: Pharmacogenomics history and the four target areas"], ["tell", "tell3-l17", "Tell apart: Day 17 pharmacogenomics terms"]], "L17:pkpd": [["guide", "guide3-l17-3", "Guide: The four target areas; PK, PD and the two outcome buckets"], ["ref", "ref3-l17-1", "Reference: Pharmacogenomics history and the four target areas"], ["tell", "tell3-l17", "Tell apart: Day 17 pharmacogenomics terms"]], "L17:variant": [["guide", "guide3-l17-4", "Guide: Wild type, variant, polymorphism, rare variant, SNP"], ["ref", "ref3-l17-2", "Reference: Pharmacogenomics terminology"], ["tell", "tell3-l17", "Tell apart: Day 17 pharmacogenomics terms"]], "L17:allele": [["guide", "guide3-l17-5", "Guide: Allele, genotype, phenotype, functional significance"], ["ref", "ref3-l17-2", "Reference: Pharmacogenomics terminology"], ["tell", "tell3-l17", "Tell apart: Day 17 pharmacogenomics terms"]], "L17:genophen": [["guide", "guide3-l17-5", "Guide: Allele, genotype, phenotype, functional significance"], ["ref", "ref3-l17-2", "Reference: Pharmacogenomics terminology"], ["tell", "tell3-l17", "Tell apart: Day 17 pharmacogenomics terms"]], "L17:haplo": [["guide", "guide3-l17-6", "Guide: Haplotype, allele and genotype frequency, Hardy-Weinberg"], ["ref", "ref3-l17-2", "Reference: Pharmacogenomics terminology"], ["tell", "tell3-l17", "Tell apart: Day 17 pharmacogenomics terms"]], "L17:freq": [["guide", "guide3-l17-6", "Guide: Haplotype, allele and genotype frequency, Hardy-Weinberg"], ["ref", "ref3-l17-2", "Reference: Pharmacogenomics terminology"], ["tell", "tell3-l17", "Tell apart: Day 17 pharmacogenomics terms"]], "L17:scope": [["guide", "guide3-l17-7", "Guide: The exam vote, and what was not reached on 10/20"]], "L17:nomen": [["guide", "guide3-l17-7", "Guide: The exam vote, and what was not reached on 10/20"], ["ref", "ref3-l17-3", "Reference: Nomenclature and variant types not yet taught"], ["tell", "tell3-l17", "Tell apart: Day 17 pharmacogenomics terms"]], "L17:types": [["guide", "guide3-l17-7", "Guide: The exam vote, and what was not reached on 10/20"], ["ref", "ref3-l17-3", "Reference: Nomenclature and variant types not yet taught"], ["tell", "tell3-l17", "Tell apart: Day 17 pharmacogenomics terms"]], "GRG3:ccb": [["guide", "guide3-l16-7", "Guide: the guideline discussion"], ["ref", "ref3-l16-4", "Reference: the guideline windows, her key"], ["tell", "tell3-l16", "Tell apart: Day 16"]], "GRG3:bb": [["guide", "guide3-l16-7", "Guide: the guideline discussion"], ["ref", "ref3-l16-4", "Reference: the guideline windows, her key"], ["tell", "tell3-l16", "Tell apart: Day 16"]], "GRG3:both": [["guide", "guide3-l16-7", "Guide: the guideline discussion"], ["ref", "ref3-l16-4", "Reference: the guideline windows, her key"], ["tell", "tell3-l16", "Tell apart: Day 16"]], "RMK3:source": [["guide", "guide3-l14-3", "Guide: the reading discussed"], ["ref", "ref3-l14-3", "Reference: the reading by principle"], ["tell", "tell3-l14", "Tell apart: Day 14"]], "RMK3:exposure": [["guide", "guide3-l14-3", "Guide: the reading discussed"], ["ref", "ref3-l14-3", "Reference: the reading by principle"], ["tell", "tell3-l14", "Tell apart: Day 14"]], "RMK3:adme": [["guide", "guide3-l14-3", "Guide: the reading discussed"], ["ref", "ref3-l14-3", "Reference: the reading by principle"], ["tell", "tell3-l14", "Tell apart: Day 14"]], "RMK3:dose": [["guide", "guide3-l14-3", "Guide: the reading discussed"], ["ref", "ref3-l14-3", "Reference: the reading by principle"], ["tell", "tell3-l14", "Tell apart: Day 14"]], "RMK3:target": [["guide", "guide3-l14-3", "Guide: the reading discussed"], ["ref", "ref3-l14-3", "Reference: the reading by principle"], ["tell", "tell3-l14", "Tell apart: Day 14"]]};
const BY_LECTURE3 = {L14: [G3('l14-1', 'Day 14: indices, the reading, toxic responses')], L15: [G3('l15-1', 'Day 15: organ toxicity, treating poisonings')], L16: [G3('l16-1', 'Day 16: treating poisonings II, the guideline discussion')], L17: [G3('l17-1', 'Day 17: introduction to pharmacogenomics')]};
/* An Exam 3 term question links where its term is taught: 10/9 terms to the definitions; later terms to the
   sections of the lecture questions that name the term (the most common target), else that lecture's guide. */
const termName = q => { const t = /^term-/.test(q.concept || '') && typeof TERMS !== 'undefined' ? TERMS.find(x => x.id === q.concept.slice(5)) : null; return t ? t.term.replace(/\s*\([^)]*\)\s*$/, '') : ''; };
function termLinks3(q) {
  const L = q.lecture, nm = termName(q);
  if (L === 'L13' || !L) return [TERM_SUB3, ['ref', 'ref3-1', 'Reference: the words']];
  if (nm) {
    const re = new RegExp('\\b' + nm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i'), tally = new Map();
    const slug = q.concept.slice(5);
    QUESTIONS.filter(x => x.lecture === L && x.topic !== 'TERMS').forEach(x => {
      const w = (String(x.concept || '').includes(slug) ? 5 : 0) + (re.test((x.options || []).filter(o => o.correct).map(o => o.t).join(' ')) ? 3 : 0) + (re.test(x.stem) ? 2 : 0) + (re.test(x.teach || '') ? 1 : 0);
      const l = w && LINKS3[L + ':' + x.sub]; if (l) { const k = JSON.stringify(l); tally.set(k, (tally.get(k) || 0) + w); } });
    // the guide section that names the term most often wins ties and near-ties (a definitions section over a history one)
    const inGuide = k => { const id = (JSON.parse(k).find(l => l[0] === 'guide') || [])[1]; const m = id && GUIDE3_HTML.match(new RegExp('<section[^>]*id="' + id + '"[\\s\\S]*?</section>')); return m ? (m[0].match(new RegExp(re.source, 'gi')) || []).length : 0; };
    // strongest signal: the guide section whose sources name the slide the term is cited to
    const slides = [...String(q.cite || '').matchAll(/‘([^’]+)’/g)].map(x => x[1].split(': ').pop()).filter(t => t.length > 6);
    const guideHas = (k, str) => { const id = (JSON.parse(k).find(l => l[0] === 'guide') || [])[1]; const m = id && GUIDE3_HTML.match(new RegExp('<section[^>]*id="' + id + '"[\\s\\S]*?</section>')); return !!m && m[0].includes(str); };
    Object.keys(LINKS3).filter(k => k.startsWith(L + ':')).forEach(k => { const v = JSON.stringify(LINKS3[k]); if (slides.some(t => guideHas(v, t))) tally.set(v, (tally.get(v) || 0) + 10); });
    if (tally.size) return JSON.parse([...tally].map(([k, v]) => [k, v + 2 * inGuide(k)]).sort((a, b) => b[1] - a[1])[0][0]);
  }
  return BY_LECTURE3[L] || [G3('scope', 'what Exam 3 tests')];
}
/* Exam 3 routing. A guide section ends with the questions it explains ("Questions L16-010 to L16-013"), so a
   lecture question goes to the section that lists it. Otherwise (terms, keys, quizzes) the question's cited slide
   decides: the guide section or reference table naming that slide (one title containing the other, since the two
   shorten titles differently), and for a term, the section naming the term. With no match the mapped link stays,
   and no link is added that the map did not give. */
let SEC3 = null, SEC4 = null;
function sec3() {
  if (SEC3) return SEC3;
  const parse = (h, sel) => { const d = new DOMParser().parseFromString('<div>' + h + '</div>', 'text/html');
    return [...d.querySelectorAll(sel)].map(a => { const text = mkRegion(a).map(r => r.textContent).join(' ');
      const qids = new Set();
      for (const m of text.matchAll(/Questions? ([A-Z0-9]+-\d+(?:(?:,| to|, and| and) [A-Z0-9]+-\d+)*)/g)) {
        const parts = m[1].split(/,\s*(?:and\s+)?|\s+and\s+/);
        parts.forEach(pt => { const r = pt.trim().match(/^([A-Z0-9]+)-(\d+)(?: to [A-Z0-9]+-(\d+))?$/); if (!r) return;
          const a0 = +r[2], b0 = r[3] ? +r[3] : a0, w = r[2].length; for (let n = a0; n <= b0; n++) qids.add(r[1] + '-' + String(n).padStart(w, '0')); }); }
      return {id: a.id, h: ((a.querySelector('h3') || a).textContent || '').trim().replace(/^\d+\.\s*/, ''), text, titles: [...text.matchAll(/‘([^’]{6,})’/g)].map(x => x[1]), qids}; }); };
  SEC3 = {guide: typeof GUIDE3_HTML === 'undefined' ? [] : parse(GUIDE3_HTML, 'section[id^="guide3-"]'),
          ref: typeof REFERENCE3_HTML === 'undefined' ? [] : parse(REFERENCE3_HTML, 'h3[id^="ref3-"]')};
  return SEC3;
}
function routeBySlide3(q0, links) {
  const q = q0.lecture === 'QZ3' && q0.dupOf ? (QUESTIONS.find(x => x.id === q0.dupOf) || q0) : q0;   // her quiz item routes as the lecture question it repeats
  const cites = [...String(q.cite || '').matchAll(/‘([^’]+)’/g)].map(x => x[1].trim()).filter(t => t.length > 5);
  const nm = termName(q).toLowerCase(), out = links.slice(), low = x => x.toLowerCase();
  // the same title scores 3; a section title that ends the cited one (its specific part) 2; any other overlap 1
  const slideHit = s => cites.reduce((n, c) => n + Math.max(0, ...s.titles.map(t => { const a = low(c), b = low(t); return a === b ? 3 : a.endsWith(b) || b.endsWith(a) ? 2 : a.includes(b) || b.includes(a) ? 1 : 0; })), 0);
  for (const [v, word] of [['guide', 'Guide'], ['ref', 'Reference']]) {
    const secs = sec3()[v], i = out.findIndex(l => l[0] === v); if (!secs.length || i < 0) continue;
    const listed = secs.find(s => s.qids.has(q.id));
    let best = listed;
    if (!best) {
      const score = s => slideHit(s) * 2 + (nm && low(s.text).includes(nm) ? 1 : 0);   // 3 or more: one specific title match
      const cur = secs.find(s => s.id === out[i][1].split('@')[0]), top = secs.map(s => [s, score(s)]).sort((a, b) => b[1] - a[1])[0];
      if (top && top[1] >= 3 && !(cur && score(cur) >= top[1])) best = top[0];
    }
    if (best && best.id !== out[i][1].split('@')[0]) out[i] = [v, best.id, word + ': ' + best.h];
  }
  return out;
}
/* Exams 1 and 2 have no slide list per section, so a link moves only when another section of the same exam's guide
   or reference shares far more of the question's words (the term, the correct answer, the concept, the stem):
   at least 2.5 times the mapped section's score and a clear match in its own right. The two catch-all reference
   tables never take a link this way. */
const SEC12 = {}, ROUTE12 = new Map(), CATCHALL = new Set(['ref2-1', 'ref2-3']);
function sec12(ex, v) {
  const k = ex + v; if (SEC12[k]) return SEC12[k];
  // top-level consts are not window properties, so each page is named directly
  const h = ex === 1 ? (v === 'guide' ? (typeof GUIDE_HTML === 'string' ? GUIDE_HTML : '') : (typeof REFERENCE_HTML === 'string' ? REFERENCE_HTML : ''))
    : (v === 'guide' ? (typeof GUIDE2_HTML === 'string' ? GUIDE2_HTML : '') : (typeof REFERENCE2_HTML === 'string' ? REFERENCE2_HTML : ''));
  const d = new DOMParser().parseFromString('<div>' + h + '</div>', 'text/html');
  const re = new RegExp('^' + v + (ex === 1 ? '' : ex) + '-');
  return (SEC12[k] = [...d.querySelectorAll('[id]')].filter(e => re.test(e.id) && (e.tagName === 'SECTION' || /^H[1-6]$/.test(e.tagName))).map(a => ({id: a.id,
    h: ((a.querySelector('h3') || a).textContent || '').trim().replace(/^\d+\.\s*/, ''),
    blocks: mkRegion(a).flatMap(r => r.matches('li, tr, dd, p, blockquote') ? [r] : [...r.querySelectorAll('li, tr, dd, p, blockquote')])
      .filter(e => !e.querySelector('li, tr, p') && e.textContent.trim().length > 20 && !e.closest('figure, thead, .sub, small, .cite')).map(e => e.textContent.toLowerCase())})));
}
function routeByWords12(q, links) {
  if (ROUTE12.has(q.id)) return ROUTE12.get(q.id);
  const ex = examOf(q), m = new Map(), nm = termName(q).toLowerCase(), out = links.slice();
  mkWords(q.stem, 1, m); mkWords(String(q.concept || '').replace(/-/g, ' '), 2, m);
  (q.options || []).filter(o => o.correct).forEach(o => mkWords(o.t, 3, m)); (q.pairs || []).forEach(x => { mkWords(x.l, 2, m); mkWords(x.r, 2, m); });
  const sc = sec => Math.max(0, ...sec.blocks.map(tx => { let s = 0; m.forEach((w, k) => { if (tx.includes(k)) s += w; }); if (nm && tx.includes(nm)) s += 6; return s / Math.sqrt(1 + tx.length / 300); }));
  for (const [v, word] of [['guide', 'Guide'], ['ref', 'Reference']]) {
    const i = out.findIndex(l => l[0] === v); if (i < 0) continue;
    const secs = sec12(ex, v), cur = secs.find(s => s.id === out[i][1].split('@')[0]); if (!cur) continue;
    const own = sc(cur), top = secs.filter(s => !CATCHALL.has(s.id)).map(s => [s, sc(s)]).sort((a, b) => b[1] - a[1])[0];
    if (top && top[0].id !== cur.id && top[1] >= 6 && top[1] >= 2.5 * own) out[i] = [v, top[0].id, word + ': ' + top[0].h];
  }
  ROUTE12.set(q.id, out); return out;
}
/* Dr. Smith's spoken words read without fillers (um, uh, tag "OK?" and "right?", stutters such as "I, I"):
   the files keep the transcript word for word (every quote is checked against it); only the display is tidied. */
const TIDY_REPEAT = 'i|a|an|the|it|it\'s|we|we\'re|you|you\'re|they|they\'re|he|she|that|this|those|these|to|and|so|is|are|was|of|in|on|at|be|can|do|if|or|but|for|with|what|my|our|your|their|them|there|then|just|like|not|have|has|will|would';
function tidySpeech(s) {
  let t = ' ' + String(s).replace(/\.\.\./g, '…') + ' ', lead = /^\s*[a-z]/.test(s);   // keep "..." (words left out) apart from full stops
  t = t.replace(/([a-z,])\s+(?:um+|uh+|uhm|erm|hmm)\.\s+([A-Z][a-z])/g, (m, x, y) => x + ' ' + y.toLowerCase());   // "considered um. The": one sentence
  t = t.replace(/\b(?:um+|uh+|uhm|erm|hmm)\b[,.]?/gi, ' ');                                   // um, uh
  t = t.replace(/,?\s*\b(?:OK|okay)\b\s*[?!]+/gi, '.');                                        // tag "..., OK?"
  t = t.replace(/,?\s*\b(?:OK|okay)\b\s*\.(?=\s)/gi, '.');                                     // "..., OK."
  t = t.replace(/,\s*right\s*\?/gi, '.');                                                       // tag "..., right?"
  t = t.replace(/(^\s*|[.?!…]\s+)(?:OK|okay|all right|alright)\s*[,.]?\s+/gi, '$1');      // "OK, so" / "All right." opening a sentence
  t = t.replace(/,\s*(?:OK|okay)\s*,/gi, ',');                                                  // "..., OK, ..."
  t = t.replace(/\b(?:you know|I mean)\s*,\s*/gi, ' ').replace(/\blike\s*,\s*/gi, ' ');
  t = t.replace(new RegExp('\\b(' + TIDY_REPEAT + ')(?:,?\\s+\\1\\b)+', 'gi'), '$1');           // stutters: "I, I", "the the", "those, those"
  t = t.replace(/\s+([,.?!;:])/g, '$1').replace(/([,;:])(?:\s*[,;:])+/g, '$1').replace(/,\s*([.?!])/g, '$1')
       .replace(/([.?!])(?:\s*[.,])+/g, '$1').replace(/^\s*[,.;:]\s*/, '').replace(/\s{2,}/g, ' ').trim();
  t = t.replace(/([.?!]\s+)([a-z])/g, (m, a, b) => a + b.toUpperCase());                     // a sentence that now opens lower-case
  if (!lead && /^[a-z]/.test(t)) t = t[0].toUpperCase() + t.slice(1);
  return t.replace(/…/g, '...');
}
const tidyQuoted = s => typeof s === 'string' ? s.replace(/"([^"]{3,})"/g, (m, x) => '"' + tidySpeech(x) + '"').replace(/“([^”]{3,})”/g, (m, x) => '“' + tidySpeech(x) + '”') : s;
QUESTIONS.forEach(q => { if (q.prof !== 'Smith') return;
  if (q.quote) q.quote = tidySpeech(q.quote);
  ['teach', 'note'].forEach(k => { if (q[k]) q[k] = tidyQuoted(q[k]); });
  (q.options || []).forEach(o => { if (o.why) o.why = tidyQuoted(o.why); }); });
// the same for the quoted words in an HTML page (text only, never attributes); a quote may run across tags
function tidyHtml(html) {
  const d = new DOMParser().parseFromString('<div id="r">' + html + '</div>', 'text/html'), w = d.createTreeWalker(d.getElementById('r'), NodeFilter.SHOW_TEXT);
  let inQ = false;
  for (let n = w.nextNode(); n; n = w.nextNode()) {
    const parts = n.data.split(/(["“”])/); let changed = false;
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (p === '"') { inQ = !inQ; continue; } if (p === '“') { inQ = true; continue; } if (p === '”') { inQ = false; continue; }
      if (inQ && /\b(?:um+|uh+|OK|okay|right\s*\?|you know|I mean)\b|\b(\w+),? \1\b/i.test(p)) { const lead = p.match(/^\s*/)[0], tail = p.match(/\s*$/)[0], x = tidySpeech(p); parts[i] = lead + x + (x ? tail : ''); changed = true; }
    }
    if (changed) n.data = parts.join('');
  }
  return d.getElementById('r').innerHTML;
}
/* "Why" questions: written to ask the reason behind a concept (tag "why"), plus any other stem that asks why or what explains */
const WHY_RE = /\bwhy\b|what explains|best explains|what would happen|reason/i;
const whyPool = pool => pool.filter(q => !q.lowYield && ((q.tags || []).includes('why') || WHY_RE.test(q.stem)));
function linksFor0(q) {
  if (examOf(q) === 4 && typeof GUIDE4_HTML !== 'undefined') {
    // the section whose Sources line lists the question ("Questions L18-010 to L18-014"), else the lecture's first section
    if (!SEC4) { const d = new DOMParser().parseFromString('<div>' + GUIDE4_HTML + '</div>', 'text/html');
      SEC4 = [...d.querySelectorAll('section[id^="guide4-"]')].map(sec => { const text = sec.textContent, qids = new Set();
        for (const m of text.matchAll(/Questions? ([A-Z0-9]+-\d+(?:(?:,| to|, and| and) [A-Z0-9]+-\d+)*)/g)) m[1].split(/,\s*(?:and\s+)?|\s+and\s+/).forEach(pt => { const r = pt.trim().match(/^([A-Z0-9]+)-(\d+)(?: to [A-Z0-9]+-(\d+))?$/); if (!r) return; const w = r[2].length; for (let n = +r[2]; n <= (r[3] ? +r[3] : +r[2]); n++) qids.add(r[1] + '-' + String(n).padStart(w, '0')); });
        return {id: sec.id, h: ((sec.querySelector('h3') || sec).textContent || '').trim().replace(/^\d+\.\s*/, ''), qids}; }); }
    const hit = SEC4.find(x => x.qids.has(q.id)) || SEC4.find(x => x.id.startsWith('guide4-' + String(q.lecture || '').toLowerCase() + '-'));
    return hit ? [['guide', hit.id, 'Guide: ' + hit.h]] : [];
  }
  if (examOf(q) === 3 && typeof GUIDE3_HTML !== 'undefined') {
    if (q.topic === 'TERMS') return termLinks3(q);
    if (q.lecture === 'QZ3') { const t = QUESTIONS.find(x => x.id === q.dupOf) || QUESTIONS.find(x => x.lecture !== 'QZ3' && examOf(x) === 3 && x.concept === q.concept); if (t) return linksFor0(t); if (q.readingId === 'rodriguez-mozaz') return SUB3.reading; }   // her quiz items explain through the lecture question they repeat
    if (q.lecture !== 'L13') return LINKS3[q.lecture + ':' + q.sub] || BY_LECTURE3[q.lecture] || [G3('scope', 'what Exam 3 tests')];
    return SUB3[q.sub] || [G3('scope', 'what Exam 3 tests')];
  }
  if (examOf(q) === 2 && typeof GUIDE2_HTML !== 'undefined') {
    const key = [q.concept, q.sub, (q.tags || []).join(' '), q.img || ''].join(' ').toLowerCase();
    for (const [re, links] of LINKS2) if (re.test(key)) return links;
    if (q.lecture === 'DL2' && DL2_SUB[q.sub]) return [DL2_SUB[q.sub]];
    if (q.topic === 'TERMS' && TERM_SUB2[q.sub]) return [TERM_SUB2[q.sub]];
    return BY_LECTURE2[q.lecture] ? [BY_LECTURE2[q.lecture]].concat(q.lecture === 'L07' ? [BY_LECTURE2.L07ref, ['ref', 'ref2-1', 'Reference: receptors and G proteins']] : []) : [];
  }
  if (q.lecture === 'DL1') return [['guide', 'guide-8', 'Guide 8: the drug list'], ['ref', 'ref-druglist', 'Reference: the drug list']];
  const key = [q.concept, q.fg, q.sub, (q.tags || []).join(' ')].join(' ').toLowerCase();
  for (const [re, links] of LINKS) if (re.test(key)) return links;
  if (BY_GROUP[q.sub]) return [BY_GROUP[q.sub]];
  return BY_LECTURE[q.lecture] ? [BY_LECTURE[q.lecture]] : [];
}
/* Tiers (Exam 2, as he described them): Tier 1 predicts a receptor's effect, Tier 2 puts two drugs
   together, Tier 3 reverses a drug's effect, and each tier needs the ones below it. Questions of one
   ladder share `ladder`; climbing it asks them in tier order. The tier number is the field `level`
   (the older field `tier` holds the content tier and is unrelated). */
const ladderQs = key => QUESTIONS.filter(q => q.ladder === key).sort((a, b) => (a.level || 0) - (b.level || 0));
// "Build up" on a Tier 2 question climbs Tier 1 → 2 only (upto); "Climb" goes all the way
const climbLadder = (key, upto) => { const l = ladderQs(key).filter(q => !upto || (q.level || 0) <= upto); if (l.length) startQuiz(l, 'Ladder: ' + (l[0].ladderName || key), 'pass'); };
const ladderChip = q => q.ladder && ladderQs(q.ladder).length > 1 ? `<button type="button" class="chip" data-climb="${esc(q.ladder)}"${q.level > 1 ? ` data-upto="${q.level}"` : ''}>${q.level > 1 ? 'Build up: Tier 1 → ' + q.level + ' on this' : 'Climb this ladder to Tier 3'}</button>` : '';
const explainHTML = q => { const l = linksFor(q), c = ladderChip(q), ad = antiFor(q); return l.length || c || ad.length ? `<div class="row explain"><span class="meta" style="margin:0">Explain more:</span>${l.map(([v, a, t]) => `<button type="button" class="chip" data-jump="${v}:${a}" data-jq="${q.id}">${esc(t)}</button>`).join('')}${ad.map(d => antiChip(d, 'Diagram: ' + d.short)).join('')}${c}</div>` : ''; };
// ignored only on the exam's own pages; with an exam kept in the background, a quiz may still climb
document.addEventListener('click', e => { const b = e.target.closest('[data-climb]'); if (!b) return; if (CUR === 'exam' && EX && !EX.done) return; climbLadder(b.dataset.climb, +b.dataset.upto || 0); });
function jump(view, anchor) {
  RET.push({view: CUR, y: window.scrollY});
  if (!go(view)) { RET.pop(); return; }
  const [id, step] = String(anchor).split('@'), t = document.getElementById(id);
  if (t) { openTo(t); t.scrollIntoView({block: 'start'}); const off = hdrOff(); window.scrollBy(0, -off); settleOn(t, off, 60); }
  // "anchor@n": the step-through figure at the anchor opens on step n
  if (t && step != null) { const fig = t.querySelector('figure') || t.closest('figure'); const steps = fig ? [...fig.querySelectorAll('.st')] : []; const to = +step; if (steps[to]) { const cur = steps.findIndex(x => x.classList.contains('on')); if (cur !== to) stepTo(fig, cur, to); } }
  backBtn();
}
/* "Explain more" boxes the part of the target section that answers the question: the list items, table rows
   or paragraphs sharing the most words with the term, the correct answer, the concept and the stem (shorter
   blocks preferred), up to three; the window scrolls to the first. A section with no clear match gets no box. */
const MK_STOP = new Set('about above after again against also among answer because been before being below between both cannot could does doing during each from further have having here into itself just more most much must only other over same should some such than that their them then there these they this those through under until very were what when where which while whose will with would your which patient patients drug drugs dose following best statement true false select apply'.split(' '));
const mkWords = (s, w, m) => String(s || '').toLowerCase().replace(/<[^>]+>/g, ' ').split(/[^a-z0-9α-ω]+/).forEach(x => { if (x.length >= 4 && !MK_STOP.has(x)) m.set(x.slice(0, Math.max(4, x.length - 2)), Math.max(m.get(x.slice(0, Math.max(4, x.length - 2))) || 0, w)); });
function mkRegion(t) {
  if (!/^H[1-6]$/.test(t.tagName)) return [t];
  const out = [], lv = +t.tagName[1];
  for (let n = t.nextElementSibling; n && !(/^H[1-6]$/.test(n.tagName) && +n.tagName[1] <= lv); n = n.nextElementSibling) out.push(n);
  return out;
}
function markFor(qid, anchor) {
  document.querySelectorAll('.jqhl').forEach(e => e.classList.remove('jqhl'));
  const q = QUESTIONS.find(x => x.id === qid), t = document.getElementById(String(anchor).split('@')[0]);
  if (!q || !t) return;
  const m = new Map(), nm = termName(q);
  mkWords(q.stem, 1, m); mkWords(String(q.concept || '').replace(/-/g, ' '), 2, m);
  (q.options || []).filter(o => o.correct).forEach(o => mkWords(o.t, 3, m));
  (q.pairs || []).forEach(p => { mkWords(p.l, 2, m); mkWords(p.r, 2, m); });
  if (q.answer != null) mkWords(q.units, 2, m);
  const phrase = nm ? nm.toLowerCase() : '';
  const cands = mkRegion(t).flatMap(r => r.matches('li, tr, dd, p, blockquote') ? [r] : [...r.querySelectorAll('li, tr, dd, p, blockquote')])
    .filter(e => !e.querySelector('li, tr, p') && e.textContent.trim().length > 20 && !e.closest('figure, thead, .sub, small, .cite') && e.getClientRects().length
      && !/^\s*(Sources?|How she asks it|How he asks it|Questions?)\b/i.test(e.textContent));
  const sc = cands.map(e => { const tx = e.textContent.toLowerCase(); let s = 0; m.forEach((w, k) => { if (tx.includes(k)) s += w; }); if (phrase && tx.includes(phrase)) s += 6; return [e, s / Math.sqrt(1 + tx.length / 300), s]; })
    .filter(x => x[2] >= 5).sort((a, b) => b[1] - a[1]);
  if (!sc.length) return;
  const pick = sc.filter(x => x[1] >= 0.8 * sc[0][1]).slice(0, 2).map(x => x[0]);
  pick.forEach(e => e.classList.add('jqhl'));
  setTimeout(() => scrollToEl(pick[0]), 90);
}
const hdrOff = () => { const hd = document.querySelector('header'); return (hd ? hd.getBoundingClientRect().height : 0) + 8; };
/* Once a scroll has landed, sections rendered on the way (content-visibility: auto, sized by estimate until
   they are near the screen) can have moved the target by a screen or more: nudge the window onto it,
   a few times at most, starting `wait` ms after the scroll (longer after a smooth one). */
let SETTLE = 0;   // a later scroll cancels the settles of an earlier one (a Why? jump scrolls twice)
function settleOn(el, off, wait) {
  let n = 0; const my = ++SETTLE, top = () => el.getBoundingClientRect().top + window.scrollY - off;
  const settle = () => { if (my !== SETTLE || !document.body.contains(el)) return; if (Math.abs(top() - window.scrollY) > 2 && n++ < 4) { window.scrollTo({top: top(), behavior: 'auto'}); setTimeout(settle, 80); } };
  setTimeout(settle, wait);
}
function backBtn() {
  let b = document.getElementById('backbtn');
  if (!RET.length) { if (b) b.remove(); return; }
  if (!b) { b = document.createElement('button'); b.id = 'backbtn'; b.type = 'button'; b.className = 'btn'; document.body.appendChild(b); b.onclick = goBack; }
  b.textContent = backLabel();
}
const backLabel = () => '← Back to ' + ({topics: 'Topics', quiz: 'the question', exam: 'the exam', graphs: 'the figures', map: 'the map', terms: 'the terms', weak: 'Weak spots', tell: 'Tell apart', ref: 'the reference', guide: 'the guide', diagrams: 'the diagrams', drugs: 'the drug table', pair: 'Pair up', rxq: 'the receptor drill', ptab: 'the poisoning table drill', sa: 'short answer', scenes: 'the scenes', readings: 'the readings'}[(RET[RET.length - 1] || {}).view] || 'where you were');
function goBack() { const r = RET.pop(); if (!r) return; backBtn(); go(r.view, true); window.scrollTo(0, r.y);
  // cards sized by estimate (content-visibility) settle after layout: put the window back where it was, twice
  requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, r.y))); setTimeout(() => window.scrollTo(0, r.y), 150); }
document.addEventListener('click', e => { const j = e.target.closest('[data-jump]'); if (j) { const [v, a] = j.dataset.jump.split(':'); jump(v, a); if (j.dataset.jq) markFor(j.dataset.jq, a); } });
/* "view:anchor:group:key": jump to the page, then open that explanation card (the reference's "Why?" cards). */
document.addEventListener('click', e => { const j = e.target.closest('[data-jumpx]'); if (!j) return; const [v, a, g, k] = j.dataset.jumpx.split(':'); jump(v, a); const out = showExplain(g, k); if (out) scrollToEl(out.closest('.xpick')); });
const VIEWFN = {topics: vTopics, quiz: vQuiz, terms: vTerms, weak: vWeak, exam: vExam, map: vMap, graphs: vGraphs, diagrams: vDiagrams, scenes: vScenes, drugs: vDrugs, ref: vRef, tell: vTell, pair: vPair, rxq: vRxq, ptab: vPtab, sa: vSa, guide: vGuide, readings: vReadings, data: vData};
const rerender = () => { const y = window.scrollY; if (CUR === 'quiz' && Q) renderQ(); else if (CUR === 'exam' && EX && !EX.done) renderExam(); else if (CUR === 'exam' && EX && EX.done) examResult(); else VIEWFN[CUR](); window.scrollTo(0, y); };
document.addEventListener('click', e => {
  const f = e.target.closest('[data-flag]');
  if (f) {
    toggleFlag(f.dataset.flag);
    // a mouse click leaves focus on the button, where Enter would flag again instead of continuing
    if (e.detail) f.blur();
    // only the buttons for this id change; a full re-render would reset in-progress forms
    document.querySelectorAll(`[data-flag="${f.dataset.flag}"]`).forEach(b => { b.classList.toggle('on', isFlagged(f.dataset.flag)); b.setAttribute('aria-pressed', isFlagged(f.dataset.flag)); b.textContent = '⚑ ' + (isFlagged(f.dataset.flag) ? 'Flagged' : 'Flag'); });
    // the exam's question grid marks flagged numbers too
    if (EX && !EX.done) { EX.flag[f.dataset.flag] = isFlagged(f.dataset.flag) ? 1 : 0; saveExam(); document.querySelectorAll('.grid [data-j]').forEach(b => { if (EX.qs[+b.dataset.j] === f.dataset.flag) b.classList.toggle('flag', isFlagged(f.dataset.flag)); }); }
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
/* The exam is over (or abandoned): stop the clock before the state goes, and drop the saved paper
   (keep = true leaves the saved paper alone: a profile switch, where it belongs to the old profile). */
function endExam(keep) { clearInterval(TICK); TICK = null; EX = null; if (!keep) store.del(EXKEY()); }

/* Questions eligible for practice and for the active exam. */
/* The exam being studied: the learner's choice (stored per browser), else the course default. */
const EXAM_KEY = COURSE.ns + ':exam';
const activeId = () => { if (focusOn()) return FOCUS_EXAM; const v = +store.get(EXAM_KEY); return COURSE.exams.some(e => e.id === v) ? v : COURSE.activeExam; };
const active = () => COURSE.exams.find(e => e.id === activeId()) || COURSE.exams[0];
const examSwitch = () => COURSE.exams.length < 2 || focusOn() ? '' : `<span class="row exsw" style="gap:4px"><span class="meta" style="margin:0">Studying for:</span>${COURSE.exams.map(e => `<button type="button" class="chip ${e.id === activeId() ? 'on' : ''}" data-exsw="${e.id}" aria-pressed="${e.id === activeId()}">${esc(e.name)}</button>`).join('')}</span>`;
document.addEventListener('click', e => {
  const b = e.target.closest('[data-exsw]'); if (!b) return;
  if (+b.dataset.exsw === activeId()) return;   // already studying it: nothing changes, the drill goes on
  store.set(EXAM_KEY, b.dataset.exsw);
  // a drill in progress is kept unless it holds the other exam's questions
  if (Q && Q.list.some(q => examOf(q) !== activeId())) Q = null;
  VIEWFN[CUR] ? VIEWFN[CUR]() : null;
});
/* One collapsible group per exam; the exam being studied opens by default. */
// one inline run (the summary is a flex row): a long scope wraps inside its words, never as a line starting with "·"
const exTitle = e => `<span>${esc(e.name)}${e.scope ? `&nbsp;<span class="meta" style="margin:0">·&nbsp;${esc(e.scope)}</span>` : ''}</span>`;
// `open` overrides the default (open = the exam being studied), e.g. when only the other exam has matches
const exGroup = (e, body, open) => focusOn() && e.id !== FOCUS_EXAM ? '' : `<details class="exgroup" data-ex="${e.id}" ${(open == null ? e.id === activeId() : open) ? 'open' : ''}><summary>${exTitle(e)}</summary><div class="exbody">${body}</div></details>`;
const lecExam = id => (COURSE.lectures.find(l => l.id === id) || {}).exam;
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

/* ---------- What's new ----------
   The change log entries newer than the last one this browser marked as seen
   (all entries share one key per course), shown as short bullets on Topics. */
const NEWS_KEY = COURSE.ns + ':newsSeen';
const newsId = c => c ? c.date + '|' + c.items.join('').length : '';   // changes if bullets are added under the same heading
function newsCard() {
  const log = BUILD.changelog || []; if (!log.length) return '';
  const seen = store.get(NEWS_KEY, null), i = seen ? log.findIndex(c => newsId(c) === seen) : 1;
  const fresh = log.slice(0, i < 0 ? 1 : i); if (!fresh.length) return '';
  const items = fresh.flatMap(c => c.items), show = items.slice(0, 8);
  // one line on a phone (opened on a tap), so the study buttons stay on the first screen; open on a wider screen
  return `<details class="card news fold" id="news" ${PHONE && PHONE.matches ? '' : 'open'}><summary><b>What’s new</b> · ${plural(items.length, 'change')} <span class="meta" style="margin:0">· ${esc(fmtDay(fresh[0].date.replace(/ \(.*\)$/, '')))}</span></summary>
    <ul>${show.map(t => `<li>${esc(t)}</li>`).join('')}</ul>${items.length > show.length ? `<div class="meta" style="margin:0 0 6px">+ ${items.length - show.length} more</div>` : ''}
    <div class="row"><button class="btn" id="newsok">Got it</button><button class="btn ghost" id="newsall">All changes</button></div></details>`;
}
/* The exam being studied as label / value rows: the paper, when, then the exam's own facts (or its blurb), then the bank. */
function examCard(ex, pool) {
  const rows = [['Paper', `${ex.name}${ex.questions ? ': ' + ex.questions + ' questions' : ''}${ex.minutes ? ' · ' + ex.minutes + ' minutes' : ''}`],
    ['When', `${esc(ex.date)} <b>${esc(examCountdown())}</b>`, true]];
  if (ex.facts && ex.facts.length) ex.facts.forEach(f => rows.push(f)); else if (ex.blurb) rows.push(['About', ex.blurb]);
  const concepts = new Set(pool.map(q => q.concept || q.id)).size;
  rows.push(['Bank', `${pool.length} questions across ${concepts} concepts`]);
  return `<div class="card facts"><table class="factstab"><tbody>${rows.map(([k, v, raw]) => `<tr><th scope="row">${esc(k)}</th><td>${raw ? v : esc(v)}</td></tr>`).join('')}</tbody></table></div>`;
}
/* Each lecture's card under an exam folds; the open ones are remembered per browser. */
const TF_KEY = COURSE.ns + ':tfold';
const TF_OPEN = () => { try { return new Set(JSON.parse(store.get(TF_KEY) || '[]')); } catch (e) { return new Set(); } };
/* The Smith focus card: her own words about what her exam tests, each with the page that drills it. Quotes verbatim. */
function focusCard() {
  if (FOCUS_EXAM !== 3) return focusCard4();
  const tq = id => QUESTIONS.filter(q => q.topic === id).length;
  const item = (quote, date, btns) => `<li><span>"${esc(tidySpeech(quote))}" <small>(T) ${date}</small></span><div class="row" style="gap:6px;margin-top:4px">${btns}</div></li>`;
  const drill = (id, lab) => tq(id) ? `<button type="button" class="btn ghost" data-topic="${id}" data-ex="${FOCUS_EXAM}">${esc(lab)} · ${tq(id)}</button>` : '';
  return `<div class="card focuscard"><b>Where to focus for Dr. Smith's exam</b><ul class="focuslist">
    ${item("The heaviest part of that will be this poisoning table.", '10/19', `<button type="button" class="btn" data-jump="ptab:ptab-top">Poisoning table drill</button>${drill('TBL3', 'Table questions')}`)}
    ${item("But you do know, need to know the details that I have in my table, my key.", '10/20', `${drill('GRG3', 'Guideline reading guide key')}${drill('RMK3', 'Discussion guide key')}`)}
    ${item("Everything that we've talked about in class, every, everything on slides, everything that's come out of my mouth, the things you've read, and we've talked about all that is testable.", '10/19', `<button type="button" class="btn ghost" data-jump="guide:guide3-scope">What Exam 3 tests</button><button type="button" class="btn ghost" data-jump="readings:rd-top">Readings</button>`)}
    ${item("Remember, go back and study to these objectives, at least. If you can answer these objective questions, you should pass my exam.", '10/9', `<button type="button" class="btn ghost" data-jump="guide:guide3-scope">Guides</button>`)}
    ${item("If I give you guys a short answer, which I likely will", '10/21', `<button type="button" class="btn ghost" data-jump="sa:sa-top">Short answer practice</button>`)}
    ${item("No, there will not, yeah, no backwards nav, OK, yes.", '10/21 (asked whether you can go back to a question)', `<button type="button" class="btn ghost" data-jump="exam:">Exam sim (her format is an option)</button>`)}
    ${item("So what we covered yesterday is all on. This exam on Friday.", '10/21 (yesterday = the 10/20 pharmacogenomics lecture; 10/21 starts her next exam)', '')}
    ${item("That's how we have it on the syllabus.", '10/20 (the class vote put the 10/20 pharmacogenomics lecture on Friday\'s exam)', '')}
  </ul><p class="sub" style="margin:6px 0 0">Smith focus is on: only her exam's pages and questions show. Turn it off from the ★ button in the tab bar.</p></div>`;
}
/* Exam 4: her words about her last exam, each with where it is drilled (filled from the lecture notes; verbatim). */
const FOCUS4 = [
  ["Where I start today is for my, my last exam.", '10/21 (the 10/21 lecture opens her Exam 4 material)', `<button type="button" class="btn ghost" data-jump="guide:guide4-l18-1">Guides</button>`],
  ["Your colleague asked, do we need to know these specific examples? Yes, you do. OK. So, everything, every little detail I'm covering now in pharmacogenomics, you need, you need to remember. Because these examples, all of them have clinical relevance.", '10/21', `<button type="button" class="btn ghost" data-topic="L18" data-ex="4">10/21 questions</button><button type="button" class="btn ghost" data-topic="L19" data-ex="4">10/22 questions</button>`],
  ["OK, so you don't have to memorize this. This is to illustrate the point that a lot of work is done trying to look at how often do these genetic versions occur", '10/21 (the allele frequency graphs)', ''],
  ["It is possible, but I will never ask you a question on this.", '10/21 (induction of CYP2C9)', '']
];
function focusCard4() {
  if (!FOCUS4.length) return '';
  return `<div class="card focuscard"><b>Where to focus for Dr. Smith's Exam 4</b><ul class="focuslist">${FOCUS4.map(([q, d, btns]) => `<li><span>"${esc(tidySpeech(q))}" <small>(T) ${d}</small></span>${btns ? `<div class="row" style="gap:6px;margin-top:4px">${btns}</div>` : ''}</li>`).join('')}</ul><p class="sub" style="margin:6px 0 0">Smith focus is on: only her exam's pages and questions show. Turn it off from the ★ button in the tab bar.</p></div>`;
}
if (typeof NARR_Q !== 'undefined') QUESTIONS.forEach(q => { if (examOf(q) === 4 && !NARR_Q[q.id] && q.teach) { const t = Array.isArray(q.teach) ? q.teach.map(x => x.t).join(' ') : String(q.teach); NARR_Q[q.id] = t; } });
/* ---------- Topics ---------- */
let FILT = {skill: 'all'};
/* ★ Most likely on her exam: items marked core (her quiz or poll concept, her words that it is testable, her posted keys, an objective tested directly). */
const coreBtn = (qs, tid, sid, ex) => { const n = qs.filter(q => q.core && !q.lowYield).length; return n ? `<button class="btn ghost corebtn" data-core="${tid}" ${sid ? `data-sub="${sid}" ` : ''}data-ex="${ex}" title="Most likely on her exam: her quiz and poll concepts, what she said to know, her keys, her objectives">★ Likely: ${n}</button>` : ''; };
function vTopics() {
  // the skill filter applies to the counts, both study buttons, the tier buttons and the topic list; flags and the ladders
  // (each one a chain across skills, climbed whole) use the whole bank
  const ex = active(), pool0 = examPool();
  if (FILT.skill !== 'all' && !pool0.some(q => q.skill === FILT.skill)) FILT.skill = 'all';   // a skill the other exam has, this one not
  const pool = FILT.skill === 'all' ? pool0 : pool0.filter(q => q.skill === FILT.skill);
  const seen = seenCount(pool), a = acc(pool);
  // the header already names the course and says when it was updated: neither is repeated here
  let h = `<div class="row" style="margin:2px 0 8px">${examSwitch()}</div>
  ${examCard(ex, pool0)}${focusOn() ? focusCard() : ''}${newsCard()}
  <div class="card"><div class="row" style="justify-content:space-between">
   <div><b>${pool.length}</b> ${FILT.skill === 'all' ? '' : esc((SKILL[FILT.skill] || {}).short || '') + ' '}questions in the bank · <b>${seen}</b> seen · accuracy <b>${a.pct == null ? '—' : a.pct + '%'}</b></div>
   <div class="row"><button class="btn" id="due">Study what is due</button><button class="btn ghost" id="all">One pass, all questions</button>${pool.filter(q => q.core && !q.lowYield).length ? `<button class="btn ghost" id="coreall" title="Her quiz and poll concepts, what she said to know, her posted keys and her objectives">★ Most likely on her exam · ${pool.filter(q => q.core && !q.lowYield).length}</button>` : ''}${whyPool(pool).length ? `<button class="btn ghost" id="whyq" title="Questions that ask for the reason behind a concept">Why questions · ${whyPool(pool).length}</button>` : ''}</div></div>
   <div class="row" style="margin-top:10px;justify-content:space-between"><span class="row"><span class="meta" style="margin:0">Answer:</span>${layoutToggle()}</span>
   <span class="row"><span class="meta" style="margin:0">⚑ Flagged: <b>${flaggedPool().length}</b></span>${flaggedPool().length ? `<button class="btn ghost" id="drillflag">Drill flagged</button><button class="btn ghost" id="clearflag">Clear flags</button>` : ''}</span></div>
   <div class="row" style="margin-top:10px"><span class="meta" style="margin:0">Skill:</span>
   ${['all'].concat(COURSE.skills.map(s => s.id)).filter(k => k === 'all' || pool0.some(q => q.skill === k))
     .map(k => `<button type="button" class="chip ${FILT.skill === k ? 'on' : ''}" aria-pressed="${FILT.skill === k}" data-sk="${k}">${k === 'all' ? 'All' : esc(SKILL[k].short)}</button>`).join('')}</div></div>`;
  // one collapsible group per exam: its topics, each with its sections
  const topicCard = (t, tq) => {
    const ta = acc(tq), tseen = seenCount(tq);
    const subs0 = (t.subs || []).filter(sb => tq.some(q => q.sub === sb.id)), fold = subs0.length > 1;
    let c = `${fold ? `<details class="card tfold" data-tf="${esc(t.id)}" ${TF_OPEN().has(t.id) ? 'open' : ''}><summary class="topicrow">` : '<div class="card"><div class="topicrow">'}<span><b>${esc(t.name)}</b>${t.prof && t.prof !== COURSE.professors[0] ? `<span class="exlabel">${esc(t.prof)}’s lecture</span>` : ''}<small>${esc(fmtCite(t.cite))}</small>
      <span class="bar-meter seen"><span style="width:${Math.round(100 * tseen / tq.length)}%"></span></span></span>
      <span class="row"><small>${tseen}/${tq.length} seen · ${ta.pct == null ? '—' : ta.pct + '%'}</small>
      <button class="btn ghost" data-topic="${t.id}" data-ex="${examOf(tq[0])}">Drill</button>${coreBtn(tq, t.id, '', examOf(tq[0]))}</span>${fold ? `</summary><div class="meta tfhint">${subs0.length} sections</div>` : '</div>'}`;
    const subs = subs0;
    if (subs.length > 1) subs.forEach(sb => {
      const sq = tq.filter(q => q.sub === sb.id), sa = acc(sq), sseen = seenCount(sq);
      c += `<div class="topicrow subrow"><span>${esc(sb.name)}<small>${sq.length} questions${sb.cite && sb.cite !== t.cite ? ' · ' + esc(fmtCite(sb.cite)) : ''}</small>
        <span class="bar-meter seen"><span style="width:${Math.round(100 * sseen / sq.length)}%"></span></span></span>
        <span class="row"><small>${sseen}/${sq.length} seen · ${sa.pct == null ? '—' : sa.pct + '%'}</small><button class="btn ghost" data-topic="${t.id}" data-sub="${sb.id}" data-ex="${examOf(sq[0])}">Drill</button>${coreBtn(sq, t.id, sb.id, examOf(sq[0]))}</span></div>`;
    });
    return c + (fold ? '</details>' : '</div>');
  };
  const tieredAll = pool0.filter(q => q.level && !q.lowYield), tiered = pool.filter(q => q.level && !q.lowYield);
  const skName = FILT.skill === 'all' ? '' : (SKILL[FILT.skill] || {}).short || FILT.skill;
  if (tieredAll.length) {
    const ladders = [...new Set(tieredAll.filter(q => q.ladder).map(q => q.ladder))].filter(k => ladderQs(k).length > 1);
    h += `<div class="card"><b>Tiers, as he described them</b><p class="sub" style="margin:4px 0 8px">Tier 1: predict what a receptor does. Tier 2: two drugs together, the good and bad interactions. Tier 3: reverse a drug's effect. "A tier 3 question would require knowledge of tier 2 and 1."</p>
      <div class="row">${[1, 2, 3].map(t => { const tq = tiered.filter(q => q.level === t), ta = acc(tq); return tq.length ? `<button class="btn ghost" data-tier="${t}">Tier ${t} · ${tq.length} ${esc(skName ? skName + ' ' : '')}question${tq.length === 1 ? '' : 's'}${ta.pct == null ? '' : ' · ' + ta.pct + '%'}</button>` : ''; }).join('')}
      ${skName && !tiered.length ? `<span class="meta" style="margin:0">No tiered ${esc(skName)} questions.</span>` : ''}
      ${ladders.length ? `<button class="btn" id="ladders">Climb the ${ladders.length} ladders (Tier 1 → 3)${skName ? ' · all skills' : ''}</button>` : ''}</div></div>`;
  }
  COURSE.exams.forEach(e => {
    const eq = QUESTIONS.filter(q => examOf(q) === e.id && (FILT.skill === 'all' || q.skill === FILT.skill));
    let body = '';
    TOPICS.forEach(t => { const tq = eq.filter(q => q.topic === t.id); if (tq.length) body += topicCard(t, tq); });
    if (body.includes('class="card tfold"')) body = `<div class="row tfall"><button type="button" class="btn ghost" data-tfall="open" data-tfex="${e.id}">Expand all</button><button type="button" class="btn ghost" data-tfall="close" data-tfex="${e.id}">Collapse all</button></div>` + body;
    if (!body) body = `<div class="empty">${e.id === activeId() ? 'Questions for this exam are added as its lectures are written.' : 'No questions match this filter.'}</div>`;
    h += exGroup(e, body);
  });
  $('#view').innerHTML = h;
  document.querySelectorAll('details.tfold').forEach(d => d.addEventListener('toggle', () => { const o = TF_OPEN(); d.open ? o.add(d.dataset.tf) : o.delete(d.dataset.tf); store.set(TF_KEY, JSON.stringify([...o])); }));
  document.querySelectorAll('[data-tfall]').forEach(b => b.onclick = () => { const g = b.closest('.exgroup'), op = b.dataset.tfall === 'open'; g.querySelectorAll('details.tfold').forEach(d => { d.open = op; }); });
  document.querySelectorAll('details.tfold > summary button').forEach(b => b.addEventListener('click', e => e.preventDefault(), true));
  $('#due').onclick = () => startQuiz(pool, 'Due and unseen', 'sr');
  const wn = $('#whatsnew'); if (wn) wn.onclick = e => { e.preventDefault(); go('data'); };
  const nok = $('#newsok'); if (nok) nok.onclick = () => { store.set(NEWS_KEY, newsId(BUILD.changelog[0])); const c = $('#news'); if (c) c.remove(); };
  const nall = $('#newsall'); if (nall) nall.onclick = () => go('data');
  $('#all').onclick = () => startQuiz(shuffle(pool), 'All questions, one pass', 'pass');
  const wq = $('#whyq'); if (wq) wq.onclick = () => startQuiz(shuffle(whyPool(pool)), 'Why questions: the reason behind each concept', 'pass');
  document.querySelectorAll('[data-tier]').forEach(b => b.onclick = () => startQuiz(pool.filter(q => q.level === +b.dataset.tier && !q.lowYield), 'Tier ' + b.dataset.tier + (skName ? ' · ' + skName : ''), 'sr'));
  const ld = $('#ladders'); if (ld) ld.onclick = () => {
    // every ladder in turn, each from Tier 1 up
    const keys = shuffle([...new Set(pool0.filter(q => q.ladder).map(q => q.ladder))].filter(k => ladderQs(k).length > 1));
    startQuiz(keys.flatMap(ladderQs), 'Ladders, Tier 1 → 3', 'pass');
  };
  const df = $('#drillflag'); if (df) df.onclick = () => startQuiz(flaggedPool(), 'Flagged questions', 'pass');
  const cf = $('#clearflag'); if (cf) cf.onclick = () => { if (confirm('Remove every flag?')) { S.flags = {}; save(); vTopics(); } };
  document.querySelectorAll('[data-sk]').forEach(c => c.onclick = () => { FILT.skill = c.dataset.sk; vTopics(); });
  const ca = $('#coreall'); if (ca) ca.onclick = () => startQuiz(shuffle(pool.filter(q => q.core && !q.lowYield)), '★ Most likely on her exam', 'pass');
  document.querySelectorAll('[data-core]').forEach(b => b.onclick = e => {
    e.preventDefault(); e.stopPropagation();
    const list = QUESTIONS.filter(q => q.core && !q.lowYield && q.topic === b.dataset.core && examOf(q) === +b.dataset.ex && (!b.dataset.sub || q.sub === b.dataset.sub));
    const t = TOPIC[b.dataset.core] || {}, sb = b.dataset.sub && (t.subs || []).find(x => x.id === b.dataset.sub);
    startQuiz(shuffle(list), '★ Most likely: ' + (sb ? `${t.name}: ${sb.name}` : t.name), 'pass');
  });
  document.querySelectorAll('[data-topic]').forEach(b => b.onclick = () => {
    const list = QUESTIONS.filter(q => q.topic === b.dataset.topic && examOf(q) === +b.dataset.ex && (!b.dataset.sub || q.sub === b.dataset.sub) && (FILT.skill === 'all' || q.skill === FILT.skill));
    const t = TOPIC[b.dataset.topic] || {}, sb = b.dataset.sub && (t.subs || []).find(x => x.id === b.dataset.sub);
    startQuiz(list, sb ? `${t.name}: ${sb.name}` : t.name, 'sr');
  });
}

/* ---------- Quiz ---------- */
let Q = null;
function startQuiz(list, label, mode, opts = {}) {
  if (!list.length) { alert('No questions match that selection.'); return; }
  Q = {list: list.slice(), label, mode, i: 0, done: 0, right: 0, retest: [], doneIds: new Set(), missed: [], st: {}, graph: opts.graph || null};
  // opts.back: opened from a page the learner will want to return to (a map tile, a Tell apart row)
  // a set started from Topics (a deck's Drill, Due, All, a tier) also keeps the way back to the same spot
  const from = (opts.back || CUR === 'topics') && CUR !== 'quiz' ? {view: CUR, y: window.scrollY} : null;
  RET.length = 0; if (from) RET.push(from); backBtn();
  // opened from deep in a long page (Tell apart, the map): start at the top, without the old page's floating buttons
  CUR = 'quiz'; nav(); leaveView(); nextQ(); pushNav({v: 'quiz'});
}
const allDone = () => Q.list.every(q => Q.doneIds.has(q.id));
/* Order for answered questions: the weakest box first, then the earliest due day, and a random
   order inside each of those, so a topic drilled again does not repeat last time's sequence. */
const srSort = list => shuffle(list).sort((a, b) => (S.q[a.id].box - S.q[b.id].box) || (Math.floor(S.q[a.id].due / DAY) - Math.floor(S.q[b.id].due / DAY)));
/* Pick the next question. Pass mode walks the list once. SR mode takes a
   missed concept's sibling first (a different wording of the same idea), then
   what is due, then what is unseen, then the soonest due. */
function pickSR() {
  const now = Date.now(), list = Q.list, recent = Q.cur ? Q.cur.id : null;
  // A question answered in the last few minutes is not served again at the
  // start of a new session; a fresh open of a topic begins somewhere else.
  const fresh = id => (!(S.q[id] && S.q[id].last > now - 3 * MIN) || id === (Q.retest[0] || {}).not) && !Q.doneIds.has(id);
  Q.ahead = false;   // set when nothing is due or unseen and the drill runs ahead of schedule (the header says so)
  while (Q.retest.length) {
    const {concept, not} = Q.retest.shift();
    const sib = list.filter(q => q.concept === concept && q.id !== not && q.id !== recent && !Q.doneIds.has(q.id));
    if (sib.length) return shuffle(sib)[0];
  }
  const due = shuffle(list.filter(q => S.q[q.id] && S.q[q.id].n && S.q[q.id].due <= now && q.id !== recent && fresh(q.id)));
  if (due.length) return due.sort((a, b) => S.q[a.id].box - S.q[b.id].box)[0];
  const unseen = list.filter(q => !(S.q[q.id] && S.q[q.id].n) && !Q.doneIds.has(q.id));
  if (unseen.length) return shuffle(unseen)[0];
  Q.ahead = true;
  const rest = srSort(list.filter(q => q.id !== recent && fresh(q.id)));
  // everything was answered minutes ago: anything but the very last one
  const lastId = list.reduce((m, q) => (S.q[q.id] && (!m || S.q[q.id].last > S.q[m].last)) ? q.id : m, null);
  return rest[0] || shuffle(list.filter(q => q.id !== recent && q.id !== lastId && !Q.doneIds.has(q.id)))[0] || list.find(q => !Q.doneIds.has(q.id)) || list[0];
}
function nextQ() {
  qSayStop();
  let q;
  if (Q.mode === 'pass') { while (Q.i < Q.list.length && Q.doneIds.has(Q.list[Q.i].id)) Q.i++; if (Q.i >= Q.list.length) return quizDone(); q = Q.list[Q.i++]; }
  else if (Q.mode === 'concept') { q = pickConcept(); if (!q) return quizDone(); }
  else { if (allDone()) return quizDone(); q = pickSR(); }
  Q.cur = q; Q.order = q.type === 'match' || q.type === 'fill' ? null : optOrder(q); Q.fill = {text: '', bank: false, rev: false};
  // mpick too: a matching question must not start with the last one's choices
  Q.picked = q.multi ? new Set() : null; Q.mpick = null; Q.answered = false; Q.t0 = Date.now();
  if (q.type === 'match') Q.rightOrder = shuffle(q.right.slice());
  window.scrollTo(0, 0);   // the next question starts at its stem, not where the last explanation ended
  renderQ();
}
function quizDone() {
  qSayStop();
  Q.finished = true; Q.answered = false; clearView();
  if (Q.graph) return graphDone();
  if (Q.mode === 'concept') return conceptDone();
  $('#view').innerHTML = `<div class="card"><h2>Pass finished</h2><p>${Q.right} of ${Q.done} correct.</p>
    <div class="row">${(Q.missed || []).length ? `<button class="btn" id="retrymiss">Retry the ${Q.missed.length} missed</button>` : ''}${RET.length ? `<button class="btn${(Q.missed || []).length ? ' ghost' : ''}" id="qback">${esc(backLabel())}</button>` : ''}<button class="btn${RET.length || (Q.missed || []).length ? ' ghost' : ''}" id="again">Study what is due</button>${RET.length && /Topics/.test(backLabel()) ? '' : '<button class="btn ghost" id="totopics">Topics</button>'}</div></div>`;
  const qb = $('#qback'); if (qb) qb.onclick = goBack;
  const rm = $('#retrymiss'); if (rm) { const ids = Q.missed.slice(); rm.onclick = () => startQuiz(ids.map(id => byId[id]).filter(Boolean), 'Missed', 'pass'); }
  $('#again').onclick = () => startQuiz(examPool(), 'Due and unseen', 'sr');
  const tt = $('#totopics'); if (tt) tt.onclick = () => go('topics');
}
function vQuiz() { if (!Q) return startQuiz(examPool(), 'Due and unseen', 'sr'); if (Q.finished) return quizDone(); renderQ(); }
// "Study what is due" with nothing due or unseen serves the soonest due: say so rather than pass it off as due
const aheadNote = () => Q && Q.ahead ? `<span class="meta notice" id="ahead" style="margin:0">Nothing is due; reviewing the soonest due.</span>` : '';

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
  return `${esc(t ? t.name : q.topic)}${sk ? ' · ' + esc(sk.short) : ''}${q.level ? ' · Tier ' + q.level : ''}${q.multi ? ' · select all' : ''}${q.lowYield ? ' · low yield' : ''}`;
}
/* One question card. `st` holds the answer state (order, rightOrder, picked, mpick, answered, ok);
   in the one-at-a-time view that is Q itself, on the all-on-one-page view one object per question. */
function qCard(q, st, opts = {}) {
  const sq = S.q[q.id], tag = opts.idx != null ? `${opts.idx + 1}. ` : '';
  let h = `<div class="card qcard" data-qid="${q.id}"><div class="row" style="justify-content:space-between"><span class="meta">${tag}${metaLine(q)}${opts.seen ? ' · ' + (sq && sq.n ? 'seen ' + sq.n + '×' : 'new') : ''}</span>${flagBtn(q.id)}</div><div class="stem" tabindex="-1">${esc(q.stem)}</div>${stemMedia(q)}`;
  if (q.type === 'match') {
    h += q.left.map((l, i) => `<div class="row" style="margin-bottom:8px"><span style="flex:1 1 200px">${esc(l)}</span>
      <select data-qid="${q.id}" data-l="${i}" ${st.answered ? 'disabled' : ''}><option value="">—</option>${st.rightOrder.map(r => `<option value="${esc(r)}" ${st.mpick && st.mpick[i] === r ? 'selected' : ''}>${esc(r)}</option>`).join('')}</select>
      ${st.answered ? (st.mpick[i] === pairOf(q, l) ? '<b style="color:var(--ok)">✓</b>' : `<b style="color:var(--bad)">✗ ${esc(pairOf(q, l))}</b>`) : ''}</div>`).join('');
    if (!st.answered) h += `<div class="meta">Match every item. Matching is scored all-or-nothing, as select-all is.</div>`;
  } else if (q.type === 'fill') {
    h += fillHTML(q, st);
  } else {
    st.order.forEach((oi, n) => {
      const o = q.options[oi];
      let cls = 'opt';
      const sel = q.multi ? st.picked.has(oi) : st.picked === oi;
      if (st.answered) { if (o.correct) cls += ' right' + (q.multi && !sel ? ' missed' : ''); else if (sel) cls += ' wrong'; }
      else if (sel) cls += ' sel';
      h += `<button class="${cls}" data-qid="${q.id}" data-o="${oi}" ${st.answered ? 'disabled' : ''}><span class="k">${q.multi ? (sel ? '☑' : '☐') : LETTERS[n]}</span><span>${esc(o.t)}</span></button>`;
      // after an answer, every option's why shows under it: why the right one is right and why each other one is wrong
      if (st.answered && o.why) h += `<div class="why">${esc(o.why)}</div>`;
    });
  }
  if (!st.answered && (q.multi || q.type === 'match')) h += `<button class="btn" ${opts.single ? 'id="check"' : ''} data-qid="${q.id}" data-check="1">Check</button>`;
  if (st.answered) {
    const pairsRight = q.type === 'match' ? q.left.filter((l, i) => st.mpick[i] === pairOf(q, l)).length : 0;
    h += `<div class="verdict ${st.ok ? 'ok' : 'bad'}" role="status" tabindex="-1">${st.ok ? '✓ Correct' : '✗ Not correct'}${q.type === 'match' ? ` · ${pairsRight} of ${q.left.length} pairs right` : ''}${q.multi && !st.ok && st.picked && st.picked.size != null ? (() => { const cor = q.options.map((o, i) => o.correct ? i : -1).filter(i => i >= 0), hit = cor.filter(i => st.picked.has(i)).length, bad = [...st.picked].filter(i => !q.options[i].correct).length; return ` · ${hit} of ${cor.length} correct options ticked${bad ? ` · ${bad} wrong tick${bad > 1 ? 's' : ''}` : ''}`; })() : ''}</div>`;
    const hidden = [];
    if (q.type === 'match' && q.pairs) q.pairs.filter(p => p.why).forEach(p => { h += `<div class="why"><b>${esc(p.l)}</b>: ${esc(p.why)}</div>`; });
    if (q.teach) h += `<div class="teach">${teachHTML(q.teach)}</div>`;
    if (q.step3) h += stepHTML(q.step3);
    h += graphFeedback(q, st);
    if (q.note && !srcNote(q.note)) h += `<div class="note">${esc(q.note)}</div>`;
    if (typeof NARR_Q !== 'undefined' && NARR_Q[q.id]) h += `<div class="row qsay"><button type="button" class="chip" data-qsay="${q.id}">🔊 Hear the why</button><span class="meta" style="margin:0">${typeof Q_CLIPS !== 'undefined' && !Q_CLIPS.includes(q.id) ? 'device voice' : 'read by the narrator'}</span></div>`;
    h += moreHTML(q, hidden) + explainHTML(q);
    if (opts.conf) h += opts.conf(st);
  }
  if (opts.foot) h += opts.foot;
  return h + '</div>';
}
/* Fill in the blank: type the word, or open the word bank and tap one. Typing is not machine-graded:
   "Show the answer" reveals it and the student marks it right or wrong (a typed match is pointed out). */
const fillNorm = t => String(t || '').toLowerCase().replace(/[^a-z0-9%]+/g, ' ').trim();
function fillHTML(q, st) {
  const f = st.fill || (st.fill = {text: '', bank: false, rev: false});
  if (st.answered || f.rev) {
    const acc = [q.answer].concat(q.accept || []), typed = fillNorm(f.text), match = typed && acc.some(a => fillNorm(a) === typed);
    let h = `<div class="fillans"><div><b>Answer:</b> ${esc(q.answer)}${(q.accept || []).filter(a => fillNorm(a) !== fillNorm(q.answer)).length ? ` <span class="meta" style="margin:0">(also accepted: ${esc(q.accept.filter(a => fillNorm(a) !== fillNorm(q.answer)).join(', '))})</span>` : ''}</div>
      <div><b>Yours:</b> ${f.text.trim() ? esc(f.text) : '<span class="meta" style="margin:0">(blank)</span>'}${f.text.trim() ? (match ? ' <span class="meta" style="margin:0;color:var(--ok)">matches the answer</span>' : ' <span class="meta" style="margin:0">does not match word for word; judge the meaning</span>') : ''}</div></div>`;
    if (!st.answered) h += `<div class="row" style="margin-top:8px"><span class="meta" style="margin:0">Did you have it?</span><button type="button" class="btn" data-qid="${q.id}" data-fgrade="1">✓ I had it</button><button type="button" class="btn ghost" data-qid="${q.id}" data-fgrade="0">✗ I missed it</button></div>`;
    return h;
  }
  let h = `<div class="row" style="margin:6px 0"><input type="text" class="fillin" data-qid="${q.id}" value="${esc(f.text)}" placeholder="Type the missing word (optional)" aria-label="Your answer" autocomplete="off" autocapitalize="off" spellcheck="false"></div>`;
  h += f.bank ? `<div class="row fillbank">${(f.order || (f.order = shuffle(q.bank.slice()))).map(w => `<button type="button" class="chip${fillNorm(w) === fillNorm(f.text) ? ' on' : ''}" data-qid="${q.id}" data-fword="${esc(w)}">${esc(w)}</button>`).join('')}</div>`
    : `<button type="button" class="btn ghost" data-qid="${q.id}" data-fbank="1">Show the word bank</button>`;
  return h + `<div class="row" style="margin-top:8px"><button type="button" class="btn" data-qid="${q.id}" data-check="1">Show the answer</button><span class="meta" style="margin:0">You decide if you had it.</span></div>`;
}
/* After an answer the card shows the verdict, every option's why under that option, and the teach.
   The figure, the textbook notes, the quote and the cite are folded behind "More". */
// a note that only reports how the auto-captions garbled a word is source detail: it sits under More, not in the note box
const srcNote = n => /\b(transcript|captions?|caption's|renders?|rendered|garbled)\b/i.test(n) && !/\b(Katzung|chapter|her exam|keys?|keyed|the exam|slide says)\b/i.test(n) && n.length < 200;
function moreHTML(q, hidden) {
  let b = '';
  if (q.note && srcNote(q.note)) b += `<div class="meta" style="margin:6px 0 4px">${esc(q.note)}</div>`;
  if (hidden.length) b += `<div class="meta" style="margin:6px 0 4px">The other options</div>` + hidden.map(o => `<div class="why"><b>${esc(o.t)}</b> — ${esc(o.why)}</div>`).join('');
  if (q.fg) b += figHTML(q.fg);
  b += readingHTML(q.reading);
  if (q.quote) b += `<div class="quote">“${esc(q.quote)}”</div>`;
  b += `<div class="cite">${esc(fmtCite(q.cite))}</div>`;
  return `<details class="qmore fold"><summary>More</summary>${b}</details>`;
}
function renderQ() {
  if (Q.finished) return quizDone();
  if (S.layout === 'all') return renderAll();
  // the current question may have been answered on the all-on-one-page view
  // (answered or not here: an answer recorded there must not be recorded again by this card's Next)
  if (Q.cur && Q.doneIds.has(Q.cur.id) && Q.rec !== Q.cur.id) return nextQ();
  const q = Q.cur; clearView();
  let h = `<div class="row" style="justify-content:space-between"><span class="meta">${esc(Q.label || '')} · ${Q.done} answered${Q.done ? ' · ' + Q.right + ' right' : ''}</span>${layoutToggle()}</div><div class="row" style="margin:4px 0 10px">${sessStrip()}${aheadNote()}</div>`;
  // a right answer: Next records "Knew it" (as Enter does); the two smaller buttons beside it downgrade it
  h += qCard(q, Q, {seen: true, single: true,
    conf: () => Q.ok ? `<div class="row" style="margin-top:12px"><button class="btn" data-c="sure">Next</button><span class="meta" style="margin:0">counts as “Knew it” · or:</span>
      <button class="btn ghost sm" data-c="unsure">Not sure</button><button class="btn ghost sm" data-c="guess">I guessed</button></div>`
      : `<div class="row" style="margin-top:12px"><button class="btn" data-c="wrong">Next</button></div>`,
    foot: `<div class="meta kbd">Keys: A–J or 1–9 pick an option · Enter checks or continues · after a right answer 1 = Knew it, 2 = Not sure, 3 = I guessed</div>`});
  $('#view').innerHTML = h;
  // a tap within 350 ms of the question appearing is the second tap of a double tap on Drill or Next (keys are not held back)
  document.querySelectorAll('[data-o]').forEach(b => b.onclick = e => { if (e.detail && Date.now() - Q.t0 < 350) return; pick(+b.dataset.o); });
  document.querySelectorAll('select[data-l]').forEach(s => s.onchange = () => { Q.mpick = Q.mpick || {}; Q.mpick[+s.dataset.l] = s.value; });
  const ck = document.querySelector('[data-check]'); if (ck) ck.onclick = () => check();
  const fi = $('#view .fillin'); if (fi) { fi.oninput = () => { Q.fill.text = fi.value; }; fi.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); check(); } }; }
  const fb = document.querySelector('[data-fbank]'); if (fb) fb.onclick = () => { Q.fill.bank = true; renderQ(); };
  document.querySelectorAll('[data-fword]').forEach(b => b.onclick = () => { Q.fill.text = b.dataset.fword; renderQ(); });
  document.querySelectorAll('[data-fgrade]').forEach(b => b.onclick = () => check(b.dataset.fgrade === '1'));
  document.querySelectorAll('[data-c]').forEach(b => b.onclick = () => finish(b.dataset.c));
  // the card was redrawn: keep keyboard and screen-reader users on it (the verdict after an answer, the question after Next)
  const fv = Q.answered ? $('#view .verdict') : $('#view .qcard .stem'); if (fv) fv.focus({preventScroll: true});
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
    list = srSort(due).concat(shuffle(unseen), srSort(rest));
  }
  Q.allList = list; Q.allN = 40; Q.st = Q.st || {};
  return list;
}
function renderAll() {
  const list = allList(), shown = list.slice(0, Q.allN);
  shown.forEach(q => { if (!Q.st[q.id]) Q.st[q.id] = {fill: {text: '', bank: false, rev: false}, order: q.type === 'match' || q.type === 'fill' ? null : optOrder(q), rightOrder: q.type === 'match' ? shuffle(q.right.slice()) : null, picked: q.multi ? new Set() : null, mpick: null, answered: false, ok: null, t0: Date.now()}; });
  if (Q.mode === 'sr') { const now = Date.now(); Q.ahead = !shown.some(q => { const st = S.q[q.id]; return !(st && st.n) || st.due <= now; }); }
  let h = `<div class="row allhead" style="justify-content:space-between"><span class="meta" id="allcount">${esc(allCount(list, shown))}</span>${layoutToggle()}</div><div class="row" style="margin:4px 0 10px">${sessStrip()}${aheadNote()}</div>`;
  shown.forEach((q, i) => {
    const st = Q.st[q.id];
    h += qCard(q, st, {idx: i, conf: s2 => allConf(q, s2)});
  });
  if (list.length > shown.length) h += `<div class="row"><button class="btn" id="more">Show the next ${Math.min(40, list.length - shown.length)}</button></div>`;
  else h += `<div class="row"><button class="btn ghost" id="alldone">Finish</button></div>`;
  const view = $('#view'); view.innerHTML = h;
  // one delegated handler for every card; a card is re-rendered on its own when it changes
  view.onclick = e => {
    const t = e.target.closest('[data-o],[data-check],[data-down],[data-fbank],[data-fword],[data-fgrade],#more,#alldone'); if (!t) return;
    if (t.dataset.fbank) { Q.st[t.dataset.qid].fill.bank = true; refreshCard(t.dataset.qid); return; }
    if (t.dataset.fword) { Q.st[t.dataset.qid].fill.text = t.dataset.fword; refreshCard(t.dataset.qid); return; }
    if (t.dataset.fgrade) { checkAll(t.dataset.qid, t.dataset.fgrade === '1'); return; }
    if (t.id === 'more') { Q.allN += 40; renderAll(); return; }
    if (t.id === 'alldone') { quizDone(); return; }
    if (t.dataset.down) downgrade(t.dataset.qid, t.dataset.down);
    else if (t.dataset.check) checkAll(t.dataset.qid);
    else pickAll(t.dataset.qid, +t.dataset.o);
  };
  view.oninput = e => { const fi = e.target.closest('.fillin'); if (fi) Q.st[fi.dataset.qid].fill.text = fi.value; };
  view.onchange = e => { const s = e.target.closest('select[data-l]'); if (!s) return; const st = Q.st[s.dataset.qid]; st.mpick = st.mpick || {}; st.mpick[+s.dataset.l] = s.value; };
}
const allConf = (q, s2) => s2.ok ? `<div class="row" style="margin-top:10px"><span class="meta" style="margin:0">Recorded as ${s2.conf === 'guess' ? '"I guessed"' : s2.conf === 'unsure' ? '"Not sure"' : '"Knew it"'}</span>${s2.conf === 'sure' ? `<button class="btn ghost" data-qid="${q.id}" data-down="unsure">Not sure</button><button class="btn ghost" data-qid="${q.id}" data-down="guess">I guessed</button>` : ''}</div>` : '';
/* Replace one card in place and refresh the count line; nothing else on the page is rebuilt. */
function refreshCard(id) {
  const el = document.querySelector(`.qcard[data-qid="${id}"]`); if (!el) return renderAll();
  const idx = [...document.querySelectorAll('.qcard')].indexOf(el);
  const tmp = document.createElement('div'); tmp.innerHTML = qCard(byId[id], Q.st[id], {idx, conf: s2 => allConf(byId[id], s2)});
  el.replaceWith(tmp.firstElementChild);
  const list = allList(), c = $('#allcount'); if (c) c.textContent = allCount(list, list.slice(0, Q.allN));
}
/* The count line over the all-on-one-page drill (drawn whole, then refreshed after each answer). */
function allCount(list, shown) {
  const done = shown.filter(q => Q.st[q.id] && Q.st[q.id].answered).length, right = shown.filter(q => Q.st[q.id] && Q.st[q.id].ok).length, earlier = Q.list.length - list.length;
  return `${Q.label || ''} · ${done} of ${shown.length} answered${done ? ' · ' + right + ' right' : ''}${list.length > shown.length ? ' · ' + list.length + ' in the drill' : ''}${earlier ? ' · ' + earlier + ' answered one at a time' : ''}`;
}
function pickAll(id, oi) {
  const q = byId[id], st = Q.st[id]; if (st.answered) return;
  if (q.multi) { st.picked.has(oi) ? st.picked.delete(oi) : st.picked.add(oi); refreshCard(id); return; }
  st.picked = oi; checkAll(id);
}
function checkAll(id, fillOk) {
  const q = byId[id], st = Q.st[id];
  if (q.type === 'fill') { if (fillOk === undefined) { st.fill.rev = true; refreshCard(id); return; } st.ok = !!fillOk; }
  else if (q.type === 'match') { st.mpick = st.mpick || {}; if (q.left.some((l, i) => !st.mpick[i])) return; st.ok = q.left.every((l, i) => st.mpick[i] === pairOf(q, l)); }
  else if (q.multi) { if (!st.picked.size) return; st.ok = gradeMulti(q, st.picked); }
  else st.ok = q.options[st.picked].correct;
  st.answered = true; st.conf = st.ok ? 'sure' : 'wrong';
  const sq = qs(q.id); st.box0 = sq.box; sq.n++; if (st.ok) sq.ok++;
  const picked = q.type === 'match' ? st.mpick : q.type === 'fill' ? null : q.multi ? [...st.picked] : st.picked;
  noteAnswer(q, {id: q.id, t: Date.now(), ok: st.ok, conf: st.conf, picked, ms: Date.now() - st.t0});
  setTimeout(refreshSess, 0);
  if (S.log.length > 5000) S.log = S.log.slice(-5000);
  schedule(q.id, st.conf);
  Q.done++; if (st.ok) Q.right++; else if (Q.missed && !Q.missed.includes(q.id)) Q.missed.push(q.id); Q.doneIds.add(q.id);
  if (!st.ok) Q.retest.push({concept: q.concept, not: q.id});
  save(); refreshCard(id);
}
function downgrade(id, conf) {
  const st = Q.st[id]; if (!st.answered || !st.ok || st.conf !== 'sure') return;
  st.conf = conf; const sq = qs(id);
  if (conf === 'guess') { sq.ok = Math.max(0, sq.ok - 1); Q.right = Math.max(0, Q.right - 1); Q.retest.push({concept: byId[id].concept, not: id}); }
  for (let i = S.log.length - 1; i >= 0; i--) if (S.log[i].id === id) { S.log[i].conf = conf; break; }
  sq.box = st.box0 || 0;   // reschedule from the box the answer started in, as the one-at-a-time flow does
  schedule(id, conf); save(); refreshCard(id); setTimeout(refreshSess, 0);
}
const pairOf = (q, l) => (q.pairs.find(p => p.l === l) || {}).r;
function pick(oi) {
  const q = Q.cur; if (Q.answered) return;
  if (q.multi) { Q.picked.has(oi) ? Q.picked.delete(oi) : Q.picked.add(oi); renderQ(); return; }
  Q.picked = oi; check();
}
function gradeMulti(q, set) { return q.options.every((o, i) => !!o.correct === set.has(i)); }
function check(fillOk) {
  const q = Q.cur;
  if (q.type === 'fill') {
    if (fillOk === undefined) { Q.fill.rev = true; renderQ(); return; }
    Q.ok = !!fillOk;
  } else if (q.type === 'match') {
    Q.mpick = Q.mpick || {};
    if (q.left.some((l, i) => !Q.mpick[i])) return;   // Check waits until every item has a match
    Q.ok = q.left.every((l, i) => Q.mpick[i] === pairOf(q, l));
  } else if (q.multi) {
    if (!Q.picked.size) { const c = document.querySelector(`[data-check][data-qid="${q.id}"]`); if (c && !c.dataset.warned) { c.dataset.warned = 1; c.insertAdjacentHTML('afterend', '<span class="meta" style="margin:0 0 0 8px">Tick at least one option first.</span>'); } return; }
    Q.ok = gradeMulti(q, Q.picked);
  } else Q.ok = q.options[Q.picked].correct;
  Q.answered = true;
  // the answer is recorded the moment it is graded (a reload, a tab switch or the back gesture keeps it),
  // as "Knew it" or a miss; Next or the confidence buttons only adjust it, as on the all-on-one-page view
  const sq = qs(q.id), conf = Q.ok ? 'sure' : 'wrong'; Q.box0 = sq.box; sq.n++; if (Q.ok) sq.ok++;
  const picked = q.type === 'match' ? Q.mpick : q.type === 'fill' ? null : q.multi ? [...Q.picked] : Q.picked;
  noteAnswer(q, {id: q.id, t: Date.now(), ok: Q.ok, conf, picked, ms: Date.now() - Q.t0});
  setTimeout(refreshSess, 0);
  if (S.log.length > 5000) S.log = S.log.slice(-5000);
  schedule(q.id, conf);
  if (!Q.ok) Q.retest.push({concept: q.concept, not: q.id});
  Q.done++; if (Q.ok) Q.right++; else if (Q.missed && !Q.missed.includes(q.id)) Q.missed.push(q.id); Q.doneIds.add(q.id); Q.rec = q.id;
  // the all-on-one-page view shows it answered, not as a fresh card
  Q.st[q.id] = {order: Q.order, rightOrder: q.type === 'match' ? Q.rightOrder : null, picked: Q.picked, mpick: Q.mpick, fill: Q.fill, answered: true, ok: Q.ok, conf, box0: Q.box0, t0: Q.t0};
  save();
  renderQ();
}
function finish(conf) {
  const q = Q.cur;
  // already recorded at Check as "Knew it" or a miss; "Not sure" and "I guessed" adjust that record
  if (Q.ok && (conf === 'unsure' || conf === 'guess') && Q.rec === q.id) {
    const sq = qs(q.id);
    if (conf === 'guess') { sq.ok = Math.max(0, sq.ok - 1); Q.right = Math.max(0, Q.right - 1); Q.retest.push({concept: q.concept, not: q.id}); }
    for (let i = S.log.length - 1; i >= 0; i--) if (S.log[i].id === q.id) { S.log[i].conf = conf; break; }
    sq.box = Q.box0 || 0; schedule(q.id, conf);
    if (Q.st[q.id]) Q.st[q.id].conf = conf;
    save(); setTimeout(refreshSess, 0);
  }
  nextQ();
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
  // the exam being studied only, as Weak spots counts it; a right answer marked "I guessed" is not solid
  const ex = active(), ses = sessionLog().filter(e => byId[e.id] && examOf(byId[e.id]) === ex.id);
  if (!ses.length) return `<span class="meta" id="sess" style="margin:0">This session (${esc(ex.name)}): no answers yet</span>`;
  const ok = ses.filter(solid).length, last = ses.slice(-10), guessed = ses.filter(e => e.ok && e.conf === 'guess').length;
  return `<span class="meta" id="sess" style="margin:0">This session (${esc(ex.name)}): ${ok}/${ses.length} solid (${Math.round(100 * ok / ses.length)}%, guesses not counted)${guessed ? ` · ${guessed} right but guessed` : ''} · last ${last.length}: <span class="sdots10">${last.map(e => `<i class="${solid(e) ? 'y' : 'n'}" title="${esc(e.id)}"></i>`).join('')}</span></span>`;
}
const refreshSess = () => { const el = $('#sess'); if (el) el.outerHTML = sessStrip(); };

/* ---------- Concepts ----------
   Weak spots works on concepts (q.concept: one idea behind several wordings), not on
   questions. The record per concept, S.c[concept] = {s, m, hist, box, due, r}, is derived
   from S.log by noteAnswer() after every answer and rebuilt whole when missing (old
   histories, an import without it), so the log stays the source of truth:
     s     unfamiliar: seen once, missed once · struggling: 2 or more misses, or under 60%
           on the last 5 with 2 or more attempts · improving: missed before, last 2 solid,
           not yet mastered · mastered: 3 or more solid answers on 2 or more different
           questions in 2 or more separate sessions, no miss in the last 3 · returning: was
           mastered, then missed (back with the strugglers, marked "returned") · learning:
           right so far, not yet mastered (one right answer never masters).
     m     when it was mastered (0 = never); r = 1 once it has returned
     hist  the last 10 answers as [time, 1 solid | 0 missed]
     box, due  the spaced check of a mastered concept: box 3 of the pace's steps at mastery,
           one box up per further solid answer; due = the last solid answer + that step.
   A miss is a wrong answer or a right one marked "I guessed"; solid is the opposite.
   Sessions are the 30-minute-gap runs sessionLog() uses, over the whole log. */
const CQ = {}; QUESTIONS.forEach(q => { (CQ[conceptOf(q)] = CQ[conceptOf(q)] || []).push(q); });
const conceptQs = c => CQ[c] || [];
const RECENT_N = 5, CONCEPT_BOX0 = 3, REPEAT_GAP = 10 * MIN;
const paceSteps = () => (PACES[S.pace] || PACES[COURSE.paceDefault] || PACES.cram).steps;
/* The session index of every log entry (same 30-minute rule as sessionLog), by time. */
function sessionIds(log) {
  const order = log.map((e, i) => i).sort((a, b) => log[a].t - log[b].t), sid = new Array(log.length);
  let s = 0, prev = null;
  order.forEach(i => { const t = +log[i].t || 0; if (prev != null && t - prev >= SESSION_GAP) s++; sid[i] = s; prev = t; });
  return sid;
}
/* The log grouped by concept, each entry with its question and session index, in time order.
   Entries whose question is no longer in the bank are left out (kept in S.log, never shown). */
function logByConcept(log) {
  const sid = sessionIds(log), g = {};
  log.forEach((e, i) => { const q = byId[e.id]; if (!q) return; const c = conceptOf(q); (g[c] = g[c] || []).push(Object.assign({}, e, {sid: sid[i], q})); });
  Object.values(g).forEach(l => l.sort((a, b) => a.t - b.t));
  return g;
}
const masteredBy = list => { const sol = list.filter(solid); return sol.length >= 3 && new Set(sol.map(e => e.id)).size >= 2 && new Set(sol.map(e => e.sid)).size >= 2 && list.slice(-3).every(solid); };
function conceptRecord(list) {
  const steps = paceSteps(), top = steps.length - 1;
  let m = 0, was = false, r = 0, box = 0, due = 0;
  list.forEach((e, i) => {
    if (was) {
      if (solid(e)) { box = Math.min(top, box + 1); due = e.t + steps[box]; }
      else { was = false; r = 1; }
    } else if (masteredBy(list.slice(0, i + 1))) { was = true; m = e.t; box = Math.min(top, CONCEPT_BOX0); due = e.t + steps[box]; }
  });
  const n = list.length, misses = list.filter(e => !solid(e)).length, recent = list.slice(-RECENT_N), acc = recent.length ? recent.filter(solid).length / recent.length : 1;
  const last2 = n >= 2 && list.slice(-2).every(solid);
  let s;
  if (was) s = 'mastered';
  else if (!misses) s = 'learning';
  else if (last2) s = 'improving';
  else if (r) s = 'returning';
  else if (misses >= 2 || (recent.length >= 2 && acc < 0.6)) s = 'struggling';
  else if (n === 1) s = 'unfamiliar';
  else s = 'learning';   // one slip after two or more solid answers: not weak on this evidence
  return {s, m, hist: list.slice(-10).map(e => [e.t, solid(e) ? 1 : 0]), box, due, r};
}
function rebuildConcepts() { const g = logByConcept(S.log), c = {}; Object.keys(g).forEach(k => { c[k] = conceptRecord(g[k]); }); S.c = c; }
const ensureC = () => { if (!S.c) rebuildConcepts(); };
/* Every answer goes through here (the quiz, the all-on-one-page drill, the exam). */
function noteAnswer(q, e) {
  S.log.push(e); ensureC();
  const c = conceptOf(q), list = logByConcept(S.log)[c] || [];
  if (list.length) S.c[c] = conceptRecord(list); else delete S.c[c];
}
/* Recompute every record from the log (a "Not sure"/"I guessed" downgrade edits the log in place). */
function syncConcepts() {
  ensureC();
  const g = logByConcept(S.log), c = {};
  Object.keys(g).forEach(k => { c[k] = conceptRecord(g[k]); });
  if (JSON.stringify(c) !== JSON.stringify(S.c)) { S.c = c; save(); }
  return g;
}
const STATUS_WORD = {unfamiliar: 'Unfamiliar', struggling: 'Struggling', improving: 'Improving', mastered: 'Mastered', returning: 'Returned', learning: 'On track'};
/* Concept-level due: the stored concept interval or the latest of its questions' due, whichever is later. */
const conceptDue = c => Math.max((S.c[c] || {}).due || 0, ...conceptQs(c).map(q => (S.q[q.id] && S.q[q.id].n) ? S.q[q.id].due : 0));
const dueConcepts = (exId, now = Date.now()) => { ensureC(); return Object.keys(S.c).filter(c => S.c[c].s === 'mastered' && conceptQs(c).some(q => examOf(q) === exId) && conceptDue(c) <= now); };
/* The wrong choices in one answer: [{k, o}] with o = {t, why} (a matching answer gives its wrong pairs). */
function wrongPicks(q, e) {
  const p = e.picked;
  if (q.type === 'match') { if (!isObj(p)) return []; return q.left.map((l, i) => { const want = pairOf(q, l); return p[i] && p[i] !== want ? {k: 'm' + i, o: {t: l + ' → ' + p[i], why: (q.pairs.find(x => x.l === l) || {}).why || ''}} : null; }).filter(Boolean); }
  if (!q.options) return [];
  return [].concat(p == null ? [] : p).map(i => q.options[i] && !q.options[i].correct ? {k: String(i), o: q.options[i]} : null).filter(Boolean);
}
const agoText = t => { const d = Date.now() - t; if (d < MIN) return 'just now'; if (d < HOUR) return Math.round(d / MIN) + ' min ago'; if (d < DAY) return Math.round(d / HOUR) + ' h ago'; const n = Math.round(d / DAY); return n === 1 ? 'yesterday' : n + ' days ago'; };
const inText = t => { const d = t - Date.now(); if (d <= 0) return 'now'; if (d < HOUR) return 'in ' + Math.max(1, Math.round(d / MIN)) + ' min'; if (d < DAY) return 'in ' + Math.round(d / HOUR) + ' h'; return 'in ' + Math.round(d / DAY) + ' day' + (Math.round(d / DAY) === 1 ? '' : 's'); };
const plural = (n, w) => n + ' ' + w + (n === 1 ? '' : 's');
/* Everything a card shows, computed from the concept's entries (exact counts, never estimates). */
function conceptStats(c, list) {
  const seen = new Set(list.map(e => e.id)), misses = list.filter(e => !solid(e)), wrong = list.filter(e => !e.ok), guessed = list.filter(e => e.ok && e.conf === 'guess');
  const recent = list.slice(-RECENT_N), sessions = new Set(list.map(e => e.sid));
  const firstMiss = list.findIndex(e => !solid(e)), retests = firstMiss < 0 ? 0 : list.slice(firstMiss + 1).filter(solid).length;
  const picks = {};
  list.forEach(e => { if (e.ok) return; const q = byId[e.id]; wrongPicks(q, e).forEach(({k, o}) => { const key = e.id + ':' + k; const P = picks[key] = picks[key] || {q, o, n: 0, t: 0}; P.n++; P.t = Math.max(P.t, e.t); }); });
  const errs = Object.values(picks).sort((a, b) => b.n - a.n || b.t - a.t);
  const lastMulti = list.slice().reverse().find(e => !e.ok && byId[e.id].multi && Array.isArray(e.picked));
  let partial = null;
  if (lastMulti) { const q = byId[lastMulti.id], right = q.options.map((o, i) => o.correct ? i : -1).filter(i => i >= 0), set = new Set(lastMulti.picked); partial = {q, hit: right.filter(i => set.has(i)).length, of: right.length, bad: lastMulti.picked.filter(i => !(q.options[i] && q.options[i].correct)).length}; }
  const lastMiss = list.slice().reverse().find(e => !solid(e)), last = list[list.length - 1];
  return {seen: seen.size, n: list.length, misses: misses.length, wrong: wrong.length, guessed: guessed.length, acc: recent.length ? recent.filter(solid).length / recent.length : null, recentN: recent.length,
    sessions: sessions.size, retests, errs, recurring: errs.filter(x => x.n > 1), partial, lastMiss, last, best: byId[(lastMiss || last).id], solidN: list.filter(solid).length, solidQs: new Set(list.filter(solid).map(e => e.id)).size, solidSess: new Set(list.filter(solid).map(e => e.sid)).size};
}
/* A readable title from the concept id: a term's name, "Drug: mechanism of action" and the
   like for the common id shapes, else the id's words with the course's abbreviations. */
const ABBR = {ache: 'AChE', ach: 'ACh', adr: 'ADR', adrs: 'ADRs', ddi: 'DDI', moa: 'MOA', soa: 'SOA', nds: 'NDS', gq: 'Gq', gs: 'Gs', kd: 'Kd', emax: 'Emax', ec50: 'EC50', ed50: 'ED50', ed99: 'ED99', ld1: 'LD1', ld50: 'LD50', ti: 'TI', gpcr: 'GPCR', rtk: 'RTK', pde: 'PDE', cgmp: 'cGMP', camp: 'cAMP', ip3: 'IP3', plc: 'PLC', ac: 'AC', sgc: 'sGC', nos: 'NOS', raas: 'RAAS', ace: 'ACE', acei: 'ACE inhibitor', arb: 'ARB', arbs: 'ARBs', at1: 'AT1', at2: 'AT2', ang2: 'Ang II', mao: 'MAO', maoi: 'MAOI', nmj: 'NMJ', nn: 'Nn', nm: 'Nm', m1: 'M1', m2: 'M2', m3: 'M3', ne: 'NE', sch: 'SCh', mh: 'malignant hyperthermia', mg: 'myasthenia gravis', pns: 'PNS', sns: 'SNS', ans: 'ANS', cns: 'CNS', bp: 'BP', hr: 'HR', map: 'MAP', oab: 'overactive bladder', skm: 'skeletal muscle', bbb: 'BBB', fa: 'full agonist', pa: 'partial agonist', pam: 'PAM', nam: 'NAM', drc: 'DRC', gtp: 'GTP', gaba: 'GABA', net: 'NET', snare: 'SNARE', ssri: 'SSRI', grk: 'GRK', mr: 'MR', na: 'Na', x: 'X', y: 'Y', alpha: 'α', alpha1: 'α1', alpha2: 'α2', beta: 'β', beta1: 'β1', beta2: 'β2', beta3: 'β3', alpha4beta2: 'α4β2', dumbbelss: 'DUMBBELSS', op: 'organophosphate', d1: 'D1', d2: 'D2', k: 'K⁺', vs: 'vs', ras: 'RAS', ia: 'inverse agonist', bbs: 'β blockers', ad: 'Alzheimer’s', pd: 'PD'};
const capFirst = s => s.replace(/^[a-z]/, ch => ch.toUpperCase());
function conceptWords(id) {
  const toks = id.split('-');
  return toks.map((t, i) => {
    if (t === 'gi') return /^(alpha2|m2|d2)$/.test(toks[i - 1] || '') || toks[i + 1] === 'alpha2' ? 'Gi' : 'GI';
    if (t === 'no') return /^(sgc|cgmp|donor|donors|nitrates|endothelium|hypotension|term)$/.test(toks[i - 1] || '') || /^(sgc|cgmp|donor|donors|vasodilation)$/.test(toks[i + 1] || '') ? 'NO' : 'no';
    return ABBR[t] || t;
  }).join(' ');
}
/* Drug names, from the drug-list concept ids (moa-<drug>, <drug>-adrs …), keep their capital inside a title. */
const DRUGS = new Set(QUESTIONS.map(q => (q.concept.match(/^(?:moa|soa|adrs?|ddi)-(.+)$|^(.+)-(?:moa|soa|adrs?|ddi)$/) || []).slice(1).find(Boolean)).filter(x => x && !/-/.test(x)));
const LOC_WORD = /^(brain|heart|lungs?|gut|gi|eyes?|bladder|vessels?|kidneys?|skin|liver|glands?|bronchi|uterus|pupil|muscle|skm)$/;
const drugCaps = s => s.split(' ').map(w => DRUGS.has(w) ? capFirst(w) : w).join(' ');
function conceptTitle(c) {
  const qsOf = conceptQs(c), lad = qsOf.find(q => q.ladderName);
  if (lad) return lad.ladderName;   // the ladder's own name says what the concept is
  if (/^term-/.test(c)) { const t = (typeof TERMS === 'undefined' ? [] : TERMS).find(x => x.id === c.slice(5)); if (t) return 'Term: ' + t.term.replace(/\s*\([^)]*\)\s*$/, ''); }
  const forms = [[/^moa-(.+)$|^(.+)-moa$/, 'mechanism of action'], [/^soa-(.+)$|^(.+)-soa$/, 'site of action'], [/^adrs?-(.+)$|^(.+)-adrs?$/, 'adverse reactions'], [/^ddi-(.+)$|^(.+)-ddi$/, 'drug interactions']];
  for (const [re, tail] of forms) { const m = c.match(re); if (m) return capFirst(drugCaps(conceptWords(m[1] || m[2]))) + ': ' + tail; }
  const p = c.match(/^(.+)-predict-(.+)$/); if (p) return capFirst(drugCaps(conceptWords(p[1]))) + ': predict the ' + conceptWords(p[2]);
  // the id's words: "a-vs-b" reads "A vs B", a location word at the end goes in parentheses, drug names keep their capital
  const toks = c.split('-'), loc = toks.length > 2 && LOC_WORD.test(toks[toks.length - 1]) ? toks.pop() : null;
  const known = t => ABBR[t] || DRUGS.has(t) || t === 'vs';
  if (toks.length <= 3 || loc || toks.some(known)) return capFirst(drugCaps(conceptWords(toks.join('-')))) + (loc ? ` (${conceptWords(loc)})` : '');
  // four or more plain words read like a note to self ("drugs alter ongoing system"): the most-missed question's stem says it better
  const miss = {}; S.log.forEach(e => { if (!solid(e)) miss[e.id] = (miss[e.id] || 0) + 1; });
  const q = qsOf.slice().sort((a, b) => (miss[b.id] || 0) - (miss[a.id] || 0))[0];
  if (q) { const s = q.stem.replace(/\s+/g, ' ').trim(); return s.length > 70 ? s.slice(0, 69).replace(/\s+\S*$/, '') + '…' : s; }
  return capFirst(conceptWords(c));
}
/* Under the title: the ladder it belongs to or the first section that teaches it, then topic · section. */
function conceptLine(c) {
  const q = conceptQs(c)[0] || {}, t = TOPIC[q.topic], sb = t && (t.subs || []).find(x => x.id === q.sub);
  const where = q.ladderName || (linksFor(q)[0] || [])[2] || '';
  return [where ? capFirst(where.replace(/^(Guide|Reference|Tell apart|Diagram) ?\d*: ?/, '')) : '', t ? t.name : '', sb ? sb.name : ''].filter(Boolean).join(' · ');
}
/* How much an exam question on it would cost: the highest tier among its questions, a verbatim poll weighs more. */
const relevance = c => Math.max(1, ...conceptQs(c).map(q => (q.level || 1) * ((q.tags || []).includes('pollev') && q.sub === 'verbatim' ? 1.5 : 1)));
const isWeak = s => s === 'struggling' || s === 'returning' || s === 'unfamiliar' || s === 'improving';
/* ---------- Practice concept: the adaptive retest (quiz mode 'concept') ----------
   Each concept in turn: its other questions first (a dupOf sibling of the one missed, then a
   wording not seen this session, then any), and once the student has it right, one step up
   (the next tier of its ladder, else a question from the same section). Three questions per
   concept at most; a spaced check asks one. The same question is not served twice within
   10 minutes while another is available. The session ends with a summary per concept. */
let CPLAN = null, WK = {all: false};
function startConceptQuiz(concepts, label, opts = {}) {
  concepts = [...new Set(concepts)].filter(c => conceptQs(c).length);
  if (!concepts.length) { alert('No questions match that selection.'); return; }
  // every question the session may draw on, for the count line and the all-on-one-page layout
  const list = [...new Set(concepts.flatMap(c => conceptQs(c).concat(stepUpPool(c))))];
  CPLAN = {items: concepts.map(c => ({c, asked: [], upAsked: null, max: opts.check ? 1 : Math.min(3, Math.max(2, conceptQs(c).length))})), i: 0, t0: Date.now(), check: !!opts.check, concepts};
  startQuiz(list, label, 'concept', opts);
}
const stepUpPool = c => { const qsOf = conceptQs(c), lad = qsOf.find(q => q.ladder), lvl = Math.max(0, ...qsOf.map(q => q.level || 0)); if (lad) { const up = ladderQs(lad.ladder).filter(q => (q.level || 0) > lvl); if (up.length) return up; } const q0 = qsOf[0]; return q0 ? examPool().filter(q => q.topic === q0.topic && q.sub === q0.sub && conceptOf(q) !== c) : []; };
/* Of several candidates, not the one answered in the last 10 minutes nor the one just shown, then a fresh wording this session. */
function prefer(cands, sesIds, lastId) {
  if (!cands.length) return null;
  const now = Date.now();
  let c = cands.filter(q => q.id !== lastId && !(S.q[q.id] && S.q[q.id].last > now - REPEAT_GAP)); if (!c.length) c = cands.filter(q => q.id !== lastId); if (!c.length) c = cands;
  const fresh = c.filter(q => !sesIds.has(q.id));
  return shuffle(fresh.length ? fresh : c)[0];
}
function pickConcept() {
  if (!Q.cq) { Q.cq = CPLAN || {items: [], i: 0, t0: Date.now(), concepts: []}; CPLAN = null; }
  const P = Q.cq, sesIds = new Set(sessionLog().map(e => e.id)), lastId = Q.cur ? Q.cur.id : null;
  while (P.i < P.items.length) {
    const it = P.items[P.i], c = it.c, asked = new Set(it.asked);
    if (it.upAsked) { P.i++; continue; }
    const ans = S.log.filter(e => e.t >= P.t0 && byId[e.id] && conceptOf(byId[e.id]) === c), gotRight = ans.some(solid);
    // the concept's own wordings: until one is right and two have been asked (one, for a spaced check)
    if (it.asked.length < it.max && (!gotRight || it.asked.length < Math.min(2, it.max))) {
      const qsOf = conceptQs(c), lastMiss = ans.slice().reverse().find(e => !solid(e)) || (logByConcept(S.log)[c] || []).slice().reverse().find(e => !solid(e));
      const open = qsOf.filter(q => !asked.has(q.id));
      const sib = lastMiss ? open.filter(q => q.dupOf === lastMiss.id || byId[lastMiss.id].dupOf === q.id) : [];
      let q = prefer(sib, sesIds, lastId) || prefer(open, sesIds, lastId);
      if (!q && qsOf.length === 1 && !gotRight) q = qsOf[0];   // the only wording, still missed: once more
      if (q) { it.asked.push(q.id); return q; }
    }
    if (gotRight && !P.check) {
      const up = prefer(stepUpPool(c).filter(q => !asked.has(q.id)), sesIds, lastId);
      if (up) { it.upAsked = up.id; return up; }
    }
    P.i++;
  }
  return null;
}
function conceptDone() {
  const P = Q.cq || {items: [], t0: Date.now(), concepts: []}; syncConcepts();
  const rows = P.items.map(it => {
    const ans = S.log.filter(e => e.t >= P.t0 && byId[e.id] && conceptOf(byId[e.id]) === it.c), r = ans.filter(solid).length, rec = S.c[it.c];
    const upE = it.upAsked && S.log.slice().reverse().find(e => e.t >= P.t0 && e.id === it.upAsked), upQ = it.upAsked && byId[it.upAsked];
    return `<li><b>${esc(conceptTitle(it.c))}</b>: ${r} of ${ans.length} right${upE ? ` · step up${upQ && upQ.level ? ' (Tier ' + upQ.level + ')' : ''} ${solid(upE) ? 'right' : 'missed'}` : ''}${rec ? `, now ${esc(STATUS_WORD[rec.s].toLowerCase())}` : ''}</li>`;
  });
  $('#view').innerHTML = `<div class="card"><h2>${P.check ? 'Spaced review finished' : 'Practice finished'}</h2><p>${Q.right} of ${Q.done} correct.</p>${rows.length ? `<ul class="wsum">${rows.join('')}</ul>` : ''}
    <div class="row"><button class="btn" id="toweak">Weak spots</button><button class="btn ghost" id="cagain">Practice again</button><button class="btn ghost" id="totopics">Topics</button></div></div>`;
  $('#toweak').onclick = () => go('weak');
  $('#cagain').onclick = () => startConceptQuiz(P.concepts, Q.label, {check: P.check});
  $('#totopics').onclick = () => go('topics');
}
ensureC();


/* ---------- Weak spots ----------
   1. This session: answers, accuracy, the last 20 in order, first half vs second half.
   2. Concepts: "Due for spaced review" (mastered concepts whose check is due), then one
      card per weak concept (strugglers first, weighted by misses × recency × tier, then
      unfamiliar, then improving): status with its evidence, the option(s) chosen more than
      once with why each is wrong, partial credit on a select-all, the answer, the idea,
      a folded "More" with the full teach, Practice concept and the Read links. Mastered
      concepts sit in a folded list. 3. By topic and by skill, folded away. */
/* "The idea" in the review plan: the first one or two sentences of the teach, without
   repeating the answer shown just above it. A teach that opens with the answer as a whole
   sentence (a term's meaning, then "Twins poll: …") drops that sentence; one that opens with
   the answer as its subject ("Phenoxybenzamine is the one irreversible …") reads "It is …", and one that
   opens "Answer: definition" keeps the definition.
   Nothing left, or only the answer again: no line. */
const firstSentence = t => { const m = String(t || '').replace(/<[^>]+>/g, '').match(/^(.*?[.!?](\s|$)){1,2}/); const r = (m ? m[0] : String(t || '')).trim(); return r.length > 320 ? r.slice(0, 317) + '…' : r; };
const bareTxt = x => String(x).toLowerCase().replace(/[^a-z0-9α-ω]+/g, '');
function planIdea(q) {
  let t = String(q.teach || '').replace(/<[^>]+>/g, '').trim();
  const right = (q.options || []).filter(o => o.correct).map(o => o.t.trim());
  if (right.length === 1) {
    const a = right[0].replace(/[.!?]+$/, '');
    if (a && t.toLowerCase().startsWith(a.toLowerCase())) {
      const rest = t.slice(a.length);
      if (!rest.trim() || /^[.!?]+(\s|$)/.test(rest)) t = rest.replace(/^[.!?]*\s*/, '');
      else if (/^: \S/.test(rest)) t = rest.slice(2).replace(/^[a-z]/, c => c.toUpperCase());   // "Potentiation: one drug …" → "One drug …"
      else if (/^ (is|was|are|binds|activates|blocks|does|has|acts|sits|penetrates|inhibits|stimulates|causes|lowers|raises|reduces|increases|prevents|releases|works)\b/.test(rest)) t = 'It' + rest;
    }
  }
  const idea = t ? firstSentence(t) : '';
  // what is left only restates the answer (a definition question): say it once
  if (!idea || (right.length && bareTxt(idea).includes(bareTxt(right.join(' '))) && bareTxt(idea).length < bareTxt(right.join(' ')).length + 40)) return '';
  return idea;
}
function vWeak() {
  const pool = examPool(), ex = active(), mineId = id => byId[id] && examOf(byId[id]) === ex.id, now = Date.now();
  // everything on this page is about the exam being studied
  if (!S.log.some(e => mineId(e.id))) { $('#view').innerHTML = `<h2>Weak spots</h2><div class="row" style="margin:-4px 0 8px">${examSwitch()}</div><div class="empty">No ${esc(ex.name)} answers yet. Answer some questions and this fills in: your progress this session, the concepts to review first with what you keep choosing and why it is wrong, and where to read about each one.</div>`; return; }
  const G = syncConcepts();
  const recent = {};
  S.log.forEach(e => { (recent[e.id] = recent[e.id] || []).push(e); });
  const score = q => { const r = (recent[q.id] || []).slice(-3); if (!r.length) return null; return r.filter(solid).length / r.length; };
  const notSolid = pool.filter(q => score(q) != null && score(q) < 1);
  let h = `<h2>Weak spots</h2><div class="row" style="margin:-4px 0 8px">${examSwitch()}</div>`, retryList = [];
  // 1. this session (its answers on this exam's questions)
  const ses = sessionLog().filter(e => mineId(e.id));
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

  // 2. concepts: every concept of this exam with answers, its record and its counts
  const cs = Object.keys(G).filter(c => G[c].some(e => examOf(e.q) === ex.id)).map(c => { const list = G[c].filter(e => examOf(e.q) === ex.id); return {c, list, rec: S.c[c], st: conceptStats(c, list)}; });
  const lastMissT = x => x.st.lastMiss ? x.st.lastMiss.t : 0;
  const weight = x => x.st.misses * (1 / (1 + (now - lastMissT(x)) / DAY)) * relevance(x.c);
  const strug = cs.filter(x => x.rec.s === 'struggling' || x.rec.s === 'returning').sort((p, q) => weight(q) - weight(p));
  const unfam = cs.filter(x => x.rec.s === 'unfamiliar').sort((p, q) => lastMissT(q) - lastMissT(p));
  const impr = cs.filter(x => x.rec.s === 'improving').sort((p, q) => lastMissT(q) - lastMissT(p));
  const weak = strug.concat(unfam, impr), mastered = cs.filter(x => x.rec.s === 'mastered').sort((p, q) => conceptDue(p.c) - conceptDue(q.c)), onTrack = cs.filter(x => x.rec.s === 'learning');
  const due = mastered.filter(x => conceptDue(x.c) <= now);
  const chip = s => `<span class="wchip s-${s}">${STATUS_WORD[s]}</span>`;
  const reason = x => {
    const {st, rec} = x, when = st.last ? agoText(st.last.t) : '';
    if (rec.s === 'unfamiliar') return `Seen once, missed once · ${when}`;
    if (rec.s === 'improving') return `Missed ${st.misses} of ${st.n}, last 2 solid · ${plural(st.seen, 'question')} · ${plural(st.sessions, 'session')} · ${when}`;
    if (rec.s === 'mastered') return `${st.solidN} solid on ${plural(st.solidQs, 'question')} across ${plural(st.solidSess, 'session')} · check due ${inText(conceptDue(x.c))}`;
    if (rec.s === 'learning') return `${plural(st.n, 'right answer')}, no miss · not yet mastered`;
    return `${rec.s === 'returning' || rec.r ? 'Was mastered, missed again · ' : ''}Missed ${st.misses} of ${st.n}${st.guessed ? ` (${st.guessed} guessed)` : ''} · ${plural(st.seen, 'question')} · ${plural(st.retests, 'retest')} passed · ${plural(st.sessions, 'session')} · ${when}`;
  };
  const card = x => {
    const {c, st} = x, q = st.best, right = (q.options || []).filter(o => o.correct).map(o => o.t), errs = st.recurring.length ? st.recurring : st.errs.slice(0, 1);
    let b = `<div class="card wcard" data-c="${esc(c)}"><div class="wtitle"><b>${esc(conceptTitle(c))}</b>${chip(x.rec.s)}</div><div class="meta wline">${esc(conceptLine(c))}</div><div class="wreason">${esc(reason(x))}</div>`;
    b += `<div class="wclar"><b>What needs clarification</b>`;
    errs.forEach(er => { b += `<div class="pw"><b>${er.n > 1 ? `You keep choosing (${er.n}×):` : 'You chose:'}</b> ${esc(er.o.t)}${er.o.why ? `<br><span class="meta">Why it is not the answer: ${esc(er.o.why)}</span>` : ''}</div>`; });
    if (!errs.length && st.guessed) b += `<div class="pw"><b>Right, but marked a guess${st.guessed > 1 ? ` (${st.guessed}×)` : ''}.</b></div>`;
    if (st.partial) b += `<div class="pw"><b>Select all:</b> ${st.partial.hit} of ${st.partial.of} right, ${plural(st.partial.bad, 'wrong tick')}</div>`;
    if (right.length) b += `<div class="pr"><b>Answer:</b> ${esc(right.join(' · '))}</div>`;
    else if (q.type === 'match' && q.pairs) b += `<div class="pr"><b>Answer:</b> ${esc(q.pairs.map(p => p.l + ' → ' + p.r).join(' · '))}</div>`;
    const idea = planIdea(q); if (idea) b += `<div class="pi"><b>The idea:</b> ${esc(idea)}</div>`;
    b += `<details class="wmore"><summary>More</summary><div class="meta" style="margin:6px 0 2px">${esc(q.stem)}</div>${q.teach ? `<div class="teach">${teachHTML(q.teach)}</div>` : ''}<div class="cite">${esc(fmtCite(q.cite))}</div></details></div>`;
    b += `<div class="row wact"><button class="btn" data-practice="${esc(c)}">Practice concept</button>${linksFor(q).map(([v, a, t]) => `<button type="button" class="chip" data-jump="${v}:${a}">Read: ${esc(t)}</button>`).join('')}</div></div>`;
    return b;
  };
  if (due.length) h += `<h3>Due for spaced review (${due.length})</h3><div class="card">${due.map(x => `<div class="wrow"><span>${esc(conceptTitle(x.c))}<small class="meta" style="display:block;margin:0">${esc(reason(x))}</small></span><button class="btn ghost" data-practice="${esc(x.c)}" data-check="1">Check</button></div>`).join('')}
    <div class="row" style="margin-top:8px"><button class="btn" id="duecheck">Run the ${due.length === 1 ? 'check' : due.length + ' checks'}</button></div></div>`;
  if (weak.length) {
    const top = weak.slice(0, 6);
    h += `<h3>Concepts to review (${weak.length})</h3><p class="sub">${strug.length ? strug.length + ' struggling · ' : ''}${unfam.length ? unfam.length + ' unfamiliar · ' : ''}${impr.length ? impr.length + ' improving · ' : ''}strugglers first, weighted by misses, how recent and the tier. Each card says what you chose, why it is wrong, and the idea; Practice asks a different wording first.</p>
      <div class="row" style="margin:0 0 12px"><button class="btn" id="reviewweak">Review weak spots (${top.length === 1 ? '1 concept' : top.length + ' concepts'})</button></div>`;
    const shown = WK.all ? weak : weak.slice(0, 8);
    h += shown.map(card).join('');
    if (weak.length > shown.length) h += `<div class="row" style="margin:0 0 12px"><button class="btn ghost" id="wkmore">Show ${weak.length - shown.length} more</button></div>`;
  } else h += `<h3>Concepts to review</h3><div class="card">No ${esc(ex.name)} concept is weak on the evidence so far.${onTrack.length || mastered.length ? '' : ' Answer more questions and the weak ones appear here.'}</div>`;
  if (onTrack.length) h += `<p class="meta">${plural(onTrack.length, 'concept')} right so far but not yet mastered (one right answer never masters: it takes 3 solid answers on 2 questions in 2 sessions).</p>`;
  if (mastered.length) h += `<details class="gread"><summary>Mastered (${mastered.length})</summary><div class="card">${mastered.map(x => `<div class="wrow"><span>${esc(conceptTitle(x.c))}<small class="meta" style="display:block;margin:0">${esc(reason(x))}</small></span><button class="btn ghost" data-practice="${esc(x.c)}" data-check="1">Check</button></div>`).join('')}</div></details>`;

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
  if (notSolid.length) h += `<div class="row" style="margin:6px 0 14px"><button class="btn ghost" id="missall">Drill all ${notSolid.length} not-solid questions</button></div>`;
  $('#view').innerHTML = h;
  const ma = $('#missall'); if (ma) ma.onclick = () => startQuiz(notSolid, 'Weak spots', 'sr');
  const rs = $('#retrysess'); if (rs) rs.onclick = () => startQuiz(retryList, 'Missed this session', 'sr');
  const rw = $('#reviewweak'); if (rw) rw.onclick = () => startConceptQuiz(weak.slice(0, 6).map(x => x.c), 'Weak spots');
  const dc = $('#duecheck'); if (dc) dc.onclick = () => startConceptQuiz(due.map(x => x.c), 'Spaced review', {check: true});
  const wm = $('#wkmore'); if (wm) wm.onclick = () => { WK.all = true; vWeak(); };
  document.querySelectorAll('[data-practice]').forEach(b => b.onclick = () => startConceptQuiz([b.dataset.practice], conceptTitle(b.dataset.practice), {check: !!b.dataset.check}));
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
/* The paper in progress is saved under <ns>:exam:<profile> on every answer, flag and move, so a reload
   or a discarded tab brings it back with its clock still running (restored at start-up; an expired
   paper is submitted when the exam page opens). A submitted paper stays saved until "New exam". */
const EXKEY = () => COURSE.ns + ':exam:' + PROFILE;
function saveExam() {
  if (!EX) return;
  const {exam, name, qs, i, ans, flag, orders, ends, done, score, noBack} = EX;
  store.set(EXKEY(), JSON.stringify({exam, name, qs, i, ans, flag, orders, ends, done, score, noBack: !!noBack}));
}
function loadExam() {
  try {
    const x = JSON.parse(store.get(EXKEY()) || 'null');
    if (!isObj(x) || !Array.isArray(x.qs) || !x.qs.length || !x.qs.every(id => byId[id] && !byId[id].type) || !Number.isFinite(+x.ends)) return null;
    if (!Array.isArray(x.orders) || x.orders.length !== x.qs.length || !x.orders.every((o, k) => Array.isArray(o) && o.length === byId[x.qs[k]].options.length && o.every(n => Number.isInteger(n) && n >= 0 && n < o.length))) return null;
    // an answer is kept only when it fits its question now (a content update can turn single-answer into select-all)
    const fits = (q, a) => { const ok = n => Number.isInteger(n) && n >= 0 && n < q.options.length; return q.multi ? Array.isArray(a) && a.every(ok) : ok(a); };
    const ans = {}; if (isObj(x.ans)) Object.keys(x.ans).forEach(id => { const a = x.ans[id]; if (byId[id] && x.qs.includes(id) && fits(byId[id], a)) ans[id] = a; });
    return {exam: +x.exam || null, name: typeof x.name === 'string' ? x.name : '', qs: x.qs, i: Math.max(0, Math.min(x.qs.length - 1, Math.floor(+x.i) || 0)), ans, flag: isObj(x.flag) ? x.flag : {}, orders: x.orders, ends: +x.ends, done: !!x.done, score: Number.isFinite(+x.score) ? +x.score : 0, noBack: !!x.noBack};
  } catch (e) { return null; }
}
EX = loadExam();
// the browser asks before a reload or close discards the page while a paper is open (the paper is saved, but the clock runs on)
window.onbeforeunload = () => (EX && !EX.done) ? '' : undefined;
function drawExam(n) {
  const ex = active(), pools = ex.pools;
  // Definition questions are capped at 15% of the paper, whatever their share of the bank.
  const nTerm = Math.round(n * 0.15);
  const termPool = shuffle(QUESTIONS.filter(q => q.skill === 'term' && !q.lowYield && !q.noExam && pools.some(p => inFilter(q, p.filter))));
  const termPick = []; const termSeen = new Set();
  for (const q of termPool) { if (termPick.length >= nTerm) break; if (termSeen.has(q.concept)) continue; termPick.push(q); termSeen.add(q.concept); }
  n -= termPick.length;
  const eligible = p => QUESTIONS.filter(q => inFilter(q, p.filter) && !q.lowYield && !q.noExam && !q.type && q.skill !== 'term');
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
      if (used.has(q.id) || (q.dupOf && used.has(q.dupOf)) || [...used].some(u => byId[u].dupOf === q.id || (q.dupOf && byId[u].dupOf === q.dupOf))) continue;   // siblings of one original too
      if (concepts.has(q.concept) && list.some(o => !used.has(o.id) && !concepts.has(o.concept))) continue;
      out.push(q); used.add(q.id); concepts.add(q.concept); want[i]--;
    }
    for (const q of list) { if (want[i] <= 0) break; if (!used.has(q.id)) { out.push(q); used.add(q.id); want[i]--; } }
  });
  let paper = out.concat(termPick);
  // the number of true/false items she announced (exam.tf): swap items in or out of the draw
  if (Number.isInteger(ex.tf)) {
    const isTF = q => Array.isArray(q.options) && q.options.length === 2 && q.options.every(o => /^(true|false)$/i.test(String(o.t).trim()));
    const tf = paper.filter(isTF), rest = paper.filter(q => !isTF(q)), all = pools.flatMap(p => eligible(p)).filter(q => !used.has(q.id) && !termPick.includes(q));
    const moreTF = shuffle(all.filter(q => isTF(q) && !q.dupOf)), moreMC = shuffle(all.filter(q => !isTF(q) && !q.dupOf));
    while (tf.length > ex.tf && moreMC.length) { tf.pop(); rest.push(moreMC.pop()); }
    while (tf.length < ex.tf && moreTF.length && rest.length) { rest.pop(); tf.push(moreTF.pop()); }
    paper = rest.concat(tf);
  }
  return shuffle(paper);
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
  const elig = examPool().filter(q => !q.lowYield && !q.noExam && !q.type && q.skill !== 'term');
  // a blueprint whose parts carry their own tests (Exam 2) sorts by those; otherwise the Exam 1 keyword rules
  const catOf = bp.parts.some(p => p.test) ? q => (bp.parts.find(p => p.test && p.test(q)) || bp.parts.find(p => p.rest)).key : bpCat;
  const by = {}; elig.forEach(q => (by[catOf(q)] = by[catOf(q)] || []).push(q));
  const total = active().questions, out = [], used = new Set();
  const ok = q => !used.has(q.id) && !(q.dupOf && used.has(q.dupOf)) && ![...used].some(u => byId[u].dupOf === q.id || (q.dupOf && byId[u].dupOf === q.dupOf));
  const cat = new Map();
  const take = (key, n) => {
    const list = shuffle((by[key] || []).slice()), seen = new Set();
    const firsts = list.filter(q => !seen.has(q.concept) && seen.add(q.concept));   // one per concept before repeats
    let got = 0;
    for (const q of firsts.concat(list)) { if (got >= n) break; if (!ok(q)) continue; out.push(q); used.add(q.id); cat.set(q.id, key); got++; }
    return got;   // fewer than asked when the topic is short of questions
  };
  let left = total;
  bp.parts.forEach(p => { if (p.rest || p.min) return; const n = Array.isArray(p.n) ? p.n[0] + Math.floor(Math.random() * (p.n[1] - p.n[0] + 1)) : p.n; left -= take(p.key, n); });
  const g = bp.parts.find(p => p.min); if (g) left -= take(g.key, g.min);
  const r = bp.parts.find(p => p.rest); if (r) left -= take(r.key, left);
  // a topic short of questions still leaves a full-length paper: fill from the rest of the bank
  for (const q of shuffle(elig)) { if (left <= 0) break; if (ok(q)) { out.push(q); used.add(q.id); cat.set(q.id, catOf(q)); left--; } }
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
  // "All": every question the draw can use (definition questions held to 15% of the paper, as drawExam does)
  const ex = active(), xp = examPool().filter(q => !q.lowYield && !q.noExam && !q.type), nonTerm = xp.filter(q => q.skill !== 'term').length;
  const max = nonTerm + Math.min(new Set(xp.filter(q => q.skill === 'term').map(q => q.concept)).size, Math.floor(nonTerm * 0.15 / 0.85));
  // a paper whose clock ran out while the page was away (or closed) is submitted as it stands
  if (EX && !EX.done && (EX.expired || EX.ends <= Date.now())) { submitExam(); return; }
  if (EX && !EX.done) return renderExam();
  // a finished paper stays on its result page until "New exam" (or the learner switches exam)
  if (EX && EX.done && (!EX.exam || EX.exam === ex.id)) return examResult();
  const lens = [...new Set([ex.questions, 25, 50, max].filter(x => x && x <= max))].sort((a, b) => a - b);
  let h = `<h2>Exam simulator</h2><div class="row" style="margin:-4px 0 8px">${examSwitch()}</div><p class="sub">${esc(ex.name)}: ${ex.questions ? ex.questions + ' questions' : 'question count not yet announced'}, ${ex.minutes} minutes allotted.
    Answers are not shown until you submit. Select-all items are scored all-or-nothing. ${ex.blueprint ? 'With his topic counts on, the paper follows them; otherwise definition' : 'Definition'} questions make up at most 15% of the paper.</p>
    <div class="card"><div class="row"><span>Length:</span>${lens.map(n => `<button type="button" class="chip ${n === (ex.questions || lens[0]) ? 'on' : ''}" aria-pressed="${n === (ex.questions || lens[0])}" data-n="${n}">${n === max ? 'All ' + n : n}</button>`).join('')}</div>
    ${ex.blueprint ? `<div style="margin-top:10px"><label id="bplab"><input type="checkbox" id="bp" checked> Match his topic counts (the full ${ex.questions}-question paper only)</label>
      <details class="fold bpl"><summary>His topic counts</summary><ul class="bpcols">${ex.blueprint.parts.map(p => `<li>${esc(p.name)}: <b>${p.rest ? 'the rest' : p.min ? 'at least ' + p.min : Array.isArray(p.n) ? p.n.join('–') : p.n}</b></li>`).join('')}<li>Select-all items: <b>${ex.blueprint.sata}</b></li></ul></details></div>` : ''}
    <div class="row" style="margin-top:10px"><label><input type="checkbox" id="scale" checked> Scale the clock to the length (${ex.minutes} min for the full paper)</label></div>
    <div class="row" style="margin-top:10px"><span class="meta" style="margin:0">Answer:</span>${layoutToggle()}</div>
    ${ex.noBack ? `<label class="row" style="margin-top:10px;gap:6px;align-items:flex-start"><input type="checkbox" id="noback" ${store.get(COURSE.ns + ':noback') === '1' ? 'checked' : ''}><span>Her exam format: one question at a time with no going back, as she said for ExamSoft ("no backwards nav", 10/21). Leave it off to practice with Previous and either layout.</span></label>` : ''}
    <div class="row" style="margin-top:12px"><button class="btn" id="startx">Start</button></div></div>`;
  // a finished paper of the other exam is kept: say where it is
  if (EX && EX.done && EX.exam && EX.exam !== ex.id) { const o = COURSE.exams.find(e => e.id === EX.exam); h += `<p class="sub" id="keptres">Your last ${esc(o ? o.name : 'other exam')} paper (${EX.score}/${EX.qs.length}) is kept: ${focusOn() ? 'turn off Smith focus and choose ' + esc(o ? o.name : 'it') : 'choose ' + esc(o ? o.name : 'it') + ' above'} to see its result.</p>`; }
  h += pastAttempts(ex);
  $('#view').innerHTML = h;
  let n = ex.questions || lens[0];
  // the topic counts apply to the full paper only: the box is greyed out (not silently ignored) at any other length
  const bpState = () => { const bp = $('#bp'); if (bp) bp.disabled = n !== ex.questions; };
  document.querySelectorAll('[data-n]').forEach(c => c.onclick = () => { n = +c.dataset.n; document.querySelectorAll('[data-n]').forEach(x => { x.classList.toggle('on', x === c); x.setAttribute('aria-pressed', x === c); }); bpState(); });
  bpState();
  // (the layout chips on this page only restyle themselves: see the delegated handler)
  $('#startx').onclick = () => {
    const paper = ex.blueprint && n === ex.questions && $('#bp') && $('#bp').checked ? drawBlueprint(ex.blueprint) : drawExam(n);
    const full = ex.questions || max;
    const mins = $('#scale').checked ? Math.max(5, Math.round(ex.minutes * paper.length / full)) : ex.minutes;
    const nb = !!($('#noback') && $('#noback').checked); if ($('#noback')) store.set(COURSE.ns + ':noback', nb ? '1' : '0');
    EX = {exam: ex.id, name: ex.name, qs: paper.map(q => q.id), i: 0, ans: {}, flag: {}, orders: paper.map(q => optOrder(q)), ends: Date.now() + mins * MIN, done: false, noBack: nb};
    renderExam();
  };
}
/* The last eight papers of one exam, newest first; attempts saved before papers named their exam show under both. */
function pastAttempts(ex) {
  const past = (S.exams || []).filter(e => !e.exam || e.exam === ex.id);
  return past.length ? `<h3>Past attempts: ${esc(ex.name)}</h3><div class="card" id="pastx">${past.slice(-8).reverse().map(e => `<div class="topicrow"><span>${esc(fmtDateTime(+e.t))}</span><span>${+e.score}/${+e.n} (${Math.round(100 * e.score / e.n)}%)</span></div>`).join('')}</div>` : '';
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
const xCount = n => `${n} of ${EX.qs.length}<span class="xlong"> answered</span>`;
/* Every exam question on one page; answers are kept in EX.ans exactly as in the one-at-a-time view. */
function renderExamAll() {
  const n = EX.qs.filter(examAnswered).length;
  // the layout chips sit above the sticky bar, so on a phone the bar is one row: count · clock · Submit
  let h = `<div class="row" style="justify-content:flex-end;margin:0 0 6px">${layoutToggle()}</div><div class="row allhead xhead" style="justify-content:space-between"><b id="xcount">${xCount(n)}</b><span class="row"><span class="timer" id="clock" role="timer"></span><button class="btn" id="submit">Submit<span class="xlong"> exam</span></button></span></div>`;
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
    const k = +b.dataset.k, q = byId[EX.qs[k]]; examPick(q, +b.dataset.o); saveExam();
    const card = $('#xq' + k), a = EX.ans[q.id];
    card.querySelectorAll('[data-o]').forEach((o, m) => { const oi = +o.dataset.o, sel = q.multi ? (a || []).includes(oi) : a === oi; o.classList.toggle('sel', sel); if (q.multi) o.querySelector('.k').textContent = sel ? '☑' : '☐'; });
    const n = EX.qs.filter(examAnswered).length; const hd = $('#xcount'); if (hd) hd.innerHTML = xCount(n);
  };
  $('#submit').onclick = askSubmit; $('#submit2').onclick = askSubmit;
  examTick();
}
function renderExam() {
  clearInterval(TICK);
  if (EX.done) return examResult();
  saveExam();   // every pick, move and layout change comes through here
  if (S.layout === 'all' && !EX.noBack) return renderExamAll();
  clearView();
  // moving to another question starts at its stem; picking an option keeps the page where it is
  if (EX.shown !== EX.i) { EX.shown = EX.i; window.scrollTo(0, 0); }
  const q = byId[EX.qs[EX.i]], ord = EX.orders[EX.i], a = EX.ans[q.id];
  let h = `<div class="row" style="justify-content:space-between"><b>${EX.name ? esc(EX.name) + ' · ' : ''}Question ${EX.i + 1} of ${EX.qs.length}</b><span class="row"><span class="timer" id="clock" role="timer"></span>${EX.noBack ? '' : layoutToggle()}</span></div>
    ${EX.noBack ? '<p class="sub" style="margin:4px 0">No going back: once you move on you cannot return to this question.</p>' : ''}<div class="grid"${EX.noBack ? ' hidden' : ''}>${EX.qs.map((id, k) => `<button data-j="${k}"${EX.noBack ? ' disabled' : ''} class="${examAnswered(id) ? 'ans' : ''} ${k === EX.i ? 'cur' : ''} ${isFlagged(id) ? 'flag' : ''}" aria-label="Question ${k + 1}${examAnswered(id) ? ', answered' : ''}${isFlagged(id) ? ', flagged' : ''}"${k === EX.i ? ' aria-current="true"' : ''}>${k + 1}</button>`).join('')}</div>
    <div class="card"><div class="stem">${esc(q.stem)}</div>${stemMedia(q)}`;
  ord.forEach((oi, n) => {
    const sel = q.multi ? (a || []).includes(oi) : a === oi;
    h += `<button class="opt ${sel ? 'sel' : ''}" data-o="${oi}" aria-pressed="${sel}"><span class="k">${q.multi ? (sel ? '☑' : '☐') : LETTERS[n]}</span><span>${esc(q.options[oi].t)}</span></button>`;
  });
  h += `</div><div class="row">${EX.noBack ? '' : `<button class="btn ghost" id="prev" ${EX.i ? '' : 'disabled'}>Previous</button>`}
    ${EX.noBack ? '' : flagBtn(q.id)}
    <button class="btn ghost" id="next" ${EX.i < EX.qs.length - 1 ? '' : 'disabled'}>Next</button>
    <button class="btn" id="submit">Submit exam</button></div>`;
  $('#view').innerHTML = h;
  const shown = Date.now();
  document.querySelectorAll('[data-o]').forEach(b => b.onclick = e => { if (e.detail && Date.now() - shown < 350) return; examPick(q, +b.dataset.o); renderExam(); });
  if (!EX.noBack) document.querySelectorAll('[data-j]').forEach(b => b.onclick = () => { EX.i = +b.dataset.j; renderExam(); });
  if ($('#prev')) $('#prev').onclick = () => { EX.i--; renderExam(); };
  $('#next').onclick = () => { if (exLeaveOk()) { EX.i++; renderExam(); } };
  $('#submit').onclick = askSubmit;
  examTick();
}
/* Her format has no going back, so moving on from a blank question asks first. */
const exLeaveOk = () => !EX.noBack || examAnswered(EX.qs[EX.i]) || confirm('Move on without answering? You cannot come back to this question.');
const exRight = (q, a) => q.multi ? (Array.isArray(a) && gradeMulti(q, new Set(a))) : (Number.isInteger(a) && !!q.options[a] && !!q.options[a].correct);
function submitExam() {
  clearInterval(TICK);
  EX.done = true;
  let score = 0;
  EX.qs.forEach(id => {
    const q = byId[id], a = EX.ans[id], ok = exRight(q, a);
    if (ok) score++;
    // an unanswered question counts against the paper's score but is not a miss in the learner's record
    if (!examAnswered(id)) return;
    const st = qs(id); st.n++; if (ok) st.ok++;
    noteAnswer(q, {id, t: Date.now(), ok, conf: 'exam', picked: a, ms: 0});
    schedule(id, ok ? 'unsure' : 'wrong');
  });
  S.exams = S.exams || []; S.exams.push({t: Date.now(), n: EX.qs.length, score, exam: EX.exam});
  EX.score = score; save(); saveExam(); examResult();
  setTimeout(() => motivSuggest('exam'), 1500);
}
function examResult() {
  clearView();
  const qsx = EX.qs.map(id => byId[id]);
  const by = (fn, nm) => { const g = {}; qsx.forEach(q => { const k = fn(q); g[k] = g[k] || {n: 0, ok: 0}; g[k].n++; if (exRight(q, EX.ans[q.id])) g[k].ok++; });
    return Object.entries(g).sort((x, y) => (x[0] === 'No tier') - (y[0] === 'No tier') || x[0].localeCompare(y[0], undefined, {numeric: true})).map(([k, v]) => `<tr><td>${esc(nm(k))}</td><td>${v.ok}/${v.n}</td><td>${Math.round(100 * v.ok / v.n)}%</td></tr>`).join(''); };
  // switching exam here opens the other exam's start page; this result stays until "New exam" and shows again on switching back
  const exr = COURSE.exams.find(e => e.id === EX.exam);
  let h = `<h2>Exam result: ${EX.score}/${EX.qs.length} (${Math.round(100 * EX.score / EX.qs.length)}%)</h2><div class="row" style="margin:-4px 0 8px">${examSwitch()}</div>${EX.name ? `<p class="sub">${esc(EX.name)}</p>` : ''}
    <div class="row"><button class="btn" id="newx">New exam</button><button class="btn ghost" id="missx">Drill the ones I missed</button></div>
    <h3>By topic</h3><div class="tablewrap"><table><thead><tr><th>Topic</th><th>Right</th><th>%</th></tr></thead><tbody>${by(q => q.topic, k => (TOPIC[k] || {}).name || k)}</tbody></table></div>
    <h3>By skill</h3><div class="tablewrap"><table><thead><tr><th>Skill</th><th>Right</th><th>%</th></tr></thead><tbody>${by(q => q.skill, k => (SKILL[k] || {}).label || k)}</tbody></table></div>
    ${qsx.some(q => q.level) ? `<h3>By tier</h3><div class="tablewrap"><table><thead><tr><th>Tier</th><th>Right</th><th>%</th></tr></thead><tbody>${by(q => q.level ? 'Tier ' + q.level : 'No tier', k => k)}</tbody></table></div>` : ''}
    ${exr ? pastAttempts(exr) : ''}
    <h3>Review</h3>`;
  qsx.forEach((q, k) => {
    const a = EX.ans[q.id], ok = exRight(q, a), pickedSet = new Set([].concat(a == null ? [] : a));
    h += `<div class="card"><div class="row" style="justify-content:space-between"><span class="meta">${k + 1}. ${metaLine(q)}</span>${flagBtn(q.id)}</div><div class="stem">${esc(q.stem)}</div>${stemMedia(q)}
      <div class="verdict ${ok ? 'ok' : 'bad'}">${ok ? '✓ Correct' : !examAnswered(q.id) ? '✗ Not answered' : '✗ Not correct'}</div>`;
    const hidden = [];   // the figure, the notes and the cite fold behind "More", as on a quiz card
    (q.options || []).forEach((o, oi) => { h += `<div class="opt${o.correct ? ' right' : pickedSet.has(oi) ? ' wrong' : ''}" style="cursor:default"><span>${esc(o.t)}</span></div>${o.why ? `<div class="why">${esc(o.why)}</div>` : ''}`; });
    if (!ok) {
      if (q.teach) h += `<div class="teach">${teachHTML(q.teach)}</div>`;
      if (q.note) h += `<div class="note">${esc(q.note)}</div>`;
    }
    if (typeof NARR_Q !== 'undefined' && NARR_Q[q.id]) h += `<div class="row qsay"><button type="button" class="chip" data-qsay="${q.id}">🔊 Hear the why</button><span class="meta" style="margin:0">${typeof Q_CLIPS !== 'undefined' && !Q_CLIPS.includes(q.id) ? 'device voice' : 'read by the narrator'}</span></div>`;
    h += moreHTML(q, hidden) + explainHTML(q) + '</div>';
  });
  $('#view').innerHTML = h;
  $('#newx').onclick = () => { endExam(); vExam(); };
  const missed = qsx.filter(q => !exRight(q, EX.ans[q.id]));
  if (!missed.length) $('#missx').disabled = true;
  $('#missx').onclick = () => { if (!missed.length) return; endExam(); startQuiz(missed, 'Missed on the exam', 'sr'); };
}

/* ---------- Terms: glossary with figures, flashcards, generated questions ---------- */
let TM = {mode: 'glossary', group: 'all', card: null, shown: false, scope: 'exam'};   // scope: the glossary lists this exam's terms, or both exams'
const termExam = t => lecExam(t.lecture) || 1;
const termList = () => (typeof TERMS === 'undefined' ? [] : TERMS).filter(t => (lecExam(t.lecture) || 1) === activeId() && (TM.group === 'all' || t.group === TM.group));
const termKey = t => 'term:' + t.id;
/* Glossary search and A–Z: the search box filters as you type (term, one-line
   meaning, definition, example), the letter bar jumps to a letter (switching to
   A–Z order), and a floating button returns to the search bar once it is off screen. */
const LETTERS_AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').concat('#');
const termLetter = t => { const c = (t.term.match(/[A-Za-z]/) || [''])[0].toUpperCase(); return /^[A-Za-z]/.test(t.term.trim()) ? c : '#'; };
// withExam: search and A–Z mix both exams, so each card says which exam it belongs to
// a term's situation card: the exam-style question when one is written, none when the scene form is dropped
const tScene = t => t.dropScene ? '' : (t.sceneQ || t.scene || '');
const termHTML = (t, withExam) => `<div class="term" id="term-${esc(t.id)}"><b>${esc(t.term)}</b>${withExam ? ` <span class="exlabel">Exam ${lecExam(t.lecture) || 1}</span>` : ''}${t.gist ? `<div class="gist">${esc(t.gist)}</div>` : ''}<div>${esc(t.def)}</div>${t.scene ? `<div class="hook"><b>In action:</b> ${esc(t.scene)}</div>` : ''}${t.hook ? `<div class="hook">${esc(t.hook)}</div>` : ''}${t.fig ? figHTML(t.fig) : ''}<div class="cite">${esc(fmtCite(t.cite))}</div></div>`;
function glossWire(all, groups) {
  const box = $('#tsearch'), list = $('#glist');
  const draw = () => {
    const q = (TM.q || '').trim().toLowerCase();
    const both = TM.scope === 'both';
    let pool = all.filter(t => (both || termExam(t) === activeId()) && (TM.group === 'all' || t.group === TM.group));
    if (q) pool = pool.filter(t => [t.term, t.gist, t.def, t.scene].join(' ').toLowerCase().includes(q));
    const az = q || TM.order === 'az';
    let h = '';
    if (!pool.length) h = `<div class="card empty">No term matches “${esc(TM.q)}”. Try a shorter word, or pick a letter above.</div>`;
    else if (q) {
      // a search lists terms whose name matches first, then terms that only mention the word
      const named = pool.filter(t => t.term.toLowerCase().includes(q)), rest = pool.filter(t => !named.includes(t));
      const srt = l => l.slice().sort((a, b) => a.term.localeCompare(b.term, undefined, {sensitivity: 'base'}));
      if (named.length) h += `<h3>Term names with “${esc(TM.q.trim())}”</h3><div class="card">${srt(named).map(t => termHTML(t, both)).join('')}</div>`;
      if (rest.length) h += `<h3>Also mentioned in</h3><div class="card">${srt(rest).map(t => termHTML(t, both)).join('')}</div>`;
    } else if (az) {
      const sorted = pool.slice().sort((a, b) => a.term.localeCompare(b.term, undefined, {sensitivity: 'base'}));
      const byL = {}; sorted.forEach(t => (byL[termLetter(t)] = byL[termLetter(t)] || []).push(t));
      LETTERS_AZ.filter(L => byL[L]).forEach(L => { h += `<h3 id="tl-${L === '#' ? 'num' : L}">${L}</h3><div class="card">${byL[L].map(t => termHTML(t, both)).join('')}</div>`; });
    } else if (!both) {
      // this exam only: one section per group, no exam fold
      h = groups.filter(g => TM.group === 'all' || g === TM.group).map(g => { const ts = pool.filter(t => t.group === g); return ts.length ? `<h3>${esc(g)}</h3><div class="card">${ts.map(t => termHTML(t)).join('')}</div>` : ''; }).join('')
        || `<div class="card empty">No terms of this group for ${esc(active().name)} yet.</div>`;
    } else {
      // by group: one collapsible section per exam; search and A–Z list both exams together.
      // A group chip of the other exam opens that exam's section (the studied one would be empty).
      const has = e => pool.some(t => termExam(t) === e.id);
      h = COURSE.exams.map(e => {
        const mine = pool.filter(t => termExam(t) === e.id);
        const body = groups.filter(g => TM.group === 'all' || g === TM.group).map(g => { const ts = mine.filter(t => t.group === g); return ts.length ? `<h3>${esc(g)}</h3><div class="card">${ts.map(t => termHTML(t)).join('')}</div>` : ''; }).join('');
        const open = TM.group === 'all' ? null : has(e);
        return exGroup(e, body || (TM.group === 'all' ? '<div class="empty">This exam\'s terms are added as its lectures are written.</div>' : '<div class="empty">No terms of this group in this exam.</div>'), open);
      }).join('');
    }
    list.innerHTML = h;
    $('#tcount').textContent = q ? `${pool.length} match${pool.length === 1 ? '' : 'es'}` : `${pool.length} terms`;
    $('#tclear').hidden = !TM.q;
  };
  box.oninput = () => { TM.q = box.value; draw(); };
  $('#tclear').onclick = () => { TM.q = ''; box.value = ''; draw(); box.focus(); };
  const orderOn = k => document.querySelectorAll('[data-order]').forEach(x => { x.classList.toggle('on', x.dataset.order === k); x.setAttribute('aria-pressed', x.dataset.order === k); });
  document.querySelectorAll('[data-order]').forEach(c => c.onclick = () => { TM.order = c.dataset.order; orderOn(TM.order); draw(); });
  document.querySelectorAll('[data-scope]').forEach(c => c.onclick = () => { TM.scope = c.dataset.scope; TM.q = ''; box.value = ''; vTerms(); });
  document.querySelectorAll('[data-lt]').forEach(b => b.onclick = () => {
    if (TM.q) { TM.q = ''; box.value = ''; }
    if (TM.order !== 'az') { TM.order = 'az'; orderOn('az'); }
    draw();
    const el = document.getElementById('tl-' + (b.dataset.lt === '#' ? 'num' : b.dataset.lt)); if (el) scrollToEl(el);
  });
  draw();
  // floating "back to search" once the bar has scrolled away
  const bar = $('#tbar');
  if (window.IntersectionObserver) {
    const hd = document.querySelector('header'), top = Math.round((hd ? hd.getBoundingClientRect().height : 0) + 4);
    const io = TIO = new IntersectionObserver(([e]) => {
      let b = document.getElementById('tback');
      if (e.isIntersecting || CUR !== 'terms' || TM.mode !== 'glossary' || !document.body.contains(bar)) { if (b) b.remove(); if (!document.body.contains(bar)) io.disconnect(); return; }
      if (!b) { b = document.createElement('button'); b.id = 'tback'; b.type = 'button'; b.className = 'btn'; b.textContent = '↑ Search or pick a letter'; document.body.appendChild(b); }
      b.onclick = () => { scrollToEl(bar); b.remove(); };
    }, {rootMargin: `-${top}px 0px 0px 0px`});
    io.observe(bar);
  }
}
let TIO = null;   // the glossary's scroll watcher; one at a time
function vTerms() {
  { const tb = document.getElementById('tback'); if (tb) tb.remove(); if (TIO) { TIO.disconnect(); TIO = null; } }
  const all = typeof TERMS === 'undefined' ? [] : TERMS;
  if (!all.length) { $('#view').innerHTML = '<h2>Terms</h2><div class="empty">No glossary in this build.</div>'; return; }
  const groups = [...new Set(all.map(t => t.group))];
  // flashcards and the term quiz use the exam being studied; the glossary shows both exams
  const tq = QUESTIONS.filter(q => q.topic === 'TERMS' && (TM.mode === 'glossary' || examOf(q) === activeId()));
  const mine = all.filter(t => termExam(t) === activeId());
  const chipGroups = TM.mode === 'glossary' && TM.scope === 'both' ? groups : [...new Set(mine.map(t => t.group))];
  if (TM.group !== 'all' && !chipGroups.includes(TM.group)) TM.group = 'all';
  let h = `<h2>Terms</h2><div class="row" style="margin:-4px 0 8px">${examSwitch()}</div><p class="sub">${mine.length} terms for ${esc(active().name)}, each with its source (${all.length} across all exams; the glossary can show them all). Each term has a one-line meaning, a situation that shows it in action, and, where one applies, a figure.</p>
  <div class="card"><div class="row">${[['glossary', 'Glossary'], ['flash', 'Flashcards'], ['quiz', 'Quiz me']].map(([k, l]) => `<button type="button" class="chip ${TM.mode === k ? 'on' : ''}" aria-pressed="${TM.mode === k}" data-mode="${k}">${l}</button>`).join('')}
   <span class="meta" style="margin:0 0 0 12px">Group:</span>${['all'].concat(chipGroups).map(g => `<button type="button" class="chip ${TM.group === g ? 'on' : ''}" aria-pressed="${TM.group === g}" data-group="${esc(g)}">${g === 'all' ? 'All' : esc(g)}</button>`).join('')}</div></div>`;
  const list = termList();
  if (TM.mode === 'glossary') {
    const pool = (TM.scope === 'both' ? all : mine).filter(t => TM.group === 'all' || t.group === TM.group);
    const have = new Set(pool.map(termLetter));
    h += `<div class="card tbar" id="tbar"><div class="row" style="flex-wrap:nowrap"><input id="tsearch" type="search" placeholder="Search the terms (name, meaning or example)…" value="${esc(TM.q || '')}" autocomplete="off" aria-label="Search the terms">
      <button class="btn ghost" id="tclear" type="button" ${TM.q ? '' : 'hidden'}>Clear</button></div>
      <div class="letters" role="navigation" aria-label="Jump to a letter">${LETTERS_AZ.filter(L => L !== '#' || have.has('#')).map(L => `<button type="button" class="lt" data-lt="${L}" ${have.has(L) ? '' : 'disabled'}>${L}</button>`).join('')}</div>
      <div class="row" style="margin-top:6px"><span class="meta" style="margin:0">Order:</span>${[['group', 'By group'], ['az', 'A–Z']].map(([k, l]) => `<button type="button" class="chip ${(TM.order || 'group') === k ? 'on' : ''}" aria-pressed="${(TM.order || 'group') === k}" data-order="${k}">${l}</button>`).join('')}${COURSE.exams.length > 1 ? `<span class="meta" style="margin:0 0 0 8px">Show:</span>${[['exam', esc(active().name) + ' only'], ['both', 'Both exams']].map(([k, l]) => `<button type="button" class="chip ${TM.scope === k ? 'on' : ''}" aria-pressed="${TM.scope === k}" data-scope="${k}">${l}</button>`).join('')}` : ''}<span class="meta" id="tcount" aria-live="polite" style="margin:0 0 0 auto"></span></div></div>
      <div id="glist"></div>`;
  } else if (TM.mode === 'flash' && !list.length) {
    h += `<div class="card empty">No flashcards for ${esc(active().name)} in this group yet.</div>`;
  } else if (TM.mode === 'flash') {
    const now = Date.now();
    const due = list.filter(t => S.q[termKey(t)] && S.q[termKey(t)].due <= now);
    const unseen = list.filter(t => !S.q[termKey(t)]);
    if (!TM.card || !list.includes(TM.card)) {
      // the card just rated ("Did not know" makes it due at once) is not served straight back while another exists
      const others = l => l.filter(t => t.id !== TM.last);
      const cands = others(due).length ? others(due) : others(unseen).length ? others(unseen) : others(list).length ? others(list) : list;
      TM.card = shuffle(cands)[0]; TM.shown = false;
    }
    const t = TM.card, st = S.q[termKey(t)];
    const seen = list.filter(x => S.q[termKey(x)]).length;
    h += `<div class="meta">${seen}/${list.length} cards seen · ${due.length} due · ${unseen.length} new · this card: ${st ? 'seen ' + st.n + '×' : 'new'}</div><div class="card"><div class="flash"><div class="meta">${esc(t.group)}</div>`;
    // front of the card: the situation, with the term hidden; the term and its meaning come on the back
    if (tScene(t) && !TM.shown) h += `${t.sceneQ ? '' : '<div class="meta" style="margin-bottom:6px">Which term is this?</div>'}<div style="font-size:18px">${esc(tScene(t))}</div>`;
    else h += `<div class="t">${esc(t.term)}</div>${t.gist ? `<div class="gist" style="margin-top:4px">${esc(t.gist)}</div>` : ''}`;
    if (TM.shown) h += `<div style="text-align:left;margin-top:14px">${tScene(t) ? `<div class="hook" style="margin-bottom:6px"><b>In action:</b> ${esc(tScene(t))}</div>` : ''}<div>${esc(t.def)}</div>${t.hook ? `<div class="hook" style="color:var(--muted);margin-top:4px">${esc(t.hook)}</div>` : ''}${t.fig ? figHTML(t.fig) : ''}<div class="cite">${esc(fmtCite(t.cite))}</div></div>
      <div class="row" style="justify-content:center;margin-top:14px"><button class="btn" data-fc="sure">Knew it</button><button class="btn ghost" data-fc="unsure">Not sure</button><button class="btn ghost" data-fc="wrong">Did not know</button></div>`;
    else h += `<div class="row" style="justify-content:center;margin-top:14px"><button class="btn" id="fcshow">${tScene(t) ? 'Show the term' : 'Show definition'}</button></div>`;
    h += `</div></div>`;
  } else {
    const pool = tq.filter(q => TM.group === 'all' || (TOPIC.TERMS.subs.find(s => s.id === q.sub) || {}).name === TM.group);
    h += `<div class="card"><p>${pool.length} questions in three forms: recognise the term from a situation, pick the term's one-line meaning, or name the term from its definition. They count toward Weak spots under the skill "Terms".</p>
      <div class="row"><button class="btn" id="tq">Start</button></div></div>`;
  }
  $('#view').innerHTML = h;
  if (TM.mode === 'glossary') glossWire(all, groups);
  document.querySelectorAll('[data-mode]').forEach(c => c.onclick = () => { TM.mode = c.dataset.mode; vTerms(); });
  document.querySelectorAll('[data-group]').forEach(c => c.onclick = () => { TM.group = c.dataset.group; TM.card = null; vTerms(); });
  const sh = $('#fcshow'); if (sh) sh.onclick = () => { TM.shown = true; vTerms(); };
  document.querySelectorAll('[data-fc]').forEach(b => b.onclick = () => {
    const k = termKey(TM.card), st = qs(k), ok = b.dataset.fc !== 'wrong';
    st.n++; if (ok) st.ok++;   // "Not sure" counts as right, as it does in the quiz (the box is held, not raised)
    schedule(k, ok ? b.dataset.fc : 'wrong'); save();
    TM.last = TM.card.id; TM.card = null; vTerms();
  });
  const tqb = $('#tq'); if (tqb) tqb.onclick = () => {
    const pool = tq.filter(q => TM.group === 'all' || (TOPIC.TERMS.subs.find(s => s.id === q.sub) || {}).name === TM.group);
    startQuiz(pool, 'Terms', 'sr');
  };
}


/* ---------- Pair up: drag a chip onto its match, or tap the chip and then the match ----------
   Sets are 1:1 (one chip per target; a big set serves 7 pairs a round) or bins (several chips go
   into one target). Check marks each chip; wrong chips return to the tray. Facts come from the
   receptor map and the Exam 2 list, with the figure captions' sources. */
const PAIR_SETS = [
  // pairs: [chip, where it belongs, why, where to see it (data-jump or data-jumpx target)]
  {id: 'rec', name: 'Receptor → what an agonist does there', cite: 'ANS slides 13, 24, 27, 31, 34–35; Adrenergic slide 18; (T) 10/1', pairs: [
    ['β1 in the heart', 'rate and force up', 'β1 is Gs: cAMP goes up, and in the heart the rate and the contractility rise (sympathetic).', 'diagrams:dg-e2-body-map@3'],
    ['M2 in the heart', 'bradycardia', 'M2 is Gi: cAMP goes down and K+ channels open, so the heart slows (parasympathetic).', 'diagrams:dg-e2-body-map@3'],
    ['α1 on vessel smooth muscle', 'constriction', 'α1 is Gq: Ca++ rises in the smooth muscle and it contracts; TPR and afterload go up.', 'diagrams:dg-e2-body-map@4'],
    ['β2 on vessel or airway smooth muscle', 'dilation', 'β2 is Gs: cAMP relaxes smooth muscle. In the airway it is reached by adrenal epinephrine, not by a nerve.', 'diagrams:dg-e2-body-map@2'],
    ['M3 on the endothelium', 'nitric oxide: dilation', 'M3 is Gq on the lining cell: its Ca++ makes nitric oxide, which relaxes the muscle next door. Same Gq as α1, opposite result, because the cell is different.', 'diagrams:dg-e2-gprotein-anim@2'],
    ['M3 in the gut', 'more motility: diarrhea', 'M3 is Gq on gut smooth muscle: Ca++ rises, motility and tone go up, the D of DUMBBELSS.', 'diagrams:dg-e2-body-map@6'],
    ['α2 on the sympathetic nerve ending', 'less NE released', 'α2 is Gi on the nerve ending itself, the presynaptic brake: less NE comes out. Clonidine uses it; mirtazapine blocks it.', 'diagrams:dg-e2-adr-synapse-anim@3'],
    ['β1 on the JG cells', 'renin release', 'β1 is Gs on the juxtaglomerular cells: renin is released, the first step of the RAAS. A β blocker lowers it.', 'diagrams:dg-e2-raas-anim@0'],
    ['β3 in the bladder', 'relaxes: urine retained', 'β3 is Gs on bladder smooth muscle: cAMP relaxes it, so the bladder holds more urine (mirabegron).', 'diagrams:dg-e2-body-map@6'],
    ['M3 in the bladder', 'urination', 'M3 is Gq on the bladder muscle: Ca++ rises and it contracts, the U of DUMBBELSS.', 'diagrams:dg-e2-body-map@6'],
    ['α1 in the eye', 'mydriasis', 'α1 is Gq on the radial muscle of the iris: it contracts and pulls the pupil open (phenylephrine).', 'diagrams:dg-e2-body-map@1'],
    ['M3 in the eye', 'miosis', 'M3 is Gq on the circular muscle of the iris: it contracts and the pupil narrows, the M of DUMBBELSS.', 'diagrams:dg-e2-body-map@1'],
    ['Nn in a ganglion', 'Na+ in: the next neuron fires', 'Nn is an ion channel, not a GPCR: ACh opens it, Na+ enters and the postganglionic neuron fires. Both divisions use it.', 'diagrams:dg-e2-nerve-anim@1'],
    ['Nm on skeletal muscle', 'contraction', 'Nm is the ion channel at the neuromuscular junction: ACh opens it, Na+ enters, the muscle contracts. N for neuron, M for muscle.', 'diagrams:dg-e2-nmj-anim@2']]},
  {id: 'dumb', name: 'DUMBBELSS: each letter, with its receptor', cite: 'ANS slides 24, 27; Cholinergic slides 13–14', pairs: [
    ['D', 'Diarrhea (gut M3)', 'Gut smooth muscle M3 (Gq): more motility and tone.', 'diagrams:dg-e2-musc-map'],
    ['U', 'Urination (bladder M3)', 'Bladder muscle M3 (Gq): contraction.', 'diagrams:dg-e2-musc-map'],
    ['M', 'Miosis (eye M3)', 'Circular muscle of the iris, M3 (Gq): the pupil narrows.', 'diagrams:dg-e2-musc-map'],
    ['B (first)', 'Bradycardia (heart M2)', 'Heart M2 (Gi): cAMP down, the rate falls. The one letter that is not M3 or M1.', 'diagrams:dg-e2-musc-map'],
    ['B (second)', 'Bronchial constriction (airway M3)', 'Airway smooth muscle M3 (Gq): contraction; the lungs are parasympathetic only.', 'diagrams:dg-e2-musc-map'],
    ['E', 'Emesis (CNS M1)', 'Brain M1 (Gq): excitation, vomiting.', 'diagrams:dg-e2-musc-map'],
    ['L', 'Lacrimation (glands M3)', 'Lacrimal glands M3 (Gq): secretion.', 'diagrams:dg-e2-musc-map'],
    ['S (first)', 'Salivation (glands M3)', 'Salivary glands M3 (Gq): secretion. Both divisions cause it, because the sympathetic fiber here releases ACh.', 'diagrams:dg-e2-musc-map'],
    ['S (second)', 'Stimulation of the CNS (M1)', 'Brain M1 (Gq): excitation. His spelling DUMBBELSS has two S: salivation, then stimulation.', 'diagrams:dg-e2-musc-map']]},
  {id: 'anti', name: 'Anti-DUMBBELSS: what the antagonist gives instead', cite: 'Cholinergic slides 19, 30, 32', pairs: [
    ['Diarrhea', 'Constipation', 'Atropine blocks gut M3: the motility ACh drove is gone.', 'diagrams:dg-e2-chol-synapse-anim@3'],
    ['Urination', 'Urinary retention', 'Bladder M3 blocked: the muscle does not contract (oxybutynin, trospium use this).', 'diagrams:dg-e2-chol-synapse-anim@3'],
    ['Miosis', 'Mydriasis', 'Iris circular muscle M3 blocked: the pupil widens (tropicamide).', 'diagrams:dg-e2-chol-synapse-anim@3'],
    ['Bradycardia', 'Tachycardia', 'Heart M2 blocked: the parasympathetic tone that holds the rate down is removed, so the sympathetic side runs unopposed.', 'diagrams:dg-e2-chol-synapse-anim@3'],
    ['Bronchial constriction', 'Bronchial dilation', 'Airway M3 blocked: the airway opens (ipratropium, tiotropium).', 'diagrams:dg-e2-chol-synapse-anim@3'],
    ['Emesis, CNS stimulation', 'CNS effects: hallucinations, restlessness, coma', 'Brain M1 blocked: his slide 32 lists hallucinations, restlessness and coma at high doses.', 'diagrams:dg-e2-chol-synapse-anim@3'],
    ['Lacrimation', 'Dry eyes', 'Lacrimal gland M3 blocked: no secretion.', 'diagrams:dg-e2-chol-synapse-anim@3'],
    ['Salivation', 'Dry mouth', 'Salivary gland M3 blocked: xerostomia, the ADR every muscarinic antagonist shares.', 'diagrams:dg-e2-chol-synapse-anim@3']]},
  {id: 'gprot', name: 'Receptor → G protein, or ion channel', bins: true, cite: 'ANS slides 4, 13, 24, 34–35; RAAS lecture', pairs: [
    ['M1', 'Gq', 'M1 (brain): PLC, IP3, Ca++ up: excitation.', 'diagrams:dg-e2-gprotein-anim@1'],
    ['M2', 'Gi', 'M2 (heart): adenylate cyclase inhibited, cAMP down: bradycardia.', 'diagrams:dg-e2-gprotein-anim@4'],
    ['M3', 'Gq', 'M3 (everywhere else): PLC, IP3, Ca++ up: smooth muscle and glands.', 'diagrams:dg-e2-gprotein-anim@1'],
    ['α1', 'Gq', 'α1: PLC, IP3, Ca++ up: vasoconstriction, mydriasis.', 'diagrams:dg-e2-gprotein-anim@1'],
    ['α2', 'Gi', 'α2: cAMP down on the nerve ending: less NE released.', 'diagrams:dg-e2-gprotein-anim@4'],
    ['β1', 'Gs', 'β1: adenylate cyclase on, cAMP up: heart rate and force, renin.', 'diagrams:dg-e2-gprotein-anim@3'],
    ['β2', 'Gs', 'β2: cAMP up relaxes smooth muscle: bronchodilation, vasodilation.', 'diagrams:dg-e2-gprotein-anim@3'],
    ['β3', 'Gs', 'β3: cAMP up relaxes the bladder.', 'diagrams:dg-e2-gprotein-anim@3'],
    ['AT1', 'Gq', 'AT1: Ca++ up: vasoconstriction, aldosterone release.', 'diagrams:dg-e2-gprotein-anim@1'],
    ['AT2', 'Gi', 'AT2: the physiological antagonist of AT1.', 'diagrams:dg-e2-gprotein-anim@4'],
    ['Nn', 'ion channel: no G protein', 'Nn (ganglia, brain, adrenal medulla): Na+ in, no G protein.', 'diagrams:dg-e2-gprotein-anim@0'],
    ['Nm', 'ion channel: no G protein', 'Nm (skeletal muscle): Na+ in, no G protein.', 'diagrams:dg-e2-gprotein-anim@0']]},
  {id: 'drug', name: 'Drug → its receptor (Exam 2 list)', bins: true, cite: 'Pharmacology_Exam_2_Drug_List.pdf; the All drugs table', pairs: null}
];
// the drug set from the table: drugs whose receptor text names one receptor (or none); the why is the table's MOA
function pairDrugs() {
  const rows = (typeof DRUGS_ALL === 'undefined' ? [] : DRUGS_ALL).filter(r => r.exam === 2), out = [];
  rows.forEach(r => {
    const t = r.rec.replace(/<[^>]+>/g, '').trim(), name = drName(r);
    const bin = /^None/.test(t) ? 'no receptor: enzyme, transporter or release' : /^(β1|β2|β3|α1|α2|Nm|AT1|MR)\b(?![ ,]*(?:β|α|N[nm]|M[123]))/.test(t) ? t.match(/^(β1|β2|β3|α1|α2|Nm|AT1|MR)/)[1] : /^M[123]\b/.test(t) && !/α|β|N[nm]/.test(t) ? 'muscarinic (M1, M2, M3)' : null;
    if (bin) out.push([name, bin, r.moa.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(), r.why ? `x:ref:${r.anchor}:${r.id}` : `ref:${r.anchor}`]);
  });
  return out;
}
const PR = {set: 'rec', sel: null, round: [], placed: {}, result: null};
function pairRound() {
  const S0 = PAIR_SETS.find(x => x.id === PR.set); const all = S0.pairs || pairDrugs();
  // a small set is served whole (DUMBBELSS needs all nine letters); a big one serves 7 (bins: 12) a round
  PR.round = S0.bins ? (all.length > 12 ? shuffle(all).slice(0, 12) : shuffle(all)) : shuffle(all).slice(0, all.length <= 9 ? all.length : 7);
  PR.placed = {}; PR.sel = null; PR.result = null;
}
const pairSee = p => p[3] ? (p[3].startsWith('x:') ? `<button type="button" class="chip" data-jumpx="${esc(p[3].slice(2))}">See why</button>` : `<button type="button" class="chip" data-jump="${esc(p[3])}">See the figure</button>`) : '';
function vPair() {
  if (!PR.round.length) pairRound();
  const S0 = PAIR_SETS.find(x => x.id === PR.set), targets = [...new Set(PR.round.map(p => p[1]))], tray = PR.round.filter(p => !PR.placed[p[0]]);
  const chip = p => `<button type="button" class="pchip ${PR.sel === p[0] ? 'sel' : ''} ${PR.result ? (PR.result[p[0]] ? 'ok' : 'bad') : ''}" data-pc="${esc(p[0])}" aria-pressed="${PR.sel === p[0]}">${esc(p[0])}</button>`;
  const best = storeObj(COURSE.ns + ':pair')[PR.set];
  let h = `<h2>Pair up</h2><p class="sub">Drag each chip onto its match, or tap a chip and then tap where it goes. Check marks every chip and explains where it belongs and why, with a link to the figure that shows it. A tapped chip in a box returns to the tray.</p>
    <div class="card"><div class="row">${PAIR_SETS.map(x => `<button type="button" class="chip ${PR.set === x.id ? 'on' : ''}" aria-pressed="${PR.set === x.id}" data-pset="${x.id}">${esc(x.name)}</button>`).join('')}</div></div>
    <div class="card"><div class="row" style="justify-content:space-between"><b>${esc(S0.name)}</b><span class="meta" style="margin:0">${S0.bins ? 'several chips can share a box' : 'one chip per box'}${best ? ` · best ${best}` : ''}</span></div>
    <div class="ptray" id="ptray" aria-label="Chips to place">${tray.map(chip).join('') || '<span class="meta" style="margin:0">All placed. Check.</span>'}</div>
    <div class="pgrid">${targets.map(t => `<div class="ptarget" data-pt="${esc(t)}" role="button" tabindex="0"><div class="pl">${esc(t)}</div><div class="pin">${PR.round.filter(p => PR.placed[p[0]] === t).map(chip).join('')}</div></div>`).join('')}</div>
    <div class="row" style="margin-top:10px">${PR.result ? `<button type="button" class="btn" id="pretry">Retry the wrong ones</button>` : `<button type="button" class="btn" id="pcheck">Check</button>`}<button type="button" class="btn ghost" id="pnew">New round</button><span class="meta" id="pscore" aria-live="polite" style="margin:0">${PR.result ? `${Object.values(PR.result).filter(Boolean).length} of ${PR.round.length} right` : `${Object.keys(PR.placed).length} of ${PR.round.length} placed`}</span></div>`;
  if (PR.result) {
    // every chip: where it went, where it belongs, and the mechanism; wrong and unplaced ones first
    const rows = PR.round.slice().sort((a, b) => (PR.result[a[0]] ? 1 : 0) - (PR.result[b[0]] ? 1 : 0));
    h += `<div class="pfb">${rows.map(p => { const ok = PR.result[p[0]], at = PR.placed[p[0]];
      return `<div class="pfbr ${ok ? 'ok' : 'bad'}"><div><b>${ok ? '✓' : '✗'} ${esc(p[0])}</b> ${ok ? `→ ${esc(p[1])}` : at ? `was put under “${esc(at)}”; it belongs under <b>${esc(p[1])}</b>` : `was not placed; it belongs under <b>${esc(p[1])}</b>`}</div><div class="sub" style="margin:2px 0 0">${esc(p[2])}</div>${pairSee(p) ? `<div class="row" style="margin-top:4px">${pairSee(p)}</div>` : ''}</div>`; }).join('')}</div>`;
  }
  h += `<p class="sub" style="margin-top:8px">Sources: ${esc(S0.cite)}.</p></div>`;
  $('#view').innerHTML = h;
  document.querySelectorAll('[data-pset]').forEach(b => b.onclick = () => { PR.set = b.dataset.pset; PR.round = []; vPair(); });
  $('#pnew').onclick = () => { PR.round = []; vPair(); };
  const pc = $('#pcheck'); if (pc) pc.onclick = pairCheck;
  const prt = $('#pretry'); if (prt) prt.onclick = () => { PR.round.forEach(p => { if (!PR.result[p[0]]) delete PR.placed[p[0]]; }); PR.result = null; vPair(); };
  pairWire();
}
function pairPlace(name, target) {   // target: a right-side label, or null for the tray
  if (target) { const S0 = PAIR_SETS.find(x => x.id === PR.set); if (!S0.bins) { for (const k of Object.keys(PR.placed)) if (PR.placed[k] === target) delete PR.placed[k]; } PR.placed[name] = target; }
  else delete PR.placed[name];
  PR.sel = null; PR.result = null; vPair();
}
function pairCheck() {
  const res = {}; PR.round.forEach(p => { res[p[0]] = PR.placed[p[0]] === p[1]; });
  const right = Object.values(res).filter(Boolean).length;
  PR.result = res;   // placements stay as they are, so the explanation sits next to the mistake
  const all = storeObj(COURSE.ns + ':pair'); const score = `${right}/${PR.round.length}`; if (!all[PR.set] || +all[PR.set].split('/')[0] < right) { all[PR.set] = score; store.set(COURSE.ns + ':pair', JSON.stringify(all)); }
  vPair();
}
function pairWire() {
  const view = $('#view'); let drag = null;
  view.querySelectorAll('.pchip').forEach(c => {
    c.addEventListener('pointerdown', e => { drag = {name: c.dataset.pc, x: e.clientX, y: e.clientY, moved: false, ghost: null, el: c}; c.setPointerCapture(e.pointerId); });
    c.addEventListener('pointermove', e => {
      if (!drag || drag.el !== c) return;
      if (!drag.moved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 6) return;
      if (!drag.ghost) { drag.moved = true; const g = c.cloneNode(true); g.className = 'pchip pghost'; document.body.appendChild(g); drag.ghost = g; c.classList.add('lift'); }
      drag.ghost.style.left = (e.clientX - 20) + 'px'; drag.ghost.style.top = (e.clientY - 18) + 'px';
      view.querySelectorAll('.ptarget.over').forEach(t => t.classList.remove('over'));
      const under = document.elementFromPoint(e.clientX, e.clientY), t = under && under.closest('.ptarget'); if (t) t.classList.add('over');
    });
    const end = e => {
      if (!drag || drag.el !== c) return; const d = drag; drag = null;
      if (d.ghost) d.ghost.remove(); c.classList.remove('lift');
      if (d.moved) { const under = document.elementFromPoint(e.clientX, e.clientY), t = under && under.closest('.ptarget'), tray = under && under.closest('#ptray'); if (t) pairPlace(d.name, t.dataset.pt); else if (tray) pairPlace(d.name, null); else vPair(); return; }
      // a tap: in a box the chip returns to the tray; in the tray it is selected (or unselected)
      if (PR.placed[d.name]) pairPlace(d.name, null); else { PR.sel = PR.sel === d.name ? null : d.name; vPair(); }
    };
    c.addEventListener('pointerup', end); c.addEventListener('pointercancel', end);
  });
  view.querySelectorAll('.ptarget').forEach(t => {
    const go = () => { if (PR.sel) pairPlace(PR.sel, t.dataset.pt); };
    t.addEventListener('click', e => { if (!e.target.closest('.pchip')) go(); });
    t.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });
}

/* ---------- static pages ---------- */
/* Guides, Reference and Tell apart: the page title stays on top and each exam's
   content sits in its own collapsible group (Exam 2 content from guide2.js,
   reference2.js and tell2.js when they exist). */
const PAGE2 = {guide: () => typeof GUIDE2_HTML === 'undefined' ? '' : GUIDE2_HTML, ref: () => typeof REFERENCE2_HTML === 'undefined' ? '' : REFERENCE2_HTML, tell: () => typeof TELL2_HTML === 'undefined' ? '' : TELL2_HTML};
const PAGE3_T = {}, page3 = (k, h) => PAGE3_T[k] || (PAGE3_T[k] = tidyHtml(h));   // her quoted words without fillers, tidied once
const PAGE3 = {guide: () => typeof GUIDE3_HTML === 'undefined' ? '' : page3('guide', GUIDE3_HTML), ref: () => typeof REFERENCE3_HTML === 'undefined' ? '' : page3('ref', REFERENCE3_HTML), tell: () => typeof TELL3_HTML === 'undefined' ? '' : page3('tell', TELL3_HTML)};
const PAGE4_T = {}, page4 = (k, h) => PAGE4_T[k] || (PAGE4_T[k] = tidyHtml(h));
const PAGE4 = {guide: () => typeof GUIDE4_HTML === 'undefined' ? '' : page4('guide', GUIDE4_HTML), ref: () => typeof REFERENCE4_HTML === 'undefined' ? '' : page4('ref', REFERENCE4_HTML), tell: () => typeof TELL4_HTML === 'undefined' ? '' : page4('tell', TELL4_HTML)};
const PAGE_BY_EXAM = {2: PAGE2, 3: PAGE3, 4: PAGE4};
/* The pages are fixed for a build, so each body is expanded once (figures drawn, markers replaced);
   the exam groups around them are drawn each time, since the open one follows the exam studied. */
const PAGE_CACHE = {};
/* The legend paragraphs a page opens with (notation, deck names, slide-number caveats) fold behind
   "Notation & sources", closed by default, so the first section is on the first screen. Only the
   run of <p class="sub"> at the top of the page is looked at; an opening line that is not a legend
   stays above the fold. Done here, not in the page files, so every page gets the same fold. */
const LEGEND_RX = /Notation:|Cites:|Source shorthand:|Slide numbers marked/;
function foldLegend(html) {
  let rest = html, keep = '', leg = '';
  for (;;) { const m = rest.match(/^\s*<p class="sub">([\s\S]*?)<\/p>/); if (!m) break; rest = rest.slice(m[0].length); if (LEGEND_RX.test(m[1])) leg += m[0]; else keep += m[0]; }
  return keep + (leg ? `<details class="legend fold"><summary>Notation &amp; sources</summary>${leg}</details>` : '') + rest;
}
function examPage(html1, key) {
  const P = PAGE_CACHE[key] || (PAGE_CACHE[key] = (() => {
    const m = html1.match(/^\s*<h2>([^<]*)<\/h2>/), bodies = {1: expandFigs(foldLegend(m ? html1.slice(m[0].length) : html1))};
    Object.entries(PAGE_BY_EXAM).forEach(([id, pg]) => { const b = pg[key](); bodies[id] = b ? expandFigs(foldLegend(b)) : ''; });
    return {title: m ? m[1] : '', bodies};
  })());
  return `<h2>${P.title}</h2>` + COURSE.exams.map(e => exGroup(e, P.bodies[e.id] || '<div class="empty">This exam\'s sections are added as its lectures are written.</div>')).join('');
}
/* His figures are data URLs of up to a few hundred KB each. Pages carry only the key
   (<img data-img>) and the picture is attached after the page is built, so the browser does
   not parse megabytes of base64 as page markup on every visit (the Guides page held 2 MB). */
const imgTag = (k, alt) => `<img data-img="${esc(k)}" alt="${esc(alt)}" decoding="async">`;
const fillImgs = root => root.querySelectorAll('img[data-img]').forEach(i => { if (!i.getAttribute('src') && IMG[i.dataset.img]) i.src = IMG[i.dataset.img]; });
/* ---------- All drugs: the Exam 1 list and the Exam 2 list in one table ----------
   Rows come from drugs.js (generated from the two reference pages and the official Exam 2 list's
   colour code; nothing is typed here). The table can be searched, limited to one class or one
   exam, and regrouped by receptor family so the drugs that meet at one receptor sit together. */
const DR = {q: '', exam: 0, by: 'list', cls: ''};
const DR_CLS = [['agonist', 'Agonist'], ['antagonist', 'Antagonist'], ['indirect', 'Indirect'], ['donor', 'Donor'], ['inverse', 'Inverse agonist'], ['allosteric', 'Allosteric'], ['slide', 'Slide only']];
const DR_FAM = ['Nicotinic', 'Muscarinic', 'α adrenergic', 'β adrenergic', 'Histamine', 'Serotonin', 'GABA', 'Angiotensin AT1', 'Mineralocorticoid', 'No receptor: enzyme, transporter or release', 'Other'];
const drText = r => [r.name, r.also.join(' '), r.sec, r.fam.join(' '), r.clsLabel, r.sub.join(' '), r.moa, r.rec, r.soa, r.adr, r.why].join(' ').replace(/<[^>]+>/g, '').toLowerCase();
/* ===== Drug ↔ receptor drill: every drug on the Exam 2 table, one at a time =====
   "Name the receptor": the drug is shown with five answers written the way the table writes them (receptor line,
   then agonist, antagonist, indirect or donor); one is the table's own line, one is the same receptor with the
   action flipped, three belong to other drugs of the same section first. One tap answers.
   "Name the drug": a receptor-plus-action is shown and the drug is picked from four. Misses come back at the
   end of the round and lead the next one. */
const RX_RECS = ['α1', 'α2', 'β1', 'β2', 'β3', 'M1', 'M2', 'M3', 'Nn', 'Nm', 'AT1', 'MR'];
const RX_NONE = 'none';
const RX_ACTS = [['agonist', 'Agonist'], ['antagonist', 'Antagonist'], ['indirect', 'Indirect or donor: no receptor of its own']];
// rows whose table line names more than the exam asks for: [required, accepted extras]
const RX_OVER = {'e2alpha:mirt': [['α2'], ['α1', 'M1', 'M2', 'M3']], 'e2beta:epi': [['β1', 'β2'], ['α1', 'α2']], 'e2chol:scop': [['M1', 'M2', 'M3'], []],
  'e2nmj:sch': [['Nm'], ['Nn']], 'e2chol:oab': [['M3'], ['M1']], 'e2nmj:varen': [['Nn'], []]};
const rxRows = () => (typeof DRUGS_ALL === 'undefined' ? [] : DRUGS_ALL).filter(r => r.exam === 2 && r.cls !== 'slide' && r.id !== 'e2raas:meto');
function rxKey(r) {   // [required receptors, accepted extras, action]
  const act = r.cls === 'agonist' || r.cls === 'antagonist' ? r.cls : 'indirect';
  if (RX_OVER[r.id]) return [RX_OVER[r.id][0], RX_OVER[r.id][1], act];
  const t = r.rec.replace(/<[^>]+>/g, '').replace(/\([^)]*\)/g, '');
  if (/^None/.test(t)) return [[RX_NONE], [], act];
  const toks = t.split(/[,;=\s]+/), req = RX_RECS.filter(k => toks.includes(k));
  if (/muscarinic/i.test(t)) ['M1', 'M2', 'M3'].forEach(k => { if (!req.includes(k)) req.push(k); });
  return [req, [], act];
}
const rxLabel = (req, act) => (req[0] === RX_NONE ? 'no receptor of its own' : req.join(' + ')) + ' · ' + RX_ACTS.find(a => a[0] === act)[1].replace(/:.*$/, '').toLowerCase();
const RX = {mode: 'rec', queue: [], i: 0, sel: [], act: null, pick: null, result: null, right: 0, redo: [], round: 1};
function rxStart(ids) {
  const rows = rxRows(), miss = new Set(ids || (store.get(COURSE.ns + ':rx:miss') || '').split(',').filter(Boolean));
  const first = shuffle(rows.filter(r => miss.has(r.id))), rest = ids ? [] : shuffle(rows.filter(r => !miss.has(r.id)));
  RX.queue = first.concat(rest); RX.i = 0; RX.sel = []; RX.act = null; RX.pick = null; RX.result = null; RX.right = 0; RX.redo = []; RX.round = ids ? RX.round + 1 : 1;
}
function rxOptions(r) {   // "name the drug": the right drug and three with a different receptor-plus-action, from its own section first
  const sig = x => rxLabel(rxKey(x)[0], rxKey(x)[2]), mine = sig(r);
  const pool = rxRows().filter(x => x.id !== r.id && sig(x) !== mine);
  const near = shuffle(pool.filter(x => x.sec === r.sec)), far = shuffle(pool.filter(x => x.sec !== r.sec));
  return shuffle([r].concat(near.concat(far).slice(0, 3)));
}
// a row's answer as the table writes it: receptor line without its asides, then the class and its qualifier
const rxRecText = r => r.rec.replace(/<[^>]+>/g, '').replace(/\s*\([^)]*\)/g, '').replace(/^None directly/, 'No receptor directly').replace(/^None/, 'No receptor').trim();
const rxSig = r => `${rxRecText(r)} · ${r.cls}${r.sub.length ? ` (${r.sub.join(', ')})` : ''}`;
// the same receptor line with the action flipped: the distractor that catches a learner who knows the site but not the direction
const rxFlip = r => { const f = {agonist: 'antagonist', antagonist: 'agonist'}[r.cls]; return f && !/^No receptor/.test(rxRecText(r)) ? `${rxRecText(r)} · ${f}` : null; };
function rxAnswers(r) {   // "name the receptor": the right line, its flipped twin, then other drugs' lines (same section first)
  const mine = rxSig(r), seen = new Set([mine]), out = [mine];
  const flip = rxFlip(r); if (flip && !seen.has(flip)) { seen.add(flip); out.push(flip); }
  const pool = rxRows().filter(x => x.id !== r.id);
  shuffle(pool.filter(x => x.sec === r.sec)).concat(shuffle(pool.filter(x => x.sec !== r.sec))).forEach(x => { const t = rxSig(x); if (out.length < 5 && !seen.has(t)) { seen.add(t); out.push(t); } });
  return shuffle(out);
}
// the question for "name the drug": the table's receptor line without its asides, the action, the site
const rxAsk = r => `${r.rec.replace(/<[^>]+>/g, '').replace(/\s*\([^)]*\)/g, '').replace(/;.*$/, '').trim()} · ${RX_ACTS.find(a => a[0] === rxKey(r)[2])[1].replace(/:.*$/, '').toLowerCase()} · site: ${r.soa.replace(/<[^>]+>/g, '').replace(/;.*$/, '').trim()}`;
function vRxq() {
  if (!RX.queue.length) rxStart();
  const r = RX.queue[RX.i], total = RX.queue.length, done = RX.i + (RX.result ? 1 : 0);
  const best = storeObj(COURSE.ns + ':rx')[RX.mode];
  const name = r.name.replace(/<[^>]+>/g, '');
  const [req, extra, act] = rxKey(r);
  let h = `<h2>Drug ↔ receptor</h2><p class="sub">Every drug on the Exam 2 table, one at a time. Name the receptor: the drug is shown with five answers written the way the drug table writes them; tap the one that is the table's own line. Name the drug: a receptor, action and site are shown; tap the drug. A miss comes back at the end of the round and leads the next one.</p>
    <div class="card"><div class="row"><button type="button" class="chip ${RX.mode === 'rec' ? 'on' : ''}" aria-pressed="${RX.mode === 'rec'}" data-rxmode="rec">Name the receptor</button><button type="button" class="chip ${RX.mode === 'drug' ? 'on' : ''}" aria-pressed="${RX.mode === 'drug'}" data-rxmode="drug">Name the drug</button>
      <span class="meta" style="margin:0 0 0 auto">${RX.round > 1 ? `redo round ${RX.round} · ` : ''}drug ${Math.min(RX.i + 1, total)} of ${total} · ${RX.right} right${RX.redo.length ? ` · ${RX.redo.length} to redo` : ''}${best ? ` · best ${best}` : ''}</span></div></div>`;
  const chip = (k, lab, on, attr, cls) => `<button type="button" class="chip ${cls || ''} ${on ? 'on' : ''}" aria-pressed="${on}" ${attr}>${esc(lab)}</button>`;
  if (RX.mode === 'rec') {
    if (!RX.opts) RX.opts = rxAnswers(r);
    const mine = rxSig(r);
    h += `<div class="card rxcard"><div class="rxdrug">${esc(name)}</div><div class="sub">${esc(r.sec)}</div>
      <div class="rxq">Which receptor does it act on, and how? Pick one.</div>
      <div class="rxopts">${RX.opts.map(t => `<button type="button" class="rxopt ${RX.result ? (t === mine ? 'ok' : RX.pick === t ? 'bad' : '') : ''}" data-rxans="${esc(t)}" ${RX.result ? 'disabled' : ''}>${esc(t)}</button>`).join('')}</div>
      <div class="row" style="margin-top:10px">${RX.result ? `<button type="button" class="btn" id="rxnext">${RX.i + 1 < total ? 'Next drug' : RX.redo.length ? `Redo the ${RX.redo.length} missed` : 'New round'}</button>` : ''}<button type="button" class="btn ghost" id="rxskip">${RX.result ? 'Start over' : 'Skip'}</button></div>`;
  } else {
    if (!RX.opts) RX.opts = rxOptions(r);
    h += `<div class="card rxcard"><div class="rxq">Which drug is: <b>${esc(rxAsk(r))}</b>?</div><div class="sub">${esc(r.sec)}</div>
      <div class="rxopts">${RX.opts.map(o => `<button type="button" class="rxopt ${RX.result ? (o.id === r.id ? 'ok' : RX.pick === o.id ? 'bad' : '') : ''}" data-rxpick="${esc(o.id)}" ${RX.result ? 'disabled' : ''}>${esc(o.name.replace(/<[^>]+>/g, ''))}</button>`).join('')}</div>
      <div class="row" style="margin-top:10px">${RX.result ? `<button type="button" class="btn" id="rxnext">${RX.i + 1 < total ? 'Next' : RX.redo.length ? `Redo the ${RX.redo.length} missed` : 'New round'}</button>` : ''}<button type="button" class="btn ghost" id="rxskip">${RX.result ? 'Start over' : 'Skip'}</button></div>`;
  }
  if (RX.result) {
    const ok = RX.result.ok, why = r.why ? `<button type="button" class="chip" data-jumpx="ref:${r.anchor}:${esc(r.id)}">Why?</button>` : `<button type="button" class="chip" data-jump="ref:${r.anchor}">On the list</button>`;
    h += `<div class="pfb"><div class="pfbr ${ok ? 'ok' : 'bad'}"><b>${ok ? '✓' : '✗'} ${esc(name)}</b>: <b>${esc(rxSig(r))}</b>${RX.result.said ? `<br>You said: ${esc(RX.result.said)}` : ''}
      <div class="sub" style="margin-top:4px"><span class="dcls ${r.cls}">${esc(r.clsLabel)}</span>${r.sub.length ? ' · ' + esc(r.sub.join(', ')) : ''} · receptor: ${r.rec} · site: ${r.soa}</div>
      <div class="sub">${r.moa}${r.why ? ` <i>${r.why}</i>` : ''}</div><div class="row" style="gap:6px;margin-top:6px">${why}${drMapChips(r).replace(/^<div[^>]*>|<\/div>$/g, '')}</div></div></div>`;
  }
  h += `<p class="sub" style="margin-top:8px">Sources: the Exam 2 drug table (All drugs page), built from his slides and the official list.</p></div>`;
  $('#view').innerHTML = h;
  document.querySelectorAll('[data-rxmode]').forEach(b => b.onclick = () => { if (RX.mode === b.dataset.rxmode) return; RX.mode = b.dataset.rxmode; RX.opts = null; rxStart(); vRxq(); });
  document.querySelectorAll('[data-rxans]').forEach(b => b.onclick = () => { RX.pick = b.dataset.rxans; rxCheck(); });
  document.querySelectorAll('[data-rxpick]').forEach(b => b.onclick = () => { RX.pick = b.dataset.rxpick; rxCheck(); });
  const ck = $('#rxcheck'); if (ck) ck.onclick = rxCheck;
  const nx = $('#rxnext'); if (nx) { nx.onclick = rxNext; nx.focus(); }
  $('#rxskip').onclick = () => { if (RX.result) { RX.queue = []; RX.opts = null; vRxq(); } else { RX.redo.push(r); rxAdvance(); } };
}
function rxCheck() {
  const r = RX.queue[RX.i], [req, extra, act] = rxKey(r); let ok, said;
  if (RX.mode === 'rec') { ok = RX.pick === rxSig(r); said = RX.pick; }
  else { ok = RX.pick === r.id; const p = RX.opts.find(o => o.id === RX.pick); said = p ? p.name.replace(/<[^>]+>/g, '') : ''; }
  RX.result = {ok, said: ok ? '' : said}; if (ok) RX.right++; else RX.redo.push(r);
  vRxq();
}
function rxAdvance() {
  RX.sel = []; RX.act = null; RX.pick = null; RX.result = null; RX.opts = null;
  if (RX.i + 1 < RX.queue.length) { RX.i++; vRxq(); return; }
  // round over: keep the score, remember the misses for next time, then redo them or start fresh
  const all = storeObj(COURSE.ns + ':rx'), score = `${RX.right}/${RX.queue.length}`;
  if (RX.round === 1 && (!all[RX.mode] || +all[RX.mode].split('/')[0] / +all[RX.mode].split('/')[1] < RX.right / RX.queue.length)) { all[RX.mode] = score; store.set(COURSE.ns + ':rx', JSON.stringify(all)); }
  store.set(COURSE.ns + ':rx:miss', RX.redo.map(x => x.id).join(','));
  if (RX.redo.length) rxStart(RX.redo.map(x => x.id)); else rxStart();
  vRxq();
}
function rxNext() { rxAdvance(); }
document.addEventListener('keydown', e => { if (ANTI) return; if (CUR === 'rxq' && e.key === 'Enter' && !e.target.closest('button, input, select, textarea')) { const b = $('#rxnext') || $('#rxcheck'); if (b && !b.disabled) b.click(); } });

/* ===== Poisoning table drill: Dr. Smith's Poisoning Treatment Table 2026 KEY (poison_table.js) =====
   Her words on 10/20: "you do need to know the details that I have in my table, my key." Five ways in:
   name the antidote from the poison, the mechanism from the antidote, the poison from its symptoms, her
   special-consideration answers, and a cover-and-reveal copy of the whole table. Misses come back at the end
   of the round and lead the next one; the best first-round score per mode is kept. */
const PT_MODES = [['anti', 'Name the antidote'], ['moa', 'Name the mechanism'], ['poison', 'Name the poison'], ['special', 'Her special questions'], ['table', 'Cover and reveal']];
const ptRows = () => (typeof POISON_TABLE === 'undefined' ? [] : POISON_TABLE);
const ptRow = id => ptRows().find(r => r.id === id);
const ptAnti = r => (r.same ? ptRow(r.same) : r).anti;
const ptAntiLabel = r => ptAnti(r).map(a => a[0]).join('; ');
const PT_LONG = {'IV FE': 'IV FE (i.v. 20% fatty acid emulsion)'};
const ptMoaText = (r, a) => { const t = a[1].replace(/^(Atropine|Calcium|Glucagon|HIET|vasopressors|i\.v\. 20% fatty acid emulsion):\s*/i, ''); return t.charAt(0).toUpperCase() + t.slice(1); };
function ptItems(mode) {   // [{id, ask, sub, ans, row}]
  const rows = ptRows(), out = [];
  if (mode === 'anti') rows.forEach(r => out.push({id: 'a:' + r.id, ask: r.poison, sub: 'Antidote(s) in her table?', ans: ptAntiLabel(r), row: r}));
  if (mode === 'poison') rows.forEach(r => out.push({id: 'p:' + r.id, ask: r.sym, sub: 'Which overdose has these symptoms or diagnostic methods in her table?', ans: r.poison, row: r}));
  if (mode === 'moa') rows.filter(r => !r.same).forEach(r => r.anti.forEach((a, i) => out.push({id: 'm:' + r.id + ':' + i, ask: `${PT_LONG[a[0]] || a[0]} · ${r.poison} overdose`, sub: 'Mechanism of this antidote in her table?', ans: ptMoaText(r, a), row: r})));
  if (mode === 'special') rows.filter(r => r.special.length).forEach(r => out.push({id: 's:' + r.id, ask: `${r.poison}: ${r.special.map(s => s[0]).join(' ')}`, sub: 'Her answer in the key?', ans: r.special.map(s => s[1]).join(' '), row: r}));
  return out;
}
const PT = {mode: 'anti', queue: [], i: 0, opts: null, pick: null, result: null, right: 0, redo: [], round: 1, shown: {}};
function ptStart(ids) {
  const all = ptItems(PT.mode), miss = new Set(ids || (store.get(COURSE.ns + ':pt:miss:' + PT.mode) || '').split(',').filter(Boolean));
  const first = shuffle(all.filter(x => miss.has(x.id))), rest = ids ? [] : shuffle(all.filter(x => !miss.has(x.id)));
  PT.queue = first.concat(rest); PT.i = 0; PT.opts = null; PT.pick = null; PT.result = null; PT.right = 0; PT.redo = []; PT.round = ids ? PT.round + 1 : 1;
}
function ptOptions(it) {   // the right answer and up to four different answers from the same mode
  const seen = new Set([it.ans]), out = [it.ans];
  shuffle(ptItems(PT.mode)).forEach(x => { if (out.length < 5 && !seen.has(x.ans)) { seen.add(x.ans); out.push(x.ans); } });
  return shuffle(out);
}
const ptRowHTML = r => `<b>${esc(r.poison)}</b><div class="sub">Symptoms or diagnosis: ${esc(r.sym)}</div><div class="sub">Antidote(s): ${ptAnti(r).map(a => `<b>${esc(PT_LONG[a[0]] || a[0])}</b>: ${esc(ptMoaText(r, a))}`).join(' · ')}</div>${r.special.map(s => `<div class="sub">${esc(s[0])} <b>${esc(s[1])}</b></div>`).join('')}<div class="sub">Her reference column: ${esc(r.ref)}</div>`;
const ptDiag = id => { const ds = antiOK() ? ANTIDOTE_DIAGRAMS.filter(d => d.rows.includes(id)) : []; return ds.length ? `<div class="row" style="gap:6px;margin-top:6px"><span class="meta" style="margin:0">Diagram:</span>${ds.map(d => antiChip(d)).join('')}</div>` : ''; };
function ptTable() {
  // which columns start covered: all of them, only the antidote and its mechanism (recall from the symptoms), or only the symptoms (recall from the antidote)
  const hid = PT.cover || 'all', covered = k => !PT.shown[k] && (hid === 'all' || (hid === 'antimoa' && /:(anti|moa)$/.test(k)) || (hid === 'sym' && /:sym$/.test(k)));
  const cell = (k, txt) => covered(k) ? `<button type="button" class="chip" data-ptshow="${k}">Show</button>` : esc(txt);
  const fld = (lab, html) => `<div style="margin-top:6px"><div class="meta" style="margin:0">${lab}</div><div>${html}</div></div>`;
  return `<div class="card"><div class="row">${[['all', 'Cover every cell'], ['antimoa', 'Cover antidote + mechanism'], ['sym', 'Cover symptoms']].map(([k, l]) => `<button type="button" class="chip${(PT.cover || 'all') === k ? ' on' : ''}" data-ptcover="${k}">${l}</button>`).join('')}</div><div class="row" style="margin-top:6px"><button type="button" class="btn ghost" id="pthide">Hide again</button><button type="button" class="btn ghost" id="ptshowall">Show all</button></div><p class="sub" style="margin:6px 0 0">Say the covered cell aloud, then tap Show.</p></div>
    ${ptRows().map(r => `<div class="card"><b>${esc(r.poison)}</b>
      ${fld('Symptoms of acute poisoning / diagnostic methods', cell(r.id + ':sym', r.sym))}
      ${fld('Antidote(s)', cell(r.id + ':anti', ptAntiLabel(r)))}
      ${fld('MOA of antidote(s)', cell(r.id + ':moa', ptCellText(r.id + ':moa')))}
      ${r.special.map((s, i) => fld('Special considerations: ' + esc(s[0]), cell(r.id + ':sp' + i, s[1]))).join('')}
      <div class="sub" style="margin-top:6px">Her reference column: ${esc(r.ref)}</div>${ptDiag(r.id)}</div>`).join('')}`;
}
function vPtab() {
  let h = `<h2 id="ptab-top">Poisoning table</h2><p class="sub">Dr. Smith's Poisoning Treatment Table 2026 key, row by row, in her wording. On 10/20 she said: "you do need to know the details that I have in my table, my key." Pick a mode; a miss comes back at the end of the round and leads the next one.</p>
    <div class="card"><div class="row">${PT_MODES.map(([k, l]) => `<button type="button" class="chip ${PT.mode === k ? 'on' : ''}" aria-pressed="${PT.mode === k}" data-ptmode="${k}">${esc(l)}</button>`).join('')}</div></div>`;
  if (PT.mode === 'table') { h += antiCard() + ptTable(); }
  else {
    if (!PT.queue.length) ptStart();
    const it = PT.queue[PT.i], total = PT.queue.length, best = storeObj(COURSE.ns + ':pt')[PT.mode];
    if (!PT.opts) PT.opts = ptOptions(it);
    h += `<div class="card rxcard"><div class="meta">${PT.round > 1 ? `redo round ${PT.round} · ` : ''}${Math.min(PT.i + 1, total)} of ${total} · ${PT.right} right${PT.redo.length ? ` · ${PT.redo.length} to redo` : ''}${best ? ` · best ${best}` : ''}</div>
      <div class="rxdrug">${esc(it.ask)}</div><div class="rxq">${esc(it.sub)}</div>
      <div class="rxopts">${PT.opts.map((t, n) => `<button type="button" class="rxopt ${PT.result ? (t === it.ans ? 'ok' : PT.pick === n ? 'bad' : '') : ''}" data-ptans="${n}" ${PT.result ? 'disabled' : ''}>${esc(t)}</button>`).join('')}</div>
      <div class="row" style="margin-top:10px">${PT.result ? `<button type="button" class="btn" id="ptnext">${PT.i + 1 < total ? 'Next' : PT.redo.length ? `Redo the ${PT.redo.length} missed` : 'New round'}</button>` : ''}<button type="button" class="btn ghost" id="ptskip">${PT.result ? 'Start over' : 'Skip'}</button></div>`;
    if (PT.result) h += `<div class="pfb"><div class="pfbr ${PT.result.ok ? 'ok' : 'bad'}">${PT.result.ok ? '✓' : '✗'} ${ptRowHTML(it.row)}<div class="row" style="margin-top:6px"><button type="button" class="chip" data-jump="ref:ref3-tbl-1">The whole table</button>${antiOK() ? ANTIDOTE_DIAGRAMS.filter(d => d.rows.includes(it.row.id)).map(d => antiChip(d)).join('') : ''}</div></div></div>`;
    h += `</div>`;
  }
  h += `<p class="sub" style="margin-top:8px">Source: PoisoningTreatmentTable2026KEY.pdf, her posted key (pages 1–3); the question bank for the table is the Exam 3 topic “Poisoning treatment table (her key)”.</p>`;
  $('#view').innerHTML = h;
  document.querySelectorAll('[data-ptmode]').forEach(b => b.onclick = () => { if (PT.mode === b.dataset.ptmode) return; PT.mode = b.dataset.ptmode; PT.queue = []; PT.opts = null; vPtab(); });
  document.querySelectorAll('[data-ptans]').forEach(b => b.onclick = () => ptCheck(+b.dataset.ptans));
  document.querySelectorAll('[data-ptshow]').forEach(b => b.onclick = () => { PT.shown[b.dataset.ptshow] = true; b.outerHTML = esc(ptCellText(b.dataset.ptshow)); });
  const hd = $('#pthide'); if (hd) hd.onclick = () => { PT.shown = {}; vPtab(); };
  document.querySelectorAll('[data-ptcover]').forEach(b => b.onclick = () => { PT.cover = b.dataset.ptcover; PT.shown = {}; vPtab(); });
  const sa = $('#ptshowall'); if (sa) sa.onclick = () => { document.querySelectorAll('[data-ptshow]').forEach(b => PT.shown[b.dataset.ptshow] = true); vPtab(); };
  PT.t0 = Date.now();
  const nx = $('#ptnext'); if (nx) { nx.onclick = e => { if (e.detail > 1) return; ptAdvance(); }; nx.focus(); }
  const sk = $('#ptskip'); if (sk) sk.onclick = () => { if (Date.now() - PT.t0 < 350) return; if (PT.result) { if (confirm('Start over? This round and its missed list are cleared.')) { PT.queue = []; PT.opts = null; vPtab(); } } else { PT.redo.push(PT.queue[PT.i]); ptAdvance(); } };
}
function ptCellText(k) {
  const [id, f] = k.split(':'), r = ptRow(id);
  if (f === 'sym') return r.sym; if (f === 'anti') return ptAntiLabel(r);
  if (f === 'moa') return r.same ? 'Same as above for BB OD.' : r.anti.map(a => (r.anti.length > 1 ? a[0] + ': ' : '') + ptMoaText(r, a)).join(' · ');
  return r.special[+f.slice(2)][1];
}
function ptCheck(n) {
  if (PT.result || Date.now() - (PT.t0 || 0) < 350) return;
  const it = PT.queue[PT.i]; PT.pick = n; const ok = PT.opts[n] === it.ans;
  PT.result = {ok}; if (ok) PT.right++; else PT.redo.push(it);
  vPtab();
}
function ptAdvance() {
  PT.opts = null; PT.pick = null; PT.result = null;
  if (PT.i + 1 < PT.queue.length) { PT.i++; vPtab(); return; }
  const all = storeObj(COURSE.ns + ':pt'), score = `${PT.right}/${PT.queue.length}`;
  if (PT.round === 1 && (!all[PT.mode] || +all[PT.mode].split('/')[0] / +all[PT.mode].split('/')[1] < PT.right / PT.queue.length)) { all[PT.mode] = score; store.set(COURSE.ns + ':pt', JSON.stringify(all)); }
  store.set(COURSE.ns + ':pt:miss:' + PT.mode, PT.redo.map(x => x.id).join(','));
  if (PT.redo.length) ptStart(PT.redo.map(x => x.id)); else ptStart();
  vPtab();
}
document.addEventListener('keydown', e => { if (ANTI) return; if (CUR === 'ptab' && e.key === 'Enter' && !e.target.closest('button, input, select, textarea')) { const b = $('#ptnext'); if (b) b.click(); } });

/* ---------- Short answer (Exam 3) ----------
   Her exam has short-answer items graded with partial credit. Each prompt: write an answer, then compare it with the
   model answer and tick the key points it covers. Drafts and ticks are kept per browser. */
const SA_LIST = typeof SHORT3 === 'undefined' ? [] : SHORT3;
const SA_KEY = COURSE.ns + ':sa';
let SA = {i: 0, order: null, shown: false};
const saLec = id => { const l = COURSE.lectures.find(x => x.id === id); return l ? l.label : id; };
const saState = () => storeObj(SA_KEY);
function saSave(id, patch) { const all = saState(); all[id] = Object.assign({}, all[id] || {}, patch); store.set(SA_KEY, JSON.stringify(all)); }
function vSa() {
  if (!SA_LIST.length) { $('#view').innerHTML = '<h2 id="sa-top">Short answer</h2><p class="sub">No prompts loaded.</p>'; return; }
  if (!SA.order) SA.order = SA_LIST.map((x, k) => k);
  const p = SA_LIST[SA.order[SA.i]], st = saState()[p.id] || {}, ticks = st.ticks || [];
  const done = SA_LIST.filter(x => (saState()[x.id] || {}).checked).length;
  let h = `<h2 id="sa-top">Short answer</h2><p class="sub">Her exam has two short-answer questions graded with partial credit. Write your answer first, in the length the prompt asks for, then check it against the model answer and tick each key point you covered.</p>
    <div class="row" style="justify-content:space-between"><b>Prompt ${SA.i + 1} of ${SA_LIST.length}</b><span class="meta" style="margin:0">${done} checked</span></div>
    <div class="card"><div class="meta">${esc(saLec(p.lecture))}${p.form === 'her' ? ' · her wording' : p.form === 'key' ? ' · her key' : ''}</div>
    <div class="stem" tabindex="-1">${esc(p.q)}</div>
    <label class="sub" for="satext" style="display:block;margin:8px 0 4px">Your answer</label>
    <textarea id="satext" class="satext" rows="5">${esc(st.text || '')}</textarea>
    <div class="row"><button type="button" class="btn" id="sacheck">${SA.shown ? 'Hide the model answer' : 'Check my answer'}</button><button type="button" class="btn ghost" id="saclear">Clear</button></div>`;
  if (SA.shown) {
    h += `<div class="teach"><b>Model answer.</b> ${esc(p.model)}</div>
      <fieldset class="sapts"><legend>Key points (tick the ones your answer has)</legend>${p.points.map((t, k) => `<label class="row" style="gap:8px;align-items:flex-start"><input type="checkbox" data-sapt="${k}" ${ticks.includes(k) ? 'checked' : ''}><span>${esc(t)}</span></label>`).join('')}</fieldset>
      <div class="meta" id="sascore">${ticks.length} of ${p.points.length} key points</div>`;
    if (p.note) h += `<div class="sub">${esc(p.note)}</div>`;
    if (p.quote) h += `<div class="quote">“${esc(tidySpeech(p.quote))}”</div>`;
    if (p.cite) h += `<div class="cite">${esc(p.cite)}</div>`;
  }
  h += `</div><div class="row"><button type="button" class="btn ghost" id="saprev" ${SA.i ? '' : 'disabled'}>Previous</button><button type="button" class="btn ghost" id="sanext" ${SA.i < SA_LIST.length - 1 ? '' : 'disabled'}>Next</button><button type="button" class="btn ghost" id="sashuf">Shuffle</button></div>`;
  $('#view').innerHTML = h;
  const ta = $('#satext');
  ta.oninput = () => saSave(p.id, {text: ta.value});
  $('#sacheck').onclick = () => { SA.shown = !SA.shown; if (SA.shown) saSave(p.id, {checked: !!ta.value.trim(), text: ta.value}); vSa(); };
  $('#saclear').onclick = () => { saSave(p.id, {text: '', ticks: [], checked: false}); SA.shown = false; vSa(); };
  document.querySelectorAll('[data-sapt]').forEach(c => c.onchange = () => {
    const t = [...document.querySelectorAll('[data-sapt]')].filter(x => x.checked).map(x => +x.dataset.sapt);
    saSave(p.id, {ticks: t}); $('#sascore').textContent = `${t.length} of ${p.points.length} key points`;
  });
  const move = d => { SA.i += d; SA.shown = false; vSa(); window.scrollTo(0, 0); };
  $('#saprev').onclick = () => move(-1); $('#sanext').onclick = () => move(1);
  $('#sashuf').onclick = () => { SA.order = shuffle(SA.order.slice()); SA.i = 0; SA.shown = false; vSa(); };
}

/* Antidote diagrams: standalone pages under antidotes/ (IDs repeat across them, so each runs in its own frame).
   The page reports its height with postMessage; Esc or the close button returns focus to the opener. */
const ANTI_BASE = location.protocol === 'file:' ? 'https://lglouis3-create.github.io/Intro-Pharmacology-/antidotes/'
  : location.pathname.includes('/exam1-drill/') ? '../antidotes/' : 'antidotes/';
const antiOK = () => typeof ANTIDOTE_DIAGRAMS !== 'undefined';
const antiChip = (d, lab) => `<button type="button" class="chip antichip" data-anti="${d.slug}">◧ ${esc(lab || d.short)}</button>`;
const antiFor = q => antiOK() && examOf(q) === 3 ? ANTIDOTE_DIAGRAMS.filter(d => d.match && d.match.test(q.stem + ' ' + (q.concept || ''))) : [];
let ANTI = null;
function antiOpen(slug, opener) {
  sayStop();
  const i = ANTIDOTE_DIAGRAMS.findIndex(d => d.slug === slug); if (i < 0) return;
  const d = ANTIDOTE_DIAGRAMS[i], t = store.get(COURSE.ns + ':theme'), n = ANTIDOTE_DIAGRAMS.length;
  const src = ANTI_BASE + d.slug + '.html?embed=1' + (t === 'light' || t === 'dark' ? '&theme=' + t : '');
  if (!ANTI) {
    ANTI = {opener: opener || document.activeElement, el: document.createElement('div')};
    ANTI.el.className = 'antiview'; ANTI.el.setAttribute('role', 'dialog'); ANTI.el.setAttribute('aria-modal', 'true'); ANTI.el.setAttribute('aria-labelledby', 'antititle');
    document.body.appendChild(ANTI.el); document.body.classList.add('antiopen'); pushNav({v: CUR, anti: 1});
    // the page behind is inert while the panel is open: Tab stays in the panel, the theme cannot change underneath
    ANTI.inert = [...document.body.children].filter(c => c !== ANTI.el && !c.inert); ANTI.inert.forEach(c => { c.inert = true; });
  }
  ANTI.slug = d.slug;
  ANTI.el.innerHTML = `<div class="antibox"><div class="antihead"><b id="antititle">${esc(d.title)}</b><span class="meta" style="margin:0">${i + 1} of ${n}</span>
    <div class="row" style="gap:6px;margin-left:auto"><button type="button" class="chip" data-antistep="-1" ${i ? '' : 'disabled'} aria-label="Previous diagram">‹ Prev</button><button type="button" class="chip" data-antistep="1" ${i + 1 < n ? '' : 'disabled'} aria-label="Next diagram">Next ›</button><a class="chip" href="${ANTI_BASE + d.slug}.html" target="_blank" rel="noopener">Open page ↗</a><button type="button" class="chip" id="anticlose" aria-label="Close diagram">✕</button></div></div>
    ${d.note && ANTIDOTE_NOTES[d.note] ? `<div class="note">${esc(tidyQuoted(ANTIDOTE_NOTES[d.note]))}</div>` : ''}
    ${typeof ANTI_NARR !== 'undefined' && ANTI_NARR[d.slug] ? `<div class="row antisay" style="gap:6px;margin:6px 0"><button type="button" class="btn ghost" data-antisay="${esc(d.slug)}">🔊 Listen</button><button type="button" class="btn ghost" data-antitx aria-pressed="false">Show transcript</button><span class="meta" style="margin:0">${typeof AD_CLIPS !== 'undefined' && AD_CLIPS.includes(d.slug) ? 'read by the narrator' : 'device voice'}</span></div><div class="antitxw" hidden>${sideHTML()}<div class="nsaid saybox antitx">${sayHTML(ANTI_NARR[d.slug])}</div></div>` : ''}
    <iframe id="antiframe" title="${esc(d.title)}" src="${src}" loading="eager"></iframe>
    <p class="sub" style="margin:6px 0 0">Drawn from the figures on the Treating Poisonings slides (10/19). <a href="${ANTI_BASE}index.html" target="_blank" rel="noopener">All diagrams</a></p></div>`;
  $('#anticlose').focus();
}
function antiClose(fromPop) {
  sayStop();
  if (!ANTI) return;
  if (!fromPop && history.state && history.state.anti) { SKIPPOP++; try { history.back(); } catch (e) { SKIPPOP--; } }   // drop the panel's own history entry
  ANTI.el.remove(); document.body.classList.remove('antiopen'); (ANTI.inert || []).forEach(c => { c.inert = false; });
  const o = ANTI.opener; ANTI = null; if (o && o.focus && document.contains(o)) o.focus();
}
document.addEventListener('click', e => {
  const a = e.target.closest('[data-anti]'); if (a) { e.preventDefault(); antiOpen(a.dataset.anti, a); return; }
  if (!ANTI) return;
  const s = e.target.closest('[data-antistep]'); if (s) { const i = ANTIDOTE_DIAGRAMS.findIndex(d => d.slug === ANTI.slug) + +s.dataset.antistep; if (ANTIDOTE_DIAGRAMS[i]) antiOpen(ANTIDOTE_DIAGRAMS[i].slug); return; }
  if (e.target.closest('#anticlose') || e.target === ANTI.el) antiClose();
});
document.addEventListener('keydown', e => { if (ANTI && e.key === 'Escape') antiClose(); });
window.addEventListener('message', e => {
  const f = $('#antiframe'); if (!f || e.source !== f.contentWindow || !e.data) return;
  if (e.data.antidoteEsc) { antiClose(); return; }
  if (typeof e.data.antidoteH !== 'number') return;
  f.style.height = Math.min(Math.max(e.data.antidoteH, 200), 4000) + 'px';
});
const antiCard = () => antiOK() ? `<div class="card"><b>Antidote diagrams</b><p class="sub" style="margin:2px 0 8px">Drawings of the antidote mechanisms on the Treating Poisonings slides (10/19); five of the seven step through.</p><div class="row" style="gap:6px">${ANTIDOTE_DIAGRAMS.map(d => antiChip(d)).join('')}</div></div>` : '';

const drName = r => r.name.replace(/<[^>]+>/g, '').replace(/\s*\(.*$/, '');
function drRows() {
  const all = typeof DRUGS_ALL === 'undefined' ? [] : DRUGS_ALL, q = DR.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return all.filter(r => (!DR.exam || r.exam === DR.exam) && (!DR.cls || r.cls === DR.cls) && (!q.length || q.every(w => drText(r).includes(w))));
}
/* Which lane of "Gq, Gs, Gi: the three lanes" a drug's receptor belongs to (the figure's step index), from its receptor text */
const drLane = r => {
  const t = (r.rec + ' ' + r.fam.join(' ')).replace(/<[^>]+>/g, '');
  const gq = /\bM[13]\b|α1|AT1|muscarinic/i.test(t), gs = /β/.test(t), gi = /\bM2\b|α2|AT2/.test(t), nic = /\bN[nm]\b|(?<!not )nicotinic/i.test(t);
  if (gq && gs) { const m = /α1|β|M[13]|AT1/.exec(t); return m && m[0] === 'β' ? 3 : 1; }   // a mixed drug: the lane named first in its receptor text
  if (gq) return 1; if (gs) return 3; if (gi) return 4; if (nic) return 0; return null;
};
const drMapChips = r => { const lane = drLane(r); return `<div class="sub dmap"><button type="button" class="chip" data-jump="diagrams:dg-e2-body-map">On the body</button>${lane != null ? `<button type="button" class="chip" data-jump="diagrams:dg-e2-gprotein-anim@${lane}">${['Ion channel', 'Gq lane', 'Gq lane', 'Gs lane', 'Gi lane'][lane]}</button>` : ''}</div>`; };
function drRow(r) {
  const ex = `<span class="dex" title="Exam ${r.exam} list">E${r.exam}</span>`;
  const why = r.why ? `<button type="button" class="chip xwhy" data-jumpx="ref:${r.anchor}:${esc(r.id)}">Why?</button>` : `<button type="button" class="chip xwhy" data-jump="ref:${r.anchor}">List</button>`;
  const also = r.also.length ? `<div class="sub dalso">Also on the list: ${esc(r.also.join(', '))}</div>` : '';
  const cls = `<div class="sub dcl"><span class="dcls ${r.cls}">${esc(r.clsLabel)}</span>${r.sub.length ? ' · ' + esc(r.sub.join(', ')) : ''}</div>`;
  return `<tr><td>${ex} ${r.name} ${why}${cls}${also}</td><td>${r.moa}${r.why ? `<div class="sub">${r.why}</div>` : ''}</td><td>${r.rec}${r.exam === 2 ? drMapChips(r) : ''}</td><td>${r.soa}</td><td>${r.adr}</td></tr>`;
}
const drTable = rows => `<table class="reftab drugtab"><thead><tr><th>Drug and class</th><th>MOA, and why</th><th>Receptor</th><th>Site of action</th><th>Key ADRs / DDIs</th></tr></thead><tbody>${rows.map(drRow).join('')}</tbody></table>`;
function drGroups(rows) {
  if (DR.by === 'az') return [['A to Z', [...rows].sort((a, b) => drName(a).localeCompare(drName(b)))]];
  if (DR.by === 'cls') return DR_CLS.map(([k, l]) => [l + 's', rows.filter(r => r.cls === k)]);
  if (DR.by === 'fam') return DR_FAM.map(f => [f, rows.filter(r => r.fam.includes(f))]);
  if (DR.by === 'exam') return [[COURSE.exams[0].name + ' list', rows.filter(r => r.exam === 1)], [COURSE.exams[1].name + ' list', rows.filter(r => r.exam === 2)]];
  const secs = []; rows.forEach(r => { const g = secs.find(s => s[0] === r.sec); g ? g[1].push(r) : secs.push([r.sec, [r]]); }); return secs;
}
function drList() {
  const rows = drRows(), all = typeof DRUGS_ALL === 'undefined' ? 0 : DRUGS_ALL.length, groups = drGroups(rows).filter(g => g[1].length);
  let h = groups.map(([t, rs]) => `<h3 class="dgh">${esc(t)} <span class="meta">${rs.length}</span></h3>${drTable(rs)}`).join('');
  if (!rows.length) h = '<div class="card empty">No drug matches. Clear the search or the filters.</div>';
  if (DR.by === 'fam' && rows.length) h = '<p class="sub">A drug that binds more than one family is listed under each of them.</p>' + h;
  const q = DR.q.trim().toLowerCase();
  const both = (typeof DRUGS_BOTH === 'undefined' ? [] : DRUGS_BOTH).filter(b => !q || b.drug.toLowerCase().includes(q)).map(b => [b, DRUGS_ALL.find(r => r.id === b.e1), DRUGS_ALL.find(r => r.id === b.e2)]).filter(x => x[1] && x[2]);
  if (both.length && !DR.cls && !DR.exam) {
    h += `<h3 class="dgh" id="drugs-both">The same drug on both lists <span class="meta">${both.length}</span></h3>
      <p class="sub">Each list is reproduced as written, and each exam asks from its own list. Where the two differ, the row shows both wordings side by side.</p>
      <table class="reftab drugtab"><thead><tr><th>Drug</th><th>Exam 1 list says</th><th>Exam 2 table says</th></tr></thead><tbody>${both.map(([b, r1, r2]) => `<tr><td>${esc(b.drug)}</td><td>${r1.moa}</td><td>${r2.moa}<div class="sub">${r2.rec} <button type="button" class="chip xwhy" data-jumpx="ref:${r2.anchor}:${esc(r2.id)}">Why?</button></div></td></tr>`).join('')}</tbody></table>`;
  }
  if (typeof DRUGS_LIST_ONLY !== 'undefined' && DRUGS_LIST_ONLY.length && !DR.exam && !DR.cls && !q) h += `<p class="sub">On the official Exam 2 list but left out of his tables (his words on it are under the reference table of its section): ${esc(DRUGS_LIST_ONLY.join(', '))}.</p>`;
  const el = $('#dlist'); if (el) { el.innerHTML = h; stackTables(el); }
  const c = $('#dcount'); if (c) c.textContent = rows.length === all ? `${all} rows` : `${rows.length} of ${all} rows`;
}
/* The narrated walkthrough of the Exam 2 list: one step-through per class of his reference tables, one
   step per drug row (the same verified rows as the master table), read by the narrator when narration is on.
   The figure has no SVG: its steps are drug cards, moved by stepPlain; the controls, captions, dots and
   narration row are the ones every step-through figure has, so Play all, speed and clips work unchanged. */
const DL_WALK = [['ref2-nmj', 'dl-nmj'], ['ref2-chol', 'dl-chol'], ['ref2-ind', 'dl-ind'], ['ref2-alpha', 'dl-alpha'], ['ref2-beta', 'dl-beta'], ['ref2-no', 'dl-no'], ['ref2-raas', 'dl-raas']];
function dlWalkHTML() {
  if (typeof DRUGS_ALL === 'undefined') return '';
  return DL_WALK.map(([anchor, key]) => {
    const rows = DRUGS_ALL.filter(r => r.exam === 2 && r.anchor === anchor); if (!rows.length) return '';
    const n = rows.length, sec = rows[0].sec;
    const cards = rows.map((r, i) => `<div class="st${i ? '' : ' on'}" data-step="${i + 1}"><div class="dcard"><div class="dname">${r.name}</div><div class="sub dcl"><span class="dcls ${r.cls}">${esc(r.clsLabel)}</span>${r.sub.length ? ' · ' + esc(r.sub.join(', ')) : ''}</div>
      <dl><dt>MOA</dt><dd>${r.moa}</dd><dt>Receptor</dt><dd>${r.rec}</dd><dt>Site of action</dt><dd>${r.soa}</dd><dt>Key ADRs / DDIs</dt><dd>${r.adr}</dd></dl>${r.also.length ? `<div class="sub dalso">Also on the list: ${esc(r.also.join(', '))}</div>` : ''}</div></div>`).join('');
    const caps = `<div class="stcap" aria-live="polite" style="display:grid;margin:6px 2px 2px;font-size:14px;line-height:1.4;color:var(--ink)">${rows.map((r, i) =>
      `<p data-i="${i}" aria-hidden="${i ? 'true' : 'false'}" style="grid-area:1/1;margin:0${i ? ';visibility:hidden' : ''}"><b>Drug ${i + 1} of ${n}</b> · <i>${drName(r)}</i><br>${r.why}</p>`).join('')}</div>`;
    const dots = rows.map((r, i) => `<button class="sdot${i ? '' : ' on'}" data-go="dot" data-i="${i}" aria-label="Go to drug ${i + 1}"></button>`).join('');
    const controls = `<div class="row anim" data-anim="${key}" style="margin:6px 0 2px"><button class="btn ghost" data-go="-1">◀ Back</button><button class="btn ghost" data-go="1">Next ▶</button><button class="btn ghost" data-go="replay">↻ Replay step</button><button class="btn ghost" data-go="play">▶ Play all</button><span class="sdots">${dots}</span><span class="meta" style="margin:0">${n} drugs.</span></div>`;
    return `<figure class="fig dwalk" id="dw-${key}"><div class="dwtitle">${esc(sec)}</div><div class="dwsteps">${cards}</div>${caps}${controls}<div class="row narrow" data-narr="${key}"></div><figcaption>Each card is the row of his reference table; Why? on the master table opens the full card. With narration on, the narrator reads each drug.</figcaption></figure>`;
  }).join('');
}
function vDrugs() {
  const chips = (list, cur, attr) => list.map(([k, l]) => `<button type="button" class="chip ${cur === k ? 'on' : ''}" aria-pressed="${cur === k}" data-${attr}="${k}">${l}</button>`).join('');
  $('#view').innerHTML = `<h2 id="drugs-top">All drugs</h2>
    <p class="sub">Every drug on the Exam 1 list and the Exam 2 list in one table, taken from the reference tables. Class follows the official Exam 2 list’s colour code (agonist, antagonist, indirect, donor) and the Exam 1 list’s own words. Regroup by receptor family to see which drugs meet at one receptor; Why? opens the drug’s card on the Reference page.</p>
    <div class="card tbar" id="dbar"><div class="row" style="flex-wrap:nowrap"><input id="dsearch" type="search" placeholder="Search the drugs (name, receptor, site, ADR, suffix)…" value="${esc(DR.q)}" autocomplete="off" aria-label="Search the drugs">
      <button class="btn ghost" id="dclear" type="button" ${DR.q ? '' : 'hidden'}>Clear</button></div>
      <div class="row" style="margin-top:6px"><span class="meta" style="margin:0">Group by:</span>${chips([['list', 'His tables'], ['fam', 'Receptor family'], ['cls', 'Class'], ['exam', 'Exam'], ['az', 'A to Z']], DR.by, 'by')}</div>
      <div class="row" style="margin-top:6px"><span class="meta" style="margin:0">Show:</span>${chips([[0, 'Both lists'], [1, 'Exam 1 list'], [2, 'Exam 2 list']], DR.exam, 'ex')}<label class="meta" style="margin:0 0 0 6px">Class: <select id="dclsel" aria-label="Keep one class">${[['', 'All']].concat(DR_CLS).map(([k, l]) => `<option value="${k}" ${DR.cls === k ? 'selected' : ''}>${l}</option>`).join('')}</select></label><span class="meta" id="dcount" aria-live="polite" style="margin:0 0 0 auto"></span></div></div>
    <details class="fold dlwalk" id="dl-walk"><summary>Narrated walkthrough of the Exam 2 list: 7 parts, one card per drug</summary><p class="sub">Back, Next and the dots move through the drugs of one class; Play all runs the class through. Set Narration under any part to “Narrate when tapped” and the narrator reads each card.</p><div class="row" style="margin:0 0 8px"><button type="button" class="btn" id="dl-listen">${DL_CHAIN ? '■ Stop listening' : '▶ Listen to the whole list'}</button><span class="meta" style="margin:0">All 7 parts in order, read by the narrator; about 16 minutes at 1×.</span></div><div class="dwgrid">${dlWalkHTML()}</div></details>
    <div class="tablewrap" id="dlist"></div>`;
  const box = $('#dsearch');
  box.oninput = () => { DR.q = box.value; $('#dclear').hidden = !DR.q; drList(); };
  $('#dclear').onclick = () => { DR.q = ''; box.value = ''; $('#dclear').hidden = true; drList(); box.focus(); };
  $('#dclsel').onchange = e => { DR.cls = e.target.value; drList(); };
  const dlb = $('#dl-listen'); if (dlb) dlb.onclick = () => dlListen(!DL_CHAIN);
  $('#dbar').onclick = e => {
    const b = e.target.closest('[data-by],[data-ex]'); if (!b) return;
    if (b.dataset.by) DR.by = b.dataset.by; else DR.exam = +b.dataset.ex;
    const y = window.scrollY; vDrugs(); window.scrollTo(0, y);
  };
  drList();
}
function vRef() { $('#view').innerHTML = `<div class="tablewrap">${examPage(REFERENCE_HTML, 'ref')}</div>`; fillImgs($('#view')); stackTables($('#view')); }
function vTell() {
  const ex = active();
  $('#view').innerHTML = `<div class="tablewrap">${examPage(TELL_HTML, 'tell')}</div>
    <div class="row" style="margin-top:12px"><button class="btn" id="tellq">Drill every ${esc(ex.name)} tell-apart question</button></div>`;
  fillImgs($('#view'));
  // the drill follows the exam being studied, as the other drills do
  const ids = [...new Set([...document.querySelectorAll('[data-q]')].map(td => td.dataset.q))].filter(id => byId[id] && examOf(byId[id]) === ex.id);
  document.querySelectorAll('[data-q]').forEach(td => {
    if (!byId[td.dataset.q]) return;
    td.innerHTML = `<a href="#" style="color:var(--accent)">Try it</a>`;
    td.onclick = e => { e.preventDefault(); startQuiz([byId[td.dataset.q]], 'Tell apart', 'pass', {back: true}); };
  });
  $('#tellq').onclick = () => startQuiz(shuffle(ids.map(id => byId[id])), 'Tell apart', 'pass');
  if (!ids.length) $('#tellq').disabled = true;
  stackTables($('#view'));
}
/* Static pages carry figure markers: <!--FIG:key-->, <!--IMG:key--> (one of his
   poll figures) and <!--GRAPH:{json}--> (a drawn dose–response plot). */
/* Step-through figures: buttons under a figure move between its data-step groups.
   Moving between two steps animates the change with the Web Animations API, in
   three overlapping stages with one easing (ease-in-out cubic):
   1. exit: shapes that are gone fade (and shrink slightly) out from where they were;
   2. move: a shape or label present in both steps glides from its old position to
      its new one (FLIP: measure, invert, play; matched by data-k, else by tag +
      class + text/fill in order). If it also looks different (new fill, new text,
      new size), the old copy cross-fades into the new one as they travel; text
      fades out before the new text fades in, so two labels never overlap;
   3. enter: new shapes fade and scale in, new lines and labels fade in.
   data-o="n" on a shape delays its move or entry by n × MO.stagger, so a chain
   (ligand → receptor → G protein → effector) builds one link after another.
   Only transform and opacity are animated; nothing is left inline when a move
   ends. prefers-reduced-motion: the step changes at once with no motion. */
let ANIM = null;   // the one figure playing: {t: timer, b: its Play button}
const RM = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const leafSel = 'text,circle,rect,ellipse,line,polyline,polygon,path';
const sigOf = el => el.getAttribute('data-k') || [el.tagName, (el.getAttribute('class') || '').replace(/\b(fadein|glide|xfade)\b/g, '').trim(),   // leave out the animation classes stepTo adds
  el.tagName === 'text' ? el.textContent : (el.getAttribute('fill') || '')].join('|');
const centre = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2, r.width + r.height]; };
// timing (ms): exit 0–280, move 120–740, enter from 380; stagger per data-o step
const MO = {ease: 'cubic-bezier(.65,0,.35,1)', out: 280, moveAt: 120, move: 620, inAt: 380, inDur: 480, stagger: 150, captOut: 180, captIn: 420};
// what a shape looks like apart from where it is (a change means cross-fade, not just glide)
const LOOK_SKIP = /^(x|y|cx|cy|x1|y1|x2|y2|d|points|transform|data-k|data-o|class|style)$/;
const lookOf = el => {
  let s = el.tagName + '|' + (el.getAttribute('class') || '').replace(/\b(fadein|glide|xfade)\b/g, '').trim() + '|' + (el.tagName === 'text' ? el.textContent : '');
  for (const a of el.attributes) if (!LOOK_SKIP.test(a.name)) s += '|' + a.name + '=' + a.value;
  try { const b = el.getBBox(); s += '|' + Math.round(b.width) + 'x' + Math.round(b.height); } catch (e) { /* not rendered */ }
  return s;
};
// the same without its size: a box or a dot that only grew or shrank is scaled, not cross-faded
const formOf = el => { let s = el.tagName; for (const a of el.attributes) if (!LOOK_SKIP.test(a.name) && !/^(width|height|r|rx|ry)$/.test(a.name)) s += '|' + a.name + '=' + a.value; return s; };
// an SVG transform attribute as a CSS transform (CSS replaces the attribute while it runs)
const cssTf = t => {
  if (!t) return '';
  if (/matrix|skew/.test(t)) return null;
  return t.replace(/(translate|scale|rotate)\(([^)]*)\)/g, (m, f, a) => {
    const v = a.trim().split(/[\s,]+/).map(Number);
    if (f === 'translate') return `translate(${v[0]}px,${v[1] || 0}px)`;
    if (f === 'scale') return `scale(${v[0]},${v[1] == null ? v[0] : v[1]})`;
    return v.length === 3 ? `translate(${v[1]}px,${v[2]}px) rotate(${v[0]}deg) translate(${-v[1]}px,${-v[2]}px)` : `rotate(${v[0]}deg)`;
  });
};
const isShape = el => /^(circle|rect|ellipse|polygon)$/.test(el.tagName) || (el.tagName === 'path' && !el.classList.contains('arrow') && !el.getAttribute('marker-end'));
const orderOf = el => { const o = el.closest('[data-o]'); return o ? Math.min(+o.getAttribute('data-o') || 0, 4) : 0; };
// run one animation; fill-box / centre origin only while a scale runs
const anim = (el, frames, o, scale) => {
  if (scale) { el.style.transformBox = 'fill-box'; el.style.transformOrigin = 'center'; }
  const a = el.animate(frames, Object.assign({easing: MO.ease, fill: 'backwards'}, o));
  if (scale) a.onfinish = a.oncancel = () => { el.style.transformBox = ''; el.style.transformOrigin = ''; };
  return a;
};
/* A step-through whose steps are HTML cards, not SVG (the drug-list walkthrough): the card, its caption
   and its dot switch; the new card fades in. */
function stepPlain(fig, from, to) {
  const steps = [...fig.querySelectorAll('.st')], caps = [...fig.querySelectorAll('.stcap > p')];
  steps.forEach((s, j) => s.classList.toggle('on', j === to));
  caps.forEach((p, j) => { p.style.visibility = j === to ? '' : 'hidden'; p.setAttribute('aria-hidden', j === to ? 'false' : 'true'); });
  fig.querySelectorAll('.sdot').forEach((d, j) => { d.classList.toggle('on', j === to); d.setAttribute('aria-current', j === to ? 'step' : 'false'); });
  const now = steps[to];
  if (now && !RM() && now.animate && from !== to) now.animate([{opacity: 0, transform: 'translateY(6px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 320, easing: 'ease-out'});
}
function stepTo(fig, from, to) {
  const steps = [...fig.querySelectorAll('.st')], svg = fig.querySelector('svg');
  if (!svg) return stepPlain(fig, from, to);
  const motion = !RM() && typeof svg.animate === 'function';
  const old = from != null && from !== to ? steps[from] : null;
  // First: where every shape of the old step is now (mid-move if a move is still running)
  const before = new Map();   // signature → queue of {el, c, look}
  if (old && motion) old.querySelectorAll(leafSel).forEach(el => { if (el.classList.contains('capt')) return; const k = sigOf(el), c = centre(el), r = el.getBoundingClientRect(); if (c[2]) (before.get(k) || before.set(k, []).get(k)).push({el, c, w: r.width, h: r.height, look: lookOf(el), form: formOf(el)}); });
  if (svg.getAnimations) svg.getAnimations({subtree: true}).forEach(a => a.cancel());
  fig.querySelectorAll('.st-out').forEach(n => n.remove());
  steps.forEach((s, j) => s.classList.toggle('on', j === to));
  // the step's text is HTML under the picture (.stcap, one <p> per step stacked in one grid cell,
  // so the box keeps the height of the longest and nothing below it jumps)
  const caps = [...fig.querySelectorAll('.stcap > p')], prevCap = caps.findIndex(p => p.style.visibility !== 'hidden');
  const showCap = (p, on) => { p.style.visibility = on ? '' : 'hidden'; p.setAttribute('aria-hidden', on ? 'false' : 'true'); };
  caps.forEach(p => { if (p.getAnimations) p.getAnimations().forEach(a => a.cancel()); });
  caps.forEach((p, j) => showCap(p, j === to));
  fig.querySelectorAll('.sdot').forEach((d, j) => { d.classList.toggle('on', j === to); d.setAttribute('aria-current', j === to ? 'step' : 'false'); });
  const now = steps[to], leaves = [...now.querySelectorAll(leafSel)];
  leaves.forEach(el => el.classList.remove('fadein', 'glide', 'xfade'));
  if (!motion) return;
  if (caps[to]) {   // the old text fades out, then the new text fades in (never both at once)
    const p0 = prevCap >= 0 && prevCap !== to && old ? caps[prevCap] : null;
    if (p0) { showCap(p0, true); const a = p0.animate([{opacity: 1}, {opacity: 0}], {duration: MO.captOut, easing: MO.ease, fill: 'forwards'}); a.onfinish = () => { if (!caps[to] || caps.indexOf(p0) !== [...fig.querySelectorAll('.st')].findIndex(s => s.classList.contains('on'))) showCap(p0, false); a.cancel(); }; }
    caps[to].animate([{opacity: 0}, {opacity: 1}], {duration: MO.captIn, delay: p0 ? MO.captOut : 0, easing: MO.ease, fill: 'backwards'});
  }
  // Last, Invert, Play
  const scale = svg.viewBox.baseVal.width / (svg.getBoundingClientRect().width || 1), used = new Map();
  leaves.forEach(el => {
    const op = +getComputedStyle(el).opacity, ord = orderOf(el);
    if (el.classList.contains('capt')) {
      el.classList.add('fadein');
      anim(el, [{opacity: 0}, {opacity: op}], {duration: MO.captIn, delay: old ? MO.captOut : 0});
      return;
    }
    // its old self: same signature; of several, one that looks the same, else the nearest
    const q = before.get(sigOf(el)); let m = null;
    if (q && q.length) {
      const lk = lookOf(el), c0 = centre(el); let k = q.findIndex(o => o.look === lk);
      if (k < 0) { let best = Infinity; q.forEach((o, j) => { const d = Math.hypot(o.c[0] - c0[0], o.c[1] - c0[1]); if (d < best) { best = d; k = j; } }); }
      m = q.splice(k, 1)[0];
    }
    if (!m) {   // new: fades (and scales) in after the exits and moves have started
      el.classList.add('fadein');
      const sc = isShape(el) && !el.hasAttribute('transform');
      const delay = (old ? MO.inAt : 0) + ord * MO.stagger;
      anim(el, sc ? [{opacity: 0, transform: 'scale(.6)'}, {opacity: op, transform: 'scale(1)'}] : [{opacity: 0}, {opacity: op}], {duration: MO.inDur, delay}, sc);
      return;
    }
    const c = centre(el), dx = (m.c[0] - c[0]) * scale, dy = (m.c[1] - c[1]) * scale;
    const r = el.getBoundingClientRect(), base = cssTf(el.getAttribute('transform'));
    let moved = Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5, changed = m.look !== lookOf(el);
    const delay = MO.moveAt + ord * MO.stagger;
    // only its size changed (a bar, a box, a dot): grow or shrink it while it moves
    const resized = changed && !base && /^(rect|circle|ellipse)$/.test(el.tagName) && m.form === formOf(el) && r.width > 0 && r.height > 0;
    if (resized) {
      changed = false; el.classList.add('glide');
      anim(el, [{transform: `translate(${dx}px,${dy}px) scale(${m.w / r.width},${m.h / r.height})`}, {transform: 'translate(0px,0px) scale(1,1)'}], {duration: MO.move, delay}, true);
    } else if (moved && base != null) {
      el.classList.add('glide');
      anim(el, [{transform: `translate(${dx}px,${dy}px) ${base}`}, {transform: base || 'translate(0px,0px)'}], {duration: MO.move, delay});
    }
    used.set(m.el, {dx, dy, moved: moved && base != null, changed, delay, text: el.tagName === 'text'});
    if (changed) {   // the new look fades in over the old one (text: after the old text has gone)
      el.classList.add('xfade');
      const t = el.tagName === 'text', d2 = t ? delay + MO.move * 0.45 : delay, dur = t ? MO.move * 0.55 : MO.move * 0.6;
      anim(el, [{opacity: 0}, {opacity: op}], {duration: dur, delay: d2});
    }
  });
  if (!old) return;
  // the old step as a ghost: gone shapes fade out where they were; changed shapes travel and fade
  const ghost = old.cloneNode(true); ghost.classList.remove('on', 'st'); ghost.classList.add('st-out'); ghost.removeAttribute('data-step'); ghost.setAttribute('aria-hidden', 'true');
  const oldLeaves = [...old.querySelectorAll(leafSel)], ghostLeaves = [...ghost.querySelectorAll(leafSel)];
  svg.appendChild(ghost);
  let gEnd = MO.out;
  oldLeaves.forEach((el, k) => {
    const g = ghostLeaves[k], u = used.get(el), op = +getComputedStyle(el).opacity;
    if (el.classList.contains('capt')) { anim(g, [{opacity: op}, {opacity: 0}], {duration: MO.captOut, fill: 'forwards'}); return; }
    if (!u) { const sc = isShape(g) && !g.hasAttribute('transform'); anim(g, sc ? [{opacity: op, transform: 'scale(1)'}, {opacity: 0, transform: 'scale(.85)'}] : [{opacity: op}, {opacity: 0}], {duration: MO.out, fill: 'forwards'}, sc); return; }
    if (!u.changed) { g.remove(); return; }
    g.classList.add('xfade');   // the old look of a shape that stays (not a shape that left)
    const dur = u.text ? MO.move * 0.4 : MO.move * 0.6, base = cssTf(g.getAttribute('transform')) || '';
    anim(g, [{opacity: op}, {opacity: 0}], {duration: dur, delay: u.delay, fill: 'both'});
    if (u.moved) anim(g, [{transform: `translate(0px,0px) ${base}`}, {transform: `translate(${-u.dx}px,${-u.dy}px) ${base}`}], {duration: MO.move, delay: u.delay, fill: 'both'});
    gEnd = Math.max(gEnd, u.delay + dur);
  });
  setTimeout(() => ghost.remove(), gEnd + 40);
}
// Play all: from the step shown (from step 1 again if at the last), stops at the last; Pause keeps the step.
// Each step stays long enough to read its words: 1.4 s for the motion plus 150 ms a word, at least 3.2 s, at most 8 s.
const PLAY_MS = 3200;
// end a Play all run (and any reading): the button resets and no timer is left
function playStop() { narrStop(); if (ANIM) { clearTimeout(ANIM.t); ANIM.b.textContent = '▶ Play all'; ANIM.b.setAttribute('aria-pressed', 'false'); ANIM = null; } }
/* Listen mode on the All drugs page: the walkthrough's parts play one after another (narration is
   switched on if it was off), each part's Play all starting when the one before ends on its own. */
let DL_CHAIN = false;
function dlListen(on) {
  DL_CHAIN = on; const b = document.getElementById('dl-listen'); if (b) b.textContent = on ? '■ Stop listening' : '▶ Listen to the whole list';
  if (!on) { playStop(); return; }
  if (NAR.mode !== 'tap') setNarr('tap');
  const first = document.querySelector('#dl-walk figure.dwalk [data-go="play"]'); if (first) first.click(); else DL_CHAIN = false;
}
function playEnd(fig) {
  playStop();
  if (!DL_CHAIN || !fig.classList.contains('dwalk')) return;
  const figs = [...document.querySelectorAll('#dl-walk figure.dwalk')], next = figs[figs.indexOf(fig) + 1];
  if (next) setTimeout(() => { if (DL_CHAIN) { const steps = next.querySelectorAll('.st'); stepTo(next, [...steps].findIndex(s => s.classList.contains('on')), 0); next.querySelector('[data-go="play"]').click(); } }, NAR_GAP);
  else dlListen(false);
}
const playMs = (fig, i) => { const p = fig.querySelectorAll('.stcap > p')[i]; const w = p ? p.textContent.trim().split(/\s+/).length : 0; return Math.min(8000, Math.max(PLAY_MS, 1400 + 150 * w)); };
document.addEventListener('click', e => {
  const b = e.target.closest('[data-anim] button'); if (!b) return;
  const fig = b.closest('figure'); const steps = [...fig.querySelectorAll('.st')]; if (!steps.length) return;
  const cur = steps.findIndex(s => s.classList.contains('on')), n = steps.length;
  const playBtn = fig.querySelector('[data-go="play"]'), stop = playStop;
  const go = b.dataset.go;
  if (go === 'play') {
    const same = ANIM && ANIM.b === b; stop(); if (same) return;
    b.textContent = '❚❚ Pause'; b.setAttribute('aria-pressed', 'true');
    { const r = fig.getBoundingClientRect(); if (r.top < hdrOff() || r.top > innerHeight - 200) scrollToEl(fig); }
    // Play resumes from the step shown; from the last step it glides back to step 1 first
    const restart = cur >= n - 1; if (restart) stepTo(fig, cur, 0);
    // With narration on, a step lasts as long as its reading and the next starts a moment after;
    // otherwise (off, muted, no voice) it lasts its words' worth of time.
    const hold = (i, ms) => { if (!ANIM) return; if (!narrSpeak(fig, i, () => { if (ANIM) ANIM.t = setTimeout(tick, NAR_GAP); })) ANIM.t = setTimeout(tick, ms); };
    const tick = () => {
      if (!document.body.contains(fig)) return stop();
      const i = steps.findIndex(s => s.classList.contains('on'));
      if (i >= n - 1) return playEnd(fig);
      stepTo(fig, i, i + 1);
      if (i + 1 === n - 1) { if (!narrSpeak(fig, n - 1, () => playEnd(fig))) playEnd(fig); return; }
      hold(i + 1, playMs(fig, i + 1));
    };
    ANIM = {b, t: null, tick, fig};
    hold(restart ? 0 : cur, restart ? playMs(fig, 0) : playMs(fig, cur) / 2);
    return;
  }
  // a tap on this figure ends its run; with narration on, a tap on another figure ends the run too (one voice at a time)
  if (ANIM && (ANIM.b === playBtn || narrOn())) stop();
  let to = cur;
  if (go === 'replay') stepTo(fig, cur > 0 ? cur - 1 : null, cur);
  else if (go === 'dot') { to = +b.dataset.i; stepTo(fig, cur, to); }
  else { to = (cur + (+go) + n) % n; stepTo(fig, cur, to); }
  narrSpeak(fig, to);
});
/* ---------- Guided narration ----------
   Every step-through figure can be read aloud: the device's voice (Web Speech) reads the step's text,
   or a recorded clip plays when narration.js names one for that step, and Play all moves on when the
   reading ends. One setting serves the whole drill (Off · Narrate when tapped · Captions only), kept
   on this device. Nothing plays on its own: a reading starts only from a tap on a figure's controls,
   which is also what phones require before they play sound. Long readings are spoken a sentence at a
   time, since some browsers cut a single long utterance short. */
const NAR = {mode: store.get(COURSE.ns + ':narr') || 'off', rate: +store.get(COURSE.ns + ':narr-rate') || 1, voice: store.get(COURSE.ns + ':narr-voice') || '', muted: false, cur: null};
const NAR_MODES = [['off', 'Off'], ['tap', 'Narrate when tapped'], ['cap', 'Captions only']];
const NAR_RATES = [0.75, 1, 1.25, 1.5], NAR_GAP = 500;
const narrCan = () => typeof speechSynthesis !== 'undefined' && typeof SpeechSynthesisUtterance === 'function';
const narrOn = () => NAR.mode === 'tap' && !NAR.muted;
// what the voice says for the written forms: arrows, Greek letters and the course's abbreviations
const SPEAK = [[/→/g, ' leads to '], [/↑/g, ' more '], [/↓/g, ' less '], [/α/g, 'alpha '], [/β/g, 'beta '], [/MAO-([AB])\b/g, 'M A O $1'],
  [/\bG([sqi])\b/g, 'G $1'], [/\bcAMP\b/g, 'cyclic A M P'], [/\bcGMP\b/g, 'cyclic G M P'], [/\bAChE\b/g, 'acetylcholinesterase'], [/\bACh\b/g, 'acetylcholine'],
  [/\bNE\b/g, 'norepinephrine'], [/\bEpi\b/g, 'epinephrine'], [/\bNMJ\b/g, 'neuromuscular junction'], [/\bSNS\b/g, 'sympathetic'], [/\bPNS\b/g, 'parasympathetic'],
  [/\bHR\b/g, 'heart rate'], [/\bBP\b/g, 'blood pressure'], [/\bNO\b/g, 'nitric oxide'], [/\bSCh\b/g, 'succinylcholine'], [/\b([MNH])([123nm])\b/g, '$1 $2'],
  [/\bCa\+\+|\bCa2\+/g, 'calcium'], [/\bK\+/g, 'potassium'], [/\bNa\+/g, 'sodium'], [/\bEmax\b/g, 'E max'], [/\b(E[CD])50\b/g, '$1 50'], [/\bKd\b/g, 'K D'],
  [/DUMBBELSS/g, 'dumbbells'], [/\b(GTP|GDP|GPCR|RTK|MAO|RAAS|ACE|AT1|AT2|PDE|PLC|DAG|IP3|PKA|ATP|GRK|ARB|CNS|GI|NET|SERT|VMAT|COMT|sGC|AV|SA|JG)\b/g, m => m.split('').join(' ')]];
const speakable = t => SPEAK.reduce((x, [re, r]) => x.replace(re, r), t).replace(/\s+/g, ' ').trim();
const narrKey = fig => { const a = fig.querySelector('[data-anim]'); return a ? a.dataset.anim : ''; };
const narrEntry = (fig, i) => { const n = typeof NARRATION === 'undefined' ? null : NARRATION[narrKey(fig)]; return n && n.steps && n.steps[i] || {}; };
// the clips live in exam1-drill/audio/, next to the drill: from the drill's own page that is audio/; from the
// index at the repository root, or from the artifact page, it is exam1-drill/audio/
const NAR_BASE = () => /\/exam1-drill\//.test(location.pathname) ? 'audio/' : 'exam1-drill/audio/';
function narrClip(fig, i) {
  const e = narrEntry(fig, i); if (e.src) return NAR_BASE() + e.src;
  const n = typeof NARRATION === 'undefined' ? null : NARRATION[narrKey(fig)];
  return n && n.clip && n.steps && n.steps[i] ? NAR_BASE() + n.clip + '-' + (i + 1) + '.mp3' : '';
}
const narrHasClips = fig => { const n = typeof NARRATION === 'undefined' ? null : NARRATION[narrKey(fig)]; return !!(n && (n.clip || (n.steps || []).some(s => s.src))); };
// the step's words: its script when one is written, else its caption without the "Step i of n" lead and the slide title
function narrText(fig, i) {
  const e = narrEntry(fig, i); if (e.text) return e.text;
  const p = fig.querySelectorAll('.stcap > p')[i]; if (!p) return '';
  const c = p.cloneNode(true); c.querySelectorAll('b, i').forEach(x => x.remove());
  return c.textContent.replace(/^[\s·]+/, '').trim();
}
let VOICES = [], NARR_AUDIO = null;
const loadVoices = () => { if (narrCan()) VOICES = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang)); };
if (narrCan()) { loadVoices(); speechSynthesis.addEventListener('voiceschanged', () => { loadVoices(); document.querySelectorAll('.nvoice').forEach(fillVoices); }); }
// the chosen voice, else a male English voice the device offers, else its default English voice
function narrVoice() {
  if (NAR.voice) { const v = VOICES.find(v => v.name === NAR.voice); if (v) return v; }
  return VOICES.find(v => /\b(Daniel|Aaron|Alex|David|Guy|Arthur|Fred|Rishi|Male)\b/i.test(v.name)) || VOICES.find(v => v.default) || VOICES[0] || null;
}
function narrStop() {
  if (typeof GW !== 'undefined' && GW && !GW_SELF) gwStop();
  if (typeof QSAY !== 'undefined' && QSAY) qSayStop();
  const cur = NAR.cur; NAR.cur = null;
  if (cur) { clearTimeout(cur.t); cur.fig.classList.remove('speaking'); }
  if (NARR_AUDIO) { NARR_AUDIO.onended = NARR_AUDIO.onerror = null; NARR_AUDIO.pause(); }
  if (narrCan()) speechSynthesis.cancel();
}
/* Read step i of the figure. Returns true when a reading started (done(true) follows once it ends),
   false when there is nothing to read (narration off, muted, no voice, no text); done is not called then. */
let NARR_NEXT = null;
/* The words being read, under the caption: a recorded script says more than the caption, so the line
   read for this step is printed while it plays (and in Captions only). The transcript's line is marked too. */
function narrShow(fig, i) {
  fig.querySelectorAll('.ntr li').forEach(li => li.classList.toggle('on', +li.dataset.ni === i));
  let d = fig.querySelector('.nsaid');
  const e = narrEntry(fig, i), show = NAR.mode !== 'off' && !!e.text;
  if (!show) { if (d) d.remove(); return; }
  if (!d) { d = document.createElement('div'); d.className = 'nsaid'; const a = fig.querySelector('[data-anim]'); if (a) a.insertAdjacentElement('beforebegin', d); else fig.appendChild(d); }
  d.textContent = e.text;
}
function narrSpeak(fig, i, done) {
  narrStop(); narrShow(fig, i); if (!narrOn()) return false;
  const text = narrText(fig, i), src = narrClip(fig, i); if (!text) return false;
  if (!src && !narrCan()) return false;
  const cur = NAR.cur = {fig, i, t: null}; fig.classList.add('speaking');
  const finish = () => { if (NAR.cur !== cur) return; clearTimeout(cur.t); NAR.cur = null; fig.classList.remove('speaking'); if (done) done(true); };
  // a voice that never reports its end must not stall Play all: give it the words' worth of time, then move on
  const guard = ms => { clearTimeout(cur.t); cur.t = setTimeout(finish, ms); };
  const synth = () => {
    if (!narrCan()) return finish();
    const v = narrVoice(); let last = null;
    (speakable(text).match(/[^.;:!?]+[.;:!?]*/g) || [text]).forEach(part => {
      if (!part.trim()) return; const u = new SpeechSynthesisUtterance(part.trim()); u.rate = NAR.rate; u.lang = 'en-US'; if (v) u.voice = v; last = u; speechSynthesis.speak(u);
    });
    if (!last) return finish();
    last.onend = last.onerror = finish;
    guard((2000 + text.split(/\s+/).length * 450) / NAR.rate);
  };
  if (src) {
    // the recorded clip; if it cannot be loaded (offline, a missing file), the device's voice reads the script instead
    const a = NARR_AUDIO || (NARR_AUDIO = new Audio()); a.preload = 'auto'; a.src = src; a.playbackRate = NAR.rate;
    const fallback = () => { if (NAR.cur !== cur || cur.fell) return; cur.fell = true; synth(); };
    a.onended = finish; a.onerror = fallback;
    a.onloadedmetadata = () => { if (NAR.cur === cur && isFinite(a.duration)) guard(a.duration * 1000 / NAR.rate + 4000); };
    guard((4000 + text.split(/\s+/).length * 450) / NAR.rate);
    a.play().catch(fallback);
    // the next step's clip is fetched now, so Play all does not wait on the network between steps
    const next = narrClip(fig, i + 1); if (next) { NARR_NEXT = NARR_NEXT || new Audio(); if (NARR_NEXT.src !== new URL(next, location.href).href) { NARR_NEXT.preload = 'auto'; NARR_NEXT.src = next; NARR_NEXT.load(); } }
  } else synth();
  return true;
}
/* "Hear the why" on a question card: the recorded explanation of one of his own questions (NARR_Q, narration.js).
   Works whatever the narration setting is, since the learner asked for it by tapping. */
/* A spoken script shown as sentences; the one being read is highlighted. Recorded audio is followed by
   its share of the clip's time (each sentence takes time in proportion to its length); the device voice marks each sentence as it starts. */
const saySents = t => (String(t).match(/[^.;:!?]+[.;:!?]*["”’)]*\s*/g) || [String(t)]).filter(x => x.trim());
const sayHTML = t => saySents(t).map((x, i) => `<span class="ssent" data-si="${i}">${esc(x)}</span>`).join('');
/* Beside the transcript: her slide figure for what the sentence names, and her poisoning-table key row for a poison it names. */
const SAYFIG = [
  [/cyanide|rhodanese|thiosulfate|methemoglobin|amyl nitrite|methylene blue/i, 'smith-tp-cyanide', 'Her slide: cyanide antidote scheme'],
  [/acetaminophen|NAPQI|acetylcysteine|glutathione/i, 'smith-tp-apap', 'Her slide: acetaminophen metabolism'],
  [/warfarin|vitamin K/i, 'smith-tp-warfarin', 'Her slide: the vitamin K cycle and warfarin'],
  [/methanol|ethylene glycol|fomepizole|formic acid|oxalic/i, 'smith-tp-alcohols', 'Her slide: methanol and ethylene glycol metabolism'],
  [/pralidoxime|organophosphate|\baging\b|\baged\b/i, 'smith-tp-2pam', 'Her slide: pralidoxime and organophosphate-bound acetylcholinesterase'],
  [/chelat|dimercaprol|edetate|penicillamine|deferoxamine|succimer|trientine|deferasirox/i, 'smith-tp-chelators', 'Her slide: structure of chelators'],
  [/toxidrome/i, 'smith-tp-toxidromes', 'Her slide: Goodman and Gilman toxidrome table'],
  [/drugs? A and B|drug A\b|drug B\b/i, 'smith-tp-drugab', 'Her slide: drugs A and B in overdose'],
  [/figure 2-4|accumulat/i, 'smith-fig2-4', 'Casarett Figure 2-4: accumulation with repeated doses'],
  [/figure 2-8|\bC (and|versus|vs\.?) D\b|curves cross/i, 'smith-fig2-8', 'Casarett Figure 2-8: potency, A vs B and C vs D'],
  [/ED50|TD50|LD50|effective dose|toxic dose|lethal dose|therapeutic index|margin of safety/i, 'smith-fig2-7', 'Casarett Figure 2-7: ED, TD and LD lines'],
  [/U-shaped|hormesis|essential (nutrient|substance)|homeostasis/i, 'smith-fig2-5-u', 'Casarett Figure 2-5: U-shaped curve'],
  [/individual dose|carboxylesterase/i, 'smith-fig-ind-drc', 'Individual dose-response curve'],
  [/population dose|quantal|threshold/i, 'smith-fig2-6-pop', 'Population dose-response'],
  [/blood.brain barrier/i, 'smith-bbb', 'Brain capillary vs systemic capillary'],
  [/neuronopathy|axonopathy|myelinopathy|neurotransmission/i, 'smith-neuro-types', 'Types of neurotoxic injury'],
  [/zone (1|3|one|three)|Kupffer|acinus|central vein|portal/i, 'smith-liver', 'Liver blood flow and the lobule'],
  [/twin/i, 'smith-twins', 'Twin studies: antipyrine half-life'],
  [/haplotype|linkage/i, 'smith-haplotype', 'Her slide: haplotypes'],
  [/homozygous|heterozygous|genotype|allele/i, 'smith-zygosity', 'Her slide: alleles and genotype']];
const SAYMOV = [
  [/cyanide|rhodanese|thiosulfate|methemoglobin|amyl nitrite|methylene blue/i, 'ad:03-cyanide-antidote-stepper', 'Cyanide antidotes, step by step'],
  [/acetaminophen|NAPQI|acetylcysteine|glutathione/i, 's3:apap-nac', ''],
  [/methanol|ethylene glycol|fomepizole|formic acid|oxalic/i, 's3:methanol-eg', ''],
  [/warfarin|vitamin K/i, 'ad:07-warfarin-vitamin-k', 'Warfarin and vitamin K'],
  [/pralidoxime|\baging\b|\baged\b/i, 'ad:06-pralidoxime-and-co', 'Pralidoxime removes the organophosphate'],
  [/atropine|physostigmine|organophosphate|sludge/i, 'ad:05-cholinergic-atropine-physostigmine', 'Atropine and physostigmine at the synapse'],
  [/naloxone|flumazenil/i, 'ad:04-receptor-antagonist-naloxone-flumazenil', 'Naloxone and flumazenil'],
  [/ion trapping|bicarbonate|weak acid|urine (more )?basic/i, 's3:ion-trapping', ''],
  [/zone (1|3|one|three)|Kupffer|acinus|central vein|CYP2E1/i, 's3:liver-zones', ''],
  [/haplotype|linkage/i, 's3:haplotype', ''],
  [/homozygous|heterozygous|genotype|allele|phenotype/i, 's3:allele-genotype', '']];
const SAYROW = [[/acetaminophen/i, 'apap'], [/methanol|ethylene glycol|toxic alcohol/i, 'alc'], [/benzodiazepine|flumazenil/i, 'bzd'], [/beta.?blocker/i, 'bb'], [/calcium channel blocker/i, 'ccb'], [/digoxin/i, 'dig'], [/tricyclic/i, 'tca'], [/opioid|naloxone|opiate/i, 'opi'], [/salicylate|aspirin/i, 'sal'], [/sulfonylurea|octreotide/i, 'su'], [/\biron\b|deferoxamine/i, 'fe'], [/organophosphate|pralidoxime|sludge/i, 'op']];
function movHTML(ref, label) {
  if (ref.startsWith('s3:')) return stepHTML(ref.slice(3));
  const slug = ref.slice(3), t = store.get(COURSE.ns + ':theme');
  return antiOK() ? `<iframe class="saymov" title="${esc(label)}" src="${ANTI_BASE + slug}.html?embed=1${t === 'light' || t === 'dark' ? '&theme=' + t : ''}" loading="lazy"></iframe><div class="row" style="margin:4px 0 0"><button type="button" class="chip" data-anti="${esc(slug)}">◧ Open full size</button></div>` : '';
}
/* The panel above a transcript: the moving diagram, her full slide and her key row for what the current sentence is about.
   Each part is a fold the reader opens or closes; its content changes only when the topic changes. */
function saySide(box, text) {
  const side = box && box.previousElementSibling; if (!side || !side.classList.contains('sayside')) return;
  const f = SAYFIG.find(([re, k]) => re.test(text) && IMG[k]), mv = SAYMOV.find(([re, k]) => re.test(text) && (k.startsWith('ad:') || STEPS()[k.slice(3)])), rw = SAYROW.find(([re]) => re.test(text)), r = rw && ptRows().find(x => x.id === rw[1]);
  const part = (cls, html, label) => { const d = side.querySelector('.' + cls); d.hidden = false; d.querySelector('summary').textContent = label; d.querySelector('.sbody').innerHTML = html; };
  if (mv && side.dataset.m !== mv[1]) { const html = movHTML(mv[1], mv[2]); if (html) { side.dataset.m = mv[1]; part('saymovd', html, 'Moving diagram: ' + (mv[2] || (STEPS()[mv[1].slice(3)] || {}).title || '')); } }
  if (f && side.dataset.f !== f[1]) { side.dataset.f = f[1]; part('sayfigd', `<figure class="fig sayfig"><img src="${IMG[f[1]]}" alt="${esc(f[2])}; tap to enlarge"></figure>`, f[2]); }
  if (r && side.dataset.r !== r.id) { side.dataset.r = r.id; part('saykeyd', `<div class="saykey">${ptRowHTML(r)}</div>`, 'Her poisoning table key: ' + r.poison); }
}
const sideHTML = () => `<div class="sayside">${['saymovd', 'sayfigd', 'saykeyd'].map(c => `<details class="fold ${c}"${window.innerWidth >= 700 ? ' open' : ''} hidden><summary></summary><div class="sbody"></div></details>`).join('')}</div>`;
function sayMark(box, i) {
  if (!box) return; const ss = box.querySelectorAll('.ssent'); if (!ss.length) return;
  ss.forEach((x, k) => x.classList.toggle('on', k === i));
  if (ss[i]) saySide(box, ss[i].textContent);
  const on = ss[i]; if (on && box.scrollHeight > box.clientHeight) box.scrollTop = Math.max(0, on.offsetTop - box.offsetTop - 24);
}
function sayFrac(box, frac) {
  if (!box) return; const ss = [...box.querySelectorAll('.ssent')]; if (!ss.length) return;
  const lens = ss.map(x => x.textContent.length), tot = lens.reduce((a, b) => a + b, 0); let acc = 0, i = 0;
  for (; i < lens.length; i++) { acc += lens[i]; if (acc / tot >= frac) break; }
  sayMark(box, Math.min(i, ss.length - 1));
}
/* A script read aloud into its transcript box: the recorded clip if there is one, else the device voice; the sentence being read is highlighted. */
let SAY = null;
function sayStop() {
  const c = SAY; SAY = null; if (!c) return; clearTimeout(c.t);
  if (c.btn && document.body.contains(c.btn)) c.btn.textContent = c.label;
  if (c.audio) { c.audio.onended = c.audio.onerror = c.audio.ontimeupdate = null; c.audio.pause(); }
  if (narrCan()) speechSynthesis.cancel();
  if (c.done) c.done(false);
}
function sayPlay(text, box, btn, clip, done) {
  sayStop(); narrStop(); if (typeof qSayStop === 'function') qSayStop(); if (typeof rdStop === 'function') rdStop();
  const cur = SAY = {btn, label: btn ? btn.textContent : '', t: null, done};
  if (btn) btn.textContent = '■ Stop';
  const finish = () => { if (SAY !== cur) return; SAY = null; clearTimeout(cur.t); if (btn && document.body.contains(btn)) btn.textContent = cur.label; if (done) done(true); };
  const synth = () => {
    if (!narrCan()) return finish(); const v = narrVoice(); let last = null;
    saySents(text).forEach((p0, si) => { const p = speakable(p0); if (!p.trim()) return; const u = new SpeechSynthesisUtterance(p.trim()); u.rate = NAR.rate; u.lang = 'en-US'; if (v) u.voice = v; u.onstart = () => { if (SAY === cur) sayMark(box, si); }; last = u; speechSynthesis.speak(u); });
    if (!last) return finish(); last.onend = last.onerror = finish;
  };
  if (!clip) return synth();
  const a = cur.audio = NARR_AUDIO || (NARR_AUDIO = new Audio()); a.src = NAR_BASE() + clip; a.playbackRate = NAR.rate;
  const fallback = () => { if (SAY !== cur || cur.fell) return; cur.fell = true; cur.audio = null; synth(); };
  a.onended = finish; a.onerror = fallback;
  a.ontimeupdate = () => { if (SAY === cur && !cur.fell && isFinite(a.duration)) sayFrac(box, a.currentTime / a.duration); };
  a.play().catch(fallback);
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-antisay]');
  if (b) { if (SAY && SAY.btn === b) return sayStop(); const w = b.closest('.antibox').querySelector('.antitxw'), tb = b.closest('.antibox').querySelector('[data-antitx]'); w.hidden = false; if (tb) { tb.textContent = 'Hide transcript'; tb.setAttribute('aria-pressed', 'true'); } const box = w.querySelector('.antitx'); sayMark(box, 0); sayPlay(ANTI_NARR[b.dataset.antisay], box, b, typeof AD_CLIPS !== 'undefined' && AD_CLIPS.includes(b.dataset.antisay) ? 'ad-' + b.dataset.antisay + '.mp3' : null); return; }
  const t = e.target.closest('[data-antitx]');
  if (t) { const w = t.closest('.antibox').querySelector('.antitxw'); w.hidden = !w.hidden; t.textContent = w.hidden ? 'Show transcript' : 'Hide transcript'; t.setAttribute('aria-pressed', String(!w.hidden)); }
});
let QSAY = null;
function qSay(id, btn) {
  const text = NARR_Q[id]; if (!text) return;
  if (QSAY && QSAY.id === id) { qSayStop(); return; }
  qSayStop(); narrStop();
  const card = btn.closest('.qcard') || btn.parentElement, row = btn.closest('.qsay');
  let d = row.querySelector('.nsaid'); if (!d) { row.insertAdjacentHTML('beforeend', sideHTML().replace('class="sayside"', 'class="sayside" style="flex:1 1 100%"')); d = document.createElement('div'); d.className = 'nsaid saybox'; d.style.flex = '1 1 100%'; row.appendChild(d); } d.innerHTML = sayHTML(text); sayMark(d, 0);
  const cur = QSAY = {id, btn, t: null}; btn.textContent = '■ Stop'; btn.setAttribute('aria-pressed', 'true');
  const finish = () => { if (QSAY !== cur) return; qSayStop(); };
  const synth = () => { if (!narrCan()) return finish(); const v = narrVoice(); let last = null; saySents(text).forEach((part0, si) => { const part = speakable(part0); if (!part.trim()) return; const u = new SpeechSynthesisUtterance(part.trim()); u.onstart = () => { if (QSAY === cur) sayMark(d, si); }; u.rate = NAR.rate; u.lang = 'en-US'; if (v) u.voice = v; last = u; speechSynthesis.speak(u); }); if (!last) return finish(); last.onend = last.onerror = finish; cur.t = setTimeout(finish, (2000 + text.split(/\s+/).length * 450) / NAR.rate); };
  if (typeof Q_CLIPS !== 'undefined' && !Q_CLIPS.includes(id)) { cur.fell = true; synth(); cur.t = setTimeout(finish, (6000 + text.split(/\s+/).length * 500) / NAR.rate); return; }   // no recorded clip: the device voice, without a failed request
  const a = NARR_AUDIO || (NARR_AUDIO = new Audio()); a.preload = 'auto'; a.src = NAR_BASE() + 'q-' + id + '.mp3'; a.playbackRate = NAR.rate;
  const fallback = () => { if (QSAY !== cur || cur.fell) return; cur.fell = true; synth(); };
  a.onended = finish; a.onerror = fallback; a.ontimeupdate = () => { if (QSAY === cur && !cur.fell && isFinite(a.duration)) sayFrac(d, a.currentTime / a.duration); }; a.play().catch(fallback);
  a.onloadedmetadata = () => { if (QSAY === cur && !cur.fell && isFinite(a.duration)) { clearTimeout(cur.t); cur.t = setTimeout(finish, a.duration * 1000 / NAR.rate + 4000); } };
  cur.t = setTimeout(finish, (6000 + text.split(/\s+/).length * 500) / NAR.rate);
}
function qSayStop() {
  const c = QSAY; QSAY = null; if (!c) return; clearTimeout(c.t);
  if (document.body.contains(c.btn)) { c.btn.textContent = '🔊 Hear the why'; c.btn.setAttribute('aria-pressed', 'false'); }
  if (NARR_AUDIO) { NARR_AUDIO.onended = NARR_AUDIO.onerror = NARR_AUDIO.ontimeupdate = NARR_AUDIO.onloadedmetadata = null; NARR_AUDIO.pause(); }
  if (narrCan()) speechSynthesis.cancel();
}
document.addEventListener('click', e => { const b = e.target.closest('[data-qsay]'); if (b) qSay(b.dataset.qsay, b); });
function setNarr(mode) {
  NAR.mode = mode; store.set(COURSE.ns + ':narr', mode);
  if (NAR.cur && ANIM && ANIM.fig === NAR.cur.fig) { const i = NAR.cur.i; narrStop(); ANIM.t = setTimeout(ANIM.tick, playMs(ANIM.fig, i)); } else narrStop(); if (mode === 'off') document.querySelectorAll('.nsaid').forEach(d => d.remove()); narrFill(document); document.querySelectorAll('[data-nmode]').forEach(b => { b.classList.toggle('on', b.dataset.nmode === mode); b.setAttribute('aria-pressed', b.dataset.nmode === mode); }); }
function setRate(r) { NAR.rate = r; store.set(COURSE.ns + ':narr-rate', String(r)); document.querySelectorAll('.nrate').forEach(s => s.value = String(r)); if (NARR_AUDIO) NARR_AUDIO.playbackRate = r; }
const rateSel = () => `<label class="meta" style="margin:0">Speed <select class="nrate msel" aria-label="Narration speed">${NAR_RATES.map(r => `<option value="${r}" ${r === NAR.rate ? 'selected' : ''}>${r}×</option>`).join('')}</select></label>`;
function fillVoices(sel) { sel.innerHTML = `<option value="">Automatic</option>` + VOICES.map(v => `<option value="${esc(v.name)}" ${v.name === NAR.voice ? 'selected' : ''}>${esc(v.name)}</option>`).join(''); }
/* The row under a figure's controls: the setting (always, so it can be found), and when narration is on
   the speed, a mute switch and a transcript of every step (a line of it jumps to that step). */
function narrRowHTML(fig) {
  const sel = `<label class="meta" style="margin:0">Narration <select class="nsel msel" aria-label="Guided narration">${NAR_MODES.map(([k, l]) => `<option value="${k}" ${k === NAR.mode ? 'selected' : ''}>${l}</option>`).join('')}</select></label>`;
  if (NAR.mode === 'off') return sel;
  const n = fig.querySelectorAll('.stcap > p').length;
  const tr = `<details class="ntr"><summary>Transcript</summary><ol>${Array.from({length: n}, (_, i) => `<li data-ni="${i}"><button type="button" class="ntrl" data-ni="${i}">${esc(narrText(fig, i))}</button></li>`).join('')}</ol></details>`;
  if (NAR.mode === 'cap') return sel + tr;
  const rec = narrHasClips(fig);
  const who = `<span class="meta" style="margin:0">${rec ? 'Recorded narrator' : 'Device voice'}</span>`;
  return sel + (rec || narrCan() ? who + rateSel() + `<button type="button" class="chip nmute" aria-pressed="${NAR.muted}">${NAR.muted ? '🔇 Muted' : '🔊 Sound on'}</button>` : '<span class="meta" style="margin:0">This browser has no voice: captions only.</span>') + tr;
}
const narrFill = root => root.querySelectorAll('.narrow').forEach(d => { const fig = d.closest('figure'); if (fig) d.innerHTML = narrRowHTML(fig); });
// figures arrive with each page (and with a question's explanation): their rows are filled as they appear
new MutationObserver(ms => { if (NAR.cur && !document.body.contains(NAR.cur.fig)) narrStop(); if (ANIM && !document.body.contains(ANIM.fig)) playStop(); for (const m of ms) m.addedNodes.forEach(nd => { if (nd.nodeType !== 1) return; if (nd.matches && nd.matches('.narrow') && !nd.firstChild) narrFill({querySelectorAll: () => [nd]}); else if (nd.querySelectorAll) nd.querySelectorAll('.narrow:empty').forEach(d => { const fig = d.closest('figure'); if (fig) d.innerHTML = narrRowHTML(fig); }); }); })
  .observe(document.body, {childList: true, subtree: true});
// the setting card at the top of the Diagrams page
const narrCard = () => `<div class="card narrcard"><b>Guided narration</b><div class="row" style="margin-top:6px">${NAR_MODES.map(([k, l]) => `<button type="button" class="chip ${NAR.mode === k ? 'on' : ''}" aria-pressed="${NAR.mode === k}" data-nmode="${k}">${l}</button>`).join('')}</div>
  <div class="row" style="margin-top:6px">${narrCan() ? `<label class="meta" style="margin:0">Device voice <select class="nvoice msel" aria-label="Device voice for figures without recordings"></select></label>` : ''}${rateSel()}</div>
  <div class="row" style="margin-top:6px"><button type="button" class="chip" data-jump="drugs:dl-walk">Narrated walkthrough of the Exam 2 drug list</button></div>
  <p class="sub" style="margin:6px 0 0">Narrate when tapped: Back, Next, the step dots and Play all read the step aloud, and Play all moves on when the reading ends. The Exam 2 figures are read by a recorded narrator; figures without recordings use this device’s voice (which differs by device). Captions only: no sound, and a transcript of every step opens under each figure. Nothing plays until you tap a figure’s controls.</p></div>`;
document.addEventListener('change', e => {
  const t = e.target;
  if (t.classList.contains('nsel')) { const f = t.closest('figure'); setNarr(t.value); const s = f && f.querySelector('.nsel'); if (s) s.focus(); }
  else if (t.classList.contains('nrate')) setRate(+t.value);
  else if (t.classList.contains('nvoice')) { NAR.voice = t.value; store.set(COURSE.ns + ':narr-voice', t.value); }
});
document.addEventListener('click', e => {
  const m = e.target.closest('[data-nmode]'); if (m) return setNarr(m.dataset.nmode);
  const mu = e.target.closest('.nmute');
  if (mu) {
    NAR.muted = !NAR.muted; document.querySelectorAll('.nmute').forEach(b => { b.setAttribute('aria-pressed', NAR.muted); b.textContent = NAR.muted ? '🔇 Muted' : '🔊 Sound on'; });
    // muted mid-reading: Play all goes on at the reading pace of the words
    if (NAR.cur && ANIM && ANIM.fig === NAR.cur.fig) { const i = NAR.cur.i; narrStop(); ANIM.t = setTimeout(ANIM.tick, playMs(ANIM.fig, i)); } else narrStop();
    return;
  }
  const li = e.target.closest('.ntr .ntrl[data-ni]');
  if (li) { const fig = li.closest('figure'), dot = fig && fig.querySelector(`.sdot[data-i="${li.dataset.ni}"]`); if (dot) dot.click(); }
});
/* "Explain one": a select (or a Why? button in a table row) shows the matching
   <template data-x> card under the table; the card's button scrolls to that drug's panels. */
// scroll an element to just below the sticky header
const openTo = el => { for (let d = el && el.closest('details'); d; d = d.parentElement && d.parentElement.closest('details')) d.open = true; };
// a long way (over two screens, e.g. a Why? button far above its explanation) jumps at once, so the target is there when the tap ends
const scrollToEl = el => {
  openTo(el);
  const off = hdrOff(), top = el.getBoundingClientRect().top + window.scrollY - off;
  const smooth = !(RM() || Math.abs(top - window.scrollY) > 2 * innerHeight);
  window.scrollTo({top, behavior: smooth ? 'smooth' : 'auto'});
  settleOn(el, off, smooth ? 800 : 60);   // content rendered on the way can move the target
};
function showExplain(group, key) {
  const out = document.querySelector(`[data-xout="${group}"]`), sel = document.querySelector(`[data-xsel="${group}"]`);
  if (!out) return;
  const t = key && document.querySelector(`template[data-x="${group}:${key}"]`);
  out.innerHTML = t ? t.innerHTML : ''; fillImgs(out);
  if (sel) sel.value = key || '';
  return out;
}
document.addEventListener('change', e => { const s = e.target.closest('select[data-xsel]'); if (s) showExplain(s.dataset.xsel, s.value); });
document.addEventListener('click', e => {
  const w = e.target.closest('[data-xpick]');
  if (w) { const [g, k] = w.dataset.xpick.split(':'); const out = showExplain(g, k); if (out) scrollToEl(out.closest('.xpick')); return; }
  const g = e.target.closest('[data-xgo]');
  if (g) { const el = document.getElementById(g.dataset.xgo); if (el) { xBack(g.closest('.xpick')); scrollToEl(el); } }
});
/* After "See its panels", a floating button returns to the explanation it came from. */
function xBack(target) {
  let b = document.getElementById('xback');
  if (!target) { if (b) b.remove(); return; }
  if (!b) { b = document.createElement('button'); b.id = 'xback'; b.type = 'button'; b.className = 'btn'; b.textContent = '↑ Back to the explanation'; document.body.appendChild(b); }
  b.onclick = () => { if (document.body.contains(target)) scrollToEl(target); xBack(null); };
}
/* Phone: the Exam 1 figures are drawn on a 360-wide canvas with labels down to 7.5–8.5 units, which a
   375 px phone shows at 6–7 px. Under 560 px each picture gets the minimum width at which its smallest
   label is 10 px and scrolls sideways inside its own box (never the page), with a hint under it.
   Pictures whose labels are already 10 px or more (the Exam 2 figures) are left as they are. */
const PHONE = window.matchMedia ? matchMedia('(max-width:560px)') : null;
const FIG_MIN_PX = 10;
const swipeHint = box => { const h = box.nextElementSibling; if (h && h.classList.contains('swipe') && box.clientWidth) h.hidden = box.scrollWidth <= box.clientWidth + 1; };
function fitFigs(root) {
  if (!PHONE || !PHONE.matches || !root) return;
  // all reads first, then all writes, then the hint checks: one layout for the page instead of one per figure
  const todo = [];
  root.querySelectorAll('.fig .svgx > svg:not([data-fit])').forEach(svg => {
    const vb = svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal.width : 0; let min = Infinity;
    if (vb) svg.querySelectorAll('text').forEach(t => { if (t.textContent.trim()) { const f = parseFloat(getComputedStyle(t).fontSize); if (f > 0 && f < min) min = f; } });
    todo.push([svg, vb, min]);
  });
  const boxes = [];
  todo.forEach(([svg, vb, min]) => {
    svg.setAttribute('data-fit', '1');
    if (!vb || !(min < Infinity) || vb * FIG_MIN_PX / min <= 300) return;   // fits a phone as drawn
    svg.style.setProperty('--minw', Math.ceil(vb * FIG_MIN_PX / min) + 'px');
    const box = svg.parentElement; box.classList.add('fit');
    if (!(box.nextElementSibling && box.nextElementSibling.classList.contains('swipe'))) box.insertAdjacentHTML('afterend', '<div class="swipe" hidden>↔ Scroll the picture sideways to see all of it, or pinch to zoom.</div>');
    boxes.push(box);
  });
  boxes.forEach(swipeHint);
}
const allHints = () => document.querySelectorAll('.svgx.fit').forEach(swipeHint);
if (window.MutationObserver) {
  let pend = false;
  new MutationObserver(() => { if (pend || !PHONE || !PHONE.matches) return; pend = true; requestAnimationFrame(() => { pend = false; fitFigs($('#view')); }); }).observe($('#view'), {childList: true, subtree: true});
}
window.addEventListener('resize', () => { fitFigs($('#view')); allHints(); });
// a figure inside a closed section has no width until the section opens
document.addEventListener('toggle', e => { if (e.target.open && e.target.querySelectorAll) e.target.querySelectorAll('.svgx.fit').forEach(swipeHint); }, true);
// nor has one that was off screen when the page was built (figure cards use content-visibility: auto): measure it as it comes into view
document.addEventListener('contentvisibilityautostatechange', e => { if (!e.skipped && e.target.querySelectorAll) e.target.querySelectorAll('.svgx.fit').forEach(swipeHint); }, true);
/* A question's or term's figure; the static GPCR figure brings the step-through with it. */
const figHTML = key => (typeof FIG === 'function' && key) ? FIG(key) + (key === 'gpcr-steps' ? FIG('gpcr-anim') : '') : '';
/* Step-throughs (STEPS3, steps3*.js): one drawing per step with its caption; Back, Next and the dots move through them. */
const STEPS = () => typeof STEPS3 === 'undefined' ? {} : STEPS3;
function stepHTML(k, i = 0) {
  const d = STEPS()[k]; if (!d) return '';
  const st = d.steps[i];
  return `<figure class="fig step3" data-s3="${esc(k)}" data-i="${i}"><figcaption><b>${esc(d.title)}</b> <span class="meta" style="margin:0">step ${i + 1} of ${d.steps.length}</span></figcaption>
    <div class="s3svg">${st.svg}</div><p class="s3cap" aria-live="polite">${st.t}</p>
    <div class="row s3nav"><button type="button" class="btn ghost" data-s3go="-1" ${i ? '' : 'disabled'}>◂ Back</button>${d.steps.map((x, j) => `<button type="button" class="sdot${j === i ? ' on' : ''}" data-s3to="${j}" aria-label="Step ${j + 1}"></button>`).join('')}<button type="button" class="btn ghost" data-s3go="1" ${i < d.steps.length - 1 ? '' : 'disabled'}>Next ▸</button><button type="button" class="btn ghost" data-s3play>${S3PLAY && S3PLAY.k === k ? '■ Stop' : '🔊 Play'}</button></div>
    ${d.src ? `<div class="cite">${esc(d.src)}</div>` : ''}</figure>`;
}
let S3PLAY = null;
function s3Say(fig) {
  const k = fig.dataset.s3, i = +fig.dataset.i, d = STEPS()[k], cap = fig.querySelector('.s3cap'), btn = fig.querySelector('[data-s3play]');
  cap.innerHTML = sayHTML(cap.textContent); S3PLAY = {k};
  const clip = typeof S3_CLIPS !== 'undefined' && S3_CLIPS.includes(k + '-' + i) ? 's3-' + k + '-' + i + '.mp3' : null;
  sayPlay(cap.textContent, cap, btn, clip, ok => {
    if (!ok || !S3PLAY || S3PLAY.k !== k) { S3PLAY = null; return; }
    if (i >= d.steps.length - 1) { S3PLAY = null; const b2 = fig.isConnected ? fig.querySelector('[data-s3play]') : null; if (b2) b2.textContent = '🔊 Play'; return; }
    const t = document.createElement('div'); t.innerHTML = stepHTML(k, i + 1); const nf = t.firstElementChild; fig.replaceWith(nf); setTimeout(() => { if (S3PLAY && S3PLAY.k === k) s3Say(nf); }, 600);
  });
}
document.addEventListener('click', e => {
  const pb = e.target.closest('[data-s3play]');
  if (pb) { const fig = pb.closest('figure.step3'); if (S3PLAY && S3PLAY.k === fig.dataset.s3) { S3PLAY = null; sayStop(); pb.textContent = '🔊 Play'; } else s3Say(fig); return; }
  const b = e.target.closest('[data-s3go],[data-s3to]'); if (!b) return;
  const fig = b.closest('figure.step3'); if (!fig) return;
  if (S3PLAY && S3PLAY.k === fig.dataset.s3) { S3PLAY = null; sayStop(); }
  const d = STEPS()[fig.dataset.s3], i = b.dataset.s3to != null ? +b.dataset.s3to : Math.max(0, Math.min(d.steps.length - 1, +fig.dataset.i + +b.dataset.s3go));
  const t = document.createElement('div'); t.innerHTML = stepHTML(fig.dataset.s3, i); fig.replaceWith(t.firstElementChild);
});
function expandFigs(html) {
  return html
    .replace(/<!--STEP:([\w-]+)-->/g, (m, k) => stepHTML(k))
    .replace(/<!--FIG:([\w-]+)-->/g, (m, k) => FIG(k))
    .replace(/<!--IMG:([\w-]+)-->/g, (m, k) => IMG[k] ? `<figure class="fig">${imgTag(k, 'Figure from her slide; tap to enlarge')}</figure>` : '')
    .replace(/<!--GRAPH:([\s\S]*?)-->/g, (m, j) => { try { return FIG.graph(JSON.parse(j)); } catch (e) { return ''; } });
}
function vGuide() {
  $('#view').innerHTML = `<div class="tablewrap">${examPage(typeof GUIDE_HTML === 'undefined' ? '' : GUIDE_HTML, 'guide')}</div>`;
  fillImgs($('#view')); stackTables($('#view')); gwBars($('#view'));
  // previous / next at the foot of each section, within its exam group
  document.querySelectorAll('#view .exgroup, #view').forEach(g => {
    const secs = [...g.querySelectorAll(':scope section.guide[id]')].filter(s => s.parentElement === g || s.closest('.exgroup') === g);
    secs.forEach((s, i) => {
      if (s.querySelector(':scope > .gnav')) return;
      const t = x => { const w = (x.querySelector('h3') || {textContent: ''}).textContent.replace(/^\d+\.\s*/, ''); return w.length > 44 ? w.slice(0, 44).replace(/\s+\S*$/, '') + '…' : w; };
      const p = document.createElement('p'); p.className = 'gnav meta';
      p.innerHTML = (i ? `<a href="#${secs[i - 1].id}">◂ ${esc(t(secs[i - 1]))}</a>` : '<span></span>') + (i < secs.length - 1 ? `<a href="#${secs[i + 1].id}">${esc(t(secs[i + 1]))} ▸</a>` : '<span></span>');
      s.appendChild(p);
    });
  });
  document.querySelectorAll('.guidenav a, .gnav a').forEach(a => a.onclick = e => { const t = document.querySelector(a.getAttribute('href')); if (t) { e.preventDefault(); scrollToEl(t); } });
}

/* ---------- Guide walkthroughs: a spoken walk through each Exam 3 guide section, segment by segment, with the
   transcript marked as it plays and the deck slide (or reading) the segment discusses beside it. A recorded clip
   per segment (audio/gw-<section>-<i>.mp3) when there is one, else the device voice. ---------- */
const SLIDE_BASE = () => /\/exam1-drill\//.test(location.pathname) ? 'slides/' : 'exam1-drill/slides/';
const slideSrc = (d, n) => SLIDE_BASE() + d + '-' + String(n).padStart(2, '0') + '.jpg';
const GW_CONT_KEY = COURSE.ns + ':gw-cont';
const gwCont = () => (store.get(GW_CONT_KEY) || '1') === '1';
const gwHas = id => typeof GUIDE_WALK !== 'undefined' && !!GUIDE_WALK[id];
const gwRec = (id, i) => typeof GW_CLIPS !== 'undefined' && GW_CLIPS.includes(id + '-' + i);
let GW = null;   // {id, i, playing, fell, t, sel: 'deck:n' shown}
// the part each section was left on, so a walkthrough reopens where it stopped (cleared when a section is heard to the end)
const GW_POS_KEY = COURSE.ns + ':gw-pos';
const gwPos = id => { const v = storeObj(GW_POS_KEY)[id]; return Number.isInteger(v) && GUIDE_WALK[id] && v < GUIDE_WALK[id].segs.length ? v : 0; };
const gwPosSet = (id, i) => { const o = storeObj(GW_POS_KEY); if (i) o[id] = i; else delete o[id]; store.set(GW_POS_KEY, JSON.stringify(o)); };
function gwBars(root) {
  if (typeof GUIDE_WALK === 'undefined') return;
  root.querySelectorAll('section.guide[id]').forEach(s => {
    const w = GUIDE_WALK[s.id]; if (!w || s.querySelector(':scope > .gwbar')) return;
    const rec = w.segs.every((x, i) => gwRec(s.id, i));
    const bar = document.createElement('div'); bar.className = 'gwbar';
    const at = gwPos(s.id);
    bar.innerHTML = `<button type="button" class="btn" data-gwopen="${esc(s.id)}" aria-expanded="false">🎧 ${at ? 'Resume walkthrough at part ' + (at + 1) : 'Listen: walkthrough'}</button><span class="meta" style="margin:0">about ${w.mins} min · ${w.segs.length} parts · ${rec ? 'read by the narrator' : 'device voice'}</span>`;
    const h = s.querySelector('h3'); if (h) h.insertAdjacentElement('afterend', bar); else s.prepend(bar);
  });
}
function gwPanelHTML(id) {
  const w = GUIDE_WALK[id];
  const rates = [0.8, 1, 1.25, 1.5, 1.75, 2];
  return `<div class="gwpanel" data-gwp="${esc(id)}">
    <div class="row gwctl"><button type="button" class="chip" data-gwstep="-1" aria-label="Previous part">◂</button><button type="button" class="btn" data-gwplay>▶ Play</button><button type="button" class="chip" data-gwstep="1" aria-label="Next part">▸</button>
      <span class="meta gwpos" style="margin:0" aria-live="polite">Part 1 of ${w.segs.length}</span>
      <label class="meta" style="margin:0">Speed <select data-gwrate>${rates.map(r => `<option value="${r}"${r === NAR.rate ? ' selected' : ''}>${r}×</option>`).join('')}</select></label>
      <label class="meta" style="margin:0"><input type="checkbox" data-gwcont${gwCont() ? ' checked' : ''}> Continue to the next section</label></div>
    <div class="gwbarfill"><div></div></div>
    <div class="gwbody"><figure class="gwslide"></figure><ol class="gwtx">${w.segs.map((x, i) => `<li data-gwi="${i}" tabindex="0">${esc(x.t)}</li>`).join('')}</ol></div></div>`;
}
// the visual beside the transcript: the part's own slide or guide table, else the last one an earlier part named;
// "sel" is a slide the listener browsed to with the slide buttons
const GW_RD_SHORT = {'rodriguez-mozaz': 'Rodriguez-Mozaz and Weinberg, 2010', 'marraffa': 'Marraffa, Cohen and Howland, 2012', 'aapcc-bb': 'Beta-blocker guideline, 2005', 'aapcc-ccb': 'Calcium channel blocker guideline, 2005', 'dipiro-e9': 'DiPiro chapter e9', 'casarett-ch2': 'Casarett and Doull chapter 2', 'katzung-5': 'Katzung chapter 5', 'furuta-1998': 'Furuta and colleagues, 1998', 'dipiro-e6': 'DiPiro chapter e6'};
function gwShow(id, i, sel) {
  const p = document.querySelector(`.gwpanel[data-gwp="${id}"]`); if (!p) return;
  const w = GUIDE_WALK[id], segs = w.segs; if (!segs[i]) return;
  const changed = +p.dataset.at !== i; p.dataset.at = i;
  p.querySelectorAll('.gwtx li').forEach(li => { const on = +li.dataset.gwi === i; li.classList.toggle('on', on); if (on) li.setAttribute('aria-current', 'true'); else li.removeAttribute('aria-current'); });
  const li = p.querySelector(`.gwtx li[data-gwi="${i}"]`), ol = p.querySelector('.gwtx');
  if (li && ol.scrollHeight > ol.clientHeight) ol.scrollTop = li.offsetTop - ol.offsetTop - 8;
  // keep the line being read on screen while the panel is in view (never pulls the page from elsewhere)
  if (li && changed && GW && GW.id === id && GW.playing) { const r = p.getBoundingClientRect(), lr = li.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight && (lr.top < hdrOff() || lr.bottom > innerHeight)) li.scrollIntoView({block: 'nearest'}); }
  p.querySelector('.gwpos').textContent = `Part ${i + 1} of ${segs.length}`;
  let vis = sel ? {s: sel} : null;
  for (let k = i; k >= 0 && !vis; k--) if (segs[k].s || segs[k].tb != null) vis = segs[k].s ? {s: segs[k].s} : {tb: segs[k].tb};
  if (!vis) { const f0 = segs.find(x => x.s || x.tb != null); if (f0) vis = f0.s ? {s: f0.s} : {tb: f0.tb}; }
  const f = p.querySelector('.gwslide');
  let h = '';
  if (vis && vis.s) {
    const [d, n] = vis.s.split(':'), dk = GW_DECKS[d], src = slideSrc(d, +n);
    h += `<a href="${src}" target="_blank" rel="noopener" title="Open the slide full size"><img src="${src}" alt="${esc(dk.name)}, slide ${n}" loading="lazy" onerror="this.closest('figure').classList.add('noimg')"></a>
      <figcaption class="row"><span class="meta" style="margin:0">${esc(dk.name)} · slide ${n} of ${dk.n}</span><span class="row" style="gap:4px;margin-left:auto"><button type="button" class="chip" data-gwslide="-1" ${+n > 1 ? '' : 'disabled'} aria-label="Previous slide">‹ Slide</button><button type="button" class="chip" data-gwslide="1" ${+n < dk.n ? '' : 'disabled'} aria-label="Next slide">Slide ›</button></span></figcaption>
      <p class="meta gwnoimg">The slide images load on the class site.</p>`;
  } else if (vis && vis.tb != null) {
    const t = document.getElementById(id).querySelectorAll('table')[vis.tb];
    if (t) h += `<div class="tablewrap gwtable">${t.outerHTML}</div><p class="meta" style="margin:4px 0 0">From the guide section below</p>`;
  }
  const rd = segs[i].r;
  if (rd) { const r = (typeof READINGS !== 'undefined' ? READINGS : []).find(x => x.id === rd); if (r) h += `<div class="gwrd"><button type="button" class="chip" data-gwrd="${esc(rd)}" aria-expanded="false">📄 Reading: ${esc(GW_RD_SHORT[rd] || r.title)}</button><div class="gwrdbox" hidden></div></div>`; }
  f.innerHTML = h; f.hidden = !h; f.dataset.sel = vis && vis.s || '';
}
// the reading's status, topic and recorded summary, inside the panel; the card itself one tap further
function gwReading(btn) {
  const box = btn.nextElementSibling, id = btn.dataset.gwrd, r = (READINGS || []).find(x => x.id === id); if (!box || !r) return;
  if (!box.hidden) { box.hidden = true; btn.setAttribute('aria-expanded', 'false'); const a = box.querySelector('audio'); if (a) a.pause(); return; }
  const first = (String(r.about || '').match(/^[^.]*\.(\s|$)/) || [r.about || ''])[0];
  box.innerHTML = `<p style="margin:6px 0 4px"><b>${esc(r.title)}</b><br><span class="meta" style="margin:0">${esc(r.source || '')}</span></p>
    <p class="meta" style="margin:0 0 4px">${esc(RD_STATUS[r.status] || r.status || '')}${r.lecture ? ' · ' + esc(String(r.lecture)) : ''}</p>
    <p style="margin:0 0 6px">${esc(first)}</p>
    <audio controls preload="none" src="${NAR_BASE()}rd-${esc(id)}.mp3" style="width:100%"></audio>
    <p style="margin:6px 0 0"><button type="button" class="chip" data-gwrdgo="${esc(id)}">Open the reading card ›</button></p>`;
  const a = box.querySelector('audio'); a.onplay = () => gwPause(); a.onerror = () => a.remove();
  box.hidden = false; btn.setAttribute('aria-expanded', 'true');
}
function gwOpen(id, play) {
  const s = document.getElementById(id), bar = s && s.querySelector(':scope > .gwbar'); if (!bar) return;
  let p = s.querySelector('.gwpanel');
  if (!p) { bar.insertAdjacentHTML('afterend', gwPanelHTML(id)); p = s.querySelector('.gwpanel'); bar.querySelector('[data-gwopen]').setAttribute('aria-expanded', 'true'); }
  const at = GW && GW.id === id ? GW.i : gwPos(id);
  gwShow(id, at);
  if (play) gwPlay(id, at);
}
function gwClose(id) {
  if (GW && GW.id === id) gwStop();
  const s = document.getElementById(id); if (!s) return;
  const p = s.querySelector('.gwpanel'); if (p) p.remove();
  const b = s.querySelector('[data-gwopen]'); if (b) b.setAttribute('aria-expanded', 'false');
}
function gwUI() {
  document.querySelectorAll('.gwpanel').forEach(p => {
    const on = GW && GW.id === p.dataset.gwp && GW.playing;
    p.querySelector('[data-gwplay]').textContent = on ? '❚❚ Pause' : '▶ Play';
    p.classList.toggle('playing', !!on);
  });
}
function gwStop() {
  const g = GW; if (!g) return; GW = null; clearTimeout(g.t);
  if (NARR_AUDIO && g.audio) { NARR_AUDIO.onended = NARR_AUDIO.onerror = NARR_AUDIO.ontimeupdate = NARR_AUDIO.onloadedmetadata = null; NARR_AUDIO.pause(); }
  if (narrCan() && g.speaking) speechSynthesis.cancel();
  gwUI();
}
function gwPause() {
  if (!GW || !GW.playing) return; GW.playing = false; clearTimeout(GW.t);
  if (GW.audio && NARR_AUDIO) NARR_AUDIO.pause();
  if (GW.speaking && narrCan()) { speechSynthesis.cancel(); GW.speaking = false; }   // the device voice starts the part again on Play
  gwUI();
}
function gwPlay(id, i) {
  const w = GUIDE_WALK[id]; if (!w) return;
  // resume a recorded part where it was paused
  if (GW && GW.id === id && GW.i === i && !GW.playing && GW.audio && NARR_AUDIO && NARR_AUDIO.src && !NARR_AUDIO.ended && NARR_AUDIO.currentTime > 0) {
    GW.playing = true; NARR_AUDIO.playbackRate = NAR.rate; NARR_AUDIO.play().catch(() => {}); gwUI(); return;
  }
  sayStop(); GW_SELF = true; narrStop(); GW_SELF = false; if (typeof rdStop === 'function') rdStop(); if (typeof playStop === 'function') playStop();
  if (GW) { clearTimeout(GW.t); if (narrCan()) speechSynthesis.cancel(); }
  const cur = GW = {id, i, playing: true, t: null};
  gwPosSet(id, i);
  gwShow(id, i); gwUI(); gwMedia(id, i);
  const seg = w.segs[i], fill = () => document.querySelector(`.gwpanel[data-gwp="${id}"] .gwbarfill div`);
  const setFill = f => { const el = fill(); if (el) el.style.width = Math.round(100 * Math.min(1, (i + f) / w.segs.length)) + '%'; };
  setFill(0);
  const finish = () => { if (GW !== cur) return; clearTimeout(cur.t); cur.audio = cur.speaking = false; if (i + 1 < w.segs.length) gwPlay(id, i + 1); else gwEnd(id); };
  const synth = () => {
    if (!narrCan()) { cur.t = setTimeout(finish, (2000 + seg.t.split(/\s+/).length * 400) / NAR.rate); return; }
    cur.speaking = true; const v = narrVoice(); let last = null;
    saySents(seg.t).forEach(p0 => { const p = speakable(p0); if (!p.trim()) return; const u = new SpeechSynthesisUtterance(p.trim()); u.rate = NAR.rate; u.lang = 'en-US'; if (v) u.voice = v; last = u; speechSynthesis.speak(u); });
    if (!last) return finish(); last.onend = () => { if (GW === cur && cur.playing) finish(); };
    cur.t = setTimeout(() => { if (GW === cur && cur.playing) finish(); }, (4000 + seg.t.split(/\s+/).length * 520) / NAR.rate);
  };
  if (!gwRec(id, i)) return synth();
  const a = NARR_AUDIO || (NARR_AUDIO = new Audio()); cur.audio = true;
  a.onended = a.onerror = a.ontimeupdate = a.onloadedmetadata = null;
  a.preload = 'auto'; a.src = NAR_BASE() + 'gw-' + id + '-' + i + '.mp3'; a.playbackRate = NAR.rate;
  const fallback = () => { if (GW !== cur || cur.fell) return; cur.fell = true; cur.audio = false; synth(); };
  a.onended = finish; a.onerror = fallback;
  a.ontimeupdate = () => { if (GW === cur && isFinite(a.duration) && a.duration) setFill(a.currentTime / a.duration); };
  a.play().catch(fallback);
}
// the last part ended: the next section with a walkthrough opens and plays, when "Continue" is ticked
function gwEnd(id) {
  gwStop(); gwPosSet(id, 0); const el = document.querySelector(`.gwpanel[data-gwp="${id}"] .gwbarfill div`); if (el) el.style.width = '100%';
  if (!gwCont()) return;
  const all = [...document.querySelectorAll('#view section.guide[id]')].filter(s => gwHas(s.id)), k = all.findIndex(s => s.id === id);
  const nx = all[k + 1]; if (!nx) return;
  gwClose(id); openTo(nx); gwOpen(nx.id, false); scrollToEl(nx); gwPlay(nx.id, 0);
}
// lock-screen and headset controls on phones
function gwMedia(id, i) {
  if (!('mediaSession' in navigator)) return;
  try {
    const w = GUIDE_WALK[id];
    navigator.mediaSession.metadata = new MediaMetadata({title: w.title, artist: COURSE.short + ' guide walkthrough', album: 'Part ' + (i + 1) + ' of ' + w.segs.length});
    navigator.mediaSession.setActionHandler('play', () => { if (GW) gwPlay(GW.id, GW.i); });
    navigator.mediaSession.setActionHandler('pause', () => gwPause());
    navigator.mediaSession.setActionHandler('nexttrack', () => { if (GW && GW.i + 1 < GUIDE_WALK[GW.id].segs.length) gwPlay(GW.id, GW.i + 1); });
    navigator.mediaSession.setActionHandler('previoustrack', () => { if (GW) gwPlay(GW.id, Math.max(0, GW.i - 1)); });
  } catch (e) {}
}
let GW_SELF = false;
document.addEventListener('click', e => {
  const o = e.target.closest('[data-gwopen]');
  if (o) { const id = o.dataset.gwopen; if (document.querySelector(`.gwpanel[data-gwp="${id}"]`)) gwClose(id); else gwOpen(id, true); return; }
  const p = e.target.closest('.gwpanel'); if (!p) return;
  const id = p.dataset.gwp, at = GW && GW.id === id ? GW.i : +(p.querySelector('.gwtx li.on') || {dataset: {gwi: 0}}).dataset.gwi;
  if (e.target.closest('[data-gwplay]')) { if (GW && GW.id === id && GW.playing) gwPause(); else gwPlay(id, at); return; }
  const st = e.target.closest('[data-gwstep]');
  if (st) { const n = GUIDE_WALK[id].segs.length, to = Math.max(0, Math.min(n - 1, at + +st.dataset.gwstep)); if (GW && GW.id === id && GW.playing) gwPlay(id, to); else { gwStop(); gwShow(id, to); GW = {id, i: to, playing: false}; } return; }
  const li = e.target.closest('.gwtx li'); if (li) { gwPlay(id, +li.dataset.gwi); return; }
  const sl = e.target.closest('[data-gwslide]');
  if (sl) { const f = p.querySelector('.gwslide'), [d, n] = (f.dataset.sel || '').split(':'); if (d) { const to = +n + +sl.dataset.gwslide; if (to >= 1 && to <= GW_DECKS[d].n) gwShow(id, at, d + ':' + to); } return; }
  const rd = e.target.closest('[data-gwrd]'); if (rd) { gwReading(rd); return; }
  const rg = e.target.closest('[data-gwrdgo]'); if (rg) { gwPause(); jump('readings', 'rd-' + rg.dataset.gwrdgo); }
});
document.addEventListener('keydown', e => {
  const li = e.target.closest && e.target.closest('.gwtx li'); if (li && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); li.click(); return; }
  // inside a walkthrough panel: K or Space plays and pauses, the left and right arrows move a part (not while a field or the summary player has focus)
  const p = e.target.closest && e.target.closest('.gwpanel'); if (!p || e.metaKey || e.ctrlKey || e.altKey || /^(INPUT|SELECT|TEXTAREA|AUDIO)$/.test(e.target.tagName)) return;
  if (e.key === 'k' || (e.key === ' ' && !/^(BUTTON|A)$/.test(e.target.tagName))) { e.preventDefault(); e.stopPropagation(); p.querySelector('[data-gwplay]').click(); }
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); p.querySelector(`[data-gwstep="${e.key === 'ArrowLeft' ? -1 : 1}"]`).click(); }
}, true);
document.addEventListener('change', e => {
  if (e.target.matches('[data-gwrate]')) { NAR.rate = +e.target.value; store.set(COURSE.ns + ':narr-rate', String(NAR.rate)); if (GW && GW.audio && NARR_AUDIO) NARR_AUDIO.playbackRate = NAR.rate; document.querySelectorAll('[data-gwrate]').forEach(s => { s.value = String(NAR.rate); }); }
  if (e.target.matches('[data-gwcont]')) { store.set(GW_CONT_KEY, e.target.checked ? '1' : '0'); document.querySelectorAll('[data-gwcont]').forEach(c => { c.checked = e.target.checked; }); }
});

/* ---------- Readings: what each assigned reading covers, what she used from it in class, and the drill on it ---------- */
const RD_STATUS = {discussed: 'Discussed in class', background: 'Behind her slides', assigned: 'Assigned; not discussed in class', upcoming: 'Assigned for a coming lecture', his: 'His chapter'};
const rdQs = r => QUESTIONS.filter(q => q.readingId === r.id && !(q.tags || []).includes('quiz'));
const rdQuiz = r => QUESTIONS.filter(q => q.readingId === r.id && (q.tags || []).includes('quiz'));
const rdLecLabel = r => (r.lectures || []).map(id => (COURSE.lectures.find(l => l.id === id) || {}).label || id).map(l => l.replace(/ \(Dr\. [^)]*\)$/, '')).join('; ');
/* The first two sentences of the summary sit on the card; the rest opens under "About, in full". */
const rdLead = t => { const m = t.match(/^((?:[^.!?]*[.!?]\)?\s*){1,2})([\s\S]*)$/); return m && m[2].trim() ? [m[1].trim(), m[2].trim()] : [t, '']; };
function rdCard(r) {
  const qs = rdQs(r), quiz = rdQuiz(r);
  const fold = (title, inner) => inner ? `<details class="fold rdfold"><summary>${title}</summary>${inner}</details>` : '';
  const li = arr => arr && arr.length ? `<ul>${arr.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
  const use = (r.lecture_use || []).length ? `<ul>${r.lecture_use.map(u => `<li><b>${esc(r.exam === 3 ? tidyQuoted(u.point) : u.point)}</b>${u.chapter_location ? ` <small>(${esc(u.chapter_location)})</small>` : ''}${u.lecture_evidence ? `<div class="sub rdq">“${esc(u.evidence_clean || u.lecture_evidence)}” <small>(T) ${esc(u.date || '')}</small></div>` : ''}</li>`).join('')}</ul>` : '';
  const words = (r.her_words || []).length ? `<ul>${r.her_words.map(w => `<li>“${esc(w.t || w)}”${w.date ? ` <small>(T) ${esc(w.date)}</small>` : ''}</li>`).join('')}</ul>` : '';
  const terms = (r.terms || []).length ? `<ul>${r.terms.map(t => `<li><b>${esc(t.term)}</b>: ${esc(t.chapter_definition)}</li>`).join('')}</ul>` : '';
  const when = r.date ? ` · ${esc(r.date)}` : '';
  const lec = r.lecture || rdLecLabel(r);
  return `<div class="card rd" id="rd-${esc(r.id)}">
    <div class="rdhead"><b>${esc(r.title)}</b> <span class="exlabel">${esc(RD_STATUS[r.status] || r.status)}</span>
      <small>${esc(r.source || '')}${lec ? ` · ${esc(lec)}` : ''}${when}${r.drive ? ` · <a href="${esc(r.drive)}" target="_blank" rel="noopener">Open in Drive</a>` : ''}${r.truncated ? ' · summary from a partial text' : ''}</small></div>
    <p>${esc(rdLead(r.about || '')[0])}</p>${r.numbering_note ? `<p class="sub">${esc(r.numbering_note)}</p>` : ''}
    <div class="row rdact">${qs.length ? `<button class="btn" data-rdq="${esc(r.id)}">Drill ${qs.length} question${qs.length === 1 ? '' : 's'}</button>` : `<span class="meta" style="margin:0">${r.status === 'his' ? 'His exams come from the slides and the drug list; no reading drill.' : 'No questions yet: she has not discussed it in class.'}</span>`}
      ${quiz.length ? `<button class="btn ghost" data-rdquiz="${esc(r.id)}">Her quiz items (${quiz.length})</button>` : ''}
      ${r.listen ? `<button class="btn ghost" data-rdlisten="${esc(r.id)}">🔊 Listen${r.listen_secs ? ' · ' + rdClock(r.listen_secs) : ''}</button>` : ''}
      ${(r.links || []).map(([v, a, l]) => `<button type="button" class="chip" data-jump="${esc(v)}:${esc(a)}">${esc(l)}</button>`).join('')}</div>
    ${r.listen ? `<div class="rdplayer" data-rdp="${esc(r.id)}" hidden><div class="row"><button type="button" class="btn ghost" data-rdpp>❚❚ Pause</button><button type="button" class="btn ghost" data-rdpn hidden>Next ▸</button><button type="button" class="btn ghost" data-rdps>■ Stop</button><button type="button" class="btn ghost" data-rdtx aria-pressed="false">Show transcript</button><span class="meta rdpt" aria-live="off">0:00</span></div><input type="range" class="rdseek" min="0" max="1000" step="1" value="0" aria-label="Position in the talk"><div class="rdside" hidden>${sideHTML()}<div class="nsaid saybox rdtx">${sayHTML(r.listen)}</div></div></div>` : ''}
    ${fold('About, in full', rdLead(r.about || '')[1] ? `<p>${esc(r.about)}</p>` : '')}
    ${fold('Read for', li(r.read_for))}
    ${fold('Where her lecture used it', use)}
    ${fold('Her words about it', words ? words + (r.quotes_note ? `<p class="sub">${esc(r.quotes_note)}</p>` : '') : '')}
    ${fold('Terms it defines', terms)}
    ${fold('Beyond the lecture', li(r.beyond_lecture))}
  </div>`;
}
function vReadings() {
  const RS = typeof READINGS === 'undefined' ? [] : READINGS;
  const groups = COURSE.exams.map(e => { const rs = RS.filter(r => r.exam === e.id); return exGroup(e, rs.length ? rs.map(rdCard).join('') : '<div class="empty">No readings recorded for this exam yet.</div>'); }).join('');
  const deck = RS.filter(r => r.listen && r.exam === activeId());
  const totalSecs = deck.reduce((a, r) => a + (r.listen_secs || 0), 0);
  const deckHtml = deck.length ? `<div class="card rddeck" id="rddeck"><div class="row" style="justify-content:space-between"><b>Listen deck: ${esc(active().name)} readings</b><span class="meta" style="margin:0">${deck.length} talks${totalSecs ? ', ' + rdClock(totalSecs) + ' in all' : ''}</span></div>
    <p class="sub" style="margin:4px 0 8px">The main takeaway of each reading, in order or shuffled, one after another. Tap a title to start there.</p>
    <div class="row"><button class="btn" id="rdplay">▶ Play all</button><button class="btn ghost" id="rdshuffle">⇄ Shuffle</button><button class="btn ghost" id="rdpause" hidden>❚❚ Pause</button><button class="btn ghost" id="rdnext" hidden>Next ▸</button><button class="btn ghost" id="rdstop" hidden>■ Stop</button><span class="meta rdtime" id="rdtime" style="margin:0" hidden></span><label class="meta" style="margin:0 0 0 6px">Speed <select id="rdrate">${[0.8, 1, 1.15, 1.3, 1.5].map(v => `<option value="${v}" ${v === NAR.rate ? 'selected' : ''}>${v}×</option>`).join('')}</select></label></div>
    <ol class="rdlist">${deck.map(r => `<li><button type="button" class="rdtrack" data-rdplay="${esc(r.id)}">${esc(r.title.split(' (')[0])}</button>${r.listen_secs ? ` <span class="meta" style="margin:0">${rdClock(r.listen_secs)}</span>` : ''}</li>`).join('')}</ol>
    <div class="nsaid rdsaid" id="rdsaid" hidden></div></div>` : '';
  $('#view').innerHTML = `<h2>Readings</h2>
    <p class="sub">Each assigned reading: what it covers, what she drew from it in class, and the questions on it. Her rule (10/9): a reading is tested on what was read and discussed in class, not on dates or numbers from the text. Folded sections open on tap.</p>${deckHtml}${groups}`;
  $('#view').onclick = e => {
    if (e.target.closest('[data-rdpp]')) return rdPause();
    if (e.target.closest('[data-rdps]')) return rdStop();
    const tx = e.target.closest('[data-rdtx]'); if (tx) { const box = tx.closest('.rdplayer').querySelector('.rdside'); box.hidden = !box.hidden; RD_TX = !box.hidden; tx.textContent = box.hidden ? 'Show transcript' : 'Hide transcript'; tx.setAttribute('aria-pressed', String(!box.hidden)); return; }
    if (e.target.closest('[data-rdpn]')) return rdNext();
    const b = e.target.closest('[data-rdq],[data-rdquiz],[data-rdplay],[data-rdlisten]'); if (!b) return;
    const r = RS.find(x => x.id === (b.dataset.rdq || b.dataset.rdquiz || b.dataset.rdplay || b.dataset.rdlisten)); if (!r) return;
    if (b.dataset.rdq) startQuiz(rdQs(r), 'Reading: ' + r.title.split(' (')[0], 'pass', {back: true});
    else if (b.dataset.rdquiz) startQuiz(rdQuiz(r), 'Her quiz on the reading', 'pass', {back: true});
    else if (b.dataset.rdplay) rdPlayFrom(deck, deck.indexOf(r), false);
    else if (RDK && RDK.list[RDK.i] && RDK.list[RDK.i].id === r.id) rdPause();
    else rdPlayFrom([r], 0, false);
  };
  if (deck.length) {
    $('#rdplay').onclick = () => rdPlayFrom(deck, 0, false);
    $('#rdshuffle').onclick = () => rdPlayFrom(shuffle(deck.slice()), 0, true);
    $('#rdnext').onclick = () => rdNext();
    $('#rdpause').onclick = () => rdPause();
    $('#rdstop').onclick = () => rdStop();
    $('#rdrate').onchange = e => { NAR.rate = +e.target.value; store.set(COURSE.ns + ':narr-rate', NAR.rate); if (NARR_AUDIO) NARR_AUDIO.playbackRate = NAR.rate; };
  }
  $('#view').oninput = e => { const sk = e.target.closest('.rdseek'); if (sk) rdSeek(+sk.value / 1000, true); };
  $('#view').onchange = e => { const sk = e.target.closest('.rdseek'); if (sk) rdSeek(+sk.value / 1000, false); };
}
/* The listen deck: recorded talks (audio/rd-<id>.mp3) played one after another; if a clip cannot be loaded the device's voice reads the script. */
let RDK = null;
const rdClock = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
function rdTime(cur, total) {
  const el = document.getElementById('rdtime'); if (el) { el.hidden = false; el.textContent = total ? `${rdClock(cur)} / ${rdClock(total)}` : rdClock(cur); }
  const p = rdPlayer(); if (!p) return;
  const t = p.querySelector('.rdpt'), sk = p.querySelector('.rdseek');
  if (RDK && RDK.fell) { t.textContent = 'Read by the device voice (no time bar)'; sk.hidden = true; return; }
  sk.hidden = false; t.textContent = total ? `${rdClock(cur)} / ${rdClock(total)} · ${rdClock(total - cur)} left` : rdClock(cur);
  if (!RDK || !RDK.seeking) sk.value = total ? Math.round(1000 * cur / total) : 0;
  if (total) sayFrac(p.querySelector('.rdtx'), cur / total);
}
/* The player on the card of the talk now playing: pause, stop, next, a seek bar and the time left. */
let RD_TX = false;   // the transcript stays open from one talk to the next once shown
const rdPlayer = () => RDK && RDK.list[RDK.i] ? document.querySelector(`.rdplayer[data-rdp="${RDK.list[RDK.i].id}"]`) : null;
function rdShowPlayer() {
  document.querySelectorAll('.rdplayer').forEach(p => p.hidden = true);
  const p = rdPlayer(); if (!p) return; p.hidden = false;
  const k = RDK; p.querySelector('[data-rdpp]').textContent = k.paused ? '▶ Resume' : '❚❚ Pause';
  p.querySelector('[data-rdpn]').hidden = k.i >= k.list.length - 1;
  const box = p.querySelector('.rdside'), tb = p.querySelector('[data-rdtx]'); if (box && tb) { box.hidden = !RD_TX; tb.textContent = RD_TX ? 'Hide transcript' : 'Show transcript'; tb.setAttribute('aria-pressed', String(RD_TX)); }
}
function rdSeek(f, dragging) {
  const k = RDK, a = NARR_AUDIO; if (!k || k.fell || !a || !isFinite(a.duration)) return;
  k.seeking = dragging; if (dragging) { rdTime(f * a.duration, a.duration); return; }
  a.currentTime = f * a.duration; clearTimeout(k.t);
  if (!k.paused) k.t = setTimeout(k.finish, (a.duration - a.currentTime) * 1000 / NAR.rate + 4000);
  rdTime(a.currentTime, a.duration);
}
function rdPause() {
  const k = RDK; if (!k) return; const b = document.getElementById('rdpause');
  if (!k.paused) {
    k.paused = true; clearTimeout(k.t);
    if (k.fell) { if (narrCan()) speechSynthesis.pause(); } else if (NARR_AUDIO) NARR_AUDIO.pause();
    if (b) b.textContent = '▶ Resume'; rdShowPlayer();
  } else {
    k.paused = false;
    if (k.fell) { if (narrCan()) speechSynthesis.resume(); k.t = setTimeout(() => rdNext(), 10 * 60 * 1000); }
    else if (NARR_AUDIO) { NARR_AUDIO.play().catch(() => {}); const left = isFinite(NARR_AUDIO.duration) ? (NARR_AUDIO.duration - NARR_AUDIO.currentTime) * 1000 / NAR.rate + 4000 : 10 * 60 * 1000; k.t = setTimeout(() => rdNext(), left); }
    if (b) b.textContent = '❚❚ Pause'; rdShowPlayer();
  }
}
function rdPlayFrom(list, i, shuffled) {
  rdStop(); narrStop(); if (typeof qSayStop === 'function') qSayStop();
  RDK = {list, i, shuffled, t: null, fell: false};
  rdPlayCur();
}
function rdPlayCur() {
  const k = RDK; if (!k || k.i >= k.list.length) return rdStop();
  const r = k.list[k.i], text = r.listen; const cur = k;
  document.querySelectorAll('.rdtrack').forEach(b => b.classList.toggle('on', b.dataset.rdplay === r.id));
  const said = document.getElementById('rdsaid'); if (said) { said.hidden = false; said.innerHTML = `<b>${esc(r.title.split(' (')[0])}</b> <span class="meta">${k.i + 1} of ${k.list.length}${k.shuffled ? ', shuffled' : ''}</span><div>${esc(text)}</div>`; }
  const nx = document.getElementById('rdnext'), st = document.getElementById('rdstop'), pl = document.getElementById('rdplay'), pa = document.getElementById('rdpause'); if (nx) nx.hidden = false; if (st) st.hidden = false; if (pa) { pa.hidden = false; pa.textContent = '❚❚ Pause'; } if (pl) pl.textContent = '▶ Playing…';
  k.paused = false; rdShowPlayer(); rdTime(0, r.listen_secs || 0);
  const finish = () => { if (RDK !== cur) return; clearTimeout(cur.t); cur.i++; cur.fell = false; cur.i < cur.list.length ? rdPlayCur() : rdStop(); };
  cur.finish = finish;
  const synth = () => {
    if (!narrCan()) return finish();
    const v = narrVoice(); let last = null;
    saySents(text).forEach((part0, si) => { const part = speakable(part0); if (!part.trim()) return; const u = new SpeechSynthesisUtterance(part.trim()); u.onstart = () => { if (RDK === cur) { const pl = rdPlayer(); if (pl) sayMark(pl.querySelector('.rdtx'), si); } }; u.rate = NAR.rate; u.lang = 'en-US'; if (v) u.voice = v; last = u; speechSynthesis.speak(u); });
    if (!last) return finish(); last.onend = last.onerror = finish;
    cur.t = setTimeout(finish, (4000 + text.split(/\s+/).length * 500) / NAR.rate);
  };
  const a = NARR_AUDIO || (NARR_AUDIO = new Audio()); a.preload = 'auto'; a.src = NAR_BASE() + 'rd-' + r.id + '.mp3'; a.playbackRate = NAR.rate;
  const fallback = () => { if (RDK !== cur || cur.fell) return; cur.fell = true; synth(); };
  a.onended = finish; a.onerror = fallback;
  a.onloadedmetadata = () => { if (RDK === cur && isFinite(a.duration)) { clearTimeout(cur.t); cur.t = setTimeout(finish, a.duration * 1000 / NAR.rate + 4000); rdTime(0, a.duration); } };
  a.ontimeupdate = () => { if (RDK === cur && !cur.fell) rdTime(a.currentTime, isFinite(a.duration) ? a.duration : r.listen_secs || 0); };
  // the guard timer runs while paused too, so a pause of any length is counted back in on resume
  const guard0 = (6000 + text.split(/\s+/).length * 500) / NAR.rate; cur.t = setTimeout(finish, guard0);
  a.play().catch(fallback);
}
function rdNext() { const k = RDK; if (!k) return; clearTimeout(k.t); if (NARR_AUDIO) { NARR_AUDIO.onended = NARR_AUDIO.onerror = null; NARR_AUDIO.pause(); } if (narrCan()) speechSynthesis.cancel(); k.i++; k.fell = false; k.i < k.list.length ? rdPlayCur() : rdStop(); }
function rdStop() {
  const k = RDK; RDK = null; if (!k) return; clearTimeout(k.t);
  if (NARR_AUDIO) { NARR_AUDIO.onended = NARR_AUDIO.onerror = null; NARR_AUDIO.pause(); }
  if (narrCan()) speechSynthesis.cancel();
  document.querySelectorAll('.rdtrack').forEach(b => b.classList.remove('on'));
  document.querySelectorAll('.rdplayer').forEach(p => p.hidden = true);
  const nx = document.getElementById('rdnext'), st = document.getElementById('rdstop'), pl = document.getElementById('rdplay'), pa = document.getElementById('rdpause'), tm = document.getElementById('rdtime'); if (nx) nx.hidden = true; if (st) st.hidden = true; if (pa) pa.hidden = true; if (tm) tm.hidden = true; if (pl) pl.textContent = '▶ Play all';
}

/* Tap a slide figure to see it full size; tap again or press Escape to close. */
document.addEventListener('click', e => {
  const z = document.getElementById('zoomfig'); if (z) { z.remove(); return; }
  const im = e.target.closest('figure.stemfig img, .tablewrap figure.fig img, figure.sayfig img'); if (!im || !im.src || im.naturalWidth < 700) return;
  const d = document.createElement('div'); d.id = 'zoomfig'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Figure, full size');
  d.innerHTML = `<p class="meta">Scroll to move around; tap to close.</p><img src="${im.src}" alt="${esc(im.alt || 'figure')}">`; document.body.appendChild(d);
});
document.addEventListener('keydown', e => { const z = document.getElementById('zoomfig'); if (z && e.key === 'Escape') z.remove(); });

/* Back to top: shows on a page longer than two screens once the reader is three screens down or near the end. */
const TOTOP = Object.assign(document.createElement('button'), {id: 'totop', type: 'button', className: 'btn', textContent: '↑ Top', hidden: true});
TOTOP.setAttribute('aria-label', 'Back to the top of the page');
TOTOP.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});
document.body.appendChild(TOTOP);
const topCheck = () => { const h = document.documentElement.scrollHeight, v = window.innerHeight; TOTOP.hidden = !(h > 2 * v && (window.scrollY + v > h - 600 || window.scrollY > 3 * v)); };
window.addEventListener('scroll', topCheck, {passive: true}); window.addEventListener('resize', topCheck);

/* ---------- Progress: profile, pace, export ---------- */
function download(name, text, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], {type}));
  a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);   // free the copy once the download has started
}
/* ---------- Question map: every question in the bank, colour-coded ----------
   unseen = never answered; right / wrong = the outcome of the most recent
   answer (quiz, exam simulator or term quiz). Colour is backed by a mark
   (✓, ✗, blank) so the states read without colour. */
/* The most recent answer per question, built once per render. */
/* Keyed on the log itself and its newest entry, not its length: the log is capped at 5000 (the
   length then stops changing) and a profile switch or import can bring a log of the same length. */
let LAST = null, LAST_LOG = null, LAST_K = '';
function lastMap() {
  const L = S.log, k = L.length + ':' + (L.length ? L[L.length - 1].t + L[L.length - 1].id : '');
  if (LAST && LAST_LOG === L && LAST_K === k) return LAST;
  LAST = {}; L.forEach(e => LAST[e.id] = e.ok); LAST_LOG = L; LAST_K = k; return LAST;
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
/* Exam 2 figures are tissue tracings (tone or pressure over time), not dose–response curves:
   the same miss tags, worded for a tracing. */
const MISS2 = {
  direction: ['Helping or hurting', 'Which way does the response go after the drug, and does the second drug help the first (more of the same response) or block it?'],
  class: ['Which drug', 'The reading was right; now name it: which receptor does the drug act on (agonist, antagonist, indirect), and which drug on the list does that?'],
  read: ['Read the tracing', 'Tissue, response and arrows first: what is measured, what was given when, and what was the response before the drug?'],
  affinity: ['Which receptor', 'Which receptor does the drug act on in this tissue (M3, β1, β2, α1, Nm), and what does that receptor do here?']
};
const missOf = (g, m) => (g && g.exam === 2 && MISS2[m]) || MISS[m] || [m, ''];
const graphOf = img => GR.find(g => g.key === img || (g.alts || []).includes(img));
let GQ = null;   // image key → questions, built once
const graphQs = g => { if (!GQ) { GQ = {}; QUESTIONS.forEach(q => { if (q.img) (GQ[q.img] = GQ[q.img] || []).push(q); }); } return [g.key].concat(g.alts || []).flatMap(k => GQ[k] || []); };
/* What the student skipped on this figure: the miss tags of the wrong options they chose, across the log. */
function missTally(g) {
  const ids = {}; graphQs(g).forEach(q => ids[q.id] = q);
  const t = {};
  S.log.forEach(e => {
    const q = ids[e.id]; if (!q || e.ok || q.type === 'match' || q.type === 'fill') return;
    [].concat(e.picked == null ? [] : e.picked).forEach(i => { const o = q.options[i]; if (o && !o.correct && o.miss) t[o.miss] = (t[o.miss] || 0) + 1; });
  });
  return Object.entries(t).sort((a, b) => b[1] - a[1]);
}
function graphFeedback(q, st) {
  const g = q.img && graphOf(q.img); if (!g) return '';
  let h = '';
  if (!st.ok && q.type !== 'match' && q.type !== 'fill') {
    const picked = [].concat(st.picked == null ? [] : st.picked instanceof Set ? [...st.picked] : st.picked);
    const misses = [...new Set(picked.map(i => q.options[i]).filter(o => o && !o.correct && o.miss).map(o => o.miss))];
    if (misses.length) h += `<div class="gskip"><b>The question you skipped:</b> ${misses.map(m => { const d = missOf(g, m); return `<span class="chip on">${esc(d[0])}</span> ${esc(d[1])}`; }).join('<br>')}</div>`;
  }
  h += `<details class="gread"${st.ok ? '' : ' open'}><summary>${g.exam === 2 ? 'Read this tracing his way' : 'Read this figure his way'}</summary><ul>${(g.read || []).map(r => `<li>${esc(r)}</li>`).join('')}</ul>${g.method ? `<div class="meta">${esc(g.method)}</div>` : ''}</details>`;
  return h;
}
function graphDone() {
  const g = GR.find(x => x.key === Q.graph);
  const tally = missTally(g);
  $('#view').innerHTML = `<div class="card"><h2>${esc(g.title)}: pass finished</h2><p>${Q.right} of ${Q.done} correct.</p>
    ${tally.length ? `<p><b>What you keep skipping on this figure</b></p><ul>${tally.map(([m, n]) => { const d = missOf(g, m); return `<li><b>${esc(d[0])}</b> (${n}×): ${esc(d[1])}</li>`; }).join('')}</ul>` : '<p>No reading question was skipped on this pass.</p>'}
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
  ['Signal transduction', ['gpcr-steps', 'gpcr-anim', 'galpha-chain', 'galpha-anim', 'crosstalk', 'rtk-steps', 'rtk-anim', 'rtk-scenarios-anim']],
  ['Two drugs at one receptor: how the curve moves', ['shift-competitive-anim', 'shift-irreversible-anim', 'shift-inverse-anim', 'shift-fafa-anim', 'shift-fapa-anim', 'shift-fapa-down-anim', 'shift-allo-agonist-anim', 'shift-allo-antagonist-anim']],
  ['Indirect antagonists and drug combinations', ['ind-ssri-anim', 'ind-snri-anim', 'ind-ache-anim', 'ind-carbidopa-anim', 'ind-pde-anim', 'ind-ras-anim', 'enhance-anim']],
  ['Receptor regulation', ['reg-chain', 'desens-rapid-anim', 'desens-long-anim', 'upreg-anim', 'downreg-anim']],
  ['Autonomic layout, receptors and the baroreceptor reflex', ['e2-nerve-anim', 'e2-ans-layout', 'e2-innervation-map', 'e2-gi-dual-anim', 'e2-gprotein-anim', 'e2-body-map', 'e2-receptor-map', 'e2-musc-map', 'e2-baroreflex-anim', 'e2-ach-bolus-anim'], 2],
  ['Cholinergic synapses: where each drug acts', ['e2-nmj-anim', 'e2-sch-phases-anim', 'e2-chol-synapse-anim', 'e2-op-anim'], 2],
  ['Adrenergic synapse: where each drug acts', ['e2-adr-cycle-anim', 'e2-adr-synapse-anim', 'e2-maoi-tyramine-anim', 'e2-bagon-anim', 'e2-bb-anim', 'e2-beta-blockers'], 2],
  ['Blood pressure and the tracings', ['e2-map-anim', 'e2-epi-reversal-anim', 'e2-trace-anim', 'e2-no-pathway-anim'], 2],
  ['Renin–angiotensin–aldosterone system', ['e2-raas-cascade-anim', 'e2-raas-anim'], 2]
];
const DG_NAMES = {'rtk-steps': 'RTK activation: the five steps'};
/* Pages built from data that does not change within a visit keep their HTML: the diagrams (per exam),
   and the question map and the graphs list keyed on the answers and flags they show. */
const VIEW_CACHE = {};
// ref: the S.log the HTML was built from (a profile switch or an import brings a new one, as lastMap() checks)
const memoHTML = (key, sig, build, ref) => { const c = VIEW_CACHE[key]; if (c && c.sig === sig && c.ref === ref) return c.html; const html = build(); VIEW_CACHE[key] = {sig, html, ref}; return html; };
const flagSig = () => Object.keys(S.flags || {}).sort().join(',');
const logSig = () => { lastMap(); return LAST_K; };
function vDiagrams() {
  const have = new Set(typeof FIG === 'function' ? FIG.keys() : []);
  const titleOf = html => { const m = html.match(/<text class="title"[^>]*>([^<]*)</); return m ? m[1] : ''; };
  let out = '';
  COURSE.exams.forEach(e => {
  out += exGroup(e, memoHTML('dg' + e.id, '', () => {
  let toc = '', body = '';
  DIAGRAMS.forEach(([name, keys, ex], gi) => {
    if ((ex || 1) !== e.id) return;
    const ks = keys.filter(k => have.has(k)); if (!ks.length) return;
    const figs = ks.map(k => { const html = FIG(k); return {k, html, t: (DG_NAMES[k] || titleOf(html) || k).replace(/ ?·? step by step/, '')}; });
    toc += `<div class="card"><b>${esc(name)}</b><div class="row" style="flex-wrap:wrap;margin-top:6px">${figs.map(f => `<a class="chip" href="#dg-${f.k}" data-dg="${f.k}">${esc(f.t)}${/-anim$/.test(f.k) ? ' ▶' : ''}</a>`).join('')}</div></div>`;
    body += `<h3 id="dgg-${gi}">${esc(name)}</h3><div class="shiftgrid">${figs.map(f => `<div id="dg-${f.k}">${f.html}</div>`).join('')}</div>`;
  });
  return toc + body || '<div class="empty">This exam\'s diagrams are added as its lectures are written.</div>';
  }));
  });
  $('#view').innerHTML = `<h2>Diagrams</h2><p class="sub">Every process diagram in one place. ▶ marks a step-through figure: use Next, Play all or the step dots under it.</p>${narrCard()}${out}`;
  $('#view').querySelectorAll('.nvoice').forEach(fillVoices);
  $('#view').querySelectorAll('[data-dg]').forEach(a => a.onclick = e => { e.preventDefault(); const el = document.getElementById('dg-' + a.dataset.dg); if (el) scrollToEl(el); });
}
function vGraphs() {
  const pool = examPool();
  if (!GR.length) { $('#view').innerHTML = '<h2>Graphs</h2><div class="empty">No figures are registered.</div>'; return; }
  let h = `<h2>Graphs</h2><p class="sub">His own figures. Pick one and every question written on it is asked in turn; a wrong answer names the reading question you skipped, and the end of the pass shows which one you keep skipping.</p>`;
  const INTRO = {1: 'Dose–response curves from his PollEV polls, Jeopardy, the 9/30 review and Part 3: read the shift, the baseline and the maximum.',
    2: 'Tissue tracings from his Exam 2 polls and review: read which tissue and response are measured, which receptor the drug acts on, and whether the response is helped or blocked.'};
  COURSE.exams.forEach(e => {
  h += exGroup(e, memoHTML('gr' + e.id, logSig(), () => {
  const groups = {}; GR.filter(g => (g.exam || 1) === e.id).forEach(g => (groups[g.group || 'Other'] = groups[g.group || 'Other'] || []).push(g));
  let h = Object.keys(groups).length && INTRO[e.id] ? `<p class="sub">${INTRO[e.id]}</p>` : '';
  Object.entries(groups).forEach(([name, gs]) => {
    h += `<h3>${esc(e.id === 2 && name === 'Other' ? 'Tissue tracings' : name)}</h3><div class="ggrid">`;
    gs.forEach(g => {
      const qs = graphQs(g); const c = {unseen: 0, right: 0, wrong: 0}; qs.forEach(q => c[lastOutcome(q)]++);
      const tally = missTally(g).slice(0, 3);
      h += `<div class="card gcard"><div class="gthumb">${IMG[g.key] ? imgTag(g.key, g.title) : ''}</div>
        <div><b>${esc(g.title)}</b><div class="meta">${qs.length} questions · ${c.unseen} unseen · ${c.right} right · ${c.wrong} wrong${g.source ? ' · ' + esc(g.source) : ''}</div>
        ${g.asks && g.asks.length ? `<div class="meta">He asks: ${g.asks.map(esc).join(' · ')}</div>` : ''}
        ${tally.length ? `<div class="meta">You skip: ${tally.map(([m, n]) => esc(missOf(g, m)[0]) + ' ×' + n).join(', ')}</div>` : ''}
        <div class="row" style="margin-top:6px"><button class="btn" data-g="${g.key}" ${qs.length ? '' : 'disabled'}>Drill this figure</button>
        ${c.wrong ? `<button class="btn ghost" data-g="${g.key}" data-wrong="1">Redo wrong</button>` : ''}</div></div></div>`;
    });
    h += '</div>';
  });
  return h || '<div class="empty">His figures for this exam are added as they come up in class.</div>';
  }, S.log));
  });
  $('#view').innerHTML = h; fillImgs($('#view'));
  document.querySelectorAll('[data-g]').forEach(b => b.onclick = () => {
    const g = GR.find(x => x.key === b.dataset.g);
    if (b.dataset.wrong) { const list = graphQs(g).filter(q => lastOutcome(q) === 'wrong'); if (!list.length) return; startQuiz(shuffle(list), g.title + ' · wrong', 'pass', {graph: g.key}); }
    else startGraph(g.key);
  });
}

let MAPF = {show: 'all'};
function vMap() {
  const pool = QUESTIONS;
  const counts = {unseen: 0, right: 0, wrong: 0};
  const state = {}; pool.forEach(q => { state[q.id] = lastOutcome(q); counts[state[q.id]]++; });
  const mark = {unseen: '', right: '✓', wrong: '✗'};
  const tile = q => { const k = state[q.id], st = S.q[q.id]; return `<button class="qt ${k}${isFlagged(q.id) ? ' flagged' : ''}" data-q="${q.id}" title="${esc(q.stem)}"><span class="qm">${mark[k]}</span><span class="qid">${esc(q.id)}${isFlagged(q.id) ? ' ⚑' : ''}</span>${st && st.n ? `<span class="qn">${st.ok}/${st.n}</span>` : ''}<span class="qs">${esc(q.stem.slice(0, 64))}${q.stem.length > 64 ? '…' : ''}</span></button>`; };
  let h = `<h2>Question map</h2>
  <p class="sub">Every question in the bank, grouped by lecture and concept. The colour and mark show the most recent answer; a count shows correct answers over attempts. Click a tile to open that question.</p>
  <div class="card"><div class="row">
    ${[['all', `All ${pool.length}`], ['unseen', `Unseen ${counts.unseen}`], ['right', `Right ${counts.right}`], ['wrong', `Wrong ${counts.wrong}`], ['flagged', `⚑ Flagged ${pool.filter(q => isFlagged(q.id)).length}`]].map(([k, l]) => `<button type="button" class="chip ${MAPF.show === k ? 'on' : ''} lg-${k}" aria-pressed="${MAPF.show === k}" data-show="${k}">${l}</button>`).join('')}
  </div>
  <div class="row" style="margin-top:8px"><span class="qt unseen lg"><span class="qm"></span>unseen</span><span class="qt right lg"><span class="qm">✓</span>last answer right</span><span class="qt wrong lg"><span class="qm">✗</span>last answer wrong</span></div></div>`;
  COURSE.exams.forEach(e => {
  h += exGroup(e, memoHTML('map' + e.id, logSig() + '|' + flagSig() + '|' + MAPF.show, () => {
  let g = '';
  TOPICS.forEach(t => {
    const tq = pool.filter(q => q.topic === t.id && examOf(q) === e.id);
    if (!tq.length) return;
    const tc = {unseen: 0, right: 0, wrong: 0}; tq.forEach(q => tc[state[q.id]]++);
    const sel = tq.filter(q => MAPF.show === 'all' || (MAPF.show === 'flagged' ? isFlagged(q.id) : state[q.id] === MAPF.show));
    if (!sel.length) return;   // with a filter on, a topic with nothing to show is left out
    g += `<div class="card"><div class="topicrow"><span><b>${esc(t.name)}</b><small>${tq.length} questions · ${tc.unseen} unseen · ${tc.right} right · ${tc.wrong} wrong</small></span>
      <span class="row">${tq.some(q => isFlagged(q.id)) ? `<button class="btn ghost" data-drill="${t.id}" data-ex="${e.id}" data-what="flagged">Drill flagged</button>` : ''}${tc.wrong ? `<button class="btn ghost" data-drill="${t.id}" data-ex="${e.id}" data-what="wrong">Redo wrong</button>` : ''}${tc.unseen ? `<button class="btn ghost" data-drill="${t.id}" data-ex="${e.id}" data-what="unseen">Drill unseen</button>` : ''}</span></div>`;
    const subs = (t.subs || []).slice();
    const known = new Set(subs.map(x => x.id));
    tq.forEach(q => { if (q.sub && !known.has(q.sub)) { known.add(q.sub); subs.push({id: q.sub, name: q.sub}); } });
    if (tq.some(q => !q.sub)) subs.push({id: null, name: 'Other'});
    subs.forEach(sb => {
      const sq = sel.filter(q => (q.sub || null) === sb.id);
      if (!sq.length) return;
      g += `<h4 class="mapsub">${esc(sb.name)}</h4><div class="qgrid">${sq.map(tile).join('')}</div>`;
    });
    g += '</div>';
  });
  return g || `<div class="empty">${MAPF.show === 'all' ? 'Questions for this exam are added as its lectures are written.' : 'No question of this exam matches the filter.'}</div>`;
  }, S.log));
  });
  $('#view').innerHTML = h;
  document.querySelectorAll('[data-show]').forEach(c => c.onclick = () => { MAPF.show = c.dataset.show; vMap(); });
  document.querySelectorAll('.qt[data-q]').forEach(b => b.onclick = () => startQuiz([byId[b.dataset.q]], 'From the question map', 'pass', {back: true}));
  document.querySelectorAll('[data-drill]').forEach(b => b.onclick = () => {
    const list = pool.filter(q => q.topic === b.dataset.drill && examOf(q) === +b.dataset.ex && (b.dataset.what === 'flagged' ? isFlagged(q.id) : state[q.id] === b.dataset.what));
    startQuiz(shuffle(list), `${(TOPIC[b.dataset.drill] || {}).name}: ${b.dataset.what}`, 'pass');
  });
}

function vData() {
  const pool = examPool();
  let h = `<h2>Progress</h2>
  <div class="card"><div class="row"><span>Profile:</span><input type="text" id="prof" value="${esc(PROFILE)}" style="width:12em"><button class="btn ghost" id="setprof">Switch</button></div>
  <p class="sub" style="margin-top:8px">Progress is kept in this browser under the profile name. Two people on one device keep separate histories.</p></div>
  <div class="card"><div class="row"><span>Pace:</span><select id="pace">${Object.entries(PACES).map(([k, p]) => `<option value="${k}" ${k === (S.pace || COURSE.paceDefault) ? 'selected' : ''}>${esc(p.label)}</option>`).join('')}</select></div>
  <p class="sub" style="margin-top:8px">The pace and the confidence buttons set how soon a question returns: a wrong answer or "I guessed" brings it back at once, "Not sure" holds it at its current interval, "Knew it" lengthens the interval.</p></div>
  <div class="card"><div class="row"><span>Break video:</span><label class="row" style="gap:6px"><input type="checkbox" id="motivon" ${motivOn() ? 'checked' : ''}>Suggest after a finished practice exam and every 30 minutes of study</label><button class="btn ghost" id="motivnow">Watch now</button></div></div>
  <div class="card">${COURSE.exams.map(e => { const ep = QUESTIONS.filter(q => examOf(q) === e.id), ea = acc(ep); return `<p style="margin:0 0 6px"><b>${esc(e.name)}:</b> ${seenCount(ep)} of ${ep.length} seen · ${ea.n} answers · accuracy ${ea.pct == null ? '—' : ea.pct + '%'}</p>`; }).join('')}
  <div class="row"><button class="btn ghost" id="exp">Export progress (JSON)</button>
  <label class="btn ghost">Import progress<input type="file" id="imp" accept=".json" style="display:none"></label>
  <button class="btn ghost" id="expmiss">Export missed questions (CSV)</button>
  <button class="btn ghost" id="reset">Reset this profile</button></div></div>
  <h3>Last updated</h3>
  <div class="card"><p style="margin:0 0 6px"><b>${esc(fmtDate(BUILD.built))}</b>${BUILD.commit ? ` · build ${esc(BUILD.commit)}` : ''} · ${QUESTIONS.length} questions · ${QUESTIONS.filter(q => q.reading).length} with textbook notes</p>
  ${(BUILD.changelog || []).map(c => `<h4 style="margin:10px 0 4px">${esc(fmtDay(c.date))}</h4><ul style="margin:0;padding-left:20px">${c.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`).join('')}</div>
  <p class="sub">${QUESTIONS.length} questions in the bank. Built from the course decks, lecture transcripts and the drug lists; each question cites its deck and slide. Slide numbers marked ~ were counted from the deck text and may be off by one or two.</p>`;
  $('#view').innerHTML = h;
  $('#setprof').onclick = () => { const v = $('#prof').value.trim(); if (!v) return; endExam(true); PROFILE = v; store.set(COURSE.ns + ':profile', v); S = loadState(); Q = null; EX = loadExam(); GQ = null; vData(); };
  $('#pace').onchange = e => { S.pace = e.target.value; save(); };
  $('#motivon').onchange = e => { const m = motivGet(); m.off = e.target.checked ? 0 : 1; motivSet(m); };
  $('#motivnow').onclick = () => motivPlay();
  $('#exp').onclick = () => download(`${COURSE.ns}-${PROFILE}.json`, JSON.stringify(S), 'application/json');
  $('#imp').onchange = e => { const f = e.target.files[0]; if (!f) return; f.text().then(t => { try { const o = JSON.parse(t); if (!o.q) throw 0; S = normalize(o); Q = null; endExam(); save(); vData(); } catch (err) { alert('That file is not a progress export.'); } }); };
  $('#expmiss').onclick = () => {
    const rows = [['id', 'topic', 'skill', 'answers', 'correct', 'stem', 'answer', 'cite']];
    pool.filter(q => S.q[q.id] && S.q[q.id].n > S.q[q.id].ok).forEach(q => rows.push([q.id, (TOPIC[q.topic] || {}).name, q.skill, S.q[q.id].n, S.q[q.id].ok, q.stem,
      (q.options || []).filter(o => o.correct).map(o => o.t).join(' | '), q.cite]));
    download(`${COURSE.ns}-missed.csv`, rows.map(r => r.map(c => '"' + String(c == null ? '' : c).replace(/"/g, '""') + '"').join(',')).join('\n'), 'text/csv');
  };
  $('#reset').onclick = () => { if (confirm('Erase all progress for this profile?')) { endExam(); S = {q: {}, log: [], pace: COURSE.paceDefault, exams: [], flags: {}, layout: S.layout || 'one'}; save(); vData(); } };   // an open exam paper is erased too
}

document.addEventListener('keydown', e => {
  if (ANTI || MOTIV_VIEW) return;   // the diagram panel or the break video is open: no shortcut may act on the page underneath
  // typing in a field is never a shortcut; on a focused button or link, Enter and Space keep their own meaning
  const tg = e.target && e.target.tagName || '';
  if (/^(INPUT|SELECT|TEXTAREA)$/.test(tg) || (e.target && e.target.isContentEditable)) return;
  if (/^(BUTTON|A|SUMMARY)$/.test(tg) && (e.key === 'Enter' || e.key === ' ')) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key;
  if (CUR === 'quiz' && Q && Q.cur && !Q.finished && S.layout !== 'all') {
    const match = Q.cur.type === 'match' || Q.cur.type === 'fill';   // matching and fill-in have no lettered options; Enter still checks and continues
    let n = -1;
    if (!match) { if (/^[1-9]$/.test(k)) n = +k - 1; else if (/^[a-jA-J]$/.test(k)) n = LETTERS.indexOf(k.toUpperCase()); }
    if (n >= 0 && !Q.answered) { const oi = Q.order[n]; if (oi != null) { pick(oi); e.preventDefault(); } return; }
    // after a right answer: 1 Knew it, 2 Not sure, 3 I guessed
    if (Q.answered && Q.ok && /^[1-3]$/.test(k)) { finish(['sure', 'unsure', 'guess'][+k - 1]); e.preventDefault(); return; }
    if (k === 'Enter') {
      e.preventDefault();
      if (!Q.answered) { if (Q.cur.multi || match) check(); }
      else finish(Q.ok ? 'sure' : 'wrong');
    }
  } else if (CUR === 'exam' && EX && !EX.done && (S.layout !== 'all' || EX.noBack)) {
    const q = byId[EX.qs[EX.i]], ord = EX.orders[EX.i];
    let n = -1;
    if (/^[1-9]$/.test(k)) n = +k - 1; else if (/^[a-jA-J]$/.test(k)) n = LETTERS.indexOf(k.toUpperCase());
    if (n >= 0 && ord[n] != null) { const b = document.querySelector(`[data-o="${ord[n]}"]`); if (b) b.click(); e.preventDefault(); return; }
    if (k === 'ArrowRight' || k === 'Enter') { if (EX.i < EX.qs.length - 1 && exLeaveOk()) { EX.i++; renderExam(); } e.preventDefault(); }
    if (k === 'ArrowLeft') { if (EX.i > 0 && !EX.noBack) { EX.i--; renderExam(); } e.preventDefault(); }
  }
});
/* Keep the learner's place across a reload: the view, the scroll position and, in a quiz, the set and the
   question on screen are saved for this tab when the page is left, and reopened at start-up. */
const RESUME_KEY = () => COURSE.ns + ':resume';
function saveResume() {
  try {
    const r = {v: CUR, y: Math.round(window.scrollY), t: Date.now()};
    if (CUR === 'quiz' && Q && Q.cur && !Q.finished && (Q.mode === 'pass' || Q.mode === 'sr'))
      r.q = {ids: Q.list.map(q => q.id), label: Q.label, mode: Q.mode, i: Q.i, done: Q.done, right: Q.right, doneIds: [...Q.doneIds], cur: Q.cur.id,
        ans: Q.answered ? {ok: !!Q.ok, picked: Q.picked instanceof Set ? [...Q.picked] : Q.picked, mpick: Q.mpick, fill: Q.fill, order: Q.order, rightOrder: Q.rightOrder, box0: Q.box0} : null};
    sessionStorage.setItem(RESUME_KEY(), JSON.stringify(r));
  } catch (e) {}
}
window.addEventListener('pagehide', saveResume);
function resumePlace() {
  let r = null;
  try { r = JSON.parse(sessionStorage.getItem(RESUME_KEY()) || 'null'); sessionStorage.removeItem(RESUME_KEY()); } catch (e) {}
  if (!isObj(r) || !VIEWFN[r.v] || !(Date.now() - r.t < 6 * 3600e3)) return false;
  if (r.v === 'exam') { if (!(EX && EX.done)) return false; go('exam', true); setTimeout(() => window.scrollTo(0, r.y || 0), 60); return true; }
  if (r.v === 'quiz') {
    const x = r.q, list = isObj(x) && Array.isArray(x.ids) ? x.ids.map(id => byId[id]).filter(Boolean) : [], q = isObj(x) && byId[x.cur];
    if (!list.length || !q) return false;
    Q = {list, label: String(x.label || ''), mode: x.mode, i: +x.i || 0, done: +x.done || 0, right: +x.right || 0, retest: [], doneIds: new Set((x.doneIds || []).filter(id => byId[id])), st: {}, graph: null};
    CUR = 'quiz'; nav(); leaveView();
    Q.cur = q; Q.order = q.type === 'match' || q.type === 'fill' ? null : optOrder(q); Q.fill = {text: '', bank: false, rev: false};
    Q.picked = q.multi ? new Set() : null; Q.mpick = null; Q.answered = false; Q.t0 = Date.now();
    if (q.type === 'match') Q.rightOrder = shuffle(q.right.slice());
    const a = x.ans;   // an answered card comes back answered: its verdict, the whys and the teach stay on screen
    if (isObj(a) && Q.doneIds.has(q.id)) {
      if (Array.isArray(a.order) && a.order.length === (q.options || []).length) Q.order = a.order;
      if (q.type === 'match' && Array.isArray(a.rightOrder) && a.rightOrder.length === q.right.length) Q.rightOrder = a.rightOrder;
      Q.picked = q.multi ? new Set(Array.isArray(a.picked) ? a.picked : []) : (q.type === 'match' || q.type === 'fill' ? null : a.picked);
      Q.mpick = isObj(a.mpick) ? a.mpick : null; if (isObj(a.fill)) Q.fill = a.fill;
      Q.answered = true; Q.ok = !!a.ok; Q.box0 = a.box0; Q.rec = q.id;
      Q.st[q.id] = {order: Q.order, rightOrder: Q.rightOrder || null, picked: Q.picked, mpick: Q.mpick, fill: Q.fill, answered: true, ok: Q.ok, conf: Q.ok ? 'sure' : 'wrong', box0: Q.box0, t0: Q.t0};
    }
    renderQ();
    return true;
  }
  go(r.v); setTimeout(() => window.scrollTo(0, r.y || 0), 60);
  return true;
}
/* Break video: a suggestion card offers a short video after a finished practice exam and after every 30 minutes
   of active study (the tab shown and a click, key or scroll in the last two minutes). The video file loads only
   when Watch is pressed. Progress → Break video turns the suggestions off. */
const MOTIV_KEY = COURSE.ns + ':motiv', MOTIV_SECS = 1800, MOTIV_TICK = 15;
const MOTIV_SRC = () => (/\/exam1-drill\//.test(location.pathname) ? '' : 'exam1-drill/') + 'media/break.mp4';
let MOTIV_ACT = Date.now(), MOTIV_VIEW = null;
const motivGet = () => storeObj(MOTIV_KEY), motivSet = o => store.set(MOTIV_KEY, JSON.stringify(o));
const motivOn = () => motivGet().off !== 1;
['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(t => window.addEventListener(t, () => { MOTIV_ACT = Date.now(); }, {passive: true, capture: true}));
function motivTick() {
  if (document.visibilityState !== 'visible' || Date.now() - MOTIV_ACT > 120000) return;
  const m = motivGet(); m.act = (+m.act || 0) + MOTIV_TICK;
  // the suggestion waits while a paper is being written, the diagram panel is open, or the video is playing
  if (m.act >= MOTIV_SECS && motivOn() && !(CUR === 'exam' && EX && !EX.done) && !ANTI && !MOTIV_VIEW && !document.getElementById('motivcard')) { m.act = 0; motivSet(m); motivSuggest('time'); return; }
  motivSet(m);
}
setInterval(motivTick, MOTIV_TICK * 1000);
function motivSuggest(why) {
  if (!motivOn() || !/^https?:$/.test(location.protocol) || document.getElementById('motivcard')) return;
  const c = document.createElement('div'); c.id = 'motivcard'; c.setAttribute('role', 'status');
  c.innerHTML = `<b>${why === 'exam' ? 'Practice exam finished.' : '30 minutes of studying.'}</b><span>A break video is ready (3 min 13 s).</span>
    <span class="row" style="gap:6px"><button type="button" class="btn" id="motivgo">Watch</button><button type="button" class="btn ghost" id="motivlater">Not now</button><button type="button" class="btn ghost" id="motivoff">Stop suggesting</button></span>`;
  document.body.appendChild(c);
  $('#motivgo').onclick = () => { c.remove(); motivPlay(); };
  $('#motivlater').onclick = () => c.remove();
  $('#motivoff').onclick = () => { const m = motivGet(); m.off = 1; motivSet(m); c.remove(); };
}
function motivPlay() {
  if (MOTIV_VIEW) return;
  [typeof sayStop === 'function' && sayStop, typeof qSayStop === 'function' && qSayStop, typeof rdStop === 'function' && rdStop,
   typeof playStop === 'function' && playStop, typeof scenesStop === 'function' && scenesStop].forEach(f => { if (f) try { f(); } catch (e) {} });
  const d = document.createElement('div'); d.className = 'antiview'; d.id = 'motivview';
  d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true'); d.setAttribute('aria-label', 'Break video');
  d.innerHTML = `<div class="antibox"><div class="antihead"><b>Break video</b><button type="button" class="chip" id="motivclose" aria-label="Close video" style="margin-left:auto">✕ Close</button></div>
    <video id="motivvid" controls autoplay playsinline preload="auto" src="${MOTIV_SRC()}" style="display:block;width:100%;max-height:75vh;background:#000;border-radius:6px"></video>
    <p class="sub" id="motivmsg" style="margin:6px 0 0">The questions stay where you left them.</p></div>`;
  document.body.appendChild(d); document.body.classList.add('antiopen');
  const inert = [...document.body.children].filter(x => x !== d && !x.inert); inert.forEach(x => { x.inert = true; });
  const opener = document.activeElement;
  const close = () => { const v = $('#motivvid'); if (v) { v.pause(); v.removeAttribute('src'); v.load(); }
    inert.forEach(x => { x.inert = false; }); d.remove(); document.body.classList.remove('antiopen'); document.removeEventListener('keydown', esc_, true);
    MOTIV_VIEW = null; if (opener && opener.focus) try { opener.focus(); } catch (e) {} };
  const esc_ = e => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
  document.addEventListener('keydown', esc_, true);
  $('#motivvid').onerror = () => { $('#motivmsg').textContent = 'The video did not load here. It plays on the class site: lglouis3-create.github.io/Intro-Pharmacology-'; };
  $('#motivclose').onclick = close; d.onclick = e => { if (e.target === d) close(); };
  MOTIV_VIEW = {close}; $('#motivclose').focus();
}
/* Update notice: the page compares its build with version.json on the site (soon after opening, every ten
   minutes and when the tab is shown again); when the site has a newer build, a bar offers a refresh, and the
   refresh reopens the same place. */
const VER_URL = () => (/\/exam1-drill\//.test(location.pathname) ? '' : 'exam1-drill/') + 'version.json';
let VER_T = 0, VER_HIDE = '';
function verCheck() {
  if (!/^https?:$/.test(location.protocol) || !BUILD.id || Date.now() - VER_T < 60000) return;
  VER_T = Date.now();
  fetch(VER_URL() + '?t=' + Date.now(), {cache: 'no-store'}).then(r => r.ok ? r.json() : null).then(v => {
    if (!isObj(v) || typeof v.id !== 'string' || !(v.id > BUILD.id) || v.id === VER_HIDE || document.getElementById('updbar')) return;
    const bar = document.createElement('div'); bar.id = 'updbar'; bar.setAttribute('role', 'status');
    bar.innerHTML = '<span>Updated material is available. Refresh when you are able; you will come back to this page.</span><button type="button" class="btn" id="updgo">Refresh</button><button type="button" class="btn ghost" id="updx" aria-label="Dismiss">✕</button>';
    const hd = document.querySelector('header'); hd.insertBefore(bar, hd.firstChild); hdrVar();   // part of the sticky header, so the title and tabs stay visible
    $('#updgo').onclick = () => { saveResume(); location.reload(); };
    $('#updx').onclick = () => { VER_HIDE = v.id; bar.remove(); hdrVar(); };
  }).catch(() => {});
}
setTimeout(verCheck, 5000); setInterval(verCheck, 600000);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') verCheck(); });
document.title = COURSE.title;
try { history.scrollRestoration = 'manual'; } catch (e) {}
$('#apptitle').innerHTML = `${esc(COURSE.short)} <span class="stamp">updated ${esc(fmtDate(BUILD.built))}</span>`;
// a paper saved mid-exam reopens on the exam page, clock running, so it is not forgotten in the background
nav(); if (EX && !EX.done) go('exam'); else if (!resumePlace()) go('topics');
try { history.replaceState({drill: 1, v: CUR}, ''); } catch (e) {}
NAV_READY = true;
