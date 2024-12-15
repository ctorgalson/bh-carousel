export type BhCarouselControls = 'buttons' | 'tabs';

export type BhCarouselDestination = number | 'next' | 'previous';

// TODO: *constrain* this number to something reasonable (e.g. 10-15k).
export type BhCarouselInterval = number;

export type BhCarouselSettings = {
  autoEnable: boolean,
  automatic: boolean,
  controlType: BhCarouselControls,
  interval: BhCarouselInterval,
};

export default class BhCarousel {

  private $el: HTMLElement;
  private current: number;
  private defaults: BhCarouselSettings = {
    autoEnable: true,
    automatic: true,
    controlType: 'buttons',
    interval: 2500,
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

  constructor(element: HTMLElement, settings = {}) {
    this.$el = element;
    this.settings = { ...this.defaults, ...settings };
    this.slides = [...this.$el.querySelectorAll('[aria-roledescription="slide"]')];
    this.playPause = this.$el.querySelector('[data-bhc-play-pause]') as HTMLButtonElement;
    this.next = this.$el.querySelector('[data-bhc-next]') as HTMLButtonElement;
    this.previous = this.$el.querySelector('[data-bhc-previous]') as HTMLButtonElement;
    this.firstIndex = 0;
    this.lastIndex = this.slides.length - 1;
    this.current = this.slides.findIndex((slide) => (slide as HTMLElement).hidden === false);
    this.playing = false;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion)').matches;

    this.disable = this.disable.bind(this);
    this.enable = this.enable.bind(this);
    this.goto = this.goto.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.init = this.init.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);

    this.init();
  }

  protected disable() {
    this.next.disabled = true;
    this.next.removeEventListener('click', this.handleNextClick);
    this.previous.disabled = true;
    this.previous.removeEventListener('click', this.handlePreviousClick);
    this.playPause.disabled = true;
    this.playPause.removeEventListener('click', this.handlePlayPauseClick);
    if (this.playPause.dataset.playing) {
      this.playPause.click();
    }
    window.removeEventListener('keydown', this.handleKeydown);
  };

  protected enable() {
    // Next button.
    this.next.disabled = false;
    this.next.addEventListener('click', this.handleNextClick);
    // Previous button.
    this.previous.disabled = false;
    this.previous.addEventListener('click', this.handlePreviousClick);
    // Play/Pause button.
    if (this.prefersReducedMotion) {
      this.playPause.disabled = true;
    } else {
      this.playPause.disabled = false;
      this.playPause.dataset.playing = false.toString();
      this.playPause.addEventListener('click', this.handlePlayPauseClick);
      // Start if configured to do so.
      if (this.settings.automatic) {
        this.playPause.click();
      }
    }
    window.addEventListener('keydown', this.handleKeydown);
  };

  public goto(destination: BhCarouselDestination) {
    let index;

    switch (destination) {
      case 'next':
        index = this.current === this.lastIndex ? this.firstIndex : this.current + 1;
        break;

      case 'previous':
        index = this.current === this.firstIndex ? this.lastIndex : this.current - 1;
        break;

      default:
        index = destination;
    }

    (this.slides[this.current] as HTMLElement).hidden = true;
    (this.slides[index] as HTMLElement).hidden = false;
    this.current = index;
  };

  protected handleKeydown(event: KeyboardEvent) {
    const {key} = event;
    switch (key) {
      case 'ArrowRight':
        if (!this.next.disabled) {
          this.next.click();
        }
        break;
      case 'ArrowLeft':
        if (!this.previous.disabled) {
          this.previous.click();
        }
        break;
      case 'p':
      case 'P':
        if (!this.prefersReducedMotion) {
          this.playPause.click();
        }
        break;
      default:
    }
  }

  protected handleNextClick(event: Event) {
    if (event.currentTarget !== this.next) {
      return;
    }
    this.goto('next');
  };

  protected handlePlayPauseClick(event: Event) {
    if (event.currentTarget !== this.playPause) {
      return;
    }
    if (this.playing) {
      this.pause();
    } else {
      this.play();
    }
  };

  protected handlePreviousClick(event: Event) {
    if (event.currentTarget !== this.previous) {
      return;
    }
    this.goto('previous');
  };

  protected init() {
    if (this.settings.autoEnable) {
      this.enable();
    }
  };

  public pause() {
    window.clearInterval(this.intervalId);
    this.playing = false;
    this.playPause.dataset.bhcPlaying = this.playing.toString();
    this.next.disabled = false;
    this.previous.disabled = false;
  }

  public play() {
    this.intervalId = window.setInterval(() => {
      this.goto('next');
    }, this.settings.interval);
    this.playing = true;
    this.playPause.dataset.bhcPlaying = this.playing.toString();
    this.next.disabled = true;
    this.previous.disabled = true;
  }

}
