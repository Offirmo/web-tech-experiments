#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// http://sandinmyjoints.github.io/towards-100-pct-uptime/#/28/3
// http://blog.ponyfoo.com/2013/06/27/monitoring-production-grade-node-applications

process.on('uncaughtException', function(err){
	// log the error
	console.
	process.exit(1);
});
