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
        {this.state.currentPasswordError && (
          <Message
            header={passwordComponents.currentPasswordError.header}
            content={passwordComponents.currentPasswordError.content}
            error
          />
        )}
        <Form.Input
          label="Aktuelles Passwort"
          type="password"
          value={this.state.currentPassword}
          name="currentPassword"
          onChange={this.handleChange}
          error={this.state.currentPasswordError}
        />
        {this.state.newPasswordError && (
          <Message
            header={passwordComponents.newPasswordError.header}
            content={passwordComponents.newPasswordError.content}
            error
          />
        )}
        <Form.Input
          label="Neues Passwort"
          type="password"
          value={this.state.newPassword}
          name="newPassword"
          onChange={this.handleChange}
          error={this.state.newPasswordError}
        />
        {Boolean(this.state.newPassword) && (
          <div>
            <List>
              <List.Header content={passwordComponents.listHeader} />
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
          error={this.state.newPasswordError}
        />
      </div>
    );
  }
};
