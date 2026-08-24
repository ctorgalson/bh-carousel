[**bh-carousel**](../README.md)

---

[bh-carousel](../README.md) / BhCarousel

# Class: BhCarousel

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
    <div aria-live="off" class="bhc__items" id="test-carousel">
      <div
        aria-label="1 of 5"
        aria-roledescription="slide"
        class="bhc__item"
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
        aria-label="2 of 5"
        aria-roledescription="slide"
        class="bhc__item"
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

### new BhCarousel()

> **new BhCarousel**(`element`, `settings`?): [`BhCarousel`](BhCarousel.md)

Constructs a new BhCarousel instance.

#### Parameters

##### element

[`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

The overall containing element of the carousel.

##### settings?

[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`BhCarouselSettings`](../interfaces/BhCarouselSettings.md)\>

Optional settings to override class defaults.

#### Returns

[`BhCarousel`](BhCarousel.md)

#### Defined in

[bh-carousel.ts:244](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L244)

## Methods

### disable()

> **disable**(): `void`

Disables carousel interactivity.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:327](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L327)

---

### enable()

> **enable**(): `void`

Enables carousel interactivity.

Previous and Next buttons are always un-hidden and enabled when the
carousel is not playing automatically. The Play/Pause button is disabled
when prefersReducedMotion is true to respect user accessibility preference.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:342](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L342)

---

### getState()

> **getState**(): [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<[`BhCarouselState`](../interfaces/BhCarouselState.md)\>

Returns the current instance state.

#### Returns

[`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<[`BhCarouselState`](../interfaces/BhCarouselState.md)\>

#### Defined in

[bh-carousel.ts:365](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L365)

---

### goto()

> **goto**(`newCurrentIndex`): `void`

Navigates to another by numeric index.

#### Parameters

##### newCurrentIndex

`number`

#### Returns

`void`

#### Defined in

[bh-carousel.ts:370](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L370)

---

### next()

> **next**(): `void`

Advances carousel one slide.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:434](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L434)

---

### pause()

> **pause**(): `void`

Pauses carousel.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:443](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L443)

---

### play()

> **play**(): `void`

Plays carousel.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:448](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L448)

---

### previous()

> **previous**(): `void`

Reverses carousel one slide.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:453](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L453)
