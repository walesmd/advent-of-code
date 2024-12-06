const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim();

// Parse input and find guard's starting position
function parseInput(input) {
    const grid = input.split('\n').map(line => line.split(''));
    let startPos = null;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '^') {
                startPos = { x, y };
                grid[y][x] = '.';  // Clear the start position
                break;
            }
        }
        if (startPos) break;
    }

    return { grid, startPos };
}

// Track guard's movement and detect loops
function simulateGuard(grid, startPos, debug = false) {
    const directions = {
        0: { dx: 0, dy: -1 },  // Up
        1: { dx: 1, dy: 0 },   // Right
        2: { dx: 0, dy: 1 },   // Down
        3: { dx: -1, dy: 0 }   // Left
    };

    let pos = { ...startPos };
    let dir = 0;  // Start facing up
    const visited = new Set();
    const states = new Set();
    const path = [];

    while (true) {
        // Record current state (position + direction)
        const state = `${pos.x},${pos.y},${dir}`;
        if (states.has(state)) {
            if (debug) {
                console.log('Loop found!');
                console.log('Path:', path);
                console.log('Loop starts at:', state);
            }
            return { hasLoop: true, visited, path };
        }
        states.add(state);
        visited.add(`${pos.x},${pos.y}`);
        path.push({ x: pos.x, y: pos.y, dir });

        // Check next position
        const nextPos = {
            x: pos.x + directions[dir].dx,
            y: pos.y + directions[dir].dy
        };

        // Check if out of bounds
        if (nextPos.y < 0 || nextPos.y >= grid.length ||
            nextPos.x < 0 || nextPos.x >= grid[0].length) {
            return { hasLoop: false, visited, path };
        }

        // Check if obstacle ahead
        if (grid[nextPos.y][nextPos.x] === '#') {
            dir = (dir + 1) % 4;  // Turn right
        } else {
            pos = nextPos;  // Move forward
        }
    }
}

function visualizePath(grid, path) {
    const gridCopy = grid.map(row => [...row]);
    const dirChars = {
        0: '|',  // Up/Down
        1: '-',  // Right
        2: '|',  // Up/Down
        3: '-'   // Left
    };

    path.forEach(({ x, y, dir }) => {
        if (gridCopy[y][x] === '.') {
            gridCopy[y][x] = dirChars[dir];
        } else if (gridCopy[y][x] !== '#') {
            gridCopy[y][x] = '+';
        }
    });

    return gridCopy.map(row => row.join('')).join('\n');
}

function part2() {
    const { grid, startPos } = parseInput(input);
    let loopCount = 0;
    let firstLoop = null;

    // Try each empty position
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            // Skip if not empty or if it's the start position
            if (grid[y][x] !== '.' || (x === startPos.x && y === startPos.y)) {
                continue;
            }

            // Try placing obstacle
            grid[y][x] = '#';
            const result = simulateGuard(grid, startPos, false);
            if (result.hasLoop) {
                loopCount++;
                if (!firstLoop) {
                    firstLoop = {
                        x,
                        y,
                        path: result.path,
                        grid: grid.map(row => [...row])
                    };
                }
            }
            grid[y][x] = '.';  // Remove obstacle
        }
    }

    if (firstLoop) {
        console.log('\nExample of a loop found:');
        console.log(`Obstacle placed at: (${firstLoop.x}, ${firstLoop.y})`);
        console.log('\nPath visualization:');
        console.log(visualizePath(firstLoop.grid, firstLoop.path));
    }

    return loopCount;
}

console.log('Part 2:', part2());