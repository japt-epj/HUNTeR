import React from 'react';
import {Redirect} from 'react-router-dom';

import {Form, Grid} from 'semantic-ui-react';

import {modalOptions} from '../config/hunterUiDefaults';
import {apiGetHandler, apiPutHandler} from '../handlers/apiHandler';
import {formHandler, modalHandler, tableHandler} from '../handlers/hunterHandlers';

export default class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: modalOptions.settings,
      showModal: false,
      loading: true,
      fireRedirect: false,
      firstName: '',
      lastName: '',
      email: '',
      school: ''
    };

    this.getSubmitCancelButton = tableHandler.getSubmitCancelButton.bind(this);
    this.handleSubmit = formHandler.handleEditParticipant.bind(this);
    this.handleChange = formHandler.handleChange.bind(this);
    this.getSettingChanging = apiGetHandler.getSettingChanging.bind(this);
    this.putData = apiPutHandler.putData.bind(this);
  }

  componentDidMount() {
    apiGetHandler.getInformation().then(resData => {
      const personInformation = resData.data;
      this.setState({
        firstName: personInformation.firstName,
        lastName: personInformation.lastName,
        email: personInformation.email,
        school: personInformation.schools[0].name,
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
        {this.state.successMessage.showModal && modalHandler.getCreationSuccess(this.state.successMessage)}
        {this.state.showModal && this.getSettingChanging()}
        <Form onSubmit={this.onSubmit} loading={this.state.loading}>
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
          <Grid>{this.getSubmitCancelButton()}</Grid>
        </Form>
        {this.state.fireRedirect && <Redirect to={{pathname: '/'}} />}
      </div>
    );
  }
}
