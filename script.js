

//Create variable references to DOM elements
let canvas = document.querySelector('.canvas');
let clrBtn = document.querySelector('.clear');
let palette = document.querySelectorAll('.palette');
let userColor = document.querySelector('.user-color');
let color = 'black';
let currentPalette = blackPixel;



//Event listeners
clrBtn.addEventListener('click', clearCanvas);
userColor.addEventListener('change', colorPicker, false);
userColor.addEventListener('input', colorPicker, false);
palette.forEach(palette => palette.addEventListener('click', setPalette));


//Canvas editing
function buildCanvas(grid) {
    removeAllPixels(canvas) //removes previous pixels before creating new pixels
    canvas.style.gridTemplateColumns = `repeat(${grid}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${grid}, 1fr)`;
    
    let size = 640 / grid - 2; //calculate pixel size to fit canvas
    let gridArea = grid * grid; //calculate amount of pixels

    for (let i = 1; i <= gridArea; i++) {
        let newDiv = document.createElement('div');
        newDiv.className = 'pixel';
        canvas.appendChild(newDiv);
    }
    makePixelsSmart();
}

function clearCanvas() {
    let newCanvas = prompt('Select a new grid size between 10 and 50.')
    if (newCanvas == '') {
        buildCanvas(16);
    } else if (newCanvas > 9 && newCanvas < 51) {
        buildCanvas(newCanvas);
    } else {
        clearCanvas()
    }
}


//Pixel Logic
function removeAllPixels(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }    
}

function makePixelsSmart() {
    let pixels = Array.from(document.querySelectorAll('.pixel'));
    pixels.forEach(pixel => pixel.addEventListener('mouseover', currentPalette))
}


//Color Control
function setPalette(event) {
    switch (event.target.dataset.color) {
        case 'rainbow':
            currentPalette = rainbowPixel;
            makePixelsSmart();
            break;
        case 'eraser':
            currentPalette = erasePixel;
            makePixelsSmart()
            break;
        default:
            currentPalette = blackPixel;
            makePixelsSmart();
            break;
    }
}


function colorPicker(e) {
    color = e.target.value;
    currentPalette = userPixel;
    makePixelsSmart()  
}

function userPixel() {
    this.style.backgroundColor = color;  
}

let hue = 0
function rainbowPixel() {
    this.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    hue += 5;
}

function erasePixel() {
    this.style.removeProperty('background-color');
}

function blackPixel() {
    this.style.backgroundColor = 'black';
}

//Generate original canvas
buildCanvas(16);