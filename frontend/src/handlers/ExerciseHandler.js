import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Checkbox, Icon, Pagination, Table} from 'semantic-ui-react';

import TableHandler from "./TableHandler";
import APIHandler from "./APIHandler";


export default {
    handleSelection(event, checkbox) {
        let newState = this.state.selected;
        let newPositions = this.state.selectedPositions;
        let currentPage = this.state.pageNumberSelected;
        let limit = this.state.limit;
        if (checkbox.checked) {
            newState.push(checkbox.id);
            newPositions.set(checkbox.id, undefined);
        } else {
            newState.splice(newState.lastIndexOf(checkbox.id), 1);
            newPositions.delete(checkbox.id);
        }
        this.setState({
            selected: newState.sort((a, b) => a > b),
            selectedPositions: newPositions
        });
        APIHandler.getExerciseArray(newState.slice((currentPage - 1) * limit, currentPage * limit)).then(resData => {
            if (resData.status === 200) {
                this.setState({selectedExercises: resData.data})
            } else {
                console.log('Error:' + resData);
            }
        });
    },

    getSelectedExerciseTable() {
        let headerElements = ['Name', 'Standort gesetzt', 'Standort setzen'];
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        {TableHandler.getTableHeader(headerElements)}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.selectedExercises.map(element =>
                        <Table.Row key={'TableRow' + element.id}>
                            <Table.Cell content={element.name}/>
                            <Table.Cell collapsing>
                                {this.state.selectedPositions.get(element.id) !== undefined &&
                                <Icon color="green" name="check"/>}
                            </Table.Cell>
                            <Table.Cell collapsing>
                                <Button color="green" basic icon="point" onClick={(event) => {
                                    event.preventDefault();
                                    if (this.state.map.currentExercise !== undefined) {
                                        let newPositions = this.state.selectedPositions;
                                        newPositions.set(this.state.map.currentExercise, this.state.map.location);
                                        this.setState({selectedPositions: newPositions});
                                    }
                                    let map = {...this.state.map};
                                    map.currentExercise = element.id;
                                    map.popupText = element.name;
                                    if (this.state.selectedPositions.get(element.id) === undefined) {
                                        map.location = this.state.map.location
                                    } else {
                                        map.location = this.state.selectedPositions.get(element.id);
                                    }
                                    this.setState({map: map});
                                }
                                }/>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan={headerElements.length}>
                            <Pagination totalPages={parseInt(this.state.selected.length / 5, 10) + 1}
                                        activePage={this.state.pageNumberSelected}
                                        onPageChange={this.handlePageChangeSelected}/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    },

    getExerciseTable(checkboxNeeded) {
        let headerElements = ['Name', 'ID', 'Bearbeiten', 'QR-Code'];
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
                                <Checkbox id={element.id} name={element.name} onChange={this.handleSelection}
                                          checked={this.state.selected.indexOf(element.id) !== -1}/>
                            </Table.Cell>}
                            <Table.Cell content={element.name}/>
                            <Table.Cell content={element.id} collapsing/>
                            <Table.Cell collapsing>
                                <NavLink to={'/exercise?id=' + element.id}>
                                    <Button type="button" basic icon="edit" color="green"/>
                                </NavLink>
                            </Table.Cell>
                            <Table.Cell collapsing>
                                <Button color="orange" basic icon="qrcode"
                                        onClick={() => APIHandler.downloadQRCode(element.id)}/>
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