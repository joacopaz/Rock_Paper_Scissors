/*  
    Owner: Joaquín Paz
	Year: 2022
	Description: JavaScript rock/paper/scissors game that generates a user choice amount of rounds, gets a choice for each round, gets a random computer choice, analyzes the outcome and displays the results.
*/

const getStarted = () => {
    roundsToPlay = document.querySelector('[name="roundNumber"]').value;
    if (roundsToPlay < 1) return
    document.querySelector('.landing').style.display = "none";
    document.getElementsByTagName("main")[0].style.display = "contents";

};

// Define a function that receives the user input
const getUserChoice = (userInput) => {
    userInput = userInput.toLowerCase();
    if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors') {
        return userInput;
    } else {
        console.log(`${userInput} is not a valid choice. Please input rock, paper or scissors.`);
        return ''
    }
}

// Generate a random choice for the AI
const getComputerChoice = () => {
    const choice = Math.floor(Math.random() * 3);
    switch (choice) {
        case 0:
            return 'rock'
            break;
        case 1:
            return 'paper'
            break;
        case 2:
            return 'scissors'
            break;
        default:
            return 'the computer is undecided'
            break;
    }
}

// Evaluating result for the round
const determineRoundWinner = (user, ai) => {
    if ((user === 'rock' || user === 'paper' || user === 'scissors') && (ai === 'rock' || ai === 'paper' || ai === 'scissors')) {
        roundNumber++;
        if (user === ai) {
            return `You chose ${user.toUpperCase()} and the AI chose ${ai.toUpperCase()}. <br> It's a tie! `;
        } else if (user === 'rock' && ai === 'scissors' || user === 'paper' && ai === 'rock' || user === 'scissors' && ai === 'paper') {
            userScore++;
            return `You chose ${user.toUpperCase()} and the AI chose ${ai.toUpperCase()}. <br>Congratulations! You have won this round.`
        } else {
            aiScore++;
            return `You chose ${user.toUpperCase()} and the AI chose ${ai.toUpperCase()}. <br>Bummer, you have lost this round.`
        }
    } else {
        return `This round is invalid, a choice was incorrect. You chose ${user?user.toUpperCase():'nothing'} and the ai chose ${ai.toUpperCase()}. Please replay the round.`
    }
}

// Update state of the game graphically
const updateState = () => {
    document.getElementById("displayRound").textContent = roundNumber;
    document.getElementById("yourScore").textContent = userScore;
    document.getElementById("aiScore").textContent = aiScore;
    // Styling the victory for easier identification
    if (userScore > aiScore) {
        document.getElementById('yourScore').parentElement.style.color = 'green'
        document.getElementById('yourScore').parentElement.style.border = 'green solid 2px'
        document.getElementById('aiScore').parentElement.style.color = 'red'
        document.getElementById('aiScore').parentElement.style.border = 'red solid 2px'
    } else if (aiScore > userScore) {
        document.getElementById('aiScore').parentElement.style.color = 'green'
        document.getElementById('aiScore').parentElement.style.border = 'green solid 2px'
        document.getElementById('yourScore').parentElement.style.color = 'red'
        document.getElementById('yourScore').parentElement.style.border = 'red solid 2px'
    } else {
        document.getElementById('aiScore').parentElement.style.color = 'green'
        document.getElementById('aiScore').parentElement.style.border = 'green solid 2px'
        document.getElementById('yourScore').parentElement.style.color = 'green'
        document.getElementById('yourScore').parentElement.style.border = 'green solid 2px'
    }

}

// Code to run when the user clicks the submit button
const submit = () => {
    // Check if the choice has been made
    if (!userChoice) {
        document.getElementById('played').textContent = (`
        Please make a choice`);
        document.getElementById('played').style.color = 'red';
        document.querySelector(".submit-choice").focus();
        // Check if there are still rounds left to be played
    } else if (roundNumber < roundsToPlay) {
        document.getElementById('played').style.color = '';
        // delete content on div
        document.getElementById('played').textContent = null;
        // get user choice
        userChoice = getUserChoice(userChoice);
        // get ai choice
        aiChoice = getComputerChoice();

        document.getElementById('played').innerHTML = (`${determineRoundWinner(userChoice,aiChoice)}`)
        updateState();
        // reset all buttons:
        if (document.querySelector('input[type=radio]:checked')) {
            document.querySelector('input[type=radio]:checked').checked = false;
        }
        choiceMade = false;
        userChoice = '';
        resetStyles()
    } else {
        if (gameFinished && userScore > aiScore) {
            document.getElementById('played').style.color = 'green';
            document.getElementById('played').innerHTML = (`The game ended ${userScore} for you and ${aiScore} for the AI.<br>CONGRATULATIONS! YOU WON!`);
        } else if (gameFinished && aiScore > userScore) {
            document.getElementById('played').style.color = 'red';
            document.getElementById('played').innerHTML = (`The game ended ${userScore} for you and ${aiScore} for the AI.<br>F, you've lost :(`);
        } else if (gameFinished) {
            document.getElementById('played').style.color = '';
            document.getElementById('played').innerHTML = (`The game ended ${userScore} for you and ${aiScore} for the AI.<br>ITS A TIE :O`)
        }
    }
    if (roundsToPlay > roundNumber) {
        document.getElementsByTagName(
            "legend"
        )[0].innerText = `What do you choose for round ${roundNumber + 1}?`;
    } else {
        gameFinished = true;
    }
}

const waitForRounds = () => {
    if (typeof roundsToPlay !== "undefined") {
        document.getElementsByTagName(
            "legend"
        )[0].innerText = `What do you choose for round ${roundNumber + 1}?`;
        if (roundsToPlay === 1) {
            document.querySelector(
                ".roundHeader"
            ).innerText = `- ${roundsToPlay} round -`;
        } else {
            document.querySelector(
                ".roundHeader"
            ).innerText = `- ${roundsToPlay} rounds -`;
        }
    } else {
        setTimeout(waitForRounds, 250);
    }
}
const styleSelection = (id) => {
    document.getElementById(id).style.backgroundColor = 'rgba(161, 238, 238, 0.363)';
    document.getElementById(id).style.outline = '2px rgb(11, 99, 188) solid';
    document.getElementById(id).style.color = 'rgb(11, 99, 188)';
    resetStyles();
}
const resetStyles = () => {
    document.querySelectorAll('input[type=radio]:not(:checked)').forEach(e => {
        e.parentElement.style.backgroundColor = '';
        e.parentElement.style.outline = '';
        e.parentElement.style.color = '';
    })
    resetUser();
}

function setStyle(element, att, value) {
    document.querySelector(element).style[att] = value;
}

const thinkingRock = () => {
    if (choiceMade) return;
    document.getElementById('rock-image-user').style.opacity = '100%';
    document.querySelector('.user-input span').style.display = "none";
}
const thinkingPaper = () => {
    if (choiceMade) return;
    document.getElementById('paper-image-user').style.opacity = '100%';
    document.querySelector('.user-input span').style.display = "none";
}
const thinkingScissors = () => {
    if (choiceMade) return;
    document.getElementById('scissors-image-user').style.opacity = '100%';
    document.querySelector('.user-input span').style.display = "none";
}
const updateContainer = () => {
    choiceMade = true;
    document.getElementById('rock-image-user').style.opacity = '';
    document.getElementById('paper-image-user').style.opacity = '';
    document.getElementById('scissors-image-user').style.opacity = '';
    document.querySelector('.user-input span').style.display = "none";

    switch (userChoice) {

        case 'rock':
            document.getElementById('rock-image-user').style.opacity = '100%';
            break;
        case 'paper':
            document.getElementById('paper-image-user').style.opacity = '100%';
            break;
        case 'scissors':
            document.getElementById('scissors-image-user').style.opacity = '100%';
            break;

        default:
            break;
    }
}

const resetUser = () => {
    if (choiceMade) return;
    document.getElementById('rock-image-user').style.opacity = '';
    document.getElementById('paper-image-user').style.opacity = '';
    document.getElementById('scissors-image-user').style.opacity = '';
    document.querySelector('.user-input span').style.display = "contents";
}

let choiceMade = false;
let roundsToPlay;
let userScore = 0;
let aiScore = 0;
let userChoice;
let aiChoice;
let roundNumber = 0;
let gameFinished = false;

// Adding listeners for keys so user can press spacebar to action the submit button