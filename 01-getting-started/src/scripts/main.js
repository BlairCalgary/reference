import functions from './functions.js';
import {functions as fetchFunc} from './fetch.js';
// import { foo as bar } from 'my-module';


// **********
//
// Add the event listeners
// 

idNumber.addEventListener('change', (() => {
    idNumberSize.textContent = functions.size(idNumber.value);
}));


