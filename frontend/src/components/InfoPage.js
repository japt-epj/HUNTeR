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
          'Aufgaben sind einzelne Quizelemente, welche eine Frage mit einer richtigen Antwort beinhalten. Der Fragetyp ist als single choise definiert.'
      },
      {
        title: 'Quizzes',
        icon: 'point',
        description:
          'Quizzes beinhalten eine oder mehrere Aufgaben. Jeder Aufgabe muss zudem ein Standort zugewiesen werden.'
      },
      {
        title: 'Ausführung',
        icon: 'add user',
        description:
          'Ausführungen werden Studenten zugewiesen. Ausführungen sind zudem mit einem zeitlichen Faktor limitiert.'
      },
      {
        title: 'LeaderBoard',
        icon: 'trophy',
        description:
          'Das LeaderBoard zeigt die Rangverteilung der einzelnen Studenten auf.'
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
      </div>
    );
  }
}
