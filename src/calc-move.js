let header = document.getElementById('calc-header');
let calcPosition = document.getElementsByClassName('calc-position')[0];
let openWindow = document.querySelector('.open-window');

openWindow.onmousedown = function (e) {
    e.stopPropagation();
    // Open for a very small screen size.. Iphone portrait: Width 310px , Height: 352px
    const options = 'chrome=mo, location=no, toolbar=no, menubar=no, scrollbars=no, resizable=no, height=352, width=310';
    window.open('http://calculator-gatti-nickgatti.c9users.io:8080/?new-window', 'calculator', options);
};

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