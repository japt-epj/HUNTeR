import React from 'react';

import {Form, List, Progress} from 'semantic-ui-react';

import {passwordValidationHandler} from '../hunterPasswordHandler';

export default {
  getPasswordInputs() {
    const {validationResult, complexity} = passwordValidationHandler.checkPassword(this.state.newPassword);

    const testMap = new Map([
      ['min', 'die Minimallänge'],
      ['uppercase', 'ein Grossbuchstabe'],
      ['lowercase', 'ein Kleinbuchstabe'],
      ['digits', 'eine Nummer'],
      ['symbols', 'ein Sonderzeichen']
    ]);

    return (
      <div>
        <Form.Input
          label="Altes Passwort"
          type="password"
          value={this.state.oldPassword}
          name="oldPassword"
          onChange={this.handleChange}
        />
        <Form.Input
          label="Neues Passwort"
          type="password"
          value={this.state.newPassword}
          name="newPassword"
          onChange={this.handleChange}
        />
        <Form.Input
          label="Neues Passwort wiederholt"
          type="password"
          value={this.state.newPasswordRepeated}
          name="newPasswordRepeated"
          onChange={this.handleChange}
        />
        {Boolean(this.state.newPassword) && (
          <div>
            <List>
              <List.Header content={'Dem Passwort fehlt: '} />
              {validationResult.map(element => <List.Item content={testMap.get(element)} icon="x" />)}
            </List>
            <Progress percent={complexity} indicating />
          </div>
        )}
      </div>
    );
  }
};
