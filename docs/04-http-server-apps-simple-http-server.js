const http = require("http");
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("Welcome to Basstap Records!\n");
  })
  .listen(8124, "127.0.0.1");
console.log("Air is running at http://127.0.0.1:8124");
