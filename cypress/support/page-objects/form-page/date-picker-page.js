function selectDayFromCurrent(date, futureMonth, futureDay) {
  cy.get("nb-calendar-navigation")
    .invoke("attr", "ng-reflect-date")
    .then((dateAttribute) => {
      if (!dateAttribute.includes(futureMonth)) {
        cy.get('[data-name="chevron-right"]').click();
        selectDayFromCurrent(date, futureMonth, futureDay);
      } else {
        cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
          .contains(futureDay)
          .click();
      }
    });
}

export class DatePickerPage {
  static selectCommonDatepickerDateFromToday(dayFromToday) {
    const date = new Date();
    date.setDate(date.getDate() + dayFromToday);
    const futureDay = date.getDate();
    const futureMonth = date.toLocaleString("default", { month: "short" });
    const dateAssert = `${futureMonth} ${futureDay}, ${date.getFullYear()}`;

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        selectDayFromCurrent(date, futureMonth, futureDay);
        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
        cy.wrap(input).should("have.value", dateAssert);
      });
  }
}
