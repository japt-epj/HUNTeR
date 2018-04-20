import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Dimmer, Form, Loader, Table} from 'semantic-ui-react';

import TableHandler from '../../handlers/TableHandler';
import ExerciseHandler from '../../handlers/ExerciseHandler';
import APIHandler from '../../handlers/APIHandler';


export default class TeacherExercisesOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseTable: [],
            loadingScreen: [(
                <Dimmer active inverted key={'dimmer'}>
                    <Loader size="large">Loading</Loader>
                </Dimmer>
            )],
            loading: true
        };
        this.handleSelectmentChange = this.handleSelectmentChange.bind(this);
        this.getExerciseRows = ExerciseHandler.getExerciseRows.bind(this);
        this.getQRCode = APIHandler.getQRCode;
    }

    handleSelectmentChange = (event, {value}) => this.setState({qrCodeCheckBox: value});

    componentDidMount() {
        this.getExerciseRows(false);
    }

    render() {
        return (
            <div>
                {this.state.loading && this.state.loadingScreen}
                <Form>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                {TableHandler.getTableHeader(['Titel', 'ID', 'Bearbeiten', 'QR-Code'])}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {!this.state.loading && this.state.exerciseTable}
                        </Table.Body>
                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan="4">
                                    <NavLink to="/exercise">
                                        <Button icocolor="green" icon="add square" positive labelPosition="right"
                                                label="Aufgabe hinzufügen"/>
                                    </NavLink>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Form>
            </div>
        );
    }
}