require('./../').start()
const http = require('http');

function handleRequest(request, response) {
   response.end('Hello, world!');
}

const server = http.createServer(handleRequest);

server.listen(8888);