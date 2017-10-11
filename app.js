var express =require('express');
var app =express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("main_login",function(req,res){
  console.log("Database created!");
  db.close();
	});
});