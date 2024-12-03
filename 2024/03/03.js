const memory = require('fs').readFileSync('input.txt', 'utf-8')
    .trim();

// Regular expression to match mul(X,Y) where X and Y are 1-3 digit integers
const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

let sum = 0;
let match;

// Find all matches and process them
while ((match = regex.exec(memory)) !== null) {
    const x = parseInt(match[1]);
    const y = parseInt(match[2]);
    sum += x * y;
}

console.log('Total sum:', sum);