const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8').split('\n');

/*
part 2
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".
*/

const calibrationSumPartTwo = puzzleInput.map(line => {
    return getFirstLastDigitSmudgedTogther(replaceNameWithDigit(line).split(''))
})
.reduce((sum, current) => sum += current, 0);

console.log('puzzle day 1 part 2 total sum', calibrationSumPartTwo);

function getFirstLastDigitSmudgedTogther(inputOfCharDigits) {
    const digits = inputOfCharDigits
        .filter(char => '0123456789'.includes(char));
    const parsed = parseInt(digits[0] + digits[digits.length - 1], 10);
    if(parsed < 9 || parsed > 99) {
        throw new Error('number should be between 10 and 99, but got: ' + parsed);
    }
    return parsed;
}

test('two1nine', '29');
test('eightwothree', '83');
test('abcone2threexyz', '13');
test('xtwone3four', '24');
test('4nineeightseven2', '42');
test('zoneight234', '14');
test('7pqrstsixteen', '76');
test('eightwo5eightwo', '82');
test('24', '24');
test('rsmcrqlnhsmjhspseven96vsckknrggbjd4tgtgbkxgvt', '74');
test('3nine6five1', '31')
test('kffeightwogzcqpzdbhfvmckxmbhrgvonevcshkbctbc524', '84')
test('1','11');
test('9q','99');
test('fouronekbfmdrjxvn8kz1twosevenrth','47');
test('threedmxbsevenjmdvrzlfive26', '36')
test('twoneighthree','23');
test('threetwo6two','32');
test('oneight', '18');


function test(input, shouldMatch){
    const actualOutput = getFirstLastDigitSmudgedTogther(replaceNameWithDigit(input).split(''));

    return console.log(`input=${input}, output_should_be=${shouldMatch}, output=${actualOutput}: ${actualOutput == shouldMatch ? '✅' : '❌'}`);
}

function replaceNameWithDigit(input, indexToStartAt=0){
    // digit strings could be interleaved with each other
    // scan the string left to right and try to replace first occurence
    
    // here be dragons, forgive me
    const valuesToFind = ['one', 'two', 'three','four','five','six', 'seven', 'eight','nine'];
    const digitValueOfIt = ['1','2','3','4','5','6','7','8','9'];

    // find first index of first value to replace, recursive, till we find nothing more
    const firstToReplace = valuesToFind.map(stringValue => ({ stringValue, indexFound: input.indexOf(stringValue, indexToStartAt)}))
        .filter(items => items.indexFound > -1)
        .sort((a,b) => a.indexFound - b.indexFound)
        .map(item => item.stringValue)
        .shift();

    if(firstToReplace === undefined) {
        // done recursing
        return input;
    }
    const indexOfFirstToReplace = input.indexOf(firstToReplace);
    
    // just add the digit in the string before its text value, we are working left to right so it should work
    const appendedDigitValue = input.slice(0, indexOfFirstToReplace) 
        + digitValueOfIt[valuesToFind.indexOf(firstToReplace)] 
        + input.slice(indexOfFirstToReplace + 1);
    
    // skip a few chars index to work left to right
    return replaceNameWithDigit(appendedDigitValue, indexOfFirstToReplace + 2);
}