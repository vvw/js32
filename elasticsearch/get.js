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

function get2(url, json, cb) {
	var re = {err : false};
	request(
  		{
  			url: url,
    		method: 'get',
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

function POST(url, json, cb) {
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

var j = {
	"title" : "Mr. Harding's Defeat",
	"content" : html,
	tags : ["time", "1923", "Congress"] 
};

 //put ('http://127.0.0.1:9200/magazine/time/1', j, function (re) {
	//console.log(pretty(re));
	// get ('http://127.0.0.1:9200/magazine/time/1', function (re) {
	get ("http://127.0.0.1:9200/magazine/time/_search?q=title:Mr. Harding's Defeat", function (re) {
		//console.log(pretty(re));
 	})
// })

	get2 ("http://127.0.0.1:9200/magazine/time/_search", tt,function (re) {
		//console.log(pretty(re));
 	})

   // GET /megacorp/employee/_search

    var tt={

        "query" : {

            "match" : {

                "title" : "Mr. Harding's Defeat"

            }

        }

    }

console.log ('hi,,')


function putdata () {
	var d1 = {
    "first_name" : "John",

    "last_name" :  "Smith",

    "age" :        25,

    "about" :      "I love to go rock climbing",

    "interests": [ "sports", "music" ]

	};
	var d2 = {

    "first_name" :  "Jane",

    "last_name" :   "Smith",

    "age" :         32,

    "about" :       "I like to collect rock albums",

    "interests":  [ "music" ]
	};
	var d3 = {

    "first_name" :  "Douglas",

    "last_name" :   "Fir",

    "age" :         35,

    "about":        "I like to build cabinets",

    "interests":  [ "forestry" ]
	};
	put ('http://127.0.0.1:9200/megacorp/employee/1', d1, function (re) {
		//console.log(pretty(re));
	});
	put ('http://127.0.0.1:9200/megacorp/employee/2', d2, function (re) {
		//console.log(pretty(re));
	});
	put ('http://127.0.0.1:9200/megacorp/employee/3', d3, function (re) {
		//console.log(pretty(re));
	});
}
putdata ();

	get ('http://127.0.0.1:9200/megacorp/employee/1', function (re) {
		//console.log(pretty(re));
	});

	POST ('http://127.0.0.1:9200/megacorp/employee/_search', {"query":{"match":{"last_name":"Smith"}}}, function (re) {
		console.log(pretty(re));
	});

