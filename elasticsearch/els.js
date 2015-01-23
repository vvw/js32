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

// request({ url:'http://cnb.cx/1vtyQyv', method: 'HEAD' }, function(err, res) {
//     console.log(err, res);
// });

function head(url, cb) {
  var re = {err : false};
  request (
      {
        url: url,
        method: 'HEAD'
      },
      function (error, res) {
        if ( error ) {re.err = error.message;}
        re.statusCode = res.statusCode;
        cb (re);
        //re.headers = res.headers;
        //re.data = s2j ( body.toString() );
        
      }
  )
}

function put(url, json, cb) {
	var re = {err : false};
	request(
  		{
  			url: url,
    		method: 'PUT',
    		json: json
  		},
  		function(error, request, body) {
    		if (error) {re.err = error.message;}
    		re.statusCode = request.statusCode;
    		re.data = body;
    		cb (re);
  		}
	);
}

// put, no data to be sent
function put2(url, cb) {
	var re = {err : false};
	request(
  		{
  			url: url,
    		method: 'PUT',
  		},
  		function(error, request, body) {
    		if (error) {re.err = error.message;}
    		re.statusCode = request.statusCode;
    		re.data = body;
    		cb (re);
  		}
	);
}

function del(url, cb) {
	var re = {err : false};
	request(
  		{
  			url: url,
    		method: 'DELETE',
  		},
  		function(error, request, body) {
    		if (error) {re.err = error.message;}
    		re.statusCode = request.statusCode;
    		re.data = body;
    		cb (re);
  		}
	);
}


function post(url, json, cb) {
	var re = {err : false};
	request(
  		{
  			url: url,
    		method: 'POST',
    		json: json
  		},
  		function(error, request, body) {
    		if (error) {re.err = error.message;}
    		re.statusCode = request.statusCode;
    		re.data = body;
    		cb (re);
  		}
	);
}

module.exports = {
  j2s       : j2s,
  s2j       : s2j,
  get       : get,
  head      : head,
  put       : put,
  put2      : put2,
  del       : del,
  post      : post,
  pretty    : pretty,
  data      : data
}
