console.log("Here!")

let currentSymbol = "X"

const newGameButton = document.querySelector("#newgame").addEventListener("click", newGame)

const squares = document.querySelectorAll(".square")
squares.forEach((square) => {
    square.classList.add("clickable")
    square.addEventListener("click", placeSymbol)
})
    

const turnDisplay = document.querySelector("#turnDisplay")

const board = document.querySelector("#boardContainer").addEventListener("click", clicked)

function placeSymbol(e) {
    e.target.innerText = currentSymbol
    changePlayer(currentSymbol)
}

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
        square.classList.add("clickable")
        square.addEventListener("click", placeSymbol)
    })
    currentSymbol = "X"
    turnDisplay.innerText = ""
}

function clicked(e) {
    e.target.removeEventListener("click", placeSymbol)
    e.target.classList.remove("clickable")
}