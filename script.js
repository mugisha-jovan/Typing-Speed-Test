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
let startBtn = null;
let stopBtn = null;
let resetBtn = null;

const quoteEl = document.getElementById('quote');
const inputEl = document.getElementById('input');
const timeEl = document.getElementById('time');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');

// Button elements will be resolved on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  startBtn = document.getElementById('startBtn');
  stopBtn = document.getElementById('stopBtn');
  resetBtn = document.getElementById('resetBtn');
});

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
  if (startBtn) startBtn.disabled = true;
  if (stopBtn) stopBtn.disabled = false;
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
  if (startBtn) startBtn.disabled = false;
  if (stopBtn) stopBtn.disabled = true;
}

inputEl.addEventListener('input', () => {
  if (!isRunning) return;

  const userText = inputEl.value;
  const quoteText = currentQuote;

  if (userText === quoteText) {
    // User finished typing the quote exactly
    endTest();
  }
});

function stopTest() {
  if (!isRunning) return;
  endTest();
}

function endTest() {
  clearInterval(interval);
  isRunning = false;
  inputEl.disabled = true;

  // Compute stats and display
  const stats = computeStats(inputEl.value, currentQuote, timer);
  wpmEl.textContent = stats.wpm;
  accuracyEl.textContent = stats.accuracy;

  if (startBtn) startBtn.disabled = false;
  if (stopBtn) stopBtn.disabled = true;
}

function computeStats(userText, quoteText, elapsedSeconds) {
  // Words typed is counted using spaces in the quote (target words)
  const words = quoteText.trim().length ? quoteText.trim().split(/\s+/).length : 0;
  const minutes = elapsedSeconds / 60;
  const wpm = minutes > 0 ? Math.round(words / minutes) : 0;

  const correctChars = getCorrectCharacters(userText, quoteText);
  const accuracy = quoteText.length ? Math.round((correctChars / quoteText.length) * 100) : 0;

  return {
    wpm: isFinite(wpm) ? wpm : 0,
    accuracy: Math.max(0, Math.min(100, accuracy))
  };
}

function getCorrectCharacters(userInput, quote) {
  let correct = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === quote[i]) {
      correct++;
    }
  }
  return correct;
}
