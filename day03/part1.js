const fs = require('fs');
const day1puzzle = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const puzzle = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`.split('\n');

const testcase1 = 
`........................
......360...914*875.104&
.......*................`;
const expectedSum1 = 360 + 914 + 875 + 104;

const testcase2 = `
...
...
...`;
const expectedSum2 = 0;

const testcase3 = `
123
...
...`;
const expectedSum3 = 0;

const testcase4 = `
123
..$`;
const expectedSum4 = 123;

test(testcase1, expectedSum1);
test(testcase2, expectedSum2);
test(testcase3, expectedSum3);
test(testcase4, expectedSum4);

test(`
$...
.123
....
`, 123);

test(`
$$$.
.123
....
`, 123);

test(`
..........
.......36.
&..996*...
..........
.........8
79*660....
.......846
`,
36 + 996 + 79 + 660)
test(`
..............
..113.........
.*............
482..611...249
......*...*...
.....872.78...
`, 113 + 482 + 611 + 249 + 872 + 78);
test(`
.....@....
..250.....
......159.
........*.
.122.273..
`,
250 + 159 + 273)

test(`
12.......*..
+.........34
.......-12..
..78........
..*....60...
78.........9
.5.....23..$
8...90*12...
............
2.2......12.
.*.........*
1.1..503+.56
`, 925)
test(`
........
.24..4..
......*.`,
4)
test(`
....................
..-52..52-..52..52..
..................-.`,156)
test(`
.......5......
..7*..*.......
...*13*.......
.......15.....`, 5+7+13+15)
test(`
.......5......
..7*..*.....4*
...*13*......9
.......15.....
..............
..............
..............
..............
..............
..............
21............
...*9.........`, 5+7+4+13+9+15+9)

test(`.....
21...
...*9`, 9)
test(`
...
21.
...`, 0)
test(`....
21..
...*`, 0)


console.log('testcase given: ', findSumOfAllParts(puzzle));
console.log('day3-1: ', findSumOfAllParts(day1puzzle));

function test(input, expectedSum) {
    const actual = findSumOfAllParts(input.split('\n'));
    console.log(`expected: ${expectedSum}, actual: ${actual}, result: ${expectedSum === actual ? '✅' : '❌'}`);
}

function findSumOfAllParts(schematic) {
    const digitsRegex = /\d+/g;
    let sum = 0;
    schematic.forEach((row, lineIndex) => {
        // keep the numbers that have a symbol around them
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll
        for (const match of row.matchAll(digitsRegex)) {
            const number = match[0];
            const startOfNumberIndex = match.index;
            // at the length of the digits to the index, but; first index is already first char so substract -1
            const endNumberIndex = (-1 + match.index) + match[0].length; 
            if(hasSymbolSurroundingItSomewhereIDontKnowHow(schematic, lineIndex, startOfNumberIndex, endNumberIndex)){
                // yay we found a part number
                sum += parseInt(number, 10);
            }
        }
    });
    return sum;
}

// input: 
// lineIndex = 2, startOfDigitIndex = 4, endOfDigitIndex=7
function hasSymbolSurroundingItSomewhereIDontKnowHow(puzzle, lineIndex, startOfDigitIndex, endOfDigitIndex) {
    // console.log('searching for symbols around digit', JSON.stringify({lineIndex, startOfDigitIndex, endOfDigitIndex }))
    const minimalIndexOfSymbol = startOfDigitIndex - 1;
    const maximumIndexOfSymbol = endOfDigitIndex + 1;

    // has a symbol in the line above?
    const lineAbove = lineIndex - 1;
    if(containsSymbols(puzzle[lineAbove], minimalIndexOfSymbol, maximumIndexOfSymbol)) {
        return true;
    }

    // has a symbol before or after our digit?
    const currentLine = lineIndex;
    if(containsSymbols(puzzle[currentLine], minimalIndexOfSymbol, maximumIndexOfSymbol)) {
        return true;
    }

    // has a symbol in the line below?
    const lineBelow = lineIndex + 1;
    if(containsSymbols(puzzle[lineBelow], minimalIndexOfSymbol, maximumIndexOfSymbol)) {
        return true;
    }

    return false; //didn't find anything, sorry, no part number
}

function containsSymbols(textLine, minimalIndexOfSymbol, maximumIndexOfSymbol) {
    if(textLine === undefined) {
        return false;
    }

    const symbolsRegex = /[^\d\.]/g;
    const symbolMatchesInText = textLine.matchAll(symbolsRegex);

    for (const match of symbolMatchesInText) {
        const symbolIndex = match.index;
        if(symbolIndex >= minimalIndexOfSymbol && symbolIndex <= maximumIndexOfSymbol){
            return true;
        }
    }
    return false;
}