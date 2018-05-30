import React from 'react';
import TableHandler from './TableHandler';
import {Form, Table} from 'semantic-ui-react';
import PaginationHandler from './PaginationHandler';

export default {
  getQuizTable(checkboxNeeded) {
    let headerElements = ['Name', 'ID'];
    if (checkboxNeeded) {
      headerElements.unshift('');
    }
    return (
      <Table>
        <Table.Header>
          <Table.Row>{TableHandler.getTableHeader(headerElements)}</Table.Row>
        </Table.Header>
        <Table.Body>
          {!this.state.loadingQuizzes &&
            this.state.quizzes.map(element => (
              <Table.Row key={'TableRow' + element.id}>
                {checkboxNeeded && (
                  <Table.Cell collapsing>
                    <Form.Radio
                      value={element.id}
                      checked={this.state.selectedQuizId === element.id}
                      onChange={this.handleQuizSelectChange}
                    />
                  </Table.Cell>
                )}
                <Table.Cell>{element.name}</Table.Cell>
                <Table.Cell>{element.id}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
        {PaginationHandler.getPagination({
          totalPages: this.state.maxPageQuizzes,
          activePage: this.state.pageNumber,
          onPageChange: this.handlePageChangeQuizzes,
          width: headerElements.length + checkboxNeeded
        })}
      </Table>
    );
  }
};
