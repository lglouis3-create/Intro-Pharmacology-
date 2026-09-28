// Phrasing rules for stems and options.
const {QUESTIONS} = require('./load')();
let fail = 0;
const bad = (id, m) => { fail++; console.log('FAIL', id, m); };
const STEM_BANNED = [/according to (the )?(slide|lecture|deck|professor|dr\.?)/i, /\bthe slide\b/i, /\bthe lecture\b/i, /\bthe deck\b/i, /\bin class\b/i, /Dr\.? Gottlieb/i, /\bthis drill\b/i];
const ALL_BANNED = [/`/, /\$\{/, /<\/script/i];
for (const q of QUESTIONS) {
  STEM_BANNED.forEach(r => { if (r.test(q.stem)) bad(q.id, 'stem refers to the source: ' + r); });
  const all = [q.stem, q.teach && JSON.stringify(q.teach), q.note, q.reading && JSON.stringify(q.reading), ...(q.options || []).flatMap(o => [o.t, o.why])].filter(Boolean).join(' ');
  ALL_BANNED.forEach(r => { if (r.test(all)) bad(q.id, 'forbidden text ' + r); });
  const rtxt = q.reading ? (Array.isArray(q.reading) ? q.reading : [q.reading]).map(r => r.t || '').join(' ') : '';
  [/\bthe slide\b/i, /\bin class\b/i, /\bthe lecture\b/i, /\bthis drill\b/i, /\bthe professor\b/i].forEach(r => { if (r.test(rtxt)) bad(q.id, 'reading refers to the lecture or drill: ' + r); });
  (q.options || []).forEach(o => {
    if (/\b(because|since)\b/i.test(o.t)) bad(q.id, 'reasoning inside option text: ' + o.t);
    if (/^(all|none) of the above$/i.test(o.t.trim()) && !/poll/i.test(q.cite + (q.tags || []).join(' '))) bad(q.id, 'all/none of the above outside a professor poll');
  });
  if (/\?\s*\S/.test(q.stem.replace(/\?\s*Select all that apply\.$/, '?'))) {/* multi-sentence stems allowed */}
}
console.log(`style_check.js: ${fail ? 'FAILED' : 'passed'} (${fail} failures)`);
process.exit(fail ? 1 : 0);
