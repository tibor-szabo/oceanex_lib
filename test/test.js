
var expect = require("chai").expect;
var oceanex = require('../oceanex-lib.js');
describe('getMarkets', function() {
    it("Using a Promise that resolves successfully!", function(done) {
        var testPromise = oceanex.getMarkets()
        testPromise.then(function(result) {
            expect(result).to.length > 0
            done();
        }, done);
    });
});

