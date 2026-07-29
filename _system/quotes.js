/* ConvergX Connect. THE QUOTE CAROUSEL.
 *
 * WHAT THIS FILE IS NOT: it is not what makes the quotes exist. Every
 * quote is in index.html as real markup, and with this file absent,
 * blocked or broken the module is already a finished, readable, wrapped
 * grid of all of them. Nothing here writes a quote, an attribution or a
 * heading, and nothing here may ever start doing so.
 *
 * WHAT IT DOES: turns that grid into a horizontal snapping track,
 * reveals the controls, and advances the track on a timer.
 *
 * THE FOUR RULES IT KEEPS.
 * 1. prefers-reduced-motion: reduce STOPS the auto-advance. It does not
 *    slow it down and it does not merely drop the smooth scroll. The
 *    manual controls stay live, because the preference is about motion
 *    the reader did not ask for, not about taking the module away. The
 *    query is watched, so a reader who changes the setting mid-visit
 *    gets the new behaviour without a reload.
 * 2. Hover and focus pause it. Reading a quote must not be a race.
 * 3. The controls are real buttons with real names, never bare dots.
 * 4. NO LIVE REGION, DELIBERATELY. Nothing is inserted, removed or
 *    hidden: all nine quotes stay in the accessibility tree in DOM
 *    order at all times, and no slide is ever aria-hidden. A screen
 *    reader therefore reads the whole set and the timer never
 *    interrupts it. An aria-live on the track would announce on every
 *    tick, which is the failure this pattern is famous for; an
 *    aria-hidden on the off-screen cards would make the module silent.
 *    Both were rejected on purpose. Do not add either.
 *
 * No dependency, no framework, no external request.
 */
(function () {
  var root = document.querySelector('[data-quotes]');
  if (!root) return;

  var track = root.querySelector('[data-quotes-track]');
  var controls = root.querySelector('[data-quotes-controls]');
  if (!track || !controls) return;

  var prev = controls.querySelector('[data-quotes-prev]');
  var next = controls.querySelector('[data-quotes-next]');
  var toggle = controls.querySelector('[data-quotes-toggle]');
  if (!prev || !next || !toggle) return;

  /* Slow enough to read three quotes. Do not drop this below the time it
   * takes to read the longest card on the page. */
  var STEP_MS = 9000;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var timer = null;
  var pausedByUser = false;

  /* Only now does the layout change, and only now do the buttons appear:
   * everything above this line could still have failed. */
  root.classList.add('is-live');
  controls.hidden = false;
  /* A scrolling region has to be reachable and nameable by keyboard. */
  track.tabIndex = 0;
  track.setAttribute('role', 'group');
  track.setAttribute('aria-label', 'Published quotes');

  /* A page is N cards, NOT the visible width, and the two are not the
   * same number. Three cards plus two gaps fill the width exactly, so
   * the fourth card starts one GAP further along than clientWidth.
   * MEASURED at 1280: stepping by clientWidth left every page after the
   * first 27px short and cut the cards. Deriving the step from the real
   * card pitch fixes it at every breakpoint and needs no breakpoint
   * list here: how many fit is already a CSS decision. */
  function pageStep() {
    var cards = track.children;
    if (cards.length < 2) return track.clientWidth;
    var pitch = cards[1].offsetLeft - cards[0].offsetLeft;
    if (pitch <= 0) return track.clientWidth;
    return Math.max(1, Math.round(track.clientWidth / pitch)) * pitch;
  }

  function advance(dir) {
    var page = pageStep();
    var max = track.scrollWidth - track.clientWidth;
    var at = track.scrollLeft;
    var to;
    if (dir > 0) {
      /* Wrap only once the tail is actually on screen, so the last
       * partial page is never skipped at the two-up width. */
      to = at >= max - 1 ? 0 : Math.min(at + page, max);
    } else {
      to = at <= 1 ? max : Math.max(at - page, 0);
    }
    track.scrollTo({ left: to, behavior: reduced.matches ? 'auto' : 'smooth' });
  }

  function start() {
    if (timer || pausedByUser || reduced.matches || document.hidden) return;
    /* Asked for separately by mouseleave and focusout, and a reader can
     * be using one while the other has just ended: tab into the buttons,
     * then move the mouse away, and a naive resume would start the timer
     * under a keyboard reader who never left. */
    if (root.contains(document.activeElement) || root.matches(':hover')) return;
    timer = window.setInterval(function () { advance(1); }, STEP_MS);
  }

  function stop() {
    if (!timer) return;
    window.clearInterval(timer);
    timer = null;
  }

  function paintToggle() {
    /* Hidden when nothing rotates: a pause button for a thing that never
     * moves is a lie about what the control does. */
    toggle.hidden = reduced.matches;
    toggle.textContent = pausedByUser ? 'Resume' : 'Pause';
    /* The accessible name always contains the visible word (WCAG 2.5.3). */
    toggle.setAttribute('aria-label', pausedByUser ? 'Resume the quote rotation' : 'Pause the quote rotation');
  }

  prev.addEventListener('click', function () { advance(-1); });
  next.addEventListener('click', function () { advance(1); });

  toggle.addEventListener('click', function () {
    pausedByUser = !pausedByUser;
    if (pausedByUser) stop(); else start();
    paintToggle();
  });

  /* Pause while a reader is on it, resume when they leave. focusin and
   * focusout cover the keyboard; they fire for the track and the cards. */
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);

  /* Nothing should tick while the tab is in the background. */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  function onMotionChange() {
    if (reduced.matches) stop(); else start();
    paintToggle();
  }
  if (reduced.addEventListener) reduced.addEventListener('change', onMotionChange);
  else if (reduced.addListener) reduced.addListener(onMotionChange);  /* Safari below 14 */

  paintToggle();
  start();
}());
