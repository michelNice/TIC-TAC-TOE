let winner = false;
let actualPlayer = 'X';

let gameStart = ["", "", "", "", "", "", "", "", ""];

let winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

const handleResult = () => {
    for (let [a, b, c] of winningConditions) {
        if (gameStart[a] && gameStart[a] === gameStart[b] && gameStart[a] === gameStart[c]) {
            winner = true;
            alert(`Player ${gameStart[a]} wins!`);
            return;
        }
    }

    if (!gameStart.includes("") && !winner) alert("It's a draw!");
};

const resetGame = () => {
    gameStart.fill("");
    winner = false;
    actualPlayer = "X";

    document.querySelectorAll('.square').forEach(square => square.textContent = "");
};

document.querySelectorAll('.square').forEach((square, index) => {
    square.addEventListener('click', () => {
        if (gameStart[index] || winner) return;

        gameStart[index] = actualPlayer;
        square.textContent = actualPlayer;

        handleResult();
        if (!winner) actualPlayer = actualPlayer === 'X' ? 'O' : 'X';
    });
});
