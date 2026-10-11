#!/usr/bin/env python3
"""Generate drugs.js: every drug of both exams in one table (the "All drugs" page).

Nothing here is written by hand.  The rows come from the two reference pages that
were checked against the lists and his slides:
  reference.js   <h3 id="ref-druglist">  Exam 1 drug list (Exam_1_Drug_List_2026.pdf, Table 1)
  reference2.js  section 3 (<h4 id="ref2-*">)  Exam 2 drug tables (list + slides + transcripts)
The class of each Exam 2 row is the colour the official Exam 2 list gives the drug
(gen_druglist2.py ROWS: green agonist, red antagonist, blue indirect antagonist,
purple donor); the names the list carries that his tables leave out are listed
beside the row they belong to.  The class of an Exam 1 row is the word the Exam 1
list uses (agonist, partial agonist, antagonist, inverse agonist, allosteric).
The receptor families are read from each row's receptor text.

Run from src/:  python3 gen_drugs.py
"""
import json, re, os, sys

here = os.path.dirname(os.path.abspath(__file__))
ref1 = open(os.path.join(here, 'reference.js'), encoding='utf-8').read()
ref2 = open(os.path.join(here, 'reference2.js'), encoding='utf-8').read()
gen2 = open(os.path.join(here, 'gen_druglist2.py'), encoding='utf-8').read()

TD = re.compile(r'<td>(.*?)</td>', re.S)
strip = lambda s: re.sub(r'<[^>]+>', '', s)
def base(name):
    """'Tamsulosin (Flomax) → α1a' -> 'tamsulosin'; 'Curare & curare-like' -> 'curare'."""
    return re.split(r'[\s(–\-→&/]', name.strip())[0].lower()

# ---- the official Exam 2 list: drug names and the colour the list prints them in ----
LIST = []   # (section, colour, [names])
for m in re.finditer(r"dict\(sec='(\w+)', page='[^']*', colour='([^']*)', drugs=\[([^\]]*)\]", gen2):
    names = re.findall(r"'([^']*)'", m.group(3))
    LIST.append((m.group(1), m.group(2), names))
assert LIST, 'no ROWS parsed from gen_druglist2.py'

COLOUR = {'agonist': ('agonist', 'Agonist'), 'antagonist': ('antagonist', 'Antagonist'),
          'indirect antagonist': ('indirect', 'Indirect (enzyme, transporter or release)'), 'donor': ('donor', 'Donor')}

def families(rec, moa=''):
    t = strip(rec)
    if re.match(r'\s*None', t): return ['No receptor: enzyme, transporter or release']
    fam = []
    # "not nicotinic" names what the drug does not bind; α4/β2 are nicotinic subunits, not adrenergic receptors
    t = re.sub(r'not nicotinic|α4/β2', '', t)
    s = t + ' ' + re.sub(r'not nicotinic|α4/β2', '', strip(moa))
    if re.search(r'\bN[nm]\b|nicotinic', s, re.I): fam.append('Nicotinic')
    if re.search(r'\bM[123]\b|muscarinic', s, re.I): fam.append('Muscarinic')
    if 'α' in t: fam.append('α adrenergic')
    if 'β' in t: fam.append('β adrenergic')
    if re.search(r'\bH[12]\b|histamine', s, re.I): fam.append('Histamine')
    if 'GABA' in s: fam.append('GABA')
    if 'AT1' in t: fam.append('Angiotensin AT1')
    if re.search(r'\bMR\b|mineralocorticoid', s, re.I): fam.append('Mineralocorticoid')
    if 'serotonin' in t.lower(): fam.append('Serotonin')
    return fam or ['Other']

def subtypes(moa):
    s = strip(moa).lower(); out = []
    for k, lab in [('partial', 'partial'), ('inverse', 'inverse'), ('allosteric', 'allosteric'), ('irreversible', 'irreversible'),
                   ('non-depolarizing', 'non-depolarizing'), ('depolarizing', 'depolarizing'), ('release of', 'releaser'),
                   ('reuptake', 'reuptake block'), ('ache', 'AChE inhibitor'), ('mao', 'MAO inhibitor'), ('renin inhibitor', 'renin inhibitor'),
                   ('(ace) inhibitor', 'ACE inhibitor'), ('phosphodiesterase', 'PDE inhibitor'), ('cleaves snare', 'blocks ACh release'), ('no donor', 'NO donor')]:
        if k in s and lab not in out and not (lab == 'depolarizing' and 'non-depolarizing' in out): out.append(lab)
    return out

rows = []
# ---- Exam 2: section 3 of reference2.js ----
sec3 = ref2[ref2.index('<h3 id="ref2-3">'):ref2.index('<h3 id="ref2-4">')]
cur = None
for line in sec3.split('\n'):
    h = re.match(r'<h4 id="(ref2-\w+)">(.*?)</h4>', line)
    if h: cur = (h.group(1), strip(h.group(2))); continue
    if not line.startswith('<tr><td>'): continue
    cells = TD.findall(line)
    assert len(cells) == 6, cells[0]
    name, moa, rec, soa, adr, why = cells
    key = re.search(r'data-xpick="([^"]+)"', name).group(1)
    name = re.sub(r'\s*<button.*?</button>', '', name)
    low = strip(name).lower()
    hits = [(sec, col, names) for sec, col, names in LIST if any(base(n) in low for n in names)]
    cols = {c for _, c, _ in hits}
    if len(cols) > 1: sys.exit(f'{key}: more than one list colour {cols}')
    col = cols.pop() if cols else None
    if col is None and 'not on the drug list' not in low: sys.exit(f'{key}: not found on the list')
    also = [n for _, _, names in hits for n in names if '(printed' not in n]
    cls = COLOUR[col] if col else ('slide', 'On a slide, not on the list')
    rows.append(dict(id=key, exam=2, anchor=cur[0], sec=cur[1], name=name, cls=cls[0], clsLabel=cls[1], sub=subtypes(moa),
                     fam=families(rec, moa), moa=moa, rec=rec, soa=soa, adr=adr, why=why, also=also))

# a list name is "also" only when no table row names it (spelling variants: nitroglycerine, lisdexamphetamine)
norm = lambda x: x.lower().replace('ph', 'f').rstrip('e')
named = ' '.join(strip(r['name']).lower().replace('ph', 'f') for r in rows)
for r in rows:
    out = []
    for n in r['also']:
        if norm(base(n)) in named or norm(base(n)) in [norm(base(a)) for a in out]: continue
        out.append(re.sub(r'\s*→.*$', '', n))
    r['also'] = out

# ---- Exam 1: the drug-list table of reference.js ----
t1 = ref1[ref1.index('<h3 id="ref-druglist">'):]
t1 = t1[:t1.index('</table>')]
E1 = [('partial agonist', 'agonist', 'Partial agonist'), ('inverse agonist', 'inverse', 'Inverse agonist'), ('allosteric', 'allosteric', 'Allosteric agonist'),
      ('antagonist', 'antagonist', 'Antagonist'), ('agonist', 'agonist', 'Agonist')]
for line in t1.split('\n'):
    if not line.startswith('<tr><td>'): continue
    name, moa, famcol = TD.findall(line)
    low = strip(moa).lower()
    cls, lab = next((c, l) for k, c, l in E1 if k in low)
    if 'irreversible' in low: lab = 'Irreversible antagonist'
    rows.append(dict(id='e1:' + base(name), exam=1, anchor='ref-druglist', sec='Exam 1 drug list', name=name, cls=cls, clsLabel=lab, sub=subtypes(moa),
                     fam=families(moa), moa=moa, rec=strip(famcol), soa='', adr='', why='', also=[]))

# ---- the same drug on both lists ----
both = []
for r1 in [r for r in rows if r['exam'] == 1]:
    b = base(r1['name'])
    for r2 in [r for r in rows if r['exam'] == 2]:
        if re.search(r'\b' + re.escape(b), strip(r2['name']).lower()):
            both.append(dict(drug=strip(r1['name']), e1=r1['id'], e2=r2['id']))

# names on the official list that none of his tables carry
seen = ' '.join(strip(r['name']).lower() + ' ' + ' '.join(a.lower() for a in r['also']) for r in rows).replace('ph', 'f')
missing = sorted({re.sub(r'\s*\(.*', '', n) for _, _, names in LIST for n in names if norm(base(n)) not in seen and '(printed' not in n})

js = ('// Generated by gen_drugs.py from reference.js, reference2.js and the official Exam 2 list (gen_druglist2.py). Do not edit.\n'
      'const DRUGS_ALL = ' + json.dumps(rows, ensure_ascii=False, indent=0) + ';\n'
      'const DRUGS_BOTH = ' + json.dumps(both, ensure_ascii=False) + ';\n'
      'const DRUGS_LIST_ONLY = ' + json.dumps(missing, ensure_ascii=False) + ';\n')
open(os.path.join(here, 'drugs.js'), 'w', encoding='utf-8').write(js)
n2 = sum(r['exam'] == 2 for r in rows); n1 = len(rows) - n2
print(f'drugs.js: {n2} Exam 2 rows, {n1} Exam 1 rows, {len(both)} drugs on both lists, list-only names: {", ".join(missing) or "none"}')
if '-v' in sys.argv:
    for r in rows:
        print(f"{r['exam']} | {strip(r['name'])[:48]:48} | {r['clsLabel']:40} | {', '.join(r['sub']):28} | {', '.join(r['fam'])} | also: {', '.join(r['also'])}")
    for b in both: print('both:', b)
