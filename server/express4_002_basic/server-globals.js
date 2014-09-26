'use strict';

// setup some global stuff


// activate long stack traces
require('trace');

// Exclude node internal calls from the stack traces
require('clarify');

// make
var assuming_console = require('../../incubator/node/assuming_console');
assuming_console.install();


process.on('uncaughtException', function(err){
	console.error('uncaught exception !', err);

	setTimeout(function() {
		console.error("Shutdown taking too long ! Forcefully quitting…");
		// rethrow (dev)
		throw err;
		process.exit(2);
	}, config.kill_timeout_s * 1000);

	// TODO
	// - send a mail
	// - send an error response to the user
	// - send a push message to all clients for them to wait during restart
	// - and use promises for all of that ;)

	// debug
	throw err;

	// cleanly close the server (XXX doesn't work !)
	server.close(function() {
		console.log('closed');
		// rethrow (dev)
		throw err;
		process.exit(1);  // all clear to exit
	});

	// need to send a msg to cluster !
});
