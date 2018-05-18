import React from 'react';
import {Redirect} from 'react-router';

import {Form, Message} from 'semantic-ui-react';
import FormHandler from '../handlers/FormHandler';
import APIHandler from '../handlers/APIHandler';
import ModalHandler from '../handlers/ModalHandler';

export default class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      fireRedirect: false,
      firstName: '',
      lastName: '',
      email: '',
      newPassword: '',
      newPasswordRepeated: '',
      showPasswordError: false
    };
    this.handleSubmit = FormHandler.handleEditParticipant.bind(this);
    this.handleChange = FormHandler.handleChange.bind(this);
    this.getSettingChanging = ModalHandler.getSettingChanging.bind(this);
    this.putData = APIHandler.putData.bind(this);
  }

  componentDidMount() {
    APIHandler.getInformations().then(resData => {
      let personInformations = resData.data;
      this.setState({
        id: personInformations.id,
        firstName: personInformations.firstName,
        lastName: personInformations.lastName,
        email: personInformations.email
      });
    });
  }

  onSubmit = () => {
    this.setState({showModal: true});
  };

  render() {
    return (
      <div>
        {this.state.showModal && this.getSettingChanging()}
        <Form onSubmit={this.onSubmit}>
          <Form.Input
            label="Vorname"
            type="text"
            value={this.state.firstName}
            name="firstName"
            onChange={this.handleChange}
            required
          />
          <Form.Input
            label="Nachname"
            type="text"
            value={this.state.lastName}
            name="lastName"
            onChange={this.handleChange}
            required
          />
          <Form.Input
            label="E-Mail"
            type="email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
            required
          />
          <Form.Input
            label="Lehranstalt"
            type="text"
            defaultValue={'HSR'}
            required
          />
          <Form.Input
            label="Neues Passwort"
            type="password"
            value={this.state.newPassword}
            name="newPassword"
            onChange={this.handleChange}
            error={this.state.showPasswordError}
          />
          <Form.Input
            label="Neues Passwort erneut eingeben"
            type="password"
            value={this.state.newPasswordRepeated}
            name="newPasswordRepeated"
            onChange={this.handleChange}
            error={this.state.showPasswordError}
          />

          {this.state.showPasswordError && (
            <Message
              header="Passwörter sind nicht identisch"
              icon="key"
              error
            />
          )}
          <Form.Button content="Daten ändern" />
        </Form>
        {this.state.fireRedirect && <Redirect to={{pathname: '/'}} />}
      </div>
    );
  }
}
