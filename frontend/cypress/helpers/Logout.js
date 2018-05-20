export default {
  getTeacherLogout() {
    cy
      .get('.pusher > .ui > [href="/teacher/logout"] > .item')
      .click()
      .should(() => {
        this.getLogoutTokenClearingTest();
      });
    this.getTestsAfterLogout();
  },

  getParticipantLogout() {
    cy
      .get('.pusher > .ui > [href="/participant/logout"] > .item')
      .click()
      .should(() => {
        this.getLogoutTokenClearingTest();
      });
    this.getTestsAfterLogout();
  },

  getLogoutTokenClearingTest() {
    expect(localStorage.getItem('HUNTeR-Token')).to.equal(null);
    expect(localStorage.getItem('HUNTeR-Redirect')).to.equal(null);
  },

  getTestsAfterLogout() {
    cy.url().should('equal', Cypress.env('baseUrl') + '/');
  }
};
