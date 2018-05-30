import React from 'react';

import {Button, Header, Modal} from 'semantic-ui-react';
import getLoadingScreen from '../components/getLoadingScreen';
import defaultColors from '../config/defaultColors';
import defaultModalOptions from '../config/defaultModalOptions';

export default {
  getLoginSuccess() {
    return (
      <Modal dimmer={defaultModalOptions.dimmer} open>
        <Header icon="sign in" content="Login erfolgt" />
        <Modal.Content content="Sie haben sich erfolgreich eingeloggt." />
      </Modal>
    );
  },

  getLogoutSuccess() {
    return (
      <Modal dimmer={defaultModalOptions.dimmer} open>
        <Header icon="log out" content="Erfolgreich ausgeloggt" />
        <Modal.Content content="Sie haben sich erfolgreich ausgeloggt." />
      </Modal>
    );
  },

  getTokenExpiration() {
    return (
      <Modal dimmer={defaultModalOptions.dimmer} open>
        <Header icon="sign out" content="Login ausgelaufen" />
        <Modal.Content content="Ihre Loginsession wurde beendet. Bitte loggen sie sich erneut ein" />
      </Modal>
    );
  },

  getCreationSuccess(successMessage) {
    return (
      <Modal
        dimmer={defaultModalOptions.dimmer}
        open={successMessage.showModal}
      >
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
      <Modal dimmer={defaultModalOptions.dimmer} open>
        <Header icon="qrcode" content="QR-Code wurde erfolgreich eingescannt" />
        <Modal.Content content={message} />
      </Modal>
    );
  },

  getAgreement() {
    return (
      <Modal
        dimmer={defaultModalOptions.dimmer}
        open
        closeOnEscape
        closeOnRootNodeClick={false}
      >
        <Modal.Header content="Berechtigungen einfordern" />
        <Modal.Content content="Wir würden gerne deine aktuelle Position bestimmen. Bitte bestätige darum das kommende Popup mit erlauben" />
        <Modal.Actions>
          <Button
            color={defaultColors.buttonColors.normal}
            labelPosition="right"
            icon="point"
            content="OK, ich habe verstanden"
            onClick={() => {
              this.setState({hideAgreement: true});
              window.sessionStorage.setItem('HUNTeR-hideAgreement', 'true');
              this.locate();
            }}
          />
        </Modal.Actions>
      </Modal>
    );
  },

  getSettingChanging() {
    return (
      <Modal dimmer={defaultModalOptions.dimmer} open closeIcon>
        <Header icon="key" content="Daten ändern?" />
        <Modal.Content>Daten wirklich ändern</Modal.Content>
        <Modal.Actions>
          <Button
            color={defaultColors.buttonColors.normal}
            labelPosition="left"
            label="Ja"
            icon="checkmark"
            onClick={() => {
              this.setState({
                formOK: true,
                showModal: false
              });
              this.handleSubmit();
            }}
          />
          <Button
            color={defaultColors.buttonColors.cancel}
            labelPosition="left"
            label="Nein"
            icon="cancel"
            onClick={() =>
              this.setState({
                formOK: false,
                showModal: false
              })
            }
          />
        </Modal.Actions>
      </Modal>
    );
  },

  getFormError(errorText) {
    return (
      <Modal dimmer={defaultModalOptions.dimmer} open>
        <Modal.Header content="Formular wurde noch nicht richtig ausgefüllt" />
        <Modal.Content content={errorText} />
        <Modal.Actions>
          <Button
            color={defaultColors.buttonColors.normal}
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
      'Nutzen Sie das Smartphone nur für das Scannen für QR-Code Standorten. Anderenfalls nutzen Sie ' +
      'bitte ein Gerät mit besserer Auflösung für das Arbeiten mit der Teacher-Seite.';
    return (
      <Modal dimmer={defaultModalOptions.dimmer} open>
        <Header icon="mobile" content="Mobiles Gerät erkannt" />
        <Modal.Content content={message} />
        <Modal.Actions>
          <Button
            color={defaultColors.buttonColors.normal}
            content="OK, ich habe verstanden"
            onClick={() => {
              this.setState({hideMobileError: true});
              window.sessionStorage.setItem('HUNTeR-hideMobileError', 'true');
            }}
          />
        </Modal.Actions>
      </Modal>
    );
  },

  getAddExerciseModal() {
    return (
      <Modal
        size="fullscreen"
        trigger={
          <Button
            color={defaultColors.buttonColors.normal}
            icon="add square"
            labelPosition="right"
            label="Aufgabe hinzufügen"
            onClick={this.resetPageNumber}
          />
        }
        closeIcon
      >
        <Modal.Header content="Aufgaben hinzufügen" />
        <Modal.Content scrolling>
          {this.state.loading
            ? getLoadingScreen()
            : this.getExerciseTable(true)}
        </Modal.Content>
      </Modal>
    );
  }
};
