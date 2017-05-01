import config from './config.js';
import validator from './validator.js';

/**
 * Add validation to a form
 * @param {Element} form
 * @param {object} settings
 * @returns {*}
 */
export default (form) => {
	const validaitonObject = Object.assign(
		Object.create(validator),
		{ form, config }
	);
	return validaitonObject.init();
};
