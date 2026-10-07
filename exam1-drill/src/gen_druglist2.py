#!/usr/bin/env python3
"""Generate q_DL2.js (and notes/DL2.md) from the Exam 2 drug list.

Source table: Pharmacology_Exam_2_Drug_List.pdf, the course's official Exam 2
drug list (the PDF header credits Joshua Farias, Class of 2025), with columns Drug / MOA / SOA /
Side effects-ADRs / Extra-key information and sections Neuromuscular,
Cholinergic, Adrenergic, RAAS.  Colour code: green agonist, red antagonist,
blue indirect antagonist, purple donor.

Each drug's class and receptor is checked against Dr. Gottlieb's slides where
a slide names the drug (Autonomic Nervous System.pdf, PCOL-NMJ_PCOL_2026s_pptx.pdf,
PCOL-Cholinergic-26s.pdf).  Where list and slide disagree the slide wins and the
item carries a `note`; every disagreement is listed in notes/DL2.md.  Drugs no
slide names (the adrenergic and RAAS decks are not available yet) keep the
list's wording and are cited to the list only.

Posting rule: questions are posted only for topics whose slides and lecture
transcript have both been received. The nitric oxide/cGMP and RAAS items are
written but held back (HELD subs) until those decks and transcripts arrive; they
keep their ids so they return unchanged.  The adrenergic deck
(PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf) was taught on 10/6 from slide 1 through
mirtazapine (slide 32): adrenergic items whose drugs he taught that day are
posted (ADR_RELEASED, by concept); the rest (β agonists and blockers,
epinephrine, norepinephrine, dobutamine, isoproterenol, mirabegron,
phenoxybenzamine, mirtazapine's adverse reactions) stay held (HELD_CONCEPTS).

Transcript 10/6 (adrenergic deck slides 1–32): each released adrenergic item
carries his words as its quote, the deck slide and '; transcript 10/6' in its
cite and source 'both' (TQ6).

Transcript 10/5 (rest of the NMJ deck, whole cholinergic deck): every NMJ and
cholinergic item he discussed carries his words as its quote, '; transcript 10/5'
in its cite and source 'both'.  Where he is explicit he wins over list and slide
(the other version goes in a `note`); his exam-scope statements remove items
(REMOVED, ids kept) or rewrite them.

Run from src/:  python3 gen_druglist2.py
"""
import json, re, os

LIST = 'Pharmacology_Exam_2_Drug_List.pdf'
NMJ = 'PCOL-NMJ_PCOL_2026s_pptx.pdf'
CHO = 'PCOL-Cholinergic-26s.pdf'
ADR = 'PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf'
ANS = 'Autonomic Nervous System.pdf'

def cite(page, *slides):
    """page: list page (int or 'N–M'); slides: (deck, 'slide N' text) pairs."""
    s = f'{LIST} page {page}'
    for deck, sl in slides:
        s += f'; {deck} slide {sl}'
    return s

# --------------------------------------------------------------------------
# The table as parsed (one row per drug group on the list).
# status: 'slide' = class/receptor confirmed on the named slide(s);
#         'list'  = no slide names the drug; list wording kept, cited to list only.
# --------------------------------------------------------------------------
ROWS = [
 # ---------------- NEUROMUSCULAR ----------------
 dict(sec='nmj', page='1', colour='agonist', drugs=['Acetylcholine'],
      moa='Nicotinic & muscarinic; depolarizing agent (agonist)', soa='All over body',
      adr='DUMBBELSS', key='Diarrhea, Urination, Miosis, Bradycardia, Bronchial constriction, Emesis, Lacrimation, Salivation, Stimulation (CNS)',
      status='slide', slides=f'{NMJ} slides 7, 12; {ANS} slides 13, 24'),
 dict(sec='nmj', page='1', colour='agonist', drugs=['Varenicline (Chantix)'],
      moa='α4/β2 Nn partial agonist', soa='CNS (Nn)',
      adr='Headache, insomnia, suicidal thoughts, depression, flatulence', key='FDA warning of mood and behavioral changes; used for smoking cessation',
      status='slide', slides=f'{NMJ} slides 7–9'),
 dict(sec='nmj', page='1', colour='agonist', drugs=['Succinylcholine'],
      moa='Depolarizing agent (agonist) (neuromuscular blockade – nicotinic)', soa='NMJ (Nm); can affect autonomic (PNS / SNS) ganglia',
      adr='NMJ paralysis; hyperkalemia, HTN & arrhythmias, muscle pain (myalgia), hyperthermia',
      key='Phase 1: binds to ACh binding space and keeps all Na+ channels open (cannot repolarize). Phase 2: blocks Na+ channels (cannot depolarize)',
      status='slide', slides=f'{NMJ} slides 12, 19–26'),
 dict(sec='nmj', page='1', colour='indirect antagonist', drugs=['Physostigmine'],
      moa='Cholinesterase inhibitor (AChE antagonist)', soa='CNS & periphery', adr='DUMBBELSS',
      key='Penetrates CNS / cross BBB; treatment for anti-muscarinic poisoning (atropine)',
      status='slide', slides=f'{NMJ} slide 39'),
 dict(sec='nmj', page='1–2', colour='indirect antagonist', drugs=['Donepezil (Aricept)', 'Rivastigmine (Exelon)', 'Galantamine'],
      moa='Cholinesterase inhibitor (AChE antagonist)', soa='CNS & periphery', adr='DUMBBELSS',
      key='Lipophilic → cross BBB; used for dementia / Alzheimer’s; galantamine: longer t1/2 than physostigmine',
      status='slide', slides=f'{NMJ} slides 40–41'),
 dict(sec='nmj', page='2', colour='indirect antagonist', drugs=['Pyridostigmine', 'Neostigmine'],
      moa='Cholinesterase inhibitor (AChE antagonist)', soa='NMJ', adr='DUMBBELS; no CNS effects',
      key='DO NOT cross BBB; reverse the effects of curare / treatment of myasthenia gravis',
      status='slide', slides=f'{NMJ} slide 39'),
 dict(sec='nmj', page='2', colour='indirect antagonist', drugs=['Edrophonium'],
      moa='Cholinesterase inhibitor (AChE antagonist)', soa='NMJ', adr='DUMBBELS; no CNS effects',
      key='Used for diagnosis of myasthenia gravis or medication dose adjustments; short duration of action / reversible',
      status='slide', slides=f'{NMJ} slide 38'),
 dict(sec='nmj', page='2', colour='indirect antagonist', drugs=['Echothiophate'],
      moa='Organophosphate inhibitor of acetylcholinesterase enzyme', soa='M3 receptor in ciliary muscle (eye)',
      adr='Miosis and blurred vision, lacrimation, stinging / redness of eye', key='Ophthalmology treatment glaucoma',
      status='slide', slides=f'{NMJ} slides 42–45'),
 dict(sec='nmj', page='2', colour='antagonist', drugs=['Botulinum toxin (Botox)'],
      moa='Prevent ACh release', soa='Presynaptic terminal', adr='Muscle relaxation', key='Cleaves sites on SNARE protein',
      status='slide', slides=f'{NMJ} slides 46–50'),
 dict(sec='nmj', page='2', colour='antagonist', drugs=['Curare & curare-like', 'Mivacurium', 'Vecuronium', 'Rocuronium', 'Pancuronium', 'Tubocurarine'],
      moa='NON-depolarizing agent; direct competitive antagonist → binds to ACh binding space', soa='NMJ',
      adr='NMJ paralysis; histamine release, hypotension & tachycardia; no CNS effect',
      key='Doesn’t allow ACh to bind; ACh is required for muscle contraction',
      status='slide', slides=f'{NMJ} slides 10, 12, 19, 27–32'),
 # ---------------- CHOLINERGIC ----------------
 dict(sec='chol', page='2', colour='agonist', drugs=['Acetylcholine', 'Methacholine', 'Carbachol', 'Bethanechol'],
      moa='Non-selective muscarinic agonist (M1, M2, M3)', soa='Central and periphery', adr='DUMBBELSS', key='',
      status='slide', slides=f'{CHO} slides 11–13'),
 dict(sec='chol', page='3', colour='agonist', drugs=['Pilocarpine', 'Cevimeline'],
      moa='Non-selective muscarinic agonist (M1, M2, M3)', soa='Central and periphery', adr='DUMBBELSS',
      key='Treatment of dry mouth (enhance salivation) / glaucoma',
      status='slide', slides=f'{CHO} slides 11, 12, 14'),
 dict(sec='chol', page='3', colour='antagonist', drugs=['Atropine'],
      moa='Non-selective muscarinic antagonist (M1, M2, M3) = “anti-cholinergic”', soa='Central and periphery',
      adr='Anti-DUMBBELSS: tachycardia, mydriasis, constipation, dry mouth, bronchial dilation, drowsiness',
      key='Treatment of organophosphate poisoning (severe DUMBBELSS); treatment of muscarinic agonist overdose',
      status='slide', slides=f'{CHO} slides 17–20, 32; {NMJ} slide 44'),
 dict(sec='chol', page='3', colour='antagonist', drugs=['Scopolamine'],
      moa='Non-selective muscarinic antagonist (M1, M2, M3)', soa='CNS – penetrate CNS more rapidly',
      adr='Anti-DUMBBELSS (anti-emesis)', key='Used to treat motion sickness',
      status='slide', slides=f'{CHO} slides 17, 24'),
 dict(sec='chol', page='3', colour='antagonist', drugs=['Benztropine (Cogentin)'],
      moa='Non-selective muscarinic antagonist (M1, M2, M3)', soa='CNS', adr='Anti-DUMBBELSS', key='Used to treat Parkinson’s',
      status='slide', slides=f'{CHO} slide 25 (drug and use named; class from the deck section, slides 17–32)'),
 dict(sec='chol', page='3', colour='antagonist', drugs=['Tropicamide'],
      moa='Muscarinic antagonist', soa='Eyes', adr='Anti-DUMBBELSS', key='Used for pupil dilation (block M3)',
      status='slide', slides=f'{CHO} slide 26'),
 dict(sec='chol', page='3', colour='antagonist', drugs=['Ipratropium (Atrovent)'],
      moa='Non-selective muscarinic antagonist (M1, M2, M3)', soa='Lungs', adr='Anti-DUMBBELSS', key='Short-acting muscarinic antagonist (SAMA)',
      status='slide', slides=f'{CHO} slide 28'),
 dict(sec='chol', page='3', colour='antagonist', drugs=['Tiotropium (Spiriva)'],
      moa='SELECTIVE muscarinic antagonist (M1 & M3)', soa='Lungs', adr='Anti-DUMBBELSS; heart rate not affected because it does not target M2',
      key='Long-acting muscarinic antagonist (LAMA)',
      status='slide', slides=f'{CHO} slide 28'),
 dict(sec='chol', page='4', colour='antagonist', drugs=['Aclidinium', 'Umeclidinium'],
      moa='Muscarinic antagonist', soa='Lungs', adr='Anti-DUMBBELSS', key='Long-acting muscarinic antagonist (LAMA)',
      status='slide', slides=f'{CHO} slide 28 (high affinity for M3; LAMA label is list only)'),
 dict(sec='chol', page='4', colour='antagonist', drugs=['Oxybutynin (Ditropan)', 'Tolterodine (Detrol)', 'Fesoterodine (Toviaz)', 'Solifenacin (Vesicare)', 'Darifenacin', 'Trospium'],
      moa='Non-selective muscarinic antagonist (M1, M2, M3); all are more selective for M3', soa='M3 in bladder',
      adr='All have potential to cause anti-DUMBBELSS; xerostomia and constipation (M3)',
      key='Solifenacin, darifenacin and trospium are most selective for M3 → least likely to cause anti-DUMBBELSS; used to treat overactive bladder',
      status='slide', slides=f'{CHO} slides 29–30'),
 dict(sec='chol', page='4', colour='donor', drugs=['Nitroglycerine', 'Nitroprusside', 'Isosorbide di / mononitrate'],
      moa='Donate nitric oxide; NO → sGC → ↑cGMP', soa='Endothelium of blood vessels (M3)', adr='Vasodilation; lower blood pressure',
      key='cGMP is a potent vasodilator', status='list', slides=''),
 dict(sec='chol', page='4', colour='indirect antagonist', drugs=['Sildenafil (Viagra)', 'Tadalafil (Cialis)', 'Vardenafil'],
      moa='Blocks PDE → increase cGMP', soa='Endothelium of blood vessels (M3)', adr='Vasodilation; lower blood pressure',
      key='Blocks enzyme that breaks down cGMP = more cGMP; used to treat erectile dysfunction', status='list', slides=''),
 # ---------------- ADRENERGIC ----------------
 dict(sec='adr', page='4', colour='agonist', drugs=['Phenylephrine'],
      moa='α1 agonist', soa='Blood vessels; eyes', adr='HTN, burning & nasal discharge, rebound congestion',
      key='Used as nasal decongestant and ophthalmics (mydriasis); down-reg → rebound congestion; avoid in patients with HTN',
      status='slide', slides=f'{ADR} slides 9, 17–18 (10/6)'),
 dict(sec='adr', page='5', colour='indirect antagonist', drugs=['Cocaine'],
      moa='NE reuptake inhibitor', soa='CNS', adr='HTN, tachycardia, arrythmias, restlessness',
      key='Used with lidocaine to control arrythmias (Na+ channel blocker)', status='slide', slides=f'{ADR} slides 9–10 (10/6; CONFLICT on the lidocaine use)'),
 dict(sec='adr', page='5', colour='indirect antagonist', drugs=['Dextroamphetamine & amphetamine (Adderall)', 'Methylphenidate (Concerta, Ritalin)', 'Lisdexamphetamine (Vyvanse)', 'Dexmethylphenidate (Focalin)'],
      moa='Stimulate pre-synaptic release of NE & DA', soa='CNS', adr='HTN, tachycardia, arrythmias, restlessness, loss of appetite',
      key='Used for ADHD', status='slide', slides=f'{ADR} slides 9, 11–12 (10/6)'),
 dict(sec='adr', page='5', colour='indirect antagonist', drugs=['Phenelzine'],
      moa='Non-selective MAO-A & MAO-B irreversible antagonist (printed “MOA-A & MOA-B”)', soa='CNS', adr='HTN, tachycardia, arrythmias, restlessness',
      key='Inhibits breakdown of NE; serious ADR → HTN crisis due to dietary tyramine', status='slide', slides=f'{ADR} slides 13–15 (10/6)'),
 dict(sec='adr', page='5', colour='indirect antagonist', drugs=['Selegiline', 'Rasagiline'],
      moa='SELECTIVE MAO-B irreversible antagonist', soa='CNS', adr='HTN, tachycardia, arrythmias, restlessness',
      key='Inhibits breakdown of NE; used for depression & Parkinson’s', status='slide', slides=f'{ADR} slides 14–15 (10/6; selegiline only, rasagiline not on a slide)'),
 dict(sec='adr', page='5', colour='antagonist', drugs=['Prazosin', 'Terazosin (Hytrin)', 'Doxazosin (Cardura)', 'Tamsulosin (Flomax) → α1a'],
      moa='SELECTIVE α1 antagonist, reversible', soa='Brain, eye, nose, blood vessels, urethra',
      adr='Headache, blurred vision, orthostatic hypotension → reflex tachycardia, sexual dysfunction',
      key='Used to treat HTN, BPH, and PTSD (prazosin only); decrease preload and afterload (blood vessels)', status='slide', slides=f'{ADR} slides 27–30 (10/6)'),
 dict(sec='adr', page='5–6', colour='antagonist', drugs=['Phenoxybenzamine'],
      moa='Non-selective α1 & α2 antagonist, irreversible; decrease peripheral resistance', soa='Brain, eye, nose, blood vessels, urethra, GI',
      adr='Orthostatic hypotension → reflex tachycardia; GI stimulation (α2 on PNS fiber blocked); headache, miosis',
      key='Can be used for HTN crisis caused by phenelzine (short term control); longer duration of action (irreversible → highest affinity for α1)',
      status='slide', slides=f'{ADR} slide 27 (classification, 10/6); its own slides 34–38 not yet taught'),
 dict(sec='adr', page='6', colour='antagonist', drugs=['Mirtazapine (Remeron)'],
      moa='NON-SELECTIVE: α2 antagonist, α1 antagonist, muscarinic antagonist, H1 antagonist, 5-HT2a antagonist',
      soa='CNS; enhances release of NE & 5-HT (serotonin); blocks H1 → drowsiness',
      adr='Drowsiness, weight gain, increased cholesterol, xerostomia, constipation, peripheral edema, HTN',
      key='Used for MDD; rare side effect: agranulocytosis; α2’s located in small blood vessels cause vasoconstriction → antagonist will cause vasodilation → peripheral edema',
      status='slide', slides=f'{ADR} slides 21, 27, 31–32 (10/6; ADR slide 33 not yet taught)'),
 dict(sec='adr', page='6', colour='agonist', drugs=['Clonidine (Catapres)', 'Brimonidine (Alphagan P)', 'Tizanidine (Zanaflex)', 'Guanfacine (Intuniv)', 'Dexmedetomidine (Precedex)'],
      moa='α2 agonist', soa='CNS; enhance inhibitory / suppress SNS',
      adr='Sedation, dry mouth, hypotension, bradycardia, sexual dysfunction, depression, constipation (activates GI inhibitory negative feedback pathway → less ACh)',
      key='Hypertensive crisis can occur if taken off drug abruptly due to up-regulation of receptors', status='slide', slides=f'{ADR} slides 21–24, 26 (10/6)'),
 dict(sec='adr', page='6', colour='agonist', drugs=['Dobutamine'],
      moa='β1 agonist', soa='Heart, kidneys, brain',
      adr='Increased heart rate and contractility; tachycardia / arrythmias; increased RAAS; CNS stimulation',
      key='LOW dose: β1 selective; HIGH dose: β1 > β2 > α1; used in patients with systolic dysfunction and congestive heart failure', status='list', slides=''),
 dict(sec='adr', page='6–7', colour='antagonist', drugs=['Metoprolol (Lopressor or Toprol)', 'Atenolol (Tenormin)', 'Nebivolol (Bystolic)'],
      moa='SELECTIVE β1 antagonist (“β1 beta-blockers”, “MAN”)', soa='Heart, kidneys, brain',
      adr='Decreased heart rate and contractility; fatigue / dizziness; bradycardia; decreased RAAS; CNS depression', key='',
      status='list', slides=''),
 dict(sec='adr', page='7', colour='agonist', drugs=['Albuterol (Ventolin) – SABA', 'Levalbuterol (Xopenex) – SABA', 'Salmeterol – LABA', 'Formoterol – LABA'],
      moa='β2 agonist', soa='Lungs, vasculature, CNS', adr='Bronchial dilation, vasodilation, excitation', key='',
      status='list', slides=''),
 dict(sec='adr', page='7', colour='antagonist', drugs=['Propranolol (Inderal)', 'Pindolol (PARTIAL AGONIST)', 'Timolol (Betimol)'],
      moa='NON-SELECTIVE beta-blockers; β1 & β2 antagonist', soa='Heart, kidneys, brain, lungs, vasculature',
      adr='Decreased heart rate and contractility; fatigue / dizziness; bradycardia; decreased RAAS; CNS depression',
      key='Mask symptoms of hypoglycemia → no nervousness / tremors; propranolol given at low dose for anxiety (target β1 in brain); contraindicated for asthma pts',
      status='list', slides=''),
 dict(sec='adr', page='7', colour='antagonist', drugs=['Carvedilol (Coreg)', 'Labetalol (Trandate)'],
      moa='β1 & β2 antagonist, & α1 antagonist', soa='Heart, kidneys, brain, lungs, vasculature',
      adr='Decreased heart rate and contractility; fatigue / dizziness; bradycardia; decreased RAAS; CNS depression',
      key='Mask symptoms of hypoglycemia → no nervousness / tremors; contraindicated for asthma pts', status='list', slides=''),
 dict(sec='adr', page='7', colour='agonist', drugs=['Mirabegron'],
      moa='β3 agonist', soa='Bladder', adr='Relief for overactive bladder', key='Less side effects than muscarinic antagonists',
      status='list', slides=''),
 dict(sec='adr', page='8', colour='agonist', drugs=['Epinephrine'],
      moa='β1, β2 agonist (blood vessels)', soa='Heart and vasculature', adr='Adrenergic receptors; SNS activation',
      key='Low dose: β1 & β2; high dose: everything; used for shock (life support) / anaphylaxis; patients must be weaned off due to down regulation of receptors',
      status='slide', slides=f'{ANS} slides 35, 42 (β2 only)'),
 dict(sec='adr', page='8', colour='agonist', drugs=['Norepinephrine (Levophed)'],
      moa='α1, β1 agonist', soa='Heart & vasculature', adr='Increase TPR, heart rate, contractility', key='Used for shock (life support)',
      status='slide', slides=f'{ANS} slides 13, 45–47 (CONFLICT: slide adds α2)'),
 dict(sec='adr', page='8', colour='agonist', drugs=['Isoproterenol'],
      moa='β1, β2 agonist (lungs)', soa='Heart & lungs', adr='Hyperglycemia, palpitations, tachycardia, arrythmias',
      key='Used for asthma (not 1st line), bradycardia, and heart block (AV)', status='list', slides=''),
 # ---------------- RAAS ----------------
 dict(sec='raas', page='8', colour='antagonist', drugs=['Aliskiren'],
      moa='Selective renin inhibitor; REVERSIBLE antagonist', soa='Blood stream (renin – 1st step in RAAS pathway)',
      adr='Lower TPR, lower aldosterone, decrease sodium and water reabsorption; angioedema, hypotension, cough, headache, diarrhea, skin rash',
      key='Low drug bioavailability but high affinity for renin; renin is the rate limiting enzyme for the RAAS pathway', status='list', slides=''),
 dict(sec='raas', page='9', colour='antagonist', drugs=['Captopril', 'Enalapril (Vasotec)', 'Lisinopril (Prinivil)', 'Benazepril (Lotensin)', 'Quinapril (Accupril)', 'Ramipril (Altace)'],
      moa='ACE inhibitor (angiotensin converting enzyme inhibitor); REVERSIBLE antagonists', soa='Blood stream',
      adr='Lower TPR, lower aldosterone, decrease sodium and water reabsorption; dry cough, hyperkalemia, angioedema, first dose hypotension, fetopathic potential',
      key='Primary effect: inhibit ACE (converts Ang I to Ang II & breaks down bradykinin); bonus 1: Ang I → angiotensin 1-7 → AT2 (oppose AT1); bonus 2: increased bradykinin (dilator) → dry cough; most are pro-drugs; 1st line for HTN',
      status='list', slides=''),
 dict(sec='raas', page='9', colour='antagonist', drugs=['Losartan (Cozaar)', 'Valsartan (Diovan)', 'Olmesartan (Benicar)', 'Telmisartan (Micardis)', 'Irbesartan (Avapro)', 'Medoxomil (printed as its own entry)'],
      moa='ARB (angiotensin II receptor blocker); REVERSIBLE antagonists', soa='Blood stream',
      adr='Lower TPR, lower aldosterone, decrease sodium and water reabsorption; hyperkalemia, angioedema',
      key='Primary effect: block AT1; bonus: increase AT2 activation (oppose AT1); losartan is an active drug that turns into an even more active metabolite; most are pro-drugs; high affinity for AT1',
      status='list', slides=''),
 dict(sec='raas', page='9–10', colour='antagonist', drugs=['Spironolactone', 'Eplerenone'],
      moa='Potassium-sparing diuretic; mineralocorticoid (MR) receptor antagonist', soa='Kidney → collecting duct of nephron',
      adr='Hyperkalemia, diarrhea, drowsiness; males: gynecomastia & impotence',
      key='Aldosterone antagonists; they bind the same space as aldosterone → fewer Na+/K+ channels and pumps made → less Na+ reabsorption',
      status='list', slides=''),
 dict(sec='raas', page='10', colour='antagonist', drugs=['Metoprolol'],
      moa='Selective β1 blocker', soa='Kidney', adr='Less renin production → no RAAS pathway', key='',
      status='list', slides=''),
]

# --------------------------------------------------------------------------
# Disagreements and gaps (list vs slide).  The slide wins.
# --------------------------------------------------------------------------
CONFLICTS = [  # (drug, list says, slide says, transcript 10/5 says, resolution)
 ('Norepinephrine', 'List page 8: “α1, β1 agonist”.', 'Autonomic Nervous System.pdf slide 13 draws norepinephrine as the neurotransmitter at α1 (blood vessels), α2 (CNS) and β1 (heart, kidney), with β2 “typically not innervated”; slides 45–47: NE acts at α2 in the GI tract (“Inhibition of Ach Release”).', '—', 'Slide wins: norepinephrine is keyed as an agonist at α1, α2 and β1 (DL2 item carries a note). The Exam 1 drug list called it an α1, α2, β1 and β2 agonist.'),
 ('Epinephrine', 'List page 8: “β1, β2 agonist (blood vessels)”, with “Low dose: β1 & β2 / High dose: everything”.', 'Autonomic Nervous System.pdf slides 35 and 42 show epinephrine (adrenal medulla) acting at β2 (bronchial dilation, smooth-muscle vasodilation); the slides say nothing on α receptors for epinephrine. The Exam 1 drug list called it an α1, α2, β1 and β2 agonist.', '—', 'No direct contradiction with a slide. Keyed with the list’s dose wording (β1 and β2 at low dose; all receptors at high dose). Re-check when the adrenergic deck is available.'),
 ('Varenicline', 'List page 1 ADRs: headache, insomnia, suicidal thoughts, depression, flatulence.', 'PCOL-NMJ_PCOL_2026s_pptx.pdf slide 9: most common GI: nausea (16–40%) & vomiting; CNS: headache, insomnia, depression. No suicidal thoughts or flatulence on the slide; the list omits nausea and vomiting.', 'Names depression and sleeplessness (brain site) and “some GI side effects”: “flatulence is a complaint for the patients. They get a lot of gas.” Nothing on suicidal thoughts.', 'Resolved: the ADR item (DL2-004) keys the slide’s nausea/vomiting, headache, insomnia and depression plus flatulence, which he confirmed. Suicidal thoughts (list only) are not asked.'),
 ('Scopolamine', 'List page 3: “Non-selective muscarinic antagonist (M1, M2, M3)”.', 'PCOL-Cholinergic-26s.pdf slide 17: “Scopolamine — Antagonist to the Muscarinic, Histamine and serotonin receptors”.', '“That one is really non-selective. That not only blocks all the muscarinics, but also histamine and serotonin receptors.”', 'Resolved for the slide: keyed as an antagonist at muscarinic, histamine and serotonin receptors (DL2-035).'),
 ('Solifenacin, darifenacin, trospium', 'List page 4: “Most selective for M3 → least likely to cause anti-DUMBbELSS”.', 'PCOL-Cholinergic-26s.pdf slide 30: “All have the potential to cause anti-DUMBBELSS; xerostomia (dry mouth) and constipation — M3, all musc. antag”; the M3-selective three sit lowest in the “order of drugs with CNS effects (drowsiness, dizziness, & confusion)”: oxybutynin (M1 & M3) > tolterodine, fesoterodine (M1 & M3) > solifenacin, darifenacin, trospium (M3).', 'The more M3-selective drugs act more in the bladder and cause “less of the anti-dumbbells everywhere else”, but “If I give enough of VESIcare, I’m gonna get all the anti-dumbbells.” Oxybutynin (M1 and M3) causes sedation. For the exam: oxybutynin, trospium and solifenacin only.', 'Resolved: both are true by dose. DL2-044 keys oxybutynin as more sedating than solifenacin and rejects “only oxybutynin can cause anti-DUMBBELSS”; darifenacin, tolterodine and fesoterodine are not asked.'),
 ('Succinylcholine (hyperthermia)', 'List page 1 places “hyperthermia” among the ADRs.', 'PCOL-NMJ_PCOL_2026s_pptx.pdf slide 26 places malignant hyperthermia under “Succinylcholine (SCh) DDI”: with inhaled anesthetics (e.g., halothane); abnormal release of Ca++ from skeletal-muscle stores; dantrolene (ryanodine receptor antagonist).', 'Lists hyperthermia among the adverse effects (“patients can get actually hyperthermia. They get too hot”) and separately malignant hyperthermia when combined with an anesthetic “such as halotane”.', 'Resolved: both are keyed. Hyperthermia is an adverse reaction in DL2-007; malignant hyperthermia with inhaled anesthetics is the drug–drug interaction in DL2-009.'),
 ('Curare-like drugs (ADRs)', 'List page 2: “Histamine release, hypotension & tachycardia”; no CNS effect.', 'PCOL-NMJ_PCOL_2026s_pptx.pdf slide 32: respiratory paralysis; tachycardia — pancuronium; allergic reactions: histamine release (bronchial spasms, marked hypotension) — atracurium; *** no CNS effect. Slide 30: histamine release +++ for atracurium, + for the others; pancuronium “+ Block” at autonomic ganglia.', 'Most common: paralysis of the diaphragm; tachycardia “with pancuronium more often than the others”; massive histamine release with atracurium; “more drug dependent”. For Exam 2 he needs only “any karate-like drug is … A competitive, reversible NM antagonist” causing paralysis. In his rocuronium question he also said it “may cause bronchodilation because of the release of histamine”, while the slide and his own earlier sentence give bronchial spasms.', 'Resolved by scope: DL2-012 now asks his rocuronium question and keys paralysis; the drug-specific reactions are teach text only. The bronchodilation/bronchospasm wording is not asked.'),
 ('Galantamine', 'List page 2: “Longer t1/2 than physostigmine”.', 'PCOL-NMJ_PCOL_2026s_pptx.pdf slide 40 groups donepezil, rivastigmine and galantamine under “Reversible with longer duration of action; High affinity for the AChE; lipophilic (cross the BBB)”; slide 39 uses the same “reversible with longer duration of action” heading for physostigmine. No slide compares galantamine with physostigmine.', '“For our exam purpose, I only need you to know rivastigamine and donepezil.” He said nothing on galantamine’s half-life.', 'Resolved by scope: galantamine is not asked (removed from DL2-016 options and teach text); the half-life claim stays list only.'),
 ('Atropine (drowsiness)', 'List page 3 ADRs end with “drowsiness”.', 'PCOL-Cholinergic-26s.pdf slides 19 and 32 give the CNS effect of muscarinic antagonists as “hallucinations, restlessness, & coma” (dose-dependent); drowsiness appears on slide 24 for scopolamine.', 'Atropine’s anti-DUMBBELSS: constipation, cannot urinate, mydriasis, bronchial dilation, cannot cry or sweat, “and you’re gonna go sedated”; at higher doses “mad as a hatter” (hallucination).', 'Resolved for the list: sedation is keyed for atropine in DL2-032 (M1 block in the brain).'),
 ('Echothiophate', 'List page 2: “Organophosphate inhibitor of acetylcholinesterase enzyme” (reversibility not stated).', 'PCOL-NMJ_PCOL_2026s_pptx.pdf slides 42–43: organophosphates form a covalent bond with the enzyme (irreversible) and irreversibly phosphorylate cholinesterases; slide 45 names echothiophate an organophosphate inhibitor.', '“Those are irreversible antagonists to the acetylchonasterase enzyme.” Topical eye drops for glaucoma; miosis, blurred vision, lacrimation, stinging, redness.', 'Resolved: irreversible (slide and transcript).'),
 ('Botulinum toxin', 'List colours it red (antagonist).', 'PCOL-NMJ_PCOL_2026s_pptx.pdf slides 46–50 describe it as preventing ACh release by cleaving SNARE proteins (endopeptidase); no slide calls it a receptor antagonist.', '“Botox is an enzyme that breaks down the snare protein … you can’t release the cetylcholine.” He does not call it an antagonist.', 'Unchanged: mechanism keyed as blocking release; “antagonist” not used as its class.'),
 ('Aclidinium, umeclidinium', 'List page 4: “Muscarinic antagonist … Long-acting muscarinic antagonist (LAMA)”.', 'PCOL-Cholinergic-26s.pdf slide 28: “High affinity for the M3 (reversible, but slow dissociation)”; the LAMA label on the slide is attached to tiotropium only.', '“Those are really long acting”; “a very high affinity, and they’re more selective to the M3s” than ipratropium and tiotropium.', 'Resolved for the list: long acting, high M3 affinity and slow dissociation are keyed (DL2-041).'),
 ('Tiotropium', 'List page 3: “Heart rate not affected because it does not target M2”.', 'PCOL-Cholinergic-26s.pdf slide 28 gives tiotropium as “M1 and M3; LAMA: Long acting (1x/Day)”; slide 10 puts M2 at the AV & SA node. The heart-rate sentence itself is not on a slide.', '“The ipratropium and the tiotropium are less selective”; low bioavailability keeps them in the lungs: “even though they can affect the M2s or the M3s, it’s very likely, unlikely because they don’t get systemic.”', 'Resolved by the transcript against both list and slide: heart rate is spared because tiotropium stays in the lungs (DL2-040, rewritten), not because it lacks M2 affinity. DL2-039 no longer keys receptor profiles; it keys short-acting ipratropium versus long-acting tiotropium.'),
 ('Edrophonium', 'List page 2: “No CNS effects”.', 'PCOL-NMJ_PCOL_2026s_pptx.pdf slide 38 gives short duration, readily reversible, diagnosis of myasthenia gravis; it does not mention CNS effects.', '“For our purpose on the exam, I’m not too worried about” edrophonium (IV, diagnostic, very water soluble, “gonna stay within the blood”). No explicit statement on CNS effects.', 'Resolved by scope: DL2-019 removed; the “no CNS effects” claim is not asked.'),
 ('Nitrates and PDE inhibitors (SOA)', 'List page 4 gives the SOA as “Endothelium of blood vessels (M3)”.', 'No slide names these drugs. Autonomic Nervous System.pdf slide 4 and PCOL-Cholinergic-26s.pdf slides 13 and 15 say M3 on vascular endothelium raises Ca++ → NOS → NO (vasodilation via nitric oxide).', '—', 'List only; the “(M3)” in the SOA is not asked.'),
 ('Benztropine', 'List page 3: non-selective muscarinic antagonist; CNS; Parkinson’s.', 'PCOL-Cholinergic-26s.pdf slide 25 names benztropine (Parkinson’s patients treated with L-dopa; tremor & rigidity) inside the muscarinic-antagonist section but does not state its receptor selectivity.', '“An analog of atropine called benztropine … used for treatment of Parkinson’s disease”, an adjunct to L-dopa; “more selective to … the M1s in the brain, and it’s gonna have less of those anti-dumbbells”; “about half of the affinity of atropine.”', 'Resolved against the list: benztropine is more M1-selective, not a plain non-selective (M1, M2, M3) antagonist. DL2-037 keys only its site (central nervous system) and carries a note.'),
 ('Cocaine', 'List page 5 key information: “Used with lidocaine to control arrythmias (Na+ channel blocker)”; SOA “CNS”.', 'PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf slide 10: “Cocaine (Reuptake inhibitor) MOA: NE transporter (NET) antagonist; Increase NE at the synapse; PCOL Effect: Heart, Blood vessels, CNS”. No lidocaine on the slide.', '10/6: cocaine or another powerful vasoconstrictor is added to lidocaine “because the lidocaine can stop your heart. So you want to stay local. So by vasoconstricting those blood vessels, you decrease the bleeding while you’re suturing, and also you prevent the systemic distribution of our drug into the heart.”', 'Resolved against the list: the vasoconstrictor keeps lidocaine away from the heart (preventing arrhythmias); cocaine is not the antiarrhythmic. Use not asked in DL2 (DL2 cocaine item carries a note); L10-022 asks it as low yield. Sites: heart, blood vessels and CNS, not CNS only.'),
 ('Phenylephrine', 'List page 4: “down-reg → rebound congestion”; ADRs HTN, burning & nasal discharge, rebound congestion.', 'PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf slide 18 ADR: burning, rebound congestion, careful in HTN pts, blurred vision. No down-regulation; no nasal discharge.', '10/6: “burning, blurred vision, uh, you may have rebound congestion ... you don’t use for more than 3 days.” Gives no mechanism for the rebound. On the agonist and the urethra he said “you’re gonna relax the sphincter, which can allow you to urinate” — the opposite of what α1 activation of a sphincter would do; not asked.', 'Rebound congestion keyed without its cause (DL2 item note); blurred vision added from the slide.'),
 ('Selegiline, rasagiline', 'List page 5: both selective MAO-B irreversible antagonists; depression & Parkinson’s.', 'PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf slide 14: “Selective MAO-B Antagonist; Depression & Parkinson’s; Drug: Selegiline (Low doses); Irreversible antagonist”. Rasagiline is not on a slide.', '10/6: only selegiline (“a better MAO inhibitor, uh, selegiline, which is selective to the MAOB”; no cheese effect).', 'Rasagiline not asked; replaced by selegiline in the indirect-drug select-all.'),
 ('Mirtazapine', 'List page 6: α2, α1, muscarinic, H1 and 5-HT2a antagonist; blocks H1 → drowsiness; ADRs incl. peripheral edema from α2 block in small vessels.', 'PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf slides 27, 31–32: α2, H1, muscarinic and α1 (no 5-HT2a); “Norepinephrine and 5-HT ⇒ Decrease depression”; H1 and muscarinic → sedation. Slide 33 (not taught 10/6): peripheral edema from “Blockade of alpha 1”, not α2.', '10/6: “this drug blocks histamine and muscarinic type one in the brain ... Sedation”; “it can also have some effects on the alpha 1 as well.” He stopped before slide 33.', 'Mechanism item released (H1 keyed, note added). The peripheral-edema item stays held: the list blames α2 block, slide 33 blames α1 block; resolve when he teaches slide 33.'),
 ('Clonidine group', 'List page 6: clonidine, brimonidine, tizanidine, guanfacine, dexmedetomidine: α2 agonists; ADRs incl. constipation “(activates GI inhibitory negative feedback pathway → less Ach)”.', 'PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf slides 21–24, 26 (clonidine, brimonidine, apraclonidine, tizanidine, guanfacine, dexmedetomidine; ADRs sedation, nightmares, depression, dry mouth, constipation, hypotension, bradycardia, sexual dysfunction, hypertensive crisis on withdrawal from up-regulation).', '10/6: the “-idine” rule; “for our purpose ... we’re gonna focus on clonidine because that’s our prototypical drug.” Constipation: “by suppressing acetylcholine release, we don’t activate the M3s.” The transcript says “hypertension and bradycardia” where the slide says hypotension.', 'Agrees; hypotension keyed (slide). Guanfacine lacks -idine; he called it similar to clonidine.'),
 ('Prazosin group', 'List page 5: prazosin, terazosin, doxazosin, tamsulosin (α1a); uses HTN, BPH, PTSD (prazosin only); ADRs headache, blurred vision, orthostatic hypotension → reflex tachycardia, sexual dysfunction; SOA includes brain.', 'PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf slides 27–30: selective, reversible α1 antagonist (1000×); uroselective group; BPH: terazosin, doxazosin, tamsulosin & silodosin (α1A and 1D > α1B); ADRs first-dose orthostatic hypotension & syncope (30–90 min), reflex tachycardia (palpitations), dizziness, blurred vision, headache. No PTSD, no sexual dysfunction.', '10/6: “all I need to know if you see a drug with OC is a selective alpha-1 antagonist”; α1A/α1B “just FYI”; sites nose, eye, blood vessels, urethra. The transcript says “first dose orthostatic hypertension” where the slide says hypotension.', 'Agrees on mechanism; hypotension keyed (slide); PTSD and sexual dysfunction (list only) not asked; uroselectivity not asked.'),
 ('Phenoxybenzamine', 'List page 5–6: non-selective α1 & α2 irreversible antagonist; GI stimulation; HTN crisis from phenelzine.', 'PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf slide 27 lists it as the irreversible, non-selective α1 and α2 antagonist; slides 34–38 (its MOA, uses, ADRs) were not taught on 10/6.', '10/6, answering a student: “phenoxbenzamine is a non-selective alpha 1 and alpha 2 irreversible antagonists ... we’re gonna get a little bit ahead of us, so just wait”.', 'Its DL2 items stay held until slides 34–38 are taught; L10-048 asks only the slide 27 classification.'),
 ('Medoxomil', 'List page 9 prints “Medoxomil” as its own line in the ARB group.', 'No slide.', '—', 'Parsed as part of the ARB row; not asked as a drug.'),
 ('Muscarinic agonists (blood pressure)', 'List page 2–3: muscarinic agonist ADRs given as DUMBBELSS.', 'PCOL-Cholinergic-26s.pdf slide 13 lists the organ effects of muscarinic agonists.', '“They may get hypertension due to the release of nitric oxide, which is a vasodilator, so that’s a little bit of an exception to the rule” — “hypertension” beside “vasodilator” looks like a transcription or speaking slip.', 'Uncertain: blood pressure is not asked for the muscarinic agonists.'),
]

# --------------------------------------------------------------------------
# Questions
# --------------------------------------------------------------------------
HELD = {'raas', 'no'}   # no slides + transcript yet: written, not posted
# Adrenergic deck taught 10/6 through slide 32 (mirtazapine).  Released by concept;
# every other adrenergic concept stays held (β drugs, catecholamines, phenoxybenzamine,
# mirtazapine's adverse reactions) until the slides that teach it have audio.
ADR_RELEASED = {'moa-phenylephrine', 'adr-phenylephrine', 'moa-cocaine', 'moa-amphetamine', 'phenelzine',
                'mao-tell', 'group-indirect-adr', 'moa-prazosin', 'adr-alpha1-block', 'mirtazapine',
                'moa-clonidine', 'clonidine-withdrawal', 'adr-alpha2-agonist', 'group-alpha-block'}
SUBS = [('nmj', 'Neuromuscular drugs', 'pages 1–2'), ('chol', 'Cholinergic drugs', 'pages 2–4'),
        ('adr', 'Adrenergic drugs', 'pages 4–8'), ('raas', 'RAAS drugs', 'pages 8–10'), ('no', 'Nitric oxide and cGMP drugs', 'page 4')]
qs = []
def add(sub, concept, stem, opts, teach, quote, cite_, multi=False, note=None, dupOf=None, tags=None):
    q = dict(id=f'DL2-{len(qs)+1:03d}', lecture='DL2', prof='Gottlieb', tier='new', topic='DL2', sub=sub,
             skill='drug', concept=concept, tags=['drug-list'] + (tags or []) + (['list'] if multi else []),
             source='slide', fg='classes')
    if multi:
        q['multi'] = True
        if not stem.endswith('Select all that apply.'):
            stem += ' Select all that apply.'
    q['stem'] = stem
    q['options'] = [{'t': t, 'correct': c, 'why': w} for t, c, w in opts]
    q['teach'] = teach
    q['quote'] = quote
    q['cite'] = cite_
    if note: q['note'] = note
    if dupOf: q['dupOf'] = dupOf
    qs.append(q)
    return q['id']

R, W = True, False

# ======================= NEUROMUSCULAR (nmj) =======================
add('nmj', 'moa-acetylcholine-nic',
 'Acetylcholine acts at the neuromuscular junction as which of the following?',
 [('A depolarizing direct agonist', R, 'Acetylcholine opens the muscle nicotinic (Nm) channel and depolarizes the end plate; it is listed with succinylcholine as a depolarizing agent.'),
  ('A non-depolarizing competitive antagonist', W, 'That is the curare-like drugs (rocuronium, vecuronium, pancuronium), which stop the channel from opening.'),
  ('An indirect antagonist of acetylcholinesterase', W, 'That is neostigmine, pyridostigmine and the other cholinesterase inhibitors; they raise acetylcholine rather than being it.'),
  ('An inhibitor of acetylcholine release', W, 'That is botulinum toxin, which acts on the presynaptic terminal.'),
  ('A partial agonist at α4β2 receptors', W, 'That is varenicline, at the neuronal nicotinic (Nn) receptor in the brain.')],
 'The neuromuscular junction drugs split into direct and indirect. Direct drugs bind the muscle nicotinic (Nm) receptor: depolarizing agents are agonists (acetylcholine and succinylcholine); non-depolarizing agents are competitive antagonists (curare-like drugs). Indirect drugs block acetylcholinesterase and raise synaptic acetylcholine.',
 'Direct => Binding to the NM. Depolarizing agents Direct Agonist (Acetylcholine & Succinylcholine). Non-depolarizing agents Direct Antagonism (Curare like drugs)',
 cite(1, (NMJ, '12')))

add('nmj', 'moa-varenicline',
 'Which of the following describes the mechanism of action of varenicline?',
 [('Partial agonist at α4β2 neuronal nicotinic (Nn) receptors', R, 'Varenicline is a selective partial agonist at the central α4β2 Nn receptor, with high affinity.'),
  ('Full agonist at muscle nicotinic (Nm) receptors', W, 'A full agonist at Nm that depolarizes the end plate is succinylcholine (and acetylcholine).'),
  ('Competitive antagonist at muscle nicotinic (Nm) receptors', W, 'That is the curare-like (non-depolarizing) drugs.'),
  ('Reversible inhibitor of acetylcholinesterase', W, 'That is physostigmine, neostigmine and the other cholinesterase inhibitors (indirect antagonists).')],
 'Varenicline binds the α4β2 neuronal nicotinic (Nn) receptor in the central nervous system with high affinity and activates it only partially. That decreases craving and withdrawal and blunts the effect of nicotine, so it is used for smoking cessation.',
 'Varenicline (Chantix) => Selective partial agonist α4β2 NN receptors. MOA: High affinity and Partial Agonist at the α4/β2 central nicotinic (NN) receptor; Decrease craving and withdrawal; Blunt nicotine effect',
 cite(1, (NMJ, '7–8')))

add('nmj', 'soa-varenicline',
 'Where is the site of action of varenicline?',
 [('Neuronal nicotinic (Nn) receptors in the brain', R, 'The site of action is the central nervous system, at α4β2 Nn receptors.'),
  ('Muscle nicotinic (Nm) receptors at the neuromuscular junction', W, 'That is the site of succinylcholine and the curare-like drugs.'),
  ('M3 receptors in the ciliary muscle of the eye', W, 'That is where echothiophate’s effect is produced.'),
  ('The presynaptic terminal of motor neurons', W, 'That is the site of botulinum toxin, which prevents acetylcholine release.')],
 'Varenicline’s site of action is the central nervous system. Its receptor there is the α4β2 neuronal nicotinic (Nn) receptor; the muscle nicotinic (Nm) receptor at the neuromuscular junction is a different receptor.',
 'SOA: CNS',
 cite(1, (NMJ, '8')))

add('nmj', 'adr-varenicline',
 'Which adverse effects are reported for varenicline?',
 [('Nausea and vomiting', R, 'Listed as the most common GI side effect (nausea 16–40%).'),
  ('Headache', R, 'Listed under central nervous system side effects.'),
  ('Insomnia', R, 'Listed under central nervous system side effects.'),
  ('Depression', R, 'Listed under central nervous system side effects; the site of action is the brain.'),
  ('Flatulence', R, 'A gastrointestinal complaint: patients “get a lot of gas”.'),
  ('Hyperkalemia', W, 'Hyperkalemia is a succinylcholine adverse reaction (muscle cells lose K+).'),
  ('Histamine release with hypotension', W, 'That is a curare-like drug adverse reaction (most with atracurium).')],
 'Varenicline acts in the brain, so its side effects include central nervous system effects (headache, insomnia, depression); it is a partial agonist, so it still activates the receptor somewhat. Its gastrointestinal side effects are nausea and vomiting (most common) and flatulence. The drug list also warns of mood and behavioral changes.',
 'Side Effects. Most common: GI: Nausea (16-40%) & Vomiting. CNS: Headache, Insomnia, Depression',
 cite(1, (NMJ, '9')), multi=True,
 note='The drug list gives headache, insomnia, suicidal thoughts, depression and flatulence and does not list nausea; the slide lists nausea and vomiting as the most common and does not list suicidal thoughts or flatulence. On 10/5 he added flatulence (“I don’t think if I listed for you guys, but flatulence is a complaint”), so flatulence is keyed with the slide’s effects; suicidal thoughts are not asked.')

add('nmj', 'moa-succinylcholine',
 'Which of the following describes the mechanism of action of succinylcholine?',
 [('Depolarizing agonist at muscle nicotinic (Nm) receptors', R, 'Succinylcholine opens the nicotinic channel and depolarizes the motor end plate: a depolarizing agent.'),
  ('Competitive antagonist at muscle nicotinic (Nm) receptors', W, 'That is the non-depolarizing (curare-like) drugs.'),
  ('Partial agonist at neuronal nicotinic (Nn) receptors', W, 'That is varenicline.'),
  ('Organophosphate inhibitor of acetylcholinesterase', W, 'That is echothiophate.')],
 'Succinylcholine resembles two acetylcholine molecules joined at the alkyl ends. It is an agonist: it opens the nicotinic channel at the neuromuscular junction, but it is not metabolized effectively at the synapse, so the end plate stays depolarized and the muscle is paralyzed.',
 'Depolarize at the NMJ — Depolarizing Agent. Succinylcholine = Open nicotinic ion channels — Agonist',
 cite(1, (NMJ, '19–20')))

add('nmj', 'phase-succinylcholine',
 'Which statement about succinylcholine’s Phase I and Phase II block is CORRECT?',
 [('Phase I keeps the end plate depolarized; Phase II blocks the channel', R, 'Phase I: prolonged depolarization (no repolarization). Phase II: channel blockade prevents movement of Na+/K+ and prolongs the paralysis.'),
  ('Phase I blocks the channel; Phase II keeps the end plate depolarized', W, 'Reverses the two phases.'),
  ('Both phases are competitive block at the acetylcholine binding site', W, 'Competitive block at the binding site is how curare-like drugs act; succinylcholine is an agonist.'),
  ('Phase II is produced by inhibition of acetylcholinesterase', W, 'Cholinesterase inhibition is the indirect mechanism of drugs such as neostigmine.')],
 'In Phase I succinylcholine opens the channel and, because it is not metabolized effectively at the synapse, keeps the motor end plate depolarized; contraction needs end-plate repolarization (“repriming”), so the muscle is paralyzed. In Phase II the channel is blocked, which prevents movement of Na+ and K+ and prolongs the paralysis.',
 'Phase I block (depolarizing): It is an agonist, open the channel, but it cause depolarization of the motor end plate because succinylcholine is not metabolized effectively at the synapse … Phase II block: Channel blockade prevent movement of Na+/K+ and prolongs the paralysis',
 cite(1, (NMJ, '24')))

sch_adr = add('nmj', 'adr-succinylcholine',
 'Which adverse drug reactions are listed for succinylcholine?',
 [('Hyperkalemia', R, 'The muscle cell loses K+ (and gains Ca++ and Na+).'),
  ('Hypertension and arrhythmias', R, 'Listed as the cardiovascular adverse reactions.'),
  ('Post-operative muscle pain (myalgia)', R, 'Caused by unsynchronized contractions.'),
  ('Hyperthermia', R, 'The muscle fibers keep contracting out of sync, and the patient gets too hot.'),
  ('Histamine release with marked hypotension', W, 'That is a curare-like drug reaction (atracurium most).'),
  ('Miosis and lacrimation', W, 'Those are echothiophate (eye) reactions.'),
  ('Insomnia and depression', W, 'Those are varenicline reactions.')],
 'Succinylcholine’s adverse reactions are hyperkalemia (muscle cells lose K+), hypertension and arrhythmias, post-operative muscle pain and hyperthermia from unsynchronized contractions. It is avoided in renal-deficient and dehydrated patients.',
 'Succinylcholine (SCh) ADRs: Hyperkalemia — Muscle cell loss of K+ & gain of Ca++, & Na+; Cardiovascular — Hypertension & Arrhythmias; Post-operative muscle pain — Myalgia; Unsynchronized contractions',
 cite(1, (NMJ, '25')), multi=True)

add('nmj', 'soa-succinylcholine',
 'Besides the muscle nicotinic (Nm) receptor at the neuromuscular junction, at increased doses succinylcholine can also stimulate which site?',
 [('Autonomic ganglia, and thus the PNS and SNS', R, 'At increased doses succinylcholine stimulates ganglia, and thus the parasympathetic (PNS) and sympathetic (SNS) nervous systems.'),
  ('Muscarinic M3 receptors in the bladder', W, 'M3 in the bladder is the site of the overactive-bladder antagonists (oxybutynin and others).'),
  ('The presynaptic terminal, blocking acetylcholine release', W, 'Blocking release at the presynaptic terminal is botulinum toxin.'),
  ('α4β2 receptors in the brain', W, 'That is varenicline’s site.')],
 'Succinylcholine’s main site is the muscle nicotinic (Nm) receptor at the neuromuscular junction. At increased doses it also stimulates the autonomic ganglia, where neuronal nicotinic (Nn) receptors activate the postganglionic neurons of the parasympathetic nervous system (PNS) and sympathetic nervous system (SNS).',
 'SCh will stimulate ganglia and thus PNS & SNS — ↑ Doses',
 cite(1, (NMJ, '20')))

add('nmj', 'ddi-succinylcholine',
 'A patient receives succinylcholine together with an inhaled anesthetic such as halothane. Which reaction is this combination associated with?',
 [('Malignant hyperthermia', R, 'Listed as the succinylcholine drug–drug interaction with inhaled anesthetics: abnormal Ca++ release from skeletal-muscle stores and muscle heat production.'),
  ('Histamine release and bronchial spasm', W, 'Histamine release is a curare-like drug reaction (atracurium).'),
  ('Hypertensive crisis from dietary tyramine', W, 'That is the phenelzine reaction.'),
  ('Rebound nasal congestion', W, 'That is the phenylephrine reaction.')],
 'With inhaled anesthetics, succinylcholine is associated with malignant hyperthermia: abnormal release of Ca++ from stores in skeletal muscle and heat production by skeletal muscle. Dantrolene is an antagonist at the ryanodine receptor and lowers intracellular Ca++.',
 'Succinylcholine (SCh) DDI: Inhaled anesthetics (e.g., halothane) — Malignant hyperthermia. Caused by: Abnormal release of Ca++ from stores in skeletal muscle; Skeletal muscle heat production. Dantrolene — Antagonist to the Ryanodine receptor',
 cite(1, (NMJ, '26')),
 note='The drug list places hyperthermia among succinylcholine’s adverse reactions; the slide places malignant hyperthermia under drug–drug interactions with inhaled anesthetics. On 10/5 he gave both: hyperthermia as an adverse reaction (unsynchronized contraction) and malignant hyperthermia when it is combined with an anesthetic such as halothane. This item keys the interaction.')

add('nmj', 'moa-curare',
 'Which of the following describes the mechanism of action of rocuronium?',
 [('Competitive antagonist at muscle nicotinic (Nm) receptors', R, 'Rocuronium is a curare-like, non-depolarizing agent: it binds the acetylcholine site and stops the channel from opening.'),
  ('Depolarizing agonist at muscle nicotinic (Nm) receptors', W, 'That is succinylcholine.'),
  ('Inhibitor of acetylcholinesterase at the neuromuscular junction', W, 'That is neostigmine and pyridostigmine, which reverse curare-like drugs.'),
  ('Cleavage of SNARE proteins in the presynaptic terminal', W, 'That is botulinum toxin.')],
 'The curare-like (non-depolarizing) drugs — tubocurarine (prototype), mivacurium, vecuronium, rocuronium, pancuronium — are direct competitive antagonists. They bind the acetylcholine binding site on the muscle nicotinic (Nm) receptor without opening it; acetylcholine is needed for muscle contraction, so the muscle is paralyzed.',
 'Non-depolarizing = Stop the nicotinic ion channels from opening — Competitive Antagonist (Curare (prototype), Mivacurium, Vecuronium, Rocuronium, Pancuronium)',
 cite(2, (NMJ, '19, 27')))

add('nmj', 'group-nondepolarizing',
 'Which drugs are non-depolarizing neuromuscular blocking agents?',
 [('Vecuronium', R, 'A curare-like competitive antagonist at Nm.'),
  ('Rocuronium', R, 'A curare-like competitive antagonist at Nm.'),
  ('Pancuronium', R, 'A curare-like competitive antagonist at Nm.'),
  ('Mivacurium', R, 'A curare-like competitive antagonist at Nm.'),
  ('Succinylcholine', W, 'Succinylcholine is the depolarizing agent (an agonist).'),
  ('Neostigmine', W, 'Neostigmine is a cholinesterase inhibitor; it reverses curare-like drugs.'),
  ('Varenicline', W, 'Varenicline is a partial agonist at α4β2 neuronal nicotinic (Nn) receptors in the brain; it does not paralyze.')],
 'Both drug types cause paralysis. Depolarizing: succinylcholine (agonist, opens nicotinic channels). Non-depolarizing: curare (prototype), mivacurium, vecuronium, rocuronium and pancuronium (competitive antagonists, stop the nicotinic channels from opening). A drug with “cur” in the middle of its name is curare-like: a competitive, reversible muscle nicotinic (Nm) antagonist.',
 'Depolarizing: Succinylcholine. Non-depolarizing: Curare (prototype), Mivacurium, Vecuronium, Rocuronium, Pancuronium',
 cite(2, (NMJ, '19')), multi=True)

add('nmj', 'adr-curare',
 'A patient is administered rocuronium. Which of the following is most likely to occur?',
 [('Paralysis', R, 'Rocuronium blocks the muscle nicotinic (Nm) receptor, so paralysis occurs every time; it is what the drug is used for.'),
  ('Diarrhea', W, 'Gut motility is driven through muscarinic receptors; rocuronium blocks only the muscle nicotinic (Nm) receptor.'),
  ('Vasoconstriction', W, 'Blood vessels respond through adrenergic (sympathetic) receptors; rocuronium blocks the muscle nicotinic (Nm) receptor.'),
  ('Sedation', W, 'Curare-like drugs do not cross the blood–brain barrier and do not put the patient to sleep.')],
 'Rocuronium is a curare-like drug: a competitive, reversible muscle nicotinic (Nm) antagonist, so paralysis always occurs. The other adverse reactions depend on the drug: paralysis of the diaphragm (respiratory paralysis), tachycardia more often with pancuronium, and massive histamine release with atracurium. They have no central nervous system (CNS) effect.',
 'Curare Like-Drugs ADRs: Respiratory paralysis; Tachycardia — Pancuronium; Allergic reactions — Histamine release - Bronchial spasms - Marked Hypotension — Atracurium. *** No CNS Effect',
 cite(2, (NMJ, '27, 30, 32')),
 note='The drug list gives histamine release, hypotension and tachycardia and omits respiratory paralysis; the slide lists respiratory paralysis first, ties tachycardia to pancuronium and histamine release mainly to atracurium (not on the list). On 10/5 he called these drug-dependent and said that for Exam 2 he needs only that any curare-like drug is a competitive, reversible Nm antagonist that causes paralysis, so this item keys paralysis (his in-class question on rocuronium).')

add('nmj', 'cns-curare',
 'Which statement about the curare-like drugs (for example vecuronium) is CORRECT?',
 [('They have no central nervous system effect', R, 'The curare-like drugs have no central nervous system effect.'),
  ('They cross the blood–brain barrier and cause sedation', W, 'They have no central nervous system effect.'),
  ('They are agonists that keep the end plate depolarized', W, 'That is succinylcholine.'),
  ('They raise acetylcholine levels at the synapse', W, 'That is the cholinesterase inhibitors.')],
 'The curare-like drugs act only at the neuromuscular junction, where they block the muscle nicotinic (Nm) receptor competitively. They have no central nervous system effect, so a paralyzed patient is not sedated by them; they are used as an adjuvant in surgical anesthesia, not as an anesthetic.',
 '*** No CNS Effect. Used as an adjuvant in surgical anesthesia to obtain relaxation of skeletal muscle (Not as anesthetic)',
 cite(2, (NMJ, '27, 32')))

add('nmj', 'physostigmine',
 'Which statement about physostigmine is CORRECT?',
 [('It crosses the blood–brain barrier', R, 'Physostigmine is a tertiary amine and readily penetrates the central nervous system.'),
  ('It is a quaternary amine that stays out of the brain', W, 'That describes pyridostigmine and neostigmine.'),
  ('It irreversibly phosphorylates acetylcholinesterase', W, 'That is the organophosphates (echothiophate, parathion, sarin).'),
  ('It is a muscarinic receptor antagonist', W, 'Physostigmine inhibits acetylcholinesterase; atropine is the muscarinic antagonist.')],
 'Physostigmine is a reversible acetylcholinesterase inhibitor with a longer duration of action. As a tertiary amine it readily penetrates the central nervous system, so it acts in the brain and the periphery, and it is the drug of choice for poisoning by anti-muscarinic agents such as atropine.',
 'Physostigmine (Antilirium): Tertiary amine and readily Penetrate the CNS. Drug of choice for treating poisoning due to anti-muscarinic agents (e.g., atropine)',
 cite(1, (NMJ, '39')))

add('nmj', 'physostigmine-use',
 'A patient is poisoned with atropine. Which cholinesterase inhibitor is the drug of choice?',
 [('Physostigmine', R, 'Drug of choice for poisoning by anti-muscarinic agents such as atropine; it reaches the central nervous system.'),
  ('Neostigmine', W, 'Neostigmine does not cross the blood–brain barrier; its uses are myasthenia gravis and curare reversal.'),
  ('Pyridostigmine', W, 'Pyridostigmine does not cross the blood–brain barrier; it stays in the periphery.'),
  ('Echothiophate', W, 'Echothiophate is an organophosphate used in the eye for glaucoma.')],
 'Atropine blocks muscarinic receptors in the brain and periphery. Physostigmine raises acetylcholine by inhibiting acetylcholinesterase and, as a tertiary amine, reaches the central nervous system too, so it is the drug of choice for anti-muscarinic poisoning.',
 'Drug of choice for treating poisoning due to anti-muscarinic agents (e.g., atropine)',
 cite(1, (NMJ, '39')), tags=['use'])

add('nmj', 'bbb-ache',
 'Which acetylcholinesterase inhibitors cross the blood–brain barrier?',
 [('Physostigmine', R, 'Tertiary amine; readily penetrates the central nervous system.'),
  ('Donepezil', R, 'Lipophilic; crosses the blood–brain barrier (Alzheimer’s disease).'),
  ('Rivastigmine', R, 'Lipophilic; crosses the blood–brain barrier (Alzheimer’s disease).'),
  ('Neostigmine', W, 'Quaternary amine; does NOT cross the blood–brain barrier.'),
  ('Pyridostigmine', W, 'Quaternary amine; does NOT cross the blood–brain barrier.')],
 'Physostigmine (tertiary amine) and the Alzheimer’s drugs donepezil and rivastigmine (very lipid soluble) cross the blood–brain barrier. Pyridostigmine and neostigmine are quaternary amines and do not, so they act at the neuromuscular junction without central effects.',
 'Physostigmine: Tertiary amine and readily Penetrate the CNS. PyriDOstigmine & Neostigmine: Quaternary amine and DO NOT cross the BBB. Donepezil, Rivastigmine and Galantamine: Lipophilic (Cross the BBB)',
 cite('1–2', (NMJ, '39–40')), multi=True)

add('nmj', 'neostigmine',
 'Which statement about neostigmine and pyridostigmine is CORRECT?',
 [('They do not cross the blood–brain barrier', R, 'They are quaternary amines and do NOT cross the blood–brain barrier, so their site of action is the neuromuscular junction.'),
  ('They are the drugs of choice for atropine poisoning', W, 'That is physostigmine, which reaches the brain.'),
  ('They are used for early Alzheimer’s disease', W, 'That is donepezil and rivastigmine, which cross the blood–brain barrier.'),
  ('They block the muscle nicotinic receptor directly', W, 'They inhibit acetylcholinesterase (indirect); direct block of Nm is the curare-like drugs.')],
 'Pyridostigmine and neostigmine are reversible acetylcholinesterase inhibitors with a longer duration of action. They are quaternary amines that do not cross the blood–brain barrier, so they act at the neuromuscular junction: they treat myasthenia gravis and reverse curare-like overdose.',
 'PyriDOstigmine (Mestinon) & Neostigmine (Prostigmin): Quaternary amine and DO NOT cross the BBB. Uses: Treatment of myasthenia gravis & to reverse curare-like overdose',
 cite(2, (NMJ, '39')))

add('nmj', 'reverse-curare',
 'A patient remains paralyzed after a curare-like drug. Which drug reverses the block by raising acetylcholine at the neuromuscular junction?',
 [('Neostigmine', R, 'A cholinesterase inhibitor used to reverse curare-like overdose; more acetylcholine competes the curare-like drug off the receptor.'),
  ('Succinylcholine', W, 'Succinylcholine is itself a paralyzing (depolarizing) drug.'),
  ('Atropine', W, 'Atropine blocks muscarinic receptors; it does not raise acetylcholine.'),
  ('Botulinum toxin', W, 'Botulinum toxin lowers acetylcholine release and relaxes muscle.')],
 'Curare-like drugs are competitive antagonists, so their block can be overcome by more acetylcholine. Neostigmine and pyridostigmine inhibit acetylcholinesterase, raise synaptic acetylcholine at the neuromuscular junction and reverse the block.',
 'Cholinesterase Inhibitors … Used to potentiate the actions of Ach … Reverse curare effects. PyriDOstigmine & Neostigmine … to reverse curare-like overdose',
 cite(2, (NMJ, '33, 39')), tags=['use'])

add('nmj', 'edrophonium',
 'Which statement about edrophonium is CORRECT?',
 [('It has a short duration of action', R, 'Edrophonium is short-acting and readily reversible; it is used to diagnose myasthenia gravis.'),
  ('It irreversibly inhibits acetylcholinesterase', W, 'Irreversible inhibition is the organophosphates.'),
  ('It is the drug of choice for Alzheimer’s disease', W, 'That is donepezil, rivastigmine and galantamine.'),
  ('It blocks M3 receptors in the eye', W, 'Blocking M3 in the eye is tropicamide.')],
 'Edrophonium is a cholinesterase inhibitor with a short duration of action that is readily reversible. It is used in the diagnosis of myasthenia gravis or when the medication dose needs adjusting (Tensilon test: transient increase in grip strength).',
 'Edrophonium (Enlon, Reversol): Short duration of action; Readily reversible; Use in the diagnosis of myasthenia gravis or if the medication need to be adjusted',
 cite(2, (NMJ, '38')))

add('nmj', 'adr-ache',
 'Which effect is expected from excess acetylcholine after a cholinesterase inhibitor such as donepezil?',
 [('Diarrhea and salivation', R, 'Cholinesterase inhibitor adverse reactions are DUMBBELSS (diarrhea, urination, miosis, bradycardia, bronchial constriction, emesis, lacrimation, salivation, stimulation) from excess acetylcholine.'),
  ('Dry mouth and constipation', W, 'Those are anti-DUMBBELSS effects of muscarinic antagonists.'),
  ('Mydriasis', W, 'Mydriasis is an anti-DUMBBELSS effect; excess acetylcholine causes miosis.'),
  ('Tachycardia and bronchial dilation', W, 'Those are atropine effects; excess acetylcholine causes bradycardia and bronchial constriction.')],
 'Cholinesterase inhibitors raise synaptic acetylcholine, so their adverse reactions are the symptoms of excess acetylcholine: DUMBBELSS — diarrhea, urination, miosis, bradycardia, bronchial constriction, emesis, lacrimation, salivation, stimulation. Central effects include insomnia, agitation and dizziness.',
 'ADRs: Symptoms due to excess of Ach at synapses — DUMBBELSS; GI (>10%); CNS (>10%) Insomnia & agitation, Dizziness',
 cite(1, (NMJ, '41')))

add('nmj', 'moa-echothiophate',
 'Which of the following describes the mechanism of action of echothiophate?',
 [('Irreversible inhibitor of acetylcholinesterase', R, 'Echothiophate is an organophosphate inhibitor of acetylcholinesterase; organophosphates bind the enzyme covalently (irreversible).'),
  ('Reversible inhibitor of acetylcholinesterase in the brain', W, 'That is donepezil and rivastigmine; organophosphates bind the enzyme covalently.'),
  ('Non-selective muscarinic agonist', W, 'That is pilocarpine and carbachol, which act at the receptor directly.'),
  ('Muscarinic antagonist in the eye', W, 'That is tropicamide, which dilates the pupil.')],
 'Echothiophate is an organophosphate: it inhibits acetylcholinesterase and raises acetylcholine, which increases M3 activation in the ciliary muscle and lowers intraocular pressure by increasing aqueous humor outflow (glaucoma). Organophosphates form a stable covalent bond with the enzyme, so the inhibition is irreversible.',
 'Echothiophate (Phospholine) MOA: Organophosphate inhibitor of the acetylcholinesterase enzyme & ↑ Ach levels. Organophosphates: Forms a covalent bond with the enzyme that is very stable and slow (Irreversible)',
 cite(2, (NMJ, '42, 45')),
 note='The drug list does not say whether echothiophate is reversible; the slides call organophosphates irreversible, and on 10/5 he called echothiophate an irreversible acetylcholinesterase antagonist. Keyed so.')

add('nmj', 'soa-adr-echothiophate',
 'Echothiophate acts through M3 receptors in the ciliary muscle of the eye. Which adverse reactions does it cause?',
 [('Miosis and blurred vision', R, 'Listed adverse reaction: more M3 activation constricts the pupil.'),
  ('Lacrimation', R, 'Listed adverse reaction.'),
  ('Stinging and redness of the eyes', R, 'Listed adverse reaction.'),
  ('Mydriasis', W, 'Mydriasis is what tropicamide (an M3 antagonist) produces.'),
  ('Dry eyes', W, 'Raised acetylcholine increases lacrimation, not dryness.')],
 'Echothiophate raises acetylcholine and so increases M3 activation in the ciliary muscle (its site of action). Its listed adverse reactions are miosis and blurred vision, lacrimation, and stinging and redness of the eyes.',
 'ADR: Miosis and blurred vision; Lacrimation; Stinging and redness of the eyes',
 cite(2, (NMJ, '45')), multi=True)

add('nmj', 'botox',
 'Which of the following describes the mechanism of action of botulinum toxin?',
 [('Blocks acetylcholine release by cleaving SNARE', R, 'Botulinum toxin is an endopeptidase; it cleaves sites on SNARE proteins in the presynaptic terminal, so acetylcholine cannot be released.'),
  ('Competitively blocks muscle nicotinic (Nm) receptors', W, 'That is the curare-like drugs, which act on the postsynaptic receptor.'),
  ('Inhibits acetylcholinesterase in the synaptic cleft', W, 'That is the cholinesterase inhibitors, which raise acetylcholine.'),
  ('Depolarizes the motor end plate', W, 'That is succinylcholine.')],
 'Botulinum toxin acts at the presynaptic terminal. Its active fragments are endopeptidases whose substrates are the SNARE proteins needed for vesicle docking and exocytosis; cleaving them blocks acetylcholine release, which relaxes muscle.',
 'Botulinum toxin blocks ACh release by interfering with the machinery of transmitter release. The active fragments of botulinum toxins are endopeptidases; the SNARE proteins are their substrates. The botulinum toxin cleaves specific sites on SNARE proteins. By ↓ Ach release => Muscle relaxation',
 cite(2, (NMJ, '46, 50')),
 note='The drug list colours botulinum toxin red (antagonist); the slides describe it as blocking acetylcholine release, not as a receptor antagonist. Keyed to the slide wording.')

add('nmj', 'group-indirect-nmj',
 'Which drugs act as indirect antagonists by inhibiting acetylcholinesterase?',
 [('Physostigmine', R, 'Cholinesterase inhibitor (acetylcholinesterase antagonist).'),
  ('Pyridostigmine', R, 'Cholinesterase inhibitor (acetylcholinesterase antagonist).'),
  ('Neostigmine', R, 'Cholinesterase inhibitor (acetylcholinesterase antagonist).'),
  ('Rivastigmine', R, 'Cholinesterase inhibitor (acetylcholinesterase antagonist).'),
  ('Succinylcholine', W, 'A direct depolarizing agonist at Nm.'),
  ('Varenicline', W, 'A direct partial agonist at α4β2 Nn.'),
  ('Botulinum toxin', W, 'Prevents acetylcholine release; it does not inhibit acetylcholinesterase.')],
 'Indirect drugs at the neuromuscular junction bind the enzyme that breaks down acetylcholine, not the receptor: acetylcholinesterase antagonists such as physostigmine, pyridostigmine, neostigmine, donepezil, rivastigmine and echothiophate. A drug name ending in “stigmine” marks a cholinesterase inhibitor. Blocking the enzyme raises synaptic acetylcholine.',
 'Indirect Antagonist: Acetylcholinesterase enzyme antagonist — Blocks the breakdown of Ach, which ↑ Ach synaptic levels',
 cite('1–2', (NMJ, '10, 12')), multi=True)

add('nmj', 'group-agonist-nmj',
 'Which drugs in the neuromuscular section of the drug list are direct nicotinic agonists?',
 [('Acetylcholine', R, 'Endogenous agonist; a depolarizing agent at Nm.'),
  ('Succinylcholine', R, 'Depolarizing agonist at Nm.'),
  ('Varenicline', R, 'Partial agonist at α4β2 neuronal nicotinic (Nn) receptors.'),
  ('Rocuronium', W, 'A competitive antagonist (non-depolarizing).'),
  ('Neostigmine', W, 'An acetylcholinesterase inhibitor (indirect).'),
  ('Botulinum toxin', W, 'Prevents acetylcholine release.')],
 'The nicotinic agonists are acetylcholine, nicotine, varenicline (selective partial agonist at α4β2 Nn) and succinylcholine. Curare-like drugs are direct antagonists; cholinesterase inhibitors are indirect.',
 'Nicotinic NN PCOL: Agonists — Ach; Nicotine; Varenicline (Chantix) => Selective partial agonist α4β2 NN receptors; Succinylcholine',
 cite(1, (NMJ, '7')), multi=True)

# ======================= CHOLINERGIC (chol) =======================
add('chol', 'moa-bethanechol',
 'Which of the following describes the mechanism of action of bethanechol?',
 [('Non-selective, reversible muscarinic (M1–M3) agonist', R, 'Bethanechol is grouped with acetylcholine, methacholine and carbachol as a non-selective muscarinic agonist.'),
  ('Non-selective, reversible muscarinic (M1–M3) antagonist', W, 'That is atropine.'),
  ('Reversible inhibitor of acetylcholinesterase', W, 'That is physostigmine and neostigmine (indirect).'),
  ('Partial agonist at neuronal nicotinic (Nn) receptors', W, 'That is varenicline.')],
 'Acetylcholine, methacholine, carbachol, bethanechol and pilocarpine are non-selective, reversible agonists at the muscarinic receptors (M1, M2, M3); being reversible and competitive, an overdose can be outcompeted by an antagonist. Apart from acetylcholine, they act only at muscarinic receptors, not nicotinic ones.',
 'Muscarinic Agonist MOA: Non-selective agonist for the muscarinic receptors (M1-3); Reversible',
 cite(2, (CHO, '11–12')))

add('chol', 'group-musc-agonists',
 'Which drugs are non-selective muscarinic agonists?',
 [('Methacholine', R, 'Non-selective muscarinic agonist (M1–M3).'),
  ('Carbachol', R, 'Non-selective muscarinic agonist (M1–M3).'),
  ('Pilocarpine', R, 'Non-selective muscarinic agonist (M1–M3).'),
  ('Scopolamine', W, 'A muscarinic antagonist.'),
  ('Tiotropium', W, 'A muscarinic (M1 and M3) antagonist.'),
  ('Physostigmine', W, 'An acetylcholinesterase inhibitor; it raises acetylcholine but does not bind the receptor.')],
 'The direct muscarinic agonists are acetylcholine, methacholine, carbachol, bethanechol and pilocarpine; all are non-selective (M1, M2, M3) and reversible. The “chol” in methacholine, carbachol and bethanechol marks them as cholinergic; pilocarpine has no “chol” and has to be known by name. Physostigmine reaches the same receptors indirectly by raising acetylcholine.',
 'Muscarinic Agonist: Acetylcholine, Methacholine, Carbachol, Bethanechol, Pilocarpine & Cevimeline — Non-selective (M1, M2, & M3s), Reversible',
 cite('2–3', (CHO, '11')), multi=True)

add('chol', 'hydrolysis-agonists',
 'Which muscarinic agonists are NOT hydrolyzed by acetylcholinesterase?',
 [('Carbachol', R, 'Hydrolysis by acetylcholinesterase: carbachol − (none).'),
  ('Pilocarpine', R, 'Hydrolysis by acetylcholinesterase: pilocarpine − (none); it is a non-ester alkaloid.'),
  ('Acetylcholine', W, 'Acetylcholine is hydrolyzed the most (+++).'),
  ('Methacholine', W, 'Methacholine is hydrolyzed a little (+).')],
 'In the muscarinic agonist table, hydrolysis by acetylcholinesterase is +++ for acetylcholine, + for methacholine and absent (−) for carbachol and pilocarpine. Pilocarpine is an alkaloid, a non-ester, and is not hydrolyzed.',
 'Agonist / Hydrolysis by AchE: Ach +++; Methacholine +; Carbachol -; Pilocarpine -',
 cite(2, (CHO, '12')), multi=True)

add('chol', 'pilocarpine',
 'Which statement about pilocarpine is CORRECT?',
 [('It has no effect on nicotinic receptors', R, 'Pilocarpine binds only muscarinic receptors; it does not bind or activate nicotinic receptors.'),
  ('It binds muscarinic receptors irreversibly', W, 'The muscarinic agonists are all reversible and competitive; they bind and come off.'),
  ('It is selective for the M2 receptor', W, 'It is a non-selective muscarinic agonist (M1, M2, M3).'),
  ('It blocks muscarinic receptors and dries the mouth', W, 'It activates muscarinic receptors; it is used to treat dry mouth.')],
 'Pilocarpine is a non-selective, reversible muscarinic agonist (M1, M2, M3). It does not bind or activate nicotinic receptors; among the cholinergic agonists only acetylcholine acts at both nicotinic and muscarinic receptors. At the salivary glands (M3, Gq, ↑Ca++) it causes salivation.',
 'Pilocarpine (Alkaloids): Non-Ester and not hydrolyzed; No effect on Nicotinic receptors; Used topically to treat glaucoma and to treat dry mouth',
 cite(3, (CHO, '14')))

add('chol', 'adr-musc-agonist',
 'A patient takes bethanechol. Which effect is NOT expected?',
 [('Mydriasis', R, 'Muscarinic agonists cause miosis (M3 in the iris); mydriasis is an antagonist effect.'),
  ('Diarrhea', W, 'Expected: M3 in the gut increases peristalsis and secretion (the D of DUMBBELSS).'),
  ('Bradycardia', W, 'Expected: M2 in the heart lowers heart rate.'),
  ('Bronchial constriction', W, 'Expected: M3 on bronchial smooth muscle.'),
  ('Salivation', W, 'Expected: M3 on glands.')],
 'Muscarinic agonists produce DUMBBELSS: diarrhea, urination, miosis, bradycardia, bronchial constriction, emesis, lacrimation, salivation, stimulation of the central nervous system. Bradycardia comes through M2 in the heart (Gi); the rest of the peripheral effects come through M3 (Gq, ↑Ca++).',
 'Autonomic Effects Evoked by Muscarinic Agonists: GI tract — Increase peristalsis & Secretion; Urinary Bladder — Micturation; Eye (Iris) — Miosis; Heart — Bradycardia; Lungs — Bronchial constriction; CNS — Vomiting; Glands — Secretion (Salivation & lacrimation)',
 cite(2, (CHO, '13')))

add('chol', 'moa-atropine',
 'Which of the following describes the mechanism of action of atropine?',
 [('Non-selective muscarinic (M1–M3) antagonist', R, 'Atropine is a naturally occurring alkaloid that blocks M1, M2 and M3, reversibly.'),
  ('Non-selective muscarinic (M1–M3) agonist', W, 'That is bethanechol, carbachol and the other muscarinic agonists.'),
  ('Selective M1 and M3 muscarinic antagonist', W, 'That is tiotropium.'),
  ('Reversible inhibitor of acetylcholinesterase', W, 'That is physostigmine, which treats atropine poisoning.')],
 'Atropine is a non-selective, reversible muscarinic antagonist (M1, M2, M3), acting in the central nervous system and periphery. Blocking the receptors where acetylcholine produces DUMBBELSS gives the anti-DUMBBELSS picture.',
 'Muscarinic Antagonists: Naturally occurring Alkaloids; Non-selective and reversible; Atropine (M1, M2, and M3)',
 cite(3, (CHO, '17')))

add('chol', 'adr-atropine',
 'Which effects are expected from an overdose of atropine?',
 [('Tachycardia', R, 'M2 block in the heart → ↑ heart rate.'),
  ('Mydriasis', R, 'M3 block in the pupil → mydriasis.'),
  ('Constipation', R, 'M3 block in the gastrointestinal tract → constipation.'),
  ('Dry mouth', R, 'M3 block on glands → dry mouth.'),
  ('Sedation', R, 'M1 block in the brain → sedation; at higher doses, hallucinations (“mad as a hatter”).'),
  ('Bronchial constriction', W, 'Atropine causes bronchial dilation; constriction is a muscarinic agonist effect.'),
  ('Miosis', W, 'Miosis is a muscarinic agonist effect; atropine dilates the pupil.')],
 'Atropine overdose gives anti-DUMBBELSS: M2 block in the heart raises heart rate; M3 block causes mydriasis, constipation, dry mouth and bronchial dilation; M1 block in the brain causes sedation. Toxicity is summarized as dry as a bone, hot as a pistol, red as a beet, blind as a bat, mad as a hatter.',
 'Atropine OD of Muscarinic Antagonist — Anti-DUMBBELSS: M2 Heart = Gi = ↑ HR; M3 Pupil = Gq = Mydriasis; M3 GI = Gq = Constipation. Pharmacological effects: Dry mouth & constipation; Tachycardia; Bronchial dilation; Pupil dilation',
 cite(3, (CHO, '19, 32')), multi=True,
 note='The drug list gives drowsiness for atropine; the slides give its central effects as hallucinations, restlessness and coma (dose-dependent) and give drowsiness for scopolamine. On 10/5 he listed sedation among atropine’s anti-DUMBBELSS effects (“you’re gonna go sedated”), so sedation is keyed.')

add('chol', 'atropine-heart',
 'Atropine raises heart rate by blocking which receptor?',
 [('M2 in the heart', R, 'M2 (Gi) at the SA and AV node lowers heart rate when acetylcholine binds; blocking it raises heart rate.'),
  ('M3 in the heart', W, 'M3 mediates smooth muscle, gland, eye and endothelial effects; the cardiac muscarinic receptor is M2.'),
  ('β1 in the heart', W, 'β1 is the adrenergic receptor that raises heart rate when activated; atropine does not act there.'),
  ('Neuronal nicotinic (Nn) in ganglia', W, 'Atropine is a muscarinic antagonist, not a nicotinic one.')],
 'Acetylcholine slows the heart through M2 (Gi, ↓cAMP) at the SA and AV node. Atropine blocks M2, so the parasympathetic brake is removed and heart rate rises; atropine is used for bradycardia or atrioventricular nodal block.',
 'Location? M2 Heart = Gi = ↑ HR. M2: AV & SA node',
 cite(3, (CHO, '10, 19')), tags=['apply'])

add('chol', 'atropine-organophosphate',
 'In organophosphate poisoning, how does atropine help?',
 [('It blocks excess acetylcholine at muscarinic sites', R, 'Atropine (M1, M2, M3 antagonist) reduces the effects of acetylcholine at muscarinic sites: anti-DUMBBELSS.'),
  ('It regenerates the phosphorylated acetylcholinesterase', W, 'Regenerating the enzyme is pralidoxime (2-PAM), the cholinesterase reactivator.'),
  ('It lowers acetylcholine release from the nerve terminal', W, 'That is botulinum toxin.'),
  ('It blocks nicotinic receptors at the neuromuscular junction', W, 'Atropine acts at muscarinic, not nicotinic, receptors.')],
 'Organophosphates irreversibly inhibit acetylcholinesterase, so acetylcholine builds up and produces severe DUMBBELSS. Atropine blocks M1, M2 and M3 and reduces the effects of acetylcholine at muscarinic sites; pralidoxime (2-PAM) reactivates the enzyme.',
 'Antidote for Overdose of Organophosphate AchE inhibitor: Atropine — M1, M2, & M3 Antag — Anti-DUMBBELSS. Atropine Uses: Treatment of Muscarinic Agonist overdose; Bradycardia or atrioventricular nodal block; Organophosphates Poisoning',
 cite(3, (NMJ, '44'), (CHO, '20')), tags=['use'])

add('chol', 'moa-scopolamine',
 'Which of the following describes the mechanism of action of scopolamine?',
 [('Muscarinic, histamine and serotonin antagonist', R, 'Scopolamine is a non-selective, reversible alkaloid antagonist at muscarinic, histamine and serotonin receptors.'),
  ('Selective antagonist at M3 receptors in the bladder', W, 'That is solifenacin and trospium.'),
  ('Non-selective muscarinic (M1–M3) agonist', W, 'That is pilocarpine and the other agonists.'),
  ('Inhibitor of acetylcholinesterase in the brain', W, 'That is donepezil and the other lipophilic cholinesterase inhibitors.')],
 'Scopolamine, like atropine, is a naturally occurring, non-selective and reversible muscarinic antagonist; it also antagonizes histamine and serotonin receptors. It penetrates the central nervous system more rapidly than atropine and is used for motion sickness.',
 'Scopolamine — Antagonist to the Muscarinic, Histamine and serotonin receptors',
 cite(3, (CHO, '17')),
 note='The drug list calls scopolamine a non-selective muscarinic antagonist (M1, M2, M3) and does not mention histamine or serotonin receptors; the slide does, and on 10/5 he said the same (“not only blocks all the muscarinics, but also histamine and serotonin receptors”). Keyed to the slide and transcript.')

add('chol', 'scopolamine-cns',
 'Which statement about scopolamine is CORRECT?',
 [('It causes drowsiness', R, 'Scopolamine acts in the central nervous system (CNS), which it penetrates more rapidly; drowsiness is among its effects, with euphoria and amnesia.'),
  ('It does not cross into the CNS', W, 'Not crossing the blood–brain barrier describes neostigmine and pyridostigmine.'),
  ('It causes salivation and diarrhea', W, 'Those are muscarinic agonist (DUMBBELSS) effects; scopolamine causes dry mouth and constipation.'),
  ('It blocks only the M2 receptor', W, 'Scopolamine is very non-selective: all muscarinic receptors plus histamine and serotonin receptors.')],
 'Scopolamine is a muscarinic antagonist whose site of action is mainly the central nervous system (CNS), which it penetrates more rapidly. It causes drowsiness, euphoria and amnesia; it blocks emesis, but the other anti-DUMBBELSS effects (dry mouth, constipation, urinary retention) come with it.',
 'Scopolamine: Penetrates the CNS more rapidly; Motion sickness; Drowsiness, euphoria, amnesia; Anti-DUMBBELSS',
 cite(3, (CHO, '24')))

add('chol', 'benztropine',
 'Benztropine is a muscarinic antagonist. Where is its site of action?',
 [('The central nervous system', R, 'Benztropine, an atropine analog, blocks M1 in the brain; it is used in Parkinson’s patients for tremor and rigidity.'),
  ('The lungs, by inhalation', W, 'That is ipratropium, tiotropium, aclidinium and umeclidinium.'),
  ('M3 receptors in the bladder', W, 'That is the overactive-bladder antagonists.'),
  ('The eye (pupil)', W, 'That is tropicamide.')],
 'In Parkinson’s disease, 70–80% of the dopaminergic neurons from the substantia nigra to the striatum are lost and acetylcholine activity is left unopposed. Benztropine, an analog of atropine, is more selective for M1 receptors in the brain, so it has fewer anti-DUMBBELSS effects elsewhere; it is an add-on to L-dopa for tremor and rigidity.',
 'Benztropine (Cogentin): Parkinson’s Pts treated with L-Dopa; Tremor & rigidity; Basal Ganglia; Dopaminergic Neuron 70-80% loss',
 cite(3, (CHO, '25')),
 note='The drug list calls benztropine a non-selective muscarinic antagonist (M1, M2, M3); the slide names the drug and its use without its selectivity. On 10/5 he said benztropine is more selective for M1 in the brain than atropine, with fewer anti-DUMBBELSS effects elsewhere. Only the site of action (central nervous system) is keyed.')

add('chol', 'tropicamide',
 'Tropicamide dilates the pupil. Which mechanism explains this?',
 [('It blocks M3, leaving the SNS unopposed', R, 'The parasympathetic system constricts the pupil through M3 (Gq → IP3, Ca++); blocking M3 leaves the sympathetic nervous system (SNS) unopposed → mydriasis.'),
  ('It activates α1 receptors on the radial muscle', W, 'Activating α1 to cause mydriasis is phenylephrine.'),
  ('It inhibits acetylcholinesterase in the eye', W, 'Inhibiting acetylcholinesterase in the eye (echothiophate) causes miosis.'),
  ('It activates M3 receptors in the ciliary muscle', W, 'M3 activation constricts the pupil (miosis).')],
 'The sympathetic nervous system (SNS) dilates the pupil and the parasympathetic nervous system (PNS) constricts it through M3 (Gq → PLC → IP3 and Ca++). Tropicamide blocks M3 in the eye, so the SNS is unopposed and the pupil dilates (mydriasis).',
 'Tropicamide — Use: Optical (Pupil Dilation). Rational? SNS dilate the pupils; PNS constrict the pupils — M3 => Gq => PLC => IP3 & Ca++ = Pupil Constriction (miosis). SNS is unopposed => Mydriasis',
 cite(3, (CHO, '26')), tags=['apply'])

add('chol', 'ipra-vs-tio',
 'Which statement correctly tells ipratropium and tiotropium apart?',
 [('Ipratropium is short acting; tiotropium is long acting', R, 'Ipratropium is the short-acting muscarinic antagonist (SAMA, 3–4 times a day); tiotropium is a long-acting muscarinic antagonist (LAMA, once a day).'),
  ('Ipratropium is long acting; tiotropium is short acting', W, 'Reverses the two: ipratropium is the SAMA, tiotropium the LAMA.'),
  ('Both are agonists at M3 in bronchial smooth muscle', W, 'Both are antagonists; M3 activation constricts the bronchi.'),
  ('Both reach high levels in the blood after inhaling', W, 'Both were built for very low bioavailability, so they stay mainly in the lungs.')],
 'Both are inhaled muscarinic antagonists used in the lungs, where M3 (Gq → IP3, Ca++) constricts bronchial smooth muscle and only the parasympathetic system innervates. Ipratropium is a short-acting muscarinic antagonist (SAMA); tiotropium is a long-acting muscarinic antagonist (LAMA). Both have very low bioavailability and stay mainly in the airways.',
 'Ipratropium (Atrovent): M1, M2, and M3; SAMA: Short acting (3-4x/Day). Tiotropium (Spiriva): M1 and M3; LAMA: Long acting (1x/Day)',
 cite(3, (CHO, '28')), tags=['tell'],
 note='The slide gives ipratropium as M1, M2 and M3 and tiotropium as M1 and M3. On 10/5 he called both “less selective” and said either could affect M2 or M3 if it got into the circulation. The receptor profiles are therefore not keyed; short versus long acting is.')

add('chol', 'tiotropium-heart-rate',
 'Inhaled tiotropium is unlikely to change heart rate. Which of the following is the reason?',
 [('It stays mainly in the lungs', R, 'Its structure gives very low bioavailability, so it stays in the airways and rarely reaches M2 in the heart.'),
  ('It does not bind M2 receptors', W, 'Tiotropium is one of the less selective inhaled antagonists; it could affect M2 if it got into the circulation.'),
  ('It is an agonist at M2 in the heart', W, 'Tiotropium is a muscarinic antagonist, not an agonist.'),
  ('It activates β1 receptors in the heart', W, 'β1 is an adrenergic receptor; tiotropium is a muscarinic antagonist.')],
 'M2 receptors at the SA and AV node slow the heart, so blocking them would raise heart rate. Tiotropium and ipratropium are less selective inhaled muscarinic antagonists, but their chemical structure gives very low bioavailability, so they stay mainly in the lungs and seldom reach the heart.',
 'Tiotropium (Spiriva): M1 and M3; LAMA: Long acting (1x/Day)',
 cite(3, (CHO, '10, 28')),
 note='The drug list says heart rate is not affected because tiotropium does not target M2, and the slide gives tiotropium as M1 and M3. On 10/5 he said tiotropium is less selective and could affect M2 if it went systemic, and that its low bioavailability keeps it in the lungs. Keyed to what he said.')

add('chol', 'aclidinium',
 'Which statement about aclidinium and umeclidinium is CORRECT?',
 [('They have high affinity for M3 and dissociate slowly', R, 'They bind M3 tightly (high affinity); binding is reversible, but dissociation is slow, so they are very long acting. Site of action: the lungs.'),
  ('They are irreversible M3 antagonists', W, 'They are reversible, with slow dissociation.'),
  ('They are muscarinic agonists for dry mouth', W, 'The muscarinic agonist used for dry mouth is pilocarpine.'),
  ('They act on M3 in the bladder for overactive bladder', W, 'That is oxybutynin and the other overactive-bladder drugs.')],
 'Aclidinium and umeclidinium are inhaled muscarinic antagonists acting in the lungs. They bind M3 with high affinity and are more selective for M3 than ipratropium and tiotropium; the binding is reversible, but they dissociate slowly, so they are very long acting (long-acting muscarinic antagonists).',
 'Aclidinium and Umeclidinium: High affinity for the M3 (reversible, but slow dissociation)',
 cite(4, (CHO, '28')))

add('chol', 'soa-lungs',
 'Which muscarinic antagonists have the lungs as their site of action?',
 [('Ipratropium', R, 'Inhaled; short-acting muscarinic antagonist.'),
  ('Tiotropium', R, 'Inhaled; long-acting muscarinic antagonist.'),
  ('Umeclidinium', R, 'Inhaled; high M3 affinity.'),
  ('Oxybutynin', W, 'Site of action: M3 in the bladder.'),
  ('Tropicamide', W, 'Site of action: the eye.'),
  ('Benztropine', W, 'Site of action: the central nervous system.')],
 'The inhaled muscarinic antagonists (less systemic effect) are ipratropium, tiotropium, aclidinium and umeclidinium. In the lungs only the parasympathetic system innervates bronchial smooth muscle, where M3 causes bronchial constriction.',
 'Muscarinic Antagonists: Inhaled (less systemic effect) — Ipratropium; Tiotropium; Aclidinium and Umeclidinium',
 cite('3–4', (CHO, '27–28')), multi=True)

add('chol', 'moa-oab',
 'Which of the following describes the mechanism of action of oxybutynin?',
 [('Muscarinic antagonist favoring M3', R, 'Oxybutynin and the other overactive-bladder drugs are non-selective, reversible muscarinic antagonists that are more selective toward bladder M3.'),
  ('β3 agonist in bladder smooth muscle', W, 'That is mirabegron.'),
  ('Non-selective muscarinic agonist', W, 'That is bethanechol, used for urinary retention.'),
  ('α1 antagonist in the urethra', W, 'That is prazosin, terazosin, doxazosin and tamsulosin.')],
 'Oxybutynin, trospium and solifenacin are reversible muscarinic antagonists designed to be more selective toward the M3 receptors in the bladder. Blocking bladder M3 relaxes the bladder and decreases urgency, frequency and leakage in overactive bladder.',
 'Muscarinic Antagonists for Overactive Bladder Disorders … MOA: Non-selective, reversible, and hepatic metabolism (3A4 or 2D6); More selective towards the M3 receptors in the bladder',
 cite(4, (CHO, '29')))

add('chol', 'oab-cns',
 'Which statement about oxybutynin and solifenacin is CORRECT?',
 [('Oxybutynin is more likely to cause sedation', R, 'Oxybutynin is less selective: it blocks M1 in the brain as well as M3, so it causes sedation; solifenacin is more selective for M3.'),
  ('Solifenacin is more likely to cause sedation', W, 'Reversed: solifenacin is the more M3-selective drug, with fewer central effects.'),
  ('Only oxybutynin can cause anti-DUMBBELSS', W, 'All of them can; a high enough dose of solifenacin gives all the anti-DUMBBELSS effects.'),
  ('Both act mainly on M2 in the bladder', W, 'The bladder target is M3; M2 is the cardiac muscarinic receptor.')],
 'All overactive-bladder antagonists can cause anti-DUMBBELSS, especially dry mouth and constipation (M3). Central effects (drowsiness, dizziness, confusion) follow M1 block: oxybutynin (M1 and M3, the oldest and cheapest) most, and least the M3-selective solifenacin and trospium. At therapeutic doses the M3-selective drugs act more on the bladder and cause fewer anti-DUMBBELSS effects; at higher doses they cause them all.',
 'Order of drugs with CNS effects (Drowsiness, dizziness, & confusion): M1 & M3 — Oxybutynin; M1 & M3 — Tolterodine, Fesoterodine; M3 — Solifenacin, Darifenacin, Trospium',
 cite(4, (CHO, '30')), tags=['tell'],
 note='The drug list says solifenacin, darifenacin and trospium are “least likely to cause anti-DUMBBELSS”; the slide says all of them can cause anti-DUMBBELSS and places the three lowest for central effects. On 10/5 he said both: the M3-selective drugs cause fewer anti-DUMBBELSS effects at therapeutic doses, but “if I give enough of VESIcare, I’m gonna get all the anti-dumbbells”. He named oxybutynin, trospium and solifenacin as the three overactive-bladder drugs for the exam.')

add('chol', 'adr-oab',
 'Which adverse effects are shared by all the overactive-bladder muscarinic antagonists?',
 [('Xerostomia (dry mouth)', R, 'All muscarinic antagonists: M3 block on salivary glands.'),
  ('Constipation', R, 'All muscarinic antagonists: M3 block in the gut.'),
  ('Diarrhea', W, 'Diarrhea is a muscarinic agonist (DUMBBELSS) effect.'),
  ('Miosis', W, 'Miosis is an agonist effect; antagonists dilate the pupil.'),
  ('Bradycardia', W, 'Bradycardia is an agonist effect (M2); antagonists raise heart rate.')],
 'All overactive-bladder antagonists (oxybutynin, trospium, solifenacin and the others) have the potential to cause anti-DUMBBELSS; the more M3-selective ones need a higher dose to do so. The effects shared by all muscarinic antagonists through M3 are xerostomia (dry mouth) and constipation.',
 'All have the potential to cause anti-DUMBBELSS: Xerostomia (dry mouth) and constipation — M3 — All Musc. Antag',
 cite(4, (CHO, '30')), multi=True)

add('chol', 'moa-nitrates',
 'Which of the following describes the mechanism of action of nitroglycerin?',
 [('Donates nitric oxide, which raises cGMP', R, 'Listed: donate nitric oxide; nitric oxide → soluble guanylyl cyclase (sGC) → ↑ cyclic guanosine monophosphate (cGMP).'),
  ('Blocks phosphodiesterase, which raises cGMP', W, 'That is sildenafil, tadalafil and vardenafil.'),
  ('Activates M3 receptors on the endothelium', W, 'That is a muscarinic agonist; nitroglycerin donates nitric oxide itself.'),
  ('Blocks α1 receptors on blood vessels', W, 'That is prazosin and the other α1 antagonists.')],
 'Nitroglycerin, nitroprusside and isosorbide dinitrate/mononitrate are nitric oxide donors. Nitric oxide activates soluble guanylyl cyclase (sGC), which raises cyclic guanosine monophosphate (cGMP), a potent vasodilator; the result is vasodilation and lower blood pressure.',
 'Nitroglycerine, Nitroprusside, Isosorbide di / mononitrate (donor): Donate nitric oxide; NO → sGC → ↑cGMP; Vasodilation; Lower blood pressure; cGMP is a potent vasodilator',
 cite(4))

add('chol', 'moa-pde',
 'Which of the following describes the mechanism of action of sildenafil?',
 [('Blocks phosphodiesterase, so cGMP rises', R, 'Listed: blocks phosphodiesterase (PDE), the enzyme that breaks down cyclic guanosine monophosphate (cGMP), so there is more cGMP.'),
  ('Donates nitric oxide, so cGMP rises', W, 'That is nitroglycerin, nitroprusside and isosorbide.'),
  ('Blocks muscarinic M3 receptors on vessels', W, 'That is a muscarinic antagonist.'),
  ('Activates β2 receptors on vascular smooth muscle', W, 'That is the β2 agonists (albuterol and others).')],
 'Sildenafil, tadalafil and vardenafil block phosphodiesterase (PDE), the enzyme that breaks down cyclic guanosine monophosphate (cGMP). More cGMP gives vasodilation and lower blood pressure; they are used for erectile dysfunction. The list colours them as indirect antagonists.',
 'Sildenafil, Tadalafil, Vardenafil (indirect antagonist): Blocks PDE → increase cGMP; Vasodilation; Lower blood pressure; Blocks enzyme that breaks down cGMP = more cGMP',
 cite(4))

add('chol', 'group-cgmp',
 'Which drugs lower blood pressure by raising cGMP in blood vessels?',
 [('Nitroprusside', R, 'Nitric oxide donor → soluble guanylyl cyclase → ↑ cyclic guanosine monophosphate (cGMP).'),
  ('Isosorbide mononitrate', R, 'Nitric oxide donor → ↑ cGMP.'),
  ('Tadalafil', R, 'Blocks phosphodiesterase → ↑ cGMP.'),
  ('Prazosin', W, 'Prazosin lowers blood pressure by blocking α1 receptors, not through cGMP.'),
  ('Bethanechol', W, 'A muscarinic agonist used for urinary retention.'),
  ('Atropine', W, 'A muscarinic antagonist.')],
 'Two groups on the list end in more cyclic guanosine monophosphate (cGMP): nitric oxide donors (nitroglycerin, nitroprusside, isosorbide), which make more of it, and phosphodiesterase blockers (sildenafil, tadalafil, vardenafil), which stop its breakdown. Both give vasodilation and lower blood pressure.',
 'Donate nitric oxide; NO → sGC → ↑cGMP … Blocks PDE → increase cGMP … Vasodilation; Lower blood pressure',
 cite(4), multi=True)

# ======================= ADRENERGIC (adr) =======================
add('adr', 'moa-phenylephrine',
 'Which of the following describes the mechanism of action of phenylephrine?',
 [('α1 agonist', R, 'Phenylephrine is listed as an α1 agonist acting on blood vessels and the eye.'),
  ('α2 agonist', W, 'That is clonidine, brimonidine, tizanidine, guanfacine and dexmedetomidine.'),
  ('Selective α1 antagonist', W, 'That is prazosin, terazosin, doxazosin and tamsulosin.'),
  ('β1 agonist', W, 'That is dobutamine.')],
 'Phenylephrine activates α1 receptors (Gq, ↑Ca++) on blood vessels (vasoconstriction; nasal decongestant; higher preload and afterload) and in the eye (mydriasis). Its adverse reactions are burning, blurred vision, rebound congestion and higher blood pressure (care in patients with hypertension).',
 'Phenylephrine (agonist): α1 agonist; SOA: Blood vessels, Eyes',
 cite(4))

add('adr', 'adr-phenylephrine',
 'Which adverse reaction is listed for phenylephrine used as a nasal decongestant?',
 [('Rebound congestion', R, 'Listed on the slide and the list; he adds that the box says not to use it for more than 3 days.'),
  ('Orthostatic hypotension followed by reflex tachycardia', W, 'That is the α1 antagonists (prazosin and others).'),
  ('Dry mouth', W, 'Dry mouth is the common complaint with clonidine (α2 agonist).'),
  ('Hypertensive crisis on abrupt withdrawal', W, 'That is clonidine (receptor up-regulation).')],
 'Phenylephrine’s adverse reactions are burning, blurred vision, rebound congestion (do not use for more than 3 days) and higher blood pressure, so care is needed in patients with hypertension. The list attributes the rebound congestion to receptor down-regulation; that cause was not given in lecture.',
 'HTN, Burning & nasal discharge, rebound congestion … Down-reg → rebound congestion; Avoid in patients with HTN',
 cite(4))

add('adr', 'moa-cocaine',
 'Which of the following describes the mechanism of action of cocaine?',
 [('Norepinephrine reuptake inhibitor', R, 'Listed: NE (norepinephrine) reuptake inhibitor, an indirect-acting drug.'),
  ('Stimulates presynaptic release of norepinephrine and dopamine', W, 'That is amphetamine and methylphenidate.'),
  ('Irreversible inhibitor of MAO-A and MAO-B', W, 'That is phenelzine (monoamine oxidase inhibitor).'),
  ('α1 agonist', W, 'That is phenylephrine, a direct agonist.')],
 'Cocaine is a reuptake inhibitor: it blocks the norepinephrine transporter (NET), so more norepinephrine stays in the synapse and activates the postsynaptic receptors. Effects: severe vasoconstriction in blood vessels (α1; nosebleeds and septum damage when snorted), excitation in the central nervous system, and a faster heart that can lead to a heart attack.',
 'Cocaine (indirect antagonist): NE reuptake inhibitor; CNS; HTN, tachycardia, arrythmias, restlessness',
 cite(5))

add('adr', 'moa-amphetamine',
 'Which of the following describes the primary mechanism of action of methylphenidate?',
 [('Stimulates release of norepinephrine and dopamine', R, 'Listed for amphetamine, lisdexamphetamine, methylphenidate and dexmethylphenidate; on 10/6 he added serotonin to the catecholamines released.'),
  ('Norepinephrine reuptake inhibitor', W, 'That is cocaine, a complete NET blocker; the amphetamine-like drugs inhibit reuptake only weakly, as a secondary action.'),
  ('Selective, irreversible monoamine oxidase B inhibitor', W, 'That is selegiline.'),
  ('Central α2 agonist', W, 'That is clonidine and guanfacine.')],
 'Dextroamphetamine/amphetamine, methylphenidate, lisdexamphetamine and dexmethylphenidate work mainly by stimulating presynaptic release of norepinephrine, dopamine and serotonin, with weak-to-moderate inhibition of reuptake and of monoamine oxidase. More sympathetic outflow gives higher blood pressure and heart rate, tremor, sweating and loss of appetite.',
 'Stimulate pre-synaptic release of NE & DA (indirect antagonist); CNS; HTN, tachycardia, arrythmias, restlessness, loss of appetite',
 cite(5))

add('adr', 'phenelzine',
 'Which statement about phenelzine is CORRECT?',
 [('It can cause a hypertensive crisis with dietary tyramine', R, 'Listed serious adverse reaction: hypertensive crisis due to dietary tyramine.'),
  ('It is a selective, reversible monoamine oxidase B inhibitor', W, 'Phenelzine is non-selective (MAO-A and MAO-B) and irreversible; selegiline is the selective MAO-B drug.'),
  ('It blocks norepinephrine reuptake', W, 'That is cocaine.'),
  ('It is a direct α1 agonist', W, 'That is phenylephrine.')],
 'Phenelzine irreversibly inhibits both monoamine oxidase A and B (MAO-A and MAO-B), so the breakdown of norepinephrine is inhibited. Its serious adverse reaction is a hypertensive crisis from dietary tyramine in fermented foods (cheese, bread, wine): the “cheese effect”.',
 'Phenelzine: Non-selective MOA-A & MOA-B irreversible antagonist; Inhibits breakdown of NE; Serious ADR → HTN crisis due to dietary Tyramine',
 cite(5))

add('adr', 'mao-tell',
 'Which drug is a selective, irreversible inhibitor of monoamine oxidase B (MAO-B)?',
 [('Selegiline', R, 'Selegiline: selective MAO-B irreversible antagonist (low doses).'),
  ('Phenelzine', W, 'Phenelzine inhibits both MAO-A and MAO-B (non-selective).'),
  ('Cocaine', W, 'Cocaine is a norepinephrine reuptake inhibitor.'),
  ('Mirtazapine', W, 'Mirtazapine is an α2 (and α1, muscarinic, H1) antagonist.')],
 'Both monoamine oxidase (MAO) drug groups inhibit breakdown of norepinephrine and are irreversible. Phenelzine blocks MAO-A and MAO-B (non-selective); selegiline blocks MAO-B (B for brain) selectively, so it carries no tyramine “cheese effect”.',
 'Selegiline, Rasagiline: SELECTIVE MAO-B irreversible antagonist; Inhibits breakdown of NE',
 cite(5), tags=['tell'])

add('adr', 'group-indirect-adr',
 'Which drugs raise synaptic norepinephrine indirectly rather than binding adrenergic receptors?',
 [('Cocaine', R, 'Norepinephrine reuptake inhibitor.'),
  ('Methylphenidate', R, 'Stimulates presynaptic release of norepinephrine and dopamine.'),
  ('Phenelzine', R, 'Inhibits monoamine oxidase, the enzyme that breaks down norepinephrine.'),
  ('Selegiline', R, 'Inhibits monoamine oxidase B (MAO-B).'),
  ('Phenylephrine', W, 'A direct α1 agonist.'),
  ('Clonidine', W, 'A direct α2 agonist.'),
  ('Prazosin', W, 'A direct α1 antagonist.')],
 'The list’s indirect adrenergic drugs act on norepinephrine handling, not on the receptor: cocaine blocks reuptake; amphetamines and methylphenidate stimulate release; phenelzine and selegiline inhibit breakdown by monoamine oxidase (MAO).',
 'Cocaine: NE reuptake inhibitor. Amphetamine/Methylphenidate: Stimulate pre-synaptic release of NE & DA. Phenelzine, Selegiline, Rasagiline: Inhibits breakdown of NE',
 cite(5), multi=True)

add('adr', 'moa-prazosin',
 'Which of the following describes the mechanism of action of doxazosin?',
 [('Selective, reversible α1 antagonist', R, 'Prazosin, terazosin, doxazosin and tamsulosin (α1a) are selective, reversible α1 antagonists.'),
  ('Non-selective, irreversible α1 and α2 antagonist', W, 'That is phenoxybenzamine.'),
  ('α2 agonist', W, 'That is clonidine and the related α2 agonists.'),
  ('β1, β2 and α1 antagonist', W, 'That is carvedilol.')],
 'Prazosin, terazosin, doxazosin and tamsulosin block α1 receptors selectively and reversibly (tamsulosin is listed for α1a). Sites listed: brain, eye, nose, blood vessels and urethra. Blocking α1 on blood vessels decreases preload and afterload.',
 'Prazosin, Terazosin, Doxazosin, Tamsulosin → α1a: SELECTIVE α1 antagonist reversible',
 cite(5))

add('adr', 'adr-alpha1-block',
 'Which adverse reaction is listed for the selective α1 antagonists such as prazosin?',
 [('Orthostatic hypotension leading to reflex tachycardia', R, 'Listed with headache, blurred vision and sexual dysfunction.'),
  ('Rebound congestion', W, 'That is phenylephrine (α1 agonist).'),
  ('Hypertensive crisis when the drug is stopped abruptly', W, 'That is the α2 agonists (clonidine and others).'),
  ('Dry mouth', W, 'Dry mouth is the common complaint with clonidine (α2 agonist).')],
 'Blocking α1 relaxes veins (blood pools, orthostatic hypotension and syncope, the first-dose effect) and arteries (the baroreceptors respond with reflex tachycardia). Blurred vision (α1 in the eye) and headache (common to vasodilators) complete the slide’s list; the drug list adds sexual dysfunction.',
 'Headache; Blurred vision; Orthostatic hypotension → reflex tachycardia; Sexual dysfunction',
 cite(5))

add('adr', 'phenoxybenzamine',
 'Which statement about phenoxybenzamine is CORRECT?',
 [('It blocks α1 and α2 irreversibly', R, 'Listed: non-selective α1 and α2 antagonist, irreversible, with a longer duration of action.'),
  ('It blocks α1 selectively and reversibly', W, 'That is prazosin, terazosin, doxazosin and tamsulosin.'),
  ('It activates α2 receptors in the brain', W, 'Activating central α2 is clonidine and the related agonists.'),
  ('It blocks β1 and β2 receptors', W, 'That is propranolol, pindolol and timolol.')],
 'Phenoxybenzamine blocks α1 and α2 non-selectively and irreversibly, which decreases peripheral resistance and gives a longer duration of action. The list notes its α2 block on parasympathetic fibers causes gastrointestinal stimulation, and that it can control a phenelzine hypertensive crisis short term.',
 'Phenoxybenzamine: Non-selective α1 & α2 antagonist irreversible; Decrease peripheral resistance; Longer duration of action (irreversible → highest affinity for α1)',
 cite('5–6'))

add('adr', 'phenoxybenzamine-gi',
 'Phenoxybenzamine causes gastrointestinal (GI) stimulation. Which explanation does the drug list give?',
 [('α2 on parasympathetic fibers is blocked', R, 'Listed: “GI stimulation (α2 on PNS fiber blocked)”; the list’s α2-agonist row gives the reverse: less acetylcholine in the gut.'),
  ('α1 receptors on gut smooth muscle are activated', W, 'Phenoxybenzamine is an antagonist; it does not activate receptors.'),
  ('Acetylcholinesterase in the gut is inhibited', W, 'That is the cholinesterase inhibitors.'),
  ('M3 receptors in the gut are blocked', W, 'Blocking gut M3 causes constipation, not stimulation.')],
 'The drug list explains phenoxybenzamine’s GI stimulation by α2 block on parasympathetic (PNS) fibers. The α2-agonist row states the opposite direction: α2 activation works through a GI inhibitory negative-feedback pathway that leaves less acetylcholine, giving constipation.',
 'GI stimulation (α2 on PNS fiber blocked). [α2 agonists:] constipation (activates GI inhibitory negative feedback pathway → less Ach)',
 cite(6), tags=['apply'])

add('adr', 'mirtazapine',
 'Which receptor does mirtazapine block to cause drowsiness?',
 [('H1', R, 'Listed: blocks H1 → drowsiness.'),
  ('α1', W, 'Mirtazapine blocks α1 too, but the list ties drowsiness to H1 block.'),
  ('α2', W, 'α2 block enhances release of norepinephrine and serotonin; the list ties drowsiness to H1.'),
  ('β1', W, 'Mirtazapine is not listed as acting at β receptors.')],
 'Mirtazapine is a non-selective antagonist at α2, α1, muscarinic and H1 receptors (the list adds 5-HT2a), acting in the central nervous system. α2 block enhances release of norepinephrine and serotonin; blocking H1 and muscarinic receptors causes drowsiness (sedation).',
 'Mirtazapine: NON-SELECTIVE α2 antagonist, α1 antagonist, Muscarinic antagonist, H1 antagonist, 5-HT2a antagonist; Enhances release of NE & 5-HT (serotonin); Blocks H1 release → drowsiness',
 cite(6))

add('adr', 'mirtazapine-edema',
 'Why does mirtazapine cause peripheral edema?',
 [('α2 block in small vessels dilates them', R, 'Listed: α2 in small blood vessels causes vasoconstriction, so the antagonist causes vasodilation → peripheral edema.'),
  ('H1 block in the brain causes fluid retention', W, 'The list ties H1 block to drowsiness.'),
  ('Muscarinic block in the gut causes edema', W, 'Muscarinic block is tied to xerostomia and constipation.'),
  ('α1 activation in the kidney retains sodium', W, 'Mirtazapine blocks α1; it does not activate it.')],
 'The list explains mirtazapine’s peripheral edema through α2: α2 receptors in small blood vessels cause vasoconstriction, so blocking them causes vasodilation and fluid collects peripherally. Other listed reactions are drowsiness, weight gain, increased cholesterol, xerostomia, constipation and hypertension.',
 'α2’s located in small blood vessels cause vasoconstriction → antagonist will cause vasodilation → peripheral edema',
 cite(6), tags=['apply'])

add('adr', 'moa-clonidine',
 'Which of the following describes the mechanism of action of guanfacine?',
 [('α2 agonist', R, 'Clonidine, brimonidine, tizanidine, guanfacine and dexmedetomidine are α2 agonists.'),
  ('α2 antagonist', W, 'That is mirtazapine.'),
  ('α1 agonist', W, 'That is phenylephrine.'),
  ('Selective α1 antagonist', W, 'That is prazosin and the other -osins.')],
 'The α2 agonists act in the central nervous system, where they enhance inhibition and suppress the sympathetic nervous system. Their listed adverse reactions are sedation, dry mouth, hypotension, bradycardia, sexual dysfunction, depression and constipation.',
 'Clonidine, Brimonidine, Tizanidine, Guanfacine, Dexmedetomidine: α2 agonist; CNS; Enhance inhibitory / suppress SNS',
 cite(6))

add('adr', 'clonidine-withdrawal',
 'A patient stops clonidine abruptly. Which reaction is listed, and why?',
 [('Hypertensive crisis, from up-regulated receptors', R, 'Listed: hypertensive crisis can occur if taken off drug abruptly due to up-regulation of receptors.'),
  ('Bradycardia, from extra parasympathetic tone', W, 'Stopping clonidine removes the brake on the sympathetic system; pressure and heart rate rise.'),
  ('Rebound congestion, from down-regulated α1 receptors', W, 'That is phenylephrine.'),
  ('Orthostatic hypotension, from α1 block', W, 'That is the first-dose effect of prazosin.')],
 'Clonidine activates central α2 receptors and suppresses sympathetic outflow. During treatment the receptors up-regulate, so stopping the drug abruptly can cause a hypertensive crisis.',
 'Hypertensive crisis can occur if taken off drug abruptly due to up-regulation of receptors',
 cite(6), tags=['apply'])

add('adr', 'adr-alpha2-agonist',
 'Which adverse reactions are listed for the α2 agonists such as clonidine?',
 [('Sedation', R, 'Listed.'),
  ('Dry mouth', R, 'Listed.'),
  ('Bradycardia', R, 'Listed (suppressed sympathetic outflow).'),
  ('Hypotension', R, 'Listed.'),
  ('Tachycardia and arrhythmias', W, 'Those follow from more sympathetic drive, as with cocaine and the amphetamines.'),
  ('Rebound nasal congestion', W, 'That is phenylephrine.')],
 'α2 agonists suppress the sympathetic nervous system from the central nervous system. Listed reactions: sedation, dry mouth, hypotension, bradycardia, sexual dysfunction, depression and constipation (the list says through a gastrointestinal inhibitory feedback pathway → less acetylcholine).',
 'Sedation, dry mouth, hypotension, bradycardia, sexual dysfunction, depression, constipation',
 cite(6), multi=True)

add('adr', 'moa-dobutamine',
 'Which drug is a β1 agonist that is β1 selective at low dose?',
 [('Dobutamine', R, 'Listed: β1 agonist; low dose β1 selective; high dose β1 > β2 > α1.'),
  ('Isoproterenol', W, 'Isoproterenol is a β1 and β2 agonist.'),
  ('Albuterol', W, 'Albuterol is a β2 agonist.'),
  ('Metoprolol', W, 'Metoprolol is a selective β1 antagonist.')],
 'Dobutamine activates β1 in the heart (increased heart rate and contractility). At low dose it is β1 selective; at high dose it acts at β1 > β2 > α1. The list notes tachycardia, arrhythmias, increased renin–angiotensin–aldosterone system (RAAS) activity and central nervous system stimulation as effects.',
 'Dobutamine: β1 agonist; LOW dose: β1 selective; HIGH dose: β1 > β2 > α1',
 cite(6))

add('adr', 'moa-metoprolol',
 'Atenolol, metoprolol and nebivolol (“MAN”) share which mechanism of action?',
 [('Selective β1 antagonist', R, 'Listed as the selective β1 blockers.'),
  ('Non-selective β1 and β2 antagonist', W, 'That is propranolol, pindolol and timolol.'),
  ('β1, β2 and α1 antagonist', W, 'That is carvedilol and labetalol.'),
  ('β1 agonist', W, 'That is dobutamine.')],
 'Metoprolol, atenolol and nebivolol block β1 selectively; their listed sites are the heart, kidneys and brain. Adverse reactions follow from β1 block: decreased heart rate and contractility, bradycardia, fatigue or dizziness, decreased renin–angiotensin–aldosterone system (RAAS) activity and central nervous system (CNS) depression.',
 'Metoprolol, Atenolol, Nebivolol “MAN”: SELECTIVE β1 antagonist “β1 beta-blockers”; Heart, Kidneys, Brain',
 cite('6–7'))

add('adr', 'adr-beta1-block',
 'Which adverse reaction is listed for the selective β1 antagonists such as atenolol?',
 [('Bradycardia', R, 'Listed with decreased heart rate and contractility, fatigue/dizziness, decreased RAAS and CNS depression.'),
  ('Tachycardia', W, 'Tachycardia is a β1 agonist (dobutamine) effect.'),
  ('Orthostatic hypotension with reflex tachycardia', W, 'That is the α1 antagonists.'),
  ('Rebound congestion', W, 'That is phenylephrine.')],
 'Selective β1 antagonists act on the heart, kidneys and brain. Blocking β1 in the heart decreases heart rate and contractility (bradycardia); in the kidney it decreases the renin–angiotensin–aldosterone system (RAAS); in the brain it gives fatigue, dizziness and central nervous system (CNS) depression.',
 'Decreased heart rate and contractility; Fatigue / dizziness; Bradycardia; Decreased RAAS; CNS depression',
 cite('6–7'))

add('adr', 'saba-laba',
 'Which drugs are long-acting β2 agonists (LABA)?',
 [('Salmeterol', R, 'Listed under LABA.'),
  ('Formoterol', R, 'Listed under LABA.'),
  ('Albuterol', W, 'Listed under SABA (short-acting β2 agonist).'),
  ('Levalbuterol', W, 'Listed under SABA (short-acting β2 agonist).'),
  ('Tiotropium', W, 'Tiotropium is a long-acting muscarinic antagonist, not a β2 agonist.')],
 'The list’s β2 agonists are short-acting (SABA: albuterol, levalbuterol) and long-acting (LABA: salmeterol, formoterol). Sites: lungs, vasculature and the central nervous system; effects: bronchial dilation, vasodilation and excitation.',
 'SABA: Albuterol (Ventolin), Levalbuterol (Xopenex). LABA: Salmeterol, Formoterol. β2 agonist',
 cite(7), multi=True, tags=['tell'])

add('adr', 'soa-beta2',
 'Albuterol is a β2 agonist. Which effects are listed for the β2 agonists?',
 [('Bronchial dilation', R, 'Listed (lungs).'),
  ('Vasodilation', R, 'Listed (vasculature).'),
  ('Excitation', R, 'Listed (central nervous system).'),
  ('Bronchial constriction', W, 'Bronchial constriction comes from M3 activation; β2 dilates.'),
  ('Bradycardia', W, 'Bradycardia is a β1-blocker or muscarinic agonist effect.')],
 'The β2 agonists act on the lungs, vasculature and central nervous system. The listed effects are bronchial dilation, vasodilation and excitation.',
 'β2 agonist; Lungs, Vasculature, CNS; Bronchial dilation, Vasodilation, Excitation',
 cite(7), multi=True)

add('adr', 'moa-propranolol',
 'Which of the following describes the mechanism of action of propranolol?',
 [('Non-selective β1 and β2 antagonist', R, 'Propranolol, pindolol and timolol are listed as non-selective β blockers (β1 and β2).'),
  ('Selective β1 antagonist', W, 'That is metoprolol, atenolol and nebivolol.'),
  ('β1, β2 and α1 antagonist', W, 'That is carvedilol and labetalol.'),
  ('Non-selective α1 and α2 antagonist', W, 'That is phenoxybenzamine.')],
 'Propranolol blocks β1 and β2. Its listed sites are the heart, kidneys, brain, lungs and vasculature. Because it blocks β2 in the lungs it is listed as contraindicated in asthma patients, and it masks the nervousness and tremor of hypoglycemia.',
 'Propranolol, Pindolol (PARTIAL AGONIST), Timolol: NON-SELECTIVE Beta-blockers; β1 & β2 antagonist',
 cite(7))

add('adr', 'pindolol',
 'Which drug in the non-selective β-blocker group is marked as a partial agonist?',
 [('Pindolol', R, 'Listed as “Pindolol (PARTIAL AGONIST)” in the non-selective β1 and β2 group.'),
  ('Propranolol', W, 'Propranolol is listed as a non-selective β antagonist without partial agonism.'),
  ('Timolol', W, 'Timolol is listed as a non-selective β antagonist without partial agonism.'),
  ('Metoprolol', W, 'Metoprolol is a selective β1 antagonist.')],
 'Pindolol sits in the non-selective β-blocker row with propranolol and timolol but is marked as a partial agonist; the Exam 1 list also called it a β1 and β2 partial agonist. A partial agonist activates the receptor submaximally and competes with full agonists.',
 'Pindolol (PARTIAL AGONIST) (antagonist)',
 cite(7))

add('adr', 'group-asthma',
 'Which drugs are listed as contraindicated in asthma patients and as masking symptoms of hypoglycemia?',
 [('Propranolol', R, 'Non-selective β blocker: blocks β2 in the lungs.'),
  ('Timolol', R, 'Non-selective β blocker.'),
  ('Carvedilol', R, 'β1, β2 and α1 antagonist.'),
  ('Labetalol', R, 'β1, β2 and α1 antagonist.'),
  ('Albuterol', W, 'A β2 agonist; it dilates the bronchi.'),
  ('Dobutamine', W, 'A β1 agonist.'),
  ('Clonidine', W, 'A central α2 agonist.')],
 'The drugs that block β2 as well as β1 — propranolol, pindolol, timolol, carvedilol and labetalol — are listed as contraindicated for asthma patients and as masking symptoms of hypoglycemia (no nervousness or tremors).',
 'Mask symptoms of hypoglycemia → no nervousness / tremors … Contraindicated for asthma pts',
 cite(7), multi=True)

add('adr', 'moa-carvedilol',
 'Which of the following describes the mechanism of action of labetalol?',
 [('β1, β2 and α1 antagonist', R, 'Carvedilol and labetalol are listed as β1 and β2 antagonists and α1 antagonists.'),
  ('Selective β1 antagonist', W, 'That is metoprolol, atenolol and nebivolol.'),
  ('Selective, reversible α1 antagonist', W, 'That is prazosin and the related drugs.'),
  ('β3 agonist', W, 'That is mirabegron.')],
 'Carvedilol and labetalol block β1, β2 and α1. Their listed effects follow from β block (decreased heart rate and contractility, bradycardia, fatigue, decreased renin–angiotensin–aldosterone system (RAAS) activity) and they share the asthma contraindication and the masking of hypoglycemia with the non-selective β blockers.',
 'Carvedilol (Coreg), Labetalol (Trandate): β1 & β2 antagonist, & α1 antagonist',
 cite(7))

add('adr', 'mirabegron',
 'Which drug is a β3 agonist acting in the bladder?',
 [('Mirabegron', R, 'Listed: β3 agonist; site of action the bladder; relief for overactive bladder.'),
  ('Oxybutynin', W, 'Oxybutynin is a muscarinic antagonist at bladder M3.'),
  ('Bethanechol', W, 'Bethanechol is a muscarinic agonist (urinary retention).'),
  ('Tamsulosin', W, 'Tamsulosin is an α1 (α1a) antagonist.')],
 'Mirabegron activates β3 receptors in the bladder and relieves overactive bladder. The list notes it has fewer side effects than the muscarinic antagonists used for the same problem.',
 'Mirabegron: β3 agonist; Bladder; Relief for overactive bladder; Less side effects than muscarinic antagonists',
 cite(7))

add('adr', 'oab-tell',
 'Two drugs for overactive bladder: oxybutynin and mirabegron. Which statement tells them apart?',
 [('Oxybutynin blocks M3; mirabegron activates β3', R, 'Oxybutynin: muscarinic antagonist, more selective for bladder M3. Mirabegron: β3 agonist in the bladder.'),
  ('Oxybutynin activates β3; mirabegron blocks M3', W, 'Reverses the two mechanisms.'),
  ('Both block M3 in the bladder', W, 'Only oxybutynin is a muscarinic antagonist.'),
  ('Both activate β3 in the bladder', W, 'Only mirabegron is a β3 agonist.')],
 'Oxybutynin is a muscarinic antagonist (more selective toward bladder M3) and can cause anti-DUMBBELSS, especially dry mouth and constipation. Mirabegron is a β3 agonist in the bladder with fewer side effects than the muscarinic antagonists.',
 'Oxybutynin … More selective towards the M3 receptors in the bladder. Mirabegron: β3 agonist; Bladder; Less side effects than muscarinic antagonists',
 cite('4, 7', (CHO, '29')), tags=['tell'])

add('adr', 'epinephrine',
 'Which statement about epinephrine’s receptor actions is CORRECT?',
 [('β1, β2 at low dose; all at high dose', R, 'Listed: low dose β1 & β2; high dose: everything.'),
  ('α1 only at every dose', W, 'α1 alone is phenylephrine.'),
  ('β1 only at low dose; β1 > β2 > α1 at high dose', W, 'That is dobutamine.'),
  ('α2 only, acting in the brain', W, 'α2 agonism in the brain is clonidine and the related drugs.')],
 'Epinephrine is released from the adrenal medulla and acts at β2 on smooth muscle (bronchial dilation, vasodilation). The drug list gives β1 and β2 at low dose and all adrenergic receptors at high dose, used for shock and anaphylaxis; patients must be weaned off because the receptors down-regulate.',
 'Epinephrine: β1, β2 agonist (blood vessels); Low dose: β1 & β2; High dose: everything. β2 Agonists - Epinephrine',
 cite(8, (ANS, '35, 42')),
 note='The Exam 1 drug list called epinephrine an α1, α2, β1 and β2 agonist; this list gives β1 and β2 at low dose and all receptors at high dose. The autonomic slides show epinephrine at β2 only. Re-check against the adrenergic deck when it is available.')

add('adr', 'norepinephrine',
 'Norepinephrine released from sympathetic nerves acts as an agonist at which receptors?',
 [('α1, α2 and β1', R, 'Norepinephrine is the neurotransmitter at α1, α2 and β1; β2 is “typically not innervated”. In the gut, norepinephrine acts at α2 to inhibit acetylcholine release.'),
  ('α1 and β1 only', W, 'Leaves out α2 (presynaptic sympathetic neurons, brain, gut).'),
  ('β1 and β2 only', W, 'That is isoproterenol.'),
  ('α1 only', W, 'That is phenylephrine.')],
 'Norepinephrine is the adrenergic neurotransmitter at α1 (blood vessels), α2 (presynaptic sympathetic neurons, brain, gut) and β1 (heart, kidney). β2 receptors are typically not innervated. The drug list adds increased total peripheral resistance, heart rate and contractility, used for shock.',
 'Adrenergic — Norepinephrine — α1, α2, β1; β2 Typically Not innervated. SNS — NE — α2 = Inhibition of Ach Release',
 cite(8, (ANS, '13, 45')),
 note='The drug list gives norepinephrine as an α1, β1 agonist. The autonomic slides show it acting at α1, α2 and β1 (and at α2 in the gut). Keyed to the slides. The Exam 1 drug list called it an α1, α2, β1 and β2 agonist.')

add('adr', 'isoproterenol',
 'Which drug is listed as a β1 and β2 agonist that can cause hyperglycemia, palpitations and tachycardia?',
 [('Isoproterenol', R, 'Listed: β1, β2 agonist (lungs); heart and lungs; hyperglycemia, palpitations, tachycardia, arrhythmias.'),
  ('Dobutamine', W, 'Dobutamine is β1 selective at low dose.'),
  ('Phenylephrine', W, 'Phenylephrine is an α1 agonist.'),
  ('Propranolol', W, 'Propranolol blocks β1 and β2.')],
 'Isoproterenol activates β1 and β2; its listed sites are the heart and lungs. Its listed adverse reactions are hyperglycemia, palpitations, tachycardia and arrhythmias.',
 'Isoproterenol: β1, β2 agonist (lungs); Heart & lungs; Hyperglycemia, Palpitations, Tachycardia, Arrythmias',
 cite(8))

add('adr', 'group-alpha-block',
 'Which drugs block α1 receptors?',
 [('Terazosin', R, 'Selective, reversible α1 antagonist.'),
  ('Prazosin', R, 'Selective, reversible α1 antagonist.'),
  ('Carvedilol', R, 'β1, β2 and α1 antagonist.'),
  ('Mirtazapine', R, 'Listed as an α1 antagonist among its receptors.'),
  ('Phenylephrine', W, 'Phenylephrine activates α1.'),
  ('Selegiline', W, 'Selegiline inhibits monoamine oxidase B; it does not block α1.'),
  ('Clonidine', W, 'Clonidine activates α2.')],
 'α1 block appears in four rows of the list: the selective α1 antagonists (prazosin, terazosin, doxazosin, tamsulosin), phenoxybenzamine (α1 and α2, irreversible), carvedilol and labetalol (with β1 and β2), and mirtazapine (with α2, muscarinic and H1).',
 'SELECTIVE α1 antagonist reversible … Non-selective α1 & α2 antagonist irreversible … β1 & β2 antagonist, & α1 antagonist … α1 antagonist (mirtazapine)',
 cite('5–7'), multi=True)

add('adr', 'group-beta-agonists',
 'Which drugs are β agonists?',
 [('Dobutamine', R, 'β1 agonist.'),
  ('Levalbuterol', R, 'β2 agonist (SABA).'),
  ('Mirabegron', R, 'β3 agonist.'),
  ('Isoproterenol', R, 'β1 and β2 agonist.'),
  ('Pindolol', W, 'Listed in the β-blocker row (marked partial agonist), coloured as an antagonist.'),
  ('Nebivolol', W, 'Selective β1 antagonist.'),
  ('Labetalol', W, 'β1, β2 and α1 antagonist.')],
 'The β agonists on the list are dobutamine (β1), albuterol, levalbuterol, salmeterol and formoterol (β2), mirabegron (β3), isoproterenol (β1, β2) and epinephrine (β1, β2 at low dose). Pindolol is listed with the β blockers although marked as a partial agonist.',
 'Dobutamine: β1 agonist. SABA/LABA: β2 agonist. Mirabegron: β3 agonist. Isoproterenol: β1, β2 agonist',
 cite('6–8'), multi=True)

# ======================= RAAS (raas) =======================
add('raas', 'aliskiren',
 'Which of the following describes the mechanism of action of aliskiren?',
 [('Selective, reversible renin inhibitor', R, 'Listed: selective renin inhibitor, reversible; renin is the first and rate-limiting step of the RAAS pathway.'),
  ('Angiotensin-converting enzyme inhibitor', W, 'That is captopril, enalapril, lisinopril and the other “-prils”.'),
  ('Angiotensin II (AT1) receptor blocker', W, 'That is losartan, valsartan and the other “-sartans”.'),
  ('Mineralocorticoid receptor antagonist', W, 'That is spironolactone and eplerenone.')],
 'Aliskiren inhibits renin in the blood stream; renin is the first and rate-limiting enzyme of the renin–angiotensin–aldosterone system (RAAS). It has low bioavailability but high affinity for renin, and it lowers total peripheral resistance and aldosterone.',
 'Aliskiren: Selective Renin inhibitor; REVERSIBLE antagonist; Blood stream (Renin - 1st step in RAAS pathway); Renin is the rate limiting enzyme for the RAAS pathway',
 cite(8))

add('raas', 'acei',
 'Which of the following describes the mechanism of action of lisinopril?',
 [('Reversible angiotensin-converting enzyme inhibitor', R, 'Listed: ACE inhibitor, reversible; ACE converts angiotensin I to angiotensin II and breaks down bradykinin.'),
  ('Reversible angiotensin II type 1 (AT1) receptor blocker', W, 'That is losartan and the other angiotensin receptor blockers.'),
  ('Selective renin inhibitor', W, 'That is aliskiren.'),
  ('Selective β1 blocker in the kidney', W, 'That is metoprolol, which lowers renin production.')],
 'Captopril, enalapril, lisinopril, benazepril, quinapril and ramipril inhibit angiotensin-converting enzyme (ACE), which converts angiotensin I to angiotensin II and breaks down bradykinin. Less angiotensin II lowers total peripheral resistance and aldosterone; most are pro-drugs.',
 'ACE inhibitor (Angiotensin converting enzyme inhibitor); REVERSIBLE antagonists. Primary effect: inhibit ACE (ACE converts Ang I to Ang II & breaks down bradykinin)',
 cite(9))

add('raas', 'acei-cough',
 'Why do angiotensin-converting enzyme (ACE) inhibitors such as enalapril cause a dry cough?',
 [('ACE no longer breaks down bradykinin', R, 'Listed: increased levels of bradykinin (a dilator) → dry cough.'),
  ('Angiotensin II activates AT1 in the airway', W, 'ACE inhibitors lower angiotensin II.'),
  ('Aldosterone rises and retains sodium', W, 'ACE inhibitors lower aldosterone.'),
  ('β2 receptors in the lungs are blocked', W, 'β2 block in the lungs is the non-selective β blockers.')],
 'Angiotensin-converting enzyme (ACE) also breaks down bradykinin. Inhibiting ACE raises bradykinin, a dilator, which is the list’s explanation for the dry cough. The other listed reactions are hyperkalemia, angioedema, first-dose hypotension and fetopathic potential.',
 'Bonus effect 2: Increase levels of bradkykinin (dilator) → dry cough',
 cite(9), tags=['apply'])

add('raas', 'arb',
 'Which of the following describes the mechanism of action of losartan?',
 [('Reversible angiotensin II (AT1) receptor blocker', R, 'Listed: ARB (angiotensin II receptor blocker), reversible; primary effect: block AT1.'),
  ('Reversible angiotensin-converting enzyme inhibitor', W, 'That is the “-prils” (captopril, lisinopril and others).'),
  ('Selective renin inhibitor', W, 'That is aliskiren.'),
  ('Mineralocorticoid receptor antagonist', W, 'That is spironolactone and eplerenone.')],
 'Losartan, valsartan, olmesartan, telmisartan and irbesartan are angiotensin II receptor blockers (ARBs) with high affinity for AT1. Blocking AT1 lowers total peripheral resistance and aldosterone, and more AT2 activation opposes AT1. Losartan is active and turns into an even more active metabolite.',
 'ARB (Angiotensin II receptor blocker); REVERSIBLE antagonists. Primary effect: Block AT1. Bonus effect 1: increase AT2 activation (oppose AT1). High affinity for AT1',
 cite(9))

add('raas', 'acei-vs-arb',
 'Which adverse reaction is listed for ACE inhibitors but not for angiotensin II receptor blockers (ARBs)?',
 [('Dry cough', R, 'Listed for ACE (angiotensin-converting enzyme) inhibitors, from increased bradykinin; not listed for ARBs.'),
  ('Hyperkalemia', W, 'Listed for both groups.'),
  ('Angioedema', W, 'Listed for both groups.'),
  ('Lower aldosterone', W, 'Listed as an effect of both groups.')],
 'Both groups lower total peripheral resistance and aldosterone and are listed with hyperkalemia and angioedema. Only the ACE (angiotensin-converting enzyme) inhibitors raise bradykinin, which the list ties to dry cough; for ARBs it lists only hyperkalemia and angioedema.',
 'ACE inhibitor: Dry cough, hyperkalemia, angioedema, first dose hypotension, fetopathic potential. ARB: Hyperkalemia, angioedema',
 cite(9), tags=['tell'])

add('raas', 'spironolactone',
 'Which statement about spironolactone and eplerenone is CORRECT?',
 [('They block the mineralocorticoid receptor', R, 'Listed: mineralocorticoid (MR) receptor antagonists, potassium-sparing diuretics; site: collecting duct of the nephron.'),
  ('They inhibit renin in the blood stream', W, 'That is aliskiren.'),
  ('They block AT1 receptors in the blood stream', W, 'That is the angiotensin II receptor blockers.'),
  ('They cause hypokalemia', W, 'They are potassium-sparing; hyperkalemia is listed.')],
 'Spironolactone and eplerenone are aldosterone antagonists at the mineralocorticoid receptor (MR) in the collecting duct. Aldosterone normally increases production of Na+/K+ channels and pumps; blocking it gives less Na+ reabsorption. Listed reactions: hyperkalemia, diarrhea, drowsiness, and in males gynecomastia and impotence.',
 'Spironolactone, Eplerenone: Potassium-sparing diuretic; Mineralocorticoid (MR) receptor antagonist; Kidney → Collecting duct of nephron; Hyperkalemia, diarrhea, drowsiness; Males: gynecomastia & impotence',
 cite('9–10'))

add('raas', 'group-hyperkalemia',
 'Which renin–angiotensin–aldosterone system (RAAS) drugs are listed with hyperkalemia as an adverse reaction?',
 [('Ramipril', R, 'Angiotensin-converting enzyme (ACE) inhibitor: hyperkalemia listed.'),
  ('Valsartan', R, 'Angiotensin II receptor blocker (ARB): hyperkalemia listed.'),
  ('Eplerenone', R, 'Mineralocorticoid receptor antagonist: hyperkalemia listed.'),
  ('Aliskiren', W, 'Aliskiren’s listed reactions are angioedema, hypotension, cough, headache, diarrhea and skin rash.'),
  ('Metoprolol', W, 'In the RAAS section metoprolol is listed for less renin production; no hyperkalemia is listed.')],
 'Hyperkalemia is listed for the ACE inhibitors, the angiotensin II receptor blockers and the mineralocorticoid receptor antagonists (potassium-sparing diuretics). It is not listed for aliskiren.',
 'ACE inhibitor: … hyperkalemia … ARB: Hyperkalemia, angioedema. Spironolactone/Eplerenone: Hyperkalemia, diarrhea, drowsiness',
 cite('8–10'), multi=True)

add('raas', 'metoprolol-renin',
 'How does metoprolol lower renin–angiotensin–aldosterone system (RAAS) activity?',
 [('It blocks renal β1, so less renin is made', R, 'Listed: selective β1 blocker; site kidney; less renin production.'),
  ('It inhibits angiotensin-converting enzyme', W, 'That is the ACE inhibitors.'),
  ('It blocks the mineralocorticoid receptor', W, 'That is spironolactone and eplerenone.'),
  ('It inhibits renin directly in the blood stream', W, 'Direct renin inhibition is aliskiren.')],
 'The RAAS section lists metoprolol, a selective β1 blocker, with the kidney as its site: blocking β1 there means less renin production, so the renin–angiotensin–aldosterone pathway is not started. The adrenergic section lists decreased RAAS among the effects of the β1 blockers.',
 'Metoprolol: Selective β1 blocker; Kidney; Less renin production → no RAAS pathway',
 cite(10), tags=['apply'])

# --------------------------------------------------------------------------
# Transcript 10/5 (NMJ deck end + whole cholinergic deck, drug by drug).
# Every NMJ / cholinergic item he discussed gets his words as its quote,
# '; transcript 10/5' in its cite and source 'both'.  Quotes are verbatim from
# the transcript file (its spellings kept, e.g. "karate" for curare); ' … '
# joins separate spans.
# --------------------------------------------------------------------------
TQ = {
 'DL2-001': "Now, this group is gonna be divided in two different categories, depolarizing, which is the same thing as an agonist, it is activating the receptors, and non-depolarizing, which is gonna be the antagonist. … Acetylcholine is an agonist, but it's broken down very quickly.",
 'DL2-002': "So what is the mechanism of action for Chantix? So it's a partial agonist to what? The alpha 4, beta 2, nicotinic, what type of nicotinic receptor? And for what neuronal.",
 'DL2-003': "If it's neuronal, that should be a key that the site of action that drugs where in the brain.",
 'DL2-004': "As such, some of the side effects are gonna be where in the brain, depression, lack of being able to sleep because you are activating the receptors … Uh, there's also some GI side effects. Uh, I don't think if I listed for you guys, but flatulence is a complaint for the patients. They get a lot of gas.",
 'DL2-005': "You must know that a sucycholine is an agonist that depolarize or open those ion channels. That's the mechanism of action.",
 'DL2-006': "And the first one is that opening of all the receptors. That's called phase one. And then if it stays around longer, now it actually can get lodged inside of that channel. And that will be a phase 2. Now it's blocking anything from going through.",
 'DL2-007': "so they may get hyperkalemia … So patients can get actually hyperthermia. They get too hot, right, because they can't, their muscles. … so your blood pressure is gonna go up, hypertension, and your heart is gonna be fighting between the parasympathetic and the sympathetic … And patients actually complain of uh muscle pain, myalgia",
 'DL2-008': "So if you infuse for a longer period of time, you're gonna start to open those nicotinic receptors in the ganglia, which is gonna increase your parasympathetic and sympathetic at the same time.",
 'DL2-009': "Uh, this is what I was telling you about that malignant hyperthermia. Their, their body pressure gets really, really high, uh, especially if you combine with an anesthetic that put them to sleep, such as halotane.",
 'DL2-010': "But for our purpose on exam two, all I need you to know is that any karate-like drug is what? A competitive, reversible NM antagonist, and by blocking the NM, what are you gonna get? Paralysis, right?",
 'DL2-011': "However, if you know that it is a C U R in the middle, it doesn't matter if it's vecuronio, Rocuronio, Pencuronio. They're all the same.",
 'DL2-012': "If a patient is administered Rocuronium. Which of the following is most likely to occur? … So what we have over here is paralysis. That's always going to happen.",
 'DL2-013': "The key thing for you to remember is these drugs don't cross the blood brain barrier. They have no effect on memory or putting your patient to sleep. They just paralyze your patients.",
 'DL2-014': "So one over here, they're both reversible, right, but physostigamine, it crosses the brain, the blood vein barrier, penetrates the blood vein barrier, as neostigimine or pyredos stigmine do not cross the blood vein barrier.",
 'DL2-015': "So, uh, Pfizostigamine typically is gonna be used for as an antidote if somebody has this, uh, you know, overdose on, say, atropine",
 'DL2-016': "physostigamine, it crosses the brain, the blood vein barrier, penetrates the blood vein barrier, as neostigimine or pyredos stigmine do not cross the blood vein barrier. … For our exam purpose, I only need you to know rivastigamine and donepezil … And those drugs are extremely lipid soluble. They will get to the brain",
 'DL2-017': "as neostigimine or pyredos stigmine do not cross the blood vein barrier. … But for myasthenia gravis patients, let's keep the one that stays in the periphery",
 'DL2-018': "So neo stigamine, which does not cross the blood brain barrier but can increase the levels of acetylcholine in the synapse of your skeletal muscle, would give you a better chance of outcompeting karate and regain some movement for your friend. Yes. I have a question similar to this in the exam every year, and about 30% of the class misses it.",
 'DL2-019': "So for our purpose on the exam, I'm not too worried about androfomia, right? What I worry about is the one that you're gonna be dispensing to your patients.",
 'DL2-020': "So what kind of side effects do you expect this drug to produce? Dumbbells across the border, right? … So diarrhea, urination, meiosis, bronchial constriction, bradycardia, emesis, which is the same thing as vomiting, lachrymation, salivation, and stimulation of the brain",
 'DL2-021': "So what we can do is we can get echothiofate. … Those are irreversible antagonists to the acetylchonasterase enzyme.",
 'DL2-022': "Uh, as a side effect over here, right, it's gonna cause some of meiosis, blurred vision, because your pupils are gonna get smaller. You can't help that. You can get the the lachrymation. Anything that you put in the eye is gonna sting, it's gonna cause a little bit of uh redness to the eye.",
 'DL2-023': "So Botox is an enzyme that breaks down the snare protein, and if you don't have the snare protein, your vesicles can't bind properly and thus you can't release the cetylcholine.",
 'DL2-024': "Now, the key for you in the exam is anytime you see a drug that has a stickyine in it, you know it has to do what with the pseudocholinesterase enzyme. … and rivasciamine is an antagonist to the psytocholesterase enzyme.",
 'DL2-025': "Pennyline is a partial agonist to the NN receptor. Succylcholine is an agonist to the nicotinic receptor. … Acetylcholine is an agonist, but it's broken down very quickly.",
 'DL2-026': "Well, for these drugs, all of them are gonna be non-selective agonists to the M1s, M2s, and M3s. … They're all reversible, so they're all competitive, they're gonna bind, and they're gonna come off.",
 'DL2-027': "So, I have over here methylcholine, carbacol, Bethenacol, so they all have that call for cholinergic, right? … but for our purpose on the exam, I'm gonna expect you to know pilocarpine as one of the two, OK?",
 'DL2-028': "I don't care if you know that it is an aure, that is not hydrolyzed, that's mad Kim kind of stuff, right?",
 'DL2-029': "What I need you to know is that it does not bind or activate the nicotinic receptors. It only has affinity for the muscarinics.",
 'DL2-030': "So when we give an agonist, we're gonna produce what the dumbbells, right? We're gonna increase motilage in tone, so diarrhea, cramping, increased urination, uh, meiosis, which makes your pupil small, bradycardia, bronchial constriction, emesis",
 'DL2-031': "So when you see drugs like atropine with a trope, what you should be thinking about, those are non-selective muscarinic antagonists that is going to block the M1s, the M2s, and the M3s everywhere else. … This drug is going to be also reversible as well.",
 'DL2-032': "The anti-dumbbells, if it is for diarrhea, you get constipation. … Meiosis, you get the midriasis. Your pupils dilate, instead of getting the bronchial constriction, you get bronchial dilation. You can't cry. You can't sweat, and you're gonna go sedated.",
 'DL2-033': "So if I block the M2s, now the sympathetic is unopposed, I'm going to get what? tachycardia.",
 'DL2-034': "You wanna give to pm to break some of those bonds, but it can't stop the dumbbells, right? So how can we manage the dumbbells? By giving atropine.",
 'DL2-035': "We also have the scopolamine, which is a non-selective muscarin. That one is really non-selective. That not only blocks all the muscarinics, but also histamine and serotonin receptors.",
 'DL2-036': "Typical typically people use dromamine or scopolamine for motion sickness. … You're drowsy, but you have to take about 3 hours before you get on the boat",
 'DL2-037': "Uh, we can also use an analog of atropine called benztropine. This is a drug used for treatment of Parkinson's disease. … benzotropine is more selective to the beta 1s in the to the M1s in the brain, and it's gonna have less of those anti-dumbbells that you can get, uh, someplace else.",
 'DL2-038': "Well, we know that the sympathetic cause pupil dilation. The parasympathetic cause pupil constriction. … So by blocking those M3s, I'm gonna get, instead of pupil constriction, I'm gonna get pupil dilation, also known as madriasis.",
 'DL2-039': "So we have, for example, ipratropium, that's the short acting called SAA, right? Or the teotropin-like drugs, which are called the lemmas.",
 'DL2-040': "The ipratropium and the tiotropium are less selective, but what we have done for them is change their chemical structure so that they have very low bioavailability, so they stay primarily within the lungs. So even though they can affect the M2s or the M3s, it's very likely, unlikely because they don't get systemic.",
 'DL2-041': "And we have two drugs, the clinidiums in the bottom. Those are really long acting. … So they have a very high tight binding, so a very high affinity, and they're more selective to the M3s.",
 'DL2-042': "So for example, if your patient has COPD and they use an inhaler, where do you want the drug to be at? In the lungs. … so that they have very low bioavailability, so they stay primarily within the lungs.",
 'DL2-043': "So by giving this muscarinic antagonist and blocking the M3s in the bladder, we're gonna relax the bladder so you don't have that urgency of having to go potty all the time. … these drugs, they are designed, bless you, to be more selective to the M3s in the bladder",
 'DL2-044': "Now, oxybutynin over here, uh, when we look at their anti-muscarin effect, they are less selective. They can affect the M1s and they can affect the M3s. What effect they would have by affecting the M1s? What would be the site of action? The brain, right? So they'll cause sedation.",
 'DL2-045': "If I give enough of VESIcare, I'm gonna get all the anti-dumbbells.",
}

# His exam-scope statements on 10/5 that take items out of the bank.  The item
# --------------------------------------------------------------------------
# Transcript 10/6 (adrenergic deck slides 1–32).  Released adrenergic items get
# his words as their quote, the deck slides and '; transcript 10/6' in the cite,
# and source 'both'.  Quotes are verbatim from the transcript file (its spellings
# kept); ' … ' joins separate spans.
# --------------------------------------------------------------------------
TQ6 = {  # concept: (deck slides, quote)
 'moa-phenylephrine': ('9, 17–18', "on the selective side, I have phenyphrine as a selected alpha 1 agonist. Pheenyphrine sounds like epinephrine, norepinephrine, so you know it's affecting the alpha 1 receptor in a way. … Yes, it's an agonist to the alpha 1, so it's gonna activate it and it's gonna activate the GQ pathway which is gonna increase calcium inside of those smooth muscles which leads to vasoconstriction, right."),
 'adr-phenylephrine': ('18', "And then there are some side effects associated with that, which of course if you put anything in the eye, it's going to cause some burning, blurred vision, uh, you may have rebound congestion. As such, if you read in the back of the box, it tells you you don't use for more than 3 days."),
 'moa-cocaine': ('10', "So cocaine is a reuptake inhibitor. This drug blocks the net transporter, and if I block the net transporter, what is going to happen to the levels of norepinephrine? Would increase, which means is it's gonna cause what activation of those postsynaptic receptors, right?"),
 'moa-amphetamine': ('11', "So they do not work typically by binding and activating the receptors. They are indirectly enhancing the release, so they stimulate the release of catecholamine, such as norepinephrine, serotonin, and dopamine, OK?"),
 'phenelzine': ('14–15', "We have the non-selectives, and I picked phenelzine as our prototypical drug. This drug is an irreversible antagonist, which means is, once you bind that enzyme, your body has to make new ones. … you have the inability to break down that dietary tyramine that you're consuming, and those fermented foods have high levels of tyramine, and that can cause what is called a hypertensive crisis."),
 'mao-tell': ('14–15', "And then we have a better MAO inhibitor, uh, selegiline, which is selective to the MAOB. … So there is no cheese effect with the selective irreversible MAOB inhibitors in that process."),
 'group-indirect-adr': ('9', "The other ones over here that are indirectly we have the amphetamine-like drugs. … We have drugs like cocaine that are used recreationally … And then we have some of the MAO inhibitors that by blocking the enzyme that breaks down catecholamines, we can increase the levels in the brain"),
 'moa-prazosin': ('27–28', "So this is a reversible antagonist that is highly selective to the alpha ones. … For our exam purpose, all I need to know if you see a drug with OC is a selective alpha-1 antagonist."),
 'adr-alpha1-block': ('30', "So we have that first dose effect that is gonna cause the reflex tachycardia because your barrels are gonna sense that your blood pressure is too low. You can't get enough blood to the heart, not enough blood to the head."),
 'mirtazapine': ('31–32', "Furthermore, this drug blocks histamine and muscarinic type one in the brain. What is the side effect of having a drug that blocks the muscarinic and the histamine receptors? Sedation, right?"),
 'moa-clonidine': ('21–22', "So here are our list for our alpha 2 agonists, but if you know clonidine, most of these drugs when needine, it's gonna be an alpha 2 agonist. … we add the Intuniv, which is a similar drug to it"),
 'clonidine-withdrawal': ('26', "So what is the one education point that you have to make to your patients? You got to wean yourself off because if you go cold turkey, you got all these receptors, now norepinephrine is flowing like there's no tomorrow, and you go into a hypertensive crisis, right?"),
 'adr-alpha2-agonist': ('26', "So when it comes to side effects, the most common side effects with this drug can be sedation because you're inhibiting the CNS. Patients may complain of nightmares and maybe depression. Dry mouth is very common. … lower blood pressure, lower heart rate, so hypertension and bradycardia can be severe if the dose is too high."),
 'group-alpha-block': ('7, 27, 31', "Carvedilol is a non-selective beta blocker, right? And carvedilol can not only block the beta ones and the beta 2s, but they can also block the alpha ones. … Mirtazapine is our alpha-2 antagonist, but also can block H1s, it can block muscarinics, and it can block alpha-1s."),
}
NOTE6 = {
 'adr-phenylephrine': 'The drug list gives the cause of rebound congestion as receptor down-regulation; in lecture he gave the warning (do not use for more than 3 days) but not the cause. Not keyed.',
 'moa-cocaine': 'The drug list says cocaine is “used with lidocaine to control arrythmias (Na+ channel blocker)”. On 10/6 he said the opposite: cocaine (or epinephrine) is added to lidocaine as a vasoconstrictor to decrease bleeding and keep lidocaine from reaching the heart, where it can cause arrhythmias. Not asked here (uses are not tested); see L10-022.',
 'mao-tell': 'The drug list adds rasagiline as a second selective MAO-B inhibitor; the deck and the 10/6 lecture name only selegiline (“low doses”), so rasagiline is not asked.',
 'group-indirect-adr': 'Rasagiline (drug list only) was replaced by selegiline, the MAO-B inhibitor he taught on 10/6.',
 'mirtazapine': 'The drug list ties drowsiness to H1 block; on 10/6 he named histamine and muscarinic block for the sedation (slide 33 also lists “Blockade of Muscarinic & Histamine (H1)”). H1 is keyed; muscarinic is not among the options.',
 'moa-clonidine': 'Guanfacine does not end in -idine; on 10/6 he named it (as Intuniv) “a similar drug to it” (clonidine). For the exam he focuses on clonidine as the prototype.',
 'group-alpha-block': 'Carvedilol was named on 10/6 only as an example on the MAP-equation slide; the β-blocker slides are not yet taught. Phenoxybenzamine (slide 27, irreversible) is left out of the options until its slides are taught.',
}

# stays in the generator so later ids do not shift; it is not posted.
SCOPE = [
 ('Brand names', "Uh, you don't need to know brand names for the exam, just generic", 'No stem or option names a brand.'),
 ('Use', "I'm not testing you on the use. I'm testing you on the mechanism of action, the site of actions, and the effects this drug is gonna produce, OK?", 'Use items kept only where he asked them himself (curare reversal with neostigmine, physostigmine for atropine overdose, atropine for organophosphate poisoning).'),
 ('Curare-like drugs', "But for our purpose on exam two, all I need you to know is that any karate-like drug is what? A competitive, reversible NM antagonist, and by blocking the NM, what are you gonna get? Paralysis, right?", 'DL2-012 rewritten to his rocuronium question (paralysis); drug-specific reactions kept as teach only.'),
 ('Half-lives of curare-like drugs', "Again, I'm not asking you to know the half-life of these drugs, this is just for information.", 'Not asked.'),
 ('Edrophonium', "So for our purpose on the exam, I'm not too worried about androfomia, right?", 'DL2-019 removed; edrophonium dropped from the DL2-011, DL2-015, DL2-021 and DL2-024 options.'),
 ('Alzheimer’s drugs', "For our exam purpose, I only need you to know rivastigamine and donepezil because those are your top more prescribed drugs for that purpose.", 'Galantamine removed from DL2-016 options and from DL2-017 and DL2-024 text; its half-life is not asked.'),
 ('Muscarinic agonists', "but for our purpose on the exam, I'm gonna expect you to know pilocarpine as one of the two, OK?", 'Cevimeline removed from DL2-027 options and teach text.'),
 ('Pilocarpine chemistry', "I don't care if you know that it is an aure, that is not hydrolyzed, that's mad Kim kind of stuff, right?", 'DL2-028 (hydrolysis by acetylcholinesterase) removed; hydrolysis distractor in DL2-029 replaced.'),
 ('Agonist efficacy', "But for exam purpose, we're gonna assume they all have equal efficacies, OK, and affinities", 'Carbachol versus pilocarpine in the heart is not asked.'),
 ('Overactive bladder', "So, those are gonna be the three that are gonna be responsible for me on the exam.", 'Oxybutynin, trospium and solifenacin only; DL2-044 rewritten without darifenacin and fesoterodine.'),
 ('Dose–response curves', "but on your exam too, there will not be any dose response curves, OK?", 'No DL2 item uses a curve.'),
]
REMOVED = {
 'DL2-019': 'edrophonium: “I’m not too worried about” it for the exam (diagnostic only)',
 'DL2-028': 'hydrolysis by acetylcholinesterase: pilocarpine’s chemistry is “FYI”, not tested',
}
for q in qs:
    if q['id'] in TQ:
        q['source'] = 'both'
        q['cite'] += '; transcript 10/5'
        q['quote'] = TQ[q['id']]
    if q['id'] in REMOVED:
        q['removed'] = REMOVED[q['id']]
ADR_ALL = {q['concept'] for q in qs if q['sub'] == 'adr'}
assert ADR_RELEASED <= ADR_ALL, ADR_RELEASED - ADR_ALL
HELD_CONCEPTS = ADR_ALL - ADR_RELEASED      # adrenergic concepts still held (ids kept)
for q in qs:
    if q['concept'] in TQ6 and q['sub'] == 'adr':
        sl, quote = TQ6[q['concept']]
        q['source'] = 'both'
        q['cite'] += f"; {ADR} slide{'s' if re.search('[–,]', sl) else ''} {sl}; transcript 10/6"
        q['quote'] = quote
        if q['concept'] in NOTE6:
            q['note'] = (q.get('note', '') + ' ' + NOTE6[q['concept']]).strip()
assert set(TQ6) == ADR_RELEASED, set(TQ6) ^ ADR_RELEASED
def is_held(q): return q['sub'] in HELD or q['concept'] in HELD_CONCEPTS

# --------------------------------------------------------------------------
# Checks
# --------------------------------------------------------------------------
ABBR = {
 'NMJ': 'neuromuscular junction', 'AChE': 'acetylcholinesterase', 'BBB': 'blood', 'CNS': 'central nervous system',
 'HTN': 'hypertension', 'NE': 'norepinephrine', 'DA': 'dopamine', 'MAO': 'monoamine oxidase', 'PDE': 'phosphodiesterase',
 'cGMP': 'cyclic guanosine monophosphate', 'sGC': 'soluble guanylyl cyclase', 'NO': 'nitric oxide',
 'SAMA': 'short-acting muscarinic antagonist', 'LAMA': 'long-acting muscarinic antagonist', 'SABA': 'short-acting β2 agonist',
 'LABA': 'long-acting β2 agonist', 'PNS': 'parasympathetic', 'SNS': 'sympathetic', 'ACE': 'angiotensin-converting enzyme',
 'ARB': 'angiotensin II receptor blocker', 'ARBs': 'angiotensin II receptor blocker', 'MR': 'mineralocorticoid', 'RAAS': 'renin',
 'Nn': 'neuronal nicotinic', 'Nm': 'muscle nicotinic', 'GI': 'gastrointestinal',
}
fail = 0
for q in qs:
    opts = q['options']
    right = [o for o in opts if o['correct']]
    if q.get('multi'):
        if len(right) < 2 or len(right) == len(opts): print(q['id'], 'bad select-all'); fail += 1
    else:
        if len(right) != 1: print(q['id'], 'needs exactly one correct'); fail += 1
        L = max(len(o['t']) for o in opts)
        if len(right[0]['t']) == L and sum(1 for o in opts if len(o['t']) == L) == 1:
            print(q['id'], 'correct option is the longest'); fail += 1
    if len(set(o['t'] for o in opts)) != len(opts): print(q['id'], 'duplicate option'); fail += 1
    if not (3 <= len(opts) <= 7): print(q['id'], 'option count'); fail += 1
    if any(not o['why'] for o in opts): print(q['id'], 'missing why'); fail += 1
    blob = json.dumps(q, ensure_ascii=False)
    low = blob.lower()
    for ab, full in ABBR.items():
        if re.search(r'(?<![A-Za-z0-9-])' + re.escape(ab) + r'(?![A-Za-z0-9])', q['stem'] + ' '.join(o['t'] for o in opts) + ' ' + (q['teach'] if isinstance(q['teach'], str) else '')) and full.lower() not in low:
            print(q['id'], 'abbreviation not expanded:', ab)
    if '`' in blob or '${' in blob: print(q['id'], 'backtick'); fail += 1
if fail:
    raise SystemExit(f'{fail} problems')

# --------------------------------------------------------------------------
# Output: q_DL2.js
# --------------------------------------------------------------------------
here = os.path.dirname(os.path.abspath(__file__))
out = ["TOPICS.push({id:'DL2', name:'Exam 2 drug list', prof:'Gottlieb', lecture:'DL2',",
       "  cite:'Pharmacology_Exam_2_Drug_List.pdf, checked against the ANS, NMJ, cholinergic and adrenergic decks',",
       "  subs:[" + ','.join(f"{{id:'{k}', name:'{n}', cite:'{c}'}}" for k, n, c in SUBS if k not in HELD) + "]});",
       '/* Generated by gen_druglist2.py from Pharmacology_Exam_2_Drug_List.pdf. Edit the generator, not this file. */',
       'QUESTIONS.push(']
# the nitric-oxide / cGMP items get their own sub
for q in qs:
    if q['concept'] in ('moa-nitrates', 'moa-pde', 'group-cgmp'):
        q['sub'] = 'no'
posted = [q for q in qs if not is_held(q) and not q.get('removed')]
out.append(',\n'.join(json.dumps(q, ensure_ascii=False) for q in posted))
out.append(');')
open(os.path.join(here, 'q_DL2.js'), 'w', encoding='utf-8').write('\n'.join(out) + '\n')

# --------------------------------------------------------------------------
# Output: notes/DL2.md
# --------------------------------------------------------------------------
SEC = {'nmj': 'Neuromuscular', 'chol': 'Cholinergic', 'adr': 'Adrenergic (printed “ADNRENERGIC”)', 'raas': 'RAAS'}
def esc(s): return s.replace('|', '/')
md = ['# DL2 — Exam 2 drug list', '',
      'Source: `Pharmacology_Exam_2_Drug_List.pdf` (10 pages), the course’s official Exam 2 drug list (the PDF header credits Joshua Farias, Class of 2025). Columns: Drug / MOA / SOA / Side effects-ADRs / Extra-key information. Colour code: green = agonist, red = antagonist, blue = indirect antagonist, purple = donor. Where it disagrees with a slide, the question follows the slide and states the disagreement in a `note` (see Conflicts). Questions on the nitric oxide/cGMP and RAAS sections are written but held back until those slides and transcripts are received. Adrenergic questions are posted drug by drug as he teaches them: on 10/6 he taught the adrenergic deck through mirtazapine (slide 32), so the items on phenylephrine, cocaine, the amphetamines and methylphenidate, phenelzine, selegiline, prazosin and the -osins, clonidine and the α2 agonists, and mirtazapine’s mechanism are posted; the β drugs, epinephrine, norepinephrine, dobutamine, isoproterenol, mirabegron, phenoxybenzamine and mirtazapine’s adverse reactions stay held.',
      '',
      'Generated by `src/gen_druglist2.py` (writes `src/q_DL2.js` and this file). Parsing method: the text extraction (`decks/Pharmacology_Exam_2_Drug_List.txt`) was read alongside page renders of the PDF to assign each cell to its column; rows that run across a page break are given both pages.',
      '',
      'Verification decks: `Autonomic Nervous System.pdf`, `PCOL-NMJ_PCOL_2026s_pptx.pdf`, `PCOL-Cholinergic-26s.pdf`, `PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf` (slides 1–32 taught 10/6; text from the student’s annotated copy). The RAAS deck is not available yet, and the adrenergic β-receptor slides are not yet taught, so those drugs are “list only”. Day 1 slide 8 (Exam 1 deck) says Exam 2 tests MOA, SOA, ADRs and DDIs and not use/indication, dose, route or brand names, so the bank asks few use items and no brand names. On 10/5 he repeated it: “you don’t need to know brand names for the exam, just generic” (see Exam scope below).',
      '']
for sec in ['nmj', 'chol', 'adr', 'raas']:
    md += [f'## {SEC[sec]}', '', '| Drug(s) | Colour | MOA | SOA | ADRs | Key information | Page | Verified |', '|---|---|---|---|---|---|---|---|']
    for r in ROWS:
        if r['sec'] != sec: continue
        ver = ('slide: ' + r['slides']) if r['status'] == 'slide' else 'list only'
        md.append(f"| {esc(', '.join(r['drugs']))} | {r['colour']} | {esc(r['moa'])} | {esc(r['soa'])} | {esc(r['adr'])} | {esc(r['key'])} | {r['page']} | {esc(ver)} |")
    md.append('')
ver_drugs = [d for r in ROWS if r['status'] == 'slide' for d in r['drugs']]
unv_drugs = [d for r in ROWS if r['status'] == 'list' for d in r['drugs']]
md += ['## Verification status', '',
       f'Confirmed on a slide ({len(ver_drugs)} entries): ' + '; '.join(ver_drugs) + '.', '',
       f'List only, no slide yet ({len(unv_drugs)} entries): ' + '; '.join(unv_drugs) + '.', '',
       '## Conflicts / uncertain (list vs slide vs transcript)', '',
       'The slide wins over the list; where the transcript (10/5 or 10/6) is explicit, his words win over both.', '',
       '| Drug | Drug list says | Slide says | Transcript says | Resolution |', '|---|---|---|---|---|']
for d, a, b, t, c in CONFLICTS:
    md.append(f'| {esc(d)} | {esc(a)} | {esc(b)} | {esc(t)} | {esc(c)} |')
md += ['', '## Exam scope from transcript 10/5', '',
       'His statements on 10/5 about what Exam 2 asks, and what the bank does about each. Removed items keep their ids in the generator so later ids do not shift; they are not posted.', '',
       '| Topic | His words (10/5) | Effect on the bank |', '|---|---|---|']
for k, w, e in SCOPE:
    md.append(f'| {esc(k)} | “{esc(w)}” | {esc(e)} |')
md += ['', 'Removed: ' + '; '.join(f'{i} ({r})' for i, r in REMOVED.items()) + '.', '',
       f"Transcript 10/5 (`transcripts/2026-10-05_transcript.txt`) covers the rest of the NMJ deck and the whole cholinergic deck; {sum(1 for q in qs if q['id'] in TQ and not q.get('removed'))} posted items carry his words as their quote (source `both`).", '',
       f"Transcript 10/6 (`transcripts/2026-10-06_transcript.txt`) covers the adrenergic deck from slide 1 through mirtazapine (slide 32); {len(ADR_RELEASED)} adrenergic items are released with his words as their quote; {len(HELD_CONCEPTS)} adrenergic items stay held: " + ', '.join(q['id'] + ' (' + q['concept'] + ')' for q in qs if q['concept'] in HELD_CONCEPTS) + '.', '']
md += ['', '## Questions', '']
per = {}
for q in qs: per[q['sub']] = per.get(q['sub'], 0) + 1
md.append(f"{len(qs)} questions written, {len(posted)} posted, {len(REMOVED)} removed by his exam-scope statements (all skill `drug`; {sum(1 for q in qs if q.get('multi'))} select-all). Per sub: " + ', '.join(f'{k} {v}' for k, v in per.items()) + '.')
md.append('')
for q in qs:
    md.append(f"- {q['id']} ({q['sub']}{', HELD' if is_held(q) else ''}{', REMOVED' if q.get('removed') else ''}{', select-all' if q.get('multi') else ''}{', note' if q.get('note') else ''}{', transcript 10/6' if q['concept'] in TQ6 and q['sub'] == 'adr' else (', transcript 10/5' if q['source'] == 'both' else '')}): {q['stem']}")
open(os.path.join(here, '..', 'notes', 'DL2.md'), 'w', encoding='utf-8').write('\n'.join(md) + '\n')
print(len(posted), 'drug-list questions posted,', len(REMOVED), 'removed,', len(qs) - len(posted) - len(REMOVED), 'held until their slides and transcripts arrive;', 'per sub', per)
print('adrenergic released:', ', '.join(q['id'] for q in qs if q['sub'] == 'adr' and not is_held(q)))
