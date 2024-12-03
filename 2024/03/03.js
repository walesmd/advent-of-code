const memory = require('fs').readFileSync('input.txt', 'utf-8')
    .trim();

// Regular expression to match mul(X,Y) where X and Y are 1-3 digit integers and do/don't instructions
const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const stateRegex = /(do|don't)\(\)/g;

let sum = 0;
let enabled = true;  // mul instructions are enabled by default
let mulMatch;
let stateMatch;
let lastProcessedIndex = 0;

// Process the memory string sequentially
while (true) {
    // Find the next mul operation and state change
    mulMatch = mulRegex.exec(memory);
    stateMatch = stateRegex.exec(memory);

    // If no more matches of either type, break
    if (!mulMatch && !stateMatch) break;

    // Determine which match comes first (if both exist)
    const mulIndex = mulMatch ? mulMatch.index : Infinity;
    const stateIndex = stateMatch ? stateMatch.index : Infinity;

    if (stateIndex < mulIndex) {
        // Process state change
        enabled = stateMatch[1] === 'do';
        lastProcessedIndex = stateIndex;
        mulRegex.lastIndex = stateIndex + stateMatch[0].length;
    } else if (mulMatch) {
        // Process multiplication if enabled
        if (enabled) {
            const x = parseInt(mulMatch[1]);
            const y = parseInt(mulMatch[2]);
            sum += x * y;
        }
        lastProcessedIndex = mulIndex;
        stateRegex.lastIndex = mulIndex + mulMatch[0].length;
    }

    // Reset the other regex to search from current position
    if (stateIndex < mulIndex) {
        mulRegex.lastIndex = lastProcessedIndex;
    } else {
        stateRegex.lastIndex = lastProcessedIndex;
    }
}

console.log('Total sum of enabled multiplications:', sum);