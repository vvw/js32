'use strict';

var moment = require('moment')

// current time
function now() {
  return moment().format('MMMM Do YYYY, h:mm:ss a');
}

function setHeader(app) {
  app.use(
           function(req, res, next){
             res.set(
                     {  
                        'Content-Type': 'text/html',
                        'Access-Control-Allow-Origin' : '*',
                        'Access-Control-Allow-Methods' : 'POST, GET, PUT, DELETE, OPTIONS',
                        'Access-Control-Allow-Credentials' : false,
                        'Access-Control-Max-Age' : '86400', // 24 hours
                        'Access-Control-Allow-Headers' : 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
                     }
             )
             console.log( '%s %s %s', req.method, req.url, now() );
             next();
          }
 );
}
exports.setHeader = setHeader;



























