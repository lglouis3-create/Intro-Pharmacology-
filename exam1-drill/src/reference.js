const REFERENCE_HTML = `
<h2>Reference</h2>
<p class="sub">Tables the questions return to. Nothing here is scored. Slide numbers marked ~ were counted from the deck text and may be off by one or two.</p>

<h3>Drug classes at a receptor</h3>
<!--FIG:classes-->
<table class="reftab"><thead><tr><th>Class</th><th>At the binding site</th><th>Response</th><th>Drug-list examples</th></tr></thead><tbody>
<tr><td>Full agonist</td><td>Binds the agonist pocket and activates the receptor</td><td>Rises to the full maximum</td><td>Norepinephrine, epinephrine, phenylephrine, acetylcholine, histamine</td></tr>
<tr><td>Partial agonist</td><td>Binds the same pocket and activates it, but less</td><td>Rises, but plateaus below a full agonist even with every receptor occupied</td><td>Albuterol, pindolol, varenicline</td></tr>
<tr><td>Reversible (competitive) antagonist</td><td>Binds the pocket without activating it, then comes off; more agonist wins the pocket back</td><td>Stays at basal; the agonist curve shifts right with the same maximum</td><td>Prazosin, metoprolol, tropicamide, diphenhydramine</td></tr>
<tr><td>Irreversible antagonist</td><td>Binds the pocket and stays (covalent); agonist cannot displace it</td><td>Stays at basal; the agonist's maximum falls until new receptors are made</td><td>Phenoxybenzamine (the only one on the list)</td></tr>
<tr><td>Inverse agonist</td><td>Binds the pocket and pushes the receptor to its inactive state</td><td>Falls below basal</td><td>Loratadine</td></tr>
<tr><td>Allosteric modulator</td><td>Binds a second site, not the agonist pocket; changes what the agonist does there</td><td>Larger (or smaller) than the agonist alone would give; little effect by itself</td><td>Diazepam</td></tr>
</tbody></table>
<p class="sub">Classes from Katzung 16e Ch. 2 (agonists, partial agonists, competitive and irreversible antagonists, inverse agonists, allosteric modulators); examples from Exam_1_Drug_List_2026.pdf, Table 1.</p>

<h3>Exam 1 drug list</h3>
<table class="reftab"><thead><tr><th>Drug</th><th>Mechanism of action</th><th>Receptor family</th></tr></thead><tbody>
<tr><td>Norepinephrine</td><td>α1, α2, β1 and β2 agonist</td><td>Adrenergic</td></tr>
<tr><td>Epinephrine</td><td>α1, α2, β1 and β2 agonist</td><td>Adrenergic</td></tr>
<tr><td>Phenylephrine</td><td>α1 agonist</td><td>Adrenergic</td></tr>
<tr><td>Prazosin</td><td>α1 antagonist (reversible)</td><td>Adrenergic</td></tr>
<tr><td>Phenoxybenzamine</td><td>α1 and α2 antagonist (<b>irreversible</b>, the only irreversible drug on the list)</td><td>Adrenergic</td></tr>
<tr><td>Metoprolol</td><td>β1 antagonist (reversible)</td><td>Adrenergic</td></tr>
<tr><td>Albuterol</td><td>β2 partial agonist</td><td>Adrenergic</td></tr>
<tr><td>Pindolol</td><td>β1 and β2 partial agonist</td><td>Adrenergic</td></tr>
<tr><td>Acetylcholine</td><td>Agonist at muscarinic (M1, M2, M3) and nicotinic (Nn, Nm) receptors</td><td>Cholinergic</td></tr>
<tr><td>Tropicamide</td><td>Muscarinic (M1, M2, M3) antagonist (reversible)</td><td>Cholinergic</td></tr>
<tr><td>Varenicline</td><td>Nicotinic (Nn) partial agonist</td><td>Cholinergic</td></tr>
<tr><td>Histamine</td><td>Histamine H1 and H2 agonist</td><td>Histamine</td></tr>
<tr><td>Loratadine</td><td>Histamine H1 inverse agonist</td><td>Histamine</td></tr>
<tr><td>Diphenhydramine</td><td>Non-selective histamine receptor antagonist</td><td>Histamine</td></tr>
<tr><td>Diazepam</td><td>GABA receptor allosteric agonist</td><td>GABA</td></tr>
</tbody></table>
<p class="sub">Exam_1_Drug_List_2026.pdf, Table 1. All drugs on the list are reversible and act competitively at their receptors except phenoxybenzamine. The receptor-family column groups the rows by the receptors each row names.</p>
<h3>Day 1 (9/22) &mdash; Pharmacodynamics-Day-1-2026s.pdf</h3>
<table class="reftab">
<tr><th>Receptor class</th><th>Structure</th><th>Examples on slide</th></tr>
<tr><td>Ion channels</td><td>Transmembrane proteins</td><td>L-type Ca++ channels, GABA, etc.</td></tr>
<tr><td>7-transmembrane (GPCR)</td><td>Crosses membrane 7 times; heterotrimeric G protein (α, β, γ)</td><td>α & β adrenergic, 5HT, histamine, etc.</td></tr>
<tr><td>1-transmembrane</td><td>Binding pocket outside, enzymatic activity inside</td><td>Tyrosine kinases, etc.</td></tr>
<tr><td>Intracellular receptors & transcriptional regulators</td><td>Cytosolic / nuclear</td><td>Steroid hormones, etc.</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day-1-2026s.pdf: slides ~35–36 (Receptors Classification); transcript 9/22 for 1-TM and 7-TM descriptions.</p>
<table class="reftab">
<tr><th>Apparent potency (PK)</th><th>Pharmacological potency (PD)</th></tr>
<tr><td>Age; Absorption; Distribution; Elimination; DDI</td><td>Tissue sensitivity; Receptor #; Receptor activity; Affinity; Efficacy</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day-1-2026s.pdf: slide ~27 (In Relating Dose to Effect).</p>
<table class="reftab">
<tr><th>Theory</th><th>Key term</th><th>Drug classes explained</th></tr>
<tr><td>Clark — occupancy theory</td><td>Affinity</td><td>Full agonist (occupies all receptors, 100%) vs partial agonist (e.g., 70% occupied, 70% response)</td></tr>
<tr><td>Ariens — modified occupancy</td><td>Intrinsic activity</td><td>Full (100%), partial (1–99%), antagonist (0)</td></tr>
<tr><td>Stephenson / Furchgott / Nickerson</td><td>Efficacy; two-state model (L constant)</td><td>Adds negative efficacy → inverse agonists</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day-1-2026s.pdf: slide ~28; transcript 9/22 (names not tested).</p>
<table class="reftab">
<tr><th>Step</th><th>Nicotinic / channel / ATPase sequence</th></tr>
<tr><td>1</td><td>Acetylcholine binds to 2 α subunits in the nicotinic receptor</td></tr>
<tr><td>2</td><td>Channel opens: ↑ Na+ influx / K+ outflow</td></tr>
<tr><td>3</td><td>Depolarization of membrane potential (less negative)</td></tr>
<tr><td>4</td><td>Open voltage-sensitive Ca++ channels</td></tr>
<tr><td>5</td><td>Increase in intracellular Ca++ = ↑ contraction</td></tr>
<tr><td>6</td><td>Na+/K+ ATPase restores membrane potential</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day-1-2026s.pdf: slide ~48.</p>
<table class="reftab">
<tr><th>Metoprolol (Toprol XL)</th><th></th></tr>
<tr><td>MOA</td><td>Reversible β1 receptor antagonist (blocker)</td></tr>
<tr><td>SOA</td><td>Heart; kidneys & brain</td></tr>
<tr><td>ADR</td><td>Bradycardia, fatigue, etc.</td></tr>
<tr><td>DDI</td><td>Verapamil, diltiazem, clonidine, etc.</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day-1-2026s.pdf: slide ~9; transcript 9/22 (β1-selective up to about 200 mg).</p>

<h3>Day 2 (9/23) &mdash; Pharmacodynamics-Day_2_2026s copy.pdf</h3>
<table class="reftab">
<tr><th>α subunit</th><th>meaning</th><th>effector</th><th>second messenger</th><th>examples in lecture</th></tr>
<tr><td>Gαs</td><td>stimulation</td><td>adenylate cyclase (AC)</td><td>↑ cAMP</td><td>β1 (heart, ↑HR)</td></tr>
<tr><td>Gαi</td><td>inhibition</td><td>adenylate cyclase (AC)</td><td>↓ cAMP</td><td>M2 (heart, ↓HR); α2 (CNS)</td></tr>
<tr><td>Gαq</td><td>"something positive" (calcium)</td><td>phospholipase C (PLC)</td><td>↑ IP3, Ca++</td><td>α1 (smooth muscle, vasoconstriction)</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day_2_2026s copy.pdf: slide ~3 and slide ~30; transcript 9/23 (~25–50%).</p>
<table class="reftab">
<tr><th>bond</th><th>description</th><th>binding class</th><th>examples</th></tr>
<tr><td>Covalent</td><td>two atoms share a pair of electrons; irreversible at body temperature; long duration of action</td><td>irreversible, unsurmountable/insurmountable, non-competitive</td><td>aspirin, omeprazole (Prilosec), phenoxybenzamine</td></tr>
<tr><td>Ionic</td><td>electrostatic attraction between + and − charged ions; most receptors have ionizable functional groups</td><td>reversible, surmountable, competitive</td><td>—</td></tr>
<tr><td>Hydrogen</td><td>electrostatic attraction between H and N, O, S; stable and reversible; selectivity and specificity</td><td>reversible, surmountable, competitive</td><td>—</td></tr>
<tr><td>Van der Waals</td><td>weak; occurs when two atoms are brought close together; drug–receptor specificity; better fit means more bonds</td><td>reversible, surmountable, competitive</td><td>—</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day_2_2026s copy.pdf: slides ~15–16; transcript 9/23 (~70%).</p>
<table class="reftab">
<tr><th>class</th><th>affinity preference</th><th>efficacy</th><th>example</th></tr>
<tr><td>Full agonist</td><td>greater affinity for active receptors</td><td>+ efficacy, 100%</td><td>norepinephrine, epinephrine</td></tr>
<tr><td>Partial agonist</td><td>greater affinity for active receptors</td><td>+ efficacy, lower than FA (1–99%)</td><td>—</td></tr>
<tr><td>Inverse agonist</td><td>greater/highest affinity for inactive receptors</td><td>− efficacy</td><td>loratadine (antihistamine)</td></tr>
<tr><td>Neutral (reversible) antagonist</td><td>equal affinity for active and inactive</td><td>none (ε = zero)</td><td>prazosin</td></tr>
<tr><td>Irreversible antagonist</td><td>highest affinity</td><td>none</td><td>phenoxybenzamine</td></tr>
<tr><td>Allosteric agonist / antagonist</td><td>binds a different site; ↑ / ↓ affinity and/or efficacy of another drug</td><td>—</td><td>diazepam (agonist, PAM)</td></tr>
<tr><td>Indirect antagonist</td><td>binds components upstream/downstream of receptor</td><td>—</td><td>caffeine (PDE), RAS drug</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day_2_2026s copy.pdf: slides ~18–19, ~32–44; transcript 9/23 (~78–99%).</p>
<table class="reftab">
<tr><th>Receptor site</th><th>Drug A (KD)</th><th>Drug B (KD)</th></tr>
<tr><td>β1 (heart)</td><td>250 nM</td><td>100 nM</td></tr>
<tr><td>β2 (vasculature)</td><td>30 μM</td><td>250 (unit illegible)</td></tr>
<tr><td>M1 (gut)</td><td>1 mM</td><td>20 (unit illegible)</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day_2_2026s copy.pdf: slide ~51 (quick exercise). The extracted text is scrambled, and the units for Drug B&#x27;s β2 and M1 values could not be recovered. The exercise&#x27;s own questions are also not legible.</p>

<h3>Day 3 (9/24) &mdash; Pharmacodynamics-Day_3_2026s.pdf</h3>
<table class="reftab">
<tr><th>Agent</th><th>Receptor</th><th>Use</th></tr>
<tr><td>Albuterol</td><td>β2</td><td>Bronchodilator</td></tr>
<tr><td>Buprenorphine</td><td>μ-opioid</td><td>Analgesic</td></tr>
<tr><td>Oxymetazoline</td><td>α1</td><td>Nasal decongestant</td></tr>
<tr><td>Pilocarpine</td><td>Muscarinic</td><td>Glaucoma</td></tr>
<tr><td>Varenicline</td><td>Nicotinic (Nn)</td><td>Smoking cessation</td></tr>
<tr><td>Aripiprazole</td><td>D2</td><td>Schizophrenia & Bipolar</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day_3_2026s.pdf: Pharmacodynamics-Day_3_2026s.pdf slide ~53 (&quot;Partial Agonists&quot;).</p>
<table class="reftab">
<tr><th>Term</th><th>Definition / reading</th></tr>
<tr><td>Threshold</td><td>Concentration of the drug below which produces no response</td></tr>
<tr><td>Maximal response (Emax) / ceiling</td><td>Plateau; all receptors occupied or physiological system maxed out</td></tr>
<tr><td>Slope</td><td>Linear mid-section; greatest change in effect for the smallest change in dose</td></tr>
<tr><td>EC50 / ED50</td><td>Concentration / dose producing 50% of maximal response to that drug; indicator of potency (↓EC50 = ↑potency)</td></tr>
<tr><td>Kd</td><td>Dose binding 50% of receptors; Kd = [R][A]/[AR]; ↓Kd = ↑affinity</td></tr>
<tr><td>Relative potency</td><td>ED50B / ED50A (example = 1000X)</td></tr>
<tr><td>Intrinsic activity</td><td>FA = 1; PA 0 &lt; β &lt; 1; antagonist = 0</td></tr>
<tr><td>Unit prefixes</td><td>milli = 10^-3, micro = 10^-6, nano = 10^-9</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day_3_2026s.pdf: Pharmacodynamics-Day_3_2026s.pdf slides ~3, ~21–25; unit prefixes and Emax reasons from transcript 9/24.</p>
<table class="reftab">
<tr><th>Full agonist + full agonist (THM)</th></tr>
<tr><td>Increase apparent affinity of agonist for the receptor (shift to the left)</td></tr>
<tr><td>Still able to reach Emax (no change to Emax)</td></tr>
<tr><td>Increase in the baseline (receptor activity)</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day_3_2026s.pdf: Pharmacodynamics-Day_3_2026s.pdf slide ~49 (not lectured on 9/24).</p>

`;
