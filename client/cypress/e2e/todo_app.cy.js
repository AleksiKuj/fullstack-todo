describe("Todo app", function () {
  const baseUrl = "http://localhost:3000"
  const apiBaseUrl = "http://localhost:3001/api"

  beforeEach(function () {
    cy.request("POST", `${apiBaseUrl}/testing/reset`)
    const user = {
      username: "test",
      password: "test",
    }
    cy.request("POST", `${apiBaseUrl}/users`, user)
    cy.visit(baseUrl)
  })
  describe("sign in page works correctly", function () {
    it("sign in page can be opened", function () {
      cy.visit(baseUrl)
      cy.contains("Sign in")
    })

    it("user can log in", function () {
      cy.visit(baseUrl)
      cy.get("#username").type("test")
      cy.get("#password").type("test")
      cy.get("#login-button").click()

      cy.contains("test's tasks")
    })

    it("login fails with incorrect credentials", function () {
      cy.get("#username").type("test")
      cy.get("#password").type("wrongpassword")
      cy.get("#login-button").click()
      cy.contains("Request failed with status code 401")

      cy.get(".notification").should(
        "contain",
        "Request failed with status code 401"
      )

      cy.get("html").should("not.contain", "test logged in")
    })
  })

  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.visit(baseUrl)
      cy.get("#username").type("test")
      cy.get("#password").type("test")
      cy.get("#login-button").click()
    })

    it("new task can be created", function () {
      cy.get("#visibility-toggle").click()
      cy.get("#title-input").type("test title")
      cy.get("#description-input").type("test description")
      cy.get("#todo-submit").click()
      cy.contains("Added test title")
    })

    describe("and a task exists", function () {
      beforeEach(function () {
        cy.get("#visibility-toggle").click()
        cy.get("#title-input").type("test title")
        cy.get("#description-input").type("test description")
        cy.get("#todo-submit").click()
      })
      it("it can be edited", function () {
        cy.get(".open-edit:first").click()
        cy.get("#update-title").type(" updated")
        cy.get("#update-description").type(" updated")
        cy.get("#update-submit").click()
        cy.contains("test title updated")
        cy.contains("test description updated")
      })

      it("it can be deleted", function () {
        cy.get(".open-delete:first").click()
        cy.get("#delete-button").click()
        cy.get("html").should("not.contain", "test title")
      })
    })
  })
})
