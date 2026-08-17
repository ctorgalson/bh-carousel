import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import BhCarousel from "../src/bh-carousel";
import { buildCarouselDom, stubMatchMedia } from "./fixture";

const q = <T extends Element = HTMLElement>(el: ParentNode, sel: string) =>
  el.querySelector<T>(sel)!;
const qa = (el: ParentNode, sel: string) => el.querySelectorAll(sel);

beforeEach(() => {
  stubMatchMedia(false);
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("disable()", () => {
  it("disables both nav buttons", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });

    c.disable();

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-next]").disabled,
    ).toBe(true);
    expect(
      q<HTMLButtonElement>(el, "[data-bhc-previous]").disabled,
    ).toBe(true);
  });

  it("disables Play/Pause and removes its aria-label", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });

    c.disable();
    const btn = q<HTMLButtonElement>(el, "[data-bhc-play-pause]");

    expect(btn.disabled).toBe(true);
    expect(btn.getAttribute("aria-label")).toBeNull();
  });

  it("stops responding to arrow keys", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });

    c.disable();
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));

    expect(
      qa(el, "[aria-roledescription='slide']")[0]!.getAttribute("aria-hidden"),
    ).toBe("false");
  });
});

describe("enable()", () => {
  it("un-hides the nav buttons that autoEnable=false left hidden", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });

    c.enable();

    expect(q<HTMLButtonElement>(el, "[data-bhc-next]").hidden).toBe(false);
    expect(
      q<HTMLButtonElement>(el, "[data-bhc-previous]").hidden,
    ).toBe(false);
    expect(
      q<HTMLButtonElement>(el, "[data-bhc-play-pause]").hidden,
    ).toBe(false);
  });

  it("sets the itemStateAttribute on every slide", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { autoEnable: false });

    c.enable();

    const slides = qa(el, "[aria-roledescription='slide']");
    expect(slides[0]!.getAttribute("aria-hidden")).toBe("false");
    for (let i = 1; i < slides.length; i++) {
      expect(slides[i]!.getAttribute("aria-hidden")).toBe("true");
    }
  });
});

describe("getCurrentIndex()", () => {
  it("returns the startingIndex before any navigation", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, startingIndex: 2 });

    expect(c.getCurrentIndex()).toBe(2);
  });

  it("reflects navigation via next()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, startingIndex: 2 });

    c.next();

    expect(c.getCurrentIndex()).toBe(3);
  });
});

describe("getFirstIndex()", () => {
  it("returns 0", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });

    expect(c.getFirstIndex()).toBe(0);
  });
});

describe("getLastIndex()", () => {
  it("returns slideCount - 1", () => {
    const el = buildCarouselDom({ slideCount: 5 });
    const c = new BhCarousel(el, { automatic: false });

    expect(c.getLastIndex()).toBe(4);
  });

  it("scales with slideCount", () => {
    const el = buildCarouselDom({ slideCount: 3 });
    const c = new BhCarousel(el, { automatic: false });

    expect(c.getLastIndex()).toBe(2);
  });
});

describe("goto()", () => {
  it("navigates to a numeric index", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });

    c.goto(3);

    expect(c.getCurrentIndex()).toBe(3);
    const slides = qa(el, "[aria-roledescription='slide']");
    expect(slides[3]!.getAttribute("aria-hidden")).toBe("false");
    expect(slides[0]!.getAttribute("aria-hidden")).toBe("true");
  });

  it("accepts 'next' and 'previous'", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, startingIndex: 2 });

    c.goto("next");
    expect(c.getCurrentIndex()).toBe(3);

    c.goto("previous");
    expect(c.getCurrentIndex()).toBe(2);
  });
});

describe("next()", () => {
  it("advances by one", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });

    c.next();

    expect(c.getCurrentIndex()).toBe(1);
  });

  it("wraps to first from last", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, startingIndex: 4 });

    c.next();

    expect(c.getCurrentIndex()).toBe(0);
  });
});

describe("previous()", () => {
  it("goes back by one", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, startingIndex: 2 });

    c.previous();

    expect(c.getCurrentIndex()).toBe(1);
  });

  it("wraps to last from first", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });

    c.previous();

    expect(c.getCurrentIndex()).toBe(4);
  });
});

describe("pause()", () => {
  it("stops the interval from advancing slides", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { interval: 1000 });

    c.pause();
    vi.advanceTimersByTime(5000);

    expect(c.getCurrentIndex()).toBe(0);
  });

  it("updates data-bhc-playing to 'false'", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el);

    c.pause();

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-play-pause]").dataset.bhcPlaying,
    ).toBe("false");
  });
});

describe("play()", () => {
  it("starts the interval and advances at each tick", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, interval: 1000 });

    c.play();
    vi.advanceTimersByTime(1000);

    expect(c.getCurrentIndex()).toBe(1);
  });

  it("updates data-bhc-playing to 'true'", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });

    c.play();

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-play-pause]").dataset.bhcPlaying,
    ).toBe("true");
  });
});
