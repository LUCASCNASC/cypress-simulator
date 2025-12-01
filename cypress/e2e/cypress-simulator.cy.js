describe('Cypress Simulator', () => {

  beforeEach(() => {

    cy.visit("./src/index.html?skipCaptcha=true", {
  onBeforeLoad(win) {
    win.localStorage.setItem("cookieConsent", "accepted")
  } //passar o Captcha=true e aceitar os cookies("cookieConsent", "accepted")
})
    cy.contains("button", "Login").click()

  })

  it.only('sucess', () => {
    
  })

  it('error: invalid cypress command', () => {
    
  })

  it('warning', () => {
    
  })

  it('error: valid command without parentheses', () => {
    
  })

  it('help', () => {
    
  })

  it('maximaze/minimize', () => {
    
  })

  it('logout', () => {
    
  })

  it('show and hide logout button', () => {
    
  })

  it('runnig ... state', () => {
    
  })

  it('accept cookies', () => {
    
  })

  it('decline cookies', () => {
    
  })

  it('captche button states', () => {
    
  })

  it('captche error', () => {
    
  })

  it('run button - enabled/disabled states', () => {
    
  })

  it('reset textarea on logout and login', () => {
    
  })

  it('disabled run button on logout and login', () => {
    
  })

  it('reset output on logout and login', () => {
    
  })

  it('no cookies banner in the login page', () => {
    
  })

})