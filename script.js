let currentSymbol = "X"
let xWins = 0
let oWins = 0
let ties = 0
let gameCounter = 1

const xWinsDisplay = document.querySelector("#xWins")
const oWinsDisplay = document.querySelector("#oWins")
const tiesDisplay = document.querySelector("#ties")
const gameHistory = document.querySelector("#gameHistory")
const board = document.querySelector("#boardContainer")
const turnDisplay = document.querySelector("#turnDisplay")
let turnDisplayColor = "#5fbef8"
let turnDisplayFontColor = "grey"

if (localStorage.length != 0) {
    xWins = localStorage.getItem("xWins") !== null ? localStorage.getItem("xWins") : xWins
    oWins = localStorage.getItem("oWins") !== null ? localStorage.getItem("oWins") : oWins
    ties = localStorage.getItem("ties") !== null ? localStorage.getItem("ties") : ties
    gameCounter = localStorage.getItem("gameCounter") !== null ? localStorage.getItem("gameCounter") : gameCounter
    gameHistory.innerHTML = localStorage.getItem("gameHistory") !== null ? localStorage.getItem("gameHistory") : gameHistory.innerHTML
    board.innerHTML = localStorage.getItem("boardState") !== null ? localStorage.getItem("boardState").trim() : board.innerHTML
    currentSymbol = localStorage.getItem("currentSymbol") !== null ? localStorage.getItem("currentSymbol") : currentSymbol
    turnDisplay.innerText = localStorage.getItem("turnDisplay") !== null ? localStorage.getItem("turnDisplay") : turnDisplay.innerText
    turnDisplay.style.background = localStorage.getItem("turnDisplayColor") !== null ? localStorage.getItem("turnDisplayColor") : turnDisplayColor
    turnDisplay.style.color = localStorage.getItem("turnDisplayFontColor") !== null ? localStorage.getItem("turnDisplayFontColor") : turnDisplayFontColor
    updateCounterDisplays()
}

const newGameButton = document.querySelector("#newGame").addEventListener("click", newGame)

const resetHistoryButton = document.querySelector("#resetHistory").addEventListener("click", () => {
    localStorage.clear()
    xWins = 0
    oWins = 0
    ties = 0
    gameCounter = 1
    gameHistory.innerHTML = "Game History"
    updateCounterDisplays()
    newGame()
})

const squares = document.querySelectorAll(".square")
squares.forEach((square) => {
    if (square.innerText === "") {
        square.classList.add("clickable")
        square.addEventListener("click", placeSymbol)
        square.addEventListener("mouseenter", hovering)
        square.addEventListener("mouseout", notHovering)
    }
})


function placeSymbol(e) {
    e.target.innerText = currentSymbol
    changePlayer(currentSymbol)
    disableSquare(e.target)
    localStorage.setItem("boardState", board.innerHTML)
    localStorage.setItem("currentSymbol", currentSymbol)
    localStorage.setItem("turnDisplay", turnDisplay.innerText)
    localStorage.setItem("turnDisplayColor", turnDisplay.style.background)
    localStorage.setItem("turnDisplayFontColor", turnDisplay.style.color)
    checkGameStatus(e.target.innerText)
}

function changePlayer(symbol) {
    if (currentSymbol === "X") {
        currentSymbol = "O"
        turnDisplay.style.background = "#6d71fb"
        turnDisplay.style.color = "black"
    }
    else if (currentSymbol === "O") {
        currentSymbol = "X"
        turnDisplay.style.background = "#5fbef8"
        turnDisplay.style.color = "grey"
    }
    turnDisplay.innerText = `It's ${currentSymbol}'s turn!` 
}

function newGame() {
    squares.forEach((square) => {
        square.innerText = ""
        square.classList.add("clickable")
        square.addEventListener("click", placeSymbol)
        square.addEventListener("mouseenter", hovering)
        square.addEventListener("mouseout", notHovering)
    })
    currentSymbol = "X"
    turnDisplay.style.background = "#5fbef8"
    turnDisplay.style.color = "grey"
    turnDisplay.innerText = "X goes first!"
}

function hovering(e) {
    e.target.classList.add("hovering")
    e.target.innerText = currentSymbol
}

function notHovering(e) {
    e.target.classList.remove("hovering")
    e.target.innerText = ""
}

function disableSquare(square) {
    square.classList.remove("clickable")
    square.removeEventListener("click", placeSymbol)
    square.removeEventListener("mouseenter", hovering)
    square.removeEventListener("mouseout", notHovering)
    square.classList.remove("hovering")
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
        endGame()
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
    newHistoryItem.classList.add("historyItem")
    if (gameHistory.children.length === 10) {
        gameHistory.removeChild(gameHistory.firstElementChild)
    }
    gameHistory.appendChild(newHistoryItem)
    if (symbol === "tie") {
        gameHistory.children[gameHistory.children.length - 1].innerText = `Game ${gameCounter}: Tie Game!`
    }
    else {
        gameHistory.children[gameHistory.children.length - 1].innerText = `Game ${gameCounter}: ${symbol} won!`
    }
    gameCounter++
}

function endGame() {
    squares.forEach(square => disableSquare(square))
    updateCounterDisplays()
    turnDisplay.innerText = "Game Over!"
    turnDisplay.style.background = ""
    localStorage.removeItem("boardState")
    localStorage.removeItem("turnDisplay")
    localStorage.removeItem("currentSymbol")
    localStorage.removeItem("turnDisplayColor")
    localStorage.removeItem("turnDisplayFontColor")
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
    localStorage.setItem("gameCounter", gameCounter) //number of games played this session
    localStorage.setItem("gameHistory", gameHistory.innerHTML) //gameHistory information
}