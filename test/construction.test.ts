import { afterEach, beforeEach, describe, expect, it } from "vitest";
import BhCarousel from "../src/bh-carousel";
import { buildCarouselDom, stubMatchMedia } from "./fixture";

beforeEach(() => stubMatchMedia(false));
afterEach(() => { document.body.innerHTML = ""; });

describe("construction throws", () => {
  it("when there are no slides", () => {
    const el = buildCarouselDom({ slideCount: 0 });
    expect(() => new BhCarousel(el)).toThrow(/at least one slide/i);
  });

  it("when startingIndex is out of bounds", () => {
    const el = buildCarouselDom();
    expect(() => new BhCarousel(el, { startingIndex: 99 })).toThrow(/out of bounds/i);
  });

  // TODO: create tests for missing previous/next buttons.
});
