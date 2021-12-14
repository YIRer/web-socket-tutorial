const socket = io("http://localhost:3000/");
const socket2 = io("http://localhost:3000/admin");

socket.on("connect", () => {
  console.log(socket.id);

  socket.on("messageToClient", ({ text }) => {
    console.log(text);
    const liHTML = document.createElement("li");
    liHTML.innerHTML = text;
    document.getElementById("messages").appendChild(liHTML);
  });
});

socket2.on("connect", () => {
  console.log(socket2.id);
  socket2.on("welcome", (msg) => {
    console.log(msg);
  });
});

// socket.on("messageFromServer", (dataFromServer) => {
//   console.log(dataFromServer);
//   socket.emit("messageToServer", { data: "This is from client" });
// });

// socket.on("ping", () => {
//   console.log("ping was recived from the server");
// });

// socket.on("pong", (latency) => {
//   console.log(latency);
//   console.log("Pong was sent to the server");
// });

document.getElementById("message-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const userMessageInput = document.getElementById("user-message");
  const userMessage = userMessageInput.value;

  socket.emit("newMessageToServer", { text: userMessage });
  userMessageInput.value = "";
});
