export function bfs(start, end, map) {
    const queue = [[start]];
    const visited = new Set();
  
    while (queue.length > 0) {
      const path = queue.shift();
  
      const current = path[path.length - 1];
  
      const key = `${current.x},${current.y}`;
  
      if (visited.has(key)) {
        continue;
      }
  
      visited.add(key);
  
      if (current.x === end.x && current.y === end.y) {
        return path;
      }
  
      const directions = [
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
      ];
  
      for (const dir of directions) {
        const newX = current.x + dir.x;
        const newY = current.y + dir.y;
  
        if (
          newX >= 0 &&
          newX < map[0].length &&
          newY >= 0 &&
          newY < map.length &&
          map[newY][newX] !== 1
        ) {
          queue.push([
            ...path,
            { x: newX, y: newY },
          ]);
        }
      }
    }
  
    return [];
  }
