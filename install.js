var path = require('path');
var ncp = require('ncp').ncp;
ncp.limit = 16;


const src = './src/';
const dist = './dist/';
const systemjs = path.resolve(__dirname,'./node_modules/systemjs/dist');

const files = [
    'index.html',
    'init.js'
];
const dirs = [
    'styles'
];
dirs.forEach(dir => {
    ncp(setPath(src, dir), setPath(dist, dir), err => {
        if (err) return console.error(err);
        console.log('copied dir: ', dir);
    });
});

files.forEach(file => {
    ncp(setPath(src, file), setPath(dist, file), err => {
        if (err) return console.error(err);
        console.log('copied', file);
    });
});


systemjs && ncp(systemjs, setPath(dist, 'systemjs'), err => {
    if (err) return console.error(err);
    console.log('systemjs!');
});


function setPath(root, file) {
    return path.resolve(__dirname, root + file);
}
