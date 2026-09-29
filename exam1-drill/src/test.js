// Bank integrity: schema, keys, option rules, topics, cites, blueprint pools.
const {COURSE, TOPICS, QUESTIONS, TELL_HTML} = require('./load')();
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
  if (L && !q.cite.includes(L.deck) && !(q.source === 'transcript' && /transcript/i.test(q.cite))) bad(q.id, 'cite names neither the deck ' + L.deck + ' nor, for a transcript item, the transcript');
  if (q.source && !['slide', 'transcript', 'both'].includes(q.source)) bad(q.id, 'bad source');
  if ((q.source === 'transcript' || q.source === 'both') && !/transcript/i.test(q.cite)) w(q.id, 'transcript-sourced but cite does not name the transcript');
  if (q.type === 'match') { if (!q.pairs || !q.left || !q.right) bad(q.id, 'match fields'); continue; }
  if (!Array.isArray(q.options) || q.options.length < 3) { bad(q.id, 'fewer than 3 options'); continue; }
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
      if (right[0].t.length === L2 && texts.filter(t => t.length === L2).length === 1) bad(q.id, 'correct option is the longest');
    }
    if (/Select all/i.test(q.stem)) bad(q.id, 'single-answer stem says select all');
  }
  q.options.forEach((o, i) => { if (!o.why) bad(q.id, 'option ' + i + ' has no why'); });
  if (!q.teach) w(q.id, 'no teach');
  if (q.graph) {
    if (!Array.isArray(q.graph.curves) || !q.graph.curves.length) bad(q.id, 'graph without curves');
    else q.graph.curves.forEach((c, i) => { if (!c.label || typeof c.ec !== 'number' || typeof c.emax !== 'number') bad(q.id, 'graph curve ' + i + ' needs label, ec, emax'); });
    if (!q.fg && !q.skill.match(/figure|apply|tell|drug/)) w(q.id, 'graph on a ' + q.skill + ' question');
  }
  if (q.reading != null) {
    const rs = Array.isArray(q.reading) ? q.reading : [q.reading];
    if (!rs.length) bad(q.id, 'empty reading');
    rs.forEach((r, i) => { if (!r || !r.src || !r.t) bad(q.id, 'reading ' + i + ' needs src and t'); else if (r.t.length < 40) w(q.id, 'reading ' + i + ' is very short'); });
  }
  if (q.dupOf && !QUESTIONS.some(x => x.id === q.dupOf)) bad(q.id, 'dupOf points nowhere');
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
