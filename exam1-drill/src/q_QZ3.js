// QZ3 — Dr. Smith's Quiz 2 (Toxic Responses, 9 items) and Quiz 3 (Treating Poisonings, 10 items), word for word. Exam 3.
// Source of the questions and options: Smith_Quizzes_1-3_QA.pdf (compiled by the student; Drive folder "Smith's Quizzes"),
// typos kept ("breath", "synptic", "rhodenase", "matabolism"). The answers in that file are the student's recorded quiz
// answers, not a key she posted. Each item is keyed on the recorded answer and checked against her own words: transcripts
// 10/13, 10/14, 10/19; the decks Toxic Responses Students Fall 2026 WCAG21A.pdf and Treating Poisonings Students Fall 2026
// WCAG2,1A_pptx.pdf; and her poisoning table key PoisoningTreatmentTable2026KEY.pdf. Where the recorded answer and her
// words differ, both are in the note. One sub per quiz (quiz1, quiz2, quiz3); test.js and style_check.js treat a quiz-tagged item in these subs as verbatim, so the original option wording stays.
TOPICS.push({id:'QZ3', name:'Quizzes (verbatim)', prof:'Smith', lecture:'QZ3', cite:'Smith_Practice_Quiz_1_-_Principles_of_Toxicology.pdf; Smith_Quizzes_1-3_QA.pdf',
  subs:[
    {id:'quiz1', name:'Quiz 1: Principles of Toxicology', cite:'Smith_Practice_Quiz_1_-_Principles_of_Toxicology.pdf (her released key)'},
    {id:'quiz2', name:'Quiz 2: Toxic Responses', cite:'Smith_Quizzes_1-3_QA.pdf pp. 3–4'},
    {id:'quiz3', name:'Quiz 3: Treating Poisonings', cite:'Smith_Quizzes_1-3_QA.pdf pp. 5–6'},
    {id:'quiz4', name:'Quiz 4: Intro to Pharmacogenomics (the questions on 10/20 material)', cite:'Smith_Quiz_4_-_Intro_to_Pharmacogenomics.pdf'}
  ]});

QUESTIONS.push(

/* ---------------- Quiz 2: Toxic Responses ---------------- */
{id:"QZ3-001", dupOf:"L14-051", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz2", skill:"tell", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"on-target-wrong-tissue-naming", tags:["smith","quiz"], source:"both",
 stem:"An off-target adverse effect is defined as an undesired response that occurs:",
 options:[
  {t:"When a drug interacts with a receptor that is not its therapeutic target.", correct:true, why:"Recorded answer. Off-target is the drug finding receptors it was not intended to find, in the intended tissue or in another one; the slide lists \"Drug hits unintended receptor\" first."},
  {t:"When the dose at the intended receptor is too high.", correct:false, why:"On-target: \"Dose at the receptor is too high\" is the first on-target example on the slide."},
  {t:"When the wrong drug is given.", correct:false, why:"Neither category: on-target and off-target describe which receptor the drug hits. A dosing error she placed under on-target, as a dose at the receptor that is too high."},
  {t:"When a drug interacts with the intended receptor but in the wrong location.", correct:false, why:"Still on-target: the intended receptor in the wrong tissue, as with sleepiness from diphenhydramine. She said she dislikes the term but it is classically called on-target."}],
 teach:"Quiz 2, question 1. On-target means the drug or its metabolite hits the receptor it was meant to hit; it stays on-target when that receptor is in the wrong tissue. Off-target means the drug finds receptors it was not intended to find, in either the intended or another tissue. Her off-target examples are terfenadine (cardiac potassium channel), the S-enantiomer of thalidomide and propranolol at beta-2 receptors.",
 quote:"even though the drug is in the wrong tissue, when it's finding the receptor that we wanted it to find, it's still called on target. ... the off target is really self-explanatory. That's when the drug is finding other receptors for which we did not intend for it to find. Either in the correct tissue where we wanted it to have a response or in the incorrect tissue.",
 note:"Quiz 2, question 1, verbatim. Keyed on the recorded answer (A); her words agree. Same point as L14-051.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 3–4, Quiz 2 question 1; Toxic Responses Students Fall 2026 WCAG21A.pdf slides ‘On-Target Examples’, ‘Off-Target Examples’; transcript 10/13"},

{id:"QZ3-002", dupOf:"L14-061", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz2", skill:"tell", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"fibrosis-non-organ-specific-why", tags:["smith","quiz"], source:"both",
 stem:"Which toxic endpoint is non-organ specific?",
 options:[
  {t:"Nephrotoxicity", correct:false, why:"Nephrotoxicity is defined by the one organ it damages, the kidney, one of her four organ-specific examples. Fibrosis differs because the same collagen and extracellular matrix proteins are laid down in whatever tissue it hits."},
  {t:"Fibrosis", correct:true, why:"Recorded answer. Fibrosis looks the same in the lung and the liver: the same collagen and extracellular matrix proteins are laid down."},
  {t:"Neurotoxicity", correct:false, why:"Neurotoxicity is defined by the system it damages, the nervous system, one of her four organ-specific examples; fibrosis is non-organ-specific because its pathology is the same in any tissue."},
  {t:"Hepatotoxicity", correct:false, why:"Liver damage is organ-specific. The trap is that ethanol causes liver fibrosis: that fibrosis is still non-organ-specific, because it looks the same as fibrosis in the lung."}],
 teach:"Quiz 2, question 2. Her four non-organ-specific endpoints are fibrosis, genotoxicity, cancer and teratogenesis; her four organ-specific examples are the lungs, nervous system, liver and kidney. Fibrosis is non-organ-specific even though amiodarone, bleomycin and paraquat cause it in the lung and ethanol in the liver, because the same pathology produces it in every tissue.",
 quote:"when we see fibrosis, whether it's in the lungs or the liver, if you look at the cells, if you look at the chemistry of that fibrotic tissue, it's the same. So the same pathology goes on to create that fibrosis. ... non-organ specific endpoints, like what? Cancer, tratogenicity, genotoxicity, fibrosis",
 note:"Quiz 2, question 2, verbatim. Keyed on the recorded answer (B); her words agree. The first part of the quote is from 10/13, the last sentence from 10/14. Same point as L14-061; her poll L15-042 asks the same question with teratogenicity as the answer.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 3–4, Quiz 2 question 2; Toxic Responses Students Fall 2026 WCAG21A.pdf slide ‘Non-Organ Specific: Fibrosis’; transcripts 10/13 and 10/14"},

{id:"QZ3-003", dupOf:"L14-065", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz2", skill:"apply", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"cancer-non-organ-specific-why", tags:["smith","quiz"], source:"both",
 stem:"Cancer is considered to be a non-organ specific response. That seems like a weird categorization, considering cancer seems to start in a specific place in the body. Why would we think of it as non-organ specific?",
 options:[
  {t:"Cancers in different parts of the body may be caused by the same pathological mechanism, resulting in the same kinds of cancer in different organs.", correct:true, why:"Recorded answer. Some lung cancers carry the same genetic mutation as colon cancers, and some share their mechanism with breast cancers."},
  {t:"We do not understand cancer well enough to consider it an organ-specific response.", correct:false, why:"The category rests on what is known: the same cellular pathology found in tumors of different organs."},
  {t:"This question is wrong; cancer is an organ-specific toxic outcome.", correct:false, why:"She lists cancer with fibrosis, genotoxicity and teratogenesis as non-organ-specific."},
  {t:"There is nothing in common about the pathology of cancers found in different parts of the body.", correct:false, why:"The opposite: the shared pathology is the reason for the category."}],
 teach:"Quiz 2, question 3. Cancer incidence differs by organ, and she agreed that is true, but cancer is non-organ-specific because the cellular mechanism behind a tumor in one organ can be the same as in another. Her examples: some lung cancers carry the same mutation as colon cancers, and some lung cancers match some breast cancers. It is not always so, but it is seen often enough to set the category.",
 quote:"The reason that we call it a non-organ specific is because we have now found by looking at the cellular nature of different tumors that sometimes the pathology causing, for example ... breast cancer might be the same cellular mechanisms as that causing colon cancers. ... Same mechanism of causing the cancer in the lung is the same as the mechanism causing the cancer in the breast ... So that's why we call it a non-organ specific endpoint.",
 note:"Quiz 2, question 3, verbatim. Keyed on the recorded answer (A); her words agree. Same point as L14-065.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 3–4, Quiz 2 question 3; Toxic Responses Students Fall 2026 WCAG21A.pdf slide ‘Non-Specific: Cancer’; transcript 10/13"},

{id:"QZ3-004", dupOf:"L14-070", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz2", skill:"recall", core:true, coreWhy:"her own quiz question, verbatim", multi:true,
 concept:"fda-pregnancy-lactation-labeling", tags:["smith","quiz"], source:"both",
 stem:"What information is provided in the FDA's Pregnancy and Lactation Labeling Rules issued in 2014? Select all that apply.",
 options:[
  {t:"Information regarding how the medication will affect female and male reproduction potential.", correct:true, why:"Recorded answer. The labeling now covers effects on fertility, including male fertility (sperm count and sperm viability)."},
  {t:"Information about how the medication will affect a child if administered to the child.", correct:false, why:"Not part of the change she described: the child here is dosed directly, which is not pregnancy, fertility or lactation information."},
  {t:"Information about using the risks to the baby of drug while breastfeeding.", correct:true, why:"Recorded answer. The labeling now says whether a nursing mother should take the drug, since the child can ingest it in breast milk."},
  {t:"Information about the risks to the baby of using the medication during pregnancy.", correct:true, why:"Recorded answer. The labeling still ranks how teratogenic a drug is."}],
 teach:"Quiz 2, question 4. The FDA labeling used to rank drugs only by whether they cause birth defects. The change added, in the same place on the label, effects on fertility (male fertility included) and whether a lactating woman should take the drug. Pregnancy risk, fertility and lactation are the three parts; dosing a child directly is not one of them.",
 quote:"Besides being ranked as how teratogenic they are, they will also talk about the effects a drug might have on fertility, including male fertility. ... In addition to that, the FDA added to the labeling. Information about ... whether or not a mother who is nursing should be taking those medications cause you don't want to be having children ingesting ... certain medications in their breast milk",
 note:"Quiz 2, question 4, verbatim, except that the quiz stem ends \"Choose all that apply.\" and is written here with \"Select all that apply.\" Option C keeps the quiz wording (\"using the risks to the baby of drug\"). Keyed on the recorded answer (A, C, D); her words agree. Same point as L14-070.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 3–4, Quiz 2 question 4; Toxic Responses Students Fall 2026 WCAG21A.pdf slide ‘Teratogenesis Labeling’ (Link to FDA Pregnancy and Lactation Labeling); transcript 10/13"},

{id:"QZ3-005", dupOf:"L15-004", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz2", skill:"recall", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"particle-size-medium", tags:["smith","quiz"], source:"both",
 stem:"We breath in particles that can cause pulmonary toxicity. What size particles will be the ones that reach the alveolar regions of the lungs?",
 options:[
  {t:"medium sized particles", correct:true, why:"Recorded answer. Heavy enough not to be breathed back out, small enough to go around the curves of the bronchioles; they settle in the lower lung while the breath stills."},
  {t:"relatively large particles", correct:false, why:"Large particles come in fast and impact at the bifurcations of the upper airways."},
  {t:"very fine particles", correct:false, why:"In her grouping the very small particles are so light that they are breathed back out without getting past the upper airway."}],
 teach:"Quiz 2, question 5. She groups inhaled particles as large, medium and small and says the actual size does not matter, only the concept. Small particles are breathed back out; large particles impact where the upper airways bifurcate; medium particles reach the lower parts of the lung and fall out of the air in the still moment between breathing in and out. Shape (asbestos) and breathing pattern (jogging) also change where particles deposit.",
 quote:"very small particles will be breathed in, but they really don't get past your upper airway, like your nose, your upper throat. They're so light, they will ... be just breathed back out ... The medium sized particles are the ones that are the most concerning. ... and they get down into the lower parts of our lung",
 note:"Quiz 2, question 5, verbatim. Keyed on the recorded answer (A). Her 10/14 words and the slide agree on medium particles, but neither uses the word alveolar: she says \"the lower parts of our lung\", and the slide note reads \"medium size particle are the main concern ... able to go deep [and] settle\". She places very small particles in the upper airway, breathed back out. Same point as L15-004.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 3–4, Quiz 2 question 5; Toxic Responses Students Fall 2026 WCAG21A.pdf slide ‘Pulmonary Toxicity – Why are lungs susceptible?’; transcript 10/14"},

{id:"QZ3-006", dupOf:"L15-016", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz2", skill:"tell", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"neurotoxicity-patterns", tags:["smith","quiz"], source:"both",
 stem:"When neuronopathy occurs due to exposure to a neurotoxin, what has happened to the neurons?",
 options:[
  {t:"Injury to the myelinating cells", correct:false, why:"Myelinopathy (neuron D): the Schwann cells making the myelin sheath are damaged."},
  {t:"Degeneration of the axon", correct:false, why:"Axonopathy (neuron C): only the axon is damaged; the cell body survives."},
  {t:"Death of the entire neuron", correct:true, why:"Recorded answer. Neuron B: the neurotoxin killed the whole cell."},
  {t:"The presence of too much neurotransmitter in the synptic cleft", correct:false, why:"Neurotransmission toxicity (neuron E): the cell is not killed and looks unchanged; organophosphates are the example."}],
 teach:"Quiz 2, question 6. Figure 16-2 shows four discrete patterns of neurotoxic injury: neuronopathy, death of the entire neuron (B); axonopathy, degeneration of the axon (C); myelinopathy, injury to myelin or the myelinating cells (D); and interruption of neurotransmission without cell death (E). The concept of the four patterns is what she asks about, not which compound causes which.",
 quote:"What did that neurotoxin do to this nerve cell? Killed the whole thing",
 note:"Quiz 2, question 6, verbatim (\"synptic\" as on the quiz). Keyed on the recorded answer (C); her words and the figure legend (\"A neuronopathy resulting from the death of the entire neuron\") agree. Same point as L15-016.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 3–4, Quiz 2 question 6; Toxic Responses Students Fall 2026 WCAG21A.pdf slide ‘Types of Neurotoxicity’ (Figure 16-2); transcript 10/14"},

{id:"QZ3-007", dupOf:"L15-032", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz2", skill:"apply", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"renal-injury-types", tags:["smith","quiz"], source:"both",
 stem:"All nephrotoxins will damage the entire kidney.",
 options:[
  {t:"True", correct:false, why:"The recorded answer is False: nephrotoxins often cause one discrete kind of renal injury."},
  {t:"False", correct:true, why:"Recorded answer. The site-specific nephrotoxicity table lists separate kinds of renal damage, each with its own example compounds."}],
 teach:"Quiz 2, question 7. Table 14-2 lists the kinds of chemically induced renal damage: prerenal, vasoconstriction, crystalluria, tubular toxicity, endothelial injury, glomerulopathy and interstitial nephritis. A nephrotoxin usually causes one discrete kind, and site-specific differences, above all which metabolizing enzymes are expressed in which part of the kidney, decide where. Know the kinds of damage, not the list of drugs.",
 quote:"when the kidneys can get damaged or when they get damaged. They are often damaged by a compound that's causing a discrete kind of injury",
 note:"Quiz 2, question 7, verbatim. Keyed on the recorded answer (False); her words agree. Same table as L15-032; L15-036 has her most important site-specific reason.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 3–4, Quiz 2 question 7; Toxic Responses Students Fall 2026 WCAG21A.pdf slides ‘Site-Specific Nephrotoxicity’ (Klaassen Table 14-2), ‘Reasons for Site-Specific Nephrotoxicity’; transcript 10/14"},

{id:"QZ3-008", dupOf:"L15-029", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz2", skill:"recall", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"zonal-enzyme-expression", tags:["smith","quiz"], source:"both",
 stem:"The liver will often be injured in specific areas when exposed to a hepatotoxin. Give two reasons for this site-specific damage. Please answer this question in no more than two well-written sentences.",
 options:[
  {t:"An oxygen gradient across the zones and uneven expression of metabolizing enzymes", correct:true, why:"Her two reasons: oxygen is high in zone 1 and low in zone 3, and enzymes such as CYP2E1 (zone 3) and many phase 2 enzymes (zone 1) are not spread evenly."},
  {t:"The P450s are expressed evenly in every zone, and zone 3 receives the most oxygen", correct:false, why:"Both halves are what she ruled out: the P450s are not homogeneously expressed, and blood reaching zone 3 is relatively hypoxic."},
  {t:"Zone 2 has few Kupffer cells, and the liver is a large organ that holds more drug", correct:false, why:"Both ruled out: Kupffer cells are found throughout the liver, not just in one zone, and being a large organ has nothing to do with its susceptibility."},
  {t:"Zone 1 drains into the central vein, and phase 2 enzymes are found only in zone 3", correct:false, why:"Zone 3 is closest to the central vein, where blood leaves; many phase 2 enzymes are in zone 1."}],
 teach:"Quiz 2, question 8, a short-answer item. Blood enters zone 1 relatively oxygenated and leaves zone 3 by the central vein relatively hypoxic, and if an enzyme in zone 1 needs oxygen, the high oxygen there helps it make a hepatotoxic metabolite. Metabolizing enzymes are not homogeneously expressed: many phase 2 enzymes are in zone 1 and CYP2E1 is higher in zone 3, which is why an acetaminophen overdose kills hepatocytes in zone 3.",
 quote:"So there's a gradient in the amount of oxygen as it flows from those vessels coming into the liver and leaving the liver ... So oxygen gradients and non-homogeneous expression of our metabolizing enzymes contributes to where you see liver damage for different hepatotoxins.",
 note:"Quiz 2, question 8. On the quiz this was free response (no more than two sentences); options added here. The recorded answer named the same two reasons: oxygen highest in zone 1 and lowest in zone 3, and uneven expression of metabolizing enzymes such as the CYP450s. The distractors are built from statements she rejected on 10/14: the two wrong options of her liver poll (L15-044), the large-organ option of L15-043, and reversals of where zone 1 and zone 3 sit and where phase 2 enzymes are. Same point as L15-029.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 3–4, Quiz 2 question 8; Toxic Responses Students Fall 2026 WCAG21A.pdf slide ‘Reasons for Site-Specific Hepatotoxicity’; transcript 10/14"},

{id:"QZ3-009", dupOf:"L14-067", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz2", skill:"apply", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"teratogen-time-of-exposure", tags:["smith","quiz"], source:"both",
 stem:"All teratogens will only cause one kind of birth defect each.",
 options:[
  {t:"True", correct:false, why:"The recorded answer is False: one retinoid produced many kinds of defects depending on the day of gestation."},
  {t:"False", correct:true, why:"Recorded answer. For a given teratogen, the time of exposure during gestation influences the type of effect."}],
 teach:"Quiz 2, question 9. Retinoids were known to cause limb defects in hamsters, but dosing the mothers at different gestation days also produced small eyes, spina bifida, cleft palate, forelimb shortening and tail defects. That is her classic example of why a teratogen is not organ-specific. The reverse also holds: different compounds (methanol on day 7, TCDD on day 11) can cause the same cleft palate.",
 quote:"So this is a classic example of why a teratogen. is not necessarily organ specific. It's because again, depending on the time of the mother's exposure during her pregnancy, you could end up with some of these other effects happening",
 note:"Quiz 2, question 9, verbatim. Keyed on the recorded answer (False); her words agree. Same point as L14-067.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 3–4, Quiz 2 question 9; Toxic Responses Students Fall 2026 WCAG21A.pdf slide ‘Teratogenesis Time of exposure’; transcript 10/13"},

/* ---------------- Quiz 3: Treating Poisonings ---------------- */
{id:"QZ3-010", dupOf:"L16-008", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz3", skill:"tell", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"methanol-eg-antidote-adh", tags:["smith","quiz"], source:"both",
 stem:"Fomepizole may be used to treat methanol poisoning. It is an example of which approach to pharmacokinetic-based treatment of poisonings?",
 options:[
  {t:"Inhibition of bioactivation", correct:true, why:"Recorded answer. Fomepizole binds and inhibits alcohol dehydrogenase, so methanol is not metabolized to its toxic metabolite."},
  {t:"enhancing elimination", correct:false, why:"Enhancing elimination removes the poison itself, by ion trapping with sodium bicarbonate or by extracorporeal methods such as hemodialysis."},
  {t:"enhancing detoxification", correct:false, why:"Enhancing metabolism (detoxification) gives cofactors to speed a protective reaction, as for cyanide and acetaminophen; fomepizole blocks a reaction."},
  {t:"Prevent absorption", correct:false, why:"Preventing absorption (emesis, lavage, whole bowel irrigation, activated charcoal) acts before the poison is absorbed; fomepizole acts on its metabolism."}],
 teach:"Quiz 3, question 1. Methanol and ethylene glycol are harmless until alcohol dehydrogenase bioactivates them; ethanol competes for the enzyme and fomepizole binds and inhibits it. Blocking that step is inhibition of toxication (bioactivation), one of the four toxicokinetic methods, and these two poisons are her classic examples. There are not many cases where it can be done.",
 quote:"Same thing with fomeprazole ... it'll bind to and inhibit the alcohol dehydrogenase and prevent the metabolism of methanol or ethylene glycol. So that's the way we block. The metabolism and bioactivation of these two compounds to nasty metabolites.",
 note:"Quiz 3, question 1, verbatim. Keyed on the recorded answer (A); her words and the slide agree. The transcript renders fomepizole as \"fomeprazole\" and \"omeprazole\"; the slide reads \"Antidote for both is ethanol or fomepizole.\" Same point as L16-008.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 5–6, Quiz 3 question 1; Treating Poisonings Students Fall 2026 WCAG2,1A_pptx.pdf slides ‘Toxicokinetic-Based Treatment Inhibit Bioactivation’, ‘Toxicokinetic-Based Treatment: methanol and ethylene glycol examples’; transcript 10/19"},

{id:"QZ3-011", dupOf:"TBL3-026", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz3", skill:"drug", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"tbl-ccb-antidotes", tags:["smith","quiz"], source:"slide",
 stem:"What could you use to treat a patient that has overdosed on an extended release calcium channel blocker?",
 options:[
  {t:"HIET", correct:true, why:"Recorded answer. HIET (hyperinsulinemia–euglycemia therapy, as Marraffa expands it) is in her key's beta-blocker antidote list, and the calcium channel blocker row reads \"Same as above for BB OD\"."},
  {t:"ethanol", correct:false, why:"Ethanol is the toxic alcohol antidote: it inhibits alcohol dehydrogenase."},
  {t:"glutathione", correct:false, why:"Glutathione belongs to acetaminophen: N-acetylcysteine replenishes it."},
  {t:"sodium thiosulfate", correct:false, why:"Thiosulfate belongs to cyanide: given as sodium thiosulfate, it supplies the sulfur the body's rhodanese uses to clear cyanide in the urine."}],
 teach:"Quiz 3, question 2. Her key lists six antidotes for beta-blocker overdose (atropine, calcium, glucagon, HIET, vasopressors and IV 20% fatty acid emulsion) and gives calcium channel blockers the same list. The extended-release formulation changes how long an asymptomatic patient must be watched (18 hours, 24 for verapamil), not the antidote. For HIET her key says only that the mechanisms of its inotropic effects are not understood.",
 note:"Quiz 3, question 2, verbatim. Keyed on the recorded answer (A), which agrees with her table key: HIET is listed for beta blockers, and the calcium channel blocker antidote and mechanism cells read \"Same as above for BB OD\". She did not say HIET or insulin in the 10/13, 10/14 or 10/19 transcripts, and her key does not separate extended-release from immediate-release overdose. Her key does not expand HIET; Marraffa 2012, the article the table assignment names, writes \"hyperinsulinemia–euglycemia therapy (HIET)\" and says the mechanism of its effectiveness \"has not been clearly delineated\". Same point as TBL3-026 and TBL3-027.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 5–6, Quiz 3 question 2; PoisoningTreatmentTable2026KEY.pdf rows ‘Beta blockers’, ‘Calcium channel blockers’, ‘Toxic alcohols’, ‘Acetaminophen’; Marraffa+AJHSP+2012+Antidotes.pdf; transcripts 10/19 (thiosulfate, observation windows) and 10/20 (verapamil)"},

{id:"QZ3-012", dupOf:"TBL3-019", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz3", skill:"drug", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"tbl-bb-glucagon", tags:["smith","quiz"], source:"slide",
 stem:"What is the mechanism of action of glucagon when using it to treat a calcium channel blocker overdose?",
 options:[
  {t:"it is a cofactor for rhodenase activity", correct:false, why:"That points to the cyanide treatment, where sodium thiosulfate supplies sulfur for the body's own rhodanese; it has nothing to do with glucagon."},
  {t:"it increases intracellular cAMP levels", correct:true, why:"Recorded answer. Her key: glucagon increases cardiac cellular cAMP to increase heart rate."},
  {t:"it conjugates the calcium channel blocker", correct:false, why:"Glucagon does not bind the drug; binding the poison is inactivation, as digoxin immune Fab binds digoxin."},
  {t:"it inhibits alcohol dehydrogenase", correct:false, why:"That is ethanol or fomepizole for methanol and ethylene glycol."}],
 teach:"Quiz 3, question 3. Glucagon is one of the six antidotes in her key for beta-blocker overdose, and the calcium channel blocker row repeats the list. Its listed mechanism is to increase cardiac cellular cyclic AMP (cAMP), which increases heart rate. Each wrong option is the mechanism of another antidote from the same unit.",
 note:"Quiz 3, question 3, verbatim (\"rhodenase\" as on the quiz). Keyed on the recorded answer (B), which agrees with her table key. She did not discuss glucagon in the transcripts. On 10/19 she called rhodanese both \"this cofactor called rodonase\" and \"the enzyme rodonase\" in the cyanide scheme. Same point as TBL3-019.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 5–6, Quiz 3 question 3; PoisoningTreatmentTable2026KEY.pdf rows ‘Beta blockers’, ‘Calcium channel blockers’, ‘Digoxin’; transcript 10/19 (cyanide scheme)"},

{id:"QZ3-013", dupOf:"L16-046", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz3", skill:"drug", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"pralidoxime-removes-op", tags:["smith","quiz"], source:"both",
 stem:"Which antidote for treating organophosphate poisoning removes the organophosphate from its binding site on acetylcholinesterase?",
 options:[
  {t:"flumazenil", correct:false, why:"Flumazenil antagonizes the GABA-A (benzodiazepine) receptor in a benzodiazepine overdose."},
  {t:"pralidoxime", correct:true, why:"Recorded answer. Pralidoxime pulls the organophosphate off acetylcholinesterase onto itself, and the complex is eliminated."},
  {t:"physostigmine", correct:false, why:"Physostigmine blocks acetylcholinesterase to raise acetylcholine; it treats belladonna alkaloids such as jimsonweed."},
  {t:"atropine", correct:false, why:"Atropine also treats organophosphate poisoning, but by antagonizing the excess acetylcholine at the receptor; the organophosphate stays bound."}],
 teach:"Quiz 3, question 4. Organophosphates bind and inactivate acetylcholinesterase, so acetylcholine builds up. Atropine antagonizes the excess acetylcholine; pralidoxime removes the toxin from the active site, pulling the organophosphate onto itself so it can be eliminated. It fails once the organophosphate has aged, which depends on the organophosphate's chemical structure.",
 quote:"One of the things that we can do is to pull off the organophosphate by using pralodoxine ... it's gonna pull off the organophosphate and put it onto itself. And when it does that, it can be eliminated.",
 note:"Quiz 3, question 4, verbatim. Keyed on the recorded answer (B); her words, the slide and her key (\"Removes OP from acetylcholinesterase\") agree. The transcript renders pralidoxime as \"pralodoxine\". Same point as L16-046 and TBL3-056.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 5–6, Quiz 3 question 4; Treating Poisonings Students Fall 2026 WCAG2,1A_pptx.pdf slides ‘Pharmacological Treatment: Treatment Removes Toxin from Active Site’, ‘Pharmacological Treatment Pralidoxime example’; transcript 10/19"},

{id:"QZ3-014", dupOf:"TBL3-036", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz3", skill:"drug", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"tbl-opioid-symptoms", tags:["smith","quiz"], source:"slide",
 stem:"Choose the symptom that is NOT part of the toxidrome for opioid overdose:",
 options:[
  {t:"Decreased heart rate", correct:false, why:"Part of it: her key lists decreased heart and breath rates."},
  {t:"Decreased breath rate", correct:false, why:"Part of it: her key lists decreased heart and breath rates."},
  {t:"Increased pupil size", correct:true, why:"Recorded answer. Her key lists decreased pupils for opioids; dilated pupils belong to the belladonna alkaloids such as jimsonweed."},
  {t:"Somnolence", correct:false, why:"Part of it: somnolence and coma head the opioid row of her key and of the toxidromes table."}],
 teach:"Quiz 3, question 5. Her key gives the opioid overdose picture as somnolence, coma, decreased heart and breath rates, and decreased pupils. The falling heart and breathing rates separate opioids from benzodiazepines, whose vitals are relatively normal. Naloxone, an opioid receptor antagonist, is the antidote.",
 note:"Quiz 3, question 5, verbatim. Keyed on the recorded answer (C), which agrees with her table key (\"Somnolence, coma, decreased heart and breath rates, decrease pupils\"). The Goodman and Gilman toxidromes slide was not walked through on 10/19 (L16-013), and its vital-sign arrows did not survive the text export. Same point as TBL3-036.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 5–6, Quiz 3 question 5; PoisoningTreatmentTable2026KEY.pdf rows ‘Opioids’, ‘Benzodiazepines’; Treating Poisonings Students Fall 2026 WCAG2,1A_pptx.pdf slide ‘Toxidromes’ (Goodman & Gilman Table 4-7); transcript 10/19 (jimsonweed pupils)"},

{id:"QZ3-015", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz3", skill:"apply", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"overdose-kinetics-change", tags:["smith","quiz"], source:"both",
 stem:"True or False: Medications in overdose will never affect the kinetics of the drug.",
 options:[
  {t:"True", correct:false, why:"The recorded answer is False: the slide opens with \"Kinetics can change in overdose\"."},
  {t:"False", correct:true, why:"Recorded answer. Volume of distribution and clearance most often change in an overdose."}],
 teach:"Quiz 3, question 6. Kinetics in an overdose can differ from kinetics at a therapeutic dose, most often in volume of distribution and clearance. Slowed tablet dissolution delays absorption, a saturated liver gives less first-pass effect, protein binding can be exceeded, and elimination can shift from first-order to zero-order. Drugs with a large volume of distribution are hard to remove by hemodialysis.",
 quote:"we will often find that kinetics will change. Of the drug in an overdose situation compared to the kinetics of the drug at a normal therapeutic dose ... most often we see that the parameter of volume of distribution and the parameter of clearance will change significantly when there's an overdose situation.",
 note:"Quiz 3, question 6, verbatim. Keyed on the recorded answer (False); her words and the slide agree. The specific changes are tested in L15-045 to L15-049; no single bank question states the general rule, so no dupOf.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 5–6, Quiz 3 question 6; Treating Poisonings Students Fall 2026 WCAG2,1A_pptx.pdf slide ‘How Pharmacokinetics change in Overdose’; transcript 10/14"},

{id:"QZ3-016", dupOf:"L15-056", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz3", skill:"recall", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"emesis-ipecac-aspiration", tags:["smith","quiz"], source:"both",
 stem:"True or False: Emesis is considered the first line in treating an orally ingested poison.",
 options:[
  {t:"True", correct:false, why:"The recorded answer is False: emesis is no longer used, and ipecac is no longer sold in the US."},
  {t:"False", correct:true, why:"Recorded answer. The biggest risk of emesis is aspiration; for the out-of-hospital guidelines she said not to make the patient vomit at home."}],
 teach:"Quiz 3, question 7. Emesis is still listed as a method of preventing absorption, but it has been abandoned: ipecac is no longer sold in the US or used in hospitals, and aspiration is the biggest risk. By patient outcomes, activated charcoal is the best of the absorption-prevention methods. Experienced emergency departments may still try lavage or whole bowel irrigation for a massive ingestion, emesis much less so.",
 quote:"we no longer use Emesis. ... What's the risk of emesis? Aspiration is the biggest risk. ... you don't make them barf at home, it's too dangerous",
 note:"Quiz 3, question 7, verbatim. Keyed on the recorded answer (False); her words agree. The first two parts of the quote are from 10/14, the last from 10/19. Same point as L15-056.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 5–6, Quiz 3 question 7; Treating Poisonings Students Fall 2026 WCAG2,1A_pptx.pdf slide ‘Toxicokinetic-Based Treatment Prevent Absorption’; transcripts 10/14 and 10/19"},

{id:"QZ3-017", dupOf:"L15-060", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz3", skill:"apply", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"single-dose-charcoal-timing", tags:["smith","quiz"], source:"both",
 stem:"Which time frame would be most likely to successfully treat an orally ingested poison using single-dose activated charcoal?",
 options:[
  {t:"2-4 hours after ingestion", correct:false, why:"Mostly past her window of up to 2 hours; she said waiting 4 to 6 hours does not work."},
  {t:"Less than 60 minutes after ingestion", correct:true, why:"Recorded answer. Single-dose charcoal works only while the poison is still in the gut, so it is given soon after ingestion."},
  {t:"Any time frame will work", correct:false, why:"She was asked whether charcoal can be used any time and answered up to 2 hours."},
  {t:"No sooner than 24 hours after ingestion", correct:false, why:"By then the poison has moved through the stomach and small intestine."}],
 teach:"Quiz 3, question 8. Single-dose activated charcoal has to reach the stomach and small intestine while the poison is still there, so it is given soon after ingestion. Multiple-dose charcoal is the separate case for compounds that undergo enterohepatic recirculation.",
 quote:"single dose activated charcoal, we say it probably needs to be done within 1 to 2 hours of somebody ingesting whatever they overdosed on. ... up to 2 hours. They used to say just an hour, but they've ... lengthened that a little bit, maybe up to 2 hours",
 note:"Quiz 3, question 8, verbatim. Keyed on the recorded answer (B). The first part of the quote is from 10/14, the second from 10/19. Same point as L15-060 and L16-002.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 5–6, Quiz 3 question 8; Treating Poisonings Students Fall 2026 WCAG2,1A_pptx.pdf slide ‘Toxicokinetic-Based Treatment Prevent Absorption’; transcripts 10/14 and 10/19"},

{id:"QZ3-018", dupOf:"L16-014", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz3", skill:"tell", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"cofactors-not-induction", tags:["smith","quiz"], source:"both",
 stem:"When considering toxicokinetic-based treatments of poisonings, which statement is NOT correct?",
 options:[
  {t:"For some poisons, we can enhance matabolism by inducing metabolizing enzymes", correct:true, why:"Recorded answer. Induction takes a few days, too slow for a poisoning; metabolism is enhanced by giving cofactors instead."},
  {t:"For some poisons, we can enhance renal clearance of poisons using ion trapping", correct:false, why:"Correct statement: sodium bicarbonate traps mildly acidic poisons such as salicylates and phenobarbital in the urine."},
  {t:"Preventing absorption reduces the need for systemic treatments", correct:false, why:"Treated as correct: toxicokinetic treatment is done to decrease the amount of poison in the body and reduce the potential for end-organ damage."},
  {t:"For some poisons we can inhibit their bioactivation", correct:false, why:"Correct statement: methanol and ethylene glycol, with ethanol or fomepizole."}],
 teach:"Quiz 3, question 9. The four toxicokinetic methods are preventing absorption, inhibiting bioactivation, enhancing metabolism (detoxification) and enhancing elimination. Inducing the detoxifying enzymes would take a few days, so metabolism is enhanced by supplying cofactors for the reactions; her examples are cyanide and acetaminophen.",
 quote:"It'd be great if we could induce the expression of enzymes involved in this metabolism, but that is really not possible in a poisoning situation. ... It takes a few days, so we can't treat our patient fast enough with that.",
 note:"Quiz 3, question 9, verbatim (\"matabolism\" as on the quiz). Keyed on the recorded answer (A); her words and the slide (\"Cannot induce enzymes as takes too much time\") agree. Option C's wording is not on a slide or in the transcripts; the slide says toxicokinetic treatment is \"Done to decrease the amount of poison in the body, hoping to reduce potential for end-organ damage\". Same point as L16-014.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 5–6, Quiz 3 question 9; Treating Poisonings Students Fall 2026 WCAG2,1A_pptx.pdf slides ‘Toxicokinetic-Based Treatment’, ‘Toxicokinetic-Based Treatment Enhance Metabolism’, ‘Toxicokinetic-Based Treatment Enhance Renal Elimination’; transcript 10/19"},

{id:"QZ3-019", dupOf:"L16-030", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz3", skill:"recall", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"inactivator-requirements", tags:["smith","quiz"], source:"both",
 stem:"An antidote that inactivates a poison should have all of the following characteristics EXCEPT:",
 options:[
  {t:"When the antidote binds the poison, it does not need to be cleared", correct:true, why:"Recorded answer. The toxin-inactivator complex has to be cleared from the body."},
  {t:"The antidote-poison complex must have low toxicity", correct:false, why:"A requirement on the slide (\"Complex must have low toxicity\")."},
  {t:"The antidote must have a high affinity for the poison", correct:false, why:"A requirement: high affinity means massive doses of the inactivator, which could cause side effects, are not needed."},
  {t:"The antidote must have low binding affinity for tissue macromolecules or endogenous ions", correct:false, why:"A requirement for heavy metal chelators: higher affinity for the metal than for tissue macromolecules, low affinity for endogenous ions such as calcium."}],
 teach:"Quiz 3, question 10. An inactivator binds the toxin so it cannot interact with its target; the toxin-inactivator complex must then be cleared, must have no activity of its own, and the inactivator must have high affinity for the toxin. Heavy metal chelators add that they must bind the metal more tightly than the body's own macromolecules and ions, be water soluble, non-toxic and readily cleared.",
 quote:"That toxin inactivator complex then has to get cleared from the body. ... the complex must have, let's change that from low to no toxicity ... It needs to have high affinity for the toxin",
 note:"Quiz 3, question 10, verbatim. Keyed on the recorded answer (A); her words agree that the complex must be cleared. Same point as L16-030.",
 cite:"Smith_Quizzes_1-3_QA.pdf pp. 5–6, Quiz 3 question 10; Treating Poisonings Students Fall 2026 WCAG2,1A_pptx.pdf slides ‘Inactivation of Poisons’, ‘Inactivation of Poisons: Heavy Metal Chelators’; transcript 10/19"},
/* ---------------- Quiz 4: Intro to Pharmacogenomics (questions 4, 8, 9 and 10 cover 10/20; the rest cover 10/21, the next exam) ---------------- */
{id:"QZ3-020", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz4", skill:"recall", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"pgx-hla-hypersensitivity", tags:["smith","quiz"], source:"both",
 stem:"What type of adverse drug response is often seen when patients have variants in HLA genes?",
 options:[
  {t:"Decreased receptor response", correct:false, why:"A variant in a drug target such as a receptor changes the response through the target, the efficacy bucket; HLA variants act through the immune system."},
  {t:"Enhanced drug transport", correct:false, why:"Transport changes come from transporter variants such as P-glycoprotein, a separate target area."},
  {t:"Hypersensitivity", correct:true, why:"HLA variants belong to the immunological target area, and her Toxic Responses slide gives hypersensitivity as one of the two ways drugs activate immune responses."},
  {t:"Decreased metabolism", correct:false, why:"Slower metabolism comes from variants in metabolizing enzymes, the first target area, not from HLA genes."}],
 teach:"Of her four target areas, the newest is immunological: people with certain variants of their HLA antigens respond badly to some drugs, and the list grows every year. An immune response to a drug is, on her Toxic Responses slide, either a hypersensitivity reaction or an autoimmune reaction, so the response tied to HLA variants is hypersensitivity.",
 quote:"We have some medications that people ... with certain genetic variations in their HLA antigens, they are going to respond badly to these drugs if they have certain variants of their HLA antigens",
 note:"Quiz 4, question 4, verbatim. The source file is the student's write-up of the quiz; her key had not been released when this was added, so the answer is keyed on her slides and her 10/20 words. HLA was named on 10/20; the word hypersensitivity comes from her Toxic Responses slide and the 10/21 examples deck.",
 cite:"Smith_Quiz_4_-_Intro_to_Pharmacogenomics.pdf, Quiz 4 question 4; Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Introduction: Three Target Areas’; transcript 10/20; Toxic Responses Students Fall 2026 WCAG21A.pdf slide on immunologic responses"},

{id:"QZ3-021", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz4", skill:"recall", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"pgx-clinical-relevance", tags:["smith","quiz"], source:"both",
 stem:"Clinically significant relationships between patient genotype and drug response exist and should help determine patient care.",
 options:[
  {t:"True", correct:true, why:"MacKinnon (2023) found that more than half of the patients evaluated were prescribed medications where pharmacogenomics is important; using genotype aims to prevent toxicity or ensure efficacy."},
  {t:"False", correct:false, why:"Her impact slide says the opposite: pharmacogenomics matters for more than half of the patients evaluated."}],
 teach:"Pharmacogenomics is used to prevent toxicity or ensure efficacy. Her impact slide cites MacKinnon (2023): more than half of the patients evaluated were prescribed medications where pharmacogenomics is important in their use, which is why the genotype-drug response relationship should inform care.",
 quote:"they found that more than half of the patients evaluated were prescribed medications where pharmacogenomics is important in their use",
 note:"Quiz 4, question 8, verbatim. The source file is the student's write-up of the quiz; her key had not been released when this was added, so the answer is keyed on her slides and her 10/20 words.",
 cite:"Smith_Quiz_4_-_Intro_to_Pharmacogenomics.pdf, Quiz 4 question 8; Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Introduction: Impact of Pharmacogenomics’; transcript 10/20"},

{id:"QZ3-022", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz4", skill:"recall", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"haplotype-definition", tags:["smith","quiz"], source:"both",
 stem:"Which statement defines a haplotype?",
 options:[
  {t:"A genetic variant that occurs very frequently.", correct:false, why:"One frequent variant is a polymorphism (at least 1% of a population); a haplotype is a set of variants at several loci."},
  {t:"More than one genetic variant that group together and co-exist with a higher frequency than would occur by chance.", correct:true, why:"Her slide: a set of alleles at multiple loci on the same chromosome; in class: a haplotype occurs at a frequency greater than random chance."},
  {t:"A genetic variant that occurs in less than 1% of the population.", correct:false, why:"That is a rare variant."},
  {t:"One genetic variant loci on a gene with a higher frequency than would occur by chance.", correct:false, why:"A haplotype needs more than one locus; one variant alone cannot form a set."}],
 teach:"A haplotype is a set of alleles at multiple loci that co-exist on the same chromosome. Her figure showed SNPs at three positions travelling together as AGT, GTA and AGA, more often than random chance; the slide calls that higher co-occurrence linkage disequilibrium.",
 quote:"a haplotype is going to be occurring at a frequency that is greater than random chance",
 note:"Quiz 4, question 9, verbatim. The source file is the student's write-up of the quiz; her key had not been released when this was added, so the answer is keyed on her slides and her 10/20 words.",
 cite:"Smith_Quiz_4_-_Intro_to_Pharmacogenomics.pdf, Quiz 4 question 9; Intro_to_PGx_Lecture_Students_Fall_2026.pdf slides ‘Complications of Genotype vs phenotype’, ‘Illustration of Haplotype’; transcript 10/20"},

{id:"QZ3-023", lecture:"QZ3", prof:"Smith", tier:"new", topic:"QZ3", sub:"quiz4", skill:"recall", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"pgx-metabolizing-enzymes-best-known", tags:["smith","quiz"], source:"both",
 stem:"Which is the best characterized group of genetic variants that affect drug response?",
 options:[
  {t:"Variants in drug targets such as receptors or enzymes", correct:false, why:"Drug targets are a more recent area; she said that area has not moved forward as fast as metabolizing enzymes or transporters."},
  {t:"Variants in drug metabolizing enzymes", correct:true, why:"Her reason: they were the low-hanging fruit. Patients who could not metabolize and clear a drug reached high blood levels and serious toxicity, so those variants were studied first."},
  {t:"Variants in drug transporters", correct:false, why:"Transporters came second, after metabolizing enzymes."}],
 teach:"Her four target areas came in order of how much is known: metabolizing enzymes, transporters, drug targets, then immunological targets. Metabolizing enzymes were studied first because poor clearance gave the most apparent and dangerous adverse effects, so they are the best characterized.",
 quote:"the reason why we know the most about variants in metabolizing enzymes is because they were really the low hanging fruit",
 note:"Quiz 4, question 10, verbatim. The source file is the student's write-up of the quiz; her key had not been released when this was added, so the answer is keyed on her slides and her 10/20 words.",
 cite:"Smith_Quiz_4_-_Intro_to_Pharmacogenomics.pdf, Quiz 4 question 10; Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Introduction: Three Target Areas’; transcript 10/20"}

);
