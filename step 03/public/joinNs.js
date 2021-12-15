function joinNs(endpoint) {
  const nsSocket = io("http://localhost:3000/wiki");
  nsSocket.on("nsRoomLoad", (rooms) => {
    let roomList = document.querySelector(".room-list");

    roomList.innerHTML = "";

    rooms.forEach((room) => {
      let glyphicon = "globe";
      if (room.privateRoom) {
        glyphicon = "lock";
      }
      roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyphicon}"></span>${room.roomTitle}</li>`;
    });

    let roomNodes = document.querySelectorAll("room");
    roomNodes.forEach((ele) => {
      ele.addEventListener("click", () => {
        console.log("dsd");
      });
    });
  });
}
