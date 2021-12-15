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

    it('second test', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.get('[data-cy="singnInButton"]');
        cy.contains('Sign in');
        cy.contains('[status="warning"]','Sign in');

        // find can only be use to get the child elements inside in a parent element, so it is necessary to get the parent first, i.e. using parents(....)
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click();
        cy.contains('nb-card', 'Horizontal form').find('[type="email"]');
    });

    it('then and wrap methods', async () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');

        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address');
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password');

        // selenium style
        // this doesn't work correctly because with cypress we cannot save the context in a variable 'cause cypress runs asyncronous
        // const firstForm = cy.contains('nb-card', 'Using the Grid');
        // const secondForm = cy.contains('nb-card', 'Basic form');

        // firstForm.find('[for="inputEmail1"]');
        // firstForm.find('[for="inputPassword2"]');

        // secondForm.find('[for="exampleInputEmail1"]');
        // secondForm.find('[for="exampleInputPassword1"]');

        // cypress style
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text();
            expect(emailLabelFirst).to.equal('Email');
            expect(passwordLabelFirst).to.equal('Password');

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordSecond = secondForm.find('[for="exampleInputPassword1"]').text();
                expect(passwordSecond).to.equal(passwordLabelFirst);
            });
        });
    });
});