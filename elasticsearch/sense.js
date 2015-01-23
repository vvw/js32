
GET http://localhost:9200/authors/author/_search
GET http://localhost:9200/authors/nested_author/_search
DELETE http://localhost:9200/authors/author/
DELETE http://localhost:9200/authors/nested_author/

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

GET http://localhost:9200/authors/nested_author/_search











