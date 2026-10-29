const REFERENCE4_HTML = `
<p class="sub">Deck files: Intro to PGx Lecture Students Fall 2026.pdf (Intro) and PGx-Examples-Students-Fall-2026.pdf (Examples), by page. T = transcript date.</p>
<h3 id="ref4-l18-1">Day 18: the variant examples (gene, variant, type, effect, drugs)</h3>
<table class="reftab"><thead><tr><th>Gene (product)</th><th>Variant and names</th><th>Type of variant</th><th>Molecular change</th><th>Functional effect / phenotype</th><th>Affected drugs (slide)</th></tr></thead><tbody>
<tr><td>VKORC1</td><td>VKORC1 1173 C / T; 1173 C&gt;T; haplotypes A and B</td><td>SNP; haplotypes of at least 10 functional SNPs</td><td>C to T at nucleotide 1173</td><td>Functional significance (haplotypes A, B)</td><td>Warfarin (taught 10/26: see the Day 20 warfarin table)</td></tr>
<tr><td>ABCB1 (P-glycoprotein)</td><td>ABCB1 3435 C&gt;T</td><td>Synonymous SNP</td><td>ATC to ATT, isoleucine unchanged</td><td>She: probably changes expression. Slide: no clear consensus on function or expression</td><td>Efavirenz, cyclosporine</td></tr>
<tr><td>CYP2C19</td><td>*2 = 681 G&gt;A</td><td>(Truncated protein)</td><td>G to A at 681</td><td>No activity</td><td>—</td></tr>
<tr><td>CYP2C19</td><td>*3 = 636 G&gt;A = rs4986893</td><td>Premature stop codon (non-synonymous)</td><td>TGG (tryptophan) to TAG (stop)</td><td>No activity</td><td>Proton pump inhibitors (omeprazole, lansoprazole)</td></tr>
<tr><td>CYP2C9</td><td>*2, *3</td><td>—</td><td>Not at the CYP2C19 *2 and *3 loci</td><td>Decreased activity</td><td>Warfarin clearance (p. 5)</td></tr>
<tr><td>TPMT (thiopurine methyltransferase)</td><td>*3A</td><td>Non-synonymous SNPs; two changes on one allele (haplotype)</td><td>615 G&gt;A (alanine to threonine); 874 A&gt;G (tyrosine to cysteine)</td><td>Significantly decreased activity; poor metabolizers need less than 10% of the normal dose</td><td>Azathioprine, 6-mercaptopurine</td></tr>
<tr><td>CYP2D6</td><td>*5</td><td>Whole gene deletion</td><td>Thousands of base pairs of the gene deleted</td><td>Loss of function; *5/*5 none, *1/*5 some; poor metabolizer</td><td>SSRIs, tamoxifen, codeine, beta blockers</td></tr>
<tr><td>CYP2D6</td><td>*2xN (two copies: *2x2)</td><td>Copy number variant</td><td>Extra copies of the gene (N = 2, 3, 4, 5, 13)</td><td>Ultrarapid metabolizer</td><td>SSRIs, tamoxifen, codeine, beta blockers</td></tr>
</tbody></table>
<p class="sub">Sources: Intro to PGx Lecture Students Fall 2026.pdf pp. 23–40; PGx-Examples-Students-Fall-2026.pdf pp. 5, 9; (T) 10/21. Questions L18-002 to L18-053, L18-062.</p>

<h3 id="ref4-l18-2">Day 18: CYP2C19 genotype to activity, and genotype-guided dosing</h3>
<table class="reftab"><thead><tr><th>CYP2C19 genotype</th><th>Enzyme activity</th><th>Reason</th></tr></thead><tbody>
<tr><td>*1/*1</td><td>Normal (wild type)</td><td>Two active copies</td></tr>
<tr><td>*1/*2, *1/*3</td><td>Reduced (about halfway: gene dose effect)</td><td>One active copy</td></tr>
<tr><td>*2/*2, *2/*3, *3/*3</td><td>None</td><td>No active copy</td></tr>
</tbody></table>
<table class="reftab"><thead><tr><th>Patient (figure, p. 6)</th><th>Metabolizing gene status</th><th>Genotype-based dose vs average</th><th>Outcome secured</th></tr></thead><tbody>
<tr><td>A</td><td>Two non-functional alleles</td><td>Lower</td><td>Toxicity prevented</td></tr>
<tr><td>B</td><td>One non-functional allele</td><td>Slightly lower</td><td>Same therapeutic AUC</td></tr>
<tr><td>C</td><td>Two functional alleles</td><td>Higher</td><td>Same therapeutic AUC</td></tr>
<tr><td>D</td><td>Extra copies</td><td>Much higher</td><td>Efficacy ensured</td></tr>
</tbody></table>
<p class="sub">Sources: Intro to PGx Lecture Students Fall 2026.pdf slide ‘Genotype Nomenclature’ (p. 28); PGx-Examples-Students-Fall-2026.pdf slide ‘Genotype/Phenotype Relationship 2’ (p. 6); (T) 10/21. Questions L18-021 to L18-025, L18-055 to L18-059, L18-066.</p>

<h3 id="ref4-l19-1">Day 19: drug metabolizing enzyme variants: gene, drug, variant, consequence (10/22)</h3>
<table class="reftab"><thead><tr><th>Enzyme / gene</th><th>Example drug(s)</th><th>Key variant(s)</th><th>Effect of variant</th><th>Clinical consequence</th></tr></thead><tbody>
<tr><td>Butyrylcholinesterase (BChE)</td><td>Succinylcholine</td><td>Slow metabolizer phenotype (about 1 in 3000)</td><td>Clears succinylcholine in 2 to 3 hours instead of about 2 min</td><td>Prolonged paralysis, including the diaphragm</td></tr>
<tr><td>N-acetyltransferase 2 (NAT2)</td><td>Isoniazid; procainamide</td><td>Slow acetylator; fast acetylator</td><td>Changes rate of acetylation</td><td>Slow: isoniazid nerve damage, procainamide lupus; fast: isoniazid hepatotoxicity</td></tr>
<tr><td>CYP2D6</td><td>Codeine (prodrug); many drugs (15-25% of market)</td><td>*2xN (extra copies, UM); *5 deletion (PM); *3,*4,*6 nonfunctional; *10,*17,*41 reduced</td><td>UM: fast; PM: little or none</td><td>UM on codeine: morphine excess, respiratory depression; PM: toxicity (active drug) or failure (prodrug)</td></tr>
<tr><td>CYP2C9</td><td>Warfarin, phenytoin, glipizide, tolbutamide</td><td>*2 (about 20% activity); *3 (about 5%)</td><td>Reduced clearance; *3/*3 about 90% lower S-warfarin clearance</td><td>Lower warfarin dose needed (about 1.5 vs 5 mg/day)</td></tr>
<tr><td>CYP2C19</td><td>PPIs, fluoxetine, sertraline, diazepam, clopidogrel (prodrug)</td><td>*2, *3 inactive (premature stop); *17 increased (promoter)</td><td>PM: slow clearance; *17: more enzyme</td><td>Clopidogrel: *2/*3 failure, *17 over-anticoagulation; PPI PM: better cure rate; SSRI/diazepam PM: adverse effects</td></tr>
<tr><td>Dihydropyrimidine dehydrogenase (DPYD / DPD)</td><td>5-fluorouracil, capecitabine, tegafur</td><td>Low-activity DPYD variants (not yet well characterized)</td><td>Less drug catabolized to inactive products (normally about 80%)</td><td>Severe myelosuppression, mucositis, neurotoxicity, hand-foot syndrome, diarrhea</td></tr>
<tr><td>UGT1A1</td><td>Irinotecan (active) and its metabolite SN-38</td><td>UGT1A1*28 (promoter)</td><td>Reduced expression and glucuronidation</td><td>SN-38 accumulates: toxicity, bone marrow suppression</td></tr>
<tr><td>Thiopurine methyltransferase (TPMT)</td><td>Azathioprine (prodrug), mercaptopurine</td><td>*3A (Caucasians, 2 SNPs); *3C (East Asians, 1 SNP)</td><td>Low activity shunts more drug to 6-thioguanine nucleotides</td><td>Myelosuppression; must reduce thiopurine dose</td></tr>
</tbody></table>
<p class="sub">Source: PGx-Examples-Students-Fall-2026.pdf slides 'Variations in Drug Metabolizing Enzymes' through 'Thiopurine Methyltransferase (TPMT)' (pp. 12-33); transcript 10/22. Figures: CYP2D6 debrisoquine histogram (p. 21, Golan Fig. 52-1A); CYP2C9 S-warfarin clearance (p. 24); CYP2C19 Furuta lansoprazole AUC/pH/cure-rate (p. 27).</p>
<h3 id="ref4-l20-1">Day 20: transporter, drug-target and immune variants: gene, drug, variant, consequence (10/26)</h3>
<table class="reftab"><thead><tr><th>Gene (protein)</th><th>Example drug(s)</th><th>Key variant(s)</th><th>Effect of variant</th><th>Clinical consequence or recommendation</th></tr></thead><tbody>
<tr><td>TPMT</td><td>Azathioprine, mercaptopurine</td><td>*3A (Caucasians; about 5% heterozygous, 1 in 300 homozygous); *3C (East Asians)</td><td>Low activity; more 6-thioguanine nucleotides</td><td>Genotype first (standard of care). Homozygous deficient: under 10% of the dose. Heterozygous: about 35% of the dose (her words; the slide words it as 35% of heterozygotes needing a decrease)</td></tr>
<tr><td>ABCB1 / MDR1 (P-glycoprotein)</td><td>Digoxin; cyclosporine, tacrolimus; protease inhibitors</td><td>Exon 12 (C1236T), 21 (G2677T), 26 (C3435T)</td><td>Changed expression; low activity raises bioavailability</td><td>Exons 21 and 26: digoxin levels; exon 26: protease inhibitor levels and effects</td></tr>
<tr><td>SLCO1B1 (OATP1B1)</td><td>Simvastatin (statins), methotrexate; bilirubin</td><td>*5 (rs4149056, 521T&gt;C, Val174Ala; about 1%); *15, *17 (5% to 15%)</td><td>Reduced hepatic uptake; large rise in simvastatin AUC</td><td>Muscle breakdown and kidney damage; lower the simvastatin dose or use another statin</td></tr>
<tr><td>ADRB1 (beta-1 receptor)</td><td>Metoprolol, beta-blockers</td><td>Ser49Gly, Arg389Gly</td><td>Wild type (Ser49, Arg389) responds better</td><td>Genotype may guide the choice of starting drug</td></tr>
<tr><td>ADRB2 (beta-2 receptor)</td><td>Beta-2 agonists (albuterol)</td><td>Arg16Gly; codon 27; promoter SNP</td><td>Unclear</td><td>More studies needed; not likely to lead to genotyping</td></tr>
<tr><td>EGFR</td><td>Gefitinib</td><td>Gain-of-function, overexpressed (non-small cell lung cancer)</td><td>Variant drives tumor growth</td><td>Use only when the tumor has the variant EGFR</td></tr>
<tr><td>G proteins (alpha subunit)</td><td>Some antidepressants</td><td>Variants in G proteins coupled to receptors</td><td>Associated with antidepressant efficacy</td><td>A new area</td></tr>
<tr><td>ALOX5 (5-lipoxygenase)</td><td>5-lipoxygenase inhibitors (asthma)</td><td>Promoter tandem repeat; 5-repeat allele</td><td>5-repeat thought to raise expression</td><td>Only 5-repeat carriers responded; no link to asthma severity</td></tr>
<tr><td>ACE</td><td>ACE inhibitors</td><td>Insertion/deletion in intron 16</td><td>Associated with plasma ACE levels</td><td>Probably adverse reactions (cough about 10%; angioedema 0.1% to 0.2%), not efficacy</td></tr>
<tr><td>HLA-B*57:01</td><td>Abacavir</td><td>HLA variant</td><td>May change antigen binding</td><td>Skin toxicity, potentially fatal</td></tr>
<tr><td>HLA-B*15:02</td><td>Carbamazepine</td><td>HLA variant</td><td>May change antigen binding</td><td>Skin toxicity, potentially fatal</td></tr>
</tbody></table>
<p class="sub">Source: PGx-Examples-Students-Fall-2026.pdf slides 'Thiopurine Methyltransferase (TPMT)' 3-5 (pp. 33-35), 'P-Glycoprotein' 1-2 (pp. 45-46), 'Organic anion transporter' (p. 47), 'Variations of Drug Targets' (pp. 50-56), 'Variations in Immune System Function 2' (p. 60, Katzung Table 5-4); transcript 10/26.</p>

<h3 id="ref4-l20-2">Day 20: warfarin genes and dose direction (10/26)</h3>
<table class="reftab"><thead><tr><th>Gene</th><th>Role</th><th>Low-activity variant</th><th>Warfarin dose need</th></tr></thead><tbody>
<tr><td>CYP2C9 (*2, *3)</td><td>Clears S-warfarin to inactive 7-OH warfarin (PK)</td><td>Slower clearance (*3 lowest)</td><td>Lower</td></tr>
<tr><td>VKORC1 (haplotypes)</td><td>Vitamin K epoxide reductase, the target (PD)</td><td>Less active target</td><td>Lower</td></tr>
<tr><td>CYP4F2</td><td>Inactivates reduced (active) vitamin K</td><td>More active vitamin K</td><td>Higher</td></tr>
<tr><td>Both CYP2C9*3/*3 and homozygous variant VKORC1</td><td>"double whammy" (her phrase)</td><td>Both low</td><td>Lowest (wild type for both: about 5 mg/day)</td></tr>
</tbody></table>
<p class="sub">Source: PGx-Examples-Students-Fall-2026.pdf slides 'Integrated: Both PK and PD' (p. 57), 'Both PK and PD 2' (p. 58, Goodman and Gilman); transcript 10/26.</p>
<h3 id="ref4-l21-1">Day 21: The CPIC warfarin algorithm for adults, step by step (2017 guideline, Figure 2)</h3>
<table class="reftab"><thead><tr><th>Branch</th><th>Genotype or finding</th><th>What the algorithm gives</th><th>Strength</th></tr></thead><tbody>
<tr><td>Any</td><td>No genotype available</td><td>Dose clinically (without genetic information: a clinical dosing algorithm or a standard dose approach)</td><td>-</td></tr>
<tr><td>Any</td><td>Genotype available</td><td>Ask the patient's self-identified ancestry (African or non-African) and follow that branch</td><td>-</td></tr>
<tr><td>Non-African</td><td>VKORC1 -1639G&gt;A, CYP2C9*2 and *3</td><td>Calculate the dose with a published pharmacogenetic algorithm (Gage or IWPC)</td><td>Strong</td></tr>
<tr><td>Non-African</td><td>Loading dose to be used</td><td>EU-PACT loading dose algorithm with genetic information could be used</td><td>Optional</td></tr>
<tr><td>Non-African</td><td>CYP2C9*5, *6, *8 or *11 detected</td><td>Decrease the calculated dose 15-30% per variant allele or consider an alternative agent; 20-40% in homozygotes</td><td>Optional</td></tr>
<tr><td>Non-African</td><td>CYP4F2*3 detected</td><td>Increase the dose 5-10%</td><td>Optional</td></tr>
<tr><td>Non-African</td><td>rs12777823</td><td>Not considered, even if available</td><td>-</td></tr>
<tr><td>African</td><td>CYP2C9*5, *6, *8, *11 not tested</td><td>Dose clinically</td><td>-</td></tr>
<tr><td>African</td><td>*5, *6, *8, *11 known</td><td>Calculate with VKORC1 -1639G&gt;A and CYP2C9*2 and *3; decrease 15-30% for a *5, *6, *8 or *11 carrier, 20-40% with two variant alleles</td><td>Moderate</td></tr>
<tr><td>African</td><td>rs12777823 A/G or A/A (African Americans)</td><td>Decrease the dose 10-25%</td><td>Moderate</td></tr>
<tr><td>African</td><td>CYP4F2</td><td>No recommendation (data do not support an effect in African ancestry)</td><td>-</td></tr>
<tr><td>Either</td><td>CYP2C9 poor metabolism (e.g. *2/*3, *3/*3), or VKORC1 increased sensitivity plus CYP2C9 poor metabolism</td><td>Consider an alternative oral anticoagulant</td><td>-</td></tr>
</tbody></table>
<p class="sub">Source: CPIC warfarin guideline 2017 update (Johnson et al.), Figure 2 and footnotes, Therapeutic Recommendations; PGx-Resources-and-Cases-Students-Fall-2026.pdf slide 'CPIC Guidelines 7' (p. 15); (T) 10/27. In class she said "Dose your patient empirically" for the no-genotype branch, and the walk-through briefly gave a decrease for CYP4F2 before she corrected it to an increase. Footnote (c): 45-50% of individuals with self-reported African ancestry carry CYP2C9*5, *6, *8, *11 or rs12777823.</p>
<h3 id="ref4-l21-2">Day 21: the worksheet labels: gene, variant, tumor or patient, efficacy or toxicity, test, population, what changes</h3>
<table class="reftab"><thead><tr><th>Drug (brand)</th><th>Gene</th><th>Variant</th><th>Tumor or patient</th><th>Efficacy or toxicity</th><th>Test</th><th>Population or tumor type</th><th>What changes</th></tr></thead><tbody>
<tr><td>Trastuzumab (Herceptin)</td><td>HER2 (c-erbB2); encodes a 185 kDa receptor protein</td><td>None named; HER2 protein overexpression or gene amplification in the tumor</td><td>Tumor (phenotyped)</td><td>Efficacy</td><td>Usually IHC (her words); label: FDA-authorized test specific for breast or gastric cancer by a laboratory with demonstrated proficiency; no brand</td><td>Breast; metastatic gastric or gastroesophageal junction adenocarcinoma (she: gastrointestinal and esophageal); not brain</td><td>HER2-positive: candidate; HER2-negative: not used</td></tr>
<tr><td>Carbamazepine (Tegretol)</td><td>HLA-B</td><td>HLA-B*15:02 (label: HLA-B*1502)</td><td>Patient</td><td>Toxicity: higher risk of SJS/TEN</td><td>Label: high-resolution "HLA-B*1502 typing" (not worked aloud)</td><td>Label: ancestry in genetically at-risk populations (not worked aloud)</td><td>Label: do not use if positive unless the benefit clearly outweighs the risk (not worked aloud)</td></tr>
<tr><td>Carbamazepine (Tegretol)</td><td>HLA-A</td><td>HLA-A*31:01 (label: HLA-A*3101); she said it entered the label in 2017</td><td>Patient</td><td>Toxicity: she: skin reaction (SJS/TEN); label: SJS/TEN, maculopapular eruptions, DRESS; moderate association</td><td>Label names none</td><td>Label gives carrier rates by ancestry (not worked aloud)</td><td>Label: weigh risks and benefits in patients known to be positive (not worked aloud)</td></tr>
<tr><td>Abacavir (Ziagen)</td><td>HLA-B</td><td>HLA-B*57:01 (label: HLA-B*5701)</td><td>Patient</td><td>Toxicity: higher risk of multi-organ hypersensitivity</td><td>Label names none; Medication Guide: a blood test (not worked aloud)</td><td>Label: screen all patients before starting or restarting (not worked aloud)</td><td>Label: contraindicated if HLA-B*5701-positive (not worked aloud)</td></tr>
</tbody></table>
<p class="sub">Source: Pharmacogenomics Questions Drug Labels Worksheet; Herceptin (trastuzumab) label, Revised 05/2026 (1.1-1.3, 2.2, 12.1, 14); Tegretol (carbamazepine) label, 7/2026 (Boxed Warning; Warnings; Precautions, Laboratory Tests); Ziagen (abacavir) label, Revised 11/2020 (Boxed Warning, 2.1, 4, 5.1, Medication Guide); (T) 10/27. Worksheet items 4-8 for carbamazepine and abacavir were not worked aloud before the recording ends; the test, population and what-changes cells for them are label text, and the efficacy or toxicity cell follows from her item 2 answers. Questions L21-046 to L21-059.</p>
<h3 id="ref4-l22-1">Day 22: Adverse drug event vocabulary, definitions and reporting</h3>
<table class="reftab"><thead><tr><th>Term</th><th>Defined by</th><th>Core of the definition</th><th>Preventable?</th><th>Reported to</th></tr></thead><tbody>
<tr><td>Medication misadventures</td><td>Term used in the field (diagram: Malone et al.)</td><td>The outer term enclosing ADEs, medication errors and ADRs</td><td>-</td><td>-</td></tr>
<tr><td>Adverse drug event (ADE)</td><td>Institute of Medicine (IOM)</td><td>Injury resulting from medical intervention related to a drug; can occur even if the correct medication was prescribed and administered</td><td>Preventable, nonpreventable, or potential (not actually occurred)</td><td>-</td></tr>
<tr><td>Therapeutic failure</td><td>ADE type</td><td>Suboptimal amounts given; condition fails to stabilize or symptoms worsen; often nonadherence</td><td>-</td><td>-</td></tr>
<tr><td>Adverse drug withdrawal event</td><td>ADE type</td><td>Withdrawal syndrome after stopping long-term therapy, especially an abrupt change</td><td>-</td><td>-</td></tr>
<tr><td>Overdose</td><td>ADE type</td><td>Doses not normally used to treat disease; accidental overdoses most common in pediatric and geriatric patients</td><td>-</td><td>-</td></tr>
<tr><td>Medication error (ME)</td><td>National Coordinating Council for Medication Error Reporting and Prevention (NCCMERP)</td><td>Any preventable event that may cause or lead to inappropriate medication use or patient harm while the medication is in the control of the healthcare professional, patient, or consumer; any mistake in the process, regardless of outcome</td><td>Always</td><td>ISMP Medication Errors Reporting Program (MERP): confidential, voluntary, analyzes system causes</td></tr>
<tr><td>Adverse drug reaction (ADR)</td><td>World Health Organization (WHO)</td><td>Any noxious, unintended, and undesired effect of a drug at doses used in humans for prophylaxis, diagnosis, or therapy; implies a causal relationship</td><td>-</td><td>FDA MedWatch</td></tr>
<tr><td>Sentinel event</td><td>JCAHO surveillance</td><td>Risk of death or serious physical or psychological injury</td><td>-</td><td>May trigger an unscheduled JCAHO visit and process reviews</td></tr>
<tr><td>Drug Safety Communications</td><td>FDA</td><td>Official FDA messages on label changes and market withdrawals, on one website that also covers drug shortages and other recalls</td><td>-</td><td>Outgoing from the FDA to providers</td></tr>
</tbody></table>
<p class="sub">Source: ADE-Lecture-Students-2026.pdf slides pp. 4-12, 18, 22; (T) 10/28. The slide prints 'Institution of Medicine'; she said Institute of Medicine. She called MERP anonymous; the slide says confidential, voluntary.</p>
<h3 id="ref4-l22-2">Day 22: drug interactions by mechanism, with precipitant, object drug and effect</h3>
<table class="reftab"><thead><tr><th>Kind</th><th>Mechanism</th><th>Precipitant</th><th>Object drug</th><th>Effect</th></tr></thead><tbody>
<tr><td>PK absorption</td><td>Complexation/chelation</td><td>Calcium, magnesium, or aluminum and iron salts</td><td>Levofloxacin (quinolones)</td><td>Decreased bioavailability; separate magnesium and the quinolone by hours</td></tr>
<tr><td>PK absorption</td><td>Complexation/chelation</td><td>Sodium polystyrene sulfonate</td><td>Cations in antacids</td><td>Reduced renal clearance of bicarbonate, systemic acidosis (as printed)</td></tr>
<tr><td>PK absorption</td><td>Adsorption</td><td>Cholestyramine; kaolin; activated charcoal; acarbose</td><td>Digoxin, levothyroxine (cholestyramine); digoxin (kaolin, acarbose); many drugs (charcoal)</td><td>Decreased bioavailability</td></tr>
<tr><td>PK absorption</td><td>Increased GI motility</td><td>Laxatives, cathartics</td><td>Slowly absorbed drugs; controlled-release products</td><td>Decreased bioavailability</td></tr>
<tr><td>PK absorption</td><td>Decreased GI motility</td><td>Anticholinergic agents (propantheline)</td><td>Acetaminophen</td><td>Delayed absorption from the small intestine</td></tr>
<tr><td>PK absorption</td><td>Alteration of gastric pH</td><td>H2-blockers, antacids, proton pump inhibitors</td><td>Ketoconazole</td><td>Less dissolution at basic pH; decreased absorption, therapeutic failure</td></tr>
<tr><td>PK absorption</td><td>Alteration of intestinal flora</td><td>Erythromycin; antibiotics</td><td>Digoxin; estrogen/progestin</td><td>Digoxin bioavailability up; hormone levels down (less enterohepatic circulation), failure of ovulation suppression</td></tr>
<tr><td>PK absorption</td><td>Inhibition of metabolism in intestinal cells</td><td>MAOIs (tranylcypromine, phenelzine)</td><td>Albuterol, levalbuterol</td><td>Hypertension</td></tr>
<tr><td>PK absorption</td><td>Carrier competition; intestinal blood flow</td><td>A precipitant using the same carrier (P-gp)</td><td>Carrier substrate</td><td>Changed bioavailability (added by her, p. 10)</td></tr>
<tr><td>PK absorption (not GI)</td><td>Local absorption changed</td><td>Epinephrine</td><td>Novocaine</td><td>Novocaine kept more localized in the area</td></tr>
<tr><td>PK distribution</td><td>Plasma protein displacement</td><td>Valproic acid; aspirin</td><td>Phenytoin; valproic acid</td><td>More free object drug, side effects</td></tr>
<tr><td>PK distribution</td><td>Tissue (muscle) displacement</td><td>Quinidine</td><td>Digoxin</td><td>More free digoxin; enhanced toxicity</td></tr>
<tr><td>PK metabolism</td><td>Enzyme induction (CYP1A1, CYP1A2)</td><td>Smoking (PAHs)</td><td>Theophylline; diazepam, tricyclic antidepressants</td><td>Faster metabolism, lower levels; child with asthma subtherapeutic</td></tr>
<tr><td>PK metabolism</td><td>Enzyme induction (CYP3A)</td><td>Phenytoin</td><td>Tacrolimus</td><td>Lower levels</td></tr>
<tr><td>PK metabolism</td><td>Enzyme inhibition</td><td>Cimetidine</td><td>Atorvastatin</td><td>Decreased clearance, higher levels</td></tr>
<tr><td>PK metabolism</td><td>Enzyme inhibition (MAO)</td><td>MAOIs (pargyline, tranylcypromine)</td><td>Tyramine in cheddar cheese, red wine, avocado</td><td>Hypertensive crisis</td></tr>
<tr><td>PK metabolism</td><td>CYP3A: inducer per p. 15 and her first statement; competitor (inhibitor) per p. 27 and her later statement</td><td>Grapefruit, Seville oranges, bitter orange</td><td>CYP3A substrates</td><td>Toxic or subtherapeutic levels (p. 27)</td></tr>
<tr><td>PK metabolism and transport</td><td>Induction of CYP3A4, CYP2C9, CYP1A2 (p. 24; she read CYP2D6 and CYP3A4 from p. 15); increased P-gp efflux (she: a P-gp substrate)</td><td>St. John's wort</td><td>CYP3A4 substrates; warfarin; digoxin, calcium channel blockers, simvastatin</td><td>Lower levels</td></tr>
<tr><td>PK metabolism</td><td>Induction of CYP1A2; of CYP2E1 and CYP3A</td><td>Ethanol</td><td>Clozapine, cyclobenzaprine, imipramine, naproxen; acetaminophen</td><td>Lower levels; increased possibility of acetaminophen hepatotoxicity</td></tr>
<tr><td>PK renal</td><td>GFR and renal blood flow</td><td>Methylxanthines (caffeine, theobromine)</td><td>Various drugs</td><td>Less time for reabsorption; faster urinary excretion</td></tr>
<tr><td>PK renal</td><td>Active tubular secretion blocked</td><td>Probenecid</td><td>Penicillin, some cephalosporins</td><td>Higher blood levels, longer half-life (used for benefit)</td></tr>
<tr><td>PK renal</td><td>Urine alkalinization</td><td>Antacids, sodium bicarbonate</td><td>Amphetamine; salicylates</td><td>Amphetamine: more reabsorbed, cleared slower; salicylates: more ionized, cleared faster</td></tr>
<tr><td>PD, similar actions</td><td>Additive CNS depression; additive anticholinergic effects</td><td>Narcotics + antihistamines; promethazine + antihistamines (players; no roles given)</td><td>Each other</td><td>Drowsiness; dry mouth, blurred vision, urinary retention</td></tr>
<tr><td>PD, antagonized effects</td><td>Opposite effects, different receptors (beta vs alpha-1)</td><td>Propranolol + adrenaline (players; no roles given)</td><td>Each other</td><td>Antihypertensive and hypertensive effects cancel</td></tr>
<tr><td>PD, sensitivity</td><td>Low potassium further blocks the sodium-potassium ATPase</td><td>Potassium-wasting diuretics</td><td>Digoxin</td><td>Potential for severe digoxin toxicity</td></tr>
<tr><td>PD, sensitivity</td><td>Low sodium; lithium reabsorbed like sodium</td><td>Sodium-wasting diuretics</td><td>Lithium</td><td>Potential for severe lithium toxicity</td></tr>
<tr><td>PD, same target</td><td>Opposite effects at the same receptor</td><td>Naloxone</td><td>Narcotic pain medications</td><td>Ineffectiveness of narcotics</td></tr>
<tr><td>Food or herb with warfarin</td><td>Vitamin K content or a vitamin K-like structure; for spinach and broccoli the slide says pharmacodynamic antagonism</td><td>Spinach, broccoli, wheat grass, coenzyme Q10</td><td>Warfarin</td><td>Inadequate anticoagulation</td></tr>
<tr><td>Herb with warfarin</td><td>Direct platelet inhibition, a different mechanism from warfarin</td><td>Ginger, garlic, feverfew</td><td>Warfarin</td><td>Increased bleeding risk</td></tr>
<tr><td>Beneficial</td><td>Peripheral metabolism blocked</td><td>Carbidopa</td><td>Levodopa</td><td>More levodopa reaches the CNS</td></tr>
</tbody></table>
<p class="sub">Source: DDI Lecture Students 2026 (1).pdf pp. 5-30 (Tables 18-1 to 18-4 and 18-6 from Engelbrecht and Shargel, Comprehensive Pharmacy Review, 5th ed.); (T) 10/28. P. 31 (Clinical Significance) was left for students to read and is not in this table. Questions L22-042 to L22-086.</p>

`;
