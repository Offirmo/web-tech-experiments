/** This app shutdown sequence
 */
'use strict';

var _ = require('lodash');

var shutdown = require('../../--mini_incubator/shutdown');


shutdown.configure({
	// TODO
});


///////////////////// Set up shutdown sequence /////////////////////

shutdown.add_worker_disconnect_shutdown_callback();


// tell our cluster master we are in trouble
shutdown.add_shutdown_callback(function(callback, context) {
	console.log('X TODO send email', context);
	return callback();
});


// send an email to admins
shutdown.add_shutdown_callback(function(callback, context) {
	console.log('X TODO send email', context);
	return callback();
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





module.exports = function(err) {
	console.log('* starting graceful shutdown...');

	// make sure we don't get accidentally locked during shutdown
	var killtimer = setTimeout(function () {
		console.log('[%s] [worker:%s] kill timeout, exit now.', new Date(), process.pid);
		if (process.env.NODE_ENV !== 'domain_middleware_unit_test') {
			process.exit(1);
		}
	}, options.killTimeout);

	// But don't keep the process open just for that!
	// If there is no more io waiting, just let process exit normally.
	if (typeof killtimer.unref === 'function') {
		// only worked on node 0.10+
		killtimer.unref();
	}

	try {
		// stop taking new requests.
		// because server could be already closed, need try catch the error: `Error: Not running`
		options.server.close();
		console.warn('[%s] [worker:%s] closed server.',
			new Date(), process.pid);
	} catch (er2) {
		// oh well, not much we can do at this point.
		console.error('[%s] [worker:%s] Error on server close!\n%s',
			new Date(), process.pid, er2.stack);
	}

	// cluster mode
	if (cluster.worker) {
		try {
			// Let the master know we're dead.  This will trigger a
			// 'disconnect' in the cluster master, and then it will fork
			// a new worker.
			cluster.worker.disconnect();
			console.warn('[%s] [worker:%s] disconnected worker.',
				new Date(), process.pid);
		} catch (er2) {
			// oh well, not much we can do at this point.
			console.error('[%s] [worker:%s] Error on worker disconnect!\n%s',
				new Date(), process.pid, er2.stack);
		}
	}
};
