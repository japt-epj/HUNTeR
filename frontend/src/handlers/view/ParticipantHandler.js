import React from 'react';

import {Checkbox, Table} from 'semantic-ui-react';
import {paginationHandler, tableHandler} from '../hunterViewHandlers';

export default {
  handleSingleSelection(event, checkbox) {
    let selectedParticipants = [...this.state.selectedParticipants];
    let bulkCheckboxes = [...this.state.bulkCheckboxes];
    const currentBulkCheckboxId = 'BulkCheckbox' + this.state.pageNumber;
    if (checkbox.checked) {
      selectedParticipants.push(checkbox.id);
    } else {
      selectedParticipants.splice(selectedParticipants.lastIndexOf(checkbox.id), 1);
      bulkCheckboxes.splice(selectedParticipants.lastIndexOf(currentBulkCheckboxId), 1);
    }
    this.setState({selectedParticipants, bulkCheckboxes});
  },

  handleBulkSelection(event, checkbox) {
    let selectedParticipants = [...this.state.selectedParticipants];
    let bulkCheckboxes = [...this.state.bulkCheckboxes];
    if (checkbox.checked) {
      this.state.participants.forEach(element => {
        if (selectedParticipants.indexOf(element.id) === -1) {
          selectedParticipants.push(element.id);
        }
      });
      bulkCheckboxes.push(checkbox.id);
    } else {
      this.state.participants.forEach(element => {
        if (selectedParticipants.indexOf(element.id) !== -1) {
          selectedParticipants.splice(selectedParticipants.indexOf(element.id), 1);
        }
      });
      bulkCheckboxes.splice(selectedParticipants.lastIndexOf(checkbox.id), 1);
    }
    this.setState({selectedParticipants, bulkCheckboxes});
  },

  getParticipantTable(checkboxNeeded) {
    let headerElements = ['Vorname', 'Nachname', 'E-Mail'];
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
          {!this.state.loadingParticipants &&
            this.state.participants.map(element => (
              <Table.Row key={'ParticipantRows' + element.id}>
                {checkboxNeeded && (
                  <Table.Cell collapsing>
                    <Checkbox
                      id={element.id}
                      name={element.email}
                      onChange={this.handleSingleSelection}
                      checked={this.state.selectedParticipants.indexOf(element.id) !== -1}
                    />
                  </Table.Cell>
                )}
                <Table.Cell content={element.firstName} />
                <Table.Cell content={element.lastName} />
                <Table.Cell content={element.email} />
              </Table.Row>
            ))}
        </Table.Body>
        {paginationHandler.getPagination({
          totalPages: this.state.maxPageParticipants,
          activePage: this.state.pageNumber,
          onPageChange: this.handlePageChangeParticipants,
          width: headerElements.length + checkboxNeeded
        })}
      </Table>
    );
  }
};
