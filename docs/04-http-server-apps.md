The HTTP server object is the foundation of all Node.js web applications.

The HTTP object is very close to the HTTP protocol.

In order to use the HTTP object, you will be required knowledge of the HTTP protocol.

In most cases you'll be able to use an application framework like `express` which hides the HTTP protocol details. This helps the programmer by allowing focus on business logic.

## Simple HTTP Server Application

```js
const http = require("http");
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("Welcome to Basstap Records!\n");
  })
  .listen(8124, "127.0.0.1");
console.log("Air is running at http://127.0.0.1:8124");
```

The `http.createServer` function creates an `http.Server` object.

The `http.Server` is an `EventEmitter`.
We can be more explicit about this fact by refactoring the code to this:

## Explicit HTTP Server Application

```js
const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
  res.writeHead(200, { "Content-type": "text/plain" });
  res.end("Welcome to Basstap Records!\n");
});
server.listen(8124, "127.0.0.1");
console.log("Air is running at http://127.0.0.1:8124");
```

The `request` event takes a function, which receives `request` and `response` objects.

The `request` object has data from the web browser
The `response` object is used to gather the data to be sent in the response.

The `listen` function causes the server to start listening and arranging to dispatch an event for every request arriving from the web browser.

## Different actions based on the URL

Routing requests to request handlers is the central part of this application.

```js
const http = require("http");
const util = require("util");
const url = require("url");
const os = require("os");

const server = http.createServer();
server.on("request", (req, res) => {
  const requrl = url.parse(req.url, true);
  if (requrl.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      `<html><head>
      <title>Welcome to Basstap Records!</title>
      </head>
      <body>
      <h1>Welcome to Basstap Records!</h1>
      <p><a href='/osinfo'>OS Info</a></p>
      </body></html>`
    );
  } else if (requrl.pathname === "/osinfo") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      `<html><head><title>Operating System Info</title></head>
<body><h1>Operating System Info</h1>
<table>
<tr><th>TMP Dir</th><td>${os.tmpdir()}</td></tr>
<tr><th>Host Name</th><td>${os.hostname()}</td></tr>
<tr><th>OS Type</th><td>${os.type()} ${os.platform()} ${os.arch()} ${os.release()}</td></tr>
<tr><th>Uptime</th><td>${os.uptime()} ${util.inspect(os.loadavg())}</td></tr>
<tr><th>Memory</th><td>total: ${os.totalmem()} free: ${os.freemem()}</td></tr>
<tr><th>CPU's</th><td><pre>${util.inspect(os.cpus())}</pre></td></tr>
<tr><th>Network</th><td><pre>${util.inspect(
        os.networkInterfaces()
      )}</pre></td></tr>
</table>
</body></html>`
    );
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("bad URL " + req.url);
  }
});

server.listen(8124);
// require("../events/httpsniffer").sniffOn(server);
console.log("Air is running at http://127.0.0.1:8124");

```

This application is meant to be similar to PHP's `sysinfo` function.

Node's `os` module is consulted to provide information about the server. 

## Request Object

Some web applications care about the HTTP verb (`GET`, `DELETE`, `POST`) used to consult the `request.method` field of the `request` object. 

For example, `POST` is frequently used for `FORM` submissions.

The `pathname` portion of the request URL is used to dispatch the request to the correct handler.

Routing methods based on simple string comparisons work for a small application.

Larger applications use pattern matching to match part of the request URL to select the request handler function and other parts to extract request data out of the URL. 

**If the request URL does not match, then data will not be able to be extracted. If the request URL is not recognized, the server sends back an error page using a `404` result code. 

The `response code` informs the browser about the status of the request, where a `200` means everything is fine, and a `404` code means the requested page doesn't exist.

TABLE OF HTTP RESPONSE CODES GOES HERE>


There are several promising packages that could be used to implement request matching and routing. A framework like Express has this capability already baked in and tested.





