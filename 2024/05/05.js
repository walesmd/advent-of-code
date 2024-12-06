const fs = require('fs');

function parseInput(input) {
    const [rulesStr, updatesStr] = input.trim().split('\n\n');
    
    // Build dependency graph
    const dependencies = new Map();
    rulesStr.split('\n').forEach(rule => {
        const [before, after] = rule.split('|').map(Number);
        if (!dependencies.has(after)) {
            dependencies.set(after, new Set());
        }
        dependencies.get(after).add(before);
    });

    // Parse updates
    const updates = updatesStr.split('\n').map(line => 
        line.split(',').map(Number)
    );

    return { dependencies, updates };
}

function isValidOrder(update, dependencies) {
    const seen = new Set();
    
    for (const page of update) {
        if (dependencies.has(page)) {
            const required = dependencies.get(page);
            for (const req of required) {
                // If this update includes a required page but we haven't seen it yet
                if (update.includes(req) && !seen.has(req)) {
                    return false;
                }
            }
        }
        seen.add(page);
    }
    return true;
}

function getValidOrder(update, dependencies) {
    // Create adjacency list for this specific update
    const graph = new Map();
    const inDegree = new Map();
    
    // Initialize all pages with empty dependencies
    update.forEach(page => {
        graph.set(page, new Set());
        inDegree.set(page, 0);
    });
    
    // Build graph for this update
    update.forEach(page => {
        if (dependencies.has(page)) {
            const required = dependencies.get(page);
            required.forEach(req => {
                if (update.includes(req)) {
                    graph.get(req).add(page);
                    inDegree.set(page, inDegree.get(page) + 1);
                }
            });
        }
    });
    
    // Topological sort
    const queue = [];
    const result = [];
    
    // Start with nodes that have no dependencies
    update.forEach(page => {
        if (inDegree.get(page) === 0) {
            queue.push(page);
        }
    });
    
    while (queue.length > 0) {
        const page = queue.shift();
        result.push(page);
        
        graph.get(page).forEach(next => {
            inDegree.set(next, inDegree.get(next) - 1);
            if (inDegree.get(next) === 0) {
                queue.push(next);
            }
        });
    }
    
    return result;
}

function solve(input) {
    const { dependencies, updates } = parseInput(input);
    let part1Sum = 0;
    let part2Sum = 0;
    
    updates.forEach(update => {
        const middleIndex = Math.floor(update.length / 2);
        
        if (isValidOrder(update, dependencies)) {
            part1Sum += update[middleIndex];
        } else {
            const sortedUpdate = getValidOrder(update, dependencies);
            part2Sum += sortedUpdate[middleIndex];
        }
    });
    
    return { part1: part1Sum, part2: part2Sum };
}

const input = fs.readFileSync('input.txt', 'utf8');
const { part1, part2 } = solve(input);
console.log('Part 1:', part1);
console.log('Part 2:', part2);