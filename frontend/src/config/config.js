let config = {
  apiURL: '/api/',
  mainURL: `https://${window.location.hostname}`,
  domain: window.location.hostname,
  buttonColors: {
    normal: 'green',
    download: 'orange'
  },
  defaultNumbers: {
    pageNumber: 1,
    exerciseLimitPerPage: 5
  }
};

if (process.env.NODE_ENV === 'development') {
  const apiPort = 8080;
  const websitePort = 3000;
  config.apiURL = `http://${window.location.hostname}:${apiPort}/api/`;
  config.mainURL = `http://${window.location.hostname}:${websitePort}`;
}

export default Object.freeze(Object.assign({}, config));
