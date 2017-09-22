const header = document.querySelector('.calc-container__header');
let calcPosition = document.querySelector('.calc-position');
let openWindow = document.querySelector('.open-window');

// The little button, opens a new window
openWindow.onmousedown = function (e) {
    e.stopPropagation();
    const url = window.location.href.split('?')[0];
    // Open for a very small screen size.. Iphone portrait: Width 310px , Height: 352px
    const options = 'chrome=mo, location=no, toolbar=no, menubar=no, scrollbars=no, resizable=no, height=352, width=310';
    console.log(url)
    window.open(url+'?new-window', 'calculator', options);
};

// Start of ability to change the location of the calc window when not in the 'new-window' window
header.onmousedown = function (e) {
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
        document.removeEventListener('mousemove', mouseMoveHandler, false);
        document.removeEventListener('mouseup', mouseUpHandler, false);
    }
    document.addEventListener('mouseup', mouseUpHandler, false);
    document.addEventListener('mousemove', mouseMoveHandler, false);
};

header.touchmove = function (e) {
    let offsetY = e.offsetY;
    let offsetX = e.offsetX;
    function touchMoveHandler (e) {
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
    function touchEndHandler () {
        document.removeEventListener('touchmove', touchMoveHandler, false);
        document.removeEventListener('touchend', touchEndHandler, false);
    }
    document.addEventListener('touchend', touchEndHandler, false);
    document.addEventListener('touchmove', touchMoveHandler, false);

};
// End of ability to change the location of the calc window when not in the 'new-window' window