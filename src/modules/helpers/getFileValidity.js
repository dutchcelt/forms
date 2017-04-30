import config from '../config.js';

export default elem => {
	elem.setCustomValidity("");

	const files = elem.files;
	if (!files || !files.length) return elem.validity.valid;

	const allowedExtensions = elem.dataset.allowedExtensions;
	const maxSize = elem.dataset.maxSize;
	const uploadSize = [...files].reduce((a, f) => a + Math.ceil(f.size / 1024), 0);
	const validSize = maxSize ? uploadSize <= parseInt(maxSize) : true;
	const validType = allowedExtensions ? [...files].every(f => (new RegExp(f.name.split(/\./).pop(), 'gi')).test(allowedExtensions)) : true;
	const isValid = [validSize, validType, elem.validity.valid].every(v => v);

	if (!isValid) {
		elem.dataset.uploadSize = `of ${uploadSize}KB`;
		const messages = config.messages(elem);
		elem.dataset.errorMessage = `${!validSize ? messages.sizeMessage : ''} ${!validType ? messages.typeMessage : ''}`;
		elem.setCustomValidity('error');
	}
	return isValid;
}