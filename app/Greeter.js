import config from '../config/dev.env.json';
import demo from './demo.css';
class Greeter{
	render(){
		const greet = document.createElement('div');
		greet.className = {demo.root};
  		greet.textContent = config.greetText;
  		return greet;
	}
  
};
export default Greeter;