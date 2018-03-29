let config = {
    baseurl: "/api/"
};

if (process.env.NODE_ENV === 'development') {
    config.baseurl = "http://localhost:8080/api/"
}

export default Object.freeze(Object.assign({}, config));