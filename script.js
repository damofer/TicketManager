var express = require('express'),
    mysql = require('mysql'),
    path = require('path'),
	bodyParser = require('body-parser');

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
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


app.get('/getTicket/:id',function(req,resp){
	// about mysql
	var id = req.params.id;
	connection.getConnection(function(error,tempCont){
		if(!!error){
			tempCont.release();
			console.log('Error');

		}else{
			console.log('Connected!');

			tempCont.query("SELECT *  FROM `tickets` WHERE ID = "+id,function(error,rows,fields){
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

app.get('/getTicketMessages/:id',function(req,resp){
	// about mysql
	 var id = req.params.id;
	connection.getConnection(function(error,tempCont){
		if(!!error){
			tempCont.release();
			console.log('Error');

		}else{
			console.log('Connected!');
			var q = "SELECT m.ID AS 'MESSAGE_ID', m.TICKET_ID, u.ID AS 'USER_ID',  m.TIMESTAMP AS 'DATE_TIME', m.MESSAGE,u.USERNAME,u.EMAIL,u.ROL FROM messages AS m INNER JOIN users AS u ON m.USER_ID = u.ID WHERE m.TICKET_ID ="+id;
			tempCont.query(q,function(error,rows,fields){
				tempCont.release();
				if(!!error){
					console.log("Error with the query");
				}else{
					resp.json(rows);
				}
			})
		}
	});

});
app.post('/addMessage', function(req, res) {
    var message = req.body.message,
       	user_id = req.body.user_id;
        ticket_id = req.body.ticket_id;

        connection.getConnection(function(error,tempCont){
		if(!!error){
			tempCont.release();
			console.log('Error');

		}else{
			
			var q = "INSERT INTO messages (TICKET_ID, USER_ID, MESSAGE ) VALUES ("+ticket_id+","+user_id+",'"+message+"')";
			// console.log(q);
			tempCont.query(q,function(error,result){
				tempCont.release();
				if(!!error){
					res.end(res.statusCode.toString());
					
				}else{
					console.log("message inserted");
					
					
					res.end(res.statusCode.toString());
				}
			})
		}
	});


    
});

// vendor scripts
app.get('/vendor/angular.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'node_modules', 'angular', 'angular.js'));
});
app.get('/vendor/angular-route.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'node_modules', 'angular-route', 'angular-route.js'));
});


app.listen(3000);