/** This app shutdown sequence
 */
'use strict';

var cluster = require('cluster');
var _ = require('lodash');
var shutdown = require('../../--mini_incubator/shutdown');
var pretty_signals = require('../../../incubator/node_and_common/pretty_signals');
var forky = require('forky');



///////////////////// Exports /////////////////////

module.exports = shutdown;



///////////////////// Build shutdown sequence /////////////////////



// just log the shutdown params
shutdown.add_shutdown_step(function(callback, err, exit_code, misc) {
	console.log('* [shutdown log step] shutdown parameters :', err, exit_code, misc ? '{...}' : undefined);
	return callback(undefined, 'OK : logged.');
});


// tell our cluster master we are in trouble
// XXX if using forky, should call **forky**.disconnect
shutdown.add_shutdown_step(function(callback, err, exit_code, misc) {
	if(! cluster.worker)
		return callback(undefined, 'OK : no cluster master'); // not applicable
	if(! err)
		return callback(undefined, 'OK : no need to tell cluster master'); // no need to tell master.
		                                                         // It's most likely him who asked us to exit !

	console.log('X Fatal error detected : signaling it to cluster master...', err);
	//cluster.worker.disconnect();
	forky.disconnect();
	return callback(undefined, 'OK : cluster master signaled of our problems');
});

// send an email to admins
shutdown.add_shutdown_step(function(callback, err, exit_code, misc) {
	console.log('* [shutdown mail step] sending email...');
	setTimeout(function() {
		return callback(undefined, 'OK : email to admin sent. (simulated)');
	}, 300);
});

// do whatever other needed stuff
shutdown.add_shutdown_step(function(callback, err, exit_code, misc) {
	console.log('* [shutdown test step] forwarding websockets...');
	setTimeout(function() {
		return callback(undefined, 'OK : websockets forwarded. (simulated)');
	}, 100);
});





///////////////////// Set up shutdown triggers /////////////////////

// on uncaught
process.on('uncaughtException', function(err) {
	shutdown.start(err);
});

// on parent order
if(cluster.worker) cluster.worker.on('disconnect', function() {
	if(! shutdown.in_progress) shutdown.start();
});

// on signal
pretty_signals.set_exit_function(function(suggested_exit_code, signal_description) {
	shutdown.start(undefined, suggested_exit_code, {
		signal: signal_description.name,
		pretty_signal_description: signal_description
	});
});

// on domain







/*
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
 };*/

