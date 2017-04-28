import getElementFromField from './getElementFromField.js';
import getKey from './getKey.js';
import getValue from './getValue.js';
import getValidity from './getValidity.js';
import errorTypes from './errorTypes.js';

export default (field, options) => {
	const elem = getElementFromField(field);
	const key = getKey(field),
		value = getValue(field),
		valid = getValidity(elem, options),
		errors = errorTypes(elem, options),
		parent = elem.closest(options.parentElementSelector);

	return {key, value, valid, errors, parent};
}