import React from 'react';

import {Button, Header, Modal} from 'semantic-ui-react';

export default {
  getLoginSuccess() {
    return (
      <Modal dimmer="blurring" open>
        <Header icon="sign in" content="Login erfolgt" />
        <Modal.Content content="Sie haben sich erfolgreich eingeloggt." />
      </Modal>
    );
  },

  getCreationSuccess(successMessage) {
    return (
      <Modal dimmer="blurring" open={successMessage.showModal}>
        <Header icon="check" content={successMessage.title} />
        <Modal.Content content={successMessage.content} />
      </Modal>
    );
  },

  getScanSuccess() {
    const message =
      'Der QR-Code wurde erfolgreich eingescannt. ' +
      'Sie werden nun auf eine andere Seite weitergeleitet';
    return (
      <Modal dimmer="blurring" open>
        <Header icon="qrcode" content="QR-Code wurde erfolgreich eingescannt" />
        <Modal.Content content={message} />
      </Modal>
    );
  },

  getAgreement() {
    return (
      <Modal
        open={this.state.showAgreement}
        closeOnEscape
        closeOnRootNodeClick={false}
      >
        <Modal.Header content="Berechtigungen einfordern" />
        <Modal.Content content="Wir würden gerne deine aktuelle Position bestimmen. Bitte bestätige darum das kommende Popup mit erlauben" />
        <Modal.Actions>
          <Button
            positive
            labelPosition="right"
            icon="point"
            content="OK, ich habe verstanden"
            onClick={() => {
              this.setState({showAgreement: false});
              window.sessionStorage.setItem('showAgreement', false);
              this.locate();
            }}
          />
        </Modal.Actions>
      </Modal>
    );
  },

  getFormError(errorText) {
    return (
      <Modal open>
        <Modal.Header content="Formular wurde noch nicht richtig ausgefüllt" />
        <Modal.Content content={errorText} />
        <Modal.Actions>
          <Button
            positive
            labelPosition="right"
            icon="pencil"
            content="OK, ich habe verstanden"
            onClick={() => this.setState({formOK: true})}
          />
        </Modal.Actions>
      </Modal>
    );
  },

  getMobileError() {
    const message =
      'Nutzen Sie das Smartphone nur für das Scannen für QR-Code Standorten. Anderenfalls nutzen Sie' +
      'bitte ein Gerät mit besserer Auflösung für das Arbeiten mit der TeacherSeite.';
    return (
      <Modal dimmer="blurring" open>
        <Header icon="mobile" content="Mobiles Gerät erkannt" />
        <Modal.Content content={message} />
        <Modal.Actions>
          <Button
            positive
            content="OK, ich habe verstanden"
            onClick={() => this.setState({showMobileError: false})}
          />
        </Modal.Actions>
      </Modal>
    );
  }
};
