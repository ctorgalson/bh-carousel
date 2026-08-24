[**bh-carousel**](../README.md)

---

[bh-carousel](../README.md) / BhCarouselState

# Interface: BhCarouselState

An interface for defining the current state of a BhCarousel instance.

## Properties

### action

> **action**: [`BhCarouselAction`](../type-aliases/BhCarouselAction.md)

The name of the last method to modify the state var. Only exposed for
debugging purposes.

#### Defined in

[bh-carousel.ts:97](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L97)

---

### currentIndex

> **currentIndex**: `number`

The numeric (zero-based) index of the current slide in the carousel.

#### Defined in

[bh-carousel.ts:98](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L98)

---

### enabled

> **enabled**: `boolean`

Whether or not carousel interactivity is enabled at all.

#### Defined in

[bh-carousel.ts:99](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L99)

---

### firstIndex

> **firstIndex**: `number`

The numeric (zero-based) index of the first slide in the carousel. Always
zero.

#### Defined in

[bh-carousel.ts:100](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L100)

---

### lastIndex

> **lastIndex**: `number`

The numeric (zero-based) index of the last slide in the carousel.

#### Defined in

[bh-carousel.ts:101](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L101)

---

### nextIndex

> **nextIndex**: `number`

The numeric (zero-based) index of the next slide in the carousel.

#### Defined in

[bh-carousel.ts:102](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L102)

---

### playing

> **playing**: `boolean`

Whether or not the carousel is currently auto-playing.

#### Defined in

[bh-carousel.ts:103](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L103)

---

### prefersReducedMotion

> **prefersReducedMotion**: `boolean`

The current user preference for prefers-reduced-motion (true means that
a css media query has returned 'reduce', and false means that it has
returned 'no-preference').

#### Defined in

[bh-carousel.ts:104](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L104)

---

### previousIndex

> **previousIndex**: `number`

The numeric (zero-based) index of the previous slide in the carousel.

#### Defined in

[bh-carousel.ts:105](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L105)
