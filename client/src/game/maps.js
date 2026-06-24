// The mapping key to convert ASCII back to the engine's numerical grid
const key = {
    '.': 0, // Free space
    'W': 1, // Water / Impassable
    '#': 2, // Mountain / Slow terrain
    'X': 3, // Exit / Level Border
    'C': 4  // Coin
};

function parseLevel(asciiMap) {
    return asciiMap.map(row => 
        row.split('').map(char => key[char])
    );
}

// LEVEL 1: Exact layout from original loops
const level1Ascii = [
    "XXXXXXXXXXXXXXXXXXXX",
    "X..................X",
    "X..................X",
    "X..C...............X",
    "X..................X",
    "X....WWWWWWWWWW....X",
    "X..................X",
    "X.............C....X",
    "X.........##.......X",
    "X..................X",
    "X..................X",
    "X..C...............X",
    "X..................X",
    "X..................X",
    "XXXXXXXXXXXXXXXXXXXX"
];

// LEVEL 2: Exact layout from original loops
const level2Ascii = [
    "WWWWWWWWWWWWWWWWWWWW",
    "W..................W",
    "W.C......##........W",
    "W...W....##........W",
    "W...W....##........W",
    "W...W....##........W",
    "W........##........X",
    "W............C.....X",
    "W........##........X",
    "W........##........W",
    "W........##....W...W",
    "W........##....W...W",
    "W.C......##....W...W",
    "W..................W",
    "WWWWWWWWWWWWWWWWWWWW"
];

export const level1 = parseLevel(level1Ascii);
export const level2 = parseLevel(level2Ascii);