import React from 'react';

import {Button, Grid} from 'semantic-ui-react';
import L from 'leaflet';
import {Map as LeafletMap, Marker, Tooltip, TileLayer} from 'react-leaflet';

import APIHandler from '../../handlers/APIHandler';

export default class ParticipantNextLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formOK: true,
      name: '',
      locations: [],
      loading: true,
      map: {
        location: undefined,
        zoom: 19
      }
    };

    this.getJSONHeader = APIHandler.getJSONHeader;

    this.mapref = React.createRef();
  }

  componentDidMount() {
    this.locate();
    this.getNextLocation();
  }

  locate = () => {
    this.mapref.current.leafletElement.locate();
  };

  getNextLocation = () => {
    //APIHandler.getNextLocation().then(resData => {
    //if (resData.status === 200) {
    const locations = [
      {
        title: 'Sächsilüteplatz',
        position: [47.3657915787404, 8.546044569772025]
      },
      {
        title: 'Stadelhofen',
        position: [47.36655475763491, 8.54838211269385]
      },
      {title: 'Bellevue', position: [47.36708603093426, 8.545077518816951]},
      {title: 'Bürkliplatz', position: [47.36651165640272, 8.541301747456341]}
    ];

    this.setState({
      //quizzes: resData.locations,
      locations,
      loading: false
    });
    //});
  };

  handleZoom = event => {
    let map = {...this.state.map};
    map.zoom = this.mapref.current.leafletElement.getZoom();
    this.setState({map});
  };

  handleLocation = event => {
    let locations = [...this.state.locations];
    if (locations[0].id === 'currentPosition') {
      locations[0] = {
        id: 'currentPosition',
        title: 'Aktuelle Position',
        position: [event.latlng.lat, event.latlng.lng]
      };
    } else {
      locations.unshift({
        id: 'currentPosition',
        title: 'Aktuelle Position',
        position: [event.latlng.lat, event.latlng.lng]
      });
    }

    let map = {...this.state.map};
    map.zoom = this.mapref.current.leafletElement.getZoom();
    map.location = event.latlng;
    map.clicked = false;
    this.setState({map, locations});
  };

  render() {
    const pointer = L.icon({
      iconUrl: require('../../images/icons/e-map.png'),
      iconSize: [50, 94],
      iconAnchor: [50, 0]
    });

    const protagonist = L.icon({
      iconUrl: require('../../images/icons/protagonist.png'),
      iconSize: [33, 92],
      iconAnchor: [16, 46]
    });

    return (
      <Grid padded>
        <Grid.Row id="mapContainer">
          <LeafletMap
            center={this.state.map.location || [0, 0]}
            onLocationFound={this.handleLocation}
            zoom={this.state.map.zoom}
            onZoomEnd={this.handleZoom}
            ref={this.mapref}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {this.state.locations.map(element => (
              <Marker
                position={element.position}
                icon={element.id === 'currentPosition' ? protagonist : pointer}
                key={element.title + JSON.stringify(element.position)}
              >
                {element.title !== undefined && (
                  <Tooltip
                    direction="left"
                    offset={
                      element.id === 'currentPosition' ? [-16, 0] : [-50, 75]
                    }
                    opacity={0.9}
                    permanent
                  >
                    <span>{element.title}</span>
                  </Tooltip>
                )}
              </Marker>
            ))}
          </LeafletMap>
        </Grid.Row>
        <Grid.Row centered>
          <Button
            positive
            content={'Standort aktualisieren'}
            icon="marker"
            onClick={this.locate}
          />
        </Grid.Row>
      </Grid>
    );
  }
}
