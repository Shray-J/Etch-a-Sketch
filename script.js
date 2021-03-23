let container = document.querySelector('.container');
let resetButton = document.querySelector('.reset');
let rainbowButton = document.querySelector('.rainbow');
let slider = document.querySelector('.slider');
let colorPicker = document.querySelector('.color');
let squares = 16;
let rainbowMode = true;
let fixedColor = "rgb(0, 0, 0)"

const containerWidth = container.clientWidth;
let containerPosition = container.getBoundingClientRect();
let containerPositionLeft = containerPosition.left;
let containerPositionTop = containerPosition.top;
let pixels;
createGrid(squares)
//Create x by x grid
function createGrid(x){
    container.setAttribute('style', `grid-template-columns: repeat(${x}, auto);`);
    pixels = containerWidth/x - 2;
    for(let i = 1; i <= x**2; i++){
        let square = document.createElement('div');
        square.setAttribute('style', `width: ${pixels}px; height: ${pixels}px; background-color: white`)
        square.setAttribute('id', "square-" + i);
        container.appendChild(square);
    }
}

function randomColor(){
    return 'rgb(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ')';
}



let borderX = getComputedStyle(container).getPropertyValue('border-left-width').replace('px', '');
let borderY = getComputedStyle(container).getPropertyValue('border-left-width').replace('px', '');
function returnDiv(e){
    let x = e.pageX - containerPositionLeft - borderX;
    let y = e.pageY - containerPositionTop- borderY;
    if(x>=containerWidth || y>=containerWidth || x < 0 || y<0){
        return null;
    }
    let squareDimensions = containerWidth/squares;
    let squareID = Math.floor(y/squareDimensions) * squares + Math.floor(x/squareDimensions) + 1;
    return document.querySelector(`#square-${squareID}`);
}

function reset(){
    container.innerHTML = "";
    createGrid(squares);
}

window.addEventListener('resize', ()=> {
    containerPosition = container.getBoundingClientRect();
    containerPositionLeft = containerPosition.left;
    containerPositionTop = containerPosition.top;
});


container.addEventListener('mouseover', (e)=>{
    let square = returnDiv(e);
    if(square == null){
        return;
    }
    let squareColor;
    if(rainbowMode){
        squareColor = randomColor();
    }else{
        squareColor = fixedColor;
    }
    square.setAttribute('style', `background-color: ${squareColor}; width: ${pixels}px; height: ${pixels}px;`);
})
resetButton.addEventListener('click', reset);
rainbowButton.addEventListener('click', ()=>{
    rainbowMode = true;
});
colorPicker.addEventListener('click', ()=>{
    rainbowMode = false;
});
colorPicker.addEventListener('input', (e)=>{
    fixedColor = colorPicker.value;
    console.log(fixedColor)
});
slider.addEventListener('change', ()=>{
    squares = Math.floor(400/slider.value);
    reset(squares);
});