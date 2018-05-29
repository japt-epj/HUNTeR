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
    const pointer = defaultUIConfig.map.icons.pointer;

    return (
      <LeafletMap
        center={
          this.state.map.location || defaultUIConfig.map.defaultMapLocation
        }
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
                offset={defaultUIConfig.map.icons.pointer.offset}
                opacity={defaultUIConfig.map.icons.opacity}
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
    const pointer = defaultUIConfig.map.icons.pointer;
    const protagonist = defaultUIConfig.map.icons.protagonist;

    return (
      <LeafletMap
        center={
          this.state.map.location || defaultUIConfig.map.defaultMapLocation
        }
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
              offset={
                element === 'currentPosition'
                  ? defaultUIConfig.map.icons.pointer.offset
                  : defaultUIConfig.map.icons.protagonist.offset
              }
              opacity={defaultUIConfig.map.icons.opacity}
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
