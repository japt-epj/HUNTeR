import React from 'react';
import {Redirect} from 'react-router';
import {NavLink} from 'react-router-dom';

import {Form, Grid, Header, Message} from 'semantic-ui-react';

import FormHandler from '../../handlers/FormHandler';
import APIHandler from '../../handlers/APIHandler';
import getLoadingScreen from '../../components/getLoadingScreen';
import ModalHandler from '../../handlers/ModalHandler';
import {modalOptions} from '../../config/hunterUiDefaults';

export default class ParticipantExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: modalOptions.response,
      executionId: Boolean(this.props.location.state)
        ? this.props.location.state.executionId
        : '',
      exerciseId: Boolean(this.props.location.state)
        ? this.props.location.state.exerciseId
        : '',
      name: '',
      exercise: {},
      question: '',
      options: [],
      answerId: -1,
      fireRedirect: false
    };
    this.handleSubmit = FormHandler.handleExerciseSubmit.bind(this);
    this.handleSelectChange = FormHandler.handleAnswerSelectChange.bind(this);
    this.postData = APIHandler.postData.bind(this);
    this.getJSONHeader = APIHandler.getJSONHeader;
  }

  componentDidMount() {
    if (this.state.exerciseId !== '') {
      APIHandler.getExerciseArray(this.state.exerciseId).then(resData => {
        if (resData.status === 200) {
          this.setState({
            exercise: resData.data[0]
          });
        }
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.executionId !== '' ? (
          <div>
            {this.state.successMessage.showModal &&
              ModalHandler.getCreationSuccess(this.state.successMessage)}
            {!Boolean(this.state.exercise.answers) ? (
              getLoadingScreen()
            ) : (
              <Grid padded>
                <Form onSubmit={this.handleSubmit}>
                  <Grid.Row>
                    <Header content={this.state.exercise.name} />
                  </Grid.Row>
                  <Grid.Row>{this.state.exercise.question}</Grid.Row>
                  <Grid.Row>
                    <Grid padded>
                      {this.state.exercise.answers.map((element, index) => {
                        return (
                          <Grid.Row key={element.text}>
                            <Form.Radio
                              value={element.answerId}
                              label={
                                'Antwort ' + (index + 1) + ' : ' + element.text
                              }
                              onChange={this.handleSelectChange}
                              checked={this.state.answerId === element.answerId}
                            />
                          </Grid.Row>
                        );
                      })}
                      <Grid.Row>
                        <Form.Button content="Übermitteln" />
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
            )}
          </div>
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
