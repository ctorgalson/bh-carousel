(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.BhCarousel = factory());
})(this, (function () { 'use strict';

    /**
     * Creates responsive instance of WAI-ARIA's ("with buttons") Carousel pattern.
     *
     * Uses data attributes for functionality, making it independent of/usable with
     * any given design system. Only aria-* attributes are required, but they are
     * REQUIRED.
     *
     * @class
     * @see https://www.w3.org/WAI/ARIA/apg/patterns/carousel/examples/carousel-1-prev-next/#javascriptandcsssourcecode
     */
    class BhCarousel {
        $el;
        current;
        defaults = {
            autoEnable: true,
            automatic: true,
            controlType: "buttons",
            interval: 4000,
        };
        firstIndex;
        intervalId;
        lastIndex;
        next;
        playing;
        playPause;
        previous;
        prefersReducedMotion;
        settings;
        slides;
        /**
         * Constructs a new BhCarousel instance.
         *
         * @param {HTMLElement} element
         *   The overall containing element of the carousel.
         * @param {BhCarouselSettings}
         *   Settings object to override class defaults.
         * @constructor
         */
        constructor(element, settings) {
            this.$el = element;
            this.settings = { ...this.defaults, ...settings };
            this.slides = [
                ...this.$el.querySelectorAll('[aria-roledescription="slide"]'),
            ];
            this.playPause = this.$el.querySelector("[data-bhc-play-pause]");
            this.next = this.$el.querySelector("[data-bhc-next]");
            this.previous = this.$el.querySelector("[data-bhc-previous]");
            this.firstIndex = 0;
            this.lastIndex = this.slides.length - 1;
            this.current = this.slides.findIndex((slide) => slide.getAttribute("aria-hidden") === "false");
            this.playing = false;
            this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)").matches;
            if (this.settings.autoEnable) {
                this.enable();
            }
        }
        /**
         * Disables carousel interactivity.
         *
         * @method
         * @public
         */
        disable = () => {
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
         * @method
         * @public
         */
        enable = () => {
            // Next button.
            this.next.disabled = false;
            this.next.addEventListener("click", this.handleNextClick);
            // Previous button.
            this.previous.disabled = false;
            this.previous.addEventListener("click", this.handlePreviousClick);
            // Play/Pause button.
            if (this.prefersReducedMotion) {
                this.playPause.disabled = true;
            }
            else {
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
         * Navigates to another slide.
         *
         * @param {BhCarouselDestination} destination
         *   'next', 'previous', or the numberic index of the slide to go to.
         * @method
         * @public
         */
        goto = (destination) => {
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
            this.slides[this.current].setAttribute("aria-hidden", true.toString());
            this.slides[index].setAttribute("aria-hidden", false.toString());
            this.current = index;
        };
        handleKeydown = (event) => {
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
            }
        };
        handleNextClick = (event) => {
            if (event.currentTarget !== this.next) {
                return;
            }
            this.goto("next");
        };
        handlePlayPauseClick = (event) => {
            if (event.currentTarget !== this.playPause) {
                return;
            }
            if (this.playing) {
                this.pause();
            }
            else {
                this.play();
            }
        };
        handlePreviousClick = (event) => {
            if (event.currentTarget !== this.previous) {
                return;
            }
            this.goto("previous");
        };
        pause = () => {
            window.clearInterval(this.intervalId);
            this.playing = false;
            this.playPause.dataset.bhcPlaying = this.playing.toString();
            this.next.disabled = false;
            this.previous.disabled = false;
        };
        play = () => {
            this.intervalId = window.setInterval(() => {
                this.goto("next");
            }, this.settings.interval);
            this.playing = true;
            this.playPause.dataset.bhcPlaying = this.playing.toString();
            this.next.disabled = true;
            this.previous.disabled = true;
        };
    }

    return BhCarousel;

}));
