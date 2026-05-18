import { astar } from "../pathfinding/astar.js";

export const predictor = {
  x: 10,
  y: 2,
};

export function movePredictor(
  monster,
  player,
  map
) {

  const path = astar(
    map,
    monster,
    player
  );

  if (path.length > 0) {

    monster.x = path[0].x;
    monster.y = path[0].y;
  }
}