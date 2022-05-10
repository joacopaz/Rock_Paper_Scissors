/*  
    Owner: Joaquín Paz
	Year: 2022
	Description: JavaScript rock/paper/scissors game that generates a user choice amount of rounds, gets a choice for each round, gets a random computer choice, analyzes the outcome and displays the results.
*/

// Variables declaration

let roundsToPlay;
let userScore = 0;
let aiScore = 0;
let userChoice;
let choiceMade = false;
let aiChoice;
let roundNumber = 0;
let gameFinished = false;


// Start the game by needing round numbers to be specified
const getStarted = () => {
    if (document.querySelector('[name="roundNumber"]').value > 0) {
        roundsToPlay = document.querySelector('[name="roundNumber"]').value;
        document.getElementsByTagName(
            "legend"
        )[0].innerText = `What do you choose for round ${roundNumber + 1}?`;
        if (roundsToPlay !== 1) document.querySelector(
            ".roundHeader"
        ).innerText = `- ${roundsToPlay} rounds -`;
        if (roundsToPlay === 1) document.querySelector(
            ".roundHeader"
        ).innerText = `- ${roundsToPlay} round -`;

        document.querySelector('.landing').style.display = "none";
        document.getElementsByTagName("main")[0].style.display = "contents";
    }
}

// Define a function that receives the user input and standardizes it
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
            document.querySelector('.user-input').style.border = 'grey solid 2px';
            document.querySelector('.ai-input').style.border = 'grey solid 2px';
            return `You chose ${user.toUpperCase()} and the AI chose ${ai.toUpperCase()}. <br> It's a tie! `;
        } else if (user === 'rock' && ai === 'scissors' || user === 'paper' && ai === 'rock' || user === 'scissors' && ai === 'paper') {
            userScore++;
            document.querySelector('.user-input').style.border = 'green solid 2px';
            document.querySelector('.ai-input').style.border = 'red solid 2px';
            return `You chose ${user.toUpperCase()} and the AI chose ${ai.toUpperCase()}. <br>Congratulations! You have won this round.`
        } else {
            aiScore++;
            document.querySelector('.user-input').style.border = 'red solid 2px';
            document.querySelector('.ai-input').style.border = 'green solid 2px';
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
    if (gameFinished) {
        document.querySelector('.user-input').style.border = '';
        document.querySelector('.ai-input').style.border = '';
    }
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

// Declare winner graphically

const declareWinner = () => {
    if (gameFinished && userScore > aiScore) {
        document.querySelector('.winner-declaration').style.color = 'green';
        document.querySelector('.winner-declaration').textContent = (`The game ended ${userScore} for you and ${aiScore} for the AI.\r\nCONGRATULATIONS! YOU WON!`);
    } else if (gameFinished && aiScore > userScore) {
        document.querySelector('.winner-declaration').style.color = 'red';
        document.querySelector('.winner-declaration').textContent = (`The game ended ${userScore} for you and ${aiScore} for the AI.\r\nF, you've lost :(`);
    } else if (gameFinished) {
        document.querySelector('.winner-declaration').style.color = '';
        document.querySelector('.winner-declaration').textContent = (`The game ended ${userScore} for you and ${aiScore} for the AI.\r\nITS A TIE :O`)
    }
}

// Code to run when the user clicks the submit button
const submit = async () => {

    // declaring delays to wait for animations
    const delay = ms => new Promise(res => setTimeout(res, ms));
    // Check if the choice has been made
    if (!userChoice) {
        document.querySelector('.winner-declaration').textContent = (`
        Please make a choice`);
        document.querySelector('.winner-declaration').style.color = 'red';
        document.querySelector('.submit-choice').focus();
        // Check if there are still rounds left to be played
    } else if (roundNumber < roundsToPlay) {
        resetAiStyles()
        document.querySelector('.winner-declaration').style.color = '';
        // delete content on div
        document.querySelector('.winner-declaration').textContent = null;
        // get user choice
        userChoice = getUserChoice(userChoice);
        // get ai choice
        aiChoice = getComputerChoice();
        await (aiChooses())
        const rock = document.getElementById('rock-image-ai');
        const paper = document.getElementById('paper-image-ai');
        const scissors = document.getElementById('scissors-image-ai');
        resetAiStyles()
        if (aiChoice === 'paper') paper.style.opacity = '100%';
        if (aiChoice === 'rock') rock.style.opacity = '100%';
        if (aiChoice === 'scissors') scissors.style.opacity = '100%';
        await delay(300);


        document.querySelector('.winner-declaration').innerHTML = (`${determineRoundWinner(userChoice,aiChoice)}`)
        updateState();
        // reset all buttons:
        if (document.querySelector('input[type=radio]:checked')) {
            document.querySelector('input[type=radio]:checked').checked = false;
        }
        choiceMade = false;
        userChoice = '';
        resetStyles()
        if (roundsToPlay > roundNumber) {
            document.getElementsByTagName(
                "legend"
            )[0].innerText = `What do you choose for round ${roundNumber + 1}?`;
        } else {
            gameFinished = true;
            updateState();
            declareWinner();
        }
    }
}

// AI choosing visual effect
const aiChooses = async () => {
    const rock = document.getElementById('rock-image-ai');
    const paper = document.getElementById('paper-image-ai');
    const scissors = document.getElementById('scissors-image-ai');
    document.querySelector('.ai-input span').textContent = null;
    const delay = ms => new Promise(res => setTimeout(res, ms));
    for (let i = 0; i < 2; i++) {
        paper.style.opacity = '0%'
        scissors.style.opacity = '0%'
        rock.style.opacity = '0%'
        await delay(100)
        rock.style.opacity = '100%'
        paper.style.opacity = '0%'
        scissors.style.opacity = '0%'
        await delay(100)
        rock.style.opacity = '0%'
        paper.style.opacity = '100%'
        await delay(100)
        paper.style.opacity = '0%'
        scissors.style.opacity = '100%'
        await delay(100)
    }
}

const resetAiStyles = () => {
    const rock = document.getElementById('rock-image-ai');
    const paper = document.getElementById('paper-image-ai');
    const scissors = document.getElementById('scissors-image-ai');
    paper.style.transition = 'none'
    scissors.style.transition = 'none'
    rock.style.transition = 'none'
    paper.style.opacity = '0%';
    scissors.style.opacity = '0%';
    rock.style.opacity = '0%';
    paper.style.transition = ''
    scissors.style.transition = ''
    rock.style.transition = ''
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
}

const setStyle = (element, att, value) => {
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

// Learning resources

// Infinite loop that checks every 250 ms for declaration of rounds to start the game - now obsolete but left for learning purposes
const waitForRounds = () => {
    if (typeof roundsToPlay !== "undefined" && roundsToPlay !== 0) {
        document.getElementsByTagName(
            "legend"
        )[0].innerText = `What do you choose for round ${roundNumber + 1}?`;
        if (roundsToPlay === 1) {
            document.querySelector(
                ".roundHeader"
            ).innerText = `- ${roundsToPlay} round -`;
        } else if (roundsToPlay > 1) {
            document.querySelector(
                ".roundHeader"
            ).innerText = `- ${roundsToPlay} rounds -`;
        }
    } else {
        setTimeout(waitForRounds, 250);
    }
}