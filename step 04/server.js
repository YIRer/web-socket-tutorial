const express = require("express");
const helmet = require("helmet");
const socketio = require("socket.io");

const app = express();

app.use(helmet());
app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(3000);

const io = socketio(expressServer);
console.log("Express, Socket io 연결");

module.exports = {
  io,
  app,
};
