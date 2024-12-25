describe("Defaults: slideshow plays automatically", () => {
  it("Play/Pause button has data-bhc-playing attr set to 'true'", () => {
    cy.visit("/");
    cy.get("[data-bhc-play-pause]").should(
      "have.attr",
      "data-bhc-playing",
      "true",
    );
  });

  it("first slide's aria-hidden attr changes to 'true'", () => {
    cy.visit("/");
    cy.get("[aria-roledescription='slide']:first-child").should(
      "have.attr",
      "aria-hidden",
      "true",
    );
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

