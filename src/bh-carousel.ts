/**
 * A type used to define the acceptable values BhCarouselSettings.controlType.
 */
export type BhCarouselControls = "buttons" | "tabs";

/**
 * A type used to define the acceptable values BhCarouselSettings.interval.
 */
export type BhCarouselDestination = number | "next" | "previous";

/**
 * A type used to define the acceptable slide-timing range in ms.
 *
 * @todo For now, this is just number; we need to implement the range.
 */
export type BhCarouselInterval = number;

/**
 * A type used to define the slideshow behaviour in circumstances where there
 * prefers-reduced-motion can't be reliably determined.
 */
export type BhCarouselReducedMotion = "strict" | "permissive";

/**
 * A type used to set the acceptable settings parameters for BhCarousel objects.
 */
export type BhCarouselSettings = {
  autoEnable: boolean;
  automatic: boolean;
  controlType: BhCarouselControls;
  interval: BhCarouselInterval;
  reducedMotion: BhCarouselReducedMotion;
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
  private $el: HTMLElement;
  private current: number;
  private defaults: BhCarouselSettings = {
    autoEnable: true,
    automatic: true,
    controlType: "buttons",
    interval: 4000,
    reducedMotion: "strict",
    startingIndex: 0,
  };
  private firstIndex: number;
  private intervalId: string | number | NodeJS.Timeout | undefined;
  private lastIndex: number;
  private next: HTMLButtonElement;
  private playing: boolean;
  private playPause: HTMLButtonElement;
  private previous: HTMLButtonElement;
  private prefersReducedMotion: boolean;
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
    this.$el = element;
    this.settings = { ...this.defaults, ...settings };
    this.slides = [
      ...this.$el.querySelectorAll('[aria-roledescription="slide"]'),
    ];
    this.playPause = this.$el.querySelector(
      "[data-bhc-play-pause]",
    ) as HTMLButtonElement;
    this.next = this.$el.querySelector("[data-bhc-next]") as HTMLButtonElement;
    this.previous = this.$el.querySelector(
      "[data-bhc-previous]",
    ) as HTMLButtonElement;
    this.firstIndex = 0;
    this.lastIndex = this.slides.length - 1;
    this.current = this.getFirstIndex();
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
    this.next.disabled = true;
    this.next.removeEventListener("click", this.handleNextClick);
    this.previous.disabled = true;
    this.previous.removeEventListener("click", this.handlePreviousClick);
    this.playPause.disabled = true;
    this.playPause.removeEventListener("click", this.handlePlayPauseClick);
    if (this.playPause.dataset.playing) {
      this.playPause.click();
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
      slide.setAttribute("aria-hidden", (index !== this.current).toString()),
    );
    // Next button.
    this.next.hidden = false;
    this.next.addEventListener("click", this.handleNextClick);
    // Previous button.
    this.previous.hidden = false;
    this.previous.addEventListener("click", this.handlePreviousClick);
    // Play/Pause button.
    this.playPause.hidden = false;
    if (this.prefersReducedMotion) {
      this.playPause.disabled = true;
    } else {
      this.playPause.disabled = false;
      this.playPause.dataset.bhcPlaying = this.playing.toString();
      this.playPause.addEventListener("click", this.handlePlayPauseClick);
      // Start if configured to do so.
      if (this.settings.automatic) {
        this.playPause.click();
      }
    }
    window.addEventListener("keydown", this.handleKeydown);
  };

  /**
   * Retrieves first slide index; prefers aria-hidden, falls back to settings.
   */
  protected getFirstIndex = (): number => {
    // Prefer an indication from the markup, but default to class settings.
    const hiddenIndex = this.slides.findIndex(
      (slide) => (slide as HTMLElement).getAttribute("aria-hidden") === "false",
    );

    return hiddenIndex != -1 ? hiddenIndex : this.settings.startingIndex;
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

    switch (destination) {
      case "next":
        index =
          this.current === this.lastIndex ? this.firstIndex : this.current + 1;
        break;

      case "previous":
        index =
          this.current === this.firstIndex ? this.lastIndex : this.current - 1;
        break;

      default:
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

    switch (key) {
      case "ArrowRight":
        if (!this.next.disabled) {
          this.next.click();
        }
        break;

      case "ArrowLeft":
        if (!this.previous.disabled) {
          this.previous.click();
        }
        break;

      case "p":
      case "P":
        if (!this.prefersReducedMotion) {
          this.playPause.click();
        }
        break;

      default:
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
    if (event.currentTarget !== this.next) {
      return;
    }

    this.goto("next");
  };

  /**
   * Handles click events for Play/Pause button.
   *
   * @param {Event} event
   *   The event passed in by the listener.
   * @protected
   */
  protected handlePlayPauseClick = (event: Event): void => {
    if (event.currentTarget !== this.playPause) {
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
    if (event.currentTarget !== this.previous) {
      return;
    }

    this.goto("previous");
  };

  /**
   * Pauses carousel.
   *
   * @public
   */
  public pause = (): void => {
    window.clearInterval(this.intervalId);
    this.playing = false;
    this.playPause.dataset.bhcPlaying = this.playing.toString();
    this.next.disabled = false;
    this.previous.disabled = false;
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
    this.playPause.dataset.bhcPlaying = this.playing.toString();
    this.next.disabled = true;
    this.previous.disabled = true;
  };
}
