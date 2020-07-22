import Player, { checkWin, winArray } from './player.js';

const table = document.querySelector('.table-container');
const form = document.querySelector('.name-form');
const errors = document.querySelector('.errors');
const allplayer = [];
const messages = document.querySelector('.messages');
const cards = document.querySelector('.card');
const content = document.querySelector('.content');
const formInput = document.querySelector('.form-inputs');
const playerlist = document.querySelector('.playerlist');
const playerturn = document.querySelector('.playerturn');
const aibtn = document.querySelector('.ai');
let ai = false;
let marker = 'X';
let players = '';
let player = allplayer[0];

let cellFull = false;
let tie = false;


let counter = 0;

let playerCount = 1;

function spitResult(message) {
  messages.innerText = message;
  cards.classList.remove('d-none');
  content.classList.remove('d-none');
  content.classList.add('bg-blur');
}


function checkTie(cellFull) {
  if (cellFull) {
    tie = true;
  }
  return tie;
}

function playerTurn(allplayer) {
  playerCount % 2 === 0 ? player = allplayer[0] : player = allplayer[1];
  playerCount += 1;

  if (playerCount === 10) {
    cellFull = true;
  }
  return player;
}

aibtn.addEventListener('click', () => {
  form.inputspace.value = 'AI';
});

function setPlayers() {
  if (counter <= 1) {
    if (counter === 0) {
      aibtn.classList.remove('d-none');
    } else {
      marker = '0';
      if (form.inputspace.value === 'AI') {
        ai = true;
      }
    }
    players = new Player(`${form.inputspace.value}`, marker);
    counter += 1;
  }
}

function playGame() {
  setPlayers();
  allplayer.push(players);
  const node = document.createElement('LI');
  node.innerText = `${players.name}`;
  playerlist.appendChild(node);
  playerlist.classList.remove('d-none');
  form.inputspace.value = '';
  if (counter >= 2) {
    formInput.classList.add('d-none');
    table.classList.remove('d-none');
    playerturn.innerHTML = `${allplayer[0].name} Turn!`;
  }
}

table.addEventListener('click', (e) => {
  if (e.target.classList.contains('clicked')) {
    errors.classList.remove('d-none');
    errors.innerText = 'That position is taken!';
  } else {
    player = playerTurn(allplayer);
    errors.classList.add('d-none');
    e.target.innerText = player.marker;
    e.target.classList.add('clicked');

    playerturn.innerHTML = `${player.name} Turn!`;

    player.history.push(e.target.id);


    if (checkWin(winArray, player)) {
      const message = `Wow! ${player.name} has won!`;
      spitResult(message);
    } else if (checkTie(cellFull)) {
      const message = 'Well, It looks like it is a tie!';
      spitResult(message);
    }
  }
});

form.submitbtn.addEventListener('click', (e) => {
  e.preventDefault();
  playGame();
});
