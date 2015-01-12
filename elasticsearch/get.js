'use strict'

var http = require('http');
var request = require('request');
var util = require('util');
var fs = require('fs');

function j2s(j) {
    return JSON.stringify(j);
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
      re.data = chunk.toString();
      cb (re);
    });
  }).on('error', function(e) {
    re.err = e.message;
    cb (re);
  });
}

get ("http://127.0.0.1:9200/_cluster/health?pretty", function(re) {
  console.log (re);
});

http.get("http://127.0.0.1:9200/_cluster/health?pretty", function(res) {
  console.log("Got response: " + res.statusCode);
  res.on("data", function(chunk) {
    console.log(chunk.toString());
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});


var j = {
	"title" : "Mr. Harding's Defeat",
	"content" : html,
	tags : ["time", "1923", "Congress"] 
}
//console.log(j);

// request.post(
//     'http://127.0.0.1:9200/magazine/time/1',
//     j,
//     function (error, response, body) {
//       console.log (response.statusCode);
//         if (!error && response.statusCode == 200) {
//             console.log(body)
//         }
//         if (error) console.log(error)
//     }
// );

request(
  { url: 'http://127.0.0.1:9200/magazine/time/1',
    method: 'PUT',
    json: j
  },
  function(error, request, body) {
    if (error) console.log(error);
    console.log (request.statusCode);
    console.log(body);
  }
)

// (function(){
//   "use strict";
// })();

console.log('hi,,')

