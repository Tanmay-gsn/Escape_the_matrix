const TILE_SIZE = 40;

export function drawGrid(ctx, grid) {

  for (let row = 0; row < grid.length; row++) {

    for (let col = 0; col < grid[row].length; col++) {

      const tile = grid[row][col];

      if (tile === 0) {
        ctx.fillStyle = "lightgray";
      }

      else if (tile === 1) {
        ctx.fillStyle = "skyblue";
      }

      else if (tile === 2) {
        ctx.fillStyle = "brown";
      }

      else if (tile === 3) {
        ctx.fillStyle = "green";
      }

      else if (tile === 4) {
        ctx.fillStyle = "gold";
      }

      ctx.fillRect(
        col * TILE_SIZE,
        row * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );

      ctx.strokeStyle = "black";

      ctx.strokeRect(
        col * TILE_SIZE,
        row * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }
}

export function drawPlayer(ctx, player) {

  ctx.fillStyle = "yellow";

  ctx.fillRect(
    player.x * TILE_SIZE,
    player.y * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE
  );
}

export function drawMonster(ctx, monster) {

  ctx.fillStyle = "red";

  ctx.fillRect(
    monster.x * TILE_SIZE,
    monster.y * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE
  );
}

export function drawScore(ctx, score) {

  ctx.fillStyle = "black";

  ctx.font = "24px Arial";

  ctx.fillText(
    `Score: ${score}`,
    450,
    40
  );
}
