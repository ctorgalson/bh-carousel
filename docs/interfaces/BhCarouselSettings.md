[**bh-carousel**](../README.md)

---

[bh-carousel](../README.md) / BhCarouselSettings

# Interface: BhCarouselSettings

An interface defining acceptable settings parameters for BhCarousel objects.

## Properties

### ariaLabelPause

> **ariaLabelPause**: `string`

Value for the Play/Pause button's aria-label attribute when playing (e.g.
"Pause carousel").

#### Defined in

[bh-carousel.ts:59](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L59)

---

### ariaLabelPlay

> **ariaLabelPlay**: `string`

Value for the Play/Pause button's aria-label attribute when paused (e.g.
"Play carousel").

#### Defined in

[bh-carousel.ts:60](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L60)

---

### autoEnable

> **autoEnable**: `boolean`

Whether or not to automatically enable carousel interactivity. Sometimes
useful when it's desirable to make the interactivity responsive.

#### Defined in

[bh-carousel.ts:61](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L61)

---

### automatic

> **automatic**: `boolean`

Whether or not to auto-play the carousel on initialization. This setting
is only guaranteed to be honoured if the user's prefers-reduced-motion
allows it.

#### Defined in

[bh-carousel.ts:62](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L62)

---

### controlType

> **controlType**: [`BhCarouselControls`](../type-aliases/BhCarouselControls.md)

Whether the carousel uses only buttons for control or buttons and tabs.
Currently has no effect as tab-style navigation hasn't been implemented.

#### Defined in

[bh-carousel.ts:63](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L63)

---

### debug

> **debug**: `boolean`

#### Defined in

[bh-carousel.ts:64](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L64)

---

### interval

> **interval**: `number`

The interval, in milliseconds, between slides when carousel is playing
automatically.

#### Defined in

[bh-carousel.ts:65](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L65)

---

### itemStateAttribute

> **itemStateAttribute**: `string`

The name of the _boolean_ attribute to set on active/inactive items.
Defaults to aria-hidden; if set to any other value, take care for the
accessibility of each item.

#### Defined in

[bh-carousel.ts:66](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L66)

---

### startingIndex

> **startingIndex**: `number`

Zero-based index of starting slide. E.g. to start on the third slide,
set this value to 2.

#### Defined in

[bh-carousel.ts:67](https://github.com/ctorgalson/bh-carousel/blob/185291d1413c129fc1d94a56b3c177f6840d1192/src/bh-carousel.ts#L67)
