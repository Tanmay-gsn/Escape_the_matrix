import { astar } from '../pathfinding/astar';

export function computeNextMove(monsterState, gameState) {
  const { player, previousPlayerPos, grid } = gameState;
  
  let dirX = player.x - previousPlayerPos.x;
  let dirY = player.y - previousPlayerPos.y;

  if (Math.random() < 0.20) {
    const dirs = [-1, 0, 1];
    dirX = dirs[Math.floor(Math.random() * dirs.length)];
    dirY = dirs[Math.floor(Math.random() * dirs.length)];
  }

  let targetX = player.x + (dirX * 2);
  let targetY = player.y + (dirY * 2);

  if (dirX === 0 && dirY === 0) {
    targetX = player.x;
    targetY = player.y;
  }

  targetX = Math.max(0, Math.min(grid[0].length - 1, targetX));
  targetY = Math.max(0, Math.min(grid.length - 1, targetY));

  let path = astar(grid, monsterState, { x: targetX, y: targetY }, 1.3);

  if (!path || path.length === 0) {
    path = astar(grid, monsterState, player, 1.0);
  }

  if (path && path.length > 0) {
    const nextStep = path[0];
  
    const isOccupied = gameState.monsters.some(
      m => m.id !== monsterState.id && m.x === nextStep.x && m.y === nextStep.y
    );
    if (!isOccupied) return nextStep;
  }

  return null;
}