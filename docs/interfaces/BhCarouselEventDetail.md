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

[bh-carousel.ts:29](https://github.com/ctorgalson/bh-carousel/blob/d54973db2f690cd2054cf22e528f23dec76fc97d/src/bh-carousel.ts#L29)

---

### currentIndex?

> `optional` **currentIndex**: `number`

The index of the current item _after_ updating the object in response to
the event ("previous" and "next" actions only.

#### Defined in

[bh-carousel.ts:30](https://github.com/ctorgalson/bh-carousel/blob/d54973db2f690cd2054cf22e528f23dec76fc97d/src/bh-carousel.ts#L30)

---

### previousIndex?

> `optional` **previousIndex**: `number`

The index of the previous item _after_ updating the object in response to
the event ("previous" and "next" actions only).

#### Defined in

[bh-carousel.ts:31](https://github.com/ctorgalson/bh-carousel/blob/d54973db2f690cd2054cf22e528f23dec76fc97d/src/bh-carousel.ts#L31)
