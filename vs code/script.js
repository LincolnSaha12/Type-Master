const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold."
];

let timer;
let startTime;
let currentQuote = "";
let currentIndex = 0;
let totalErrors = 0;
let maxErrorSpeed = 0; // Stores WPM with most errors

document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("input").addEventListener("input", checkInput);

function startGame() {
  currentIndex = 0;
  totalErrors = 0; // Reset errors for each game
  loadNewQuote();
  document.getElementById("input").value = "";
  document.getElementById("input").disabled = false;
  document.getElementById("input").focus();
  document.getElementById("wpm").textContent = 0;
  document.getElementById("max-error-wpm").textContent = 0; // Reset max error WPM
  startTime = new Date().getTime();
  timer = setInterval(updateTime, 1000);
}

function loadNewQuote() {
  currentQuote = quotes[currentIndex];
  document.getElementById("quote").textContent = currentQuote;
}

function updateTime() {
  const currentTime = new Date().getTime();
  const timePassed = Math.floor((currentTime - startTime) / 1000);
  document.getElementById("time").textContent = timePassed;
}

function checkInput() {
  const userInput = document.getElementById("input").value.trim(); // Trim trailing spaces
  let currentErrors = 0;

  // Calculate errors for each character typed
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] !== currentQuote[i]) {
      currentErrors++;
    }
  }

  totalErrors += currentErrors;

  // Check if the entire quote is typed
  if (userInput === currentQuote) {
    clearInterval(timer);
    const timePassed = parseInt(document.getElementById("time").textContent, 10);
    const wordCount = currentQuote.split(" ").length;
    const wpm = Math.round((wordCount / timePassed) * 60);
    document.getElementById("wpm").textContent = wpm;
    document.getElementById("input").disabled = true;

    // Update max error speed if current WPM has more errors
    if (totalErrors > 0 && wpm > maxErrorSpeed) {
      maxErrorSpeed = wpm;
      document.getElementById("max-error-wpm").textContent = maxErrorSpeed;
    }

    // Handle end of quotes or transition to next quote
    currentIndex++;
    if (currentIndex < quotes.length) {
      setTimeout(() => {
        document.getElementById("input").value = "";
        startGame();
      }, 2000);
    } else {
      document.getElementById("quote").textContent = "Well done! You have completed all quotes.";
    }
  }
}
