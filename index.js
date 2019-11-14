const axios = require('axios');

const API_BASE_URL = 'https://api.oceanex.pro/v1/'

var exports = module.exports = {};

exports.getMarkets = async function() {
    let res = await axios.get(API_BASE_URL + 'markets');
    return res.data;
};
    