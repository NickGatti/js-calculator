import {calcFunctions} from './index.js';
import {calcNumbers} from './index.js';

// Start of key press handler
export function keyPressHandler (e) {
    let num = parseInt(e.key, 10);
    if (isNaN(num)) {
        // This just checks if its a number and if it is it send it to the number function as if we did it from a mouse click
        calcFunctions(e.key);
    } else {
        // If its not a number then we can handle what it is with our switch statements
        // I sent the variable num that has been parseInt'ed because what if it returns something like Num8 for numpad 8?
        calcNumbers(num);
    }
}
// End of key press handler