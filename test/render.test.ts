import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import BhCarousel from "../src/bh-carousel";
import { buildCarouselDom, stubMatchMedia } from "./fixture";

beforeEach(() => {
  stubMatchMedia(false);
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("Carousel render()", () => {
  it("sets state.modifiedBy to 'constructor' when instantiated without enabling", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });
    const { modifiedBy } = c.getState();
    expect(modifiedBy).toBe("constructor");
  });

  it("sets state.modifiedBy to 'disable' on disable()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el);
    c.disable();
    const { modifiedBy } = c.getState();
    expect(modifiedBy).toBe("disable");
  });

  it("sets state.modifiedBy to 'enable' on enable()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });
    c.enable();
    const { modifiedBy } = c.getState();
    expect(modifiedBy).toBe("enable");
  });

  it("sets state.modifiedBy to 'goto' on goto()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });
    c.goto(4);
    const { modifiedBy } = c.getState();
    expect(modifiedBy).toBe("goto");
  });

  it("sets state.modifiedBy to 'handleReducedMotionChange' on handleReducedMotionChange()", () => {
    const { trigger } = stubMatchMedia(true);
    const el = buildCarouselDom();
    const c = new BhCarousel(el);
    trigger(true);
    const { modifiedBy } = c.getState();
    expect(modifiedBy).toBe("handleReducedMotionChange");
  });

  it("sets state.modifiedBy to 'next' on next()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });
    c.next();
    const { modifiedBy } = c.getState();
    expect(modifiedBy).toBe("next");
  });

  it("sets state.modifiedBy to 'pause' on pause()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });
    c.pause();
    const { modifiedBy } = c.getState();
    expect(modifiedBy).toBe("pause");
  });

  it("sets state.modifiedBy to 'play' on play()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });
    c.play();
    const { modifiedBy } = c.getState();
    expect(modifiedBy).toBe("play");
  });

  it("sets state.modifiedBy to 'previous' on previous()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });
    c.previous();
    const { modifiedBy } = c.getState();
    expect(modifiedBy).toBe("previous");
  });
});
