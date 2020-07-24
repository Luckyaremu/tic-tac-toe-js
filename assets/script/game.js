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
const tds = document.querySelectorAll('td');
let emptySpots = [];
let ai = false;
let marker = 'X';
let players = '';
let player = allplayer[0];


const winArray = [[1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]];

let pos = 0;

let cellFull = false;
let tie = false;


let counter = 0;

let playerCount = 1;


class Player {
    constructor(name, marker) {
      this.name = name;
      this.marker = marker;
      this.history = [];
    }
  }



class SetGamePlayers{
    constructor(counter){
        this.counter = counter;
    }
    setPlayers(){
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
        return allplayer
    }


}



class playPosition{
    constructor(e){
        this.e = e;
    }

    validatePostion(){
        let res = false;
        if (this.e.target.classList.contains('clicked')) {
            errors.classList.remove('d-none');
            errors.innerText = 'That position is taken!';
            res = true;
        }
        return res;
    }

    playerTurn(allplayer) {
        playerCount % 2 === 0 ? player = allplayer[0] : player = allplayer[1];
        playerCount += 1;
      
        if (playerCount === 10) {
          cellFull = true;
        }
        return player;
      }

      checkWin( player) {
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
        messages.innerText = message;
        cards.classList.remove('d-none');
        content.classList.remove('d-none');
        content.classList.add('bg-blur');
      }

      checkTie(cellFull) {
        if (cellFull) {
          tie = true;
        }
        return tie;
      }

      clickPos(pos, etype) {
        const evObj = document.createEvent('Events');
        console.log("clicked")
        evObj.initEvent(etype, true, false);
        return pos.dispatchEvent(evObj);
      }
      

    playIn(){
        if(!this.validatePostion()){
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

           
            playerturn.innerHTML = `${player.name} Turn!`;
            player.history.push(this.e.target.id);

            if (this.checkWin(player)) {
                const message = `Wow! ${player.name} has won!`;
                this.spitResult(message);
              } else if (this.checkTie(cellFull)) {
                const message = 'Well, It looks like it is a tie!';
                this.spitResult(message);
              }
        }
        if (ai && player.name === 'AI' && !this.checkWin(player)) {
            this.clickPos(document.getElementById(pos), 'click');
          }

    }
}

form.submitbtn.addEventListener('click', (e) => {
    e.preventDefault();
    new SetGamePlayers(counter).setPlayers(); 
});

table.addEventListener('click', (e) => {
    new playPosition(e).playIn();
})

aibtn.addEventListener('click', () => {
    form.inputspace.value = 'AI';
  });
  

