import setViewport from '../helpers/setViewport';
import Credentials from '../helpers/Credentials';
import login from '../helpers/login';
import Logout from '../helpers/Logout';

describe('Login tests', function() {
  it('Login test with wrong credentials', function() {
    setViewport('HD+');
    login(Credentials.getWrongCredentials());
    Logout.getTestsAfterLogout();
    cy
      .contains('Username oder Passwort falsch eingegeben')
      .should('be.visible');
  });

  it('Login test with participant credentials', function() {
    setViewport('fullHD');
    login(Credentials.getParticipantCredentials());
    Logout.getParticipantLogout();
  });

  it('Login test with teacher credentials', function() {
    setViewport('fullHD');
    login(Credentials.getTeacherCredentials());
    Logout.getTeacherLogout();
  });
});
