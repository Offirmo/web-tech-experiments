'use strict';

const _ = require('lodash');
const express = require('express');

/**
 * Define and expose routes for testing error handling.
 */

let router = module.exports = new express.Router();

/**
 * Routes
 */

router.get('/', (req, res) => {
	res.send(`
<!DOCTYPE html>
<head>
	<title>meta routes</title>
	<style type="text/css">
		body {
			margin: 40px;
			font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
			color: #333;
		}
	</style>
</head>

<h1>...</h1>
<li><a>${req.baseUrl}/ping</a>
<li><a>${req.baseUrl}/echo</a>
<li><a>${req.baseUrl}/runtime-error-direct</a>
<li><a>${req.baseUrl}/sync-error</a>
<li><a>${req.baseUrl}/runtime-error-next</a>
<li><a>${req.baseUrl}/async-error</a>
<li><a>${req.baseUrl}/timeout</a>
<li><a>${req.baseUrl}/timeout/3</a> (duration in s)

<script>
	document.querySelector('h1').textContent = document.title;
	Array.prototype.forEach.call(document.querySelectorAll('a'), function(el) {
		el.href || (el.href = el.text);
	});
</script>
	`);
});

router.get('/ping', function (req, res) {
	res.send('pong');
});

router.get('/echo', function (req, res) {
	res.send('pong');
});

router.get('/runtime-error-direct', function (req, res) {
	// bad
	res.status(500).send('something blew up ! (sent directly, error middlewares not used)');
});

router.get('/runtime-error-next', function (req, res, next) {
	var err = new Error('A test exception passed to next()  !');
	err.status = 567;
	next(err);
});

router.get('/sync-error', function () {
	throw new Error('A test exception thrown synchronously !');
});

router.get('/async-error', function () {
	setTimeout(function() {
		throw new Error('A test exception thrown asynchronously !');
	}, 0);
});

router.get('/timeout', function () {
	// do nothing and let a timeout happen (hopefully)...
});

router.get('/timeout/:durationInSec', function (req, res) {
	var timeout = Number(req.params.durationInSec);
	if (_.isNaN(timeout)) {
		var err = new Error('You must provide a number in second !');
		err.status = 500;
		throw err;
	}
	else {
		setTimeout(function() {
			res.send('I waited ' + req.params.durationInSec + ' second(s).');
		}, timeout * 1000);
	}
});
