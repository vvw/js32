'use strict'
module.paths.push('G:/Users/w7/AppData/Roaming/npm/node_modules');
var http = require('http');
var request = require('request');
var util = require('util');
var fs = require('fs');
var prettyjson = require('prettyjson');

function j2s(j) {
    return JSON.stringify(j);
}

// string 转json
function s2j(s) {
    return JSON.parse(s);
}

function data(fname) {
    return fs.readFileSync(fname, 'utf-8');
}

var html = data("0,8816,881304,00.html");
//console.log ( data("0,8816,881304,00.html") );

function get(url, cb) {
  var re = {err : false};
  http.get(url, function(res) {
    re.statusCode = res.statusCode;
    res.on("data", function(chunk) {
      re.data = s2j(chunk.toString());
      cb (re);
    });
  }).on('error', function(e) {
    re.err = e.message;
    cb (re);
  });
}

var j = {
	"title" : "Mr. Harding's Defeat",
	"content" : html,
	tags : ["time", "1923", "Congress"] 
}

request(
  { url: 'http://127.0.0.1:9200/magazine/time/1',
    method: 'PUT',
    json: j
  },
  function(error, request, body) {
    if (error) console.log(error);
    //console.log (request.statusCode);
    //console.log(body);
  }
)

get ("http://127.0.0.1:9200/_cluster/health?pretty", function(re) {
  //console.log (re);
  console.log(prettyjson.render(re, {noColor: true}));
});

get ("http://127.0.0.1:9200/magazine/time/1", function(re) {
  //console.log (re);
});

// (function(){
//   "use strict";
// })();

console.log('hi,,')

