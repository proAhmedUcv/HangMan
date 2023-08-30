const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const guessesText = document.querySelector(".guesses-text b");
const wordDisplay = document.querySelector(".word-display");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord,
  correctLetters = [],
  wrongGuessCount = 0;
const maxGuesses = 6;

const resetGame = () => {
  // reseting all game variables and UI elements
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = "images/hangman-" + wrongGuessCount + ".svg";
  guessesText.innerText = wrongGuessCount + " / " + maxGuesses;
  keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => '<li class="letter"></li>')
    .join("");
    gameModal.classList.remove("show");
};

const getRandomWord = () => {
  // selecting a random word and hint from the wordList
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  // console.log(word);
  currentWord = word;
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory
      ? "You found the word: "
      : "The correct word was: ";
    // if (isVictory == "victory") {
    //   gameModal.querySelector("img").src = "images/lost.gif";
    // } else {
    //   gameModal.querySelector("img").src = "images/victory.gif";
    // }
    //  gameModal.querySelector("img").src = 'images/' + isVictory + '.gif' ? 'victory' : 'lost';
    gameModal.querySelector("img").src = 'images/' + (isVictory ? 'victory' : 'lost') + '.gif';
    gameModal.querySelector("h4").innerText = isVictory
      ? "Congrats!"
      : "Game Over!";
    gameModal.querySelector("p").innerHTML =
      modalText + "<b>" + currentWord + "</b>";
    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  // checking if clickedLetter is exist on the currentWord
  if (currentWord.includes(clickedLetter)) {
    // showing all correct letters on the word display
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    // if clicked letter does not exist then update the wrongGuessCount and hangman image
    wrongGuessCount++;
    hangmanImage.src = "images/hangman-" + wrongGuessCount + ".svg";
  }
  button.disabled = true;
  guessesText.innerText = wrongGuessCount + " / " + maxGuesses;

  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

// create keyboard button
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord);
