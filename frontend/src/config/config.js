let config = {
  apiURL: '/api/',
  mainURL: `https://${window.location.hostname}`,
  domain: window.location.hostname
};

if (process.env.NODE_ENV === 'development') {
  config.apiURL = `http://${window.location.hostname}:8080/api/`;
  config.mainURL = `http://${window.location.hostname}:3000`;
}

export default Object.freeze(Object.assign({}, config));
