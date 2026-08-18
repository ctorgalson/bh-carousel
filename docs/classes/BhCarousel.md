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

The overall containing element of the carousel

##### settings?

[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`BhCarouselSettings`](../interfaces/BhCarouselSettings.md)\>

Optional settings to override class defaults

#### Returns

[`BhCarousel`](BhCarousel.md)

#### Defined in

[bh-carousel.ts:218](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L218)

## Methods

### createEvent()

> `protected` **createEvent**(`detail`): [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<[`BhCarouselEventDetail`](../interfaces/BhCarouselEventDetail.md)\>

Creates a custom bhCarousel event.

The 'previous' and 'next' events include currentIndex and previousIndex
in the detail. The 'play' and 'pause' events include only the action.

#### Parameters

##### detail

[`BhCarouselEventDetail`](../interfaces/BhCarouselEventDetail.md)

#### Returns

[`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<[`BhCarouselEventDetail`](../interfaces/BhCarouselEventDetail.md)\>

#### Defined in

[bh-carousel.ts:279](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L279)

---

### disable()

> **disable**(): `void`

Disables carousel interactivity.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:291](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L291)

---

### enable()

> **enable**(): `void`

Enables carousel interactivity.

Previous and Next buttons are always un-hidden and enabled when the
carousel is not playing automatically. The Play/Pause button is disabled
when prefersReducedMotion is true to respect user accessibility preferences.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:322](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L322)

---

### getCurrentIndex()

> **getCurrentIndex**(): `number`

Returns the index of the current carousel item.

#### Returns

`number`

#### Defined in

[bh-carousel.ts:360](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L360)

---

### getFirstIndex()

> **getFirstIndex**(): `number`

Returns the index of the first carousel item.

#### Returns

`number`

#### Defined in

[bh-carousel.ts:365](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L365)

---

### getLastIndex()

> **getLastIndex**(): `number`

Returns the index of the last carousel item.

#### Returns

`number`

#### Defined in

[bh-carousel.ts:370](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L370)

---

### getPrefersReducedMotion()

> `protected` **getPrefersReducedMotion**(): `boolean`

Returns whether user prefers reduced motion.

#### Returns

`boolean`

#### Defined in

[bh-carousel.ts:375](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L375)

---

### goto()

> **goto**(`destination`): `void`

Navigates to another slide: 'next', 'previous', or a numeric index.

#### Parameters

##### destination

[`BhCarouselDestination`](../type-aliases/BhCarouselDestination.md)

#### Returns

`void`

#### Defined in

[bh-carousel.ts:380](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L380)

---

### handleKeydown()

> `protected` **handleKeydown**(`event`): `void`

Handles keydown events for keyboard navigation.

#### Parameters

##### event

[`KeyboardEvent`](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)

#### Returns

`void`

#### Defined in

[bh-carousel.ts:418](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L418)

---

### handleNextClick()

> `protected` **handleNextClick**(): `void`

Handles click events for Next button.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:437](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L437)

---

### handlePlayPauseClick()

> `protected` **handlePlayPauseClick**(): `void`

Handles click events for Play/Pause button.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:442](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L442)

---

### handlePreviousClick()

> `protected` **handlePreviousClick**(): `void`

Handles click events for Previous button.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:451](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L451)

---

### isPlaying()

> **isPlaying**(): `boolean`

Returns current playing state.

#### Returns

`boolean`

#### Defined in

[bh-carousel.ts:461](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L461)

---

### next()

> **next**(): `void`

Advances carousel one slide.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:456](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L456)

---

### pause()

> **pause**(): `void`

Pauses carousel.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:466](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L466)

---

### play()

> **play**(): `void`

Plays carousel.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:482](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L482)

---

### previous()

> **previous**(): `void`

Reverses carousel one slide.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:500](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L500)

---

### validateSlideIndex()

> `protected` **validateSlideIndex**(`index`): `void`

Validates that an index is within bounds.

#### Parameters

##### index

`number`

#### Returns

`void`

#### Defined in

[bh-carousel.ts:505](https://github.com/ctorgalson/bh-carousel/blob/2af504f98a70be3a82b64a28432fe2d57f6f53ca/src/bh-carousel.ts#L505)
