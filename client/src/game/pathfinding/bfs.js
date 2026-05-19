// bfs.js
export function bfs(grid, start, goal) {
  const queue = [start];
  const visited = new Set();
  const parentMap = new Map();

  const startKey = `${start.x},${start.y}`;
  visited.add(startKey);

  const directions = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 }
  ];

  while (queue.length > 0) {
    const current = queue.shift();

    if (current.x === goal.x && current.y === goal.y) {
      const path = [];
      let currStr = `${goal.x},${goal.y}`;
      while (currStr !== startKey) {
        const node = parentMap.get(currStr);
        const [cx, cy] = currStr.split(',').map(Number);
        path.unshift({ x: cx, y: cy });
        currStr = `${node.x},${node.y}`;
      }
      return path;
    }

    for (const dir of directions) {
      const nx = current.x + dir.dx;
      const ny = current.y + dir.dy;
      const key = `${nx},${ny}`;

      if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
        const cellValue = grid[ny][nx];
        if (cellValue !== 1 && !visited.has(key)) {
          visited.add(key);
          parentMap.set(key, current);
          queue.push({ x: nx, y: ny });
        }
      }
    }
  }
  
  return null; 
}