export default fn => (/d$|^i|^c/).test(document.readyState) ? requestAnimationFrame(fn) : document.addEventListener('DOMContentLoaded', fn);
