#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// Tests on unix signals
// create an express server,
// then feel free to kill it at pleasure to see what happen

// what happen if I install two hadlers on a signal ?
// and if one of them exit ?



var _ = require('lodash');


console.log('\n*** My pid is ' + process.pid + ', please kill me ;) ***\n');

process.on('uncaughtException', function() {
	console.error('* uncaughtException', arguments);
});

process.on('exit', function(code) {
	console.log('* About to exit with code :', code);
});

process.on('SIGINT', function() {
	console.log('* hello from SIGINT handler 1');
	process.exit(1);
	setTimeout(function() {
		console.log('exiting on behalf of handler 1');
		process.exit(11);
	}, 2000);
});

process.on('SIGINT', function() {
	console.log('* hello from SIGINT handler 2');
	setTimeout(function() {
		console.log('exiting on behalf of handler 2');
		process.exit(22);
	}, 2000);
});




var express = require('express');
var listening_port = process.env.PORT || 4000;
var app = express();
var server = app.listen(listening_port, function() {
	console.log('Now listening on port ' + listening_port);
	console.log('(Ctrl+C to stop)');
});
server.on('close', function() { console.log('server close event', arguments); } );


