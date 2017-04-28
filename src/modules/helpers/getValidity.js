import getFileValidity from './getFileValidity.js';

export default (elem, options) => {

	const validity = [];
	validity[0] = getFileValidity(elem, options);

	return [...validity, elem.validity.valid].every(v => v);
}
