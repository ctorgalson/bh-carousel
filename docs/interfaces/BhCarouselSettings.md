[**bh-carousel**](../README.md)

---

[bh-carousel](../README.md) / BhCarouselSettings

# Interface: BhCarouselSettings

A type used to set the acceptable settings parameters for BhCarousel objects.

## Properties

### ariaLabelPause

> **ariaLabelPause**: `string`

Value for the Play/Pause button's aria-label attribute when playing (e.g.
"Pause carousel").

#### Defined in

[bh-carousel.ts:50](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L50)

---

### ariaLabelPlay

> **ariaLabelPlay**: `string`

Value for the Play/Pause button's aria-label attribute when paused (e.g.
"Play carousel").

#### Defined in

[bh-carousel.ts:51](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L51)

---

### autoEnable

> **autoEnable**: `boolean`

Whether or not to automatically enable carousel interactivity. Sometimes
useful when it's desireable to make the interactivity responsive.

#### Defined in

[bh-carousel.ts:52](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L52)

---

### automatic

> **automatic**: `boolean`

Whether or not to auto-play the carousel on initialization. This setting
is only guaranteed to be honoured if the user's prefers-reduced-motion
allows it.

#### Defined in

[bh-carousel.ts:53](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L53)

---

### controlType

> **controlType**: [`BhCarouselControls`](../type-aliases/BhCarouselControls.md)

Whether the carousel uses only buttons for control or buttons and tabs.
aulay\* Currently has no effect as tab-style navigation hasn't been implemented.

#### Defined in

[bh-carousel.ts:54](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L54)

---

### interval

> **interval**: `number`

The interval, in milliseconds, between slides when carousel is playing
automatically.

#### Defined in

[bh-carousel.ts:55](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L55)

---

### itemStateAttribute

> **itemStateAttribute**: `string`

#### Defined in

[bh-carousel.ts:56](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L56)

---

### startingIndex

> **startingIndex**: `number`

Zero-based index of starting slide. E.g. to start on the third slide,
set this value to 2.

#### Defined in

[bh-carousel.ts:57](https://github.com/ctorgalson/bh-carousel/blob/a3e44d175f59b30d5917c828645f133cce5e9851/src/bh-carousel.ts#L57)
