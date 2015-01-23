els = require('./els.js');
var put = els.put;
var put2 = els.put2;
var get = els.get;
var post = els.post;
var pretty = els.pretty;
var head = els.head;
var del = els.del;

function putdata2() {
	var d1 = {
		"name": "Multi G. Enre",
		"books": [{
			"name": "Guns and lasers",
			"genre": "scifi",
			"publisher": "orbit"
		}, {
			"name": "Dead in the night",
			"genre": "thriller",
			"publisher": "penguin"
		}]
	};
	var d2 = {
		"name": "Alastair Reynolds",
		"books": [{
			"name": "Revelation Space",
			"genre": "scifi",
			"publisher": "penguin"
		}]
	};

	var mapping = {
		"time": {
			"properties": {
				"books": {
					"type": "nested"
				}
			}
		}
	};

  head ("http://localhost:9200/magazine/", function (re) {
    if (re.statusCode == 404) {
      console.log ('index magazine not exits, create it now...');
      put2 ("http://localhost:9200/magazine/", function (re) {
        console.log (pretty(re));
        console.log ('create mapping now...');
        put ("http://localhost:9200/magazine/time/_mapping", mapping, function (re) {
          console.log (pretty(re));
          get ("http://localhost:9200/magazine/time/_mapping", function (re) {
            console.log (pretty(re));
             console.log ('adding documents now...');
            put ("http://localhost:9200/magazine/time/1", d1, function (re) {
               console.log (pretty(re));
                get ("http://localhost:9200/magazine/time/1", function (re) {
                  console.log (pretty(re));
                  console.log ('################ now do the query...');
                  var q = {"query":{"filtered":{"query":{"match_all":{}},"filter":{"and":[{"term":{"books.publisher":"orbit"}},{"term":{"books.genre":"scifi"}}]}}}};
                  post ('http://127.0.0.1:9200/magazine/time/_search', q, function (re) {
                    console.log(pretty(re));
                  });
                });
            });
          });
        });
      });  
    } else {
      console.log ('index magazine exits, delete it now...');
      del ("http://localhost:9200/magazine/", function (re) {
        console.log (pretty(re));
      });
    }
  })

	// post('http://127.0.0.1:9200/authors/nested_author/_mapping', {
	// 	"nested_author": {
	// 		"properties": {
	// 			"books": {
	// 				"type": "nested"
	// 			}
	// 		}
	// 	}
	// }, function(re) {
	// 	console.log(pretty(re));
	// });

	// put ('http://127.0.0.1:9200/authors/author/1', d1, function (re) {
	// 	//console.log(pretty(re));
	// });
	// put ('http://127.0.0.1:9200/authors/author/2', d2, function (re) {
	// 	//console.log(pretty(re));
	// });

	// post ('http://127.0.0.1:9200/authors/nested_author/_mapping', {"nested_author":{"properties":{"books":{"type":"nested"}}}}, function (re) {
	// 	//console.log(pretty(re));
	// });
	// put ('http://127.0.0.1:9200/authors/nested_author/1', d1, function (re) {
	// 	//console.log(pretty(re));
	// });
	// put ('http://127.0.0.1:9200/authors/nested_author/2', d2, function (re) {
	// 	//console.log(pretty(re));
	// });


}
putdata2();

// // finds both authors - you can’t express that your conditions on published and genre need to match against the same book.
// 	post ('http://127.0.0.1:9200/authors/author/_search', 
// 		{"query":{"filtered":{"query":{"match_all":{}},"filter":{"and":[{"term":{"books.publisher":"penguin"}},{"term":{"books.genre":"scifi"}}]}}}},
// 		 function (re) {
// 		//console.log(pretty(re));
// 	});
// // "name": "Revelation Space"
// 	var q = {
// 		"query": {
// 			"filtered": {
// 				"query": {
// 					"match_all": {}
// 				},
// 				"filter": {
// 					"nested": {
// 						"path": "books",
// 						"query": {
// 							"filtered": {
// 								"query": {
// 									"match_phrase": {"books.name": "Revelation Space"}
// 									// "regexp": {
//          //    							"books.name": ".*Revelation.*" 
//         	// 						}
// 								},
// 								"filter": {
// 									"and": [{
// 										"term": {
// 											"books.publisher": "penguin"
// 										}
// 									}, {
// 										"term": {
// 											"books.genre": "scifi"
// 										}
// 									}]
// 								}
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 	};
// 	post('http://127.0.0.1:9200/authors/nested_author/_search',
// 		q,
// 		function (re) {
// 		console.log(pretty(re));
// 	});

// function putdata() {
// 	var d1= {
// 		"year": 1923,
// 		"title": "defeat",
// 		"time": "Saturday, Mar. 03, 1923",
//   		"name": "Multi G. Enre",
//   		"sentence": [
//     		{
//       			"en": "Seeking only the nation's welfare, Mr. Harding has suffered defeat at the hands of Congress.",
//       			"zh": "test",
//       			"ja": ""
//     		},
//     		{
//       			"en": "Not only that, but the man who was elected President by the largest plurality in history has been reproved by a Congress controlled by his own party.",
//       			"zh": "",
//       			"ja": ""
//     		}
//   		]
// 	};
// 	var q = {
// 		"query": {
// 			"filtered": {
// 				"query": {
// 					"match_all": {}
// 				},
// 				"filter": {
// 					"nested": {
// 						"path": "sentence",
// 						"query": {
// 							"filtered": {
// 								"query": {
// 									"match_all": {}
// 								},
// 								"filter": {
// 									"and": [{
// 										"term": {
// 											"sentence.en": "Seeking"
// 										}
// 									}, {
// 										"term": {
// 											"sentence.zh": "test"
// 										}
// 									}]
// 								}
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 	};
// 	// put ('http://127.0.0.1:9200/magazine/time/1', d1, function (re) {
// 	// 	console.log(pretty(re));
// 	// });
// 	post ('http://127.0.0.1:9200/magazine/time/_search', 
// 		q,
// 		function (re) {
// 		//console.log(pretty(re));
// 	});
// }

// putdata()