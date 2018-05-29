import React from 'react';

import {Checkbox, Table} from 'semantic-ui-react';
import TableHandler from './TableHandler';
import PaginationHandler from './PaginationHandler';

export default {
  handleSelection(event, checkbox) {
    let selectedParticipants = [...this.state.selectedParticipants];
    if (checkbox.checked) {
      if (checkbox.name.startsWith('Bulk')) {
        this.state.participants.forEach(element => {
          if (selectedParticipants.indexOf(element.id) === -1) {
            selectedParticipants.push(element.id);
          }
        });
        this.setState({bulkCheckbox: checkbox.id});
      } else {
        selectedParticipants.push(checkbox.id);
      }
    } else {
      if (checkbox.name.startsWith('Bulk')) {
        this.state.participants.forEach(element => {
          if (selectedParticipants.indexOf(element.id) !== -1) {
            selectedParticipants.splice(
              selectedParticipants.indexOf(element.id),
              1
            );
          }
        });
        this.setState({bulkCheckbox: ''});
      } else {
        selectedParticipants.splice(
          selectedParticipants.lastIndexOf(checkbox.id),
          1
        );
      }
    }
    this.setState({selectedParticipants});
  },

  getParticipantTable(checkboxNeeded) {
    let headerElements = ['Vorname', 'Nachname', 'E-Mail'];
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
          {!this.state.loadingParticipants &&
            this.state.participants.map(element => (
              <Table.Row key={'ParticipantRows' + element.id}>
                {checkboxNeeded && (
                  <Table.Cell collapsing>
                    <Checkbox
                      id={element.id}
                      name={element.email}
                      onChange={this.handleSelection}
                      checked={
                        this.state.selectedParticipants.indexOf(element.id) !==
                        -1
                      }
                    />
                  </Table.Cell>
                )}
                <Table.Cell content={element.firstName} />
                <Table.Cell content={element.lastName} />
                <Table.Cell content={element.email} />
              </Table.Row>
            ))}
        </Table.Body>
        {PaginationHandler.getPagination({
          totalPages: this.state.maxPageParticipant,
          activePage: this.state.pageNumber,
          onPageChange: this.handlePageChangeParticipants,
          width: headerElements.length + checkboxNeeded
        })}
      </Table>
    );
  }
};
