import {colorize} from './css-fn.js';

const btns = document.querySelectorAll('.btn-container__btn');

const buttonContainer = document.querySelector('.btn-container')
const header = document.querySelector('.calc-container__header');

buttonContainer.ontouchstart = function(e) {
    if (e.target.innerHTML == '0') {
        // Support for big ZERO button
        btns[16].style.background = '#ffff4d';
        btns[17].style.background = '#ffff4d';
    } else {
        // All other buttons highlight when pressed
        e.target.style.background = '#ffff4d';
    }
}

buttonContainer.ontouchend = function(e) {
    colorize();
}

header.ontouchstart = function(e) {
    let calcPosition = document.querySelector('.calc-position');
    let offsetY = e.offsetY;
    let offsetX = e.offsetX;
    function mouseMoveHandler (e) {
        calcPosition.style.top = (e.clientY - offsetY - 2)  + 'px';
        calcPosition.style.left = (e.clientX - offsetX - 4) + 'px';
        calcPosition.style.margin = 0;
        if (parseInt(calcPosition.style.top, 10) <= 0) {
            calcPosition.style.top = 0;
        }
        if (parseInt(calcPosition.style.left, 10 ) <= 0) {
            calcPosition.style.left = 0;
        }
    }
    function mouseUpHandler () {
        document.removeEventListener('touchmove', mouseMoveHandler, false);
        document.removeEventListener('touchend', mouseUpHandler, false);
    }
    document.addEventListener('touchmove', mouseUpHandler, false);
    document.addEventListener('touchend', mouseMoveHandler, false);
};



/*
document.addEventListener('touchstart', touchStart, false);
document.addEventListener('touchend', touchEnd, false);


function touchStart (e) {
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
}

function touchMove (e) {
    let offsetY = e.offsetY;
    let offsetX = e.offsetX;
    calcPosition.style.top = (e.clientY - offsetY - 2)  + 'px';
    calcPosition.style.left = (e.clientX - offsetX - 4) + 'px';
    calcPosition.style.margin = 0;
    if (parseInt(calcPosition.style.top, 10) <= 0) {
        calcPosition.style.top = 0;
    }
    if (parseInt(calcPosition.style.left, 10 ) <= 0) {
        calcPosition.style.left = 0;
    }
}
*/