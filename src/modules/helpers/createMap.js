import getElements from './getElements.js';
import getKey from './getKey.js';
import setObject from './setObject.js';

export default (form, options) => {
    const newMap = new Map();
    getElements(form).forEach(e => {
        const field = form[getKey(e)];
        newMap.set(field, setObject(field, options));
    });
    return newMap;
}