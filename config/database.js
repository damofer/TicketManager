// config/database.js
module.exports = {
    'connection': {
    	'connectionLimit': 50,
        'host': 'localhost',
        'user': 'root',
        'password': ''
       
    },
	'database': 'ticketmanager',
    'users_table': 'users',
    'message_table':'messages',
    'ticket_table':'tickets',
};