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

[bh-carousel.ts:80](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L80)

---

### ariaLabelPlay

> **ariaLabelPlay**: `string`

Value for the Play/Pause button's aria-label attribute when paused (e.g.
"Play carousel").

#### Defined in

[bh-carousel.ts:81](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L81)

---

### autoEnable

> **autoEnable**: `boolean`

Whether or not to automatically enable carousel interactivity. Sometimes
useful when it's desirable to make the interactivity responsive.

#### Defined in

[bh-carousel.ts:82](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L82)

---

### automatic

> **automatic**: `boolean`

Whether or not to auto-play the carousel on initialization. This setting
is only guaranteed to be honoured if the user's prefers-reduced-motion
allows it.

#### Defined in

[bh-carousel.ts:83](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L83)

---

### controlType

> **controlType**: [`BhCarouselControls`](../type-aliases/BhCarouselControls.md)

Whether the carousel uses only buttons for control or buttons and tabs.
Currently has no effect as tab-style navigation hasn't been implemented.

#### Defined in

[bh-carousel.ts:84](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L84)

---

### debug

> **debug**: `boolean`

#### Defined in

[bh-carousel.ts:85](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L85)

---

### interval

> **interval**: `number`

The interval, in milliseconds, between slides when carousel is playing
automatically.

#### Defined in

[bh-carousel.ts:86](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L86)

---

### itemStateAttribute

> **itemStateAttribute**: `string`

The name of the _boolean_ attribute to set on active/inactive items.
Defaults to aria-hidden; if set to any other value, take care for the
accessibility of each item.

#### Defined in

[bh-carousel.ts:87](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L87)

---

### startingIndex

> **startingIndex**: `number`

Zero-based index of starting slide. E.g. to start on the third slide,
set this value to 2.

#### Defined in

[bh-carousel.ts:88](https://github.com/ctorgalson/bh-carousel/blob/f3dde9212771daad40bc31ee9ddb5248863b8dec/src/bh-carousel.ts#L88)
