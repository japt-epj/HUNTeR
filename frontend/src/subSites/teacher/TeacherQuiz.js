import React from 'react';

import {Dimmer, Form, Grid, Loader, Table} from 'semantic-ui-react';

import ExerciseHandler from "../../handlers/ExerciseHandler";


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: [],
            table: [],
            loadingScreen: [(
                <Dimmer active inverted key={'dimmer'}>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
            )],
            loading: true,
            checkboxNeeded: true
        };
        this.getTableRows = ExerciseHandler.getTableRows.bind(this);
    }

    render() {
        return (
            <div>
                {this.state.loading && this.state.loadingScreen}
                <Form>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Input fluid label="Titel"
                                            placeholder="Bitte geben Sie einen Titel für das Quiz ein"/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Table definition>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell/>
                                            <Table.HeaderCell colSpan="3">
                                                Aufgaben welche im Quiz vorhanden sein sollten:
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {!this.state.loading && this.state.table}
                                        {this.getTableRows()}
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Button>Submit</Form.Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </div>
        );
    }
}