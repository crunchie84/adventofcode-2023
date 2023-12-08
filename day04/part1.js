const fs = require('fs');
const puzzleInput = fs.readFileSync('./input.txt', 'utf-8');

const example = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

function parseLineToDigitsTuples(input) {
    const split = input.split('|');
    const cardSplit = split[0].split(':')
    const cardId = cardSplit[0];
    const numbersOfCard = cardSplit[1].split(' ').map(i => parseInt(i,10)).filter(i => !isNaN(i));
    const yourNumbers = split[1].split(' ').map(i => parseInt(i,10)).filter(i => !isNaN(i));
    return {
        cardId,
        numbersOfCard,
        yourNumbers
    };
}

function countMatchingNumbers(numbersOfCard, yourNumbers) {
    // console.log('counting', numbersOfCard, yourNumbers )
    // overlap the numbers, filter out pairs, count those
    return numbersOfCard
        .filter(winningNumber => yourNumbers.includes(winningNumber))
        .reduce((acc, curr, index) => {
            if(index === 0)
                return 1;
            return acc * 2;
        }, 0);
}

function calculateResultsOfPuzzle(input){
    return input.split('\n')
    .map(parseLineToDigitsTuples)
    // .map(tuple => {
    //     console.log('parsed:', tuple)
    //     return tuple
    // })
    .map(tuple => countMatchingNumbers(tuple.numbersOfCard, tuple.yourNumbers))
    .reduce((acc, curr) => acc + curr, 0);
}

console.log('example', calculateResultsOfPuzzle(example));
console.log('part1', calculateResultsOfPuzzle(puzzleInput));