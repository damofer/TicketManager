var dbconfig = require('../config/database.js');

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

				tempCont.query("SELECT\
				 t.ID AS ID,\
				 t.USER_ID AS USER_ID,\
				 t.INQUIRY AS INQUIRY,\
				 t.STATUS AS STATUS,\
				 SUBSTR(t.TIMESTAMP,1,10) AS DATE,\
				 u.USERNAME AS USERNAME, \
				 u.EMAIL AS EMAIL \
				 FROM `"+dbconfig.ticket_table+"` AS t \
				 INNER JOIN `"+dbconfig.users_table+"`AS u ON t.USER_ID = u.ID \
				 WHERE t.ID = "+id,
				 function(error,rows,fields){
					tempCont.release();
					if(!!error){
						console.log("Error with the query");
					}else{
						
						if(req.user.ROL ==2 || req.user.ROL ==3 || req.user.ID == rows[0].USER_ID)
							resp.json(rows);
					}
				})
			}
		});

	})
	app.get('/getAllTickets',function(req,resp){
		// about mysql
		// can filter with req.user.ROL if needed 
		connection.getConnection(function(error,tempCont){
			if(!!error){
				tempCont.release();
				console.log('Error');

			}else{
				var id =req.user.ID;
				console.log('Connected!');
				if(req.user.ROL==2 || req.user.ROL == 3)
					/*check all the active tickets and the closed ones in the last 30days*/
				{
					var q ="SELECT \
					  t.ID,\
					  t.USER_ID,\
					  SUBSTR(t.TIMESTAMP,1,10) AS DATE,\
					  t.STATUS,\
					  u.USERNAME,\
					  u.EMAIL \
					 FROM "+dbconfig.ticket_table+" AS t \
					 INNER JOIN "+dbconfig.users_table+" AS u ON t.USER_ID = u.ID\
					 WHERE  (DATEDIFF(NOW(), t.TIMESTAMP) <= 30 AND t.STATUS ='CLOSED')\
					 OR t.STATUS='ACTIVE'";
					

				}else{
					/*check all tickets from the current user*/
					var q ="SELECT \
					  t.ID,\
					  t.USER_ID,\
					  SUBSTR(t.TIMESTAMP,1,10) AS DATE,\
					  t.STATUS,\
					  u.USERNAME,\
					  u.EMAIL \
					 FROM "+dbconfig.ticket_table+" AS t \
					 INNER JOIN "+dbconfig.users_table+" AS u ON t.USER_ID = u.ID\
					 WHERE t.USER_ID ="+id;
				}
				


				tempCont.query(q,
					 function(error,rows,fields){
					tempCont.release();
					if(!!error){
						console.log("Error with the query getAllTickets",error);
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
					var q = "SELECT\
					    m.ID AS 'MESSAGE_ID',\
					    m.TICKET_ID, \
					    u.ID AS 'USER_ID', \
					    m.TIMESTAMP AS 'DATE_TIME',\
					    m.MESSAGE,\
					    u.USERNAME,\
					    u.EMAIL,\
					    u.ROL\
					  FROM `"+dbconfig.message_table+"` AS m \
					  INNER JOIN `"+dbconfig.users_table+"` AS u ON m.USER_ID = u.ID \
					  WHERE m.TICKET_ID ="+id+"\
					  ORDER BY DATE_TIME ASC ";
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
	app.get('/getTicketsFromUser',function(req,resp){
		// about mysql
		

		 var id = req.user.ID;
		connection.getConnection(function(error,tempCont){
			if(!!error){
				tempCont.release();
				console.log('Error');

			}else{
				console.log('Connected!');
				var q = "SELECT \
					  t.ID,\
					  t.USER_ID,\
					  SUBSTR(t.TIMESTAMP,1,10) AS DATE,\
					  t.STATUS,\
					  u.USERNAME,\
					  u.EMAIL \
					 FROM "+dbconfig.ticket_table+" AS t \
					 INNER JOIN "+dbconfig.users_table+" AS u ON t.USER_ID = u.ID\
					 WHERE t.USER_ID ="+id;
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
				
				var q = "INSERT INTO `"+dbconfig.message_table+"` (TICKET_ID, USER_ID, MESSAGE )\
						 VALUES ("+ticket_id+","+user_id+",'"+message+"')";
				// console.log(q);
				tempCont.query(q,function(error,result){
					tempCont.release();
					if(!!error){
						console.log(error);
						res.end(res.statusCode.toString());
						
					}else{
						console.log("message inserted");
						
						
						res.end(res.statusCode.toString());
					}
				})
			}
		});


	    
	});

	app.post('/addTicket', function(req, res) {
	    	var inquiry = req.body.inquiry;
		       	user_id = req.body.user_id;
		        

	        connection.getConnection(function(error,tempCont){
				if(!!error){
					tempCont.release();
					console.log('Error');

				}else{
					
					var q = "INSERT INTO `"+dbconfig.ticket_table+"` (USER_ID, INQUIRY ,STATUS )\
							 VALUES ("+user_id+",'"+inquiry+"','ACTIVE')";
					
					tempCont.query(q,function(error,result){
						tempCont.release();
						if(!!error){
							console.log(error);
							res.end(res.statusCode.toString());
							
						}else{
							console.log("ticket submited");
							
							
							res.end(res.statusCode.toString());
						}
					})
				}
			});
	});
	app.post('/closeTicket',function(req,res){
		// about mysql
	 console.log("post received");
	 var id = req.body.ticket_id;
	 
	 connection.getConnection(function(error,tempCont){
		if(!!error){
			tempCont.release();
			console.log('Error');

		}else{
			// if(req.user.ROL ==2 || req.user.ROL ==3){

				tempCont.query(
				"UPDATE `"+dbconfig.ticket_table+"`\
				 SET STATUS ='CLOSED'\
				 WHERE tickets.ID ="+id,
				 
				 function(error,rows,fields){
					tempCont.release();
					if(!!error){
						console.log("Error with the query");
					}else{
						
						res.end(res.statusCode.toString());
						
					}
				})
			// }
		}
	});

	});

    

}


