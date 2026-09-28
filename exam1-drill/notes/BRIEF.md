# Writer brief — PHAR 4344 Intro to Pharmacology, Exam 1 drill

Course: PHAR 4344 Pharmacotherapeutics II: Introduction to Pharmacology (UIW Feik, Fall 2026).
Exam 1 lecturer: Dr. Helmut Gottlieb. Exam 1: Fri Oct 2, covers Sept 22 – Sept 30 lectures, 2 hours, ExamSoft.

## Your inputs (Google Drive, read with mcp__Google_Drive__read_file_content; load via ToolSearch "select:mcp__Google_Drive__read_file_content")
| lecture | deck fileId | transcript fileId |
|---|---|---|
| L01 Day 1 (9/22) Pharmacodynamics-Day-1-2026s.pdf | 1ZUq-XlzGCPE5S38kiTu6AS5ajO-cizKO | 1w7jIllvAmTAPp7lZTbSyWTQ-WOULOqJj |
| L02 Day 2 (9/23) Pharmacodynamics-Day_2_2026s copy.pdf | 1GYHkv_r9EXYOU78-aBrwWRElcxZXl1gK | 1k_ncKVlf9DeXGeLeCs3D8mdDgr8rtawW |
| L03 Day 3 (9/24) Pharmacodynamics-Day_3_2026s.pdf | 1RNOXMuSLw0DgZHQ2wml5GJT9zFYxpoVV | 1ODwE2pYvFwi-V6YDudv8wnd3ZrBcIxbK |
| L04 Day 4 (9/28) Pharmacodynamics-Day_4_-_5_2026s_pptx.pdf (full deck 1jMamPdxcMhadWcFy7vfC8Vbtb80iyjhn; the part covered on 9/28 is Pharmacodynamics-Day_4_&_5_2026s_Part 1.pdf, 1Rkta3BByKaiFOHEmOPOZbqFw9c_ieXU7) | see left | 1sVohhvh9hVGWWghT0oL7mW-XZuwRflKz |

Exam 1 drug list (Exam_1_Drug_List_2026.pdf) — all reversible/competitive except phenoxybenzamine (irreversible):
norepinephrine & epinephrine (α1, α2, β1, β2 agonist); acetylcholine (agonist M1–M3, Nn, Nm); tropicamide (muscarinic M1–M3 antagonist); prazosin (α1 antagonist); phenylephrine (α1 agonist); phenoxybenzamine (α1+α2 antagonist, irreversible); metoprolol (β1 antagonist); diazepam (GABA receptor allosteric agonist); albuterol (β2 partial agonist); varenicline (Nn partial agonist); histamine (H1, H2 agonist); loratadine (H1 inverse agonist); pindolol (β1, β2 partial agonist); diphenhydramine (non-selective histamine receptor antagonist).
The drug-list questions themselves are written separately; you may use these drugs as examples only when YOUR deck or transcript uses them.

## Steps
1. Read the whole deck text (slides are separated in the text; work out slide numbers carefully — if the text has no explicit slide markers, count by page breaks/titles and state your method in notes) and the whole transcript.
2. Write `/home/user/Intro-Pharmacology-/exam1-drill/src/q_LXX.js` (XX = your lecture) — 25 to 35 questions, one per testable point, covering the whole deck in slide order. Weight toward what the professor stresses in the transcript ("this is important", "on the exam", "know this", repeated points, in-class questions/polls).
3. Write `/home/user/Intro-Pharmacology-/exam1-drill/notes/LXX.md` with sections:
   - `## Slide map` — slide number → title (one line each).
   - `## Polls and in-class questions` — every question the professor asked the class (slide polls or spoken), VERBATIM, with the answer he gave and a quote. These define how he words questions.
   - `## Exam cues` — transcript quotes where he signals exam content, with approximate position.
   - `## Tell-apart rows` — confusable pairs as HTML `<tr><td>A vs B</td><td>what separates them</td><td>the trap</td><td>slides</td></tr>` rows; each row must have a question in your q file (list its id).
   - `## Reference tables` — any table/list the questions return to, as an HTML `<table class="reftab">` with a one-line source line after it.
   - `## Conflicts / uncertain` — anything where slide and transcript disagree, or you could not source.
   - `## Objectives` — the lecture's objectives slide verbatim if there is one.

## File format (plain JS, must pass `node --check`)
```js
TOPICS.push({id:'L01', name:'<short topic name>', prof:'Gottlieb', lecture:'L01',
  cite:'Day 1 (9/22) — Pharmacodynamics-Day-1-2026s.pdf',
  subs:[{id:'xxx', name:'Subtopic', cite:'slides 3–8'}, ...]});
QUESTIONS.push(
{id:'L01-001', lecture:'L01', prof:'Gottlieb', tier:'new', topic:'L01', sub:'xxx', skill:'recall',
 concept:'kebab-concept-id', tags:[], source:'slide'|'transcript'|'both',
 stem:'...', options:[
  {t:'...', correct:true, why:'...'},
  {t:'...', correct:false, why:'...'}, ...],
 teach:'2–4 sentences explaining the concept (or [{h:'heading', t:'text'}, ...])',
 quote:'verbatim slide text or transcript line that supports the key',
 cite:'Pharmacodynamics-Day-1-2026s.pdf slide 12' /* add '; transcript 9/22' when source is transcript or both */ },
...
);
```
- `skill` ∈ `recall` | `tell` (tell apart) | `apply` (scenario / predict) | `figure` (interpret a curve or graph described in the stem) | `calc` (calculation).
- Optional: `multi:true` for select-all (2+ correct AND at least one incorrect; stem ends "Select all that apply."). Aim ~15–20% select-all.
- Optional: `note` when sources disagree (state both and which one an exam from lectures keys). `dupOf:'id'` if a second wording of the same fact. `lowYield:true` for asides he says won't be tested.
- 4 or 5 options (select-all may have up to 7). Options short and parallel; the correct option must NOT be the longest option (check this for every question — test.js enforces it). No reasoning inside option text.
- Every option has a `why`: for the correct one, why it is right; for each wrong one, what error choosing it reveals.
- Stems ask about the subject in the professor's own formats (mirror his polls/in-class questions). Never "according to the slide/lecture/Dr. X". No reference to the deck in the stem.
- Every number, name and claim in stem, options, why, teach must be on the cited slide or in the transcript. If you cannot point at it, do not write it. No outside knowledge filling gaps; if the textbook-level fact is needed and not in the sources, leave it out.
- Expand each abbreviation once per question (e.g. "G protein–coupled receptor (GPCR)").
- Literal language only: no metaphors, similes, study advice, or sentences about the drill itself.
- Curves/figures: there are no images in this drill, so a `figure` question must describe the curve in words in the stem (e.g., "Drug B's curve is shifted right of Drug A's with the same maximum").
- Use straight quotes escaped properly or typographic quotes; avoid backticks and `${` anywhere.
- IDs: `L01-001` … sequential. `concept` groups different wordings of one idea.

When done, run `node --check` on your q file (define nothing else; it will be concatenated after `const TOPICS=[], QUESTIONS=[]`). Quick self-test:
`node -e "global.TOPICS=[];global.QUESTIONS=[];eval(require('fs').readFileSync('FILE','utf8'));console.log(QUESTIONS.length)"`
Also check for each question: exactly one correct unless multi; correct option not strictly the longest (by character count) — fix by rewording options.

Return: count of questions, count per skill, any slides you could not read, and conflicts found. Do not commit or push.
