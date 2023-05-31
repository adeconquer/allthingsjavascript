// Game Values
let min = 1,
    max = 10,
    winningNum = getRandNum(min, max),
    guessLeft = 3;

//UL elements
const game = document.querySelector("#game"),
    minNum = document.querySelector(".min-num"),
    maxNum = document.querySelector(".max-num"),
    guessBtn = document.querySelector("#guess-btn"),
    guessInput = document.querySelector("#guess-input"),
    messageNotif = document.querySelector(".message");


//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    //Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, "red")
    }

    //Check if num
    if (guess == winningNum) {
        //Game over Won


        //Disable Input
        // guessInput.disabled = true;
        // Change border color
        // guessInput.style.borderColor = "green";
        // Set Message
        // setMessage(`${winningNum} is correct, YOU WIN!`, "green");
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
        // Wrong Number
        guessLeft -= 1

        if (guessLeft === 0) {
            //game over Lost

            gameOver(false, `Game Over, You Lost. The correct number was ${winningNum}`)
        } else {
            //Game Continues Answer wrong 
            //Change border color
            guessInput.style.borderColor = "red";
            //Clear input
            guessInput.value = '';
            //Tell User
            setMessage(`${guess} is not correct, ${guessLeft} guesses left`, 'red');

        }

    }
});

function setMessage(message, color) {
    messageNotif.style.color = color;
    messageNotif.textContent = message;
}

function gameOver(won, msg) {
    let color;

    won === true ? color = "green" : color = "red"
        //Disable Input
    guessInput.disabled = true;
    // Change Border color
    guessInput.style.borderColor = color
        //set text color
    messageNotif.style.color = color;
    //set message
    setMessage(msg, color);

    // play again
    guessBtn.value = "Play Again";
    guessBtn.className += "play-again"





}

//Get winning number
function getRandNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}