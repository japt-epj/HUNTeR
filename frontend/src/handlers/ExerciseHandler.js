import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Checkbox, Icon, Pagination, Table} from 'semantic-ui-react';
import {OK} from 'http-status-codes';

import config from '../config/config';
import TableHandler from './TableHandler';
import APIHandler from './APIHandler';

export default {
  handleSelection(event, checkbox) {
    let selectedCheckboxes = [...this.state.selectedCheckboxes];
    let bulkCheckboxes = [...this.state.bulkCheckboxes];
    let pageNumber = this.state.pageNumber;
    let pageNumberSelectedExercises = this.state.pageNumberSelectedExercises;
    let selectedPositions = new Map(this.state.selectedPositions);
    const startNameBulkCheckbox = 'BulkCheckbox';
    if (checkbox.checked) {
      if (checkbox.name.startsWith(startNameBulkCheckbox)) {
        bulkCheckboxes.push(checkbox.id);
        this.state.exercises.forEach(element => {
          if (selectedCheckboxes.indexOf(element.id) === -1) {
            selectedCheckboxes.push(element.id);
            selectedPositions.set(element.id, undefined);
          }
        });
      } else {
        selectedPositions.set(checkbox.id, undefined);
        selectedCheckboxes.push(checkbox.id);
      }
    } else {
      if (checkbox.name.startsWith(startNameBulkCheckbox)) {
        bulkCheckboxes.splice(selectedCheckboxes.lastIndexOf(checkbox.id), 1);
        this.state.exercises.forEach(element => {
          if (selectedCheckboxes.indexOf(element.id) !== -1) {
            selectedCheckboxes.splice(
              selectedCheckboxes.indexOf(element.id),
              1
            );
            selectedPositions.delete(element.id);
          }
        });
      } else {
        bulkCheckboxes.splice(
          selectedCheckboxes.lastIndexOf(startNameBulkCheckbox + pageNumber),
          1
        );
        selectedPositions.delete(checkbox.id);
        selectedCheckboxes.splice(
          selectedCheckboxes.lastIndexOf(checkbox.id),
          1
        );
      }
    }
    this.setState({
      bulkCheckboxes,
      selectedCheckboxes: selectedCheckboxes.sort((a, b) => a > b),
      selectedPositions
    });
    APIHandler.getExerciseArray(
      selectedCheckboxes.slice(
        (pageNumberSelectedExercises - 1) * this.exerciseLimitPerPage,
        pageNumberSelectedExercises * this.exerciseLimitPerPage
      )
    ).then(resData => {
      if (resData.status === OK) {
        this.setState({
          selectedExercises: selectedCheckboxes.length !== 0 ? resData.data : []
        });
      } else {
        console.error('Error:' + resData);
      }
    });
  },

  getSelectedExerciseTable() {
    let headerElements = ['Name', 'Standort gesetzt', 'Standort setzen'];
    const maxElementsPerPage = 5;
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
                  color={config.buttonColors.normal}
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
                  this.state.selectedCheckboxes.length % maxElementsPerPage ===
                  0
                    ? this.state.selectedCheckboxes.length / maxElementsPerPage
                    : parseInt(
                        this.state.selectedCheckboxes.length /
                          maxElementsPerPage,
                        10
                      ) + 1
                }
                activePage={this.state.pageNumberSelectedExercises}
                onPageChange={this.handlePageChangeSelected}
                pointing
                secondary
                color="green"
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
                this.state.bulkCheckboxes,
                this.handleSelection
              )}
            {TableHandler.getTableHeader(headerElements)}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!this.state.loading &&
            this.state.exercises.map(element => (
              <Table.Row key={'TableRow' + element.id}>
                {checkboxNeeded && (
                  <Table.Cell collapsing>
                    <Checkbox
                      id={element.id}
                      name={element.name}
                      onChange={this.handleSelection}
                      checked={
                        this.state.selectedCheckboxes.indexOf(element.id) !== -1
                      }
                    />
                  </Table.Cell>
                )}
                <Table.Cell content={element.name} />
                <Table.Cell content={element.id} collapsing />
                <Table.Cell collapsing>
                  <NavLink to={'/exercise?id=' + element.id}>
                    <Button
                      color={config.buttonColors.normal}
                      icon="edit"
                      basic
                    />
                  </NavLink>
                </Table.Cell>
                <Table.Cell collapsing>
                  <Button
                    color={config.buttonColors.download}
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
                pointing
                secondary
                color="green"
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
};
