const REFERENCE_HTML = `
<h2>Reference</h2>
<p class="sub">Slide numbers marked ~ were counted from the deck text and may be off by one or two. (T) marks a transcript date.</p>
<p class="sub">Notation: R = an inactive receptor, R* = an active receptor. R &gt; R* (or R &gt;&gt;&gt; R*): most inactive, baseline about 0%. R = R*: half active, baseline 50%. R &lt; R*: most active, baseline about 100%. &rarr; = goes to or leads to; &uarr; = rises; &darr; = falls. Baseline (basal) = the response before any drug; Emax = the plateau of a curve.</p>

<h3 id="ref-classes">Drug classes at a receptor</h3>
<!--FIG:classes-->
<table class="reftab"><thead><tr><th>Class</th><th>At the binding site</th><th>Response</th><th>Drug-list examples</th></tr></thead><tbody>
<tr><td>Full agonist</td><td>Binds the agonist pocket and activates the receptor</td><td>Rises to the full maximum</td><td>Norepinephrine, epinephrine, phenylephrine, acetylcholine, histamine</td></tr>
<tr><td>Partial agonist</td><td>Binds the same pocket and activates it, but less</td><td>Rises, but plateaus below a full agonist even with every receptor occupied</td><td>Albuterol, pindolol, varenicline</td></tr>
<tr><td>Reversible (competitive) antagonist</td><td>Binds the pocket without activating it, then comes off; more agonist wins the pocket back</td><td>Stays at basal (no efficacy); the agonist curve shifts right with the same maximum</td><td>Prazosin, metoprolol, tropicamide, diphenhydramine</td></tr>
<tr><td>Irreversible antagonist</td><td>Binds the pocket and stays (covalent); agonist cannot displace it</td><td>Stays at basal; the agonist's maximum falls until new receptors are made</td><td>Phenoxybenzamine (the only one on the list)</td></tr>
<tr><td>Inverse agonist</td><td>Binds the pocket and pushes the receptor to its inactive state</td><td>From a raised basal level, falls to 0; from a basal level of 0, no change (nothing active to shut off)</td><td>Loratadine</td></tr>
<tr><td>Allosteric modulator</td><td>Binds a second site, not the agonist pocket; changes what the agonist does there</td><td>Larger (or smaller) than the agonist alone would give; no response of its own</td><td>Diazepam</td></tr>
</tbody></table>
<p class="sub">Classes from Katzung 16e Ch. 2 (agonists, partial agonists, competitive and irreversible antagonists, inverse agonists, allosteric modulators); examples from Exam_1_Drug_List_2026.pdf, Table 1.</p>

<h3 id="ref-druglist">Exam 1 drug list</h3>
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
<p class="sub">Exam_1_Drug_List_2026.pdf, Table 1. The list calls every drug reversible and competitive except phenoxybenzamine (irreversible). Diazepam binds a second (allosteric) site, so it does not compete with GABA for its pocket. The receptor-family column groups the rows by the receptors each row names.</p>

<h3 id="ref-1">1. Reading a curve: axes, potency, efficacy, ED50, Emax</h3>
<p class="sub">What you are looking up: which axis carries affinity, efficacy and potency, and what the threshold, ED50, Emax and baseline each mean.</p>
<!--FIG:potency-->
<!--FIG:efficacy-->
<table class="reftab"><thead><tr><th>Term</th><th>Where on the curve</th><th>Rule</th><th>Why</th></tr></thead><tbody>
<tr><td>x-axis</td><td>Dose or concentration, log scale (the independent variable)</td><td>Affinity is read left and right: the curve further left needs less drug</td><td>&ldquo;Affinity is gonna be on the bottom, efficacy is gonna be on the Y axis&rdquo;; potency combines the two.</td></tr>
<tr><td>y-axis</td><td>Response as a percent of the maximum (the dependent variable)</td><td>Efficacy is read up and down: the plateau height</td><td>Normalized because starting points differ: a resting heart rate of 60 and one of 70 can then be compared.</td></tr>
<tr><td>Threshold</td><td>The dose below which there is no response</td><td>Not the ED50; the ED50 is the dose giving half the Emax, a higher dose than the threshold</td><td>&mdash;</td></tr>
<tr><td>Slope</td><td>The linear mid-section</td><td>The greatest change in effect for the smallest change in dose</td><td>Steep or shallow preferred? His trick question; the answer is &ldquo;it depends&rdquo;.</td></tr>
<tr><td>Emax (maximal response, the ceiling)</td><td>The plateau</td><td>Two reasons a curve stops rising</td><td>Either all the receptors are occupied or the physiological system is maxed out.</td></tr>
<tr><td>EC50 / ED50</td><td>The x-axis value at 50% of that drug&rsquo;s own maximum</td><td>The measure of potency: the smaller the ED50, the more potent, because less drug gives the same response; EC50 is a concentration (in vitro), ED50 a dose (in vivo)</td><td>In vivo, absorption, distribution, metabolism and excretion (ADME) change the apparent potency, so one drug&rsquo;s ED50 and EC50 can differ.</td></tr>
<tr><td>Relative potency</td><td>ED50 of B divided by ED50 of A</td><td>How many times more drug B needs than A; his example is 1000&times;</td><td>&mdash;</td></tr>
<tr><td>Potency</td><td>Left&ndash;right position of the whole curve</td><td>Depends on affinity, efficacy and the tissue (number of receptors)</td><td>&mdash;</td></tr>
<tr><td>Same Emax, different position</td><td>Two curves, same plateau</td><td>The curve on the left is the more potent because it has the greater affinity</td><td>&mdash;</td></tr>
<tr><td>Same ED50, different Emax</td><td>Two curves, same midpoint dose</td><td>With tissue and affinity equal, the drug with the greater efficacy is the more potent (his rule)</td><td>&mdash;</td></tr>
<tr><td>Most potent vs most efficacious</td><td>Furthest left vs highest plateau</td><td>A partial agonist can be the most potent drug on the figure, the full agonist the most efficacious; the job decides which is wanted</td><td>&mdash;</td></tr>
<tr><td>More receptors, same drug</td><td>Curve moves left</td><td>The drug appears more potent; its Kd, affinity and efficacy did not change, the tissue did</td><td>Law of mass action: more receptors means a greater chance that any molecule of drug binds one.</td></tr>
<tr><td>Baseline (point of reference)</td><td>Where the agonist&rsquo;s own curve starts</td><td>A reflection of receptor activity before any drug: most receptors inactive (R &gt; R*) means about 0%; half active (R = R*) means 50%; most active (R &lt; R*) means about 100%</td><td>Unless the figure shows otherwise, assume 99% of the receptors inactive and the baseline at 0.</td></tr>
<tr><td>Pharmacological vs apparent potency</td><td>&mdash;</td><td>Pharmacological: tissue sensitivity, receptor number, receptor activity, affinity, efficacy. Apparent adds pharmacokinetics (what the body does to the drug): age, absorption, distribution, elimination, drug&ndash;drug interactions (DDI)</td><td>&mdash;</td></tr>
<tr><td>Figures that look the same</td><td>&mdash;</td><td>No microscope on the exam</td><td>&ldquo;If they look the same, they are the same.&rdquo;</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_3_2026s.pdf slides ~3, ~7&ndash;~8, ~14, ~16&ndash;~23, ~27; Pharmacodynamics-Day_2_2026s copy.pdf slides ~52&ndash;~58; Pharmacodynamics-Day-1-2026s.pdf slide ~27; transcript 9/22, 9/24, 9/28.</p>

<h3 id="ref-three">The three questions for any curve figure</h3>
<p class="sub">What you are looking up: a figure shows the agonist alone and with drug X; which classes look alike on it and the one observation that separates them.</p>
<table class="reftab"><thead><tr><th>Looks the same</th><th>The one thing to look at</th><th>Answer</th></tr></thead><tbody>
<tr><td>Any second drug: helper or hinderer</td><td>Direction of the shift from the drug alone</td><td>Left (less agonist needed): full agonist, allosteric agonist (binds a second site on the receptor), PDE (phosphodiesterase) inhibitor, more receptors. Right: every antagonist, inverse agonist</td></tr>
<tr><td>Competitive antagonist vs inverse agonist</td><td>A baseline above 0</td><td>Falls to 0: inverse. Unchanged: competitive. Already at 0: cannot tell, because nothing can fall below 0</td></tr>
<tr><td>Second agonist vs any antagonist</td><td>Baseline</td><td>Up: a full or partial agonist, because it activates receptors itself. Unchanged: an antagonist</td></tr>
<tr><td>Competitive vs irreversible antagonist</td><td>Emax over several doses</td><td>Same: competitive. Down: irreversible; spare receptors (more than the agonist needs) delay the drop</td></tr>
<tr><td>Irreversible vs allosteric antagonist on efficacy</td><td>Can the Emax reach 0</td><td>Yes: irreversible. No, it saturates: allosteric</td></tr>
<tr><td>Allosteric agonist on efficacy vs PDE inhibitor vs more receptors</td><td>A partial made full by one shift</td><td>Not separable on one figure; poll key All of the above</td></tr>
<tr><td>Orthosteric (agonist's own pocket) vs allosteric, several shifts</td><td>Step spacing</td><td>Equal, no limit: competitive or inverse. Unequal, stopping: allosteric, because the second site fills</td></tr>
<tr><td>One right shift, same top, baseline 0</td><td>How specific the stem is</td><td>One best answer: competitive. Select-all: inverse, irreversible, allosteric antagonist on affinity too</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics reviews.pdf pages 5&ndash;11; transcript 9/30: &ldquo;the shifts are not symmetric, you already know it&rsquo;s allosteric&rdquo;.</p>
<!--IMG:rev-shifts-base0-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>right, three equal steps</td><td>starts at 0, so an inverse agonist's fall cannot show</td><td>same</td><td>equal steps</td><td><b>competitive antagonist</b></td></tr></table>
<p class="sub">Page 6: the baseline at 0 cannot separate competitive from inverse; the equal steps rule out allosteric and the kept Emax rules out irreversible.</p>
<!--IMG:rev-shifts-base50-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>right</td><td>50 &rarr; 0</td><td>same</td><td>equal steps</td><td><b>inverse agonist</b></td></tr></table>
<p class="sub">Page 7: the same shifts as page 6; the falling baseline is the only difference and it decides.</p>
<!--IMG:rev-dotted-left-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>left</td><td>0, unchanged</td><td>same</td><td>one shift, so no spacing to judge</td><td><b>full agonist or allosteric agonist (affinity)</b></td></tr></table>
<p class="sub">Page 8: a left shift (helper) rules out every antagonist and the inverse agonist; one shift cannot separate the two helpers, so his key has two answers.</p>
<!--IMG:rev-dotted-right-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>right, one shift</td><td>starts at 0, so an inverse agonist's fall cannot show</td><td>same</td><td>one shift, so no spacing to judge</td><td><b>competitive antagonist</b> (one best answer; select-all adds inverse, irreversible, allosteric antagonist on affinity)</td></tr></table>
<p class="sub">Page 9: one shift cannot show symmetry or an Emax drop, so irreversible is never the one best answer.</p>
<!--IMG:rev-allo-ant-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>right, three shifts</td><td>starts at 0, so an inverse agonist's fall cannot show</td><td>same</td><td>unequal steps</td><td><b>allosteric antagonist (affinity)</b></td></tr></table>
<p class="sub">Page 10: the unequal spacing is the tell for allosteric; the kept Emax makes it affinity only.</p>
<!--IMG:rev-pindolol-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>none: the drug is given alone</td><td>100 &rarr; 50 and 0 &rarr; 50</td><td>its own, about 50%</td><td>&mdash;</td><td><b>partial agonist</b> (pindolol)</td></tr></table>
<p class="sub">Page 11: it has efficacy (rises from 0), does not go to 0 (not inverse), does not reach 100% (not full).</p>

<h3 id="ref-2">2. What each drug class does to the curve</h3>
<p class="sub">What you are looking up: a second drug is added to a full agonist; where the curve, the baseline and the Emax go, and whether repeated doses give equal steps.</p>
<table class="reftab"><thead><tr><th>Second drug</th><th>Shift (ED50)</th><th>Baseline</th><th>Emax</th><th>Several doses</th><th>Why</th></tr></thead><tbody>
<tr><td>Full agonist</td><td>Left</td><td>Up (until 100%)</td><td>No change</td><td>&mdash;</td><td>Both bind the same receptor and do the same thing, so the second drug is just more agonist.</td></tr>
<tr><td>Partial agonist</td><td>&mdash;</td><td>Ends at the partial agonist&rsquo;s own efficacy: up from a low baseline, down from a high one</td><td>100% only with the full agonist given alone; the pair stops at the partial&rsquo;s plateau</td><td>&mdash;</td><td>&ldquo;If it&rsquo;s 75%, everything finishes at 75%&rdquo;; it competes for the pocket, so from a high baseline it acts as an antagonist.</td></tr>
<tr><td>Inverse agonist</td><td>Right</td><td>Down to 0%, then no further change</td><td>No change</td><td>Symmetrical, no limit</td><td>Reversible, so the agonist still outcompetes it and reaches its Emax; nothing goes below zero, so further doses only shift right.</td></tr>
<tr><td>Competitive (reversible, surmountable) antagonist</td><td>Right: the ED50 rises, the agonist appears less potent</td><td>No change (neutral, no efficacy)</td><td>No change (reversible, outcompeted)</td><td>Symmetrical, toward infinity</td><td>Same pocket, law of mass action: tenfold more antagonist needs tenfold more agonist to outcompete it.</td></tr>
<tr><td>Irreversible (insurmountable, non-competitive) antagonist</td><td>Right</td><td>No change (neutral)</td><td>Down, all the way to 0; can abolish the curve</td><td>Symmetrical</td><td>Covalent bond: bound receptors leave the pool, a chemical down-regulation, so the Emax falls; spare receptors (more than the agonist needs) delay the drop, so first doses look competitive.</td></tr>
<tr><td>Allosteric agonist (positive allosteric modulator, PAM)</td><td>Left (affinity) and/or up (efficacy)</td><td>No change</td><td>Up only if the agonist was partial</td><td>Asymmetrical, saturable</td><td>Two drugs bound at once (agonist in its pocket, modulator at a second site); the shift stops once the second site is full; with a full agonist only the affinity effect shows, because it is already at 100%.</td></tr>
<tr><td>Allosteric antagonist (negative allosteric modulator, NAM)</td><td>Right (affinity) and/or down (efficacy)</td><td>No change</td><td>Down if efficacy is affected; never to 0</td><td>Asymmetrical, saturable</td><td>Binds a second site, so more agonist cannot outcompete it, yet it is reversible; left and down does not exist.</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf slides ~13&ndash;~22, ~25&ndash;~34, ~38&ndash;~41, ~45&ndash;~54; Pharmacodynamics-Day_3_2026s.pdf slides ~42&ndash;~49, ~54&ndash;~63; transcript 9/28, 9/29, 9/30. The Emax rule, for drugs that bind the receptor: only an irreversible antagonist or an allosteric antagonist on efficacy lowers the Emax; &ldquo;Those are the only two that can affect the Emax.&rdquo; (T 9/28) Off the receptor, a RAS blocker (section 7) and fewer receptors (section 6) also lower it.</p>
<div class="shiftgrid">
<!--FIG:shift-fafa--><!--FIG:shift-fapa--><!--FIG:shift-fapa-down--><!--FIG:shift-inverse--><!--FIG:shift-competitive--><!--FIG:shift-irreversible--><!--FIG:shift-allo-agonist--><!--FIG:shift-allo-antagonist-->
</div>
<table class="reftab"><thead><tr><th>Four characteristics of an allosteric drug (full agonist + several doses)</th><th>Yes / No</th><th>Why</th></tr></thead><tbody>
<tr><td>Affinity affected</td><td>Yes (shift left for an agonist, right for an antagonist)</td><td>Affinity is read left and right.</td></tr>
<tr><td>Efficacy affected</td><td>No with a full agonist; visible only with a partial agonist</td><td>A full agonist is already at 100%, so a rise cannot show.</td></tr>
<tr><td>Symmetrical shifts</td><td>No</td><td>Its binding does not depend on the agonist, so the steps are not tied to the agonist dose.</td></tr>
<tr><td>Saturability</td><td>Yes</td><td>The second site fills, so after a few shifts there is no further movement.</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf slides ~30&ndash;~34; transcript 9/28. &ldquo;For a purpose in this class, all allosterics are reversible.&rdquo; (T 9/28)</p>
<table class="reftab"><thead><tr><th>Kinds of antagonism</th><th>Definition</th><th>Example</th></tr></thead><tbody>
<tr><td>Chemical</td><td>Direct chemical interaction between the agonist and the antagonist; no receptor involved</td><td>Chelating agents, dimercaprol (gold, mercury, arsenic poisoning)</td></tr>
<tr><td>Physiological</td><td>Two agonists at different receptors in the same organ with opposing effects</td><td>Acetylcholine and epinephrine in the heart</td></tr>
<tr><td>Pharmacological: competitive (orthosteric)</td><td>Surmountable (more agonist overcomes it) or reversible; same receptor site as the agonist; most common in clinical practice</td><td>Metoprolol (poll)</td></tr>
<tr><td>Pharmacological: nonequilibrium-competitive (orthosteric)</td><td>Binds irreversibly (covalent); insurmountable; cannot be overcome by more agonist. Also called non-competitive: four names for one drug class</td><td>Phenoxybenzamine (poll)</td></tr>
<tr><td>Pharmacological: allosteric (allotropic)</td><td>Non-competitive; lowers the agonist&rsquo;s affinity and/or efficacy from another site (NAM, negative allosteric modulator); the agonist version is the PAM (positive allosteric modulator)</td><td>Diazepam (PAM, poll)</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf slides ~35&ndash;~37, ~55; PollEV&rsquo;s Exam 1.pdf page 6; transcript 9/23, 9/28, 9/30.</p>

<h3 id="ref-3">3. Affinity preference: R or R*</h3>
<p class="sub">What you are looking up: which receptor state, R or R*, each class binds more tightly, and why that sets the sign of its efficacy.</p>
<!--FIG:two-state-->
<ul>
<li>Receptors sit in equilibrium R (inactive) &#8652; R* (active); the cell moves them between the two by itself, and most sit inactive, to save energy (T 9/23; Day 3 slide ~31).</li>
<li>A drug that binds one state more tightly pulls the equilibrium toward that state and keeps it there (T 9/28). Positive efficacy moves R to R*; negative efficacy moves R* to R.</li>
<li>Background only: Clark (occupancy, affinity), Ari&euml;ns (intrinsic activity: full 100% (1), partial 1&ndash;99% (0.01&ndash;0.99), antagonist 0), Stephenson, Furchgott and Nickerson (efficacy, the two-state model); the names are not on the exam (T 9/22; Day 1 slide ~28).</li>
</ul>
<table class="reftab"><thead><tr><th>Class</th><th>Prefers</th><th>What binding does to R &#8652; R*</th><th>Efficacy</th><th>Alone at baseline 0% / 50% / 100%</th><th>Examples</th><th>Why</th></tr></thead><tbody>
<tr><td>Full agonist</td><td>R* (greater affinity for active receptors)</td><td>Pulls receptors to active; activates the inactive ones it binds</td><td>Positive, 100%</td><td>&rarr; 100 / &rarr; 100 / flat at 100</td><td>Norepinephrine, epinephrine, histamine, acetylcholine</td><td>&mdash;</td></tr>
<tr><td>Partial agonist</td><td>R* as well</td><td>Pulls receptors to active, but shifts less: its own efficacy, 1&ndash;99%</td><td>Positive, 1&ndash;99%</td><td>&rarr; its Emax / &rarr; its Emax / down to its Emax</td><td>Albuterol (&beta;2), pindolol (&beta;1, &beta;2), varenicline (Nn); on the slide also buprenorphine (&mu;-opioid), oxymetazoline (&alpha;1), pilocarpine (muscarinic), aripiprazole (D2)</td><td>&mdash;</td></tr>
<tr><td>Inverse agonist</td><td>R (highest affinity for inactive receptors)</td><td>Pulls receptors to inactive; shuts off active ones</td><td>Negative; the baseline goes to 0</td><td>flat at 0 / &rarr; 0 / &rarr; 0</td><td>Loratadine (the one to know)</td><td>&ldquo;It doesn&rsquo;t matter where you&rsquo;re starting, the end point is 0.&rdquo;</td></tr>
<tr><td>Neutral (competitive) antagonist</td><td>Equal affinity for R and R*</td><td>Leaves the equilibrium where it is; occupies the pocket so the agonist cannot bind</td><td>None (&epsilon;, efficacy, = 0): affinity but no pharmacological efficacy</td><td>flat at 0 / flat at 50 / flat at 100</td><td>Prazosin, metoprolol</td><td>&mdash;</td></tr>
<tr><td>Irreversible antagonist</td><td>&ldquo;Highest affinity&rdquo;: by bond strength, not by receptor state; the covalent bond is the strongest bond</td><td>Does not change the state; removes the receptors it binds from the pool</td><td>None</td><td>flat at 0 / flat at 50 / flat at 100 (it only lowers the receptor pool)</td><td>Phenoxybenzamine</td><td>&mdash;</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_2_2026s copy.pdf slides ~32&ndash;~38; Pharmacodynamics-Day_3_2026s.pdf slides ~31, ~37&ndash;~41, ~50&ndash;~53, ~59&ndash;~63; Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf slides ~4&ndash;~12, ~43&ndash;~44, ~51; Pharmacodynamics-Day-1-2026s.pdf slide ~28; transcript 9/22, 9/23, 9/28, 9/30.</p>
<ul>
<li>The petri dish: a cell line with 50% of its receptors active makes cAMP; an inverse agonist brings the cAMP to zero, because it shuts the active receptors off; a competitive antagonist leaves it at 50%, binding and staying bound with zero efficacy: &ldquo;You have a switch stuck.&rdquo; (T 9/23)</li>
<li>Constitutive activity (receptors active on their own, with no drug): such receptors are more sensitive to inverse agonists, because there is activity to shut off; antihistamines were classed as antagonists until a cell line with naturally active receptors showed them bringing activity down (T 9/23; Day 4 slide ~23).</li>
<li>At a baseline of 0 an inverse agonist and a neutral antagonist give the same flat line, because nothing is active to shut off: &ldquo;you can&rsquo;t differentiate between a competitive and an inverse because you&rsquo;re at 0&rdquo; (T 9/28).</li>
<li>Slide wording conflict: Day 2 slide ~35 gives the inverse agonist &ldquo;greater affinity for inactive receptors&rdquo; and slide ~36 &ldquo;highest affinity&rdquo;; slides ~37&ndash;~38 also give the irreversible antagonist &ldquo;highest affinity&rdquo;. The two &ldquo;highest&rdquo; measure different things: state preference versus bond strength.</li>
</ul>

<h3 id="ref-4">4. Affinity, bonds and Kd</h3>
<p class="sub">What you are looking up: what affinity is, which bond gives the most of it, how the dissociation constant (Kd) measures it, and how to compare two Kd values.</p>
<!--FIG:binding-kd--><!--FIG:bonds-->
<table class="reftab"><thead><tr><th>Bond</th><th>Description</th><th>Binding class</th><th>Examples</th><th>Why</th></tr></thead><tbody>
<tr><td>Covalent</td><td>Two atoms share a pair of electrons; irreversible at body temperature; long duration of action</td><td>Irreversible, insurmountable, non-competitive</td><td>Aspirin, omeprazole, phenoxybenzamine</td><td>The strongest bond, so the greatest affinity: the drug binds and does not come off.</td></tr>
<tr><td>Ionic</td><td>Electrostatic attraction between + and &minus; charged ions; most receptors have ionizable functional groups</td><td>Reversible, surmountable, competitive</td><td>&mdash;</td><td rowspan="3">Weaker bonds need a better fit, &ldquo;like a hand in a glove&rdquo;, to stay bound long enough to produce the effect.</td></tr>
<tr><td>Hydrogen</td><td>Electrostatic attraction between H and N, O, S; stable and reversible; selectivity and specificity</td><td>Reversible, surmountable, competitive</td><td>&mdash;</td></tr>
<tr><td>Van der Waals</td><td>Weak; two atoms brought close together; drug&ndash;receptor specificity; better fit means more bonds</td><td>Reversible, surmountable, competitive</td><td>&mdash;</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_2_2026s copy.pdf slides ~15&ndash;~16; transcript 9/23. &ldquo;I do not know of any agonist that is irreversible. They&rsquo;re all reversible.&rdquo; (T 9/24)</p>
<table class="reftab"><thead><tr><th>Quantity</th><th>Rule</th><th>Why</th></tr></thead><tbody>
<tr><td>Affinity</td><td>How likely a drug is to bind and stay bound; it depends on the bonds the drug forms (poll: True)</td><td>&mdash;</td></tr>
<tr><td>Affinity vs efficacy</td><td>Affinity: bind and stay bound. Efficacy: change the receptor&rsquo;s activity or state (positive or negative)</td><td>&mdash;</td></tr>
<tr><td>Kd (dissociation constant)</td><td>Kd = [R][A] / [AR] (free receptor &times; free drug / drug&ndash;receptor complex): the concentration that binds 50% of the receptors; read on the x-axis of a binding curve (Bmax, the top, is 100% bound)</td><td>Law of mass action, his 10-receptor example: 9 free receptors with 9 free drug and 1 bound gives [9][9]/[1] = 81 (low affinity); 1 free with 1 free drug and 9 bound gives [1][1]/[9] = 0.11 (high affinity).</td></tr>
<tr><td>Kd and affinity</td><td>Inversely proportional: the smaller the Kd, the greater the affinity, because less drug fills half the receptors</td><td>Poll distractor: &ldquo;The higher the Kd, the greater the affinity&rdquo; is the reverse.</td></tr>
<tr><td>Covalent bond and Kd</td><td>The irreversible drug has the highest affinity and the smallest Kd</td><td>The covalent bond is the strongest bond, so the drug does not come off.</td></tr>
<tr><td>Units</td><td>milli = 10<sup>&minus;3</sup>, micro = 10<sup>&minus;6</sup>, nano = 10<sup>&minus;9</sup>: nM &lt; &micro;M &lt; mM; 100 nM = 1 &times; 10<sup>&minus;7</sup> M</td><td>&mdash;</td></tr>
<tr><td>Kd vs EC50</td><td>Kd: the concentration with 50% of receptors bound (binding only). EC50: the concentration giving 50% of the maximal response (potency). Both on an x-axis</td><td>&mdash;</td></tr>
<tr><td>Mass action</td><td>More drug, or more receptors, means a greater chance of binding</td><td>&mdash;</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_2_2026s copy.pdf slides ~31, ~45&ndash;~50, ~55; Pharmacodynamics-Day_3_2026s.pdf slides ~3&ndash;~7; Pharmacodynamics-Day-1-2026s.pdf slides ~21, ~37&ndash;~38; transcript 9/22, 9/23, 9/24.</p>
<!--IMG:pollev-kd-table-->
<table class="reftab"><thead><tr><th>Question on the table</th><th>Answer</th><th>Why</th></tr></thead><tbody>
<tr><td>Which drug is more likely to interact with &beta;2 receptors in the lungs?</td><td>Drug B: 20 &micro;M against 1 mM for Drug A</td><td>The trap is the number alone: 20 looks bigger than 1 until the units are converted.</td></tr>
<tr><td>Which drug has the greater affinity at &beta;1 in the heart?</td><td>Drug B: 100 nM against 30 &micro;M; the smaller Kd is the greater affinity</td><td>&mdash;</td></tr>
<tr><td>Which drug has the greater affinity at M1 in the gut?</td><td>Equal: both 250 nM</td><td>The same Kd is the same affinity; the table separates the drugs at &beta;1 and &beta;2, not at M1.</td></tr>
<tr><td>Which receptor is Drug A most selective for?</td><td>M1: 250 nM is the smallest Kd in its column (&beta;1 30 &micro;M, &beta;2 1 mM)</td><td>Selectivity: read down the drug&rsquo;s column, convert the units, take the receptor with the smallest Kd.</td></tr>
<tr><td>Which receptor is Drug B most selective for?</td><td>&beta;1: 100 nM (&beta;2 20 &micro;M, M1 250 nM)</td><td>&mdash;</td></tr>
<tr><td>Four drugs at &beta;1: A 1 mM, B 20 &micro;M, C 100 nM, D 1000 M. Greatest affinity?</td><td>Drug C, 100 nM = 1 &times; 10<sup>&minus;7</sup> M; the same Drug C is the one most likely to be an irreversible antagonist</td><td>The irreversible drug is the one with the smallest Kd, because the covalent bond gives the highest affinity.</td></tr>
</tbody></table>
<p class="sub">PollEV_s.pdf pages 1&ndash;2; Pharmacodynamics-Day_2_2026s copy.pdf slide ~51; transcript 9/24: a very similar question with three more options is on the exam, and about 10% miss it every year.</p>

<h3 id="ref-5">5. Receptors and signalling</h3>
<!--FIG:superfamilies--><!--FIG:galpha-->
<p class="sub">What you are looking up: the four receptor classes, which G&alpha; subunit goes with which effector and second messenger, and the steps of the GPCR cascade.</p>
<table class="reftab"><thead><tr><th>Receptor class</th><th>Structure</th><th>Examples on the slide</th><th>Why</th></tr></thead><tbody>
<tr><td>Ion channels</td><td>Transmembrane proteins; signal by membrane potential and ionic composition</td><td>L-type Ca++ channels, GABA</td><td>Passive: always open. Voltage-gated: open at a membrane potential. Ligand-gated: usually closed, binding pocket in the channel. Pump: moves ions against the gradient.</td></tr>
<tr><td>7-transmembrane (7-TM; GPCR, G protein&ndash;coupled receptor)</td><td>Crosses the membrane 7 times; heterotrimeric G protein (three subunits: &alpha;, &beta;, &gamma;)</td><td>&alpha; and &beta; adrenergic, 5-HT (serotonin), histamine</td><td>&mdash;</td></tr>
<tr><td>1-transmembrane (1-TM)</td><td>Crosses the membrane once; binding pocket outside, enzymatic activity inside</td><td>Tyrosine kinases (insulin, growth factors); JAK/STAT; TGF-&beta; receptors</td><td>Receptor tyrosine kinase cascade Grb2 &rarr; GEF &rarr; RAS &rarr; RAF &rarr; MEK &rarr; ERK; 20&ndash;25% of cancers carry a RAS mutation, so kinases are cancer drug targets.</td></tr>
<tr><td>Intracellular receptors and transcriptional regulators</td><td>Cytosolic or nuclear; superfamily of 48</td><td>Steroid hormones; aldosterone at the mineralocorticoid receptor</td><td>Aldosterone makes more mRNA, so more pumps and channels: sodium saved, potassium wasted.</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day-1-2026s.pdf slides ~35&ndash;~49; Pharmacodynamics-Day_2_2026s copy.pdf slides ~4&ndash;~14; transcript 9/22, 9/23. What he wants: a voltage-gated channel versus a ligand-gated versus a passive, and a 7-transmembrane versus a 1-transmembrane receptor (T 9/23). Nicotinic (ligand-gated) sequence: acetylcholine binds 2 &alpha; subunits; Na+ in, K+ out; depolarization; voltage-sensitive Ca++ channels open; contraction; Na+/K+ ATPase restores the potential.</p>
<table class="reftab"><thead><tr><th>&alpha; subunit</th><th>Meaning</th><th>Effector</th><th>Second messenger</th><th>Examples in lecture</th></tr></thead><tbody>
<tr><td>G&alpha;s</td><td>Stimulation</td><td>Adenylate cyclase (AC)</td><td>&uarr; cAMP (cyclic AMP)</td><td>&beta;1 in the heart: norepinephrine &rarr; &uarr; heart rate</td></tr>
<tr><td>G&alpha;i</td><td>Inhibition</td><td>Adenylate cyclase (AC)</td><td>&darr; cAMP</td><td>M2 in the heart: &darr; heart rate; &alpha;2 in the CNS</td></tr>
<tr><td>G&alpha;q</td><td>&ldquo;something positive&rdquo;: raises intracellular calcium</td><td>Phospholipase C (PLC)</td><td>&uarr; IP3 (inositol trisphosphate), Ca++ from the endoplasmic reticulum</td><td>&alpha;1 in smooth muscle: vasoconstriction</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_2_2026s copy.pdf slides ~3, ~30; Pharmacodynamics-Day-1-2026s.pdf slides ~50&ndash;~55; transcript 9/23. Cross-talk: M2 (G&alpha;i) and &beta;1 (G&alpha;s) meet at the same adenylate cyclase in the heart, one lowering and one raising the rate (Day 2 slide ~30). &ldquo;G proteins are defined by the alpha subunit. It&rsquo;s alpha S, alpha I, alpha Q&rdquo; (T 9/30).</p>
<table class="reftab"><thead><tr><th>Part of the cascade</th><th>What it is</th><th>Examples</th><th>Why</th></tr></thead><tbody>
<tr><td>Signal</td><td>The hormone, neurotransmitter or drug</td><td>Norepinephrine, histamine</td><td rowspan="5">Exam trap: a select-all on second messengers takes cAMP and PKA together, never the receptor, the adenylate cyclase or the calcium channel.</td></tr>
<tr><td>Receptor</td><td>The protein the signal binds</td><td>&beta;1, &alpha;1, M2</td></tr>
<tr><td>Transducer</td><td>Translates the signal and carries it from the receptor to the effector</td><td>The G protein (&alpha;s, &alpha;i, &alpha;q)</td></tr>
<tr><td>Effector</td><td>Amplifies the signal</td><td>Adenylate cyclase, phospholipase C</td></tr>
<tr><td>Second messenger</td><td>The small molecule made or released inside the cell</td><td>cAMP, PKA (protein kinase A), PKC (protein kinase C), IP3, Ca++ (the ion, not the channel)</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_2_2026s copy.pdf slides ~26&ndash;~29; transcript 9/23, 9/30. For Exam 1 the two second messengers to know are cAMP and IP3 (T 9/30).</p>
<!--FIG:gpcr-steps-->
<table class="reftab"><thead><tr><th>Step</th><th>Forward (&beta;1, Gs)</th><th>Why</th></tr></thead><tbody>
<tr><td>1</td><td>Norepinephrine binds the receptor</td><td>&mdash;</td></tr>
<tr><td>2</td><td>The receptor changes conformation (shape) and activates the &alpha; subunit</td><td>&mdash;</td></tr>
<tr><td>3</td><td>GDP (guanosine diphosphate) comes off, GTP (guanosine triphosphate) comes on</td><td>GDP off, GTP on: &ldquo;more phosphate, more energy, that&rsquo;s what causes them to dissociate.&rdquo;</td></tr>
<tr><td>4</td><td>&alpha;s dissociates from &beta;/&gamma; and activates the effector (adenylate cyclase)</td><td>&mdash;</td></tr>
<tr><td>5</td><td>ATP &rarr; cAMP, the second messenger; cell signalling; physiological response (&uarr; heart rate)</td><td>Amplification: each step multiplies the signal.</td></tr>
<tr><td>Reverse</td><td>Phosphodiesterase (PDE) breaks down cAMP; GTPase removes the extra phosphate (GTP &rarr; GDP; RGS proteins speed it); &alpha; reassociates with &beta;/&gamma;; the receptor resets and the agonist comes off</td><td>cAMP is made by AC and broken down by PDE.</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day-1-2026s.pdf slides ~51&ndash;~55; transcript 9/23, 9/30. Poll trap: the option saying the GTP has to be released for dissociation is wrong; it is the GDP that leaves (Jeopardy 9/30).</p>

<h3 id="ref-6">6. Spare receptors and receptor regulation</h3>
<p class="sub">What you are looking up: what receptor number does to each drug class, and what the cell does to its receptors after too much or too little stimulation.</p>
<!--FIG:spare-->
<table class="reftab"><thead><tr><th>Situation</th><th>Agonist potency</th><th>Antagonist potency</th><th>Emax with an irreversible antagonist</th><th>Why</th></tr></thead><tbody>
<tr><td>Tissue with a lot of receptors (spare receptors: more than the agonist needs for its maximum; up-regulation)</td><td>Higher: more sensitive, shift left</td><td>Lower: less sensitive</td><td>Holds at first (looks competitive), drops later</td><td>Catecholamines bind 10% of the heart&rsquo;s &beta; receptors for the maximal rate; an irreversible dose blocking 75% leaves 25%, still above the 10% needed.</td></tr>
<tr><td>Tissue with fewer receptors (down-regulation)</td><td>Lower: less sensitive, shift right</td><td>Higher: more sensitive</td><td>Drops faster, because no spare receptors are left</td><td>With too few receptors the efficacy falls as well as the potency.</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf pages 1&ndash;3, 28; transcript 9/28, 9/29.</p>
<div class="shiftgrid">
<!--FIG:regulation--><!--FIG:reg-chain--><!--FIG:desens-rapid--><!--FIG:desens-long-->
</div>
<table class="reftab"><thead><tr><th>Process</th><th>Follows</th><th>Mechanism</th><th>Effect on the agonist&rsquo;s curve</th><th>Why</th></tr></thead><tbody>
<tr><td>Up-regulation</td><td>Chronic reduction of stimulation: an antagonist (or inverse agonist), denervation, thyroid hormone</td><td>More receptors made; more spare receptors; a compensatory mechanism</td><td>Full agonist more potent (left); partial agonist more potent and/or higher maximum</td><td>An antagonist up-regulates, an agonist down-regulates: the body does &ldquo;the opposite&rdquo;; stopping a &beta;-blocker unblocks the up-regulated receptors, so taper stepwise.</td></tr>
<tr><td>Down-regulation / desensitization</td><td>Chronic exposure to an agonist (too much stimulation)</td><td>Fewer receptors synthesized or available at the surface; analogous to an irreversible antagonist</td><td>Agonist less potent (right); maximum can fall; tolerance</td><td>Tolerance to opioid analgesics and &alpha;-agonist nasal decongestants; myasthenia gravis (antibody to the nicotinic receptor) is the disease version.</td></tr>
<tr><td>Rapid desensitization</td><td>Too much stimulation of a GPCR, within milliseconds</td><td>GRK (G protein&ndash;coupled receptor kinase) phosphorylates the agonist-bound receptor; &beta;-arrestin binds; cAMP stops; reversible when the agonist leaves</td><td>No change in receptor number</td><td>Rapid runs up to &beta;-arrestin binding and coming off; if it does not come off, the long process begins.</td></tr>
<tr><td>Long-term down-regulation</td><td>Continued over-stimulation</td><td>Endocytosis (taken into the cell) via coated pits, then recycling or lysosomal degradation; relocation inside the cell</td><td>Fewer receptors: shift right, maximum can fall</td><td>Poll trap: &ldquo;Short term regulation of receptors involves relocation of receptors into the cells&rdquo; is wrong; relocation is long-term.</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf pages 16&ndash;29; transcript 9/29. Poll key, all correct: increasing the number of receptors may increase the potency of a drug; &beta;-arrestin is involved in rapid receptor desensitization; endocytosis of receptors is part of the long-term receptor down-regulation; tolerance to a drug effect is a product of receptor down-regulation (PollEV 9/29).</p>

<h3 id="ref-7">7. Indirect antagonists</h3>
<p class="sub">What you are looking up: a drug that never touches the receptor; where it acts, upstream or downstream, and what it does to the agonist&rsquo;s curve.</p>
<table class="reftab"><thead><tr><th>Drug</th><th>Target</th><th>Upstream or downstream</th><th>Agonist&rsquo;s curve</th><th>Why</th></tr></thead><tbody>
<tr><td>Duloxetine (serotonin&ndash;norepinephrine reuptake inhibitor, SNRI), cocaine</td><td>Norepinephrine reuptake transporter</td><td>Upstream: more norepinephrine stays in the synapse</td><td>Left, same Emax</td><td>&mdash;</td></tr>
<tr><td>Fluoxetine (selective serotonin reuptake inhibitor, SSRI)</td><td>Serotonin reuptake transporter (SERT)</td><td>Upstream: more serotonin stays in the cleft</td><td>Left, same Emax; a partial agonist stays partial</td><td>The receptor still sees serotonin itself, so the class of the agonist cannot change: &ldquo;You didn&rsquo;t change the drug.&rdquo;</td></tr>
<tr><td>Physostigmine (any -stigmine)</td><td>Acetylcholinesterase (AChE, the enzyme that breaks down acetylcholine)</td><td>Upstream: acetylcholine is not broken down</td><td>Left, same Emax</td><td>&mdash;</td></tr>
<tr><td>Carbidopa</td><td>Enzyme in the gut that breaks down dopa</td><td>Upstream: more dopa reaches the brain</td><td>L-dopa left (potentiation: no effect alone)</td><td>&mdash;</td></tr>
<tr><td>Milrinone, caffeine</td><td>Phosphodiesterase (PDE), which breaks down cAMP</td><td>Downstream: cAMP builds up behind the same signal</td><td>Left; a partial agonist can reach the full response</td><td>The same receptor signal gives more cAMP.</td></tr>
<tr><td>Cancer drug X</td><td>RAS in the GEF &rarr; RAS &rarr; RAF &rarr; MEK &rarr; ERK cascade (the 1-transmembrane growth signal)</td><td>Downstream: the message is cut after the receptor</td><td>Right and Emax down</td><td>Less signal gets through at any agonist dose.</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf pages 4&ndash;13, 31; Pharmacodynamics-Day_2_2026s copy.pdf slides ~40&ndash;~41; transcript 9/23, 9/24, 9/29, 9/30. &ldquo;indirect antagonists can work downstream from the receptor, but also upstream&rdquo; (T 9/24). Poll trap: &ldquo;Indirect antagonists are allosteric drugs that bind at another site in the receptor&rdquo; is wrong: &ldquo;They bind upstream or downstream from the receptor and thus indirectly affect its signal&rdquo; (T 9/29).</p>
<div class="shiftgrid">
<!--FIG:ind-snri--><!--FIG:ind-ssri--><!--FIG:ind-ache--><!--FIG:ind-carbidopa--><!--FIG:ind-pde--><!--FIG:ind-ras-->
</div>
<table class="reftab"><thead><tr><th>Drug&ndash;drug interaction</th><th>Definition</th><th>Example</th></tr></thead><tbody>
<tr><td>Addition</td><td>Two drugs with the same effect; the result equals the sum</td><td>Trimethoprim and sulfamethoxazole</td></tr>
<tr><td>Synergism</td><td>Two drugs with the same effect; the result is greater than the sum</td><td>Penicillin and gentamicin</td></tr>
<tr><td>Potentiation</td><td>One drug has no effect alone but increases the effect of the other</td><td>Carbidopa and dopa</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf pages 30&ndash;31; transcript 9/29. The terms are taught; the drug names are &ldquo;just FYI&rdquo; (T 9/29).</p>

<h3 id="ref-8">8. Quantal responses, therapeutic index (TI) and safety index (SI)</h3>
<p class="sub">What you are looking up: how a population curve differs from a single-sample curve, and how the ED50, LD50, TI and SI are read and divided.</p>
<!--FIG:graded-quantal--><!--FIG:quantal-->
<table class="reftab"><thead><tr><th>Quantity</th><th>Definition</th><th>Numbers on the slides</th><th>Why</th></tr></thead><tbody>
<tr><td>Graded response</td><td>One biological unit (one sample or person); a continuous scale from no effect to maximum</td><td>Contraction with nicotine, paralysis by curare</td><td>&mdash;</td></tr>
<tr><td>Quantal response</td><td>A population; each member binary: any effect or none, alive or dead</td><td>Dogs and epinephrine 7.7&ndash;108 ng/kg/min; bars joined give a normal distribution; the cumulative form gives a sigmoid</td><td>On a quantal curve 50% means half the population responded, not half an effect.</td></tr>
<tr><td>ED50 (population)</td><td>Dose that protects or treats 50% of the population</td><td>Epinephrine in dogs about 29 ng/kg/min (spoken); acetaminophen about 325 mg (spoken); 10 mg (page 40); 100 &micro;g/kg (page 41 right); 0.1 (page 42)</td><td>The exam figure will not label the ED50; you find it yourself.</td></tr>
<tr><td>LD50</td><td>Dose that kills 50% of the population</td><td>160 mg (page 40); 400 &micro;g/kg (page 41 right); 100 (page 42)</td><td>&mdash;</td></tr>
<tr><td>Therapeutic index: TI = LD50 / ED50</td><td>Margin of safety; &ldquo;statement of how selective a drug is in producing a desired effect&rdquo;; the larger, the safer</td><td>Phenobarbital 40/4 = 10; alprazolam 2500; 160/10 = 16; codeine figure 40; hypnosis/death 400/100 = 4; sleep/death 100/0.1 = 1000</td><td>&mdash;</td></tr>
<tr><td>Safety index: SI = LD1 / ED99</td><td>Safety ratio: LD1 (dose killing 1%) over ED99 (dose treating 99%), the tails, not the midpoints; for a safe drug the ED99 is below the LD1; the larger, the safer</td><td>1/10 = 0.1 (page 42) with a TI of 1000 on the same figure</td><td>Read the tails: the dose that kills 1% is 1/10 of the dose that works in 99%. The slide: &ldquo;For every 100 patients, 99 will get a good night of sleep and one will die.&rdquo;</td></tr>
<tr><td>Same drug, two TIs</td><td>The TI is per effect measured</td><td>Codeine: cough (large TI) vs pain (small TI)</td><td>&ldquo;No drug produces a single effect.&rdquo;</td></tr>
<tr><td>Therapeutic window</td><td>Range of steady-state concentrations giving efficacy with minimal toxicity; a range, not a ratio</td><td>Acceptable risk depends on severity: headache vs Hodgkin&rsquo;s lymphoma</td><td>&mdash;</td></tr>
<tr><td>Acetaminophen</td><td>Regular 325 mg per tablet, Extra Strength 500 mg, every 4&ndash;6 hours</td><td>More than 4000 mg/day: liver toxicity</td><td>&mdash;</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf pages 32&ndash;43; transcript 9/29. Arithmetic checked: 40/4 = 10; 160/10 = 16; 400/100 = 4; 100/0.1 = 1000; 1/10 = 0.1. &ldquo;if you can divide, you&rsquo;ll be OK ... I&rsquo;m gonna use whole numbers with zero&rdquo; (T 9/29).</p>

<h3 id="ref-9">9. Drug basics: MOA, supplements, safety, selectivity</h3>
<!--FIG:selectivity-->
<p class="sub">What you are looking up: the Day 1 words: mechanism of action (MOA) vs site of action (SOA), supplements, safety vs efficacy, selectivity and dose, desired vs undesired effects.</p>
<table class="reftab"><thead><tr><th>Term</th><th>Rule</th><th>Why</th></tr></thead><tbody>
<tr><td>Must know vs should know</td><td>Must know = MOA. Should know = SOA (the organ). Would be nice to know: effect, ADR (adverse drug reaction), DDI (drug&ndash;drug interaction). Exam 1 tests MOA; Exam 2 tests MOA, SOA, ADR and DDI. Not tested: use, dose, route, brand names</td><td>Must know means the receptor and the selectivity: &beta;1-selective, &beta;1/&beta;2 non-selective, &alpha;1.</td></tr>
<tr><td>Metoprolol as the worked example</td><td>MOA: reversible &beta;1 antagonist. SOA: heart; kidneys and brain. ADR: bradycardia (slow heart rate), fatigue. DDI: verapamil, diltiazem, clonidine</td><td>&mdash;</td></tr>
<tr><td>Natural dietary supplements (NDS)</td><td>Regulated as food; may not claim to treat, cure, diagnose or prevent; not FDA-tested; natural does not mean safe or interaction-free; patients do not report taking them</td><td>Poll key &ldquo;All of the above&rdquo;: if two listed answers are certainly right, take all of the above.</td></tr>
<tr><td>Safety vs efficacy</td><td>If the safe drug does not work, choose the efficacious one; with equal efficacy, choose the safer</td><td>&mdash;</td></tr>
<tr><td>Selectivity and dose</td><td>Start with the smallest dose that gives the desired effect; the larger the dose, the less selective the drug, because it reaches other receptor types</td><td><ul style="margin:0;padding-left:16px"><li>Metoprolol is &beta;1-selective up to about 200 mg; above that it reaches &beta;2.</li><li>&ldquo;Start low and go slow.&rdquo;</li></ul></td></tr>
<tr><td>Selective vs non-selective</td><td>Loratadine: selective H1 inverse agonist. Diphenhydramine: H1, H2 and muscarinic receptors</td><td>&mdash;</td></tr>
<tr><td>Desired vs undesired effects</td><td>Most ligands produce several effects (several receptor types, different sensitivity); low dose desired, higher dose undesired; give the lowest effective dose; safety is the therapeutic index (TI)</td><td>&mdash;</td></tr>
<tr><td>Side effect that became the effect</td><td>Predictable when the pharmacology is known: ligand &rarr; receptor &rarr; cell function &rarr; clinical response; sildenafil and minoxidil</td><td>&mdash;</td></tr>
<tr><td>Therapeutic efficacy</td><td>Plateau height on the analgesic figure: morphine and meperidine tie high, ibuprofen plateaus lower; morphine is left of meperidine (more potent, same efficacy)</td><td>&mdash;</td></tr>
<tr><td>Classify by structure vs by MOA</td><td>Structure (benzothiadiazine ring) does not predict; MOA plus SOA does: thiazide, Na+/Cl&minus; symporter antagonist in the distal tubule: more urine, less sodium, lower pressure</td><td>&ldquo;Whatever sodium goes, water follows.&rdquo;</td></tr>
<tr><td>Drug</td><td>Alters an ongoing physiological or pathological function; initiates, inhibits or modulates</td><td>&mdash;</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day-1-2026s.pdf slides ~7&ndash;~9, ~15&ndash;~20, ~25&ndash;~26, ~29&ndash;~33; Pharmacodynamics-Day_4_&amp;_5_2026s_Part 3.pdf pages 1&ndash;2; Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf page 44; transcript 9/22, 9/29, 9/30.</p>
`;
