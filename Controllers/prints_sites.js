var mongo=require('mongodb');
var mongoClient=mongo.MongoClient;
var url="mongodb://localhost:27017/pro1";

module.exports = function(app)
{
	app.get('/prints_sites',function(req,res){

		mongoClient.connect(url,function(err,db){
			if(err) throw err;
				var c;
			var c=db.collection("user_site_details").count({},function(err,count)
			{
				if(err) throw err;
					c=count;
			});
			db.collection("user_site_details").find({}).toArray(function(err,resu)
				{
					if(err) throw err;
					var view_screen='<html><body><div><table><tr><th>INDEX  </th><th>  UNIQUE ID  </th><th>  USERNAME  </th><th>  PASSWORD  </th></tr>';
					for(i=0;i<c;i=i+1)
					{
					view_screen=  view_screen +'<tr><td>'+(i+1)+'</td><td>' + resu[i]._id +'</td><td>' + resu[i].username + '</td><td>'+resu[i].password+ '</td><td>'+resu[i].site_list+'</td></tr>';
					//console.log(resu[i].username+i);
					//i=i+1;
					}
					var a;
					a=view_screen+'</table></div></body></html>';
					res.send(a);
				});

			db.close();
		});
		
	});
}