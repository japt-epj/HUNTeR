import React from 'react';

import {Button, Checkbox, Icon, Table} from 'semantic-ui-react';
import {OK} from 'http-status-codes';

import {colors} from '../../config/hunterUiDefaults';
import {apiGetHandler} from '../hunterApiHandlers';
import {paginationHandler, tableHandler} from '../hunterViewHandlers';
import ShowExerciseModal from '../../components/ShowExerciseModal';
import ShowExerciseEditModal from '../../components/ShowExerciseEditModal';

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
      bulkCheckboxes.splice(selectedCheckboxes.lastIndexOf(currentBulkCheckboxId), 1);
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
      selectedCheckboxes: values.selectedCheckboxes.sort((a, b) => b - a),
      selectedPositions: values.selectedPositions
    });
    apiGetHandler
      .getElementArray(
        'exercise/',
        values.selectedCheckboxes.slice(
          (this.state.pageNumberSelectedExercises - 1) * this.exerciseLimitPerPage,
          this.state.pageNumberSelectedExercises * this.exerciseLimitPerPage
        )
      )
      .then(resData => {
        if (resData.status === OK) {
          this.setState({
            selectedExercises: values.selectedCheckboxes.length !== 0 ? resData.data : []
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
          <Table.Row>{tableHandler.getTableHeader(headerElements)}</Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.selectedExercises.map(element => (
            <Table.Row key={'TableRow' + element.id}>
              <Table.Cell content={element.name} />
              <Table.Cell collapsing>
                {Boolean(this.state.selectedPositions.get(element.id)) && (
                  <Icon color={colors.mainColor} name="check" />
                )}
              </Table.Cell>
              <Table.Cell collapsing>
                <Button
                  color={colors.buttonColors.normal}
                  basic
                  icon="point"
                  onClick={event => {
                    event.preventDefault();
                    this.addPosition(element);
                  }}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        {paginationHandler.getPagination({
          totalPages: paginationHandler.calculateTotalPages(this.state.selectedCheckboxes.length, maxElementsPerPage),
          activePage: this.state.pageNumberSelectedExercises,
          onPageChange: this.pageChangeSelectedExercises,
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
              tableHandler.getBulkCheckbox(this.state.pageNumber, this.state.bulkCheckboxes, this.handleBulkSelection)}
            {tableHandler.getTableHeader(headerElements)}
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
                      checked={this.state.selectedCheckboxes.indexOf(element.id) !== -1}
                    />
                  </Table.Cell>
                )}
                <Table.Cell content={element.name} />
                <Table.Cell content={element.id} collapsing />
                <Table.Cell textAlign="center" collapsing>
                  <ShowExerciseEditModal exerciseId={element.id} />
                </Table.Cell>
                <Table.Cell textAlign="center" collapsing>
                  <ShowExerciseModal id={element.id} />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
        {paginationHandler.getPagination({
          totalPages: this.state.maxPage,
          activePage: this.state.pageNumber,
          onPageChange: this.pageChangeExercises,
          width: headerElements.length + checkboxNeeded
        })}
      </Table>
    );
  }
};
