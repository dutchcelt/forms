import getFileValidity from './getFileValidity.js';

export default (elem, messages) => {

    const validity = [];
    validity[0] = getFileValidity(elem, messages);

    return [...validity, elem.validity.valid].every(v => v);
}
