import Greeter from './Greeter.js';
import './style.css';
const greeter = new Greeter();
document.querySelector("#root").appendChild(greeter.render());