#!/usr/bin/env node
'use strict';

console.log('\n\nHello from cluster master !');
var env = process.env.NODE_ENV || 'development';
console.log('* env = ' + env);

if(env === 'production') {
	// cluster launch
	// https://github.com/brianc/node-forky
	var forky = require('forky');
	forky(__dirname + '/webserver.js');
}
else {
	// normal launch, one instance
	require('./webserver.js');
}

