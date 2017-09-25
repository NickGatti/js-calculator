import {colorize} from './css-fn.js';
import {exitWindowEvents} from './window-events.js';
import {exitCalcMove} from './calc-move.js';


const btns = document.querySelectorAll('.btn-container__btn');

const buttonContainer = document.querySelector('.btn-container');
const header = document.querySelector('.calc-container__header');

buttonContainer.ontouchstart = function(e) {
    exitWindowEvents(true);
    exitCalcMove(true);
    e.stopPropagation();
    if (e.target.innerHTML == '0') {
        // Support for big ZERO button
        btns[16].style.background = '#ffff4d';
        btns[17].style.background = '#ffff4d';
    } else {
        // All other buttons highlight when pressed
        e.target.style.background = '#ffff4d';
    }
};

buttonContainer.ontouchend = function(e) {
    colorize();
};

header.ontouchstart = function(e) {
    const url = window.location.href.split('?')[1];
    if (url === 'new-window') return;
    exitWindowEvents(true);
    exitCalcMove(true);
    e.stopPropagation();
    header.onmousemove = function(e) {
        let calcPosition = document.querySelector('.calc-position');
        let offsetY = e.offsetY;
        let offsetX = e.offsetX;
        calcPosition.style.top = (offsetY + (document.body.scrollHeight / 2) - 20)  + 'px';
        calcPosition.style.left = (offsetX + (document.body.scrollWidth / 2) - 150) + 'px';
    };
};