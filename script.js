"use strict";

// selecting elements
const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let score;
let playing;
let activePlayer;
let finalScore;

const init = function () {
  score = 0;
  playing = true;
  activePlayer = 0;
  finalScore = [0, 0];

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  score = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

// rolling dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    let diceNumber = Number(Math.trunc(Math.random() * 6) + 1);
    dice.classList.remove("hidden");
    dice.src = `dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      score += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent = score;
    } else {
      switchPlayer();
    }
  }
});

// holding the score
btnHold.addEventListener("click", function () {
  if (playing) {
    finalScore[activePlayer] += score;
    document.getElementById(`score--${activePlayer}`).textContent =
      finalScore[activePlayer];
    if (finalScore[activePlayer] >= 20) {
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

// reseting the game
btnNew.addEventListener("click", init);
