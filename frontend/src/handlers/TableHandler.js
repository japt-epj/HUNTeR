import React from 'react';

import {Table} from 'semantic-ui-react';


export default class TableHandler {
    static getTableHeader(cellValues) {
        return cellValues.map((cellValue) =>
            <Table.HeaderCell key={'TableHeader' + cellValue}>{cellValue}</Table.HeaderCell>
        );
    }

    static getTableCell(cellValue) {
        return (<Table.Cell collapsing={cellValue.collapsed}>{cellValue.element}</Table.Cell>);
    }
}