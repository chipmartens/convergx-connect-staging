# fig-5-record-persists

Built from `_reference/FIGURE-SYSTEM.md` section 2, the figure titled **The record persists**.
File is named `fig-5` because it is the fifth of the six figures in that section. **In the site-wide
append-only numbering it is Fig. 8.** The caption ships as "Fig. 8." Do not renumber it to 5.

## The one sentence the reader must be able to say

The parties move on. The record of the introduction stays, and it is mine to defend a decision with.

## Strings, character for character

**Caption:**

```
Fig. 8. The parties part ways. The record of the introduction stays, and it is yours.
```

**aria-label** (already on the `<svg>`):

```
Diagram: two dashed paths meet at a dot, separate again, and end a short way later. From the meeting point a single solid line continues to the edge of the frame, labelled the record.
```

**Inner labels:** `The introduction`, `The parties`, `The record`. Sentence case in the DOM, CSS
uppercases. No fourth label.

## Facts

| | |
|---|---|
| viewBox | `0 0 1600 700`, with `width="1600" height="700"` |
| preserveAspectRatio | `xMidYMid meet` |
| Classes used | `fig-solid` (1), `fig-dash` (4), `fig-dot` (1), `fig-label` (3) |
| Dot | one, r 6, at (600, 350), on the node where all four dashed paths and the solid line meet |
| Size | 1.9 KB |
| Accent | none. Monochrome, `currentColor` from the surface, works on dark, light and muted |

## For the integration agent

1. **Inline it, never `<img src>`.** As an `<img>` the classes cannot reach the styles.css rules,
   so it renders black on black and the reveal never runs. Paste the `<svg>` element into the page.
   The `xmlns` attribute is harmless once inlined and can stay.
2. Wrap exactly as section 1.7 of the spec:

```html
<figure class="fig" data-fig>
  <!-- svg here -->
  <figcaption>Fig. 8. The parties part ways. The record of the introduction stays, and it is yours.</figcaption>
</figure>
```

3. **Placement:** `platform/trust-and-security/index.html`, section `03 / The record`, inside
   `.editorial`, after the `.claim` div. Use `grid-column: main`. **Not `bleed`.** Checked on
   2026-07-27: that page has no figure and no image, so its one grid break is unspent, but the
   spec assigns `bleed` only to Fig. 6 and this figure is not it.
4. **The page needs the script line added**, after the existing shell.js line:
   `<script src="/_system/figures.js" defer></script>`
5. **Dependencies I did not create and must not create** (spec assigns them to the styles.css
   owner): `--fig-dash`, `--fig-t`, `--fig-t-fade` in `tokens.css`; section 20 in `styles.css`;
   `_system/figures.js`. Verified 2026-07-27: none of the three existed yet. If they are still
   missing at integration, the figure renders as an unstyled black plate. **No new CSS rule and no
   new JS hook is required by this figure beyond what the spec already specifies.**
6. `--rule-hair` and `--fg-hi` both exist in `tokens.css` already, so the stroke weights and the
   ink resolve with no further work.

## Two collisions reported, not resolved (spec rule 14)

1. **`width`/`height` attributes.** The build brief for this figure says "no width/height
   attributes". The figure spec rule 7 requires them on every figure, and section 3.2 depends on
   them for its zero-layout-shift guarantee. I followed the spec, which the brief itself declares
   law, and set `preserveAspectRatio` deliberately as the brief asked. If the brief is meant to
   win, the two attributes come off and the CLS line in section 3.2 needs a different answer.
2. **The figure number.** The deliverable filename says 5, the spec's append-only site numbering
   says 8. I used 5 in the filename and 8 in the caption. Flagging in case the other five agents
   resolved it the other way, because the six captions must agree with each other.

## Honesty check on this figure

- Nothing here verifies, checks, catches or watches. Two parties arrive, an introduction happens,
  they part, the record continues.
- No count, no rate, no outcome. Two paths in and two out is the shape of one introduction, not a
  volume.
- The record drawn is the record that exists today: the requirement, the consent, the introduction.
  Nothing in the geometry, the labels or the caption suggests the written reason for a decision is
  on it, because that is in build.
- No arrowheads. The parties cross at the node and continue; direction is not claimed.
