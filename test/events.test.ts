import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import BhCarousel from "../src/bh-carousel";
import { buildCarouselDom, stubMatchMedia } from "./fixture";

const q = <T extends Element = HTMLElement>(el: ParentNode, sel: string) =>
  el.querySelector<T>(sel)!;

beforeEach(() => {
  stubMatchMedia(false);
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("Slideshow emits BhCarousel events on play/pause/next/previous", () => {
  it("Pause button emits detail {action: 'pause'}", () => {
    const el = buildCarouselDom();
    new BhCarousel(el);
    const spy = vi.fn();
    el.addEventListener("BhCarousel", spy as EventListener);

    q<HTMLButtonElement>(el, "[data-bhc-play-pause]").click();

    expect(spy).toHaveBeenCalledOnce();
    expect((spy.mock.calls[0]![0] as CustomEvent).detail).toEqual({
      action: "pause",
    });
  });

  it("Play button emits detail {action: 'play'}", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });
    const spy = vi.fn();
    el.addEventListener("BhCarousel", spy as EventListener);

    q<HTMLButtonElement>(el, "[data-bhc-play-pause]").click();

    expect(spy).toHaveBeenCalledOnce();
    expect((spy.mock.calls[0]![0] as CustomEvent).detail).toEqual({
      action: "play",
    });
  });

  it("Next button emits detail {action: 'next', currentIndex: 1, previousIndex: 0}", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });
    const spy = vi.fn();
    el.addEventListener("BhCarousel", spy as EventListener);

    q<HTMLButtonElement>(el, "[data-bhc-next]").click();

    expect(spy).toHaveBeenCalledOnce();
    expect((spy.mock.calls[0]![0] as CustomEvent).detail).toEqual({
      action: "next",
      currentIndex: 1,
      previousIndex: 0,
    });
  });

  it("Previous button wraps and emits detail {action: 'previous', currentIndex: 4, previousIndex: 0}", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });
    const spy = vi.fn();
    el.addEventListener("BhCarousel", spy as EventListener);

    q<HTMLButtonElement>(el, "[data-bhc-previous]").click();

    expect(spy).toHaveBeenCalledOnce();
    expect((spy.mock.calls[0]![0] as CustomEvent).detail).toEqual({
      action: "previous",
      currentIndex: 4,
      previousIndex: 0,
    });
  });
});
