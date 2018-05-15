import React from 'react';

import {Checkbox, Table} from 'semantic-ui-react';

export default {
  getTableHeader(cellValues) {
    return cellValues.map(cellValue => (
      <Table.HeaderCell key={'TableHeader' + cellValue}>
        {cellValue}
      </Table.HeaderCell>
    ));
  },

  getBulkCheckbox(pageNumber, bulkCheckbox, handleSelection) {
    return (
      <Table.HeaderCell>
        <Checkbox
          id={'Bulk' + pageNumber}
          name={'Bulk' + pageNumber}
          onChange={handleSelection}
          checked={bulkCheckbox === 'Bulk' + pageNumber}
        />
      </Table.HeaderCell>
    );
  }
};
