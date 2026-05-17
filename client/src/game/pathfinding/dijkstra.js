export function getTerrainCost(tile) {

  if (tile === 1) return 5;

  if (tile === 2) return 999;

  return 1;
}

export function getNeighbors(x, y, grid) {

  const neighbors = [];

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  for (const [dx, dy] of directions) {

    const newX = x + dx;
    const newY = y + dy;

    if (
      newX >= 0 &&
      newY >= 0 &&
      newY < grid.length &&
      newX < grid[0].length
    ) {

      if (grid[newY][newX] !== 2) {

        neighbors.push({
          x: newX,
          y: newY
        });
      }
    }
  }

  return neighbors;
}

export function dijkstra(grid, start, goal) {

  const visited = new Set();

  const queue = [];

  queue.push({
    x: start.x,
    y: start.y,
    cost: 0,
    path: []
  });

  while (queue.length > 0) {

    queue.sort((a, b) => a.cost - b.cost);

    const current = queue.shift();

    const key =
      `${current.x},${current.y}`;

    if (visited.has(key)) {
      continue;
    }

    visited.add(key);

    if (
      current.x === goal.x &&
      current.y === goal.y
    ) {

      return current.path;
    }

    const neighbors =
      getNeighbors(
        current.x,
        current.y,
        grid
      );

    for (const neighbor of neighbors) {

      const terrainCost =
        getTerrainCost(
          grid[neighbor.y][neighbor.x]
        );

      queue.push({
        x: neighbor.x,
        y: neighbor.y,
        cost:
          current.cost + terrainCost,
        path: [
          ...current.path,
          {
            x: neighbor.x,
            y: neighbor.y
          }
        ]
      });
    }
  }

  return [];
}
