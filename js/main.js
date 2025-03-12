
let winner = false; 
let actualPlayer = 'X'; 
let xWins = 0; // 
let oWins = 0;


let gameStart = ["", "", "", "", "", "", "", "", ""];


let winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];


const resultText = document.querySelector('.result h2'); 
const squares = document.querySelectorAll('.square'); 
const xWinsText = document.querySelector('.result p:nth-of-type(1)'); 
const oWinsText = document.querySelector('.result p:nth-of-type(2)'); 
const resetButton = document.querySelector('.result button');


const handleResult = function() {
    for (let [a, b, c] of winningConditions) {
        
        if (gameStart[a] && gameStart[a] === gameStart[b] && gameStart[a] === gameStart[c]) {
            winner = true;
            resultText.textContent = `Player ${gameStart[a]} wins!`;

        
            if (gameStart[a] === 'X') {
                xWins++;
            } else {
                oWins++;
            }

        
            xWinsText.textContent = `X wins: ${xWins}`;
            oWinsText.textContent = `O wins: ${oWins}`;

            return; 
        }
    }

    
    if (!gameStart.includes("") && !winner) {
        resultText.textContent = "It's a draw!";
    }
};


const resetGame = () => {
    gameStart.fill(""); 

    winner = false;

    actualPlayer = "X"; 

    resultText.textContent = "Player X's turn"; 

    squares.forEach(square => square.textContent = "");
};


squares.forEach((square, index) => {

    square.addEventListener('click', () => {
       
        if (gameStart[index] || winner) return;

      
        gameStart[index] = actualPlayer;
        square.textContent = actualPlayer;

       
        handleResult();

        if (!winner) {

            actualPlayer = actualPlayer === 'X' ? 'O' : 'X';

            resultText.textContent = `Player ${actualPlayer}'s turn`;
        }
    });
});


resetButton.addEventListener('click', resetGame);



