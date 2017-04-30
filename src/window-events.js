import {textSizer} from './text-sizer.js';

const output = document.querySelector('.calc-container__output');
const header = document.querySelector('.calc-container__header');
const container = document.querySelector('.calc-container');
const btns = document.querySelectorAll('.btn-container__btn');

// Start of window functions
export function newWindow () {
    // Check for the new window url
    const url = window.location.href.split('?')[1];
    if (url === 'new-window') {
        resizeWindow();
        document.querySelector('.wrapper').style.background = '#4d4d4d';
        header.style.border = '3px solid #999';
        // Start of making the borders square on new window
        btns[16].style.borderRadius = '0';
        btns[19].style.borderRadius = '0';
        container.style.borderRadius = '0 0 15px 15px';
        header.style.borderRadius = '0';
        // End of making the borders square on new window
        window.addEventListener("resize", resizeWindow, false);
    }   
}

function resizeWindow () {
    const calcContainer = document.querySelector('.calc-container');
    const calcPosition = document.querySelector('.calc-position');
    let height = (window.innerHeight);
    let width = (window.innerWidth);
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
    for (let i = 0; i < btns.length; i++) {
        if (i != 17) textSizer(btns[i]);
    }
}
// End of window functions