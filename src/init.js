'use strict';

// Add SystemJS
const SystemJS = document.createElement('script');
SystemJS.async = true;
SystemJS.src = 'systemjs/system-production.js';
document.head.appendChild(SystemJS);

function addValidation() {
    const forms = document.getElementsByClassName('forms');
    forms.length && System.import('./modules/addValidation.js').then(module => {
        [...forms].forEach(form => module.default(form));
    });
}

SystemJS.onload = addValidation;

SystemJS.onerror = () => {
    console.error("Can't load SystemJS ");
};