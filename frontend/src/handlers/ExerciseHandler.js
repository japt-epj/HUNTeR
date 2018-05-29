import React from 'react';

import {Button, Checkbox, Icon, Table} from 'semantic-ui-react';
import {OK} from 'http-status-codes';

import defaultUIConfig from '../config/defaultUIConfig';
import ShowExerciseModal from '../components/ShowExerciseModal';
import TableHandler from './TableHandler';
import APIHandler from './APIHandler';
import ShowExerciseEditModal from '../components/ShowExerciseEditModal';
import PaginationHandler from './PaginationHandler';

export default {
  handleSingleSelection(event, checkbox) {
    let selectedCheckboxes = [...this.state.selectedCheckboxes];
    let bulkCheckboxes = [...this.state.bulkCheckboxes];
    let selectedPositions = new Map(this.state.selectedPositions);
    const currentBulkCheckboxId = 'BulkCheckbox' + this.state.pageNumber;
    if (checkbox.checked) {
      selectedPositions.set(checkbox.id, undefined);
      selectedCheckboxes.push(checkbox.id);
    } else {
      selectedPositions.delete(checkbox.id);
      selectedCheckboxes.splice(selectedCheckboxes.lastIndexOf(checkbox.id), 1);
      bulkCheckboxes.splice(
        selectedCheckboxes.lastIndexOf(currentBulkCheckboxId),
        1
      );
    }

    this.updateSelection({
      bulkCheckboxes,
      selectedCheckboxes,
      selectedPositions
    });
  },

  handleBulkSelection(event, checkbox) {
    let selectedCheckboxes = [...this.state.selectedCheckboxes];
    let bulkCheckboxes = [...this.state.bulkCheckboxes];
    let selectedPositions = new Map(this.state.selectedPositions);
    if (checkbox.checked) {
      this.state.exercises.forEach(element => {
        if (selectedCheckboxes.indexOf(element.id) === -1) {
          selectedCheckboxes.push(element.id);
          selectedPositions.set(element.id, undefined);
        }
      });
      bulkCheckboxes.push(checkbox.id);
    } else {
      this.state.exercises.forEach(element => {
        if (selectedCheckboxes.indexOf(element.id) !== -1) {
          selectedCheckboxes.splice(selectedCheckboxes.indexOf(element.id), 1);
          selectedPositions.delete(element.id);
        }
      });
      bulkCheckboxes.splice(selectedCheckboxes.lastIndexOf(checkbox.id), 1);
    }
    this.updateSelection({
      bulkCheckboxes,
      selectedCheckboxes,
      selectedPositions
    });
  },

  updateSelection(values) {
    this.setState({
      bulkCheckboxes: values.bulkCheckboxes,
      selectedCheckboxes: values.selectedCheckboxes.sort((a, b) => a > b),
      selectedPositions: values.selectedPositions
    });
    APIHandler.getExerciseArray(
      values.selectedCheckboxes.slice(
        (this.state.pageNumberSelectedExercises - 1) *
          this.exerciseLimitPerPage,
        this.state.pageNumberSelectedExercises * this.exerciseLimitPerPage
      )
    ).then(resData => {
      if (resData.status === OK) {
        this.setState({
          selectedExercises:
            values.selectedCheckboxes.length !== 0 ? resData.data : []
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
                  color={defaultUIConfig.buttonColors.normal}
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
        {PaginationHandler.getPagination({
          totalPages: PaginationHandler.calculateTotalPages(
            this.state.selectedCheckboxes.length,
            maxElementsPerPage
          ),
          activePage: this.state.pageNumberSelectedExercises,
          onPageChange: this.handlePageChangeSelected,
          width: headerElements.length
        })}
      </Table>
    );
  },

  getExerciseTable(checkboxNeeded) {
    let headerElements = ['Name', 'ID', 'Bearbeiten', 'Einsehen'];
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            {checkboxNeeded &&
              TableHandler.getBulkCheckbox(
                this.state.pageNumber,
                this.state.bulkCheckboxes,
                this.handleBulkSelection
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
                      onChange={this.handleSingleSelection}
                      checked={
                        this.state.selectedCheckboxes.indexOf(element.id) !== -1
                      }
                    />
                  </Table.Cell>
                )}
                <Table.Cell content={element.name} />
                <Table.Cell content={element.id} collapsing />
                <Table.Cell collapsing>
                  <ShowExerciseEditModal exerciseId={element.id} />
                </Table.Cell>
                <Table.Cell collapsing>
                  <ShowExerciseModal id={element.id} />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
        {PaginationHandler.getPagination({
          totalPages: this.state.maxPage,
          activePage: this.state.pageNumber,
          onPageChange: this.handlePageChangeExercises,
          width: headerElements.length + checkboxNeeded
        })}
      </Table>
    );
  }
};
