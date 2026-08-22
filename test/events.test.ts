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

describe("Slideshow honours user preference", () => {
  it("does not autoplay when `prefers-reduced-motion` starts out `reduce`", () => {
    stubMatchMedia(true);
    const el = buildCarouselDom();
    const c = new BhCarousel(el);
    const { playing } = c.getState();
    expect(playing).toBe(false);
    expect(
      el.querySelector<HTMLButtonElement>("[data-bhc-play-pause]")!.disabled
    ).toBe(true);
  });

  it("stops playing when `prefers-reduced-motion` becomes `reduce`", () => {
    const { trigger } = stubMatchMedia(false);
    const el = buildCarouselDom();
    const c = new BhCarousel(el);
    trigger(true);
    const { playing } = c.getState();
    expect(playing).toBe(false);
    expect(
      el.querySelector<HTMLButtonElement>("[data-bhc-play-pause]")!.disabled
    ).toBe(true);
  });

  it("does not autoplay when `prefers-reduced-motion` becomes `no-preference`", () => {
    const { trigger } = stubMatchMedia(true);
    const el = buildCarouselDom();
    const c = new BhCarousel(el);
    trigger(false);
    const { playing } = c.getState();
    expect(playing).toBe(false);
    expect(
      el.querySelector<HTMLButtonElement>("[data-bhc-play-pause]")!.disabled
    ).toBe(false);
  });
});

describe("Slideshow emits bhcarousel:* events on UI changes and public API calls", () => {
  it("emits a bhcarousel:play event on Play click", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    const spy = vi.fn();
    el.addEventListener("bhcarousel:play", spy as EventListener);
    q<HTMLButtonElement>(el, "[data-bhc-play-pause]").click();
    expect(spy).toHaveBeenCalledOnce();
    expect((spy.mock.calls[0]![0] as CustomEvent).detail.action).toEqual("play");
  });

  it("emits a bhcarousel:pause event on Pause click", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el);
    const spy = vi.fn();
    el.addEventListener("bhcarousel:pause", spy as EventListener);
    q<HTMLButtonElement>(el, "[data-bhc-play-pause]").click();
    expect(spy).toHaveBeenCalledOnce();
    expect((spy.mock.calls[0]![0] as CustomEvent).detail.action).toEqual("pause");
  });

  it("emits a bhcarousel:previous event on Previous click", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    const spy = vi.fn();
    el.addEventListener("bhcarousel:previous", spy as EventListener);
    q<HTMLButtonElement>(el, "[data-bhc-previous]").click();
    expect(spy).toHaveBeenCalledOnce();
    expect((spy.mock.calls[0]![0] as CustomEvent).detail.action).toEqual("previous");
  });

  it("emits a bhcarousel:next event on Next click", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    const spy = vi.fn();
    el.addEventListener("bhcarousel:next", spy as EventListener);
    q<HTMLButtonElement>(el, "[data-bhc-next]").click();
    expect(spy).toHaveBeenCalledOnce();
    expect((spy.mock.calls[0]![0] as CustomEvent).detail.action).toEqual("next");
  });

  it("emits a bhcarousel:enable event on enable())", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });
    const spy = vi.fn();
    el.addEventListener("bhcarousel:enable", spy as EventListener);
    c.enable();
    expect(spy).toHaveBeenCalledOnce();
    expect((spy.mock.calls[0]![0] as CustomEvent).detail.action).toEqual("enable");
  });

  it("emits a bhcarousel:disable event on disable())", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el);
    const spy = vi.fn();
    el.addEventListener("bhcarousel:disable", spy as EventListener);
    c.disable();
    expect(spy).toHaveBeenCalledOnce();
    expect((spy.mock.calls[0]![0] as CustomEvent).detail.action).toEqual("disable");
  });

  it("emits a bhcarousel:goto event on goto()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    const spy = vi.fn();
    el.addEventListener("bhcarousel:goto", spy as EventListener);
    c.goto(4);
    expect(spy).toHaveBeenCalledOnce();
    expect((spy.mock.calls[0]![0] as CustomEvent).detail.action).toEqual("goto");
  });

  it("does not emit a bhcarousel:goto event when called with currentIndex", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    const spy = vi.fn();
    el.addEventListener("bhcarousel:goto", spy as EventListener);
    c.goto(0);
    expect(spy).not.toHaveBeenCalledOnce();
  });

  it("does not emit a 'disable' event when already disabled", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el);
    const spy = vi.fn();
    el.addEventListener("bhcarousel:disable", spy as EventListener);
    c.disable();
    c.disable();
    expect(spy).toHaveBeenCalledOnce();
    expect((spy.mock.calls[0]![0] as CustomEvent).detail.action).toEqual("disable");
  });

  it("does not emit a 'enable' event when already enabled", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el);
    const spy = vi.fn();
    el.addEventListener("bhcarousel:enable", spy as EventListener);
    c.enable();
    expect(spy).not.toHaveBeenCalledOnce();
  });

  it("does not duplicate events on enable/disable/enable", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    const spy = vi.fn();
    el.addEventListener("bhcarousel:next", spy as EventListener);
    c.disable();
    c.enable();
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    const { currentIndex } = c.getState();
    expect(currentIndex).toBe(1);
    expect(spy).toHaveBeenCalledOnce();
    expect((spy.mock.calls[0]![0] as CustomEvent).detail.action).toEqual("next");
  });
});
