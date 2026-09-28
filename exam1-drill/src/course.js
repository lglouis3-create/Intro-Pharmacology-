/* Course manifest. Everything specific to PHAR 4344 lives here; the engine and
   every check read it. Exam facts come from
   SyllabusF26_PHAR_4344_PT_II_Intro_to_Pharmacology_Final.pdf (course outline
   and grading criteria). */
const COURSE = {
  id: 'phar4344',
  title: 'PHAR 4344 Intro to Pharmacology — Exam 1 Drill',
  short: 'PHAR 4344 Exam 1',
  ns: 'phar4344drill',          // storage namespace: keep fixed for the whole course
  output: 'PHAR4344_Exam1_Drill.html',
  atlas: false,
  professors: ['Gottlieb', 'Smith'],
  lectures: [
    {id:'L01', deck:'Pharmacodynamics-Day-1-2026s.pdf', label:'Day 1 (9/22): Course intro, drugs & receptors', prof:'Gottlieb', exam:1, module:1},
    {id:'L02', deck:'Pharmacodynamics-Day_2_2026s copy.pdf', label:'Day 2 (9/23): Drug–receptor interaction principles', prof:'Gottlieb', exam:1, module:1},
    {id:'L03', deck:'Pharmacodynamics-Day_3_2026s.pdf', label:'Day 3 (9/24): Dose–response curves', prof:'Gottlieb', exam:1, module:1},
    {id:'DL1', deck:'Exam_1_Drug_List_2026.pdf', label:'Exam 1 drug list', prof:'Gottlieb', exam:1, module:1}
  ],
  exams: [
    {id:1, name:'Exam 1', date:'Fri Oct 2, 9–11 am', when:'2026-10-02T09:00:00-05:00',  // syllabus: Exam I, Fri Oct 2, 9–11 am
     questions:null,             // count not yet announced; the simulator asks for a length
     minutes:120,                // syllabus: "A total of two hours is allotted for each of the major examinations"
     sata:null,
     blurb:'Covers the Sept 22 – Sept 30 lectures (syllabus). 23% of the course grade.',
     pools:[{key:'exam1', name:'Exam 1 material', marks:null, filter:{exam:1}}]}
  ],
  activeExam: 1,
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
