import {colorize} from './css-fn.js';

document.addEventListener('touchstart', touchStart, false);
document.addEventListener('touchend', touchEnd, false);

const btns = document.querySelectorAll('.btn-container__btn');


function touchStart (e) {
    if (e.target.innerHTML == '0') {
        // Support for big ZERO button
        btns[16].style.background = '#ffff4d';
        btns[17].style.background = '#ffff4d';
    } else {
        // All other buttons highlight when pressed
        e.target.style.background = '#ffff4d';
    }
}

function touchEnd (e) {
        colorize();
}