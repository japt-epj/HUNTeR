import React from 'react';
import {Redirect} from 'react-router-dom';

import {Button, Grid} from 'semantic-ui-react';

import {colors, messages, modalOptions, numbers} from '../../config/hunterUiDefaults';
import {apiGetHandler} from '../../handlers/hunterApiHandlers';
import {
  mapInteractionHandler,
  mapLocationHandler,
  mapSelectionHandler,
  mapViewHandler
} from '../../handlers/hunterMapHandlers';
import {modalHandler} from '../../handlers/hunterViewHandlers';

export default class ParticipantNextLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideAgreement: messages.hideAgreement(),
      executionCompletedMessage: modalOptions.executionParticipant,
      executionId: Boolean(this.props.location.state) ? this.props.location.state.executionId : '',
      locations: new Map(),
      selectedPositions: new Map(),
      routing: false,
      routingLocation: undefined,
      loading: true,
      map: {
        location: undefined,
        zoom: numbers.zoomSize
      },
      fireRedirect: false,
      redirectPath: '/scan'
    };

    this.handleZoom = mapInteractionHandler.handleZoom.bind(this);
    this.locate = mapLocationHandler.locate.bind(this);
    this.handleNextLocationSelection = mapSelectionHandler.handleNextLocationSelection.bind(this);
    this.handleLocation = mapLocationHandler.participantHandleLocation.bind(this);
    this.promiseToLocation = mapLocationHandler.promiseToLocation.bind(this);
    this.getParticipantMap = mapViewHandler.getParticipantMap.bind(this);
    this.bounds = mapViewHandler.bounds.bind(this);

    this.getAgreement = modalHandler.getAgreement.bind(this);

    this.mapref = React.createRef();
  }

  componentDidMount() {
    if (this.state.hideAgreement) {
      this.locate();
    }
    this.promiseToLocation(apiGetHandler.getNextLocations(this.state.executionId));
  }

  redirect = () => {
    setTimeout(() => {
      this.setState({redirectPath: '/leaderBoard', fireRedirect: true});
    }, numbers.timeoutTime * 2);
  };

  scanRedirect = () => {
    this.setState({fireRedirect: true});
  };

  render() {
    return (
      <Grid padded>
        {!this.state.hideAgreement && this.getAgreement()}
        {this.state.showExecutionCompleted && modalHandler.getSuccess(this.state.executionCompletedMessage)}
        <Grid.Row id="mapContainer">{this.getParticipantMap()}</Grid.Row>
        <Grid.Row className="lessRowPadding" centered>
          <Button
            color={colors.buttonColors.normal}
            content={'Standort aktualisieren'}
            icon="marker"
            onClick={this.locate}
          />
        </Grid.Row>
        <Grid.Row className="lessRowPadding" centered>
          <Button
            color={colors.buttonColors.normal}
            content={'Nächste Aufgabe einscannen'}
            icon="retro camera"
            onClick={this.scanRedirect}
          />
        </Grid.Row>
        {this.state.fireRedirect && (
          <Redirect
            to={{
              pathname: this.state.redirectPath,
              state: {
                executionId: Boolean(this.state.executionId) ? this.state.executionId : 1
              }
            }}
          />
        )}
      </Grid>
    );
  }
}
