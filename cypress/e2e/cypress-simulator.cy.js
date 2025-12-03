describe('Cypress Simulator', () => {

  beforeEach(() => {

    cy.login()
    cy.visit("./src/index.html?skipCaptcha=true?chancesOfError=0", {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted")
      } //passar o Captcha=true e aceitar os cookies("cookieConsent", "accepted")
    })

  })

  it("sucessfully simulates a Cypress command (e.g., cy.log('Yay!'))", () => {
    
    cy.run("cy.log('Yay!')")

    cy.get('#outputArea', { timeout: 10000 })
      .should("contain", "Success:")
      .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
      .and("be.visible")
  })

  it("shows an error when entering and running an invalid Cypress command (e.g., cy.run())", () => {
    
    cy.run("cy.run()")

    cy.get('#outputArea', { timeout: 10000 })
      .should("contain", "Error:")
      .and("contain", "Invalid Cypress command: cy.run()")
      .and("be.visible")
    
  })

  it("it shows a warning when entering and running a not-implemented Cypress command (e.g., cy.contains('Login'))", () => {
    
    cy.run("cy.contains('Login')")

    cy.get('#outputArea', { timeout: 10000 })
      .should("contain", "Warning:")
      .and("contain", "The `cy.contains` command has not been implemented yet.")
      .and("be.visible")
    
  })

  it("it shows an error when entering and running a valid Cypress command (e.g., cy.visit)", () => {
    
    cy.run("cy.visit")

    cy.get('#outputArea', { timeout: 10000 })
      .should("contain", "Error:")
      .and("contain", "Missing parentheses on `cy.visit` command")
      .and("be.visible")
    
  })

  it('it asks for help and gets common Cypress commands and examples with a link to the docs', () => {
    
    cy.run("help")

    cy.get('#outputArea', { timeout: 10000 })
      .should("contain", "Common Cypress commands and examples:")
      .and("contain", "For more commands and details, visit the official Cypress API documentation.")
      .and("be.visible")

      cy.contains("#outputArea a", "official Cypress API documentation")
        .should("have.attr", "href", "https://docs.cypress.io/api/table-of-contents")
        .and("have.attr", "target", "_blank")
        .and("have.attr", "rel", "noopener noreferrer")
        .and("be.visible")
    
  })

  it("it maximizes and minimizes a simulation result.", () => {
    
    cy.run("cy.log('Yay!')")

    cy.get('.expand-collapse').click()

    cy.get('#outputArea', { timeout: 10000 })
    .should("contain", "Success:")
    .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
    .and("be.visible")

    cy.get("#collapseIcon")
      .should("be.visible")

    cy.get('.expand-collapse').click()

    cy.get('.expand-collapse')
      .should("be.visible")
    
  })

})