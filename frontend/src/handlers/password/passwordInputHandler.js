import React from 'react';

import {Form, List, Message, Progress} from 'semantic-ui-react';

import {passwordValidationHandler} from '../hunterPasswordHandler';
import {passwordOptions} from '../../config/hunterUiDefaults';

export default {
  getPasswordInputs() {
    const {validationResult, complexity} = passwordValidationHandler.checkPassword(this.state.newPassword);

    const passwordComponents = new Map(passwordOptions.passwordComponents);

    return (
      <div>
        {this.state.newPasswordError && (
          <Message header="Passwortfehler" content="Die Passwörter sind nicht identisch" error />
        )}
        {this.state.oldPasswordError && (
          <Message header="Passwortfehler" content="Das alte Passwort war falsch." error />
        )}
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
          error={this.state.passwordError}
        />
        {Boolean(this.state.newPassword) && (
          <div>
            <List>
              <List.Header content={'Dem Passwort fehlt: '} />
              {validationResult.map(element => (
                <List.Item key={element} content={passwordComponents.get(element)} icon="x" />
              ))}
            </List>
            <Progress percent={complexity} indicating />
          </div>
        )}
        <Form.Input
          label="Neues Passwort wiederholt"
          type="password"
          value={this.state.newPasswordRepeated}
          name="newPasswordRepeated"
          onChange={this.handleChange}
          error={this.state.passwordError}
        />
      </div>
    );
  }
};
