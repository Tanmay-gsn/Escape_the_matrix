import { dijkstra } from '../pathfinding/dijkstra';
import { bfs } from '../pathfinding/bfs';

export function computeNextMove(monsterState, gameState) {
  const useDijkstra = Math.random() < 0.7;
  
  const path = useDijkstra 
    ? dijkstra(gameState.grid, monsterState, gameState.player)
    : bfs(gameState.grid, monsterState, gameState.player);

  if (path && path.length > 0) {
    const nextStep = path[0];
    
    const isOccupied = gameState.monsters.some(
      m => m.id !== monsterState.id && m.x === nextStep.x && m.y === nextStep.y
    );
    
    if (!isOccupied) return nextStep;
  }
  
  return null; 
}
