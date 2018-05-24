import React from 'react';
import TableHandler from './TableHandler';
import {Form, Pagination, Table} from 'semantic-ui-react';
import defaultUIConfig from '../config/defaultUIConfig';

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
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={headerElements.length + !checkboxNeeded}>
              <Pagination
                totalPages={this.state.maxPageQuiz}
                activePage={this.state.pageNumber}
                onPageChange={this.handlePageChangeQuizzes}
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
