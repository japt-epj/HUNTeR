import React from 'react';

import {Map as LeafletMap, Marker, Tooltip, TileLayer} from 'react-leaflet';
import defaultUIConfig from '../config/defaultUIConfig';

export default {
  addPosition(element) {
    if (this.state.map.currentExercise !== undefined) {
      let newPositions = this.state.selectedPositions;
      newPositions.set(this.state.map.currentExercise, this.state.map.location);
      this.setState({selectedPositions: newPositions});
    }
    let map = {...this.state.map};
    map.currentExercise = element.id;
    map.popupText = element.name;
    if (this.state.selectedPositions.get(element.id) === undefined) {
      map.location = this.state.map.location;
    } else {
      map.location = this.state.selectedPositions.get(element.id);
    }
    this.setState({map: map});
  },

  getQuizMap() {
    const pointer = defaultUIConfig.mapIcons.pointer;

    return (
      <LeafletMap
        center={this.state.map.location || [0, 0]}
        onClick={this.handleClick}
        onLocationFound={this.handleLocation}
        zoom={this.state.map.zoom}
        onZoomEnd={this.handleZoom}
        ref={this.mapref}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {this.state.map.location !== undefined && (
          <Marker position={this.state.map.location} icon={pointer}>
            {this.state.map.popupText !== undefined && (
              <Tooltip
                direction="left"
                offset={[-50, 75]}
                opacity={0.9}
                permanent
              >
                <span>{this.state.map.popupText}</span>
              </Tooltip>
            )}
          </Marker>
        )}
      </LeafletMap>
    );
  },

  getParticipantMap() {
    const pointer = defaultUIConfig.mapIcons.pointer;
    const protagonist = defaultUIConfig.mapIcons.protagonist;

    return (
      <LeafletMap
        center={this.state.map.location || [0, 0]}
        bounds={this.bounds()}
        onLocationFound={this.handleLocation}
        onClick={this.handleSelection}
        zoom={this.state.map.zoom}
        onZoomEnd={this.handleZoom}
        ref={this.mapref}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {Array.from(this.state.selectedPositions.keys()).map(element => (
          <Marker
            key={element}
            id={element}
            position={this.state.locations.get(element)}
            icon={element === 'currentPosition' ? protagonist : pointer}
            onClick={this.handleSelection}
          >
            <Tooltip
              direction="left"
              offset={element === 'currentPosition' ? [-16, 0] : [-50, 75]}
              opacity={0.9}
              permanent
            >
              <span>{element}</span>
            </Tooltip>
          </Marker>
        ))}
      </LeafletMap>
    );
  }
};
