import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Pagination, Table} from 'semantic-ui-react';

import TableHandler from './TableHandler';
import APIHandler from './APIHandler';
import defaultUIConfig from '../config/defaultUIConfig';

export default {
  getExecutionTable() {
    let headerElements = ['Name', 'ID', 'Bearbeiten', 'QR-Codes herunterladen'];
    return (
      <Table>
        <Table.Header>
          <Table.Row>{TableHandler.getTableHeader(headerElements)}</Table.Row>
        </Table.Header>
        <Table.Body>
          {!this.state.loading &&
            this.state.executions.map(element => (
              <Table.Row key={'TableRow' + element.id}>
                <Table.Cell content={element.name} />
                <Table.Cell content={element.id} collapsing />
                <Table.Cell collapsing>
                  <NavLink to={'/execution'}>
                    <Button color="green" icon="edit" basic />
                  </NavLink>
                </Table.Cell>
                <Table.Cell collapsing>
                  <Button
                    color="orange"
                    icon="download"
                    basic
                    onClick={() =>
                      APIHandler.downloadExecutionQRCodePDF(element.id)
                    }
                  />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={headerElements.length}>
              <Pagination
                totalPages={this.state.maxPage}
                activePage={this.state.pageNumber}
                onPageChange={this.handlePageChangeExecutions}
                pointing
                secondary
                color={defaultUIConfig.paginationColor}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
};
