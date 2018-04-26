import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Checkbox, Modal, Pagination, Table} from 'semantic-ui-react';
import TableHandler from "./TableHandler";


export default {
    handleSelection(event, checkbox) {
        let newState = this.state.selectedExercises;
        if (checkbox.checked) {
            newState.push(checkbox.id);
        } else {
            newState.splice(newState.lastIndexOf(checkbox.id), 1);
        }
        this.setState({selectedExercises: newState});
    },

    getSelectedExerciseTable() {
        let headerElements = ['Titel', 'Standort setzen'];
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        {TableHandler.getTableHeader(headerElements)}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.selectedExercises.map(element =>
                        <Table.Row key={'TableRow' + element}>
                            <Table.Cell content={element}/>
                            <Table.Cell collapsing>
                                <Modal size="fullscreen"
                                       trigger={<Button color="green" basic icon="map pin"/>}
                                       closeIcon>
                                    <Modal.Header content="Ort setzen"/>
                                    <Modal.Content>
                                        Hallo
                                    </Modal.Content>
                                </Modal>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        );
    },

    getExerciseTable(checkboxNeeded) {
        let headerElements = ['Titel', 'ID', 'Bearbeiten', 'QR-Code'];
        if (checkboxNeeded) {
            headerElements.unshift('');
        }

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        {TableHandler.getTableHeader(headerElements)}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {!this.state.loadingExercises && this.state.exercises.map(element =>
                        <Table.Row key={'TableRow' + element.id}>
                            {checkboxNeeded && <Table.Cell collapsing>
                                <Checkbox id={element.id} onChange={this.handleSelection}
                                          checked={this.state.selectedExercises.indexOf(element.id) !== -1}/>
                            </Table.Cell>}
                            <Table.Cell content={element.title}/>
                            <Table.Cell content={element.id} collapsing/>
                            <Table.Cell collapsing>
                                <NavLink to={'/exercise?id=' + element.id}>
                                    <Button basic icon="edit" color="green"/>
                                </NavLink>
                            </Table.Cell>
                            <Table.Cell collapsing>
                                <Button color="orange" basic icon="qrcode"
                                        onClick={() => this.downloadQRCode(element.id)}/>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan="5">
                            <Pagination totalPages={this.state.maxPage} activePage={this.state.pageNumber}
                                        onPageChange={this.handlePageChange}/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
};