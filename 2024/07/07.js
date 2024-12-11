const fs = require('fs');

// Read and parse input
const input = fs.readFileSync('input.txt', 'utf8')
    .trim()
    .split('\n')
    .map(line => {
        const [test, numbers] = line.split(': ');
        return {
            test: parseInt(test),
            numbers: numbers.split(' ').map(Number)
        };
    });

// Generate all possible combinations of operators
function generateOperatorCombinations(length) {
    const operators = ['+', '*', '||'];  
    const combinations = [];
    const generate = (current) => {
        if (current.length === length - 1) {
            combinations.push(current);
            return;
        }
        for (const op of operators) {
            generate([...current, op]);
        }
    };
    generate([]);
    return combinations;
}

// Evaluate expression left-to-right
function evaluateExpression(numbers, operators) {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const nextNum = numbers[i + 1];
        
        if (operator === '+') {
            result += nextNum;
        } else if (operator === '*') {
            result *= nextNum;
        } else if (operator === '||') {
            result = parseInt(result.toString() + nextNum.toString());
        }
    }
    return result;
}

// Process each equation
let totalCalibration = 0;

for (const equation of input) {
    const operatorCombinations = generateOperatorCombinations(equation.numbers.length);
    const possibleResults = operatorCombinations.map(operators => 
        evaluateExpression(equation.numbers, operators)
    );
    
    if (possibleResults.includes(equation.test)) {
        totalCalibration += equation.test;
    }
}

console.log('Total calibration result (Part 2):', totalCalibration);