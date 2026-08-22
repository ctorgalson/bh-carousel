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

[bh-carousel.ts:119](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L119)

---

### enabled

> **enabled**: `boolean`

Whether or not carousel interactivity is enabled at all.

#### Defined in

[bh-carousel.ts:120](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L120)

---

### firstIndex

> **firstIndex**: `number`

The numeric (zero-based) index of the first slide in the carousel. Always
zero.

#### Defined in

[bh-carousel.ts:121](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L121)

---

### lastIndex

> **lastIndex**: `number`

The numeric (zero-based) index of the last slide in the carousel.

#### Defined in

[bh-carousel.ts:122](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L122)

---

### modifiedBy

> **modifiedBy**: [`BhCarouselAction`](../type-aliases/BhCarouselAction.md)

The name of the last method to modify the state var. Only exposed for
debugging purposes.

#### Defined in

[bh-carousel.ts:125](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L125)

---

### nextIndex

> **nextIndex**: `number`

The numeric (zero-based) index of the next slide in the carousel.

#### Defined in

[bh-carousel.ts:123](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L123)

---

### playing

> **playing**: `boolean`

Whether or not the carousel is currently auto-playing.

#### Defined in

[bh-carousel.ts:118](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L118)

---

### prefersReducedMotion

> **prefersReducedMotion**: `boolean`

The current user preference for prefers-reduced-motion (true means that
a css media query has returned 'reduce', and false means that it has
returned 'no-preference').

#### Defined in

[bh-carousel.ts:126](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L126)

---

### previousIndex

> **previousIndex**: `number`

The numeric (zero-based) index of the previous slide in the carousel.

#### Defined in

[bh-carousel.ts:124](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L124)
