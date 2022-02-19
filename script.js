// help with creating the grid:
// https://stackoverflow.com/questions/11083345/creating-a-dynamic-grid-of-divs-with-javascript

// A few 'controller' variables
const slider = document.getElementById("canvasSlider");
const gridSizeText = document.getElementById("grid-size-text");
let gridSize = slider.value;
gridSizeText.textContent = `${gridSize}x${gridSize}`;

const clickedSquareClass = "clicked-square";
const squareClass = "square";
const squareBorderClass = "square-border";

let brushColour = "black";

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

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

// Clear screen functionality
const clearScreenBtn = document.getElementById("clear-screen-button");
clearScreenBtn.addEventListener("click", function () {
    let colouredSquares = document.querySelectorAll(`.${clickedSquareClass}`);
    console.log(colouredSquares.length);
    for (let i = 0; i < colouredSquares.length; i++)
    {
        colouredSquares[i].classList.remove(`${clickedSquareClass}`);
    }
});

// Change the brush colour (use brushColour here)

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

function updateSquares() {
    // Set up the click event for each square
    const squares = Array.from(document.querySelectorAll(`.${squareClass}`));

    // Handle click and drag for painting on canvas
    squares.forEach(square => square.addEventListener("mouseover", function () {
        if (mouseDown && !square.classList.contains(`${clickedSquareClass}`))
        {
            square.classList.add(`${clickedSquareClass}`);
        }      
    }));

    // Handle single clicks for paintings on canvas
    squares.forEach(square => square.addEventListener("click", function () {
        if (!square.classList.contains(`${clickedSquareClass}`));
            square.classList.add(`${clickedSquareClass}`);
    }));
}