const GUIDE3_HTML = `
<p class="sub">Cites: <i>Tox</i> = Principles-of-Tox-Lecture-Students-Fall-2026_WCAG21A.pdf, cited by slide title because the deck prints no slide numbers; <i>(T) 10/9</i> = her words in the lecture transcript of that day; <i>Reading</i> = RodriguezMozaz-EHP-2010.pdf (the assigned article), by page.</p>
<p class="sub">Source hierarchy for Exam 3: what she said in lecture first, then the slides, then the reading. Where the two differ the section says so.</p>
<nav class="guidenav">
<a href="#guide3-scope">What Exam 3 tests</a>
<a href="#guide3-1">1 Definitions: poison, toxin, toxicant, xenobiotic</a>
<a href="#guide3-2">2 The five principles of toxicology</a>
<a href="#guide3-3">3 Source: where the exposure comes from</a>
<a href="#guide3-4">4 Exposure: route, formulation, duration, single vs repeated, frequency</a>
<a href="#guide3-5">5 ADMET: bioactivation, detoxification and acetaminophen</a>
<a href="#guide3-6">6 Dose: the dose makes the poison, LD50</a>
<a href="#guide3-7">7 Dose–response: individual vs population, U-shapes, threshold, cumulative dose</a>
<a href="#guide3-8">8 The three indices on one slide: therapeutic index, margin of safety, margin of exposure</a>
<a href="#guide3-l14-1">9 Potency from curve shape, the ED/TD/LD curves, and what each index tells you</a>
<a href="#guide3-l14-2">10 Target and mechanism of action: why side effects look unrelated</a>
<a href="#guide3-l14-3">11 The reading: Rodriguez-Mozaz and Weinberg, drugs in our water</a>
<a href="#guide3-l14-4">12 Toxic responses: undesired effects, general concepts</a>
<a href="#guide3-l14-5">13 Toxic endpoints: on-target and off-target</a>
<a href="#guide3-l14-6">14 Non-organ-specific endpoints: fibrosis, genotoxicity, cancer, teratogenesis</a>
<a href="#guide3-l15-1">15 Pulmonary toxicity: why the lungs are susceptible, where particles land, acute vs chronic</a>
<a href="#guide3-l15-2">16 Neurotoxicity: the blood–brain barrier, energy, myelin, neurotransmission, and the four patterns of injury</a>
<a href="#guide3-l15-3">17 Hepatotoxicity: why the liver is susceptible, and the kinds of liver injury</a>
<a href="#guide3-l15-4">18 Liver zones: the oxygen gradient and CYP2E1</a>
<a href="#guide3-l15-5">19 Nephrotoxicity: why the kidneys are susceptible, kinds of renal injury, NSAIDs and PPIs</a>
<a href="#guide3-l15-6">20 Idiosyncratic and immunologic responses, and her four Poll Everywhere questions</a>
<a href="#guide3-l15-7">21 Treating poisonings: how pharmacokinetics change in overdose</a>
<a href="#guide3-l15-8">22 How pharmacodynamics change in overdose</a>
<a href="#guide3-l15-9">23 Three angles, four toxicokinetic methods, and preventing absorption</a>
<a href="#guide3-l15-10">24 Evidence-based guidelines for overdoses</a>
<a href="#guide3-l16-1">25 Preventing absorption revisited; inhibiting bioactivation (methanol, ethylene glycol)</a>
<a href="#guide3-l16-2">26 Recognizing the poisoning: blood tests and toxidromes</a>
<a href="#guide3-l16-3">27 Enhance metabolism: give cofactors, not inducers (cyanide; acetaminophen and N-acetylcysteine)</a>
<a href="#guide3-l16-4">28 Enhance elimination: ion trapping with bicarbonate; extracorporeal methods</a>
<a href="#guide3-l16-5">29 Inactivation of poisons: chelators, antivenoms and antibodies</a>
<a href="#guide3-l16-6">30 Pharmacological treatment: antagonist, agonist, removal from the active site, bypass</a>
<a href="#guide3-l16-7">31 Out-of-hospital management of beta-blocker and calcium channel blocker overdose: the two AAPCC guidelines</a>
<a href="#guide3-l16-8">32 The poisoning treatment table: her key</a>
<a href="#guide3-l17-1">33 Why pharmacogenomics: inter-individual variation, primaquine, the timeline, twin studies</a>
<a href="#guide3-l17-2">34 Pharmacogenetics vs pharmacogenomics; impact, uses and limitations</a>
<a href="#guide3-l17-3">35 The four target areas; PK, PD and the two outcome buckets</a>
<a href="#guide3-l17-4">36 Wild type, variant, polymorphism, rare variant, SNP</a>
<a href="#guide3-l17-5">37 Allele, homozygosity, genotype, phenotype, functional significance</a>
<a href="#guide3-l17-6">38 Haplotype, allele and genotype frequency, Hardy-Weinberg equilibrium</a>
<a href="#guide3-l17-7">39 Pharmacogenomics on this exam: every term from the slides through ‘Frequencies’</a>
</nav>

<!-- ===================================================================== -->
<section class="guide" id="guide3-scope">
<h3>What Exam 3 tests, in her words</h3>
<p>Dr. Smith writes her exam from the objectives on each day's opening slide and from what she said in class. She grades the exam, the quizzes and the reading assignments; the Poll Everywhere questions are for discussion only.</p>
<ul>
<li>"Remember, go back and study to these objectives, at least. If you can answer these objective questions, you should pass my exam." <small>(T) 10/9</small></li>
<li>Format, in her words of 10/22: 54 questions in 2 hours; multiple choice and select-all (no partial credit on select-all), 2 true/false, 2 short answer (graded with partial credit). No going back to an earlier question once it is answered. <small>her words 10/22; (T) 10/9</small></li>
<li>On the readings: questions come from what was read and discussed in class, "if I talked about it and we really were exploring it, that would be the kind of thing I would ask about a reading that we did." <small>(T) 10/9</small></li>
<li>Difficulty: "The questions on the quizzes that you're having are a little more detailed ... questions on your exam, because you've had a chance to study more, will be. Some of them will be much more detailed ... Quiz questions are trying to get you a little more in depth in your knowledge, and your exam questions could likely be harder" <small>(T) 10/14</small></li>
<li>10/19, her opening rule: "Everything that we've talked about in class ... everything on slides, everything that's come out of my mouth, the things you've read, and we've talked about all that is testable." <small>(T) 10/19</small></li>
<li>10/19, scope: "The material for the exam is today and tomorrow." On 10/20 the class voted to keep that day's pharmacogenomics lecture on this exam. <small>(T) 10/19, 10/20</small></li>
<li>10/19, the table: "The heaviest part of that will be this poisoning table." "please memorize this table ... know the chelating agent and know what metal it grabs." <small>(T) 10/19</small></li>
</ul>
<table class="reftab"><thead><tr><th>Level</th><th>Her words</th><th>Graded?</th></tr></thead><tbody>
<tr><td>Poll Everywhere</td><td>"very easy"; "way easy"; "just to generate discussion"</td><td>No: for discussion only</td></tr>
<tr><td>Quizzes (after each lecture)</td><td>"a little more detailed"; "trying to get you a little more in depth"</td><td>Yes</td></tr>
<tr><td>Exam</td><td>"Some of them will be much more detailed"; "could likely be harder"</td><td>Yes: 54 questions, 21% of the course grade</td></tr>
</tbody></table>
<table class="reftab"><thead><tr><th>On the exam</th><th>Not on the exam</th></tr></thead><tbody>
<tr><td>The objective questions on the opening slide (definitions; the five principles; source, exposure, ADMET, dose, dose–response)</td><td>Dates and hard numbers from the reading: she asks what was discussed, not figures from the article</td></tr>
<tr><td>The reading's five principles as discussed in class (discussed 10/13; section 11)</td><td>The 2-AAF hamster figure as a graph to read: "I will not give you a graph like that I never have." <small>(T) 10/9</small></td></tr>
<tr><td>The acetaminophen bioactivation scheme ("I love this example")</td><td>The probit panel of the population figure: "it's changing the units on the graph on the y and the x axis to what we call probate [probit] units. Nobody ever uses this." <small>(T) 10/9</small></td></tr>
</tbody></table>
<p class="sub">Sources: (T) 10/9, (T) 10/14, (T) 10/19, (T) 10/20; her exam format as she stated it on 10/22; syllabus (Exam III, Fri Oct 23).</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-1">
<h3>1. Definitions: poison, toxin, toxicant, xenobiotic</h3>
<p>Toxicology is the study of poisons, and four words name something noxious. "Poison" is the general word for anything harmful. "Toxin" and "toxicant" divide harmful substances by who made them: a living organism or human activity. "Xenobiotic" names any compound that does not belong in the organism, harmful or not. She asks for the one correct word for a described substance, so the deciding question is where the substance came from.</p>
<table class="reftab"><thead><tr><th>Term</th><th>What decides it</th><th>Her examples</th></tr></thead><tbody>
<tr><td><b>Poison</b></td><td>Anything that can cause a bad response; the layman's term</td><td>The class word cloud: food, hormones, pollution, drugs, rat poison, venom, alcohol</td></tr>
<tr><td><b>Toxin</b></td><td>Made by a biological system</td><td>Snake venom (the coral snake's neurotoxin)</td></tr>
<tr><td><b>Toxicant</b></td><td>Made by people, through human activity</td><td>Whatever is harmful in a smokestack emission</td></tr>
<tr><td><b>Xenobiotic</b></td><td>Any compound in an organism that the organism does not normally make or is not expected to contain</td><td>A poison, a toxin, a toxicant, a food additive or a medication can each be one</td></tr>
</tbody></table>
<h4>Why</h4>
<ul>
<li>Snake venom is a toxin because an animal makes it. Calling it poisonous is not wrong in everyday speech, but "toxin" is the precise word.</li>
<li>A smokestack emission is a toxicant because human activity produces it. Whether the plume is harmful at all is unknown until someone samples it: "It could just be steam."</li>
<li>Xenobiotic is defined by being foreign to the organism, not by being harmful, so it overlaps every other term and includes medications.</li>
<li>Medications belong on the list of toxic things because "the dose makes the poison" (section 6).</li>
<li>For a venomous animal, identifying the animal decides whether there is a toxin at all. The coral snake ("Red and yellow kills a fellow"; red bands touch yellow) is very venomous, with a neurotoxin. The king snake has the same colors but its red touches black ("Red and black, friend of Jack"), and it is not poisonous: "People have them as pets."</li>
<li>The other organisms she named also make their own poisons, so by her definition they are sources of toxins: oleander (the leaves, flowers and roots are poisonous), the pitohui (a bird that secretes a poison from its skin), the slow loris (a gland under its arms), and the male platypus (a spike on the back legs in the breeding season).</li>
</ul>
<h4>Her words</h4>
<ul>
<li>"toxins are substances coming from biological systems, so. Snake venom is a toxin, OK? You could say it's poisonous, but technically it's a toxin" <small>(T) 10/9</small></li>
<li>"A toxicant is made by man through our activities." <small>(T) 10/9</small></li>
<li>"It's a tiny little detail that I just wanted to point out, there's a difference between those two words. I will often not use those words properly" <small>(T) 10/9</small></li>
</ul>
<h4>Traps</h4>
<ul>
<li>"Snake venom is a toxicant": wrong. An animal makes venom, so it is a toxin; a toxicant comes from human activity.</li>
<li>"A xenobiotic is by definition toxic": wrong. It only has to be foreign to the organism; a food additive or a medication qualifies.</li>
<li>"Medications are not poisons": wrong. At a high enough dose a medication is toxic.</li>
<li>Her loose use of the words in lecture does not make them interchangeable on the exam: she pointed out the difference on purpose.</li>
</ul>
<p>How she asks it: a pair of substances (a venom and an emission) and the word that fits each, or the one word for any foreign compound.</p>
<p class="sub">Sources: Tox slides ‘Definitions’, ‘What is Toxic?’; (T) 10/9. Questions L13-001, L13-002, L13-047, L13-048.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-2">
<h3>2. The five principles of toxicology</h3>
<p>Toxicologists look at any harmful exposure through five principles. Each one is a question, and the five questions follow the substance from where it starts to the damage it does. Her lecture deck, the reading's discussion guide and her key for the reading are all organized by these five, and her Practice Quiz 1 asked for the list as a short answer.</p>
<table class="reftab"><thead><tr><th>Principle</th><th>The question it asks</th><th>Example from her lectures</th></tr></thead><tbody>
<tr><td><b>1. Source</b></td><td>Where does the noxious substance come from?</td><td>Environmental, occupational, critter bites and stings, medications</td></tr>
<tr><td><b>2. Exposure</b></td><td>How is the person or animal exposed? (route, duration, single vs repeated, frequency)</td><td>One benzene exposure gives a headache; daily low-dose exposure gives leukemia</td></tr>
<tr><td><b>3. ADMET</b></td><td>What does the body do with it? Absorption, distribution, metabolism, excretion, and toxicity</td><td>Acetaminophen bioactivated to NAPQI</td></tr>
<tr><td><b>4. Dose</b></td><td>Is the amount high enough to cause a problem?</td><td>LD50 values from ethyl alcohol to botulinum toxin</td></tr>
<tr><td><b>5. Target and mechanism of action</b></td><td>Where in the body does it act, and how does it cause harm?</td><td>The toxic target may differ from the therapeutic target</td></tr>
</tbody></table>
<h4>Why</h4>
<ul>
<li>The order follows the substance. It has to come from a source, then reach the body by some exposure; ADMET then decides how much reaches each tissue and whether metabolism makes it more or less harmful; the dose decides whether that amount is enough to cause harm; target and mechanism say where and how the harm happens.</li>
<li>The principles depend on each other. The route (exposure) decides whether a drug passes through the liver first (metabolism), and the dose that reaches a target decides whether the target is harmed.</li>
<li>The T is added to ADME in a toxicology course because the module is about toxicity: the same absorption, distribution, metabolism and excretion now matter for how they produce or prevent harm.</li>
<li>The fifth principle is the same idea as a drug's mechanism of action, but for harm, and the toxic target is not always the therapeutic one. That is why her Practice Quiz 1 marks "The mechanisms of a drug's toxicity is always the same as the mechanism of its efficacy" False.</li>
</ul>
<h4>Her words</h4>
<ul>
<li>"Toxicologists think of these five principles." <small>(T) 10/9</small></li>
<li>"How does it cause harm in the body? Where is it going in the body to cause harm?" <small>(T) 10/9</small></li>
<li>"sometimes the target of something toxic is not the same target as its therapeutic target" <small>(T) 10/9</small></li>
</ul>
<h4>Traps</h4>
<ul>
<li>Route, duration, single vs repeated, and frequency are parts of the exposure principle, not separate principles.</li>
<li>ADME in her Practice Quiz 1 key is Absorption, Distribution, Metabolism, Excretion. She once said "elimination" aloud while expanding it; the key's word is excretion. The T is toxicity.</li>
<li>Her key lists the five as: 1. Source 2. Exposure 3. ADMET 4. Dose 5. Target and Mechanism of Action. "Target" alone, or "mechanism" alone, is half of the fifth principle.</li>
</ul>
<p>How she asks it: list the five principles (short answer); expand ADME; true or false on a principle stated as "always".</p>
<p class="sub">Sources: Tox slide ‘5 Principles of Toxicology’; Practice Quiz 1 Q4, Q5, Q10 and her key. Questions L13-003, L13-004, L13-005, L13-040, L13-041, L13-046.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-3">
<h3>3. Source: where the exposure comes from</h3>
<p>The first principle asks where a noxious substance comes from. Toxicologists sort sources into four categories. The category is set by the setting in which a person meets the substance, so the same chemical can belong to different categories for different people. Pharmacists deal mostly with medications, but a healthcare worker also has occupational exposures.</p>
<table class="reftab"><thead><tr><th>Category</th><th>What it covers</th><th>Her examples</th></tr></thead><tbody>
<tr><td><b>Environmental</b></td><td>Contaminants and pollution in the places people live and move through</td><td>Diesel fumes from a bus downtown; living on ground built on a landfill where dust blows</td></tr>
<tr><td><b>Occupational</b></td><td>Workplace exposures</td><td>A factory's stacks; a benzene leak; in healthcare, chemotherapy mixed in an incorrect hood with the wrong airflow, radiation, and an ER patient splattered with an organophosphate</td></tr>
<tr><td><b>Critter bites and stings</b></td><td>Venoms</td><td>Snakes, spiders, the platypus spur</td></tr>
<tr><td><b>Medications</b></td><td>Drugs, the source in healthcare</td><td>Drug overdoses and adverse drug effects</td></tr>
</tbody></table>
<h4>Why</h4>
<ul>
<li>A chemotherapy drug is a medication for the patient, but for the pharmacist who mixes it in a hood with the wrong airflow it is an occupational exposure, because the exposure happens at work.</li>
<li>ER staff caring for a patient covered in an organophosphate face an occupational exposure for the same reason: the contact happens on the job.</li>
<li>Venoms are hard to attribute because they are complex mixtures: "you don't always know what chemicals in the poison are causing all the pain and swelling and death".</li>
<li>Pathogens are outside the course, so a needle stick is not used as a source example here.</li>
<li>The same principle organizes the reading on drugs in water: there the sources are human waste, flushed or improperly discarded medications, livestock, and treatment plants that do not remove all the drugs (section 11).</li>
</ul>
<h4>Her words</h4>
<ul>
<li>"we, as toxicologists think about things that are poisonous as either being from environmental exposures. Occupational exposures, critter bites and stings, or in the world of healthcare, we think about medications" <small>(T) 10/9</small></li>
<li>"Remember, in this course we're not usually thinking about exposure to pathogens like needle sticks" <small>(T) 10/9</small></li>
</ul>
<h4>Traps</h4>
<ul>
<li>The pharmacist in the wrong hood is an occupational exposure, not a "medication" source: the category follows where the exposure happens.</li>
<li>A needle stick is a pathogen exposure, which this course does not treat as a toxicology source.</li>
<li>Healthcare workers are not free of occupational exposure: she listed chemotherapy, radiation and contaminated patients.</li>
</ul>
<p>How she asks it: a scenario (a pharmacist in the wrong hood) and the source category it belongs to.</p>
<p class="sub">Sources: Tox slide ‘Source’; (T) 10/9. Question L13-006.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-4">
<h3>4. Exposure: route, formulation, duration, single vs repeated, frequency</h3>
<p>The second principle asks how a person or animal is exposed. Four factors change the toxic response to the same substance: the route, how long the exposure lasts, whether it happens once or repeatedly, and, for repeated exposures, how often. For medications, the vehicle and formulation also change what happens after a large ingestion, which is why they come up again when overdoses are treated.</p>
<h4>Route</h4>
<table class="reftab"><thead><tr><th>Ranking</th><th>Order</th><th>Source</th></tr></thead><tbody>
<tr><td>How often people are exposed by the route</td><td>Oral, then inhalation, then topical, then parenteral</td><td>(T) 10/9</td></tr>
<tr><td>How effectively the route delivers a toxic agent</td><td>Intravenous, then inhalation, then oral, then dermal</td><td>Tox slide ‘Exposure: Route’</td></tr>
</tbody></table>
<ul>
<li>In healthcare, parenteral exposure is much more common than in an occupational setting: medications given by IV or injection, and drug abuse.</li>
<li>The route can reduce or enhance toxicity. Her example: a compound that the liver metabolizes to something less toxic, given at equal doses orally or by IV.</li>
<li>Vehicle: an oily vehicle versus an aqueous vehicle for the same drug can change its toxicity when it is given inappropriately.</li>
<li>Formulation: a handful of immediate-release versus extended-release beta blockers or calcium channel blockers.</li>
</ul>
<h4>Duration (the animal-study definitions)</h4>
<table class="reftab"><thead><tr><th>Term</th><th>Length of exposure</th></tr></thead><tbody>
<tr><td>Acute</td><td>Less than 24 hours</td></tr>
<tr><td>Subacute</td><td>Less than 1 month</td></tr>
<tr><td>Subchronic</td><td>1 to 3 months</td></tr>
<tr><td>Chronic</td><td>More than 3 months, up to years</td></tr>
</tbody></table>
<h4>Single vs repeated (the three points on the slide)</h4>
<table class="reftab"><thead><tr><th>Point</th><th>Her example</th></tr></thead><tbody>
<tr><td>The effect of a single exposure may differ from the effect of repeated exposure</td><td>Benzene: one walk into a leaking workplace gives a headache and sleepiness; chronic low-dose exposure causes leukemia (benzene is a carcinogen)</td></tr>
<tr><td>A fast-absorbing compound is likely to produce an immediate effect, but may also produce a delayed one</td><td>Diethylstilbestrol (DES), a strong estrogen given in the 1950s to women at risk of miscarriage: the mothers had some nausea; about 20 years later their daughters, exposed in utero, developed a particular vaginal cancer in their twenties</td></tr>
<tr><td>Chronic exposure may produce an immediate effect after each exposure</td><td>The benzene leak that is never fixed: the worker is sleepy with a headache every time they walk in, and develops no tolerance</td></tr>
</tbody></table>
<h4>Frequency and half-life (Casarett and Doull Figure 2-4)</h4>
<table class="reftab"><thead><tr><th>Compound</th><th>Single large dose</th><th>Repeated doses, each 1/4 of the single dose</th></tr></thead><tbody>
<tr><td>A</td><td>Longest half-life: stays in the blood the longest</td><td>Reaches the toxic zone (blood concentration above 2) by the 3rd dose</td></tr>
<tr><td>B</td><td>In between</td><td>Toxic zone at about the 4th dose, certainly by the 5th</td></tr>
<tr><td>C</td><td>Shortest half-life: cleared quickly</td><td>Never reaches the toxic zone</td></tr>
</tbody></table>
<h4>Why</h4>
<ul>
<li><b>Two route rankings.</b> Oral exposure is the most common, but IV is the most effective route for delivering a toxic agent. A question about frequency and a question about effectiveness have different answers.</li>
<li><b>First pass.</b> An oral dose goes to the liver before it reaches the rest of the body; an IV dose does not. So if the liver turns the compound into something less toxic, equal doses make the oral route the less dangerous one. The route changes toxicity because it changes metabolism.</li>
<li><b>Immediate vs extended release.</b> A handful of immediate-release tablets is absorbed quickly. Extended-release tablets can clump together in the stomach and then release the drug all at once. Which handful is worse therefore depends on the formulation and the timing, and the formulation changes how the patient is treated.</li>
<li><b>Duration in humans.</b> In animal studies the duration is set by the design. People often do not know they are being exposed, or for how long (a funny smell at work that started days or months ago), yet toxicologists still sort human exposures by the same four categories to relate the response to the duration.</li>
<li><b>Single vs repeated.</b> A small exposure that causes only sleepiness once can, repeated daily for years, cause cancer, so a single-exposure result cannot be extended to chronic exposure. And a fast effect does not rule out a late one: DES showed its worst effect a generation later.</li>
<li><b>Frequency.</b> Each repeated dose in Figure 2-4 is 1/4 of the single dose, so four doses add up to the single dose. When the next dose arrives before the last one is cleared, the concentration climbs with each dose. A, with the longest half-life, climbs fastest; C is cleared between doses, so it never builds up. For a medication, the dosing interval is stretched until the drug behaves like C: high enough for effect, below the toxic concentration.</li>
<li><b>C can still cause harm.</b> Staying below the toxic blood concentration protects only against the effect on that graph. A patient can be allergic to C (a small amount is enough), C can reach a different target site, C can synergize with other drugs to give additive adverse effects, and an injection (subcutaneous or intradermal) can damage the injection site. None of these depends on half-life, which is why her Practice Quiz 1 marks "A compound with a half-life that allows it to be cleared from the body before the next exposure may still result in chronic adverse effects" True.</li>
</ul>
<h4>Her words</h4>
<ul>
<li>"which do you think is worse? It depends, you're gonna hate this answer I give a lot, it depends" <small>(T) 10/9</small></li>
<li>"chronic exposure may produce immediate effects after each exposure" <small>(T) 10/9</small></li>
<li>"this is where half-life is so important ... we'd have to figure out how do you stretch out these dosing frequencies so that you end up with something like C here" <small>(T) 10/9</small></li>
</ul>
<h4>Traps</h4>
<ul>
<li>"Oral is the most effective route": wrong. Oral is the most common; IV is the most effective.</li>
<li>"Extended release is always the safer handful": wrong. The tablets can clump and release suddenly; "it depends".</li>
<li>"Subacute is 1 to 3 months": wrong. Subacute is less than 1 month; 1 to 3 months is subchronic. Chronic is more than 3 months (her Practice Quiz 1 key).</li>
<li>"A compound cleared before the next dose cannot cause chronic adverse effects": False on her quiz (allergy, another target, synergy, injection-site damage).</li>
<li>"With chronic exposure the body adapts, so there is no immediate effect each time": wrong. Her 10/14 poll statement "It is possible to have immediate effects with each dose in a chronic exposure scenario" is true.</li>
<li>"A fast-absorbing compound gives only immediate effects": wrong. It may also produce a delayed effect (DES).</li>
</ul>
<p>How she asks it: rank the routes (by frequency or by effectiveness); the duration that defines chronic; which compound in Figure 2-4 has the longest half-life or never becomes toxic; why a quickly cleared compound can still harm; true or false on single vs repeated exposure.</p>
<p class="sub">Sources: Tox slides ‘Exposure: Route’, ‘Exposure: Duration’, ‘Single vs. Repeated’, ‘Exposure: Frequency’ (Casarett and Doull Figures 2-3, 2-4); (T) 10/9; her 10/14 poll; Practice Quiz 1 Q1, Q2. Questions L13-007 to L13-016, L13-049, L13-037, L13-038.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-5">
<h3>5. ADMET: bioactivation, detoxification and acetaminophen</h3>
<p>Everything absorbed into the body is distributed, usually metabolized, and excreted. In toxicology the step that gets the most attention is metabolism, because metabolism can turn a compound into something more harmful than what the person was exposed to. Acetaminophen is her example: at the usual dose it is detoxified, but the same drug can be bioactivated to a liver toxin, sometimes even at a dose within the labeled limit.</p>
<table class="reftab"><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody>
<tr><td><b>Bioactivation</b> (also toxication, metabolic activation)</td><td>Metabolism that makes something more noxious than the original compound</td></tr>
<tr><td><b>Detoxification</b></td><td>Metabolism to something less harmful and easier to eliminate</td></tr>
</tbody></table>
<table class="reftab"><thead><tr><th>Acetaminophen pathway</th><th>Enzymes</th><th>Product</th><th>Label</th></tr></thead><tbody>
<tr><td>The usual daily dose</td><td>Phase 2: the glucuronosyltransferases and the sulfotransferases</td><td>A glucuronide or a sulfate</td><td>Detoxification (normal metabolism)</td></tr>
<tr><td>The part the phase 2 enzymes cannot handle</td><td>Phase 1: cytochrome P450 2E1 (CYP2E1)</td><td>NAPQI, toxic to the liver</td><td>Bioactivation</td></tr>
<tr><td>NAPQI conjugated with glutathione (slide)</td><td>Glutathione S-transferases</td><td>A glutathione conjugate</td><td>Detoxification</td></tr>
</tbody></table>
<ul>
<li>The daily ceiling: 4 g in 24 hours, on the FDA labeling.</li>
</ul>
<h4>Why</h4>
<ul>
<li><b>Overflow.</b> The phase 2 enzymes handle the usual dose. When the dose is more than they can handle, the rest goes down the CYP2E1 pathway and becomes NAPQI. So an overdose damages the liver through a metabolite, not through the parent drug.</li>
<li><b>Injury at or below 4 g, reason 1: weak phase 2 enzymes.</b> A person with a genetic variation that lowers glucuronosyltransferase or sulfotransferase activity cannot conjugate the whole dose, so part of a normal dose is pushed through CYP2E1 and makes NAPQI. She advises older parents not to take 4 g in 24 hours because their phase 2 enzymes may be fewer.</li>
<li><b>Injury at or below 4 g, reason 2: induced CYP2E1.</b> Induction means the body makes more of an enzyme. Alcohol induces CYP2E1, so with more CYP2E1 a normal dose makes more NAPQI. Her husband's weekend: three days of baseball with beers each evening (induction), then 500 mg Tylenol tablets on Sunday taken and forgotten until he neared 4 g.</li>
<li><b>Both together.</b> Induced CYP2E1 plus low-activity phase 2 enzymes "could really set up a person for liver toxicity by just taking the allowed dose of acetaminophen". Genetic variation in the enzymes is a pharmacogenomics topic, which comes later in her lectures.</li>
</ul>
<h4>Her words</h4>
<ul>
<li>"I use the word bioactivation to talk about when metabolism occurs to create something that's more noxious than what you were originally exposed to." <small>(T) 10/9</small></li>
<li>"if those phase 2 enzymes cannot take care of the acetaminophen dose? What pathway does it go down? Yeah, it goes down through our P450s" (she named CYP2E1) <small>(T) 10/9</small></li>
<li>"So it's a real scenario. That somebody could easily harm themselves by just doing their normal thing" <small>(T) 10/9</small></li>
</ul>
<h4>Traps</h4>
<ul>
<li>"GSTs" in her speech means the glucuronosyltransferases (she calls the sulfotransferases "STs"). The glutathione S-transferases on the slide are a different family, which conjugates NAPQI with glutathione.</li>
<li>CYP2E1 is a phase 1 enzyme. The two enzyme families that handle the usual dose are phase 2.</li>
<li>"Staying at or under 4 g a day always protects the liver": wrong. Low-activity phase 2 enzymes or induced CYP2E1 can produce NAPQI at the allowed dose.</li>
<li>Alcohol works by induction (more CYP2E1 made), not by lowering the phase 2 enzymes; the low phase 2 activity is the genetic reason. They are two separate reasons that can add together.</li>
<li>Bioactivation makes the product more harmful; detoxification makes it less harmful. The conversion of acetaminophen to NAPQI is bioactivation.</li>
</ul>
<p>How she asks it: the enzyme that makes NAPQI; the two phase 2 families; the daily ceiling; why a patient under the ceiling still gets liver injury.</p>
<p class="sub">Sources: Tox slides ‘ADME’, ‘ADME: Metabolism’, ‘Example of Bioactivation’; (T) 10/9. Questions L13-017 to L13-020.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-6">
<h3>6. Dose: the dose makes the poison, LD50</h3>
<p>"The dose makes the poison" (attributed to Paracelsus) means any substance can harm at a high enough dose, which is why medications are poisons too. The second half of the idea is that the harmful dose differs enormously from one compound to another. The LD50 is how toxicologists compare compounds on that scale.</p>
<table class="reftab"><thead><tr><th>Term or value</th><th>Meaning</th></tr></thead><tbody>
<tr><td><b>LD50</b></td><td>The lethal dose that kills 50% of the animals given the compound; the table's values come from animal exposure studies in rats</td></tr>
<tr><td>Ethyl alcohol</td><td>LD50 10,000 mg/kg in rats (the top of the table)</td></tr>
<tr><td>Botulinum toxin</td><td>LD50 0.00001 mg/kg in rats (the bottom of the table)</td></tr>
</tbody></table>
<h4>Why</h4>
<ul>
<li>A smaller LD50 means a smaller dose kills half the animals, so the compound is more lethal. Ethyl alcohol's LD50 is 10,000 mg/kg and botulinum toxin's is 0.00001 mg/kg: the two differ by a factor of a billion. So the dose alone does not say whether something is dangerous; the compound has to be known too.</li>
<li>A large LD50 is not the same as safe: alcohol poisoning still kills "at the right dose".</li>
<li><b>The squirting can.</b> The botulinum bacteria do not need oxygen, so they can grow sealed inside a can of a low-acid vegetable (beans, peas, corn; tomatoes are usually fine). As they multiply they make the toxin and build up pressure, so the can squirts when opened. What kills is the toxin the bacteria make, not the bacteria, and in her words cooking does not break the toxin down. So a can that squirts is thrown away, not cooked.</li>
<li>Botulinum toxin is a toxin in the sense of section 1: a living organism makes it.</li>
</ul>
<h4>Her words</h4>
<ul>
<li>"So the dose makes the poison, but you have to know what compound you're talking about too." <small>(T) 10/9</small></li>
<li>"it's not the bacteria that, that kills you, it's the botulinum toxin" <small>(T) 10/9</small></li>
<li>"If the can squirts, throw it away, don't cook with it, cause you can't heat it, cook it, and break down that botulinum toxin" <small>(T) 10/9</small></li>
</ul>
<h4>Traps</h4>
<ul>
<li>"A higher LD50 means a more toxic compound": wrong. A higher LD50 means more compound is needed to kill half the animals, so it is less acutely lethal.</li>
<li>"LD50 is half the lethal dose": wrong. It is the dose that kills 50% of the animals.</li>
<li>"Cooking makes a squirting can safe": wrong in her lecture; the toxin is not broken down by cooking.</li>
<li>"Botulinum needs oxygen to grow": wrong. She said "It's an aerobic bacteria" and in the same sentence "it doesn't need oxygen"; the second is the fact, and it is why the bacteria grow inside a sealed can.</li>
</ul>
<p>How she asks it: who said "the dose makes the poison"; what the LD50 means; which of two LD50 values is more toxic; why a squirting can is discarded.</p>
<p class="sub">Sources: Tox slide ‘Dose’ (Casarett &amp; Doull Table 2-1); (T) 10/9. Questions L13-021 to L13-024.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-7">
<h3>7. Dose–response: individual vs population, U-shapes, threshold, cumulative dose</h3>
<p>Dose–response data are how toxicologists learn what dose is harmful. The way the data are graphed decides what can be read from them: an individual curve shows how each animal's response rises with its dose, and a population curve shows how many animals respond at each dose. The shape of the curve then says whether there is a safe range, a needed range, or no safe dose at all, and a long study can show the threshold moving as the dose accumulates.</p>
<h4>Two ways to present dose–response data</h4>
<table class="reftab"><thead><tr><th></th><th>Individual dose–response (Figure 2-5)</th><th>Population dose–response (Figure 2-6)</th></tr></thead><tbody>
<tr><td>What it describes</td><td>The response of an individual to varying doses</td><td>The response of a population to varying doses</td></tr>
<tr><td>Her example</td><td>Rodents in dose groups (0, 2.5, 5 mg/kg and up) given an organophosphate; percent inhibition of carboxylesterase and of cholinesterase plotted against dose</td><td>Mortality frequency and cumulative mortality against dose</td></tr>
<tr><td>What you get from it</td><td>Many chemicals have more than one effect because they have multiple targets (here, two enzymes inhibited)</td><td>The LD50 (about 100 mg/kg on her figure) and the threshold dose (the lowest dose with a response, about 10 mg/kg)</td></tr>
</tbody></table>
<h4>Two U-shaped curves</h4>
<table class="reftab"><thead><tr><th></th><th>Essential substance</th><th>Hormesis</th></tr></thead><tbody>
<tr><td>Her example</td><td>Iron</td><td>Red wine</td></tr>
<tr><td>Low dose</td><td>Deficiency: the blood cannot carry oxygen, and the adverse response can be death</td><td>No dose: no benefit</td></tr>
<tr><td>Middle</td><td>The region of homeostasis: enough iron</td><td>A glass or a glass and a half may be protective</td></tr>
<tr><td>High dose</td><td>Iron overdose, which can kill</td><td>An adverse effect (tipsy; should not drive)</td></tr>
<tr><td>Region of homeostasis?</td><td>Yes</td><td>No, because the substance is not essential</td></tr>
</tbody></table>
<h4>Threshold vs linear</h4>
<ul>
<li>Sigmoid curve with a threshold: below some dose there is no effect, therapeutic or poisonous. Probably true for medications and most poisons.</li>
<li>Linear, no threshold: from zero dose, the first molecule could cause a problem. The theory for carcinogens: one molecule could damage DNA and start a cancer.</li>
</ul>
<h4>Cumulative dose: 2-AAF</h4>
<ul>
<li>Animals in dose groups were fed 2-acetylaminofluorene (2-AAF) daily, which causes liver and bladder tumors; one set was sacrificed at 24 months and another at 33 months. She calls the animals hamsters; the textbook chapter says mice.</li>
<li>Bladder tumors: threshold about 75 ppm at 24 months, about 45 ppm at 33 months.</li>
<li>Liver tumors: at 24 months even the lowest dose group had some; at 33 months the zero-dose animals had them too.</li>
</ul>
<h4>Why</h4>
<ul>
<li><b>Individual curves reveal multiple targets</b> because each response (each enzyme) is measured and plotted separately against dose. A single population yes-or-no outcome would not show that one chemical hits two enzymes.</li>
<li><b>Population curves give the LD50 and the threshold</b> because they group the responses: the cumulative curve crosses 50% at the LD50, and the lowest dose with any response marks the threshold.</li>
<li><b>Same U, different reasons.</b> The two U-curves look alike. For iron, too little is harmful because the body needs it, so there is a middle region of homeostasis. For red wine, the low dose is not a deficiency of anything needed; the benefit is a hormetic effect of a non-essential substance, so there is no homeostasis region.</li>
<li><b>No assumed safe dose.</b> The linear model was long thought to describe carcinogens, so a substance is not assumed to have a harmless dose range; the claim that the tiniest dose may have an effect is qualified with "possibly".</li>
<li><b>Why the bladder threshold fell.</b> Each group was dosed every day, so animals kept to 33 months received a higher total (cumulative) dose than at 24 months. A lower daily dose was enough to reach the tumor-causing total, so the threshold dose went down.</li>
<li><b>Why zero-dose animals had liver tumors.</b> The study was not mixed up: cancer is usually a disease of the aged, and these animals at 33 months were old and get liver tumors anyway. So this species is a poor choice for testing whether a compound causes liver tumors; the "anomaly" is information about the animal's background physiology.</li>
</ul>
<h4>Her words</h4>
<ul>
<li>"many chemicals have more than one effect because they have multiple targets. ... And we could not see this if we weren't graphing it as an individual dose response curve" <small>(T) 10/9</small></li>
<li>"Why did the threshold go down? There you go, use the keyword cumulative. So the cumulative dose that these animals got was higher at 33 months, right, compared to 24 months." <small>(T) 10/9</small></li>
<li>"maybe hamsters aren't the best animal for that end point" <small>(T) 10/13</small></li>
</ul>
<h4>Traps</h4>
<ul>
<li>The two U-shaped curves are not the same: only the essential substance has a region of homeostasis.</li>
<li>"Every compound has a dose with no effect": not assumed. The linear, no-threshold model (carcinogens) allows an effect from the first molecule.</li>
<li>The threshold at 33 months is lower, not higher, because the cumulative dose is higher.</li>
<li>Liver tumors in the zero-dose group do not mean the study was mixed up; old animals of this species get them anyway.</li>
<li>She will not ask you to read the 2-AAF graph itself ("I will not give you a graph like that"), and she does not use the probit panel of Figure 2-6 ("Nobody ever uses this"). The ideas behind the graph are testable.</li>
</ul>
<p>How she asks it: what an individual curve shows that a population curve does not; what you read off a population curve; essential substance vs hormesis; threshold vs linear; why the threshold falls with longer dosing.</p>
<p class="sub">Sources: Tox slides ‘First Dose-Response Relationship’, ‘Second Dose-Response Relationship’, ‘Shape of Dose-Response’, ‘Threshold Dose’, ‘More on Threshold Dose’ (Casarett and Doull Figures 2-5, 2-6 and others); Casarett and Doull Ch. 2 (reading card); (T) 10/9, (T) 10/13. Questions L13-025 to L13-031.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-8">
<h3>8. The three indices on one slide: therapeutic index, margin of safety, margin of exposure</h3>
<p>Three numbers are calculated from dose–response curves. Each is a ratio of a dose that harms (or the highest dose with no observed harm) to a dose that helps (or the dose people actually receive), so a larger number means more room before harm. The slide's formulas, and which kind of exposure each is for:</p>
<table class="reftab"><thead><tr><th>Index</th><th>Formula</th><th>For</th><th>Slope information</th></tr></thead><tbody>
<tr><td><b>Therapeutic index (TI)</b></td><td>Toxic dose / therapeutic dose (usually TD50 / ED50)</td><td>Single doses</td><td>None</td></tr>
<tr><td><b>Margin of safety (MOS)</b></td><td>TD1 / ED99</td><td>Single doses</td><td>Yes</td></tr>
<tr><td><b>Margin of exposure (MOE)</b></td><td>NOAEL / exposure</td><td>Repeated exposures to non-therapeutic compounds</td><td>—</td></tr>
</tbody></table>
<ul>
<li>NOAEL: the no observed adverse effect level, the highest dose in the animal studies at which no adverse effect was observed.</li>
<li>Trap: her Practice Quiz 1 asked which value has the formula "X = Toxic Dose/Therapeutic Dose"; the answer is the therapeutic index, not the margin of safety.</li>
</ul>
<p class="sub">Sources: Tox slide ‘Values Developed from Dose-Response’; Practice Quiz 1 Q3; (T) 10/13. Questions L13-032 to L13-036, L13-039.</p>
</section>

<!-- ===== Day 14 (10/13) ===== -->
<!-- ===================================================================== -->
<section class="guide" id="guide3-l14-1">
<h3>9. Potency from curve shape, the ED/TD/LD curves, and what each index tells you</h3>
<p>Dose–response curves are used to compare compounds and to compare the different effects of one compound. The last dose slides of the Principles deck cover three comparisons: which compound is more potent (and when the answer changes with dose), why the effective, toxic and lethal curves of one drug are not parallel, and what each of the three indices adds. Her rule for all of them: the value of these numbers is the comparison between compounds.</p>
<h4>Potency</h4>
<table class="reftab"><thead><tr><th>Pair</th><th>What the curves do</th><th>Answer</th></tr></thead><tbody>
<tr><td>A vs B</td><td>A gives the measured response at a lower dose than B</td><td>A is more potent</td></tr>
<tr><td>C vs D</td><td>C responds at lower doses, then levels off; D keeps rising and crosses C</td><td>C is more potent at low doses; past the crossing, D is more potent. Neither is "always" more potent</td></tr>
</tbody></table>
<h4>Effective, toxic and lethal curves of one compound</h4>
<ul>
<li>As the dose rises, the effective (therapeutic) dose comes first, then the toxic dose, then the lethal dose. The three curves are not parallel.</li>
</ul>
<h4>The three indices, explained</h4>
<table class="reftab"><thead><tr><th>Index</th><th>Formula</th><th>What it compares</th><th>Used for</th></tr></thead><tbody>
<tr><td>Therapeutic index</td><td>TD50 / ED50 (any percentage, as long as numerator and denominator use the same one)</td><td>One point on each curve</td><td>Medications; how much error the dosing can tolerate</td></tr>
<tr><td>Margin of safety</td><td>TD1 / ED99</td><td>The low end of the toxic curve against the high end of the effective curve, so the slope shows</td><td>Medications (single doses)</td></tr>
<tr><td>Margin of exposure</td><td>NOAEL / exposure</td><td>The highest dose without an observed adverse effect in animal studies against the total exposure a human (or a wild animal) is estimated to receive</td><td>Non-therapeutic compounds with repeated exposure: a pollutant, an occupational exposure</td></tr>
</tbody></table>
<h4>Why</h4>
<ul>
<li><b>Why C levels off</b> (the answers she accepted, all of which could be true): the receptors C binds are saturated; C may hit the shared receptor in a different way that saturates while D's does not; the metabolism that turns C into its active form saturates; an uptake transporter such as P-glycoprotein in the gut saturates; C could be a partial agonist; a rising dose changes the pH in the stomach. Target, tissue, metabolism, distribution and absorption can each change potency with dose, which is what makes "Which is more potent, C or D?" a trick question.</li>
<li><b>Why the dose range matters.</b> If the study had stopped before the curves crossed, nobody would see that the potency changes places. So a study needs a wide range of doses.</li>
<li><b>Why the ED, TD and LD curves are not parallel.</b> ADME differences are one reason, but the more important one is the fifth principle: the mechanism by which the drug is effective, toxic and lethal is different for each outcome. Different mechanisms give different slopes.</li>
<li><b>Wide vs narrow therapeutic index.</b> A wide TI means the toxic dose is far above the therapeutic dose, so there is less chance of toxicity. A narrow TI means the toxic dose is not much higher than the therapeutic dose. The same reasoning applies to the margin of safety and the margin of exposure.</li>
<li><b>Why the margin of safety shows slope and the TI does not.</b> The TI compares the two curves only at their 50% points. Two drugs can share the same TD50 and ED50 while one has a much flatter toxic curve. The MOS uses different percentages, the toxic dose for the most sensitive 1% against the dose that works in 99%, so a flatter or steeper curve changes the MOS.</li>
<li><b>Why the margin of exposure exists.</b> A pollutant has no therapeutic dose, so there is nothing to put in a TI. Instead the NOAEL from animal studies is divided by the estimated human exposure. At a polluted site with several contaminants, the compound with the smallest MOE is the most dangerous, so it is the one to spend the cleanup money on.</li>
</ul>
<h4>Her words</h4>
<ul>
<li>"you can't say that C is always more potent than D. You can in the lower doses" <small>(T) 10/13</small></li>
<li>"because we use a different percentage, it gives you an idea of the slope of your dose response curve, whereas the therapeutic index does not." <small>(T) 10/13</small></li>
<li>"the real value of these numbers is that you can compare that value to other compounds' values" <small>(T) 10/13</small></li>
</ul>
<h4>Traps</h4>
<ul>
<li>"C is always more potent than D": wrong once the curves cross.</li>
<li>"The ED, TD and LD lines are not parallel only because of ADME": incomplete. She stressed different mechanisms for each outcome.</li>
<li>The therapeutic index shows nothing about slope; the margin of safety does.</li>
<li>The therapeutic index can use a percentage other than 50, but the numerator and denominator must use the same percentage. The margin of safety deliberately uses different ones (1 and 99).</li>
<li>Her TI is toxic dose over therapeutic dose (TD50/ED50). Dr. Gottlieb's Exam 1 version used the lethal dose (LD50/ED50).</li>
<li>The margin of exposure is not for medications or single doses: it is for repeated exposure to non-therapeutic compounds.</li>
<li>NOAEL: the highest dose without an observed adverse effect. She once phrased it as "the lowest dose we gave the animals ... and they didn't have a bad response to"; the definition is the highest such dose.</li>
<li>Wide TI means less chance of toxicity, not more.</li>
</ul>
<p>How she asks it: which compound is more potent, and the trick when the curves cross; why C levels off; why ED, TD and LD lines are not parallel; which index shows slope and why; what the NOAEL is and where it comes from; wide versus narrow therapeutic index; which compound at a site to clean up first.</p>
<p class="sub">Sources: Tox slides ‘Potency comparison in Dose-Response’, ‘ED, TD and LD Comparison from Dose-Response’, ‘Values Developed from Dose-Response’; Casarett and Doull Ch. 2 (reading card); (T) 10/13. Questions L14-001 to L14-015; L13-032, L13-033.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l14-2">
<h3>10. Target and mechanism of action: why side effects look unrelated</h3>
<p>The fifth principle asks where in the body a compound acts and how it causes harm. The slide lists six points to think about. Together they explain why many adverse effects on a drug's list have nothing to do with its therapeutic action: the harm can come from a different target, by a different mechanism, in an organ where the drug is not even most concentrated.</p>
<table class="reftab"><thead><tr><th>Point on the slide</th><th>What it means</th></tr></thead><tbody>
<tr><td>Organ or a physiological endpoint</td><td>The target can be a specific organ, or a more general physiological endpoint (the organ-specific and non-organ-specific endpoints of the Toxic Responses deck)</td></tr>
<tr><td>Multiple targets</td><td>A compound can cause problems at more than one place; not every place it hits may be known yet</td></tr>
<tr><td>Variation in toxicity at multiple targets</td><td>If a compound damages the kidney and the liver, it likely damages them in different ways</td></tr>
<tr><td>Target organ may not be the site of highest concentration</td><td>A compound can be most concentrated in muscle and cause no harm there, yet damage the kidney at a lower concentration</td></tr>
<tr><td>Dose at the target determines toxicity</td><td>Even a very sensitive organ is harmed only if the concentration there is high enough</td></tr>
<tr><td>The mechanism of action at multiple targets may be different</td><td>The effective, toxic and lethal curves of one drug are not parallel (section 9)</td></tr>
</tbody></table>
<h4>Why</h4>
<ul>
<li><b>Lowest concentration, most damage.</b> Tissues differ in sensitivity. If the kidney is much more sensitive than muscle, a lower concentration in the kidney can damage it while the higher concentration in muscle does nothing. So "where is the drug most concentrated?" does not answer "where is the toxicity?"</li>
<li><b>Sensitivity still needs dose.</b> The kidney has its own dose–response curve. A sensitive organ is harmed only when the concentration reaching it is high enough.</li>
<li><b>Different organs, different mechanisms.</b> Each target has its own mechanism, so one compound can injure two organs in two unrelated ways, and its toxic mechanism need not match its therapeutic one.</li>
<li><b>Two kinds of side effect.</b> Some are the therapy going too far at the intended target: a diuretic that removes too much fluid and leaves the patient needing hydration. Others come from a different target altogether: aminoglycoside ototoxicity is her classic example of an adverse effect whose target is very different from the therapeutic one. Sometimes the mechanism of an adverse effect is known; sometimes it is not.</li>
<li>Adverse effects on a drug's list "could be toxicities", depending on how bad they get.</li>
</ul>
<h4>Her words</h4>
<ul>
<li>"where it's having an adverse effect may not be where the highest concentration is, which is probably a little counterintuitive" <small>(T) 10/13</small></li>
<li>"even the super sensitive places, the concentration has to be high enough to cause an effect. Remember, you still have a dose response curve even right there at the kidney." <small>(T) 10/13</small></li>
<li>"How many times are you seeing side effects listed for a medication that have nothing to do with the therapeutic action of that drug? Did you ever say, why is this happening? This is why." <small>(T) 10/13</small></li>
</ul>
<h4>Traps</h4>
<ul>
<li>"The concentration of a medication in the body is always highest at its target site": False on her Practice Quiz 1.</li>
<li>"The mechanisms of a drug's toxicity is always the same as the mechanism of its efficacy": False on her Practice Quiz 1.</li>
<li>"A highly sensitive organ is always damaged": wrong. The dose at the target still decides.</li>
<li>A diuretic's over-diuresis is the therapy going too far at its own target; aminoglycoside ototoxicity comes from a different target. They are different kinds of side effect.</li>
</ul>
<p>How she asks it: a compound concentrated in one organ that damages another; one compound damaging two organs; the diuretic versus the aminoglycoside; true or false on "always" statements about target and mechanism.</p>
<p class="sub">Sources: Tox slide ‘Target &amp; Mechanism of Action’; Practice Quiz 1 Q5, Q6; (T) 10/13. Questions L14-016 to L14-019; L13-034, L13-041, L13-042.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l14-3">
<h3>11. The reading: Rodriguez-Mozaz and Weinberg, drugs in our water</h3>
<p>The article is a report from a 2008 environmental health summit where government agencies (EPA and others), academics, the pharmaceutical industry and other scientists met for the first time about drugs found in surface water (lakes, streams, rivers), groundwater (the Edwards Aquifer) and drinking water. They asked what is known, how bad it is, and what to do. The assigned part, up to "Best management practices", is a real case of the five principles, and the discussion guide compares each principle for humans and for aquatic wildlife. The practical reason to know it: a patient who hears that drugs are in the water supply may come to the pharmacist afraid of drinking "somebody's Prozac". Her conclusion: people are probably fine, wildlife is the bigger concern, and antibiotic resistance in the environment is a real problem.</p>
<h4>Her key, principle by principle</h4>
<table class="reftab"><thead><tr><th>Principle</th><th>Humans</th><th>Aquatic wildlife</th></tr></thead><tbody>
<tr><td><b>Source</b></td><td>Flushing (could be reduced by other disposal methods); animal waste (could be reduced by controls on feedlots and farms); human waste (cannot be reduced: people take medications)</td><td>The same as for humans</td></tr>
<tr><td><b>Exposure</b></td><td>Route: drinking water, eating fish, skin contact during recreation (she added bathing and swimming). Duration, single vs repeated, frequency: depend on how people are exposed and where they live. Concentrations about parts per trillion</td><td>Route: drinking water, food, skin (she added breathing, for fish). Duration: their entire life. Repeated. Frequency: constant if their home range stays contaminated. <b>The more significant exposure</b></td></tr>
<tr><td><b>ADME</b></td><td>Some data from drug development studies, perhaps other studies; the metabolites are often unknown</td><td>Very little if any data: the studies have not been done</td></tr>
<tr><td><b>Dose</b></td><td>Not known exactly (values often not measured, undetected, or modeled); probably below the therapeutic dose</td><td>Not known exactly, for the same reasons; the doses that cause harm are unknown, but given their exposure the dose is likely high enough to cause effects</td></tr>
<tr><td><b>Target/MOA</b></td><td>Unknown: effects of low-dose chronic exposure; sensitive populations (fetus, children, elderly, people with underlying disease); how multiple exposures act</td><td>Unknown: which system or organ is affected; data may come from the wrong species or the wrong endpoint; how multiple exposures act</td></tr>
</tbody></table>
<h4>What she added in class</h4>
<ul>
<li><b>Source.</b> Drugs leave people unmetabolized or as metabolites, and many metabolites are not even known. Unused antibiotics flushed down the toilet. Livestock in feedlots and chicken houses given hormones and antibiotics. Wastewater treatment plants treat the water "a bit" but do not remove all the drugs before it returns to streams, rivers and lakes: a source for both humans and animals. The article calls treatment plants the main points where drugs are discharged into surface water, because their treatment steps were not designed to remove pharmaceuticals.</li>
<li><b>Exposure.</b> Estrogen levels are higher off the shorelines of big cities with many young women, possibly because many women take oral contraceptives (Miami, Houston, San Diego, San Francisco). Frogs absorb a lot through their skin and are a sentinel species, an early warning that something is wrong.</li>
<li><b>Wildlife effects.</b> Populations of frogs, some fish and alligators shift from about half male and half female to more female where estrogen levels are higher. Is wildlife being harmed? She accepted both "yes" and "we don't know": there is evidence for some species, and most others (such as orca whales) are too hard to study.</li>
<li><b>Warming water vs estrogen.</b> Isolated studies that exposed these species to estrogenic compounds do produce the shift, and those compounds are high in some places, so the association is plausible; warming water needs its own studies. "It could be both."</li>
<li><b>Microbes.</b> Bacteria in water and sediments are becoming resistant to the antibiotics released into the environment.</li>
<li><b>The authors' conclusion</b> (her Practice Quiz 1): more data are needed to determine whether pharmaceuticals in water are adversely affecting human health.</li>
<li>In the article but not discussed in class: biosolids (treatment-plant solids sold as fertilizer, where some drugs collect) and the vultures that took in diclofenac (p. 1017).</li>
</ul>
<h4>Why</h4>
<ul>
<li><b>Why human waste is the greatest source.</b> People take medications every day, and the body excretes the unchanged drug and its metabolites, which go through treatment plants that do not remove them all. Flushing and animal waste can be reduced by changing practices; human waste cannot, because people will keep taking medications.</li>
<li><b>Why people are probably fine.</b> At parts per trillion, even a well-hydrated person drinking contaminated water does not come close to a normal therapeutic daily dose. The concern is kept for sensitive populations (in utero, children, the elderly, people with diseases), where risk assessment is very hard, and for any future rise in concentrations, which would call for re-evaluation.</li>
<li><b>Why wildlife is the bigger concern.</b> Aquatic animals live in the contaminated water: they drink it, eat food from it, absorb it through their skin, and are exposed constantly for their entire lives. Her key: because of the nature of their exposure, their dose is likely high enough to cause effects, even though the doses that cause harm are not known.</li>
<li><b>Why so little is known for wildlife.</b> ADME, dose and target are known for humans because drugs were developed and tested for humans, in rodents, guinea pigs, dogs and sometimes pigs. Nobody tests drugs in sea otters, orca whales, fish or mollusks, so how a human drug acts in them is unknown.</li>
<li><b>Why resistance matters.</b> Bacteria living with antibiotics in water and sediments are selected for resistance, and a resistant infection (for example through a cut at the beach) may not be treatable.</li>
</ul>
<h4>Her words</h4>
<ul>
<li>"We take the drugs, we flush, we improperly dispose of our meds. We've got animals on feedlots. Our wastewater treatment plants don't take care of all the drugs before it gets released into the environment" <small>(T) 10/13</small></li>
<li>"is that gonna get you up to a normal therapeutic daily dose? No, no." ... "So I think for humans we can be OK. Doesn't mean we should ignore our sensitive populations" <small>(T) 10/13</small></li>
<li>"changing from being like half male, half female to more female in those places where estrogen levels are higher, we see that. That's like a red flag" <small>(T) 10/13</small></li>
</ul>
<h4>Traps</h4>
<ul>
<li>Greatest source (her Practice Quiz 1 key): consumption of medications by humans and the resulting waste streams, not flushing unused medications, not landfills, not manufacturing.</li>
<li>"The dose in drinking water exceeds the therapeutic daily dose": False. It is about parts per trillion.</li>
<li>The authors did not conclude that drugs in water are harming human health, or that wildlife is unaffected: they concluded more data are needed on human health.</li>
<li>Wildlife exposure is the more significant one in her key, because it is constant, repeated and lifelong, not because the concentrations are known to be higher.</li>
<li>Flushing can be reduced; human waste cannot. Treatment plants are a source for both humans and animals.</li>
<li>Readings are tested on what was discussed, not on dates or numbers from the article.</li>
</ul>
<p>How she asks it: a principle (source, exposure, ADME, dose, target) and how it differs between humans and wildlife; the greatest source; the human dose against a therapeutic dose; the authors' conclusion; what to tell the worried patient; which organisms are thought to be affected.</p>
<p class="sub">Sources: Discussion-Guide-Rodriguez-Mozaz-and-Weinberg-Student-2026 and her posted key (KeyDiscussionGuideRodriguez-MozazandWeinberg2026.docx); Practice Quiz 1 Q7 to Q9; Tox slide ‘Outline and Objectives’ (reading objectives); reading card (article pp. 1016–1017); (T) 10/9, (T) 10/13. Questions L14-020 to L14-032; L13-035, L13-036.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l14-4">
<h3>12. Toxic responses: undesired effects, general concepts</h3>
<p>The Toxic Responses deck (cites <i>TR</i>) opens with general ways to describe any undesired effect, before any organ is named. Each is a contrast or a category: when the effect appears, whether it can heal, where it occurs, how several exposures combine, why repeated exposure can lessen the effect, and why species and individuals respond differently. Her objectives ask you to compare and contrast the pairs and define the interaction, tolerance and variation terms.</p>
<table class="reftab"><thead><tr><th>Concept</th><th>Definition (slide)</th><th>Her examples</th></tr></thead><tbody>
<tr><td><b>Immediate vs delayed</b></td><td>Immediate: occur rapidly after a single administration. Delayed: occur after some time has passed</td><td>Delayed by years: DES and vaginal cancer in the daughters as young adults. Delayed by days: some organophosphates (the slide names TOCP, triorthocresylphosphate) cause neuropathy by affecting other enzymes in the nerves</td></tr>
<tr><td><b>Reversible vs irreversible</b></td><td>The ability of the tissue to regenerate decides</td><td>Liver: high ability to regenerate, most injuries reversible (mild injury; not severe chronic injury). CNS: differentiated cells cannot divide, most injuries irreversible. Cancer and birth defects: irreversible</td></tr>
<tr><td><b>Local vs systemic</b></td><td>Local: at the site of first contact. Systemic: requires absorption at the site of entry and distribution to the site of action. Most toxins are systemic unless highly reactive</td><td>Local: chlorine gas (lungs, eyes, nasal mucosa), acid on skin. Both: tetraethyl lead. Indirect systemic: acid burns</td></tr>
<tr><td><b>Chemical interactions</b></td><td>Exposure to many compounds at once (workplace, drugs, diet, hobbies); one compound can change the absorption, protein binding, biotransformation or excretion of another</td><td>Additive, synergistic, potentiation, antagonism; quantifying risk at a polluted site</td></tr>
<tr><td><b>Tolerance</b></td><td>Decreased responsiveness to a toxic effect resulting from prior exposure to the chemical or a structurally related compound</td><td>Dispositional (ADME): carbon tetrachloride, cadmium. Reduced responsiveness (pharmacodynamic): receptor down-regulation</td></tr>
<tr><td><b>Variations in effect</b></td><td>Selective toxicity: lethal to one species but not another. Species differences: qualitative and quantitative. Individual differences: genetics</td><td>Arsenic in drinking water and skin cancer on the palms of the hands and feet: no animal model</td></tr>
</tbody></table>
<h4>Why</h4>
<ul>
<li><b>Reversibility follows regeneration.</b> Liver cells can divide and replace damaged tissue, so a mild liver injury can heal. Nerve cells cannot divide, so nerve damage is treated as permanent. Cancer is irreversible even when treated: surgery, radiation or chemotherapy kill the cancerous cells, but the cells never turn back into normal ones. A birth defect is irreversible because the limb or organ formed wrongly during development. One exposure can do both: "So sometimes you get both."</li>
<li><b>Local vs systemic follows reactivity.</b> A systemic effect needs the compound absorbed into the circulation. Highly reactive compounds (chlorine gas, acids) react where they first touch and often never get absorbed, so their effects are local. Most compounds are not that reactive, so they are absorbed and act systemically.</li>
<li><b>Both: tetraethyl lead.</b> A toxicologist got a couple of drops on her glove. It burned her hand (local), was absorbed through the burned skin, reached her central nervous system and killed her days later (systemic neurotoxicity).</li>
<li><b>Indirect systemic: acid burns.</b> A large acid burn behaves like a thermal burn: the skin cannot hold fluid in, blood volume is disturbed, and serious kidney problems can follow as the body fights to keep fluid in. The acid itself never had to be absorbed. So a burned patient is assessed systemically, not only at the skin.</li>
<li><b>Why interactions make risk hard to quantify.</b> Each compound may have a known target and effect, but together they can interact in additive, synergistic, potentiating or antagonistic ways. Those interactions are hard to measure, so a risk assessor at a site with many contaminants cannot easily put one number on the risk.</li>
<li><b>Dispositional tolerance: less reaches the site.</b> Carbon tetrachloride is metabolized to something more harmful, but repeated exposure inhibits the enzymes that do that metabolism, so less of the harmful metabolite forms ("sort of" protective). Cadmium induces the expression of the metal-carrying protein that binds it (she said "metal carrying enzyme"), which helps eliminate it by the kidneys. Both act through ADME.</li>
<li><b>Reduced responsiveness: the target changes.</b> With repeated exposure the receptors the compound acts on can be down-regulated, so the same dose gives less effect. This is pharmacodynamic, the same tolerance seen with medications that stop working as well over time.</li>
<li><b>Why species differences matter.</b> Animal studies are used to predict human responses. Arsenic in drinking water causes a skin cancer on the palms of the hands and feet in humans, but no rodent or other animal tested reproduces it. Had only animals been tested, arsenic in water would have been judged safe for humans. So results cannot always be extrapolated between species.</li>
<li><b>Why individuals differ.</b> Within one species, people respond differently to the same drug because of their genetics; pharmacogenomics studies this.</li>
</ul>
<h4>Her words</h4>
<ul>
<li>"A local effect will occur at the site of a noxious agent's first contact with the body" <small>(T) 10/13</small></li>
<li>"Most toxins, they cause systemic effects unless they are highly reactive." <small>(T) 10/13</small></li>
<li>"You could have additive or synergistic or potentiation or antagonistic type of interactions going on, which makes it really hard to predict" <small>(T) 10/13</small></li>
</ul>
<h4>Traps</h4>
<p>Her 10/14 poll, "Which statements are true regarding toxic effects":</p>
<ul>
<li>"A delayed response to a toxin may be observed weeks to years after exposure": true.</li>
<li>"Tissue injury from a toxic exposure is always reversible": false. Nerve injury, cancer and birth defects are irreversible.</li>
<li>"Toxins will not cause local effects": false. Reactive compounds act where they first touch.</li>
<li>"Systemic effects do not require absorption from the site of contact": false. To become systemic it has to be absorbed.</li>
<li>"It is possible to have immediate effects with each dose in a chronic exposure scenario": true (the benzene worker).</li>
</ul>
<ul>
<li>Carbon tetrachloride does not induce its own metabolism; it inhibits it. Cadmium is the one that induces (its carrier protein).</li>
<li>Dispositional tolerance is ADME-based (less compound at the site: carbon tetrachloride, cadmium); reduced responsiveness is pharmacodynamic (the receptors change: down-regulation).</li>
<li>An acid burn's kidney problems are an indirect systemic effect from fluid loss, not absorption of the acid.</li>
<li>Selective toxicity (lethal to one species, not another) is not the same as species differences (both species respond, but differently in kind or amount).</li>
</ul>
<p>How she asks it: a scenario and the label that fits it (delayed, irreversible, local, indirect systemic); the two tolerance mechanisms with their examples; the three variation terms; true or false on statements like her poll.</p>
<p class="sub">Sources: TR slides ‘Outline and Objectives’, ‘Immediate vs. Delayed’, ‘Reversible vs. Irreversible’, ‘Local vs. Systemic’, ‘Chemical Interactions’, ‘Tolerance’, ‘Variations in Effect’; her 10/14 poll; (T) 10/13, (T) 10/14. Questions L14-033 to L14-048.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l14-5">
<h3>13. Toxic endpoints: on-target and off-target</h3>
<p>Toxic endpoints are the results of an exposure. They may be described as on-target or off-target, non-organ specific, organ specific, idiosyncratic ("We don't know why it's happening"), or immunologically based (mainly allergic reactions). One exposure can have several responses, each by its own mechanism. The on-target/off-target labels answer one question: did the drug (or its metabolite) bind the receptor it was designed for? The tissue where that happens does not change the label.</p>
<table class="reftab"><thead><tr><th>Label</th><th>Receptor</th><th>Tissue</th><th>Why it happens</th><th>Her example</th></tr></thead><tbody>
<tr><td><b>On-target, intended tissue</b></td><td>The intended receptor</td><td>Intended</td><td>Too much drug at the receptor: a deliberate or accidental dosing error; a change in the drug's pharmacokinetics (a diseased liver cannot clear a normal dose); a change in receptor number</td><td>"your dose is too high"</td></tr>
<tr><td><b>On-target, wrong tissue</b></td><td>The intended receptor</td><td>Unintended</td><td>The drug reaches the same receptor in a tissue where it should not act</td><td>Diphenhydramine (Benadryl) drowsiness: H1 receptors in the brain</td></tr>
<tr><td><b>Off-target: another receptor</b></td><td>An unintended receptor</td><td>Either</td><td>Part of the molecule binds a receptor it was not designed for</td><td>Terfenadine (Seldane): desired peripheral H1 antagonism; arrhythmias from inhibition of cardiac potassium channels</td></tr>
<tr><td><b>Off-target: an enantiomer</b></td><td>An unintended receptor</td><td>Either</td><td>A racemic drug contains a form that is not wanted</td><td>Racemic thalidomide: the R-enantiomer is an effective anti-nausea agent; the S-enantiomer is a potent teratogen</td></tr>
<tr><td><b>Off-target: a receptor subtype</b></td><td>An unintended subtype</td><td>Either</td><td>The drug does not distinguish the subtypes</td><td>Propranolol: desired lower heart rate through β1 receptors in the heart; asthma exacerbation through β2 receptors in airway smooth muscle</td></tr>
</tbody></table>
<h4>Why</h4>
<ul>
<li><b>On-target in the right tissue usually means too much drug.</b> The drug is doing exactly what it was made to do, at the place it was meant to, so an adverse effect there comes from the amount reaching the receptor: an overdose or dosing error, or a normal dose that builds up because the liver can no longer clear it.</li>
<li><b>Diphenhydramine.</b> It blocks allergic symptoms through histamine receptors in the periphery and causes drowsiness through the same histamine receptors in the brain, so drowsiness is on-target in the wrong tissue. Newer antihistamines (cetirizine, fexofenadine) were modified so they do not cross the blood-brain barrier, so they cannot reach the brain's histamine receptors and do not cause drowsiness.</li>
<li><b>Off-target means "unclean".</b> When a drug was designed, some part of the molecule may bind other receptors that nobody anticipated. Once a drug class shows many side effects, chemists find the responsible part of the molecule and change it.</li>
<li><b>Terfenadine.</b> It blocked cardiac potassium channels as well as H1 receptors, and it was taken off the market. Her own case: grapefruit at breakfast slowed its metabolism, raised its blood level, and blocked even more potassium channels; the racing heart came on grapefruit days.</li>
<li><b>Thalidomide.</b> It was given as the racemic mixture for nausea in pregnancy, so the patients received the teratogenic S-form along with the useful R-form. It "never was officially on the market in the 50s" when those birth defects happened, and it is used today in oncology.</li>
<li><b>Propranolol.</b> Blocking β1 in the heart is the goal; blocking β2 in the airways is a different receptor subtype, so the asthma exacerbation is off-target.</li>
<li><b>Why the distinction matters.</b> Off-target binding explains the side effects on a drug's list that have nothing to do with its mechanism of action.</li>
</ul>
<h4>Her words</h4>
<ul>
<li>"even though the drug is in the wrong tissue, when it's finding the receptor that we wanted it to find, it's still called on target. So this is a part of our toxicology vernacular that I really don't like." <small>(T) 10/13</small></li>
<li>"That's when the drug is finding other receptors for which we did not intend for it to find. Either in the correct tissue where we wanted it to have a response or in the incorrect tissue." <small>(T) 10/13</small></li>
<li>"Most of the time, if you're having an on target adverse effect in the right tissue, your dose is too high." <small>(T) 10/13</small></li>
</ul>
<h4>Traps</h4>
<ul>
<li>Her Quiz 2 Q1: an off-target adverse effect occurs "When a drug interacts with a receptor that is not its therapeutic target." The distractors describe on-target effects: "When the dose at the intended receptor is too high" (right tissue) and "When a drug interacts with the intended receptor but in the wrong location" (wrong tissue).</li>
<li>Diphenhydramine drowsiness is on-target (wrong tissue), not off-target, even though the brain is not where the drug should act.</li>
<li>Thalidomide and propranolol are off-target: an enantiomer and a receptor subtype count as unintended receptors.</li>
<li>Receptor number: the slide lists "change in receptor number" as an on-target cause, and her spoken example was down-regulation. The confusion is reading down-regulation as a larger response: fewer receptors give a smaller response, which is how her tolerance slide uses the same word.</li>
<li>Idiosyncratic means the cause is unknown; immunologic (allergic) endpoints are a separate category on the slide.</li>
</ul>
<p>How she asks it: a drug, its receptor and its tissue, and the label (on-target right tissue, on-target wrong tissue, off-target by another receptor, an enantiomer or a subtype); the definition of off-target.</p>
<p class="sub">Sources: TR slides ‘Toxic Endpoints may be…’, ‘On-target and off-target adverse drug effects’ (Figure 6-1, from Principles of Pharmacology, Chapter 6: Drug Toxicity), ‘On-Target Examples’, ‘Off-Target Examples’; Quiz 2 Q1; (T) 10/13. Questions L14-049 to L14-058.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l14-6">
<h3>14. Non-organ-specific endpoints: fibrosis, genotoxicity, cancer, teratogenesis</h3>

<h4>The idea</h4>
<p>An endpoint is called non-organ specific when the damage arises by the same mechanism and looks the same whichever organ it shows up in. A given compound may favor one organ (bleomycin the lungs, ethanol the liver), but the endpoint is classified by its pathology, not by its location. Her four non-organ-specific endpoints are fibrosis, genotoxicity, cancer and teratogenesis. They contrast with the organ-specific endpoints of the lungs, nervous system, liver and kidney.</p>

<h4>The four endpoints</h4>
<table class="reftab"><thead><tr><th>Endpoint</th><th>What happens</th><th>Examples she gave</th><th>Why it is non-organ specific</th></tr></thead><tbody>
<tr><td>Fibrosis</td><td>Excess collagen and other extracellular matrix proteins are laid down. The tissue becomes stiff and the organ loses function.</td><td>Lung (alveolar interstitium): amiodarone (a cardiac drug), bleomycin (chemotherapy), paraquat (an herbicide). Liver (cirrhosis): ethanol; amiodarone also causes liver fibrosis.</td><td>The fibrotic tissue has the same chemistry, made by the same pathology, in the lung and in the liver.</td></tr>
<tr><td>Genotoxicity</td><td>Damage to DNA in general, in somatic or germ cells. The slide: not transmissible from cell to cell or generation to generation.</td><td>Results: cancer, teratogenesis (birth defects), genetically based disorders (some metabolic diseases have been traced to genetic damage).</td><td>DNA damage can occur in any tissue, and its results are not tied to one organ.</td></tr>
<tr><td>Mutagenicity</td><td>A transmissible genetic change: it can pass to offspring. In her words, a mutation in the germ cells makes the agent a mutagen.</td><td>—</td><td>A subset of genotoxicity.</td></tr>
<tr><td>Cancer</td><td>There may be a long latency between exposure to a carcinogen and the cancer. The multistage model on the slide (initiation, promotion, progression; a complete carcinogen does all three) she summarized in one line: it takes more than one mutation to end up with cancer.</td><td>The incidence table (American Cancer Society, 2009): lung and bronchus highest in men and women; next, prostate in men and breast in women.</td><td>The same cellular mechanism can cause cancers in different organs: some lung cancers carry the same mutation as some colon cancers, and some lung cancers match some breast cancers.</td></tr>
<tr><td>Teratogenesis</td><td>Birth defects. The fetus is exposed through the mother; its exposure depends on her absorption, distribution, metabolism and excretion and on whether the compound crosses the placenta.</td><td>Retinoids in hamsters; methanol, TCDD, 2,4,5-trichloroacetic acid and dexamethasone (cleft palate).</td><td>One teratogen gives different defects depending on when in gestation the mother is exposed.</td></tr>
</tbody></table>

<h4>Teratogenesis: time, compound, dose, labeling</h4>
<ul>
<li><b>Time of exposure.</b> Retinoids in hamsters were known to deform the limbs. Given to the mothers on different gestation days, they also caused small eyes (microphthalmia), spina bifida, cleft palate (at two different times), forelimb shortening and effects on the tail. The slide: for a given teratogen, time of exposure during gestation influences the type of effect. <small>(T) 10/13</small></li>
<li><b>Different compounds, same defect.</b> Each compound has its own peak gestation day for palate deformity: methanol day 7, TCDD day 11, 2,4,5-trichloroacetic acid day 12, dexamethasone day 13. <small>slide ‘Teratogenesis with different compounds’; (T) 10/13</small></li>
<li><b>Dose.</b> Her one sentence: the mother has to get enough of the compound for it to pass into the baby. The slide adds that some agents have a dose continuum, that malformation or death may occur without an effect on intrauterine growth, and that growth retardation or death may occur without malformations. <small>(T) 10/13; slide ‘Teratogenesis Dose’</small></li>
<li><b>Labeling.</b> The FDA used to rank drugs by how likely they were to cause birth defects. The newer labeling also covers effects on fertility, including male fertility (sperm count and viability), and whether a lactating mother should take the drug. Her Quiz 2 calls it the Pregnancy and Lactation Labeling Rules (2014) and keys three contents: effects on female and male reproductive potential, risks to the baby during breastfeeding, and risks to the baby during pregnancy. <small>(T) 10/13; Quiz 2 Q4</small></li>
</ul>

<h4>Why</h4>
<ul>
<li><b>Fibrosis.</b> Wherever fibrosis forms, the same collagen and matrix proteins are laid down, so lung fibrosis and liver fibrosis cannot be told apart by their chemistry; the endpoint is classed by that shared pathology. Stiff tissue cannot stretch, so the organ fails: lungs with paraquat fibrosis can no longer inhale and exhale.</li>
<li><b>Genotoxic vs mutagenic.</b> Damage in a somatic cell stays with the exposed person. Only a change in a germ cell can be handed to offspring, so only that change is called mutagenic.</li>
<li><b>Cancer.</b> Cancer rates do differ by organ (she called that statement true), but rates are not the basis of the classification. Tumors in different organs can share one cellular mechanism, so cancer is non-organ specific.</li>
<li><b>Teratogenesis.</b> Because the defect depends on the day of exposure, one compound can produce many kinds of defect. Because several compounds can produce the same defect, each at its own gestation day, a defect alone does not identify the compound.</li>
<li><b>Dose.</b> The fetus is exposed only through the mother, so her dose and her ADME decide how much reaches the fetus.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"if you look at the chemistry of that fibrotic tissue, it's the same. So the same pathology goes on to create that fibrosis." <small>(T) 10/13</small></li>
<li>"genotoxicity is just talking about damage to your DNA in general. And mutagenicity refers to the fact that it's transmissible." <small>(T) 10/13</small></li>
<li>"at the cellular level, the pathology is the same, even though you have it in the lung and you have a cancer in the breast" <small>(T) 10/13</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Fibrosis called organ specific because amiodarone and bleomycin hit the lung.</b> The classification rests on the pathology, which is the same in lung and liver. Quiz 2 keys fibrosis as the non-organ-specific endpoint (against nephrotoxicity, neurotoxicity, hepatotoxicity).</li>
<li><b>Why cancer is non-organ specific.</b> Not "We do not understand cancer well enough to consider it an organ-specific response" and not "There is nothing in common about the pathology of cancers found in different parts of the body": cancers in different organs can share the same mechanism (Quiz 2 Q3).</li>
<li><b>"All teratogens will only cause one kind of birth defect each."</b> False (Quiz 2 Q9): the retinoids caused several defects depending on the day.</li>
<li><b>Genotoxic and mutagenic used as synonyms.</b> Only a transmissible change (germ cells) is mutagenic.</li>
<li><b>The labeling rule.</b> "Information about how the medication will affect a child if administered to the child" is not one of her keyed contents (Quiz 2 Q4).</li>
<li><b>Poll 2.</b> Neurotoxicity, pulmonary toxicity and nephrotoxicity are organ specific; teratogenicity is the non-organ-specific choice.</li>
</ul>

<p>How she asks it: why each of the four is non-organ specific; the agents of pulmonary fibrosis; genotoxic versus mutagenic; what timing does to a teratogen; what the newer labeling adds.</p>
<p class="sub">Sources: TR slides ‘Non-Organ Specific: Fibrosis’, ‘Non-Organ Specific: Genotoxicity’, ‘Non-Specific: Cancer’, ‘Non-Organ Specific: Cancer’, ‘Non-Organ Specific: Teratogenesis’, ‘Teratogenesis Time of exposure’, ‘Teratogenesis with different compounds’, ‘Teratogenesis Dose’, ‘Teratogenesis Labeling’; (T) 10/13; Quiz 2 Q2 to Q4, Q9. Questions L14-059 to L14-070.</p>
</section>

<!-- ===== Day 15 (10/14) ===== -->
<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-1">
<h3>15. Pulmonary toxicity: why the lungs are susceptible, where particles land, acute vs chronic</h3>

<h4>The idea</h4>
<p>For each of the four organs she asks two questions: why is the whole organ susceptible, and why are certain parts of it susceptible. The lungs are exposed because we breathe all the time; the lung's own chemistry adds an oxidative burden; and the chemistry, size and shape of what is breathed in, and how hard we breathe, decide where in the lungs it lands. The responses are then sorted into acute and chronic.</p>

<h4>Why the lungs are susceptible</h4>
<ul>
<li><b>Oxidative burden.</b> We breathe in oxygen and pollutants carrying reactive oxygen species (sulfur dioxide, nitrogen oxides). White blood cells that come in to fight pathogens or clean up damaged tissue release more reactive oxygen species. The result damages the fats and proteins of lung cells. <small>(T) 10/14</small></li>
<li><b>Gases.</b> The slide's property is the water solubility of the gas: it decides how far down the gas goes and so the site of deposition. She said very hydrophilic gases go far down into the lungs and hydrophobic gases do not. Where a damaged lung is injured gives a hint of what was inhaled. <small>(T) 10/14; slide ‘Pulmonary Toxicity – Why are lungs susceptible?’</small></li>
<li><b>Particles.</b> Size, shape and breathing pattern decide where particles deposit; clearance (coughing, the cilia of the upper respiratory tract moving material up and out) decides how long they stay. Patients with poor clearance have worse outcomes. <small>(T) 10/14</small></li>
<li><b>Breathing pattern.</b> Heavier breathing (jogging rather than walking) brings in more; her advice was to jog in a park rather than beside a busy road. <small>(T) 10/14</small></li>
</ul>

<h4>Where particles land</h4>
<table class="reftab"><thead><tr><th>Particle</th><th>Where it ends up</th><th>Why</th></tr></thead><tbody>
<tr><td>Very small (fine)</td><td>Does not get past the upper airway; breathed back out</td><td>So light it leaves with the breath out</td></tr>
<tr><td>Large</td><td>Impacts the upper branches of the airway, where the bronchioles bifurcate</td><td>Comes in fast and cannot turn the curve into the next branch</td></tr>
<tr><td>Medium: the concern</td><td>The lower lung (the alveolar regions, her Quiz 2 key)</td><td>Heavy enough not to be breathed out, small enough to go around the curves; in the pause at the end of a breath in, it settles out of the air and stays behind</td></tr>
<tr><td>Long, thin, sharp (asbestos)</td><td>Embedded in the upper airways at the bifurcations; some move through the tissue</td><td>Shape: moving through lung tissue, asbestos causes mesothelioma on the outer lining of the lungs</td></tr>
</tbody></table>

<h4>Kinds of pulmonary toxicity</h4>
<table class="reftab"><thead><tr><th>Acute</th><th>Chronic</th></tr></thead><tbody>
<tr><td><b>Airway reactivity</b>: bronchoconstriction narrows the airway and restricts airflow (wheezing, coughing, chest tightness, dyspnea)</td><td><b>Fibrosis</b>: more collagen, less plasticity</td></tr>
<tr><td><b>Pulmonary edema</b>: an acute exudative phase thickens the alveolar-capillary barrier; abnormalities may persist</td><td><b>Emphysema</b>: lungs larger and too plastic (hyperinflation); less gas exchange from tissue loss and air trapping</td></tr>
<tr><td></td><td><b>Asthma</b></td></tr>
</tbody></table>
<ul>
<li><b>Airborne pulmonary toxins</b> (slide examples): particulates, oxygen. <b>Systemic pulmonary toxins</b>: bleomycin and cyclophosphamide (chemotherapy given IV) and monocrotaline and paraquat (herbicides); all four cause pulmonary fibrosis. <small>(T) 10/14; slide ‘Types of Pulmonary Toxicity’</small></li>
<li><b>Fluorine gas</b>: an acute response, very caustic to the lungs because of the water in them; the same for chlorine gas and the other halogens. <small>(T) 10/14</small></li>
</ul>

<h4>Why</h4>
<ul>
<li>Medium particles are the concern because they are the only size both too heavy to be exhaled and small enough to round every bend, so they reach the deep lung and settle there. Small ones leave; large ones stop high up.</li>
<li>Because deposition depends on the chemistry, size and shape of what was inhaled, the site of lung damage points back to the likely cause.</li>
<li>A drug given IV can still injure the lungs because it reaches them through the blood. Bleomycin and cyclophosphamide cause fibrosis there; it is pulmonary toxicity by location, and fibrosis is still non-organ specific by its mechanism (section 14).</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"The medium sized particles are the ones that are the most concerning." <small>(T) 10/14</small></li>
<li>"airway reactivity, pulmonary edema are acute, and then fibrosis, emphysema and asthma are considered chronic results of exposures." <small>(T) 10/14</small></li>
<li>"We give them by IV, but they're known to cause pulmonary toxicity." <small>(T) 10/14</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Very fine particles chosen as reaching the alveoli.</b> They are breathed back out; medium is keyed (Quiz 2 Q5).</li>
<li><b>Large particles chosen as the worst.</b> They stop at the upper bifurcations.</li>
<li><b>Asthma called acute because attacks are sudden.</b> On her slide asthma is chronic, with fibrosis and emphysema; airway reactivity and pulmonary edema are the acute ones.</li>
<li><b>Pulmonary toxicity assumed to require inhalation.</b> IV bleomycin and cyclophosphamide damage the lungs.</li>
<li><b>Particle rules applied to gases.</b> For a gas the property is water solubility, not size.</li>
</ul>

<p>How she asks it: which particle size is the concern and why; sort a list of responses into acute and chronic; a drug given by IV that damages the lungs. Scope: she did not go into which gases or particles are worst.</p>
<p class="sub">Sources: Toxic Responses slides ‘Pulmonary Toxicity – Why are lungs susceptible?’, ‘Types of Pulmonary Toxicity’; (T) 10/14; Quiz 2 Q5. Questions L15-001 to L15-010.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-2">
<h3>16. Neurotoxicity: the blood–brain barrier, energy, myelin, neurotransmission, and the four patterns of injury</h3>

<h4>The idea</h4>
<p>The nervous system has one strong protection, the blood–brain barrier, and four features that make it vulnerable: high energy needs, long axons, myelin and its dependence on neurotransmission. A neurotoxin usually damages only one of these parts, so the injury falls into one discrete pattern.</p>

<h4>The blood–brain barrier</h4>
<table class="reftab"><thead><tr><th></th><th>Systemic capillary</th><th>Brain capillary</th></tr></thead><tbody>
<tr><td>Vessel wall</td><td>Fenestrations (openings), sometimes large</td><td>Tight junctions: the cells of the vessel touch tightly</td></tr>
<tr><td>Surrounding cells</td><td>Pericytes, not tightly joined</td><td>Glial cells, much more tightly connected</td></tr>
<tr><td>Result</td><td>"Leaky": solutes move into the tissue between cells</td><td>Solutes cannot move out between the cells; a compound must pass through the endothelial cell membranes</td></tr>
</tbody></table>
<ul>
<li>Penetration depends on the compound's lipophilicity; non-lipophilic and larger compounds are kept out. Transporters move some compounds back into the blood. <small>(T) 10/14; slide ‘Neurotoxicity’</small></li>
<li>The barrier is not continuous: in some parts of the brain it is looser. <small>(T) 10/14; slide</small></li>
<li>It is still developing at birth, for several months to years. Some drugs that stay out of adult brains crossed into very young children's brains and harmed them, before this was known. <small>(T) 10/14</small></li>
</ul>

<h4>Why the nervous system is susceptible</h4>
<table class="reftab"><thead><tr><th>Feature</th><th>What it means</th><th>So</th></tr></thead><tbody>
<tr><td>Energy</td><td>Neurons depend on aerobic metabolism and have very high energy needs</td><td>Any exposure that lowers oxygen or energy supply affects the nervous system</td></tr>
<tr><td>Axonal transport</td><td>Cells are often very long (peripheral nerves run from the spinal cord down the limbs); they must make a large cell volume and move nutrients and waste up and down the axon</td><td>Adds to the energy demand</td></tr>
<tr><td>Myelin</td><td>No other organ has it. Myelinating cells (Schwann cells in the periphery, oligodendrocytes in the CNS) wrap the axon in many lipid layers and speed conduction</td><td>Damaged myelin slows transmission; symptoms such as tingling of the hands and feet</td></tr>
<tr><td>Neurotransmission</td><td>The only part of the body that depends on it: release, crossing the cleft, binding the postsynaptic cell, reuptake</td><td>Disturbing any step gives symptoms</td></tr>
</tbody></table>

<h4>The four patterns of injury (Casarett and Doull Figure 16-2)</h4>
<table class="reftab"><thead><tr><th>Neuron</th><th>Pattern</th><th>What is damaged</th><th>Her example</th></tr></thead><tbody>
<tr><td>B</td><td>Neuronopathy</td><td>The entire neuron dies (astrocytes often proliferate where neurons are lost)</td><td>—</td></tr>
<tr><td>C</td><td>Axonopathy</td><td>Only the axon degenerates; cell body and myelin are spared, as if the axon were cut chemically</td><td>—</td></tr>
<tr><td>D</td><td>Myelinopathy</td><td>The myelinating cells; remyelination happens but takes a long time, and is much less effective in the CNS than in the periphery</td><td>Metronidazole: on a second, higher-dose course for Giardia her hands and feet tingled; she stopped the drug</td></tr>
<tr><td>E</td><td>Neurotransmission</td><td>Too much excitation or not enough transmitter; the cell looks unchanged</td><td>Organophosphate pesticides</td></tr>
</tbody></table>

<h4>Why</h4>
<ul>
<li>The barrier keeps out compounds that cannot pass through cell membranes, so a drug's lipophilicity and size decide whether it reaches the brain.</li>
<li>Because the barrier is still developing at birth, a drug that is safe for an adult's brain can reach a newborn's brain.</li>
<li>Because neurons run on aerobic metabolism and must supply long axons, the nervous system suffers whenever an exposure cuts its oxygen or energy.</li>
<li>Because a neurotoxin usually causes one discrete pattern, and the patterns look different under a microscope, the injury can be classified. Neurotransmission toxicity leaves the cell normal looking and is recognized from the loss of function.</li>
<li>Myelinopathy may not be the worst kind, because myelin can regrow, slowly; tingling in the hands and feet is the sign she used.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"most of the time, a neurotoxin that you might be exposed to is gonna cause one of these discrete kinds of neurotoxicity." <small>(T) 10/14</small></li>
<li>"That blood-brain barrier is still developing at birth for several months to years." <small>(T) 10/14</small></li>
<li>"If your myelin sheath has been damaged, you end up with your neurotransmission being slower" <small>(T) 10/14</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Neuronopathy described as damage to the myelin or the axon.</b> It is death of the entire neuron (Quiz 2 Q6).</li>
<li><b>Tingling hands and feet called axonopathy.</b> Her example (metronidazole) was myelinopathy.</li>
<li><b>Neurotransmission toxicity expected to show damaged cells.</b> The cell looks normal.</li>
<li><b>The barrier treated as equally tight everywhere and at every age.</b> It is looser in some regions and immature in newborns.</li>
<li><b>One neurotoxin expected to cause all four patterns.</b> That is very rare.</li>
</ul>

<p>How she asks it: name the pattern from a description of the damaged neuron (or from her tingling story); why a drug safe in adults harmed newborns; which features make the nervous system vulnerable. Scope: no lists of which compound causes which pattern.</p>
<p class="sub">Sources: Toxic Responses slides ‘Neurotoxicity’, ‘Susceptibility to Neurotoxicity – Energy and Axons’, ‘– Myelin’, ‘– Neurotransmission’, ‘Types of Neurotoxicity’; (T) 10/14; Quiz 2 Q6. Questions L15-011 to L15-018.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-3">
<h3>17. Hepatotoxicity: why the liver is susceptible, and the kinds of liver injury</h3>

<h4>The idea</h4>
<p>The liver receives everything swallowed first, concentrates it, and does most of the body's metabolism, so it can make toxic metabolites right where they do harm. It also has its own inflammatory cells and is the organ most prone to idiosyncratic reactions. Each hepatotoxin usually causes one discrete kind of injury, so the pattern of injury hints at the exposure.</p>

<h4>The anatomy she reviewed</h4>
<p>Blood enters each lobe at its edges through the hepatic artery (she said "hepatic portal artery") and the portal vein, trickles along the cords of hepatocytes, and drains out through the central vein. Bile ducts begin at the edges of the lobe. Anything swallowed travels in the portal circulation to the liver first, the basis of the first-pass effect. <small>(T) 10/14</small></p>

<h4>Why the liver is susceptible (her Poll 3)</h4>
<table class="reftab"><thead><tr><th>Reason</th><th>What follows</th></tr></thead><tbody>
<tr><td>It takes up and concentrates compounds from the blood (its job is to filter and clear the blood)</td><td>Its cells hold high amounts of what passes through</td></tr>
<tr><td>It receives a large volume of blood through the portal circulation</td><td>Everything swallowed reaches it first</td></tr>
<tr><td>It does a lot of metabolism</td><td>It can bioactivate compounds to hepatotoxic metabolites in place</td></tr>
<tr><td>It has its own inflammatory cells, the Kupffer cells</td><td>While cleaning up pathogens and dead or damaged cells they release inflammatory cytokines (which call in more immune cells) and reactive oxygen species, adding to the injury</td></tr>
<tr><td>It tends to have idiosyncratic reactions</td><td>See below and section 20</td></tr>
<tr><td><i>Not a reason:</i> "It is a large organ"</td><td>"that really doesn't have anything to do with it" <small>(T) 10/14</small></td></tr>
</tbody></table>

<h4>Kinds of liver injury (Klaassen Table 13-2)</h4>
<table class="reftab"><thead><tr><th>Response</th><th>What it is</th><th>Some toxicants on the slide</th></tr></thead><tbody>
<tr><td>Hepatocyte death</td><td>Death of the hepatocytes, the cells that do much of the metabolism</td><td>Acetaminophen, ethanol</td></tr>
<tr><td>Fatty liver (steatosis)</td><td>Fat builds up in the liver</td><td>Amiodarone, ethanol, tamoxifen, valproic acid</td></tr>
<tr><td>Canalicular cholestasis</td><td>Bile flow is blocked: the bile duct narrows because the cells lining it are damaged and inflamed</td><td>Chlorpromazine, cyclosporin A, estrogens</td></tr>
<tr><td>Bile duct damage</td><td>The bile duct as a whole is damaged</td><td>Amoxicillin</td></tr>
<tr><td>Sinusoidal endothelial damage</td><td>Damage to the lining of the sinusoids</td><td>Cyclophosphamide, pyrrolizidine alkaloids</td></tr>
<tr><td>Inflammation</td><td></td><td>Bacterial endotoxin, ethanol</td></tr>
<tr><td>Liver regeneration</td><td></td><td>Acetaminophen, ethanol, estrogens</td></tr>
<tr><td>Fibrosis and cirrhosis</td><td>Section 14</td><td>Ethanol, carbon tetrachloride, vitamin A, vinyl chloride</td></tr>
<tr><td>Liver cancers</td><td></td><td>Aflatoxin (made by molds on grains), arsenic, vinyl chloride</td></tr>
</tbody></table>
<p>She does not require the table's drug lists; she requires the kinds of injury and the ability to explain them. <small>(T) 10/14</small></p>

<h4>Why</h4>
<ul>
<li>Most compounds hit one kind of injury: aflatoxin causes only liver cancer. Ethanol is the exception, appearing under cell death, steatosis, inflammation, regeneration and fibrosis. Because most toxins are this discrete, imaging and a liver biopsy that show the pattern of injury hint at what the patient was exposed to.</li>
<li>Kupffer cells are there to help, but when the liver tissue itself is damaged their cleanup releases cytokines and reactive oxygen species, so the inflammation keeps going.</li>
<li>Idiosyncratic reactions concentrate in the liver because it does most of the metabolism. A person with a rare genetic variant may metabolize a drug differently and form a hepatotoxic metabolite that most people do not; once the genotype is known, the "unexplained" reaction is explained. Kidneys, lungs and the CNS do not show this pattern much.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"Its job is to take up and concentrate stuff out of the blood" <small>(T) 10/14</small></li>
<li>"each compound is usually very discrete in the kind of hepatotoxicity it'll cause" <small>(T) 10/14</small></li>
<li>"that pattern of injury will give us a hint of what they might have been exposed to" <small>(T) 10/14</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>"It is a large organ."</b> The one wrong option in Poll 3.</li>
<li><b>Kupffer cells as pure protection.</b> Their cleanup adds cytokines and reactive oxygen species to the injury.</li>
<li><b>Cholestasis read as hepatocyte death.</b> Cholestasis is blocked bile flow from damaged duct cells.</li>
<li><b>Every hepatotoxin assumed to cause every kind of injury.</b> Most cause one discrete kind; ethanol is the many-kind exception.</li>
</ul>

<p>How she asks it: her poll (which reasons make the liver susceptible); the name of the resident immune cells and why they add to injury; what a kind of liver response means in plain words.</p>
<p class="sub">Sources: Toxic Responses slides ‘Hepatotoxicity – review of liver anatomy’, ‘Hepatotoxicity – Why is liver susceptible?’, ‘Site-Specific Hepatotoxicity’; (T) 10/14. Questions L15-019 to L15-025.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-4">
<h3>18. Liver zones: the oxygen gradient and CYP2E1</h3>

<h4>The idea</h4>
<p>Within the liver, a hepatotoxin often damages one zone and spares the others. Two things are uneven along the path the blood takes from the inflow vessels to the central vein: the oxygen content, and which metabolizing enzymes the hepatocytes express. Damage lands where the conditions for making the toxic metabolite are best.</p>

<h4>The zones of the acinus</h4>
<p>The acinus view follows the blood from the vessels that bring it in (hepatic artery and portal vein) across to the central vein where it leaves. Zone 1 is closest to the inflow vessels, zone 3 closest to the central vein, and zone 2 lies between. <small>(T) 10/14; slide ‘Reasons for Site-Specific Hepatotoxicity’</small></p>
<table class="reftab"><thead><tr><th></th><th>Zone 1</th><th>Zone 3</th></tr></thead><tbody>
<tr><td>Position</td><td>Next to the inflow vessels</td><td>Next to the central vein</td></tr>
<tr><td>Oxygen</td><td>Relatively high</td><td>Relatively low: the blood leaving is hypoxic</td></tr>
<tr><td>Enzymes</td><td>Many phase 2 enzymes</td><td>Some P450s; CYP2E1 is expressed more here than in zone 1</td></tr>
<tr><td>Injury example</td><td>A compound bioactivated by enzymes that need oxygen</td><td>Acetaminophen overdose: hepatocyte death</td></tr>
<tr><td>Kupffer cells</td><td colspan="2">Throughout the liver, in every zone</td></tr>
</tbody></table>

<h4>Why</h4>
<ul>
<li><b>The oxygen gradient.</b> Blood enters zone 1 fairly well oxygenated. As it flows past the hepatocytes, they take oxygen out of it, so by the time it reaches the central vein it is relatively hypoxic. Zone 1 therefore has the most oxygen and zone 3 the least.</li>
<li><b>Damage from oxygen.</b> If the enzymes that bioactivate a compound need oxygen to work, the high oxygen in zone 1 helps them, the hepatotoxic metabolite is made there, and zone 1 is damaged.</li>
<li><b>Damage from enzyme location (acetaminophen).</b> In overdose, acetaminophen is bioactivated to NAPQI by CYP2E1. CYP2E1 is most highly expressed in zone 3, so NAPQI is made in zone 3, and a biopsy shows hepatocyte death in zone 3.</li>
<li><b>Kupffer cells do not explain a zone.</b> They move all over the liver, so they cannot account for one zone being spared.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"zone 1 is closest to the ... vessels where the blood comes into the liver, and zone 3 is closest to the vessel where the blood leaves the liver" <small>(T) 10/14</small></li>
<li>"So oxygen gradients and non-homogeneous expression of our metabolizing enzymes contributes to where you see liver damage for different hepatotoxins." <small>(T) 10/14</small></li>
<li>On Poll 4: "most of our metabolizing enzymes are not homogeneously expressed across the entire liver. They're expressed in certain areas" <small>(T) 10/14</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Oxygen reversed.</b> High oxygen is in zone 1, near the inflow vessels; zone 3, near the central vein, is the low-oxygen zone. "Relatively high oxygen content in Zone 1" is the keyed answer to Poll 4.</li>
<li><b>"Homogenous expression of P450s across the zones."</b> False; CYP2E1 is the counterexample.</li>
<li><b>"Zone 2 has few Kupfer cells."</b> False; they are everywhere.</li>
<li><b>Acetaminophen damage placed in zone 1.</b> CYP2E1, which makes NAPQI, is highest in zone 3.</li>
<li><b>Her Quiz 2 short answer</b> asks for two reasons for site-specific liver damage: the oxygen gradient across the zones and the uneven expression of metabolizing enzymes such as the CYP450s.</li>
</ul>

<p>How she asks it: which zone dies after acetaminophen overdose and why; which zone is next to the central vein; which statement explains regional susceptibility; two reasons for site-specific damage in two sentences.</p>
<p class="sub">Sources: Toxic Responses slide ‘Reasons for Site-Specific Hepatotoxicity’; (T) 10/14; Quiz 2 Q8. Questions L15-026 to L15-029, L15-044.</p>
<!--STEP:liver-zones-->
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-5">
<h3>19. Nephrotoxicity: why the kidneys are susceptible, kinds of renal injury, NSAIDs and PPIs</h3>

<h4>The idea</h4>
<p>The kidney receives a large share of the blood, including metabolites the liver has just made; it pulls compounds into its own cells and concentrates them; it metabolizes them there; and its filtration depends on the tone of its arterioles. Like the liver, it is usually damaged by a compound causing one discrete kind of injury at one site.</p>

<h4>Why the kidneys are susceptible</h4>
<table class="reftab"><thead><tr><th>Reason (slide)</th><th>In her words, what it means</th></tr></thead><tbody>
<tr><td>Large delivery of potential toxins in the systemic circulation</td><td>Lots of blood, especially blood that has passed through the liver carrying metabolites</td></tr>
<tr><td>Concentrating the urine also concentrates poisons in the tubule, increasing their transport into tubular cells</td><td>The cells take compounds up into themselves and concentrate them</td></tr>
<tr><td>Renal transport, accumulation and metabolism make toxicity in place likely</td><td>Compounds can also be metabolized by the kidney cells</td></tr>
<tr><td>Sensitivity to endogenous vasoconstrictors</td><td>Constricting the afferent or efferent arteriole reduces blood flow and so reduces GFR</td></tr>
</tbody></table>

<h4>Kinds of renal injury (Klaassen Table 14-2)</h4>
<p>Prerenal, vasoconstriction, crystalluria, tubular toxicity, endothelial injury, glomerulopathy, interstitial nephritis. She requires the kinds of damage in general, not the drug lists. <small>(T) 10/14</small></p>
<ul>
<li><b>NSAIDs</b>, the class she worries about most: interstitial nephritis, vasoconstriction and glomerulopathy. Her advice to patients: limit their use and drink lots of water while taking them. <small>(T) 10/14</small></li>
<li><b>PPIs</b> (such as omeprazole): add them to interstitial nephritis. The OTC label limits use to two weeks for two reasons: reflux that needs a PPI longer should be checked, and these drugs can cause interstitial nephritis. <small>(T) 10/14</small></li>
<li><b>Site specificity</b> (slide): differences in blood flow, transport and accumulation, physicochemical properties of the epithelium, reactivity of targets, the balance of bioactivation and detoxification, cellular energetics, and repair. Her most important reason: which enzymes are expressed in which part of the nephron. Tubular toxicity and crystalluria depend more on the chemistry of the drug. <small>(T) 10/14; slide ‘Reasons for Site-Specific Nephrotoxicity’</small></li>
</ul>

<h4>Her father's case: a PPI and interstitial nephritis</h4>
<p>A geriatric patient, allergic to aspirin, was told to take OTC omeprazole for reflux while his physical was rescheduled. Months later the routine blood work showed a high serum creatinine. The only change was the PPI. The literature she found described PPI-induced interstitial nephritis, especially in patients with an aspirin allergy: an allergic response to the PPI that shows up as interstitial nephritis rather than hives. He stopped the PPI for good and needed erythropoietin for a while. <small>(T) 10/14</small></p>

<h4>Why</h4>
<ul>
<li>Because the kidney's filtration depends on arteriolar blood flow, anything that constricts the afferent or efferent arteriole lowers GFR; this sensitivity is unique to the kidney.</li>
<li>Because the kidney concentrates solutes in its tubules and its cells, renal cells are exposed to more of a compound than the blood level suggests, and metabolism there can make the toxic product in place.</li>
<li>Because enzymes and transport differ along the nephron, injury lands at specific sites; not every nephrotoxin damages the whole kidney.</li>
<li>The case shows two things: kidney injury can be silent until a creatinine is measured, and an immune reaction to a drug can appear as kidney injury, with no rash (section 20).</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"if you reduce that blood flow, you're going to reduce GFR" <small>(T) 10/14</small></li>
<li>"One of the things I worry about the most are our NSAIDs." <small>(T) 10/14</small></li>
<li>"that allergic response is manifesting as interstitial nephritis in some patients, so it's not like an allergic response where you get like hives" <small>(T) 10/14</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>"All nephrotoxins will damage the entire kidney."</b> False (Quiz 2 Q7): injury is site specific.</li>
<li><b>PPIs left off because they are not on the slide's table.</b> She told the class to add them under interstitial nephritis.</li>
<li><b>An allergic reaction must show as hives or trouble breathing.</b> In some patients it shows as interstitial nephritis.</li>
<li><b>NSAIDs given one kind of renal injury.</b> She named three: interstitial nephritis, vasoconstriction, glomerulopathy.</li>
</ul>

<p>How she asks it: a patient on an OTC PPI with a rising creatinine; the drug class she worries about and its three renal injuries; why the kidney is uniquely sensitive to vasoconstrictors.</p>
<p class="sub">Sources: Toxic Responses slides ‘Nephrotoxicity – review of renal anatomy’, ‘Nephrotoxicity - Why are kidneys susceptible?’, ‘Site-Specific Nephrotoxicity’, ‘Reasons for Site-Specific Nephrotoxicity’; (T) 10/14; Quiz 2 Q7. Questions L15-030 to L15-036.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-6">
<h3>20. Idiosyncratic and immunologic responses, and her four Poll Everywhere questions</h3>

<h4>The idea</h4>
<p>Two more toxic endpoints fit neither the organ-specific nor the non-organ-specific group. An idiosyncratic reaction is an unusual, strong reaction in a few people, which pharmacogenomics is starting to explain. An immunologic reaction happens when the body treats the drug as foreign and mounts an immune response against it. The slide is titled "Allergic Responses"; she asked the class to change it to immunologic responses, because allergy (hypersensitivity) is only one of the two kinds.</p>

<h4>The two endpoints</h4>
<table class="reftab"><thead><tr><th></th><th>Idiosyncratic</th><th>Immunologic</th></tr></thead><tbody>
<tr><td>Definition</td><td>Slide: genetically determined abnormal reactivity to a chemical; the response is qualitatively similar to other people's but extreme. Her words: a reaction we do not always know the reason for, often strong, sometimes unexpected</td><td>The drug is recognized as foreign and the immune system responds to it</td></tr>
<tr><td>How it starts</td><td>A rare genetic variant changes how the person metabolizes the drug</td><td>Small molecules (under 600 daltons) bind body proteins and act as haptens; the drug–protein complex triggers the response. Large drugs (therapeutic peptides and proteins) activate the immune system directly</td></tr>
<tr><td>Kinds or site</td><td>The liver is the organ most likely to have one</td><td>Two mechanisms: hypersensitivity (type 1, 2, 3 or 4 allergic responses) and autoimmune reactions (the immune system attacks the patient's own body)</td></tr>
<tr><td>Note</td><td>Using "idiosyncratic" for every low-frequency reaction is not proper use of the term (slide). Pharmacogenomics is explaining these reactions</td><td>Autoimmune reactions are increasing as more biologicals reach the market; they are hard to predict and often harmful</td></tr>
</tbody></table>

<h4>Why</h4>
<ul>
<li>Idiosyncratic reactions center on the liver because it does most drug metabolism. A person with an unusual metabolizing genotype may form a toxic metabolite others do not. Before pharmacogenomics this looked unexplainable; with the genotype known, it is an unusual but explained reaction.</li>
<li>A small drug molecule triggers an immune response only after it is bound by a body protein; the bound complex (the slide calls the small molecule itself the hapten) is what the immune system responds to. A peptide or protein drug is large enough to activate the immune system directly.</li>
<li>Once a drug has switched the immune system on, the response may go beyond allergy and turn against the patient's own tissues (autoimmunity), which is why biologicals are a growing concern.</li>
<li>An immunologic reaction can appear in one organ: her father's PPI reaction showed up as interstitial nephritis (section 19).</li>
</ul>

<h4>Her four polls (end of the Toxic Responses deck)</h4>
<div class="poll"><b>Poll 1: "Which statements are true regarding toxic effects"</b> (meant as choose-all)<br>A delayed response to a toxin may be observed weeks to years after exposure: <b>true</b>. Tissue injury from a toxic exposure is always reversible: false. Toxins will not cause local effects: false. Systemic effects do not require absorption from the site of contact: false (to become systemic it must be absorbed into the blood). It is possible to have immediate effects with each dose in a chronic exposure scenario: <b>true</b> (a workplace leak that causes a headache every day, with no tolerance). <small>(T) 10/14</small></div>
<div class="poll"><b>Poll 2: "Which is an non-organ specific toxic response?"</b> Neurotoxicity / Pulmonary toxicity / Teratogenicity / Nephrotoxicity<br>Key: <b>Teratogenicity</b>; the other three name an organ. <small>(T) 10/14</small></div>
<div class="poll"><b>Poll 3: "The liver is very susceptible to drug toxicity because… (Choose all that apply)"</b><br>Key: every option except <b>"It is a large organ"</b>: it expresses many enzymes that may make toxic compounds; it receives a large volume of blood via the portal circulation; it can take up and concentrate xenobiotics; it has its own immune cells. <small>(T) 10/14</small></div>
<div class="poll"><b>Poll 4: "Which statement is one reason for regional susceptibility to toxicity across the liver?"</b> Relatively high oxygen content in Zone 1 / Homogenous expression of P450s across the zones / Zone 2 has few Kupfer cells<br>Key: <b>Relatively high oxygen content in Zone 1</b> (section 18). <small>(T) 10/14</small></div>
<p>She called these "very easy" questions; her quizzes are more detailed and her exam may be harder. <small>(T) 10/14</small></p>

<h4>Her words</h4>
<ul>
<li>"the liver is the organ that is most likely to have an idiosyncratic reaction compared to other organs in the body." <small>(T) 10/14</small></li>
<li>"I have on this title of the slide allergic responses, but it's probably more accurate to say immunologic responses." <small>(T) 10/14</small></li>
<li>"Oftentimes, those immune responses to those biological therapies are hard to predict, and they're often kind of bad" <small>(T) 10/14</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>"Idiosyncratic" for any rare reaction.</b> The slide calls that improper; it means genetically determined abnormal reactivity.</li>
<li><b>Only large drugs can provoke an immune response.</b> Small molecules can, as haptens bound to proteins.</li>
<li><b>Immunologic equals allergic.</b> Autoimmune reactions are the second category.</li>
<li><b>Poll 1, statement D.</b> A systemic effect always requires absorption.</li>
</ul>

<p>How she asks it: the two categories of immunologic response; how a small molecule becomes immunogenic; which organ has idiosyncratic reactions and why; the poll questions themselves.</p>
<p class="sub">Sources: Toxic Responses slides ‘Idiosyncratic Toxicity’, ‘Allergic Responses’, the four PollEV slides; (T) 10/14. Questions L15-037 to L15-044.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-7">
<h3>21. Treating poisonings: how pharmacokinetics change in overdose</h3>

<h4>The idea</h4>
<p>The kinetic parameters measured at therapeutic doses may not hold in an overdose: there are therapeutic kinetics and overdose kinetics. The parameters that change most are volume of distribution and clearance. Each change has a consequence for treatment, so an overdose cannot be managed by scaling up the usual numbers.</p>

<h4>What changes</h4>
<table class="reftab"><thead><tr><th>Change in overdose</th><th>What happens</th><th>Consequence</th></tr></thead><tbody>
<tr><td>Large volume of distribution (over 5 L/kg on the slide: antidepressants, antipsychotics, antimalarials, opioids, propranolol, verapamil)</td><td>Most of the drug has left the blood and is sequestered in lipid, muscle or bone</td><td>Hard to remove from the blood by hemodialysis; dialysis has to run a long time</td></tr>
<tr><td>Slowed tablet dissolution or gastric emptying</td><td>Absorption is delayed</td><td>Peak toxic effects come later than expected</td></tr>
<tr><td>The drug injures the gastrointestinal tract (iron)</td><td>The damaged gut no longer limits absorption</td><td>More drug is absorbed</td></tr>
<tr><td>Liver metabolism saturated</td><td>Less first-pass effect</td><td>More drug reaches the circulation; blood levels higher than expected</td></tr>
<tr><td>Plasma protein binding capacity exceeded</td><td>A larger fraction of the drug is free</td><td>Greater risk of toxicity</td></tr>
<tr><td>High plasma concentrations</td><td>Elimination may change from first order to zero order</td><td>Longer half-life</td></tr>
</tbody></table>
<p class="sub">Slide ‘How Pharmacokinetics change in Overdose’; (T) 10/14. DiPiro Table e9-7 lists the same kinds of change (saturated first pass, decreased protein binding, slowed elimination from saturated biotransformation).</p>

<h4>Why</h4>
<ul>
<li><b>Large Vd and dialysis.</b> A large Vd means the drug is not staying in the blood. Dialysis can only clear what is in the blood, so after one run the blood level is up again: drug moves back out of the lipid, muscle and bone, and dialysis must wait for it. The DiPiro chapter gives the profile of a dialyzable drug: Vd under 1 L/kg, protein binding under 80%, molecular weight under 1,000 daltons.</li>
<li><b>Iron.</b> Much of gut absorption is by active transport, which saturates. Oral iron is absorbed this way, so normally only a limited amount gets in, which protects the body from free iron. In overdose, iron is caustic and destroys the gut lining, so iron passes straight into the blood and the protection of saturable transport is lost.</li>
<li><b>First pass.</b> A drug that is normally cleared well on its first pass through the liver arrives in overdose in an amount the liver cannot handle; the excess passes through unmetabolized, so blood levels are higher than its usual bioavailability predicts.</li>
<li><b>Protein binding.</b> Plasma proteins can bind only so much drug. Past that capacity the extra drug stays free, and the free drug carries the toxicity.</li>
<li><b>Delayed absorption.</b> Slow dissolution delays the peak. Her guideline key gives the extreme case: extended-release tablets can form bezoars that break apart at unpredictable times, so absorption, and the toxic peak, cannot be predicted (section 31).</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"So you got therapeutic kinetics, and then you got overdose kinetics for a lot of drugs" <small>(T) 10/14</small></li>
<li>"you have to wait for the drug to move out of the lipids, or out of the muscle or out of the bone back into the blood before hemodialysis is going to grab it again." <small>(T) 10/14</small></li>
<li>"iron is very caustic, it actually blows apart your gut. Therefore, you don't have the protection of a saturable active transport." <small>(T) 10/14</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>"Medications in overdose will never affect the kinetics of the drug."</b> False (Quiz 3 Q6).</li>
<li><b>A large Vd makes a drug easy to dialyze.</b> The opposite: the drug is out of the blood, where dialysis cannot reach it.</li>
<li><b>GI injury reduces absorption.</b> It increases absorption by removing the saturable-transport limit.</li>
<li><b>Saturated first pass lowers blood levels.</b> It raises them.</li>
<li><b>"Protein binding capacity" read as tissue binding.</b> She meant plasma (blood) proteins.</li>
</ul>

<p>How she asks it: why dialysis fails to clear a large-Vd drug; why an oral overdose of a first-pass drug gives unexpectedly high levels; the iron example; what happens to free drug.</p>
<p class="sub">Sources: Treating Poisonings slide ‘How Pharmacokinetics change in Overdose’; DiPiro ch. e9 (Toxicokinetic Considerations, Table e9-7; Enhanced Elimination); her guideline reading-guide key; (T) 10/14; Quiz 3 Q6. Questions L15-045 to L15-049.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-8">
<h3>22. How pharmacodynamics change in overdose</h3>

<h4>The idea</h4>
<p>At overdose doses a drug can do things it does not do at therapeutic doses. Two drugs that look alike at the therapeutic dose can behave very differently higher up their dose–response curves, and some toxic effects are different from the therapeutic action or add to each other. With the kinetic changes of section 21, this is why an overdose is "not gonna be straightforward".</p>

<h4>The slide's three points</h4>
<table class="reftab"><thead><tr><th>Slide point</th><th>Her example</th></tr></thead><tbody>
<tr><td>Consider the therapeutic index and the overlap of the therapeutic and toxic response curves: two medications may have the same therapeutic index but unequal safe dosing</td><td>The Katzung figure, drugs A and B (below)</td></tr>
<tr><td>At least part of the toxic effect may be different from the therapeutic action</td><td>Tricyclic antidepressants (TCAs) reduce sweating while increasing muscular activity and seizures</td></tr>
<tr><td>Beta blockers or calcium channel blockers alter not only cardiac function but also blood flow to the kidney and liver, affecting elimination</td><td>Less blood flow to the organs of elimination, so the drug level stays high</td></tr>
</tbody></table>

<h4>Reading the A and B figure</h4>
<table class="reftab"><thead><tr><th>Increasing dose</th><th>Drug A</th><th>Drug B</th></tr></thead><tbody>
<tr><td>Therapeutic dose</td><td>Sedation</td><td>Sedation, at the same dose</td></tr>
<tr><td>Higher doses</td><td>Rises in a straight line through hypnosis and anesthesia to coma</td><td>Rises only to anesthesia and levels off there</td></tr>
</tbody></table>
<p>The keyed reading: the dose of B can be increased without the unwanted effect; A is the more dangerous drug in overdose. She glossed "the same therapeutic index" as "the same dose causing the therapy that you want"; in the same passage she also called the two indices different. The figure reading is what she keyed. <small>(T) 10/14</small></p>

<h4>Why</h4>
<ul>
<li><b>A and B.</b> At the therapeutic end the two curves sit on top of each other, so nothing at the therapeutic dose tells them apart. A's effect keeps climbing with dose until coma; B's curve flattens at anesthesia. A single number taken at the therapeutic end cannot show this, so the slide says to look at how the therapeutic and toxic curves overlap.</li>
<li><b>TCAs.</b> Seizures and increased muscle activity generate heat, and sweating would release it. At toxic doses the TCAs reduce sweating at the same time as they raise muscle activity and seizure risk, and the two together are really bad: the "double whammy". She said it is rare to save a patient in a TCA overdose.</li>
<li><b>Beta blockers and calcium channel blockers.</b> The excess cardiac effect lowers blood flow to the liver and kidneys. Those are the organs that eliminate the drug, so clearance falls and the level stays high. Here a pharmacodynamic change causes a kinetic one.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"They look the same. At the therapeutic dose and at the therapeutic endpoint we want. But in overdose, their outcomes are different" <small>(T) 10/14</small></li>
<li>"it's a double whammy in an overdose situation" <small>(T) 10/14</small></li>
<li>"Reducing blood flow to the kidneys and the liver, you're reducing the body's ability to eliminate the drug." <small>(T) 10/14</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Drug A picked as the one that can be increased safely.</b> B is: its curve stops at anesthesia.</li>
<li><b>Same therapeutic dose taken to mean equal safety.</b> The overlap of the curves at high doses decides safety.</li>
<li><b>Beta-blocker or calcium-channel-blocker overdose treated as a purely cardiac problem.</b> Reduced liver and kidney blood flow also slows elimination.</li>
<li><b>A TCA overdose seen as just more antidepressant effect.</b> The toxic effects (less sweating, more muscle activity and seizures) differ from the therapeutic action.</li>
</ul>

<p>How she asks it: read the A/B figure; the TCA double whammy; the extra effect of a cardiac drug overdose on elimination.</p>
<p class="sub">Sources: Treating Poisonings slide ‘How Pharmacodynamics change in Overdose’ (Katzung figure); (T) 10/14. Questions L15-050 to L15-052.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-9">
<h3>23. Three angles, four toxicokinetic methods, and preventing absorption</h3>

<h4>The idea</h4>
<p>A poisoned patient is treated from one of three angles: the kinetics of the poison, inactivating the poison, or the pharmacology (pharmacodynamics) of what it is doing. Toxicokinetic treatment aims to decrease the amount of poison in the body, hoping to reduce end-organ damage, and it has four methods. The first, preventing absorption, only works while the poison is still in the gut, and every one of its methods carries risk.</p>

<h4>Three angles and four toxicokinetic methods</h4>
<table class="reftab"><thead><tr><th>Angle</th><th>Methods</th></tr></thead><tbody>
<tr><td>Toxicokinetic</td><td>1. Prevent absorption. 2. Inhibit toxication (bioactivation) to a more toxic compound. 3. Enhance metabolism (detoxification). 4. Enhance elimination.</td></tr>
<tr><td>Inactivation of the poison</td><td>Section 29</td></tr>
<tr><td>Pharmacological</td><td>Section 30</td></tr>
</tbody></table>

<h4>The methods to prevent absorption</h4>
<table class="reftab"><thead><tr><th>Method</th><th>What it is</th><th>Risk or limit</th><th>Where medicine stands</th></tr></thead><tbody>
<tr><td>Emesis (ipecac)</td><td>Inducing vomiting to bring the poison up from the stomach</td><td>Aspiration, the biggest risk</td><td>No longer used; ipecac is no longer sold in the US or used in hospitals</td></tr>
<tr><td>Gastric lavage</td><td>A tube down to the stomach; fluid pumped in and sucked back out</td><td>The tube may go into the lungs; large tablets will not come up the tube; not with esophageal rupture or stomach problems</td><td>An experienced ER may try it for a massive, very dangerous ingestion. DiPiro: experienced clinicians only</td></tr>
<tr><td>Whole bowel irrigation</td><td>Drinking polyethylene glycol solution (GoLYTELY) or magnesium citrate until it passes through, as before a colonoscopy</td><td>The gut must be open: no ileus, no blockage. Messy; nursing staff dislike it</td><td>Likely tried for a massive ingestion. DiPiro lists sustained-release or enteric-coated drugs, iron, lithium, potassium and swallowed drug packets</td></tr>
<tr><td>Single-dose activated charcoal</td><td>A slurry of purified, very fine charcoal in water; the poison sticks to it and leaves in the feces</td><td>Patients often vomit and may aspirate. It does not bind every compound (DiPiro: not iron, lead, lithium, alcohols, aliphatic hydrocarbons or corrosives)</td><td>The best option by patient-outcome data (10/19). Window: her lecture, within 1 to 2 hours, "up to 2 hours. They used to say just an hour" (10/19); her Quiz 3 key, less than 60 minutes</td></tr>
<tr><td>Multiple-dose activated charcoal</td><td>Repeated charcoal doses; also used, when appropriate, after the toxin has been absorbed</td><td>Only for a poison that sticks to charcoal and undergoes enterohepatic recirculation</td><td>DiPiro names carbamazepine, dapsone, phenobarbital, quinine and theophylline</td></tr>
</tbody></table>
<p>The American and European poison control organizations have stated that these methods are dangerous and should be used only when judged necessary, which leaves the decision to the emergency room. DiPiro cites the American and European clinical toxicology position statements: no method of gastric decontamination should be used routinely. <small>(T) 10/14; DiPiro ch. e9</small></p>

<h4>Why</h4>
<ul>
<li><b>Why every method is toxicokinetic.</b> Each of the four lowers the amount of poison acting in the body: less gets in, less is turned into a toxic metabolite, more is detoxified, more is removed.</li>
<li><b>Why charcoal has a time window.</b> Charcoal can bind only what is still in the stomach and small intestine. Swallowed material moves on through and is absorbed, so after the window there is little left for a single dose to bind.</li>
<li><b>Why multiple doses can work after absorption.</b> A drug with enterohepatic recirculation goes from the liver into the bile and is put back into the small intestine. A second or third dose of charcoal catches it there, and it leaves in the feces. A drug that does not recirculate, or does not stick to charcoal, gains nothing from repeat doses.</li>
<li><b>Why emesis was abandoned.</b> Its main risk, aspiration, is not worth the benefit.</li>
<li><b>Why risky methods are still tried.</b> With a massive ingestion that probably cannot be survived otherwise, the benefit may outweigh the risks.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"What's the risk of emesis? Aspiration is the biggest risk." <small>(T) 10/14</small></li>
<li>"not every compound a person ingests is going to be grabbed and absorbed by charcoal." <small>(T) 10/14</small></li>
<li>"the use of multiple dose activated charcoal is limited to things that get stuck on charcoal and undergo that recirculation" <small>(T) 10/14</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>"Emesis is considered the first line in treating an orally ingested poison."</b> False (Quiz 3 Q7).</li>
<li><b>The charcoal window.</b> On her Quiz 3, "less than 60 minutes after ingestion" is keyed over "2-4 hours", "any time" and "no sooner than 24 hours". In lecture she allowed up to 2 hours.</li>
<li><b>Charcoal for any poison.</b> It binds only some compounds.</li>
<li><b>Multiple-dose charcoal for any overdose.</b> Only for compounds that both bind charcoal and recirculate.</li>
<li><b>Enhancing metabolism by inducing metabolizing enzymes.</b> The statement that is NOT correct on Quiz 3 (Q9): induction takes days (section 27).</li>
</ul>

<p>How she asks it: name the three approaches and the four kinetic methods; the biggest risk of emesis; what each absorption-prevention method is and its risk; when multiple-dose charcoal applies; the charcoal time window.</p>
<p class="sub">Sources: Treating Poisonings slides ‘General principles for treating the poisoned patient’, ‘Toxicokinetic-Based Treatment’, ‘Toxicokinetic-Based Treatment Prevent Absorption’, ‘More on preventing absorption’; DiPiro ch. e9 (General Approach to Treatment); (T) 10/14, 10/19; Quiz 3 Q7 to Q9. Questions L15-053 to L15-062.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l15-10">
<h3>24. Evidence-based guidelines for overdoses</h3>

<h4>The idea</h4>
<p>For a short list of drugs and compounds, expert panels have written Evidence-Based Consensus Guidelines for Out-of-Hospital Management: what to do when someone is found after an overdose, before any hospital is involved, and who must be sent in. Overdoses cannot be studied in clinical trials, so the guidelines are built from published case reports and case series, and both the evidence and the recommendations are graded. Two objectives come from this part: know which compounds have these guidelines, and describe the information in them.</p>

<h4>Which compounds have guidelines</h4>
<table class="reftab"><thead><tr><th>Medications</th><th>Not medications</th></tr></thead><tbody>
<tr><td>Acetaminophen; atypical antipsychotics; beta-blockers; calcium channel blockers; dextromethorphan; diphenhydramine and dimenhydrinate; iron; methylphenidate; salicylate; selective serotonin reuptake inhibitors; TCAs; valproic acid</td><td>Elemental mercury; ethylene glycol; long-acting anticoagulant rodenticides</td></tr>
</tbody></table>
<p class="sub">Slide ‘Guidelines for Overdoses’; on 10/19 she pointed out that the right-hand column is not medications.</p>

<h4>How the guidelines are made</h4>
<ul>
<li><b>Data.</b> Clinicians, pharmacists and physicians write up the overdoses they treat and publish them as case reports or case series. The experts who wrote the guidelines pulled all of these and evaluated every one. <small>(T) 10/14, 10/19</small></li>
<li><b>Not trials, rarely animals.</b> A clinical trial of deliberate overdose would not be ethical. Animals are used very rarely, only to find out whether a treatment really works. <small>(T) 10/14</small></li>
<li><b>Evidence based.</b> They rank the data used and rank the strength of each recommendation. In the beta-blocker guideline the seven recommendations carry grades D, C, A, C, D, D, D; in the calcium channel blocker guideline all seven are grade D. Case reports and case series count as level 4 evidence, expert opinion as level 5. <small>(T) 10/19; reading cards aapcc-bb, aapcc-ccb</small></li>
<li><b>Venue and users.</b> Both were published in 2005 in Clinical Toxicology (she called it the Journal of Clinical Toxicology) and are still followed. They were written for poison center staff, who know them in detail. <small>(T) 10/19; reading cards</small></li>
</ul>

<h4>What information is in them</h4>
<p>Her reading guide asks each document the same questions:</p>
<ul>
<li>How to reduce absorption (no vomiting at home; activated charcoal is for the hospital, and transport is not delayed to give it).</li>
<li>For a patient who is asymptomatic when found: a time window, by formulation, inside which the patient goes to the hospital and after which home care with poison center follow-up is reasonable.</li>
<li>What to do for a symptomatic patient, how to transport (ambulance), how long to follow up, and what to do if self-harm is suspected.</li>
<li>In the full documents, dose thresholds for referral. <small>reading cards</small></li>
</ul>
<p>The two documents differ in two ways she named on 10/14: beta blocker vs calcium channel blocker, even though both are cardiac drugs, and immediate-release vs extended-release tablets. <small>(T) 10/14</small></p>

<h4>Why</h4>
<ul>
<li>Deliberately poisoning volunteers is unethical, so the only human evidence is real cases written up after the fact.</li>
<li>That evidence is weaker than a trial, so grading shows how much weight each recommendation can carry. Ranking the data and the recommendations is what "evidence based" means here; it does not require a trial.</li>
<li>The guidelines are written for poison center staff taking calls about patients who are still at home, so they are about out-of-hospital triage: who must go to the emergency department and who can stay home.</li>
<li>Immediate- and extended-release products get different windows because extended-release tablets can form bezoars that break apart at unpredictable times, so the time of absorption cannot be known (her key; section 31).</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"The data for these evidence-based guidance documents comes from people overdosing, clinicians, pharmacists, doctors write up the case, get it published, and it's in the literature." <small>(T) 10/14</small></li>
<li>"They rank the data that they have to create these documents, and they rank the strength of the recommendations they make in these documents. That's what is meant by evidence-based." <small>(T) 10/19</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>The data come from clinical trials (or from animal studies).</b> From published case reports and case series; trials would be unethical and animals are rarely used.</li>
<li><b>Called not evidence based because there are no trials.</b> Graded evidence and graded recommendations make it evidence based.</li>
<li><b>Ethylene glycol left off the list because it is not a drug.</b> It has a guideline, in the non-medication group with elemental mercury and long-acting anticoagulant rodenticides.</li>
<li><b>Inducing vomiting at home.</b> Neither guideline recommends it.</li>
</ul>

<p>How she asks it: which compounds have guidelines; where the evidence comes from and what makes it evidence based; the kinds of information in the documents; the two contrasts the beta-blocker and calcium channel blocker documents draw.</p>
<p class="sub">Sources: Treating Poisonings slides ‘Guidelines for Overdoses’, ‘Discussion of OD Guidelines’, ‘Treating specific poisonings Table’; the two guideline reading cards; her reading-guide key; (T) 10/14, 10/19. Questions L15-063 to L15-065.</p>
</section>

<!-- ===================================================================== -->
<!-- ===== Day 16 (10/19) ===== -->
<!-- ===================================================================== -->
<!-- ===================================================================== -->
<section class="guide" id="guide3-l16-1">
<h3>25. Preventing absorption revisited; inhibiting bioactivation (methanol, ethylene glycol)</h3>

<h4>The idea</h4>
<p>Bioactivation is metabolism that turns what was ingested into something more toxic. If the harm comes from the metabolites and the first enzyme of the pathway can be blocked, blocking that enzyme keeps the poison in its less harmful parent form. Methanol and ethylene glycol are the classic examples, and there are not many others. Both are first metabolized by alcohol dehydrogenase (ADH), so one antidote, ethanol or fomepizole, treats both.</p>

<h4>Charcoal, as reviewed on 10/19</h4>
<ul>
<li>By patient-outcome data, activated charcoal is probably the best of the methods to prevent absorption, with the caveats that it does not bind everything and carries its own risk. <small>(T) 10/19</small></li>
<li>Single dose: up to 2 hours after ingestion ("They used to say just an hour"); her Quiz 3 key: less than 60 minutes. The window exists because swallowed material moves on through the gut. <small>(T) 10/19; Quiz 3 Q8</small></li>
<li>Multiple dose: for a poison that charcoal binds and that undergoes enterohepatic recirculation; each new dose catches drug put back into the small intestine with the bile. <small>(T) 10/19</small></li>
</ul>

<h4>Methanol and ethylene glycol</h4>
<table class="reftab"><thead><tr><th></th><th>Methanol</th><th>Ethylene glycol</th></tr></thead><tbody>
<tr><td>Pathway</td><td>ADH → formaldehyde → formaldehyde dehydrogenase → formic acid</td><td>ADH → glycoaldehyde → aldehyde dehydrogenase → glycolic acid → several more steps → oxalic acid</td></tr>
<tr><td>Toxic product</td><td>Formic acid</td><td>Oxalic acid</td></tr>
<tr><td>Damage</td><td>The eyes: formic acid damages the retina and sight is lost. Slide: metabolic acidosis and tissue injury. Her key: anion-gap metabolic acidosis and ocular toxicity</td><td>Oxalic acid precipitates as microcrystals in the small vessels, blocks blood flow and damages organs (she named the liver and kidneys). Her key: renal toxicity is common</td></tr>
<tr><td>Who is exposed</td><td>Mostly people with an alcohol use disorder who cannot get ethanol</td><td>Antifreeze: it smells and tastes sweet, so pets and small children drink it; the pink or blue color is a dye</td></tr>
<tr><td>Antidote</td><td colspan="2">Ethanol or fomepizole: both block ADH</td></tr>
</tbody></table>

<h4>Ethanol vs fomepizole</h4>
<table class="reftab"><thead><tr><th></th><th>Ethanol</th><th>Fomepizole</th></tr></thead><tbody>
<tr><td>How it blocks ADH</td><td>Outcompetes methanol or ethylene glycol for the enzyme</td><td>Binds to and inhibits the enzyme</td></tr>
<tr><td>In practice</td><td>Emergency rooms once kept a bottle of Everclear and gave a shot or two</td><td>Better control of the dosing</td></tr>
<tr><td>Her key's answer: is one better?</td><td colspan="2">Fomepizole: a stronger ADH inhibitor, with fewer adverse effects than ethanol</td></tr>
</tbody></table>

<h4>Why</h4>
<ul>
<li>ADH is the first step in both pathways, so blocking it stops every downstream metabolite, including the toxic acids. That is why a single antidote serves both poisons.</li>
<li>Methanol's damage comes from formic acid, not from methanol itself, so preventing the metabolism prevents the blindness. Ethylene glycol's damage comes from oxalic acid crystals in the microvasculature, so preventing the metabolism protects the kidneys.</li>
<li>Fomepizole is classified as inhibition of bioactivation, a toxicokinetic treatment: it blocks the step that makes the toxic metabolite; it does not speed up detoxification or elimination (Quiz 3 Q1).</li>
<li>This approach exists only where metabolism makes the poison worse and the enzyme can be blocked; she said there are not many such cases.</li>
<li>Exposure explains the patients: antifreeze is sweet and does not burn going down, so children and animals swallow it; methanol gives the same effect as ethanol, so it is drunk when ethanol is not available.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"There are not many cases where we can do this, where we can actually prevent the metabolism to a more toxic metabolite" <small>(T) 10/19</small></li>
<li>"This is the compound in the bioactivation of methanol that is toxic. Formic acid will cause damage, especially to the eyes, to the retina of the eyes." <small>(T) 10/19</small></li>
<li>"So you need to get that charcoal in their stomach and small intestine while the poison is still in that area of the body" <small>(T) 10/19</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>"Omeprazole" as the antidote.</b> The transcript renders fomepizole as omeprazole; the slide and her key say fomepizole. Omeprazole is a proton pump inhibitor.</li>
<li><b>Fomepizole classed as enhancing detoxification or elimination.</b> It inhibits bioactivation (Quiz 3 Q1).</li>
<li><b>Formaldehyde named as methanol's toxic compound.</b> She named formic acid.</li>
<li><b>Eye damage given to ethylene glycol.</b> That is methanol; ethylene glycol forms oxalic acid crystals and is hard on the kidneys.</li>
<li><b>Antifreeze color.</b> The pink or blue is a dye, not ethylene glycol.</li>
</ul>

<p>How she asks it: which metabolite of methanol is toxic and what it damages; what ethylene glycol ends up as and why that hurts; the antidote for both, its mechanism and which is better; which of the four kinetic methods fomepizole represents.</p>
<p class="sub">Sources: Treating Poisonings slides ‘Toxicokinetic-Based Treatment Prevent Absorption’, ‘Inhibit Bioactivation’, ‘methanol and ethylene glycol examples’; DiPiro ch. e9; her poisoning-table key (toxic alcohols row); (T) 10/19; Quiz 3 Q1, Q8. Questions L16-001 to L16-009, GAP3-001 to GAP3-004.</p>
<!--STEP:methanol-eg-->
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l16-2">
<h3>26. Recognizing the poisoning: blood tests and toxidromes</h3>

<h4>The idea</h4>
<p>A poisoned patient often cannot or will not say what was taken: an unconscious patient cannot, and people who intended to hurt themselves often do not. Recognition therefore runs in two steps. First, the group of signs and symptoms (a toxidrome) suggests a drug class. Then, if the hospital laboratory can measure the suspected compound, a blood test confirms it. Otherwise the diagnosis stays a guess.</p>
<p>In class she defined the toxidrome and showed the table without walking through its rows; her Quiz 3 question 5 then tested the opioid row, so the rows are tested material.</p>

<h4>What emergency rooms test the blood for</h4>
<ul>
<li>The common overdoses that can be detected in blood: acetaminophen, salicylates, iron, beta blockers, calcium channel blockers, opiates, and a few others. <small>(T) 10/19</small></li>
<li>For methanol or ethylene glycol (section 25), the key indicator is a blood draw that looks for these alcohols; the patient may arrive unconscious or sedated. <small>(T) 10/19</small></li>
</ul>

<h4>The toxidromes (Goodman and Gilman Table 4-7)</h4>
<table class="reftab"><thead><tr><th>Toxidrome (examples)</th><th>Mental status</th><th>Increased</th><th>Decreased</th><th>Other</th></tr></thead><tbody>
<tr><td>Sympathomimetic (cocaine, amphetamine)</td><td>Agitation</td><td>HR, BP, T, pupil size</td><td></td><td>Tremor, diaphoresis</td></tr>
<tr><td>Anticholinergic (diphenhydramine, atropine)</td><td>Delirium</td><td>HR, BP, T, pupil size</td><td></td><td>Ileus, flushing</td></tr>
<tr><td>Cholinergic (organophosphates)</td><td>Somnolence, coma</td><td>RR</td><td>Pupil size</td><td>SLUDGE (salivation, lacrimation, urination, defecation, gastric cramping, emesis), fasciculation</td></tr>
<tr><td>Opioid (heroin, oxycodone)</td><td>Somnolence, coma</td><td></td><td>HR, RR, pupil size</td><td></td></tr>
<tr><td>Sedative-hypnotic (benzodiazepines, barbiturates)</td><td>Somnolence, coma</td><td></td><td>BP, RR</td><td></td></tr>
<tr><td>Salicylate (aspirin)</td><td>Confusion</td><td>HR, RR, T</td><td></td><td>Diaphoresis, vomiting</td></tr>
<tr><td>Calcium channel blocker (verapamil)</td><td>(none listed)</td><td></td><td>HR, BP</td><td></td></tr>
</tbody></table>
<p class="sub">HR heart rate; BP blood pressure; RR respiratory rate; T temperature. Read from the slide ‘Toxidromes’.</p>
<!--IMG:smith-tp-toxidromes-->

<h4>Why</h4>
<ul>
<li><b>Each row follows from what the drug class does.</b> Organophosphates inhibit acetylcholinesterase, so acetylcholine builds up: her table key lists acetylcholine excess (SLUDGE) for them, and the row shows small pupils. The belladonna alkaloids (jimsonweed) are anticholinergic and dilate the pupils, which is the anticholinergic row's increased pupil size. The opioid row (somnolence, slow heart and breathing, small pupils) is the one naloxone, an opioid receptor antagonist, reverses (section 30).</li>
<li><b>The rows match her poisoning-table key.</b> Opioids: somnolence, coma, decreased heart and breath rates, decreased pupils. Salicylates: hyperventilation, hyperthermia and confusion, which are the increased RR, T and the confusion in the salicylate row. Calcium channel blockers: hypotension and bradycardia, "but often alert", which is why the row lists no mental-status change; her key adds that a beta-blocker overdose may alter mental status, which helps tell the two apart.</li>
<li><b>Telling look-alike rows apart.</b> Sympathomimetic and anticholinergic both raise HR, BP, T and pupil size; sweating (diaphoresis) and tremor point to sympathomimetic, while ileus and flushing with delirium point to anticholinergic. Opioid and sedative-hypnotic both give somnolence or coma and slow breathing; small pupils and a slow heart point to opioid, low blood pressure without a pupil change to sedative-hypnotic.</li>
<li><b>Why the toxidrome comes first.</b> Symptoms can be seen as soon as the patient arrives; the blood test can only confirm a suspicion, and only if the laboratory can measure that compound.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"kind of a group of symptoms that are like, oh hey, look, this person has this, this and this. I wonder if they've been exposed to this compound." <small>(T) 10/19</small></li>
<li>"Then you would verify it by doing a blood draw if you can." <small>(T) 10/19</small></li>
<li>"Other than that, sometimes it's just a guess." <small>(T) 10/19</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Increased pupil size in an opioid overdose.</b> Not part of the opioid toxidrome; the pupils are small. Her Quiz 3 Q5 keyed "Increased pupil size" as the symptom that is NOT part of it (decreased heart rate, decreased breath rate and somnolence are).</li>
<li><b>Cholinergic and anticholinergic pupils swapped.</b> Cholinergic (organophosphates): small. Anticholinergic: large.</li>
<li><b>Altered mental status expected in a calcium channel blocker overdose.</b> Her key: often alert; the table lists no mental-status change.</li>
<li><b>Sedative-hypnotic given small pupils.</b> The table lists no pupil change; small pupils point to an opioid.</li>
</ul>

<p>How she asks it: how a methanol or ethylene glycol poisoning is confirmed; which overdoses the emergency room screens blood for; what a toxidrome is; which symptom is not part of a given toxidrome (Quiz 3). The objectives slide: "Describe the toxidromes discussed in class."</p>
<p class="sub">Sources: Treating Poisonings slide ‘Toxidromes’ (Goodman & Gilman Table 4-7); her poisoning-table key (opioids, organophosphates, salicylates, beta blockers, calcium channel blockers); (T) 10/19; Quiz 3 Q5. Questions L16-010 to L16-013, GAP3-005 to GAP3-012, QZ3-014.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l16-3">
<h3>27. Enhance metabolism: give cofactors, not inducers (cyanide; acetaminophen and N-acetylcysteine)</h3>

<h4>The idea</h4>
<p>One toxicokinetic way to treat a poisoning is to speed up the body's own detoxification of the poison. Inducing more metabolizing enzyme would do that, but induction takes a few days, which is too slow for a poisoned patient. What can be done quickly is to supply more of a cofactor or ingredient that an existing detoxifying reaction uses up, so that the reaction keeps running faster. Her two examples are cyanide and acetaminophen.</p>

<h4>Cyanide: three agents, and only one of them enhances metabolism</h4>
<p><b>The problem.</b> Cyanide's target is cytochrome c oxidase, an enzyme of the electron transport chain. Cyanide displaces the oxygen bound in the enzyme and stops it from working, so cells stop making ATP: "you basically suffocate". <small>(T) 10/19</small></p>
<table class="reftab"><thead><tr><th>Step</th><th>Agent</th><th>What it does</th><th>Why the next step is needed</th></tr></thead><tbody>
<tr><td>1</td><td>Amyl nitrite</td><td>Oxidizes the iron of hemoglobin, making methemoglobin. Methemoglobin pulls cyanide off cytochrome c oxidase onto itself (cyanmethemoglobin), so the enzyme is regenerated and cellular respiration resumes. This step is removal of the poison from its active site (section 30).</td><td>The cyanide is still in the body, now bound to methemoglobin.</td></tr>
<tr><td>2</td><td>Sodium thiosulfate, used by the enzyme rhodanese</td><td>Rhodanese, the body's own enzyme, moves the cyanide off methemoglobin onto sulfur supplied by thiosulfate. The product (labeled thiocyanate on the figure) is eliminated by the kidneys. The rhodanese pathway is capacity limited; giving thiosulfate donates the sulfur and increases how much cyanide rhodanese can convert (Marraffa, p. 204). <b>This is the enhance-metabolism step.</b> She described it as "giving them this cofactor called rodonase"; the agent actually given is sodium thiosulfate.</td><td>The patient now has a large amount of methemoglobin, which cannot carry oxygen.</td></tr>
<tr><td>3</td><td>Methylene blue</td><td>A reducing agent: converts methemoglobin back to hemoglobin, so the blood can carry oxygen again.</td><td>None; the patient is treated.</td></tr>
</tbody></table>
<p class="antirow">Diagrams: <button type="button" class="chip antichip" data-anti="01-cyanide-pathway-overview">◧ Cyanide: overview</button><button type="button" class="chip antichip" data-anti="03-cyanide-antidote-stepper">◧ Cyanide: step by step</button><button type="button" class="chip antichip" data-anti="02-cyanide-small-molecules">◧ Cyanide: molecules</button></p>

<h4>Acetaminophen: N-acetylcysteine supplies the ingredients for glutathione</h4>
<ul>
<li><b>The toxic metabolite.</b> Acetaminophen is metabolized to NAPQI, which she calls "that free radical, that's nasty, damages liver". <small>(T) 10/19</small></li>
<li><b>The body's detoxification.</b> Glutathione, with the help of the glutathione S-transferase (GST) enzymes, conjugates NAPQI so it can be eliminated. The body makes glutathione all the time and keeps stores of it. <small>(T) 10/19</small></li>
<li><b>What NAC does.</b> N-acetylcysteine (NAC) provides some of the ingredients the body needs to make more glutathione. More glutathione means more NAPQI conjugated and eliminated, so NAC can be called a cofactor that enhances the metabolism and elimination of NAPQI. NAC does not neutralize the free radical itself. Her poisoning-table key: NAC "replenishes glutathione"; it loses effectiveness about 8 hours after the overdose, and it should still be given past that point. <small>(T) 10/19; table key</small></li>
<li><b>In practice.</b> NAC is a clear, oily liquid that smells like rotten eggs (a sulfur smell). It can be given orally or IV; in the United States it is usually given IV, because a patient will hardly swallow it. If the hospital stocks both forms, give the IV formulation when giving it IV (purity, no particulates). Methylene blue, by contrast, does not smell but stains skin blue. <small>(T) 10/19</small></li>
</ul>

<h4>Why</h4>
<ul>
<li>Induction raises the amount of enzyme, but making new enzyme takes days, so it cannot help in time. A cofactor works on the enzyme already present, so it acts right away.</li>
<li>The rhodanese pathway is capacity limited. Thiosulfate donates the sulfur the reaction uses, so more cyanide is converted and eliminated. That is why this step, and not amyl nitrite or methylene blue, is enhancing metabolism: it speeds up a metabolic reaction the body already runs.</li>
<li>Glutathione conjugation is the reaction that clears NAPQI. NAC supplies ingredients for making more glutathione, so more NAPQI can be conjugated and eliminated: the same logic as thiosulfate for rhodanese.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"It takes a few days, so we can't treat our patient fast enough with that. ... What we can do is try to enhance the metabolism by giving cofactors for those metabolizing reactions" <small>(T) 10/19</small></li>
<li>"it's giving ingredients to the system to create more glutathione." <small>(T) 10/19</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>"Enhance metabolism by inducing metabolizing enzymes."</b> False (Quiz 3, the statement that is NOT correct): induction takes days.</li>
<li><b>Which cyanide agent enhances metabolism?</b> The rhodanese and thiosulfate step. Amyl nitrite (making methemoglobin) is removal from the active site; methylene blue only restores hemoglobin.</li>
<li><b>Oxidize vs reduce.</b> Amyl nitrite oxidizes hemoglobin to methemoglobin; methylene blue reduces methemoglobin back to hemoglobin.</li>
<li><b>Rhodanese vs thiosulfate.</b> Rhodanese is the body's enzyme; sodium thiosulfate is the agent given.</li>
<li><b>"NAC is an antioxidant that neutralizes the free radical."</b> No: it supplies ingredients for glutathione, and glutathione conjugates NAPQI.</li>
<li><b>"After 8 hours NAC is useless, so stop."</b> Her key: it loses effectiveness at about 8 hours, and you still give it.</li>
</ul>

<p>How she asks it: cyanide's target and what happens; what each of the three agents does and which one enhances metabolism; what NAC does and what conjugates NAPQI; why induction is not used.</p>
<p class="sub">Sources: Treating Poisonings slides ‘Toxicokinetic-Based Treatment Enhance Metabolism’, ‘Cyanide example’, ‘Acetaminophen Example’; Marraffa 2012; her poisoning-table key; Quiz 3 key; (T) 10/19. Questions L16-014 to L16-022.</p>
<!--STEP:apap-nac-->
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l16-4">
<h3>28. Enhance elimination: ion trapping with bicarbonate; extracorporeal methods</h3>

<h4>The idea</h4>
<p>Many poisons are filtered at the glomerulus into the forming urine and then reabsorbed back into the blood, so the poisoning continues. Enhancing renal elimination means stopping that reabsorption so the poison leaves in the urine. The common way is ion trapping. When the kidneys cannot clear the poison well enough, the blood can be cleaned outside the body (extracorporeal methods).</p>

<h4>The methods</h4>
<table class="reftab"><thead><tr><th>Method</th><th>How it works</th><th>Used for</th><th>Limit</th></tr></thead><tbody>
<tr><td>Ion trapping: IV sodium bicarbonate</td><td>Bicarbonate makes the urine more basic (higher pH). A weakly acidic poison, uncharged at normal urine pH, becomes negatively charged and cannot be reabsorbed, so it stays in the urine.</td><td>Weak acids: salicylates and barbiturates such as phenobarbital (slide: "very effective")</td><td>Not done for weak bases</td></tr>
<tr><td>Hemodialysis, hemofiltration, hemoperfusion</td><td>Artificially clear the toxin from the plasma</td><td>Very severe poisonings where other treatments are not working</td><td>Works only for toxins with a small volume of distribution; whether it works depends on the chemistry of the poison ("Dialysis doesn't grab everything")</td></tr>
<tr><td>Plasma exchange, exchange transfusion</td><td>Named only</td><td>Patients who are "really bad"</td><td></td></tr>
</tbody></table>
<p>Dialysis itself is taught in the renal module. <small>(T) 10/19</small></p>

<h4>Why</h4>
<ul>
<li><b>Why a charge traps the poison.</b> Most of the transporters that reabsorb solutes from the urine back into the blood move uncharged molecules. A weak acid in basic urine carries a negative charge, so it cannot be reabsorbed and is excreted. No Henderson-Hasselbalch calculations are required. <small>(T) 10/19</small></li>
<li><b>Why not for weak bases.</b> Trapping a weak base would need acidic urine, and making the urine acidic would mean acidifying the patient's blood, which is dangerous. Cranberry juice acidifies urine, but not to a low enough pH and not fast enough. <small>(T) 10/19</small></li>
<li><b>Why a large volume of distribution defeats extracorporeal removal.</b> A large volume of distribution means the drug is not staying in the blood vessels; it is distributed and sequestered in places such as fat, muscle and bone. The machine can only clean the blood, so most of the drug stays out of reach and keeps returning to the blood, and removal would take a very long time. <small>(T) 10/14; slide</small></li>
</ul>

<h4>Her words</h4>
<ul>
<li>"So you continue the poisoning by the reabsorption of that compound from the forming urine into the systemic circulation." <small>(T) 10/19</small></li>
<li>"giving the patient sodium bicarb by IV, the sodium bicarb goes into the urine and will charge that acid, and it can't be reabsorbed when it's charged." <small>(T) 10/19</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Which charge?</b> Negative: a weak acid in basic urine is ionized as an anion.</li>
<li><b>Bicarbonate makes the urine acidic.</b> No: it makes the urine more basic (raises the pH).</li>
<li><b>Ion trapping for a weakly basic poison.</b> Not done: acidifying the blood is too dangerous.</li>
<li><b>Bicarbonate in a tricyclic antidepressant overdose.</b> Her table key gives it for the widened QRS interval, to counteract the inhibition of cardiac sodium channels. That is a different purpose from ion trapping, which is the reason it is given for salicylates.</li>
<li><b>Dialysis for any poison.</b> Only for a small volume of distribution, and only if the poison's chemistry allows it to be removed.</li>
</ul>

<p>How she asks it: what bicarbonate does to the urine and to a weak acid; the resulting charge; why it is not done for weak bases; which methods are extracorporeal, when they are used, and why volume of distribution matters.</p>
<p class="sub">Sources: Treating Poisonings slides ‘Toxicokinetic-Based Treatment Enhance Renal Elimination’, ‘Extracorporeal enhancement of elimination’; her poisoning-table key; (T) 10/14, 10/19. Questions L16-023 to L16-028.</p>
<!--STEP:ion-trapping-->
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l16-5">
<h3>29. Inactivation of poisons: chelators, antivenoms and antibodies</h3>

<h4>The idea</h4>
<p>The first goal in a poisoning is to prevent absorption. Once the poison has been absorbed into the systemic circulation and is not readily eliminated, some poisons can be inactivated: a second molecule binds the poison so it can no longer reach its target, and the poison-inactivator complex is then cleared from the body. This is what she officially calls an antidote. The two groups of inactivators are heavy metal chelators, and antivenoms and antibodies.</p>

<h4>What a good inactivator needs, and why</h4>
<table class="reftab"><thead><tr><th>Property</th><th>Why</th></tr></thead><tbody>
<tr><td>Binds the toxin and prevents it from interacting with its target</td><td>It has to grab the poison so that no part of it can still touch the target. An inactivator that binds only one end of the poison leaves the other end active.</td></tr>
<tr><td>High affinity for the toxin</td><td>Otherwise massive amounts of inactivator would be needed, and the inactivator could cause side effects of its own.</td></tr>
<tr><td>The complex has low toxicity (she changed it to "no toxicity")</td><td>Binding is useless if the bound complex is still poisonous.</td></tr>
<tr><td>The complex is cleared from the body</td><td>The poison has to leave the body, not just sit bound in it.</td></tr>
</tbody></table>
<p><small>(T) 10/19; slide ‘Inactivation of Poisons’</small></p>

<h4>Heavy metal chelators</h4>
<ul>
<li><b>What they bind:</b> lead, mercury, cadmium, iron, copper.</li>
<li><b>How:</b> small molecules with a nucleophilic electron donor that binds the metal tightly, forming a metal-ligand complex. They are usually multidentate: one chelator holds one metal atom at several points (her picture: "kind of looks like a spider ... The legs are binding one atom of that copper"), or several chelator molecules bind one metal atom. Structures are not required.</li>
<li><b>Requirements:</b> higher affinity for the toxic metal than for the body's own macromolecules; low affinity for endogenous ions, such as magnesium in enzymes and especially calcium ("a most common concern"), because the body needs those; water soluble, non-toxic and readily cleared.</li>
</ul>
<table class="reftab"><thead><tr><th>Chelating agent</th><th>Metal chelated</th><th>Note</th></tr></thead><tbody>
<tr><td>Edetate disodium</td><td>Lead</td><td></td></tr>
<tr><td>Dimercaprol (British anti-Lewisite, BAL)</td><td>Gold, arsenic, lead, mercury</td><td></td></tr>
<tr><td>Succimer</td><td>Lead, cadmium, mercury, arsenic</td><td></td></tr>
<tr><td>Deferoxamine</td><td>Iron</td><td>Her table key: chelates the circulating ferric iron in an iron overdose</td></tr>
<tr><td>Deferasirox</td><td>Iron</td><td>Orally bioavailable, recently FDA approved: "it's oral"</td></tr>
<tr><td>Penicillamine and trientine</td><td>Copper</td><td>Usually for patients with Wilson's disease, a genetic disease with very high copper levels that damage organs</td></tr>
</tbody></table>
<p>"please memorize this table ... know the chelating agent and know what metal it grabs." Side effects are not covered. <small>(T) 10/19; slide ‘Example Chelating Agents’</small></p>

<h4>Antivenoms and antibodies</h4>
<ul>
<li><b>Requirement:</b> high affinity and high specificity for what they bind. <small>(T) 10/19</small></li>
<li><b>How a polyclonal antivenom is made.</b> An animal is inoculated with small amounts of a snake venom, not enough to kill it. Its immune system makes antibodies against the venom; its blood is drawn and those antibodies are filtered out. The product is a collection of antibodies against the venom, not one single genetically identical antibody. Many snake-bite antivenoms are still polyclonal. <small>(T) 10/19</small></li>
<li><b>The danger: serum sickness.</b> The patient's body reacts against the many foreign animal antibodies while also fighting the venom. The result is a type III hypersensitivity reaction, also called serum sickness: fever, nausea, malaise. <small>(T) 10/19</small></li>
<li><b>Digoxin immune Fab.</b> The one antibody that treats a drug overdose. She called it a monoclonal antibody made to treat digoxin overdose; the FDA label describes ovine Fab fragments, from sheep immunized with a digoxin derivative. Her table key: digoxin-specific antibody fragments bind digoxin and are eliminated by the kidneys; after Fab is given, measuring serum digoxin does not help, because the total digoxin concentration (free plus bound to Fab) rises, so it cannot be used to calculate further Fab doses. <small>(T) 10/19; table key</small></li>
<li><b>Not yet available.</b> A monoclonal antibody for opioid overdose, and monoclonals for other snake bites, are being developed but she does not think they are on the market. <small>(T) 10/19</small></li>
<li><b>Supply.</b> Antivenoms have been in shortage (coral snake antivenom in recent years) and are too expensive to stock in small rural hospitals; hospitals use a network, probably through the poison centers, to find and send antivenom. <small>(T) 10/19</small></li>
</ul>

<h4>Her words</h4>
<ul>
<li>"this will work only once the compound unfortunately has been absorbed into the systemic circulation" <small>(T) 10/19</small></li>
<li>"an anti-venom or an antibody has to have high affinity and high specificity for whatever it is trying to grab out of your body." <small>(T) 10/19</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>"The antidote-poison complex does not need to be cleared."</b> False (Quiz 3, the EXCEPT answer): the complex must be cleared.</li>
<li><b>A chelator that also binds calcium.</b> A bad chelator: it must have low affinity for endogenous ions.</li>
<li><b>Inactivation prevents absorption.</b> No: it works on poison already in the circulation.</li>
<li><b>Iron chelators.</b> Deferoxamine and deferasirox; the oral one is deferasirox. Copper (Wilson's disease): penicillamine and trientine.</li>
<li><b>Serum sickness type.</b> Type III hypersensitivity, caused by the polyclonal animal antibodies.</li>
<li><b>Checking digoxin levels after Fab.</b> Not helpful: the measured total includes digoxin bound to Fab.</li>
</ul>

<p>How she asks it: the properties of an inactivator and of a chelator; which chelator binds which metal; how a polyclonal antivenom is made and why it causes serum sickness; what digoxin immune Fab is and does.</p>
<p class="sub">Sources: Treating Poisonings slides ‘Inactivation of Poisons’, ‘Heavy Metal Chelators’, ‘Structure of chelators’, ‘Example Chelating Agents’, ‘Antivenoms and Antibodies’; her poisoning-table key; Quiz 3 key; (T) 10/19. Questions L16-029 to L16-038.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l16-6">
<h3>30. Pharmacological treatment: antagonist, agonist, removal from the active site, bypass</h3>

<h4>The idea</h4>
<p>The pharmacodynamic way to treat a poisoning is to counteract what the poison does: give a drug with the opposite pharmacological action, or give something that goes around a metabolic pathway the poison has blocked. The slide sorts these treatments into four categories. To place an example, ask what the poison does at its target, then what the treatment does about it. She said the examples illustrate the concept: "The examples are just examples."</p>

<h4>The four categories</h4>
<table class="reftab"><thead><tr><th>Category</th><th>What the poison does</th><th>Example: poison → treatment</th><th>How the treatment works</th></tr></thead><tbody>
<tr><td>Treatment is a receptor antagonist</td><td>Acts as an agonist</td><td>Opioid → naloxone</td><td>Antagonist at the opioid receptor</td></tr>
<tr><td></td><td></td><td>Benzodiazepine → flumazenil</td><td>Benzodiazepines act on the GABA-A (benzodiazepine) receptor; flumazenil antagonizes that receptor</td></tr>
<tr><td></td><td></td><td>Organophosphate pesticide → atropine</td><td>Organophosphates inhibit acetylcholinesterase, so acetylcholine builds up in the synaptic cleft (cholinergic excess); atropine antagonizes acetylcholine at muscarinic receptors</td></tr>
<tr><td>Treatment is a receptor agonist</td><td>Acts as an antagonist</td><td>Belladonna alkaloids (jimsonweed), which cause anticholinergic effects such as dilated pupils → physostigmine</td><td>Physostigmine blocks acetylcholinesterase, so acetylcholine increases; it therefore acts like a receptor agonist</td></tr>
<tr><td>Treatment removes the poison from the active site</td><td>Binds the active site of an enzyme or protein</td><td>Cyanide → amyl nitrite (methemoglobin)</td><td>Methemoglobin pulls cyanide off cytochrome c oxidase onto itself (section 27)</td></tr>
<tr><td></td><td></td><td>Organophosphate → pralidoxime</td><td>Pulls the organophosphate off acetylcholinesterase onto itself, restoring the enzyme; the complex is eliminated</td></tr>
<tr><td></td><td></td><td>Carbon monoxide → high-concentration oxygen</td><td>Slide only: oxygen displaces CO from the heme of hemoglobin (she did not discuss it)</td></tr>
<tr><td>Treatment bypasses an inhibited pathway</td><td>Blocks a metabolic pathway</td><td>Warfarin → vitamin K</td><td>Supplies the active vitamin K that the blocked pathway can no longer regenerate</td></tr>
</tbody></table>
<p class="antirow">Diagrams: <button type="button" class="chip antichip" data-anti="04-receptor-antagonist-naloxone-flumazenil">◧ Naloxone, flumazenil</button><button type="button" class="chip antichip" data-anti="05-cholinergic-atropine-physostigmine">◧ Atropine, physostigmine</button><button type="button" class="chip antichip" data-anti="06-pralidoxime-and-co">◧ Pralidoxime, CO</button><button type="button" class="chip antichip" data-anti="07-warfarin-vitamin-k">◧ Warfarin, vitamin K</button></p>

<h4>Why</h4>
<ul>
<li><b>Physostigmine counts as an agonist treatment</b> even though it is an enzyme inhibitor. The belladonna alkaloids are the antagonist-type poison here (they cause anticholinergic effects). Physostigmine blocks acetylcholinesterase, which increases acetylcholine, so its net effect is that of a receptor agonist. <small>slide; (T) 10/19</small></li>
<li><b>Organophosphates have two treatments in two categories.</b> Atropine blocks the receptors that the excess acetylcholine is over-stimulating (antagonist). Pralidoxime acts on the enzyme itself, freeing acetylcholinesterase (removal from the active site). Soldiers' field kits carry both mixed in one. <small>(T) 10/19</small></li>
<li><b>Why pralidoxime sometimes fails: aging.</b> Some organophosphates, after binding acetylcholinesterase, lose part of their phosphate group. The aged organophosphate is bound permanently and pralidoxime can no longer pull it off. Whether a given organophosphate ages depends on its chemical structure. <small>(T) 10/19</small></li>
<li><b>Warfarin, step by step.</b> Vitamin K-dependent carboxylase activates some coagulation factors by carboxylating them, using active vitamin K as a cofactor. Used vitamin K becomes an inactive epoxide, and epoxide reductase regenerates the active form. Warfarin inhibits epoxide reductase, so there is less active vitamin K, so fewer active coagulation factors are made. Giving vitamin K supplies the active form directly and goes around the blocked enzyme. Over-anticoagulation shows as bruising, GI bleeds or hemorrhagic stroke. <small>(T) 10/19</small></li>
</ul>

<h4>Her words</h4>
<ul>
<li>"The benzos are the overdose, Flomazinil is your antidote, and your treatment is the antagonist. I had it right the first time." <small>(T) 10/19</small></li>
<li>"It would be nice if warfarin was acting on that vitamin K dependent carboxylase ... but it's not." <small>(T) 10/19</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Flumazenil as an agonist.</b> She slipped while lecturing; her final answer: flumazenil is the antagonist, and the benzodiazepines are the agonists of the receptor.</li>
<li><b>Physostigmine as an antagonist.</b> It is the agonist-category treatment (for anticholinergic poisoning); atropine is the antagonist (for cholinergic excess).</li>
<li><b>Which organophosphate antidote removes the poison from acetylcholinesterase?</b> Pralidoxime (Quiz 3), not atropine, flumazenil or physostigmine.</li>
<li><b>Cyanide's two categories.</b> Methemoglobin pulling cyanide off cytochrome c oxidase is removal from the active site; the rhodanese and thiosulfate step is enhancing metabolism.</li>
<li><b>Warfarin's enzyme.</b> Epoxide reductase, not vitamin K-dependent carboxylase.</li>
<li><b>Vitamin K as an antagonist of warfarin.</b> No: it bypasses the inhibited pathway.</li>
<li><b>Withdrawal.</b> Her table key: flumazenil can cause withdrawal in a benzodiazepine-dependent patient, and naloxone can trigger withdrawal in chronic opioid users.</li>
</ul>

<p>How she asks it: the four categories; which category each example belongs to and why; which drug is the agonist and which the antagonist in the flumazenil case; what pralidoxime does and why aging stops it; warfarin's enzyme and the vitamin K bypass.</p>
<p class="sub">Sources: Treating Poisonings slides ‘Pharmacological Treatment’, ‘Treatment is a receptor antagonist’ (two slides), ‘Treatment is a receptor agonist’, ‘Treatment Removes Toxin from Active Site’, ‘Pralidoxime example’, ‘Treatment by-passes an inhibited pathway’; her poisoning-table key; Quiz 3 key; (T) 10/19. Questions L16-039 to L16-053.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l16-7">
<h3>31. Out-of-hospital management of beta-blocker and calcium channel blocker overdose: the two AAPCC guidelines</h3>

<h4>The idea</h4>
<p>Someone is found at home after swallowing a handful of a beta blocker or a calcium channel blocker, and a family member calls the poison center or 911. The two guidelines tell poison center staff what to say on that call: whether the person can stay home or must go to an emergency department, how to get there, what to do first, and how long to keep checking. For a person with no symptoms, the answer depends on two things: the formulation (immediate release or extended release) and how many hours have passed since the ingestion. Both classes are cardiac drugs, but the hours are not the same for the two classes, and they are not the same for immediate- and extended-release tablets. Those hours are what she tests.</p>

<h4>What the guidelines are, and why they exist</h4>
<ul>
<li><b>The documents.</b> Wax et al., β-Blocker Ingestion, and Olson et al., Calcium Channel Blocker Ingestion, both titled "An Evidence-Based Consensus Guideline for Out-of-Hospital Management", American Association of Poison Control Centers (AAPCC), <i>Clinical Toxicology</i>, 2005. Out-of-hospital means the period before the patient reaches a healthcare facility. They are written for poison center staff, who "would basically have these documents memorized". <small>(T) 10/19; reading cards</small></li>
<li><b>Why these drugs.</b> Only a few drugs have such guidelines, and she called them "pretty nasty drugs". In 2003, US poison centers were contacted about β-blocker ingestions by 15,350 patients, 33 of whom died, and about 9650 calcium channel blocker ingestions, with 57 deaths. <small>(T) 10/14; reading cards</small></li>
<li><b>Why no clinical trials.</b> No one can ethically be consented to swallow an overdose so that its treatment can be studied, and overdose studies in animals are done only rarely, to test whether a treatment works. The data therefore come from real overdoses: clinicians, pharmacists and doctors write up the case and publish it. <small>(T) 10/14, 10/19</small></li>
<li><b>What "evidence-based" means here.</b> The authors pulled every published case report and case series, graded the strength of each piece of evidence, and then graded the strength of each recommendation they wrote from it. In the guidelines' grading table, case reports and case series are level 4 (Grade C) and expert opinion is level 5 (Grade D); all seven calcium channel blocker recommendations are Grade D. Because the evidence is graded, she calls these documents "really good information" even though they rest on case reports rather than trials. <small>(T) 10/14, 10/19; reading cards</small></li>
<li><b>Why a 2005 document is still current.</b> No new ways of treating these overdoses have appeared, so there has been no reason to rewrite them; they would be updated if, for example, a new antidote appeared. <small>(T) 10/19, 10/20</small></li>
</ul>

<h4>The decision for a patient with no symptoms when found</h4>
<p>The window is the number of hours after ingestion during which a patient without symptoms still goes to the hospital.</p>
<table class="reftab"><thead><tr><th>Formulation</th><th>Beta blocker</th><th>Calcium channel blocker</th></tr></thead><tbody>
<tr><td>Immediate release</td><td><b>6 hours</b> (sotalol excluded)</td><td><b>6 hours</b> (verapamil included)</td></tr>
<tr><td>Extended release (called sustained release in the beta-blocker guideline, modified release in the calcium channel blocker guideline)</td><td><b>8 hours</b> (sustained release)</td><td><b>18 hours</b> (modified release, except verapamil)</td></tr>
<tr><td>Modified-release verapamil</td><td>does not apply</td><td><b>24 hours</b></td></tr>
<tr><td>Sotalol</td><td>Her key excludes it from the 6-hour rule. The guideline gives it its own 12-hour window.</td><td>does not apply</td></tr>
</tbody></table>
<table class="reftab"><thead><tr><th>Situation</th><th>What to do (her key)</th><th>Why</th></tr></thead><tbody>
<tr><td>No symptoms, found <b>within</b> the window</td><td>Get them to a hospital.</td><td>The drug may not all have been absorbed yet, so the patient is still in the period when a severe reaction can start.</td></tr>
<tr><td>No symptoms, found <b>after</b> the window</td><td>Call the poison center. They can probably be managed at home, and the poison center tells you the follow-up.</td><td>By then all of the drug should have been absorbed and should be producing symptoms. If there are still none, the patient is OK; someone stays with them and watches them.</td></tr>
<tr><td>Symptoms, at any time</td><td>Get them to a hospital.</td><td>Toxicity has already started.</td></tr>
<tr><td>Possible self-harm, at any time</td><td>Refer to the emergency department, then to mental health care.</td><td>See below. The window and the dose do not change this.</td></tr>
</tbody></table>
<p><b>No symptoms before the window has passed is not reassurance.</b> On 10/20 she added: a patient with no symptoms before the window has passed still needs a call to the poison center and probably a trip to the hospital. If you do not know how much they took, or cannot confirm that it was only one or two tablets, get them in, because they may not yet have absorbed everything they swallowed, and that is why they have no symptoms yet. The guidelines also set a dose cutoff: referral is considered when the amount exceeds the usual maximum single therapeutic dose or equals the lowest reported toxic dose, whichever is lower. <small>(T) 10/20; reading cards</small></p>

<h4>Why each window is what it is</h4>
<ul>
<li><b>Immediate release: 6 hours for both classes.</b> Her key: immediate-release products are absorbed more rapidly because they do not tend to form bezoars. Absorption is quick and complete, so by 6 hours the whole dose is in the body. A patient who has no symptoms at 6 hours has shown that the dose did not cause toxicity. <small>her key; (T) 10/19</small></li>
<li><b>Extended release: a longer window, because of bezoars.</b> The chemistry of extended-release tablets makes them stick together in an overdose, so they clump into a mass (a bezoar) in the stomach or small intestine. The clump can break apart at an unpredictable time and release a large amount of drug at once, so you cannot be sure when the patient will absorb it. Because that break-up can happen hours after the ingestion, a patient with no symptoms is not safe until the extended window has passed, and the hospital is where they should be when it happens. Slow release is true of extended-release tablets, but she said the clumping of the tablets is the biggest issue. <small>her key; (T) 10/19</small></li>
<li><b>Why 18 hours for calcium channel blockers but 8 hours for beta blockers.</b> The numbers come from the case data: the authors pooled all the published overdoses of each class and formulation and analyzed them, and the windows are what that data showed. She said the difference between the two classes "speaks to the mechanism of action". What the guidelines say about the mechanisms: beta blockers competitively block β-adrenergic receptors, which decreases cyclic AMP and blunts the effects of catecholamines; calcium channel blockers block calcium entry through voltage-sensitive calcium channels, which relaxes arterial smooth muscle and depresses the sinoatrial and atrioventricular nodes and cardiac contractility. <small>(T) 10/19; reading cards</small></li>
<li><b>Why 24 hours for modified-release verapamil.</b> Verapamil has more than one mechanism, so it is not as clean a calcium channel blocker as the others. Because of that, toxicity is a concern for longer: a patient with no symptoms 10 hours after modified-release verapamil is not out of danger. The clump can still break apart late, so the window runs to 24 hours. Immediate-release verapamil follows the 6-hour immediate-release rule. <small>(T) 10/20; her key</small></li>
<li><b>Why sotalol is excluded from the 6-hour rule.</b> Sotalol also blocks the potassium channel, and the beta-blocker guideline treats it as particularly toxic, with a 12-hour window. <small>reading card (beta blocker)</small></li>
</ul>

<h4>Reducing absorption at home: no emesis; charcoal is considered but never delays transport</h4>
<ul>
<li><b>Her key, both classes:</b> "Do not induce emesis. Consider activated charcoal if there are no contraindications. Do not delay transport to the hospital to administer charcoal."</li>
<li><b>Why no emesis.</b> A vomiting patient can breathe the vomit into the lungs (aspiration), which she calls the biggest risk of emesis. Inducing vomiting is no longer recommended, and the product used for it is no longer sold in the US or used in hospitals. <small>(T) 10/14, 10/19</small></li>
<li><b>Why charcoal is considered.</b> Of the methods that prevent absorption, charcoal is the one the patient-outcome data favor. It is given in the hospital, by mouth as a slurry or through a nasogastric tube, not at home: "We are not sophisticated enough to do that without hurting somebody". If the patient reaches the hospital early enough, the staff will try it. <small>(T) 10/19</small></li>
<li><b>Why it never delays transport.</b> Single-dose charcoal works only soon after ingestion (her Quiz 3 key: less than 60 minutes; her 10/19 lecture: up to 2 hours), and it is given at the hospital anyway. Time spent trying to arrange charcoal is time the patient is not on the way to the place that can treat them. <small>(T) 10/19; Quiz 3</small></li>
</ul>

<h4>Why an ambulance, not the family car</h4>
<p>If the patient starts to deteriorate (her word: crash) in a private car, for example stuck in traffic, nobody can help: there are no IV lines, no pressors and no defibrillator paddles. The ambulance carries all of these. The calcium channel blocker guideline adds what can be given during transport if available: IV fluids for hypotension, and IV calcium, glucagon and epinephrine for severe hypotension. <small>(T) 10/19; reading card (calcium channel blocker)</small></p>

<h4>Follow-up of a patient who stays home</h4>
<table class="reftab"><thead><tr><th>Beta blocker</th><th>Calcium channel blocker</th></tr></thead><tbody>
<tr><td>Follow-up calls at appropriate intervals for up to 12 to 24 hours, based on the judgment of the poison center.</td><td>Follow-up is determined by the judgment of the poison center (no number of hours).</td></tr>
</tbody></table>
<p>She said the details differ only because of what the case data showed for each class.</p>

<h4>Suspected self-harm</h4>
<p>Her key, both classes: refer the patient to the emergency department, then refer them to mental health care. The guidelines refer stated or suspected self-harm immediately, whatever the amount. Treating the poisoning is not enough; the person needs counseling and an evaluation, and a pharmacist has to think about the whole patient and make sure they reach the other care they need. <small>(T) 10/19, 10/20; reading cards</small></p>

<h4>Her words</h4>
<ul>
<li>"you are still within the window that that clump of tablets could break apart, and all of a sudden you're gonna get a huge absorption of that medication." <small>(T) 10/19</small></li>
<li>"it actually has multiple mechanisms. It's not quite as clean of a calcium channel blocker as the other ones" <small>(T) 10/20</small></li>
<li>"I want you to know those time frames ... which drug formulation is OK at this time frame ... you need to know you don't make them barf at home, it's too dangerous" <small>(T) 10/19</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>18 and 8 swapped.</b> 18 hours belongs to modified-release calcium channel blockers; 8 hours belongs to sustained-release beta blockers.</li>
<li><b>24 hours for all verapamil.</b> Only modified-release verapamil has 24 hours. Immediate-release verapamil is 6 hours, like every immediate-release product. A patient found 20 hours after modified-release verapamil is still inside the window and goes to the hospital.</li>
<li><b>6 hours for every immediate-release beta blocker.</b> Sotalol is excluded (it also blocks the potassium channel; 12 hours in the guideline).</li>
<li><b>"No symptoms, so stay home."</b> Only after the window has passed. Before it, absent symptoms can mean the drug has not been absorbed yet, and an unknown amount is a reason to go in.</li>
<li><b>"After the window, nothing to do."</b> You still call the poison center, stay with the patient and watch them, and the poison center sets the follow-up.</li>
<li><b>Charcoal at home, or charcoal before leaving.</b> Charcoal is considered only if there are no contraindications, it is given at the hospital, and it never delays transport. Emesis is never induced (Quiz 3: emesis is not first line).</li>
<li><b>"The longer window is only because the tablet releases slowly."</b> The reason she stresses is clumping into a bezoar that can break apart at an unpredictable time.</li>
<li><b>12 to 24 hours of follow-up for both classes.</b> That is the beta-blocker guideline only. The calcium channel blocker guideline leaves follow-up to the poison center's judgment.</li>
<li><b>Self-harm decided by the window.</b> Suspected self-harm goes to the emergency department, then mental health care, whatever the time or the dose.</li>
</ul>

<p>How she asks it: the window for a given class and formulation, and what to do just inside or just outside it; why extended release needs a longer window (bezoars); why verapamil's is longest; what not to do at home and when charcoal fits; how to get to the hospital and why; the follow-up difference; the self-harm rule; where the evidence comes from.</p>
<p class="sub">Sources: Treating Poisonings slides ‘Guidelines for Overdoses’, ‘Discussion of OD Guidelines’; Wax et al. 2005 (β-blocker) and Olson et al. 2005 (calcium channel blocker) AAPCC guidelines, the two guideline reading cards; her posted guideline key; Quiz 3 key; (T) 10/14, 10/19, 10/20. Questions L16-054 to L16-066, GRG3-001 to GRG3-035, NEW3-087 to NEW3-090.</p>
</section>

<!-- ===================================================================== -->
<section class="guide" id="guide3-l16-8">
<h3>32. The poisoning treatment table: her key</h3>

<h4>The idea</h4>
<p>The lecture taught the general ways to treat a poisoning; the table applies them to specific overdoses. For each one it lists the symptoms of acute poisoning and how it is diagnosed, the antidote, how the antidote works, and a special consideration she asked about. She called the table the heaviest part of this exam, and said toxicology and pharmacogenomics are both tested on the board exam. The detail in her key is the detail she expects: "what I have in my table in the key is sufficient." <small>(T) 10/19, 10/20</small></p>

<h4>Her key, condensed</h4>
<table class="reftab"><thead><tr><th>Overdose</th><th>Signs and diagnosis</th><th>Antidote: how it works</th><th>Special consideration (her question: her answer)</th></tr></thead><tbody>
<tr><td>Acetaminophen</td><td>Nausea and vomiting; clinical signs of liver failure; blood levels can be measured</td><td>N-acetylcysteine: replenishes glutathione</td><td>When does it lose effectiveness? About 8 hours after the overdose. Still give it after that? Yes.</td></tr>
<tr><td>Toxic alcohols</td><td>Methanol: active metabolites cause anion-gap metabolic acidosis and ocular toxicity. Ethylene glycol: active metabolites crystallize in the microvasculature; renal toxicity is common</td><td>Ethanol or fomepizole: inhibit alcohol dehydrogenase</td><td>Advantage of one? Fomepizole is a stronger alcohol dehydrogenase inhibitor and has fewer adverse effects than ethanol.</td></tr>
<tr><td>Benzodiazepines</td><td>CNS depression with relatively normal vital signs; blood levels can be measured</td><td>Flumazenil: competitive antagonist of the benzodiazepine receptor</td><td>Concern? It can cause withdrawal in a benzodiazepine-dependent patient.</td></tr>
<tr><td>Beta blockers</td><td>Hypotension, bradycardia, altered mental status, respiratory depression</td><td>Atropine: increases heart rate. Calcium: drives calcium into cardiac cells. Glucagon: increases cardiac cellular cAMP to increase heart rate. HIET (hyperinsulinemia-euglycemia therapy, high-dose insulin; the expansion is Marraffa's, her key leaves it unexpanded): the mechanism of its inotropic effect is not understood. Vasopressors: increase blood pressure. IV 20% fat emulsion: acts as a sink for the drug if the drug is lipophilic enough</td><td>What distinguishes a beta-blocker from a calcium channel blocker overdose? A beta-blocker overdose may cause altered mental status.</td></tr>
<tr><td>Calcium channel blockers</td><td>Hypotension, bradycardia, but often alert</td><td>Same as for beta blockers</td><td></td></tr>
<tr><td>Digoxin</td><td>Bradycardia, arrhythmias, elevated serum potassium, nausea and vomiting; blood levels can be measured</td><td>Digoxin-specific antibody fragments: bind digoxin, then renally eliminated</td><td>Why is serum digoxin unhelpful after the antidote? Total digoxin (free plus bound to Fab) rises, so it cannot be used to calculate more Fab doses.</td></tr>
<tr><td>Tricyclic antidepressants</td><td>Tachycardia, dilated pupils, dry mouth, agitation, seizures, sometimes vasodilation, prolonged QRS interval, reduced cardiac contractility</td><td>IV fluids, dopamine or norepinephrine: mostly supportive, to maintain blood pressure. Sodium bicarbonate for the prolonged QRS: counteracts the inhibition of cardiac sodium channels</td><td></td></tr>
<tr><td>Opioids</td><td>Somnolence, coma, decreased heart and breathing rates, small pupils</td><td>Naloxone: competitive antagonist of opioid receptors</td><td>Concern in chronic opioid users? It can trigger withdrawal.</td></tr>
<tr><td>Salicylates</td><td>Hyperventilation and respiratory alkalosis, then metabolic acidosis; hyperthermia, confusion, seizures</td><td>Supportive care; IV sodium bicarbonate: renal ion trapping to enhance elimination</td><td></td></tr>
<tr><td>Sulfonylureas and meglitinides</td><td>Hypoglycemia</td><td>Octreotide: inhibits insulin release from the pancreas</td><td></td></tr>
<tr><td>Iron</td><td>1 to 6 hours: vomiting, abdominal pain, diarrhea. 6 to 24 hours: lethargy, coma, seizures, bloody vomiting and diarrhea, shock; hypotension and tachycardia. 2 to 5 days: possible liver dysfunction and failure</td><td>Deferoxamine: chelates the circulating ferric iron</td><td></td></tr>
<tr><td>Organophosphate insecticides</td><td>Acetylcholine excess: SLUDGE or DUMBELLS</td><td>Atropine: muscarinic acetylcholine receptor antagonist. Pralidoxime: removes the organophosphate from acetylcholinesterase</td><td></td></tr>
</tbody></table>
<p>Her reference column: Marraffa (Marraffa, Cohen and Howland 2012) for most rows; Katzung's <i>Basic and Clinical Pharmacology</i> ch. 58 for tricyclics and salicylates; DiPiro's <i>Pharmacotherapy</i>, 13th ed., for iron and organophosphates. She said the Marraffa article is the quickest to read and that these papers have not been replaced by anything better.</p>

<h4>Why: the table links back to the lecture categories</h4>
<ul>
<li><b>Glucagon in a beta-blocker overdose.</b> Beta blockers block β-adrenergic receptors and so decrease cAMP production (beta-blocker guideline). Glucagon increases cardiac cAMP, which raises the heart rate (Quiz 3: glucagon works by increasing intracellular cAMP).</li>
<li><b>Why both drug classes share one antidote list.</b> Both cause hypotension and bradycardia, so the treatments aim at heart rate, calcium entry, contractility and blood pressure. For an extended-release calcium channel blocker overdose, Quiz 3's answer is HIET.</li>
<li><b>Telling the two apart.</b> A beta-blocker overdose may bring altered mental status; a calcium channel blocker patient is often alert.</li>
<li><b>Category links.</b> Fomepizole and ethanol inhibit bioactivation; NAC enhances metabolism; bicarbonate for salicylates enhances elimination; deferoxamine and digoxin Fab inactivate; flumazenil, naloxone and atropine are antagonists; pralidoxime removes the poison from the active site.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"The heaviest part of that will be this poisoning table." <small>(T) 10/19</small></li>
<li>"you do know, need to know the details that I have in my table, my key." <small>(T) 10/20</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Bicarbonate means the same thing everywhere.</b> Salicylates: ion trapping. Tricyclics: counteracting cardiac sodium channel inhibition for the prolonged QRS.</li>
<li><b>Opioid toxidrome with large pupils.</b> Increased pupil size is NOT part of the opioid toxidrome (Quiz 3); the pupils are small.</li>
<li><b>Fomepizole vs ethanol.</b> Both inhibit alcohol dehydrogenase; fomepizole is stronger and has fewer adverse effects.</li>
<li><b>Glucagon's mechanism.</b> It increases cAMP; it is not a cofactor, a conjugating agent or an alcohol dehydrogenase inhibitor (Quiz 3 distractors).</li>
<li><b>Iron's timeline.</b> GI symptoms in the first 1 to 6 hours; shock and CNS effects at 6 to 24 hours; liver failure possible at 2 to 5 days.</li>
<li><b>Not tested.</b> The bonus decks on toxicology careers and on pharmacists and drugs in the water: "I will not test you on those slide decks". <small>(T) 10/20</small></li>
</ul>

<p>How she asks it: the symptoms, antidote, antidote mechanism and special consideration for any row of her key; what distinguishes a beta-blocker from a calcium channel blocker overdose; which treatment category an antidote belongs to.</p>
<p class="sub">Sources: Treating Poisonings slide ‘Treating specific poisonings Table’; her Poisoning Treatment Table 2026 key; DiPiro ch. e9; Marraffa 2012; Quiz 3 key; the beta-blocker guideline reading card; (T) 10/19, 10/20. Questions TBL3-001 to TBL3-065, TBL3-101 to TBL3-113, NEW3-052 to NEW3-063, L16-067, L16-068.</p>
</section>

<!-- ===================================================================== -->
<!-- ===== Day 17 (10/20) ===== -->
<!-- ===================================================================== -->
<section class="guide" id="guide3-l17-1">
<h3>33. Why pharmacogenomics: inter-individual variation, primaquine, the timeline, twin studies</h3>

<h4>The idea</h4>
<p>People given the same drug can respond very differently: the same drug can be lethal in one person and do nothing in another. These differences were first linked to age, ethnicity, gender and underlying disease. As knowledge of genetics grew, some of the variation could be explained by genetic variation. Pharmacogenomics exists to explain and predict that part of the variation. The early evidence came before anyone could genotype: scientists measured a phenotype (an enzyme's activity, a drug's half-life) and showed that it was inherited.</p>

<h4>Primaquine: the first real data point</h4>
<ul>
<li>Primaquine, an antimalarial used as prophylaxis, was given widely to soldiers in the 1950s during the Korean War.</li>
<li>Some soldiers developed hemolytic anemia (slide: significant methemoglobinemia leading to hemolytic anemia). Clinicians noticed that those of Middle Eastern or African descent seemed most at risk.</li>
<li>Those who reacted badly had low activity of the enzyme glucose-6-phosphate dehydrogenase (G6PD) in their red blood cells.</li>
<li><b>Why it matters:</b> genotyping was not possible then, but enzyme activity could be measured. The low-activity phenotype reflected a genetic variation, so this was the first link between a bad drug response and genetics. The MASH episode on the slide (The Red/White Blues, episode 214) acts it out.</li>
</ul>
<p><small>(T) 10/20; slide ‘History of Primaquine’</small></p>

<h4>The timeline</h4>
<table class="reftab"><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody>
<tr><td>1953</td><td>Watson and Crick (and others) describe the structure of DNA</td></tr>
<tr><td>1956</td><td>Genetic link found for the hemolytic anemia caused by primaquine</td></tr>
<tr><td>1957</td><td>Motulsky: inheritance might explain many individual differences in the efficacy of drugs and in adverse drug reactions</td></tr>
<tr><td>1959</td><td>Vogel coins the term "pharmacogenetics"</td></tr>
<tr><td>1990</td><td>Human Genome Project starts: a worldwide consortium of academics, industry and government agencies, each lab sequencing a stretch of DNA and sharing every sequence in a common database</td></tr>
<tr><td>2003</td><td>Human Genome Project completed, early and under budget</td></tr>
</tbody></table>
<p>The faster sequencing methods developed during the project later made whole genome sequencing possible "in a matter of hours"; whole genome sequencing itself came after the project. <small>(T) 10/20; slide ‘Genomics History’</small></p>

<h4>Twin studies</h4>
<ul>
<li><b>Design.</b> The half-life of antipyrine was compared in identical twin pairs and in fraternal twin pairs. Antipyrine was chosen because it is cleared entirely by metabolism, by one known enzyme, so its half-life is a clean measure of that enzyme's activity.</li>
<li><b>Result.</b> Identical twins had almost identical half-lives; fraternal twin pairs varied, with only one pair (pair d) close.</li>
<li><b>Why it shows heritability.</b> Identical twins share their genotype; fraternal twins are related but their genotypes differ. If the same genotype gives the same clearance and different genotypes give different clearances, the variation in clearance is inherited. No one was genotyped: the phenotype measured was the drug's half-life.</li>
</ul>
<p><small>(T) 10/20; slide ‘Twin Studies Data’ (G&amp;G Fig. 4-2)</small></p>

<h4>Her words</h4>
<ul>
<li>"we couldn't genotype at that time, but we could measure that enzyme activity, and we realized that that phenotype of the enzyme activity was reflecting these people's genotype" <small>(T) 10/20</small></li>
<li>"We did not genotype these people at this time. We were looking at their phenotype, which was the half-life of the clearance of the drug" <small>(T) 10/20</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Primaquine's war and enzyme.</b> Korean War, 1950s; glucose-6-phosphate dehydrogenase, with low activity in the patients who reacted.</li>
<li><b>Genotyped soldiers or twins.</b> Neither was genotyped; both studies measured a phenotype.</li>
<li><b>Who coined pharmacogenetics.</b> Vogel, 1959. Motulsky (1957) made the statement about inheritance and drug response.</li>
<li><b>Whole genome sequencing during the Human Genome Project.</b> No: the project (1990 to 2003) produced the methods that later allowed it.</li>
<li><b>Fraternal twins as a match.</b> Their half-lives varied; only identical twins matched.</li>
</ul>

<p>How she asks it: the first indication of genetic variation in drug response and the enzyme involved; what was measured before genotyping existed; years and people on the timeline; what the twin figure shows and why antipyrine was used.</p>
<p class="sub">Sources: Intro to PGx slides ‘Inter-Individual Variations’ (p. 4), ‘History of Primaquine’ (p. 5), ‘Genomics History’ (p. 6), ‘Twin Studies Data’ (p. 7); (T) 10/20. Questions L17-001 to L17-009.</p>
</section>
<section class="guide" id="guide3-l17-2">
<h3>34. Pharmacogenetics vs pharmacogenomics; impact, uses and limitations</h3>

<h4>The idea</h4>
<p>Two official terms exist for the field, and they differ in scope: one patient, or whole populations. Both are used interchangeably, and the preferred term is pharmacogenomics. The second half of the topic is why the field matters in practice now: many patients take drugs where genetics matters, pharmacists are the best educated about it, and for some drugs genotyping before prescribing is the standard of care.</p>

<h4>The two terms</h4>
<table class="reftab"><thead><tr><th>Term</th><th>Slide definition</th><th>Her gloss</th></tr></thead><tbody>
<tr><td>Pharmacogenetics</td><td>The study of genetic causes of individual variations in drug response</td><td>One patient and their response to a drug</td></tr>
<tr><td>Pharmacogenomics</td><td>More broadly involves genome-wide analysis of the genetic determinant of drug efficacy and toxicity; includes the use of genomics technologies (e.g., bioengineered proteins and gene therapy)</td><td>Populations as a whole, or comparing populations; also used for technologies such as gene therapy. The preferred term.</td></tr>
</tbody></table>
<p>Definitions: American Association of Pharmaceutical Scientists (AAPS) Pharmacogenomics Focus Group. She first said WHO, then corrected herself; the WHO also has definitions now. <small>(T) 10/20; slide ‘Definition of Genomics vs Genetics’</small></p>
<p><b>Why organizations define terms:</b> to get everyone on the same page. If agencies define genotypes or sample pharmacogenomic populations differently, the data get messy and one country's agency cannot compare its data with another's; shared definitions give better scientific communication. <small>(T) 10/20</small></p>

<h4>Impact</h4>
<ul>
<li><b>MacKinnon et al., 2023:</b> more than half the patients evaluated were prescribed medications where pharmacogenomics is important in their use. The study reviewed the drugs, adverse effects and efficacy in thousands of medical records; it did not evaluate whether pharmacogenomics was actually used.</li>
<li><b>Wondrasek et al., 2024:</b> pharmacists feel pharmacogenomics is important but do not feel confident in their knowledge of it or their ability to use it.</li>
<li><b>Who knows it best:</b> pharmacy students are the best educated in pharmacogenomics. Prescribers, nurses and other providers should know it too, but prescribers are not yet as well versed, because they do not spend as much time with drugs.</li>
</ul>
<p><small>(T) 10/20; slide ‘Impact of Pharmacogenomics’</small></p>

<h4>Uses and limitations</h4>
<ul>
<li><b>Genotype after the response.</b> Often a side effect or a lack of efficacy prompts genotyping afterward. That is acceptable when the side effect is not lethal.</li>
<li><b>Genotype before the drug.</b> If a drug can quickly cause a lethal side effect, genotype the patient before giving it. For some medications this is standard protocol, and not doing it could make you liable, because of how severe the toxicity can be.</li>
<li><b>Could but rarely do.</b> Some drugs could be genotyped but rarely are in practice; her view: if insurance pays for it and it saves cost, do it.</li>
<li><b>Where it is used.</b> Oncology uses it all the time; CNS, cardiology and infectious disease increasingly.</li>
</ul>
<p><small>(T) 10/20</small></p>

<h4>Her words</h4>
<ul>
<li>"pharmacogenetics is the term that we use when we're thinking about an individual, one patient, and their response to a drug ... Pharmacogenomics is a more global term." <small>(T) 10/20</small></li>
<li>"It's better to genotype the patient, figure out what version of a gene they have before you give them that drug" <small>(T) 10/20</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Individual vs population.</b> Pharmacogenetics: one patient. Pharmacogenomics: populations, genome-wide, plus technologies such as gene therapy.</li>
<li><b>Preferred term.</b> Pharmacogenomics.</li>
<li><b>Who wrote the slide definitions.</b> The AAPS Pharmacogenomics Focus Group.</li>
<li><b>"MacKinnon showed pharmacogenomics was used in half the patients."</b> No: half were on drugs where it is important; use was not evaluated.</li>
<li><b>"Pharmacists feel confident."</b> No: they feel it is important but are not confident.</li>
<li><b>Always genotype after a problem.</b> Not for drugs that can quickly cause a lethal effect: genotype first.</li>
</ul>

<p>How she asks it: individual vs population; the preferred term and who defined the terms; why organizations define terms; the two impact papers; who else should know pharmacogenomics; when to genotype before prescribing.</p>
<p class="sub">Sources: Intro to PGx slides ‘Definition of Genomics vs Genetics’ (p. 8), ‘Impact of Pharmacogenomics’ (p. 9); (T) 10/20. Questions L17-010 to L17-017.</p>
</section>
<section class="guide" id="guide3-l17-3">
<h3>35. The four target areas; PK, PD and the two outcome buckets</h3>

<h4>The idea</h4>
<p>Genetic variation affects drug response through four kinds of proteins: the enzymes that metabolize the drug, the transporters that move it, the drug's target, and the immune system. The first two change the pharmacokinetics (how much drug reaches the blood and how long it stays); the target changes the pharmacodynamics (how the body responds to the drug). Every variant ends in one of two clinical outcomes: toxicity or a change in efficacy. Pharmacogenomics is used to prevent the first and ensure the second.</p>

<h4>The four target areas (four, not three)</h4>
<p>She changed the slide to four target areas the morning of the lecture; the printed title still says three. "You do need to know these." <small>(T) 10/20; slide ‘Three Target Areas’</small></p>
<table class="reftab"><thead><tr><th>Target area</th><th>What it is</th><th>Her example</th><th>Where the field stands</th></tr></thead><tbody>
<tr><td>Metabolizing enzymes</td><td>P450s, and now other phase 1 and phase 2 enzymes</td><td>Patients who could not clear certain drugs had blood concentrations too high, and some died</td><td>First and best known: "the low hanging fruit". Slide: variants cause differences in drug plasma concentrations, with serious implications for narrow therapeutic-index drugs</td></tr>
<tr><td>Transporters</td><td>Proteins that move drugs across cells, in the gut, liver, brain and elsewhere</td><td>P-glycoprotein (P-gp), encoded by ABCB1, an efflux transporter in the gut; digoxin</td><td>Studied next; a very active research area</td></tr>
<tr><td>Drug targets</td><td>Where a drug acts: a receptor, or an enzyme the drug inhibits</td><td>A pharmacogenomics guidance document published 2 years ago on β-adrenergic receptor variants; cancer drugs that need the cancer to express their target protein</td><td>Moving more slowly than enzymes and transporters; biggest role now in oncology</td></tr>
<tr><td>Immune system targets</td><td>HLA antigens</td><td>Certain HLA variants make patients respond badly to certain drugs</td><td>Up and coming: the list of drugs and HLA variants linked to severe adverse reactions grows every year</td></tr>
</tbody></table>
<p><small>(T) 10/20</small></p>

<h4>Why: the reasoning chains</h4>
<ul>
<li><b>Why enzymes came first.</b> A patient with a low-activity metabolizing enzyme cannot clear the drug, so the blood concentration rises too high and the patient can be harmed or killed. Those reactions were the most apparent and the most dangerous, so once genotyping was possible they were explained first.</li>
<li><b>P-gp and digoxin.</b> P-gp in the gut pumps a substrate drug back into the gut lumen, so less of an oral dose reaches the blood; for an oral P-gp substrate, think bioavailability. Digoxin is a P-gp substrate with a very narrow therapeutic index, and its dose is set expecting normal P-gp. In a patient with a low-activity P-gp variant, less digoxin is pumped back, more is absorbed, bioavailability goes up, and the heart rate can be affected too much.</li>
<li><b>Drug targets and efficacy.</b> If a receptor variant responds poorly, a drug acting on that receptor works poorly. If a patient's cancer does not express the protein a cancer drug binds, the drug has nothing to bind and will not work: "don't give them this drug. It's expensive, and it can cause side effects."</li>
</ul>

<h4>The PharmGKB figure: PK, PD and the two buckets</h4>
<table class="reftab"><thead><tr><th>Arc of the figure</th><th>Genes involved</th><th>What changes</th><th>Usual outcome bucket (her examples)</th></tr></thead><tbody>
<tr><td>Top arc: pharmacokinetics</td><td>Metabolizing enzymes, transporters</td><td>Absorption, distribution, metabolism, excretion</td><td>Toxicity: a less active enzyme leaves drug levels too high; transporters can also contribute</td></tr>
<tr><td>Bottom arc: pharmacodynamics</td><td>Drug target (for example a receptor)</td><td>Target, mechanism of action, drug response</td><td>Efficacy: a poorly responding receptor, or a cancer without the drug's target protein</td></tr>
</tbody></table>
<p>The figure came from the PharmGKB website (now routed to a newer site). <small>(T) 10/20; slide ‘Impact of Pharmacogenomics on PK and PD’</small></p>

<h4>Her words</h4>
<ul>
<li>"Metabolizing enzymes, transporters, drug targets, and then immunological targets" <small>(T) 10/20</small></li>
<li>"We always try to either prevent toxicity or ensure efficacy by using pharmacogenomics." <small>(T) 10/20</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Three target areas.</b> Four: she added immune system targets; the slide title was not updated.</li>
<li><b>Best-characterized area.</b> Metabolizing enzymes (Quiz 4), not transporters or drug targets.</li>
<li><b>Low-activity P-gp lowers digoxin levels.</b> No: less efflux means bioavailability goes up.</li>
<li><b>P-gp's gene.</b> ABCB1.</li>
<li><b>A drug target is only a receptor.</b> It can also be an enzyme the drug inhibits; receptors are the general category with the β-adrenergic example (Quiz 4).</li>
<li><b>Bucket for a cancer that lacks the drug's target.</b> Efficacy, not toxicity.</li>
</ul>

<p>How she asks it: name the four target areas; why enzymes came first; P-gp, its gene and its effect on digoxin bioavailability; which arc and which bucket a scenario belongs to.</p>
<p class="sub">Sources: Intro to PGx slides ‘Three Target Areas’ (p. 10), ‘Impact of Pharmacogenomics on PK and PD’ (p. 11); Quiz 4 (her questions; the answers used here were confirmed by her grading); (T) 10/20. Questions L17-018 to L17-027.</p>
</section>
<section class="guide" id="guide3-l17-4">
<h3>36. Wild type, variant, polymorphism, rare variant, SNP</h3>

<h4>The idea</h4>
<p>These terms name versions of a gene by how common they are. Wild type and variant compare the most common version with the less common ones. Polymorphism and rare variant sort genetic variants by their frequency in a population, with the cutoff at 1%. A SNP is one kind of change (a single nucleotide); it is not a frequency term. Keeping "how often" separate from "what kind of change" answers most questions on this slide.</p>

<h4>The terms</h4>
<table class="reftab"><thead><tr><th>Term</th><th>Definition</th><th>Note</th></tr></thead><tbody>
<tr><td>Wild type</td><td>The version of a gene that is thought to be the most common</td><td>Sometimes the literature's wild type is only the version scientists understood first. On her exam, "the most common" is accepted.</td></tr>
<tr><td>Variant (genetic variant)</td><td>A version of the gene that is not thought to be common</td><td>Say variant, not mutant.</td></tr>
<tr><td>Polymorphism</td><td>A genetic variant present in at least 1% of the population (slide: ≥ 1%)</td><td>Defined by frequency, not by the type of change</td></tr>
<tr><td>Rare variant</td><td>A genetic variant present in less than 1% of the population</td><td>A newer term</td></tr>
<tr><td>Single nucleotide polymorphism (SNP, "snip")</td><td>One nucleotide differs from the wild-type sequence</td><td>The most common type of polymorphism</td></tr>
</tbody></table>
<p>Other kinds of change can also be polymorphisms: more than one nucleotide changed, an entire gene inserted or deleted, extra copies of a gene, a sister chromatid exchange, "and more". <small>(T) 10/20; slides ‘Wildtype vs Variant’, ‘Polymorphism’</small></p>

<h4>Why</h4>
<ul>
<li><b>Why a whole-gene deletion can be a polymorphism.</b> The definition of polymorphism is about how often a change occurs, not what the change is. Any kind of variant found in at least 1% of the population is a polymorphism; any kind found in less than 1% is a rare variant.</li>
<li><b>Why the term rare variant appeared.</b> For a long time the work focused on polymorphisms, and known polymorphisms explained many differences in drug response. Then some patients reacted badly to a drug without carrying the known polymorphism; their genotype showed an uncommon variation found in less than 1% of people. The variant is rare, but the bad reaction is just as real for that patient, so these variants now get attention.</li>
<li><b>Why "variant", not "mutant" or "aberration".</b> She uses neutral words for genetic changes; "mutant" is no longer commonly used.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"by definition, a polymorphism occurs at least 1% of the time in a population" <small>(T) 10/20</small></li>
<li>"polymorphism definition speaks to the frequency of that change happening" <small>(T) 10/20</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>"Polymorphisms are only SNPs."</b> False: a gene deletion, insertion, extra copies or other change is a polymorphism if it occurs in at least 1% of the population.</li>
<li><b>Rare variant vs polymorphism.</b> Less than 1% is a rare variant; at least 1% is a polymorphism.</li>
<li><b>A variant that occurs very frequently.</b> That describes a polymorphism, not a haplotype (Quiz 4).</li>
<li><b>Wild type is always the most common.</b> Usually, but sometimes it is the version understood first; on her exam "most common" is accepted.</li>
</ul>

<p>How she asks it: define wild type, variant, polymorphism and rare variant; the 1% cutoff; whether a whole-gene deletion can be a polymorphism; what a SNP is.</p>
<p class="sub">Sources: Intro to PGx slides ‘Wildtype vs Variant’ (p. 13), ‘Polymorphism’ (p. 14); Quiz 4 (her questions; the answers used here were confirmed by her grading); (T) 10/20. Questions L17-028 to L17-033.</p>
</section>
<section class="guide" id="guide3-l17-5">
<h3>37. Allele, homozygosity, genotype, phenotype, functional significance</h3>

<h4>The idea</h4>
<p>Each person carries two copies of each gene, one from each biological parent. The two copies (alleles) together are the genotype; what can be observed, such as how active an enzyme is, is the phenotype. Pharmacogenomics uses a genotype to predict a phenotype, and that works only when the functional significance of the variant is known: what the change in the gene does to the protein the gene makes. Several things can blur the link between genotype and phenotype.</p>

<h4>The terms</h4>
<table class="reftab"><thead><tr><th>Term</th><th>Meaning</th><th>Example</th></tr></thead><tbody>
<tr><td>Allele</td><td>The variant (and wild-type) forms of a gene at a particular location on a chromosome. Humans are diploid: two copies of every chromosome, so two copies of each gene, one from the biological mother and one from the father; each copy is an allele. The slide adds that each nucleotide base in the gene can be considered an allele.</td><td></td></tr>
<tr><td>Homozygous</td><td>The two alleles are the same at a locus</td><td>In the figure, PP and aa: homozygous for P, or for a, at that locus</td></tr>
<tr><td>Heterozygous</td><td>The two alleles differ at a locus</td><td>In the figure, Bb: "heterozygous for B at this 3rd loci"</td></tr>
<tr><td>Genotype</td><td>The two alleles a person has for a gene</td><td>CYP2C19*2/*2: homozygous for the *2 allele</td></tr>
<tr><td>Phenotype</td><td>Any observable characteristic (morphology, development, biochemical, physical or behavioral); results from the expression of genes</td><td>CYP2C19*2 has no activity, so a *2/*2 person has no CYP2C19 activity and cannot metabolize drugs through that enzyme</td></tr>
<tr><td>Functional significance</td><td>What a genetic variation does to how the gene's product (protein, enzyme, transporter) works</td><td>For CYP2C19*2 it is well established: the enzyme is not active, and why is known</td></tr>
</tbody></table>
<p>Dominant and recessive are not used in pharmacogenomics; the figure shows them, but gene dose replaces them later in the course. <small>(T) 10/20; slides ‘Allele’, ‘Homozygosity and Heterozygosity’, ‘Genotype vs phenotype’</small></p>

<h4>Why functional significance matters</h4>
<p>Genotype drives phenotype, but only through the protein. If we know what a variant does to the protein's function, we can predict the drug-response phenotype and use the genotype to decide whether a patient should get a drug, or whether the dose should be reduced. If we do not know it, we cannot explain the phenotype. For CYP2C19*2 the genotype-phenotype relationship is "really tight". <small>(T) 10/20</small></p>

<h4>What complicates the genotype-phenotype relationship</h4>
<table class="reftab"><thead><tr><th>Complication (slide)</th><th>Why it blurs the link</th></tr></thead><tbody>
<tr><td>Many polymorphisms in a single gene</td><td>When one gene has variants at several places (a SNP here, a tandem repeat there), it is hard to work out which variation is causing the phenotype.</td></tr>
<tr><td>Most traits are multigenic, not monogenic</td><td>A few diseases come from one variant (sickle cell, Huntington's chorea, Tay-Sachs, certain early-onset Alzheimer's and Parkinson's), but most (cardiovascular disease, diabetes, hyperlipidemia) come from several. Drug response can also be multigenic: each gene's variant has its own weight, and the combination produces the response.</td></tr>
<tr><td>Environmental factors (gene-environment interactions)</td><td>Diet, habits, lack of exercise, sleep and stress affect how genes are expressed; so do epigenetic factors such as DNA methylation and histones. Expression changes the effect of a variant.</td></tr>
</tbody></table>
<p><small>(T) 10/20; slide ‘Complications of Genotype vs phenotype’</small></p>

<h4>Her words</h4>
<ul>
<li>"Phenotypes are driven by the genotype" <small>(T) 10/20</small></li>
<li>"How does that mutation affect the function of the protein, or the enzyme or the transporter that that gene creates in our body" <small>(T) 10/20</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Genotype vs phenotype.</b> CYP2C19*2/*2 is a genotype; "no CYP2C19 activity" is the phenotype.</li>
<li><b>Writing a genotype.</b> Gene, then both alleles: CYP2C19*2/*2.</li>
<li><b>Dominant and recessive.</b> Not used in pharmacogenomics.</li>
<li><b>Functional significance.</b> It is about what the variant does to the gene product's function, not how often the variant occurs (that is frequency).</li>
<li><b>The three complications.</b> Many polymorphisms in one gene; multigenic traits; environment (including epigenetics).</li>
</ul>

<p>How she asks it: define allele, genotype, phenotype; read zygosity from the figure; write a genotype; define functional significance; list and explain the complications.</p>
<p class="sub">Sources: Intro to PGx slides ‘Allele’ (p. 15), ‘Homozygosity and Heterozygosity’ (p. 16), ‘Genotype vs phenotype’ (p. 17), ‘Complications of Genotype vs phenotype’ (p. 18); (T) 10/20. Questions L17-034 to L17-044.</p>
<!--STEP:allele-genotype-->
</section>
<section class="guide" id="guide3-l17-6">
<h3>38. Haplotype, allele and genotype frequency, Hardy-Weinberg equilibrium</h3>

<h4>The idea</h4>
<p>A haplotype is a set of variants at several loci that are inherited together on one chromosome more often than chance would predict. The frequency terms describe how common an allele or a genotype is in a population, and Hardy-Weinberg equilibrium is the statistical check that a studied population has not been pushed away from the general population, so that a study's results can be generalized.</p>

<h4>Haplotype and linkage disequilibrium</h4>
<ul>
<li><b>Definition.</b> More than one genetic variant that group together and co-exist with a higher frequency than would occur by chance (Quiz 4). Slide: a set of alleles at multiple loci, or areas of a gene, that co-exist on the same chromosome.</li>
<li><b>Linkage disequilibrium.</b> When the set of alleles co-exists at a higher frequency than random chance predicts. This is the statistical significance she attaches to a haplotype.</li>
<li><b>The illustration.</b> Three loci each carry a SNP: A or G at the first, G or T at the second, A or T at the third. Among people with variants at these loci, the changes appear together in three patterns: AGT, GTA and AGA. Each pattern is a haplotype.</li>
<li><b>Why variants travel together.</b> Something about the structure and chemistry of that stretch of DNA makes those changes occur in those groupings, so they appear together more often than chance.</li>
<li>Warfarin will be the haplotype example later in the course.</li>
</ul>
<p><small>(T) 10/20; slides ‘Haplotype’, ‘Illustration of Haplotype’; Quiz 4 (her questions; the answers used here were confirmed by her grading)</small></p>

<h4>Frequencies and Hardy-Weinberg equilibrium</h4>
<table class="reftab"><thead><tr><th>Term</th><th>Definition (slide)</th><th>Her explanation</th></tr></thead><tbody>
<tr><td>Allele frequency</td><td>The relative frequency of an allele in a population, as a proportion or percentage</td><td>How often one version of the gene (wild type or variant) occurs</td></tr>
<tr><td>Genotype frequency</td><td>The relative frequency of a genotype in a population, as a proportion or percentage</td><td>How often a combination of two alleles occurs</td></tr>
<tr><td>Hardy-Weinberg equilibrium</td><td>Allele and genotype frequencies in a population stay constant from generation to generation unless specific influences are introduced</td><td>Whether a genetic variation in a population is occurring because of evolutionary pressure or not</td></tr>
</tbody></table>
<p><b>Why studies report it.</b> Her example: if this class's drug response differed from that of every past graduate, and the cause (say, stress) had changed the class's genotype, the class would not be in Hardy-Weinberg equilibrium. Its data could not be applied to the general population. Pharmacogenomic papers therefore state that their study population was in Hardy-Weinberg equilibrium, to show their sample is good and their results are generalizable; a study out of equilibrium probably would not be published. <small>(T) 10/20; slide ‘Frequencies in Pharmacogenomics’</small></p>

<h4>Her words</h4>
<ul>
<li>"it's a set of alleles at multiple loci that coexist in the same chromosome." <small>(T) 10/20</small></li>
<li>"a haplotype is going to be occurring at a frequency that is greater than random chance." <small>(T) 10/20</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>One variant at one locus, more often than chance.</b> Not a haplotype: a haplotype needs multiple loci (Quiz 4, option D).</li>
<li><b>Haplotype vs polymorphism vs rare variant.</b> A single variant in at least 1% is a polymorphism; in less than 1% a rare variant; a haplotype is a group of variants inherited together.</li>
<li><b>Linkage disequilibrium.</b> The "more often than chance" part, not just co-existing on one chromosome.</li>
<li><b>Allele frequency vs genotype frequency.</b> One version of the gene vs the two-allele combination.</li>
<li><b>Out of Hardy-Weinberg equilibrium.</b> The results cannot be generalized to the population.</li>
</ul>

<p>How she asks it: define haplotype and linkage disequilibrium; read the haplotypes off the figure; allele vs genotype frequency; what being out of Hardy-Weinberg equilibrium means for a study.</p>
<p class="sub">Sources: Intro to PGx slides ‘Haplotype’ (p. 19), ‘Illustration of Haplotype’ (p. 20), ‘Frequencies in Pharmacogenomics’ (p. 21); Quiz 4 (her questions; the answers used here were confirmed by her grading); (T) 10/20. Questions L17-045 to L17-051.</p>
<!--STEP:haplotype-->
</section>
<section class="guide" id="guide3-l17-7">
<h3>39. Pharmacogenomics on this exam: every term from the slides through ‘Frequencies’</h3>

<h4>The idea</h4>
<p>The class voted to include the 10/20 pharmacogenomics lecture on this exam, so the exam covers that lecture through ‘Frequencies in Pharmacogenomics’ (p. 21), along with toxicology and the poisoning table. Her objectives slide is short, but she said it implies every term on every slide.</p>

<h4>What is in scope</h4>
<table class="reftab"><thead><tr><th>On this exam</th><th>Not on this exam (not reached on 10/20)</th></tr></thead><tbody>
<tr><td>Introduction: the historical development and the current uses and limitations (sections 33 to 35)</td><td>Polymorphism nomenclature, pp. 22–29: allele numeric/alphabetic, SNP, star and rs nomenclature, genotype and haplotype nomenclature</td></tr>
<tr><td>Every term on pp. 13–21: wild type, variant, polymorphism, rare variant, SNP, allele, homozygous, heterozygous, genotype, phenotype, functional significance, haplotype, linkage disequilibrium, allele and genotype frequency, Hardy-Weinberg equilibrium (sections 36 to 38)</td><td>Types of genetic variants, pp. 30–41</td></tr>
<tr><td>The poisoning table, included whichever way the vote went</td><td>Examples she said she would cover later: digoxin and P-gp in detail, the β-adrenergic receptor guidance document, oncology drug targets, HLA examples, warfarin as a haplotype example, gene dose</td></tr>
</tbody></table>

<h4>Her words</h4>
<ul>
<li>"Every slide with a term on it, you need to know those terms" <small>(T) 10/20; slide ‘Outline and Objectives’</small></li>
<li>"your exam covers only toxicology, or your exam covers everything through what we got done today." <small>(T) 10/20</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>"Only the terms listed in the objectives."</b> The objectives say "define pharmacogenomics terminology"; she means every term on every slide.</li>
<li><b>Nomenclature questions (star alleles, rs numbers, SNP notation).</b> Those slides were not reached on 10/20 and are not on this exam.</li>
</ul>

<p>How she asks it: the scope is set by her vote; for 10/20 she tests the terms on every slide she taught.</p>
<p class="sub">Sources: Intro to PGx slide ‘Outline and Objectives’ (p. 2), slides pp. 22–41 (not reached); (T) 10/20. Questions L17-052 to L17-060.</p>
</section>
`;
