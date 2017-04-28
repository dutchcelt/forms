import errorMessages from './messages.js';
import validator from './validator.js';

const defaults = {
	errorClass: 'error',
	parentElementSelector: 'fieldset > *',
	errorMessages
};


/**
 * Add validation to a form
 * @param {Element} form
 * @param {object} settings
 * @returns {*}
 */
export default (form, settings) => {
	const options = Object.assign({}, defaults, settings);
	const validaitonObject = Object.assign(
		Object.create(validator),
		{form, options}
	);
	return validaitonObject.init();
};
