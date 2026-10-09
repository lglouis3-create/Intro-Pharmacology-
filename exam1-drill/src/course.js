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
    {id:'PE2', deck:'PollEV’s Exam 2.pdf', label:'His Exam 2 polls (verbatim, with his keys)', prof:'Gottlieb', exam:2, module:2},
    {id:'DL2', deck:'Pharmacology_Exam_2_Drug_List.pdf', label:'Exam 2 drug list', prof:'Gottlieb', exam:2, module:2}
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
     questions:null,             // count not yet announced; the simulator asks for a length
     minutes:120,
     sata:null,
     blurb:'Covers the Oct 1 – Oct 8 lectures (syllabus): autonomic nervous system, neuromuscular junction, cholinergic, adrenergic, nitric oxide, RAAS. 24% of the course grade.',
     pools:[{key:'exam2', name:'Exam 2 material', marks:null, filter:{exam:2}}]}
  ],
  activeExam: 2,                // the exam the site opens on; the learner can switch (Topics, Exam sim, Weak spots)
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
