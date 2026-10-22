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
<tr><td>Reversible vs irreversible</td><td>Reversibility = ability to regenerate. Liver: often reversible (mild injury). Nerve and CNS cells: irreversible. Cancer and birth defects: irreversible. One exposure can cause both</td><td>TR ‘Reversible vs. Irreversible’; T 10/13</td></tr>
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
<tr><td>Myelin</td><td>Schwann cells (PNS) or oligodendrocytes (CNS) wrapped layer on layer; speeds conduction; damage → slower conduction, tingling hands and feet</td><td>Toxic Responses ‘Myelin’; T 10/14</td></tr>
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
<tr><td>Documents discussed 10/19 (see table 27)</td><td>Beta blockers; calcium channel blockers; differences between the two classes and between immediate- and extended-release ingestions; table for completion points</td><td>Treating Poisonings ‘Discussion of OD Guidelines’; T 10/14</td></tr>
</tbody></table>

<h3 id="ref3-l16-1">24. Toxicokinetic treatments II: inhibit bioactivation, enhance metabolism, enhance elimination</h3>
<table class="reftab"><thead><tr><th>Method</th><th>Example</th><th>What is given and what it does</th><th>Source</th></tr></thead><tbody>
<tr><td>Inhibit bioactivation (rarely possible)</td><td>Methanol: alcohol dehydrogenase, formaldehyde, formaldehyde dehydrogenase, formic acid (retina; loss of sight)</td><td>Ethanol (outcompetes) or fomepizole (binds and inhibits) alcohol dehydrogenase</td><td>‘methanol and ethylene glycol examples’; T 10/19</td></tr>
<tr><td>Inhibit bioactivation</td><td>Ethylene glycol (antifreeze; sweet): alcohol dehydrogenase, glycoaldehyde, aldehyde dehydrogenase, glycolic acid, oxalic acid (microcrystals block small vessels in kidneys, liver)</td><td>Same: ethanol or fomepizole</td><td>‘methanol and ethylene glycol examples’; T 10/19</td></tr>
<tr><td>Enhance metabolism (cofactors; induction takes days)</td><td>Cyanide (target: cytochrome c oxidase; ATP production stops)</td><td>Amyl nitrite oxidizes hemoglobin to methemoglobin; methemoglobin pulls cyanide off the enzyme; rhodanese helps thiosulfate take the cyanide for renal elimination (the cofactor step); methylene blue reduces methemoglobin back to hemoglobin</td><td>‘Cyanide example’ (Golan figure); T 10/19</td></tr>
<tr><td>Enhance metabolism</td><td>Acetaminophen (NAPQI, a free radical, damages the liver)</td><td>N-acetylcysteine supplies ingredients for glutathione, which conjugates NAPQI with the GST enzymes; stinks of sulfur; usually IV in the US, oral possible</td><td>‘Acetaminophen Example’; T 10/19</td></tr>
<tr><td>Enhance renal elimination (ion trapping)</td><td>Salicylates, phenobarbital (mildly acidic; filtered, then reabsorbed)</td><td>IV sodium bicarbonate makes the urine more basic; the acid becomes negatively charged and cannot be reabsorbed by the transporters; not done for weak bases (acidifying blood is dangerous; cranberry juice too weak and slow)</td><td>‘Enhance Renal Elimination’; T 10/19</td></tr>
<tr><td>Extracorporeal elimination</td><td>Very severe poisonings when other things are not working</td><td>Hemodialysis, hemofiltration, hemoperfusion; plasma exchange or exchange transfusion; works only if the chemistry allows (slide: small volume of distribution)</td><td>‘Extracorporeal enhancement of elimination’; T 10/19</td></tr>
</tbody></table>
<p class="sub">Recognition: symptoms first (a toxidrome), then a blood draw; emergency rooms screen for acetaminophen, salicylates, iron, beta blockers, calcium channel blockers, opiates. T 10/19.</p>

<h3 id="ref3-l16-2">25. Inactivation of poisons: chelators, antivenoms and antibodies</h3>
<table class="reftab"><thead><tr><th>Chelating agent</th><th>Metal chelated</th><th>Comment</th></tr></thead><tbody>
<tr><td>Edetate disodium</td><td>Lead</td><td></td></tr>
<tr><td>Dimercaprol (British anti-Lewisite, BAL)</td><td>Gold, arsenic, lead, mercury</td><td></td></tr>
<tr><td>Succimer</td><td>Lead, cadmium, mercury, arsenic</td><td>Taking the place of dimercaprol</td></tr>
<tr><td>Deferoxamine</td><td>Iron</td><td></td></tr>
<tr><td>Deferasirox</td><td>Iron</td><td>Orally bioavailable, recently FDA approved</td></tr>
<tr><td>Penicillamine and trientine</td><td>Copper</td><td>Usually for patients with Wilson's disease</td></tr>
</tbody></table>
<table class="reftab"><thead><tr><th>Item</th><th>Detail</th><th>Source</th></tr></thead><tbody>
<tr><td>When inactivation applies</td><td>Only once the poison is in the systemic circulation; the official sense of antidote</td><td>‘Inactivation of Poisons’; T 10/19</td></tr>
<tr><td>Requirements of an inactivator</td><td>Binds the toxin so it cannot reach its target; the complex is cleared; the complex has no toxicity (slide: low); high affinity for the toxin</td><td>‘Inactivation of Poisons’; T 10/19</td></tr>
<tr><td>Chelator properties</td><td>Small molecules with a nucleophilic electron donor forming a metal-ligand complex; multidentate (several binding points on one metal atom); higher affinity for the metal than tissue macromolecules; low affinity for calcium and other endogenous ions; water soluble, non-toxic, readily cleared; structures not required</td><td>‘Heavy Metal Chelators’, ‘Structure of chelators’; T 10/19</td></tr>
<tr><td>Polyclonal antivenom</td><td>Animal inoculated with small amounts of venom; antibodies filtered from its blood; a collection of antibodies, not one clone; danger: type III hypersensitivity (serum sickness: fever, nausea, malaise)</td><td>‘Antivenoms and Antibodies’; T 10/19</td></tr>
<tr><td>Digoxin immune Fab</td><td>Sheep-derived antibody fragments (ovine Fab, from sheep immunized with a digoxin derivative) that grab overdosed digoxin and clear it from the blood; the one antibody antidote for a drug. She said “monoclonal”; the label does not.</td><td>‘Antivenoms and Antibodies’; T 10/19; DigiFab label</td></tr>
</tbody></table>
<p class="sub">Memorize the chelator table: agent and metal. Side effects not covered. ‘Example Chelating Agents’; T 10/19.</p>

<h3 id="ref3-l16-3">26. Pharmacological treatment: four categories and their examples</h3>
<table class="reftab"><thead><tr><th>Category</th><th>Example</th><th>How it works</th><th>Source</th></tr></thead><tbody>
<tr><td>Treatment is a receptor antagonist</td><td>Naloxone (opioid overdose)</td><td>Antagonist of the opioid receptor</td><td>‘Treatment is a receptor antagonist’; T 10/19</td></tr>
<tr><td>Treatment is a receptor antagonist</td><td>Flumazenil (benzodiazepine overdose)</td><td>Antagonist at the GABA-A (benzodiazepine) receptor the benzodiazepine is agonizing</td><td>‘Treatment is a receptor antagonist’; T 10/19</td></tr>
<tr><td>Treatment is a receptor antagonist</td><td>Atropine (organophosphate pesticides)</td><td>Organophosphates inhibit acetylcholinesterase; acetylcholine rises; atropine antagonizes it</td><td>‘Treatment is a receptor antagonist’; T 10/19</td></tr>
<tr><td>Treatment is a receptor agonist</td><td>Physostigmine (belladonna alkaloids, jimsonweed; anticholinergic; dilated pupils)</td><td>Blocks acetylcholinesterase to increase acetylcholine, so acts like an agonist</td><td>‘Treatment is a receptor agonist’; T 10/19</td></tr>
<tr><td>Treatment removes the toxin from the active site</td><td>Cyanide</td><td>Methemoglobin (made with amyl nitrite) pulls cyanide off cytochrome c oxidase</td><td>‘Treatment Removes Toxin from Active Site’; T 10/19</td></tr>
<tr><td>Treatment removes the toxin from the active site</td><td>Carbon monoxide</td><td>High concentrations of oxygen displace CO from the heme of hemoglobin (slide only)</td><td>‘Treatment Removes Toxin from Active Site’</td></tr>
<tr><td>Treatment removes the toxin from the active site</td><td>Organophosphates</td><td>Pralidoxime pulls the organophosphate off acetylcholinesterase onto itself for elimination; fails once the organophosphate has aged (part of it falls off; depends on its structure)</td><td>‘Pralidoxime example’; T 10/19</td></tr>
<tr><td>Treatment bypasses an inhibited pathway</td><td>Warfarin overdose</td><td>Warfarin inhibits epoxide reductase, so active vitamin K is not regenerated and fewer coagulation factors are carboxylated; vitamin K is given to bypass the block; signs of over-anticoagulation: bruising, GI bleeds, hemorrhagic stroke</td><td>‘Treatment by-passes an inhibited pathway’; T 10/19</td></tr>
</tbody></table>

<h3 id="ref3-l16-4">27. The beta-blocker and calcium channel blocker guidelines: her key</h3>
<table class="reftab"><thead><tr><th>Question on her key</th><th>Calcium channel blockers</th><th>Beta blockers</th></tr></thead><tbody>
<tr><td>Reduce absorption</td><td colspan="2">Charcoal, at the hospital; no vomiting at home (aspiration)</td></tr>
<tr><td>Asymptomatic, immediate-release</td><td colspan="2">Within 6 hours: hospital. After 6 hours: probably manage at home, watched</td></tr>
<tr><td>Asymptomatic, extended-release</td><td>Modified-release other than verapamil: within 18 hours, hospital. Modified-release verapamil: within 24 hours, hospital; after 24 hours, probably OK</td><td>Sustained-release: within 8 hours, hospital</td></tr>
<tr><td>Why the extended-release window</td><td colspan="2">The tablets clump in the stomach or small intestine and can break apart later with a huge absorption</td></tr>
<tr><td>Why the classes differ</td><td colspan="2">The case data; it speaks to the mechanisms of action (cardio module)</td></tr>
<tr><td>Transport</td><td colspan="2">Ambulance, not the family car: IVs, pressors, paddles</td></tr>
<tr><td>Follow-up</td><td>At the judgment of the poison center</td><td>Usually up to 12–24 hours, at the judgment of the poison center</td></tr>
<tr><td>Self-harm</td><td colspan="2">Counseling and evaluation; treat the whole patient</td></tr>
</tbody></table>
<p class="sub">Both published in Clinical Toxicology in 2005 and still followed; data and recommendations ranked; poison center staff have them memorized. Slides ‘Guidelines for Overdoses’, ‘Discussion of OD Guidelines’; T 10/19. Poisoning table sources: DiPiro 13e ch. e9 (treating specific poisonings) and the Marraffa 2012 antidotes article.</p>

<h3 id="ref3-tbl-1">Poisoning treatment table (her key)</h3>
<p class="row"><button type="button" class="chip" data-jump="ptab:ptab-top">Drill this table</button></p>
<p class="sub">Her Poisoning Treatment Table 2026 KEY, in her wording (spellings kept). On 10/20: “So what I have in my table in the key is sufficient. ... But you do know, need to know the details that I have in my table, my key.” Abbreviations in the key: OD = overdose; BB = beta blocker; MOA = mechanism of action; HIET is written as an abbreviation and not expanded; IV FE = i.v. 20% fatty acid emulsion; Fab = the antibody fragments; OP = organophosphate. Source: PoisoningTreatmentTable2026KEY.pdf; T 10/19, 10/20.</p>
<table class="reftab"><thead><tr><th>Overdosed medication</th><th>Symptoms of acute poisoning / diagnostic methods</th><th>Antidote(s)</th><th>MOA of antidote(s)</th><th>Special considerations (her question; her answer)</th><th>Reference</th></tr></thead><tbody>
<tr><td>Acetaminophen</td><td>Nausea/vomiting. Clinical signs of liver failure. Acetaminophen levels can be measured in the blood.</td><td>N-acetylcysteine</td><td>Replenishes glutathione</td><td>At what time after OD does the antidote lose effectiveness? About 8 hours after overdose. Should you still give it past that time point? Yes</td><td>Marraffa article</td></tr>
<tr><td>Toxic alcohols</td><td>Methanol active metabolites can cause anion-gap metabolic acidosis and ocular toxicity.<br>Ethylene glycol active metabolites can crystalize in the microvasculature; renal toxicity is common.</td><td>Ethanol or fomepizole</td><td>Inhibition of alcohol dehydrogenase</td><td>There are two possible treatments. Is there an advantage of one therapy over the other? Why? Fomepizole is stronger Alc Dehydrogenase inhibitor and has fewer adverse effects than ethanol.</td><td>Marraffa article</td></tr>
<tr><td>Benzodiazepines</td><td>CNS depression and relatively normal vitals. Benzodiazepine levels can be measured in the blood.</td><td>Flumazenil</td><td>Competitive antagonist of benzodiazepine receptor</td><td>What are some concerns when choosing to use this antidote? Flumazenil can cause withdrawal symptoms in a benzodiazepine dependent patient.</td><td>Marraffa article</td></tr>
<tr><td>Beta blockers</td><td>Hypotension, bradycardia, altered mental status, respiratory depression</td><td>Atropine<br>Calcium<br>Glucagon<br>HIET<br>Vasopressors<br>IV FE</td><td>Atropine: increase heart rate.<br>Calcium: Try to drive calcium into cardiac cells<br>Glucagon: increase cardiac cellular cAMP to increase heart rate<br>HIET: mechanisms of inotropic effects not understood.<br>vasopressors: increase blood pressure.<br>i.v. 20% fatty acid emulsion: Acts as a sink for the drug if the drug is lipophilic enough.</td><td>What can distinguish between Beta Blocker OD compared to Calcium Channel Blocker OD? BB OD may have altered mental status.</td><td>Marraffa article</td></tr>
<tr><td>Calcium channel blockers</td><td>Hypotension, bradycardia, but often alert.</td><td>Same as above for BB OD.</td><td>Same as above for BB OD.</td><td>(no question)</td><td>Marraffa article</td></tr>
<tr><td>Digoxin</td><td>Bradycardia, arrythmias, elevated serum potassium, nausea/vomiting. Digoxin levels can be measured in the blood.</td><td>Digoxin specific antibody fragments</td><td>Binds digoxin, will be renally eliminated</td><td>Once you give the antidote, why is checking serum digoxin concentrations not helpful? The total dig concentration (Free and bound to Fab) will be increased; can’t use this measurement to calculate more Fab doses.</td><td>Marraffa article</td></tr>
<tr><td>Tricyclic Antidepressants</td><td>tachycardia, dilated pupils, dry mouth, agitation, seizures, sometimes vasodilation, elongated QRS interval, reduced cardiac contractility</td><td>Intravenous fluids, dopamine or norepinephrine, sodium bicarbonate for elongated QRS interval</td><td>These options are mostly supportive care, trying to maintain blood pressure. Sodium bicarbonate counteracts the inhibition on sodium cardiac channels</td><td>(no question)</td><td>Basic and Clinical Pharmacology, Chapt 58</td></tr>
<tr><td>Opioids</td><td>Somnolence, coma, decreased heart and breath rates, decrease pupils</td><td>naloxone</td><td>Competitive antagonist of opioid receptors</td><td>What is a concern when using this antidote in chronic opioid users? It can trigger withdrawal</td><td>Marraffa article</td></tr>
<tr><td>Salicylates</td><td>hyperventilation and respiratory alkalosis then metabolic acidosis, hyperthermia, confusion and seizures</td><td>Supportive care, IV Sodium bicarbonate</td><td>Renal ion trapping to enhance elimination</td><td>(no question)</td><td>Basic and Clinical Pharmacology, Chapt 58</td></tr>
<tr><td>Sulfonylureas and miglitinide</td><td>hypoglycemia</td><td>octreotide</td><td>Inhibits insulin release from the pancreas</td><td>(no question)</td><td>Marraffa article</td></tr>
<tr><td>Iron</td><td>Vomiting, abdominal pain, and diarrhea within 1 to 6 hours.<br>Lethargy, coma, seizures, bloody vomiting, bloody diarrhea, and shock within 6 to 24 hours.<br>Hypotension and tachycardia within 6 to 24 hours.<br>Liver dysfunction and failure possible in 2 to 5 days.</td><td>Deferoxamine</td><td>Chelates the circulating ferric iron</td><td>(no question)</td><td>Pharmacotherapy: A Pathophysiologic Approach, 13th Ed. Chapt e6</td></tr>
<tr><td>Organophosphate Insecticides</td><td>Acetylcholine excess: SLUDGE or DUMBELLS</td><td>Atropine<br>Pralidoxime</td><td>Atropine: muscarinic acetylcholine receptor antagonist<br>Pralidoxime: Removes OP from acetylcholinesterase</td><td>(no question)</td><td>Pharmacotherapy: A Pathophysiologic Approach, 13th Ed. Chapt e6</td></tr>
</tbody></table>
<p class="sub">Rows without a question in the special column: on 10/20 she said “if I didn't have a question, there's nothing really weird about that poisoning.” Two drugs appear in two rows with different mechanisms: atropine (beta blockers: increase heart rate; organophosphates: muscarinic acetylcholine receptor antagonist) and sodium bicarbonate (tricyclic antidepressants: counteracts the inhibition on sodium cardiac channels; salicylates: renal ion trapping). Questions TBL3-001 to TBL3-067.</p>

<h3 id="ref3-l17-1">28. Pharmacogenomics history and the four target areas</h3>
<table class="reftab"><thead><tr><th>Item</th><th>What it is</th><th>Detail to know</th><th>Source</th></tr></thead><tbody>
<tr><td>Primaquine (1950s, Korean War)</td><td>First real data point linking a bad drug response to an inherited trait</td><td>Antimalarial prophylactic; hemolytic anemia in people of Middle Eastern or African descent; low G6PD (glucose-6-phosphate dehydrogenase) activity, measured as a phenotype before genotyping existed</td><td>‘History of Primaquine’ (p. 5); T 10/20</td></tr>
<tr><td>1953</td><td>Watson and Crick</td><td>Structure of DNA (the double helix)</td><td>‘Genomics History’ (p. 6); T 10/20</td></tr>
<tr><td>1956</td><td>Primaquine</td><td>Genetic link to hemolytic reactions</td><td>‘Genomics History’ (p. 6); T 10/20</td></tr>
<tr><td>1957</td><td>Motulsky</td><td>Inheritance might explain individual differences in drug efficacy and adverse drug reactions</td><td>‘Genomics History’ (p. 6); T 10/20</td></tr>
<tr><td>1959</td><td>Vogel</td><td>Introduces the term pharmacogenetics</td><td>‘Genomics History’ (p. 6); T 10/20</td></tr>
<tr><td>1990 to 2003</td><td>Human Genome Project</td><td>Worldwide consortium (academics, industry, government agencies); sequences shared in a database; completed early and under budget; its methods led later to whole genome sequencing in hours</td><td>‘Genomics History’ (p. 6); T 10/20</td></tr>
<tr><td>Twin studies</td><td>Heritability of drug metabolism</td><td>Antipyrine half-life (cleared by one enzyme): identical pairs nearly identical, fraternal pairs variable; phenotype measured, no genotyping</td><td>‘Twin Studies Data’ (p. 7, G&amp;G Fig. 4-2); T 10/20</td></tr>
<tr><td>MacKinnon et al. 2023</td><td>Impact study</td><td>More than half the patients were prescribed drugs where pharmacogenomics is important</td><td>‘Impact of Pharmacogenomics’ (p. 9); T 10/20</td></tr>
<tr><td>Wondrasek et al. 2024</td><td>Pharmacist survey</td><td>Pharmacists feel it is important but are not confident in their knowledge or ability to use it</td><td>‘Impact of Pharmacogenomics’ (p. 9); T 10/20</td></tr>
<tr><td>Target area 1: metabolizing enzymes</td><td>P450s and other phase 1 and phase 2 enzymes</td><td>Known best ("low hanging fruit"); variants change drug plasma concentrations; narrow therapeutic index drugs</td><td>‘Three Target Areas’ (p. 10); T 10/20</td></tr>
<tr><td>Target area 2: transporters</td><td>P-glycoprotein (ABCB1), an efflux transporter in the gut</td><td>Affects bioavailability; low-activity P-gp raises digoxin bioavailability</td><td>‘Three Target Areas’ (p. 10); T 10/20</td></tr>
<tr><td>Target area 3: drug targets</td><td>Receptors or enzymes a drug acts on</td><td>Biggest role now in oncology; a guidance document on beta-adrenergic receptor variants (2 years ago)</td><td>‘Three Target Areas’ (p. 10); T 10/20</td></tr>
<tr><td>Target area 4: immune system</td><td>HLA antigen variants</td><td>Severe adverse drug reactions; added aloud (the slide title says three)</td><td>T 10/20</td></tr>
<tr><td>Outcome buckets</td><td>Toxicity or efficacy</td><td>PK variants (enzymes, transporters) mostly toxicity; PD variants (targets) and missing cancer targets efficacy</td><td>‘Impact of Pharmacogenomics on PK and PD’ (p. 11); T 10/20</td></tr>
</tbody></table>
<h3 id="ref3-l17-2">29. Pharmacogenomics terminology</h3>
<table class="reftab"><thead><tr><th>Term</th><th>Definition</th><th>Her point</th><th>Source</th></tr></thead><tbody>
<tr><td>Pharmacogenetics</td><td>Study of genetic causes of individual variations in drug response</td><td>One patient</td><td>‘Definition of Genomics vs Genetics’ (p. 8); T 10/20</td></tr>
<tr><td>Pharmacogenomics</td><td>Genome-wide analysis of the genetic determinants of drug efficacy and toxicity; includes genomics technologies (gene therapy)</td><td>Populations; the preferred term; the two are used interchangeably (AAPS definitions)</td><td>‘Definition of Genomics vs Genetics’ (p. 8); T 10/20</td></tr>
<tr><td>Wild type</td><td>The version of a gene thought to be the most common</td><td>Sometimes the version understood first; "most common" is accepted on her test</td><td>‘Wildtype vs Variant’ (p. 13); T 10/20</td></tr>
<tr><td>Variant</td><td>A version that is not the most common</td><td>Do not say mutant</td><td>‘Wildtype vs Variant’ (p. 13); T 10/20</td></tr>
<tr><td>Polymorphism</td><td>A genetic variant in at least 1% of a population</td><td>Defined by frequency; any kind of change (SNP, deletion, extra copies) can qualify</td><td>‘Polymorphism’ (p. 14); T 10/20</td></tr>
<tr><td>Rare variant</td><td>A genetic variant in less than 1% of a population</td><td>Newer term; explains bad responses in people without the known polymorphism</td><td>‘Polymorphism’ (p. 14); T 10/20</td></tr>
<tr><td>SNP (snip)</td><td>Single nucleotide polymorphism: one nucleotide differs</td><td>The most common type of polymorphism</td><td>‘Polymorphism’ (p. 14); T 10/20</td></tr>
<tr><td>Allele</td><td>One of the two copies of a gene (variant and wild type forms at a location on a chromosome)</td><td>Diploid; one from each biological parent</td><td>‘Allele’ (p. 15); T 10/20</td></tr>
<tr><td>Homozygous / heterozygous</td><td>Same allele on both copies at a locus / different alleles</td><td>PP, aa homozygous; Bb heterozygous; no dominant/recessive in pharmacogenomics</td><td>‘Homozygosity and Heterozygosity’ (p. 16); T 10/20</td></tr>
<tr><td>Genotype</td><td>The two alleles a person has</td><td>Written CYP2C19*2/*2</td><td>‘Genotype vs phenotype’ (p. 17); T 10/20</td></tr>
<tr><td>Phenotype</td><td>Any observable characteristic; results from expression of genes</td><td>CYP2C19*2/*2: no 2C19 activity</td><td>‘Genotype vs phenotype’ (p. 17); T 10/20</td></tr>
<tr><td>Functional significance</td><td>How a genetic variation affects the function of the gene's product</td><td>Her key phrase</td><td>‘Complications of Genotype vs phenotype’ (p. 18); T 10/20</td></tr>
<tr><td>Haplotype</td><td>A set of alleles at multiple loci of a gene that coexist on the same chromosome</td><td>Occurs more often than random chance; figure: AGT, GTA, AGA</td><td>‘Haplotype’ (p. 19), ‘Illustration of Haplotype’ (p. 20); T 10/20</td></tr>
<tr><td>Linkage disequilibrium</td><td>A set of alleles co-existing at a higher frequency than random chance predicts</td><td>On the slide; not said aloud</td><td>‘Haplotype’ (p. 19)</td></tr>
<tr><td>Allele frequency / genotype frequency</td><td>Relative frequency of an allele / of a genotype in a population (proportion or percentage)</td><td>Allele frequencies together give the genotype frequency</td><td>‘Frequencies in Pharmacogenomics’ (p. 21); T 10/20</td></tr>
<tr><td>Hardy-Weinberg equilibrium</td><td>Allele and genotype frequencies stay constant across generations unless specific influences are introduced</td><td>Out of equilibrium: the sample is not generalizable</td><td>‘Frequencies in Pharmacogenomics’ (p. 21); T 10/20</td></tr>
</tbody></table>
<h3 id="ref3-l17-3">30. Nomenclature and variant types on the slides not yet taught (low yield; start 10/21)</h3>
<table class="reftab"><thead><tr><th>Slide</th><th>Example</th><th>What it shows</th><th>Source</th></tr></thead><tbody>
<tr><td>SNP nomenclature</td><td>VKORC1 1173 C&gt;T; ABCB1 3435 C&gt;T</td><td>Gene, nucleotide position, original (wild type) base, changed base</td><td>‘SNP Nomenclature’ (p. 24)</td></tr>
<tr><td>Star nomenclature</td><td>CYP2C19*1; *2 (681 G&gt;A); *3 (636 G&gt;A)</td><td>Star and number designate the allele</td><td>‘Allele “Star” Nomenclature’ (p. 25)</td></tr>
<tr><td>Same label, different effect</td><td>CYP2C19*2, *3 no activity; CYP2C9*2, *3 decreased</td><td>Nomenclature can look the same with different functional effects</td><td>‘More Allele “Star” Nomenclature’ (p. 26)</td></tr>
<tr><td>rs nomenclature</td><td>CYP2C19*3 = 636 G&gt;A = rs4986893</td><td>dbSNP naming; recommended standard for SNPs</td><td>‘Reference SNP (rs) Nomenclature’ (p. 27)</td></tr>
<tr><td>Genotype nomenclature</td><td>CYP2C19*1/*1; *1/*2 or *1/*3; *2/*2, *2/*3, *3/*3</td><td>Normal; reduced; no enzyme activity</td><td>‘Genotype Nomenclature’ (p. 28)</td></tr>
<tr><td>Premature stop codon</td><td>CYP2C19*3 (G&gt;A, tryptophan to stop)</td><td>No enzyme activity; proton pump inhibitors</td><td>‘Premature Stop Codon SNP: CYP2C19’ (p. 36)</td></tr>
<tr><td>Gene deletion / copy number</td><td>CYP2D6*5 / CYP2D6*2XN</td><td>Poor metabolizer / ultrarapid metabolizer; SSRIs, tamoxifen, codeine, beta blockers</td><td>‘Gene Deletion CYP2D6’ (p. 39), ‘Copy Number Variant CYP2D6’ (p. 40)</td></tr>
</tbody></table>
`;
