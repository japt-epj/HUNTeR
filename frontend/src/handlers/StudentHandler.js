import React from 'react';

import {Checkbox, Table} from 'semantic-ui-react';


export default {
    handleSelectment(event, checkbox) {
        let newState = this.state.selectedStudents;
        if (checkbox.checked) {
            newState.push(checkbox.id);
        } else {
            newState.splice(newState.lastIndexOf(checkbox.id), 1);
        }
        this.setState({selectedStudents: newState});
    },
    getStudentTable(checkboxNeeded) {
        return (
            <Table>
                <Table.Body>
                    {!this.state.loadingStudents && this.state.students.map(element =>
                        <Table.Row key={'StudentRows' + element.id}>
                            {checkboxNeeded && <Table.Cell collapsing>
                                <Checkbox id={element.id}
                                          checked={this.state.selectedStudents.indexOf(element.id) !== -1}
                                          onChange={this.handleStudentSelectment}/>
                            </Table.Cell>}
                            <Table.Cell content={element.firstName}/>
                            <Table.Cell content={element.lastName}/>
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan="5">
                            {this.getTablePageButtons(this.state.menuNumber, this.state.minPageNumber, this.state.maxPageNumber)}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
};