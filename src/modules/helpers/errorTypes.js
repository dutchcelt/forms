import config from '../config.js';
export default (elem) => {
	const messages = config.messages(elem);
	return Object.keys(messages).filter(k => elem.validity[k]).map(m => messages[m]);
};
