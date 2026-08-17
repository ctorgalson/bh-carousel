export interface FixtureOptions {
  slideCount?: number;
  withPlayPauseButton?: boolean;
}

export function buildCarouselDom(options: FixtureOptions = {}): HTMLElement {
  const { slideCount = 5, withPlayPauseButton = true } = options;

  const container = document.createElement("div");
  container.setAttribute("aria-label", "Test carousel");
  container.setAttribute("aria-roledescription", "carousel");

  const controls = document.createElement("div");
  if (withPlayPauseButton) {
    const playPause = document.createElement("button");
    playPause.type = "button";
    playPause.setAttribute("data-bhc-play-pause", "");
    playPause.hidden = true;
    controls.appendChild(playPause);
  }

  const previous = document.createElement("button");
  previous.type = "button";
  previous.setAttribute("data-bhc-previous", "");
  previous.setAttribute("aria-label", "Previous slide");
  previous.hidden = true;
  controls.appendChild(previous);

  const next = document.createElement("button");
  next.type = "button";
  next.setAttribute("data-bhc-next", "");
  next.setAttribute("aria-label", "Next slide");
  next.hidden = true;
  controls.appendChild(next);

  container.appendChild(controls);

  const items = document.createElement("div");
  items.setAttribute("aria-live", "off");
  for (let i = 0; i < slideCount; i++) {
    const slide = document.createElement("div");
    slide.setAttribute("aria-label", `${i + 1} of ${slideCount}`);
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("role", "group");
    items.appendChild(slide);
  }
  container.appendChild(items);

  document.body.appendChild(container);
  return container;
}

export function stubMatchMedia(matches = false): void {
  window.matchMedia = ((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}
