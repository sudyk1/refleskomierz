const start = document.getElementById("play");
const stop = document.getElementById("play1");
const clicks = document.getElementById("clicks");
const tries = document.getElementById("triesSelector");
const clickValue = document.getElementById("clicksGame");
const stats = document.getElementById("statistics");
const shortestTime = document.getElementById("shortest-time");
const averageTime = document.getElementById("average-time");
const longestTime = document.getElementById("longest-time");
const bestTime = document.getElementById("best");
const bestTimeValue = document.getElementById("shortest-time-session");

const clickArea = document.getElementById("clickarea");

const scoreHistory = [];
let numberOfGames = 5;

let GameStatus = 0;

const MINIMUM_MS_TILL_CHANGE = 2000;
const MAXIMUM_MS_TILL_CHANGE = 5000;

let waitingForClick = false;

let gameCounter = 0;

let currentBest = Infinity;

start.addEventListener("click", () => {
  numberOfGames = parseInt(document.getElementById("numberOfGames").value);
  start_game();
});

stop.addEventListener("click", () => {
  end_game();
});

function randomTime(min, max) {
  const msTillChange = Math.floor(Math.random() * (max - min)) + min;
  return msTillChange;
}

function start_game() {
  scoreHistory.splice(0, scoreHistory.length);
  stats.classList.add("hidden");
  clicks.classList.add("hidden");
  start.classList.add("invisible");
  stop.classList.remove("invisible");
  tries.classList.add("invisible");
  gameCounter = 0;
  GameStatus = 1;
  timeout1_function();
}

function end_game() {
  GameStatus = 0;
  start.classList.remove("invisible");
  stop.classList.add("invisible");
  clearTimeout(timeoutId);
  clickArea.classList.add("ca-grey");
  tries.classList.remove("invisible");

  currentBest = calculateBestTime(currentBest, scoreHistory);
  bestTimeValue.innerHTML = calculateBestTime(currentBest, scoreHistory);
}

function timeout1_function() {
  timeoutId = setTimeout(function () {
    clickArea.classList.remove("ca-grey");
    clickArea.classList.add("ca-green");
    clickArea.innerHTML = "";
    time_now = Date.now();
    waitingForClick = true;

    clickArea.addEventListener("click", function () {
      if (waitingForClick) {
        time_click = Date.now();
        score = time_click - time_now;
        waitingForClick = false;

        addScore(score);
        stats.classList.remove("hidden");
        bestTime.classList.remove("hidden");
        clicks.classList.remove("hidden");
        clickArea.classList.add("ca-grey");
        clickArea.classList.remove("ca-green");

        shortestTime.innerHTML = minScore(scoreHistory);
        longestTime.innerHTML = maxScore(scoreHistory);
        averageTime.innerHTML = averageScore(scoreHistory);
        gameCounter++;
        clickValue.innerHTML = gameCounter;

        if (gameCounter === numberOfGames) {
          end_game();
        } else {
          timeout1_function();
        }
      }
    });
  }, randomTime(MINIMUM_MS_TILL_CHANGE, MAXIMUM_MS_TILL_CHANGE));
}

function addScore(score) {
  scoreHistory.unshift(score);

  for (let i = 0; i < Math.min(scoreHistory.length, numberOfGames); i++) {
    const score = scoreHistory[i];
  }
}

function averageScore(arr) {
  var average = 0;
  for (let index = 0; index < arr.length; index++) {
    average = average + arr[index];
  }
  return Math.round((average / arr.length) * 100) / 100;
}

function minScore(arr) {
  var min = arr[0];
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] <= min) {
      min = arr[index];
    }
  }
  return min;
}

function maxScore(arr) {
  var max = arr[0];
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] >= max) {
      max = arr[index];
    }
  }
  return max;
}

function clearArray(arr) {
  for (let index = arr.length - 1; index >= 0; index--) {
    arr[index].remove;
  }
}

function calculateBestTime(currentBest, arr) {
  if (arr.length === 0) {
    return currentBest;
  }
  if (currentBest <= minScore(arr)) {
    return currentBest;
  } else {
    return minScore(arr);
  }
}
