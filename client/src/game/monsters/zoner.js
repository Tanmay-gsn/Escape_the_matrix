export function moveZoner(
  monster,
  player,
  map
) {

  const zoneRadius = 3;

  const dx =
    Math.abs(player.x - monster.x);

  const dy =
    Math.abs(player.y - monster.y);

  const insideZone =
    dx <= zoneRadius &&
    dy <= zoneRadius;

  if (!insideZone) {
    return;
  }

  if (monster.x < player.x) {
    monster.x++;
  }

  else if (monster.x > player.x) {
    monster.x--;
  }

  if (monster.y < player.y) {
    monster.y++;
  }

  else if (monster.y > player.y) {
    monster.y--;
  }
}
