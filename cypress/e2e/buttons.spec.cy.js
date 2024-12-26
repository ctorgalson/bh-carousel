describe("Slideshow pauses when Play/Pause button clicked", () => {
  it("Play/Pause button's data-bhc-playing attr changes to 'false'", () => {
    cy.visit("/");
    cy.get("[data-bhc-play-pause]")
      .click()
      .should("have.attr", "data-bhc-playing", "false");
  });

  it("first slide's aria-hidden attr does not change to 'true'", () => {
    cy.visit("/");
    cy.get("[data-bhc-play-pause]")
      .click()
      .get("[aria-roledescription='slide']:first-child")
      .should("have.attr", "aria-hidden", "false");
  });

  it("Previous button is not disabled", () => {
    cy.visit("/");
    cy.get("[data-bhc-play-pause]")
      .click()
      .get("[data-bhc-previous]")
      .should("not.have.attr", "disabled");
  });

  it("Next button is not disabled", () => {
    cy.visit("/");
    cy.get("[data-bhc-play-pause]")
      .click()
      .get("[data-bhc-previous]")
      .should("not.have.attr", "disabled");
  });
});

describe("Slideshow resumes when Play/Pause button clicked", () => {
  it("slideshow's data-bhc-playing attr changes to 'true'", () => {
    cy.visit("/");
    cy.get("[data-bhc-play-pause]")
      .click()
      .click()
      .get("[data-bhc-play-pause]")
      .should("have.attr", "data-bhc-playing", "true");
  });

  it("first slide's aria-hidden attr changes to 'true'", () => {
    cy.visit("/");
    cy.get("[data-bhc-play-pause]")
      .click()
      .click()
      .get("[aria-roledescription='slide']:first-child")
      .should("have.attr", "aria-hidden", "true");
  });

  it("Previous button is disabled", () => {
    cy.visit("/");
    cy.get("[data-bhc-play-pause]")
      .click()
      .click()
      .get("[data-bhc-previous]")
      .should("have.attr", "disabled");
  });

  it("Next button is disabled", () => {
    cy.visit("/");
    cy.get("[data-bhc-play-pause]")
      .click()
      .click()
      .get("[data-bhc-previous]")
      .should("have.attr", "disabled");
  });
});

describe("Slideshow goes forward when Next button clicked", () => {
  it("Slides 1 & 2 change aria-hidden attr to 'true', 'false'", () => {
    cy.visit("/");
    cy.get("[data-bhc-play-pause]")
      .click()
      .get("[data-bhc-next]")
      .click()
      .get("[aria-roledescription='slide']:first-child")
      .should("have.attr", "aria-hidden", "true")
      .get("[aria-roledescription='slide']:nth-child(2)")
      .should("have.attr", "aria-hidden", "false");
  });
});

describe("Slideshow goes back when Previous button clicked", () => {
  it("Slides 1 & 2 change aria-hidden attr to 'false', 'true'", () => {
    cy.visit("/");
    cy.get("[data-bhc-play-pause]")
      .click()
      .get("[data-bhc-next]")
      .click()
      .get("[data-bhc-previous]")
      .click()
      .get("[aria-roledescription='slide']:first-child")
      .should("have.attr", "aria-hidden", "false")
      .get("[aria-roledescription='slide']:nth-child(2)")
      .should("have.attr", "aria-hidden", "true");
  });
});

describe("Slideshow goes to last slide from first on 'Previous' click", () => {
  it("Slides 1 & 5 change aria-hidden attr to 'true', 'false'", () => {
    cy.visit("/");
    cy.get("[data-bhc-play-pause]")
      .click()
      .get("[data-bhc-previous]")
      .click()
      .get("[aria-roledescription='slide']:first-child")
      .should("have.attr", "aria-hidden", "true")
      .get("[aria-roledescription='slide']:last-child")
      .should("have.attr", "aria-hidden", "false");
  });
});

describe("Slideshow goes to first slide from last on 'Next' click", () => {
  it("Slides 1 & 5 change aria-hidden attr to 'false', 'true'", () => {
    cy.visit("/");
    cy.get("[data-bhc-play-pause]")
      .click()
      .get("[data-bhc-previous]")
      .click()
      .get("[data-bhc-next]")
      .click()
      .get("[aria-roledescription='slide']:first-child")
      .should("have.attr", "aria-hidden", "false")
      .get("[aria-roledescription='slide']:last-child")
      .should("have.attr", "aria-hidden", "true");
  });
});
