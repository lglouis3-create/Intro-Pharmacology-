// GAP4 — Exam 4 application items added after the coverage audit (gene → function → drug → patient chains, warfarin cases in her format, Furuta chain, two-step ADE and DDI items, cumulative toxicology, Naranjo cases).
// GAP4a — Exam 4 application fill-ins (Dr. Smith). Pharmacogenomics gene-drug chains, warfarin cases in her
// format, Furuta phenotype-to-DNA chains, and poll-style select-all judgments. Schema copied from q_L19.js and
// q_L20.js. ids GAP4-001 up. Only QUESTIONS.push here; the caller integrates the TOPICS (subs already exist in
// q_L19/q_L20/q_L21). Every number, name and claim is sourced to her transcript, the examples/resources decks,
// guide4.js, or the cited CPIC / Furuta reading card.

QUESTIONS.push(
// ---- gene-drug application chains ----
{
  id:"GAP4-001", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"dpd", skill:"apply",
  core:true, coreWhy:"her Exam 4 study list (PGx examples): the DPYD / 5-fluorouracil chain run from genotype to pharmacist action; she said pharmacogenomics would be a lot more application",
  concept:"dpyd-5fu-chain-apply", tags:["smith","gap4"], source:"both",
  stem:"A patient who carries a low-activity DPYD (dihydropyrimidine dehydrogenase) variant is started on a standard dose of 5-fluorouracil. What happens, and what should the pharmacist do?",
  options:[
    {t:"Cytotoxic metabolite builds up and causes severe myelosuppression; lower the dose or avoid the drug", correct:true, why:"About 80% of a dose is normally catabolized by DPD, so low activity shunts more drug to the cytotoxic route and toxicity climbs."},
    {t:"The drug is catabolized faster to inactive products, so the tumor is undertreated and the dose must be raised", correct:false, why:"Low DPD activity catabolizes less, not more; the hazard is excess active metabolite, not undertreatment."},
    {t:"Clearance is unchanged, so the standard dose is safe", correct:false, why:"DPD handles roughly 80% of the dose, so its low activity does change clearance and raises toxicity."},
    {t:"Only reversible hair loss occurs, needing no dose change", correct:false, why:"Myelosuppression, mucositis and neurotoxicity can be lethal, not just hair loss."}
  ],
  teach:"5-fluorouracil is an antimetabolite; only a little is activated while about 80% is catabolized by DPD to inactive products. A low-activity DPYD variant sends more drug down the activation route, so the cytotoxic metabolite accumulates and causes severe myelosuppression, mucositis and neurotoxicity. The response is a lower dose or a different agent, and ideally genotyping before the first dose.",
  quote:"you get a huge increase in the metabolites of the 5FU drug",
  cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Dihydropyrimidine Dehydrogenase (DPD)' (p. 29); transcript 10/22"
},
{
  id:"GAP4-002", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"ugt1a1", skill:"apply",
  core:true, coreWhy:"her Exam 4 study list (PGx examples): the UGT1A1*28 / irinotecan chain, and her point that the enzyme is needed to clear a toxic metabolite of an already-active drug",
  concept:"ugt1a1-28-irinotecan-chain-apply", tags:["smith","gap4"], source:"both",
  stem:"A patient who is homozygous for UGT1A1*28 (UDP-glucuronosyltransferase 1A1) is given irinotecan. Trace what happens to the active metabolite SN-38, and name the risk.",
  options:[
    {t:"SN-38 is not cleared and accumulates, causing bone marrow suppression", correct:true, why:"UGT1A1 glucuronidates SN-38 for clearance; the *28 promoter variant lowers its expression, so SN-38 builds up."},
    {t:"Irinotecan is never converted to SN-38, so the drug fails and a higher dose is required", correct:false, why:"SN-38 is still formed; the defect is failure to clear it, not failure to make it."},
    {t:"SN-38 is cleared faster than normal, lowering toxicity", correct:false, why:"Reduced glucuronidation slows SN-38 clearance, so it accumulates."},
    {t:"The variant speeds glucuronidation, so no change is expected", correct:false, why:"UGT1A1*28 reduces, not raises, glucuronidation activity."}
  ],
  teach:"Irinotecan is an active drug metabolized further to the active metabolite SN-38, which UGT1A1 glucuronidates so it can be cleared. The UGT1A1*28 promoter variant lowers enzyme expression, so a carrier cannot clear SN-38 and it accumulates to toxic levels, causing bone marrow suppression. Unlike clopidogrel, the problem is clearing an active metabolite, not activating a prodrug.",
  quote:"They don't have enough of the enzyme to clear the active metabolite, therefore you get toxicity",
  cite:"PGx-Examples-Students-Fall-2026.pdf slide 'UDP-Glucuronosyl-transferase (UGT1A1)' (p. 30); transcript 10/22"
},
{
  id:"GAP4-003", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"nat2", skill:"apply",
  core:true, coreWhy:"her Exam 4 study list: NAT2 acetylator phenotype to drug response; she stressed both phenotypes carry a risk, so the fast-acetylator case is tested here (not the Middle Eastern slow case in L19-053)",
  concept:"nat2-fast-acetylator-isoniazid-apply", tags:["smith","gap4"], source:"both",
  stem:"A patient of Japanese descent, where about 10% are slow acetylators, is started on isoniazid for tuberculosis. Given the acetylator phenotype most likely here, what should the pharmacist watch for?",
  options:[
    {t:"Hepatotoxicity, so monitor liver health", correct:true, why:"Most of this population are fast acetylators, and fast acetylation of isoniazid makes metabolites that injure the liver."},
    {t:"Peripheral nerve damage from drug that is acetylated too slowly to clear", correct:false, why:"Slow acetylation drives the nerve injury; this population is mostly fast acetylators."},
    {t:"Drug-induced lupus erythematosus from slow acetylation of procainamide", correct:false, why:"That is the slow-acetylator plus procainamide pairing, not fast acetylation of isoniazid."},
    {t:"No monitoring is needed, as acetylator status does not affect isoniazid", correct:false, why:"NAT2 acetylates isoniazid, so phenotype changes which adverse effect to expect."}
  ],
  teach:"NAT2 acetylates isoniazid, and patients are slow or fast acetylators. In the Japanese population only about 10% are slow, so most are fast acetylators. Fast acetylation produces more of the metabolites that cause hepatotoxicity, so the pharmacist should monitor liver function. Slow acetylators instead face peripheral nerve damage, and either phenotype can be the dangerous one.",
  quote:"some of the metabolites of that metabolism can cause hepatotoxicity",
  cite:"PGx-Examples-Students-Fall-2026.pdf slide 'N-acetyltransferase 2 (NAT2)' (p. 19); transcript 10/22"
},
{
  id:"GAP4-004", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"bche", skill:"apply",
  core:true, coreWhy:"her Exam 4 study list: the BChE / succinylcholine chain from phenotype to clinical consequence, her classic historical example",
  concept:"bche-succinylcholine-chain-apply", tags:["smith","gap4"], source:"both",
  stem:"A surgical patient receives succinylcholine and, rather than recovering in a couple of minutes, stays paralyzed and cannot breathe for 2 to 3 hours. What phenotype explains this, and how common is it?",
  options:[
    {t:"A slow butyrylcholinesterase metabolizer, occurring in about 1 in 3000 patients", correct:true, why:"Slow BChE cannot hydrolyze succinylcholine quickly, so the muscle paralysis is prolonged; the phenotype is rare."},
    {t:"An extensive butyrylcholinesterase metabolizer, which clears succinylcholine within minutes", correct:false, why:"Extensive metabolizers recover in about 2 minutes, not hours."},
    {t:"A CYP2D6 ultrarapid metabolizer who converted the drug to a toxic product too quickly", correct:false, why:"Succinylcholine is hydrolyzed by BChE, not activated by CYP2D6."},
    {t:"A fast acetylator whose NAT2 enzyme cleared the drug too slowly", correct:false, why:"NAT2 acetylates isoniazid; it has no role in succinylcholine breakdown."}
  ],
  teach:"Butyrylcholinesterase hydrolyzes the short-acting muscle relaxant succinylcholine. An extensive metabolizer clears it in about 2 minutes, but a slow metabolizer takes 2 to 3 hours, so the diaphragm stays paralyzed and the patient cannot breathe. The slow phenotype occurs in roughly 1 in 3000 people, which is why unexplained prolonged apnea after succinylcholine points to it.",
  quote:"the frequency of being a slow metabolizer is only 1 in 3000 patients",
  cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Butyrylcholinesterase (BChE)' (p. 18); transcript 10/22"
},
{
  id:"GAP4-005", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c9", skill:"apply",
  core:true, coreWhy:"her Exam 4 study list: CYP2C9 and warfarin, the pharmacokinetic (metabolism) arm run from genotype to starting dose",
  concept:"cyp2c9-33-warfarin-dose-apply", tags:["smith","gap4"], source:"both",
  stem:"A patient is CYP2C9*3/*3, the lowest-activity common genotype. Compared with the usual 5 mg per day starting dose of warfarin, what does this patient need, and why?",
  options:[
    {t:"A much lower dose, about 1.5 mg per day, from slow S-warfarin metabolism", correct:true, why:"CYP2C9*3 retains only about 5% activity, so warfarin is cleared slowly and accumulates at normal doses."},
    {t:"A higher dose than usual, from faster clearance than in wild type", correct:false, why:"*3/*3 clears warfarin more slowly than wild type, not faster."},
    {t:"The usual 5 mg per day, with metabolism genes having no bearing on how this patient is dosed", correct:false, why:"CYP2C9 metabolizes S-warfarin, so its low-activity variants lower the needed dose."},
    {t:"No warfarin at all, as the drug cannot work without active CYP2C9", correct:false, why:"CYP2C9 clears warfarin; it is not required for warfarin to act on its target."}
  ],
  teach:"CYP2C9 metabolizes and clears S-warfarin, the more potent enantiomer. CYP2C9*3 keeps only about 5% of wild-type activity, so a *3/*3 patient clears warfarin very slowly and would accumulate it at a normal dose. In the studies she showed, patients needing the lowest starting doses, about 1.5 mg per day versus the usual 5 mg per day, mostly carried these low-activity variants.",
  quote:"need an initial dose of warfarin at about 1.5 mg per day",
  cite:"PGx-Examples-Students-Fall-2026.pdf slides 'CYP2C9 Polymorphisms' 1-2 (pp. 23-24); transcript 10/22"
},
{
  id:"GAP4-006", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c19", skill:"apply",
  core:true, coreWhy:"her Exam 4 study list: CYP2C19*17 gain of function with clopidogrel; the audit found the *17 bleeding case under-tested",
  concept:"cyp2c19-17-clopidogrel-bleed-apply", tags:["smith","gap4"], source:"both",
  stem:"A patient started on clopidogrel, a prodrug, is found to be CYP2C19*17/*17. What is the likely effect, and what is the concern?",
  options:[
    {t:"Extra active metabolite forms, raising the risk of bleeding", correct:true, why:"*17 increases CYP2C19 expression, so more clopidogrel is activated and antiplatelet effect is excessive."},
    {t:"Little active metabolite forms, so platelets stay sticky and the drug fails", correct:false, why:"That is the *2/*3 loss-of-function picture; *17 raises activation, not lowers it."},
    {t:"Clopidogrel is cleared faster, so a larger dose is simply needed", correct:false, why:"Clopidogrel is a prodrug CYP2C19 activates; *17 makes more active drug, so bleeding, not failure, is the worry."},
    {t:"The variant changes nothing, with CYP2C19 not involved in clopidogrel activation", correct:false, why:"CYP2C19 is the key activating enzyme for clopidogrel."}
  ],
  teach:"Clopidogrel is a prodrug that CYP2C19 activates to its antiplatelet form. The *17 variant sits in the promoter region and increases CYP2C19 expression, a gain of function, so a *17/*17 patient activates more clopidogrel than usual. That extra active drug can over-inhibit platelets and cause bleeding, which is why genotyping before clopidogrel helps avoid both subtherapeutic and supratherapeutic effects.",
  quote:"will be rapidly activated to its active form, and you might be having too much of that active drug in the patient",
  cite:"PGx-Examples-Students-Fall-2026.pdf slides 'CYP2C19 Polymorphisms' (pp. 25-28); transcript 10/22"
},
{
  id:"GAP4-007", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c19", skill:"apply",
  core:true, coreWhy:"her Exam 4 study list: the proton pump inhibitor twist, where a low-activity CYP2C19 genotype helps rather than harms",
  concept:"cyp2c19-pm-ppi-benefit-apply", tags:["smith","gap4"], source:"both",
  stem:"A CYP2C19 poor metabolizer (*2/*2) is treated with omeprazole, a proton pump inhibitor, for a peptic ulcer. How does the genotype change the outcome?",
  options:[
    {t:"Omeprazole stays higher and ulcer healing improves", correct:true, why:"Low CYP2C19 activity slows omeprazole clearance, and the wide therapeutic index of proton pump inhibitors makes the higher level a benefit."},
    {t:"Omeprazole is cleared faster, so acid suppression and healing both fall", correct:false, why:"Poor metabolizers clear omeprazole more slowly, so exposure rises."},
    {t:"The higher drug level causes dangerous toxicity that outweighs any benefit", correct:false, why:"Proton pump inhibitors have a wide therapeutic index, so the higher level is tolerated."},
    {t:"Genotype has no effect, with omeprazole not metabolized by CYP2C19", correct:false, why:"Omeprazole is metabolized and cleared by CYP2C19."}
  ],
  teach:"Proton pump inhibitors such as omeprazole are metabolized and cleared by CYP2C19. A poor metabolizer clears the drug slowly, so its concentration stays high. Because these drugs have a wide therapeutic index, the higher level does not cause toxicity; instead acid suppression is stronger and ulcer healing and H. pylori cure improve. This is a rare case where a low-activity variant helps the patient.",
  quote:"it's a good thing to have the 2 or 3 version of 2C19, because you keep the drug in the body, the therapeutic index of your PPIs is very wide",
  cite:"PGx-Examples-Students-Fall-2026.pdf slides 'CYP2C19 Polymorphisms' (pp. 25-28); transcript 10/22"
},
{
  id:"GAP4-008", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2d6", skill:"apply",
  core:true, coreWhy:"her Exam 4 study list: CYP2D6 ultrarapid metabolizer and codeine; this item keys the clinical action (the policy change), distinct from the ADE-classification item L19-055",
  concept:"cyp2d6-um-codeine-action-apply", tags:["smith","gap4"], source:"both",
  stem:"Codeine is a prodrug that CYP2D6 converts to morphine. Knowing some children are CYP2D6 ultrarapid metabolizers, what step was taken to prevent deaths?",
  options:[
    {t:"Acetaminophen with codeine is no longer given to children for cough", correct:true, why:"An ultrarapid metabolizer turns a normal codeine dose into a flood of morphine, which suppresses breathing, so the product was removed for kids."},
    {t:"Every child is now genotyped for CYP2D6 before any codeine dose", correct:false, why:"CYP2D6 is not routinely genotyped; the fix was to stop giving codeine to children."},
    {t:"The pediatric codeine dose was simply cut in half for all children", correct:false, why:"A fixed lower dose cannot predict an ultrarapid metabolizer's morphine surge, so the product was withdrawn instead."},
    {t:"Naloxone is now co-dispensed with every pediatric codeine prescription", correct:false, why:"The response was to avoid codeine in children, not to pair it with an antidote."}
  ],
  teach:"Codeine is activated by CYP2D6 to morphine. An ultrarapid metabolizer, who carries extra gene copies, converts a labeled dose into far too much morphine, suppressing the child's breathing. Because CYP2D6 is not routinely genotyped, the harm was prevented by a blanket rule: do not give acetaminophen with codeine to children for cough. This is now reflected in the CYP2D6 guidance.",
  quote:"we solve the problem of harming children by just saying, do not give Tylenol with codeine to kids",
  cite:"PGx-Examples-Students-Fall-2026.pdf slides 'CYP2D6 Polymorphisms' (pp. 20-22); transcript 10/22"
},
{
  id:"GAP4-009", lecture:"L20", prof:"Smith", tier:"new", topic:"L20", sub:"tpmt-dose", skill:"apply",
  core:true, coreWhy:"her Exam 4 study list: TPMT genotype-guided thiopurine dosing run as a chain from variant to metabolite to toxicity to action",
  concept:"tpmt-3a-mercaptopurine-chain-apply", tags:["smith","gap4"], source:"both",
  stem:"A patient about to start mercaptopurine carries the low-activity TPMT*3A (thiopurine methyltransferase) variant. Trace the metabolic consequence and the pharmacist's action.",
  options:[
    {t:"6-thioguanine nucleotides rise, risking myelosuppression; reduce the dose", correct:true, why:"Low TPMT shunts more drug down the 6-TGN route, which stops blood cell division and can drop white counts dangerously."},
    {t:"6-methylmercaptopurine rises while 6-thioguanine nucleotides fall, so the full dose is safe", correct:false, why:"Low TPMT makes less 6-methylmercaptopurine and more 6-TGN, the toxic product."},
    {t:"Drug clearance is unchanged, so the standard dose carries no extra risk", correct:false, why:"Low TPMT activity shifts metabolism toward 6-TGN, so toxicity risk rises at the standard dose."},
    {t:"The variant raises TPMT activity, so a larger dose is needed for effect", correct:false, why:"TPMT*3A lowers activity; it does not raise it."}
  ],
  teach:"TPMT methylates mercaptopurine to inactive 6-methylmercaptopurine. A low-activity TPMT*3A variant blocks that route, so more drug flows to 6-thioguanine nucleotides, which stop the division of both cancer cells and blood cells and can leave very low white counts. The pharmacist reduces the dose by genotype, and genotyping before the first dose is the standard of care.",
  quote:"you end up with very low white blood cell counts",
  cite:"PGx-Examples-Students-Fall-2026.pdf slides 'Thiopurine Methyltransferase (TPMT)' 2-5 (pp. 32-35); transcript 10/26"
},
{
  id:"GAP4-010", lecture:"L20", prof:"Smith", tier:"new", topic:"L20", sub:"oatp", skill:"apply",
  core:true, coreWhy:"her Exam 4 study list: SLCO1B1 / OATP1B1 and simvastatin, transporter chain from uptake to plasma level to toxicity to action",
  concept:"slco1b1-simvastatin-chain-apply", tags:["smith","gap4"], source:"both",
  stem:"A patient with a reduced-function SLCO1B1 genotype (organic anion transporter OATP1B1) is on high-dose simvastatin and reports pain in the large muscles. What is the chain here, and what should be done?",
  options:[
    {t:"Less hepatic uptake raises plasma simvastatin and threatens rhabdomyolysis; lower the dose or switch statins", correct:true, why:"OATP1B1 carries statins into the liver, so reduced function lets plasma levels climb and muscle breakdown can injure the kidneys."},
    {t:"More hepatic uptake clears simvastatin faster, so the muscle pain is unrelated", correct:false, why:"Reduced-function OATP1B1 lowers hepatic uptake, so plasma levels rise rather than fall."},
    {t:"Bleeding is the expected toxicity, so the dose is held and clotting checked", correct:false, why:"High statin levels cause muscle breakdown, not bleeding."},
    {t:"The transporter has no bearing on statin exposure, so the dose and the reported muscle symptoms need no change at all", correct:false, why:"SLCO1B1 variants markedly raise simvastatin exposure, so the dose should change."}
  ],
  teach:"OATP1B1, coded by SLCO1B1, carries weakly acidic drugs like simvastatin from blood into the liver. A reduced-function variant lets simvastatin stay high in plasma, and high statin levels break down muscle; the contents of damaged muscle can injure the kidneys. The pharmacist lowers the simvastatin dose or chooses another statin less prone to rhabdomyolysis, often after SLCO1B1 genotyping.",
  quote:"Breaks down muscle, right? Get muscle pain in the large muscles of your body",
  cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Organic anion transporter' (p. 47); transcript 10/26"
},
{
  id:"GAP4-011", lecture:"L20", prof:"Smith", tier:"new", topic:"L20", sub:"receptors", skill:"apply",
  core:true, coreWhy:"her Exam 4 study list: ADRB1 beta-1 receptor variants and metoprolol, a drug-target example run to a prescribing decision",
  concept:"adrb1-metoprolol-decision-apply", tags:["smith","gap4"], source:"both",
  stem:"A hypertensive patient is genotyped before metoprolol and carries the variant alleles at both beta-1 receptor (ADRB1) sites, codons 49 and 389. What does the evidence suggest?",
  options:[
    {t:"The patient may respond poorly, so consider another drug", correct:true, why:"Patients homozygous for the wild-type Ser49 and Arg389 responded better, so the variant predicts a weaker blood-pressure response."},
    {t:"The patient will respond better than a wild-type patient to metoprolol", correct:false, why:"It was the wild-type homozygotes, not the variant carriers, who responded better."},
    {t:"Metoprolol will be metabolized faster, so a higher dose is needed", correct:false, why:"ADRB1 is the drug target, not a metabolizing enzyme; it changes response, not clearance."},
    {t:"Genotype has no bearing on the choice of a beta-blocker here", correct:false, why:"Beta-1 receptor genotype may be a determinant of blood-pressure response to beta-blockers."}
  ],
  teach:"ADRB1 codes the beta-1 adrenergic receptor, the target of metoprolol. Two non-synonymous changes, Ser49Gly and Arg389Gly, were studied in hypertensive patients, and those homozygous for the wild-type Ser49 and Arg389 responded best. A patient carrying the variant alleles may respond poorly, so genotype can guide whether to start metoprolol or pick a different antihypertensive.",
  quote:"if they've got the variant, you might need to think twice about whether they're gonna respond well to metoprolol",
  cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Variations of Drug Targets: Receptors' (p. 50); transcript 10/26"
},
{
  id:"GAP4-012", lecture:"L20", prof:"Smith", tier:"new", topic:"L20", sub:"receptors", skill:"apply",
  core:true, coreWhy:"her Exam 4 study list: EGFR gain-of-function and gefitinib, the example where the target variant causes the disease and selects the drug",
  concept:"egfr-gefitinib-selection-apply", tags:["smith","gap4"], source:"both",
  stem:"A patient has non-small cell lung cancer. The tumor is tested for an epidermal growth factor receptor (EGFR) gain-of-function variant before considering gefitinib. Why does the result decide the drug?",
  options:[
    {t:"Gefitinib helps only tumors with the overexpressed variant receptor driving division", correct:true, why:"The gain-of-function EGFR drives the cell to divide, and gefitinib blocks that receptor, so it works only when the tumor carries the variant."},
    {t:"Gefitinib helps every lung cancer patient, as all of our cells carry the EGFR receptor on their surface", correct:false, why:"A tumor without the variant, overexpressed EGFR will not respond to gefitinib."},
    {t:"Gefitinib is chosen only when CYP2C9 activity is low in the patient", correct:false, why:"The decision rests on the tumor's EGFR status, not on a metabolizing enzyme."},
    {t:"Gefitinib is avoided whenever the EGFR variant is present in the tumor", correct:false, why:"The variant is exactly what makes the tumor a good candidate for gefitinib."}
  ],
  teach:"Epidermal growth factor binds EGFR and signals the cell to divide. In some non-small cell lung cancers a gain-of-function EGFR is overexpressed and drives division. Gefitinib binds the inside of that receptor and blocks the dividing signal, so it helps only tumors carrying the variant, overexpressed EGFR. Here the drug-target variant both causes the cancer and selects the drug, unlike the beta-1 receptor example.",
  quote:"If your patient does not have variant EGFR, you don't want to give them jafitinib",
  cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Variations of Drug Targets: Receptors 4' (p. 53); transcript 10/26"
},
{
  id:"GAP4-013", lecture:"L20", prof:"Smith", tier:"new", topic:"L20", sub:"target-enz", skill:"apply",
  core:true, coreWhy:"her Exam 4 study list: the ACE insertion/deletion variant, which predicts adverse-effect risk rather than efficacy",
  concept:"ace-id-adverse-risk-apply", tags:["smith","gap4"], source:"both",
  stem:"A patient on an ACE (angiotensin-converting enzyme) inhibitor carries the ACE insertion/deletion variant in intron 16. What does this variant best predict for this patient?",
  options:[
    {t:"The risk of adverse effects such as persistent dry cough and angioedema", correct:true, why:"The variant tracks with plasma ACE level and appears to predict adverse reactions, not how well the drug lowers blood pressure."},
    {t:"How much a standard starting dose will lower this particular patient's blood pressure over time", correct:false, why:"The variant does not appear to predict the efficacy of ACE inhibitors."},
    {t:"How quickly the kidneys will clear the ACE inhibitor from the body", correct:false, why:"The variant affects adverse-effect risk, not clearance."},
    {t:"Whether the drug can cross into the central nervous system", correct:false, why:"Central penetration is unrelated to the ACE insertion/deletion variant."}
  ],
  teach:"The ACE gene carries an insertion/deletion variant in intron 16 that is associated with plasma ACE concentration. For patients on ACE inhibitors it does not seem to predict how well blood pressure is controlled; instead it probably predicts adverse reactions. About 10% of patients develop a persistent dry cough, and angioedema, though rare at 0.1 to 0.2%, is dangerous, so this is an adverse-effect marker.",
  quote:"about 10% of people develop that, that persistent little dry cough",
  cite:"PGx-Examples-Students-Fall-2026.pdf slide 'Variations of Drug Targets: Enzymes 2' (p. 56); transcript 10/26"
},
// ---- warfarin cases in her format (genotyping complete? dose direction? why?) ----
{
  id:"GAP4-014", lecture:"L21", prof:"Smith", tier:"new", topic:"L21", sub:"cpic-warf", skill:"apply", readingId:"cpic-warfarin-2017",
  core:true, coreWhy:"her stated warfarin case format; Exam 4 study list item (CPIC Figure 2): VKORC1 -1639A on the pharmacodynamic arm",
  concept:"cpic-warf-case-vkorc1-aa", tags:["smith","gap4"], source:"both",
  stem:"A patient of non-African ancestry is VKORC1 -1639A/A and CYP2C9*1/*1. Per the CPIC 2017 algorithm, was the genotyping complete for this branch, and does this patient need more or less than the average starting dose?",
  options:[
    {t:"Complete for this branch; a lower-than-average dose is needed", correct:true, why:"VKORC1 and CYP2C9*2/*3 are the non-African inputs, and -1639A/A makes warfarin's target less abundant, so less drug is needed."},
    {t:"Incomplete; CYP2C9*5, *6, *8 and *11 and rs12777823 must be tested before dosing this patient first", correct:false, why:"Those variants are tested up front on the African-ancestry branch, not this one."},
    {t:"Complete, but a higher-than-average dose is needed here", correct:false, why:"VKORC1 -1639A carriers need progressively lower, not higher, doses."},
    {t:"Complete, with no change from the average starting dose", correct:false, why:"The -1639A/A genotype lowers the needed dose below average."}
  ],
  teach:"On the non-African branch the CPIC algorithm calculates warfarin dose from VKORC1 -1639G>A and CYP2C9*2 and *3. VKORC1 is warfarin's target, vitamin K epoxide reductase; the -1639A allele lowers its expression, so one or two A alleles need progressively lower doses. With CYP2C9*1/*1 and VKORC1 -1639A/A, the genotyping needed for this branch is done and the dose is below average.",
  quote:"you don't need so much of the drug in that patient that has the genetic variant",
  cite:"CPIC warfarin guideline 2017 update, 'VKORC1 and warfarin' (p. 399), Figure 2 (p. 401); PGx-Resources-and-Cases-Students-Fall-2026.pdf slide 'CPIC Guidelines 7' (p. 15); transcript 10/26 and 10/27"
},
{
  id:"GAP4-015", lecture:"L21", prof:"Smith", tier:"new", topic:"L21", sub:"cpic-warf", skill:"apply", readingId:"cpic-warfarin-2017",
  core:true, coreWhy:"her warfarin case format; Exam 4 study list (CPIC Figure 2): CYP2C9*2/*3 on the pharmacokinetic arm",
  concept:"cpic-warf-case-cyp2c9-23", tags:["smith","gap4"], source:"both",
  stem:"A patient of non-African ancestry is CYP2C9*2/*3 and VKORC1 -1639G/G. Per the CPIC 2017 algorithm, was the genotyping complete for this branch, and does this patient need more or less than the average starting dose?",
  options:[
    {t:"Complete for this branch; a lower-than-average dose is needed", correct:true, why:"CYP2C9*2 and *3 are decreased-function alleles, so S-warfarin is cleared slowly and less drug is required."},
    {t:"Incomplete; CYP4F2*3 must be tested before any dose can be calculated at all", correct:false, why:"CYP4F2*3 is an optional add-on, not a required input, so genotyping for this branch is complete."},
    {t:"Complete, but a higher-than-average dose is needed here", correct:false, why:"Decreased CYP2C9 function slows clearance, so the dose goes down, not up."},
    {t:"Incomplete; VKORC1 G/G means the target gene was not tested", correct:false, why:"G/G is the reference VKORC1 genotype, so that gene was tested and is simply wild type."}
  ],
  teach:"CYP2C9 metabolizes S-warfarin, the more potent enantiomer. The *2 and *3 alleles are decreased-function, impairing S-warfarin metabolism, so the drug accumulates and a *2/*3 patient needs a lower dose. VKORC1 -1639G/G is the reference genotype on the pharmacodynamic arm. With both VKORC1 and CYP2C9 reported, the non-African branch inputs are complete and the dose is below average.",
  quote:"you guys already know that the 2C9, 2 and 3 are affecting the activity of 2C9",
  cite:"CPIC warfarin guideline 2017 update, 'CYP2C9 and warfarin' (p. 398), Figure 2 (p. 401); PGx-Resources-and-Cases-Students-Fall-2026.pdf slide 'CPIC Guidelines 7' (p. 15); transcript 10/27"
},
{
  id:"GAP4-016", lecture:"L21", prof:"Smith", tier:"new", topic:"L21", sub:"cpic-warf", skill:"apply", readingId:"cpic-warfarin-2017",
  core:true, coreWhy:"her warfarin case format; Exam 4 study list (CPIC Figure 2): the African-ancestry branch and which variants are tested up front",
  concept:"cpic-warf-case-african-incomplete", tags:["smith","gap4"], source:"both",
  stem:"A patient who self-identifies as of African ancestry is about to start warfarin; the lab has reported only VKORC1 -1639G>A and CYP2C9*2 and *3. Per the CPIC 2017 algorithm, is the genotyping complete for this branch?",
  options:[
    {t:"No; CYP2C9*5, *6, *8 and *11 are tested up front on this branch", correct:true, why:"These decreased-function alleles are frequent in African ancestry, so the algorithm asks for them before dosing."},
    {t:"Yes; VKORC1 and CYP2C9*2 and *3 are the full input set for every patient", correct:false, why:"On the African-ancestry branch CYP2C9*5, *6, *8 and *11 are also required up front."},
    {t:"No; CYP4F2*3 must be added for the African-ancestry branch", correct:false, why:"CYP4F2*3 belongs to the non-African branch; it is not on the African-ancestry algorithm."},
    {t:"Yes; once ancestry is known no further genotyping is ever needed", correct:false, why:"Ancestry selects the branch, and the African-ancestry branch still needs the extra CYP2C9 alleles."}
  ],
  teach:"The CPIC warfarin algorithm branches on self-identified ancestry. On the African-ancestry branch CYP2C9*5, *6, *8 and *11 are tested up front because they are decreased-function and frequent in this population; rs12777823 is also considered. A panel of only VKORC1 and CYP2C9*2 and *3 is therefore incomplete here, and dosing without the extra alleles risks starting the patient too high.",
  quote:"we also need to be concerned about upfront testing them for these extra variants of 568, and 11",
  cite:"CPIC warfarin guideline 2017 update, 'CYP2C9 and warfarin' (pp. 398-399), Figure 2 and footnote c (p. 401); PGx-Resources-and-Cases-Students-Fall-2026.pdf slide 'CPIC Guidelines 7' (p. 15); transcript 10/27"
},
{
  id:"GAP4-017", lecture:"L21", prof:"Smith", tier:"new", topic:"L21", sub:"cpic-warf", skill:"apply", readingId:"cpic-warfarin-2017",
  core:true, coreWhy:"her warfarin case format; Exam 4 study list (CPIC Figure 2): CYP4F2*3 raises the dose via vitamin K clearance, non-African branch only",
  concept:"cpic-warf-case-cyp4f2", tags:["smith","gap4"], source:"both",
  stem:"A patient of non-African ancestry is VKORC1 -1639G/G, CYP2C9*1/*1 and carries CYP4F2*3. Per the CPIC 2017 algorithm, was the genotyping complete for this branch, and does this patient need more or less than the average starting dose?",
  options:[
    {t:"Complete for this branch; a higher-than-average dose is needed", correct:true, why:"CYP4F2*3 lowers vitamin K clearance, so more vitamin K competes with warfarin and more drug is required."},
    {t:"Complete, but a lower-than-average dose is needed here", correct:false, why:"Less vitamin K is removed, so more warfarin, not less, is needed."},
    {t:"Incomplete; rs12777823 must also be tested before dosing this non-African patient first", correct:false, why:"rs12777823 is applied only on the African-ancestry branch."},
    {t:"Complete, with no change from the average starting dose", correct:false, why:"CYP4F2*3 raises the needed dose by about 5 to 10%, so it is not unchanged."}
  ],
  teach:"CYP4F2 metabolizes vitamin K to remove it from the vitamin K cycle. The CYP4F2*3 variant lowers that activity, so more vitamin K accumulates, and vitamin K works against warfarin, so more warfarin is needed to anticoagulate the patient. On the non-African branch CYP4F2*3 adds about 5 to 10% to the calculated dose; with VKORC1, CYP2C9 and CYP4F2 reported, the branch inputs are complete.",
  quote:"You need to increase their warfarin dose",
  cite:"CPIC warfarin guideline 2017 update, 'CYP4F2 and warfarin' (p. 399), Figure 2 (p. 401); PGx-Resources-and-Cases-Students-Fall-2026.pdf slide 'CPIC Guidelines 7' (p. 15); transcript 10/27"
},
// ---- Furuta 1998 phenotype-to-DNA-to-outcome chains ----
{
  id:"GAP4-018", lecture:"L20", prof:"Smith", tier:"new", topic:"L20", sub:"furuta", skill:"apply", readingId:"furuta-1998",
  core:true, coreWhy:"her Exam 4 study list (Furuta): drill from the poor-metabolizer phenotype down to the DNA defect",
  concept:"furuta-phenotype-to-dna-apply", tags:["smith","gap4"], source:"both",
  stem:"In Furuta et al. (1998), a patient is a CYP2C19 poor metabolizer with no active enzyme. Drilling from phenotype to DNA, which genotype and molecular defect is this?",
  options:[
    {t:"CYP2C19*2/*3, each a premature stop codon that truncates the protein", correct:true, why:"The paper's m1 and m2 are *2 and *3, SNPs that create a stop codon, so a short non-functional enzyme is made."},
    {t:"CYP2C19*1/*1, two wild-type alleles coding full-activity enzyme", correct:false, why:"Two wild-type alleles give the rapid-extensive metabolizer, not the poor metabolizer."},
    {t:"CYP2C19*17/*17, a promoter variant that raises enzyme expression", correct:false, why:"*17 increases activity, the opposite of a poor metabolizer."},
    {t:"A whole-gene deletion like CYP2D6*5 present on both of the patient's alleles", correct:false, why:"The defect in *2 and *3 is a premature stop codon, not deletion of the gene."}
  ],
  teach:"Furuta labeled the mutant alleles m1 and m2, which in current nomenclature are CYP2C19*2 and *3. Each is a single-base change that creates a premature stop codon, so transcription stops early and the enzyme is too short to work. A patient with two such alleles, *2/*3 or *2/*2, makes no active CYP2C19 and is the poor metabolizer, the group with the highest omeprazole exposure in the study.",
  quote:"It's non-functional because it's a premature stop codon. You guys have to know this",
  cite:"FurutaAnnIntMed1998.pdf (Methods and Table 1 footnote, p. 1028); PGx-Examples-Students-Fall-2026.pdf slide 'Discussion of Furuta article' (p. 61); transcript 10/26"
},
{
  id:"GAP4-019", lecture:"L20", prof:"Smith", tier:"new", topic:"L20", sub:"furuta", skill:"apply", readingId:"furuta-1998",
  core:true, coreWhy:"her Exam 4 study list (Furuta): tie the no-enzyme genotype to omeprazole exposure, gastric pH and the cure rate",
  concept:"furuta-auc-ph-cure-chain-apply", tags:["smith","gap4"], source:"both",
  stem:"In Furuta et al. (1998), the group with no active CYP2C19 (group 3) is compared with the wild-type group (group 1). For group 3, what follows for omeprazole exposure, gastric pH and H. pylori cure?",
  options:[
    {t:"The highest omeprazole exposure, higher gastric pH and the best cure rate", correct:true, why:"No active CYP2C19 clears omeprazole slowly, so exposure and pH stay high and cure reached 100%."},
    {t:"The lowest omeprazole exposure, lower gastric pH and the worst cure rate", correct:false, why:"That describes wild-type group 1, which cleared omeprazole fastest."},
    {t:"The highest exposure but the worst cure rate, from drug toxicity", correct:false, why:"Proton pump inhibitors have a wide therapeutic index, so the high level helped rather than harmed."},
    {t:"The same exposure and cure rate as group 1, with only the antibiotic mattering", correct:false, why:"Cure rate differed sharply by CYP2C19 genotype in the study."}
  ],
  teach:"Group 3 patients have no active CYP2C19, so they clear omeprazole slowly; the paper reports relative omeprazole exposure of about 1, 3.7 and 20 across groups 1, 2 and 3. The sustained high level keeps gastric pH elevated, which favors H. pylori eradication, and the cure rate rose from 28.6% in group 1 to 100% in group 3. The wide therapeutic index of proton pump inhibitors makes the high exposure a benefit.",
  quote:"So Group 3 has the best cure rate",
  cite:"FurutaAnnIntMed1998.pdf (Results and Table 2, pp. 1028-1029); PGx-Examples-Students-Fall-2026.pdf slide 'Discussion of Furuta article' (p. 61); transcript 10/26"
},
{
  id:"GAP4-020", lecture:"L20", prof:"Smith", tier:"new", topic:"L20", sub:"furuta", skill:"apply", readingId:"furuta-1998",
  core:true, coreWhy:"her Exam 4 study list (Furuta): the discussion reasons linking higher gastric pH to the antibiotic's effect",
  concept:"furuta-ph-amoxicillin-chain-apply", tags:["smith","gap4"], source:"both",
  stem:"In the Furuta et al. (1998) discussion, how does a poor metabolizer's sustained high gastric pH help amoxicillin cure H. pylori?",
  options:[
    {t:"Amoxicillin stays more active and more of it reaches the stomach lining where H. pylori lives", correct:true, why:"Amoxicillin is unstable at low pH, so a higher pH preserves it, and omeprazole raises amoxicillin in gastric juice."},
    {t:"Amoxicillin is broken down faster at the higher pH, lowering its level", correct:false, why:"Amoxicillin is more stable, not less, as pH rises toward neutral."},
    {t:"Amoxicillin is absorbed into plasma much faster, pulling it away from the stomach wall where it is needed", correct:false, why:"The benefit is more antibiotic staying in the stomach, not faster absorption out of it."},
    {t:"The higher pH itself kills H. pylori, so amoxicillin is no longer needed", correct:false, why:"The antibiotic still does the killing; the pH makes it more effective."}
  ],
  teach:"In poor metabolizers omeprazole stays high and gastric pH is sustained near neutral. The discussion's reasons follow: amoxicillin is unstable and less active at low pH, so a higher pH keeps more of it active, and omeprazole has been reported to raise amoxicillin concentrations in gastric juice. More active antibiotic therefore reaches the stomach lining where H. pylori lives, which helps explain the higher cure rate.",
  quote:"the higher amoxicillin helps you get amoxicillin into the stomach lining, where H. pylori is",
  cite:"FurutaAnnIntMed1998.pdf (Discussion, p. 1029); PGx-Examples-Students-Fall-2026.pdf slide 'Discussion of Furuta article' (p. 61); transcript 10/26"
},
// ---- poll-style select-all judgments ----
{
  id:"GAP4-021", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"cyp2c19", skill:"apply", multi:true,
  core:true, coreWhy:"her 'turn to a buddy' point: both CYP2C19*17 and UGT1A1*28 sit in the regulatory region yet move expression in opposite directions",
  concept:"promoter-variants-opposite-direction-sata", tags:["smith","gap4"], source:"both",
  stem:"A classmate lists facts about CYP2C19*17 and UGT1A1*28, both regulatory-region variants. Which statements are correct? Select all that apply.",
  options:[
    {t:"CYP2C19*17 raises enzyme expression, a gain of function", correct:true, why:"The *17 SNP sits upstream and increases how much CYP2C19 is made."},
    {t:"UGT1A1*28 lowers enzyme expression", correct:true, why:"The *28 promoter variant reduces transcription and glucuronidation activity."},
    {t:"Both variants lie in the regulatory region that controls expression", correct:true, why:"Each sits where the expression machinery binds, not in the coding sequence."},
    {t:"UGT1A1*28 raises expression and speeds clearance of SN-38", correct:false, why:"*28 lowers expression, so SN-38 is cleared more slowly and accumulates."},
    {t:"Both variants work by creating a premature stop codon in the coding region", correct:false, why:"These are expression-changing promoter variants, not coding stop-codon changes like CYP2C19*2 and *3."}
  ],
  teach:"CYP2C19*17 and UGT1A1*28 both sit in the regulatory region that controls how much enzyme is expressed, but they move it in opposite directions. *17 increases CYP2C19 expression, a gain of function that activates more clopidogrel. *28 decreases UGT1A1 expression, so SN-38 is glucuronidated and cleared more slowly. Neither changes the coding sequence the way the stop-codon alleles *2 and *3 do.",
  quote:"this variant in the promoter region decreases the expression of this enzyme",
  cite:"PGx-Examples-Students-Fall-2026.pdf slides 'CYP2C19 Polymorphisms' (pp. 25-28), 'UDP-Glucuronosyl-transferase (UGT1A1)' (p. 30); transcript 10/22"
},
{
  id:"GAP4-022", lecture:"L20", prof:"Smith", tier:"new", topic:"L20", sub:"warfarin", skill:"apply", multi:true,
  core:true, coreWhy:"her Exam 4 study list: what each warfarin variant does to the dose on its own, and that CYP2C9 and CYP4F2 push in opposite directions",
  concept:"warfarin-variants-direction-sata", tags:["smith","gap4"], source:"both",
  stem:"Judge these statements about the genetic variants that change warfarin dosing needs. Which are correct? Select all that apply.",
  options:[
    {t:"CYP2C9*2 and *3 lower the needed dose on their own", correct:true, why:"They reduce S-warfarin metabolism, so the drug accumulates and less is needed."},
    {t:"A low-activity VKORC1 haplotype lowers the needed dose on its own", correct:true, why:"Less active target enzyme means less warfarin is needed to inhibit it."},
    {t:"CYP4F2*3 raises the needed dose on its own", correct:true, why:"It slows vitamin K clearance, and extra vitamin K competes with warfarin."},
    {t:"CYP2C19 variants change the needed warfarin dose", correct:false, why:"CYP2C19 affects clopidogrel and proton pump inhibitors, not warfarin dosing."},
    {t:"A CYP2C9 decreased-function allele and CYP4F2*3 push the dose the same way", correct:false, why:"They have opposite effects: CYP2C9 variants lower the dose while CYP4F2*3 raises it."}
  ],
  teach:"Warfarin dosing turns on its pharmacokinetic and pharmacodynamic genes. CYP2C9*2 and *3 slow S-warfarin metabolism, so they lower the dose, and a low-activity VKORC1 haplotype means the target is scarcer, also lowering the dose. CYP4F2*3 slows vitamin K clearance, so extra vitamin K competes with warfarin and raises the dose. CYP2C9 and CYP4F2*3 therefore pull in opposite directions; CYP2C19 is not a warfarin gene.",
  quote:"those are going to be opposite effects on the dose",
  cite:"PGx-Examples-Students-Fall-2026.pdf slides 'Integrated: Both PK and PD' 1-2 (pp. 57-58); transcript 10/26 and 10/28"
},
{
  id:"GAP4-023", lecture:"L19", prof:"Smith", tier:"new", topic:"L19", sub:"bche", skill:"apply", multi:true,
  core:true, coreWhy:"her historical examples: BChE and NAT2 phenotype-to-drug pairings, and her 'don't assume' point that either phenotype can be the dangerous one",
  concept:"historical-examples-judgment-sata", tags:["smith","gap4"], source:"both",
  stem:"Judge these statements about the historical pharmacogenomic examples. Which are correct? Select all that apply.",
  options:[
    {t:"Butyrylcholinesterase hydrolyzes succinylcholine", correct:true, why:"Its activity is required to break down the muscle relaxant succinylcholine."},
    {t:"A slow butyrylcholinesterase metabolizer stays paralyzed for 2 to 3 hours", correct:true, why:"Without fast hydrolysis the drug lingers far beyond the usual 2 minutes."},
    {t:"NAT2 acetylates isoniazid, and either acetylator phenotype can carry a drug risk", correct:true, why:"Slow acetylators face nerve damage and fast acetylators face hepatotoxicity."},
    {t:"Fast acetylators of isoniazid are the ones at risk for peripheral nerve damage", correct:false, why:"Peripheral nerve damage is the slow-acetylator risk, not the fast one."},
    {t:"A TPMT-deficient patient needs a higher thiopurine dose", correct:false, why:"TPMT deficiency lets toxic metabolite build up, so the dose is lowered, not raised."}
  ],
  teach:"Butyrylcholinesterase and NAT2 are the classic historical examples. BChE hydrolyzes succinylcholine, so a slow metabolizer stays paralyzed for 2 to 3 hours instead of 2 minutes. NAT2 acetylates isoniazid, and either phenotype can be dangerous: slow acetylators risk peripheral nerve damage, fast acetylators risk hepatotoxicity. A low-activity enzyme usually means lowering the dose, as with TPMT and the thiopurines.",
  quote:"it's required to metabolize and break down succcinylcholine",
  cite:"PGx-Examples-Students-Fall-2026.pdf slides 'Butyrylcholinesterase (BChE)' (p. 18), 'N-acetyltransferase 2 (NAT2)' (p. 19); transcript 10/22"
}
);

// GAP4b — Exam 4 gap fill, two-step items (Dr. Smith). Hypersensitivity type plus treatment, drug interaction roles plus
// mechanism, toxicology applied to PGx/ADE/DDI (her 10/28 statement of the cumulative part), and Naranjo cases scored to a category.
// Sources: transcript 10/28 (and 10/22 for codeine), ADE-Lecture-Students-2026.pdf, DDI Lecture Students 2026 (1).pdf, the one-page
// Naranjo Algorithm, guide4.js, and for the toxicology side her Exam 3 poisoning table key and Treating Poisonings slides.
QUESTIONS.push(

/* ---------------- Hypersensitivity: presentation and timing -> type -> treatment ---------------- */
{id:"GAP4-101", lecture:"L22", prof:"Smith", tier:"new", topic:"L22", sub:"hypersens", skill:"apply", core:true, coreWhy:"her Exam 4 study list item 1 (ADE objective: hypersensitivity mechanisms, symptoms and basic treatments) and her spoken answer on treatment by type",
 concept:"hypersens-two-step-type1", tags:["smith","gap4"], source:"both",
 stem:"Within an hour of a drug dose, a patient has angioedema, pruritus and vomiting. Which hypersensitivity type is this, and what treatment fits it?",
 options:[
  {t:"Type I; antihistamines, then steroids", correct:true, why:"Minutes to hours after exposure with angioedema and pruritus is IgE mediated; her biggest bet for type I is antihistamines, then steroids."},
  {t:"Type IV; antihistamines, then steroids", correct:false, why:"Type IV is delayed and cell mediated, appearing days after exposure, and she gave steroids for the non-IgE types."},
  {t:"Type III; steroids, possibly more therapy", correct:false, why:"Type III is immune complex deposition 1 to 3 weeks after exposure, not within an hour."},
  {t:"Type II; antihistamines, then steroids", correct:false, why:"Type II is cytotoxic antibody against drug-coated cells, giving hemolytic anemia or other cytopenias."}],
 teach:"Timing is the key to the type. In type I, mediated by IgE (immunoglobulin E), the drug-IgE complex binds mast cells, which release histamine and other inflammatory mediators, so urticaria, angioedema, bronchospasm, pruritus, vomiting, diarrhea or anaphylaxis appear within minutes to hours. Histamine release is why her biggest bet for type I is antihistamines, followed by steroids.",
 quote:"If you've got an IGE type one mediated reaction. You know, probably your biggest bet would be antihistamines, right? And then steroids, OK.",
 cite:"ADE-Lecture-Students-2026.pdf slides 'Hypersensitivity Drug Reactions' (p. 26), 'Classification of hypersensitivity reactions' (p. 27; Gell and Coombs, Riedl and Casillas 2003 Table 2); transcript 10/28"},

{id:"GAP4-102", lecture:"L22", prof:"Smith", tier:"new", topic:"L22", sub:"hypersens", skill:"apply", core:true, coreWhy:"her Exam 4 study list item 1 (ADE objective: hypersensitivity mechanisms, symptoms and basic treatments) and her spoken answer on treatment by type",
 concept:"hypersens-two-step-type4", tags:["smith","gap4"], source:"both",
 stem:"Three days after a patient starts applying a topical drug, allergic contact dermatitis appears at the site. Which hypersensitivity type is this, and what treatment fits it?",
 options:[
  {t:"Type IV; steroids, possibly more therapy", correct:true, why:"Days after cutaneous exposure with contact dermatitis is delayed, cell-mediated type IV; for the non-IgE types she said steroids for sure."},
  {t:"Type I; antihistamines, then steroids", correct:false, why:"Type I appears within minutes to hours; this reaction appeared days later."},
  {t:"Type III; antihistamines, then steroids", correct:false, why:"Type III gives serum sickness 1 to 3 weeks after exposure, and antihistamines first is her type I answer."},
  {t:"Type IV; antihistamines alone, no steroids", correct:false, why:"The type is right, but steroids are her treatment for the non-IgE types."}],
 teach:"Type IV is delayed and cell mediated: drug molecules are presented by MHC (major histocompatibility complex) to T cells, which release cytokines and inflammatory mediators. That takes time, so allergic contact dermatitis or a maculopapular rash appears 2 to 7 days after cutaneous exposure. The reaction is not driven by IgE and histamine, and for these types she said steroids for sure.",
 quote:"Type 4 which is delayed and it's cell-mediated rather than IgE mediated, that can happen days after a drug react or after a drug exposure.",
 cite:"ADE-Lecture-Students-2026.pdf slide 'Classification of hypersensitivity reactions' (p. 27; Gell and Coombs, Riedl and Casillas 2003 Table 2); transcript 10/28"},

{id:"GAP4-103", lecture:"L22", prof:"Smith", tier:"new", topic:"L22", sub:"hypersens", skill:"apply", core:true, coreWhy:"her Exam 4 study list item 1 (ADE objective: hypersensitivity mechanisms, symptoms and basic treatments) and her spoken answer on treatment by type",
 concept:"hypersens-two-step-type3", tags:["smith","gap4"], source:"both",
 stem:"Two weeks after a course of anti-thymocyte globulin, a patient has fever, rash, arthralgias and glomerulonephritis. Which hypersensitivity type is this, and what treatment fits it?",
 options:[
  {t:"Type III; steroids, possibly more therapy", correct:true, why:"Serum sickness 1 to 3 weeks after exposure is immune complex type III; for the non-IgE types she said steroids for sure."},
  {t:"Type I; antihistamines, then steroids", correct:false, why:"Type I appears within minutes to hours, with urticaria, angioedema or anaphylaxis."},
  {t:"Type IV; antihistamines alone, no steroids", correct:false, why:"Type IV gives contact dermatitis 2 to 7 days after skin exposure, and steroids are her treatment for it."},
  {t:"Type II; no drug treatment is needed", correct:false, why:"Type II gives hemolytic anemia, neutropenia or thrombocytopenia; she did not say any type goes untreated."}],
 teach:"In type III (immune complex) reactions, drug-antibody complexes deposit in tissue and activate complement and inflammation, 1 to 3 weeks after exposure: serum sickness, fever, rash, arthralgias, lymphadenopathy, glomerulonephritis or vasculitis. Serum sickness from anti-thymocyte globulin is the table's example. It is not IgE mediated, so her answer is steroids, possibly with other therapies.",
 quote:"For your other kinds of reactions, steroids for sure. And um you might have to think about whether they need other therapies beyond that, OK.",
 note:"She spoke only to type I and type IV timing; the type III row (timing, signs, the anti-thymocyte globulin example) is from the tables she asked the class to remember (pp. 23, 27).",
 cite:"ADE-Lecture-Students-2026.pdf slides 'Immunologic reactions' (p. 23), 'Classification of hypersensitivity reactions' (p. 27; Gell and Coombs, Riedl and Casillas 2003 Table 2); transcript 10/28"},

{id:"GAP4-104", lecture:"L22", prof:"Smith", tier:"new", topic:"L22", sub:"hypersens", skill:"apply", core:true, coreWhy:"her Exam 4 study list item 1 (ADE objective: hypersensitivity mechanisms, symptoms and basic treatments) and her spoken answer on treatment by type",
 concept:"hypersens-two-step-type2", tags:["smith","gap4"], source:"both",
 stem:"A patient on penicillin develops hemolytic anemia, and immunoglobulin G (IgG) antibodies against the drug-coated red cells are found. Which hypersensitivity type is this, and what treatment fits it?",
 options:[
  {t:"Type II; steroids, possibly more therapy", correct:true, why:"IgG or IgM against drug-hapten coated cells is cytotoxic type II; for the non-IgE types she said steroids for sure."},
  {t:"Type I; antihistamines, then steroids", correct:false, why:"Type I is IgE on mast cells with histamine release, not antibody against red cells."},
  {t:"Type III; antihistamines alone, no steroids", correct:false, why:"Type III is drug-antibody complexes deposited in tissue (serum sickness), and antihistamines first is her type I answer."},
  {t:"Type IV; no drug treatment is needed", correct:false, why:"Type IV is T-cell mediated contact dermatitis or rash; she did not say any type goes untreated."}],
 teach:"In type II (cytotoxic) reactions, specific IgG or IgM antibodies are directed at cells coated with the drug as a hapten, so those cells are destroyed: hemolytic anemia, neutropenia or thrombocytopenia, with variable timing. Hemolytic anemia from penicillin is the table's example. It is not IgE and histamine driven, so her answer for it is steroids, possibly with other therapies.",
 quote:"For your other kinds of reactions, steroids for sure.",
 note:"She did not speak to type II; the mechanism, signs, timing and penicillin example are from the tables she asked the class to remember (pp. 23, 27). Hemolytic anemia after primaquine in G6PD deficiency is a different row: idiosyncratic, nonimmunologic.",
 cite:"ADE-Lecture-Students-2026.pdf slides 'Immunologic reactions' (p. 23), 'Classification of hypersensitivity reactions' (p. 27; Gell and Coombs, Riedl and Casillas 2003 Table 2); transcript 10/28"},

/* ---------------- Drug interactions: a pair -> precipitant/object -> mechanism and consequence ---------------- */
{id:"GAP4-105", lecture:"L22", prof:"Smith", tier:"new", topic:"L22", sub:"ddi-absorb", skill:"apply", core:true, coreWhy:"her Exam 4 study list item 1 (objectives): precipitant versus object and the PK subtypes; 'You do need to learn this table' (Table 18-1)",
 concept:"cholestyramine-levothyroxine-two-step", tags:["smith","gap4"], source:"both",
 stem:"A patient stable on levothyroxine starts cholestyramine and takes the two at the same time. Which drug is the precipitant, what kind of interaction is this, and what happens?",
 options:[
  {t:"Cholestyramine; adsorption; less levothyroxine absorbed", correct:true, why:"The added drug causes the interaction; levothyroxine sticks to cholestyramine in the gut and its bioavailability falls."},
  {t:"Levothyroxine; adsorption; less cholestyramine absorbed", correct:false, why:"Roles reversed: levothyroxine is the object drug affected by the interaction."},
  {t:"Cholestyramine; chelation; less levothyroxine absorbed", correct:false, why:"Complexation/chelation is the row for levofloxacin with calcium, magnesium, aluminum or iron salts."},
  {t:"Cholestyramine; enzyme induction; faster clearance", correct:false, why:"Table 18-1 lists cholestyramine under absorption interactions, not under metabolism."}],
 teach:"The precipitant is the drug, chemical or food causing the interaction; the object drug is the one affected, here the levothyroxine already at steady state. Table 18-1 lists cholestyramine under adsorption: digoxin or levothyroxine sticks to it by a loose bond, not a chemical bond. The drug held in the gut is not absorbed, so its bioavailability falls: a pharmacokinetic (PK) absorption interaction.",
 quote:"Remember, adsorption means, for example, your digoxin or levothyroxine is sticking to cholestyramine, OK? It's not chemically binding to it, really.",
 cite:"DDI Lecture Students 2026 (1).pdf slides 'Drug Interactions Introduction' (p. 5), 'Pharmacokinetic Interactions: Absorption' (p. 9, Table 18-1, Engelbrecht and Shargel); transcript 10/28"},

{id:"GAP4-106", lecture:"L22", prof:"Smith", tier:"new", topic:"L22", sub:"ddi-herb-food", skill:"apply", core:true, coreWhy:"her Exam 4 study list item 1 (objectives): precipitant versus object and PK versus PD interactions; ethanol and smoking as the most common chemical-drug interactions",
 concept:"ethanol-clozapine-two-step", tags:["smith","gap4"], source:"both",
 stem:"A patient stable on clozapine begins drinking ethanol regularly. Which is the precipitant, which process changes, and what happens to clozapine?",
 options:[
  {t:"Ethanol; metabolism (CYP1A2 induction); lower clozapine", correct:true, why:"Ethanol, a chemical, causes the interaction; it induces CYP1A2, which lowers clozapine levels."},
  {t:"Clozapine; metabolism (CYP1A2 induction); lower ethanol", correct:false, why:"Roles reversed: clozapine is the object drug whose levels change."},
  {t:"Ethanol; metabolism (CYP1A2 inhibition); higher clozapine", correct:false, why:"The slide says ethanol can induce CYP1A2, which lowers clozapine; inhibition would raise it."},
  {t:"Ethanol; pharmacodynamic; added CNS depression", correct:false, why:"Central nervous system (CNS) depression is not the listed effect; the slide gives ethanol's effect on clozapine as CYP1A2 induction, a pharmacokinetic change in metabolism."}],
 teach:"Smoking and ethanol are the most common chemical-drug interactions. Ethanol can increase or decrease the activity of hepatic drug-metabolizing enzymes; the slide says it can induce CYP1A2 and lower the levels of clozapine, cyclobenzaprine, imipramine and naproxen. Induction means more enzyme, faster metabolism and clearance, and lower levels of the object drug: a pharmacokinetic (PK) interaction.",
 quote:"but ethanol can also induce some of these other enzymes like 1A2 as well, and I'm pointing that out on the slide",
 cite:"DDI Lecture Students 2026 (1).pdf slides 'Drug Interactions Introduction' (p. 5), 'Pharmacokinetic Interactions Drug Elimination and Clearance' (p. 13), 'Chemical-Drug Interactions' (pp. 29-30); transcript 10/28"},

{id:"GAP4-107", lecture:"L22", prof:"Smith", tier:"new", topic:"L22", sub:"ddi-renal", skill:"apply", core:true, coreWhy:"her Exam 4 study list item 1 (objectives): precipitant versus object and the PK subtypes; her spoken up-or-down question on probenecid",
 concept:"probenecid-cephalosporin-two-step", tags:["smith","gap4"], source:"both",
 stem:"A patient on a cephalosporin antibiotic that is cleared by active tubular secretion is also given probenecid. Which is the precipitant, which renal process changes, and what happens to the antibiotic level?",
 options:[
  {t:"Probenecid; active secretion blocked; level rises", correct:true, why:"Probenecid uses the same transporter and blocks secretion of penicillin and some cephalosporins, so the antibiotic stays in the blood."},
  {t:"Cephalosporin; active secretion blocked; level rises", correct:false, why:"Roles reversed: the antibiotic is the object drug; probenecid causes the interaction."},
  {t:"Probenecid; GFR increased; level falls", correct:false, why:"Raising GFR and renal blood flow is the methylxanthine (caffeine) row."},
  {t:"Probenecid; urine alkalinized; level falls", correct:false, why:"Urine alkalinization is the antacid and sodium bicarbonate row."}],
 teach:"Table 18-4 lists four renal routes for a precipitant: GFR (glomerular filtration rate), tubular reabsorption, active secretion and nephrotoxicity. Probenecid blocks the active tubular secretion of penicillin and some cephalosporin antibiotics. Secretion is active transport through a transporter probenecid also uses, so less antibiotic is secreted and its blood level rises, which she said is good for fighting the infection.",
 quote:"Do the blood concentrations of the antibiotic go up or down? Up. Is that good for fighting an infection?",
 cite:"DDI Lecture Students 2026 (1).pdf slides 'Pharmacokinetic Interactions Drug Elimination and Clearance' (p. 16; p. 17, Table 18-4, Engelbrecht and Shargel), 'Benefits (!) of Drug-Drug Interactions' (p. 21); transcript 10/28"},

{id:"GAP4-108", lecture:"L22", prof:"Smith", tier:"new", topic:"L22", sub:"ddi-pd", skill:"apply", core:true, coreWhy:"her Exam 4 study list item 1 (objectives): precipitant versus object and PK versus PD interactions; the PD examples she said to remember",
 concept:"narcotic-antihistamine-two-step", tags:["smith","gap4"], source:"both",
 stem:"A patient stable on a narcotic pain medication starts an antihistamine and becomes very drowsy. Which is the precipitant, and is the interaction pharmacokinetic (PK) or pharmacodynamic (PD)?",
 options:[
  {t:"The antihistamine; PD, similar actions", correct:true, why:"The added antihistamine causes the interaction; both are CNS depressants, so their similar actions increase CNS depression."},
  {t:"The narcotic; PD, similar actions", correct:false, why:"The narcotic was already at steady state; it is the object drug."},
  {t:"The antihistamine; PK, enzyme inhibition", correct:false, why:"The slide gives no change in handling for this pair; the drowsiness comes from added effects at the CNS."},
  {t:"The antihistamine; PD, opposite actions", correct:false, why:"Opposite actions cancel each other (propranolol with adrenaline, naloxone with a narcotic); here the effects add up."}],
 teach:"The precipitant is the drug that comes on board and causes the interaction; the object drug is the one already at steady state. A pharmacodynamic interaction changes the effect of the drug, not its absorption, distribution, metabolism or excretion. Narcotics and antihistamines are both central nervous system (CNS) depressants, so their similar actions give increased CNS depression: drowsiness.",
 quote:"The precipitant drug is the drug, or the chemical, or the food substance that's causing the interaction. OK, so it's the bad guy",
 cite:"DDI Lecture Students 2026 (1).pdf slides 'Drug Interactions Introduction' (pp. 5-7), 'Pharmacodynamic Interactions Examples' (p. 19); transcript 10/28"},

/* ---------------- Cumulative: toxicology applied to PGx, ADEs and drug interactions (her 10/28 statement) ---------------- */
{id:"GAP4-109", lecture:"L22", prof:"Smith", tier:"new", topic:"L22", sub:"ddi-renal", skill:"apply", core:true, coreWhy:"her 10/28 statement: the cumulative part applies toxicology to pharmacogenomics, adverse drug events and drug interactions; she tied this row to toxicology",
 concept:"salicylate-bicarbonate-as-ddi", tags:["smith","gap4"], source:"both",
 stem:"In a salicylate poisoning, sodium bicarbonate is given to alkalinize the urine. Seen as a drug interaction, which is the precipitant, which renal process changes, and what happens to salicylate clearance?",
 options:[
  {t:"Bicarbonate; less tubular reabsorption; clearance rises", correct:true, why:"Alkaline urine ionizes the mildly acidic salicylate; the ionized drug is not reabsorbed and is trapped in the urine."},
  {t:"Salicylate; less tubular reabsorption; clearance rises", correct:false, why:"Roles reversed: the salicylate is the object, the poison whose clearance changes."},
  {t:"Bicarbonate; more tubular reabsorption; clearance falls", correct:false, why:"That is the direction Table 18-4 gives for amphetamine, not for salicylate."},
  {t:"Bicarbonate; active secretion blocked; clearance falls", correct:false, why:"Blocking active secretion is the probenecid row."}],
 teach:"Table 18-4 lists antacids and sodium bicarbonate as precipitants that change tubular reabsorption through urine pH. Salicylate is a mild acid, so alkaline urine ionizes it; the ionized form is not reabsorbed and is ion trapped in the urine, so its clearance rises. In toxicology this is bicarbonate for salicylates, enhancing elimination; for amphetamine the same change raises reabsorption.",
 quote:"We talked about alkalization of the urine. To increase the ionization of things like salicylates, so your mildly acidic poisoning poisons, if we will alkalinize and use it. Alkalinize the urine using sodium bicarb, we're gonna ion trap, right?",
 note:"L22-070 asks only what happens to the salicylate; this item adds the precipitant and the renal process.",
 cite:"DDI Lecture Students 2026 (1).pdf slides 'Drug Interactions Introduction' (p. 5), 'Pharmacokinetic Interactions Drug Elimination and Clearance' (p. 16; p. 17, Table 18-4); PoisoningTreatmentTable2026KEY.pdf, salicylates row (Exam 3); transcript 10/28"},

{id:"GAP4-110", lecture:"L22", prof:"Smith", tier:"new", topic:"L22", sub:"ddi-absorb", skill:"apply", core:true, coreWhy:"her 10/28 statement: the cumulative part applies toxicology to pharmacogenomics, adverse drug events and drug interactions; activated charcoal is a row of the table she said to learn",
 concept:"activated-charcoal-as-adsorption-ddi", tags:["smith","gap4"], source:"both",
 stem:"In the hospital, a patient who swallowed a toxic amount of a drug that sticks to charcoal is given activated charcoal. Seen as a drug interaction, is it pharmacokinetic (PK) or pharmacodynamic (PD), and what is the effect on the swallowed drug?",
 options:[
  {t:"PK absorption: adsorption; lower bioavailability", correct:true, why:"Table 18-1 lists activated charcoal under adsorption, with decreased bioavailability of many drugs."},
  {t:"PK absorption: complexation; lower bioavailability", correct:false, why:"Complexation/chelation is the divalent cation row with levofloxacin; charcoal is in the adsorption rows."},
  {t:"PK elimination: enzyme induction; faster metabolism", correct:false, why:"Charcoal acts in the gut before absorption; it does not change the enzymes that metabolize the drug."},
  {t:"PD: opposite effects at the same target", correct:false, why:"That is naloxone with a narcotic; charcoal changes how much drug is absorbed, not its effect at a target."}],
 teach:"She approached drug interactions from a kinetic and a dynamic angle, as for treating poisonings. Activated charcoal is a kinetic treatment that prevents absorption: the poison sticks to the charcoal and leaves in the feces. Table 18-1 lists it under adsorption, the looser binding also seen with cholestyramine, with decreased bioavailability of many drugs: a pharmacokinetic (PK) absorption interaction.",
 quote:"Remember we did that for treating toxic poisonings, right? A kinetic versus a dynamic approach. Same thing here.",
 note:"She did not name activated charcoal aloud on 10/28; it is a row of Table 18-1, which she said must be learned, and its use to prevent absorption is from the Exam 3 Treating Poisonings material.",
 cite:"DDI Lecture Students 2026 (1).pdf slides 'Introduction' (p. 4), 'Pharmacokinetic Interactions: Absorption' (p. 9, Table 18-1, Engelbrecht and Shargel); Treating Poisonings Students Fall 2026 WCAG2,1A_pptx.pdf slide 'Toxicokinetic-Based Treatment Prevent Absorption' (Exam 3); transcript 10/28"},

{id:"GAP4-111", lecture:"L22", prof:"Smith", tier:"new", topic:"L22", sub:"ddi-pd", skill:"apply", core:true, coreWhy:"her 10/28 statement: the cumulative part applies toxicology to pharmacogenomics, adverse drug events and drug interactions; the codeine ultrarapid metabolizer case and the naloxone row",
 concept:"codeine-um-naloxone-pd-same-target", tags:["smith","gap4"], source:"both",
 stem:"A child who is a CYP2D6 ultrarapid metabolizer gets a normal dose of codeine, makes too much morphine, and has suppressed breathing. Naloxone is given. Which pharmacodynamic (PD) or pharmacokinetic (PK) category describes naloxone with the opioid?",
 options:[
  {t:"PD: opposite effects at the same target", correct:true, why:"Naloxone and the narcotic act at the same receptor and cancel each other; the slide's result is ineffectiveness of narcotics."},
  {t:"PD: opposite effects at different receptors", correct:false, why:"Different receptors is propranolol with adrenaline: adrenaline's vasopressor action is at alpha-1, propranolol blocks beta."},
  {t:"PK: naloxone induces morphine metabolism", correct:false, why:"Naloxone is a competitive antagonist of opioid receptors; it does not change how morphine is handled."},
  {t:"PD: adverse effect increasing sensitivity", correct:false, why:"That row is a precipitant making the patient more sensitive, as with potassium-wasting diuretics and digoxin."}],
 teach:"Codeine is activated by CYP2D6 to morphine, so an ultrarapid metabolizer turns a normal dose into a large amount of morphine and breathing is suppressed. Naloxone, the antidote, is a competitive antagonist of opioid receptors. On the drug interaction slide, naloxone with a narcotic is the opposite-effects-at-the-same-target pair: in a pain patient that means therapeutic failure, in an overdose it is the treatment.",
 quote:"you've got opposite pharmacodynamics at the same target, so naloxone with nar uh a narcotic pain medication, right? They're hitting the same receptor, canceling each other out.",
 note:"The codeine ultrarapid metabolizer case is from 10/22 (L19-018, L19-055); naloxone as the opioid antidote is from her Exam 3 poisoning table key.",
 cite:"DDI Lecture Students 2026 (1).pdf slides 'Drug Interactions Introduction' (p. 7), 'Pharmacodynamic Interactions Examples' (p. 20); PGx-Examples-Students-Fall-2026.pdf slide 'CYP2D6 Polymorphisms 3' (p. 22); PoisoningTreatmentTable2026KEY.pdf, opioids row (Exam 3); transcript 10/22; transcript 10/28"},

/* ---------------- Naranjo: score a short case and pick the category ---------------- */
{id:"GAP4-112", lecture:"L22", prof:"Smith", tier:"new", topic:"L22", sub:"naranjo", skill:"apply", readingId:"naranjo", core:true, coreWhy:"her Exam 4 study list item 5 (Naranjo) and her scoring warning",
 concept:"naranjo-case-possible-q5-yes", tags:["smith","gap4"], source:"both",
 stem:"Naranjo scoring: no previous reports of the reaction (Q1 no); it appeared after the drug was started (Q2 yes); it improved when the drug was stopped (Q3 yes); the drug was not given again (Q4 do not know); another drug the patient takes could on its own explain it (Q5 yes); no placebo was given (Q6 do not know); no drug level was measured (Q7 do not know); the dose was never changed (Q8 no); no previous similar reaction (Q9 no); no objective evidence (Q10 no). What is the total and its category?",
 options:[
  {t:"2; possible", correct:true, why:"0 + 2 + 1 + 0 - 1 + 0 + 0 + 0 + 0 + 0 = 2, in the 1-4 possible band."},
  {t:"5; probable", correct:false, why:"Scores Q5 yes as +2; Q5 is reversed, so another possible cause is -1."},
  {t:"3; possible", correct:false, why:"Scores Q5 yes as 0; a yes on Q5 is -1."},
  {t:"1; possible", correct:false, why:"Scores Q2 yes as +1; a yes on Q2 is +2."}],
 teach:"Score each answer from its own row: Q1 no 0; Q2 yes +2; Q3 yes +1; Q4 do not know 0; Q5 yes -1; Q6 do not know 0; Q7 do not know 0; Q8 no 0; Q9 no 0; Q10 no 0. Total 2, which is possible (1-4): the drug appears to be associated. Q5 is the reversed row, where a yes, another cause that could explain the reaction, takes a point away.",
 quote:"Pay attention to the fact that, uh, sometimes a yes is 2 points, sometimes it's 1 point, sometimes a no is negative.",
 cite:"Naranjo Algorithm (one page), questions 1-10 and total score; ADE-Lecture-Students-2026.pdf slide 'Causality of Adverse Drug Reactions' (p. 21); transcript 10/28"},

{id:"GAP4-113", lecture:"L22", prof:"Smith", tier:"new", topic:"L22", sub:"naranjo", skill:"apply", readingId:"naranjo", core:true, coreWhy:"her Exam 4 study list item 5 (Naranjo) and her scoring warning",
 concept:"naranjo-case-probable-toxic-level", tags:["smith","gap4"], source:"both",
 stem:"Naranjo scoring: previous conclusive reports exist (Q1 yes); the reaction appeared after the drug was started (Q2 yes); it improved when the drug was stopped (Q3 yes); the drug was not given again (Q4 do not know); other causes were not looked into (Q5 do not know); no placebo was given (Q6 do not know); the blood level was in a range known to be toxic (Q7 yes); the reaction was less severe when the dose was decreased (Q8 yes); no previous exposure is known (Q9 do not know); a lab test confirmed the reaction (Q10 yes). What is the total and its category?",
 options:[
  {t:"7; probable", correct:true, why:"1 + 2 + 1 + 0 + 0 + 0 + 1 + 1 + 0 + 1 = 7, in the 5-8 probable band."},
  {t:"5; probable", correct:false, why:"Leaves out Q7 and Q8; a toxic blood level and a dose-response each add +1."},
  {t:"8; probable", correct:false, why:"Scores Q7 yes as +2; a toxic drug level adds +1."},
  {t:"9; definite", correct:false, why:"Scores do not know on Q4 and Q5 as +1 each; do not know is always 0."}],
 teach:"Score each answer from its own row: Q1 yes +1; Q2 yes +2; Q3 yes +1; Q4, Q5 and Q6 do not know 0 each; Q7 yes +1 (drug detected at a concentration known to be toxic); Q8 yes +1 (less severe at a lower dose); Q9 do not know 0; Q10 yes +1. Total 7, probable (5-8): the drug is the apparent cause. The do not know answers on Q4 (re-challenge) and Q5 (other causes) keep it below definite.",
 quote:"remember, a large part of the Neuronjo algorithm is timing.",
 cite:"Naranjo Algorithm (one page), questions 1-10 and total score; ADE-Lecture-Students-2026.pdf slide 'Causality of Adverse Drug Reactions' (p. 21); transcript 10/28"},

{id:"GAP4-114", lecture:"L22", prof:"Smith", tier:"new", topic:"L22", sub:"naranjo", skill:"apply", readingId:"naranjo", core:true, coreWhy:"her Exam 4 study list item 5 (Naranjo) and her scoring warning",
 concept:"naranjo-case-probable-q4-no", tags:["smith","gap4"], source:"both",
 stem:"Naranjo scoring: previous conclusive reports exist (Q1 yes); the reaction appeared after the drug was started (Q2 yes); it improved when the drug was stopped (Q3 yes); when the drug was given again, the reaction did not reappear (Q4 no); no other cause or drug could on its own explain it (Q5 no); Q6 to Q10 are all answered do not know. What is the total and its category?",
 options:[
  {t:"5; probable", correct:true, why:"1 + 2 + 1 - 1 + 2 = 5, the lowest score in the 5-8 probable band."},
  {t:"6; probable", correct:false, why:"Scores Q4 no as 0; re-given with no reappearance is -1."},
  {t:"3; possible", correct:false, why:"Scores Q5 no as 0; a no on Q5 (no alternative cause) is +2."},
  {t:"4; possible", correct:false, why:"Leaves out the +1 for improvement when the drug was stopped (Q3 yes)."}],
 teach:"Score each answer from its own row: Q1 yes +1; Q2 yes +2; Q3 yes +1; Q4 no -1, because the reaction did not come back when the drug was re-given; Q5 no +2, a reversed row where no means no other cause; Q6 to Q10 do not know 0 each. Total 5, the bottom of probable (5-8): the drug is the apparent cause. Without the -1 on Q4 the total would still be probable, at 6.",
 quote:"So make sure that you are scoring the responses appropriately with this algorithm",
 cite:"Naranjo Algorithm (one page), questions 1-10 and total score; ADE-Lecture-Students-2026.pdf slide 'Causality of Adverse Drug Reactions' (p. 21); transcript 10/28"}

);
