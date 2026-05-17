import { drawGame } from "./renderer";
import { gameMap } from "./maps";

import {
  stalker,
  moveStalker,
} from "./monsters/stalker";

import {
  drifter,
  moveDrifter,
} from "./monsters/drifter";

const tileSize = 80;

const player = {
  x: 0,
  y: 0,
};

let lives = 3;
let score = 0;

export function initGame() {
  const canvas = document.getElementById("gameCanvas");

  const ctx = canvas.getContext("2d");

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGame(ctx);

    // Player
    ctx.fillStyle = "red";

    ctx.fillRect(
      player.x * tileSize,
      player.y * tileSize,
      tileSize,
      tileSize
    );

    // Stalker
    ctx.fillStyle = "purple";

    ctx.fillRect(
      stalker.x * tileSize,
      stalker.y * tileSize,
      tileSize,
      tileSize
    );

    // Drifter
    ctx.fillStyle = "orange";

    ctx.fillRect(
      drifter.x * tileSize,
      drifter.y * tileSize,
      tileSize,
      tileSize
    );

    // HUD
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";

    ctx.fillText("Lives: " + lives, 10, 30);
    ctx.fillText("Score: " + score, 10, 60);
  }

  render();

  window.addEventListener("keydown", (event) => {
    let newX = player.x;
    let newY = player.y;

    if (event.key === "ArrowUp") {
      newY--;
    }

    if (event.key === "ArrowDown") {
      newY++;
    }

    if (event.key === "ArrowLeft") {
      newX--;
    }

    if (event.key === "ArrowRight") {
      newX++;
    }

    // Prevent outside map and water
    if (
      newX >= 0 &&
      newX < 8 &&
      newY >= 0 &&
      newY < 8 &&
      gameMap[newY][newX] !== 1
    ) {
      player.x = newX;
      player.y = newY;

      // Coin collection
      if (gameMap[newY][newX] === 4) {
        score += 10;

        gameMap[newY][newX] = 0;
      }
    }

    // Monster movement
    moveStalker(player, gameMap);
    moveDrifter(gameMap);

    // Collision with stalker
    if (
      player.x === stalker.x &&
      player.y === stalker.y
    ) {
      lives--;

      player.x = 0;
      player.y = 0;

      alert("Stalker caught you!");
    }

    // Collision with drifter
    if (
      player.x === drifter.x &&
      player.y === drifter.y
    ) {
      lives--;

      player.x = 0;
      player.y = 0;

      alert("Drifter caught you!");
    }

    // Win condition
    if (gameMap[player.y][player.x] === 3) {
      alert("You Win!");

      player.x = 0;
      player.y = 0;
    }

    // Game over
    if (lives <= 0) {
      alert("Game Over");

      lives = 3;
      score = 0;

      player.x = 0;
      player.y = 0;
    }

    render();
  });
}
