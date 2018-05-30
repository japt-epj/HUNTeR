import React from 'react';

import {Message} from 'semantic-ui-react';

import QrReader from 'react-qr-reader';
import ModalHandler from '../../handlers/ModalHandler';
import defaultNumbers from '../../config/defaultNumbers';
import defaultMessages from '../../config/defaultMessages';

export default class TeacherNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 500,
      result: '',
      displayText: 'Scanne QR-Code für die Navigation ein.',
      scanError: false,
      showAgreement: defaultMessages.showAgreement,
      showSuccess: false,
      fireRedirect: false,
      locationPermission: undefined,
      coordinates: {
        lat: '',
        lng: ''
      }
    };

    this.defaultDisplayText = this.state.displayText;
    this.getAgreement = ModalHandler.getAgreement.bind(this);
  }

  handleScan = data => {
    const jsonData = JSON.parse(data);
    if (data && Boolean(jsonData.coordinates)) {
      this.setState({
        coordinates: {
          lat: jsonData.coordinates.lat,
          lng: jsonData.coordinates.lng
        },
        displayText: 'Klicken um auf Google Maps weitergeleitet zu werden.',
        scanError: false,
        showSuccess: true
      });
      setTimeout(
        () => this.setState({fireRedirect: true, showSuccess: false}),
        defaultNumbers.timeoutTime
      );
    } else {
      this.setState({
        scanError: true,
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
        {this.state.showSuccess && ModalHandler.getScanSuccess()}
        {this.state.showAgreement ? (
          this.getAgreement()
        ) : (
          <div>
            {this.state.fireRedirect ? (
              <div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin&destination=${
                    this.state.coordinates.lat
                  },${this.state.coordinates.lng}&travelmode=walking&hl=de`}
                  target="_blank"
                >
                  <Message
                    icon="arrow right"
                    size="mini"
                    header={this.state.displayText}
                  />
                </a>
                <Message
                  icon="undo"
                  size="mini"
                  header="Anderen QR-Code einscannen"
                  onClick={() =>
                    this.setState({
                      displayText: this.defaultDisplayText,
                      fireRedirect: false
                    })
                  }
                />
              </div>
            ) : (
              <div>
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
          </div>
        )}
      </div>
    );
  }
}
