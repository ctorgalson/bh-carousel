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

</code></pre>

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

[`BhCarouselSettings`](../interfaces/BhCarouselSettings.md)

Settings object to override class defaults.

#### Returns

[`BhCarousel`](BhCarousel.md)

#### Default Value

```ts
BhCarousel;
```

#### Defined in

[bh-carousel.ts:223](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L223)

## Methods

### createEvent()

> `protected` **createEvent**(`detail`): [`Event`](https://developer.mozilla.org/docs/Web/API/Event)

Creates a custom bhCarousel event.

#### Parameters

##### detail

[`BhCarouselEventDetail`](../interfaces/BhCarouselEventDetail.md)

The detail(s) for the event. For example, the 'previous' and 'next'
events return 'previous' or 'next', along with the current and previous
item indexes.

#### Returns

[`Event`](https://developer.mozilla.org/docs/Web/API/Event)

#### Defined in

[bh-carousel.ts:256](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L256)

---

### disable()

> **disable**(): `void`

Disables carousel interactivity.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:269](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L269)

---

### enable()

> **enable**(): `void`

Enables carousel interactivity.

- Previous and Next buttons are always un-hidden, and are enabled whenever
  the carousel is not playing automatically.
- Play/Pause button is:
  - visible and enabled when this.prefersReducedMotion is false, OR when
    the this.settings.reducedMotion setting is set to "permissive",
  - hidden when this.prefersReducedMotion is true AND the setting
    this.settings.reducedMotion is "strict".
    These settings, in the default configuration, completely disable the
    automatic carousel behaviour, but permit the USER to auto-play the
    carousel in circumstances where this.prefersReducedMotion can't be
    reliably determined.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:305](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L305)

---

### getCurrentIndex()

> **getCurrentIndex**(): `number`

Returns the index of the current carousel item.

#### Returns

`number`

#### Defined in

[bh-carousel.ts:347](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L347)

---

### getFirstIndex()

> **getFirstIndex**(): `number`

Returns the index of the first carousel item.

#### Returns

`number`

#### Defined in

[bh-carousel.ts:354](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L354)

---

### getLastIndex()

> **getLastIndex**(): `number`

Returns the index of the last carousel item.

#### Returns

`number`

#### Defined in

[bh-carousel.ts:361](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L361)

---

### getPrefersReducedMotion()

> `protected` **getPrefersReducedMotion**(): `boolean`

Returns a value for user's prefers-reduced-motion-setting

#### Returns

`boolean`

#### Defined in

[bh-carousel.ts:366](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L366)

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

[bh-carousel.ts:377](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L377)

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

[bh-carousel.ts:416](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L416)

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

[bh-carousel.ts:441](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L441)

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

[bh-carousel.ts:456](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L456)

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

[bh-carousel.ts:475](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L475)

---

### next()

> **next**(): `void`

Advances carousel one slide.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:488](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L488)

---

### pause()

> **pause**(): `void`

Pauses carousel.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:495](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L495)

---

### play()

> **play**(): `void`

Plays carousel.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:513](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L513)

---

### previous()

> **previous**(): `void`

Reverses carousel one slide.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:533](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L533)
