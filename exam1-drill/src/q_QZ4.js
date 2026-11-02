// QZ4 — Dr. Smith's Quiz 4 (Intro to Pharmacogenomics), the questions on 10/21 material (questions 2, 3, 5 and 7), word for word. Exam 4.
// Source of the questions and options: Smith_Quiz_4_-_Intro_to_Pharmacogenomics.pdf (the student's write-up of the quiz, Google Drive).
// The answers in that file are the student's recorded quiz answers, not a key she posted. Each item is keyed on the recorded answer and
// checked against her own words: transcript 10/21 (and 10/26 for warfarin dosing), Intro to PGx Lecture Students Fall 2026.pdf and
// PGx-Examples-Students-Fall-2026.pdf. Question 1 is L18-067; questions 4, 8, 9 and 10 are QZ3-020 to QZ3-023 (10/20 material, Exam 3).
TOPICS.push({id:'QZ4', name:'Quiz 4 (10/21 questions, verbatim)', prof:'Smith', lecture:'QZ4', cite:'Smith_Quiz_4_-_Intro_to_Pharmacogenomics.pdf',
  subs:[
    {id:'quiz5', name:'Quiz 4: questions on 10/21 material', cite:'Smith_Quiz_4_-_Intro_to_Pharmacogenomics.pdf'}
  ]});

QUESTIONS.push(

{id:"QZ4-001", dupOf:"L18-014", lecture:"QZ4", prof:"Smith", tier:"new", topic:"QZ4", sub:"quiz5", skill:"recall", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"cyp2c19-star2-short-inactive", tags:["smith","quiz"], source:"both",
 stem:"Which genetic variant results in a short, inactive enzyme being expressed?",
 options:[
  {t:"CYP2C9*3", correct:false, why:"CYP2C9*3 has decreased enzyme activity (5% of wild-type activity on her CYP2C9 slide); the protein is still made."},
  {t:"CYP2D6*2", correct:false, why:"CYP2D6*2 is listed with *1 as fully functional."},
  {t:"CYP2C19*2", correct:true, why:"Recorded answer. She said the CYP2C19 *2 allele results in a really short nonfunctional protein, so that gene makes no active enzyme."},
  {t:"CYP2C9*2", correct:false, why:"CYP2C9*2 has decreased enzyme activity (20% of wild-type activity); it is a SNP in the enzyme, not a shortened protein."}],
 teach:"Her Don't Assume slide: the same star number can mean a different effect in a different gene. CYP2C19*2 and *3 both give a truncated protein, too short to be functional, so no active CYP2C19 is made from that gene. CYP2C9*2 and *3 still make enzyme with decreased activity (20% and 5% of wild type), and CYP2D6*2 is fully functional.",
 quote:"The star 2 Allele. Actually results in a really short nonfunctional protein. So if somebody has the 2C192 allelic type, that gene is creating no active enzyme.",
 note:"Quiz 4, question 2, verbatim. The source file is the student's write-up of the quiz; the answer is the student's recorded answer (C), not a key she posted, and her 10/21 words and slides agree. Same point as L18-014.",
 cite:"Smith_Quiz_4_-_Intro_to_Pharmacogenomics.pdf, Quiz 4 question 2; Intro to PGx Lecture Students Fall 2026.pdf slide ‘More Allele “Star” Nomenclature’ (p. 26, Don't Assume); PGx-Examples-Students-Fall-2026.pdf slides ‘CYP2D6 Polymorphisms 3’ (p. 22), ‘CYP2C9 Polymorphisms’ (p. 23), ‘CYP2C19 Polymorphisms’ (p. 25); (T) 10/21 transcript"},

{id:"QZ4-002", lecture:"QZ4", prof:"Smith", tier:"new", topic:"QZ4", sub:"quiz5", skill:"recall", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"genotype-distribution-not-always-bell", tags:["smith","quiz"], source:"both",
 stem:"The population distribution of genotypes is always a normal bell-shaped curve for all genotypes.",
 options:[
  {t:"True", correct:false, why:"In her TPMT example most people are normal metabolizers and the poor metabolizers are a little tiny bar, so the distribution is not a bell for every gene; the words always and for all genotypes make the statement false."},
  {t:"False", correct:true, why:"Recorded answer. Frequencies differ by gene and population: TPMT is mostly normal metabolizers with very few poor metabolizers, and CYP2D6 phenotype frequencies differ widely between populations."}],
 teach:"How often each allele or phenotype occurs differs by gene and by population. For TPMT most people are normal metabolizers and only a small bar are poor metabolizers, who could die on a normal azathioprine dose. On 10/26 she added that the wild type is not always in the middle. CYP2D6 differs too: 5-10% of Caucasians are poor metabolizers, while 13-29% of Ethiopians are ultra-rapid.",
 quote:"In this particular graph, only a few people in the sub-Saharan African population are poor metabolizers. There's a little tiny bar of, of orange there, right? OK. Most people are normal metabolizers in this population right here.",
 note:"Quiz 4, question 3, verbatim. The source file is the student's write-up of the quiz; the answer is the student's recorded answer (False), not a key she posted, and her 10/21 words agree. The TPMT activity histogram point (wild type not always in the middle) is L20-006, taught 10/26.",
 cite:"Smith_Quiz_4_-_Intro_to_Pharmacogenomics.pdf, Quiz 4 question 3; PGx-Examples-Students-Fall-2026.pdf slides ‘Allele and Phenotype Frequencies’ (p. 9), ‘CYP2D6 Polymorphisms 3’ (p. 22); (T) 10/21 transcript; transcript 10/26"},

{id:"QZ4-003", dupOf:"L18-043", lecture:"QZ4", prof:"Smith", tier:"new", topic:"QZ4", sub:"quiz5", skill:"recall", core:true, coreWhy:"her own quiz question, verbatim",
 concept:"synonymous-snp-no-aa-change", tags:["smith","quiz"], source:"both",
 stem:"A synonymous SNP changes a protein's amino acid sequence.",
 options:[
  {t:"True", correct:false, why:"In her example, ABCB1 3435C>T changes ATC to ATT, and both codons code for isoleucine, so the amino acid sequence is unchanged."},
  {t:"False", correct:true, why:"Recorded answer. Synonymous means the same: the nucleotide changes, but the resulting amino acid, and so the protein sequence, does not."}],
 teach:"A synonymous single nucleotide polymorphism (SNP) changes one base in a coding region without changing the amino acid, because more than one codon codes for the same amino acid. In ABCB1 3435C>T, ATC becomes ATT and both give isoleucine. The slide says there is no clear consensus on an effect on P-gp function or expression; she suggested expression levels may be affected.",
 quote:"Synonymous means the same. The change resulted in still the same protein, no change to the protein, OK.",
 note:"Quiz 4, question 5, verbatim. The source file is the student's write-up of the quiz; the answer is the student's recorded answer (False), not a key she posted, and her 10/21 words and slide agree. Same point as L18-043.",
 cite:"Smith_Quiz_4_-_Intro_to_Pharmacogenomics.pdf, Quiz 4 question 5; Intro to PGx Lecture Students Fall 2026.pdf slide ‘Synonymous SNP: P-Glycoprotein (P-gp)’ (p. 34); (T) 10/21 transcript"},

{id:"QZ4-004", lecture:"QZ4", prof:"Smith", tier:"new", topic:"QZ4", sub:"quiz5", skill:"recall", core:true, coreWhy:"her own quiz question, verbatim", multi:true,
 concept:"warfarin-dose-genes-cyp2c9-vkorc1", tags:["smith","quiz"], source:"both",
 stem:"What genes have genetic variants that affect the needed dose of warfarin? Select all that apply.",
 options:[
  {t:"CYP2C9", correct:true, why:"Recorded answer. CYP2C9*2 and *3 have decreased ability to metabolize S-warfarin, a pharmacokinetic effect."},
  {t:"CYP2C19", correct:false, why:"Her CYP2C19 substrates are proton pump inhibitors, fluoxetine, sertraline and diazepam; warfarin is on the CYP2C9 slide."},
  {t:"Vitamin K", correct:false, why:"Vitamin K is not a gene. It is the cofactor whose reactivation warfarin prevents, and the antidote given in warfarin overdose."},
  {t:"VKORC1", correct:true, why:"Recorded answer. VKORC1 haplotypes have low activity, a pharmacodynamic effect at warfarin's target."}],
 teach:"Warfarin integrates both kinds of variant. CYP2C9 metabolizes S-warfarin, and CYP2C9*2 and *3 decrease that metabolism (pharmacokinetic). VKORC1, the vitamin K epoxide reductase that warfarin inhibits, has low-activity haplotypes (pharmacodynamic). The warfarin dose has to be lowered depending on the CYP2C9 and VKORC1 genotype combination to prevent bleeding.",
 quote:"2C9 metabolizes warfarin, right? ... Just considering the two genes, VKRC1 and 2C9.",
 note:"Quiz 4, question 7, verbatim, except that the quiz stem ends \"Select all that apply. No partial credit will be given.\" and is written here ending at \"Select all that apply.\" The source file is the student's write-up of the quiz; the answer is the student's recorded answer (A and D), not a key she posted. VKORC1 was named for warfarin dosing on 10/21; the dosing slide was taught on 10/26, and her words that day agree.",
 cite:"Smith_Quiz_4_-_Intro_to_Pharmacogenomics.pdf, Quiz 4 question 7; PGx-Examples-Students-Fall-2026.pdf slides ‘CYP2C9 Polymorphisms’ (p. 23), ‘CYP2C19 Polymorphisms’ (p. 25), ‘Integrated Both PK and PD’ (p. 57); (T) 10/21 transcript; transcript 10/26"}

);
