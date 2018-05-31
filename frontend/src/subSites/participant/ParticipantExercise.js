import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';

import {Form, Grid, Header, Message} from 'semantic-ui-react';

import {modalOptions} from '../../config/hunterUiDefaults';
import {
  apiHandler,
  formHandler,
  modalHandler
} from '../../handlers/hunterHandlers';
import getLoadingScreen from '../../components/getLoadingScreen';

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
    this.handleSubmit = formHandler.handleExerciseSubmit.bind(this);
    this.handleSelectChange = formHandler.handleAnswerSelectChange.bind(this);
    this.postData = apiHandler.postData.bind(this);
    this.getJSONHeader = apiHandler.getJSONHeader;
  }

  componentDidMount() {
    if (this.state.exerciseId !== '') {
      apiHandler.getExerciseArray(this.state.exerciseId).then(resData => {
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
              modalHandler.getCreationSuccess(this.state.successMessage)}
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
