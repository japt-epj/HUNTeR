import React from 'react';
import {Redirect} from 'react-router-dom';

import {Button, Grid} from 'semantic-ui-react';
import L from 'leaflet';

import {colors, map, messages, modalOptions, numbers} from '../../config/hunterUiDefaults';
import {apiGetHandler} from '../../handlers/hunterApiHandler';
import {mapHandler, modalHandler} from '../../handlers/hunterViewHandlers';

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

    this.getParticipantMap = mapHandler.getParticipantMap.bind(this);
    this.getAgreement = modalHandler.getAgreement.bind(this);

    this.mapref = React.createRef();
  }

  componentDidMount() {
    if (this.state.hideAgreement) {
      this.locate();
    }
    this.promiseToLocation(apiGetHandler.getNextLocations(this.state.executionId));
  }

  locate = () => this.mapref.current.leafletElement.locate();

  promiseToLocation = promise => {
    let locations = new Map(this.state.locations);
    promise.then(resData => {
      if (!Boolean(resData.data)) {
        this.setState({showExecutionCompleted: true});
        this.redirect();
        return;
      }
      const resDataArray = Boolean(this.state.executionId) ? new Array(resData.data) : resData.data;
      resDataArray.forEach(element => {
        locations.set(element.exerciseTitle, [element.lat, element.lng]);
      });
      this.setState({
        locations,
        selectedPositions: new Map(locations),
        loading: false
      });
    });
  };

  handleZoom = () => {
    let map = {...this.state.map};
    map.zoom = this.mapref.current.leafletElement.getZoom();
    this.setState({map});
  };

  handleLocation = event => {
    let locations = new Map(this.state.locations);
    locations.set('currentPosition', [event.latlng.lat, event.latlng.lng]);
    this.setState({locations, selectedPositions: new Map(locations)});
  };

  handleSelection = event => {
    const currentPosition = 'currentPosition';
    let locationId = event.target.options.id;
    let locations = new Map(this.state.locations);
    if (!this.state.routing && Boolean(locationId) && Boolean(this.state.locations.get(currentPosition))) {
      locations = new Map([
        [currentPosition, this.state.locations.get(currentPosition)],
        [locationId, this.state.locations.get(locationId)]
      ]);
      this.setState({routing: false});
    }
    this.setState({selectedPositions: locations});
  };

  bounds = () => {
    const boundLocations =
      Array.from(this.state.selectedPositions.values()).length !== 0
        ? Array.from(this.state.selectedPositions.values())
        : [map.baseLocation];
    return L.latLngBounds(boundLocations);
  };

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
                executionId: this.state.executionId
              }
            }}
          />
        )}
      </Grid>
    );
  }
}
