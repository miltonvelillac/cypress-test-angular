import { FormLayoutsPage } from "../support/page-objects/form-page/form-layouts-page";
import { NavigationPage } from "../support/page-objects/navigation-page";

describe('Test with Page Objects', () => {
    it(`should submit Inline and Basic form and select tomorrow date in the calendar`, () => {
        NavigationPage.goToAppRoot();
        NavigationPage.goToForms.root();
        
        FormLayoutsPage
    })
});
