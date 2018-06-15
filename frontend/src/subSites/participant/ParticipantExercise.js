import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';

import {Form, Grid, Header, Message} from 'semantic-ui-react';
import {OK} from 'http-status-codes';

import {modalOptions} from '../../config/hunterUiDefaults';
import {apiGetHandler, apiPostHandler} from '../../handlers/hunterApiHandlers';
import {formChangeHandler, formSubmitHandler} from '../../handlers/hunterFormHandlers';
import {modalHandler} from '../../handlers/hunterViewHandlers';
import getLoadingScreen from '../../components/getLoadingScreen';

export default class ParticipantExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: modalOptions.response,
      executionId: Boolean(this.props.location.state) ? this.props.location.state.executionId : '',
      exerciseId: Boolean(this.props.location.state) ? this.props.location.state.exerciseId : '',
      name: '',
      exercise: {},
      question: '',
      options: [],
      answerId: -1,
      fireRedirect: false
    };
    this.handleSubmit = formSubmitHandler.handleExerciseSubmit.bind(this);
    this.handleSelectChange = formChangeHandler.handleAnswerSelectChange.bind(this);
    this.postData = apiPostHandler.postData.bind(this);
  }

  componentDidMount() {
    if (this.state.exerciseId === '') {
      return;
    }
    apiGetHandler.getElementArray('exercise/', this.state.exerciseId).then(resData => {
      if (resData.status !== OK) {
        return;
      }
      this.setState({
        exercise: resData.data[0]
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.executionId !== '' ? (
          <div>
            {this.state.successMessage.showModal && modalHandler.getSuccess(this.state.successMessage)}
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
                              label={'Antwort ' + (index + 1) + ' : ' + element.text}
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
