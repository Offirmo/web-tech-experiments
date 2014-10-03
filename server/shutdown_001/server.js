#!/usr/bin/env node
'use strict';

// just run me with `node server`

console.log('Hello world !');


var cluster = require('cluster');
var pretty_signals = require('../../incubator/node/pretty_signals');
var shutdown = require('../--mini_incubator/shutdown');



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
pretty_signals.install_verbose_handlers();



///////////////////// special /////////////////////

// make console calls display its originating pid
require('../../incubator/node/assuming_console').install();



///////////////////// Build shutdown sequence /////////////////////

// tell our cluster master we are in trouble
// XXX if using forky, should call **forky**.disconnect
shutdown.add_shutdown_step(function(callback, err, exit_code, misc) {
	if(! cluster.worker) return callback(undefined, 'OK : no cluster master'); // not applicable
	if(!err) return callback(undefined, 'OK : no need to tell cluster master'); // no nedd to tell master. It's most likely him who asked us to exit !

	console.log('X Fatal error detected : signaling it to cluster master...', context);
	cluster.worker.disconnect();
	return callback(undefined, 'OK : cluster master signaled of our problems');
});

// send an email to admins
shutdown.add_shutdown_step(function(callback, err, exit_code, misc) {
	console.log('* sending email...', err, exit_code, misc);
	setTimeout(function() {
		return callback(undefined, 'OK : email to admin sent. (simulated)');
	}, 300);
});

// do whatever other needed stuff
shutdown.add_shutdown_step(function(callback, err, exit_code, misc) {
	console.log('* forwarding websockets...', err, exit_code, misc);
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




///////////////////////////////////////////////////////////////////////////

setTimeout(function() { /* locking code */ }, 1000000);


var test_err = new Error('foo');
//throw test_err;
//shutdown.start();
//shutdown.start(23);
//shutdown.start(test_err);
//test_err.exit_code = 56;
//shutdown.start(test_err);
//shutdown.start(new Error('foo'), 42);

setTimeout(function() {
//	throw test_err;
});
