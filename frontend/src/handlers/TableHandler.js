import React from 'react';

import {Menu, Table} from 'semantic-ui-react';


export default {
    getTableHeader(cellValues) {
        return cellValues.map((cellValue) =>
            <Table.HeaderCell key={'TableHeader' + cellValue}>{cellValue}</Table.HeaderCell>
        );
    },

    getTablePageButtons(startNumber, minNumber, maxNumber) {
        return (
            <Menu floated="right" pagination>
                {(startNumber - 1 >= minNumber && startNumber - 1 <= maxNumber) &&
                <Menu.Item as='a' icon="chevron left" content=""
                           index={startNumber - 1}
                           onClick={this.handlePageChange}/>}
                {startNumber !== minNumber &&
                <Menu.Item as='a' content={startNumber}
                           index={startNumber}
                           onClick={this.handlePageChange}/>}
                {(startNumber + 1 >= minNumber && startNumber <= maxNumber) &&
                <Menu.Item as='a' content={startNumber + 1}
                           index={(startNumber + 1)}
                           onClick={this.handlePageChange}/>}
                {(startNumber + 2 >= minNumber && startNumber + 2 <= maxNumber) &&
                <Menu.Item as='a' content={startNumber + 2}
                           index={(startNumber + 2)}
                           onClick={this.handlePageChange}/>}
                {(startNumber + 1 >= minNumber && startNumber + 2 <= maxNumber) &&
                <Menu.Item as='a' icon="chevron right" content=""
                           index={(startNumber + 1)}
                           onClick={this.handlePageChange}/>}
            </Menu>
        );
    }
}