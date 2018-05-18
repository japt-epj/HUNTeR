let config = {
  apiURL: '/api/',
  mainURL: `https://${window.location.hostname}`,
  domain: window.location.hostname
};

if (process.env.NODE_ENV === 'development') {
  const apiPort = 8080;
  const websitePort = 3000;
  config.apiURL = `http://${window.location.hostname}:${apiPort}/api/`;
  config.mainURL = `http://${window.location.hostname}:${websitePort}`;
}

export default Object.freeze(Object.assign({}, config));
