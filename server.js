const http = require('http');
const fs   = require('fs');
const OceanEx = require('./oceanex-lib.js');

const hostname = '127.0.0.1';
const port = 3000;

const privateKey = fs.readFileSync('/Users/tiborszabo/Documents/trading/private.pem', 'utf8');

const server = http.createServer((req, res) => {
  var oceanex = new OceanEx.OceanEx('ID23C0B00A48', privateKey);
  oceanex.getHoldings().then(function(hld) {
    oceanex.getAllTickers().then(function(tckrs) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.write(JSON.stringify(tckrs))
      res.end();
    });
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

