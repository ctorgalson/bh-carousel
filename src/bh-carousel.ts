/**
 * A type used to define the 'actions' that the library's events can report.
 */
export type BhCarouselAction =
  | "constructor"
  | "disable"
  | "enable"
  | "goto"
  | "reducedMotionChange"
  | "next"
  | "pause"
  | "play"
  | "previous"
  | null;

/**
 * A type used to define the acceptable values BhCarouselSettings.controlType.
 */
export type BhCarouselControls = "buttons" | "tabs";

/**
 * A type used to define the acceptable slide-timing range in ms.
 *
 * TODO For now, this is just number; we need to implement the range.
 */
export type BhCarouselInterval = number;

/**
 * An interface defining acceptable settings parameters for BhCarousel objects.
 *
 * @property {string} ariaLabelPause
 *   Value for the Play/Pause button's aria-label attribute when playing (e.g.
 *   "Pause carousel").
 * @property {string} ariaLabelPlay
 *   Value for the Play/Pause button's aria-label attribute when paused (e.g.
 *   "Play carousel").
 * @property {boolean} autoEnable
 *   Whether or not to automatically enable carousel interactivity. Sometimes
 *   useful when it's desirable to make the interactivity responsive.
 * @property {boolean} automatic
 *   Whether or not to auto-play the carousel on initialization. This setting
 *   is only guaranteed to be honoured if the user's prefers-reduced-motion
 *   allows it.
 * @property {BhCarouselControls} controlType
 *   Whether the carousel uses only buttons for control or buttons and tabs.
 *   Currently has no effect as tab-style navigation hasn't been implemented.
 * @property {BhCarouselInterval} interval
 *   The interval, in milliseconds, between slides when carousel is playing
 *   automatically.
 * @property {string} itemStateAttribute
 *   The name of the *boolean* attribute to set on active/inactive items.
 *   Defaults to aria-hidden; if set to any other value, take care for the
 *   accessibility of each item. Must be a valid HTML attribute name beginning
 *   with a lowercase letters followed by one or more lowercase letters, numbers
 *   or hyphens.
 * @property {number} startingIndex
 *   Zero-based index of starting slide. E.g. to start on the third slide,
 *   set this value to 2.
 * @property {boolean} wrap
 *   Whether or not to continue to the first slide when "Next" is clicked on
 *   the last side/the last slide when "Previous" is clicked on the first
 *   slide.
 */
export interface BhCarouselSettings {
  ariaLabelPause: string;
  ariaLabelPlay: string;
  autoEnable: boolean;
  automatic: boolean;
  controlType: BhCarouselControls;
  interval: BhCarouselInterval;
  itemStateAttribute: string;
  startingIndex: number;
  wrap: boolean;
}

/**
 * An interface for defining the current state of a BhCarousel instance.
 *
 * @property {number} currentIndex
 *   The numeric (zero-based) index of the current slide in the carousel.
 * @property {boolean} enabled
 *   Whether or not carousel interactivity is enabled at all.
 * @property {number} firstIndex
 *   The numeric (zero-based) index of the first slide in the carousel. Always
 *   zero.
 * @property {number} lastIndex
 *   The numeric (zero-based) index of the last slide in the carousel.
 * @property {number | null} nextIndex
 *   The numeric (zero-based) index of the next slide in the carousel, or
 *   null when the carousel is at the last slide and `wrap` is false.
 * @property {boolean} playing
 *   Whether or not the carousel is currently auto-playing.
 * @property {boolean} prefersReducedMotion
 *   The current user preference for prefers-reduced-motion (true means that
 *   a css media query has returned 'reduce', and false means that it has
 *   returned 'no-preference').
 * @property {number | null} previousIndex
 *   The numeric (zero-based) index of the previous slide in the carousel,
 *   or null when the carousel is at the first slide and `wrap` is false.
 */
export interface BhCarouselState {
  currentIndex: number;
  enabled: boolean;
  firstIndex: number;
  lastIndex: number;
  nextIndex: number | null;
  playing: boolean;
  prefersReducedMotion: boolean;
  previousIndex: number | null;
}

/**
 * Creates responsive instance of WAI-ARIA's ("with buttons") Carousel pattern.
 *
 * Uses data attributes for functionality, making it independent of/usable with
 * any given design system. Only aria-* attributes are required, but they are
 * REQUIRED.
 *
 * @example
 *
 * ```html
 * <div
 *   aria-label="Test carousel"
 *   aria-roledescription="carousel"
 *   class="bhc"
 * >
 *   <div class="bhc__inner">
 *     <div class="bhc__controls">
 *       <button
 *         class="bhc__control"
 *         data-bhc-play-pause
 *         hidden
 *         type="button"
 *       ></button>

 *       <button
 *         aria-controls="test-carousel"
 *         aria-label="Previous slide"
 *         class="bhc__control bhc__control--previous"
 *         data-bhc-previous
 *         hidden
 *         type="button"
 *       ></button>

 *       <button
 *         aria-controls="test-carousel"
 *         aria-label="Next slide"
 *         class="bhc__control bhc__control--next"
 *         data-bhc-next
 *         hidden
 *         type="button"
 *       ></button>
 *     </div>
 *     <div aria-live="off" class="bhc__items" id="test-carousel" data-bhc-slide-container>
 *       <div
 *         aria-label="1 of 2"
 *         aria-roledescription="slide"
 *         class="bhc__item"
 *         data-bhc-slide
 *         role="group"
 *       >
 *         <div class="bhc__image">
 *           <a href="https://example.com/slide-1">
 *             <img
 *               src="./img/slide-1.webp"
 *               alt="Bare trees and dead leaves alongside a creek in an autumn forest"
 *             />
 *           </a>
 *         </div>
 *         <div class="bhc__caption">
 *           <h2>Slide 1</h2>
 *           <p>
 *             Ullus investigandi veri, nisi inveneris, et quaerendi
 *             defatigatio turpis est, cum esset accusata et vituperata ab
 *             Hortensio.
 *           </p>
 *         </div>
 *       </div>

 *       <div
 *         aria-label="2 of 2"
 *         aria-roledescription="slide"
 *         class="bhc__item"
 *         data-bhc-slide
 *         role="group"
 *       >
 *         <div class="bhc__image">
 *           <a href="https://example.com/slide-2">
 *             <img
 *               src="./img/slide-2.webp"
 *               alt="Path through a hollow rimmed with bare and yellowing trees on a sunny day in autumn"
 *             />
 *           </a>
 *         </div>
 *         <div class="bhc__caption">
 *           <h2>Slide 2</h2>
 *           <p>
 *             Qui liber cum et mortem contemnit, qua qui est imbutus
 *             quietus esse numquam potest.
 *           </p>
 *         </div>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * <script>
 *   new BhCarousel(document.querySelector('[aria-roledescription="carousel"]'));
 * </script>
 * ```
 * 
 * @class
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/carousel/examples/carousel-1-prev-next/#javascriptandcsssourcecode
 */
export default class BhCarousel {
  private activeTransition: ViewTransition | undefined;
  private carousel: HTMLElement;
  private static readonly defaults: BhCarouselSettings = {
    ariaLabelPause: "Pause carousel",
    ariaLabelPlay: "Play carousel",
    autoEnable: true,
    automatic: true,
    controlType: "buttons",
    interval: 4000,
    itemStateAttribute: "aria-hidden",
    startingIndex: 0,
    wrap: true,
  };
  private intervalId: number | undefined;
  private nextButton: HTMLButtonElement;
  private playButton: HTMLButtonElement | null = null;
  private previousButton: HTMLButtonElement;
  private reducedMotionQuery: MediaQueryList;
  private restorers: (() => void)[] = [];
  private readonly selectors = {
    nextButton: "button[data-bhc-next]",
    playButton: "button[data-bhc-play-pause]",
    previousButton: "button[data-bhc-previous]",
    slide: "[data-bhc-slide]",
    slideContainer: "[data-bhc-slide-container][id]",
  };
  private settings: BhCarouselSettings;
  private slideContainer: HTMLElement;
  private slides: NodeListOf<HTMLElement>;
  private state!: BhCarouselState;

  /**
   * Constructs a new BhCarousel instance.
   *
   * @param element
   *   The overall containing element of the carousel.
   * @param settings
   *   Optional settings to override class defaults.
   */
  constructor(element: HTMLElement, settings?: Partial<BhCarouselSettings>) {
    this.carousel = element;
    this.settings = { ...BhCarousel.defaults, ...settings };

    // We need to manage the slides' live region.
    const slideContainer = this.carousel.querySelector<HTMLElement>(
      this.selectors.slideContainer,
    );
    if (!(slideContainer instanceof HTMLElement) || slideContainer.id === "") {
      throw new Error(
        `BhCarousel: no container found or id attr was empty (${this.selectors.slideContainer}).`,
      );
    }
    this.slideContainer = slideContainer;

    // We need to manage the slides themselves.
    const slides = this.slideContainer.querySelectorAll<HTMLElement>(
      this.selectors.slide,
    );
    if (slides.length === 0) {
      throw new Error(
        `BhCarousel: no slides were found (${this.selectors.slide}).`,
      );
    }
    this.slides = slides;

    // We need to manage the next button.
    const nextButton = this.carousel.querySelector<HTMLButtonElement>(
      this.selectors.nextButton,
    );
    if (!nextButton) {
      throw new Error(
        `BhCarousel: no "Next" button was found (${this.selectors.nextButton}).`,
      );
    }
    this.nextButton = nextButton;

    // We need to manage the previous button.
    const previousButton = this.carousel.querySelector<HTMLButtonElement>(
      this.selectors.previousButton,
    );
    if (!previousButton) {
      throw new Error(
        `BhCarousel: no "Previous" button was found (${this.selectors.previousButton}).`,
      );
    }
    this.previousButton = previousButton;

    // We need to manage the Play/Pause button, but it may not be present.
    const playButton = this.carousel.querySelector<HTMLButtonElement>(
      this.selectors.playButton,
    );
    if (playButton) {
      this.playButton = playButton;
    }

    // We need to verify certain settings.
    if (!/^[a-z][a-z0-9-]*$/.test(this.settings.itemStateAttribute)) {
      throw new Error(
        `BhCarousel: invalid itemStateAttribute (${this.settings.itemStateAttribute}).`,
      );
    }

    // Validate startingIndex.
    const { startingIndex } = this.settings;
    this.validateSlideIndex(startingIndex);
    const { nextIndex, previousIndex } = this.getRelativeIndices(startingIndex);

    // We need a way to see if the user's prefers-reduced-motion query changes.
    this.reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    this.state = {
      currentIndex: startingIndex,
      enabled: false,
      firstIndex: 0,
      lastIndex: this.slides.length - 1,
      nextIndex,
      playing: false,
      prefersReducedMotion: this.reducedMotionQuery.matches,
      previousIndex,
    };

    if (this.settings.autoEnable) {
      this.enable();
    }
  }

  // LIFECYCLE

  /**
   * Enables carousel interactivity.
   *
   * Previous and Next buttons are always un-hidden and enabled when the
   * carousel is not playing automatically. The Play/Pause button is disabled
   * when prefersReducedMotion is true to respect user accessibility preference.
   */
  public enable(): void {
    if (this.state.enabled) {
      return;
    }
    this.initAttr(this.nextButton, "aria-controls", this.slideContainer.id);
    this.initAttr(this.previousButton, "aria-controls", this.slideContainer.id);
    this.initAttr(
      this.slideContainer,
      "aria-live",
      this.wantsToPlay() ? "off" : "polite",
    );
    this.slides.forEach((s, i) => {
      this.initAttr(s, "role", "group");
      this.initAttr(s, "aria-roledescription", "slide");
      this.initAttr(
        s,
        this.settings.itemStateAttribute,
        (i !== this.state.currentIndex).toString(),
      );
    });
    this.syncRelativeIndexAttributes(this.state);
    this.attachListeners();
    this.state = { ...this.state, enabled: true };
    this.syncControls();
    this.dispatch("enable");

    if (this.wantsToPlay()) {
      this.play();
    }
  }

  /** Disables interactivity, resets DOM to original state (not a guarantee!) */
  public disable(): void {
    if (!this.state.enabled) {
      return;
    }
    this.activeTransition?.skipTransition();
    this.activeTransition = undefined;
    this.stopInterval();
    this.detachListeners();
    this.nextButton.hidden = true;
    this.previousButton.hidden = true;
    if (this.playButton) {
      this.playButton.hidden = true;
      this.playButton.disabled = false;
    }
    this.restoreAttrs();
    this.state = { ...this.state, enabled: false, playing: false };
    this.dispatch("disable");
  }

  /** Attaches event listeners to DOM elements. */
  private attachListeners(): void {
    this.nextButton.addEventListener("click", this.handleNextClick);
    this.previousButton.addEventListener("click", this.handlePreviousClick);
    this.carousel.addEventListener("keydown", this.handleKeydown);
    this.reducedMotionQuery.addEventListener(
      "change",
      this.handleReducedMotionChange,
    );
    this.playButton?.addEventListener("click", this.handlePlayClick);
  }

  /** Detaches event listeners from DOM elements. */
  private detachListeners(): void {
    this.nextButton.removeEventListener("click", this.handleNextClick);
    this.previousButton.removeEventListener("click", this.handlePreviousClick);
    this.carousel.removeEventListener("keydown", this.handleKeydown);
    this.reducedMotionQuery.removeEventListener(
      "change",
      this.handleReducedMotionChange,
    );
    this.playButton?.removeEventListener("click", this.handlePlayClick);
  }

  // NAVIGATION AND PLAYBACK

  /** Navigates to next slide. No-op at last slide when wrap is false. */
  public next(): void {
    const { nextIndex } = this.state;
    if (nextIndex === null) {
      return;
    }
    this.goto(nextIndex, "next");
  }

  /** Navigates to previous slide. No-op at first slide when wrap is false. */
  public previous(): void {
    const { previousIndex } = this.state;
    if (previousIndex === null) {
      return;
    }
    this.goto(previousIndex, "previous");
  }

  /** Navigates to a slide by numeric index. */
  public goto(i: number, action: BhCarouselAction = "goto"): void {
    if (!this.state.enabled || i === this.state.currentIndex) {
      return;
    }
    this.validateSlideIndex(i);
    const prev = this.state;
    this.state = { ...prev, ...this.getRelativeIndices(i) };
    // Stop autoplaying at the end when wrap is true.
    if (this.state.nextIndex === null && this.state.playing) {
      this.pause();
    }
    this.syncControls();
    this.syncSlides(this.state, prev, action);
    this.dispatch(action);
  }

  /** Starts automatic playback, this.state.prefersReducedMotion permitting. */
  public play(): void {
    const { enabled, nextIndex, playing, prefersReducedMotion } = this.state;
    if (!enabled || prefersReducedMotion || playing || nextIndex === null) {
      return;
    }
    this.state = { ...this.state, playing: true };
    this.intervalId = window.setInterval(
      () => this.next(),
      this.settings.interval,
    );
    this.syncContainer();
    this.syncControls();
    this.dispatch("play");
  }

  /** Pauses automatic playback. */
  public pause(): void {
    if (!this.state.playing) {
      return;
    }
    this.state = { ...this.state, playing: false };
    this.stopInterval();
    this.syncContainer();
    this.syncControls();
    this.dispatch("pause");
  }

  // SYNC HELPERS

  /** Uses state to manage attributes of the slide container. */
  private syncContainer(): void {
    const { playing } = this.state;
    this.slideContainer.setAttribute("aria-live", playing ? "off" : "polite");
  }

  /** Uses state to manage attributes of Previous, Next, and Play buttons. */
  private syncControls(): void {
    const { enabled, nextIndex, playing, prefersReducedMotion, previousIndex } =
      this.state;
    const navDisabled = !enabled || playing;
    this.nextButton.hidden = !enabled;
    this.previousButton.hidden = !enabled;
    this.nextButton.disabled = navDisabled || nextIndex === null;
    this.previousButton.disabled = navDisabled || previousIndex === null;
    if (this.playButton) {
      this.playButton.hidden = !enabled;
      this.playButton.disabled =
        !enabled || prefersReducedMotion || nextIndex === null;
      this.playButton.dataset.bhcPlaying = String(playing);
      this.playButton.setAttribute(
        "aria-label",
        playing ? this.settings.ariaLabelPause : this.settings.ariaLabelPlay,
      );
    }
  }

  /**
   * Uses state to manage attributes of slides.
   *
   * Wraps the mutation in `document.startViewTransition()` when available,
   * letting the browser animate between before/after snapshots. Direction
   * ("forward" | "reverse") is signalled via the transition's `types`
   * option so CSS can gate keyframes on `:active-view-transition-type()`
   * (see `.bhc--horizontal` for a worked example). No document-root state
   * is mutated.
   *
   * If a previous transition is still in flight when a new navigation
   * arrives (e.g. rapid clicks, or an interval shorter than the transition
   * duration), the previous transition is jumped to its end state and a
   * fresh one starts. Applies uniformly — autoplay can interrupt itself
   * the same way user input can.
   */
  private syncSlides(
    state: BhCarouselState,
    prev: BhCarouselState,
    action: BhCarouselAction,
  ): void {
    const mutate = (): void => {
      this.slides[prev.currentIndex]?.setAttribute(
        this.settings.itemStateAttribute,
        "true",
      );
      this.slides[state.currentIndex]?.setAttribute(
        this.settings.itemStateAttribute,
        "false",
      );
      this.syncRelativeIndexAttributes(state, prev);
    };

    if (state.prefersReducedMotion || !("startViewTransition" in document)) {
      mutate();
      return;
    }

    const direction = this.directionFor(action, state, prev);
    this.activeTransition?.skipTransition();
    const t = document.startViewTransition({
      update: mutate,
      types: direction ? [`bhc-${direction}`] : [],
    });
    this.activeTransition = t;
    t.finished.finally(() => {
      if (this.activeTransition === t) {
        this.activeTransition = undefined;
      }
    });
  }

  /**
   * Derives transition direction from the action that triggered it.
   *
   * "next" / "previous" have inherent direction. "goto" derives it from the
   * sign of the index delta. All other actions (enable, etc.) return null —
   * no direction-dependent CSS should apply.
   */
  private directionFor(
    action: BhCarouselAction,
    state: BhCarouselState,
    prev: BhCarouselState,
  ): "forward" | "reverse" | null {
    if (action === "next") {
      return "forward";
    }
    if (action === "previous") {
      return "reverse";
    }
    if (action === "goto") {
      return state.currentIndex > prev.currentIndex ? "forward" : "reverse";
    }
    return null;
  }

  /** Sets and removes dataset attributes according to current/prev state. */
  private syncRelativeIndexAttributes(
    state: BhCarouselState,
    prev?: BhCarouselState,
  ): void {
    type IndexKey = "currentIndex" | "nextIndex" | "previousIndex";
    const attributes: Array<[keyof DOMStringMap, IndexKey]> = [
      ["bhcCurrentSlide", "currentIndex"],
      ["bhcNextSlide", "nextIndex"],
      ["bhcPreviousSlide", "previousIndex"],
    ];
    for (const [dsKey, stateKey] of attributes) {
      const indexBefore = prev?.[stateKey];
      const indexNow = state[stateKey];
      if (
        indexBefore != null &&
        indexBefore !== indexNow &&
        this.slides[indexBefore]
      ) {
        delete this.slides[indexBefore].dataset[dsKey];
      }
      if (indexNow != null && this.slides[indexNow]) {
        this.slides[indexNow].dataset[dsKey] = "";
      }
    }
  }

  /** Computes next, prev indices using currentIndex from state. */
  private getRelativeIndices(
    currentIndex: number,
    lastIndex = this.slides.length - 1,
  ): Pick<BhCarouselState, "currentIndex" | "nextIndex" | "previousIndex"> {
    const firstIndex = 0;
    const endNextIndex = this.settings.wrap ? firstIndex : null;
    const endPreviousIndex = this.settings.wrap ? lastIndex : null;

    return {
      currentIndex,
      nextIndex: currentIndex === lastIndex ? endNextIndex : currentIndex + 1,
      previousIndex:
        currentIndex === firstIndex ? endPreviousIndex : currentIndex - 1,
    };
  }

  /** Returns the current instance state. */
  public getState(): Readonly<BhCarouselState> {
    return { ...this.state };
  }

  // EVENTS

  /** Updates State, Previous, Next, and Play buttons, on media query change. */
  private handleReducedMotionChange = ({
    matches,
  }: MediaQueryListEvent): void => {
    this.state = { ...this.state, prefersReducedMotion: matches };
    if (matches && this.state.playing) {
      this.pause();
    }
    this.syncControls();
    this.dispatch("reducedMotionChange");
  };

  /** Handles keydown events for keyboard navigation. */
  private handleKeydown = ({ key }: KeyboardEvent): void => {
    if (key === "ArrowRight" && !this.nextButton.disabled) {
      this.next();
    } else if (key === "ArrowLeft" && !this.previousButton.disabled) {
      this.previous();
    } else if (key.toLowerCase() === "p" && !this.state.prefersReducedMotion) {
      this.state.playing ? this.pause() : this.play();
    }
  };

  /** Handles click events for Next button. */
  private handleNextClick = (): void => this.next();

  /** Handles click events for Play/Pause button. */
  private handlePlayClick = (): void =>
    this.state.playing ? this.pause() : this.play();

  /** Handles click events for Previous button. */
  private handlePreviousClick = (): void => this.previous();

  /** Validates that an index is within bounds. */
  private validateSlideIndex(index: number): void {
    const firstIndex = 0;
    const lastIndex = this.slides.length - 1;
    if (index < firstIndex || index > lastIndex) {
      throw new Error(
        `BhCarousel: index ${index} is out of bounds (0-${lastIndex})`,
      );
    }
  }

  /** Dispatches custom events named `bhcarousel:${action}`. */
  private dispatch(action: BhCarouselAction): void {
    this.carousel.dispatchEvent(
      new CustomEvent(`bhcarousel:${action}`, {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: { ...this.state, action },
      }),
    );
  }

  // UTILITIES

  /** Runs each of the array of restorers in registration order. */
  private restoreAttrs(): void {
    this.restorers.forEach((restore) => restore());
  }

  /** Returns true if the next enable() will autoplay. */
  private wantsToPlay(): boolean {
    return this.settings.automatic && this.state.nextIndex !== null;
  }

  /** Ensures intervals are cleared on pause/disable. */
  private stopInterval(): void {
    window.clearInterval(this.intervalId);
  }

  /** Initializes attrs, so they can be reset to original values on disable. */
  private initAttr(el: HTMLElement, name: string, value: string): void {
    const originalValue = el.getAttribute(name);
    if (originalValue !== value) {
      el.setAttribute(name, value);
      // NOTE: restorers run in registration order.
      this.restorers.push((): void =>
        originalValue === null
          ? el.removeAttribute(name)
          : el.setAttribute(name, originalValue),
      );
    }
  }
}
