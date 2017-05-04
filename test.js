import test from 'ava';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const Loader = require('node-es-module-loader');
const loader = new Loader();

const { document } = (new JSDOM(`<!DOCTYPE html>`)).window;
const form = document.createElement('form');

form.name = "test";
document.body.appendChild(form);

function makeElm(DOMSTR){
	const frag = document.createElement('div');
	frag.innerHTML = DOMSTR;
	const elem = frag.firstChild;
	form.appendChild(elem);
	return elem;
}
//
const input = makeElm(`<input type="text" name="name" id="id" value="test"/>`);

// const radios = [
// 	makeElm('input', 'type:radio','name:radio','id:radio1','value:1'),
// 	makeElm('input', 'type:radio','name:radio','id:radio2','value:2','checked:checked'),
// 	makeElm('input', 'type:radio','name:radio','id:radio3','value:3')
// ];
const getKeyJS = loader.import('./src/modules/helpers/getKey.js');
const getValueJS = loader.import('./src/modules/helpers/getValue.js');
//
//
// test('Get radio', async t => {
// 	const getkey = await getKeyJS;
// 	t.is(getkey.default(radios[1]), 'radio');
// });
// test('Get Radio Value', async t => {
// 	const getValue = await getValueJS;
// 	t.is(getValue.default(radios[1]), '2');
// });
//
test('Get Key', async t => {
	const getkey = await getKeyJS;
	t.is(getkey.default(input), 'id');
});
test('Get Value', async t => {
	const getValue = await getValueJS;
	t.is(getValue.default(input), 'test');
});
