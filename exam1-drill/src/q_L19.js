// L19 — Day 19 (10/22): Pharmacogenomics examples continued (Dr. Smith). Exam 4.
// Sources, in her order of authority: the 10/22 Echo transcript (SPEAKER 0 is Dr. Smith; auto-captions, transcription
// slips kept; a garbled caption is paraphrased, never quoted), then the deck PGx-Examples-Students-Fall-2026.pdf
// (cited by slide title and PDF page; no printed slide numbers). This day covered the drug-metabolizing-enzyme examples:
// the overview (slides 12-17), then BChE, NAT2, CYP2D6, CYP2C9, CYP2C19 (with the Furuta study), DPD, UGT1A1, and the
// start of TPMT (slides 18-35). The first part of the 10/22 session was Exam 3 logistics for the next day; that is
// recorded in notes/L19.md only, not tested here. The 10/21 recap figures (gene structure, allele frequencies,
// monogenic/polygenic) belong to the 10/21 writer; only the CYP2D6-specific trimodal-curve point is taken here.
// Transporters, drug targets, integrated variants and the immune system were deferred to Monday 10/26 (next lecture).
TOPICS.push({id:"L19", name:"Day 19: Pharmacogenomics examples, drug metabolizing enzymes", prof:"Smith", lecture:"L19",
  cite:"Day 19 (10/22) — PGx-Examples-Students-Fall-2026.pdf (taught slides 12-33, drug metabolizing enzymes); transcript 10/22",
  subs:[
    {id:"dme-overview", name:"When enzyme variants matter; the biggest factor; the clopidogrel pathway", cite:"PGx-Examples-Students-Fall-2026.pdf slides 'Variations in Drug Metabolizing Enzymes' (pp. 12-17); (T) 10/22"},
    {id:"bche", name:"Butyrylcholinesterase and succinylcholine", cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Butyrylcholinesterase (BChE)' (p. 18); (T) 10/22"},
    {id:"nat2", name:"N-acetyltransferase 2: isoniazid and procainamide", cite:"PGx-Examples-Students-Fall-2026.pdf slide 'N-acetyltransferase 2 (NAT2)' (p. 19); (T) 10/22"},
    {id:"cyp2d6", name:"CYP2D6: debrisoquine, codeine, poor and ultrarapid metabolizers", cite:"PGx-Examples-Students-Fall-2026.pdf slides 'CYP2D6 Polymorphisms' (pp. 20-22); (T) 10/22"},
    {id:"cyp2c9", name:"CYP2C9: warfarin and the narrow-therapeutic-index drugs", cite:"PGx-Examples-Students-Fall-2026.pdf slides 'CYP2C9 Polymorphisms' (pp. 23-24); (T) 10/22"},
    {id:"cyp2c19", name:"CYP2C19: clopidogrel, the *17 gain of function, and PPIs (Furuta)", cite:"PGx-Examples-Students-Fall-2026.pdf slides 'CYP2C19 Polymorphisms' (pp. 25-28); (T) 10/22"},
    {id:"dpd", name:"Dihydropyrimidine dehydrogenase (DPD) and 5-fluorouracil", cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Dihydropyrimidine Dehydrogenase (DPD)' (p. 29); (T) 10/22"},
    {id:"ugt1a1", name:"UGT1A1*28 and irinotecan", cite:"PGx-Examples-Students-Fall-2026.pdf slide 'UDP-Glucuronosyl-transferase (UGT1A1)' (p. 30); (T) 10/22"},
    {id:"tpmt", name:"Thiopurine methyltransferase (TPMT) and the thiopurines", cite:"PGx-Examples-Students-Fall-2026.pdf slides 'Thiopurine Methyltransferase (TPMT)' (pp. 31-33); (T) 10/22"}
  ]});
QUESTIONS.push(
/* ---------------- Drug metabolizing enzymes: overview ---------------- */
{id:"L19-001", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"dme-overview", skill:"recall", multi:true, core:true, coreWhy:"objective: fully discuss and explain the impact of metabolizing enzyme variants",
 concept:"when-dme-variants-matter", tags:["smith"], source:"both",
 stem:"A polymorphism in a drug-metabolizing enzyme gene becomes clinically important under which conditions? Select all that apply.",
 options:[
  {t:"Metabolism by that enzyme is the major route of elimination or termination of the drug's action", correct:true, why:"When the enzyme is the main way the drug is cleared, a low-activity variant lets the drug build up to high concentrations."},
  {t:"The drug requires metabolic activation", correct:true, why:"A prodrug depends on the enzyme to make the active form, so a variant can cause therapeutic failure or, for a fast variant, too much active drug."},
  {t:"An altered metabolic pathway or the parent compound causes toxicity or side effects", correct:true, why:"When a variant shifts metabolism down a pathway that makes a toxic product, the variant drives the adverse effect."},
  {t:"The drug is excreted unchanged by the kidney", correct:false, why:"A drug cleared unchanged by the kidney does not depend on a metabolizing enzyme, so an enzyme variant does not change its handling."}],
 teach:"Enzyme variants matter when the enzyme does work that changes the drug's fate. The slide lists three situations: the enzyme is the major route of elimination, the drug is a prodrug needing activation, or an altered pathway or the parent compound causes toxicity. A drug cleared unchanged by the kidney is not in this group.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Variations in Drug Metabolizing Enzymes' (p. 12); transcript 10/22"},

{id:"L19-002", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"dme-overview", skill:"recall", core:true, coreWhy:"objective: the impact of metabolizing enzyme variants",
 concept:"dme-biggest-factor", tags:["smith"], source:"both",
 stem:"What is the single biggest factor responsible for variation in drug response between people?",
 options:[
  {t:"Inherited variation in drug-metabolizing enzymes", correct:true, why:"Variation in metabolizing enzymes is the largest contributor to why people respond differently to the same drug."},
  {t:"Variation in drug transporters that move drugs across membranes", correct:false, why:"Transporters affect distribution and absorption, but they are not the biggest factor she named."},
  {t:"Variation in drug target receptors", correct:false, why:"Target variants matter for some drugs, but metabolizing enzymes are the largest source of variability."},
  {t:"Variation in immune system genes", correct:false, why:"Immune-system variants matter for some drugs, but metabolizing enzymes are the largest source of variability."}],
 teach:"Of all the areas pharmacogenomics touches, drug metabolizing enzymes have been studied the most and account for the most variation in drug response. Clinically significant variants have been found in nearly all major phase 1 and phase 2 enzymes.",
 quote:"Variations in our metabolizing enzymes are the biggest reason why we would see variation in drug response",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Variations in Drug Metabolizing Enzymes 2' (p. 13); transcript 10/22"},

{id:"L19-003", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"dme-overview", skill:"recall",
 concept:"first-pms-discovered", tags:["smith"], source:"both",
 stem:"Variants in which two enzymes were the first metabolizing-enzyme polymorphisms studied?",
 options:[
  {t:"Butyrylcholinesterase (BChE) and N-acetyltransferase 2 (NAT2)", correct:true, why:"These were the first two characterized; their gene structures were worked out early, so variants could be linked to variable drug response."},
  {t:"Cytochrome P450 2D6 (CYP2D6) and thiopurine methyltransferase (TPMT)", correct:false, why:"These are the iconic second-generation examples, studied after the first two."},
  {t:"CYP2C9 and CYP2C19", correct:false, why:"The 2C enzymes came later in the study of cytochrome P450 variants."},
  {t:"Dihydropyrimidine dehydrogenase (DPD) and UGT1A1", correct:false, why:"DPD and UGT1A1 are recent, oncology-focused examples, not the historical first."}],
 teach:"BChE and NAT2 do not metabolize a large number of drugs, but patients responded variably to a few drugs handled by them, and their gene structures were figured out early. They were therefore the first metabolizing enzymes in which polymorphisms were identified; CYP2D6 and TPMT were the next big effort.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Variations in Drug Metabolizing Enzymes 2' (p. 13); transcript 10/22"},

{id:"L19-004", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"dme-overview", skill:"figure", type:"match",
 concept:"active-vs-prodrug-decreasing-activity", tags:["smith"], source:"both",
 stem:"As enzyme activity decreases from ultrarapid to poor metabolizer, match each drug type with the clinical result.",
 left:["Active drug converted to an inactive metabolite", "Prodrug (inactive) converted to an active metabolite"],
 right:["Parent drug concentration rises, risking toxicity in poor metabolizers", "Active metabolite concentration falls, risking therapeutic failure in poor metabolizers"],
 pairs:[
  {l:"Active drug converted to an inactive metabolite", r:"Parent drug concentration rises, risking toxicity in poor metabolizers", why:"Less metabolism means the active parent drug is not cleared, so it accumulates to toxic levels."},
  {l:"Prodrug (inactive) converted to an active metabolite", r:"Active metabolite concentration falls, risking therapeutic failure in poor metabolizers", why:"Less metabolism means less of the prodrug is turned into the active form, so the drug does not work."}],
 teach:"The clinical impact depends on whether the parent drug and its metabolite are active. For an active drug made into an inactive metabolite, a poor metabolizer keeps high levels of active parent drug and risks toxicity. For a prodrug made into an active metabolite, a poor metabolizer makes little active drug and risks therapeutic failure. An ultrarapid metabolizer flips each outcome.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Variations in Drug Metabolizing Enzymes 3' (p. 14, DiPiro figure); transcript 10/22"},

{id:"L19-005", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"dme-overview", skill:"recall",
 concept:"clopidogrel-prodrug-antiplatelet", tags:["smith"], source:"both",
 stem:"Clopidogrel is used clinically for what effect?",
 options:[
  {t:"It inhibits platelets, preventing them from sticking together", correct:true, why:"Clopidogrel is a platelet receptor inhibitor that stops platelets from aggregating, which is antiplatelet therapy."},
  {t:"It directly dissolves a clot that has already formed in a vessel", correct:false, why:"Clopidogrel prevents platelet aggregation; it does not break down a formed clot."},
  {t:"It replaces a clotting factor", correct:false, why:"Clopidogrel is not a clotting factor product; it blocks platelet function."},
  {t:"It lowers blood pressure", correct:false, why:"Clopidogrel acts on platelets, not on blood pressure."}],
 teach:"Clopidogrel is a platelet receptor inhibitor. By keeping platelets from sticking together it provides antiplatelet therapy, a form of anticoagulation. It is also a prodrug, so it must be bioactivated before it works.",
 quote:"It's a platelet receptor inhibitor. It helps us to basically do anticoagulation because it prevents the platelets from sticking together",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Variations in Drug Metabolizing Enzymes 4' (p. 15); transcript 10/22"},

{id:"L19-006", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"dme-overview", skill:"apply",
 concept:"clopidogrel-85-15", tags:["smith"], source:"both",
 stem:"In the clopidogrel bioactivation pathway, what happens to most of an administered dose?",
 options:[
  {t:"About 85% is inactivated by esterases to inactive metabolites", correct:true, why:"Esterases clear roughly 85% of the dose to inactive metabolites; only about 15% is bioactivated."},
  {t:"About 85% is bioactivated by CYP enzymes to the active thiol metabolite", correct:false, why:"Only about 15% reaches the active form; 85% is inactivated by esterases."},
  {t:"About 50% is inactivated and 50% is activated", correct:false, why:"The split is about 85% inactivated and 15% activated, not half and half."},
  {t:"Nearly all is activated in a single CYP step", correct:false, why:"Activation is only about 15% of the dose and takes two steps, not one."}],
 teach:"Clopidogrel shows that metabolism is complex. About 85% of the dose is inactivated by esterases to inactive metabolites. Only about 15% is bioactivated, and that happens in two CYP-mediated steps to the active thiol metabolite that inhibits the platelet receptor.",
 quote:"85% of the clopidogrel dose we give is metabolized by esterases to inactive metabolites",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Variations in Drug Metabolizing Enzymes 4' (p. 15); transcript 10/22"},

{id:"L19-007", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"dme-overview", skill:"apply",
 concept:"clopidogrel-2c19-most-important", tags:["smith"], source:"both",
 stem:"Several CYP enzymes act on clopidogrel, but which one most affects how much active metabolite is made?",
 options:[
  {t:"CYP2C19", correct:true, why:"Variants in CYP2C19 matter most for creating the active metabolite, even though CYP1A2, 2B6, 3A and 2C9 also act on the molecule."},
  {t:"CYP1A2, which acts only in the first activation step", correct:false, why:"CYP1A2 acts in the first step, but its variants are less important than CYP2C19 for the active metabolite."},
  {t:"CYP2B6", correct:false, why:"CYP2B6 acts in both steps, but its variants are not the key ones for clopidogrel activation."},
  {t:"CYP3A", correct:false, why:"CYP3A acts in the second step, but CYP2C19 variants most affect the amount of active metabolite."}],
 teach:"Clopidogrel is activated in two steps involving several CYPs (1A2, 2C19 and 2B6 in step one; 3A, 2C9, 2C19 and 2B6 in step two). CYP2C19 is the only one that works in both steps. Studies show that the enzyme that does the most work is not always the one that drives the clinical outcome: for clopidogrel, variants in CYP2C19 are the most important for how much active metabolite forms.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Variations in Drug Metabolizing Enzymes 4' (p. 15); transcript 10/22"},

/* ---------------- Butyrylcholinesterase ---------------- */
{id:"L19-008", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"bche", skill:"recall", core:true, coreWhy:"named metabolizing enzyme variant example",
 concept:"bche-succinylcholine", tags:["smith"], source:"both",
 stem:"Butyrylcholinesterase (BChE) is required to break down which drug?",
 options:[
  {t:"Succinylcholine, a short-acting muscle relaxant", correct:true, why:"BChE hydrolyzes succinylcholine, the short-acting muscle relaxant used for anesthesia."},
  {t:"Isoniazid, used for tuberculosis", correct:false, why:"Isoniazid is acetylated by NAT2, not hydrolyzed by BChE."},
  {t:"Warfarin, an anticoagulant", correct:false, why:"Warfarin is metabolized by CYP2C9, not BChE."},
  {t:"Codeine, an opioid that is activated to morphine", correct:false, why:"Codeine is activated to morphine by CYP2D6, not BChE."}],
 teach:"Butyrylcholinesterase is a classic historical pharmacogenomics example. Its enzymatic activity is required to hydrolyze succinylcholine, a very short-acting muscle relaxant used to paralyze patients for anesthesia. Variants in BChE change how fast succinylcholine is cleared.",
 quote:"this enzyme, it will hydrolyze, um, a drug called succinylcholine. That's a very short acting muscle relaxant used in, used in the, for anesthesia",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Butyrylcholinesterase (BChE)' (p. 18); transcript 10/22"},

{id:"L19-009", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"bche", skill:"apply",
 concept:"bche-slow-metabolizer-time", tags:["smith"], source:"both",
 stem:"A normal (extensive) metabolizer clears succinylcholine in about 2 minutes. How long does a slow metabolizer take?",
 options:[
  {t:"2 to 3 hours", correct:true, why:"The slow metabolizer phenotype clears succinylcholine over 2 to 3 hours instead of a couple of minutes."},
  {t:"About 4 minutes", correct:false, why:"That is near normal; the slow phenotype is far longer, 2 to 3 hours."},
  {t:"About 30 minutes", correct:false, why:"The slow metabolizer takes hours, not half an hour."},
  {t:"1 to 3 days", correct:false, why:"The prolonged clearance is 2 to 3 hours, not days."}],
 teach:"An extensive (normal) metabolizer clears succinylcholine within about 2 minutes. A slow metabolizer takes 2 to 3 hours. Because succinylcholine is a muscle paralyzer, a slow metabolizer stays paralyzed, including the diaphragm, for hours.",
 quote:"Slow metabolizers take a lot longer to clear the drug, so 2 to 3 hours.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Butyrylcholinesterase (BChE)' (p. 18); transcript 10/22"},

{id:"L19-010", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"bche", skill:"recall",
 concept:"bche-frequency", tags:["smith"], source:"both",
 stem:"How common is the slow metabolizer phenotype for succinylcholine?",
 options:[
  {t:"About 1 in 3000 patients", correct:true, why:"The frequency of being a slow metabolizer of succinylcholine is only 1 in 3000."},
  {t:"About 1 in 30 patients", correct:false, why:"The phenotype is far rarer than 1 in 30; it is 1 in 3000."},
  {t:"About 1 in 300 patients", correct:false, why:"The stated frequency is 1 in 3000, not 1 in 300."},
  {t:"About 1 in 30000 patients", correct:false, why:"The frequency is 1 in 3000, not 1 in 30000."}],
 teach:"The slow metabolizer phenotype for succinylcholine occurs in about 1 in 3000 patients. It is rare, but because succinylcholine paralyzes the diaphragm, a slow metabolizer who cannot clear the drug for hours is in danger if no one knows the drug was given.",
 quote:"the frequency of being a slow metabolizer is only 1 in 3000 patients.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Butyrylcholinesterase (BChE)' (p. 18); transcript 10/22"},

/* ---------------- NAT2 ---------------- */
{id:"L19-011", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"nat2", skill:"recall", core:true, coreWhy:"named metabolizing enzyme variant example",
 concept:"nat2-isoniazid", tags:["smith"], source:"both",
 stem:"N-acetyltransferase 2 (NAT2) is a phase 2 enzyme whose variants most affect the response to which drug?",
 options:[
  {t:"Isoniazid, used to treat tuberculosis", correct:true, why:"NAT2 acetylates isoniazid; its variants are most associated with adverse responses to this tuberculosis drug."},
  {t:"Succinylcholine, the short-acting muscle relaxant used in anesthesia", correct:false, why:"Succinylcholine is handled by BChE, not NAT2."},
  {t:"Clopidogrel, an antiplatelet drug", correct:false, why:"Clopidogrel is activated by CYP enzymes, mainly CYP2C19, not NAT2."},
  {t:"Irinotecan, a cancer drug", correct:false, why:"Irinotecan's active metabolite is cleared by UGT1A1, not NAT2."}],
 teach:"NAT2 is a genetically polymorphic phase 2 enzyme that acetylates its substrates. Patients are classified as slow or fast acetylators. The drug most associated with adverse responses from NAT2 variants is isoniazid, which treats tuberculosis.",
 quote:"This is a phase 2 enzyme, and one of the drugs that's associated most with an adverse response in the presence of NAT-2 variants is ... we use that drug to treat tuberculosis",
 note:"Transcript renders isoniazid as \"isoniazide\" and acetylator as \"settllator\"/\"acetyllator\" (garbled captions); the slide prints isoniazid and acetylator.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'N-acetyltransferase 2 (NAT2)' (p. 19); transcript 10/22"},

{id:"L19-012", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"nat2", skill:"apply", type:"match",
 concept:"nat2-selective-toxicity", tags:["smith"], source:"both",
 stem:"Match each NAT2 phenotype and drug with the adverse effect to watch for.",
 left:["Slow acetylator on isoniazid", "Slow acetylator on procainamide", "Fast acetylator on isoniazid"],
 right:["Peripheral nerve damage", "Drug-induced lupus erythematosus", "Hepatotoxicity"],
 pairs:[
  {l:"Slow acetylator on isoniazid", r:"Peripheral nerve damage", why:"Slow acetylation leaves isoniazid in the body longer, which produces peripheral nerve damage."},
  {l:"Slow acetylator on procainamide", r:"Drug-induced lupus erythematosus", why:"When procainamide is not acetylated fast enough, an immunologically based lupus-like reaction can occur."},
  {l:"Fast acetylator on isoniazid", r:"Hepatotoxicity", why:"Fast acetylation makes more of the metabolites that can damage the liver."}],
 teach:"NAT2 shows that either phenotype can cause harm. Slow acetylators keep isoniazid around and can get peripheral nerve damage, and on procainamide they can get drug-induced lupus. Fast acetylators make metabolites of isoniazid that cause hepatotoxicity. You cannot assume only the slow, or only the fast, phenotype is the dangerous one.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'N-acetyltransferase 2 (NAT2)' (p. 19); transcript 10/22"},

{id:"L19-013", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"nat2", skill:"recall",
 concept:"nat2-frequencies", tags:["smith"], source:"both",
 stem:"In which population are about 80% of people slow acetylators?",
 options:[
  {t:"Middle Eastern", correct:true, why:"About 80% of people of Middle Eastern descent are slow acetylators, the highest of the groups she gave."},
  {t:"Japanese population", correct:false, why:"About 10% of the Japanese population are slow acetylators, so most are fast."},
  {t:"Caucasian", correct:false, why:"About 30 to 45% of Caucasians are fast acetylators; the slow fraction is not 80%."},
  {t:"East African", correct:false, why:"She did not give an 80% slow figure for East Africans; the 80% slow figure is Middle Eastern."}],
 teach:"NAT2 phenotype frequency varies by population: about 30 to 45% of Caucasians are fast acetylators, about 10% of the Japanese population are slow, and about 80% of people of Middle Eastern descent are slow. Knowing this helps decide who to monitor on isoniazid.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'N-acetyltransferase 2 (NAT2)' (p. 19); transcript 10/22"},

/* ---------------- CYP2D6 ---------------- */
{id:"L19-014", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2d6", skill:"recall", core:true, coreWhy:"objective: metabolizing enzyme variant example, well characterized",
 concept:"cyp2d6-fraction-metabolized", tags:["smith"], source:"both",
 stem:"CYP2D6 is the best-characterized CYP variant. About what share of marketed medications does it help metabolize?",
 options:[
  {t:"About 15 to 25% of medications", correct:true, why:"CYP2D6 contributes to the metabolism of roughly 15 to 25% of medications on the market, a large amount of work."},
  {t:"About 1 to 2%", correct:false, why:"CYP2D6 handles far more than a couple of percent; it is 15 to 25%."},
  {t:"About 50 to 60% of all marketed medications", correct:false, why:"That overstates CYP2D6's share; the figure is 15 to 25%."},
  {t:"About 80 to 90%", correct:false, why:"No single CYP handles most drugs; CYP2D6 is 15 to 25%."}],
 teach:"CYP2D6 was the first P450 studied in depth because its variants caused extreme variability in drug response. It is well characterized and contributes to metabolism of about 15 to 25% of marketed medications.",
 quote:"It metabolizes about 15 to 25% of the medications on the market, so that's a lot of work that it does",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2D6 Polymorphisms' (p. 20); transcript 10/22"},

{id:"L19-015", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2d6", skill:"figure",
 concept:"cyp2d6-debrisoquine-trimodal", tags:["smith"], source:"both",
 stem:"The classic debrisoquine study plotted the ratio of parent drug to its 4-hydroxy metabolite across people. What did the three peaks of that histogram represent?",
 options:[
  {t:"Three phenotypes: ultrarapid, extensive, and poor metabolizers", correct:true, why:"Distinct peaks mean a monogenic trait; the three peaks are the ultrarapid, extensive, and poor metabolizer groups for CYP2D6."},
  {t:"Three different drugs being compared side by side within one plot", correct:false, why:"The study followed one drug, debrisoquine, and its metabolite; the peaks are phenotype groups, not drugs."},
  {t:"Three doses given to the same person", correct:false, why:"The histogram groups many people by their metabolic profile, not one person at three doses."},
  {t:"Three separate genes acting together", correct:false, why:"Distinct peaks point to a single gene driving the response; a polygenic trait gives one smooth bell curve."}],
 teach:"Debrisoquine is metabolized almost entirely by CYP2D6. Grouping people by their parent-to-metabolite ratio gives a histogram with distinct peaks, which signals a monogenic response. The peaks are the ultrarapid, extensive, and poor metabolizer phenotypes. A smooth bell-shaped curve, by contrast, would mean several genes contribute (a polygenic response).",
 note:"Transcript renders debrisoquine as \"debriszaquin\"/\"debrazaquin\"/\"derizoquin\" (garbled captions); the slide axis reads 'Debrisoquine: 4-Hydroxydebrisoquine metabolic ratio'.",
 quote:"the three humps indicate that we're looking at three different phenotypes",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2D6 Polymorphisms 2' (p. 21, Golan Fig. 52-1A); transcript 10/22"},

{id:"L19-016", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2d6", skill:"apply", type:"match", dupOf:"L18-051",
 concept:"cyp2d6-genotype-phenotype", tags:["smith"], source:"both",
 stem:"Match each CYP2D6 genotype with the phenotype it produces.",
 left:["Multiple copies of the gene (CYP2D6*2xN)", "CYP2D6*5/*5 (whole-gene deletion on both alleles)", "Two copies of the wild-type gene"],
 right:["Ultrarapid metabolizer", "Poor metabolizer with essentially no metabolism", "Extensive (normal) metabolizer"],
 pairs:[
  {l:"Multiple copies of the gene (CYP2D6*2xN)", r:"Ultrarapid metabolizer", why:"Extra copies make a lot of enzyme, so the drug is cleared very quickly."},
  {l:"CYP2D6*5/*5 (whole-gene deletion on both alleles)", r:"Poor metabolizer with essentially no metabolism", why:"With the gene deleted on both alleles the body expresses no CYP2D6, so there is almost no metabolism."},
  {l:"Two copies of the wild-type gene", r:"Extensive (normal) metabolizer", why:"Two normal copies give the common, middle-of-the-distribution metabolic capacity."}],
 teach:"On the debrisoquine histogram, the ultrarapid metabolizers probably carry multiple copies of CYP2D6 (*2xN) and clear drug fastest. The poor metabolizers probably carry *5; the person at the far right, with essentially no metabolism, may be a *5/*5 homozygote who expresses no enzyme. Most people sit in the middle as homozygous wild-type extensive metabolizers.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slides 'CYP2D6 Polymorphisms' (pp. 20-22); transcript 10/22"},

{id:"L19-017", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2d6", skill:"recall",
 concept:"cyp2d6-alleles-function", tags:["smith"], source:"both",
 stem:"More than 100 CYP2D6 alleles exist, but about 9 account for over 95% of phenotypes. Which grouping of functional effects is correct?",
 options:[
  {t:"*1 and *2 functional; *3, *4, *5, *6 nonfunctional; *10, *17, *41 reduced function", correct:true, why:"This matches the slide: two functional, four nonfunctional, three reduced-function alleles."},
  {t:"*1 and *2 nonfunctional; *3, *4, *5, *6 fully functional; *10, *17, *41 increased", correct:false, why:"This reverses the functional groups; *1 and *2 are the functional ones."},
  {t:"All nine alleles are nonfunctional", correct:false, why:"Only four of the nine are nonfunctional; others are functional or reduced."},
  {t:"All nine of the common alleles have strongly increased function", correct:false, why:"None of these nine are gain-of-function; increased activity for 2D6 comes from extra gene copies."}],
 teach:"Although over 100 CYP2D6 alleles have been found, just 9 drive more than 95% of phenotypes. Star 1 and star 2 are fully functional. Star 3, 4, 5, and 6 are nonfunctional (star 5 is a whole-gene deletion; the others are SNPs that abolish function). Star 10, 17, and 41 have reduced function.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2D6 Polymorphisms 3' (p. 22); transcript 10/22"},

{id:"L19-018", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2d6", skill:"apply", core:true, coreWhy:"the codeine example and its clinical consequence",
 concept:"cyp2d6-codeine-um", tags:["smith"], source:"both",
 stem:"Why can a standard codeine dose be dangerous in an ultrarapid CYP2D6 metabolizer?",
 options:[
  {t:"Codeine is converted to morphine too quickly, causing respiratory depression", correct:true, why:"CYP2D6 activates codeine to morphine, so an ultrarapid metabolizer makes a large amount of morphine fast and can suppress breathing."},
  {t:"Codeine is not converted to morphine at all, so the patient gets no pain relief", correct:false, why:"That is the poor metabolizer outcome; an ultrarapid metabolizer over-activates codeine."},
  {t:"Codeine builds up unchanged to toxic levels", correct:false, why:"The danger is the active metabolite morphine, not accumulation of unchanged codeine."},
  {t:"Codeine blocks its own metabolism in these patients", correct:false, why:"The problem is fast activation to morphine, not self-inhibition."}],
 teach:"Codeine is a prodrug activated by CYP2D6 to morphine. In an ultrarapid metabolizer a normal dose is converted quickly into a large amount of morphine, which causes respiratory depression while still relieving pain. Because children died after codeine for cough, codeine cough syrup is no longer given to kids.",
 quote:"Codeine is metabolized by 2D6 to morphine, and if you're a super duper ultra rapid metabolizer, all of a sudden that normal dose of codeine is quickly gonna turn into morphine in your patient.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2D6 Polymorphisms 3' (p. 22); transcript 10/22"},

{id:"L19-019", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2d6", skill:"tell",
 concept:"cyp2d6-um-cleared-vs-activated", tags:["smith"], source:"both",
 stem:"For an ultrarapid CYP2D6 metabolizer, how does the risk differ between a drug that CYP2D6 clears and a prodrug that CYP2D6 activates?",
 options:[
  {t:"A cleared drug may need super-doses; a prodrug may overdose", correct:true, why:"Fast clearance removes an ordinary drug before it works, so more is needed; fast activation makes too much active drug from a prodrug."},
  {t:"Both situations always cause overdose", correct:false, why:"A drug that is only cleared is removed too fast, giving therapeutic failure, not overdose."},
  {t:"Both situations always cause therapeutic failure in these patients", correct:false, why:"A prodrug that is activated too fast causes overdose, not failure."},
  {t:"Neither situation changes the dose needed", correct:false, why:"Ultrarapid metabolism changes both; the direction depends on whether the enzyme clears or activates the drug."}],
 teach:"The ultrarapid metabolizer flips depending on the drug. For a drug that CYP2D6 metabolizes and clears, fast clearance means the patient may need super-doses to reach a therapeutic level. For a prodrug that CYP2D6 activates, such as codeine, fast activation makes too much active drug and can overdose the patient.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2D6 Polymorphisms 3' (p. 22); transcript 10/22"},

{id:"L19-020", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2d6", skill:"apply",
 concept:"cyp2d6-pm-consequences", tags:["smith"], source:"both",
 stem:"A CYP2D6 poor metabolizer is given a standard dose of a drug that CYP2D6 normally clears. What is the likely result?",
 options:[
  {t:"Adverse effects as the drug concentration climbs", correct:true, why:"With little CYP2D6 activity the drug is not cleared, so it accumulates and causes adverse effects at standard doses."},
  {t:"Therapeutic failure from too little drug", correct:false, why:"Too little drug is the ultrarapid-metabolizer problem for a cleared drug, not the poor metabolizer's."},
  {t:"No change at all from the normal response to a standard dose", correct:false, why:"A poor metabolizer handles the drug differently, so a standard dose is not safe."},
  {t:"Faster onset with a shorter duration", correct:false, why:"Slow clearance prolongs exposure; it does not shorten the drug's duration."}],
 teach:"A CYP2D6 poor metabolizer given a drug the enzyme normally clears cannot remove it, so the concentration rises and adverse effects appear at standard doses. If instead the drug is a prodrug that needs CYP2D6 to be activated, the poor metabolizer makes too little active drug and has therapeutic failure.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2D6 Polymorphisms 3' (p. 22); transcript 10/22"},

/* ---------------- CYP2C9 ---------------- */
{id:"L19-021", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c9", skill:"drug", multi:true, core:true, coreWhy:"objective: metabolizing enzyme variant example and its drugs",
 concept:"cyp2c9-nti-drugs", tags:["smith"], source:"both",
 stem:"Which drugs does the CYP2C9 slide list as CYP2C9 substrates? Select all that apply.",
 options:[
  {t:"Warfarin", correct:true, why:"Warfarin is the main CYP2C9 example and a narrow-therapeutic-index anticoagulant."},
  {t:"Phenytoin", correct:true, why:"Phenytoin is a narrow-therapeutic-index drug metabolized by CYP2C9."},
  {t:"Glipizide", correct:true, why:"Glipizide is listed as a CYP2C9 substrate on the slide."},
  {t:"Tolbutamide", correct:true, why:"Tolbutamide is listed as a CYP2C9 substrate on the slide."},
  {t:"Succinylcholine", correct:false, why:"Succinylcholine is hydrolyzed by BChE, not CYP2C9."}],
 teach:"CYP2C9 metabolizes several narrow-therapeutic-index drugs, so small changes in clearance matter. The slide lists warfarin, phenytoin, glipizide, and tolbutamide. Succinylcholine is not a CYP2C9 substrate; it is handled by butyrylcholinesterase.",
 quote:"it does metabolism of a lot of our very narrow therapeutic index drugs, so things like warfarin that we've already talked to some about, and then phenytoin and glipizide",
 note:"Transcript renders tolbutamide as \"tobutamide\" (garbled caption); the slide prints Tolbutamide.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2C9 Polymorphisms' (p. 23); transcript 10/22"},

{id:"L19-022", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c9", skill:"recall",
 concept:"cyp2c9-star2-star3-activity", tags:["smith"], source:"both",
 stem:"Compared with wild type, how much enzyme activity do the common CYP2C9 variants retain?",
 options:[
  {t:"*2 keeps about 20%; *3 keeps about 5%", correct:true, why:"Star 2 retains roughly 20% of wild-type activity and star 3 only about 5%, so star 3 is the more severe reduction."},
  {t:"*2 keeps about 5%; *3 keeps about 20%", correct:false, why:"The values are reversed; star 3 is the lower, about 5%."},
  {t:"Both keep about 50%", correct:false, why:"Both are well below half; star 2 is about 20% and star 3 about 5%."},
  {t:"Both have increased activity", correct:false, why:"Both are reduced-function variants, not gain-of-function."}],
 teach:"The two common CYP2C9 variants are reduced-function. Star 2 keeps about 20% of wild-type activity and star 3 only about 5%. A patient carrying these variants clears CYP2C9 substrates slowly, which matters most for narrow-therapeutic-index drugs like warfarin.",
 quote:"3 has 5% of the activity of the wild type",
  note:"Keyed to her slide and words: *2 keeps about 20% and *3 about 5% of wild-type activity. Katzung ch. 5 states it differently, as a 30-40% (*2) and 80-90% (*3) reduction in S-warfarin metabolism. For her exam, use 20% and 5%.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2C9 Polymorphisms' (p. 23); transcript 10/22"},

{id:"L19-023", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c9", skill:"figure",
 concept:"cyp2c9-warfarin-clearance", tags:["smith"], source:"both",
 stem:"In the warfarin clearance study, how did CYP2C9*3/*3 homozygotes compare with *1/*1 homozygotes?",
 options:[
  {t:"About a 90% reduction in S-warfarin clearance", correct:true, why:"Star 3 homozygotes had about a 90% lower S-warfarin clearance than wild-type homozygotes, a clear gene-dose effect."},
  {t:"About a 20% reduction in S-warfarin clearance", correct:false, why:"The reduction for *3/*3 was far larger, about 90%."},
  {t:"No measurable difference in clearance", correct:false, why:"There was a large, clear difference; *3/*3 cleared warfarin much slower."},
  {t:"Increased S-warfarin clearance", correct:false, why:"Clearance fell, not rose; the variant reduces enzyme activity."}],
 teach:"The warfarin data show a clean gene-dose effect. S-warfarin clearance drops progressively from *1/*1 down through the variant genotypes, with CYP2C9*3/*3 homozygotes showing about a 90% reduction versus *1/*1. The clear relationship is why CYP2C9 is called well characterized.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2C9 Polymorphisms 2' (p. 24, Scordo et al. 2002); transcript 10/22"},

{id:"L19-024", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c9", skill:"apply",
 concept:"cyp2c9-warfarin-low-dose", tags:["smith"], source:"both",
 stem:"Patients who need the lowest starting warfarin dose (about 1.5 mg/day, versus the usual 5 mg/day) tend to share what?",
 options:[
  {t:"At least 80% carry low-activity CYP2C9 variants", correct:true, why:"In that lowest-dose group, at least 80% of patients carried the reduced-function CYP2C9 variants, strengthening the dose-response data."},
  {t:"They all carry two wild-type CYP2C9 alleles", correct:false, why:"Wild-type patients clear warfarin normally and need the usual dose, not the lowest."},
  {t:"They are all ultrarapid metabolizers of S-warfarin", correct:false, why:"Ultrarapid metabolism would raise, not lower, the dose needed; CYP2C9 variants here are reduced-function."},
  {t:"They have no identifiable genetic pattern", correct:false, why:"A clear pattern was found: most carried low-activity CYP2C9 variants."}],
 teach:"The usual warfarin starting dose is about 5 mg/day, but some patients need only about 1.5 mg/day. In that low-dose group at least 80% carried low-activity CYP2C9 variants. This independent study reinforced the clearance data: low-activity genotypes need lower doses.",
 quote:"at least 80% of the people in that dosing category have these low activity variants of 2C9",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2C9 Polymorphisms 2' (p. 24); transcript 10/22"},

{id:"L19-025", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c9", skill:"apply",
 concept:"cyp2c9-inhibitor-plus-variant", tags:["smith"], source:"transcript",
 stem:"CYP2C9 is also inhibited by many drugs. What happens when an inhibitor is present in a patient who also has a low-activity CYP2C9 variant?",
 options:[
  {t:"The two effects add up, leaving even less activity", correct:true, why:"Enzyme inhibition on top of a low-activity variant compounds the loss, so a substrate can reach dangerously high concentrations."},
  {t:"The inhibitor restores normal activity", correct:false, why:"An inhibitor reduces activity further; it cannot restore it."},
  {t:"The variant cancels out the inhibitor's effect entirely", correct:false, why:"They do not cancel; both lower activity, so the effect is additive."},
  {t:"Clearance of the substrate speeds up", correct:false, why:"Both the inhibitor and the variant slow metabolism, so clearance falls."}],
 teach:"CYP2C9 is inhibited by many medications. If an inhibitor is on board and the patient also carries a low-activity variant, the two reductions add together. A CYP2C9 substrate that the body depends on this enzyme to clear can then climb to drug concentrations that are too high.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2C9 Polymorphisms' (p. 23); transcript 10/22"},

/* ---------------- CYP2C19 ---------------- */
{id:"L19-026", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c19", skill:"drug", multi:true, core:true, coreWhy:"CYP2C19 substrates",
 concept:"cyp2c19-substrates", tags:["smith"], source:"both",
 stem:"Which drugs are substrates of CYP2C19, which acts on slightly acidic medications? Select all that apply.",
 options:[
  {t:"Proton pump inhibitors such as omeprazole", correct:true, why:"PPIs are the headline CYP2C19 substrates and are central to the Furuta study."},
  {t:"Fluoxetine", correct:true, why:"Fluoxetine, an SSRI, is a CYP2C19 substrate on the slide."},
  {t:"Diazepam", correct:true, why:"Diazepam is a CYP2C19 substrate; poor metabolizers get more sedation."},
  {t:"Sertraline", correct:true, why:"Sertraline is listed among the acidic-medication substrates of CYP2C19."},
  {t:"Succinylcholine", correct:false, why:"Succinylcholine is hydrolyzed by butyrylcholinesterase, not CYP2C19."}],
 teach:"CYP2C19 tends to work on slightly acidic medications. The slide lists proton pump inhibitors, fluoxetine, sertraline, and diazepam. Succinylcholine is not among them; it belongs to butyrylcholinesterase.",
 quote:"the substrates for that enzyme are often slightly acidic medications, and those include PPIs, fluoxetine",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2C19 Polymorphisms' (p. 25); transcript 10/22"},

{id:"L19-027", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c19", skill:"recall", core:true, coreWhy:"CYP2C19 variant functional effects",
 concept:"cyp2c19-allele-functions", tags:["smith"], source:"both",
 stem:"How do the key CYP2C19 alleles differ in function?",
 options:[
  {t:"*2 and *3 are inactive; *17 has increased function", correct:true, why:"Star 2 and star 3 carry premature stop codons and make no active enzyme, while star 17 increases expression and activity."},
  {t:"*2 and *3 have increased function; *17 is inactive", correct:false, why:"This reverses them; star 2 and star 3 are the inactive alleles."},
  {t:"All three are inactive", correct:false, why:"Star 17 is a gain-of-function allele, not inactive."},
  {t:"All three are fully functional", correct:false, why:"Star 2 and star 3 are inactive, so not all are functional."}],
 teach:"CYP2C19 has over 30 alleles, but four drive most phenotypes. Star 2 and star 3 carry premature stop codons, so the enzyme is inactive. Star 17 is different: it increases function. Together these give the poor, intermediate, extensive, and ultrarapid metabolizer phenotypes.",
 note:"Keyed to her words (both *2 and *3 create a premature stop codon). The Goodman & Gilman figure on p. 26 marks *2 as a splice-site variant (which yields a truncated protein) and *3 as the W212X stop.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2C19 Polymorphisms' (p. 25); transcript 10/22"},

{id:"L19-028", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c19", skill:"apply", core:true, coreWhy:"first gain-of-function example in the lecture",
 concept:"cyp2c19-star17-gain", tags:["smith"], source:"both",
 stem:"Why does CYP2C19*17 increase enzyme activity?",
 options:[
  {t:"An upstream SNP increases expression of the gene", correct:true, why:"The variant sits where the expression machinery binds, so more enzyme is made and total activity rises; it does not change the enzyme's structure."},
  {t:"The SNP changes the enzyme's structure to make it faster", correct:false, why:"For star 17 the gain comes from more enzyme being expressed, not a structural change."},
  {t:"The SNP adds extra copies of the gene", correct:false, why:"Extra gene copies are the CYP2D6 mechanism; star 17 is a single upstream SNP that raises expression."},
  {t:"The SNP creates a premature stop codon", correct:false, why:"A premature stop would abolish function; that describes star 2 and star 3, not star 17."}],
 teach:"CYP2C19*17 is the first gain-of-function variant in this lecture. Its SNP is in the upstream (promoter) region where the machinery for expressing the gene sits down. That raises how much CYP2C19 is made, so activity goes up. The increase comes from more enzyme, not a changed enzyme structure.",
 quote:"17 has increased function. OK. The reason for that is this snip is located in the upstream region of the gene where the machinery for expressing the gene sits down on the gene and starts its work.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slides 'CYP2C19 Polymorphisms' (p. 25), 'CYP2C19 Polymorphisms 2' (p. 26); transcript 10/22"},

{id:"L19-029", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c19", skill:"apply", core:true, coreWhy:"the clopidogrel clinical decision",
 concept:"cyp2c19-clopidogrel-genotype", tags:["smith"], source:"both",
 stem:"Clopidogrel is a prodrug activated partly by CYP2C19. How do the CYP2C19 variants change its effect?",
 options:[
  {t:"*2 or *3 under-activate it, keeping platelets sticky; *17 over-activates it", correct:true, why:"Inactive alleles make too little active drug, so platelets stay sticky; the gain-of-function allele makes too much, so the patient is over-anticoagulated."},
  {t:"*2 or *3 carriers over-activate it, while *17 carriers under-activate it", correct:false, why:"This reverses the alleles; *2 and *3 are inactive, so they under-activate the prodrug."},
  {t:"All CYP2C19 variants raise the active drug level", correct:false, why:"Inactive *2 and *3 lower the active metabolite; only *17 raises it."},
  {t:"CYP2C19 variants do not affect clopidogrel", correct:false, why:"Clopidogrel is a leading CYP2C19 example; variants strongly change its activation."}],
 teach:"Because clopidogrel must be bioactivated and CYP2C19 does part of that, genotype matters. A patient with *2 or *3 cannot make enough active metabolite, so platelets stay sticky (therapeutic failure). A patient with *17 makes too much active drug and is over-anticoagulated. She argues clopidogrel is a drug for which patients should be genotyped first.",
 quote:"clopidogrel is a drug for which we should be genotyping people for their 2C19 status.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2C19 Polymorphisms' (p. 25); transcript 10/22"},

{id:"L19-030", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c19", skill:"apply", core:true, coreWhy:"the Furuta PPI finding, the counterintuitive benefit",
 concept:"cyp2c19-ppi-pm-benefit", tags:["smith"], source:"both",
 stem:"In the Furuta study, how did CYP2C19 poor metabolizers respond to proton pump inhibitor therapy?",
 options:[
  {t:"They had better cure rates", correct:true, why:"Low enzyme activity kept PPI levels higher, which raised gastric pH more and improved cure rates."},
  {t:"They had more drug toxicity and worse outcomes", correct:false, why:"PPIs have a wide therapeutic index, so higher levels helped rather than harmed in this example."},
  {t:"They had no change from extensive metabolizers", correct:false, why:"There was a clear difference: poor metabolizers did better on PPIs."},
  {t:"They needed much higher PPI doses to respond", correct:false, why:"Poor metabolizers kept more drug on board, so they responded better, not worse, at standard dosing."}],
 teach:"PPIs are cleared by CYP2C19, and the drug has a wide therapeutic index. In the Furuta work in Japanese patients, poor metabolizers had the best cure rates; the lansoprazole figure she showed also gives them the highest drug AUC and gastric pH. This is the unusual case where not clearing a drug is beneficial, because the high concentration is still safe for a wide-index drug.",
 quote:"they found that people had better treatment of their disease. When you had the low activity version of the enzyme increasing drug blood concentrations, you had better cure rates.",
 note:"Transcript renders Furuta as \"Furuda\"/\"Fioruda\" (garbled captions); the slide cites Furuta et al. The AUC and gastric-pH results come from the 2004 lansoprazole figure on p. 27, which she presented as that paper's data. The assigned 1998 Furuta paper (omeprazole plus amoxicillin) reported cure rates of 28.6%, 60% and 100% by genotype but did not measure drug levels. The exam keys her words.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slides 'CYP2C19 Polymorphisms' (p. 25), 'CYP2C19 Polymorphisms 3' (p. 27); transcript 10/22"},

{id:"L19-031", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c19", skill:"figure",
 concept:"cyp2c19-furuta-figure", tags:["smith"], source:"both",
 stem:"Furuta et al. (2004) gave lansoprazole 30 mg and plotted three bar panels: area under the curve (AUC) for the proton pump inhibitor (PPI) in ng-h/mL, intragastric pH (24 h mean), and cure rate (%). Each panel has one bar each for cytochrome P450 2C19 (CYP2C19) homozygous extensive metabolizers (homEM), heterozygotes (hetEM) and poor metabolizers (PM). Which phenotype showed the highest drug AUC and the highest gastric pH?",
 options:[
  {t:"Poor metabolizers (homozygous)", correct:true, why:"Poor metabolizers cleared the PPI slowest, so they had the highest AUC and raised gastric pH the most."},
  {t:"Homozygous extensive metabolizers", correct:false, why:"Extensive metabolizers cleared the drug fastest, giving the lowest AUC and the smallest pH rise."},
  {t:"Heterozygous extensive metabolizers", correct:false, why:"Heterozygotes fell in the middle, not the highest, for AUC and pH."},
  {t:"Ultrarapid metabolizers", correct:false, why:"Furuta compared only poor, heterozygous, and homozygous extensive metabolizers; the poor group was highest."}],
 teach:"The figure plots AUC, gastric pH, and cure rate against CYP2C19 phenotype for lansoprazole. Poor metabolizers had the highest AUC because they cleared the drug slowest, the highest gastric pH because more drug suppressed acid, and the best cure rate. Extensive metabolizers cleared the drug fastest and had the lowest values.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2C19 Polymorphisms 3' (p. 27, Furuta et al. 2004); transcript 10/22"},

{id:"L19-032", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c19", skill:"tell", core:true, coreWhy:"the key tell-apart of the day: when low activity helps vs harms",
 concept:"cyp2c19-pm-ppi-vs-ssri", tags:["smith"], source:"both",
 stem:"Why does a CYP2C19 poor metabolizer benefit from a PPI but have trouble with an SSRI or diazepam?",
 options:[
  {t:"PPIs have a very wide index; SSRIs and diazepam bring adverse effects", correct:true, why:"A very wide index lets the extra PPI improve cure rates safely, while for SSRIs and diazepam the higher levels from slow clearance bring more adverse drug responses (and more sedation with diazepam)."},
  {t:"PPIs are prodrugs and SSRIs are not", correct:false, why:"Whether a drug needs activation is not the point here; the difference she drew is the therapeutic index, which is very wide for PPIs."},
  {t:"Poor metabolizers clear PPIs faster than they clear SSRIs and diazepam", correct:false, why:"Poor metabolizers clear all CYP2C19 substrates slowly; the drugs differ in how safe high levels are."},
  {t:"SSRIs are not metabolized by CYP2C19", correct:false, why:"SSRIs like fluoxetine and sertraline are CYP2C19 substrates; the difference is the therapeutic index."}],
 teach:"For most drugs, a low-activity enzyme raises concentrations into a toxic range, which is why poor metabolizers get more adverse drug responses with SSRIs and with diazepam. PPIs are the exception: their therapeutic index is very wide, so the higher concentration is still safe and actually improves cure rates.",
 quote:"it's a good thing to have the 2 or 3 version of 2C19, because you keep the drug in the body, the therapeutic index of your PPIs is very wide",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2C19 Polymorphisms' (p. 25); transcript 10/22"},

{id:"L19-033", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c19", skill:"recall",
 concept:"cyp2c19-phenotypes", tags:["smith"], source:"both",
 stem:"Which set of phenotypes is used for CYP2C19?",
 options:[
  {t:"Poor, intermediate, extensive, and ultrarapid", correct:true, why:"CYP2C19 drug response shows four peaks, so four phenotype groups are named."},
  {t:"Only slow and fast acetylators", correct:false, why:"Slow and fast acetylator is the NAT2 naming, not CYP2C19."},
  {t:"Only the extensive and poor metabolizer groups", correct:false, why:"CYP2C19 adds intermediate and ultrarapid groups, not just two."},
  {t:"Normal and abnormal metabolizers", correct:false, why:"That is not the convention; CYP2C19 uses poor, intermediate, extensive, and ultrarapid."}],
 teach:"CYP2C19 drug response shows four peaks across the population, so four phenotypes are named: poor, intermediate, extensive, and ultrarapid metabolizers. The slide gives poor metabolizer frequencies, including about 16% of Asians.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'CYP2C19 Polymorphisms' (p. 25); transcript 10/22"},

/* ---------------- DPD ---------------- */
{id:"L19-034", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"dpd", skill:"recall", core:true, coreWhy:"named metabolizing enzyme variant example",
 concept:"dpd-drugs", tags:["smith"], source:"both",
 stem:"The gene DPYD codes for dihydropyrimidine dehydrogenase (DPD). Which drugs does DPD activity most affect?",
 options:[
  {t:"Antimetabolites such as 5-fluorouracil and capecitabine", correct:true, why:"DPD catabolizes most of a 5-fluorouracil dose; capecitabine and tegafur are in the same antimetabolite group."},
  {t:"Proton pump inhibitors", correct:false, why:"PPIs are CYP2C19 substrates, not DPD substrates."},
  {t:"Beta blockers", correct:false, why:"Beta blockers are not the DPD example; the DPD drugs are fluoropyrimidine antimetabolites."},
  {t:"Thiopurines such as azathioprine and mercaptopurine", correct:false, why:"Thiopurines are the TPMT example, not DPD."}],
 teach:"DPD, coded by DPYD, catabolizes the fluoropyrimidine antimetabolites 5-fluorouracil, capecitabine, and tegafur (tegafur is not marketed in the US). These drugs stop rapidly dividing cells, which is why they treat cancer but also hit blood cells, gut cells, and hair follicles. About 80% of a 5-FU dose is catabolized by DPD.",
 quote:"this enzyme is important when we're using some of our ... chemotherapy drugs like 5 fluorouracil",
 note:"Transcript renders capecitabine as \"capacetamine\" and tegafur as \"Tegaphfer\" (garbled captions); the slide prints capecitabine and tegafur.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Dihydropyrimidine Dehydrogenase (DPD)' (p. 29); transcript 10/22"},

{id:"L19-035", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"dpd", skill:"apply", core:true, coreWhy:"clinical consequence of the DPD variant",
 concept:"dpd-low-activity-consequence", tags:["smith"], source:"both",
 stem:"What happens when a patient with a low-activity DPYD variant is given 5-fluorouracil?",
 options:[
  {t:"More drug is shunted to cytotoxic metabolites, causing toxicity", correct:true, why:"Less drug is catabolized to inactive products, so more becomes active cytotoxic metabolite, which can cause severe myelosuppression and other toxicity."},
  {t:"Less active metabolite forms, so the drug fails to work at all", correct:false, why:"Low DPD activity shifts more drug toward the active cytotoxic route, not away from it."},
  {t:"The drug is cleared faster and has no effect", correct:false, why:"Low activity slows the inactivating route, so the drug and its toxic metabolites accumulate."},
  {t:"The drug becomes completely inactive", correct:false, why:"The opposite occurs: more active cytotoxic metabolite is made, raising toxicity."}],
 teach:"Normally about 80% of a 5-FU dose is catabolized by DPD to non-toxic products. In a low-activity DPYD variant much less goes that way, so more drug is routed to the active cytotoxic metabolites. The result can be severe myelosuppression, mucositis, neurotoxicity, hand-foot syndrome, and diarrhea, and the myelosuppression can be lethal.",
 quote:"besides severe myelosuppression, you could have patients suffering from mucositis, neurotoxicity, hand-foot syndrome, and diarrhea.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Dihydropyrimidine Dehydrogenase (DPD)' (p. 29); transcript 10/22"},

{id:"L19-036", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"dpd", skill:"recall", lowYield:true,
 concept:"dpd-not-well-characterized", tags:["smith"], source:"transcript",
 stem:"How well characterized are the DPYD variants compared with CYP2D6 and CYP2C19?",
 options:[
  {t:"They are not yet well characterized", correct:true, why:"DPYD is a newer example; its low-activity variants are still being identified, unlike the well-characterized CYP2D6 and CYP2C19."},
  {t:"They are the best characterized of all", correct:false, why:"CYP2D6 and CYP2C19 are the well-characterized examples; DPYD is not yet."},
  {t:"They are fully mapped with guidelines complete", correct:false, why:"Guidelines are still emerging for DPYD; the work is ongoing."},
  {t:"They are no longer studied", correct:false, why:"DPYD is an active area; more characterization is expected."}],
 teach:"She flagged DPYD as a coming area rather than a settled one. Unlike CYP2D6 and CYP2C19, which are well characterized, the low-activity DPYD variants are still being identified, and clinical guidelines for genotyping before fluoropyrimidines are still developing.",
 note:"Low yield: she presented DPYD as an area still being characterized (\"heads up, keep watching for that\"), not a settled, testable detail set.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Dihydropyrimidine Dehydrogenase (DPD)' (p. 29); transcript 10/22"},

/* ---------------- UGT1A1 ---------------- */
{id:"L19-037", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"ugt1a1", skill:"recall", core:true, coreWhy:"named metabolizing enzyme variant example",
 concept:"ugt1a1-star28-expression", tags:["smith"], source:"both",
 stem:"The UGT1A1*28 variant lies in the promoter region of the gene. What does it do to the enzyme?",
 options:[
  {t:"It decreases expression and glucuronidation", correct:true, why:"The *28 promoter variant reduces transcription, so less enzyme is made and glucuronidation activity falls."},
  {t:"It increases expression, raising activity", correct:false, why:"That is the CYP2C19*17 promoter variant; UGT1A1*28 decreases expression."},
  {t:"It changes the enzyme's structure to make it faster", correct:false, why:"The *28 variant lowers expression; it is not a structural gain-of-function change."},
  {t:"It has no effect on the enzyme", correct:false, why:"It reduces expression and glucuronidation, so it has a clear effect."}],
 teach:"UGT1A1*28 is a promoter-region variant, but unlike CYP2C19*17 it reduces expression. Less UGT1A1 is made, so glucuronidation activity drops. This matters because UGT1A1 clears a toxic active metabolite, so lower activity leads to accumulation and toxicity.",
 quote:"this variant in the promoter region decreases the expression of this enzyme",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'UDP-Glucuronosyl-transferase (UGT1A1)' (p. 30); transcript 10/22"},

{id:"L19-038", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"ugt1a1", skill:"apply", core:true, coreWhy:"irinotecan clinical consequence; active drug not a prodrug",
 concept:"ugt1a1-irinotecan-sn38", tags:["smith"], source:"both",
 stem:"A patient with UGT1A1*28 is given irinotecan. What happens?",
 options:[
  {t:"SN-38 accumulates and causes toxicity", correct:true, why:"Low UGT1A1 activity fails to clear the active SN-38 metabolite, so it builds up and causes toxicity."},
  {t:"Irinotecan is never activated, so it fails", correct:false, why:"Irinotecan is already active and is metabolized to the active SN-38; the problem is failure to clear SN-38, not failure to activate."},
  {t:"SN-38 is cleared faster, lowering toxicity", correct:false, why:"The variant lowers clearance, so SN-38 rises, not falls."},
  {t:"The patient needs a higher dose to respond", correct:false, why:"These patients are at risk of toxicity, so dose reduction, not escalation, is the concern."}],
 teach:"Irinotecan is not a prodrug; it is already active and is further metabolized to the active metabolite SN-38. UGT1A1 clears SN-38. A patient with UGT1A1*28 does not make enough enzyme to clear it, so SN-38 accumulates and causes toxicity such as bone marrow suppression. The new twist is that the enzyme is needed to clear a toxic metabolite of an already-active drug.",
 quote:"what clears SN 38 from the body is UGT 1A1.",
  note:"Keyed to her words: irinotecan is not a prodrug; it is active and is further metabolized to the active SN-38. Katzung ch. 5 calls irinotecan a prodrug hydrolyzed to SN-38. For her exam, answer that it is not a prodrug.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'UDP-Glucuronosyl-transferase (UGT1A1)' (p. 30); transcript 10/22"},

{id:"L19-039", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"ugt1a1", skill:"tell",
 concept:"ugt1a1-28-vs-2c19-17", tags:["smith"], source:"both",
 stem:"UGT1A1*28 and CYP2C19*17 are both promoter-region variants. How do their effects differ?",
 options:[
  {t:"*28 decreases expression; *17 increases expression", correct:true, why:"Both sit in the promoter, but *28 lowers how much enzyme is made while *17 raises it."},
  {t:"*28 increases expression; *17 decreases expression", correct:false, why:"This reverses them; *28 is the one that decreases expression."},
  {t:"Both increase expression", correct:false, why:"UGT1A1*28 decreases expression, so they are not both increases."},
  {t:"Both change the enzyme's structure, not its amount", correct:false, why:"Both act on expression (how much enzyme is made), not on enzyme structure."}],
 teach:"Promoter-region variants change how much enzyme is made, but the direction can go either way. CYP2C19*17 increases expression and activity, a gain of function. UGT1A1*28 decreases expression and glucuronidation activity. The lesson is to track the specific variant's direction, not assume promoter variants all do the same thing.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slides 'CYP2C19 Polymorphisms' (p. 25), 'UDP-Glucuronosyl-transferase (UGT1A1)' (p. 30); transcript 10/22"},

/* ---------------- TPMT ---------------- */
{id:"L19-040", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"tpmt", skill:"recall", core:true, coreWhy:"named metabolizing enzyme variant example",
 concept:"tpmt-thiopurines", tags:["smith"], source:"both",
 stem:"Thiopurine methyltransferase (TPMT) is important in the metabolism of which drugs?",
 options:[
  {t:"Azathioprine and mercaptopurine", correct:true, why:"TPMT metabolizes these thiopurines, used as an immunosuppressant and an anticancer drug."},
  {t:"Warfarin, phenytoin and glipizide", correct:false, why:"Warfarin, phenytoin and glipizide are CYP2C9 substrates, not thiopurines."},
  {t:"Omeprazole and diazepam", correct:false, why:"These are CYP2C19 substrates, not TPMT substrates."},
  {t:"Codeine and debrisoquine", correct:false, why:"Those are CYP2D6 examples, not TPMT."}],
 teach:"TPMT is a polymorphic enzyme important for the thiopurines azathioprine and mercaptopurine. Azathioprine is used as an immunosuppressant and is a prodrug that is converted to 6-mercaptopurine; mercaptopurine is used for cancer. Both are affected by TPMT variants.",
 quote:"we've got azathioprine. And we have mercaptopurine.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slides 'Thiopurine Methyltransferase (TPMT)' (pp. 31-32); transcript 10/22"},

{id:"L19-041", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"tpmt", skill:"recall",
 concept:"azathioprine-prodrug-6mp", tags:["smith"], source:"both",
 stem:"How is azathioprine related to 6-mercaptopurine?",
 options:[
  {t:"Azathioprine is a prodrug converted in the body to 6-mercaptopurine", correct:true, why:"Azathioprine is given for immunosuppression and is metabolized to 6-mercaptopurine, the active thiopurine."},
  {t:"6-mercaptopurine is the prodrug converted into azathioprine", correct:false, why:"The direction is reversed; azathioprine is the prodrug that becomes 6-mercaptopurine."},
  {t:"They are unrelated drugs with different targets", correct:false, why:"They are directly linked; azathioprine becomes 6-mercaptopurine."},
  {t:"Both are inactive metabolites of TPMT", correct:false, why:"They are parent drugs; TPMT acts on 6-mercaptopurine to make an inactive methylated product."}],
 teach:"Azathioprine is a prodrug used for immunosuppression; in the body it is changed to 6-mercaptopurine. Mercaptopurine itself is used for cancer because its kinetics are better for that use. 6-mercaptopurine is then handled by competing routes: xanthine oxidase and TPMT make inactive products, while another pathway makes the active 6-thioguanine nucleotides.",
 quote:"Azathioprine, we use it as an immunosuppressant. It's a prodrug. In the body, it gets metabolized or changed really to mercaptopurine.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Thiopurine Methyltransferase (TPMT) 2' (p. 32); transcript 10/22"},

{id:"L19-042", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"tpmt", skill:"apply", core:true, coreWhy:"clinical consequence of low-activity TPMT",
 concept:"tpmt-low-activity-consequence", tags:["smith"], source:"both",
 stem:"In a patient with a low-activity TPMT variant taking a standard thiopurine dose, what is the main risk?",
 options:[
  {t:"More drug becomes 6-thioguanine nucleotides, causing myelosuppression", correct:true, why:"With little TPMT activity, more 6-mercaptopurine goes down the active pathway to 6-thioguanine nucleotides, which suppress bone marrow."},
  {t:"The drug is fully inactivated, so it has no effect on the patient", correct:false, why:"Low TPMT activity shifts more drug toward the active metabolite, not toward inactivation."},
  {t:"Red blood cell production speeds up", correct:false, why:"The active metabolite suppresses blood cell division; it does not speed production."},
  {t:"The drug is cleared too fast to work", correct:false, why:"Low TPMT activity leaves more active metabolite on board, not less."}],
 teach:"TPMT normally diverts some 6-mercaptopurine to an inactive methylated product. When TPMT activity is low, more drug goes down the pathway that makes 6-thioguanine nucleotides, the active metabolite. That stops cancer cells from dividing but also suppresses blood cells, so the dose of azathioprine or mercaptopurine must be reduced.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Thiopurine Methyltransferase (TPMT) 2' (p. 32); transcript 10/22"},

{id:"L19-043", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"tpmt", skill:"recall",
 concept:"tpmt-two-snps", tags:["smith"], source:"both",
 stem:"Which statement about the main TPMT variants is correct?",
 options:[
  {t:"Two SNPs account for over 90% of inactivating alleles; *3A is common in Caucasians, *3C in East Asians", correct:true, why:"Two variants explain most of the variable response; *3A (two nonsynonymous SNPs) predominates in Caucasians and *3C (one SNP) in East Asians."},
  {t:"A single SNP accounts for all TPMT variants worldwide", correct:false, why:"Two main SNPs account for over 90%, not one, and the common variant differs by population."},
  {t:"*3A is a gain-of-function allele", correct:false, why:"*3A is an inactivating allele, not gain-of-function."},
  {t:"TPMT variants affect only drug transport across membranes, not drug metabolism at all", correct:false, why:"TPMT is a metabolizing enzyme; its variants change thiopurine metabolism."}],
 teach:"TPMT is very polymorphic, but two SNPs account for over 90% of the inactivating alleles and the variable response to thiopurines. In Caucasians the most common is TPMT*3A, made of two nonsynonymous SNPs; in East Asians it is TPMT*3C, a single-SNP variant. Phenotype is extensive, intermediate, or poor, measured as enzyme activity in red blood cells.",
 note:"Transcript renders star as \"TPMTAR\"/\"SAR\" (garbled captions); the slide prints TPMT*3A and TPMT*3C. She began TPMT on 10/22 and said the TPMT discussion finishes Monday 10/26. Keyed to her slide and words (two variants, *3A and *3C, over 90%). Katzung ch. 5 credits four alleles (*2, *3A, *3B, *3C) with more than 90% of variability.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Thiopurine Methyltransferase (TPMT) 3' (p. 33); transcript 10/22"},

/* ---------------- recap: monogenic vs polygenic curve shape (CYP2D6-specific) ---------------- */
{id:"L19-044", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2d6", skill:"figure",
 concept:"monogenic-vs-polygenic-shape", tags:["smith"], source:"both",
 stem:"A drug-response histogram shows several distinct peaks rather than one smooth bell curve. What does that indicate?",
 options:[
  {t:"The response is driven mainly by one gene (monogenic)", correct:true, why:"Distinct peaks separate phenotype groups, which points to one gene controlling the response."},
  {t:"The response is driven by many genes (polygenic)", correct:false, why:"A smooth bell-shaped curve, not distinct peaks, indicates many genes blurring the data together."},
  {t:"The drug has no genetic influence on patient response at all", correct:false, why:"Clear peaks are a strong hint of genetic control, not its absence."},
  {t:"The histogram was measured incorrectly", correct:false, why:"Distinct peaks are a meaningful pattern, not an error."}],
 teach:"When a drug-response frequency curve has distinct peaks, each peak is a phenotype and the pattern points to a single gene driving the response (monogenic), as with CYP2D6 and debrisoquine. A smooth bell-shaped curve means many genes contribute (polygenic), which fuzzes the data together. She also cautioned that monogenic curves do not all look the same from gene to gene.",
 cite:"PGx-Examples-Students-Fall-2026.pdf slides 'Monogenic and Polygenic Effects' (p. 10), 'CYP2D6 Polymorphisms 2' (p. 21); transcript 10/22"}
);
