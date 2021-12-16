export class NavigationPage {
    static openMainMenuOption(menuOption) {
        cy.contains('a', menuOption).then(menu => {
            cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
                if(attr.includes('left')) {
                    cy.wrap(menu).click();
                }
            });
        });
    }

    static goToForms = {
        root() {
            NavigationPage.openMainMenuOption('Form');
        },   
        goToFormLayoutPage() {   
            NavigationPage.goToForms.root();         
            cy.contains("Form Layouts").click();
        },
        goToDatePicker() {
            NavigationPage.goToForms.root();
            cy.contains("Datepicker").click();
        }      
    }

    static goToModalsOverlays = {
        root() {
            NavigationPage.openMainMenuOption('Modal & Overlays');
        },
        goToToastr() {
            NavigationPage.goToModalsOverlays.root();
            cy.contains("Toastr").click();
        },
        goToTooltip() {
            NavigationPage.goToModalsOverlays.root();
            cy.contains("Tooltip").click();
        }
    }

    static goToTableAndData = {
        root() {
            NavigationPage.openMainMenuOption('Tables & Data');
        },
        goToSmartTable() {
            NavigationPage.goToTableAndData.root();
            cy.contains("Smart Table").click();
        }
    }

}