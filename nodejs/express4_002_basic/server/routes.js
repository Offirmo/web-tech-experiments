'use strict';


var path = require('path');
var express = require('express');
var router = express.Router();
var utils = require('./utils');


module.exports = router;

/*
router.get('/incubator/node_and_common/webworker_helper.js', function (req, res) {
	res.sendfile(path.join(__dirname, '../../../incubator/node_and_common/webworker_helper/webworker_helper.js'));
});*/

router.get('/', function (req, res) {
	res.render('index', { tpl: 'index', title: 'Express', lang: req.locale });
});

router.get('/page1', function (req, res) {
	res.render('page1', { tpl: 'page1', title: 'Express', lang: req.locale });
});

router.get('/page2', function (req, res) {
	res.render('page2', { tpl: 'page2', title: 'Express', lang: req.locale });
});

router.get('/ror', function (req, res) {
	res.render('ror/replicator', { tpl: 'ror/replicator', title: 'Rise of the replicators', lang: req.locale });
});

router.get('/r', function (req, res) {
	res.render('ror/r', { tpl: 'ror/r', title: 'Test', lang: req.locale });
});

router.get('/runtime_error', function (req, res) {
	// bad
	res.send(500, 'something blew up ! (handled from the middleware, error handlers not used)');
});

router.get('/sync_error', function (req, res) {
	throw new Error('An exception thrown synchronously !');
});

router.get('/async_error', function (req, res) {
	setTimeout(function() {
		throw new Error('An exception thrown asynchronously !');
	}, 0);
});

router.get('/timeout', function (req, res) {
	// do nothing and let a timeout happen (hopefully)...
});
router.get('/timeout/:duration_in_sec', function (req, res) {
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

router.get("/locale_test", function(req, res) {
	res.header("Content-Type", "text/plain");
	res.send(
			"You asked for: " + req.headers['accept-language'] + "\n" +
			"We support: " + config.supported_locales + "\n" +
			"Our default is: " + locale.Locale['default'] + "\n" +
			"The best match is: " + req.locale + "\n"
	);
});


router.get('/toto/', function (req, res) {
	res.send('correct /toto/ !');
});

// "catch all" = default / 404 for a webapp
// https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode
// https://briantford.com/blog/angular-express
// Several cases :
// - a 404
//   - manual, visible (user mistyped a page url, old address...)
//   - internal (API, auto fetch of rsrc, non page-rsrc...)
// - a correct page, but unknown from the server since will be resolved client-side by ui-router
router.get('*', function (req, res) {
	console.log('fallback "catch all" route triggered for url "' + req.url + '"');

	// so what ?
	if(utils.is_internal_request(req)) {
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
	var client_side_routing = false;
	if(client_side_routing) {

		// answer with index, client-side will handle the rest (including true 404)
		console.log('defaulting to webapp root for url "' + req.url + '"');
		res.render('app', { tpl: 'app', title: 'Express', lang: req.locale });
		//res.sendFile('index.html', {root: './public'});
	}
	else {
		console.log('404 page for :', req.url);
		return res.render('404', { tpl: '404', url: req.url, lang: req.locale });
		// if rendering fail, will go to error handler.
	}
});
