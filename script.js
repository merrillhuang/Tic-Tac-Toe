let currentSymbol = "X"
let xWins = 0
let oWins = 0
let ties = 0

const xWinsDisplay = document.querySelector("#xWins")
const oWinsDisplay = document.querySelector("#oWins")
const tiesDisplay = document.querySelector("#ties")
const gameHistory = document.querySelector("#gameHistory")

if (localStorage.length != 0) {
    xWins = localStorage.getItem("xWins")
    oWins = localStorage.getItem("oWins")
    ties = localStorage.getItem("ties")
    gameHistory.innerHTML = localStorage.getItem("gameHistory")
    updateCounterDisplays()
}

const newGameButton = document.querySelector("#newgame").addEventListener("click", newGame)

const resetHistoryButton = document.querySelector("#resetHistory").addEventListener("click", () => {
    localStorage.clear()
    xWins = 0
    oWins = 0
    ties = 0
    gameHistory.innerHTML = "Game History"
    updateCounterDisplays()
})

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
        setTimeout(() => {
            alert(`${symbol} won!`)
        }, 10)
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
            setTimeout(() => {
                alert("It's a tie!")
            }, 10)
        createNewHistoryItem("tie")
        endGame()
    }
}

function createNewHistoryItem(symbol) {
    const newHistoryItem = document.createElement("div")
    newHistoryItem.className = "historyItem"
    gameHistory.appendChild(newHistoryItem)
    if (symbol === "tie") {
        gameHistory.children[gameHistory.children.length - 1].innerText = `Game ${gameHistory.children.length}: Tie Game!`
    }
    else {
        gameHistory.children[gameHistory.children.length - 1].innerText = `Game ${gameHistory.children.length}: ${symbol} won!`
    }
}

function endGame() {
    squares.forEach(square => disableSquare(square))
    updateCounterDisplays()
    turnDisplay.innerText = "Game Over!"
    saveToLocalStorage()
}

function updateCounterDisplays() {
    xWinsDisplay.innerText = `X: ${xWins} wins`
    oWinsDisplay.innerText = `O: ${oWins} wins`
    tiesDisplay.innerText = `Ties: ${ties}`
}

function saveToLocalStorage() {
    localStorage.setItem("xWins", xWins)
    localStorage.setItem("oWins", oWins)
    localStorage.setItem("ties", ties)
    localStorage.setItem("gameHistory", gameHistory.innerHTML)
}

//To-do, websockets?