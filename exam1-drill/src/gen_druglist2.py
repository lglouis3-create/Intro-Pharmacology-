#!/usr/bin/env python3
"""Generate q_DL2.js (and notes/DL2.md) from the Exam 2 drug list.

Source table: Pharmacology_Exam_2_Drug_List.pdf ("Courtesy of Joshua Farias
(Class of 2025)"), a student-compiled table with columns Drug / MOA / SOA /
Side effects-ADRs / Extra-key information and sections Neuromuscular,
Cholinergic, Adrenergic, RAAS.  Colour code: green agonist, red antagonist,
blue indirect antagonist, purple donor.

Each drug's class and receptor is checked against Dr. Gottlieb's slides where
a slide names the drug (Autonomic Nervous System.pdf, PCOL-NMJ_PCOL_2026s_pptx.pdf,
PCOL-Cholinergic-26s.pdf).  Where list and slide disagree the slide wins and the
item carries a `note`; every disagreement is listed in notes/DL2.md.  Drugs no
slide names (the adrenergic and RAAS decks are not available yet) keep the
list's wording and are cited to the list only.

Run from src/:  python3 gen_druglist2.py
"""
import json, re, os

LIST = 'Pharmacology_Exam_2_Drug_List.pdf'
NMJ = 'PCOL-NMJ_PCOL_2026s_pptx.pdf'
CHO = 'PCOL-Cholinergic-26s.pdf'
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
      status='list', slides=''),
 dict(sec='adr', page='5', colour='indirect antagonist', drugs=['Cocaine'],
      moa='NE reuptake inhibitor', soa='CNS', adr='HTN, tachycardia, arrythmias, restlessness',
      key='Used with lidocaine to control arrythmias (Na+ channel blocker)', status='list', slides=''),
 dict(sec='adr', page='5', colour='indirect antagonist', drugs=['Dextroamphetamine & amphetamine (Adderall)', 'Methylphenidate (Concerta, Ritalin)', 'Lisdexamphetamine (Vyvanse)', 'Dexmethylphenidate (Focalin)'],
      moa='Stimulate pre-synaptic release of NE & DA', soa='CNS', adr='HTN, tachycardia, arrythmias, restlessness, loss of appetite',
      key='Used for ADHD', status='list', slides=''),
 dict(sec='adr', page='5', colour='indirect antagonist', drugs=['Phenelzine'],
      moa='Non-selective MAO-A & MAO-B irreversible antagonist (printed “MOA-A & MOA-B”)', soa='CNS', adr='HTN, tachycardia, arrythmias, restlessness',
      key='Inhibits breakdown of NE; serious ADR → HTN crisis due to dietary tyramine', status='list', slides=''),
 dict(sec='adr', page='5', colour='indirect antagonist', drugs=['Selegiline', 'Rasagiline'],
      moa='SELECTIVE MAO-B irreversible antagonist', soa='CNS', adr='HTN, tachycardia, arrythmias, restlessness',
      key='Inhibits breakdown of NE; used for depression & Parkinson’s', status='list', slides=''),
 dict(sec='adr', page='5', colour='antagonist', drugs=['Prazosin', 'Terazosin (Hytrin)', 'Doxazosin (Cardura)', 'Tamsulosin (Flomax) → α1a'],
      moa='SELECTIVE α1 antagonist, reversible', soa='Brain, eye, nose, blood vessels, urethra',
      adr='Headache, blurred vision, orthostatic hypotension → reflex tachycardia, sexual dysfunction',
      key='Used to treat HTN, BPH, and PTSD (prazosin only); decrease preload and afterload (blood vessels)', status='list', slides=''),
 dict(sec='adr', page='5–6', colour='antagonist', drugs=['Phenoxybenzamine'],
      moa='Non-selective α1 & α2 antagonist, irreversible; decrease peripheral resistance', soa='Brain, eye, nose, blood vessels, urethra, GI',
      adr='Orthostatic hypotension → reflex tachycardia; GI stimulation (α2 on PNS fiber blocked); headache, miosis',
      key='Can be used for HTN crisis caused by phenelzine (short term control); longer duration of action (irreversible → highest affinity for α1)',
      status='list', slides=''),
 dict(sec='adr', page='6', colour='antagonist', drugs=['Mirtazapine (Remeron)'],
      moa='NON-SELECTIVE: α2 antagonist, α1 antagonist, muscarinic antagonist, H1 antagonist, 5-HT2a antagonist',
      soa='CNS; enhances release of NE & 5-HT (serotonin); blocks H1 → drowsiness',
      adr='Drowsiness, weight gain, increased cholesterol, xerostomia, constipation, peripheral edema, HTN',
      key='Used for MDD; rare side effect: agranulocytosis; α2’s located in small blood vessels cause vasoconstriction → antagonist will cause vasodilation → peripheral edema',
      status='list', slides=''),
 dict(sec='adr', page='6', colour='agonist', drugs=['Clonidine (Catapres)', 'Brimonidine (Alphagan P)', 'Tizanidine (Zanaflex)', 'Guanfacine (Intuniv)', 'Dexmedetomidine (Precedex)'],
      moa='α2 agonist', soa='CNS; enhance inhibitory / suppress SNS',
      adr='Sedation, dry mouth, hypotension, bradycardia, sexual dysfunction, depression, constipation (activates GI inhibitory negative feedback pathway → less ACh)',
      key='Hypertensive crisis can occur if taken off drug abruptly due to up-regulation of receptors', status='list', slides=''),
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
CONFLICTS = [
 ('Norepinephrine', 'List page 8: “α1, β1 agonist”.', f'{ANS} slide 13 draws norepinephrine as the neurotransmitter at α1 (blood vessels), α2 (CNS) and β1 (heart, kidney), with β2 “typically not innervated”; slides 45–47: NE acts at α2 in the GI tract (“Inhibition of Ach Release”).', 'Slide wins: norepinephrine is keyed as an agonist at α1, α2 and β1 (DL2 item carries a note). The Exam 1 drug list called it an α1, α2, β1 and β2 agonist.'),
 ('Epinephrine', 'List page 8: “β1, β2 agonist (blood vessels)”, with “Low dose: β1 & β2 / High dose: everything”.', f'{ANS} slides 35 and 42 show epinephrine (adrenal medulla) acting at β2 (bronchial dilation, smooth-muscle vasodilation); the slides say nothing on α receptors for epinephrine. The Exam 1 drug list called it an α1, α2, β1 and β2 agonist.', 'No direct contradiction with a slide. Keyed with the list’s dose wording (β1 and β2 at low dose; all receptors at high dose). Re-check when the adrenergic deck is available.'),
 ('Varenicline', 'List page 1 ADRs: headache, insomnia, suicidal thoughts, depression, flatulence.', f'{NMJ} slide 9: most common GI: nausea (16–40%) & vomiting; CNS: headache, insomnia, depression. No suicidal thoughts or flatulence on the slide; the list omits nausea and vomiting.', 'Slide wins: the ADR item keys nausea/vomiting, headache, insomnia and depression; suicidal thoughts and flatulence are not asked.'),
 ('Scopolamine', 'List page 3: “Non-selective muscarinic antagonist (M1, M2, M3)”.', f'{CHO} slide 17: “Scopolamine — Antagonist to the Muscarinic, Histamine and serotonin receptors”.', 'Slide wins: scopolamine is keyed as an antagonist at muscarinic, histamine and serotonin receptors.'),
 ('Solifenacin, darifenacin, trospium', 'List page 4: “Most selective for M3 → least likely to cause anti-DUMBbELSS”.', f'{CHO} slide 30: “All have the potential to cause anti-DUMBBELSS; xerostomia (dry mouth) and constipation — M3, all musc. antag”; the M3-selective three sit lowest in the “order of drugs with CNS effects (drowsiness, dizziness, & confusion)”: oxybutynin (M1 & M3) > tolterodine, fesoterodine (M1 & M3) > solifenacin, darifenacin, trospium (M3).', 'Slide wins: the three are keyed as least likely to cause CNS effects, not as least likely to cause anti-DUMBBELSS.'),
 ('Succinylcholine (hyperthermia)', 'List page 1 places “hyperthermia” among the ADRs.', f'{NMJ} slide 26 places malignant hyperthermia under “Succinylcholine (SCh) DDI”: with inhaled anesthetics (e.g., halothane); abnormal release of Ca++ from skeletal-muscle stores; dantrolene (ryanodine receptor antagonist).', 'Slide wins: keyed as a drug–drug interaction with inhaled anesthetics.'),
 ('Curare-like drugs (ADRs)', 'List page 2: “Histamine release, hypotension & tachycardia”; no CNS effect.', f'{NMJ} slide 32: respiratory paralysis; tachycardia — pancuronium; allergic reactions: histamine release (bronchial spasms, marked hypotension) — atracurium; *** no CNS effect. Slide 30: histamine release +++ for atracurium, + for the others; pancuronium “+ Block” at autonomic ganglia.', 'Slide wins: respiratory paralysis (missing from the list) is keyed; tachycardia is tied to pancuronium; atracurium (strongest histamine release) is not on the list.'),
 ('Galantamine', 'List page 2: “Longer t1/2 than physostigmine”.', f'{NMJ} slide 40 groups donepezil, rivastigmine and galantamine under “Reversible with longer duration of action; High affinity for the AChE; lipophilic (cross the BBB)”; slide 39 uses the same “reversible with longer duration of action” heading for physostigmine. No slide compares galantamine with physostigmine.', 'List-only claim; not asked.'),
 ('Atropine (drowsiness)', 'List page 3 ADRs end with “drowsiness”.', f'{CHO} slides 19 and 32 give the CNS effect of muscarinic antagonists as “hallucinations, restlessness, & coma” (dose-dependent); drowsiness appears on slide 24 for scopolamine.', 'Slide wins: drowsiness is not keyed for atropine; it is keyed for scopolamine.'),
 ('Echothiophate', 'List page 2: “Organophosphate inhibitor of acetylcholinesterase enzyme” (reversibility not stated).', f'{NMJ} slides 42–43: organophosphates form a covalent bond with the enzyme (irreversible) and irreversibly phosphorylate cholinesterases; slide 45 names echothiophate an organophosphate inhibitor.', 'Slide adds “irreversible”; keyed so.'),
 ('Botulinum toxin', 'List colours it red (antagonist).', f'{NMJ} slides 46–50 describe it as preventing ACh release by cleaving SNARE proteins (endopeptidase); no slide calls it a receptor antagonist.', 'Mechanism keyed as the slide states it (blocks release); “antagonist” not used as its class.'),
 ('Aclidinium, umeclidinium', 'List page 4: “Muscarinic antagonist … Long-acting muscarinic antagonist (LAMA)”.', f'{CHO} slide 28: “High affinity for the M3 (reversible, but slow dissociation)”; the LAMA label on the slide is attached to tiotropium only.', 'Slide wording keyed (high M3 affinity, slow dissociation); LAMA for these two is list only.'),
 ('Tiotropium', 'List page 3: “Heart rate not affected because it does not target M2”.', f'{CHO} slide 28 gives tiotropium as “M1 and M3; LAMA: Long acting (1x/Day)”; slide 10 puts M2 at the AV & SA node. The heart-rate sentence itself is not on a slide.', 'Receptor keyed from the slide; heart-rate sentence cited to the list.'),
 ('Edrophonium', 'List page 2: “No CNS effects”.', f'{NMJ} slide 38 gives short duration, readily reversible, diagnosis of myasthenia gravis; it does not mention CNS effects.', 'List only; not asked.'),
 ('Nitrates and PDE inhibitors (SOA)', 'List page 4 gives the SOA as “Endothelium of blood vessels (M3)”.', f'No slide names these drugs. {ANS} slide 4 and {CHO} slides 13 and 15 say M3 on vascular endothelium raises Ca++ → NOS → NO (vasodilation via nitric oxide).', 'List only; the “(M3)” in the SOA is not asked.'),
 ('Benztropine', 'List page 3: non-selective muscarinic antagonist; CNS; Parkinson’s.', f'{CHO} slide 25 names benztropine (Parkinson’s patients treated with L-dopa; tremor & rigidity) inside the muscarinic-antagonist section but does not state its receptor selectivity.', 'Class confirmed by section only; receptor list (M1, M2, M3) cited to the list.'),
 ('Cocaine', 'List page 5 key information: “Used with lidocaine to control arrythmias (Na+ channel blocker)”.', 'No slide.', 'Unclear wording; not asked.'),
 ('Medoxomil', 'List page 9 prints “Medoxomil” as its own line in the ARB group.', 'No slide.', 'Parsed as part of the ARB row; not asked as a drug.'),
]

# --------------------------------------------------------------------------
# Questions
# --------------------------------------------------------------------------
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
  ('Depression', R, 'Listed under central nervous system side effects.'),
  ('Hyperkalemia', W, 'Hyperkalemia is a succinylcholine adverse reaction (muscle cells lose K+).'),
  ('Histamine release with hypotension', W, 'That is a curare-like drug adverse reaction (most with atracurium).')],
 'Varenicline’s most common side effects are gastrointestinal (nausea and vomiting) and central nervous system effects (headache, insomnia, depression). The drug list also warns of mood and behavioral changes.',
 'Side Effects. Most common: GI: Nausea (16-40%) & Vomiting. CNS: Headache, Insomnia, Depression',
 cite(1, (NMJ, '9')), multi=True,
 note='The drug list gives headache, insomnia, suicidal thoughts, depression and flatulence and does not list nausea; the slide lists nausea and vomiting as the most common and does not list suicidal thoughts or flatulence. Keyed to the slide.')

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
  ('Histamine release with marked hypotension', W, 'That is a curare-like drug reaction (atracurium most).'),
  ('Miosis and lacrimation', W, 'Those are echothiophate (eye) reactions.'),
  ('Insomnia and depression', W, 'Those are varenicline reactions.')],
 'Succinylcholine’s adverse reactions are hyperkalemia (muscle cells lose K+), hypertension and arrhythmias, and post-operative muscle pain from unsynchronized contractions. It is avoided in renal-deficient and dehydrated patients.',
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
 note='The drug list places hyperthermia among succinylcholine’s adverse reactions; the slide places malignant hyperthermia under drug–drug interactions with inhaled anesthetics. Keyed to the slide.')

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
  ('Edrophonium', W, 'Edrophonium is a short-acting cholinesterase inhibitor.')],
 'Both drug types cause paralysis. Depolarizing: succinylcholine (agonist, opens nicotinic channels). Non-depolarizing: curare (prototype), mivacurium, vecuronium, rocuronium and pancuronium (competitive antagonists, stop the nicotinic channels from opening).',
 'Depolarizing: Succinylcholine. Non-depolarizing: Curare (prototype), Mivacurium, Vecuronium, Rocuronium, Pancuronium',
 cite(2, (NMJ, '19')), multi=True)

add('nmj', 'adr-curare',
 'Which adverse drug reactions are listed for the curare-like (non-depolarizing) drugs?',
 [('Respiratory paralysis', R, 'Listed first among the curare-like drug adverse reactions.'),
  ('Tachycardia (pancuronium)', R, 'Listed, with pancuronium as the example.'),
  ('Histamine release with bronchial spasm and hypotension', R, 'Listed as an allergic reaction (atracurium most).'),
  ('Sedation and drowsiness from central action', W, 'The curare-like drugs have no CNS effect.'),
  ('Hyperkalemia from loss of muscle K+', W, 'That is succinylcholine.')],
 'Curare-like drugs cause respiratory paralysis, tachycardia (pancuronium) and allergic reactions with histamine release (bronchial spasms, marked hypotension; atracurium most). They have no central nervous system (CNS) effect.',
 'Curare Like-Drugs ADRs: Respiratory paralysis; Tachycardia — Pancuronium; Allergic reactions — Histamine release - Bronchial spasms - Marked Hypotension — Atracurium. *** No CNS Effect',
 cite(2, (NMJ, '30, 32')), multi=True,
 note='The drug list gives histamine release, hypotension and tachycardia and omits respiratory paralysis; the slide lists respiratory paralysis first, ties tachycardia to pancuronium and histamine release mainly to atracurium (not on the list). Keyed to the slide.')

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
  ('Edrophonium', W, 'Edrophonium is short-acting and used to diagnose myasthenia gravis.'),
  ('Echothiophate', W, 'Echothiophate is an organophosphate used in the eye for glaucoma.')],
 'Atropine blocks muscarinic receptors in the brain and periphery. Physostigmine raises acetylcholine by inhibiting acetylcholinesterase and, as a tertiary amine, reaches the central nervous system too, so it is the drug of choice for anti-muscarinic poisoning.',
 'Drug of choice for treating poisoning due to anti-muscarinic agents (e.g., atropine)',
 cite(1, (NMJ, '39')), tags=['use'])

add('nmj', 'bbb-ache',
 'Which acetylcholinesterase inhibitors cross the blood–brain barrier?',
 [('Physostigmine', R, 'Tertiary amine; readily penetrates the central nervous system.'),
  ('Donepezil', R, 'Lipophilic; crosses the blood–brain barrier (Alzheimer’s disease).'),
  ('Rivastigmine', R, 'Lipophilic; crosses the blood–brain barrier (Alzheimer’s disease).'),
  ('Galantamine', R, 'Lipophilic; crosses the blood–brain barrier (Alzheimer’s disease).'),
  ('Neostigmine', W, 'Quaternary amine; does NOT cross the blood–brain barrier.'),
  ('Pyridostigmine', W, 'Quaternary amine; does NOT cross the blood–brain barrier.')],
 'Physostigmine (tertiary amine) and the Alzheimer’s drugs donepezil, rivastigmine and galantamine (lipophilic) cross the blood–brain barrier. Pyridostigmine and neostigmine are quaternary amines and do not, so they act at the neuromuscular junction without central effects.',
 'Physostigmine: Tertiary amine and readily Penetrate the CNS. PyriDOstigmine & Neostigmine: Quaternary amine and DO NOT cross the BBB. Donepezil, Rivastigmine and Galantamine: Lipophilic (Cross the BBB)',
 cite('1–2', (NMJ, '39–40')), multi=True)

add('nmj', 'neostigmine',
 'Which statement about neostigmine and pyridostigmine is CORRECT?',
 [('They do not cross the blood–brain barrier', R, 'They are quaternary amines and do NOT cross the blood–brain barrier, so their site of action is the neuromuscular junction.'),
  ('They are the drugs of choice for atropine poisoning', W, 'That is physostigmine, which reaches the brain.'),
  ('They are used for early Alzheimer’s disease', W, 'That is donepezil, rivastigmine and galantamine.'),
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
  ('Reversible, short-acting inhibitor of acetylcholinesterase', W, 'That is edrophonium.'),
  ('Non-selective muscarinic agonist', W, 'That is pilocarpine and carbachol, which act at the receptor directly.'),
  ('Muscarinic antagonist in the eye', W, 'That is tropicamide, which dilates the pupil.')],
 'Echothiophate is an organophosphate: it inhibits acetylcholinesterase and raises acetylcholine, which increases M3 activation in the ciliary muscle and lowers intraocular pressure by increasing aqueous humor outflow (glaucoma). Organophosphates form a stable covalent bond with the enzyme, so the inhibition is irreversible.',
 'Echothiophate (Phospholine) MOA: Organophosphate inhibitor of the acetylcholinesterase enzyme & ↑ Ach levels. Organophosphates: Forms a covalent bond with the enzyme that is very stable and slow (Irreversible)',
 cite(2, (NMJ, '42, 45')),
 note='The drug list does not say whether echothiophate is reversible; the slides call organophosphates irreversible. Keyed to the slides.')

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
  ('Edrophonium', R, 'Cholinesterase inhibitor (acetylcholinesterase antagonist).'),
  ('Rivastigmine', R, 'Cholinesterase inhibitor (acetylcholinesterase antagonist).'),
  ('Succinylcholine', W, 'A direct depolarizing agonist at Nm.'),
  ('Varenicline', W, 'A direct partial agonist at α4β2 Nn.'),
  ('Botulinum toxin', W, 'Prevents acetylcholine release; it does not inhibit acetylcholinesterase.')],
 'Indirect drugs at the neuromuscular junction bind the enzyme that breaks down acetylcholine, not the receptor: acetylcholinesterase antagonists such as physostigmine, pyridostigmine, neostigmine, edrophonium, donepezil, rivastigmine, galantamine and echothiophate. Blocking the enzyme raises synaptic acetylcholine.',
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
 'Acetylcholine, methacholine, carbachol, bethanechol, pilocarpine and cevimeline are non-selective, reversible agonists at the muscarinic receptors (M1, M2, M3). They differ in hydrolysis by acetylcholinesterase and in which organs respond most.',
 'Muscarinic Agonist MOA: Non-selective agonist for the muscarinic receptors (M1-3); Reversible',
 cite(2, (CHO, '11–12')))

add('chol', 'group-musc-agonists',
 'Which drugs are non-selective muscarinic agonists?',
 [('Methacholine', R, 'Non-selective muscarinic agonist (M1–M3).'),
  ('Carbachol', R, 'Non-selective muscarinic agonist (M1–M3).'),
  ('Pilocarpine', R, 'Non-selective muscarinic agonist (M1–M3).'),
  ('Cevimeline', R, 'Non-selective muscarinic agonist (M1–M3).'),
  ('Scopolamine', W, 'A muscarinic antagonist.'),
  ('Tiotropium', W, 'A muscarinic (M1 and M3) antagonist.'),
  ('Physostigmine', W, 'An acetylcholinesterase inhibitor; it raises acetylcholine but does not bind the receptor.')],
 'The direct muscarinic agonists are acetylcholine, methacholine, carbachol, bethanechol, pilocarpine and cevimeline; all are non-selective (M1, M2, M3) and reversible. Physostigmine reaches the same receptors indirectly by raising acetylcholine.',
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
 [('It has no effect on nicotinic receptors', R, 'Pilocarpine is a non-ester alkaloid, not hydrolyzed, with no effect on nicotinic receptors.'),
  ('It is rapidly hydrolyzed by acetylcholinesterase', W, 'Pilocarpine is a non-ester and is not hydrolyzed.'),
  ('It is selective for the M2 receptor', W, 'It is a non-selective muscarinic agonist (M1, M2, M3).'),
  ('It blocks muscarinic receptors and dries the mouth', W, 'It activates muscarinic receptors; it is used to treat dry mouth.')],
 'Pilocarpine is a non-selective, reversible muscarinic agonist. As an alkaloid it is a non-ester, is not hydrolyzed and has no effect on nicotinic receptors. It is used topically for glaucoma and to treat dry mouth (M3 on salivary glands → salivation).',
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
  ('Bronchial constriction', W, 'Atropine causes bronchial dilation; constriction is a muscarinic agonist effect.'),
  ('Miosis', W, 'Miosis is a muscarinic agonist effect; atropine dilates the pupil.'),
  ('Salivation', W, 'Salivation is a muscarinic agonist effect.')],
 'Atropine overdose gives anti-DUMBBELSS: M2 block in the heart raises heart rate; M3 block causes mydriasis, constipation, dry mouth and bronchial dilation. Toxicity is summarized as dry as a bone, hot as a pistol, red as a beet, blind as a bat, mad as a hatter.',
 'Atropine OD of Muscarinic Antagonist — Anti-DUMBBELSS: M2 Heart = Gi = ↑ HR; M3 Pupil = Gq = Mydriasis; M3 GI = Gq = Constipation. Pharmacological effects: Dry mouth & constipation; Tachycardia; Bronchial dilation; Pupil dilation',
 cite(3, (CHO, '19, 32')), multi=True,
 note='The drug list also gives drowsiness for atropine; the slides give its central effects as hallucinations, restlessness and coma (dose-dependent) and give drowsiness for scopolamine. Drowsiness is not keyed here.')

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
  ('Selective antagonist at M3 receptors in the bladder', W, 'That is solifenacin, darifenacin and trospium.'),
  ('Non-selective muscarinic (M1–M3) agonist', W, 'That is pilocarpine and the other agonists.'),
  ('Inhibitor of acetylcholinesterase in the brain', W, 'That is donepezil and the other lipophilic cholinesterase inhibitors.')],
 'Scopolamine, like atropine, is a naturally occurring, non-selective and reversible muscarinic antagonist; it also antagonizes histamine and serotonin receptors. It penetrates the central nervous system more rapidly than atropine and is used for motion sickness.',
 'Scopolamine — Antagonist to the Muscarinic, Histamine and serotonin receptors',
 cite(3, (CHO, '17')),
 note='The drug list calls scopolamine a non-selective muscarinic antagonist (M1, M2, M3) and does not mention histamine or serotonin receptors; the slide does. Keyed to the slide.')

add('chol', 'scopolamine-cns',
 'Which statement about scopolamine is CORRECT?',
 [('It penetrates the CNS more rapidly', R, 'Scopolamine penetrates the central nervous system (CNS) more rapidly; its effects include drowsiness, euphoria and amnesia, and it is used for motion sickness.'),
  ('It does not cross into the CNS', W, 'Not crossing the blood–brain barrier describes neostigmine and pyridostigmine.'),
  ('It is used to dilate the pupil for eye exams', W, 'That is tropicamide.'),
  ('It is a short-acting inhaled bronchodilator', W, 'That is ipratropium.')],
 'Scopolamine is a muscarinic antagonist whose site of action is mainly the central nervous system (CNS), which it penetrates more rapidly. It causes drowsiness, euphoria and amnesia, and produces anti-DUMBBELSS effects; it is used for motion sickness.',
 'Scopolamine: Penetrates the CNS more rapidly; Motion sickness; Drowsiness, euphoria, amnesia; Anti-DUMBBELSS',
 cite(3, (CHO, '24')))

add('chol', 'benztropine',
 'Benztropine is a muscarinic antagonist. Where is its site of action?',
 [('The central nervous system', R, 'Benztropine is used in Parkinson’s patients for tremor and rigidity; it acts in the central nervous system.'),
  ('The lungs, by inhalation', W, 'That is ipratropium, tiotropium, aclidinium and umeclidinium.'),
  ('M3 receptors in the bladder', W, 'That is the overactive-bladder antagonists.'),
  ('The eye (pupil)', W, 'That is tropicamide.')],
 'In Parkinson’s disease, 70–80% of the dopaminergic neurons from the substantia nigra to the striatum are lost and acetylcholine activity is left unopposed. Benztropine blocks muscarinic receptors in the central nervous system and is used for tremor and rigidity in Parkinson’s patients treated with L-dopa.',
 'Benztropine (Cogentin): Parkinson’s Pts treated with L-Dopa; Tremor & rigidity; Basal Ganglia; Dopaminergic Neuron 70-80% loss',
 cite(3, (CHO, '25')))

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
 [('Ipratropium blocks M1, M2 and M3; tiotropium blocks M1 and M3', R, 'Ipratropium: M1, M2 and M3, short acting (SAMA, 3–4 times a day). Tiotropium: M1 and M3, long acting (LAMA, once a day).'),
  ('Ipratropium blocks M1 and M3; tiotropium blocks M1, M2 and M3', W, 'Reverses the two receptor profiles.'),
  ('Both are agonists at M3 in bronchial smooth muscle', W, 'Both are antagonists; M3 activation constricts the bronchi.'),
  ('Ipratropium is long acting; tiotropium is short acting', W, 'Reversed: ipratropium is the short-acting muscarinic antagonist (SAMA), tiotropium the long-acting one (LAMA).')],
 'Both are inhaled muscarinic antagonists used in the lungs, where M3 (Gq → IP3, Ca++) constricts bronchial smooth muscle and only the parasympathetic system innervates. Ipratropium (M1, M2, M3) is a short-acting muscarinic antagonist (SAMA); tiotropium (M1 and M3) is a long-acting muscarinic antagonist (LAMA).',
 'Ipratropium (Atrovent): M1, M2, and M3; SAMA: Short acting (3-4x/Day). Tiotropium (Spiriva): M1 and M3; LAMA: Long acting (1x/Day)',
 cite(3, (CHO, '28')), tags=['tell'])

add('chol', 'moa-tiotropium',
 'Which inhaled muscarinic antagonist blocks M1 and M3 but not M2?',
 [('Tiotropium', R, 'Tiotropium: M1 and M3; long-acting muscarinic antagonist (LAMA).'),
  ('Ipratropium', W, 'Ipratropium blocks M1, M2 and M3.'),
  ('Atropine', W, 'Atropine blocks M1, M2 and M3 and is not the inhaled agent.'),
  ('Scopolamine', W, 'Scopolamine is a non-selective antagonist acting mainly in the central nervous system.')],
 'Tiotropium blocks M1 and M3 and is long acting (once a day). Because M2 sits at the SA and AV node, the drug list notes that tiotropium does not affect heart rate.',
 'Tiotropium (Spiriva): M1 and M3; LAMA: Long acting (1x/Day)',
 cite(3, (CHO, '28')))

add('chol', 'aclidinium',
 'Which statement about aclidinium and umeclidinium is CORRECT?',
 [('They have high affinity for M3 and dissociate slowly', R, 'They have high affinity for M3; binding is reversible, but dissociation is slow. Site of action: the lungs.'),
  ('They are irreversible M3 antagonists', W, 'They are reversible, with slow dissociation.'),
  ('They are muscarinic agonists for dry mouth', W, 'Agonists for dry mouth are pilocarpine and cevimeline.'),
  ('They act on M3 in the bladder for overactive bladder', W, 'That is oxybutynin and the other overactive-bladder drugs.')],
 'Aclidinium and umeclidinium are inhaled muscarinic antagonists acting in the lungs. They bind M3 with high affinity; the binding is reversible, but they dissociate slowly. The drug list classes them as long-acting muscarinic antagonists.',
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
 'Oxybutynin, tolterodine, fesoterodine, solifenacin, darifenacin and trospium are reversible muscarinic antagonists, more selective toward the M3 receptors in the bladder. They decrease urgency, frequency and leakage in overactive bladder.',
 'Muscarinic Antagonists for Overactive Bladder Disorders … MOA: Non-selective, reversible, and hepatic metabolism (3A4 or 2D6); More selective towards the M3 receptors in the bladder',
 cite(4, (CHO, '29')))

add('chol', 'oab-cns',
 'Which overactive-bladder muscarinic antagonist is most likely to cause central effects (drowsiness, dizziness, confusion)?',
 [('Oxybutynin', R, 'Oxybutynin (M1 and M3) is at the top of the order of drugs with central effects.'),
  ('Solifenacin', W, 'Solifenacin (M3) is in the group with the fewest central effects.'),
  ('Darifenacin', W, 'Darifenacin (M3) is in the group with the fewest central effects.'),
  ('Trospium', W, 'Trospium (M3) is in the group with the fewest central effects.'),
  ('Fesoterodine', W, 'Fesoterodine (M1 and M3) is in the middle group, with tolterodine.')],
 'All overactive-bladder antagonists can cause anti-DUMBBELSS, especially dry mouth and constipation (M3). Central effects (drowsiness, dizziness, confusion) follow M1 block: oxybutynin (M1 and M3) most, then tolterodine and fesoterodine, and least solifenacin, darifenacin and trospium (M3).',
 'Order of drugs with CNS effects (Drowsiness, dizziness, & confusion): M1 & M3 — Oxybutynin; M1 & M3 — Tolterodine, Fesoterodine; M3 — Solifenacin, Darifenacin, Trospium',
 cite(4, (CHO, '30')), tags=['tell'],
 note='The drug list says solifenacin, darifenacin and trospium are “least likely to cause anti-DUMBBELSS”; the slide says all of them can cause anti-DUMBBELSS and places the three lowest for central effects. Keyed to the slide.')

add('chol', 'adr-oab',
 'Which adverse effects are shared by all the overactive-bladder muscarinic antagonists?',
 [('Xerostomia (dry mouth)', R, 'All muscarinic antagonists: M3 block on salivary glands.'),
  ('Constipation', R, 'All muscarinic antagonists: M3 block in the gut.'),
  ('Diarrhea', W, 'Diarrhea is a muscarinic agonist (DUMBBELSS) effect.'),
  ('Miosis', W, 'Miosis is an agonist effect; antagonists dilate the pupil.'),
  ('Bradycardia', W, 'Bradycardia is an agonist effect (M2); antagonists raise heart rate.')],
 'All overactive-bladder antagonists have the potential to cause anti-DUMBBELSS. The effects shared by all muscarinic antagonists through M3 are xerostomia (dry mouth) and constipation.',
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
 'Phenylephrine activates α1 receptors on blood vessels (vasoconstriction; nasal decongestant) and in the eye (mydriasis). Its adverse reactions are hypertension, burning and nasal discharge, and rebound congestion from receptor down-regulation.',
 'Phenylephrine (agonist): α1 agonist; SOA: Blood vessels, Eyes',
 cite(4))

add('adr', 'adr-phenylephrine',
 'Which adverse reaction is listed for phenylephrine used as a nasal decongestant?',
 [('Rebound congestion from receptor down-regulation', R, 'Listed: down-regulation → rebound congestion.'),
  ('Orthostatic hypotension followed by reflex tachycardia', W, 'That is the α1 antagonists (prazosin and others).'),
  ('Bronchospasm in asthma patients', W, 'That is the non-selective β blockers (propranolol and others).'),
  ('Peripheral edema', W, 'That is mirtazapine (α2 block in small blood vessels).')],
 'Phenylephrine’s listed adverse reactions are hypertension, burning and nasal discharge, and rebound congestion. Repeated α1 activation down-regulates the receptors, which gives rebound congestion; the list says to avoid it in patients with hypertension.',
 'HTN, Burning & nasal discharge, rebound congestion … Down-reg → rebound congestion; Avoid in patients with HTN',
 cite(4))

add('adr', 'moa-cocaine',
 'Which of the following describes the mechanism of action of cocaine?',
 [('Norepinephrine reuptake inhibitor', R, 'Listed: NE (norepinephrine) reuptake inhibitor, an indirect-acting drug.'),
  ('Stimulates presynaptic release of norepinephrine and dopamine', W, 'That is amphetamine and methylphenidate.'),
  ('Irreversible inhibitor of MAO-A and MAO-B', W, 'That is phenelzine (monoamine oxidase inhibitor).'),
  ('α1 agonist', W, 'That is phenylephrine, a direct agonist.')],
 'Cocaine blocks reuptake of norepinephrine, so more norepinephrine stays in the synapse; its site of action is the central nervous system. Its listed adverse reactions are hypertension, tachycardia, arrhythmias and restlessness.',
 'Cocaine (indirect antagonist): NE reuptake inhibitor; CNS; HTN, tachycardia, arrythmias, restlessness',
 cite(5))

add('adr', 'moa-amphetamine',
 'Which of the following describes the mechanism of action of methylphenidate?',
 [('Stimulates release of norepinephrine and dopamine', R, 'Listed for amphetamine, lisdexamphetamine, methylphenidate and dexmethylphenidate.'),
  ('Norepinephrine reuptake inhibitor', W, 'That is cocaine.'),
  ('Selective, irreversible monoamine oxidase B inhibitor', W, 'That is selegiline and rasagiline.'),
  ('Central α2 agonist', W, 'That is clonidine and guanfacine.')],
 'Dextroamphetamine/amphetamine, methylphenidate, lisdexamphetamine and dexmethylphenidate stimulate presynaptic release of norepinephrine and dopamine in the central nervous system. Adverse reactions: hypertension, tachycardia, arrhythmias, restlessness and loss of appetite.',
 'Stimulate pre-synaptic release of NE & DA (indirect antagonist); CNS; HTN, tachycardia, arrythmias, restlessness, loss of appetite',
 cite(5))

add('adr', 'phenelzine',
 'Which statement about phenelzine is CORRECT?',
 [('It can cause a hypertensive crisis with dietary tyramine', R, 'Listed serious adverse reaction: hypertensive crisis due to dietary tyramine.'),
  ('It is a selective, reversible monoamine oxidase B inhibitor', W, 'Phenelzine is non-selective (MAO-A and MAO-B) and irreversible; selegiline and rasagiline are the selective MAO-B drugs.'),
  ('It blocks norepinephrine reuptake', W, 'That is cocaine.'),
  ('It is a direct α1 agonist', W, 'That is phenylephrine.')],
 'Phenelzine irreversibly inhibits both monoamine oxidase A and B (MAO-A and MAO-B), so the breakdown of norepinephrine is inhibited. Its serious adverse reaction is a hypertensive crisis from dietary tyramine; the list notes phenoxybenzamine can be used short term for that crisis.',
 'Phenelzine: Non-selective MOA-A & MOA-B irreversible antagonist; Inhibits breakdown of NE; Serious ADR → HTN crisis due to dietary Tyramine',
 cite(5))

add('adr', 'mao-tell',
 'Which drug is a selective, irreversible inhibitor of monoamine oxidase B (MAO-B)?',
 [('Selegiline', R, 'Selegiline and rasagiline: selective MAO-B irreversible antagonists.'),
  ('Phenelzine', W, 'Phenelzine inhibits both MAO-A and MAO-B (non-selective).'),
  ('Cocaine', W, 'Cocaine is a norepinephrine reuptake inhibitor.'),
  ('Mirtazapine', W, 'Mirtazapine is an α2 (and α1, muscarinic, H1, 5-HT2a) antagonist.')],
 'Both monoamine oxidase (MAO) drug groups inhibit breakdown of norepinephrine and are irreversible. Phenelzine blocks MAO-A and MAO-B (non-selective); selegiline and rasagiline block MAO-B selectively and are listed for depression and Parkinson’s.',
 'Selegiline, Rasagiline: SELECTIVE MAO-B irreversible antagonist; Inhibits breakdown of NE',
 cite(5), tags=['tell'])

add('adr', 'group-indirect-adr',
 'Which drugs raise synaptic norepinephrine indirectly rather than binding adrenergic receptors?',
 [('Cocaine', R, 'Norepinephrine reuptake inhibitor.'),
  ('Methylphenidate', R, 'Stimulates presynaptic release of norepinephrine and dopamine.'),
  ('Phenelzine', R, 'Inhibits monoamine oxidase, the enzyme that breaks down norepinephrine.'),
  ('Rasagiline', R, 'Inhibits monoamine oxidase B (MAO-B).'),
  ('Phenylephrine', W, 'A direct α1 agonist.'),
  ('Clonidine', W, 'A direct α2 agonist.'),
  ('Prazosin', W, 'A direct α1 antagonist.')],
 'The list’s indirect adrenergic drugs act on norepinephrine handling, not on the receptor: cocaine blocks reuptake; amphetamines and methylphenidate stimulate release; phenelzine, selegiline and rasagiline inhibit breakdown by monoamine oxidase (MAO).',
 'Cocaine: NE reuptake inhibitor. Amphetamine/Methylphenidate: Stimulate pre-synaptic release of NE & DA. Phenelzine, Selegiline, Rasagiline: Inhibits breakdown of NE',
 cite(5), multi=True)

add('adr', 'moa-prazosin',
 'Which of the following describes the mechanism of action of doxazosin?',
 [('Selective, reversible α1 antagonist', R, 'Prazosin, terazosin, doxazosin and tamsulosin (α1a) are selective, reversible α1 antagonists.'),
  ('Non-selective, irreversible α1 and α2 antagonist', W, 'That is phenoxybenzamine.'),
  ('α2 agonist', W, 'That is clonidine and the related α2 agonists.'),
  ('β1, β2 and α1 antagonist', W, 'That is carvedilol and labetalol.')],
 'Prazosin, terazosin, doxazosin and tamsulosin block α1 receptors selectively and reversibly (tamsulosin is listed for α1a). Sites listed: brain, eye, nose, blood vessels and urethra. Blocking α1 on blood vessels decreases preload and afterload.',
 'Prazosin, Terazosin, Doxazosin, Tamsulosin → α1a: SELECTIVE α1 antagonist reversible',
 cite(5))

add('adr', 'adr-alpha1-block',
 'Which adverse reaction is listed for the selective α1 antagonists such as prazosin?',
 [('Orthostatic hypotension leading to reflex tachycardia', R, 'Listed with headache, blurred vision and sexual dysfunction.'),
  ('Rebound congestion', W, 'That is phenylephrine (α1 agonist).'),
  ('Hypertensive crisis when the drug is stopped abruptly', W, 'That is the α2 agonists (clonidine and others).'),
  ('Masking of hypoglycemia symptoms', W, 'That is the non-selective β blockers and carvedilol/labetalol.')],
 'Blocking α1 on blood vessels lowers resistance; on standing this gives orthostatic hypotension, followed by reflex tachycardia. The other listed reactions of the α1 antagonists are headache, blurred vision and sexual dysfunction.',
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
 'Mirtazapine is a non-selective antagonist at α2, α1, muscarinic, H1 and 5-HT2a receptors, acting in the central nervous system. α2 block enhances release of norepinephrine and serotonin; H1 block causes drowsiness.',
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
  ('β1 antagonist', W, 'That is metoprolol, atenolol and nebivolol.')],
 'The α2 agonists act in the central nervous system, where they enhance inhibition and suppress the sympathetic nervous system. Their listed adverse reactions are sedation, dry mouth, hypotension, bradycardia, sexual dysfunction, depression and constipation.',
 'Clonidine, Brimonidine, Tizanidine, Guanfacine, Dexmedetomidine: α2 agonist; CNS; Enhance inhibitory / suppress SNS',
 cite(6))

add('adr', 'clonidine-withdrawal',
 'A patient stops clonidine abruptly. Which reaction is listed, and why?',
 [('Hypertensive crisis, from up-regulated receptors', R, 'Listed: hypertensive crisis can occur if taken off drug abruptly due to up-regulation of receptors.'),
  ('Bronchospasm, from β2 block', W, 'Bronchospasm risk is the non-selective β blockers; clonidine is an α2 agonist.'),
  ('Rebound congestion, from down-regulated α1 receptors', W, 'That is phenylephrine.'),
  ('Hypoglycemia, from masked symptoms', W, 'Masked hypoglycemia is the β blockers.')],
 'Clonidine activates central α2 receptors and suppresses sympathetic outflow. During treatment the receptors up-regulate, so stopping the drug abruptly can cause a hypertensive crisis.',
 'Hypertensive crisis can occur if taken off drug abruptly due to up-regulation of receptors',
 cite(6), tags=['apply'])

add('adr', 'adr-alpha2-agonist',
 'Which adverse reactions are listed for the α2 agonists such as clonidine?',
 [('Sedation', R, 'Listed.'),
  ('Dry mouth', R, 'Listed.'),
  ('Bradycardia', R, 'Listed (suppressed sympathetic outflow).'),
  ('Hypotension', R, 'Listed.'),
  ('Tachycardia and arrhythmias', W, 'Those are the indirect sympathomimetics (cocaine, amphetamines) and dobutamine.'),
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
  ('Phenoxybenzamine', R, 'Non-selective α1 and α2 antagonist, irreversible.'),
  ('Carvedilol', R, 'β1, β2 and α1 antagonist.'),
  ('Mirtazapine', R, 'Listed as an α1 antagonist among its receptors.'),
  ('Phenylephrine', W, 'Phenylephrine activates α1.'),
  ('Metoprolol', W, 'Metoprolol blocks β1 only.'),
  ('Clonidine', W, 'Clonidine activates α2.')],
 'α1 block appears in four rows of the list: the selective α1 antagonists (prazosin, terazosin, doxazosin, tamsulosin), phenoxybenzamine (α1 and α2, irreversible), carvedilol and labetalol (with β1 and β2), and mirtazapine (with α2, muscarinic, H1 and 5-HT2a).',
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
       "  cite:'Pharmacology_Exam_2_Drug_List.pdf (student-compiled, J. Farias), checked against the ANS, NMJ and cholinergic decks',",
       "  subs:[{id:'nmj', name:'Neuromuscular drugs', cite:'pages 1–2'},{id:'chol', name:'Cholinergic drugs', cite:'pages 2–4'},",
       "        {id:'adr', name:'Adrenergic drugs', cite:'pages 4–8'},{id:'raas', name:'RAAS drugs', cite:'pages 8–10'},",
       "        {id:'no', name:'Nitric oxide and cGMP drugs', cite:'page 4'}]});",
       '/* Generated by gen_druglist2.py from Pharmacology_Exam_2_Drug_List.pdf. Edit the generator, not this file. */',
       'QUESTIONS.push(']
# the nitric-oxide / cGMP items get their own sub
for q in qs:
    if q['concept'] in ('moa-nitrates', 'moa-pde', 'group-cgmp'):
        q['sub'] = 'no'
out.append(',\n'.join(json.dumps(q, ensure_ascii=False) for q in qs))
out.append(');')
open(os.path.join(here, 'q_DL2.js'), 'w', encoding='utf-8').write('\n'.join(out) + '\n')

# --------------------------------------------------------------------------
# Output: notes/DL2.md
# --------------------------------------------------------------------------
SEC = {'nmj': 'Neuromuscular', 'chol': 'Cholinergic', 'adr': 'Adrenergic (printed “ADNRENERGIC”)', 'raas': 'RAAS'}
def esc(s): return s.replace('|', '/')
md = ['# DL2 — Exam 2 drug list', '',
      'Source: `Pharmacology_Exam_2_Drug_List.pdf` (10 pages), headed “Courtesy of Joshua Farias (Class of 2025)”: a student-compiled table posted in the course’s Exam 2 folder. Columns: Drug / MOA / SOA / Side effects-ADRs / Extra-key information. Colour code: green = agonist, red = antagonist, blue = indirect antagonist, purple = donor. Treated as secondary to the slides: where it disagrees with a slide, the slide wins (see Conflicts).',
      '',
      'Generated by `src/gen_druglist2.py` (writes `src/q_DL2.js` and this file). Parsing method: the text extraction (`decks/Pharmacology_Exam_2_Drug_List.txt`) was read alongside page renders of the PDF to assign each cell to its column; rows that run across a page break are given both pages.',
      '',
      'Verification decks: `Autonomic Nervous System.pdf`, `PCOL-NMJ_PCOL_2026s_pptx.pdf`, `PCOL-Cholinergic-26s.pdf`. The adrenergic and RAAS decks are not available yet, so every adrenergic and RAAS drug except epinephrine and norepinephrine is “list only”. Day 1 slide 8 (Exam 1 deck) says Exam 2 tests MOA, SOA, ADRs and DDIs and not use/indication, dose, route or brand names, so the bank asks few use items and no brand names.',
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
       '## Conflicts / uncertain (list vs slide; the slide wins)', '',
       '| Drug | Drug list says | Slide says | Resolution |', '|---|---|---|---|']
for d, a, b, c in CONFLICTS:
    md.append(f'| {esc(d)} | {esc(a)} | {esc(b)} | {esc(c)} |')
md += ['', '## Questions', '']
per = {}
for q in qs: per[q['sub']] = per.get(q['sub'], 0) + 1
md.append(f"{len(qs)} questions (all skill `drug`; {sum(1 for q in qs if q.get('multi'))} select-all). Per sub: " + ', '.join(f'{k} {v}' for k, v in per.items()) + '.')
md.append('')
for q in qs:
    md.append(f"- {q['id']} ({q['sub']}{', select-all' if q.get('multi') else ''}{', note' if q.get('note') else ''}): {q['stem']}")
open(os.path.join(here, '..', 'notes', 'DL2.md'), 'w', encoding='utf-8').write('\n'.join(md) + '\n')
print(len(qs), 'drug-list questions;', 'per sub', per)
