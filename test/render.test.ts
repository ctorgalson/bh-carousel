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
  it("sets state.action to null when instantiated without enabling", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });
    const { action } = c.getState();
    expect(action).toBe(null);
  });

  it("sets state.action to 'disable' on disable()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el);
    c.disable();
    const { action } = c.getState();
    expect(action).toBe("disable");
  });

  it("sets state.action to 'enable' on enable()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });
    c.enable();
    const { action } = c.getState();
    expect(action).toBe("enable");
  });

  it("sets state.action to 'goto' on goto()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });
    c.goto(4);
    const { action } = c.getState();
    expect(action).toBe("goto");
  });

  it("sets state.action to 'reducedMotionChange' on handleReducedMotionChange()", () => {
    const { trigger } = stubMatchMedia(true);
    const el = buildCarouselDom();
    const c = new BhCarousel(el);
    trigger(true);
    const { action } = c.getState();
    expect(action).toBe("reducedMotionChange");
  });

  it("sets state.action to 'next' on next()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });
    c.next();
    const { action } = c.getState();
    expect(action).toBe("next");
  });

  it("sets state.action to 'pause' on pause()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });
    c.pause();
    const { action } = c.getState();
    expect(action).toBe("pause");
  });

  it("sets state.action to 'play' on play()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });
    c.play();
    const { action } = c.getState();
    expect(action).toBe("play");
  });

  it("sets state.action to 'previous' on previous()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });
    c.previous();
    const { action } = c.getState();
    expect(action).toBe("previous");
  });
});
