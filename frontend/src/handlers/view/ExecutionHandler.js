import React from 'react';

import {Button, Table} from 'semantic-ui-react';

import {colors} from '../../config/hunterUiDefaults';
import {apiGetHandler} from '../hunterApiHandlers';
import {paginationHandler, tableHandler} from '../hunterViewHandlers';

export default {
  getExecutionTable() {
    let headerElements = ['Name', 'ID', 'QR-Codes herunterladen'];
    return (
      <Table>
        <Table.Header>
          <Table.Row>{tableHandler.getTableHeader(headerElements)}</Table.Row>
        </Table.Header>
        <Table.Body>
          {!this.state.loading &&
            this.state.executions.map(element => (
              <Table.Row key={'TableRow' + element.id}>
                <Table.Cell content={element.name} />
                <Table.Cell content={element.id} collapsing />
                <Table.Cell collapsing textAlign="center">
                  <Button
                    color={colors.buttonColors.download}
                    icon="download"
                    basic
                    onClick={() => apiGetHandler.downloadExecutionQRCodePDF(element.id)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
        {paginationHandler.getPagination({
          totalPages: this.state.maxPage,
          activePage: this.state.pageNumber,
          onPageChange: this.handlePageChangeExecutions,
          width: headerElements.length
        })}
      </Table>
    );
  }
};
