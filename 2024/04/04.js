const fs = require('fs');

// Read the input file
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

// Convert input into a 2D grid
const grid = input.map(line => line.split(''));

// Function to check if coordinates are within grid bounds
function isValid(x, y, rows, cols) {
    return x >= 0 && x < rows && y >= 0 && y < cols;
}

// Function to check if a diagonal forms "MAS" (in either direction)
function checkDiagonal(grid, x1, y1, x2, y2) {
    // Get the three characters along the diagonal
    const chars = [
        grid[x1][y1],
        grid[(x1 + x2) / 2][(y1 + y2) / 2],
        grid[x2][y2]
    ];
    
    // Check if it forms "MAS" forwards or backwards
    return (chars.join('') === 'MAS' || chars.join('') === 'SAM');
}

// Function to check for X-MAS pattern at a given position
function checkXMASPattern(grid, centerX, centerY) {
    const rows = grid.length;
    const cols = grid[0].length;
    
    // Check if we have enough space around the center point
    if (!isValid(centerX - 1, centerY - 1, rows, cols) ||
        !isValid(centerX - 1, centerY + 1, rows, cols) ||
        !isValid(centerX + 1, centerY - 1, rows, cols) ||
        !isValid(centerX + 1, centerY + 1, rows, cols)) {
        return false;
    }
    
    // Check both diagonals (top-left to bottom-right and top-right to bottom-left)
    const diagonal1 = checkDiagonal(grid, 
        centerX - 1, centerY - 1,  // top-left
        centerX + 1, centerY + 1   // bottom-right
    );
    
    const diagonal2 = checkDiagonal(grid,
        centerX - 1, centerY + 1,  // top-right
        centerX + 1, centerY - 1   // bottom-left
    );
    
    // Both diagonals must form valid MAS patterns
    return diagonal1 && diagonal2;
}

// Main function to count all X-MAS patterns
function countXMASPatterns(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    
    // Check each position as a potential center point
    for (let i = 1; i < rows - 1; i++) {
        for (let j = 1; j < cols - 1; j++) {
            if (checkXMASPattern(grid, i, j)) {
                count++;
            }
        }
    }
    
    return count;
}

// Get the result
const result = countXMASPatterns(grid);
console.log(`Found ${result} X-MAS patterns in the grid`);