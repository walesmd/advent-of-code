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

// console.log(firstColumn, 'Min:', Math.min(...firstColumn));
// console.log(secondColumn, 'Min:', Math.min(...secondColumn));

// Part 1: Create an array of differences
// const differences = firstColumn.map((value, index) => Math.abs(secondColumn[index] - value));

// Part 1: Calculate the sum of the differences
// const totalSum = differences.reduce((sum, current) => sum + current, 0);
// console.log('Total Sum:', totalSum);

// Part 2: Calculate similarity scores
// Convert firstColumn to a set
const uniqueFirstColumn = new Set(firstColumn);

// Part 2: Calculate similarity scores
const similarityScores = Array.from(uniqueFirstColumn).map(value => {
    const occurrences = secondColumn.filter(secondValue => secondValue === value).length;
    return value * occurrences;
});

// Part 2: Sum all similarity scores
const totalSum = similarityScores.reduce((sum, current) => sum + current, 0);
console.log('Total Sum:', totalSum);