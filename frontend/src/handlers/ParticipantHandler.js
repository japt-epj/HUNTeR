import React from 'react';

import {Checkbox, Pagination, Table} from 'semantic-ui-react';
import TableHandler from "./TableHandler";


export default {
    handleSelection(event, checkbox) {
        let newState = this.state.selectedParticipants;
        if (checkbox.checked) {
            newState.push(checkbox.id);
        } else {
            newState.splice(newState.lastIndexOf(checkbox.id), 1);
        }
        this.setState({selectedParticipants: newState});
    },
    getParticipantTable(checkboxNeeded) {
        let headerElements = ['Vorname', 'Nachname', 'E-Mail'];
        if (checkboxNeeded) {
            headerElements.unshift('');
        }

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        {TableHandler.getTableHeader(headerElements)}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {!this.state.loadingParticipants && this.state.participants.map(element =>
                        <Table.Row key={'ParticipantRows' + element.id}>
                            {checkboxNeeded && <Table.Cell collapsing>
                                <Checkbox id={element.id} onChange={this.handleSelection}
                                          checked={this.state.selectedParticipants.indexOf(element.id) !== -1}/>
                            </Table.Cell>}
                            <Table.Cell content={element.firstName}/>
                            <Table.Cell content={element.lastName}/>
                            <Table.Cell content={element.email}/>
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan="4">

                            <Pagination totalPages={this.state.maxPageParticipant} activePage={this.state.pageNumber}
                                        onPageChange={this.handlePageChangeParticipants}/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
};