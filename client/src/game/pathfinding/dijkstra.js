// dijkstra.js

export function dijkstra(grid, start, goal) {
  const pq = [{ x: start.x, y: start.y, cost: 0 }];
  const costs = new Map();
  const parentMap = new Map();

  const startKey = `${start.x},${start.y}`;
  costs.set(startKey, 0);

  const directions = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 }
  ];

  function getWeight(cellValue) {
    if (cellValue === 1) return Infinity; 
    if (cellValue === 2) return 2;       
    return 1;                            
  }

  while (pq.length > 0) {
    pq.sort((a, b) => a.cost - b.cost);
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

    if (current.cost > costs.get(currKey)) continue;

    for (const dir of directions) {
      const nx = current.x + dir.dx;
      const ny = current.y + dir.dy;
      const nKey = `${nx},${ny}`;

      if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
        const cellValue = grid[ny][nx];
        const weight = getWeight(cellValue);
        
        if (weight === Infinity) continue; 

        const newCost = current.cost + weight;
        
        if (!costs.has(nKey) || newCost < costs.get(nKey)) {
          costs.set(nKey, newCost);
          parentMap.set(nKey, current);
          pq.push({ x: nx, y: ny, cost: newCost });
        }
      }
    }
  }
  return null;
}
