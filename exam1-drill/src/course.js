/* Course manifest. Everything specific to PHAR 4344 lives here; the engine and
   every check read it. Exam facts come from
   SyllabusF26_PHAR_4344_PT_II_Intro_to_Pharmacology_Final.pdf (course outline
   and grading criteria). */
const COURSE = {
  id: 'phar4344',
  title: 'PHAR 4344 Intro to Pharmacology — Exam Drill',
  short: 'PHAR 4344 Intro to Pharmacology',
  ns: 'phar4344drill',          // storage namespace: keep fixed for the whole course
  output: 'PHAR4344_Exam1_Drill.html',
  atlas: false,
  professors: ['Gottlieb', 'Smith'],
  lectures: [
    {id:'L01', deck:'Pharmacodynamics-Day-1-2026s.pdf', label:'Day 1 (9/22): Course intro, drugs & receptors', prof:'Gottlieb', exam:1, module:1},
    {id:'L02', deck:'Pharmacodynamics-Day_2_2026s copy.pdf', label:'Day 2 (9/23): Drug–receptor interaction principles', prof:'Gottlieb', exam:1, module:1},
    {id:'L03', deck:'Pharmacodynamics-Day_3_2026s.pdf', label:'Day 3 (9/24): Dose–response curves', prof:'Gottlieb', exam:1, module:1},
    {id:'L04', deck:'Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf', label:'Day 4 (9/28): Drug–receptor interactions I', prof:'Gottlieb', exam:1, module:1},
    {id:'L05', deck:'Pharmacodynamics-Day_4_-_5_2026s_pptx Part 2.pdf', label:'Day 5 (9/29): Spare receptors, indirect antagonists, receptor regulation, quantal responses, therapeutic index', prof:'Gottlieb', exam:1, module:1},
    {id:'L06', deck:'Pharmacodynamics reviews.pdf', decks:['Pharmacodynamics reviews.pdf', 'Pharmacodynamics-Day_4_&_5_2026s_Part 3.pdf'], label:'Day 6 (9/30): Desired vs undesired effects, therapeutic efficacy, the PD review (how to read a curve question)', prof:'Gottlieb', exam:1, module:1},
    {id:'JP', deck:'Jeopardy 9/30', label:'Jeopardy (9/30): his review-game questions, verbatim, with his keys', prof:'Gottlieb', exam:1, module:1},
    {id:'PE', deck:'PollEV_s.pdf', label:'PollEV questions (his polls, verbatim, with his keys)', prof:'Gottlieb', exam:1, module:1},
    {id:'PQ', deck:'Practice questions 1–25', label:'His practice questions 1–25 (his keys)', prof:'Gottlieb', exam:1, module:1},
    {id:'FG', deck:'his figures', decks:['PollEV_s.pdf', 'Pharmacodynamics reviews.pdf', 'Jeopardy 9/30', 'Pharmacodynamics-Day_4_&_5_2026s_Part 3.pdf'], label:'Figure drills: his PollEV, Jeopardy and review figures, asked every way he asks', prof:'Gottlieb', exam:1, module:1},
    {id:'DL1', deck:'Exam_1_Drug_List_2026.pdf', label:'Exam 1 drug list', prof:'Gottlieb', exam:1, module:1},
    // Exam 2 (syllabus: Exam II covers the Oct 1 – Oct 8 lectures)
    {id:'L07', deck:'Autonomic Nervous System.pdf', label:'Day 7 (9/30–10/1): Signal transduction, overview of the autonomic nervous system', prof:'Gottlieb', exam:2, module:2},
    {id:'L08', deck:'PCOL-NMJ_PCOL_2026s_pptx.pdf', label:'Day 8 (10/1, 10/5): Neuromuscular junction pharmacology, nicotinic receptors', prof:'Gottlieb', exam:2, module:2},
    {id:'L09', deck:'PCOL-Cholinergic-26s.pdf', label:'Day 9 (10/5): Cholinergic pharmacology, muscarinic receptors', prof:'Gottlieb', exam:2, module:2},
    {id:'L10', deck:'PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf', label:'Day 10 (10/6): Adrenergic pharmacology, indirect-acting drugs and α receptors', prof:'Gottlieb', exam:2, module:2},
    {id:'L11', deck:'PCOL-Adrenergic_PCOL-26s_PTII_pptx.pdf', label:'Day 11 (10/7, 10/8): β receptors, epinephrine and norepinephrine, tracings, nitric oxide', prof:'Gottlieb', exam:2, module:2},
    {id:'L12', deck:'PCOL-RAAS_26s.pdf', label:'Day 12 (10/8): Renin–angiotensin–aldosterone system', prof:'Gottlieb', exam:2, module:2},
    {id:'PE2', deck:'PollEV’s Exam 2.pdf', decks:['PollEV’s Exam 2.pdf', 'Jeopardy 10/8', 'Review 10/9'], label:'His Exam 2 polls (verbatim, with his keys)', prof:'Gottlieb', exam:2, module:2},
    {id:'DL2', deck:'Pharmacology_Exam_2_Drug_List.pdf', label:'Exam 2 drug list', prof:'Gottlieb', exam:2, module:2},
    // Exam 3 (syllabus: Exam III covers the Oct 9 – Oct 20 lectures; lecturer Dr. Smith: toxicology, pharmacogenomics)
    {id:'L13', deck:'Principles-of-Tox-Lecture-Students-Fall-2026_WCAG21A.pdf', decks:['Principles-of-Tox-Lecture-Students-Fall-2026_WCAG21A.pdf', 'Smith_Practice_Quiz_1_-_Principles_of_Toxicology.pdf'], label:'Day 13 (10/9): Principles of toxicology (Dr. Smith)', prof:'Smith', exam:3, module:3},
    // 10/13: she finished the Principles deck (indices, target), discussed the reading with its discussion guide, then began Toxic Responses
    {id:'L14', deck:'Toxic Responses Students Fall 2026 WCAG21A.pdf', decks:['Toxic Responses Students Fall 2026 WCAG21A.pdf', 'Principles-of-Tox-Lecture-Students-Fall-2026_WCAG21A.pdf', 'Discussion-Guide-Rodriguez-Mozaz-and-Weinberg-Student-2026 copy.pdf'], label:'Day 14 (10/13): Indices, the reading, toxic responses I (Dr. Smith)', prof:'Smith', exam:3, module:3},
    // 10/14: organ-specific toxic responses, then Treating Poisonings up to the overdose guideline list
    {id:'L15', deck:'Treating Poisonings Students Fall 2026 WCAG2,1A_pptx.pdf', decks:['Treating Poisonings Students Fall 2026 WCAG2,1A_pptx.pdf', 'Toxic Responses Students Fall 2026 WCAG21A.pdf'], label:'Day 15 (10/14): Organ toxicity, treating poisonings I (Dr. Smith)', prof:'Smith', exam:3, module:3},
    {id:'L16', deck:'Treating Poisonings Students Fall 2026 WCAG2,1A_pptx.pdf', decks:['Treating Poisonings Students Fall 2026 WCAG2,1A_pptx.pdf', 'Marraffa+AJHSP+2012+Antidotes.pdf', 'beta-blocker+guideline+AAPCC+2005.pdf', 'Ca+channel+blocker+guideline+AAPCC+2005.pdf'], label:'Day 16 (10/19): Treating poisonings II, the guideline discussion (Dr. Smith)', prof:'Smith', exam:3, module:3},
    {id:'L17', deck:'Intro_to_PGx_Lecture_Students_Fall_2026.pdf', label:'Day 17 (10/20): Introduction to pharmacogenomics (Dr. Smith)', prof:'Smith', exam:3, module:3},
    {id:'TBL3', deck:'PoisoningTreatmentTable2026KEY.pdf', label:'Her poisoning treatment table key (Dr. Smith)', prof:'Smith', exam:3, module:3},
    {id:'GRG3', deck:'Readingguideforoutofhospitalguidelines2026KEY.docx', label:'Her out-of-hospital guideline reading guide key (Dr. Smith)', prof:'Smith', exam:3, module:3},
    {id:'RMK3', deck:'KeyDiscussionGuideRodriguez-MozazandWeinberg2026.docx', label:'Her Rodriguez-Mozaz and Weinberg discussion guide key (Dr. Smith)', prof:'Smith', exam:3, module:3}
  ],
  exams: [
    {id:1, name:'Exam 1', scope:'Pharmacodynamics (9/22–9/30)', date:'Fri Oct 2, 9–11 am', when:'2026-10-02T09:00:00-05:00',  // syllabus: Exam I, Fri Oct 2, 9–11 am
     questions:50,               // 50 questions (student report, 10/2)
     // Topic counts Dr. Gottlieb gave a classmate in person (relayed in the class group chat, 10/1–10/2; secondhand, not on the syllabus).
     // reg is a range: each paper draws 3, 4 or 5. graph: "majority" of the paper, so at least 26 of 50.
     blueprint:{sata:2, parts:[
       {key:'galpha', name:'α subunit type (Gs, Gi, Gq)', n:3},
       {key:'rtk', name:'RTK activation (dimerization, phosphorylation)', n:1},
       {key:'reg', name:'Up- and down-regulation', n:[3, 5]},
       {key:'ti', name:'Therapeutic index and safety index', n:2},
       {key:'graph', name:'Graphs: agonist, antagonist or inverse agonist', min:26},
       {key:'other', name:'Everything else in Exam 1', rest:true}]},
     minutes:120,                // syllabus: "A total of two hours is allotted for each of the major examinations"
     sata:2,                     // two select-all questions (same report)
     blurb:'Covers the Sept 22 – Sept 30 lectures (syllabus). 23% of the course grade.',
     pools:[{key:'exam1', name:'Exam 1 material', marks:null, filter:{exam:1}}]},
    {id:2, name:'Exam 2', scope:'Autonomic, cholinergic, adrenergic, nitric oxide, RAAS (10/1–10/8)', date:'Mon Oct 12, 8:30–10:30 am', when:'2026-10-12T08:30:00-05:00',  // syllabus: Exam II, Mon Oct 12, 8:30–10:30 am
     questions:50,               // Exam 2 format the student reported on 10/9 (from the review; secondhand, not on the syllabus)
     // Topic counts from the same report. Counts he did not give (drug pairs/DDIs, reversing a drug) stay in "the rest".
     // Each question is sorted by the first test it passes, in this order; the tests are keyword rules, so the sort is approximate.
     blueprint:{sata:2, parts:[
       {key:'graph', name:'Graph (tissue tracing)', n:2, test:q => !!q.img},
       {key:'drug', name:'Drug list: MOA, receptors, SOA (20%)', n:10, test:q => q.lecture === 'DL2'},
       {key:'ans', name:'Autonomic system: dual innervation, exceptions', n:[2, 3],
        test:q => q.lecture === 'L07' && /innervat|dual|exception|gangli|adrenal medulla|sweat|\b[PS]NS\b|parasympathetic|sympathetic/i.test(q.stem)},
       {key:'organ', name:'Receptors on an organ and their responses', n:[3, 4],
        test:q => q.lecture === 'L07' || /\blocated\b|\blocation\b|site of action|\bSOA\b|which receptors?\b|receptors? (?:on|in) the\b/i.test(q.stem)},
       {key:'predict', name:'Tier 1: predict the effect of a receptor (DUMBBELSS)', n:[5, 7],
        test:q => q.level === 1 || /DUMBBEL|most likely (?:to )?(?:produce|cause|evoke|occur|experience)|side effects?|adverse|overdose/i.test(q.stem)},
       {key:'other', name:'Everything else, including Tier 2 (drug pairs, DDIs) and Tier 3 (reversing a drug)', rest:true}]},
     minutes:120,
     sata:2,                     // two select-all questions (same report)
     blurb:'Covers the Oct 1 – Oct 8 lectures (syllabus): autonomic nervous system, neuromuscular junction, cholinergic, adrenergic, nitric oxide, RAAS. 24% of the course grade.',
     pools:[{key:'exam2', name:'Exam 2 material', marks:null, filter:{exam:2}}]},
    {id:3, name:'Exam 3', scope:'Toxicology and pharmacogenomics, Dr. Smith (10/9–10/20)', date:'Fri Oct 23, 9 am (90 minutes)', when:'2026-10-23T09:00:00-05:00',  // her exam notice (10/17): 9 am start, 90 minutes; the syllabus's two hours is superseded
     questions:55,               // her exam notice: 50 to 55 questions; the simulator's full paper uses the upper figure
     minutes:90,                 // her exam notice: an hour and a half
     blurb:'Covers Oct 9 through Oct 20, taught by Dr. Smith; on 10/20 the class voted to keep that day\'s pharmacogenomics lecture on this exam. 50 to 55 questions in 90 minutes, mostly multiple choice with a few fill-in-the-blank or short-answer items. 21% of the course grade. In the bank: all five lectures (10/9, 10/13, 10/14, 10/19, 10/20), her practice quiz 1 and her three posted keys. She said she will not test the two bonus decks (toxicology careers; pharmacists and drugs in the water). She tests what she says in lecture first, then the slides and the readings.',
     // the Topics card shows these as label / value rows (her exam notice 10/17, the syllabus, her words 10/19 and 10/20)
     facts:[['Covers', 'Oct 9 – Oct 20: principles of toxicology, toxic responses, treating poisonings, introduction to pharmacogenomics'],
            ['Format', '50 to 55 questions in 90 minutes; mostly multiple choice, a few fill-in-the-blank or short answer'],
            ['Weight', '21% of the course grade'],
            ['Scope vote', 'On 10/20 the class voted to keep that day’s pharmacogenomics lecture on this exam'],
            ['Not tested', 'The two bonus decks: toxicology careers; pharmacists and drugs in the water'],
            ['How she tests', 'What she says in lecture first, then the slides, then the readings; her posted keys set the depth']],
     pools:[{key:'exam3', name:'Exam 3 material', marks:null, filter:{exam:3}}]}
  ],
  activeExam: 3,                // the exam the site opens on; the learner can switch (Topics, Exam sim, Weak spots)
  skills: [
    {id:'recall', label:'Recall a fact or definition', short:'Recall'},
    {id:'tell',   label:'Tell two look-alikes apart',  short:'Tell apart'},
    {id:'apply',  label:'Apply to a scenario',         short:'Apply'},
    {id:'figure', label:'Read a curve or figure',      short:'Curves'},
    {id:'calc',   label:'Calculate',                   short:'Calculate'},
    {id:'drug',   label:'Drug list: mechanism',        short:'Drug list'},
    {id:'term',   label:'Define a term',              short:'Terms'}
  ],
  paceDefault: 'cram'
};
