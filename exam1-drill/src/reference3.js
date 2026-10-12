const REFERENCE3_HTML = `
<p class="sub">Notation: → = leads to; ↑ = rises; ↓ = falls. T = transcript date. Deck file: Principles-of-Tox-Lecture-Students-Fall-2026_WCAG21A.pdf (Tox), cited by slide title because the deck prints no slide numbers. Reading: RodriguezMozaz-EHP-2010.pdf.</p>

<h3 id="ref3-1">1. The words</h3>
<table class="reftab"><thead><tr><th>Word</th><th>Meaning</th><th>Her example</th><th>Source</th></tr></thead><tbody>
<tr><td>Poison</td><td>General term: anything that can cause a bad response</td><td>Platypus spurs, rat poison</td><td>Tox ‘Definitions’; T 10/9</td></tr>
<tr><td>Toxin</td><td>Toxic substance made by a biological system</td><td>Snake venom</td><td>Tox ‘Definitions’; T 10/9</td></tr>
<tr><td>Toxicant</td><td>Made by, or a by-product of, human activity</td><td>Smokestack emissions</td><td>Tox ‘Definitions’; T 10/9</td></tr>
<tr><td>Xenobiotic</td><td>A compound not expected to be in the organism (foreign)</td><td>Any drug or pollutant in a person or animal</td><td>Tox ‘Definitions’; T 10/9</td></tr>
<tr><td>Bioactivation</td><td>Metabolism to something more harmful than the parent (also toxication, metabolic activation)</td><td>Acetaminophen → NAPQI by CYP2E1</td><td>Tox ‘ADME: Metabolism’; T 10/9</td></tr>
<tr><td>Detoxification</td><td>Metabolism to something less harmful</td><td>Acetaminophen → glucuronide or sulfate</td><td>Tox ‘ADME: Metabolism’; T 10/9</td></tr>
<tr><td>Hormesis</td><td>A non-essential substance with a beneficial low-dose region and no region of homeostasis</td><td>Red wine</td><td>Tox ‘Shape of Dose-Response’; T 10/9</td></tr>
</tbody></table>

<h3 id="ref3-2">2. The five principles</h3>
<table class="reftab"><thead><tr><th>Principle</th><th>The question it asks</th><th>Source</th></tr></thead><tbody>
<tr><td>Source</td><td>Where does the toxin or toxicant come from: environmental, occupational, bites and stings, medications</td><td>Tox ‘Source’; T 10/9</td></tr>
<tr><td>Exposure</td><td>Route, vehicle and formulation, duration, single vs repeated, frequency</td><td>Tox ‘Exposure’ slides; T 10/9</td></tr>
<tr><td>ADMET</td><td>Absorption, distribution, metabolism, excretion and toxicity; bioactivation vs detoxification</td><td>Tox ‘ADME’; T 10/9</td></tr>
<tr><td>Dose</td><td>Is the exposure high enough to cause a problem; the dose makes the poison (Paracelsus)</td><td>Tox ‘Dose’; T 10/9</td></tr>
<tr><td>Target and mechanism</td><td>The toxic target may differ from the therapeutic target (slide not yet taught)</td><td>Tox ‘Target &amp; Mechanism of Action’; T 10/9</td></tr>
</tbody></table>

<h3 id="ref3-3">3. Routes of exposure</h3>
<table class="reftab"><thead><tr><th>Ranking</th><th>Order</th><th>Source</th></tr></thead><tbody>
<tr><td>Most common first</td><td>Oral → inhalation → topical → parenteral</td><td>T 10/9</td></tr>
<tr><td>Most effective at delivering a toxic agent first</td><td>Intravenous → inhalation → oral → dermal</td><td>Tox ‘Exposure: Route’</td></tr>
<tr><td>Oral vs IV at equal doses, compound detoxified by the liver</td><td>Oral is the less dangerous route: first pass removes part of the dose; IV skips it</td><td>T 10/9</td></tr>
<tr><td>Immediate vs extended release in overdose</td><td>"It depends": an extended-release mass can clump and then release at once</td><td>T 10/9</td></tr>
</tbody></table>

<h3 id="ref3-4">4. Durations of exposure (animal studies)</h3>
<table class="reftab"><thead><tr><th>Term</th><th>Duration</th><th>Source</th></tr></thead><tbody>
<tr><td>Acute</td><td>Less than 24 hours</td><td>Tox ‘Exposure: Duration’; T 10/9</td></tr>
<tr><td>Subacute</td><td>Less than 1 month</td><td>Tox ‘Exposure: Duration’; T 10/9</td></tr>
<tr><td>Subchronic</td><td>1 to 3 months</td><td>Tox ‘Exposure: Duration’; T 10/9</td></tr>
<tr><td>Chronic</td><td>More than 3 months, up to years</td><td>Tox ‘Exposure: Duration’; T 10/9</td></tr>
</tbody></table>
<p class="sub">Single vs repeated: benzene (one exposure: headache and sleepiness; chronic low dose: leukemia); DES (the daughters' vaginal cancer years later); a chronic exposure can also give an immediate effect after each exposure. T 10/9.</p>

<h3 id="ref3-5">5. Frequency and half-life (Casarett and Doull Figure 2-4)</h3>
<table class="reftab"><thead><tr><th>Compound</th><th>Half-life</th><th>Single dose</th><th>Repeated quarter doses</th></tr></thead><tbody>
<tr><td>A</td><td>Longest</td><td>Concentration declines slowest</td><td>Accumulates into the toxic zone first</td></tr>
<tr><td>B</td><td>About the dosing interval</td><td>Intermediate</td><td>Accumulates into the toxic zone later than A</td></tr>
<tr><td>C</td><td>Shortest</td><td>Cleared quickly</td><td>Never reaches the toxic zone; can still harm by allergy, another target, synergy or injection-site irritation</td></tr>
</tbody></table>
<p class="sub">Tox ‘Exposure: Frequency’; T 10/9.</p>

<h3 id="ref3-6">6. Acetaminophen</h3>
<table class="reftab"><thead><tr><th>Dose</th><th>Pathway</th><th>Product</th><th>Source</th></tr></thead><tbody>
<tr><td>Up to the labeled 4 g per day</td><td>Phase 2: glucuronosyl transferases and sulfotransferases (her spoken shorthand: "GSTs and STs")</td><td>Glucuronide and sulfate conjugates (detoxification)</td><td>Tox ‘Example of Bioactivation’; T 10/9</td></tr>
<tr><td>Above what phase 2 can handle</td><td>Phase 1: CYP2E1</td><td>NAPQI, the liver-toxic metabolite (bioactivation)</td><td>Tox ‘Example of Bioactivation’; T 10/9</td></tr>
<tr><td>At or below 4 g with liver injury</td><td>Low-activity phase 2 enzymes (genetic variation, age) or CYP2E1 induced by alcohol</td><td>NAPQI at an allowed dose</td><td>T 10/9</td></tr>
</tbody></table>

<h3 id="ref3-7">7. Rat LD50 table (Casarett and Doull Table 2-1, on the ‘Dose’ slide)</h3>
<table class="reftab"><thead><tr><th>Compound</th><th>LD50 (mg/kg)</th></tr></thead><tbody>
<tr><td>Ethyl alcohol</td><td>10,000</td></tr>
<tr><td>Sodium chloride</td><td>4,000</td></tr>
<tr><td>Morphine sulfate</td><td>900</td></tr>
<tr><td>Phenobarbital sodium</td><td>150</td></tr>
<tr><td>Strychnine sulfate</td><td>2</td></tr>
<tr><td>Nicotine</td><td>1</td></tr>
<tr><td>Tetrodotoxin</td><td>0.1</td></tr>
<tr><td>Dioxin (TCDD)</td><td>0.001</td></tr>
<tr><td>Botulinum toxin</td><td>0.00001</td></tr>
</tbody></table>
<p class="sub">She read the two ends aloud (ethyl alcohol 10,000; botulinum toxin 0.00001). T 10/9.</p>

<h3 id="ref3-8">8. Dose–response curve types</h3>
<table class="reftab"><thead><tr><th>Curve</th><th>What is plotted</th><th>What it gives</th><th>Source</th></tr></thead><tbody>
<tr><td>Individual dose–response</td><td>Each animal's (or dose group's) response against its dose, e.g. percent enzyme inhibition</td><td>Shows more than one effect when a chemical has more than one target</td><td>Tox ‘First Dose-Response Relationship’; T 10/9</td></tr>
<tr><td>Population dose–response</td><td>Fraction of the population responding against dose (cumulative mortality)</td><td>LD50 (about 100 mg/kg in her example) and threshold (about 10 mg/kg, the lowest dose with a response)</td><td>Tox ‘Second Dose-Response Relationship’; T 10/9</td></tr>
<tr><td>U-shape, essential substance</td><td>Deficiency → homeostasis → toxicity</td><td>Iron: too little and the blood cannot carry oxygen</td><td>Tox ‘Shape of Dose-Response’; T 10/9</td></tr>
<tr><td>U-shape, hormesis</td><td>Benefit at low dose → harm at high dose, no homeostasis region</td><td>Red wine</td><td>Tox ‘Shape of Dose-Response’; T 10/9</td></tr>
<tr><td>Threshold (sigmoid)</td><td>No response below a dose</td><td>Most agents</td><td>Tox ‘Threshold Dose’; T 10/9</td></tr>
<tr><td>Linear, no threshold</td><td>Response possible from the first molecule</td><td>The model used for carcinogens</td><td>Tox ‘Threshold Dose’; T 10/9</td></tr>
<tr><td>Cumulative dose (2-AAF, hamsters)</td><td>Tumor incidence by dose at 24 and at 33 months</td><td>Bladder threshold about 75 ppm at 24 months, lower at 33 months; liver tumors even at zero dose at 33 months</td><td>Tox ‘More on Threshold Dose’; T 10/9</td></tr>
</tbody></table>

<h3 id="ref3-9">9. Indices from dose–response curves (slide not yet taught)</h3>
<table class="reftab"><thead><tr><th>Index</th><th>Formula</th><th>Used for</th><th>Slope information</th></tr></thead><tbody>
<tr><td>Therapeutic index (TI)</td><td>Toxic dose / therapeutic dose</td><td>Single doses</td><td>None</td></tr>
<tr><td>Margin of safety (MOS)</td><td>TD1 / ED99</td><td>Single doses</td><td>Yes</td></tr>
<tr><td>Margin of exposure (MOE)</td><td>NOAEL / exposure</td><td>Repeated exposures to non-therapeutic compounds</td><td>—</td></tr>
</tbody></table>
<p class="sub">Tox ‘Values Developed from Dose-Response’. NOAEL = no observed adverse effect level. Deferred to 10/13.</p>
`;
