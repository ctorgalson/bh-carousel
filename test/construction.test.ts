import { afterEach, beforeEach, describe, expect, it } from "vitest";
import BhCarousel from "../src/bh-carousel";
import { buildCarouselDom, stubMatchMedia } from "./fixture";

beforeEach(() => stubMatchMedia(false));
afterEach(() => {
  document.body.innerHTML = "";
});

const q = <T extends Element = HTMLElement>(el: ParentNode, sel: string) =>
  el.querySelector<T>(sel)!;
const qa = (el: ParentNode, sel: string) => el.querySelectorAll(sel);

describe("construction throws and results", () => {
  it("when there are no slides", () => {
    const el = buildCarouselDom({ slideCount: 0 });
    expect(() => new BhCarousel(el)).toThrow(/at least one slide/i);
  });

  it("when startingIndex is out of bounds before mutating DOM", () => {
    const el = buildCarouselDom();
    expect(() => new BhCarousel(el, { startingIndex: 99 })).toThrow(
      /out of bounds/i,
    );
    expect(qa(el, "[aria-hidden]").length).toEqual(0);
  });

  it("when settings.itemStateAttribute is an invalid attribute name", () => {
    const el = buildCarouselDom();
    expect(
      () => new BhCarousel(el, { itemStateAttribute: "data-cat flap" }),
    ).toThrow(/invalid attribute/i);
    expect
  });

  it("when Next button is not present", () => {
    const el = buildCarouselDom();
    q<HTMLButtonElement>(el, "[data-bhc-next]").remove();
    expect(() => new BhCarousel(el)).toThrow(/button elements are required/i);
  });

  it("when Previous button is not present", () => {
    const el = buildCarouselDom();
    q<HTMLButtonElement>(el, "[data-bhc-previous]").remove();
    expect(() => new BhCarousel(el)).toThrow(/button elements are required/i);
  });
});
