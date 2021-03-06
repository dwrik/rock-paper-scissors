const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

let currentRound = 1;
let playerWins = 0;
let aiWins = 0;

// attach event listeners
const buttons = document.querySelectorAll('.game-buttons');
buttons.forEach(button => button.addEventListener('click', playGame));

function playGame(event) {
    const playerSelection = event.target.id;
    const computerSelection = computerPlay();
    const playerWon = playRound(playerSelection, computerSelection);
    updateScoreboard(playerWon, playerSelection, computerSelection);
}

function updateRoundNumber() {
    const roundNumber = document.querySelector('#round-number');
    roundNumber.innerHTML = `Round #${++currentRound}`;
}

function checkForWinner() {
    let gameOver = false;
    let gameOverMessage = '';
    if (playerWins === 5) {
        gameOver = true;
        gameOverMessage = 'Congratulations! You won';
    }
    if (aiWins === 5) {
        gameOver = true;
        gameOverMessage = 'Sorry! You lost';
    }
    if (gameOver) {
        buttons.forEach(button => button.removeEventListener('click', playGame));
        buttons.forEach(button => button.classList.toggle('hover-effect'));
        const roundNumber = document.querySelector('#round-number');
        const roundInfo = document.querySelector('#round-info');
        const instruction = document.querySelector('#instruction');
        instruction.innerHTML = 'Game Over! Refresh the page to play again.';
        roundInfo.removeChild(roundNumber);
        const heading = document.createElement('h3');
        heading.innerHTML = gameOverMessage;
        roundInfo.insertBefore(heading, instruction);
    }
}

// update scoreboard by incrementing points
// and updating result text and console
function updateScoreboard(playerWon, playerSelection, computerSelection) {
    let roundResult = '';
    if (playerWon == null) {
        roundResult = 'Hmm... It\'s a tie!';
    } else if (playerWon) {
        roundResult = `Yay you won! Your ${capitalize(playerSelection)} beat AI's ${capitalize(computerSelection)}`;
        const playerScore = document.querySelector('#user-points');
        playerScore.innerHTML = ++playerWins;
    } else {
        roundResult = `Oops you lost! AI's ${capitalize(computerSelection)} beat your ${capitalize(playerSelection)}`;
        const aiScore = document.querySelector('#ai-points');
        aiScore.innerHTML = ++aiWins;
    }
    const console = document.querySelector('#console');
    const firstChild = console.firstElementChild;
    const para = document.createElement('p');
    para.innerHTML = `Round #${currentRound}: ${roundResult}`;
    console.insertBefore(para, firstChild);
    updateRoundNumber();
    checkForWinner();
}

// simulate computer's play
function computerPlay() {
    let choices = [ROCK, PAPER, SCISSORS];
    let random = Math.floor(Math.random() * 3);
    return choices[random];
}

// simulate a single round
function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return null;
    }
    if ((playerSelection === ROCK && computerSelection === SCISSORS) ||
            (playerSelection === SCISSORS && computerSelection === PAPER) ||
            (playerSelection === PAPER && computerSelection === ROCK)) {
        return true;
    } else {
        return false;
    }
}

// helper
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}