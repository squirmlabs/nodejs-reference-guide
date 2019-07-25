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
require("./04-http-server-apps-httpsniffer").sniffOn(server);
console.log("Air is running at http://127.0.0.1:8124");
