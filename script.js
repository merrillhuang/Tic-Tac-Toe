console.log("Here!")

const squares = document.querySelectorAll(".square")

let currentSymbol = "x"

squares.forEach((square) => {
    square.addEventListener("click", () => {
        square.innerText = currentSymbol
    })
})
