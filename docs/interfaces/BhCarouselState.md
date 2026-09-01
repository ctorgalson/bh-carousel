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

[bh-carousel.ts:101](https://github.com/ctorgalson/bh-carousel/blob/c01896143fad03de42c3826266698584f269cbbe/src/bh-carousel.ts#L101)

---

### currentIndex

> **currentIndex**: `number`

The numeric (zero-based) index of the current slide in the carousel.

#### Defined in

[bh-carousel.ts:102](https://github.com/ctorgalson/bh-carousel/blob/c01896143fad03de42c3826266698584f269cbbe/src/bh-carousel.ts#L102)

---

### enabled

> **enabled**: `boolean`

Whether or not carousel interactivity is enabled at all.

#### Defined in

[bh-carousel.ts:103](https://github.com/ctorgalson/bh-carousel/blob/c01896143fad03de42c3826266698584f269cbbe/src/bh-carousel.ts#L103)

---

### firstIndex

> **firstIndex**: `number`

The numeric (zero-based) index of the first slide in the carousel. Always
zero.

#### Defined in

[bh-carousel.ts:104](https://github.com/ctorgalson/bh-carousel/blob/c01896143fad03de42c3826266698584f269cbbe/src/bh-carousel.ts#L104)

---

### lastIndex

> **lastIndex**: `number`

The numeric (zero-based) index of the last slide in the carousel.

#### Defined in

[bh-carousel.ts:105](https://github.com/ctorgalson/bh-carousel/blob/c01896143fad03de42c3826266698584f269cbbe/src/bh-carousel.ts#L105)

---

### nextIndex

> **nextIndex**: `number`

The numeric (zero-based) index of the next slide in the carousel.

#### Defined in

[bh-carousel.ts:106](https://github.com/ctorgalson/bh-carousel/blob/c01896143fad03de42c3826266698584f269cbbe/src/bh-carousel.ts#L106)

---

### playing

> **playing**: `boolean`

Whether or not the carousel is currently auto-playing.

#### Defined in

[bh-carousel.ts:107](https://github.com/ctorgalson/bh-carousel/blob/c01896143fad03de42c3826266698584f269cbbe/src/bh-carousel.ts#L107)

---

### prefersReducedMotion

> **prefersReducedMotion**: `boolean`

The current user preference for prefers-reduced-motion (true means that
a css media query has returned 'reduce', and false means that it has
returned 'no-preference').

#### Defined in

[bh-carousel.ts:108](https://github.com/ctorgalson/bh-carousel/blob/c01896143fad03de42c3826266698584f269cbbe/src/bh-carousel.ts#L108)

---

### previousIndex

> **previousIndex**: `number`

The numeric (zero-based) index of the previous slide in the carousel.

#### Defined in

[bh-carousel.ts:109](https://github.com/ctorgalson/bh-carousel/blob/c01896143fad03de42c3826266698584f269cbbe/src/bh-carousel.ts#L109)
