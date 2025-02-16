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

[bh-carousel.ts:201](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L201)

## Methods

### disable()

> **disable**(): `void`

Disables carousel interactivity.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:239](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L239)

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

[bh-carousel.ts:275](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L275)

---

### getCurrentIndex()

> **getCurrentIndex**(): `number`

Returns the index of the current carousel item.

#### Returns

`number`

#### Defined in

[bh-carousel.ts:314](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L314)

---

### getFirstIndex()

> **getFirstIndex**(): `number`

Returns the index of the first carousel item.

#### Returns

`number`

#### Defined in

[bh-carousel.ts:321](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L321)

---

### getLastIndex()

> **getLastIndex**(): `number`

Returns the index of the last carousel item.

#### Returns

`number`

#### Defined in

[bh-carousel.ts:328](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L328)

---

### getPrefersReducedMotion()

> `protected` **getPrefersReducedMotion**(): `boolean`

Returns a value for user's prefers-reduced-motion-setting

#### Returns

`boolean`

#### Defined in

[bh-carousel.ts:230](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L230)

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

[bh-carousel.ts:337](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L337)

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

[bh-carousel.ts:369](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L369)

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

[bh-carousel.ts:394](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L394)

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

[bh-carousel.ts:409](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L409)

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

[bh-carousel.ts:428](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L428)

---

### next()

> **next**(): `void`

Advances carousel one slide.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:441](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L441)

---

### pause()

> **pause**(): `void`

Pauses carousel.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:448](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L448)

---

### play()

> **play**(): `void`

Plays carousel.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:465](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L465)

---

### previous()

> **previous**(): `void`

Reverses carousel one slide.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:484](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L484)
