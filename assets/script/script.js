let table = document.querySelector('.table-container');
const form = document.querySelector('.name-form');
const errors = document.querySelector('.errors');
let all_player = [];
const messages = document.querySelector('.messages');
const cards = document.querySelector('.card');
const content = document.querySelector('.content');
const formInput = document.querySelector('.form-inputs');
const playerlist = document.querySelector('.playerlist');
const playerturn = document.querySelector('.playerturn');
const aibtn = document.querySelector('.ai');
let ai = false;



let cellFull = false;
let counter = 0;
let winArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
let playerCount = 0;
let player = all_player[0];


function playerTurn(all_player){
 
    playerCount % 2 ===0 ? player = all_player[0] : player = all_player[1];
    playerCount++;
       
    if(playerCount == 9){
        cellFull =true;
    }
    return player;
}

aibtn.addEventListener('click', function(){
    form.inputspace.value = "AI";
})

function playGame(){
    if(counter <= 1){
      
        if(counter == 0){
        marker = "X"
        aibtn.classList.remove('d-none');
        }else{
        marker = "0"
        if(form.inputspace.value === "AI"){
            ai=true;
        }
        }
        players = new Player(`${form.inputspace.value}`, marker);
        counter++;



        all_player.push(players);
        let node = document.createElement('LI');
        node.innerText = `${players.name}`
        playerlist.appendChild(node);
        playerlist.classList.remove('d-none')
        form.inputspace.value = ""
        if(counter >= 2){
            formInput.classList.add('d-none');
            table.classList.remove('d-none')
        }
    }else{
        errors.innerText = "Maximum number of users reached!"
    }
}

table.addEventListener('click', function(e){
    playerTurn(all_player);
    playerturn.innerHTML = `${player.name} Turn!`
    e.target.innerText = player.marker;
  
    player.history.push(e.target.id) ;
    
    if (checkWin(winArray, player)){
       
        messages.innerText = `Wow! ${player.name} has won!`
        cards.classList.remove('d-none');
        content.classList.remove("d-none")
        content.classList.add('bg-blur');
        
    }else if(cellFull == true){
        messages.innerText = "Well, It looks like it is a tie!"
    }
});

form.submitbtn.addEventListener('click', function(e){
    e.preventDefault();
    playGame();
   
});

let Player = function (name, marker){
    this.name = name,
    this.marker = marker,
    this.history = [];
}


function checkWin(wins = winArray , player){
    
    let won = false;
    wins.forEach( function(win){
        let winCounter = 0;
        win.forEach( function(win2){
            if(player.history.includes(win2.toString())) {
                winCounter++
               
                
         
                if(winCounter ===3){
                     won = true;      
                }
                
            }
           return;
        }); 
      
    });
    return won;
}