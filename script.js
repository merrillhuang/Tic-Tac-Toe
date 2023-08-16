console.log("Here!")

let currentSymbol = "x"

const newGameButton = document.querySelector("#newgame").addEventListener("click", newGame)

const squares = document.querySelectorAll(".square")
squares.forEach((square) => {
    square.addEventListener("click", () => {
        square.innerText = currentSymbol
        changePlayer(currentSymbol)
    })
})

function changePlayer(symbol) {
    if (currentSymbol === "x") {
        currentSymbol = "o"    
    }
    else if (currentSymbol === "o") {
        currentSymbol = "x"
    }
}

function newGame() {
    squares.forEach((square) => {
        square.innerText = ""
    })
}