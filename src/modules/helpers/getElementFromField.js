export default field => {
    let elem = field;
    if ( elem.length && (/input/i).test(elem[0].tagName)) {
        elem = [...elem].reduce((a, e, i) => e.checked ? e : a);
    }
    return elem;
}