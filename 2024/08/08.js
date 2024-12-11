const fs = require('fs');

function isCollinear(x1, y1, x2, y2, x3, y3) {
    // More precise collinearity check
    const crossProduct = Math.abs((y2 - y1) * (x3 - x2) - (y3 - y2) * (x2 - x1));
    const tolerance = 1e-9;  // Very small tolerance
    return crossProduct < tolerance;
}

function findAntinodes(input) {
    const lines = input.trim().split('\n');
    const grid = lines.map(line => line.split(''));
    const height = grid.length;
    const width = grid[0].length;
    
    // Map to store antennas by their frequency
    const frequencies = new Map();
    
    // Find all antennas
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const char = grid[y][x];
            if (char !== '.' && char !== '#') {
                if (!frequencies.has(char)) {
                    frequencies.set(char, []);
                }
                frequencies.get(char).push([x, y]);
            }
        }
    }
    
    const antinodes = new Set();
    
    // Process each frequency
    for (const [freq, antennas] of frequencies.entries()) {
        // If only one antenna of this frequency, skip
        if (antennas.length <= 1) continue;
        
        // Check every possible point in the grid
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // Count how many pairs of antennas are in line with this point
                let collinearPairs = 0;
                
                // Check this point against all pairs of antennas of this frequency
                for (let i = 0; i < antennas.length; i++) {
                    for (let j = i + 1; j < antennas.length; j++) {
                        const [x1, y1] = antennas[i];
                        const [x2, y2] = antennas[j];
                        
                        // Check if the current point is in line with these two antennas
                        if (isCollinear(x1, y1, x, y, x2, y2)) {
                            collinearPairs++;
                        }
                    }
                }
                
                // If the point is in line with at least two pairs of antennas of this frequency, it's an antinode
                if (collinearPairs >= 1) {
                    antinodes.add(`${x},${y}`);
                }
            }
        }
    }
    
    return antinodes.size;
}

const input = fs.readFileSync('input.txt', 'utf8');
console.log(findAntinodes(input));