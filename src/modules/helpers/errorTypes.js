export default (elem, options) => {
	const messages = options.errorMessages(elem);
	return Object.keys(messages).filter(k => elem.validity[k]).map(m => messages[m]);
}