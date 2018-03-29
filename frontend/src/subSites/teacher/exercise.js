import React, {Component} from 'react';
import {Form, Button, Table} from 'semantic-ui-react';

import TableHandler from '../../handlers/TableHandler';


class Exercise extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <Form>
                    <Form.Input fluid label="Titel" placeholder="Bitte geben Sie einen Titel ein"/>
                    <Form.TextArea label="Aufgabenfrage" placeholder="Bitte geben Sie eine Frage ein..."/>
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
                                            element: (<Form.Input fluid placeholder="Bitte Antwort eingeben"/>),
                                            collapsed: false
                                        })}
                                        {TableHandler.getTableCell({
                                            element: (<Form.Field control="input" type="checkbox"/>),
                                            collapsed: true
                                        })}
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                    <Form.TextArea label="Erklärungstext"
                                   placeholder="Bitte geben Sie eine Erklärungstext ein..."/>
                    <Button> Submit </Button>
                </Form>
            </div>
        );
    }
}

export default Exercise