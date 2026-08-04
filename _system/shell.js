/* ConvergX Xtend. SHELL.
 *
 * Injects the header nav and footer from ONE definition so no page
 * can drift. Vanilla JS, zero dependencies, no menu
 * behaviour: the mobile nav is a native details/summary disclosure
 * and works with this script absent.
 *
 * Degradation: every page carries a noscript link list inside its
 * header and footer placeholders. If this file never runs, the page
 * is still readable and navigable.
 *
 * Links are site-root absolute. Preview through any static server
 * (for example: python3 -m http.server from the Website folder).
 */
(function () {
  "use strict";

  /* The single navigation definition: the primary items, one utility
   * link, one CTA. No count is stated here or anywhere below. The bar is
   * a flex row with a gap and the footer is an auto-fit grid, so both
   * absorb another item without a redesign, and a typed count would be
   * the first thing to go stale when one arrives.
   *
   * An item renders ONLY when its pages exist: `live` is the gate, and a
   * nav row pointing at an unwritten page is a link to a 404 on every
   * page of the site. The /xpand/ pages shipped on 2026-07-28 and were rebuilt 2026-07-29, so Xpand
   * is live. A new item is added here with live:false until its page
   * exists, then that one word flips. */
  var NAV = [
    { label: "Industries",     href: "/industries/", mega: "industries", live: true },
    { label: "Platform",       href: "/platform/",   mega: "platform",   live: true },
    /* Label and path differ deliberately. "The Congress" is the event's
     * real name and a distinctive asset; "Conference" is the plain word
     * that tells a cold reader from another sector what the item is. The
     * panel standfirst resolves the two. No path changes.
     *
     * 2026-07-30, Lindsay Robertson's call: the definite articles came
     * off all three items. The reason is user feedback on ConvergX's own
     * site, not tidiness. Readers cannot find the conference, and cannot
     * tell Xpand from Xchange. Her line was that nobody knows what a
     * ConvergX Xchange is. Kim keeps the X-names, so they stay on the
     * homepage blocks and their logos; the BAR carries the plain word for
     * the thing. Bar label and brand name are now doing separate jobs. */
    { label: "Conference",     href: "/congress/",   mega: "congress",   live: true },
    /* Xpand takes a panel, decided 2026-07-28. The earlier reading was that
     * two pages do not earn one; what that missed is that the bar now shows
     * a panel on every other item, so the one item without one reads as the
     * shallow one rather than as the short one. The two rows are the two
     * pages, and they are the same rows the footer carries.
     *
     * The label is the short word. The full name, "Xpand Commercialization
     * Zone", is permitted ONCE and only on /xpand/. Every other item in the
     * bar is already multi-word, and one more long one is what breaks the
     * row at the narrow end of the desktop range. The ledger would not
     * permit the repetition anyway. The full name belongs on the page.
     *
     * 2026-07-30: the bar label is now "Consulting", not "Xpand". Lindsay
     * Robertson's call: Xpand is being built as a consulting service, and
     * a reader arriving cold cannot tell it from Xchange. Her framing was
     * the question the reader is actually asking, are you looking for
     * consulting or for congresses. The bar answers that question; the
     * brand name Xpand stays on the page, the homepage block and the
     * logo. Path unchanged, so nothing inbound breaks. */
    { label: "Consulting",     href: "/xpand/",     mega: "xpand",      live: true },
    /* Capital, added 2026-08-04 on Chip's instruction: a fourth line of
     * business, bridge financing for the companies ConvergX is already
     * connecting. Practice name ConvergX Capital, product name Xpedite.
     *
     * THE BAR LABEL IS THE PLAIN WORD, "Capital", and that is the same rule
     * that turned Xpand into Consulting on 2026-07-30. Every X-name in this
     * business (Xchange, Xpand, Xtend, Xpedite) is a brand a cold reader
     * cannot decode, so the bar answers the question the reader is actually
     * asking, which here is "do you do financing". Xpedite lives on the page,
     * the homepage block and the logo, exactly as Xpand does.
     * PATH IS /xpedite/, the product name, which is the same shape as
     * /xpand/ sitting under a bar that says Consulting. Do not "align" the
     * path to the label; nothing inbound would survive it and the existing
     * pair already sets the precedent.
     *
     * LAST IN THIS ARRAY, which puts it between Consulting and About in the
     * rendered bar. About is NOT in NAV, it is appended as a utility item
     * further down, so "between Consulting and About" is the end of NAV.
     * FIVE PANELS NOW. Watch the bar at the narrow end of the desktop range
     * after any future label change: this is the item that took it from four
     * to five and the row has no room left for a long one. */
    { label: "Capital",        href: "/xpedite/",   mega: "capital",    live: true }
  ];
  /* About is a UTILITY link and it now TAKES A PANEL. Chip, 2026-07-29:
   * "you probably have to add a mega menu for About so those pages are
   * accessible." /about/how-we-vet/, /about/leadership/ and
   * /about/network/ were reachable only from the footer, which is a
   * defect, not a placement decision. Spec 2 says About never takes a
   * panel; Chip's instruction supersedes that line.
   *
   * IT STAYS A UTILITY LINK RATHER THAN BECOMING A FIFTH PRIMARY ITEM,
   * and the reason is the item that is coming. NAV is the primary group
   * and a further top-level item is known to be on its way. Promoting
   * About would seat it inside that group and it would then have to move
   * again when the real item arrives. Keeping it after the group costs
   * nothing a reader can feel now that it has a panel, and it leaves the
   * primary row's order untouched.
   *
   * It is STRUCTURALLY a utility link and VISUALLY a primary one: same
   * font, size, weight, ink and hover as the items beside it. The 11px
   * mono micro-label treatment it used to carry is retired (Chip,
   * 2026-07-28), and the .nav-util hook went with it. What still makes it
   * a second class is that it sits after the primary items. */
  var UTILITY = { label: "About", href: "/about/", mega: "about" };
  var CTA = { label: "Request access", href: "/access/request/" };

  /* ---- THE NOTICE BAR ----
   * One line of orange above the header, on every page, pointing at the
   * one page that takes money. Added 2026-07-28 at Chip's request.
   *
   * COLOUR IS NOT A CHOICE HERE. Type on the accent panel is
   * --accent-ink, near-black, measured 5.76:1. Light type on this orange
   * measures 3.42:1 and fails, which is why --accent-ink exists as its
   * own token. Never light type on orange, anywhere, ever.
   *
   * COPY, rewritten by Chip 2026-07-31. Their own bar shouts, in caps,
   * with exclamation marks and a "secure your spot" line. The facts are
   * borrowed; the voice is not. Cleared facts and nothing else: the ten
   * years, the dates, and the countdown below. No attendance figure, no
   * delegate or country count, no "limited spots". Every scarcity device
   * is a claim about demand that nobody has verified, and this bar
   * renders on every page, so a soft one would be the most-repeated
   * unverified claim on the site. A countdown to a published start time
   * is not a scarcity device: it makes no claim about how many seats are
   * left. It states an interval to an instant derived entirely from
   * ConvergX's own published agenda.
   *
   * THE CITY CAME OUT on 2026-07-30 (Chip). The bar has one line to
   * work with and Calgary was the least load-bearing thing on it. It is
   * still on the Congress page, which is where somebody deciding whether
   * to travel is actually reading.
   *
   * THE TEN YEARS ARE BACK, DELIBERATELY, AND THEY COST LEDGER BUDGET.
   * This supersedes the note that stood here on 2026-07-30 saying the
   * figure had been removed and that restoring it would be a regression.
   * That note is wrong now. Do not act on it and do not reinstate it.
   *
   * The history, because the number matters. Spec 3.4 rations the tenth
   * year figure to TWO instances. Chrome renders on 52 pages, so any
   * chrome instance spends 52. The bar carried the figure until
   * 2026-07-30, sat at 54 instances against a budget of 2, was cut back
   * to exactly 2, and Chip then rewrote the line as "Celebrate 10 years
   * of ConvergX" on 2026-07-31, which puts it back to 54. He wrote the
   * line knowing this; it is his call and it is made.
   *
   * The ledger governs the FIGURE, not the literal string, so "10 years"
   * spends the same budget "the tenth year" does. Rewording does not
   * dodge it. The two page-copy instances still stand and are still
   * correct: the /congress/ hero eyebrow and the homepage Conference
   * lede. Do not remove either to "make room". If the count ever needs
   * bringing back to budget, the bar is the instance to drop, because
   * one bar edit recovers 52 and a page edit recovers 1.
   *
   * NOT DISMISSIBLE, deliberately. A dismiss control is persistent state:
   * storage to write, storage to read on every page, a decision about
   * what happens in private mode or with storage blocked, and a support
   * question the first time it does not stick. The bar is one line of
   * chrome that scrolls away and never comes back on that screenful. It
   * is not an interstitial, so it does not need an exit. */
  var NOTICE = {
    /* "ConvergX", never "Convergx". Their mark, their casing. */
    text: "Celebrate 10 years of ConvergX, Sep 22 to 24, 2026.",
    link: "Register",
    /* The Congress is a one-pager as of 2026-07-30, so this points at the
     * section rather than at the page that used to hold it. The id lives
     * in congress/index.html; a stub still answers the old address. */
    /* REPOINTED 2026-07-31 from /congress/#tickets to /congress/register/.
     * #tickets is now a summary that hands off to the storefront, so the site
     * bar was sending every reader on every page to a section whose only job
     * is to send them one click further. The bar goes where the prices are. */
    href: "/congress/register/"
  };

  /* ---- THE COUNTDOWN ----
   *
   * THE TARGET MOVED ON 2026-07-31, and this is the most important note
   * in the file because it supersedes a documented value.
   *
   * It used to be 1790172000, copied straight from their Divi module.
   * That epoch is 08:00 Calgary on WEDNESDAY 23 September: the Welcome
   * and Opening Remarks, which is the opening of DAY TWO. It was safe
   * only because the label said so, "Opening remarks in".
   *
   * Chip's rewrite deletes that label and ends the sentence with the
   * word "away". "Away" attaches to the event, and the event starts on
   * the 22nd, printed in the same sentence. Pointing "away" at day two
   * would have overstated the wait by 32 hours against a date sitting
   * inches to its left, on 52 pages. Small, wrong, and everywhere.
   *
   * So the target is now the START of the Congress. It is NOT midnight
   * on the 22nd: midnight is an instant nobody published, and inventing
   * one to fix a copy problem is the exact move the honesty gates ban.
   * It is 08:00 on Tuesday 22 September, the first item on the first day
   * of ConvergX's own published agenda, `08:00 - 12:00 Executive
   * Roundtable`. Both halves are published: the clock time is in their
   * agenda, and the zone is proved by their own epoch, which resolves
   * their published Wednesday `8:00` to 08:00 MDT. So agenda times are
   * MDT, and Tuesday 08:00 MDT is 1790085600.
   *
   * The two epochs differ by exactly 86400. Ours is theirs minus one
   * day: same clock time, first published day instead of second. Nothing
   * was invented and nothing was rounded.
   *
   * THE COST, stated plainly: a delegate comparing the two sites sees
   * numbers one day apart. That is accepted. An internally consistent
   * sentence beats parity with a figure almost nobody cross-checks, and
   * the alternative was a bar that contradicts its own dateline.
   *
   * THE CONNECTIVE WORDS LIVE INSIDE .notice-countdown, never in
   * .notice-text, and that is structural rather than cosmetic. "Only"
   * and "away." are meaningless without digits between them. When the
   * countdown removes itself at the target, and on the no-JS run where
   * it never exists at all, they have to leave with it. In .notice-text
   * the bar would strand the reader on "... 2026. Only away." This
   * matters MORE now than it did with a labelled widget: a flowing
   * sentence breaks worse than a label when its digits vanish.
   *
   * ABSOLUTE ON BOTH SIDES, target minus Date.now()/1000, which is their
   * mechanism. Every viewer sees the same remaining time in every
   * timezone. A local-time countdown would show one number in Calgary and
   * a different one in Halifax for the same instant, and one of them
   * would be wrong.
   *
   * PROGRESSIVE ENHANCEMENT, the same idiom as the quote carousel in
   * styles.css section 26. The base state IS the no-JS state: the bar
   * without a countdown, which is what all 52 hardcoded copies carry.
   * .is-live goes on .notice only once the first tick has written real
   * digits, so the 00s below are never seen. Never move a base rule into
   * .is-live.
   *
   * REDUCED MOTION. A digit changing every second is motion. Under
   * reduce, the seconds segment is not driven at all, it is removed, and
   * the rest ticks once a minute. Removing beats freezing: a frozen
   * seconds box is a wrong number sitting on the page.
   *
   * AT ZERO it stops, clears its interval and removes itself, taking the
   * whole second sentence with it and leaving the first one standing.
   * It never renders a negative, never parks on zeros, and never says
   * anything is happening now, because that is a claim about a room
   * nobody here can see.
   *
   * NO ZERO PADDING, unlike the widget this replaced and unlike their
   * own module, which pads days to three digits and renders `055`. This
   * is prose now: "3 hours" is English and "03 hours" is a dashboard.
   * The cost is that the line changes width as a value falls through
   * ten, which on a centred row is a small shift. If that shimmer ever
   * matters it is a min-width in ch on .cd-n, in the stylesheet. It is
   * not padding here, because padding would put the widget back into the
   * sentence. */
  var COUNTDOWN_TARGET = 1790085600;
  /* Read as one sentence: LEAD, the units as prose, then TAIL. */
  var CD_LEAD = "Only";
  var CD_TAIL = "away.";
  var CD_UNITS = [
    { key: "days",    one: "day",    many: "days" },
    { key: "hours",   one: "hour",   many: "hours" },
    { key: "minutes", one: "minute", many: "minutes" },
    { key: "seconds", one: "second", many: "seconds" }
  ];

  /* Prose joins, not a separator glyph: commas between, "and" before the
   * last. Computed from the LIVE unit count rather than hardcoded,
   * because reduced motion drops seconds and the "and" has to move up to
   * minutes on its own. A hardcoded join would read "23 hours, 15
   * minutes and" with nothing after it. */
  function cdSep(i, last) {
    return i === last ? "" : i === last - 1 ? " and " : ", ";
  }
  /* SELF-REMOVING, and this is the whole mechanism. A hardcoded date that
   * outlives its event is a false claim on every page of the site, and a
   * note asking someone to remember in September is not a mechanism. The
   * bar stops rendering at midnight after the last day, Calgary time
   * (UTC-6 in September). Nothing else needs touching then. */
  var NOTICE_UNTIL = Date.parse("2026-09-25T00:00:00-06:00");

  /* THE TWO DOORS. Locked distinctive assets: the same two words in nav,
   * panel, footer, chooser, h1 and body copy, at every occurrence,
   * forever. Never "For buyers", "For suppliers", "Buyer side", "Supply
   * side" or any synonym. The pages moved one level deeper on
   * 2026-07-28; the words did not move and never do.
   *
   * Every other structure in this file that needs a door reads it from
   * here, so a path can only ever be wrong in one place. */
  var DOORS = [
    { label: "Find capability",
      href:  "/platform/find-capability/",
      note:  "Where a requirement goes when your own supply base cannot fill it.",
      /* The long note is the panel block's only. Everywhere else the doors
       * appear (footer, chooser, page copy) still uses `note`, so lengthening
       * one did not lengthen all of them. */
      long:  "Where a requirement goes when your own supply base cannot fill it. A person at ConvergX decides who answers it.",
      /* ORANGE, and it is the primary door. Chip, 2026-07-29: this is the more
       * prominent of the two, and the accent is the one ground that reads on
       * every surface without depending on the inversion below. */
      tone:  "accent" },
    { label: "Get discovered",
      href:  "/platform/get-discovered/",
      note:  "Past performance is scored inside a sector, and the score does not travel.",
      long:  "What makes you worth choosing is not on your website. This is how a room in another sector finds out.",
      tone:  "invert" }
  ];

  /* Number words, so no count in this component is ever typed. A
   * hardcoded "four" that outlives a sector being added or pulled is a
   * false claim in the one component that renders on every page. */
  var NUM = ["zero", "one", "two", "three", "four", "five", "six", "seven",
             "eight", "nine", "ten", "eleven", "twelve"];
  function numWord(n) { return NUM[n] || String(n); }

  /* The Industries panel. One line each, drawn from the copy already live
   * on /industries/ and on each sector page: no new claim enters the site
   * through the nav. No figure appears here by design, the distance and
   * the window length on the index page are deliberately not carried into
   * a component that renders on every page.
   *
   * THE GATE. This array is the single source of truth for which sectors
   * exist. A sector enters it only once its page is written and has
   * passed the research gate. A sector that is not here has no nav row,
   * no hub row and no page. Every count that renders is generated from
   * this length, never typed.
   *
   * Order is ALPHABETICAL and identical everywhere. Any other order
   * encodes something: researched-first would make the nav visibly stop
   * where the research stopped. Alphabetical asserts nothing.
   *
   * 2026-07-29: construction, manufacturing, military and technology
   * joined. Each page was read before its descriptor was written and
   * every line below is drawn from copy already live on that page. */
  var INDUSTRIES = [
    { label: "Aerospace and defence",
      href:  "/industries/aerospace-defence/",
      note:  "Qualification takes quarters. The obligation has a date." },
    { label: "Agriculture",
      href:  "/industries/agriculture/",
      note:  "A harvest window with no second chance, and the engineering that came out of it." },
    { label: "Construction",
      href:  "/industries/construction/",
      note:  "Bonding capacity and safety history clear the gate. Neither one reads the work." },
    { label: "Energy",
      href:  "/industries/energy/",
      note:  "Long-lead packages committed during engineering, off a vendor list built from the last project." },
    { label: "Manufacturing",
      href:  "/industries/manufacturing/",
      note:  "The approval belongs to the tool, not the shop. None of them travels." },
    { label: "Military",
      href:  "/industries/military/",
      note:  "A serviceability gap has no date on it. Both routes back run through whoever holds the contract." },
    { label: "Mining and natural resources",
      href:  "/industries/mining-natural-resources/",
      note:  "Finding the part is not the hard problem. Qualifying the second source is." },
    { label: "Technology",
      href:  "/industries/technology/",
      note:  "An authorization clears one buyer. Passing it for somebody else buys nothing here." }
  ];

  /* The ninth cell of the industries grid, and it is NOT a sector. It sits
   * in the last position and it is not counted: every count on this panel
   * is generated from INDUSTRIES.length, which this is not in.
   *
   * The destination is the existing door, /access/request/, under the
   * locked CTA label from spec 3.5. No new label, no new destination, no
   * second front door invented for a nav cell.
   *
   * THE LINE IS DRAWN FROM LIVE COPY, like every other descriptor here.
   * /access/request/ already tells a reader why it asks which industries
   * they source from: "This is how ConvergX works out which industries
   * have not been looked at." That sentence is what makes this cell
   * honest. It promises no page, no timeline and no new sector, and it
   * does not say ConvergX will do anything, because the request page is
   * explicit that no timeline can be given honestly. */
  var PROMO = {
    label: "Another industry",
    note:  "Not one of these? Name it on the request form. That is how ConvergX works out which industries have not been looked at.",
    cta:   "Request access",
    href:  "/access/request/"
  };

  /* The Platform panel. Three columns: the two doors, the platform's own
   * pages, and the fifteen modules grouped by what they are FOR.
   *
   * The doors are the FIRST TWO ROWS of this panel, above the platform's
   * own pages, under their own label. Being one level deeper in the URL
   * is a real cost and this is the first of the four ways it is paid
   * back. They are never the last thing in the panel.
   *
   * 2026-07-29, CHIP'S DECISION. This standfirst used to carry a build
   * state and a live count. Both were REMOVED DELIBERATELY, along with
   * every status tag on the site. They are not to be restored, renamed,
   * or replaced with a substitute signal, without Chip.
   *
   * 2026-07-29, CHIP'S SECOND DECISION, and it REVERSES a nav rule.
   * The panel used to name the five groups and never an individual
   * module. It now names every module, because Chip's instruction is that
   * each one is a single click from the menu bar. The old rule's reason
   * was real (a menu row is a name with no room around it), so the
   * modules render as a GRID of group cells rather than a stack: the
   * group label supplies the context the row cannot carry itself.
   *
   * The module column that this replaced was a summary of the five groups
   * with no link on any of them, plus one link to the modules page. Chip
   * pulled it in the same instruction. It was wayfinding to a place the
   * reader could already reach from the column beside it.
   *
   * Nothing in this panel may describe a module as automatic, intelligent
   * or AI-driven. Phase 1 matching is manual and admin-brokered: a person
   * decides. */

  /* THE OVERVIEW BLOCK. Chip, 2026-07-29, and it REPLACED a four-row link
   * list, not a design that was missing one.
   *
   * That list had four rows: the overview, the modules, vetting, and trust.
   * All four are now one page, so three of the rows pointed at parts of the
   * fourth and the column was a table of contents for a single destination.
   * It is a block instead: one route, stated once, with the parts named
   * underneath as what is ON the page rather than as four places to go.
   *
   * IT CARRIES NO SUB-LINKS. It listed the page's four parts as anchors
   * until Chip pulled them the same day: the merged page opens with that
   * exact index, so the panel was a table of contents for a table of
   * contents. One route in. */
  var PLATFORM_OVERVIEW = {
    title: "Platform overview",
    href:  "/platform/",
    note:  "What the platform is, what is in it, why it exists and how it gets used."
  };
  /* The eyebrow came off on 2026-07-29 (Chip). It said "The platform" above a
   * block titled "Platform overview" inside a panel opened from a bar item
   * called The Platform. Three names for one thing in 40 vertical pixels. */
  /* Every module, grouped, with a real destination. There is no per-module
   * page and there should not be one, so a module row points at its own
   * anchor on /platform/modules/. The anchors are ids on the .module
   * articles and they are generated from the module names, so a renamed
   * module breaks visibly here rather than silently scrolling nowhere.
   * The group order is the order the work happens in and it matches
   * /platform/modules/ exactly. */
  var PLATFORM_MODULE_GROUPS = [
    { label: "Stating the requirement", modules: [
      { label: "Opportunity Board",           href: "/platform/modules/opportunity-board/" },
      { label: "RFP Intake and Analysis",     href: "/platform/modules/rfp-intake-and-analysis/" },
      { label: "Tender Scraping",             href: "/platform/modules/tender-scraping/" },
      { label: "RFP Authoring",               href: "/platform/modules/rfp-authoring/" }
    ] },
    { label: "Deciding who should meet", modules: [
      { label: "Supplier Scoring",            href: "/platform/modules/supplier-scoring/" },
      { label: "Matching Engine",             href: "/platform/modules/matching-engine/" },
      { label: "Configurable Scoring",        href: "/platform/modules/configurable-scoring/" }
    ] },
    { label: "The introduction and its record", modules: [
      { label: "Procurement Workflow Engine", href: "/platform/modules/procurement-workflow-engine/" },
      { label: "Role-Gated Portals",          href: "/platform/modules/role-gated-portals/" },
      { label: "Document Request Workflow",   href: "/platform/modules/document-request-workflow/" },
      { label: "Attribution Mechanism",       href: "/platform/modules/attribution-mechanism/" }
    ] },
    { label: "The Congress", modules: [
      { label: "Congress App",                href: "/platform/modules/congress-app/" },
      { label: "Event Management",            href: "/platform/modules/event-management/" }
    ] },
    { label: "Reference", modules: [
      { label: "Knowledge-Base Chat",         href: "/platform/modules/knowledge-base-chat/" },
      { label: "Trade Agreements Library",    href: "/platform/modules/trade-agreements-library/" }
    ] }
  ];

  /* The Industries panel used to carry a second column holding a "Two
   * paths" chooser built from the doors. It was REMOVED on 2026-07-29 at
   * Chip's instruction: with eight sectors the panel is a grid, and a
   * chooser wedged beside it made the sectors the aside. The doors keep
   * their place, first, in the Platform panel, which is the panel that
   * owns them. Nothing about the doors themselves changed. The SIDES
   * array and its builder went with the column, because an array read by
   * nothing is a fact waiting to go stale.
   *
   * The Conference panel. Two columns.
   *
   * Column one is the Congress itself. Column two is the convening that
   * is NOT the Congress, and the split is the pages' own: the
   * partnerships page opens "ConvergX convenes inside events it does not
   * run", and the regional page opens on a region, not a company, doing
   * the asking. Nine rows in one column ran past the fold on a laptop;
   * two columns of the existing grid cost no new rule.
   *
   * Standfirst is the dates and the city ONLY. The tenth year is a
   * rationed figure and this component renders on every page of the
   * site, so it does not go in the nav. */
  var CONGRESS_STANDFIRST = "Sep 22 to 24, 2026. Calgary.";

  /* MATCHED TO THE PAGE'S OWN BAR, 2026-08-04. Chip: "Match the mega-menu
   * links for The Conference to the sub menu links. Actually, keep The App in
   * the mega menu."
   * Column one is now exactly the five the subnav carries, in the same order,
   * so a reader who learns one has learned the other. Column two is the four
   * destinations that are not sections of the one-pager, plus The app, which
   * Chip pulled from the bar but kept here: it is a real page and the bar was
   * the only thing crowding it out.
   * OVERVIEW POINTS AT THE PAGE ROOT, not at #about like the bar does. The bar
   * points at #about only because a bar sticky BELOW the hero cannot usefully
   * address the hero above it. Arriving from another page has no such
   * constraint, and the top of the Conference page is the overview.
   * ORIGINAL NOTE, still true:
   * EIGHT ITEMS, TWO COLUMNS OF FOUR. Chip, 2026-07-31: "add all of the
   * menu items back to the Conference mega menu. They'll just link to the
   * respective sections on the stand alone page."
   *
   * THIS REVERSES the 2026-07-30 cut to four. That cut was made because
   * Speakers, The app, Regional Xchanges and Xchange Partnerships had no
   * home once the one-pager absorbed them, and pointing the nav at four
   * dead standalone pages would have given the site two sources of truth.
   * The anchors solve that: the nav can carry all eight WITHOUT the
   * duplication, because six of the eight resolve to a section of
   * /congress/ rather than to a second copy of it.
   *
   * MIXED TARGETS, and the mix is the point. Six rows are anchors on the
   * one-pager. Two rows are real pages and stay real pages:
   *   Register -> /congress/register/
   *   Sponsor  -> /congress/sponsor/
   * Chip, same instruction: "Register and Sponsor should still be
   * standalone pages that go into more details." They are the storefronts,
   * they carry the per-product prices, inclusions and tax qualifiers, and
   * the one-pager's #tickets and #sponsorship sections are summaries that
   * hand off to them. Do NOT repoint these two at the anchors: that would
   * bury the detail a buyer came for.
   * Regional Xchanges and Xchange Partnerships are also real pages and were
   * never part of the one-pager.
   *
   * THE SPLIT IS UNCHANGED in meaning: column one is what the Congress is,
   * column two is how you take part in it and what convening happens
   * outside it. Four and four, so the panel stays a rectangle. */
  var CONGRESS_PAGES = [
    { label: "Overview", href: "/congress/",
      note:  "Three days composed one introduction at a time." },
    { label: "Speakers", href: "/congress/#speakers",
      note:  "The people ConvergX has announced, with roles as it publishes them." },
    { label: "Agenda",   href: "/congress/#agenda",
      note:  "The published schedule for all three days, one disclosure per day." },
    { label: "Accommodations", href: "/congress/#accommodations",
      note:  "Four Calgary hotels ConvergX publishes, and the rate code covering two." },
    { label: "Questions", href: "/congress/#faq",
      note:  "Cost, vetting, sponsorship and the practicalities, answered in short." }
  ];
  /* REGISTER AND SPONSOR LEAD THIS COLUMN, 2026-08-04. Chip: "there should be
   * the most emphasis on the right on Register and Sponsor."
   * They were fourth and fifth behind The app, and they are the only two rows
   * in the whole panel that lead somewhere a reader can act. Order is the
   * cheapest emphasis there is and it costs no new component: first in a
   * five-row column is read first, and .nav-mega-cta gives the pair the weight
   * step on top of it.
   * The label changed with them. "Taking part." described a mixed list; this
   * column now opens with the two commercial doors, so it says so. */
  var CONGRESS_TAKEPART_LABEL = "Take part.";
  var CONGRESS_TAKEPART = [
    { label: "Register",             href: "/congress/register/", cta: true,
      note:  "Three passes, priced and published, and what a registration does not buy." },
    { label: "Sponsor",              href: "/congress/sponsor/",  cta: true,
      note:  "Nine tiers with what each one includes. Visibility in the room, never a match." },
    { label: "The app",  href: "/congress/the-app/",
      note:  "Who is here, what they are looking for, and the meeting you asked for." },
    { label: "Regional Xchanges",    href: "/congress/regional-xchanges/",
      note:  "A region asks the question, and the room is composed around it." },
    { label: "Xchange Partnerships", href: "/congress/partnerships/",
      note:  "ConvergX convenes inside events it does not run." }
  ];

  /* The About panel, added 2026-07-29. Same shape as the Conference
   * panel's first column: a standfirst in the label slot, then the rows.
   *
   * It exists because three live pages had exactly one route to them, the
   * footer, and a page reachable only from the footer is a page most
   * readers never reach. Descriptors are drawn from copy already live on
   * each page, the same rule every other panel runs under.
   *
   * /about/network/ renders as "Who we convene", which is its own page
   * title. The path says network and the label does not, deliberately:
   * "network" is the thing the page spends its whole argument denying,
   * that anything here accumulated. No path changes. */
  var ABOUT_STANDFIRST = "ConvergX convenes, and that is all it does.";
  var ABOUT_PAGES = [
    { label: "Overview",       href: "/about/",
      note:  "It does not manufacture, supply or bid, and has no side in the work it introduces." },
    { label: "How we vet",     href: "/about/#how-we-vet",
      note:  "Two sets of questions. One a file can answer, one it cannot." },
    { label: "Leadership",     href: "/about/#leadership",
      note:  "The people ConvergX names, with roles as ConvergX publishes them." },
    { label: "Who we convene", href: "/about/#who-we-convene",
      note:  "Nothing about this room accumulated. Both sides were composed, company by company." }
  ];

  /* The Xpand panel. Same shape as the Conference panel: one column, a
   * standfirst in the label slot, then the rows.
   *
   * HONESTY GATE. Both descriptors are drawn from copy already live on
   * the two pages, the same rule the other three panels run under. No new
   * claim enters the site through the nav. The standfirst is the pages'
   * own load-bearing sentence, that a stream has a named owner and the
   * owner is not ConvergX, which is the one thing a reader has to
   * understand before either row means anything.
   *
   * Row labels match the footer's Xpand column exactly. Two routes to the
   * same page that disagree on what it is called is a reader's problem,
   * not a tidiness one. */
  /* Rebuilt 2026-07-29. The previous rows described a "Stream Lead" model
   * taken from ConvergX's OLD site. Their relaunched site does not publish
   * it: "stream", "Stream Lead" and "stream owner" appear zero times across
   * every live page. Xpand is a consulting practice. Do not restore the
   * stream rows. Capture: _reference/CONVERGX-CO-2026-07-29.md */
  /* THE ROWS ARE ANCHORS NOW, not pages. Chip, 2026-08-03: "updating the
   * Consulting and About pages to be a similar single page design as the
   * Conference page. The mega-menu bar links can just link to the scroll
   * elements on the pages. I just feel like it's maybe silly to have so many
   * pages."
   * Same move the Conference panel made on 2026-07-31 and for the same reason:
   * pointing the nav at a standalone page whose content now also lives in a
   * section gives the site two sources of truth for one argument. The old
   * pages still exist and still resolve; nothing links to them.
   * The ids are the contract. They are declared on /xpand/ and /about/ and
   * listed in this file's sibling comment on ABOUT_PAGES. Rename a section id
   * and these rows break silently, because a bad fragment does not 404. */
  var XPAND_STANDFIRST = "A consulting practice. One problem, asked across industries.";
  /* FIVE ROWS as of 2026-08-04, was three, and they match the five links in
   * the page's own sticky subnav in the same order. That is the convention
   * Chip set on the Conference panel: "Match the mega-menu links for The
   * Conference to the sub menu links."
   * ONE DELIBERATE DIFFERENCE, and it is the same one /congress/ carries: row
   * one reads "Overview" and points at the page itself, where the on-page bar
   * reads "Where it sits" and points at the first section. A panel's first row
   * always offers the whole page. Do not "fix" this into a match.
   * "What readiness means" shortened to "Readiness" alongside the subnav, for
   * the same crowding reason. The section head still says the full phrase. */
  var XPAND_PAGES = [
    { label: "Overview",        href: "/xpand/",
      note:  "Where a consulting engagement sits next to the platform and the Congress." },
    { label: "Who it is for",   href: "/xpand/#who-it-is-for",
      note:  "An organisation carrying a problem, and a company whose answer was built elsewhere." },
    { label: "The last mile",   href: "/xpand/#the-last-mile",
      note:  "Procurement, qualification and financing, the three things ConvergX names as the blockers." },
    { label: "What Xpand does", href: "/xpand/#what-xpand-does",
      note:  "Consulting, access to testing and validation, and the one that is not running." },
    { label: "Xpand Prep",      href: "/xpand/#xpand-prep",
      note:  "Getting a buyer to a requirement, and a supplier through a large buyer's questions." },
    { label: "How it works",    href: "/xpand/#how-it-works",
      note:  "Six phases, and the named document each of the first four ends in." },
    { label: "Readiness",       href: "/xpand/#what-readiness-means",
      note:  "TRL and the commercial scale, and why the stated floor is not the platform's." }
  ];

  /* CAPITAL. Added 2026-08-04 with the fourth line of business.
   *
   * THE STANDFIRST NAMES THE PRODUCT, because the bar label does not. A
   * reader who clicks "Capital" has to meet the word Xpedite somewhere before
   * the page, or the brand never attaches to the thing. Congress and Xpand
   * both get this for free (their standfirsts carry dates and a category);
   * this one has to do it deliberately.
   *
   * NO NUMBER, NO AMOUNT, NO RATE, NO TERM anywhere in this panel or its
   * notes, and that is not a style preference. ConvergX publishes nothing at
   * all about this service, so every word here traces to a one-sentence brief
   * from Chip. A menu note is copy like any other and the honesty gates do not
   * relax because the text is small.
   * The notes also stay silent on whether ConvergX lends or arranges, which is
   * a material legal distinction nobody has answered. Every note below is true
   * either way. Do not "clarify" one into existence.
   *
   * THE IDS ARE THE CONTRACT and they are declared on /xpedite/. A wrong
   * fragment does not 404, it just lands the reader at the top of the page,
   * so these are verified against the page after any edit to either file. */
  var CAPITAL_STANDFIRST = "Xpedite. Bridge financing, for deals ConvergX already brokered.";
  var CAPITAL_PAGES = [
    { label: "Overview",        href: "/xpedite/",
      note:  "Where bridge financing sits next to the Congress, the platform and Xpand." },
    { label: "Who it is for",   href: "/xpedite/#who-it-is-for",
      note:  "The buyer who decided, and the supplier waiting to be paid for saying yes." },
    { label: "How it works",    href: "/xpedite/#how-it-works",
      note:  "What bridge financing is, in plain words, for a reader who has never used it." },
    { label: "What is settled", href: "/xpedite/#what-is-settled",
      note:  "What ConvergX will state at this stage, and what it deliberately will not." }
  ];

  /* Footer sitemap.
   *
   * FIVE COLUMNS, AND THEY ARE THE FIVE NAV ITEMS. Chip, 2026-07-31:
   * Industries, The Platform, The Conference, Consulting, About. That is
   * the whole instruction and it is a good one, because the previous five
   * ("The Platform", "The two doors", "The Congress", "Xpand", "ConvergX")
   * were a different taxonomy from the header's, so a reader who learned
   * the nav had to learn the footer separately.
   *
   * WHAT MOVED to make the columns match:
   *   - "The two doors" is gone as a column. Its eight pages fold under
   *     The Platform, which is the panel that owns them in the header too.
   *     They keep their door-qualified labels: two rows both reading "How
   *     it works" in one column is not a list, it is a puzzle.
   *   - Industries gains a column of its own. All eight sectors were
   *     previously reachable from the footer only as a single "Industries"
   *     link, which is one route to eight pages.
   *   - "ConvergX" becomes "About" and sheds Industries. Access, Request
   *     access and Apply to join stay with it: they are the site's two
   *     doors as ACTIONS rather than as explainers, and they have no
   *     column of their own in a five-that-match-the-nav scheme.
   *   - "Xpand" becomes "Consulting", matching the header relabel Chip
   *     made on 2026-07-30. The paths do not change, only the label.
   *
   * The footer still carries EVERY page the panels carry, which is what
   * makes the no-JS run navigable. Nothing was dropped to get the count
   * down, and The Platform column being the long one is the honest shape:
   * it is the part of the site with the most pages.
   *
   * Agenda and Speakers point at SECTIONS of the one-pager, not at their
   * old standalone pages, which no longer exist. */
  /* INDUSTRIES CAME OUT OF THE FOOTER, 2026-08-04, Chip's call: "Maybe you
   * need to remove Industries from the footer just to keep it to 5 columns."
   * Capital had just made a sixth column, which wrapped About onto a row of
   * its own at --page-max. Five columns is the shape; the alternative was
   * narrowing every column to fit six, which costs all five to fix one.
   *
   * WHY THIS COLUMN AND NOT ANOTHER, and why it costs no navigability: the
   * eight sectors are the ONE group already reachable two other ways from
   * every page. They fill their own mega panel as a grid, and the no-JS
   * <noscript> block in every page's <header> lists all eight under
   * Industries. Every other footer column is the only place its rows are
   * gathered. So the rule this footer was built on, that it carries every
   * page the panels carry, is bent here knowingly and only here: Industries
   * is not lost, it is not duplicated a third time.
   * The header bar still carries Industries as a top-level item, so the
   * section itself did not get quieter, only its footer repetition. */
  var FOOTER = [
    { title: "The Platform", links: [
      { label: "Overview",                   href: "/platform/" },
      { label: "All modules",                href: "/platform/#modules" },
      { label: "Vetting and introductions",  href: "/platform/#vetting-and-introductions" },
      { label: "Trust and security",         href: "/platform/#trust-and-security" },
      { label: "Find capability",            href: "/platform/find-capability/" },
      { label: "How Find capability works",  href: "/platform/find-capability/how-it-works/" },
      { label: "What vetting means",         href: "/platform/find-capability/what-vetting-means/" },
      { label: "Confidentiality",            href: "/platform/find-capability/confidentiality/" },
      { label: "Get discovered",             href: "/platform/get-discovered/" },
      { label: "How Get discovered works",   href: "/platform/get-discovered/how-it-works/" },
      { label: "How vetting works",          href: "/platform/get-discovered/how-vetting-works/" },
      { label: "Who is in the room",         href: "/platform/get-discovered/who-is-in-the-room/" }
    ]},
    { title: "The Conference", links: [
      { label: "Overview",             href: "/congress/" },
      { label: "Agenda",               href: "/congress/#agenda" },
      { label: "Speakers",             href: "/congress/#speakers" },
      { label: "The app",              href: "/congress/the-app/" },
      { label: "Register",             href: "/congress/register/" },
      { label: "Sponsor",              href: "/congress/sponsor/" },
      { label: "Regional Xchanges",    href: "/congress/regional-xchanges/" },
      { label: "Xchange Partnerships", href: "/congress/partnerships/" }
    ]},
    { title: "Consulting", links: [
      { label: "Overview",        href: "/xpand/" },
      { label: "Who it is for",   href: "/xpand/#who-it-is-for" },
      { label: "The last mile",   href: "/xpand/#the-last-mile" },
      { label: "What Xpand does", href: "/xpand/#what-xpand-does" },
      { label: "Xpand Prep",      href: "/xpand/#xpand-prep" },
      { label: "How it works",    href: "/xpand/#how-it-works" },
      { label: "Readiness",       href: "/xpand/#what-readiness-means" }
    ]},
    { title: "Capital", links: [
      { label: "Overview",        href: "/xpedite/" },
      { label: "Who it is for",   href: "/xpedite/#who-it-is-for" },
      { label: "How it works",    href: "/xpedite/#how-it-works" },
      { label: "What is settled", href: "/xpedite/#what-is-settled" }
    ]},
    { title: "About", links: [
      { label: "Overview",       href: "/about/" },
      { label: "How we vet",     href: "/about/#how-we-vet" },
      { label: "Leadership",     href: "/about/#leadership" },
      { label: "Who we convene", href: "/about/#who-we-convene" },
      { label: "Access",         href: "/access/" },
      { label: "Request access", href: "/access/request/" },
      { label: "Apply to join",  href: "/access/apply/" }
    ]}
  ];

  /* The logo, inlined once as reusable defs. 36 paths, zero fill
   * attributes in the source SVG, so fill: currentColor inherits all
   * the way down and one asset works on every ground.
   *
   * Only the MARK ships: the wordmark alone, via a cropped viewBox
   * (about 7:1). The full lockup carries the tagline and its artboard is
   * 0 0 286.7 86.45 (about 3.3:1), kept here in case it is ever wanted
   * back. It was retired from the header on 2026-07-27, see buildHeader. */
  var LOGO_VIEWBOX_MARK = "14 13 268 43";
  var LOGO_PATHS = "<path d=\"M34.48,51.34c-4.52,0-8.77-1.77-11.95-4.97-3.2-3.18-4.97-7.43-4.97-11.95s1.77-8.77,4.97-11.95c3.18-3.2,7.43-4.97,11.95-4.97s8.77,1.77,11.95,4.97l.46.46-1.22,1.22-.46-.46c-5.91-5.91-15.53-5.91-21.45,0-5.91,5.91-5.91,15.53,0,21.45h0c5.91,5.91,15.53,5.91,21.45,0l.46-.46,1.23,1.22-.46.46c-3.18,3.21-7.43,4.97-11.95,4.97ZM34.48,47.45c-3.34,0-6.68-1.27-9.22-3.81-5.08-5.08-5.08-13.35,0-18.44,2.45-2.45,5.72-3.8,9.22-3.8s6.77,1.35,9.22,3.8l.46.46-1.27,1.27-.46-.47c-2.12-2.14-4.94-3.32-7.95-3.32s-5.83,1.18-7.95,3.32c-2.14,2.12-3.32,4.95-3.32,7.95s1.18,5.83,3.32,7.95c2.12,2.14,4.95,3.32,7.95,3.32s5.83-1.18,7.95-3.32l.46-.47,1.27,1.27-.46.46c-2.54,2.54-5.88,3.81-9.22,3.81Z\"/> <g> <path d=\"M64.71,47.49c-3.33,0-6.66-1.27-9.2-3.8-2.45-2.45-3.8-5.72-3.8-9.2s1.35-6.75,3.8-9.2c4.31-4.31,11.14-5.03,16.23-1.7,0,0,.37.24.38.24,0,0,1.25.95,1.76,1.46.48.48.94,1.03,1.4,1.69.03.03.48.7.49.75,3.14,5.16,2.38,11.7-1.87,15.96-2.53,2.54-5.87,3.8-9.2,3.8ZM55.43,40.9s.7.95,1.31,1.56c.56.57,1.57,1.32,1.58,1.33,4.47,3.06,10.52,2.51,14.36-1.33h0c3.81-3.81,4.41-9.61,1.46-14.1-.44-.68-.94-1.3-1.48-1.84-.48-.48-1.01-.92-1.63-1.34-4.46-3.05-10.47-2.49-14.3,1.34-3.84,3.84-4.39,9.89-1.31,14.38h0Z\"/> <path d=\"M64.73,51.39c-4.52,0-8.77-1.77-11.95-4.97-3.2-3.18-4.97-7.43-4.97-11.95s1.77-8.77,4.97-11.95c5.79-5.79,14.87-6.6,21.58-1.92l.44.32c.17.13.5.38.5.38.52.42.96.81,1.34,1.19.41.41.81.85,1.25,1.41,0,0,.36.46.54.7l.14.18s0,0,.01.01c4.71,6.72,3.92,15.81-1.9,21.62-3.18,3.21-7.43,4.97-11.95,4.97ZM64.68,19.31c-3.88,0-7.73,1.5-10.67,4.44-2.88,2.86-4.46,6.66-4.46,10.72s1.58,7.87,4.46,10.72c2.86,2.88,6.66,4.46,10.72,4.46s7.87-1.58,10.72-4.46c0,0,0,0,0,0,5.28-5.29,5.93-13.52,1.53-19.58-.51-.7-1.02-1.31-1.58-1.86-.55-.55-1.15-1.06-1.86-1.57-2.68-1.93-5.78-2.88-8.87-2.88Z\"/> </g> <path d=\"M112.24,52.25l-22.07-22.02v21.1h-1.74v-30.84l18.16,18.16v-21.14h1.74v22.88l2.16,2.16v-25.04h1.74v29.28l-22.07-22.11v3.05l22.07,22.06v2.45ZM86.27,51.33h-1.74V16.59l1.74,1.74v33Z\"/> <path d=\"M132.12,52.09l-1.02-1.88.16-.31c1.87-3.64,2.12-4.14,8.46-16.88l7.72-15.51h1.89l-17.2,34.58ZM129.98,47.87l-15.11-30.36h1.89l13.21,26.46,1.18-2.36-11.99-24.1h1.89l11.04,22.16,11.04-22.16h1.93l-.47.94c-4.02,8.04-6.65,13.32-8.48,16.96-3.63,7.26-4.01,8.02-5.57,11.25l-.58,1.2Z\"/> <path d=\"M204.58,51.33h-2.07l-12.09-17.34h1.73c2.99,0,5.42-2.43,5.42-5.42s-2.43-5.42-5.42-5.42h-5.85v28.18h-1.74v-28.18h-2.16v28.18h-1.74v-29.92h11.49c3.95,0,7.16,3.21,7.16,7.16,0,3.48-2.42,6.37-5.69,7.02l1.32,1.89c3.87-1.18,6.53-4.78,6.53-8.91,0-5.14-4.18-9.32-9.32-9.32h-11.49v-1.74h11.49c6.1,0,11.06,4.96,11.06,11.06,0,4.66-2.94,8.82-7.24,10.41l8.62,12.35ZM199.81,51.33h-2.06l-8.92-12.62,1.42-1.11,9.56,13.73Z\"/> <path d=\"M222.94,51.33c-.06,0-.12,0-.18,0-4.48,0-8.69-1.74-11.86-4.92s-4.94-7.44-4.92-11.95c-.02-4.53,1.73-8.79,4.93-11.99,3.19-3.19,7.41-4.93,11.94-4.91,4.51,0,8.77,1.74,11.99,4.91l.47.46-1.28,1.28-.46-.47c-2.82-2.87-6.63-4.44-10.72-4.44-8.34,0-15.13,6.81-15.13,15.17s6.79,15.13,15.13,15.13c7.29,0,13.56-5.26,14.88-12.35h-2.16c-1.28,5.96-6.55,10.23-12.72,10.23-7.17,0-13.01-5.83-13.01-13.01s5.83-13.05,13.01-13.05c3.52.05,6.79,1.41,9.22,3.83l.46.46-1.27,1.27-.46-.46c-2.14-2.14-4.96-3.32-7.95-3.32s-5.86,1.18-7.98,3.31c-2.11,2.13-3.26,4.95-3.24,7.95-.02,3.02,1.14,5.85,3.26,7.97,2.1,2.1,4.9,3.26,7.88,3.26h.16c5.16,0,9.58-3.5,10.82-8.45h-11.55v-1.74h17.54l-.07.72c-.87,8.63-8.05,15.11-16.73,15.11ZM239.76,33.34h-17.56v-1.74h17.56v1.74Z\"/> <path d=\"M269.14,51.33h-2.04l-.19-.29-21.99-33.52h2.04l7.75,11.82,7.75-11.82h2.04l-8.8,13.35,1.34,2.02,10.1-15.38h1.99l-11.09,16.91,11.09,16.91ZM264.5,51.33h-2.04l-7.75-11.82-7.75,11.82h-2.04l8.8-13.35-1.34-2.02-10.1,15.38h-2.04l11.14-16.91-11.14-16.91h2l22.27,33.82Z\"/> <path d=\"M75.89,45.26s0,0,0,0\"/> <g> <rect x=\"151.95\" y=\"49.59\" width=\"23.63\" height=\"1.74\"/> <path d=\"M151.95,45.69v1.74h23.63v-1.74h-17.99v-8.45h14.09v-1.74h-17.99v-2.16h17.99v-1.74h-14.09v-8.45h17.99v-1.74h-23.63v24.28ZM153.69,23.15h2.16v8.45h-2.16v-8.45ZM155.85,37.24v8.45h-2.16v-8.45h2.16Z\"/> <rect x=\"151.95\" y=\"17.51\" width=\"23.63\" height=\"1.74\"/> </g> <path d=\"M273.73,18.22h-1.15v3.56h-.71v-3.56h-1.16v-.63h3.02v.63ZM277.64,18.71l-1.09,3.08h-.41l-1.09-3.07v3.07h-.7v-4.2h.88l1.12,3.12,1.12-3.12h.88v4.2h-.7v-3.08Z\"/> <g> <polygon points=\"75.29 66.24 73.3 58.39 72.88 58.39 72.22 58.39 71.78 58.39 69.77 66.23 68.13 58.39 66.33 58.39 68.76 68.89 69.38 68.89 69.97 68.89 70.52 68.89 72.55 61.28 74.54 68.89 75.09 68.89 75.68 68.89 76.3 68.89 78.73 58.39 76.92 58.39 75.29 66.24\"/> <path d=\"M85.64,61.61c-.23-.23-.49-.4-.8-.51s-.66-.16-1.04-.16c-.46,0-.87.09-1.25.28-.37.18-.68.44-.94.77v-4.18h-1.73v11.08h1.73v-5.56c.05-.1.11-.2.17-.29.16-.22.36-.39.6-.51.24-.12.51-.19.83-.19s.55.05.76.15c.21.1.36.26.47.48.11.22.16.52.16.89v5.03h1.75v-5.01c0-.53-.06-.99-.18-1.36-.12-.37-.29-.68-.52-.91Z\"/> <path d=\"M93.83,62.01c-.28-.34-.62-.6-1.04-.79-.42-.19-.91-.28-1.46-.28-.5,0-.97.09-1.41.28s-.81.46-1.12.81-.56.78-.74,1.27c-.18.5-.27,1.05-.27,1.66v.29c0,.53.09,1.03.26,1.49.17.46.42.86.75,1.21.32.34.72.61,1.18.8.46.19.98.28,1.56.28.51,0,.96-.07,1.34-.21.39-.14.72-.32.98-.54.27-.22.49-.46.66-.7l-.92-.89c-.24.31-.52.55-.85.71-.33.17-.7.25-1.12.25-.33,0-.63-.06-.89-.18-.26-.12-.48-.29-.66-.51s-.32-.47-.41-.76c-.07-.22-.1-.45-.12-.7h5.11v-.74c0-.56-.07-1.08-.21-1.54-.14-.47-.34-.87-.62-1.21ZM92.94,64.26h-3.36c.02-.13.04-.26.07-.39.08-.33.19-.6.34-.83.15-.23.34-.41.56-.53.22-.12.48-.18.77-.18.38,0,.69.08.92.25.23.17.4.39.52.66.11.27.17.57.18.88v.14Z\"/> <path d=\"M99.52,60.94c-.39,0-.73.09-1.03.27-.3.18-.54.42-.74.74-.01.02-.02.05-.03.07l-.05-.93h-1.66v7.8h1.74v-5.3c.08-.19.18-.37.31-.51.15-.16.34-.28.57-.36.23-.08.49-.13.79-.13.12,0,.24,0,.36.01.12,0,.24.02.34.04v-1.62s-.14-.05-.26-.07-.24-.03-.34-.03Z\"/> <path d=\"M106.83,62.01c-.28-.34-.62-.6-1.04-.79-.42-.19-.91-.28-1.46-.28-.5,0-.97.09-1.41.28s-.81.46-1.12.81-.56.78-.74,1.27c-.18.5-.27,1.05-.27,1.66v.29c0,.53.09,1.03.26,1.49.17.46.42.86.75,1.21.32.34.72.61,1.18.8.46.19.98.28,1.56.28.51,0,.96-.07,1.34-.21.39-.14.72-.32.98-.54.27-.22.49-.46.66-.7l-.92-.89c-.24.31-.52.55-.85.71-.33.17-.7.25-1.12.25-.33,0-.63-.06-.89-.18-.26-.12-.48-.29-.66-.51s-.32-.47-.41-.76c-.07-.22-.1-.45-.12-.7h5.11v-.74c0-.56-.07-1.08-.21-1.54-.14-.47-.34-.87-.62-1.21ZM105.94,64.26h-3.36c.02-.13.04-.26.07-.39.08-.33.19-.6.34-.83.15-.23.34-.41.56-.53.22-.12.48-.18.77-.18.38,0,.69.08.92.25.23.17.4.39.52.66.11.27.17.57.18.88v.14Z\"/> <path d=\"M113.67,58.12c-.31,0-.56.09-.73.26-.18.18-.26.4-.26.66s.09.48.26.65c.18.17.42.26.73.26s.55-.09.73-.26c.18-.17.27-.39.27-.65s-.09-.48-.27-.66c-.18-.18-.42-.26-.73-.26Z\"/> <rect x=\"112.79\" y=\"61.09\" width=\"1.75\" height=\"7.8\"/> <path d=\"M122.21,61.6c-.22-.23-.48-.4-.79-.5-.31-.1-.65-.15-1.02-.15-.47,0-.89.09-1.27.27-.38.18-.71.44-.98.77-.01.02-.03.04-.04.06l-.06-.95h-1.64v7.8h1.74v-5.46c.06-.13.11-.28.19-.39.16-.22.36-.39.59-.51.24-.12.5-.19.8-.19s.56.05.76.14.36.25.47.47c.11.22.16.52.16.89v5.05h1.75v-5.04c0-.53-.06-.98-.17-1.35-.12-.37-.28-.67-.5-.9Z\"/> <path d=\"M129.42,61.85c-.22-.26-.47-.48-.77-.63-.36-.18-.77-.27-1.24-.27s-.9.09-1.28.28c-.38.19-.7.46-.97.82-.26.35-.47.77-.61,1.26-.14.49-.21,1.03-.21,1.62v.15c0,.57.07,1.09.21,1.58.14.48.34.9.61,1.26.26.36.58.63.96.83.38.2.8.29,1.27.29s.89-.09,1.25-.27c.33-.17.61-.41.85-.72l.09.85h1.58v-11.08h-1.75v4.04ZM128.81,67.37c-.25.17-.58.26-.97.26-.31,0-.58-.07-.8-.2-.22-.13-.4-.31-.54-.55-.14-.23-.24-.5-.31-.81-.06-.31-.1-.64-.1-1v-.15c0-.36.03-.69.1-1s.17-.59.31-.82c.14-.24.32-.42.54-.56.22-.13.49-.2.81-.2.3,0,.56.05.78.16.22.1.4.25.55.43.1.13.17.29.25.44v3.26s0,.02-.01.03c-.15.3-.35.53-.6.7Z\"/> <path d=\"M137.68,66.66c-.13.28-.3.51-.55.68-.29.2-.68.29-1.17.29-.17,0-.34-.02-.49-.07-.15-.05-.29-.13-.4-.25-.12-.12-.21-.27-.27-.46-.07-.19-.1-.43-.1-.71v-5.06h-1.74v5.04c0,.51.06.96.19,1.33.12.37.3.67.53.9.23.23.5.4.82.51.32.11.67.17,1.05.17.52,0,.97-.09,1.35-.27.34-.17.63-.4.86-.69l.04.81h1.64v-7.8h-1.75v5.57Z\"/> <path d=\"M145.94,64.78c-.43-.2-.94-.35-1.54-.48-.32-.07-.58-.14-.79-.21-.21-.07-.37-.15-.49-.23-.12-.08-.21-.18-.26-.28-.05-.1-.08-.22-.08-.35,0-.18.05-.34.14-.49s.24-.27.43-.36.44-.14.74-.14.57.06.78.17c.21.11.36.26.47.44.1.18.15.37.15.58h1.74c0-.47-.12-.89-.38-1.26-.25-.37-.61-.67-1.08-.89s-1.03-.33-1.68-.33c-.46,0-.88.06-1.25.19s-.69.29-.95.51c-.26.22-.46.47-.6.75-.14.28-.21.58-.21.9s.07.62.2.87c.13.25.32.47.57.65s.54.34.88.46c.34.13.72.24,1.14.33.47.1.83.2,1.07.32s.41.24.49.39c.09.14.13.3.13.47,0,.19-.06.35-.17.5s-.27.26-.48.35c-.21.08-.47.13-.79.13-.26,0-.51-.04-.75-.13s-.44-.22-.61-.41c-.16-.19-.25-.45-.27-.77h-1.68c0,.43.13.84.38,1.24s.62.72,1.11.97c.49.25,1.09.38,1.8.38.48,0,.92-.06,1.3-.17.39-.12.72-.28,1-.49s.49-.46.64-.74.22-.6.22-.95c0-.47-.12-.85-.35-1.16-.23-.31-.56-.56-.99-.75Z\"/> <path d=\"M152.17,67.59c-.11.01-.23.02-.35.02-.17,0-.31-.02-.44-.06-.12-.04-.22-.13-.29-.26-.07-.13-.1-.31-.1-.55v-4.38h1.39v-1.27h-1.39v-1.91h-1.74v1.91h-1.27v1.27h1.27v4.49c0,.53.09.96.26,1.28.17.32.41.55.72.7.31.14.66.21,1.06.21.25,0,.46-.02.65-.05.19-.03.36-.07.5-.12v-1.33c-.07.01-.16.03-.27.04Z\"/> <path d=\"M157.23,60.94c-.39,0-.73.09-1.03.27-.3.18-.54.42-.74.74-.01.02-.02.05-.03.07l-.05-.93h-1.66v7.8h1.74v-5.3c.08-.19.18-.37.31-.51.15-.16.34-.28.57-.36.23-.08.49-.13.79-.13.12,0,.24,0,.36.01.12,0,.24.02.34.04v-1.62s-.14-.05-.26-.07c-.12-.02-.24-.03-.34-.03Z\"/> <path d=\"M161.83,66.42l-1.69-5.33h-1.88l2.76,7.78-.25.68c-.09.26-.19.47-.31.62-.12.15-.28.27-.47.34-.19.07-.43.1-.72.1-.04,0-.1,0-.17,0-.07,0-.13,0-.18-.01v1.33c.13.03.27.06.41.08s.29.04.44.04c.39,0,.72-.06,1-.19.27-.13.5-.29.69-.5.18-.21.33-.42.45-.65.12-.23.21-.44.28-.63l3.13-8.99h-1.86l-1.63,5.33Z\"/> <rect x=\"170.09\" y=\"57.81\" width=\"1.75\" height=\"11.08\"/> <rect x=\"173.85\" y=\"61.09\" width=\"1.75\" height=\"7.8\"/> <path d=\"M174.73,58.12c-.31,0-.56.09-.73.26s-.26.4-.26.66.09.48.26.65c.18.17.42.26.73.26s.55-.09.73-.26c.18-.17.27-.39.27-.65s-.09-.48-.27-.66c-.18-.18-.42-.26-.73-.26Z\"/> <path d=\"M183.28,61.6c-.22-.23-.48-.4-.79-.5-.31-.1-.65-.15-1.02-.15-.47,0-.89.09-1.27.27-.38.18-.71.44-.98.77-.01.02-.02.04-.04.06l-.06-.95h-1.64v7.8h1.74v-5.46c.06-.13.11-.27.19-.39.16-.22.36-.39.59-.51s.5-.19.8-.19.56.05.76.14c.2.09.36.25.47.47s.16.52.16.89v5.05h1.75v-5.04c0-.53-.06-.98-.17-1.35s-.28-.67-.5-.9Z\"/> <path d=\"M191.46,62.01c-.28-.34-.62-.6-1.04-.79-.42-.19-.91-.28-1.46-.28-.5,0-.97.09-1.41.28s-.81.46-1.12.81-.56.78-.74,1.27c-.18.5-.27,1.05-.27,1.66v.29c0,.53.09,1.03.26,1.49.17.46.42.86.75,1.21.32.34.72.61,1.18.8.46.19.98.28,1.56.28.51,0,.96-.07,1.34-.21.39-.14.71-.32.98-.54s.49-.46.66-.7l-.92-.89c-.24.31-.52.55-.85.71-.33.17-.7.25-1.12.25-.33,0-.63-.06-.89-.18-.26-.12-.48-.29-.66-.51s-.32-.47-.41-.76c-.07-.22-.1-.45-.12-.7h5.11v-.74c0-.56-.07-1.08-.21-1.54-.14-.47-.34-.87-.62-1.21ZM190.57,64.26h-3.36c.02-.13.04-.26.07-.39.08-.33.19-.6.34-.83.15-.23.34-.41.56-.53.22-.12.48-.18.77-.18.38,0,.69.08.92.25.23.17.4.39.52.66.11.27.17.57.18.88v.14Z\"/> <path d=\"M198.38,64.78c-.43-.2-.94-.35-1.54-.48-.32-.07-.58-.14-.79-.21-.21-.07-.37-.15-.49-.23-.12-.08-.21-.18-.26-.28-.05-.1-.08-.22-.08-.35,0-.18.05-.34.14-.49s.24-.27.43-.36c.2-.09.44-.14.74-.14.31,0,.57.06.78.17.21.11.36.26.46.44s.16.37.16.58h1.74c0-.47-.12-.89-.38-1.26-.25-.37-.61-.67-1.08-.89s-1.03-.33-1.68-.33c-.46,0-.88.06-1.25.19-.37.12-.69.29-.95.51-.26.22-.46.47-.6.75-.14.28-.21.58-.21.9s.07.62.2.87c.13.25.33.47.57.65s.54.34.88.46c.34.13.72.24,1.14.33.47.1.83.2,1.07.32.24.12.41.24.49.39.09.14.13.3.13.47,0,.19-.05.35-.17.5-.11.15-.27.26-.48.35-.21.08-.47.13-.79.13-.26,0-.51-.04-.75-.13-.24-.08-.45-.22-.61-.41-.16-.19-.25-.45-.27-.77h-1.68c0,.43.13.84.38,1.24.25.4.62.72,1.11.97.49.25,1.09.38,1.79.38.48,0,.92-.06,1.3-.17.39-.12.72-.28,1-.49.28-.21.49-.46.64-.74s.22-.6.22-.95c0-.47-.12-.85-.35-1.16-.23-.31-.56-.56-.99-.75Z\"/> <path d=\"M209.67,61.85c-.22-.26-.47-.48-.77-.63-.36-.18-.77-.27-1.24-.27s-.9.09-1.28.28c-.38.19-.7.46-.97.82-.26.35-.47.77-.61,1.26s-.21,1.03-.21,1.62v.15c0,.57.07,1.09.21,1.58s.34.9.61,1.26c.26.36.58.63.96.83.38.2.8.29,1.27.29s.89-.09,1.25-.27c.33-.17.61-.41.85-.72l.09.85h1.58v-11.08h-1.75v4.04ZM209.05,67.37c-.25.17-.58.26-.97.26-.31,0-.58-.07-.8-.2-.22-.13-.41-.31-.54-.55-.14-.23-.24-.5-.31-.81-.07-.31-.1-.64-.1-1v-.15c0-.36.03-.69.1-1s.17-.59.31-.82c.14-.24.32-.42.54-.56s.49-.2.81-.2c.3,0,.56.05.78.16s.4.25.55.43c.1.13.17.29.25.44v3.27s0,.02-.01.03c-.15.3-.35.53-.6.7Z\"/> <path d=\"M214.23,58.12c-.31,0-.56.09-.73.26s-.26.4-.26.66.09.48.26.65c.18.17.42.26.73.26s.55-.09.73-.26c.18-.17.27-.39.27-.65s-.09-.48-.27-.66c-.18-.18-.42-.26-.73-.26Z\"/> <rect x=\"213.35\" y=\"61.09\" width=\"1.75\" height=\"7.8\"/> <path d=\"M221.74,64.78c-.43-.2-.94-.35-1.54-.48-.32-.07-.58-.14-.79-.21-.21-.07-.37-.15-.49-.23-.12-.08-.21-.18-.26-.28-.05-.1-.08-.22-.08-.35,0-.18.05-.34.14-.49s.24-.27.43-.36c.2-.09.44-.14.74-.14.31,0,.57.06.78.17.21.11.36.26.46.44s.16.37.16.58h1.74c0-.47-.12-.89-.38-1.26-.25-.37-.61-.67-1.08-.89s-1.03-.33-1.68-.33c-.46,0-.88.06-1.25.19-.37.12-.69.29-.95.51-.26.22-.46.47-.6.75-.14.28-.21.58-.21.9s.07.62.2.87c.13.25.33.47.57.65s.54.34.88.46c.34.13.72.24,1.14.33.47.1.83.2,1.07.32.24.12.41.24.49.39.09.14.13.3.13.47,0,.19-.05.35-.17.5-.11.15-.27.26-.48.35-.21.08-.47.13-.79.13-.26,0-.51-.04-.75-.13-.24-.08-.45-.22-.61-.41-.16-.19-.25-.45-.27-.77h-1.68c0,.43.13.84.38,1.24.25.4.62.72,1.11.97.49.25,1.09.38,1.79.38.48,0,.92-.06,1.3-.17.39-.12.72-.28,1-.49.28-.21.49-.46.64-.74s.22-.6.22-.95c0-.47-.12-.85-.35-1.16-.23-.31-.56-.56-.99-.75Z\"/> <path d=\"M230.74,67.09v-3.47c0-.6-.13-1.09-.39-1.49-.26-.4-.62-.69-1.08-.89s-.97-.29-1.56-.29c-.49,0-.93.06-1.33.19-.39.13-.73.31-1.02.53-.28.23-.5.48-.65.77-.15.29-.22.59-.22.89h1.73c0-.21.06-.39.17-.55.12-.16.28-.29.48-.39.21-.1.45-.14.74-.14.31,0,.56.06.77.17.2.11.36.27.46.47.1.2.15.44.15.72v.54h-1.11c-.57,0-1.07.06-1.51.17s-.82.28-1.12.49c-.3.22-.54.48-.69.8-.16.32-.23.69-.23,1.1,0,.44.11.84.34,1.19.23.35.54.62.94.83.4.2.85.31,1.36.31.4,0,.76-.06,1.07-.19.31-.13.58-.3.8-.5.08-.08.15-.15.23-.23,0,.02,0,.04,0,.07.05.29.11.53.19.72h1.78v-.12c-.1-.21-.17-.45-.22-.73-.05-.28-.08-.6-.08-.96ZM228.23,67.44c-.27.15-.58.22-.93.22-.26,0-.49-.05-.67-.14-.19-.1-.33-.23-.42-.4-.1-.17-.14-.36-.14-.57s.04-.39.12-.56c.08-.16.2-.3.37-.42.16-.12.37-.2.61-.26.25-.06.53-.09.85-.09h.98v1.45c-.04.08-.07.15-.13.23-.15.21-.36.39-.63.54Z\"/> <path d=\"M238.61,62.04c-.26-.35-.58-.62-.96-.81-.38-.19-.82-.28-1.31-.28s-.9.09-1.26.27c-.33.17-.6.4-.84.7l-.08-.83h-1.6v10.8h1.74v-3.75c.22.26.48.47.78.62.36.18.79.27,1.27.27s.92-.1,1.3-.29c.38-.2.69-.47.95-.83.26-.36.45-.78.58-1.26.13-.48.2-1.01.2-1.58v-.15c0-.6-.07-1.14-.2-1.63-.13-.49-.32-.91-.58-1.25ZM237.65,65.07c0,.35-.03.68-.1,1s-.17.59-.31.83c-.14.24-.32.42-.54.56-.22.13-.49.2-.8.2-.4,0-.73-.09-.99-.26-.26-.17-.46-.4-.59-.69v-3.37c.07-.14.13-.29.22-.41.15-.18.33-.33.56-.43.22-.1.49-.16.79-.16s.58.07.8.2c.22.13.41.32.55.55.14.24.25.51.32.82.07.31.1.65.1,1.01v.15Z\"/> <path d=\"M246.91,62.04c-.26-.35-.58-.62-.96-.81-.38-.19-.81-.28-1.3-.28s-.9.09-1.26.27c-.33.17-.6.4-.84.7l-.08-.83h-1.6v10.8h1.74v-3.75c.22.26.48.47.78.62.36.18.79.27,1.27.27s.92-.1,1.3-.29c.38-.2.69-.47.95-.83.26-.36.45-.78.58-1.26.13-.48.2-1.01.2-1.58v-.15c0-.6-.06-1.14-.19-1.63-.13-.49-.33-.91-.58-1.25ZM245.95,65.07c0,.35-.03.68-.1,1s-.17.59-.31.83c-.14.24-.32.42-.54.56s-.49.2-.8.2c-.4,0-.73-.09-.99-.26-.26-.17-.46-.4-.59-.69v-3.37c.07-.14.13-.29.22-.41.15-.18.33-.33.55-.43.22-.1.49-.16.79-.16s.58.07.8.2c.22.13.41.32.55.55.14.24.25.51.32.82.07.31.1.65.1,1.01v.15Z\"/> <path d=\"M254.9,62.01c-.28-.34-.62-.6-1.04-.79s-.91-.28-1.46-.28c-.5,0-.97.09-1.41.28s-.81.46-1.12.81-.57.78-.74,1.27-.27,1.05-.27,1.66v.29c0,.53.09,1.03.26,1.49.17.46.42.86.75,1.21.32.34.72.61,1.18.8.46.19.98.28,1.56.28.51,0,.96-.07,1.34-.21.39-.14.72-.32.98-.54.27-.22.49-.46.66-.7l-.92-.89c-.24.31-.52.55-.85.71-.33.17-.7.25-1.12.25-.33,0-.63-.06-.89-.18-.26-.12-.48-.29-.66-.51s-.32-.47-.42-.76c-.07-.22-.1-.45-.12-.7h5.11v-.74c0-.56-.07-1.08-.21-1.54-.14-.47-.34-.87-.62-1.21ZM254.01,64.26h-3.36c.02-.13.04-.26.07-.39.08-.33.19-.6.34-.83.15-.23.33-.41.56-.53.22-.12.48-.18.77-.18.38,0,.69.08.92.25s.4.39.52.66c.11.27.17.57.18.88v.14Z\"/> <path d=\"M263.21,67.09v-3.47c0-.6-.13-1.09-.39-1.49-.26-.4-.62-.69-1.07-.89-.46-.2-.98-.29-1.56-.29-.49,0-.93.06-1.33.19s-.73.31-1.02.53c-.28.23-.5.48-.65.77-.15.29-.22.59-.22.89h1.73c0-.21.06-.39.17-.55.12-.16.28-.29.48-.39.21-.1.45-.14.74-.14.31,0,.56.06.77.17s.36.27.46.47c.1.2.15.44.15.72v.54h-1.11c-.57,0-1.07.06-1.51.17s-.82.28-1.12.49c-.31.22-.54.48-.69.8-.16.32-.23.69-.23,1.1,0,.44.11.84.34,1.19.23.35.54.62.94.83.4.2.85.31,1.36.31.4,0,.76-.06,1.07-.19.31-.13.58-.3.8-.5.08-.08.15-.15.23-.23,0,.02,0,.04,0,.07.05.29.11.53.19.72h1.78v-.12c-.1-.21-.17-.45-.22-.73s-.08-.6-.08-.96ZM260.71,67.44c-.27.15-.58.22-.93.22-.26,0-.49-.05-.67-.14-.18-.1-.33-.23-.42-.4-.1-.17-.14-.36-.14-.57s.04-.39.12-.56.2-.3.37-.42c.16-.12.37-.2.61-.26.25-.06.53-.09.85-.09h.98v1.45c-.04.08-.07.15-.13.23-.15.21-.36.39-.63.54Z\"/> <path d=\"M268.89,60.97c-.12-.02-.24-.03-.34-.03-.39,0-.73.09-1.03.27-.3.18-.54.42-.74.74-.01.02-.02.05-.03.07l-.05-.93h-1.66v7.8h1.74v-5.3c.08-.19.18-.37.31-.51.15-.16.34-.28.57-.36.23-.08.49-.13.79-.13.12,0,.24,0,.36.01.12,0,.24.02.34.04v-1.62s-.14-.05-.26-.07Z\"/> </g>";

  function logoSvg(viewBox, ariaLabel) {
    return '<svg class="logo-art" viewBox="' + viewBox + '" role="img" ' +
      'aria-label="' + ariaLabel + '" xmlns="http://www.w3.org/2000/svg">' +
      '<use href="#cx-logo"></use></svg>';
  }

  /* ONE list builder for every panel column: link plus a descriptor
   * sibling, the same shape as the .link-index already on /industries/.
   * Industries, the two doors, the platform pages and the Conference
   * pages are all this list, so a change to the row shape happens once.
   * `attrs` carries the labelling: aria-labelledby on desktop, where a
   * visible .label owns the name, aria-label on mobile, where it does
   * not. `cls` is an extra class on the <ul>, `extra` is raw markup
   * appended as a final <li>. Both are optional and both exist for the
   * industries grid, which is this same list laid out in columns with a
   * last cell that is not a link row. */
  function indexList(items, current, attrs, cls, extra) {
    return '<ul class="link-index' + (cls ? " " + cls : "") + '"' + (attrs || "") + ">" +
      items.map(function (i) {
        var cur = current === i.href ? ' aria-current="page"' : "";
        /* i.cta marks a row that leads somewhere a reader can act rather than
         * read. Only the Conference panel sets it, on Register and Sponsor.
         * A class on the <li>, not a second list: the rows stay one component
         * and the emphasis is a modifier, so nothing forks. */
        var liCls = i.cta ? ' class="nav-mega-cta"' : "";
        return "<li" + liCls + "><a href=\"" + i.href + "\"" + cur + ">" + i.label + "</a>" +
          "<span class=\"descriptor\">" + i.note + "</span></li>";
      }).join("") + (extra || "") + "</ul>";
  }

  /* The promo cell. The prompt leads and the call closes it, which is the
   * opposite order to a sector row and is what stops it reading as a
   * ninth sector called "Request access". Both spans are existing
   * components: .label--lo and .link-more. */
  function promoCell() {
    return '<li class="mega-promo">' +
      '<span class="label label--lo">' + PROMO.label + "</span>" +
      '<span class="descriptor">' + PROMO.note + "</span>" +
      '<a class="link-more" href="' + PROMO.href + '">' + PROMO.cta + "</a>" +
    "</li>";
  }

  /* The module grid. One cell per group: the group name is still not a
   * link, because there is still no per-group page, but every module
   * under it is. The group label is the context a bare module name cannot
   * carry, which is the reason the old rule kept modules out of the menu
   * at all; supplying it is what makes listing them safe.
   * `current` is matched on the path only. Every module href is an anchor
   * on one page, so matching the whole string would mark fourteen rows
   * not-current and one current while the reader is looking at all
   * fifteen. The page gets the marker, the rows do not. */
  /* THE TWO DOORS AS BLOCKS. Chip, 2026-07-29: square grounds, one dark and
   * one orange, a longer line each, a Learn more, and the whole block active.
   *
   * ONE <a> WRAPS THE WHOLE THING. Not a div with a link inside it: that
   * gives a card that looks clickable, one small target that is, and a
   * keyboard user tabbing to a link whose name is "Learn more". The Learn
   * more here is a <span>, styled to read as the affordance it is, and the
   * accessible name of the block is the door's own locked label.
   *
   * TYPE ON THE ORANGE BLOCK IS NEAR-BLACK. --accent-ink, never light. White
   * on this orange is 3.42:1 and fails. The dark block is the mirror of it
   * and takes the dark surface's own inks, so both blocks stay inside the
   * three-surface system rather than inventing a fourth. */
  function block(item, current, label, note) {
    var cur = current === item.href ? ' aria-current="page"' : "";
    return '<a class="door-block door-block--' + item.tone + '" href="' + item.href + '"' + cur + ">" +
      '<span class="door-block-label">' + label + "</span>" +
      '<span class="door-block-note">' + note + "</span>" +
      '<span class="door-block-cta" aria-hidden="true">Learn more</span>' +
    "</a>";
  }

  /* THE LEFT STACK: the two doors, stacked, and only the two. The overview
   * was briefly the third square here and the column came out taller than the
   * viewport on its own, so it is a thin bar across the top instead. */
  function doorBlocks(current) {
    return '<div class="door-blocks">' +
      DOORS.map(function (d) { return block(d, current, d.label, d.long); }).join("") +
    "</div>";
  }



  function platformModuleGrid(current) {
    var onModules = current === "/platform/modules/";
    return '<ul class="link-index link-index--grid mod-groups">' +
      PLATFORM_MODULE_GROUPS.map(function (g) {
        return '<li class="mod-group">' +
          '<span class="label label--lo">' + g.label + "</span>" +
          '<ul class="mod-list">' + g.modules.map(function (m) {
            return '<li><a href="' + m.href + '"' +
              (onModules ? ' aria-current="true"' : "") + ">" + m.label + "</a></li>";
          }).join("") + "</ul>" +
        "</li>";
      }).join("") + "</ul>";
  }

  function allLink(href, label, current) {
    var cur = current === href ? ' aria-current="page"' : "";
    return '<a class="link-more" href="' + href + '"' + cur + ">" + label + "</a>";
  }

  /* Every count that renders is generated from the array it counts. */
  function allIndustriesLabel() { return "All " + numWord(INDUSTRIES.length) + " industries"; }

  function megaCol(id, label, body, cls) {
    return '<div class="mega-col' + (cls ? " " + cls : "") + '">' +
      '<p class="label label--lo" id="' + id + '">' + label + "</p>" +
      body +
    "</div>";
  }

  /* Desktop panel. Starts hidden in the markup, so it is closed before a
   * single line of behaviour runs. One builder, every panel: the shape is
   * identical, only the columns differ.
   *
   * Two width modifiers, both declared in styles.css:
   *   .mega-inner--3  three equal columns, the Platform panel
   *   .mega-inner--1  one full-width column, the Industries panel, whose
   *                   single column holds a grid and must not sit in the
   *                   2fr of the default 2fr 1fr
   * The inline stand-in that used to sit beside --3 is gone: the rule
   * landed in styles.css and its own comment said the inline comes out. */
  function megaPanel(key, current) {
    var id = "mega-" + key;
    var cols, wide = "";

    if (key === "platform") {
      wide = " mega-inner--platform";
      cols =
        /* THE DOORS STAY FIRST IN THE SOURCE and render on the RIGHT.
         * Chip moved them right on 2026-07-29; they are still emitted first
         * because two rules survive that move. The brief's rule is that the
         * doors are never the last thing in this panel, which is source
         * order, not pixels. And a keyboard or screen-reader user reaches the
         * two doors before fifteen module rows rather than after them.
         * The swap is done with grid-column in styles.css, so the only thing
         * that changed is where they are drawn. */
        '<div class="mega-col mega-col--doors">' +
          doorBlocks(current) +
        "</div>" +
        /* No column label. The eyebrow said "Every module, by what it is for."
         * above five group labels that each say what they are for, in a panel
         * opened from The Platform. Chip pulled it 2026-07-29.
         * The overview closes the column the way /industries/ closes its own:
         * a tertiary named destination, no fill, under the grid. */
        '<div class="mega-col mega-col--modules">' +
          platformModuleGrid(current) +
          '<p class="mega-all">' + allLink(PLATFORM_OVERVIEW.href, PLATFORM_OVERVIEW.title, current) + "</p>" +
        "</div>";
    } else if (key === "congress") {
      cols =
        megaCol(id + "-h", CONGRESS_STANDFIRST,
          indexList(CONGRESS_PAGES, current, ' aria-labelledby="' + id + '-h"')) +
        megaCol(id + "-e", CONGRESS_TAKEPART_LABEL,
          indexList(CONGRESS_TAKEPART, current, ' aria-labelledby="' + id + '-e"'),
          "mega-col--aside");
    } else if (key === "xpand") {
      cols = megaCol(id + "-h", XPAND_STANDFIRST,
        indexList(XPAND_PAGES, current, ' aria-labelledby="' + id + '-h"'));
    } else if (key === "capital") {
      cols = megaCol(id + "-h", CAPITAL_STANDFIRST,
        indexList(CAPITAL_PAGES, current, ' aria-labelledby="' + id + '-h"'));
    } else if (key === "about") {
      cols = megaCol(id + "-h", ABOUT_STANDFIRST,
        indexList(ABOUT_PAGES, current, ' aria-labelledby="' + id + '-h"'));
    } else {
      /* Industries. One full-width column holding a grid of sector cells
       * with the promo in the last position. The column count is a LAYOUT
       * constant in styles.css and is not derived from and does not encode
       * how many sectors exist: cells flow, so the grid absorbs a sector
       * arriving or being pulled without a line changing here or there. */
      wide = " mega-inner--1";
      /* NO EYEBROW. Chip, 2026-07-29: it read "Eight industries" above a grid
       * of eight named industries in a panel opened from Industries.
       * The column is built without megaCol because megaCol's whole job is to
       * render that label. The list keeps an accessible NAME via aria-label:
       * without it the aria-labelledby would point at an element that no
       * longer exists and the grid would be an unnamed list of eight links.
       * The name is the plain word, no count. Typed counts go stale; that is
       * the same reason the closing link derives its own from the array. */
      cols = '<div class="mega-col">' +
        indexList(INDUSTRIES, current, ' aria-label="Industries"',
                  "link-index--grid", promoCell()) +
        '<p class="mega-all">' + allLink("/industries/", allIndustriesLabel(), current) + "</p>" +
      "</div>";
    }

    return (
      '<div class="mega" id="' + id + '" hidden>' +
        '<div class="mega-inner' + wide + '">' + cols + "</div>" +
      "</div>"
    );
  }

  /* Mobile. A mega panel is wrong on a phone, so the same content becomes
   * a native details disclosure nested inside the existing menu. No
   * script, no motion, no overlay. Same order as the desktop panel, so
   * the doors lead here too. */
  function megaMobile(key, label, current) {
    var body;
    if (key === "platform") {
      /* The doors keep their own emphasis wrapper on mobile too. On a
       * phone the panel is a stack, so "first" is weaker than it is on
       * desktop and the wrapper is doing more of the work, not less. */
      body =
        '<div class="nav-sub-doors">' + doorBlocks(current) + "</div>" +
        platformModuleGrid(current) +
        '<p class="nav-sub-all">' + allLink(PLATFORM_OVERVIEW.href, PLATFORM_OVERVIEW.title, current) + "</p>";
    } else if (key === "congress") {
      body =
        '<p class="label label--lo">' + CONGRESS_STANDFIRST + "</p>" +
        indexList(CONGRESS_PAGES, current, ' aria-label="The Conference"') +
        '<p class="label label--lo">' + CONGRESS_TAKEPART_LABEL + "</p>" +
        indexList(CONGRESS_TAKEPART, current, ' aria-label="' + CONGRESS_TAKEPART_LABEL + '"');
    } else if (key === "xpand") {
      body =
        '<p class="label label--lo">' + XPAND_STANDFIRST + "</p>" +
        indexList(XPAND_PAGES, current, ' aria-label="Xpand"');
    } else if (key === "capital") {
      body =
        '<p class="label label--lo">' + CAPITAL_STANDFIRST + "</p>" +
        indexList(CAPITAL_PAGES, current, ' aria-label="Capital"');
    } else if (key === "about") {
      body =
        '<p class="label label--lo">' + ABOUT_STANDFIRST + "</p>" +
        indexList(ABOUT_PAGES, current, ' aria-label="About"');
    } else {
      /* Every sector plus the promo, one under the other. No grid on a
       * phone: three columns of 375px thirds is not a layout. The promo is
       * the same last cell the desktop grid carries, so a no-grid reader
       * loses nothing. */
      body =
        indexList(INDUSTRIES, current, ' aria-label="Industries"',
                  "", promoCell()) +
        '<p class="nav-sub-all">' + allLink("/industries/", allIndustriesLabel(), current) + "</p>";
    }
    return (
      '<li><details class="nav-sub"><summary>' + label +
        ' <span class="nav-mega-caret" aria-hidden="true">\u2193</span></summary>' +
        body +
      "</details></li>"
    );
  }

  /* ONE renderer for every item in the bar, primary or utility. About is
   * a utility item that now takes a panel, and the only way to give it
   * one without a second copy of this markup is for both to come through
   * here. What makes About a utility item is its POSITION, applied by the
   * caller below, not a different code path. */
  function navItem(item, current, mobile) {
      var cur = current === item.href ? ' aria-current="page"' : "";
      if (item.mega) {
        /* Any page under /industries/ marks the trigger, not just the
         * overview: the trigger stands for the whole branch. It is
         * aria-current="true", not "page", because the real page link
         * inside the panel is the one that owns "page". */
        var inBranch = current.indexOf(item.href) === 0 ? ' aria-current="true"' : "";
        if (mobile) return megaMobile(item.mega, item.label, current);
        /* THE LABEL IS A LINK AND THE CARET IS THE BUTTON. Chip, 2026-07-29:
         * clicking The Platform goes to the platform page. It was one
         * <button> that only ever opened the panel, so the four section
         * overviews were reachable from the panel and never from the word
         * above it, which is the thing people click first.
         *
         * Applied to all four mega items, not just Platform. Every one
         * already carries a real href, and a bar where one word of four
         * navigates and the other three do not is worse than either rule
         * applied consistently. Say so if you want it on Platform alone.
         *
         * Two controls, not one control doing two jobs: a link that opens a
         * menu on click has no correct keyboard behaviour. Hover still opens
         * the panel for both, because the handler is on the <li>. */
        return '<li class="nav-mega">' +
          '<a class="nav-mega-btn" href="' + item.href + '"' + inBranch +
          ' id="mega-' + item.mega + '-btn"' +
          ' aria-expanded="false" aria-controls="mega-' + item.mega + '">' +
          /* The label is wrapped so the current-branch rule can hug the
           * WORD. On the plain nav links the device is drawn on an inline
           * <a>, so it ends where the text ends. On the old button it was
           * drawn on the inline-block, so it ran the full control width
           * and swallowed the caret, which read as a focus ring on a
           * fresh page load rather than as the current-page marker. */
          '<span class="nav-mega-label">' + item.label + "</span>" +
          "</a>" +
          /* THE CARET BUTTON IS GONE, 2026-08-04. Chip: "Remove the arrows
           * from the header menu, now that we have Capital added in there."
           * Five panels made five arrows read as clutter rather than affordance.
           *
           * WHAT HAD TO CHANGE WITH IT, because the arrow was not decoration.
           * That button was the ONLY keyboard route into a panel: it carried
           * aria-expanded and aria-controls, it was the click target, and the
           * comment in wireOneMega recorded that focusin deliberately did NOT
           * open the panel. Removing the glyph alone would have left a
           * zero-width focusable control; removing the button alone would have
           * stranded every keyboard user outside all five panels.
           * So the disclosure moved onto the link and focusin now opens the
           * panel. A keyboard user tabs to Consulting and the panel appears,
           * which is what a pointer user already got on hover. The link still
           * navigates on click, so a reader who wants the page is unaffected.
           * The note above about "two controls, not one" is now stale in its
           * detail: there is one control, and it opens on hover and focus
           * rather than on click, which is the case that comment excluded.
           * DO NOT reintroduce a visible caret without also deciding what
           * opens a panel for the keyboard. They are one question. */
          megaPanel(item.mega, current) +
        "</li>";
      }
      return "<li><a href=\"" + item.href + "\"" + cur + ">" + item.label + "</a></li>";
  }

  function navList(current, mobile) {
    /* The gate: an item with no page yet does not render at all. A nav
     * row is not the place to announce something that does not exist,
     * and a link to a 404 on every page of the site is worse than a
     * missing item. */
    var items = NAV.filter(function (item) { return item.live; }).map(function (item) {
      return navItem(item, current, mobile);
    });
    /* About, then the CTA, in that order at both breakpoints. It renders
     * through the same builder as every primary item and looks identical
     * to them: same font, size, weight, ink, hover and current-page
     * device. The old .nav-util hook and its 11px mono micro-label rule
     * are both gone, and as of 2026-07-29 so is the "no panel" half of
     * what used to make it a second class. What keeps it a utility item
     * now is one thing only: it sits after the primary group, so the
     * top-level item still to come does not have to displace it. */
    items.push(navItem(UTILITY, current, mobile));
    if (mobile) {
      items.push("<li><a href=\"" + CTA.href + "\">" + CTA.label + "</a></li>");
      return '<ul>' + items.join("") + "</ul>";
    }
    items.push("<li><a class=\"btn btn--solid\" href=\"" + CTA.href + "\">" + CTA.label + "</a></li>");
    return '<ul class="nav-links">' + items.join("") + "</ul>";
  }

  function buildHeader(current) {
    return (
      '<div class="nav-bar">' +
        /* The MARK only, at every width. The header used to swap between
         * the full lockup at desktop and the mark on a phone, which put
         * the tagline in the nav bar on every page. The tagline is
         * ConvergX's own line and the verbatim ledger permits it ONCE,
         * on /about/, where it is set as display type and carries its
         * own note. In the header it was a second instance on all 30
         * pages, competing with the platform's core message in the one
         * place the reader is trying to navigate. */
        '<a class="logo logo--mark" href="/">' +
          logoSvg(LOGO_VIEWBOX_MARK, "ConvergX") +
        "</a>" +
        '<nav aria-label="Primary">' +
          navList(current, false) +
          '<details class="nav-mobile"><summary>Menu</summary>' +
            navList(current, true) +
          "</details>" +
        "</nav>" +
      "</div>"
    );
  }

  /* The notice sits BEFORE the header in the flow, not inside it, so it
   * scrolls away and the nav bar keeps the sticky top to itself. Inside
   * the sticky header it would pin forever, and at 375px it wraps to two
   * lines, so it would cost a phone reader that band on every screenful
   * of every page.
   *
   * IT IS NOW THREE THINGS, not one sentence. It was a paragraph with an
   * inline link, which wrapped for free at every width. It rebuilt on
   * 2026-07-30 into a centred row of three: the dates, the countdown, and
   * a real button, because an inline link inside a sentence is the
   * weakest possible target for the one action this bar exists to get.
   * .notice-inner owns the centring and the wrapping; this file owns
   * nothing about how it looks. */
  /* Real spaces in the markup, not gaps supplied by the stylesheet. The
   * countdown is a sentence now, and a sentence whose word spacing comes
   * from a flex gap breaks the moment the row stops being a flex row. */
  function cdUnits() {
    var last = CD_UNITS.length - 1;
    return CD_UNITS.map(function (u, i) {
      return '<span class="cd-unit" data-cd="' + u.key + '">' +
        '<span class="cd-n">00</span> <span class="cd-l">' + u.many + "</span>" +
        '<span class="cd-sep">' + cdSep(i, last) + "</span>" +
        "</span>";
    }).join("");
  }

  function buildNotice() {
    if (Date.now() >= NOTICE_UNTIL) return "";
    return '<div class="notice"><div class="notice-inner">' +
      '<p class="notice-text">' + NOTICE.text + "</p>" +
      '<p class="notice-countdown" data-countdown="' + COUNTDOWN_TARGET + '">' +
        '<span class="cd-label">' + CD_LEAD + "</span> " + cdUnits() +
        ' <span class="cd-label">' + CD_TAIL + "</span>" +
      "</p>" +
      '<a class="btn btn--solid notice-cta" href="' + NOTICE.href + '">' +
        NOTICE.link +
      "</a>" +
      "</div></div>";
  }

  /* ONE interval, at one second, cleared the moment the target passes. A
   * requestAnimationFrame loop for a seconds counter would wake the page
   * sixty times for every number it changes. See the block at
   * COUNTDOWN_TARGET for why the label, the absolute mechanism, the
   * .is-live gate and the removal at zero are all the way they are. */
  function wireCountdown(notice) {
    var el = notice.querySelector("[data-countdown]");
    if (!el) return;
    var target = parseInt(el.getAttribute("data-countdown"), 10);
    if (!target) { el.remove(); return; }

    var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm) {
      var secs = el.querySelector('[data-cd="seconds"]');
      if (secs) secs.remove();
    }
    /* Index-aligned with CD_UNITS, and stays aligned because the only
     * segment ever dropped is the last one. */
    var units = [].slice.call(el.querySelectorAll(".cd-unit"));
    var timer = null;

    function tick() {
      var left = target - Math.floor(Date.now() / 1000);
      if (left <= 0) {
        if (timer) clearInterval(timer);
        notice.classList.remove("is-live");
        el.remove();
        return;
      }
      var v = [
        Math.floor(left / 86400),
        Math.floor(left / 3600) % 24,
        Math.floor(left / 60) % 60,
        left % 60
      ];
      var last = units.length - 1;
      units.forEach(function (unit, i) {
        var n = v[i];
        unit.querySelector(".cd-n").textContent = String(n);
        unit.querySelector(".cd-l").textContent =
          n === 1 ? CD_UNITS[i].one : CD_UNITS[i].many;
        /* Recomputed every tick from the live count, so the "and" is
         * already in the right place when reduced motion has dropped
         * the seconds. */
        unit.querySelector(".cd-sep").textContent = cdSep(i, last);
      });
      /* Only after real digits are in the DOM. Idempotent, so it costs
       * nothing to leave it on the tick rather than track a flag. */
      notice.classList.add("is-live");
    }

    tick();
    if (!el.parentNode) return;
    timer = setInterval(tick, calm ? 60000 : 1000);
  }

  /* ---- THE CTA BAR AND THE QUOTES. Chip, 2026-07-29. ----
   *
   * Both were homepage-only sections. They are now the top of the footer,
   * so they render on every page from this one definition.
   *
   * THE BAR STATES NOTHING NEW, ON PURPOSE. It is a label and three
   * links, and every string in it is already a locked asset: the two
   * doors and the Request access CTA. A band that runs on 41 pages is the
   * worst possible place to introduce a sentence, because a claim made
   * there is made 41 times and the verbatim ledger cannot see it coming.
   * If a line is ever wanted here, it gets ledgered first.
   *
   * TYPE ON THE ORANGE PANEL IS NEAR-BLACK. --accent-ink, never light.
   * White on this orange measures 3.42:1 and fails. This is the rule the
   * site breaks most often and the bar is now its largest surface. */
  var CTA_BAR = {
    label: "Two doors",
    links: [DOORS[0], DOORS[1]],
    end:   CTA
  };

  /* Three of the nine published quotes. All nine still live on the
   * homepage's own module; these are the footer's set and they are a
   * fixed three, not a rotation, because a rotation on every page needs a
   * script and this component renders identically without one.
   *
   * ATTRIBUTION ONLY, AND NEVER A MARK. Two of these name a government or
   * military employer. That is attribution, which is permitted; it is not
   * permission to render that department's crest, which never renders.
   * Words are cut, never changed. */
  var FOOTER_QUOTES = [
    { quote: "ConvergX is one of the very few conferences that I have ever attended that provides real value.",
      who: "Jeff LaFrenz", org: "VizworX Inc." },
    { quote: "ConvergX has been a great opportunity for us to engage with representatives from some of those industries, understand their challenges, and find synergies between their needs and ours.",
      who: "Gary Biermann", org: "Lockheed Martin" },
    { quote: "Your conference was the most professional I've attended in the last 10 years, you should be very proud.",
      who: "Cam MacDonald", org: "" },
    { quote: "I meet key people and the lectures are eye opening \u2026 I wouldn't miss it.",
      who: "Chuck Bean", org: "The Method Effect" },
    { quote: "The opportunity to engage directly with Aerospace, Defence and Security sectors enables broader markets and accelerates the introduction of solutions into practical use.",
      who: "Stephan King", org: "Royal Canadian Navy Innovation Team" },
    { quote: "I'm very happy to be here and I'm impressed with the group of people that you've brought together for this forum.",
      who: "BGen Carpentier", org: "Joint Task Force North" },
    { quote: "Conferences like this are valuable because it gives us a deeper understanding of who the key players are in the Arctic.",
      who: "BGen Hardin", org: "Department of National Defence" },
    { quote: "It was an honor to present at your conference.",
      who: "Claude Rochette", org: "Department of National Defence" },
    { quote: "I learned from and met many fascinating people I would normally never cross paths with. Different perspectives are so valuable in getting creative and thinking outside the box.",
      who: "Blaire Lancaster", org: "" }
  ];

  /* THE TWO DOORS AS BLOCKS, in the footer, on the dark ground. Chip,
   * 2026-07-29: the same orange-and-white pair the header panel carries, with
   * the same longer copy, so a reader who never opens the menu still gets the
   * context rather than two bare words on a band.
   * It reuses doorBlocks(), so the copy, the tones, the whole-block link and
   * the near-black type on orange are defined once and cannot drift apart
   * between the header and the footer. */
  function buildCtaBar() {
    return (
      '<section class="cta-blocks" aria-label="' + CTA_BAR.label + '">' +
        /* No label above and no link below. Chip, 2026-07-29: the two blocks
         * say what they are, and a "Two doors" kicker plus a Request access
         * link underneath was three calls to action stacked on each other. */
        '<div class="wrap">' + doorBlocks(currentPath()) + "</div>" +
      "</section>"
    );
  }

  /* THE FOOTER IS ALWAYS DARK as of 2026-07-29 (Chip), so the quotes stop
   * inheriting the page ground and take the footer's. They were surface-
   * matched to the section above them for one day; the footer being one
   * consistent thing on every page is the stronger rule, and it is what
   * lets the two CTA blocks below use the same orange-and-white pair the
   * header panel uses.
   * The track is a scroll-snap row: with scripts off it is still every
   * quote, readable and scrollable, and the arrows simply do not appear. */
  function buildQuotes() {
    var items = FOOTER_QUOTES.map(function (q) {
      return '<li class="quote"><figure>' +
        "<blockquote><p>" + q.quote + "</p></blockquote>" +
        '<figcaption><span class="q-who">' + q.who + "</span>" +
        (q.org ? '<span class="q-org">' + q.org + "</span>" : "") +
        "</figcaption>" +
      "</figure></li>";
    }).join("");
    return (
      '<section class="footer-quotes" aria-label="Published quotes">' +
        '<div class="wrap">' +
          '<div class="fq-head">' +
            '<div class="fq-title">' + "<h2>ConvergX testimonials</h2>" + "</div>" +
            '<p class="fq-arrows">' +
              '<button type="button" class="fq-arrow" data-fq="prev" aria-label="Previous quotes">&#8592;</button>' +
              '<button type="button" class="fq-arrow" data-fq="next" aria-label="Next quotes">&#8594;</button>' +
            "</p>" +
          "</div>" +
          '<ul class="footer-quote-grid" data-fq-track>' + items + "</ul>" +
        "</div>" +
      "</section>"
    );
  }

  function buildFooter() {
    var cols = FOOTER.map(function (col) {
      var links = col.links.map(function (l) {
        return "<li><a href=\"" + l.href + "\">" + l.label + "</a></li>";
      }).join("");
      return "<div><p class=\"label label--lo\">" + col.title + "</p><ul>" + links + "</ul></div>";
    }).join("");
    return (
      /* No rule above the footer. The double hairline read as a heavy line
       * drawn across the page rather than as a boundary, and the header lost
       * its rule for the same reason. The footer separates itself by its own
       * ground and spacing. The .rule-double device still belongs to the page
       * sections that use it deliberately. */
      /* The quotes then the bar, above the footer's own ground: the
       * reader is handed the proof and then the door, in that order. */
      buildQuotes() +
      buildCtaBar() +
      '<div class="footer-inner">' +
        '<a class="logo logo--mark" href="/" style="display:block">' +
          logoSvg(LOGO_VIEWBOX_MARK, "ConvergX") +
        "</a>" +
        '<div class="footer-cols">' + cols + "</div>" +
        '<div class="footer-meta">' +
          '<span class="label label--lo">Where industry lines disappear</span>' +
          /* THE LEGAL LINE IS DELIBERATELY ABSENT, NOT FORGOTTEN.
           *
           * This slot used to render a visible .ph placeholder naming Kim.
           * .ph is loud by design, so every page of the site was showing a
           * reader an internal to-do note with the client's CEO named in
           * it. Removed 2026-07-29. The note lives here now, where only a
           * developer sees it.
           *
           * WHAT IS STILL OPEN: the entity, the legal line, and the
           * relationship between ConvergX and WaVv. Spec open question 4,
           * blocked on Kim Van Vliet.
           *
           * NEW INFORMATION, and it does NOT resolve it. ConvergX's own
           * relaunched site now pairs "WaVv and ConvergX" publicly, in
           * Kim's title. That is a public pairing, not a statement of which
           * entity owns this site or what the legal line reads. DO NOT put
           * WaVv in the footer and do not compose a line from it. A legal
           * line is the one thing on a site that is never inferred.
           *
           * Until Kim answers, the footer says the organisation's name and
           * stops, which is true. */
          '<span class="label label--lo">ConvergX</span>' +
        "</div>" +
      "</div>"
    );
  }

  /* The only interactive behaviour in the shell, and it is a DISCLOSURE,
   * not a menubar: one button, one region, no roving tabindex, no focus
   * trap. Tab walks into the panel and straight out the far side, which
   * is the escape route. A real trap inside a nav bar is a trap.
   *
   * Open on hover, and on the BUTTON, never on focus arriving. Opening
   * on focusin broke the keyboard entirely: tabbing to the trigger
   * opened the panel by itself, so the Enter that followed saw an open
   * panel and closed it. A screen reader also heard aria-expanded go
   * false-then-true with the user never having acted. The button owns
   * the state now, which is what a disclosure is supposed to do.
   *
   * Close on Escape (from anywhere, so a pointer user who never focused
   * anything can still dismiss it), on focus leaving the item, and on
   * the pointer leaving unless focus is still inside.
   *
   * Motion budget spent: zero. The panel appears. */
  function wireMega(root) {
    /* Wires EVERY panel in the bar, however many there are: About gained
     * one on 2026-07-29 and needed no change here, which is the point of
     * selecting on the class rather than naming the panels. Each closes
     * independently; opening one does not close the other, because
     * focusout and mouseleave already handle that per item. */
    root.querySelectorAll(".nav-mega").forEach(wireOneMega);
  }

  function wireOneMega(item) {
    if (!item) return;
    /* THE LINK IS THE TRIGGER as of 2026-08-04, when the caret was removed.
     * It carries aria-expanded and aria-controls, and set() keeps that
     * attribute honest on hover and on focus alike, so it is never a state
     * that is declared and never changes. Clicking it still navigates: the
     * panel is a hover and focus disclosure, not a click menu. */
    var btn = item.querySelector(".nav-mega-btn");
    var panel = item.querySelector(".mega");
    if (!btn || !panel) return;

    function set(open) {
      panel.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }

    /* Closing is DELAYED and cancellable. The panel is positioned against the
     * header, not the item, so travelling from the button to a link crosses
     * ground that belongs to neither. The CSS bridge covers the vertical strip;
     * this covers the diagonal, where the pointer clips a neighbouring item on
     * the way down. Re-entering cancels the pending close, so the menu only
     * shuts once the pointer has genuinely settled somewhere else. */
    var closeTimer = null;
    function cancelClose() { if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; } }
    function closeSoon() {
      cancelClose();
      closeTimer = setTimeout(function () {
        if (!item.contains(document.activeElement)) set(false);
      }, 220);
    }

    /* NO CLICK HANDLER on the trigger any more. It is a link and clicking it
     * goes to the page, which is what it already did; opening the panel on
     * click as well would be one control doing two things.
     * FOCUSIN IS THE KEYBOARD EQUIVALENT OF MOUSEENTER and it is what
     * replaced the caret. Bound on the item rather than the link so that
     * focus moving INTO an open panel keeps it open, which the focusout
     * handler below already assumes. Tabbing past the item closes it. */
    item.addEventListener("focusin", function () { cancelClose(); set(true); });
    item.addEventListener("mouseenter", function () { cancelClose(); set(true); });
    item.addEventListener("mouseleave", closeSoon);
    panel.addEventListener("mouseenter", cancelClose);
    item.addEventListener("focusout", function (e) {
      if (!item.contains(e.relatedTarget)) { cancelClose(); set(false); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" && e.key !== "Esc") return;
      if (panel.hidden) return;
      /* Focus goes back to the trigger, not nowhere, so Escape from
       * inside the panel does not dump the user at the top of the
       * document. Focusin DOES open the panel again as of 2026-08-04, so the
       * order matters once more: focus returns to the trigger first, then the
       * panel is hidden, or the refocus would immediately reopen it. */
      if (item.contains(document.activeElement)) btn.focus();
      set(false);
    });
  }


  /* The header floats over content once past the first screenful, and takes a
   * hairline while it does. It does NOT resize: the bar is the same height at
   * rest and in flight, and the rule is always in the box at transparent, so
   * only its colour changes and the page never shifts.
   *
   * An IntersectionObserver on a zero-height sentinel does the sensing, so
   * nothing runs on every scroll frame. Reduced motion keeps the state and drops
   * the fade, because a separator over moving content is information, not an
   * effect. */
  function wireFloat(header) {
    if (!("IntersectionObserver" in window)) return;
    var sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    /* Top is the header's OWN resting offset, not the document's, because
     * the notice bar now sits above it. At top:0 the hairline would flip
     * one notice-height late and the bar would float over moving content
     * with no separator for that stretch. The span below the resting
     * offset is unchanged at one header height. */
    sentinel.style.cssText = "position:absolute;top:" + header.offsetTop +
      "px;left:0;width:1px;height:var(--shell-h);pointer-events:none";
    document.body.insertBefore(sentinel, document.body.firstChild);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      header.style.transition = "none";
    }
    new IntersectionObserver(function (entries) {
      header.classList.toggle("shell-header--floating", !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(sentinel);
  }

  /* THE REAL DISTANCE FROM THE TOP OF THE VIEWPORT TO THE CONTENT.
   * --shell-h is the nav bar alone, a constant, and the notice sits ABOVE the
   * nav, so the two together are what actually pushes the page down. The
   * homepage hero has to fill exactly the rest of the screen, and it can only
   * do that against a number that includes the notice.
   * It is MEASURED, not typed, for one reason: the notice self-removes after
   * the Congress (NOTICE_UNTIL). On the day it stops rendering this number
   * drops by its height on its own and the hero still fills the screen.
   * Re-measured on resize because the notice wraps to two lines on a phone.
   * The CSS falls back to --shell-h when this never runs (no JS). */
  /* ---- THE SECTION SUBNAV: stuck state, and the current-section marker ----
   * Both are progressive enhancement and BOTH degrade to nothing. With
   * scripts off the subnav is a row of working anchors: no band, because
   * .subnav--stuck is never added, and no marker, because aria-current is
   * never set. That is the correct no-JS result, not a compromise, and it
   * is why neither state is expressed in the markup.
   *
   * The band is deliberately NOT painted while the bar is still in the flow
   * under the hero. It earns its ground at the moment it starts floating,
   * which is the same rule and the same sentinel technique as
   * .shell-header--floating above.
   *
   * WHY NOT PURE CSS: a link cannot be styled from the state of a section
   * that comes after it, and :target only fires on a click and then goes
   * stale the moment the reader scrolls past. Neither answers "what am I
   * looking at now", which is the only question this marker exists for. */
  function wireSubnav() {
    var nav = document.querySelector(".subnav");
    if (!nav || !("IntersectionObserver" in window)) return;

    var links = [].slice.call(nav.querySelectorAll('a[href^="#"]'));
    if (!links.length) return;

    /* Only links whose target actually exists. A subnav pointing at a
     * removed section should lose its marker, not throw. */
    var pairs = links.map(function (a) {
      return { link: a, section: document.getElementById(a.getAttribute("href").slice(1)) };
    }).filter(function (p) { return p.section; });
    if (!pairs.length) return;

    /* ---- the stuck band ---- */
    var sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:" + nav.offsetTop +
      "px;left:0;width:1px;height:1px;pointer-events:none";
    document.body.insertBefore(sentinel, document.body.firstChild);
    new IntersectionObserver(function (e) {
      nav.classList.toggle("subnav--stuck", !e[0].isIntersecting);
    }, { threshold: 0 }).observe(sentinel);

    /* ---- the current-section marker ----
     * Recomputed from POSITIONS rather than from which sections happen to
     * be intersecting. With a dozen short sections several are on screen at
     * once, so "is visible" cannot pick one; "the last one whose top has
     * passed under the bars" always can, and it is stable while scrolling
     * in both directions. The observer is only a cheap trigger. */
    function mark() {
      var rect = nav.getBoundingClientRect();
      /* The stuck band is toggled HERE as well as from the sentinel observer
       * above. Two mechanisms for one class is deliberate, not redundancy:
       * the observer is the cheap one and carries it during normal reading,
       * but IntersectionObserver callbacks are throttled or dropped entirely
       * while a document is hidden, and a reader returning to a backgrounded
       * tab mid-page would otherwise find a floating bar with no ground under
       * it. Comparing the bar's own top against its sticky offset costs one
       * layout read that this function already has in hand.
       * classList.toggle with an explicit boolean is idempotent, so the two
       * paths cannot fight each other. */
      nav.classList.toggle(
        "subnav--stuck",
        rect.top <= (parseFloat(getComputedStyle(nav).top) || 0) + 1
      );

      /* THE DETECTION LINE IS THE BAR'S STICKY RESTING POSITION, not wherever
       * the bar currently is. Those are the same number once it floats and
       * wildly different before that: in flow the bar sits far down the page,
       * so its own bottom edge sat below the top of the section AFTER it and
       * that section was marked current at scroll 0, before the reader had
       * reached anything. Resting offset plus the bar's height is a constant
       * and is the line the reader actually reads against. */
      var line = (parseFloat(getComputedStyle(nav).top) || 0) + nav.offsetHeight + 1;

      /* MEASURED ON THE HEADING, NOT ON THE SECTION BOX. Chip, 2026-07-31:
       * "make sure that the active state of the menu only activates when the
       * section above moves fully out of view. Right now, it feels not quite
       * consistent."
       *
       * THE CAUSE. A section box begins at the top of its own padding, and on
       * this page that padding is --space-4xl, up to 144px. So a section's box
       * crossed the bar while its title was still 144px below it and the
       * PREVIOUS section's last paragraph still filled the screen. The marker
       * moved on before the reader had arrived anywhere, and it did so by a
       * different amount per section because the paddings differ, which is
       * exactly the inconsistency described.
       *
       * THE FIX. Measure the h2 the reader actually reads. When a section's
       * heading reaches the bar, the section above it has genuinely left the
       * viewport, and every section switches at the same visual moment
       * regardless of what padding it carries.
       *
       * WHY NOT the previous section's bottom edge, which is the literal
       * reading of the instruction: the subnav tracks five sections and the
       * page has twelve, so "the section above" in subnav terms is often not
       * the section above on screen. #overview ends at the hero, with the
       * impact statement, the flow graphic, #about and #who all sitting
       * between it and #speakers. Keyed to that edge, Speakers would light up
       * while the reader was still in the overview. The heading test gives
       * the behaviour the instruction is after without that failure.
       *
       * The offset is resolved once per pass and falls back to the section
       * box, so a section with no h2 still marks rather than dropping out.
       *
       * THE LINE IS 60 PERCENT DOWN THE VIEWPORT, NOT THE BAR. Chip sent two
       * screenshots on 2026-07-31 showing the exact scroll positions where he
       * expects a marker to move: one with "The Speakers" sitting just under
       * halfway down the screen and Overview still lit, one with "The Agenda"
       * about a third down and Speakers still lit. In both, the heading he
       * wanted marked was already well inside the viewport.
       *
       * Keying to the bar was still too late. A reader looks at the middle of
       * the screen, not the top edge, so by the time a heading reached the
       * sticky bar they had been reading that section for most of a screen
       * with the previous link lit. 60 percent clears both screenshots (48 and
       * 33 percent) with room, and it is measured from the viewport rather
       * than from the bar, so it does not move when the bar's height does.
       *
       * The bar's own resting offset is still the FLOOR. On a short viewport
       * 60 percent can land above the bar, and a line hidden behind the bar
       * would mark a section the reader cannot see. */
      var mid = Math.max(line, window.innerHeight * 0.6);
      var current = pairs[0];
      for (var i = 0; i < pairs.length; i++) {
        var head = pairs[i].section.querySelector("h1, h2");
        var box = (head || pairs[i].section).getBoundingClientRect();
        if (box.top <= mid) current = pairs[i];
      }
      /* The LAST section is a special case: it is usually too short to ever
       * reach the line, so without this the final link can never light up
       * however far the reader scrolls. */
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        current = pairs[pairs.length - 1];
      }
      pairs.forEach(function (p) {
        if (p === current) p.link.setAttribute("aria-current", "true");
        else p.link.removeAttribute("aria-current");
      });
    }

    var io = new IntersectionObserver(mark, {
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });
    pairs.forEach(function (p) { io.observe(p.section); });
    window.addEventListener("scroll", mark, { passive: true });
    window.addEventListener("resize", mark);
    mark();
  }

  function measureShell(header) {
    var set = function () {
      var notice = document.querySelector(".notice");
      var h = header.getBoundingClientRect().height +
              (notice ? notice.getBoundingClientRect().height : 0);
      document.documentElement.style.setProperty("--shell-total", Math.round(h) + "px");
    };
    set();
    if (window.ResizeObserver) new ResizeObserver(set).observe(document.documentElement);
    else window.addEventListener("resize", set);
  }

  /* The quote arrows. Progressive enhancement only: the track is a scroll
   * container that already works by touch and trackpad, and these move it by
   * one card. With scripts off the buttons never get wired and the track is
   * still every quote in DOM order.
   * The step is measured from a real card plus the real gap rather than
   * assumed, because the card width is a minmax() that changes with the
   * viewport. Ends disable, so a reader is never clicking a dead control. */
  function wireQuotes(root) {
    var track = root.querySelector("[data-fq-track]");
    if (!track) return;
    var prev = root.querySelector('[data-fq="prev"]');
    var next = root.querySelector('[data-fq="next"]');
    if (!prev || !next) return;

    function step() {
      var card = track.querySelector(".quote");
      if (!card) return track.clientWidth;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return card.getBoundingClientRect().width + gap;
    }
    function sync() {
      var max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= max - 1;
      /* The peek fade is only honest while there IS a next card. */
      if (track.scrollLeft >= max - 1) track.setAttribute("data-fq-end", "");
      else track.removeAttribute("data-fq-end");
    }
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left:  step(), behavior: "smooth" }); });
    track.addEventListener("scroll", sync, { passive: true });
    if (window.ResizeObserver) new ResizeObserver(sync).observe(track);
    sync();
  }

  /* The person-bio overlays on /congress/#speakers and /about/leadership/.
   * PROGRESSIVE ENHANCEMENT, and the base is not here. The overlay is a
   * :target component in styles.css section 39: a card links to
   * #bio-<slug>, :target reveals the panel, and the close control is a link
   * back to the card's own id, which clears the target AND returns the
   * reader to where they were. That opens and closes with this file deleted.
   *
   * This function adds four things and nothing else, so removing it costs
   * four conveniences and never the component:
   *   1. Escape closes. It does it by clicking the close link rather than
   *      writing location.hash, so there is exactly ONE close path and the
   *      keyboard route cannot drift from the pointer route.
   *   2. Focus moves to the close control on open and back to the trigger
   *      that opened it on close.
   *   3. Focus is trapped inside the panel while it is open.
   *   4. The page behind is locked, and its offset is recorded and put back,
   *      because the browser's own scroll-to-fragment on close would
   *      otherwise land the reader on the card rather than where they were.
   *      Without the script, overscroll-behavior on .bio-scroll is what
   *      holds the background instead.
   *
   * hashchange is the only signal. It fires for the card link, for the close
   * link, for Back and Forward, and for a URL pasted with a bio fragment
   * already in it, so all five routes are one code path. */
  function wireBios() {
    if (!document.querySelector(".bio-overlay")) return;

    var root = document.documentElement;
    var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea,' +
                    ' [tabindex]:not([tabindex="-1"])';
    var openEl = null;
    var returnTo = null;
    var savedY = 0;

    function targetOverlay() {
      var id = window.location.hash.slice(1);
      if (!id) return null;
      /* getElementById, never a selector built from the hash: a fragment is
       * user input and interpolating it into querySelector throws on any
       * value that is not a valid selector. */
      var el = document.getElementById(id);
      return el && el.classList.contains("bio-overlay") ? el : null;
    }

    function sync() {
      var next = targetOverlay();
      if (next === openEl) return;

      if (openEl) {
        root.classList.remove("has-bio-open");
        window.scrollTo(0, savedY);
        var back = returnTo;
        openEl = null;
        returnTo = null;
        /* Only when nothing is opening in its place, so moving straight from
         * one bio to another does not bounce focus out to the grid. */
        if (back && !next && document.contains(back)) back.focus();
      }

      if (next) {
        returnTo = document.querySelector('.bio-trigger[href="#' + next.id + '"]');
        savedY = window.scrollY;
        openEl = next;
        root.classList.add("has-bio-open");
        var scroller = next.querySelector(".bio-scroll");
        if (scroller) scroller.scrollTop = 0;
        var close = next.querySelector(".bio-close");
        if (close) close.focus();
      }
    }

    document.addEventListener("keydown", function (e) {
      if (!openEl) return;

      if (e.key === "Escape") {
        e.preventDefault();
        var close = openEl.querySelector(".bio-close");
        if (close) close.click();
        return;
      }
      if (e.key !== "Tab") return;

      /* Queried per keystroke rather than cached: a panel holds one control
       * today and this stays correct if a bio ever carries a link. */
      var items = openEl.querySelectorAll(FOCUSABLE);
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];

      if (!openEl.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    window.addEventListener("hashchange", sync);
    sync();   /* a bio fragment can be in the URL on first paint */
  }

  function currentPath() {
    var p = window.location.pathname;
    /* Normalise staging filenames back to site routes where possible. */
    return p.replace(/index\.html$/, "");
  }

  function init() {
    /* Hidden defs, once per document. position:absolute is overlay
     * chrome for a zero-size element, not layout. */
    if (!document.getElementById("cx-logo")) {
      var defs = document.createElement("div");
      defs.setAttribute("aria-hidden", "true");
      defs.innerHTML =
        '<svg width="0" height="0" style="position:absolute" focusable="false"' +
        ' xmlns="http://www.w3.org/2000/svg"><defs><g id="cx-logo">' +
        LOGO_PATHS + "</g></defs></svg>";
      document.body.insertBefore(defs, document.body.firstChild);
    }

    var current = currentPath();
    var header = document.querySelector('[data-shell="header"]');
    if (header) {
      header.classList.add("shell-header");
      header.innerHTML = buildHeader(current);
      wireMega(header);
      /* Before wireFloat, which reads the header's resting offset, and
       * the countdown goes live before both of them, because .is-live is
       * what gives the bar its final height and those two measure it. */
      header.insertAdjacentHTML("beforebegin", buildNotice());
      var notice = header.previousElementSibling;
      if (notice && notice.classList.contains("notice")) wireCountdown(notice);
      wireFloat(header);
      measureShell(header);
    }
    wireSubnav();
    /* The flow band's hub takes the real mark. One optional slot, filled from
     * the same defs the header already injected, so this costs nothing on any
     * page that has no slot and degrades to the word "ConvergX" with scripts
     * off. Runs after the header is built: the <use> needs #cx-logo to exist. */
    var logoSlot = document.querySelector("[data-logo-slot]");
    if (logoSlot) logoSlot.innerHTML = logoSvg(LOGO_VIEWBOX_MARK, "ConvergX");
    wireBios();

    var footer = document.querySelector('[data-shell="footer"]');
    if (footer) {
      footer.classList.add("shell-footer");
      /* ALWAYS DARK, on every page, whatever the page's own surface is. */
      footer.setAttribute("data-surface", "dark");
      footer.innerHTML = buildFooter();
      wireQuotes(footer);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
