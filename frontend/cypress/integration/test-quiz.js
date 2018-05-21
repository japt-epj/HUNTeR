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
    Logout.getTeacherLogout(loginCredentials);
  });

  it('Create new quiz', function() {
    const loginCredentials = Credentials.getTeacherCredentials();

    cy.get('.pusher > .ui > [href="/teacher/quiz"] > .item').click();

    const exerciseTitle =
      '$Natur - ' + Math.floor(Math.random() * Math.floor(10000));
    cy.get('input').type(exerciseTitle);
    cy.get(':nth-child(3) > :nth-child(1) > div').click();
    cy.get('tbody > tr > td > div:first').click();
    cy.get('.page').click();
  });
});
