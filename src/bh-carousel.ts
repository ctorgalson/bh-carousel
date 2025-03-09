/**
 * A type used to define the 'actions' that the library's events can report.
 */
export type BhCarouselAction = "next" | "pause" | "play" | "previous";

/**
 * A type used to define the acceptable values BhCarouselSettings.controlType.
 */
export type BhCarouselControls = "buttons" | "tabs";

/**
 * A type used to define the acceptable values BhCarouselSettings.interval.
 */
export type BhCarouselDestination = number | "next" | "previous";

/**
 * An interface defining the structure of BhCarousel event details objects.
 *
 * @property {BhCarouselAction} action
 *   The type of action triggering the event.
 * @property {number} currentIndex
 *   The index of the current item *after* updating the object in response to
 *   the event ("previous" and "next" actions only.
 * @property {number} previousIndex
 *   The index of the previous item *after* updating the object in response to
 *   the event ("previous" and "next" actions only).
 */
export interface BhCarouselEventDetail {
  action: BhCarouselAction;
  currentIndex?: number;
  previousIndex?: number;
};

/**
 * A type used to define the acceptable slide-timing range in ms.
 *
 * TODO For now, this is just number; we need to implement the range.
 */
export type BhCarouselInterval = number;

/**
 * A type used to set the acceptable settings parameters for BhCarousel objects.
 *
 * @property {string} ariaLabelPause
 *   Value for the Play/Pause button's aria-label attribute when playing (e.g.
 *   "Pause carousel").
 * @property {string} ariaLabelPlay
 *   Value for the Play/Pause button's aria-label attribute when paused (e.g.
 *   "Play carousel").
 * @property {boolean} autoEnable
 *   Whether or not to automatically enable carousel interactivity. Sometimes
 *   useful when it's desireable to make the interactivity responsive.
 * @property {boolean} automatic
 *   Whether or not to auto-play the carousel on initialization. This setting
 *   is only guaranteed to be honoured if the user's prefers-reduced-motion
 *   allows it.
 * @property {BhCarouselControls} controlType
 *   Whether the carousel uses only buttons for control or buttons and tabs.
 aulay*   Currently has no effect as tab-style navigation hasn't been implemented.
 * @property {BhCarouselInterval} interval
 *   The interval, in milliseconds, between slides when carousel is playing
 *   automatically.
 * @property {itemStateAttribute} string
 *   The name of the *boolean* attribute to set on active/inactive items.
 *   Defaults to aria-hidden; if set to any other value, than the default or
 *   `hidden`, take care for the accessibility of each item.
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
  interval: BhCarouselInterval;
  itemStateAttribute: string;
  startingIndex: number;
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
 * </code></pre>
 * 
 * @class
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/carousel/examples/carousel-1-prev-next/#javascriptandcsssourcecode
 */
export default class BhCarousel {
  private el: HTMLElement;
  private current: number;
  private defaults: BhCarouselSettings = {
    ariaLabelPause: "Pause carousel",
    ariaLabelPlay: "Play carousel",
    autoEnable: true,
    automatic: true,
    controlType: "buttons",
    interval: 4000,
    itemStateAttribute: "aria-hidden",
    startingIndex: 0,
  };
  private firstIndex: number;
  private intervalId: string | number | NodeJS.Timeout | undefined;
  private lastIndex: number;
  private nextButton: HTMLButtonElement;
  private playing: boolean;
  private playPauseButton: HTMLButtonElement;
  private previousButton: HTMLButtonElement;
  private prefersReducedMotion: boolean;
  private selectors = {
    nextButton: "[data-bhc-next]",
    playPauseButton: "[data-bhc-play-pause]",
    previousButton: "[data-bhc-previous]",
    slide: "[aria-roledescription='slide']",
  };
  private settings: BhCarouselSettings;
  private slides: Element[];

  /**
   * Constructs a new BhCarousel instance.
   *
   * @param {HTMLElement} element
   *   The overall containing element of the carousel.
   * @param {BhCarouselSettings} settings
   *   Settings object to override class defaults.
   * @defaultValue BhCarousel
   */
  constructor(element: HTMLElement, settings?: BhCarouselSettings) {
    this.el = element;
    this.settings = { ...this.defaults, ...settings };
    this.slides = [...this.el.querySelectorAll(this.selectors.slide)];
    this.playPauseButton = this.el.querySelector(
      this.selectors.playPauseButton
    ) as HTMLButtonElement;
    this.nextButton = this.el.querySelector(
      this.selectors.nextButton
    ) as HTMLButtonElement;
    this.previousButton = this.el.querySelector(
      this.selectors.previousButton
    ) as HTMLButtonElement;
    this.firstIndex = 0;
    this.lastIndex = this.slides.length - 1;
    this.current = this.settings.startingIndex;
    this.playing = false;
    this.prefersReducedMotion = this.getPrefersReducedMotion();

    if (this.settings.autoEnable) {
      this.enable();
    }
  }

  /**
   * Creates a custom bhCarousel event.
   *
   * @param {BhCarouselAction} action
   *   The action triggering the event.
   * @param {object} detail
   *   The detail(s) for the event. For example, the 'previous' and 'next'
   *   events return 'previous' or 'next', along with the current and previous
   *   item indexes.
   * @protected
   */
  protected createEvent = (detail: BhCarouselEventDetail): Event => new CustomEvent(
    'BhCarousel',
    {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail,
    },
  );

  /**
   * Disables carousel interactivity.
   *
   * @public
   */
  public disable = (): void => {
    this.nextButton.disabled = true;
    this.nextButton.removeEventListener("click", this.handleNextClick);
    this.previousButton.disabled = true;
    this.previousButton.removeEventListener("click", this.handlePreviousClick);
    if (this.playPauseButton) {
      this.playPauseButton.disabled = true;
      this.playPauseButton.removeAttribute("aria-label");
      this.playPauseButton.removeEventListener(
        "click",
        this.handlePlayPauseClick
      );
      if (this.playPauseButton.dataset.playing) {
        this.pause();
      }
    }
    window.removeEventListener("keydown", this.handleKeydown);
  };

  /**
   * Enables carousel interactivity.
   *
   * - Previous and Next buttons are always un-hidden, and are enabled whenever
   *   the carousel is not playing automatically.
   * - Play/Pause button is:
   *     - visible and enabled when this.prefersReducedMotion is false, OR when
   *       the this.settings.reducedMotion setting is set to "permissive",
   *     - hidden when this.prefersReducedMotion is true AND the setting
   *       this.settings.reducedMotion is "strict".
   *   These settings, in the default configuration, completely disable the
   *   automatic carousel behaviour, but permit the USER to auto-play the
   *   carousel in circumstances where this.prefersReducedMotion can't be
   *   reliably determined.
   *
   * @public
   */
  public enable = (): void => {
    // Slides.
    this.slides.forEach((slide, index) =>
      slide.setAttribute(
        this.settings.itemStateAttribute,
        (index !== this.current).toString()
      )
    );
    // Next button.
    this.nextButton.hidden = false;
    this.nextButton.addEventListener("click", this.handleNextClick);
    // Previous button.
    this.previousButton.hidden = false;
    this.previousButton.addEventListener("click", this.handlePreviousClick);
    // Play/Pause button.
    if (this.playPauseButton) {
      this.playPauseButton.hidden = false;
      if (this.prefersReducedMotion) {
        this.playPauseButton.disabled = true;
      } else {
        this.playPauseButton.disabled = false;
        this.playPauseButton.dataset.bhcPlaying = this.playing.toString();
        this.playPauseButton.addEventListener("click", this.handlePlayPauseClick);
        // Start if configured to do so.
        if (this.settings.automatic) {
          this.play();
        } else {
          this.pause();
        }
      }
    }
    window.addEventListener("keydown", this.handleKeydown);
  };

  /**
   * Returns the index of the current carousel item.
   *
   * @public
   */
  public getCurrentIndex = (): number => this.current;

  /**
   * Returns the index of the first carousel item.
   *
   * @public
   */
  public getFirstIndex = (): number => this.firstIndex;

  /**
   * Returns the index of the last carousel item.
   *
   * @public
   */
  public getLastIndex = (): number => this.lastIndex;

  /**
   * Returns a value for user's prefers-reduced-motion-setting
   */
  protected getPrefersReducedMotion = (): boolean => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  /**
   * Navigates to another slide.
   *
   * @param {BhCarouselDestination} destination
   *   'next', 'previous', or the numberic index of the slide to go to.
   * @public
   */
  public goto = (destination: BhCarouselDestination): void => {
    const previousIndex = this.current;
    let currentIndex;

    if (destination === "next") {
      currentIndex =
        this.current === this.lastIndex ? this.firstIndex : this.current + 1;
    } else if (destination === "previous") {
      currentIndex =
        this.current === this.firstIndex ? this.lastIndex : this.current - 1;
    } else {
      currentIndex = destination;
    }

    (this.slides[this.current] as HTMLElement).setAttribute(
      this.settings.itemStateAttribute,
      true.toString()
    );
    (this.slides[currentIndex] as HTMLElement).setAttribute(
      this.settings.itemStateAttribute,
      false.toString()
    );

    this.current = currentIndex;

    if (destination === "next" || destination === "previous") {
      this.el.dispatchEvent(this.createEvent(
        {action: destination, currentIndex, previousIndex}
      ));
    }
  };

  /**
   * Handles keydown events for Carousel.
   *
   * @param {KeyboardEvent} event
   *   The event passed in by the listener.
   * @protected
   */
  protected handleKeydown = (event: KeyboardEvent): void => {
    const { key } = event;

    if (key === "ArrowRight" && !this.nextButton.disabled) {
      this.next();
    } else if (key === "ArrowLeft" && !this.previousButton.disabled) {
      this.previous();
    } else if (key.toLowerCase() === "p" && !this.prefersReducedMotion) {
      if (this.playPauseButton) {
        if (this.playing) {
          this.pause();
        } else {
          this.play();
        }
      }
    }
  };

  /**
   * Handles click events for Next button.
   *
   * @param {Event} event
   *   The event passed in by the listener.
   * @protected
   */
  protected handleNextClick = (event: Event): void => {
    if (event.currentTarget !== this.nextButton) {
      return;
    }

    this.next();
  };

  /**
   * Handles click events for Play/Pause button.
   *
   * @param {Event} event
   *   The event passed in by the listener.
   * @protected
   */
  protected handlePlayPauseClick = (event: Event): void => {
    if (event.currentTarget !== this.playPauseButton) {
      return;
    }

    if (this.playing) {
      this.pause();
    } else {
      this.play();
    }
  };

  /**
   * Handles click events for Previous button.
   *
   * @param {Event} event
   *   The event passed in by the listener.
   * @protected
   */
  protected handlePreviousClick = (event: Event): void => {
    if (event.currentTarget !== this.previousButton) {
      return;
    }

    this.previous();
  };

  /**
   * Advances carousel one slide.
   *
   * @public
   */
  public next = (): void => this.goto("next");

  /**
   * Pauses carousel.
   *
   * @public
   */
  public pause = (): void => {
    window.clearInterval(this.intervalId);
    this.playing = false;
    this.playPauseButton.dataset.bhcPlaying = this.playing.toString();
    this.playPauseButton.setAttribute(
      "aria-label",
      this.settings.ariaLabelPlay
    );
    this.nextButton.disabled = false;
    this.previousButton.disabled = false;
    this.el.dispatchEvent(this.createEvent({ action: "pause" }));
  };

  /**
   * Plays carousel.
   *
   * @public
   */
  public play = (): void => {
    this.intervalId = window.setInterval(() => {
      this.goto("next");
    }, this.settings.interval);
    this.playing = true;
    this.playPauseButton.dataset.bhcPlaying = this.playing.toString();
    this.playPauseButton.setAttribute(
      "aria-label",
      this.settings.ariaLabelPause
    );
    this.nextButton.disabled = true;
    this.previousButton.disabled = true;
    this.el.dispatchEvent(this.createEvent({ action: "play" }));
  };

  /**
   * Reverses carousel one slide.
   *
   * @public
   */
  public previous = (): void => this.goto("previous");
}
