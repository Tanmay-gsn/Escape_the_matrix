import { level1, level2 } from './maps';
import { drawGame } from './renderer';
import { computeNextMove as stalkerMove } from './monsters/stalker';
import { computeNextMove as drifterMove } from './monsters/drifter';
import { computeNextMove as predictorMove } from './monsters/predictor';
import { computeNextMove as zonerMove } from './monsters/zoner';

let ctx;
let notifyReact;

let state = {
  grid: level1,
  player: { x: 10, y: 7, frozen: false, frozenTurns: 0 },
  monsters: [
    { id: 1, type: 'stalker', x: 2, y: 2 },
    { id: 2, type: 'drifter', x: 17, y: 12 },
    { id: 3, type: 'predictor', x: 2, y: 12 },
    { id: 4, type: 'zoner', x: 17, y: 2 }
  ],
  score: 0,
  moves: 0,
  lives: 3,
  level: 1,
  status: 'playing',
  startTime: Date.now(),
  previousPlayerPos: { x: 10, y: 7 }
};

export function init(canvasElement) {
  state.grid = JSON.parse(JSON.stringify(level1));
  
  state.status = 'playing';
  state.lives = 3;
  state.score = 0;
  state.moves = 0;
  state.startTime = Date.now();
  
  state.player = { x: 10, y: 7, frozen: false, frozenTurns: 0 };
  state.previousPlayerPos = { x: 10, y: 7 };
  state.monsters = [
    { id: 1, type: 'stalker', x: 2, y: 2 },
    { id: 2, type: 'drifter', x: 17, y: 12 },
    { id: 3, type: 'predictor', x: 2, y: 12 },
    { id: 4, type: 'zoner', x: 17, y: 2 }
  ];

  ctx = canvasElement.getContext('2d');
  drawGame(ctx, state);

  window.onkeydown = (e) => {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
    handleInput(e);
  };
}

export function onStateChange(callback) {
  notifyReact = callback;
  notifyReact({ ...state }); 
}

function handleInput(e) {
  if (state.status !== 'playing') return;

  let dx = 0;
  let dy = 0;

  if (e.key === 'ArrowUp' || e.key === 'w') dy = -1;
  else if (e.key === 'ArrowDown' || e.key === 's') dy = 1;
  else if (e.key === 'ArrowLeft' || e.key === 'a') dx = -1;
  else if (e.key === 'ArrowRight' || e.key === 'd') dx = 1;
  else return;

  e.preventDefault(); 
  resolveTurn(dx, dy);
}

function resolveTurn(dx, dy) {
  if (state.player.frozen) {
    state.player.frozenTurns--;
    if (state.player.frozenTurns <= 0) {
      state.player.frozen = false;
    }
    finalizeTurn();
    return;
  }

  let nx = state.player.x + dx;
  let ny = state.player.y + dy;

  if (nx < 0 || nx >= state.grid[0].length || ny < 0 || ny >= state.grid.length) {
    return;
  }

  let targetCell = state.grid[ny][nx];

  if (targetCell === 1) {
    return; 
  }

  state.previousPlayerPos = { x: state.player.x, y: state.player.y };
  state.player.x = nx;
  state.player.y = ny;

  if (targetCell === 2) {
    state.player.frozen = true;
    state.player.frozenTurns = 1;
  }

  if (targetCell === 4) {
    state.score += 50;
    state.grid[ny][nx] = 0; 
  }

  if (targetCell === 3) {
    if (state.level === 1) {
      // Transition to Level 2
      state.level = 2;
      state.score += 100;
      state.grid = JSON.parse(JSON.stringify(level2));
      
      state.player.x = 2;
      state.player.y = 7;
      state.previousPlayerPos = { x: 2, y: 7 };
      state.player.frozen = false;
      state.player.frozenTurns = 0;
      
      state.monsters = [
        { id: 1, type: 'stalker', x: 10, y: 2 },
        { id: 2, type: 'drifter', x: 17, y: 12 },
        { id: 3, type: 'predictor', x: 12, y: 7 },
        { id: 4, type: 'zoner', x: 16, y: 7 }
      ];
    } else {
      state.status = 'won';
    }
  }

  finalizeTurn();
}

function getWanderMove(monster, state) {
  const directions = [
    { dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 }, { dx: 1, dy: 0 }
  ];
  const valid = [];
  
  for (let d of directions) {
    const nx = monster.x + d.dx;
    const ny = monster.y + d.dy;
    
    if (ny >= 0 && ny < state.grid.length && nx >= 0 && nx < state.grid[0].length) {
      if (state.grid[ny][nx] !== 1) {
        const isOccupied = state.monsters.some(m => m.id !== monster.id && m.x === nx && m.y === ny);
        if (!isOccupied) valid.push({ x: nx, y: ny });
      }
    }
  }
  
  if (valid.length === 0) return null;
  return valid[Math.floor(Math.random() * valid.length)];
}

function finalizeTurn() {
  if (state.status === 'won') {
    state.moves++;
    state.timeTaken = Math.floor((Date.now()- state.startTime)/1000);
    drawGame(ctx, state);
    if (notifyReact) notifyReact({ ...state });
    return;
  }

  for (let monster of state.monsters) {
    if (Math.random() < 0.10) continue;

    const distToPlayer = Math.abs(monster.x - state.player.x) + Math.abs(monster.y - state.player.y);

    let nextStep = null;

    if (distToPlayer > 8) {
      nextStep = getWanderMove(monster, state);
    } else {
      if (monster.type === 'stalker') nextStep = stalkerMove(monster, state);
      else if (monster.type === 'drifter') nextStep = drifterMove(monster, state);
      else if (monster.type === 'predictor') nextStep = predictorMove(monster, state);
      else if (monster.type === 'zoner') nextStep = zonerMove(monster, state);
    }

    if (nextStep) {
      monster.x = nextStep.x;
      monster.y = nextStep.y;
    }
  }

  let collision = false;
  for (let monster of state.monsters) {
    if (monster.x === state.player.x && monster.y === state.player.y) {
      collision = true;
      break;
    }
  }

  if (collision) {
    state.lives--;
    if (state.lives <= 0) {
      state.status = 'lost';
    } else {
      state.player.x = 10;
      state.player.y = 7;
      state.player.frozen = false;
      state.player.frozenTurns = 0;
    }
  }

  if (state.status === 'lost' || state.status === 'won') {
    state.timeTaken = Math.floor((Date.now() - state.startTime) / 1000);
  }

  state.moves++;
  drawGame(ctx, state);
  if (notifyReact) notifyReact({ ...state });
}