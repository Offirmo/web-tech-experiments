/**
 * setup some global stuff
 */
'use strict';




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

process.on('uncaughtException', function(err) {
	console.error('X uncaught exception !', err, err.stack);
});



///////////////////// Activate features /////////////////////

// make console calls display their originating pid
require('../../../incubator/node/assuming_console').install();

// activate long stack traces
require('trace');

// Exclude node internal calls from the stack traces
require('clarify');






///////////////////// Plug shutdown sequence /////////////////////
var shutdown = require('../../--mini_incubator/shutdown');


process.on('uncaughtException', function(err) {
	shutdown.launch(err);
});


// TODO + disconnect from

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
