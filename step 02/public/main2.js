const socket = io("http://localhost:3000/");
const socket2 = io("http://localhost:3000/admin");

socket.on("connect", () => {
  socket.on("messageFromServer", (dataFromServer) => {
    console.log(dataFromServer);
    socket.emit("messageToServer", { data: "This is from client" });
  });

  socket.on("joined", (msg) => {
    console.log(msg);
  });
});

socket2.on("welcome", (msg) => {
  console.log(msg);
});

document.getElementById("message-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const userMessageInput = document.getElementById("user-message");
  const userMessage = userMessageInput.value;

  socket.emit("newMessageToServer", { text: userMessage });
  userMessageInput.value = "";
});
