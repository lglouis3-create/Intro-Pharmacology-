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

<h3>Day 4 (9/28) &mdash; Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf</h3>
<table class="reftab">
<tr><th>Second drug added to a full agonist</th><th>Shift</th><th>Baseline</th><th>Emax</th><th>Shifts</th><th>Why</th></tr>
<tr><td>Full agonist</td><td>Left</td><td>Up (until 100%)</td><td>No change</td><td>—</td><td>Equal efficacy, both help; mutual exclusion</td></tr>
<tr><td>Partial agonist</td><td>—</td><td>Ends at the partial agonist's own efficacy (up from a low baseline, down from a high one)</td><td>Reached only by the full agonist alone</td><td>—</td><td>Competition by mass action; dual nature</td></tr>
<tr><td>Inverse agonist</td><td>Right</td><td>Down to 0%, then no further change</td><td>No change</td><td>Continue toward infinity</td><td>Reversible; negative efficacy; competition</td></tr>
<tr><td>Allosteric agonist</td><td>Left (affinity) and/or up (efficacy)</td><td>—</td><td>Up only if the agonist was partial</td><td>Asymmetrical, saturable</td><td>Two drugs bound at once; non-competitive</td></tr>
<tr><td>Allosteric antagonist</td><td>Right (affinity) and/or down (efficacy)</td><td>—</td><td>Down if efficacy affected; cannot reach 0</td><td>Asymmetrical, saturable</td><td>Binds elsewhere; non-competitive; reversible</td></tr>
<tr><td>Competitive antagonist</td><td>Right (↑ED50, appears less potent)</td><td>No change (neutral, no efficacy)</td><td>No change (reversible, outcompeted)</td><td>Symmetrical, toward infinity</td><td>Same pocket; law of mass action; 10× antagonist = 10× agonist</td></tr>
<tr><td>Irreversible antagonist</td><td>Right (↑ED50)</td><td>No change (neutral)</td><td>Down, all the way to 0 (can abolish the DRC)</td><td>Symmetrical</td><td>Covalent; greatest affinity; lowers the receptor pool; spare receptors delay the Emax drop</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf: Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf slides ~21–~22, ~30–~34, ~38–~41, ~50, ~53–~54; Pharmacodynamics-Day_3_2026s.pdf slides ~49, ~63; transcript 9/28.</p>
<table class="reftab">
<tr><th>Class</th><th>Two-state affinity</th><th>Efficacy</th><th>Alone at baseline 0% / 50% / 100%</th></tr>
<tr><td>Full agonist</td><td>Highest for active (R*)</td><td>Positive, 100%</td><td>→ 100 / → 100 / flat at 100</td></tr>
<tr><td>Partial agonist</td><td>Highest for active (R*)</td><td>Positive, 1–99%</td><td>→ its Emax / → its Emax / down to its Emax</td></tr>
<tr><td>Inverse agonist</td><td>Highest for inactive (R)</td><td>Negative</td><td>flat at 0 / → 0 / → 0</td></tr>
<tr><td>Competitive antagonist</td><td>Equal for R and R* ("neutral")</td><td>None (affinity but no PCOL efficacy)</td><td>flat at 0 / flat at 50 / flat at 100</td></tr>
<tr><td>Irreversible antagonist</td><td>Greatest affinity (covalent), neutral</td><td>None</td><td>flat (lowers the receptor pool)</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf: Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf slides ~4–~12, ~43–~44, ~51; Day 3 deck slides ~37–~41, ~59–~63; transcript 9/28.</p>
<table class="reftab">
<tr><th>Four characteristics (FA + multiple doses of allosteric agonist)</th><th>Yes / No</th></tr>
<tr><td>Affinity affected</td><td>Yes (shift left)</td></tr>
<tr><td>Efficacy affected</td><td>No (a full agonist is already at 100%; only visible with a partial agonist)</td></tr>
<tr><td>Symmetrical shifts</td><td>No (asymmetrical; allosteric binding does not depend on the agonist)</td></tr>
<tr><td>Saturability</td><td>Yes (once all allosteric sites are occupied the shifts stop)</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf: Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf slides ~30–~34; transcript 9/28.</p>
<table class="reftab">
<tr><th>Kinds of antagonism</th><th>Definition</th><th>Example</th></tr>
<tr><td>Chemical</td><td>Direct chemical interaction between the agonist and antagonist</td><td>Chelating agents, dimercaprol (Au, Hg, As poisoning)</td></tr>
<tr><td>Physiological</td><td>Two agonists acting independent of each other producing opposing effects</td><td>ACh and Epi in the heart</td></tr>
<tr><td>Pharmacological: competitive (orthosteric)</td><td>Surmountable or reversible; agonist and antagonist compete for the same receptor site; most common in clinical practice</td><td>Metoprolol (poll)</td></tr>
<tr><td>Pharmacological: nonequilibrium-competitive (orthosteric)</td><td>Binds irreversibly; insurmountable or irreversible; cannot be overcome by increasing the agonist</td><td>Phenoxybenzamine (poll)</td></tr>
<tr><td>Pharmacological: allosteric (allotropic)</td><td>Non-competitive; decreases the agonist's affinity and/or efficacy from another site (NAM)</td><td>—</td></tr>
<tr><td>Allosteric agonist</td><td>Positive allosteric modulator (PAM); increases affinity and/or efficacy</td><td>Diazepam (poll)</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf: Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf slides ~35–~37, ~55; transcript 9/28.</p>
<h3>Day 5 (9/29) &mdash; Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf</h3>
<table class="reftab">
<tr><th>Situation</th><th>Agonist potency</th><th>Antagonist potency</th><th>Emax with an irreversible antagonist</th></tr>
<tr><td>Tissue with a lot of receptors (spare receptors, up-regulation)</td><td>Higher (more sensitive; shift left)</td><td>Lower (less sensitive)</td><td>Holds at first (looks competitive), drops later</td></tr>
<tr><td>Tissue with fewer receptors (down-regulation)</td><td>Lower (less sensitive; shift right)</td><td>Higher (more sensitive)</td><td>Drops faster</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf: Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf pages 2–3, 17–18, 25–28; transcript 9/29.</p>
<table class="reftab">
<tr><th>Indirect antagonist</th><th>Target</th><th>Effect on the agonist's curve</th></tr>
<tr><td>Milrinone, caffeine (PDE inhibitors)</td><td>Phosphodiesterase (breaks down cAMP)</td><td>Increases potency; shift left (partial can look full)</td></tr>
<tr><td>Cancer drug X</td><td>RAS (GEF → RAS → RAF → MEK → ERK)</td><td>Decreases potency and efficacy; shift right and down</td></tr>
<tr><td>Fluoxetine (SSRI), duloxetine (SNRI), cocaine</td><td>Reuptake transporter (SERT / norepinephrine transporter)</td><td>Neurotransmitter more potent; shift left, same Emax</td></tr>
<tr><td>Physostigmine (any -stigmine)</td><td>Acetylcholinesterase enzyme</td><td>Acetylcholine more potent; shift left, same Emax</td></tr>
<tr><td>Carbidopa</td><td>Enzyme in the gut that breaks down dopa</td><td>More dopa reaches the brain (potentiation)</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf: Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf pages 4–13, 31; transcript 9/29.</p>
<table class="reftab">
<tr><th>Drug–drug interaction</th><th>Definition (slide)</th><th>Example</th></tr>
<tr><td>Addition</td><td>Two different drugs with the same effect are given together; result equals the sum of the individual effects</td><td>Trimethoprim and sulfamethoxazole (folic acid synthesis, bacterial growth)</td></tr>
<tr><td>Synergism</td><td>Two different drugs with the same effect are given together; result greater in magnitude than the sum of each drug alone</td><td>Penicillin and gentamicin (antipseudomonal)</td></tr>
<tr><td>Potentiation</td><td>One drug lacks an effect on its own but increases the effect of another</td><td>Carbidopa and dopa (inactive analog blocks the breakdown of dopa)</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf: Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf pages 30–31; transcript 9/29.</p>
<table class="reftab">
<tr><th>Quantity</th><th>Definition</th><th>Numbers on the slides</th></tr>
<tr><td>ED50</td><td>Dose of the drug that protects/treats 50% of the population</td><td>Epinephrine in dogs ≈ 29 ng/kg/min (spoken); acetaminophen ≈ 325 mg (spoken); 10 mg (page 40); 100 μg/kg (page 41 right); 0.1 (page 42)</td></tr>
<tr><td>LD50</td><td>Dose of the drug that kills 50% of the population</td><td>160 mg (page 40); 400 μg/kg (page 41 right); 100 (page 42)</td></tr>
<tr><td>TI = LD50/ED50</td><td>Margin of safety; "statement of how selective a drug is in producing a desired effect"; larger = safer</td><td>Phenobarbital 40/4 = 10; alprazolam 2500; 160/10 = 16; codeine figure 40; hypnosis/death 400/100 = 4; sleep/death 100/0.1 = 1000</td></tr>
<tr><td>SI = LD1/ED99</td><td>Safety index (safety ratio); for a safe drug ED99 &lt; LD1; larger = safer</td><td>1/10 = 0.1 (page 42)</td></tr>
<tr><td>Therapeutic window</td><td>Range of steady-state concentrations providing therapeutic efficacy with minimal toxicity</td><td>Acceptable risk depends on severity: headache vs Hodgkin's lymphoma</td></tr>
<tr><td>Acetaminophen</td><td>Regular 325 mg/tablet, Extra Strength 500 mg/tablet, 4–6 hrs</td><td>&gt; 4000 mg/day ⇒ liver toxicity</td></tr>
</table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf: Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf pages 34, 36–42; transcript 9/29. Arithmetic checked: 40/4 = 10; 160/10 = 16; 400/100 = 4; 100/0.1 = 1000; 1/10 = 0.1.</p>
<h3>Day 6 (9/30): the three questions for any curve figure</h3>
<table class="reftab">
<tr><th>Question</th><th>Answer</th><th>Rules in</th><th>Rules out</th></tr>
<tr><td>0. Where is the point of reference?</td><td>The drug alone (dotted or dashed)</td><td>Every other curve is read against it</td><td>&mdash;</td></tr>
<tr><td>1. Is it shifting? Left (helping) or right (making life more difficult)?</td><td>Left</td><td>Full agonist, allosteric agonist, indirect antagonist that raises the signal (PDE inhibitor), more receptors</td><td>Competitive antagonist, inverse agonist, irreversible antagonist, allosteric antagonist</td></tr>
<tr><td></td><td>Right</td><td>Competitive antagonist, inverse agonist, irreversible antagonist, allosteric antagonist</td><td>Full agonist, partial agonist, allosteric agonist (any kind)</td></tr>
<tr><td>2. Is the baseline changing?</td><td>Down to 0</td><td>Inverse agonist</td><td>Everything neutral (competitive, irreversible, allosteric antagonist)</td></tr>
<tr><td></td><td>Up</td><td>A second agonist (full or partial)</td><td>Antagonists of every kind</td></tr>
<tr><td></td><td>No change, baseline already at 0</td><td>Cannot tell competitive from inverse</td><td>Nothing</td></tr>
<tr><td>3. Is the Emax changing?</td><td>Down</td><td>Irreversible antagonist; allosteric antagonist on efficacy</td><td>Competitive antagonist, inverse agonist (both competitive: never affect the Emax)</td></tr>
<tr><td></td><td>Up (partial becomes full)</td><td>Allosteric agonist on efficacy, PDE inhibitor, more receptors</td><td>Anything that affects affinity only</td></tr>
<tr><td></td><td>No change</td><td>Competitive antagonist, inverse agonist, allosteric on affinity only (and, with few shifts, irreversible with spare receptors)</td><td>Irreversible antagonist once several shifts show no drop; anything on efficacy</td></tr>
<tr><td>4. Are the shifts symmetrical? (only with several shifts)</td><td>Equal steps, no limit</td><td>Competitive (orthosteric) antagonist, inverse agonist</td><td>Allosteric</td></tr>
<tr><td></td><td>Unequal, saturating</td><td>Allosteric (then: agonist or antagonist; affinity, efficacy or both)</td><td>Competitive antagonist, inverse agonist</td></tr>
</table>
<p class="sub">Pharmacodynamics reviews.pdf pages 5&ndash;11; transcript 9/30 (&ldquo;Remember that I asked you to ask 3 questions ... ED 50, you got baseline and shifts&rdquo;; &ldquo;if you see a figure in your exam that the shifts are not symmetric, you already know it&rsquo;s allosteric&rdquo;). One right shift with no other change: competitive antagonist as the one best answer; as a select-all, competitive, inverse, irreversible with spare receptors and allosteric antagonist on affinity all stay open.</p>
<!--IMG:rev-shifts-base0-->
<p class="sub">Page 6: A dashed, then A + B, A + 10X B, A + 100X B in equal steps from a baseline of 0, same top. His key: competitive antagonist (the baseline at 0 cannot separate it from an inverse agonist; the symmetrical steps rule out allosteric).</p>
<!--IMG:rev-shifts-base50-->
<p class="sub">Page 7: the same shifts, but A starts at about 50% and the baseline falls to 0 with each dose of B. His key: inverse agonist.</p>
<!--IMG:rev-dotted-left-->
<p class="sub">Page 8: the dotted curve (agonist + drug X) is to the LEFT of the solid agonist alone, same top. His key: full agonist and allosteric agonist affecting affinity (two answers).</p>
<!--IMG:rev-dotted-right-->
<p class="sub">Page 9: ONE shift to the right, same top, baseline 0. His key: competitive antagonist, inverse agonist and irreversible antagonist are all left open; one best answer is competitive (or inverse), never irreversible; a select-all can add an allosteric antagonist affecting only affinity.</p>
<!--IMG:rev-allo-ant-->
<p class="sub">Page 10: three right shifts with UNEQUAL spacing, same top. His key: allosteric antagonist (affinity); the tell is the non-symmetrical shifts.</p>
<!--IMG:rev-pindolol-->
<p class="sub">Page 11: one drug in two systems, from 100% down to about 50% and from 0 up to about 50%. His key: partial agonist (pindolol); it has efficacy, it does not go to 0, it does not reach 100%.</p>
`;
