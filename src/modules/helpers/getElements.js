import hasUserInput from './hasUserInput.js';

export default form => {
	return [...form.elements].filter(elem => hasUserInput(elem));
};
