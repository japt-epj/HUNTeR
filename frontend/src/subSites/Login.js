import React from 'react';
import {Redirect} from 'react-router-dom';

import {Form, Grid, Message} from 'semantic-ui-react';
import {isMobile} from 'react-device-detect';

import {colors} from '../config/hunterUiDefaults';
import {apiGetHandler, apiPostHandler} from '../handlers/hunterApiHandlers';
import {formHandler} from '../handlers/hunterDataHandlers';
import {modalHandler, structureHandler} from '../handlers/hunterViewHandlers';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showSuccess: false,
      showLoginError: false,
      fireRedirect: Boolean(window.localStorage.getItem('HUNTeR-Redirect'))
    };

    this.handleLoginSubmit = formHandler.handleLoginSubmit.bind(this);
    this.handleChange = formHandler.handleChange.bind(this);
    this.postLoginData = apiPostHandler.postLoginData.bind(this);
    this.redirectAfterLogin = apiGetHandler.redirectAfterLogin.bind(this);
  }

  render() {
    return (
      <div>
        {this.state.showSuccess && modalHandler.getLoginSuccess()}
        <Grid className="siteGrid" padded>
          {structureHandler.getLoginHeader()}
          <Grid.Row className="gridContent" columns="equal">
            <Grid.Column />
            <Grid.Column width={isMobile ? 13 : 8}>
              {this.state.showLoginError && (
                <Message icon="sign in" size="mini" header="Username oder Passwort falsch eingegeben" error />
              )}
              <Form onSubmit={this.handleLoginSubmit}>
                <Form.Input
                  label="E-Mail-Adresse"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
                <Form.Input
                  label="Passwort"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
                <Form.Button color={colors.buttonColors.normal} icon="sign in" basic content="Einloggen" />
              </Form>
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
        </Grid>
        {this.state.fireRedirect && <Redirect to={window.localStorage.getItem('HUNTeR-Redirect')} />}
      </div>
    );
  }
}
