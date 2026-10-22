const GUIDE3_HTML = `
<p class="sub">Cites: <i>Tox</i> = Principles-of-Tox-Lecture-Students-Fall-2026_WCAG21A.pdf, cited by slide title because the deck prints no slide numbers; <i>(T) 10/9</i> = her words in the lecture transcript of that day; <i>Reading</i> = RodriguezMozaz-EHP-2010.pdf (the assigned article), by page.</p>
<p class="sub">Source hierarchy for Exam 3: what she said in lecture first, then the slides, then the reading. Where the two differ the section says so.</p>
<nav class="guidenav">
<a href="#guide3-scope">What Exam 3 tests</a>
<a href="#guide3-1">1 Definitions</a>
<a href="#guide3-2">2 The five principles</a>
<a href="#guide3-3">3 Source</a>
<a href="#guide3-4">4 Exposure</a>
<a href="#guide3-5">5 ADMET and acetaminophen</a>
<a href="#guide3-6">6 Dose and LD50</a>
<a href="#guide3-7">7 Dose–response curves</a>
<a href="#guide3-8">8 Not yet taught, and the reading</a>
<a href="#guide3-l14-1">9 Potency, ED/TD/LD and the three indices</a>
<a href="#guide3-l14-2">10 Target and mechanism of action</a>
<a href="#guide3-l14-3">11 The reading discussed: drugs in water</a>
<a href="#guide3-l14-4">12 Undesired effects: general concepts</a>
<a href="#guide3-l14-5">13 On-target and off-target</a>
<a href="#guide3-l14-6">14 Non-organ-specific endpoints</a>
<a href="#guide3-l15-1">15 Pulmonary toxicity</a>
<a href="#guide3-l15-2">16 Neurotoxicity</a>
<a href="#guide3-l15-3">17 Why the liver is susceptible; kinds of liver injury</a>
<a href="#guide3-l15-4">18 Liver zones, oxygen and CYP2E1</a>
<a href="#guide3-l15-5">19 Nephrotoxicity</a>
<a href="#guide3-l15-6">20 Idiosyncratic and immunologic responses; her four polls</a>
<a href="#guide3-l15-7">21 Overdose changes kinetics</a>
<a href="#guide3-l15-8">22 Overdose changes pharmacodynamics</a>
<a href="#guide3-l15-9">23 Three angles, four toxicokinetic methods, preventing absorption</a>
<a href="#guide3-l15-10">24 Evidence-based guidelines; what moved to 10/19 (done, sections 25–32)</a>
<a href="#guide3-l16-1">25 Preventing absorption revisited; inhibit bioactivation</a>
<a href="#guide3-l16-2">26 Recognizing the poisoning: blood draws, toxidromes</a>
<a href="#guide3-l16-3">27 Enhance metabolism: cyanide and acetaminophen</a>
<a href="#guide3-l16-4">28 Enhance elimination: ion trapping, extracorporeal methods</a>
<a href="#guide3-l16-5">29 Inactivation: chelators, antivenoms, digoxin immune Fab</a>
<a href="#guide3-l16-6">30 Pharmacological treatment: the four categories</a>
<a href="#guide3-l16-7">31 The beta-blocker and calcium channel blocker guideline discussion</a>
<a href="#guide3-l16-8">32 The poisoning table and what moved to 10/20</a>
<a href="#guide3-l17-1">33 Why pharmacogenomics: primaquine, the timeline, twin studies</a>
<a href="#guide3-l17-2">34 Pharmacogenetics vs pharmacogenomics; impact, uses and limitations</a>
<a href="#guide3-l17-3">35 The four target areas; PK, PD and the two outcome buckets</a>
<a href="#guide3-l17-4">36 Wild type, variant, polymorphism, rare variant, SNP</a>
<a href="#guide3-l17-5">37 Allele, genotype, phenotype, functional significance</a>
<a href="#guide3-l17-6">38 Haplotype, allele and genotype frequency, Hardy-Weinberg</a>
<a href="#guide3-l17-7">39 The exam vote, and what was not reached on 10/20</a>
</nav>

<!-- ===================================================================== -->
<section class="guide" id="guide3-scope">
<h3>What Exam 3 tests, in her words</h3>
<p>Dr. Smith writes her exam from the objectives on each day's opening slide and from what she said in class. She grades the exam, the quizzes and the reading assignments; the Poll Everywhere questions are for discussion only.</p>
<ul>
<li>"I will provide for you guys an outline and objectives for my lectures. So the bold font is our outline, and the objectives are the lighter font within the outline." <small>(T) 10/9</small></li>
<li>"Remember, go back and study to these objectives, at least. If you can answer these objective questions, you should pass my exam." <small>(T) 10/9</small></li>
<li>"I tried to give you about 50 questions, but they may not all be multiple choice. Sometimes I do very short answer essays, OK? Um, sometimes fill in the blank." <small>(T) 10/9</small></li>
<li>"Like if it's gonna be more than 50, I'll make sure that you have at least 1 minute and a half per question, OK? But no backwards nap, sorry." (no going back to an earlier question) <small>(T) 10/9</small></li>
<li>On the readings: questions come from what was read and discussed in class, "if I talked about it and we really were exploring it, that would be the kind of thing I would ask about a reading that we did." <small>(T) 10/9</small></li>
<li>"quizzes again, they are covering the material from the lecture of the day." "Do the quiz on your own time, midnight, 3:00 in the morning." The reading quiz became an assignment: "Your quiz on the reading for today is to be done after class and do before class on Tuesday." <small>(T) 10/9</small></li>
<li>"This is just to help generate discussion, OK? I do not take grades on my poll everywhere, all right, it's for discussion, but I'd like to see how you guys are doing." <small>(T) 10/9</small></li>
<li>"I invite students to AE if you make a 70 or below, and oftentimes I'll keep you in AE even if you do great." Office hours: "Monday, Tuesday, Wednesdays from 1:20 to 2:00." <small>(T) 10/9</small></li>
<li>Difficulty, after her three Poll Everywhere review questions: "those are examples of very easy, very easy pull everywhere [poll everywhere] questions, OK. The questions on the quizzes that you're having are a little more detailed, right? OK, and questions on your exam, because you've had a chance to study more, will be. Some of them will be much more detailed, OK? So don't fool yourself and say, hey, I'm good to go. I answered correctly her poll everywhere questions in class, and I'm making good grades on my quizzes, that's great, but. The polar wire [poll everywhere] questions, those are way easy. Those are just to generate discussion, OK? Quiz questions are trying to get you a little more in depth in your knowledge, and your exam questions could likely be harder, OK? So just to give you an idea of what you're facing, OK?" <small>(T) 10/14</small></li>
<li>"I have a few polar reward [poll everywhere] questions at the end of this lecture just to give you an idea of what kinds of questions I ask. These are not for a grade, they're not attendance, OK? They're just to trigger your thinking and give you an idea of what kind of things I ask" <small>(T) 10/14</small></li>
<li>10/19, her opening rule: "Everything that we've talked about in class, every, everything on slides, everything that's come out of my mouth, the things you've read, and we've talked about all that is testable." <small>(T) 10/19</small></li>
<li>10/19, scope: "your exam is Friday, right? ... The material for the exam is today and tomorrow." Whether the 10/20 pharmacogenomics lecture counts on Friday was put to a class vote, moved to after Tuesday's lecture; she would reweight the two exams if it is left out. <small>(T) 10/19</small></li>
<li>10/19, the table: "The heaviest part of that will be this poisoning table." "please memorize this table, uh, know the chelating agent and know what metal it grabs." <small>(T) 10/19</small></li>
</ul>
<table class="reftab"><thead><tr><th>Level</th><th>Her words</th><th>What it means for study</th></tr></thead><tbody>
<tr><td>Poll Everywhere</td><td>"very easy"; "way easy"; "just to generate discussion"</td><td>Getting the polls right is not evidence of readiness</td></tr>
<tr><td>Quizzes (graded, after each lecture)</td><td>"a little more detailed"; "trying to get you a little more in depth"</td><td>The quiz level is the floor for the exam</td></tr>
<tr><td>Exam</td><td>"Some of them will be much more detailed"; "could likely be harder"</td><td>Expect the detail under each objective, in her words, and short-answer or fill-in items</td></tr>
</tbody></table>
<table class="reftab"><thead><tr><th>On the exam</th><th>Not on the exam</th></tr></thead><tbody>
<tr><td>The objective questions on the opening slide (definitions; the five principles; source, exposure, ADMET, dose, dose–response)</td><td>Dates and hard numbers from the reading: she asks what was discussed, not figures from the article</td></tr>
<tr><td>The reading's five principles as discussed in class (the discussion is scheduled for 10/13)</td><td>The 2-AAF hamster figure as a graph to read: "I will not give you a graph like that I never have." <small>(T) 10/9</small></td></tr>
<tr><td>The acetaminophen bioactivation scheme ("I love this example")</td><td>The probit panel of the population figure: "it's changing the units on the graph on the y and the x axis to what we call probit units. Nobody ever uses this." <small>(T) 10/9</small></td></tr>
</tbody></table>
<p class="sub">Sources: (T) 10/9, (T) 10/14; syllabus (Exam III, Fri Oct 23).</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-1">
<h3>1. Definitions: poison, toxin, toxicant, xenobiotic</h3>
<p>Four words describe something noxious, and two of them are separated by where the substance comes from.</p>
<ul>
<li><b>Poison</b>: "poison is just a general layman's term, anything that can cause a bad response." <small>(T) 10/9</small></li>
<li><b>Toxin</b>: made by a biological system. "Snake venom is a toxin, OK? You could say it's poisonous, but technically it's a toxin, OK?" <small>(T) 10/9</small></li>
<li><b>Toxicant</b>: "A toxicant is made by man through our activities." A smokestack emission: "Whatever's nasty in that would be a toxicant." <small>(T) 10/9</small></li>
<li><b>Xenobiotic</b>: "just another term that you'll see is a xenobiotic, kind of a fancier term, compound that's not expected to be in a critter, OK, or a person." <small>(T) 10/9</small></li>
<li>Her poll, "What is toxic?", filled a word cloud: "Food, yeah, food, hormones, pollution, drugs, drugs, drugs, medications, rat poison, venom, alcohol, yes, alcohol." The point: "the dose makes the poison, and so, um, medications can be toxic or poisonous." <small>(T) 10/9</small></li>
<li><b>The coral snake ("What is Toxic?" slide).</b> "Coral snake, how do you know that? ... Red and yellow kills a fellow, so if the red touches yellow, it's poisonous, OK? Red and black, friend of Jack." The king snake looks alike but its red touches the black, and "it's not poisonous. People have them as pets." The coral snake is "very venomous, they have a neurotoxin." <small>(T) 10/9</small></li>
</ul>
<p>How she asks it: a pair of substances (a venom and an emission) and the two words that fit them, or the single word for a foreign compound.</p>
<p class="sub">Sources: Tox slides ‘Definitions’, ‘What is Toxic?’; (T) 10/9. Questions L13-001, L13-002, L13-047, L13-048.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-2">
<h3>2. The five principles of toxicology</h3>
<p>"Toxicologists think of these five principles." The lecture, and the reading, are organized by them.</p>
<ol>
<li><b>Source</b>: "We think about the source of a toxin or toxicant."</li>
<li><b>Exposure</b>: "We think about how are people or critters exposed."</li>
<li><b>ADMET</b>: absorption, distribution, metabolism, excretion, "and what's the T? Yeah, there you go, toxicity. We're in the toxicology module here, so we're gonna add the T to ADME."</li>
<li><b>Dose</b>: "Are, are you getting enough, or is an animal getting enough exposure to something that's going to be high enough to cause a problem?"</li>
<li><b>Target and mechanism of action</b>: "sometimes the target of something toxic is not the same target as its therapeutic target, OK? We'll talk about that a little bit more later."</li>
</ol>
<p class="sub">All quotations (T) 10/9. Sources: Tox slide ‘5 Principles of Toxicology’. Questions L13-003, L13-004, L13-005.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-3">
<h3>3. Source: where the exposure comes from</h3>
<ul>
<li>Four categories: "we, as toxicologists think about things that are poisonous as either being from environmental exposures. Occupational exposures, critter bites and stings, or in the world of healthcare, we think about medications, OK?" <small>(T) 10/9</small></li>
<li>Environmental: a bus's diesel fume downtown, or living on polluted ground. Occupational: a benzene leak, radiation, or a healthcare worker "mixing it up in a in in an in an incorrect hood with the wrong airflow" (chemotherapy). <small>(T) 10/9</small></li>
<li>Pathogens are not this course's subject: "in this course we're not usually thinking about exposure to pathogens like needle sticks, OK". <small>(T) 10/9</small></li>
<li>Bites and stings: venoms are complex mixtures, "you don't always know what chemicals in the poison are causing all" the effects. <small>(T) 10/9</small></li>
<li>Medications: in healthcare, parenteral exposure is common, "the administration of medications by IV or by some sort of injection. This is a major route of exposure in healthcare". <small>(T) 10/9</small></li>
</ul>
<p>How she asks it: a scenario (a pharmacist in the wrong hood) and the source category it belongs to.</p>
<p class="sub">Sources: Tox slide ‘Source’; (T) 10/9. Question L13-006.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-4">
<h3>4. Exposure: route, formulation, duration, single vs repeated, frequency</h3>
<p><b>Route.</b></p>
<ul>
<li>By frequency: "Oral is the most common, then inhalation, topical, and parenteral." <small>(T) 10/9</small></li>
<li>By effectiveness of delivering a toxic agent (the slide's order): intravenous, then inhalation, then oral, then dermal. <small>Tox slide ‘Exposure: Route’</small></li>
<li>First pass makes the oral route the less dangerous one when the liver detoxifies: "Does it go through first pass effect? Not by the IV route, right? So If you had equivalent doses, oral versus IV, and this compound goes through first pass effect" the oral dose delivers less. <small>(T) 10/9</small></li>
</ul>
<p><b>Vehicle and formulation.</b></p>
<ul>
<li>"If somebody were to take a handful of an immediate release beta blocker, compared to taking a handful of extended release beta blockers, which do you think is worse? It depends, you're gonna hate this answer I give a lot, it depends, OK." The extended-release tablets can clump in the gut "And then all of a sudden it gets released". <small>(T) 10/9</small></li>
</ul>
<p><b>Duration</b> (the animal-study definitions).</p>
<ul>
<li>"acute is for exposure for less than 24 hours." "for subacute, it's less than 1 month." "Sub-chronic is 1 to 3 months, and then chronic is more than 3 months up to years". <small>(T) 10/9</small></li>
</ul>
<p><b>Single vs repeated.</b></p>
<ul>
<li>Benzene: one walk-in gives a headache and sleepiness; "chronic low dose benzene exposure" gives leukemia: "wow, getting sleepy and a headache is really different than, you know, like getting leukemia." <small>(T) 10/9</small></li>
<li>Delayed effects: diethylstilbestrol (DES) in pregnancy and the daughters' vaginal cancer years later. <small>Tox slide ‘Single vs. Repeated’; (T) 10/9</small></li>
<li>"chronic exposure may produce immediate effects after each exposure, OK?" The worker with the never-repaired leak feels the headache every day. <small>(T) 10/9</small></li>
</ul>
<p><b>Frequency and half-life</b> (Casarett and Doull Figure 2-4).</p>
<ul>
<li>Single dose: "Which one is staying in the blood, staying with a high blood concentration for the longest? A, so it's half-life is longest, right? ... C has the shortest half-life." <small>(T) 10/9</small></li>
<li>Repeated quarter doses: A and B climb into the toxic zone; C, cleared between doses, never does. "this is where half-life is so important ... we'd have to figure out how do you stretch out these dosing frequencies". <small>(T) 10/9</small></li>
<li>C can still harm: "you could be allergic to it", "Could synergize with other drugs", "could be going to a different target site", or irritate the injection site. <small>(T) 10/9</small></li>
</ul>
<p class="sub">Sources: Tox slides ‘Exposure: Route’, ‘Exposure: Duration’, ‘Single vs. Repeated’, ‘Exposure: Frequency’; (T) 10/9. Questions L13-007 to L13-016.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-5">
<h3>5. ADMET: bioactivation, detoxification and acetaminophen</h3>
<ul>
<li>Her word: "I use the word bioactivation to talk about when metabolism occurs to create something that's more noxious than what you were originally exposed to." Synonyms she named: toxication, metabolic activation. The opposite is detoxification. <small>(T) 10/9</small></li>
<li>Acetaminophen at the labeled dose is handled by phase 2: "Which two phase 2 enzymes will do that metabolism?" the glucuronosyl transferases and the sulfotransferases, "to a glucuronide or to a sulfate". She calls the first family "GSTs" in speech (on the slide it is the glucuronosyl transferase family, not glutathione S-transferase). <small>(T) 10/9; Tox slide ‘Example of Bioactivation’</small></li>
<li>The ceiling: "4 g, right? That's on the FDA labeling, right?" <small>(T) 10/9</small></li>
<li>Overflow: "if those phase 2 enzymes cannot take care of the acetaminophen dose? What pathway does it go down? ... Specifically P450 2E1", which makes NAPQI, the liver-toxic metabolite. <small>(T) 10/9; Tox slide ‘Example of Bioactivation’</small></li>
<li>Injury at or below 4 g: low-activity phase 2 enzymes (genetic variation, older patients), or CYP2E1 induced by alcohol: "Alcohol can induce 2E1 expression." "this example of inducing 2E1, maybe also having low activity GSTs or STs could really set up a person for liver toxicity by just taking the allowed dose of acetaminophen." <small>(T) 10/9</small></li>
</ul>
<p>How she asks it: the enzyme that makes NAPQI, the daily ceiling, and why a patient under the ceiling still gets liver injury.</p>
<p class="sub">Sources: Tox slides ‘ADME’, ‘ADME: Metabolism’, ‘Example of Bioactivation’; (T) 10/9. Questions L13-017 to L13-020.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-6">
<h3>6. Dose: the dose makes the poison, LD50</h3>
<ul>
<li>"Dose makes the poison. Who said that? Anybody know who said that? Supposed to be attributed to a guy named Paracelsus". <small>(T) 10/9</small></li>
<li>LD50: "the lethal dose that will kill off 50% of the animals given this compound". The table (Casarett and Doull, rat values) runs "from ethyl alcohol all the way to botulinum toxin": "10,000 mgs per kilogram for ethyl alcohol would be the LD50 in rats, and 0.00001 would be the LD50 for botulinum toxin in rats". <small>(T) 10/9; Tox slide ‘Dose’</small></li>
<li>"So the dose makes the poison, but you have to know what compound you're talking about too." <small>(T) 10/9</small></li>
<li>The squirting can: botulinum bacteria grow without oxygen in the sealed can and secrete the toxin; "it's not the bacteria that, that kills you, it's the botulinum toxin ... If the can squirts, throw it away, don't cook with it, cause you can't heat it, cook it, and break down that botulinum toxin". (She first said "aerobic", then "it doesn't need oxygen"; the organism is anaerobic.) <small>(T) 10/9</small></li>
</ul>
<p class="sub">Sources: Tox slide ‘Dose’ (Casarett &amp; Doull Table 2-1); (T) 10/9. Questions L13-021 to L13-024.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-7">
<h3>7. Dose–response: individual vs population, U-shapes, threshold, cumulative dose</h3>
<p><b>Individual dose–response.</b> Dose groups of animals, each animal's response plotted against its dose (the organophosphate example: percent inhibition of carboxylesterase and of cholinesterase). "many chemicals have more than one effect because they have multiple targets. And we could not see this if we weren't graphing it as an individual dose response curve". <small>(T) 10/9</small></p>
<p><b>Population dose–response.</b> "you're not looking at individuals getting different doses. You're looking to see what is the response happening? How do we group the responses". From the cumulative mortality curve: "this is where 50% of the animals die, and the dose here is about 100 mg per kg" and "The data point that we got at the lowest dose was at about 10 mgs per kg" (the threshold). "We can do things like find the LD50 or we can find the threshold dose by using toxicology data as a population type of response graph." <small>(T) 10/9</small></p>
<p><b>U-shaped curves.</b></p>
<ul>
<li>Essential substance (iron): deficiency at low dose, "the region of homeostasis", then toxicity: "if you don't have enough iron, your blood can't carry oxygen, and you could suffer the adverse response of death." <small>(T) 10/9</small></li>
<li>Hormesis (red wine): "this is a U-shaped curve, but this is something that's not essential, but something maybe you want." "because this is not an essential nutrient, an essential element that we need, there's really no area of homeostasis." <small>(T) 10/9</small></li>
</ul>
<p><b>Threshold vs linear.</b> "You can be exposed to a little bit and not have any sort of effect, either therapeutic or poisonous, OK? But I am showing you also this linear line where you go from zero dose, and the first molecule of what you're exposed to in this linear line could cause you problems, OK? That's a theory for exposure to carcinogens." "So this is what we thought was going on with carcinogens for the longest time". <small>(T) 10/9</small></p>
<p><b>Cumulative dose (2-AAF in hamsters).</b></p>
<ul>
<li>Dose groups fed 2-acetylaminofluorene daily; one set sacrificed at 24 months, one at 33. Bladder tumors at 24 months: "maybe the thresholds about here, 75 PPM". At 33 months the bladder threshold sat lower. "Why did the threshold go down? There you go, use the keyword cumulative. So the cumulative dose that these animals got was higher at 33 months, right, compared to 24 months." <small>(T) 10/9</small></li>
<li>Liver tumors at 33 months in the zero-dose animals: "we really shouldn't be looking for liver tumors in hamsters, they're gonna get them anyway." "Is cancer the disease of the aged? Yes, cancer is a disease of the aged, usually." <small>(T) 10/9</small></li>
<li>"I will not give you a graph like that I never have." The idea (cumulative dose lowers the threshold; a zero-dose group can show the endpoint) is testable; reading the figure is not. <small>(T) 10/9</small></li>
</ul>
<p class="sub">Sources: Tox slides ‘First Dose-Response Relationship’, ‘Second Dose-Response Relationship’, ‘Shape of Dose-Response’, ‘Threshold Dose’, ‘More on Threshold Dose’; (T) 10/9. Questions L13-025 to L13-031.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-8">
<h3>8. Not yet taught on 10/9: indices, target, and the reading</h3>
<p>She stopped at the 2-AAF figure: "We're gonna blast through the next few slides on dose, and wrap this up with target and mechanism of action, and then we'll see where we are, whether we get to talk about the paper or not" <small>(T) 10/9</small>; the remaining slides and the paper discussion moved to Tuesday 10/13. The points below are keyed from the slides and marked low yield in the bank until she teaches them.</p>
<ul>
<li>Potency comparison, ED, TD and LD values. <small>Tox slide ‘Values Developed from Dose-Response’</small></li>
<li>Therapeutic index, TI = toxic dose / therapeutic dose: no information about slope. Margin of safety, MOS = TD1 / ED99: carries slope information. Both for single doses. Margin of exposure, MOE = NOAEL / exposure: repeated exposures to non-therapeutic compounds. <small>Tox slide ‘Values Developed from Dose-Response’</small></li>
<li>Target and mechanism: the target can be an organ or a physiological endpoint; several targets with different toxicity and mechanisms; the target organ may not be the site of highest concentration; the dose at the target determines toxicity. <small>Tox slide ‘Target &amp; Mechanism of Action’</small></li>
<li>The reading (Rodriguez-Mozaz and Weinberg, pharmaceuticals in water), by her five principles: source, wastewater treatment plant effluents as the main discharge into surface water; exposure, trace levels in surface and drinking water; dose and target, the examples of vultures (diclofenac, renal failure) and fathead minnows (ethinyl estradiol, population collapse), with humans exposed at far below a therapeutic dose. <small>Reading pp. 1017–1018; Tox slide ‘Discussion of Reading Assignment’</small></li>
</ul>
<p class="sub">Sources as marked. Questions L13-032 to L13-036 (low yield until taught).</p>
</section>

<!-- ===== Day 14 (10/13) ===== -->
<!-- ===================================================================== -->
<section class="guide" id="guide3-l14-1">
<h3>9. Finishing the 10/9 deck: potency from curve shape, ED/TD/LD, and the three indices</h3>
<p>She opened 10/13 by finishing the Principles of Toxicology deck (cites <i>Tox</i>) from the slide where she had stopped: the 2-AAF hamster figure, re-stated as a lesson about reading data ("maybe hamsters aren't the best animal for that end point").</p>
<p><b>Potency from curve shape.</b></p>
<ul>
<li>A versus B: "I think you guys are able to tell me already which compound is most potent. A, right, because you start getting that effect, the response that we're measuring at a lower dose compared to B." <small>(T) 10/13</small></li>
<li>C versus D is her trick question: "you can't say that C is always more potent than D. You can in the lower doses, right? ... once you get to a certain point where it's leveled off and the line is crossing D's dose response line, you would say that D is more potent than C, correct?" <small>(T) 10/13</small></li>
<li>Why C levels off, the answers she accepted: receptors saturated; C may hit the shared receptor differently; the metabolism that bioactivates C saturates; an uptake transporter such as P-glycoprotein saturates; a partial agonist ("could be"); a rising dose changing stomach pH. "So we've talked about target, we've talked about tissue ... metabolism ... distribution, absorption issues. So all these things could be causing compound C's potency to change with an increasing dose, therefore, making this a trick question". <small>(T) 10/13</small></li>
<li>Study design: "if we did not extend the doses far enough ... we might miss the fact that their potency basically changes places". <small>(T) 10/13</small></li>
</ul>
<p><b>Effective, toxic and lethal curves.</b> "effective or therapeutic dose is first, then a toxic response, and then a lethal dose." The lines are not parallel: a student said ADME, she accepted it, then: "even more important, which is the last. Um, principle of toxicology is the target and mechanism of action ... the mechanism for how this drug is being effective versus toxic versus lethal, that those mechanisms leading to those three particular outcomes are different". <small>(T) 10/13</small></p>
<p><b>The three indices</b> (slide ‘Values Developed from Dose-Response’).</p>
<ul>
<li>Therapeutic index: "the toxic dose over the therapeutic dose ... the toxic dose in 50% of the animals over ... the therapeutic dose of 50% of the animals ... It doesn't always have to be 50% ... but the numerator and the denominator need to have the same percentage". Wide index: "less chance of toxicity"; narrow: "the toxic dose is not too much higher than that therapeutic dose". <small>(T) 10/13</small></li>
<li>Margin of safety: "what's the toxic dose for 1% of the animals over the effective dose of 99% of the animals ... because we use a different percentage, it gives you an idea of the slope of your dose response curve, whereas the therapeutic index does not." <small>(T) 10/13</small></li>
<li>Margin of exposure: "something that we use truly in toxicology with exposures to something that's not therapeutic, like to, you know, a pollutant, an occupational exposure, OK, and it's also for repeated exposures ... the Noel over the chronic exposure." NOAEL ("not Christmas"): "the no observable adverse effect level ... a dose that we used in animal exposure studies for this compound. That the animals that we exposed did not have an adverse response." Denominator: "how much total exposure has a human gotten to that compound." <small>(T) 10/13</small></li>
<li>Why the numbers exist: "the real value of these numbers is that you can compare that value to other compounds' values ... You'd calculate that margin of exposure and figure out which compound is more dangerous to humans ... spend your money to clean up that more dangerous compound". <small>(T) 10/13</small></li>
</ul>
<p>How she asks it: which compound is more potent (and the trick when curves cross); which index shows slope and why; what the NOAEL is and where it comes from; wide versus narrow therapeutic index.</p>
<p class="sub">Sources: Tox dose–response slides and ‘Values Developed from Dose-Response’; (T) 10/13. Questions L14-001 to L14-015; L13-032, L13-033 now taught.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l14-2">
<h3>10. Target and mechanism of action: why side effects look unrelated</h3>
<ul>
<li>The target may be "a specific organ that's being affected, or is it a more general physiological endpoint" (the organ-specific and non-organ-specific endpoints later in the day). <small>(T) 10/13</small></li>
<li>Multiple targets: "Maybe we haven't even identified all the places that a compound could be hitting". With multiple targets, different mechanisms: "let's say the compound affects the kidney and the liver. It's likely to be causing damage to those two different organs in different ways." <small>(T) 10/13</small></li>
<li>"where it's having an adverse effect may not be where the highest concentration is, which is probably a little counterintuitive ... maybe the kidneys like just super sensitive. Compared to the muscle." <small>(T) 10/13</small></li>
<li>Dose at the target still rules: "even the super sensitive places, the concentration has to be high enough to cause an effect. Remember, you still have a dose response curve even right there at the kidney." <small>(T) 10/13</small></li>
<li>The payoff: "How many times are you seeing side effects listed for a medication that have nothing to do with the therapeutic action of that drug? ... This is why." Diuretics over-diuresing a patient are "a side effect of diuretics where the therapy has gone too far"; aminoglycoside ototoxicity is "the classic example of how the target of an adverse effect could be very different than the therapeutic targeting mechanism." Sometimes the mechanism of an adverse effect is known, sometimes "we don't always have the answer." Adverse effects on a drug list "could be toxicities, right, depending on how bad it gets". <small>(T) 10/13</small></li>
<li>What the room said was new: the last bullet (different mechanisms at different targets) and the highest-concentration point; what was familiar: multiple targets. <small>(T) 10/13</small></li>
</ul>
<p>How she asks it: a compound concentrated in one organ that damages another; two organs damaged by one compound; the diuretic versus the aminoglycoside.</p>
<p class="sub">Sources: Tox slide ‘Target &amp; Mechanism of Action’; (T) 10/13. Questions L14-016 to L14-019; L13-034 now taught.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l14-3">
<h3>11. The reading discussed: Rodriguez-Mozaz and Weinberg, drugs in our water</h3>
<p>About fifteen minutes from the floor of the room, walking the discussion-guide table principle by principle, humans against wildlife. "this is testable material." "I will later post a key". The part of the paper on what to do about it (best management practices) was not assigned. <small>(T) 10/13</small></p>
<ul>
<li><b>The meeting.</b> "it was an environmental health summit" in 2008 (she first said 2018): "government organizations of various kinds, EPA ... academicians. Uh, pharmacy industry, right? Other scientists that have an interest in our health of our planet", meeting for the first time about drugs in water. <small>(T) 10/13</small></li>
<li><b>Why read it.</b> The principles of toxicology in a real case, and the patient who "might likely come to you freaking out" about "taking somebody's Prozac". <small>(T) 10/13</small></li>
<li><b>Which water.</b> "surface water ... groundwater, and ... drinking water sources" (the Edwards Aquifer as groundwater). <small>(T) 10/13</small></li>
<li><b>Source.</b> "We take the drugs, we flush, we improperly dispose of our meds. We've got animals on feedlots. Our wastewater treatment plants don't take care of all the drugs before it gets released into the environment ... those are the same sources for animals out in the wild." Unmetabolized drug and metabolites ("You'll be surprised at the number of drugs, we don't know what their metabolites are"); unused antibiotics down the toilet; livestock given hormones and antibiotics. Treatment plants: "So is that a source for humans or animals? Both, there you go." <small>(T) 10/13</small></li>
<li><b>Exposure.</b> Humans: "most of our exposure is through drinking water", also bathing or swimming; concentrations "about parts per trillion. Rarely is it higher than that", with estrogen higher on big-city shorelines (Miami, Houston, San Diego, San Francisco). Wildlife: "drinking, eating, swimming, living in it", breathing (fish), skin (frogs, "one of our sentinel species"). <small>(T) 10/13</small></li>
<li><b>ADME, dose, target.</b> For humans, known from drug development, "except for the metabolites". For wildlife: "we don't tend to use sea otters and orca whales and fish and mollusks ... so we don't know how these drugs made for humans and tested for humans are going to act. In these critters". <small>(T) 10/13</small></li>
<li><b>Dose for humans.</b> "is that gonna get you up to a normal therapeutic daily dose? No, no." "So I think for humans we can be OK. Doesn't mean we should ignore our sensitive populations, which are in utero, elderly kids, people with diseases." Risk assessment on in utero exposure "is very, very hard to do" (her former work); re-evaluate "if we start seeing concentrations of these drugs rising higher". <small>(T) 10/13</small></li>
<li><b>Wildlife.</b> "populations of frogs and some fish and alligators changing from being like half male, half female to more female in those places where estrogen levels are higher ... That's like a red flag". John said yes, Ashley said we don't know: "you're both right." Warming water versus estrogen: "we've done isolated studies of some of these critters ... exposed them to certain doses of like hormones, estrogenic type of. Compounds and we do see a shift ... It could be both." <small>(T) 10/13</small></li>
<li><b>Microbes.</b> "the bacteria in waters and the sediments are becoming resistant to the antibiotics that are out there in the environment, and that's a problem. That is a problem." <small>(T) 10/13</small></li>
<li><b>The answer for the patient.</b> "You're probably OK. It's not fun drinking somebody's beta blocker or Prozac or estrogen, right?" A mitigation deck (treatment plants) may come "at the end of our toxicology lectures". <small>(T) 10/13</small></li>
</ul>
<p>How she asks it: a principle (source, exposure, ADME, dose, target) and how it differs between humans and wildlife; what to tell the worried patient; the wildlife red flag.</p>
<p class="sub">Sources: Discussion-Guide-Rodriguez-Mozaz-and-Weinberg-Student-2026 copy.pdf; (T) 10/13. Questions L14-020 to L14-032; L13-035 and L13-036 re-keyed to what she said.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l14-4">
<h3>12. Toxic responses: undesired effects, general concepts</h3>
<p>The Toxic Responses deck (cites <i>TR</i>): "the bold font is the outline and the lighter font are the objectives that you should be definitely studying too".</p>
<ul>
<li><b>Immediate vs delayed.</b> DES: "a very particular kind of vaginal cancer in their female offspring as those girls became young adults, very delayed". Organophosphates: "some organophosphate pesticides can have, uh, caused neuropathies because they're affecting um different enzymes in the nerves. OK, so that's a delayed effect by about days, not years." (The slide names TOCP.) <small>(T) 10/13</small></li>
<li><b>Reversible vs irreversible.</b> "the liver is really unique. It is able to heal itself, to regenerate"; "a mild injury, it can often regenerate, but more severe chronic injury, yeah." Nerves: "They can't divide. They can't be regenerated." Cancer and birth defects: irreversible; "those cancerous cells didn't switch back to being normal, right? We killed them." One exposure can do both: "So sometimes you get both." <small>(T) 10/13</small></li>
<li><b>Local vs systemic.</b> "A local effect will occur at the site of a noxious agent's first contact" (acid on skin, chlorine gas). "Most toxins, they cause systemic effects unless they are highly reactive." Tetraethyl lead: the toxicologist, "a couple drops of the compound on her glove", a burn on the hand, absorbed, "affected her central nervous system and killed her". Indirect systemic: an acid burn "just like a thermal burn", fluid loss, "really bad kidney problems". <small>(T) 10/13</small></li>
<li><b>Chemical interactions.</b> "You could have additive or synergistic or potentiation or antagonistic type of interactions going on, which makes it really hard to predict". Risk assessment at a polluted site: "It's very hard to get a number that will quantify the risk". <small>(T) 10/13</small></li>
<li><b>Tolerance.</b> Dispositional (ADME): carbon tetrachloride "inhibits its own metabolism. It kind of protects you from that repeated exposure, sort of"; cadmium "can induce the expression of that metal carrying enzyme and help you clear it". Reduced responsiveness (pharmacodynamic): "a down regulation of the receptors that that medication is targeting". <small>(T) 10/13</small></li>
<li><b>Variations in effect.</b> Selective toxicity: "lethal to one species, but not to another". Species differences: "a qualitative and or a quantitative difference"; arsenic skin cancer "on our palms of our hands and feet": "We can't find an animal model". Individual differences: "The answer to why is going to be found in the genetics of each individual" (the pharmacogenomics lectures to come). <small>(T) 10/13</small></li>
</ul>
<p>How she asks it: a scenario and the pair it belongs to (delayed, irreversible, local, indirect systemic); the two tolerance mechanisms with their examples; the three variation terms.</p>
<p class="sub">Sources: TR slides ‘Immediate vs. Delayed’, ‘Reversible vs. Irreversible’, ‘Local vs. Systemic’, ‘Chemical Interactions’, ‘Tolerance’, ‘Variations in Effect’; (T) 10/13. Questions L14-033 to L14-048.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l14-5">
<h3>13. Toxic endpoints: on-target and off-target</h3>
<ul>
<li>Endpoints "may be defined as on or off target ... non-organ specific ... organ specific ... idiosyncratic. What does idiosyncratic mean? We don't know why it's happening" and "immunologically based, and we'll focus a lot on allergic reactions". <small>(T) 10/13</small></li>
<li>The figure (Katzung, Figure 6-1): left half "the intended tissue", right half "an unintended tissue"; on both, the drug or a metabolite finds receptors. <small>(T) 10/13</small></li>
<li>On-target: the intended receptor. Right tissue: "your dose is too high" (dosing errors, deliberate overdose, a liver that cannot clear the drug, down-regulated receptors with the dose unchanged). Wrong tissue: "it's still called on target. So this is a part of our toxicology vernacular that I really don't like." <small>(T) 10/13</small></li>
<li>Off-target: "when the drug is finding other receptors for which we did not intend for it to find", in either tissue; "I call that unclean." The fix: "it's this part of the molecule that's hitting a different receptor. Let's see if we can change that part of the drug." <small>(T) 10/13</small></li>
<li>Diphenhydramine: "it causes drowsiness because it's hitting the histamine receptors in the brain, so that's an on target adverse effect in the wrong tissue." Newer antihistamines (cetirizine, fexofenadine) "don't cross the blood-brain barrier". For the receptor class, Dr. Gottlieb's Exam 1 point stands: "there's only one inverse agonist you need to know. It's gonna be an antihistamine. If you know what loratadine is, you know that's the inverse agonist". <small>(T) 10/13</small></li>
<li>Terfenadine (Seldane): peripheral H1 antagonism; "cardiac problems with that drug because it was inhibiting cardiac potassium channels"; her grapefruit mornings raised the level and "blocking even more of my potassium channels". <small>(T) 10/13</small></li>
<li>Thalidomide: "it's the Rnanammer that was good at helping with nausea, but the Senanammer was a very potent teratogen"; used now in oncology. <small>(T) 10/13</small></li>
<li>Beta blockers and asthma: "it's talking about subtypes of a receptor. So, beta 1 adrenergic receptors versus the beta 2 adrenergic receptors" (slide: propranolol, airway smooth muscle). <small>(T) 10/13</small></li>
</ul>
<p>How she asks it: a drug, its receptor and tissue, and the label (on-target right tissue, on-target wrong tissue, off-target by other receptor, enantiomer or subtype).</p>
<p class="sub">Sources: TR slides ‘Toxic Endpoints may be…’, ‘On-target and off-target adverse drug effects’, ‘On-Target Examples’, ‘Off-Target Examples’; (T) 10/13. Questions L14-049 to L14-058.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l14-6">
<h3>14. Non-organ-specific endpoints: fibrosis, genotoxicity, cancer, teratogenesis</h3>
<ul>
<li><b>Fibrosis.</b> Collagen and extracellular matrix laid down; "Fibrotic tissue is stiff"; "You'll lose organ function." Pulmonary: amiodarone ("a cardiac med"), bleomycin ("a chemotherapy"), paraquat ("an herbicide"). Liver: amiodarone too, and ethanol, "cirrhosis of the liver". Non-organ specific because "if you look at the chemistry of that fibrotic tissue, it's the same." <small>(T) 10/13</small></li>
<li><b>Genotoxicity vs mutagenicity.</b> "genotoxicity is just talking about damage to your DNA in general. And mutagenicity refers to the fact that it's transmissible." "If mutations happen in your only your germ cells, then it's a mutagen". Results: "cancer ... teratogenesis, which is birth defects, or ... genetically-based disorders." <small>(T) 10/13</small></li>
<li><b>Cancer.</b> Incidence table: "lung and bronchial cancer is highest for both men and women, and then for men it's prostate and breast it's women." Non-organ specific because "some lung cancers are caused by the same genetic mutation as you will see in colon cancers". Multistage model skipped: "it takes more than one mutation to end up with somebody having cancer." <small>(T) 10/13</small></li>
<li><b>Teratogenesis</b> ("what's the layman's term for teratogenesis? Birth defects"). Retinoids in hamsters by gestation day: limb defects expected, then "microophthalmia, so little eyes, exonephyly ... spina bifida ... Cleft palate happens twice ... forelimb shortening. And affecting the tail". Different compounds, same defect: methanol day 7 and TCDD day 11 both give cleft palate. Dose: "the mother has to get enough of the compound for it to pass through into the baby" (rest of the slide skipped). <small>(T) 10/13</small></li>
<li><b>FDA labeling.</b> "FDA changed the labeling to include not just information on a drug's stratogenicity, but they now include information on fertility, especially male fertility, and then also ... whether or not lactating women should take that medication." <small>(T) 10/13</small></li>
</ul>
<p>How she asks it: why each of the four is non-organ specific; the agents of pulmonary fibrosis; genotoxic versus mutagenic; what timing does to a teratogen; what the new labeling adds.</p>
<p class="sub">Sources: TR slides ‘Non-Organ Specific: Fibrosis’, ‘Non-Organ Specific: Genotoxicity’, ‘Non-Specific: Cancer’, ‘Non-Organ Specific: Cancer’, ‘Non-Organ Specific: Teratogenesis’, ‘Teratogenesis Time of exposure’, ‘Teratogenesis with different compounds’, ‘Teratogenesis Dose’, ‘Teratogenesis Labeling’; (T) 10/13. Questions L14-059 to L14-070. Organ-specific endpoints: 10/14.</p>
</section>

<!-- ===== Day 15 (10/14) ===== -->
<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-1">
<h3>15. Pulmonary toxicity: why the lungs are susceptible, where particles land, acute vs chronic</h3>
<p>For each of the four organs she asks two things: "Why is the whole organ susceptible and why are certain parts of the organs susceptible?" <small>(T) 10/14</small> The lungs are the first.</p>
<ul>
<li><b>Oxidative burden.</b> "breathing in oxygen and other what we call reactive oxygen species exposes, thanks, exposes our lungs to just nasty reactive compounds." And the lung's own defense adds to it: "the activity of those white blood cells will also release reactive oxygen species. OK, so you have, therefore what we call a big oxidative burden." <small>(T) 10/14</small></li>
<li><b>Gases.</b> "the chemistry of the gas will determine where in the lungs that gas goes. OK? So, very hydrophilic gasses. Will actually go quite far down into the lungs and your hydrophobic gasses do not". Where a lung is damaged "gives you a hint on what might have caused the problem". <small>(T) 10/14</small></li>
<li><b>Particles: size.</b> Small particles "really don't get past your upper airway ... they will, um, be just breathed back out". Large particles "are going to impact on the upper branches of your airway, so like where your bronchioles bifurcate". "The medium sized particles are the ones that are the most concerning ... they are heavy enough to get, to not be breathed out with every, every breath, um, and they are small enough that they can go around the curves in your bronchioles". <small>(T) 10/14</small></li>
<li><b>Particles: shape.</b> "Those long thin particles will be also the ones that will be embedded into those upper airways as the lungs bifurcate, and some of those particles can move through tissues. I'm sure you guys have heard of mesothelioma with asbestos exposure." <small>(T) 10/14</small></li>
<li><b>Breathing pattern.</b> "go jog in a park rather than beside a road." <small>(T) 10/14</small></li>
<li><b>Acute vs chronic.</b> "airway reactivity, pulmonary edema are acute, and then fibrosis, emphysema and asthma are considered chronic results of exposures." <small>(T) 10/14</small></li>
<li><b>Systemic pulmonary toxins.</b> "bleomycin. And cyclophosphamide, these are chemotherapy medications. We give them by IV, but they're known to cause pulmonary toxicity." Both cause fibrosis, which "because of the mechanism of how that damage occurs, it's considered a non-organ specific. So I'm making it a little confusing for you right here." Monocrotaline and paraquat (herbicides) also cause pulmonary fibrosis. <small>(T) 10/14</small></li>
<li>A student asked about fluorine gas: "It would be definitely an acute response. It'll be very caustic to the lungs because of the water in our lungs." <small>(T) 10/14</small></li>
<li>Scope: "I'm not going to go into detail about what kinds of gasses, what kinds of particles are the worst. ... I just need you guys to get from this discussion that the lungs are susceptible. Why are certain areas of the lungs susceptible, and then for our pulmonary toxicity, we're thinking about acute versus chronic responses." <small>(T) 10/14</small></li>
</ul>
<p>How she asks it: which particle size is the concern and why; sort a list of responses into acute and chronic; a drug given by IV that damages the lungs.</p>
<p class="sub">Sources: Toxic Responses slides ‘Pulmonary Toxicity – Why are lungs susceptible?’, ‘Types of Pulmonary Toxicity’; (T) 10/14. Questions L15-001 to L15-010.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-2">
<h3>16. Neurotoxicity: the blood–brain barrier, energy, myelin, neurotransmission, and the four patterns of injury</h3>
<p>"This is one of my favorite topics here." <small>(T) 10/14</small></p>
<ul>
<li><b>Blood–brain barrier (figure).</b> Systemic capillaries have fenestrations and loosely joined pericytes ("parasites" in the transcript): "our capillaries are really kind of leaky, aren't they?" Brain capillaries: "instead of large fenestration sites, you've got very tight junctions where the cells of the vessel are tightly touching ... You also have these brain capillaries surrounded by glial cells. They are much more tightly connected to each other". It protects "Especially non-lipophilic compounds or larger compounds". <small>(T) 10/14</small></li>
<li>Two cautions: "There are parts of the brain where the blood-brain barrier is like, I guess you'd say looser than others." And "when children are born. That blood-brain barrier is still developing at birth for several months to years." Drugs that stayed out of adult brains "would cross the blood-brain barrier and cause harm" in very young children. <small>(T) 10/14</small></li>
<li><b>Why the nervous system is susceptible.</b> "our nervous system has very, very high energy requirements ... They are dependent on aerobic metabolism." "axonal transport, especially down those long cells in our periphery". Myelin: "We don't have myelin in any other, any other organs"; Schwann cells "wrap around and around and around the axon"; "If your myelin sheath has been damaged, you end up with your neurotransmission being slower, right? And the symptoms of that could be things like tingling of your hands and feet". And "it's the only part of the body that depends on neurotransmission to do its work". <small>(T) 10/14</small></li>
<li><b>Patterns of injury (Casarett and Doull Figure 16-2).</b> Neuron B: "Killed the whole thing, right?" C: "Yeah, axonopathy ... It's almost like a, maybe you could think of it as like a, a chemical. Like cut the axon here". D: "Myelinopathy, yeah, where whatever the exposure is, has actually damaged those Schwann cells". E: "the neurotransmission is being disturbed. ... How about organophosphates, right? A common class of pesticides that we use, they will cause neurotransmission damage." <small>(T) 10/14</small></li>
<li>Her Giardia story: a second, higher-dose course of metronidazole (Flagyl); "my hands are kind of weird and tingly, my feet. And I thought, oh my God, I'm getting multiple sclerosis ... but it was actually the medication that I was being given, that medication will cause myelinopathy". Remyelination "does take quite a while. So, uh, myelinopathy may not be the worst type of neurotoxicity that you could encounter". <small>(T) 10/14</small></li>
<li>The concept: "most of the time, a neurotoxin that you might be exposed to is gonna cause one of these discrete kinds of neurotoxicity. It's very rare that you're exposed to something that will completely, you know, blast apart the myelin, mess up your neurotransmission, and, and also kill the axon." Neurotransmission toxicity "Really won't have any change to the look of the cell". <small>(T) 10/14</small></li>
<li>Scope: "we're not gonna go through lists of them and make you memorize what kind of compound causes which kind of neurotoxicity. This is just a concept that you need to, you need to know, OK? And I did give you two examples". <small>(T) 10/14</small></li>
</ul>
<p>How she asks it: name the pattern from a description of the damaged neuron (or from her tingling story); the reason a drug safe in adults harmed newborns; which features make the nervous system vulnerable.</p>
<p class="sub">Sources: Toxic Responses slides ‘Neurotoxicity’, ‘Susceptibility to Neurotoxicity – Energy and Axons’, ‘– Myelin’, ‘– Neurotransmission’, ‘Types of Neurotoxicity’; (T) 10/14. Questions L15-011 to L15-018.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-3">
<h3>17. Hepatotoxicity: why the liver is susceptible, and the kinds of liver injury</h3>
<ul>
<li>Anatomy reminder (figure of a lobe): blood enters "through the hepatic portal artery and also the hepatic portal vein" at the edges, "the blood will trickle down across those basically cords of hepatocytes ... and it drains out of the liver via the hepatic, the central vein". Bile ducts start at the edges. <small>(T) 10/14</small></li>
<li>The slide typo: "Why is the lever susceptible? ... If you were to write lever on an exam question for me, I think I would have to count it right." <small>(T) 10/14</small></li>
<li><b>Why susceptible.</b> "Its job is to take up and concentrate stuff out of the blood ... If you ingest things orally, right, you've got all that portal circulation heading right to the lever". "it does a lot of metabolism with the potential of creating hepatotoxic metabolites right there in the liver". "it has its own inflammatory cells": "The Cooperer cells, Cooper, K U P F E R, Coopfer cells" (Kupffer cells), which "doing their job of cleaning up pathogens or damaged cells" release "inflammatory cytokines and reactive oxygen species". And "It can have idiosyncratic reactions". <small>(T) 10/14</small></li>
<li><b>Idiosyncratic and pharmacogenomics.</b> "The liver is the organ in our body that tends to have that kind of reaction. The kidneys don't really do that." Now "we could say, oh, that person's genotype is why they reacted to that drug like that. They have a rare genotype compared to the rest of the population". "that bullet point on this slide is gonna link us to our pharmacogenomics lectures that we'll get in another week or so". <small>(T) 10/14</small></li>
<li><b>Kinds of injury (Klaassen Table 13-2).</b> "hepatocyte death, that's the actual death of those, those hepatocytes ... The canalicular cholestasis means that the bile duct gets blocked ... it gets narrowed because those cells lining the bile ducts get damaged and inflamed." Steatosis is fatty liver. "if you don't already know what these different kinds of hepatotoxic responses are, just, just Google them and look them up." <small>(T) 10/14</small></li>
<li>Ethanol appears under cell death, steatosis, inflammation, regeneration and fibrosis; "this aflatoxin really is only causing liver cancer" (her PhD work). "each compound is usually very discrete in the kind of hepatotoxicity it'll cause". <small>(T) 10/14</small></li>
<li>Not memorized: "you have to memorize this table. It is all inclusive ... Do you think that's worth your time? I'm kidding. ... No, you do not have to memorize this table, OK?" But "be able to, you know, a little bit intelligently talk about these different kinds of hepatotoxicity that happen, OK? You'll need that in your GI module". <small>(T) 10/14</small></li>
<li>Finding the pattern: "Often they'll do imaging and uh um uh a liver biopsy to look for the pattern of injury, and that pattern of injury will give us a hint of what they might have been exposed to". <small>(T) 10/14</small></li>
</ul>
<p>How she asks it: her poll (which reasons make the liver susceptible: not its size); the name of the resident immune cells and why they add to injury; what a kind of liver response means in plain words.</p>
<p class="sub">Sources: Toxic Responses slides ‘Hepatotoxicity – review of liver anatomy’, ‘Hepatotoxicity – Why is liver susceptible?’, ‘Site-Specific Hepatotoxicity’; (T) 10/14. Questions L15-019 to L15-025.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-4">
<h3>18. Liver zones: the oxygen gradient and CYP2E1</h3>
<p>"I want to talk a bit more about hepatotoxicity, um, because this is really important for our toxicology discussions, OK?" <small>(T) 10/14</small></p>
<ul>
<li>The acinus: "zone 1 is closest to the, the vessels where the blood comes into the liver, and zone 3 is closest to the vessel where the blood leaves the liver, OK?" <small>(T) 10/14</small></li>
<li>Oxygen: "As the blood flows past those hepatocytes, and the hepatocytes grab the oxygen out of the blood, as that blood drains out of the liver via the central vein, the blood is hypoxic, compared to what it was as it came into the liver." "So there's a gradient in the amount of oxygen". <small>(T) 10/14</small></li>
<li>Enzymes: "a lot of our phase 2 enzymes are in zone 1. And some of our P-450s are more in zone 3. For example, cytokrome P452E1 is more highly expressed in zone 3. Then in zone one." <small>(T) 10/14</small></li>
<li>Her case: "patient overdosed on acetaminophen. Their acetaminophen is now being metabolized by SIP2E1. SIP 21 is most highly expressed in Zone 3 of the liver. So if you were to do a biopsy of their liver. What area of the liver has hepatocyte death occurring? Zone 3 why Cuz that's where a lot of 20 is expressed." <small>(T) 10/14</small></li>
<li>The two reasons: "So oxygen gradients and non-homogeneous expression of our metabolizing enzymes contributes to where you see liver damage for different hepatotoxins." <small>(T) 10/14</small></li>
<li>Her poll on regional susceptibility: high oxygen in zone 1 is the true statement; "most of our metabolizing enzymes are not homogeneously expressed across the entire liver"; "Those Cooper cells are crawling all over the liver". <small>(T) 10/14</small></li>
</ul>
<p>How she asks it: which zone dies after acetaminophen overdose and why; which zone is next to the central vein; which statement explains regional susceptibility.</p>
<p class="sub">Sources: Toxic Responses slide ‘Reasons for Site-Specific Hepatotoxicity’; (T) 10/14. Questions L15-026 to L15-029, L15-044.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-5">
<h3>19. Nephrotoxicity: why the kidneys are susceptible, kinds of renal injury, NSAIDs and PPIs</h3>
<ul>
<li><b>Why susceptible.</b> "It gets lots of blood flowing to it, especially blood that has gone through the liver and maybe lots of metabolites have been created by the liver and they're heading to the kidney." Renal cells "uptake compounds into themselves, so they're concentrating solutes", and "they can also be metabolized by the kidney cells". Unique: "it is sensitive to. Uh, any vasoconstriction that will go on with the arterials, both the afferent and the efferent arterial, if you reduce that blood flow, you're going to reduce GFR". <small>(T) 10/14</small></li>
<li><b>Kinds of injury (Klaassen Table 14-2).</b> Prerenal, vasoconstriction, crystalluria, tubular toxicity, endothelial injury, glomerulopathy, interstitial nephritis. "do you need to memorize this table? No, what you need to know are these different kinds of renal damage just in general". The drug-induced kidney injury paper comes with the adverse drug reactions lecture. <small>(T) 10/14</small></li>
<li><b>NSAIDs.</b> "One of the things I worry about the most are our NSAIDs. They can cause interstitial nephritis. They can cause vasoconstriction. So, our NSAIDs, they can also cause glomerular neuropathy" (glomerulopathy). Advice: "limit their use and drink lots of water while they're taking them". <small>(T) 10/14</small></li>
<li><b>PPIs: add them to interstitial nephritis.</b> The OTC label: "limit your use to two weeks ... One reason is if you have reflux that's bad enough to need a PPI for more than 2 weeks, you probably should get it checked out ... And another reason is the fact that these drugs can cause interstitial nephritis". <small>(T) 10/14</small></li>
<li>Her father's story: a geriatric patient, allergic to aspirin, started OTC omeprazole; the delayed physical found "my dad's serum creatinine was high". "PPIs can cause interstitial nephritis too, especially in patients that have an aspirin allergy." "that allergic response is manifesting as interstitial nephritis in some patients, so it's not like an allergic response where you get like hives". Outcome: "stop the PPIs, never go back on them"; "he had to go on erythropoietin for a little while". <small>(T) 10/14</small></li>
<li><b>Site specificity.</b> "probably the most important reason is that you'll have all that metabolism going on in the renal cells, and it will depend on what enzymes are expressed in what part of the cell or what part of the kidney"; tubular toxicity and crystalluria "has to deal more with the chemistry of those drugs". <small>(T) 10/14</small></li>
</ul>
<p>How she asks it: a patient on an OTC PPI with a rising creatinine; the drug class she worries about and its three renal injuries; why the kidney is uniquely sensitive to vasoconstrictors.</p>
<p class="sub">Sources: Toxic Responses slides ‘Nephrotoxicity – review of renal anatomy’, ‘Nephrotoxicity - Why are kidneys susceptible?’, ‘Site-Specific Nephrotoxicity’, ‘Reasons for Site-Specific Nephrotoxicity’; (T) 10/14. Questions L15-030 to L15-036.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-6">
<h3>20. Idiosyncratic and immunologic responses, and her four Poll Everywhere questions</h3>
<ul>
<li><b>Idiosyncratic.</b> "it's a reaction that we don't know why it's happening always, and often idiosyncratic reactions are pretty strong. And sometimes unexpected." "the liver is the organ that is most likely to have an idiosyncratic reaction compared to other organs in the body." Pharmacogenomics is "helping to explain. The unknowns of these idiosyncratic reactions". The slide adds: using the word for every low-frequency reaction is "not proper use of the term". <small>(T) 10/14; Toxic Responses slide ‘Idiosyncratic Toxicity’</small></li>
<li><b>Immunologic.</b> "I have on this title of the slide allergic responses, but it's probably more accurate to say immunologic responses. So why don't you change allergic to immunologic responses". Small drugs "may sometimes get bound up by certain proteins in the body, creating haptins, and that drug protein complex called a haptin can trigger the immune system"; large drugs (peptides, proteins) activate it directly. Two categories: "hypersensitivity is the first category ... like a type 1 or a type 2, type 3, or type 4 type of allergic response, which I know you've already covered with Dr. Medina last year" and "autoimmune reactions". <small>(T) 10/14</small></li>
<li>Biologicals: "That is happening with more and more frequency as we continue to put on the market our biologicals ... Oftentimes, those immune responses to those biological therapies are hard to predict, and they're often kind of bad". <small>(T) 10/14</small></li>
<li><b>Her polls</b> ("not for a grade, they're not attendance ... just to trigger your thinking"): (1) which statements are true regarding toxic effects: delayed responses weeks to years later, yes; always reversible, no; no local effects, no; systemic effects without absorption, no; immediate effects with each dose of a chronic exposure, yes. (2) Which is a non-organ-specific response: teratogenicity. (3) Why the liver is susceptible: all but "It is a large organ". (4) Regional susceptibility: "Relatively high oxygen content in Zone 1". Full wording in STYLE.md, Day 15. <small>(T) 10/14</small></li>
<li>Her warning after the polls: "those are examples of very easy, very easy pull everywhere questions, OK. The questions on the quizzes that you're having are a little more detailed, right? OK, and questions on your exam, because you've had a chance to study more, will be. Some of them will be much more detailed". <small>(T) 10/14</small></li>
</ul>
<p>How she asks it: the two categories of immunologic response; how a small molecule becomes immunogenic; the poll questions themselves, which she called the easy level.</p>
<p class="sub">Sources: Toxic Responses slides ‘Idiosyncratic Toxicity’, ‘Allergic Responses’, the four PollEV slides; (T) 10/14. Questions L15-037 to L15-044.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-7">
<h3>21. Treating poisonings: how pharmacokinetics change in overdose</h3>
<p>"Every example I give you is testable because it explains the concept that we're going to deal with, OK?" <small>(T) 10/14</small> "most often we see that the parameter of volume of distribution and the parameter of clearance will change significantly when there's an overdose situation." <small>(T) 10/14</small></p>
<ul>
<li><b>Volume of distribution.</b> "Why would drugs with very large volumes of distribution be very challenging to remove by hemodialysis? ... Yeah, it's not staying in the vasculature, right? ... It's distributed and probably sequestered somewhere like lipids, like muscle, like bone". After a round of dialysis "The drug is still present in the blood ... you have to wait for the drug to move out of the lipids, or out of the muscle or out of the bone back into the blood before hemodialysis is going to grab it again." The slide's large-Vd list (over 5 L/kg): antidepressants, antipsychotics, antimalarials, opioids, propranolol, verapamil. <small>(T) 10/14; Treating Poisonings slide ‘How Pharmacokinetics change in Overdose’</small></li>
<li><b>Clearance: saturated first pass.</b> "you've got too much drug for the liver to handle. Then that drug is going to go just right through the liver. It's not going to be metabolized, and it's gonna go into circulation". <small>(T) 10/14</small></li>
<li><b>Clearance: GI injury.</b> "A lot of our gut absorption is not by diffusion ... it's often by active transport mechanisms ... Those active transport mechanisms can get saturated. And therefore that could be protective". Iron: "iron is very caustic, it actually blows apart your gut. Therefore, you don't have the protection of a saturable active transport." <small>(T) 10/14</small></li>
<li><b>Clearance: protein binding.</b> "We're talking about blood protein binding capacity ... there's going to be more drug free in the blood, not bound up to the plasma proteins. Therefore, you've got a risk for having toxicity because a lot of that drug is free." <small>(T) 10/14</small></li>
<li>Also on the slide, read but not restated: slowed tablet dissolution or gastric emptying delays absorption and peak toxic effects; high plasma concentrations may change elimination from first order to zero order, extending half-life. <small>Treating Poisonings slide ‘How Pharmacokinetics change in Overdose’</small></li>
<li>"So you got therapeutic kinetics, and then you got overdose kinetics for a lot of drugs, OK?" <small>(T) 10/14</small></li>
</ul>
<p>How she asks it: why dialysis fails to clear a large-Vd drug; why an oral overdose of a first-pass drug gives unexpectedly high levels; the iron example; what happens to free drug.</p>
<p class="sub">Sources: Treating Poisonings slide ‘How Pharmacokinetics change in Overdose’; (T) 10/14. Questions L15-045 to L15-049.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-8">
<h3>22. How pharmacodynamics change in overdose</h3>
<ul>
<li><b>The figure (Katzung).</b> Drugs A and B, dose on the x axis, "CNS effects. Starting with sedation, going up to hypnosis, and then anesthesia, and then coma". Both sedate at the same dose; "for drug B ... you can keep increasing the dose of B, and you'll only get up to anesthesia. But drug A, you keep increasing the dose, and you just happen to get a linear response with this, and you get a coma". "Which one can you increase the dose and not have an unwanted adverse effect? B." "They look the same. At the therapeutic dose and at the therapeutic endpoint we want. But in overdose, their outcomes are different". <small>(T) 10/14</small></li>
<li>The slide's wording: two medications may have the same therapeutic index but unequal safe dosing; in speech she called the two indices both the same and different (recorded in notes/L15.md). The figure reading is what she keyed. <small>Treating Poisonings slide ‘How Pharmacodynamics change in Overdose’</small></li>
<li><b>TCAs.</b> "those drugs are horrible to treat in an overdose situation. It is rare that you can save a patient". "the TCAs, they reduce sweating ... At the same time that they are increasing muscular activity and potential for seizures ... so it's a double whammy in an overdose situation". <small>(T) 10/14</small></li>
<li><b>Beta blockers and calcium channel blockers.</b> "you're not only changing cardiac function ... but you're also changing blood flow to the kidney and the livers ... Reducing blood flow to the kidneys and the liver, you're reducing the body's ability to eliminate the drug ... and the dose stays high." <small>(T) 10/14</small></li>
<li>"those two points, the change in kinetics, the change in pharmacodynamics are something that everybody needs to remember as you're looking at an overdose, cause it's not gonna be straightforward." <small>(T) 10/14</small></li>
</ul>
<p>How she asks it: read the A/B figure; the TCA double whammy; the extra effect of a cardiac drug overdose on elimination.</p>
<p class="sub">Sources: Treating Poisonings slide ‘How Pharmacodynamics change in Overdose’; (T) 10/14. Questions L15-050 to L15-052.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-9">
<h3>23. Three angles, four toxicokinetic methods, and preventing absorption</h3>
<ul>
<li><b>Three angles.</b> "We will either think about treating them based on kinetics, or we'll think about treating them based on trying to inactivate the poison. Or we will think about trying to treat them based on, basically the pharmacology, the pharmacodynamics of what's going on, OK?" <small>(T) 10/14</small></li>
<li><b>Four toxicokinetic methods.</b> "sometimes we will try to prevent absorption of the poison or the overdose drug. Sometimes we're going to try to inhibit toxication or stop the bioactivation of it to a nasty compound, OK. Sometimes we can enhance metabolism or enhance detoxification. Sometimes, OK. Sometimes we can enhance elimination." Only the first was covered on 10/14. <small>(T) 10/14</small></li>
<li><b>Emesis.</b> Ipecac: "They no longer even sell it in the US. They don't even use it anymore in hospitals, OK, because it's too risky. What's the risk of emesis? Aspiration is the biggest risk." <small>(T) 10/14</small></li>
<li><b>Gastric lavage.</b> "Pump in your stomach, yeah, yeah, put a tube down, hope you don't get that tube in the person's lungs." "sometimes big tablets are hard to get up out." Not "for anybody that has any sort of esophageal rupture, issues with their stomach". <small>(T) 10/14</small></li>
<li><b>Whole bowel irrigation.</b> "Has anybody undergone a colonoscopy? That's whole bowel irrigation, OK? You drink something like Golightly, polyethylene glycol or what do we know mag citrate". Needs "no ileus, no blockages in the gut. ... It's messy". <small>(T) 10/14</small></li>
<li><b>Activated charcoal.</b> "This is purified charcoal. It's got very fine particles ... in a slurry in water". Risk: "people often vomit ... you could aspirate." Limit: "not every compound a person ingests is going to be grabbed and absorbed by charcoal." Fate: "where does it go? Fecal illumination" (elimination). Single dose "within 1 to 2 hours". Multiple dose: "if the substance they overdosed on undergoes enterohepatic recirculation ... a second dose of charcoal, you might be able to catch some of that compound as it's being re-injected back into the small intestine from the liver, from the through the bile." "limited to things that get stuck on charcoal and undergo that recirculation". <small>(T) 10/14</small></li>
<li><b>Where medicine stands.</b> The DiPiro reading (chapter e9, Clinical Toxicology, section "General approach to treatment" down to multiple-dose activated charcoal; skip enhanced elimination, kidney replacement and diuresis): "they state, we no longer use Emesis". Poison control centers in America and Europe "all basically say they're dangerous, they're risky, only use them if you really think you have to. So then it's up to the judgment of the people in the ER." Experienced toxicologists with "something massive and very dangerous ... might try gastric lavage. They will probably try to do whole bowel irrigation, OK? Um, emesis, probably not so much". <small>(T) 10/14</small></li>
</ul>
<p>How she asks it: name the three approaches and the four kinetic methods; the biggest risk of emesis; what each absorption-prevention method is and its risk; when multiple-dose charcoal applies.</p>
<p class="sub">Sources: Treating Poisonings slides ‘General principles for treating the poisoned patient’, ‘Toxicokinetic-Based Treatment’, ‘Toxicokinetic-Based Treatment Prevent Absorption’, ‘More on preventing absorption’; DiPiro ch. e9; (T) 10/14. Questions L15-053 to L15-062.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-10">
<h3>24. Evidence-based guidelines for overdoses, and what moved to Monday 10/19 (covered; see sections 25 to 32)</h3>
<ul>
<li>"we have a few medications for which these evidence-based guidance documents have been written, and they basically talk about what do you do if you've got a patient that overdosed on a big handful of immediate release beta blocker, or ... a handful of extended release beta blockers". The slide's list: acetaminophen, atypical antipsychotics, beta-blockers, calcium channel blockers, dextromethorphan, diphenhydramine and dimenhydrinate, iron, methylphenidate, salicylate, SSRIs, TCAs, valproic acid, elemental mercury, ethylene glycol, long-acting anticoagulant rodenticides. <small>(T) 10/14; Treating Poisonings slide ‘Guidelines for Overdoses’</small></li>
<li>The two documents to discuss: beta blockers and calcium channel blockers; "there are slight differences in what we do for a beta blocker overdose compared to a calcium channel overdose, even though they're all cardiac meds, OK? It also. Has differences between immediate release and extended release tablets." Read the abstracts, fill out the table (completion points), discuss Monday. <small>(T) 10/14</small></li>
<li>Where the data comes from: not clinical trials ("not very ethical"), rarely animals; "The data for these evidence-based guidance documents comes from people overdosing, clinicians, pharmacists, doctors write up the case, get it published, and it's in the literature. ... They pulled all those documents, evaluated every single one of those case reports or case series, and wrote these evidence-based documents." The evidence and the recommendations are graded; "it is evidence-based and weighted appropriately, so it's really good information." <small>(T) 10/14</small></li>
<li><b>The poisoning treatment table</b> (study tool, posted after class, not graded on content): for each listed drug, symptoms of overdose, antidote or supportive therapy, how the treatment works, special considerations, and the reference used. "Really, your only references will be the chapters that I'm asking you to read or a paper that I might ask you to read". Filled in on Monday. <small>(T) 10/14</small></li>
<li><b>Deferred to 10/19, and covered that day</b> (questions now in Day 16, sections 25 to 32): inhibit bioactivation (methanol and ethylene glycol; ethanol or fomepizole), enhance metabolism (cyanide, acetaminophen), enhance renal elimination (ion trapping, sodium bicarbonate) and extracorporeal methods, inactivation (chelators, antivenoms and antibodies), the four pharmacological categories (antagonist, agonist, removal from the active site, bypassing an inhibited pathway), toxidromes, and the specific poisonings table. "We will come back on Monday, uh, and finish up this lecture." <small>(T) 10/14</small></li>
</ul>
<p>How she asks it: which compounds have guidelines; where the evidence comes from; the two contrasts the beta-blocker and calcium channel blocker documents draw.</p>
<p class="sub">Sources: Treating Poisonings slides ‘Guidelines for Overdoses’, ‘Discussion of OD Guidelines’, ‘Treating specific poisonings Table’; (T) 10/14. Questions L15-063 to L15-065.</p>
</section>

<!-- ===================================================================== -->
<!-- ===== Day 16 (10/19) ===== -->
<!-- ===================================================================== -->
<!-- ===================================================================== -->
<section class="guide" id="guide3-l16-1">
<h3>25. Preventing absorption revisited; inhibit bioactivation (methanol, ethylene glycol)</h3>
<ul>
<li><b>Her opening rule.</b> "Everything that we've talked about in class, every, everything on slides, everything that's come out of my mouth, the things you've read, and we've talked about all that is testable." <small>(T) 10/19</small></li>
<li><b>What the outcome data say about charcoal.</b> "Yeah, so charcoal, based on patient outcomes is probably your best option. But not everything people ingest can be grabbed by charcoal in their stomach, right?" The window: "up to 2 hours. They used to say just an hour". Why there is a window: "Stuff moves on through, right? So you need to get that charcoal in their stomach and small intestine while the poison is still in that area of the body". Multiple-dose charcoal, in a student's words she accepted: for poisons that undergo enterohepatic recirculation and are grabbed by charcoal. <small>(T) 10/19</small></li>
<li><b>Inhibit bioactivation.</b> "There are not many cases where we can do this, where we can actually prevent the metabolism to a more toxic metabolite, but these are some classic examples." Methanol: alcohol dehydrogenase, formaldehyde, formaldehyde dehydrogenase, formic acid. "This is the compound in the bioactivation of methanol that is toxic. Formic acid will cause damage, especially to the eyes, to the retina of the eyes." Ethylene glycol: alcohol dehydrogenase, glycoaldehyde, aldehyde dehydrogenase, glycolic acid, several steps, oxalic acid, which "will sometimes precipitate in the blood to form small microcrystals" that block blood flow in the liver and kidneys. <small>(T) 10/19</small></li>
<li><b>Who gets exposed.</b> Antifreeze: "it smells and tastes sweet. OK, so it's a problem for animals" and for small children; the pink or blue is a dye. Methanol: "most of the time, those are people that have an alcohol substance use disorder." <small>(T) 10/19</small></li>
<li><b>The antidote.</b> "you can use ethanol or now a drug called omeprazole. So, you can give ethanol. And outcompete the alcohol alcohol dehydrogenase metabolism of methanol or ethylene glycol. Same thing with fomeprazole. It'll, it'll bind to and inhibit the alcohol dehydrogenase". (The transcript's "omeprazole" is fomepizole, the drug on the slide.) The Everclear bottle in the old ER; fomepizole gives "a little bit better control of the dosing." <small>(T) 10/19</small></li>
</ul>
<p>How she asks it: which metabolite of methanol is toxic and what it damages; what ethylene glycol ends up as and why that hurts; the antidote for both and its mechanism; why bioactivation can rarely be inhibited.</p>
<p class="sub">Sources: Treating Poisonings slides ‘Toxicokinetic-Based Treatment Prevent Absorption’, ‘Inhibit Bioactivation’, ‘methanol and ethylene glycol examples’; DiPiro ch. e9; (T) 10/19. Questions L16-001 to L16-009.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l16-2">
<h3>26. Recognizing the poisoning: blood draws and toxidromes</h3>
<ul>
<li><b>A student's question: how would you know?</b> "people will come into the ER or maybe you found them and they've got kind of classic symptoms, right? They may be unconscious ... The, the, the, the key indicator would be you get them into the ER and they do a blood draw, and they look for these alcohols in their blood." <small>(T) 10/19</small></li>
<li><b>What emergency rooms test for.</b> "Acetaminophen, OK, acetaminophen. Salicylates Iron Beta blockers, calcium channel blockers, and there's a few others ... oh, opiates as well". First a guess from the symptoms, then verification by the laboratory if it can test for the compound; "Other than that, sometimes it's just a guess." <small>(T) 10/19</small></li>
<li><b>Toxidrome.</b> "a group of systems of symptoms that we call a toxic toxodrome ... kind of a group of symptoms that are like, oh hey, look, this person has this, this and this. I wonder if they've been exposed to this compound." The Goodman and Gilman table (sympathomimetic, anticholinergic, cholinergic with SLUDGE, opioid, sedative-hypnotic, salicylate, calcium channel blocker) was on the slide she said she would reach at the end of the lecture; the session ended before it. Low yield until she covers it. <small>(T) 10/19; slide ‘Toxidromes’</small></li>
</ul>
<p>How she asks it: how a methanol or ethylene glycol poisoning is confirmed; which overdoses the ER screens blood for; what a toxidrome is.</p>
<p class="sub">Sources: Treating Poisonings slide ‘Toxidromes’ (Goodman & Gilman Table 4-7); (T) 10/19. Questions L16-010 to L16-013.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l16-3">
<h3>27. Enhance metabolism: cofactors; cyanide; acetaminophen and N-acetylcysteine</h3>
<ul>
<li><b>Why cofactors, not induction.</b> "It'd be great if we could induce the expression of enzymes involved in this metabolism, but that is really not possible in a poisoning situation ... It takes a few days ... What we can do is try to enhance the metabolism by giving cofactors for those metabolizing reactions". Two examples: cyanide and acetaminophen. <small>(T) 10/19</small></li>
<li><b>Cyanide, step by step (Golan figure).</b> Target: "Cytochrome C oxidase ... Helps with our electron transport chain"; "you basically suffocate because you're not doing any more of your ATP production". Amyl nitrite oxidizes hemoglobin to methemoglobin ("Will it carry oxygen? No, OK, we're still gonna create it in our patients though"). "methemoglobin is able to pull cyanide off of cytochrome C oxidase", forming cyanmethemoglobin and regenerating the enzyme. Rhodanese ("rodonase"), the body's own enzyme, moves the cyanide onto sulfur from thiosulfate; that product, labeled thiocyanate on the figure, is renally eliminated. Sodium thiosulfate is the agent given: the rhodanese pathway is capacity limited, and thiosulfate donates the sulfur (Marraffa, p. 204). Her "giving them this cofactor called rodonase" refers to this step. Methylene blue, "a reducing agent", converts methemoglobin back to hemoglobin. Her question: which of the three is the enhance-metabolism step? "Yeah, the roadnas." <small>(T) 10/19</small></li>
<li><b>Acetaminophen.</b> NAPQI ("NAQI") is "that free radical, that's nasty, damages liver." "Glutathione, with the help of the GST enzymes, yes, you end up conjugating NAQI with glutathione." NAC: "No, it's not neutralizing free radicals ... it's giving ingredients to the system to create more glutathione." Two-minute partner explanation. <small>(T) 10/19</small></li>
<li><b>NAC in practice.</b> "It stinks, smells like rotten eggs ... in the United States, we tend to give it by IV ... If, if they have an oral formulation, make sure you are giving the IV formulation if you're giving it IV". Methylene blue stains you blue (her cocaine-solution story). <small>(T) 10/19</small></li>
</ul>
<p class="antirow">Diagrams: <button type="button" class="chip antichip" data-anti="01-cyanide-pathway-overview">◧ Cyanide: overview</button><button type="button" class="chip antichip" data-anti="03-cyanide-antidote-stepper">◧ Cyanide: step by step</button><button type="button" class="chip antichip" data-anti="02-cyanide-small-molecules">◧ Cyanide: molecules</button></p>
<p>How she asks it: cyanide's target and what happens; what each of the three agents does and which one is the cofactor; what NAC does and what conjugates NAPQI; why induction is not used.</p>
<p class="sub">Sources: Treating Poisonings slides ‘Toxicokinetic-Based Treatment Enhance Metabolism’, ‘Cyanide example’, ‘Acetaminophen Example’; (T) 10/19. Questions L16-014 to L16-022.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l16-4">
<h3>28. Enhance elimination: ion trapping with bicarbonate; extracorporeal methods</h3>
<ul>
<li><b>The problem.</b> "they get filtered at the glomerulus, get into the urine that's being formed, but then will get reabsorbed. So you continue the poisoning by the reabsorption of that compound from the forming urine into the systemic circulation." <small>(T) 10/19</small></li>
<li><b>Ion trapping.</b> For "salicylates on some of our barbiturates, they are mildly acidic ... at normal urine pH, they are not charged ... giving the patient sodium bicarb by IV, the sodium bicarb goes into the urine and will charge that acid, and it can't be reabsorbed when it's charged." Her question: what charge? "Negative charge, right? ... those things have to be, um, for the most part uncharged". No Henderson-Hasselbalch exercises: "just take my word for it." <small>(T) 10/19</small></li>
<li><b>Not for weak bases.</b> "acidifying a person's blood to try to get their urine more acidic is kind of dangerous"; cranberry juice gives "not low enough pH and not fast enough". <small>(T) 10/19</small></li>
<li><b>Extracorporeal.</b> "hemodialysis, hemofiltration, or hemo perfusion. Um, you might try to do plasma exchange or whole, whole exchange transfusions for people that are really bad". "the chemistry of whatever a person's been poisoned with is going to determine whether or not these ... methods are going to work ... Dialysis doesn't grab everything." For "very, very severe poisonings where other things are not working." Dialysis itself comes in the renal module (Dr. Beck, January). <small>(T) 10/19</small></li>
</ul>
<p>How she asks it: what bicarbonate does to the urine and to a weak acid; why it is not done for weak bases; which methods are extracorporeal and when they are used.</p>
<p class="sub">Sources: Treating Poisonings slides ‘Toxicokinetic-Based Treatment Enhance Renal Elimination’, ‘Extracorporeal enhancement of elimination’; (T) 10/19. Questions L16-023 to L16-028.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l16-5">
<h3>29. Inactivation of poisons: chelators, antivenoms and antibodies</h3>
<ul>
<li><b>When and what.</b> "this will work only once the compound unfortunately has been absorbed into the systemic circulation" ... "what we officially call an antidote". The inactivator binds the toxin so it cannot reach its target, the complex is cleared, the complex has "let's change that from low to no toxicity", and the inactivator "needs to have high affinity for the toxin". Her drawing: grab the whole poison, not one end of it. <small>(T) 10/19</small></li>
<li><b>Chelators.</b> Bind "lead, mercury, cadmium, iron, and copper"; "small molecules, and they have a nucleophilic electron"; multidentate, "kind of looks like a spider, right? The legs are binding one atom of that copper"; higher affinity for the toxic metal than tissue macromolecules; must not bind magnesium or calcium ("calcium, for example, would be a most common concern"); water soluble, non-toxic, readily cleared. Structures not required. <small>(T) 10/19</small></li>
<li><b>The table to memorize.</b> "please memorize this table, uh, know the chelating agent and know what metal it grabs." Edetate disodium: lead. Dimercaprol (BAL): gold, arsenic, lead, mercury. Succimer: lead, cadmium, mercury, arsenic. Deferoxamine and deferasirox: iron ("the differracerox, when it came on the market, was nice cause it was, um, it's oral"). Penicillamine and trientine: copper, Wilson's disease. Side effects not covered. <small>(T) 10/19; slide ‘Example Chelating Agents’</small></li>
<li><b>Antivenoms and antibodies.</b> "an anti-venom or an antibody has to have high affinity and high specificity". Polyclonal: "we will inoculate an animal. With small amounts of a snake venom ... draw their blood, and you can actually basically filter out those antibodies"; "a collection of antibodies ... not just one single. Genetically identical antibody". The danger: "type 3 hypersensitivity ... also called serum sickness ... fever, nausea, malaise". Digoxin immune Fab: she said "digoxin immune fab. This is an antibody, a monoclonal antibody that's made to treat a digoxin overdose"; the FDA label describes sheep-derived antibody fragments (ovine Fab from sheep immunized with a digoxin derivative). Opioid and other snake-bite monoclonals not on the market. Antivenom shortages and the hospital network. <small>(T) 10/19</small></li>
</ul>
<p>How she asks it: the properties of an inactivator and of a chelator; which chelator binds which metal; how a polyclonal antivenom is made and why it causes serum sickness; what digoxin immune Fab is.</p>
<p class="sub">Sources: Treating Poisonings slides ‘Inactivation of Poisons’, ‘Heavy Metal Chelators’, ‘Structure of chelators’, ‘Example Chelating Agents’, ‘Antivenoms and Antibodies’; (T) 10/19. Questions L16-029 to L16-038.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l16-6">
<h3>30. Pharmacological treatment: antagonist, agonist, removal from the active site, bypass</h3>
<ul>
<li><b>Four subtopics.</b> "antagonists is first. Then sometimes we have treatments that are agonists. Sometimes we have treatments that actually remove the poison from the active site ... And then we have kind of a grab bag of pharmacologically based treatments that are when we will bypass an inhibited metabolic pathway." <small>(T) 10/19</small></li>
<li><b>Antagonists.</b> Naloxone, "an antagonist of an opioid receptor". Flumazenil: after a slip, "The benzos are the overdose, Flomazinil is your antidote, and your treatment is the antagonist. I had it right the first time." Atropine: organophosphates inhibit acetylcholinesterase, acetylcholine rises, "atropine is going to antagonize acetylcholine." <small>(T) 10/19</small></li>
<li><b>Agonist.</b> Physostigmine for "the belladonna alkaloids, like jimsonweed ... they cause anticholinergic effects. And so physostigma is gonna agonize those receptors" (slide: it blocks acetylcholinesterase to increase acetylcholine, so acts like an agonist). The sign: "will make your eyes dilate." <small>(T) 10/19</small></li>
<li><b>Removal from the active site.</b> Cyanide: "that methemoglobin is pulling cyanide off of the cytochrome C oxidase onto itself. So this is removing the poison from the active site." Pralidoxime: "it's gonna pull off the organophosphate and put it onto itself. And when it does that, it can be eliminated." Aging: "a part of the phosphate falls off. Once that happens. Pralodoxine is not able to pull off that organophosphate"; it depends on "the chemical structure of the organophosphate". Soldiers' kits carry both therapies mixed in one. Carbon monoxide and oxygen: on the slide; she said she would come back to it and did not. <small>(T) 10/19</small></li>
<li><b>Bypass.</b> Warfarin "inhibits the activity of the epoxide reductase. Therefore, you reduce the amount of vitamin K being reformed. Therefore, if you don't have as much active vitamin K, you don't make as much coagulation factors." Not the carboxylase: "It would be nice if warfarin was acting on that vitamin K dependent carboxylase ... but it's not." Antidote: "Vitamin K, right? ... Kind of bypassing this blocked metabolic scheme." Signs of over-anticoagulation: "bruising ... GI bleeds ... hemorrhagic stroke". Her liver-clinic story. <small>(T) 10/19</small></li>
<li><b>Her framing.</b> "the point of that lecture was to talk about the bigger concept ... The examples are just examples." <small>(T) 10/19</small></li>
</ul>
<p class="antirow">Diagrams: <button type="button" class="chip antichip" data-anti="04-receptor-antagonist-naloxone-flumazenil">◧ Naloxone, flumazenil</button><button type="button" class="chip antichip" data-anti="05-cholinergic-atropine-physostigmine">◧ Atropine, physostigmine</button><button type="button" class="chip antichip" data-anti="06-pralidoxime-and-co">◧ Pralidoxime, CO</button><button type="button" class="chip antichip" data-anti="07-warfarin-vitamin-k">◧ Warfarin, vitamin K</button></p>
<p>How she asks it: the four categories; which category each example belongs to and why; which drug is agonist and which antagonist in the flumazenil case; what pralidoxime does and why it can fail; warfarin's enzyme and the vitamin K bypass.</p>
<p class="sub">Sources: Treating Poisonings slides ‘Pharmacological Treatment’, ‘Treatment is a receptor antagonist’ (two slides), ‘Treatment is a receptor agonist’, ‘Treatment Removes Toxin from Active Site’, ‘Pralidoxime example’, ‘Treatment by-passes an inhibited pathway’; (T) 10/19. Questions L16-039 to L16-053.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l16-7">
<h3>31. The beta-blocker and calcium channel blocker guideline discussion, from her key</h3>
<ul>
<li><b>The documents.</b> "published in the Journal of Clinical Toxicology, and they have not done any new ones recently ... What they published in 2005 is still what they follow". Evidence-based means "They rank the data that they have to create these documents, and they rank the strength of the recommendations". Poison center staff "would basically have these documents memorized". <small>(T) 10/19</small></li>
<li><b>Question 1, reducing absorption.</b> "charcoal, right? Do you do that at home? No, that is something that they'll do when they get to the hospital". "At home, do you encourage somebody to get the person to vomit? We don't recommend that anymore ... They might, they might aspirate." <small>(T) 10/19</small></li>
<li><b>Question 2, the windows (asymptomatic patient).</b> Immediate-release, both classes: within 6 hours, hospital; after 6 hours, "they're OK. You're gonna stay by them and watch them". Modified-release calcium channel blocker except verapamil: within 18 hours, "You need to get him in." Sustained-release beta blocker: "within 8 hours". Modified-release verapamil: within 24 hours, hospital; "If you find them after 24 hours and they are non-systematic symptomatic, they're probably OK." Why extended release is different: the tablets "clump in the stomach or in the small intestine ... Think Harry Potter" and the clump "could break apart, and all of a sudden you're gonna get a huge absorption". Why the classes differ: the data, which "speaks to the mechanism of action of calcium channel blockers versus beta blockers" (cardio module). <small>(T) 10/19</small></li>
<li><b>Question 3, transport.</b> "You need to call an ambulance. Why? Cuz they've got the stuff on the animals to help them if they start. Crashing ... you don't have any IVs to hang, you don't have any pressers to hang, OK, you don't have any paddles." <small>(T) 10/19</small></li>
<li><b>Follow-up and intent.</b> Calcium channel blockers: "based on the judgment of the poison center"; beta blockers: "usually the interval is about 2012 to 24 hours based on the judgment of the poison center" (12 to 24). Self-harm: "They're gonna need some counseling, some evaluation". <small>(T) 10/19</small></li>
<li><b>What to know.</b> "I want you to know those time frames, OK, which drug formulation is OK at this time frame ... Also, you need to know you don't make them barf at home, it's too dangerous". <small>(T) 10/19</small></li>
</ul>
<p>How she asks it: the window for each formulation and class; what to do at home and how to get to the hospital; the follow-up difference; the self-harm point; why extended-release needs a longer window.</p>
<p class="sub">Sources: Treating Poisonings slides ‘Guidelines for Overdoses’, ‘Discussion of OD Guidelines’; AAPCC 2005 beta-blocker and calcium channel blocker guidelines (abstracts) and her posted key; (T) 10/19. Questions L16-054 to L16-066.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l16-8">
<h3>32. The poisoning table, and what moved to Tuesday 10/20</h3>
<ul>
<li><b>Sources for the table.</b> "your Depiro's, uh, the 13th edition, chapter E9 ... the next section of the chapter where ... they're actually talking about treating specific poisoning ... And then also this article by Marafa. It's a really good article and it breaks down step by step, a lot of the, the symptoms that you'll see in these overdoses and then the treatments that we use, and importantly, their mechanism of action." "the Marafa article has the information in it, um, fast. It's the quickest to read". Bulleted entries; "Don't use AI please." Due the next morning; "I will post my key, and that will give you an idea of the detail that I think you need to know for the exam, and we'll go over the table tomorrow morning". <small>(T) 10/19</small></li>
<li><b>The exam.</b> "your exam is Friday ... The material for the exam is today and tomorrow." The vote on whether Tuesday's pharmacogenomics lecture counts on Friday was moved to after Tuesday's lecture. "toxicology. Is tested on the board exam ... as well as pharmacogenomics." "The heaviest part of that will be this poisoning table." <small>(T) 10/19</small></li>
<li><b>Not reached on 10/19.</b> The toxidromes table (defined in passing only); the carbon monoxide bullet; the bonus decks on toxicology careers and pharmaceuticals in the environment (not opened). <small>(T) 10/19</small></li>
</ul>
<p>How she asks it: the table's columns (symptoms, antidote, how it works, special considerations) for the overdoses discussed; she grades the table for completion and tests from her key.</p>
<p class="sub">Sources: Treating Poisonings slide ‘Treating specific poisonings Table’; DiPiro ch. e9; Marraffa 2012; (T) 10/19. Questions L16-067, L16-068.</p>
</section>

<!-- ===================================================================== -->
<!-- ===== Day 17 (10/20) ===== -->
<!-- ===================================================================== -->
<section class="guide" id="guide3-l17-1">
<h3>33. Why pharmacogenomics: inter-individual variation, primaquine, the timeline, twin studies</h3>
<ul>
<li><b>Why the field exists.</b> Large inter-individual variation in drug response, sometimes lethal in one person and nothing in another. It was first linked to age, ethnicity, gender and underlying disease; "with our progression and our knowledge about genetics, we are now able to explain some of these variations in response, uh, based on genetics." <small>(T) 10/20</small></li>
<li><b>Primaquine, the first real data point.</b> An antimalarial prophylactic used "a lot in the 50s during the Korean War". Soldiers of Middle Eastern or African descent developed hemolytic anemia (slide: methemoglobinemia leading to hemolytic anemia); they had low glucose-6-phosphate dehydrogenase activity in their red blood cells. "we couldn't genotype at that time, but we could measure that enzyme activity, and we realized that that phenotype of the enzyme activity was reflecting these people's genotype". The MASH episode on the slide (The Red/White Blues, episode 214) acts it out. <small>(T) 10/20; slide ‘History of Primaquine’</small></li>
<li><b>The timeline.</b> 1953 Watson and Crick, structure of DNA; 1956 genetic link to primaquine hemolysis; 1957 Motulsky: inheritance might explain individual differences in drug efficacy and adverse drug reactions; 1959 Vogel coins "pharmacogenetics"; 1990 Human Genome Project starts; 2003 completed, "early and under budget". A worldwide consortium of academics, industry and government agencies that shared every sequence in a database; its new methods led later to whole genome sequencing "in a matter of hours". <small>(T) 10/20; slide ‘Genomics History’</small></li>
<li><b>Twin studies.</b> Antipyrine "is cleared all the way by metabolism. It's just like one enzyme does it." Identical twin pairs had almost identical half-lives; fraternal pairs varied (only pair d was close). "We did not genotype these people at this time. We were looking at their phenotype, which was the half-life of the clearance of the drug". <small>(T) 10/20; slide ‘Twin Studies Data’ (G&amp;G Fig. 4-2)</small></li>
</ul>
<p>How she asks it: the first indication of genetic variation in drug response and the enzyme involved; what was measured before genotyping existed; years on the timeline; who coined pharmacogenetics; what the twin figure shows.</p>
<p class="sub">Sources: Intro to PGx slides ‘Inter-Individual Variations’ (p. 4), ‘History of Primaquine’ (p. 5), ‘Genomics History’ (p. 6), ‘Twin Studies Data’ (p. 7); (T) 10/20. Questions L17-001 to L17-009.</p>
</section>
<section class="guide" id="guide3-l17-2">
<h3>34. Pharmacogenetics vs pharmacogenomics; impact, uses and limitations</h3>
<ul>
<li><b>The two terms.</b> "pharmacogenetics is the term that we use when we're thinking about an individual, one patient, and their response to a drug, OK. Pharmacogenomics is a more global term. That's where we're thinking about populations as a whole". Pharmacogenomics also covers technologies such as gene therapy. Used interchangeably; the preferred term is pharmacogenomics. Definitions: AAPS (American Association of Pharmaceutical Scientists) Pharmacogenomics Focus Group; she first said WHO, then corrected herself. <small>(T) 10/20; slide ‘Definition of Genomics vs Genetics’</small></li>
<li><b>Why organizations define terms.</b> "It helps get us all on the same page" ... "we have better scientific communication going on." Without common definitions, one country's agency cannot compare its data with another's. <small>(T) 10/20</small></li>
<li><b>Impact.</b> MacKinnon et al. 2023: more than half the patients evaluated were prescribed medications where pharmacogenomics is important (the study did not check whether it was used). Wondrasek et al. 2024: pharmacists feel it is important but do not feel confident in their knowledge or ability to use it. Pharmacy students are the best educated; prescribers "are not as well versed yet in pharmacogenomics, cause they don't spend as much time with drugs as you guys do." <small>(T) 10/20; slide ‘Impact of Pharmacogenomics’</small></li>
<li><b>Uses and limitations.</b> Often a side effect or lack of efficacy prompts genotyping afterward, which is acceptable when the side effect is not lethal. For a drug that can quickly cause a lethal side effect, "It's better to genotype the patient ... before you give them that drug"; for some medications "it's standard protocol. You could be liable." Some drugs could be genotyped but rarely are in practice; "if insurance will pay for it and it saves the cost ... do it." Oncology uses it all the time; CNS, cardiology and infectious disease increasingly. <small>(T) 10/20</small></li>
</ul>
<p>How she asks it: individual vs population; which term is preferred and who defined them; the two impact papers; who else should know pharmacogenomics; when to genotype before prescribing.</p>
<p class="sub">Sources: Intro to PGx slides ‘Definition of Genomics vs Genetics’ (p. 8), ‘Impact of Pharmacogenomics’ (p. 9); (T) 10/20. Questions L17-010 to L17-017.</p>
</section>
<section class="guide" id="guide3-l17-3">
<h3>35. The four target areas; PK, PD and the two outcome buckets</h3>
<ul>
<li><b>Four, not three.</b> "change this from 3 to 4 target areas" ... "You do need to know these. So what are they? Metabolizing enzymes, transporters, drug targets, and then immunological targets". The printed title still says three. <small>(T) 10/20; slide ‘Three Target Areas’</small></li>
<li><b>Metabolizing enzymes</b> (P450s, now phase 1 and phase 2 enzymes): known best, "the low hanging fruit"; patients who could not clear certain drugs had blood concentrations too high and some died. Slide: serious implications for narrow therapeutic-index drugs. <small>(T) 10/20</small></li>
<li><b>Transporters.</b> P-glycoprotein (P-gp) in the gut, encoded by ABCB1, an efflux transporter. A P-gp substrate taken orally: think bioavailability. Digoxin (narrow therapeutic index) with a low-activity P-gp variant: "Does the bioavailability go up or does it go down? Who said that up, it goes up." <small>(T) 10/20</small></li>
<li><b>Drug targets</b> (a receptor, or an enzyme a drug inhibits): slower progress; a pharmacogenomics guidance document on beta-adrenergic receptor variants came out 2 years ago (to be covered in a few days); "The area where drug targets has the biggest role right now is in oncology." <b>Immune system:</b> HLA antigen variants and severe adverse reactions; the list grows each year. <small>(T) 10/20</small></li>
<li><b>The PharmGKB figure.</b> Top arc: PK genes, absorption, distribution, metabolism, excretion. Bottom arc: PD genes, target, mechanism of action, drug response. Outcome: "the bucket of efficacy or ... the bucket of toxicity." Less active metabolizing enzyme: toxicity. Poorly responding receptor, or a cancer without the drug's target protein ("don't give them this drug. It's expensive, and it can cause side effects"): efficacy. "We always try to either prevent toxicity or ensure efficacy by using pharmacogenomics." <small>(T) 10/20; slide ‘Impact of Pharmacogenomics on PK and PD’</small></li>
</ul>
<p>How she asks it: name the four target areas; why enzymes came first; P-gp, its gene and its effect on digoxin bioavailability; which bucket a scenario belongs to.</p>
<p class="sub">Sources: Intro to PGx slides ‘Three Target Areas’ (p. 10), ‘Impact of Pharmacogenomics on PK and PD’ (p. 11); (T) 10/20. Questions L17-018 to L17-027.</p>
</section>
<section class="guide" id="guide3-l17-4">
<h3>36. Wild type, variant, polymorphism, rare variant, SNP</h3>
<ul>
<li><b>Wild type vs variant.</b> "Wild type is a term used to talk about a version of a gene that is the most common, usually." A variant is a less common version. Sometimes the literature's wild type is just the version understood first, but "if you tell me the wild type is the most common, I'll say, yeah, that's fine". Say variant, not mutant. <small>(T) 10/20; slide ‘Wildtype vs Variant’</small></li>
<li><b>Polymorphism vs rare variant.</b> "by definition, a polymorphism occurs at least 1% of the time in a population" ... "A rare variant is a genetic variation that is occurring in less than 1% of the population." The term rare variant is newer: patients reacting badly without the known polymorphism turned out to carry an uncommon variation. <small>(T) 10/20; slide ‘Polymorphism’</small></li>
<li><b>SNP and other polymorphisms.</b> A single nucleotide polymorphism (SNP, "snip"): one nucleotide differs from the wild type; the most common type. Other kinds can also be polymorphisms: more than one nucleotide change, a whole gene insertion or deletion, extra copies of a gene, a sister chromatid exchange. "polymorphism definition speaks to the frequency of that change happening". Use the words genetic variant, not aberration. <small>(T) 10/20</small></li>
</ul>
<p>How she asks it: define wild type, variant, polymorphism and rare variant; the 1% cutoff; whether a whole-gene deletion can be a polymorphism; what a SNP is.</p>
<p class="sub">Sources: Intro to PGx slides ‘Wildtype vs Variant’ (p. 13), ‘Polymorphism’ (p. 14); (T) 10/20. Questions L17-028 to L17-033.</p>
</section>
<section class="guide" id="guide3-l17-5">
<h3>37. Allele, homozygosity, genotype, phenotype, functional significance</h3>
<ul>
<li><b>Allele.</b> "most of us have two copies of every gene. And so one copy is an allele and the other copy's in allele." Diploid; one from the biological mother, one from the father. <small>(T) 10/20; slide ‘Allele’</small></li>
<li><b>Homozygous and heterozygous.</b> In the figure, PP and aa are homozygous; Bb: "They're heterozygous, right?" Say "heterozygous for B at this 3rd loci". Dominant and recessive are not used in pharmacogenomics; gene dose comes later. <small>(T) 10/20; slide ‘Homozygosity and Heterozygosity’</small></li>
<li><b>Genotype and phenotype.</b> The two alleles a person has are the genotype; a phenotype is any observable characteristic and results from expression of genes; "Phenotypes are driven by the genotype". Written genotype: CYP2C19*2/*2 for a person homozygous for *2. The *2 variant "has No activity", so that person has no 2C19 activity; the genotype-phenotype relationship for *2 is "really tight". <small>(T) 10/20; slide ‘Genotype vs phenotype’</small></li>
<li><b>Functional significance</b>, her key phrase: "How does that mutation affect the function of the protein, or the enzyme or the transporter that that gene creates in our body". <small>(T) 10/20</small></li>
<li><b>What complicates the relationship.</b> Many polymorphisms in one gene ("It's hard to figure out which genetic variation is causing the phenotype"); most traits multigenic, not monogenic (one-variant diseases: sickle cell, Huntington's chorea, Tay-Sachs, certain early-onset Alzheimer's and Parkinson's; multigenic: cardiovascular disease, diabetes, hyperlipidemia); drug response can be multigenic, with each gene's effect weighted; environment (diet, habits, exercise, sleep, stress) and epigenetic factors (DNA methylation, histones). <small>(T) 10/20; slide ‘Complications of Genotype vs phenotype’</small></li>
</ul>
<p>How she asks it: define allele, genotype, phenotype; read zygosity from the figure; write a genotype; define functional significance; list the three complications.</p>
<p class="sub">Sources: Intro to PGx slides ‘Allele’ (p. 15), ‘Homozygosity and Heterozygosity’ (p. 16), ‘Genotype vs phenotype’ (p. 17), ‘Complications of Genotype vs phenotype’ (p. 18); (T) 10/20. Questions L17-034 to L17-044.</p>
</section>
<section class="guide" id="guide3-l17-6">
<h3>38. Haplotype, allele and genotype frequency, Hardy-Weinberg equilibrium</h3>
<ul>
<li><b>Haplotype.</b> "it's a set of alleles at multiple loci that coexist in the same chromosome." It has statistical significance: "a haplotype is going to be occurring at a frequency that is greater than random chance." The slide calls that excess linkage disequilibrium. In the illustration, SNPs A/G, G/T and A/T give three haplotypes, AGT, GTA and AGA. Warfarin will be the haplotype example later. <small>(T) 10/20; slides ‘Haplotype’, ‘Illustration of Haplotype’</small></li>
<li><b>Allele frequency and genotype frequency.</b> How often an allele occurs in a population; how often a genotype occurs; both as a proportion or percentage. <small>(T) 10/20; slide ‘Frequencies in Pharmacogenomics’</small></li>
<li><b>Hardy-Weinberg equilibrium.</b> Slide: allele and genotype frequencies stay constant from generation to generation unless specific influences are introduced. Her words: whether a genetic variation in a population is "Occurring because of evolutionary pressure or not". Her example: if stress had changed this class's drug response, "we can't use this data because we are not in Hardy-Weinberg equilibrium"; papers state their population was in equilibrium to show the results are generalizable. <small>(T) 10/20</small></li>
</ul>
<p>How she asks it: define haplotype and linkage disequilibrium; read the haplotypes off the figure; allele vs genotype frequency; what being out of Hardy-Weinberg equilibrium means for a study.</p>
<p class="sub">Sources: Intro to PGx slides ‘Haplotype’ (p. 19), ‘Illustration of Haplotype’ (p. 20), ‘Frequencies in Pharmacogenomics’ (p. 21); (T) 10/20. Questions L17-045 to L17-051.</p>
</section>
<section class="guide" id="guide3-l17-7">
<h3>39. The exam vote, and what was not reached on 10/20</h3>
<ul>
<li><b>Objectives.</b> "Every slide with a term on it, you need to know those terms, OK? There's no sense in me writing out define allele, define haplotype". <small>(T) 10/20; slide ‘Outline and Objectives’</small></li>
<li><b>The vote.</b> "You have the choice of your exam covers only toxicology, or your exam covers everything through what we got done today." The poisoning table is on the exam either way. The class voted to include the day: "All right, that's what I do. That's what we'll do. That's how we have it on the syllabus." Friday's exam therefore covers the 10/20 material through ‘Frequencies in Pharmacogenomics’ (p. 21). <small>(T) 10/20</small></li>
<li><b>Not reached.</b> Polymorphism nomenclature (pp. 22–29: SNP, star, rs, genotype and haplotype nomenclature) and types of genetic variants (pp. 30–41). "When we start tomorrow on polymorphism nomenclature, that's when it gets a little crazy." These start 10/21 and are outside Friday's exam; the questions on them are low yield. <small>(T) 10/20</small></li>
<li><b>Deferred.</b> Digoxin and P-gp ("we will talk more about this example"), the beta-adrenergic receptor guidance document, oncology drug targets, HLA examples, warfarin as a haplotype example, gene dose. <small>(T) 10/20</small></li>
</ul>
<p>How she asks it: the scope is set by her vote; for 10/20 she tests the terms on every slide she taught.</p>
<p class="sub">Sources: Intro to PGx slide ‘Outline and Objectives’ (p. 2), slides pp. 22–41 (not reached); (T) 10/20. Questions L17-052 to L17-060.</p>
</section>
`;
