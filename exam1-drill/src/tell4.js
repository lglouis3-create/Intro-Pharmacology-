const TELL4_HTML = `
<p class="sub">Pairs that share wording: the feature that separates them and the trap a question sets. Source shorthand: Intro and Examples decks by page; T = transcript date.</p>
<h3 id="tell4-l18">Day 18: pharmacogenomics nomenclature, types of variants, genotype-guided dosing (10/21; guides 1–7)</h3>
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

<h3 id="tell4-l19">Day 19: pharmacogenomics examples, drug metabolizing enzymes (10/22; guides 8–14)</h3>
<table class="reftab"><thead>
<tr><th style="width:22%">Looks alike</th><th>What separates them</th><th style="width:24%">The trap</th><th style="width:16%">Examples deck pages</th><th style="width:9%">Question</th></tr></thead><tbody>
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
<p class="sub">Source: PGx-Examples-Students-Fall-2026.pdf; transcript 10/22.</p>
<h3 id="tell4-l20">Day 20: TPMT dosing, transporters, drug targets, warfarin, HLA, Furuta (10/26; guides 15–22)</h3>
<table class="reftab"><thead>
<tr><th style="width:22%">Looks alike</th><th>What separates them</th><th style="width:24%">The trap</th><th style="width:16%">Examples deck pages</th><th style="width:9%">Question</th></tr></thead><tbody>
<tr><td>TPMT heterozygote vs homozygous deficient dose</td><td>Heterozygote: about 35% of the wild-type dose (her words; the slide words it as 35% of heterozygotes needing a decrease); homozygous deficient: under 10%</td><td>Giving the heterozygote half the dose</td><td>p. 35</td><td data-q="L20-008">L20-008</td></tr>
<tr><td>TPMT histogram vs a middle-heavy histogram</td><td>For TPMT most people are wild type at the high-activity end</td><td>Assuming the wild type is always in the middle</td><td>p. 34</td><td data-q="L20-006">L20-006</td></tr>
<tr><td>Cheok and Evans: conventional vs individualized dosing</td><td>Same dose: v/v has the highest 6-TGN and toxicity; individualized: similar, low in all</td><td>Reading the conventional arm as safe</td><td>pp. 36-37</td><td data-q="L20-011">L20-011</td></tr>
<tr><td>Low-activity P-gp vs low-activity OATP1B1</td><td>P-gp (gut efflux): more absorbed, digoxin rises; OATP1B1 (liver uptake): simvastatin stays in plasma</td><td>Putting OATP1B1 in the gut</td><td>pp. 40, 47</td><td data-q="L20-024">L20-024</td></tr>
<tr><td>ABCB1 vs MDR1</td><td>One gene with two names; ABCB1 is newer</td><td>Calling them two genes</td><td>p. 45</td><td data-q="L20-019">L20-019</td></tr>
<tr><td>ABCB1 exon 21 vs exon 26</td><td>Both: digoxin; only exon 26: protease inhibitors</td><td>Linking exon 21 to protease inhibitors</td><td>p. 46</td><td data-q="L20-022">L20-022</td></tr>
<tr><td>SLCO1B1*5 vs *15 and *17</td><td>*5 is one SNP, about 1%; *15 and *17 are common haplotypes containing it</td><td>Treating them as unrelated alleles</td><td>p. 47</td><td data-q="L20-026">L20-026</td></tr>
<tr><td>ADRB1 vs ADRB2 SNPs</td><td>ADRB1: Ser49Gly, Arg389Gly (metoprolol); ADRB2: Arg16Gly (beta-2 agonists)</td><td>Swapping the receptors</td><td>pp. 50-51</td><td data-q="L20-032">L20-032</td></tr>
<tr><td>Beta-1 variant vs EGFR variant</td><td>Beta-1 variant changes drug response; EGFR variant causes the cancer the drug targets</td><td>Giving gefitinib to every lung cancer patient</td><td>pp. 50, 53</td><td data-q="L20-039">L20-039</td></tr>
<tr><td>ALOX5 repeat: drug response vs disease severity</td><td>Linked to inhibitor response, not to asthma severity</td><td>Assuming a treatment variant must cause the disease</td><td>p. 55</td><td data-q="L20-042">L20-042</td></tr>
<tr><td>ACE InDel: efficacy vs adverse effects</td><td>Probably predicts adverse reactions (cough, angioedema), not efficacy</td><td>Linking the InDel to ACE inhibitor efficacy</td><td>p. 56</td><td data-q="L20-044">L20-044</td></tr>
<tr><td>CYP2C9 (PK) vs VKORC1 (PD)</td><td>CYP2C9 clears S-warfarin; VKORC1 is the target; low activity in either lowers the dose</td><td>Swapping PK and PD</td><td>p. 57</td><td data-q="L20-047">L20-047</td></tr>
<tr><td>Low CYP2C9 or VKORC1 vs low CYP4F2</td><td>Low CYP2C9 or VKORC1: less warfarin; low CYP4F2: more active vitamin K, more warfarin</td><td>Lowering the dose for low CYP4F2</td><td>pp. 57-58</td><td data-q="L20-052">L20-052</td></tr>
<tr><td>CYP2C9*2/*3 vs CYP2C19*2/*3</td><td>CYP2C9: reduced activity (*3 lowest); CYP2C19: no active enzyme (premature stop)</td><td>Assuming the same star number means the same effect</td><td>p. 57; p. 25</td><td data-q="L20-048">L20-048</td></tr>
<tr><td>HLA-B*57:01 vs HLA-B*15:02</td><td>B*57:01: abacavir skin toxicity; B*15:02: carbamazepine skin toxicity</td><td>Swapping the drugs</td><td>p. 60</td><td data-q="L20-056">L20-056</td></tr>
<tr><td>Furuta m1 vs m2</td><td>m1 = *2; m2 = *3; wt = *1</td><td>Reading m1 and m2 as phenotypes</td><td>Furuta Table 1 (p. 1028)</td><td data-q="L20-060">L20-060</td></tr>
<tr><td>Furuta group 2 vs group 3</td><td>Group 2 has one *1 allele (some activity); group 3 has none (best cure rate)</td><td>Thinking any variant allele removes all activity</td><td>Furuta Tables 1-2 (pp. 1028-1029)</td><td data-q="L20-063">L20-063</td></tr>
</tbody></table>
<p class="sub">Source: PGx-Examples-Students-Fall-2026.pdf pp. 32-61; FurutaAnnIntMed1998.pdf (reading card furuta-1998); transcript 10/26.</p>

`;
