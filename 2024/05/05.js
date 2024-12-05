const fs = require('fs');

function parseInput(input) {
    const [rulesSection, updatesSection] = input.trim().split('\n\n');
    
    // Parse rules into a Map of dependencies
    const rules = new Map();
    rulesSection.split('\n').forEach(rule => {
        const [before, after] = rule.split('|').map(Number);
        if (!rules.has(after)) rules.set(after, new Set());
        rules.get(after).add(before);
    });
    
    // Parse updates into arrays of numbers
    const updates = updatesSection.split('\n').map(update => 
        update.split(',').map(Number)
    );
    
    return { rules, updates };
}

function isValidOrder(pages, rules) {
    // For each page number that has dependencies
    for (let i = 0; i < pages.length; i++) {
        const currentPage = pages[i];
        
        // If this page has dependencies
        if (rules.has(currentPage)) {
            const requiredBefore = rules.get(currentPage);
            const previousPages = new Set(pages.slice(0, i));
            
            // Check if all required pages that are present in this update
            // appear before the current page
            for (const required of requiredBefore) {
                if (pages.includes(required) && !previousPages.has(required)) {
                    return false;
                }
            }
        }
    }
    return true;
}

function solve(input) {
    const { rules, updates } = parseInput(input);
    let sum = 0;
    
    for (const update of updates) {
        if (isValidOrder(update, rules)) {
            // Find middle page number
            const middleIndex = Math.floor(update.length / 2);
            sum += update[middleIndex];
        }
    }
    
    return sum;
}

const input = fs.readFileSync('input.txt', 'utf8');
console.log(solve(input));