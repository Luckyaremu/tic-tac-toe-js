/* eslint-disable   import/extensions */
import setPlayers from './players.js';
import gameLogic from './gamelogic.js';


function gameFlow() {
  let allplayers = [];

  const form = document.querySelector('.name-form');
  const table = document.querySelector('.table-container');


  form.submitbtn.addEventListener('click', (e) => {
    e.preventDefault();
    allplayers = setPlayers(allplayers);

    if (allplayers) {
      const node = document.createElement('LI');

      node.innerText = '';
      allplayers.forEach((val) => {
        node.innerText = `${val.name}`;
      });
    }
  });


  let playerCount = 0;
  let player;
  let cellFull = false;
  table.addEventListener('click', (e) => {
    if (gameLogic().ValiditePosition(e)) {
      // set player and run game logic

      player = gameLogic().playerTurn(allplayers, playerCount);
      playerCount += 1;

      if (playerCount === 9) {
        cellFull = true;
      }

      gameLogic().playInto(player, e);

      if (gameLogic().checkWin(player)) {
        const message = `Wow! ${player.name} has won!`;
        gameLogic().spitResult(message);
      } else if (gameLogic().checkTie(cellFull)) {
        const message = 'Well, It looks like it is a tie!';
        gameLogic().spitResult(message);
      }
    }
  });
}

export default gameFlow;
