describe("Something or other", () => {
  it("does a thing it should", () => {
    cy.visit("http://localhost:3000");
    cy.get('[aria-roledescription="carousel"]')
      .eq(0)
      .within(() => {
        cy.get('[data-bhc-play-pause]').should("have.attr", "data-bhc-playing");
      });
  });
});
