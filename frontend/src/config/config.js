let config = {
    baseurl: "/api/",
    domain: window.location.hostname
};

if (process.env.NODE_ENV === 'development') {
    config.baseurl = `http://${window.location.hostname}:8080/api/`
}

export default Object.freeze(Object.assign({}, config));