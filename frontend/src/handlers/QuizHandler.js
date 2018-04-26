import React from 'react';
import TableHandler from "./TableHandler";
import {Pagination, Table} from "semantic-ui-react";

export default {
    handleSelection(event, checkbox) {
        let newState = this.state.selectedQuiz;
        if (checkbox.checked){
            newState.push(checkbox.id);
        } else {
            newState.splice(newState.lastIndexOf(checkbox.id), 1);
        }
        this.setState({selectedQuiz: newState});

    },

    getQuizTable() {
        let headerElements = ['Name'];
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
                        <Table.Cell content={element.name}/>
                        <Table.Cell content={element.id} collapsing/>
                    </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan="5">
                            <Pagination totalPages={this.state.maxPage} activePage={this.state.pageNumber}
                                        onPageChange={this.handlePageChange}/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }

};