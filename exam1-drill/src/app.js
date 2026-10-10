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
  // true when the browser kept it; false when storage is full or blocked (it is then kept for this visit only)
  set(k, v) { MEM[k] = v; try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
};
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
  Object.keys(s.q).forEach(k => { const v = s.q[k]; if (!isObj(v)) { delete s.q[k]; return; } ['n', 'ok', 'box', 'due', 'last'].forEach(f => { v[f] = Number.isFinite(+v[f]) ? +v[f] : 0; }); });
  s.log = Array.isArray(s.log) ? s.log.filter(e => isObj(e) && typeof e.id === 'string') : [];
  s.pace = ['cram', 'weekly', 'semester'].includes(s.pace) ? s.pace : COURSE.paceDefault;
  s.exams = Array.isArray(s.exams) ? s.exams.filter(e => isObj(e) && Number.isFinite(+e.n) && +e.n > 0 && Number.isFinite(+e.score)).map(e => Object.assign(e, {n: +e.n, score: +e.score, t: +e.t || 0})) : [];
  s.flags = isObj(s.flags) ? s.flags : {};
  s.layout = s.layout === 'all' ? 'all' : 'one';
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
    .map(([k, l]) => `<button type="button" data-v="${k}" class="${k === CUR ? 'on' : ''}"${k === CUR ? ' aria-current="page"' : ''}>${l}</button>`).join('') + themeSelect();
  $('#nav').querySelectorAll('button').forEach(b => b.onclick = e => {
    const v = b.dataset.v;
    if (!go(v)) return;           // the learner chose to stay in the exam: keep the way back too
    RET.length = 0; backBtn();
    // the nav is redrawn, so a keyboard user would lose their place: put focus back on this tab
    if (e.detail === 0) { const nb = $('#nav').querySelector(`[data-v="${v}"]`); if (nb) nb.focus(); }
  });
  $('#theme').onchange = e => applyTheme(e.target.value);
  // on a phone the tabs scroll sideways in one row: keep the open one in sight
  const on = $('#nav .on'), nv = $('#nav'); if (on && nv.scrollWidth > nv.clientWidth) nv.scrollLeft = on.offsetLeft - nv.offsetLeft - 40;
  hdrVar();
}
/* The header's height, for things that stick under it (the exam clock on the all-on-one-page paper). */
const hdrVar = () => { const hd = document.querySelector('header'); if (hd) document.documentElement.style.setProperty('--hdr', hd.getBoundingClientRect().height + 'px'); };
window.addEventListener('resize', hdrVar);
const clearView = () => { const v = $('#view'); v.onclick = null; v.onchange = null; };
/* Leaving a page: back to the top, and the floating buttons and scroll watcher of the old page go. */
function leaveView() {
  window.scrollTo(0, 0); clearView();
  if (typeof xBack === 'function') xBack(null);
  const tb = document.getElementById('tback'); if (tb) tb.remove();
  if (TIO) { TIO.disconnect(); TIO = null; }
}
/* Open a view. Returns false when the learner stays in a running exam. `back` is set by the
   "Back to …" button: the exam then reopens on its result page, not on a new paper. */
function go(v, back) {
  if (CUR === 'exam' && EX && !EX.done && v !== 'exam' && !confirm('Leave the exam in progress? It will be kept until you return.')) return false;
  CUR = v; nav(); leaveView();
  (back && v === 'exam' && EX && EX.done ? examResult : VIEWFN[v])();
  return true;
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
/* Exam 2: keyword rows first (tested against concept, sub and tags), then the lecture's guide. */
const G2 = (n, t) => ['guide', 'guide2-' + n, 'Guide: ' + t];
const LINKS2 = [
  [/tracing|compound|drug-?x|skm-|ne-drug-b|epi-two|gi-tracing/, [G2(8, 'reading his tracings')]],
  [/baroref|barorecept|stand-?up|orthostat/, [G2(1, 'the autonomic layout'), ['diagrams', 'dg-e2-baroreflex-anim', 'Diagram: baroreceptor reflex'], ['ref', 'ref2-2', 'Reference: organ by organ, PNS vs SNS']]],
  [/who-runs|\borgan\b|dual-?innerv|predominant|lungs-pns|receptor-map|g-?protein-table/, [G2(1, 'the autonomic layout'), ['ref', 'ref2-2', 'Reference: organ by organ, PNS vs SNS'], ['ref', 'ref2-1', 'Reference: receptors and G proteins']]],
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
function linksFor(q) {
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
const explainHTML = q => { const l = linksFor(q), c = ladderChip(q); return l.length || c ? `<div class="row explain"><span class="meta" style="margin:0">Explain more:</span>${l.map(([v, a, t]) => `<button type="button" class="chip" data-jump="${v}:${a}">${esc(t)}</button>`).join('')}${c}</div>` : ''; };
// ignored only on the exam's own pages; with an exam kept in the background, a quiz may still climb
document.addEventListener('click', e => { const b = e.target.closest('[data-climb]'); if (!b) return; if (CUR === 'exam' && EX && !EX.done) return; climbLadder(b.dataset.climb, +b.dataset.upto || 0); });
function jump(view, anchor) {
  RET.push({view: CUR, y: window.scrollY});
  if (!go(view)) { RET.pop(); return; }
  const t = document.getElementById(anchor);
  if (t) { openTo(t); t.scrollIntoView({block: 'start'}); window.scrollBy(0, -(document.querySelector('header') ? document.querySelector('header').getBoundingClientRect().height + 8 : 70)); }
  backBtn();
}
function backBtn() {
  let b = document.getElementById('backbtn');
  if (!RET.length) { if (b) b.remove(); return; }
  if (!b) { b = document.createElement('button'); b.id = 'backbtn'; b.type = 'button'; b.className = 'btn'; document.body.appendChild(b); b.onclick = goBack; }
  b.textContent = backLabel();
}
const backLabel = () => '← Back to ' + ({quiz: 'the question', exam: 'the exam', graphs: 'the figures', map: 'the map', terms: 'the terms', weak: 'Weak spots', tell: 'Tell apart', ref: 'the reference', guide: 'the guide', diagrams: 'the diagrams'}[(RET[RET.length - 1] || {}).view] || 'where you were');
function goBack() { const r = RET.pop(); if (!r) return; backBtn(); go(r.view, true); window.scrollTo(0, r.y); }
document.addEventListener('click', e => { const j = e.target.closest('[data-jump]'); if (j) { const [v, a] = j.dataset.jump.split(':'); jump(v, a); } });
const VIEWFN = {topics: vTopics, quiz: vQuiz, terms: vTerms, weak: vWeak, exam: vExam, map: vMap, graphs: vGraphs, diagrams: vDiagrams, ref: vRef, tell: vTell, guide: vGuide, data: vData};
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
    if (EX && !EX.done) document.querySelectorAll('.grid [data-j]').forEach(b => { if (EX.qs[+b.dataset.j] === f.dataset.flag) b.classList.toggle('flag', isFlagged(f.dataset.flag)); });
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
/* The exam being studied: the learner's choice (stored per browser), else the course default. */
const EXAM_KEY = COURSE.ns + ':exam';
const activeId = () => { const v = +store.get(EXAM_KEY); return COURSE.exams.some(e => e.id === v) ? v : COURSE.activeExam; };
const active = () => COURSE.exams.find(e => e.id === activeId()) || COURSE.exams[0];
const examSwitch = () => COURSE.exams.length < 2 ? '' : `<span class="row exsw" style="gap:4px"><span class="meta" style="margin:0">Studying for:</span>${COURSE.exams.map(e => `<button type="button" class="chip ${e.id === activeId() ? 'on' : ''}" data-exsw="${e.id}" aria-pressed="${e.id === activeId()}">${esc(e.name)}</button>`).join('')}</span>`;
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
const exGroup = (e, body, open) => `<details class="exgroup" data-ex="${e.id}" ${(open == null ? e.id === activeId() : open) ? 'open' : ''}><summary>${exTitle(e)}</summary><div class="exbody">${body}</div></details>`;
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
  return `<div class="card news" id="news"><div class="row" style="justify-content:space-between"><b>What’s new</b><span class="meta" style="margin:0">${esc(fmtDay(fresh[0].date.replace(/ \(.*\)$/, '')))}</span></div>
    <ul>${show.map(t => `<li>${esc(t)}</li>`).join('')}</ul>${items.length > show.length ? `<div class="meta" style="margin:0 0 6px">+ ${items.length - show.length} more</div>` : ''}
    <div class="row"><button class="btn" id="newsok">Got it</button><button class="btn ghost" id="newsall">All changes</button></div></div>`;
}
/* ---------- Topics ---------- */
let FILT = {skill: 'all'};
function vTopics() {
  // the skill filter applies to the counts, both study buttons and the topic list; tiers and flags use the whole bank
  const ex = active(), pool0 = examPool();
  if (FILT.skill !== 'all' && !pool0.some(q => q.skill === FILT.skill)) FILT.skill = 'all';   // a skill the other exam has, this one not
  const pool = FILT.skill === 'all' ? pool0 : pool0.filter(q => q.skill === FILT.skill);
  const seen = seenCount(pool), a = acc(pool);
  let h = `<h2>${esc(COURSE.short)}</h2>
  <div class="row" style="margin:-4px 0 8px">${examSwitch()}</div>
  <p class="sub">${esc(ex.name)} · ${esc(ex.date)} · ${ex.minutes ? ex.minutes + ' minutes allotted' : ''}${ex.questions ? ' · ' + ex.questions + ' questions' : ''}. ${esc(ex.blurb)} <b>${esc(examCountdown())}</b></p>
  <p class="sub stamp">Last updated ${esc(fmtDate(BUILD.built))}${BUILD.changelog && BUILD.changelog.length ? ' · <a href="#" id="whatsnew">All changes</a>' : ''}</p>${newsCard()}
  <div class="card"><div class="row" style="justify-content:space-between">
   <div><b>${pool.length}</b> ${FILT.skill === 'all' ? '' : esc((SKILL[FILT.skill] || {}).short || '') + ' '}questions in the bank · <b>${seen}</b> seen · accuracy <b>${a.pct == null ? '—' : a.pct + '%'}</b></div>
   <div class="row"><button class="btn" id="due">Study what is due</button><button class="btn ghost" id="all">One pass, all questions</button></div></div>
   <div class="row" style="margin-top:10px;justify-content:space-between"><span class="row"><span class="meta" style="margin:0">Answer:</span>${layoutToggle()}</span>
   <span class="row"><span class="meta" style="margin:0">⚑ Flagged: <b>${flaggedPool().length}</b></span>${flaggedPool().length ? `<button class="btn ghost" id="drillflag">Drill flagged</button><button class="btn ghost" id="clearflag">Clear flags</button>` : ''}</span></div>
   <div class="row" style="margin-top:10px"><span class="meta" style="margin:0">Skill:</span>
   ${['all'].concat(COURSE.skills.map(s => s.id)).filter(k => k === 'all' || pool0.some(q => q.skill === k))
     .map(k => `<button type="button" class="chip ${FILT.skill === k ? 'on' : ''}" aria-pressed="${FILT.skill === k}" data-sk="${k}">${k === 'all' ? 'All' : esc(SKILL[k].short)}</button>`).join('')}</div></div>`;
  // one collapsible group per exam: its topics, each with its sections
  const topicCard = (t, tq) => {
    const ta = acc(tq), tseen = seenCount(tq);
    let c = `<div class="card"><div class="topicrow"><span><b>${esc(t.name)}</b><small>${esc(fmtCite(t.cite))}</small>
      <span class="bar-meter seen"><span style="width:${Math.round(100 * tseen / tq.length)}%"></span></span></span>
      <span class="row"><small>${tseen}/${tq.length} seen · ${ta.pct == null ? '—' : ta.pct + '%'}</small>
      <button class="btn ghost" data-topic="${t.id}" data-ex="${examOf(tq[0])}">Drill</button></span></div>`;
    const subs = (t.subs || []).filter(sb => tq.some(q => q.sub === sb.id));
    if (subs.length > 1) subs.forEach(sb => {
      const sq = tq.filter(q => q.sub === sb.id), sa = acc(sq), sseen = seenCount(sq);
      c += `<div class="topicrow subrow"><span>${esc(sb.name)}<small>${sq.length} questions${sb.cite && sb.cite !== t.cite ? ' · ' + esc(fmtCite(sb.cite)) : ''}</small>
        <span class="bar-meter seen"><span style="width:${Math.round(100 * sseen / sq.length)}%"></span></span></span>
        <span class="row"><small>${sseen}/${sq.length} seen · ${sa.pct == null ? '—' : sa.pct + '%'}</small><button class="btn ghost" data-topic="${t.id}" data-sub="${sb.id}" data-ex="${examOf(sq[0])}">Drill</button></span></div>`;
    });
    return c + '</div>';
  };
  const tiered = pool0.filter(q => q.level && !q.lowYield);
  if (tiered.length) {
    const ladders = [...new Set(tiered.filter(q => q.ladder).map(q => q.ladder))].filter(k => ladderQs(k).length > 1);
    h += `<div class="card"><b>Tiers, as he described them</b><p class="sub" style="margin:4px 0 8px">Tier 1: predict what a receptor does. Tier 2: two drugs together, the good and bad interactions. Tier 3: reverse a drug's effect. "A tier 3 question would require knowledge of tier 2 and 1."</p>
      <div class="row">${[1, 2, 3].map(t => { const tq = tiered.filter(q => q.level === t), ta = acc(tq); return tq.length ? `<button class="btn ghost" data-tier="${t}">Tier ${t} · ${tq.length} questions${ta.pct == null ? '' : ' · ' + ta.pct + '%'}</button>` : ''; }).join('')}
      ${ladders.length ? `<button class="btn" id="ladders">Climb the ${ladders.length} ladders (Tier 1 → 3)</button>` : ''}</div></div>`;
  }
  COURSE.exams.forEach(e => {
    const eq = QUESTIONS.filter(q => examOf(q) === e.id && (FILT.skill === 'all' || q.skill === FILT.skill));
    let body = '';
    TOPICS.forEach(t => { const tq = eq.filter(q => q.topic === t.id); if (tq.length) body += topicCard(t, tq); });
    if (!body) body = `<div class="empty">${e.id === activeId() ? 'Questions for this exam are added as its lectures are written.' : 'No questions match this filter.'}</div>`;
    h += exGroup(e, body);
  });
  $('#view').innerHTML = h;
  $('#due').onclick = () => startQuiz(pool, 'Due and unseen', 'sr');
  const wn = $('#whatsnew'); if (wn) wn.onclick = e => { e.preventDefault(); go('data'); };
  const nok = $('#newsok'); if (nok) nok.onclick = () => { store.set(NEWS_KEY, newsId(BUILD.changelog[0])); const c = $('#news'); if (c) c.remove(); };
  const nall = $('#newsall'); if (nall) nall.onclick = () => go('data');
  $('#all').onclick = () => startQuiz(shuffle(pool), 'All questions, one pass', 'pass');
  document.querySelectorAll('[data-tier]').forEach(b => b.onclick = () => startQuiz(pool0.filter(q => q.level === +b.dataset.tier && !q.lowYield), 'Tier ' + b.dataset.tier, 'sr'));
  const ld = $('#ladders'); if (ld) ld.onclick = () => {
    // every ladder in turn, each from Tier 1 up
    const keys = shuffle([...new Set(pool0.filter(q => q.ladder).map(q => q.ladder))].filter(k => ladderQs(k).length > 1));
    startQuiz(keys.flatMap(ladderQs), 'Ladders, Tier 1 → 3', 'pass');
  };
  const df = $('#drillflag'); if (df) df.onclick = () => startQuiz(flaggedPool(), 'Flagged questions', 'pass');
  const cf = $('#clearflag'); if (cf) cf.onclick = () => { if (confirm('Remove every flag?')) { S.flags = {}; save(); vTopics(); } };
  document.querySelectorAll('[data-sk]').forEach(c => c.onclick = () => { FILT.skill = c.dataset.sk; vTopics(); });
  document.querySelectorAll('[data-topic]').forEach(b => b.onclick = () => {
    const list = QUESTIONS.filter(q => q.topic === b.dataset.topic && examOf(q) === +b.dataset.ex && (!b.dataset.sub || q.sub === b.dataset.sub) && (FILT.skill === 'all' || q.skill === FILT.skill));
    startQuiz(list, (TOPIC[b.dataset.topic] || {}).name, 'sr');
  });
}

/* ---------- Quiz ---------- */
let Q = null;
function startQuiz(list, label, mode, opts = {}) {
  if (!list.length) { alert('No questions match that selection.'); return; }
  Q = {list: list.slice(), label, mode, i: 0, done: 0, right: 0, retest: [], doneIds: new Set(), st: {}, graph: opts.graph || null};
  // opts.back: opened from a page the learner will want to return to (a map tile, a Tell apart row)
  const from = opts.back && CUR !== 'quiz' ? {view: CUR, y: window.scrollY} : null;
  RET.length = 0; if (from) RET.push(from); backBtn();
  // opened from deep in a long page (Tell apart, the map): start at the top, without the old page's floating buttons
  CUR = 'quiz'; nav(); leaveView(); nextQ();
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
  // mpick too: a matching question must not start with the last one's choices
  Q.picked = q.multi ? new Set() : null; Q.mpick = null; Q.answered = false; Q.t0 = Date.now();
  if (q.type === 'match') Q.rightOrder = shuffle(q.right.slice());
  window.scrollTo(0, 0);   // the next question starts at its stem, not where the last explanation ended
  renderQ();
}
function quizDone() {
  Q.finished = true; Q.answered = false; clearView();
  if (Q.graph) return graphDone();
  $('#view').innerHTML = `<div class="card"><h2>Pass finished</h2><p>${Q.right} of ${Q.done} correct.</p>
    <div class="row">${RET.length ? `<button class="btn" id="qback">${esc(backLabel())}</button>` : ''}<button class="btn${RET.length ? ' ghost' : ''}" id="again">Study what is due</button><button class="btn ghost" id="totopics">Topics</button></div></div>`;
  const qb = $('#qback'); if (qb) qb.onclick = goBack;
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
  return `${esc(t ? t.name : q.topic)}${sk ? ' · ' + esc(sk.short) : ''}${q.level ? ' · Tier ' + q.level : ''}${q.multi ? ' · select all' : ''}`;
}
/* One question card. `st` holds the answer state (order, rightOrder, picked, mpick, answered, ok);
   in the one-at-a-time view that is Q itself, on the all-on-one-page view one object per question. */
function qCard(q, st, opts = {}) {
  const sq = S.q[q.id], tag = opts.idx != null ? `${opts.idx + 1}. ` : '';
  let h = `<div class="card qcard" data-qid="${q.id}"><div class="row" style="justify-content:space-between"><span class="meta">${tag}${metaLine(q)}${opts.seen ? ' · ' + (sq && sq.n ? 'seen ' + sq.n + '×' : 'new') : ''}</span>${flagBtn(q.id)}</div><div class="stem">${esc(q.stem)}</div>${stemMedia(q)}`;
  if (q.type === 'match') {
    h += q.left.map((l, i) => `<div class="row" style="margin-bottom:8px"><span style="flex:1 1 200px">${esc(l)}</span>
      <select data-qid="${q.id}" data-l="${i}" ${st.answered ? 'disabled' : ''}><option value="">—</option>${st.rightOrder.map(r => `<option value="${esc(r)}" ${st.mpick && st.mpick[i] === r ? 'selected' : ''}>${esc(r)}</option>`).join('')}</select>
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
  let h = `<div class="row" style="justify-content:space-between"><span class="meta">${esc(Q.label || '')} · ${Q.done} answered${Q.done ? ' · ' + Q.right + ' right' : ''}</span>${layoutToggle()}</div><div class="row" style="margin:4px 0 10px">${sessStrip()}</div>`;
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
  let h = `<div class="row allhead" style="justify-content:space-between"><span class="meta" id="allcount">${esc(allCount(list, shown))}</span>${layoutToggle()}</div><div class="row" style="margin:4px 0 10px">${sessStrip()}</div>`;
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
function checkAll(id) {
  const q = byId[id], st = Q.st[id];
  if (q.type === 'match') { st.mpick = st.mpick || {}; if (!Object.values(st.mpick).some(Boolean)) return; st.ok = q.left.every((l, i) => st.mpick[i] === pairOf(q, l)); }
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
    if (!Object.values(Q.mpick).some(Boolean)) return;   // nothing chosen yet: Check does nothing, as with select-all
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
  return `<span class="meta" id="sess" style="margin:0"><span title="Solid: right and not marked &quot;I guessed&quot; (the count above includes guessed right answers)">This session: ${ok}/${ses.length} solid (${Math.round(100 * ok / ses.length)}%)</span> · last ${last.length}: <span class="sdots10">${last.map(e => `<i class="${solid(e) ? 'y' : 'n'}" title="${esc(e.id)}"></i>`).join('')}</span></span>`;
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
  const pool = examPool(), ex = active(), mineId = id => byId[id] && examOf(byId[id]) === ex.id;
  // everything on this page is about the exam being studied
  if (!S.log.some(e => mineId(e.id))) { $('#view').innerHTML = `<h2>Weak spots</h2><div class="row" style="margin:-4px 0 8px">${examSwitch()}</div><div class="empty">No ${esc(ex.name)} answers yet. Answer some questions and this fills in: your progress this session, the concepts to review first, what you keep choosing and why it is wrong, and where to read about each one.</div>`; return; }
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
  const cap1 = t => /^[a-z]/.test(t) ? t.charAt(0).toUpperCase() + t.slice(1) : t;   // "β drugs" stays β, not Greek capital Β
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
        const idea = q.teach ? firstSentence(q.teach) : '', bare = x => String(x).toLowerCase().replace(/[^a-z0-9α-ω]+/g, '');
        // a definition question's teach often restates its answer: say it once
        if (idea && !(right.length && bare(idea).includes(bare(right.join(' '))) && bare(idea).length < bare(right.join(' ')).length + 40)) h += `<div class="pi"><b>The idea:</b> ${esc(idea)}</div>`;
        if (c.qs.length > 1) h += `<div class="meta" style="margin:2px 0 0">${c.qs.length} questions on this concept are not solid.</div>`;
        h += `</div>`;
      });
      if (cs.length > 4) h += `<div class="meta">+ ${cs.length - 4} more concept${cs.length - 4 === 1 ? '' : 's'} in this section.</div>`;
      h += `<div class="row" style="margin-top:8px;flex-wrap:wrap">${A.links.map(([v, a, t]) => `<button type="button" class="chip" data-jump="${v}:${a}">Read: ${esc(t)}</button>`).join('')}<button class="btn" data-area="${ai}">Drill these ${A.qs.length}</button></div></div>`;
    });
    if (ranked.length > 6) h += `<p class="meta">${ranked.length - 6} more section${ranked.length - 6 === 1 ? '' : 's'} have questions to review; they appear here as these are solved.</p>`;
    h += `<div class="row" style="margin:6px 0 14px"><button class="btn ghost" id="missall">Drill all ${notSolid.length} not-solid questions</button></div>`;
  } else h += `<div class="card">Every ${esc(ex.name)} question you have answered is solid on its last three answers.</div>`;

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
  // a blueprint whose parts carry their own tests (Exam 2) sorts by those; otherwise the Exam 1 keyword rules
  const catOf = bp.parts.some(p => p.test) ? q => (bp.parts.find(p => p.test && p.test(q)) || bp.parts.find(p => p.rest)).key : bpCat;
  const by = {}; elig.forEach(q => (by[catOf(q)] = by[catOf(q)] || []).push(q));
  const total = active().questions, out = [], used = new Set();
  const ok = q => !used.has(q.id) && !(q.dupOf && used.has(q.dupOf)) && ![...used].some(u => byId[u].dupOf === q.id);
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
  const ex = active(), xp = examPool().filter(q => !q.lowYield && !q.type), nonTerm = xp.filter(q => q.skill !== 'term').length;
  const max = nonTerm + Math.min(new Set(xp.filter(q => q.skill === 'term').map(q => q.concept)).size, Math.floor(nonTerm * 0.15 / 0.85));
  if (EX && !EX.done && EX.expired) { submitExam(); return; }
  if (EX && !EX.done) return renderExam();
  // a finished paper stays on its result page until "New exam" (or the learner switches exam)
  if (EX && EX.done && (!EX.exam || EX.exam === ex.id)) return examResult();
  const lens = [...new Set([ex.questions, 25, 50, max].filter(x => x && x <= max))].sort((a, b) => a - b);
  let h = `<h2>Exam simulator</h2><div class="row" style="margin:-4px 0 8px">${examSwitch()}</div><p class="sub">${esc(ex.name)}: ${ex.questions ? ex.questions + ' questions' : 'question count not yet announced'}, ${ex.minutes} minutes allotted.
    Answers are not shown until you submit. Select-all items are scored all-or-nothing. ${ex.blueprint ? 'With his topic counts on, the paper follows them; otherwise' : ''} definition questions make up at most 15% of the paper.</p>
    <div class="card"><div class="row"><span>Length:</span>${lens.map(n => `<button type="button" class="chip ${n === (ex.questions || lens[0]) ? 'on' : ''}" aria-pressed="${n === (ex.questions || lens[0])}" data-n="${n}">${n === max ? 'All ' + n : n}</button>`).join('')}</div>
    ${ex.blueprint ? `<div class="row" style="margin-top:10px"><label><input type="checkbox" id="bp" checked> Match his topic counts at ${ex.questions} questions: ${ex.blueprint.parts.map(p => esc(p.name) + ' ' + (p.rest ? '(the rest)' : p.min ? '(at least ' + p.min + ')' : Array.isArray(p.n) ? p.n.join('–') : p.n)).join(' · ')} · ${ex.blueprint.sata} select-all</label></div>` : ''}
    <div class="row" style="margin-top:10px"><label><input type="checkbox" id="scale" checked> Scale the clock to the length (${ex.minutes} min for the full paper)</label></div>
    <div class="row" style="margin-top:10px"><span class="meta" style="margin:0">Answer:</span>${layoutToggle()}</div>
    <div class="row" style="margin-top:12px"><button class="btn" id="startx">Start</button></div></div>`;
  // attempts saved before papers named their exam show under both exams
  const past = (S.exams || []).filter(e => !e.exam || e.exam === ex.id);
  if (past.length) h += `<h3>Past attempts: ${esc(ex.name)}</h3><div class="card">${past.slice(-8).reverse().map(e => `<div class="topicrow"><span>${esc(new Date(+e.t).toLocaleString())}</span><span>${+e.score}/${+e.n} (${Math.round(100 * e.score / e.n)}%)</span></div>`).join('')}</div>`;
  $('#view').innerHTML = h;
  let n = ex.questions || lens[0];
  document.querySelectorAll('[data-n]').forEach(c => c.onclick = () => { n = +c.dataset.n; document.querySelectorAll('[data-n]').forEach(x => { x.classList.toggle('on', x === c); x.setAttribute('aria-pressed', x === c); }); });
  // (the layout chips on this page only restyle themselves: see the delegated handler)
  $('#startx').onclick = () => {
    const paper = ex.blueprint && n === ex.questions && $('#bp') && $('#bp').checked ? drawBlueprint(ex.blueprint) : drawExam(n);
    const full = ex.questions || max;
    const mins = $('#scale').checked ? Math.max(5, Math.round(ex.minutes * paper.length / full)) : ex.minutes;
    EX = {exam: ex.id, name: ex.name, qs: paper.map(q => q.id), i: 0, ans: {}, flag: {}, orders: paper.map(q => optOrder(q)), ends: Date.now() + mins * MIN, done: false};
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
  let h = `<div class="row allhead xhead" style="justify-content:space-between"><b id="xcount">${n} of ${EX.qs.length} answered</b><span class="row"><span class="timer" id="clock" role="timer"></span>${layoutToggle()}<button class="btn" id="submit">Submit exam</button></span></div>`;
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
  // moving to another question starts at its stem; picking an option keeps the page where it is
  if (EX.shown !== EX.i) { EX.shown = EX.i; window.scrollTo(0, 0); }
  const q = byId[EX.qs[EX.i]], ord = EX.orders[EX.i], a = EX.ans[q.id];
  let h = `<div class="row" style="justify-content:space-between"><b>${EX.name ? esc(EX.name) + ' · ' : ''}Question ${EX.i + 1} of ${EX.qs.length}</b><span class="row"><span class="timer" id="clock" role="timer"></span>${layoutToggle()}</span></div>
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
  S.exams = S.exams || []; S.exams.push({t: Date.now(), n: EX.qs.length, score, exam: EX.exam});
  EX.score = score; save(); examResult();
}
function examResult() {
  clearView();
  const qsx = EX.qs.map(id => byId[id]);
  const by = (fn, nm) => { const g = {}; qsx.forEach(q => { const k = fn(q); g[k] = g[k] || {n: 0, ok: 0}; g[k].n++; if (exRight(q, EX.ans[q.id])) g[k].ok++; });
    return Object.entries(g).sort((x, y) => (x[0] === 'No tier') - (y[0] === 'No tier') || x[0].localeCompare(y[0], undefined, {numeric: true})).map(([k, v]) => `<tr><td>${esc(nm(k))}</td><td>${v.ok}/${v.n}</td><td>${Math.round(100 * v.ok / v.n)}%</td></tr>`).join(''); };
  let h = `<h2>Exam result: ${EX.score}/${EX.qs.length} (${Math.round(100 * EX.score / EX.qs.length)}%)</h2>${EX.name ? `<p class="sub">${esc(EX.name)}</p>` : ''}
    <div class="row"><button class="btn" id="newx">New exam</button><button class="btn ghost" id="missx">Drill the ones I missed</button></div>
    <h3>By topic</h3><div class="tablewrap"><table><thead><tr><th>Topic</th><th>Right</th><th>%</th></tr></thead><tbody>${by(q => q.topic, k => (TOPIC[k] || {}).name || k)}</tbody></table></div>
    <h3>By skill</h3><div class="tablewrap"><table><thead><tr><th>Skill</th><th>Right</th><th>%</th></tr></thead><tbody>${by(q => q.skill, k => (SKILL[k] || {}).label || k)}</tbody></table></div>
    ${qsx.some(q => q.level) ? `<h3>By tier</h3><div class="tablewrap"><table><thead><tr><th>Tier</th><th>Right</th><th>%</th></tr></thead><tbody>${by(q => q.level ? 'Tier ' + q.level : 'No tier', k => k)}</tbody></table></div>` : ''}
    <h3>Review</h3>`;
  qsx.forEach((q, k) => {
    const a = EX.ans[q.id], ok = exRight(q, a), pickedSet = new Set([].concat(a == null ? [] : a));
    h += `<div class="card"><div class="row" style="justify-content:space-between"><span class="meta">${k + 1}. ${metaLine(q)}</span>${flagBtn(q.id)}</div><div class="stem">${esc(q.stem)}</div>${stemMedia(q)}
      <div class="verdict ${ok ? 'ok' : 'bad'}">${ok ? '✓ Correct' : !examAnswered(q.id) ? '✗ Not answered' : '✗ Not correct'}</div>`;
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
const termList = () => (typeof TERMS === 'undefined' ? [] : TERMS).filter(t => (lecExam(t.lecture) || 1) === activeId() && (TM.group === 'all' || t.group === TM.group));
const termKey = t => 'term:' + t.id;
/* Glossary search and A–Z: the search box filters as you type (term, one-line
   meaning, definition, example), the letter bar jumps to a letter (switching to
   A–Z order), and a floating button returns to the search bar once it is off screen. */
const LETTERS_AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').concat('#');
const termLetter = t => { const c = (t.term.match(/[A-Za-z]/) || [''])[0].toUpperCase(); return /^[A-Za-z]/.test(t.term.trim()) ? c : '#'; };
// withExam: search and A–Z mix both exams, so each card says which exam it belongs to
const termHTML = (t, withExam) => `<div class="term" id="term-${esc(t.id)}"><b>${esc(t.term)}</b>${withExam ? ` <span class="exlabel">Exam ${lecExam(t.lecture) || 1}</span>` : ''}${t.gist ? `<div class="gist">${esc(t.gist)}</div>` : ''}<div>${esc(t.def)}</div>${t.scene ? `<div class="hook"><b>In action:</b> ${esc(t.scene)}</div>` : ''}${t.hook ? `<div class="hook">${esc(t.hook)}</div>` : ''}${t.fig ? figHTML(t.fig) : ''}<div class="cite">${esc(fmtCite(t.cite))}</div></div>`;
function glossWire(all, groups) {
  const box = $('#tsearch'), list = $('#glist');
  const draw = () => {
    const q = (TM.q || '').trim().toLowerCase();
    let pool = all.filter(t => TM.group === 'all' || t.group === TM.group);
    if (q) pool = pool.filter(t => [t.term, t.gist, t.def, t.scene].join(' ').toLowerCase().includes(q));
    const az = q || TM.order === 'az';
    let h = '';
    if (!pool.length) h = `<div class="card empty">No term matches “${esc(TM.q)}”. Try a shorter word, or pick a letter above.</div>`;
    else if (q) {
      // a search lists terms whose name matches first, then terms that only mention the word
      const named = pool.filter(t => t.term.toLowerCase().includes(q)), rest = pool.filter(t => !named.includes(t));
      const srt = l => l.slice().sort((a, b) => a.term.localeCompare(b.term, undefined, {sensitivity: 'base'}));
      if (named.length) h += `<h3>Term names with “${esc(TM.q.trim())}”</h3><div class="card">${srt(named).map(t => termHTML(t, true)).join('')}</div>`;
      if (rest.length) h += `<h3>Also mentioned in</h3><div class="card">${srt(rest).map(t => termHTML(t, true)).join('')}</div>`;
    } else if (az) {
      const sorted = pool.slice().sort((a, b) => a.term.localeCompare(b.term, undefined, {sensitivity: 'base'}));
      const byL = {}; sorted.forEach(t => (byL[termLetter(t)] = byL[termLetter(t)] || []).push(t));
      LETTERS_AZ.filter(L => byL[L]).forEach(L => { h += `<h3 id="tl-${L === '#' ? 'num' : L}">${L}</h3><div class="card">${byL[L].map(t => termHTML(t, true)).join('')}</div>`; });
    } else {
      // by group: one collapsible section per exam; search and A–Z list both exams together.
      // A group chip of the other exam opens that exam's section (the studied one would be empty).
      const has = e => pool.some(t => (lecExam(t.lecture) || 1) === e.id);
      h = COURSE.exams.map(e => {
        const mine = pool.filter(t => (lecExam(t.lecture) || 1) === e.id);
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
  const chipGroups = TM.mode === 'glossary' ? groups : [...new Set(all.filter(t => (lecExam(t.lecture) || 1) === activeId()).map(t => t.group))];
  if (TM.group !== 'all' && !chipGroups.includes(TM.group)) TM.group = 'all';
  let h = `<h2>Terms</h2><div class="row" style="margin:-4px 0 8px">${examSwitch()}</div><p class="sub">${all.length} terms, each with its source, grouped by exam; flashcards and Quiz me use the exam you are studying for. Each term has a one-line meaning, a situation that shows it in action, and, where one applies, a figure.</p>
  <div class="card"><div class="row">${[['glossary', 'Glossary'], ['flash', 'Flashcards'], ['quiz', 'Quiz me']].map(([k, l]) => `<button type="button" class="chip ${TM.mode === k ? 'on' : ''}" aria-pressed="${TM.mode === k}" data-mode="${k}">${l}</button>`).join('')}
   <span class="meta" style="margin:0 0 0 12px">Group:</span>${['all'].concat(chipGroups).map(g => `<button type="button" class="chip ${TM.group === g ? 'on' : ''}" aria-pressed="${TM.group === g}" data-group="${esc(g)}">${g === 'all' ? 'All' : esc(g)}</button>`).join('')}</div></div>`;
  const list = termList();
  if (TM.mode === 'glossary') {
    const pool = all.filter(t => TM.group === 'all' || t.group === TM.group);
    const have = new Set(pool.map(termLetter));
    h += `<div class="card tbar" id="tbar"><div class="row" style="flex-wrap:nowrap"><input id="tsearch" type="search" placeholder="Search the terms (name, meaning or example)…" value="${esc(TM.q || '')}" autocomplete="off" aria-label="Search the terms">
      <button class="btn ghost" id="tclear" type="button" ${TM.q ? '' : 'hidden'}>Clear</button></div>
      <div class="letters" role="navigation" aria-label="Jump to a letter">${LETTERS_AZ.filter(L => L !== '#' || have.has('#')).map(L => `<button type="button" class="lt" data-lt="${L}" ${have.has(L) ? '' : 'disabled'}>${L}</button>`).join('')}</div>
      <div class="row" style="margin-top:6px"><span class="meta" style="margin:0">Order:</span>${[['group', 'By group'], ['az', 'A–Z']].map(([k, l]) => `<button type="button" class="chip ${(TM.order || 'group') === k ? 'on' : ''}" aria-pressed="${(TM.order || 'group') === k}" data-order="${k}">${l}</button>`).join('')}<span class="meta" id="tcount" aria-live="polite" style="margin:0 0 0 auto"></span></div></div>
      <div id="glist"></div>`;
  } else if (TM.mode === 'flash' && !list.length) {
    h += `<div class="card empty">No flashcards for ${esc(active().name)} in this group yet.</div>`;
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
  if (TM.mode === 'glossary') glossWire(all, groups);
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
/* Guides, Reference and Tell apart: the page title stays on top and each exam's
   content sits in its own collapsible group (Exam 2 content from guide2.js,
   reference2.js and tell2.js when they exist). */
const PAGE2 = {guide: () => typeof GUIDE2_HTML === 'undefined' ? '' : GUIDE2_HTML, ref: () => typeof REFERENCE2_HTML === 'undefined' ? '' : REFERENCE2_HTML, tell: () => typeof TELL2_HTML === 'undefined' ? '' : TELL2_HTML};
/* The pages are fixed for a build, so each body is expanded once (figures drawn, markers replaced);
   the exam groups around them are drawn each time, since the open one follows the exam studied. */
const PAGE_CACHE = {};
function examPage(html1, key) {
  const P = PAGE_CACHE[key] || (PAGE_CACHE[key] = (() => {
    const m = html1.match(/^\s*<h2>([^<]*)<\/h2>/), body2 = PAGE2[key]();
    return {title: m ? m[1] : '', b1: expandFigs(m ? html1.slice(m[0].length) : html1), b2: body2 ? expandFigs(body2) : ''};
  })());
  return `<h2>${P.title}</h2>` + COURSE.exams.map(e => exGroup(e, e.id === 1 ? P.b1 : P.b2 || '<div class="empty">This exam\'s sections are added as its lectures are written.</div>')).join('');
}
/* His figures are data URLs of up to a few hundred KB each. Pages carry only the key
   (<img data-img>) and the picture is attached after the page is built, so the browser does
   not parse megabytes of base64 as page markup on every visit (the Guides page held 2 MB). */
const imgTag = (k, alt) => `<img data-img="${esc(k)}" alt="${esc(alt)}" decoding="async">`;
const fillImgs = root => root.querySelectorAll('img[data-img]').forEach(i => { if (!i.getAttribute('src') && IMG[i.dataset.img]) i.src = IMG[i.dataset.img]; });
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
function stepTo(fig, from, to) {
  const steps = [...fig.querySelectorAll('.st')], svg = fig.querySelector('svg');
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
// Play all: from the step shown (from step 1 again if at the last), one step every 3.2 s, stops at the last; Pause keeps the step
const PLAY_MS = 3200;
document.addEventListener('click', e => {
  const b = e.target.closest('[data-anim] button'); if (!b) return;
  const fig = b.closest('figure'); const steps = [...fig.querySelectorAll('.st')]; if (!steps.length) return;
  const cur = steps.findIndex(s => s.classList.contains('on')), n = steps.length;
  const playBtn = fig.querySelector('[data-go="play"]');
  const stop = () => { if (ANIM) { clearTimeout(ANIM.t); ANIM.b.textContent = '▶ Play all'; ANIM.b.setAttribute('aria-pressed', 'false'); ANIM = null; } };
  const go = b.dataset.go;
  if (go === 'play') {
    const same = ANIM && ANIM.b === b; stop(); if (same) return;
    b.textContent = '❚❚ Pause'; b.setAttribute('aria-pressed', 'true');
    // Play resumes from the step shown; from the last step it glides back to step 1 first
    const restart = cur >= n - 1; if (restart) stepTo(fig, cur, 0);
    const tick = () => {
      if (!document.body.contains(fig)) return stop();
      const i = steps.findIndex(s => s.classList.contains('on'));
      if (i >= n - 1) return stop();
      stepTo(fig, i, i + 1);
      if (i + 1 === n - 1) return stop();
      ANIM.t = setTimeout(tick, PLAY_MS);
    };
    ANIM = {b, t: setTimeout(tick, restart ? PLAY_MS : PLAY_MS / 2)};
    return;
  }
  if (ANIM && ANIM.b === playBtn) stop();
  if (go === 'replay') return stepTo(fig, cur > 0 ? cur - 1 : null, cur);
  if (go === 'dot') return stepTo(fig, cur, +b.dataset.i);
  stepTo(fig, cur, (cur + (+go) + n) % n);
});
/* "Explain one": a select (or a Why? button in a table row) shows the matching
   <template data-x> card under the table; the card's button scrolls to that drug's panels. */
// scroll an element to just below the sticky header
const openTo = el => { for (let d = el && el.closest('details'); d; d = d.parentElement && d.parentElement.closest('details')) d.open = true; };
// a long way (over two screens, e.g. a Why? button far above its explanation) jumps at once, so the target is there when the tap ends
const scrollToEl = el => { openTo(el); const hd = document.querySelector('header'), off = (hd ? hd.getBoundingClientRect().height : 0) + 8, top = el.getBoundingClientRect().top + window.scrollY - off; window.scrollTo({top, behavior: RM() || Math.abs(top - window.scrollY) > 2 * innerHeight ? 'auto' : 'smooth'}); };
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
/* A question's or term's figure; the static GPCR figure brings the step-through with it. */
const figHTML = key => (typeof FIG === 'function' && key) ? FIG(key) + (key === 'gpcr-steps' ? FIG('gpcr-anim') : '') : '';
function expandFigs(html) {
  return html
    .replace(/<!--FIG:([\w-]+)-->/g, (m, k) => FIG(k))
    .replace(/<!--IMG:([\w-]+)-->/g, (m, k) => IMG[k] ? `<figure class="fig">${imgTag(k, k)}</figure>` : '')
    .replace(/<!--GRAPH:([\s\S]*?)-->/g, (m, j) => { try { return FIG.graph(JSON.parse(j)); } catch (e) { return ''; } });
}
function vGuide() {
  $('#view').innerHTML = `<div class="tablewrap">${examPage(typeof GUIDE_HTML === 'undefined' ? '' : GUIDE_HTML, 'guide')}</div>`;
  fillImgs($('#view')); stackTables($('#view'));
  document.querySelectorAll('.guidenav a').forEach(a => a.onclick = e => { const t = document.querySelector(a.getAttribute('href')); if (t) { e.preventDefault(); scrollToEl(t); } });
}

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
  ['Signal transduction', ['gpcr-steps', 'gpcr-anim', 'galpha-chain', 'galpha-anim', 'rtk-steps', 'rtk-anim', 'rtk-scenarios-anim']],
  ['Two drugs at one receptor: how the curve moves', ['shift-competitive-anim', 'shift-irreversible-anim', 'shift-inverse-anim', 'shift-fafa-anim', 'shift-fapa-anim', 'shift-fapa-down-anim', 'shift-allo-agonist-anim', 'shift-allo-antagonist-anim']],
  ['Indirect antagonists and drug combinations', ['ind-ssri-anim', 'ind-snri-anim', 'ind-ache-anim', 'ind-carbidopa-anim', 'ind-pde-anim', 'ind-ras-anim', 'enhance-anim']],
  ['Receptor regulation', ['reg-chain', 'desens-rapid-anim', 'desens-long-anim', 'upreg-anim', 'downreg-anim']],
  ['Autonomic layout, receptors and the baroreceptor reflex', ['e2-ans-layout', 'e2-receptor-map', 'e2-musc-map', 'e2-baroreflex-anim'], 2],
  ['Cholinergic synapses: where each drug acts', ['e2-nmj-anim', 'e2-sch-phases-anim', 'e2-chol-synapse-anim', 'e2-op-anim'], 2],
  ['Adrenergic synapse: where each drug acts', ['e2-adr-cycle-anim', 'e2-adr-synapse-anim', 'e2-maoi-tyramine-anim', 'e2-beta-blockers'], 2],
  ['Epinephrine and nitric oxide', ['e2-epi-reversal-anim', 'e2-no-pathway-anim'], 2],
  ['Renin–angiotensin–aldosterone system', ['e2-raas-cascade-anim', 'e2-raas-anim'], 2]
];
const DG_NAMES = {'rtk-steps': 'RTK activation: the five steps'};
function vDiagrams() {
  const have = new Set(typeof FIG === 'function' ? FIG.keys() : []);
  const titleOf = html => { const m = html.match(/<text class="title"[^>]*>([^<]*)</); return m ? m[1] : ''; };
  let out = '';
  COURSE.exams.forEach(e => {
  let toc = '', body = '';
  DIAGRAMS.forEach(([name, keys, ex], gi) => {
    if ((ex || 1) !== e.id) return;
    const ks = keys.filter(k => have.has(k)); if (!ks.length) return;
    const figs = ks.map(k => { const html = FIG(k); return {k, html, t: (DG_NAMES[k] || titleOf(html) || k).replace(/ ?·? step by step/, '')}; });
    toc += `<div class="card"><b>${esc(name)}</b><div class="row" style="flex-wrap:wrap;margin-top:6px">${figs.map(f => `<a class="chip" href="#dg-${f.k}" data-dg="${f.k}">${esc(f.t)}${/-anim$/.test(f.k) ? ' ▶' : ''}</a>`).join('')}</div></div>`;
    body += `<h3 id="dgg-${gi}">${esc(name)}</h3><div class="shiftgrid">${figs.map(f => `<div id="dg-${f.k}">${f.html}</div>`).join('')}</div>`;
  });
  out += exGroup(e, toc + body || '<div class="empty">This exam\'s diagrams are added as its lectures are written.</div>');
  });
  $('#view').innerHTML = `<h2>Diagrams</h2><p class="sub">Every process diagram in one place. ▶ marks a step-through figure: use Next, Play all or the step dots under it.</p>${out}`;
  $('#view').querySelectorAll('[data-dg]').forEach(a => a.onclick = e => { e.preventDefault(); const el = document.getElementById('dg-' + a.dataset.dg); if (el) scrollToEl(el); });
}
function vGraphs() {
  const pool = examPool();
  if (!GR.length) { $('#view').innerHTML = '<h2>Graphs</h2><div class="empty">No figures are registered.</div>'; return; }
  let h = `<h2>Graphs</h2><p class="sub">His own figures. Pick one and every question written on it is asked in turn; a wrong answer names the reading question you skipped, and the end of the pass shows which one you keep skipping.</p>`;
  const INTRO = {1: 'Dose–response curves from his PollEV polls, Jeopardy, the 9/30 review and Part 3: read the shift, the baseline and the maximum.',
    2: 'Tissue tracings from his Exam 2 polls and review: read which tissue and response are measured, which receptor the drug acts on, and whether the response is helped or blocked.'};
  COURSE.exams.forEach(e => {
  const groups = {}; GR.filter(g => (g.exam || 1) === e.id).forEach(g => (groups[g.group || 'Other'] = groups[g.group || 'Other'] || []).push(g));
  let hh = h; h = Object.keys(groups).length && INTRO[e.id] ? `<p class="sub">${INTRO[e.id]}</p>` : '';
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
  h = hh + exGroup(e, h || '<div class="empty">His figures for this exam are added as they come up in class.</div>');
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
  h += exGroup(e, g || `<div class="empty">${MAPF.show === 'all' ? 'Questions for this exam are added as its lectures are written.' : 'No question of this exam matches the filter.'}</div>`);
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
  // typing in a field is never a shortcut; on a focused button or link, Enter and Space keep their own meaning
  const tg = e.target && e.target.tagName || '';
  if (/^(INPUT|SELECT|TEXTAREA)$/.test(tg) || (e.target && e.target.isContentEditable)) return;
  if (/^(BUTTON|A|SUMMARY)$/.test(tg) && (e.key === 'Enter' || e.key === ' ')) return;
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
