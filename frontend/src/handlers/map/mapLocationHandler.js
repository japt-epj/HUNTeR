export default {
  locate() {
    this.mapref.current.leafletElement.locate();
  },

  promiseToLocation(promise) {
    let locations = new Map(this.state.locations);
    promise.then(resData => {
      if (!Boolean(resData.data)) {
        this.setState({showExecutionCompleted: true});
        this.redirect();
        return;
      }
      const resDataArray = Boolean(this.state.executionId) ? new Array(resData.data) : resData.data;
      resDataArray
        .filter(element => {
          return Boolean(element.exerciseTitle);
        })
        .forEach(element => {
          locations.set(element.exerciseTitle, [element.lat, element.lng]);
        });
      this.setState({
        locations,
        selectedPositions: new Map(locations),
        loading: false
      });
    });
  },

  teacherQuizHandleLocation(event) {
    let map = {...this.state.map};
    map.zoom = this.mapref.current.leafletElement.getZoom();
    map.location = event.latlng;
    map.clicked = false;
    this.setState({map});
  },

  participantHandleLocation(event) {
    let locations = new Map(this.state.locations);
    locations.set('currentPosition', [event.latlng.lat, event.latlng.lng]);
    this.setState({locations, selectedPositions: new Map(locations)});
  }
};
