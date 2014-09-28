/**
 * setup some global stuff
 */
'use strict';







///////////////////// Basic traces /////////////////////

process.on('exit', function(code) {
	console.log('* process.exit detected, about to exit with code :', code);
});

if(cluster.worker) cluster.worker.on('exit', function(code, signal) {
	if( signal )
		console.log('* I worker am killed by signal :', signal);
	else if( code )
		console.log('* I worker am exited with error code :', code);
	else
		console.log('* I worker exit naturally.');
});

process.on('uncaughtException', function(err) {
	console.error('X uncaught exception !', err, err.stack);
});



///////////////////// Activate features /////////////////////

// activate long stack traces
require('trace');

// Exclude node internal calls from the stack traces
require('clarify');

// make console calls display its originating pid
require('../../../incubator/node/assuming_console').install();



///////////////////// Set up shutdown sequence /////////////////////

var shutdown = require('../../--mini_incubator/shutdown');
shutdown.configure({
	// TODO
});

// add basic shutdown steps
shutdown.add_worker_disconnect_shutdown_callback();

shutdown.add_shutdown_callback(function(callback, context) {
	console.log('X TODO send email', context);
	return callback();
});

shutdown.add_shutdown_callback(function(callback, context) {
	console.log('X TODO send email', context);
	return callback();
});

process.on('uncaughtException', function(err) {
	console.error('X uncaught exception !', err, err.stack);
});

// clearly show what signals are received
//require('../../../incubator/node/pretty_signals').install_verbose_handlers();




	// TODO
	// - send an error response to the user

	// cleanly close the server (XXX doesn't work !)
	server.close(function() {
		console.log('closed');
		// rethrow (dev)
		throw err;
		process.exit(1);  // all clear to exit
	});

	// need to send a msg to cluster !
});
