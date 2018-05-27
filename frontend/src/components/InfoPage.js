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
          'Aufgaben sind einzelne Quizelemente, welche eine Frage mit ' +
          'einer richtigen Antwort beinhalten. Der Fragetyp ist als ' +
          'single choise definiert.'
      },
      {
        title: 'Quizzes',
        icon: 'point',
        description:
          'Quizzes beinhalten eine oder mehrere Aufgaben. Jeder Aufgabe ' +
          'muss zudem ein Standort zugewiesen werden.'
      },
      {
        title: 'Durchführung',
        icon: 'add user',
        description:
          'Durchführungen werden Teilnehmern zugewiesen. Durchführungen ' +
          'sind zudem mit einem zeitlichen Faktor limitiert.'
      },
      {
        title: 'Verteilen',
        icon: 'map',
        description:
          'Bei den Durchführungen können QR-Code-Listen ausgedruckt ' +
          'werden. Als Lehrer können diese eingescannt werden um ' +
          'die Position zu bestimmen und den QR-Code am richtigen ' +
          'Ort zu deponieren.'
      },
      {
        title: 'Lösen',
        icon: 'retro camera',
        description:
          'Teilnehmer können nun die verteilten QR-Codes per Smartphone ' +
          'einscannen und danach die Aufgabe lösen.'
      },
      {
        title: 'Leaderboard',
        icon: 'trophy',
        description:
          'Nachdem ein jeweiliger Teilnehmer ein QR-Code gefunden hat kann ' +
          'er diesen einscannen und die Aufgabe lösen. Das aktuelle ' +
          'Ergebnis der Teilnehmer, welche einer Durchführung zugewiesen' +
          'sind, werden in einem Leaderboard widergespiegelt.'
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
        {steps.map((element, index) => (
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
