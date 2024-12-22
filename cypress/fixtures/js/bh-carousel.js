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
            startingIndex: 0,
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
         * @param {BhCarouselSettings} settings
         *   Settings object to override class defaults.
         * @defaultValue BhCarousel
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
            this.current = this.getFirstIndex();
            this.playing = false;
            this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)").matches;
            if (this.settings.autoEnable) {
                this.enable();
            }
        }
        /**
         * Disables carousel interactivity.
         *
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
         * @public
         */
        enable = () => {
            // Slides.
            this.slides.forEach((slide, index) => slide.setAttribute("aria-hidden", (index !== this.current).toString()));
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
         * Retrieves first slide index; prefers aria-hidden, falls back to settings.
         */
        getFirstIndex = () => {
            // Prefer an indication from the markup, but default to class settings.
            const hiddenIndex = this.slides.findIndex((slide) => slide.getAttribute("aria-hidden") === "false");
            return hiddenIndex != -1 ? hiddenIndex : this.settings.startingIndex;
        };
        /**
         * Navigates to another slide.
         *
         * @param {BhCarouselDestination} destination
         *   'next', 'previous', or the numberic index of the slide to go to.
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
        /**
         * Handles keydown events for Carousel.
         *
         * @param {KeyboardEvent} event
         *   The event passed in by the listener.
         * @protected
         */
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
        /**
         * Handles click events for Next button.
         *
         * @param {Event} event
         *   The event passed in by the listener.
         * @protected
         */
        handleNextClick = (event) => {
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
        /**
         * Handles click events for Previous button.
         *
         * @param {Event} event
         *   The event passed in by the listener.
         * @protected
         */
        handlePreviousClick = (event) => {
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
        pause = () => {
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
