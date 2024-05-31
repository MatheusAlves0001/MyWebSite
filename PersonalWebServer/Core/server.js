const http = require("http");
const parse = require('url').parse;
const config = require('./config.json');
const fileHandler = require('./filehandler');

const server = http.createServer();
module.exports = server;

server.on('request', onRequest);

function onRequest(req, res) {

    let filename = parse(req.url).pathname;
  
    if(filename === '/') {
  
        filename = config.defaultIndex;
     }
  
     const fullPath = `${config.rootFolder}${filename}`;
     const extension = filename.substr(filename.lastIndexOf('.') + 1);
  
    fileHandler(fullPath, function(data) {
  
          res.writeHead(200, {

               'Content-Type': config.types[extension] || 'text/plain',
               'Content-Length': data.length

          });
  
          res.end(data);
  
      }, function(err) {
  
          res.writeHead(404);
          res.end();
          
      });
  
}