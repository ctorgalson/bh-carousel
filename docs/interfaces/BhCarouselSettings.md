[**@bedlamhotel/bh-carousel**](../README.md)

---

[@bedlamhotel/bh-carousel](../README.md) / BhCarouselSettings

# Interface: BhCarouselSettings

Defined in: [bh-carousel.ts:64](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L64)

An interface defining acceptable settings parameters for BhCarousel objects.

## Properties

### ariaLabelPause

> **ariaLabelPause**: `string`

Defined in: [bh-carousel.ts:65](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L65)

Value for the Play/Pause button's aria-label attribute when playing (e.g.
"Pause carousel").

---

### ariaLabelPlay

> **ariaLabelPlay**: `string`

Defined in: [bh-carousel.ts:66](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L66)

Value for the Play/Pause button's aria-label attribute when paused (e.g.
"Play carousel").

---

### autoEnable

> **autoEnable**: `boolean`

Defined in: [bh-carousel.ts:67](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L67)

Whether or not to automatically enable carousel interactivity. Sometimes
useful when it's desirable to make the interactivity responsive.

---

### automatic

> **automatic**: `boolean`

Defined in: [bh-carousel.ts:68](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L68)

Whether or not to auto-play the carousel on initialization. This setting
is only guaranteed to be honoured if the user's prefers-reduced-motion
allows it.

---

### controlType

> **controlType**: [`BhCarouselControls`](../type-aliases/BhCarouselControls.md)

Defined in: [bh-carousel.ts:69](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L69)

Whether the carousel uses only buttons for control or buttons and tabs.
Currently has no effect as tab-style navigation hasn't been implemented.

---

### interval

> **interval**: `number`

Defined in: [bh-carousel.ts:70](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L70)

The interval, in milliseconds, between slides when carousel is playing
automatically.

---

### itemStateAttribute

> **itemStateAttribute**: `string`

Defined in: [bh-carousel.ts:71](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L71)

The name of the _boolean_ attribute to set on active/inactive items.
Defaults to aria-hidden; if set to any other value, take care for the
accessibility of each item. Must be a valid HTML attribute name beginning
with a lowercase letters followed by one or more lowercase letters, numbers
or hyphens.

---

### startingIndex

> **startingIndex**: `number`

Defined in: [bh-carousel.ts:72](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L72)

Zero-based index of starting slide. E.g. to start on the third slide,
set this value to 2.

---

### wrap

> **wrap**: `boolean`

Defined in: [bh-carousel.ts:73](https://github.com/ctorgalson/bh-carousel/blob/65f07913bf50c91c00c8c15a293340a3bb552cd7/src/bh-carousel.ts#L73)

Whether or not to continue to the first slide when "Next" is clicked on
the last side/the last slide when "Previous" is clicked on the first
slide.
