const { io } = require("../server");
const Orbs = require("./classes/Orbs");
const Player = require("./classes/player");
const PlayerConfig = require("./classes/playerConfig");
const PlayerData = require("./classes/playerData");
const {
  checkForOrbCollisions,
  checkForPlayerCollisions,
} = require("./checkCollisions");

let orbs = [];
let players = [];
const settings = {
  defaultOrbs: 500,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500,
};

initGame();

io.sockets.on("connect", (socket) => {
  let player;

  socket.on("init", (playerName) => {
    socket.join("game");
    let playerData = new PlayerData(playerName, settings);
    let playerConfig = new PlayerConfig(settings);

    player = new Player(socket.id, playerConfig, playerData);

    socket.emit("initReturn", { orbs, player });
    players.push(playerData);

    setInterval(() => {
      io.to("game").emit("tock", {
        players,
        playerX: player.playerData.locX,
        playerY: player.playerData.locY,
      });
    }, 33);
  });

  socket.on("tick", (data) => {
    if (player && player.playerConfig && player.playerData) {
      speed = player.playerConfig.speed;
      xV = player.playerConfig.xVector = data.xVector;
      yV = player.playerConfig.yVector = data.yVector;

      if (
        (player.playerData.locX < 5 && player.playerData.xVector < 0) ||
        (player.playerData.locX > settings.worldWidth && xV > 0)
      ) {
        player.playerData.locY -= speed * yV;
      } else if (
        (player.playerData.locY < 5 && yV > 0) ||
        (player.playerData.locY > settings.worldHeight && yV < 0)
      ) {
        player.playerData.locX += speed * xV;
      } else {
        player.playerData.locX += speed * xV;
        player.playerData.locY -= speed * yV;
      }
    }

    let capturedOrb = checkForOrbCollisions(
      player.playerData,
      player.playerConfig,
      orbs,
      settings
    );

    capturedOrb
      .then((data) => {
        console.log("Orb collision");
      })
      .catch((err) => {
        console.log("No collision");
      });
  });
});

function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orbs(settings));
  }
}

module.exports = io;
