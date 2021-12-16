let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let orbs = [];
let players = [];

const player = {};

const canvas = document.getElementById("the-canvas");
const context = canvas.getContext("2d");

canvas.width = windowWidth;
canvas.height = windowHeight;

window.onload = function () {
  $("#loginModal").modal("show");
  const nameForm = document.querySelector(".name-form");

  nameForm.addEventListener("submit", (e) => {
    e.preventDefault();

    player.name = document.getElementById("name-input").value;
    document.querySelector(".player-name").innerHTML = player.name;

    $("#loginModal").modal("hide");
    $("#spawnModal").modal("show");
  });

  document.querySelector(".start-game").addEventListener("click", () => {
    $(".modal").modal("hide");
    init();

    document
      .querySelectorAll(".hiddenOnStart")
      .forEach((ele) => ele.removeAttribute("hidden"));
  });
};
