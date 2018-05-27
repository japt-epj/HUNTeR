import setViewport from '../helpers/setViewport';
import Credentials from '../helpers/Credentials';
import login from '../helpers/login';
import Logout from '../helpers/Logout';

describe('Exercise tests', function() {
  beforeEach(function() {
    setViewport('iphone-6/7/8+');
    const loginCredentials = Credentials.getTeacherCredentials();
    login(loginCredentials);
  });

  afterEach(function() {
    const loginCredentials = Credentials.getTeacherCredentials();

    cy.get('.grid > :nth-child(1) > .field > .ui').click();
    Logout.getTeacherLogout(loginCredentials);
  });

  it('Create new exercise', function() {
    const loginCredentials = Credentials.getTeacherCredentials();

    cy
      .get(
        '.pusher > .ui > :nth-child(1) > .menu > [href="/teacher/exercise"] > .item'
      )
      .click();
    const exerciseTitle =
      '$CypressTest - Nordische Peripheriebegriffe - ' +
      Math.floor(Math.random() * Math.floor(10000));

    cy.get('.form > :nth-child(1) > .ui > input').type(exerciseTitle);
    cy.get('textarea').type('Was sind Schweden und Norweger');
    cy
      .get(':nth-child(1) > :nth-child(2) > .required > .ui > input')
      .type('Durkdinaeins');
    cy
      .get(':nth-child(2) > :nth-child(2) > .required > .ui > input')
      .type('Coppydinazwei');
    cy
      .get(':nth-child(3) > :nth-child(2) > .required > .ui > input')
      .type('Faksdinadrei');
    cy
      .get(':nth-child(4) > :nth-child(2) > .required > .ui > input')
      .type('Skandinavier');
    cy.get('tbody > :nth-child(4) > :nth-child(3) > .field > .ui').click();
  });

  it('Create new exercise with error', function() {
    const loginCredentials = Credentials.getTeacherCredentials();

    cy
      .get(
        '.pusher > .ui > :nth-child(1) > .menu > [href="/teacher/exercise"] > .item'
      )
      .click();
    cy
      .get('.form > :nth-child(1) > .ui > input')
      .type('CypressTest - Prüfungsangst');
    cy
      .get('textarea')
      .type(
        'Ohne Vorbereitung ist es wahrscheinlich, dass ich beim Examen...?'
      );
    cy
      .get(':nth-child(1) > :nth-child(2) > .required > .ui > input')
      .type('Bauchweh');
    cy
      .get(':nth-child(2) > :nth-child(2) > .required > .ui > input')
      .type('Übelkeit');
    cy
      .get(':nth-child(3) > :nth-child(2) > .required > .ui > input')
      .type('Durchfall');
    cy
      .get(':nth-child(4) > :nth-child(2) > .required > .ui > input')
      .type('Erbrechen');
    cy.get(':nth-child(4) > .ui').click();
    cy.get('.actions > .ui').click();
    cy.get('tbody > :nth-child(3) > :nth-child(3) > .field > .ui').click();
  });
});
