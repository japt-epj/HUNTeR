import React from 'react';

import {Table} from 'semantic-ui-react';

export default {
  getTableHeader(cellValues) {
    return cellValues.map(cellValue => (
      <Table.HeaderCell key={'TableHeader' + cellValue}>
        {cellValue}
      </Table.HeaderCell>
    ));
  }
};
