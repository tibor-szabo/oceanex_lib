
var expect = require("chai").expect;
var oceanEx = require('../index.js');
var oceanex = new oceanEx.OceanEx();
describe('Public endpoints', function() {
    it("Check getMarkets()", function(done) {
        var checker = oceanex.getMarkets()
        checker.then(function(result){
            try {
                expect(result.code).to.equal(0);
                done();
            } catch(err) {
                done(err);
            }
        }, done);
    });
    it("Check getTicker() for VET/BTC market", function(done) {
        var checker = oceanex.getTicker('vetbtc')
        checker.then(function(result){
            try {
                expect(result.code).to.equal(0);
                done();
            } catch(err) {
                done(err);
            }
        }, done);
    });
    it("Check getAllTickers()", function(done) {
        var checker = oceanex.getAllTickers()
        checker.then(function(result){
            try {
                expect(result.code).to.equal(0);
                done();
            } catch(err) {
                done(err);
            }
        }, done);
    });

    it("Check getOrdebook() for VET/BTC market without limit", function(done) {
        var checker = oceanex.getOrderBook('vetbtc')
        checker.then(function(result){
            try {
                expect(result.code).to.equal(0);
                done();
            } catch(err) {
                done(err);
            }
        }, done);
    });

    it("Check getTicker() for VET/BTC market, limited to 5", function(done) {
        var checker = oceanex.getOrderBook('vetbtc', 5)
        checker.then(function(result){
            try {
                expect(result.code).to.equal(0);
                done();
            } catch(err) {
                done(err);
            }
        }, done);
    });

    it("Check getServerTime() ", function(done) {
        var checker = oceanex.getOrderBook('vetbtc', 5)
        checker.then(function(result){
            try {
                expect(result.code).to.equal(0);
                done();
            } catch(err) {
                done(err);
            }
        }, done);
    });
});

