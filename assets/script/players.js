const Player = (name, marker)=>{
  return {
      name,
      marker,
      history: []
  }
  
}

//set players for the game
function setPlayers(allplayers){
  const form = document.querySelector('.name-form');
  let marker;
  allplayers.length <1? marker ="X" : marker = "0";

    //create player
  allplayers.push(Player(form.inputspace.value, marker));
    
    form.inputspace.value = ''
    
    //display player
    if(allplayers){
      const node = document.createElement('LI');
    
      node.innerText = ``;
      allplayers.forEach(function(val){
        node.innerText = `${val.name}`;
      })
      //append players to screen

      const playerlist = document.querySelector('.playerlist');
      playerlist.appendChild(node);
      playerlist.classList.remove('d-none');

      //empty the input field 

      form.inputspace.value = '';

      if (allplayers.length >= 2) {
        const table = document.querySelector('.table-container');
        const playerturn = document.querySelector('.playerturn');
        const formInput = document.querySelector('.form-inputs');
        formInput.classList.add('d-none');
        table.classList.remove('d-none');
        playerturn.innerHTML = `${allplayers[0].name} Turn!`;
      }
    }
    return allplayers;
}


export { setPlayers}