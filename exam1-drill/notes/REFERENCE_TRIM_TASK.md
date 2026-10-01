# Reference trim: keep only the "why" that adds something

Edit only `/home/user/Intro-Pharmacology-/exam1-drill/src/reference.js`.

The learner's verdict on the current page: the "Why / his words" column often adds nothing (a quote that restates the row, a slide-number cite, a sentence about naming). Go row by row through every table:
- Keep a "Why" cell only when it states a reason, a rule or a consequence the other cells do not already state (the mechanism, the trap, what changes on the curve, the number that decides). Rename the column header to "Why" everywhere.
- Delete quotes that merely repeat the row in his voice. Keep a quote only when its wording is the thing to remember (for example "an antagonist will up regulate, an agonist is going to down regulate because our body is going to do the opposite"; "if you see a figure in your exam that the shifts are not symmetric, you already know it's allosteric"; "the diphosphate comes off, the triphosphate comes in"). A kept quote is one sentence, no "(T 9/28)" tag inside the cell; the section's source line underneath carries the cites.
- If a whole table ends up with an empty Why column, drop the column.
- Cells with two or more points stay as `<ul><li>` bullets; a cell with one point is a sentence.
- Keep every figure marker and the section order. Keep the one-line "What you are looking up" subtitle but shorten any that run past one line. No sentence about the page itself anywhere else. No backticks, no `${`.

Check: `cd /home/user/Intro-Pharmacology-/exam1-drill/src && node --check reference.js && python3 build.py`. Report: per section, rows kept with a Why, rows whose Why was dropped, tables whose column was dropped. Do not commit; touch no other file.
