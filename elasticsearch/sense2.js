
POST http://localhost:9200/test_nested_statistical
{
    "settings": {"number_of_shards": 1},
    "mappings": {
        "object": {
            "properties": {
                "title": {"type": "string"},
                "tags": {
                    "type": "string",
                    "index": "not_analyzed"
                },
                "prices": {"type": "nested",
                    "properties": {
                        "price": {"type": "float"},
                        "type": {
                            "type": "string",
                            "index": "not_analyzed"
                        }
                    }
                }
            }
        }
    }
}

PUT http://localhost:9200/test_nested_statistical/object/1
{
    "title" : "Test One",
    "tags" : ["one", "two", "three"],
    "prices" : [{"price" : 20,"type": "TYPEONE"},{"price" : 30,"type": "TYPETWO"}]
}

PUT http://localhost:9200/test_nested_statistical/object/2
{
    "title" : "Test Two",
    "tags" : ["one", "four"],
    "prices" : [{"price" : 10,"type": "TYPEONE"},{"price" : 15,"type": "TYPETWO"}]
}

POST http://localhost:9200/test_nested_statistical/object/_search
{
    "query" : {
                "terms" : {"tags":["one"]}
        },
        "facets" : {
                "priceone" : {
                        "statistical" : {
                                "field" : "prices.price"
                        },
                        "global" : true,
                        "facet_filter" : {
                                "nested" : {
                                        "path" : "prices",
                                        "query" : {
                                                "terms" : {
                                                        "prices.type" : ["TYPEONE"]
                                                }
                                        },
                                        "join" : false
                                }
                        },
                        "nested" : "prices"
                }
        }
}

POST http://localhost:9200/test_nested_statistical/object/_search
{
    "query" : {
                "terms" : {"tags":["one"]}
        },
        "facets" : {
                "priceone" : {
                        "statistical" : {
                                "field" : "prices.price"
                        },
                        "global" : true,
                        "facet_filter" : {
                                "and" : [
                                    {
                                        "nested" : {
                                            "path" : "prices",
                                            "query" : {
                                                    "terms" : {
                                                            "prices.type" : ["TYPEONE"]
                                                    }
                                            },
                                            "join" : false
                                        }
                                    },{
                                        "terms" : {
                                                "tags" : ["one"]
                                        }
                                    }
                                ]

                        },
                        "nested" : "prices"
                }
        }
}


POST http://localhost:9200/test_nested_statistical/object/_search
{
    "query" : {
                "terms" : {"tags":["one"]}
        },
        "facets" : {
                "priceone" : {
                        "statistical" : {
                                "field" : "prices.price"
                        },
                        "global" : true,
                        "facet_filter" : {
                                "and" : [
                                    {
                                        "nested" : {
                                            "path" : "prices",
                                            "query" : {
                                                    "terms" : {
                                                            "prices.type" : ["TYPEONE"]
                                                    }
                                            },
                                            "join" : false
                                        }
                                    },{
                                        "ids" : {
                                                "type" : "object",
                                                "values" : ["1"]
                                        }
                                    }
                                ]

                        },
                        "nested" : "prices"
                }
        }
}


POST http://localhost:9200/test_nested_statistical/object/_search?size=0
{
  "query": {
    "terms": {
      "tags": [
        "one"
      ]
    }
  },
  "aggs": {
    "all_docs": {
      "global": {},
      "aggs": {
        "tags_one": {
          "filter": {
            "term": {
              "tags": "one"
            }
          },
          "aggs": {
            "prices": {
              "nested": {
                "path": "prices"
              },
              "aggs": {
                "type_one": {
                  "filter": {
                    "term": {
                      "prices.type": "TYPEONE"
                    }
                  },
                  "aggs": {
                    "min_max": {
                      "stats": {
                        "field": "prices.price"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}






