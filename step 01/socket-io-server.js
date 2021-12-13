const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer((req, res) => {
  res.end("connected!!");
});

const io = socketIo(server);

io.on("connection", (ws, req) => {
  ws.emit("welcome", "Welcome to the webSocket server!!");
  ws.on("message", (msg) => {
    console.log(msg);
  });
});

server.listen(8000);
