const axios = require('axios');
const jwt  = require('jsonwebtoken');

const API_BASE_URL = 'https://api.oceanex.pro/v1/'

const LIB_NM = '[oceanex-lib]'

var SIGN_OPTIONS = {
    issuer:  'self-signed',
    subject:  'oceanex-trading',
    audience:  'oceanex',
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

    async createTrade(market, side, volume, price, type = 'limit')
    {
        console.log(LIB_NM + ' Creating trade market: ' + market + ' side: ' + side + ' volume: ' + volume + ' price: ' + price)

        let createTrade={
            "uid": this.UID,
            "data": {
            "market" : market,
            "side" : side,
            "price" : price,
            "volume": volume,
            "ord_type" : type
            }
        }

        let tradeResult = await this.privatePostQuery('https://api.oceanex.pro/v1/orders?' , createTrade);

        if (tradeResult.code != 0) {
            throw new Error('Unable to createTrade with market: ' + market + ' side: ' + side + ' volume: ' + volume + ' price: ' + price + ' ERROR: ' + tradeResult.message);
        } else {
            console.log(LIB_NM + ' Trade created ... ')
        }

        return tradeResult;
    }

    async cancelTrade(id)
    {
        console.log(LIB_NM + ' Cancelling trade id: ' + id )

        let cancelTrade={
            "uid": this.UID,
            "data": {
            "id" : id
            }
        }

        let result = await this.privatePostQuery('https://api.oceanex.pro/v1/order/delete?' , cancelTrade);

        if (result.code != 0) {
            throw new Error('Unable to cancel trade id: ' + id + ' ERROR: ' + result.message);
        }
        else {
            console.log(LIB_NM + ' Trade cancelled id: ' + id)
        }
        return result.data;
    }

    async getOrderStatus(id)
    {
        let data = {
            "uid": this.UID,
            "data": {
            "ids" : [id]
            }
        }

        let result = await this.privateGetQuery(' https://api.oceanex.pro/v1/orders?' , data);

        if (result.code != 0) {
            throw new Error('Unable to get status of trade id: ' + id + ' ERROR: ' + result.message);
        }
        
        return result.data;
    }
}

