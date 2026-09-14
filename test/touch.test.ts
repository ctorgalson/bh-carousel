import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import BhCarousel from "../src/bh-carousel";
import { buildCarouselDom, stubMatchMedia } from "./fixture";

const swipe = (
  target: EventTarget,
  from: [number, number],
  to: [number, number],
  pointerType: string = "touch",
) => {
  target.dispatchEvent(new PointerEvent("pointerdown", {
    pointerId: 1, pointerType, clientX: from[0], clientY: from[1],
    isPrimary: true, bubbles: true,
  }));
  window.dispatchEvent(new PointerEvent("pointerup", {
    pointerId: 1, pointerType, clientX: to[0], clientY: to[1],
    isPrimary: true, bubbles: true,
  }));
};

beforeEach(() => {
  stubMatchMedia(false);
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("Touch swipe navigation", () => {
  it("advances to next slide on leftward swipe past threshold", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    const container = el.querySelector("[data-bhc-slide-container]")!;

    swipe(container, [200, 100], [100, 100]);

    expect(c.getState().currentIndex).toBe(1);
  });

  it("goes to previous slide on rightward swipe past threshold", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, startingIndex: 2 });
    const container = el.querySelector("[data-bhc-slide-container]")!;

    swipe(container, [100, 100], [200, 100]);

    expect(c.getState().currentIndex).toBe(1);
  });

  it("does not navigate when swipe is below threshold", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    const container = el.querySelector("[data-bhc-slide-container]")!;

    swipe(container, [200, 100], [180, 100]); // dx = 20

    expect(c.getState().currentIndex).toBe(0);
  });

  it("does not navigate on vertical-dominant swipe", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    const container = el.querySelector("[data-bhc-slide-container]")!;

    swipe(container, [100, 200], [150, 100]); // dx = 50, dy = -100

    expect(c.getState().currentIndex).toBe(0);
  });

  it("does not navigate on non-touch pointer type", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    const container = el.querySelector("[data-bhc-slide-container]")!;

    swipe(container, [200, 100], [100, 100], "mouse");

    expect(c.getState().currentIndex).toBe(0);
  });

  it("does not navigate after pointercancel", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    const container = el.querySelector("[data-bhc-slide-container]")!;

    container.dispatchEvent(new PointerEvent("pointerdown", {
      pointerId: 1, pointerType: "touch", clientX: 200, clientY: 100,
      isPrimary: true, bubbles: true,
    }));
    window.dispatchEvent(new PointerEvent("pointercancel", {
      pointerId: 1, pointerType: "touch", clientX: 200, clientY: 100,
      isPrimary: true, bubbles: true,
    }));
    window.dispatchEvent(new PointerEvent("pointerup", {
      pointerId: 1, pointerType: "touch", clientX: 100, clientY: 100,
      isPrimary: true, bubbles: true,
    }));

    expect(c.getState().currentIndex).toBe(0);
  });

  it("does not navigate when swipe setting is false", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, swipe: false });
    const container = el.querySelector("[data-bhc-slide-container]")!;

    swipe(container, [200, 100], [100, 100]);

    expect(c.getState().currentIndex).toBe(0);
  });

  it("does not wrap on leftward swipe at last slide with wrap: false", () => {
    const el = buildCarouselDom({ slideCount: 3 });
    const c = new BhCarousel(el, { automatic: false, wrap: false, startingIndex: 2 });
    const container = el.querySelector("[data-bhc-slide-container]")!;

    swipe(container, [200, 100], [100, 100]);

    expect(c.getState().currentIndex).toBe(2);
  });

  it("emits bhcarousel:next on leftward swipe", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    const container = el.querySelector("[data-bhc-slide-container]")!;
    const handler = vi.fn();
    el.addEventListener("bhcarousel:next", handler);

    swipe(container, [200, 100], [100, 100]);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("emits bhcarousel:pause before bhcarousel:next on swipe during autoplay", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el);
    const container = el.querySelector("[data-bhc-slide-container]")!;
    const calls: string[] = [];
    el.addEventListener("bhcarousel:pause", () => calls.push("pause"));
    el.addEventListener("bhcarousel:next", () => calls.push("next"));

    swipe(container, [200, 100], [100, 100]);

    expect(calls).toEqual(["pause", "next"]);
  });

  it("does not emit bhcarousel:pause on rejected swipe during autoplay", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el);
    const container = el.querySelector("[data-bhc-slide-container]")!;
    const handler = vi.fn();
    el.addEventListener("bhcarousel:pause", handler);

    swipe(container, [200, 100], [180, 100]); // dx = 20, below threshold

    expect(handler).not.toHaveBeenCalled();
    expect(c.getState().playing).toBe(true);
  });
});