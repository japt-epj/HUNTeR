import Credentials from './Credentials';

export default {
  getTeacherLogout(loginCredentials) {
    this.getTestsBeforeLogout(loginCredentials.role);
    this.getTestsAfterLogout();
  },

  getParticipantLogout(loginCredentials) {
    this.getTestsBeforeLogout(loginCredentials.role);
    this.getTestsAfterLogout();
  },

  getTestsBeforeLogout(role) {
    cy
      .get(`.pusher > .ui > [href="/${role}/logout"] > .item`)
      .click()
      .should(() => {
        this.getLogoutTokenClearingTest();
      });
  },

  getLogoutTokenClearingTest() {
    expect(localStorage.getItem('HUNTeR-Token')).to.equal(null);
    expect(localStorage.getItem('HUNTeR-Redirect')).to.equal(null);
  },

  getTestsAfterLogout() {
    cy.url().should('equal', Cypress.env('baseUrl') + '/');
  }
};
