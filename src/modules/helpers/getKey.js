export default elem => {
	elem = (/select/i).test(elem.tagName) ? elem : elem[0] || elem;
	return (/radio/i).test(elem.type) ? elem.name || elem.id : elem.id || elem.name;
};
