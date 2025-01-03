[**bh-carousel**](../README.md)

---

[bh-carousel](../README.md) / BhCarouselSettings

# Interface: BhCarouselSettings

A type used to set the acceptable settings parameters for BhCarousel objects.

## Properties

### autoEnable

> **autoEnable**: `boolean`

Whether or not to automatically enable carousel interactivity. Sometimes
useful when it's desireable to make the interactivity responsive.

#### Defined in

[bh-carousel.ts:40](https://github.com/ctorgalson/bh-carousel/blob/2f7dabc4fd9fa5cf46c771341f2b4d493520ede4/src/bh-carousel.ts#L40)

---

### automatic

> **automatic**: `boolean`

Whether or not to auto-play the carousel on initialization. This setting
is only guaranteed to be honoured if the user's prefers-reduced-motion
allows it.

#### Defined in

[bh-carousel.ts:41](https://github.com/ctorgalson/bh-carousel/blob/2f7dabc4fd9fa5cf46c771341f2b4d493520ede4/src/bh-carousel.ts#L41)

---

### controlType

> **controlType**: [`BhCarouselControls`](../type-aliases/BhCarouselControls.md)

Whether the carousel uses only buttons for control or buttons and tabs.
Currently has no effect as tab-style navigation hasn't been implemented.

#### Defined in

[bh-carousel.ts:42](https://github.com/ctorgalson/bh-carousel/blob/2f7dabc4fd9fa5cf46c771341f2b4d493520ede4/src/bh-carousel.ts#L42)

---

### interval

> **interval**: `number`

The interval, in milliseconds, between slides when carousel is playing
automatically.

#### Defined in

[bh-carousel.ts:43](https://github.com/ctorgalson/bh-carousel/blob/2f7dabc4fd9fa5cf46c771341f2b4d493520ede4/src/bh-carousel.ts#L43)

---

### startingIndex

> **startingIndex**: `number`

Zero-based index of starting slide. E.g. to start on the third slide,
set this value to 2.

#### Defined in

[bh-carousel.ts:44](https://github.com/ctorgalson/bh-carousel/blob/2f7dabc4fd9fa5cf46c771341f2b4d493520ede4/src/bh-carousel.ts#L44)
