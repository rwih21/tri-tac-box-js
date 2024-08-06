const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

// To check whether the player wins or not, if the triangle or box is on the right box indexes
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "triangle";
let running = false;

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] !== "" || !running) return;

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    if (currentPlayer === "triangle") {
        cell.classList.add("triangle");
    } else {
        cell.classList.add("box");
    }
    cell.textContent = "";
}

function changePlayer() {
    currentPlayer = currentPlayer === "triangle" ? "box" : "triangle";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let winner = "";

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            winner = options[a];
            break;
        }
    }

    if (winner) {
        statusText.textContent = `${winner} wins!`;
        running = false;
        return;
    }

    if (!options.includes("")) {
        statusText.textContent = "Draw!";
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("triangle", "box");
    });
    currentPlayer = "triangle";
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

initializeGame();
