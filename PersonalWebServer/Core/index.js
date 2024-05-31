const args = process.argv;
const port = args[2] || 9981;
const webServer = require('./server');

webServer.listen(port, function() {

    console.log('Server started at port ' + port);

  });