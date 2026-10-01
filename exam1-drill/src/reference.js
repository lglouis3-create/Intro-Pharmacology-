const REFERENCE_HTML = `
<h2>Reference</h2>
<p class="sub">Slide numbers marked ~ were counted from the deck text and may be off by one or two. (T) marks a transcript date.</p>

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

<h3>1. Reading a curve: axes, potency, efficacy, affinity, ED50, Emax, baseline</h3>
<p class="sub">What you are looking up: which axis carries affinity, efficacy and potency, and what the threshold, ED50, Emax and baseline each mean.</p>
<!--FIG:potency-->
<!--FIG:efficacy-->
<table class="reftab"><thead><tr><th>Term</th><th>Where on the curve</th><th>Rule</th><th>Why</th></tr></thead><tbody>
<tr><td>x-axis</td><td>Dose or concentration, log scale (the independent variable)</td><td>Affinity is read left and right: the curve further left needs less drug</td><td>&ldquo;Affinity is gonna be on the bottom, efficacy is gonna be on the Y axis, and potency is gonna be a combination of the two.&rdquo;</td></tr>
<tr><td>y-axis</td><td>Response as a percent of the maximum (the dependent variable)</td><td>Efficacy is read up and down: the plateau height</td><td>Normalized because starting points differ: a resting heart rate of 60 and one of 70 can then be compared.</td></tr>
<tr><td>Threshold</td><td>The dose below which there is no response</td><td>Not the ED50; the ED50 lies between the threshold and the Emax</td><td>&mdash;</td></tr>
<tr><td>Slope</td><td>The linear mid-section</td><td>The greatest change in effect for the smallest change in dose</td><td>Steep or shallow preferred? His trick question; the answer is &ldquo;it depends&rdquo;.</td></tr>
<tr><td>Emax (maximal response, the ceiling)</td><td>The plateau</td><td>Two reasons a curve stops rising</td><td>Either all the receptors are occupied or the physiological system is maxed out.</td></tr>
<tr><td>EC50 / ED50</td><td>The x-axis value at 50% of that drug&rsquo;s own maximum</td><td>The measure of potency: the smaller the ED50, the more potent; EC50 is a concentration (in vitro), ED50 a dose (in vivo)</td><td>In vivo, absorption, distribution, metabolism and excretion (ADME) change the apparent potency, so one drug&rsquo;s ED50 and EC50 can differ.</td></tr>
<tr><td>Relative potency</td><td>ED50 of B divided by ED50 of A</td><td>His example is 1000&times;</td><td>&mdash;</td></tr>
<tr><td>Potency</td><td>Left&ndash;right position of the whole curve</td><td>Depends on affinity, efficacy and the tissue (number of receptors)</td><td>&mdash;</td></tr>
<tr><td>Same Emax, different position</td><td>Two curves, same plateau</td><td>The curve on the left is the more potent because it has the greater affinity</td><td>&mdash;</td></tr>
<tr><td>Same ED50, different Emax</td><td>Two curves, same midpoint dose</td><td>With tissue and affinity equal, the drug with the greater efficacy is the more potent (his rule)</td><td>&mdash;</td></tr>
<tr><td>Most potent vs most efficacious</td><td>Furthest left vs highest plateau</td><td>A partial agonist can be the most potent drug on the figure; the full agonist is the most efficacious; which one is wanted depends on the job</td><td>&mdash;</td></tr>
<tr><td>More receptors, same drug</td><td>Curve moves left</td><td>The drug appears more potent; its Kd, affinity and efficacy did not change, the tissue did</td><td>Law of mass action: more receptors means a greater chance that any molecule of drug binds one.</td></tr>
<tr><td>Baseline (point of reference)</td><td>Where the agonist&rsquo;s own curve starts</td><td>A reflection of receptor activity before any drug: most receptors inactive (R &gt; R*) means 0%; half active (R = R*) means 50%</td><td>Unless the figure shows otherwise, assume 99% of the receptors inactive and the baseline at 0.</td></tr>
<tr><td>Pharmacological vs apparent potency</td><td>&mdash;</td><td>Pharmacological: tissue sensitivity, receptor number, receptor activity, affinity, efficacy. Apparent adds pharmacokinetics: age, absorption, distribution, elimination, drug&ndash;drug interactions (DDI)</td><td>&mdash;</td></tr>
<tr><td>Figures that look the same</td><td>&mdash;</td><td>No microscope on the exam</td><td>&ldquo;If they look the same, they are the same.&rdquo;</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_3_2026s.pdf slides ~3, ~7&ndash;~8, ~14, ~16&ndash;~23, ~27; Pharmacodynamics-Day_2_2026s copy.pdf slides ~52&ndash;~58; Pharmacodynamics-Day-1-2026s.pdf slide ~27; transcript 9/22, 9/24, 9/28.</p>

<h3>The three questions for any curve figure</h3>
<p class="sub">What you are looking up: a figure shows the agonist alone and with drug X; which classes each answer rules in and out.</p>
<table class="reftab"><thead><tr><th>Question</th><th>Answer</th><th>Rules in</th><th>Rules out</th></tr></thead><tbody>
<tr><td>0. Where is the point of reference?</td><td>The drug alone (dotted or dashed)</td><td>Every other curve is read against it</td><td>&mdash;</td></tr>
<tr><td>1. Is it shifting? Left (helping) or right (making life more difficult)?</td><td>Left</td><td>Full agonist, allosteric agonist, indirect antagonist that raises the signal (a phosphodiesterase, PDE, inhibitor), more receptors</td><td>Competitive antagonist, inverse agonist, irreversible antagonist, allosteric antagonist</td></tr>
<tr><td></td><td>Right</td><td>Competitive antagonist, inverse agonist, irreversible antagonist, allosteric antagonist</td><td>Full agonist, partial agonist, allosteric agonist (any kind)</td></tr>
<tr><td>2. Is the baseline changing?</td><td>Down to 0</td><td>Inverse agonist</td><td>Everything neutral (competitive, irreversible, allosteric antagonist)</td></tr>
<tr><td></td><td>Up</td><td>A second agonist (full or partial)</td><td>Antagonists of every kind</td></tr>
<tr><td></td><td>No change, baseline already at 0</td><td>Cannot tell competitive from inverse</td><td>Nothing</td></tr>
<tr><td>3. Is the Emax changing?</td><td>Down</td><td>Irreversible antagonist; allosteric antagonist on efficacy</td><td>Competitive antagonist, inverse agonist (both competitive: never affect the Emax)</td></tr>
<tr><td></td><td>Up (partial becomes full)</td><td>Allosteric agonist on efficacy, PDE inhibitor, more receptors</td><td>Anything that affects affinity only</td></tr>
<tr><td></td><td>No change</td><td>Competitive antagonist, inverse agonist, allosteric on affinity only (and, with few shifts, irreversible with spare receptors)</td><td>Irreversible antagonist once several shifts show no drop; anything on efficacy</td></tr>
<tr><td>4. Are the shifts symmetrical? (only with several shifts)</td><td>Equal steps, no limit</td><td>Competitive (orthosteric) antagonist, inverse agonist</td><td>Allosteric</td></tr>
<tr><td></td><td>Unequal, saturating</td><td>Allosteric (then: agonist or antagonist; affinity, efficacy or both)</td><td>Competitive antagonist, inverse agonist</td></tr>
</tbody></table>
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

<h3>2. The drug classes and what each does to the agonist&rsquo;s curve</h3>
<p class="sub">What you are looking up: a second drug is added to a full agonist; where the curve, the baseline and the Emax go, and whether repeated doses give equal steps.</p>
<table class="reftab"><thead><tr><th>Second drug</th><th>Shift (ED50)</th><th>Baseline</th><th>Emax</th><th>Several doses</th><th>Why</th></tr></thead><tbody>
<tr><td>Full agonist</td><td>Left</td><td>Up (until 100%)</td><td>No change</td><td>&mdash;</td><td>Both bind the same receptor and do the same thing, so the second drug is just more agonist.</td></tr>
<tr><td>Partial agonist</td><td>&mdash;</td><td>Ends at the partial agonist&rsquo;s own efficacy: up from a low baseline, down from a high one</td><td>Reached only by the full agonist alone</td><td>&mdash;</td><td><ul style="margin:0;padding-left:16px"><li>&ldquo;If it&rsquo;s 75%, everything finishes at 75%.&rdquo;</li><li>Dual nature: it competes with the full agonist for the pocket, so from a high baseline it acts as an antagonist.</li></ul></td></tr>
<tr><td>Inverse agonist</td><td>Right</td><td>Down to 0%, then no further change</td><td>No change</td><td>Symmetrical, no limit</td><td><ul style="margin:0;padding-left:16px"><li>Reversible, so the agonist still outcompetes it and reaches its Emax.</li><li>Nothing goes lower than zero, so once the baseline is at 0 each further dose only shifts right.</li></ul></td></tr>
<tr><td>Competitive (reversible, surmountable) antagonist</td><td>Right: the ED50 rises, the agonist appears less potent</td><td>No change (neutral, no efficacy)</td><td>No change (reversible, outcompeted)</td><td>Symmetrical, toward infinity</td><td>Same pocket, law of mass action: &ldquo;if I increase the dose by tenfold, I have to increase the dose of the other by tenfold to outcompete them.&rdquo;</td></tr>
<tr><td>Irreversible (insurmountable, non-competitive) antagonist</td><td>Right</td><td>No change (neutral)</td><td>Down, all the way to 0; can abolish the curve</td><td>Symmetrical</td><td><ul style="margin:0;padding-left:16px"><li>Covalent bond: the receptors it binds leave the pool, a chemical down-regulation, so the Emax falls.</li><li>Spare receptors delay the drop: the first doses look competitive.</li></ul></td></tr>
<tr><td>Allosteric agonist (positive allosteric modulator, PAM)</td><td>Left (affinity) and/or up (efficacy)</td><td>&mdash;</td><td>Up only if the agonist was partial</td><td>Asymmetrical, saturable</td><td><ul style="margin:0;padding-left:16px"><li>Two drugs bound at once; the shift stops once the second site is full.</li><li>With a full agonist only the affinity effect shows; an efficacy effect is hidden at 100%.</li></ul></td></tr>
<tr><td>Allosteric antagonist (negative allosteric modulator, NAM)</td><td>Right (affinity) and/or down (efficacy)</td><td>&mdash;</td><td>Down if efficacy is affected; never to 0</td><td>Asymmetrical, saturable</td><td><ul style="margin:0;padding-left:16px"><li>Binds a second site, so more agonist cannot outcompete it, yet it is reversible.</li><li>Left and down does not exist: &ldquo;There&rsquo;s no drug in the world that does that.&rdquo;</li></ul></td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf slides ~13&ndash;~22, ~25&ndash;~34, ~38&ndash;~41, ~45&ndash;~54; Pharmacodynamics-Day_3_2026s.pdf slides ~42&ndash;~49, ~54&ndash;~63; transcript 9/28, 9/29, 9/30. The Emax rule: &ldquo;If you see something that it lowers the Emax, you know that has to be either an irreversible antagonist or an allosteric antagonist that affects efficacy, right? Those are the only two that can affect the Emax. Everybody else is competitive. Everybody else is reversible, no change to the Emax.&rdquo; (T 9/28)</p>
<div class="shiftgrid">
<!--FIG:shift-fafa--><!--FIG:shift-fapa--><!--FIG:shift-inverse--><!--FIG:shift-competitive--><!--FIG:shift-irreversible--><!--FIG:shift-allo-agonist--><!--FIG:shift-allo-antagonist-->
</div>
<table class="reftab"><thead><tr><th>Four characteristics of an allosteric drug (full agonist + several doses)</th><th>Yes / No</th><th>Why</th></tr></thead><tbody>
<tr><td>Affinity affected</td><td>Yes (shift left for an agonist, right for an antagonist)</td><td>&mdash;</td></tr>
<tr><td>Efficacy affected</td><td>No with a full agonist (already at 100%); visible only with a partial agonist</td><td>&mdash;</td></tr>
<tr><td>Symmetrical shifts</td><td>No</td><td>Its binding does not depend on the agonist, so the steps are not tied to the agonist dose.</td></tr>
<tr><td>Saturability</td><td>Yes</td><td>The second site fills, so after a few shifts there is no further movement.</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf slides ~30&ndash;~34; transcript 9/28. &ldquo;For a purpose in this class, all allosterics are reversible.&rdquo; (T 9/28)</p>
<table class="reftab"><thead><tr><th>Kinds of antagonism</th><th>Definition</th><th>Example</th></tr></thead><tbody>
<tr><td>Chemical</td><td>Direct chemical interaction between the agonist and the antagonist; no receptor involved</td><td>Chelating agents, dimercaprol (gold, mercury, arsenic poisoning)</td></tr>
<tr><td>Physiological</td><td>Two agonists at different receptors in the same organ with opposing effects</td><td>Acetylcholine and epinephrine in the heart</td></tr>
<tr><td>Pharmacological: competitive (orthosteric)</td><td>Surmountable or reversible; same receptor site; most common in clinical practice</td><td>Metoprolol (poll)</td></tr>
<tr><td>Pharmacological: nonequilibrium-competitive (orthosteric)</td><td>Binds irreversibly; insurmountable; cannot be overcome by more agonist</td><td>Phenoxybenzamine (poll)</td></tr>
<tr><td>Pharmacological: allosteric (allotropic)</td><td>Non-competitive; lowers the agonist&rsquo;s affinity and/or efficacy from another site (NAM); the agonist version is the PAM</td><td>Diazepam (PAM, poll)</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf slides ~35&ndash;~37, ~55; PollEV&rsquo;s Exam 1.pdf page 6; transcript 9/23, 9/28, 9/30.</p>

<h3>3. Affinity preference: which receptor state each class prefers, and why</h3>
<p class="sub">What you are looking up: which receptor state, R or R*, each class binds more tightly, and why that sets the sign of its efficacy.</p>
<!--FIG:two-state-->
<ul>
<li>Receptors sit in equilibrium R &#8652; R*; the cell moves them between the two by itself, and most sit inactive: &ldquo;the majority of our receptors are going to be found typically in the inactive conformation because we want to save energy&rdquo; (T 9/23; Day 3 slide ~31).</li>
<li>A drug that binds one state more tightly pulls the equilibrium toward that state: drugs &ldquo;stabilize them in one conformation and keep them at it, or perhaps if the receptor is inactive, we&rsquo;re gonna make them active&rdquo; (T 9/28). Positive efficacy moves R to R*; negative efficacy moves R* to R.</li>
<li>Background only: Clark (occupancy, affinity), Ari&euml;ns (intrinsic activity: full 1, partial 1&ndash;99%, antagonist 0), Stephenson, Furchgott and Nickerson (efficacy, the two-state model). &ldquo;I don&rsquo;t expect you to know or answer to me on the exam who Clark was&rdquo; (T 9/22; Day 1 slide ~28).</li>
</ul>
<table class="reftab"><thead><tr><th>Class</th><th>Prefers</th><th>What binding does to R &#8652; R*</th><th>Efficacy</th><th>Alone at baseline 0% / 50% / 100%</th><th>Examples</th><th>Why</th></tr></thead><tbody>
<tr><td>Full agonist</td><td>R* (greater affinity for active receptors)</td><td>Pulls receptors to active; activates the inactive ones it binds</td><td>Positive, 100%</td><td>&rarr; 100 / &rarr; 100 / flat at 100</td><td>Norepinephrine, epinephrine, histamine, acetylcholine</td><td>&mdash;</td></tr>
<tr><td>Partial agonist</td><td>R* as well</td><td>Pulls receptors to active, but shifts less: its own efficacy, 1&ndash;99%</td><td>Positive, 1&ndash;99%</td><td>&rarr; its Emax / &rarr; its Emax / down to its Emax</td><td>Albuterol (&beta;2), pindolol (&beta;1, &beta;2), varenicline (Nn); on the slide also buprenorphine (&mu;-opioid), oxymetazoline (&alpha;1), pilocarpine (muscarinic), aripiprazole (D2)</td><td>&mdash;</td></tr>
<tr><td>Inverse agonist</td><td>R (highest affinity for inactive receptors)</td><td>Pulls receptors to inactive; shuts off active ones</td><td>Negative; the baseline goes to 0</td><td>flat at 0 / &rarr; 0 / &rarr; 0</td><td>Loratadine (the one to know)</td><td>&ldquo;It doesn&rsquo;t matter where you&rsquo;re starting, the end point is 0.&rdquo;</td></tr>
<tr><td>Neutral (competitive) antagonist</td><td>Equal affinity for R and R*</td><td>Leaves the equilibrium where it is; occupies the pocket so the agonist cannot bind</td><td>None (&epsilon; = 0): affinity but no pharmacological efficacy</td><td>flat at 0 / flat at 50 / flat at 100</td><td>Prazosin, metoprolol</td><td>&mdash;</td></tr>
<tr><td>Irreversible antagonist</td><td>&ldquo;Highest affinity&rdquo;: by bond strength, not by receptor state; the covalent bond is the strongest bond</td><td>Does not change the state; removes the receptors it binds from the pool</td><td>None</td><td>flat (lowers the receptor pool)</td><td>Phenoxybenzamine</td><td>&mdash;</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_2_2026s copy.pdf slides ~32&ndash;~38; Pharmacodynamics-Day_3_2026s.pdf slides ~31, ~37&ndash;~41, ~50&ndash;~53, ~59&ndash;~63; Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf slides ~4&ndash;~12, ~43&ndash;~44, ~51; Pharmacodynamics-Day-1-2026s.pdf slide ~28; transcript 9/22, 9/23, 9/28, 9/30.</p>
<ul>
<li>The petri dish: &ldquo;I have a cell line that 50% of the cells are naturally active and 50% have naturally inactive ... once this is receptors are active, they&rsquo;re producing cAMP ... So if I give an inverse agonist, I&rsquo;m going to bring the production of cAMP to zero. Because it&rsquo;s going to shut it off. But if I give you a competitive antagonist, say it&rsquo;s at 50%, because it&rsquo;s not changing the activity of the receptors, it&rsquo;s just binding and staying bound, so they have affinity but zero efficacy. They&rsquo;re neutral. You have a switch stuck.&rdquo; (T 9/23)</li>
<li>Constitutive activity: receptors that are active on their own are more sensitive to inverse agonists; &ldquo;for many, many years, we classify antihistamines as antagonists until we are able to develop a cell line that the receptors are naturally active, and then we can see actually they bring things down&rdquo; (T 9/23; Day 4 slide ~23).</li>
<li>At a baseline of 0 an inverse agonist and a neutral antagonist give the same flat line: &ldquo;you can&rsquo;t differentiate between a competitive and an inverse because you&rsquo;re at 0&rdquo; (T 9/28).</li>
<li>Slide wording conflict: Day 2 slide ~35 gives the inverse agonist &ldquo;greater affinity for inactive receptors&rdquo; and slide ~36 &ldquo;highest affinity&rdquo;; slides ~37&ndash;~38 also give the irreversible antagonist &ldquo;highest affinity&rdquo;. The two &ldquo;highest&rdquo; measure different things: state preference versus bond strength.</li>
</ul>

<h3>4. Affinity, bonds and Kd</h3>
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
<tr><td>Kd (dissociation constant)</td><td>Kd = [R][A] / [AR]: the concentration that binds 50% of the receptors; read on the x-axis of a binding curve (Bmax is 100% bound)</td><td>Law of mass action, his 10-receptor example: 9 free and 9 bound gives [9][9]/[1] = 81; 1 free gives [1][1]/[9] = 0.11.</td></tr>
<tr><td>Kd and affinity</td><td>Inversely proportional: the smaller the Kd, the greater the affinity</td><td>Poll distractor: &ldquo;The higher the Kd, the greater the affinity&rdquo; is the reverse.</td></tr>
<tr><td>Covalent bond and Kd</td><td>The irreversible drug has the highest affinity and the smallest Kd</td><td>&mdash;</td></tr>
<tr><td>Units</td><td>milli = 10<sup>&minus;3</sup>, micro = 10<sup>&minus;6</sup>, nano = 10<sup>&minus;9</sup>: nM &lt; &micro;M &lt; mM; 100 nM = 1 &times; 10<sup>&minus;7</sup> M</td><td>&mdash;</td></tr>
<tr><td>Kd vs EC50</td><td>Kd: 50% of receptors bound (binding only). EC50: 50% of the response (potency). Both on an x-axis</td><td>&mdash;</td></tr>
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
<p class="sub">PollEV_s.pdf pages 1&ndash;2; Pharmacodynamics-Day_2_2026s copy.pdf slide ~51; transcript 9/24: &ldquo;I&rsquo;m gonna give you a very similar question on your exam with uh 3 more options than those two, and about 10% of you are gonna miss it. It happens every year.&rdquo;</p>

<h3>5. Receptors and signalling</h3>
<!--FIG:superfamilies-->
<p class="sub">What you are looking up: the four receptor classes, which G&alpha; subunit goes with which effector and second messenger, and the steps of the GPCR cascade.</p>
<table class="reftab"><thead><tr><th>Receptor class</th><th>Structure</th><th>Examples on the slide</th><th>Why</th></tr></thead><tbody>
<tr><td>Ion channels</td><td>Transmembrane proteins; signal by membrane potential and ionic composition</td><td>L-type Ca++ channels, GABA</td><td><ul style="margin:0;padding-left:16px"><li>Passive: always open. Voltage-gated: open at a membrane potential. Ligand-gated: usually closed, binding pocket in the channel. Pump: moves ions against the gradient.</li><li>Nicotinic sequence: acetylcholine binds 2 &alpha; subunits; Na+ in, K+ out; depolarization; voltage-sensitive Ca++ channels open; Ca++ up, contraction; Na+/K+ ATPase restores the potential.</li></ul></td></tr>
<tr><td>7-transmembrane (GPCR)</td><td>Crosses the membrane 7 times; heterotrimeric G protein (&alpha;, &beta;, &gamma;)</td><td>&alpha; and &beta; adrenergic, 5HT (serotonin), histamine</td><td>&mdash;</td></tr>
<tr><td>1-transmembrane</td><td>Binding pocket outside, enzymatic activity inside</td><td>Tyrosine kinases (insulin, growth factors); JAK/STAT; TGF-&beta; receptors</td><td>Receptor tyrosine kinase cascade Grb2 &rarr; GEF &rarr; RAS &rarr; RAF &rarr; MEK &rarr; ERK; 20&ndash;25% of cancers carry a RAS mutation, which makes kinases a drug target in cancer.</td></tr>
<tr><td>Intracellular receptors and transcriptional regulators</td><td>Cytosolic or nuclear; superfamily of 48</td><td>Steroid hormones; aldosterone at the mineralocorticoid receptor</td><td>Aldosterone makes more mRNA, so more pumps and channels: sodium saved, potassium wasted.</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day-1-2026s.pdf slides ~35&ndash;~49; Pharmacodynamics-Day_2_2026s copy.pdf slides ~4&ndash;~14; transcript 9/22, 9/23. &ldquo;tell me what a voltage-gated channel is versus a ligand versus a passive, versus a 7 transmembrane or 1 transmembrane&rdquo; (T 9/23).</p>
<table class="reftab"><thead><tr><th>&alpha; subunit</th><th>Meaning</th><th>Effector</th><th>Second messenger</th><th>Examples in lecture</th></tr></thead><tbody>
<tr><td>G&alpha;s</td><td>Stimulation</td><td>Adenylate cyclase (AC)</td><td>&uarr; cAMP (cyclic AMP)</td><td>&beta;1 in the heart: norepinephrine &rarr; &uarr; heart rate</td></tr>
<tr><td>G&alpha;i</td><td>Inhibition</td><td>Adenylate cyclase (AC)</td><td>&darr; cAMP</td><td>M2 in the heart: &darr; heart rate; &alpha;2 in the CNS</td></tr>
<tr><td>G&alpha;q</td><td>&ldquo;something positive&rdquo; (calcium)</td><td>Phospholipase C (PLC)</td><td>&uarr; IP3 (inositol trisphosphate), Ca++ from the endoplasmic reticulum</td><td>&alpha;1 in smooth muscle: vasoconstriction</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_2_2026s copy.pdf slides ~3, ~30; Pharmacodynamics-Day-1-2026s.pdf slides ~50&ndash;~55; transcript 9/23. Cross-talk: M2 (G&alpha;i) and &beta;1 (G&alpha;s) meet at the same adenylate cyclase in the heart, one lowering and one raising the rate (Day 2 slide ~30). &ldquo;G proteins are defined by the alpha subunit. It&rsquo;s alpha S, alpha I, alpha Q&rdquo; (T 9/30).</p>
<table class="reftab"><thead><tr><th>Part of the cascade</th><th>What it is</th><th>Examples</th><th>Why</th></tr></thead><tbody>
<tr><td>Signal</td><td>The hormone, neurotransmitter or drug</td><td>Norepinephrine, histamine</td><td rowspan="5">Exam trap: a select-all on second messengers takes cAMP and PKA together, never the receptor, the adenylate cyclase or the calcium channel.</td></tr>
<tr><td>Receptor</td><td>The protein the signal binds</td><td>&beta;1, &alpha;1, M2</td></tr>
<tr><td>Transducer</td><td>Translates the signal</td><td>The G protein (&alpha;s, &alpha;i, &alpha;q)</td></tr>
<tr><td>Effector</td><td>Amplifies the signal</td><td>Adenylate cyclase, phospholipase C</td></tr>
<tr><td>Second messenger</td><td>The small molecule made or released inside the cell</td><td>cAMP, PKA, PKC, IP3, Ca++ (the ion, not the channel)</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_2_2026s copy.pdf slides ~26&ndash;~29; transcript 9/23, 9/30. &ldquo;For purpose on exam one, you need to know cyclic AMP and IP3. Those are two major second messengers.&rdquo; (T 9/30)</p>
<!--FIG:gpcr-steps-->
<table class="reftab"><thead><tr><th>Step</th><th>Forward (&beta;1, Gs)</th><th>Why</th></tr></thead><tbody>
<tr><td>1</td><td>Norepinephrine binds the receptor</td><td>&mdash;</td></tr>
<tr><td>2</td><td>The receptor changes conformation and activates the &alpha; subunit</td><td>&mdash;</td></tr>
<tr><td>3</td><td>GDP (guanosine diphosphate) comes off, GTP (guanosine triphosphate) comes on</td><td>&ldquo;The diphosphate comes off, the triphosphate comes in, so you have more phosphate, more energy, that&rsquo;s what causes them to dissociate.&rdquo;</td></tr>
<tr><td>4</td><td>&alpha;s dissociates from &beta;/&gamma; and activates the effector (adenylate cyclase)</td><td>&mdash;</td></tr>
<tr><td>5</td><td>ATP &rarr; cAMP, the second messenger; cell signalling; physiological response (&uarr; heart rate)</td><td>Amplification: each step multiplies the signal.</td></tr>
<tr><td>Reverse</td><td>GTPase removes the extra phosphate (GTP &rarr; GDP; RGS speeds it); &alpha; reassociates with &beta;/&gamma;; the receptor resets; phosphodiesterase (PDE) breaks down cAMP</td><td>&ldquo;We&rsquo;re either gonna make it through the AC or we&rsquo;re gonna break it down through the PDE.&rdquo;</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day-1-2026s.pdf slides ~51&ndash;~55; transcript 9/23, 9/30. Poll trap: &ldquo;In order for G-proteins to dissociate from the receptor, the GTP has to be released&rdquo; is wrong; it is the GDP that leaves (Jeopardy 9/30).</p>

<h3>6. Spare receptors and receptor regulation</h3>
<p class="sub">What you are looking up: what receptor number does to each drug class, and what the cell does to its receptors after too much or too little stimulation.</p>
<!--FIG:spare-->
<table class="reftab"><thead><tr><th>Situation</th><th>Agonist potency</th><th>Antagonist potency</th><th>Emax with an irreversible antagonist</th><th>Why</th></tr></thead><tbody>
<tr><td>Tissue with a lot of receptors (spare receptors, up-regulation)</td><td>Higher: more sensitive, shift left</td><td>Lower: less sensitive</td><td>Holds at first (looks competitive), drops later</td><td><ul style="margin:0;padding-left:16px"><li>100% effect comes from less than 100% receptor binding: catecholamines bind 10% of the &beta; receptors in the heart for the maximal heart rate.</li><li>An irreversible dose that blocks 75% leaves 25%, still more than the 10% needed, so the maximum holds.</li></ul></td></tr>
<tr><td>Tissue with fewer receptors (down-regulation)</td><td>Lower: less sensitive, shift right</td><td>Higher: more sensitive</td><td>Drops faster</td><td>With too few receptors the efficacy falls as well as the potency.</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf pages 1&ndash;3, 28; transcript 9/28, 9/29.</p>
<div class="shiftgrid">
<!--FIG:regulation--><!--FIG:reg-chain--><!--FIG:desens-rapid--><!--FIG:desens-long-->
</div>
<table class="reftab"><thead><tr><th>Process</th><th>Follows</th><th>Mechanism</th><th>Effect on the agonist&rsquo;s curve</th><th>Why</th></tr></thead><tbody>
<tr><td>Up-regulation</td><td>Chronic reduction of stimulation: an antagonist (or inverse agonist), denervation, thyroid hormone</td><td>More receptors made; more spare receptors; a compensatory mechanism</td><td>Full agonist more potent (left); partial agonist more potent and/or higher maximum</td><td><ul style="margin:0;padding-left:16px"><li>&ldquo;An antagonist will up regulate, an agonist is going to down regulate because our body is going to do the opposite.&rdquo;</li><li>Stopping a &beta;-blocker: the up-regulated receptors are unblocked, so taper stepwise.</li></ul></td></tr>
<tr><td>Down-regulation / desensitization</td><td>Chronic exposure to an agonist (too much stimulation)</td><td>Fewer receptors synthesized or available at the surface; analogous to an irreversible antagonist</td><td>Agonist less potent (right); maximum can fall; tolerance</td><td>Tolerance to opioid analgesics and &alpha;-agonist nasal decongestants; myasthenia gravis (antibody to the nicotinic receptor) is the disease version.</td></tr>
<tr><td>Rapid desensitization</td><td>Too much stimulation of a GPCR, within milliseconds</td><td>GRK (G protein&ndash;coupled receptor kinase) phosphorylates the agonist-bound receptor; &beta;-arrestin binds; cAMP stops; reversible when the agonist leaves</td><td>No change in receptor number</td><td>Rapid runs up to &beta;-arrestin binding and coming off; if it does not come off, the long process begins.</td></tr>
<tr><td>Long-term down-regulation</td><td>Continued over-stimulation</td><td>Endocytosis via coated pits, recycling or lysosomal degradation; relocation inside the cell</td><td>Fewer receptors: shift right, maximum can fall</td><td>Poll trap: &ldquo;Short term regulation of receptors involves relocation of receptors into the cells&rdquo; is wrong; relocation is long-term.</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf pages 16&ndash;29; transcript 9/29. Poll key, all correct: increasing the number of receptors may increase the potency of a drug; &beta;-arrestin is involved in rapid receptor desensitization; endocytosis of receptors is part of the long-term receptor down-regulation; tolerance to a drug effect is a product of receptor down-regulation (PollEV 9/29).</p>

<h3>7. Indirect antagonists</h3>
<p class="sub">What you are looking up: a drug that never touches the receptor; where it acts, upstream or downstream, and what it does to the agonist&rsquo;s curve.</p>
<table class="reftab"><thead><tr><th>Drug</th><th>Target</th><th>Upstream or downstream</th><th>Agonist&rsquo;s curve</th><th>Why</th></tr></thead><tbody>
<tr><td>Duloxetine (serotonin&ndash;norepinephrine reuptake inhibitor, SNRI), cocaine</td><td>Norepinephrine reuptake transporter</td><td>Upstream: more norepinephrine stays in the synapse</td><td>Left, same Emax</td><td>&mdash;</td></tr>
<tr><td>Fluoxetine (selective serotonin reuptake inhibitor, SSRI)</td><td>Serotonin reuptake transporter (SERT)</td><td>Upstream: more serotonin stays in the cleft</td><td>Left, same Emax; a partial agonist stays partial</td><td>The receptor still sees serotonin itself, so the class of the agonist cannot change: &ldquo;You didn&rsquo;t change the drug.&rdquo;</td></tr>
<tr><td>Physostigmine (any -stigmine)</td><td>Acetylcholinesterase (the enzyme that breaks down acetylcholine)</td><td>Upstream: acetylcholine is not broken down</td><td>Left, same Emax</td><td>&mdash;</td></tr>
<tr><td>Carbidopa</td><td>Enzyme in the gut that breaks down dopa</td><td>Upstream: more dopa reaches the brain</td><td>L-dopa left (potentiation: no effect alone)</td><td>&mdash;</td></tr>
<tr><td>Milrinone, caffeine</td><td>Phosphodiesterase (PDE), which breaks down cAMP</td><td>Downstream: cAMP builds up behind the same signal</td><td>Left; a partial agonist can reach the full response</td><td>&mdash;</td></tr>
<tr><td>Cancer drug X</td><td>RAS in the GEF &rarr; RAS &rarr; RAF &rarr; MEK &rarr; ERK cascade</td><td>Downstream: the message is cut after the receptor</td><td>Right and Emax down</td><td>&mdash;</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf pages 4&ndash;13, 31; Pharmacodynamics-Day_2_2026s copy.pdf slides ~40&ndash;~41; transcript 9/23, 9/24, 9/29, 9/30. &ldquo;remember that indirect antagonists can work downstream from the receptor, but also upstream from the receptor&rdquo; (T 9/24). Poll trap: &ldquo;Indirect antagonists are allosteric drugs that bind at another site in the receptor&rdquo; is wrong: &ldquo;They bind upstream or downstream from the receptor and thus indirectly affect its signal&rdquo; (T 9/29).</p>
<div class="shiftgrid">
<!--FIG:ind-snri--><!--FIG:ind-ssri--><!--FIG:ind-ache--><!--FIG:ind-carbidopa--><!--FIG:ind-pde--><!--FIG:ind-ras-->
</div>
<table class="reftab"><thead><tr><th>Drug&ndash;drug interaction</th><th>Definition</th><th>Example</th></tr></thead><tbody>
<tr><td>Addition</td><td>Two drugs with the same effect; the result equals the sum</td><td>Trimethoprim and sulfamethoxazole</td></tr>
<tr><td>Synergism</td><td>Two drugs with the same effect; the result is greater than the sum</td><td>Penicillin and gentamicin</td></tr>
<tr><td>Potentiation</td><td>One drug has no effect alone but increases the effect of the other</td><td>Carbidopa and dopa</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf pages 30&ndash;31; transcript 9/29. The terms are taught; the drug names are &ldquo;just FYI&rdquo; (T 9/29).</p>

<h3>8. Quantal responses, therapeutic index (TI) and safety index (SI)</h3>
<p class="sub">What you are looking up: how a population curve differs from a single-sample curve, and how the ED50, LD50, TI and SI are read and divided.</p>
<!--FIG:quantal-->
<table class="reftab"><thead><tr><th>Quantity</th><th>Definition</th><th>Numbers on the slides</th><th>Why</th></tr></thead><tbody>
<tr><td>Graded response</td><td>One biological unit; a continuous scale from no effect to maximum</td><td>Contraction with nicotine, paralysis by curare</td><td>&mdash;</td></tr>
<tr><td>Quantal response</td><td>A population; binary: any effect or none, alive or dead</td><td>Dogs and epinephrine 7.7&ndash;108 ng/kg/min; bars joined give a normal distribution; the cumulative form gives a sigmoid</td><td>On a quantal curve 50% means half the population responded, not half an effect.</td></tr>
<tr><td>ED50 (population)</td><td>Dose that protects or treats 50% of the population</td><td>Epinephrine in dogs about 29 ng/kg/min (spoken); acetaminophen about 325 mg (spoken); 10 mg (page 40); 100 &micro;g/kg (page 41 right); 0.1 (page 42)</td><td>The exam figure will not label the ED50; you find it yourself.</td></tr>
<tr><td>LD50</td><td>Dose that kills 50% of the population</td><td>160 mg (page 40); 400 &micro;g/kg (page 41 right); 100 (page 42)</td><td>&mdash;</td></tr>
<tr><td>TI = LD50 / ED50</td><td>Margin of safety; &ldquo;statement of how selective a drug is in producing a desired effect&rdquo;; the larger, the safer</td><td>Phenobarbital 40/4 = 10; alprazolam 2500; 160/10 = 16; codeine figure 40; hypnosis/death 400/100 = 4; sleep/death 100/0.1 = 1000</td><td>&mdash;</td></tr>
<tr><td>SI = LD1 / ED99</td><td>Safety index (safety ratio): the tails, not the midpoints; for a safe drug the ED99 is below the LD1; the larger, the safer</td><td>1/10 = 0.1 (page 42) with a TI of 1000 on the same figure</td><td>Read the tails: &ldquo;For every 100 patients, 99 will get a good night of sleep and one will die.&rdquo;</td></tr>
<tr><td>Same drug, two TIs</td><td>The TI is per effect measured</td><td>Codeine: cough (large TI) vs pain (small TI)</td><td>&ldquo;No drug produces a single effect.&rdquo;</td></tr>
<tr><td>Therapeutic window</td><td>Range of steady-state concentrations giving efficacy with minimal toxicity; a range, not a ratio</td><td>Acceptable risk depends on severity: headache vs Hodgkin&rsquo;s lymphoma</td><td>&mdash;</td></tr>
<tr><td>Acetaminophen</td><td>Regular 325 mg per tablet, Extra Strength 500 mg, every 4&ndash;6 hours</td><td>More than 4000 mg/day: liver toxicity</td><td>&mdash;</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf pages 32&ndash;43; transcript 9/29. Arithmetic checked: 40/4 = 10; 160/10 = 16; 400/100 = 4; 100/0.1 = 1000; 1/10 = 0.1. &ldquo;if you can divide, you&rsquo;ll be OK ... I&rsquo;m gonna use whole numbers with zero&rdquo; (T 9/29).</p>

<h3>9. Drug basics: MOA vs SOA, supplements, safety vs efficacy, selectivity, desired vs undesired</h3>
<div class="pair"><!--FIG:selectivity--><!--FIG:moa-soa--></div>
<p class="sub">What you are looking up: the Day 1 words: mechanism (MOA) vs site of action (SOA), supplements, safety vs efficacy, selectivity and dose, desired vs undesired effects.</p>
<table class="reftab"><thead><tr><th>Term</th><th>Rule</th><th>Why</th></tr></thead><tbody>
<tr><td>Must know vs should know</td><td>Must know = MOA (Exam 1). Should know = SOA. Effect, adverse drug reactions (ADR) and drug&ndash;drug interactions (DDI) would be nice to know (Exam 2). Not tested: use, dose, route, brand names</td><td>Must know means the receptor and the selectivity: &beta;1-selective, &beta;1/&beta;2 non-selective, &alpha;1.</td></tr>
<tr><td>Metoprolol as the worked example</td><td>MOA: reversible &beta;1 antagonist. SOA: heart; kidneys and brain. ADR: bradycardia, fatigue. DDI: verapamil, diltiazem, clonidine</td><td>&mdash;</td></tr>
<tr><td>Natural dietary supplements (NDS)</td><td>Regulated as food; may not claim to treat, cure, diagnose or prevent; not tested by the FDA like prescription drugs; &ldquo;natural&rdquo; does not mean safe or free of interactions; patients do not report them</td><td>Poll key &ldquo;All of the above&rdquo;: if two listed answers are certainly right, take all of the above.</td></tr>
<tr><td>Safety vs efficacy</td><td>If the safe drug does not work, choose the efficacious one; with equal efficacy, choose the safer</td><td>&mdash;</td></tr>
<tr><td>Selectivity and dose</td><td>Start with the smallest dose that gives the desired effect; the larger the dose, the less selective the drug</td><td><ul style="margin:0;padding-left:16px"><li>Metoprolol is &beta;1-selective up to about 200 mg; above that it reaches &beta;2.</li><li>&ldquo;Start low and go slow.&rdquo;</li></ul></td></tr>
<tr><td>Selective vs non-selective</td><td>Loratadine: selective H1 inverse agonist. Diphenhydramine: H1, H2 and muscarinic receptors</td><td>&mdash;</td></tr>
<tr><td>Desired vs undesired effects</td><td>Most ligands produce multiple effects (several receptor types, different target sensitivity); different effects often have different curves: low dose desired, higher dose undesired; give the lowest effective dose; safety is measured by the TI</td><td>&mdash;</td></tr>
<tr><td>Side effect that became the effect</td><td>Predictable when the pharmacology is known: ligand &rarr; receptor &rarr; cell function &rarr; clinical response; sildenafil and minoxidil</td><td>&mdash;</td></tr>
<tr><td>Therapeutic efficacy</td><td>Plateau height on the analgesic figure: morphine and meperidine tie high, ibuprofen plateaus lower; morphine is left of meperidine (more potent, same efficacy)</td><td>&mdash;</td></tr>
<tr><td>Classify by structure vs by MOA</td><td>Structure (benzothiadiazine ring) does not predict the effect; MOA plus SOA does: thiazide = Na+/Cl&minus; symporter antagonist at the distal convoluted tubule, so more urine, less sodium, lower blood pressure</td><td>&ldquo;Whatever sodium goes, water follows.&rdquo;</td></tr>
<tr><td>Drug</td><td>Alters an ongoing physiological or pathological function; initiates, inhibits or modulates</td><td>&mdash;</td></tr>
</tbody></table>
<p class="sub">Pharmacodynamics-Day-1-2026s.pdf slides ~7&ndash;~9, ~15&ndash;~20, ~25&ndash;~26, ~29&ndash;~33; Pharmacodynamics-Day_4_&amp;_5_2026s_Part 3.pdf pages 1&ndash;2; Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf page 44; transcript 9/22, 9/29, 9/30.</p>
`;
