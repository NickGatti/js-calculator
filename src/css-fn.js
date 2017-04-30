import {keyPressHandler} from './keypress-handler.js';
import {textSizer} from './text-sizer.js';

const output = document.querySelector('.calc-container__output');
const header = document.querySelector('.calc-container__header');
const btns = document.querySelectorAll('.btn-container__btn');

// Start of CSS functions
export function colorize () {
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

export function init () {
    document.addEventListener('keydown', keyPressHandler, false);
    // Start of making the bottom left and bottom right corners round
    btns[16].style.borderRadius = '0 0 0 25px';
    btns[19].style.borderRadius = '0 0 25px 0';
    // End of making the bottom left and bottom right corners round
    // Start of how to make the big zero button
    btns[16].style.borderRightWidth = '0';
    btns[17].style.borderLeftWidth = '0';
    // End of how to make the big zero button - make sure to put a zero into the html for the hidden button
    colorize();
    // Dynamically resizes text on load
    textSizer(output);
    textSizer(header);
    for (let i = 0; i < btns.length; i++) {
        if (i != 17) textSizer(btns[i]);
    }
    // Big ZERO button must only have 1 zero
    btns[17].style.fontSize = '0px';
}
// End of CSS functions