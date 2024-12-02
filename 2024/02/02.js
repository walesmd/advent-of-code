const reports = require('fs').readFileSync('input.txt', 'utf-8')
    .trim()
    .split('\n')
    .map(line => line.split(' ').map(Number));

function isOrdered(report) {
    let ascending = true;
    let descending = true;
    
    // Loop through each level in a report checking if
    // we're ascending or descending, return false early if not
    for (let i = 1; i < report.length; i++) {
        const diff = Math.abs(report[i] - report[i - 1]);
        
        // If difference is not between 1 and 3, neither condition can be true
        if (diff < 1 || diff > 3) {
            return false;
        }
        
        if (report[i] <= report[i - 1]) {
            ascending = false;
        }
        if (report[i] >= report[i - 1]) {
            descending = false;
        }
    }
    
    return ascending || descending;
}

// Count our ordered reports
const orderedCount = reports.reduce((count, report) => {
    return count + (isOrdered(report) ? 1 : 0);
}, 0);

console.log('Number of ordered reports:', orderedCount);