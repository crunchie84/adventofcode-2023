const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

function parseGame(line) {
    const game = line.split(':');
    return ({
        gameId: parseInt(game[0].split(' ')[1], 10),
        rounds: game[1].split(';').map(mapRoundString)
    })
};

function mapRoundString(roundString) {
    return roundString.split(',').reduce((round, dice) => {
        const [count, color] = dice.trim().split(' ');
        round[color] = parseInt(count, 10);
        return round;
    }, {red: 0, green: 0, blue: 0});
}

function calculateGameMaxDice(game) {
    console.log(`calculating game: ${game.gameId}`)
    const maxDice = game.rounds.reduce((maxes, round) => {
        maxes.red = Math.max(maxes.red, round.red);
        maxes.blue = Math.max(maxes.blue, round.blue);
        maxes.green = Math.max(maxes.green, round.green);

        return maxes;

    }, {red: 0, green: 0, blue: 0});

    console.log(`done: game: ${game.gameId}: ${JSON.stringify(maxDice)}`)
    return ({
        gameId: game.gameId,
        maxRed: maxDice.red,
        maxBlue:maxDice.blue,
        maxGreen:maxDice.green,
    });
}

const exampleInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'`

function calculateDay2Part1(input) {
    return input.split('\n')
    .map(parseGame)
    .map(calculateGameMaxDice)
    .filter(game => {
        return game.maxRed <= 12 && game.maxGreen <= 13 && game.maxBlue <= 14;
    })
    .reduce((acc, curr) => acc += curr.gameId, 0)
}

console.log('example day 1 output = ', calculateDay2Part1(exampleInput));
console.log('real day 1 output = ', calculateDay2Part1(input));
