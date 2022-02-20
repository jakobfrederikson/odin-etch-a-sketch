// help with creating the grid:
// https://stackoverflow.com/questions/11083345/creating-a-dynamic-grid-of-divs-with-javascript

// Brush logic with help from:
// https://github.com/michalosman/etch-a-sketch/blob/master/script.js

const brushBtn = document.getElementById("rainbow-btn");
const eraserBtn = document.getElementById("eraser-btn");
const showGridBtn = document.getElementById("show-grid");
const slider = document.getElementById("canvasSlider");
const gridSizeText = document.getElementById("grid-size-text");
const clearScreenBtn = document.getElementById("clear-screen-button");

brushBtn.onclick = () => setBrushMode("rainbow");
eraserBtn.onclick = () => setBrushMode("eraser");
showGridBtn.onclick = () => toggleGrid();
let gridOn = false;
clearScreenBtn.onclick = () => clearScreen();

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

let gridSize = slider.value;
gridSizeText.textContent = `${gridSize}x${gridSize}`; // e.g: 20x20

const squareClass = "square";

const drawColour = "#000000";
let brushMode = "normal";

// ------------------------------------------------------------------------------------------------

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
            if (gridOn)
                square.classList.add("show-grid");
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

function clearScreen() {
    const squares = Array.from(document.querySelectorAll(`.${squareClass}`));
    squares.forEach(square => square.style.backgroundColor = "#FFFFFF");
}

slider.oninput = function ()
{
    gridSize = slider.value;
    gridSizeText.textContent = `${gridSize}x${gridSize}`;
    updateGridSize(gridSize);
}

function toggleGrid() {
    const squares = Array.from(document.querySelectorAll(`.${squareClass}`));
    if (squares[0].classList.contains("show-grid"))
    {
        squares.forEach(square => square.classList.remove("show-grid"));
        gridOn = false;
    }        
    else
    {
        squares.forEach(square => square.classList.add("show-grid"));
        gridOn = true;
    }        
}