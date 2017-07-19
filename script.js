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


require('./app/service_routes.js')(app, connection); // get The ticket DB queries



// vendor scripts
app.get('/vendor/angular.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'node_modules', 'angular', 'angular.js'));
});
app.get('/vendor/angular-route.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'node_modules', 'angular-route', 'angular-route.js'));
});


app.listen(3000);