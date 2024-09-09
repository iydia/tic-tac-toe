const grids = document.querySelectorAll(".grid");
const comments = document.querySelector("#comments");
const playAgain = document.querySelector("#playAgainBtn");
const win = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [3, 4, 5],
    [2, 5, 8],
    [6, 7, 8],
    [2, 4, 6]
];
let select = ["", "", "", "", "", "", "", "", ""];
let XO = "X";
let start = false;

startGame();

function startGame() {
    grids.forEach(grid => grid.addEventListener("click", gridClicked));
    playAgain.addEventListener("click", newGame);
    comments.textContent = `${XO}'s turn`;
    start = true;
}

function gridClicked() {
    const i = this.getAttribute("i"); // grab index #
    
    if (select[i] != "" || !start) {
        return;
    }

    updateGrid(this, i);
    checkIfWin();
}

function updateGrid(grid, i) {
    select[i] = XO;
    grid.textContent = XO;
}

function nextMove() {
    if (XO == "X") {
        XO = "O";
    } else {
        XO = "X";
    }
    comments.textContent = `${XO}'s turn`;
}

function checkIfWin() {
    let won = false;

    for (let i = 0; i < win.length; ++i) {
        const arrCombo = win[i]; // grab individual array
        const g1 = select[arrCombo[0]];
        const g2 = select[arrCombo[1]];
        const g3 = select[arrCombo[2]];

        if (g1 == "" || g2 == "" || g3 == "") {
            continue;
        }

        if (g1 == g2 && g1 == g3) {
            won = true;
            break;
        }
    }

    if (won) {
        comments.textContent = `${XO} wins`;
        start = false;
    } else if (!select.includes("")) {
        comments.textContent = `It's a tie!`;
        start = false;
    } else {
        nextMove();
    }
}

function newGame() {
    XO = "X";
    select = ["", "", "", "", "", "", "", "", ""];
    comments.textContent = `${XO}'s turn`;
    grids.forEach(grid => grid.textContent = "");
    start = true;
}