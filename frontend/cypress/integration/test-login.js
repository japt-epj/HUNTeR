import setViewport from '../helpers/setViewport';
import login from '../helpers/login';

describe('Login tests', function() {
  it('Login test with wrong credentials', function() {
    setViewport('HD+');
    const loginCredentials = {
      email: 'andi.hoerler@hsr.ch',
      password: 'Andi',
      credentialsCorrect: false,
      role: 'participant'
    };
    login(loginCredentials);
    cy.url().should('equal', Cypress.env('baseUrl') + '/');
    cy
      .contains('Username oder Passwort falsch eingegeben')
      .should('be.visible');
  });

  it('Login test with participant credentials', function() {
    setViewport('fullHD');
    const loginCredentials = {
      email: 'andi.hoerler@hsr.ch',
      password: 'andi',
      credentialsCorrect: true,
      role: 'participant'
    };
    login(loginCredentials);
    cy
      .url()
      .should('equal', Cypress.env('baseUrl') + '/' + loginCredentials.role);
    cy.get('.pusher > .ui > [href="/participant/logout"] > .item').click();
    cy.url().should('equal', Cypress.env('baseUrl') + '/');
  });

  it('Login test with teacher credentials', function() {
    setViewport('fullHD');
    const loginCredentials = {
      email: 'tobias.saladin@hsr.ch',
      password: 'tobias',
      credentialsCorrect: true,
      role: 'teacher'
    };
    login(loginCredentials);
    cy
      .url()
      .should('equal', Cypress.env('baseUrl') + '/' + loginCredentials.role);
    cy.get('.pusher > .ui > [href="/teacher/logout"] > .item').click();
    cy.url().should('equal', Cypress.env('baseUrl') + '/');
  });
});
