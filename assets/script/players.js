
let ai = false;

let counter = 0;
let allplayer = [];

class Player {
    constructor(name, marker) {
      this.name = name;
      this.marker = marker;
      this.history = [];
    }
  }
  
  class SetGamePlayers {
    constructor(counter) {
      this.counter = counter;
    }
  
    setPlayers() {
      let marker = 'X';
      let players = '';
      const aibtn = document.querySelector('.ai');
      const form = document.querySelector('.name-form');
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
      const playerlist = document.querySelector('.playerlist');
      playerlist.appendChild(node);
      playerlist.classList.remove('d-none');
      form.inputspace.value = '';
      if (counter >= 2) {
        const table = document.querySelector('.table-container');
        const playerturn = document.querySelector('.playerturn');
        const formInput = document.querySelector('.form-inputs');
        formInput.classList.add('d-none');
        table.classList.remove('d-none');
        playerturn.innerHTML = `${allplayer[0].name} Turn!`;
      }
      return allplayer;
    }
  }

  export {Player, SetGamePlayers, counter, allplayer, ai}