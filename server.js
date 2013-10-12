"use strict";




//////////// imports ////////////
var https = require('https');
var http = require('http');
var express = require('express');
var path = require('path');
var routes = require('./routes');

//var connect = require('connect');

// middlewares
var connect_nowww = require('connect-no-www');
var connect_locale = require("locale");

// misc
var supported_locales = ["fr", "en", "en_US"];







//////////// init ////////////
var app = express();
app.enable('trust proxy'); // for running behind nginx or equiv.

app.set('http_port', process.env.PORT || 7000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');







//////////// set middlewares chain ////////////
app.use(express.logger("dev")); // connect default logger
//app.use(connect.logger("dev")); // connect default logger
//app.use(connect.limit('1mb')); // reject requests too big. we don't expect huge requests
app.use(express.compress()); // gzip compression, must be as early as possible

// Custom logging middleware
app.use(function(request, response, next) {
	console.log("* In comes a " + request.method + " to " + request.originalUrl);
	next();
});

app.use(connect_nowww());

// further logging
app.use(function(request, response, next) {
	if(request.url !== request.originalUrl) {
		console.log("  eventually rewritten as " + request.method + " to " + request.url);
	}
	next();
});


app.use(express.favicon()); // immediately handle favicon if it's what was requested

// immediately handle static files (if match)
// Note : for convenience only,
//        of course should be rather served by a front-end nginx and a CDN !
app.use(express.static(path.join(__dirname, "app")));

// for decoding request bodies and uploaded files
app.use(express.bodyParser());

// .methodOverride() lets you simulate DELETE and PUT
// methods with POST methods. Common boilerplate.
app.use(express.methodOverride());

app.use(app.router);

// nadd locale infos + compute best
app.use(connect_locale(supported_locales));

// dir of html tests
app.get('/', routes.index);

app.get("/tests", express.directory("app"));

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
	answer += "NODE_ENV = " + process.env.NODE_ENV + "\n";
	answer += "IP = " + request.ip + "\n";
	answer += "IPs = " + request.ips + "\n";
	answer += "protocol = " + request.protocol + "\n";
	response.send(answer);
});







//////////// errors ////////////

// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

// fallback error handler
app.use(function(req, res, next) {
	res.send(404, 'Sorry cant find that!');
});

// other errors handler
// first in console
app.use(function logErrors(err, req, res, next) {
	console.error(err.stack);
	next(err);
});
// then to the user
app.use(function(err, req, res, next){
	res.status(500);
	res.render('error', { error: err });
});


http.createServer(app).listen(app.get('http_port'), function(){
	console.log('Listening HTTP on port ' + app.get('http_port'));
});

//https.createServer(options, app).listen(443);

