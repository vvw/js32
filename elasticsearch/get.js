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

// healthQ
  get ("http://127.0.0.1:9200/_cluster/health?pretty", function (re) {
    //console.log(pretty(re));
  })

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

	get ("http://127.0.0.1:9200/magazine/time/_search", function (re) {
		//console.log(pretty(re));
 	})

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
		//console.log(pretty(re));
	});

/////////////////////////////
function putdata2() {
var d1= {
  "name": "Multi G. Enre",
  "books": [
    {
      "name": "Guns and lasers",
      "genre": "scifi",
      "publisher": "orbit"
    },
    {
      "name": "Dead in the night",
      "genre": "thriller",
      "publisher": "penguin"
    }
  ]
};
var d2 = {
  "name": "Alastair Reynolds",
  "books": [
    {
      "name": "Revelation Space",
      "genre": "scifi",
      "publisher": "penguin"
    }
  ]
};
	put ('http://127.0.0.1:9200/authors/author/1', d1, function (re) {
		//console.log(pretty(re));
	});
	put ('http://127.0.0.1:9200/authors/author/2', d2, function (re) {
		//console.log(pretty(re));
	});

	POST ('http://127.0.0.1:9200/authors/nested_author/_mapping', {"nested_author":{"properties":{"books":{"type":"nested"}}}}, function (re) {
		//console.log(pretty(re));
	});
	put ('http://127.0.0.1:9200/authors/nested_author/1', d1, function (re) {
		//console.log(pretty(re));
	});
	put ('http://127.0.0.1:9200/authors/nested_author/2', d2, function (re) {
		//console.log(pretty(re));
	});
	

}
putdata2();

// finds both authors - you can’t express that your conditions on published and genre need to match against the same book.
	POST ('http://127.0.0.1:9200/authors/author/_search', 
		{"query":{"filtered":{"query":{"match_all":{}},"filter":{"and":[{"term":{"books.publisher":"penguin"}},{"term":{"books.genre":"scifi"}}]}}}},
		 function (re) {
		//console.log(pretty(re));
	});

// This allows you to say that you are looking for authors where at least one book satisfies both of your criteria.
	POST ('http://127.0.0.1:9200/authors/nested_author/_search', 
		{"query":{"filtered":{"query":{"match_all":{}},"filter":{"nested":{"path":"books","query":{"filtered":{"query":{"match_all":{}},"filter":{"and":[{"term":{"books.publisher":"penguin"}},{"term":{"books.genre":"scifi"}}]}}}}}}}},
		 function (re) {
		//console.log(pretty(re));
	});


function putdata3() {
var mapping = {
  "book": {
    "properties": {
      "author": {
        "type": "object",
        "properties": {
          "name": {
            "type": "object",
            "properties": {
              "firstName": {
                "type": "string",
                "store": "yes"
              },
              "lastName": {
                "type": "string",
                "store": "yes"
              }
            }
          }
        }
      },
      "isbn": {
        "type": "string",
        "store": "yes"
      },
      "englishTitle": {
        "type": "string",
        "store": "yes"
      },
      "year": {
        "type": "integer",
        "store": "yes"
      },
      "characters": {
        "properties": {
          "name": {
            "type": "string",
            "store": "yes"
          }
        }
      },
      "copies": {
        "type": "integer",
        "store": "yes"
      }
    }
  }
};

	// put2 ('http://127.0.0.1:9200/library', function (re) {
	// 	console.log (pretty(re));
	// });

	// del ('http://127.0.0.1:9200/library', function (re) {
	// 	console.log (pretty(re));
	// }); 

	// POST ('http://127.0.0.1:9200/library/book/_mapping', 
	// 	mapping,
	// 	function (re) {
	// 	console.log(pretty(re));
	// });

}

putdata3()

// time
function putdata4() {
  var dt = {
    year: 1923,
    article: {
      title: "Mr. Harding's Defeat ",
      time: "Saturday, Mar. 03, 1923",
      content: [
        "Seeking only the nation's welfare, Mr. Harding has suffered defeat at the hands of Congress. Not only that, but the man who was elected President by the largest plurality in history has been reproved by a Congress controlled by his own party. ",
        "The Ship Subsidy Bill, never popular, and never made so by the President, was politely strangled to death.",
        "The wisdom of some of the most important of the President's appointments has been questioned. For example, Daugherty, Butler, Reily."
      ]
    }
  };
  var mapping = {
    "time": {
      // time 表示名为time 的文件夹中存放的是具有这种结构的documents
      "properties": {
        // properties 表示document 中有这几个字段
        "year": {
          "type": "integer"
        }, // year 表示这个字段的名字， type 表示这个字段的类型
        "title": {
          "type": "string"
        },
        "time": {
          "type": "string"
        },
        "content": {
          "type": "string"
        }
      }
    }
  }

  head ("http://localhost:9200/magazine/", function (re) {
    if (re.statusCode == 404) {
      console.log ('index magazine not exits, create it now...');
      put2 ("http://localhost:9200/magazine/", function (re) {
        console.log (pretty(re));
        // PUT /planet/hacker/_mapping
        console.log ('create mapping now...');
        put ("http://localhost:9200/magazine/time/_mapping", mapping, function (re) {
          console.log (pretty(re));
          get ("http://localhost:9200/magazine/time/_mapping", function (re) {
            console.log (pretty(re));
          });
        });
      });
    } else {
      console.log ('index magazine exits, delete it now...');
      del ("http://localhost:9200/magazine/", function (re) {
        console.log (pretty(re));
      });
      //  PUT /magazine
    }
    //console.log (re);
    //console.log (pretty(re));
  })
  // put ("http://localhost:9200/magazine/_mapping", mapping, function (re) {
  //   console.log (pretty(re));
  // })
  //localhost:9200/books/_mapping?pretty
}
 putdata4()

  // put2 ('http://127.0.0.1:9200/library', function (re) {
  //  console.log (pretty(re));
  // });

// curl -XPUT 'localhost:9200/library'




// {
//   "book": {
//     "properties": {
//       "author": {
//         "type": "object",
//         "properties": {
//           "name": {
//             "type": "object",
//             "properties": {
//               "firstName": {
//                 "type": "string",
//                 "store": "yes"
//               },
//               "lastName": {
//                 "type": "string",
//                 "store": "yes"
//               }
//             }
//           }
//         }
//       },
//       "isbn": {
//         "type": "string",
//         "store": "yes"
//       },
//       "englishTitle": {
//         "type": "string",
//         "store": "yes"
//       },
//       "year": {
//         "type": "integer",
//         "store": "yes"
//       },
//       "characters": {
//         "properties": {
//           "name": {
//             "type": "string",
//             "store": "yes"
//           }
//         }
//       },
//       "copies": {
//         "type": "integer",
//         "store": "yes"
//       }
//     }
//   }
// }

/*
mapping
{
  "cloth": {
    "properties": {
      "name": {
        "type": "string",
        "index": "analyzed"
      },
      "variation": {
        "type": "nested",
        "properties": {
          "size": {
            "type": "string",
            "index": "not_analyzed"
          },
          "color": {
            "type": "string",
            "index": "not_analyzed"
          }
        }
      }
    }
  }
}

document
{
  "name": "Test shirt",
  "variation": [
    {
      "size": "XXL",
      "color": "red"
    },
    {
      "size": "XL",
      "color": "black"
    }
  ]
}

query
curl -XGET 'localhost:9200/shop/cloth/_search?pretty=true' -d '{
  "query": {
    "nested": {
      "path": "variation",
      "query": {
        "bool": {
          "must": [
            {
              "term": {
                "variation.size": "XXL"
              }
            },
            {
              "term": {
                "variation.color": "black"
              }
            }
          ]
        }
      }
    }
  }
}'
*/







