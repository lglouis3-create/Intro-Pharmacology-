// Builds the Exam 4 recording queue (walkthroughs, Hear the why, diagram steps, two reading talks)
// as spoken text with output file names that build.py picks up. Usage: node rec/build_queue4.js > queue4.json
const fs = require('fs'), vm = require('vm'), path = require('path');
const S = path.join(__dirname, '..'); process.chdir(S);
const strip = t => String(t).replace(/<[^>]+>/g, ' ').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, 'and').replace(/&[a-z#0-9]+;/g, ' ');
const N = {0:'zero',1:'one',2:'two',3:'three',4:'four',5:'five',6:'six',7:'seven',8:'eight',9:'nine',10:'ten',11:'eleven',12:'twelve',13:'thirteen',14:'fourteen',15:'fifteen',16:'sixteen',17:'seventeen',18:'eighteen',19:'nineteen',20:'twenty'};
const num = n => N[+n] !== undefined ? N[+n] : String(+n);
const letters = s => s.split('').join(' ');
// gene symbols spelled letter by letter, with trailing numbers spoken
const gene = g => g.replace(/([A-Z]+)(\d+)([A-Z]?)(\d*)([A-Z]?)(\d*)/, (m, a, b, c, d, e, f) =>
  [letters(a), num(b), c, d && num(d), e, f && num(f)].filter(Boolean).join(' '));
const RULES = [
  [/\*(\d+)x(N|\d+)/g, (m, a, b) => ` star ${num(a)} times ${b === 'N' ? 'N' : num(b)}`],
  [/(\d+)([ACGT])>([ACGT])\b/g, '$1 $2 to $3'],
  [/\(\s*>\s*\)|,\s*>\s*,/g, ', the greater-than sign,'], [/\s>\s/g, ' to '],
  [/\bCYPs\b/g, 'C Y Ps'], [/\bCYP-/g, 'C Y P '],
  [/HLA-([ABC]|DRB1|DQA1|DQB1)\*(\d{2}):?(\d{2})/g, (m, l, a, b) => `H L A ${l.length > 1 ? gene(l) : l} ${num(a)} oh ${num(+b)}`],
  [/\bCYP(\d)([A-Z])(\d+)\b/g, (m, a, b, c) => `C Y P ${num(a)} ${b} ${num(c)}`],
  [/\bCYP(\d)([A-Z])\b/g, (m, a, b) => `C Y P ${num(a)} ${b}`],
  [/\b(VKORC1|SLCO1B1|UGT1A1|NUDT15|ABCB1|NAT2|CYP4F2|GGCX|UGT2B17|MT-RNR1)\b/g, m => gene(m.replace('-', ''))],
  [/\b(TPMT|DPYD|DPD|BChE|SNPs?|CPIC|FDA|ADRs?|ADEs?|DDIs?|PPIs?|IHC|FISH|SJS|TEN|DRESS|INR|AUC|IOM|ISMP|MERP|PGx|ACE|HER2|DNA|RNA|PD|PK|IV|MI)\b/g, m => ({SNP:'snip',SNPs:'snips',HER2:'her two',PGx:'P G X',BChE:'B C H E',CPIC:'C pick',ADRs:'A D Rs',ADEs:'A D Es',DDIs:'D D Is',PPIs:'P P Is'})[m] || letters(m)],
  [/-(\d{3,4})([ACGT])>([ACGT])/g, (m, n, a, b) => ` minus ${n} ${a} to ${b}`],
  [/-(\d{3,4})([ACGT])\b/g, ' minus $1 $2'],
  [/(^|[\s(])-(\d{3,4})\b/g, '$1minus $2'],
  [/\b([ACGT])>([ACGT])\b/g, '$1 to $2'],
  [/\bHLA\b/g, 'H L A'],
  [/\brs(\d+)/g, (m, d) => 'r s ' + d.split('').join(' ')],
  [/\*(\d+)([A-Z]?)\s*\/\s*\*(\d+)([A-Z]?)/g, (m, a, x, b, y) => ` star ${num(a)}${x ? ' ' + x : ''}, star ${num(b)}${y ? ' ' + y : ''}`],
  [/\*(\d+)([A-Z]?)\b/g, (m, a, x) => ` star ${num(a)}${x ? ' ' + x : ''}`],
  [/\b(\d)([A-Z])(\d{1,2})\b/g, (m, a, b, c) => `${num(a)} ${b} ${num(c)}`],
  [/\b(\d)([A-Z])\b/g, (m, a, b) => `${num(a)} ${b}`],
  [/\bmg\/m2\b/g, 'milligrams per square meter'], [/\bmg\b/g, 'milligrams'], [/(\d)%/g, '$1 percent'],
  [/≥/g, ' at least '], [/≤/g, ' at most '], [/→/g, ' leads to '], [/[↑]/g, ' more '], [/[↓]/g, ' less '],
  [/\be\.g\./g, 'for example'], [/\bi\.e\./g, 'that is'], [/\bvs\.?\b/g, 'versus'], [/ \/ /g, ' or '],
  [/[()]/g, ', '], [/\s*;\s*/g, '; '], [/\s+([,.;:])/g, '$1'], [/,([.;:])/g, '$1'], [/;\s*,/g, ';'], [/,\s*,/g, ','], [/\s+/g, ' ']];
const say = t => RULES.reduce((x, [re, r]) => x.replace(re, r), strip(t)).trim();
const q = [];
for (const f of fs.readdirSync('walk').filter(f => f.startsWith('guide4-')).sort()) {
  const d = JSON.parse(fs.readFileSync('walk/' + f)); d.segs.forEach((s, i) => q.push({file: `gw-${d.id}-${i}.mp3`, text: s.text.replace(/\s+/g, ' ').trim()}));
}
const ctx = {TOPICS: [], QUESTIONS: [], console}; vm.createContext(ctx);
for (const l of ['L18', 'L19', 'L20', 'L21', 'L22']) vm.runInContext(fs.readFileSync(`q_${l}.js`, 'utf8'), ctx);
for (const x of ctx.QUESTIONS) { if (!x.teach || x.lowYield || x.dupOf) continue;
  const t = Array.isArray(x.teach) ? x.teach.map(y => y.t).join(' ') : x.teach; q.push({file: `q-${x.id}.mp3`, text: say(t)}); }
const sx = {console}; vm.createContext(sx); vm.runInContext(fs.readFileSync('steps4.js', 'utf8') + ';this.R=STEPS3', sx);
for (const k of ['warfarin-target', 'warfarin-genotype', 'naranjo-case']) sx.R[k].steps.forEach((s, i) => q.push({file: `s3-${k}-${i}.mp3`, text: say(s.t)}));
for (const id of ['furuta-1998', 'katzung-5']) { const l = JSON.parse(fs.readFileSync(`readings/${id}.json`)).listen;
  q.push({file: `rd-${id}.mp3`, text: (typeof l === 'string' ? l : l.map(y => typeof y === 'string' ? y : y.t).join(' ')).replace(/\s+/g, ' ').trim()}); }
process.stdout.write(JSON.stringify(q, null, 0));
