/**
 * setup some global stuff
 */
'use strict';

var cluster = require('cluster');



///////////////////// Basic, very important traces /////////////////////

process.on('exit', function(code) {
	console.log('* process.exit detected, about to exit with code :', code);
});

if(cluster.worker) cluster.worker.on('exit', function(code, signal) {
	if( signal )
		console.log('* cluster.worker.exit : I, worker am killed by signal :', signal);
	else if( code )
		console.log('* cluster.worker.exit : I, worker am exited with error code :', code);
	else
		console.log('* cluster.worker.exit : I, worker exits.');
});

if(cluster.worker) cluster.worker.on('disconnect', function() {
	console.log('* cluster.worker.disconnect event seen.');
});

process.on('uncaughtException', function(err) {
	console.error('X uncaught exception !', err, err.stack);
});

// trace received signals
require('../../../incubator/node_and_common/pretty_signals').install_verbose_handlers();



///////////////////// Activate features /////////////////////

// make console calls display their originating pid
require('../../../incubator/node_and_common/assuming_console').install();
console.log('Hello world from web server !');

// activate long stack traces
require('trace');

// Exclude node internal calls from the stack traces
require('clarify');





// https://github.com/brianc/node-forky/blob/master/examples/master.js
var forky = require('forky');
forky.log = function() { console.log.apply(console, arguments); };
