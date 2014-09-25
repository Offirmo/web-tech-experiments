#!/usr/bin/env node
'use strict';

/** A more advanced web server

 base : (important client experience)
 - [x] favicon
 - [x] root page (~index.html)
 - [ ] / defaults to index
 - [x] other pages
 - [x] templating
 - [x] static files
 - [x] nice 404 for pages, normal 404 for assets
 - [x] nice server runtime error (caught exceptions)
 - [x] nice server runtime error (uncaught exceptions) (and app stay accessible !)
 - [x] base auto-restart : nothing to do ! should be handled by the platform (ex. heroku)
 - [x] basic logging
 advanced :
 - [x] no cookies (fatten requests, outdated)
 - [ ] respond with an error even if uncaught exception (domains ? http://nodejs.org/api/domain.html)
 https://github.com/brianc/node-domain-middleware
 https://github.com/mathrawka/express-domain-errors
 https://github.com/mathrawka/express-graceful-exit
 http://blog.izs.me/post/65712662830/restart-node-js-servers-on-domain-errors-sensible-fud
 http://www.lighthouselogic.com/use-domain-dispose/#/using-a-new-domain-for-each-async-function-in-node/
 https://github.com/brianc/node-okay
 http://blog.argteam.com/coding/hardening-node-js-for-production-part-3-zero-downtime-deployments-with-nginx/
 - [ ] modular routing
 - [ ] language recognition/hinting and i18n
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
 - [/] live reload on template pages (client)
 - [x] live reload (server) nodemon !
 - [x] cluster for efficiency and resilience to uncaught
 - [ ] resource monitoring
 - [ ] new relic ?
 - [ ] "This website does not supply ownership information."
 - [ ] ssl avec redirection
 - [ ] authentif
 - [ ] detect too busy https://hacks.mozilla.org/2013/01/building-a-node-js-server-that-wont-melt-a-node-js-holiday-season-part-5/
 - [ ] checklist http://sandinmyjoints.github.io/towards-100-pct-uptime/#/27
 - [ ] unit tests
 http://javascriptplayground.com/blog/2014/07/testing-express-routes/
 https://www.joyent.com/blog/risingstack-writing-testable-apis-the-basics

 http://runnable.com/UTlPPF-f2W1TAAEU/error-handling-with-express-for-node-js
 http://runnable.com/UTlPPV-f2W1TAAEf/custom-error-pages-in-express-for-node-js
 http://runnable.com/express

TODO
relire entièrement Reference http://expressjs.com/4x/api.html

 à relire pour valider : https://github.com/ClintH/kattegat

 http://webapplog.com/migrating-express-js-3-x-to-4-x-middleware-route-and-other-changes/

TOTEST
 https://github.com/moudy/project-router
 https://github.com/michaelleeallen/reducto
 http://scotch.io/tutorials/javascript/upgrading-our-easy-node-authentication-series-to-expressjs-4-0
 //app.use(require('express-slash')()); // https://github.com/ericf/express-slash
 */


/************************************************************************/
console.log('Hello world from server !');

var _ = require('lodash');
var path = require('path');

require('trace'); // activate long stack traces
require('clarify'); // Exclude node internal calls from the stack traces

var config = require('./server-config');
console.log('config :', config);

var middleware = require('./server-middlewares');
var app = require('./server-express-app');
var utils = require('./server-utils');




/************************************************************************/
// Reference http://expressjs.com/4x/api.html
// + interesting middlewares
// https://github.com/senchalabs/connect/blob/master/Readme.md#middleware
// https://github.com/visionmedia/express/wiki
// https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x
// https://github.com/visionmedia/express/wiki/New-features-in-4.x
// https://github.com/expressjs/express-params

/************************************************************************/


// https://github.com/expressjs/finished
var onFinished = require('finished');



/************************************************************************/
// manual creation of the http server
// in order to use domainMiddleware
// cf. http://expressjs.com/4x/api.html#app.listen
var server = require('http').createServer(app);


/************************************************************************/
// https://www.npmjs.org/package/express-livereload
// to be set before any HTML service ?
if(config.env === 'development') {
	// WARNING
	// Livereload (client) has been found to slow down extremely the app at startup. (is it my computer ?)
	// Can even cause browser timeouts on first load.
	// Just wait a bit, refresh the page a second time and it should work.
	var livereload = require('express-livereload');
	livereload(app, {
		debug: true,
		//port: 35729,
		port: 35730,
		watchDir:  process.cwd(), // and not just 'public'
		exclusions: [ 'bower_components', 'other_components' ]
	});
}

// top
app.use(middleware.using_domains({
	server: server,
	killTimeout: config.kill_timeout_s * 1000
}));

app.use(middleware.logging('dev'));

// Typically this middleware will come very early in your stack (maybe even first)
// to avoid processing any other middleware if we already know the request is for /favicon.ico
app.use(middleware.serving_favicon('../../client/favicon.ico'));

// then static files which doesn't require special processing
// Note : if using a reverse proxy, should never match so may be moved at bottom (or completely removed)
app.use(middleware.serving_static_files(path.join(__dirname, 'public')));
app.use(middleware.serving_static_files(path.join(__dirname, '../../client')));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());

//  It is very important that this module is used before any module
// that needs to know the method of the request
//app.use(require('method-override')()); // https://github.com/expressjs/method-override

//app.use(require('response-time')()); // https://github.com/expressjs/response-time

require('express-debug')(app, {/* settings */}); // https://github.com/devoidfury/express-debug



/*
var errorhandler = require('errorhandler'); // https://github.com/expressjs/errorhandler
if (config.env === 'development') {
	app.use(errorhandler());
}*/


/************************************************************************/
// root

app.get('/page1', function (req, res) {
	res.render('page1', { title: 'Express' });
});

app.get('/page2', function (req, res) {
	res.render('page2', { title: 'Express' });
});

app.get('/runtime_error', function (req, res) {
	// bad
	res.send(500, 'something blew up ! (handled from the middleware, error handlers not used)');
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
	if(_.isNaN(timeout)) {
		var err = new Error('You must provide a number in second !');
		err.status = 500;
		throw err;
	}
	else {
		setTimeout(function() {
			res.send(200, 'I waited ' + req.params.duration_in_sec + ' second(s).');
		}, timeout*1000);
	}
});

app.get('/toto/', function (req, res) {
	res.send('correct /toto/ !');
});

// "catch all" default / 404 for a webapp
// Several cases :
// - a 404
//   - manual, visible (user mistyped a page url, old address...)
//   - internal (API, auto fetch of rsrc, non page-rsrc...)
// - a correct page, but unknown from the server since will be resolved client-side by ui-router
app.get('*', function (req, res) {
	console.log('fallback route triggered for url "' + req.url + '"');

	// so what ?
	if(isInternalRequest(req)) {
		// Will not be seen by the user.
		// Respond the best we can.
		res.status(404); // anyway
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
		res.status(404); // anyway
		return res.send('404'); // short answer
	}

	// OK, must be a client-side state/page
	// answer with index, client-side will handle the rest (including true 404)
	console.log('defaulting to webapp root for url "' + req.url + '"');
	res.sendFile('index.html', {root: './public'});
});


// Since this is the last non-error-handling middleware use()d,
// we assume 404, as nothing else responded.
// 404 was already handled in a webapp case,
// but we may keep this handling in case "webapp mode" is deactivated.
app.use(function(req, res, next) {
	console.log('404 handler :', req.url);

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
	console.log('1st error handler', err);

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
		console.error('The error template didn´t work :', e);
		res.send(500, 'Something broke and the nice error template didn´t work !');
	}
});

process.on('uncaughtException', function(err){
	console.error('uncaught exception !', err);

	setTimeout(function() {
		console.error("Shutdown taking too long ! Forcefully quitting…");
		// rethrow (dev)
		throw err;
		process.exit(2);
	}, config.kill_timeout_s * 1000);

	// TODO
	// - send a mail
	// - send an error response to the user
	// - send a push message to all clients for them to wait during restart
	// - and use promises for all of that ;)

	// debug
	throw err;

	// cleanly close the server (XXX doesn't work !)
	server.close(function() {
		console.log('closed');
		// rethrow (dev)
		throw err;
		process.exit(1);  // all clear to exit
	});

	// need to send a msg to cluster !
});



/************************************************************************/
//var server = app.listen(listening_port, function() {
server.listen(config.listening_port, function() {
	console.log('* Now listening on :');
	_.forEach(utils.get_local_ips(), function(ip) {
		console.log('  http://' + ip + ':' + config.listening_port);
	});
	console.log('(Ctrl+C to stop)');
});
