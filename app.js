var express =require('express');
var app =express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

var port= process.env.PORT || 3000;
app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine','ejs');

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("main_login",function(req,res){
  console.log("Database created!");
  db.close();
	});
});

/* Controllers */

//var register_user =require('./controllers/register_user.js');
var setupControllers =require('./controllers/setupControllers.js');

app.get('/',function(req,res){
	//console.log("here");
	res.render('register');
});

app.get('/register',function(req,res)
	{
var starterTodos =[
			{
				username: req.query.username,
				todo: req.query.password,
			}
		];
		MongoClient.connect(url,function(err,db){
			if(err) throw err;
			db.collection("main_login").insertMany(starterTodos,
				function(err,resu){
					if(err) throw err;
					res.render('register');
				});
			db.close();
		});
	});	

//register_user(app);
setupControllers(app);
app.listen(port);