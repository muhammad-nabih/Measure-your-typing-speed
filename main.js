// Select Elements
const selectElement = document.getElementById("levels"); // Select the level dropdown
const spanLevel = document.querySelector("span.lvl"); // Select the level display
const spanSeconds = document.querySelector("span.seconds"); // Select the time display
const input = document.querySelector("input.input"); // Select the input field
const buttonStart = document.querySelector("button.start"); // Select the start button
const time = document.querySelector("p.time span"); // Select the time remaining display
const score = document.querySelector("p.score .got"); // Select the current score
const total = document.querySelector("p.score .total"); // Select the total possible score
const wordsElement = document.querySelector("p.upcoming-words"); // Select the container for upcoming words
const theWord = document.querySelector(".the-word"); // Select the current target word display
const finish = document.querySelector(".finish"); // Select the game finish message display
const container = document.querySelector("div.container");

// Ensure the select element is unselected when the page loads
document.addEventListener(
  "DOMContentLoaded",
  () => (selectElement.selectedIndex = -1)
);

// Initialize variables
let level;

// Level Properties
const levelObject = {
  hardSeconds: 3,
  normalSeconds: 4,
  easySeconds: 5,
};
const { hardSeconds, normalSeconds, easySeconds } = levelObject;

// Function to reset the score to 0
function resetScore() {
  score.textContent = "0";
}

// Handle level and time changes when the select element is changed
selectElement.onchange = (e) => {
  selectElement.setAttribute("disabled", "true");
  // Show the start button
  buttonStart.style.display = "block";

  // Focus on the start button
  buttonStart.focus();

  // Clear existing words
  wordsElement.innerHTML = "";
  level = e.target.value;
  spanLevel.textContent = level;
  buttonStart.disabled = false;

  // Define the available words
  let words = [
    "apple",
    "banana",
    "cherry",
    "date",
    "eggplant",
    "fig",
    "grapefruit",
    "honeydew",
    "icicle",
    "jaguar",
    "kiwi",
    "lemon",
    "mango",
    "nectarine",
    "olive",
    "papaya",
    "quince",
    "raspberry",
    "strawberry",
    "tangerine",
    "umbrella",
    "vanilla",
    "watermelon",
    "xylophone",
    "yellow",
    "zebra",
    "cat",
    "dog",
    "hat",
  ];
  // Set the time and filter words based on the selected level
  switch (level) {
    case "Easy":
      spanSeconds.textContent = easySeconds;
      words = words.filter((word) => word.length < 5);
      break;
    case "Normal":
      spanSeconds.textContent = normalSeconds;
      words = words.filter((word) => word.length > 4 && word.length < 7);
      break;
    case "Hard":
      spanSeconds.textContent = hardSeconds;
      words = words.filter((word) => word.length >= 7);
      break;
    default:
      break;
  }

  total.textContent = words.length;
  buttonStart.style.display = "block";
  time.textContent = spanSeconds.textContent;
  createRandomWord(words);
  createWordsElement(words);
  finish.textContent = "";

  input.addEventListener("input", (e) => {
    const inputValue = e.target.value;
    if (inputValue.toLowerCase() === theWord.textContent.toLowerCase()) {
      score.textContent++;
      words.splice(words.indexOf(theWord.textContent), 1); // Remove the current word from the array
      input.value = "";
      time.textContent = spanSeconds.textContent;
      if (score.textContent === total.textContent) {
        container.innerHTML = "";
        finish.textContent =
          "Congratulations🥳 You Passed: " + level + " Level";

        enableInput();
        refreshPage();
      } else {
        createRandomWord(words);
      }
    }
  });

  // Reset the score when changing the level
  resetScore();
};

// Add words to the page
function createWordsElement(wordsEle) {
  wordsEle.forEach((element) => {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(element));
    wordsElement.appendChild(div);
  });
}

// Create a random word from the array and display it
function createRandomWord(wordsEle) {
  const randomWord = wordsEle[Math.floor(Math.random() * wordsEle.length)];
  theWord.textContent = randomWord;
  return randomWord;
}

// Handle the start button click
buttonStart.addEventListener("click", () => {
  input.removeAttribute("readonly");
  input.focus();
  buttonStart.style.display = "none";
  timerDownStart();
});

// Start the countdown timer
function timerDownStart() {
  const timerDown = setInterval(() => {
    time.textContent--;
    if (time.textContent === "0") {
      clearInterval(timerDown);
      container.innerHTML = "";
      finish.textContent = "Game Over 😔";
      enableInput();
      refreshPage();
    } else if (finish.textContent != "") {
      clearInterval(timerDown);
      enableInput();
    }
  }, 1000);
  return timerDown;
}

function enableInput() {
  input.value = "";
  input.setAttribute("readonly", true);
}
enableInput();

function refreshPage() {
  setTimeout(() => {
    location.reload();
  }, 2000);
}
