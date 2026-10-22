// Bank integrity: schema, keys, option rules, topics, cites, blueprint pools.
const {COURSE, TOPICS, QUESTIONS, TELL_HTML} = require('./load')();
const fs0 = require('fs');
const IMAGES_KEYS = new Set(fs0.existsSync(__dirname + '/images.json') ? Object.keys(JSON.parse(fs0.readFileSync(__dirname + '/images.json', 'utf8'))) : []);
let fail = 0, warn = 0;
const bad = (id, m) => { fail++; console.log('FAIL', id, m); };
const w = (id, m) => { warn++; console.log('warn', id, m); };
const ids = new Set(), lect = new Set(COURSE.lectures.map(l => l.id)), skills = new Set(COURSE.skills.map(s => s.id));
const topics = {}; TOPICS.forEach(t => topics[t.id] = new Set((t.subs || []).map(s => s.id)));
for (const q of QUESTIONS) {
  if (ids.has(q.id)) bad(q.id, 'duplicate id'); ids.add(q.id);
  for (const k of ['stem', 'topic', 'sub', 'concept', 'skill', 'cite', 'lecture']) if (!q[k]) bad(q.id, 'missing ' + k);
  if (!lect.has(q.lecture)) bad(q.id, 'unknown lecture ' + q.lecture);
  if (!skills.has(q.skill)) bad(q.id, 'unknown skill ' + q.skill);
  if (!topics[q.topic]) bad(q.id, 'unknown topic ' + q.topic);
  else if (!topics[q.topic].has(q.sub)) bad(q.id, 'unknown sub ' + q.sub);
  const L = COURSE.lectures.find(l => l.id === q.lecture);
  if (L && !(L.decks || [L.deck]).some(d => q.cite.includes(d)) && !(q.source === 'transcript' && /transcript/i.test(q.cite))) bad(q.id, 'cite names neither the deck ' + L.deck + ' nor, for a transcript item, the transcript');
  if (q.source && !['slide', 'transcript', 'both'].includes(q.source)) bad(q.id, 'bad source');
  if ((q.source === 'transcript' || q.source === 'both') && !/transcript/i.test(q.cite)) w(q.id, 'transcript-sourced but cite does not name the transcript');
  if (q.type === 'match') { if (!q.pairs || !q.left || !q.right) bad(q.id, 'match fields'); continue; }
  const verbatim = ((q.tags || []).includes('pollev') || (q.tags || []).includes('quiz')) && (q.sub === 'verbatim' || /^quiz\d$/.test(q.sub));   // his poll or her quiz, word for word
  const isTF = Array.isArray(q.options) && q.options.length === 2 && q.options.every(o => /^(True|False)$/.test(o.t.trim()));
  if (!Array.isArray(q.options) || (q.options.length < 2) || (q.options.length < 3 && !isTF && !verbatim)) { bad(q.id, 'fewer than 3 options (a plain True/False pair or a verbatim poll is allowed)'); continue; }
  const texts = q.options.map(o => o.t);
  if (new Set(texts).size !== texts.length) bad(q.id, 'duplicate option text');
  const right = q.options.filter(o => o.correct);
  if (q.multi) {
    if (right.length < 2) bad(q.id, 'select-all with fewer than 2 correct');
    if (right.length === q.options.length) bad(q.id, 'select-all with no distractor');
    if (!/Select all that apply\.$/.test(q.stem)) bad(q.id, 'select-all stem must end "Select all that apply."');
  } else {
    if (right.length !== 1) bad(q.id, right.length + ' correct options');
    else {
      const L2 = Math.max(...texts.map(t => t.length));
      if (!isTF && !verbatim && right[0].t.length === L2 && texts.filter(t => t.length === L2).length === 1) bad(q.id, 'correct option is the longest');
    }
    if (/Select all/i.test(q.stem)) bad(q.id, 'single-answer stem says select all');
  }
  q.options.forEach((o, i) => { if (!o.why) bad(q.id, 'option ' + i + ' has no why'); });
  if (!q.teach) w(q.id, 'no teach');
  if (q.img && !(IMAGES_KEYS.has(q.img))) bad(q.id, 'img key not in images.json: ' + q.img);
  if (q.simg && !(IMAGES_KEYS.has(q.simg))) bad(q.id, 'simg key not in images.json: ' + q.simg);
  if (q.simg && !q.simgAlt) bad(q.id, 'simg without simgAlt');
  if (q.graph) [].concat(q.graph).forEach(gr => {
    if (!Array.isArray(gr.curves) || !gr.curves.length) bad(q.id, 'graph without curves');
    else gr.curves.forEach((c, i) => { if (!c.label || typeof c.ec !== 'number' || typeof c.emax !== 'number') bad(q.id, 'graph curve ' + i + ' needs label, ec, emax'); });
  });
  if (q.graph) {
    if (!q.fg && !q.skill.match(/figure|apply|tell|drug/)) w(q.id, 'graph on a ' + q.skill + ' question');
  }
  if (q.reading != null) {
    const rs = Array.isArray(q.reading) ? q.reading : [q.reading];
    if (!rs.length) bad(q.id, 'empty reading');
    rs.forEach((r, i) => { if (!r || !r.src || !r.t) bad(q.id, 'reading ' + i + ' needs src and t'); else if (r.t.length < 40) w(q.id, 'reading ' + i + ' is very short'); });
  }
  if (q.dupOf && !QUESTIONS.some(x => x.id === q.dupOf)) bad(q.id, 'dupOf points nowhere');
}
// graph registry: every GRAPHS key and alt is an image, and every image a question uses belongs to exactly one entry
const MISS_TAGS = new Set(['shift', 'baseline', 'emax', 'symmetry', 'direction', 'potency', 'efficacy', 'affinity', 'class', 'steps', 'ti', 'read']);
const GRAPH_GROUPS = new Set(['Potency and efficacy', 'Shifts: which curve is which drug', 'Dotted-line figures', 'Affinity and Kd', 'Signal transduction', 'Quantal and therapeutic index', 'Other']);
if (fs0.existsSync(__dirname + '/graphs.js')) {
  const GRAPHS = require('vm').runInNewContext(fs0.readFileSync(__dirname + '/graphs.js', 'utf8') + ';GRAPHS', {});
  const owner = {};
  for (const g of GRAPHS) {
    for (const k of ['key', 'title', 'group', 'source', 'method']) if (!g[k]) bad('graphs ' + (g.key || '?'), 'missing ' + k);
    if (!GRAPH_GROUPS.has(g.group)) bad('graphs ' + g.key, 'unknown group ' + g.group);
    if (!Array.isArray(g.read) || g.read.length < 3 || g.read.length > 6) bad('graphs ' + g.key, 'read needs 3–6 lines');
    if (!Array.isArray(g.asks) || g.asks.length < 2 || g.asks.length > 4) bad('graphs ' + g.key, 'asks needs 2–4 items');
    for (const k of [g.key].concat(g.alts || [])) {
      if (!IMAGES_KEYS.has(k)) bad('graphs ' + g.key, 'image key not in images.json: ' + k);
      if (owner[k]) bad('graphs ' + g.key, 'image key also in entry ' + owner[k] + ': ' + k);
      owner[k] = g.key;
    }
  }
  const perGraph = {};
  for (const q of QUESTIONS) {
    if (!q.img) continue;
    if (!owner[q.img]) bad(q.id, 'img key in no GRAPHS entry: ' + q.img);
    else perGraph[owner[q.img]] = (perGraph[owner[q.img]] || 0) + 1;
  }
  for (const g of GRAPHS) if ((perGraph[g.key] || 0) < 5) bad('graphs ' + g.key, 'fewer than 5 questions on this figure (' + (perGraph[g.key] || 0) + ')');
  console.log(`${GRAPHS.length} figures in the graph registry · questions per figure ${JSON.stringify(perGraph)}`);
}
// miss tags: every wrong option of a figure question names the reading question skipped
for (const q of QUESTIONS) {
  if (!q.img || !Array.isArray(q.options)) continue;
  q.options.forEach((o, i) => {
    if (o.correct) { if (o.miss) bad(q.id, 'option ' + i + ' is correct but has a miss tag'); return; }
    if (!o.miss) bad(q.id, 'wrong option ' + i + ' has no miss tag');
    else if (!MISS_TAGS.has(o.miss)) bad(q.id, 'option ' + i + ' unknown miss tag ' + o.miss);
  });
}
// scenes: fifteen, every mode with its lede, steps, tip, cite and a spoken script of 250–450 characters written in spoken form
{
  const SC = require('./load')().SC;
  if (!SC || !Array.isArray(SC.SCENES)) bad('scenes', 'scenes.js did not load');
  else {
    if (SC.SCENES.length !== 15) bad('scenes', SC.SCENES.length + ' scenes, expected 15');
    const keys = new Set();
    for (const s of SC.SCENES) {
      if (keys.has(s.key)) bad('scenes ' + s.key, 'duplicate scene key'); keys.add(s.key);
      if (!s.cite || !/slide|transcript/.test(s.cite)) bad('scenes ' + s.key, 'cite names no slide or transcript');
      for (const [k, m] of Object.entries(s.modes)) {
        const id = 'scenes ' + s.key + '-' + k;
        if (!m.lede || !Array.isArray(m.steps) || m.steps.length < 3 || !m.tip) bad(id, 'needs lede, 3+ steps, tip');
        if (!(m.L > 0) || typeof m.draw !== 'function' && !s.dom) bad(id, 'needs L and draw');
        if (!m.script) bad(id, 'no script');
        else {
          if (m.script.length < 250 || m.script.length > 450) bad(id, 'script of ' + m.script.length + ' characters (250–450)');
          if (/[αβ→↑↓]|\b(cAMP|cGMP|AT[12]|N[nm]|G[sqi]|ACh|AChE|NE|BP|HR)\b/.test(m.script)) bad(id, 'script has a written form the voice must not read: write it as spoken');
        }
        [m.lede, m.tip, ...m.steps.map(x => x[1]), m.script].forEach(t => { if (/this (scene|figure|animation)|note that/i.test(t)) bad(id, 'sentence about the writing itself: ' + t.slice(0, 50)); });
      }
    }
  }
}
// readings: unique ids, every linked anchor exists on a page, every question's reading exists
if (typeof READINGS !== 'undefined') {
  const rids = new Set();
  const pagesHtml = [typeof GUIDE_HTML === 'undefined' ? '' : GUIDE_HTML, typeof GUIDE2_HTML === 'undefined' ? '' : GUIDE2_HTML, typeof GUIDE3_HTML === 'undefined' ? '' : GUIDE3_HTML, REFERENCE_HTML, typeof REFERENCE2_HTML === 'undefined' ? '' : REFERENCE2_HTML, typeof REFERENCE3_HTML === 'undefined' ? '' : REFERENCE3_HTML, TELL_HTML, typeof TELL2_HTML === 'undefined' ? '' : TELL2_HTML, typeof TELL3_HTML === 'undefined' ? '' : TELL3_HTML].join('');
  for (const r of READINGS) {
    if (rids.has(r.id)) bad('readings', 'duplicate id ' + r.id); rids.add(r.id);
    for (const k of ['title', 'about', 'exam', 'status']) if (r[k] == null || r[k] === '') bad('readings ' + r.id, 'missing ' + k);
    for (const [v, a] of r.links || []) if (!pagesHtml.includes('id="' + a + '"')) bad('readings ' + r.id, 'link anchor missing: ' + a);
    for (const u of r.lecture_use || []) if (!u.point) bad('readings ' + r.id, 'lecture_use without a point');
  }
  QUESTIONS.forEach(q => { if (q.readingId && !rids.has(q.readingId)) bad(q.id, 'readingId not in READINGS: ' + q.readingId); });
}
{ // poisoning table drill data (poison_table.js): her key, 12 rows, every row with symptoms, an antidote and a mechanism
  const fs = require('fs'), vm = require('vm');
  if (fs.existsSync(__dirname + '/poison_table.js')) {
    const c = {}; vm.createContext(c); vm.runInContext(fs.readFileSync(__dirname + '/poison_table.js', 'utf8') + ';this.P = POISON_TABLE;', c);
    const P = c.P, ids = new Set();
    if (P.length !== 12) bad('poison_table', 'expected 12 rows, found ' + P.length);
    P.forEach(r => { if (ids.has(r.id)) bad('poison_table', 'duplicate id ' + r.id); ids.add(r.id);
      if (!r.poison || !r.sym || !r.ref || !r.anti || !r.anti.length) bad('poison_table', 'row missing a field: ' + r.id);
      (r.anti || []).forEach(a => { if (!a[0] || !a[1]) bad('poison_table', 'antidote without mechanism: ' + r.id); });
      (r.special || []).forEach(sp => { if (!sp[0] || !sp[1]) bad('poison_table', 'special consideration without question and answer: ' + r.id); });
      if (r.same && !P.find(x => x.id === r.same)) bad('poison_table', 'same-as row not found: ' + r.id); });
  }
}
{ // antidote diagrams: each listed page and its fragment exist, the built page carries the fragment verbatim,
  // the fragments match the hashes recorded at handoff (content stays unchanged), every row id and note key resolves,
  // and every data-anti link in the guides names a listed page
  const fs = require('fs'), vm = require('vm'), path = require('path'), crypto = require('crypto');
  const A = path.join(__dirname, '..', '..', 'antidotes');
  const c = {}; vm.createContext(c); vm.runInContext(fs.readFileSync(__dirname + '/poison_table.js', 'utf8') + ';this.D = ANTIDOTE_DIAGRAMS; this.N = ANTIDOTE_NOTES; this.P = POISON_TABLE;', c);
  const hashes = Object.fromEntries(fs.readFileSync(path.join(A, 'src', 'fragments.sha256'), 'utf8').trim().split('\n').map(l => l.split(/\s+/).reverse()));
  if (c.D.length !== 7) bad('antidotes', 'expected 7 diagrams, found ' + c.D.length);
  c.D.forEach(d => {
    const fr = path.join(A, 'src', 'fragments', d.slug + '.html'), pg = path.join(A, d.slug + '.html');
    if (!fs.existsSync(fr) || !fs.existsSync(pg)) { bad('antidotes', 'missing fragment or built page: ' + d.slug); return; }
    const f = fs.readFileSync(fr, 'utf8');
    if (!fs.readFileSync(pg, 'utf8').includes(f)) bad('antidotes', 'built page out of date: ' + d.slug);
    if (crypto.createHash('sha256').update(f).digest('hex') !== hashes[d.slug + '.html']) bad('antidotes', 'fragment changed since handoff (update fragments.sha256 only with a stated source): ' + d.slug);
    d.rows.forEach(r => { if (!c.P.find(x => x.id === r)) bad('antidotes', d.slug + ' names unknown table row ' + r); });
    if (d.note && !c.N[d.note]) bad('antidotes', d.slug + ' names unknown note ' + d.note);
  });
  if (!fs.existsSync(path.join(A, 'index.html'))) bad('antidotes', 'index.html missing');
  const slugs = new Set(c.D.map(d => d.slug));
  for (const m of fs.readFileSync(__dirname + '/guide3.js', 'utf8').matchAll(/data-anti="([^"]+)"/g)) if (!slugs.has(m[1])) bad('antidotes', 'guide link to unknown diagram ' + m[1]);
}
// "Hear the why" texts: every key is a question, the text is spoken-length and carries no written form the voice would misread
if (typeof NARR_Q !== 'undefined') {
  for (const [id, t] of Object.entries(NARR_Q)) {
    if (!ids.has(id)) bad('narration ' + id, 'Hear-the-why text for a question that does not exist');
    if (typeof t !== 'string' || t.length < 200 || t.length > 1100) bad('narration ' + id, 'text of ' + (t || '').length + ' characters (200–1100)');
    else if (/[→↑↓αβ`]|\$\{|\be\.g\.|\(/.test(t) && /^L1[3-9]-/.test(id)) bad('narration ' + id, 'written form the voice must not read: write it as spoken');
  }
}
// every tell-apart row names a question id that exists
const tellIds = [...TELL_HTML.matchAll(/data-q="([^"]+)"/g)].map(m => m[1]);
tellIds.forEach(id => { if (!ids.has(id)) bad('tell', 'row cites missing question ' + id); });
// blueprint: pools cover the bank, marks add up when set
for (const ex of COURSE.exams) {
  const marks = ex.pools.map(p => p.marks).filter(x => x != null);
  if (ex.questions && marks.length === ex.pools.length && marks.reduce((a, b) => a + b, 0) !== ex.questions) bad('exam' + ex.id, 'pool marks do not add up to questions');
}
const per = {}; QUESTIONS.forEach(q => { per[q.lecture] = (per[q.lecture] || 0) + 1; });
const sk = {}; QUESTIONS.forEach(q => { sk[q.skill] = (sk[q.skill] || 0) + 1; });
console.log(`${QUESTIONS.filter(q => q.reading).length} with textbook notes`);
console.log(`${QUESTIONS.length} questions · per lecture ${JSON.stringify(per)} · per skill ${JSON.stringify(sk)} · select-all ${QUESTIONS.filter(q => q.multi).length}`);
console.log(`test.js: ${fail ? 'FAILED' : 'passed'} (${fail} failures, ${warn} warnings)`);
process.exit(fail ? 1 : 0);
