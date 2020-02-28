// describe("Login Tests", () => {
//   beforeEach(() => {
//     cy.clearCookies()
//     cy.visit("http://localhost:3000/")
//   })
//   it("Logs you into librarian page if you are a librarian", () => {
//     cy.contains("Login").click()

//     cy.get("[name=email]").type("katherine@katherine.com")
//     cy.get("[name=password]").type("123456")

//     cy.contains("Submit").click()

//     cy.url().should("include", "/librarian")
//     cy.getCookie("token").should("exist")
//   })
//   it("Logs you into user page if you are a user", () => {
//     cy.contains("Login").click()

//     cy.get("[name=email]").type("amber@amber.com")
//     cy.get("[name=password]").type("123456")

//     cy.contains("Submit").click()

//     cy.url().should("include", "/userhome")
//     cy.getCookie("token").should("exist")
//   })
//   it("Rejects users not in database", () => {
//     cy.exec("cd ../server && yarn db:ras")
//     cy.contains("Login").click()

//     cy.get("[name=email]").type("bob@bob.com")
//     cy.get("[name=password]").type("123456")

//     cy.contains("Submit").click()
//     cy.get("[data-cy=loginresult]").should(
//       "have.text",
//       "Email or Password is incorrect. Please Contact Katherine MCT for further assistance"
//     )
//   })
//   it("Rejects login for incorrect password", () => {
//     cy.contains("Login").click()

//     cy.get("[name=email]").type("amber@amber.com")
//     cy.get("[name=password]").type("09876554")

//     cy.contains("Submit").click()
//     cy.get("[data-cy=loginresult]").should(
//       "have.text",
//       "Email or Password is incorrect. Please Contact Katherine MCT for further assistance"
//     )
//   })
// })

// describe("Signup Tests", () => {
//   beforeEach(() => {
//     cy.clearCookies()
//     cy.exec("cd ../server && yarn db:ras")
//     cy.visit("http://localhost:3000/")
//   })
//   it("Signs up new user", () => {
//     cy.contains("SignUp").click()

//     cy.get("[name=name]").type("Mary")
//     cy.get("[name=email]").type("mary@mary.com")
//     cy.get("[name=password]").type("123456")
//     cy.get("[name=address]").type("1600 Penn")
//     cy.get("[name=library_id]").type("1")

//     cy.contains("Submit").click()

//     cy.get("[data-cy=result]").should("have.text", "Mary has been signed up")
//   })
//   it("Rejects duplicate emails", () => {
//     cy.contains("SignUp").click()
//     //do not run test on user created with tests bc tests should not be dependent on each other
//     cy.get("[name=name]").type("Amber")
//     cy.get("[name=email]").type("amber@amber.com")
//     cy.get("[name=password]").type("123456")
//     cy.get("[name=library_id]").type("1")

//     cy.contains("Submit").click()
//     //use exact result expected in your assert statement so it confirms you are hitting the correct error
//     cy.get("[data-cy=result]").should(
//       "have.text",
//       "Something went wrong: Something Broke Mothafucka"
//     )
//   })
// })

describe("Checks to see if Special button is pointing to the right external link", () => {
  it("verifies external link exists", () => {
    cy.visit("http://localhost:3000/")
    cy.get(
      'a[href*="https://www.timeanddate.com/countdown/party?iso=20200322T00&p0=250&msg=Kath%27s+Big+Day&ud=1&font=cursive&csz=1"]'
    ).should("exist")
  })
})

describe("Verifies whether ban user function works", () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit("http://localhost:3000/")
  })

  it("verifies whether or not the ban user function is working", () => {
    //Login code
    cy.exec("cd ../server && yarn db:ras")
    cy.contains("Login").click()
    cy.get("[name=email]").type("katherine@katherine.com")
    cy.get("[name=password]").type("123456")
    cy.contains("Submit").click()
    //Banuser testing
    cy.url().should("include", "/librarian")
    cy.getCookie("token").should("exist")
    cy.get("[name=banid]").type("2")
    cy.contains("Ban!").click()
    cy.get("[data-cy=banresults]").should(
      "have.text",
      "Sean Li has been banned"
    )
  })

  it("verifies that banned users cannot login", () => {
    cy.contains("Login").click()
    cy.get("[name=email]").type("sean@sean.com")
    cy.get("[name=password]").type("123456")
    cy.contains("Submit").click()
    cy.get("[data-cy=loginresult]").should(
      "have.text",
      "Email or Password is incorrect. Please Contact Katherine MCT for further assistance"
    )
  })

  it("verifies whether or not the unban user function is working", () => {
    //Login code
    cy.contains("Login").click()
    cy.get("[name=email]").type("katherine@katherine.com")
    cy.get("[name=password]").type("123456")
    cy.contains("Submit").click()
    //unbanuser testing
    cy.url().should("include", "/librarian")
    cy.getCookie("token").should("exist")
    cy.get("[name=banid]").type("2")
    cy.contains("Ban!").click()
    cy.get("[data-cy=banresults]").should(
      "have.text",
      "Sean Li has been unbanned"
    )
  })
  it("verifies that unbanned users can login again", () => {
    cy.contains("Login").click()
    cy.get("[name=email]").type("sean@sean.com")
    cy.get("[name=password]").type("123456")
    cy.contains("Submit").click()
    cy.url().should("include", "/userhome")
  })
})
