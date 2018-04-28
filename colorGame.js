// Initialize DOM identifiers and gamestate
const squares = document.querySelectorAll(".square");
const newGame = document.querySelector(".new");
const message = document.querySelector(".message");
const rgb = document.querySelector(".rgb");
const title = document.querySelector(".title");
const modes = document.querySelectorAll(".mode");
const gameState = {
    colorKey: "",
    mode: "hard"
};

/* Generates a array of length n of RGB strings with ramdom colors */
const generateColors = function (n) {
    const colors = [];
    for (var i = 0; i < n; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const cString = `rgb(${r}, ${g}, ${b})`;
        colors.push(cString);
    }
    return colors;
};

/* Fill in the 6 squares with 6 random colors */
const colorSquares = function (colors) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];
    }
};

/* Fill all 6 squares with 'key' color if correct square selected */
const colorSame = function () {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = gameState.colorKey;
    }
};

/* Hides or shows bottom three squares depending on game mode */
const changeDisplay = function () {
    if (gameState.mode === "easy") {
        for(var i = 3; i < squares.length; i++) {
            squares[i].style.display = "none";
        }
    }
    // If back to hard, show those last three
    else {
        for(var i = 3; i < squares.length; i++) {
            squares[i].style.display = "";
        }
    }
};

/* Initialize game by generating random colors, coloring the squares,
   and setting the key to the game */
const initGame = function () {
    var n = gameState.mode === "easy" ? 3 : 6;
    // Change display for easy or hard mode
    changeDisplay();
    const colors = generateColors(n);
    const index = Math.floor(Math.random() * n);
    const key = colors[index];
    gameState.colorKey = key;
    colorSquares(colors);
    rgb.textContent = key;
    newGame.textContent = "New Colors";
    message.textContent = "";
    title.style.background = "steelblue";
};

/* Initialize application by initGame, and creating all our listeners */
const createListeners = (function () {
    // Initialize first game with 6 squares, since its default mode is hard
    initGame();

    // Listener to create a new game
    newGame.addEventListener("click", initGame);

    // Listener for each square for game
    for(var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            if (this.style.background === gameState.colorKey) {
                message.textContent = "Correct!"
                title.style.background = gameState.colorKey;
                newGame.textContent = "Play Again?"
                colorSame();
            }
            else {
                this.style.background = "#232323";
                message.textContent = "Try Again"
            }
        });
    }

    for(var i = 0; i < modes.length; i++) {
        modes[i].addEventListener("click", function () {
            modes[0].classList.remove("selected");
            modes[1].classList.remove("selected");
            this.classList.add("selected");
            gameState.mode = this.textContent === "easy" ? "easy" : "hard";
            initGame();
        });
    }
})();
