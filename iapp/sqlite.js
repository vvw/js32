'use strict'

var sqlite3 = require('sqlite3').verbose();
var ASSERT  = require('../std').ASSERT;

var modes = {  readonly   : sqlite3.OPEN_READONLY,
	       read_write : sqlite3.OPEN_READWRITE,
               default    : sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE 
}
function opendb_(dbname, mode) {
  ASSERT(dbname != null, 'error: dbname is null');
  var db = new sqlite3.Database(dbname, mode);
  ASSERT(db != null, 'error: can not open db ' + dbname);
  return db;  
}

function opendb(dbname) {
  var db = opendb_(dbname, modes.read_write);
  return db;
}

function opendbRead(dbname) {
  var db = opendb_(dbname, modes.readonly);
  return db;
}

function opendbCreate(dbname) {
  var db = opendb_(dbname, modes.default);
  return db;
}

function serialize(db, funtion_to_be_executes) {
  db.serialize(
   function() {
     funtion_to_be_executes();
   }
  );
}

// callback_out_row 回调函数只有一个参数用于接收查询结果
// callback_complete_err_nrow 查询完成时回调。err 错误码，nrows 行数
function query(dbname, sql, callback_out_row, callback_complete_err_nrows) {
  ASSERT(sql != null, 'error: sql is null');
  ASSERT(callback_out_row != null, 'callback function is null');
  var db = opendbRead(dbname);
  var callback_ = function(err, row) {
     if (err) { throw err; }
     callback_out_row(row);
  }
  if (callback_complete_err_nrows == null) {
    db.each(sql, callback_ );
  } else {
    db.each(sql, callback_ , callback_complete_err_nrows);
  }
  db.close();
}

function test() {
  function print_source(row) {
    console.log(row.Srcid + " " + row.Source + " " + row.Sortid);
  }

  var dbname = './idb';
  var sq = 'select * from Source order by Sortid asc';
  query(dbname, sq, print_source);
}

//test();

module.exports = {
  /*
  opendb     	: opendb,
  opendbRead 	: opendbRead,
  opendbCreate  : opendbCreate,*/
  query         : query
};

//exports.query = query;


/*
var dbname = './idb'; // ':memory:';
var db = opendb(dbname);

function print_source(row) {
  console.log(row.Srcid + " " + row.Source + " " + row.Sortid);
}

db.serialize(function() {
  
  //db.run("CREATE TABLE lorem (info TEXT)");

  //var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  //for (var i = 0; i < 10; i++) {
  //    stmt.run("Ipsum " + i);
  //}
  //stmt.finalize();
  

  var sq = 'select * from Source order by Sortid asc';
  db.each(sq, function(err, row) {
      print_source(row);
  });
  
});
db.close();
*/
