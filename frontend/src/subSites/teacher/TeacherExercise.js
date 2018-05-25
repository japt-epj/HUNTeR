import React from 'react';
import {Redirect} from 'react-router';

import {Form, Grid, Table} from 'semantic-ui-react';

import defaultUIConfig from '../../config/defaultUIConfig';
import FormHandler from '../../handlers/FormHandler';
import TableHandler from '../../handlers/TableHandler';
import APIHandler from '../../handlers/APIHandler';
import ModalHandler from '../../handlers/ModalHandler';
import {OK} from 'http-status-codes/index';

export default class TeacherExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: defaultUIConfig.defaultSuccessMessages.exercise,
      formOK: true,
      fireRedirect: false,
      exerciseId: this.props !== undefined ? this.props.exerciseId : '',
      name: '',
      question: '',
      answer0: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answerId: -1,
      answersAllowed: 4
    };

    this.handleSubmit = FormHandler.handleExerciseSubmit.bind(this);
    this.handleChange = FormHandler.handleChange.bind(this);
    this.handleSelectChange = FormHandler.handleAnswerSelectChange.bind(this);
    this.postData = APIHandler.postData.bind(this);
    this.getJSONHeader = APIHandler.getJSONHeader;
    this.getFormError = ModalHandler.getFormError.bind(this);
  }

  componentDidMount() {
    this.getExercise(this.state.exerciseId);
  }

  getExercise = exerciseId => {
    APIHandler.getExerciseArray('teacher/' + exerciseId).then(resData => {
      if (resData.status === OK) {
        const exerciseData = resData.data[0];
        const answerId = exerciseData.answers
          .map(element => element.checked)
          .indexOf(true);
        console.log(answerId);
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
        {this.state.successMessage.showModal &&
          ModalHandler.getCreationSuccess(this.state.successMessage)}
        {!this.state.formOK &&
          this.getFormError('Keine Antwort wurde als richtig markiert!')}
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            fluid
            label="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Bitte geben Sie einen Name ein"
            required
          />
          <Form.TextArea
            label="Aufgabenfrage"
            name="question"
            value={this.state.question}
            onChange={this.handleChange}
            placeholder="Bitte geben Sie eine Frage ein..."
            required
          />
          <Table definition>
            <Table.Header>
              <Table.Row>
                {TableHandler.getTableHeader(['', 'Antworten', 'Richtig'])}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {new Array(this.state.answersAllowed)
                .fill()
                .map((item, index) => (
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
          <Grid>
            <Grid.Column>
              <Form.Button content="Submit" />
            </Grid.Column>
            <Grid.Column>
              <Form.Button
                content="Abbrechen"
                onClick={() => this.setState({fireRedirect: true})}
              />
            </Grid.Column>
          </Grid>
          {this.state.fireRedirect && <Redirect to="/" />}
        </Form>
      </div>
    );
  }
}
