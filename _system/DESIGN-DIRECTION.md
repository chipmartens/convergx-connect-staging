# DESIGN-DIRECTION: ConvergX Connect

*Written 2026-07-27, alongside the first build of `tokens.css`, `styles.css`, `shell.js` and
`pages/_reference.html`. Approve or redirect on `pages/_reference.html`; this file records why it
looks the way it does. Preview: any static server from the `Website/` folder (for example
`python3 -m http.server`), then open `/pages/_reference.html`. The shell uses site-root
absolute links, so open it over http, not as a bare file.*

---

## The read

A two-sided marketplace launch site for defence and aerospace procurement leads, in a
technical-brutalist / industrial-spec-sheet language, built on the client's own
hairline-and-inline logo logic, dark-ground with authored light inversions.

Dials: DESIGN_VARIANCE 8, MOTION_INTENSITY 1, VISUAL_DENSITY 6 split by zone (3 in display
zones, 8 in the module index and spec metadata, 5 in body pages). The reasoning for each is in
`DESIGN-CONSTRAINTS.md` section 1 and is not repeated here.

The one-line system: **dots carry the atmosphere, lines carry the structure.** The dot matrix
(with its gradient fade) is the primary texture, per Chip's correction of 2026-07-27. The line
system, hairline plus the inline gap, is taken from the logo's own construction: rules divide,
everything interactive is outlined, and fills are rationed so hard that a solid panel means
something.

## What was chosen, and why

- **Three surfaces, one family.** `dark` (the brand at full voice), `light` (pure white, for
  reading and the module index), `muted` (warm greige, for forms). The muted ground is the same
  greige family as the dark ground's text colour, which is the single relationship that makes
  three surfaces read as one system. Semantic tokens (`--bg`, `--fg`, `--block`, `--rule-ink`,
  `--rule-ink-load`, `--link`, `--logo-ink`, `--dot-ink`) are redeclared per surface scope, so
  every component works on all three with no variant class. A component that only works on the
  dark ground is a defect.
- **Warm greige, never cool grey.** `#A89B91` on `#0A0A0A` is 7.32:1 and clears AAA. The full
  verified contrast table is in `DESIGN-CONSTRAINTS.md` 6.1 and 6.2, and reproduced as live
  content in the reference page's data table, so the table is its own receipt.
- **Orange, not red, and two orange tokens.** `--accent #F2560F` for the dark ground, fills and
  large display; `--accent-text #B93A0C` for small text and links on light surfaces, where the
  bright accent fails AA (3.44:1 on white). Type on a solid orange panel is near-black, never
  light (2.99:1, fails), which is also the actual industrial convention.
- **Orange rationing, checkable.** At most one solid orange fill per page (panel or button,
  never both) and at most two orange rules or edges. On the reference page: the fill is the
  hero CTA; the rules are the hero dot-field edge and the live-modules block edge.
- **Status tags as spec annotations.** Mono, 11px, wide-tracked, uppercase via CSS only, a
  hairline underline, no fill, no colour coding, no icon, no date. All four states are the same
  tone; the September three are separated by grouping (their own block with the accent edge),
  not by a tag variant.
- **Micro-labels at edges, zero eyebrows.** No `.label` is ever the immediate previous sibling
  of a heading. Edge-pushed labels cancel their own trailing letter-space
  (`.label--edge`) so they align with the rules they belong to.
- **The Home mechanism.** 8/4 demand hero (never 6/6), four text elements maximum, one
  `--step-6` per page, the 4-column side carrying texture and the category definition, never a
  second audience. The supply side gets a full-bleed muted band after the hero, under 22vh,
  with the outlined CTA. Three CTA labels site-wide, no synonyms: Request access, Apply to
  join, and the two locked nav doors (Find capability / Get discovered, sentence case).
- **Focus is yellow with a near-black bar** (GOV.UK pattern), deliberately not the brand
  colour: brand, status and focus never share a channel. The bar is the only `box-shadow` in
  the project; it carries the indicator on light surfaces.
- **Motion budget:** three transitioned properties, 120ms, linear, one
  `prefers-reduced-motion` block. Nothing else moves. The page has to be distinctive in a
  screenshot on a dead conference network.
- **The shell.** `shell.js` injects nav and footer from one definition so fifteen pages cannot
  drift, inlines the logo SVG once as reusable defs, and marks the current page with the
  inline device. The mobile nav is a native `details`/`summary` disclosure: no JS menu
  behaviour exists, and every page carries a `noscript` link list so the site stays navigable
  if the script never runs.

## Type: what happened mid-build

The type system changed while this was being built. The logo-doc addendum had locked Space
Grotesk (display) + Roboto (body) + Space Mono (micro), and those faces were on disk. During
the build, a parallel work session replaced them in `tokens.css` with **Manrope for display and
body (400/500/600/700, self-hosted, 96KB)** and the **system monospace stack for the spec
voice**, recorded in `tokens.css` as Chip's pick from a six-way bakeoff
(`_reference/font-bakeoff.html`). The old woff2 files were removed from `assets/fonts/`.

This build follows the bakeoff decision (Chip-stated beats every document). Two things to keep
eyes on:

1. `research-01` A2 lists Manrope on the AI-tell list. The defence is the same discrimination
   rule the constraints applied to Space Grotesk: it is not the page's only type decision. The
   system is the contrast between tight-tracked heavy display, plain regular body, and
   wide-tracked mono spec voice. If the mono layer ever disappears, the tell returns.
2. The system mono stack renders differently per platform (SF Mono on Apple, Consolas on
   Windows, whatever Android ships). Label tracking was set at 0.18em against SF Mono; spot
   check a Windows machine and a mid-range Android before freeze.

## What was deliberately rejected

- **Uncommon's attitude.** The grammar transferred; the takeover swagger did not. No conquest
  language anywhere, no aggression framing, no martial iconography.
- **The symmetric two-sided hero.** Mirrored audience cards and equal-weight CTAs make both
  sides feel the site is for someone else. Layout expresses the business asymmetry.
- **Colour-coded status pills.** A coloured pill says warning; a spec annotation says build
  state. This is the strongest argument for the whole direction and it was not diluted.
- **Icon libraries, hand-rolled icons, fabricated ornament.** The system is typographic. Every
  technical annotation is a real value or the literal string `[[PLACEHOLDER: what, who
  clears]]`. No invented part numbers, no decorative barcodes.
- **Every motion pattern on the slop list.** No load-in cascades, no scroll triggers, no
  hover lift. State change is rule tone and fill inversion.
- **`prefers-color-scheme`.** The surface is an authored per-page decision, not a user
  preference. The site ships both grounds by design.
- **Cool grey, pure black, second accents, radius, shadows** (except the focus bar). The
  banned list in `DESIGN-CONSTRAINTS.md` section 2 was run mechanically against the build;
  the composite scan returns zero unjustified hits.

## The brand-unknown problem, and how it is handled

ConvergX's real brand (Lindsay Robertson's files) has not arrived. Every colour and face in
`tokens.css` is marked PLACEHOLDER, and no file outside `tokens.css` contains a raw hex value
or font name, so the swap is one file. The logo, which cannot change, is real and drives the
system:

- One SVG, zero fill attributes, recoloured by `fill: currentColor` per surface. Never `<img>`.
- The hairline mark renders in the surface's `--logo-ink` (brighter than body text): the eye
  resolves the gap between two thin strokes, so the mark needs more contrast than copy.
- **Minimum sizes, enforced in CSS:** 200px lockup (below it the tagline stops being type),
  150px wordmark (below it the inline strokes close up). Mobile nav drops the tagline.
- **Clear space:** 12.5% of rendered width on every side (the cap height of the wordmark).
- **No icon-only mark exists.** Favicon and app icon are Kim's decision; the X-crop
  recommendation and its reasoning are in `DESIGN-REFERENCE-logo.md`. Nothing was shipped.

## Reference-page exceptions (specimen only, not licences for launch pages)

`pages/_reference.html` is the approval artifact and deliberately breaks four per-page rules
that every launch page must hold:

1. **Two surface changes** instead of one: the specimen must prove all three surfaces with the
   same components (the parity strip repeats identically on dark, light and muted).
2. **The solid orange panel (`.block--accent`) is specified but not rendered:** the page's one
   fill was spent on the hero CTA, exactly as Home will spend it.
3. **`.rule-vanish` is not rendered.** It appears once on the whole site, on `/about/`, beside
   the tagline. The specimen describes it instead of spending it.
4. **The sitemap's "AI Matching Engine" is rendered as "Matching Engine".** The client copy
   ban (`AI-match`) and the module name collide; the tag ("In development") plus a
   capability-neutral description keeps the claim honest. If Kim wants the AI name, that is a
   copy decision to take deliberately, not a default.

Also noted: the hero headline sets in three lines, not two. At `--step-6` inside an 8-column
measure, the 42-character core message cannot make two lines at any honest size; the Uncommon
reference explicitly allows two or three. Three is the decision.

## The three things to change first when real assets arrive

1. **Re-derive the palette in `tokens.css` and re-run the contrast script.** The warm ramp and
   both accent tokens are the placeholder decisions most likely to move. Every ratio in
   `DESIGN-CONSTRAINTS.md` 6.1/6.2 and the reference page's table must be recomputed and the
   two hardware checks (hairline presence, `#0A0A0A` vs `#141210` separation) redone.
2. **Reconcile type.** Confirm Manrope survives contact with the real brand guidelines, or swap
   the `@font-face` block and the two `--font-*` tokens. Nothing outside `tokens.css` changes.
3. **Close the logo derivatives with Kim.** Favicon, app icon, social avatar: the sub-32px
   simplified variant is a logo change and needs her sign-off. Until then the site ships no
   icon mark anywhere.

Blocked and visible, not silently filled: brand assets (Lindsay), public name confirmation
(Kim), the commercial model for `/access/` content (Kim and Cam), photography (slots are
marked with dimensions and art direction in comments), and every `[[NEEDS: ...]]` proof
obligation.

---

## eval-critic review

*Fresh-eyes review 2026-07-27 against `DESIGN-REFERENCE-uncommon.md` (direction),
`DESIGN-CONSTRAINTS.md` (grading sheet) and `research-01-slop-signature.md` (slop checklist).
Files judged: `tokens.css`, `styles.css`, `shell.js`, `pages/_reference.html`, `assets/fonts/*`,
`assets/brand/convergx-logo-black-tag.svg`. Nothing was fixed; this is the fix list.*

### VERDICT: FAIL. 5 blockers, 6 majors.

The palette, the dot system and the status tags are genuinely designed and should not be touched.
The layout drifted to a safe default, three interactive states are broken or invisible, the font
system ships one file four times, and the handoff claims a mechanical scan that does not pass as
documented.

---

### 1. Slop audit, run against the real files

Every grep in `research-01` §I and `DESIGN-CONSTRAINTS` §2 and §7.1, plus the dark-theme variant
in §B. Scoped to `--include='*.html' --include='*.css' --include='*.js'` from `Website/`.

**Clean, zero hits, confirmed by running it:**

| Check | Result |
|---|---|
| Framework palette values (`#3b82f6`, `#6366f1`, `#8b5cf6`, `#0f172a`, `#121212`, tailwind class names) | 0 |
| `border-radius` non-zero | 0 |
| `box-shadow` / `text-shadow` | 1, the `:focus-visible` bar at `styles.css:768`. Exactly as permitted |
| `backdrop-filter`, `blur()`, glassmorphism | 0 |
| `rgba(255,255,255,.0x)` white-alpha hairlines | 0 |
| `#fff` / `#ffffff` | 1, the `--paper` declaration at `tokens.css:54`. Exactly as permitted |
| Motion libraries (`data-aos`, `framer-motion`, `gsap`, `IntersectionObserver`) | 0 |
| `fade-up`, `translateY(20/30/40px)`, `transition: all`, `ease-in-out`, `cubic-bezier(.4,0,.2,1)` | 0 |
| `:hover` touching `transform` / `box-shadow` / `border-radius` / `opacity` | 0 |
| `transition` declarations in `styles.css` (ceiling 3) | 2 |
| `prefers-reduced-motion` block | 1, `styles.css:778` |
| `outline: none` / `outline: 0` | 0 |
| `grid-cols-3`, `repeat(3,`, pricing-tier naming | 0 |
| Icon libraries, hand-rolled SVG icons, emoji | 0 |
| `font-variation-settings` / `font-stretch` / `font-variant-caps` | 0 |
| `px` font sizes | 0 |
| Client never-list (`mode40`, `ACE`, `WaVv`, `Boeing`, `95%`, `80%`, `25 years`, `coming soon`, `event app`, `all-in-one`, `end-to-end`, `simply`, `just`, `easily`, `AI-match`) in `_system/` and `pages/` | 0 |
| AI copy tells (`seamless`, `robust`, `leverage`, `it's not X it's Y`, `serves as a`, `may help`, tricolon) | 0 |
| `node_modules`, `package.json`, lockfiles | 0 |
| Em dash / en dash in `_system/` and `pages/` | 0 |

**Dark-theme slop variant, `research-01` §B1, checked item by item:**

| Tell | Status |
|---|---|
| B1.1 pure `#000000` ground | Clean. `#0A0A0A` |
| B1.2 pure `#ffffff` body text on dark | Clean. `--ink` is `#A89B91` |
| B1.3 cool grey neutrals | Clean. The ramp is warm throughout, no `slate`/`zinc`/`gray` value anywhere |
| B1.4 coloured glow, coloured box-shadow | Clean |
| B1.5 shadows for elevation | Clean. Elevation is a lightness step, `--ground` to `--panel` |
| B1.6 medium grey body barely clearing AA | Clean. `--ink-lo` (5.07:1) is fenced to de-emphasis and used only on captions, helper text, `th`, footer labels |
| B1.7 permanent dark with no light counterpart | Clean. Three authored surfaces, no `prefers-color-scheme` |
| B1.8 fully saturated accent on dark | Present by design, argued in §6.1 and defensible |
| **B1.9 interactive states left broken on the dark ground** | **HIT. See blockers 1, 2 and 4.** This is the single tell `research-01` §B2.7 predicted this build would fail on, and it did |
| B1.10 `#121212` unexamined | Clean |

**Actual hits, with line numbers:**

| # | File and line | Hit |
|---|---|---|
| S1 | `_reference/font-bakeoff.html:6,7,8` | Live `https://fonts.googleapis.com` and `fonts.gstatic.com` requests. §2.3 and §7.1 make this a zero-hit hard check with no `_reference/` exclusion written anywhere |
| S2 | `_reference/font-bakeoff.html:41,63,86` | `Inter`, the strongest single typographic tell on the list |
| S3 | `_reference/font-bakeoff.html:3,54,62,70,78,86,94` | 7 em dashes, against a rule stated as "zero hits anywhere" |
| S4 | `_reference/font-bakeoff.html:11,12` | Raw hex outside `tokens.css` (`#0B0B0C`, `#A89B91`, `#EFEDEA`, `#EE5116`, `#3A3632`) |
| S5 | `assets/brand/_preview.html:1` | Raw hex `#f0efed` inline |

S1 to S5 are all in scratch artifacts, not the shipped path. That is a scoping problem, not a
design one, and it is fixable in one line, but as written the documented pre-flight command fails
on a build the handoff says passes. See major 6.

---

### 2b. Logo integration

| Question | Answer |
|---|---|
| Real SVG used? | **Yes.** The literal at `shell.js:70` is byte-for-byte the artwork in `assets/brand/convergx-logo-black-tag.svg`: 36 `<path>`, 6 `<rect>`, 1 `<polygon>` in both |
| Recoloured via `currentColor`, not duplicated per surface? | **Yes, correct.** Zero `fill` attributes in the source, `.logo svg { fill: currentColor }` at `styles.css:295`, `--logo-ink` redeclared per surface at `tokens.css:147,159,171`. One asset, three grounds, no variant. Rendered in `--ink-hi` not `--ink` per §3.7, which is the right counter-intuitive call |
| Never `<img>`? | Correct, inline `<use>` throughout |
| Texture is LINES, not a lifted dot matrix? | **Both, and split correctly.** The line system (`styles.css:150-174`) is derived from the logo's own hairline-and-inline construction: `.rule`, `.rule--load`, `.rule-double` (the inline gap, `--rule-gap: 4px`, tuned against the logo), `.rule-vanish` rationed to one site-wide instance. Outlined is the default for `.btn`, `.block`, `.tag`, inputs. The dot matrix carries atmosphere only and never structure. This is the part of the build that is most clearly ConvergX's own system rather than a copy of the reference |
| Display face avoids competing with the logo's inline construction? | **Yes.** Manrope is semi-geometric, echoing the circular C and O without repeating the inline device. Sentence case on every heading (`styles.css:69`), so caps stay the logo's alone. Verified: all `<h1>`/`<h2>` are sentence case |
| Documented minimum size? | **Documented and enforced in CSS.** `--logo-min-lockup: 200px`, `--logo-min-mark: 150px` at `tokens.css:126-127`, enforced as `clamp()` floors at `styles.css:296-297`, lockup dropped below 40rem at `:370`. Reasoning recorded |
| Documented clear space? | **Documented, NOT enforced.** `.logo-clear { padding: 12.5% }` at `styles.css:299` exists and is applied to nothing in the entire tree. `shell.js` wraps neither logo in it; the specimens at `_reference.html:143-154` use `.logo-floor` padding instead. Stated in three docs, live in zero files. See minor 3 |

One benign deviation to record: §3.7 specifies two defs (`#cx-wordmark`, `#cx-tagline`) with the
mark composed from the wordmark alone. The build uses one def (`#cx-logo`) cropped by viewBox
`14 13 268 43`. Simpler, and it renders correctly, but the "mark" ships all 36 paths clipped
rather than referencing a subset. Fine to keep; just do not let §3.7 keep describing something
the code does not do.

---

### 2. Did it execute the direction, or drift to a safe default?

Scored device by device against `DESIGN-REFERENCE-uncommon.md`.

| Device the reference specifies | Executed? |
|---|---|
| **Warm taupe, never cool grey** | **Yes, fully.** `#A89B91` on `#0A0A0A`, a five-stop warm ramp, zero cool values in the tree. This is the load-bearing choice and it landed |
| **ONE saturated accent, used structurally** | **Partial.** The rationing rule is real and mostly held (1 fill, 2 rules on the reference page), but it counts only fills and rules. In render the page also carries 4 orange dashed `.ph` boxes and orange text on every link on the dark surface. That is accent-as-ambient, the exact `research-01` §B2.3 discriminator. See major 2 |
| **Dot matrix** | **Yes, and this is the best-executed part of the build.** Four densities (7/13/29px tiles plus a 17px stagger), five fade directions, `--dot-ink` per surface including white-on-greige. Every field on the reference page has an edge, a named density and a page partner at a different density, satisfying the §G1 discrimination rule that separates this from the Vercel background. Alpha stops written `rgb(0 0 0 / 1)` at `styles.css:203-222` specifically so the `#fff`/`#000` grep stays clean. Non-obvious and deliberate |
| **Wide-letterspaced micro-labels at layout edges** | **Partial.** The typography is exactly right (mono, 11px fixed, 0.18em, uppercase via CSS only, sentence case in the DOM, `.label--edge` cancelling the trailing letter-space). But placement collapsed to one position repeated 13 times: a right-aligned `NN / Word` inside `.sec-head`. The reference's device is coordinates around the page perimeter, "PERFORMANCE" top left, "PRECISION" top right, "SEE THE EDGE" across the bottom. The eyebrow ban is satisfied on DOM order while the labels sit on the same baseline as their `h2` and read visually as paired eyebrows, just right-aligned |
| **Large tight display type** | **Yes.** `--step-6` clamps to 6.31rem, `--track-display: -0.018em`, `line-height: 1.02`, `max-width: 20ch` forcing the break. Exactly one instance on the page. Correct |
| **Asymmetric layout, content at coordinates, load-bearing negative space** | **No. This is where it drifted.** One asymmetric moment (the 8/4 hero) then ten repetitions of a 5+5 symmetric split. See major 1 and question 6 |

**Answer: it is not a generic dark theme with an orange accent.** The warm ramp, the outlined-first
component system, the rationing logic and the dot grammar are real design decisions that a
templated build does not make. But it is not variance 8 either. It is roughly variance 4 in the
layout wearing a variance 8 label, and the constraints doc argued at length (§1) that variance 4
is precisely the failure mode for this audience.

---

### 3. Token discipline

**Clean where it counts.** Zero raw hex, zero `rgb()`/`hsl()` colour values, zero `font-family`
string literals outside `tokens.css` anywhere in `_system/` or `pages/`. The only `rgb()` in
`styles.css` is `rgb(0 0 0 / 1)` at lines 205-222, which are `mask-image` alpha stops, not colour,
and are written that way on purpose. The one-file re-skin genuinely works for colour and type.

Two notes:

- `styles.css:198` hardcodes `background-size: 17px 17px` and `background-position: 0 0, 9px 9px`
  for `.dots--stagger` while every other tile resolves through `--dot-fine/mid/open`. Small, but
  it is the one texture value that will not follow a token change. Add `--dot-stagger: 17px`.
- 22 inline `style=` attributes in `_reference.html`. All token-only, so discipline holds, but this
  is the artifact fifteen launch pages will be copied from and it is how raw values eventually
  get in. Move the recurring ones (`grid-column`, the `font-size` overrides) into classes.

---

### 4. Dependencies

**PASS on the shipped path.** No `package.json`, no lockfile, no `node_modules`, no `@import`,
no CDN, no icon library, no framework. Fonts self-hosted at `assets/fonts/`, path resolves
correctly relative to `tokens.css`. `shell.js` is vanilla with `"use strict"` and no imports.
Verified live over a local static server: `_reference.html`, `tokens.css`, `styles.css`,
`shell.js` and the woff2 all return 200.

**One hit, out of the shipped path:** `_reference/font-bakeoff.html:8` holds a live Google Fonts
request pulling six families including Inter. It is a scratch artifact and the decision it
supported is already made, so delete the link or the file. Leaving a third-party font request in
the delivered tree on a government-buyer site is not worth the zero effort it takes to remove.

---

### 5. Accessibility, with the numbers

All ratios computed locally against WCAG 2.1 relative luminance from the actual token values in
`tokens.css`, not copied from the docs.

**Body text, all pass:**

| Pair | Ratio |
|---|---|
| `--ink` on `--ground` (dark body) | **7.32:1** clears AAA |
| `--ink` on `--panel` (body in blocks and inputs) | **6.91:1** |
| `--ink-900` on `--paper` (light body) | **18.69:1** |
| `--ink-900` on `--warm-100` (muted body) | **15.07:1** |

**Micro-labels and status tags, 11px, so the 4.5 floor applies. All pass:**

| Pair | Ratio |
|---|---|
| `.label` / `.tag` `--fg` on dark | **7.32:1** |
| `.label--lo` `--fg-lo` on dark (footer columns, all 13 section refs) | **5.07:1** |
| `.label--lo` `--fg-lo` on dark panel | **4.79:1** thin margin |
| `.label` / `.tag` on light | **18.69:1** |
| `.label--lo` (`--warm-600`) on light | **6.55:1** |
| `.label` / `.tag` on muted | **15.07:1** |
| `.label--lo` (`--warm-600`) on muted | **5.29:1** |
| `th`, `figcaption`, `.helper`, `.attribution`, `.claim-proof` (`--fg-lo`) on dark | **5.07:1** |

**Status tag underline and UI boundaries, 3:1 floor:**

| Pair | Ratio |
|---|---|
| `--rule-ink-load` (`--warm-600`) on dark | **3.02:1** pass, on the floor |
| `--rule-ink-load` (`--warm-500`) on light | **3.90:1** pass |
| `--rule-ink-load` (`--warm-500`) on muted | **3.15:1** pass, thin |
| `--rule-ink` (`--warm-700`) decorative on dark | **2.01:1** decorative only, but see major 4 |
| `--rule-ink` (`--warm-300`) decorative on light | **1.54:1** see major 4 |

**Accent:**

| Pair | Ratio |
|---|---|
| `--accent` on dark ground | **5.76:1** pass |
| `--accent` on paper | **3.44:1** fails for text, fills and large only. Correctly fenced |
| `--accent` on muted | **2.77:1** fails everything. Not currently used there, but unguarded and the figure is absent from `tokens.css:61` |
| `--accent-text` on paper | **5.72:1** pass |
| `--accent-text` on muted | **4.61:1** pass |
| `--accent-ink` on `--accent` (solid button at rest) | **5.76:1** pass |
| **`--accent-ink` on `--accent-text` (`.btn--solid:hover`)** | **3.46:1 FAIL** blocker 1 |
| `--accent-ink` on `--ink-hi` (`.btn--solid:active`, dark) | 17.23:1 pass |
| **`--accent-ink` on `--ink-900` (`.btn--solid:active`, light and muted)** | **1.06:1 FAIL, invisible** blocker 2 |

**Focus:**

| Pair | Ratio |
|---|---|
| `--focus` on dark ground | **14.70:1** pass |
| **`--focus` on paper** | **1.35:1 FAIL** blocker 4 |
| **`--focus` on muted** | **1.09:1 FAIL** blocker 4 |
| `--focus-bar` on paper (the bar itself, bottom edge only) | 19.80:1 |
| `--focus-bar` on `--focus` (`.skip` link text) | 14.70:1 pass |

**Two stale numbers in the grading sheet, corrected here.** `DESIGN-CONSTRAINTS` §6.2 states
`#B93A0C` on `#EBE6E1` = 4.73:1; the real value is **4.61:1**, which `tokens.css:63` and the
reference table at `_reference.html:445` both get right. §6.2 also states `#8A7F76` on `#EBE6E1`
approx 3.23:1; real value **3.15:1**. Fix them at source so the grading sheet stops disagreeing
with the build it grades.

**Everything else on the floor:**

| Check | Result |
|---|---|
| Focus states visible | Present and never removed, but see blocker 4 for the light and muted grounds |
| Semantic HTML | Good. One `h1`, no level skips, `<nav>`/`<main>/<footer>` landmarks, `lang="en-CA"`, `role="img"` plus `aria-label` on every logo instance, `scope="col"` on table headers, `<caption>` present |
| Forms | Correct. Label above input every time, no placeholder-as-label anywhere, `.helper` in markup with `aria-describedby`, error text below the field, `aria-invalid`, `autocomplete` set, and the error carries the literal word "Error" so colour is never the only channel |
| Caps accessibility | Correct. Sentence case in the DOM and uppercase via CSS on every `.label`, `.tag`, `th` and `summary`. `aria-label` on each of the 12 status tags. No blanket `aria-label` on decorative labels |
| Keyboard navigable | Skip link first in the DOM at `_reference.html:60`, no JS menu behaviour, mobile nav is a native `<details>`/`<summary>` so nothing traps focus, current page marked with `aria-current="page"` and a rule rather than colour alone. Structurally sound. Not verified by an actual tab pass, and it should be |
| `prefers-reduced-motion` | Present, `styles.css:778` |
| Zoom to 200% / no `px` font sizes / no `maximum-scale` | Clean |
| **Page usable if `shell.js` fails** | **NO. Blocker 5** |

---

### 6. The two-sided mechanism

**The hero is right. The rest of the page is not.**

The hero genuinely executes: `.hero-head`, `.hero-title` and `.hero-cta` span 8 columns,
`.hero-aside` spans `col-start 9 / main-end` (4 columns) holding the dot field and the category
definition, terminated by a 2px `--accent` left edge, and carrying no second audience, no mirrored
CTA and no form. Four text elements exactly. One `--step-6`. `min-height: 85vh`. The supply band
sits after the hero at `--space-xl`, full-bleed on the muted surface with an outlined CTA while
the fill stays spent on the demand side. Three CTA labels site-wide with no synonyms. That is the
mechanism the sitemap called for and it is correct.

**Then the page defaults to a symmetric split for everything else.** In `styles.css:246-247`:

```
.lede  { grid-column: col-start 1 / span 5; }   /* columns 1 to 5  */
.body  { grid-column: col-start 8 / main-end; } /* columns 8 to 12 */
```

Columns 8 to 12 is **five columns**. Rendered, that is 5 + a 2-column gap + 5: a symmetric
two-column split. It appears in ten of the fifteen sections, each time behind an identical
`.sec-head`. `research-01` §D3 is explicit that symmetry is the default and therefore symmetry is
the tell, and §D2's applied test is that two adjacent sections which could swap contents with no
layout change means at least one was not designed. Sections 10 (Tables) and 11 (Wayfinding) are
structurally interchangeable. So are 04, 05, 07 and 08.

The team's own pre-flight (§7.2) requires "at least 4 different layout families across the page's
sections; no layout family repeats." The reference page runs one family ten times, and this is
not among the four exceptions declared above.

---

### 7. Status tags, tested hard

**The typographic treatment is right and should not be touched.** Twelve modules, four states,
`_reference.html:336-415`. Every tag is the same tone (`--fg`), mono, 11px fixed, `0.18em`,
uppercase via CSS with sentence case in the DOM, a hairline `--rule-ink-load` underline at
`--rule-gap` distance, no fill, no radius, no icon, no dot, no date, no fifth state invented.
Each carries `aria-label="Status: ..."`. The three September modules are separated by grouping
(their own `.modules--live` block with a 2px accent left edge, closed by a `.rule-double`) and not
by a tag variant, exactly as §5 requires. Read as annotations on an engineering document, not as
warnings. The direction's central claim survives contact with the build.

**But the container works against it.** `.modules` at `styles.css:492` is
`repeat(auto-fit, minmax(16rem, 1fr))`, which renders roughly four across at `--page-max`: a
4 by 3 grid of near-identical padded cells, each with a `border-top` and each ending in the same
wide-tracked uppercase tag. `grep 'class="[^"]*\bcard\b'` returns zero only because the class is
named `.module`; the shape is unchanged. `DESIGN-CONSTRAINTS` §1 specifies this zone at density 8
as "no card containers at all, hairlines separate data, tight row rhythm," and §5 cites Teenage
Engineering's products index, which is hairline-ruled **rows**, as the model.

A 12-cell uniform grid with a repeated status line at the foot of every cell is the shape in which
"a wall of disclaimers" actually materialises. Ship it as single-column hairline rows with subgrid
columns for name, description and tag, and the tags stop stacking into a wall and start reading as
a column of metadata on a spec sheet.

---

### 8. Does it look designed?

**Partially, and the split is clean enough to name.**

A working designer would read the top of this page as authored and the middle as filled in.
Authored: the warm ramp with a stated reason, the two-token accent split by ground, the dot system
with four densities and five fade directions each with a real edge, the rationing rule, the
outlined-first component vocabulary, the yellow focus deliberately off-brand on the GOV.UK
precedent, the status tags. Those are decisions with arguments attached and they are the reason
this is not a generic dark theme with an orange accent.

Filled in: ten sections of 5+5 split behind thirteen identical section headers, thirteen
right-aligned `NN / Word` labels where the reference put coordinates at four different edges, and
a 12-cell module grid. Add the broken hover, the invisible active state and the near-invisible
focus ring on the light ground, and the impression a designer forms is that the tokens were
designed and the page was assembled.

**What would have to change for this to read as fully designed:**

1. **Make the asymmetry real and make it vary.** 5+5 is not asymmetry. Give at least four distinct
   section geometries across the page and let one section's layout respond to its own content,
   which is `research-01` §H.13 and the team's own §3.6 grid-break rule.
2. **Put the micro-labels where the reference puts them.** One right-aligned section number
   repeated thirteen times is a pattern, not a device. Coordinates at the top-left, top-right and
   bottom edges of a section, carrying different kinds of real data, is what makes the spec-sheet
   language legible.
3. **Make the module index a ruled index, not a grid of cells.** Highest-leverage single change on
   the page.
4. **Finish the states.** Three of them are currently wrong on at least one surface, and an
   outlined-first system with no framework fallback lives or dies on exactly those.

---

### Fix list, severity ordered

**BLOCKERS. Do not put this in front of Kim until these are closed.**

1. **`.btn--solid:hover` fails AA on the primary CTA.** `styles.css:433` sets
   `background: var(--accent-text)` while `color` stays `var(--accent-ink)`:
   `#0A0A0A` on `#B93A0C` = **3.46:1**, against a 4.5 floor (the label is `--step--1`, roughly
   13.4px, so it is not large text even at weight 700). Every hover on the one CTA that matters is
   non-compliant. Cheapest correct fix: invert instead of darkening,
   `.btn--solid:hover { background: transparent; color: var(--accent); border-color: var(--accent); }`,
   which also matches the system's own "state change is rule tone and fill inversion" rule.
   Recompute and show the number.
2. **`.btn--solid:active` is invisible on light and muted.** `styles.css:434` sets
   `background: var(--fg-hi); color: var(--accent-ink)`. On those surfaces `--fg-hi` resolves to
   `--ink-900` (`#141210`) and `--accent-ink` is `#0A0A0A`: **1.06:1**. The pressed state of the
   primary CTA is near-black on near-black on two of three grounds. `.btn--solid` is the only
   component in the file that fails the system's own test at `tokens.css:137` ("a component that
   only works on one surface is a defect"). Use `var(--bg)` for the label, not `var(--accent-ink)`.
3. **The font system ships one variable font four times.** All four `assets/fonts/Manrope-*.woff2`
   are byte-identical (md5 `101877a7a906c31436104fe33740ae44`, 24,576 bytes each). The table
   directory contains `fvar`, `gvar`, `HVAR` and `STAT`: it is a variable font, not a static
   instance. Three consequences, all real:
   (a) `tokens.css:30-37` issues four requests for the same bytes, 98,304 B where 24,576 B would
   do. That is 72KB of pure waste on the conference-network constraint that the entire
   MOTION_INTENSITY 1 argument rests on (`DESIGN-CONSTRAINTS` §1, reason 2).
   (b) `DESIGN-CONSTRAINTS` §0 correction 3 is binding and states "the shipped faces are static
   instances, no variable axis." The shipped file has a variable axis. Grading sheet and build
   disagree and nobody inspected the files.
   (c) No `OFL.txt` anywhere in the tree. Manrope is OFL and the licence has to travel with the
   binary, which matters on a government-buyer site.
   Fix: one file, one `@font-face` with `font-weight: 200 800`, ship the licence, then confirm by
   eye that 400 / 500 / 600 / 700 actually render as four different weights. The file itself is
   valid and complete, verified by decompressing it to its declared 56,612 bytes of tables, so
   this is a packaging error, not a corrupt asset.
4. **Focus indicator is 1.35:1 on light and 1.09:1 on muted.** `styles.css:765-769` pairs
   `outline: 3px solid var(--focus)` with `box-shadow: 0 3px 0 var(--focus-bar)`, a bar on the
   bottom edge only. The top and both side edges of the yellow ring have no companion:
   `#FFDD00` on `#ffffff` = **1.35:1**, on `#EBE6E1` = **1.09:1**, against the 3:1 that WCAG 2.2
   SC 1.4.11 wants against adjacent colour. `light` is the module index, every Find Capability and
   Get Discovered page, and Trust and Security, so this is most of the reading on the site.
   §6.4 asserts the bar solves it without doing the arithmetic for the other three edges.
   Fix: surround the ring on all four edges (for example a `--focus-bar` ring at a larger spread
   under the yellow), then post the recomputed ratio for each edge on each of the three surfaces.
5. **The page is dead if `shell.js` loads but fails.** Header, footer and both logo specimens
   (`_reference.html:145,151` reference `#cx-logo`, which `shell.js` injects) render empty. The
   `<noscript>` blocks at `:63` and `:581` fire only when JS is **disabled**, never when a script
   404s, times out or throws, which is the actual conference-wifi failure mode this whole build is
   calibrated around. `DESIGN-DIRECTION` line 66 to 68 claims "every page carries a noscript link
   list so the site stays navigable if the script never runs." That is false for the failure case
   it names. Fix: put real nav, footer and logo defs in static HTML on every page and let
   `shell.js` enhance (set `aria-current`) rather than construct. Then correct the claim in this
   document.

**MAJOR. Fix, or write the exception down before Kim sees it.**

6. **One asymmetric layout, then a symmetric one ten times.** `styles.css:246-247`: `.lede` is
   columns 1 to 5 and `.body` is columns 8 to 12, which is 5 and 5. Ten of fifteen sections use it
   behind an identical `.sec-head`. Sections 10 and 11 are interchangeable; so are 04, 05, 07 and
   08. Fails the team's own §7.2 ("at least 4 different layout families, no layout family
   repeats") and is `research-01` §D2, the deepest structural tell, on the one artifact whose job
   is to prove the site is not machine-averaged. Not among the four declared reference-page
   exceptions.
7. **The accent ration is broken by links and placeholder markers.** §3.5 counts fills and rules
   only: 1 fill (`_reference.html:90`) plus 2 rules (`.hero-aside`, `.modules--live`) is compliant
   on paper. In render the page also carries four orange dashed boxes (`.ph` at
   `_reference.html:129,158,281` and `shell.js:127`, from `border: dashed var(--link)` at
   `styles.css:554`) and orange text on every link on the dark surface (`a { color: var(--link) }`,
   `styles.css:97`). That is accent-as-ambient, the `research-01` §B2.3 discriminator between
   designed dark and templated dark. Fix: `.ph` is staging chrome and does not need the brand
   colour, use `--fg-hi` with a dashed `--rule-ink-load`; and rewrite the §3.5 ration rule to count
   every orange mark on a page, not just fills and rules.
8. **The module index is a 12-cell uniform grid.** `styles.css:492`,
   `repeat(auto-fit, minmax(16rem, 1fr))`, renders about four across. §1 specifies this density-8
   zone as "no card containers at all, hairlines separate data, tight row rhythm" and §5 cites
   Teenage Engineering's ruled products index as the model. Renaming `.card` to `.module` changed
   the grep result, not the shape. Ship single-column hairline rows with subgrid columns for name,
   description and tag.
9. **Row separators use the decorative rule on the surface where they are the only structure.**
   `.module` `border-top` (`styles.css:504`), `td` (`:629`), `.link-index li` (`:563`) and
   `.nav-mobile li` (`:353`) all use `--rule-ink`, which on `light` is `--warm-300` = **1.54:1 on
   paper**. `/platform/modules/` lives on `light`. §3.5's own test says a rule that is the only
   thing defining an element's edge is a UI boundary and must use `--rule-load`, and §7.2 requires
   every rule be correctly classed. Move all four to `--rule-ink-load` (3.90:1 on paper).
10. **Fifteen Title Case headings, banned and undeclared.** `_reference.html:337-414`: "Congress
    App", "RFP Intake and Analysis", "Trade Agreements Library", "Role-Gated Portals",
    "Knowledge-Base Chat" and the rest. §2.3 bans "Title Case On Headings" and §7.2 requires zero.
    Defensible as proper nouns, but the same document forced "AI Matching Engine" to "Matching
    Engine", so these strings are being treated as editable copy. Either sentence-case them or add
    the carve-out to §2.3 in writing and to the exception list above.
11. **Unverified claims in the handoff.** Line 106 to 107 of this document states the banned list
    "was run mechanically against the build; the composite scan returns zero unjustified hits."
    Run as §7.1 documents it, from `Website/` root, it returns hits S1 to S5 above. Either scope
    the pre-flight explicitly in §7.1 (restrict to `_system/`, `pages/`, `assets/`) or delete the
    Google Fonts link from `_reference/font-bakeoff.html` now that the decision it supported is
    made. As it stands a reviewer runs the documented command and gets a failing scan on a build
    the handoff says passes.
    Also unbacked: every item in §7.3. The 320px check, the real iPhone and Android check, the
    keyboard-only pass, 200% zoom and the WCAG 1.4.12 text-spacing snippet appear nowhere in the
    handoff, and §6.3 says two of them must be done **before the module pages are built**. Say so
    explicitly in "Blocked and visible" rather than leaving it implied.

**MINOR. Clean up before this becomes fifteen pages.**

12. `_reference.html:333`, `<div class="body"></div>` is empty and eats a `--space-2xl` row gap in
    section 09. Dead markup in the approval artifact.
13. `_reference.html:335,353,355`, `style="grid-column: main"` are no-ops. `.editorial > *` already
    sets it at `styles.css:245`.
14. `.logo-clear` (`styles.css:299`) is defined and applied to nothing in the entire tree. The
    12.5% clear-space rule is documented in three places and enforced in none. Either wrap both
    logo links in `shell.js` with it, or delete the class and stop claiming the rule is enforced.
15. The logo artwork exists twice: `assets/brand/convergx-logo-black-tag.svg` and a roughly 12KB
    string literal at `shell.js:70`. Verified identical, so nothing is broken, but when Lindsay's
    file lands there are two places to change and one of them is a JS string. Generate the literal
    from the asset, or mark the asset as the source of record in a comment.
16. `shell.js:120`, inline `style="display:block"` on the footer logo is redundant; `.logo` is
    already `display: block` at `styles.css:294`.
17. `styles.css:198`, `.dots--stagger` hardcodes `17px` and `9px` while every other tile resolves
    through a token. Add `--dot-stagger`.
18. `tokens.css:61`, the `--accent` comment gives the paper ratio but not the muted one. It is
    **2.77:1**, which fails everything. Nothing uses it there today and nothing guards against it
    tomorrow. Write the number down.
19. Correct the two stale ratios in `DESIGN-CONSTRAINTS` §6.2: `#B93A0C` on `#EBE6E1` is **4.61:1**
    not 4.73, and `#8A7F76` on `#EBE6E1` is **3.15:1** not 3.23. The build files already have the
    right numbers; the grading sheet does not.
20. 22 inline `style=` attributes in `_reference.html`. Token-only, so discipline holds, but this
    is the file fifteen pages get copied from.

---

### Do not change these

Called out so a revision pass does not sand off the good parts:

- The dot system, `styles.css:176-223`. Four densities, five fades, the per-surface `--dot-ink`
  including white-on-greige, and the `rgb(0 0 0 / 1)` mask stops written specifically to keep the
  `#fff`/`#000` grep clean. The most clearly designed thing in the build.
- The status-tag treatment, `styles.css:471-485` and `_reference.html:336-415`. The direction's
  central claim, executed correctly, including separation by grouping rather than by colour.
- The warm ramp and the two-token accent split by ground. The load-bearing palette decision, and
  the reason this is not indistinguishable from every dark SaaS page.
- The line system derived from the logo's own construction, and the outlined-first default with
  fills rationed. This is what makes the system ConvergX's rather than the reference brand's.
- The copy. "Somebody is accountable for who you meet" and "if the counterparty is wrong, you know
  who to call" both pass `research-01` §C3's own test: a reader can identify who is accountable if
  the sentence turns out to be false. No copula avoidance, no hedge, no tricolon, no negative
  parallelism, zero never-list hits.
- The honesty markers. `[[PLACEHOLDER: ..., who clears it]]` and `[[NEEDS: ...]]` with named
  owners, the "AI Matching Engine" to "Matching Engine" call taken deliberately and written down,
  and the photograph slot at `_reference.html:92-94` marked with dimensions and art direction
  rather than filled with a gradient blob.

*Review complete. Re-submit against blockers 1 to 5 and majors 6 to 11; minors can ride along.*
