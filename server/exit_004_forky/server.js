#!/usr/bin/env node
'use strict';

// just run me with `node server`

console.log('Hello world !');

///////////////////// Basic traces /////////////////////

process.on('uncaughtException', function() {
	console.error('X uncaughtException', arguments);
});

process.on('exit', function(code) {
	console.log('* About to exit with code :', code);
});




///////////////////// special /////////////////////


// make console calls display its originating pid
require('../../incubator/node/assuming_console').install();
var pretty_signals = require('../../incubator/node/pretty_signals');
pretty_signals.install_verbose_handlers();


///////////////////// Set up shutdown sequence /////////////////////

var shutdown = require('../--mini_incubator/shutdown');
shutdown.configure({
	// TODO
});

pretty_signals.set_exit_func(shutdown.launch);


shutdown.add_shutdown_step(function(callback, context) {
	console.log('* sending email...', context);
	setTimeout(function() {
		console.log('* email sent ! (simulated)');
		return callback();
	}, 100);
});

process.on('uncaughtException', function(err) {
	shutdown.launch(err);
});









var cluster = require('cluster');
var http = require('http');
var forky = require('forky');

// https://github.com/brianc/node-forky/blob/master/examples/master.js
forky.log = function() { console.log.apply(console, arguments) };


if (cluster.isMaster) {
	console.log('Hello world from master !');

	// cluster launch, heroku compatible and with nice features
	// https://github.com/brianc/node-forky
	console.log('* Production env, cluster launch…');

	forky(__dirname + '/server');
}
else {
	console.log('Hello world from worker !');

	cluster.worker.on('exit', function(code, signal) {
		if( signal )
			console.log('* I worker am killed by signal :', signal);
		else if( code )
			console.log('* I worker am exited with error code :', code);
		else
			console.log('* I worker exit naturally.');
	});

	cluster.worker.on('disconnect', function() {
		console.log('worker - seen cluster disconnect event');
		if(! shutdown.is_launched()) shutdown.launch(0);
	});

	// add basic shutdown steps
	//shutdown.add_worker_disconnect_shutdown_callback();

	// monitor worker status to avoid disconnecting it twice
	var isWorkerDisconnected = false;
	cluster.worker.on('disconnect', function() {
		isWorkerDisconnected = true;
	});

	shutdown.add_shutdown_step(function disconnect_worker(callback) {
		if (isWorkerDisconnected) return callback();

		console.log('* forky worker planning a disconnect from master...');
		setTimeout(function() {
			console.log('* forky worker disconnecting from master...');
			forky.disconnect();
			return callback();
		}, 200); // with a delay in case of
	});




	var server = http.createServer(function(req, res) {
		res.writeHead(200);
		res.end("hello world\n");
	}).listen(8000);

	server.on('close', function() {
		console.log('worker - seen server close event');
	});

	/*setTimeout(function() {
		console.log('worker - I die');
		//process.exit(5);
		//shutdown.launch(5);
		throw new Error('async error !');
	}, 250);*/

	/*setTimeout(function() {
		console.log('worker - I die twice');
		shutdown.launch(6);
	}, 260);*/
}
