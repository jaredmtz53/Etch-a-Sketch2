
let colorPicker = document.querySelector('.colorPicker');
let sizeValue = document.querySelector(".rangeValue");
let sizeSlider = document.querySelector(".slider");
let colorMode = document.querySelector(".colorMode");
let rainbowMode = document.querySelector(".rainbowMode");
let eraserMode = document.querySelector(".eraser");
let clear = document.querySelector(".clear");
let grid = document.getElementById("grid");

const DEFAULTSIZE = 32;
const DEFAULTCOLOR = "black";
const DEFUALTMODE = "colorMode";

let currentSize = DEFAULTSIZE;
let currentColor = DEFAULTCOLOR;
let currentMode = DEFUALTMODE;

function setSize(newSize) {
    currentSize = newSize;
}
function setColor(newColor) {
    currentColor = newColor;
}
function setMode(newMode) {
    currentMode = newMode;
}


colorPicker.addEventListener('input', (e) => setColor(e.target.value));
colorMode.addEventListener('click', () => setMode("color"));
rainbowMode.addEventListener('click', () => setMode("rainbow"));
eraserMode.addEventListener('click', () => setMode("eraser"));
clear.addEventListener('click', () => reloadGrid());
sizeSlider.addEventListener('change', (e) => changeSize(e.target.value));
sizeSlider.addEventListener('input', (e) => updateSizeValue(e.target.value));



function changeSize(value) {
    setSize(value);
    updateSizeValue(value);
    reloadGrid();
}

// updates the value of the size value 
function updateSizeValue(value) {
    sizeValue.innerText = `${value} x ${value}`;
}
function reloadGrid() {
    clearGrid();
    setGrid(currentSize);
}
function clearGrid() {
    grid.innerHTML = " ";
}

function setGrid(size) {
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (let i = 0; i < size * size; i++) {
        let cells = document.createElement('div');
        cells.classList.add('cells');
        cells.addEventListener('mouseover', colorChange);
        cells.addEventListener('mousedown', colorChange);
        grid.appendChild(cells);
    }
}

function resetbButtonState() {
    rainbowBtnClicked = false;
    colorBtnClicked = false;
    eraserBtnClicked = false;
    clearBtnClicked = false;
}
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function colorChange(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if(currentMode === 'rainbow') {
        const randomColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
        e.target.style.backgroundColor = randomColor;
    }

    if(currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    }
    if(currentMode === 'eraser') {
        e.target.style.backgroundColor = "white";
    }
}


colorMode.addEventListener('click', () => {
    resetbButtonState();
    colorBtnClicked = true;
})
rainbowMode.addEventListener('click', () => {
    resetbButtonState();
    rainbowBtnClicked = true;
})
eraserMode.addEventListener('click', () => {
    resetbButtonState();
    eraserBtnClicked = true;
})
clear.addEventListener('click', () => {
    resetbButtonState();
    clearBtnClicked = true;
})



window.onload = () => {
    setGrid(DEFAULTSIZE);
}
