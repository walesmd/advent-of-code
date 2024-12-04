const fs = require('fs');

// Read the input file
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

// Convert input into a 2D grid
const grid = input.map(line => line.split(''));

// Function to check if coordinates are within grid bounds
function isValid(x, y, rows, cols) {
    return x >= 0 && x < rows && y >= 0 && y < cols;
}

// Function to check for "XMAS" starting at a position in a given direction
function checkDirection(grid, startX, startY, dirX, dirY) {
    const word = "XMAS";
    const rows = grid.length;
    const cols = grid[0].length;
    
    for (let i = 0; i < word.length; i++) {
        const x = startX + (dirX * i);
        const y = startY + (dirY * i);
        
        if (!isValid(x, y, rows, cols) || grid[x][y] !== word[i]) {
            return false;
        }
    }
    return true;
}

// Main function to count all occurrences of "XMAS"
function countXMAS(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    
    // All possible directions: horizontal, vertical, and diagonal
    const directions = [
        [0, 1],   // right
        [0, -1],  // left
        [1, 0],   // down
        [-1, 0],  // up
        [1, 1],   // down-right
        [-1, -1], // up-left
        [1, -1],  // down-left
        [-1, 1]   // up-right
    ];
    
    // Check each position as a potential starting point
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Try each direction from this position
            for (const [dirX, dirY] of directions) {
                if (checkDirection(grid, i, j, dirX, dirY)) {
                    count++;
                }
            }
        }
    }
    
    return count;
}

// Get the result
const result = countXMAS(grid);
console.log(`Found ${result} occurrences of "XMAS" in the grid`);