import getElementFromField from './getElementFromField.js';
import getKey from './getKey.js';
import getValue from './getValue.js';
import getValidity from './getValidity.js';
import errorTypes from './errorTypes.js';
import config from '../config.js';

export default (field) => {
	const elem = getElementFromField(field);
	const key = getKey(field),
		value = getValue(field),
		valid = getValidity(elem),
		errors = errorTypes(elem),
		parent = elem.closest(config.parentElementSelector);

	return {key, value, valid, errors, parent};
}