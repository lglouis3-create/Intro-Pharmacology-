# Regulation brief (read-only task; write your findings to notes/REGULATION_FINDINGS.md)

The learner says of the rapid-desensitization and long-term down-regulation figures: "Having trouble understanding it, why it's important, what he wants us to take away from it. How long term shifts to the right if that can be better explained to connect the full concept."

Collect, with exact quotes and locations, everything he said or showed on receptor regulation:
- transcripts: `/tmp/claude-0/-home-user-Intro-Pharmacology-/b3094785-cacf-58b3-9d24-8d3cafd9359e/scratchpad/t5.txt` (9/29, main source), t4.txt (9/28), t6.txt (9/30 review), t01f.txt (9/22, GPCR day) — grep for desensit, regulat, tolerance, band, arrestin, internal, endocyt, recycl, degrad, Afrin, opioid, taper, beta blocker, rebound, spare, irreversible, "do the opposite".
- slide text: part2.txt (Day 4–5 part 2 deck), the Day 1 deck text if present (grep GRK, arrestin), notes/L01.md, notes/L04.md, notes/L05.md slide maps.
Then write `notes/REGULATION_FINDINGS.md` with:
1. Quotes table: quote | where | which figure it belongs to (rapid desensitization / long-term down-regulation / up-regulation / why it matters).
2. "Why it matters" in his words: the clinical consequences he named (tolerance; what happens when a β-blocker is stopped; Afrin; opioids; what the exam asks: effect on the curve, which drug class each is analogous to, the agonist/antagonist rule).
3. The chain that connects long-term down-regulation to the curve: fewer receptors at the surface → the agonist needs more dose (potency down, shift RIGHT) → while spare receptors cover it the Emax holds → when receptors run short the Emax falls; the analogy to an irreversible antagonist; and the mirror for up-regulation (antagonist → more receptors → agonist more potent, shift LEFT, antagonist weaker). Quote his words for every link in the chain; mark any link he did not state as "not in his words (textbook reasoning)".
4. The difference he draws between rapid (seconds–minutes, receptor stays in the membrane, β-arrestin, reversible, "band-aid") and long-term (hours–days, receptor leaves the membrane, recycled or degraded), with quotes.
5. A proposed 3-bullet "take-away" per figure, each bullet ≤ 20 words, in his words where possible.
6. A separate list: concepts from Days 1–3 that he said he expects on Exam 1 and that have NO figure in src/diagrams.js (list the F['...'] keys there first: `grep -o "F[23]\?\['[a-z0-9-]*'\]" src/diagrams.js | sort -u`). For each: the quote showing he expects it, and a one-line sketch of a figure that would show it. Candidates to check: the four receptor superfamilies and their time scales, Kd and the binding curve, selectivity, bonds and affinity, the therapeutic index, drug vs NDS, MOA vs SOA.
No invented numbers; every claim carries its location.
