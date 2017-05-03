import test from 'ava';

const Window = require('window');
const { document } = new Window();

const Loader = require('node-es-module-loader');
const loader = new Loader();

const form = document.createElement('form');
form.name = 'test';

function makeElm(selector, ...args){
	const elem = document.createElement(selector);
	args.forEach(arg => {
		arg = arg.split(':');
		elem[arg[0]] = arg[1];
	});
	form.appendChild(elem);
	return elem;
}

const input = makeElm('input', 'type:text','name:name','id:id','value:test');
const radios = [
	makeElm('input', 'type:radio','name:radio','id:radio1','value:1'),
	makeElm('input', 'type:radio','name:radio','id:radio2','value:2','checked:checked'),
	makeElm('input', 'type:radio','name:radio','id:radio3','value:3')
];
const getKeyJS = loader.import('./src/modules/helpers/getKey.js');
const getValueJS = loader.import('./src/modules/helpers/getValue.js');


test('Get radio', async t => {
	const getkey = await getKeyJS;
	t.is(getkey.default(radios[1]), 'radio');
});
test('Get Radio Value', async t => {
	const getValue = await getValueJS;
	t.is(getValue.default(radios[1]), '2');
});

test('Get Key', async t => {
	const getkey = await getKeyJS;
	t.is(getkey.default(input), 'id');
});
test('Get Value', async t => {
	const getValue = await getValueJS;
	t.is(getValue.default(input), 'test');
});
