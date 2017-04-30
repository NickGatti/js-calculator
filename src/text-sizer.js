import {reset} from './index.js';

const output = document.querySelector('.calc-container__output');

// Start of output text display cleaners
export function cleanOut () {
    // If we have an infinity output value then reset the calc
    if (output.innerHTML === 'Infinity') {
        reset();
    }
}

export function textSizer (element) {
    let elementFontSizePer = '';
    let elementFontSize = elementFontSizeFn(element);
    element.style.wordWrap = 'break-word';
    // element font gets smaller here if the element div window has a width type scroll bar
    // and the font size gets close to 100 (it becomes NaN below 100) then STOP!
    if ( ( (element.scrollWidth > element.clientWidth) || (element.scrollHeight > element.clientHeight) ) && elementFontSize >= 0) {
        do {
            elementFontSize = elementFontSizeFn(element);
            elementFontSize = elementFontSize - 10;
            elementFontSizePer = elementFontSize.toString();
            elementFontSizePer = elementFontSize + '%';
            element.style.fontSize = elementFontSizePer;
        } while ( ( (element.scrollWidth > element.clientWidth) || (element.scrollHeight > element.clientHeight) ) && elementFontSize >= 0);
        return;
    // element Font gets bigger here if element div window has a width type scroll bar or a height type scroll bar... STOP!
    } else if ( (element.scrollWidth == element.clientWidth) && (element.scrollHeight == element.clientHeight) ) {
        do {
            elementFontSize = elementFontSizeFn(element);
            elementFontSize = elementFontSize + 10;
            elementFontSizePer = elementFontSize.toString();
            elementFontSizePer = elementFontSize + '%';
            element.style.fontSize = elementFontSizePer;
        } while ( (element.scrollWidth == element.clientWidth) && (element.scrollHeight == element.clientHeight) );
        // Make it not bounce back and forth because we just added a scroll bar.. now we need to remove it
        if ( (element.scrollWidth > element.clientWidth) || (element.scrollHeight > element.clientHeight) ) {
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