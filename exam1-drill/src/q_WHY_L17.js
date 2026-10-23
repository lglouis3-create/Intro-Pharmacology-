// L17 "why" questions — Day 17 (10/20): Introduction to pharmacogenomics (Dr. Smith). Exam 3 scope only: PDF pp. 1–21
// (the class vote); nothing from pp. 22–41. Each item tests a reason she stated in the 10/20 transcript. Sources: transcript 10/20,
// then Intro_to_PGx_Lecture_Students_Fall_2026.pdf. Subs are those of the L17 TOPICS entry in q_L17.js.
QUESTIONS.push(
/* ---------------- Why pharmacogenomics: history ---------------- */
{id:"L17-101", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"history", skill:"apply",
 concept:"interindividual-variation-factors", tags:["smith","why"], source:"both",
 stem:"Why did pharmacogenomics come into medicine, when it was not part of medicine before?",
 options:[
  {t:"Responses to one drug varied widely between people", correct:true, why:"The same drug gave a lethal side effect in one person and no effect in another; explaining that range is what led to genetics once knowledge of genes grew."},
  {t:"Whole genome sequencing became possible in hours", correct:false, why:"Whole genome sequencing came much more recently; the field began with clinicians noticing how differently people responded to the same drug."},
  {t:"Patients given the same drug responded alike", correct:false, why:"The reverse: the observation that started it was how differently people respond."},
  {t:"Over half of patients took drugs affected by genes", correct:false, why:"That is the MacKinnon et al. (2023) finding, a recent measure of impact, not why the field began."}],
 teach:"Clinicians observed large inter-individual variation in drug therapy response: one person could have a lethal side effect from a drug while another was not affected at all. Age, ethnicity, gender and underlying disease explained part of that variation. As knowledge of genes and of how genes interact with medications grew, genetic variation could explain more of it, and that is why pharmacogenomics is now part of medicine.",
 quote:"the reason why we have it is because we started observing that there's sometimes a large interindividual variation in drug therapy response. ... Sometimes, one person could have a lethal response due to the side effects of a drug, and somebody else is not affected at all by it",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Introduction: Inter-Individual Variations’ (p. 4); transcript 10/20"},

{id:"L17-102", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"history", skill:"apply",
 concept:"primaquine-first-indication", tags:["smith","why"], source:"both",
 stem:"In the Korean War, what first suggested that the hemolytic anemia some soldiers developed on primaquine had an inherited cause?",
 options:[
  {t:"The bad responses fell along the lines of ethnicity", correct:true, why:"Astute clinicians saw that soldiers of Middle Eastern or African descent were the ones responding badly."},
  {t:"Genotyping found a variant in the soldiers' DNA samples", correct:false, why:"No one could genotype at that time; enzyme activity was what could be measured."},
  {t:"The anemia appeared in the soldiers given higher doses", correct:false, why:"Everybody got primaquine; the pattern was ethnicity, not dose."},
  {t:"Each soldier given primaquine developed anemia", correct:false, why:"Everybody was given primaquine, but only some soldiers developed hemolytic anemia."}],
 teach:"Primaquine was given to military personnel in the field as an antimalarial prophylactic, and some soldiers developed hemolytic anemia. Clinicians observed that the soldiers responding badly were of Middle Eastern or African descent: the significant adverse response fell along the lines of ethnicity, which pointed to an inherited trait. Low glucose-6-phosphate dehydrogenase (G6PD) activity in their red blood cells was then found to be the phenotype that reflected their genotype.",
 quote:"The clinicians there in that Korean War setting were astute enough to observe that it was people of Middle Eastern or of African descent seemed to be the ones that were having this bad response to Primaquin. ... It's falling along the lines of ethnicity.",
 note:"The transcript renders primaquine as \"Primaquin\". The slide wording: \"Patients of Middle Eastern and African descent seemed most at risk\".",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Introduction: History of Primaquine’ (p. 5); transcript 10/20"},

{id:"L17-103", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"history", skill:"apply",
 concept:"twin-study-heritability", tags:["smith","why"], source:"both",
 stem:"Why did the classic twin studies compare identical twin pairs with fraternal twin pairs?",
 options:[
  {t:"To show that drug metabolism variability is heritable", correct:true, why:"Identical pairs share a genotype; fraternal pairs are related but differ genetically much more. If identical pairs match and fraternal pairs vary, genes explain the difference."},
  {t:"To compare the genotypes of the two kinds of twins", correct:false, why:"No one was genotyped in these studies; half-life was measured."},
  {t:"To test whether fraternal twins absorb drugs faster", correct:false, why:"The measurement was the half-life of clearance by metabolism, not absorption."},
  {t:"To show that diet and habits set drug clearance", correct:false, why:"Diet and habits are environmental factors; the twin design was built to show heritability."}],
 teach:"Fraternal twins are related but do not share the same genotype; she likened them to 'just grabbing random people out of the population'. Giving identical and fraternal pairs the same drug and comparing half-lives within each pair shows heritability: almost all identical pairs had the same half-life, while the fraternal pairs varied. The slide calls it a twin study illustrating heritability of drug metabolism variability.",
 quote:"By using fraternal twins, we are replicating what might be happening in. ... they're related ... but definitely their genotypes are not obviously similar to each other, almost like ... just grabbing random people out of the population ... they really wanted to show heritability here, so they used identical twins and then fraternal twins.",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Introduction: Twin Studies Data’ (p. 7, G&G Fig. 4-2); transcript 10/20"},

{id:"L17-104", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"history", skill:"apply",
 concept:"twin-study-antipyrine-phenotype", tags:["smith","why"], source:"transcript",
 stem:"Why did the classic twin studies measure the half-life of antipyrine instead of each twin's genotype?",
 options:[
  {t:"The ability to genotype people came later", correct:true, why:"\"We did not genotype these people at this time\"; studies became more sophisticated once people could be genotyped."},
  {t:"Half-life is the main phenotype a drug can have", correct:false, why:"A phenotype is any observable characteristic; half-life was simply the one measured."},
  {t:"Antipyrine is cleared without any enzyme", correct:false, why:"Antipyrine is cleared all the way by metabolism, by one enzyme."},
  {t:"Identical twins are known to share a genotype", correct:false, why:"True of identical twins, but fraternal twins differ, and genotyping was not yet possible for anyone."}],
 teach:"In the twin studies nobody was genotyped; the measurement was a phenotype, the half-life of antipyrine clearance. Antipyrine is cleared entirely by metabolism by one enzyme, so the half-life showed cleanly whether that enzyme was working in the normal range. Once people could be genotyped, evaluation of drug response based on genetics became more sophisticated.",
 quote:"We did not genotype these people at this time. We were looking at their phenotype, which was the half-life of the clearance of the drug ... as we then got the ability to genotype people, we got to be more sophisticated with our evaluation of how people are responding to medications based on their genetics",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Introduction: Twin Studies Data’ (p. 7); transcript 10/20"},

{id:"L17-105", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"history", skill:"apply",
 concept:"hgp-sequencing-speed", tags:["smith","why"], source:"transcript",
 stem:"What explains why whole genome sequencing can now be done in a matter of hours?",
 options:[
  {t:"Methods developed during the Human Genome Project", correct:true, why:"New protocols, procedures and machines made during the project allowed much faster DNA sequencing."},
  {t:"The Human Genome Project sequenced genomes in hours", correct:false, why:"The project started with very slow but proven methods; whole genome sequencing came much more recently."},
  {t:"Labs now skip the DNA between coding regions", correct:false, why:"The regions between coding DNA have now been sequenced and defined as well."},
  {t:"Twin studies replaced the need for sequencing", correct:false, why:"Twin studies measured a phenotype; they did not replace sequencing."}],
 teach:"The Human Genome Project began in 1990 with very slow but proven methods. While it ran, people worked out how to sequence faster and prepared new protocols, procedures and machines. Whole genome sequencing came after the project, but those advances set the stage for sequencing a whole genome in a matter of hours.",
 quote:"As they got through this project, other people were really into figuring out how can we do this faster. So when the human genome project was done, a whole lot of technological advances occurred because. People ... prepared new protocols, new procedures, new machines that allowed us to do DNA sequencing a lot faster so we can now do whole genome sequencing in a matter of hours.",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Introduction: Genomics History’ (p. 6); transcript 10/20"},

{id:"L17-106", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"history", skill:"apply",
 concept:"hgp-data-sharing", tags:["smith","why"], source:"transcript",
 stem:"Why did the labs in the Human Genome Project put each DNA sequence they found into a database everyone could access?",
 options:[
  {t:"They saw the benefit to the world of sharing", correct:true, why:"The people who planned the project set it up so everyone shared, having realized the benefit to the world."},
  {t:"Drug company contracts required them to share", correct:false, why:"Industry was one partner beside academics and government agencies; the sharing was described as giving and altruistic, not contractual."},
  {t:"They wanted to publish before other labs", correct:false, why:"That is the usual habit it was contrasted with: scientists hide work so nobody scoops them."},
  {t:"It let one lab publish the whole genome", correct:false, why:"It was a worldwide consortium of academics, industry and government agencies."}],
 teach:"Scientists usually hide their work so that nobody publishes it first. The Human Genome Project was set up so that labs around the world each sequenced a stretch of DNA and put it in a shared database, because its planners realized the benefit to the world of sharing the data. The project was completed in 2003, early and under budget.",
 quote:"Most scientists, we're all a little jealous. ... we do our work ... we hide it so nobody will scoop you. ... the people that dreamed up this project set it up in such a way that everybody was very giving and altruistic and willing to share the data because they realized the benefit ... to the world if we shared that data.",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Introduction: Genomics History’ (p. 6); transcript 10/20"},

/* ---------------- Impact, uses and limitations ---------------- */
{id:"L17-107", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"impact", skill:"apply",
 concept:"pgx-practice-areas", tags:["smith","why"], source:"transcript",
 stem:"Why will pharmacists need to keep educating themselves in pharmacogenomics after they graduate?",
 options:[
  {t:"The field keeps moving forward rapidly", correct:true, why:"The reason for teaching the basics and a way of thinking: the field moves rapidly and information is added all the time."},
  {t:"The basic terms keep changing their meaning", correct:false, why:"The terms are the basics set up now; what keeps growing is new information about variants and drug response."},
  {t:"Pharmacy school does not teach pharmacogenomics", correct:false, why:"Pharmacy students are the best educated in pharmacogenomics."},
  {t:"Prescribers are better versed in it than pharmacists", correct:false, why:"Reversed: prescribers are not yet as well versed as pharmacists."}],
 teach:"The gain and sharing of knowledge and the technology developed during the Human Genome Project moved the field forward rapidly, and more information is added all the time. So the course sets up basic examples and a basic understanding, with a way of thinking that lets pharmacists keep educating themselves. Pharmacogenomics is expected in every area of pharmacy to some degree: oncology uses it all the time, and it is big in central nervous system (CNS) and cardiology practice and growing in infectious disease.",
 quote:"that rapidity of moving forward is the reason why I told you guys early on in this ... course ... I'm hoping you guys will be learning how to think like this ... so you can keep educating yourselves as ... you get into your profession",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Introduction: Genomics History’ (p. 6); transcript 10/20"},

{id:"L17-108", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"impact", skill:"apply",
 concept:"prescribers-less-versed", tags:["smith","why"], source:"transcript",
 stem:"Why are prescribers not yet as well versed in pharmacogenomics as pharmacists?",
 options:[
  {t:"They spend less time with drugs than pharmacists", correct:true, why:"Pharmacogenomics is pharmacy with genetics; prescribers spend less time with drugs than pharmacists do."},
  {t:"They rarely prescribe drugs affected by genes", correct:false, why:"MacKinnon et al. (2023) found more than half of patients were prescribed medications where pharmacogenomics is important."},
  {t:"Genetic test results go to pharmacists, not them", correct:false, why:"Access to results is not the gap described; the gap is time spent with drugs."},
  {t:"Pharmacogenomics applies to dispensing, not prescribing", correct:false, why:"Anybody prescribing should know pharmacogenomics."}],
 teach:"Pharmacy students are the best taught in pharmacogenomics because it is pharmacy with genetics. Prescribers do not spend as much time with drugs as pharmacists do, so they are not yet as well versed in it, even though anybody prescribing should know it. Nurses and other providers should know it too.",
 quote:"You guys are the best taught about it because it's pharmacy with genetics ... our prescribers are not as well versed yet in pharmacogenomics, cause they don't spend as much time with drugs as you guys do.",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Introduction: Impact of Pharmacogenomics’ (p. 9); transcript 10/20"},

/* ---------------- Target areas; digoxin and P-glycoprotein ---------------- */
{id:"L17-109", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"targets", skill:"apply",
 concept:"pgp-affects-bioavailability", tags:["smith","why"], source:"transcript",
 stem:"Why does being a substrate for P-glycoprotein (P-gp) in the gut affect an oral drug's bioavailability?",
 options:[
  {t:"P-gp pumps the drug back into the gut lumen", correct:true, why:"P-gp is an efflux transporter: it grabs drug crossing the lumen cells and pumps it back, so less reaches the systemic circulation."},
  {t:"P-gp metabolizes the drug in the gut wall", correct:false, why:"P-gp is a transporter, not a metabolizing enzyme."},
  {t:"P-gp carries the drug from the lumen into the blood", correct:false, why:"The reverse direction: P-gp effluxes drug back into the lumen."},
  {t:"P-gp speeds the drug's excretion by the kidney", correct:false, why:"The answer is absorption into the systemic circulation, bioavailability; gut P-gp pumps drug back into the lumen."}],
 teach:"P-glycoprotein, encoded by the ABCB1 gene, is an efflux transporter expressed in the gut. As an oral drug tries to cross the cells lining the gut lumen, P-gp grabs it and pumps it back into the lumen to be passed in the stool. That limits absorption into the systemic circulation, which is the drug's bioavailability.",
 quote:"PGP is an e-flux transporter. ... In other words, the drug in your gut lumen is trying to go across those lumen cells, and PGP is grabbing it and pumping it back into the lumen so that you're gonna poop it out",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Introduction: Three Target Areas’ (p. 10); transcript 10/20"},

{id:"L17-110", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"targets", skill:"apply",
 concept:"low-pgp-digoxin-bioavailability-up", tags:["smith","why"], source:"transcript",
 stem:"A patient with a low-activity version of P-glycoprotein (P-gp) takes oral digoxin. Which best explains why digoxin's bioavailability goes up?",
 options:[
  {t:"Less digoxin is pumped back into the gut lumen", correct:true, why:"Low-activity P-gp does little effluxing and lets the drug go through to be absorbed."},
  {t:"More digoxin is pumped back into the gut lumen", correct:false, why:"That would lower bioavailability; low-activity P-gp pumps less."},
  {t:"Digoxin is metabolized more slowly in the liver", correct:false, why:"P-gp is a transporter in the gut; metabolism is the metabolizing-enzyme target area."},
  {t:"The kidney excretes less digoxin into the urine", correct:false, why:"Bioavailability here is absorption into the systemic circulation from the gut."}],
 teach:"Digoxin is a substrate for P-gp in the gut. A low-activity P-gp variant does not grab as much digoxin to stop it from being absorbed; it does little effluxing and lets the drug go through. More digoxin reaches the systemic circulation, so its bioavailability goes up.",
 quote:"So a person with a low activity version of PGP, it's not grabbing so much drug and preventing it from being absorbed. It's letting it go through, because it's not very active, it's not doing much e-fluxing.",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Introduction: Three Target Areas’ (p. 10); transcript 10/20"},

{id:"L17-111", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"targets", skill:"apply",
 concept:"low-pgp-digoxin-bioavailability-up", tags:["smith","why"], source:"both",
 stem:"Why can a normal dose of digoxin produce high blood levels and affect heart rate too much in a patient with low-activity P-glycoprotein (P-gp)?",
 options:[
  {t:"The dose assumes P-gp blocks part of absorption", correct:true, why:"Digoxin is dosed knowing it is a P-gp substrate; with low-activity P-gp, more of the same dose is absorbed."},
  {t:"The dose was set for patients with low-activity P-gp", correct:false, why:"The reverse: the dose assumes P-gp is grabbing a lot of the drug."},
  {t:"Low-activity P-gp increases digoxin's metabolism", correct:false, why:"P-gp is a transporter; it does not metabolize digoxin."},
  {t:"Digoxin has a wide therapeutic index in most patients", correct:false, why:"Digoxin has a very narrow therapeutic index, so a rise in absorption matters."}],
 teach:"Digoxin is a heart-rate drug with a very narrow therapeutic index, and it is dosed knowing that P-gp in the gut stops a lot of it from being absorbed. In a patient with low-activity P-gp, more of the same dose gets into the systemic circulation. Blood levels can then be high on a normal dose, and heart rate is affected too much.",
 quote:"If a person has taken digoxin, cardiac med helps us control heart rate, it has a very narrow therapeutic index. ... But we dose it because we know that it's a substrate for PGP. So, PGP is gonna grab that drug and stop it from being absorbed into the systemic circulation a lot of the time",
 note:"The slide's \"May have serious implications for narrow therapeutic-index drugs\" sits under the metabolizing-enzyme bullet; she applied narrow therapeutic index to digoxin aloud.",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Introduction: Three Target Areas’ (p. 10); transcript 10/20"},

{id:"L17-112", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"targets", skill:"apply", core:true, coreWhy:"her Quiz 4 item: order of the target areas (metabolizing enzymes, then transporters, then drug targets)",
 concept:"four-target-areas", tags:["smith","why"], source:"transcript",
 stem:"What made drug transporters the next area of pharmacogenomics to be studied a lot, after metabolizing enzymes?",
 options:[
  {t:"P-glycoprotein variants explained high digoxin levels", correct:true, why:"Variants affecting P-gp activity explained why some patients had lots of digoxin in the bloodstream on a normal dose."},
  {t:"Transporter variants mainly reduce drug efficacy", correct:false, why:"Transporter variants change pharmacokinetics and can add to the toxicity bucket, as with high digoxin levels; reduced efficacy is the bucket for drug-target variants."},
  {t:"Metabolizing enzymes turned out to have few variants", correct:false, why:"Metabolizing enzymes are where the most is known about variants."},
  {t:"Drug targets had already been well explained", correct:false, why:"Drug targets came after transporters and have moved more slowly."}],
 teach:"Once the gene that expresses P-glycoprotein (ABCB1) was identified, genetic variants that affect P-gp activity were found. They explained why some patients had lots of digoxin in the bloodstream on a normal dose, with heart rate affected too much. That is why drug transporters were the next area studied a lot; many more transporters, in the liver, the brain and elsewhere, are now an active research area.",
 quote:"we started realizing that this was an issue as we learned more about PGP when we identified the gene that expresses PGP and then we started identifying genetic variants that affect its activity, we realized ... this is why some patients have. Lots of digoxin in their bloodstream, even though we gave them the normal dose. And we affected their heart rate too much. ... that's why drug transporters were the next thing that we studied a lot.",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Introduction: Three Target Areas’ (p. 10); transcript 10/20"},

/* ---------------- Impact on PK and PD: the two buckets ---------------- */
{id:"L17-113", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"pkpd", skill:"apply",
 concept:"efficacy-toxicity-buckets", tags:["smith","why"], source:"transcript",
 stem:"Why does a variant that makes a drug-metabolizing enzyme less active fall into the toxicity bucket?",
 options:[
  {t:"The drug is not cleared well and blood levels rise", correct:true, why:"Poor metabolism and clearance raise drug blood concentrations, giving an adverse response."},
  {t:"The drug's receptor no longer responds to the drug", correct:false, why:"A poorly responding receptor belongs to the efficacy bucket."},
  {t:"Less of the drug is absorbed from the gut", correct:false, why:"Less absorption would lower blood levels, not raise them."},
  {t:"The cancer cell lacks the target protein the drug binds", correct:false, why:"A missing target belongs to the efficacy bucket (individualized medicine)."}],
 teach:"A variant in the gene for a drug-metabolizing enzyme can make the enzyme less active. The patient then does not metabolize and clear the drug very well, drug blood concentrations go too high, and the result is an adverse response, toxicity. This is a pharmacokinetic (PK) effect; transporter variants can add to the toxicity bucket too.",
 quote:"If you don't metabolize and clear that drug very well, if I've got that variation of the metabolizing enzyme, I may not clear that drug very well, and I could definitely get my drug blood concentrations too high and have adverse response or toxicity. ... So that's the bucket of toxicity.",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Impact of Pharmacogenomics on PK and PD’ (p. 11); transcript 10/20"},

{id:"L17-114", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"pkpd", skill:"apply",
 concept:"efficacy-toxicity-buckets", tags:["smith","why"], source:"both",
 stem:"A patient's receptor for a drug carries a genetic variant that makes it respond poorly. Why does this fall into the efficacy bucket rather than the toxicity bucket?",
 options:[
  {t:"The drug's target, not its blood level, is affected", correct:true, why:"A receptor that does not work well limits the response the drug is trying to produce."},
  {t:"The drug builds up in the blood to toxic levels", correct:false, why:"Build-up from poor clearance is the toxicity bucket, a pharmacokinetic effect."},
  {t:"The drug is pumped back into the gut lumen", correct:false, why:"That is a transporter (P-glycoprotein) effect on absorption."},
  {t:"The variant changes absorption and excretion", correct:false, why:"Absorption and excretion are pharmacokinetics, the top arc of the figure."}],
 teach:"In the PharmGKB figure, variants in pharmacodynamic (PD) genes, such as a drug target that is a receptor, change the mechanism of action and so the drug response. If a receptor's variant makes it not respond very well, a drug trying to find that receptor and get a response cannot do it, so efficacy is affected. Variants in metabolizing enzymes and transporters change pharmacokinetics (PK) and fall into the toxicity bucket.",
 quote:"If you've got a receptor that has a genetic variant that makes that receptor not respond very well, then giving it a drug that's trying to find that receptor and get a response, if that receptor's not working very well because of its mutation, it's going to affect efficacy ... So that's the bucket of efficacy.",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Impact of Pharmacogenomics on PK and PD’ (p. 11, PharmGKB figure); transcript 10/20"},

/* ---------------- Wild type, variant, polymorphism ---------------- */
{id:"L17-115", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"variant", skill:"apply",
 concept:"wild-type-vs-variant", tags:["smith","why"], source:"both",
 stem:"Why is the gene version called the wild type in the genetics literature sometimes not the most common version?",
 options:[
  {t:"It may be the version scientists understood first", correct:true, why:"The label went to the version studied first, whether or not it is the most common; she met this in her own graduate research."},
  {t:"Wild type names the version with no enzyme activity", correct:false, why:"Wild type says nothing about activity; for CYP2C19 the wild type (*1) has normal activity."},
  {t:"It is defined as the version in under 1% of people", correct:false, why:"Under 1% describes a rare variant."},
  {t:"Wild type is the older name for a mutant version", correct:false, why:"Mutant was an older word for variant, and it is no longer used."}],
 teach:"Wild type usually means the most common version of a gene, and a variant is a less common version. In the genetics literature, though, the version called wild type is sometimes not the most common; it may be the one scientists understood first, which can make pulling literature on a wild type confusing. On her test, wild type as the most common version is accepted.",
 quote:"Sometimes you will find in the literature of genetics that. The wild type may not be the most common, but maybe it was the one that the scientists understood first.",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Wildtype vs Variant’ (p. 13); transcript 10/20"},

{id:"L17-116", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"variant", skill:"apply", core:true, coreWhy:"her words: every slide with a term on it (polymorphism definition)",
 concept:"gene-deletion-can-be-polymorphic", tags:["smith","why"], source:"both",
 stem:"Why can a single nucleotide polymorphism (SNP) and a whole gene deletion both be called polymorphisms?",
 options:[
  {t:"The term depends on how often a change occurs", correct:true, why:"\"polymorphism definition speaks to the frequency of that change happening\": at least 1% of a population."},
  {t:"Both change one nucleotide in the gene sequence", correct:false, why:"A whole gene deletion removes a gene, not one nucleotide."},
  {t:"Both cause a complete loss of enzyme activity", correct:false, why:"The definition says nothing about the effect on activity."},
  {t:"Both occur in less than 1% of a population", correct:false, why:"Under 1% makes a variation a rare variant."}],
 teach:"A polymorphism is a variation in DNA sequence present in at least 1% of a population; the same kind of change in less than 1% is a rare variant. The definition speaks only to frequency, not to the kind of change. So a one-nucleotide change, more than one nucleotide change, an entire gene insertion or deletion, extra copies of a gene or a sister chromatid exchange is a polymorphism whenever it occurs in at least 1% of the population.",
 quote:"any kind of genetic. Craziness that you can think of, if it happens in more than 1 in 1% or more of the population, by definition it's polymorphic. ... polymorphism definition speaks to the frequency of that change happening",
 note:"Wording varies: slide \"If present > 1% of the population\" (the symbol is underlined, read as at least); she says \"at least 1%\", \"more than 1%\" and \"1% or more\". Keyed on at least 1%.",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Polymorphism’ (p. 14); transcript 10/20"},

{id:"L17-117", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"variant", skill:"apply",
 concept:"why-rare-variant-term", dupOf:"L17-031", tags:["smith","why"], source:"transcript",
 stem:"Why do rare variants get attention, even though each one occurs in less than 1% of a population?",
 options:[
  {t:"The patient who has one still has the bad response", correct:true, why:"Rare variants still happen, and that patient still feels bad or has a dangerous response."},
  {t:"Rare variants occur more often than polymorphisms", correct:false, why:"Polymorphisms are the more frequent ones, at least 1%."},
  {t:"Rare variants are the easiest variants to genotype", correct:false, why:"Ease of testing is not why they matter; some were found only on a closer look at a patient who lacked the known polymorphism."},
  {t:"Rare variants replace the wild type in most people", correct:false, why:"By definition they occur in less than 1% of people."}],
 teach:"Polymorphisms explain a lot of the variation in drug response, but some patients respond badly without carrying the known polymorphism. A closer look at their genes can show a variation that few or no other people have. The rarity does not matter to that patient: they still feel bad on the drug or have a dangerous response, so rare variants of any kind now get attention.",
 quote:"but that poor patient, it doesn't matter that their variant occurs very, very infrequently, they still feel bad when you give them that drug, or they still have a dangerous drug response. ... So what's the reason why we talk about rare variants? Cause they still happen, and it really is a bummer if you're that person with that rare variant",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Polymorphism’ (p. 14); transcript 10/20"},

/* ---------------- Allele ---------------- */
{id:"L17-118", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"allele", skill:"apply",
 concept:"allele-definition", tags:["smith","why"], source:"both",
 stem:"Why does each person's genotype for a gene consist of two alleles?",
 options:[
  {t:"Humans are diploid, with one copy from each parent", correct:true, why:"Two copies of every chromosome, so two copies of each gene: one from the biological mother, one from the biological father."},
  {t:"Each gene has two variants in the population", correct:false, why:"A gene can have many variants; the two alleles are one person's two copies."},
  {t:"One allele is wild type and the other a variant", correct:false, why:"Both copies can be the same, as in a homozygous person."},
  {t:"Each gene makes two different proteins in each cell", correct:false, why:"Confuses alleles with gene products; the two alleles are two inherited copies of the gene."}],
 teach:"Humans are diploid organisms: they generally have two copies of every chromosome, and so two copies of the same gene. One copy, an allele, comes from the biological mother and the other from the biological father. The two alleles a person has for a gene are that person's genotype, and they can be the same (homozygous) or different (heterozygous).",
 quote:"we're diploid, we've got 2 copies of every gene, most of us. ... get a little from your mother, get a little from your father. Got 2 copies. ... The two alleles that anybody has represents their genotype",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slides ‘Allele’ (p. 15), ‘Genotype vs phenotype’ (p. 17); transcript 10/20"},

/* ---------------- Genotype, phenotype, functional significance ---------------- */
{id:"L17-119", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"genophen", skill:"apply", core:true, coreWhy:"her words: functional significance is 'a big key word in the world of pharmacogenomics'",
 concept:"functional-significance", tags:["smith","why"], source:"both",
 stem:"Why does the functional significance of a genetic variation need to be known?",
 options:[
  {t:"To explain the patient's drug response phenotype", correct:true, why:"The phenotype comes from how the gene product (protein, enzyme or transporter) works; knowing how the variant changes that product links genotype to response."},
  {t:"To decide whether the variant is a polymorphism", correct:false, why:"That depends on frequency, not function."},
  {t:"To find which parent passed the variant on", correct:false, why:"Confuses inheritance with function; functional significance is what the change does to the gene product, whichever parent passed it on."},
  {t:"To place the variant at its locus on the chromosome", correct:false, why:"Location is the locus, not function."}],
 teach:"Functional significance is what a change in a gene does to how the gene's product, a protein, enzyme or transporter, works. A drug response phenotype comes from how that product works, so without knowing how the variation changes it, the phenotype cannot be explained. She calls functional significance a big key word in pharmacogenomics.",
 quote:"Why do we need to know the functional significance? Well, if we don't know how that genetic variation is changing how the gene product works, how are we gonna explain our drug response phenotype?",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Complications of Genotype vs phenotype’ (p. 18); transcript 10/20"},

{id:"L17-120", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"genophen", skill:"apply",
 concept:"functional-significance", tags:["smith","why"], source:"both",
 stem:"Why can information about CYP2C19*2 be used to decide whether a patient gets a drug or a reduced dose?",
 options:[
  {t:"Its functional significance is known", correct:true, why:"The genotype-phenotype relationship for *2 is tight: the enzyme is known to be inactive, and why."},
  {t:"It occurs in less than 1% of the population", correct:false, why:"Under 1% is a rare variant; frequency is not what makes a variant usable for dosing decisions."},
  {t:"It is the most common, wild type version", correct:false, why:"*2 is a variant, with no enzyme activity."},
  {t:"It changes how the drug's receptor responds", correct:false, why:"CYP2C19 is a metabolizing enzyme, not a receptor."}],
 teach:"For CYP2C19*2 the genotype-phenotype relationship is tight: the *2 variant is known to have no enzyme activity, and even the reason it is not active is known. When the functional significance of a variant is known, that knowledge can be used to decide whether a patient should get a drug or whether the dose should be reduced. Many variants are not that clear, because of the complications of the genotype-phenotype relationship.",
 quote:"A lot of the examples we'll talk about, we know a lot about that genotype phenotype relationship. We know the functional significance of that genetic variant I'm going to tell you about ... That's why we can use this information to help us make decisions about whether a certain patient should get a drug or not, whether you need to reduce the dose of the drug or not.",
 note:"The transcript renders CYP2C19*2 as \"2C192\" and star as \"SAR\" or \"SA\". The genotype CYP2C19*2/*2 is on the slide (p. 17); that *2 has no activity was said aloud on 10/20.",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slides ‘Genotype vs phenotype’ (p. 17), ‘Complications of Genotype vs phenotype’ (p. 18); transcript 10/20"},

{id:"L17-121", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"genophen", skill:"apply",
 concept:"multigenic-drug-response-weighting", tags:["smith","why"], source:"both",
 stem:"Why is a drug response phenotype often hard to predict from a variant in a single gene?",
 options:[
  {t:"Several genes can each add to the response", correct:true, why:"Drug response can be multigenic: one variant may have a large impact, another a smaller one, and together they produce the response."},
  {t:"A gene carries a single variant site at a time", correct:false, why:"One gene can carry many polymorphisms."},
  {t:"Genotypes are not measured in living patients", correct:false, why:"Patients are genotyped; for some drugs it is standard protocol."},
  {t:"Variants in drug response genes are rare variants", correct:false, why:"Frequency is not the complication; many are polymorphisms."}],
 teach:"Most traits are multigenic, not monogenic, and drug response can be multigenic too. A variant in one gene may have a large impact on the response while a variant in another gene has a smaller one, and the two genotypes added together can result in an adverse response. So one gene does not account for the whole response; the field is getting better at weighting each gene's contribution.",
 quote:"some phenotype genotype relationships in our response to medications is driven by one genetic variant. ... a lot of the time, our response to medications is affected by more than one genetic variation. ... But we look at them together and say, oh, this genotype and this genotype added together result in adverse response.",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Complications of Genotype vs phenotype’ (p. 18); transcript 10/20"},

{id:"L17-122", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"genophen", skill:"apply",
 concept:"epigenetic-environment-factors", tags:["smith","why"], source:"both",
 stem:"Two patients carry the same genetic variant but respond differently to the same drug. Which explains this?",
 options:[
  {t:"Environment and epigenetics change gene expression", correct:true, why:"Diet, habits, sleep, stress, DNA methylation and histone modification (her word: histones) affect how genes are expressed and the significance of a variation."},
  {t:"Diet and stress change the patient's DNA sequence", correct:false, why:"The two patients carry the same variant, so the difference is not in the sequence; diet, habits, sleep and stress affect how genes are expressed."},
  {t:"One patient's variant is dominant, the other's recessive", correct:false, why:"Pharmacogenomics does not discuss variants as dominant or recessive."},
  {t:"The variant's frequency differs between the two patients", correct:false, why:"Frequency is a population measure, not a property of one person."}],
 teach:"Environmental factors such as diet, habits, lack of exercise, sleep and stress can affect how genes are expressed, and so can more internal factors, DNA methylation and histone modification (her word: histones), called epigenetic factors. These affect the significance of a genetic variation. So the same genotype does not always give the same drug response phenotype, which is one of the complications of the genotype-phenotype relationship.",
 quote:"there's other things that affect how our genes get expressed and will affect the significance of a genetic variation. ... That will influence our genotype phenotype relationship as we're looking at drug response",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Complications of Genotype vs phenotype’ (p. 18); transcript 10/20"},

/* ---------------- Haplotype ---------------- */
{id:"L17-123", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"haplo", skill:"apply",
 concept:"haplotype-greater-than-chance-ld", tags:["smith","why"], source:"both",
 stem:"In the haplotype illustration, the single nucleotide polymorphisms (SNPs) at three loci appear as AGT, GTA and AGA more often than random chance. What explains this?",
 options:[
  {t:"Alleles are inherited together on one chromosome", correct:true, why:"The slide names the greater-than-chance co-occurrence linkage disequilibrium; the assigned Katzung chapter defines it as the nonrandom association of alleles at two or more loci that descend from a single ancestral chromosome."},
  {t:"Each of the three SNPs is a rare variant below 1%", correct:false, why:"Frequency of each SNP does not explain why they occur together."},
  {t:"The population is out of Hardy-Weinberg equilibrium", correct:false, why:"Hardy-Weinberg is about frequencies staying constant across generations."},
  {t:"The three loci sit on different chromosomes", correct:false, why:"A haplotype's alleles co-exist on the same chromosome."}],
 teach:"A haplotype is a set of alleles at multiple loci that co-exist on the same chromosome, occurring at a frequency greater than random chance; the slide calls that higher co-occurrence linkage disequilibrium. She added an aside, \"the chemistry will affect how likely. Genetic variations occur\"; that is about where variants arise. Why the three patterns travel together is linkage: the loci sit together on one chromosome and are inherited together (linkage disequilibrium). Haplotypes that affect drug response come up later, especially with warfarin.",
 quote:"There's something about the gene structure. That makes those snips happen and in those kinds of groupings, these 3 different groupings ... there's a lot of chemistry with DNA. ... the chemistry will affect how likely. Genetic variations occur.",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slides ‘Haplotype’ (p. 19), ‘Illustration of Haplotype’ (p. 20); transcript 10/20"},

/* ---------------- Frequencies; Hardy-Weinberg ---------------- */
{id:"L17-124", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"freq", skill:"apply",
 concept:"allele-vs-genotype-frequency", tags:["smith","why"], source:"both",
 stem:"Why can a population be described by genotype frequency as well as by allele frequency?",
 options:[
  {t:"Alleles make up each person's genotype", correct:true, why:"The wild type and variant alleles together form genotypes, so genotypes have a frequency too."},
  {t:"Genotype frequency counts the wild type allele", correct:false, why:"Both wild type and variant alleles enter the genotype."},
  {t:"Allele frequency is used for rare variants", correct:false, why:"Any allele, common or rare, has a frequency."},
  {t:"Genotype frequency is measured within one person", correct:false, why:"Both are relative frequencies in a population."}],
 teach:"Allele frequency is how often a version of an allele occurs in a population; genotype frequency is how often a genotype occurs. Because alleles make up a genotype, the two are related: she will return to how allele frequencies relate to genotype frequencies with worked examples. Both are usually expressed as a proportion or percentage.",
 quote:"But don't forget your alleles make up your genotype, so we would then describe people as having a genotype frequency as well ... You've got your allele frequency of the wild type, you've got your allele frequency of the variant allele in the population. Together, what's the genotype frequency?",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Frequencies in Pharmacogenomics’ (p. 21); transcript 10/20"},

{id:"L17-125", lecture:"L17", prof:"Smith", tier:"new", topic:"L17", sub:"freq", skill:"apply",
 concept:"hwe-in-papers", dupOf:"L17-051", tags:["smith","why"], source:"both",
 stem:"Why must a pharmacogenomic study population be in Hardy-Weinberg equilibrium before its results are applied to the general population?",
 options:[
  {t:"No pressure has changed it from the general population", correct:true, why:"Equilibrium shows the sample has not been changed by a pressure, so it represents the general population."},
  {t:"Equilibrium proves each subject carries the variant", correct:false, why:"It is about the population's frequencies, not each subject."},
  {t:"Equilibrium shows the drug was effective in the sample", correct:false, why:"Efficacy is a separate outcome."},
  {t:"Equilibrium means each haplotype occurs by chance", correct:false, why:"Haplotypes occur more often than random chance; that is a different concept."}],
 teach:"Hardy-Weinberg equilibrium means the allele and genotype frequencies in a population stay constant from generation to generation unless specific influences are introduced. The calculation asks whether a genetic variation seen in a sample is there because of evolutionary pressure. If some pressure has changed the sample compared with the general population, the sample does not represent it and the results cannot be generalized; in equilibrium, they can.",
 quote:"So we would not be in Hardy-Weinberg equilibrium. We could not say our results from this study can be applied to everybody because we didn't pull a good sample. ... it's basically evolutionary pressure. You can't be finding that your population has changed compared to the general population, or you won't be in Hardy-Winberg equilibrium.",
 note:"The transcript renders Hardy-Weinberg as both \"Hardy-Weinberg\" and \"Hardy-Winberg\". Her example (a stressed class) was hypothetical.",
 cite:"Intro_to_PGx_Lecture_Students_Fall_2026.pdf slide ‘Frequencies in Pharmacogenomics’ (p. 21); transcript 10/20"}
);
