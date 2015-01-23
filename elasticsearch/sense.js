
GET http://localhost:9200/authors/author/_search
GET http://localhost:9200/authors/nested_author/_search
GET http://localhost:9200/magazine/time/_search
DELETE http://localhost:9200/authors/author/
DELETE http://localhost:9200/authors/nested_author/
DELETE http://localhost:9200/magazine/time/

PUT http://localhost:9200/authors/author/1
{
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
}

PUT http://localhost:9200/authors/author/2
{
  "name": "Alastair Reynolds",
  "books": [
    {
      "name": "Revelation Space",
      "genre": "scifi",
      "publisher": "penguin"
    }
  ]
}

POST http://localhost:9200/authors/author/_search
{
  "query": {
    "filtered": {
      "query": {
        "match_all": {}
      },
      "filter": {
        "and": [{
          "term": {
            "books.publisher": "penguin"
          }
        }, {
          "term": {
            "books.genre": "scifi"
          }
        }]
      }
    }
  }
}

POST http://localhost:9200/authors/nested_author/_mapping
{
  "nested_author":{
    "properties":{
      "books": {
        "type": "nested"
      }
    }
  }
}

POST http://localhost:9200/magazine/time/_mapping
{
  "time":{
    "properties":{
      "sentence": {
        "type": "nested"
      }
    }
  }
}

PUT http://localhost:9200/authors/nested_author/1
{
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
}

PUT http://localhost:9200/magazine/time/1
{
  "name": "Mr. Harding's Defeat",
  "sentence": [
    {
      "en": "Seeking only the nation's welfare, Mr. Harding has suffered defeat at the hands of Congress.",
      "cn": "cn1",
      "ja": "ja1"
    },
    {
      "en": "Not only that, but the man who was elected President by the largest plurality in history has been reproved by a Congress controlled by his own party.",
      "cn": "cn2",
      "ja": "ja2"
    }
  ]
}

PUT http://localhost:9200/authors/nested_author/2
{
  "name": "Alastair Reynolds",
  "books": [
    {
      "name": "Revelation Space",
      "genre": "scifi",
      "publisher": "penguin"
    }
  ]
}

POST http://localhost:9200/authors/nested_author/_search
{
  "query": {
    "filtered": {
      "query": {"match_all": {}},
      "filter": {
        "nested": {
          "path": "books",
          "query":{
            "filtered": {
              "query": { "match_all": {}},
              "filter": {
                "and": [
                  {"term": {"books.publisher": "penguin"}},
                  {"term": {"books.genre": "scifi"}}
                ]
              }
            }
          }
        }
      }
    }
  }
}

POST http://localhost:9200/magazine/time/_search
{
  "query": {
    "filtered": {
      "query": {"match_all": {}},
      "filter": {
        "nested": {
          "path": "sentence",
          "query":{
            "filtered": {
              "query": { "match_all": {}},
              "filter": {
                "and": [
                  {"term": {"sentence.cn": "cn1"}},
                  {"term": {"sentence.ja": "ja1"}}
                ]
              }
            }
          }
        }
      }
    }
  }
}

GET http://localhost:9200/authors/nested_author/_search
GET http://localhost:9200/magazine/time/_search










