import React from 'react';

import L from 'leaflet';
import {Map as LeafletMap, Marker, Tooltip, TileLayer} from 'react-leaflet';

import APIHandler from '../../handlers/APIHandler';

export default class ParticipantNextLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formOK: true,
      name: '',
      quizzes: [],
      loading: true,
      map: {
        location: undefined,
        zoom: 1
      }
    };

    this.getJSONHeader = APIHandler.getJSONHeader;

    this.mapref = React.createRef();
  }

  componentDidMount() {
    this.getNextLocation();
    this.mapref.current.leafletElement.locate();
  }

  getNextLocation = () => {
    //APIHandler.getNextLocation().then(resData => {
    //if (resData.status === 200) {
    this.setState({
      //quizzes: resData.quizzes,
      quizzes: [
        {title: 'Hallo', position: [0, 0]},
        {title: 'Hallo2', position: [20.0, 20.0]},
        {title: 'Hallo3', position: [30, 30]},
        {title: 'Hallo4', position: [40.0, 40.0]}
      ],
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
    let map = {...this.state.map};
    map.zoom = this.mapref.current.leafletElement.getZoom();
    map.location = event.latlng;
    map.clicked = false;
    this.setState({map});
  };

  render() {
    const image = L.icon({
      iconUrl: require('../../images/icons/e-map.png'),
      iconSize: [50, 94],
      iconAnchor: [50, 0]
    });

    const marker =
      this.state.map.location !== undefined
        ? this.state.quizzes.map(element => (
            <Marker position={element.position} icon={image}>
              {element.title !== undefined && (
                <Tooltip
                  direction="left"
                  offset={[-50, 75]}
                  opacity={0.9}
                  permanent
                >
                  <span>{element.title}</span>
                </Tooltip>
              )}
            </Marker>
          ))
        : null;

    return (
      <div id="mapContainer">
        <LeafletMap
          center={this.state.map.location || [0, 0]}
          onLocationFound={this.handleLocation}
          zoom={this.state.map.zoom}
          onZoomEnd={this.handleZoom}
          ref={this.mapref}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {marker}
        </LeafletMap>
      </div>
    );
  }
}
