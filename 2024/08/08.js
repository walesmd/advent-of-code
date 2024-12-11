const fs = require('fs');

function isCollinear(x1, y1, x2, y2, x3, y3) {
    // Check if three points are in a straight line
    return Math.abs((y2 - y1) * (x3 - x2) - (y3 - y2) * (x2 - x1)) < 0.0001;
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
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
    for (const antennas of frequencies.values()) {
        // Check each pair of antennas with the same frequency
        for (let i = 0; i < antennas.length; i++) {
            for (let j = i + 1; j < antennas.length; j++) {
                const [x1, y1] = antennas[i];
                const [x2, y2] = antennas[j];
                
                // For each point in the grid
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        // Skip if not collinear
                        if (!isCollinear(x1, y1, x, y, x2, y2)) continue;
                        
                        // Calculate distances
                        const d1 = distance(x1, y1, x, y);
                        const d2 = distance(x2, y2, x, y);
                        
                        // Check if one distance is exactly twice the other
                        if (Math.abs(d1 * 2 - d2) < 0.0001 || Math.abs(d2 * 2 - d1) < 0.0001) {
                            antinodes.add(`${x},${y}`);
                        }
                    }
                }
            }
        }
    }
    
    return antinodes.size;
}

const input = fs.readFileSync('input.txt', 'utf8');
console.log(findAntinodes(input));