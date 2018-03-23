import style from './index.scss';
import config from '../config/dev.env.json';
class Test{
	render(){
		const greet = document.createElement('div');
		  greet.className = style.intro;
  		greet.textContent = config.testText;
  		return greet;
	}
}
export default Test;