var express = require('express');

var url = 'https://siap-ticketmanager.herokuapp.com/';
var request = require('request');

var app = express();


//when pointing to the root, it will handle  the info that was on the req.
	console.reset = function () {
		  return process.stdout.write('\033c');
		}
request(url, function (error, response, body) {
    	setInterval(function(){

        console.reset();
 		console.log("server status code : ",response.statusCode);

	}, 3000);
    
});


