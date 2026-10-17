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

<h3 id="ref3-l14-1">10. Indices from dose–response curves (taught 10/13)</h3>
<table class="reftab"><thead><tr><th>Index</th><th>Formula (her words)</th><th>Used for</th><th>Slope information</th><th>Source</th></tr></thead><tbody>
<tr><td>Therapeutic index (TI)</td><td>Toxic dose / therapeutic dose; usually TD50 / ED50; any percentage, but the same in numerator and denominator</td><td>Medications, single doses; wide = less chance of toxicity, narrow = toxic dose not much above therapeutic</td><td>None ("just looking at one point in the graph")</td><td>Tox ‘Values Developed from Dose-Response’; T 10/13</td></tr>
<tr><td>Margin of safety (MOS)</td><td>TD1 / ED99</td><td>Medications, single doses</td><td>Yes, from the different percentages</td><td>Tox ‘Values Developed from Dose-Response’; T 10/13</td></tr>
<tr><td>Margin of exposure (MOE)</td><td>NOAEL / chronic exposure</td><td>Non-therapeutic compounds (pollutant, occupational), repeated exposures; comparing contaminants to pick the cleanup</td><td>—</td><td>Tox ‘Values Developed from Dose-Response’; T 10/13</td></tr>
</tbody></table>
<p class="sub">NOAEL ("Noel"): no observable adverse effect level, a dose from animal exposure studies at which the animals had no adverse response. Denominator: the total exposure calculated for the human (or wild animal). All three are for comparing compounds with each other. T 10/13.</p>

<h3 id="ref3-l14-2">11. Potency and the three curves of one compound</h3>
<table class="reftab"><thead><tr><th>Figure</th><th>What she read from it</th><th>Source</th></tr></thead><tbody>
<tr><td>A vs B, same response</td><td>A is more potent: the response starts at a lower dose</td><td>Tox dose–response slides; T 10/13</td></tr>
<tr><td>C vs D, C levels off, D linear</td><td>C more potent at low doses, D after the curves cross: the trick question. C levels off from receptor saturation, saturated metabolism, saturated transport (P-glycoprotein), partial agonism, or a pH change; cover a wide dose range or the crossing is missed</td><td>Tox dose–response slides; T 10/13</td></tr>
<tr><td>ED, TD, LD lines of one compound</td><td>Effective, then toxic, then lethal with rising dose; not parallel → different targets and mechanisms for the three outcomes (ADME differences also contribute)</td><td>Tox dose–response slides; T 10/13</td></tr>
</tbody></table>

<h3 id="ref3-l14-3">12. The reading by principle: humans vs wildlife, as discussed</h3>
<table class="reftab"><thead><tr><th>Principle</th><th>Humans</th><th>Wildlife</th><th>Source</th></tr></thead><tbody>
<tr><td>Source</td><td colspan="2">The same for both: excreted parent drug and metabolites; improper disposal (unused antibiotics flushed); livestock on feedlots and in chicken houses given hormones and antibiotics; wastewater treatment plants that do not remove all drugs</td><td>Guide; T 10/13</td></tr>
<tr><td>Exposure</td><td>Mostly drinking water (also bathing, swimming); about parts per trillion; estrogen higher on big-city shorelines</td><td>Constant: drinking, breathing (fish), skin (frogs, a sentinel species), eating other exposed animals</td><td>Guide; T 10/13</td></tr>
<tr><td>ADME, dose, target</td><td>Known from drug development, except many unknown metabolites</td><td>Rarely known: test species are rodents, guinea pigs, dogs, pigs, not otters, whales, fish or mollusks</td><td>Guide; T 10/13</td></tr>
<tr><td>Dose</td><td>Parts per trillion never reaches a therapeutic daily dose: "probably OK"; watch sensitive populations (in utero, children, elderly, disease, immunocompromised) and rising concentrations</td><td>Frogs, some fish and alligators shifting toward female where estrogen is higher (a red flag); other wildlife unknown</td><td>Guide; T 10/13</td></tr>
<tr><td>Also</td><td colspan="2">Bacteria in waters and sediments becoming resistant to antibiotics in the environment: "That is a problem."</td><td>T 10/13</td></tr>
</tbody></table>

<h3 id="ref3-l14-4">13. Undesired effects: the general-concept pairs</h3>
<table class="reftab"><thead><tr><th>Pair</th><th>Her example</th><th>Source</th></tr></thead><tbody>
<tr><td>Immediate vs delayed</td><td>DES → vaginal cancer in the daughters (years); some organophosphate pesticides → neuropathy days later (slide: TOCP)</td><td>TR ‘Immediate vs. Delayed’; T 10/13</td></tr>
<tr><td>Reversible vs irreversible</td><td>Reversibility = ability to regenerate. Liver: often reversible (mild injury). Nerve and CNS cells: irreversible. Cancer and birth defects: irreversible</td><td>TR ‘Reversible vs. Irreversible’; T 10/13</td></tr>
<tr><td>Local vs systemic</td><td>Local at first contact: acid on skin, chlorine gas (highly reactive agents often never go systemic). Systemic needs absorption; most toxins are systemic. Both: tetraethyl lead (burn, then neurotoxic death). Indirect systemic: acid burn → fluid loss → kidney problems</td><td>TR ‘Local vs. Systemic’; T 10/13</td></tr>
<tr><td>Chemical interactions</td><td>Additive, synergistic, potentiation, antagonism; multiple exposures make site risk hard to quantify</td><td>TR ‘Chemical Interactions’; T 10/13</td></tr>
<tr><td>Tolerance: dispositional (ADME) vs reduced responsiveness (pharmacodynamic)</td><td>Carbon tetrachloride inhibits its own metabolism; cadmium induces its metal-carrying protein. Receptor down-regulation</td><td>TR ‘Tolerance’; T 10/13</td></tr>
<tr><td>Variations in effect</td><td>Selective toxicity: lethal to one species, not another. Species differences: qualitative and/or quantitative; arsenic palm-and-sole skin cancer with no animal model. Individual differences: genetics (pharmacogenomics)</td><td>TR ‘Variations in Effect’; T 10/13</td></tr>
</tbody></table>

<h3 id="ref3-l14-5">14. On-target and off-target examples</h3>
<table class="reftab"><thead><tr><th>Label</th><th>Drug</th><th>Desired effect</th><th>Undesired effect</th><th>Source</th></tr></thead><tbody>
<tr><td>On-target, right tissue</td><td>Any drug</td><td>—</td><td>Dose at the receptor too high: dosing error, deliberate overdose, slowed clearance (liver disease), receptor down-regulation with the dose unchanged</td><td>TR ‘On-Target Examples’; T 10/13</td></tr>
<tr><td>On-target, wrong tissue</td><td>Diphenhydramine (Benadryl)</td><td>Peripheral histamine receptors: allergy relief</td><td>Brain histamine receptors: drowsiness (newer antihistamines do not cross the blood-brain barrier)</td><td>TR ‘On-Target Examples’; T 10/13</td></tr>
<tr><td>Off-target, unintended receptor</td><td>Terfenadine (Seldane, withdrawn)</td><td>Peripheral H1 antagonism</td><td>Cardiac potassium channel inhibition, arrhythmias; worse with grapefruit</td><td>TR ‘Off-Target Examples’; T 10/13</td></tr>
<tr><td>Off-target, enantiomer</td><td>Racemic thalidomide</td><td>R-enantiomer: anti-nausea</td><td>S-enantiomer: potent teratogen (used today in oncology)</td><td>TR ‘Off-Target Examples’; T 10/13</td></tr>
<tr><td>Off-target, receptor subtype</td><td>Propranolol</td><td>Beta-1 in the heart: lower heart rate</td><td>Beta-2 in airway smooth muscle: asthma exacerbation</td><td>TR ‘Off-Target Examples’; T 10/13</td></tr>
</tbody></table>

<h3 id="ref3-l14-6">15. Non-organ-specific endpoints</h3>
<table class="reftab"><thead><tr><th>Endpoint</th><th>Why non-organ specific</th><th>Her examples</th><th>Source</th></tr></thead><tbody>
<tr><td>Fibrosis</td><td>The same collagen and extracellular matrix pathology in any organ</td><td>Pulmonary: amiodarone, bleomycin, paraquat. Liver: amiodarone, ethanol (cirrhosis)</td><td>TR ‘Non-Organ Specific: Fibrosis’; T 10/13</td></tr>
<tr><td>Genotoxicity</td><td>DNA damage in somatic or germ cells; mutagenicity = transmissible (germ cells)</td><td>Results: cancer, teratogenesis, genetically based disorders</td><td>TR ‘Non-Organ Specific: Genotoxicity’; T 10/13</td></tr>
<tr><td>Cancer</td><td>The same cellular mechanism (mutation) can cause cancers in different organs</td><td>Incidence: lung and bronchial highest in both sexes, then prostate (men), breast (women). Multistage model: more than one mutation (skipped)</td><td>TR ‘Non-Specific: Cancer’; T 10/13</td></tr>
<tr><td>Teratogenesis</td><td>Time of exposure in gestation sets the type of defect</td><td>Retinoids in hamsters: microphthalmia, exencephaly, spina bifida, cleft palate, forelimb shortening, tail. Cleft palate from methanol (day 7), TCDD (day 11), 2,4,5-trichloroacetic acid (day 12), dexamethasone (day 13). Dose: the mother must get enough to pass to the baby. FDA labeling now adds fertility (male included) and lactation</td><td>TR ‘Teratogenesis’ slides; T 10/13</td></tr>
</tbody></table>

<h3 id="ref3-l15-1">16. Pulmonary toxicity</h3>
<table class="reftab"><thead><tr><th>Point</th><th>What she said</th><th>Source</th></tr></thead><tbody>
<tr><td>Why the lungs are susceptible</td><td>Oxidative burden (inhaled oxygen and oxygen-containing gases; reactive oxygen species from white blood cells); gas exposures (water solubility sets the site of deposition); particle exposures (size, breathing pattern, airway diameter, clearance)</td><td>Toxic Responses ‘Pulmonary Toxicity – Why are lungs susceptible?’; T 10/14</td></tr>
<tr><td>Gases</td><td>"very hydrophilic gasses. Will actually go quite far down into the lungs and your hydrophobic gasses do not"</td><td>T 10/14</td></tr>
<tr><td>Small particles</td><td>Do not get past the upper airway; breathed back out</td><td>T 10/14</td></tr>
<tr><td>Large particles</td><td>Impact at the bifurcations of the upper airways; long thin fibers (asbestos) embed and migrate → mesothelioma</td><td>T 10/14</td></tr>
<tr><td>Medium particles</td><td>The concern: not exhaled, turn the corners, settle in the lower lung as the breath stills</td><td>T 10/14</td></tr>
<tr><td>Acute responses</td><td>Airway reactivity (bronchoconstriction, wheezing, coughing, chest tightness, dyspnea); pulmonary edema (thickened alveolar-capillary barrier)</td><td>Toxic Responses ‘Types of Pulmonary Toxicity’; T 10/14</td></tr>
<tr><td>Chronic responses</td><td>Fibrosis (more collagen, less plasticity); emphysema (too plastic, hyperinflation, air trapping); asthma</td><td>Toxic Responses ‘Types of Pulmonary Toxicity’; T 10/14</td></tr>
<tr><td>Airborne vs systemic toxins</td><td>Airborne: particulates, oxygen. Systemic (given IV or swallowed) causing pulmonary fibrosis: bleomycin, cyclophosphamide, monocrotaline, paraquat</td><td>Toxic Responses ‘Types of Pulmonary Toxicity’; T 10/14</td></tr>
</tbody></table>

<h3 id="ref3-l15-2">17. Neurotoxicity</h3>
<table class="reftab"><thead><tr><th>Feature</th><th>Why it matters</th><th>Source</th></tr></thead><tbody>
<tr><td>Blood–brain barrier</td><td>Tight junctions instead of fenestrations; tightly connected glial cells; keeps out larger and non-lipophilic compounds; not continuous; still developing at birth (months to years)</td><td>Toxic Responses ‘Neurotoxicity’; T 10/14</td></tr>
<tr><td>Energy</td><td>Very high requirements; dependent on aerobic metabolism</td><td>Toxic Responses ‘Energy and Axons’; T 10/14</td></tr>
<tr><td>Axonal transport</td><td>Very long cells must move nutrients and waste up and down the axon</td><td>Toxic Responses ‘Energy and Axons’; T 10/14</td></tr>
<tr><td>Myelin</td><td>Schwann cells wrapped layer on layer; speeds conduction; damage → slower conduction, tingling hands and feet</td><td>Toxic Responses ‘Myelin’; T 10/14</td></tr>
<tr><td>Neurotransmission</td><td>Release, binding, reuptake can each be disturbed; organophosphates</td><td>Toxic Responses ‘Neurotransmission’; T 10/14</td></tr>
</tbody></table>
<table class="reftab"><thead><tr><th>Pattern (Fig 16-2)</th><th>What happens</th><th>Her example</th></tr></thead><tbody>
<tr><td>Neuronopathy (B)</td><td>The entire neuron dies; gliosis</td><td>"Killed the whole thing"</td></tr>
<tr><td>Axonopathy (C)</td><td>Axon degenerates; cell body survives (chromatolysis)</td><td>"like a chemical. Like cut the axon"</td></tr>
<tr><td>Myelinopathy (D)</td><td>Myelin or myelinating cells damaged; remyelination slow, worse in CNS than PNS</td><td>Metronidazole (Flagyl): her tingling hands and feet</td></tr>
<tr><td>Neurotransmission (E)</td><td>Excitation blocked or excessive; cell looks normal</td><td>Organophosphates</td></tr>
</tbody></table>
<p class="sub">A neurotoxin usually causes one discrete pattern. T 10/14.</p>

<h3 id="ref3-l15-3">18. Hepatotoxicity</h3>
<table class="reftab"><thead><tr><th>Why the liver is susceptible</th><th>Detail</th><th>Source</th></tr></thead><tbody>
<tr><td>Takes up and concentrates compounds</td><td>Portal circulation delivers everything absorbed orally</td><td>Toxic Responses ‘Hepatotoxicity – Why is liver susceptible?’; T 10/14</td></tr>
<tr><td>Does a lot of metabolism</td><td>May bioactivate compounds to hepatotoxic metabolites (acetaminophen → NAPQI)</td><td>same; T 10/14</td></tr>
<tr><td>Own inflammatory cells</td><td>Kupffer cells release inflammatory cytokines and reactive oxygen species while cleaning up</td><td>same; T 10/14</td></tr>
<tr><td>Idiosyncratic reactions</td><td>The organ most likely to have them; pharmacogenomics now explains some (rare variant → different metabolism)</td><td>same; T 10/14</td></tr>
<tr><td>Not a reason</td><td>"It's a large organ, yeah, that really doesn't have anything to do with it"</td><td>PollEV; T 10/14</td></tr>
</tbody></table>
<table class="reftab"><thead><tr><th>Kind of liver response (Klaassen Table 13-2)</th><th>Meaning</th><th>Representative toxicants on the slide</th></tr></thead><tbody>
<tr><td>Hepatocyte death</td><td>Death of the metabolizing cells</td><td>Acetaminophen, allyl alcohol, Cu, dimethylformamide, ethanol</td></tr>
<tr><td>Fatty liver (steatosis)</td><td>Fat in the liver</td><td>Amiodarone, CCl4, ethanol, fialuridine, tamoxifen, valproic acid</td></tr>
<tr><td>Canalicular cholestasis</td><td>Bile flow blocked; lining cells damaged and inflamed</td><td>Chlorpromazine, cyclosporin A, 1,1-dichloroethylene, estrogens, Mn, phalloidin</td></tr>
<tr><td>Bile duct damage</td><td>The duct itself injured</td><td>Alpha-naphthylisothiocyanate, amoxicillin, methylenedianiline, sporidesmin</td></tr>
<tr><td>Sinusoidal endothelial damage</td><td>Vessel lining injured</td><td>Cyclophosphamide, microcystin, pyrrolizidine alkaloids</td></tr>
<tr><td>Inflammation</td><td>—</td><td>Bacterial endotoxin, ethanol</td></tr>
<tr><td>Liver regeneration</td><td>—</td><td>Acetaminophen, ethanol, estrogens</td></tr>
<tr><td>Fibrosis and cirrhosis</td><td>—</td><td>CCl4, ethanol, thioacetamide, vitamin A, vinyl chloride</td></tr>
<tr><td>Liver cancers</td><td>—</td><td>Aflatoxin, androgens, arsenic, thorium dioxide, vinyl chloride</td></tr>
</tbody></table>
<p class="sub">Not to be memorized; know the kinds of response. Ethanol appears in five rows, aflatoxin in one. Pattern of injury is found by imaging and liver biopsy. T 10/14.</p>
<table class="reftab"><thead><tr><th>Zone (acinus)</th><th>Location</th><th>Oxygen</th><th>Enzymes</th><th>Injury example</th></tr></thead><tbody>
<tr><td>Zone 1</td><td>Closest to the inflow vessels (hepatic artery, portal vein)</td><td>Relatively high</td><td>Many phase 2 enzymes</td><td>—</td></tr>
<tr><td>Zone 2</td><td>Intermediate</td><td>—</td><td>—</td><td>—</td></tr>
<tr><td>Zone 3</td><td>Closest to the central vein (outflow)</td><td>Relatively hypoxic</td><td>CYP2E1 higher than in zone 1</td><td>Hepatocyte death after acetaminophen overdose</td></tr>
</tbody></table>
<p class="sub">Two reasons for site-specific liver injury: the oxygen gradient and non-homogeneous enzyme expression. Kupffer cells are everywhere. Toxic Responses ‘Reasons for Site-Specific Hepatotoxicity’; T 10/14.</p>

<h3 id="ref3-l15-4">19. Nephrotoxicity</h3>
<table class="reftab"><thead><tr><th>Why the kidneys are susceptible</th><th>Source</th></tr></thead><tbody>
<tr><td>Large delivery of potential toxins in the systemic circulation, including fresh liver metabolites</td><td>Toxic Responses ‘Nephrotoxicity - Why are kidneys susceptible?’; T 10/14</td></tr>
<tr><td>Concentrating urine concentrates poisons in the tubule and promotes uptake into tubular cells</td><td>same</td></tr>
<tr><td>Renal transport, accumulation and metabolism make in-situ toxicity likely</td><td>same</td></tr>
<tr><td>Sensitivity to vasoconstrictors (afferent and efferent arterioles) → lower blood flow, lower GFR</td><td>same; T 10/14</td></tr>
</tbody></table>
<table class="reftab"><thead><tr><th>Mechanism (Klaassen Table 14-2)</th><th>Example compounds on the slide</th><th>Her additions</th></tr></thead><tbody>
<tr><td>Prerenal</td><td>Diuretics, angiotensin receptor antagonists, ACE inhibitors, antihypertensives</td><td>—</td></tr>
<tr><td>Vasoconstriction</td><td>NSAIDs, radiocontrast agents, cyclosporine, tacrolimus</td><td>NSAIDs</td></tr>
<tr><td>Crystalluria</td><td>Sulfonamides, methotrexate, acyclovir, triamterene, ethylene glycol, protease inhibitors</td><td>Depends on drug chemistry</td></tr>
<tr><td>Tubular toxicity</td><td>Aminoglycosides, cisplatin, vancomycin, pentamidine, radiocontrast agents, heavy metals, haloalkane and haloalkene cysteine conjugates</td><td>Depends on drug chemistry</td></tr>
<tr><td>Endothelial injury</td><td>Cyclosporine, mitomycin C, tacrolimus, cocaine, conjugated estrogens, quinine</td><td>—</td></tr>
<tr><td>Glomerulopathy</td><td>Gold, penicillamine, NSAIDs</td><td>NSAIDs</td></tr>
<tr><td>Interstitial nephritis</td><td>Antibiotics, NSAIDs, diuretics</td><td>NSAIDs; proton pump inhibitors (omeprazole), especially with an aspirin allergy</td></tr>
</tbody></table>
<p class="sub">Not to be memorized; know the kinds of damage. NSAIDs: limit use, drink lots of water. OTC PPI label: two weeks (get persistent reflux checked; interstitial nephritis). Most important site-specific factor: which enzymes are expressed where in the nephron. T 10/14.</p>

<h3 id="ref3-l15-5">20. Idiosyncratic and immunologic responses</h3>
<table class="reftab"><thead><tr><th>Endpoint</th><th>Definition</th><th>Source</th></tr></thead><tbody>
<tr><td>Idiosyncratic toxicity</td><td>Genetically determined abnormal reactivity; qualitatively like others' response but extreme; not every low-frequency reaction; pharmacogenomics may explain</td><td>Toxic Responses ‘Idiosyncratic Toxicity’; T 10/14</td></tr>
<tr><td>Immunologic (slide: allergic) responses</td><td>Drug recognized as foreign. Small molecules (under 600 daltons) act as haptens bound to body proteins; large drugs (peptides, proteins) activate the immune system directly</td><td>Toxic Responses ‘Allergic Responses’; T 10/14</td></tr>
<tr><td>Two categories</td><td>Hypersensitivity (types 1 to 4); autoimmune reactions (increasingly with biologicals)</td><td>same; T 10/14</td></tr>
</tbody></table>

<h3 id="ref3-l15-6">21. How overdose changes kinetics and pharmacodynamics</h3>
<table class="reftab"><thead><tr><th>Parameter</th><th>Change in overdose</th><th>Her example</th><th>Source</th></tr></thead><tbody>
<tr><td>Volume of distribution</td><td>Large-Vd drugs (over 5 L/kg: antidepressants, antipsychotics, antimalarials, opioids, propranolol, verapamil) are hard to remove by hemodialysis</td><td>Drug sequestered in lipid, muscle, bone must move back into the blood; prolonged dialysis</td><td>Treating Poisonings ‘How Pharmacokinetics change in Overdose’; T 10/14</td></tr>
<tr><td>Absorption</td><td>Slowed tablet dissolution or gastric emptying delays absorption and peak toxic effect; GI injury increases absorption</td><td>Iron blows apart the gut; saturable active transport no longer protects</td><td>same; T 10/14</td></tr>
<tr><td>First pass</td><td>Saturated liver metabolism → reduced first-pass effect → more drug in circulation</td><td>"too much drug for the liver to handle"</td><td>same; T 10/14</td></tr>
<tr><td>Protein binding</td><td>Capacity exceeded → larger free fraction → toxicity</td><td>Blood protein binding</td><td>same; T 10/14</td></tr>
<tr><td>Elimination order</td><td>First order may become zero order; half-life extended</td><td>Slide only</td><td>same</td></tr>
<tr><td>Pharmacodynamics: TI overlap</td><td>Drugs A and B sedate at the same dose; B plateaus at anesthesia, A rises to coma</td><td>"Which one can you increase the dose and not have an unwanted adverse effect? B."</td><td>Treating Poisonings ‘How Pharmacodynamics change in Overdose’; T 10/14</td></tr>
<tr><td>Pharmacodynamics: added effects</td><td>TCAs reduce sweating while increasing muscle activity and seizures</td><td>"double whammy"; TCA overdoses rarely survivable</td><td>same; T 10/14</td></tr>
<tr><td>Pharmacodynamics: elimination organs</td><td>Beta blockers and calcium channel blockers reduce blood flow to kidney and liver → slower elimination</td><td>"the dose stays high"</td><td>same; T 10/14</td></tr>
</tbody></table>

<h3 id="ref3-l15-7">22. Treatment approaches and preventing absorption</h3>
<table class="reftab"><thead><tr><th>Approach</th><th>Methods or categories</th><th>Covered</th></tr></thead><tbody>
<tr><td>Toxicokinetic-based (reduce the amount of poison in the body)</td><td>Prevent absorption; inhibit toxication (bioactivation); enhance metabolism (detoxification); enhance elimination</td><td>Prevent absorption on 10/14; the rest 10/19</td></tr>
<tr><td>Inactivation of the poison</td><td>Chelators; antivenoms and antibodies</td><td>10/19</td></tr>
<tr><td>Pharmacologically based</td><td>Receptor antagonist; receptor agonist; remove the poison from the active site; bypass an inhibited pathway</td><td>10/19</td></tr>
</tbody></table>
<table class="reftab"><thead><tr><th>Method</th><th>What it is</th><th>Risk or limit</th><th>Status</th></tr></thead><tbody>
<tr><td>Emesis (ipecac)</td><td>Induced vomiting</td><td>Aspiration is the biggest risk</td><td>No longer sold in the US or used in hospitals</td></tr>
<tr><td>Gastric lavage</td><td>Tube to the stomach; fluid pumped in and sucked out</td><td>Tube or fluid into the lungs; big tablets will not come back; esophageal rupture or stomach problems</td><td>Experienced ERs might try it for a massive ingestion</td></tr>
<tr><td>Whole bowel irrigation</td><td>Colonoscopy prep (polyethylene glycol, magnesium citrate) until it passes through</td><td>Needs an open gut (no ileus or blockage); messy</td><td>Experienced ERs will probably try it</td></tr>
<tr><td>Single-dose activated charcoal</td><td>Purified fine-particle charcoal slurry; bound drug leaves in feces</td><td>Vomiting and aspiration; only certain compounds stick; within 1 to 2 hours</td><td>Used when the compound sticks</td></tr>
<tr><td>Multiple-dose activated charcoal</td><td>Repeated doses</td><td>Only for compounds that stick to charcoal and undergo enterohepatic recirculation; can be used after absorption</td><td>Limited use</td></tr>
</tbody></table>
<p class="sub">Poison control centers (US and Europe): dangerous, risky, use only if you really think you have to; the ER decides. DiPiro ch. e9, "General approach to treatment". Treating Poisonings ‘Prevent Absorption’, ‘More on preventing absorption’; T 10/14.</p>

<h3 id="ref3-l15-8">23. Evidence-based consensus guidelines for out-of-hospital management</h3>
<table class="reftab"><thead><tr><th>Item</th><th>Detail</th><th>Source</th></tr></thead><tbody>
<tr><td>Compounds with guidelines</td><td>Acetaminophen; atypical antipsychotics; beta-blockers; calcium channel blockers; dextromethorphan; diphenhydramine and dimenhydrinate; iron; methylphenidate; salicylate; SSRIs; TCAs; valproic acid; elemental mercury; ethylene glycol; long-acting anticoagulant rodenticides</td><td>Treating Poisonings ‘Guidelines for Overdoses’</td></tr>
<tr><td>Source of evidence</td><td>Published case reports and case series, evaluated and graded by experts; not clinical trials; animals very rarely</td><td>T 10/14</td></tr>
<tr><td>Documents to discuss 10/19</td><td>Beta blockers; calcium channel blockers; differences between the two classes and between immediate- and extended-release ingestions; table for completion points</td><td>Treating Poisonings ‘Discussion of OD Guidelines’; T 10/14</td></tr>
</tbody></table>
`;
