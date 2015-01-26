
DELETE http://localhost:9200/myindex/
PUT http://localhost:9200/myindex/
POST http://localhost:9200/myindex/
{
 "mappings":{
   "eType":{
      "properties":{
         "eData":{
            "type": "nested",
            "include_in_parent": true,
            "include_in_root": true,
            "properties": {
                  "bData": {
                      "type": "nested"
                  },
                  "contact": {
                      "type": "nested"
                  }
            }
         }
       }
    }
  }
}

PUT http://localhost:9200/myindex/eType/1
{
  "eId": "123",
  "eData": {
    "bData": {
      "reviewList": [
        {
          "id": "1950158",
          "author": "fancylaw",
          "text": "I love this Beauty salon. The staff is friendly and professional. ",
          "rating": "5",
          "date": "2007-07-23"
        },
        {
          "id": "1950159",
          "author": "mmeylor",
          "text": "I called & asked the price of a haircut & was told $45.  When I got there I found out that if I wanted it blow dryed it would actually be $80!  ",
          "rating": "1",
          "date": "2009-03-20"
        }
      ],
      "categoryList": [
        "Beauty & Spas",
        "Hair Care & Salons",
        "Wigs Toupees & Hairpieces"
      ]
    },
    "contact": {
      "streetAddress": "124 1/2 N Larchmont Blvd",
      "phone": "3234612979",
      "website": "http://www.jessica.com",
      "country": "USA",
      "addressLocality": "Los Angeles",
      "postalCode": "90004",
      "email": "ssh...@gmail.com",
      "addressRegion": "CA",
      "googlePlusUrl": "http://googleplus",
      "name": "Jessica's Beauty",
      "twitterUrl": "http://twitter"
    }
  }
}

GET http://localhost:9200/myindex/eType/1

POST http://localhost:9200/myindex/eType/_search
{
 "fields" : ["eData.contact.name"],
 "query": {
       "nested": {
           "path": "eData.contact",
           "score_mode": "max",
           "query": {
               "query_string": {
                   "fields": [
                       "eData.contact.name"
                   ],
                   "query": "Beauty"
               }
           }
       }
   }
}





























