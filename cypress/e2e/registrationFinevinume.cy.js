//const { get } = require("cypress/types/lodash");

function registrationForm() {
  const email = randomEmail();
  const name = randomName();
  const password = randomPassword();
  const comment = randomComment();
  cy.contains("Registration").click({ force: true });
  cy.wait(1000);
  cy.get(
    'div.container.v-modal__container input[placeholder="Your email"]'
  ).type(email);
  cy.get(
    'div.v-input-button.the-modal-auth-register__checkbox input[type="checkbox"]'
  ).click();
  cy.contains("Continue").click({ force: true });
  cy.get(
    'div.v-input.input.the-modal-auth__input input[placeholder="Username"]'
  ).type(name);
  cy.get('div.v-input.input.the-modal-auth__input input[type="password"]').type(
    password
  );
  cy.contains("Continue").click({ force: true });
  cy.wait(1000);
  cy.contains("close").click({ force: true });
  cy.get('div.v-modal-lightbox__main button[type="button"]').click({
    force: true,
  });
  return {
    name: name,
    password: password,
    email: email,
    comment: comment,
  };
}

function LoginForm({ password, email }) {
  cy.contains(" Login ").click({ force: true });
  cy.get('input[placeholder="Username or Email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.contains("Continue").click({ force: true });
  cy.wait(1000);
}

function EditForm({ name, comment }) {
  cy.contains("Welcome").click({ force: true });
  cy.wait(1000);
  cy.contains("Edit profile").click({ force: true });
  cy.wait(1000);
  cy.get('input[name="gender"]').check("Female");
  cy.get('input[placeholder="Firstname"]').type(name);
  cy.get('input[placeholder="Lastname"]').type(name);
  cy.get('textarea[placeholder="Info about shop"]').type(comment);
  cy.get("#country").select("Germany");
  cy.get("#country").should("have.value", "Germany");
  cy.get('input[type="checkbox"]').check().should("be.checked");
  cy.contains("Send").click();
  //close the form
  cy.get("div.v-modal.profile-modal svg.v-modal-lightbox__cross").click();
  cy.get("div > span.the-header-profile__greeting")
    .should("contain", "Welcome")
    .and("contain", name);
}

function searchExistingProduct(product) {
  cy.log("perfom search");
  cy.contains("Categories").click();
  cy.get('div.v-breadcrumbs-search input[placeholder = "Search"]').type(
    product
  );
}

function searchProductInCatalog(productName) {
  cy.log("searchproduct in catalog");
  cy.contains(productName).click();
  wait(1000);
  cy.get(".product__info-main").should("contain", productName);
}

it("Fill login form Finebinume", () => {
  cy.visit("http://finevinume.com/");
  const regData = registrationForm();
  LoginForm(regData);
  cy.wait(1000);
  EditForm(regData);
  it("Search product via Search", () => {
    cy.visit("http://finevinume.com/categories");
    searchExistingProduct("Vella Schuster");
    cy.get(".v-product-card").should("contain", "Vella Schuster");
  });
});

it("Place order via Product Search into Shopinglist", () => {
  cy.visit("http://finevinume.com/categories");
  searchExistingProduct("Vella Schuster");
  cy.get(".v-product-card").click();
  cy.contains("+ add to shoplink").click();
  cy.wait(1000);
  cy.contains("Welcome").trigger("mouseover");
  cy.contains("Shoplink").click();
  cy.get("div.v-profile-catalog-product").should("contain", "Vella Schuster");
});

it("Place order via Product Search into Collection", () => {
  cy.visit("http://finevinume.com/categories");
  searchExistingProduct("Vella Schuster");
  cy.get(".v-product-card").click();
  cy.contains("Save").click();
  cy.wait(1000);
  cy.contains("Welcome").trigger("mouseover");
  cy.contains("Collection").click();
  cy.get("div.v-profile-catalog-product").should("contain", "Vella Schuster");
});


