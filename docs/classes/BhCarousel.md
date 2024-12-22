[**bh-carousel**](../README.md)

---

[bh-carousel](../globals.md) / BhCarousel

# Class: BhCarousel

Creates responsive instance of WAI-ARIA's ("with buttons") Carousel pattern.

Uses data attributes for functionality, making it independent of/usable with
any given design system. Only aria-\* attributes are required, but they are
REQUIRED.

## Example

```ts
<div
  aria-label="Test carousel"
  aria-roledescription="carousel"
  class="bhc"
>
  <div class="bhc__inner">
    <div class="bhc__controls">
      <button
        aria-label="Stop automatic slide show"
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
            Ullus investigandi veri, nisi inveneris, et quaerendi
            defatigatio turpis est, cum esset accusata et vituperata ab
            Hortensio.
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
            Qui liber cum et mortem contemnit, qua qui est imbutus
            quietus esse numquam potest.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  * new BhCarousel(document.querySelector('[aria-roledescription="carousel"]'));
</script>

@class
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

[`BhCarouselSettings`](../type-aliases/BhCarouselSettings.md)

Settings object to override class defaults.

#### Returns

[`BhCarousel`](BhCarousel.md)

#### Default Value

```ts
BhCarousel;
```

#### Defined in

[bh-carousel.ts:144](https://github.com/ctorgalson/bh-carousel/blob/84d61bbd9f21460538f5c7557fe08b05b800881b/src/bh-carousel.ts#L144)

## Methods

### disable()

> **disable**(): `void`

Disables carousel interactivity.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:175](https://github.com/ctorgalson/bh-carousel/blob/84d61bbd9f21460538f5c7557fe08b05b800881b/src/bh-carousel.ts#L175)

---

### enable()

> **enable**(): `void`

Enables carousel interactivity.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:193](https://github.com/ctorgalson/bh-carousel/blob/84d61bbd9f21460538f5c7557fe08b05b800881b/src/bh-carousel.ts#L193)

---

### getFirstIndex()

> `protected` **getFirstIndex**(): `number`

Retrieves first slide index; prefers aria-hidden, falls back to settings.

#### Returns

`number`

#### Defined in

[bh-carousel.ts:223](https://github.com/ctorgalson/bh-carousel/blob/84d61bbd9f21460538f5c7557fe08b05b800881b/src/bh-carousel.ts#L223)

---

### goto()

> **goto**(`destination`): `void`

Navigates to another slide.

#### Parameters

##### destination

[`BhCarouselDestination`](../type-aliases/BhCarouselDestination.md)

'next', 'previous', or the numberic index of the slide to go to.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:239](https://github.com/ctorgalson/bh-carousel/blob/84d61bbd9f21460538f5c7557fe08b05b800881b/src/bh-carousel.ts#L239)

---

### handleKeydown()

> `protected` **handleKeydown**(`event`): `void`

Handles keydown events for Carousel.

#### Parameters

##### event

[`KeyboardEvent`](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)

The event passed in by the listener.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:276](https://github.com/ctorgalson/bh-carousel/blob/84d61bbd9f21460538f5c7557fe08b05b800881b/src/bh-carousel.ts#L276)

---

### handleNextClick()

> `protected` **handleNextClick**(`event`): `void`

Handles click events for Next button.

#### Parameters

##### event

[`Event`](https://developer.mozilla.org/docs/Web/API/Event)

The event passed in by the listener.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:310](https://github.com/ctorgalson/bh-carousel/blob/84d61bbd9f21460538f5c7557fe08b05b800881b/src/bh-carousel.ts#L310)

---

### handlePlayPauseClick()

> `protected` **handlePlayPauseClick**(`event`): `void`

Handles click events for Play/Pause button.

#### Parameters

##### event

[`Event`](https://developer.mozilla.org/docs/Web/API/Event)

The event passed in by the listener.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:325](https://github.com/ctorgalson/bh-carousel/blob/84d61bbd9f21460538f5c7557fe08b05b800881b/src/bh-carousel.ts#L325)

---

### handlePreviousClick()

> `protected` **handlePreviousClick**(`event`): `void`

Handles click events for Previous button.

#### Parameters

##### event

[`Event`](https://developer.mozilla.org/docs/Web/API/Event)

The event passed in by the listener.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:344](https://github.com/ctorgalson/bh-carousel/blob/84d61bbd9f21460538f5c7557fe08b05b800881b/src/bh-carousel.ts#L344)

---

### pause()

> **pause**(): `void`

Pauses carousel.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:357](https://github.com/ctorgalson/bh-carousel/blob/84d61bbd9f21460538f5c7557fe08b05b800881b/src/bh-carousel.ts#L357)

---

### play()

> **play**(): `void`

Plays carousel.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:370](https://github.com/ctorgalson/bh-carousel/blob/84d61bbd9f21460538f5c7557fe08b05b800881b/src/bh-carousel.ts#L370)
