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
      executionId: this.props.location.state.exercise.executionId,
      exerciseId: this.props.location.state.exercise.exerciseId,
      name: this.props.location.state.exercise.name,
      question: this.props.location.state.exercise.question,
      options: [
        this.props.location.state.exercise.answers[0].text,
        this.props.location.state.exercise.answers[1].text,
        this.props.location.state.exercise.answers[2].text,
        this.props.location.state.exercise.answers[3].text
      ],
      answerId: -1,
      fireRedirect: false
    };
    this.handleSubmit = FormHandler.handleExerciseSubmit.bind(this);
    this.handleSelectChange = FormHandler.handleAnswerSelectChange.bind(this);
    this.postData = APIHandler.postData.bind(this);
    this.getJSONHeader = APIHandler.getJSONHeader;
  }

  render() {
    return (
      <div>
        {this.state.executionId !== undefined ? (
          <Grid padded>
            <Form onSubmit={this.handleSubmit}>
              <Grid.Row>
                <Header content={this.state.name} />
              </Grid.Row>
              <Grid.Row>{this.state.question}</Grid.Row>
              <Grid.Row>
                <Grid padded>
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
                    <Form.Button content="Submit" />
                  </Grid.Row>
                </Grid>
              </Grid.Row>
            </Form>
            {this.state.fireRedirect && (
              <Redirect
                to={{
                  pathname: 'nextLocation',
                  state: {executionId: this.state.executionId}
                }}
              />
            )}
          </Grid>
        ) : (
          <NavLink to="/scan">
            <Message
              icon="camera retro"
              size="mini"
              header="Bitte zuerst eine Aufgabe mit der Scan Funktion scannen."
              error
            />
          </NavLink>
        )}
      </div>
    );
  }
}
