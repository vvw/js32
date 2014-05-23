'use strict';
var express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    bodyParser = require('body-parser'),
    fs = require('fs');

app.use(cookieParser());
app.use(expressSession({secret:'somesecrettokenhere'}));
app.use(bodyParser());
app.use(
  function(req, res, next) {
  //res.cookie('rememberme', 'yes', { maxAge: 900000, httpOnly: false});
    res.set(
      {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Rememberme' : true,
        'Access-Control-Allow-HttpOnly' : false,
        'Access-Control-Allow-Methods' : 'POST, GET, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials' : true,//false,
        'Access-Control-Max-Age' : '86400', // 24 hours
        'Access-Control-Allow-Headers' : 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
      }
)
    console.log('%s %s', req.method, req.url);
    next();
}
);

// 读本地json
function data(fname) {
    return fs.readFileSync(fname, 'utf-8');
}

// IP + 端口号访问会调用此方法
app.get('/', function (req, res) {
  res.cookie('bar', 'baz');
  var html = '<form action="/" method="post">' +
             'Your name: <input type="text" name="userName"><br>' +
             '<button type="submit">Submit</button>' +
             '</form>';
  if (req.session.userName) {
    html += '<br>Your username from your session is: ' 
            + req.session.userName
            + '<br>cookies.bar is: ' + req.cookies.bar;
  }
  var htm = '<!doctype html><html><head></head><body>' +
            html +
            '</body></html>';
  res.send(htm);
});

// local:80/API/1.0/json/sys/Quote  // 192.168.0.92:80/API/1.0/json/sys/Quote
app.get('/API/:version/:format/:system/:arg', function(req, res) {  // named route parameter  // 命名的远程参数
    req.session.userName = 'aabbcc';// req.body.userName;
    res.cookie('bar', 'baz');
       //res.json(200, { "hello": req.params.arg + JSON.stringify(data)});  // req.params.arg 就是url 最后一个参数的值
    var dt = data('softMenuJson.js');   
    res.json(200, dt);
});

app.get('/aj', function (req, res) {
    var dt = data('aj.html');   
    res.send(dt);
});

app.post('/', function(req, res) {
    req.session.userName = req.body.userName;
    res.redirect('/')
});

// 80 端口监听
app.listen(80, function(){
        console.log("ready captain.");
});


// 访问方法
// curl -i http://localhost:80/API/1.0/json/sys/Quote
