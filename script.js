var express = require('express'),
    mysql = require('mysql'),
    path = require('path');

var app = express();


app.use(express.static(__dirname +"/public"));
// var connection = mysql.createConnection({
var connection = mysql.createPool({
	connectionLimit: 50,
	// properties ...
	host:'localhost',
	user:'root',
	password:'',
	database:'ticketmanager'
});



app.get('/getAllTickets',function(req,resp){
	// about mysql
	connection.getConnection(function(error,tempCont){
		if(!!error){
			tempCont.release();
			console.log('Error');

		}else{
			console.log('Connected!');

			tempCont.query("SELECT t.ID, t.OWNER_ID, t.STATUS, u.USERNAME ,u.EMAIL  FROM `tickets` AS t INNER JOIN `users`AS u ON t.OWNER_ID = u.ID",function(error,rows,fields){
				tempCont.release();
				if(!!error){
					console.log("Error with the query");
				}else{
					resp.json(rows);
				}
			})
		}
	});

})

app.get('/getTicket/:id',function(req,resp){
	// about mysql
	 var id = req.params.id;
	connection.getConnection(function(error,tempCont){
		if(!!error){
			tempCont.release();
			console.log('Error');

		}else{
			console.log('Connected!');

			tempCont.query("SELECT t.ID, t.OWNER_ID, t.STATUS, u.USERNAME ,u.EMAIL  FROM `tickets` AS t INNER JOIN `users`AS u ON t.OWNER_ID = u.ID WHERE t.ID ="+id,function(error,rows,fields){
				tempCont.release();
				if(!!error){
					console.log("Error with the query");
				}else{
					resp.json(rows);
				}
			})
		}
	});

})

// vendor scripts
app.get('/vendor/angular.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'node_modules', 'angular', 'angular.js'));
});
app.get('/vendor/angular-route.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'node_modules', 'angular-route', 'angular-route.js'));
});


app.listen(3000);