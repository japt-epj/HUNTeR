let defaultUIConfig = {
  buttonColors: {
    normal: 'green',
    download: 'orange'
  },
  defaultNumbers: {
    pageNumber: 1,
    exerciseLimitPerPage: 5,
    defaultZoomSize: 19
  },
  defaultTimoutTime: 2500
};

export default Object.freeze(Object.assign({}, defaultUIConfig));
