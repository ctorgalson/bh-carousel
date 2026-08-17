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
    const slides = qa(el, "[aria-roledescription='slide']");

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
    const slides = qa(el, "[aria-roledescription='slide']");

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
    const slides = qa(el, "[aria-roledescription='slide']");

    expect(slides[0]!.getAttribute("aria-hidden")).toBe("true");
    expect(slides[1]!.getAttribute("aria-hidden")).toBe("false");
  });
});

describe("Slideshow goes back when Previous button clicked", () => {
  it("Slides 1 & 2 change aria-hidden to 'false', 'true'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false, startingIndex: 1 });

    q<HTMLButtonElement>(el, "[data-bhc-previous]").click();
    const slides = qa(el, "[aria-roledescription='slide']");

    expect(slides[0]!.getAttribute("aria-hidden")).toBe("false");
    expect(slides[1]!.getAttribute("aria-hidden")).toBe("true");
  });
});

describe("Slideshow wraps to last slide from first on Previous click", () => {
  it("Slides 1 & 5 change aria-hidden to 'true', 'false'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });

    q<HTMLButtonElement>(el, "[data-bhc-previous]").click();
    const slides = qa(el, "[aria-roledescription='slide']");

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
    const slides = qa(el, "[aria-roledescription='slide']");

    expect(slides[0]!.getAttribute("aria-hidden")).toBe("false");
    expect(slides[slides.length - 1]!.getAttribute("aria-hidden")).toBe(
      "true",
    );
  });
});
