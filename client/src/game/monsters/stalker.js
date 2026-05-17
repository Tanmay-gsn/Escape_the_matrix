import { bfs } from "../pathfinding/bfs";

export const stalker = {
  x: 7,
  y: 7,
};

export function moveStalker(player, map) {
  const path = bfs(
    { x: stalker.x, y: stalker.y },
    { x: player.x, y: player.y },
    map
  );

  if (path.length > 1) {
    stalker.x = path[1].x;
    stalker.y = path[1].y;
  }
}
