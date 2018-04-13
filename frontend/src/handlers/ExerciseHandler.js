import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Form, Table} from 'semantic-ui-react';

import APIHandler from "./APIHandler";

export default class ExerciseHandler {
    static getTableRows() {
        APIHandler.getExercises().then(resData => {
                if (resData.size !== 0) {
                    this.setState({
                        exercises: resData,
                        table: (
                            resData.map(element =>
                                <Table.Row key={'TableRow' + element.id}>
                                    {this.state.checkboxNeeded && (
                                        <Table.Cell verticalAlign="middle">
                                            <Form.Checkbox/>
                                        </Table.Cell>
                                    )}
                                    <Table.Cell>{element.title}</Table.Cell>
                                    <Table.Cell verticalAlign="middle" collapsing>
                                        <NavLink to={'/exercise?id=' + element.id}>
                                            <Button basic icon="edit" color="green"/>
                                        </NavLink>
                                    </Table.Cell>
                                    <Table.Cell verticalAlign="middle" collapsing>
                                        <Button color="orange" basic icon="qrcode"
                                                onClick={APIHandler.getExerciseData(element.id)}/>
                                    </Table.Cell>
                                </Table.Row>
                            )),
                        loading: false
                    });
                }
            }
        );
    }
}