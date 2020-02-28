describe("Login Tests", () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit("http://localhost:3000/")
  })
  it("Logs you into librarian page if you are a librarian", () => {
    cy.contains("Login").click()

    cy.get("[name=email]").type("katherine@katherine.com")
    cy.get("[name=password]").type("123456")

    cy.contains("Submit").click()

    cy.url().should("include", "/librarian")
    cy.getCookie("token").should("exist")
  })
  it("Logs you into user page if you are a user", () => {
    cy.contains("Login").click()

    cy.get("[name=email]").type("amber@amber.com")
    cy.get("[name=password]").type("123456")

    cy.contains("Submit").click()

    cy.url().should("include", "/userhome")
    cy.getCookie("token").should("exist")
  })
  it("Rejects users not in database", () => {
    cy.exec("cd ../server && yarn db:ras")
    cy.contains("Login").click()

    cy.get("[name=email]").type("bob@bob.com")
    cy.get("[name=password]").type("123456")

    cy.contains("Submit").click()
    cy.get("[data-cy=loginresult]").should(
      "have.text",
      "Email or Password is incorrect. Please Contact Katherine MCT for further assistance"
    )
  })
  it("Rejects login for incorrect password", () => {
    cy.contains("Login").click()

    cy.get("[name=email]").type("amber@amber.com")
    cy.get("[name=password]").type("09876554")

    cy.contains("Submit").click()
    cy.get("[data-cy=loginresult]").should(
      "have.text",
      "Email or Password is incorrect. Please Contact Katherine MCT for further assistance"
    )
  })
})

describe("Signup Tests", () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.exec("cd ../server && yarn db:ras")
    cy.visit("http://localhost:3000/")
  })
  it("Signs up new user", () => {
    cy.contains("SignUp").click()

    cy.get("[name=name]").type("Mary")
    cy.get("[name=email]").type("mary@mary.com")
    cy.get("[name=password]").type("123456")
    cy.get("[name=address]").type("1600 Penn")
    cy.get("[name=library_id]").type("1")

    cy.contains("Submit").click()

    cy.get("[data-cy=result]").should("have.text", "Mary has been signed up")
  })
  it("Rejects duplicate emails", () => {
    cy.contains("SignUp").click()
    //do not run test on user created with tests bc tests should not be dependent on each other
    cy.get("[name=name]").type("Amber")
    cy.get("[name=email]").type("amber@amber.com")
    cy.get("[name=password]").type("123456")
    cy.get("[name=library_id]").type("1")

    cy.contains("Submit").click()
    //use exact result expected in your assert statement so it confirms you are hitting the correct error
    cy.get("[data-cy=result]").should(
      "have.text",
      "Something went wrong: Something Broke Mothafucka"
    )
  })
})
describe("Borrow and Return Book", () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit("http://localhost:3000/")
    cy.contains("Login").click()
    cy.get("[name=email]").type("amber@amber.com")
    cy.get("[name=password]").type("123456")
    cy.contains("Submit").click()
  })
  it("Borrows a book", () => {
    cy.exec("cd ../server && yarn db:ras")
    cy.url().should("include", "/userhome")
    cy.get("table")
      .contains("Borrow")
      .first()
      .click()
    cy.get("table>tr")
      .eq(1)
      .get("td")
      .eq(3)
      .should("contain", "Lent")
  })
  it("Returns a book", () => {
    cy.url().should("include", "/userhome")
    cy.get("table>tr")
      .last("tr>td")
      .first()
      .then($span => {
        const id = parseFloat($span.text())
        cy.get("[name=book_id]").type(id)
        cy.contains("Submit").click()
        cy.get("[data-cy=returnbook]").should("contain", "has been returned!")
      })
  })
})
