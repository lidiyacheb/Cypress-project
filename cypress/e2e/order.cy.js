function searchExistingProduct(product) {
  cy.log("perfom search");
  cy.get(input[(placeholder = "Search")]).type(product);
}

function searchProductInCatalog(productName) {
  cy.log("searchproduct in catalog");
  cy.contains(productName).click();
  wait(1000);
  cy.get(".product__info-main").should("contain", productName);
}

function addReview(comment) {
  cy.log("add a review");
  cy.contains("Add a review").click();
  wait(1000);
  cy.get('.v-modal-lightbox__main input[type="text"]').type("100");
  cy.get('textarea[placeholder="Write something what you want ..."]').type(
    comment
  );
  cy.contains("Enter").click();
  wait(1000);
}

function randomComment() {
  const givenSet = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 50; i++) {
    let pos = Math.floor(Math.random() * givenSet.length);
    code += givenSet[pos];
  }
  return code;
}

it("Search product via Search", () => {
  cy.visit("/");
  searchExistingProduct("Vella Schuster");
  cy.get(".v-product-card").should("contain", "Vella Schuster");
});

it("Place order via Product Search into Shopinglist", () => {
  cy.visit("/");
  searchExistingProduct("Vella Schuster");
  cy.get(".v-product-card").click();
  cy.contains("+ add to shoplink").click();
  cy.wait(1000);
  cy.contains("Welcome").trigger("mouseover");
  cy.contains("Shoplink").click();
  cy.get("div.v-profile-catalog-product").should("contain", "Vella Schuster");
});

it("Place order via Product Search into Collection", () => {
  cy.visit("/");
  searchExistingProduct("Vella Schuster");
  cy.get(".v-product-card").click();
  cy.contains("Save").click();
  cy.wait(1000);
  cy.contains("Welcome").trigger("mouseover");
  cy.contains("Collection").click();
  cy.get("div.v-profile-catalog-product").should("contain", "Vella Schuster");
});

it("Add order via into Wishlist", () => {
  cy.visit("/");
  searchExistingProduct("Vella Schuster");
  cy.get(".v-product-card").click();
  cy.contains("+ Add to Wish List").click();
  cy.wait(1000);
  cy.contains("Welcome").trigger("mouseover");
  cy.contains("Wishlist").click();
  cy.get("div.v-profile-catalog-product").should("contain", "Vella Schuster");
});

it("Add Review", () => {
  const newComment = randomComment();
  cy.visit("/");
  addReview(newComment);
  cy.get(".v-product-review p").should("not.be.empty");
  cy.get(".v-product-review p").should("contain.text", newComment);
});
