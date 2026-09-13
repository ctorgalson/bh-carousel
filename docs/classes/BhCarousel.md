[**@bedlamhotel/bh-carousel**](../README.md)

---

[@bedlamhotel/bh-carousel](../README.md) / BhCarousel

# Class: BhCarousel

Defined in: [bh-carousel.ts:214](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L214)

Creates responsive instance of WAI-ARIA's ("with buttons") Carousel pattern.

Uses data attributes for functionality, making it independent of/usable with
any given design system. Only aria-\* attributes are required, but they are
REQUIRED.

## Example

```html
<div aria-label="Test carousel" aria-roledescription="carousel" class="bhc">
  <div class="bhc__inner">
    <div class="bhc__controls">
      <button
        class="bhc__control"
        data-bhc-play-pause
        hidden
        type="button"
      ></button>

      <button
        aria-controls="test-carousel"
        aria-label="Previous slide"
        class="bhc__control bhc__control--previous"
        data-bhc-previous
        hidden
        type="button"
      ></button>

      <button
        aria-controls="test-carousel"
        aria-label="Next slide"
        class="bhc__control bhc__control--next"
        data-bhc-next
        hidden
        type="button"
      ></button>
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

Defined in: [bh-carousel.ts:254](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L254)

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

Defined in: [bh-carousel.ts:387](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L387)

Disables interactivity, resets DOM to original state (not a guarantee!)

#### Returns

`void`

---

### enable()

> **enable**(): `void`

Defined in: [bh-carousel.ts:352](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L352)

Enables carousel interactivity.

Previous and Next buttons are always un-hidden and enabled when the
carousel is not playing automatically. The Play/Pause button is disabled
when prefersReducedMotion is true to respect user accessibility preference.

#### Returns

`void`

---

### getState()

> **getState**(): [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<[`BhCarouselState`](../interfaces/BhCarouselState.md)\>

Defined in: [bh-carousel.ts:645](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L645)

Returns the current instance state.

#### Returns

[`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<[`BhCarouselState`](../interfaces/BhCarouselState.md)\>

---

### goto()

> **goto**(`i`, `action?`): `void`

Defined in: [bh-carousel.ts:451](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L451)

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

Defined in: [bh-carousel.ts:433](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L433)

Navigates to next slide. No-op at last slide when wrap is false.

#### Returns

`void`

---

### pause()

> **pause**(): `void`

Defined in: [bh-carousel.ts:484](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L484)

Pauses automatic playback.

#### Returns

`void`

---

### play()

> **play**(): `void`

Defined in: [bh-carousel.ts:468](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L468)

Starts automatic playback, this.state.prefersReducedMotion permitting.

#### Returns

`void`

---

### previous()

> **previous**(): `void`

Defined in: [bh-carousel.ts:442](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L442)

Navigates to previous slide. No-op at first slide when wrap is false.

#### Returns

`void`
