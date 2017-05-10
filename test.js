import test from 'ava';

const Loader = require('node-es-module-loader');
const loader = new Loader();
const getKeyJS = loader.import('./src/modules/helpers/getKey.js');
const getValueJS = loader.import('./src/modules/helpers/getValue.js');
const getElementFromFieldJS = loader.import('./src/modules/helpers/getElementFromField.js');
const creatMapJS = loader.import('./src/modules/helpers/createMap.js'); // doesn't work :(

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = (new JSDOM(`<!DOCTYPE html><html><body></body></html>`)).window;

const form = document.createElement('form');
form.name = "test";
document.body.appendChild(form);

function makeElm(domStringArray){
	const nodelist = [];
	domStringArray.forEach(str => {
		const frag = document.createElement('div');
		frag.innerHTML = str;
		const elem = frag.firstChild;
		form.appendChild(elem);
		nodelist.push(elem);
	});
	return nodelist;
}


// RADIOS
const radios = makeElm([
	`<input type="radio" name="radio" id="radio0" value="0"/>`,
	`<input type="radio" name="radio" id="radio1" value="1" checked="checked"/>`,
	`<input type="radio" name="radio" id="radio2" value="2"/>`
]);

test('Get radio', async t => {
	const getkey = await getKeyJS;
	t.is(getkey.default(radios[1]), 'radio');
});
test('Get Radio Value', async t => {
	const getValue = await getValueJS;
	t.is(getValue.default(radios[2]), '2');
});

test('Get checked element from Radios', async t => {
	const getElementFromField = await getElementFromFieldJS;
	const elem = getElementFromField.default(radios);
	t.is(elem.checked, true);
});



// TEXT

const input = makeElm([
	`<input type="text" name="text" id="textid" value="test"/>`
]);

test('Get Key', async t => {
	const getkey = await getKeyJS;
	t.is(getkey.default(input[0]), 'textid');
});
test('Get Value', async t => {
	const getValue = await getValueJS;
	t.is(getValue.default(input[0]), 'test');
});
