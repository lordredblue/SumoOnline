var http = require('http');
var fs = require('fs'); 
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var mongoURL = "mongodb://localhost:27017/mydb";

http.createServer(function(req, res) {  
	//console.log("hello");
	var q = url.parse(req.url, true);
	//connect to database 
	if(q.pathname == "/graphdisplay.html/getTable"){
		var string = "";
		MongoClient.connect(mongoURL, function(err, client) {
			if (err) throw err;
			
			var db = client.db('tempDatabase');
			db.collection('tempDatabase').find({}).toArray(function(err, result) {
				if (err) throw err;
				
				if(result.length != 0){
					for (var i = 0; i < result.length-1; i++) {
						string = string.concat(result[i].response + "," + result[i].input + ",");
					}
					string = string.concat(result[result.length - 1].response + "," + result[result.length -1].input);
				}
				//console.log(string);
				res.write(string);
				res.end();
				client.close();
			});
		});	
			 
	}
		
	else if(q.pathname == "/index.html/getData") {
		var string = "";
		MongoClient.connect(mongoURL, function(err, client) {
			if (err) throw err;
			
			var db = client.db('tempDatabase');
			db.collection('tempDatabase').find({}).toArray(function(err, result) {
			if (err) throw err;
				 
				for (var i = 0; i < result.length; i++) {
					string = string.concat(" " + result[i].response+ ",");	
				}
				console.log(string);
				res.write(string);
				return res.end();
				client.close();
			});
		});		  
	}
	
	else if(q.search != "")  { 
		var qdata = q.query;
		//mongo
		MongoClient.connect(mongoURL, function(err, client) {
			if (err) throw err;
			
				var db = client.db('tempDatabase');
				db.collection('tempDatabase').insertOne({response: qdata.q,input: qdata.i})
				console.log("1 doc inserted");
				//console.log(qdata.q);
				//console.log(qdata.i);
				client.close();
		});		
		
		//mongo
		res.write(qdata.q);
		res.end();
		
		function sendDataToTable(celsius,fahrenheit) {
		var temps = celsius.concat("," + fahrenheit); 
		res.writeHead(200, {'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache', 'Connection': 'keep-alive'});
		console.log(temps);	
		}
		sendDataToTable(qdata.q,qdata.i);
    }
  
	else if (q.pathname == "/index.html/delete"){
		MongoClient.connect(mongoURL, function(err, client) {
			if (err) throw err;
			
			var db = client.db('tempDatabase');
			var myquery = {};
			db.collection('tempDatabase').deleteMany(myquery, function(err, obj) {
				if (err) throw err;
				
				console.log(obj.result.n + " document(s) deleted");
				res.write("");
				res.end();
				client.close();
			});
		});
	
	} 
	
	else {
		var filename = "." + q.pathname;
		fs.readFile(filename, function(err, data) {
			if (err) {
				res.writeHead(404, {'Content-Type': 'text/html'});
				return res.end("404 Not Found");
			}
		
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			return res.end();
		});
	}
}).listen(8888, '0.0.0.0');
console.log('Server running at http://0.0.0.0.8888');



