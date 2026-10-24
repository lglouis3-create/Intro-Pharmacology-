# Brief: rewrite Exam 3 objective guides to teach the reasoning (Dr. Smith; exam Fri 10/23 9 am)

The student, about guide section 31 (the beta-blocker / calcium channel blocker guideline discussion): "I feel like
this can be better organized, also I feel like it's not teaching the reasoning properly on what the discussion
entailed. Make it isn't just reiterated what was said but giving the student a proper explanation/understanding of
the concept and reasoning out the why based on what the article discussed."
Today the sections are mostly lists of her quotes, some garbled by the auto-captions ("about 2012 to 24 hours",
"non-systematic symptomatic", "the stuff on the animals"). Rewrite each assigned section so a student who reads it
understands the concept and can reason to the answer, with every fact still from her sources.

File: /home/user/Intro-Pharmacology-/exam1-drill/src/guide3.js (HTML inside a JS template string). Each section is
`<section class="guide" id="...">` ... `</section>`. Read guide.js and guide2.js (Exam 1 and 2 guides) for the
markup this site already styles (tables, h4, ul, p.sub, small); use only markup that already appears there or in guide3.

## Shape of each section (adapt to the topic; skip a part that has nothing)
1. <h3> same number, a clear title (no logistics such as "what moved to Monday").
2. The idea: a short paragraph in plain words: what the concept is and why it matters clinically or for her exam.
3. The facts, organized: a table when items are compared (e.g. windows by drug class and formulation; antidote,
   mechanism; zone, oxygen, enzyme), otherwise grouped bullets. Include every testable detail now in the section.
4. Why: reasoning chains with because / so: from mechanism to consequence (e.g. extended-release tablets form a
   bezoar, the clump can break apart at an unpredictable time and release a large dose at once, so an asymptomatic
   patient is not safe until the extended window has passed; verapamil has more than one mechanism, so its window is
   longest). For a reading or discussion, explain what the article/guideline says and why, using the reading card
   (src/readings/<id>.json), her key, and her lecture.
5. Her words: one to three short, clean quotes that carry the point (verbatim; cut words with " ... " if needed;
   never quote a garbled caption: paraphrase it instead as "She said ..."). Mark them <small>(T) date</small>.
6. Traps: the confusions her questions use, each with the reason it is wrong.
7. Keep the existing "How she asks it" line (tighten it) and the <p class="sub">Sources ...</p> line, and keep every
   marker (<!--IMG:key-->, <!--FIG:key-->, <!--STEP:key-->), link, and id in the section.
## Rules
- Facts only from: transcripts scratchpad/l13..l17/transcript.txt, decks l14/deck.txt, l15/deck.txt,
  l16/deck_treating_poisonings_clean.txt, l17/deck.txt, keys l17/table_key.txt, l17/guideline_key.txt,
  l17/rm_key.txt, quizzes qz/qa.txt, q4/quiz4.txt, reading cards src/readings/*.json, and the logged decisions in
  exam1-drill/STYLE.md, notes/*.md, antidotes/src/OPEN_ITEMS.md (rhodanese is the body's enzyme and sodium
  thiosulfate is given; digoxin immune Fab is ovine; NOAEL is the highest dose without an observed adverse effect;
  single-dose charcoal: her Quiz 3 key less than 60 minutes, her lecture up to 2 hours; haplotype per Quiz 4 Q9;
  her Practice Quiz 1 key: the greatest source of drugs in water is consumption by humans and the waste streams).
  No 10/21 material. If unsure of a fact, leave it out.
- Literal language: no metaphors, no study advice, no sentences about the guide, no class logistics, no student
  names. Numbers as digits are fine here (this is read, not spoken).
- Valid inside a JS template string: no backtick, no "${".
scratchpad = /tmp/claude-0/-home-user-Intro-Pharmacology-/b3094785-cacf-58b3-9d24-8d3cafd9359e/scratchpad
## Output
Do NOT edit guide3.js (others work on it). For each assigned section write the complete new section, from
`<section` to `</section>`, to scratchpad/guide/sec-<number>.html. Then check every file: same id as the original,
all markers kept, no backtick or "${". Final reply: sections written, and any fact you removed or doubt.
