const axios = require("axios");

const cricketApi = axios.create({
  baseURL: "https://api.cricapi.com/v1",
  params: {
    apikey: process.env.CRIC_API_KEY,
  },
});

module.exports = cricketApi;