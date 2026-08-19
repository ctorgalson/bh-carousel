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

describe("getState()", () => {
  it("returns correct state values on start", () => {
    const refState = {
      playing: true,
      currentIndex: 0,
      enabled: true,
      firstIndex: 0,
      lastIndex: 4,
      modifiedBy: "enable",
      prefersReducedMotion: false,
    };
    const el = buildCarouselDom();
    const c = new BhCarousel(el);
    expect(c.getState()).toEqual(refState);
  });

  it("returns a snapshot", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el);
    const s = c.getState();
    const originalPlaying = s.playing;
    // Try to mutate the read-only property of c.state.
    s.playing = false;
    const { playing } = c.getState();
    expect(playing).toEqual(originalPlaying);
  })
});

describe("disable()", () => {
  it("disables both nav buttons while paused", () => {
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

  it("keeps both nav buttons disabled if called while playing", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: true }); // Default

    c.disable();
    expect(
      q<HTMLButtonElement>(el, "[data-bhc-next]").disabled,
    ).toBe(true);
    expect(
      q<HTMLButtonElement>(el, "[data-bhc-previous]").disabled,
    ).toBe(true);
  });

  it("stops the interval from advancing slides", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { interval: 1000 });

    c.disable();
    vi.advanceTimersByTime(5000);
    const { currentIndex } = c.getState();
    expect(currentIndex).toBe(0);
  });

  it("disables Play/Pause and removes its aria-label", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });

    c.disable();
    const btn = q<HTMLButtonElement>(el, "[data-bhc-play-pause]");

    expect(btn.disabled).toBe(true);
    expect(btn.getAttribute("aria-label")).toBeNull();
  });

  it("removes the aria-hidden attribute from all slide elements", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });

    c.disable();
    expect(
      qa(el, "[aria-roledescription='slide']")[0]!.getAttribute("aria-hidden"),
    ).toBeNull();
  });
});

describe("enable()", () => {
  it("reflects construction-time state", () => {
    const el = buildCarouselDom();

    const a = new BhCarousel(el, { automatic: true });
    const { playing: aPlaying } = a.getState();
    expect(aPlaying).toBe(true);

    const b = new BhCarousel(el, { automatic: false });
    const { playing: bPlaying } = b.getState();
    expect(bPlaying).toBe(false);
  });

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

  it("starts autoplay when play/pause button does not exist", () => {
    const el = buildCarouselDom({ withPlayPauseButton: false });
    const c = new BhCarousel(el);

    vi.advanceTimersByTime(4000);
    const { currentIndex, playing } = c.getState();
    expect(playing).toBe(true);
    expect(currentIndex).toBe(1);
  });
});

describe("get currentIndex from state", () => {
  it("returns the starting index before any navigation", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, startingIndex: 2 });
    const { currentIndex } = c.getState();
    expect(currentIndex).toBe(2);
  });

  it("reflects navigation via next()", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, startingIndex: 2 });
    c.next();
    const { currentIndex } = c.getState();
    expect(currentIndex).toBe(3);
  });
});

describe("goto()", () => {
  it("navigates to a numeric index", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    c.goto(3);
    const { currentIndex } = c.getState();

    expect(currentIndex).toBe(3);
    const slides = qa(el, "[aria-roledescription='slide']");
    expect(slides[3]!.getAttribute("aria-hidden")).toBe("false");
    expect(slides[0]!.getAttribute("aria-hidden")).toBe("true");
  });

  it("accepts 'next' and 'previous'", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, startingIndex: 2 });
    let currentIndex;

    c.goto("next");
    ({ currentIndex} = c.getState());
    expect(currentIndex).toBe(3);

    c.goto("previous");
    ({ currentIndex} = c.getState());
    expect(currentIndex).toBe(2);
  });
});

describe("next()", () => {
  it("advances by one", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    c.next();
    const { currentIndex } = c.getState();
    expect(currentIndex).toBe(1);
  });

  it("wraps to first from last", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, startingIndex: 4 });
    c.next();
    const { currentIndex } = c.getState();
    expect(currentIndex).toBe(0);
  });
});

describe("previous()", () => {
  it("goes back by one", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, startingIndex: 2 });
    c.previous();
    const { currentIndex } = c.getState();
    expect(currentIndex).toBe(1);
  });

  it("wraps to last from first", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    c.previous();
    const { currentIndex } = c.getState();
    expect(currentIndex).toBe(4);
  });
});

describe("pause()", () => {
  it("stops the interval from advancing slides", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { interval: 1000 });
    c.pause();
    vi.advanceTimersByTime(5000);
    const { currentIndex } = c.getState();
    expect(currentIndex).toBe(0);
  });

  it("sets playing state to false", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    c.pause();
    const { playing } = c.getState();
    expect(playing).toBe(false);
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
    const { currentIndex } = c.getState();
    expect(currentIndex).toBe(1);
  });

  it("sets playing state to true", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    c.play();
    const { playing } = c.getState();
    expect(playing).toBe(true);
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

describe("getNextIndex()", () => {
  it("returns current index + 1", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    expect(c.getNextIndex()).toBe(1);
  });

  it("returns zero when currentIndex === lastIndex", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, startingIndex: 4 });
    expect(c.getNextIndex()).toBe(0);
  });
});

describe("getPreviousIndex()", () => {
  it("returns current index - 1", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, startingIndex: 3 });
    expect(c.getPreviousIndex()).toBe(2);
  });

  it("returns lastIndex when currentIndex === 0", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false });
    expect(c.getPreviousIndex()).toBe(4);
  });
});
