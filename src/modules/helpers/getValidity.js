import getFileValidity from './getFileValidity.js';

export default (elem) => {

	const validity = [];
	validity[0] = getFileValidity(elem);

	return [...validity, elem.validity.valid].every(v => v);
}
