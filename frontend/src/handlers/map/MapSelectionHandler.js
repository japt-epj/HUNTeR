export default {
  handleNextLocationSelection(event) {
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
  }
};
