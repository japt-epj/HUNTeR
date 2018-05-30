import React from 'react';

import {Button, Grid} from 'semantic-ui-react';
import L from 'leaflet';

import APIHandler from '../../handlers/APIHandler';
import ModalHandler from '../../handlers/ModalHandler';
import defaultColors from '../../config/defaultColors';
import MapHandler from '../../handlers/MapHandler';
import defaultMessages from '../../config/defaultMessages';
import defaultNumbers from '../../config/defaultNumbers';

export default class ParticipantNextLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideAgreement: defaultMessages.hideAgreement(),
      executionId: Boolean(this.props.location.state)
        ? this.props.location.state.executionId
        : '',
      locations: new Map(),
      selectedPositions: new Map(),
      routing: false,
      routingLocation: undefined,
      loading: true,
      map: {
        location: undefined,
        zoom: defaultNumbers.defaultZoomSize
      }
    };

    this.getParticipantMap = MapHandler.getParticipantMap.bind(this);
    this.getJSONHeader = APIHandler.getJSONHeader;
    this.getAgreement = ModalHandler.getAgreement.bind(this);

    this.mapref = React.createRef();
  }

  componentDidMount() {
    if (this.state.hideAgreement) {
      this.locate();
    }
    this.promiceToLocation(APIHandler.getNextLocations(this.state.executionId));
  }

  locate = () => this.mapref.current.leafletElement.locate();

  promiceToLocation = promise => {
    let locations = new Map(this.state.locations);
    promise.then(resData => {
      const resDataArray =
        this.state.executionId === '' ? resData.data : new Array(resData.data);
      resDataArray.forEach(element => {
        locations.set(element.exerciseTitle, [element.lat, element.lng]);
      });
    });
    this.setState({
      locations,
      selectedPositions: new Map(locations),
      loading: false
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
    let locations = new Map(this.state.locations);
    if (!this.state.routing && Boolean(event.target.options.id)) {
      locations = new Map([
        ['currentPosition', this.state.locations.get('currentPosition')],
        [
          event.target.options.id,
          this.state.locations.get(event.target.options.id)
        ]
      ]);
      this.setState({routing: false});
    }

    this.setState({selectedPositions: locations});
  };

  bounds = () => {
    const boundLocations =
      Array.from(this.state.selectedPositions.values()).length !== 0
        ? Array.from(this.state.selectedPositions.values())
        : [[0, 0]];

    return L.latLngBounds(boundLocations);
  };

  render() {
    return (
      <Grid padded>
        {!this.state.hideAgreement && this.getAgreement()}
        <Grid.Row id="mapContainer">{this.getParticipantMap()}</Grid.Row>
        <Grid.Row centered>
          <Button
            color={defaultColors.buttonColors.normal}
            content={'Standort aktualisieren'}
            icon="marker"
            onClick={this.locate}
          />
        </Grid.Row>
      </Grid>
    );
  }
}
