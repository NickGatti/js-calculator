import '../sass/main.scss';
import './calc-move.js';

// Author and contact info
console.log('Javascript Calculator by: Nick Gatti');
console.log('Github link             : https://github.com/NickGatti/js-calculator');
console.log('E-mail                  : nick.gatti@gmail.com')

// Start Global Vars
const output = document.getElementById('calc-output');
const btns = document.querySelectorAll('.btn-container__btn');
const header = document.querySelectorAll('.calc-container__header')[0];
let globalFontSize = '400%';
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
        textSizer(output);
        firstNum = '';
        calcState.numFlag = false;
        calcState.arithmetic = null;        
    }
    // Write the number to the output, checks flag we set other places
    if (calcState.numFlag) {
        output.innerHTML = num;
        textSizer(output);
        calcState.numFlag = false;
        return;
    }
    // Support for peroids
    if (num === '.' && output.innerHTML === '0') {
        output.innerHTML = output.innerHTML + num;
        textSizer(output);
        return;
    }
    // Support for two zeros being added to output
    if (num === '0' && output.innerHTML === '0') {
        output.innerHTML = '0';
        textSizer(output);
        return;
    }
    // Write the number to the output and remove the 0
    if (num != '0' && output.innerHTML === '0') {
        output.innerHTML = num;
        textSizer(output);
        return;
    }
    output.innerHTML = output.innerHTML + num;
    textSizer(output);
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
            textSizer(output);
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
            textSizer(output);
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
            textSizer(output);
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
    // If we have an infinity output value then reset the calc
    if (output.innerHTML === 'Infinity') {
        reset();
    }
}

function textSizer (element) {
    let elementFontSizePer = '';
    let elementFontSize = elementFontSizeFn(element);
    element.style.wordWrap = 'break-word';
    // element font gets smaller here if the element div window has a width type scroll bar
    // and the font size gets close to 100 (it becomes NaN below 100) then STOP!
    if ((element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight) && elementFontSize >= 100) {
        do {
            elementFontSize = elementFontSizeFn(element);
            elementFontSize = elementFontSize - 10;
            elementFontSizePer = elementFontSize.toString();
            elementFontSizePer = elementFontSize + '%';
            element.style.fontSize = elementFontSizePer;
        } while (element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight && elementFontSize >= 100);
        return;
    // element Font gets bigger here if element div window has a width type scroll bar or a height type scroll bar... STOP!
    } else if (element.scrollWidth == element.clientWidth && element.scrollHeight == element.clientHeight) {
        do {
            elementFontSize = elementFontSizeFn(element);
            elementFontSize = elementFontSize + 10;
            elementFontSizePer = elementFontSize.toString();
            elementFontSizePer = elementFontSize + '%';
            element.style.fontSize = elementFontSizePer;
        } while (element.scrollWidth == element.clientWidth && element.scrollHeight == element.clientHeight);
        // Make it not bounce back and forth
        if ((element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight) && elementFontSize >= 100) {
            elementFontSize = elementFontSizeFn(element);
            elementFontSize = elementFontSize - 10;
            elementFontSizePer = elementFontSize.toString();
            elementFontSizePer = elementFontSize + '%';
            element.style.fontSize = elementFontSizePer;
        }
    }
}

// Trying to keep lines under control
function elementFontSizeFn(element) {
    let elementFontSize = element.style.fontSize;
    elementFontSize = elementFontSize.replace('%', '');
    elementFontSize = Number(elementFontSize);
    return elementFontSize;
}
// End of output text display cleaners

// Start of arithmetic functions
function checkArith () {
    // This function activates a equals function after using a previous function before it
    // so you can string on new calculations as long as you want
    checkPreFn();
    calcState.numFlag = true;
    if (calcState.arithmetic != null) {
        equalsFn(calcState.arithmetic);
        firstNum = output.innerHTML;
        return;
    }
    firstNum = output.innerHTML;
}

// Making sure theres a new function start after you press the equals function so it stops adding new functions
// like it does with the above function checkArith() and resets, basically an equals function, funcion resetter.
function checkPreFn (state) {
    if (calcState.equalsFlag === true) {
        reset();
    }
}

// Start of the math calculation functions
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
// End of the math calculation functions

function equalsFn(arithmetic) {
    // Call the above math functions and display them to output
    output.innerHTML = arithmetic(Number(firstNum), Number(output.innerHTML));
    textSizer(output);
}
// End of arithmetic functions

// Start of CSS functions
function colorize () {
    // Color all of the buttons
    output.style.background = 'lightgreen';
    header.style.background = 'darkgrey';
    assignColor('.blue-btn', 'skyblue');
    assignColor('.pink-btn', 'lightpink');
    assignColor('.green-btn', 'lightgreen');
    assignColor('.orange-btn', 'orange');
}

function assignColor (btn, color) {
    // Trying to keep the lines under control
    let button = document.querySelectorAll(btn);
    for (let i = 0; i < button.length; i++) {
        button[i].style.background = color;
    }
}

function init () {
    document.addEventListener('keydown', keyPressHandler, false)
    output.style.fontSize = globalFontSize;
    // Start of making the bottom left and bottom right corners round
    btns[16].style.borderRadius = '0 0 0 25px';
    btns[19].style.borderRadius = '0 0 25px 0';
    // End of making the bottom left and bottom right corners round
    // Start of how to make the big zero button
    btns[16].style.borderRightWidth = '0';
    btns[17].style.borderLeftWidth = '0';
    btns[17].style.fontSize = '0px';
    // End of how to make the big zero button - make sure to put a zero into the html for the hidden button
    colorize();
    // Dynamically resizes text on load
    textSizer(output);
    textSizer(header);
}
// End of CSS functions

// Start of reset function
function reset() {
    output.style.wordWrap = 'normal';
    output.innerHTML = '0';
    textSizer(output);
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
        // I sent the variable num that has been parseInt'ed because what if it returns something like Num8 for numpad 8?
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
        header.style.border = '3px solid #999';
        // Start of making the borders square on new window
        btns[16].style.borderRadius = '0px';
        btns[19].style.borderRadius = '0px';
        header.style.borderRadius = '0px';
        // End of making the borders square on new window
        window.addEventListener("resize", resizeWindow, false);
        // Dynamically resizes text when new window
        textSizer(output);
        textSizer(header);
    }
}

function resizeWindow () {
    let calcContainer = document.getElementsByClassName('calc-container')[0];
    let calcPosition = document.getElementsByClassName('calc-position')[0];
    // Theres a border thats a different size on my laptop and desktop that im trying to dynamically account for here
    // Best way to describe the border is the border you click on to resize the window
    // Im trying to measure how big it is here:
    // let borderOffset  = (((window.outerWidth - window.innerWidth) / 2) - 8);
    // theres 2 borders, left and right, it measures to be 8px per border which is 2 extra px than what works best which is 6px
    // not sure if working .... turns out it works on both desktop and laptop if I dont subtrat + 2 px or so -- changed to everything border-box css and now its - 8
    // console.log(borderOffset);
    // this usually returns zero now... for now i think i dont need this anymore...
    let height = (window.innerHeight); // - borderOffset);
    let width = (window.innerWidth); // - borderOffset);
    height = (height.toString() + 'px');
    width = (width.toString() + 'px');
    calcPosition.style.top = 0;
    calcPosition.style.left = 0;
    calcPosition.style.margin = 0;
    calcContainer.style.height = height;
    calcContainer.style.width = width;
    // Dynamically resizes text when resized window
    textSizer(output);
    textSizer(header);
}
// End of window functions