# GAP2 — Exam 2 gap questions (`src/q_GAP2.js`, ids G2-001 … G2-070)

Written 10/11 against the whole Exam 2 bank (706 questions in L07–L12, PE2, DL2 and the Exam 2 terms) and his stated exam format (student's report of the 10/9 review: 50 questions, 2 select-all, 2 tracings; ~20% drug list; 3–4 "receptors on an organ and their responses"; 2–3 "autonomic system: dual innervation, exceptions"; 5–7 Tier 1 receptor predictions; Tier 2 two-drug items; Tier 3 reversals; one 10/7 poll "in a different shape or form"; one 10/5 and one 10/6 poll verbatim). Every item keeps its lecture id (L07–L12) from the deck it comes from and cites that deck; the topic is `GAP2` (its own card, like PE2), with subs organ, dual, gprot, t1, t2, t3, inc, scen, poll, trace, raas, allabove, colon.

Sources: the five decks' text in `scratchpad/sources/exam2/decks/` (`=== page N` = slide N), the transcripts 9/30–10/8, `PollEV_Exam2_1009.pdf` (through the PE2 notes), the official drug list. Every transcript quote was found verbatim (whitespace-normalized) in the transcript of a date named in the item's cite by `scratchpad/gap2/check_gap2.js`.

## Method: coverage matrix
1. Slide coverage: every question's `cite` was parsed for "deck slide N" and counted per slide (script in the session). Slides with 0–1 questions **that he taught** (per the L07–L12 slide maps and transcripts):
   - ANS: 5 (Table 6-1, shown not walked through), 14–20 (neurotransmission steps, 1 each), 36 (integration, 0), 53 (love triangle, 1). Content either untested by him or covered by the step questions; nothing written.
   - NMJ: 3 (receptor-stimulant map, 1), 16–18 (NM recovery/review, 0–2), 26 (halothane, 2), 38 (edrophonium, 2: "not too worried"), 51. Nothing written except the succinylcholine paralysis order (10/5 audio, not on a slide).
   - Cholinergic: 3 (1), 16 (catch-up list), 26–27 (tropicamide / COPD rationale, 2 each), 31 (recap), 33. Nothing new needed.
   - Adrenergic: 4, 6 (circulation, 2), 16, 19–20 (SOA diagrams, 1–2), 46 (catecholamines, 3), 52 (epinephrine uses, 4), 55 (pindolol curve, 5), 60–61 (money slide, cross-talk; 1 and 4), 64–66 (NO history), 75–85 (lab tracings 0–5), 86–92 (not taught). Written: cross-talk application (G2-032), epinephrine + lidocaine (G2-024), SA/AV node caution (G2-023), albuterol partial vs full (G2-025), the EpiPen mixed-blocker variant (G2-036).
   - RAAS: 23 (recap, 3), 28 (aliskiren diagram, 2), 30 (review, 2). Written: "Aliskiren:" in his poll form (G2-062) and the angiotensin I item (G2-063).
2. Concept/stem coverage against his format: counted by grep on stems and concepts. Before this file the bank had 5 "INCORRECT" stems outside PE2, 0 "LEAST likely" stems, 10 "All of the above" keys (9 of them verbatim polls), 2 drug-colon stems outside PE2, 44 Tier 2 and 26 Tier 3 items, and no single-answer "Activation/Blockade of receptor X is most likely to produce" item for β2, β3, β1-block or the gut α2.
3. His exam cues with 0–1 items before: "add like a beta blocker to block the tachycardia" (10/6, prazosin) → G2-026; "a dose high enough of phenylephrine to overpower prazosin" (10/7) → G2-035; "carvedilol or labetalol … knock it out both of them at the same time" (10/7) → G2-036; "call your pharmacist trying to get a supply" (10/7) → G2-037; "What if they're smoking?" (10/5, varenicline) → G2-028; "if add another agonist, now you're really gonna get a lot of dumbbells" (10/6) → G2-027; "whoever has the predominant tone wins that crosstalk" (10/7) → G2-032; the α1 sphincter (10/6–10/7, ANS slide 31) → G2-018; "alpha one agonist is contraindicated is if your patient has high blood pressure" (10/6) → G2-051; "Which of the following drugs activates/inhibits the Gq/Gs/Gi pathway" (his Jeopardy form, only the Gq version existed) → G2-010 … G2-013.

## What was written (70; levels: Tier 1 = 18, Tier 2 = 13, Tier 3 = 7; select-all = 2)
Formats: 11 "Which statement … is INCORRECT", 5 "LEAST likely", 3 "All the above" plus 2 Gs/Gq "All the above", 4 drug-colon stems (dupOf the drug-list item), 5 word-described tracings (one effect each, as he said: "they're just one effect"), 4 variants of the 10/7 polls, 2 "If your patient …" scenarios. No "Why …?" stems. Select-all kept to two (bladder receptors, the twins' airways), since he said 2–3 at most.

Ladder rungs added (existing keys only): `prazosin` Tier 2 G2-026 (add a β blocker for the reflex tachycardia) and Tier 3 G2-035 (phenylephrine outcompeting prazosin); `epinephrine` Tier 3 G2-036 (carvedilol/labetalol for the EpiPen overdose); `nitroglycerin` Tier 2 G2-030 (the mechanism of the nitrate + PDE-inhibitor hypotension, his "tell me on an exam why it's bad"). The `nitroglycerin` ladder still has no Tier 3 (not sourced).

The table of ids, concepts and levels is generated from the file at the end of this note.

## Judged a gap but left out (not in his slides or transcripts)
- Reversing a β blocker overdose, a clonidine overdose or the nitrate–sildenafil hypotension: never taught.
- Clonidine with a β blocker; two antimuscarinics together (additive anti-DUMBBELSS): he stated the additive rule only for two agonists or agonist + cholinesterase inhibitor.
- Succinylcholine + neostigmine (does the cholinesterase inhibitor prolong the depolarizing block?): not taught; only "they're both agonists" (PE2-019).
- Phenylephrine + cocaine, amphetamine + MAO inhibitor: not paired by him.
- Low-dose epinephrine after propranolol (no change expected): only the high-dose version was taught (PE2-052, PE2-067).
- Treating hyperkalemia from RAAS drugs; α1 antagonists for BPH as a use (he deferred the use to the renal module; only the receptor effect, G2-018, is asked).
- "Which organ receives dual innervation" beyond the heart (eye, gut, bladder) is implied by the slides but the heart is the only organ he walked through aloud, so it is the single key.

## Conflicts / notes
- G2-028 (varenicline + smoking): the key is his 10/5 wording ("it's going to compete with nicotine, which is the full agonist, and it's going to keep it down"); L08-009 covers the same fact inside a select-all.
- G2-029 (dobutamine + metoprolol): the pair is on slide 40 as agonist/antagonist; the interaction is keyed from his 10/6 rule ("If you add an antagonist to outcompete it, so you're defeating the purpose"). Note in the item.
- G2-031 (rivastigmine + trospium): same rule plus his 10/8 edrophonium/atropine answer; he did not pair these two drugs aloud. Note in the item.
- G2-025 (albuterol partial agonist): taught 10/7, but he also said knowing "a terol is a beta2 agonist" is what he needs; note in the item.
- G2-033 (succinylcholine paralysis order): 10/5 audio only; slide 27's order is the curare-like one (L08-047).
- G2-030 quotes his "why it's bad" cue rather than the sentence with the transcription slip "market hypertension" (the poll sheet says hypotension).
- G2-067 ("Oxymetazoline:") replaced a planned "Clonidine:" stem, which already exists as L10-040.
- Existing-concept overlaps are marked `dupOf`: G2-067 (oxymetazoline → L10-018), G2-068 (carvedilol → DL2-073), G2-069 (rocuronium → DL2-010), G2-070 (phenoxybenzamine → DL2-058); the recheck script lists every G2 item whose concept name already existed (none did).

## Self-check
`scratchpad/gap2/check_gap2.js` (mirrors `src/load.js`: course.js + the banks + q_GAP2.js in one context): id format and uniqueness, required fields, lecture ∈ L07–L12 and the cite names that lecture's deck (course.js), source/transcript date in cite, 4–7 options, one correct unless `multi`, correct never uniquely the longest, a `why` on every option, teach 2–4 sentences, no deck/lecture reference in stems, quotes found verbatim in the cited transcript date, levels 1–3, ladder keys from the BRIEF table with `ladderName`, `dupOf` targets exist, no stem identical to an existing question, no backticks or `${`. Result: passed (0 failures). `node --check src/q_GAP2.js` passes, and `src/test.js` (which already includes q_GAP2.js through build.py) passes with the file in place. Not committed.

## Generated table
| id | lecture | sub | level | ladder | skill | concept | dupOf |
|---|---|---|---|---|---|---|---|
| G2-001 | L07 | organ | — | — | recall (select-all) | bladder-receptors-responses | — |
| G2-002 | L10 | organ | — | — | recall | eye-receptors-responses | — |
| G2-003 | L10 | organ | — | — | tell | vessel-receptors-incorrect | — |
| G2-004 | L07 | organ | — | — | tell | heart-receptors-incorrect | — |
| G2-005 | L07 | organ | — | — | recall | gi-receptors-responses | — |
| G2-006 | L07 | organ | — | — | tell | airway-receptors-incorrect | — |
| G2-007 | L07 | dual | — | — | recall | dual-innervated-organ-heart | — |
| G2-008 | L07 | dual | — | — | tell | innervation-exceptions-incorrect | — |
| G2-009 | L07 | dual | — | — | recall | cooperating-organ-salivary | — |
| G2-010 | L11 | gprot | — | — | recall | drugs-activating-gs | — |
| G2-011 | L10 | gprot | — | — | recall | drug-activating-gi | — |
| G2-012 | L11 | gprot | — | — | recall | drug-inhibiting-gs | — |
| G2-013 | L09 | gprot | — | — | recall | drugs-raising-calcium-gq | — |
| G2-014 | L11 | t1 | 1 | — | apply | beta2-activation-bronchodilation | — |
| G2-015 | L11 | t1 | 1 | — | apply | beta1-blockade-bradycardia | — |
| G2-016 | L11 | t1 | 1 | — | apply | beta3-activation-retention | — |
| G2-017 | L10 | t1 | 1 | — | apply | alpha2-gut-constipation | — |
| G2-018 | L10 | t1 | 1 | — | apply | alpha1-antagonist-sphincter-voiding | — |
| G2-019 | L09 | t1 | 1 | — | apply | least-likely-raise-heart-rate | — |
| G2-020 | L09 | t1 | 1 | — | apply | least-likely-dry-mouth | — |
| G2-021 | L10 | t1 | 1 | — | apply | least-likely-constipation | — |
| G2-022 | L09 | t1 | 1 | — | apply | least-likely-mydriasis | — |
| G2-023 | L11 | t1 | 1 | — | apply | sa-node-dysfunction-beta-blocker | — |
| G2-024 | L11 | t2 | 2 | — | apply | epinephrine-with-lidocaine | — |
| G2-025 | L11 | t1 | — | — | tell | albuterol-partial-vs-laba-full | — |
| G2-026 | L10 | t2 | 2 | prazosin | apply | prazosin-plus-beta-blocker | — |
| G2-027 | L09 | t2 | 2 | — | apply | two-muscarinic-agonists-additive | — |
| G2-028 | L08 | t2 | 2 | — | apply | varenicline-plus-nicotine | — |
| G2-029 | L11 | t2 | 2 | — | apply | dobutamine-plus-metoprolol | — |
| G2-030 | L11 | t2 | 2 | nitroglycerin | apply | nitrate-plus-pde-inhibitor-mechanism | — |
| G2-031 | L09 | t2 | 2 | — | apply | cholinesterase-inhibitor-plus-antimuscarinic | — |
| G2-032 | L11 | t2 | 2 | — | apply | cross-talk-predominant-drive-wins | — |
| G2-033 | L08 | t1 | 1 | — | tell | succinylcholine-paralysis-order | — |
| G2-034 | L10 | t3 | 3 | — | apply | hypertensive-crisis-least-likely | — |
| G2-035 | L11 | t3 | 3 | prazosin | apply | phenylephrine-outcompete-prazosin | — |
| G2-036 | L11 | t3 | 3 | epinephrine | apply | epinephrine-overdose-mixed-blocker | — |
| G2-037 | L11 | t3 | 3 | — | apply | beta-blocker-trip-supply | — |
| G2-038 | L09 | t3 | 3 | — | apply | atropine-reverses-muscarinic-agonist-overdose | — |
| G2-039 | L09 | t3 | 3 | — | apply | bethanechol-outcompetes-oxybutynin | — |
| G2-040 | L11 | inc | — | — | tell | beta-blockers-incorrect | — |
| G2-041 | L10 | inc | — | — | tell | clonidine-incorrect | — |
| G2-042 | L12 | inc | — | — | tell | ace-inhibitors-incorrect | — |
| G2-043 | L09 | inc | — | — | tell | muscarinic-antagonists-incorrect | — |
| G2-044 | L08 | inc | — | — | tell | succinylcholine-incorrect | — |
| G2-045 | L11 | inc | — | — | tell | epinephrine-incorrect | — |
| G2-046 | L12 | inc | — | — | tell | raas-cascade-incorrect | — |
| G2-047 | L10 | inc | — | — | tell | prazosin-incorrect | — |
| G2-048 | L08 | inc | — | — | tell | cholinesterase-inhibitors-incorrect | — |
| G2-049 | L12 | inc | — | — | tell | spironolactone-incorrect | — |
| G2-050 | L11 | inc | — | — | tell | mirabegron-incorrect | — |
| G2-051 | L10 | scen | 1 | — | apply | hypertension-decongestant-phenylephrine | — |
| G2-052 | L11 | scen | 3 | — | apply | oab-switch-to-mirabegron | — |
| G2-053 | L11 | poll | 1 | — | apply | vasodilation-phenoxybenzamine | — |
| G2-054 | L10 | poll | 1 | — | apply | increase-blood-pressure-phenylephrine | — |
| G2-055 | L11 | poll | 1 | — | apply (select-all) | twins-narrowed-airways | — |
| G2-056 | L09 | poll | 1 | — | apply | bladder-contractor-bethanechol | — |
| G2-057 | L11 | trace | 2 | — | figure | tracing-phenylephrine-drug-x-prazosin | — |
| G2-058 | L09 | trace | 2 | — | figure | tracing-carbachol-heart-rate-drug-x-atropine | — |
| G2-059 | L08 | trace | 2 | — | figure | tracing-ach-skeletal-drug-x-neostigmine | — |
| G2-060 | L11 | trace | 2 | — | figure | tracing-albuterol-bronchi-drug-x-propranolol | — |
| G2-061 | L09 | trace | 2 | — | figure | tracing-bethanechol-gi-drug-x-neostigmine | — |
| G2-062 | L12 | raas | 1 | — | apply | aliskiren-poll-form | — |
| G2-063 | L12 | raas | 1 | — | apply | decreases-angiotensin-i-aliskiren | — |
| G2-064 | L11 | allabove | — | — | recall | metoprolol-all-above | — |
| G2-065 | L08 | allabove | — | — | recall | neostigmine-all-above | — |
| G2-066 | L12 | allabove | — | — | recall | losartan-all-above | — |
| G2-067 | L10 | colon | — | — | recall | oxymetazoline-colon-moa | L10-018 |
| G2-068 | L11 | colon | — | — | recall | carvedilol-colon-moa | DL2-073 |
| G2-069 | L08 | colon | — | — | recall | rocuronium-colon-moa | DL2-010 |
| G2-070 | L11 | colon | — | — | recall | phenoxybenzamine-colon-moa | DL2-058 |
