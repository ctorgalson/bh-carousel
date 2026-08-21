/**
 * A type used to define the 'actions' that the library's events can report.
 */
export type BhCarouselAction =
  | "constructor"
  | "disable"
  | "enable"
  | "goto"
  | "handleReducedMotionChange"
  | "next"
  | "pause"
  | "play"
  | "previous";

/**
 * A type used to define the acceptable values BhCarouselSettings.controlType.
 */
export type BhCarouselControls = "buttons" | "tabs";

/**
 * An interface defining the structure of BhCarousel event details objects.
 *
 * @property {BhCarouselAction} action
 *   The type of action triggering the event.
 * @property {number} currentIndex
 *   The index of the current item *after* updating the object in response to
 *   the event.
 * @property {number} nextIndex
 *   The index of the next item *after* updating the object in response to
 *   the event.
 * @property {number} previousIndex
 *   The index of the previous item *after* updating the object in response to
 *   the event.
 */
export interface BhCarouselEventDetail {
  action: BhCarouselAction;
  currentIndex?: number;
  nextIndex?: number;
  previousIndex?: number;
}

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
 *   accessibility of each item.
 * @property {number} startingIndex
 *   Zero-based index of starting slide. E.g. to start on the third slide,
 *   set this value to 2.
 */
export interface BhCarouselSettings {
  ariaLabelPause: string;
  ariaLabelPlay: string;
  autoEnable: boolean;
  automatic: boolean;
  controlType: BhCarouselControls;
  debug: boolean;
  interval: BhCarouselInterval;
  itemStateAttribute: string;
  startingIndex: number;
}

/**
 * An interface for defining the current state of a BhCarousel instance.
 *
 * @property {boolean} playing
 *   Whether or not the carousel is currently auto-playing.
 * @property {number} currentIndex
 *   The numeric (zero-based) index of the current slide in the carousel.
 * @property {boolean} enabled
 *   Whether or not carousel interactivity is enabled at all.
 * @property {number} firstIndex
 *   The numeric (zero-based) index of the first slide in the carousel. Always
 *   zero.
 * @property {number} lastIndex
 *   The numeric (zero-based) index of the last slide in the carousel.
 * @property {string} modifiedBy
 *   The name of the last method to modify the state var. Only exposed for
 *   debugging purposes.
 * @property {boolean} prefersReducedMotion
 *   The current user preference for prefers-reduced-motion (true means that
 *   a css media query has returned 'reduce', and false means that it has
 *   returned 'no-preference').
 */
export interface BhCarouselState {
  playing: boolean;
  currentIndex: number;
  enabled: boolean;
  firstIndex: number;
  lastIndex: number;
  nextIndex: number;
  previousIndex: number;
  modifiedBy: BhCarouselAction;
  prefersReducedMotion: boolean;
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
 *     <div aria-live="off" class="bhc__items" id="test-carousel">
 *       <div
 *         aria-label="1 of 5"
 *         aria-roledescription="slide"
 *         class="bhc__item"
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
 *         aria-label="2 of 5"
 *         aria-roledescription="slide"
 *         class="bhc__item"
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
  private el: HTMLElement;
  private static readonly defaults: BhCarouselSettings = {
    ariaLabelPause: "Pause carousel",
    ariaLabelPlay: "Play carousel",
    autoEnable: true,
    automatic: true,
    controlType: "buttons",
    debug: false,
    interval: 4000,
    itemStateAttribute: "aria-hidden",
    startingIndex: 0,
  };
  private intervalId: number | undefined;
  private reducedMotionQuery: MediaQueryList;
  private nextButton: HTMLButtonElement;
  private playPauseButton: HTMLButtonElement | null;
  private previousButton: HTMLButtonElement;
  private readonly selectors = {
    nextButton: "[data-bhc-next]",
    playPauseButton: "[data-bhc-play-pause]",
    previousButton: "[data-bhc-previous]",
    slide: "[aria-roledescription='slide']",
  };
  private settings: BhCarouselSettings;
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
    this.el = element;
    this.settings = { ...BhCarousel.defaults, ...settings };
    this.slides = this.el.querySelectorAll<HTMLElement>(this.selectors.slide);

    // We need a real attribute.
    if (!/^[a-z][a-z0-9-]*$/.test(this.settings.itemStateAttribute)) {
      throw new Error(
        `BhCarousel: invalid attribute name supplied for settings.itemStateAttribute ("${this.settings.itemStateAttribute}").`,
      );
    }

    // Not much to do with no slides...
    if (this.slides.length === 0) {
      throw new Error(
        "BhCarousel: at least one slide is required to instantiate the carousel.",
      );
    }

    // Required elements
    const nextButton = this.el.querySelector(this.selectors.nextButton);
    const previousButton = this.el.querySelector(this.selectors.previousButton);

    if (
      !(nextButton instanceof HTMLButtonElement) ||
      !(previousButton instanceof HTMLButtonElement)
    ) {
      throw new Error(
        "BhCarousel: both [data-bhc-next] and [data-bhc-previous] button elements are required.",
      );
    }

    this.nextButton = nextButton;
    this.previousButton = previousButton;

    // Optional element
    this.playPauseButton = this.el.querySelector(
      this.selectors.playPauseButton,
    );

    // Validate startingIndex
    this.reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    this.validateSlideIndex(this.settings.startingIndex);

    this.state = {
      currentIndex: this.settings.startingIndex,
      enabled: false,
      firstIndex: 0,
      lastIndex: this.slides.length - 1,
      modifiedBy: "constructor",
      playing: false,
      prefersReducedMotion: this.reducedMotionQuery.matches,
    };

    if (this.settings.autoEnable) {
      this.enable();
    }
  }

  /**
   * Creates a custom bhCarousel event.
   *
   * The 'previous' and 'next' events include currentIndex and previousIndex
   * in the detail. The 'play' and 'pause' events include only the action.
   */
  private createEvent(
    detail: BhCarouselEventDetail,
  ): CustomEvent<BhCarouselEventDetail> {
    const { action } = detail;
    return new CustomEvent(`bhcarousel:${action}`, {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail,
    });
  }

  /** Disables carousel interactivity. */
  public disable(): void {
    const { playing } = this.getState();
    if (playing) {
      window.clearInterval(this.intervalId);
    }
    this.setState({ enabled: false, playing: false, modifiedBy: "disable" });
  }

  /**
   * Enables carousel interactivity.
   *
   * Previous and Next buttons are always un-hidden and enabled when the
   * carousel is not playing automatically. The Play/Pause button is disabled
   * when prefersReducedMotion is true to respect user accessibility preferences.
   */
  public enable(): void {
    const { prefersReducedMotion } = this.getState();
    this.setState({
      enabled: true,
      modifiedBy: "enable",
      playing: this.settings.automatic && !prefersReducedMotion,
    });
  }

  /** Returns numeric value of next slide. */
  public getNextIndex(): number {
    const { currentIndex, firstIndex, lastIndex } = this.getState();
    return currentIndex === lastIndex ? firstIndex : currentIndex + 1;
  }

  /** Returns numeric value of previous slide. */
  public getPreviousIndex(): number {
    const { currentIndex, firstIndex, lastIndex } = this.getState();
    return currentIndex === firstIndex ? lastIndex : currentIndex - 1;
  }

  /** Returns the current instance state. */
  public getState(): Readonly<BhCarouselState> {
    return { ...this.state };
  }

  /** Navigates to another slide: 'next', 'previous', or a numeric index. */
  public goto(destination: BhCarouselDestination): void {
    const { currentIndex: previousIndex } = this.getState();
    let currentIndex;

    if (destination === previousIndex) {
      return;
    }

    switch (destination) {
      case "next":
        currentIndex = this.getNextIndex();
        break;

      case "previous":
        currentIndex = this.getPreviousIndex();
        break;

      default:
        this.validateSlideIndex(destination);
        currentIndex = destination;
    }

    this.setState({ currentIndex, modifiedBy: "goto" });

    if (destination === "next" || destination === "previous") {
      this.el.dispatchEvent(
        this.createEvent({ action: destination, currentIndex, previousIndex }),
      );
    }
  }

  /** Handles keydown events for keyboard navigation. */
  private handleKeydown = (event: KeyboardEvent): void => {
    const { key } = event;
    const { playing, prefersReducedMotion } = this.getState();

    if (key === "ArrowRight" && !this.nextButton.disabled) {
      this.next();
    } else if (key === "ArrowLeft" && !this.previousButton.disabled) {
      this.previous();
    } else if (key.toLowerCase() === "p" && !prefersReducedMotion) {
      if (this.playPauseButton && !this.playPauseButton.disabled) {
        if (playing) {
          this.pause();
        } else {
          this.play();
        }
      }
    }
  };

  /** Handles click events for Next button. */
  private handleNextClick = (): void => this.next();

  /** Handles click events for Play/Pause button. */
  private handlePlayPauseClick = (): void => {
    const { playing } = this.getState();
    if (playing) {
      this.pause();
    } else {
      this.play();
    }
  };

  /** Handles click events for Previous button. */
  private handlePreviousClick = (): void => this.previous();

  /** Handles reduced motion preference change. */
  private handleReducedMotionChange = ({
    matches,
  }: MediaQueryListEvent): void => {
    const { playing } = this.getState();
    const newState: Partial<BhCarouselState> = {
      modifiedBy: "handleReducedMotionChange",
      prefersReducedMotion: matches,
    };
    if (matches && playing) {
      newState.playing = false;
    }
    this.setState(newState);
  };

  /** Advances carousel one slide. */
  public next(): void {
    this.goto("next");
  }

  /** Pauses carousel. */
  public pause(): void {
    this.setState({ playing: false, modifiedBy: "pause" });
  }

  /** Plays carousel. */
  public play(): void {
    this.setState({ playing: true, modifiedBy: "play" });
  }

  /** Reverses carousel one slide. */
  public previous(): void {
    this.goto("previous");
  }

  /** Sets/updates UI based on carousel state. */
  private render(prev: BhCarouselState): void {
    const state = this.getState();
    this.renderNavButtons(state);
    this.renderPlayPauseButton(state);
    this.renderSlides(state, prev);
    this.renderListeners(state, prev);
    this.renderInterval(state, prev);
    this.renderTransitionEvents(state, prev);
    this.debugLog(state);
  }

  /** Syncs previous/next buttons' hidden and disabled attrs from state. */
  private renderNavButtons({ enabled, playing }: BhCarouselState): void {
    const disabled = !enabled || playing;
    this.nextButton.hidden = !enabled;
    this.previousButton.hidden = !enabled;
    this.nextButton.disabled = disabled;
    this.previousButton.disabled = disabled;
  }

  /** Syncs the optional play/pause button's attrs from state. */
  private renderPlayPauseButton({
    enabled,
    playing,
    prefersReducedMotion,
  }: BhCarouselState): void {
    if (!this.playPauseButton) {
      return;
    }
    this.playPauseButton.hidden = !enabled;
    this.playPauseButton.disabled = !enabled || prefersReducedMotion;
    if (enabled) {
      this.playPauseButton.dataset.bhcPlaying = String(playing);
      this.playPauseButton.setAttribute(
        "aria-label",
        playing ? this.settings.ariaLabelPause : this.settings.ariaLabelPlay,
      );
    } else {
      this.playPauseButton.removeAttribute("aria-label");
      delete this.playPauseButton.dataset.bhcPlaying;
    }
  }

  /** Syncs slide itemStateAttribute values from state. */
  private renderSlides(state: BhCarouselState, prev: BhCarouselState): void {
    // Disable transition: clear attribute on all slides.
    if (!state.enabled && prev.enabled) {
      this.slides.forEach((slide) =>
        slide.removeAttribute(this.settings.itemStateAttribute),
      );
      return;
    }
    if (!state.enabled) {
      return;
    }

    // Enable transition: full sync across all slides.
    if (!prev.enabled) {
      this.slides.forEach((slide, index) =>
        slide.setAttribute(
          this.settings.itemStateAttribute,
          (index !== state.currentIndex).toString(),
        ),
      );
      return;
    }

    // Navigation: touch only the two changed slides.
    if (state.currentIndex !== prev.currentIndex) {
      this.slides[prev.currentIndex]!.setAttribute(
        this.settings.itemStateAttribute,
        "true",
      );
      this.slides[state.currentIndex]!.setAttribute(
        this.settings.itemStateAttribute,
        "false",
      );
    }
  }

  /** Attaches or detaches DOM listeners on the enabled transition. */
  private renderListeners(state: BhCarouselState, prev: BhCarouselState): void {
    if (state.enabled === prev.enabled) {
      return;
    }
    if (state.enabled) {
      this.nextButton.addEventListener("click", this.handleNextClick);
      this.previousButton.addEventListener("click", this.handlePreviousClick);
      // TODO: should this be attached to the element?
      window.addEventListener("keydown", this.handleKeydown);
      this.reducedMotionQuery.addEventListener(
        "change",
        this.handleReducedMotionChange,
      );
      this.playPauseButton?.addEventListener(
        "click",
        this.handlePlayPauseClick,
      );
    } else {
      this.nextButton.removeEventListener("click", this.handleNextClick);
      this.previousButton.removeEventListener(
        "click",
        this.handlePreviousClick,
      );
      window.removeEventListener("keydown", this.handleKeydown);
      this.reducedMotionQuery.removeEventListener(
        "change",
        this.handleReducedMotionChange,
      );
      this.playPauseButton?.removeEventListener(
        "click",
        this.handlePlayPauseClick,
      );
    }
  }

  /** Starts or clears the auto-advance interval on the playing transition. */
  private renderInterval(
    { playing }: BhCarouselState,
    prev: BhCarouselState,
  ): void {
    if (playing && !prev.playing) {
      this.intervalId = window.setInterval(
        () => this.next(),
        this.settings.interval,
      );
    } else if (!playing && prev.playing) {
      window.clearInterval(this.intervalId);
    }
  }

  /** Dispatches CustomEvents on various transitions. */
  private renderTransitionEvents(state: BhCarouselState): void {
    const {
      currentIndex,
      modifiedBy: action,
      nextIndex,
      previousIndex,
    } = state;

    this.el.dispatchEvent(
      this.createEvent({ action, currentIndex, nextIndex, previousIndex }),
    );
  }

  /** Logs render call + current state when settings.debug is true. */
  private debugLog(state: BhCarouselState): void {
    if (!this.settings.debug) {
      return;
    }
    console.debug(`render() method called by ${state.modifiedBy}().`, {
      state,
    });
  }

  /** Sets/updates carousel state. */
  private setState(patch: Partial<BhCarouselState>): void {
    const prev = this.state;
    this.state = { ...this.state, ...patch };
    this.render(prev);
  }

  /** Validates that an index is within bounds. */
  private validateSlideIndex(index: number): void {
    const firstIndex = 0;
    const lastIndex = this.slides.length - 1;
    if (index < firstIndex || index > lastIndex) {
      throw new Error(
        `Index ${index} is out of bounds (${firstIndex} - ${lastIndex})`,
      );
    }
  }
}
