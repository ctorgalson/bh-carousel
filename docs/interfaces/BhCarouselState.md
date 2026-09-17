[**@bedlamhotel/bh-carousel**](../README.md)

---

[@bedlamhotel/bh-carousel](../README.md) / BhCarouselState

# Interface: BhCarouselState

Defined in: [bh-carousel.ts:104](https://github.com/ctorgalson/bh-carousel/blob/72bdba983637c63eb1537843e68f8a639fab74d6/src/bh-carousel.ts#L104)

An interface for defining the current state of a BhCarousel instance.

## Properties

### currentIndex

> **currentIndex**: `number`

Defined in: [bh-carousel.ts:105](https://github.com/ctorgalson/bh-carousel/blob/72bdba983637c63eb1537843e68f8a639fab74d6/src/bh-carousel.ts#L105)

The numeric (zero-based) index of the current slide in the carousel.

---

### enabled

> **enabled**: `boolean`

Defined in: [bh-carousel.ts:106](https://github.com/ctorgalson/bh-carousel/blob/72bdba983637c63eb1537843e68f8a639fab74d6/src/bh-carousel.ts#L106)

Whether or not carousel interactivity is enabled at all.

---

### firstIndex

> **firstIndex**: `number`

Defined in: [bh-carousel.ts:107](https://github.com/ctorgalson/bh-carousel/blob/72bdba983637c63eb1537843e68f8a639fab74d6/src/bh-carousel.ts#L107)

The numeric (zero-based) index of the first slide in the carousel. Always
zero.

---

### lastIndex

> **lastIndex**: `number`

Defined in: [bh-carousel.ts:108](https://github.com/ctorgalson/bh-carousel/blob/72bdba983637c63eb1537843e68f8a639fab74d6/src/bh-carousel.ts#L108)

The numeric (zero-based) index of the last slide in the carousel.

---

### nextIndex

> **nextIndex**: `number` \| `null`

Defined in: [bh-carousel.ts:109](https://github.com/ctorgalson/bh-carousel/blob/72bdba983637c63eb1537843e68f8a639fab74d6/src/bh-carousel.ts#L109)

The numeric (zero-based) index of the next slide in the carousel, or
null when the carousel is at the last slide and `wrap` is false.

---

### playing

> **playing**: `boolean`

Defined in: [bh-carousel.ts:110](https://github.com/ctorgalson/bh-carousel/blob/72bdba983637c63eb1537843e68f8a639fab74d6/src/bh-carousel.ts#L110)

Whether or not the carousel is currently auto-playing.

---

### prefersReducedMotion

> **prefersReducedMotion**: `boolean`

Defined in: [bh-carousel.ts:111](https://github.com/ctorgalson/bh-carousel/blob/72bdba983637c63eb1537843e68f8a639fab74d6/src/bh-carousel.ts#L111)

The current user preference for prefers-reduced-motion (true means that
a css media query has returned 'reduce', and false means that it has
returned 'no-preference').

---

### previousIndex

> **previousIndex**: `number` \| `null`

Defined in: [bh-carousel.ts:112](https://github.com/ctorgalson/bh-carousel/blob/72bdba983637c63eb1537843e68f8a639fab74d6/src/bh-carousel.ts#L112)

The numeric (zero-based) index of the previous slide in the carousel,
or null when the carousel is at the first slide and `wrap` is false.
