//const { groupBy } = require("cypress/types/lodash");
import { randomData } from "../modules/modules.cy";

//set value fields
function svf(names, defValue, parents) {
  names.forEach((name) => {
    cy.get(`${parents} input[name="${name}"]`).type(defValue);
  });
}

it("Add Product", () => {
  const data = randomData({ typeData: "str", lengthData: 5 });
  cy.visit("https://app.finevinume.com");
  cy.get('input[name="email"]').type("info@finevinume.com");
  cy.get('input[name="password"]').type("fgh5bjh5%$");
  cy.get('input[name="remember"]').check();
  cy.get('button[type="Submit"]').click();
  cy.wait(2000);
  cy.get("a#toggle-btn").click();
  cy.contains("CRM").click();
  cy.contains("Товары").click();
  cy.contains("Добавить элемент ").click();
  cy.wait(1000);
  svf(
    [
      "name",
      "brand",
      "country",
      "classification",
      "region",
      "subregion",
      "wine_types",
      "strength",
      "volume",
    ],
    data,
    "#elements-modal-add"
  );
  cy.get('#elements-modal-add select[name="category_id"]').select(
    "Sweet wine",
    { force: true }
  );
  cy.contains("Сохранить").click();
  cy.wait(1000);
  cy.visit("https://finevinume.com");
  cy.log("search existing product");
  cy.contains("Categories").click();
  cy.get('div.v-breadcrumbs-search input[placeholder = "Search"]').type(
    "iWjZjjrhtn323"
  );
});
