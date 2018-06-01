import React from 'react';
import {Redirect} from 'react-router-dom';

import {Form, Grid} from 'semantic-ui-react';

import {modalOptions} from '../../config/hunterUiDefaults';
import {apiPostHandler} from '../../handlers/hunterApiHandler';
import {formHandler} from '../../handlers/hunterDataHandlers';
import {modalHandler, tableHandler} from '../../handlers/hunterViewHandlers';

export default class TeacherNewParticipant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: modalOptions.participant,
      fireRedirect: false,
      firstName: '',
      lastName: '',
      email: ''
    };

    this.getSubmitCancelButton = tableHandler.getSubmitCancelButton.bind(this);
    this.handleSubmit = formHandler.handleNewParticipantSubmit.bind(this);
    this.handleChange = formHandler.handleChange.bind(this);
    this.postData = apiPostHandler.postData.bind(this);
  }

  render() {
    return (
      <div>
        {this.state.successMessage.showModal && modalHandler.getSuccess(this.state.successMessage)}
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            fluid
            label="E-Mail"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Bitte geben Sie die E-Mail des Teilnehmers ein."
            required
          />
          <Form.Input
            fluid
            label="Vorname"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            placeholder="Bitte geben Sie den Vornamen des Teilnehmers ein."
            required
          />
          <Form.Input
            fluid
            label="Nachname"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            placeholder="Bitte geben Sie den Nachnamen des Teilnehmers ein."
            required
          />
          <Grid>{this.getSubmitCancelButton()}</Grid>
          {this.state.fireRedirect && <Redirect to={{pathname: '/', state: {person: this.state}}} />}
        </Form>
      </div>
    );
  }
}
