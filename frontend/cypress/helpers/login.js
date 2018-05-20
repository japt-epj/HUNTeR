export default function login(loginCredentials) {
  cy.visit('/');
  cy.contains('E-Mail-Adresse');
  cy
    .get(':nth-child(1) > .ui > input')
    .click()
    .type(loginCredentials.email);
  cy
    .get(':nth-child(2) > .ui > input')
    .click()
    .type(loginCredentials.password);
  cy
    .get(':nth-child(3) > .ui')
    .click()
    .should(() => {
      if (loginCredentials.credentialsCorrect) {
        expect(localStorage.getItem('HUNTeR-Token')).to.include('Bearer ');
        expect(localStorage.getItem('HUNTeR-Redirect')).to.equal(
          '/' + loginCredentials.role
        );
      }
    });
}
