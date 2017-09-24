/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cleanOut = cleanOut;
exports.textSizer = textSizer;

var _index = __webpack_require__(1);

var output = document.querySelector('.calc-container__output');

// Start of output text display cleaners
function cleanOut() {
    // If we have an infinity or NaN output value then reset the calc
    var num = output.innerHTML;
    if (num === 'Infinity' || num === 'NaN') {
        (0, _index.reset)();
    }
}

function textSizer(element) {
    var elementFontSizePer = '';
    var elementFontSize = elementFontSizeFn(element);
    element.style.wordWrap = 'break-word';
    // element font gets smaller here if the element div window has a width type scroll bar
    // and the font size gets close to 100 (it becomes NaN below 100) then STOP!
    if ((element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight) && elementFontSize >= 0) {
        do {
            elementFontSize = elementFontSizeFn(element);
            elementFontSize = elementFontSize - 10;
            elementFontSizePer = elementFontSize.toString();
            elementFontSizePer = elementFontSize + '%';
            element.style.fontSize = elementFontSizePer;
        } while ((element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight) && elementFontSize >= 0);
        return;
        // element Font gets bigger here if element div window has a width type scroll bar or a height type scroll bar... STOP!
    } else if (element.scrollWidth == element.clientWidth && element.scrollHeight == element.clientHeight) {
        do {
            elementFontSize = elementFontSizeFn(element);
            elementFontSize = elementFontSize + 10;
            elementFontSizePer = elementFontSize.toString();
            elementFontSizePer = elementFontSize + '%';
            element.style.fontSize = elementFontSizePer;
        } while (element.scrollWidth == element.clientWidth && element.scrollHeight == element.clientHeight);
        // Make it not bounce back and forth because we just added a scroll bar.. now we need to remove it
        if (element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight) {
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
    var elementFontSize = element.style.fontSize;
    elementFontSize = elementFontSize.replace('%', '');
    elementFontSize = Number(elementFontSize);
    return elementFontSize;
}
// End of output text display cleaners

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calcNumbers = calcNumbers;
exports.calcFunctions = calcFunctions;
exports.reset = reset;

__webpack_require__(6);

__webpack_require__(3);

__webpack_require__(4);

var _windowEvents = __webpack_require__(5);

var _textSizer = __webpack_require__(0);

var _cssFn = __webpack_require__(2);

// Author and contact info
console.log('Javascript Calculator by: Nick Gatti');
console.log('Github link             : https://github.com/NickGatti/js-calculator');
console.log('E-mail                  : nick.gatti@gmail.com');

// Start Global Vars
var output = document.querySelector('.calc-container__output');
var btns = document.querySelectorAll('.btn-container__btn');
var firstNum = null;
var state = {
    cantAddNewNumber: false,
    typeOfCalculation: null,
    justPressedEquals: false,
    justPressedAnumber: null,
    justPressedCalculate: false
};
// End Global Vars

// Init CSS3 Styles
(0, _cssFn.init)();

//Check for new window
(0, _windowEvents.newWindow)();

// Start detect click events
for (var i = 0; i < btns.length; i++) {
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
        (0, _cssFn.colorize)();
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
function calcNumbers(num) {
    (0, _textSizer.cleanOut)();
    // Check for a NaN result
    if (isNaN(output.innerHTML)) {
        output.innerHTML = '';
        (0, _textSizer.textSizer)(output);
        firstNum = '';
        state.cantAddNewNumber = false;
        state.typeOfCalculation = null;
    }
    // Write the number to the output, checks flag we set other places
    if (state.cantAddNewNumber && num != '.') {
        output.innerHTML = num;
        (0, _textSizer.textSizer)(output);
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
        (0, _textSizer.textSizer)(output);
        return;
    }
    // Support for two zeros being added to output
    if (num === '0' && output.innerHTML === '0') {
        output.innerHTML = '0';
        (0, _textSizer.textSizer)(output);
        return;
    }
    // Write the number to the output and remove the 0
    if (num != '0' && output.innerHTML === '0') {
        output.innerHTML = num;
        (0, _textSizer.textSizer)(output);
        return;
    }
    output.innerHTML = output.innerHTML + num;
    (0, _textSizer.textSizer)(output);
}
// End of number press functions

// Start of function press functions
function calcFunctions(func) {
    state.justPressedAnumber = false;
    switch (func) {
        // Delete a number off the back of the output, keyboard only case
        case 'Backspace':
            output.innerHTML = output.innerHTML.substring(0, output.innerHTML.length - 1);
            if (output.innerHTML.length == 0) {
                output.innerHTML = '0';
            }
            (0, _textSizer.textSizer)(output);
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
            (0, _textSizer.textSizer)(output);
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
        case '\xF7':
            checkArith();
            state.justPressedCalculate = true;
            state.typeOfCalculation = divide;
            break;
        // Percent
        case '%':
            state.cantAddNewNumber = true;
            state.typeOfCalculation = percent;
            output.innerHTML = percent(Number(output.innerHTML));
            (0, _textSizer.textSizer)(output);
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
            if (output.innerHTML.split('.').length - 1 != 1 || state.justPressedCalculate === true) {
                calcNumbers(func);
            }
            break;
        default:
            break;
    }
}
// End of function press functions

// Start of arithmetic functions
function checkArith() {
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
function checkPreFn() {
    if (state.justPressedEquals === true) {
        reset();
    }
}

// Start of the math calculation functions
function subt(x, y) {
    return x - y;
}

function divide(x, y) {
    return x / y;
}

function toNeg(x) {
    return x * -1;
}

function percent(x) {
    return x / 100;
}

function multi(x, y) {
    return x * y;
}

function addition(x, y) {
    return x + y;
}
// End of the math calculation functions

function equalsFn(arithmetic) {
    // Call the above math functions and display them to output
    output.innerHTML = arithmetic(Number(firstNum), Number(output.innerHTML));
    (0, _textSizer.textSizer)(output);
}
// End of arithmetic functions

// Start of reset function
function reset() {
    output.innerHTML = '0';
    (0, _textSizer.textSizer)(output);
    state.justPressedEquals = false;
    firstNum = null;
    state.justPressedAnumber = null;
    state = {
        cantAddNewNumber: false,
        typeOfCalculation: null
    };
}
// End of reset function

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.colorize = colorize;
exports.init = init;

var _keypressHandler = __webpack_require__(9);

var _textSizer = __webpack_require__(0);

var output = document.querySelector('.calc-container__output');
var header = document.querySelector('.calc-container__header');
var btns = document.querySelectorAll('.btn-container__btn');

// Start of CSS functions
function colorize() {
    // Color all of the buttons
    output.style.background = 'lightgreen';
    header.style.background = 'darkgrey';
    assignColor('.blue-btn', 'skyblue');
    assignColor('.pink-btn', 'lightpink');
    assignColor('.green-btn', 'lightgreen');
    assignColor('.orange-btn', 'orange');
}

function assignColor(btn, color) {
    // Trying to keep the lines under control
    var button = document.querySelectorAll(btn);
    for (var i = 0; i < button.length; i++) {
        button[i].style.background = color;
    }
}

function init() {
    document.addEventListener('keydown', _keypressHandler.keyPressHandler, false);
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
    (0, _textSizer.textSizer)(output);
    (0, _textSizer.textSizer)(header);
    for (var i = 0; i < btns.length; i++) {
        if (i != 17) (0, _textSizer.textSizer)(btns[i]);
    }
    // Big ZERO button must only have 1 zero
    btns[17].style.fontSize = '0px';
}
// End of CSS functions

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var header = document.querySelector('.calc-container__header');
var calcPosition = document.querySelector('.calc-position');
var openWindow = document.querySelector('.open-window');

// The little button, opens a new window
openWindow.onmousedown = function (e) {
    e.stopPropagation();
    var url = window.location.href.split('?')[0];
    // Open for a very small screen size.. Iphone portrait: Width 310px , Height: 352px
    var options = 'chrome=mo, location=no, toolbar=no, menubar=no, scrollbars=no, resizable=no, height=352, width=310';
    console.log(url);
    window.open(url + '?new-window', 'calculator', options);
};

// Start of ability to change the location of the calc window when not in the 'new-window' window
header.onmousedown = function (e) {
    var offsetY = e.offsetY;
    var offsetX = e.offsetX;
    function mouseMoveHandler(e) {
        calcPosition.style.top = e.clientY - offsetY - 2 + 'px';
        calcPosition.style.left = e.clientX - offsetX - 4 + 'px';
        calcPosition.style.margin = 0;
        if (parseInt(calcPosition.style.top, 10) <= 0) {
            calcPosition.style.top = 0;
        }
        if (parseInt(calcPosition.style.left, 10) <= 0) {
            calcPosition.style.left = 0;
        }
    }
    function mouseUpHandler() {
        document.removeEventListener('mousemove', mouseMoveHandler, false);
        document.removeEventListener('mouseup', mouseUpHandler, false);
    }
    document.addEventListener('mouseup', mouseUpHandler, false);
    document.addEventListener('mousemove', mouseMoveHandler, false);
};
// End of ability to change the location of the calc window when not in the 'new-window' window

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _cssFn = __webpack_require__(2);

var btns = document.querySelectorAll('.btn-container__btn');

var buttonContainer = document.querySelector('.btn-container');
var header = document.querySelector('.calc-container__header');

buttonContainer.ontouchstart = function (e) {
    if (e.target.innerHTML == '0') {
        // Support for big ZERO button
        btns[16].style.background = '#ffff4d';
        btns[17].style.background = '#ffff4d';
    } else {
        // All other buttons highlight when pressed
        e.target.style.background = '#ffff4d';
    }
};

buttonContainer.ontouchend = function (e) {
    (0, _cssFn.colorize)();
};

header.ontouchstart = function (e) {
    var calcPosition = document.querySelector('.calc-position');
    var offsetY = e.offsetY;
    var offsetX = e.offsetX;
    function mouseMoveHandler(e) {
        calcPosition.style.top = e.clientY - offsetY - 2 + 'px';
        calcPosition.style.left = e.clientX - offsetX - 4 + 'px';
        calcPosition.style.margin = 0;
        if (parseInt(calcPosition.style.top, 10) <= 0) {
            calcPosition.style.top = 0;
        }
        if (parseInt(calcPosition.style.left, 10) <= 0) {
            calcPosition.style.left = 0;
        }
    }
    function mouseUpHandler() {
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.newWindow = newWindow;

var _textSizer = __webpack_require__(0);

var output = document.querySelector('.calc-container__output');
var header = document.querySelector('.calc-container__header');
var container = document.querySelector('.calc-container');
var btns = document.querySelectorAll('.btn-container__btn');

// Start of window functions
function newWindow() {
    // Check for the new window url
    var url = window.location.href.split('?')[1];
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

function resizeWindow() {
    var calcContainer = document.querySelector('.calc-container');
    var calcPosition = document.querySelector('.calc-position');
    var height = window.innerHeight;
    var width = window.innerWidth;
    height = height.toString() + 'px';
    width = width.toString() + 'px';
    calcPosition.style.top = 0;
    calcPosition.style.left = 0;
    calcPosition.style.margin = 0;
    calcContainer.style.height = height;
    calcContainer.style.width = width;
    // Dynamically resizes text when resized window
    (0, _textSizer.textSizer)(output);
    (0, _textSizer.textSizer)(header);
    for (var i = 0; i < btns.length; i++) {
        if (i != 17) (0, _textSizer.textSizer)(btns[i]);
    }
}
// End of window functions

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(11)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.keyPressHandler = keyPressHandler;

var _index = __webpack_require__(1);

// Start of key press handler
function keyPressHandler(e) {
    var num = parseInt(e.key, 10);
    if (isNaN(num)) {
        // This just checks if its a number and if it is it send it to the number function as if we did it from a mouse click
        (0, _index.calcFunctions)(e.key);
    } else {
        // If its not a number then we can handle what it is with our switch statements
        // I sent the variable num that has been parseInt'ed because what if it returns something like Num8 for numpad 8?
        (0, _index.calcNumbers)(num);
    }
}
// End of key press handler

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, "* {\n  box-sizing: border-box !important;\n  overflow: hidden !important;\n  font-family: 'Quicksand', sans-serif;\n  text-shadow: 2px 2px 2px rgba(25, 25, 25, 0.375); }\n\nbody {\n  background: \"white\"; }\n\n.calc-position {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin: -225px 0 0 -150px; }\n\n.calc-container {\n  background: #ccc;\n  border: 3px solid #8c8c8c;\n  display: block;\n  width: 18.75em;\n  height: 29.6875em;\n  border-radius: 23px; }\n  .calc-container * {\n    user-select: none;\n    font-weight: bold; }\n  .calc-container__header {\n    border-radius: 25px 25px 0 0;\n    border: 1px solid #737373;\n    line-height: 1.5;\n    padding-left: 0.275em;\n    height: 10%;\n    width: 100%; }\n    .calc-container__header .open-window {\n      margin-right: 0.475em;\n      margin-top: 0.335em;\n      float: right;\n      height: 0.875em;\n      width: 0.875em;\n      border: 2px solid #8c8c8c;\n      border-radius: 100%;\n      background: #ccc; }\n  .calc-container__output {\n    height: 15%;\n    width: 100%;\n    border: 2px solid #666;\n    text-align: right;\n    user-select: text;\n    font-weight: normal;\n    text-shadow: 1px 2px 2px rgba(25, 25, 25, 0.5); }\n  .calc-container .btn-container {\n    height: 75%;\n    width: 100%;\n    display: flex;\n    flex-wrap: wrap; }\n    .calc-container .btn-container__btn {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      border: 1px solid #666;\n      height: 20%;\n      width: 25%;\n      padding: 0.125em;\n      font-weight: normal; }\n", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ })
/******/ ]);