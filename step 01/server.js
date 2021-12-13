const http = require("http");
const ws = require("ws");

const server = http.createServer((req, res) => {
  res.end("connected!!");
});

const wss = new ws.Server({ server });

wss.on("headers", (headers, req) => {
  console.log(headers);
});

wss.on("connection", (webSocket, req) => {
  webSocket.send("Welcome to the webSocket server!!");
  webSocket.on("message", (msg) => {
    console.log(msg.toString());
  });
});

server.listen(8000, () => {
  console.log(`server connected 8000`);
});
