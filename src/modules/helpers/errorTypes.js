import errorMessages from '../messages.js';
export default (elem) => {
	const messages = errorMessages(elem);
	return Object.keys(messages).filter(k => elem.validity[k]).map(m => messages[m]);
}