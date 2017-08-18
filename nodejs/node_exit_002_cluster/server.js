#!/usr/bin/env node
'use strict';

// just run me with `node server`

console.log(process.pid, 'Hello world !');

process.on('uncaughtException', function() {
	console.error(process.pid, '* uncaughtException', arguments);
});

process.on('exit', function(code) {
	console.log(process.pid, '* (1) About to exit with code :', code);
});

process.on('exit', function(code) {
	console.log(process.pid, '* (2) About to exit with code :', code);
});

// setting a handler remove default action (exit)
process.on('SIGTERM', function() {
	console.log(process.pid, '* seen SIGTERM...');
});

process.on('SIGABRT', function() {
	console.log(process.pid, '* seen SIGABRT...');
});



console.log(process.pid, 'stdout');
console.error(process.pid, 'stderr');


setTimeout(function() {
	console.log(process.pid, 'Will I be executed ?');
}, 1000);



var cluster = require('cluster');
var http = require('http');

if (cluster.isMaster) {
	console.log(process.pid, 'Hello world from master !');
	// Fork workers.
	for (var i = 0; i < 1; i++) {
		var worker = cluster.fork();
		worker.on('exit', function(code, signal) {
			if( signal ) {
				console.log(process.pid, "worker was killed by signal: "+signal);
			} else if( code !== 0 ) {
				console.log(process.pid, "worker exited with error code: "+code);
			} else {
				console.log(process.pid, "worker success!");
			}
		});

		setTimeout(function() {
			console.log(process.pid, 'master - I kill the worker');
			worker.disconnect();
		}, 250);
	}

	cluster.on('exit', function(worker, code, signal) {
		console.log(process.pid, 'worker ' + worker.process.pid + ' died');
	});
}
else {
	console.log(process.pid, 'Hello world from worker !');


	var server = http.createServer(function(req, res) {
		res.writeHead(200);
		res.end("hello world\n");
	}).listen(8000);

	server.on('close', function() {
		console.log(process.pid, 'worker - server seen close event');
	});

	cluster.worker.on('disconnect', function() {
		console.log(process.pid, 'worker - server disconnect event');
	});

	cluster.worker.on('exit', function(code, signal) {
		if( signal ) {
			console.log(process.pid, "worker was killed by signal: "+signal);
		} else if( code !== 0 ) {
			console.log(process.pid, "worker exited with error code: "+code);
		} else {
			console.log(process.pid, "worker success!");
		}
	});

	/*setTimeout(function() {
		console.log(process.pid, 'worker - I die');
		process.exit(5);
		//cluster.worker.disconnect();
		//process.disconnect();
	}, 250);

	setTimeout(function() {
		console.log(process.pid, 'worker - I die twice');
		cluster.worker.disconnect();
		//process.disconnect();
	}, 260);*/
}


//process.exit(5);
//process.abort();
//process.disconnect();  <-- besoin d'être un child process
//process.kill(process.pid); // send default SIGTERM, which may kill us or not depending on the presence of a handler
//process.kill(process.pid, 'SIGHUP'); // may kill us or not depending on the presence of a handler
//process.kill(process.pid, 'SIGSTOP'); // this signal cannot be overriden
//process.kill(process.pid, 'SIGKILL'); // this signal cannot be overriden
//process.kill(process.pid, 'SIGUSR2');

// see also : https://www.npmjs.org/package/exit
// https://github.com/joyent/node/issues/8329
//var betterExit = require('exit'); // to exit with all output flushed, important.
//betterExit(5);



console.log(process.pid, 'XXX stdout');
console.error(process.pid, 'XXX stderr');
