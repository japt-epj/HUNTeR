import setViewport from '../helpers/setViewport';
import Credentials from '../helpers/Credentials';
import login from '../helpers/login';

describe('Login tests', function() {
  it('Login test with wrong credentials', function() {
    setViewport('HD+');
    login(Credentials.getWrongCredentials());
    cy.url().should('equal', Cypress.env('baseUrl') + '/');
    cy
      .contains('Username oder Passwort falsch eingegeben')
      .should('be.visible');
  });

  it('Login test with participant credentials', function() {
    setViewport('fullHD');
    login(Credentials.getParticipantCredentials());
    cy
      .url()
      .should(
        'equal',
        Cypress.env('baseUrl') +
          '/' +
          Credentials.getParticipantCredentials().role
      );
    cy.get('.pusher > .ui > [href="/participant/logout"] > .item').click();
    cy.url().should('equal', Cypress.env('baseUrl') + '/');
  });

  it('Login test with teacher credentials', function() {
    setViewport('fullHD');
    login(Credentials.getTeacherCredentials());
    cy
      .url()
      .should(
        'equal',
        Cypress.env('baseUrl') + '/' + Credentials.getTeacherCredentials().role
      );
    cy.get('.pusher > .ui > [href="/teacher/logout"] > .item').click();
    cy.url().should('equal', Cypress.env('baseUrl') + '/');
  });
});
