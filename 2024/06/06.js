const fs = require('fs');

function findGuardPath(input) {
    const grid = input.split('\n').map(line => line.split(''));
    const visited = new Set();
    let startPos = null;
    let direction = '^';

    // Find starting position
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

    if (!startPos) return 0;

    const directions = {
        '^': { dx: 0, dy: -1, right: '>' },
        '>': { dx: 1, dy: 0, right: 'v' },
        'v': { dx: 0, dy: 1, right: '<' },
        '<': { dx: -1, dy: 0, right: '^' }
    };

    let currentPos = { ...startPos };
    visited.add(`${currentPos.x},${currentPos.y}`);

    while (true) {
        const dir = directions[direction];
        const nextPos = {
            x: currentPos.x + dir.dx,
            y: currentPos.y + dir.dy
        };

        // Check if next position is out of bounds
        if (nextPos.y < 0 || nextPos.y >= grid.length ||
            nextPos.x < 0 || nextPos.x >= grid[0].length) {
            break;
        }

        // Check if there's an obstacle ahead
        if (grid[nextPos.y][nextPos.x] === '#') {
            // Turn right
            direction = dir.right;
        } else {
            // Move forward
            currentPos = nextPos;
            visited.add(`${currentPos.x},${currentPos.y}`);
        }
    }

    return visited.size;
}

// Read input and solve
const input = fs.readFileSync('input.txt', 'utf8').trim();
console.log(findGuardPath(input));