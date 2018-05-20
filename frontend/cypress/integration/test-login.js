import setViewport from '../helpers/setViewport';
import login from '../helpers/login';

describe('Login tests', function() {
  it('Login test with wrong credentials', function() {
    setViewport('HD+');
    login('andi.hoerler@hsr.ch', 'Andi', false);
    cy.url().should('include', '/');
    cy
      .contains('Username oder Passwort falsch eingegeben')
      .should('be.visible');
  });

  it('Login test with participant credentials', function() {
    setViewport('fullHD');
    const role = 'participant';
    login('andi.hoerler@hsr.ch', 'andi', true);
    cy.url().should('include', '/' + role);
    cy.get('.pusher > .ui > [href="/participant/logout"] > .item').click();
    cy.url().should('include', '/');
  });

  it('Login test with teacher credentials', function() {
    setViewport('fullHD');
    const role = 'teacher';
    login('tobias.saladin@hsr.ch', 'tobias', true);
    cy.url().should('include', '/' + role);
    cy.get('.pusher > .ui > [href="/teacher/logout"] > .item').click();
    cy.url().should('include', '/');
  });
});
