import '../sass/main.scss';
import './calc-move.js';
console.log('Javascript Calculator by: Nick Gatti');

// Start Global Vars
const output = document.getElementById('calc-output');
const btns = document.querySelectorAll('.btn-container__btn');
const header = document.querySelectorAll('.calc-container__header');
const globalFontSize = '400%';
let firstNum = null;
let calcState = {
    numFlag: false,
    arithmetic: null,
    equalsFlag: false
};
// End Global Vars

// Init CSS3 Styles
init();

//Check for new window
newWindow();

// Start detect mouse events
for (let i = 0; i < btns.length; i++) {
    // Start on mouse down style effects
    btns[i].onmousedown = function (e) {
        if (e.target.innerHTML == '0') {
            // Support for big ZERO button
            btns[16].style.background = 'lightgrey';
            btns[17].style.background = 'lightgrey';
        } else {
            // All other buttons highlight lightgrey when pressed
            e.target.style.background = 'lightgrey';
        }
    };
    btns[i].onmouseup = function (e) {
        // Make sure no button is stuck in lightgrey if user drags his mouse across 2 buttons or some weird thing happens
        colorize();
    };  
    // End on mouse down style effects
    btns[i].onclick = function (e) {
         if (isNaN(e.target.innerHTML)) {
             //Not a number
             calcFunctions(e.target.innerHTML);
         } else {
             //Is a number
             if (calcState.equalsFlag === true) {
                reset();
             }
             calcNumbers(e.target.innerHTML);
         }
    };
}
// End detect mouse events

// Start of number press functions
function calcNumbers (num) {
    cleanOut();
    // Check for a NaN result
    if (isNaN(output.innerHTML)) {
        output.innerHTML = '';
        outputFont();
        firstNum = '';
        calcState.numFlag = false;
        calcState.arithmetic = null;        
    }
    // Write the number to the output, checks flag we set other places
    if (calcState.numFlag) {
        output.innerHTML = num;
        outputFont();
        calcState.numFlag = false;
        return;
    }
    // Support for peroids
    if (num === '.' && output.innerHTML === '0') {
        output.innerHTML = output.innerHTML + num;
        outputFont();
        return;
    }
    // Support for two zeros being added to output
    if (num === '0' && output.innerHTML === '0') {
        output.innerHTML = '0';
        outputFont();
        return;
    }
    // Write the number to the output and remove the 0
    if (num != '0' && output.innerHTML === '0') {
        output.innerHTML = num;
        outputFont();
        return;
    }
    output.innerHTML = output.innerHTML + num;
    outputFont();
}
// End of number press functions

// Start of function press functions
function calcFunctions (func) {
    switch(func) {
        // Delete a number off the back of the output, keyboard only case
        case 'Backspace':
            output.innerHTML = output.innerHTML.substring(0, output.innerHTML.length - 1);
            if (output.innerHTML.length == 0) {
                output.innerHTML = '0';
            }
            outputFont();
            break;
        // Clear everything non-mac keyboard only
        case 'Delete':
        // Clear everything UI button
        case 'AC':
            reset();     
            break;
        // Multiply
        case 'x':
        case '*':
            checkArith();
            calcState.arithmetic = multi;
            break;
        // Pos to Neg 
        case '+/-':
            calcState.numFlag = false;
            calcState.arithmetic = toNeg;
            output.innerHTML = toNeg(Number(output.innerHTML));
            outputFont();
            calcState.arithmetic = null;
            break;
        // Subrtact
        case '-':
            checkArith();
            calcState.arithmetic = subt;
            break;
        // Add
        case '+':
            checkArith();
            calcState.arithmetic = addition;
            break;
        // Divide
        case '\u00F7':
            checkArith();
            calcState.arithmetic = divide;
            break;
        // Percent
        case '%':
            calcState.numFlag = true;
            calcState.arithmetic = percent;
            output.innerHTML = percent(Number(output.innerHTML));
            outputFont();
            break;
        // Equals
        case '=':
        // Equals, keyboard case only
        case 'Enter':
            if (calcState.arithmetic === null) {
                return;
            }
            equalsFn(calcState.arithmetic);
            calcState.equalsFlag = true;
            break;
        // Add peroid
        case '.':
            if (!output.innerHTML.includes('.')) {
                calcNumbers(func);
            }
            break;
        default:
            break;
    }
}
// End of function press functions

// Start of output text display cleaners
function cleanOut () {
    if (output.innerHTML === 'Infinity') {
        reset();
    }
}

function outputFont () {
    let outputFontSizePer = '';
    let outputFontSize = outputFontSizeFn();
    // Output font gets smaller here
    if (output.scrollWidth > output.clientWidth && outputFontSize > 100) {
        do {
            outputFontSize = outputFontSizeFn();
            outputFontSize = outputFontSize - 1;
            outputFontSizePer = outputFontSize.toString();
            outputFontSizePer = outputFontSize + '%';
            output.style.fontSize = outputFontSizePer;
        } while (output.scrollWidth > output.clientWidth && outputFontSize > 100 );
    // If output font font size is 100 (min) then breakword css
    } else if (output.scrollWidth >= output.clientWidth && outputFontSize <= 100 && output.innerHTML.length > 9) { 
        output.style.wordWrap = 'break-word';
        return;
    // If output font length is less than 9 reset for now
    } else if (output.innerHTML.length <= 9) {
        output.style.fontSize = globalFontSize;
        output.style.wordWrap = 'normal';
    // If its too small and someone has used the backspace or the result of a function is a length smaller than the previous result then make the output font bigger
    } else if (!(output.scrollWidth > output.clientWidth) && !(output.scrollHeight > output.clientHeight)) {
        do {
            outputFontSize = outputFontSizeFn();
            outputFontSize = outputFontSize + 1;
            outputFontSizePer = outputFontSize.toString();
            outputFontSizePer = outputFontSize + '%';
            output.style.fontSize = outputFontSizePer;
        } while (!(output.scrollWidth > output.clientWidth) && !(output.scrollHeight > output.clientHeight));
    }
}

// Trying to keep lines under control
function outputFontSizeFn() {
    let outputFontSize = output.style.fontSize;
    outputFontSize = outputFontSize.replace('%', '');
    outputFontSize = Number(outputFontSize);
    return outputFontSize;
}
// End of output text display cleaners

// Start of arithmetic functions
function checkArith () {
    checkPreFn();
    calcState.numFlag = true;
    if (calcState.arithmetic != null) {
        equalsFn(calcState.arithmetic);
        firstNum = output.innerHTML;
        return;
    }
firstNum = output.innerHTML;
}

// Making sure theres a new function start after you press the equals function
function checkPreFn (state) {
    if (calcState.equalsFlag === true) {
        reset();
    }
}

function subt (x,y) {
    return ((x) - (y));
}

function divide (x,y) {
    return ((x) / (y));
}

function toNeg (x) {
    return (x * (-1));
}

function percent (x) {
    return (x / (100));
}

function multi (x,y) {
    return ((x) * (y));
}

function addition (x,y) {
    return ((x) + (y));
}

function equalsFn(arithmetic) {
    output.innerHTML = arithmetic(Number(firstNum), Number(output.innerHTML));
    outputFont();
}
// End of arithmetic functions

// Start of CSS functions
function colorize () {
    output.style.background = 'lightgreen';
    header[0].style.background = 'darkgrey';
    assignColor('.blue-btn', 'skyblue');
    assignColor('.pink-btn', 'lightpink');
    assignColor('.green-btn', 'lightgreen');
    assignColor('.orange-btn', 'orange');
}

function assignColor (btn, color) {
    let button = document.querySelectorAll(btn);
    for (let i = 0; i < button.length; i++) {
        button[i].style.background = color;
    }
}

function init () {
    document.addEventListener('keydown', keyPressHandler, false)
    output.style.fontSize = globalFontSize;
    btns[16].style.borderRadius = '0 0 0 25px';
    btns[19].style.borderRadius = '0 0 25px 0';
    btns[16].style.borderRightWidth = '0';
    btns[17].style.borderLeftWidth = '0';
    btns[17].style.fontSize = '0px';
    colorize();
}
// End of CSS functions

// Start of reset function
function reset() {
    output.style.fontSize = globalFontSize;
    output.style.wordWrap = 'normal';
    output.innerHTML = '0';
    outputFont();
    calcState.equalsFlag = false;
    firstNum = null;
    calcState = {
        numFlag: false,
        arithmetic: null
    };     
}
// End of reset function

// Start of key press handler
function keyPressHandler (e) {
    let num = parseInt(e.key, 10);
    if (isNaN(num)) {
        // This just checks if its a number and if it is it send it to the number function as if we did it from a mouse click
        calcFunctions(e.key);
    } else {
        // If its not a number then we can handle what it is with our switch statements
        calcNumbers(num);
    }
}
// End of key press handler

// Start of window functions
function newWindow () {
    // Check for the new window url
    const url = window.location.href.split('?')[1];
    if (url === 'new-window') {
        resizeWindow();
        document.getElementsByClassName('wrapper')[0].style.background = 'grey';
        header[0].style.border = '3px solid #999';
        btns[16].style.borderRadius = '0px';
        btns[19].style.borderRadius = '0px';
        header[0].style.borderRadius = '0px';
        header[0].style.borderRadius = '0px';
        window.addEventListener("resize", resizeWindow, false);
    }
}

function resizeWindow () {
    let calcContainer = document.getElementsByClassName('calc-container')[0];
    let calcPosition = document.getElementsByClassName('calc-position')[0];
    // Theres a border thats a different size on my laptop and desktop that im trying to dynamically account for here
    // Best way to describe the border is the border you click on to resize the window
    // Im trying to measure how big it is here:
    let widthOffset  = (((window.outerWidth - window.innerWidth) / 2) - 2);
    // theres 2 borders, left and right, it measures to be 8px per border which is 2 extra px than what works best which is 6px
    // not sure if working ....
    let height = (window.innerHeight - widthOffset);
    let width = (window.innerWidth - widthOffset);
    height = (height.toString() + 'px');
    width = (width.toString() + 'px');
    calcPosition.style.top = 0;
    calcPosition.style.left = 0;
    calcPosition.style.margin = 0;
    calcContainer.style.height = height;
    calcContainer.style.width = width;
}
// End of window functions