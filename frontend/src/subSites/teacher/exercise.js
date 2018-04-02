import React, {Component} from 'react';
import {Form, Button, Table} from 'semantic-ui-react';
import axios from 'axios';

import TableHandler from '../../handlers/TableHandler';


class Exercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            question: '',
            answerOptions: {
                A: {text: '', correct: false},
                B: {text: '', correct: false},
                C: {text: '', correct: false},
                D: {text: '', correct: false}
            },
            explanation: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const regex = /(option(Answer|Checkbox))([A-D])/;
        const match = regex.exec(name);
        if (match === null) {
            this.setState({[name]: target.value});
        } else if (match[1] === 'optionAnswer') {
            let answerOptions = {...this.state.answerOptions};
            answerOptions[match[3]].text = target.value;
            this.setState({answerOptions});
        } else if (match[1] === 'optionCheckbox') {
            let answerOptions = {...this.state.answerOptions};
            answerOptions[match[3]].correct = target.checked;
            this.setState({answerOptions});
        }
        console.log(this.state);
    }

    handleSubmit() {
        let isACheckboxSet = false;
        Object.keys(this.state.answerOptions).forEach(element => {
            isACheckboxSet = isACheckboxSet || this.state.answerOptions[element].correct;
        });
        if (isACheckboxSet) {
            axios.post('https://jsonplaceholder.typicode.com/posts',
                this.state
            ).then(res => console.log(res))
                .catch(e => console.log(e));
        } else{
            alert('Keine Antwort wurde als richtig markiert!');
        }
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input fluid label="Titel" name="title" value={this.title} onChange={this.handleChange}
                            placeholder="Bitte geben Sie einen Titel ein" required/>
                <Form.TextArea label="Aufgabenfrage" name="question" value={this.question} onChange={this.handleChange}
                               placeholder="Bitte geben Sie eine Frage ein..." required/>
                <Table definition>
                    <Table.Header>
                        <Table.Row>
                            {TableHandler.getTableHeader(['', 'Antworten', 'Richtig'])}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {new Array(4).fill().map((item, index) => {
                            const ANSWER = String.fromCharCode(65 + index);
                            return (
                                <Table.Row key={'TableRow' + index}>
                                    {TableHandler.getTableCell({element: ANSWER, collapsed: true})}
                                    {TableHandler.getTableCell({
                                        element: (<Form.Input fluid name={'optionAnswer' + ANSWER}
                                                              value={this.state.answerOptions[ANSWER].text}
                                                              onChange={this.handleChange}
                                                              placeholder="Bitte Antwort eingeben" required/>),
                                        collapsed: false
                                    })}
                                    {TableHandler.getTableCell({
                                        element: (
                                            <Form.Field control="input" type="checkbox"
                                                        name={'optionCheckbox' + ANSWER}
                                                        onChange={this.handleChange}
                                                        checked={this.state.answerOptions[ANSWER].correct}/>),
                                        collapsed: true
                                    })}
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
                <Form.TextArea label="Erklärungstext" name="explanation" value={this.question}
                               onChange={this.handleChange}
                               placeholder="Bitte geben Sie eine Erklärungstext ein..." required/>
                <Button> Submit </Button>
            </Form>
        );
    }
}

export default Exercise