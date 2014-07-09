#!/usr/bin/env node
'use strict';

/** A more advanced web server

 base :
 - [x] favicon
 - [x] index.html
 - [x] other pages
 - [x] templating
 - [x] static files
 - [ ] 404 http://blog.safaribooksonline.com/2014/03/12/error-handling-express-js-applications/
 - [ ] server runtime error
 - [ ] handling sync, async and uncaught exceptions (base)
 - [x] base auto-restart : nothing to do, should be handled by the platform (ex. heroku)
 - [x] basic logging
 advanced :
 - [ ] domains ?
 - [ ] modular routing
 - [ ] gzip
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
 - [ ] live reload (client)
 - [x] live reload (server) nodemon !
 - [ ] cluster for efficiency and resilience to uncaught
 - [ ] resource monitoring
 - [ ] new relic ?
 - [ ] "This website does not supply ownership information."
 - [ ] ssl avec redirection
 - [ ] authentif
 - [ ] detect too busy https://hacks.mozilla.org/2013/01/building-a-node-js-server-that-wont-melt-a-node-js-holiday-season-part-5/

 http://runnable.com/UTlPPF-f2W1TAAEU/error-handling-with-express-for-node-js
 http://runnable.com/UTlPPV-f2W1TAAEf/custom-error-pages-in-express-for-node-js
 http://runnable.com/express

TODO
sur erreur, détection accès manuel (lien externe, tapé dans la barre) ou interne (bug ! ou hack)
relire entièrement Reference http://expressjs.com/4x/api.html

TOTEST
 https://github.com/moudy/project-router
 https://github.com/michaelleeallen/reducto

 */


/************************************************************************/
console.log('Hello world from server !');
var env = process.env.NODE_ENV || 'development';
console.log('* env = ' + env);

require('trace'); // activate long stack traces
require('clarify'); // Exclude node internal calls from the stack traces

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
app.enable('strict routing'); // default false
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
app.use(logger('dev'));

// Typically this middleware will come very early in your stack (maybe even first)
// to avoid processing any other middleware if we already know the request is for /favicon.ico
app.use(favicon_server('../../client/favicon.ico'));

// then static files which doesn't require special processing
// Note : if using a reverse proxy, should never match so may be moved at bottom (or completely removed)
app.use(express.static(path.join(__dirname, 'public'))); // https://github.com/expressjs/serve-static
app.use(express.static(path.join(__dirname, '../../client/misc'))); // https://github.com/expressjs/serve-static

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
/*app.get(function(req, res){
	res.send('hello world');
	res.send('foo');
	onFinished(res, function (err) {
		console.log('finished');
	});
});*/

app.get('/page1', function (req, res) {
	res.render('page1', { title: 'Express' });
});

app.get('/page2', function (req, res) {
	res.render('page2', { title: 'Express' });
});

app.get('/runtime_error', function (req, res) {
	res.send(500, { error: 'something blew up ! (thrown from code)' });
});

app.get('/sync_error', function (req, res) {
	throw new Error('An exception thrown synchronously !');
});

app.get('/async_error', function (req, res) {
	setTimeout(function() {
		throw new Error('An exception thrown asynchronously !');
	}, 0);
});

app.get('/timeout', function (req, res) {
	// do nothing and let a timeout happen (hopefully)...
});
app.get('/timeout/:duration_in_sec', function (req, res) {
	var timeout = Number(req.params.duration_in_sec);
	if(_.isNaN(timeout))
		res.send(500, 'You must provide a number in second !');
	else {
		setTimeout(function() {
			res.send(200, 'I waited ' + req.params.duration_in_sec + ' second(s).');
		}, timeout*1000);
	}
});

app.get('/toto/', function (req, res) {
	res.send('/toto !');
});


//app.use(require('express-slash')()); // https://github.com/ericf/express-slash


/************************************************************************/
// 404 ?

// error handling at the end
// "Though not mandatory error-handling middleware are typically defined very last, below any other app.use() calls"
app.use(function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.send(500, { error: 'Something blew up ! (generic handler)' });
	} else {
		next(err);
	}
});
// catch all
app.use(function(err, req, res, next) {
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

var server;
process.on('uncaughtException', function(err){
	console.error('uncaught exception !', err);

	// TODO
	// - send a mail
	// - send an error response to the user
	// - send a push message to all clients for them to wait during restart

	throw err;
	// cleanly close the server (XXX doesn't work !)
	server.close(function() {
		console.log('closed');
		// rethrow
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
