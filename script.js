console.log("hello world!");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const laneWidth = 8;
const laneHeight = 100;

const laneGap = laneHeight;

const roadWidth = 500;
const roadHeight = 800;

const gameState = {
  player: {
    pos: { x: 0, y: 600 },
    vel: { x: 0, y: 0 },
    accel: 2.5,
    width: 50,
    height: 200,
  },
  controls: {
    left: false,
    right: false,
  },

  lanes: Array.from({ length: 10 }, (_, i) => ({
    y: -laneHeight + (laneGap * i + laneHeight * i),
    x: 250,
  })),

  settings: {
    speed: 5,
  },
};

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    gameState.controls.left = true;
  } else if (e.key === "ArrowRight") {
    gameState.controls.right = true;
  }
});
window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") {
    gameState.controls.left = false;
  } else if (e.key === "ArrowRight") {
    gameState.controls.right = false;
  }
});

function loop() {
  update();
  draw();
}

setInterval(loop, 1000 / 60);

function update() {
  gameState.player.pos.x += gameState.player.vel.x;
  gameState.player.pos.y += gameState.player.vel.y;

  if (gameState.controls.left) {
    gameState.player.vel.x = -gameState.player.accel;
  } else if (gameState.controls.right) {
    gameState.player.vel.x = gameState.player.accel;
  }

  gameState.player.vel.x *= 0.9;

  // const lastLane = gameState.lanes[gameState.lanes.length - 1];
  let bottomMostLane = gameState.lanes[0];
  for (let i = 0; i < gameState.lanes.length; i++) {
    if (gameState.lanes[i].y > bottomMostLane.y) {
      bottomMostLane = gameState.lanes[i];
    }
  }

  if (bottomMostLane.y > canvas.height + laneGap) {
    // gameState.lanes = structuredClone(gameState.default.lanes);
    bottomMostLane.y = -laneHeight;
  }

  gameState.lanes.forEach((lane, index) => {
    lane.y += gameState.settings.speed;
  });
}

function draw() {
  /** @type {CanvasRenderingContext2D} */

  const c = ctx;

  c.fillStyle = "black";
  c.fillRect(0, 0, roadWidth, roadHeight);

  c.fillStyle = "white";
  const halfPlayerWidth = gameState.player.width / 2;
  c.fillRect(
    gameState.player.pos.x - halfPlayerWidth,
    gameState.player.pos.y - halfPlayerWidth,
    gameState.player.width,
    gameState.player.height
  );

  // c.fillStyle = "white";
  // c.fillRect(250, 250, 8, 70);

  // c.fillStyle = "white";
  // c.fillRect(250, 40, laneWidth, laneHeight);

  // c.fillStyle = "white";
  // c.fillRect(250, 240, laneWidth, laneHeight);

  // c.fillStyle = "white";
  // c.fillRect(250, 440, laneWidth, laneHeight);

  // c.fillStyle = "white";
  // c.fillRect(250, 640, laneWidth, laneHeight);

  gameState.lanes.forEach((lane, index) => {
    c.fillStyle = "white";
    c.fillRect(
      gameState.lanes[index].x,
      gameState.lanes[index].y,
      laneWidth,
      laneHeight
    );
  });

  // for (let i = laneHeight; i < roadHeight * 2; i += laneHeight * 2) {
  //   c.fillStyle = "white";
  //   c.fillRect(250, i, laneWidth, laneHeight);
  //   console.log(i);
  // }
}
