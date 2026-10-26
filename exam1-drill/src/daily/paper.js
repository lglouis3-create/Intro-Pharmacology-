// Draw a 40-question practice paper (no answers) for the simulated-student check, from the active exam's lecture banks.
// Usage: node exam1-drill/src/daily/paper.js <outdir> [seed]   (run from the repo root)
const fs = require('fs'), path = require('path'); const SRC = path.join(__dirname, '..');
const out = process.argv[2], seed0 = +(process.argv[3] || new Date().toISOString().slice(0, 10).replace(/-/g, ''));
let src = 'const TOPICS=[],QUESTIONS=[];'; eval(fs.readFileSync(path.join(SRC, 'course.js'), 'utf8') + ';global.COURSE=COURSE;');
const lecs = COURSE.lectures.filter(l => l.exam === COURSE.activeExam).map(l => l.id);
for (const f of fs.readdirSync(SRC).filter(f => /^q_.*\.js$/.test(f))) src += fs.readFileSync(path.join(SRC, f), 'utf8') + ';';
eval(src + ';global.Q=QUESTIONS;');
let seed = seed0 % 2147483647 || 1; const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const pool = Q.filter(q => lecs.includes(q.lecture) && !q.lowYield && !q.dupOf && q.options).sort(() => r() - 0.5).slice(0, 40);
let md = `# Practice paper (${pool.length} questions)\n\n`;
pool.forEach((q, k) => { md += `## ${k + 1}. [${q.id}]${q.multi ? ' (select all that apply)' : ''}\n\n${q.stem}\n\n` + q.options.map((o, i) => String.fromCharCode(65 + i) + '. ' + o.t).join('\n') + '\n\n'; });
fs.mkdirSync(out, {recursive: true}); fs.writeFileSync(path.join(out, 'paper.md'), md);
fs.writeFileSync(path.join(out, 'paper_key.json'), JSON.stringify(pool.map(q => ({id: q.id, key: q.options.map((o, i) => o.correct ? String.fromCharCode(65 + i) : '').join('')}))));
console.log(pool.length, 'questions from', lecs.join(','), 'seed', seed0);
