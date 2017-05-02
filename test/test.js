import test from 'ava';

test('foo', t => {
	t.pass();
});

test('bar', async t => {
	const bar = Promise.resolve('bar');

	t.is(await bar, 'bar');
});

function makeElm(selector){
	return document.createElement(selector);
}
test('Get Key', t => {

		//.import('/dist/modules/helpers/getKey.js').then(()=>{});
	const input = document.createElement('input');
	// input.type = 'text';
	// input.name = 'name';
	// input.id = 'id';
	document.body.appendChild(input);
	t.is(document.querySelector('input'), input);
});
