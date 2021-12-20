function socketMain(io, socket) {
  console.log("A socket connected!", socket.id);

  socket.on("perData", (data) => {
    console.log(data);
  });

  socket.on("clientAuth", (key) => {
    if (key === "sdk12j3klj2kn2nsa") {
      socket.join("clients");
    } else if (key === "sads2sxxc0sdsa") {
      socket.join("ui");
    } else {
      socket.disconnect(true);
    }
  });
}

module.exports = socketMain;
