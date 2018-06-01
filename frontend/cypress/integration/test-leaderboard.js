import setViewport from '../helpers/setViewport';
import Credentials from '../helpers/Credentials';
import login from '../helpers/login';
import Logout from '../helpers/Logout';

describe('Exercise tests', function() {
  beforeEach(function() {
    setViewport('fullHD');
  });

  it('Check leaderboard as teacher', function() {
    const loginCredentials = Credentials.getTeacherCredentials().HSR;
    login(loginCredentials);

    cy.get('.massive > :nth-child(4) > .menu > [href="/teacher/participantLeaderboard"] > .item').click();

    cy.contains('Andi Hörler').should('have.class', 'description userScoreName');
    cy
      .get(':nth-child(1) > .content')
      .contains('Rang: 1')
      .next()
      .children()
      .should('have.class', 'trophy icon goldenTrophy');
    cy
      .get('.ui > .search')
      .click()
      .type('2 - {enter}');
    cy.contains('Jonas Kugler').should('have.class', 'description userScoreName');
    cy
      .get(':nth-child(1) > .content')
      .contains('Rang: 1')
      .next()
      .children()
      .should('have.class', 'trophy icon goldenTrophy');
    cy.get('.active > .ui').click();

    Logout.getLogout(loginCredentials);
  });

  it('Check leaderboard as participant', function() {
    const loginCredentials = Credentials.getParticipantCredentials().HSR;
    login(loginCredentials);

    cy.get('.massive > :nth-child(2) > .menu > a > .item').click();

    cy
      .contains('Andi Hörler')
      .parent()
      .parent()
      .should('have.class', 'ui green card');
    cy
      .get(':nth-child(1) > .content')
      .contains('Rang: 1')
      .next()
      .children()
      .should('have.class', 'trophy icon goldenTrophy');
    cy
      .get('.ui > .search')
      .click()
      .type('2 - {enter}');
    cy
      .contains(loginCredentials.firstName + ' ' + loginCredentials.lastName)
      .parent()
      .parent()
      .should('have.class', 'ui green card');
    cy.get('.active > .ui').click();

    Logout.getLogout(loginCredentials);
  });
});
