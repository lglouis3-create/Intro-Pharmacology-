# Bank review, second pass (read-only; write findings to notes/review/<file>.json and reply with a 5-line summary)

Follow notes/REVIEW_BRIEF.md exactly, for the files named in your prompt. These files were added or regenerated after the first review. Additional checks for this pass:
- Stem gives away the mechanism of a drug-list drug (notes/STEM_TASK.md rule: a stem may name a drug-list drug, a receptor, a tissue and a figure; it may not state its class, mechanism, reversibility or location when the options turn on it). Drugs NOT on the list may keep a short mechanism statement.
- Course meta-questions (what will be tested, how many questions, must-know vs should-know) → remove.
- Generated items (q_DL1.js from gen_druglist.py, q_TERMS.js from gen_terms.py): report the pattern and the generator line to change, not every instance.
- For q_JEOP.js: the keys must match notes/L06.md's Jeopardy table (J1–J18); quote both if they differ.
