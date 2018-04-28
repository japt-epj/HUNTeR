import React from 'react';
import {Redirect} from 'react-router';

import {Form, Table} from 'semantic-ui-react';

import FormHandler from '../../handlers/FormHandler';
import TableHandler from '../../handlers/TableHandler';
import APIHandler from '../../handlers/APIHandler';


export default class TeacherExercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false,
            id: '',
            name: '',
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
        this.handleSubmit = FormHandler.handleExerciseSubmit.bind(this);
        this.handleChange = FormHandler.handleChange.bind(this);
        this.postData = APIHandler.postData.bind(this);
        this.getJSONHeader = APIHandler.getJSONHeader;
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input fluid label="Name" name="name" value={this.state.name}
                            onChange={this.handleChange}
                            placeholder="Bitte geben Sie einen Name ein" required/>
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
                                    <Table.Cell collapsing>{(index + 1)}</Table.Cell>
                                    <Table.Cell>
                                        <Form.Input fluid name={'answer' + index}
                                                    value={this.state['answer' + index]}
                                                    onChange={this.handleChange}
                                                    placeholder="Bitte Antwort eingeben" required/>
                                    </Table.Cell>
                                    <Table.Cell collapsing>
                                        <Form.Field control="input" type="checkbox"
                                                    name={'checked' + index}
                                                    onChange={this.handleChange}
                                                    checked={this.state['checked' + index]}/>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
                <Form.Button content="Submit"/>
                {this.state.fireRedirect && (<Redirect to="/"/>)}
            </Form>
        );
    }
}

