import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Form, Grid, Segment, Table} from 'semantic-ui-react';

import Data from "../../data/Data";
import ModalHandler from "../../handlers/ModalHandler";
import TableHandler from "../../handlers/TableHandler";


export default function getQuiz() {
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
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell colSpan="4">Aufgaben im Quiz:</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {Data.getExercises().map((element, index) =>
                                    <Table.Row key={'TableRow' + index}>
                                        {TableHandler.getTableCell({
                                            element: (<Form.Field control="input"
                                                                  type="checkbox"/>), collapsed: true
                                        })}
                                        {TableHandler.getTableCell({
                                            element: (<Segment>{element.title}</Segment>), collapsed: false
                                        })}
                                        {TableHandler.getTableCell({
                                            element: (
                                                <NavLink to={'/exercise?id=' + element.key}>
                                                    <Button basic icon="edit" color="green"/></NavLink>),
                                            collapsed: true
                                        })}
                                        {TableHandler.getTableCell({
                                            element: ModalHandler.getQRCode(element), collapsed: true
                                        })}
                                    </Table.Row>
                                )}
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
    );
}