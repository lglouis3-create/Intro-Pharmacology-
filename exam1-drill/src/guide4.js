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
<p>A single nucleotide polymorphism (SNP) is one base pair changed in a gene. Several million are known, and many change nothing about the gene's product. Coding regions are the parts of a gene translated to RNA and then to protein; a coding SNP is classed by what the base change does to the codon: the same amino acid (synonymous), a different amino acid (non-synonymous), or a stop codon early in the sequence (premature stop). Each class has a drug-relevant example.</p>

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
<li><b>Why metabolism is more complex than one enzyme, one drug.</b> Clopidogrel is a prodrug: about 85% of a dose is inactivated by esterases, and only about 15% is bioactivated in two CYP steps to the active thiol metabolite that blocks the platelet receptor. Several CYPs act on it, but variants in CYP2C19 most change how much active metabolite forms, so the enzyme that does the most work is not always the one that drives the outcome.</li>
</ul>

<h4>Her words</h4>
<ul>
<li>"Variations in our metabolizing enzymes are the biggest reason why we would see variation in drug response" <small>(T) 10/22</small></li>
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
<li><b>Why the debrisoquine curve has three peaks.</b> Debrisoquine is cleared almost entirely by CYP2D6, so when you group people by the parent-to-metabolite ratio the trait is monogenic and separates into distinct peaks: ultrarapid, extensive, and poor. A smooth bell curve would mean many genes blur the data together.</li>
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

`;
