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

describe("Slideshow pauses when Play/Pause button clicked", () => {
  it("Play/Pause button's data-bhc-playing attr changes to 'false'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el);
    const btn = q<HTMLButtonElement>(el, "[data-bhc-play-pause]");

    btn.click();

    expect(btn.dataset.bhcPlaying).toBe("false");
  });

  it("Play/Pause button's aria-label attr changes to 'Play carousel'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el);
    const btn = q<HTMLButtonElement>(el, "[data-bhc-play-pause]");

    btn.click();

    expect(btn.getAttribute("aria-label")).toBe("Play carousel");
  });

  it("first slide's aria-hidden attr does not change to 'true'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el);
    const btn = q<HTMLButtonElement>(el, "[data-bhc-play-pause]");

    btn.click();
    const slides = qa(el, "[data-bhc-slide]");

    expect(slides[0]!.getAttribute("aria-hidden")).toBe("false");
  });

  it("Previous button is not disabled", () => {
    const el = buildCarouselDom();
    new BhCarousel(el);
    q<HTMLButtonElement>(el, "[data-bhc-play-pause]").click();

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-previous]").disabled,
    ).toBe(false);
  });

  it("Next button is not disabled", () => {
    const el = buildCarouselDom();
    new BhCarousel(el);
    q<HTMLButtonElement>(el, "[data-bhc-play-pause]").click();

    expect(q<HTMLButtonElement>(el, "[data-bhc-next]").disabled).toBe(false);
  });
});

describe("Slideshow resumes when Play/Pause button clicked", () => {
  it("slideshow's data-bhc-playing attr changes to 'true'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });
    const btn = q<HTMLButtonElement>(el, "[data-bhc-play-pause]");

    btn.click();

    expect(btn.dataset.bhcPlaying).toBe("true");
  });

  it("Play/Pause button's aria-label attr changes to 'Pause carousel'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });
    const btn = q<HTMLButtonElement>(el, "[data-bhc-play-pause]");

    btn.click();

    expect(btn.getAttribute("aria-label")).toBe("Pause carousel");
  });

  it("first slide's aria-hidden stays 'false' immediately after resuming", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });
    q<HTMLButtonElement>(el, "[data-bhc-play-pause]").click();
    const slides = qa(el, "[data-bhc-slide]");

    expect(slides[0]!.getAttribute("aria-hidden")).toBe("false");
  });

  it("Previous button becomes disabled after resuming", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });
    q<HTMLButtonElement>(el, "[data-bhc-play-pause]").click();

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-previous]").disabled,
    ).toBe(true);
  });

  it("Next button becomes disabled after resuming", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });
    q<HTMLButtonElement>(el, "[data-bhc-play-pause]").click();

    expect(q<HTMLButtonElement>(el, "[data-bhc-next]").disabled).toBe(true);
  });
});

describe("Slideshow goes forward when Next button clicked", () => {
  it("Slides 1 & 2 change aria-hidden to 'true', 'false'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });

    q<HTMLButtonElement>(el, "[data-bhc-next]").click();
    const slides = qa(el, "[data-bhc-slide]");

    expect(slides[0]!.getAttribute("aria-hidden")).toBe("true");
    expect(slides[1]!.getAttribute("aria-hidden")).toBe("false");
  });
});

describe("Slideshow goes back when Previous button clicked", () => {
  it("Slides 1 & 2 change aria-hidden to 'false', 'true'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false, startingIndex: 1 });

    q<HTMLButtonElement>(el, "[data-bhc-previous]").click();
    const slides = qa(el, "[data-bhc-slide]");

    expect(slides[0]!.getAttribute("aria-hidden")).toBe("false");
    expect(slides[1]!.getAttribute("aria-hidden")).toBe("true");
  });
});

describe("Slideshow wraps to last slide from first on Previous click", () => {
  it("Slides 1 & 5 change aria-hidden to 'true', 'false'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });

    q<HTMLButtonElement>(el, "[data-bhc-previous]").click();
    const slides = qa(el, "[data-bhc-slide]");

    expect(slides[0]!.getAttribute("aria-hidden")).toBe("true");
    expect(slides[slides.length - 1]!.getAttribute("aria-hidden")).toBe(
      "false",
    );
  });
});

describe("Slideshow wraps to first slide from last on Next click", () => {
  it("Slides 1 & 5 change aria-hidden to 'false', 'true'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false, startingIndex: 4 });

    q<HTMLButtonElement>(el, "[data-bhc-next]").click();
    const slides = qa(el, "[data-bhc-slide]");

    expect(slides[0]!.getAttribute("aria-hidden")).toBe("false");
    expect(slides[slides.length - 1]!.getAttribute("aria-hidden")).toBe(
      "true",
    );
  });
});

describe("Slideshow does not wrap when 'wrap' setting is false", () => {
  it("The 'Previous' button is disabled when starting from the first slide, but the 'Next' button is not", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false, wrap: false, startingIndex: 0 });
    expect(q<HTMLButtonElement>(el, "[data-bhc-previous]").hasAttribute("disabled")).toBe(true);
    expect(q<HTMLButtonElement>(el, "[data-bhc-next]").hasAttribute("disabled")).toBe(false);
  });

  it("The 'Previous' button changes to disabled when the first slide is reached", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, wrap: false, startingIndex: 1 });
    c.previous();
    expect(q<HTMLButtonElement>(el, "[data-bhc-previous]").hasAttribute("disabled")).toBe(true);
    expect(q<HTMLButtonElement>(el, "[data-bhc-next]").hasAttribute("disabled")).toBe(false);
  });

  it("The 'Next' button is disabled when starting from the last slide, but the 'Previous' button is not", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false, wrap: false, startingIndex: 4 });
    expect(q<HTMLButtonElement>(el, "[data-bhc-next]").hasAttribute("disabled")).toBe(true);
    expect(q<HTMLButtonElement>(el, "[data-bhc-previous]").hasAttribute("disabled")).toBe(false);
  });

  it("The 'Next' button changes to disabled when the last slide is reached", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, wrap: false, startingIndex: 3 });
    c.next();
    expect(q<HTMLButtonElement>(el, "[data-bhc-next]").hasAttribute("disabled")).toBe(true);
    expect(q<HTMLButtonElement>(el, "[data-bhc-previous]").hasAttribute("disabled")).toBe(false);
  });

  it("Carousel stops automatically at last slide when 'wrap' is false", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { interval: 500, wrap: false });
    vi.advanceTimersByTime(5000);
    const { playing } = c.getState();
    expect(playing).toBe(false);
  });

  it("does not corrupt state when Next is clicked after auto-play stops (wrap: false)", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { interval: 100, wrap: false });
    // 5 slides, 100ms per tick. 4 ticks reaches slide 4, 5th tick triggers the stop.
    vi.advanceTimersByTime(500);
    expect(c.getState().currentIndex).toBe(4);
    expect(c.getState().playing).toBe(false);
    // Manual Next click should be a no-op and not corrupt state.
    q<HTMLButtonElement>(el, "[data-bhc-next]").click();
    expect(c.getState().currentIndex).toBe(4);
    expect(c.getState().playing).toBe(false);
  });

  it("cleans up data-bhc-*-slide attrs when navigating back from the wrap boundary", () => {
    // prev.nextIndex was -1 (sentinel). The sync loop must not
    // return-early when hitting an undefined slides[-1], which
    // would skip bhcPreviousSlide cleanup.
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, wrap: false, startingIndex: 4 });
    c.previous();
    const s = qa(el, "[data-bhc-slide]");
    expect(s[3]!.dataset.bhcCurrentSlide).toBe("");
    expect(s[4]!.dataset.bhcNextSlide).toBe("");
    expect(s[3]!.dataset.bhcPreviousSlide).toBeUndefined();
    expect(s[4]!.dataset.bhcCurrentSlide).toBeUndefined();
    expect(s[4]!.dataset.bhcPreviousSlide).toBeUndefined();
  });

  it("cleans up data-bhc-*-slide attrs when navigating forward to the wrap boundary", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { automatic: false, wrap: false, startingIndex: 3 });
    c.next();
    const s = qa(el, "[data-bhc-slide]");
    expect(s[4]!.dataset.bhcCurrentSlide).toBe("");
    expect(s[3]!.dataset.bhcPreviousSlide).toBe("");
    expect(s[3]!.dataset.bhcNextSlide).toBeUndefined();
    expect(s[3]!.dataset.bhcCurrentSlide).toBeUndefined();
  });

  it("sets data-bhc-playing to false after auto-playing to the end (wrap: false)", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { interval: 100, wrap: false });
    vi.advanceTimersByTime(500);
    expect(c.getState().playing).toBe(false);
    const btn = q<HTMLButtonElement>(el, "[data-bhc-play-pause]");
    expect(btn.dataset.bhcPlaying).toBe("false");
  });

  it("disables the Play button when at the end (wrap: false, nextIndex is -1)", () => {
    const el = buildCarouselDom();
    const c = new BhCarousel(el, { interval: 100, wrap: false });
    vi.advanceTimersByTime(500);
    expect(q<HTMLButtonElement>(el, "[data-bhc-play-pause]").disabled).toBe(true);
  });
});
