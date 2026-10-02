# Notes for Claude Code: RTK activation stepper

## What this is

`rtk_activation_stepper.html` is a step-through animation of receptor tyrosine
kinase (RTK) activation for the PHAR 4344 Intro to Pharmacology drill (Exam 1,
pharmacodynamics). It was built in a claude.ai chat and exported here.

- Step titles are the professor's wording from the "RTKs Activation" slide,
  Pharmacodynamics Day 2 (Gottlieb). Keep them word for word.
- The slide has 5 steps. Step 5 (tyrosine phosphatase) animates the phosphates
  coming off and then the dimer separating, because the slide's figure shows
  the reset.
- Textbook backup: Chapter 2, Figure 2–7 (EGF receptor, monomer to dimer).

## Styles that were borrowed from the chat window (now defined in the file)

In the chat, the widget used styles the claude.ai page supplied. This export
defines all of them itself, in the `<style>` block at the top:

| What | Where it is now |
|---|---|
| Text and surface colors (`--text-primary`, `--text-secondary`, `--text-accent`, `--border`, `--border-strong`, `--surface-1`, `--surface-2`, `--radius`) | `:root`, with a dark-mode block |
| Color classes `c-blue`, `c-purple`, `c-green`, `c-red`, `c-teal`, `c-amber` (fill, stroke, and text color for each shape group) | `.rtk .c-*` rules, light and dark |
| SVG text classes `t`, `ts`, `th` and arrow class `arr` | `.rtk .t` etc. |
| Button look (outline, hover, press) | `.rtk button` |
| Icons (`ti ti-arrow-left` etc.) | Tabler icons webfont, linked from jsdelivr in `<head>` |
| Screen-reader heading | `.rtk .sr-only` |

When embedding in the drill:

1. Map the `:root` variables to the drill engine's own CSS variables instead
   of adding a second set. Read the engine's stylesheet first.
2. If the drill already loads an icon font, drop the Tabler `<link>` or swap the
   icon classes.
3. Everything is already scoped so it won't collide with the drill: every rule
   sits under `.rtk`, every element id starts with `rtk-`, the arrow marker is
   `rtk-arrow`, and the script runs inside an IIFE with `addEventListener`
   (no inline `onclick`, no globals).
4. The file has no backticks and no `${`, so its markup can sit inside the
   drill's template-string content files (`guide.js`, `reference.js`) if that is
   where it belongs. Check how the engine renders figures before choosing
   (`diagrams.js` is currently a stub; a standalone page linked from the
   pharmacodynamics guide may be simpler).

## The pattern, for improving the drill's other animations

The user wants this pattern applied to the drill's other animations. Most
play-once animations can be converted to it.

1. **Steps array.** One entry per step: `{title, text}`. Titles use the
   professor's slide wording; the text explains the step plainly.
2. **Frames.** Each step is a list of frames. A frame is a small state object
   (here: ligand shown, dimerized, phosphates, cascade, phosphatase) plus a
   `wait` in ms. The last frame is the step's resting state.
3. **One `draw(state)` function** that maps the state object onto the SVG
   (transforms for movement, opacity for appear/disappear). Nothing else
   touches the DOM.
4. **CSS transitions do the motion** (`transform .9s`, `opacity .5s`); the
   script only sets end values. Transitions are turned off under
   `prefers-reduced-motion: reduce`.
5. **`show(i, animate)`** clears pending timers, updates the caption and dots,
   then either plays the step's frames or jumps to its last frame.
6. **Controls:** Back, Next (both wrap around), Replay step, Play all /
   Pause (auto-advance every 3.2 s, stops at the last step), and dot buttons
   to jump to any step. All keyboard-focusable with visible focus.

To convert another animation: list its steps from the source slide, decide
which few properties change between steps, write the frames, and reuse
`draw` / `show` / the controls unchanged. Keep the drill's content rules:
slide wording for titles, a source line naming the deck and slide, no
metaphors, nothing that can't be pointed at on a slide or in a transcript.
