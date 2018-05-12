import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';

import {Form, Grid, Message} from 'semantic-ui-react';
import {isMobile} from 'react-device-detect';

import StructureHandler from '../handlers/StructureHandler';
import FormHandler from '../handlers/FormHandler';
import APIHandler from '../handlers/APIHandler';
import ModalHandler from '../handlers/ModalHandler';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showSuccess: false,
      showLoginError: false,
      fireRedirect: window.localStorage.getItem('HUNTeR-Redirect') !== null
    };
    this.handleLoginSubmit = FormHandler.handleLoginSubmit.bind(this);
    this.handleChange = FormHandler.handleChange.bind(this);
    this.postLoginData = APIHandler.postLoginData.bind(this);
    this.redirectAfterLogin = APIHandler.redirectAfterLogin.bind(this);
    this.getJSONHeader = APIHandler.getJSONHeader;
  }

  render() {
    return (
      <div>
        {this.state.showSuccess && ModalHandler.getLoginSuccess()}
        <Grid className="siteGrid" padded>
          {StructureHandler.getLoginHeader()}
          <Grid.Row className="gridContent" columns="equal">
            <Grid.Column />
            <Grid.Column width={isMobile ? 12 : 8}>
              {this.state.showLoginError && (
                <Message
                  icon="sign in"
                  size="mini"
                  header="Username oder Passwort falsch eingegeben"
                  error
                />
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
                <Form.Button content="Einloggen" icon="sign in" />
              </Form>
              <NavLink to={'/participant'}>Participant</NavLink>
              <NavLink to={'/teacher'}>Teacher</NavLink>
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
        </Grid>
        {this.state.fireRedirect && (
          <Redirect to={window.localStorage.getItem('HUNTeR-Redirect')} />
        )}
      </div>
    );
  }
}
