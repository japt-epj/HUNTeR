import React from 'react';
import {Redirect} from 'react-router';

import {Form, Table} from 'semantic-ui-react';

import FormHandler from '../../handlers/FormHandler';
import TableHandler from '../../handlers/TableHandler';
import APIHandler from '../../handlers/APIHandler';
import ModalHandler from '../../handlers/ModalHandler';

export default class TeacherExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formOK: true,
      fireRedirect: false,
      exerciseId: '',
      name: '',
      question: '',
      answer0: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answerId: '',
      answersAllowed: 4
    };

    this.handleSubmit = FormHandler.handleExerciseSubmit.bind(this);
    this.handleChange = FormHandler.handleChange.bind(this);
    this.handleSelectChange = FormHandler.handleAnswerSelectChange.bind(this);
    this.postData = APIHandler.postData.bind(this);
    this.getFormError = ModalHandler.getFormError.bind(this);
  }

  render() {
    return (
      <div>
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
          <Form.Button content="Submit" />
          {this.state.fireRedirect && <Redirect to="/" />}
        </Form>
      </div>
    );
  }
}
