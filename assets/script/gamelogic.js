/* eslint-disable   import/extensions */
function gameboard() {
  return {
    winArray: [[1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]],

    cellFull: false,

    gameBoard: ['', '', '', '', '', '', '', '', ''],

    ValiditePosition(e) {
      const errors = document.querySelector('.errors');
      let res = true;

      if (e.target.classList.contains('clicked')) {
        errors.classList.remove('d-none');
        errors.innerText = 'That position is taken!';
        res = false;
      } else {
        errors.classList.add('d-none');
      }
      return res;
    },

    playerTurn(allplayers, playerCount) {
      return playerCount % 2 === 0 ? allplayers[0] : allplayers[1];
    },

    playInto(player, e) {
      e.target.innerText = player.marker;
      this.gameBoard[e.target.id - 1] = player.marker;
      player.history.push(e.target.id);
      e.target.classList.add('clicked');
    },

    checkWin(player) {
      let won = false;
      this.winArray.forEach((win) => {
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
    },

    spitResult(message) {
      const content = document.querySelector('.content');
      const cards = document.querySelector('.card');
      const messages = document.querySelector('.messages');
      messages.innerText = message;
      cards.classList.remove('d-none');
      content.classList.remove('d-none');
      content.classList.add('bg-blur');
    },

    checkTie(cellFull) {
      let tie = false;
      if (cellFull) {
        tie = true;
      }
      return tie;
    },
  };
}


export default gameboard;