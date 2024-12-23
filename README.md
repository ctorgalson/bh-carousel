# BH Carousel

![Documentation coverage](docs/coverage.svg)

This project provides a markup-independent javascript implementation of the WAI
ARIA [Carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
for use in npm or browser projects.

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

The project currently includes minimal e2e testing of its default configuration
and complete testing for the Play/Pause, Next, and Previous buttons.

To run the tests:

```bash
# Clone the repository
git clone https://github.com/ctorgalson/bh-carousel.git
# Change directories
cd bh-carousel/
# Install npm dev packages
npm ci
# Run tests in the Cypress application
npm run test:ui
```
