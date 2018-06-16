export default {
  handleZoom() {
    let map = {...this.state.map};
    map.zoom = this.mapref.current.leafletElement.getZoom();
    this.setState({map});
  },

  handleClick(event) {
    let map = {...this.state.map};
    map.location = event.latlng;
    map.zoom = this.mapref.current.leafletElement.getZoom();
    map.clicked = true;
    let newPositions = new Map(this.state.selectedPositions);
    if (Boolean(this.state.map.currentExercise)) {
      newPositions.set(this.state.map.currentExercise, this.state.map.location);
    }
    this.setState({
      selectedPositions: newPositions,
      map
    });
  }
};
