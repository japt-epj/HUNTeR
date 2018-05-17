import React from 'react';
import {Redirect} from 'react-router';
import {NavLink} from 'react-router-dom';

import {Form, Grid, Header, Message} from 'semantic-ui-react';

import FormHandler from '../../handlers/FormHandler';
import APIHandler from '../../handlers/APIHandler';

export default class ParticipantExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseId: this.props.location.state.exercise.id,
      //TODO: Send the execution Id from server to send the response back to the correct execution
      executionId: 1,
      name: this.props.location.state.exercise.name,
      question: this.props.location.state.exercise.question,
      options: [
        this.props.location.state.exercise.answers[0].text,
        this.props.location.state.exercise.answers[1].text,
        this.props.location.state.exercise.answers[2].text,
        this.props.location.state.exercise.answers[3].text
      ],
      answerId: '',
      fireRedirect: false
    };
    this.handleSubmit = FormHandler.handleExerciseSubmit.bind(this);
    this.handleSelectChange = FormHandler.handleAnswerSelectChange.bind(this);
    this.postData = APIHandler.postData.bind(this);
    this.getParticipant = APIHandler.getParticipant.bind(this);
  }

  componentDidMount() {
    this.getParticipant(1).then(resData => {
      let participant = resData.data[0];
      this.setState({
        participantId: participant.id
      });
    });
  }

  render() {
    if (this.state !== null) {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Grid.Row>
            <Header content={this.state.name} />
            {this.state.question}
          </Grid.Row>
          <Grid.Row>
            {this.state.options.map((element, index) => {
              return (
                <Form.Radio
                  value={index}
                  label={'Antwort ' + (index + 1) + ' : ' + element}
                  onChange={this.handleSelectChange}
                  checked={this.state.answerId === index}
                />
              );
            })}
          </Grid.Row>
          <Grid.Row>
            <Form.Button content="Submit" />
          </Grid.Row>
          {this.state.fireRedirect && <Redirect to="/" />}
        </Form>
      );
    } else {
      return (
        <NavLink to="/scan">
          <Message
            icon="camera retro"
            size="mini"
            header="Bitte zuerst eine Aufgabe mit der Scan Funktion scannen."
            error
          />
        </NavLink>
      );
    }
  }
}
