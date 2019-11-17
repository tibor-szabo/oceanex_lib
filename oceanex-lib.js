const axios = require('axios');

const API_BASE_URL = 'https://api.oceanex.pro/v1/'

var exports = module.exports = {};

exports.OceanEx = class  {
    // Public endpoints
    //
    async getMarkets() {
        let res = await axios.get(API_BASE_URL + 'markets');
        return res.data;
    };
        
    async getTicker(market) {
        let res = await axios.get(API_BASE_URL + 'tickers/' + market);
        return res.data;
    };

    async getAllTickers() {
        let res = await axios.get(API_BASE_URL + 'tickers');
        return res.data;
    };

    async getOrderBook(market, limit = 30) {
        let res = await axios.get(API_BASE_URL + 'order_book?market=' + market + '&limit=' + limit);
        return res.data;
    };

    async getServerTime() {
        let res = await axios.get(API_BASE_URL + 'timestamp');

        let date = new Date(res.data.data * 1000);
        return date;
    };

    // Private endopoints
    //
}

