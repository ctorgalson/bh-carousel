import { afterEach, beforeEach, describe, expect, it } from "vitest";
import BhCarousel from "../src/bh-carousel";
import { buildCarouselDom, stubMatchMedia } from "./fixture";

beforeEach(() => stubMatchMedia(false));
afterEach(() => (document.body.innerHTML = ""));

const sc = (el: ParentNode): HTMLElement =>
  el.querySelector<HTMLElement>("[data-bhc-slide-container]")!;

describe("renderSlideContainer", () => {
  it("sets aria-live to 'off' on construction when playing (default)", () => {
    const el = buildCarouselDom();
    new BhCarousel(el);
    expect(sc(el).getAttribute("aria-live")).toBe("off");
  });

  it("sets aria-live to 'polite' on construction when automatic: false", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });
    expect(sc(el).getAttribute("aria-live")).toBe("polite");
  });

  it("toggles to 'off' on play()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    c.play();
    expect(sc(el).getAttribute("aria-live")).toBe("off");
  });

  it("toggles to 'polite' on pause()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el);
    c.pause();
    expect(sc(el).getAttribute("aria-live")).toBe("polite");
  });
});