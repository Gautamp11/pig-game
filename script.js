'use strict';

// selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnRules = document.querySelector('.btn--rules');
const rulesEl = document.querySelector('.rules');
const btnClose = document.querySelector('.btn--close');

let currentScore, activePlayer, playing, scores;

const init = function () {
  playing = true;
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

diceEl.classList.add('hidden');

//rolling dice functionality

btnRoll.addEventListener('click', () => {
  if (playing) {
    //generate radom dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for rolled is 1; if true
    if (dice !== 1) {
      //add dice to currentScore
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//holding score
btnHold.addEventListener('click', () => {
  if (playing) {
    //check if player score >100
    if (scores[activePlayer] >= 100) {
      //finish game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //add currentScore to active player score
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

btnRules.addEventListener('click', () => {
  rulesEl.classList.toggle('hidden');
});

btnClose.addEventListener('click', () => {
  rulesEl.classList.toggle('hidden');
});
