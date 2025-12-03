describe("Cypress Simulator - A11y Checks", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("./src/index.html?skipCaptcha=true?chancesOfError=0", {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted")
      }
    })
    cy.injectAxe()
  })

  it("sucessfully simulates a Cypress command (e.g., cy.log('Yay!'))", () => {
    
    cy.run("cy.log('Yay!')")

    cy.get('#outputArea', { timeout: 10000 })
      .should("contain", "Success:")
      .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
      .and("be.visible")

      cy.checkA11y(".success")
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

    cy.checkA11y(".warning")
    
  })

  it("it shows an error when entering and running a valid Cypress command (e.g., cy.visit)", () => {

    cy.run("cy.visit")

    cy.get('#outputArea', { timeout: 10000 })
      .should("contain", "Error:")
      .and("contain", "Missing parentheses on `cy.visit` command")
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

    cy.checkA11y()

    cy.get('.expand-collapse').click()

    cy.get('.expand-collapse')
      .should("be.visible")

    cy.checkA11y(".success")
    
  })
})

describe("Cypress Simulator - Captcha", () => {
  beforeEach(() => {
    cy.visit("./src/index.html?chancesOfError=0")
    cy.contains("button", "Login").click()
    cy.injectAxe()
  })

  it("finds no a11y issues on all captcha view states (button enabled/disabled and error)", () => {
   
    cy.contains("button", "Verify").should("be.disabled")

    cy.get("input[placeholder='Enter your answer']").type("1000")
    
    cy.contains("button", "Verify").should("be.enabled")

    cy.checkA11y()

    cy.contains("button", "Verify").click()

    cy.contains(".error", "Incorrect answer, please try again")
      .should("be.visible")

    cy.get("input[placeholder='Enter your answer']")
      .should("have.value", "")
    cy.contains("button", "Verify").should("be.disabled")

    cy.get("input[placeholder='Enter your answer']").clear()

    cy.contains("button", "Verify").should("be.disabled")

    cy.checkA11y()

  })

})