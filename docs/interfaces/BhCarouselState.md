[**bh-carousel**](../README.md)

---

[bh-carousel](../README.md) / BhCarouselState

# Interface: BhCarouselState

Defined in: [bh-carousel.ts:101](https://github.com/ctorgalson/bh-carousel/blob/afbeff3131082a197587843d4bd3f9ecf500e688/src/bh-carousel.ts#L101)

An interface for defining the current state of a BhCarousel instance.

## Properties

### currentIndex

> **currentIndex**: `number`

Defined in: [bh-carousel.ts:102](https://github.com/ctorgalson/bh-carousel/blob/afbeff3131082a197587843d4bd3f9ecf500e688/src/bh-carousel.ts#L102)

The numeric (zero-based) index of the current slide in the carousel.

---

### enabled

> **enabled**: `boolean`

Defined in: [bh-carousel.ts:103](https://github.com/ctorgalson/bh-carousel/blob/afbeff3131082a197587843d4bd3f9ecf500e688/src/bh-carousel.ts#L103)

Whether or not carousel interactivity is enabled at all.

---

### firstIndex

> **firstIndex**: `number`

Defined in: [bh-carousel.ts:104](https://github.com/ctorgalson/bh-carousel/blob/afbeff3131082a197587843d4bd3f9ecf500e688/src/bh-carousel.ts#L104)

The numeric (zero-based) index of the first slide in the carousel. Always
zero.

---

### lastIndex

> **lastIndex**: `number`

Defined in: [bh-carousel.ts:105](https://github.com/ctorgalson/bh-carousel/blob/afbeff3131082a197587843d4bd3f9ecf500e688/src/bh-carousel.ts#L105)

The numeric (zero-based) index of the last slide in the carousel.

---

### nextIndex

> **nextIndex**: `number` \| `null`

Defined in: [bh-carousel.ts:106](https://github.com/ctorgalson/bh-carousel/blob/afbeff3131082a197587843d4bd3f9ecf500e688/src/bh-carousel.ts#L106)

The numeric (zero-based) index of the next slide in the carousel, or
null when the carousel is at the last slide and `wrap` is false.

---

### playing

> **playing**: `boolean`

Defined in: [bh-carousel.ts:107](https://github.com/ctorgalson/bh-carousel/blob/afbeff3131082a197587843d4bd3f9ecf500e688/src/bh-carousel.ts#L107)

Whether or not the carousel is currently auto-playing.

---

### prefersReducedMotion

> **prefersReducedMotion**: `boolean`

Defined in: [bh-carousel.ts:108](https://github.com/ctorgalson/bh-carousel/blob/afbeff3131082a197587843d4bd3f9ecf500e688/src/bh-carousel.ts#L108)

The current user preference for prefers-reduced-motion (true means that
a css media query has returned 'reduce', and false means that it has
returned 'no-preference').

---

### previousIndex

> **previousIndex**: `number` \| `null`

Defined in: [bh-carousel.ts:109](https://github.com/ctorgalson/bh-carousel/blob/afbeff3131082a197587843d4bd3f9ecf500e688/src/bh-carousel.ts#L109)

The numeric (zero-based) index of the previous slide in the carousel,
or null when the carousel is at the first slide and `wrap` is false.
