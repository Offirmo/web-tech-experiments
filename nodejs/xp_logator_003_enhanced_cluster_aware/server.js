#!/usr/bin/env node
'use strict';

var _ = require('lodash');
var logger = require('../../incubator/common/logator')({enhanced: true});

var console_levels = ['log', 'info', 'warn', 'error'];

var cluster = require('cluster');
var forky = require('forky');

// https://github.com/brianc/node-forky/blob/master/examples/master.js
forky.log = function() { logger.log.apply(logger, arguments); };


if (cluster.isMaster) {
	logger.log('Hello world from master !');

	forky(__dirname + '/server');

	_.forEach(console_levels, function(level) {
		console[level]( 'console : Hello world ! ("%s" level)', level);
		logger[level](  'logger  : Hello world ! ("%s" level)', level);
	});

}
else {
	logger.log('Hello world from worker !');

	_.forEach(console_levels, function (level) {
		console[level]('console : Hello world ! ("%s" level)', level);
		logger[level]('logger  : Hello world ! ("%s" level)', level);
	});
}
