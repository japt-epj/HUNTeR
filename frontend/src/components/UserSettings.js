import React from 'react';
import {Redirect} from 'react-router-dom';

import {Form, Grid} from 'semantic-ui-react';

import {modalOptions} from '../config/hunterUiDefaults';
import {apiGetHandler, apiPutHandler} from '../handlers/hunterApiHandlers';
import {formChangeHandler, formDataEditHandler} from '../handlers/hunterFormHandlers';
import {passwordInputHandler} from '../handlers/hunterPasswordHandler';
import {modalHandler, tableHandler} from '../handlers/hunterViewHandlers';

export default class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: modalOptions.settings,
      currentPasswordError: false,
      newPasswordError: false,
      showModal: false,
      loading: true,
      fireRedirect: false,
      firstName: '',
      lastName: '',
      email: '',
      school: '',
      currentPassword: '',
      newPassword: '',
      newPasswordRepeated: '',
      passwordRating: 0
    };

    this.getSubmitCancelButton = tableHandler.getSubmitCancelButton.bind(this);
    this.handleSubmit = formDataEditHandler.handleEditParticipant.bind(this);
    this.handleChange = formChangeHandler.handleChange.bind(this);
    this.getPasswordInputs = passwordInputHandler.getPasswordInputs.bind(this);
    this.getSettingChanging = modalHandler.getSettingChanging.bind(this);
    this.putData = apiPutHandler.putData.bind(this);
  }

  componentDidMount() {
    apiGetHandler.getInformation().then(resData => {
      const personInformation = resData.data;
      this.setState({
        firstName: personInformation.firstName,
        lastName: personInformation.lastName,
        email: personInformation.email,
        school: Boolean(personInformation.schools[0]) ? personInformation.schools[0].name : '',
        loading: false
      });
    });
  }

  onSubmit = () => {
    this.setState({showModal: true});
  };

  render() {
    return (
      <div>
        {this.state.successMessage.showModal && modalHandler.getSuccess(this.state.successMessage)}
        {this.state.showModal && this.getSettingChanging()}
        <Form onSubmit={this.onSubmit} loading={this.state.loading}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
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
                <Form.Input label="E-Mail" type="email" value={this.state.email} name="email" disabled />
                <Form.Input label="Lehranstalt" type="text" value={this.state.school} disabled />
                {this.getPasswordInputs()}
              </Grid.Column>
            </Grid.Row>
            {this.getSubmitCancelButton()}
          </Grid>
        </Form>
        {this.state.fireRedirect && <Redirect to={{pathname: '/'}} />}
      </div>
    );
  }
}
