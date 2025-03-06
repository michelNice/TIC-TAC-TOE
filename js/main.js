// Variáveis de controle do jogo
let winner = false; // Indica se há um vencedor
let actualPlayer = 'X'; // Define quem joga primeiro
let xWins = 0; // Contador de vitórias do X
let oWins = 0; // Contador de vitórias do O

// Representação da grade do jogo
let gameStart = ["", "", "", "", "", "", "", "", ""];

// Condições de vitória (combinações vencedoras)
let winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

// Seleção de elementos do DOM
const resultText = document.querySelector('.result h2'); // Exibe quem joga ou quem venceu
const squares = document.querySelectorAll('.square'); // Todos os quadrados do jogo
const xWinsText = document.querySelector('.result p:nth-of-type(1)'); // Placar do X
const oWinsText = document.querySelector('.result p:nth-of-type(2)'); // Placar do O
const resetButton = document.querySelector('.result button'); // Botão de reinício

// Função para verificar o resultado após cada jogada
const handleResult = function() {
    for (let [a, b, c] of winningConditions) {
        // Se os três quadrados possuem o mesmo valor e não estão vazios, há um vencedor
        if (gameStart[a] && gameStart[a] === gameStart[b] && gameStart[a] === gameStart[c]) {
            winner = true;
            resultText.textContent = `Player ${gameStart[a]} wins!`;

            // Atualiza o placar
            if (gameStart[a] === 'X') {
                xWins++;
            } else {
                oWins++;
            }

            // Exibe o novo placar
            xWinsText.textContent = `X wins: ${xWins}`;
            oWinsText.textContent = `O wins: ${oWins}`;

            return; // Encerra a verificação se houver vencedor
        }
    }

    // Caso todos os quadrados estejam preenchidos e não haja vencedor, é um empate
    if (!gameStart.includes("") && !winner) {
        resultText.textContent = "It's a draw!";
    }
};

// Função para reiniciar o jogo
const resetGame = () => {
    gameStart.fill(""); // Limpa o array que representa a grade do jogo
    winner = false; // Reseta o status de vencedor
    actualPlayer = "X"; // Define X como o primeiro jogador novamente
    resultText.textContent = "Player X's turn"; // Atualiza o texto

    // Limpa a interface do jogo
    squares.forEach(square => square.textContent = "");
};

// Adiciona um evento de clique para cada quadrado
squares.forEach((square, index) => {
    square.addEventListener('click', () => {
        // Se o quadrado já estiver preenchido ou já houver um vencedor, não faz nada
        if (gameStart[index] || winner) return;

        // Marca a jogada do jogador atual
        gameStart[index] = actualPlayer;
        square.textContent = actualPlayer;

        // Verifica se houve um vencedor ou empate
        handleResult();

        // Se ainda não houver vencedor, alterna o jogador
        if (!winner) {
            actualPlayer = actualPlayer === 'X' ? 'O' : 'X';
            resultText.textContent = `Player ${actualPlayer}'s turn`;
        }
    });
});

// Adiciona um evento ao botão de reset
resetButton.addEventListener('click', resetGame);
