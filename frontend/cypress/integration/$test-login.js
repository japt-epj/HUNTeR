import setViewport from '../helpers/setViewport';
import Credentials from '../helpers/Credentials';
import doLogin from '../helpers/doLogin';
import Logout from '../helpers/Logout';

describe('Login tests', function() {
  it('Login test with wrong credentials', function() {
    setViewport('iphone-6/7/8');
    const loginCredentials = Credentials.getWrongCredentials();

    doLogin(loginCredentials);
    cy.contains('Username oder Passwort falsch eingegeben').should('be.visible');
  });

  it('Login test with participant credentials', function() {
    setViewport('iphone-6/7/8');
    const loginCredentials = Credentials.getParticipantCredentials().HSR;

    doLogin(loginCredentials);
    Logout.getLogout(loginCredentials);
  });

  it('Redirecting test with participant credentials', function() {
    setViewport('iphone-6/7/8');
    const loginCredentials = Credentials.getParticipantCredentials().HSR;

    doLogin(loginCredentials);
    cy.visit(Cypress.env('baseUrl'));
    cy.url().should('equal', Cypress.env('baseUrl') + `/${loginCredentials.role}`);
    Logout.getLogout(loginCredentials);
  });

  it('Login test with teacher credentials', function() {
    setViewport('iphone-6/7/8');
    const loginCredentials = Credentials.getTeacherCredentials().HSR;

    doLogin(loginCredentials);
    Logout.getLogout(loginCredentials);
  });

  it('Redirecting test with teacher credentials', function() {
    setViewport('iphone-6/7/8');
    const loginCredentials = Credentials.getTeacherCredentials().HSR;

    doLogin(loginCredentials);
    cy.visit(Cypress.env('baseUrl'));
    cy.url().should('equal', Cypress.env('baseUrl') + `/${loginCredentials.role}`);
    Logout.getLogout(loginCredentials);
  });
});
