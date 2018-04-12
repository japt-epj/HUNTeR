import React from 'react';
import {Redirect} from 'react-router';

import {Form, Table} from 'semantic-ui-react';

import FormHandler from '../../handlers/FormHandler';
import TableHandler from '../../handlers/TableHandler';


export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false,
            exerciseID: '',
            title: '',
            question: '',
            answer0: '',
            checked0: false,
            answer1: '',
            checked1: false,
            answer2: '',
            checked2: false,
            answer3: '',
            checked3: false,
            answersAllowed: 4
        };
        this.handleSubmit = FormHandler.handleSubmit.bind(this);
        this.handleChange = FormHandler.handleChange.bind(this);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input fluid label="Titel" name="title" value={this.state.title}
                            onChange={this.handleChange}
                            placeholder="Bitte geben Sie einen Titel ein" required/>
                <Form.TextArea label="Aufgabenfrage" name="question" value={this.state.question}
                               onChange={this.handleChange}
                               placeholder="Bitte geben Sie eine Frage ein..." required/>
                <Table definition>
                    <Table.Header>
                        <Table.Row>
                            {TableHandler.getTableHeader(['', 'Antworten', 'Richtig'])}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {new Array(this.state.answersAllowed).fill().map((item, index) => {
                            return (
                                <Table.Row key={'TableRow' + index}>
                                    {TableHandler.getTableCell({element: (index + 1), collapsed: true})}
                                    {TableHandler.getTableCell({
                                        element: (<Form.Input fluid name={'answer' + index}
                                                              value={this.state['answer' + index]}
                                                              onChange={this.handleChange}
                                                              placeholder="Bitte Antwort eingeben" required/>),
                                        collapsed: false
                                    })}
                                    {TableHandler.getTableCell({
                                        element: (
                                            <Form.Field control="input" type="checkbox"
                                                        name={'checked' + index}
                                                        onChange={this.handleChange}
                                                        checked={this.state['checked' + index]}/>),
                                        collapsed: true
                                    })}
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
                <Form.Button content='Submit'/>
                {
                    this.state.fireRedirect && (
                        <Redirect to={{pathname: '/', state: {exercise: this.state}}}/>
                    )
                }
            </Form>
        );
    }
}

