const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));
const expressServer = app.listen(3000);

const io = socketio(expressServer);

io.of("/").on("connection", (socket) => {
  socket.emit("messageFromServer", { data: "This is from server" });
  socket.on("messageToServer", (dataFromClient) => {
    console.log(dataFromClient);
  });

  socket.join("level1");
  io.to("level1").emit("joined", `${socket.id} joined level 1`);
});

io.of("/admin").on("connection", () => {
  io.of("/admin").emit("welcome", "welcome to the admin channel!");
  console.log("namespace");
});
