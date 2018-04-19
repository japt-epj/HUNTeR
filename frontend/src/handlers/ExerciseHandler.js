import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Form, Table} from 'semantic-ui-react';

import APIHandler from './APIHandler';

export default class ExerciseHandler {
    static getExerciseTableRows() {
        APIHandler.getExercises(this.state.menuNumber * this.state.maxPage, this.state.menuNumber * this.state.maxPage + 9).then(resData => {
                if (resData.status === 200) {
                    this.setState({
                        exerciseTable: (
                            resData.data.map(element =>
                                <Table.Row key={'TableRow' + element.id}>
                                    {this.state.checkboxNeeded && (
                                        <Table.Cell collapsing content={<Form.Checkbox/>}/>
                                    )}
                                    <Table.Cell content={element.title}/>
                                    <Table.Cell content={element.id} collapsing/>
                                    <Table.Cell collapsing>
                                        <NavLink to={'/exercise?id=' + element.id}>
                                            <Button basic icon="edit" color="green"/>
                                        </NavLink>
                                    </Table.Cell>
                                    <Table.Cell collapsing>
                                        <Button color="orange" basic icon="qrcode"
                                                onClick={() => this.getQRCode(element.id)}/>
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