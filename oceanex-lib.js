const axios = require('axios');
const jwt  = require('jsonwebtoken');

const API_BASE_URL = 'https://api.oceanex.pro/v1/'

var SIGN_OPTIONS = {
    issuer:  'i',
    subject:  's',
    audience:  'a',
    expiresIn:  "12h",
    algorithm:  "RS256"
};

var exports = module.exports = {};

exports.OceanEx = class  {
    constructor(uid, privateKey) {
        this.UID = uid
        this.privateKey = privateKey
    }
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

    // Helper method to call private GET
    async  privateGetQuery(query, payload) {
        let token = jwt.sign(payload, this.privateKey, SIGN_OPTIONS);
      
        let execQuery = query + 'user_jwt=' + token
      
        let res = await axios.get(execQuery);
        return res.data;
    }

    async  privatePostQuery(query, payload) {   
        let token = jwt.sign(payload, this.privateKey, SIGN_OPTIONS);
        let execQuery = query + 'user_jwt=' + token
       
        let res = await axios.post(execQuery);
        return res.data;
    }    

    async getHoldings() {
        let getHoldings = {
            "uid": this.UID,
            "data": {
            }
        }
        let holdings = await this.privateGetQuery('https://api.oceanex.pro/v1/members/me?' , getHoldings);
        return holdings
    }
}

