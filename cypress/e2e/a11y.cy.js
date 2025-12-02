describe("Cypress Simulator - A11y Checks", () => {
  beforeEach(() => {
    cy.visit("./src/index.html?skipCaptcha=true", {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted")
      }
    })
    cy.contains("button", "Login").click()
    cy.injectAxe()
  })

  it("sucessfully simulates a Cypress command (e.g., cy.log('Yay!'))", () => {
    
    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("cy.log('Yay!')")
    cy.contains("button", "Run").click()

    cy.get('#outputArea', { timeout: 10000 })
      .should("contain", "Success:")
      .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
      .and("be.visible")
  })

  it("shows an error whrn entering and running an invalid Cypress command (e.g., cy.run())", () => {

    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("cy.run()")
    cy.contains("button", "Run").click()

    cy.get('#outputArea', { timeout: 10000 })
      .should("contain", "Error:")
      .and("contain", "Invalid Cypress command: cy.run()")
      .and("be.visible")
    
  })

  it("it shows a warning when entering and running a not-implemented Cypress command (e.g., cy.contains('Login'))", () => {

    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("cy.contains('Login')")
    cy.contains("button", "Run").click()

    cy.get('#outputArea', { timeout: 10000 })
      .should("contain", "Warning:")
      .and("contain", "The `cy.contains` command has not been implemented yet.")
      .and("be.visible")
    
  })

  it("it shows an error when entering and running a valid Cypress command (e.g., cy.visit)", () => {

    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("cy.visit")
    cy.contains("button", "Run").click()

    cy.get('#outputArea', { timeout: 10000 })
      .should("contain", "Error:")
      .and("contain", "Missing parentheses on `cy.visit` command")
      .and("be.visible")
    
  })

  it("it maximizes and minimizes a simulation result.", () => {

    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("cy.log('Yay!')")
    cy.contains("button", "Run").click()

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