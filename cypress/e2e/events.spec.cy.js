describe("Slideshow emits events on Play, Pause, Previous, and Next", () => {
  it("Pause button event detail contains {action: 'pause'}", () => {
    cy.visit("/");
    cy.document().invoke("addEventListener", "BhCarousel", cy.stub().as("pause"));
    cy.get("[data-bhc-play-pause]").click();
    cy.get("@pause")
      .should("have.been.calledOnce")
      .its("firstCall.args.0.detail")
      .should("deep.equal", {action: "pause"});
  });

  it("Play button event detail contains {action: 'play'}", () => {
    cy.visit("/", { qs: { automatic: false } });
    cy.document().invoke("addEventListener", "BhCarousel", cy.stub().as("play"));
    cy.get("[data-bhc-play-pause]").click();
    cy.get("@play")
      .should("have.been.calledOnce")
      .its("firstCall.args.0.detail")
      .should("deep.equal", {action: "play"});
  });

  it("Next button event detail contains {action: 'next', currentIndex: 1, previousIndex: 0}", () => {
    cy.visit("/", { qs: { automatic: false } });
    cy.document().invoke("addEventListener", "BhCarousel", cy.stub().as("next"));
    cy.get("[data-bhc-next]").click();
    cy.get("@next")
      .should("have.been.calledOnce")
      .its("firstCall.args.0.detail")
      .should("deep.equal", {action: "next", currentIndex: 1, previousIndex: 0});
  });

  it("Previous button event detail contains {action: 'previous', currentIndex: 1, previousIndex: 0}", () => {
    cy.visit("/", { qs: { automatic: false } });
    cy.document().invoke("addEventListener", "BhCarousel", cy.stub().as("previous"));
    cy.get("[data-bhc-previous]").click();
    cy.get("@previous")
      .should("have.been.calledOnce")
      .its("firstCall.args.0.detail")
      .should("deep.equal", {action: "previous", currentIndex: 4, previousIndex: 0});
  });
});

