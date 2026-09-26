#!/usr/bin/env python3
"""Generate q_DL1.js from the Exam 1 drug list (Exam_1_Drug_List_2026.pdf, Table 1).
Every mechanism string below is the PDF's row, shortened only in punctuation."""
import json

CITE = 'Exam_1_Drug_List_2026.pdf, Table 1'
MOA = {
 'Norepinephrine': ('α1, α2, β1 and β2 agonist', 'adr'),
 'Epinephrine': ('α1, α2, β1 and β2 agonist', 'adr'),
 'Acetylcholine': ('Muscarinic (M1, M2, M3) and nicotinic (Nn, Nm) agonist', 'chol'),
 'Tropicamide': ('Muscarinic (M1, M2, M3) antagonist, reversible', 'chol'),
 'Prazosin': ('α1 antagonist, reversible', 'adr'),
 'Phenylephrine': ('α1 agonist', 'adr'),
 'Phenoxybenzamine': ('α1 and α2 antagonist, irreversible', 'adr'),
 'Metoprolol': ('β1 antagonist, reversible', 'adr'),
 'Diazepam': ('GABA receptor allosteric agonist', 'gaba'),
 'Albuterol': ('β2 partial agonist', 'adr'),
 'Varenicline': ('Nicotinic (Nn) partial agonist', 'chol'),
 'Histamine': ('Histamine H1 and H2 agonist', 'hist'),
 'Loratadine': ('Histamine H1 inverse agonist', 'hist'),
 'Pindolol': ('β1 and β2 partial agonist', 'adr'),
 'Diphenhydramine': ('Non-selective histamine receptor antagonist', 'hist'),
}
owner = {}
for d, (m, _) in MOA.items():
    owner.setdefault(m, []).append(d)

# distractors per drug: chosen from look-alike rows on the same list
DIS = {
 'Norepinephrine': ['α1 agonist', 'β1 and β2 partial agonist', 'α1 and α2 antagonist, irreversible'],
 'Epinephrine': ['β2 partial agonist', 'α1 agonist', 'α1 and α2 antagonist, irreversible'],
 'Acetylcholine': ['Muscarinic (M1, M2, M3) antagonist, reversible', 'Nicotinic (Nn) partial agonist', 'Histamine H1 and H2 agonist'],
 'Tropicamide': ['Muscarinic (M1, M2, M3) and nicotinic (Nn, Nm) agonist', 'Nicotinic (Nn) partial agonist', 'Non-selective histamine receptor antagonist'],
 'Prazosin': ['α1 agonist', 'α1 and α2 antagonist, irreversible', 'β1 antagonist, reversible'],
 'Phenylephrine': ['α1 antagonist, reversible', 'α1, α2, β1 and β2 agonist', 'β2 partial agonist'],
 'Phenoxybenzamine': ['α1 antagonist, reversible', 'β1 and β2 partial agonist', 'Muscarinic (M1, M2, M3) antagonist, reversible'],
 'Metoprolol': ['β1 and β2 partial agonist', 'α1 antagonist, reversible', 'α1 and α2 antagonist, irreversible'],
 'Diazepam': ['Histamine H1 inverse agonist', 'Nicotinic (Nn) partial agonist', 'Non-selective histamine receptor antagonist'],
 'Albuterol': ['β1 and β2 partial agonist', 'β1 antagonist, reversible', 'α1, α2, β1 and β2 agonist'],
 'Varenicline': ['Muscarinic (M1, M2, M3) and nicotinic (Nn, Nm) agonist', 'Muscarinic (M1, M2, M3) antagonist, reversible', 'β2 partial agonist'],
 'Histamine': ['Histamine H1 inverse agonist', 'Non-selective histamine receptor antagonist', 'GABA receptor allosteric agonist'],
 'Loratadine': ['Non-selective histamine receptor antagonist', 'Histamine H1 and H2 agonist', 'Muscarinic (M1, M2, M3) antagonist, reversible'],
 'Pindolol': ['β1 antagonist, reversible', 'β2 partial agonist', 'α1 and α2 antagonist, irreversible'],
 'Diphenhydramine': ['Histamine H1 inverse agonist', 'Histamine H1 and H2 agonist', 'Muscarinic (M1, M2, M3) antagonist, reversible'],
}
TEACH = {
 'Prazosin': 'Prazosin and phenoxybenzamine both block α1. Prazosin is selective for α1 and reversible; phenoxybenzamine blocks α1 and α2 and is the only irreversible drug on the Exam 1 list.',
 'Phenoxybenzamine': 'The drug list states that every drug on it is reversible and competitive at its receptor with one exception, phenoxybenzamine, an irreversible α1 and α2 antagonist.',
 'Metoprolol': 'Metoprolol and pindolol both act at β receptors. Metoprolol is a β1 antagonist; pindolol is a partial agonist at β1 and β2.',
 'Pindolol': 'Pindolol is one of three partial agonists on the list (with albuterol and varenicline). It acts at both β1 and β2, where metoprolol blocks β1 only.',
 'Albuterol': 'Albuterol is a β2 partial agonist. The other β-receptor drugs on the list are pindolol (β1 and β2 partial agonist) and metoprolol (β1 antagonist).',
 'Loratadine': 'Loratadine and diphenhydramine both oppose histamine. The list classes loratadine as an H1 inverse agonist and diphenhydramine as a non-selective histamine receptor antagonist.',
 'Diphenhydramine': 'Diphenhydramine is listed as a non-selective histamine receptor antagonist; loratadine is listed as an H1 inverse agonist.',
 'Varenicline': 'Varenicline is a partial agonist at the neuronal nicotinic receptor (Nn). Acetylcholine is the full agonist at both muscarinic and nicotinic receptors.',
 'Tropicamide': 'Tropicamide blocks muscarinic M1, M2 and M3 receptors, the receptors at which acetylcholine is an agonist.',
 'Diazepam': 'Diazepam is the only drug on the list that acts at a GABA receptor, and the list classes it as an allosteric agonist.',
 'Phenylephrine': 'Phenylephrine is the α1-selective agonist on the list; norepinephrine and epinephrine are agonists at α1, α2, β1 and β2.',
}
def why_wrong(m):
    ds = owner.get(m, [])
    return f'This is the listed mechanism of {" and ".join(ds)}.' if ds else 'No drug on the Exam 1 list has this mechanism.'

qs = []
n = 0
def add(q):
    global n
    q = dict(id=f'DL1-{n+1:03d}', lecture='DL1', prof='Gottlieb', tier='new', topic='DL1', skill='drug', source='slide', cite=CITE, **q)
    opts = q['options']
    right = [o for o in opts if o['correct']]
    L = max(len(o['t']) for o in opts)
    if not q.get('multi') and len(right[0]['t']) == L and sum(1 for o in opts if len(o['t']) == L) == 1:
        raise SystemExit(f"{q['id']}: correct option is the longest")
    n += 1
    qs.append(q)

for d, (m, sub) in MOA.items():
    if d == 'Acetylcholine':
        add({'sub': sub, 'concept': 'moa-acetylcholine', 'tags': ['drug-list'],
             'stem': 'Acetylcholine is an agonist at which receptors?',
             'options': [
              {'t': 'M1, M2, M3, Nn and Nm', 'correct': True, 'why': 'Table 1: agonist at muscarinic receptors (M1, M2, M3) and nicotinic receptors (Nn, Nm).'},
              {'t': 'M1, M2 and M3 only', 'correct': False, 'why': 'Leaves out the nicotinic receptors; M1, M2 and M3 are the receptors tropicamide blocks.'},
              {'t': 'Nn only', 'correct': False, 'why': 'Nn is the receptor at which varenicline is a partial agonist; acetylcholine acts at all five listed receptors.'},
              {'t': 'Nn and Nm only', 'correct': False, 'why': 'Leaves out the muscarinic receptors M1, M2 and M3.'},
              {'t': 'M1, M2, M3, Nn, Nm, H1 and H2', 'correct': False, 'why': 'H1 and H2 are the receptors listed for histamine, not acetylcholine.'}],
             'teach': 'Acetylcholine is the agonist at both cholinergic receptor families on the list: muscarinic (M1, M2, M3) and nicotinic (Nn, Nm). Tropicamide blocks the muscarinic receptors and varenicline is a partial agonist at Nn.',
             'quote': 'Acetylcholine — Agonist at muscarinic receptors (M1, M2, M3) and nicotinic receptors (Nn, Nm)'})
        continue
    opts = [{'t': m, 'correct': True, 'why': f'Table 1 lists {d.lower()} as: {m}.'}]
    for x in DIS[d]:
        opts.append({'t': x, 'correct': False, 'why': why_wrong(x)})
    q = {'sub': sub, 'concept': f'moa-{d.lower()}', 'tags': ['drug-list'],
         'stem': f'Which of the following describes the mechanism of action of {d.lower()}?',
         'options': opts, 'quote': f'{d} — {m}'}
    q['teach'] = TEACH.get(d, f'{d}: {m}. All drugs on the Exam 1 list are reversible and competitive at their receptors except phenoxybenzamine.')
    add(q)

def rev(concept, sub, stem, right, wrongs, teach, quote):
    opts = [{'t': right, 'correct': True, 'why': f'Table 1: {right} — {MOA[right][0]}.'}]
    for w in wrongs:
        opts.append({'t': w, 'correct': False, 'why': f'Table 1 lists {w.lower()} as: {MOA[w][0]}.'})
    add({'sub': sub, 'concept': concept, 'tags': ['drug-list'], 'stem': stem, 'options': opts, 'teach': teach, 'quote': quote})

add({'sub': 'adr', 'concept': 'irreversible-drug', 'tags': ['drug-list'],
     'stem': 'Phenoxybenzamine differs from every other drug on the Exam 1 list in which way?',
     'options': [
      {'t': 'It binds its receptors irreversibly', 'correct': True, 'why': 'The list states all its drugs are reversible and competitive at their receptors, with one exception: phenoxybenzamine, which is irreversible.'},
      {'t': 'It is a partial agonist at β receptors', 'correct': False, 'why': 'That describes pindolol (β1 and β2) and albuterol (β2).'},
      {'t': 'It is selective for the α1 receptor', 'correct': False, 'why': 'Phenoxybenzamine blocks α1 and α2. The α1-selective drugs on the list are prazosin (antagonist) and phenylephrine (agonist).'},
      {'t': 'It acts at an allosteric site on its receptor', 'correct': False, 'why': 'The list gives an allosteric mechanism only for diazepam at the GABA receptor.'}],
     'teach': TEACH['Phenoxybenzamine'],
     'quote': 'All drugs listed are reversible and act competitively at their receptors, with one exception: phenoxybenzamine, which is irreversible.'})
rev('moa-loratadine', 'hist', 'Which drug is a histamine H1 receptor inverse agonist?', 'Loratadine',
    ['Diphenhydramine', 'Histamine', 'Tropicamide', 'Diazepam'], TEACH['Loratadine'], 'Loratadine — Histamine (H1) receptor inverse agonist')
rev('moa-varenicline', 'chol', 'Which drug is a partial agonist at the neuronal nicotinic (Nn) receptor?', 'Varenicline',
    ['Acetylcholine', 'Tropicamide', 'Albuterol', 'Pindolol'], TEACH['Varenicline'], 'Varenicline — Nicotinic receptor (Nn) partial agonist')
rev('moa-phenylephrine', 'adr', 'Which drug is a selective α1 agonist?', 'Phenylephrine',
    ['Prazosin', 'Norepinephrine', 'Phenoxybenzamine', 'Albuterol'], TEACH['Phenylephrine'], 'Phenylephrine — α1 agonist')
rev('moa-diazepam', 'gaba', 'Which drug acts as an allosteric agonist at the GABA receptor?', 'Diazepam',
    ['Loratadine', 'Varenicline', 'Tropicamide', 'Metoprolol'], TEACH['Diazepam'], 'Diazepam — GABA receptor allosteric agonist')
rev('moa-metoprolol', 'adr', 'Which drug is a reversible β1 antagonist?', 'Metoprolol',
    ['Pindolol', 'Albuterol', 'Prazosin', 'Phenoxybenzamine'], TEACH['Metoprolol'], 'Metoprolol — β1 antagonist (reversible)')
rev('moa-tropicamide', 'chol', 'Which drug is a reversible antagonist at muscarinic M1, M2 and M3 receptors?', 'Tropicamide',
    ['Acetylcholine', 'Varenicline', 'Diphenhydramine', 'Prazosin'], TEACH['Tropicamide'], 'Tropicamide — Muscarinic (M1, M2, M3) antagonist (reversible)')

def sata(concept, sub, stem, rights, wrongs, teach, quote):
    opts = [{'t': r, 'correct': True, 'why': f'Table 1: {r} — {MOA[r][0]}.'} for r in rights]
    opts += [{'t': w, 'correct': False, 'why': f'Table 1 lists {w.lower()} as: {MOA[w][0]}.'} for w in wrongs]
    add({'sub': sub, 'concept': concept, 'tags': ['drug-list', 'list'], 'multi': True,
         'stem': stem + ' Select all that apply.', 'options': opts, 'teach': teach, 'quote': quote})

sata('partial-agonists', 'gen', 'Which drugs on the Exam 1 list are partial agonists?', ['Albuterol', 'Varenicline', 'Pindolol'],
     ['Metoprolol', 'Loratadine', 'Phenylephrine'],
     'Three drugs on the list are partial agonists: albuterol (β2), varenicline (Nn) and pindolol (β1 and β2). Loratadine is an inverse agonist, metoprolol an antagonist, phenylephrine a full α1 agonist.',
     'Albuterol — β2 partial agonist · Varenicline — Nn partial agonist · Pindolol — β1 and β2 partial agonist')
sata('alpha1-drugs', 'adr', 'Which drugs on the Exam 1 list act at the α1 receptor?', ['Norepinephrine', 'Prazosin', 'Phenylephrine', 'Phenoxybenzamine'],
     ['Metoprolol', 'Albuterol'],
     'Five rows name α1: norepinephrine and epinephrine (agonists at α1, α2, β1, β2), phenylephrine (α1 agonist), prazosin (α1 antagonist) and phenoxybenzamine (α1 and α2 antagonist, irreversible). Metoprolol and albuterol act at β receptors only.',
     'Prazosin — α1 antagonist · Phenylephrine — α1 agonist · Phenoxybenzamine — α1 and α2 antagonist')
sata('antagonists-list', 'gen', 'Which drugs on the Exam 1 list are antagonists?', ['Tropicamide', 'Prazosin', 'Metoprolol', 'Diphenhydramine'],
     ['Loratadine', 'Pindolol', 'Diazepam'],
     'The antagonists on the list are tropicamide, prazosin, phenoxybenzamine, metoprolol and diphenhydramine. Loratadine is classed as an inverse agonist, pindolol as a partial agonist and diazepam as an allosteric agonist.',
     'Tropicamide, prazosin, phenoxybenzamine, metoprolol, diphenhydramine: antagonist rows of Table 1')
sata('histamine-drugs', 'hist', 'Which drugs on the Exam 1 list act at histamine receptors?', ['Histamine', 'Loratadine', 'Diphenhydramine'],
     ['Tropicamide', 'Diazepam', 'Varenicline'],
     'Histamine (H1 and H2 agonist), loratadine (H1 inverse agonist) and diphenhydramine (non-selective histamine receptor antagonist) are the histamine-receptor drugs on the list.',
     'Histamine — H1 and H2 agonist · Loratadine — H1 inverse agonist · Diphenhydramine — non-selective histamine receptor antagonist')
sata('beta-drugs', 'adr', 'Which drugs on the Exam 1 list act at β2 receptors?', ['Epinephrine', 'Albuterol', 'Pindolol'],
     ['Metoprolol', 'Phenylephrine', 'Prazosin'],
     'β2 appears in the rows for norepinephrine, epinephrine, albuterol and pindolol. Metoprolol is β1 only; phenylephrine and prazosin act at α1.',
     'Epinephrine — α1, α2, β1, β2 agonist · Albuterol — β2 partial agonist · Pindolol — β1 and β2 partial agonist')

out = ["TOPICS.push({id:'DL1', name:'Exam 1 drug list', prof:'Gottlieb', lecture:'DL1',",
       "  cite:'Exam_1_Drug_List_2026.pdf, Table 1 (15 drugs)',",
       "  subs:[{id:'adr', name:'Adrenergic drugs', cite:'Table 1'},{id:'chol', name:'Cholinergic drugs', cite:'Table 1'},",
       "        {id:'hist', name:'Histamine drugs', cite:'Table 1'},{id:'gaba', name:'GABA drug', cite:'Table 1'},",
       "        {id:'gen', name:'Across the list', cite:'Table 1'}]});",
       '/* Generated by gen_druglist.py from Exam_1_Drug_List_2026.pdf. Edit the generator, not this file. */',
       'QUESTIONS.push(']
out.append(',\n'.join(json.dumps(q, ensure_ascii=False) for q in qs))
out.append(');')
open('q_DL1.js', 'w', encoding='utf-8').write('\n'.join(out) + '\n')
print(len(qs), 'drug-list questions')
