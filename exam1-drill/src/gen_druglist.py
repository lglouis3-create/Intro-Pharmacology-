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
# Textbook reading, keyed on the question's concept. Katzung 16e Ch. 2 and Ch. 6 only; every
# sentence is traceable to the chapter text. Page numbers are those of the AccessMedicine printout
# ("Page n / 20"), not the printed book. Drugs the chapters do not name (prazosin, albuterol,
# pindolol, varenicline, tropicamide, loratadine, diphenhydramine) get receptor-class entries only.
K2, K6 = 'Katzung 16e, Ch. 2', 'Katzung 16e, Ch. 6'
def R(src, sec, t):
    return {'src': src, 'sec': sec, 't': t}
_PARTIAL = R(K2, 'Partial Agonists (printout p. 6/18)',
    'Agonists are divided by the maximal response they produce when all receptors are occupied: partial agonists produce a lower response at full receptor occupancy than full agonists do, and this failure to reach the full maximum is not due to decreased affinity for the receptor. Because a partial agonist occupies the same receptor sites as a full agonist, it competitively inhibits the responses produced by full agonists, a mixed agonist-antagonist property that can be beneficial or deleterious in the clinic. Full agonists tend to shift the conformational equilibrium of the receptor more strongly than partial agonists.')
_COMPET = R(K2, 'Competitive & Irreversible Antagonists (printout p. 5/18)',
    'Receptor antagonists bind to receptors but do not activate them; their primary action is to reduce the effects of agonists that normally activate the receptor. In the presence of a fixed agonist concentration, increasing concentrations of a competitive antagonist progressively inhibit the response, but sufficiently high agonist concentrations can surmount the block, so the agonist concentration-effect curve shifts to the right while its maximal effect (Emax) stays the same. The degree of inhibition therefore depends both on the antagonist concentration and on the concentration of agonist competing for the receptor.')
_IRREV = R(K2, 'Competitive & Irreversible Antagonists (printout p. 5-6/18)',
    'Phenoxybenzamine is an irreversible α-adrenoceptor antagonist used to control the hypertension caused by catecholamines released from pheochromocytoma; once it lowers blood pressure, blockade is maintained even when the tumor episodically releases very large amounts of catecholamine. Noncompetitive antagonists of this kind bind the receptor irreversibly or nearly so, sometimes by a covalent bond, so agonists cannot surmount the inhibition whatever their concentration and the maximal effect of the agonist is reduced. Because such a drug need not remain present in unbound form to act, its duration of action depends on the rate of receptor turnover rather than on its own elimination, and an overdose must be antagonized physiologically with a pressor agent that does not act through α adrenoceptors.')
_B2 = R(K6, 'Autonomic Receptors, Table 6-2; Table 6-3 (printout p. 11, 14/20)',
    'The β2 adrenoceptor sits on postsynaptic effector cells, especially smooth muscle and cardiac muscle, and ligand binding stimulates adenylyl cyclase and increases cyclic adenosine monophosphate (cAMP); under some conditions it also activates cardiac Gi. Table 6-3 lists relaxation of bronchiolar smooth muscle, of skeletal muscle blood vessels, of the bladder wall and of the pregnant uterus as β2 effects of sympathetic activity, and acceleration of the sinoatrial node and increased contractility as β1 and β2 effects.')
_B1B2 = R(K6, 'Autonomic Receptors, Table 6-2; Table 6-3 (printout p. 11, 14-15/20)',
    'β1 receptors sit on postsynaptic effector cells, especially the heart, lipocytes and brain, as well as on presynaptic adrenergic and cholinergic nerve terminals and the juxtaglomerular apparatus; β2 receptors sit on postsynaptic effector cells, especially smooth muscle and cardiac muscle. Ligand binding at both stimulates adenylyl cyclase and increases cyclic adenosine monophosphate (cAMP). Table 6-3 assigns acceleration of the sinoatrial node and increased contractility to β1 and β2, renin release to β1, and relaxation of bronchiolar smooth muscle to β2.')
_A1 = R(K6, 'Autonomic Receptors, Table 6-2; Table 6-3 (printout p. 11, 14/20)',
    'The α1 adrenoceptor sits on postsynaptic effector cells, especially smooth muscle, and ligand binding leads to formation of inositol trisphosphate (IP3) and diacylglycerol (DAG) with increased intracellular calcium. Table 6-3 attributes to α1 the contraction of the iris radial muscle and of the gastrointestinal and bladder sphincters, and to α receptors the contraction of skin and splanchnic vessels. Within the α-adrenoceptor class, α1 and α2 receptors differ in both agonist and antagonist selectivity, and the development of more selective blocking drugs is what led to naming these subclasses.')
_CATECHOL = R(K2, 'G Proteins & Second Messengers (printout p. 10/18)',
    'The body responds to danger by using the catecholamines norepinephrine and epinephrine both to increase heart rate and to constrict blood vessels in the skin, acting on Gs-coupled β adrenoceptors and Gq-coupled α1 adrenoceptors respectively. A single endogenous ligand such as norepinephrine can thus bind receptors that couple to different G proteins, which lets it elicit different responses in different cells.')
_MUSC = R(K6, 'Autonomic Receptors, Table 6-2; Box: Pharmacology of the Eye (printout p. 11, 19/20)',
    'Table 6-2 places M1 receptors on central nervous system (CNS) neurons, sympathetic postganglionic neurons and some presynaptic sites, where ligand binding forms inositol trisphosphate (IP3) and diacylglycerol (DAG) and raises intracellular calcium; M2 on myocardium, smooth muscle and some presynaptic sites, where binding opens potassium channels and inhibits adenylyl cyclase; and M3 on exocrine glands and vessels (smooth muscle and endothelium), coupling like M1. In the eye, parasympathetic activity and muscarinic cholinomimetics contract the pupillary constrictor and ciliary muscles (M3 in Table 6-3), producing miosis and accommodation for near vision, and all of these effects are prevented or reversed by muscarinic blocking drugs.')
_HIST = R(K2, 'G Proteins & Second Messengers, Table 2-1; Receptor Classes & Drug Development (printout p. 11, 14/18)',
    'Table 2-1 lists histamine among the ligands for Gs-coupled receptors, whose effector pathway is stimulation of adenylyl cyclase and increased cyclic adenosine monophosphate (cAMP). Histamine is also given, with norepinephrine, acetylcholine and serotonin, as a biogenic amine that activates more than one receptor, each of which may activate a different G protein, and the existence of several receptor subtypes for one endogenous ligand is what creates the opportunity for subtype-selective drugs. Histamine and acetylcholine are also named as natural vasodilator agents that make vascular endothelial cells generate nitric oxide.')
READING = {
 'moa-norepinephrine': [
    R(K6, 'Neurotransmitter Chemistry — Adrenergic Transmission; Table 6-2; Presynaptic Regulation (printout p. 6, 11, 15/20)',
      'Norepinephrine (noradrenaline) is the primary transmitter released by most postganglionic sympathetic fibers, and receptors that respond to catecholamines such as norepinephrine are called adrenoceptors. Table 6-2 lists the subtypes: α1 on postsynaptic effector cells, especially smooth muscle (formation of inositol trisphosphate (IP3) and diacylglycerol (DAG), increased intracellular calcium); α2 on presynaptic adrenergic nerve terminals, platelets, lipocytes and smooth muscle (inhibition of adenylyl cyclase, decreased cyclic adenosine monophosphate (cAMP)); β1 especially on the heart and β2 especially on smooth muscle and cardiac muscle (both stimulate adenylyl cyclase and increase cAMP). The α2 receptor on noradrenergic nerve terminals is an autoreceptor: its activation by norepinephrine diminishes further norepinephrine release.'),
    _CATECHOL],
 'moa-epinephrine': [
    R(K6, 'Neurotransmitter Chemistry — Adrenergic Transmission; Table 6-2; Table 6-4 (printout p. 6, 8, 11, 16/20)',
      'Adrenal medullary cells, which are embryologically analogous to postganglionic sympathetic neurons, receive input from preganglionic sympathetic nerves and release a mixture of epinephrine and norepinephrine into the circulation; in the adrenal medulla some norepinephrine is converted to epinephrine. Epinephrine is a catecholamine, and the receptors that respond to catecholamines are the adrenoceptors of Table 6-2: α1 (formation of inositol trisphosphate and diacylglycerol, increased intracellular calcium), α2 (inhibition of adenylyl cyclase, decreased cyclic adenosine monophosphate (cAMP)), and β1 and β2 (stimulation of adenylyl cyclase, increased cAMP). Table 6-4 also lists epinephrine acting at presynaptic β2 receptors with an excitatory effect on transmitter release from adrenergic and somatic motor cholinergic terminals.'),
    _CATECHOL],
 'moa-acetylcholine': [
    R(K6, 'Autonomic Receptors, Table 6-2 (printout p. 11/20)',
      'Cholinoceptor denotes any receptor, muscarinic or nicotinic, that responds to acetylcholine; the two subtypes were named after the alkaloids muscarine and nicotine originally used to identify them. Table 6-2 places M1 on central nervous system (CNS) neurons, sympathetic postganglionic neurons and some presynaptic sites (formation of inositol trisphosphate and diacylglycerol, increased intracellular calcium), M2 on myocardium, smooth muscle and some presynaptic sites (opening of potassium channels, inhibition of adenylyl cyclase) and M3 on exocrine glands and vessels (coupling like M1). The nicotinic receptors are NN on postganglionic neurons and some presynaptic cholinergic terminals and NM at skeletal muscle neuromuscular end plates; both are pentameric, and ligand binding opens sodium and potassium channels to depolarize the cell.'),
    R(K2, 'Ion Channels; Receptor Classes & Drug Development; Table 2-1 (printout p. 9, 11, 14/18)',
      'Acetylcholine is the example of one chemical acting on completely different structural receptor classes: it uses ligand-gated ion channels (nicotinic acetylcholine receptors) to produce a fast excitatory postsynaptic potential within milliseconds, and it also activates a separate class of G protein-coupled receptors (muscarinic receptors) that mediate slower modulatory effects over seconds to minutes on the same neurons. In Table 2-1, muscarinic receptors couple to Gi (decreased cyclic adenosine monophosphate (cAMP), opening of cardiac potassium channels and slowed heart rate) and to Gq (increased phospholipase C, inositol trisphosphate, diacylglycerol and cytoplasmic calcium).')],
 'moa-tropicamide': [_MUSC, _COMPET],
 'moa-prazosin': [_A1, _COMPET],
 'moa-phenylephrine': [
    R(K6, 'Box: Pharmacology of the Eye; Autonomic Receptors; Table 6-3 (printout p. 19, 11, 14/20)',
      'Alpha adrenoceptors mediate contraction of the radially oriented pupillary dilator muscle fibers of the iris, producing mydriasis (an increase in pupil size); this occurs during sympathetic discharge and when α-agonist drugs such as phenylephrine are placed in the conjunctival sac. Table 6-3 assigns contraction of the iris radial muscle to the α1 receptor, whose ligand binding forms inositol trisphosphate (IP3) and diacylglycerol (DAG) and raises intracellular calcium (Table 6-2). Phenylephrine is also named, with noradrenaline and isoproterenol, among the agonists whose names were not practicable for naming the receptors of noradrenergic nerves, which is why the term adrenoceptor is used instead.')],
 'moa-phenoxybenzamine': [_IRREV],
 'irreversible-drug': [_IRREV],
 'moa-metoprolol': [
    R(K2, 'Case Study Answer; Competitive & Irreversible Antagonists (printout p. 18, 5/18)',
      'Metoprolol is described as a more highly selective adrenoceptor antagonist than propranolol: it binds preferentially to the β1 subtype, a major β adrenoceptor in the heart, and has a lower affinity (a higher equilibrium dissociation constant, Kd) for the β2 subtype that mediates bronchodilation, so it is an alternative for a hypertensive patient whose asthma propranolol would worsen. For a competitive β-adrenoceptor antagonist such as propranolol, the degree of inhibition depends on the antagonist concentration and on the amount of endogenous norepinephrine and epinephrine competing for the receptors, so the surge of transmitter with exercise or stress may overcome the block.'),
    _B1B2],
 'moa-diazepam': [
    R(K2, 'Competitive & Irreversible Antagonists — allosteric modulators (printout p. 6/18)',
      'Benzodiazepine drugs like diazepam bind to an allosteric site on ion channels that are physiologically activated by the neurotransmitter γ-aminobutyric acid (GABA); an allosteric site is a site on the receptor separate from the classical orthosteric site bound by the endogenous agonist. The chapter calls benzodiazepines positive allosteric modulators of GABA receptors because they potentiate, rather than inhibit, the ability of the orthosteric agonist GABA to increase channel conductance. A useful feature of this mechanism is that benzodiazepines have little activating effect on their own, which contributes to their relative safety in overdose unless combined with other sedating drugs.')],
 'moa-albuterol': [_B2, _PARTIAL],
 'moa-varenicline': [
    R(K6, 'Autonomic Receptors, Table 6-2; Postsynaptic Regulation (printout p. 11, 16/20)',
      'The neuronal nicotinic receptor (NN) is found on postganglionic neurons and some presynaptic cholinergic terminals; it is a pentameric receptor that typically contains α- and β-type subunits only, and ligand binding opens sodium and potassium channels, depolarizing the cell. In an autonomic ganglion, binding of an appropriate ligand to the NN receptor produces the fast excitatory postsynaptic potential that fires the postganglionic cell. NN is distinct from NM, the nicotinic receptor of skeletal muscle neuromuscular end plates, whose pentamer also contains γ and δ subunits.'),
    _PARTIAL],
 'moa-histamine': [_HIST],
 'moa-loratadine': [
    R(K2, 'Competitive & Irreversible Antagonists (printout p. 5/18)',
      'Antagonists are traditionally thought to have no functional effect in the absence of an agonist, but some antagonists exhibit inverse agonist activity because they also reduce receptor activity below the basal level observed in the absence of any agonist at all. Like other antagonists, such a drug binds the receptor without activating generation of a signal and interferes with the ability of the agonist to activate it.')],
 'moa-pindolol': [_PARTIAL, _B1B2],
 'moa-diphenhydramine': [
    R(K2, 'Receptors mediate the actions of agonists and antagonists; Receptor Classes & Drug Development (printout p. 4, 14/18)',
      'Pharmacologic antagonists bind to receptors but do not activate generation of a signal, and consequently they interfere with the ability of an agonist to activate the receptor; some of the most useful drugs in clinical medicine are antagonists. Histamine is named as a biogenic amine that activates more than one receptor subtype, each of which may activate a different G protein, and the existence of several receptor subtypes for one endogenous ligand is what makes subtype-selective drugs possible.')],
 'partial-agonists': [_PARTIAL,
    R(K2, 'Relation Between Drug Dose & Clinical Response — Potency; Maximal efficacy (printout p. 15/18)',
      'In Figure 2-15, drug B is a partial agonist: it is more potent than drug A because its half-maximal effective concentration (EC50) is lower, yet some doses of drug A produce larger effects than any dose of drug B, because drug A has the greater maximal efficacy. Maximal efficacy may be set by the drug’s mode of interaction with receptors, as with partial agonists, or by the receptor-effector system.')],
 'alpha1-drugs': [_A1, _CATECHOL],
 'antagonists-list': [
    R(K2, 'Receptors mediate the actions of agonists and antagonists; Competitive & Irreversible Antagonists (printout p. 4-6/18)',
      'Agonists activate the receptor to signal as a direct result of binding to it; pharmacologic antagonists bind to receptors but do not activate generation of a signal and consequently interfere with the ability of an agonist to activate the receptor. Antagonists are divided into competitive antagonists, whose block can be surmounted by a high enough agonist concentration, and noncompetitive antagonists, which often bind irreversibly so that the block cannot be surmounted and the maximal response falls. Some antagonists also show inverse agonist activity, reducing receptor activity below basal levels, and drugs that bind a site different from the one bound by the endogenous ligand act as allosteric modulators.')],
 'histamine-drugs': [_HIST],
 'beta-drugs': [_B2,
    R(K2, 'G Proteins & Second Messengers; Clinical Selectivity; Case Study Answer (printout p. 10, 17-18/18)',
      'β adrenoceptors are Gs-coupled receptors: Gs stimulates adenylyl cyclase to raise cyclic adenosine monophosphate (cAMP) when activated by hormones and neurotransmitters acting through such receptors. β1 is a major β adrenoceptor in the heart while the β2 subtype mediates bronchodilation, and x-ray crystallography shows that the orthosteric binding sites of β1 and β2 are identical, so drugs discriminate between the subtypes by differences in the vestibule they traverse to reach that site.')],
}
# Where Katzung and the drug list use different terms for something a question tests.
NOTE = {
 'moa-diazepam': 'Katzung Ch. 2 calls diazepam a positive allosteric modulator of the GABA receptor, one that potentiates GABA and has little activating effect on its own; the Exam 1 drug list classes it as a GABA receptor allosteric agonist. The exam is written from the drug list.',
}

def lc(m):
    """Lower-case the first letter of a Table 1 mechanism string unless it starts with an acronym."""
    return m if m.startswith('GABA') else m[0].lower() + m[1:]
def why_wrong(m, d):
    """Why option `m` is wrong for drug `d`: name the drug(s) Table 1 gives that mechanism to, then
    restate d's own row so the distinguishing receptor or direction is on the page. Table 1 wording only."""
    ds = [x.lower() for x in owner.get(m, [])]
    if not ds:
        return f'No drug on the Exam 1 list has this mechanism; {d.lower()} is listed as: {MOA[d][0]}.'
    return f'This is the listed mechanism of {" and ".join(ds)} ({lc(m)}); {d.lower()} is listed as: {MOA[d][0]}.'

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
    if q['concept'] in READING:
        q['reading'] = READING[q['concept']]
    if q['concept'] in NOTE:
        q['note'] = NOTE[q['concept']]
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
        opts.append({'t': x, 'correct': False, 'why': why_wrong(x, d)})
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
