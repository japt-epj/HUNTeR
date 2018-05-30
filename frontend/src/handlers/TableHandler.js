import React from 'react';

import {Checkbox, Form, Grid, Table} from 'semantic-ui-react';
import defaultColors from '../config/defaultColors';

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
          <Form.Button
            color={defaultColors.buttonColors.normal}
            basic
            content="Übermitteln"
          />
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Form.Button
            color={defaultColors.buttonColors.cancel}
            basic
            content="Abbrechen"
            onClick={() => this.setState({fireRedirect: true})}
          />
        </Grid.Column>
      </Grid.Row>
    );
  }
};
