#!/usr/bin/env node
'use strict';

/*
- [ ] 404
- [ ] handling exceptions
- [ ] domains
- [ ] static files
 */

console.log('Hello world !');

var _ = require('underscore');

var listening_port = process.env.PORT || 3000;
var cookie_signing_secret = 'optional secret string';

// http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
// http://nodejs.org/api/os.html#os_os_networkinterfaces
var local_ips = _.chain(require('os').networkInterfaces())
	.flatten()
	.filter(function(val){
		return (val.family === 'IPv4' && val.internal === false);
	})
	.pluck('address')
	.value();



// http://expressjs.com/4x/api.html

var express = require('express');

// + interesting middlewares
// https://github.com/senchalabs/connect/blob/master/Readme.md#middleware
// https://github.com/visionmedia/express/wiki

var path = require('path');
var favicon = require('serve-favicon'); // https://github.com/expressjs/serve-favicon
var logger = require('morgan');
var cookieParser = require('cookie-parser', { // https://github.com/expressjs/cookie-parser
	// https://github.com/defunctzombie/node-cookie
	secure: true
});
var errorhandler = require('errorhandler'); // https://github.com/expressjs/errorhandler
var bodyParser = require('body-parser'); // https://github.com/expressjs/body-parser
var domainMiddleware = require('domain-middleware'); // https://github.com/expressjs/domain-middleware

// non middleware modules
var onFinished = require('finished'); // https://github.com/expressjs/finished

var app = express();

app.set('view engine', 'dust');

// Because you're the type of developer who cares about this sort of thing!
app.enable('strict routing');

/*app.configure('development', function() {
	var edt = require('express-debug'); // https://github.com/devoidfury/express-debug
	edt(app, {
	  // settings
	});
});*/

app.use(logger('dev'));
app.use(favicon('../../client/misc/favicon_16x16.png'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(require('method-override')()); // https://github.com/expressjs/method-override
app.use(cookieParser(cookie_signing_secret));
app.use(express.static(path.join(__dirname, 'public')));

/*app.use(domainMiddleware({
	server: server,
	killTimeout: 30000,
}))*/


if (process.env.NODE_ENV === 'development') {
	app.use(errorhandler());
}

app.get('/', function(req, res){
	//  res.render('index', { title: 'Express' });
	res.send('hello world');
	res.send('foo');
	onFinished(res, function (err) {
		console.log('finished');
	});
});

app.get('/toto/', function (req, res) {
	res.send('/toto !');
});

app.get('/error', function (req, res) {
	throw new Error('An error !');
});

//app.use(require('express-slash')()); // https://github.com/ericf/express-slash

// 404 ?

// error handling at the end
app.use(function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.send(500, { error: 'Something blew up!' });
	} else {
		next(err);
	}
});
// catch all
app.use(function(err, req, res, next){
	console.error(err.stack);
	try {
		res.status(500);
		res.render('error', { error: err });
	}
	catch(e) {
		console.error('The error template didn\'t work :', e);
		res.send(500, 'Something broke and the nice error template didn\'t work !');
	}
});

/////////////////////////////////////////////////////////////
app.listen(listening_port, function() {
	_.forEach(local_ips, function(ip) {
		console.log('Listening on http://' + ip + ':' + listening_port);
	});
	console.log('(Ctrl+C to stop)');
});
