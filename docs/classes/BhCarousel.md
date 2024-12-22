[**bh-carousel**](../README.md)

---

[bh-carousel](../globals.md) / BhCarousel

# Class: BhCarousel

Creates responsive instance of WAI-ARIA's ("with buttons") Carousel pattern.

Uses data attributes for functionality, making it independent of/usable with
any given design system. Only aria-\* attributes are required, but they are
REQUIRED.

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

`BhCarouselSettings`

Settings object to override class defaults.

#### Returns

[`BhCarousel`](BhCarousel.md)

#### Default Value

```ts
BhCarousel;
```

#### Defined in

[bh-carousel.ts:55](https://github.com/ctorgalson/bh-carousel/blob/6d6f3d98eb2a00b2aa6d8c590e6da0e1b2b46d31/src/bh-carousel.ts#L55)

## Methods

### disable()

> **disable**(): `void`

Disables carousel interactivity.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:86](https://github.com/ctorgalson/bh-carousel/blob/6d6f3d98eb2a00b2aa6d8c590e6da0e1b2b46d31/src/bh-carousel.ts#L86)

---

### enable()

> **enable**(): `void`

Enables carousel interactivity.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:104](https://github.com/ctorgalson/bh-carousel/blob/6d6f3d98eb2a00b2aa6d8c590e6da0e1b2b46d31/src/bh-carousel.ts#L104)

---

### getFirstIndex()

> `protected` **getFirstIndex**(): `number`

Retrieves first slide index; prefers aria-hidden, falls back to settings.

#### Returns

`number`

#### Defined in

[bh-carousel.ts:134](https://github.com/ctorgalson/bh-carousel/blob/6d6f3d98eb2a00b2aa6d8c590e6da0e1b2b46d31/src/bh-carousel.ts#L134)

---

### goto()

> **goto**(`destination`): `void`

Navigates to another slide.

#### Parameters

##### destination

`BhCarouselDestination`

'next', 'previous', or the numberic index of the slide to go to.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:150](https://github.com/ctorgalson/bh-carousel/blob/6d6f3d98eb2a00b2aa6d8c590e6da0e1b2b46d31/src/bh-carousel.ts#L150)

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

[bh-carousel.ts:187](https://github.com/ctorgalson/bh-carousel/blob/6d6f3d98eb2a00b2aa6d8c590e6da0e1b2b46d31/src/bh-carousel.ts#L187)

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

[bh-carousel.ts:221](https://github.com/ctorgalson/bh-carousel/blob/6d6f3d98eb2a00b2aa6d8c590e6da0e1b2b46d31/src/bh-carousel.ts#L221)

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

[bh-carousel.ts:236](https://github.com/ctorgalson/bh-carousel/blob/6d6f3d98eb2a00b2aa6d8c590e6da0e1b2b46d31/src/bh-carousel.ts#L236)

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

[bh-carousel.ts:255](https://github.com/ctorgalson/bh-carousel/blob/6d6f3d98eb2a00b2aa6d8c590e6da0e1b2b46d31/src/bh-carousel.ts#L255)

---

### pause()

> **pause**(): `void`

Pauses carousel.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:268](https://github.com/ctorgalson/bh-carousel/blob/6d6f3d98eb2a00b2aa6d8c590e6da0e1b2b46d31/src/bh-carousel.ts#L268)

---

### play()

> **play**(): `void`

Plays carousel.

#### Returns

`void`

#### Defined in

[bh-carousel.ts:281](https://github.com/ctorgalson/bh-carousel/blob/6d6f3d98eb2a00b2aa6d8c590e6da0e1b2b46d31/src/bh-carousel.ts#L281)
