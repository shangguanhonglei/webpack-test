import Greeter from './Greeter.js';
import Test from './test.js';
import './style.css';
const greeter = new Greeter();
document.querySelector("#root").appendChild(greeter.render());
const test = new Test();
document.querySelector("#root").appendChild(test.render());
