require('./../').start()
var http = require('http');

function handleRequest(request, response) {
   response.end('Hello, world!');
}

var server = http.createServer(handleRequest);

server.listen(8888);