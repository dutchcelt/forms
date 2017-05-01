export default field => field.value || (!field.tagName && [...field].reduce((a, e) => e.checked ? e.value : a, field.value));

