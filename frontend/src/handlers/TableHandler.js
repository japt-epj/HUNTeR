import React from 'react';

import {Checkbox, Form, Grid, Table} from 'semantic-ui-react';

export default {
  getTableHeader(cellValues) {
    return cellValues.map(cellValue => (
      <Table.HeaderCell key={'TableHeader' + cellValue}>
        {cellValue}
      </Table.HeaderCell>
    ));
  },

  getBulkCheckbox(pageNumber, bulkCheckboxes, handleSelection) {
    return (
      <Table.HeaderCell>
        <Checkbox
          id={'BulkCheckbox' + pageNumber}
          name={'BulkCheckbox' + pageNumber}
          onChange={handleSelection}
          checked={bulkCheckboxes.indexOf('BulkCheckbox' + pageNumber) !== -1}
        />
      </Table.HeaderCell>
    );
  },

  getSubmitCancelButton() {
    return (
      <Grid.Row columns="equal">
        <Grid.Column>
          <Form.Button content="Submit" />
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Form.Button
            content="Abbrechen"
            onClick={() => this.setState({fireRedirect: true})}
          />
        </Grid.Column>
      </Grid.Row>
    );
  }
};
