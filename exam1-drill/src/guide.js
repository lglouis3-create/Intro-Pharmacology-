const GUIDE_HTML = `
<h2>Guides</h2>
<p class="sub">One guide per exam concept: the rule, the figure that shows it, and how he asks it.</p>
<p class="sub">Cites: <i>Day 1</i> = 9/22 deck, <i>Day 2</i> = 9/23, <i>Day 3</i> = 9/24, <i>Day 4</i> = 9/28 (slide numbers marked ~ were counted from the deck text and may be off by one or two); <i>Part 2 p.N</i> = Day 4 &amp; 5 Part 2 deck; <i>Review p.N</i> = Pharmacodynamics reviews.pdf (9/30); <i>(T)</i> = his words in the lecture transcript of that date; <i>PollEV</i> = his Poll Everywhere pages with his keys; <i>Jeopardy IMG_xxxx</i> = the 9/30 Jeopardy screenshots.</p>
<nav class="guidenav">
<a href="#g-curves">10 How to tackle a curve question</a>
<a href="#g-aep">1 Affinity, efficacy, potency</a>
<a href="#g-classes">2 Agonist classes</a>
<a href="#g-antag">3 Antagonists</a>
<a href="#g-allo">4 Orthosteric vs allosteric</a>
<a href="#g-dd">5 Drug–drug on one receptor</a>
<a href="#g-sig">6 Receptors and signalling</a>
<a href="#g-basics">7 Drug basics</a>
<a href="#g-drugs">8 Exam 1 drug list</a>
<a href="#g-day5">9 Day 5: spare receptors, regulation, quantal, TI</a>
</nav>

<!-- ===================================================================== -->
<section class="guide" id="g-curves">
<h3 id="guide-10">10. How to tackle a curve question</h3>
<p class="sub">His 9/30 review. Every figure question on the exam is read in this order.</p>
<h4>The procedure</h4>
<ol>
<li><b>Point of reference.</b> Find the agonist alone (dashed or dotted). Every other curve is read against it. <small>Review p.3; (T) 9/30</small></li>
<li><b>Helping or hurting?</b> "is it gonna help or make life more difficult?" Help = the curve moves left; hurt = right. That is the shift. <small>Review p.3, p.5; (T) 9/30</small></li>
<li><b>Baseline.</b> Down to 0 = inverse agonist. Up = a second drug with efficacy. Already at 0 and unchanged = no information. <small>Review p.5, p.7, p.11</small></li>
<li><b>Emax.</b> Down = irreversible antagonist, or an allosteric antagonist on efficacy. Up (a partial made full) = allosteric agonist on efficacy, PDE inhibitor, or more receptors. <small>Review p.5, p.10; (T) 9/30</small></li>
<li><b>Symmetry</b>, only when several shifts are drawn. Equal steps that keep going = competitive (orthosteric). Unequal steps that stop = allosteric. <small>Review p.6, p.10; (T) 9/30</small></li>
</ol>
<ul>
<li>Knowing the drug on the list is a shortcut past the procedure: phenoxybenzamine named in the stem means irreversible antagonist, no figure needed. <small>Jeopardy IMG_9320; (T) 9/30</small></li>
<li>A wordy stem describes a figure; draw it out, then read it the same way. <small>(T) 9/30</small></li>
</ul>
<h4>What each observation does</h4>
<table class="reftab"><thead><tr><th>Observation</th><th>Rules out</th><th>Leaves</th></tr></thead><tbody>
<tr><td>Shift left</td><td>Competitive antagonist, inverse agonist, irreversible antagonist, allosteric antagonist</td><td>Full agonist, allosteric agonist, indirect antagonist that raises the signal (PDE inhibitor, reuptake blocker), more receptors</td></tr>
<tr><td>Shift right</td><td>Full agonist, partial agonist, allosteric agonist, more receptors</td><td>Competitive antagonist, inverse agonist, irreversible antagonist, allosteric antagonist, indirect antagonist that cuts the signal (RAS blocker)</td></tr>
<tr><td>Baseline up</td><td>Every antagonist, the inverse agonist</td><td>A second agonist: full, or partial from a low baseline</td></tr>
<tr><td>Baseline down to 0</td><td>Everything neutral (competitive, irreversible, allosteric antagonist) and every agonist</td><td>Inverse agonist (a partial agonist from a high baseline stops at its own Emax, not 0)</td></tr>
<tr><td>Baseline unchanged at 0</td><td>Nothing</td><td>Competitive and inverse cannot be told apart; Emax and symmetry decide the rest</td></tr>
<tr><td>Emax down</td><td>Competitive antagonist, inverse agonist, allosteric on affinity only, every agonist</td><td>Irreversible antagonist; allosteric antagonist on efficacy</td></tr>
<tr><td>Emax up (partial becomes full)</td><td>Anything acting on affinity only; every antagonist</td><td>Allosteric agonist on efficacy, PDE inhibitor, more receptors</td></tr>
<tr><td>Equal steps, no limit</td><td>Allosteric (agonist or antagonist)</td><td>Competitive antagonist, inverse agonist; irreversible until the Emax drops</td></tr>
<tr><td>Unequal steps that stop</td><td>Competitive antagonist, inverse agonist, irreversible antagonist</td><td>Allosteric: then agonist or antagonist by direction, affinity or efficacy by Emax</td></tr>
</tbody></table>
<p class="sub">Review p.5–11; (T) 9/30; Day 4 slides ~21–~22, ~48–~50. A specific stem leaves one answer; a broad stem is a select-all (two or three on the exam at most).</p>
<!--FIG:outcomes-->

<h4>Worked examples: his review figures</h4>
<!--IMG:rev-rt-figure-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>right</td><td>0, cannot tell</td><td>down</td><td>equal steps</td><td><b>irreversible antagonist</b></td></tr></table>
<p>The right shift alone looks competitive; the falling Emax settles it, because competitive and inverse are reversible and never lower the Emax. <small>Review p.5; (T) 9/30</small></p>
<!--IMG:rev-shifts-base0-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>right, three equal steps</td><td>0, cannot tell</td><td>same</td><td>equal steps</td><td><b>competitive antagonist</b></td></tr></table>
<p>The baseline at 0 cannot separate competitive from inverse; the equal steps rule out allosteric and the unchanged Emax rules out irreversible, so his key is a) competitive antagonist. <small>Review p.6; (T) 9/30</small></p>
<!--IMG:rev-shifts-base50-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>right</td><td>50 → 30 → 10 → 0</td><td>same</td><td>equal steps</td><td><b>inverse agonist</b></td></tr></table>
<p>Same shifts as page 6, so a reader who skips the baseline answers competitive; the baseline falling to 0 is the inverse agonist. <small>Review p.7; (T) 9/30</small></p>
<!--IMG:rev-dotted-left-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>left</td><td>0, unchanged</td><td>same</td><td>—</td><td><b>full agonist or allosteric agonist (affinity)</b></td></tr></table>
<p>A left shift rules out every antagonist and the inverse agonist; one shift cannot separate the two helpers, so the slide has two answers. <small>Review p.8; (T) 9/30</small></p>
<!--IMG:rev-dotted-right-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>right, one shift</td><td>0, cannot tell</td><td>same</td><td>—</td><td><b>competitive antagonist</b> (one best answer); select-all adds inverse, irreversible with spare receptors, allosteric antagonist on affinity</td></tr></table>
<p>The mistake is choosing irreversible from one shift; with spare receptors the Emax drop needs more antagonist, so one shift leaves competitive as the one best answer. <small>Review p.9; (T) 9/30</small></p>
<!--IMG:rev-allo-ant-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>right, three shifts</td><td>0, cannot tell</td><td>same</td><td>unequal steps</td><td><b>allosteric antagonist (affinity)</b></td></tr></table>
<p>Three right shifts with the same top read as competitive until the spacing is checked; the unequal steps make it allosteric, and the kept Emax makes it affinity only. <small>Review p.10; (T) 9/30</small></p>
<!--IMG:rev-pindolol-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>—</td><td>100 → 50 and 0 → 50</td><td>its own, about 50%</td><td>—</td><td><b>partial agonist</b> (pindolol)</td></tr></table>
<p>From 100% it looks like an antagonist; the rise from 0 shows efficacy, and stopping at 50% rules out both the inverse agonist (0) and the full agonist (100). <small>Review p.11; (T) 9/30</small></p>
<p>Clinical use: a patient with a low heart rate on a full β-blocker risks the heart stopping during sleep; pindolol brings a low rate up and a high rate down. <small>Review p.11; (T) 9/30</small></p>
<!--IMG:pollev-abcde-similar-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>B → right</td><td>0, unchanged</td><td>same</td><td>—</td><td><b>D</b> = B + reversible competitive antagonist</td></tr><tr><td>E → left</td><td>0, unchanged</td><td>same (partial stays partial)</td><td>—</td><td><b>C</b> = E + allosteric agonist on affinity only</td></tr><tr><td>E → left</td><td>0, unchanged</td><td>up to full</td><td>—</td><td><b>A, B, D</b> = E + allosteric agonist on affinity and efficacy (select all)</td></tr><tr><td>D → right</td><td>0, unchanged</td><td>down</td><td>—</td><td>E = D + irreversible or allosteric antagonist on affinity and efficacy</td></tr></table>
<p>His other keys on this figure: highest potency A (smallest ED50), lowest efficacy C and E, highest affinity A; C and E are equally efficacious and differ in affinity only. <small>Review p.3; (T) 9/30</small></p>
<!--IMG:pollev-figure1-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>—</td><td>50 → 100</td><td>100</td><td>—</td><td><b>A</b>: full agonist</td></tr><tr><td>—</td><td>50 → about 75</td><td>75–80</td><td>—</td><td><b>B</b>: partial agonist</td></tr><tr><td>—</td><td>50, flat</td><td>—</td><td>—</td><td><b>C</b>: competitive antagonist (or a partial agonist with 50% efficacy)</td></tr><tr><td>—</td><td>50 → 25</td><td>25</td><td>—</td><td><b>D</b>: partial agonist</td></tr><tr><td>—</td><td>50 → 0</td><td>—</td><td>—</td><td><b>E</b>: inverse agonist</td></tr></table>
<p>Five drugs given separately from a 50% baseline (R = R*); C is competitive on this figure alone, and a second cell line with most receptors inactive, where C rises to 50%, makes the partial agonists B, C and D (select all). <small>Review p.4; (T) 9/30; Jeopardy IMG_3010</small></p>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>Looks the same</th><th>The one thing to look at</th><th>Answer</th></tr></thead><tbody>
<tr><td>One right shift from 0: competitive vs inverse vs irreversible</td><td>How many shifts, and is the Emax down yet</td><td>One best answer: competitive; select-all: all three plus allosteric antagonist on affinity</td></tr>
<tr><td>Several right shifts, same Emax</td><td>Spacing of the steps</td><td>Equal: competitive antagonist. Unequal, stopping: allosteric antagonist on affinity</td></tr>
<tr><td>Flat line at 50%: antagonist vs 50%-efficacy partial agonist</td><td>The same drug in a cell line with most receptors inactive</td><td>Rises to 50%: partial agonist. Stays flat: antagonist</td></tr>
<tr><td>Shift left: full agonist, allosteric agonist, PDE inhibitor, more receptors</td><td>Baseline, step spacing, and whether a partial became full</td><td>Baseline up: full agonist. Unequal steps: allosteric. Partial made full: all helpers (poll key)</td></tr>
<tr><td>Allosteric antagonist vs indirect antagonist</td><td>Where the drug binds</td><td>On the receptor at a second site: allosteric. Upstream or downstream: indirect</td></tr>
<tr><td>Full agonist vs inverse agonist</td><td>Which receptor state it binds tightest</td><td>R* (active): full agonist. R (inactive): inverse agonist</td></tr>
<tr><td>Prozac on 5HT vs allosteric agonist on 5HT</td><td>The plateau</td><td>Same plateau, shifted left: Prozac. Plateau can rise: allosteric agonist on efficacy</td></tr>
</tbody></table>
<p class="sub">Review p.4, p.6, p.9–10; (T) 9/30; Jeopardy IMG_9314, IMG_9317, IMG_9321.</p>

<h4>How he asks it</h4>
<!--IMG:pollev-five-drc-->
<div class="poll"><b>"DRC "C" is the DRC of an 5HT alone, which DRC would represent "5HT" in the presence of prozac, a 5HT transporter antagonist (SERT)?"</b> A / B / C / D / E<br>Key: <b>A</b>. Prozac blocks reuptake, so more serotonin: left; "it's still serotonin. You didn't change the drug", so the plateau stays at C's height and B is out. <small>Jeopardy IMG_9314; (T) 9/30</small></div>
<div class="poll"><b>"An allosteric antagonist"</b> Competes for the orthosteric site / Can increase the efficacy of a partial agonist / Can decrease the affinity of an agonist for its receptor / Is a drug the binds downstram from the receptor and decreases the response<br>Key: <b>Can decrease the affinity of an agonist for its receptor</b>. It binds the receptor at a second site; "binds downstream" is the indirect antagonist. <small>Jeopardy IMG_9317; (T) 9/30</small></div>
<div class="poll"><b>"Which of the following is CORRECT?"</b> cAMP is an example of an effector system / G-proteins are defined and regulated by the alpha subunit / PLC is an example of a second messanger / In order for g-proteins to dissociate from the receptor, the GTP has to be released<br>Key: <b>G-proteins are defined and regulated by the alpha subunit</b>. cAMP is a second messenger, PLC an effector, and GDP (not GTP) is released. <small>Jeopardy IMG_9318; (T) 9/30</small></div>
<div class="poll"><b>"What effect an inverse agonist would have on a full agonist DRC? Assume that the tissue has 50% of receptor present in the active state (R = R*)."</b> It would decrease the ability of a full agonist to reach its Emax / It would decrease the baseline and shift the DRC to the right / It would shift the DRC of the agonist to the left and increase the baseline / It would decrease the ED50 value of the agonist, but it will increase its efficacy / It would evoke non-symmetrical shifts to the right and change the efficacy of an agonist<br>Key: <b>It would decrease the baseline and shift the DRC to the right</b>. Emax loss is the irreversible antagonist's answer, non-symmetrical shifts the allosteric antagonist's, left with baseline up a second agonist's. <small>Jeopardy IMG_9319; (T) 9/30</small></div>
<!--IMG:jeop-abcde-effect-->
<div class="poll"><b>"If the DRC "B" is the DRC of NE alone and DRC "D" is the agonist in the presence of phenoxybenzamine, drug "X" is most likely:"</b> Competitive antagonist / Irreversible antagonist / Full agonist / Allosteric agonist / Partial agonist<br>Key: <b>Irreversible antagonist</b>. D is right of B and lower; knowing phenoxybenzamine is irreversible gives the answer without the figure. <small>Jeopardy IMG_9320; (T) 9/30</small></div>
<div class="poll"><b>"The solid line is my drug alone. The dotted line is the presence of this mysterious drug, drug Y, most likely what?"</b> (the dotted curve is to the left and rises from partial to full) an indirect antagonist that increases the second messenger levels / an allosteric agonist that affects affinity and efficacy / diazepam / the same drug in a cell that has high expression of receptors / All of the above<br>Key: <b>All of the above</b>. A PDE inhibitor, an allosteric agonist on affinity and efficacy (diazepam is one) and more receptors each move a partial left and up to full; one shift cannot be tested for symmetry. <small>(T) 9/30</small></div>
<table class="reftab"><thead><tr><th>Jeopardy stem (verbatim)</th><th>Key</th><th>Why</th></tr></thead><tbody>
<tr><td>Which of these DRC would best represent the DRC of an antagonist? [Figure 1, 50% baseline] A / B / C / D / E</td><td>C</td><td>The baseline stays at 50%; E falls to 0 and is the inverse agonist. <small>IMG_3010</small></td></tr>
<tr><td>Which drug has the lowest efficacy [five curves A–E; D plateaus lowest] A / B / C / D / E / Two correct answers</td><td>D</td><td>Lowest plateau. On the recap figure C and E tie, hence the "Two correct answers" option. <small>IMG_3011</small></td></tr>
<tr><td>Drug C is most likely: [Figure 1] Norepinephrine / Loratadine / Diazepam / Metoprolol / Histamine</td><td>Metoprolol</td><td>C is the competitive antagonist; norepinephrine and histamine are A, loratadine E, diazepam has no effect alone. <small>IMG_3012</small></td></tr>
<tr><td>This figure shows 4 DRCs for 1 drug (X) alone or in the presence of another drug. If curve B is drug X alone, which curve would be X in the presence of an agonist with equal efficacy? A / B / C / D / All the above</td><td>A</td><td>Two full agonists help each other: left, more potent. <small>IMG_3013</small></td></tr>
<tr><td>Dotted line is Drug A alone, solid lines is A in the presence of increasing concentrations of B. B is: [equal steps right, same top] Competitive antagonist / Irreversible antagonist / Full agonist / Allosteric agonist / Partial agonist</td><td>Competitive antagonist</td><td>Right, baseline and Emax unchanged, equal steps. <small>IMG_3014</small></td></tr>
<tr><td>Which drug has the lowest affinity? [A–E, Effect vs Log [Agonist]] A / B / C / D / E</td><td>E</td><td>The furthest right. <small>IMG_3015</small></td></tr>
<tr><td>In order to bind to a receptor, a drug needs: Affinity / Efficacy / Positive charges / Be metabolized / Be an orthosteric agonist</td><td>Affinity</td><td>Binding is affinity; efficacy is what happens after. <small>IMG_3016</small></td></tr>
<tr><td>An irreversible antagonist is more likely: To only form hydrogen bonds / Enhance the potency of a partial agonist / Increase the baseline and shift the DRC to the left / Decrease the ability of an agonist to reach Emax</td><td>Decrease the ability of an agonist to reach Emax</td><td>Covalent binding removes receptors: a chemical down-regulation. <small>IMG_3017</small></td></tr>
<tr><td>Walk me through the G-protein signaling pathway (each team member one step forward, then backward)</td><td>Forward and reverse steps (guide 6)</td><td>GDP off, GTP on; α dissociates; AC; ATP → cAMP; response. Reverse: PDE, GTP → GDP, reassociation. <small>IMG_3018</small></td></tr>
<tr><td>Efficacy: Is a measure of the chemical bonds a drug-receptor forms / Is measured in the X-axis / Is inversely proportional to the Kd / Is a stimulus measured in the Y-axis</td><td>Is a stimulus measured in the Y-axis</td><td>Bonds, the x-axis and Kd are affinity. <small>IMG_9313</small></td></tr>
<tr><td>Which of the following is most likely an irreversible antagonist? Drug A (Kd =100 nmol) / Drug B (Kd =50 μmol) / Drug C (Kd =2 mmol) / Drug D (Kd =300 mol)</td><td>Drug A (Kd = 100 nmol)</td><td>Covalent bonds give the smallest Kd; nano is 10<sup>−9</sup>. <small>IMG_9315</small></td></tr>
<tr><td>Which drug is the most potent? [A–E, Effect vs Log [Agonist]] A / B / C / D / E</td><td>A</td><td>Smallest ED50. <small>IMG_9316</small></td></tr>
<tr><td>Which of the following drugs would have the highest affinity for receptors present in the inactive state? Full agonist / Partial agonist / Inverse agonist / Competitive antagonist / Indirect antagonist</td><td>Inverse agonist</td><td>The full agonist binds R* to keep it active; the inverse binds R to keep it inactive. <small>IMG_9321</small></td></tr>
<tr><td>(PollEV, before the review) Which of the following is an irreversible antagonist? Phenylephrine / Prazosin / Diazepam / Phenoxybenzamine / None of the above</td><td>Phenoxybenzamine</td><td>The only irreversible drug on the list. <small>PollEV p.6; (T) 9/30</small></td></tr>
</tbody></table>
<p class="sub">Jeopardy 9/30 screenshots IMG_3010–3018, IMG_9313–9321 (keys from the transcript); PollEV p.6; (T) 9/30. One Jeopardy question returns on the exam verbatim, options possibly reordered.</p>

<h4>Traps</h4>
<ul>
<li>Calling E "irreversible" on the 50% figure; irreversible never moves the baseline, a fall to 0 is inverse. <small>Jeopardy IMG_3010; Review p.4</small></li>
<li>Picking "binds downstream" for the allosteric antagonist; that is the indirect antagonist, the allosteric one binds the receptor's second site. <small>Jeopardy IMG_9317</small></li>
<li>Saying GTP is released for dissociation; GDP comes off and GTP comes on. <small>Jeopardy IMG_9318</small></li>
<li>Calling one right shift "irreversible" as the one best answer; pick competitive (or inverse) and wait for more shifts. <small>Review p.9</small></li>
<li>Changing an answer on backwards navigation; keep the first answer. <small>(T) 9/30</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-aep">
<h3 id="guide-1">1. Affinity, efficacy, potency</h3>
<h4>What it is</h4>
<ul>
<li><b>Affinity</b>: how likely a drug is to bind and stay bound; set by the bonds it forms (covalent, ionic, hydrogen, van der Waals). <small>Day 2 ~55; (T) 9/23</small></li>
<li><b>Efficacy</b>: the ability to change the receptor's state; positive (activates receptors) or negative (shuts them down). <small>Day 1 ~38; (T) 9/22, 9/23</small></li>
<li><b>Potency</b> depends on affinity, efficacy and the number of receptors (the tissue); measured by the EC50/ED50, the dose giving 50% of the maximal response. <small>Day 2 ~52–~58; Day 3 ~22; PollEV p.1</small></li>
<li><b>Kd</b> = [R][A]/[AR], the concentration that binds 50% of the receptors, from a binding study: "the smaller the Kd, the greater the affinity". <small>Day 2 ~45–~50; Day 3 ~3; (T) 9/24</small></li>
<li>EC50 is a concentration (in vitro); ED50 a dose (in vivo, ADME changes apparent potency). Units: milli 10<sup>−3</sup>, micro 10<sup>−6</sup>, nano 10<sup>−9</sup>. <small>Day 3 ~8, ~21; (T) 9/24</small></li>
</ul>

<h4>How to read it on a curve</h4>
<!--FIG:drc-basic-->
<ul>
<li>x-axis: dose, log scale, the independent variable. y-axis: response as a percent of the maximum, normalized so people with different resting values can be compared. <small>Day 3 ~16–~18; (T) 9/24</small></li>
<li>Affinity is read left and right; efficacy up and down; potency combines the two through the ED50. <small>(T) 9/24</small></li>
<li>Threshold: the dose below which there is no response. Slope: the linear mid-section. Emax: all receptors occupied or the physiological system maxed out. <small>Day 3 ~14, ~21; (T) 9/24</small></li>
<li>ED50 is read at 50% of that drug's own Emax; the threshold is not the ED50. <small>Day 3 ~20–~22</small></li>
</ul>
<!--FIG:binding-kd--><!--FIG:bonds-->
<ul>
<li>On a binding curve the x-axis value at 50% bound is the Kd; the curve furthest left has the smallest Kd and the greatest affinity. Kd ignores the effect. <small>Day 2 ~50; Day 3 ~29; (T) 9/24</small></li>
<li>The covalent bond is the strongest, so the irreversible drug has the greatest affinity and the smallest Kd. <small>Day 2 ~15–~16; (T) 9/23</small></li>
</ul>
<!--FIG:potency-->
<!--FIG:efficacy-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>curve further left</td><td>0, unchanged</td><td>same</td><td>—</td><td><b>more potent</b>: greater affinity</td></tr><tr><td>none (same ED50)</td><td>0, unchanged</td><td>higher</td><td>—</td><td><b>more potent</b>: greater efficacy (his rule, tissue and affinity equal)</td></tr><tr><td>left</td><td>0, unchanged</td><td>same (a partial can reach the max)</td><td>—</td><td><b>same drug, more receptors</b>: Kd, affinity, efficacy unchanged</td></tr></table>
<p>The mistake is reading plateau height as affinity; affinity is the left–right position, and with equal plateaus the curve on the left wins on affinity alone. <small>Day 3 ~7, ~17, ~22–~23, ~27; (T) 9/24</small></p>
<!--FIG:spare-->
<ul>
<li>Spare receptors: an agonist may need only a fraction of the receptors (his example 10%) for the maximal response, so the response curve sits left of the binding curve. <small>Day 4 ~56; (T) 9/28</small></li>
<li>A partial agonist can be the most potent drug on a figure while the full agonist is the most efficacious; which is wanted depends on the job. <small>(T) 9/24</small></li>
</ul>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>Looks the same</th><th>The one thing to look at</th><th>Answer</th></tr></thead><tbody>
<tr><td>Affinity vs efficacy</td><td>Binding, or a change in receptor state</td><td>Bind and stay bound: affinity. Change the state: efficacy</td></tr>
<tr><td>Kd vs EC50/ED50</td><td>Binding curve or response curve</td><td>50% bound: Kd. 50% of the response: EC50/ED50</td></tr>
<tr><td>EC50 vs ED50</td><td>Concentration or dose</td><td>In vitro: EC50. In vivo, ADME included: ED50</td></tr>
<tr><td>Potency vs efficacy</td><td>Left–right position or plateau height</td><td>Smallest ED50: most potent. Highest plateau: most efficacious</td></tr>
<tr><td>Pharmacological vs apparent potency</td><td>Does the list name age, absorption, elimination, DDI</td><td>Yes: apparent. Tissue, receptors, affinity, efficacy: pharmacological</td></tr>
<tr><td>More receptors vs a changed drug</td><td>Did the drug's Kd or Emax change</td><td>No, curve moved left: more receptors, same drug</td></tr>
<tr><td>Intrinsic activity vs efficacy</td><td>Is the tissue counted</td><td>No (full 1, partial 0–1, antagonist 0): intrinsic activity. Yes, relative only: efficacy</td></tr>
<tr><td>Same ED50, different Emax</td><td>The stem says affinity is equal</td><td>The higher plateau is more potent by efficacy</td></tr>
</tbody></table>
<p class="sub">Day 1 ~21–~28; Day 2 ~31, ~45–~58; Day 3 ~3–~8, ~21–~29; (T) 9/22, 9/23, 9/24.</p>

<h4>How he asks it</h4>
<div class="poll"><b>"Affinity of a drug for the receptor is dependent on the type of chemical bonds it makes."</b> True / False<br>Key: <b>True</b>. Bond type decides how likely a drug is to bind and stay bound. <small>PollEV p.1; (T) 9/23</small></div>
<div class="poll"><b>"Efficacy:"</b> Is the ability of a drug to bind and stay bound to a receptor / Is the ability of a cell to increase its number of receptors / Is the ability of a drug to change receptor activity/state / Is the ability of a drug to be absorbed at the level of the GI<br>Key: <b>change receptor activity/state</b>. A is affinity, B is the cell's business, D is pharmacokinetics. <small>PollEV p.1; (T) 9/23</small></div>
<div class="poll"><b>"Which of the following is CORRECT?"</b> G-proteins are defined and regulated by the beta subunit / Phospholipase C (PLC) is an example of a second messenger / Efficacy is defined by the ability of a drug to bind and stay bound to a receptor / The potency of a drug is dependent on the affinity, efficacy and # of receptors / The higher the Kd, the greater the affinity of a drug for the receptor<br>Key: <b>potency ... affinity, efficacy and # of receptors</b>. The Kd option is backwards; the efficacy option is affinity. <small>PollEV p.1; (T) 9/23</small></div>
<!--IMG:pollev-kd-table-->
<div class="poll"><b>"Which of the two drugs is more likely to successfully interact with β2 receptors on the lungs?"</b> Drug A / Drug B<br>Key: <b>Drug B</b>, Kd 20 µM against 1 mM; the units decide, not the number. A similar question with three more options is on the exam. <small>PollEV p.1; (T) 9/24</small></div>
<!--IMG:pollev-kd-table-b1-->
<div class="poll"><b>"Which of the two drugs has the greatest affinity for the beta 1 receptors in the heart?"</b> Drug A (Kd = 1 mM) / Drug B (Kd = 20 microM) / Drug C (Kd = 100 nM) / Drug D (Kd = 1000 M)<br>Key: <b>Drug C</b>, 100 nM = 1 × 10<sup>−7</sup> M, the smallest Kd; the same drug C is the likeliest irreversible antagonist. <small>PollEV p.2; (T) 9/24</small></div>
<div class="poll"><b>"Which of the following drug will have the greatest affinity for a receptor?"</b> hydrogen bonds / Van der Waal's bonds / covalent bonds / ionic bonds<br>Key: <b>covalent</b>: irreversible at body temperature, the smallest Kd. <small>PollEV p.2; (T) 9/24</small></div>
<!--IMG:pollev-two-hearts-->
<div class="poll"><b>"What would happen to the potency of a NE if one increase the number of receptors expressed in a Heart?"</b> (10 vs 100 receptors, same 1000 nM dose) Decrease / Increase / No change<br>Key: <b>Increase</b>. By mass action more receptors mean a greater chance of binding; the drug appears more potent. <small>PollEV p.2; (T) 9/24</small></div>
<!--IMG:pollev-five-drc-->
<div class="poll"><b>"The DRCs below represent the DRC of five different drugs acting on the same receptor. Which drug has the highest affinity?"</b> A / B / C / D / They all have equal efficacy since they all can produce 50% of the effect<br>Key: <b>A</b>, furthest left. Spoken follow-ups: highest efficacy B, lowest efficacy D, the only full agonist B, the partials A, C, D, E. <small>PollEV p.2; (T) 9/24</small></div>
<div class="poll"><b>"Which of these drugs is the least effective?"</b> (same five curves) A / B / C / D / E<br>Key: <b>D</b>, the lowest plateau. <small>PollEV p.2</small></div>
<div class="poll"><b>"Which of these drugs is most likely to kill 100% of a bacterial colony?"</b> (same five curves) A / B / C / D / E<br>Key: <b>B</b>, the only drug that reaches 100%. <small>PollEV p.2; (T) 9/24</small></div>
<!--IMG:pollev-four-drc-potency-->
<div class="poll"><b>"The DRCs below represent the DRC of five different drugs acting on the same receptor. Which drug has the highest potnecy?"</b> (colored A–D figure, log[A] 0.01–100) A / B / C / D / They all have equal efficacy since they all can produce 50% of the effect<br>Key: <b>A</b>: the smallest dose for an equivalent response. <small>PollEV (v2) p.4; (T) 9/29</small></div>
<!--IMG:pollev-five-drc-correct-->
<div class="poll"><b>"Which of the following is CORRECT?"</b> (five curves A–E, equal plateau) Drug E is more potent than Drug C due to its efficacy / Drug B is more potent than Drug A due to its affinity / Drug A is more potent than Drug C due to its affinity / Drug C is more potent than Drug E due to its efficacy / Drug D is more potent than B due to its affinity and efficacy<br>Key: <b>Drug A is more potent than Drug C due to its affinity</b>. Equal efficacy, so affinity is the only difference. <small>PollEV (v2) p.4; (T) 9/29</small></div>
<div class="poll"><b>Spoken:</b> "Why would A be more potent than B?" (equal ED50, equal affinity, different Emax) — greater efficacy. <small>(T) 9/24</small></div>
<div class="poll"><b>Spoken (steep vs shallow slope):</b> "Which one do you prefer?" — it depends; a steep curve goes from no effect to maximal at once. <small>(T) 9/24</small></div>

<h4>Traps</h4>
<ul>
<li>"The higher the Kd, the greater the affinity"; it is the reverse, Kd and affinity are inversely proportional. <small>PollEV p.1; (T) 9/24</small></li>
<li>"They all have equal efficacy since they all produce 50%"; efficacy is the plateau, not the 50% crossing. <small>PollEV p.2; Day 3 ~21</small></li>
<li>Reading the number and not the unit; convert first (250 nM is below 30 µM and 1 mM). <small>(T) 9/24</small></li>
<li>Answering "no change" on the two-hearts poll; more receptors shift left and the Kd stays. <small>PollEV p.2; (T) 9/24</small></li>
<li>Putting absorption, age or elimination under pharmacological potency; the slide lists them under apparent. <small>Day 1 ~27; bank note L01-015</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-classes">
<h3 id="guide-2">2. Agonist classes</h3>
<h4>What it is</h4>
<!--FIG:two-state-->
<ul>
<li><b>Two-state model</b>: receptors sit active (R*) or inactive (R); the cell moves them by itself, and most sit inactive, so the baseline is usually 0. <small>Day 1 ~28; Day 3 ~31; Day 4 ~45–~46; (T) 9/28</small></li>
<li><b>Baseline</b> reflects receptor activity before any drug: most inactive = 0%; half active (R = R*) = 50%. Constitutively active receptors are more sensitive to inverse agonists. <small>Day 4 ~23, ~45–~46; (T) 9/28</small></li>
<li><b>Full agonist</b>: highest affinity for R*, positive efficacy, Emax 100%, reversible: norepinephrine, epinephrine, histamine, acetylcholine. <small>Day 3 ~33–~41; (T) 9/28</small></li>
<li><b>Partial agonist</b>: same preference for R*, positive efficacy, Emax 1–99%: albuterol, pindolol, varenicline. "If it's 100, it's a full agonist." <small>Day 3 ~50–~53; (T) 9/28</small></li>
<li><b>Inverse agonist</b>: highest affinity for R, negative efficacy, takes the baseline to 0 (loratadine). <b>Neutral antagonist</b>: equal affinity for both states, no efficacy (prazosin). <small>Day 2 ~35–~38; Day 4 ~4–~12, ~43–~44</small></li>
</ul>

<h4>How to read it on a curve</h4>
<!--FIG:classes-->
<!--IMG:pollev-figure1-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>—</td><td>50 → 100</td><td>100</td><td>—</td><td><b>A</b>: full agonist</td></tr><tr><td>—</td><td>50 → its plateau</td><td>below 100</td><td>—</td><td><b>B</b>: partial agonist</td></tr><tr><td>—</td><td>50, flat</td><td>—</td><td>—</td><td><b>C</b>: neutral antagonist</td></tr><tr><td>—</td><td>50 → its plateau</td><td>below 50</td><td>—</td><td><b>D</b>: partial agonist (Emax below the baseline)</td></tr><tr><td>—</td><td>50 → 0</td><td>—</td><td>—</td><td><b>E</b>: inverse agonist</td></tr></table>
<p>Each drug alone from a 50% baseline; the mistake is calling D an antagonist because it goes down, when a partial agonist ends at its own Emax from any starting point. <small>Day 4 ~24; (T) 9/28</small></p>
<!--FIG:partial-->
<!--FIG:inverse-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>—</td><td>0 or 50 → 100; at 100 a flat line</td><td>100</td><td>—</td><td><b>full agonist alone</b></td></tr><tr><td>—</td><td>0, 50 or 100 → its Emax</td><td>its own (75 → everything ends at 75)</td><td>—</td><td><b>partial agonist alone</b></td></tr><tr><td>—</td><td>0 stays 0; 50 or 100 → 0</td><td>—</td><td>—</td><td><b>inverse agonist alone</b></td></tr><tr><td>—</td><td>flat at 0, 50 or 100</td><td>—</td><td>—</td><td><b>neutral antagonist alone</b></td></tr></table>
<p>At a 0 baseline the inverse agonist and the neutral antagonist draw the same flat line; only a system with active receptors separates them (petri dish: inverse takes cAMP to zero, antagonist leaves it at 50%). <small>Day 3 ~37–~40, ~52, ~59–~63; Day 4 ~7–~12, ~43–~44; (T) 9/23, 9/28</small></p>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>Looks the same</th><th>The one thing to look at</th><th>Answer</th></tr></thead><tbody>
<tr><td>Full vs partial agonist</td><td>Does the plateau reach 100%</td><td>100%: full. 1–99%: partial (99% is still partial)</td></tr>
<tr><td>Partial vs inverse agonist from a high baseline</td><td>Where the response stops</td><td>Its own Emax: partial. Zero: inverse</td></tr>
<tr><td>Inverse agonist vs neutral antagonist</td><td>A baseline above 0</td><td>Falls to 0: inverse. Stays flat: antagonist</td></tr>
<tr><td>Agonist/antagonist vs reversible/irreversible vs orthosteric/allosteric</td><td>Three separate questions: activates, lets go, which site</td><td>A class name answers all three (irreversible antagonist = two answers)</td></tr>
<tr><td>Occupancy vs intrinsic activity vs two-state model</td><td>Which model explains inverse agonists</td><td>Two-state (efficacy, active and inactive receptors); the names are FYI</td></tr>
<tr><td>Reversible vs irreversible agonist</td><td>Does any irreversible agonist exist</td><td>No: all agonists are reversible</td></tr>
</tbody></table>
<p class="sub">Day 1 ~28; Day 2 ~32–~38; Day 3 ~15, ~25, ~31–~41, ~50–~63; Day 4 ~4–~12, ~43–~44; (T) 9/22, 9/23, 9/24, 9/28.</p>

<h4>How he asks it</h4>
<div class="poll"><b>"Which of the following is CORRECT about full agonists?"</b> Its Emax is 100% of the system's max response / It has high affinity for receptors in the active state / It can activate inactive receptors / A full agonist will shift the DRC of another full agonist to the left / All of the above<br>Key: <b>All of the above</b>. Every statement is the full agonist's definition; two full agonists help each other. <small>PollEV p.2; (T) 9/28</small></div>
<div class="poll"><b>"Which of the following drugs is a partial agonist?"</b> Epinephrine / Histamine / Albuterol / Acetylcholine / Metoprolol<br>Key: <b>Albuterol</b>. The others are full agonists or, for metoprolol, an antagonist. <small>PollEV p.2; Day 4 ~3; (T) 9/28</small></div>
<div class="poll"><b>"The DRCs below represent the individual DRC of 5 different drugs. DRC "E" most likely represents the DRC of:"</b> NE / Albuterol / Loratadine / Epinephrine<br>Key: <b>Loratadine</b>. E takes the 50% baseline to zero, and loratadine is the only inverse agonist on the list. <small>PollEV p.3; Day 4 ~24; (T) 9/28</small></div>
<div class="poll"><b>Spoken:</b> "if I give you my inverse agonist, where all the receptors are inactive, what would be my baseline?" — 0, and it stays at zero. <small>(T) 9/28</small></div>
<div class="poll"><b>Spoken:</b> "What would you think would happen if I give an antagonist to that person?" (receptors inactive, baseline 0) — a straight line; the neutral drug does not change the balance. <small>(T) 9/24</small></div>

<h4>Traps</h4>
<ul>
<li>Giving a partial agonist negative efficacy or inactive-state preference; it prefers R* like a full agonist. <small>Day 3 ~50–~52; (T) 9/28</small></li>
<li>Expecting a partial agonist to bring a raised baseline to zero; it stops at its own Emax. <small>(T) 9/28</small></li>
<li>Calling a drug that shuts active receptors off an "antagonist"; negative efficacy is an inverse agonist. <small>Day 1 ~28; (T) 9/23</small></li>
<li>Taking a 99% curve as a full agonist on a select-all; "If it's not there, it's not it." <small>Day 3 ~52; (T) 9/28</small></li>
<li>Reading a flat line at 0 as proof of a neutral antagonist; an inverse agonist draws the same line. <small>(T) 9/24, 9/28</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-antag">
<h3 id="guide-3">3. Antagonists</h3>
<h4>What it is</h4>
<ul>
<li>An antagonist interferes with the agonist–receptor interaction. Chemical: binds the agonist itself (dimercaprol, chelators). Physiological: two agonists, two receptors, opposite effects (acetylcholine vs epinephrine, heart). <small>Day 4 ~35; (T) 9/28</small></li>
<li>Pharmacological antagonists: competitive (orthosteric; reversible, surmountable); nonequilibrium-competitive (orthosteric; irreversible, insurmountable); allosteric (allotropic; non-competitive). <small>Day 4 ~36</small></li>
<li>The bond sets the name: covalent = irreversible, insurmountable, non-competitive; ionic, hydrogen, van der Waals = reversible, surmountable, competitive. <small>Day 2 ~15–~16; (T) 9/23</small></li>
<li>Competitive: equal affinity for R and R*, no efficacy, outcompeted by more agonist. Irreversible: covalent, smallest Kd, removes receptors from the pool (phenoxybenzamine). <small>Day 2 ~18; Day 4 ~43–~47, ~51; (T) 9/28</small></li>
<li>Indirect antagonist: acts upstream or downstream of the receptor, not on it; raises the response (caffeine at PDE, reuptake blockers) or lowers it (RAS blocker). <small>Day 2 ~40–~41; (T) 9/23, 9/24</small></li>
</ul>

<h4>How to read it on a curve</h4>
<!--FIG:competitive-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>right (ED50 up)</td><td>0, unchanged</td><td>same</td><td>equal steps, no limit</td><td><b>competitive antagonist</b></td></tr></table>
<p>The reader who stops at "right" cannot separate this from the inverse agonist at a 0 baseline; the unchanged Emax and the equal steps (10× antagonist needs 10× agonist) are what the figure can show. <small>Day 4 ~45–~50; (T) 9/28</small></p>
<!--FIG:irreversible-->
<!--GRAPH:{"curves":[{"label":"alone","ec":0,"emax":100,"dashed":true},{"label":"1x","ec":0.5,"emax":100},{"label":"10x","ec":1,"emax":65},{"label":"100x","ec":1.5,"emax":30},{"label":"1000x","ec":2,"emax":8}],"base":0,"x":"log [agonist]","y":"% of maximal response","caption":"Full agonist alone (dashed) and with rising doses of an irreversible antagonist: shift to the right, baseline unchanged, and Emax falls with each dose until the response can be abolished (Day 4 slides ~52–~54)."}-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>right</td><td>0, unchanged</td><td>down with each dose, to 0</td><td>equal steps</td><td><b>irreversible antagonist</b></td></tr></table>
<p>The first dose can leave the Emax intact when spare receptors remain (agonist needs 10%, antagonist blocks 75%), so early shifts look competitive; the drop with later doses settles it. <small>Day 4 ~51–~56; (T) 9/28</small></p>
<ul>
<li>Emax rule: only the irreversible antagonist and the allosteric antagonist on efficacy lower the Emax; every reversible drug leaves it alone. <small>Day 4 ~21–~22, ~53–~54; (T) 9/28</small></li>
<li>Indirect antagonist that blocks norepinephrine removal: the norepinephrine curve shifts left, same Emax. <small>PollEV p.1; (T) 9/24</small></li>
</ul>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>Looks the same</th><th>The one thing to look at</th><th>Answer</th></tr></thead><tbody>
<tr><td>Chemical vs physiological antagonism</td><td>Is a receptor involved</td><td>No, binds the agonist itself: chemical. Two receptors, opposite effects: physiological</td></tr>
<tr><td>Competitive vs irreversible antagonist (names)</td><td>Which word set</td><td>Reversible, surmountable: competitive. Insurmountable, nonequilibrium, non-competitive: irreversible</td></tr>
<tr><td>Competitive vs irreversible antagonist (curve)</td><td>The Emax after several doses</td><td>Unchanged: competitive. Falls: irreversible</td></tr>
<tr><td>Irreversible vs allosteric antagonist (both non-competitive)</td><td>Can the response reach 0</td><td>Yes, covalent: irreversible. No, saturates, reversible: allosteric</td></tr>
<tr><td>Inverse agonist vs competitive antagonist</td><td>A raised baseline</td><td>Falls to 0: inverse. Unchanged: competitive</td></tr>
<tr><td>Indirect antagonist vs receptor antagonist</td><td>Does it touch the receptor</td><td>No, transporter or cascade; may raise or lower the response: indirect</td></tr>
</tbody></table>
<p class="sub">Day 2 ~15–~16, ~37–~41; Day 4 ~21–~22, ~35–~36, ~43–~55; (T) 9/23, 9/24, 9/28.</p>

<h4>How he asks it</h4>
<!--IMG:pollev-dotted-x-->
<div class="poll"><b>"The dotted line represents the DRC of the agonist alone and the solid lines represent the DRC of the agonist in the presence of increasing doses of drug "X." Drug X is most likely:"</b> A full agonist / A partial agonist / A competitive antagonist / An irreversible antagonist / An allosteric agonist<br>Key: <b>A competitive antagonist</b>. Right, baseline and Emax unchanged; agonists move left or raise the baseline, irreversible would lower the Emax. <small>PollEV p.3; Day 4 ~55; (T) 9/28</small></div>
<!--IMG:pollev-dotted-ne-->
<div class="poll"><b>"The dotted line represents the DRC of norepinephrine alone and the solid lines represent the DRC of the agonist in the presence of increasing doses of drug "X." Drug X is most likely:"</b> Epinephrine / Albuterol / Phenoxybenzamine / Metoprolol / Diazepam<br>Key: <b>Metoprolol</b>, the competitive antagonist on the list; epinephrine full, albuterol partial, phenoxybenzamine irreversible, diazepam allosteric agonist. <small>PollEV p.3; Day 4 ~55; (T) 9/28</small></div>
<div class="poll"><b>"A drug inhibits the major transporter involved in the removal of NE from the neuron synapsis. What effect would have on the potency of that NE?"</b> Decrease / Increase / No change<br>Key: <b>Increase</b>. An indirect antagonist; more norepinephrine stays, so less is needed. <small>PollEV p.1; (T) 9/24</small></div>
<div class="poll"><b>"DRC "B" represents the DRC of NE alone. Which DRC best represent NE in the presence of duloxetine (NET antagonist)?"</b> A / B / C / D / E<br>Key: <b>A</b>: reuptake blocked, norepinephrine more potent, shift left. <small>PollEV (v2) p.5; (T) 9/29</small></div>
<div class="poll"><b>Spoken:</b> "So which drug has the greatest affinity?" (red, yellow, purple, gray drugs) — the one that forms covalent bonds, the irreversible drug. <small>(T) 9/23</small></div>

<h4>Traps</h4>
<ul>
<li>Reading "surmountable" as a property of the irreversible drug; it belongs to the competitive one. <small>Day 4 ~36; (T) 9/23</small></li>
<li>Picking "irreversible" for a right shift with the Emax unchanged; the one best answer is competitive. <small>(T) 9/28</small></li>
<li>Treating "non-competitive" as one mechanism; it is two, a covalent bond or a second site. <small>Day 4 ~36; (T) 9/28</small></li>
<li>Expecting every "antagonist" to lower the signal; caffeine at PDE raises cAMP. <small>Day 2 ~40; (T) 9/23</small></li>
<li>Using Katzung's unchanged EC50 for the irreversible antagonist; the exam uses the lecture: right and down. <small>Day 4 ~53–~54; bank note L04-030</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-allo">
<h3 id="guide-4">4. Orthosteric vs allosteric</h3>
<h4>What it is</h4>
<!--FIG:sites-->
<ul>
<li><b>Orthosteric</b> drugs bind the receptor's own pocket and compete for it: one or the other (phenylephrine, prazosin, phenoxybenzamine). <small>Day 2 ~18; (T) 9/23</small></li>
<li><b>Allosteric</b> drugs bind a second site and change the pocket, so the agonist's affinity, efficacy, both or neither changes: one and the other. <small>Day 2 ~19–~20, ~39, ~44; (T) 9/23</small></li>
<li>Allosteric agonist (PAM) raises the agonist's affinity and/or efficacy; allosteric antagonist (NAM) lowers them, "the negative is the opposite". Non-competitive: the agonist cannot outcompete it. <small>Day 2 ~42–~43; Day 4 ~25, ~37–~38; (T) 9/28</small></li>
<li>Diazepam, the list's allosteric agonist, binds the GABA-A channel away from GABA's pocket, enlarges it, so GABA binds better or longer; alcohol and barbiturates too. <small>Day 2 ~21–~24; (T) 9/23</small></li>
<li>Four characteristics, full agonist plus several doses: affinity yes; efficacy no (already 100%); symmetrical no; saturable yes. All allosterics are reversible here. <small>Day 4 ~30–~34; (T) 9/23, 9/28</small></li>
</ul>

<h4>How to read it on a curve</h4>
<!--GRAPH:{"curves":[{"label":"A","ec":0,"emax":60,"dashed":true},{"label":"aff","ec":-1.2,"emax":60},{"label":"eff","ec":0,"emax":100},{"label":"both","ec":-1.2,"emax":100}],"base":0,"x":"log [agonist A]","y":"% of maximal response","caption":"Partial agonist A alone (dashed) with an allosteric agonist that affects only affinity (shift left, same plateau), only efficacy (no shift, plateau rises to full), or both (left and up) (Day 4 slides ~26–~29)."}-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>left</td><td>0, unchanged</td><td>same</td><td>—</td><td><b>allosteric agonist, affinity only</b></td></tr><tr><td>none</td><td>0, unchanged</td><td>up (partial becomes full)</td><td>—</td><td><b>allosteric agonist, efficacy only</b></td></tr><tr><td>left</td><td>0, unchanged</td><td>up</td><td>—</td><td><b>allosteric agonist, both</b></td></tr></table>
<p>With a full agonist as the reference the efficacy effect is invisible (already at 100%), so "efficacy: no" on his slide is a fact about that figure, not about allosteric agonists. <small>Day 4 ~26–~29, ~32; (T) 9/28</small></p>
<!--GRAPH:{"curves":[{"label":"A","ec":0,"emax":100,"dashed":true},{"label":"aff","ec":1.2,"emax":100},{"label":"eff","ec":0,"emax":50},{"label":"both","ec":1.2,"emax":50}],"base":0,"x":"log [agonist A]","y":"% of maximal response","caption":"Full agonist A alone (dashed) with an allosteric antagonist that affects only affinity (shift right, same Emax), only efficacy (no shift, Emax falls), or both (right and down) (Day 4 slides ~38–~41)."}-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>right</td><td>0, unchanged</td><td>same</td><td>—</td><td><b>allosteric antagonist, affinity only</b></td></tr><tr><td>none</td><td>0, unchanged</td><td>down (full behaves partial)</td><td>—</td><td><b>allosteric antagonist, efficacy only</b></td></tr><tr><td>right</td><td>0, unchanged</td><td>down</td><td>—</td><td><b>allosteric antagonist, both</b></td></tr></table>
<p>Left and down is not on the table: no drug raises affinity while lowering efficacy. <small>Day 4 ~38–~42; (T) 9/28</small></p>
<!--GRAPH:{"curves":[{"label":"A","ec":0.8,"emax":100,"dashed":true},{"label":"+X","ec":0.2,"emax":100},{"label":"+10X","ec":-0.9,"emax":100},{"label":"+100X","ec":-1.25,"emax":100},{"label":"+1000X","ec":-1.32,"emax":100}],"base":0,"x":"log [agonist A]","y":"% of maximal response","caption":"Multiple doses of an allosteric agonist: the steps are unequal (asymmetrical) and stop after enough doses (saturable). The same pattern, mirrored to the right, marks an allosteric antagonist (Day 4 slides ~30–~34)."}-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>left, several doses</td><td>0, unchanged</td><td>same</td><td>unequal steps that stop</td><td><b>allosteric agonist</b> (mirrored right: allosteric antagonist)</td></tr></table>
<p>Equal, unlimited steps would mean an orthosteric competitor; the steps shrink and stop because the second site fills, and its binding does not depend on the agonist. <small>Day 4 ~30–~34, ~48–~50; (T) 9/28</small></p>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>Looks the same</th><th>The one thing to look at</th><th>Answer</th></tr></thead><tbody>
<tr><td>Orthosteric vs allosteric</td><td>Can two drugs be bound at once</td><td>No, one or the other: orthosteric. Yes, one and the other: allosteric</td></tr>
<tr><td>Allosteric agonist on affinity vs efficacy</td><td>Did the plateau rise</td><td>No, moved left: affinity. Yes, no shift: efficacy. Both: left and up</td></tr>
<tr><td>Allosteric antagonist on affinity vs efficacy</td><td>Did the plateau fall</td><td>No, moved right: affinity. Yes, no shift: efficacy. Both: right and down</td></tr>
<tr><td>Allosteric vs competitive shifts</td><td>Step spacing over several doses</td><td>Unequal and stopping: allosteric. Equal, toward infinity: competitive</td></tr>
<tr><td>Allosteric vs irreversible antagonist</td><td>Can the Emax reach 0</td><td>No, saturates: allosteric. Yes, covalent: irreversible</td></tr>
<tr><td>Allosteric agonist vs full agonist as the second drug</td><td>The baseline</td><td>Up: full agonist. Unchanged, unequal steps: allosteric agonist</td></tr>
</tbody></table>
<p class="sub">Day 2 ~18–~24, ~39, ~42–~44; Day 4 ~25–~34, ~37–~41, ~48–~50; (T) 9/23, 9/28.</p>

<h4>How he asks it</h4>
<div class="poll"><b>"Which of the following is CORRECT?"</b> Allosteric agonist compete for the same binding pocket in the receptor / Allosteric agonist have the highest affinity for the orthosteric binding pocket / Phenoxybenzamine has higher affinity than prazosin / In orthosteric interactions, two drugs can be bound at the same time to the receptor / None of the above<br>Key: <b>Phenoxybenzamine has higher affinity than prazosin</b> (covalent). Allosterics bind elsewhere; orthosteric means one at a time. <small>PollEV p.1; (T) 9/23</small></div>
<!--IMG:pollev-abcde-allo-ag-->
<div class="poll"><b>"If DRC "B" is the DRC of an agonist alone, which curve would best represent agonist "B" in the presence of another and allosteric agonist that affect only the affinity?"</b> A / B / C / D / E<br>Key: <b>A</b>: left with the same plateau; C and E change the efficacy, D is less potent. <small>PollEV p.3; Day 4 ~42; (T) 9/28</small></div>
<!--IMG:pollev-abcde-allo-ant-->
<div class="poll"><b>"If DRC "D" is the DRC of an agonist alone, which curve would best represent agonist "D" in the presence of another and allosteric antagonist that affects the affinity and efficacy of D?"</b> A / B / C / D / E<br>Key: <b>E</b>: right and down. C moves left while losing the plateau: "There's no drug in the world that does that." <small>PollEV p.3; Day 4 ~42; (T) 9/28</small></div>
<div class="poll"><b>Spoken:</b> "So is this drug affecting affinity or efficacy?" (full agonist, allosteric agonist) — affinity; efficacy cannot be told at 100%, and the shifts are not symmetrical. <small>(T) 9/28</small></div>

<h4>Traps</h4>
<ul>
<li>"Allosteric agonists compete for the same pocket" or "have the highest affinity for the orthosteric pocket"; they bind elsewhere. <small>PollEV p.1; (T) 9/23</small></li>
<li>"Two drugs bound at the same time" for orthosteric; that is the allosteric case. <small>PollEV p.1; (T) 9/23</small></li>
<li>Picking a curve whose plateau changed for an "affinity only" drug; affinity only moves the curve sideways. <small>PollEV p.3; (T) 9/28</small></li>
<li>Expecting equal steps from an allosteric drug; equal steps are the competitive antagonist's signature. <small>Day 4 ~33, ~48; (T) 9/28</small></li>
<li>Choosing diazepam for a right-shifting figure; the allosteric agonist helps and moves the curve left. <small>PollEV p.3; (T) 9/28</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-dd">
<h3 id="guide-5">5. Drug–drug on one receptor</h3>
<h4>What it is</h4>
<ul>
<li>The question shape: a point of reference (the agonist alone, dotted), then the agonist's curve repeated with one dose of a second drug. <small>Day 3 ~43–~45; Day 4 ~45; (T) 9/28</small></li>
<li>The slide's assumptions: orthosteric; the baseline is known; the agonist's own class (full or partial) is settled first. <small>Day 4 ~45</small></li>
<li>First ask whether the second drug helps or hinders: help = left, hinder = right; then baseline, then Emax. <small>(T) 9/28</small></li>
<li>The reference is a full agonist, because the hormones and neurotransmitters (norepinephrine, epinephrine, acetylcholine) are full agonists. <small>(T) 9/24</small></li>
<li>The same figure returns on the exam with a different question: "learn the principle and apply it". <small>(T) 9/28</small></li>
</ul>

<h4>How to read it on a curve: the six cases</h4>
<h4>Case 1: full agonist + full agonist</h4><div class="pair"><!--FIG:shift-fafa--><!--FIG:shift-fafa-anim--></div>
<!--GRAPH:{"curves":[{"label":"A","ec":0,"emax":100,"dashed":true},{"label":"+B 1e-7","ec":-0.7,"emax":100},{"label":"+B 1e-6","ec":-1.4,"emax":100,"base":40},{"label":"+B 1e-5","ec":-2,"emax":100,"base":80}],"base":0,"x":"log [agonist A]","y":"% of maximal response","caption":"Full agonist A alone (dashed) and with rising doses of a second full agonist B (norepinephrine + Levophed): shift to the left, baseline rises, Emax unchanged (Day 3 slides ~45–~49)."}-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>left</td><td>up once B passes its own threshold</td><td>same</td><td>—</td><td><b>full agonist + full agonist</b></td></tr></table>
<p>The baseline rise is what separates this from an allosteric agonist on affinity; both help, but only the second full agonist has efficacy of its own. <small>Day 3 ~42–~49; (T) 9/28</small></p>
<!--IMG:pollev-abcde-ne-epi-->
<div class="poll"><b>"If DRC B is the DRC of NE binding to the beta 1 receptor alone, which DRC best represents the DRC of NE in the presence of epinephrine?"</b> A / B / C / D / None of the above<br>Key: <b>A</b>. Two full agonists at one receptor make each other more potent: left. <small>PollEV p.3; Day 4 ~3; (T) 9/28</small></div>
<div class="poll"><b>"If DRC B is the DRC of an agonist alone, which DRC would best represent that agonist in the presence of another agonist with similar efficacy?"</b> A / B / C / D / None of the above<br>Key: <b>A</b>. Helpers move left; C, D and E make the agonist less potent. <small>PollEV p.2; (T) 9/28</small></div>

<h4>Case 2: full agonist + partial agonist</h4><div class="pair"><!--FIG:shift-fapa--><!--FIG:shift-fapa-anim--></div>
<div class="pair"><!--FIG:shift-fapa-down--><!--FIG:shift-fapa-down-anim--></div>
<!--GRAPH:{"curves":[{"label":"DA","ec":0,"emax":100,"dashed":true},{"label":"ARI","ec":0.4,"emax":60},{"label":"DA+ARI","ec":0.4,"emax":60,"base":100}],"base":0,"x":"log [drug]","y":"% of maximal response","caption":"Dopamine alone (dashed, Emax 100%), aripiprazole alone (Emax 60%), and aripiprazole given to a manic patient whose dopamine has the system at 100%: the response comes down to 60%, the partial agonist's own efficacy (Day 3 slides ~54–~58; (T) 9/28)."}-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>—</td><td>ends at the partial's own efficacy: up from low, down from high</td><td>reached only by the full agonist alone</td><td>—</td><td><b>full agonist + partial agonist</b></td></tr></table>
<p>A reader expects the pair to reach 100% or fall to 0; it does neither, because the partial agonist competes for the pocket by mass action and does only what it can (dopamine 100% plus aripiprazole 60% ends at 60%; varenicline lifts withdrawal and blunts a cigarette). <small>Day 3 ~54–~58, ~64–~65; (T) 9/28</small></p>
<!--FIG:partial-->

<h4>Case 3: full agonist + inverse agonist</h4><div class="pair"><!--FIG:shift-inverse--><!--FIG:shift-inverse-anim--></div>
<!--GRAPH:{"curves":[{"label":"H","ec":0,"emax":100,"dashed":true,"base":50},{"label":"+L 1e-7","ec":0.6,"emax":100,"base":22},{"label":"+L 1e-6","ec":1.2,"emax":100,"base":0},{"label":"+L 1e-5","ec":1.8,"emax":100,"base":0}],"base":50,"x":"log [histamine]","y":"% of maximal response","caption":"Histamine alone from a 50% baseline (dashed) and with rising doses of loratadine: baseline falls (to about 22%, then 0%), curve shifts right, Emax unchanged; once the baseline is 0 it changes no further (Day 4 slides ~16–~22)."}-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>right</td><td>50 → 22 → 0, then no further</td><td>same</td><td>equal steps, no limit</td><td><b>full agonist + inverse agonist</b></td></tr></table>
<p>The Emax holds because loratadine is reversible and histamine outcompetes it; the slide's "high efficacy agonist" qualifier is not an exception for a full agonist. <small>Day 4 ~13–~22; (T) 9/28; bank note L04-012</small></p>
<div class="poll"><b>"The dotted line represents the DRC of the agonist alone and the solid lines represent the DRC of the agonist in the presence of increasing doses of drug "X." Drug X is most likely:"</b> (dotted curve from a 50% baseline; solid curves start lower, then at 0%, and sit to the right) Metoprolol / Epinephrine / Tropicamide / Loratadine / Histamine<br>Key: <b>Loratadine</b>: baseline to zero, right, Emax kept; metoprolol and tropicamide would leave the baseline alone. <small>PollEV (v2) p.5; (T) 9/29</small></div>

<h4>Case 4: full agonist + competitive antagonist</h4><div class="pair"><!--FIG:shift-competitive--><!--FIG:shift-competitive-anim--></div>
<!--FIG:competitive-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>right (ED50 up)</td><td>0, unchanged</td><td>same</td><td>equal steps, toward infinity</td><td><b>full agonist + competitive antagonist</b></td></tr></table>
<p>At a 0 baseline this is the same picture as the inverse agonist; the equal steps rule out allosteric and the kept Emax rules out irreversible, so competitive is the one best answer. <small>Day 4 ~45–~50; (T) 9/28</small></p>
<!--IMG:pollev-dotted-x-->
<div class="poll"><b>"The dotted line represents the DRC of the agonist alone and the solid lines represent the DRC of the agonist in the presence of increasing doses of drug "X." Drug X is most likely:"</b> A full agonist / A partial agonist / A competitive antagonist / An irreversible antagonist / An allosteric agonist<br>Key: <b>A competitive antagonist</b>; with the drug list, <b>metoprolol</b>. <small>PollEV p.3; Day 4 ~55; (T) 9/28</small></div>

<h4>Case 5: full agonist + irreversible antagonist</h4><div class="pair"><!--FIG:shift-irreversible--><!--FIG:shift-irreversible-anim--></div>
<!--FIG:irreversible-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>right</td><td>0, unchanged</td><td>down with each dose, to 0</td><td>equal steps</td><td><b>full agonist + irreversible antagonist</b></td></tr></table>
<p>Early doses can look competitive while spare receptors last (10% needed, 75% blocked still gives the max); the falling Emax is the only sign, and only this class and the allosteric antagonist on efficacy give it. <small>Day 4 ~51–~56; (T) 9/28</small></p>

<h4>Case 6: full agonist + allosteric agonist or antagonist</h4><div class="pair"><!--FIG:shift-allo-agonist--><!--FIG:shift-allo-agonist-anim--></div><div class="pair"><!--FIG:shift-allo-antagonist--><!--FIG:shift-allo-antagonist-anim--></div>
<!--IMG:pollev-abcde-allo-ag-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>left (affinity)</td><td>0, unchanged</td><td>up only if the agonist was partial</td><td>unequal steps that stop</td><td><b>full agonist + allosteric agonist</b> (poll key A)</td></tr><tr><td>right (affinity)</td><td>0, unchanged</td><td>down if efficacy affected, never to 0</td><td>unequal steps that stop</td><td><b>full agonist + allosteric antagonist</b> (poll key E)</td></tr></table>
<p>Two drugs are bound at once, so the shift does not track the agonist dose; the uneven, saturating steps are the only thing that separates these from the orthosteric classes. <small>Day 4 ~25–~34, ~38–~42; (T) 9/28</small></p>

<h4>The summary strip: every second drug added to a full agonist</h4>
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr>
<tr><td>left</td><td>up (until 100%)</td><td>same</td><td>—</td><td><b>full agonist</b></td></tr>
<tr><td>—</td><td>ends at its own efficacy</td><td>reached only by the full agonist alone</td><td>—</td><td><b>partial agonist</b></td></tr>
<tr><td>right</td><td>down to 0, then no further</td><td>same</td><td>equal steps, no limit</td><td><b>inverse agonist</b></td></tr>
<tr><td>right</td><td>unchanged</td><td>same</td><td>equal steps, no limit</td><td><b>competitive antagonist</b></td></tr>
<tr><td>right</td><td>unchanged</td><td>down, to 0</td><td>equal steps</td><td><b>irreversible antagonist</b></td></tr>
<tr><td>left (affinity)</td><td>—</td><td>up only if the agonist was partial</td><td>unequal, saturable</td><td><b>allosteric agonist</b></td></tr>
<tr><td>right (affinity)</td><td>—</td><td>down if efficacy affected, never to 0</td><td>unequal, saturable</td><td><b>allosteric antagonist</b></td></tr>
</table>
<p class="sub">Day 3 ~42–~49, ~54–~65; Day 4 ~13–~22, ~25–~34, ~38–~42, ~45–~55; (T) 9/28.</p>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>Looks the same</th><th>The one thing to look at</th><th>Answer</th></tr></thead><tbody>
<tr><td>FA + FA vs FA + inverse agonist</td><td>Direction and baseline</td><td>Left, baseline up: full agonist. Right, baseline to 0: inverse</td></tr>
<tr><td>FA + inverse agonist vs FA + competitive antagonist</td><td>A baseline above 0</td><td>Falls: inverse. Unchanged: competitive. At 0 they are the same figure</td></tr>
<tr><td>FA + competitive vs FA + irreversible antagonist</td><td>Emax over several doses</td><td>Kept: competitive. Falls: irreversible</td></tr>
<tr><td>FA + full agonist vs FA + allosteric agonist</td><td>Baseline and step spacing</td><td>Baseline up, equal: full agonist. Unchanged, unequal: allosteric</td></tr>
<tr><td>FA + partial agonist vs FA + inverse agonist</td><td>Where a high baseline ends</td><td>Its own efficacy: partial. Zero: inverse</td></tr>
<tr><td>Classes that change Emax vs classes that do not</td><td>Reversible or not, and efficacy touched</td><td>Only irreversible and allosteric antagonist on efficacy lower it</td></tr>
<tr><td>Drug X = class vs drug X = drug-list name</td><td>Two questions on one figure</td><td>Classify first (competitive), then match (metoprolol)</td></tr>
</tbody></table>
<p class="sub">Day 4 ~21–~22, ~50, ~53–~55; (T) 9/28.</p>

<h4>How he asks it</h4>
<div class="poll"><b>His elimination on the dotted-line poll:</b> a full or allosteric agonist moves left; a partial agonist changes the baseline; irreversible lowers the Emax; the Emax is unchanged, so competitive, "Everybody clicked C as in cat." <small>(T) 9/28</small></div>
<div class="poll"><b>Select-all format:</b> one or two on the exam; never all options, never one. "It's always 2, 3 or 4." <small>(T) 9/28</small></div>
<div class="poll"><b>What is scored:</b> the class (partial, reversible, inverse) and the drug-list name for the same figure. <small>(T) 9/28</small></div>

<h4>Traps</h4>
<ul>
<li>Reading the shift before asking whether the second drug helps or hinders; ask that first. <small>(T) 9/28</small></li>
<li>Calling a right-shifted, same-Emax family "irreversible"; with the shifts shown, competitive is the one best answer. <small>(T) 9/28</small></li>
<li>Expecting the baseline to keep falling below 0 with more inverse agonist; it stops at 0. <small>Day 4 ~21; (T) 9/28</small></li>
<li>Choosing C (left and down) on the allosteric antagonist poll; no drug does that, E is right and down. <small>PollEV p.3; (T) 9/28</small></li>
<li>Knowing the class but not the drug; the same figure is asked both ways. <small>Day 4 ~55; (T) 9/28</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-sig">
<h3 id="guide-6">6. Receptors and signalling</h3>
<h4>What it is</h4>
<ul>
<li>Four receptor classes: ion channels (L-type Ca++, GABA); 7-transmembrane GPCRs (α and β adrenergic, 5HT, histamine); 1-transmembrane (tyrosine kinases); intracellular (steroid hormones). <small>Day 1 ~34–~36; (T) 9/22</small></li>
<li>Ion channels: passive (always open), voltage-gated (open when the membrane potential rises: Ca++), ligand-gated (nicotinic, acetylcholine), pumps (ATP, against the gradient). <small>Day 1 ~39–~48; (T) 9/23</small></li>
<li>G proteins are defined by the α subunit: Gαs → adenylate cyclase → ↑cAMP; Gαi → adenylate cyclase → ↓cAMP; Gαq → phospholipase C → IP3 → Ca++ from the ER. <small>Day 2 ~3; Day 1 ~51–~55; (T) 9/23</small></li>
<li>Vocabulary: signal (drug, hormone, neurotransmitter) → receptor → transducer (G protein) → effector (AC, PLC) → second messenger (cAMP, PKA, PKC, IP3, Ca++) → response. <small>Day 2 ~26–~29; (T) 9/23</small></li>
<li>Examples: β1 heart Gαs (↑ rate); M2 heart Gαi (↓ rate); α2 CNS Gαi; α1 smooth muscle Gαq (vasoconstriction); β1 and M2 share one adenylate cyclase. <small>Day 2 ~3, ~30; (T) 9/23</small></li>
</ul>

<h4>How to read it on a figure</h4>
<!--FIG:superfamilies--><!--FIG:gpcr-->
<ul>
<li>1-TM receptors: binding pocket outside, enzyme inside; the agonist dimerizes two receptors, their tails are phosphorylated, Grb2 → GEF → RAS → RAF → MEK → ERK drives growth. <small>Day 2 ~4–~11; (T) 9/23</small></li>
<li>Nuclear receptors: aldosterone binds the mineralocorticoid receptor, more mRNA for Na+/K+ pumps and channels, sodium saved, potassium wasted, water follows sodium. <small>Day 2 ~12–~14; (T) 9/23</small></li>
<li>Calcium inside the cell is positive: faster SA node, stronger contraction; a calcium channel blocker is negative. <small>(T) 9/23</small></li>
</ul>
<div class="pair"><!--FIG:gpcr-steps--><!--FIG:gpcr-anim--></div>
<div class="pair"><!--FIG:galpha--><!--FIG:galpha-anim--></div>
<h4>How he will ask it (9/30)</h4>
<ul>
<li>No fill in the blanks: which is a second messenger, an effector, a transducer, a signal; what are the steps of transduction. <small>(T) 9/30</small></li>
<li>For Exam 1 the two second messengers to know are cAMP and IP3; cAMP is made by AC and broken down by PDE (caffeine is a PDE inhibitor). <small>(T) 9/30</small></li>
</ul>
<table class="reftab"><thead><tr><th>Component</th><th>Examples he named</th></tr></thead><tbody>
<tr><td>Signal</td><td>Norepinephrine; any drug, hormone, neurotransmitter or toxin that binds and activates the receptor</td></tr>
<tr><td>Receptor</td><td>β1 (norepinephrine binds β1, β2, α1 and α2)</td></tr>
<tr><td>Transducer</td><td>The G protein, defined by its α subunit: αs, αi, αq</td></tr>
<tr><td>Effector ("factor system")</td><td>Adenylate cyclase (AC), phospholipase C (PLC): the two</td></tr>
<tr><td>Second messenger</td><td>cAMP, IP3, Ca++, PKA (anything from cAMP down)</td></tr>
</tbody></table>
<p class="sub">(T) 9/30; Jeopardy IMG_3018; Day 2 ~26–~29; (T) 9/23. The slide counts PKA and PKC as second messengers; the textbook does not; use the slide list.</p>
<p>Forward (Gs at β1):</p>
<ol>
<li>Norepinephrine binds the β1 receptor.</li>
<li>The receptor changes conformation.</li>
<li>GDP comes off the α subunit and GTP binds.</li>
<li>αs separates from β/γ (β and γ stay together).</li>
<li>αs activates adenylate cyclase, the effector.</li>
<li>ATP is converted into cAMP, the second messenger (amplification).</li>
<li>cAMP activates PKA, Ca++ enters, heart rate and contractile force rise.</li>
</ol>
<p>Reverse:</p>
<ol>
<li>PDE breaks down cAMP.</li>
<li>GTPase removes the extra phosphate, GTP → GDP; RGS speeds it.</li>
<li>The α subunit reassociates with β/γ.</li>
<li>The receptor resets; the agonist comes off.</li>
</ol>
<p class="sub">Day 1 ~51–~54; (T) 9/23, 9/30; Jeopardy IMG_3018. The lecture lists the agonist leaving among the ending steps; the textbook says GTP hydrolysis ends it; use the lecture list.</p>
<!--IMG:pollev-gs-cascade-->
<ul>
<li>Left to right on the poll figure: NE at β1 → Gs (yellow dot = the nucleotide swap) → AC → ATP to cAMP → PKA → Ca++ channel and SR Ca++ → contractile force. <small>PollEV p.1; Day 1 ~51–~53</small></li>
<li>Format: matching or ordered combinations of the process; the full word and the acronym are both given. <small>(T) 9/23</small></li>
</ul>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>Looks the same</th><th>The one thing to look at</th><th>Answer</th></tr></thead><tbody>
<tr><td>Gαs vs Gαi vs Gαq</td><td>The effector and the direction</td><td>AC up: Gαs. AC down: Gαi. PLC, IP3, Ca++: Gαq</td></tr>
<tr><td>Transducer vs effector vs second messenger</td><td>Protein class</td><td>G protein: transducer. AC, PLC: effector. cAMP, PKA, PKC, IP3, Ca++: second messenger</td></tr>
<tr><td>Gs (β1, heart) vs Gq (α1, smooth muscle)</td><td>cAMP or IP3</td><td>AC → cAMP → ↑ rate: Gs. PLC → IP3 → Ca++ → constriction: Gq</td></tr>
<tr><td>Four receptor classes</td><td>Membrane crossings</td><td>Channel; 7-TM GPCR; 1-TM kinase; none, intracellular</td></tr>
<tr><td>Passive vs voltage-gated vs ligand-gated vs pump</td><td>What opens it</td><td>Nothing; membrane potential; a ligand; ATP moves ions uphill</td></tr>
<tr><td>Ca++ ion vs Ca++ channel</td><td>Molecule or protein</td><td>The ion is a second messenger; the channel is not</td></tr>
</tbody></table>
<p class="sub">Day 1 ~35–~55; Day 2 ~3–~30; (T) 9/22, 9/23.</p>

<h4>How he asks it</h4>
<div class="poll"><b>"Which of the following opens when the membrane potential becomes more positive?"</b> Passive ion channels / Ligand gated channels / Ion pumps / Ca++ channels / None of the above<br>Key: <b>Ca++ channels</b>, voltage-gated; passive are always open, ligand-gated need a signal, pumps reset. <small>PollEV p.1; (T) 9/23</small></div>
<div class="poll"><b>"Rank the sequence of events from 1st to last"</b> (Gs cascade figure): Binding of drug and receptor / alpha s subunit dissociation / AC activation / Increase levels of cAMP / RGS-mediated hydrolyses<br>Key: <b>binding → αs dissociation → AC activation → ↑cAMP → RGS-mediated hydrolysis</b>; the last step reverses it. <small>PollEV p.1; (T) 9/23</small></div>
<div class="poll"><b>"Which of the following is CORRECT?"</b> G-proteins are defined and regulated by the beta subunit / Phospholipase C (PLC) is an example of a second messenger / Efficacy is defined by the ability of a drug to bind and stay bound to a receptor / The potency of a drug is dependent on the affinity, efficacy and # of receptors / The higher the Kd, the greater the affinity of a drug for the receptor<br>Key: <b>the potency option</b>. The α subunit defines the G protein; PLC is the effector. <small>PollEV p.1; (T) 9/23</small></div>
<div class="poll"><b>Spoken:</b> "What do you think the Gαi is going to do to the activity of the AC?" — inhibit it, less cAMP. <small>(T) 9/23</small></div>
<div class="poll"><b>Spoken:</b> "if I ask which of these is an example of a second messenger" — cAMP; with cAMP and PKA both listed, select all; never the receptor, AC or calcium channel. <small>(T) 9/23</small></div>

<h4>Traps</h4>
<ul>
<li>PLC as a second messenger; it is the effector. <small>PollEV p.1; (T) 9/23</small></li>
<li>The β subunit as the one that defines the G protein; it is α. <small>PollEV p.1; (T) 9/23</small></li>
<li>Giving Gαi phospholipase C or more cAMP; Gαi uses AC in the opposite direction. <small>Day 2 ~3; (T) 9/23</small></li>
<li>Picking the receptor, AC or the calcium channel as a second messenger; pick cAMP, PKA, IP3, Ca++. <small>(T) 9/23</small></li>
<li>Calling the nicotinic receptor voltage-gated; it is ligand-gated (acetylcholine binds two α subunits). <small>Day 1 ~44–~48; (T) 9/23</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-basics">
<h3 id="guide-7">7. Drug basics he tests</h3>
<!--FIG:selectivity-->
<h4>What it is</h4>
<ul>
<li><b>Must know</b> = mechanism of action (MOA: the receptor and the selectivity). <b>Should know</b> = site of action (SOA). Effect, ADR and DDI follow from the two. <small>Day 1 ~7–~8; (T) 9/22</small></li>
<li>Exam 1 tests MOA; Exam 2 adds SOA, ADR, DDI. Not tested: use, dose, route, brand names. <small>Day 1 ~8; (T) 9/28</small></li>
<li>Metoprolol, the worked example: reversible β1 antagonist, heart; slows the rate; ADR bradycardia, fatigue; DDI verapamil, diltiazem, clonidine; β1-selective up to about 200 mg. <small>Day 1 ~9, ~21; (T) 9/22</small></li>
<li>A drug alters an ongoing function (initiates, inhibits, modulates), must reach its site and have affinity; classify by MOA, not structure (thiazide: Na+/Cl− symporter antagonist). <small>Day 1 ~30–~33; Day 2 ~31; (T) 9/22, 9/23</small></li>
<li>Natural dietary supplements: regulated as food, not FDA-tested, cannot claim to treat or cure, natural does not mean safe, patients do not report them. <small>Day 1 ~15–~20; (T) 9/22</small></li>
</ul>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>Looks the same</th><th>The one thing to look at</th><th>Answer</th></tr></thead><tbody>
<tr><td>Must know vs should know</td><td>What it does, or where</td><td>Receptor and selectivity: MOA. Organ: SOA</td></tr>
<tr><td>Safety vs efficacy</td><td>Does the safe drug work</td><td>No: choose efficacy. Equal efficacy: choose the safer</td></tr>
<tr><td>Classify by structure vs by MOA</td><td>Which predicts the effect</td><td>MOA plus SOA (diuresis, hyponatremia, lower pressure); the ring predicts nothing</td></tr>
<tr><td>Loratadine vs diphenhydramine</td><td>How many receptors</td><td>H1 only, inverse agonist: loratadine. H1, H2, muscarinic: diphenhydramine</td></tr>
<tr><td>Pharmacological vs apparent potency</td><td>Route, first-pass, age, absorption, elimination in the list</td><td>Present: apparent. Absent: pharmacological</td></tr>
<tr><td>Selectivity vs dose</td><td>How far above the selective dose</td><td>Larger dose, less selective; start with the smallest effective dose</td></tr>
</tbody></table>
<p class="sub">Day 1 ~7–~9, ~15–~33; (T) 9/22, 9/23.</p>

<h4>How he asks it</h4>
<div class="poll"><b>"Which statement is INCORRECT about natural dietary supplements (NDS)?"</b> Most of NDS packaging labels state that they can cure diseases / NDS are tested by the FDA just like prescription drugs / NDS have been used for centuries, thus are safe &amp; effective / NDS are natural, thus they have a low risk for drug interactions / All of the above<br>Key: <b>All of the above</b>. Every statement is wrong; two certain answers outside a select-all means all of the above. <small>PollEV p.1; Day 1 ~18; (T) 9/22</small></div>
<div class="poll"><b>"Which statement is CORRECT?"</b> The route of administration can affect the potency of a drug / Drugs can bind to a receptor with high affinity than to other receptors / The ability of the drug to reach the site of action can affect it potency / Ion channels are typically expressed on the cell membranes / All the above<br>Key: <b>All the above</b>. <small>PollEV p.1; Day 1 ~24; (T) 9/22</small></div>
<div class="poll"><b>"Which is more important?"</b> Safety / Efficacy / None of the above<br>Key: <b>Efficacy</b> (his position; the highlight on Safety in the file is a student response). <small>PollEV p.1; (T) 9/22; bank note PE-003</small></div>
<div class="poll"><b>"If your patient has fungal pneumonia, which would you chose?"</b> A drug that is very safe, but not efficacious / A drug that is very efficacious, but not as safe<br>Key: <b>very efficacious, but not as safe</b>. The safe topical antifungal does nothing for the pneumonia. <small>PollEV p.1; Day 1 ~26; (T) 9/22</small></div>
<div class="poll"><b>Spoken:</b> "If I give you metoprolol, which is a beta 1 selective antagonist ... what kind of effect is it going to produce?" — slows the heart; bradycardia, fatigue. <small>(T) 9/22</small></div>
<div class="poll"><b>Spoken:</b> "which route has the 100% bioavailability?" — IV; liver metabolism lowers bioavailability. <small>(T) 9/22</small></div>

<h4>Traps</h4>
<ul>
<li>"Natural, thus safe" or "used for centuries, thus safe"; every supplement statement on the poll was wrong. <small>PollEV p.1; (T) 9/22</small></li>
<li>Choosing "very safe but not efficacious" for a fatal infection; choose the drug that works. <small>PollEV p.1; (T) 9/22</small></li>
<li>Swapping MOA and SOA, or expecting brand names, dose or route on Exam 1. <small>Day 1 ~8; (T) 9/22</small></li>
<li>Predicting less urine or more blood volume from a thiazide; sodium out means water out. <small>Day 1 ~33; (T) 9/22</small></li>
<li>Adding an "if" to make an option true; "You're most likely wrong." <small>(T) 9/23</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-drugs">
<h3 id="guide-8">8. The Exam 1 drug list</h3>
<h4>What it is</h4>
<ul>
<li>Fifteen drugs; every one reversible and competitive except phenoxybenzamine, the only irreversible drug. <small>Drug list Table 1; (T) 9/28</small></li>
<li>Only the MOA is tested on Exam 1; the same figure is asked as a class and as a drug name. <small>Day 1 ~8; (T) 9/28</small></li>
</ul>
<!--FIG:classes-->
<table class="reftab"><thead><tr><th>Drug</th><th>Mechanism of action (class at the receptor)</th><th>Receptor family</th><th>Where he uses it</th></tr></thead><tbody>
<tr><td>Norepinephrine (NE)</td><td>α1, α2, β1, β2 agonist (full)</td><td>Adrenergic</td><td>The reference full agonist at β1 (Gs → AC → cAMP → ↑ heart rate); the DRC B alone on the polls; NE + Levophed for FA + FA. <small>Day 1 ~51; Day 3 ~42; PollEV p.3</small></td></tr>
<tr><td>Epinephrine</td><td>α1, α2, β1, β2 agonist (full)</td><td>Adrenergic</td><td>The second full agonist added to NE (key A); physiological antagonist of acetylcholine in the heart. <small>Day 4 ~3, ~35, ~55</small></td></tr>
<tr><td>Phenylephrine</td><td>α1 agonist</td><td>Adrenergic</td><td>The orthosteric agonist on the binding-interaction slide. <small>Day 2 ~18</small></td></tr>
<tr><td>Prazosin</td><td>α1 antagonist (reversible)</td><td>Adrenergic</td><td>The reversible antagonist compared with phenoxybenzamine, which has the higher affinity. <small>Day 2 ~18, ~37; PollEV p.1</small></td></tr>
<tr><td>Phenoxybenzamine</td><td>α1 and α2 antagonist (<b>irreversible</b>, covalent)</td><td>Adrenergic</td><td>The only irreversible drug; highest affinity, smallest Kd; the irreversible distractor on the dotted-line poll. <small>Day 2 ~18; Day 4 ~51, ~55; PollEV p.1, p.3</small></td></tr>
<tr><td>Metoprolol</td><td>β1 antagonist (reversible)</td><td>Adrenergic</td><td>The must-know MOA example (β1-selective up to ~200 mg); drug X on the dotted-line poll. <small>Day 1 ~9; Day 4 ~55; PollEV p.3</small></td></tr>
<tr><td>Albuterol</td><td>β2 partial agonist</td><td>Adrenergic</td><td>Keyed as the partial agonist on the PollEV p.2 drug poll; airways need not open 100%. <small>Day 3 ~53; PollEV p.2, p.3</small></td></tr>
<tr><td>Pindolol</td><td>β1 and β2 partial agonist</td><td>Adrenergic</td><td>The partial β-blocker on review page 11: low heart rate up, high rate down. <small>Drug list Table 1; Review p.11</small></td></tr>
<tr><td>Acetylcholine (ACh)</td><td>Agonist at muscarinic (M1, M2, M3) and nicotinic (Nn, Nm) receptors</td><td>Cholinergic</td><td>Ligand of the nicotinic channel (two α subunits, Na+ in); M2 in the heart is Gαi; physiological antagonist of epinephrine. <small>Day 1 ~44–~48; Day 2 ~30; Day 4 ~35</small></td></tr>
<tr><td>Tropicamide</td><td>Muscarinic (M1, M2, M3) antagonist (reversible)</td><td>Cholinergic</td><td>A neutral-antagonist distractor on the loratadine dotted-line poll. <small>Drug list Table 1; PollEV (v2) p.5</small></td></tr>
<tr><td>Varenicline</td><td>Nicotinic (Nn) partial agonist</td><td>Cholinergic</td><td>The dual-nature example: lifts withdrawal, outcompetes a cigarette's nicotine. <small>Day 3 ~53, ~64–~65</small></td></tr>
<tr><td>Histamine</td><td>H1 and H2 agonist (full)</td><td>Histamine</td><td>The full agonist in FA + inverse agonist (histamine + loratadine). <small>Day 4 ~13–~15; PollEV p.2</small></td></tr>
<tr><td>Loratadine</td><td>H1 inverse agonist (selective)</td><td>Histamine</td><td>The one inverse agonist to know; curve E in Figure 1; added to histamine: right, baseline to 0, Emax same. <small>Day 1 ~29; Day 4 ~13–~24; PollEV p.3</small></td></tr>
<tr><td>Diphenhydramine</td><td>Non-selective histamine receptor antagonist (H1, H2, muscarinic)</td><td>Histamine</td><td>The non-selective contrast to loratadine. <small>Day 1 ~29</small></td></tr>
<tr><td>Diazepam</td><td>GABA-A receptor allosteric agonist (positive allosteric modulator)</td><td>GABA</td><td>The allosteric agonist to know; enlarges the GABA pocket, more chloride in; allosteric distractor on the dotted-line poll. <small>Day 2 ~21–~24; Day 4 ~55; PollEV p.3</small></td></tr>
</tbody></table>
<p class="sub">Exam_1_Drug_List_2026.pdf Table 1 (MOA and family columns); lecture cites in the last column.</p>

<h4>Drugs he uses that are not on the list</h4>
<ul>
<li>Levophed: synthetic norepinephrine, a full agonist; the FA + FA example. <small>Day 3 ~42; (T) 9/28</small></li>
<li>Dopamine (full) and aripiprazole (partial, 60%): FA + partial agonist in a manic patient. <small>Day 3 ~54–~56; (T) 9/28</small></li>
<li>Caffeine, milrinone (PDE), SSRIs, SNRIs, cocaine, -stigmines, carbidopa, a RAS-blocking cancer drug: indirect antagonists. <small>Day 2 ~40–~41; Part 2 p.4–13</small></li>
<li>Aspirin, omeprazole, clopidogrel, organophosphates: covalent binders. Dimercaprol: chemical antagonist. <small>Day 2 ~15; Day 4 ~35</small></li>
<li>Buprenorphine, oxymetazoline, pilocarpine: partial agonists on the Day 3 table; alcohol and barbiturates: allosteric agonists at GABA-A; cetirizine: inverse agonist. <small>Day 3 ~53; Day 2 ~21–~23; Day 4 ~23</small></li>
</ul>

<h4>How he asks it</h4>
<div class="poll"><b>"Which of the following drugs is a partial agonist?"</b> Epinephrine / Histamine / Albuterol / Acetylcholine / Metoprolol → <b>Albuterol</b>. <small>PollEV p.2; (T) 9/28</small></div>
<div class="poll"><b>"DRC "E" most likely represents the DRC of:"</b> NE / Albuterol / Loratadine / Epinephrine → <b>Loratadine</b>. <small>PollEV p.3; (T) 9/28</small></div>
<div class="poll"><b>"The dotted line represents the DRC of norepinephrine alone ... Drug X is most likely:"</b> Epinephrine / Albuterol / Phenoxybenzamine / Metoprolol / Diazepam → <b>Metoprolol</b>. <small>PollEV p.3; (T) 9/28</small></div>
<div class="poll"><b>"Phenoxybenzamine has higher affinity than prazosin"</b> → the correct option. <small>PollEV p.1; (T) 9/23</small></div>
<div class="poll"><b>"Which of the following is an irreversible antagonist?"</b> Phenylephrine / Prazosin / Diazepam / Phenoxybenzamine / None of the above → <b>Phenoxybenzamine</b>. <small>PollEV p.6; (T) 9/30</small></div>

<h4>Traps</h4>
<ul>
<li>Knowing the class but not the drug; learn the list with the class. <small>(T) 9/28</small></li>
<li>Treating prazosin, metoprolol or tropicamide as irreversible; only phenoxybenzamine is. <small>Drug list Table 1; (T) 9/28</small></li>
<li>Calling loratadine an antagonist; it is the inverse agonist, it lowers a raised baseline to 0. <small>Day 4 ~23–~24; (T) 9/28</small></li>
<li>Reading diazepam as an agonist that moves a curve on its own; it changes what GABA does. <small>Day 2 ~21–~24; (T) 9/23</small></li>
<li>Reading Levophed as a different class from norepinephrine; it is synthetic norepinephrine, equal efficacy. <small>Day 3 ~42; (T) 9/28</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-day5">
<h3 id="guide-9">9. Day 5: spare receptors, regulation, quantal, TI</h3>
<p class="sub">Cites: <i>Part 2 p.N</i> = Pharmacodynamics Day 4 &amp; 5, Part 2 deck (page markers are real); <i>(T) 9/29</i> = the 9/29 transcript. Exam facts he gave: about 50 questions, 2 points each.</p>

<h4>Spare receptors: what it is</h4>
<!--FIG:spare-->
<ul>
<li>100% effect can come from less than 100% binding: catecholamines bind about 10% of the heart's β receptors for the maximal rate. <small>Part 2 p.1; (T) 9/29</small></li>
<li>Occupying more than the needed fraction adds nothing; an irreversible antagonist must block past the spare pool before the Emax falls. <small>(T) 9/29</small></li>
<li>Many receptors: agonist more potent, antagonist less potent, irreversible antagonist looks competitive at first. Few: agonist less potent, antagonist more potent, Emax drops faster. <small>Part 2 p.2–3</small></li>
<li>"more receptors, better for the agonist. Less receptors, better for the antagonist". The body changes the spare pool with what the patient takes (regulation). <small>Part 2 p.17; (T) 9/29</small></li>
</ul>

<h4>Indirect antagonists: what it is</h4>
<ul>
<li>An indirect antagonist acts upstream or downstream of the receptor, never on it; reversible or irreversible. <small>Part 2 p.4; (T) 9/29</small></li>
<li>Upstream, raising the neurotransmitter: SSRIs (fluoxetine, SERT), SNRIs (duloxetine), cocaine (NE transporter), -stigmines (acetylcholinesterase), carbidopa (gut dopa enzyme): curve left, same Emax. <small>Part 2 p.9–13, 31</small></li>
<li>Downstream: a PDE inhibitor (milrinone, caffeine) keeps cAMP up, so a partial agonist can act full; a RAS blocker cuts the cascade: right, Emax down. <small>Part 2 p.5–8</small></li>
<li>Efficacy does not change with a reuptake blocker: "Still serotonin. You didn't change the drug." <small>Part 2 p.11; (T) 9/29</small></li>
<li>Addition: result equals the sum (trimethoprim + sulfamethoxazole). Synergism: more than the sum (penicillin + gentamicin). Potentiation: no effect alone (carbidopa + dopa). Drug names are FYI. <small>Part 2 p.30–31; (T) 9/29</small></li>
</ul>
<h4>Indirect antagonists: where each drug acts</h4>
<div class="pair"><!--FIG:ind-snri--><!--FIG:ind-snri-anim--></div>
<div class="pair"><!--FIG:ind-ssri--><!--FIG:ind-ssri-anim--></div>
<div class="pair"><!--FIG:ind-ache--><!--FIG:ind-ache-anim--></div>
<div class="pair"><!--FIG:ind-carbidopa--><!--FIG:ind-carbidopa-anim--></div>
<div class="pair"><!--FIG:ind-pde--><!--FIG:ind-pde-anim--></div>
<div class="pair"><!--FIG:ind-ras--><!--FIG:ind-ras-anim--></div>
<h4>Addition, synergism, potentiation (Part 2 pages 30–31)</h4>
<div class="pair"><!--FIG:enhance--><!--FIG:enhance-anim--></div>
<!--IMG:pollev-abcde-duloxetine-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>B → left</td><td>0, unchanged</td><td>same</td><td>—</td><td><b>A</b> = NE + duloxetine (reuptake blocker); also another full agonist or an allosteric agonist on affinity</td></tr><tr><td>B → right</td><td>0, unchanged</td><td>same</td><td>—</td><td><b>D</b> = NE + competitive antagonist, or allosteric antagonist on affinity only</td></tr><tr><td>B → right</td><td>0, unchanged</td><td>down</td><td>—</td><td><b>C or E</b> = NE + irreversible antagonist (how far depends on spare receptors), or allosteric antagonist on affinity and efficacy</td></tr></table>
<p>The reader picks D for duloxetine by reading "antagonist"; a reuptake blocker helps norepinephrine, so it moves left with the same Emax, and he ran every other class on this figure aloud. <small>PollEV (v2) p.5; (T) 9/29</small></p>

<h4>Receptor regulation: what it is</h4>
<ul>
<li>Receptors are regulated by synthesis and degradation, covalent modification, association with regulatory proteins, and relocation into the cell. <small>Part 2 p.16, 21</small></li>
<li>Up-regulation follows chronic reduction of stimulation (antagonist, inverse agonist, denervation, thyroid hormone); down-regulation follows chronic agonist exposure: the body does "the opposite". <small>Part 2 p.17, 19; (T) 9/29</small></li>
<li>Up-regulation makes a full agonist more potent and can make a partial agonist full; stopping a β-blocker suddenly risks a hypertensive crisis, so taper. <small>Part 2 p.18–19; (T) 9/29</small></li>
<li>Rapid desensitization (milliseconds): GRK phosphorylates the agonist-bound receptor, β-arrestin binds, cAMP stops; reversible when the drug leaves; receptor number unchanged. <small>Part 2 p.22–24; (T) 9/29</small></li>
<li>Long-term down-regulation: β-arrestin leads the receptor into coated pits, endocytosis, then recycling or lysosomal degradation; tolerance (opioids, Afrin, cocaine) and myasthenia gravis. <small>Part 2 p.20, 25–29; (T) 9/29</small></li>
</ul>
<h4>Receptor regulation: the receptor at each step</h4>
<div class="pair"><!--FIG:desens-rapid--><!--FIG:desens-rapid-anim--></div>
<div class="pair"><!--FIG:desens-long--><!--FIG:desens-long-anim--></div>
<div class="pair"><!--FIG:upreg--><!--FIG:upreg-anim--></div>
<div class="pair"><!--FIG:downreg--><!--FIG:downreg-anim--></div>
<!--FIG:reg-chain-->

<h4>How to read it on a curve</h4>
<!--GRAPH:{"curves":[{"label":"high","ec":-1.5,"emax":100},{"label":"mid","ec":0.2,"emax":75},{"label":"low","ec":1.4,"emax":30}],"base":0,"x":"log [agonist]","y":"fractional response (%)","caption":"One agonist in three tissues of falling receptor density (Part 2 page 28): with fewer receptors the ED50 moves right (about 10^-7 to 10^-4.5 to 10^-3.5 on his slide) and the maximal response falls, the same picture as an irreversible antagonist."}-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>right as density falls</td><td>0, unchanged</td><td>down</td><td>—</td><td><b>fewer receptors</b> (down-regulation), the irreversible antagonist's picture</td></tr></table>
<p>The handwritten "shift left" on page 26 is a slip; fewer receptors need more drug, so the curve moves right and the maximum falls. <small>Part 2 p.25–28; (T) 9/29</small></p>
<!--GRAPH:{"curves":[{"label":"FA","ec":0,"emax":100,"dashed":true},{"label":"FA up","ec":-1.1,"emax":100},{"label":"PA","ec":0.6,"emax":55,"dashed":true},{"label":"PA up","ec":-0.3,"emax":100}],"base":0,"x":"log [agonist]","y":"% of maximal response","caption":"Up-regulation (Part 2 page 18): a full agonist (dashed) becomes more potent (shift left); a partial agonist (dashed) gains potency and/or maximal response, up to a full response when there are enough receptors to bind."}-->
<table class="readstrip"><tr><th>Shift</th><th>Baseline</th><th>Emax</th><th>Symmetry</th><th>Answer</th></tr><tr><td>left</td><td>0, unchanged</td><td>same (full agonist)</td><td>—</td><td><b>up-regulation</b>, full agonist</td></tr><tr><td>left</td><td>0, unchanged</td><td>up, can reach full (partial agonist)</td><td>—</td><td><b>up-regulation</b>, partial agonist</td></tr></table>
<p>This is the "more receptors" case of the mysterious drug Y poll: a partial made full by receptor number, not by a change in the drug. <small>Part 2 p.18; (T) 9/29, 9/30</small></p>

<h4>Quantal responses, therapeutic index, safety index: what it is</h4>
<ul>
<li>Graded response: one biological unit, a scale from no effect to maximum. Quantal: a population, all or none (alive or dead). <small>Part 2 p.32–33; (T) 9/29</small></li>
<li>Quantal data: a bar graph of responders per dose gives a normal distribution; the cumulative form gives a sigmoid for comparing drugs in a population. <small>Part 2 p.33–34; (T) 9/29</small></li>
<li>TI = LD50 / ED50 (dose killing 50% over dose treating 50%); the larger, the safer. Phenobarbital 40/4 = 10; alprazolam 2500; textbook figure 160/10 = 16. <small>Part 2 p.35, 39–40; (T) 9/29</small></li>
<li>SI = LD1 / ED99 reads the tails; a safe drug has ED99 below LD1. Slide figure: TI 100/0.1 = 1000 but SI 1/10 = 0.1. <small>Part 2 p.42; (T) 9/29</small></li>
<li>The TI is per effect ("No drug produces a single effect": codeine, cough vs pain); the therapeutic window is a concentration range, not a ratio. <small>Part 2 p.41, 43; (T) 9/29</small></li>
</ul>

<h4>How to read it on a curve</h4>
<!--FIG:graded-quantal--><!--FIG:quantal-->
<!--IMG:pollev-quantal-ti-->
<ul>
<li>y-axis: percent of individuals responding (cumulative); x-axis: dose. Draw the 50% line: the left curve gives the ED50, the right curve the LD50; divide. <small>Part 2 p.39–40; (T) 9/29</small></li>
<li>Then the tails: ED99 on the effect curve against LD1 on the lethal curve; if they touch or cross, people die before everyone is treated. <small>Part 2 p.42; (T) 9/29</small></li>
<li>The farther the ED50 from the LD50, the larger the TI. The exam figure will not label either value. <small>(T) 9/29</small></li>
</ul>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>Looks the same</th><th>The one thing to look at</th><th>Answer</th></tr></thead><tbody>
<tr><td>Many spare receptors vs few</td><td>Who gets stronger</td><td>Many: agonist. Few: antagonist, and Emax drops fast</td></tr>
<tr><td>Indirect antagonist vs allosteric drug</td><td>Does it bind the receptor</td><td>No, transporter, enzyme or cascade: indirect. A second site on the receptor: allosteric</td></tr>
<tr><td>Up-regulation vs down-regulation</td><td>What the patient took chronically</td><td>Antagonist: up, curve left. Agonist: down, curve right, tolerance</td></tr>
<tr><td>Rapid vs long-term regulation</td><td>Does the receptor leave the surface</td><td>No, GRK and β-arrestin: rapid. Endocytosis, coated pits: long-term</td></tr>
<tr><td>Graded vs quantal response</td><td>What the y-axis counts</td><td>Percent of maximal effect: graded. Percent of individuals: quantal</td></tr>
<tr><td>Therapeutic index vs safety index</td><td>Midpoints or tails</td><td>LD50/ED50: TI. LD1/ED99: SI; both must be large</td></tr>
<tr><td>Therapeutic index vs therapeutic window</td><td>A ratio or a range</td><td>Ratio of doses: TI. Range of concentrations: window</td></tr>
<tr><td>Addition vs synergism vs potentiation</td><td>The result against the sum, and whether both act alone</td><td>Equal: addition. More: synergism. One inactive alone: potentiation</td></tr>
<tr><td>Effect vs side effect</td><td>What is being treated</td><td>Same MOA, both predictable (sildenafil, minoxidil, codeine)</td></tr>
</tbody></table>
<p class="sub">Part 2 p.1–4, 16–35, 39–44; (T) 9/29.</p>

<h4>How he asks it</h4>
<div class="poll"><b>"Which statement is CORRECT?"</b> If one gets exposed to too much activation by an agonist, the body is most likely to up-regulate the receptors / Short term regulation of receptors involves relocation of receptors into the cells / Indirect antagonist are allosteric drugs that bind at another site in the receptor, but the orthosteric site / Decreasing the number of receptors may lead to decrease in the potency of an agonist<br>Key: <b>Decreasing the number of receptors may lead to decrease in the potency of an agonist</b>. Agonist down-regulates; relocation is long-term; indirect antagonists bind upstream or downstream. <small>PollEV (v2) p.5; (T) 9/29</small></div>
<div class="poll"><b>"Which statement is CORRECT?"</b> Increasing the number of receptors may increase the potency of a drug / Beta arrestin is involved in rapid receptor desensitization / Endocytosis of receptors is part of the long term receptor down-regulation / Tolerance to a drug effect is a product of receptor down-regulation / All of the above<br>Key: <b>All of the above</b>. <small>PollEV (v2) p.5; (T) 9/29</small></div>
<div class="poll"><b>"What is the TI of this drug?"</b> (hypnosis and death curves, µg/kg) .25 / 1 / 4 / 100 / 400<br>Key: <b>4</b> = LD50 400 / ED50 100; .25 is the ratio inverted, 1 is about LD1/ED99. <small>PollEV (v2) p.5; (T) 9/29</small></div>
<!--IMG:pollev-quantal-safe-->
<div class="poll"><b>"Is this drug safe?"</b> Yes / No<br>Key: <b>No</b>. The LD1 sits at about the ED99: people die before everyone is treated. <small>PollEV (v2) p.5; (T) 9/29</small></div>
<div class="poll"><b>"DRC "B" represents the DRC of NE alone. Which DRC best represent NE in the presence of duloxetine (NET antagonist)?"</b> A / B / C / D / E<br>Key: <b>A</b>. Indirect antagonist, reuptake blocked, norepinephrine more potent: left. <small>PollEV (v2) p.5; (T) 9/29</small></div>
<div class="poll"><b>Spoken (TI = 16 figure):</b> "is this drug safe?" — barely; at the maximal dose it is close to killing. With equal efficacy, give the drug with more room. <small>(T) 9/29</small></div>
<div class="poll"><b>How he will ask it:</b> five drugs with their TI values, which is safest and which most toxic; a figure where the ED50 and LD50 must be found and divided, with the inverted ratio among the options. <small>(T) 9/29</small></div>

<h4>Traps</h4>
<ul>
<li>"Too much agonist → the body up-regulates"; agonist down-regulates, antagonist up-regulates. <small>PollEV (v2) p.5; (T) 9/29</small></li>
<li>"Short term regulation involves relocation into the cell"; relocation is long-term, short-term is β-arrestin. <small>PollEV (v2) p.5; (T) 9/29</small></li>
<li>Inverting the TI (ED50/LD50 = 0.25) or reading the tail ratio as the TI; TI = LD50/ED50. <small>PollEV (v2) p.5; (T) 9/29</small></li>
<li>Calling a drug safe from a large TI alone; check the SI, ED99 must be below LD1. <small>Part 2 p.42; (T) 9/29</small></li>
<li>Expecting an indirect antagonist to change efficacy; a reuptake blocker shifts left with the same Emax. <small>Part 2 p.11; (T) 9/29</small></li>
</ul>
</section>

`;
