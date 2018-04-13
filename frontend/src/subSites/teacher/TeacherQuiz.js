import React from 'react';

import {Button, Dimmer, Form, Grid, Loader, Modal, Table} from 'semantic-ui-react';

import Data from '../../data/Data';
import ExerciseHandler from '../../handlers/ExerciseHandler';

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

            <Form>

                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Input fluid label="Titel" placeholder="Bitte geben Sie einen Titel ein"/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Modal size="fullscreen"
                                   trigger={<Button>Benutzer hinzufügen</Button>}
                                   closeIcon>
                                {this.state.loading && this.state.loadingScreen}
                                <Modal.Content>
                                    <Modal.Description>
                                        <Table>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell colSpan="4">Aufgaben im Quiz:</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                {Data.getStudents().map((element, index) =>
                                                    <Table.Row key={'TableRow' + index}>
                                                        <Table.Cell collapsing><Form.Field control="input"
                                                                                           type="checkbox"/>
                                                        </Table.Cell>
                                                        <Table.Cell>{element.email}</Table.Cell>
                                                    </Table.Row>
                                                )}
                                            </Table.Body>
                                        </Table>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color="green" icon="add" label="Hinzufügen"/>
                                </Modal.Actions>
                            </Modal>
                            <Modal size="fullscreen"
                                   trigger={<Button>Aufgaben hinzufügen</Button>}
                                   closeIcon>
                                {this.state.loading && this.state.loadingScreen}
                                <Modal.Header>{'Aufgaben hinzufügen'}</Modal.Header>
                                <Modal.Content>
                                    <Modal.Description>
                                        <Table>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell colSpan="4">Aufgaben im Quiz:</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            {!this.state.loading && this.state.table}
                                            {this.getTableRows()}
                                        </Table>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color="green" icon="add" label="Aktualisieren"/>
                                </Modal.Actions>
                            </Modal>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Button>Submit</Form.Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        );
    }
}