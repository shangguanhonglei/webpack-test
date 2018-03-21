import config from '../config/dev.env.json';
class Greeter{
	render(){
		const greet = document.createElement('div');
  	greet.textContent = config.greetText;
  	return greet;
	}
  
};
export default Greeter;