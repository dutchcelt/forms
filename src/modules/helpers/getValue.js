export default field => field.value || (!field.tagName && [...field].reduce((a, e, i) => e.checked ? e.value : a, field.value));

