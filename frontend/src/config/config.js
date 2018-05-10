let config = {
  baseurl: "/api/"
};

if (process.env.NODE_ENV === "development") {
  config.baseurl = `http://${window.location.hostname}:8080/api/`;
}

export default Object.freeze(Object.assign({}, config));
