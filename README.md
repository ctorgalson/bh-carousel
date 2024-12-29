# BH Carousel

![Documentation coverage](docs/coverage.svg)
[![Cypress tests](https://github.com/ctorgalson/bh-carousel/actions/workflows/test.yml/badge.svg)](https://github.com/ctorgalson/bh-carousel/actions/workflows/test.yml)
[![Deploy static content to Pages](https://github.com/ctorgalson/bh-carousel/actions/workflows/static.yml/badge.svg)](https://github.com/ctorgalson/bh-carousel/actions/workflows/static.yml)

This project provides a markup-independent javascript implementation of the WAI
ARIA [Carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
for use in browser projects.

The script is fully independent of any design-system, but that means you have
to BYOCSS.

- See `cypress/fixtures/` directory for a sample implementation.
- Find complete typedoc documentation in [the `docs/` directory](docs/).

## Quickstart

The project will provide npm packages once it reaches a more stable condition.
Until then, you can generate package files with the following commands:

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

The project currently includes e2e testing of its

- configuration options (complete for implemented options)
- Play/Pause, Next, and Previous buttons
- keyboard navigation

Still to come are tests for the public API of the class.

To run the tests, it's first necessary to clone and install dev packages:

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

## Planned features

- [Tab-style navigation](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/examples/carousel-2-tablist/) in addition to the button-style already implemented,
- support for use in Node projects
