const TELL4_HTML = `
<p class="sub">Pairs that share wording: the feature that separates them and the trap a question sets. Source shorthand: Intro and Examples decks by page; T = transcript date.</p>
<h3 id="tell4-l18">Day 18: pharmacogenomics nomenclature, types of variants, genotype-guided dosing</h3>
<table class="reftab"><thead>
<tr><th style="width:20%">Looks alike</th><th>What separates them</th><th style="width:24%">The trap</th><th style="width:12%">Source</th><th style="width:9%">Question</th></tr></thead><tbody>
<tr><td>Numeric/alphabetic vs SNP nomenclature</td><td>VKORC1 1173 C names one nucleotide (wild type only by capitalization); VKORC1 1173 C&gt;T writes wild type first, then the arrow, then the variant</td><td>Reading the letter after the arrow as the wild type</td><td>Intro to PGx pp. 23–24; T 10/21</td><td data-q="L18-004">L18-004</td></tr>
<tr><td>Star vs rs nomenclature</td><td>Star: *1 is always wild type, number in order of discovery; rs: a unique database number that does not show the wild type</td><td>Thinking an rs number reveals the wild type (her poll)</td><td>Intro to PGx pp. 25, 27; T 10/21</td><td data-q="L18-020">L18-020</td></tr>
<tr><td>CYP2C19*2 vs CYP2C19*3</td><td>*2: 681 G&gt;A; *3: 636 G&gt;A (= rs4986893, premature stop). Both no activity</td><td>Swapping the positions; assuming *3 lies downstream of *2</td><td>Intro to PGx pp. 25, 27, 36; T 10/21</td><td data-q="L18-009">L18-009</td></tr>
<tr><td>CYP2C19*2 vs CYP2C9*2</td><td>Same label, different gene: no activity vs decreased activity, and different loci</td><td>Assuming the same star number means the same effect or place</td><td>Intro to PGx p. 26; T 10/21</td><td data-q="L18-012">L18-012</td></tr>
<tr><td>CYP2C19*1/*3 vs *2/*3</td><td>Reduced (the *1 copy is active) vs none (neither copy is active)</td><td>Calling every heterozygote "reduced"</td><td>Intro to PGx p. 28; T 10/21</td><td data-q="L18-022">L18-022</td></tr>
<tr><td>Gene dose vs dominance</td><td>Activity of the two alleles adds up; no allele masks the other</td><td>Calling *1 dominant</td><td>Intro to PGx p. 28; T 10/21</td><td data-q="L18-023">L18-023</td></tr>
<tr><td>Haplotype vs genotype</td><td>Several variants together on one allele (VKORC1 haplotype A; TPMT*3A) vs the two alleles a person has</td><td>Treating TPMT*3A as two alleles</td><td>Intro to PGx pp. 29, 35; T 10/21</td><td data-q="L18-039">L18-039</td></tr>
<tr><td>Synonymous vs non-synonymous SNP</td><td>ATC to ATT keeps isoleucine (ABCB1 3435C&gt;T) vs GCA to ACA changes alanine to threonine (TPMT*3A)</td><td>Calling a synonymous SNP irrelevant</td><td>Intro to PGx pp. 34–35; T 10/21</td><td data-q="L18-032">L18-032</td></tr>
<tr><td>Non-synonymous vs premature stop codon</td><td>A different amino acid (TPMT*3A, reduced activity) vs a stop codon early in the sequence (CYP2C19*3, TGG to TAG, no activity)</td><td>Calling CYP2C19*3 synonymous</td><td>Intro to PGx pp. 35–36; T 10/21</td><td data-q="L18-041">L18-041</td></tr>
<tr><td>Premature stop codon vs InDel frameshift</td><td>One base substitution that ends the protein vs inserted or deleted bases that shift every later codon</td><td>Calling CYP2C19*3 a frameshift</td><td>Intro to PGx pp. 36–37; T 10/21</td><td data-q="L18-040">L18-040</td></tr>
<tr><td>One-base vs three-base InDel</td><td>Not a multiple of 3: frameshift; exactly 3: one amino acid lost or gained</td><td>Thinking every InDel shifts the frame</td><td>Intro to PGx pp. 31, 37</td><td data-q="L18-046">L18-046</td></tr>
<tr><td>Microsatellite vs minisatellite</td><td>Repeat unit under 5 bp vs over 5 bp</td><td>Swapping the sizes</td><td>Intro to PGx p. 38; T 10/21</td><td data-q="L18-047">L18-047</td></tr>
<tr><td>Coding vs intergenic tandem repeat</td><td>Coding: acts like an InDel and changes the protein; intergenic: often no change in function</td><td>Assuming every repeat changes the protein</td><td>Intro to PGx p. 38; T 10/21</td><td data-q="L18-048">L18-048</td></tr>
<tr><td>CYP2D6*5 vs CYP2D6*2xN</td><td>Whole gene deleted (poor metabolizer) vs extra gene copies (ultrarapid metabolizer); same drugs affected</td><td>Reversing PM and UM</td><td>Intro to PGx pp. 39–40; T 10/21</td><td data-q="L18-051">L18-051</td></tr>
<tr><td>CYP2D6*1/*5 vs *5/*5</td><td>Some activity vs none</td><td>Giving *1/*5 no activity</td><td>Intro to PGx p. 39; T 10/21</td><td data-q="L18-050">L18-050</td></tr>
<tr><td>Gray vs white bars (patients A to D)</td><td>Gray: everyone at 100% of the average dose; white: genotype-based doses that give everyone the same AUC</td><td>Reading the white bars as the standard dose</td><td>PGx Examples p. 6; T 10/21</td><td data-q="L18-059">L18-059</td></tr>
<tr><td>Patient A vs patient D</td><td>A (no working alleles): lower dose, toxicity prevented; D (extra copies): higher dose, efficacy ensured</td><td>Reversing which outcome each dose secures</td><td>PGx Examples pp. 6–7; T 10/21</td><td data-q="L18-058">L18-058</td></tr>
<tr><td>Promoter vs exon vs intron</td><td>Promoter: expression starts; exon: becomes amino acid sequence; intron: between exons, variants occur there too</td><td>Calling introns meaningless</td><td>PGx Examples p. 8; T 10/21</td><td data-q="L18-060">L18-060</td></tr>
</tbody></table>

<h3 id="tell4-l19">Day 19: pharmacogenomics examples, drug metabolizing enzymes</h3>
<table class="reftab"><thead>
<tr><th style="width:22%">Looks alike</th><th>What separates them</th><th style="width:24%">The trap</th><th style="width:16%">Pages</th><th style="width:9%">Question</th></tr></thead><tbody>
<tr><td>Active drug vs prodrug, with low enzyme activity</td><td>Active drug accumulates (toxicity); prodrug is not activated (therapeutic failure)</td><td>Assuming a poor metabolizer always has the same problem</td><td>p. 14</td><td data-q="L19-004">L19-004</td></tr>
<tr><td>Butyrylcholinesterase vs NAT2</td><td>BChE hydrolyzes succinylcholine; NAT2 acetylates isoniazid</td><td>Swapping the enzyme and its drug</td><td>pp. 18-19</td><td data-q="L19-011">L19-011</td></tr>
<tr><td>NAT2 slow vs fast acetylator</td><td>Slow: isoniazid nerve damage and procainamide lupus; fast: isoniazid hepatotoxicity</td><td>Thinking only one phenotype is dangerous</td><td>p. 19</td><td data-q="L19-012">L19-012</td></tr>
<tr><td>CYP2D6 ultrarapid: cleared drug vs activated prodrug</td><td>Cleared drug may need super-doses; a prodrug like codeine may overdose</td><td>Giving an ultrarapid metabolizer a super-dose of codeine</td><td>p. 22</td><td data-q="L19-019">L19-019</td></tr>
<tr><td>CYP2D6*5 vs CYP2D6*2xN</td><td>*5 is a whole-gene deletion (poor); *2xN is extra copies (ultrarapid)</td><td>Calling a gene deletion an ultrarapid allele</td><td>pp. 20-22</td><td data-q="L19-016">L19-016</td></tr>
<tr><td>Monogenic vs polygenic response curve</td><td>Distinct peaks mean one gene; a smooth bell curve means many genes</td><td>Reading distinct peaks as a polygenic trait</td><td>pp. 10, 21</td><td data-q="L19-044">L19-044</td></tr>
<tr><td>CYP2C9*2 vs *3 activity</td><td>*2 keeps about 20%; *3 keeps about 5%</td><td>Swapping the two percentages</td><td>p. 23</td><td data-q="L19-022">L19-022</td></tr>
<tr><td>CYP2C19*2/*3 vs *17 (on clopidogrel)</td><td>*2/*3 under-activate (sticky platelets); *17 over-activates (over-anticoagulation)</td><td>Reversing the alleles</td><td>p. 25</td><td data-q="L19-029">L19-029</td></tr>
<tr><td>CYP2C19 poor metabolizer: PPI vs SSRI/diazepam</td><td>Very wide index PPI benefits; with SSRIs and diazepam the higher levels bring adverse effects</td><td>Assuming a poor metabolizer is always harmed</td><td>p. 25</td><td data-q="L19-032">L19-032</td></tr>
<tr><td>CYP2C19*17 vs UGT1A1*28 (both promoter)</td><td>*17 increases expression; *28 decreases expression</td><td>Assuming all promoter variants act alike</td><td>pp. 25, 30</td><td data-q="L19-039">L19-039</td></tr>
<tr><td>Clopidogrel vs irinotecan (active status)</td><td>Clopidogrel is a prodrug needing activation; irinotecan is active and its metabolite SN-38 must be cleared</td><td>Calling irinotecan a prodrug</td><td>pp. 15, 30</td><td data-q="L19-038">L19-038</td></tr>
<tr><td>DPD low activity vs TPMT low activity</td><td>Both shunt more drug to the cytotoxic metabolite and cause myelosuppression</td><td>Thinking low activity makes the drug fail</td><td>pp. 29, 32</td><td data-q="L19-042">L19-042</td></tr>
</tbody></table>

`;
