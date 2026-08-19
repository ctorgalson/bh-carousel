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

describe("ariaLabelPause", () => {
  it("sets Play/Pause aria-label while playing", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { ariaLabelPause: "Pause (custom)" });

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-play-pause]").getAttribute(
        "aria-label",
      ),
    ).toBe("Pause (custom)");
  });
});

describe("ariaLabelPlay", () => {
  it("sets Play/Pause aria-label while paused", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, {
      ariaLabelPlay: "Play (custom)",
      automatic: false,
    });

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-play-pause]").getAttribute(
        "aria-label",
      ),
    ).toBe("Play (custom)");
  });
});

describe("autoEnable=false", () => {
  it("leaves button controls hidden", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { autoEnable: false });

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-play-pause]").hidden,
    ).toBe(true);
    expect(q<HTMLButtonElement>(el, "[data-bhc-next]").hidden).toBe(true);
    expect(
      q<HTMLButtonElement>(el, "[data-bhc-previous]").hidden,
    ).toBe(true);
  });

  it("leaves Play/Pause without a data-bhc-playing attr", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { autoEnable: false });

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-play-pause]").dataset.bhcPlaying,
    ).toBeUndefined();
  });
});

describe("automatic=true (default)", () => {
  it("sets data-bhc-playing to 'true'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: true });

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-play-pause]").dataset.bhcPlaying,
    ).toBe("true");
  });

  it("advances the first slide after the interval elapses", () => {
    const el = buildCarouselDom();
    new BhCarousel(el);

    vi.advanceTimersByTime(4000);

    expect(
      qa(el, "[aria-roledescription='slide']")[0]!.getAttribute("aria-hidden"),
    ).toBe("true");
  });

  it("disables the Previous button", () => {
    const el = buildCarouselDom();
    new BhCarousel(el);

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-previous]").disabled,
    ).toBe(true);
  });

  it("disables the Next button", () => {
    const el = buildCarouselDom();
    new BhCarousel(el);

    expect(q<HTMLButtonElement>(el, "[data-bhc-next]").disabled).toBe(true);
  });
});

describe("automatic=false", () => {
  it("sets data-bhc-playing to 'false'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-play-pause]").dataset.bhcPlaying,
    ).toBe("false");
  });

  it("does not advance the first slide even if 6s pass", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });

    vi.advanceTimersByTime(6000);

    expect(
      qa(el, "[aria-roledescription='slide']")[0]!.getAttribute("aria-hidden"),
    ).toBe("false");
  });

  it("leaves Previous button enabled", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-previous]").disabled,
    ).toBe(false);
  });

  it("leaves Next button enabled", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });

    expect(q<HTMLButtonElement>(el, "[data-bhc-next]").disabled).toBe(false);
  });
});

describe("interval=1000", () => {
  it("advances the first slide after 1000ms", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { interval: 1000 });

    vi.advanceTimersByTime(1000);

    expect(
      qa(el, "[aria-roledescription='slide']")[0]!.getAttribute("aria-hidden"),
    ).toBe("true");
  });
});

describe("itemStateAttribute='data-hidden'", () => {
  it("sets data-hidden on all slides", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { itemStateAttribute: "data-hidden" });

    expect(qa(el, "[aria-roledescription='slide'][data-hidden]").length).toBe(
      5,
    );
  });

  it("marks the starting slide's data-hidden as 'false'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, {
      automatic: false,
      itemStateAttribute: "data-hidden",
      startingIndex: 2,
    });

    expect(
      qa(el, "[aria-roledescription='slide']")[2]!.getAttribute("data-hidden"),
    ).toBe("false");
  });
});

describe("startingIndex=2", () => {
  it("shows the third slide", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false, startingIndex: 2 });

    expect(
      qa(el, "[aria-roledescription='slide']")[2]!.getAttribute("aria-hidden"),
    ).toBe("false");
  });
});

describe("debug", () => {
  it("runs console.debug() when set", () => {
    const debugSpy = vi.spyOn(console, "debug");
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false, debug: true });
    vi.advanceTimersByTime(2000);
    expect(debugSpy).toHaveBeenCalled();
    debugSpy.mockRestore();
  });

  it("runs no console methods when not set", () => {
    const debugSpy = vi.spyOn(console, "debug");
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });
    vi.advanceTimersByTime(2000);
    expect(debugSpy).not.toHaveBeenCalled();
    debugSpy.mockRestore();
  });
});
