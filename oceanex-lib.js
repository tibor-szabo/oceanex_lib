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

    async createTrade(market, side, volume, price, type = 'limit')
    {
        console.log('> Attempting to create trade market: ' + market + ' side: ' + side + ' volume: ' + volume + ' price: ' + price)

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

        if (tradeResult.code == 0) {
            return tradeResult;
        }

        // FIXME:
        console.log("Something went wrong !!!!!! ")
        console.log(tradeResult)
        return tradeResult;
    }

    async cancelTrade(id)
    {
        console.log('Attempting to cancel trade id: ' + id )

        let cancelTrade={
            "uid": this.UID,
            "data": {
            "id" : id
            }
        }

        let result = await this.privatePostQuery('https://api.oceanex.pro/v1/order/delete?' , cancelTrade);

        if (result.data.state == 'done') {
            console.log("Trade cancelled!")
            console.log(result.data)
        }
        else {
            console.log("Something went wrong !!!!!!")
            console.log(result)
        }
        return result.data;
    }

    async getOrderStatus(id)
    {
        //console.log('Attempting to get status of trade id: ' + id )

        let data = {
            "uid": UID,
            "data": {
            "ids" : [id]
            }
        }

        let result = await this.privateGetQuery(' https://api.oceanex.pro/v1/orders?' , data);

        if (result.code != 0) {
            console.log(result)
        }
        
        return result.data;
    }
}

