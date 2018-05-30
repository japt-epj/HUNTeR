import React from 'react';
import {Redirect} from 'react-router';

import {Message} from 'semantic-ui-react';

import QrReader from 'react-qr-reader';
import ModalHandler from '../../handlers/ModalHandler';
import defaultSuccessMessages from '../../config/defaultSuccessMessages';
import defaultNumbers from '../../config/defaultNumbers';
import defaultMessages from '../../config/defaultMessages';

export default class ParticipantScanExercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      delay: defaultNumbers.scanDelayValue,
      result: '',
      displayText: 'Scanne QR-Code ein.',
      exerciseId: '',
      scanError: false,
      hideAgreement: defaultMessages.hideAgreement(),
      successMessage: defaultSuccessMessages.scan,
      fireRedirect: false,
      locationPermission: undefined,
      position: {
        latitude: '',
        longitude: ''
      }
    };
    this.getAgreement = ModalHandler.getAgreement.bind(this);
  }

  componentDidMount() {
    if (this.state.hideAgreement) {
      this.locate();
    }
  }

  handleScan = data => {
    const jsonData = JSON.parse(data);
    if (data && Boolean(jsonData)) {
      let successMessage = {...this.state.successMessage};
      successMessage.showModal = true;
      this.setState({
        successMessage,
        executionId: jsonData.executionId,
        exerciseId: jsonData.exerciseId
      });
      setTimeout(
        () => this.setState({fireRedirect: true}),
        defaultNumbers.timeoutTime
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
        {!this.state.hideAgreement ? (
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
