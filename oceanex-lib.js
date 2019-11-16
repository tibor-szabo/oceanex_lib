const axios = require('axios');

const API_BASE_URL = 'https://api.oceanex.pro/v1/'

var exports = module.exports = {};

exports.getMarkets = async function() {
    let res = await axios.get(API_BASE_URL + 'markets');
    return res.data;
};
    
exports.getTicker = async function(market) {
    let res = await axios.get(API_BASE_URL + 'tickers/' + market);
    return res.data;
};

exports.getAllTickers = async function() {
    let res = await axios.get(API_BASE_URL + 'tickers');
    return res.data;
};

exports.getOrderBook = async function(market, limit = 30) {
    let res = await axios.get(API_BASE_URL + 'order_book?market=' + market + '&limit=' + limit);
    return res.data;
};
 