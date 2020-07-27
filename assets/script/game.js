/* eslint-disable max-classes-per-file */
/* eslint-disable   class-methods-use-this */
/* eslint-disable   no-use-before-define */





let playerCount = 0;

import {Player, SetGamePlayers, counter, allplayer, ai} from './players.js'

let player = allplayer[0];


class PlayInPosition {
  constructor(e) {
    this.e = e;
    this.cellFull = 0;
  }

  validatePostion() {
    const errors = document.querySelector('.errors');
    let res = false;
    if (this.e.target.classList.contains('clicked')) {
      errors.classList.remove('d-none');
      errors.innerText = 'That position is taken!';
      res = true;
    }
    return res;
  }

  playerTurn(allplayer) {
    playerCount += 1;

    if (playerCount === 9) {
      this.cellFull = true;
    }
    return playerCount % 2 === 0 ? allplayer[0] : allplayer[1];
  }

  checkWin(player) {
    const winArray = [[1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]];
    let won = false;
    winArray.forEach((win) => {
      let winCounter = 0;
      win.forEach((win2) => {
        if (player.history.includes(win2.toString())) {
          winCounter += 1;


          if (winCounter === 3) {
            won = true;
          }
        }
      });
    });
    return won;
  }

  spitResult(message) {
    const content = document.querySelector('.content');
    const cards = document.querySelector('.card');
    const messages = document.querySelector('.messages');
    messages.innerText = message;
    cards.classList.remove('d-none');
    content.classList.remove('d-none');
    content.classList.add('bg-blur');
  }

  checkTie(cellFull) {
    let tie = false;
    if (cellFull) {
      tie = true;
    }
    return tie;
  }

  clickPos(pos, etype) {
    const evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    return pos.dispatchEvent(evObj);
  }


  playIn() {
    let pos = 0;
    const tds = document.querySelectorAll('td');
    const errors = document.querySelector('.errors');
    let emptySpots = [];
    if (!this.validatePostion()) {
      player = this.playerTurn(allplayer);

      errors.classList.add('d-none');
      this.e.target.innerText = player.marker;
      this.e.target.classList.add('clicked');

      emptySpots = [];

      tds.forEach((item) => {
        if (item.innerText === '') {
          emptySpots.push(item.id);
        }
      });

      pos = parseInt(emptySpots[0], 10);

      const playerturn = document.querySelector('.playerturn');
      playerturn.innerHTML = `${player.name} Turn!`;
      player.history.push(this.e.target.id);

      if (this.checkWin(player)) {
        const message = `Wow! ${player.name} has won!`;
        this.spitResult(message);
      } else if (this.checkTie(this.cellFull)) {
        const message = 'Well, It looks like it is a tie!';
        this.spitResult(message);
      }
    }
    if (ai && player.name === 'AI' && !this.checkWin(player)) {
      this.clickPos(document.getElementById(pos), 'click');
    }
  }
}





const form = document.querySelector('.name-form');
form.submitbtn.addEventListener('click', (e) => {
  e.preventDefault();
  new SetGamePlayers(counter).setPlayers();

  const table = document.querySelector('.table-container');
  table.addEventListener('click', (e) => {
    new PlayInPosition(e).playIn();
  });

  const aibtn = document.querySelector('.ai');
  aibtn.addEventListener('click', () => {
    form.inputspace.value = 'AI';
  });
});


/* eslint-enable max-classes-per-file */
/* eslint-enable   class-methods-use-this */