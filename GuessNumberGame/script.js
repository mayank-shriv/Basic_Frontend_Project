document.addEventListener('DOMContentLoaded', () => {
  let randomNumber = generateRandomNumber();

  const submit = document.querySelector('#subt');
  const userInput = document.querySelector('#guessField');
  const guessSlot = document.querySelector('.guesses');
  const remaining = document.querySelector('.lastResult');
  const lowOrHi = document.querySelector('.lowOrHi');
  const newGameContainer = document.querySelector('#new-game-container');
  const newGameButton = document.querySelector('#newGame');

  let prevGuesses = [];
  let numGuessesRemaining = 10;
  let playGame = true;

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    if (!playGame) return;

    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function validateGuess(guess) {
    if (isNaN(guess)) {
      displayMessage('Please enter a valid number', 'too-high');
    } else if (guess < 1 || guess > 100) {
      displayMessage('Number must be between 1 and 100', 'too-high');
    } else {
      prevGuesses.push(guess);
      numGuessesRemaining--;

      checkGuess(guess);
      displayGuess(guess);

      if (numGuessesRemaining <= 3 && numGuessesRemaining > 0) {
        remaining.classList.add('pulse');
      } else {
        remaining.classList.remove('pulse');
      }

      if (guess === randomNumber) {
        endGame(true);
      } else if (numGuessesRemaining === 0) {
        endGame(false);
      }
    }
  }

  function checkGuess(guess) {
    if (guess === randomNumber) {
      displayMessage(`BINGO! ${guess} is correct!`, 'success');
    } else if (guess < randomNumber) {
      displayMessage('TOO LOW! Try a higher number.', 'too-low');
    } else if (guess > randomNumber) {
      displayMessage('TOO HIGH! Try a lower number.', 'too-high');
    }
  }

  function displayGuess(guess) {
    userInput.value = '';
    const guessElement = document.createElement('span');
    guessElement.classList.add('guess-box');
    guessElement.textContent = guess;
    guessSlot.appendChild(guessElement);
    remaining.textContent = numGuessesRemaining;
  }

  function displayMessage(message, type = '') {
    lowOrHi.innerHTML = `<h2 class="${type}">${message}</h2>`;
  }

  function endGame(won) {
    playGame = false;
    userInput.value = '';
    userInput.setAttribute('disabled', '');

    if (!won) {
      displayMessage(`GAME OVER! The number was ${randomNumber}`, 'too-high');
    }

    newGameContainer.classList.remove('hidden');
    setupNewGame();
  }

  function setupNewGame() {
    newGameButton.addEventListener('click', function handler() {
      // Reset game state
      randomNumber = generateRandomNumber();
      prevGuesses = [];
      numGuessesRemaining = 10;

      // UI Reset
      guessSlot.innerHTML = '';
      remaining.textContent = numGuessesRemaining;
      userInput.removeAttribute('disabled');
      lowOrHi.innerHTML = '';
      newGameContainer.classList.add('hidden');

      playGame = true;

      // Focus input
      userInput.focus();

      // Remove listener itself
      newGameButton.removeEventListener('click', handler);
    });
  }

  function displayMessage(message, type = '') {
    lowOrHi.innerHTML = `<h2 class="${type}">${message}</h2>`;
  }
});
