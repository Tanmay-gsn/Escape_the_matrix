const TILE_SIZE = 40;

export function drawGrid(ctx, grid) {

  for (let row = 0; row < grid.length; row++) {

    for (let col = 0; col < grid[row].length; col++) {

      const tile = grid[row][col];

      // FLOOR
      if (tile === 0) {
        ctx.fillStyle = "#ffffff";
      }

      // WATER
      else if (tile === 1) {
        ctx.fillStyle = "#0000ff";
      }

      // MOUNTAIN
      else if (tile === 2) {
        ctx.fillStyle = "#ff0000";
      }

      // EXIT
      else if (tile === 3) {
        ctx.fillStyle = "#00ff00";
      }

      // COIN
      else if (tile === 4) {
        ctx.fillStyle = "#ffff00";
      }

      if (tile === 4) {

        // Draw floor behind coin
        ctx.fillStyle = "#ffffff";
      
        ctx.fillRect(
          col * TILE_SIZE,
          row * TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE
        );
      
        // Draw circular coin
        ctx.fillStyle = "#ffff00";
      
        ctx.beginPath();
      
        ctx.arc(
          col * TILE_SIZE + TILE_SIZE / 2,
          row * TILE_SIZE + TILE_SIZE / 2,
          TILE_SIZE / 4,
          0,
          Math.PI * 2
        );
      
        ctx.fill();
      }
      
      else {
      
        ctx.fillRect(
          col * TILE_SIZE,
          row * TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE
        );
      }

      // Grid Border
      ctx.strokeStyle = "#000000";

      ctx.strokeRect(
        col * TILE_SIZE,
        row * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }
}

// PLAYER
export function drawPlayer(ctx, player, tileSize) {

  ctx.fillStyle = "#ff00ff";

  ctx.fillRect(
    player.x * tileSize,
    player.y * tileSize,
    tileSize,
    tileSize
  );
}

// MONSTERS
export function drawMonster(ctx, monster, color, tileSize) {

  ctx.fillStyle = color;

  ctx.fillRect(
    monster.x * tileSize,
    monster.y * tileSize,
    tileSize,
    tileSize
  );
}

// SCORE
export function drawScore(ctx, score) {

  ctx.fillStyle = "#000000";

  ctx.font = "24px Arial";

  ctx.fillText(
    `Score: ${score}`,
    450,
    40
  );
}