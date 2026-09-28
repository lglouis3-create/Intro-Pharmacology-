#!/usr/bin/env python3
"""Generate q_DL1.js from the Exam 1 drug list (Exam_1_Drug_List_2026.pdf, Table 1).

Every mechanism string in MOA is the PDF's row, shortened only in punctuation.
Explanations answer one question: what does it mean for this drug to be a
<class> at <receptor>?  The class meaning comes from Katzung 16e Ch. 2 and the
receptor's action from Katzung 16e Ch. 6, Table 6-2; each is one sentence."""
import json

CITE = 'Exam_1_Drug_List_2026.pdf, Table 1'
K2 = 'Katzung 16e, Ch. 2'
K6 = 'Katzung 16e, Ch. 6'

# drug -> (mechanism as listed, subtopic, class key, receptor keys)
MOA = {
 'Norepinephrine': ('α1, α2, β1 and β2 agonist', 'adr', 'agonist', ['a1', 'a2', 'b1', 'b2']),
 'Epinephrine': ('α1, α2, β1 and β2 agonist', 'adr', 'agonist', ['a1', 'a2', 'b1', 'b2']),
 'Acetylcholine': ('Muscarinic (M1, M2, M3) and nicotinic (Nn, Nm) agonist', 'chol', 'agonist', ['m', 'n']),
 'Tropicamide': ('Muscarinic (M1, M2, M3) antagonist, reversible', 'chol', 'antagonist', ['m']),
 'Prazosin': ('α1 antagonist, reversible', 'adr', 'antagonist', ['a1']),
 'Phenylephrine': ('α1 agonist', 'adr', 'agonist', ['a1']),
 'Phenoxybenzamine': ('α1 and α2 antagonist, irreversible', 'adr', 'irreversible', ['a1', 'a2']),
 'Metoprolol': ('β1 antagonist, reversible', 'adr', 'antagonist', ['b1']),
 'Diazepam': ('GABA receptor allosteric agonist', 'gaba', 'allosteric', ['gaba']),
 'Albuterol': ('β2 partial agonist', 'adr', 'partial', ['b2']),
 'Varenicline': ('Nicotinic (Nn) partial agonist', 'chol', 'partial', ['nn']),
 'Histamine': ('Histamine H1 and H2 agonist', 'hist', 'agonist', ['h']),
 'Loratadine': ('Histamine H1 inverse agonist', 'hist', 'inverse', ['h']),
 'Pindolol': ('β1 and β2 partial agonist', 'adr', 'partial', ['b1', 'b2']),
 'Diphenhydramine': ('Non-selective histamine receptor antagonist', 'hist', 'antagonist', ['h']),
}
owner = {}
for d, (m, *_rest) in MOA.items():
    owner.setdefault(m, []).append(d)

# What each drug class means (Katzung 16e Ch. 2). One sentence each.
CLASS = {
 'agonist': ('Receptors mediate the actions of agonists and antagonists',
             'An agonist binds the receptor and activates it, so the receptor signals as a direct result of the binding.'),
 'antagonist': ('Competitive & Irreversible Antagonists',
             'A reversible (competitive) antagonist binds the receptor without activating it and blocks the agonist; enough agonist can surmount the block, so the agonist curve shifts right with the same maximum.'),
 'irreversible': ('Competitive & Irreversible Antagonists',
             'An irreversible antagonist binds the receptor irreversibly (sometimes covalently), so no agonist concentration can surmount the block and the maximal agonist effect falls; the block lasts until new receptors are made.'),
 'partial': ('Partial Agonists',
             'A partial agonist activates the receptor but produces a lower maximal response at full receptor occupancy than a full agonist does, and it competes with a full agonist for the same sites.'),
 'inverse': ('Competitive & Irreversible Antagonists',
             'An inverse agonist binds the receptor and lowers its activity below the basal level seen with no agonist present, rather than merely blocking the agonist.'),
 'allosteric': ('Competitive & Irreversible Antagonists — allosteric modulators',
             'Benzodiazepines such as diazepam bind an allosteric site, separate from the site GABA binds, and potentiate GABA’s opening of the channel; they have little effect on their own.'),
}
# What each receptor does when a ligand binds it (Katzung 16e Ch. 6, Table 6-2).
RECEPTOR = {
 'a1': 'α1 receptors sit on effector cells, especially smooth muscle; ligand binding forms IP3 and DAG and raises intracellular calcium, which contracts the muscle.',
 'a2': 'α2 receptors sit on presynaptic adrenergic nerve terminals, platelets and smooth muscle; ligand binding inhibits adenylyl cyclase and lowers cAMP.',
 'b1': 'β1 receptors sit especially on the heart; ligand binding stimulates adenylyl cyclase and raises cAMP, which speeds the sinoatrial node and increases contractility.',
 'b2': 'β2 receptors sit especially on smooth muscle; ligand binding stimulates adenylyl cyclase and raises cAMP, which relaxes bronchiolar smooth muscle.',
 'm':  'M1 and M3 receptors signal through IP3, DAG and calcium; M2 receptors open potassium channels and inhibit adenylyl cyclase (myocardium).',
 'n':  'Nicotinic receptors are ligand-gated channels: binding opens sodium and potassium channels and depolarizes the cell (Nn on postganglionic neurons, Nm at the skeletal muscle end plate).',
 'nn': 'The Nn receptor on postganglionic neurons is a ligand-gated channel: binding opens sodium and potassium channels and depolarizes the neuron.',
 'gaba': 'The GABA receptor is an ion channel that the neurotransmitter GABA opens.',
 'h':  'Histamine activates more than one receptor subtype, and each subtype can couple to a different G protein, which is what lets a drug be selective for one subtype.',
}
RECEPTOR_SRC = {'h': (K2, 'Receptor Classes & Drug Development'), 'gaba': (K2, 'Competitive & Irreversible Antagonists — allosteric modulators')}

def reading_for(cls, recs):
    out = []
    if cls:
        sec, t = CLASS[cls]
        out.append({'src': K2, 'sec': sec, 't': t})
    for r in recs:
        src, sec = RECEPTOR_SRC.get(r, (K6, 'Autonomic Receptors, Table 6-2'))
        out.append({'src': src, 'sec': sec, 't': RECEPTOR[r]})
    return out[:2] if cls else out[:2]

NOTE = {
 'moa-diazepam': 'Katzung Ch. 2 calls diazepam a positive allosteric modulator of the GABA receptor, one that potentiates GABA and has little activating effect on its own; the Exam 1 drug list classes it as a GABA receptor allosteric agonist. The exam is written from the drug list.',
}

def lc(m):
    return m if m.startswith('GABA') else m[0].lower() + m[1:]

# Short "what it means" line per drug, built from the list's own row plus the
# one drug it is most often confused with.
TEACH = {
 'Norepinephrine': 'Norepinephrine activates all four adrenoceptors on the list (α1, α2, β1, β2). Phenylephrine activates α1 alone.',
 'Epinephrine': 'Epinephrine, like norepinephrine, activates α1, α2, β1 and β2. The selective drugs on the list act at one or two of these.',
 'Acetylcholine': 'Acetylcholine activates both cholinergic receptor families: muscarinic (M1, M2, M3) and nicotinic (Nn, Nm). Tropicamide blocks the muscarinic ones; varenicline partially activates Nn.',
 'Tropicamide': 'Tropicamide binds M1, M2 and M3 without activating them and blocks acetylcholine there; the block is reversible.',
 'Prazosin': 'Prazosin binds α1 without activating it and blocks agonists there reversibly. Phenoxybenzamine also blocks α1, but irreversibly and at α2 too.',
 'Phenylephrine': 'Phenylephrine binds α1 and activates it; it does not act at α2 or β receptors. Prazosin binds the same receptor and blocks it.',
 'Phenoxybenzamine': 'Phenoxybenzamine binds α1 and α2 irreversibly, so the block cannot be overcome by more agonist. It is the only irreversible drug on the list; every other drug is reversible and competitive.',
 'Metoprolol': 'Metoprolol binds β1 without activating it and blocks agonists there reversibly. Pindolol acts at β1 too, but as a partial agonist and at β2 as well.',
 'Diazepam': 'Diazepam binds the GABA receptor at an allosteric site, not the site GABA binds, and increases the receptor’s response to GABA.',
 'Albuterol': 'Albuterol activates β2 but reaches a lower maximal response than a full agonist would. It does not act at β1; pindolol is the partial agonist that does.',
 'Varenicline': 'Varenicline activates the neuronal nicotinic receptor Nn, but only to a submaximal response. Acetylcholine is the full agonist at Nn and at the other cholinergic receptors.',
 'Histamine': 'Histamine activates both H1 and H2. Loratadine and diphenhydramine oppose it: loratadine as an H1 inverse agonist, diphenhydramine as a non-selective antagonist.',
 'Loratadine': 'Loratadine binds H1 and lowers its activity below baseline (inverse agonist). Diphenhydramine blocks histamine receptors without selectivity.',
 'Pindolol': 'Pindolol activates β1 and β2, but only to a submaximal response, so it is a partial agonist. Metoprolol blocks β1 outright; albuterol is partial at β2 only.',
 'Diphenhydramine': 'Diphenhydramine binds histamine receptors without activating them and without selecting one subtype. Loratadine is selective for H1 and is an inverse agonist.',
}

qs = []
n = 0
def add(q):
    global n
    q = dict(id=f'DL1-{n+1:03d}', lecture='DL1', prof='Gottlieb', tier='new', topic='DL1', skill='drug', source='slide', cite=CITE, **q)
    if q['concept'] in NOTE:
        q['note'] = NOTE[q['concept']]
    opts = q['options']
    right = [o for o in opts if o['correct']]
    L = max(len(o['t']) for o in opts)
    if not q.get('multi') and len(right[0]['t']) == L and sum(1 for o in opts if len(o['t']) == L) == 1:
        raise SystemExit(f"{q['id']}: correct option is the longest")
    n += 1
    qs.append(q)

def why_wrong(m, d):
    ds = owner.get(m, [])
    if not ds:
        return 'No drug on the Exam 1 list has this mechanism.'
    return f'That is {" and ".join(x.lower() for x in ds)}; {d.lower()} is listed as {lc(MOA[d][0])}.'

# distractors per drug: look-alike rows on the same list
DIS = {
 'Norepinephrine': ['α1 agonist', 'β1 and β2 partial agonist', 'α1 and α2 antagonist, irreversible'],
 'Epinephrine': ['β2 partial agonist', 'α1 agonist', 'α1 and α2 antagonist, irreversible'],
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

for d, (m, sub, cls, recs) in MOA.items():
    if d == 'Acetylcholine':
        add({'sub': sub, 'concept': 'moa-acetylcholine', 'tags': ['drug-list'],
             'stem': 'Acetylcholine is an agonist at which receptors?',
             'options': [
              {'t': 'M1, M2, M3, Nn and Nm', 'correct': True, 'why': 'Acetylcholine activates both receptor families: muscarinic (M1, M2, M3) and nicotinic (Nn, Nm).'},
              {'t': 'M1, M2 and M3 only', 'correct': False, 'why': 'Leaves out the nicotinic receptors; M1, M2 and M3 alone are the receptors tropicamide blocks.'},
              {'t': 'Nn only', 'correct': False, 'why': 'Nn alone is where varenicline is a partial agonist; acetylcholine acts at all five listed receptors.'},
              {'t': 'Nn and Nm only', 'correct': False, 'why': 'Leaves out the muscarinic receptors M1, M2 and M3.'},
              {'t': 'M1, M2, M3, Nn, Nm, H1 and H2', 'correct': False, 'why': 'H1 and H2 are histamine receptors, listed for histamine, not acetylcholine.'}],
             'teach': TEACH[d], 'reading': reading_for(None, ['m', 'n']),
             'quote': 'Acetylcholine — Agonist at muscarinic receptors (M1, M2, M3) and nicotinic receptors (Nn, Nm)'})
        continue
    opts = [{'t': m, 'correct': True, 'why': f'{d} is listed as {lc(m)}.'}]
    for x in DIS[d]:
        opts.append({'t': x, 'correct': False, 'why': why_wrong(x, d)})
    add({'sub': sub, 'concept': f'moa-{d.lower()}', 'tags': ['drug-list'],
         'stem': f'Which of the following describes the mechanism of action of {d.lower()}?',
         'options': opts, 'teach': TEACH[d], 'reading': reading_for(cls, recs), 'quote': f'{d} — {m}'})

add({'sub': 'adr', 'concept': 'irreversible-drug', 'tags': ['drug-list'],
     'stem': 'Phenoxybenzamine differs from every other drug on the Exam 1 list in which way?',
     'options': [
      {'t': 'It binds its receptors irreversibly', 'correct': True, 'why': 'The list states all its drugs are reversible and competitive at their receptors, with one exception: phenoxybenzamine, which is irreversible.'},
      {'t': 'It is a partial agonist at β receptors', 'correct': False, 'why': 'That describes pindolol (β1 and β2) and albuterol (β2).'},
      {'t': 'It is selective for the α1 receptor', 'correct': False, 'why': 'Phenoxybenzamine blocks α1 and α2. The α1-selective drugs on the list are prazosin (antagonist) and phenylephrine (agonist).'},
      {'t': 'It acts at an allosteric site on its receptor', 'correct': False, 'why': 'The list gives an allosteric mechanism only for diazepam at the GABA receptor.'}],
     'teach': TEACH['Phenoxybenzamine'], 'reading': reading_for('irreversible', []),
     'quote': 'All drugs listed are reversible and act competitively at their receptors, with one exception: phenoxybenzamine, which is irreversible.'})

def rev(concept, sub, stem, right, wrongs, cls, recs):
    opts = [{'t': right, 'correct': True, 'why': f'{right} is listed as {lc(MOA[right][0])}.'}]
    for w in wrongs:
        opts.append({'t': w, 'correct': False, 'why': f'{w} is listed as {lc(MOA[w][0])}.'})
    add({'sub': sub, 'concept': concept, 'tags': ['drug-list'], 'stem': stem, 'options': opts,
         'teach': TEACH[right], 'reading': reading_for(cls, recs), 'quote': f'{right} — {MOA[right][0]}'})

rev('moa-loratadine', 'hist', 'Which drug is a histamine H1 receptor inverse agonist?', 'Loratadine',
    ['Diphenhydramine', 'Histamine', 'Tropicamide', 'Diazepam'], 'inverse', ['h'])
rev('moa-varenicline', 'chol', 'Which drug is a partial agonist at the neuronal nicotinic (Nn) receptor?', 'Varenicline',
    ['Acetylcholine', 'Tropicamide', 'Albuterol', 'Pindolol'], 'partial', ['nn'])
rev('moa-phenylephrine', 'adr', 'Which drug is a selective α1 agonist?', 'Phenylephrine',
    ['Prazosin', 'Norepinephrine', 'Phenoxybenzamine', 'Albuterol'], 'agonist', ['a1'])
rev('moa-diazepam', 'gaba', 'Which drug acts as an allosteric agonist at the GABA receptor?', 'Diazepam',
    ['Loratadine', 'Varenicline', 'Tropicamide', 'Metoprolol'], 'allosteric', [])
rev('moa-metoprolol', 'adr', 'Which drug is a reversible β1 antagonist?', 'Metoprolol',
    ['Pindolol', 'Albuterol', 'Prazosin', 'Phenoxybenzamine'], 'antagonist', ['b1'])
rev('moa-tropicamide', 'chol', 'Which drug is a reversible antagonist at muscarinic M1, M2 and M3 receptors?', 'Tropicamide',
    ['Acetylcholine', 'Varenicline', 'Diphenhydramine', 'Prazosin'], 'antagonist', ['m'])

def sata(concept, sub, stem, rights, wrongs, teach, cls):
    opts = [{'t': r, 'correct': True, 'why': f'{r} is listed as {lc(MOA[r][0])}.'} for r in rights]
    opts += [{'t': w, 'correct': False, 'why': f'{w} is listed as {lc(MOA[w][0])}.'} for w in wrongs]
    add({'sub': sub, 'concept': concept, 'tags': ['drug-list', 'list'], 'multi': True,
         'stem': stem + ' Select all that apply.', 'options': opts, 'teach': teach,
         'reading': reading_for(cls, []) if cls else None, 'quote': '; '.join(f'{r} — {MOA[r][0]}' for r in rights)})

sata('partial-agonists', 'gen', 'Which drugs on the Exam 1 list are partial agonists?', ['Albuterol', 'Varenicline', 'Pindolol'],
     ['Metoprolol', 'Loratadine', 'Phenylephrine'],
     'Three drugs on the list are partial agonists: albuterol (β2), varenicline (Nn) and pindolol (β1 and β2). Loratadine is an inverse agonist, metoprolol an antagonist, phenylephrine a full α1 agonist.', 'partial')
sata('alpha1-drugs', 'adr', 'Which drugs on the Exam 1 list act at the α1 receptor?', ['Norepinephrine', 'Prazosin', 'Phenylephrine', 'Phenoxybenzamine'],
     ['Metoprolol', 'Albuterol'],
     'Five rows name α1: norepinephrine and epinephrine (agonists at α1, α2, β1, β2), phenylephrine (α1 agonist), prazosin (α1 antagonist) and phenoxybenzamine (α1 and α2 antagonist, irreversible). Metoprolol and albuterol act at β receptors only.', None)
sata('antagonists-list', 'gen', 'Which drugs on the Exam 1 list are antagonists?', ['Tropicamide', 'Prazosin', 'Metoprolol', 'Diphenhydramine'],
     ['Loratadine', 'Pindolol', 'Diazepam'],
     'The antagonists on the list are tropicamide, prazosin, phenoxybenzamine, metoprolol and diphenhydramine. Loratadine is classed as an inverse agonist, pindolol as a partial agonist and diazepam as an allosteric agonist.', 'antagonist')
sata('histamine-drugs', 'hist', 'Which drugs on the Exam 1 list act at histamine receptors?', ['Histamine', 'Loratadine', 'Diphenhydramine'],
     ['Tropicamide', 'Diazepam', 'Varenicline'],
     'Histamine (H1 and H2 agonist), loratadine (H1 inverse agonist) and diphenhydramine (non-selective histamine receptor antagonist) are the histamine-receptor drugs on the list.', None)
sata('beta-drugs', 'adr', 'Which drugs on the Exam 1 list act at β2 receptors?', ['Epinephrine', 'Albuterol', 'Pindolol'],
     ['Metoprolol', 'Phenylephrine', 'Prazosin'],
     'β2 appears in the rows for norepinephrine, epinephrine, albuterol and pindolol. Metoprolol is β1 only; phenylephrine and prazosin act at α1.', None)

for q in qs:
    if q.get('reading') is None:
        q.pop('reading', None)

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
