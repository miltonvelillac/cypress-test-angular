export class SmartTablePage {
  static updateAgeByFirstName(name, age) {
    cy.get("tbody")
      .contains("tr", name)
      .then((row) => {
        cy.wrap(row).find(".nb-edit").click();
        cy.wrap(row).find('[placeholder="Age"]').clear().type(age);
        cy.wrap(row).find(".nb-checkmark").click();
        cy.wrap(row).find("td").eq(6).should("contain", age);
      });
  }

  static addNewRecordWithFirstAndLastName(firstName, lastName) {
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((row) => {
        cy.wrap(row).find('[placeholder="First Name"]').type(firstName);
        cy.wrap(row).find('[placeholder="Last Name"]').type(lastName);
        cy.wrap(row).find(".nb-checkmark").click();
      });

    cy.get("tbody tr")
      .first()
      .find("td")
      .then((columns) => {
        cy.wrap(columns).eq(2).should("contain", firstName);
        cy.wrap(columns).eq(3).should("contain", lastName);
      });
  }

  static deleteRowByIndex(index, alertMessage) {
    const stub = cy.stub();
    cy.on("window:confirm", stub);
    cy.get("tbody tr")
      .eq(index)
      .find(".nb-trash")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(alertMessage);
      });
  }
}
