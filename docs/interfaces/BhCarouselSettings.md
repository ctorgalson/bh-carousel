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

[bh-carousel.ts:45](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L45)

---

### automatic

> **automatic**: `boolean`

Whether or not to auto-play the carousel on initialization. This setting
is only guaranteed to be honoured if the user's prefers-reduced-motion
allows it.

#### Defined in

[bh-carousel.ts:46](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L46)

---

### controlType

> **controlType**: [`BhCarouselControls`](../type-aliases/BhCarouselControls.md)

Whether the carousel uses only buttons for control or buttons and tabs.
Currently has no effect as tab-style navigation hasn't been implemented.

#### Defined in

[bh-carousel.ts:47](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L47)

---

### interval

> **interval**: `number`

The interval, in milliseconds, between slides when carousel is playing
automatically.

#### Defined in

[bh-carousel.ts:48](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L48)

---

### startingIndex

> **startingIndex**: `number`

Zero-based index of starting slide. E.g. to start on the third slide,
set this value to 2.

#### Defined in

[bh-carousel.ts:49](https://github.com/ctorgalson/bh-carousel/blob/edde642bdd516852dd0c2912b7d6a79cd11084b6/src/bh-carousel.ts#L49)
