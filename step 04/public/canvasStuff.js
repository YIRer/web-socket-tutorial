function draw() {
  context.setTransform(1, 0, 0, 1, 0, 0);

  context.clearRect(0, 0, canvas.width, canvas.height);

  const cameraX = -player.locX + canvas.width / 2;
  const cameraY = -player.locY + canvas.height / 2;

  context.translate(cameraX, cameraY);

  players.forEach((p) => {
    const { locX, locY, color } = p;
    console.log(locX, locY, color);
    context.beginPath();

    context.fillStyle = color;
    context.arc(locX, locY, 10, 0, Math.PI * 2);
    context.fill();

    context.lineWidth = 3;
    context.strokeStyle = "rgb(0,255,0)";
    context.stroke();
  });

  orbs.forEach((orb) => {
    context.beginPath();
    context.fillStyle = orb.color;
    context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2);
    context.fill();
  });

  requestAnimationFrame(draw);
}

canvas.addEventListener("mousemove", (event) => {
  const mousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
  //두 점 사이의 절대 각도 값을 가져옴
  const angleDeg =
    (Math.atan2(
      mousePosition.y - canvas.height / 2,
      mousePosition.x - canvas.width / 2
    ) *
      180) /
    Math.PI;

  if (angleDeg >= 0 && angleDeg < 90) {
    xVector = 1 - angleDeg / 90;
    yVector = -(angleDeg / 90);
  } else if (angleDeg >= 90 && angleDeg <= 180) {
    xVector = -(angleDeg - 90) / 90;
    yVector = -(1 - (angleDeg - 90) / 90);
  } else if (angleDeg >= -180 && angleDeg < -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 + (angleDeg + 90) / 90;
  } else if (angleDeg < 0 && angleDeg >= -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 - (angleDeg + 90) / 90;
  }
  player.xVector = xVector;
  player.yVector = yVector;
});
