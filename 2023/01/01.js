// Read the input file
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

// Break the file on \n
const lines = input.split('\n');

const wordMap = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
};

const regexMap = new RegExp(Object.keys(wordMap).join('|'), 'g');

// Iterate over each line
const calibrationCodes = lines.map(line => {
    line = line.replace(regexMap, function(match) {
        return wordMap[match];
    });
    console.log(line);

    // Here lineArrays are chacters
    const lineArray = line.split('');

    const firstDigit = lineArray.find(char => !isNaN(char));
    
    // Find the last !isNaN
    const lastDigit = lineArray.reverse().find(char => !isNaN(char));

    if (firstDigit && lastDigit) {
        return parseInt(firstDigit + lastDigit); // '46' -> 46
    }
}).filter(Boolean);

// Sum the calibraion codes
console.log('Calibration codes: ', calibrationCodes);
const sum = calibrationCodes.reduce((acc, curr) => acc + curr, 0);
console.log('Sum: ', sum);