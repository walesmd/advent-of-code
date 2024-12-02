const reports = require('fs').readFileSync('input.txt', 'utf-8')
    .trim()
    .split('\n')
    .map(line => line.split(' ').map(Number));

function isOrderedWithoutNumber(report, skipIndex) {
    let ascending = true;
    let descending = true;
    let prev = null;
    
    for (let i = 0; i < report.length; i++) {
        if (i === skipIndex) continue;
        
        if (prev !== null) {
            const diff = Math.abs(report[i] - prev);
            if (diff < 1 || diff > 3) return false;
            
            if (report[i] <= prev) ascending = false;
            if (report[i] >= prev) descending = false;
        }
        prev = report[i];
    }
    
    return ascending || descending;
}

function isOrdered(report) {
    // First check if the sequence is valid as-is
    let ascending = true;
    let descending = true;
    
    for (let i = 1; i < report.length; i++) {
        const diff = Math.abs(report[i] - report[i - 1]);
        if (diff < 1 || diff > 3) {
            ascending = false;
            descending = false;
            break;
        }
        
        if (report[i] <= report[i - 1]) ascending = false;
        if (report[i] >= report[i - 1]) descending = false;
    }
    
    if (ascending || descending) return true;
    
    // If not valid, try removing each number one at a time
    for (let i = 0; i < report.length; i++) {
        if (isOrderedWithoutNumber(report, i)) {
            return true;
        }
    }
    
    return false;
}

// Count our ordered reports
const orderedCount = reports.reduce((count, report) => {
    return count + (isOrdered(report) ? 1 : 0);
}, 0);

console.log('Number of ordered reports:', orderedCount);