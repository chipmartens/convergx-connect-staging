# EVAL REPORT: ConvergX Connect site build

## Second pass

**Scope:** `site/`, 30 pages plus `_system/`, `_dev/` excluded. Honesty and build discipline only.
**Method:** every pattern swept across the whole tree, not re-checked at the lines the first pass cited.
**Graded against:** `_reference/05-POSITIONING-CANONICAL.md`, `_system/DESIGN-CONSTRAINTS.md`, `README.md`, `_system/styles.css`, `_system/tokens.css`, `_system/shell.js`.

---

### VERDICT: FAIL

Five honesty items, seven build items. Nothing in the same class as the first pass, and the composite scan that auto-failed round one is now clean.

**What actually landed, verified by sweep and not by taking your word for it.** Zero hits on `mode40` anywhere in the tree including comments. Zero licensing or white-label language. `AI Matching Engine` is now `Matching Engine`, matching the reference. The module count is fifteen and it agrees in the h1, the lede and the meta description, with all fifteen rows tagged and the tag strings matching `_reference.html` exactly, three Live, seven In development, two In development unverified, three Planned. Both form counts now match their own fields, six and seven, in the h2 and in both meta descriptions. The unattributed mining multiples and the thousand-kilometre figure are gone. The ten-day harvest window is gone from both pages and from the nav panel. `find-capability` says "vets it" not "qualifies it". The category definition ships complete, consent clause and all, on all three pages that carry it. The app page promises no download and the dead `[[INSTALL-URL]]` href is replaced with a real placeholder marker. Every internal link in all 30 pages plus `shell.js` resolves. Zero em dashes, zero emoji, zero banned jargon, zero external requests, zero invented classes, zero `<style>` blocks, zero raw hex or `rgb()` in any page. One h1 per page, no heading-level skips, `lang="en-CA"`, `<main>`, `<footer>` and a skip link on all 30. All 13 form controls labelled with `aria-describedby` helpers.

---

## SEVERITY 1: HONESTY

### 1. The two duration strings still disagree by one edition
- `about/index.html:68` "ConvergX convenes all four, and has for ten years."
- `congress/index.html:46` "Tenth year." and the meta description at `:7` "in their tenth year."

If 2026 is the tenth year, and the 2026 Congress runs Sep 22 to 24, then as of today nine have happened. "has for ten years" claims a tenth that has not occurred. It is also not the cleared string: the source clears **"10-plus years running"**, and `about/index.html:58` states in a build comment that "for ten years" *is* that cleared string. It is not. "Ten" is narrower than "10-plus" and it collides with "tenth year".

**Fix:** `about/index.html:68` becomes "and has for ten-plus years." One word, and both strings then agree with each other and with the source.

### 2. The self-signup claim is asserted on the page that was not given it
`platform/trust-and-security/index.html:70`:
> "Accounts exist because ConvergX created them, and there is no self-signup path."

`get-discovered/who-is-in-the-room/index.html:47` carries the governing note, and it is correct:
> "HONESTY: the 'no self-signup' claim is NOT asserted on this page. It is unverified... VERIFY: confirm whether a self-signup path exists on the Congress platform, from engineering via Tracy Gromniski. If confirmed absent, **this page is the one owner of that claim** per the ownership map."

So the site removed the claim from the page that owns it, correctly, and left it stated flat as fact on a different page, with no marker. The fix moved the symptom. The claim is still unverified and still shipping, now on the page a security reviewer reads most closely.

**Fix:** hold it until Tracy confirms. Either cut the clause from `:70`, or render it as `[[NEEDS: confirmation that no self-signup path exists, from Tracy Gromniski]]` the way every other open claim on this site is rendered.

### 3. An internal build note, including the word "generated", is rendered body copy on four pages
Identical `<figcaption>` on all four:
> "Photograph slot, 1600x1000. Working image, generated, not a commissioned photograph and not yet cleared. Replace before launch."

- `index.html:85` (the homepage)
- `congress/index.html:61`
- `get-discovered/index.html:83`
- `industries/energy/index.html:66`

Two problems in one string. It is a build note printed as public copy, which `DESIGN-CONSTRAINTS` §2.6 addresses directly by requiring the literal `[[PLACEHOLDER: ...]]` marker instead. And it volunteers on the ConvergX homepage that the photography is generated. This site's whole argument is that a named organisation is accountable for what it puts its name on. That caption undercuts it in eleven words.

The site already ships the correct pattern seven times (`congress/the-app/index.html:55`, `about/leadership/index.html:82`, `congress/agenda/index.html:88` and four more), so this is inconsistency, not a missing capability.

**Fix:** replace all four with `<p><span class="ph">[[PLACEHOLDER: commissioned photograph, 1600x1000, cleared by Kim Van Vliet]]</span></p>` and drop the caption. Keep the `data-spec` art direction where it is.

### 4. A concrete figure inside a hypothetical, the pattern this site bans in its own copy
`about/how-we-vet/index.html`:
> "That is the part you need **three years out**. A qualified alternate source sitting in your file then was reviewed against the same four questions as the company you approve this week."

`industries/agriculture/index.html` states the rule: "A hypothetical written concretely gets read as a real one." The first pass killed "a thousand kilometres" on the mining page for exactly this. "Three years out" is the same move, unsourced, and it is the only concrete duration in rendered copy anywhere on the site that is not the Congress dates.

**Fix:** "That is the part you need years after the introduction." Same argument, no figure.

### 5. Two public-policy assertions still carry no visible market-context label
`industries/agriculture/index.html:108` does this right, in rendered copy: "That is a public policy fact, cited here as context and not as anything ConvergX did."

The other two do not have it:
- `industries/aerospace-defence/index.html:90` "Under Canada's Industrial and Technological Benefits Policy... CPCSC is now appearing in new defence solicitations, and it sits on top of the Controlled Goods Program rather than replacing it." The page carries the reasoning at `:72` but only in an HTML comment.
- `industries/mining-natural-resources/index.html:67` "In a modern treaty area, participation obligations are legally enforceable and administered by named bodies. Procurement documents screen out contractors with no credible participation strategy well before technical evaluation."

Same flag as the first pass. Agriculture was fixed. These two were not. "CPCSC is now appearing in new defence solicitations" is the most falsifiable sentence on the site and the one a defence reader is most likely to test.

**Fix:** copy agriculture's one-line label onto both sections, and cite or cut the CPCSC solicitation sentence.

---

## SEVERITY 2: BUILD

### 6. A dev scratch file is shipping inside `assets/`
`assets/brand/_preview.html` breaks four rules at once: raw hex `#f0efed` inline (`README` rule 2), an `<img>` with no `alt`, no `lang`, and no `<head>`, `<title>` or `<main>`.

**Fix:** move it to `_dev/`. One `git mv`.

### 7. The mega menu's first keyboard activation closes it
`_system/shell.js`. `focusin` on the item calls `set(true)`, so tabbing to the trigger opens the panel. The click handler is `set(panel.hidden)`, so the Enter or Space that follows sees an open panel and closes it.

A keyboard user tabs to "Industries", the panel opens on its own, they press Enter to open it, it shuts. Second Enter reopens. A screen reader also hears `aria-expanded="false"` on arrival and then the state flips without the user acting.

**Fix:** either drop the `focusin` open and let the button own the state, or make the click handler idempotent for keyboard (`set(true)` on `keydown` Enter/Space, toggle on pointer). The Escape handling and the deliberate no-focus-trap decision are both right and should stay.

### 8. Root-absolute paths break the README's own preview promise
Every `href` and both `<link rel="stylesheet">` are site-root absolute (`/_system/tokens.css`, `/find-capability/`). `shell.js:12` documents this and names the workaround. `README.md` still says "Open any file in `pages/` directly in a browser and it works." Opened over `file://` the site now renders completely unstyled with a dead nav, which is how anyone forwarded the folder will first see it.

**Fix:** update the README rule to name the static-server command, and put the same line at the top of the handoff to Kim.

### 9. Head-tag inconsistency, unchanged from the first pass
- **Three title separators:** `|` on 17 pages, `·` on 10, a full stop on 3 (`The Congress. ConvergX Connect`, `The Congress app. ConvergX Connect`, `Get discovered. ConvergX Connect`).
- **Two pages with no site suffix:** `Platform`, `About ConvergX`.
- **Title Case on two titles:** `Aerospace and Defence`, `Mining and Natural Resources`, while `industries/index.html` renders both sentence case in its own link index. §2.3 bans Title Case.
- **Two pages with no meta description:** `congress/agenda/index.html`, `platform/vetting-and-introductions/index.html`. Down from five, so this was partly fixed and then dropped.

### 10. Two nav patterns still shipping side by side
22 of 30 pages carry a hand-written `<noscript>` nav and footer, 46 blocks in total. Eight do not: `about/network`, `find-capability`, `industries`, `industries/energy`, `industries/mining-natural-resources`, `platform`, `platform/trust-and-security`, `platform/whats-next`.

`README.md` rule 4 says nav and footer live in `shell.js` only. Unchanged from the first pass, and the split is the same eight pages. A nav change is a 23-file edit.

**Fix:** pick one. Emit the `<noscript>` fallback from `shell.js`, or strip it everywhere.

### 11. Sixteen inline `style` attributes across ten pages
All of them resolve through tokens, so no raw values leak, but they are layout decisions living outside `styles.css`. Worst two, because they override the type and spacing systems directly: `index.html:63` `style="font-size: var(--step-3)"` and `platform/modules/index.html:118`. The `.dots` height overrides are the most repeated.

**Fix:** promote the recurring ones to utility classes before freeze. Not a blocker, but it is where the next drift starts.

### 12. Fig. 1 and Fig. 3 are still numbered over empty slots
`find-capability/how-it-works/index.html:81` and `platform/vetting-and-introductions/index.html:126`. Both now carry a proper visible `[[PLACEHOLDER:]]` marker, which is a real improvement on the first pass, and the captions no longer describe content the reader cannot see. But the site still numbers Fig. 1 and Fig. 3 over nothing while Fig. 2 (`find-capability/confidentiality/index.html:106`) sits over a real table.

**Fix:** hold the numbers until the diagrams land, or renumber so the one real figure is Fig. 1.

---

## SEVERITY 3: WORTH A DECISION, NOT A BLOCKER

13. **`display--hero` absent on 11 pages.** §7.2 wants exactly one per page. `platform/modules/index.html:35` justifies its omission in the file, which is the right way to break the rule. The other ten do not. Same as the first pass.
14. **Both forms are `method="post" action="#"`.** The staged-form placeholder and `aria-describedby` are honest and correct, but a delegate who types a requirement and hits submit loses it to a page reload. Disable the submit until the endpoint lands.
15. **`Attribution Mechanism` is now printed for delegates.** Positioning §6 Ladder 6 and §12 both say the attribution argument is "made to Kim and the board, never printed for delegates." The row copy is bare ("Named intent. No build exists.") so the argument itself is not made, and the fifteen-module count requires the row. Flag it to Kim rather than change it.

---

## WHAT WAS SWEPT, AND HOW

| Check | Method | Result |
|---|---|---|
| `mode40`, any file, including comments | grep across html, css, js | zero |
| Licensing, white-label, franchise, "run your own event" | grep | zero |
| `AI[- ]match`, matching engine, intelligent match, algorithm, ML, recommendation engine | grep | 1 hit, `Matching Engine`, correct and matches reference |
| Invented numbers | every number word and digit extracted from rendered text plus meta descriptions, all 30 pages, each traced | 2 uncleared: items 1 and 4 |
| Module count agreement | h1, lede, meta description, `platform/index.html`, `whats-next` | fifteen everywhere, no stale twelve |
| Module status tags | all 15 `article.module` rows diffed against `_reference.html` | 15/15 tagged, strings identical to reference |
| Push claims | grep push, iOS, Android, notification | 3 instances, all qualified Android-only |
| App download promise | grep download, install, store | zero promises, install slot is a visible placeholder |
| Dead hrefs | every `href` and `src` in 30 pages plus `shell.js` resolved against the tree | 0 broken |
| External requests | grep http, CDN, `@import`, googleapis | zero |
| `<style>` blocks, raw hex, `rgb()`, `font-family` in pages | grep | zero, except `assets/brand/_preview.html`, item 6 |
| Invented classes | every `class=` token in 30 pages diffed against styles.css + tokens.css + shell.js | zero undefined |
| Banned colour, radius, shadow, gradient, in CSS | grep §2.1 and §2.2 patterns | clean. One `#ffffff` (`--paper`, the permitted one), `--radius: 0`, gradients limited to `.rule-vanish` and mask fades, one `box-shadow` and it is the focus indicator |
| `line-height: 1.5`, px font-size, `font-variation-settings`, `font-stretch` | grep | zero |
| Em dash, en dash, entities | `grep -P` U+2013/2014, `&mdash;`, `&ndash;`, numeric refs | zero |
| Emoji | perl scan U+1F300-1FAFF, U+2600-27BF, U+2190-21FF, U+2B00-2BFF, U+FE0F | zero. The one arrow glyph is `↓` in `shell.js`, `aria-hidden`, not an emoji |
| Banned jargon, 40 terms | grep | zero. "Solution provider" hits are the locked audience label |
| Hedges, negative parallelism | grep | zero |
| One h1 per page | count per file | 30/30 |
| Heading level skips | h-tag sequence per file | zero |
| Alt text on every image | all 4 photographs plus the shell logo | 4/4 have descriptive alt, both logo SVGs have `role="img"` and `aria-label`. One miss: `_preview.html`, item 6 |
| Labels on every form control | 13 controls across both forms | 13/13 `<label for>` plus `aria-describedby`, no placeholder-as-label |
| Mega menu keyboard and aria | read `wireMega`, traced focus and key paths | `aria-expanded`, `aria-controls`, `hidden`, Escape-from-anywhere and focus-restore-before-close are all correct. One defect, item 7 |
| `lang`, `<main>`, `<footer>`, skip link | count per file | 30/30 |

---

## THE SHORT VERSION

**Ship-blocking, in order:**
1. `about/index.html:68` "for ten years" becomes "for ten-plus years"
2. `platform/trust-and-security/index.html:70` cut or mark the self-signup claim
3. Four figcaptions, replace the "Working image, generated" note with a `[[PLACEHOLDER:]]` marker (`index.html:85`, `congress/index.html:61`, `get-discovered/index.html:83`, `industries/energy/index.html:66`)
4. `about/how-we-vet/index.html` cut "three years out"
5. `industries/aerospace-defence/index.html:90` and `industries/mining-natural-resources/index.html:67` add the market-context label agriculture already has

**Then the build list:** move `_preview.html` to `_dev/`, fix the mega-menu keyboard toggle, reconcile the README preview promise, settle the titles and the two missing meta descriptions, pick one nav pattern.

Third pass will re-sweep all of it. I will not assume any of it landed.

---

# REMEDIATION LOG, 2026-07-27 second session

Swept by pattern across the whole tree, never by the line numbers cited above. Re-verify rather
than trusting this list.

## Severity 1, honesty: all five closed
1. `about/index.html` "has for ten years" is now "has for ten-plus years", and the build comment
   that wrongly called "for ten years" the cleared string is corrected so the next editor cannot
   repeat it.
2. `platform/trust-and-security/index.html` self-signup clause CUT and replaced with a visible
   `[[NEEDS: ... from Tracy Gromniski]]`, plus a comment naming `who-is-in-the-room` as the one
   owner of that claim if it clears.
3. All four "Working image, generated" figcaptions replaced with the house
   `[[PLACEHOLDER: commissioned photograph, 1600x1000, cleared by Kim Van Vliet]]` marker. Swept:
   zero remaining anywhere.
4. `about/how-we-vet/index.html` "three years out" is now "years after the introduction".
5. Market-context labels added to aerospace and mining. **Worded differently on each page on
   purpose:** the label is not in the verbatim-asset ledger, so a third identical copy of
   agriculture's sentence would itself be a defect. The falsifiable "CPCSC is now appearing in new
   defence solicitations" clause was cut rather than left uncited.

## Severity 2, build
6. `assets/brand/_preview.html` moved to `_dev/brand-preview.html`. Nothing linked to it.
7. Mega-menu keyboard toggle FIXED at the root: the `focusin` open is removed, so the button owns
   the state. Verified in a browser: load closed, focus does not open, Enter toggles, Escape closes
   and returns focus to the trigger. Hover open and the no-focus-trap decision are unchanged.
8. NOT A DEFECT AT THIS PASS. `README.md` already names the static-server requirement and the
   command. The finding was written against an older README. Rule 3 was tightened anyway to say how
   the `<noscript>` block is maintained.
9. Titles normalised to `Page name | ConvergX Connect`, sentence case, on all 29 subpages; the root
   keeps the bare site name. Both missing meta descriptions written.
10. Nav split CLOSED, and not by picking one of the two options offered. `shell.js` cannot emit the
    `<noscript>` fallback, because `<noscript>` exists precisely for the run where `shell.js` never
    executes. So all 30 pages are now regenerated from ONE canonical block, which also closed the
    known gap where the fallback listed `/industries/` without the four verticals.
11. OPEN. Inline styles not promoted to utilities.
12. OPEN. Figure numbering unchanged.

## Also fixed, from the red team run (`_copy/RED-TEAM-REPORT.md`)
- The bare word "standard" was doing two jobs, the vetting standard and the match-scoring standard,
  and three of six adversarial readers collapsed them into a false contradiction. Disambiguated on
  both `about/how-we-vet` and `platform/whats-next`, with a link between them.
- `industries/mining-natural-resources` said ConvergX finds "a certified Indigenous business",
  which implies ConvergX checks the certification. `get-discovered/how-vetting-works` discloses
  that certifications are recorded as stated and validated by nobody. In the one domain where the
  certificate IS the requirement, that was the sharpest landmine on the site. Now states plainly
  that confirming certification against the issuing body is the reader's step.

## Known state a third pass should measure, not re-derive
- **19 rendered `[[NEEDS:]]` / `[[PLACEHOLDER:]]` markers across 16 pages.** "Kim Van Vliet"
  appears 15 times in rendered copy and every occurrence is inside one.
- Both forms still announce that they submit nowhere. Every CTA on all 30 pages ends there.
- `platform/trust-and-security` asserts role access is enforced by the application while
  `platform/modules` tags Role-Gated Portals **In development**. Unresolved, needs Tracy.
- Verified clean after all of the above: 0 broken links across 30 pages plus `shell.js`, 0 `mode40`
  including comments, 0 em or en dashes, 0 raw hex outside `_dev`, 15 module rows all tagged.
