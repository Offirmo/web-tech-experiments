#!/usr/bin/env node
'use strict';

/**
 * Server wrapper with optional cluster launch.
 * https://discussion.heroku.com/t/recommended-use-of-nodes-cluster-module/96
 */

console.log('\n\n*** Hello from cluster master ! ***');
var env = process.env.NODE_ENV || 'development';
console.log('* env = ' + env);

if(env === 'production') {
	// cluster launch, heroku compatible and with nice features
	// https://github.com/brianc/node-forky
	console.log('* Production env, cluster launch…');
	var forky = require('forky');
	forky(__dirname + '/webserver.js');
}
else {
	// normal, plain launch (one instance)
	console.log('* Non-production env, simple launch…');
	require('./webserver.js');
}
