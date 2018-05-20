import setViewport from '../helpers/setViewport';
import login from '../helpers/login';
import Credentials from '../helpers/Credentials';

describe('Login tests', function() {
  it('Create new exercise', function() {
    setViewport('fullHD');
    login(Credentials.getTeacherCredentials());
    cy.get('.pusher > .ui > [href="/teacher/exercise"] > .item').click();
    cy.get('.form > :nth-child(1) > .ui > input').type('Länder');
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
    cy.get(':nth-child(4) > .ui').click();
    cy
      .get('.pusher > .ui > [href="/teacher/exerciseOverview"] > .item')
      .click();
  });

  it('Create new exercise', function() {
    setViewport('fullHD');
    login(Credentials.getTeacherCredentials());
    cy.get('.pusher > .ui > [href="/teacher/exercise"] > .item').click();
    cy.get('.form > :nth-child(1) > .ui > input').type('Prüfungen');
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
    cy.get(':nth-child(4) > .ui').click();
    cy
      .get('.pusher > .ui > [href="/teacher/exerciseOverview"] > .item')
      .click();
  });
});
