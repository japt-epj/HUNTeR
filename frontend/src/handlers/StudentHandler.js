import React from 'react';
import {Checkbox, Table} from 'semantic-ui-react';
import APIHandler from "./APIHandler";


export default class StudentHandler{
    static handleSelectment(event, checkbox) {
        let newState = [...this.state.selectedStudents];
        if (checkbox.checked) {
            newState.push(checkbox.index);
        } else {
            newState.splice(newState.lastIndexOf(checkbox.index), 1);
        }
        this.setState({selectedStudents: newState});
    }

    static getStudentRows() {
        APIHandler.getStudents().then(resData => {
            if (resData.status === 200) {
                this.setState({
                    studentTable: (
                        resData.data.map(element =>
                            <Table.Row key={'TableRow' + element.id}>
                                {this.state.checkboxNeeded && (
                                    <Table.Cell collapsing>
                                        <Checkbox name={element.id.toString()}
                                                  checked={this.state.selectedStudents.indexOf(element.id) !== -1}
                                                  onChange={this.handleSelectment}/>
                                    </Table.Cell>
                                )}
                                <Table.Cell content={element.firstName}/>
                                <Table.Cell content={element.lastName}/>
                            </Table.Row>
                        )),
                    loading: false
                });
            }
        })
    }
}