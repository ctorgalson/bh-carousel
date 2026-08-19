[**bh-carousel**](../README.md)

---

[bh-carousel](../README.md) / BhCarouselState

# Interface: BhCarouselState

An interface for defining the current state of a BhCarousel instance.

## Properties

### currentIndex

> **currentIndex**: `number`

The numeric (zero-based) index of the current slide in the carousel.

#### Defined in

[bh-carousel.ts:107](https://github.com/ctorgalson/bh-carousel/blob/66a23fa1322f5451769afb44a200d39dc2592d05/src/bh-carousel.ts#L107)

---

### enabled

> **enabled**: `boolean`

Whether or not carousel interactivity is enabled at all.

#### Defined in

[bh-carousel.ts:108](https://github.com/ctorgalson/bh-carousel/blob/66a23fa1322f5451769afb44a200d39dc2592d05/src/bh-carousel.ts#L108)

---

### firstIndex

> **firstIndex**: `number`

The numeric (zero-based) index of the first slide in the carousel. Always
zero.

#### Defined in

[bh-carousel.ts:109](https://github.com/ctorgalson/bh-carousel/blob/66a23fa1322f5451769afb44a200d39dc2592d05/src/bh-carousel.ts#L109)

---

### lastIndex

> **lastIndex**: `number`

The numeric (zero-based) index of the last slide in the carousel.

#### Defined in

[bh-carousel.ts:110](https://github.com/ctorgalson/bh-carousel/blob/66a23fa1322f5451769afb44a200d39dc2592d05/src/bh-carousel.ts#L110)

---

### modifiedBy

> **modifiedBy**: `string`

The name of the last method to modify the state var. Only exposed for
debugging purposes.

#### Defined in

[bh-carousel.ts:111](https://github.com/ctorgalson/bh-carousel/blob/66a23fa1322f5451769afb44a200d39dc2592d05/src/bh-carousel.ts#L111)

---

### playing

> **playing**: `boolean`

Whether or not the carousel is currently auto-playing.

#### Defined in

[bh-carousel.ts:106](https://github.com/ctorgalson/bh-carousel/blob/66a23fa1322f5451769afb44a200d39dc2592d05/src/bh-carousel.ts#L106)

---

### prefersReducedMotion

> **prefersReducedMotion**: `boolean`

The current user preference for prefers-reduced-motion (true means that
a css media query has returned 'reduce', and false means that it has
returned 'no-preference').

#### Defined in

[bh-carousel.ts:112](https://github.com/ctorgalson/bh-carousel/blob/66a23fa1322f5451769afb44a200d39dc2592d05/src/bh-carousel.ts#L112)
