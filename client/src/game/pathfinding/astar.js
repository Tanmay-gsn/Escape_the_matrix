import {
  getNeighbors,
  getTerrainCost
} from "./dijkstra.js";

export function heuristic(a, b) {

  return (
    Math.abs(a.x - b.x) +
    Math.abs(a.y - b.y)
  );
}

export function astar(
  grid,
  start,
  goal
) {

  const open = [];

  open.push({
    x: start.x,
    y: start.y,
    g: 0,
    f: heuristic(start, goal),
    path: []
  });

  const visited = new Set();

  while (open.length > 0) {

    open.sort((a, b) => a.f - b.f);

    const current = open.shift();

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

      const g =
        current.g + terrainCost;

      const h =
        heuristic(
          neighbor,
          goal
        );

      const f = g + h;

      open.push({
        x: neighbor.x,
        y: neighbor.y,
        g,
        f,
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
