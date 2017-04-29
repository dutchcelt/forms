import config from './config.js';
import validator from './validator.js';

/**
 * Add validation to a form
 * @param {Element} form
 * @param {object} settings
 * @returns {*}
 */
export default (form, settings) => {
	const options = Object.assign({}, config, settings);
	const validaitonObject = Object.assign(
		Object.create(validator),
		{form, options}
	);
	return validaitonObject.init();
};
