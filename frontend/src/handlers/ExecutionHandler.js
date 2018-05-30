import React from 'react';

import {Button, Table} from 'semantic-ui-react';

import TableHandler from './TableHandler';
import APIHandler from './APIHandler';
import defaultColors from '../config/defaultColors';
import PaginationHandler from './PaginationHandler';

export default {
  getExecutionTable() {
    let headerElements = ['Name', 'ID', 'QR-Codes herunterladen'];
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
                <Table.Cell collapsing textAlign="center">
                  <Button
                    color={defaultColors.buttonColors.download}
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
        {PaginationHandler.getPagination({
          totalPages: this.state.maxPage,
          activePage: this.state.pageNumber,
          onPageChange: this.handlePageChangeExecutions,
          width: headerElements.length
        })}
      </Table>
    );
  }
};
