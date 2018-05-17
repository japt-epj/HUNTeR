import React from 'react';
import {Redirect} from 'react-router';

import {Message} from 'semantic-ui-react';

import APIHandler from '../../handlers/APIHandler';
import QrReader from 'react-qr-reader';
import ModalHandler from '../../handlers/ModalHandler';

export default class ParticipantScanExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      result: '',
      displayText: 'Scanne QR-Code ein.',
      exercise: '',
      scanError: false,
      showAgreement: true,
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
    if (data) {
      APIHandler.getExerciseArray(data, 'exercise').then(resData => {
        if (resData.status === 200) {
          let exercise = resData.data[0];
          exercise.answers.forEach(function(element, index, arrayObject) {
            arrayObject[index] = {text: element, checked: false};
          });
          this.setState({
            exercise: {
              exerciseId: exercise.id,
              name: exercise.name,
              question: exercise.question,
              answers: exercise.answers
            }
          });
          this.setState({fireRedirect: true});
        } else {
          this.setState({scanError: true});
          this.setState({
            displayText:
              'Ungültige Aufgabe. Bitte scanne einen anderen QR-Code ein.'
          });
        }
      });
    }
  };

  handleError = err => {
    console.error(err);
  };

  render() {
    return (
      <div>
        {this.state.showAgreement ? (
          this.getAgreement()
        ) : (
          <div>
            {navigator.geolocation.getCurrentPosition(position =>
              this.setState({
                position: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                }
              })
            )}
            <QrReader
              delay={this.state.delay}
              onError={this.handleError}
              onScan={this.handleScan}
            />
            <Message
              icon="camera retro"
              size="mini"
              header={this.state.displayText}
              error={this.state.scanError}
            />
          </div>
        )}

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
