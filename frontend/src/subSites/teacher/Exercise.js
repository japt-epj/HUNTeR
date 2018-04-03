import React from 'react';

import {Form, Table} from 'semantic-ui-react';

import FormHandler from '../../handlers/FormHandler';
import TableHandler from '../../handlers/TableHandler';


export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '/API/exercise/create',
            exercise: {
                title: '',
                question: '',
                answerOptions: [
                    {text: '', correct: false},
                    {text: '', correct: false},
                    {text: '', correct: false},
                    {text: '', correct: false}
                ],
                explanation: '',
            }
        };
    }

    render() {
        return (
            <Form onSubmit={FormHandler.handleSubmit.bind(this)}>
                <Form.Input fluid label="Titel" name="title" value={this.title}
                            onChange={FormHandler.handleChange.bind(this)}
                            placeholder="Bitte geben Sie einen Titel ein" required/>
                <Form.TextArea label="Aufgabenfrage" name="question" value={this.question}
                               onChange={FormHandler.handleChange.bind(this)}
                               placeholder="Bitte geben Sie eine Frage ein..." required/>
                <Table definition>
                    <Table.Header>
                        <Table.Row>
                            {TableHandler.getTableHeader(['', 'Antworten', 'Richtig'])}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {new Array(this.state.exercise.answerOptions.length).fill().map((item, index) => {
                            return (
                                <Table.Row key={'TableRow' + index}>
                                    {TableHandler.getTableCell({element: (index + 1), collapsed: true})}
                                    {TableHandler.getTableCell({
                                        element: (<Form.Input fluid name={'optionAnswer' + index}
                                                              value={this.state.exercise.answerOptions[index].text}
                                                              onChange={FormHandler.handleChange.bind(this)}
                                                              placeholder="Bitte Antwort eingeben" required/>),
                                        collapsed: false
                                    })}
                                    {TableHandler.getTableCell({
                                        element: (
                                            <Form.Field control="input" type="checkbox"
                                                        name={'optionCheckbox' + index}
                                                        onChange={FormHandler.handleChange.bind(this)}
                                                        checked={this.state.exercise.answerOptions[index].correct}/>),
                                        collapsed: true
                                    })}
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
                <Form.TextArea label="Erklärungstext" name="explanation" value={this.question}
                               onChange={FormHandler.handleChange.bind(this)}
                               placeholder="Bitte geben Sie eine Erklärungstext ein..." required/>
                <Form.Button content='Submit'/>
            </Form>
        );
    }
}