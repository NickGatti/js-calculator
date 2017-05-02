import '../sass/main.scss';
import './calc-move.js';
import './touch-events.js';
import {newWindow} from './window-events.js';
import {cleanOut} from './text-sizer.js';
import {textSizer} from './text-sizer.js';
import {colorize} from './css-fn.js';
import {init} from './css-fn.js';

// Author and contact info
console.log('Javascript Calculator by: Nick Gatti');
console.log('Github link             : https://github.com/NickGatti/js-calculator');
console.log('E-mail                  : nick.gatti@gmail.com');

// Start Global Vars
const output = document.querySelector('.calc-container__output');
const btns = document.querySelectorAll('.btn-container__btn');
let firstNum = null;
let state = {
    cantAddNewNumber: false,
    typeOfCalculation: null,
    justPressedEquals: false,
    justPressedAnumber: null,
    justPressedCalculate: false
};
// End Global Vars

// Init CSS3 Styles
init();

//Check for new window
newWindow();

// Start detect click events
for (let i = 0; i < btns.length; i++) {
    // Start on mouse down style effects
    btns[i].onmousedown = function (e) {
        if (e.target.innerHTML == '0') {
            // Support for big ZERO button
            btns[16].style.background = '#ffff4d';
            btns[17].style.background = '#ffff4d';
        } else {
            // All other buttons highlight when pressed
            e.target.style.background = '#ffff4d';
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
             state.justPressedAnumber = false;
             calcFunctions(e.target.innerHTML);
         } else {
             //Is a number
             state.justPressedAnumber = true;
             if (state.justPressedEquals === true) {
                reset();
             }
             calcNumbers(e.target.innerHTML);
         }
    };
}
// End detect mouse events

// Start of number press functions
export function calcNumbers (num) {
    cleanOut();
    // Check for a NaN result
    if (isNaN(output.innerHTML)) {
        output.innerHTML = '';
        textSizer(output);
        firstNum = '';
        state.cantAddNewNumber = false;
        state.typeOfCalculation = null;        
    }
    // Write the number to the output, checks flag we set other places
    if (state.cantAddNewNumber && num != '.') {
        output.innerHTML = num;
        textSizer(output);
        state.cantAddNewNumber = false;
        return;
    }
    // Support for peroids
    if (num === '.') {
        if (state.justPressedCalculate === true && state.cantAddNewNumber === true || state.justPressedEquals === true) {
            state.justPressedCalculate = false;
            state.justPressedEquals = false;
            state.justPressedAnumber = null;
            state.cantAddNewNumber = false;
            firstNum = output.innerHTML;          
            output.innerHTML = '0';
        }
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
export function calcFunctions (func) {
    state.justPressedAnumber = false;
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
            state.justPressedCalculate = true;
            state.typeOfCalculation = multi;
            break;
        // Pos to Neg 
        case '+/-':
            state.cantAddNewNumber = false;
            state.typeOfCalculation = toNeg;
            output.innerHTML = toNeg(Number(output.innerHTML));
            textSizer(output);
            state.typeOfCalculation = null;
            break;
        // Subrtact
        case '-':
            checkArith();
            state.justPressedCalculate = true;
            state.typeOfCalculation = subt;
            break;
        // Add
        case '+':
            checkArith();
            state.justPressedCalculate = true;
            state.typeOfCalculation = addition;
            break;
        // Divide
        case '\u00F7':
            checkArith();
            state.justPressedCalculate = true;
            state.typeOfCalculation = divide;
            break;
        // Percent
        case '%':
            state.cantAddNewNumber = true;
            state.typeOfCalculation = percent;
            output.innerHTML = percent(Number(output.innerHTML));
            textSizer(output);
            break;
        // Equals
        case '=':
        // Equals, keyboard case only
        case 'Enter':
            if (state.typeOfCalculation === null) {
                return;
            }
            equalsFn(state.typeOfCalculation);
            state.justPressedEquals = true;
            break;
        // Add peroid
        case '.':
            if ( ( (output.innerHTML.split('.').length - 1) != 1) || state.justPressedCalculate === true ) {
                calcNumbers(func);
            }
            break;
        default:
            break;
    }
}
// End of function press functions

// Start of arithmetic functions
function checkArith () {
    // This function activates a equals function after using a previous function before it
    // so you can string on new calculations as long as you want
    checkPreFn();
    state.cantAddNewNumber = true;
    if (state.typeOfCalculation != null) {
        equalsFn(state.typeOfCalculation);
        firstNum = output.innerHTML;
        return;
    }
    firstNum = output.innerHTML;
}

// Making sure theres a new function start after you press the equals function so it stops adding new functions
// like it does with the above function checkArith() and resets, basically an equals function, funcion resetter.
function checkPreFn () {
    if (state.justPressedEquals === true) {
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

// Start of reset function
export function reset() {
    output.innerHTML = '0';
    textSizer(output);
    state.justPressedEquals = false;
    firstNum = null;
    state.justPressedAnumber = null;
    state = {
        cantAddNewNumber: false,
        typeOfCalculation: null
    };     
}
// End of reset function