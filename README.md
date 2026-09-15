# BH Carousel

![Documentation coverage](docs/coverage.svg)
[![Tests](https://github.com/ctorgalson/bh-carousel/actions/workflows/test.yml/badge.svg)](https://github.com/ctorgalson/bh-carousel/actions/workflows/test.yml)
[![Deploy static content to Pages](https://github.com/ctorgalson/bh-carousel/actions/workflows/static.yml/badge.svg)](https://github.com/ctorgalson/bh-carousel/actions/workflows/static.yml)

This project provides a markup-independent JavaScript implementation of the WAI
ARIA [Carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
for use in browser projects. The library ships a minimal functional stylesheet
(three rules: slide stacking, overflow clipping, touch-action). Presentation
is the consumer's job — `demo/css/bh-carousel-demo.css` is a worked reference.

## Features

- **Button navigation** — Previous and Next buttons
- **Keyboard navigation** — Arrow keys to advance, `P` to play/pause
- **Touch/swipe** — Swipe left/right on the slide area to navigate
- **Auto-play** — Configurable interval with Play/Pause control
- **Reduced-motion aware** — Respects `prefers-reduced-motion: reduce`
- **View Transitions** — Smooth slide animations where supported
- **Custom events** — `bhcarousel:next`, `bhcarousel:previous`, `bhcarousel:play`, `bhcarousel:pause`, etc.

## Styling

The library ships a minimal functional stylesheet (`dist/css/bh-carousel.css` /
`dist/css/bh-carousel.min.css`) with three data-attribute rules:

- `[data-bhc-slide-container]` — grid stacking, overflow clipping, touch-action
- `[data-bhc-slide]` — hide non-current slides
- `[data-bhc-slide][data-bhc-current-slide]` — show the current slide

Presentation is the consumer's job. `demo/css/bh-carousel-demo.css` is a
worked reference showing control chrome, view-transition animation, and
responsive image/caption layout.

**Button markup.** The three control buttons (`data-bhc-next`,
`data-bhc-previous`, `data-bhc-play-pause`) are icon-only and get their
accessible names from `aria-label`:

- **Play/Pause** — the library manages `aria-label`, swapping between
  `settings.ariaLabelPlay` and `settings.ariaLabelPause` based on playback
  state. It also writes `data-bhc-playing="true"|"false"` on the button,
  which consumers can use to style state changes (e.g. swapping between
  play/pause icon children).
- **Next/Previous** — the consumer sets `aria-label` in markup; the library
  leaves it alone.

**Recommended icon pattern.** Use inline `<svg>` children with
`aria-hidden="true" focusable="false"` so `aria-label` remains the sole
accessible name. For Play/Pause, use two child SVGs with class names
`play` and `pause`, toggled by CSS on `[data-bhc-playing]`:

```css
.bhc__control[data-bhc-playing="true"] .play { display: none; }
.bhc__control[data-bhc-playing="false"] .pause { display: none; }
```

See the demo for a worked example.

**Minimum-presentation layer.** Because control buttons are icon-only, they
need at least a button reset and an SVG size to be visible and clickable —
without those, native `<button>` chrome hides the icons behind default
borders and 16px SVG intrinsic sizing. `demo/index.html` puts these three
rules in an inline `<style>` block *outside* the toggle-able demo
stylesheet, so the buttons remain usable when demo styling is switched
off:

```css
[data-bhc-next],
[data-bhc-previous],
[data-bhc-play-pause] {
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0;
}

[data-bhc-next] svg,
[data-bhc-previous] svg,
[data-bhc-play-pause] svg {
  display: block;
  height: 48px;
  width: 48px;
}

[data-bhc-playing="true"] .play,
[data-bhc-playing="false"] .pause {
  display: none;
}
```

Adopt or replace these rules as needed — they are not part of the library
stylesheet and consumers can freely ignore them.

- Try [the demo](https://ctorgalson.github.io/bh-carousel/)
- See `demo/` directory for a sample implementation.
- Find complete typedoc documentation in [the `docs/` directory](docs/).

## Quickstart

Install from npm:

```bash
npm install @bedlamhotel/bh-carousel
```

Or build from source:

```bash
# Clone the repository
git clone https://github.com/ctorgalson/bh-carousel.git
# Change directories
cd bh-carousel/
# Install npm dev packages
npm ci
# Build dist files
npm run build
```

## Tests

The project currently includes a full set of e2e tests including

- configuration options (complete for implemented options)
- Play/Pause, Next, and Previous buttons
- keyboard navigation
- touch/swipe navigation

To run the tests, clone and install the dev packages:

```bash
# Clone the repository
git clone https://github.com/ctorgalson/bh-carousel.git
# Change directories
cd bh-carousel/
# Install npm dev packages
npm ci
```

That done,

- run the tests in the Cypress UI with `npm run test:ui`, or
- run the tests in the terminal with `./test.sh`

## Possible future features

- [Tab-style navigation](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/examples/carousel-2-tablist/) in addition to the button-style already implemented,
