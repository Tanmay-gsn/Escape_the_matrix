import {
  drawGrid,
  drawPlayer,
  drawMonster,
} from "./renderer.js";

import { dijkstra } from "./pathfinding/dijkstra.js";
import { astar } from "./pathfinding/astar.js";

import { predictor,movePredictor } from "./monsters/predictor.js";

import { gameMap } from "./maps";

import { zoner,moveZoner } from "./monsters/zoner.js";

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
  x: 4,
  y: 4,
  frozen: false,
  frozenTurns: 0,
};

let lives = 3;
let score = 0;
let moves = 0;
let level = 1;

const startTime = Date.now();

let gameStatus = "playing";

let stateChangeCallback = null;

export function onStateChange(callback) {
  stateChangeCallback = callback;
}

function sendState() {
  if (stateChangeCallback) {
    stateChangeCallback({
      grid: gameMap,

      player: {
        ...player,
      },

      monsters: [
        {
          id: 1,
          type: "stalker",
          x: stalker.x,
          y: stalker.y,
        },
        {
          id: 2,
          type: "drifter",
          x: drifter.x,
          y: drifter.y,
        },
      ],

      score,
      moves,
      lives,
      level,
      status: gameStatus,
      startTime,
    });
  }
}

export function init(canvasElement) {
  const canvas = canvasElement;

  const ctx = canvas.getContext("2d");

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid(ctx, gameMap);

    drawPlayer(ctx, player, 40);

    drawMonster(ctx, stalker, "purple", 40);

    drawMonster(ctx, drifter, "orange", 40);

    drawMonster(ctx, predictor, "#00ffff", 40);

    drawMonster(ctx, zoner, "#ff1493", 40);
  }

  render();

  sendState();

  window.addEventListener("keydown", (event) => {

    if (gameStatus !== "playing") {
      return;
    }

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
      newX < gameMap[0].length &&
      newY >= 0 &&
      newY < gameMap.length &&
      gameMap[newY][newX] !== 1
    ) {
      player.x = newX;
      player.y = newY;

      moves++;

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

      player.x = 4;
      player.y = 4;

      alert("Stalker caught you!");
    }

    // Collision with drifter
    if (
      player.x === drifter.x &&
      player.y === drifter.y
    ) {
      lives--;

      player.x = 4;
      player.y = 4;

      alert("Drifter caught you!");
    }

    // Win condition
    if (gameMap[player.y][player.x] === 3) {
      gameStatus = "won";

      alert("You Win!");
    }

    // Game over
    if (lives <= 0) {
      gameStatus = "lost";

      alert("Game Over");
    }

    render();

    sendState();
  });
}