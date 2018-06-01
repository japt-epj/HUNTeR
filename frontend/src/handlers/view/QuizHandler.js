import React from 'react';

import {Form, Table} from 'semantic-ui-react';

import {paginationHandler, tableHandler} from '../hunterViewHandlers';
import ShowQuizModal from '../../components/ShowQuizModal';

export default {
  getQuizTable(checkboxNeeded) {
    let headerElements = ['Name', 'ID', 'Einsehen'];
    if (checkboxNeeded) {
      headerElements.unshift('');
    }
    return (
      <Table>
        <Table.Header>
          <Table.Row>{tableHandler.getTableHeader(headerElements)}</Table.Row>
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
                <Table.Cell content={element.name} />
                <Table.Cell content={element.id} collapsing />
                <Table.Cell textAlign="center" collapsing>
                  <ShowQuizModal id={element.id} />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
        {paginationHandler.getPagination({
          totalPages: this.state.maxPageQuizzes,
          activePage: this.state.pageNumber,
          onPageChange: this.handlePageChangeQuizzes,
          width: headerElements.length + checkboxNeeded
        })}
      </Table>
    );
  }
};
