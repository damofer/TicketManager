module.exports = function(app,connection) {

app.get('/getTicket/:id',function(req,resp){
	// about mysql
	var id = req.params.id;
	connection.getConnection(function(error,tempCont){
		if(!!error){
			tempCont.release();
			console.log('Error');

		}else{
			console.log('Connected!');

			tempCont.query("SELECT t.ID AS ID, t.USER_ID AS USER_ID, t.STATUS AS STATUS, u.USERNAME AS USERNAME ,u.EMAIL AS EMAIL  FROM `tickets` AS t INNER JOIN `users`AS u ON t.USER_ID = u.ID WHERE t.ID = "+id,function(error,rows,fields){
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

			tempCont.query("SELECT t.ID, t.USER_ID, t.STATUS, u.USERNAME ,u.EMAIL  FROM `tickets` AS t INNER JOIN `users`AS u ON t.USER_ID = u.ID",function(error,rows,fields){
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
}