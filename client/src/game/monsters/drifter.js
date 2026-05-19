import { bfs } from '../pathfinding/bfs';

export function computeNextMove(monsterState, gameState) {
  const directions = [
    { dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 }, { dx: 1, dy: 0 }
  ];

  const validNeighbors = [];

  for (const dir of directions) {
    const nx = monsterState.x + dir.dx;
    const ny = monsterState.y + dir.dy;

    if (ny >= 0 && ny < gameState.grid.length && nx >= 0 && nx < gameState.grid[0].length) {
      if (gameState.grid[ny][nx] !== 1) { // Not WATER
        const isOccupied = gameState.monsters.some(m => m.id !== monsterState.id && m.x === nx && m.y === ny);
        if (!isOccupied) validNeighbors.push({ x: nx, y: ny });
      }
    }
  }

  if (validNeighbors.length === 0) return null;

  const evaluated = validNeighbors.map(n => {
    const path = bfs(gameState.grid, n, gameState.player);
    return { step: n, dist: path ? path.length : Infinity };
  });

  evaluated.sort((a, b) => a.dist - b.dist);

  const r = Math.random();
  if (r < 0.60 && evaluated.length > 0) return evaluated[0].step;
  if (r < 0.85 && evaluated.length > 1) return evaluated[1].step;
  
  const randomIdx = Math.floor(Math.random() * evaluated.length);
  return evaluated[randomIdx].step;
}