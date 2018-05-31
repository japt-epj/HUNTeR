import React from 'react';
import {Redirect} from 'react-router-dom';

import {OK} from 'http-status-codes/index';
import {Form, Grid, Table} from 'semantic-ui-react';

import {modalOptions} from '../../config/hunterUiDefaults';
import {apiHandler, formHandler, modalHandler, tableHandler} from '../../handlers/hunterHandlers';

export default class TeacherExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: modalOptions.exercise,
      formOK: true,
      fireRedirect: false,
      editExercise: Boolean(this.props.editExercise) ? this.props.editExercise : false,
      exerciseId: Boolean(this.props.exerciseId) ? this.props.exerciseId : '',
      name: '',
      question: '',
      answer0: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answerId: -1,
      answersAllowed: 4
    };

    this.getSubmitCancelButton = tableHandler.getSubmitCancelButton.bind(this);
    this.handleSubmit = formHandler.handleExerciseSubmit.bind(this);
    this.handleChange = formHandler.handleChange.bind(this);
    this.handleSelectChange = formHandler.handleAnswerSelectChange.bind(this);
    this.postData = apiHandler.postData.bind(this);
    this.getJSONHeader = apiHandler.getJSONHeader;
    this.getFormError = modalHandler.getFormError.bind(this);
  }

  componentDidMount() {
    if (this.state.editExercise) {
      this.getExercise(this.state.exerciseId);
    }
  }

  getExercise = exerciseId => {
    apiHandler.getExerciseArray('teacher/' + exerciseId).then(resData => {
      if (resData.status === OK) {
        const exerciseData = resData.data[0];
        const answerId = exerciseData.answers.map(element => element.checked).indexOf(true);
        this.setState({
          answer0: exerciseData.answers[0].text,
          answer1: exerciseData.answers[1].text,
          answer2: exerciseData.answers[2].text,
          answer3: exerciseData.answers[3].text,
          answerId,
          question: exerciseData.question,
          name: exerciseData.name
        });
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.successMessage.showModal && modalHandler.getCreationSuccess(this.state.successMessage)}
        {!this.state.formOK && this.getFormError('Keine Antwort wurde als richtig markiert!')}
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            fluid
            label="Name der Aufgabe"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Bitte geben Sie einen Name ein"
            required
          />
          <Form.TextArea
            label="Frage der Aufgabe"
            name="question"
            value={this.state.question}
            onChange={this.handleChange}
            placeholder="Bitte geben Sie eine Frage ein..."
            required
          />
          <Table definition>
            <Table.Header>
              <Table.Row>{tableHandler.getTableHeader(['', 'Antworten', 'Richtig'])}</Table.Row>
            </Table.Header>
            <Table.Body>
              {new Array(this.state.answersAllowed).fill(undefined).map((item, index) => (
                <Table.Row key={'TableRow' + index}>
                  <Table.Cell collapsing>{index + 1}</Table.Cell>
                  <Table.Cell>
                    <Form.Input
                      fluid
                      name={'answer' + index}
                      value={this.state['answer' + index]}
                      onChange={this.handleChange}
                      placeholder="Bitte Antwort eingeben"
                      required
                    />
                  </Table.Cell>
                  <Table.Cell collapsing>
                    <Form.Radio
                      value={index}
                      onChange={this.handleSelectChange}
                      checked={this.state.answerId === index}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Grid>{this.getSubmitCancelButton()}</Grid>
          {this.state.fireRedirect && <Redirect to="/" />}
        </Form>
      </div>
    );
  }
}
