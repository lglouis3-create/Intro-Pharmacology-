# Writer brief — PHAR 4344 Intro to Pharmacology, Exam 2

Course: PHAR 4344 Pharmacotherapeutics II: Introduction to Pharmacology (UIW Feik, Fall 2026). Lecturer: Dr. Helmut Gottlieb.
Exam II (syllabus): Mon Oct 12, 8:30–10:30 am, covers the Oct 1 – Oct 8 lectures, 24% of the grade, ExamSoft.
Syllabus lectures: 10/1 Signal transduction mechanisms, overview of the autonomic nervous system; 10/5 Neuromuscular junction pharmacology, nicotinic receptors (Katzung Ch 8); 10/6 Cholinergic signal transduction & pharmacology, muscarinic receptors, and adrenergic alpha receptors (Ch 8, 9, 10); 10/7 Adrenergic beta receptors, nitric oxide synthase (Ch 8, 9, 10); 10/8 RAAS (Ch 17).

## Sources (session scratchpad; read with the Read tool or shell)
Root: `/tmp/claude-0/-home-user-Intro-Pharmacology-/b3094785-cacf-58b3-9d24-8d3cafd9359e/scratchpad/sources/exam2/`
- `decks/ANS_Autonomic_Nervous_System.txt` — text of "Autonomic Nervous System.pdf" (54 pages), pages marked `=== page N`. PDF: `/root/.claude/uploads/b3094785-cacf-58b3-9d24-8d3cafd9359e/0fb525ba-Autonomic_Nervous_System.pdf`
- `decks/PCOL-NMJ_PCOL_2026s_pptx.txt` (51 pages). PDF: `/root/.claude/uploads/b3094785-cacf-58b3-9d24-8d3cafd9359e/ac23cdb2-PCOL-NMJ_PCOL_2026s_pptx.pdf`
- `decks/PCOL-Cholinergic-26s.txt` (33 pages). PDF: `/root/.claude/uploads/b3094785-cacf-58b3-9d24-8d3cafd9359e/7c58048e-PCOL-Cholinergic-26s.pdf`
- `decks/Pharmacology_Exam_2_Drug_List.txt` (10 pages). PDF: `/root/.claude/uploads/b3094785-cacf-58b3-9d24-8d3cafd9359e/15b34769-Pharmacology_Exam_2_Drug_List.pdf`. The course's official Exam 2 drug list (the PDF header credits Joshua Farias, Class of 2025). Where it disagrees with a slide, key the slide and record the conflict in a `note`.

Posting rule (from the student, 10/5): post questions only on topics whose slides AND lecture transcript have been received. Adrenergic, nitric oxide and RAAS questions wait for their decks and transcripts.
- `transcripts/2026-09-30_transcript.txt` — 9/30; the second part starts the autonomic nervous system (the first part is the Exam 1 review/Jeopardy: ignore that part).
- `transcripts/2026-10-01_transcript.txt` — 10/1 lecture (autonomic nervous system overview).
- `readings/Katzung_Ch8_Cholinoceptor_Blocking.txt`, `Katzung_Ch9_Adrenoceptor_Agonists.txt`, `Katzung_Ch10_Adrenoceptor_Antagonists.txt`, `Katzung_Ch17_Vasoactive_Peptides.txt`, `Katzung_Ch19_Nitric_Oxide.txt`; Ch 6 (autonomic intro) at `../../ch6.clean.txt` (scratchpad root).
- Slide pictures: many slides are diagrams with little text. Read the PDF pages with the Read tool (`pages:"1-10"`, max 20 per call) to see them. A slide you could not read: say so; do not guess its content.

The 10/5–10/8 transcripts do not exist yet. For NMJ and cholinergic, write from the slides (`source:'slide'`) and the readings only; a later pass adds the transcript.

## His question style (Exam 2 polls so far, from "PollEV’s Exam 2.pdf", no keys in the file)
1. "Activation of the SNS is most likely to evoke:" Diarrhea / Bronchial constriction / Salivation / Miosis / Increase in Na+ excretion
2. "Activation of the cholinergic system will most likely produce which of the following?" Dry mouth / Decrease urination / Diarrhea / Mydrasis / Bronchial dilation
3. "Which of the following statements is CORRECT?" Direct release of NE in the lungs causes bronchial constriction / Direct release of Ach in the resistance arteries causes vasoconstriction / SNS is the major autonomic nervous system component in the kidneys / PNS activation causes salivation & SNS activation causes dry mouth
4. "Which of the following statements is CORRECT?" Both PNS and SNS release acetylcholine in the ganglionic synapses / cAMP is a second messenger involved in a number of physiological functions / The autonomic nervous system is involuntary & composed of PNS and SNS / Beta 2 adrenergic receptors are typically not innervated by the SNS / All of the above
5. "Which of the following is CORRECT regarding baroreceptors?" Activation of the baroreceptors causes a decrease in BP / Suppression of the baroreceptors causes an increase in BP / Baroreceptors are pressure ion channels / When one stands up, the baroreceptors decrease firing / All of the above
6. "Which of the following is CORRECT about varenicline?" Is a partial agonist to the alpha4/beta2 nicotinic receptor / It may cause depression in some patients / It compete with nicotine for the Nn receptors in the brain / It decreases withdraw syndrome in pts trying to stop smoking / All of the above
Exam 1 showed his formats: "Which of the following is CORRECT/INCORRECT", "most likely", select-all ("Select all that apply"), "All of the above", drug named and mechanism asked (he names the drug; you supply its class and receptor), scenario → predicted organ effect.
From 10/1: "start working on that drug list now... if you don't know the drugs ... you're gonna be stuck." Know who is who (receptor location → predict what an agonist or antagonist does).

## File format and rules
Same as `notes/BRIEF.md` (read its "File format" section and every rule there: one correct unless multi; correct option never the longest; every option has a why; teach 2–4 sentences; quote; cite; literal language; abbreviations expanded once per question; no reference to the lecture/deck in stems; nothing unsourced). Differences for Exam 2:
- `lecture` / `topic` ids: L07 (10/1 ANS overview, includes the 9/30 autonomic part), L08 (10/5 NMJ, nicotinic), L09 (10/6 cholinergic, muscarinic), PE2 (his Exam 2 polls verbatim), DL2 (Exam 2 drug list).
- `cite` names the deck file exactly: `Autonomic Nervous System.pdf slide N`, `PCOL-NMJ_PCOL_2026s_pptx.pdf slide N`, `PCOL-Cholinergic-26s.pdf slide N`, `Pharmacology_Exam_2_Drug_List.pdf page N`; add `; transcript 9/30` or `; transcript 10/1` when the fact comes from the audio.
- Optional `reading:[{src:'Katzung 16e, Ch. 8', sec:'<section heading>', t:'2–4 sentences restating the chapter on this concept'}]` where the assigned chapter directly supports the concept (rules as in `notes/READING_BRIEF.md`: textbook content only in `reading`, never changes a key; a disagreement goes in `note`).
- `TOPICS.push({... exam:2 ...})` is not needed; the course manifest maps lecture → exam.
- Figures: describe in words in the stem; no images.
- Do not edit app.js, course.js, build.py, shell.html, or any other agent's files. Do not commit.

## Notes file
`notes/LXX.md` with the same sections as Exam 1 (Slide map, Polls and in-class questions VERBATIM with his answers and a quote, Exam cues, Tell-apart rows as HTML `<tr>` with the question id, Reference tables, Conflicts / uncertain, Objectives verbatim).

Run `node --check` on your file and the quick self-test from BRIEF.md. Return: counts per skill, slides you could not read, conflicts.
