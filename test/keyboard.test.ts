import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import BhCarousel from "../src/bh-carousel";
import { buildCarouselDom, stubMatchMedia } from "./fixture";

const q = <T extends Element = HTMLElement>(el: ParentNode, sel: string) =>
  el.querySelector<T>(sel)!;
const qa = (el: ParentNode, sel: string) => el.querySelectorAll(sel);

const press = (key: string) =>
  window.dispatchEvent(new KeyboardEvent("keydown", { key }));

beforeEach(() => {
  stubMatchMedia(false);
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("Slideshow pauses when P pressed", () => {
  it("Play/Pause button's data-bhc-playing attr changes to 'false'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el);

    press("p");

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-play-pause]").dataset.bhcPlaying,
    ).toBe("false");
  });

  it("first slide's aria-hidden stays 'false' after P press", () => {
    const el = buildCarouselDom();
    new BhCarousel(el);

    press("p");

    const slides = qa(el, "[aria-roledescription='slide']");
    expect(slides[0]!.getAttribute("aria-hidden")).toBe("false");
  });

  it("Previous button becomes enabled", () => {
    const el = buildCarouselDom();
    new BhCarousel(el);

    press("p");

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-previous]").disabled,
    ).toBe(false);
  });

  it("Next button becomes enabled", () => {
    const el = buildCarouselDom();
    new BhCarousel(el);

    press("p");

    expect(q<HTMLButtonElement>(el, "[data-bhc-next]").disabled).toBe(false);
  });
});

describe("Slideshow resumes when P pressed", () => {
  it("data-bhc-playing changes to 'true'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });

    press("p");

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-play-pause]").dataset.bhcPlaying,
    ).toBe("true");
  });

  it("first slide's aria-hidden stays 'false' immediately after resuming", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });

    press("p");

    const slides = qa(el, "[aria-roledescription='slide']");
    expect(slides[0]!.getAttribute("aria-hidden")).toBe("false");
  });

  it("Previous button becomes disabled after resuming", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });

    press("p");

    expect(
      q<HTMLButtonElement>(el, "[data-bhc-previous]").disabled,
    ).toBe(true);
  });

  it("Next button becomes disabled after resuming", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });

    press("p");

    expect(q<HTMLButtonElement>(el, "[data-bhc-next]").disabled).toBe(true);
  });
});

describe("Slideshow goes forward when ArrowRight pressed", () => {
  it("Slides 1 & 2 change aria-hidden to 'true', 'false'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });

    press("ArrowRight");

    const slides = qa(el, "[aria-roledescription='slide']");
    expect(slides[0]!.getAttribute("aria-hidden")).toBe("true");
    expect(slides[1]!.getAttribute("aria-hidden")).toBe("false");
  });
});

describe("Slideshow goes back when ArrowLeft pressed", () => {
  it("Slides 1 & 2 change aria-hidden to 'false', 'true'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false, startingIndex: 1 });

    press("ArrowLeft");

    const slides = qa(el, "[aria-roledescription='slide']");
    expect(slides[0]!.getAttribute("aria-hidden")).toBe("false");
    expect(slides[1]!.getAttribute("aria-hidden")).toBe("true");
  });
});

describe("Slideshow wraps to last slide from first on ArrowLeft", () => {
  it("Slides 1 & 5 change aria-hidden to 'true', 'false'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false });

    press("ArrowLeft");

    const slides = qa(el, "[aria-roledescription='slide']");
    expect(slides[0]!.getAttribute("aria-hidden")).toBe("true");
    expect(slides[slides.length - 1]!.getAttribute("aria-hidden")).toBe(
      "false",
    );
  });
});

describe("Slideshow wraps to first slide from last on ArrowRight", () => {
  it("Slides 1 & 5 change aria-hidden to 'false', 'true'", () => {
    const el = buildCarouselDom();
    new BhCarousel(el, { automatic: false, startingIndex: 4 });

    press("ArrowRight");

    const slides = qa(el, "[aria-roledescription='slide']");
    expect(slides[0]!.getAttribute("aria-hidden")).toBe("false");
    expect(slides[slides.length - 1]!.getAttribute("aria-hidden")).toBe(
      "true",
    );
  });
});
