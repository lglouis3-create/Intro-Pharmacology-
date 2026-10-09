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

## Tiers and ladders
**His tiers** (student's report from the 10/9 review; the review has no recording):
- **Tier 1** — predict the effect of a receptor: DUMBBELSS and the like ("drug X acts on receptor R, what does the organ do").
- **Tier 2** — two drugs working together: the good and the bad drug–drug interactions.
- **Tier 3** — predict how to reverse the effect of a drug.
- In his words: "a tier 3 question would require knowledge of tier 2 and 1."

**Fields.** His tier is stored as `level` (1, 2 or 3). The older `tier` field (`'new'`, the content tier from the original schema) is a different thing and is left as it is. `ladder` is a short key shared by the rungs of one ladder; `ladderName` is the title shown when climbing (set on every rung). DL2 items get their fields from the `LEVELS` table in `src/gen_druglist2.py` (edit the generator, not `q_DL2.js`).

**How questions were levelled.** Level 1: a drug, a receptor or an autonomic division is named and the stem asks the organ effect or side effect that follows from the receptor (or which drug would give a stated organ effect). Level 2: two drugs (or a drug and the agonist it meets, as in the tracings) act together. Level 3: reversing a drug's effect, including an antidote, outcompeting a reversible drug, switching away from the drug that causes an effect, and stopping a drug that has up- or down-regulated its receptors. No level: pure recall (class, mechanism name, receptor location, G protein or cascade step, definition, an adverse-effect list that does not follow from the receptor), physiology without a drug, and pharmacokinetics. Exam 2 counts: level 1 = 143, level 2 = 44, level 3 = 25 (of 499 Exam 2 questions). The Jeopardy-only bronchomotor tracing (PE2-058 … 062, `lowYield`) is levelled 2 like any other two-drug item.

**Ladders** (17; climbing asks the rungs in level order):
| key | title | Tier 1 | Tier 2 | Tier 3 |
|---|---|---|---|---|
| `curare` | Curare-like paralysis and its reversal | L08-025, PE2-020 | L08-021, L08-023 | L08-032, PE2-022 |
| `rocuronium-tracing` | Rocuronium in the skeletal muscle tracing | PE2-077 | PE2-076, PE2-078, PE2-079 | PE2-080 |
| `succinylcholine` | Succinylcholine, halothane and dantrolene | L08-016 | DL2-009 | L08-020 |
| `organophosphate` | Organophosphate poisoning and its antidotes | L08-036 | L08-027 | L08-037, L09-030 |
| `cholinesterase-inhibitor` | Cholinesterase inhibitors: DUMBBELSS, add-ons and atropine | L08-034, PE2-021 | **L09-056** | PE2-057 |
| `carbachol-heart` | Carbachol, atropine and the heart | L09-028, PE2-025 | **L09-057** | PE2-028 |
| `bladder-m3` | The bladder M3: agonist, antimuscarinic and reversal | L09-014, PE2-027 | **L09-055** | L09-054 |
| `atropine-poisoning` | Atropine poisoning and physostigmine | L09-027, DL2-032 | PE2-030, PE2-032 | L08-031, DL2-015 |
| `ach-rat` | Acetylcholine, atropine and blood pressure in the rat | L11-063 | L11-064 | L11-065 |
| `epinephrine` | Epinephrine: α1 and β2, its blockers, and the EpiPen overdose | L11-027, L11-032, PE2-049 | L11-028, PE2-052, PE2-053 | PE2-040 |
| `prazosin` | Prazosin, norepinephrine and phenoxybenzamine | L10-052, PE2-038 | PE2-039, PE2-044 | L11-011 |
| `mao-inhibitor` | MAO inhibitor, tyramine and the hypertensive crisis | L10-032 | L10-030, L10-031 | **L11-075** |
| `clonidine` | Clonidine: α2, an add-on, and stopping it | L10-041, PE2-037 | **L10-061** | L10-043 |
| `beta-blocker-asthma` | β blocker in asthma, with albuterol | L11-044, PE2-042 | PE2-084 | **L11-076** |
| `beta-blocker` | β blockers: the heart, insulin, and stopping abruptly | L11-040 | L11-045 | L11-047 |
| `nitroglycerin` | Nitroglycerin and sildenafil | L11-061 | L11-060, PE2-043 | — (not sourced) |
| `ace-inhibitor` | ACE inhibitor, spironolactone, potassium and the cough | L12-061, PE2-054 | L12-059 | L12-037, **L12-065** |

**New rungs** (bold above), each keyed from his words: L09-055 (bethanechol with oxybutynin: the antagonist outcompetes the agonist; 10/6 "If you add an antagonist to outcompete it, so you're defeating the purpose"), L09-056 (carbachol with rivastigmine: more DUMBBELSS; 10/6 "if we add one of those acetylcholesterase enzyme antagonists, because now we even have more acetylcholine on board"), L09-057 (carbachol with atropine at the heart; same 10/6 passage), L10-061 (guanfacine added to methylphenidate, additive; 10/6), L11-075 (phenoxybenzamine for the phenelzine–tyramine hypertensive crisis; slide 34 and 10/7 "we could use fenoxybenzammine to kind of lower their blood pressure"), L11-076 (more albuterol puffs to outcompete propranolol; 10/7 "it's going to require more puffs of your saba or your laba to outcompete the beta blocker"), L12-065 (lisinopril + spironolactone, cough, switch to losartan: the cough eases, the hyperkalemia risk stays; 10/8).

**Rungs not written (no source in the slides or transcripts):**
- Clonidine with a β blocker: he never paired them. The clonidine ladder's Tier 2 is his guanfacine-plus-stimulant example instead; both drugs' withdrawal rebound (up-regulation) is taught separately (L10-043, L11-047).
- A bladder antimuscarinic with another antimuscarinic (additive anti-DUMBBELSS): he stated the additive rule only for two agonists or an agonist plus a cholinesterase inhibitor. The bladder ladder's Tier 2 is the agonist-plus-antagonist (negative) interaction he did state.
- Reversing the nitroglycerin–sildenafil hypotension: he taught only why the pair is dangerous ("you have this additive effect"), so the `nitroglycerin` ladder stops at Tier 2.
- Treating hyperkalemia from RAAS drugs: not taught; the ACE ladder's Tier 3 is the switch to an ARB for the cough (with the potassium risk kept).

Levelled but in no ladder: the other Tier 1–3 items (for example DL2-018, DL2-034, DL2-063, L12-048, L11-031, PE2-067 … 071), so the Tier buttons drill them alongside the ladders.
