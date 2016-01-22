'use strict';

var _ = require('lodash');
var express = require('express');
var logger = require('../utils/logger');

/**
 * Define and expose routes for testing error handling.
 */

var router = module.exports = new express.Router();

/**
 * Routes
 */

router.get('/', function (req, res) {
	res.send(
		'meta routes :<br />' +
		'/no-error<br />' +
		'/logger<br />' +
		'/runtime-direct-error<br />' +
		'/runtime-next-error<br />' +
		'/runtime-next-error-as-warn<br />' +
		'/sync-error<br />' +
		'/async-error<br />' +
		'/timeout<br />' +
		'/timeout/:durationInSec<br />'
	);
});

router.get('/no-error', function (req, res) {
	res.send('correct !');
});

router.get('/logger', function (req, res) {
	logger.log('logger test with level "log"', {
		category: 'server',
		foo: 'bar',
		testMode: 'log'
	});
	logger.info('logger test with level "info"', {
		category: 'server',
		foo: 'bar',
		testMode: 'info'
	});
	logger.warn('logger test with level "warn"', {
		category: 'server',
		foo: 'bar',
		testMode: 'warn'
	});
	logger.error('logger test with level "error"', {
		category: 'server',
		foo: 'bar',
		testMode: 'logged error'
	});

	var err = new Error('Test error for testing the logger');
	err.bar = 'baz';
	err.logLevel = 'warn';

	logger.error(err, {
		category: 'server',
		foo: 'bar',
		testMode: 'error as 1st parameter'
	});
	logger.error('logger with error in metadata', {
		category: 'server',
		error: err,
		foo: 'bar',
		testMode: 'error in metadata'
	});

	res.send('done.');
});

router.get('/runtime-direct-error', function (req, res) {
	// bad
	res.status(500).send('something blew up ! (handled manually, generic error middleware not used)');
});

router.get('/runtime-next-error', function (req, res, next) {
	var err = new Error('A test exception passed to next()  !');
	err.status = 567;
	next(err);
});

router.get('/runtime-next-error-as-warn', function (req, res, next) {
	var err = new Error('A test exception passed to next()  !');
	err.status = 567;
	err.logLevel = 'warn';
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
