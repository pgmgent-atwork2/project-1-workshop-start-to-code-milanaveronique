import '../styles/main.css';
import { movieList } from './data';

const maxTries = 5;
let triesLeft = maxTries;

const movieEmoji = document.getElementById('movie-emoji');
const movieHint = document.getElementById('movie-hint');

let currentMovie = null;

function initializeGame() {
  if (!movieEmoji || !movieHint) {
    return;
  }
  triesLeft = maxTries;
  movieHint.classList.add('no-display');
  const randomMovie = movieList[Math.floor(Math.random() * movieList.length)];
  if (currentMovie && randomMovie.name === currentMovie.name) {
    return initializeGame();
  }
  currentMovie = randomMovie;
  movieEmoji.textContent = randomMovie.emoji;
  movieHint.textContent = randomMovie.hint;
}

if (movieEmoji && movieHint) {
  initializeGame();
}

const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-guess');
const triesLeftDisplay = document.getElementById('tries-left');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
if (guessInput && submitButton && triesLeftDisplay && modal && modalMessage) {
  submitButton.addEventListener('click', () => {
    const userGuess = guessInput.value.trim().toLowerCase();
    const correctAnswer = currentMovie.name.trim().toLowerCase();

    if (userGuess === correctAnswer || userGuess.includes(correctAnswer)) {
      modalMessage.innerHTML = '<img src="../src/assets/correct.gif" alt="Correct guess"> <p>Congratulations! You guessed the movie!</p>';
      modal.classList.remove('no-display');
      setTimeout(() => {
        modal.classList.add('no-display');
      }, 3000);
      resetGame();
    } else {
      triesLeft--;
      triesLeftDisplay.textContent = `Tries left: ${triesLeft}`;
      guessInput.value = '';
      if (triesLeft === 3 && movieHint) {
        movieHint.classList.remove('no-display');
      }
      if (triesLeft === 0) {
        modalMessage.innerHTML = `<img src="../src/assets/game-over.gif" alt="Game over"> <p>Game over! The correct answer was: <span class="highlight">${currentMovie.name}</span></p>`;
        modal.classList.remove('no-display');
        resetGame();
        setTimeout(() => {
          modal.classList.add('no-display');
        }, 3000);

      } else {
        modalMessage.innerHTML = '<img src="../src/assets/wrong.gif" alt="Wrong guess"> <p>Wrong guess! Try again.</p>';
        modal.classList.remove('no-display');
        setTimeout(() => {
          modal.classList.add('no-display');
        }, 3000);
      }
    }
  });
}

function resetGame() {
  triesLeft = maxTries;
  triesLeftDisplay.textContent = `Tries left: ${triesLeft}`;
  guessInput.value = '';
  movieHint.classList.add('no-display');

  initializeGame();

}

const resetButton = document.getElementById('new-game');
if (resetButton) {
  resetButton.addEventListener('click', resetGame);
}

const closeModalButton = document.getElementById('close-modal');
if (closeModalButton && modal) {
  closeModalButton.addEventListener('click', () => {
    modal.classList.add('no-display');
  });
}

// Copy buttons for tutorial page
const selector = '.tutorial-page pre > code';

function createCopyButton(codeEl) {
  const pre = codeEl.parentElement;
  pre.style.position = pre.style.position || 'relative';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'code-copy-btn';
  btn.setAttribute('aria-label', 'Copy code');
  btn.textContent = 'Copy';

  btn.addEventListener('click', async () => {
    const text = codeEl.innerText.replace(/\u00A0/g, ' ');
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = 'Copied!';
      setTimeout(() => {
        btn.textContent = 'Copy';
      }, 1200);
    } catch (e) {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy'); } catch (err) { }
      document.body.removeChild(area);
    }
  });

  pre.appendChild(btn);
}

function initCopyButtons() {
  const nodes = Array.from(document.querySelectorAll(selector));
  nodes.forEach((code) => {
    const pre = code.parentElement;
    if (!pre) return;
    if (pre.querySelector('.code-copy-btn')) return;
    createCopyButton(code);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCopyButtons);
} else {
  initCopyButtons();
}
