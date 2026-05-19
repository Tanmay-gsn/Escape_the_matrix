import { dijkstra } from '../pathfinding/dijkstra';

export function computeNextMove(monsterState, gameState) {
  const { grid, player, monsters } = gameState;
  const junctions = [];

  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[0].length - 1; x++) {
      if (grid[y][x] !== 1) { // Not water
        let walkableNeighbors = 0;
        if (grid[y-1][x] !== 1) walkableNeighbors++;
        if (grid[y+1][x] !== 1) walkableNeighbors++;
        if (grid[y][x-1] !== 1) walkableNeighbors++;
        if (grid[y][x+1] !== 1) walkableNeighbors++;

        if (walkableNeighbors >= 3) {
          junctions.push({ x, y });
        }
      }
    }
  }

  if (junctions.length === 0) return null;

  let bestJunction = null;
  let minPlayerDist = Infinity;

  junctions.forEach(j => {
    const distToPlayer = Math.abs(j.x - player.x) + Math.abs(j.y - player.y);
    if (distToPlayer < minPlayerDist && distToPlayer > 0) {
      minPlayerDist = distToPlayer;
      bestJunction = j;
    }
  });

  const distToZoner = Math.abs(bestJunction.x - monsterState.x) + Math.abs(bestJunction.y - monsterState.y);
  if (distToZoner === 0 && minPlayerDist > 3) {
    return null; 
  }

  const path = dijkstra(grid, monsterState, bestJunction);

  if (path && path.length > 0) {
    const nextStep = path[0];
    const isOccupied = monsters.some(
      m => m.id !== monsterState.id && m.x === nextStep.x && m.y === nextStep.y
    );
    if (!isOccupied) return nextStep;
  }

  return null;
}