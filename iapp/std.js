
var fs = require('fs');

// 读文件
function data(fname) {
    return fs.readFileSync(fname, 'utf-8');
}

// 读本地json
function data(fname) {
    return fs.readFileSync(fname, 'utf-8');
}

// josn 转string
function j2s(j) {
    return JSON.stringify(j);
}

// string 转json
function s2j(s) {
    return JSON.parse(s);
}

exports.data = data;

