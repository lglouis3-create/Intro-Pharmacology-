const GUIDE_HTML = `
<h2>Guides</h2>
<p class="sub">One guide per exam concept: what to know, how he tests it, and the figure that shows it.</p>
<p class="sub">Cites: <i>Day 1</i> = 9/22 deck, <i>Day 2</i> = 9/23, <i>Day 3</i> = 9/24, <i>Day 4</i> = 9/28 (slide numbers marked ~ were counted from the deck text and may be off by one or two); <i>(T)</i> = his words in the lecture transcript of that date; <i>PollEV</i> = his Poll Everywhere pages with his keys.</p>
<nav class="guidenav">
<a href="#g-curves">10 How to tackle a curve question (9/30 review)</a>
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
<h3>10. How to tackle a curve question (his 9/30 review)</h3>
<p class="sub">Cites: <i>Review p.N</i> = the "PD Review" deck posted 9/30 (Pharmacodynamics reviews.pdf, page N); <i>Jeopardy 9/30 (IMG_xxxx)</i> = the Jeopardy screenshots, keys from what he said in class; <i>(T) 9/30</i> = his words in the 9/30 lecture transcript.</p>
<h4>What it is</h4>
<ul>
<li>Find the drug alone first. "This is our point of reference. This is what happens with nothing ... This is gonna be kind of like when you look at those pictures that you got to stare at it and then something kind of eventually pops up, right? So the first thing that you're staring at is the B. This is the drug by itself." <small>(T) 9/30; Review p.3</small></li>
<li>Then one question before anything else: "is it gonna help or make life more difficult?" Helping = the curve moves left (more potent): full agonist, allosteric agonist, an indirect antagonist that raises the signal, more receptors. Making life difficult = the curve moves right: competitive (reversible) antagonist, inverse agonist, irreversible antagonist, allosteric antagonist. "So who can we eliminate? A, right, because A is helping, is making it more potent. C, D, and E are less potent." <small>(T) 9/30; Review p.3, p.8–9</small></li>
<li>The three questions, written in red on his slide: 1) Shift? (a shift right = ↓ potency = ↑ ED50); 2) Δ to baseline?; 3) Δ to Emax? "Remember that I asked you to ask 3 questions. What are those questions? ... ED 50, you got baseline and shifts." <small>Review p.5; (T) 9/30</small></li>
<li>Shift right rules out "full agonists and an allosteric agonist ... because those who shift to the left". Shift left rules out the irreversible antagonist ("it'll shift to the right, not to the left"), the allosteric antagonist, the competitive antagonist and the inverse agonist. <small>(T) 9/30; Review p.5, p.8</small></li>
<li>Baseline down to 0 = inverse agonist ("Where is it going? To 0. What it means is, it's an inverse agonist"). Baseline up = a drug with its own efficacy (a second full or partial agonist; pindolol "is bringing things up"). A baseline that starts at 0 "didn't help us much ... because the baseline is at what, at 0, so you can't differentiate much". <small>(T) 9/30; Review p.5, p.7, p.11</small></li>
<li>Emax down = irreversible antagonist (or an allosteric antagonist that affects efficacy): "Where is it going? It's going down. So if it's going down, who can it be? Irreversible, right? Because both inverse and reversible are competitive. They will never affect the Emax." Emax up (a partial becomes full) = allosteric agonist on efficacy, a PDE (phosphodiesterase) inhibitor that raises cAMP, or more receptors. <small>(T) 9/30; Review p.5, p.10</small></li>
<li>The fourth question, only when several shifts are drawn: are the shifts symmetrical? Equal steps that keep going = competitive ("the shifts are very close to each other in distances"); unequal steps = allosteric. "If you see a figure in your exam that the shifts are not symmetric, you already know it's allosteric. You just gotta be able to figure out, is that an agonist or an antagonist? Does it affect affinity or efficacy or both." With a single shift: "You can't ask about symmetry because you don't have multiple shifts, so that doesn't help you." <small>(T) 9/30; Review p.6, p.10</small></li>
<li>What each axis holds: "when it comes to affinity, what would you be measuring affinity at? ... The X axis, right, left and right. When we think about efficacy ... Up and down, and our potency is gonna be a combination of the left and right and the up and down ... we're gonna measure that by calculating the ED 50 ... Affinity is based on the bonds that the drug is gonna form. Efficacy is how we change that receptor." <small>(T) 9/30</small></li>
<li>How specific the stem is decides whether there is one answer or a select-all: "if I give you a very specific question, you should be able to eliminate everybody. But if I lead a little broad, now you have a select all." Select-all questions: "which I'm not gonna ask a lot of them, 2 or 3 max". <small>(T) 9/30</small></li>
<li>Knowing the drug on the list is a shortcut past the three questions: "if you knew that phenoxybenzamine is an irreversible antagonist, you could bypass all that and get the correct answer." <small>(T) 9/30; Jeopardy 9/30 (IMG_9320)</small></li>
<li>On the wordy stems: "I'm giving you verbatim, and if you can draw it, then you can get it right, right? So, when you exam, draw it out. So that you know what is, you know, right or wrong." <small>(T) 9/30</small></li>
</ul>

<h4>How to read it on a figure</h4>
<!--IMG:rev-rt-figure-->
<ul>
<li>"The dose response curve in the left is my drug A alone, so that's a point of reference ... the ones on the right is in the presence of another drug, drug C." Shift? "Yes, it's requiring higher and higher doses, so it's shifting to the right, so who can I eliminate? Full agonists and an allosteric agonist that affects efficacy ... you went from have a best of 5 to a best of 3." <small>Review p.5; (T) 9/30</small></li>
<li>Baseline? "No, it didn't help us much because the baseline is at what, at 0, so you can't differentiate much." <small>Review p.5; (T) 9/30</small></li>
<li>Emax? "Definitely. Where is it going? It's going down. So if it's going down, who can it be? Irreversible, right? Because both inverse and reversible are competitive. They will never affect the Emax." Symmetrical? "As best as it could be draw ... It is sort of." <small>Review p.5; (T) 9/30</small></li>
<li>Key: <b>irreversible antagonist</b>. Crossed out on the slide: competitive/reversible antagonist, inverse agonist, allosteric agonist (efficacy), full agonist. <small>Review p.5</small></li>
</ul>
<!--IMG:rev-shifts-base0-->
<ul>
<li>A dashed is the agonist alone; A+B, A+10X B, A+100X B step to the right in equal steps from a 0 baseline with the same top. Shift right → "I already can eliminate those two possibilities" (the two agonists). <small>Review p.6; (T) 9/30</small></li>
<li>Baseline? "No, so it doesn't help us much." Emax? "To the best of my drawing, no, right? So who can eliminate? An allosteric antagonist that affects efficacy. Because there's no change to the efficacy and an irreversible antagonist." <small>Review p.6; (T) 9/30</small></li>
<li>What the figure cannot separate: "Because my baseline is 0, the inverse wants to keep at 0, and the competitive doesn't care if it's 0 or not." Symmetrical? "[Yes, so] that can't be allosteric, right? Because as best as they can draw, the shifts are very close to each other in distances." <small>Review p.6; (T) 9/30</small></li>
<li>Key: <b>a) competitive antagonist</b> (the options run a) competitive antagonist … g) allosteric agonist, affinity only). <small>Review p.6</small></li>
</ul>
<!--IMG:rev-shifts-base50-->
<ul>
<li>Same options; now A dashed starts at a 0.5 baseline, A+B starts near 0.3, A+10X B near 0.1, A+100X B at 0, same top. "Is it shifting? Yes, so we're gonna take these two guys out." <small>Review p.7; (T) 9/30</small></li>
<li>"It is changing the Emax. No, so irreversible and any drug that affects efficacy is out, right?" <small>Review p.7; (T) 9/30</small></li>
<li>"Is a change in the baseline? Yes. Where is it going? To 0. What it means is, it's an inverse agonist ... Is as symmetrical to the best of my drawing ability." <small>Review p.7; (T) 9/30</small></li>
<li>Key: <b>b) inverse agonist</b>. <small>Review p.7</small></li>
</ul>
<!--IMG:rev-dotted-left-->
<ul>
<li>"The solid is the DRC of the agonist alone. The dotted line is the DRC of the agonist in the presence of drug X. Drug X is most likely:" — the dotted curve sits to the LEFT, same top, baseline 0. "Is it shifting, but it's shifting to the left. So that's helping." <small>Review p.8; (T) 9/30</small></li>
<li>"Can we eliminate irreversible antagonists? Yeah, because it'll shift to the right, not to the left. Can I eliminate an allosteric antagonist that affects affinity and efficacy? Yes, because shifting to the left, not the right." <small>Review p.8; (T) 9/30</small></li>
<li>"Is the baseline changing? No, so that doesn't really help much ... because we're shifting to the left, I can get rid of the competitive antagonist and the inverse." <small>Review p.8; (T) 9/30</small></li>
<li>Key: <b>full agonist AND allosteric agonist (affinity)</b>, two smileys on the slide: "I have two possible answers. It's either full agonist. Or an allosteric agonist that affecting what, affinity." <small>Review p.8; (T) 9/30</small></li>
</ul>
<!--IMG:rev-dotted-right-->
<ul>
<li>"The dotted is the DRC of the agonist alone. The solid line is the DRC of the agonist in the presence of drug X." ONE shift to the RIGHT, same top, baseline 0. "All it takes to shift that arrow, and now I have a new question for you. But the thought process is the same." <small>Review p.9; (T) 9/30</small></li>
<li>"Is it shifting? Yes. So now it's shifting to the right, so it's making life bad for my agonist, full agonists and allosteric [agonists] are gone. Is changing the baseline. I'm already at 0, so I won't be able to tell that, right? ... partial agonists are out there." <small>Review p.9; (T) 9/30</small></li>
<li>"Is the change of the Emax? No, based on the information that I gave you, so it's not an allosteric antagonist [that] affects affinity and efficacy, but could it be either one of those three? All I gave you is one shift ... What if this drug has high efficacy? You only need 1% of the receptors to produce the max response ... Could I get some shift before I see that drop happening? Yes." <small>Review p.9; (T) 9/30</small></li>
<li>"If this was one best answer ... no way it would be irreversible, right? If you had to pick. It has to be either competitive or inverse. But if it's a select all, now I open up the possibilities. I just need more shifts to be able to prove that it is or it is not ... I have to give you more information to be able to do that." A select-all could also add "an allosteric antagonist that affects only affinity? That's another option right there". <small>Review p.9; (T) 9/30</small></li>
<li>Key: competitive/reversible antagonist, inverse agonist and irreversible antagonist all left open on the slide; crossed out: allosteric antagonist (affinity/efficacy), full agonist, partial agonist, allosteric agonist. <small>Review p.9</small></li>
</ul>
<!--IMG:rev-allo-ant-->
<ul>
<li>Dotted agonist alone, three solid curves to the right with UNEQUAL spacing, same top. "Is the Emax changing? No, so I can get rid of irreversible because you know I have multiple shifts, right, and it hasn't dropped at all, or an allosteric that affects efficacy." <small>Review p.10; (T) 9/30</small></li>
<li>"Is it shifting, yes, so I get rid of who? Full agonist and allosteric agonist, because those who shift to the left. Is the baseline changing? No." <small>Review p.10; (T) 9/30</small></li>
<li>"Is it symmetrical? To the best of my drawing capacity is not, right? So who that could be? An allosteric antagonist that affects what, affinity. Right, because the shifts are not symmetrical." <small>Review p.10; (T) 9/30</small></li>
<li>Key: <b>allosteric antagonist (affinity)</b>. Crossed out: competitive, inverse, irreversible, allosteric antagonist (affinity and efficacy), full agonist, allosteric agonist. <small>Review p.10</small></li>
</ul>
<!--IMG:rev-pindolol-->
<ul>
<li>Two dashed curves on one plot: when the system starts at 100% (upper) pindolol brings the response down to about 50; when it starts at 0 (lower) it brings it up to about 50. Prompts on the slide: Does this drug have efficacy? Did it bring the efficacy to zero? Did Δ efficacy go to 100%? <small>Review p.11</small></li>
<li>"Does this drug has efficacy? Yes, it's bringing things up, right? So it has some positive efficacy for that. So we got rid of those guys that are neutral because they will not change the baseline." <small>Review p.11; (T) 9/30</small></li>
<li>"Did it go to 0? No, so we get rid of an inverse agonist, because an inverse agonist will bring everything down to 0 or keep at 0 if it's 0. Did it change the efficacy to 100%. Definitely not. They want you about 50%, so that is a partial agonist." <small>Review p.11; (T) 9/30</small></li>
<li>Key: <b>partial agonist</b>. The clinical use: "If your patient has a naturally low heart rate, putting them on a beta blocker may put them at a higher risk for stopping their heart, especially when they're asleep, when the parasympathetic takes over ... Pindolol, which is a partial beta blocker, if your heart is too low, it's gonna bring things up. If it's too high, it's gonna bring things down. So this is a drug that we can use for the treatment of hypertension with patients who have a very low heart rate." <small>Review p.11; (T) 9/30</small></li>
</ul>
<!--IMG:pollev-abcde-similar-->
<ul>
<li>The recap figure (Response, Percent of Control vs [Agonist, M], 10⁻⁹ to 10⁻³): A and B reach full height, C ends near 75, D full, E ends near 75; left to right A, B, C, D, E. "They all compete for the same receptor, but would you agree with me that they require different doses to produce equivalent responses?" <small>Review p.3; (T) 9/30</small></li>
<li>1. Highest potency: <b>A</b>. "Whoever has the smallest ED 50. It's gonna be the most potent because it's gonna require the smallest effective dose to produce 50% of the response ... A being your most potent drug, E being your least potent drug." <small>Review p.3; (T) 9/30</small></li>
<li>2. Lowest efficacy: <b>C and E</b>. "They're both producing the same effect on those response curves. However, C has a great affinity than E does ... I can do it at a much lower dose because affinity is greater in C than E is." <small>Review p.3; (T) 9/30</small></li>
<li>3. Highest affinity: <b>A</b>, "because it's the further to the left". <small>Review p.3; (T) 9/30</small></li>
<li>4. B + a reversible competitive surmountable antagonist: <b>D</b>. "Who can we eliminate? A, right, because A is helping ... C, D, and E are less potent. Now I know that C and E, there has been a drop in the ability to get to the max response. And because this drug is reversible, it's competitive, it's surmountable. I can always outcompete just by giving more drug. D as in David would be the best answer because there's no change to the Emax." <small>Review p.3; (T) 9/30</small></li>
<li>5. E + an allosteric agonist: "E is my drug alone. It's a partial agonist ... you should be saying, well, Doctor Gottlieb, it depends ... if I say an allosteric agonist that only affects affinity. Now there's one best answer which is <b>C</b>, right? I'm just moving to the left. If I say that affects affinity and efficacy, now <b>A, B, and D</b> would be a right answer. So select all ... both A, B, and D has shifted to the left and also went from being a partial to a full agonist." <small>Review p.3; (T) 9/30</small></li>
<li>Also, D to E: "could be irreversible or an allosteric antagonist that affects affinity and efficacy." <small>(T) 9/30</small></li>
</ul>
<!--IMG:pollev-figure1-->
<ul>
<li>Exp 1, R = R*: five drugs given separately from a 50% baseline. "My starting point is 50%. I have receptors that are 50% active by themselves and 50% inactive by themselves. So I'm going to give each drug separately ... instead of I have 5 figures, I have all in one figure." <small>Review p.4; (T) 9/30</small></li>
<li>A = full agonist ("it gets to the max response, right of 100%"); B = partial agonist ("efficacy of what? 75, 80%"); C = antagonist ("this drug is not changing the balance between active and inactive receptors ... it's kinda neutral, so that's probably an antagonist ... has no efficacy at this point"); D = "a partial agonist that has what kind of efficacy? 25%, right? Because the baseline is above what he wants to do ... They can behave as an agonist, but they can also behave as an antagonist by competing with the agonist for those binding pockets"; E = inverse agonist (goes to 0). <small>Review p.4; (T) 9/30; Jeopardy 9/30 (IMG_3010)</small></li>
<li>Reading the slide he first called E "Irreversible"; on the Jeopardy question with the same figure he keyed E as "an inverse agonist that brings everything down to zero" and said competitive and irreversible antagonists "don't change the baseline". Use inverse agonist for E. <small>(T) 9/30; Jeopardy 9/30 (IMG_3010)</small></li>
<li>"Could C be a partial agonist? Could it be a partial agonist who has efficacy of 50%? So it doesn't matter if he's bound or unbound, he's doing whatever the system is doing, right?" Yes, it could; "It's a competitive based on the information that I gave you. I have to give you more in order for me to get a more detailed answer." <small>Review p.4 ("6. Could C be a partial agonist?"); (T) 9/30</small></li>
<li>The two-cell-line version: "What if in the exam I say Figure 1 is 5 drugs in a system that has 50% of the receptors active, 50% inactive. Figure 2 is the same drugs in a different cell line that now the majority of the receptors are inactive ... Could you say with certainty that C was a partial agonist? ... Yes ... If I ask you in your exam and I give you that figure and say which of these drugs are partial agonists, select all <b>B, C, and D</b>, right? You can't say on the one on the left, if I don't give you more information." <small>(T) 9/30</small></li>
</ul>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>Figure that looks the same</th><th>What separates them</th></tr></thead><tbody>
<tr><td>One shift right from a 0 baseline: competitive vs inverse vs irreversible</td><td>Competitive and inverse cannot be told apart ("the inverse wants to keep at 0, and the competitive doesn't care"); one best answer is one of those two, "no way it would be irreversible". Irreversible stays possible only on a select-all, because a high-efficacy drug with spare receptors can shift before the Emax drops; more shifts settle it. An allosteric antagonist on affinity only is a further select-all option.</td></tr>
<tr><td>Several shifts right, same Emax: symmetrical vs not</td><td>Equal steps that keep going = competitive (reversible) antagonist; unequal, saturating steps = allosteric ("you already know it's allosteric"). Then decide agonist vs antagonist by direction and affinity vs efficacy by Emax.</td></tr>
<tr><td>Flat line at a 50% baseline: antagonist vs partial agonist with 50% efficacy</td><td>From one figure "it's a competitive based on the information that I gave you"; the same drug in a cell line where most receptors are inactive would rise to 50% if it is a partial agonist and stay flat if it is an antagonist (then select all B, C, D as partial agonists).</td></tr>
<tr><td>Shift left: full agonist vs allosteric agonist (affinity) vs indirect antagonist that raises the signal vs more receptors</td><td>All move the curve left. A second full agonist raises the baseline; an allosteric agonist does not and its shifts are unequal; a PDE inhibitor raises cAMP so "your signal got bigger" and a partial can become full; more receptors make the drug "behave more potent" (and a partial can reach the max). On the "mysterious drug Y" poll, with a partial-to-full shift left, the key was <b>All of the above</b>.</td></tr>
<tr><td>Allosteric antagonist vs indirect antagonist</td><td>"Allosteric binds to the receptor but at a different site of it"; "drugs that bind downstream or upstream from the receptor, those are indirect antagonists" (Prozac at the serotonin transporter, SERT; a phosphodiesterase inhibitor).</td></tr>
<tr><td>Full agonist vs inverse agonist: affinity for R* vs R</td><td>"Full agonist has the highest affinity for that receptor that are active because they wanna keep them active. The inverse has the highest affinity for receptor that are inactive, and they wanna keep them inactive."</td></tr>
<tr><td>Prozac at 5HT (indirect antagonist) vs allosteric agonist on 5HT</td><td>Prozac only raises the concentration of serotonin: "it's still serotonin. You didn't change the drug ... if serotonin was a partial agonist here, it's going to be a partial agonist there too" (same plateau, shifted left); an allosteric agonist on affinity and efficacy could also raise the plateau.</td></tr>
</tbody></table>
<p class="sub">Sources: Review p.4, p.6, p.9–10; (T) 9/30; Jeopardy 9/30 (IMG_9314, IMG_9317, IMG_9321).</p>

<h4>How he asks it</h4>
<!--IMG:pollev-five-drc-->
<div class="poll"><b>"DRC "C" is the DRC of an 5HT alone, which DRC would represent "5HT" in the presence of prozac, a 5HT transporter antagonist (SERT)?"</b> A / B / C / D / E<br>Key: <b>A</b>. He said "the stem for this question is wrong. So, it's an SSRI [selective serotonin reuptake inhibitor]" that blocks the reuptake of serotonin. Point of reference: C (plateau at the middle height). Help or hurt? "What is gonna happen to the levels of serotonin? It's gonna go up. So immediately you could assume that it's gonna make more potent, right? So we can eliminate C, D, and E." Shift left; baseline same; Emax: "why is A and not B? ... It's an indirect antagonist, right? Prozac is binding to the transporter, so it's not directly affecting the receptor signal, and it's still serotonin. You didn't change the drug. So if serotonin was a partial agonist here, it's going to be a partial agonist there too, because you didn't change the number of receptors. You just changed the concentration of the drug." B reaches the top, so B is out; A keeps C's plateau and sits to its left. <small>Jeopardy 9/30 (IMG_9314); (T) 9/30</small></div>
<div class="poll"><b>"An allosteric antagonist"</b> Competes for the orthosteric site / Can increase the efficacy of a partial agonist / Can decrease the affinity of an agonist for its receptor / Is a drug the binds downstram from the receptor and decreases the response<br>Key: <b>Can decrease the affinity of an agonist for its receptor</b>. "An allosteric antagonist would compete for an orthosteric site. No, they bind someplace else, right? Can increase the efficacy of a partial agonist. It's an antagonist. It's going to decrease it, not make it better. Can decrease the affinity of an agonist for its receptor. Probably so. Is a drug that binds downstream, that will be an indirect antagonist, right? Drugs that bind downstream or upstream from the receptor, those are indirect antagonists. Allosteric binds to the receptor but at a different site of it." The class polled C; the player answered D and lost the points. <small>Jeopardy 9/30 (IMG_9317); (T) 9/30</small></div>
<div class="poll"><b>"Which of the following is CORRECT?"</b> cAMP is an example of an effector system / G-proteins are defined and regulated by the alpha subunit / PLC is an example of a second messanger / In order for g-proteins to dissociate from the receptor, the GTP has to be released<br>Key: <b>G-proteins are defined and regulated by the alpha subunit</b>. "A G protein, remember they're gonna be defined by the alpha subunit. It's alpha S, alpha I, alpha Q. That's how we define our G proteins. G protein dissociation from the receptor is not the GTP, it's the GDP, right? It's the diphosphate comes off, the triphosphate comes in, so you have more phosphate, more energy, that's what causes them to ... dissociate." cAMP (cyclic AMP) is a second messenger, not an effector; PLC (phospholipase C) is an effector, not a second messenger. The player answered D. <small>Jeopardy 9/30 (IMG_9318); (T) 9/30</small></div>
<div class="poll"><b>"What effect an inverse agonist would have on a full agonist DRC? Assume that the tissue has 50% of receptor present in the active state (R = R*)."</b> It would decrease the ability of a full agonist to reach its Emax / It would decrease the baseline and shift the DRC to the right / It would shift the DRC of the agonist to the left and increase the baseline / It would decrease the ED50 value of the agonist, but it will increase its efficacy / It would evoke non-symmetrical shifts to the right and change the efficacy of an agonist<br>Key: <b>It would decrease the baseline and shift the DRC to the right</b>. "You have a tissue in which 50% of the receptors are active and 50% are inactive, right? Where's your baseline at? 50%. If we give that drug, the full agonist, you go up, the inverse brings you down to zero. That's what they do by themselves. But if we do them together ... It would decrease the baseline because that's what the inverse wants to do. And we shifted those responses of my agonist to the right, because they are competing with each other, it's gonna require a higher dose to overcome that drug." "Decrease the ability ... to reach its Emax" is the irreversible antagonist's answer ("inverse and reversible are competitive. They will never affect the Emax"); "non-symmetrical shifts ... and change the efficacy" is the allosteric antagonist's answer; left and baseline up is a second agonist. <small>Jeopardy 9/30 (IMG_9319); (T) 9/30</small></div>
<!--IMG:jeop-abcde-effect-->
<div class="poll"><b>"If the DRC "B" is the DRC of NE alone and DRC "D" is the agonist in the presence of phenoxybenzamine, drug "X" is most likely:"</b> Competitive antagonist / Irreversible antagonist / Full agonist / Allosteric agonist / Partial agonist<br>Key: <b>Irreversible antagonist</b>. Point of reference B; D is to the right and lower. "This drug is shifting to the right and lowering the Emax, which it means it can't be a competitive, it can't be a full, it can't be allosteric, and it can't be a partial because it's not raising the baseline of that drug, right? So, but if you knew that phenoxybenzamine is an irreversible antagonist, you could bypass all that and get the correct answer." "You didn't really need the figure for it, but that kinda helps in one way or the other." <small>Jeopardy 9/30 (IMG_9320); (T) 9/30</small></div>
<div class="poll"><b>"The solid line is my drug alone. The dotted line is the presence of this mysterious drug, drug Y, most likely what?"</b> (poll after the review; the dotted curve is to the left and goes from a partial to a full response) an indirect antagonist that increases the second messenger levels / an allosteric agonist that affects affinity and efficacy / diazepam / the same drug in a cell that has high expression of receptors / All of the above<br>Key: <b>All of the above</b>. "Could this be an indirect antagonist that increases the second messenger levels? What if it's a PDE inhibitor that increases the levels of cAMP? Now your signal got bigger. And now you went from being a partial to being a full agonist ... Could this be an allosteric agonist that affects affinity and efficacy? Yes. Could it be this diazepam. What is diazepam? An allosteric agonist that could affect the affinity and efficacy of our drug. Same drug, but in a cell that has high expression of receptors. What happens when we increase the number of receptors? We increase the potency of a drug ... if you knew at least 2 of those answers, you go where? All the above." "You can't ask about symmetry because you don't have multiple shifts." The option wording is as he read it; the slide is not in the review deck. <small>(T) 9/30</small></div>
<table class="reftab"><thead><tr><th>Jeopardy stem (verbatim)</th><th>Key</th><th>Why (his words)</th></tr></thead><tbody>
<tr><td>Which of these DRC would best represent the DRC of an antagonist? [Figure 1, 50% baseline] A / B / C / D / E</td><td>C</td><td>"Why is not E? Because that will be an inverse agonist that brings everything down to zero. Competitive antagonists or irreversible neutral, they don't change the baseline. My baseline is at 50%, it's staying at 50%." The player said E. <small>IMG_3010</small></td></tr>
<tr><td>Which drug has the lowest efficacy [five curves A–E; D plateaus lowest] A / B / C / D / E / Two correct answers</td><td>D</td><td>"Everybody chose D. Is that the correct answer? It is ... I changed the question ... D as in dog was the lowest one." (On the recap figure C and E tie, hence the "Two correct answers" option.) <small>IMG_3011</small></td></tr>
<tr><td>Drug C is most likely: [Figure 1] Norepinephrine / Loratadine / Diazepam / Metoprolol / Histamine</td><td>Metoprolol</td><td>"B and D will be a partial agonist ... albuterol ... Diazepam is your GABA allosteric agonist, which will not have an effect. Histamine and Norepinephrine will be your full agonist, will be A. Loratadine will be E, the inverse agonist. So C, based on information, will be a competitive antagonist, metoprolol would be the best answer." <small>IMG_3012</small></td></tr>
<tr><td>This figure shows 4 DRCs for 1 drug (X) alone or in the presence of another drug. If curve B is drug X alone, which curve would be X in the presence of an agonist with equal efficacy? A / B / C / D / All the above</td><td>A</td><td>"What would you classify drug B as? A full agonist, right? So when I say a drug that has equal efficacy, we're looking at the presence of another full agonist ... if it's two full agonist, it's gonna move to the left, which is going to make it more potent." <small>IMG_3013</small></td></tr>
<tr><td>Dotted line is Drug A alone, solid lines is A in the presence of increasing concentrations of B. B is: [equal steps right, same top] Competitive antagonist / Irreversible antagonist / Full agonist / Allosteric agonist / Partial agonist</td><td>Competitive antagonist</td><td>"It's shifting the dose to the right without affecting the baseline or the Emax. Thus cannot be irreversible. It can't be allosteric agonist or full agonist or partial agonist, so it has to be competitive antagonist." <small>IMG_3014</small></td></tr>
<tr><td>Which drug has the lowest affinity? [A–E, Effect vs Log [Agonist]] A / B / C / D / E</td><td>E</td><td>"E as in elephant ... that's a concept everybody seems to get." The furthest right. <small>IMG_3015</small></td></tr>
<tr><td>In order to bind to a receptor, a drug needs: Affinity / Efficacy / Positive charges / Be metabolized / Be an orthosteric agonist</td><td>Affinity</td><td>"A as in Albert? Oh, Apple ... Is that correct? It is correct." <small>IMG_3016</small></td></tr>
<tr><td>An irreversible antagonist is more likely: To only form hydrogen bonds / Enhance the potency of a partial agonist / Increase the baseline and shift the DRC to the left / Decrease the ability of an agonist to reach Emax</td><td>Decrease the ability of an agonist to reach Emax</td><td>"It will decrease the ability of agonists to get to the Emax because you're removing, you're down regulating the receptors chemically." <small>IMG_3017</small></td></tr>
<tr><td>Walk me through the G-protein signaling pathway (each team member one step forward, then backward)</td><td>Forward and reverse steps (see guide 6)</td><td>"We got the displacement of the GDP, the diphosphate, and it's replaced with GTP ... ATP gets converted into cAMP, which is our second messenger and then cAMP is going to do what, cell signaling and then that's going to cause a physiological response ... How do we reverse that? ... PDE breaking down the cAMP ... the actual phosphate is removed. So we go from a GTP to a GDP ... the alpha reassemble with the beta and the gamma and the receptor kind of pops up." <small>IMG_3018</small></td></tr>
<tr><td>Efficacy: Is a measure of the chemical bonds a drug-receptor forms / Is measured in the X-axis / Is inversely proportional to the Kd / Is a stimulus measured in the Y-axis</td><td>Is a stimulus measured in the Y-axis</td><td>Practice question: "efficacy is the stimulus measure in the Y-axis, right?" <small>IMG_9313</small></td></tr>
<tr><td>Which of the following is most likely an irreversible antagonist? Drug A (Kd =100 nmol) / Drug B (Kd =50 μmol) / Drug C (Kd =2 mmol) / Drug D (Kd =300 mol)</td><td>Drug A (Kd = 100 nmol)</td><td>"It's irreversible. It's gonna form covalent bonds, which means it's gonna get the what, the smallest Kd, right? ... If you have a nano, it's 10 to the -9, which would be the correct answer." <small>IMG_9315</small></td></tr>
<tr><td>Which drug is the most potent? [A–E, Effect vs Log [Agonist]] A / B / C / D / E</td><td>A</td><td>"Because it has the smallest ED 50. It does require the smallest dose to produce equivalent responses." <small>IMG_9316</small></td></tr>
<tr><td>Which of the following drugs would have the highest affinity for receptors present in the inactive state? Full agonist / Partial agonist / Inverse agonist / Competitive antagonist / Indirect antagonist</td><td>Inverse agonist</td><td>"Full agonist has the highest affinity for that receptor that are active because they wanna keep them active. The inverse has the highest affinity for receptor that are inactive, and they wanna keep them inactive, right? So you guys got a little bit flip-flop on that." The player said A. <small>IMG_9321</small></td></tr>
<tr><td>(PollEV, before the review) Which of the following is an irreversible antagonist? Phenylephrine / Prazosin / Diazepam / Phenoxybenzamine / None of the above</td><td>Phenoxybenzamine</td><td>"100% say phenoxybenzamine, that's the only one that is irreversible, right, that you have to learn so far. So that makes it easier for you to remember." <small>PollEV p.6 (updated 10/01); (T) 9/30</small></td></tr>
</tbody></table>
<p class="sub">Sources: Jeopardy 9/30 screenshots IMG_3010–3018, IMG_9313–9321 (keys from the transcript); PollEV p.6; (T) 9/30. "One of the questions that we asked yesterday is gonna be on your exam verbatim ... Maybe different orders of A, B, C, D and E."</p>

<h4>Traps</h4>
<ul>
<li>Calling E "irreversible" on the 50% figure (the player's E on the antagonist question, and his own first read of the slide): an irreversible antagonist "don't change the baseline"; a curve that falls to 0 is the inverse agonist. <small>Jeopardy 9/30 (IMG_3010); Review p.4; (T) 9/30</small></li>
<li>Picking "binds downstream from the receptor" for the allosteric antagonist: that is the indirect antagonist; the allosteric antagonist "binds to the receptor but at a different site of it" and decreases affinity. <small>Jeopardy 9/30 (IMG_9317); (T) 9/30</small></li>
<li>"GTP has to be released" for the G protein to dissociate: it is the GDP that comes off ("the diphosphate comes off, the triphosphate comes in"). <small>Jeopardy 9/30 (IMG_9318); (T) 9/30</small></li>
<li>Flipping which drug prefers R vs R*: the full agonist binds the active receptors, the inverse agonist the inactive ones ("you guys got a little bit flip-flop on that"). <small>Jeopardy 9/30 (IMG_9321); (T) 9/30</small></li>
<li>Picking B (the curve that reaches the top) for 5HT + Prozac: raising the concentration of a partial agonist does not change its plateau; "you just changed the concentration of the drug". <small>Jeopardy 9/30 (IMG_9314); (T) 9/30</small></li>
<li>Calling a single right shift "irreversible" when one best answer is asked: "no way it would be irreversible ... It has to be either competitive or inverse." <small>Review p.9; (T) 9/30</small></li>
<li>Answering "antagonist" with certainty for a flat line at 50% when a second cell line is given: with the second figure, C can be shown to be a partial agonist. <small>Review p.4; (T) 9/30</small></li>
<li>Changing an answer on the exam: "even though you're gonna have backwards navigation, do not change your initial answer, because that's your freshest that your mind is ... stick to your gut." <small>(T) 9/30</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-aep">
<h3>1. Affinity, efficacy, potency</h3>
<h4>What it is</h4>
<ul>
<li><b>Affinity</b> is "how likely a drug is to bind and stay bound to a receptor", and it depends on the bonds the drug forms: covalent, ionic, hydrogen, van der Waals. <small>Day 2 slide ~55 ("attraction of ligand for receptor; dependent on Kd"); (T) 9/23 "affinity is how likely a drug is to bind and stay bound to a receptor, and the binding ... is going to be depending on what type of bonds they form"</small></li>
<li><b>Efficacy</b> is "the ability of that drug to change the receptor behavior. It's activity, its state from active to inactive or inactive to active"; it can be positive (activating) or negative (shutting receptors down). <small>Day 1 slide ~38 key; (T) 9/23; (T) 9/22 "Some drugs are going to be activating receptors so they have positive efficacy. Others are going to be shutting down the receptors so they have negative efficacy."</small></li>
<li><b>Potency</b> depends on three things: affinity, efficacy, and the tissue (site of action, number of receptors). The poll key reads "affinity, efficacy and # of receptors"; the slide reads "Affinity, Efficacy, Tissue (Site of Action)"; in class he said "the affinity, the efficacy, and the receptor which binds you". All three say the same triad; the poll wording is the one he reuses. <small>Day 2 slides ~52–~54; Day 3 slide ~7; PollEV p.1; (T) 9/23; (T) 9/22 "depending on their affinity and the efficacy and how many receptors are being expressed, we can have the potency of a drug"</small></li>
<li>Potency is <b>measured</b> by the EC50 or ED50, the concentration (EC50) or dose (ED50) that produces 50% of the maximal response; the smaller it is, the greater the potency ("inversely proportional"). <small>Day 2 slides ~56–~58; Day 3 slide ~22 "ED50/EC50↓ = ↑Potency"; (T) 9/24 "the smallest the ED50 is or the EC50, the greater the potency is gonna be. They're inverse proportional."</small></li>
<li>The <b>dissociation constant (Kd)</b> is the concentration that binds 50% of the receptors: Kd = [R][A]/[AR], the rate of coming apart over the rate of coming together; the smaller the Kd, the greater the affinity. His worked numbers: 9 free drug × 9 free receptors / 1 complex = 81; 1 × 1 / 9 = 0.11 (the 0.11 drug has the greater affinity). <small>Day 2 slides ~45–~50; Day 3 slide ~3; (T) 9/24 "the smaller the [Kd] is, the greater the affinity is going to be"</small></li>
<li>Kd comes from a <b>binding</b> study, not from an effect; the law of mass action says the more drug or the more receptors, the greater the chance of binding. <small>Day 2 slide ~45; (T) 9/24 "the more I have either of the receptors or the more I have either the drug, the greater the capacity of binding"</small></li>
<li><b>Emax</b> (maximal response, the ceiling) has two possible reasons: all receptors are occupied, or the physiological system is maxed out. <small>Day 3 slides ~14, ~21; (T) 9/24 "All the receptors are occupied or I max out the physiological system"</small></li>
<li><b>EC50 vs ED50</b>: "philosophically identical"; EC50 is a concentration (in vitro, a dish or organ he controls), ED50 is a dose (in vivo, where absorption, distribution, metabolism and excretion (ADME) affect how much reaches the site). <small>Day 3 slides ~8, ~21; (T) 9/24</small></li>
<li><b>Pharmacological potency</b> (the slide list): tissue sensitivity, receptor number, receptor activity, affinity, efficacy. <b>Apparent potency</b> adds pharmacokinetics: age, absorption, distribution, elimination, drug–drug interactions (DDI). "Apparent" because "it's not the total concentration of the drug" that reaches the receptor. <small>Day 1 slides ~22–~23, ~27; (T) 9/22</small></li>
<li>Slide and transcript disagree on one label: the slide puts ADME under <i>apparent</i> potency, while in class he asked "does [ADME] affect the pharmacological potency of a drug? Yes or no? Yes." The slide grouping is the one for the exam. <small>Day 1 slide ~27; (T) 9/22; bank note L01-015</small></li>
<li>Units are part of the answer: milli = 10<sup>−3</sup>, micro = 10<sup>−6</sup>, nano = 10<sup>−9</sup>; 100 nM = 1 × 10<sup>−7</sup> M. <small>(T) 9/24 "What is micro? What is the value? 10-6, nano is 10-9, milli is 10-3"; "C has 100 [nanomoles], which is 1 to -9 ... you have 1 times 10 to -7"</small></li>
</ul>

<h4>How to read it on a curve</h4>
<!--FIG:drc-basic-->
<!--FIG:binding-kd--><!--FIG:bonds-->
<ul>
<li>x-axis = dose (log scale), the independent variable; y-axis = response as a percent of the maximum, the dependent variable. <small>Day 3 slides ~16–~18; (T) 9/24 "I have an independent variable, which is the dose ... on the x axis"</small></li>
<li>The y-axis is normalized (percent change, not raw beats per minute) because starting points differ between people: "My resting heart rate may be 60 beats per minute, yours may be 70 ... So now I can compare apples with apples." <small>Day 3 slide ~18; (T) 9/24</small></li>
<li>Affinity is read <b>left/right on the x-axis</b>; efficacy is read <b>up/down on the y-axis</b>; potency is the combination of the two. <small>(T) 9/24 "Affinity is gonna be on the bottom, efficacy is gonna be on the Y axis, and potency is gonna be a combination of the two"</small></li>
<li>On a <b>binding curve</b> the x-axis value at 50% bound is the Kd; the curve furthest left has the smallest Kd and the highest affinity. <small>Day 2 slide ~50; (T) 9/24 "Drug C because it requires less dose to bind 50% of the receptors"</small></li>
<li>On a <b>dose–response curve (DRC)</b> the x-axis value at 50% of that drug's own Emax is its EC50/ED50. Kd is also on an x-axis, "but it's not taking account of the effect of the drug." <small>Day 3 slides ~20–~22, ~29; (T) 9/24</small></li>
<li>Threshold = the dose below which there is no response; slope = the linear mid-section, "the greatest change in the response with the smallest change in the dose"; a steep slope goes "from having no effect at all to max it out all the way on the top". <small>Day 3 slide ~21; (T) 9/24</small></li>
</ul>
<!--FIG:potency-->
<!--FIG:efficacy-->
<ul>
<li><b>Same Emax, different position:</b> the curve on the left needs less drug for the same response, so it has the greater affinity and is the more potent. <small>Day 3 slides ~17, ~22–~23; (T) 9/24 "what makes A more potent than B and C? Because they have a greater affinity"</small></li>
<li><b>Same EC50, different Emax:</b> with tissue and affinity held constant, the drug with the greater efficacy is the more potent (his rule; the textbook would call this greater efficacy, not potency; the exam uses the lecture rule). <small>Day 3 slide ~27 "↑Efficacy = ↑Potency"; (T) 9/24 "Why would A be more potent than B? Because it has greater efficacy"; bank note L03-028</small></li>
<li>Relative potency = ED50 of B / ED50 of A; his example is 1000×. "Math is gonna be minimal." <small>Day 3 slide ~23; (T) 9/24</small></li>
<li>A partial agonist can be the most potent drug on the figure (smallest EC50) while a full agonist is the most efficacious (highest plateau); which one is wanted "depends on the effect that you may want". <small>(T) 9/24 four-drug figure: "A [most potent] ... B and D [most efficacious]"</small></li>
<li><b>More receptors, same drug:</b> the curve shifts left and the drug appears more potent; Kd, affinity and efficacy of the drug did not change, the tissue did. <small>Day 3 slide ~7; (T) 9/24 "if that was a graph, right, would that shift to the left? Correct."; "We didn't change the drug. It's the same drug, same KD. Now it just have more receptors available"</small></li>
<li>"If they look the same, they are the same": no microscope needed on the figure. <small>(T) 9/24</small></li>
</ul>
<!--FIG:spare-->
<ul>
<li>Spare receptors: an agonist may need only a fraction of the receptors (his example, 10%) for the maximal response, so the response curve sits left of the binding curve; this is why an irreversible antagonist takes several doses before Emax falls. <small>Day 4 slide ~56; (T) 9/28 "my agonist, only requires 10% of the receptors to produce the max response"</small></li>
</ul>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>X vs Y</th><th>What separates them</th></tr></thead><tbody>
<tr><td>Affinity vs efficacy</td><td>Affinity: bind and stay bound (bond type). Efficacy: change the receptor's state (positive or negative). "The ability to bind and stay bound, that's affinity."</td></tr>
<tr><td>Kd vs EC50/ED50</td><td>Kd: concentration binding 50% of receptors (binding only, no effect). EC50/ED50: concentration/dose giving 50% of the response (potency). Both on an x-axis.</td></tr>
<tr><td>EC50 vs ED50</td><td>Concentration (in vitro) vs dose (in vivo, ADME changes apparent potency). Philosophically the same.</td></tr>
<tr><td>Potency vs efficacy</td><td>Potency = smallest EC50/ED50 (left). Efficacy = highest plateau (up). The most potent drug is not always the most efficacious.</td></tr>
<tr><td>Pharmacological vs apparent potency</td><td>Pharmacological: tissue sensitivity, receptor number, receptor activity, affinity, efficacy. Apparent: adds age, absorption, distribution, elimination, DDI.</td></tr>
<tr><td>More receptors vs a changed drug</td><td>More receptors: shift left, potency up, Kd/affinity/efficacy unchanged. A changed drug: different Kd and/or Emax.</td></tr>
<tr><td>Intrinsic activity vs efficacy</td><td>Intrinsic activity (Ariëns): full agonist 1, partial 0&lt;β&lt;1, antagonist 0; ignores the tissue; the formula is not on the exam. Efficacy: more comprehensive, includes the tissue, only ever relative.</td></tr>
</tbody></table>
<p class="sub">Sources: Day 1 slides ~21–~27; Day 2 slides ~31, ~45–~58; Day 3 slides ~3–~8, ~21–~29; (T) 9/22, 9/23, 9/24.</p>

<h4>How he asks it</h4>
<div class="poll"><b>"Affinity of a drug for the receptor is dependent on the type of chemical bonds it makes."</b> True / False<br>Key: <b>True</b>. Bond type decides how likely a drug is to bind and stay bound. <small>PollEV p.1; (T) 9/23</small></div>
<div class="poll"><b>"Efficacy:"</b> Is the ability of a drug to bind and stay bound to a receptor / Is the ability of a cell to increase its number of receptors / Is the ability of a drug to change receptor activity/state / Is the ability of a drug to be absorbed at the level of the GI<br>Key: <b>change receptor activity/state</b>. "Why is not A? That's affinity ... B ... it's a cell business ... D ... that's pharmacokinetics." <small>PollEV p.1; (T) 9/23</small></div>
<div class="poll"><b>"Which of the following is CORRECT?"</b> G-proteins are defined and regulated by the beta subunit / Phospholipase C (PLC) is an example of a second messenger / Efficacy is defined by the ability of a drug to bind and stay bound to a receptor / The potency of a drug is dependent on the affinity, efficacy and # of receptors / The higher the Kd, the greater the affinity of a drug for the receptor<br>Key: <b>potency ... affinity, efficacy and # of receptors</b> (94% of the class). The Kd option is backwards; the efficacy option is affinity. <small>PollEV p.1; (T) 9/23</small></div>
<!--IMG:pollev-kd-table-->
<div class="poll"><b>"Which of the two drugs is more likely to successfully interact with β2 receptors on the lungs?"</b> Drug A / Drug B<br>Key: <b>Drug B</b>, Kd 20 µM at β2 versus 1 mM for drug A. "If you only focus on the number, you're going to miss the question in the exam. You've got to look at the units as well." He said he will ask "a very similar question on your exam with 3 more options". <small>PollEV p.1; (T) 9/24</small></div>
<!--IMG:pollev-kd-table-b1-->
<div class="poll"><b>"Which of the two drugs has the greatest affinity for the beta 1 receptors in the heart?"</b> Drug A (Kd = 1 mM) / Drug B (Kd = 20 microM) / Drug C (Kd = 100 nM) / Drug D (Kd = 1000 M)<br>Key: <b>Drug C</b>, 100 nM = 1 × 10<sup>−7</sup> M, the smallest Kd ("ignore the table"). Follow-up: the same drug C is the one most likely to be an irreversible antagonist, because it has the smallest Kd. <small>PollEV p.2; (T) 9/24</small></div>
<div class="poll"><b>"Which of the following drug will have the greatest affinity for a receptor?"</b> hydrogen bonds / Van der Waal's bonds / covalent bonds / ionic bonds<br>Key: <b>covalent</b>: irreversible at body temperature, so the highest affinity and the smallest Kd. <small>PollEV p.2; (T) 9/24</small></div>
<!--IMG:pollev-two-hearts-->
<div class="poll"><b>"What would happen to the potency of a NE if one increase the number of receptors expressed in a Heart?"</b> (10 vs 100 receptors, same 1000 nM dose) Decrease / Increase / No change<br>Key: <b>Increase</b>. "The more receptors you have based on the laws of mass action, the greater the statistical probability of binding something ... it's going to appear to have a greater potency." <small>PollEV p.2; (T) 9/24</small></div>
<!--IMG:pollev-five-drc-->
<div class="poll"><b>"The DRCs below represent the DRC of five different drugs acting on the same receptor. Which drug has the highest affinity?"</b> A / B / C / D / They all have equal efficacy since they all can produce 50% of the effect<br>Key: <b>A</b>, furthest left, smallest Kd. Follow-ups he asked aloud: highest efficacy B, lowest efficacy D, the only full agonist B, the partials A, C, D, E. "You got at least guarantee 40% of the exam, if you can do this." <small>PollEV p.2; (T) 9/24</small></div>
<div class="poll"><b>"Which of these drugs is the least effective?"</b> (same five curves) A / B / C / D / E<br>Key: <b>D</b>, the lowest plateau. <small>PollEV p.2</small></div>
<div class="poll"><b>"Which of these drugs is most likely to kill 100% of a bacterial colony?"</b> (same five curves) A / B / C / D / E<br>Key: <b>B</b>, "the most efficacious in doing that job. Why would I take any of the other ones and leave some bacteria behind". <small>PollEV p.2; (T) 9/24</small></div>
<!--IMG:pollev-four-drc-potency-->
<div class="poll"><b>"The DRCs below represent the DRC of five different drugs acting on the same receptor. Which drug has the highest potnecy?"</b> (colored A–D figure, log[A] 0.01–100) A / B / C / D / They all have equal efficacy since they all can produce 50% of the effect<br>Key: <b>A</b> (annotation on the page: "require less drug to produce effect; potency looking @ ED50"). Settled in class: (T) 9/29 "100% says A. Very good. Is that the right answer? Yes ... If it requires the smallest amount of drug to produce equivalent responses" ("Sorry, I misspelled potency"; the stem says five drugs, the figure shows four). <small>PollEV (v2) p.4; (T) 9/29</small></div>
<!--IMG:pollev-five-drc-correct-->
<div class="poll"><b>"Which of the following is CORRECT?"</b> (five curves A–E, equal plateau) Drug E is more potent than Drug C due to its efficacy / Drug B is more potent than Drug A due to its affinity / Drug A is more potent than Drug C due to its affinity / Drug C is more potent than Drug E due to its efficacy / Drug D is more potent than B due to its affinity and efficacy<br>Key: <b>Drug A is more potent than Drug C due to its affinity</b>. Settled in class: (T) 9/29 "C is the correct answer. So drug A is more potent than drug C. Due to its affinity ... They have equal efficacy, so the only difference between them is what affinity"; he added that E is the least potent, B the most efficacious, D the least efficacious, and "drug D is more potent than B? Nope, not even by a close shot." <small>PollEV (v2) p.4; (T) 9/29</small></div>
<div class="poll"><b>Spoken:</b> "Which of these two drugs is going to be more potent?" (drug D vs drug W, same Emax) — "The green drug, the one to the left, because it requires a smaller concentration to produce the same equivalent response." <small>(T) 9/24</small></div>
<div class="poll"><b>Spoken:</b> "So test question right here. Why would A be more potent than B?" (equal ED50, equal affinity, different Emax) — "Because it has greater efficacy, right?" <small>(T) 9/24</small></div>
<div class="poll"><b>Spoken (steep vs shallow slope poll):</b> "Which one do you prefer?" — "It depends ... I didn't give you enough information for you to make a choice"; the risk of a steep curve is going "from having no effect at all to max it out". <small>(T) 9/24</small></div>

<h4>Traps</h4>
<ul>
<li>"The higher the Kd, the greater the affinity" is the reverse of the rule; Kd and affinity are inversely proportional. <small>PollEV p.1 distractor; (T) 9/24</small></li>
<li>"They all have equal efficacy since they all can produce 50% of the effect": every curve crosses 50% of its own maximum; efficacy is the plateau, not the crossing. <small>PollEV p.2 distractor; Day 3 slide ~21</small></li>
<li>Reading the number and not the unit: 250 nM is smaller than 30 µM and 1 mM; "about 10% of you are gonna miss it. It happens every year". <small>(T) 9/24</small></li>
<li>Answering "no change" on the two-hearts poll because the dose is the same, or saying the Kd changed. His picture: blindfolded students in a room with 10 chairs versus 100, “who is going to be more likely to find and bind the receptor?” <small>(T) 9/24</small></li>
<li>His own slip on the five-drug poll: "A ... Because it has the lowest affinity, the smallest KD is gonna be further to the left." He meant highest affinity; A was keyed. <small>(T) 9/24; bank note L03-026</small></li>
<li>Picking "greater affinity" when the stem says affinity is equal and only Emax differs; the tiebreak is efficacy. <small>Day 3 slide ~27; (T) 9/24</small></li>
<li>Assuming the most potent drug is the one to use; for hypertension at 136 the small dose of a partial may do, for an infection "give me the drug that kills all the bacteria". <small>(T) 9/24</small></li>
<li>Putting absorption, age or elimination under pharmacological potency (the slide lists them under apparent). <small>Day 1 slide ~27; bank note L01-015</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-classes">
<h3>2. Agonist classes: full, partial, inverse agonist, neutral antagonist</h3>
<h4>What it is</h4>
<!--FIG:two-state-->
<ul>
<li><b>Two-state model:</b> receptors come "in two flavors", active (R*) and inactive (R), and the cell moves them between the two by itself; the L constant is "an arbitrary number" for how likely a receptor is to be found active without any drug. "This is gonna be home for us." <small>Day 1 slide ~28; Day 3 slide ~31; (T) 9/22; (T) 9/28</small></li>
<li>Drugs "stabilize them in one conformation and keep them at it, or perhaps if the receptor is inactive, we're gonna make them active"; positive efficacy shifts R → R*, negative efficacy shifts R* → R. <small>Day 3 slide ~31; (T) 9/22; (T) 9/28</small></li>
<li><b>Baseline</b> is "just a reflection of the receptor activity that is happening": most receptors inactive (R &gt; R*) means baseline 0%; 50/50 means baseline 50%. "If there is 1 sign, you can assume that most of my receptors, 99% of them are gonna be on the inactive state, which means my baseline is zero." <small>Day 4 slides ~45–~46; (T) 9/28</small></li>
<li><b>Constitutive activity:</b> receptors that are active on their own (histamine, opioid, cannabinoid, dopamine, bradykinin, adenosine receptors) are "more sensitive to inverse agonists"; antihistamines were called antagonists until a cell line with naturally active receptors showed they bring activity down. <small>Day 4 slide ~23; (T) 9/23; (T) 9/28</small></li>
<li><b>Full agonist (FA):</b> highest affinity for receptors in the active state, positive efficacy, can activate inactive receptors, Emax = 100% of the system, reversible. Examples: norepinephrine, epinephrine, histamine, acetylcholine, dopamine. <small>Day 3 slides ~33–~41; Day 4 slide ~3 poll; (T) 9/28 "Its Emax is 100% ... highest affinity for receptors on the active state ... it can activate them"</small></li>
<li><b>Partial agonist (PA):</b> same affinity preference and positive efficacy, but its Emax is "between 1 and 99"; "If it's 100, it's a full agonist. If it's 0, it's not a partial agonist." Examples on the slide: albuterol (β2), buprenorphine (µ-opioid), oxymetazoline (α1), pilocarpine (muscarinic), varenicline (Nn), aripiprazole (D2). <small>Day 3 slides ~50–~53, ~63; (T) 9/28</small></li>
<li>Why use a partial: "You don't have to open up your airways 100% in order to help somebody with asthma to breathe." <small>(T) 9/24; (T) 9/28</small></li>
<li><b>Inverse agonist (IA):</b> highest affinity for receptors in the inactive state, negative efficacy, "lowers the DRC all the way to 0%"; reversible and competitive. The one to know: loratadine (an antihistamine). <small>Day 2 slides ~35–~36; Day 4 slides ~4–~12; (T) 9/28 "there's only one inverse agonist you need to know ... loratadine"</small></li>
<li><b>Neutral (competitive) antagonist:</b> equal affinity for active and inactive states, efficacy ε = zero, "They Have Affinity, But No PCOL Efficacy"; it keeps the receptor in whatever state it is. Example: prazosin. <small>Day 2 slides ~37–~38; Day 4 slides ~43–~44; (T) 9/23 "they have equal affinity for both receptor states ... they just keep as it is"</small></li>
<li>Ariëns' <b>intrinsic activity</b>: full agonist = 1, partial 0&lt;β&lt;1, antagonist = 0 ("They have affinity, they can bind the receptor, but they don't do anything to the receptor"); the formula is not on the exam and the names (Clark, Ariëns, Stephenson, Furchgott, Nickerson) are "FYI". <small>Day 1 slide ~28; Day 3 slide ~25; (T) 9/22; (T) 9/24 "don't memorize it"</small></li>
<li>All agonists are reversible: "I do not know of any agonist that is irreversible." (The handwritten slide annotation extracts as "all agonist are irreversible"; the transcript wording is the one to use.) <small>Day 3 slide ~15; (T) 9/24; bank note L03-015</small></li>
</ul>

<h4>How to read it on a curve</h4>
<!--FIG:classes-->
<!--IMG:pollev-figure1-->
<ul>
<li>Start from the baseline. In his Figure 1 the baseline is 50%: A rises to 100% (full agonist), B rises to its own plateau (partial agonist), C stays flat (neutral antagonist), D falls to its own plateau (partial agonist with an Emax below the baseline), E falls to 0% (inverse agonist). "E is what, an inverse agonist, right? Why is that? Because it's bringing the baseline to zero." <small>Day 4 slide ~24; (T) 9/28</small></li>
<li>Full agonist alone: 0 → 100, 50 → 100, and at a 100% baseline "it looks like a straight line" because it is already doing what it wants. <small>Day 3 slides ~37–~40; (T) 9/28</small></li>
<li>Partial agonist alone: goes to its own Emax from any baseline; "If it's 75%, everything finishes at 75%. If it's 30%, everything goes to 30%." <small>Day 3 slides ~59–~63; (T) 9/28</small></li>
<li>Inverse agonist alone: at baseline 0 "Stays at zero"; at 50 or 100 it goes to 0; "It doesn't matter where you're starting, the end point is 0." <small>Day 4 slides ~7–~12; (T) 9/28</small></li>
<li>Neutral antagonist alone: a flat line at the baseline, 0, 50 or 100. "You have a switch stuck." <small>Day 4 slides ~43–~44; (T) 9/23; (T) 9/28 "If it's at 50, it's gonna stay at 50."</small></li>
<li>At a 0% baseline an inverse agonist and a neutral antagonist give the same flat line, so "I have to put those drugs in a different system in order to quantify them." <small>(T) 9/24; (T) 9/28 "you can't differentiate between a competitive and an inverse because you're at 0"</small></li>
</ul>
<!--FIG:partial-->
<!--FIG:inverse-->
<ul>
<li>Five partial curves at 80, 75, 25 and 5%: "All those are partial agonists because they are above 1 and they less than 99 ... if this is a select all, you pick it all ... If it's not there, it's not it." <small>Day 3 slide ~52; (T) 9/28</small></li>
<li>Petri dish with 50% of receptors active and cAMP being measured: an inverse agonist brings cAMP to zero; a competitive antagonist leaves it at 50%. <small>(T) 9/23</small></li>
</ul>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>X vs Y</th><th>What separates them</th></tr></thead><tbody>
<tr><td>Full vs partial agonist</td><td>Both prefer active receptors, both have positive efficacy, both can activate inactive receptors, both reversible; only the full agonist reaches 100%, the partial plateaus at 1–99%.</td></tr>
<tr><td>Partial agonist vs inverse agonist as "antagonists"</td><td>From a high baseline a partial brings the response down only to its own efficacy (75% → 75%); an inverse brings it to 0%.</td></tr>
<tr><td>Inverse agonist vs neutral antagonist</td><td>Inverse: highest affinity for the inactive state, negative efficacy, lowers a raised baseline to 0. Neutral: equal affinity for both states, no efficacy, leaves the baseline where it is. Identical at a 0% baseline.</td></tr>
<tr><td>Agonist / antagonist vs reversible / irreversible vs orthosteric / allosteric</td><td>Three separate questions: does it turn the receptor on; does it let go; where does it bind. "Irreversible antagonist" and "allosteric agonist" are two answers each, not one word.</td></tr>
<tr><td>Occupancy (Clark) vs intrinsic activity (Ariëns) vs two-state (Stephenson/Furchgott/Nickerson)</td><td>Affinity only; affinity plus intrinsic activity (full 1, partial 1–99%, antagonist 0); efficacy with active/inactive receptors and the cell's say (L constant), which explains inverse agonists.</td></tr>
</tbody></table>
<p class="sub">Sources: Day 1 slide ~28; Day 2 slides ~32–~38; Day 3 slides ~25, ~31–~41, ~50–~63; Day 4 slides ~4–~12, ~43–~44; (T) 9/22, 9/23, 9/28.</p>

<h4>How he asks it</h4>
<div class="poll"><b>"Which of the following is CORRECT about full agonists?"</b> Its Emax is 100% of the system's max response / It has high affinity for receptors in the active state / It can activate inactive receptors / A full agonist will shift the DRC of another full agonist to the left / All of the above<br>Key: <b>All of the above</b>. "It's Emax is 100% ... It has the highest affinity for receptors on the active state. However, if you bind into receptors that are inactive, it can activate them ... will shift the dose response curve on another full agonist to the left because they're gonna be helping each other." <small>PollEV p.2; (T) 9/28</small></div>
<div class="poll"><b>"Which of the following drugs is a partial agonist?"</b> Epinephrine / Histamine / Albuterol / Acetylcholine / Metoprolol<br>Key: <b>Albuterol</b>. "The other ones are agonist or an antagonist such as metoprolol." <small>PollEV p.2 (the PDF spells the last option "Meotprolol"); Day 4 slide ~3; (T) 9/28</small></div>
<div class="poll"><b>"The DRCs below represent the individual DRC of 5 different drugs. DRC "E" most likely represents the DRC of:"</b> NE / Albuterol / Loratadine / Epinephrine<br>Key: <b>Loratadine</b> (100% of the class). E brings the 50% baseline to zero, so E is an inverse agonist; the only inverse agonist on the list is loratadine. <small>PollEV p.3; Day 4 slide ~24; (T) 9/28</small></div>
<div class="poll"><b>Spoken:</b> "So an inverse agonist has an affinity for receptors in what state? What is the highest affinity it has? Inactive, right?" / "if I give you my inverse agonist, where all the receptors are inactive, what would be my baseline? 0. What would it do to that baseline? Stays at zero." <small>(T) 9/28</small></div>
<div class="poll"><b>Spoken:</b> "What would you think would happen if I give an antagonist to that person?" (rat, receptors inactive, baseline 0) — "Just a straight line because one is neutral, doesn't change the balance of the receptors. The other one [inverse] wants to keep everybody inactive." <small>(T) 9/24</small></div>
<div class="poll"><b>Spoken:</b> "Where my baseline is gonna be? Where's my starting point? And resting, which should be shown what kind of efficacy. Zero, right?" / "perhaps my receptor population is 50/50 ... Where would I start? I start at 50 because that's where my baseline is now." <small>(T) 9/28</small></div>

<h4>Traps</h4>
<ul>
<li>Giving a partial agonist negative efficacy or a preference for inactive receptors; it is a weaker full agonist, not a weak inverse agonist. <small>Day 3 slides ~50–~52, ~63; (T) 9/28</small></li>
<li>Expecting a partial agonist to bring a raised baseline to zero; it stops at its own Emax. "You're never gonna get to 100. Because it never did by itself." <small>(T) 9/28</small></li>
<li>Calling a drug that shuts active receptors off an "antagonist"; that is negative efficacy, an inverse agonist. A neutral antagonist "doesn't change the balance". <small>Day 1 slide ~28; (T) 9/23</small></li>
<li>Reading "the partial agonist doesn't have a lot of affinity" (Clark's occupancy story) as a property of partial agonists; the slide says "Full agonist &amp; Partial agonist ≠ Affinity" and the two-state model gives both the same preference for active receptors. <small>Day 1 slide ~28; (T) 9/22; Day 3 slides ~33, ~50</small></li>
<li>Arguing that a curve at 99% "is really close" to a full agonist on a select-all: "If it's not there, it's not it." <small>(T) 9/28</small></li>
<li>Treating a flat line at baseline 0 as proof of a neutral antagonist; an inverse agonist looks the same there. <small>(T) 9/24; (T) 9/28</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-antag">
<h3>3. Antagonists: reversible, irreversible, chemical, physiological, indirect</h3>
<h4>What it is</h4>
<ul>
<li>An antagonist "interferes with the interaction of an agonist and a receptor". Two non-receptor kinds: <b>chemical</b> (direct chemical interaction with the agonist or toxin, e.g., chelating agents such as dimercaprol for gold, mercury or arsenic poisoning) and <b>physiological</b> (two agonists at different receptors in the same organ with opposing effects: acetylcholine at muscarinic receptors lowers heart rate, epinephrine at β1 raises it; "They're not competing for the same receptor"). <small>Day 4 slide ~35; (T) 9/28</small></li>
<li><b>Pharmacological antagonists</b>, three classes: competitive (orthosteric), surmountable or reversible; nonequilibrium-competitive (orthosteric), insurmountable or irreversible; allosteric (allotropic), non-competitive. <small>Day 4 slide ~36; (T) 9/28</small></li>
<li>The names come from the bonds: covalent = "irreversible, insurmountable, and non-competitive ... They all mean the same thing"; ionic, hydrogen and van der Waals = "reversible, surmountable, competitive. Different words to refer to the same property." Covalent examples: aspirin, omeprazole, clopidogrel, phenoxybenzamine, organophosphates. <small>Day 2 slides ~15–~16; (T) 9/23</small></li>
<li><b>Competitive antagonist</b> in the two-state model: binds reversibly, equal affinity for R and R* ("neutral"), "DO NOT evoke a change", affinity but no pharmacological efficacy; competes with the agonist for the same pocket by the law of mass action ("whoever has the greatest concentration is gonna occupy the most receptors"). Most common in clinical practice. <small>Day 4 slides ~43–~47; (T) 9/28</small></li>
<li><b>Irreversible antagonist:</b> binds irreversibly (covalent), greatest affinity and smallest Kd, also neutral, no pharmacological efficacy; "lowering of the amount of receptors available"; the receptor has to be internalized and replaced. Only one on the drug list: phenoxybenzamine. "What property do they have that should be like red light blinking in your head during the exam? They form covalent bonds." <small>Day 4 slide ~51; Day 2 slide ~18; (T) 9/23; (T) 9/28</small></li>
<li><b>Indirect antagonist:</b> binds a component upstream or downstream of the receptor, not the receptor. Caffeine blocks phosphodiesterase (PDE), the enzyme that chews up cAMP, so cAMP rises and the response is <i>enhanced</i>; a RAS-blocking cancer drug lowers the signal. A drug that blocks the norepinephrine reuptake transporter is an indirect antagonist that <i>increases</i> the potency of norepinephrine. <small>Day 2 slides ~40–~41; (T) 9/23; (T) 9/24 "indirect antagonists can work downstream from the receptor, but also upstream"</small></li>
<li>When an irreversible antagonist is wanted: "severe gastric acid production ... to give my body a chance to heal itself" (omeprazole, a covalent drug, was his Day 2 example; no drug was named on Day 4). <small>Day 2 slide ~15; (T) 9/23; (T) 9/28</small></li>
</ul>

<h4>How to read it on a curve</h4>
<!--FIG:competitive-->
<ul>
<li><b>Competitive antagonist added to a full agonist:</b> shift to the right (higher ED50, "appears less potent"); no change to baseline (neutral); no change to Emax ("because it's reversible, I can always outcompete it"); shifts are symmetrical: 10× the antagonist needs 10× the agonist, "all the way to infinity". <small>Day 4 slides ~45–~50; (T) 9/28</small></li>
</ul>
<!--FIG:irreversible-->
<!--GRAPH:{"curves":[{"label":"alone","ec":0,"emax":100,"dashed":true},{"label":"1x","ec":0.5,"emax":100},{"label":"10x","ec":1,"emax":65},{"label":"100x","ec":1.5,"emax":30},{"label":"1000x","ec":2,"emax":8}],"base":0,"x":"log [agonist]","y":"% of maximal response","caption":"Full agonist alone (dashed) and with rising doses of an irreversible antagonist: shift to the right, baseline unchanged, and Emax falls with each dose until the response can be abolished (Day 4 slides ~52–~54)."}-->
<ul>
<li><b>Irreversible antagonist added to a full agonist:</b> shift to the right (higher ED50) and a lower Emax ("appears less efficacious"); baseline unchanged; shifts symmetrical; "we can go all the way down to 0. Completely abolish it." The slide's receptor-availability series: 100%, 25%, 15%, 8%, 2.5%, 0.6%, 0%. <small>Day 4 slides ~51–~54; (T) 9/28</small></li>
<li>The textbook (Katzung) says an irreversible antagonist reduces the maximal effect "although it may not change its EC50"; the slides and the lecture say the curve also shifts right. The exam is written from the lecture. <small>Day 4 slides ~53–~54; bank note L04-030</small></li>
<li>Spare receptors delay the drop: if the agonist needs 10% of the receptors and the antagonist blocks 75%, "I still have 25 available, can I still make the max response? Yes ... eventually, once I go below 10, now my efficacy goes down". <small>Day 4 slide ~56; (T) 9/28</small></li>
<li>"An irreversible antagonist may initially behave a little bit like if it's competitive, but I have to give you enough shifts for you to figure out the difference." <small>(T) 9/28</small></li>
<li>The <b>Emax rule</b>: "If you see something that it lowers the Emax, you know that has to be either an irreversible antagonist or an allosteric antagonist that affects efficacy. Those are the only two that can affect the Emax. Everybody else is competitive. Everybody else is reversible, no change to the Emax." <small>(T) 9/28</small></li>
<li>Indirect antagonist that blocks NE removal: the NE curve shifts left ("it's going to require less of it to bind the receptors to produce its effects"). <small>(T) 9/24</small></li>
</ul>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>X vs Y</th><th>What separates them</th></tr></thead><tbody>
<tr><td>Chemical vs physiological antagonism</td><td>Chemical: the antagonist binds the chemical itself (dimercaprol, chelators); no receptor. Physiological: two agonists, two receptors, opposite effects in one organ (ACh vs Epi in the heart).</td></tr>
<tr><td>Competitive vs irreversible antagonist (names)</td><td>Competitive = reversible = surmountable. Irreversible = insurmountable = nonequilibrium-competitive = non-competitive. "Surmountable" never describes the irreversible drug.</td></tr>
<tr><td>Competitive vs irreversible antagonist (curve)</td><td>Both shift right with the baseline unchanged; only the irreversible lowers Emax (fewer receptors). With too few shifts they look alike; when Emax is unchanged the best single answer is competitive.</td></tr>
<tr><td>Irreversible vs allosteric antagonist (both "non-competitive")</td><td>Irreversible: covalent, never comes off, can take the response to 0. Allosteric: binds elsewhere, reversible, saturates before zero ("An allosteric can't bring everything, it saturates").</td></tr>
<tr><td>Inverse agonist vs competitive antagonist</td><td>Inverse lowers a raised baseline (negative efficacy); competitive leaves it alone (no efficacy). Both shift a full agonist right with no change to Emax.</td></tr>
<tr><td>Indirect antagonist vs receptor antagonist</td><td>Indirect acts on the cascade or on the transporter, not the receptor, and can raise (caffeine, reuptake blocker) or lower (RAS drug) the response.</td></tr>
</tbody></table>
<p class="sub">Sources: Day 2 slides ~15–~16, ~37–~41; Day 4 slides ~21–~22, ~35–~36, ~43–~55; (T) 9/23, 9/24, 9/28.</p>

<h4>How he asks it</h4>
<!--IMG:pollev-dotted-x-->
<div class="poll"><b>"The dotted line represents the DRC of the agonist alone and the solid lines represent the DRC of the agonist in the presence of increasing doses of drug "X." Drug X is most likely:"</b> A full agonist / A partial agonist / A competitive antagonist / An irreversible antagonist / An allosteric agonist<br>Key: <b>A competitive antagonist</b>. His elimination: a full agonist or an allosteric agonist "will move you to the left"; a partial agonist "would affect the baseline ... It has efficacy"; irreversible: "The Emax is staying the same". "If it's a best of one, your best choice over here is what? Competitive." <small>PollEV p.3; Day 4 slide ~55; (T) 9/28</small></div>
<!--IMG:pollev-dotted-ne-->
<div class="poll"><b>"The dotted line represents the DRC of norepinephrine alone and the solid lines represent the DRC of the agonist in the presence of increasing doses of drug "X." Drug X is most likely:"</b> Epinephrine / Albuterol / Phenoxybenzamine / Metoprolol / Diazepam<br>Key: <b>Metoprolol</b>. "Epinephrine is a full agonist. Albuterol is your partial ... Phenoxybenzamine is the only irreversible that is on your list, and diazepam is your allosteric agonist." <small>PollEV p.3; Day 4 slide ~55; (T) 9/28</small></div>
<div class="poll"><b>"A drug inhibits the major transporter involved in the removal of NE from the neuron synapsis. What effect would have on the potency of that NE?"</b> Decrease / Increase / No change<br>Key: <b>Increase</b>. First classify drug X: an indirect antagonist ("it's not directly affecting the receptor"). "It's going to make norepinephrine appear to be more potent because it's going to require less of it." <small>PollEV p.1; (T) 9/24</small></div>
<div class="poll"><b>"DRC "B" represents the DRC of NE alone. Which DRC best represent NE in the presence of duloxetine (NET antagonist)?"</b> A / B / C / D / E<br>Key: <b>A</b> (shift left; the reuptake blocker is the same indirect antagonist as the 9/24 poll). Settled in class: (T) 9/29 “we’re blocking the reuptake of norepinephrine … make it norepinephrine more potent, shifting to the left.” <small>PollEV (v2) p.5; (T) 9/29</small></div>
<div class="poll"><b>Spoken:</b> "So what would happen if I give now 10 times the dose of my antagonist? Well, I have to increase the dose of my agonist by 10 times in order to outcompete that drug." <small>(T) 9/28</small></div>
<div class="poll"><b>Spoken:</b> "So which drug has the greatest affinity?" (red, yellow, purple, gray drugs) — "The one that forms covalent bond all day long, which are, are irreversible drugs." <small>(T) 9/23</small></div>

<h4>Traps</h4>
<ul>
<li>Reading "surmountable" as a property of the irreversible drug; it belongs to the competitive/reversible one. <small>Day 4 slide ~36; (T) 9/23</small></li>
<li>Picking "irreversible antagonist" for a right-shifted curve whose Emax has not moved ("could this be irreversible? Maybe ... but if it's a best of one ... Competitive"). <small>(T) 9/28</small></li>
<li>Treating "non-competitive" as one mechanism; it is two (covalent bond, or a second site). <small>Day 4 slide ~36; (T) 9/28</small></li>
<li>Expecting any "antagonist" to lower the signal; caffeine (an indirect antagonist at PDE) raises cAMP. <small>Day 2 slide ~40; (T) 9/23</small></li>
<li>Calling acetylcholine versus epinephrine in the heart "competitive"; they are physiological antagonists at two receptors. <small>Day 4 slide ~35; (T) 9/28</small></li>
<li>Choosing the inverse agonist as an Emax-lowering drug; it lowers the baseline, and being reversible it leaves Emax alone. <small>Day 4 slides ~21–~22; (T) 9/28</small></li>
<li>Choosing "phenylephrine" or "prazosin" as the drug with the highest affinity; the covalent one (phenoxybenzamine) has it. <small>PollEV p.1; (T) 9/23</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-allo">
<h3>4. Orthosteric vs allosteric</h3>
<h4>What it is</h4>
<!--FIG:sites-->
<ul>
<li><b>Orthosteric</b> drugs bind the receptor's own binding pocket and compete for it: "either one or the other, it can't be both ... only one body can occupy the same space and time". Slide examples: phenylephrine (agonist), prazosin (reversible antagonist), phenoxybenzamine (irreversible antagonist); in class he named norepinephrine, prazosin and phenoxybenzamine. <small>Day 2 slide ~18; (T) 9/23</small></li>
<li><b>Allosteric</b> (allotopic) drugs "do not bind or compete for the orthosteric binding pocket. They bind someplace else on the receptor" and change the pocket, so they change the affinity and/or efficacy of the drug in the pocket: "one and the other". "Where the magic in pharmacology is." <small>Day 2 slides ~19–~20, ~39, ~44; (T) 9/23</small></li>
<li>An <b>allosteric agonist</b> "increases the actions of an agonist by increasing its affinity and/or efficacy for the receptor" (handwritten: "makes the receptor more susceptible"); also called a positive allosteric modulator (PAM). An <b>allosteric antagonist</b> decreases the agonist's affinity and/or efficacy from another site; negative allosteric modulator (NAM); non-competitive; the agonist cannot overcome it. <small>Day 2 slides ~42–~43; Day 4 slides ~25, ~37–~38; (T) 9/28 "if you know what the positive does, the negative is the opposite"</small></li>
<li>An allosteric drug may change affinity, efficacy, both, "or none, because it depends how they're changing the orthosteric binding pocket." <small>Day 2 slide ~20; (T) 9/23</small></li>
<li><b>Diazepam</b> (a benzodiazepine) is the drug-list allosteric agonist: GABA binds its orthosteric sites on the GABA-A channel and lets chloride in (negative charge, membrane more negative, "shut things down"); diazepam binds elsewhere, makes the pocket "a little bit bigger", so GABA binds "better or for a longer period of time". Alcohol and barbiturates are also allosteric agonists there; benzo + alcohol = "two allosteric agonists working the same receptor at two different sites". <small>Day 2 slides ~21–~24; (T) 9/23 "on your drug list, I put diazepam as our known allosteric agonist that you have to know for your exam"</small></li>
<li>All allosterics are reversible for this class: "For a purpose in this class, all allosterics are reversible. There is no [allosteric] that forms irreversible binding" (on Day 2 he hedged it: "As far as I know"). <small>(T) 9/23; (T) 9/28</small></li>
<li><b>Four characteristics</b> of a full agonist with multiple doses of an allosteric agonist: Affinity affected: <b>yes</b>. Efficacy affected: <b>no</b> ("I can't tell ... because I'm already at 100%"). Symmetrical shifts: <b>no</b>. Saturability: <b>yes</b> ("once I occupy all the allosteric sites, that's it"). <small>Day 4 slides ~30–~34; (T) 9/28</small></li>
<li>Why the shifts are asymmetrical: "the binding to that allosteric site is not dependent on anybody, it's just dependent on the drug. It's non-competitive." <small>Day 4 slide ~33; (T) 9/28</small></li>
</ul>

<h4>How to read it on a curve</h4>
<!--GRAPH:{"curves":[{"label":"A","ec":0,"emax":60,"dashed":true},{"label":"aff","ec":-1.2,"emax":60},{"label":"eff","ec":0,"emax":100},{"label":"both","ec":-1.2,"emax":100}],"base":0,"x":"log [agonist A]","y":"% of maximal response","caption":"Partial agonist A alone (dashed) with an allosteric agonist that affects only affinity (shift left, same plateau), only efficacy (no shift, plateau rises to full), or both (left and up) (Day 4 slides ~26–~29)."}-->
<ul>
<li><b>Allosteric agonist:</b> affinity only → shift left, "No change to the efficacy"; efficacy only → "it's not moving left or right, it's moving up", a partial becomes a full; both → left and up. The efficacy change is only visible if the agonist is partial. <small>Day 4 slides ~26–~29; (T) 9/28</small></li>
</ul>
<!--GRAPH:{"curves":[{"label":"A","ec":0,"emax":100,"dashed":true},{"label":"aff","ec":1.2,"emax":100},{"label":"eff","ec":0,"emax":50},{"label":"both","ec":1.2,"emax":50}],"base":0,"x":"log [agonist A]","y":"% of maximal response","caption":"Full agonist A alone (dashed) with an allosteric antagonist that affects only affinity (shift right, same Emax), only efficacy (no shift, Emax falls), or both (right and down) (Day 4 slides ~38–~41)."}-->
<ul>
<li><b>Allosteric antagonist:</b> affinity only → shift right "without affecting the ability to get the max response"; efficacy only → "it's not moving left or right ... going from being a full agonist to behaving like a partial"; both → right and down. <small>Day 4 slides ~38–~41; (T) 9/28</small></li>
</ul>
<!--GRAPH:{"curves":[{"label":"A","ec":0.8,"emax":100,"dashed":true},{"label":"+X","ec":0.2,"emax":100},{"label":"+10X","ec":-0.9,"emax":100},{"label":"+100X","ec":-1.25,"emax":100},{"label":"+1000X","ec":-1.32,"emax":100}],"base":0,"x":"log [agonist A]","y":"% of maximal response","caption":"Multiple doses of an allosteric agonist: the steps are unequal (asymmetrical) and stop after enough doses (saturable). The same pattern, mirrored to the right, marks an allosteric antagonist (Day 4 slides ~30–~34)."}-->
<ul>
<li>With multiple doses the shifts are unequal and then stop: "after so many shifts, it stops. I can keep giving more and more of my allosteric, and he can't go more to the left." "That's how we're gonna know if a drug is allosteric or not." <small>Day 4 slides ~31–~34; (T) 9/28</small></li>
<li>Competitive shifts, by contrast, are symmetrical and go on "to infinity"; and an allosteric antagonist "can't bring everything, it saturates", where an irreversible antagonist can wipe the response out. <small>Day 4 slides ~48–~50; (T) 9/28</small></li>
</ul>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>X vs Y</th><th>What separates them</th></tr></thead><tbody>
<tr><td>Orthosteric vs allosteric</td><td>One pocket, one or the other, competition (a "Formula One" single seat). A second site, one and the other, the pocket itself is changed (a "convertible" with a passenger).</td></tr>
<tr><td>Allosteric agonist affecting affinity vs efficacy</td><td>Affinity only: left, same max. Efficacy only: no shift, max rises. Both: left and up.</td></tr>
<tr><td>Allosteric antagonist affecting affinity vs efficacy</td><td>Affinity only: right, same max. Efficacy only: no shift, max falls. Both: right and down.</td></tr>
<tr><td>Allosteric vs competitive shifts</td><td>Asymmetrical and saturable, two drugs bound at once, non-competitive. Symmetrical, toward infinity, one drug at a time, law of mass action.</td></tr>
<tr><td>Allosteric antagonist vs irreversible antagonist</td><td>Both non-competitive and both can lower Emax; the allosteric is reversible and saturates above zero, the irreversible is covalent and can reach zero.</td></tr>
<tr><td>Allosteric agonist vs full agonist (as the second drug)</td><td>Both shift the agonist left; only the full agonist raises the baseline (it has efficacy on its own); the allosteric's shifts are asymmetrical.</td></tr>
</tbody></table>
<p class="sub">Sources: Day 2 slides ~18–~24, ~39, ~42–~44; Day 4 slides ~25–~34, ~37–~41, ~48–~50; (T) 9/23, 9/28.</p>

<h4>How he asks it</h4>
<div class="poll"><b>"Which of the following is CORRECT?"</b> Allosteric agonist compete for the same binding pocket in the receptor / Allosteric agonist have the highest affinity for the orthosteric binding pocket / Phenoxybenzamine has higher affinity than prazosin / In orthosteric interactions, two drugs can be bound at the same time to the receptor / None of the above<br>Key: <b>Phenoxybenzamine has higher affinity than prazosin</b> (covalent versus weaker bonds). The two allosteric options fail because allosterics "bind someplace else"; the orthosteric option fails because "only one is either one or the other". <small>PollEV p.1; (T) 9/23</small></div>
<!--IMG:pollev-abcde-allo-ag-->
<div class="poll"><b>"If DRC "B" is the DRC of an agonist alone, which curve would best represent agonist "B" in the presence of another and allosteric agonist that affect only the affinity?"</b> A / B / C / D / E<br>Key: <b>A</b>. "Help, which means you're gonna make the drug more potent ... because it only affects affinity, you're not affecting the ability to produce its effect, is moving to the left. So drugs C and E are affecting the efficacy ... and D is making less potent." <small>PollEV p.3; Day 4 slide ~42; (T) 9/28</small></div>
<!--IMG:pollev-abcde-allo-ant-->
<div class="poll"><b>"If DRC "D" is the DRC of an agonist alone, which curve would best represent agonist "D" in the presence of another and allosteric antagonist that affects the affinity and efficacy of D?"</b> A / B / C / D / E<br>Key: <b>E</b>. "It's affecting the affinity, so it's gonna shift to the right and it's affecting the efficacy, so it's gonna bring it down ... Why is not C? Because C is moving to the left ... positive to the affinity, but negative to the efficacy. There's no drug in the world that does that." <small>PollEV p.3; Day 4 slide ~42; (T) 9/28</small></div>
<div class="poll"><b>Spoken:</b> "So is this drug affecting affinity or efficacy? Affinity, right? I can't tell if it's affecting that because I'm already at 100%." / "do you think those shifts are symmetrical? ... No, right." <small>(T) 9/28</small></div>
<div class="poll"><b>Spoken:</b> "what would happen to the dose response curve of this agonist in the presence of an allosteric antagonist that only affects affinity? ... It's gonna shift to the right. Without affecting the ability to get the max response." <small>(T) 9/28</small></div>

<h4>Traps</h4>
<ul>
<li>"Allosteric agonists compete for the same binding pocket" and "have the highest affinity for the orthosteric pocket": both wrong, they bind elsewhere. <small>PollEV p.1; (T) 9/23</small></li>
<li>"In orthosteric interactions, two drugs can be bound at the same time": wrong, that is the allosteric case. <small>PollEV p.1; (T) 9/23</small></li>
<li>Picking a curve whose maximum changed for an "affinity only" drug (C and E on the slide-42 poll). <small>(T) 9/28</small></li>
<li>Picking a curve that moves left while losing its maximum: "There's no drug in the world that does that." <small>(T) 9/28</small></li>
<li>Expecting equal steps from an allosteric drug; equal steps are the competitive antagonist's signature. <small>Day 4 slides ~33, ~48; (T) 9/28</small></li>
<li>Reading "efficacy: no" as a property of allosteric agonists; it is "no" on that figure because the reference agonist was already at 100%. <small>Day 4 slide ~32 (handwritten "it's already 100% efficacy, so only affinity"); (T) 9/28</small></li>
<li>Diazepam as the answer to a right-shifting dotted-line figure; the allosteric agonist helps and moves the curve left. <small>PollEV p.3; (T) 9/28</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-dd">
<h3>5. Drug–drug on one receptor (the exam's core)</h3>
<h4>What it is</h4>
<ul>
<li>The question shape: "I will have to give you a point of reference and then ask a question after that." The reference is the agonist alone (dotted line); one dose of the second drug is given, then the agonist's full dose–response curve (DRC) is repeated. <small>Day 3 slides ~43–~45; Day 4 slide ~45; (T) 9/28</small></li>
<li>The slide's three assumptions: 1) orthosteric; 2) know the baseline; 3) determine the agonist's pharmacology (full or partial) first. <small>Day 4 slide ~45; (T) 9/28</small></li>
<li>The first question to answer: "would you assume that this other drug is gonna help or is gonna make the life more difficult for your agonist?" Help → left; hinder → right. Then baseline, then Emax. <small>(T) 9/28</small></li>
<li>The full agonist is always the reference "because our hormones are full agonists, our neurotransmitters are full agonist ... norepinephrine, epinephrine, acetylcholine". <small>(T) 9/24</small></li>
<li>"I promise you, you're gonna have that figure in your exam. I'm just gonna ask a different question. So you can memorize all the 100 permutations of it, or you can just learn the principle and apply it." <small>(T) 9/28</small></li>
</ul>

<h4>Case 1: full agonist + full agonist</h4><div class="pair"><!--FIG:shift-fafa--><!--FIG:shift-fafa-anim--></div>
<!--GRAPH:{"curves":[{"label":"A","ec":0,"emax":100,"dashed":true},{"label":"+B 1e-7","ec":-0.7,"emax":100},{"label":"+B 1e-6","ec":-1.4,"emax":100,"base":40},{"label":"+B 1e-5","ec":-2,"emax":100,"base":80}],"base":0,"x":"log [agonist A]","y":"% of maximal response","caption":"Full agonist A alone (dashed) and with rising doses of a second full agonist B (norepinephrine + Levophed): shift to the left, baseline rises, Emax unchanged (Day 3 slides ~45–~49)."}-->
<ul>
<li>Shift <b>left</b> ("Increase apparent affinity of agonist for the receptor"); baseline <b>up</b> once the second drug's dose is above its own threshold ("I'm starting at 40 because levofed already activated enough receptors"); Emax <b>unchanged</b> ("If my heart, all it can beat is 106 beats per minute, doesn't matter how much the drug I have"). <small>Day 3 slides ~42–~49 (THM); (T) 9/28</small></li>
<li>Why: equal efficacy, "they're both helping each other, so it doesn't matter who is binding to that receptor"; mutual exclusion (ε = 100 for both). <small>Day 3 slide ~44; (T) 9/28</small></li>
</ul>
<!--IMG:pollev-abcde-ne-epi-->
<div class="poll"><b>"If DRC B is the DRC of NE binding to the beta 1 receptor alone, which DRC best represents the DRC of NE in the presence of epinephrine?"</b> A / B / C / D / None of the above<br>Key: <b>A</b>. "Two full agonists, norepinephrine and Epi, that binds to the same receptor ... thus shifting to the left. Norepinephrine is going to make epi more potent, and epi is going to make norepinephrine more potent." <small>PollEV p.3; Day 4 slide ~3; (T) 9/28</small></div>
<div class="poll"><b>"If DRC B is the DRC of an agonist alone, which DRC would best represent that agonist in the presence of another agonist with similar efficacy?"</b> A / B / C / D / None of the above<br>Key: <b>A</b>. "Just by knowing that both drugs are going to work together and help each other, you already can eliminate C, D, and E because those drugs are making my agonist less potent." <small>PollEV p.2; (T) 9/28</small></div>

<h4>Case 2: full agonist + partial agonist</h4><div class="pair"><!--FIG:shift-fapa--><!--FIG:shift-fapa-anim--></div>
<div class="pair"><!--FIG:shift-fapa-down--><!--FIG:shift-fapa-down-anim--></div>
<!--GRAPH:{"curves":[{"label":"DA","ec":0,"emax":100,"dashed":true},{"label":"ARI","ec":0.4,"emax":60},{"label":"DA+ARI","ec":0.4,"emax":60,"base":100}],"base":0,"x":"log [drug]","y":"% of maximal response","caption":"Dopamine alone (dashed, Emax 100%), aripiprazole alone (Emax 60%), and aripiprazole given to a manic patient whose dopamine has the system at 100%: the response comes down to 60%, the partial agonist's own efficacy (Day 3 slides ~54–~58; (T) 9/28)."}-->
<ul>
<li>The partial agonist has a <b>dual nature</b>: from a low baseline it behaves like an agonist (up to its Emax); when the full agonist has the system high it competes for the receptors and brings the response <b>down to its own Emax</b>: dopamine (100%) plus aripiprazole (60%) in a manic patient ends at 60%. <small>Day 3 slides ~54–~58, ~64–~65; (T) 9/28 "Instead of going to 100%, now I have a dose response curve that is going to what? 60%"</small></li>
<li>The winner of the pocket is decided by concentration: "Who's gonna occupy more receptors? Whoever has the highest concentration based on the laws of mass action." Both drugs are reversible. <small>(T) 9/28</small></li>
<li>Emax of the pair is reached only by the full agonist alone; "You're never gonna get to 100. Because it never did by itself." <small>(T) 9/28</small></li>
<li>Varenicline: in withdrawal (receptors inactive) it brings the patient up; if the patient smokes, it outcompetes nicotine so the cigarette "is not gonna do much for them"; heavy smoking can outcompete it. <small>Day 3 slides ~64–~65; (T) 9/28</small></li>
<li>Difference from the inverse agonist as the second drug: the partial takes the curve to 75%, 30% or 90% (its own efficacy); the inverse takes it to 0%. <small>(T) 9/28</small></li>
</ul>
<!--FIG:partial-->

<h4>Case 3: full agonist + inverse agonist</h4><div class="pair"><!--FIG:shift-inverse--><!--FIG:shift-inverse-anim--></div>
<!--GRAPH:{"curves":[{"label":"H","ec":0,"emax":100,"dashed":true,"base":50},{"label":"+L 1e-7","ec":0.6,"emax":100,"base":22},{"label":"+L 1e-6","ec":1.2,"emax":100,"base":0},{"label":"+L 1e-5","ec":1.8,"emax":100,"base":0}],"base":50,"x":"log [histamine]","y":"% of maximal response","caption":"Histamine alone from a 50% baseline (dashed) and with rising doses of loratadine: baseline falls (to about 22%, then 0%), curve shifts right, Emax unchanged; once the baseline is 0 it changes no further (Day 4 slides ~16–~22)."}-->
<ul>
<li>Shift <b>right</b> ("Decrease apparent affinity of agonist for the receptor"), baseline <b>down to 0%</b> and then "No more Δ to the baseline, once it reaches zero" ("once you're dead, you can't die again"); Emax <b>unchanged</b>; the shifts continue "to infinity" as long as the agonist can outcompete. <small>Day 4 slides ~13–~22 (THM); (T) 9/28</small></li>
<li>Why the agonist still reaches Emax: "They are reversible. As long as I can outcompete them because they're going to bind and they're going to come off, whoever has the highest concentration is going to occupy the most receptors." <small>(T) 9/28</small></li>
<li>The slide qualifies the Emax rule ("No Effect on Emax against a high efficacy agonist"); in class it was stated without the qualifier for histamine, a full agonist. Use the class rule: a reversible drug never changes a full agonist's Emax. <small>Day 4 slide ~22; (T) 9/28; bank note L04-012</small></li>
<li>Histamine and loratadine are "competing for the receptors, right, because they have opposite effects". The first dose of loratadine took the 50% baseline "to what? 22, 23%". <small>Day 4 slides ~13–~15; (T) 9/28</small></li>
</ul>
<div class="poll"><b>"The dotted line represents the DRC of the agonist alone and the solid lines represent the DRC of the agonist in the presence of increasing doses of drug "X." Drug X is most likely:"</b> (dotted curve from a 50% baseline; solid curves start lower, then at 0%, and sit to the right) Metoprolol / Epinephrine / Tropicamide / Loratadine / Histamine<br>Key: <b>Loratadine</b>: the baseline falls to zero (negative efficacy), the curve shifts right, the Emax holds. Metoprolol and tropicamide (neutral antagonists) would leave the baseline where it is. Settled in class: (T) 9/29 “We’re not changing the Emax of that agonist, but we’re lowering the baseline … the only inverse agonist is going to be loratadine.” <small>PollEV (v2) p.5; (T) 9/29</small></div>

<h4>Case 4: full agonist + competitive antagonist</h4><div class="pair"><!--FIG:shift-competitive--><!--FIG:shift-competitive-anim--></div>
<!--FIG:competitive-->
<ul>
<li>Shift <b>right</b> (higher ED50, "appears less potent"); baseline <b>no change</b> ("B has no efficacy"); Emax <b>no change</b> ("A can outcompete B", "B is reversible"); shifts <b>symmetrical</b> (10× antagonist = 10× agonist), toward infinity. <small>Day 4 slides ~45–~50; (T) 9/28</small></li>
<li>His pictures: the third wheel with "affinity for the girl, but no efficacy" (the chair game is his partial-agonist picture; the glued chair his irreversible one). <small>(T) 9/28</small></li>
</ul>
<!--IMG:pollev-dotted-x-->
<div class="poll"><b>"The dotted line represents the DRC of the agonist alone and the solid lines represent the DRC of the agonist in the presence of increasing doses of drug "X." Drug X is most likely:"</b> A full agonist / A partial agonist / A competitive antagonist / An irreversible antagonist / An allosteric agonist<br>Key: <b>A competitive antagonist</b> (right, same baseline, same Emax). Same figure with the drug list: <b>Metoprolol</b>. <small>PollEV p.3; Day 4 slide ~55; (T) 9/28</small></div>

<h4>Case 5: full agonist + irreversible antagonist</h4><div class="pair"><!--FIG:shift-irreversible--><!--FIG:shift-irreversible-anim--></div>
<!--FIG:irreversible-->
<ul>
<li>Shift <b>right</b>, baseline <b>no change</b>, Emax <b>falls</b> with each dose, "all the way to 0"; shifts symmetrical; the receptor pool is being removed ("I'm gonna put a glue on the chair"). <small>Day 4 slides ~51–~54 (THM); (T) 9/28</small></li>
<li>Spare receptors delay the Emax drop: with 10% of receptors needed, blocking 75% still gives the max response; below 10% "now my efficacy goes down". <small>Day 4 slide ~56; (T) 9/28</small></li>
<li>Emax rule for the whole tab: only an irreversible antagonist or an allosteric antagonist that affects efficacy lowers Emax; "Everybody else is competitive. Everybody else is reversible, no change to the Emax." <small>(T) 9/28</small></li>
</ul>

<h4>Case 6: full agonist + allosteric agonist or antagonist</h4><div class="pair"><!--FIG:shift-allo-agonist--><!--FIG:shift-allo-agonist-anim--></div><div class="pair"><!--FIG:shift-allo-antagonist--><!--FIG:shift-allo-antagonist-anim--></div>
<!--IMG:pollev-abcde-allo-ag-->
<ul>
<li>Allosteric agonist: <b>left</b> (affinity) and/or <b>up</b> (efficacy, only if the agonist was partial); shifts asymmetrical and saturable; two drugs bound at once. Key on the slide-42 poll: A. <small>Day 4 slides ~25–~34, ~42; (T) 9/28</small></li>
<li>Allosteric antagonist: <b>right</b> (affinity) and/or <b>down</b> (efficacy); asymmetrical; cannot reach zero. Key on the slide-42 poll: E. <small>Day 4 slides ~38–~42; (T) 9/28</small></li>
</ul>

<h4>Distinctions (the summary table)</h4>
<table class="reftab"><thead><tr><th>Second drug added to a full agonist</th><th>Shift</th><th>Baseline</th><th>Emax</th><th>Shifts</th><th>Why</th></tr></thead><tbody>
<tr><td>Full agonist</td><td>Left</td><td>Up (until 100%)</td><td>No change</td><td>—</td><td>Equal efficacy, both help; mutual exclusion</td></tr>
<tr><td>Partial agonist</td><td>—</td><td>Ends at the partial's own efficacy (up from low, down from high)</td><td>Reached only by the full agonist alone</td><td>—</td><td>Competition by mass action; dual nature</td></tr>
<tr><td>Inverse agonist</td><td>Right</td><td>Down to 0%, then no further change</td><td>No change</td><td>Continue toward infinity</td><td>Reversible; negative efficacy; competition</td></tr>
<tr><td>Competitive antagonist</td><td>Right (↑ED50)</td><td>No change (neutral)</td><td>No change (reversible, outcompeted)</td><td>Symmetrical, toward infinity</td><td>Same pocket; law of mass action; 10× = 10×</td></tr>
<tr><td>Irreversible antagonist</td><td>Right (↑ED50)</td><td>No change (neutral)</td><td>Down, all the way to 0</td><td>Symmetrical</td><td>Covalent; greatest affinity; lowers the receptor pool; spare receptors delay the drop</td></tr>
<tr><td>Allosteric agonist</td><td>Left (affinity) and/or up (efficacy)</td><td>—</td><td>Up only if the agonist was partial</td><td>Asymmetrical, saturable</td><td>Two drugs bound at once; non-competitive</td></tr>
<tr><td>Allosteric antagonist</td><td>Right (affinity) and/or down (efficacy)</td><td>—</td><td>Down if efficacy affected; cannot reach 0</td><td>Asymmetrical, saturable</td><td>Binds elsewhere; non-competitive; reversible</td></tr>
</tbody></table>
<p class="sub">Sources: Day 3 slides ~42–~49, ~54–~65; Day 4 slides ~13–~22, ~25–~34, ~38–~42, ~45–~55; (T) 9/28.</p>
<table class="reftab"><thead><tr><th>Pair he confuses students with</th><th>What separates them</th></tr></thead><tbody>
<tr><td>FA + FA vs FA + inverse agonist</td><td>Left, baseline up, Emax same; versus right, baseline down to 0, Emax same. Both reversible.</td></tr>
<tr><td>FA + inverse agonist vs FA + competitive antagonist</td><td>Both shift right with Emax unchanged; only the inverse moves the baseline. At a 0% baseline they give the same figure.</td></tr>
<tr><td>FA + competitive vs FA + irreversible antagonist</td><td>Both shift right, baseline unchanged; only the irreversible lowers Emax. Too few shifts hide the difference; unchanged Emax → competitive.</td></tr>
<tr><td>FA + full agonist vs FA + allosteric agonist</td><td>Both shift left; the full agonist raises the baseline, the allosteric does not and its shifts are asymmetrical and saturable.</td></tr>
<tr><td>FA + partial agonist vs FA + inverse agonist</td><td>The partial ends at its own efficacy (never 0); the inverse ends at 0.</td></tr>
<tr><td>Classes that change Emax vs classes that do not</td><td>Only the irreversible antagonist and the allosteric antagonist affecting efficacy lower Emax; every reversible drug leaves it alone.</td></tr>
<tr><td>Drug X = class vs drug X = drug-list name</td><td>Same figure, two questions: classify first (competitive antagonist), then match to the list (metoprolol; not epinephrine FA, albuterol PA, phenoxybenzamine irreversible, diazepam allosteric agonist).</td></tr>
</tbody></table>
<p class="sub">Sources: Day 4 slides ~21–~22, ~50, ~53–~55; (T) 9/28.</p>

<h4>How he asks it (the elimination he narrates)</h4>
<div class="poll">"Who can you eliminate right away? A full agonist because they'll move you to the left or an allosteric agonist, right? Because that's also would help you somehow. So now you have a 3 ... Why a partial agonist? It would affect the baseline, right? It has efficacy. What could this be, uh, irreversible? It's not changing, right? The Emax is staying the same, so the best answer here is what? Everybody clicked C as in cat." <small>(T) 9/28</small></div>
<div class="poll">"For select all, and I may have one or two in your exam, I don't ask many of those, will never be all, will never be one. It's always 2, 3 or 4." <small>(T) 9/28</small></div>
<div class="poll">"In your exam, I'm gonna give you questions that you need to tell me if it's a partial, or reversible, an inverse, but also the drugs that you have learned from day one." <small>(T) 9/28</small></div>
<div class="poll">"The key thing for you to be able to do this day in and day out on my exam is knowing what affinity is being modulated and efficacy and what this drug is gonna do. If you can do that, you got like 40 points on the exam already just by deduction processes alone." <small>(T) 9/28</small></div>

<h4>Traps</h4>
<ul>
<li>Reading the direction of the shift before asking whether the second drug helps or hinders. <small>(T) 9/28</small></li>
<li>Calling a right-shifted, same-Emax family "irreversible" because a whopping dose would eventually lower it; with the shifts shown, the single best answer is competitive. <small>(T) 9/28</small></li>
<li>Expecting the baseline to keep falling below 0% with more inverse agonist. <small>Day 4 slide ~21; (T) 9/28</small></li>
<li>Expecting the full agonist to lose Emax against loratadine; it is reversible and gets outcompeted. <small>Day 4 slides ~17, ~21; (T) 9/28</small></li>
<li>Choosing C on the allosteric antagonist poll (left and down): "There's no drug in the world that does that." <small>(T) 9/28</small></li>
<li>Knowing the class but not the drug ("this is the type of question that is gonna make a difference between your A and your B's"). <small>(T) 9/28</small></li>
<li>Applying the slide's "high efficacy agonist" qualifier as an exception; the class rule is absolute for a full agonist. <small>Day 4 slide ~22; bank note L04-012</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-sig">
<h3>6. Receptors and signalling</h3>
<h4>What it is</h4>
<ul>
<li>Receptors are regulatory proteins "classified by structure and transduction components". Four classes: <b>ion channels</b> (L-type Ca++ channels, GABA); <b>7-transmembrane</b> G protein–coupled receptors (GPCR: α and β adrenergic, 5HT, histamine); <b>1-transmembrane</b> (tyrosine kinases); <b>intracellular receptors and transcriptional regulators</b> (steroid hormones). <small>Day 1 slides ~34–~36; (T) 9/22; (T) 9/23</small></li>
<li>1-TM: "cross the membrane once. They have this binding pocket on the outside, and they have this enzymatic activity inside of the cell"; growth factors, insulin, cell growth. 7-TM: "cross the membrane 7 times ... this protein inside of the cell which is heterotrimeric ... alpha, beta, and gamma ... sort of like the translator"; "about 60 or more% of all drugs in the market target one of these receptors". <small>Day 1 slides ~35, ~49–~50; (T) 9/22</small></li>
<li>Ion channel types: <b>passive</b> (always open; the funny channel in the SA node lets Na+ in, K+ out, membrane more positive); <b>voltage-gated</b> (open when the membrane potential becomes more positive: Ca++ channels); <b>ligand-gated</b> (usually closed until a ligand binds: acetylcholine at the nicotinic receptor, Na+ in); <b>pumps</b> (use ATP to move ions against their gradient: Na+/K+ ATPase resets the membrane). Stretch channels: baroreceptors in the carotid sinus and aortic arch; "for exam one, I just want you to understand what baroreceptors are". <small>Day 1 slides ~39–~48; (T) 9/23</small></li>
<li>Calcium is "a positive agent": more calcium inside the cell, faster SA node, stronger contraction, more action potentials; "a calcium channel blocker? Positive or negative? Negative." <small>(T) 9/23</small></li>
<li>Three G proteins, defined by the α subunit: <b>Gαs</b> (S = stimulation) → adenylate cyclase (AC) → ↑ cyclic AMP (cAMP); <b>Gαi</b> (I = inhibition) → AC → ↓ cAMP; <b>Gαq</b> ("does something positive", calcium) → phospholipase C (PLC) → inositol trisphosphate (IP3) → Ca++ released from the endoplasmic reticulum (ER). "AC, adenylate cyclase is very similar to the cyclic AMP ... As the alpha Q, you have phospholipase C ... and you have IP3." <small>Day 2 slide ~3; Day 1 slides ~51–~55; (T) 9/23</small></li>
<li>Examples: β1 in the heart is Gαs (↑ heart rate); M2 in the heart is Gαi (↓ heart rate); α2 in the CNS is Gαi (less cAMP, "drowsiness"); α1 in smooth muscle is Gαq (vasoconstriction). "The first thing I need you to know is that we have 3 different types of alpha subunits." <small>Day 2 slides ~3, ~30; (T) 9/23</small></li>
<li>Signal transduction vocabulary: <b>signal</b> (anything that binds and activates the receptor: drug, hormone, neurotransmitter, toxin); <b>receptor</b>; <b>transducer</b> (the G protein, "fancy name for translation"); <b>effector</b> (the enzyme that amplifies: AC or PLC); <b>second messenger</b> (cAMP, PKA, PKC, IP3, Ca++); physiological response. "You can't miss that on the exam." <small>Day 2 slides ~26–~29; (T) 9/23</small></li>
<li>The slide counts PKA and PKC as second messengers; the textbook counts only the small non-protein molecules and calls PKA the enzyme cAMP switches on. "A second messenger is anything cAMP, PKA whatever comes below that." Use the slide list. <small>Day 2 slide ~29; (T) 9/23; bank note L02-019</small></li>
<li>The <b>Gs sequence</b> at β1 in the heart: norepinephrine (NE) binds β1 → receptor activated, changes shape → GDP (diphosphate) comes off, GTP (triphosphate) comes on → α subunit dissociates from β/γ → αs activates AC → ATP → cAMP (second messenger, amplification) → cAMP activates protein kinase A (PKA) → Ca++ enters → increase in heart rate and contractile force. <small>Day 1 slides ~51–~53; PollEV p.1 figure; (T) 9/23</small></li>
<li>What <b>ends</b> it: the drug unbinds; the GTP loses its extra phosphate (GTPase cleavage), sped up by the RGS protein ("chop off that extra phosphate"), GDP re-forms, α/β/γ reassociate; the PDE enzyme "chews up" cAMP. IP3 is recycled and Ca++ is pumped back into the ER. <small>Day 1 slide ~54; (T) 9/23</small></li>
<li>The lecture lists the agonist coming off as one of the ending steps; the textbook says the G protein stays active for seconds after the agonist leaves, so what ends the signal is GTP hydrolysis. Use the lecture list. <small>bank note L02-004</small></li>
<li>Receptor tyrosine kinases (RTKs): the agonist binds, two receptors "dimerize", the tails inside get phosphorylated, downstream Grb2/GEF/RAS/RAF/MEK/ERK drives growth; a tyrosine phosphatase removes the phosphate to reset. Drug X blocking RAS: "I don't have the RAF, I don't have the MEK, I don't have the ERK, my cells don't grow." JAK drug names are "FYI". <small>Day 2 slides ~4–~11; (T) 9/23</small></li>
<li>Nuclear receptors: aldosterone binds the mineralocorticoid receptor (MR) → mRNA for more Na+/K+ pumps and channels in the collecting duct → sodium saved, potassium wasted, water follows sodium; spironolactone blocks the MR. "What is the function of a nuclear receptor? How do they work." <small>Day 2 slides ~12–~14; (T) 9/23</small></li>
<li>Cross-talk: β1 (Gαs, ↑cAMP, ↑HR) and M2 (Gαi, ↓cAMP, ↓HR) act on the same adenylate cyclase in the same heart cell. <small>Day 2 slide ~30; (T) 9/23</small></li>
</ul>

<h4>How to read it on a figure</h4>
<!--FIG:superfamilies--><!--FIG:gpcr-->
<div class="pair"><!--FIG:gpcr-steps--><!--FIG:gpcr-anim--></div>
<div class="pair"><!--FIG:galpha--><!--FIG:galpha-anim--></div>
<h4>How he will ask it (9/30)</h4>
<ul>
<li>"No fill in the blanks ... I can ask like, which of these is a second messenger, which of these is a factor [effector], which of this is a transducer, right, which of this is a signal, uh, I could ask, you know, what are the steps involved in transduction, right? So GDP comes up." <small>(T) 9/30</small></li>
<li>"What I'd like for you to take a step further for your exam one is knowing what is the signal, which one is the receptor, which one is the second messenger, which one is the [effector] system, right? Which one is the [effector] system for the alpha subunits. There's 2. We have PLC and the AC, right? Which one is the transducer that translates that. It's gonna be your alpha S, alpha I or alpha Q, and then we're gonna amplify that message to the second messenger system." <small>(T) 9/30</small></li>
<li>"For purpose on exam one, you need to know cyclic AMP and IP3. Those are two major second messengers that we talked about." Two ways to regulate cAMP: "we're either gonna make it through the AC or we're gonna break it down through the PDE ... caffeine as a PDE inhibitor." <small>(T) 9/30</small></li>
</ul>
<table class="reftab"><thead><tr><th>Component</th><th>Examples he named</th></tr></thead><tbody>
<tr><td>Signal</td><td>Norepinephrine (NE); any drug, hormone, neurotransmitter or toxin that binds and activates the receptor</td></tr>
<tr><td>Receptor</td><td>β1 ("which receptor does norepinephrine binds to? ... beta 1, beta 2, as well as alpha 1 and alpha 2")</td></tr>
<tr><td>Transducer</td><td>The G protein, defined by its α subunit: αs, αi, αq</td></tr>
<tr><td>Effector ("factor system")</td><td>Adenylate cyclase (AC), phospholipase C (PLC): "There's 2."</td></tr>
<tr><td>Second messenger</td><td>cAMP, IP3, Ca++, PKA ("anything cAMP, PKA whatever comes below that")</td></tr>
</tbody></table>
<p class="sub">Sources: (T) 9/30; Jeopardy 9/30 (IMG_3018); Day 2 slides ~26–~29; (T) 9/23.</p>
<p>Forward (the Jeopardy walk-through, Gs at β1):</p>
<ol>
<li>NE binds the β1 receptor.</li>
<li>The receptor changes conformation ("change the receptor confirmation").</li>
<li>GDP comes off the α subunit and GTP binds ("the displacement of the GDP, the diphosphate, and it's replaced with GTP").</li>
<li>αs separates from β/γ ("That's the signal for the beta and the gamma to separate from the alpha").</li>
<li>αs activates adenylate cyclase (the effector).</li>
<li>ATP is converted into cAMP, the second messenger (amplification).</li>
<li>cAMP does the cell signalling (PKA, Ca++) and that causes the physiological response.</li>
</ol>
<p>Reverse ("Everything we do, we gotta be able to reverse"):</p>
<ol>
<li>PDE breaks down cAMP.</li>
<li>The extra phosphate is removed by hydrolysis, GTP → GDP ("that actual phosphate falling off through hydrolysis. We can speed up if we needed to" with RGS/GTPase).</li>
<li>The α subunit reassociates with β/γ ("the alpha reassemble with the beta and the gamma").</li>
<li>The receptor resets ("the receptor kind of pops up") and the process can start again.</li>
</ol>
<p class="sub">The team in Jeopardy said "the alpha binds to adenylate cyclase and then beta and gamma bind to another receptor"; he accepted the gist, but the slides say β/γ stay together and the α subunit carries the signal to the effector ("remember that the beta and the gamma are all together"). Use the slide version. <small>Jeopardy 9/30 (IMG_3018); (T) 9/30; Day 1 slides ~51–~54</small></p>
<!--IMG:pollev-gs-cascade-->
<ul>
<li>Left to right on the poll figure: NE at β1 → Gs (yellow dot = the nucleotide swap) → AC → ATP to cAMP → PKA → Ca++ channel and sarcoplasmic reticulum (SR) Ca++ → increase contractile force; calmodulin/Ca++-Cal is a side branch. <small>PollEV p.1 figure; Day 1 slides ~51–~53</small></li>
<li>Forward = binding, activation, GDP off/GTP on, dissociation, effector, second messenger. Reverse = GTP → GDP (RGS), reassociation, agonist off, PDE. "So I have a way of going forward and a way of going backward." <small>Day 1 slides ~51–~54; (T) 9/23</small></li>
<li>Exam format: "I'll probably use some sort of either matching or, you know, just combinations of process"; "on your exam, I'm gonna give you the entire word and the acronyms for it." <small>(T) 9/23</small></li>
</ul>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>X vs Y</th><th>What separates them</th></tr></thead><tbody>
<tr><td>Gαs vs Gαi vs Gαq</td><td>Gαs → AC → ↑cAMP; Gαi → AC → ↓cAMP; Gαq → PLC → ↑IP3, Ca++. Gαi also uses AC (the opposite direction).</td></tr>
<tr><td>Transducer vs effector vs second messenger</td><td>Transducer = G protein; effector (amplifier) = AC, PLC; second messenger = cAMP, PKA, PKC, IP3, Ca++.</td></tr>
<tr><td>Gs (β1, heart) vs Gq (α1, smooth muscle)</td><td>Gs: AC → ATP → cAMP → ↑ heart rate. Gq: PLC → PIP2 → IP3 → Ca++ from the ER → constriction.</td></tr>
<tr><td>Four receptor classes</td><td>Ion channel (GABA, L-type Ca++); 7-TM GPCR (adrenergic, 5HT, histamine); 1-TM (tyrosine kinase, insulin, growth factors); intracellular/nuclear (steroids, aldosterone).</td></tr>
<tr><td>Passive vs voltage-gated vs ligand-gated vs pump</td><td>Always open; opens at a membrane potential; opens when a ligand binds; moves ions against the gradient with ATP.</td></tr>
<tr><td>Ca++ ion vs Ca++ channel</td><td>The ion is a second messenger; the channel is not ("you shouldn't be picking the receptor or the AC or the calcium channel").</td></tr>
</tbody></table>
<p class="sub">Sources: Day 1 slides ~35–~55; Day 2 slides ~3–~30; (T) 9/22, 9/23.</p>

<h4>How he asks it</h4>
<div class="poll"><b>"Which of the following opens when the membrane potential becomes more positive?"</b> Passive ion channels / Ligand gated channels / Ion pumps / Ca++ channels / None of the above<br>Key: <b>Ca++ channels</b>, "voltage-gated calcium channels that only opens when the membrane becomes more positive". Passive channels are always open, ligand-gated need a signal, pumps reset. <small>PollEV p.1; (T) 9/23</small></div>
<div class="poll"><b>"Rank the sequence of events from 1st to last"</b> (Gs cascade figure): Binding of drug and receptor / alpha s subunit dissociation / AC activation / Increase levels of cAMP / RGS-mediated hydrolyses<br>Key, in his order: <b>binding → αs dissociation → AC activation → ↑cAMP → RGS-mediated hydrolysis</b>. "First step is you have to bind to the receptor ... alpha S going to dissociate ... AC activation is gonna make cAMP ... and now we have to reverse that by removing that extra phosphate." <small>PollEV p.1; (T) 9/23</small></div>
<div class="poll"><b>"Which of the following is CORRECT?"</b> G-proteins are defined and regulated by the beta subunit / Phospholipase C (PLC) is an example of a second messenger / Efficacy is defined by the ability of a drug to bind and stay bound to a receptor / The potency of a drug is dependent on the affinity, efficacy and # of receptors / The higher the Kd, the greater the affinity of a drug for the receptor<br>Key: <b>the potency option</b>. "G proteins are defined and regulated by the beta subunit, no, by who? The alpha ... phospholipase C is an example of a second messenger. No, that's your effector system." <small>PollEV p.1; (T) 9/23</small></div>
<div class="poll"><b>Spoken:</b> "What do you think the I stands for?" — "Inhibition." / "What do you think the Gαi is going to do to the activity of the AC?" — "it's going to cause an inhibition of the AC, and I'm going to have less cAMP being produced." <small>(T) 9/23</small></div>
<div class="poll"><b>Spoken:</b> "If more sodium comes inside of the cell, what's going to happen to that membrane potential? More negative or more positive?" — "Because sodium has a positive charge ... the more positive it's going to become." <small>(T) 9/23</small></div>
<div class="poll"><b>Spoken:</b> "So on your exam, if I ask which of these is an example of a second messenger, cAMP. If there is cAMP and PKA, then select all, right? But you shouldn't be picking the receptor or the AC or the calcium channel." <small>(T) 9/23</small></div>

<h4>Traps</h4>
<ul>
<li>PLC as a second messenger; it is the effector. <small>PollEV p.1 distractor; (T) 9/23</small></li>
<li>The β subunit as the one that defines the G protein; it is α. <small>PollEV p.1 distractor; (T) 9/23</small></li>
<li>Giving Gαi phospholipase C or an increase in cAMP; Gαi works through the same AC as Gαs, in the opposite direction. <small>Day 2 slide ~3; (T) 9/23</small></li>
<li>Picking the receptor, AC or the calcium channel as a second messenger. <small>(T) 9/23</small></li>
<li>Calling the nicotinic receptor voltage-gated; it is ligand-gated (acetylcholine binds two α subunits). <small>Day 1 slides ~44–~48; (T) 9/23</small></li>
<li>Walking through the whole skeletal muscle contraction; "My goal is ... to tell me what a voltage-gated channel is versus a ligand versus a passive, versus a 7 transmembrane or 1 transmembrane." <small>(T) 9/23</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-basics">
<h3>7. Drug basics he tests</h3>
<!--FIG:selectivity-->
<h4>What it is</h4>
<ul>
<li><b>Must know</b> = mechanism of action (MOA): "Is a beta 1 selective or a beta 1 beta 2 non-selective or alpha 1? Those are things that you must know." <b>Should know</b> = site of action (SOA). Effect, adverse drug reactions (ADR) and drug–drug interactions (DDI) are "would be nice to know" because they can be predicted from MOA + SOA. <small>Day 1 slides ~7–~8; (T) 9/22</small></li>
<li>Exam 1 = MOA. Exam 2 = MOA, SOA, ADRs and DDIs. Not tested: use/indication, dose, route, brand names ("for exam purpose, I'm not asking brand names, it's gonna be all generic"). <small>Day 1 slide ~8; (T) 9/28</small></li>
<li>The worked example: metoprolol, a reversible β1 antagonist in the heart → slows the heart rate; ADR bradycardia, fatigue; DDI "anything that would affect the heart and lower the heart rate" (verapamil, diltiazem, clonidine). <small>Day 1 slide ~9; (T) 9/22</small></li>
<li>Dose and selectivity: "the larger the dose gets, the less selective a drug becomes ... Metoprolol is a beta 1 selective up to about 200 mg. Once you go above 200, you start to affect the beta 2s." Start with the smallest dose that produces the desired effect. <small>Day 1 slide ~21; (T) 9/22</small></li>
<li>What a drug is: a chemical substance that alters an ongoing physiological or pathological function; it can initiate, inhibit or modulate a signal; "drugs don't create anything new, they just change whatever is happening in the body". <small>Day 1 slides ~30–~31; (T) 9/22</small></li>
<li>General rules of pharmacodynamics: a drug has to get to the site of action; a drug has to have affinity for the receptor ("true to 99% of our drugs"; osmotic diuretics are the exception); drugs do not create anything, they modify a signal. <small>Day 2 slide ~31; (T) 9/23</small></li>
<li>Classify by MOA, not by structure: the benzothiadiazine ring does not predict anything; "Na+/Cl− symporter antagonist at the distal convoluted tubule" predicts diuresis ("Whatever sodium goes, water follows"), hyponatremia and the antihypertensive use. <small>Day 1 slides ~32–~33; (T) 9/22</small></li>
<li>Selective vs non-selective: loratadine is "a selective H1 inverse agonist"; diphenhydramine "binds to the H1, it binds to the H2. It binds to muscarinic receptors. It's very non-selective." <small>Day 1 slide ~29; (T) 9/22</small></li>
<li><b>Natural dietary supplements (NDS)</b>: a label "cannot state that this supplement is going to treat, cure, or diagnose or prevent"; regulated as food ("less oversight by the FDA ... until they cause harm, they're still in the market"); a $70 billion/year industry against a $28 million research budget; about half the population takes one; herbal products have active ingredients and drug–drug interactions (aspirin from a tree, digoxin from a flower, warfarin from a clover); patients don't report them. "Cyanide is natural. Would you take it?" <small>Day 1 slides ~15–~20; (T) 9/22</small></li>
<li>"I'm probably gonna have about 2 questions on the exam about supplements, and it's gonna be pretty common sense." <small>(T) 9/22</small></li>
<li><b>Safety vs efficacy</b>: his answer is efficacy: "if I have two drugs and one is safer than the other, but they have equal efficacy, by all means pick the safer drug" but "if your patient is not going to survive, why is the matter that the drug is safe? ... please choose the most efficacious drug." <small>Day 1 slides ~25–~26; (T) 9/22</small></li>
<li>His test-taking rule: "If you have a question, and you have to add an if to it. You're most likely wrong." <small>(T) 9/23</small></li>
</ul>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>X vs Y</th><th>What separates them</th></tr></thead><tbody>
<tr><td>Must know vs should know</td><td>MOA (what it does to which receptor) vs SOA (where the receptor is). Effect/ADR/DDI are predicted from the two.</td></tr>
<tr><td>Safety vs efficacy</td><td>If the safe drug does not work, choose the efficacious one; if efficacy is equal, choose the safer.</td></tr>
<tr><td>Classify by structure vs by MOA</td><td>Structure (thiazide ring) predicts nothing; MOA + SOA predicts diuresis, hyponatremia, antihypertensive use.</td></tr>
<tr><td>Loratadine vs diphenhydramine</td><td>Selective H1 inverse agonist vs non-selective (H1, H2, muscarinic; "9 out of 10 people ... go to sleep").</td></tr>
<tr><td>Pharmacological vs apparent potency</td><td>Affinity, efficacy, tissue vs the same plus route, first-pass, age, absorption, distribution, elimination. IV has 100% bioavailability.</td></tr>
</tbody></table>
<p class="sub">Sources: Day 1 slides ~7–~9, ~15–~33; (T) 9/22, 9/23.</p>

<h4>How he asks it</h4>
<div class="poll"><b>"Which statement is INCORRECT about natural dietary supplements (NDS)?"</b> Most of NDS packaging labels state that they can cure diseases / NDS are tested by the FDA just like prescription drugs / NDS have been used for centuries, thus are safe &amp; effective / NDS are natural, thus they have a low risk for drug interactions / All of the above<br>Key: <b>All of the above</b> (90% of the class). "If there are two answers other than a select all that you know absolutely are correct, just go for the all the above." <small>PollEV p.1; Day 1 slide ~18; (T) 9/22</small></div>
<div class="poll"><b>"Which statement is CORRECT?"</b> The route of administration can affect the potency of a drug / Drugs can bind to a receptor with high affinity than to other receptors / The ability of the drug to reach the site of action can affect it potency / Ion channels are typically expressed on the cell membranes / All the above<br>Key: <b>All the above</b> (100% of the class). <small>PollEV p.1; Day 1 slide ~24; (T) 9/22</small></div>
<div class="poll"><b>"Which is more important?"</b> Safety / Efficacy / None of the above<br>Key: <b>Efficacy</b> (his position). The green highlight on "Safety" in the PollEV file marks a student response, not the key; the transcript gives his answer and he closed with "at least 99% of you agree with me". <small>PollEV p.1; (T) 9/22; bank note PE-003</small></div>
<div class="poll"><b>"If your patient has fungal pneumonia, which would you chose?"</b> A drug that is very safe, but not efficacious / A drug that is very efficacious, but not as safe<br>Key: <b>very efficacious, but not as safe</b>. "Using a topical antifungal, which is very, very safe, it's not going to really do anything for your patient. Actually, they are going to die of fungal pneumonia." <small>PollEV p.1; Day 1 slide ~26; (T) 9/22</small></div>
<div class="poll"><b>Spoken:</b> "If I give you metoprolol, which is a beta 1 selective antagonist, and beta ones are in the heart, what kind of effect is it going to produce?" — "Slow down the heart rate ... severe bradycardia ... fatigue." <small>(T) 9/22</small></div>
<div class="poll"><b>Spoken:</b> "What does that tell you to be large and have a charge to it, positive or negative? You can't absorb, right?" (curare). <small>(T) 9/22</small></div>
<div class="poll"><b>Spoken:</b> "which route has the 100% bioavailability? IV" / "A lot of drugs are metabolized in the liver, broken down, which decreases what? The bioavailability." <small>(T) 9/22</small></div>

<h4>Traps</h4>
<ul>
<li>"Natural, thus safe" and "used for centuries, thus safe &amp; effective"; every NDS statement on the poll was wrong. <small>PollEV p.1; (T) 9/22</small></li>
<li>Choosing "very safe but not efficacious" for a fatal infection. <small>PollEV p.1; (T) 9/22</small></li>
<li>Swapping MOA and SOA; thinking brand names, dose or route are tested on Exam 1. <small>Day 1 slide ~8; (T) 9/22</small></li>
<li>Predicting decreased urination or more blood volume from a thiazide; sodium out means water out. <small>Day 1 slide ~33; (T) 9/22</small></li>
<li>Answering the pharmacological/apparent potency label from the transcript; the slide grouping is the exam's. <small>Day 1 slide ~27; bank note L01-015</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-drugs">
<h3>8. The Exam 1 drug list</h3>
<h4>What it is</h4>
<ul>
<li>Fifteen drugs; every drug on the list is reversible and competitive except phenoxybenzamine, the one irreversible drug. <small>Exam_1_Drug_List_2026.pdf Table 1; (T) 9/28 "Phenoxybenzamine is the only irreversible that is on your list"</small></li>
<li>Only MOA is tested on Exam 1; "in your exam, I'm gonna give you questions that you need to tell me if it's a partial, or reversible, an inverse, but also the drugs that you have learned from day one." <small>Day 1 slide ~8; (T) 9/28</small></li>
</ul>
<!--FIG:classes-->
<table class="reftab"><thead><tr><th>Drug</th><th>Mechanism of action (class at the receptor)</th><th>Receptor family</th><th>Where he uses it</th></tr></thead><tbody>
<tr><td>Norepinephrine (NE)</td><td>α1, α2, β1, β2 agonist (full)</td><td>Adrenergic</td><td>The reference full agonist at β1 in the heart (Gs → AC → cAMP → ↑ heart rate); the "DRC B alone" in the NE + epinephrine and dotted-line polls; NE + Levophed (synthetic NE) for FA + FA. <small>Day 1 slide ~51; Day 2 slide ~52; Day 3 slide ~42; PollEV p.3; (T) 9/28</small></td></tr>
<tr><td>Epinephrine</td><td>α1, α2, β1, β2 agonist (full)</td><td>Adrenergic</td><td>The second full agonist added to NE (shift left, key A); the full-agonist distractor on the dotted-line poll; physiological antagonist of acetylcholine in the heart. <small>Day 4 slides ~3, ~35, ~55; (T) 9/28</small></td></tr>
<tr><td>Phenylephrine</td><td>α1 agonist</td><td>Adrenergic</td><td>The orthosteric agonist labelled on the binding-interaction slide. <small>Day 2 slide ~18</small></td></tr>
<tr><td>Prazosin</td><td>α1 antagonist (reversible)</td><td>Adrenergic</td><td>The reversible, competitive, surmountable antagonist compared with phenoxybenzamine ("any drug that has an -osin in it"); poll: phenoxybenzamine has the higher affinity. <small>Day 2 slides ~18, ~37; PollEV p.1; (T) 9/23</small></td></tr>
<tr><td>Phenoxybenzamine</td><td>α1 and α2 antagonist (<b>irreversible</b>, covalent)</td><td>Adrenergic</td><td>The only irreversible drug; the irreversible-antagonist distractor on the dotted-line poll; highest affinity (smallest Kd); less selective than the α1-selective drugs. <small>Day 2 slide ~18; Day 4 slides ~51, ~55; PollEV p.1, p.3; (T) 9/23; (T) 9/28</small></td></tr>
<tr><td>Metoprolol</td><td>β1 antagonist (reversible)</td><td>Adrenergic</td><td>The must-know MOA example (slows the heart, β1-selective up to ~200 mg); the competitive antagonist keyed on the dotted-line poll (drug X = metoprolol). <small>Day 1 slide ~9; Day 4 slide ~55; PollEV p.3; (T) 9/22; (T) 9/28</small></td></tr>
<tr><td>Albuterol</td><td>β2 partial agonist</td><td>Adrenergic</td><td>The partial agonist keyed on "Which of the following drugs is a partial agonist?"; the partial distractor on the dotted-line poll; "You don't have to open up your airways 100%". <small>Day 3 slide ~53; PollEV p.2, p.3; (T) 9/23; (T) 9/24; (T) 9/28</small></td></tr>
<tr><td>Pindolol</td><td>β1 and β2 partial agonist</td><td>Adrenergic</td><td>Named only in the Day 3 recap as a partial agonist (the numbers in the transcript are garbled). <small>Drug list Table 1; (T) 9/24</small></td></tr>
<tr><td>Acetylcholine (ACh)</td><td>Agonist at muscarinic (M1, M2, M3) and nicotinic (Nn, Nm) receptors</td><td>Cholinergic</td><td>The ligand for the ligand-gated nicotinic channel (binds two α subunits, Na+ in); M2 in the heart is Gαi (↓ heart rate); physiological antagonist of epinephrine in the heart. <small>Day 1 slides ~44–~48; Day 2 slide ~30; Day 4 slide ~35; (T) 9/23; (T) 9/28</small></td></tr>
<tr><td>Tropicamide</td><td>Muscarinic (M1, M2, M3) antagonist (reversible)</td><td>Cholinergic</td><td>Drug list only; a neutral-antagonist distractor on the loratadine dotted-line poll. <small>Drug list Table 1; PollEV (v2) p.5</small></td></tr>
<tr><td>Varenicline</td><td>Nicotinic (Nn) partial agonist</td><td>Cholinergic</td><td>The partial-agonist "dual nature" example: lifts a withdrawal baseline, outcompetes a cigarette's nicotine. <small>Day 3 slides ~53, ~64–~65; (T) 9/28</small></td></tr>
<tr><td>Histamine</td><td>H1 and H2 agonist (full)</td><td>Histamine</td><td>The full agonist in the FA + inverse agonist case (histamine + loratadine); a full-agonist distractor on the partial-agonist poll. <small>Day 4 slides ~13–~15; PollEV p.2; (T) 9/28</small></td></tr>
<tr><td>Loratadine</td><td>H1 inverse agonist (selective)</td><td>Histamine</td><td>"There's only one inverse agonist you need to know"; curve E in Figure 1 (baseline to 0); the inverse agonist added to histamine (right shift, baseline to 0, Emax same). <small>Day 1 slide ~29; Day 2 slide ~35; Day 4 slides ~13–~24; PollEV p.3; (T) 9/22; (T) 9/28</small></td></tr>
<tr><td>Diphenhydramine</td><td>Non-selective histamine receptor antagonist (H1, H2, muscarinic)</td><td>Histamine</td><td>The non-selective contrast to loratadine ("It is going to knock you out"). <small>Day 1 slide ~29; (T) 9/22</small></td></tr>
<tr><td>Diazepam</td><td>GABA-A receptor allosteric agonist (positive allosteric modulator)</td><td>GABA</td><td>"Our known allosteric agonist that you have to know for your exam"; enlarges the GABA pocket, more chloride in; the allosteric-agonist distractor on the dotted-line poll. <small>Day 2 slides ~21–~24; Day 4 slide ~55; PollEV p.3; (T) 9/23; (T) 9/28</small></td></tr>
</tbody></table>
<p class="sub">Sources: Exam_1_Drug_List_2026.pdf Table 1 (MOA and family columns); lecture cites in the last column.</p>

<h4>Drugs he uses that are not on the list</h4>
<ul>
<li>Levophed: "a synthetic norepinephrine ... they're both full agonists"; the FA + FA example. <small>Day 3 slide ~42; (T) 9/28</small></li>
<li>Dopamine (full, 100%) and aripiprazole (partial, 60%): the FA + partial agonist example in a manic patient. <small>Day 3 slides ~54–~56; (T) 9/28</small></li>
<li>Caffeine (blocks PDE, cAMP rises) and a RAS-blocking cancer drug: indirect antagonists. <small>Day 2 slides ~40–~41; (T) 9/23</small></li>
<li>Aspirin, omeprazole, clopidogrel, organophosphates: covalent (irreversible) binders. <small>Day 2 slide ~15; (T) 9/23</small></li>
<li>Dimercaprol (chemical antagonist, chelator). <small>Day 4 slide ~35; (T) 9/28</small></li>
<li>Buprenorphine, oxymetazoline, pilocarpine: partial agonists on the Day 3 table. <small>Day 3 slide ~53</small></li>
<li>Alcohol and barbiturates: allosteric agonists at GABA-A alongside benzodiazepines. <small>Day 2 slides ~21–~23; (T) 9/23</small></li>
<li>Cetirizine (Zyrtec) with loratadine: antihistamine inverse agonists. <small>Day 4 slide ~23; (T) 9/23</small></li>
</ul>

<h4>How he asks it</h4>
<div class="poll"><b>"Which of the following drugs is a partial agonist?"</b> Epinephrine / Histamine / Albuterol / Acetylcholine / Metoprolol → <b>Albuterol</b>. <small>PollEV p.2; (T) 9/28</small></div>
<div class="poll"><b>"DRC "E" most likely represents the DRC of:"</b> NE / Albuterol / Loratadine / Epinephrine → <b>Loratadine</b>. <small>PollEV p.3; (T) 9/28</small></div>
<div class="poll"><b>"The dotted line represents the DRC of norepinephrine alone ... Drug X is most likely:"</b> Epinephrine / Albuterol / Phenoxybenzamine / Metoprolol / Diazepam → <b>Metoprolol</b>. <small>PollEV p.3; (T) 9/28</small></div>
<div class="poll"><b>"Phenoxybenzamine has higher affinity than prazosin"</b> → the correct option. <small>PollEV p.1; (T) 9/23</small></div>
<div class="poll"><b>"If DRC B is the DRC of NE binding to the beta 1 receptor alone, which DRC best represents the DRC of NE in the presence of epinephrine?"</b> → <b>A</b>. <small>PollEV p.3; (T) 9/28</small></div>

<h4>Traps</h4>
<ul>
<li>Knowing the class but not the drug: "if you haven't listened to me and you haven't started your drug list, now you're in trouble because you have no idea what it is." <small>(T) 9/28</small></li>
<li>Treating prazosin, metoprolol or tropicamide as anything other than reversible/competitive; only phenoxybenzamine is irreversible. <small>Drug list Table 1; (T) 9/28</small></li>
<li>Calling loratadine an antagonist; it is the inverse agonist (it lowers a raised baseline to 0). <small>Day 4 slides ~23–~24; (T) 9/28</small></li>
<li>Reading "allosteric agonist" (diazepam) as an agonist that moves a curve on its own; it changes what GABA does at the pocket. <small>Day 2 slides ~21–~24; (T) 9/23</small></li>
<li>Reading "Levophed" as a different class from norepinephrine; it is a synthetic norepinephrine with equal efficacy. <small>Day 3 slide ~42; (T) 9/28</small></li>
</ul>
</section>

<!-- ===================================================================== -->
<section class="guide" id="g-day5">
<h3>9. Day 5 (9/29): spare receptors, indirect antagonists, receptor regulation, quantal responses, therapeutic index</h3>
<p class="sub">Cites in this guide: <i>Part 2 page N</i> = Pharmacodynamics Day 4 &amp; 5, Part 2 deck (page markers are real); <i>(T) 9/29</i> = the 9/29 transcript.</p>

<h4>Spare receptors: what it is</h4>
<!--FIG:spare-->
<ul>
<li>"In many cases, 100% effect comes from less than 100% receptor binding": catecholamines (norepinephrine, epinephrine) bind about 10% of the β-adrenoceptors in the heart to evoke the maximal heart rate. Clark's idea that a full agonist has to occupy 100% of the receptors "is not true". <small>Part 2 page 1; (T) 9/29 "They only need about 10%"</small></li>
<li>Occupying more than the 10% adds nothing: "If 160 is at 10% of occupancy, I can go 15, I can go 20, I can go 50% occupancy. I'm still at 160." With an irreversible antagonist on some receptors "I still got another 90% of receptors available". <small>(T) 9/29</small></li>
<li>Tissue with a lot of receptors: more sensitive to an agonist, less sensitive to an antagonist, and responds to a non-competitive or irreversible antagonist "as if it were competitive (initially)". Tissue with fewer receptors: less sensitive to an agonist, more sensitive to an antagonist, "Emax drops faster in response to a non-competitive". <small>Part 2 pages 2–3; (T) 9/29 "more receptors, better for the agonist. Less receptors, better for the antagonist"</small></li>
<li>His chairs: a room with 110 chairs versus 50, same blindfolded students; the agonist finds a chair more easily where there are more, and the antagonist "now has more chairs to cover". <small>(T) 9/29</small></li>
<li>The body raises or lowers the number of spare receptors "depending on what your patient is on"; this is the link to regulation. <small>Part 2 page 17 ("↑Spare Receptors, compensatory mechanism"); (T) 9/29</small></li>
</ul>

<h4>Indirect antagonists: what it is</h4>
<ul>
<li>An indirect antagonist inhibits "the generation of a biological response by acting at some point down stream of the receptor"; in class: "either downstream or upstream from that receptor ... they are affecting the signal or something upstream"; can be reversible or irreversible. Slide examples: phosphodiesterase inhibitors (milrinone), cancer drugs. <small>Part 2 page 4; (T) 9/29</small></li>
<li>PDE inhibitor (milrinone, caffeine): blocks the enzyme that breaks down cAMP, "taking away the brakes", cAMP rises, a partial agonist "now he's behaving like a full agonist"; "Increasing the potency of an agonist". <small>Part 2 pages 5–6; (T) 9/29</small></li>
<li>RAS-blocking cancer drug: less signal down GEF/RAS/RAF/MEK/ERK, "Decreasing the potency of an agonist"; "I used to be a full agonist, and I'm a partial, less efficacious". <small>Part 2 pages 7–8; (T) 9/29</small></li>
<li>Selective serotonin reuptake inhibitors (SSRIs, fluoxetine/Prozac) and serotonin–norepinephrine reuptake inhibitors (SNRIs, duloxetine/Cymbalta) block the reuptake transporter (SERT for serotonin; the noradrenaline re-uptake transporter), so more neurotransmitter stays in the synaptic cleft: the serotonin curve shifts left ("making serotonin more potent by taking away its break down"); efficacy is unchanged because "Still serotonin. You didn't change the drug." Takes about a month to reach a baseline level. <small>Part 2 pages 9–11; (T) 9/29</small></li>
<li>Acetylcholinesterase inhibitors (physostigmine, "any drug that starts with a -stigmine") block the enzyme that breaks down acetylcholine; more acetylcholine, curve shifts left. Used in myasthenia gravis, an autoimmune disease where antibodies target the nicotinic receptors in skeletal muscle. <small>Part 2 pages 12–13; (T) 9/29</small></li>
<li>Same principle, different target: transporter (SSRI/SNRI, cocaine), enzyme (physostigmine, carbidopa), or a cascade component (PDE, RAS). "It's still indirect because it's not directly affecting the receptor itself, it's just changing the concentration of the neurotransmitter." <small>(T) 9/29</small></li>
<li>Exogenous vs endogenous: the slide's only text is "From nerves" and "From you"; the pair was not explained aloud. <small>Part 2 pages 14–15</small></li>
<li>Enhancement of drug effects: addition (two drugs, same effect, result = the sum: trimethoprim + sulfamethoxazole); synergism (result greater than the sum: penicillin + gentamicin, "1 plus 1 and you get 5"); potentiation (one drug has no effect alone but increases the other: carbidopa + dopa, carbidopa being an indirect antagonist of the gut enzyme that breaks down dopa). "I don't think I have any of these drugs on your drug list ... it's just FYI." <small>Part 2 pages 30–31; (T) 9/29</small></li>
</ul>
<h4>Indirect antagonists: where each drug acts</h4>
<div class="pair"><!--FIG:ind-snri--><!--FIG:ind-snri-anim--></div>
<div class="pair"><!--FIG:ind-ssri--><!--FIG:ind-ssri-anim--></div>
<div class="pair"><!--FIG:ind-ache--><!--FIG:ind-ache-anim--></div>
<div class="pair"><!--FIG:ind-carbidopa--><!--FIG:ind-carbidopa-anim--></div>
<div class="pair"><!--FIG:ind-pde--><!--FIG:ind-pde-anim--></div>
<div class="pair"><!--FIG:ind-ras--><!--FIG:ind-ras-anim--></div>
<h3>Addition, synergism, potentiation (Part 2 pages 30–31)</h3>
<div class="pair"><!--FIG:enhance--><!--FIG:enhance-anim--></div>
<!--IMG:pollev-abcde-duloxetine-->
<ul>
<li>On the NE-alone figure, the reuptake blocker moves B to A (left, same Emax). He then ran the other permutations aloud: competitive antagonist → D; irreversible → "either C or E, depending on how much spare receptors they would have"; allosteric antagonist affinity only → D; affinity and efficacy → C and E; allosteric agonist affinity only or another full agonist → A. "I guarantee you, you're going to see this figure in your exam." <small>PollEV (v2) p.5; (T) 9/29</small></li>
</ul>

<h4>Receptor regulation: what it is</h4>
<ul>
<li>Receptors are regulated by synthesis and degradation, covalent modification, association with other regulatory proteins, and re-localization within the cell (endocytosis, then recycling or breakdown). <small>Part 2 pages 16, 21; (T) 9/29</small></li>
<li><b>Up-regulation</b> follows chronic reduction of receptor stimulation (an antagonist or inverse agonist); <b>down-regulation</b> follows chronic exposure to a stimulus (an agonist). "An antagonist will up regulate, an agonist is going to down regulate because our body is going to do the opposite to maintain that homeostasis." <small>Part 2 page 17; (T) 9/29</small></li>
<li>Up-regulation increases the potency of a full agonist (shift left) and the potency and/or maximal response of a partial agonist ("I can even make a drug who behaves like a partial agonist to become a full agonist because now I have enough receptors"). <small>Part 2 page 18; (T) 9/29</small></li>
<li>Clinical up-regulation (four on the slide, "you don't have to memorize this for the exam"): prolonged antagonist use → stepwise tapering (β-blockers increase the number of functional cardiac β-adrenoceptors: "Do not go cold turkey ... hypertensive crisis"); chronic denervation (spinal injury → supersensitive to nicotinic agents); thyroid hormone increases cardiac β-adrenoceptor sensitivity to catecholamines; cardiac ischemia. <small>Part 2 page 19; (T) 9/29</small></li>
<li>Down-regulation/desensitization is "analogous to the effects of irreversible acting antagonists"; causes: too much agonist stimulation, temporary inaccessibility of the receptor, fewer receptors synthesized at the surface, too much GPCR stimulation. Afrin (an α agonist nasal decongestant) and the ICU Levophed drip ("if you shut down that IV drip, they're gonna tank") are his examples. <small>Part 2 page 20; (T) 9/29</small></li>
<li>Time course: "over a period of several seconds, minutes, hours or days". <b>Rapid</b> = a regulatory protein binding and unbinding ("like a band-aid"). <b>Long-term</b> = synthesis, degradation, internalization; "that takes time". <small>Part 2 page 21; (T) 9/29</small></li>
<li><b>Rapid desensitization of a GPCR</b>: the agonist binds and activates; the receptor becomes a substrate for a GPCR kinase (GRK), which phosphorylates its tail; that allows β-arrestin to bind; cAMP production stops and the α subunit cannot reassociate and reset until the drug comes off ("when a person gets arrested ... they're going nowhere"); within milliseconds. cAMP on this slide "is a second messenger. Test question right there." <small>Part 2 pages 22–24; (T) 9/29</small></li>
<li><b>Long-term down-regulation</b>: with continued stimulation β-arrestin facilitates uptake into coated pits, endocytosis engulfs the receptor, then recycling or lysosomal degradation. Cocaine (an indirect antagonist that blocks NE reuptake) and opioids drive it: tolerance, "instead of having one little sniff, you go to two sniffs". <small>Part 2 pages 25–27; (T) 9/29</small></li>
<li>Clinical down-regulation: tolerance ("the effects that follow continued exposure to the same concentration of drug is diminished": opioid analgesics, α-adrenoceptor nasal decongestants) and myasthenia gravis (antibody to the nicotinic receptor at the neuromuscular junction). <small>Part 2 page 29; (T) 9/29</small></li>
</ul>
<h4>Receptor regulation: the receptor at each step</h4>
<div class="pair"><!--FIG:desens-rapid--><!--FIG:desens-rapid-anim--></div>
<div class="pair"><!--FIG:desens-long--><!--FIG:desens-long-anim--></div>
<div class="pair"><!--FIG:upreg--><!--FIG:upreg-anim--></div>
<div class="pair"><!--FIG:downreg--><!--FIG:downreg-anim--></div>
<!--FIG:reg-chain-->

<h4>How to read it on a curve</h4>
<!--GRAPH:{"curves":[{"label":"high","ec":-1.5,"emax":100},{"label":"mid","ec":0.2,"emax":75},{"label":"low","ec":1.4,"emax":30}],"base":0,"x":"log [agonist]","y":"fractional response (%)","caption":"One agonist in three tissues of falling receptor density (Part 2 page 28): with fewer receptors the ED50 moves right (about 10^-7 to 10^-4.5 to 10^-3.5 on his slide) and the maximal response falls, the same picture as an irreversible antagonist."}-->
<ul>
<li>Receptor density figure: high density, the drug "can produce its full effect, it's going to behave like a full agonist"; as density falls "it's requiring even more doses ... I'm not only decreasing my affinity of my drug, but also I'm decreasing the ability to produce the max effect ... just like I would with any irreversible antagonist" (handwritten: "less receptors available, ↓ potency &amp; efficacy"). <small>Part 2 page 28; (T) 9/29</small></li>
<li>After long-term down-regulation the norepinephrine curve shifts to the <b>right</b> ("it's gonna require more of it to produce equivalent responses"). The handwritten note on the slide reads "shift left b/c going to require more of it"; the transcript and the slide's own curve say right; use right. <small>Part 2 pages 25–26; (T) 9/29</small></li>
</ul>
<!--GRAPH:{"curves":[{"label":"FA","ec":0,"emax":100,"dashed":true},{"label":"FA up","ec":-1.1,"emax":100},{"label":"PA","ec":0.6,"emax":55,"dashed":true},{"label":"PA up","ec":-0.3,"emax":100}],"base":0,"x":"log [agonist]","y":"% of maximal response","caption":"Up-regulation (Part 2 page 18): a full agonist (dashed) becomes more potent (shift left); a partial agonist (dashed) gains potency and/or maximal response, up to a full response when there are enough receptors to bind."}-->
<ul>
<li>Up-regulation: shift left for the full agonist; shift left and up for the partial. Down-regulation: shift right and, when receptors run short, down. Rapid desensitization on the cAMP trace: production rises with the agonist and then goes flat while the drug is still bound. <small>Part 2 pages 18, 22–24, 26; (T) 9/29</small></li>
</ul>

<h4>Quantal responses, therapeutic index, safety index: what it is</h4>
<ul>
<li>Individual vs population: every example so far was one sample (degree of muscle contraction with nicotine, degree of paralysis by curare), measured "on scale from no effect to maximum": a <b>graded</b> response. Populations are studied with a <b>quantal</b> response. <small>Part 2 page 32; (T) 9/29</small></li>
<li>Quantal = binary: "Any effect or none. Alive or dead. 5% increase in BP"; a bar graph of number responding vs dose ("joining peaks may make a normal distribution curve"). His dogs: epinephrine from 7.7 to 108 ng/kg/min, a chihuahua sensitive at 7.7, a resistant dog at 108. <small>Part 2 page 33; (T) 9/29</small></li>
<li>Graphing quantal data cumulatively "creates a sigmoidal curve" and lets ligands be compared in a population; the dose treating 50% of the dogs (about 29 ng/kg) becomes the starting dose. <small>Part 2 page 34; (T) 9/29</small></li>
<li>His Tylenol "project graduation": acetaminophen 325 mg (regular) or 500 mg (extra strength) per tablet; above 4000 mg/day liver toxicity; 100 mg then evaluation every 15 minutes (headache: yes or no); the non-cumulative bars become a cumulative curve whose 50% point (325 mg) is the effective dose for half the class. <small>Part 2 pages 36–38; (T) 9/29</small></li>
<li><b>Therapeutic index (TI)</b> "estimates the drug margin of safety", the ratio of therapeutic effect to toxic effect (lethal or sub-lethal); an undesired action is a side effect (adverse drug reaction, ADR). Handwritten: "window of doses btwn the good &amp; bad of the drug". <small>Part 2 page 35; (T) 9/29</small></li>
<li>ED50 = dose that protects (treats) 50% of the population; LD50 = dose that kills 50% of the population; <b>TI = LD50 / ED50</b>; "The larger the ratio the safer the drug". Phenobarbital TI = 40 / 4 = 10; alprazolam TI = 2500. Handwritten: "NTK how to calculate". <small>Part 2 page 39; (T) 9/29</small></li>
<li>LD50 in people comes from animals and from overdose data once a drug is marketed (warfarin was a rat poison until "somebody trying to kill themselves ... didn't die"). <small>(T) 9/29</small></li>
<li>The lethal curve sits to the right of the effective curve "because we want to treat people before we kill them"; his textbook figure: LD50 160 / ED50 10, TI = 16 ("Is this drug safe? Barely"). "That's really the only math you're gonna do for me in the exam ... whole numbers with zero." <small>Part 2 page 40; (T) 9/29</small></li>
<li>TI "is a statement of how selective a drug is in producing its desired effects"; "No drug produces a single effect": codeine has a very small TI for pain and a huge one for cough. <small>Part 2 page 41; (T) 9/29</small></li>
<li><b>Safety index (SI) = LD1 / ED99</b>, the dose that kills 1% over the dose that treats 99%; "For a drug to be safe the ED99 should be less than the LD1"; "Biggest SI = safer it is". Slide figure: TI = 100 / 0.1 = 1000 but SI = 1 / 10 = 0.1: "For every 100 patients, 99 will get a good night of sleep and one will die ... Not very safe drug!" (The transcript renders the value as "1.1"; the slide's 0.1 is the number.) <small>Part 2 page 42; (T) 9/29</small></li>
<li>His poll figure: hypnosis curve ED50 = 100 µg/kg, death curve LD50 = 400 µg/kg, TI = 400 / 100 = 4; and it is not safe because the LD1 sits at about the ED99: "you're already killing people before we treat even all the population". On the exam the ED50/LD50 will not be labelled. <small>PollEV (v2) p.5; (T) 9/29</small></li>
<li><b>Therapeutic window</b>: "the range of steady-state concentrations of drug that provides therapeutic efficacy with minimal toxicity"; the acceptable risk "depends critically on the severity of the disease being treated" (headache vs Hodgkin's lymphoma). <small>Part 2 page 43; (T) 9/29 "Unfortunately some drugs are very toxic, but we have no other options"</small></li>
<li><b>Effect vs side effect</b>: side effects are "predictable if pharmacology of a ligand is known" (ligand → receptor → cell function → clinical response); sildenafil was in trial for blood pressure and its side effect became the product; minoxidil, a drug for hypertensive crisis, is now sold for hair loss. <small>Part 2 page 44; (T) 9/29</small></li>
<li>Exam facts he gave: "about 50 questions on the exam ... 50 questions, 2 points each"; the standing record is 36 minutes. <small>(T) 9/29</small></li>
</ul>

<h4>How to read it on a curve</h4>
<!--FIG:quantal-->
<!--IMG:pollev-quantal-ti-->
<ul>
<li>y-axis = percent of individuals responding (cumulative), not percent of maximal effect; x-axis = dose. Draw the line at 50%: where it crosses the left (effect) curve is the ED50, where it crosses the right (lethal) curve is the LD50; divide. <small>Part 2 pages 39–40; (T) 9/29 "you need to find the LD50, you gotta find the ED50, and when you divide them"</small></li>
<li>Then look at the tails: the dose at 99% of the effect curve (ED99) against the dose at 1% of the lethal curve (LD1). If they touch or cross, people die before everyone is treated. <small>Part 2 page 42; (T) 9/29</small></li>
<li>"The farther the ED50 is from the LD50, the bigger the number is gonna be ... The closer they are, oh boy." <small>(T) 9/29</small></li>
</ul>

<h4>Distinctions</h4>
<table class="reftab"><thead><tr><th>X vs Y</th><th>What separates them</th></tr></thead><tbody>
<tr><td>Many spare receptors vs few</td><td>Many: agonist more potent, antagonist weaker, irreversible antagonist looks competitive for several shifts. Few: agonist less potent, antagonist stronger, Emax drops fast.</td></tr>
<tr><td>Indirect antagonist vs allosteric drug</td><td>Indirect: upstream or downstream of the receptor (transporter, enzyme, cascade); can raise or lower the response. Allosteric: another site on the receptor itself. The poll distractor merges the two.</td></tr>
<tr><td>Up-regulation vs down-regulation</td><td>Up follows chronic antagonist/inverse agonist (β-blocker; taper, do not stop cold turkey); agonist curve shifts left. Down follows chronic agonist (Afrin, opioids, cocaine); curve shifts right and Emax can fall; tolerance.</td></tr>
<tr><td>Rapid vs long-term regulation</td><td>Rapid: GRK phosphorylates, β-arrestin binds, milliseconds, reversible when the drug comes off. Long-term: synthesis, degradation, internalization by endocytosis (coated pits, recycling or lysosome); takes time.</td></tr>
<tr><td>Graded vs quantal response</td><td>Graded: one individual, scale from none to maximum, y = % of maximal effect. Quantal: population, all-or-none, y = % of individuals responding; ED50 and LD50 are population doses.</td></tr>
<tr><td>Therapeutic index vs safety index</td><td>TI = LD50/ED50 (midpoints). SI = LD1/ED99 (tails). A drug can have a large TI and a bad SI (TI 1000, SI 0.1); both must be large.</td></tr>
<tr><td>Therapeutic index vs therapeutic window</td><td>TI is a ratio of two doses. The window is the range of steady-state concentrations that treats with minimal toxicity; how much toxicity is acceptable depends on the disease.</td></tr>
<tr><td>Addition vs synergism vs potentiation</td><td>Sum of two effects; more than the sum (both drugs active); one drug inactive alone but boosts the other (carbidopa + dopa, an indirect antagonist).</td></tr>
<tr><td>Effect vs side effect</td><td>Both come from the same MOA and are predictable; which one is "the effect" depends on what you are treating (sildenafil, minoxidil, codeine for pain vs cough).</td></tr>
</tbody></table>
<p class="sub">Sources: Part 2 pages 1–4, 16–29, 30–35, 39–44; (T) 9/29.</p>

<h4>How he asks it</h4>
<div class="poll"><b>"Which statement is CORRECT?"</b> If one gets exposed to too much activation by an agonist, the body is most likely to up-regulate the receptors / Short term regulation of receptors involves relocation of receptors into the cells / Indirect antagonist are allosteric drugs that bind at another site in the receptor, but the orthosteric site / Decreasing the number of receptors may lead to decrease in the potency of an agonist<br>Key: <b>Decreasing the number of receptors may lead to decrease in the potency of an agonist</b> (100% D). "Too much activation by an agonist, the body is going ... down regulate. Do the opposite. Short term regulation of receptors involve in a relocation inside of the cell, that's long term, chronic. The indirect antagonists ... bind upstream or downstream from the receptor." <small>PollEV (v2) p.5; (T) 9/29</small></div>
<div class="poll"><b>"Which statement is CORRECT?"</b> Increasing the number of receptors may increase the potency of a drug / Beta arrestin is involved in rapid receptor desensitization / Endocytosis of receptors is part of the long term receptor down-regulation / Tolerance to a drug effect is a product of receptor down-regulation / All of the above<br>Key: <b>All of the above</b> (99% E). "They're all correct." <small>PollEV (v2) p.5; (T) 9/29</small></div>
<div class="poll"><b>"What is the TI of this drug?"</b> (hypnosis and death curves, µg/kg) .25 / 1 / 4 / 100 / 400<br>Key: <b>4</b> = LD50 400 / ED50 100 (97% of the class). "The lethal dose that kills 50% divided by the effective dose that treats 50% of the population." .25 is the ratio inverted; 1 is about LD1/ED99. <small>PollEV (v2) p.5; (T) 9/29</small></div>
<!--IMG:pollev-quantal-safe-->
<div class="poll"><b>"Is this drug safe?"</b> Yes / No<br>Key: <b>No</b>. "Because you're already killing people before we treat even all the population, right? This is a very toxic drug that is not going to do much good for us unless you have no other options." <small>PollEV (v2) p.5; (T) 9/29</small></div>
<div class="poll"><b>"DRC "B" represents the DRC of NE alone. Which DRC best represent NE in the presence of duloxetine (NET antagonist)?"</b> A / B / C / D / E<br>Key: <b>A</b> (99%). Classify first: "indirect, perhaps. Why? Because it's not affecting the receptor directly ... blocking the reuptake of norepinephrine ... make it norepinephrine more potent, shifting to the left." <small>PollEV (v2) p.5; (T) 9/29</small></div>
<div class="poll"><b>Spoken, same figure:</b> "If it was just like a competitive antagonist ... D would be the best answer for that." / "If it was an irreversible, it could be either C or E, right, depending on how much spare receptors they would have." <small>(T) 9/29</small></div>
<div class="poll"><b>Spoken:</b> "What is cAMP? How would you classify cAMP? It's the second messenger. Very good. Test question right there for you." <small>(T) 9/29</small></div>
<div class="poll"><b>Spoken (TI = 16 figure):</b> "is this drug safe? Barely, right? Why is that barely? Because at the max dose, I'm very close to killing somebody." / "Which one would you give to your patient, assuming they have equal efficacy? Hopefully the one that you have more room to go." <small>(T) 9/29</small></div>
<div class="poll"><b>How he says he will ask it:</b> "I can give you a number of drugs. I said there's 5 drugs. Here are their therapeutic index values. Which of these drugs is the safest? Which one is the more toxic?" and "you're gonna get figures like this, that you need to find the LD50, you gotta find the ED50, and when you divide them"; "I'll give you possibilities of, if you have the numbers inverse". <small>(T) 9/29</small></div>

<h4>Traps</h4>
<ul>
<li>"Too much agonist → the body up-regulates": backwards; agonist down-regulates, antagonist up-regulates. <small>PollEV (v2) p.5 distractor; (T) 9/29</small></li>
<li>"Short term regulation involves relocation into the cell": relocation (endocytosis) is long-term; short-term is β-arrestin. <small>PollEV (v2) p.5 distractor; (T) 9/29</small></li>
<li>"Indirect antagonists are allosteric drugs": no, they act upstream or downstream, not on the receptor. <small>PollEV (v2) p.5 distractor; (T) 9/29</small></li>
<li>Inverting the TI (ED50/LD50 = 0.25) or reading the ratio at the tails as the TI (1). <small>PollEV (v2) p.5 options; (T) 9/29 "if you have the numbers inverse"</small></li>
<li>Calling a drug safe because its TI is large; the SI (LD1 vs ED99) can still be bad, and "for a drug to be safe the ED99 should be less than the LD1". <small>Part 2 page 42; (T) 9/29</small></li>
<li>Assuming one TI per drug; codeine's TI differs for pain and cough. <small>Part 2 page 41; (T) 9/29</small></li>
<li>Taking the handwritten "shift left" on the down-regulation slide at face value; fewer receptors shift the agonist right. <small>Part 2 page 26; (T) 9/29</small></li>
<li>Expecting an indirect antagonist to change efficacy: the reuptake blocker only raises the neurotransmitter's concentration ("Still serotonin"), so the curve moves left with the same Emax. <small>Part 2 page 11; (T) 9/29</small></li>
<li>Picking D (competitive pattern) for duloxetine on the NE figure; a helper moves the curve left. <small>PollEV (v2) p.5; (T) 9/29</small></li>
<li>Stopping a β-blocker cold turkey in the scenario question: the up-regulated receptors with no antagonist give a hypertensive crisis. <small>Part 2 page 19; (T) 9/29</small></li>
</ul>
</section>

`;
