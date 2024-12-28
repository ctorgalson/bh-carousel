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
        aria-label="Start / stop automatic slide show"
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

[bh-carousel.ts:185](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L185)

## Methods

### disable()

> **disable**(): `void`

Disables carousel interactivity.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:223](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L223)

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

[bh-carousel.ts:253](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L253)

---

### getFirstIndex()

> `protected` **getFirstIndex**(): `number`

Retrieves first slide index; prefers aria-hidden, falls back to settings.

#### Returns

`number`

#### Defined in

[bh-carousel.ts:283](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L283)

---

### getPrefersReducedMotion()

> `protected` **getPrefersReducedMotion**(): `boolean`

Returns a value for user's prefers-reduced-motion-setting

#### Returns

`boolean`

#### Defined in

[bh-carousel.ts:214](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L214)

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

[bh-carousel.ts:299](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L299)

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

[bh-carousel.ts:336](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L336)

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

[bh-carousel.ts:370](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L370)

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

[bh-carousel.ts:385](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L385)

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

[bh-carousel.ts:404](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L404)

---

### pause()

> **pause**(): `void`

Pauses carousel.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:417](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L417)

---

### play()

> **play**(): `void`

Plays carousel.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:430](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L430)
