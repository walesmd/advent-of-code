const fs = require('fs');

// Put each line into an array of arrays
const input = fs.readFileSync('input.txt', 'utf-8')
    .trim()
    .split('\n')
    .map(line => line.split('   ').map(Number));

// Break those arrays into separate arrays
const firstColumn = input.map(line => line[0]);
const secondColumn = input.map(line => line[1]);

// Sort both
firstColumn.sort((a, b) => a - b);
secondColumn.sort((a, b) => a - b);

console.log(firstColumn, 'Min:', Math.min(...firstColumn));
console.log(secondColumn, 'Min:', Math.min(...secondColumn));

// Create an array of differences
const differences = firstColumn.map((value, index) => Math.abs(secondColumn[index] - value));

// Calculate the sum of the differences
const totalSum = differences.reduce((sum, current) => sum + current, 0);

console.log('Total Sum:', totalSum);