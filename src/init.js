
const getElems = classname => document.getElementsByClassName(classname);

const forms = getElems('forms');

forms.length && SystemJS.import('./modules/addValidation.js').then(module => {
    [...forms].forEach(form => module.default(form));
});

