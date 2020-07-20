let table = document.querySelector('.table-container');
const form = document.querySelector('.name-form');

const winArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

table.addEventListener('click', function(e){
    console.log(e.target.id)
});

let counter = 0;
form.submitbtn.addEventListener('click', function(e){
    e.preventDefault();
    console.log(form.inputspace.value);
    if(counter == 0){
        marker = "X"
    }else{
        marker = "0"
    }
     new Player(`${form.input.value}`, marker);
     counter++;
});

class Player{
    constructor(name, marker);
    name;
    marker;
}