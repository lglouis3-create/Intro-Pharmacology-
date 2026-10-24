# Brief: Exam 4 lecture ingest, PHAR 4344 (Dr. Helen E. Smith, pharmacogenomics)

Exam IV (syllabus): Mon Nov 2, 8:30–10:30 am, 22% of the grade, covers Oct 21–28: PGx Day 2 (10/21, Pharmacogenomics
Examples), PGx Day 3 (10/22, examples continued), PGx Day 4 (10/26, cases and resources), 10/27 Adverse Drug Reactions,
10/28 Drug Interactions. Readings on the syllabus: Katzung Ch. 5, DiPiro Ch. 6 (the posted file is DiPiro 13e e6,
Medication Adherence), "other readings posted on Canvas" (Furuta et al., Ann Intern Med 1998).

Repo: /home/user/Intro-Pharmacology-/exam1-drill. SP = the session scratchpad (inputs are downloaded there first)
Inputs:
- Transcripts: 10/21 SP/l18/transcript.txt; 10/22 SP/l19/transcript.txt (auto-captions: expect slips; never quote a
  garbled caption, paraphrase it as "She said ...").
- Decks: Intro to PGx Lecture Students Fall 2026.pdf, text SP/l17/deck.txt with "===== page N =====" markers (pages 1–21
  were taught 10/20 and are Exam 3 material; 10/21 continues from page 22); Pharmacogenomic Examples deck
  (PGx-Examples-Students-Fall-2026.pdf), text SP/l18/examples_deck.txt with "=== page N" markers. Slide images:
  slides/pgx-NN.jpg and slides/pgxex-NN.jpg if you need to look at a figure (Read tool). Some deck text includes
  handwritten notes picked up as text (for example "NTK term"); those are a student's notes, not hers: ignore them.
- Her prior words about format and her quizzes: STYLE.md (Smith sections), notes/EXAM3.md, notes/L17.md.
- Readings: Katzung Ch. 5 (src/readings/katzung-5.json), DiPiro e6 (src/readings/dipiro-e6.json); Furuta 1998 PDF at
  /root/.claude/uploads/b3094785-cacf-58b3-9d24-8d3cafd9359e/03a2bfb4-FurutaAnnIntMed1998.pdf (a separate writer builds its card).
Models to copy (format and quality): src/q_L17.js, notes/L17.md (Slide map, conflicts, exam cues), and the guide3.js
sections id="guide3-l17-*" plus SP/guide/BRIEF.md (the teaching shape of a guide section).
Source hierarchy: what she said in lecture first, then her slides, then the readings. Where they differ, say so in a note.

## Your lecture
First find exactly what your day covered (which deck pages, where it started and stopped) from the transcript, and
state it at the top of your notes file. Only your day's material goes in your files.

## Write
1. src/q_<ID>.js: one TOPICS.push and QUESTIONS.push, same schema as q_L17.js (lecture:'<ID>', prof:'Smith',
   topic:'<ID>', subs with slide ranges, skill, concept, source, cite naming the deck file and page plus "(T) 10/2x").
   About 40 to 70 questions: one per testable point, every drug–gene pair, every term, every number she stressed, every
   example's mechanism and clinical consequence, her in-class questions verbatim (tags:['poll'] or ['inclass'] with her
   key), select-all about 15 to 20 percent ("Select all that apply."), 4 to 5 options, correct option never the longest,
   reasoning only in why/teach, every option with a why. Asides she says she will not test: lowYield:true.
2. notes/<ID>.md: scope of the day; ## Slide map (deck, page, title -> sub -> question ids); ## Polls and in-class
   questions (verbatim with her answer); ## Exam cues (her words about Exam 4, the exam format, what to know, verbatim,
   with position); ## Conflicts / uncertain; ## Not reached.
3. SP/ex4/guide/<ID>-sec-<n>.html: guide sections, one per objective or example (about 4 to 8), each
   `<section class="guide" id="guide4-<id lower>-<n>">` ... `</section>`, in the shape of SP/guide/BRIEF.md: the idea,
   the facts (a table when items are compared: gene, drug, effect of the variant, what to do), why (mechanism to
   consequence with because/so), her words (1 to 3 short clean quotes marked <small>(T) 10/2x</small>), traps (each
   with why it is wrong), "How she asks it", and <p class="sub">Sources ...</p> naming deck pages and question ids.
   Number the h3 titles from <first number> given below. Valid inside a JS template string: no backtick, no "${".
4. SP/ex4/<ID>-tell.html: tell-apart rows <tr><td>A vs B</td><td>what separates them</td><td>the trap</td><td>pages</td></tr>
   for confusable pairs, each with a question id; SP/ex4/<ID>-ref.html: any reference table the questions return to
   (gene, drug, phenotype, recommendation), <table class="reftab"> plus a source line.
## Rules
- Every fact, number, name and quote from your transcript, the decks or the reading cards; if you cannot point at it,
  leave it out. Literal language: no metaphors, no study advice, no sentences about the drill, no student names.
- Quotes verbatim (cut with " ... " only), never a garbled caption.
- Run node --check on the q file (it is concatenated after `const TOPICS=[], QUESTIONS=[]`).
Final reply: what your day covered, counts, exam cues found (verbatim), conflicts, anything left out.
