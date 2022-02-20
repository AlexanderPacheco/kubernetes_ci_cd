//para construir el API endpoint para cada servicio get, put, etc...
const axios = require('axios');

module.exports = (baseURL) => {
    return axios.create({
        baseURL: baseURL,
    });
}