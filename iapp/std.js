
var fs = require('fs');

// ���ļ�
function data(fname) {
    return fs.readFileSync(fname, 'utf-8');
}

// ������json
function data(fname) {
    return fs.readFileSync(fname, 'utf-8');
}

// josn תstring
function j2s(j) {
    return JSON.stringify(j);
}

// string תjson
function s2j(s) {
    return JSON.parse(s);
}

exports.data = data;

