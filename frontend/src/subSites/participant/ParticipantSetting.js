import React from 'react';
import {Button, Form, Header, Modal} from 'semantic-ui-react';
import FormHandler from '../../handlers/FormHandler';
import APIHandler from '../../handlers/APIHandler';

export default class ParticipantSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fireRedirect: false,
      firstName: '',
      lastName: '',
      email: ''
    };
    this.handleSubmit = FormHandler.handleEditParticipant.bind(this);
    this.handleChange = FormHandler.handleChange.bind(this);
    this.putData = APIHandler.putData.bind(this);
    this.getParticipant = APIHandler.getParticipant.bind(this);
  }

  componentDidMount() {
    this.getParticipant(1).then(resData => {
      let participant = resData.data[0];
      this.setState({
        id: participant.id,
        firstName: participant.firstName,
        lastName: participant.lastName,
        email: participant.email
      });
    });
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({showModal: true});
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
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
          <Form.Input label="Neues Passwort" type="password" />
          <Form.Input label="Neues Passwort erneut eingeben" type="password" />

          <Modal
            open={this.state.showModal}
            style={{marginTop: 0}}
            size="fullscreen"
            trigger={<Button content="Daten ändern" onClick={this.onSubmit} />}
            closeIcon
          >
            <Header icon="key" content="Daten ändern?" />
            <Modal.Content>Daten wirklich ändern</Modal.Content>
            <Modal.Actions>
              <Button
                negative
                type="button"
                labelPosition="right"
                icon="cancel"
                content="Nein"
                onClick={() =>
                  this.setState({
                    formOK: false,
                    showModal: false
                  })
                }
              />
              <Button
                positive
                type="submit"
                labelPosition="right"
                icon="checkmark"
                content="Ja"
                onClick={() => {
                  this.setState({
                    formOK: true,
                    showModal: false
                  });
                  this.handleSubmit();
                }}
              />
            </Modal.Actions>
          </Modal>
        </Form>
      </div>
    );
  }
}
