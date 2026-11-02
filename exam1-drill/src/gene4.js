// Exam 4 gene cards for the Reference tables (what each gene product normally does, what the variant changes, what it is confused with).
// Exam 4 per-gene cards for the Reference tables ref4-l19-1, ref4-l19-2 and ref4-l20-1 (PHAR 4344, Dr. Helen E. Smith).
const GENES4 = {
  "BChE": {
    name: "Butyrylcholinesterase",
    kind: "metabolizing enzyme",
    normal: "BChE hydrolyzes succinylcholine, the short-acting muscle relaxant used in anesthesia; its activity is required to degrade succinylcholine. In extensive metabolizers the succinylcholine half-life is about 2 minutes.",
    variant: "Slow metabolizers (about 1 in 3000) have a succinylcholine half-life of 2 to 3 hours. The paralysis lasts much longer, including paralysis of the diaphragm; her slides name no molecular variant type.",
    drugs: ["Succinylcholine"],
    tell: "Confused with NAT2, the other first-discovered poor-metabolizer enzyme: BChE hydrolyzes succinylcholine, while NAT2 acetylates isoniazid and procainamide.",
    fig: "v4-L19-bche-succinylcholine",
    src: "PGx-Examples-Students-Fall-2026.pdf slides 'Variations in Drug Metabolizing Enzymes 2' (p. 13) and 'Butyrylcholinesterase (BChE)' (p. 18); transcript 10/22"
  },
  "NAT2": {
    name: "N-acetyltransferase 2",
    kind: "metabolizing enzyme",
    normal: "NAT2 is a genetically polymorphic phase II enzyme that catalyzes the acetylation of isoniazid (used to treat tuberculosis); procainamide is also affected by NAT2 phenotype.",
    variant: "Patients are slow or fast acetylators (Caucasian 30-45% fast; Japanese 10% slow; Middle East 80% slow). Slow acetylators get isoniazid-induced peripheral nerve damage and procainamide-induced lupus; fast acetylators get isoniazid-induced hepatotoxicity.",
    drugs: ["Isoniazid", "Procainamide"],
    tell: "Confused with BChE: NAT2 acetylates isoniazid and both of its phenotypes (slow and fast) carry a drug risk, while BChE hydrolyzes succinylcholine and only the slow phenotype is the problem.",
    fig: "v4-L19-nat2-acetylators",
    src: "PGx-Examples-Students-Fall-2026.pdf slide 'N-acetyltransferase 2 (NAT2)' (p. 19); transcript 10/22"
  },
  "CYP2D6": {
    name: "Cytochrome P450 2D6",
    kind: "metabolizing enzyme",
    normal: "CYP2D6 contributes to the metabolism of 15-25% of all medications used. It metabolizes codeine, a prodrug, to morphine.",
    variant: "CYP2D6*5 is a whole gene deletion (*5/*5 is a poor metabolizer: active drugs accumulate and prodrugs fail), *3, *4 and *6 are nonfunctional and *10, *17 and *41 have reduced function. CYP2D6*2xN is a copy number variant (extra gene copies) that makes an ultrarapid metabolizer; on codeine this gives morphine excess and respiratory depression.",
    drugs: ["Codeine", "SSRIs", "Tamoxifen", "Beta blockers"],
    tell: "Confused with CYP2C19: CYP2D6*2 is fully functional and the CYP2D6 ultrarapid metabolizer comes from extra gene copies (*2xN), while CYP2C19*2 is inactive and the CYP2C19 increased-function allele is the *17 promoter variant.",
    fig: "v4-L18-cyp2d6-copies",
    src: "PGx-Examples-Students-Fall-2026.pdf slides 'CYP2D6 Polymorphisms' 1-3 (pp. 20-22); Intro to PGx Lecture Students Fall 2026.pdf slides 'Gene Deletion CYP2D6' (p. 39) and 'Copy Number Variant CYP2D6' (p. 40); transcripts 10/21 and 10/22"
  },
  "CYP2C9": {
    name: "Cytochrome P450 2C9",
    kind: "metabolizing enzyme",
    normal: "CYP2C9 metabolizes many narrow therapeutic index drugs: warfarin, tolbutamide, phenytoin and glipizide. It clears S-warfarin, the more potent enantiomer, to inactive 7-OH warfarin.",
    variant: "CYP2C9*2 has about 20% and CYP2C9*3 about 5% of wild-type activity; *3 homozygotes have about 90% lower S-warfarin clearance than *1 homozygotes. Carriers need a lower warfarin dose (lowest-dose patients under 1.5 mg/day, against the usual 5 mg/day).",
    drugs: ["Warfarin", "Phenytoin", "Glipizide", "Tolbutamide"],
    tell: "Confused with CYP2C19: CYP2C9*2 and *3 reduce activity, while CYP2C19*2 and *3 make no active enzyme.",
    fig: "v4-L19-cyp2c9-warfarin",
    src: "PGx-Examples-Students-Fall-2026.pdf slides 'CYP2C9 Polymorphisms' 1-2 (pp. 23-24) and 'Integrated: Both PK and PD' (p. 57); transcripts 10/22 and 10/26"
  },
  "CYP2C19": {
    name: "Cytochrome P450 2C19",
    kind: "metabolizing enzyme",
    normal: "CYP2C19 metabolizes acidic medications: proton pump inhibitors, fluoxetine, sertraline and diazepam. It is involved in both steps that activate the prodrug clopidogrel to its active thiol metabolite (about 15% of the dose).",
    variant: "CYP2C19*2 and *3 are premature stop codon variants that make a short, nonfunctional protein; poor metabolizers clear PPIs, SSRIs and diazepam slowly and activate too little clopidogrel. CYP2C19*17 is a promoter variant that increases expression and function.",
    drugs: ["Proton pump inhibitors", "Fluoxetine", "Sertraline", "Diazepam", "Clopidogrel"],
    tell: "Confused with CYP2C9: CYP2C19*2 and *3 make no active enzyme, while CYP2C9*2 and *3 only reduce activity.",
    fig: "v4-L19-cyp2c19-alleles",
    src: "PGx-Examples-Students-Fall-2026.pdf slides 'Variations in Drug Metabolizing Enzymes 4' (p. 15) and 'CYP2C19 Polymorphisms' 1-4 (pp. 25-28); transcripts 10/21 and 10/22"
  },
  "DPYD": {
    name: "Dihydropyrimidine dehydrogenase (DPD)",
    kind: "metabolizing enzyme",
    normal: "DPD catabolizes about 80% of a dose of 5-fluorouracil, capecitabine or tegafur to products excreted in urine. Only 1-3% of the dose becomes the active cytotoxic metabolites that inhibit DNA synthesis.",
    variant: "Low-activity DPYD variants (not yet well characterized) give low clearance of the parent drugs and their active metabolites. The result can be significant myelosuppression, mucositis, neurotoxicity, hand-foot syndrome and diarrhea.",
    drugs: ["5-fluorouracil", "Capecitabine", "Tegafur"],
    tell: "Confused with UGT1A1: DPD breaks down the parent drug 5-fluorouracil, while UGT1A1 clears SN-38, the active metabolite of irinotecan.",
    fig: "v4-L19-dpd-5fu",
    src: "PGx-Examples-Students-Fall-2026.pdf slide 'Dihydropyrimidine Dehydrogenase (DPD)' (p. 29); transcript 10/22"
  },
  "UGT1A1": {
    name: "UDP-glucuronosyltransferase 1A1",
    kind: "metabolizing enzyme",
    normal: "UGT1A1 glucuronidates SN-38, the active metabolite of irinotecan, and so clears it.",
    variant: "UGT1A1*28 is a promoter region variant that reduces the transcription rate and lowers glucuronidation activity. SN-38 levels rise, causing toxicity such as bone marrow suppression.",
    drugs: ["Irinotecan (active metabolite SN-38)"],
    tell: "Confused with CYP2C19*17, the other promoter variant: CYP2C19*17 increases expression, while UGT1A1*28 decreases it.",
    fig: "v4-L19-irinotecan-ugt1a1",
    src: "PGx-Examples-Students-Fall-2026.pdf slide 'UDP-Glucuronosyl-transferase (UGT1A1)' (p. 30); transcript 10/22"
  },
  "TPMT": {
    name: "Thiopurine methyltransferase",
    kind: "metabolizing enzyme",
    normal: "TPMT methylates 6-mercaptopurine (the product of the prodrug azathioprine) to an inactive methylated product. This diverts drug away from the pathway that makes the active 6-thioguanine nucleotides.",
    variant: "TPMT*3A (two nonsynonymous SNPs on one allele; Caucasians, about 5% heterozygous and 1 in 300 homozygous) and TPMT*3C (one cSNP; East Asians) inactivate the enzyme, so more drug becomes 6-thioguanine nucleotides and standard doses cause myelosuppression. Homozygous deficient patients tolerate under 10% of the dose and heterozygous patients about 35%.",
    drugs: ["Azathioprine", "6-mercaptopurine"],
    tell: "Confused with DPYD: both low-activity variants cause myelosuppression, but TPMT acts on the thiopurines (azathioprine, 6-mercaptopurine) and DPD on the fluoropyrimidines (5-fluorouracil, capecitabine).",
    fig: "v4-L19-tpmt-thiopurine",
    src: "PGx-Examples-Students-Fall-2026.pdf slides 'Thiopurine Methyltransferase (TPMT)' 1-5 (pp. 31-35); transcripts 10/22 and 10/26"
  },
  "ABCB1": {
    name: "P-glycoprotein (P-gp; ABCB1 is also called the multidrug resistance-1 [MDR1] gene)",
    kind: "transporter",
    normal: "P-glycoprotein transports substances out of cells. Increased intestinal expression can limit drug absorption, and it affects the distribution of digoxin, cyclosporine, tacrolimus and antiretroviral protease inhibitors.",
    variant: "Common SNPs are in exons 12 (C1236T), 21 (G2677T) and 26 (C3435T, a synonymous SNP); the exon 21 and 26 SNPs are associated with intestinal ABCB1 expression, P-gp activity and digoxin plasma concentrations, and the exon 26 SNP with protease inhibitor concentrations and effects. Decreased P-gp expression may result in supratherapeutic plasma concentrations.",
    drugs: ["Digoxin", "Cyclosporine", "Tacrolimus", "Protease inhibitors"],
    tell: "Confused with SLCO1B1: P-gp pumps drug out of cells (in the gut it limits absorption), while OATP1B1 takes drug up into the liver across the hepatocyte sinusoidal membrane.",
    fig: "v4-L20-pgp-efflux",
    src: "PGx-Examples-Students-Fall-2026.pdf slides 'Variations in Drug Transporting Genes' (p. 40) and 'P-Glycoprotein' 1-2 (pp. 45-46); transcript 10/26"
  },
  "SLCO1B1": {
    name: "Organic anion transporter OATP1B1",
    kind: "transporter",
    normal: "OATP1B1 sits on the hepatocyte sinusoidal membrane and carries out hepatic uptake of weakly acidic drugs and endogenous compounds, including statins, methotrexate and bilirubin.",
    variant: "SLCO1B1*5 (rs4149056, 521T>C, Val174Ala; about 1%) and the haplotypes *15 and *17 that contain rs4149056 (5-15% of European and Asian people) have reduced function. Homozygous patients have a 221% increase in simvastatin plasma AUC, so a lower simvastatin dose or an alternative statin is recommended with at least one nonfunctional allele.",
    drugs: ["Simvastatin (statins)", "Methotrexate"],
    tell: "Confused with ABCB1: OATP1B1 is an uptake transporter in the liver, while P-glycoprotein is an efflux transporter that limits absorption from the gut.",
    fig: "v4-L20-slco1b1-statin",
    src: "PGx-Examples-Students-Fall-2026.pdf slide 'Organic anion transporter' (p. 47); transcript 10/26"
  },
  "ADRB1": {
    name: "Beta-1 receptor",
    kind: "drug target (receptor)",
    normal: "Not described on her slides. The beta-1 receptor is the target that metoprolol and other beta blockers bind.",
    variant: "Two non-synonymous SNPs, Ser49Gly and Arg389Gly, change the receptor. Hypertensive patients homozygous for Ser49 and Arg389 (the wild type) had a better response to metoprolol, so genotype may help decide which drug to start.",
    drugs: ["Metoprolol", "Beta blockers"],
    tell: "Confused with ADRB2: Ser49Gly and Arg389Gly are in ADRB1 (metoprolol response), while Arg16Gly is in ADRB2 (beta-2 agonist response).",
    fig: "v4-L20-adrb1-metoprolol",
    src: "PGx-Examples-Students-Fall-2026.pdf slide 'Variations of Drug Targets: Receptors' (p. 50); transcript 10/26"
  },
  "ADRB2": {
    name: "Beta-2 receptor (beta-2 adrenergic receptor)",
    kind: "drug target (receptor)",
    normal: "Not described on her slides. The beta-2 receptor is the target of beta-2 agonists such as albuterol, used for asthma.",
    variant: "More than 11 SNPs are known; three are frequent and nonsynonymous: Arg16Gly and codon 27 in the coding block and one upstream in the promoter. Studies of Arg16Gly and response to beta-2 agonists had unclear results, more studies are needed, and genotyping is not likely to result.",
    drugs: ["Beta-2 agonists (albuterol)"],
    tell: "Confused with ADRB1: Arg16Gly is in ADRB2 with unclear effects on beta-2 agonist response, while Ser49Gly and Arg389Gly are in ADRB1 and do change metoprolol response.",
    fig: "tps2-table",
    src: "PGx-Examples-Students-Fall-2026.pdf slides 'Variations of Drug Targets: Receptors 2-3' (pp. 51-52); transcript 10/26"
  },
  "EGFR": {
    name: "Epidermal growth factor receptor (EGFR, also called HER1 or ErbB1)",
    kind: "drug target (receptor)",
    normal: "EGFR is a receptor expressed on the surface of many cells. When the body's epidermal growth factor binds it, the normal signal is for the cell to divide.",
    variant: "In non-small cell lung cancer a gain-of-function mutation makes the receptor overexpressed or overactive, which drives tumor growth. Response to the EGFR inhibitor gefitinib was strongly influenced by this mutation, so the drug is used only when the tumor has the variant EGFR.",
    drugs: ["Gefitinib"],
    tell: "Confused with HER2, which the trastuzumab label calls structurally related to the epidermal growth factor receptor: the gene tested for gefitinib is EGFR, and the gene tested for trastuzumab is HER2.",
    fig: "v4-L20-egfr-gefitinib",
    src: "PGx-Examples-Students-Fall-2026.pdf slide 'Variations of Drug Targets: Receptors 4' (p. 53); transcript 10/26"
  },
  "ALOX5": {
    name: "5-lipoxygenase",
    kind: "drug target (enzyme)",
    normal: "Not described on her slides. 5-lipoxygenase is the enzyme that 5-lipoxygenase inhibitors, used in asthma, block.",
    variant: "The ALOX5 promoter has a tandem repeat variation, and the 5-repeat allele is thought to increase expression. Only subjects with at least one 5-repeat allele responded to 5-lipoxygenase inhibitors, and the repeat has no apparent relationship to asthma severity.",
    drugs: ["5-lipoxygenase inhibitors (asthma)"],
    tell: "Confused with ACE, the other drug-target enzyme: the ALOX5 promoter tandem repeat changes response to the inhibitor drugs, while the ACE intron 16 insertion/deletion probably predicts adverse reactions, not efficacy.",
    fig: "v4-L20-alox5-repeat",
    src: "PGx-Examples-Students-Fall-2026.pdf slide 'Variations of Drug Targets: Enzymes' (p. 55); transcript 10/26"
  },
  "ACE": {
    name: "Angiotensin-converting enzyme",
    kind: "drug target (enzyme)",
    normal: "ACE converts angiotensin I to angiotensin II, a potent vasoconstrictor. ACE inhibitors are commonly prescribed antihypertensive drugs.",
    variant: "The ACE gene has an insertion/deletion variant in intron 16 that is associated with plasma ACE concentrations. It is not known to predict ACE inhibitor efficacy, but it probably predicts adverse reactions: persistent cough (about 10% of patients) and possibly angioedema (0.1-0.2%).",
    drugs: ["ACE inhibitors"],
    tell: "Confused with ALOX5: the ACE variant is an insertion/deletion in intron 16 tied to adverse reactions, while the ALOX5 variant is a promoter tandem repeat tied to drug response.",
    fig: "v4-L20-ace-indel",
    src: "PGx-Examples-Students-Fall-2026.pdf slide 'Variations of Drug Targets: Enzymes 2' (p. 56); transcript 10/26"
  },
  "VKORC1": {
    name: "Vitamin K epoxide reductase (VKORC1)",
    kind: "warfarin pathway",
    normal: "Vitamin K epoxide reductase reduces inactive vitamin K (the epoxide) back to active vitamin K, which is needed to make functional clotting factors. It is the target that warfarin inhibits (the pharmacodynamic gene).",
    variant: "VKORC1 haplotypes, including -1639G>A, have low activity (-1639G>A reduces VKORC1 expression) and increase warfarin sensitivity. A less active target needs less drug, so the warfarin dose is lowered.",
    drugs: ["Warfarin"],
    tell: "Confused with CYP2C9: VKORC1 is the warfarin target (PD), while CYP2C9 clears S-warfarin (PK); low activity in either lowers the dose.",
    fig: "v4-L21-vkorc1",
    src: "PGx-Examples-Students-Fall-2026.pdf slides 'Integrated: Both PK and PD' 1-2 (pp. 57-58); CPIC warfarin guideline 2017; transcripts 10/26 and 10/27"
  },
  "CYP4F2": {
    name: "Cytochrome P450 4F2",
    kind: "warfarin pathway",
    normal: "CYP4F2 metabolizes reduced (active) vitamin K to an inactive form, which removes some of warfarin's antidote.",
    variant: "CYP4F2*3 gives less inactivation of reduced vitamin K, so active vitamin K rises and more warfarin is needed. The CPIC algorithm increases the dose 5-10% when CYP4F2*3 is detected in non-African patients.",
    drugs: ["Warfarin"],
    tell: "Confused with VKORC1: low-activity VKORC1 lowers the warfarin dose, while low-activity CYP4F2 raises it; CYP4F2 acts on vitamin K, not on warfarin.",
    fig: "v4-L21-cyp4f2",
    src: "PGx-Examples-Students-Fall-2026.pdf slide 'Integrated: Both PK and PD 2' (p. 58); CPIC warfarin guideline 2017, Figure 2; transcripts 10/26 and 10/27"
  },
  "HLA-B": {
    name: "HLA-B molecule (an HLA antigen-presenting receptor)",
    kind: "immune (HLA)",
    normal: "HLA molecules are receptors on antigen-presenting cells. They present antigen to T cells to start an immune response.",
    variant: "A variant may change the antigen-binding site so the HLA molecule recognizes peptides that are not true antigens and starts an immune reaction. HLA-B*15:02 raises the risk of SJS/TEN with carbamazepine (screen at-risk ancestry; avoid unless the benefit clearly outweighs the risk), and HLA-B*57:01 raises the risk of a multi-organ hypersensitivity reaction with abacavir (screen every patient; contraindicated if positive).",
    drugs: ["Carbamazepine", "Abacavir"],
    tell: "Confused with HLA-A: both HLA-B*15:02 and HLA-A*31:01 go with carbamazepine, but only HLA-B carries the abacavir variant (*57:01) and the carbamazepine boxed warning (*15:02).",
    fig: "v4-L21-hla",
    src: "PGx-Examples-Students-Fall-2026.pdf slides 'Variations in Immune System Function' 1-2 (pp. 59-60, Katzung Table 5-4); Tegretol (carbamazepine) and Ziagen (abacavir) labels; transcripts 10/26 and 10/27"
  },
  "HLA-A": {
    name: "HLA-A molecule (an HLA antigen-presenting receptor)",
    kind: "immune (HLA)",
    normal: "HLA molecules are receptors on antigen-presenting cells. They present antigen to T cells to start an immune response.",
    variant: "HLA-A*31:01 (printed HLA-A*3101), an inherited variant added to the carbamazepine label in the 2017 revision, has a moderate association with hypersensitivity reactions (she described a skin reaction). If a patient is positive, weigh the risks and benefits before using carbamazepine.",
    drugs: ["Carbamazepine"],
    tell: "Confused with HLA-B*15:02: both go with carbamazepine, but HLA-B*15:02 carries the boxed warning for SJS/TEN with ancestry-based screening, while HLA-A*31:01 has a moderate association and a weigh-risks-and-benefits recommendation.",
    fig: "v4-L21-hla-screen",
    src: "Tegretol (carbamazepine) label, Warnings (Hypersensitivity Reactions and HLA-A*3101 Allele); her drug-label worksheet; transcript 10/27"
  }
};
