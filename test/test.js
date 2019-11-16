
var expect = require("chai").expect;
var oceanex = require('../oceanex-lib.js');
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
});

