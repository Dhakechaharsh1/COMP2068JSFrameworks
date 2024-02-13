const prompt = require('prompt');


function generateComputerSelection() {
    const randomNumber = Math.random();
    if (randomNumber < 0.35) {
        return 'PAPER';
    } else if (randomNumber < 0.68) {
        return 'SCISSORS';
    } else {
        return 'ROCK';
    }
}


prompt.start();


prompt.get(['player1Selection'], function (err, result) {
    if (err) { return onErr(err); }
    
 
    const player1Selection = result.player1Selection.toUpperCase();

    
    const computerSelection = generateComputerSelection();

    
    console.log("Player 1's Selection:", player1Selection);
    console.log("Computer's Selection:", computerSelection);


    if (
        (player1Selection === 'ROCK' && computerSelection === 'SCISSORS') ||
        (player1Selection === 'PAPER' && computerSelection === 'ROCK') ||
        (player1Selection === 'SCISSORS' && computerSelection === 'PAPER')
    ) {
        console.log("Player 1 Wins");
    } else if (
        (computerSelection === 'ROCK' && player1Selection === 'SCISSORS') ||
        (computerSelection === 'PAPER' && player1Selection === 'ROCK') ||
        (computerSelection === 'SCISSORS' && player1Selection === 'PAPER')
    ) {
        console.log("Computer Wins");
    } else {
        console.log("It's a tie");
    }
});


