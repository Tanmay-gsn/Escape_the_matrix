# Escape the Matrix 🚀

### All-JavaScript · HTML5 Canvas · React · Node/Express · MongoDB

A fast-paced, retro-arcade survival game built completely from scratch as part of the IEEE Computer Society ETM project group. Players control an astronaut who has crash-landed in a hazardous, neon-lit alien environment. The mission is to navigate the grid, manage tactical terrain, outsmart four distinct artificial intelligence algorithms, and reach the glowing quantum escape portal to secure a spot on the live, cloud-hosted leaderboard.

---

## 🕹️ How to Play & Game Rules

1. **The Objective:** Navigate from the center of the map to any flashing **EXIT** portal on the grid boundaries while avoiding hostile entities and collecting coins (+10 score).
2. **The Controls:** The game is turn-based. Time only advances when you make a move. Use your keyboard **Arrow Keys** to step in the four cardinal directions.
3. **The Terrain Trap:** \* **Plasma fields :** Completely impassable walls for both players and monsters.
   - **Mountains (Gray):** Safe to cross but acts as "space mud". Entering a mountain tile freezes your astronaut for 1 turn. _Monsters are not slowed down by mountains!_
4. **The High Stakes:** Getting caught by any monster costs 1 life. At 0 lives, the game ends, and your score, level, and survival time are automatically blasted to our cloud database to rank you on the Top 10 Leaderboard.

---

## 🧠 Brains of the Matrix: The Monsters

Our AI layer completely avoids commercial game loops, utilizing decoupled coordinate math to drive four unique behavior trees:

- **The Stalker (Red):** Uses **Dijkstra's Algorithm** to calculate the most cost-efficient path to your position, factoring in terrain weights. It shifts to a **Breadth-First Search (BFS)** 30% of the time to introduce human-like tracking errors.
- **The Predictor (Orange):** Calculates your velocity vector, projects your position two steps ahead, and uses **A\* (A-Star) Search** with an inadmissible heuristic multiplier (1.3) to aggressively cut you off in an ambush.
- **The Drifter (Purple):** A chaos wildcard executing a **probabilistic BFS** that samples its next step stochastically (60% optimal path, 25% second-best, 15% random) to create organic movement.
- **The Zoner (Teal):** Concurrently runs a double-wave **BFS network** from both itself and the player to compute territory ownership, using **Dijkstra** to hold choke points and block exits.

---

## Play Online !

[Link will be updated soon, install to enjoy right now !]

## 🛠️ Set-up Guide to install and play!

Follow these steps to spin up the local development environment.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the Repository using terminal

````bash
git clone https://github.com/shreyas2006-astro/Escape-the-matrix.git
cd escape-the-matrix
cd client
npm install
npm run dev
Open http://localhost:XXXX that spined up in your browser and enter the matrix !
````
### 2. Clone the Repository using Github Desktop
```github desktop

open github desktop, add new repo
paste https://github.com/shreyas2006-astro/Escape-the-matrix.git this link in url section and clone.
open in visual code studio (or any editor)
open terminal inside vs code and run the following commands
1. cd client
2. npm install
3. npm run dev

click follow link and enter the matrix !
````
