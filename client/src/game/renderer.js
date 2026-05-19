const assets = {
  player: new Image(),
  stalker: new Image(),
  drifter: new Image(),
  predictor: new Image(),
  zoner: new Image(),
  water: new Image(),
  mountain: new Image(),
  exit: new Image()
};

assets.player.src = '/assets/player.png';
assets.stalker.src = '/assets/stalker.png';
assets.drifter.src = '/assets/drifter.png';
assets.predictor.src = '/assets/predictor.png';
assets.zoner.src = '/assets/zoner.png';
assets.water.src = '/assets/water.png';
assets.mountain.src = '/assets/mountain.png';
assets.exit.src = '/assets/exit.png';

function drawSprite(ctx, img, x, y, size, fallbackColor) {
  if (img.complete && img.naturalWidth !== 0) {
    ctx.drawImage(img, x * size, y * size, size, size);
  } else {
    ctx.fillStyle = fallbackColor;
    ctx.fillRect(x * size, y * size, size, size);
  }
}

export function drawGame(ctx, state) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const CELL_SIZE = ctx.canvas.width / state.grid[0].length; 

  for (let y = 0; y < state.grid.length; y++) {
    for (let x = 0; x < state.grid[y].length; x++) {
      let cell = state.grid[y][x];
      
      if (cell === 1) drawSprite(ctx, assets.water, x, y, CELL_SIZE, '#0000FF'); 
      if (cell === 2) drawSprite(ctx, assets.mountain, x, y, CELL_SIZE, '#8B4513'); 
      if (cell === 3) drawSprite(ctx, assets.exit, x, y, CELL_SIZE, '#00FF00'); 
      
      if (cell === 4) {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(x * CELL_SIZE + CELL_SIZE/2, y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE/4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  for (let m of state.monsters) {
    if (m.type === 'stalker') drawSprite(ctx, assets.stalker, m.x, m.y, CELL_SIZE, 'red');
    if (m.type === 'drifter') drawSprite(ctx, assets.drifter, m.x, m.y, CELL_SIZE, 'purple');
    if (m.type === 'predictor') drawSprite(ctx, assets.predictor, m.x, m.y, CELL_SIZE, 'orange');
    if (m.type === 'zoner') drawSprite(ctx, assets.zoner, m.x, m.y, CELL_SIZE, 'teal');
  }

  drawSprite(ctx, assets.player, state.player.x, state.player.y, CELL_SIZE, 'yellow');
}