import React from 'react';
import TableHandler from "./TableHandler";
import {Form, Pagination, Table} from "semantic-ui-react";

export default {

    getQuizTable() {
        let headerElements = ['','Name'];
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        {TableHandler.getTableHeader(headerElements)}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {!this.state.loadingQuizzes && this.state.quizzes.map(element =>
                    <Table.Row key={'TableRow' + element.id}>
                        <Table.Cell>
                            <Form.Radio value={element.id}
                                        checked={this.state.selectedQuizId === element.id}
                                        onChange={this.handleSelectChange}/>
                        </Table.Cell>
                        <Table.Cell>
                            {element.name}
                        </Table.Cell>
                    </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan="5">
                            <Pagination totalPages={this.state.maxPageQuiz} activePage={this.state.pageNumber}
                                        onPageChange={this.handlePageChangeQuizzes}/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }

};