/*  
    Owner: Joaquín Paz
	Year: 2022
	Description: JavaScript rock/paper/scissors game that generates a user choice amount of rounds, gets a choice for each round, gets a random computer choice, analyzes the outcome and displays the results.
*/

const getStarted = () => {
    roundsToPlay = document.getElementById("roundNumber").value;
    if (roundsToPlay > 0) {
        document.getElementById("welcome").style.display = "none";
        document.getElementById("main").style.display = "contents";
    }
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
            return `You chose ${user.toUpperCase()} and the AI chose ${ai.toUpperCase()}. <br><br> It's a tie! `;
        } else if (user === 'rock' && ai === 'scissors' || user === 'paper' && ai === 'rock' || user === 'scissors' && ai === 'paper') {
            userScore++;
            return `You chose ${user.toUpperCase()} and the AI chose ${ai.toUpperCase()}. <br><br>Congratulations! You have won this round.`
        } else {
            aiScore++;
            return `You chose ${user.toUpperCase()} and the AI chose ${ai.toUpperCase()}. <br><br>Bummer, you have lost this round.`
        }
    } else {
        return `This round is invalid, a choice was incorrect. You chose ${user.toUpperCase()} and the ai chose ${ai.toUpperCase()}. Please replay the round.`
    }
}

// Update state of the game graphically
const updateState = () => {
    document.getElementById("displayRound").innerHTML = roundNumber;
    document.getElementById("yourScore").innerHTML = userScore;
    document.getElementById("aiScore").innerHTML = aiScore;
    document.getElementById('displayRound').parentElement.style.fontSize = '2rem';
    // Styling the victory for easier identification
    if (userScore > aiScore) {
        document.getElementById('yourScore').parentElement.style.fontSize = '1rem'
        document.getElementById('yourScore').parentElement.style.color = 'green'
        document.getElementById('yourScore').parentElement.style.border = 'green solid 2px'
        document.getElementById('yourScore').parentElement.style.padding = '1rem'
        document.getElementById('aiScore').parentElement.style.fontSize = '1rem'
        document.getElementById('aiScore').parentElement.style.color = 'red'
        document.getElementById('aiScore').parentElement.style.border = 'red solid 2px'
        document.getElementById('aiScore').parentElement.style.padding = '1rem'
    } else if (aiScore > userScore) {
        document.getElementById('aiScore').parentElement.style.fontSize = '1rem'
        document.getElementById('aiScore').parentElement.style.color = 'green'
        document.getElementById('aiScore').parentElement.style.border = 'green solid 2px'
        document.getElementById('aiScore').parentElement.style.padding = '1rem'
        document.getElementById('yourScore').parentElement.style.fontSize = '1rem'
        document.getElementById('yourScore').parentElement.style.color = 'red'
        document.getElementById('yourScore').parentElement.style.border = 'red solid 2px'
        document.getElementById('yourScore').parentElement.style.padding = '1rem'
    } else {
        document.getElementById('aiScore').parentElement.style.fontSize = '1rem'
        document.getElementById('aiScore').parentElement.style.color = 'green'
        document.getElementById('aiScore').parentElement.style.border = 'green solid 2px'
        document.getElementById('aiScore').parentElement.style.padding = '1rem'
        document.getElementById('yourScore').parentElement.style.fontSize = '1rem'
        document.getElementById('yourScore').parentElement.style.color = 'green'
        document.getElementById('yourScore').parentElement.style.border = 'green solid 2px'
        document.getElementById('yourScore').parentElement.style.padding = '1rem'
    }

}

// Code to run when the user clicks the submit button
const submit = () => {
    // Check if the choice has been made
    if (!userChoice) {
        document.getElementById('played').innerHTML = (`<div style="color:red;font-size:2rem;"> Please make a choice. </div>`)
        // Check if there are still rounds left to be played
    } else if (roundNumber < roundsToPlay) {
        // delete content on div
        document.getElementById('played').innerHTML = null;
        // get user choice
        userChoice = getUserChoice(userChoice);
        // get ai choice
        aiChoice = getComputerChoice();

        document.getElementById('played').innerHTML = (`${determineRoundWinner(userChoice,aiChoice)}`)
        updateState();
    } else {
        if (gameFinished) {
            document.getElementById('played').innerHTML = (`You already played all the rounds. <br><br>The game has ended. <br><br> The score is ${userScore} for you and ${aiScore} for the AI.`)
        }
    }
    if (roundsToPlay > roundNumber) {
        document.getElementById(
            "enquiry"
        ).innerText = `What do you choose for round ${roundNumber + 1}?`;
    } else {
        gameFinished = true;
    }
    if (roundNumber === 1) {
        document.getElementById('played').style.border = 'blue solid 2px;'
    }

}

const waitForRounds = () => {
    if (typeof roundsToPlay !== "undefined") {
        if (roundsToPlay === 1) {
            document.getElementById(
                "roundHeader"
            ).innerText = `Lets play ${roundsToPlay} round of Rock, Paper, Scissors`;
        } else {
            document.getElementById(
                "roundHeader"
            ).innerText = `Lets play ${roundsToPlay} rounds of Rock, Paper, Scissors`;
        }
    } else {
        setTimeout(waitForRounds, 250);
    }
}



// Prompt for the declaration of the amount of rounds
// while (roundsToPlay <= 0 || roundsToPlay === undefined) {
//     roundsToPlay = prompt("How many rounds do you want to play?", "0");
// }
let roundsToPlay;
let userScore = 0;
let aiScore = 0;
let userChoice;
let aiChoice;
let roundNumber = 0;
let gameFinished = false;
