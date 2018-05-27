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
    let logoutPosition;
    if (role === 'teacher') {
      logoutPosition = 5;
    } else if (role === 'participant') {
      logoutPosition = 3;
    }

    cy
      .get(
        `.pusher > .ui > :nth-child(${logoutPosition}) > .menu > [href="/${role}/logout"] > .item`
      )
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
