const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let optinons = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializedGame();

function initializedGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running  = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(optinons[cellIndex] != "" || !running){
        return;
    }

    updateCell(this,cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    optinons[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}; 

function checkWinner(){
    let roundWon = false;
    for(let i = 0 ; i< winCondition.length; i++){
        const condition = winCondition[i];
        const cellA = optinons[condition[0]];
        const cellB = optinons[condition[1]];
        const cellC = optinons[condition[2]];

        if(cellA == ""||cellB == ""||cellC == ""){
            continue;
        }

        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if(!optinons.includes("")){
        statusText.textContent = `Draw !`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    optinons = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;

}