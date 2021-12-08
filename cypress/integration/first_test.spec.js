/// <reference types="cypress" />

describe('Our first suite', () => {
    it('first test', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        // by tag name
        cy.get('input');

        // by id
        cy.get('#inputEmail1');

        // by class name
        cy.get('.input-full-width');

        // by attribute name
        cy.get('[placeholder]')

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
});