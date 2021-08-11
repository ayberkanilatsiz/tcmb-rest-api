const axios = require("axios");

const instance = axios.create({
  baseURL: 'https://www.tcmb.gov.tr/kurlar'
});

module.exports = { instance };