> Updated 10/10: the motion engine is now the Web Animations API with FLIP; see notes/ENGINE_UPGRADES.md item 3 for timings, staging (`data-o`) and the HTML step text. The authoring rules below (one process per figure, `data-k` keys, colours via CSS variables) still apply; the CSS durations mentioned below are superseded.

# Step-through figures: the pattern

Reference: `notes/ref/rtk_activation_stepper.html` and its notes. The drill applies the same pattern to every step-through figure through one engine, so each figure only supplies its steps.

## Authoring a figure (diagrams.js)
- Call `stepper(key, title, steps, h, cap, footer)`. Each step is `[text, svgMarkup, slideTitle]`.
  - `slideTitle`: the professor's slide wording for the step, word for word.
  - `text`: what happens in that step, in plain words.
  - `svgMarkup`: the whole picture at the end of the step (the step's resting state).
- Give every shape that should move or persist a `data-k` key that is the same in every step (see `F['rtk-anim']`). Shapes without a key are matched by tag + text + class, in order.
- The caption names the deck and slide numbers.

## What the engine does (app.js `stepTo`, shell.html CSS)
- A keyed shape present in both steps glides from its old position to its new one (`transform .9s`).
- A shape that is new fades in (`.5s`); a shape that is gone fades out from where it was.
- Only end positions are set in script; CSS does the motion. `prefers-reduced-motion: reduce` turns it off.
- Controls under every stepper: Back and Next (both wrap around), Replay step, Play all / Pause (3.2 s per step, stops at the last), and one dot per step. All are buttons, so they take keyboard focus.

## Converting another process diagram
1. List the steps from the source slide.
2. Draw the resting state of each step with the same `data-k` on the parts that move.
3. Pass them to `stepper`; the controls and motion come with it.
