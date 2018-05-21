import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Form, Pagination, Table} from 'semantic-ui-react';

import TableHandler from './TableHandler';

export default {
  getQuizTable(checkboxNeeded) {
    let headerElements = ['Name', 'ID', 'Bearbeiten'];
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
                <Table.Cell>{element.name}</Table.Cell>
                <Table.Cell collapsing>{element.id}</Table.Cell>
                <Table.Cell collapsing>
                  <NavLink to={'/quiz'}>
                    <Button color="green" icon="edit" basic />
                  </NavLink>
                </Table.Cell>
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
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
};
