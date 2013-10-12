"use strict";


var express = require('express');

// middlewares
var connect_nowww = require('connect-no-www');
var connect_locale = require("locale");

// misc
var supported_locales = ["fr", "en", "en_US"];


var app = express();

// Logging middleware
app.use(function(request, response, next) {
	console.log("* In comes a " + request.method + " to " + request.url);
	next();
});

app.use(connect_nowww());

app.use(function(request, response, next) {
	console.log("  eventually rewritten as " + request.method + " to " + request.url);
	next();
});


// static files (if match)
// Note : for convenience, of course should be rather served by a front-end nginx and a CDN !
app.use(express.static('app'));

// now that static files are served, add more infos
app.use(connect_locale(supported_locales));

// test
app.get('/hello', function(request, response) {
	response.setHeader("Content-Type", "text/plain");

	var answer = "Hello, World !";
	answer += "Request URL: " + request.url + "\n";
	answer += "Request type: " + request.method + "\n";
	answer += "Request headers: " + JSON.stringify(request.headers) + "\n";
	answer += "You asked for: " + request.headers["accept-language"] + "\n";
	answer += "We support: " + supported_locales + "\n";
	answer += "Our default is: " + connect_locale.Locale["default"] + "\n";
	answer += "The best match is: " + request.locale + "\n";

	response.send(answer);
});

// fallback error handler
app.use(function(req, res, next) {
	res.send(404, 'Sorry cant find that!');
});



var listening_port = 7000;
app.listen(listening_port);
console.log('Listening on port ' + listening_port);
