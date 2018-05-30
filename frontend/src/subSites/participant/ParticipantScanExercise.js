import React from 'react';
import {Redirect} from 'react-router';

import {Message} from 'semantic-ui-react';

import QrReader from 'react-qr-reader';
import ModalHandler from '../../handlers/ModalHandler';
import defaultUIConfig from '../../config/defaultUIConfig';

export default class ParticipantScanExercise extends React.Component {
  constructor(props) {
    super(props);
    const defaultDelayValue = 500;
    this.state = {
      delay: defaultDelayValue,
      result: '',
      displayText: 'Scanne QR-Code ein.',
      exerciseId: '',
      scanError: false,
      showAgreement: defaultUIConfig.showAgreement,
      successMessage: defaultUIConfig.defaultSuccessMessages.scan,
      fireRedirect: false,
      locationPermission: undefined,
      position: {
        latitude: '',
        longitude: ''
      }
    };
    this.getAgreement = ModalHandler.getAgreement.bind(this);
  }

  handleScan = data => {
    const jsonData = JSON.parse(data);
    if (Boolean(jsonData)) {
      let successMessage = {...this.state.successMessage};
      successMessage.showModal = true;
      this.setState({
        successMessage,
        executionId: jsonData.executionId,
        exerciseId: jsonData.exerciseId
      });
      setTimeout(
        () => this.setState({fireRedirect: true}),
        defaultUIConfig.defaultTimeoutTime
      );
    } else {
      this.setState({scanError: true});
      this.setState({
        displayText:
          'Ungültige Aufgabe. Bitte scanne einen anderen QR-Code ein.'
      });
    }
  };

  handleError = err => {
    console.error(err);
  };

  locate = () => {
    navigator.geolocation.getCurrentPosition(position =>
      this.setState({
        position: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      })
    );
  };

  render() {
    return (
      <div>
        {this.state.successMessage.showModal &&
          ModalHandler.getCreationSuccess(this.state.successMessage)}
        {this.state.showAgreement ? (
          this.getAgreement()
        ) : (
          <QrReader
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
          />
        )}

        <Message
          icon="camera retro"
          size="mini"
          header={this.state.displayText}
          error={this.state.scanError}
        />

        {this.state.fireRedirect && (
          <Redirect
            to={{
              pathname: 'exercise',
              state: {
                exerciseId: this.state.exerciseId,
                executionId: this.state.executionId
              }
            }}
          />
        )}
      </div>
    );
  }
}
