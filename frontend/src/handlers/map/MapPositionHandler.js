export default {
  addPosition(element) {
    if (Boolean(this.state.map.currentExercise)) {
      let newPositions = this.state.selectedPositions;
      newPositions.set(this.state.map.currentExercise, this.state.map.location);
      this.setState({selectedPositions: newPositions});
    }
    let map = {...this.state.map};
    map.currentExercise = element.id;
    map.popupText = element.name;
    if (!Boolean(this.state.selectedPositions.get(element.id))) {
      map.location = this.state.map.location;
    } else {
      map.location = this.state.selectedPositions.get(element.id);
    }
    this.setState({map: map});
  }
};
