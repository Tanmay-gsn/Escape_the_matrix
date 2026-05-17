export const drifter = {
    x: 4,
    y: 4,
  };
  
  export function moveDrifter(map) {
    const directions = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ];
  
    const random =
      directions[Math.floor(Math.random() * directions.length)];
  
    const newX = drifter.x + random.x;
    const newY = drifter.y + random.y;
  
    if (
      newX >= 0 &&
      newX < 8 &&
      newY >= 0 &&
      newY < 8 &&
      map[newY][newX] !== 1
    ) {
      drifter.x = newX;
      drifter.y = newY;
    }
  }
