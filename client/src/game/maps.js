const rows = 15;
const cols = 20;
const map = [];

for(let y = 0; y < rows; y++) {
    const row = [];
    for(let x = 0; x < cols; x++) {
        if(y === 0 || y === rows - 1 || x === 0 || x === cols - 1) {
            row.push(3);
        } else {
            row.push(0);
        }
    }
    map.push(row);
}

map[5][5] = 1; map[5][6] = 1;
map[8][10] = 2; map[8][11] = 2;

export const level1 = map;

const map2 = [];

for(let y = 0; y < rows; y++) {
    const row = [];
    for(let x = 0; x < cols; x++) {
        if (x === cols - 1 && y >= 6 && y <= 8) {
            row.push(3);
        } else if (y === 0 || y === rows - 1 || x === 0 || x === cols - 1) {
            row.push(1);
        } else {
            row.push(0);
        }
    }
    map2.push(row);
}

for (let y = 2; y < 13; y++) {
    if (y !== 7) {
        map2[y][9] = 2;
        map2[y][10] = 2;
    }
}

map2[3][4] = 1; map2[4][4] = 1; map2[5][4] = 1;
map2[10][15] = 1; map2[11][15] = 1; map2[12][15] = 1;

map2[2][2] = 4; map2[12][2] = 4; map2[7][13] = 4;

export const level2 = map2;