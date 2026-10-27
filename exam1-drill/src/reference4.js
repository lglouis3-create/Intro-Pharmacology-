const REFERENCE4_HTML = `
<p class="sub">Deck files: Intro to PGx Lecture Students Fall 2026.pdf (Intro) and PGx-Examples-Students-Fall-2026.pdf (Examples), by page. T = transcript date.</p>
<h3 id="ref4-l18-1">Day 18: the variant examples (gene, variant, type, effect, drugs)</h3>
<table class="reftab"><thead><tr><th>Gene (product)</th><th>Variant and names</th><th>Type of variant</th><th>Molecular change</th><th>Functional effect / phenotype</th><th>Affected drugs (slide)</th></tr></thead><tbody>
<tr><td>VKORC1</td><td>VKORC1 1173 C / T; 1173 C&gt;T; haplotypes A and B</td><td>SNP; haplotypes of at least 10 functional SNPs</td><td>C to T at nucleotide 1173</td><td>Functional significance (haplotypes A, B)</td><td>Warfarin (her words, to come; not on the slide)</td></tr>
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

<h3 id="ref4-l19-1">Drug metabolizing enzyme variants: gene, drug, variant, consequence (10/22)</h3>
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
<h3 id="ref4-l20-1">Transporter, drug-target and immune variants: gene, drug, variant, consequence (10/26)</h3>
<table class="reftab"><thead><tr><th>Gene (protein)</th><th>Example drug(s)</th><th>Key variant(s)</th><th>Effect of variant</th><th>Clinical consequence or recommendation</th></tr></thead><tbody>
<tr><td>TPMT</td><td>Azathioprine, mercaptopurine</td><td>*3A (Caucasians; about 5% heterozygous, 1 in 300 homozygous); *3C (East Asians)</td><td>Low activity; more 6-thioguanine nucleotides</td><td>Genotype first (standard of care). Homozygous deficient: under 10% of the dose. Heterozygous: about 35% of the dose (her words)</td></tr>
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

<h3 id="ref4-l20-2">Warfarin genes and dose direction (10/26)</h3>
<table class="reftab"><thead><tr><th>Gene</th><th>Role</th><th>Low-activity variant</th><th>Warfarin dose need</th></tr></thead><tbody>
<tr><td>CYP2C9 (*2, *3)</td><td>Clears S-warfarin to inactive 7-OH warfarin (PK)</td><td>Slower clearance (*3 lowest)</td><td>Lower</td></tr>
<tr><td>VKORC1 (haplotypes)</td><td>Vitamin K epoxide reductase, the target (PD)</td><td>Less active target</td><td>Lower</td></tr>
<tr><td>CYP4F2</td><td>Inactivates reduced (active) vitamin K</td><td>More active vitamin K</td><td>Higher</td></tr>
<tr><td>Both CYP2C9*3/*3 and homozygous variant VKORC1</td><td>"double whammy" (her phrase)</td><td>Both low</td><td>Lowest (wild type for both: about 5 mg/day)</td></tr>
</tbody></table>
<p class="sub">Source: PGx-Examples-Students-Fall-2026.pdf slides 'Integrated: Both PK and PD' (p. 57), 'Both PK and PD 2' (p. 58, Goodman and Gilman); transcript 10/26.</p>

`;
