export class FormLayoutsPage {
    static submitInLineFormWithNameAndEmail(name, email, check) {
        cy.contains('nb-card', 'Inline form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(name);
            cy.wrap(form).find('[placeholder="Email"]').type(email);
            cy.wrap(form).find('[type="checkbox"]').check({force: check});
            cy.wrap(form).submit();
        });
    }

    static submitBasicFormWithEmailAndPassword(email, password, check) {
        cy.contains('nb-card', 'Basic form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email);
            cy.wrap(form).find('[placeholder="Password"]').type(password);
            cy.wrap(form).find('[type="checkbox"]').check({force: check});
            cy.wrap(form).submit();
        });
    }
}