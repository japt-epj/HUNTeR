import React from 'react';

import {Pagination, Table} from 'semantic-ui-react';

import defaultColors from '../config/defaultColors';

export default {
  calculateTotalPages(length, maxPerPage) {
    return length % maxPerPage === 0
      ? length / maxPerPage
      : Math.floor(length / maxPerPage) + 1;
  },

  getPagination(values) {
    return (
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan={values.width}>
            <Pagination
              totalPages={values.totalPages}
              activePage={values.activePage}
              onPageChange={values.onPageChange}
              pointing
              secondary
              color={defaultColors.paginationColor}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    );
  }
};
