console.log("Here!")

let currentSymbol = "X"

const newGameButton = document.querySelector("#newgame").addEventListener("click", newGame)

const squares = document.querySelectorAll(".square")
squares.forEach((square) => {
    square.addEventListener("click", () => {
        square.innerText = currentSymbol
        changePlayer(currentSymbol)
    })
})

const turnDisplay = document.querySelector("#turnDisplay")

function changePlayer(symbol) {
    if (currentSymbol === "X") {
        currentSymbol = "O"
    }
    else if (currentSymbol === "O") {
        currentSymbol = "X"
    }
    turnDisplay.innerText = `It's ${currentSymbol}'s turn!` 
}

function newGame() {
    squares.forEach((square) => {
        square.innerText = ""
    })
}