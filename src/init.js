'use strict';

const getElems = classname => document.getElementsByClassName(classname);

const forms = getElems('forms');

System.import('./modules/lib/domready.js').then(module => {

    module.default(() => {

        forms.length && System.import('./modules/addValidation.js').then(module => {
            [...forms].forEach(form => module.default(form));
        });

    });
});


