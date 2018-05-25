import React from 'react';
import {Redirect} from 'react-router-dom';

import {Form, Grid} from 'semantic-ui-react';

import FormHandler from '../../handlers/FormHandler';
import APIHandler from '../../handlers/APIHandler';
import ModalHandler from '../../handlers/ModalHandler';
import defaultUIConfig from '../../config/defaultUIConfig';

export default class TeacherNewParticipant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: defaultUIConfig.defaultSuccessMessages.participant,
      fireRedirect: false,
      firstName: '',
      lastName: '',
      email: ''
    };
    this.handleSubmit = FormHandler.handleNewParticipantSubmit.bind(this);
    this.handleChange = FormHandler.handleChange.bind(this);
    this.postData = APIHandler.postData.bind(this);
    this.getJSONHeader = APIHandler.getJSONHeader;
  }

  render() {
    return (
      <div>
        {this.state.successMessage.showModal &&
          ModalHandler.getCreationSuccess(this.state.successMessage)}
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            fluid
            label="E-Mail"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Bitte geben Sie die E-Mail des Schülers ein"
            required
          />
          <Form.Input
            fluid
            label="Vorname"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            placeholder="Bitte geben Sie den Vornamen des Schülers ein"
            required
          />
          <Form.Input
            fluid
            label="Nachname"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            placeholder="Bitte geben Sie den Nachnamen des Schülers ein"
            required
          />
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Form.Button content="Submit" />
              </Grid.Column>
              <Grid.Column>
                <Form.Button
                  content="Abbrechen"
                  onClick={() => this.setState({fireRedirect: true})}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {this.state.fireRedirect && (
            <Redirect to={{pathname: '/', state: {person: this.state}}} />
          )}
        </Form>
      </div>
    );
  }
}
