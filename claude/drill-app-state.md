# PHAR 4344 drill — state

Updated 2026-09-28.

## Delivered
- `exam1-drill/PHAR4344_Exam1_Drill.html`, built from `exam1-drill/src/` (`python3 build.py`).
- 132 questions: L01 Day 1 (9/22) 35 · L02 Day 2 (9/23) 35 · L03 Day 3 (9/24) 35 · Exam 1 drug list 27. 26 are select-all.
- Skills: recall 43 · apply 27 · drug 27 · tell 22 · figure 9 · calc 4.
- Checks run and passing: build.py, test.js, style_check.js, browser_test.js (Chromium).
- Checks not built for this course: cite_check (needs the PDFs with page numbers), explain_check, coverage_check.
- Adversarial review done on L01–L03 against deck text + transcript. No keyed answer changed. L03-034 was rewritten because the old key was inferred, not stated.

## 2026-09-28 update
- Textbook notes (`reading` field) on 114 of 132 questions from Katzung 16e Ch. 1, 2, 6 (Drive: Fall 2026/Intro Pharmacology/Readings). Keys unchanged. Conflicts noted on the question: diazepam (PAM vs allosteric agonist, DL1-009/020), potency definition (L02-033, L03-028), PKA as second messenger (L02-019), Gs signal duration (L02-005).
- Page: last-updated stamp + change log (CHANGELOG.md, embedded by build.py), exam countdown (`when` in course.js), phone-stacked tables, keyboard shortcuts, seen bars.
- Chapter text carries only AccessMedicine printout pagination; `sec` cites section headings.

## 2026-09-28 (evening) update
- Terms: `glossary.js` (50 terms, sourced; disagreements in notes/GLOSSARY.md) → `gen_terms.py` → `q_TERMS.js` (98 questions, skill `term`). Exam draw caps term items at 15%.
- Figures: `diagrams.js` FIG(key) inline SVG; keys drc-basic, potency, efficacy, partial, inverse, competitive, irreversible, binding-kd, spare, sites, two-state, gpcr. Attached via `fg` on 33 questions and on glossary terms.
- Readings trimmed to ≤2 sentences / ≤45 words (TRIM_BRIEF.md); style check rejects "the chapter/textbook" phrasing and source references in definitions.
- Bank: 401 questions (PE 58 added) (L01 50 + L02 50 + L03 48 + L04 50 + DL1 27 + TERMS 118). 58 carry a `graph` (curves drawn in the stem via FIG.graph); 92 tagged `poll` (his formats: graph poll, CORRECT/INCORRECT + all of the above, True/False pair, which-drug-is-a, scenario/predict, select-all). notes/POLL_BRIEF.md holds the formats. Curve-letter and T/F options are never shuffled.

## 2026-09-28 (night) update
- Figure `classes` (diagrams.js): four receptors side by side, agonist / reversible antagonist / irreversible antagonist / allosteric modulator, each answering where it binds, whether it activates, whether it lets go. On DL1 diazepam (009, 020), phenoxybenzamine (moa + irreversible-drug), prazosin, phenylephrine; glossary allosteric-agonist and allosteric-antagonist.
- Diazepam note and teach rewritten in plain words (gen_druglist.py NOTE / TEACH); key unchanged. Tell-apart row on the three questions a class name answers.
- Checks: build.py, test.js, style_check.js, browser_test.js passing.

## 2026-10-01: L06 (9/30) + Jeopardy + bank review
- 10/01 (later): Graphs tab (graphs.js registry GRAPHS, q_FIGS.js lecture FG, `miss` tags on every wrong option of an img question; app.js vGraphs/graphFeedback/missTally; test.js checks the registry). Shift panels built from DEFS with paired `shift-*-anim`. New figures: enhance(+anim), reg-chain, superfamilies, bonds, selectivity, moa-soa. Overlap scanner: scratchpad/overlap.js (FIG.keys()). Page-review findings notes/review/PAGES.json applied except #33 (8.5px labels kept).
- RULE (user, 10/01): no Exam 2 material on the site until after Exam 1 (Fri Oct 2). The 9/30 transcript second half and Autonomic Nervous System.pdf are not ingested.
- Terms redesign: glossary entries carry `gist` (≤14 words) and `scene` (situation without the term name); gen_terms.py makes T-id-1 scene→term, T-id-2 term→gist, T-id-3 def→term (dupOf the first). Flashcards show the scene first. FIG crosstalk on cross-talk.
- L06 Day 6 (9/30): Part 3 deck (Drive 1oyAam1CYFWz9rv2pOnzHG4lGKSbOGv6g, 2 pages), review slides Pharmacodynamics reviews.pdf (Drive 1n1TKj61a3hsnw6cciHrYdRcWoMjSVjDo, 11 pages), transcript 09.30 (Drive 1RNbCiQ44t_i3fpyyEFHbF3jafBuym7ZK; read in full; ~60% is Exam 1, the rest is Exam 2 autonomic material). 35 questions q_L06.js (incl. 4 match items: classify A–E, what each question rules in, G-protein steps forward and reverse), notes/L06.md. Review figures cropped: rev-rt-figure, rev-shifts-base0/50, rev-dotted-left/right, rev-allo-ant, rev-pindolol, p3-therapeutic-efficacy.
- Jeopardy (9/30): Drive folder "Jeopardy Questions" (IMG_3010–3018, IMG_9313–9321); 18 items verbatim + the 9/30 PollEV page-6 poll as q_JEOP.js (JP-001…019, topic JP, tags include 'pollev' for the verbatim exemptions in test.js). Keys all from the transcript (notes/L06.md table). New figure crops jeop-abcde-effect, jeop-a-plus-b. Conflicts: curve E on the 50% figure keyed inverse agonist (his Jeopardy key) though he first said "irreversible"; J11 stem he called wrong (SSRI); J2 "I changed the question".
- PollEV’s Exam 1.pdf (Drive 1z1I--AB79jydLVR4VW4aAP0wm1VvUicK) updated 10/01: only page 6 new (irreversible antagonist = phenoxybenzamine). L02-012 now mirrors it.
- Guide 10 "How to tackle a curve question" (first in guide.js) + guide 6 "How he will ask it (9/30)" + FIG gpcr-anim (step-through Gs cascade with Back/Next/Play; click handler in app.js, `.st` groups). Tell apart: Day 6 table, indirect/regulation grids, stepper.
- Adversarial review (notes/REVIEW_BRIEF.md; findings notes/review/*.json): 78 bank findings, 77 applied (L01-009 kept); 34 glossary findings applied (occupancy-theory and nam terms removed; defs no longer name their own term); 5 tell rows fixed. No keyed answer was found wrong; two re-keys sourced to his words (L01-019 partial agonist = efficacy 1–99%; L01-034 reverse step = α rejoins β/γ).
- Bank: 550 questions. course.js lectures now L01–L06, JP, PE, DL1; lecture entries may carry `decks:[…]` (test.js accepts any of them in the cite).
- Exam facts 9/30: ~50 questions × 2 points, backwards navigation, select-all 2–3 max, one 9/29 poll verbatim plus a Jeopardy bonus; "which is the signal/receptor/transducer/effector/second messenger" and the steps forward/back will be asked; know cAMP and IP3.

## 2026-09-30: L05 + guides
- L05 Day 5 (9/29): Part 2 deck (Drive 1cPh8uE-c_Vhyp3y2jnlHcOHSyScHx63N; 44 pages, all lectured), transcript 09.29 (Drive 1rE_AnXhO-HdJ-rRVWnL_FupJfcdJgN1s). 45 questions, notes/L05.md. Conflicts: page-26 handwriting "shift left" vs slide/transcript right; SI 0.1 (slide) vs "1.1" spoken.
- PollEV’s.pdf v2 (Drive 1z1I--AB79jydLVR4VW4aAP0wm1VvUicK, 6 pages): pages 4–5 are the 9/29 polls (PE-059…080). Pink-card green highlights are STUDENT responses; keys come from transcripts. PE-003 keyed Efficacy.
- guide.js: nine guides (GUIDE_BRIEF.md). Figure markers <!--FIG:-->, <!--IMG:-->, <!--GRAPH:{json}--> expanded by expandFigs() on Guides and Reference.
- Bank: 500 questions. Remaining Exam 1 lecture: 9/30 (a few Part 2 slides + review/Jeopardy).

## PollEV PDF (2026-09-29)
- PollEV_s.pdf (user upload, 3 pages): his polls with keyed answers. Figures cropped to images.json (keys pollev-*; raw screenshots in src/polls/, git-ignored). q_POLLS.js = 27 verbatim (sub 'verbatim', tags pollev, dupOf the lecture item) + 31 variants. Verbatim polls are exempt from the ≥3-option, longest-option and reasoning-word rules.
- PDF keys that corrected the bank: Kd table values (L02-032), potency poll wording "# of receptors" (L02-033), "Which is more important?" = Safety (PE-003, note).

## Sources (Google Drive: GoodNotes/FSOP/P2 Year/Fall 2026/Intro Pharmacology)
- Syllabus: SyllabusF26_PHAR_4344_PT_II_Intro_to_Pharmacology_Final.pdf
- Slides/Exam 1: Pharmacodynamics-Day-1-2026s.pdf, Pharmacodynamics-Day_2_2026s copy.pdf, Pharmacodynamics-Day_3_2026s.pdf (+ condensed), Exam_1_Drug_List_2026.pdf
- Transcripts (Transcripts/Intro Pharmacology): 09.22, 09.23, 09.24

## Known limits
- Slide numbers are approximate (marked ~). Drive returns deck text with no page markers, and the PDF downloads failed. Cite by title if in doubt; slide maps are in notes/L0X.md.
- No slide images in this build, so curve questions describe the curve in words.
- Exam 1 question count and select-all count are not announced. The simulator asks for a length and uses the 120 minutes the syllabus allots.

## Ingested 2026-09-29: L04 Day 4 (9/28)
- Deck Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf (Part 1 = pages 1–56 covered 9/28); transcript 09.28. 35 questions, notes/L04.md. Lecture stopped at slide ~56 (spare receptors, indirect antagonists, regulation, quantal, TI not yet taught).

## Next to ingest (Exam 1 = Sept 22 – Sept 30)
- 9/29 Drug–receptor interactions II (competitive and irreversible antagonists, allosteric)
- 9/30 Receptor regulation, quantal responses, therapeutic index
- Carried over from 9/24: two-state model and full + partial agonist combinations (L03-031–035 are slide-only for now)

## Conflicts logged
See `## Conflicts / uncertain` in notes/L01.md, L02.md and L03.md. The ones that reach questions carry a `note`: ADME and apparent vs pharmacological potency (L01-015, L01-018), potency determinants on the slide vs spoken (L02-033), and agonist reversibility (L03-015).

## 2026-10-12: Exam 3 started (Dr. Smith), one lecture of five
- L13 Day 13 (10/9) Principles of toxicology ingested from the Echo transcript first, then the deck (cited by slide title), then the reading; 36 questions, guide3/reference3/tell3, 15 glossary terms; activeExam 3. PR #73; artifact v47; Pages c1f0a37.
- Exam 3 is incomplete: tox days 2–4 and pharmacogenomics day 1 (Oct 13 – Oct 20) are not in the bank. Roster, dates to confirm, and what each ingest needs: exam1-drill/notes/EXAM3.md.
- Next ingest: the 10/13 lecture (deck, Echo transcript or audio, any posted study guide, her polls). On 10/13 she also finishes the 10/9 deck (indices, target) and discusses the reading: L13-032 to L13-036 are low yield until then.

## 2026-10-17: Exam 3, lectures 2 and 3 of 5
- L14 (10/13) and L15 (10/14) ingested from the Echo transcripts first, then the decks (cited by slide title); 70 + 65 questions; guide sections 9–24; reference 10–23; tell3-l14, tell3-l15; 31 glossary terms. Syllabus roster verified (notes/EXAM3.md). L13-032..034 keyed to her 10/13 words; L13-035/036 remain low yield.
- Next: 10/19 and 10/20 transcripts (decks for 10/19 already in Drive); her Canvas quizzes if shareable.
- 10/17 later: Readings tab (17 cards, src/readings/*.json + gen_readings.py); her practice quiz 1 in the bank; syllabus of 10/8 noted; UX review report in notes/UX_REVIEW_2026-10-17.md (R1 applied; R2–R9 await the user); daily Drive reminder routine created.

- 10/17 night: nine recorded listen talks (audio/rd-*.mp3, ElevenLabs voice id jNB0TWZK9LKlBbU54wMW, the workspace clone named "JK", one take each, 24:02 in all); deck gained Pause/Resume, a played/total clock and per-talk lengths (listen_secs on each card) (PRs #81, #82). Exam 3 "Hear the why" texts (narration3.js, one per L13–L15 question, 181 questions) in progress; clips not yet recorded, cost to be reported first.
- 10/18: Exam 3 Hear-the-why clips recorded for 62 of 181 questions (L13-001..046, L14-001..009, L14-011..017; JK voice, one take each, 2,792 s, 805 cents). The ElevenLabs workspace quota (131,000 credits) ran out mid-run; 119 clips remain (L14-010, L14-018..070, L15-001..065). Texts are final in narration3.js; regenerate from them when credits return (about 0.0182 cents per character).
- 10/20: L16 (10/19) ingested: 68 questions (bank-verifier 18 findings applied), guide 25–32, reference 24–27, tell3-l16, 15 terms, Marraffa 2012 card, AAPCC cards marked discussed with her 10/19 words, her 10/19 exam cues in the scope section. Not reached 10/19: toxidromes table (L16-013 lowYield), CO bullet (L16-049 lowYield), bonus decks. Next: 10/20 pharmacogenomics (deck + transcript), her poisoning-table key, the vote on whether 10/20 counts Friday. Hear-the-why texts for L16 not yet written.
- 10/21: L17 (10/20 PGx, 60 q, taught to p. 21; vote kept 10/20 on Friday's exam), TBL3/GRG3/RMK3 banks from her three posted keys (68/33/28 q), Poisoning table drill page (poison_table.js), her keys verbatim in STYLE.md, earlier L14/L16 items fixed against the keys, Smith focus switch, folding topic cards, exam facts card. Worksheets-vs-keys note in notes/. Next: 10/21+ lectures belong to Exam 4; Hear-the-why texts for L16/L17/keys not written; 119 L14/L15 clips await ElevenLabs credits.

## 2026-10-21: antidote diagrams and her quizzes 2 and 3
- antidotes/ at the site root: 7 diagram pages from the 10/19 chat handoff (zip in Smith's Lecture folder). Sources in antidotes/src
  (fragments unchanged, hashes in fragments.sha256, checked by test.js; shim.css retheme; build.py run by the drill build).
- Drill: panel viewer (data-anti chips) on the poisoning table, guide 27 and 30, and Explain more on 35 Exam 3 questions.
- Open items checked against the 10/19 transcript: antidotes/src/OPEN_ITEMS.md. Rhodanese framing differs (she says rhodanese is given).
- QZ3: 19 items (her quizzes 2 and 3 verbatim), dupOf to lecture items; explain links follow the dupOf target.

## 2026-10-22: why questions and explanation rewrites (v69, PR #96)

- q_WHY_L13..L17.js: 121 "why" questions (ids -101 up; TBL3-101..113 in q_WHY_L16.js), tag "why"; Topics button "Why questions" (188 with older why stems).
- Two verifiers: no wrong keys; near-duplicates carry dupOf; L13-122 dropped (circular).
- 503 teach/why rewrites across L13–L17, QZ3, RMK3, TBL3, GRG3 so explanations give the reason, not the key. L14-054 keeps Gottlieb's inverse-agonist quote (user's call).
- Smith quotes display without fillers (tidySpeech in app.js); source files stay verbatim.
- Her wording vs textbook, kept as hers: NOAEL "lowest" dose; hydrophilic gases go deep; rhodanese given; Fab "monoclonal"; botulinum "aerobic".

## 2026-10-22 (later): textbook over her slips, figures, short answer, exam format (v70–v74, PRs through #101)

- Superseded from the entry above, by the user's decision: rhodanese is the body's own enzyme and sodium thiosulfate is given
  (Marraffa pp. 203–204); digoxin immune Fab is ovine (sheep) Fab per the FDA DigiFab label; NOAEL is the highest no-effect dose.
- Class A slips corrected across banks, glossary, guide3, reference3, tell3 (list in CHANGELOG "Exam format; her slips corrected").
  11 class B/C cases still wait on the user (potency C vs D, drugs A/B TI, hydrophilic gases, Hardy-Weinberg, metronidazole,
  benzo "agonist", NAPQI free radical, ion trapping, multiple-dose charcoal, benzene "gas", thalidomide market).
- Slide figures: simg/simgAlt fields (stemMedia), clean embedded rasters only, answer labels masked; rule in STYLE.md.
  Tox/Toxic Responses/PGx: 14 smith-* images on 23 questions; Treating Poisonings (user upload 10/22): 8 smith-tp-* images,
  simg on L15-050, L16-005/016/018/019/032/045/046/050, toxidrome table in guide 26 (L16-013 no longer lowYield: Quiz 3 Q5).
- Exam 3 format (her words 10/22): 54 questions, 2 hours, select-all no partial credit, 2 true/false, 2 short answer.
  Exam sim strict mode ("no backwards nav", 10/21) is opt-in, off by default (store key ns+':noback').
- Short answer page (sa3.js, 26 prompts, store key ns+':sa'). Quiz 4 (PGx) Q4, Q8, Q9, Q10 verbatim in QZ3 (sub quiz4).
- 10/21 lecture is Exam 4 material ("Where I start today is for my, my last exam"); the Types of Genetic Variant
  worksheet and Furuta 1998 belong to it and are not ingested.

## 2026-10-22/23: her exam format, listening panel, step-throughs (v75–v79, PRs #102 onward)

- Exam 3 banks rewritten to her quiz format (scratchpad rewrite brief): 4 options, no absolute words, no length cue,
  no "she/her key" in stems; core:true + coreWhy (★ Most likely button per topic/section); 352 core items.
- New banks: q_NEW3.js (94: NOT/EXCEPT, T/F, pairing, cases, fill-in with word bank), q_GAP3.js (34: guideline list,
  toxidromes, interactions, TI/MOS/MOE calculations core per her objective "calculate common indices of toxicity",
  GAP3-033 Marraffa authors, GAP3-034 poison control number from Marraffa p. 199).
- Stems: no parenthetical glosses (her quiz stems have none); 24 stems fixed 10/23.
- Hear the why: scripts for every core item (narration3.js + _l16, _l17, _keys, _new; 600 of 718 Exam 3 items);
  recorded L13–L15 clips whose scripts changed were retired. Reading talks rewritten (no logistics); rd-*.mp3 removed.
- Listening side panel (SAYFIG/SAYMOV/SAYROW in app.js): moving diagram, slide, poison-table key row; follow-along text.
- Antidote diagrams: ANTI_NARR (antinarr.js) Listen + transcript; AD_CLIPS for future ad-<slug>.mp3.
- Step-throughs STEPS3 (steps3a.js, steps3b.js): methanol-eg, apap-nac, ion-trapping, liver-zones, allele-genotype,
  haplotype; <!--STEP:key--> in guide3 sections 18, 25, 27, 28, 37, 38.
- Audio not recorded (quota ran out 10/18). Per-batch characters, ~1 credit each, at 805¢ per 44,297 chars:
  reading talks 23,611; why L13–15 unrecorded 111,403; L16 58,078; L17 51,593; keys 65,217; new/gap 92,011;
  antidote diagrams 12,172; step captions 6,385; total 420,470 (about $76.41). Waiting on the user's choice of batches.
- Open with the user: her table key cites "Pharmacotherapy e6" for iron and organophosphate rows, but the posted e6 is
  Medication Adherence; 11 class B/C slips; Quiz 4 Q1 has no correct option (Exam 4 material).
- 10/23 (later): final audio review. Nine reviewers checked every Exam 3 script against the current item and the sources
  (scratchpad audit/BRIEF.md, outputs audit/out_*.json, applied by audit/apply.py): 234 Why scripts replaced, 96 added
  (narration3_audit.js: Why items, QZ3-001..023, matching items, GAP3-033/034); all 33 recorded L13–L15 clips retired
  (scripts changed). Reading talks, ANTI_NARR and 31 step captions corrected. Author items starred (user decision).
  Unrecorded audio now 574,100 characters (about $104.33 at 805¢ per 44,297). Key doubts for the user: L17-123 (her
  spoken "gene structure" vs keyed linkage), L15-003 hydrophilic gases, TBL3-068 / her key's "Pharmacotherapy e6".
- 10/23 (night): all Exam 3 audio recorded (ElevenLabs eleven_v4, voice jNB0TWZK9LKlBbU54wMW, flow rBTHpyjMMFGUzXbnjGQc):
  751 clips (rd-*, q-*, ad-*, s3-*), 574,654 credits on completed clips (about $104.48); queue and download script in
  scratchpad rec/ (queue.js, dl.py). S3_CLIPS added to audio_index.js (step-through Play uses s3-<key>-<i>.mp3).
  Quotes trimmed in all banks, guides, tell3, sa3, reading cards (scratchpad audit/QUOTE_BRIEF.md). Guide3 sections
  1–39 rewritten (scratchpad guide/BRIEF.md, splice.py). Reading listen_secs set from the recordings.
- 10/23 (final review, v83): six reviewers (scratchpad review2/*.md: func, guideA, guideB, banks, audio, learning).
  Fixed: resumePlace restores an answered card (ans state in saveResume); sideHTML folds closed under 700 px; her-format
  paper hides the question grid; exam review shows Hear the why; guide prev/next (.gnav); exam.tf=2 enforced in drawExam;
  Smith focus default on; QZ3 and lecture-file quiz items core; naloxone capitalized in poison_table/reference3;
  sayPlay single fallback and qSay guard re-armed on loadedmetadata. Guide: scope section on her 10/22 format and the
  10/20 vote, "Quiz 4 key" relabeled (her key was never released; the student's answers were graded 100), HIET expanded
  per Marraffa, sec 26 toxidrome coverage sentence, Questions ranges widened, guideA wording fixes. Banks: transcript
  slips glossed in brackets, fragment quotes replaced (TBL3-001/041, NEW3-023/042, SA3-05/10/13, L16-102), marraffa.json
  evidence_clean added, 10/21 restatement dropped from tell3. Left for the user: L15-119 TI framing; 10/21-labeled rows
  and L17-054..060 kept as labeled; RMK3-025 omits "the elderly"; dipiro-e6 status.
- 10/23 (post-publish fixes, v84): #updbar moved inside <header> (hdrVar re-measured on insert/dismiss); resumePlace
  restores the exam result page (r.v === 'exam' with EX.done); exam review cards show options and whys before teach and
  the Hear the why row (chk7.js verified the order). Chain: build, test.js, style_check.js, browser_test.js passed.
- 10/23 (break video, v85): the user's video (H.264/AAC, 1280x720, 3:13, 27.6 MB) at exam1-drill/media/break.mp4,
  loaded only on Watch. app.js motivSuggest/motivPlay/motivTick: card after submitExam and after 1800 s of active study
  (tab visible, input within 120 s; not during an unfinished paper, the diagram panel or the player); state in
  <ns>:motiv {act, off}; Progress has the on/off box and Watch now. Not playable in the test Chromium (no H.264).
- 10/23 (guide walkthroughs, v86): 39 spoken scripts in src/walk/guide3-*.json (186 segments, 16,087 words, 98,025
  characters, about 107 min at 150 wpm), written from the guide3 section text only (scratchpad gw/BRIEF.md), checked by
  four reviewers (gw/VERIFY.md, gw/verify/*.json: fact, distortion, slide, form fixes applied). gen_walk.py ->
  guide_walk.js; slides rendered from the user's Drive deck copies (her ink is flattened in) to exam1-drill/slides/
  (152 JPEG, 14.6 MB); classmate copies excluded. Player in app.js (gwBars/gwOpen/gwPlay; GW_CLIPS from audio/gw-*.mp3).
  Not recorded yet: device voice until the user approves about 98,000 credits (about $17.82 at the 10/23 rate).
- 10/23 (walkthrough teaching review): learning reviewer (scratchpad gw/learning.md) applied by gw/apply_learning.py,
  25 parts changed or added, rechecked (gw/verify2.json, 8 fixes applied). Now 192 parts, 101,811 characters. Player:
  "table" field (guide table index, validated in gen_walk.py), reading preview (gwReading, rd-<id>.mp3 summary),
  resume (<ns>:gw-pos), K/Space/arrows, aria-live part, phone order and 44 px targets. Recording queue rec2/queue.json
  (ids gw-<section>-<part>), recorders write rec2/done_[abc].json.
- 10/23 (walkthroughs recorded, v87): 192 clips audio/gw-<section>-<part>.mp3 (eleven_v4, voice jNB0TWZK9LKlBbU54wMW, flow
  rBTHpyjMMFGUzXbnjGQc), 101,801 credits, 1,850.92 cents, 108.2 minutes; rec2/done_*.json. GW_CLIPS lists all 192; every
  section bar reads "read by the narrator". Playback, auto-advance, pause and resume checked in Chromium.
- 10/24 (Exam 4 begins): course.js Exam 4 (syllabus: Mon Nov 2, 8:30–10:30, 22%, Oct 21–28; count not announced),
  activeExam 4. L18 (10/21: Intro PGx pp. 22–41, Examples pp. 1–9; Examples pp. 1–5 were not recorded, she offered to
  post a recording) 66 q; L19 (10/22: Examples pp. 10–33; Exam 3 logistics in notes only) 44 q. Two bank-verifiers
  (scratchpad ex4/verify_L18.json, verify_L19.json): 0 wrong keys, 42 fixes applied; L17-054..060 dupOf the L18 items.
  guide4.js (14 sections), tell4.js, reference4.js; PAGE4 in app.js; FOCUS_EXAM = her latest exam, FOCUS4 quotes;
  Exam 4 question routing by the guide Sources lines (SEC4). Readings: furuta-1998 (new; her figure is a 2004
  lansoprazole study, the paper is 1998 omeprazole), katzung-5 and dipiro-e6 moved to exam 4 (dipiro-e6 may be the
  wrong posted chapter: her deck cites DiPiro 13e e8 Clinical Pharmacogenomics). Daily tasks: "Smith daily ingest and
  guides" (21:47 Central), "Drill daily polish and question simulation" (03:41 Central); "Smith reading reminder"
  updated for Exam 4. Briefs for them: notes/EXAM4_LECTURE_BRIEF.md, GUIDE_SECTION_BRIEF.md, WALKTHROUGH_*.md.
- 10/24 (Exam 4 walkthroughs): 14 scripts src/walk/guide4-*.json (60 parts, 27,119 characters, about 32 minutes),
  checked by two reviewers (scratchpad gw4/verify, 19 fixes); gen_walk.py reads guide3.js and guide4.js. Not recorded:
  about $4.93 at the 10/23 rate, waiting for the user's go-ahead. guide4-l19-5 now states the Furuta figure (2004,
  lansoprazole) versus the assigned 1998 omeprazole paper.
- 10/25 (daily polish 1): click-through clean at 390/1200 (scratchpad daily/glitch.js). Simulated students (strong,
  average) both 40/40 on a 40-item Exam 4 paper from guide4 alone; 7 flags, 4 confirmed and fixed (L18-013 reworded,
  L18-041 distractor, guide4: clopidogrel use and 4-hydroxydebrisoquine). Quiz-flow review (daily/ux_quiz.md): Q.missed
  and "Retry the N missed"; select-all verdict counts and .missed tags; srcNote() folds caption-only notes under More;
  "low yield" in metaLine; Exam 4 NARR_Q from teach (device voice); 44 px [data-c] on touch; examCard "· 120 minutes";
  "★ Likely: n"; Exam 4 Date fact removed. Nine figure stems rewritten in words. Open: select-all items all have 3-4
  correct of 4-5 (vary when next edited); Exam 4 Hear the why not recorded.
- 10/26: focusNote() on Guides, Tell apart and Reference while Smith focus is on (Show all exams button); focus card and
  button title name what is hidden. notes/WALKTHROUGH_PORT_PROMPT.md: prompt to port the walkthrough player to another drill.
- 10/26 (daily polish 2): daily scripts moved into the repo (src/daily/glitch.js, paper.js, STUDENT.md); walkthrough slide
  img loads eagerly. Students on seed 20261026: strong 40/40, average 39/40 (missed L18-066). 6 flags; 5 acted on: L18-066
  stem adds "and its result", L18-035 option "becomes RNA and then protein" (guide4 matched), L18-011 and L18-033 stems
  no longer state what L18-009 and L18-032 ask. L19-039 vs L19-037 left (a tell-apart item carries the fact by design).
  UX review (walkthrough + readings, 7 items, all applied): phone order slide first with .gwtx 40vh; guide4-l19-1 part 3
  -> pgxex:15, guide4-l19-5 part 5 -> pgxex:25; rdLead and gwReading skip single-letter abbreviations; links for
  katzung-5 and furuta-1998; status line uses discussed_in_class; dipiro-e6 lecture line shortened; 44 px Speed select.
  Furuta status stays 'upcoming' until the 10/26 transcript arrives.
- 10/27 (nightly ingest): L20 = 10/26 lecture, Examples deck pp. 32-61 (TPMT dosing, P-gp/ABCB1, OATP1B1/SLCO1B1,
  ADRB1, ADRB2, EGFR, G proteins, ALOX5, ACE, warfarin CYP2C9 + VKORC1 + CYP4F2, HLA, Furuta 1998 discussion).
  q_L20.js 66 questions (7 select-all, 2 match, 2 lowYield after fixes: L20-013, L20-031; dupOf L20-001, 009, 021, 048,
  062, 064); notes/L20.md (cues, conflicts). Verifiers: bank 8 fixes (none to a key), guide 17 fixes. guide4-l20-1..8
  (headings 15-22), tell4-l20 (17 rows), ref4-l20-1/2. Walkthroughs walk/guide4-l20-*.json: 38 parts, 17,919 characters,
  15 reviewer fixes; not recorded (about $3.26; all Exam 4 walkthroughs together 45,038 characters, about $8.19).
  FOCUS4 +4 cues; course.js Exam 4 facts: Dr. Gottlieb has no questions on Exam 4, her emphasis on detail and application.
  furuta-1998 status 'discussed' (L19, L20). Conflicts kept in notes: TPMT heterozygote "35% of the dose" vs slide "35%
  of heterozygotes need dose decrease"; simvastatin 221 "times" vs slide 221%; Furuta GERD vs peptic ulcer; ACE p. 49 vs
  p. 56. Deferred by her to 10/27: resources lecture and worksheet (carbamazepine, abacavir, trastuzumab labels), HLA
  exercise, warfarin dosing tables. Furuta take-home quiz announced (logistics, not in the drill).

## Restore after a container restart

The scratchpad is wiped on every restart. Durable copies: scripts and briefs in the repo (exam1-drill/src/daily/,
exam1-drill/notes/); transcripts in Drive, Smith's Lecture transcripts folder 1pH9DY6g55K8rTzK6cUGKy_l-H15TfqG0.
Transcripts are never committed (Pages serves the repo root). At the start of each scheduled run, download any missing:
- L18 (10/21): Drive 11x7ATwHf1kLolqRtibbgdGTsAJry-XKa, 76,165 bytes -> <scratchpad>/l18/transcript.txt
- L19 (10/22): Drive 1IYKmaNPVlhYThg-6CETJTL5J23JndQO2, 83,752 bytes -> <scratchpad>/l19/transcript.txt
- L20 (10/26): Drive 1iWFEnmaSLik81r8KWO2jSYFZ0FRp3SoO, 93,647 bytes -> <scratchpad>/l20/transcript.txt
- Examples deck PDF: Drive 1lN9BKuyhTRxaP6fRYwXh7xTOAJcAAIA-; page text via pdftotext -layout per page -> <scratchpad>/l20/examples_deck.txt
Each new lecture ingested adds its line here.

