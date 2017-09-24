import {colorize} from './css-fn.js';
import {dont} from './calc-move.js';

const btns = document.querySelectorAll('.btn-container__btn');

let calcPosition = document.querySelector('.calc-position');

document.addEventListener('touchstart', touchStart, false);
document.addEventListener('touchend', touchEnd, false);


function touchStart (e) {
    dont = !dont
    if (e.target.innerHTML == '0') {
        // Support for big ZERO button
        btns[16].style.background = '#ffff4d';
        btns[17].style.background = '#ffff4d';
    } else {
        // All other buttons highlight when pressed
        e.target.style.background = '#ffff4d';
    }
    document.addEventListener('touchmove', touchMove, false);
}

function touchEnd (e) {
        colorize();
        document.removeEventListener('touchmove', touchMove, false);
        dont = !dont
}

function touchMove (e) {
    let offsetY = e.offsetY;
    let offsetX = e.offsetX;
    calcPosition.style.top = (e.clientY - offsetY)  + 'px';
    calcPosition.style.left = (e.clientX - offsetX) + 'px';
    calcPosition.style.margin = 0;
    /*
    if (parseInt(calcPosition.style.top, 10) <= 0) {
        calcPosition.style.top = 0;
    }
    if (parseInt(calcPosition.style.left, 10 ) <= 0) {
        calcPosition.style.left = 0;
    }
    */
}