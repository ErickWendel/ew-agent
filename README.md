# APM Agent

This module is an instrumentation program responsible for add a custom APM HTTP Header for all your requests.

## Getting started

1. Install node. The agent runs on v10 and higher. Development work on this module is done with the latest stable release of Node.
2. Add `require('@erickwendel/ew-agent').start()` as the first line of the app's main module

## Examples

```js
require('@erickwendel/ew-agent').start()
var http = require('http');

function handleRequest(request, response) {
   response.end('Hello, world!');
}

var server = http.createServer(handleRequest);

server.listen(8888);
```

```bash
curl -I http://localhost:8888/
```

```bash
HTTP/1.1 200 OK
X-Instrumented-By: ErickWendel
X-request-id: 1fdf1c84-aa84-4e6f-bbf4-c608f4c6bf23
Date: Tue, 14 Jul 2020 20:43:04 GMT
Connection: keep-alive
Content-Length: 13
```

## Testing

```bash
npm test
```
