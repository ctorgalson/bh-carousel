[**@bedlamhotel/bh-carousel**](../README.md)

---

[@bedlamhotel/bh-carousel](../README.md) / BhCarousel

# Class: BhCarousel

Defined in: [bh-carousel.ts:228](https://github.com/ctorgalson/bh-carousel/blob/32d0987f22efab3a33f110449f3abe4e2c6c8da3/src/bh-carousel.ts#L228)

Creates responsive instance of WAI-ARIA's ("with buttons") Carousel pattern.

Uses data attributes for functionality, making it independent of/usable with
any given design system. Only aria-\* attributes are required, but they are
REQUIRED.

## Example

```html
<div aria-label="Test carousel" aria-roledescription="carousel" class="bhc">
  <div class="bhc__inner">
    <div class="bhc__controls">
      <button class="bhc__control" data-bhc-play-pause hidden type="button">
        <!-- Play icon SVG here -->
        <svg
          class="play"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="..." />
        </svg>
        <!-- Pause icon SVG here -->
        <svg
          class="pause"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="..." />
        </svg>
      </button>

      <button
        aria-controls="test-carousel"
        aria-label="Previous slide"
        class="bhc__control bhc__control--previous"
        data-bhc-previous
        hidden
        type="button"
      >
        <!-- Previous icon SVG here -->
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="..." />
        </svg>
      </button>

      <button
        aria-controls="test-carousel"
        aria-label="Next slide"
        class="bhc__control bhc__control--next"
        data-bhc-next
        hidden
        type="button"
      >
        <!-- Next icon SVG here -->
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="..." />
        </svg>
      </button>
    </div>
    <div
      aria-live="off"
      class="bhc__items"
      id="test-carousel"
      data-bhc-slide-container
    >
      <div
        aria-label="1 of 2"
        aria-roledescription="slide"
        class="bhc__item"
        data-bhc-slide
        role="group"
      >
        <div class="bhc__image">
          <a href="https://example.com/slide-1">
            <img
              src="./img/slide-1.webp"
              alt="Bare trees and dead leaves alongside a creek in an autumn forest"
            />
          </a>
        </div>
        <div class="bhc__caption">
          <h2>Slide 1</h2>
          <p>
            Ullus investigandi veri, nisi inveneris, et quaerendi defatigatio
            turpis est, cum esset accusata et vituperata ab Hortensio.
          </p>
        </div>
      </div>

      <div
        aria-label="2 of 2"
        aria-roledescription="slide"
        class="bhc__item"
        data-bhc-slide
        role="group"
      >
        <div class="bhc__image">
          <a href="https://example.com/slide-2">
            <img
              src="./img/slide-2.webp"
              alt="Path through a hollow rimmed with bare and yellowing trees on a sunny day in autumn"
            />
          </a>
        </div>
        <div class="bhc__caption">
          <h2>Slide 2</h2>
          <p>
            Qui liber cum et mortem contemnit, qua qui est imbutus quietus esse
            numquam potest.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  new BhCarousel(document.querySelector('[aria-roledescription="carousel"]'));
</script>
```

## See

https://www.w3.org/WAI/ARIA/apg/patterns/carousel/examples/carousel-1-prev-next/#javascriptandcsssourcecode

## Constructors

### Constructor

> **new BhCarousel**(`element`, `settings?`): `BhCarousel`

Defined in: [bh-carousel.ts:270](https://github.com/ctorgalson/bh-carousel/blob/32d0987f22efab3a33f110449f3abe4e2c6c8da3/src/bh-carousel.ts#L270)

Constructs a new BhCarousel instance.

#### Parameters

##### element

[`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

The overall containing element of the carousel.

##### settings?

[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`BhCarouselSettings`](../interfaces/BhCarouselSettings.md)\>

Optional settings to override class defaults.

#### Returns

`BhCarousel`

## Methods

### disable()

> **disable**(): `void`

Defined in: [bh-carousel.ts:403](https://github.com/ctorgalson/bh-carousel/blob/32d0987f22efab3a33f110449f3abe4e2c6c8da3/src/bh-carousel.ts#L403)

Disables interactivity, resets DOM to original state (not a guarantee!)

#### Returns

`void`

---

### enable()

> **enable**(): `void`

Defined in: [bh-carousel.ts:368](https://github.com/ctorgalson/bh-carousel/blob/32d0987f22efab3a33f110449f3abe4e2c6c8da3/src/bh-carousel.ts#L368)

Enables carousel interactivity.

Previous and Next buttons are always un-hidden and enabled when the
carousel is not playing automatically. The Play/Pause button is disabled
when prefersReducedMotion is true to respect user accessibility preference.

#### Returns

`void`

---

### getState()

> **getState**(): [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<[`BhCarouselState`](../interfaces/BhCarouselState.md)\>

Defined in: [bh-carousel.ts:668](https://github.com/ctorgalson/bh-carousel/blob/32d0987f22efab3a33f110449f3abe4e2c6c8da3/src/bh-carousel.ts#L668)

Returns the current instance state.

#### Returns

[`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<[`BhCarouselState`](../interfaces/BhCarouselState.md)\>

---

### goto()

> **goto**(`i`, `action?`): `void`

Defined in: [bh-carousel.ts:474](https://github.com/ctorgalson/bh-carousel/blob/32d0987f22efab3a33f110449f3abe4e2c6c8da3/src/bh-carousel.ts#L474)

Navigates to a slide by numeric index.

#### Parameters

##### i

`number`

##### action?

[`BhCarouselAction`](../type-aliases/BhCarouselAction.md) = `"goto"`

#### Returns

`void`

---

### next()

> **next**(): `void`

Defined in: [bh-carousel.ts:456](https://github.com/ctorgalson/bh-carousel/blob/32d0987f22efab3a33f110449f3abe4e2c6c8da3/src/bh-carousel.ts#L456)

Navigates to next slide. No-op at last slide when wrap is false.

#### Returns

`void`

---

### pause()

> **pause**(): `void`

Defined in: [bh-carousel.ts:507](https://github.com/ctorgalson/bh-carousel/blob/32d0987f22efab3a33f110449f3abe4e2c6c8da3/src/bh-carousel.ts#L507)

Pauses automatic playback.

#### Returns

`void`

---

### play()

> **play**(): `void`

Defined in: [bh-carousel.ts:491](https://github.com/ctorgalson/bh-carousel/blob/32d0987f22efab3a33f110449f3abe4e2c6c8da3/src/bh-carousel.ts#L491)

Starts automatic playback, this.state.prefersReducedMotion permitting.

#### Returns

`void`

---

### previous()

> **previous**(): `void`

Defined in: [bh-carousel.ts:465](https://github.com/ctorgalson/bh-carousel/blob/32d0987f22efab3a33f110449f3abe4e2c6c8da3/src/bh-carousel.ts#L465)

Navigates to previous slide. No-op at first slide when wrap is false.

#### Returns

`void`
