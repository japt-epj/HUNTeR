import setViewport from '../helpers/setViewport';
import Credentials from '../helpers/Credentials';
import login from '../helpers/login';
import Logout from '../helpers/Logout';

describe('Exercise tests', function() {
  beforeEach(function() {
    setViewport('fullHD');
  });

  it('Check user information as HSR participant', function() {
    const loginCredentials = Credentials.getParticipantCredentials().HSR;
    login(loginCredentials);

    cy.get(getParticipantPath()).click();
    checkNames(loginCredentials);

    navigateToMainPage();
    Logout.getLogout(loginCredentials);
  });

  it('Check user information as Person of Interest teacher', function() {
    const loginCredentials = Credentials.getTeacherCredentials()
      .PersonOfInterest;
    login(loginCredentials);

    cy.get(getTeacherPath()).click();
    checkNames(loginCredentials);

    navigateToMainPage();
    Logout.getLogout(loginCredentials);
  });

  it('Change user information as Westworld Inc teacher', function() {
    const loginCredentials = Credentials.getTeacherCredentials().Westworld;
    let newNames = {
      first: {
        firstName: 'Make money',
        lastName: 'with idiots',
        email: loginCredentials.email,
        school: loginCredentials.school
      },
      second: {
        firstName: 'L1b€r@T0r -',
        lastName: 'let the hosts kill them all',
        email: loginCredentials.email,
        school: loginCredentials.school
      }
    };

    login(loginCredentials);

    cy.get(getTeacherPath()).click();
    checkNames(loginCredentials);
    changeNames(loginCredentials, newNames.first);
    cy.get('.negative').click();

    checkNames(newNames.first);
    changeNames(newNames.first, newNames.second);
    cy.get('.positive').click();

    Logout.getLogout(loginCredentials);
    login(loginCredentials);

    cy.get(getTeacherPath()).click();
    checkNames(newNames.second);
    changeNames(newNames.second, loginCredentials);
    cy.get('.positive').click();

    navigateToMainPage();
    Logout.getLogout(loginCredentials);
  });

  it('Change user information as Westworld participant', function() {
    const loginCredentials = Credentials.getParticipantCredentials().Westworld;
    let newNames = {
      first: {
        firstName: 'Escape',
        lastName: 'go into the wide world',
        email: loginCredentials.email,
        school: loginCredentials.school
      },
      second: {
        firstName: 'Escape with',
        lastName: 'my daughter',
        email: loginCredentials.email,
        school: loginCredentials.school
      }
    };

    login(loginCredentials);

    cy.get(getParticipantPath()).click();
    checkNames(loginCredentials);
    changeNames(loginCredentials, newNames.first);
    cy.get('.negative').click();

    checkNames(newNames.first);
    changeNames(newNames.first, newNames.second);
    cy.get('.positive').click();

    Logout.getLogout(loginCredentials);
    login(loginCredentials);

    cy.get(getParticipantPath()).click();
    checkNames(newNames.second);
    changeNames(newNames.second, loginCredentials);
    cy.get('.positive').click();

    navigateToMainPage();
    Logout.getLogout(loginCredentials);
  });
});

function getTeacherPath() {
  return '.massive > :nth-child(5) > .menu > [href="/teacher/settings"] > .item';
}
function getParticipantPath() {
  return '.massive > :nth-child(3) > .menu > [href="/participant/settings"] > .item';
}

function checkNames(names) {
  cy.get(':nth-child(1) > .ui > input').should('have.value', names.firstName);
  cy.get(':nth-child(2) > .ui > input').should('have.value', names.lastName);
  cy
    .get(':nth-child(3) > .ui.disabled.input > input')
    .should('have.value', names.email);
  cy
    .get(':nth-child(4) > .ui.disabled.input > input')
    .should('have.value', names.school);
}

function changeNames(oldNames, newNames) {
  cy
    .get(':nth-child(1) > .ui > input')
    .should('have.value', oldNames.firstName);
  cy
    .get(':nth-child(1) > .ui > input')
    .click()
    .clear()
    .type(newNames.firstName);
  cy.get(':nth-child(2) > .ui > input').should('have.value', oldNames.lastName);
  cy
    .get(':nth-child(2) > .ui > input')
    .click()
    .clear()
    .type(newNames.lastName);
  cy.get(':nth-child(5) > .ui').click();
}

function navigateToMainPage() {
  cy.get('.active > .ui').click();
}
