// autoEnable

// automatic
describe("automatic=true: slideshow plays automatically", () => {
  it("Play/Pause button has data-bhc-playing attr set to 'true'", () => {
    cy.visit("/", { qs: { automatic: true } }); // Same as default.`
    cy.get("[data-bhc-play-pause]").should(
      "have.attr",
      "data-bhc-playing",
      "true",
    );
  });

  it("first slide's aria-hidden attr changes to 'true'", () => {
    cy.visit("/");
    cy.get("[aria-roledescription='slide']:first-child", {
      timeout: 6000,
    }).should("have.attr", "aria-hidden", "true");
  });

  it("Previous button is disabled", () => {
    cy.visit("/");
    cy.get("[data-bhc-previous]").should("have.attr", "disabled");
  });

  it("Next button is disabled", () => {
    cy.visit("/");
    cy.get("[data-bhc-previous]").should("have.attr", "disabled");
  });
});

describe("automatic=false: slideshow does not play automatically", () => {
  it("Play/Pause button has data-bhc-playing attr set to 'false'", () => {
    cy.visit("/", { qs: { automatic: false } }); // Same as default.`
    cy.get("[data-bhc-play-pause]").should(
      "have.attr",
      "data-bhc-playing",
      "false",
    );
  });

  it("first slide's aria-hidden attr does not change to 'true'", () => {
    cy.visit("/", { qs: { automatic: false } });
    cy.wait(6000);
    cy.get("[aria-roledescription='slide']:first-child")
      .should("have.attr", "aria-hidden", "false");
  });

  it("Previous button is not disabled", () => {
    cy.visit("/", { qs: { automatic: false } });
    cy.get("[data-bhc-previous]").should("not.have.attr", "disabled");
  });

  it("Next button is not disabled", () => {
    cy.visit("/", { qs: { automatic: false } });
    cy.get("[data-bhc-previous]").should("not.have.attr", "disabled");
  });
});

// controlType (not yet implemented in TS)

// interval
describe("interval=1000: slideshow pauses one second between slides", () => {
  it("first slide's aria-hidden is true after 1.1s", () => {
    cy.visit("/");
    cy.wait(1100);
    cy.get("[aria-roledescription='slide']:first-child")
      .should("have.attr", "aria-hidden", "true");
  });
});

// startingIndex
describe("startingIndex=2: slideshow starts at third slide", () => {
  it("third slide's aria-hidden is 'false'", () => {
    cy.visit("/", { qs: { automatic: false, startingIndex: 2 } });
    cy.get("[aria-roledescription='slide']:nth-child(3)")
      .should("have.attr", "aria-hidden", "false");
  });
});
