import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Checkbox, Pagination, Table} from 'semantic-ui-react';
import TableHandler from "./TableHandler";


export default {
    handleSelection(event, checkbox) {
        let newState = this.state.selectedExercises;
        let newPositions = this.state.selectedPositions;
        if (checkbox.checked) {
            newState.push(checkbox.id);
            newPositions.set(checkbox.id, undefined);
        } else {
            newState.splice(newState.lastIndexOf(checkbox.id), 1);
            newPositions.delete(checkbox.id);
        }
        this.setState({
            selectedExercises: newState.sort((a, b) => a > b),
            selectedPositions: newPositions
        });
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
                                <Button color="green" basic icon="map pin" onClick={(event) => {
                                    event.preventDefault();
                                    if (this.state.map.currentExercise !== undefined) {
                                        let newPositions = this.state.selectedPositions;
                                        newPositions.set(this.state.map.currentExercise, this.state.map.location);
                                        this.setState({selectedPositions: newPositions});
                                    }
                                    let map = {...this.state.map};
                                    map.currentExercise = element;
                                    map.popupText = element;
                                    if (this.state.selectedPositions.get(element) === undefined) {
                                        map.location = this.state.map.location
                                    } else {
                                        map.location = this.state.selectedPositions.get(element);
                                    }
                                    this.setState({map: map});
                                }
                                }/>
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
                                <Checkbox id={element.id} name={element.title} onChange={this.handleSelection}
                                          checked={this.state.selectedExercises.indexOf(element.id) !== -1}/>
                            </Table.Cell>}
                            <Table.Cell content={element.title}/>
                            <Table.Cell content={element.id} collapsing/>
                            <Table.Cell collapsing>
                                <NavLink to={'/exercise?id=' + element.id}>
                                    <Button type="button" basic icon="edit" color="green"/>
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
                                        onPageChange={this.handlePageChangeExercises}/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
};