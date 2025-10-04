const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast is a useful skill in the digital world.",
  "Practice makes perfect, especially with typing.",
  "JavaScript is fun when you understand the basics.",
  "Accuracy is more important than speed at first."
];

let currentQuote = '';
let timer = 0;
let interval = null;
let isRunning = false;

const quoteEl = document.getElementById('quote');
const inputEl = document.getElementById('input');
const timeEl = document.getElementById('time');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function startTest() {
  currentQuote = getRandomQuote();
  quoteEl.textContent = currentQuote;
  inputEl.disabled = false;
  inputEl.value = '';
  inputEl.focus();

  timer = 0;
  timeEl.textContent = '0';
  wpmEl.textContent = '0';
  accuracyEl.textContent = '0';

  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    timeEl.textContent = timer;
  }, 1000);

  isRunning = true;
}

function resetTest() {
  clearInterval(interval);
  isRunning = false;
  timer = 0;

  quoteEl.textContent = 'Click "Start" to begin...';
  inputEl.value = '';
  inputEl.disabled = true;
  timeEl.textContent = '0';
  wpmEl.textContent = '0';
  accuracyEl.textContent = '0';
}

inputEl.addEventListener('input', () => {
  if (!isRunning) return;

  const userText = inputEl.value;
  const quoteText = currentQuote;

  if (userText === quoteText) {
    clearInterval(interval);
    isRunning = false;

    const words = quoteText.split(' ').length;
    const minutes = timer / 60;
    const wpm = Math.round(words / minutes);
    const correctChars = getCorrectCharacters(userText, quoteText);
    const accuracy = Math.round((correctChars / quoteText.length) * 100);

    wpmEl.textContent = isFinite(wpm) ? wpm : '0';
    accuracyEl.textContent = accuracy;
  }
});

function getCorrectCharacters(userInput, quote) {
  let correct = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === quote[i]) {
      correct++;
    }
  }
  return correct;
}
