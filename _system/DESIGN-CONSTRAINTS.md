# DESIGN-CONSTRAINTS: ConvergX Connect

> ### TYPEFACE RULING SUPERSEDED 2026-07-27
>
> Every reference below to **Space Grotesk**, **Space Mono** or **Roboto** is **DEAD**. Chip rejected
> Roboto, then rejected Space Grotesk, then chose **Manrope** from a six-way bakeoff
> (`_reference/font-bakeoff.html`).
>
> **The type system is now: Manrope for display AND body, system mono stack for micro-labels.**
> Self-hosted at `assets/fonts/Manrope-400|500|600|700.woff2`, 96KB total, no CDN.
>
> What SURVIVES from the reasoning below, and still governs:
> - The system is the **contrast between tight negative-tracked display and wide positive-tracked
>   mono micro-type**. That was always the real decision, and it is face-independent.
> - A single face at default weights and default tracking is still the tell. Manrope is only safe
>   because it sits inside a three-layer system with the mono micro-type layer intact. Delete that
>   layer and it becomes a tell again.
> - Manrope is semi-geometric, which echoes the logo's circular C and O. It is a better structural
>   fit than a pure neo-grotesque, which is why the earlier "Helvetica lineage" framing was wrong.
> - Density, motion, colour, surface and layout rulings below are all UNAFFECTED.


**This is the grading sheet. The design agent is measured against this file, not against its own taste.**

Written 2026-07-27. Resolves `taste-skill/SKILL.md` (the baseline), `DESIGN-REFERENCE-uncommon.md` (the direction),
`DESIGN-REFERENCE-logo.md` (the constraint, supersedes the direction where they disagree),
`research-01-slop-signature.md`, `research-02-execution.md`, `research-03-reference-sites.md`,
`08-sitemap.md` and `05-POSITIONING-CANONICAL.md`.

Precedence when two sources collide: **Chip-stated correction > logo doc > research 01/02/03 > Uncommon reference > taste-skill.**
Every collision that actually exists is named and resolved in this file. Nothing is left to judgement.

---

## 0. Six corrections to the source material, applied before anything else

These are live conflicts in the inputs. The resolution below is binding.

| # | Conflict | Resolution |
|---|---|---|
| 1 | Orchestrator brief and `DESIGN-REFERENCE-logo.md` §1 first paragraph say the dot matrix is **demoted to secondary**. The same section carries `CORRECTED 2026-07-27 by Chip: the dot matrix stays PRIMARY, with the gradient fade` | **Chip's correction wins.** Dots and lines are both first-class and split by job: **dots carry atmosphere, lines carry structure.** Neither is demoted. §3.4 and §3.5 specify both |
| 2 | `research-01` §A2 and grep `I3` ban **Space Grotesk** and **Space Mono** as AI-slop tells. The logo doc addendum locks Space Grotesk + Roboto + Space Mono, and the nine woff2 files are already on disk | **The addendum wins.** Space Grotesk and Space Mono ship. Discrimination rule and the amended grep line in §2.3 |
| 3 | `research-02` §1.3 recommends **Archivo** as a variable font with `wdth`, and §1.5 makes width a token | **Void.** The shipped faces are static instances (Light/Regular/Medium/Bold), no variable axis. Every `font-variation-settings`, `--display-width`, `--label-width`, `--body-width`, `font-stretch`, `"CX Display"` and `size-adjust: 97%` line in research-02 is dead. Use `font-weight` on named static faces |
| 4 | Chip's surface addendum sets the light ground to **pure white**. `research-01` §A1 flags `#fff` as an unconsidered default and `I1` greps for it | **Chip wins.** `#ffffff` is permitted at exactly one site: the `--paper` declaration in `tokens.css`. Any other `#fff` in any file is a defect. The system stays warm because every panel, rule and tint on white is warm greige |
| 5 | `taste-skill` §4.11 Page Theme Lock forbids sections inverting mid-page. Chip's addendum ships three surfaces | **Both hold.** A page declares **one** surface. It may make **at most one** deliberate surface change, and only as a full-bleed band. That is the skill's own once-per-page "colour block story" exception used deliberately, not alternation |
| 6 | `taste-skill` §3 mandates React/Next/Tailwind/Motion/icon libraries. `README.md` bans every installer | **Stack sections of the skill are void.** Static HTML, hand-written CSS, one small `shell.js`. Sections 0, 4, 9 and 14 of the skill still apply in full |

Also void, and do not resurrect: the four `--tag-*-bg` / `--tag-*-ink` pairs currently in `tokens.css`. They encode
colour-coded filled pills, which §5 bans outright. Delete them in the same edit that replaces the rest of that file.

---

## 1. THE DESIGN READ, and the three dials

> **Reading this as: a two-sided marketplace launch site for defence and aerospace procurement leads, with a technical-brutalist / industrial-spec-sheet language, leaning toward hand-written CSS on the client's own hairline-and-inline logo logic, dark-ground with authored light inversions.**

### DESIGN_VARIANCE: 8

The skill's table sends "trust-first / regulated / accessibility-critical" to 3-4. **Reject it here, on the evidence.**

- Variance 3-4 produces a symmetric 12-column centred page with equal section rhythm. `research-01` §D2 names exactly that as the deepest structural tell: *no page ever breaks its own grid*, and the absence of any moment where layout responds to content is the giveaway that no human made a per-page decision.
- The audience makes this worse, not better. `research-01` opening: a defence and aerospace reader treats marketing polish as a credibility tell, and a machine-averaged page does not read as neutral to them, it reads as *nobody was accountable for it*. That is the precise inverse of the core message, so the conventional-equals-trustworthy assumption inverts for this one audience.
- The skill's own §4.3 turns off anti-centre bias only below variance 4. Variance 8 is what forces the asymmetric hero, the 5-column lede against a 12-column measure, and the one full-bleed break per page.

**Where the 8 is spent, and where it is not.** All of it goes into layout geometry, type scale and negative space.
None of it goes into ornament, colour count, corner treatment or component invention. Radius stays 0, palette stays
four values, components stay outlined. That is the difference between variance and noise.

**Hard caps that keep 8 from breaking the site:** exactly one grid break per page (§3.6), all asymmetry collapses to
single column below 60rem, no `position: absolute` used for layout, ever.

### MOTION_INTENSITY: 1

The skill's table says 2-3 for this class. **Go lower, to 1.** Motion 3 still licenses load-in cascades and
`animation-delay` staggers, and `research-01` §E identifies that exact pattern (opacity 0→1, y 20→0, 0.1s stagger) as
the single most common motion signature on the AI-generated web. A dial that permits the tell is the wrong dial.

Four independent reasons converge on 1:

1. **The direction says so.** `DESIGN-REFERENCE-uncommon.md`: distinctiveness comes from typography, texture and layout discipline, *not from motion or ornament*.
2. **The network.** Congress-week reveal, a few hundred phones on one building's wifi in one afternoon (`08-sitemap.md`). Every animation frame is budget spent where there is none.
3. **The freeze.** The site ships finished before Sep 22 with no soft launch to fix things in. Half-built motion cannot be repaired after reveal.
4. **The category evidence.** `research-03` §B1: Anduril's JavaScript hero counter is named as the thing not to copy, for this exact reason.

**This is not a contradiction with VARIANCE 8. It is the whole thesis.** The page is distinctive when it is
motionless, in a screenshot, on a dead network. Anything that only reads as designed while it is moving is not
carrying the identity.

**The entire motion budget, exhaustively:** §6.

### VISUAL_DENSITY: 6, split by zone

One number cannot describe this site honestly, so it is stated per zone and the 6 is the page average:

| Zone | Density | Behaviour |
|---|---|---|
| Hero, section openers, positioning statements, the vetting pages | **3** | Art-gallery spacing. `--space-3xl` / `--space-4xl` section gaps. Load-bearing empty areas. `--measure-display: 16ch` so a headline breaks to three lines and dominates |
| Module index, status metadata, trade-agreement tables, congress agenda | **8** | Cockpit. No card containers at all (skill §4.4 bans them above density 7). Hairlines separate data. Space Mono with tabular figures for every number. Tight row rhythm |
| Body pages, forms, industry pages | **5** | Standard |

The 8-zones are why density is not 4. The 3-zones are why it is not 8. A single flat 6 applied everywhere produces the
uniform vertical rhythm that `research-01` §D2 calls the giveaway.

---

## 2. THE BANNED LIST

Grep-able. Each entry is a literal value, a pattern, or a copy shape a reviewer can check mechanically. A hit is a
defect unless it appears in the **Permitted exceptions** column.

### 2.1 Colour values

```bash
grep -rniE '#(3b82f6|2563eb|6366f1|818cf8|8b5cf6|7c3aed|a855f7|10b981|0f172a|1e293b|334155|64748b|121212)' .
grep -rniE '\b(bg|text|border|from|via|to)-(indigo|violet|purple|blue|sky|slate|zinc|gray|neutral|emerald)-[0-9]{2,3}\b' .
grep -rniE '#(000|000000|fff|ffffff)\b|:\s*(black|white)\b' .
grep -rniE '(linear|radial|conic)-gradient' .
```

| Banned | Why | Permitted exceptions |
|---|---|---|
| Every framework palette value above | `research-01` §A1. Tailwind blue/indigo/violet/emerald/slate, and `#121212` the unexamined Material dark surface | none |
| `#000000`, `#000`, `black` | Halation on OLED, 13% reading-speed penalty, and an unconsidered default | none. Ground is `#0A0A0A` |
| `#ffffff`, `#fff`, `white` | See §0 correction 4 | **exactly one:** the `--paper` declaration in `tokens.css`. Also `mask-image` gradients, where `#000`/`#fff` are alpha stops and not colour. Write those as `rgb(0 0 0 / 1)` so the grep stays clean |
| Any cool grey, any `slate` / `zinc` / `gray` / `neutral` ramp | `research-01` §B2.1. The warm neutral is the entire differentiator | none |
| `linear-gradient` / `conic-gradient` | Every hero gradient, mesh gradient, and gradient text | **two:** `.rule-vanish` (a single-axis tone-to-transparent rule, once per site) and `mask-image` fades on dot fields |
| `radial-gradient` | | permitted only as the dot-matrix tile |
| Coloured glow, `box-shadow` of any kind, halo, neon | `research-01` §B1.4, §H.2 | none. Elevation is a lightness step |
| A saturated red at full strength on near-black | `research-03` §B3: reads as alert state. The entire reason the orange move exists | none |
| Any second accent, any status colour, any focus colour equal to the brand colour | `research-03` §D2, GOV.UK. One colour cannot do brand, status and focus | none |

### 2.2 Shape, surface, material

```bash
grep -rniE 'border-radius' . | grep -viE 'border-radius\s*:\s*0'
grep -rniE '\brounded(-(sm|md|lg|xl|2xl|3xl|full))?\b'  .
grep -rniE 'box-shadow|text-shadow' .
grep -rniE 'backdrop-filter|-webkit-backdrop-filter|\bblur\(|\bcontrast\([0-9]{2,}' .
grep -rniE 'rgba\(255,\s*255,\s*255,\s*0?\.(0[0-9]|1[0-5])\)' .
grep -rniE '-webkit-font-smoothing\s*:\s*none' .
```

Banned outright: any non-zero `border-radius`; every `box-shadow` including the neubrutalist `8px 8px 0` hard offset;
`backdrop-filter` and all glassmorphism; the CSS halftone `blur()` + `contrast(50)` trick (`research-02` §3.5); white-alpha
hairlines (`rgba(255,255,255,.06)`), which are a shortcut for a real rule token; `-webkit-font-smoothing: none`;
pixel and bitmap typefaces. Target for all of the above: **zero hits.**

### 2.3 Typography

```bash
grep -rniE '\bInter\b|Poppins|\bGeist\b|Cal Sans|Instrument Serif|Manrope|DM Sans|JetBrains Mono|Departure Mono' .
grep -rniE 'fonts\.googleapis|fonts\.gstatic|use\.typekit|cdn\.jsdelivr|unpkg\.com|cdnjs|@import' .
grep -rniE 'font-variant-caps|font-stretch|font-variation-settings' .
grep -rniE 'line-height\s*:\s*1\.5\b' .
grep -rniE 'font-size\s*:\s*[0-9.]+px' .
```

| Banned | Why |
|---|---|
| Inter, Poppins, Geist, Cal Sans, Instrument Serif, Manrope, DM Sans, JetBrains Mono, Departure Mono, Berkeley Mono | `research-01` §A2. Inter is the strongest single typographic tell |
| Any serif anywhere | Skill §4.1 serif discipline. Nothing in this brief names one, and the logo's neo-grotesque tagline argues against it |
| Any inline, outlined, condensed, humanist or high-contrast display face | Logo doc §4. The wordmark owns the inline device |
| Any external font request, any `@import`, any CDN | `README.md` rule 1, `research-02` §0. Also a third-party connection on a government-buyer site |
| `font-variant-caps`, `font-synthesis` small caps | `research-02` §2.1 verified: synthesises as thin scaled capitals and goes weak at 11px on a dark ground |
| `font-stretch`, `font-variation-settings` | §0 correction 3. Static instances only |
| `line-height: 1.5` on body paired with `1.2` on headline | `research-01` §A2, the default-metrics tell |
| `letter-spacing: -0.02em` as the *only* tracking declaration in the file | Tell only in isolation. The tracking system in §3.3 defuses it |
| Any `px` `font-size` | Breaks browser zoom, WCAG 1.4.4 |
| Body copy, or any multi-sentence passage, set in caps | `research-02` §2.4. Slower for everyone, materially worse for dyslexic readers |
| Title Case On Headings | `research-01` §C2 formatting tell |

**Permitted, and the amendment to `research-01` grep line I3:** `Space Grotesk`, `Space Mono`, `Roboto`. The
discrimination rule, because "we did it on purpose" is invisible to a reviewer:

> Space Grotesk is a tell when it is the page's **only** type decision: one face, default weights, default tracking,
> paired with a generic body sans. It is not a tell here because it is one of **three faces with three separate
> jobs**, and because the system is the *contrast* between tight-negative-tracked geometric display and
> wide-positive-tracked mono micro-type. Delete the mono layer or the Roboto body layer and it becomes a tell again.

**The inversion failure mode, stated so it can be checked:** Space Grotesk in body copy, or Roboto in display, is a
defect. Grep: `--font-display` must never appear on `p`, `li`, or `.measure`; `--font-body` must never appear on
`h1`, `h2`, `.display`.

### 2.4 Layout and structure

```bash
grep -rniE 'grid-template-columns\s*:\s*repeat\(3,|grid-cols-3' .
grep -rniE 'position\s*:\s*absolute' .          # every hit needs a written justification
grep -rniE 'class="[^"]*\bcard\b' . | wc -l
grep -rniE 'Most Popular|Starter|\bPro\b|Business tier|Enterprise tier' .
```

Banned: three equal feature cards in a row; the modal skeleton (centred hero → 3 cards → logo wall → testimonial
carousel → pricing → FAQ → repeated CTA); a small pill badge directly above the H1; numbered `1 / 2 / 3` step
sequences; a stat banner of three or four big numbers; bento grid used as a default rather than a decision; any
pricing tier naming; `position: absolute` for layout; any viewport-unit offset used to place content; centred hero;
two adjacent sections whose contents could swap with no layout change (`research-01` §D2 applied test).

**The two-sided-specific ban:** a symmetric two-column hero, mirrored audience cards, or two equal-weight CTAs side
by side in the hero. `research-01` §D3 and `08-sitemap.md` call 2. Layout expresses the business asymmetry or it is
lying about it. §4 gives the replacement.

### 2.5 Motion

```bash
grep -rniE 'data-aos|AOS\.init|framer-motion|\bgsap\b|ScrollTrigger|animate-on-scroll|IntersectionObserver' .
grep -rniE 'fade-?up|fadeInUp|slide-?up|animate-fade|translateY\(\s*(20|30|40)px' .
grep -rniE 'transition\s*:\s*all\b|ease-in-out|cubic-bezier\(0\.4,\s*0,\s*0\.2,\s*1\)' .
grep -rniE 'animation[^;]*infinite|animation-timeline|@scroll-timeline|background-attachment\s*:\s*fixed' .
grep -rniE ':hover[^{]*\{[^}]*(transform|box-shadow|border-radius|opacity)' .
```

Banned: every animation library; fade-up on anything; scroll-triggered entrance of any kind; scroll-driven
animations (`animation-timeline` is not Baseline, `research-02` §5); parallax; infinite loops including logo
marquees and CTA pulses; `transition: all`; `ease-in-out` and the `cubic-bezier(.4,0,.2,1)` default;
card hover lift + shadow; `background-attachment: fixed`; view transitions; `transform: scale()` or rotation on a
dot field (`research-02` §3.3, produces moiré); any hover state that changes `transform`, `box-shadow`,
`border-radius` or `opacity`. Target for the last grep: **zero hits.**

### 2.6 Imagery, icons, ornament

Banned: **every icon library** (Lucide, Phosphor, Heroicons, Feather, Font Awesome) and every hand-rolled SVG icon.
The system is typographic (`research-01` §H.8). `Shield` and `Zap` are doubly banned: the brand rejects martial
iconography. Zero emoji, in markup and in copy. No div-built fake product UI, no fabricated dashboard screenshot, no
invented data in a mockup. No fabricated technical ornament: no decorative barcodes, no invented part numbers, no
made-up certification marks, no crop marks or registration targets with no referent. No pills or labels overlaid on
photographs. No photo-credit captions as decoration. No stock military imagery, no camouflage, no eagles, no shields.

**The discriminator, which is the whole difference between this system and template brutalism:** every technical
annotation on this site is a real value or it is absent. Where the real value has not arrived, ship the literal
string `[[PLACEHOLDER: what it is, who clears it]]`, never an invented one. `research-01` §F, and `research-03` §B4:
Second Front is the honest model, a named authorisation at a named level from a named authority.

### 2.7 Copy shapes

```bash
grep -rniE '—|–|&mdash;|&ndash;|&#8212;' .
grep -rniE "in today's (fast-paced|ever-changing|digital|rapidly evolving)" .
grep -rniE 'unleash|revolutioniz|empower|transform your|supercharge|elevate your|streamline|holistic|comprehensive' .
grep -rniE '\bseamless|cutting-edge|best-in-class|world-class|state-of-the-art|game-chang|next-gen|all-in-one|end-to-end' .
grep -rniE '\brobust\b|\bleverage\b|\bdelve\b|tapestry|\bpivotal\b|\bfoster\b|\bgarner\b|showcase|testament|underscore|intricate|interplay|vibrant|unlock' .
grep -rniE "it'?s not (just )?[a-z]+,? it'?s\b|not just [a-z]+,? but\b" .
grep -rniE 'stands as a|serves as a|plays a (crucial|key|vital|pivotal) role|a testament to' .
grep -rniE 'may help|can potentially|is designed to help|simply|\bjust\b|\beasily\b' .
grep -rniE 'AI[- ]match|AI[- ]powered|AI[- ]driven|intelligent matching|smarter match|better match' .
grep -rniE 'event app|networking app|conference platform|coming soon' .
grep -rniE 'Bumble for Business|ProMatch|ACE|ConvergX Capital|WaVv|mode40' .
grep -rniE 'Boeing|95 ?%|80 ?%|25 years' .
```

**Em dash and en dash: zero hits.** House rule plus skill §9.G. No allowance of any kind, in any element, including
alt text. (Scope every copy scan to `--include='*.html' --include='*.css' --include='*.js'`. This file contains the
two dash characters inside the grep patterns above, and is the only legitimate hit in the tree.)

**Banned constructions**, from `research-01` §C2. These matter more here than anywhere else, and §C3 states why:
every one of them is an **accountability-avoiding grammar**, on a site whose thesis is institutional accountability.

- Negative parallelism: "it's not X, it's Y", "not just X but also Y"
- Copula avoidance: "serves as", "features", "maintains", "offers" where "is" or "has" is meant
- Significance inflation: "stands as a testament", "underscores the importance", "plays a crucial role"
- The tricolon, and three-word slogan stacks ("Develop. Deploy. Defend."). `research-03` §B4: category wallpaper
- Hedges: "may help", "can potentially"
- Bulleted lists where every item opens with a **bolded phrase:** then an explanation

**Banned by the client, from `05-POSITIONING-CANONICAL.md` §12.** Any hit blocks the page:
every present-tense autonomous-matching claim; "better matching" or "smarter matches"; any Phase 2 capability in
present tense; "event app" / "networking app" / "conference platform"; "all-in-one" / "end-to-end"; "simply" /
"just" / "easily"; the internal codename, "Bumble for Business", "ProMatch", "ACE", "ConvergX Capital", "WaVv"; any
line built on one named individual; any licensing or white-label talk; **mode40 named as builder anywhere before
Sep 22**; attack or aggression framing of any kind; any adversary named; Boeing; the 95% demo match score; the 80%
follow-up figure; "25 years"; **any attendance, deal, dollar, match-accuracy or outcome number, because none exists.**

**Do not transfer from the Uncommon reference** (its own list, §"What does NOT transfer"): the wordmark and its
ligature device; the aggression ("we don't disrupt, we takeover" and every relative); fabricated technical ornament;
the consumer-tech mobile mockup; unrelieved full-black dominance across every page.

**The copy test, applied per claim:** can a reader identify who is accountable if this sentence turns out to be
false? If not, it is decoration. Delete it.

### 2.8 Honesty defects, specific to this build

Each of these is a **build defect**, not a style note, per `README.md` and `08-sitemap.md`:

- ~~A Phase 2 module rendered anywhere without a visible status tag~~ **VOID, 2026-07-29.** Chip removed every status tag from the site. An untagged module is now correct. Do not restore tags without him.
- Any module status tag carrying a date
- "Coming soon"
- Any claim that push notifications work on iOS (Android only)
- Any promise that the app is downloadable in September (App Store review status unconfirmed)
- Any number on any page that does not trace to a cleared source

---

## 3. THE POSITIVE SPEC

### 3.1 Token values, with the reasoning

Replaces the whole current body of `tokens.css`. Every value stays marked placeholder until Lindsay Robertson's
files land. No page file may contain a raw hex or a font name.

```css
:root {
  /* ---- ground and ink. PLACEHOLDER. Ratios computed, WCAG 2.1 relative luminance ---- */
  --ground:      #0A0A0A;  /* never #000000. Gives up 6% of ratio to buy back halation comfort */
  --panel:       #141210;  /* elevation by lightness only. 0.304% -> 0.619% luminance, a real step */
  --ink:         #A89B91;  /* body on dark.        7.32:1  clears AAA */
  --ink-hi:      #F0EFED;  /* emphasis AND the logo. 17.23:1  see 3.7 */
  --ink-lo:      #8A7F76;  /* de-emphasis only.    5.07:1  NEVER body. This is the floor */

  /* ---- warm ramp. The single most important decision in the palette ---- */
  --warm-100:    #EBE6E1;  /* muted ground, and panels on paper. Same family as --ink */
  --warm-300:    #D6CFC7;  /* decorative rules on light */
  --warm-500:    #8A7F76;  /* load-bearing rules on light. 3.90:1 on paper, 3.23:1 on muted */
  --warm-600:    #645C55;  /* load-bearing rules on dark.  3.02:1  WCAG 1.4.11 floor */
  --warm-700:    #4A423B;  /* decorative rules on dark, and dot fields. 2.01:1 */
  --paper:       #ffffff;  /* THE ONLY #ffffff IN THE PROJECT */
  --ink-900:     #141210;  /* text on light. 18.69:1 on paper, 15.06:1 on muted */

  /* ---- accent. Two tokens, not one. This is research-03 finding 2 ---- */
  --accent:      #F2560F;  /* 5.76:1 on ground. Fills, rules, large display type, icons */
  --accent-ink:  #0A0A0A;  /* type ON an orange panel. 5.76:1. NEVER white (3.44:1, fails) */
  --accent-text: #B93A0C;  /* small text and links on light. 5.72:1 paper, 4.73:1 muted */

  /* ---- focus. Deliberately NOT the brand colour. GOV.UK precedent ---- */
  --focus:       #FFDD00;  /* 14.70:1 on ground. On light it needs the black bar, see 7.4 */
  --focus-bar:   #0A0A0A;

  /* ---- rules ---- */
  --rule-hair:   1px;
  --rule-gap:    4px;      /* the inline device. Tune against the logo's own inline gap */

  /* ---- texture. INTEGER TILES ONLY, and never 16 or 24 ---- */
  --dot-fine:    7px;   --dot-mid: 13px;  --dot-open: 29px;
  --dot-r:       1px;   /* never 0.5px. Disappears at 1x */

  /* ---- type ---- */
  --font-display: "Space Grotesk", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-body:    Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono:    "Space Mono", ui-monospace, "Cascadia Code", Menlo, monospace;
  --track-display: -0.018em;
  --track-label:    0.18em;

  /* ---- layout ---- */
  --page-max: 1180px;  --measure: 68ch;  --measure-display: 16ch;
  --radius: 0;         /* structural. Do not change. This one value removes a whole family of tells */
}
@media (min-width: 1920px) { :root { --page-max: 1360px; } }
@media (min-resolution: 2dppx) { :root { --rule-hair: 0.5px; } }
```

**Why `--accent` landed on `#F2560F` and not `#E8471C`:** `research-03` §E.4. It buys 0.7 of a contrast point on the
dark ground (5.76 vs 5.04) for no perceptual loss of warmth, and `#E8471C` is marginal on any ground darker than
`#0A0A0A`. `#EE5124`, the NGen accent, sits inside the same band and is the concrete Canadian industrial-innovation
precedent to show Kim when the red-to-orange move is questioned.

**Why the warm ramp is not optional.** `research-01` §B2.1: templated dark uses cool grey because that is the
framework default. If `--ink` drifts cool, the site becomes indistinguishable from every dark SaaS page and the whole
direction collapses. `research-03` §B1 confirms Anduril runs warm and §B2 confirms Saronic reads competent and
generic running cool, in this exact category.

### 3.2 The surface system

```css
[data-surface="dark"]  { --bg: var(--ground);   --fg: var(--ink);     --block: var(--panel);
                         --rule: var(--warm-700); --rule-load: var(--warm-600); --link: var(--accent); }
[data-surface="light"] { --bg: var(--paper);    --fg: var(--ink-900); --block: var(--warm-100);
                         --rule: var(--warm-300); --rule-load: var(--warm-500); --link: var(--accent-text); }
[data-surface="muted"] { --bg: var(--warm-100); --fg: var(--ink-900); --block: var(--paper);
                         --rule: var(--warm-300); --rule-load: var(--warm-500); --link: var(--accent-text); }
```

Every component uses `--bg`, `--fg`, `--block`, `--rule`, `--rule-load`, `--link` and works on all three with no
variant class. **A component that only works on the dark ground is a defect.**

Per-page assignment, from `08-sitemap.md`:

| Surface | Pages |
|---|---|
| `dark` | Home, Platform overview, all four Congress pages, Industries hub, About |
| `light` | Module index, all Find Capability and Get Discovered pages, Aerospace & Defence, About sub-pages, Trust & Security |
| `muted` | `/access/request/`, `/access/apply/`, every page whose primary content is a form |

**No `prefers-color-scheme` media query anywhere.** The surface is an authored decision per page, not a user
preference. This still satisfies the skill's dual-mode requirement and `research-01` §B1.7 (permanent dark with no
counterpart is itself a tell), because the site ships both grounds.

**One surface change per page, maximum**, and only as a `grid-column: full` band with a `.rule-double` above it.
See §4 for the one place this is mandatory.

### 3.3 Type

Three faces, three jobs. Self-hosted, `font-display: swap`, `@font-face` declared only in `tokens.css`.
391 KB for nine files, acceptable on the conference network. `Space Grotesk Light` is on disk but **banned on the
dark ground**: light-on-dark optically thickens, then a Light weight at small size goes to mush.

| Role | Face | Weight | Tracking | Case |
|---|---|---|---|---|
| Display | Space Grotesk | 500, 700 for the one hero per page | `-0.018em` | **Sentence case.** The logo is caps; caps headlines compete with it |
| Body, UI, forms | Roboto | 400, 500 | `0` | Sentence case |
| Micro-labels, status tags, spec metadata, all figures | Space Mono | 400, 700 | `0.18em` at 11px, `0.15em` at 13px | Uppercase **via CSS only** |

Scale, from `research-02` §4.2. Every preferred term carries a `rem` component so it survives browser zoom
(WCAG 1.4.4). Max is never more than 2.5x min.

```css
--step--2: 0.6875rem;                                       /* 11px. Micro-labels are NOT fluid. Hard floor */
--step--1: clamp(0.833rem, 0.828rem + 0.02vw, 0.844rem);    /* captions, metadata */
--step-0:  clamp(1rem,     0.964rem + 0.18vw, 1.125rem);    /* body */
--step-1:  clamp(1.2rem,   1.114rem + 0.43vw, 1.5rem);      /* lede */
--step-2:  clamp(1.438rem, 1.277rem + 0.80vw, 2rem);        /* h3 */
--step-3:  clamp(1.725rem, 1.457rem + 1.34vw, 2.663rem);    /* h2 */
--step-4:  clamp(2.075rem, 1.654rem + 2.11vw, 3.55rem);     /* h1 */
--step-5:  clamp(2.487rem, 1.845rem + 3.21vw, 4.737rem);    /* display */
--step-6:  clamp(2.987rem, 2.037rem + 4.75vw, 6.312rem);    /* hero. ONCE per page. Never twice */
```

Space scale: use `research-02` §4.2's `--space-3xs` through `--space-4xl` verbatim. Type stops growing at 1440px by
design; above that the layout absorbs width, not the type.

`text-wrap: balance` on `h1` and `h2` only. Never on body.

### 3.4 The dot matrix

Primary texture, per §0 correction 1. Atmosphere, surface, photographic overlay, large empty fields.

```css
.dots {
  background-image: radial-gradient(circle at center, var(--dot) var(--dot-r), transparent 0);
  background-size: var(--tile) var(--tile);
}
.dots--fine  { --tile: var(--dot-fine); }   /* reads as tone */
.dots--mid   { --tile: var(--dot-mid);  }   /* default */
.dots--open  { --tile: var(--dot-open); --dot-r: 2px; }  /* sparse, for large empty areas */
.dots--stagger {                             /* reads angled without a transform */
  background-image: radial-gradient(circle at center, var(--dot) 1px, transparent 0),
                    radial-gradient(circle at center, var(--dot) 1px, transparent 0);
  background-size: 17px 17px;
  background-position: 0 0, 9px 9px;
}
[data-surface="dark"]  .dots { --dot: var(--warm-700); }
[data-surface="light"] .dots { --dot: var(--warm-300); }
[data-surface="muted"] .dots { --dot: var(--paper); }   /* white dots on greige. Use this deliberately */
```

**The gradient fade is mandatory, not optional.** It is the thing Chip picked the reference for.

```css
.dots--fade { -webkit-mask-image: linear-gradient(to bottom, rgb(0 0 0/1) 0%, transparent 100%);
                      mask-image: linear-gradient(to bottom, rgb(0 0 0/1) 0%, transparent 100%); }
```

Directional variants: `to right`, `to left`, `135deg`, `radial-gradient(circle at 20% 0%, rgb(0 0 0/1), transparent 70%)`.

**The discrimination rule, `research-01` §G1, enforced per field.** Every dot field must have all three of:

1. **An edge.** It terminates against something, normally a 2px `--accent` rule or a surface boundary
2. **A density decision.** It uses a named density and pairs with a second field at a different density somewhere on the page
3. **A relationship.** It aligns to the grid, the type scale, or a real content boundary

A field with no edge and no density change is the Vercel background. Delete it.

**Hard mechanics, all verified in `research-02` §3.3:** integer tiles only, never `16px` or `24px`, radius never
below `1px`, never `transform: scale()` a field, never rotate one, never animate one, never
`background-attachment: fixed`, never more than two gradient layers on one element, always put the field on its own
element or pseudo-element so text repaints do not invalidate it.

### 3.5 The line system

Structure. Derived from the logo's own hairline-and-inline construction, which is what makes this ConvergX's system
rather than a copy of the reference.

```css
.rule        { border-top: var(--rule-hair) solid var(--rule); }
.rule--load  { border-top: var(--rule-hair) solid var(--rule-load); }  /* any UI boundary. 3:1 */
.rule-double { height: var(--rule-gap);                                /* the inline device */
               border-top: var(--rule-hair) solid var(--rule);
               border-bottom: var(--rule-hair) solid var(--rule); }
.rule-vanish { height: 1px;                                            /* ONCE per site */
               background: linear-gradient(to right, var(--rule) 0%, var(--rule) 55%, transparent 100%); }
.card, .btn, .tag, input, select, textarea {
  border: var(--rule-hair) solid var(--rule-load); border-radius: 0; background: transparent;
}
```

**Outlined is the default state for everything.** Fills are the exception, which is what makes a fill mean something.

**The rationing rule, and it is checkable:**

> **At most ONE solid orange fill per page** (one filled panel *or* one filled button, not both).
> **At most TWO orange rules or edges per page.**
> Everything else on the page is an outline, a hairline, or nothing.

`.rule-double` is reserved for major section breaks and for the status-tag underline. Nothing else.

`.rule-vanish` is the "where industry lines disappear" device. It appears **exactly once on the entire site**, on
`/about/`, next to the tagline. `DESIGN-REFERENCE-logo.md` §2: use the relationship once, deliberately, never as a
gimmick. A second instance anywhere is a defect.

**Load-bearing versus decorative is a WCAG distinction, not a taste one** (`research-02` §6.2). A rule that divides
two paragraphs is decorative and may sit at `--rule` (2.01:1). A rule that is the *only* thing defining the edge of a
button, an input, a tag or a card is a UI component boundary and must use `--rule-load` (3.02:1 dark, 3.90:1 light).
In an outline-first system most rules on the page are load-bearing. When in doubt, use `--rule-load`.

### 3.6 Grid, and the one break

```css
.editorial {
  display: grid;
  grid-template-columns:
    [full-start] minmax(var(--gutter), 1fr)
    [main-start] repeat(12, minmax(0, 5rem)) [main-end]
    minmax(var(--gutter), 1fr) [full-end];
  column-gap: var(--space-m);
  row-gap: var(--space-2xl);
}
.editorial > *  { grid-column: main; }
.lede           { grid-column: main-start / span 5; }
.body           { grid-column: main-start 8 / main-end; }
.bleed          { grid-column: full; }
@media (max-width: 60rem) {
  .editorial { grid-template-columns:
    [full-start] var(--gutter) [main-start] 1fr [main-end] var(--gutter) [full-end]; }
  .lede, .body { grid-column: main; }
}
```

`minmax(0, 5rem)` and not `1fr` on the inner tracks: the `0` minimum is what stops a long unbroken string (a part
number, a URL) from blowing out the grid on a spec-sheet site.

**Exactly one grid break per page.** Three sanctioned forms, in descending order of safety: `grid-column: full`;
two children sharing a `grid-row` with different column spans so display type overlaps a photograph; a negative
`margin-block-start` in `em` on one element, reset in the mobile query. Not sanctioned, ever: `position: absolute`
for layout, `transform: translate` for placement, viewport-unit offsets. Each of those breaks under the WCAG 1.4.12
text-spacing test and each is what "brutalist template that breaks on mobile" means in practice.

The break is the section that satisfies `research-01` §H.13: at least one section per page whose layout responds to
its own content and could not be swapped with its neighbour. Two breaks and neither reads as deliberate.

### 3.7 The logo

Inline the SVG once in `shell.js`. Verified: 36 `<path>` elements, **zero `fill` attributes**, so `fill: currentColor`
inherits all the way down. Never `<img>`: black artwork on a black ground renders invisible.

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <g id="cx-wordmark">…</g><g id="cx-tagline">…</g>
</defs></svg>
<svg class="logo logo--lockup" viewBox="0 0 286.7 86.45" role="img"
     aria-label="ConvergX, where industry lines disappear"><use href="#cx-wordmark"/><use href="#cx-tagline"/></svg>
<svg class="logo logo--mark" viewBox="14 13 268 43" role="img"
     aria-label="ConvergX"><use href="#cx-wordmark"/></svg>
```

```css
.logo svg, .logo use { fill: currentColor; }
.logo { color: var(--ink-hi); }                        /* NOT var(--ink). See below */
.logo--lockup { width: clamp(200px, 22vw, 320px); }    /* measured floor, enforced in CSS */
.logo--mark   { width: clamp(150px, 18vw, 240px); }
@media (max-width: 40rem) { .logo--lockup { display: none; } .logo--mark { display: block; } }
```

Three measured findings, all binding:

1. **Minimum lockup width 200px.** Below that the tagline falls under 10 rendered pixels and stops being type
2. **Minimum wordmark width 150px.** Below that the inline strokes close up and the mark stops being the mark
3. **Render the mark in `--ink-hi`, not `--ink`.** Counter-intuitive and correct: the eye is resolving the gap
   between two thin strokes, not reading a solid shape, so the hairline mark needs *more* contrast than body text

Clear space: 12.5% of the rendered width on every side (the wordmark's cap height, 35.7 of a 286.7 artboard).

**Open, needs Kim, do not decide in code:** there is no icon-only mark in the file. Ship a placeholder favicon
(wordmark letterboxed on the accent field). **Do not ship a cropped C, O or X as a favicon.** The X is the
recommended candidate, on the reasoning in `DESIGN-REFERENCE-logo.md`, and it needs a simplified single-stroke
variant below 32px, which is a logo derivative and therefore Kim's call.

### 3.8 The micro-label system

The most distinctive device in the system, and the one most likely to be got wrong.

```css
.label {
  font-family: var(--font-mono);
  font-size: var(--step--2);        /* 11px fixed. Never fluid, never smaller */
  font-weight: 400;
  text-transform: uppercase;        /* HTML is sentence case. Always */
  letter-spacing: var(--track-label);
  line-height: 1;
  color: var(--fg);
}
.label--edge { display: inline-block; margin-inline-end: calc(var(--track-label) * -1); }
```

`.label--edge` is mandatory on any label pushed to a right or bottom edge. `letter-spacing` adds space *after* the
final character, and on a spec-sheet system that one-or-two-pixel misalignment against the rule it is meant to line
up with is the whole game (`research-02` §2.2, verified in render).

Tracking is size-dependent: `0.18em` at 11px, `0.15em` at 13px, `0.10em` at 16px and above. Never below 11px.

**The eyebrow rule, and it is stricter than the skill's.** The skill allows `ceil(sectionCount / 3)` eyebrows.
**This site allows zero.** `research-01` §G2: a small all-caps label centred above an H2 doing nothing is the slop
version; a label pushed to a layout edge carrying real information is the designed version. Mechanical test:

> No element carrying `.label` may be the immediate previous sibling of an `h1`, `h2` or `h3`.
> Every `.label` sits at a layout edge or corner and carries real data: a status, a category, a reference, a
> figure number, a page coordinate. If deleting it loses no information, it was an eyebrow. Delete it.

**Accessibility of caps**, all four mandatory (`research-02` §2.4): sentence case in the DOM, uppercase in CSS,
always; add an explicit `aria-label` where the label is interactive or carries meaning; never blanket-`aria-label`
decorative labels; never set body copy in caps.

Ration the middle dot: **maximum one `·` per line**, never as the default separator. Prefer a hairline or a column.

### 3.9 Motion budget, exhaustive

```css
:root { --t: 120ms; }
.btn, a, .tag, input, select, textarea, summary {
  transition: border-color var(--t) linear, background-color var(--t) linear, color var(--t) linear;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important;
                           transition-duration: .01ms !important; scroll-behavior: auto !important; }
}
```

That is the entire motion budget. **Three transitioned properties, one duration, one easing, one media block.**
Ceiling: 150ms, and no more than **three** `transition` declarations in the whole stylesheet.

State change happens through **rule tone, rule doubling and fill**, never through lift, glow, shadow, radius or
opacity. `research-01` §B1.9 and §B2.7: an outlined-by-default system has no framework fallback for hover and focus,
so those are the states most likely to be left unanswered or answered with a borrowed lift-and-glow. That is the
specific route by which this build escapes AI-SaaS slop and lands back in it. Answer them explicitly:

| State | Answer |
|---|---|
| `:hover` | `border-color: var(--fg)`. Rule tone lifts. Nothing moves |
| `:active` | Fill inverts: `background: var(--fg); color: var(--bg)`. No translate |
| `:focus-visible` | §7.4. Never removed, never subtle |
| `:disabled` | `color: var(--ink-lo); border-color: var(--rule)`, `cursor: not-allowed`. No opacity fade |
| Current page in nav | `.rule-double` beneath the item. Not a colour change, not a dot |

The `prefers-reduced-motion` block ships even though almost nothing animates. Its absence is itself a tell, and it
also disables user-agent smooth scrolling.

### 3.10 Component list, for the fifteen launch pages

Build in this order. Nothing outside this list without a written reason.

**Shell (`shell.js` only, never hand-copied into a page)**
1. Skip link
2. Desktop nav: logo lockup + six links + `Request access` outlined button. One line, height 64-72px, **no dropdown menus and no JavaScript menu behaviour.** Link descriptors live on the hub pages as a link index (component 17), not in a hover menu. `research-03` §A2: a nav with no JS dependency is a feature on a conference network
3. Mobile nav: `<details>`/`<summary>` disclosure, no JS. `logo--mark` only, tagline dropped
4. Footer: full sitemap as a link index, one `.rule-double` above it

**Page primitives**
5. `.rule`, `.rule--load`, `.rule-double`, `.rule-vanish`
6. Dot field: 3 densities x 3 surfaces x 4 fade directions
7. `.label`, `.label--edge`
8. Button: outlined default, one solid orange per page maximum, and a tertiary text link with a `→` glyph (a text character, not an icon)
9. Outlined block. Not a "card": no shadow, no radius, no left-border colour strip
10. `[[PLACEHOLDER: …]]` inline marker, visually distinct in staging and greppable

**Content blocks**
11. Demand hero, asymmetric 8/4 (§4)
12. Supply band, full-bleed (§4)
13. Module row and module index, subgrid + container query (§5)
14. Status tag (§5)
15. Claim block: claim + proof line + a slot that renders `[[NEEDS: …, who clears it]]` when proof is absent. Used on the vetting pages and every ladder
16. Pull statement: display type at `--step-5`, no quotation-mark ornament, attribution on its own line with a plain hyphen
17. Link index: name + one-line plain-English descriptor per link. Used on all four hub pages. `research-03` §B2
18. Two-path chooser: used at the foot of every industry page, because an industry page must work for both sides
19. `Fig. n` figure and caption. Only over a real diagram, never over a decorative one
20. Data table: hairline row separation only, no zebra fill, no `border-t` *and* `border-b` on every row, Space Mono tabular figures
21. Agenda list, `/congress/agenda/`
22. App download block, `/congress/the-app/`. Built as a conversion page, not a brochure. Highest-traffic page of the year
23. Form: label above input, no placeholder-as-label ever, helper text present in markup, error below input, `muted` surface
24. Pre-reveal holding page: name, date, one line. Lives at the domain until Sep 22

**Images.** The skill requires real visual assets and forbids pure-text minimalism. Here the dot system and the type
scale are the visual system, and **photography is the only binary payload the site is allowed.** No photography has
arrived. Ship explicit slots, per the skill's own last-resort path:
`<!-- TODO: hero photograph, 1600x1000, dark high-contrast single-subject, warm orange rim light, non-militaristic -->`.
Then say so in the handoff. Never fill the gap with a hand-rolled SVG, a div mockup, or a gradient blob.

---

## 4. THE TWO-SIDED MECHANISM

Problem holders are the scarce, high-value side. Solution providers are abundant and eager. `08-sitemap.md` call 2:
Home speaks to the problem holder by default, the solution-provider door is prominent but secondary. Both get a real
front door. Only one gets Home.

**A symmetric two-column hero is forbidden.** So are mirrored audience cards and two equal-weight CTAs side by side.
`research-01` §D3: symmetry is the default, therefore symmetry is the tell, and `research-03` §C4 shows what a
two-sided defence marketplace looks like when nobody decided who the homepage is for.

### The actual Home layout

```
┌─ nav ─────────────────────────────────────────────────────────────────────┐
│ [logo lockup]  Find capability  Get discovered  Industries  Platform       │
│                The Congress  About                      [ Request access ] │
└───────────────────────────────────────────────────────────────────────────┘
  cols 1-------------------------------8 │ 9------------12
  VETTED CAPABILITY MATCHING              │                  <- .label--edge, top-left, 11px mono
                                          │  ░░░░░░░░░░░░░
  Somebody is accountable                 │  ░░░░░░░░░░░░
  for who you meet.                       │  ░░░░░░░░░           <- .dots--mid + fade to right,
                                          │  ░░░░░░              terminated by a 2px --accent
  [ 5 cols: subtext, 20 words max ]       │  ░░░                 left edge. Texture, NOT a
                                          │                      second audience
  [ Request access ]  <- the page's ONE   │
     solid orange fill                    │   Finding and qualifying a counterparty
                                          │   the buyer has never heard of.     <- category
  ═══════════════════════════════════════════════════════════  .rule-double, full bleed
┌─ .bleed, data-surface="muted", the ONE surface change on this page ────────┐
│  HAVE A CAPABILITY                                                         │
│  The answer can come from an industry nobody recruits from.                │
│                                              [ Apply to join ] (outlined)  │
└────────────────────────────────────────────────────────────────────────────┘
  ... three further problem-holder sections before any supply-side content ...
```

**The mechanism, stated as checkable numbers:**

| Rule | Value |
|---|---|
| Hero column split | **8 / 4.** Never 6/6, never 50/50 |
| What the 4-column side holds | The dot field, the category definition set as spec metadata at the bottom-right edge. **Never a second audience, never a mirrored CTA, never a form** |
| Hero height | >= 85vh, and it must fit the viewport: headline <= 2 lines desktop, subtext <= 20 words and <= 4 lines, CTA visible without scrolling |
| Hero text elements | **Maximum 4.** Category label, headline, subtext, one CTA. No trust strip, no tagline under the CTA, no logo wall inside the hero |
| Hero top padding | `pt` <= 6rem |
| Supply band height | <= 22vh, and it sits **after** the hero, never inside it |
| Supply band CTA | Outlined. Never the solid fill. The fill is spent on the demand CTA |
| Problem-holder content before any further supply-side content | >= 3 sections |
| `--step-6` uses on the page | Exactly 1, the hero headline |

**The three doors, and the one-label-per-intent rule.** Skill §4.5 bans duplicate CTA intent, so:

| Intent | Label, used identically everywhere on the site | Destination |
|---|---|---|
| Problem holder wants in | **Request access** | `/access/request/` |
| Solution provider wants in | **Apply to join** | `/access/apply/` |
| Either side wants to read first | **Find capability** / **Get discovered** (nav, permanent) | the two hubs |

Three labels, three intents, no synonyms anywhere. "Get in touch", "Contact us", "Learn more", "Sign up",
"Get started" are all banned as CTA labels. The two nav audience labels are locked distinctive assets
(`08-sitemap.md` decision 1): the same two words, forever, never re-litigated.

**Why a band and not a column.** `research-03` §C2 (Xometry): the second audience gets a permanent top-level nav
slot, an imperative verb, and **zero hero real estate**. §B5 (DIU): two explicitly named doors. §C3 (Faire): both
calls are verb phrases of matched length and matched grammar. The band is impossible to miss and structurally
subordinate at the same time, which is exactly the business relationship.

**Every industry page carries two short paths off it** (`08-sitemap.md`), because a prime lands there looking for
suppliers and an SME lands there looking for entry. Component 18. That is the only place on the site where the two
sides may appear at equal weight, and it is a foot-of-page chooser, never a hero.

---

## 5. THE STATUS-TAG SYSTEM: RETIRED 2026-07-29

> **RETIRED BY CHIP, 2026-07-29.** Every status tag and the tag key were removed from the live site,
> and `.tag` / `.tag--edge` were deleted from `styles.css`. All fifteen modules stay listed, untagged.
> He was shown the argument against this, in writing, before deciding, and decided anyway. It is his
> call. **Do not restore the tags, and do not add a substitute signal in their place:** no "coming
> soon", no ordering by build state, no visual de-emphasis of the unbuilt modules, no asterisk, no
> footnote, no tooltip. If you think the site needs a build-state signal, that is a conversation with
> Chip, not an edit.
>
> **What removing the tags did NOT license.** Module descriptions stay exactly as neutral as they are.
> No module may be described as automatic, intelligent or AI-driven, in any tense. Phase 1 matching is
> manual and admin-brokered: a person decides. The rest of §2.8 still binds, and so does the
> trust-and-security disclosure that ConvergX Connect holds no security certification.
>
> The section below is kept as the record of what the system was. It is history, not instruction.

Twelve modules, four tags. `08-sitemap.md` call 3: an untagged Phase 2 module is a present-tense claim and is a
defect. `DESIGN-REFERENCE-uncommon.md` calls this the strongest argument for the whole direction: in this
typographic language "In development" reads as a build state on an engineering document, honest and precise, not as
a wall of disclaimers.

**The four tags, and no fifth exists:** `Live at the Congress` (3 modules) · `In development` (7) ·
`In development, unverified` (2) · `Planned`.

### Exact typographic treatment

```html
<span class="tag" data-status="in-development"
      aria-label="Status: in development">In development</span>
```

```css
.tag {
  font-family: var(--font-mono);
  font-size: var(--step--2);          /* 11px, fixed */
  font-weight: 400;
  text-transform: uppercase;          /* sentence case in the DOM, always */
  letter-spacing: var(--track-label); /* 0.18em */
  line-height: 1;
  color: var(--fg);                   /* 7.32:1 on dark. Same tone as surrounding metadata */
  display: inline-block;
  padding-block-end: var(--rule-gap); /* 4px, the gap before the rule */
  border-block-end: var(--rule-hair) solid var(--rule-load);   /* the hairline underline */
  background: none;                   /* NEVER a fill */
  border-radius: 0;
}
.tag--edge { margin-inline-end: calc(var(--track-label) * -1); }  /* right-aligned in a row */
```

**Bans, each one a specific failure mode:**

| Banned | Why |
|---|---|
| Any filled background, any pill, any radius | `research-01` §G3. A coloured pill says "warning". A spec annotation says "build state" |
| Colour-coding by status. All four tags are the same tone | Same, plus `research-03` §D2: if `IN DEVELOPMENT` is orange and orange is also the brand accent, the tag stops reading as metadata and starts reading as a highlight |
| Any icon, dot, check mark or glyph on a tag | `research-01` §9.F decorative status dots, and the no-icon rule |
| A date, "Coming soon", "Q4", "shortly" | `08-sitemap.md`. No module gets a public ship date until Tracy commits one in writing |
| Sentence-case rendering, or uppercase in the DOM | Screen readers spell DOM capitals letter by letter |
| A tag that is not a direct child of its module row | Loses the subgrid alignment and the wall-of-disclaimers problem returns |

**How the three that ship in September get separated, without a colour.** The sitemap requires visual separation.
Do it with grouping, not with a tag variant:

- The three `Live at the Congress` modules sit in their own block at the top of `/platform/modules/`
- That block carries a **2px `--accent` left edge**, one of the page's two permitted orange rules
- A `.rule-double` closes the block and opens the nine that follow
- The tags themselves stay identical across all twelve

This is `research-03` §A2, Teenage Engineering's products index: hairline-ruled rows with exactly one emphasis mark
reserved for the one thing that changed.

**Alignment.** Subgrid, so title, description and tag line up across every card regardless of description length.
`research-02` §8.3, and subgrid reached Baseline widely available on 15 March 2026.

```css
.modules { display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: var(--space-l); }
.module  { display: grid; grid-row: span 3; grid-template-rows: subgrid; row-gap: var(--space-xs);
           container-type: inline-size; }
.module:has(.tag[data-status="live"]) { /* structural only, never a colour change */ }
```

---

## 6. ACCESSIBILITY FLOOR

Government buyers. This is a floor, not a target. Standard cited, if anyone asks: **WCAG 2.2 AA on all text and
interactive elements**, the same standard the GOV.UK Design System holds itself to.

### 6.1 The warm-taupe question, answered with numbers

The open risk in `DESIGN-REFERENCE-uncommon.md` was that warm taupe on near-black fails AA. **It does not.**
Computed against WCAG 2.1 relative luminance, independently reproduced twice:

| Pair | Ratio | Verdict |
|---|---|---|
| `#A89B91` on `#0A0A0A` | **7.32:1** | Passes AA (4.5) and **clears AAA (7.0)** for normal text |
| `#A89B91` on `#141210` (panel) | 6.91:1 | Passes AA. Just under AAA, acceptable on panels |
| `#8A7F76` on `#0A0A0A` | 5.07:1 | AA only, almost no margin. **De-emphasis only, never body.** This is the floor |
| `#F0EFED` on `#0A0A0A` | 17.23:1 | Emphasis, and the logo |
| `#F2560F` on `#0A0A0A` | 5.76:1 | AA. Headings, labels, marks. **Never a paragraph** |
| `#0A0A0A` on `#F2560F` | 5.76:1 | Type on an orange panel |
| `#F0EFED` on `#F2560F` | 2.99:1 | **FAILS.** Never white type on orange |
| `#645C55` on `#0A0A0A` | 3.02:1 | Load-bearing rule floor, WCAG 1.4.11 |
| `#4A423B` on `#0A0A0A` | 2.01:1 | Decorative rules only |

**No fallback tone is needed on the dark ground.** Keep `#C9BFB6` (10.95:1) in reserve only if a token changes.

### 6.2 The real failure, which is the light inversion

`research-03` §E, and it is the finding most likely to change a decision:

| Pair | Ratio | Verdict |
|---|---|---|
| `#F2560F` on `#ffffff` | 3.44:1 | **Fails AA for text.** Large text (>=24px, or >=18.7px bold) only |
| `#F2560F` on `#EBE6E1` | ~2.84:1 | **Fails everything** |
| `#A89B91` on `#ffffff` | 2.35:1 | **Fails everything.** Taupe is a dark-ground text colour, not a text colour |
| `#B93A0C` on `#ffffff` | **5.72:1** | Passes AA. This is `--accent-text` |
| `#B93A0C` on `#EBE6E1` | **4.73:1** | Passes AA |
| `#141210` on `#ffffff` | 18.69:1 | Body on light |
| `#141210` on `#EBE6E1` | ~15.1:1 | Body on muted |
| `#8A7F76` on `#ffffff` | 3.90:1 | Load-bearing rules on light |
| `#8A7F76` on `#EBE6E1` | ~3.23:1 | Load-bearing rules on muted. Thin margin, verify after any token change |

**The rule, binding.** On `light` and `muted` surfaces, `--accent` is for **fills, rules, large display type and
nothing else**. Body copy, small labels, links and form helper text use `--accent-text`. On those surfaces the warm
taupe is decoration only: rules, tags, dividers. Body text goes to `--ink-900`.

This lands on exactly the pages with the most reading and the highest accessibility exposure, so it is not a corner
case.

### 6.3 The two things arithmetic cannot answer

Both must be checked by looking, on real hardware, before the module pages are built:

1. **The hairline wordmark's optical presence.** A stroke that passes 7:1 can still visually disappear at half a
   pixel wide. Resolved in advance by rendering the logo in `--ink-hi` (§3.7), but confirm on a real iPhone and a
   real mid-range Android
2. **Surface separation from a `#0A0A0A` base.** Starting below the `#121212` default leaves headroom, but a 3-5%
   lightness step from a lower base is a smaller absolute delta. `#0A0A0A` to `#141210` must be visibly distinct on
   a phone at conference-room brightness. Check it there, not in the token file

### 6.4 Focus, and why it is yellow

`--focus: #FFDD00` with `--focus-bar: #0A0A0A`. **Deliberately not the brand colour**, per `research-03` §D2: one
colour cannot do brand, status and focus without all three losing meaning. This is the GOV.UK pattern, which is the
right thing to cite to a government buyer.

```css
:focus-visible { outline: 3px solid var(--focus); outline-offset: 0;
                 box-shadow: 0 3px 0 var(--focus-bar); }   /* the ONLY permitted box-shadow in the project */
```

`#FFDD00` on `#0A0A0A` is 14.70:1. On white it is 1.35:1 and fails on its own, which is precisely why the 3px
near-black bar exists: it carries the indicator on light surfaces (18.69:1). Never `outline: none` without a
`:focus-visible` replacement within the same rule block. A dark minimal system that removes outlines to stay clean
has chosen a look over a legal requirement, and it is the fastest audit failure available.

### 6.5 The rest of the floor

- **WCAG 1.4.12 text spacing.** A tight editorial system with edge-placed labels is exactly what breaks here. No `!important` on any spacing property; no fixed `height` on anything containing text, use `min-height` and padding; no `overflow: hidden` on a text container. Test with the console snippet in `research-02` §2.5 on every page
- **Zoom to 200%** without loss of content or function. No `px` font sizes, no `maximum-scale` or `user-scalable=no` in the viewport meta
- **Caps.** Sentence case in the DOM, uppercase in CSS, always. `aria-label` on any label that is interactive or carries meaning. Never blanket-`aria-label` decorative text
- **Keyboard.** Skip link first in the DOM. Full keyboard operability with no JS menu behaviour to trap focus. Visible current-page state in nav that is not colour alone
- **Semantics.** One `h1` per page, no level skips. `<nav>`, `<main>`, `<footer>` landmarks. `lang="en-CA"`. `role="img"` plus `aria-label` on the inline logo
- **Colour is never the only channel.** Status is a word. Current page is a rule. Errors are text
- **Forms.** Label above input, always. Never placeholder-as-label. Error text below the input and programmatically associated. Placeholder, helper and error text all pass AA against the surface they sit on
- **Motion.** `prefers-reduced-motion` block present regardless of how little animates

---

## 7. PRE-FLIGHT CHECK

Every page passes every box. A box that cannot be honestly ticked means the page is not done. Run the mechanical
block first; it is cheap and it catches most of it.

### 7.1 Mechanical, from the `Website/` root

```bash
# composite scan. TARGET: ZERO LINES, or every line justified in writing
grep -rniE '#(3b82f6|6366f1|8b5cf6|0f172a|121212)|\bInter\b|Poppins|\bGeist\b|rounded-|box-shadow|backdrop-filter|data-aos|framer-motion|gsap|grid-cols-3|transition:\s*all|ease-in-out|—|–|transform your|seamless|unleash|AI[- ]match' \
  --include='*.html' --include='*.css' --include='*.js' . | tee /tmp/cx-scan.txt; wc -l < /tmp/cx-scan.txt
```

- [ ] Composite scan returns **zero lines**
- [ ] `grep -rniE 'border-radius' . | grep -v ':\s*0'` returns zero
- [ ] `grep -rniE 'box-shadow' .` returns **exactly one** hit, the `:focus-visible` bar
- [ ] `grep -rniE 'fonts.googleapis|gstatic|typekit|jsdelivr|unpkg|cdnjs|@import' .` returns zero
- [ ] `grep -rniE '#(fff|ffffff)\b' .` returns **exactly one** hit, the `--paper` declaration in `tokens.css`
- [ ] `grep -rniE ':hover[^{]*\{[^}]*(transform|box-shadow|border-radius|opacity)' .` returns zero
- [ ] `grep -c ':focus-visible' _system/styles.css` is > 0; every `outline: none` has a replacement in the same block
- [ ] `grep -c 'prefers-reduced-motion' _system/*.css` is >= 1
- [ ] `grep -c 'transition' _system/styles.css` is <= 3
- [ ] `grep -rniE 'font-variation-settings|font-stretch|font-variant-caps' .` returns zero
- [ ] Em dash and en dash: zero hits anywhere, including alt text
- [ ] No raw hex and no font name in any file under `pages/`
- [ ] No emoji, in markup or copy (perl scan, `research-01` §I5)
- [ ] No `node_modules`, no `package.json`, no lockfile anywhere in the tree
- [ ] Every number on the page traces to a cleared source, or is `[[PLACEHOLDER: …]]`

### 7.2 Per page

- [ ] Page declares exactly one `data-surface`, and makes **at most one** surface change, as a full-bleed band
- [ ] **Exactly one** `--step-6` instance
- [ ] **At most one** solid orange fill, and **at most two** orange rules or edges
- [ ] **Exactly one** grid break, and it is one of the three sanctioned forms
- [ ] **Zero eyebrows.** No `.label` is the immediate previous sibling of an `h1`/`h2`/`h3`
- [ ] Every `.label` sits at a layout edge and carries real data
- [ ] Every `.label--edge` and `.tag--edge` has the negative `margin-inline-end` cancelling its tracking
- [ ] Every dot field has an edge, a named density, and a relationship. Integer tile, never 16 or 24, radius >= 1px
- [ ] Every rule is correctly classed: `--rule-load` if it is the only thing defining a UI boundary
- [ ] `.rule-vanish` appears **zero** times on this page (it lives only on `/about/`, once for the whole site)
- [ ] No two adjacent sections could swap contents with no layout change
- [ ] At least 4 different layout families across the page's sections; no layout family repeats
- [ ] No 3 consecutive image-plus-text split sections
- [ ] Nav is one line at desktop, height <= 80px, no JS menu behaviour
- [ ] Hero: <= 4 text elements, headline <= 2 lines, subtext <= 20 words and <= 4 lines, CTA above the fold, top padding <= 6rem
- [ ] Home hero is 8/4, not 6/6. The 4-column side carries texture, not a second audience
- [ ] Supply band sits after the hero, <= 22vh, outlined CTA
- [ ] One label per CTA intent across the whole site. No synonyms
- [ ] ~~Every module rendered anywhere carries a status tag~~ **VOID, 2026-07-29, see §5.** No module carries a tag and none is to be re-added without Chip
- [ ] Every asymmetric layout collapses to single column below 60rem, declared in the same component
- [ ] Real photography slots marked with dimensions and art direction, or the section legitimately has no image
- [ ] All copy re-read: no broken strings, no negative parallelism, no copula avoidance, no tricolon, no hedge, no Title Case heading
- [ ] Client never-list clean: no mode40, no named individual, no aggression framing, no uncleared proof point

### 7.3 Verified by looking, on real hardware

- [ ] 320px: the logo, every edge-pushed label, and the status tags all survive. These three break first
- [ ] Real iPhone and real mid-range Android: hairlines render, `#0A0A0A` and `#141210` are visibly distinct, no dot-field moiré, no scroll jank
- [ ] Logo at its minimum: inline strokes separate, rendered in `--ink-hi`, at or above 200px lockup / 150px wordmark
- [ ] Keyboard-only pass on every interactive element, focus visible on all three surfaces
- [ ] WCAG 1.4.12 console snippet run: no clipping, no overlap, no lost labels
- [ ] Zoom to 200%: no loss of content or function
- [ ] Contrast script re-run against `tokens.css` after any colour change, and the result recorded in this file
- [ ] Loads and reads on a throttled connection with the font swap in effect and no layout shift

### 7.4 Blocked, and must be visible in the handoff rather than silently filled

- ConvergX brand assets from Lindsay Robertson. Every token in §3.1 is placeholder and nothing is brand-approved
- The public product name, unconfirmed by Kim
- The commercial model, which blocks the entire `/access/` section's content
- The icon-only mark and the favicon below 32px. Kim's decision, not a design decision
- Every `[[NEEDS: …]]` in `05-POSITIONING-CANONICAL.md` §11. Fifteen open proof obligations, zero cleared public numbers

---

*Written 2026-07-27. If a rule here is wrong, change it here and say why. Do not work around it in a page file.*
