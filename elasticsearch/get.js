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

// pretty format josn
function pretty (json) {
	return prettyjson.render(json, {noColor: true})	
}

function data(fname) {
    return fs.readFileSync(fname, 'utf-8');
}

var html = data("0,8816,881304,00.html");

function get(url, cb) {
	var re = {err : false};
	request(
  		{
  			url: url,
    		method: 'get'
  		},
  		function(error, request, body) {
    		if (error) {re.err = error.message;}
    		re.statusCode = request.statusCode;
    		re.data = s2j(body.toString());
    		cb (re);
  		}
	)
}

function put(url, json, cb) {
	var re = {err : false};
	request(
  		{
  			url: url,
    		method: 'PUT',
    		json: j
  		},
  		function(error, request, body) {
    		if (error) {re.err = error.message;}
    		re.statusCode = request.statusCode;
    		re.data = body;
    		cb (re);
  		}
	);
}

var j = {
	"title" : "Mr. Harding's Defeat",
	"content" : html,
	tags : ["time", "1923", "Congress"] 
}

 put ('http://127.0.0.1:9200/magazine/time/1', j, function (re) {
	console.log(pretty(re));
	get ('http://127.0.0.1:9200/magazine/time/1', function (re) {
		console.log(pretty(re));
 	})
 })

console.log ('hi,,')

