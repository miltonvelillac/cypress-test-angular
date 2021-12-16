export class NavigationPage {
    static goToAppRoot() {
        cy.visit("/");
    }

    static goToForms = {
        root() {
            cy.contains("Forms").click();
        },   
        goToFormLayoutPage() {
            cy.contains("Form Layouts").click();
        },
        goToDatePicker() {
            cy.contains("Datepicker").click();
        }      
    }

    static goToModalsOverlays = {
        root() {
            cy.contains("Modal & Overlays").click();
        },
        goToToastr() {
            cy.contains("Toastr").click();
        },
        goToTooltip() {
            cy.contains("Tooltip").click();
        }
    }

    static goToTableAndData = {
        root() {
            cy.contains("Tables & Data").click();
        },
        goToSmartTable() {
            cy.contains("Smart Table").click();
        }
    }

}