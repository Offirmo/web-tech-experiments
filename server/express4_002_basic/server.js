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
var env = process.env.NODE_ENV || 'development';


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
// http://runnable.com/express

var express = require('express');

// + interesting middlewares
// https://github.com/senchalabs/connect/blob/master/Readme.md#middleware
// https://github.com/visionmedia/express/wiki
// https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x
// https://github.com/visionmedia/express/wiki/New-features-in-4.x

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
// to review
//app.enable('trust proxy');

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
app.use(express.static(path.join(__dirname, 'public'))); // https://github.com/expressjs/serve-static
app.use(require('response-time')()); // https://github.com/expressjs/response-time

require('express-debug')(app, {/* settings */}); // https://github.com/devoidfury/express-debug

/*app.use(domainMiddleware({
	server: server,
	killTimeout: 30000,
}))*/


if (env === 'development') {
	app.use(errorhandler());
}

app.get('/', function(req, res){
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

app.get('/timeout', function (req, res) {
	// do nothing...
});

app.use('/users/:user_id', function(req, res, next) {
	// req.params.user_id exists here
});

app.get('/dust', function (req, res) {
	res.render('index', { title: 'Express' });
});

/*
eq.params

Is now an object instead of an array. This will not break your app if you used the req.params[##] style for regexp routes where parameter names are not known.
	res.locals

Is no longer a function. It is a plain js object. Treat it as such.
	res.headerSent

Changed to headersSent to match the node.js ServerResponse object. Your app likely didn't use this and thus it won't be an issue.
	req.is
*/

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
