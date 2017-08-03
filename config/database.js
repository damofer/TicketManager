// config/database.js
module.exports = {
    'connection': {
    	'connectionLimit': 50,
        'host': 'us-cdbr-iron-east-05.cleardb.net',
        'user': 'b262df3ec91ef4',
        'password': '22f2c93e'
       
    },
	'database': 'heroku_6a09f24a7d57904',
    'users_table': 'users',
    'message_table':'messages',
    'ticket_table':'tickets',
};

// mysql://b262df3ec91ef4:22f2c93e@us-cdbr-iron-east-05.cleardb.net/heroku_6a09f24a7d57904?reconnect=true