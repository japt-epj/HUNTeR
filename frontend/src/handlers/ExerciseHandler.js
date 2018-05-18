import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Checkbox, Icon, Pagination, Table} from 'semantic-ui-react';
import {OK} from 'http-status-codes';

import TableHandler from './TableHandler';
import APIHandler from './APIHandler';

export default {
  handleSelection(event, checkbox) {
    let newState = this.state.selected;
    let currentPage = this.state.pageNumberSelected;
    let newPositions = this.state.selectedPositions;
    let limit = this.state.limit;
    if (checkbox.checked) {
      if (checkbox.name.startsWith('Bulk')) {
        this.state.exercises.forEach(element => {
          if (newState.indexOf(element.id) === -1) {
            newState.push(element.id);
            newPositions.set(element.id, undefined);
          }
        });
        this.setState({bulkCheckbox: checkbox.id});
      } else {
        newPositions.set(checkbox.id, undefined);
        newState.push(checkbox.id);
      }
    } else {
      if (checkbox.name.startsWith('Bulk')) {
        this.state.exercises.forEach(element => {
          if (newState.indexOf(element.id) !== -1) {
            newState.splice(newState.indexOf(element.id), 1);
            newPositions.delete(element.id);
          }
        });
        this.setState({bulkCheckbox: ''});
      } else {
        newPositions.delete(checkbox.id);
        newState.splice(newState.lastIndexOf(checkbox.id), 1);
      }
    }
    this.setState({
      selected: newState.sort((a, b) => a > b),
      selectedPositions: newPositions
    });
    APIHandler.getExerciseArray(
      newState.slice((currentPage - 1) * limit, currentPage * limit)
    ).then(resData => {
      if (resData.status === OK) {
        this.setState({
          selectedExercises: newState.length !== 0 ? resData.data : []
        });
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
          <Table.Row>{TableHandler.getTableHeader(headerElements)}</Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.selectedExercises.map(element => (
            <Table.Row key={'TableRow' + element.id}>
              <Table.Cell content={element.name} />
              <Table.Cell collapsing>
                {this.state.selectedPositions.get(element.id) !== undefined && (
                  <Icon color="green" name="check" />
                )}
              </Table.Cell>
              <Table.Cell collapsing>
                <Button
                  color="green"
                  basic
                  icon="point"
                  onClick={event => {
                    event.preventDefault();
                    if (this.state.map.currentExercise !== undefined) {
                      let newPositions = this.state.selectedPositions;
                      newPositions.set(
                        this.state.map.currentExercise,
                        this.state.map.location
                      );
                      this.setState({selectedPositions: newPositions});
                    }
                    let map = {...this.state.map};
                    map.currentExercise = element.id;
                    map.popupText = element.name;
                    if (
                      this.state.selectedPositions.get(element.id) === undefined
                    ) {
                      map.location = this.state.map.location;
                    } else {
                      map.location = this.state.selectedPositions.get(
                        element.id
                      );
                    }
                    this.setState({map: map});
                  }}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={headerElements.length}>
              <Pagination
                totalPages={
                  this.state.selected.length % 5 === 0
                    ? this.state.selected.length / 5
                    : parseInt(this.state.selected.length / 5, 10) + 1
                }
                activePage={this.state.pageNumberSelected}
                onPageChange={this.handlePageChangeSelected}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  },
  getExerciseTable(checkboxNeeded) {
    let headerElements = ['Name', 'ID', 'Bearbeiten', 'QR-Code'];
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            {checkboxNeeded &&
              TableHandler.getBulkCheckbox(
                this.state.pageNumber,
                this.state.bulkCheckbox,
                this.handleSelection
              )}
            {TableHandler.getTableHeader(headerElements)}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!this.state.loadingExercises &&
            this.state.exercises.map(element => (
              <Table.Row key={'TableRow' + element.id}>
                {checkboxNeeded && (
                  <Table.Cell collapsing>
                    <Checkbox
                      id={element.id}
                      name={element.name}
                      onChange={this.handleSelection}
                      checked={this.state.selected.indexOf(element.id) !== -1}
                    />
                  </Table.Cell>
                )}
                <Table.Cell content={element.name} />
                <Table.Cell content={element.id} collapsing />
                <Table.Cell collapsing>
                  <NavLink to={'/exercise?id=' + element.id}>
                    <Button color="green" icon="edit" basic />
                  </NavLink>
                </Table.Cell>
                <Table.Cell collapsing>
                  <Button
                    color="orange"
                    icon="qrcode"
                    basic
                    onClick={() => APIHandler.downloadQRCode(element.id)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
              <Pagination
                totalPages={this.state.maxPage}
                activePage={this.state.pageNumber}
                onPageChange={this.handlePageChangeExercises}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
};
