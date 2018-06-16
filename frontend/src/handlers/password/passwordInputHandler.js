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
        {this.state.showCurrentPasswordError && (
          <Message
            header={passwordOptions.currentPasswordError.header}
            content={passwordOptions.currentPasswordError.content}
            color="red" //bug when using error it will not be displayed
          />
        )}
        <Form.Input
          label="Aktuelles Passwort"
          type="password"
          value={this.state.currentPassword}
          name="currentPassword"
          onChange={this.handleChange}
          required
          error={this.state.showCurrentPasswordError}
        />
        {this.state.showNewPasswordError && (
          <Message
            header={passwordOptions.newPasswordError.header}
            content={passwordOptions.newPasswordError.content}
            color="red" //bug when using error it will not be displayed
          />
        )}
        <Form.Input
          label="Neues Passwort"
          type="password"
          value={this.state.newPassword}
          name="newPassword"
          onChange={this.handleChange}
          error={this.state.showNewPasswordError}
        />
        {this.state.isPasswordWeak && (
          <Message
            header={passwordOptions.isPasswordWeak.header}
            content={passwordOptions.isPasswordWeak.content}
            color="red" //bug when using error it will not be displayed
          />
        )}
        {Boolean(this.state.newPassword) && (
          <div>
            {complexity < passwordOptions.minComplexity && (
              <List>
                <List.Header content={passwordOptions.listHeader} />
                {validationResult.map(element => (
                  <List.Item key={element} content={passwordComponents.get(element)} icon="x" />
                ))}
              </List>
            )}
            <Progress percent={complexity} indicating />
          </div>
        )}
        {complexity === passwordOptions.minComplexity && (
          <Form.Input
            label="Neues Passwort wiederholen"
            type="password"
            value={this.state.newPasswordRepeated}
            name="newPasswordRepeated"
            onChange={this.handleChange}
            error={this.state.showNewPasswordError}
          />
        )}
      </div>
    );
  }
};
