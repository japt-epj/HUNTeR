export default function login(email, password) {
  cy.visit('/');
  cy.contains('E-Mail-Adresse');
  cy
    .get(':nth-child(1) > .ui > input')
    .click()
    .type(email);
  cy
    .get(':nth-child(2) > .ui > input')
    .click()
    .type(password);
  cy.get(':nth-child(3) > .ui').click();
}
