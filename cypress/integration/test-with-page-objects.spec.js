import { DatePickerPage } from "../support/page-objects/form-page/date-picker-page";
import { FormLayoutsPage } from "../support/page-objects/form-page/form-layouts-page";
import { NavigationPage } from "../support/page-objects/navigation-page";
import { SmartTablePage } from "../support/page-objects/table/smart-table-page";

describe('Test with Page Objects', () => {
    beforeEach(() => {
        cy.openHomePage();
    });

    it(`should submit Inline and Basic form and select tomorrow date in the calendar`, () => {    
        NavigationPage.goToForms.goToFormLayoutPage();
        FormLayoutsPage.submitInLineFormWithNameAndEmail('Milton', 'milton@test.com', true);
        FormLayoutsPage.submitBasicFormWithEmailAndPassword('miton@test.com', 'fake123***', true);

        NavigationPage.goToForms.goToDatePicker();
        DatePickerPage.selectCommonDatepickerDateFromToday(9);

        NavigationPage.goToTableAndData.goToSmartTable();
        SmartTablePage.addNewRecordWithFirstAndLastName('Milton', 'Ve');
        SmartTablePage.updateAgeByFirstName('Milton', 90);
        SmartTablePage.deleteRowByIndex(0, "Are you sure you want to delete?");
    })
});
