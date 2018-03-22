import style from './index.scss';
import config from '../config/dev.env.json';
class Test{
	render(){
		return `<div class=${style.intro}> 
        			{config.testText}
      			</div>`;
	}
}
export default Test;