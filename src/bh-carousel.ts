/**
 * A type used to define the acceptable values BhCarouselSettings.controlType.
 *
 */
export type BhCarouselControls = "buttons" | "tabs";

/**
 * A type used to define the acceptable values BhCarouselSettings.interval.
 */
export type BhCarouselDestination = number | "next" | "previous";

/**
 * A type used to define the acceptable slide-timing range in ms.
 *
 * TODO For now, this is just number; we need to implement the range.
 */
export type BhCarouselInterval = number;

/**
 * A type used to set the acceptable settings parameters for BhCarousel objects.
 */
export type BhCarouselSettings = {
  autoEnable: boolean;
  automatic: boolean;
  controlType: BhCarouselControls;
  interval: BhCarouselInterval;
  startingIndex: number;
};

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
 *         aria-label="Start / stop automatic slide show"
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
    autoEnable: true,
    automatic: true,
    controlType: "buttons",
    interval: 4000,
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
      this.selectors.playPauseButton,
    ) as HTMLButtonElement;
    this.nextButton = this.el.querySelector(
      this.selectors.nextButton,
    ) as HTMLButtonElement;
    this.previousButton = this.el.querySelector(
      this.selectors.previousButton,
    ) as HTMLButtonElement;
    this.firstIndex = 0;
    this.lastIndex = this.slides.length - 1;
    this.current = this.settings.startingIndex;
    this.playing = false;
    this.prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion)",
    ).matches;

    if (this.settings.autoEnable) {
      this.enable();
    }
  }

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
    this.playPauseButton.disabled = true;
    this.playPauseButton.removeEventListener("click", this.handlePlayPauseClick);
    if (this.playPauseButton.dataset.playing) {
      this.playPauseButton.click();
    }
    window.removeEventListener("keydown", this.handleKeydown);
  };

  /**
   * Enables carousel interactivity.
   *
   * @public
   */
  public enable = (): void => {
    // Slides.
    this.slides.forEach((slide, index) =>
      slide.setAttribute("aria-hidden", (index !== this.current).toString()),
    );
    // Next button.
    this.nextButton.hidden = false;
    this.nextButton.addEventListener("click", this.handleNextClick);
    // Previous button.
    this.previousButton.hidden = false;
    this.previousButton.addEventListener("click", this.handlePreviousClick);
    // Play/Pause button.
    this.playPauseButton.hidden = false;
    if (this.prefersReducedMotion) {
      this.playPauseButton.disabled = true;
    } else {
      this.playPauseButton.disabled = false;
      this.playPauseButton.dataset.bhcPlaying = this.playing.toString();
      this.playPauseButton.addEventListener("click", this.handlePlayPauseClick);
      // Start if configured to do so.
      if (this.settings.automatic) {
        this.playPauseButton.click();
      }
    }
    window.addEventListener("keydown", this.handleKeydown);
  };

  /**
   * Navigates to another slide.
   *
   * @param {BhCarouselDestination} destination
   *   'next', 'previous', or the numberic index of the slide to go to.
   * @public
   */
  public goto = (destination: BhCarouselDestination): void => {
    let index;

    if (destination === "next") {
      index =
        this.current === this.lastIndex ? this.firstIndex : this.current + 1;
    } else if (destination === "previous") {
      index =
        this.current === this.firstIndex ? this.lastIndex : this.current - 1;
    } else {
      index = destination;
    }

    (this.slides[this.current] as HTMLElement).setAttribute(
      "aria-hidden",
      true.toString(),
    );
    (this.slides[index] as HTMLElement).setAttribute(
      "aria-hidden",
      false.toString(),
    );

    this.current = index;
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
      if (this.playing) {
        this.pause();
      } else {
        this.play();
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
    this.nextButton.disabled = false;
    this.previousButton.disabled = false;
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
    this.nextButton.disabled = true;
    this.previousButton.disabled = true;
  };

  /**
   * Reverses carousel one slide.
   *
   * @public
   */
  public previous = (): void => this.goto("previous");
}
