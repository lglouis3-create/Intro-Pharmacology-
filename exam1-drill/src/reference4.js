const REFERENCE4_HTML = `
<p class="sub">Deck files: Intro to PGx Lecture Students Fall 2026.pdf (Intro) and PGx-Examples-Students-Fall-2026.pdf (Examples), by page. T = transcript date.</p>
<h3 id="ref4-l18-1">Day 18: the variant examples (gene, variant, type, effect, drugs)</h3>
<table class="reftab"><thead><tr><th>Gene (product)</th><th>Variant and names</th><th>Type of variant</th><th>Molecular change</th><th>Functional effect / phenotype</th><th>Affected drugs (slide)</th></tr></thead><tbody>
<tr><td>VKORC1</td><td>VKORC1 1173 C / T; 1173 C&gt;T; haplotypes A and B</td><td>SNP; haplotypes of at least 10 functional SNPs</td><td>C to T at nucleotide 1173</td><td>Functional significance (haplotypes A, B)</td><td>Warfarin (to come)</td></tr>
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
<p class="sub">Source: PGx-Examples-Students-Fall-2026.pdf slides 'Variations in Drug Metabolizing Enzymes' through 'Thiopurine Methyltransferase (TPMT)' (pp. 12-35); transcript 10/22. Figures: CYP2D6 debrisoquine histogram (p. 21, Golan Fig. 52-1A); CYP2C9 S-warfarin clearance (p. 24); CYP2C19 Furuta lansoprazole AUC/pH/cure-rate (p. 27).</p>

`;
