
export function getElements(form) {
    return [...form.elements].filter(elem => hasUserInput(elem));
}

export function createMap(form, options) {
    const newMap = new Map();
    getElements(form).forEach(e => {
        const field = form[getKey(e)];
    newMap.set(field, setObject(field, options));
});
    return newMap;
}

export function setObject(field, options) {
    const elem = getElementFromField(field);
    const key = getKey(field),
        value = getValue(field),
        valid = getValidity(elem,options.errorMessages(elem)),
        errors = errorTypes(elem, options),
        parent = elem.closest(options.parentElementSelector);
    return { key, value, valid, errors, parent };
}

export function getValidity(elem, messages) {

    const validity = [];
    validity[0] = getFileValidity(elem, messages);

    return [...validity, elem.validity.valid].every(v => v);
}

export function getFileValidity(elem, messages) {
    elem.setCustomValidity("");

    const files = elem.files;
    if (!files || !files.length) return elem.validity.valid;

    const allowedExtensions = elem.dataset.allowedExtensions;
    const maxSize = elem.dataset.maxSize;
    const uploadSize = [...files].reduce( (a, f) => a + Math.ceil(f.size/1024), 0);
    const validSize = maxSize ? uploadSize <= parseInt(maxSize) : true;
    const validType = allowedExtensions ? [...files].every(f => (new RegExp(f.name.split(/\./).pop(),'gi')).test(allowedExtensions)) : true;
    const isValid = [validSize, validType, elem.validity.valid].every(v => v);

    if(!isValid) {
        elem.dataset.uploadSize = `of ${uploadSize}KB`;
        elem.dataset.errorMessage = `${!validSize ? messages.sizeMessage : ''} ${!validType ? messages.typeMessage : ''}`;
        elem.setCustomValidity('error');
    }
    return isValid;
}

export function getKey(elem) {
    elem = (/select/i).test(elem.tagName) ? elem : elem[0] || elem;
    return (/radio/i).test(elem.type) ? elem.name || elem.id : elem.id || elem.name;
}

export function getValue(field) {
    return field.value || (!field.tagName && [...field].reduce((a, e, i) => e.checked ? e.value : a, field.value));
}

export function getElementFromField(field) {
    let elem = field;
    if ( elem.length && (/input/i).test(elem[0].tagName)) {
        elem = [...elem].reduce((a, e, i) => e.checked ? e : a);
    }
    return elem;
}

export function hasUserInput(elem) {
    return (/input|select|textarea/i).test(elem.tagName);
}

export function renderFieldMessage(fieldData) {
    const messageElement = fieldData.parent.querySelector('p');
    const p = messageElement || document.createElement('p');
    p.innerHTML = fieldData.errors || '';
    !messageElement && fieldData.parent.appendChild(p);
}

export function clearFieldMessage(fieldData) {
    const messageElement = fieldData.parent.querySelector('p');
    messageElement && fieldData.parent.removeChild(messageElement);
}

export function errorTypes(elem, options) {
    const messages = options.errorMessages(elem);
    return Object.keys(messages).filter(k => elem.validity[k]).map(m => messages[m]);
}