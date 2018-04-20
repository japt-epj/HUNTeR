import React from 'react';

import {Menu, Table} from 'semantic-ui-react';


export default {
    getTableHeader(cellValues) {
        return cellValues.map((cellValue) =>
            <Table.HeaderCell key={'TableHeader' + cellValue}>{cellValue}</Table.HeaderCell>
        );
    },

    getTablePageButtons(pageNumber, minPage, maxPage) { //1,1,2
        return (
            <Menu floated="right" pagination>
                {(minPage < maxPage && pageNumber > minPage) &&
                <Menu.Item icon="chevron left" content="" index={pageNumber - 1}
                           onClick={this.handlePageChange}/>}
                <Menu.Item content={pageNumber}/>
                {(minPage < maxPage && pageNumber < maxPage) &&
                <Menu.Item icon="chevron right" content="" index={(pageNumber + 1)}
                           onClick={this.handlePageChange}/>}
            </Menu>
        );
    }
}