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

[bh-carousel.ts:72](https://github.com/ctorgalson/bh-carousel/blob/03686fc8bff34cae1656cbde325b4fb27fe223a0/src/bh-carousel.ts#L72)

---

### ariaLabelPlay

> **ariaLabelPlay**: `string`

Value for the Play/Pause button's aria-label attribute when paused (e.g.
"Play carousel").

#### Defined in

[bh-carousel.ts:73](https://github.com/ctorgalson/bh-carousel/blob/03686fc8bff34cae1656cbde325b4fb27fe223a0/src/bh-carousel.ts#L73)

---

### autoEnable

> **autoEnable**: `boolean`

Whether or not to automatically enable carousel interactivity. Sometimes
useful when it's desirable to make the interactivity responsive.

#### Defined in

[bh-carousel.ts:74](https://github.com/ctorgalson/bh-carousel/blob/03686fc8bff34cae1656cbde325b4fb27fe223a0/src/bh-carousel.ts#L74)

---

### automatic

> **automatic**: `boolean`

Whether or not to auto-play the carousel on initialization. This setting
is only guaranteed to be honoured if the user's prefers-reduced-motion
allows it.

#### Defined in

[bh-carousel.ts:75](https://github.com/ctorgalson/bh-carousel/blob/03686fc8bff34cae1656cbde325b4fb27fe223a0/src/bh-carousel.ts#L75)

---

### controlType

> **controlType**: [`BhCarouselControls`](../type-aliases/BhCarouselControls.md)

Whether the carousel uses only buttons for control or buttons and tabs.
Currently has no effect as tab-style navigation hasn't been implemented.

#### Defined in

[bh-carousel.ts:76](https://github.com/ctorgalson/bh-carousel/blob/03686fc8bff34cae1656cbde325b4fb27fe223a0/src/bh-carousel.ts#L76)

---

### interval

> **interval**: `number`

The interval, in milliseconds, between slides when carousel is playing
automatically.

#### Defined in

[bh-carousel.ts:77](https://github.com/ctorgalson/bh-carousel/blob/03686fc8bff34cae1656cbde325b4fb27fe223a0/src/bh-carousel.ts#L77)

---

### itemStateAttribute

> **itemStateAttribute**: `string`

The name of the _boolean_ attribute to set on active/inactive items.
Defaults to aria-hidden; if set to any other value, take care for the
accessibility of each item.

#### Defined in

[bh-carousel.ts:78](https://github.com/ctorgalson/bh-carousel/blob/03686fc8bff34cae1656cbde325b4fb27fe223a0/src/bh-carousel.ts#L78)

---

### startingIndex

> **startingIndex**: `number`

Zero-based index of starting slide. E.g. to start on the third slide,
set this value to 2.

#### Defined in

[bh-carousel.ts:79](https://github.com/ctorgalson/bh-carousel/blob/03686fc8bff34cae1656cbde325b4fb27fe223a0/src/bh-carousel.ts#L79)
