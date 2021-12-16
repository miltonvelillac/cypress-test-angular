/// <reference types="cypress" />

const { equal } = require("assert");
const { NavigationPage } = require("../support/page-objects/navigation-page");

describe("Forms", () => {
  beforeEach(() => {
    cy.openHomePage();
  });
  describe("#Form Layouts", () => {
    beforeEach(() => {
      NavigationPage.goToForms.goToFormLayoutPage();
    });

    it("first test", () => {
      // by tag name
      cy.get("input");

      // by id
      cy.get("#inputEmail1");

      // by class name
      cy.get(".input-full-width");

      // by attribute name
      cy.get("[placeholder]");

      // by attribute name and value
      cy.get('[placeholder="Email"]');

      // by class value (the difference between class name is that here the whole value should match, not only one class but with the class name it is enough only with one class)
      cy.get('[class="input-full-width size-medium shape-rectangle"]');

      // by tag name and attribute with value
      cy.get('input[placeholder="Email"]');

      // by two different attributes
      cy.get('[placeholder="Email"][type="email"]');

      // by tag name, attribut with value, ID and Class name
      cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

      // The most recommended way by Cypress (create your own testing attributes)
      cy.get('[data-cy="imputEmail1"]');
    });

    it("second test", () => {
      cy.get('[data-cy="singnInButton"]');
      cy.contains("Sign in");
      cy.contains('[status="warning"]', "Sign in");

      // find can only be use to get the child elements inside in a parent element, so it is necessary to get the parent first, i.e. using parents(....)
      cy.get("#inputEmail3")
        .parents("form")
        .find("button")
        .should("contain", "Sign in")
        .parents("form")
        .find("nb-checkbox")
        .click();
      cy.contains("nb-card", "Horizontal form").find('[type="email"]');
    });

    it("then and wrap methods", async () => {
      cy.contains("nb-card", "Using the Grid")
        .find('[for="inputEmail1"]')
        .should("contain", "Email");
      cy.contains("nb-card", "Using the Grid")
        .find('[for="inputPassword2"]')
        .should("contain", "Password");

      cy.contains("nb-card", "Basic form")
        .find('[for="exampleInputEmail1"]')
        .should("contain", "Email address");
      cy.contains("nb-card", "Basic form")
        .find('[for="exampleInputPassword1"]')
        .should("contain", "Password");

      // selenium style
      // this doesn't work correctly because with cypress we cannot save the context in a variable 'cause cypress runs asyncronous
      // const firstForm = cy.contains('nb-card', 'Using the Grid');
      // const secondForm = cy.contains('nb-card', 'Basic form');

      // firstForm.find('[for="inputEmail1"]');
      // firstForm.find('[for="inputPassword2"]');

      // secondForm.find('[for="exampleInputEmail1"]');
      // secondForm.find('[for="exampleInputPassword1"]');

      // cypress style
      cy.contains("nb-card", "Using the Grid").then((firstForm) => {
        const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
        const passwordLabelFirst = firstForm
          .find('[for="inputPassword2"]')
          .text();
        expect(emailLabelFirst).to.equal("Email");
        expect(passwordLabelFirst).to.equal("Password");

        cy.contains("nb-card", "Basic form").then((secondForm) => {
          const passwordSecond = secondForm
            .find('[for="exampleInputPassword1"]')
            .text();
          expect(passwordSecond).to.equal(passwordLabelFirst);
        });
      });
    });

    it("invoke command", () => {
      //1
      cy.get('[for="exampleInputEmail1"]')
        .should("contain", "Email address")
        .should("have.class", "label")
        .should("have.text", "Email address");

      //2
      cy.get('[for="exampleInputEmail1"]').then((label) => {
        expect(label.text()).to.equal("Email address");
        expect(label).to.have.class("label");
        expect(label).to.have.text("Email address");
      });

      //3
      cy.get('[for="exampleInputEmail1"]')
        .invoke("text")
        .then((text) => {
          expect(text).to.equal("Email address");
        });

      cy.contains("nb-card", "Basic form")
        .find("nb-checkbox")
        .click()
        .find(".custom-checkbox")
        .invoke("attr", "class")
        // .should('contain', 'check');
        .then((classValue) => {
          expect(classValue).to.contain("check");
        });
    });

    it("radio button", () => {
      cy.contains("nb-card", "Using the Grid")
        .find('[type="radio"]')
        .then((radioButtons) => {
          cy.wrap(radioButtons)
            .first() // or eq(0)
            .check({ force: true })
            .should("be.checked");

          cy.wrap(radioButtons).eq(1).check({ force: true });

          cy.wrap(radioButtons).first().should("not.be.checked");

          cy.wrap(radioButtons).eq(2).should("be.disabled");
        });
    });
  });

  describe("#Datepicker", () => {
    beforeEach(() => {
      NavigationPage.goToForms.goToDatePicker();
    });

    it("assert property", () => {
      const currentYear = new Date().getFullYear();
      cy.contains("nb-card", "Common Datepicker")
        .find("input")
        .then((input) => {
          cy.wrap(input).click();

          cy.get("nb-calendar-navigation").find("button").click();
          cy.get("nb-calendar-year-picker").contains(currentYear).click();
          cy.get("nb-calendar-month-picker").contains("Dec").click();
          cy.get("nb-calendar-day-picker").contains("17").click();
          cy.wrap(input)
            .invoke("prop", "value")
            .should("contain", `Dec 17, ${currentYear}`);
        });
    });

    it("second date test", () => {
      const date = new Date();
      date.setDate(date.getDate() + 90);
      const futureDay = date.getDate();
      const futureMonth = date.toLocaleString("default", { month: "short" });
      const dateAssert = `${futureMonth} ${futureDay}, ${date.getFullYear()}`;

      cy.contains("nb-card", "Common Datepicker")
        .find("input")
        .then((input) => {
          cy.wrap(input).click();
          selectDayFromCurrent();
          function selectDayFromCurrent() {
            cy.get("nb-calendar-navigation")
              .invoke("attr", "ng-reflect-date")
              .then((dateAttribute) => {
                if (!dateAttribute.includes(futureMonth)) {
                  cy.get('[data-name="chevron-right"]').click();
                  selectDayFromCurrent();
                } else {
                  cy.get(
                    'nb-calendar-day-picker [class="day-cell ng-star-inserted"]'
                  )
                    .contains(futureDay)
                    .click();
                }
              });
          }
          cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
          cy.wrap(input).should("have.value", dateAssert);
        });
    });
  });
});

describe("Modal & Overlays", () => {
  beforeEach(() => {
    cy.openHomePage();
  });

  describe("#Toastr", () => {
    beforeEach(() => {
      NavigationPage.goToModalsOverlays.goToToastr();
    });

    it("check boxes", () => {
      // the check method only will check the elements even it they were selected, this method will not uncheck if the method was previous selected
      // cy.get('[type="checkbox"]').check({force: true});

      // If we want a more real behavior we should use click method per element
      cy.get('[type="checkbox"]').eq(0).click({ force: true });
      cy.get('[type="checkbox"]').eq(1).click({ force: true });
      cy.get('[type="checkbox"]').eq(2).click({ force: true });
    });
  });

  describe("#Tooltip", () => {
    beforeEach(() => {
      NavigationPage.goToModalsOverlays.goToTooltip();
    });

    it("tooltip", () => {
      cy.contains("nb-card", "Colored Tooltips").contains("Default").click();
      cy.get("nb-tooltip").should("contain", "This is a tooltip");
    });
  });
});

describe("#Root", () => {
  beforeEach(() => {
    cy.openHomePage();
  });

  it("lists and dropdowns", () => {
    //1
    // cy.get('nav nb-select').click();
    // cy.get('.options-list').contains('Dark').click();
    // cy.get('nav nb-select').should('contain', 'Dark');
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)');

    //2
    const colors = {
      Light: "rgb(255, 255, 255)",
      Dark: "rgb(34, 43, 69)",
      Cosmic: "rgb(50, 50, 89)",
      Corporate: "rgb(255, 255, 255)",
    };

    cy.get("nav nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".options-list nb-option").each((listItem, index, array) => {
        const itemText = listItem.text().trim();
        cy.wrap(listItem).click();
        cy.wrap(dropdown).should("contain", itemText);
        cy.get("nb-layout-header nav").should(
          "have.css",
          "background-color",
          colors[itemText]
        );

        if (index < array.length - 1) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });
});

describe("#Tables", () => {
  beforeEach(() => {
    cy.openHomePage();
  });

  describe("#Smart Table", () => {
    beforeEach(() => {
      NavigationPage.goToTableAndData.goToSmartTable();
    });

    it("Edit", () => {
      cy.get("tbody")
        .contains("tr", "Larry")
        .then((row) => {
          cy.wrap(row).find(".nb-edit").click();
          cy.wrap(row).find('[placeholder="Age"]').clear().type("25");
          cy.wrap(row).find(".nb-checkmark").click();
          cy.wrap(row).find("td").eq(6).should("contain", "25");
        });
    });

    it("Add", () => {
      cy.get("thead").find(".nb-plus").click();
      cy.get("thead")
        .find("tr")
        .eq(2)
        .then((row) => {
          cy.wrap(row).find('[placeholder="First Name"]').type("Artem");
          cy.wrap(row).find('[placeholder="Last Name"]').type("Bondar");
          cy.wrap(row).find(".nb-checkmark").click();
        });

      cy.get("tbody tr")
        .first()
        .find("td")
        .then((columns) => {
          cy.wrap(columns).eq(2).should("contain", "Artem");
          cy.wrap(columns).eq(3).should("contain", "Bondar");
        });
    });

    it("Filter", () => {
      const ages = [20, 30, 40, 200];
      cy.wrap(ages).each((age) => {
        cy.get('thead [placeholder="Age"]').clear().type(age);
        cy.wait(500);
        cy.get("tbody tr").each((row) => {
          if (age === 200) {
            cy.wrap(row).should("contain", "No data found");
          } else {
            cy.wrap(row).find("td").eq(6).should("contain", age);
          }
        });
      });
    });

    it("dialog box", () => {
      //NOTE: cypress automatically confirm the window dialog message

      const alertMessage = "Are you sure you want to delete?";

      //1: not recomended because the expect is executed if cypress detect a window:confirm event, if this event is not dispatched the expect won't executed
      // cy.get('tbody tr').first().find('.nb-trash').click();
      // cy.on('window:confirm', (confirm) => {
      //     expect(confirm).to.equal(alertMessage);
      // });

      //2 this is better than the above solution because if the application doesn't execute the dialog the test will fail
      const stub = cy.stub();
      cy.on("window:confirm", stub);
      cy.get("tbody tr")
        .first()
        .find(".nb-trash")
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(alertMessage);
        });

      //3 to cancel the dialog message
      // cy.get('tbody tr').first().find('.nb-trash').click();
      // cy.on('window:confirm', () => false);
    });
  });
});
