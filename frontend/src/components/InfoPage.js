import React from 'react';

import {Container, Divider, Header, Step} from 'semantic-ui-react';

export default class InfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: '',
      anchor: this.props.anchor
    };
  }

  render() {
    const steps = [
      {
        title: 'Aufgaben',
        icon: 'question',
        description:
          'Der Leherer erstellt Aufgaben. Aufgaben sind einzelne Quizelemente, welche ' +
          'eine Frage mit einer richtigen Antwort beinhalten. Der Fragetyp ist als ' +
          'single choise definiert.'
      },
      {
        title: 'Quizzes',
        icon: 'point',
        description:
          'Der Lehrer erstellt Quizzes, welche eine oder mehrere Aufgaben beinhalten. ' +
          'Jeder Aufgabe muss zudem ein Standort zugewiesen werden.'
      },
      {
        title: 'Durchführung',
        icon: 'add user',
        description:
          'Der Lehrer erstellt Durchführungen, welche danach Teilnehmern zugewiesen werden. ' +
          'Durchführungen sind zudem mit einem zeitlichen Faktor limitiert.'
      },
      {
        title: 'Verteilen',
        icon: 'map',
        description:
          'Der Lehrer besitzt die Möglichkeit eine QR-Code-Listen von einer Durchführung ' +
          'herunterzuladen und auszudrucken werden. Als Lehrer können diese eingescannt ' +
          'werden, um die Standorte der jeweiligen Quiz-Aufgaben zu bestimmen. Somit wird ' +
          'es dem Lehrer ermöglicht, den QR-Code, per Navigation, am richtigen Ort zu hinterlegen.'
      },
      {
        title: 'Suchen',
        icon: 'search',
        description:
          'Teilnehmer suchen mithilfe der Webseite die nächsten Quizzes. Hierbei wird auf ' +
          'Geolocations zurückgegriffen, um den Standort des Studenten zu orten. Der Student ' +
          'erhält nicht wie der Lehrer eine Möglickeit den QR-Code via Navigation zu finden.'
      },
      {
        title: 'Lösen',
        icon: 'retro camera',
        description:
          'Teilnehmer können nun die verteilten QR-Codes per Smartphone einscannen. Die ' +
          'anschliessend erhaltene Aufgabe kann gelöst werden.'
      },
      {
        title: 'Leaderboard',
        icon: 'trophy',
        description:
          'Das aktuelle Ergebnis der Teilnehmer, welche einer Durchführung zugewiesen sind ' +
          'können über das Leaderboard abgefragt werden. Teilnehmer erhalten nur die Top-3, ' +
          'Lehrer können auf den Score aller Teilnehmer einsicht nehmen.'
      }
    ];

    return (
      <div>
        <Container textAlign="center">
          <Step.Group>
            {steps.map(element => (
              <Step
                key={element.title}
                active={this.state.activeStep === element.title}
                title={element.title}
                icon={element.icon}
              />
            ))}
          </Step.Group>
        </Container>
        {steps.map(element => (
          <div key={element.title}>
            <Divider />
            <Container>
              <Header content={element.title} />
              <p>{element.description}</p>
            </Container>
          </div>
        ))}
        <Divider />
        <Container>
          <Header content="Konto-Einstellungen" />
          <p>
            Wird genutzt, sofern man den eigenen Anzeigenamen im Leaderboard
            ändern will oder man sich ausloggen möchte.
          </p>
        </Container>
      </div>
    );
  }
}
