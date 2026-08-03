/* The process plate on /platform/: which of the five module groups the reader
 * is in, and therefore which stage of the diagram is drawn.
 *
 * THE BRIEF, Chip 2026-07-31: "what if we came up with a really cool dynamic
 * graphic that evolves as you scroll down the page. The content on the left
 * scrolls, but the graphic kind of stays the same but evolves through the
 * process that you see in the menu bar eyebrows for the platform. Companies
 * stating their requirements on the opportunity board, then rfp scraping, etc
 * etc... then to the deciding who should meet part and scoring, the matching
 * engine and configerable scoring... , then through the introduction, etc
 * etc... then also the reference modules... finally, the Congress parts at the
 * end."
 *
 * THE PINNING IS NOT IN THIS FILE. position: sticky is pure CSS and it holds
 * with scripts off, so there is no scroll handler here moving anything. All
 * this file decides is WHICH STAGE, and it says so by writing one attribute
 * and toggling two classes. Do not grow it into a scroll positioner.
 *
 * THE POLARITY, the same one flow.js states: this file only ever writes
 * attributes and classes onto elements the markup already contains. It adds
 * nothing to the DOM and removes nothing from it. The markup ships a COMPLETE
 * figure with every stage drawn and no motion, so with scripts off, or if this
 * file throws on the way in, the reader sees a finished diagram rather than an
 * empty frame. See the reveal note in styles.css section 44: the CSS hides
 * stages only when data-stage is present, which is why "no script" and
 * "finished" are the same state and neither needed a special case.
 *
 * NO SCROLL-LINKED ANIMATION TIMELINE. animation-timeline: view() would
 * express this in a few lines and it is not in stable Safari or Firefox, and
 * this site ships no browser-conditional behaviour.
 *
 * BUDGET: nothing runs while the section is off screen or the tab is hidden.
 * An IntersectionObserver carries both, exactly as globe.js does, and it also
 * gates the CSS pulse: a keyframe on a scrolled-past element keeps ticking
 * unless something takes the animation off it, and .is-seen is that something.
 *
 * Zero dependencies. Nothing is fetched. No build step.
 */
(function () {
  "use strict";

  var fig = document.querySelector(".pfig");
  var groups = document.querySelectorAll(".pflow-group");
  if (!fig || !groups.length) return;
  if (!("IntersectionObserver" in window)) return;

  /* The five <g> in the plate, in DOM order, one per group. If the counts ever
   * disagree the markup has been edited without this file, and driving four
   * stages from five groups would be worse than not running: leave, and the
   * complete static figure stands. */
  var art = fig.querySelector(".pfig-art");
  var stages = fig.querySelectorAll(".pfig-art > g");
  if (!art || stages.length !== groups.length) return;

  /* The heading is what the reader actually reads, and it is what the marker is
   * measured against, for the reason spelled out at wireSubnav in shell.js: a
   * group's BOX starts at the top of its own row gap, so a box test moves the
   * stage on while the previous group's last module still fills the screen.
   * Resolved once, with the group as the fallback so a group with no h2 still
   * votes rather than dropping out of the sequence. */
  var heads = [];
  for (var i = 0; i < groups.length; i++) {
    heads.push(groups[i].querySelector("h2") || groups[i]);
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var seen = false;
  var cur = -1;

  /* ONE STAGE LIT, AND IT IS WRITTEN FROM HERE AND NOWHERE ELSE. Same
   * discipline as setLit in flow.js: one writer is what guarantees two stages
   * can never be live at once. Guarded on a change, because mark() runs on
   * every scroll event and rewriting an identical class list would be a style
   * recalculation per frame for nothing, and it would restart the transition. */
  function setStage(n) {
    if (n === cur) return;
    if (cur >= 0) stages[cur].classList.remove("is-live");
    stages[n].classList.add("is-live");
    fig.setAttribute("data-stage", String(n + 1));
    cur = n;
  }

  /* THE DETECTION LINE IS THE BOTTOM EDGE OF THE ARTWORK, and it is measured
   * rather than picked. A group is current once its heading has risen above
   * the bottom of the plate that is illustrating it, which is a real
   * relationship between the two columns instead of a fraction of the
   * viewport, and it needs no number typed anywhere.
   *
   * WHY NOT A VIEWPORT FRACTION, which is what wireSubnav in shell.js uses for
   * the subnav marker on /congress/. That page's problem was "which of twelve
   * sections is the reader in" and 60 percent answers it well. This page's
   * problem is different and it is measurable: the last two groups are two
   * modules each and therefore short, so the final stage has the least scroll
   * to arrive in and it is the one that can be starved. Measured at 1280 by
   * 900 against the artwork edge, every one of the five stages gets at least
   * 180px of scroll with the plate still pinned; at a 60 percent line the last
   * one got 151 and on a 700px viewport it fell to 31, which is a stage the
   * reader would never see hold still.
   *
   * THE ARTWORK, NOT THE WHOLE FIGURE, and that is what makes this safe on a
   * short viewport. The art carries a max-block-size in styles.css section 44
   * that keeps it inside the viewport by construction, so its bottom edge can
   * never fall below the fold. The readout and the caption sit under it and
   * can, which is why they are not in this measurement. */
  function mark() {
    if (!seen || document.hidden) return;
    /* ZERO SIZE MEANS NOT RENDERED, and below 60rem it is not: the plate is
     * display:none there and the groups stack. Same check flow.js makes, and
     * for the same reason. There is nothing to mark, so nothing is written and
     * a phone never carries a stage attribute at all. */
    var box = art.getBoundingClientRect();
    if (!box.width || !box.height) return;
    var line = box.bottom;
    var n = 0;
    for (var i = 0; i < heads.length; i++) {
      if (heads[i].getBoundingClientRect().top <= line) n = i;
    }
    setStage(n);
  }

  /* THE PULSE IS OFF UNLESS THE PLATE IS ON SCREEN, THE TAB IS VISIBLE AND
   * MOTION IS WANTED. Under reduced motion the class is never added at all, so
   * the animation is never created rather than created and then suppressed.
   * styles.css section 44 also cancels it under the query, which is belt and
   * braces on purpose: the stylesheet has to be correct on its own, because it
   * is what a scriptless reader gets. */
  function budget() {
    fig.classList.toggle("is-seen", seen && !document.hidden && !reduce.matches);
  }

  new IntersectionObserver(function (es) {
    seen = es[0].isIntersecting;
    budget();
    mark();
  }, { threshold: 0 }).observe(fig.parentNode);

  document.addEventListener("visibilitychange", function () { budget(); mark(); });
  window.addEventListener("scroll", mark, { passive: true });
  window.addEventListener("resize", mark);

  /* Re-checked at runtime, the way globe.js re-checks its own. A reader who
   * turns the preference on mid-page gets the pulses removed immediately, and
   * one who turns it off gets them back without a reload. The stage itself is
   * untouched either way: which stage is drawn is information, not motion. */
  var onMq = function () { budget(); };
  if (reduce.addEventListener) reduce.addEventListener("change", onMq);
  else if (reduce.addListener) reduce.addListener(onMq);

  budget();
  mark();
})();
