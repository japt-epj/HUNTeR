import React from 'react';

import {Button, Dimmer, Form, Loader, Table} from 'semantic-ui-react';

import TableHandler from '../../handlers/TableHandler';
import ExerciseHandler from "../../handlers/ExerciseHandler";


export default class TeacherExercisesOverview extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectmentChange = this.handleSelectmentChange.bind(this);
        this.state = {
            exercises: [],
            table: [],
            loadingScreen: [(
                <Dimmer active inverted key={'dimmer'}>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
            )],
            loading: true,
            selectedQRCode: ''
        };
        this.getTableRows = ExerciseHandler.getTableRows.bind(this);
    }

    handleSelectmentChange = (e, {value}) => this.setState({qrCodeCheckBox: value});

    render() {
        return (
            <div>
                {this.state.loading && this.state.loadingScreen}
                <Form>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                {TableHandler.getTableHeader(['Titel', 'QR-Code', 'Quote'])}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {!this.state.loading && this.state.table}
                            {this.getTableRows()}
                        </Table.Body>
                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan='3'>
                                    <Button icocolor="green" icon="add square" positive labelPosition="right"
                                            label="Aufgabe hinzufügen"/>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Form>
            </div>
        );
    }
}