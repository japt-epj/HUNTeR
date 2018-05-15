let config = {
<<<<<<< HEAD
  apiURL: '/api/',
  mainURL: `https://${window.location.hostname}`,
  domain: window.location.hostname
};

if (process.env.NODE_ENV === 'development') {
  config.apiURL = `http://${window.location.hostname}:8080/api/`;
  config.mainURL = `http://${window.location.hostname}:3000`;
=======
  baseurl: '/api/'
};

if (process.env.NODE_ENV === 'development') {
  config.baseurl = `http://${window.location.hostname}:8080/api/`;
>>>>>>> master
}

export default Object.freeze(Object.assign({}, config));
