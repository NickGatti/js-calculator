import '../sass/main.scss';
import './calc-move.js';
console.log('Javascript Calculator by: Nick Gatti');

// Start Global Vars
const output = document.getElementById('calc-output');
const btns = document.querySelectorAll('.btn-container__btn');
const header = document.querySelectorAll('.calc-container__header');
const globalFontSize = '325%';
let firstNum = null;
let calcState = {
    numFlag: false,
    arithmetic: null,
    equalsFlag: false
};
// End Global Vars

// Init CSS3 Styles
init();

// Start detect mouse events
for (let i = 0; i < btns.length; i++) {
    btns[i].onmousedown = function (e) {
        if (e.target.innerHTML == '0') {
            btns[16].style.background = 'lightgrey';
            btns[17].style.background = 'lightgrey';
        } else {
            e.target.style.background = 'lightgrey';
        }
    };
    btns[i].onmouseup = function (e) {
        colorize();
    };  
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
    if (isNaN(output.innerHTML)) {
        output.innerHTML = '';
        outputFont();
        firstNum = '';
        calcState.numFlag = false;
        calcState.arithmetic = null;        
    }
    if (calcState.numFlag) {
        output.innerHTML = num;
        outputFont();
        calcState.numFlag = false;
        return;
    }
    if (num === '.' && output.innerHTML === '0') {
        output.innerHTML = output.innerHTML + num;
        outputFont();
        return;
    }
    if (num === '0' && output.innerHTML === '0') {
        output.innerHTML = '0';
        outputFont();
        return;
    }
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
        case 'AC':
            reset();     
            break;
        case 'x':
            checkArith();
            calcState.arithmetic = multi;
            break;
        case '+/-':
            calcState.numFlag = false;
            calcState.arithmetic = toNeg;
            output.innerHTML = toNeg(Number(output.innerHTML));
            outputFont();
            calcState.arithmetic = null;
            break;
        case '-':
            checkArith();
            calcState.arithmetic = subt;
            break;
        case '+':
            checkArith();
            calcState.arithmetic = addition;
            break;
        case '\u00F7':
            checkArith();
            calcState.arithmetic = divide;
            break;
        case '%':
            calcState.numFlag = true;
            calcState.arithmetic = percent;
            output.innerHTML = percent(Number(output.innerHTML));
            outputFont();
            break;
        case '=':
            if (calcState.arithmetic === null) {
                return;
            }
            equalsFn(calcState.arithmetic);
            calcState.equalsFlag = true;
            break;
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
    if (output.scrollWidth > 298 && outputFontSize > 100) {
        do {
            outputFontSize = outputFontSizeFn();
            outputFontSize = outputFontSize - 1;
            outputFontSizePer = outputFontSize.toString();
            outputFontSizePer = outputFontSize + '%';
            output.style.fontSize = outputFontSizePer;
        } while (output.scrollWidth > 298 && outputFontSize > 100 );
    } else if (output.scrollWidth >= 298 && outputFontSize <= 100 && output.innerHTML.length > 10) { 
        output.style.wordWrap = 'break-word';
        return;
    } else if (output.innerHTML.length <= 9) {
        output.style.fontSize = globalFontSize;
        output.style.wordWrap = 'normal';
    }
}

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