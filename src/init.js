SystemJS.import('./modules/addValidation.js').then(module => {
    module.default(document.forms[0]);
});
