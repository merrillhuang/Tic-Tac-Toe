let currentSymbol = "X"
let xWins = 0
let oWins = 0
let ties = 0

const xWinsDisplay = document.querySelector("#xWins")
const oWinsDisplay = document.querySelector("#oWins")
const tiesDisplay = document.querySelector("#ties")
const gameHistory = document.querySelector("#gameHistory")
const winnerDisplay = document.querySelector("#winnerDisplay")

const newGameButton = document.querySelector("#newgame").addEventListener("click", newGame)

const squares = document.querySelectorAll(".square")
squares.forEach((square) => {
    square.classList.add("clickable")
    square.addEventListener("click", placeSymbol)
})

const board = document.querySelector("#boardContainer").addEventListener("click", markClicked)

const turnDisplay = document.querySelector("#turnDisplay")

function placeSymbol(e) {
    e.target.innerText = currentSymbol
    changePlayer(currentSymbol)
    checkGameStatus(e.target.innerText)
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
    turnDisplay.innerText = "X goes first!"
    winnerDisplay.innerText = ""
}

function markClicked(e) {
    disableSquare(e.target)
}

function disableSquare(square) {
    square.classList.remove("clickable")
    square.removeEventListener("click", placeSymbol)
}

function checkGameStatus(symbol) {
    if ((squares[0].innerText === symbol && squares[1].innerText === symbol && squares[2].innerText === symbol) ||
    (squares[3].innerText === symbol && squares[4].innerText === symbol && squares[5].innerText === symbol) ||
    (squares[6].innerText === symbol && squares[7].innerText === symbol && squares[8].innerText === symbol) || //rows
    (squares[0].innerText === symbol && squares[3].innerText === symbol && squares[6].innerText === symbol) ||
    (squares[1].innerText === symbol && squares[4].innerText === symbol && squares[7].innerText === symbol) ||
    (squares[2].innerText === symbol && squares[5].innerText === symbol && squares[8].innerText === symbol) || //columns
    (squares[0].innerText === symbol && squares[4].innerText === symbol && squares[8].innerText === symbol) || 
    (squares[2].innerText === symbol && squares[4].innerText === symbol && squares[6].innerText === symbol)    //diangonals
    ){
        winnerDisplay.innerText = (`${symbol} won!`)
        if (symbol === "X") {
            xWins++
        }
        if (symbol === "O") {
            oWins++
        }
        createNewHistoryItem(symbol)
        endGame(symbol)
        return
    }
    let allFilled = true
    squares.forEach((square) => {
        if (square.innerText === "") {
            allFilled = false
        }
    })
    if (allFilled) {
        ties++
        winnerDisplay.innerText = ("It's a tie!")
        createNewHistoryItem("tie")
        endGame()
    }
}

function createNewHistoryItem(symbol) {
    const newHistoryItem = document.createElement("div")
    newHistoryItem.className = "historyItem"
    newHistoryItem.dataset.winner = symbol
    gameHistory.appendChild(newHistoryItem)
    
}

function endGame() {
    squares.forEach(square => disableSquare(square))
    turnDisplay.innerText = "Game Over!"
    xWinsDisplay.innerText = `X: ${xWins} wins`
    oWinsDisplay.innerText = `O: ${oWins} wins`
    tiesDisplay.innerText = `Ties: ${ties}`

    for (let i = 0; i < gameHistory.children.length; i++) {
        if (gameHistory.children[i].dataset.winner === "tie") {
            gameHistory.children[i].innerText = `Game ${i+1}: Tie Game!`
        }
        else {
            gameHistory.children[i].innerText = `Game ${i+1}: ${gameHistory.children[i].dataset.winner} won!`
        }
    }
}