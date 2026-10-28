const GUIDE4_HTML = `
<p class="sub">Cites: <i>Intro</i> = Intro to PGx Lecture Students Fall 2026.pdf; <i>Examples</i> = PGx-Examples-Students-Fall-2026.pdf, both by PDF page and slide title; <i>(T) 10/21</i> = her words in the lecture transcript of that day.</p>
<p class="sub">Source hierarchy for Exam 4: what she said in lecture first, then the slides, then the readings. Where they differ the section says so.</p>
<nav class="guidenav">
<a href="#guide4-l18-1">1. Naming genetic variants: numeric/alphabetic, SNP, star and rs nomenclature</a>
<a href="#guide4-l18-2">2. Functional significance, genotype nomenclature and the gene dose effect</a>
<a href="#guide4-l18-3">3. Haplotype nomenclature: VKORC1 haplotypes A and B; TPMT*3A</a>
<a href="#guide4-l18-4">4. SNP types in coding regions: synonymous, non-synonymous, premature stop codon</a>
<a href="#guide4-l18-5">5. InDels, tandem repeats, gene deletion (CYP2D6*5) and copy number (CYP2D6*2xN)</a>
<a href="#guide4-l18-6">6. Genotype-guided dosing: patients A to D, efficacy and toxicity</a>
<a href="#guide4-l18-7">7. Gene structure and allele and phenotype frequencies across populations</a>
<a href="#guide4-l19-1">8. When a metabolizing-enzyme variant matters, and the active-drug or prodrug question</a>
<a href="#guide4-l19-2">9. The historical examples: butyrylcholinesterase and NAT2</a>
<a href="#guide4-l19-3">10. CYP2D6: debrisoquine, poor and ultrarapid metabolizers, and codeine</a>
<a href="#guide4-l19-4">11. CYP2C9: warfarin and the narrow-therapeutic-index drugs</a>
<a href="#guide4-l19-5">12. CYP2C19: the *17 gain of function, clopidogrel, and the PPI twist</a>
<a href="#guide4-l19-6">13. Two oncology examples: DPD (5-fluorouracil) and UGT1A1 (irinotecan)</a>
<a href="#guide4-l19-7">14. Thiopurine methyltransferase (TPMT) and the thiopurines</a>
<a href="#guide4-l20-1">15. TPMT: the activity histogram and genotype-guided thiopurine dosing</a>
<a href="#guide4-l20-2">16. Drug transporters and P-glycoprotein (ABCB1)</a>
<a href="#guide4-l20-3">17. OATP1B1 (SLCO1B1) and simvastatin</a>
<a href="#guide4-l20-4">18. Drug-target receptors: beta-1, beta-2, EGFR and G proteins</a>
<a href="#guide4-l20-5">19. Drug-target enzymes: 5-lipoxygenase (ALOX5) and ACE</a>
<a href="#guide4-l20-6">20. Warfarin: CYP2C9 (PK), VKORC1 (PD) and CYP4F2</a>
<a href="#guide4-l20-7">21. Immune system variants: HLA genes and drug hypersensitivity</a>
<a href="#guide4-l20-8">22. The Furuta 1998 discussion: CYP2C19, omeprazole and H. pylori cure</a>
<a href="#guide4-l21-1">23. The FDA tables: pharmacogenetic associations and biomarkers in drug labeling</a>
<a href="#guide4-l21-2">24. CPIC guidelines: what they answer, components, development, evidence scoring</a>
<a href="#guide4-l21-3">25. Walking the CPIC warfarin algorithm</a>
<a href="#guide4-l21-4">26. Other guidelines, ClinPGx and what implementation still needs</a>
<a href="#guide4-l21-5">27. Reading a label: trastuzumab and HER2</a>
<a href="#guide4-l21-6">28. Reading a label: carbamazepine and abacavir, one gene, two variants</a>
</nav>
<section class="guide" id="guide4-l18-1">
<h3>1. Naming genetic variants: numeric/alphabetic, SNP, star and rs nomenclature</h3>

<h4>The idea</h4>
<p>The same genetic variant can be written four ways, depending on which system the scientists who first described it chose. Papers, guidance documents and genotype reports use all four, so a pharmacist has to read each one and know what it does and does not tell: where the change is, what the wild type is, and what the variant is. The examples (VKORC1, ABCB1, CYP2C19) are real genes that come back later as drug examples.</p>

<h4>The four systems</h4>
<table class="reftab"><thead><tr><th>System</th><th>Example</th><th>What it shows</th><th>What it does not show</th></tr></thead><tbody>
<tr><td>Allele numeric/alphabetic</td><td>VKORC1 1173 C; VKORC1 1173 T</td><td>Gene symbol, nucleotide position (counted from the start codon), the nucleotide found there</td><td>Which is wild type, unless the writer follows the convention (wild type capitalized, variant lowercase); what the other version is</td></tr>
<tr><td>SNP</td><td>VKORC1 1173 C&gt;T; ABCB1 3435 C&gt;T</td><td>Gene, position, wild type nucleotide first, an arrow, then the variant</td><td>(Clear on wild type and variant)</td></tr>
<tr><td>Star</td><td>CYP2C19*1; *2 (681 G&gt;A); *3 (636 G&gt;A)</td><td>Gene, then a star and a number for the allele; *1 is always the wild type. All cytochrome P450 genes are named this way</td><td>Where the change is or what it is: a table defining each star allele is needed (papers do not add the parentheses)</td></tr>
<tr><td>Reference SNP (rs)</td><td>rs4986893 (= CYP2C19*3 = CYP2C19 636 G&gt;A)</td><td>A number from the SNP database (dbSNP) that no other SNP has; recommended by the Human Genome Variation Society as the standard</td><td>The gene, the position, the wild type: all require searching a database that is hard to query</td></tr>
</tbody></table>
<p>Gene symbols are written in italics and proteins are not. This matters when they share a name: TPMT (italic) is the gene, TPMT (plain) is the enzyme thiopurine methyltransferase. ABCB1 is the gene for P-glycoprotein. <small>(T) 10/21</small></p>

<h4>Why the star system needs care</h4>
<ul>
<li><b>Star numbers follow the order of discovery, not position.</b> CYP2C19*2 was characterized first, at nucleotide 681; *3 was found later, at 636, so *3 lies closer to the start codon. In a table the alleles appear in number order while their positions on the gene are scrambled.</li>
<li><b>The same star number means a different place in another gene.</b> Each lab numbers its own gene's variants as it finds them, so CYP2C9*2 is not at 681 and CYP2C9*3 is not at 636.</li>
<li><b>The same star number can mean a different functional effect.</b> CYP2C19*2 and *3 have no activity; CYP2C9*2 and *3 have decreased activity (section 2).</li>
<li><b>Letters can follow the number.</b> TPMT*3 became TPMT*3A when further work showed it is two SNPs (section 3).</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"By convention. We always call star one for whatever gene we're talking about, that's the wild type version" <small>(T) 10/21</small></li>
<li>"so the RS nomenclature doesn't clearly indicate to you what is the wild type" <small>(T) 10/21</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>"The rs number tells you the wild type."</b> It does not; it only identifies one SNP. Her poll answer: rs is the method that does not easily show the wild type.</li>
<li><b>"Most papers use the rs number for CYP2C19*3."</b> The rs number and the nucleotide change take too long to say, so papers call it CYP2C19*3 "in most papers, but not always" <small>(T) 10/21</small>.</li>
<li><b>"Star numbers run along the gene."</b> They run in order of discovery; *3 (636) is upstream of *2 (681) in CYP2C19.</li>
<li><b>"CYP2C19*3 is at 681."</b> *2 is 681 G&gt;A; *3 is 636 G&gt;A. She misspoke later in the day ("481 ... 263"); the slide gives 636.</li>
<li><b>"In C&gt;T the T is the wild type."</b> The wild type is written first.</li>
<li><b>"The protein is italicized."</b> The gene is.</li>
</ul>

<p>How she asks it: name the system from an example; identify the wild type in a SNP name; match rs4986893 to CYP2C19*3; explain why star numbers can be out of order or mean different things in different genes; her poll, "which allele nomenclature method does not easily let you know which allele is the wild type?"</p>
<p class="sub">Sources: Intro to PGx slides ‘Polymorphism Nomenclature’ (p. 22), ‘Allele Numeric/Alphabetic Nomenclature’ (p. 23), ‘SNP Nomenclature’ (p. 24), ‘Allele “Star” Nomenclature’ (p. 25), ‘More Allele “Star” Nomenclature’ (p. 26), ‘Reference SNP (rs) Nomenclature’ (p. 27), ‘Synonymous SNP: P-Glycoprotein (P-gp)’ (p. 34), ‘Non-Synonymous SNP: TPMT’ (p. 35); Poll Everywhere and (T) 10/21. Questions L18-001 to L18-011, L18-018 to L18-020.</p>
</section>
<section class="guide" id="guide4-l18-2">
<h3>2. Functional significance, genotype nomenclature and the gene dose effect</h3>

<h4>The idea</h4>
<p>An allele name is only useful once its functional significance is known: what the variant does to the activity of the protein the gene codes for (an enzyme, a transporter or a receptor). A person has two alleles, written together as a genotype (CYP2C19*1/*2), and the activity of the two copies adds up. That sum, not dominance, sets the phenotype.</p>

<h4>Same star number, different effect</h4>
<table class="reftab"><thead><tr><th>Allele</th><th>CYP2C19</th><th>CYP2C9</th></tr></thead><tbody>
<tr><td>*1</td><td>Normal (wild type) activity</td><td>Normal (wild type) activity</td></tr>
<tr><td>*2</td><td>No activity: a really short (truncated), non-functional protein</td><td>Decreased activity</td></tr>
<tr><td>*3</td><td>No activity: also truncated (a premature stop codon, section 4)</td><td>Decreased activity</td></tr>
</tbody></table>
<p>For these variants the genotype-phenotype relationship is tight: labs have expressed the variant enzymes and measured their activity against the wild type. <small>(T) 10/21; slide ‘More Allele “Star” Nomenclature’</small></p>

<h4>CYP2C19 genotypes</h4>
<table class="reftab"><thead><tr><th>Genotype</th><th>Activity</th><th>Why</th></tr></thead><tbody>
<tr><td>*1/*1</td><td>Normal (wild type)</td><td>Both copies make active enzyme</td></tr>
<tr><td>*1/*2 or *1/*3</td><td>Reduced (about halfway)</td><td>The *1 copy makes active enzyme and the other makes none</td></tr>
<tr><td>*2/*2, *2/*3, *3/*3</td><td>None</td><td>Neither copy makes active enzyme, whichever combination</td></tr>
</tbody></table>

<h4>Why</h4>
<ul>
<li>We are diploid: one copy from each parent. A *3/*3 person got *3 from both, and *3 makes no active enzyme, so there is no CYP2C19 activity.</li>
<li>In *1/*3 the *1 protein is active and the *3 protein is not, so added together the person has about half the activity. She called this the <b>gene dose effect</b>. There is no dominance in these drug-response variants.</li>
<li>*2/*3 has no activity because both alleles are inactive; being heterozygous does not by itself give partial activity.</li>
<li>Induction (diet, other drugs) can raise expression in a *1/*2 person, but no activity comes from *2, because that protein is too short to function. For CYP2C9, whose *2 and *3 keep some activity, induction could blur the groups; she said she will never ask that.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"2C192 has no enzyme activity. 2C92 has decreased enzyme activity." <small>(T) 10/21; CYP2C19*2 and CYP2C9*2</small></li>
<li>"So in combination. If you were to add it up, they look halfway in the range of 2C19 activity." <small>(T) 10/21</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>"*2 means no activity."</b> Only for CYP2C19; in CYP2C9 it means decreased.</li>
<li><b>"Heterozygous means reduced."</b> Only when one allele is *1; *2/*3 has none.</li>
<li><b>"*1 is dominant."</b> No dominance; activities add (gene dose).</li>
<li><b>"Induction rescues *2."</b> It cannot; there is no working *2 protein to make more of.</li>
<li><b>Functional significance vs frequency.</b> What the variant does to the protein's activity, not how common it is.</li>
</ul>

<p>How she asks it: her own example, "Somebody that is ... homozygous for the 3 variant of 2C19 has 2C19 enzyme activity, true or false?" (False); compare *2 in CYP2C19 and CYP2C9; sort genotypes into normal, reduced and none; explain why *2/*3 has no activity.</p>
<p class="sub">Sources: Intro to PGx slides ‘More Allele “Star” Nomenclature’ (p. 26), ‘Genotype Nomenclature’ (p. 28); (T) 10/21. Questions L18-012 to L18-017, L18-021 to L18-026.</p>
</section>
<section class="guide" id="guide4-l18-3">
<h3>3. Haplotype nomenclature: VKORC1 haplotypes A and B; TPMT*3A</h3>

<h4>The idea</h4>
<p>A haplotype is a set of variants at several loci on one allele that occur together in the population more often than random chance. Because listing every change is unwieldy, a haplotype gets one name. Whoever discovers it names it, so the names differ from gene to gene: letters for VKORC1, a star name with a letter for TPMT*3A.</p>

<h4>The two examples</h4>
<table class="reftab"><thead><tr><th>Gene</th><th>Haplotype name</th><th>What it contains</th><th>Why it matters</th></tr></thead><tbody>
<tr><td>VKORC1</td><td>Haplotype A, haplotype B (the most common)</td><td>Different groupings of the at least 10 VKORC1 SNPs that may have a functional effect</td><td>Functional significance; returns with warfarin dosing</td></tr>
<tr><td>TPMT</td><td>TPMT*3A</td><td>Two SNPs on one allele: 615 G&gt;A and 874 A&gt;G. First called *3, renamed *3A when further work showed two SNPs</td><td>Significantly reduced TPMT activity; azathioprine and 6-mercaptopurine (section 4)</td></tr>
</tbody></table>

<h4>Why</h4>
<p>When the same combination of changes keeps turning up in different people more often than chance, the combination is common enough in the population to be worth a name, and "haplotype A" is easier to say and read than the list of changes. <small>(T) 10/21; slide ‘Haplotype Nomenclature’</small></p>

<h4>Her words</h4>
<ul>
<li>"There's one called haplotype A, and there's another called haplotype B." <small>(T) 10/21</small></li>
<li>"We did some more work and realized that 3 is actually 2 snips in the gene." <small>(T) 10/21; TPMT*3A</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Haplotype vs genotype.</b> A haplotype is several variants together on one allele; a genotype is the two alleles a person carries.</li>
<li><b>Every gene's haplotypes are lettered.</b> Naming is up to the discoverers; some are given star names.</li>
<li><b>VKORC1 and warfarin.</b> VKORC1 is the gene she pairs with warfarin; TPMT goes with azathioprine and 6-mercaptopurine.</li>
</ul>

<p>How she asks it: name VKORC1's common haplotypes; say why haplotypes get names; recognize TPMT*3A as two changes on one allele.</p>
<p class="sub">Sources: Intro to PGx slides ‘Haplotype Nomenclature’ (p. 29), ‘Non-Synonymous SNP: TPMT’ (p. 35); (T) 10/21. Questions L18-027 to L18-029, L18-039.</p>
</section>
<section class="guide" id="guide4-l18-4">
<h3>4. SNP types in coding regions: synonymous, non-synonymous, premature stop codon</h3>

<h4>The idea</h4>
<p>A single nucleotide polymorphism (SNP) is one base pair changed in a gene. Several million are known, and many change nothing about the gene's product. Coding regions are the parts of a gene that become RNA and then protein; a coding SNP is classed by what the base change does to the codon: the same amino acid (synonymous), a different amino acid (non-synonymous), or a stop codon early in the sequence (premature stop). Each class has a drug-relevant example.</p>

<h4>The three examples</h4>
<table class="reftab"><thead><tr><th>Type</th><th>Example</th><th>Codon change</th><th>Effect on the protein</th><th>Affected drugs (slide)</th></tr></thead><tbody>
<tr><td>Synonymous</td><td>ABCB1 3435C&gt;T (P-glycoprotein)</td><td>ATC to ATT: isoleucine to isoleucine</td><td>Same amino acid sequence. She thinks expression of the protein is probably affected; the slide says there is no clear consensus on an effect on P-gp function or expression</td><td>Efavirenz, cyclosporine</td></tr>
<tr><td>Non-synonymous</td><td>TPMT*3A (thiopurine methyltransferase)</td><td>615 G&gt;A: GCA (alanine) to ACA (threonine); 874 A&gt;G: TAT (tyrosine) to TGT (cysteine)</td><td>Different amino acids; significantly reduced activity</td><td>Azathioprine, 6-mercaptopurine</td></tr>
<tr><td>Premature stop codon (a non-synonymous change)</td><td>CYP2C19*3</td><td>G&gt;A: TGG (tryptophan) to TAG (stop)</td><td>Translation stops early; the protein is too short; no activity</td><td>Proton pump inhibitors (omeprazole, lansoprazole)</td></tr>
</tbody></table>

<h4>Why</h4>
<ul>
<li><b>Synonymous.</b> Several codons code for the same amino acid, so ATC and ATT both give isoleucine and the protein is unchanged. A synonymous SNP is still studied when it keeps turning up in drug-response studies, as ABCB1 3435C&gt;T does with different P-gp substrates; the likely explanation is a change in how much protein is expressed.</li>
<li><b>Non-synonymous.</b> Each TPMT*3A change puts a different amino acid into the protein, so the enzyme is altered and its activity is significantly reduced. Azathioprine and 6-mercaptopurine depend on TPMT, so a patient with this variant who gets a normal dose without genotyping could die.</li>
<li><b>Premature stop.</b> TAG tells the cell's machinery to stop translating the RNA, and in CYP2C19*3 it occurs far earlier than the normal stop codon, so the protein is truncated and has no activity.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"Synonymous means the same. The change resulted in still the same protein, no change to the protein" <small>(T) 10/21</small></li>
<li>"if you don't know the genotype of your patient, you could kill your patient if you didn't genotype them for this snip." <small>(T) 10/21; TPMT*3A</small></li>
<li>Her model answer for the variant table: "A synonymous snip is a change to the DNA sequence, a base pair gets changed. But the amino acid sequence in the protein stays the same compared to the wild type." <small>(T) 10/21</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>"Synonymous means harmless."</b> The protein is unchanged, but ABCB1 3435C&gt;T is studied because it keeps appearing with drug response.</li>
<li><b>"CYP2C19*3 is synonymous."</b> She first said so and corrected herself: it changes the sequence by creating a stop codon.</li>
<li><b>"A premature stop gives reduced activity."</b> CYP2C19*3 gives none.</li>
<li><b>Mixing up the drug lists.</b> P-gp: efavirenz, cyclosporine. TPMT: azathioprine, 6-mercaptopurine. CYP2C19: PPIs.</li>
</ul>

<p>How she asks it: "have we had a change in the amino acid sequence?" (no, for ABCB1 3435C&gt;T); "Is it low or no activity?" (no activity, CYP2C19*3); classify a SNP from a codon change; fill in the think/pair/share table in general terms.</p>
<p class="sub">Sources: Intro to PGx slides ‘Types of Genetic Variants’ (p. 30), ‘List of genetic variant types’ (p. 31), ‘SNPs’ (p. 32), ‘SNP’ (p. 33), ‘Synonymous SNP: P-Glycoprotein (P-gp)’ (p. 34), ‘Non-Synonymous SNP: TPMT’ (p. 35), ‘Premature Stop Codon SNP: CYP2C19’ (p. 36), ‘Think/Pair/Share exercise’ (p. 41); (T) 10/21. Questions L18-030 to L18-043, L18-065.</p>
</section>
<section class="guide" id="guide4-l18-5">
<h3>5. InDels, tandem repeats, gene deletion (CYP2D6*5) and copy number (CYP2D6*2xN)</h3>

<h4>The idea</h4>
<p>Not every variant is a single base change. A few nucleotides can be inserted or deleted (InDel), a short sequence can be repeated a variable number of times (tandem repeat), a whole gene can be missing (CYP2D6*5), or a whole gene can be present in extra copies (CYP2D6*2xN). The last two set the CYP2D6 phenotype at opposite ends: poor metabolizer and ultrarapid metabolizer.</p>

<h4>The facts</h4>
<table class="reftab"><thead><tr><th>Variant type</th><th>What changes</th><th>Effect</th></tr></thead><tbody>
<tr><td>Small insertion/deletion (InDel)</td><td>One, two, three or a few more nucleotides inserted or deleted in a coding region (her example: ATGC to ATGGC)</td><td>Frameshift: the three-letter code shifts, so the amino acids from that point on are wrong; may create a premature stop codon; can change activity. A deletion or insertion of exactly three nucleotides removes or adds one amino acid (slide)</td></tr>
<tr><td>Tandem repeats (variable number tandem repeats, VNTRs)</td><td>A short sequence inserted again and again in a row; the number of repeats differs between people. Microsatellites: unit under 5 bp (also short tandem repeats or simple sequence repeats). Minisatellites: over 5 bp</td><td>In intergenic regions: often no change in function (effects on expression are being studied). In a coding sequence: acts like an InDel and can change the protein. Used in forensic and paternity testing</td></tr>
<tr><td>Gene deletion: CYP2D6*5</td><td>The whole CYP2D6 gene (thousands of base pairs) missing from one allele</td><td>Loss of function from that allele. *1/*5: some activity; *5/*5: none. Poor metabolizer (PM)</td></tr>
<tr><td>Copy number variant: CYP2D6*2xN</td><td>Extra copies of the whole CYP2D6 gene (slide: N = 2, 3, 4, 5, 13); two copies written CYP2D6*2x2</td><td>A lot of CYP2D6 enzyme activity. Ultrarapid metabolizer (UM)</td></tr>
</tbody></table>
<p>Both CYP2D6 variants affect the same drugs: SSRIs, tamoxifen, codeine and beta blockers. <small>(T) 10/21; slides ‘Gene Deletion CYP2D6’, ‘Copy Number Variant CYP2D6’</small></p>

<h4>Why</h4>
<ul>
<li>Codons are read three bases at a time, so inserting or deleting a number of bases that is not a multiple of 3 puts every later codon out of register; the rest of the protein can be completely different.</li>
<li>A tandem repeat inside the coding sequence adds bases the same way an InDel does, so it changes the protein; between genes there is no protein sequence to change.</li>
<li>With the gene deleted, that chromosome makes no CYP2D6; with one normal copy on the other chromosome, some enzyme is still made. With both deleted, there is no CYP2D6 activity and drugs cleared by it build up.</li>
<li>With extra copies, the person makes much more enzyme, so drugs cleared by CYP2D6 are metabolized very quickly.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"When you do these indels, you end up causing a frame shift. That means you're shifting the three-letter code coding for amino acids" <small>(T) 10/21</small></li>
<li>"we just started calling those people ultra rapid metabolizers. That's what we call their phenotype, ultra rapid metabolizer." <small>(T) 10/21</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>*5 vs *2xN.</b> *5 is the deletion (PM); *2xN is extra copies (UM). Her Quiz 4 asked for the name of the whole-gene deletion: CYP2D6*5.</li>
<li><b>Micro vs mini.</b> Microsatellites are the shorter units (under 5 bp).</li>
<li><b>"Every tandem repeat changes a protein."</b> Only coding-region repeats clearly do.</li>
<li><b>"*1/*5 has no activity."</b> One working copy gives some.</li>
</ul>

<p>How she asks it: what happens after an InDel; micro vs minisatellite; name the gene deletion; PM vs UM for *5 and *2xN; the drugs affected by CYP2D6 variants; how many copies the drawn person has ("2D6 2 x 2").</p>
<p class="sub">Sources: Intro to PGx slides ‘List of genetic variant types’ (p. 31), ‘Small Insertion/Deletion (InDel)’ (p. 37), ‘Tandem Repeats’ (p. 38), ‘Gene Deletion CYP2D6’ (p. 39), ‘Copy Number Variant CYP2D6’ (p. 40); (T) 10/21. Questions L18-044 to L18-053.</p>
</section>
<section class="guide" id="guide4-l18-6">
<h3>6. Genotype-guided dosing: patients A to D, efficacy and toxicity</h3>

<h4>The idea</h4>
<p>When a drug is cleared by a metabolizing enzyme, the patient's genotype for that enzyme predicts how fast the drug is removed (a phenotype). Giving everyone the same dose then gives very different exposures; adjusting each dose to the genotype gives everyone the same exposure. The goal of pharmacogenomics is to ensure efficacy and prevent toxicity.</p>

<h4>The figures</h4>
<table class="reftab"><thead><tr><th>Patient</th><th>Metabolizing gene status (figure)</th><th>Same dose (gray bar, 100% of average)</th><th>Genotype-based dose (white bar)</th><th>Outcome secured</th></tr></thead><tbody>
<tr><td>A</td><td>Both alleles non-functional (she used "they don't have any 2D6")</td><td>Concentration too high; cannot clear the drug</td><td>Lower than average</td><td>Toxicity prevented</td></tr>
<tr><td>B</td><td>One non-functional allele</td><td>(not discussed)</td><td>Slightly below average</td><td>Same therapeutic AUC as the others</td></tr>
<tr><td>C</td><td>Two functional alleles</td><td>(not discussed)</td><td>Above average</td><td>Same therapeutic AUC as the others</td></tr>
<tr><td>D</td><td>Extra copies of the gene</td><td>AUC very low; never therapeutic</td><td>Much higher than average</td><td>Efficacy ensured</td></tr>
</tbody></table>
<p>The earlier slide (p. 5) shows the same principle with data: S-warfarin unbound clearance falls from CYP2C9*1/*1 through *1/*2, *1/*3, *2/*2, *2/*3 to the lowest, *3/*3. Its explanation fell in the part of the session missing from the recording; she referred back to it on 10/22.</p>

<h4>Why</h4>
<ul>
<li>Patient A has no working enzyme to clear the drug, so a standard dose stays high and reaches toxicity; a lower dose keeps the level effective but not toxic.</li>
<li>Patient D has so much enzyme that a standard dose is metabolized away before it works; a higher dose leaves enough drug for a therapeutic AUC.</li>
<li>Everyone ends with the same AUC because the dose has been matched to each genotype's metabolizing capability.</li>
<li>Genes may act on PK (absorption, distribution, metabolism, excretion) or on PD (target, mechanism, response), but the clinical outcome is always framed as efficacy or toxicity (PharmGKB figure, p. 7).</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"the goal of pharmacogenomics is to ensure efficacy and prevent toxicity." <small>(T) 10/21</small></li>
<li>"Yeah, because of their genotypes, these 4 groups of people have different metabolizing capabilities." <small>(T) 10/21</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Gray vs white.</b> Gray bars are the same 100% dose for everyone; white bars are genotype-based doses. She wished the figure's AUC colors were switched.</li>
<li><b>A vs D outcomes.</b> A: toxicity prevented (low dose). D: efficacy ensured (high dose).</li>
<li><b>"Extra copies mean toxicity."</b> Extra copies clear the drug faster, so the risk is no effect.</li>
</ul>

<p>How she asks it: read the figure (which patient gets more or less, why all reach the same AUC); match each patient to efficacy or toxicity; read genotype against clearance.</p>
<p class="sub">Sources: PGx Examples slides ‘Genotype/Phenotype Relationship’ (p. 5, not captured in the recording), ‘Genotype/Phenotype Relationship 2’ (p. 6, Foye's), ‘Impact of Pharmacogenomics on PK and PD’ (p. 7); (T) 10/21. Questions L18-054 to L18-059, L18-066.</p>
</section>
<section class="guide" id="guide4-l18-7">
<h3>7. Gene structure and allele and phenotype frequencies across populations</h3>

<h4>The idea</h4>
<p>Two figures from Goodman and Gilman's close the day. The first reviews the parts of a gene where variants can occur. The second shows that how often each allele or phenotype occurs differs widely between populations. She said the graphs need not be memorized; the point is that frequencies vary, and that frequency together with the severity of the toxicity decides how much to worry about a variant, including whether to genotype everyone from a population.</p>

<h4>Gene structure</h4>
<ul>
<li><b>Promoter:</b> where the machinery for expressing the gene starts.</li>
<li><b>Exons:</b> the DNA that ends up as amino acid sequence.</li>
<li><b>Introns:</b> once thought meaningless; variations are now known to occur there.</li>
<li><b>Stop codon</b> at the end. The figure sorts variants into those changing protein abundance, those changing the protein product, and markers for nearby or distant functional variation.</li>
</ul>

<h4>The frequency figure</h4>
<table class="reftab"><thead><tr><th>Panel</th><th>Gene</th><th>What it shows</th></tr></thead><tbody>
<tr><td>A</td><td>CYP3A5 allele frequencies</td><td>*1 (wild type) and non-functional *3, *6, *7. Sub-Saharan African: *1 common and *3, *6, *7 all present. European: relatively few wild type, most *3</td></tr>
<tr><td>B</td><td>VKORC1 -1639G&gt;A</td><td>G (higher dose required) vs A (lower dose required) across African, European and North American, and East Asian populations</td></tr>
<tr><td>C</td><td>TPMT phenotypes</td><td>Most people normal metabolizers; only a small bar of poor metabolizers</td></tr>
<tr><td>D</td><td>NUDT15 phenotypes</td><td>To be discussed later; sub-Saharan African data currently unknown</td></tr>
</tbody></table>

<h4>Why it matters: TPMT</h4>
<p>Azathioprine and 6-mercaptopurine are metabolized by TPMT. Only a few people in a population may be TPMT poor metabolizers, but a poor metabolizer given the normal dose could die: these patients need less than 10% of the normal dose. So a rare phenotype can still justify genotyping, because the toxicity is severe. <small>(T) 10/21</small></p>

<h4>Her words</h4>
<ul>
<li>"Those people need less than 10% of the normal dose." <small>(T) 10/21; TPMT poor metabolizers</small></li>
<li>"OK, so you don't have to memorize this." <small>(T) 10/21; the frequency graphs</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>"Frequencies are similar everywhere."</b> They differ greatly between populations.</li>
<li><b>"Rare means it can be ignored."</b> The TPMT poor metabolizer is rare and the consequence is lethal.</li>
<li><b>Promoter vs exon.</b> The promoter starts expression; exons become the protein sequence.</li>
</ul>

<p>How she asks it: the TPMT poor metabolizer dose; why frequency studies are done; read a panel for the general pattern (not exact percentages).</p>
<p class="sub">Sources: PGx Examples slides ‘Basic changes to genes’ (p. 8), ‘Allele and Phenotype Frequencies’ (p. 9); (T) 10/21. Questions L18-060 to L18-064.</p>
</section>
<section class="guide" id="guide4-l19-1">
<h3>8. When a metabolizing-enzyme variant matters, and the active-drug or prodrug question</h3>

<h4>The idea</h4>
<p>Inherited variation in drug-metabolizing enzymes is the single biggest reason people respond differently to the same drug. Whether a variant helps or harms depends on two things: whether the enzyme is the main way the drug leaves the body, and whether the drug is already active or is a prodrug that needs activating. Getting those two straight lets you predict toxicity versus therapeutic failure before you memorize any single example.</p>

<h4>The facts</h4>
<p>A polymorphism in a metabolizing-enzyme gene becomes clinically important when any of these is true:</p>
<ul>
<li>Metabolism by that enzyme is the major route of elimination or termination of the drug's action.</li>
<li>The drug is a prodrug that requires metabolic activation.</li>
<li>An altered metabolic pathway, or the parent compound, causes toxicity or side effects.</li>
</ul>
<p>Clinically significant variants have been found in nearly all major phase 1 and phase 2 enzymes.</p>
<table class="reftab"><thead><tr><th>Drug type</th><th>Low enzyme activity (poor metabolizer)</th><th>High activity (ultrarapid)</th></tr></thead><tbody>
<tr><td>Active drug converted to inactive metabolite</td><td>Parent drug rises: toxicity</td><td>Drug cleared fast: may need super-doses</td></tr>
<tr><td>Prodrug converted to active metabolite</td><td>Little active drug made: therapeutic failure</td><td>Too much active drug made: overdose</td></tr>
</tbody></table>

<h4>Why</h4>
<ul>
<li><b>Why the two columns flip.</b> A poor metabolizer cannot run the enzyme step, so an active parent drug is not removed and climbs toward toxicity, while a prodrug is never turned on and fails. An ultrarapid metabolizer runs the step too fast, so an ordinary drug is gone before it works, and a prodrug is over-activated.</li>
<li><b>Why metabolism is more complex than one enzyme, one drug.</b> Clopidogrel is a platelet receptor inhibitor; she said it prevents the platelets from sticking together. It is a prodrug: about 85% of a dose is inactivated by esterases, and only about 15% is bioactivated in two CYP steps to the active thiol metabolite that blocks the platelet receptor. Several CYPs act on it, but variants in CYP2C19 most change how much active metabolite forms, so the enzyme that does the most work is not always the one that drives the outcome.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"Variations in our metabolizing enzymes are the biggest reason why we would see variation in drug response" <small>(T) 10/22</small></li>
<li>"It's a platelet receptor inhibitor. It helps us to basically do anticoagulation because it prevents the platelets from sticking together" <small>(T) 10/22</small></li>
<li>"85% of the clopidogrel dose we give is metabolized by esterases to inactive metabolites" <small>(T) 10/22</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Assuming a poor metabolizer is always at risk.</b> For a prodrug, it is the ultrarapid metabolizer who can overdose; for an active drug, the poor metabolizer accumulates it. The direction depends on the drug type.</li>
<li><b>Thinking the busiest enzyme controls the outcome.</b> For clopidogrel the key is CYP2C19, not the esterases that handle most of the dose.</li>
<li><b>Picking a renally cleared drug as enzyme-dependent.</b> A drug excreted unchanged by the kidney does not depend on a metabolizing enzyme, so a variant does not change its handling.</li>
</ul>

<p>How she asks it: when does an enzyme variant matter; for a given drug type, does low activity give toxicity or failure; which enzyme matters most for clopidogrel.</p>
<p class="sub">Sources: PGx-Examples-Students-Fall-2026.pdf slides 'Variations in Drug Metabolizing Enzymes' (pp. 12-15); (T) 10/22. Questions L19-001 to L19-007.</p>
</section>
<section class="guide" id="guide4-l19-2">
<h3>9. The historical examples: butyrylcholinesterase and NAT2</h3>

<h4>The idea</h4>
<p>Butyrylcholinesterase (BChE) and N-acetyltransferase 2 (NAT2) were the first metabolizing enzymes in which polymorphisms were studied. Neither handles many drugs, but their gene structures were worked out early and a few drugs tied clearly to them. They teach one phenotype lesson each: BChE shows how dangerous prolonged action can be, and NAT2 shows that either direction of a phenotype can cause harm.</p>

<h4>The facts</h4>
<table class="reftab"><thead><tr><th>Enzyme</th><th>Phase</th><th>Drug</th><th>Phenotypes</th><th>Clinical point</th></tr></thead><tbody>
<tr><td>Butyrylcholinesterase (BChE)</td><td>Hydrolysis</td><td>Succinylcholine (short-acting muscle relaxant for anesthesia)</td><td>Extensive metabolizer: about 2 min; slow metabolizer: 2 to 3 hours</td><td>Slow metabolizer stays paralyzed for hours; frequency about 1 in 3000</td></tr>
<tr><td>N-acetyltransferase 2 (NAT2)</td><td>Phase 2</td><td>Isoniazid (tuberculosis); procainamide</td><td>Slow acetylator; fast acetylator</td><td>Both phenotypes carry a drug risk</td></tr>
</tbody></table>
<p>NAT2 phenotype frequency by population: Caucasian about 30 to 45% fast; Japanese about 10% slow; Middle Eastern about 80% slow.</p>

<h4>Why</h4>
<ul>
<li><b>Why a slow BChE metabolizer is dangerous.</b> Succinylcholine paralyzes muscles, including the diaphragm. A normal patient clears it in about 2 minutes, so breathing returns; a slow metabolizer keeps the drug for 2 to 3 hours, so the patient cannot breathe for that whole time unless the exposure is known.</li>
<li><b>Why NAT2 harms both ways.</b> Slow acetylators keep isoniazid around and get peripheral nerve damage, and on procainamide they can get drug-induced lupus, because the drug is not acetylated fast enough. Fast acetylators make more of the isoniazid metabolites that cause hepatotoxicity. You cannot assume only the slow, or only the fast, phenotype is the dangerous one.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"this enzyme, it will hydrolyze, um, a drug called succinylcholine. That's a very short acting muscle relaxant used in, used in the, for anesthesia" <small>(T) 10/22</small></li>
<li>"the frequency of being a slow metabolizer is only 1 in 3000 patients" <small>(T) 10/22</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Mixing up the drugs.</b> BChE hydrolyzes succinylcholine; NAT2 acetylates isoniazid. Do not swap them.</li>
<li><b>Pairing the wrong adverse effect.</b> Slow + isoniazid is peripheral nerve damage; slow + procainamide is drug-induced lupus; fast + isoniazid is hepatotoxicity.</li>
<li><b>Reading the frequency backward.</b> In the Middle Eastern group about 80% are slow, so that is the group to watch for slow-acetylator problems.</li>
</ul>

<p>How she asks it: which drug each enzyme handles; the slow-metabolizer succinylcholine time and the 1 in 3000 frequency; match NAT2 phenotype and drug to the adverse effect; which population is mostly slow acetylators.</p>
<p class="sub">Sources: PGx-Examples-Students-Fall-2026.pdf slides 'Butyrylcholinesterase (BChE)' (p. 18), 'N-acetyltransferase 2 (NAT2)' (p. 19); (T) 10/22. Questions L19-008 to L19-013.</p>
</section>
<section class="guide" id="guide4-l19-3">
<h3>10. CYP2D6: debrisoquine, poor and ultrarapid metabolizers, and codeine</h3>

<h4>The idea</h4>
<p>CYP2D6 was the first P450 studied in depth and is the best characterized. It metabolizes about 15 to 25% of marketed medications. Its classic debrisoquine histogram shows a monogenic trait, and its codeine example shows how an ultrarapid metabolizer can be harmed by a prodrug. A distinct-peak curve means one gene drives the response; a smooth bell curve means many genes do.</p>

<h4>The facts</h4>
<table class="reftab"><thead><tr><th>Genotype</th><th>Phenotype</th><th>Why</th></tr></thead><tbody>
<tr><td>Multiple gene copies (CYP2D6*2xN)</td><td>Ultrarapid metabolizer</td><td>Extra enzyme, very fast clearance or activation</td></tr>
<tr><td>Two wild-type copies</td><td>Extensive (normal) metabolizer</td><td>Common, middle of the distribution</td></tr>
<tr><td>CYP2D6*5/*5 (whole-gene deletion)</td><td>Poor metabolizer</td><td>No enzyme expressed; almost no metabolism</td></tr>
</tbody></table>
<p>More than 100 alleles exist; about 9 account for over 95% of phenotypes: *1 and *2 fully functional; *3, *4, *5, *6 nonfunctional; *10, *17, *41 reduced function.</p>

<h4>Why</h4>
<ul>
<li><b>Why the debrisoquine curve has three peaks.</b> Debrisoquine is cleared almost entirely by CYP2D6, so when you group people by the ratio of parent drug to its metabolite, 4-hydroxydebrisoquine, the trait is monogenic and separates into distinct peaks: ultrarapid, extensive, and poor. A smooth bell curve would mean many genes blur the data together.</li>
<li><b>Why codeine is dangerous in an ultrarapid metabolizer.</b> Codeine is a prodrug activated by CYP2D6 to morphine, so an ultrarapid metabolizer converts a normal dose quickly into a large amount of morphine and can suppress breathing. Children died after codeine for cough, so codeine cough syrup is no longer given to kids.</li>
<li><b>Why the poor metabolizer outcome depends on the drug.</b> For a drug CYP2D6 clears, a poor metabolizer accumulates it and has adverse effects at standard doses; for a prodrug CYP2D6 activates, a poor metabolizer makes too little active drug and has therapeutic failure.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"It metabolizes about 15 to 25% of the medications on the market, so that's a lot of work that it does" <small>(T) 10/22</small></li>
<li>"Codeine is metabolized by 2D6 to morphine, and if you're a super duper ultra rapid metabolizer, all of a sudden that normal dose of codeine is quickly gonna turn into morphine in your patient." <small>(T) 10/22</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Thinking distinct peaks mean several genes.</b> Distinct peaks mean one gene (monogenic); the smooth bell curve is the polygenic one.</li>
<li><b>Giving the ultrarapid metabolizer a super-dose of codeine.</b> Codeine is a prodrug, so fast activation overdoses; super-doses apply only to drugs CYP2D6 clears.</li>
<li><b>Calling *5 an ultrarapid allele.</b> *5 is a whole-gene deletion (poor metabolizer); extra copies (*2xN) make the ultrarapid metabolizer.</li>
</ul>

<p>How she asks it: the 15 to 25% figure; read the debrisoquine histogram and name the three phenotypes; match genotype to phenotype; the codeine respiratory-depression story; the functional groups of the nine alleles.</p>
<p class="sub">Sources: PGx-Examples-Students-Fall-2026.pdf slides 'CYP2D6 Polymorphisms' (pp. 20-22), 'Monogenic and Polygenic Effects' (p. 10); (T) 10/22. Questions L19-014 to L19-020, L19-044.</p>
</section>
<section class="guide" id="guide4-l19-4">
<h3>11. CYP2C9: warfarin and the narrow-therapeutic-index drugs</h3>

<h4>The idea</h4>
<p>CYP2C9 matters because it metabolizes several narrow-therapeutic-index drugs, where small changes in clearance change the outcome. Warfarin is the clean example: the variants give a clear gene-dose effect on clearance and on the starting dose a patient needs. CYP2C9 is also inhibited by many drugs, so an inhibitor on top of a low-activity variant compounds the loss.</p>

<h4>The facts</h4>
<ul>
<li>Narrow-therapeutic-index substrates: warfarin, phenytoin, glipizide, tolbutamide.</li>
<li>CYP2C9*2 keeps about 20% of wild-type activity; CYP2C9*3 keeps about 5% (her numbers; Katzung ch. 5 gives 30-40% and 80-90% reductions in S-warfarin metabolism instead).</li>
<li>CYP2C9*3/*3 homozygotes show about a 90% reduction in S-warfarin clearance versus *1/*1.</li>
<li>Usual warfarin starting dose about 5 mg/day; lowest-dose patients need about 1.5 mg/day, and at least 80% of them carry low-activity CYP2C9 variants.</li>
<li>Variant frequency: Caucasians about 30%; African Americans about 1 to 3%; East Asians about 0% in the population studied.</li>
</ul>

<h4>Why</h4>
<ul>
<li><b>Why low activity means a lower dose.</b> Warfarin is cleared by CYP2C9, so a low-activity variant clears it slowly and the drug builds up; the starting dose must be lowered to keep an anticoagulant with a narrow index out of the bleeding range.</li>
<li><b>Why two separate studies agree.</b> One study measured clearance and found the gene-dose drop (worst in *3/*3); a different study looked at who needed the lowest starting dose and found most carried the low-activity variants, so the dosing data strengthened the clearance data.</li>
<li><b>Why an inhibitor makes it worse.</b> An inhibitor lowers CYP2C9 activity, and a low-activity variant lowers it further, so the two add up and a substrate can reach concentrations that are too high.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"it does metabolism of a lot of our very narrow therapeutic index drugs, so things like warfarin that we've already talked to some about, and then phenytoin and glipizide" <small>(T) 10/22</small></li>
<li>"at least 80% of the people in that dosing category have these low activity variants of 2C9" <small>(T) 10/22</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Swapping the activity numbers.</b> *2 is about 20%, *3 is about 5%; *3 is the more severe loss.</li>
<li><b>Thinking the variant raises the dose.</b> These are reduced-function variants, so the patient needs a lower warfarin dose, not a higher one.</li>
<li><b>Treating inhibitor and variant as canceling.</b> They add together; both lower activity.</li>
</ul>

<p>How she asks it: name the CYP2C9 drugs; the *2 and *3 activity percentages; the 90% clearance reduction in *3/*3; the low starting dose and the 80% figure; what an inhibitor adds.</p>
<p class="sub">Sources: PGx-Examples-Students-Fall-2026.pdf slides 'CYP2C9 Polymorphisms' (p. 23), 'CYP2C9 Polymorphisms 2' (p. 24); (T) 10/22. Questions L19-021 to L19-025.</p>
</section>
<section class="guide" id="guide4-l19-5">
<h3>12. CYP2C19: the *17 gain of function, clopidogrel, and the PPI twist</h3>

<h4>The idea</h4>
<p>CYP2C19 is the day's mind-twister. It carries the first gain-of-function variant in the lecture (*17), and it drives two opposite clinical stories. For clopidogrel, a prodrug, both too little and too much activation are dangerous. For proton pump inhibitors (PPIs), being a poor metabolizer is actually good, because the drug has a wide therapeutic index. The whole point is to reason from variant to enzyme function to drug handling to patient outcome.</p>

<h4>The facts</h4>
<table class="reftab"><thead><tr><th>Allele</th><th>Function</th><th>Mechanism</th></tr></thead><tbody>
<tr><td>CYP2C19*2, *3</td><td>Inactive</td><td>Premature stop codon; no active enzyme</td></tr>
<tr><td>CYP2C19*17</td><td>Increased</td><td>Upstream (promoter) SNP raises expression; more enzyme made</td></tr>
</tbody></table>
<p>Substrates (slightly acidic): PPIs, fluoxetine, sertraline, diazepam. Phenotypes: poor, intermediate, extensive, ultrarapid. Over 30 alleles; four drive most phenotypes.</p>

<h4>Why</h4>
<ul>
<li><b>Why *17 increases activity.</b> The SNP sits in the upstream region where the machinery for expressing the gene binds, so more CYP2C19 is made and total activity rises; the increase is from more enzyme, not a changed enzyme structure.</li>
<li><b>Why clopidogrel cuts both ways.</b> Clopidogrel is a prodrug CYP2C19 helps activate, so a *2 or *3 carrier makes too little active drug and keeps sticky platelets (therapeutic failure), while a *17 carrier makes too much and is over-anticoagulated. That is why she argues patients should be genotyped before clopidogrel.</li>
<li><b>Why a poor metabolizer does better on a PPI.</b> Low activity keeps PPI levels higher, which raises gastric pH more and improves cure rates; this is safe because the therapeutic index of PPIs is very wide. For other CYP2C19 substrates such as SSRIs and diazepam, the same high levels bring more adverse drug responses (and more sedation with diazepam).</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"17 has increased function. OK. The reason for that is this snip is located in the upstream region of the gene where the machinery for expressing the gene sits down on the gene and starts its work." <small>(T) 10/22</small></li>
<li>"clopidogrel is a drug for which we should be genotyping people for their 2C19 status." <small>(T) 10/22</small></li>
<li>"they found that people had better treatment of their disease. When you had the low activity version of the enzyme increasing drug blood concentrations, you had better cure rates." <small>(T) 10/22</small></li>
</ul>

<p><b>The figure and the assigned paper.</b> The figure she showed (Examples p. 27, Furuta et al. 2004) used lansoprazole: "They were using lansoprazole, and they looked at the AUC here on this panel." <small>(T) 10/22</small> The assigned reading, Furuta et al., Annals of Internal Medicine 1998, treated 62 Japanese patients with omeprazole plus amoxicillin and reported H. pylori cure rates of 28.6%, 60% and 100% in the rapid, intermediate and poor metabolizers; its authors state that plasma omeprazole levels were not measured. Her discussion of the paper is set for Monday 10/26.</p>
<h4>Traps</h4>
<ul>
<li><b>Calling *17 a structural change.</b> *17 raises how much enzyme is made (expression); it does not change the enzyme's shape, and it is not extra gene copies.</li>
<li><b>Assuming a poor metabolizer is always harmed.</b> On a wide-index PPI the poor metabolizer benefits; the harm appears with SSRIs and diazepam.</li>
<li><b>Reversing the clopidogrel alleles.</b> *2 and *3 under-activate (sticky platelets); *17 over-activates (over-anticoagulation).</li>
<li><b>Reading the Furuta figure backward.</b> Poor metabolizers had the highest AUC and the highest gastric pH, not the extensive metabolizers.</li>
</ul>

<p>How she asks it: why *17 increases function and where the SNP sits; the clopidogrel outcome for each allele; why the PPI poor metabolizer benefits while the SSRI one does not; read the Furuta AUC/pH/cure-rate figure.</p>
<p class="sub">Sources: PGx-Examples-Students-Fall-2026.pdf slides 'CYP2C19 Polymorphisms' (p. 25), 'CYP2C19 Polymorphisms 2' (p. 26), 'CYP2C19 Polymorphisms 3' (p. 27, Furuta et al. 2004); (T) 10/22. Questions L19-026 to L19-033.</p>
</section>
<section class="guide" id="guide4-l19-6">
<h3>13. Two oncology examples: DPD (5-fluorouracil) and UGT1A1 (irinotecan)</h3>

<h4>The idea</h4>
<p>These two cancer-drug examples each add a twist. DPD is the main catabolic route that keeps 5-fluorouracil in check, so a low-activity variant pushes more drug into its toxic active form. UGT1A1 is needed to clear a toxic active metabolite of an already-active drug, so a low-activity variant lets that metabolite build up. Both can cause severe bone marrow suppression.</p>

<h4>The facts</h4>
<table class="reftab"><thead><tr><th>Gene / enzyme</th><th>Drug(s)</th><th>Variant</th><th>Effect</th><th>Consequence</th></tr></thead><tbody>
<tr><td>DPYD / DPD</td><td>5-fluorouracil, capecitabine, tegafur (antimetabolites)</td><td>Low-activity DPYD variants (not yet well characterized)</td><td>Less drug catabolized to inactive products</td><td>More cytotoxic metabolite: severe myelosuppression, mucositis, neurotoxicity, hand-foot syndrome, diarrhea</td></tr>
<tr><td>UGT1A1</td><td>Irinotecan (active drug), active metabolite SN-38</td><td>UGT1A1*28 (promoter region)</td><td>Reduced expression and glucuronidation</td><td>SN-38 accumulates: toxicity, bone marrow suppression</td></tr>
</tbody></table>

<h4>Why</h4>
<ul>
<li><b>Why low DPD activity increases toxicity.</b> About 80% of a 5-FU dose is normally catabolized by DPD to non-toxic products, so a low-activity variant sends more drug down the route that makes the active cytotoxic metabolite, and the worst result is myelosuppression that can be lethal.</li>
<li><b>Why UGT1A1 is a different twist.</b> Irinotecan is not a prodrug; it is already active and is further metabolized to the active SN-38, and UGT1A1 clears SN-38, so a *28 carrier with low expression cannot clear SN-38 and it accumulates to toxic levels. Here the enzyme is needed to remove a toxic metabolite, not to make or inactivate the parent drug.</li>
<li><b>Why *28 is the opposite of *17.</b> Both are promoter-region variants, but *28 decreases expression (less enzyme) while CYP2C19*17 increases it, so you must track each variant's direction rather than assume promoter variants behave alike.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"this enzyme is important when we're using some of our ... chemotherapy drugs like 5 fluorouracil" <small>(T) 10/22</small></li>
<li>"this variant in the promoter region decreases the expression of this enzyme" <small>(T) 10/22</small></li>
<li>"what clears SN 38 from the body is UGT 1A1." <small>(T) 10/22</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Calling irinotecan a prodrug.</b> Irinotecan is active; the problem is failure to clear its active metabolite SN-38, not failure to activate it. (Katzung ch. 5 calls irinotecan a prodrug; for her exam, use her answer.)</li>
<li><b>Giving *28 an increasing effect.</b> UGT1A1*28 decreases expression and glucuronidation.</li>
<li><b>Treating DPYD as well characterized.</b> She flagged it as a coming area; the low-activity variants are still being identified.</li>
</ul>

<p>How she asks it: which drugs DPD and UGT1A1 handle; what low activity does to toxicity for each; why irinotecan is not a prodrug; compare UGT1A1*28 with CYP2C19*17.</p>
<p class="sub">Sources: PGx-Examples-Students-Fall-2026.pdf slides 'Dihydropyrimidine Dehydrogenase (DPD)' (p. 29), 'UDP-Glucuronosyl-transferase (UGT1A1)' (p. 30); (T) 10/22. Questions L19-034 to L19-039.</p>
</section>
<section class="guide" id="guide4-l19-7">
<h3>14. Thiopurine methyltransferase (TPMT) and the thiopurines</h3>

<h4>The idea</h4>
<p>TPMT is the last metabolizing enzyme she started on 10/22 (the discussion finishes on Monday). It routes 6-mercaptopurine away from the active metabolite. When TPMT activity is low, more drug reaches the active 6-thioguanine nucleotides, which stop cancer cells from dividing but also suppress bone marrow, so the thiopurine dose must be reduced.</p>

<h4>The facts</h4>
<ul>
<li>Thiopurines: azathioprine (immunosuppressant, a prodrug) is converted to 6-mercaptopurine; mercaptopurine is used for cancer.</li>
<li>6-mercaptopurine has competing routes: xanthine oxidase and TPMT make inactive products; another pathway makes the active 6-thioguanine nucleotides.</li>
<li>Two SNPs account for over 90% of inactivating alleles. TPMT*3A (two nonsynonymous SNPs) is the common Caucasian variant; TPMT*3C (one SNP) is the East Asian variant.</li>
<li>Phenotype: extensive, intermediate, poor; measured as enzyme activity in red blood cells.</li>
</ul>

<h4>Why</h4>
<ul>
<li><b>Why low TPMT activity causes myelosuppression.</b> TPMT normally shunts some 6-mercaptopurine to an inactive methylated product, so when its activity is low more drug goes down the pathway to 6-thioguanine nucleotides, and the extra active metabolite suppresses blood cells.</li>
<li><b>Why the dose must drop.</b> The active metabolite that treats cancer is the same one that kills blood cells, so a poor metabolizer on a standard dose risks severe immunosuppression and must be given much less drug.</li>
<li><b>Why azathioprine and mercaptopurine are used differently.</b> Azathioprine is given for immunosuppression and becomes 6-mercaptopurine, while mercaptopurine is given directly for cancer because its kinetics suit that use.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"Azathioprine, we use it as an immunosuppressant. It's a prodrug. In the body, it gets metabolized or changed really to mercaptopurine." <small>(T) 10/22</small></li>
<li>"we've got azathioprine. And we have mercaptopurine." <small>(T) 10/22</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Thinking low TPMT means the drug fails.</b> Low activity sends more drug to the active metabolite, so toxicity rises; the drug is not inactivated.</li>
<li><b>Calling *3A a gain-of-function allele.</b> *3A and *3C are inactivating.</li>
<li><b>Mixing up the common variant by population.</b> *3A predominates in Caucasians, *3C in East Asians.</li>
</ul>

<p>How she asks it: which drugs TPMT handles and the azathioprine-to-mercaptopurine link; what low activity does to the pathway and to the blood count; the two SNPs and which variant goes with which population.</p>
<p class="sub">Sources: PGx-Examples-Students-Fall-2026.pdf slides 'Thiopurine Methyltransferase (TPMT)' (pp. 31-33); (T) 10/22. Questions L19-040 to L19-043.</p>
</section>
<section class="guide" id="guide4-l20-1">
<h3>15. TPMT: the activity histogram and genotype-guided thiopurine dosing</h3>

<h4>The idea</h4>
<p>TPMT is the last metabolizing-enzyme example, and one where the dose is set by genotype. TPMT sends 6-mercaptopurine to an inactive product. When TPMT activity is low, more of the dose becomes the active 6-thioguanine nucleotides (6-TGN), and a standard dose can cause fatal myelosuppression. Genotyping before a thiopurine is now the standard of care, and she said not knowing a patient's TPMT status could be considered negligent.</p>

<h4>The facts</h4>
<table class="reftab"><thead><tr><th>TPMT genotype</th><th>Place on the RBC activity histogram</th><th>Mercaptopurine dose</th></tr></thead><tbody>
<tr><td>Homozygous wild type (*1/*1)</td><td>Largest peak, highest activity (most people)</td><td>Full dose</td></tr>
<tr><td>Heterozygous (*1/*3A or *1/*3C)</td><td>Smaller intermediate group</td><td>About 35% of the wild-type dose, less than half (her words)</td></tr>
<tr><td>Homozygous *3A or *3C</td><td>Very small group, lowest activity</td><td>All need a reduction; tolerate less than 10% of the wild-type dose</td></tr>
</tbody></table>
<ul>
<li>*3A (Caucasians) is a haplotype of two non-synonymous SNPs: about 5% are heterozygous and about 1 in 300 are homozygous. *3C (East Asians) is one SNP in the coding region.</li>
<li>Before genotyping, the phenotype came from TPMT activity in red blood cells, and doses were adjusted from that.</li>
<li>The thiopurines were the first drugs for which the FDA held public hearings on putting pharmacogenetic information in the label.</li>
<li>Cheok and Evans (Nature Reviews Cancer, 2006): when everyone gets the same dose, v/v patients have very high 6-TGN and the most toxicity. When doses are individualized, 6-TGN and toxicity are similar and low in all groups.</li>
</ul>

<h4>Why</h4>
<ul>
<li><b>Why low TPMT is dangerous.</b> TPMT makes the inactive 6-methylmercaptopurine. With little TPMT activity, more 6-mercaptopurine goes to 6-TGN, and 6-TGN stops dividing cells. Blood cells stop dividing too, so the white count drops.</li>
<li><b>Why hair loss and GI distress occur.</b> These cells are not cancerous but they divide rapidly. The drugs cannot tell them apart from cancer cells.</li>
<li><b>Why the dose follows genotype.</b> The same dose gives very different 6-TGN exposure by genotype. Matching the dose to the genotype brings exposure back into one range, so toxicity stays low.</li>
<li><b>Why the histogram matters.</b> For TPMT most people are wild type at the high-activity end. The wild type cannot be assumed to sit in the middle of a distribution.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"It's not half the dose, it's about 35% is lower than half the dose, OK?" <small>(T) 10/26</small></li>
<li>"So we can't assume that most people are intermediate, OK, and you can't assume that the wild type is always in the middle" <small>(T) 10/26</small></li>
<li>"You could be considered negligent if you didn't know this information about your patient before you put them on one of these medications, OK?" <small>(T) 10/26</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Giving heterozygotes half the dose.</b> She said about 35%, which is lower than half. (The slide words it as 35% of heterozygotes needing a decrease.)</li>
<li><b>Swapping the dose numbers.</b> Less than 10% is for homozygous deficient patients; about 35% is for heterozygotes.</li>
<li><b>Thinking low TPMT makes the drug fail.</b> Low TPMT activity means more active metabolite and more toxicity.</li>
<li><b>Reading the Cheok and Evans figure backward.</b> With a uniform dose, v/v (variant/variant) has the highest 6-TGN and toxicity, not wt/wt.</li>
</ul>

<p>How she asks it: what rises when TPMT*3A is present; where the wild type sits on the histogram; the dose for heterozygotes and for homozygous deficient patients; what the conventional and individualized arms of the Cheok and Evans figure show.</p>
<p class="sub">Sources: PGx-Examples-Students-Fall-2026.pdf slides 'Thiopurine Methyltransferase (TPMT)' 2-5 (pp. 32-35), 'Dosing 6MP without pharmacogenetics' (p. 36), 'Dosing 6MP with pharmacogenetics' (p. 37), 'Acute lymphoblastic leukaemia' (p. 38); (T) 10/26. Questions L20-001 to L20-012.</p>
</section>
<section class="guide" id="guide4-l20-2">
<h3>16. Drug transporters and P-glycoprotein (ABCB1)</h3>

<h4>The idea</h4>
<p>Transporters are the second big area of pharmacogenomics. P-glycoprotein (P-gp) is the best characterized of them. It is an efflux transporter in the gut wall that pumps drugs back into the lumen. A low-activity P-gp variant therefore raises the bioavailability of its substrates. Her main example is digoxin, which has a narrow therapeutic index.</p>

<h4>The facts</h4>
<ul>
<li>Transporters move drugs across the GI tract, excrete drugs into bile and urine, and carry drugs across the blood-brain barrier. They are found in gut cells (enterocytes), liver cells (hepatocytes) and kidney proximal tubule cells, on both the luminal side and the blood (basolateral) side.</li>
<li>P-gp is coded by ABCB1, a gene also called MDR1 (multidrug resistance-1). These are two names for one gene; ABCB1 is the newer name.</li>
<li>P-gp affects the distribution of digoxin, cyclosporine, tacrolimus and the antiretroviral protease inhibitors.</li>
<li>Increased intestinal P-gp expression can limit absorption. Decreased expression may give supratherapeutic plasma concentrations.</li>
<li>Common SNPs: exon 12 (C1236T), exon 21 (G2677T), exon 26 (C3435T). Exons 21 and 26 are linked to digoxin. Exon 26 is linked to protease inhibitor levels and clinical effects. In the initial studies, exon 21 was not linked to the protease inhibitors.</li>
</ul>

<h4>Why</h4>
<ul>
<li><b>Why low P-gp activity raises drug levels.</b> P-gp pumps substrates out of the gut cells and back into the lumen. When P-gp works poorly, the drug stays in the cells (cellular concentration rises sharply) and more of it reaches the blood. This has the same effect as taking a P-gp inhibitor.</li>
<li><b>Why digoxin is the example.</b> Its therapeutic index is narrow. In a low-activity P-gp patient, a normal dose can push the heart rate far too low, so the dose would be adjusted.</li>
<li><b>Why P-gp is still hard to pin down.</b> A variant's effect changes with the drug, different lab cell systems give different results, and the partner transporters on the basolateral side are not all characterized yet.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"So this image is synonymous with what happens if you have a low activity variant of PGP. You will end up with higher bioavailability of drugs that are substrates for PGP." <small>(T) 10/26</small></li>
<li>"This transporter is not coded by two different genes. It's coded by a gene that has two different names, OK." <small>(T) 10/26</small></li>
<li>"Remember, B is for blood side, OK?" <small>(T) 10/26</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Lower P-gp, lower absorption.</b> This is backward. Less efflux means more absorption.</li>
<li><b>ABCB1 and MDR1 as two genes.</b> They are one gene with an old name and a new name.</li>
<li><b>Exon 21 and the protease inhibitors.</b> Only the exon 26 SNP was tied to the protease inhibitors. Both exon 21 and exon 26 were tied to digoxin.</li>
<li><b>Basolateral as the gut side.</b> Basolateral is the blood side.</li>
</ul>

<p>How she asks it: name the narrow-index P-gp substrate (digoxin); what a low-activity variant does to bioavailability; read the plasma and cellular curves (dashed line = variant); ABCB1 versus MDR1; which exon goes with which drug; why you characterize transporters ("to adjust the dose").</p>
<p class="sub">Sources: PGx-Examples-Students-Fall-2026.pdf slides 'Variants in Drug Transporters' and 'Variations in Drug Transporting Genes' 1-5 (pp. 39-44), 'P-Glycoprotein' 1-2 (pp. 45-46); (T) 10/26. Questions L20-013 to L20-023.</p>
</section>
<section class="guide" id="guide4-l20-3">
<h3>17. OATP1B1 (SLCO1B1) and simvastatin</h3>

<h4>The idea</h4>
<p>OATP1B1 is the second transporter she covered and a newer one than P-gp. It sits in the liver and takes statins up into liver cells. Reduced-function SLCO1B1 variants leave much more simvastatin in the plasma. High statin levels break down muscle, and the breakdown products damage the kidneys. That is why patients are now often genotyped for *5, *15 and *17.</p>

<h4>The facts</h4>
<table class="reftab"><thead><tr><th>Allele</th><th>What it is</th><th>Function</th><th>Frequency</th></tr></thead><tbody>
<tr><td>*5</td><td>rs4149056: 521T&gt;C, Val174Ala (one SNP)</td><td>Reduced, possibly from reduced expression</td><td>Rare, about 1%</td></tr>
<tr><td>*15, *17</td><td>Haplotypes that contain rs4149056 plus other SNPs</td><td>Reduced</td><td>Common, 5% to 15% in European and Asian populations</td></tr>
</tbody></table>
<ul>
<li>Gene SLCO1B1, protein OATP1B1. It is found on the hepatocyte sinusoidal membrane and handles hepatic uptake of weakly acidic drugs and endogenous compounds (statins, methotrexate, bilirubin). At least 40 non-synonymous SNPs are known.</li>
<li>Homozygous rs4149056 genotypes are *5/*5, *5 with *15 or *17, and *15 or *17 with *15 or *17. These patients have a large increase in simvastatin plasma AUC.</li>
<li>Recommendation for at least one nonfunctional allele: lower the simvastatin dose or give another statin.</li>
</ul>

<h4>Why</h4>
<ul>
<li><b>Why exposure rises.</b> OATP1B1 takes simvastatin into the liver. A reduced-function transporter takes up less, so more simvastatin stays in the plasma.</li>
<li><b>Why high levels are dangerous.</b> High statin levels cause muscle breakdown, and muscle pain in the large muscles is the warning symptom. In rhabdomyolysis the contents of the muscle cells enter the blood and damage the kidneys.</li>
<li><b>Why *15 and *17 count as homozygous with *5.</b> Each of them contains the *5 SNP. So any two of these alleles give two copies of rs4149056.</li>
<li><b>Why switch statins.</b> She said some other statins cause less rhabdomyolysis, so a different statin may be better than a lower dose.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"Remember, these two are haplotypes, which means they contain more than one snip." <small>(T) 10/26</small></li>
<li>"It'll cause kidney damage, OK?" <small>(T) 10/26</small></li>
<li>"it might be wise to, instead of just lowering the statin, maybe you want to give a different statin" <small>(T) 10/26</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Putting OATP1B1 in the gut.</b> It is in the liver, on the sinusoidal membrane, and it handles uptake.</li>
<li><b>Treating *15 and *17 as unrelated to *5.</b> Both contain the *5 SNP.</li>
<li><b>Calling *5 common.</b> *5 alone is about 1%. The haplotypes *15 and *17 are the common ones.</li>
<li><b>The 221 figure.</b> The slide gives a 221% increase in AUC. She read it aloud as "221 times". Either way the increase is large, and it applies to the homozygous rs4149056 genotypes.</li>
</ul>

<p>How she asks it: gene, protein and location; what *5 is; how *15 and *17 relate to *5; what high statin levels cause; what to do for a patient with a nonfunctional allele.</p>
<p class="sub">Sources: PGx-Examples-Students-Fall-2026.pdf slide 'Organic anion transporter' (p. 47); (T) 10/26. Questions L20-024 to L20-029.</p>
</section>
<section class="guide" id="guide4-l20-4">
<h3>18. Drug-target receptors: beta-1, beta-2, EGFR and G proteins</h3>

<h4>The idea</h4>
<p>Drug targets are the third area of pharmacogenomics. They are less well characterized than metabolizing enzymes and perhaps about as well characterized as transporters, and she gave only what she considers good science. A target variant can change how well a drug works, as with the beta-1 receptor and metoprolol. A target variant can also cause the disease itself, so the drug is chosen because it hits that variant, as with EGFR and gefitinib.</p>

<h4>The facts</h4>
<table class="reftab"><thead><tr><th>Target (gene)</th><th>Variant</th><th>Drug</th><th>What is known</th></tr></thead><tbody>
<tr><td>Beta-1 receptor (ADRB1)</td><td>Ser49Gly, Arg389Gly (non-synonymous)</td><td>Metoprolol, beta-blockers</td><td>Homozygous Ser49 and Arg389 (wild type) responded better; genotype may guide the choice of starting drug</td></tr>
<tr><td>Beta-2 receptor (ADRB2)</td><td>More than 11 SNPs; 3 frequent: Arg16Gly, codon 27, promoter</td><td>Beta-2 agonists (albuterol)</td><td>Arg16Gly results unclear; not likely to lead to genotyping</td></tr>
<tr><td>EGFR (HER1, ErbB1)</td><td>Gain-of-function; receptor overexpressed in non-small cell lung cancer</td><td>Gefitinib</td><td>Response strongly influenced by the mutation (2004); use only when the tumor has variant EGFR</td></tr>
<tr><td>G proteins coupled to receptors</td><td>Variants, especially in the alpha subunit</td><td>Some antidepressants</td><td>A very new area; efficacy associated with the variants</td></tr>
</tbody></table>
<ul>
<li>Beta-2 figure: at codon 16, A changes to G, so AGA (arginine) becomes GGA (glycine). Arg16 is called the wild type because it was identified first.</li>
<li>The DiPiro Table 6-2 slide lists many genes and drug classes. She said it does not need to be memorized.</li>
</ul>

<h4>Why</h4>
<ul>
<li><b>Why a beta-1 variant changes metoprolol response.</b> The variant changes the receptor, so metoprolol may not bind as well. A patient with the variants may respond poorly, so it is worth thinking twice before starting metoprolol.</li>
<li><b>Why gefitinib is not for every lung cancer.</b> Epidermal growth factor binds EGFR and signals the cell to divide. In some tumors a gain-of-function EGFR is overexpressed and drives division. Gefitinib binds the inside of the receptor and blocks the signal, so it works only when the tumor has that variant EGFR.</li>
<li><b>Why G proteins matter.</b> A response that looks like it comes from the receptor may actually come from the G protein coupled to it.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"They found that patients that were homozygous for the serine, and then for the arginine, so the wild type, they had a better response to the drug." <small>(T) 10/26</small></li>
<li>"So in this realm, we're using this drug to assure efficacy, right? We're individualizing their care." <small>(T) 10/26</small></li>
<li>"This again, is not something that is likely to result in people being genotyped." <small>(T) 10/26</small> (on ADRB2)</li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Mixing up the beta-1 and beta-2 SNPs.</b> Ser49Gly and Arg389Gly are in ADRB1. Arg16Gly is in ADRB2.</li>
<li><b>Thinking the variant gives the better metoprolol response.</b> The wild type responded better.</li>
<li><b>Giving gefitinib to everyone because everyone has EGFR.</b> Only tumors with the overexpressed variant EGFR respond.</li>
<li><b>Placing the G-protein variants in the receptor.</b> They are in the G protein coupled to the receptor, not in the receptor itself.</li>
</ul>

<p>How she asks it: the ADRB1 SNPs and which genotype responds better to metoprolol; the state of the ADRB2 evidence; the endogenous ligand of EGFR; who should not get gefitinib; how the EGFR example differs from the beta-1 example.</p>
<p class="sub">Sources: PGx-Examples-Students-Fall-2026.pdf slides 'Variants in Drug Targets' (p. 48), 'Variations of Drug Targets' (p. 49, DiPiro Table 6-2), 'Receptors' 1-4 (pp. 50-53), 'Signaling Pathways' (p. 54, DiPiro Fig. 6-5); (T) 10/26. Questions L20-030 to L20-040.</p>
</section>
<section class="guide" id="guide4-l20-5">
<h3>19. Drug-target enzymes: 5-lipoxygenase (ALOX5) and ACE</h3>

<h4>The idea</h4>
<p>Enzymes can be drug targets too. Both of her examples break the expected pattern. In the first, the ALOX5 promoter repeat changes response to 5-lipoxygenase inhibitors without changing how severe the asthma is. In the second, the ACE insertion/deletion variant does not seem to change ACE inhibitor efficacy, but it probably changes the risk of adverse effects.</p>

<h4>The facts</h4>
<table class="reftab"><thead><tr><th>Target (gene)</th><th>Variant</th><th>Drug</th><th>What the variant is linked to</th></tr></thead><tbody>
<tr><td>5-lipoxygenase (ALOX5)</td><td>Tandem repeats in the promoter; the 5-repeat allele is thought to increase expression</td><td>5-lipoxygenase inhibitors (asthma)</td><td>Only subjects with at least one 5-repeat allele responded; no link to asthma severity</td></tr>
<tr><td>Angiotensin-converting enzyme (ACE)</td><td>Insertion/deletion in intron 16; associated with plasma ACE levels</td><td>ACE inhibitors</td><td>Not clearly efficacy; probably adverse reactions (cough in about 10%; angioedema in 0.1% to 0.2%)</td></tr>
</tbody></table>

<h4>Why</h4>
<ul>
<li><b>Why a variant can change treatment without changing the disease.</b> 5-lipoxygenase has a role in asthma. The repeat alters the amount of the drug's target, so it changes how the inhibitor works, but it does not make the asthma worse or better. The slide's point is that a polymorphism need not cause a disease to influence its treatment.</li>
<li><b>Why the ACE and angioedema link is unproven.</b> Angioedema occurs in only 0.1% to 0.2% of patients on ACE inhibitors. A study would need a very large population to enroll enough cases to genotype. Until then, genotyping cannot be used to keep at-risk patients off the drug class.</li>
<li><b>What a proven link would allow.</b> A patient could be genotyped for the ACE InDel, and a carrier's hypertension could be treated another way.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"We don't always need to have a disease um being caused by that polymorphism to impact the, the treatment of it, OK?" <small>(T) 10/26</small></li>
<li>"The genetic variant for the ACE gene. Is not seeming to impact the efficacy of ACE inhibitors. This genetic variant is impacting the risk of side effects to the ACE inhibitors." <small>(T) 10/26</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Linking the ALOX5 repeat to asthma severity.</b> It is linked to drug response, not to severity.</li>
<li><b>Linking the ACE variant to efficacy.</b> On the ACE slide (p. 56) she said the variant "Is not seeming to impact the efficacy of ACE inhibitors" and stressed adverse effects instead, which she called "weird". Earlier, reading the ACE row of the DiPiro Table 6-2 slide (p. 49), she had described a change in blood-pressure response; the ACE slide is her later and more specific statement.</li>
<li><b>Mixing up the ACE percentages.</b> Cough is about 10%. Angioedema is 0.1% to 0.2%.</li>
<li><b>Calling the ACE variant a SNP.</b> It is an insertion/deletion (InDel) in intron 16.</li>
</ul>

<p>How she asks it: which ALOX5 genotype responds to the inhibitor; the point that a variant need not cause a disease to change its treatment; what kind of variant ACE carries; efficacy versus adverse effects; why the angioedema link needs a very large study.</p>
<p class="sub">Sources: PGx-Examples-Students-Fall-2026.pdf slides 'Variations of Drug Targets: Enzymes' (p. 55), 'Enzymes 2' (p. 56); (T) 10/26. Questions L20-041 to L20-045.</p>
</section>
<section class="guide" id="guide4-l20-6">
<h3>20. Warfarin: CYP2C9 (PK), VKORC1 (PD) and CYP4F2</h3>

<h4>The idea</h4>
<p>Warfarin is the integrated example. Most drugs of genetic concern involve one gene at a time, but warfarin dosing depends on a metabolizing enzyme (CYP2C9, pharmacokinetics), on its target (VKORC1, pharmacodynamics), and on CYP4F2, which inactivates vitamin K. When low activity in the target and low activity in the enzyme occur together, she called it a "double whammy": the patient needs the lowest dose to prevent bleeding.</p>

<h4>The facts</h4>
<table class="reftab"><thead><tr><th>Gene</th><th>Role</th><th>Low-activity variant</th><th>Warfarin need</th></tr></thead><tbody>
<tr><td>CYP2C9 (*2, *3)</td><td>Metabolizes S-warfarin to inactive 7-OH warfarin (PK)</td><td>Reduced activity, not absent; *3 lowest</td><td>Lower</td></tr>
<tr><td>VKORC1 (haplotypes)</td><td>Vitamin K epoxide reductase, the drug target (PD)</td><td>Low-activity target</td><td>Lower</td></tr>
<tr><td>CYP4F2</td><td>Metabolizes reduced (active) vitamin K to an inactive form</td><td>Active vitamin K rises</td><td>Higher</td></tr>
</tbody></table>
<ul>
<li>Mechanism: warfarin inhibits vitamin K epoxide reductase, so vitamin K epoxide is not reduced back to its active form. Gamma-glutamyl carboxylase then cannot make active clotting factors. Vitamin K is the antidote in overdose.</li>
<li>S-warfarin has the most activity and is cleared mainly by CYP2C9. R-warfarin is weak and is cleared by multiple CYPs. Both act on VKORC1.</li>
<li>Dose example from her questions: wild type for both genes, about 5 mg/day; CYP2C9*3/*3 with wild-type VKORC1, less; homozygous variant for both, the lowest.</li>
<li>Body weight and gender also play a role in warfarin dosing.</li>
</ul>

<h4>Why</h4>
<ul>
<li><b>Why a low-activity CYP2C9 means a lower dose.</b> Warfarin is cleared more slowly, so the same dose builds up higher.</li>
<li><b>Why a low-activity VKORC1 means a lower dose.</b> When the target itself is less active, less drug is needed to inhibit it.</li>
<li><b>Why a low-activity CYP4F2 means a higher dose.</b> Less active vitamin K is inactivated, so more active vitamin K is present. That is like having more of the antidote on board, so more warfarin is needed. A more active CYP4F2 works the other way.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"If the target of the drug is not very active in one patient compared to another patient, you don't need so much of the drug in that patient that has the genetic variant." <small>(T) 10/26</small></li>
<li>"So you got kind of a double whammy here possible in patients for how much warfarin they need." <small>(T) 10/26</small></li>
<li>"Which means you've basically got more of the antidote for warfarin on board, right?" <small>(T) 10/26</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Saying CYP2C9*2 and *3 make no enzyme.</b> They reduce activity. It is CYP2C19*2 and *3 that make no active enzyme.</li>
<li><b>Swapping PK and PD.</b> CYP2C9 is PK (clearance). VKORC1 is PD (the target).</li>
<li><b>Lowering the dose for low CYP4F2.</b> Low CYP4F2 raises active vitamin K, so the warfarin need goes up.</li>
<li><b>Swapping the enantiomers.</b> S-warfarin is the potent one and is cleared by CYP2C9. R-warfarin is weak.</li>
</ul>

<p>How she asks it: warfarin's mechanism; which gene is PK and which is PD; rank the dose needs by genotype combination; reason through low or high CYP4F2 activity; which factors affect warfarin dosing.</p>
<p class="sub">Sources: PGx-Examples-Students-Fall-2026.pdf slides 'Integrated: Both PK and PD' (p. 57), 'Both PK and PD 2' (p. 58, Goodman and Gilman); (T) 10/26. Questions L20-046 to L20-053.</p>
</section>
<section class="guide" id="guide4-l20-7">
<h3>21. Immune system variants: HLA genes and drug hypersensitivity</h3>

<h4>The idea</h4>
<p>She called immune-system variation the newest and hottest area of pharmacogenomics. Many biologicals now on the market have immunologically based side effects, some of them autoimmune, and these are hard to predict. Certain HLA variants identify people at risk for severe, sometimes fatal, hypersensitivity reactions to specific drugs.</p>

<h4>The facts</h4>
<table class="reftab"><thead><tr><th>HLA variant</th><th>Drug and adverse effect (Katzung Table 5-4)</th></tr></thead><tbody>
<tr><td>HLA-B*57:01</td><td>Abacavir-induced skin toxicity (she said this can be fatal)</td></tr>
<tr><td>HLA-B*15:02</td><td>Carbamazepine-induced skin toxicity (potentially fatal)</td></tr>
<tr><td>HLA-B*58:01</td><td>Allopurinol-induced skin toxicity</td></tr>
<tr><td>HLA-DRB1*15:01, DRB5*01:01, DQB1*06:02 haplotype</td><td>Amoxicillin-clavulanate-induced liver injury</td></tr>
</tbody></table>
<ul>
<li>HLA molecules are receptors on antigen-presenting cells. They present antigen to T cells to start an immune response.</li>
<li>HLA-B, HLA-DQ and HLA-DR polymorphisms have been associated with many drug-induced hypersensitivity reactions.</li>
<li>Prevalence of these variants varies across populations and is not yet well defined.</li>
<li>The two variants she said she will spend time on are HLA-B*57:01 and HLA-B*15:02.</li>
</ul>

<h4>Why</h4>
<ul>
<li><b>Why an HLA variant causes a drug reaction.</b> The variant may change the antigen-binding site of the HLA molecule. The molecule may then recognize peptides that are not true antigens and start an immune response against them.</li>
<li><b>Why this area is growing.</b> As more biologicals reach the market, immune-based adverse effects become more common. More variants will be added to the table as they are identified.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"They are the receptor that will present the antigen to your T cell." <small>(T) 10/26</small></li>
<li>"Probably the hottest area of pharmacogenomics. It's the newest area." <small>(T) 10/26</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Swapping the two HLA-B variants.</b> B*57:01 goes with abacavir. B*15:02 goes with carbamazepine.</li>
<li><b>Treating HLA variants as metabolism or transport variants.</b> They change immune recognition, not drug handling.</li>
<li><b>Calling this the oldest area.</b> She called it the newest.</li>
</ul>

<p>How she asks it: what HLA molecules do; how a variant can cause hypersensitivity; match HLA-B*57:01 and HLA-B*15:02 to their drugs.</p>
<p class="sub">Sources: PGx-Examples-Students-Fall-2026.pdf slides 'Variations in Immune System Function' (p. 59), 'Immune System Function 2' (p. 60, Katzung Table 5-4); (T) 10/26. Questions L20-054 to L20-056.</p>
</section>
<section class="guide" id="guide4-l20-8">
<h3>22. The Furuta 1998 discussion: CYP2C19, omeprazole and H. pylori cure</h3>

<h4>The idea</h4>
<p>Furuta et al. (Annals of Internal Medicine, 1998) treated Japanese patients with H. pylori infection with omeprazole plus one antibiotic, amoxicillin, and compared cure rates by CYP2C19 genotype. Patients with no active CYP2C19 (poor metabolizers) had the best cure rate. She used the paper to make students work from the paper's old allele labels to star nomenclature, and from genotype to enzyme activity. She also asked whether a Japanese result applies in the United States.</p>

<h4>The facts</h4>
<table class="reftab"><thead><tr><th>Group (Table 1)</th><th>Genotypes (star)</th><th>CYP2C19 activity</th><th>H. pylori cure rate (Table 2)</th></tr></thead><tbody>
<tr><td>1</td><td>wt/wt (*1/*1)</td><td>Normal (rapid-extensive)</td><td>28.6%</td></tr>
<tr><td>2</td><td>wt/m1, wt/m2 (*1/*2, *1/*3)</td><td>Some: one *1 allele (intermediate-extensive)</td><td>60%</td></tr>
<tr><td>3</td><td>m1/m2, m1/m1 (*2/*3, *2/*2)</td><td>None (poor metabolizer)</td><td>100%</td></tr>
</tbody></table>
<ul>
<li>62 Japanese patients, mostly middle-aged men, with gastric or duodenal ulcer and H. pylori infection.</li>
<li>Regimen: omeprazole 20 mg for 8 weeks (gastric ulcer) or 6 weeks (duodenal ulcer), plus amoxicillin 500 mg four times a day for 2 weeks.</li>
<li>In the United States, H. pylori is usually treated with triple therapy: a PPI with two antibiotics.</li>
<li>The paper calls the enzyme S-mephenytoin 4'-hydroxylase, an older name for CYP2C19.</li>
<li>In star nomenclature, m1 = *2, m2 = *3 and wild type = *1. No patient was m2/m2 (*3/*3).</li>
</ul>

<h4>Why</h4>
<ul>
<li><b>Why group 3 has no activity.</b> CYP2C19*2 and *3 are SNPs that create a premature stop codon. Each makes a protein too short to work, so a person with any two of them has no active enzyme.</li>
<li><b>Why the missing *3/*3 does not matter.</b> *2 and *3 are both inactive, so a *3/*3 patient would simply belong in group 3. The gap only reflects who was recruited.</li>
<li><b>Why poor metabolizers were cured more often.</b> The discussion section gives the reasons. Omeprazole stays high, so stomach pH stays higher. Amoxicillin is unstable at low pH, so it is more stable at the higher pH. Omeprazole also helps get amoxicillin into the gastric juice, where H. pylori is. (The paper gives a fourth reason, omeprazole's own activity against H. pylori, which she did not mention.)</li>
<li><b>Why the result does not transfer directly to the U.S.</b> *2 and *3 are relatively frequent in the Japanese population. The paper gives the poor-metabolizer genotype as 18% to 23% in Japanese persons versus 3% to 5% in white U.S. or European populations. With genotyping, the same response is expected and only the group sizes differ, so fewer antibiotics might be possible for the right genotypes.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"What I wanted to point out to you guys is that in this population, they were effectively using a PPI and 1 antibiotic." <small>(T) 10/26</small></li>
<li>"You guys have to be able to drill down from your phenotype of your patient to the molecular structure of the DNA and know what is star 2? What is star 3? Why is that enzyme not active in this person?" <small>(T) 10/26</small></li>
<li>"So can we generalize this study to the United States? Not on the face of it." <small>(T) 10/26</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Thinking group 2 has no activity.</b> One *1 allele still makes functional enzyme.</li>
<li><b>Swapping m1 and m2.</b> m1 is *2 and m2 is *3.</li>
<li><b>Confusing the drugs with the 10/22 figure.</b> The 1998 paper used omeprazole with amoxicillin. Lansoprazole was the 2004 figure shown on 10/22.</li>
<li><b>Treating the result as universal.</b> Without genotyping it does not transfer directly, because allele frequencies differ between populations.</li>
<li><b>Expecting plasma levels from this paper.</b> She said group 3 had the highest AUC. The paper cites relative omeprazole AUCs (1:3.7:20) from earlier work but states that it did not measure plasma omeprazole levels.</li>
</ul>

<p>How she asks it: population and regimen; whether one antibiotic is U.S. practice; the enzyme's other name; translate m1 and m2; which genotype was missing and why that is acceptable; why *2 and *3 are inactive; which group had the best cure rate and the discussion's reasons; whether the result generalizes.</p>
<p class="sub">Sources: FurutaAnnIntMed1998.pdf (reading card furuta-1998: pp. 1027-1029, Tables 1-2, Discussion); PGx-Examples-Students-Fall-2026.pdf slide 'Discussion of Furuta article' (p. 61); (T) 10/26. Questions L20-057 to L20-066.</p>
</section>
<section class="guide" id="guide4-l21-1">
<h3>23. The FDA tables: pharmacogenetic associations and biomarkers in drug labeling</h3>

<h4>The idea</h4>
<p>The FDA keeps two online tables that list drugs with a known gene-drug link. They answer different questions. The Table of Pharmacogenetic Associations is a first look: it shows which drugs have pharmacogenetic implications, grouped by how strong the data are, but it gives no guidance on clinical use. She called it "a lightweight". The Table of Pharmacogenomic Biomarkers in Drug Labeling is the one she prefers: it lists every FDA-approved drug whose label contains pharmacogenomic information and tells you which section of the label to open. </p>

<h4>The facts</h4>
<table class="reftab"><thead><tr><th>Feature</th><th>Table of Pharmacogenetic Associations</th><th>Table of Pharmacogenomic Biomarkers in Drug Labeling</th></tr></thead><tbody>
<tr><td>What it lists</td><td>Drugs for which the FDA believes there is sufficient evidence that certain genetic variants alter drug metabolism, therapeutic effect, or the risk of adverse events</td><td>FDA-approved drugs with pharmacogenomic information in their labeling, with specific actions based on the biomarker where appropriate</td></tr>
<tr><td>How it is organized</td><td>Three sections (below); sortable by drug or gene; a column for the affected group (mostly phenotypes, some specific variants) and a short description of the gene-drug interaction</td><td>Columns for drug, therapeutic area, biomarker (the gene, sometimes the variant) and labeling sections; she sorted it by drug, therapeutic area and biomarker</td></tr>
<tr><td>Application (slide)</td><td>Initial screening to understand which drugs have pharmacogenetic implications</td><td>Helps pharmacists make informed decisions on medication therapy management based on the latest labeling</td></tr>
<tr><td>Limitation (slide)</td><td>Lacks detailed guidance on the clinical application of the information</td><td>Limited to FDA-approved drugs; may not cover emerging pharmacogenomic information</td></tr>
<tr><td>Last update she saw</td><td>September 10 of this year</td><td>August of this year</td></tr>
</tbody></table>
<ul>
<li><b>The three sections of the Associations table.</b> Section 1: the data support therapeutic management recommendations (she called it "the meatiest"). Section 2: the data indicate a potential impact on safety or response. Section 3: the data demonstrate a potential impact on pharmacokinetic properties only (the lightest).</li>
<li><b>What a listing does not mean.</b> Being listed does not necessarily mean the FDA advocates a pharmacogenetic test before prescribing, unless the test is a companion diagnostic. The Associations table is not intended to affect current regulatory requirements or policies, to assess the safe and effective use of (or regulatory requirements for) tests that detect the variants, or to give comprehensive information on the gene-drug interactions.</li>
<li><b>Biomarkers the labeling table includes:</b> germline or somatic gene variants, functional deficiencies, gene expression variations, chromosomal abnormalities, and protein biomarkers used to select therapy.</li>
<li><b>Biomarkers it leaves out:</b> non-human genetic biomarkers, biomarkers used solely for diagnosis, and biomarkers related to a drug other than the referenced drug.</li>
<li><b>Labeling sections column.</b> It names the section(s) of the official FDA-approved label that discuss pharmacogenomics. For abacavir: Boxed Warning, Dosage and Administration, Contraindications, and Warnings and Precautions.</li>
<li><b>Biomarker column.</b> It gives the gene; sometimes it also gives the variant, but most of the time now only the gene. CYP genes are written CYP plus the family code (for example CYP2C9).</li>
</ul>

<h4>Why</h4>
<ul>
<li><b>Why the Associations table is only a first look.</b> It names the drug, the gene and the affected group, but it does not say what to do for a patient, so it cannot guide a dose or drug choice.</li>
<li><b>Why the labeling table is fast in practice.</b> Every FDA label uses the same sections, and the table names the sections that hold the pharmacogenomic text. A pharmacist who needs to know whether a drug has a pharmacogenomic boxed warning or genotype-based dosing can go straight to that part of the label.</li>
<li><b>Why only the referenced drug.</b> Label information comes from the data on that drug. The SLCO1B1 transporter data she gave on 10/26 were for simvastatin, so the table speaks only about simvastatin. Another statin may not respond the same way to the variant, and the table does not say that it does.</li>
<li><b>Why it can be out of date.</b> The table follows the labels and is re-updated periodically. A study published weeks ago may not be in it yet, so she said to check the table first and then PubMed for the latest.</li>
<li><b>Why she checks the update date.</b> How current a resource is matters in a field that changes quickly; some of these resources had gone a long time without updates.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"So in my opinion this table, uh, this first table from the FDA is kind of a lightweight." <small>(T) 10/27</small></li>
<li>"So this is a comprehensive list of FDA approved drugs that have pharmacogenomics in their labeling." <small>(T) 10/27</small></li>
<li>"We can't assume that the other statins are going to have a patient response just like simvastatin did in the presence of that genetic biomarker." <small>(T) 10/27</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Reading a listing as an order to test.</b> A listing is information; testing is not necessarily advocated unless the test is a companion diagnostic.</li>
<li><b>Swapping the two tables.</b> The section-by-section grouping and "initial screening" belong to the Associations table; the label sections and "medication therapy management" belong to the Biomarkers in Drug Labeling table.</li>
<li><b>Ranking section 3 highest.</b> Section 1 (therapeutic management recommendations) is the strongest; section 3 is pharmacokinetic impact only.</li>
<li><b>Extending a result to the drug class.</b> The labeling table covers only the referenced drug; simvastatin data say nothing about the other statins.</li>
<li><b>Putting somatic variants or protein biomarkers on the excluded list.</b> Both are included. The exclusions are non-human biomarkers, diagnosis-only biomarkers, and biomarkers for a different drug.</li>
<li><b>Giving the labeling table the Associations table's limitation.</b> The labeling table's limitation is scope (approved drugs only) and lag behind new findings, not a lack of guidance on clinical application.</li>
</ul>

<p>How she asks it: what a listing means for testing; which section holds therapeutic management recommendations; the application and limitation of each table; what the labeling table includes and excludes; which label sections hold abacavir's pharmacogenomic information; which resource to open to find a pharmacogenomic boxed warning quickly.</p>
<p class="sub">Sources: PGx-Resources-and-Cases-Students-Fall-2026.pdf slides 'FDA Tables of Pharmacogenetic Associations' 1-3 (pp. 3-5), 'FDA Table of Pharmacogenomic Biomarkers in Drug Labeling' 1-3 (pp. 6-8); (T) 10/27. Questions L21-001 to L21-013.</p>
</section>
<section class="guide" id="guide4-l21-2">
<h3>24. CPIC guidelines: what they answer, components, development, evidence scoring</h3>

<h4>The idea</h4>
<p>CPIC guidelines are evidence-based guidelines written by experts in pharmacogenomics (pharmacists, scientists, physicians). They start from a patient whose genotype is already known and answer how to use that result to optimize drug therapy. They do not answer whether a test should be ordered. Every guideline has the same sections, goes through a set development and review process, and grades both its evidence and its recommendations. She called them the best resource available for the drugs that have one; the limit is that only selected drugs have one.</p>

<h4>The facts</h4>
<ul>
<li><b>Name.</b> The deck (p. 16) and the 2017 warfarin guideline give Clinical Pharmacogenetics Implementation Consortium. In the recording she called it the "Center for Pharmacogenomics Information Consortium"; the slide and guideline give the correct name.</li>
<li><b>Purpose (slide, paraphrased).</b> To help clinicians understand HOW available genetic test results should be used to optimize drug therapy, rather than WHETHER tests should be ordered. A key assumption is that patients' genotypes are available even if the test was not ordered with a specific drug in mind.</li>
<li><b>Endorsements.</b> The Association for Molecular Pathology; the American Society for Clinical Pharmacology and Therapeutics; the American Society of Health-System Pharmacists.</li>
<li><b>Components (same order in every guideline).</b> Gene and drug background (genetic variability and its impact on drug response); dosage recommendations based on genotype; potential benefits and risks of using the genetic information; caveats on appropriate use and potential misuse of genetic tests.</li>
<li><b>Development (Caudle et al., 2014).</b> Initial assessment: gene-drug pairs are prioritized from surveys, evidence strength and clinical actionability. Writing committee: a multidisciplinary team reviews the literature and drafts the guideline. Evidence review. Therapeutic recommendations: built from the evidence, with strength assigned by a transparent system.</li>
<li><b>Review and updates.</b> Periodic review about every two years; public and peer review of drafts by CPIC members and external experts before publication.</li>
<li><b>How many.</b> She said "about 35" guidelines. The current-guidelines table on p. 13 has 29 rows, several of which cover more than one drug or a drug class. She said the table does not need to be memorized, and that it had not been updated for the new warfarin and thiopurine (2026) versions.</li>
<li><b>Classes on the list</b> (her prompt to the room): infectious disease drugs, cardiac drugs, CNS drugs, immunosuppressants, and pain medications (NSAIDs and opioids).</li>
<li><b>Application (slide).</b> Extremely useful for pharmacists in clinical settings: clear recommendations on dosing adjustments and alternative therapies based on genetic profile. <b>Limitation:</b> only select drugs are covered, so pharmacists need to know the scope.</li>
</ul>
<table class="reftab"><thead><tr><th>Scale (what is graded)</th><th>Level</th><th>Definition (slide p. 12)</th></tr></thead><tbody>
<tr><td>Evidence</td><td>High</td><td>Consistent results from well-designed, well-conducted studies</td></tr>
<tr><td>Evidence</td><td>Moderate</td><td>Sufficient evidence to determine effects, but limited by the number, quality, or consistency of studies</td></tr>
<tr><td>Evidence</td><td>Weak</td><td>Insufficient evidence due to limited number or power of studies, design flaws, or lack of information</td></tr>
<tr><td>Recommendation</td><td>Strong</td><td>High-quality evidence; desirable effects clearly outweigh undesirable effects</td></tr>
<tr><td>Recommendation</td><td>Moderate</td><td>Close or uncertain balance between desirable and undesirable effects</td></tr>
<tr><td>Recommendation</td><td>Optional</td><td>Desirable effects closely balanced with undesirable effects, allowing for differences in opinion</td></tr>
</tbody></table>
<p>The third recommendation level is "Optional" on the slide and in the 2017 warfarin guideline. In the recording it came out as "optimal".</p>

<h4>Why</h4>
<ul>
<li><b>Why "how", not "whether".</b> The guidelines assume the genotype is already in hand, for example from an earlier test ordered for another reason. Their job is to interpret that result for the drug now being prescribed, because the test data can be complicated.</li>
<li><b>Why the fixed sections matter.</b> Every guideline has the same layout, as every FDA label does, so the background, the genes, the interpretation and the recommendations are found in the same place each time.</li>
<li><b>Why so few guidelines.</b> A gene-drug pair gets a guideline only after an initial assessment shows the data are strong enough and the result is clinically actionable. That screening is why there are about 35 guidelines while many drugs are on the market.</li>
<li><b>Why two separate grades.</b> The evidence grade says how strong the science is; the recommendation strength says how firmly to act, from the balance of benefit and harm. This is the same method of weighting and scoring used by other therapeutic guidelines, and it is what makes CPIC guidelines evidence based.</li>
<li><b>Why periodic review.</b> The data keep moving. Warfarin's guideline was updated in 2017 with CYP4F2 and rs12777823, and she said it and the thiopurine guideline have been updated again since.</li>
<li><b>What a pharmacist gets from one.</b> Which variants matter for the drug, what to test the patient for, how to interpret the result, and how to treat once the genotype is known.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"these guidelines help us understand how available genetic test results should be used to optimize drug therapy and not whether tests should be ordered" <small>(T) 10/27</small></li>
<li>"So every fact that they present in these guidelines, they weigh it, and it's either high, moderate, or weak." <small>(T) 10/27</small></li>
<li>"So the limitations for these guidelines so far is there's not every drug out there." <small>(T) 10/27</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>"CPIC tells you whether to order the test."</b> It tells you how to use a result you already have.</li>
<li><b>Swapping the scales.</b> High, moderate, weak grade the evidence; strong, moderate, optional grade the recommendation.</li>
<li><b>Moderate vs optional.</b> Moderate: a close or uncertain balance of desirable and undesirable effects. Optional: closely balanced, allowing differences in opinion.</li>
<li><b>Writing "optimal".</b> The level is "Optional" on the slide and in the guideline.</li>
<li><b>Listing the FDA as an endorser.</b> The endorsers on the slide are AMP, ASCPT and ASHP.</li>
<li><b>Putting peer review at the start.</b> The initial assessment prioritizes gene-drug pairs; public and peer review of the draft comes before publication.</li>
<li><b>"Not evidence based" or "no dosing recommendations" as the limitation.</b> The limitation is scope: only selected drugs.</li>
</ul>

<p>How she asks it: what CPIC stands for; the HOW versus WHETHER question; which endorsers, which components; what happens at the initial assessment; how often guidelines are reviewed; which pairing of evidence and recommendation scales is correct; which strength fits a given definition; about how many guidelines exist; the main limitation.</p>
<p class="sub">Sources: PGx-Resources-and-Cases-Students-Fall-2026.pdf slides 'CPIC Guidelines' 1-6 (pp. 9-14), 'Other Guidelines' (p. 16, full name); CPIC warfarin guideline 2017 update (title and Therapeutic Recommendations); (T) 10/27. Questions L21-014 to L21-025.</p>
</section>
<section class="guide" id="guide4-l21-3">
<h3>25. Walking the CPIC warfarin algorithm</h3>

<h4>The idea</h4>
<p>The class read the 2017 CPIC warfarin guideline (Johnson et al.) as a worked example of what a CPIC guideline contains, and then walked its adult dosing algorithm (Figure 2, "Dosing recommendations for warfarin dosing based on genotype for adult patients"). The algorithm turns a patient's genotypes into a dosing decision in a fixed order: is a genotype available, what is the patient's self-identified ancestry, calculate a dose from VKORC1 and CYP2C9, then adjust for the extra variants that apply to that ancestry. To use it, each gene's role in warfarin's action has to be known, because the role tells you whether a variant moves the dose up or down.</p>

<h4>The facts</h4>
<p><b>Layout of the guideline</b>, in order: authors and summary; focused literature review with Figure 1 (warfarin's mechanism and metabolism); the genes (CYP2C9, VKORC1, CYP4F2, and rs12777823, a SNP in the CYP2C cluster near the CYP2C18 gene); genetic test interpretation (what the genotype results mean when they come back from the lab); therapeutic recommendations by genotype, summarized in the Figure 2 algorithm; online supplemental tables.</p>
<table class="reftab"><thead><tr><th>Gene</th><th>Role in warfarin's action (Figure 1)</th><th>Variant in the algorithm</th><th>Effect on the warfarin dose</th></tr></thead><tbody>
<tr><td>VKORC1</td><td>Vitamin K epoxide reductase, warfarin's drug target</td><td>-1639G&gt;A, upstream of the gene, on a haplotype that affects expression</td><td>One or two -1639A alleles: progressively lower doses than G/G</td></tr>
<tr><td>CYP2C9</td><td>Main enzyme that metabolizes S-warfarin, the more potent enantiomer</td><td>*2 and *3 (decreased function); *5, *6, *8, *11 (decreased function, highest frequency in African ancestry)</td><td>Lower</td></tr>
<tr><td>CYP4F2</td><td>Metabolizes reduced vitamin K to hydroxyvitamin K1, removing vitamin K from the cycle</td><td>*3, less active</td><td>Higher (guideline: increase 5-10%)</td></tr>
<tr><td>CYP2C rs12777823</td><td>Associated with altered warfarin clearance</td><td>A/G or A/A</td><td>Lower, in African Americans only (guideline: 10-25%)</td></tr>
</tbody></table>
<p><b>The algorithm, step by step</b> (Figure 2 and the Therapeutic Recommendations text):</p>
<ul>
<li><b>1. Genotype available?</b> No: dose clinically, meaning without genetic information (a clinical dosing algorithm or a standard dose approach). She said "Dose your patient empirically".</li>
<li><b>2. Yes: self-identified ancestry.</b> The patient is asked whether they are of African or non-African ancestry, and the branch follows the answer.</li>
<li><b>3. Non-African ancestry.</b> Calculate the dose with a published pharmacogenetic algorithm using VKORC1 -1639G&gt;A and CYP2C9*2 and *3 (STRONG). A loading dose, if used, can come from the EU-PACT algorithm (OPTIONAL). If CYP2C9*5, *6, *8 or *11 is detected, decrease the calculated dose by 15-30% per variant allele or consider an alternative agent; 20-40% for homozygotes (OPTIONAL). If CYP4F2*3 is detected, increase the dose by 5-10% (OPTIONAL). rs12777823 is not considered.</li>
<li><b>4. African ancestry.</b> CYP2C9*5, *6, *8 and *11 come first: if they were not tested, dose clinically. If known, calculate with VKORC1 -1639G&gt;A and CYP2C9*2 and *3, then decrease by 15-30% for a *5, *6, *8 or *11 carrier (20-40% with two variant alleles), and decrease by 10-25% for rs12777823 A/G or A/A in African Americans (MODERATE). No recommendation is made for CYP4F2.</li>
<li><b>Alternative agent.</b> For CYP2C9 poor metabolism (for example *2/*3 or *3/*3), or VKORC1 increased sensitivity together with CYP2C9 poor metabolism, an alternative oral anticoagulant should be considered (Figure 2, footnote e).</li>
<li><b>Other patient factors.</b> She named weight, BMI and gender. The guideline's Text Box 1 lists the clinical inputs to the Gage and IWPC algorithms: age, sex, race, weight, height, smoking status, warfarin indication, target INR and interacting drugs.</li>
</ul>
<p><b>Her worked case.</b> A patient of non-African ancestry is CYP2C9*3/*3, VKORC1 wild type, and carries the CYP4F2 variant. She asked two questions. Was all the genotyping done that is known so far for this patient? Her answer: yes, for a patient of non-African descent. Compared with the average starting dose, does the patient need relatively more or relatively less? She asked students to reason it from what each variant does to warfarin's action and metabolism, and to explain why the CYP4F2 variant raises the dose; the recording does not contain her answer to the more-or-less question.</p>
<p><b>What the guideline algorithm gives for this genotype</b> (guideline facts, not her stated answer): the dose is calculated with the pharmacogenetic algorithm from VKORC1 and CYP2C9; CYP2C9*3/*3 is listed as a poor-metabolism genotype, for which an alternative oral anticoagulant might be considered (Figure 2 footnote e: consider an alternative agent); carriers of CYP2C9*3 require lower doses than *1/*1, and *3 impairs S-warfarin metabolism by 80-90%; VKORC1 G/G (wild type) is the reference genotype, against which -1639A carriers need progressively lower doses; CYP4F2*3 raises the dose by 5-10% (OPTIONAL). The guideline gives no single net figure for this combination.</p>

<h4>Why</h4>
<ul>
<li><b>Why VKORC1 lowers the dose.</b> VKORC1 is the target. The -1639A allele lies in the upstream region that affects expression, and carriers need progressively lower doses than G/G. On 10/26 she put the reasoning this way: when the target is less active, less drug is needed to inhibit it.</li>
<li><b>Why CYP2C9 variants lower the dose.</b> CYP2C9 clears S-warfarin. Reduced activity means slower clearance, so a standard dose builds up and the bleeding risk rises.</li>
<li><b>Why *5, *6, *8 and *11 come first on the African branch.</b> These decreased-function alleles occur at high frequency in people of African ancestry, so a patient on that branch has a higher probability of carrying one. Testing them before dosing protects the patient from starting too high. In non-African patients they are less likely, so they appear later as an adjustment if detected.</li>
<li><b>Why CYP4F2*3 raises the dose.</b> CYP4F2 removes vitamin K. The *3 variant is less active, so more vitamin K stays in the body. Vitamin K is the antidote to warfarin; more of it means more active clotting factors are made, so more warfarin is needed to anticoagulate.</li>
<li><b>Why each branch has its own extra variant.</b> The guideline says the data do not support a CYP4F2 effect on dosing in African ancestry, and the rs12777823 association has been detected only among African Americans. So CYP4F2 is applied on the non-African branch only, and rs12777823 on the African branch only.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"These variants are up high for people of African ancestry because we know that they could have a higher probability of having one of those genotypes" <small>(T) 10/27</small></li>
<li>"Vitamin K is like the antidote for warfarin, right?" <small>(T) 10/27</small></li>
<li>"Compared to the average starting dose, do they need relatively more or do they need relatively less?" <small>(T) 10/27</small></li>
</ul>

<h4>Where her words and the sources differ</h4>
<ul>
<li><b>No genotype.</b> She said to dose empirically and added "Usually we just start with 5 mg per kilogram". Figure 2 says "dose clinically" (without genetic information) and gives no number on that branch; the guideline text gives population averages of about 4-5 mg/day for the initial dose, and on 10/26 she gave about 5 mg/day. </li>
<li><b>CYP4F2 direction.</b> Walking the non-African branch she first said that a patient with the CYP4F2 SNP needs the dose decreased again. When a student raised it she gave the increase, and the guideline says increase by 5-10%. </li>
<li><b>Which branch has which variant.</b> Walking the African branch she first said that a patient with the CYP4F2 variant needs the dose further decreased. Answering a student she then linked an increased dose to a CYP4F2 variant on the African side, and finally stated that CYP4F2 is not on the African branch and that rs12777823 there requires a decrease. Figure 2 matches her final statement.</li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Calling VKORC1 the enzyme that metabolizes warfarin.</b> VKORC1 is the target; CYP2C9 metabolizes S-warfarin; CYP4F2 removes vitamin K.</li>
<li><b>Lowering the dose for CYP4F2*3.</b> Less CYP4F2 activity leaves more vitamin K, so the dose goes up 5-10%.</li>
<li><b>Applying CYP4F2 to African-ancestry patients, or rs12777823 to non-African patients.</b> Each is on one branch only.</li>
<li><b>Increasing the dose for CYP2C9*5, *6, *8 or *11.</b> These are decreased-function alleles; the calculated dose goes down 15-30%.</li>
<li><b>"These alleles raise CYP2C9 activity" as the reason they are tested first in African ancestry.</b> The reason is their higher frequency in that population.</li>
<li><b>Waiting to genotype before starting warfarin.</b> Without a genotype the algorithm says to dose clinically.</li>
<li><b>Reading the minus sign in -1639 as a deletion or a lower dose in mg.</b> It marks a position upstream of the gene, in a region that affects expression.</li>
</ul>

<p>How she asks it: she gives a patient's CYP2C9, VKORC1 and CYP4F2 genotypes and ancestry, then asks whether all the genotyping known so far was done, whether the patient needs relatively more or less than the average starting dose, and why the CYP4F2 variant raises the dose. Also: what VKORC1 is to warfarin; what the algorithm says with no genotype; what comes next when the genotype is available; the size and direction of each adjustment; why *5, *6, *8 and *11 are up front for African ancestry.</p>
<p class="sub">Sources: PGx-Resources-and-Cases-Students-Fall-2026.pdf slide 'CPIC Guidelines 7' (p. 15); CPIC warfarin guideline 2017 update (Johnson et al., Clin Pharmacol Ther 2017;102:397-404): Figure 1, gene sections, Therapeutic Recommendations, Figure 2 and footnotes, Text Box 1; (T) 10/27. Questions L21-026 to L21-035.</p>
</section>
<section class="guide" id="guide4-l21-4">
<h3>26. Other guidelines, ClinPGx and what implementation still needs</h3>

<h4>The idea</h4>
<p>CPIC (Clinical Pharmacogenetics Implementation Consortium) guidelines are written by American authors, but they are not the only evidence-based pharmacogenomic guidance. Dutch, Canadian and French groups publish their own. The guidelines from these countries are often quite similar to CPIC, and they differ mainly in their objectives. ClinPGx, the website that used to be called PharmGKB, lists the guidelines side by side for each drug. She closed the resources part of the lecture with what is still missing before pharmacogenomics can be used routinely: decision support systems and pharmacogenomic results in the electronic health record.</p>

<h4>The facts</h4>
<table class="reftab"><thead><tr><th>Group</th><th>Country</th><th>What the slide says about its objective</th></tr></thead><tbody>
<tr><td>Clinical Pharmacogenetics Implementation Consortium (CPIC)</td><td>United States (she: "written by American authors")</td><td>Pharmacotherapeutic recommendations for drug and gene or phenotype combinations</td></tr>
<tr><td>Dutch Pharmacogenetics Working Group (DPWG)</td><td>Netherlands</td><td>Pharmacotherapeutic recommendations for drug and gene or phenotype combinations; also recommends genetic testing</td></tr>
<tr><td>Canadian Pharmacogenomics Network for Drug Safety (CPNDS)</td><td>Canada</td><td>Recommends genetic testing</td></tr>
<tr><td>French National Network (R&eacute;seau) of Pharmacogenetics (RNPGx)</td><td>France</td><td>Recommends genetic testing; recommends genotyping for specific clinical settings or medical conditions</td></tr>
</tbody></table>
<ul>
<li>All four are English-language guidelines. They have similar methodologies of development, and their objectives differed (Abdullah-Koolmees et al., 2021, p. 16). She said the differences among them do not have to be memorized; students should know that other countries have produced their own guidance documents.</li>
<li>Where to find them (p. 17): the guideline annotations page on ClinPGx (clinpgx.org/guidelineAnnotations). A table gives the CPIC guidance documents and then lists the Dutch, Canadian and French guidance for each drug.</li>
<li>ClinPGx (p. 18): PharmGKB has changed to ClinPGx. It is formed from the combination of the NIH (National Institutes of Health)-funded PharmGKB, CPIC and PharmCAT projects. It is designed to (1) catalog, curate, annotate, integrate, generate and disseminate pharmacogenomic knowledge, (2) advance clinical implementation, (3) facilitate integration with genomic medicine and (4) promote pharmacogenomic education. She tried to reach the CPIC warfarin guideline through it, got lost, and opened the guideline from Canvas instead. She described the site as very busy, with content that changes often, so finding information takes effort.</li>
<li>Challenges for enhanced pharmacogenomic implementation (p. 20; p. 19 is the title slide "Future directions"):
<ul>
<li>Educate healthcare providers to improve their understanding of pharmacogenomics.</li>
<li>Educate patients to help them understand the benefits and implications of pharmacogenomic testing.</li>
<li>Expand genetic tests to include a wider array of pertinent genetic markers.</li>
<li>The need for decision support systems (CDSS) that incorporate pharmacogenomic data.</li>
<li>Integrate pharmacogenomics data into electronic health records (EHR).</li>
</ul></li>
<li>In lecture she spoke to the last two. She said these are the future directions that are agreed on: better ways of using the information clinically.</li>
<li>Electronic records: pharmacists at Saint Jude's in Memphis were the first to push their hospital to put patients' pharmacogenomic information in the electronic medical records of their pediatric oncology patients. This is still in progress. Even in large hospital systems a genotyping result may not be in the record, or it may be buried in the lab reports.</li>
<li>Decision support: steps to follow when genetic information is available, to help decide what to do for the patient. Her example was the CPIC warfarin dosing algorithm from earlier the same day.</li>
</ul>

<h4>Why</h4>
<ul>
<li><b>Why the national guidelines are similar.</b> They are built from the same published science with similar methods of development, so their recommendations for a gene-drug pair tend to agree.</li>
<li><b>Why they still differ.</b> Their objectives differ. CPIC guidelines are about how available genetic test results should be used to optimize drug therapy, rather than whether to test (p. 9). DPWG, CPNDS and RNPGx also recommend genetic testing, and RNPGx names the clinical settings or conditions in which to genotype.</li>
<li><b>Why decision support and the health record are the next needs.</b> She said a genotyping result may not be in the record, or may be buried in the lab reports, so it can be hard to find. A decision support system, such as the warfarin algorithm, gives steps to follow when genetic information is available, to help decide what to do for the patient.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"They're often quite similar. Um, which you would expect, right, because it's, they're pulling from the same science, but their differences, um, are because of some of them have different objectives from our CPIC documents" <small>(T) 10/27</small></li>
<li>"We need to have what they call decision support systems, and we also need to have um. Patient pharmacogenomics information in their electronic health records" <small>(T) 10/27</small></li>
<li>"And then the decision support system is things like that algorithm." <small>(T) 10/27</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Listing British, German or Japanese guidelines.</b> The three other countries she named are the Netherlands (DPWG), Canada (CPNDS) and France (RNPGx).</li>
<li><b>Swapping the acronyms.</b> RNPGx is French (R&eacute;seau), CPNDS is Canadian, DPWG is Dutch.</li>
<li><b>Saying the guidelines contradict CPIC, or differ in method.</b> The slide says the methodologies of development are similar and the objectives differ; she said they are often quite similar.</li>
<li><b>Calling PharmCAT or DPWG the old name of ClinPGx.</b> The old name is PharmGKB. PharmCAT and CPIC are the other projects combined into ClinPGx.</li>
<li><b>Looking for the Dutch, Canadian and French guidance on the FDA tables or in the drug label.</b> They are listed with CPIC on the ClinPGx guideline annotations table.</li>
<li><b>Calling the warfarin algorithm an electronic health record function.</b> She gave it as an example of decision support.</li>
<li><b>Crediting the FDA or IT staff with the first pharmacogenomic results in the record.</b> She credited pharmacists at Saint Jude's in Memphis, for pediatric oncology patients.</li>
</ul>

<p>How she asks it: which other countries produce guidance and how they compare with CPIC; the RNPGx, CPNDS and DPWG names; the old name of ClinPGx and the projects it combines; where the guidelines are listed together; the two implementation needs she named; who first pushed for pharmacogenomic results in the record; what a decision support system is, with the warfarin algorithm as the example.</p>
<p class="sub">Sources: PGx-Resources-and-Cases-Students-Fall-2026.pdf slides 'Other Guidelines' (p. 16, Abdullah-Koolmees et al., 2021), 'Other Guidelines 2' (p. 17), 'PharmGKB has changed to ClinPGx website' (p. 18), 'Future directions' (p. 19), 'Challenges for enhanced pharmacogenomic implementation' (p. 20), 'CPIC Guidelines' (p. 9); (T) 10/27. Questions L21-036 to L21-045.</p>
</section>
<section class="guide" id="guide4-l21-5">
<h3>27. Reading a label: trastuzumab and HER2</h3>

<h4>The idea</h4>
<p>The drug-label worksheet asks eight questions about the pharmacogenomic information in a label, using the FDA Table of Pharmacogenomic Biomarkers in Drug Labeling to find the label sections. Trastuzumab (brand name Herceptin) is used to treat HER2-positive cancers, usually breast cancer. It is her example of a drug where the test is done on the tumor, not on the patient, and where the result decides whether the drug will work. The "genotyping" in the worksheet questions is, for this drug, phenotyping: looking for the HER2 receptor on the tumor cells.</p>

<h4>The facts</h4>
<table class="reftab"><thead><tr><th>Worksheet item</th><th>Her answer</th><th>What the label says (section)</th></tr></thead><tbody>
<tr><td>1. What gene, which variant?</td><td>HER2. The label does not tell us which variant; we just know the tumor cells express HER2. A student read "185" from the label; she said she thinks the 185 is the size.</td><td>The HER2 (or c-erbB2) proto-oncogene encodes a transmembrane receptor protein of 185 kDa (12.1 Mechanism of Action). Patients are selected on HER2 protein overexpression or HER2 gene amplification in tumor specimens (2.2 Patient Selection).</td></tr>
<tr><td>3. Tumor or patient?</td><td>The tumor. We are not genotyping the patient; we are phenotyping the tumor from a biopsy. Normal cells elsewhere in the body do not express HER2.</td><td>Testing is on "tumor specimens" (2.2 Patient Selection).</td></tr>
<tr><td>4. Efficacy or toxicity?</td><td>Efficacy: be sure the patient has the drug's target, HER2, before giving an expensive drug that can cause side effects.</td><td>Each indication says to select patients for therapy based on an FDA-authorized companion diagnostic (1.1-1.3). Herceptin inhibits the proliferation of tumor cells that overexpress HER2 (12.1).</td></tr>
<tr><td>5. Genotyping or cytology?</td><td>Cellular studies; usually immunohistochemistry (IHC) to look for the receptors on the tumor cells.</td><td>HER2 protein overexpression or HER2 gene amplification (2.2). The clinical studies used IHC 3+ or FISH (fluorescence in situ hybridization) for gene amplification (14).</td></tr>
<tr><td>6. Does the FDA say which test?</td><td>A few years ago the label named a brand of kit. Now it does not; the test should be one that is good, probably "CLA certified" (she added "You don't need to know that"), specific and sensitive.</td><td>FDA-authorized tests specific for breast or gastric cancers, performed by laboratories with demonstrated proficiency; list at fda.gov/CompanionDiagnostics (Highlights; 2.2). No brand is named.</td></tr>
<tr><td>7. Which population or tumor type?</td><td>A tumor type, not an ethnic group: breast, metastatic gastrointestinal, and now esophageal tumors. She said the data do not indicate that brain tumors are associated with HER2.</td><td>HER2-overexpressing breast cancer, adjuvant and metastatic (1.1, 1.2); HER2-overexpressing metastatic gastric or gastroesophageal junction adenocarcinoma (1.3).</td></tr>
<tr><td>8. How does the result change care?</td><td>HER2-positive: likely candidate for trastuzumab. HER2-negative: trastuzumab is not used.</td><td>Select patients based on HER2 protein overexpression or gene amplification (2.2).</td></tr>
</tbody></table>
<ul>
<li>Item 2 (how the variant affects response) was not answered as a separate item for trastuzumab; her answers to items 4 and 8 cover it.</li>
<li>HER2 background (her account): everyone has the HER2 gene, but it is not normally expressed. We do not know its endogenous ligand. In HER2-positive cancer the receptor is expressed on the tumor cell surface in large numbers or is hyperactive, and growth factor binding makes the cells divide out of control. Trastuzumab is made to bind the HER2 receptor and stop that growth-factor signaling. The label describes trastuzumab as a humanized IgG1 kappa monoclonal antibody that binds the extracellular domain of HER2 (11 Description).</li>
</ul>

<h4>Where her words and the label differ</h4>
<ul>
<li><b>Tumor types.</b> She and the room said "metastatic gastrointestinal" and "esophageal" tumors. The label indication is narrower: metastatic gastric or gastroesophageal junction adenocarcinoma (1.3).</li>
<li><b>Test wording.</b> She said the test should be one "you think is good", certified, specific and sensitive. The label says FDA-authorized tests specific for breast or gastric cancers, by laboratories with demonstrated proficiency (2.2). Both agree that no brand of kit is named. While answering item 6 she said "the answer to number 7 was"; the point (a named kit in older labels) belongs to item 6.</li>
<li><b>Item 1.</b> She first said this year's label was the first she had seen give information on what makes the receptor get expressed, then concluded that the label describes the tumor phenotype, not the DNA variant. The label number she was shown (185) is the protein's size in kDa (12.1).</li>
<li><b>Label date.</b> She said the trastuzumab label was just updated this year; the copy provided reads Revised: 05/2026.</li>
</ul>

<h4>Why</h4>
<ul>
<li><b>Why the tumor and not the patient.</b> HER2 is expressed on the tumor cells, not on normal cells. A sample from the rest of the body would not show HER2, so the test has to be on the tumor biopsy.</li>
<li><b>Why it is phenotyping.</b> The question is whether the receptor protein is present on the tumor cells. IHC detects the protein, which is a phenotype, not a genotype of the patient.</li>
<li><b>Why efficacy.</b> Trastuzumab acts only by binding HER2. If the tumor has no HER2, the drug has no target and cannot work, so the patient would get the cost and side effects without benefit. That is also why a HER2-negative result means trastuzumab is not used.</li>
<li><b>Why tumor type, not ethnicity.</b> HER2 expression is a property of certain tumors (breast, gastric), not of an inherited population variant, so item 7 is answered with tumor types.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"So they actually don't genotype people, they're phenotyping the tumor." <small>(T) 10/27</small></li>
<li>"We want to be sure these patients have the drug's target, which is HER2, before we give them an expensive drug that can cause side effects." <small>(T) 10/27</small></li>
<li>"If they are HER2 positive, they're likely candidates for using trastuzumab. If they're HER2 negative, you're not going to use trastuzumab in that patient." <small>(T) 10/27</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Genotyping the patient's blood.</b> Normal cells do not express HER2; the tumor is tested.</li>
<li><b>Answering "prevent toxicity" for item 4.</b> The test confirms the drug's target is present, which is efficacy.</li>
<li><b>Naming a specific variant or SNP for item 1.</b> The label gives none; 185 is the size of the HER2 protein in kDa.</li>
<li><b>Confusing HER2 with EGFR.</b> The label says HER2 is structurally related to the epidermal growth factor receptor, but the gene tested for trastuzumab is HER2.</li>
<li><b>Saying the current label requires one brand of kit.</b> That was the older label. The current label asks for an FDA-authorized test without a brand.</li>
<li><b>Answering item 7 with an ethnic group.</b> The answer is tumor types. The data do not indicate that brain tumors are associated with HER2.</li>
<li><b>Reversing item 8.</b> HER2-positive patients are candidates; HER2-negative patients do not get trastuzumab. The result does not change the dose.</li>
</ul>

<p>How she asks it: the worksheet items in order: which gene, tumor or patient, efficacy or toxicity, IHC versus genotyping, whether a test is named, which tumor types, and what a positive or negative result means for use of the drug.</p>
<p class="sub">Sources: Pharmacogenomics Questions Drug Labels Worksheet, items 1 and 3-8; Herceptin (trastuzumab) label, Revised 05/2026: Highlights, 1.1-1.3 Indications and Usage, 2.2 Patient Selection, 11 Description, 12.1 Mechanism of Action, 14 Clinical Studies; PGx-Resources-and-Cases-Students-Fall-2026.pdf slide 'FDA Table of Pharmacogenomic Biomarkers in Drug Labeling 3' (p. 8); (T) 10/27. Questions L21-046 to L21-052.</p>
</section>
<section class="guide" id="guide4-l21-6">
<h3>28. Reading a label: carbamazepine and abacavir, one gene, two variants</h3>

<h4>The idea</h4>
<p>Carbamazepine (Tegretol) and abacavir (Ziagen) are two different drugs in two different therapeutic classes with two different mechanisms of action. Both carry an HLA-B warning, but for a different variant of the same gene, and the hypersensitivity reaction is located in a different place: the skin for carbamazepine, multiple organs for abacavir. Unlike trastuzumab, there is no tumor: the patient's inherited HLA alleles are tested, and the concern is a severe adverse reaction. She called this pairing "really weird" and made it the main point of the discussion.</p>

<h4>The facts</h4>
<table class="reftab"><thead><tr><th>Worksheet item</th><th>Carbamazepine (Tegretol)</th><th>Abacavir (Ziagen)</th></tr></thead><tbody>
<tr><td>Drug class</td><td>One of the older antiepileptics still in use; some newer (second- and maybe third-generation) drugs in the same category have the same issue</td><td>Antiretroviral for HIV (human immunodeficiency virus); the label calls it a nucleoside analogue HIV-1 reverse transcriptase inhibitor</td></tr>
<tr><td>1. Gene and variant</td><td>Two genes: HLA-B, variant HLA-B*15:02 (she: "Make sure you write this down"), and HLA-A, variant HLA-A*31:01. The label prints them HLA-B*1502 and HLA-A*3101.</td><td>HLA-B, variant HLA-B*57:01 (printed HLA-B*5701)</td></tr>
<tr><td>2. Effect on response</td><td>Either variant significantly increases the risk of a severe hypersensitivity reaction seen in the skin: Stevens-Johnson syndrome (SJS) or toxic epidermal necrolysis (TEN), which can be fatal</td><td>Higher risk of a hypersensitivity reaction involving multiple organs; the answer given in class was "Multi-organ failure"</td></tr>
<tr><td>3. Tumor or patient?</td><td>The patient</td><td>The patient</td></tr>
<tr><td>Label sections</td><td>Boxed Warning (Serious Dermatologic Reactions and HLA-B*1502 Allele); Warnings (SJS/TEN and HLA-B*1502 Allele; Hypersensitivity Reactions and HLA-A*3101 Allele); Precautions, Laboratory Tests</td><td>Boxed Warning (Hypersensitivity Reactions); 2.1 Screening for HLA-B*5701 Allele; 4 Contraindications; 5.1 Hypersensitivity Reactions</td></tr>
</tbody></table>
<ul>
<li>She described SJS and TEN as slightly different conditions with basically the same response, in which the skin burns and falls off.</li>
<li>Abacavir history: the problem was first identified as massive skin reactions similar to those with carbamazepine. The labeling later changed to say it is not just a skin reaction but a whole-organ hypersensitivity reaction. The label says hypersensitivity to Ziagen is a multi-organ clinical syndrome and lists multi-organ failure and anaphylaxis among the reactions (Highlights; 5.1).</li>
<li>She said HLA-A*31:01 appeared in the carbamazepine labeling only with the 2017 revision and was not known before 2017.</li>
<li>Label content not worked aloud (items 4-8): the carbamazepine boxed warning says patients with ancestry in genetically at-risk populations should be screened for HLA-B*1502 before starting, and patients testing positive should not be treated unless the benefit clearly outweighs the risk; Precautions recommends high-resolution "HLA-B*1502 typing". The abacavir label says to screen all patients for HLA-B*5701 before starting or restarting, and abacavir is contraindicated in HLA-B*5701-positive patients.</li>
</ul>

<h4>Where her words and the labels differ</h4>
<ul>
<li><b>Carbamazepine reaction types.</b> She described the reaction for both variants as a skin reaction (SJS/TEN). The label ties HLA-B*1502 to SJS/TEN and says it has not been found to predict maculopapular eruption or DRESS (drug reaction with eosinophilia and systemic symptoms). For HLA-A*3101 the label lists SJS/TEN, maculopapular eruptions and DRESS, which the label also calls multiorgan hypersensitivity, and calls the association moderate.</li>
<li><b>Label date.</b> She first said carbamazepine was just updated this year; when the room read the date as 2017, she accepted it ("things have not changed very recently"). The carbamazepine copy provided reads Revised: 7/2026, and it does not show when HLA-A*3101 was added. The abacavir label is the 2020 revision, as she said (Revised: 11/2020).</li>
<li><b>Allele notation.</b> She and the caption say "1502", "3101" and "5701"; the labels print HLA-B*1502, HLA-A*3101 and HLA-B*5701. The 10/26 slide (Katzung Table 5-4) writes the HLA-B alleles with a colon: HLA-B*15:02 and HLA-B*57:01.</li>
</ul>

<h4>Why</h4>
<ul>
<li><b>Why the patient is tested.</b> These drugs do not act on a tumor target. The risk comes from HLA alleles the patient inherited, so the patient's own DNA is genotyped.</li>
<li><b>Why one negative HLA-B test does not clear both drugs.</b> The gene is the same, but the variant is different: HLA-B*15:02 for carbamazepine, HLA-B*57:01 for abacavir. A patient negative for one may carry the other.</li>
<li><b>Why carbamazepine has two genes to check.</b> The label now describes a second gene, HLA-A, whose variant HLA-A*31:01 also raises the risk of hypersensitivity, so HLA-B alone no longer covers it.</li>
<li><b>Why abacavir was first thought to be a skin problem.</b> The first reactions seen were skin reactions like those with carbamazepine; later experience showed involvement of the whole body's organs, and the labeling changed.</li>
<li>She began to explain why one gene gives reactions in different places ("What does our HLAB do? It's an antigen presenting receptor, right?"), and the recording ends mid-sentence; her explanation is not available.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"The HLAB gene is involved in both, but it's a different genetic variant for carbamazepine compared to abacavir, same gene. Different variants." <small>(T) 10/27</small></li>
<li>"They both cause a risk for a hypersensitivity reaction, but carbamazepine is located in the skin, and for abacavir, it's a whole organ hypersensitivity reaction." <small>(T) 10/27</small></li>
<li>"we're not dealing with tumors with these drugs for carbamazepine and abacavir." <small>(T) 10/27</small></li>
</ul>

<h4>Traps</h4>
<ul>
<li><b>Swapping the HLA-B variants.</b> HLA-B*15:02 goes with carbamazepine; HLA-B*57:01 goes with abacavir.</li>
<li><b>Naming only one gene for carbamazepine.</b> There are two: HLA-B (HLA-B*15:02) and HLA-A (HLA-A*31:01).</li>
<li><b>Choosing HLA-B*58:01 or HLA-DRB1*15:01.</b> Those are the allopurinol and amoxicillin-clavulanate variants from 10/26, not carbamazepine or abacavir.</li>
<li><b>Calling the HLA effect a loss of efficacy or a dose change.</b> The variants raise the risk of a hypersensitivity reaction; they do not make the drug less effective or change the dose needed.</li>
<li><b>Tying carbamazepine HLA risk to aplastic anemia or slowed metabolism.</b> Aplastic anemia is a separate boxed warning; the HLA variants are tied to hypersensitivity, not to metabolism.</li>
<li><b>Calling the abacavir reaction skin-only.</b> It was first seen as skin reactions, but the label now describes a multi-organ reaction.</li>
<li><b>Testing a tumor.</b> There is no tumor with these drugs; the patient is genotyped.</li>
</ul>

<p>How she asks it: which HLA-B variant goes with each drug; the second carbamazepine gene; what the carbamazepine variants do (SJS/TEN) and what the abacavir variant does (multi-organ hypersensitivity); same gene, different variants, different location; tumor or patient.</p>
<p class="sub">Sources: Pharmacogenomics Questions Drug Labels Worksheet, items 1-3; Tegretol (carbamazepine) label, 7/2026: Boxed Warning, Warnings (SJS/TEN and HLA-B*1502 Allele; Hypersensitivity Reactions and HLA-A*3101 Allele), Precautions (Laboratory Tests); Ziagen (abacavir) label, Revised 11/2020: Highlights, Boxed Warning, 1, 2.1, 4 Contraindications, 5.1; PGx-Resources-and-Cases-Students-Fall-2026.pdf slide 'FDA Table of Pharmacogenomic Biomarkers in Drug Labeling 3' (p. 8); (T) 10/27. Questions L21-053 to L21-059.</p>
</section>

`;
