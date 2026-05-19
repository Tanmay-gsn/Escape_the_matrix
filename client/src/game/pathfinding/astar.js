// astar.js
export function astar(grid, start, goal, heuristicScale = 1.0) {
  const pq = [{ x: start.x, y: start.y, g: 0, f: 0 }];
  const gCosts = new Map();
  const parentMap = new Map();

  const startKey = `${start.x},${start.y}`;
  gCosts.set(startKey, 0);

  const directions = [
    { dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 }, { dx: 1, dy: 0 }
  ];

  function getWeight(cellValue) {
    if (cellValue === 1) return Infinity; 
    if (cellValue === 2) return 2;       
    return 1;          
  }

  function heuristic(nx, ny, gx, gy) {
    return (Math.abs(nx - gx) + Math.abs(ny - gy)) * heuristicScale;
  }

  while (pq.length > 0) {
    pq.sort((a, b) => a.f - b.f);
    const current = pq.shift();
    const currKey = `${current.x},${current.y}`;

    if (current.x === goal.x && current.y === goal.y) {
      const path = [];
      let traceKey = `${goal.x},${goal.y}`;
      while (traceKey !== startKey) {
        const p = parentMap.get(traceKey);
        const [cx, cy] = traceKey.split(',').map(Number);
        path.unshift({ x: cx, y: cy });
        traceKey = `${p.x},${p.y}`;
      }
      return path;
    }

    if (current.g > gCosts.get(currKey)) continue;

    for (const dir of directions) {
      const nx = current.x + dir.dx;
      const ny = current.y + dir.dy;
      const nKey = `${nx},${ny}`;

      if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
        const weight = getWeight(grid[ny][nx]);
        if (weight === Infinity) continue;

        const newGCost = current.g + weight;
        
        if (!gCosts.has(nKey) || newGCost < gCosts.get(nKey)) {
          gCosts.set(nKey, newGCost);
          parentMap.set(nKey, current);
          
          const fCost = newGCost + heuristic(nx, ny, goal.x, goal.y);
          pq.push({ x: nx, y: ny, g: newGCost, f: fCost });
        }
      }
    }
  }
  return null;
}