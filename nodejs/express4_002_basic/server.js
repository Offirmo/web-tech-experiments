#!/usr/bin/env node
'use strict';

/**
 * Server wrapper with optional cluster launch.
 * https://discussion.heroku.com/t/recommended-use-of-nodes-cluster-module/96
 */

console.log('\n\n*** Hello from cluster master ! ***');
var env = process.env.NODE_ENV || 'development';
console.log('* [cluster master] env = ' + env);

if(false || env === 'Production') {
	// cluster launch, heroku compatible and with nice features
	// https://github.com/brianc/node-forky
	console.log('* [cluster master] CLUSTER launch…');
	var forky = require('forky');

	// https://github.com/brianc/node-forky/blob/master/examples/master.js
	forky.log = function() { console.log.apply(console, arguments) };

	forky(__dirname + '/server/index');
}
else {
	// normal, plain launch (one instance)
	console.log('* [cluster master] SIMPLE launch…');
	require('./server/index');
}
