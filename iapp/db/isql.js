'use strict';

var std = require('../std.js');
var fs  = require('fs');

var mysql = require('mysql');


var insert_callback = function(err, result) {
  if (err) throw err;
}

function createConnection(ip, uname, pwd) {
  var connection = mysql.createConnection({
  host     : ip,
  user     : uname,
  password : pwd  
  });
  return connection;
} 

function connect(connection) {
  connection.connect();
}

function close(connection) {
  connection.end();
}

function insert_user() {
  var connection =  createConnection('localhost', 'root', 'root');
  var a_user = { 'id' : 4, 'name' : 'ubt4'};
  var sq_insert = 'insert into test.user set ?';
  var query = connection.query(sq_insert, a_user, insert_callback);
  console.log(query.sql);
  close(connection);
}

function insert_json(jsondata) {
  var connection =  createConnection('localhost', 'root', 'root');
  connect(connection);
  var json = {'json' : jsondata};
  var sq_insert = 'insert into test.json set ?';
  var query = connection.query(sq_insert, json, insert_callback);
  console.log(query.sql);
  close(connection); 
}

function query(sq, callback) {
  var connection =  createConnection('localhost', 'root', 'root');
  connect(connection);
  connection.query(sq, callback);
  close(connection);
}

function query_user() {
  var callback = function(err, rows, fields) {
    if (err) throw err;
    console.log('user name is: ', rows[0].name);
  }
  var sq = 'select * from test.user';
  query(sq, callback);
}

function query_json() {
  var callback = function(err, rows, fields) {
    if (err) throw err;
    console.log('user name is: ', rows[0].json);
  }
  var sq = 'select * from test.json';
  query(sq, callback);
}

function do_query() {
  query_user();
  query_json();
}

function do_insert() {
  //insert_user();
  var dt = std.data('../softMenuJson.js@');
  insert_json(dt);
}

//do_query();
//do_insert();

// callback 是一个回调函数，此函数唯一的参数用来接收查询返回的结果。
function get_json_from_mysql(callback) {
  var callback_query = function(err, rows, fields) {
    if (err) throw err;
    callback(rows[0].json);
    //console.log('user name is: ', rows[0].json);
  }
  var sq = 'select * from test.json';
  query(sq, callback_query);
  
}

var callback_get_json = function(json) {
  console.log('user name is: ', json);
}

//get_json_from_mysql(callback_get_json);


//var sq = 'SELECT 1 + 1 AS solution';

exports.get_json_from_mysql = get_json_from_mysql;




