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

// setting a handler remove default action (exit)
/*process.on('SIGTERM', function() {
	console.log('* seen SIGTERM...');
});

process.on('SIGABRT', function() {
	console.log('* seen SIGABRT...');
});*/




///////////////////// special /////////////////////


// make console calls display its originating pid
require('../../incubator/node/assuming_console').install();
var pretty_signals = require('../../incubator/node/pretty_signals');
pretty_signals.install_verbose_handlers();

console.log('stdout');
console.error('stderr');


setTimeout(function() {
	console.log('Will I be executed ?');
}, 1000);



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

if (cluster.isMaster) {
	console.log('Hello world from master !');
	// Fork workers.
	for (var i = 0; i < 1; i++) {
		var worker = cluster.fork();
		worker.on('exit', function(code, signal) {
			if( signal ) {
				console.log("worker was killed by signal: "+signal);
			} else if( code !== 0 ) {
				console.log("worker exited with error code: "+code);
			} else {
				console.log("worker success!");
			}
		});

		setTimeout(function() {
			console.log('master - I kill the worker');
			worker.disconnect();
		}, 250);
	}

	cluster.on('exit', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
	});
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

	process.on('disconnect', function() {
		console.log('worker - seen process disconnect event');
		if(! shutdown.is_launched()) shutdown.launch(0);
	});

	// add basic shutdown steps
	shutdown.add_worker_disconnect_shutdown_callback();

	var server = http.createServer(function(req, res) {
		res.writeHead(200);
		res.end("hello world\n");
	}).listen(8000);

	server.on('close', function() {
		console.log('worker - seen server close event');
	});

	/*setTimeout(function() {
		console.log('worker - I die');
		process.exit(5);
		//shutdown.launch(5);
		//throw new Error('async error !');
	}, 250);*/

	/*setTimeout(function() {
		console.log('worker - I die twice');
		shutdown.launch(6);
	}, 260);*/
}


//process.exit(5);
//process.abort();
//process.disconnect();  <-- besoin d'être un child process
//process.kill(process.pid); // send default SIGTERM, which may kill us or not depending on the presence of a handler
//process.kill('SIGHUP'); // may kill us or not depending on the presence of a handler
//process.kill('SIGSTOP'); // this signal cannot be overriden
//process.kill('SIGKILL'); // this signal cannot be overriden
//process.kill('SIGUSR2');

// see also : https://www.npmjs.org/package/exit
// https://github.com/joyent/node/issues/8329
//var betterExit = require('exit'); // to exit with all output flushed, important.
//betterExit(5);



console.log('XXX stdout');
console.error('XXX stderr');
