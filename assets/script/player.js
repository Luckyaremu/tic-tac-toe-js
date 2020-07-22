const winArray = [[1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]];

class Player {
  constructor(name, marker) {
    this.name = name;
    this.marker = marker;
    this.history = [];
  }
}

function checkWin(wins = winArray, player) {
  let won = false;
  wins.forEach((win) => {
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


export default Player;
export { checkWin, winArray };