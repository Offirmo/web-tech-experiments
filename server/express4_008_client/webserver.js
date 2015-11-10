#!/usr/bin/env node
'use strict';

/** A more advanced web server

 base : (important client experience)
 - [x] favicon
 - [x] index.html
 - [x] other pages
 - [x] templating
 - [x] static files
 - [x] nice 404 for pages, normal 404 for assets
 - [x] nice server runtime error (caught exceptions)
 - [ ] nice server runtime error (uncaught exceptions) (and app stay accessible !)
 - [x] base auto-restart : nothing to do ! should be handled by the platform (ex. heroku)
 - [x] basic logging
 advanced :
 - [ ] respond with an error even if uncaught exception
 - [ ] modular routing
 - [ ] language recognition and i18n
 - [ ] compression
 - [ ] check response time
 - [ ] timeouts
 - [ ] check accepted types and input types
 - [ ] utm_source
 - [ ] sitemap
 - [ ] advanced logging
 - [ ] mails
 - [ ] error reports
 - [ ] through proxy
 - [ ] heroku friendly
 - [ ] cache optimisée
 - [ ] headers minimum
 - [ ] sécurité avancée, contrôles d'entrée
 - [ ] filtrage des headers inutiles
 - [ ] REST
 - [ ] referer, analytics
 - [/] live reload (client) [bugs en attente]
 - [x] live reload (server) nodemon !
 - [x] cluster for efficiency and resilience to uncaught
 - [ ] resource monitoring
 - [ ] new relic ?
 - [ ] "This website does not supply ownership information."
 - [ ] ssl avec redirection
 - [ ] authentif
 - [ ] detect too busy
 - [ ] checklist
 */


/************************************************************************/
console.log('Hello world from server !');
var env = process.env.NODE_ENV || 'development';
console.log('* env = ' + env);

require('trace'); // activate long stack traces
require('clarify'); // Exclude node internal calls from the stack traces

var _ = require('lodash');

var listening_port = process.env.PORT || 4000;


// http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
// http://nodejs.org/api/os.html#os_os_networkinterfaces
var local_ips = _.chain(require('os').networkInterfaces())
	.flatten()
	.filter(function(val){
		return (val.family === 'IPv4' && val.internal === false);
	})
	.pluck('address')
	.value();



/************************************************************************/
// Reference http://expressjs.com/4x/api.html
// + interesting middlewares
// https://github.com/senchalabs/connect/blob/master/Readme.md#middleware
// https://github.com/visionmedia/express/wiki
// https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x
// https://github.com/visionmedia/express/wiki/New-features-in-4.x
// https://github.com/expressjs/express-params

/************************************************************************/
var express = require('express');

var path = require('path');
var logger = require('morgan');
var favicon_server = require('serve-favicon'); // https://github.com/expressjs/serve-favicon (static-favicon is an alias)
var method_unifier = require('method-override'); // https://github.com/expressjs/method-override

var cookieParser = require('cookie-parser', { // https://github.com/expressjs/cookie-parser
	// https://github.com/defunctzombie/node-cookie
	secure: true
});
var bodyParser = require('body-parser'); // https://github.com/expressjs/body-parser
var errorhandler = require('errorhandler'); // https://github.com/expressjs/errorhandler
var domainMiddleware = require('domain-middleware'); // https://github.com/expressjs/domain-middleware

// non middleware modules
var onFinished = require('finished'); // https://github.com/expressjs/finished

// templating
var templates = require('consolidate'); // always needed
// now require all templating engines we wish to use
var dust = require('dustjs-linkedin'); // http://dejanglozic.com/2014/01/27/dust-js-such-templating/



/************ Settings ************************************************************/
// http://expressjs.com/4x/api.html
var app = express();

// defaul template engine
app.engine('dust', templates.dust); // .dust will be rendered with...
app.set('view engine', 'dust'); // default extension to use when omitted
// views directory : default to /views

// Because you're the type of developer who cares about this sort of thing!
app.enable('strict routing'); // default false, TODO combine with https://github.com/ericf/express-slash
app.enable('case sensitive routing'); // default false
app.disable('x-powered-by'); // default true

// to review : for running behind nginx or equiv.
//app.enable('trust proxy');

/*app.configure('development', function() {
	var edt = require('express-debug'); // https://github.com/devoidfury/express-debug
	edt(app, {
	  // settings
	});
});*/


/************************************************************************/
// https://www.npmjs.org/package/express-livereload
// to be set before any HTML service ?
if(env === 'development') {
	var livereload = require('express-livereload');
	livereload(app, {
		debug: true,
		port: 35730,
		watchDir: path.join(__dirname, '../../client') //process.cwd() // and not just 'public'
	});
}

app.use(logger('dev'));

// Typically this middleware will come very early in your stack (maybe even first)
// to avoid processing any other middleware if we already know the request is for /favicon.ico
app.use(favicon_server('../../client/favicon.ico'));

// then static files which doesn't require special processing
// Note : if using a reverse proxy, should never match so may be moved at bottom (or completely removed)
app.use(express.static(path.join(__dirname, '../../client'))); // https://github.com/expressjs/serve-static

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());

//  It is very important that this module is used before any module
// that needs to know the method of the request
//app.use(require('method-override')()); // https://github.com/expressjs/method-override

// cookie parser better handle the cookies
// should we need them, of course
//app.use(cookieParser(cookie_signing_secret));

//app.use(require('response-time')()); // https://github.com/expressjs/response-time

//require('express-debug')(app, {/* settings */}); // https://github.com/devoidfury/express-debug

/*app.use(domainMiddleware({
	server: server,
	killTimeout: 30000,
}))*/


/*if (env === 'development') {
	app.use(errorhandler());
}*/


/************************************************************************/
// root

app.get('/page1', function (req, res) {
	res.render('page1', { title: 'Express' });
});


// Since this is the last non-error-handling middleware use()d,
// we assume 404, as nothing else responded.
app.use(function(req, res, next) {

	// we want to explain the user what happened,
	// provided it was really a user request...
	res.status(404); // anyway

	if(isInternalRequest(req)) {
		// Will not be seen by the user.
		// Respond the best we can.
		if (req.accepts('json'))
			return res.send({ error: 'Not found (as json)' });
		else
			return res.type('txt').send('Not found (as text)');
	}

	// ok, most likely a user browsing.
	// is it a full page or just an asset ?
	// (we don't want to costly render a template just for a missing favicon)
	if(req.url.slice(-4).indexOf('.') !== -1) {
		// there is a . (dot) in the last 4 chars,
		// most likely an file extension
		// so it must be an asset since our clean page urls don't have extensions.
		return res.send('404'); // short answer
	}

	// eventually
	return res.render('404', { url: req.url });
	// if rendering fail, will go to error handler.
});

function isInternalRequest(req) {
	return req.xhr // caller manually told us it was a xhr
		|| (!req.accepts('html')); // most likely not a browser asset
}

/************************************************************************/
// error handling at the end
// "Though not mandatory error-handling middleware are typically defined very last,
//  below any other app.use() calls"
// http://stackoverflow.com/questions/6528876/how-to-redirect-404-errors-to-a-page-in-expressjs
app.use(function (err, req, res, next) {
	console.log('1st error handler');

	// so we have an error. Do we have a status ?
	var status = err.status || 500;
	// (todo validate err.status)
	res.status(status);

	if(isInternalRequest(req)) {
		// Will not be seen by the user.
		// Respond the best we can.
		if (req.accepts('json'))
			return res.send({ error: 'server error : ' + status + ' (as json)' });
		else
			return res.type('txt').send('server error : ' + status + ' (as text)');
	}

	// ok, most likely a user browsing.
	// is it a full page or just an asset ?
	// (we don't want to costly render a template just for a missing favicon)
	if(req.url.slice(-4).indexOf('.') !== -1) {
		// there is a . (dot) in the last 4 chars,
		// most likely an file extension
		// so it must be an asset since our clean page urls don't have extensions.
		return res.send('error'); // short answer
	}

	// eventually
	try {
		res.render('error', { error: err });
	}
	catch(e) {
		console.error('The error template didn\'t work :', e);
		res.send(500, 'Something broke and the nice error template didn\'t work !');
	}
});

var server;
process.on('uncaughtException', function(err){
	console.error('uncaught exception !', err);

	setTimeout(function() {
		console.error("Shutdown taking too long ! Forcefully quitting…");
		// rethrow (dev)
		throw err;
		process.exit(2);
	}, 30*1000);

	// TODO
	// - send a mail
	// - send an error response to the user
	// - send a push message to all clients for them to wait during restart
	// - and use promises for all of that ;)

	throw err;
	// cleanly close the server (XXX doesn't work !)
	server.close(function() {
		console.log('closed');
		// rethrow (dev)
		throw err;
		process.exit(1);  // all clear to exit
	});
});

/************************************************************************/
server = app.listen(listening_port, function() {
	_.forEach(local_ips, function(ip) {
		console.log('Listening on http://' + ip + ':' + listening_port);
	});
	console.log('(Ctrl+C to stop)');
});
