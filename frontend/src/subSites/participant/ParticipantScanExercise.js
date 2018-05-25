import React from 'react';
import {Redirect} from 'react-router';

import {Message} from 'semantic-ui-react';

import APIHandler from '../../handlers/APIHandler';
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
      exercise: '',
      scanError: false,
      showAgreement: defaultUIConfig.showAgreement,
      showSuccess: false,
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
    if (
      jsonData !== null &&
      jsonData !== undefined &&
      jsonData.coordinates !== undefined
    ) {
      APIHandler.getExerciseArray(jsonData.exerciseId, 'exercise').then(
        resData => {
          if (resData.status === 200) {
            let exercise = resData.data[0];
            exercise.answers.forEach(function(element, index, arrayObject) {
              arrayObject[index] = {text: element, checked: false};
            });
            this.setState({
              exercise: {
                executionId: jsonData.executionId,
                exerciseId: exercise.id,
                name: exercise.name,
                question: exercise.question,
                answers: exercise.answers
              }
            });
            setTimeout(
              () => this.setState({fireRedirect: true, showSuccess: false}),
              defaultUIConfig.defaultTimeoutTime
            );
          } else {
            this.setState({scanError: true});
            this.setState({
              displayText:
                'Ungültige Aufgabe. Bitte scanne einen anderen QR-Code ein.'
            });
          }
        }
      );
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
        {this.state.showSuccess && ModalHandler.getScanSuccess()}
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
              state: {exercise: this.state.exercise}
            }}
          />
        )}
      </div>
    );
  }
}
