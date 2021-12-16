export class FormLayoutsPage {
    static submitInLineFormWithNameAndEmail(name, email, check) {
        cy.contains('nb-card', 'Inline form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Jane Done"]').type(name);
            cy.wrap(form).find('[placeholder="Email"]').type(email);
            cy.wrap(form).find('[type="checkbox"]').check({force: check});
            cy.wrap(form).submit();
        })
    }
}