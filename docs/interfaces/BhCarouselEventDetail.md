[**bh-carousel**](../README.md)

---

[bh-carousel](../README.md) / BhCarouselEventDetail

# Interface: BhCarouselEventDetail

An interface defining the structure of BhCarousel event details objects.

## Properties

### action

> **action**: [`BhCarouselAction`](../type-aliases/BhCarouselAction.md)

The type of action triggering the event.

#### Defined in

[bh-carousel.ts:29](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L29)

---

### currentIndex?

> `optional` **currentIndex**: `number`

The index of the current item _after_ updating the object in response to
the event ("previous" and "next" actions only.

#### Defined in

[bh-carousel.ts:30](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L30)

---

### previousIndex?

> `optional` **previousIndex**: `number`

The index of the previous item _after_ updating the object in response to
the event ("previous" and "next" actions only).

#### Defined in

[bh-carousel.ts:31](https://github.com/ctorgalson/bh-carousel/blob/6c33b0d3a704ad95e70c04d12e26515453fdea2b/src/bh-carousel.ts#L31)
