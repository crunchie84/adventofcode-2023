/*
The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values?
*/


// part 1

// foreach line
// find first and last digit
// add them together
// add that to the total

const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8').split('\n');

// day one part one
const calibrationSum = puzzleInput.map(line => {
    const digits = line.split('')
        .filter(char => '0123456789'.includes(char));
    return parseInt(digits[0] + digits[digits.length - 1], 10);
})
.reduce((sum, current) => sum += current, 0);

console.log('puzzle day 1 part 1 total sum', calibrationSum);
