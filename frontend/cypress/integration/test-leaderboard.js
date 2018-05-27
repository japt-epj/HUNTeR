import setViewport from '../helpers/setViewport';
import Credentials from '../helpers/Credentials';
import login from '../helpers/login';
import Logout from '../helpers/Logout';

describe('Exercise tests', function() {
  beforeEach(function() {
    setViewport('fullHD');
    const loginCredentials = Credentials.getTeacherCredentials();
    login(loginCredentials);
  });

  afterEach(function() {
    const loginCredentials = Credentials.getTeacherCredentials();

    cy.get('.grid > :nth-child(1) > .field > .ui').click();
    Logout.getTeacherLogout(loginCredentials);
  });

  it('Check leaderboard', function() {
    const loginCredentials = Credentials.getTeacherCredentials();

    cy
      .get(
        '.pusher > .ui > :nth-child(4) > .menu > [href="/teacher/participantLeaderBoard"] > .item'
      )
      .click();
  });
});
