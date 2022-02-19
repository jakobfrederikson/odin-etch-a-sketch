// help with creating the grid:
// https://stackoverflow.com/questions/11083345/creating-a-dynamic-grid-of-divs-with-javascript

// Brush logic with help from:
// https://github.com/michalosman/etch-a-sketch/blob/master/script.js


const clearScreenBtn = document.getElementById("clear-screen-button");
const brushBtn = document.getElementById("rainbow-btn");
const eraserBtn = document.getElementById("eraser-btn");
const slider = document.getElementById("canvasSlider");
const gridSizeText = document.getElementById("grid-size-text");

brushBtn.onclick = () => setBrushMode("rainbow");
eraserBtn.onclick = () => setBrushMode("eraser");

let gridSize = slider.value;
gridSizeText.textContent = `${gridSize}x${gridSize}`; // e.g: 20x20

const clickedSquareClass = "clicked-square";
const squareClass = "square";
const squareBorderClass = "square-border";

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const drawColour = "#000000";
let brushMode = "normal";


// Create the grid
function updateGridSize(gridSize) {
    const gridContainer = document.querySelector("#container")
    gridContainer.innerHTML = '';
    for (let i = 0; i < gridSize; i++)
    {
        const row = document.createElement("div");
        row.className = "row";
        gridContainer.appendChild(row) // create the rows
        for (let j = 0; j < gridSize; j++)
        {
            const square = document.createElement("div");
            square.className = `${squareClass}`;
            row.appendChild(square); // put the square divs in the rows
        }
    }
    updateSquares();
}
updateGridSize(gridSize);

function updateSquares() {
    const squares = Array.from(document.querySelectorAll(`.${squareClass}`));
    squares.forEach(square => square.addEventListener("mouseover", drawOnSquare));
    squares.forEach(square => square.addEventListener("mousedown", drawOnSquare));
}

function drawOnSquare(e)
{
    if (e.type === 'mouseover' && !mouseDown) return;
    if (brushMode === "rainbow")
    {
        e.target.style.backgroundColor = randomBrushColour();
    }
    else if (brushMode === "normal")
    {
        e.target.style.backgroundColor = "#000000";
    }
    else if (brushMode === "eraser")
    {
        e.target.style.backgroundColor = "#FFFFFF";
    }
}

function randomBrushColour() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function setBrushMode(mode) {
    if (brushMode === "rainbow" && mode === "rainbow") { brushMode = "normal"; return; }
    if (brushMode === "eraser" && mode === "eraser") { brushMode = "normal"; return; }

    if (mode === "rainbow") { brushMode = "rainbow"; return; }
    if (mode === "eraser") { brushMode = "eraser"; return; }
}

// Clear screen functionality
clearScreenBtn.addEventListener("click", function () {
    let colouredSquares = document.querySelectorAll(`.${clickedSquareClass}`);
    console.log(colouredSquares.length);
    for (let i = 0; i < colouredSquares.length; i++)
    {
        colouredSquares[i].classList.remove(`${clickedSquareClass}`);
    }
});

// Change the canvas size (use gridSize here)
slider.oninput = function ()
{
    gridSize = slider.value;
    gridSizeText.textContent = `${gridSize}x${gridSize}`;
    updateGridSize(gridSize);
}

// CURRENT BUG:
//      - If grid is showing and we change the grid size, the grid goes away
//      - possibly add a boolean check in updateGridSize to help this
// Toggle the grid
// const showGridBtn = document.getElementById("show-grid");
// showGridBtn.addEventListener("click", toggleGrid());

// function toggleGrid() 
// {
//     const squares = Array.from(document.querySelectorAll(`.${squareClass}`));
//     showGridBtn.addEventListener("click", function() {
//         if (squares[1].classList.contains(`${squareBorderClass}`))
//         {
//             squares.forEach(square => square.classList.remove(`${squareBorderClass}`));
//         }
//         else
//         {
//             squares.forEach(square => square.classList.add(`${squareBorderClass}`));
//         }        
//     });
// }