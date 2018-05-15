import React from 'react';

<<<<<<< HEAD
import {Checkbox, Table} from 'semantic-ui-react';
=======
import {Table} from 'semantic-ui-react';
>>>>>>> master

export default {
  getTableHeader(cellValues) {
    return cellValues.map(cellValue => (
      <Table.HeaderCell key={'TableHeader' + cellValue}>
        {cellValue}
      </Table.HeaderCell>
    ));
<<<<<<< HEAD
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
=======
>>>>>>> master
  }
};
