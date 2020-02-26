describe("Login Tests", () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit("http://localhost:3000/")
  })
  it("Logs you into librarian page if you are a librarian", () => {
    cy.contains("Login").click()

    cy.get("[name=email]").type("sean@sean.com")
    cy.get("[name=password]").type("123456")

    cy.contains("Submit").click()

    cy.url().should("include", "/librarian")
    cy.getCookie("token").should("exist")
  })
})
