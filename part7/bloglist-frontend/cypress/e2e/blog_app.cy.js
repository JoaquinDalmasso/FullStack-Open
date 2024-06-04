describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Joaquin",
      username: "Joaquin",
      password: "joaco",
    };
    const user2 = {
      name: "Segundo",
      username: "Segundo",
      password: "segundo",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.request("POST", "http://localhost:3003/api/users/", user2);
    cy.visit("http://localhost:5173");
    cy.login({ username: "Segundo", password: "segundo" });
    cy.createBlog({
      title: "blog de segundo",
      author: "Segundo",
      url: ".com.ar",
    });
    cy.get("#logout-button").click();
  });

  it("Login form is shown", function () {
    cy.visit("http://localhost:5173");
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("Joaquin");
      cy.get("#password").type("joaco");
      cy.get("#login-button").click();
      cy.contains("Joaquin logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("Joaquin");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.get("#error").contains("Wrong username");
      cy.get("#error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("Joaquin");
      cy.get("#password").type("joaco");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.contains("Add blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("Cypress");
      cy.get("#url").type(".com");
      cy.get("#create-button").click();
      cy.contains("a new blog");
    });
  });

  describe("When logged in and create a blog", function () {
    beforeEach(function () {
      cy.login({ username: "Joaquin", password: "joaco" });
      cy.createBlog({
        title: "a blog created by cypress",
        author: "Cypress",
        url: ".com",
      });
    });

    it("Like a blog", function () {
      // Encuentra el elemento que contiene el título del blog y haga clic en "view"
      cy.contains("a blog created by cypress")
        .parent() // Navegar al elemento padre <li>
        .as("blogEntry") // Guardar el elemento <li> como un alias 'blogEntry'
        .contains("view")
        .click();
      // Dentro del blog, encontrar el botón "like" y hacer clic en él
      cy.get("@blogEntry").find("#like-button").click();
    });

    it("Remove a blog", function () {
      cy.contains("a blog created by cypress")
        .parent() // Navegar al elemento padre <li>
        .as("blogEntry") // Guardar el elemento <li> como un alias 'blogEntry'
        .contains("view")
        .click();
      cy.get("@blogEntry").find("#remove-button").click();
      cy.get("#success").contains("Blog removed");
    });

    it("Cant remove a blog", function () {
      cy.contains("blog de segundo")
        .parent() // Navegar al elemento padre <li>
        .as("blogEntry") // Guardar el elemento <li> como un alias 'blogEntry'
        .contains("view")
        .click();
      cy.get("@blogEntry").find("#remove-button").click();
      cy.get("#success").contains("You cant remove this blog");
    });
  });

  describe("Ordered by likes", function () {
    beforeEach(function () {
      cy.login({ username: "Joaquin", password: "joaco" });
      cy.createBlog({
        title: "a blog created by cypress",
        author: "Cypress",
        url: ".com",
      });
    });
    it("they are ordered by number of likes", function () {
      cy.contains("blog de segundo").contains("view").click();
      cy.contains("a blog created by cypress")
        .parent() // Navegar al elemento padre <li>
        .as("blogEntry") // Guardar el elemento <li> como un alias 'blogEntry'
        .contains("view")
        .click();
      cy.get("@blogEntry").find("#like-button").click();
      cy.get("@blogEntry").find("#like-button").click();
      cy.get(".blogVisible")
        .eq(0)
        .should("contain", "a blog created by cypress");
      cy.get(".blogVisible").eq(1).should("contain", "blog de segundo");
    });
  });
});
