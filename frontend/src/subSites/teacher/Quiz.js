import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import {Form, Table, Segment, Grid, Button} from 'semantic-ui-react';

import ModalHandler from "../../handlers/ModalHandler";
import Data from "../../data/Data";
import TableHandler from "../../handlers/TableHandler";


class Quiz extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
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
                                        {/*new Array(n).fill() needed, otherwise no rendering!*/}
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
                                                    element: ModalHandler.getQRCodeModal(element), collapsed: true
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
            </div>
        );
    }
}

export default Quiz