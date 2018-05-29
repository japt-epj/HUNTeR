import React from 'react';

import {Button, Grid} from 'semantic-ui-react';
import L from 'leaflet';

import APIHandler from '../../handlers/APIHandler';
import ModalHandler from '../../handlers/ModalHandler';
import defaultUIConfig from '../../config/defaultUIConfig';
import MapHandler from '../../handlers/MapHandler';

export default class ParticipantNextLocation extends React.Component {
  constructor(props) {
    super(props);
    const defaultZoomSize = 19;
    this.state = {
      showAgreement: defaultUIConfig.showAgreement,
      executionId:
        this.props.location.state !== undefined
          ? this.props.location.state.executionId
          : '',
      locations: new Map(),
      selectedPositions: new Map(),
      routing: false,
      routingLocation: undefined,
      loading: true,
      map: {
        location: undefined,
        zoom: defaultZoomSize
      }
    };

    this.getParticipantMap = MapHandler.getParticipantMap.bind(this);
    this.getJSONHeader = APIHandler.getJSONHeader;
    this.getAgreement = ModalHandler.getAgreement.bind(this);

    this.mapref = React.createRef();
  }

  componentDidMount() {
    this.promiceToLocation(APIHandler.getNextLocations(this.state.executionId));
  }

  locate = () => this.mapref.current.leafletElement.locate();

  promiceToLocation = promice => {
    let locations = new Map(this.state.locations);
    promice.then(resData => {
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

  handleZoom = event => {
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
    if (!this.state.routing && event.target.options.id !== undefined) {
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
        {this.state.showAgreement && this.getAgreement()}
        <Grid.Row id="mapContainer">{this.getParticipantMap()}</Grid.Row>
        <Grid.Row centered>
          <Button
            color={defaultUIConfig.buttonColors.normal}
            content={'Standort aktualisieren'}
            icon="marker"
            onClick={this.locate}
          />
        </Grid.Row>
      </Grid>
    );
  }
}
