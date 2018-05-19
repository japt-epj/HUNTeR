import login from '../helpers/helper-login';

describe('Login tests', function() {
  it('Login test with wrong credentials', function() {
    login('andi.hoerler@hsr.ch', 'Andi');
    cy.url().should('include', '/');
    cy
      .get('.content > .header')
      .should('have.value', 'Username oder Passwort falsch eingegeben');
  });

  it('Login test with participant credentials', function() {
    const role = 'participant';
    login('andi.hoerler@hsr.ch', 'andi');
    cy.url().should('include', '/' + role);
    cy.get('.pusher > .ui > [href="/participant/logout"] > .item').click();
    cy.url().should('include', '/');
  });

  it('Login test with teacher credentials', function() {
    const role = 'teacher';
    login('tobias.saladin@hsr.ch', 'tobias');
    cy.url().should('include', '/' + role);
    cy.get('.pusher > .ui > [href="/teacher/logout"] > .item').click();
    cy.url().should('include', '/');
  });
});
