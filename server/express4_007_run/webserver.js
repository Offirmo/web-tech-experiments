#!/usr/bin/env node
'use strict';

// a minimal server to test error handling
var run_infos = require('./dump_environment_infos')
//run_infos.install_rsrc_watcher();
//run_infos.dump_infos();

console.error('test');

///////////////////////////////////////////////

// http://stackoverflow.com/a/18087021/587407
function patchEmitterForDebug(event_emitter, event_emitter_name) {
	var oldEmit = event_emitter.emit;
	event_emitter_name = event_emitter_name || '?';
	event_emitter.emit = function(event_id) {
		if(event_id !== 'newListener') {
			if(event_id === 'SIGINT')
				console.error(''); // to pass the ^C which was written in console
			console.error('! ' + event_emitter_name + '.' + event_id + ' -->' /* + ' with arguments :', arguments*/);
		}
		oldEmit.apply(event_emitter, arguments);
	};
}

function installDebugEventWatcher(event_emitter, event_id, event_emitter_name) {
	event_emitter_name = event_emitter_name || '?';
	event_emitter.on(event_id, function() {
		console.error('! --> ' + event_emitter_name + '.' + event_id /*+ '" with params :', arguments*/);
		// those signals may only have one handler, so let's do what the original handler would have done
		if(event_id === 'SIGHUP')
			process.exit(128 + 1);
		if(event_id === 'SIGINT')
			process.exit(128 + 2);
		if(event_id === 'SIGTERM')
			process.exit(128 + 15);
		if(event_id === 'SIGTSTP')
			process.exit(128 + 20);
	});
}

patchEmitterForDebug(process, 'process');

//installDebugEventWatcher(process, 'newListener', 'process');
installDebugEventWatcher(process, 'removeListener', 'process');
installDebugEventWatcher(process, 'exit', 'process');
installDebugEventWatcher(process, 'uncaughtException', 'process');

// unix signals, list taken from http://man7.org/linux/man-pages/man7/signal.7.html
// node infos http://nodejs.org/api/process.html#process_signal_events
installDebugEventWatcher(process, 'SIGHUP', 'process');
installDebugEventWatcher(process, 'SIGINT', 'process');
installDebugEventWatcher(process, 'SIGQUIT', 'process');
installDebugEventWatcher(process, 'SIGILL', 'process');
installDebugEventWatcher(process, 'SIGABRT', 'process');
installDebugEventWatcher(process, 'SIGFPE', 'process');
// SIGKILL : installing a handler is forbidden
installDebugEventWatcher(process, 'SIGSEGV', 'process');
installDebugEventWatcher(process, 'SIGPIPE', 'process');
installDebugEventWatcher(process, 'SIGALRM', 'process');
installDebugEventWatcher(process, 'SIGTERM', 'process');
installDebugEventWatcher(process, 'SIGUSR1', 'process');
installDebugEventWatcher(process, 'SIGUSR2', 'process');
installDebugEventWatcher(process, 'SIGCHLD', 'process');
installDebugEventWatcher(process, 'SIGCONT', 'process');
// SIGSTOP : installing a handler is forbidden
installDebugEventWatcher(process, 'SIGTSTP', 'process'); // Ctrl+Z ask for background ?
installDebugEventWatcher(process, 'SIGTTIN', 'process');
installDebugEventWatcher(process, 'SIGTTOU', 'process');




var cluster = require('cluster');
patchEmitterForDebug(cluster, 'cluster');
installDebugEventWatcher(cluster, 'fork', 'cluster');
installDebugEventWatcher(cluster, 'online', 'cluster');
installDebugEventWatcher(cluster, 'listening', 'cluster');
installDebugEventWatcher(cluster, 'disconnect', 'cluster');
installDebugEventWatcher(cluster, 'exit', 'cluster');
installDebugEventWatcher(cluster, 'setup', 'cluster');
if (cluster.isWorker) {
	patchEmitterForDebug(cluster.worker, 'cluster.worker');
	installDebugEventWatcher(cluster.worker, 'message', 'cluster.worker');
	installDebugEventWatcher(cluster.worker, 'online', 'cluster.worker');
	installDebugEventWatcher(cluster.worker, 'listening', 'cluster.worker');
	installDebugEventWatcher(cluster.worker, 'disconnect', 'cluster.worker');
	installDebugEventWatcher(cluster.worker, 'exit', 'cluster.worker');
	installDebugEventWatcher(cluster.worker, 'error', 'cluster.worker');
}

cluster.on('exit', function(worker, code, signal) {
	if (worker.suicide === true) {
		console.log('Oh, it was just suicide\'  no need to worry');
	}
});


///////////////////////////////////////////////
var express = require('express');

var listening_port = process.env.PORT || 4000;

var app = express();

app.use(require('morgan')('dev'));

var server;

// generic middleware, always called
app.use(function(req, res, next) {
	console.log('I´ll now throw a nasty async error...');
	setTimeout(function() {
		throw new Error('An exception thrown asynchronously !');
	}, 0);
});


process.on('uncaughtException', function(err){
	console.error('uncaught exception !', err);

	// ask the server to not accept new connections
	// and to wait for existing connections to close (may take a long time !)
	server.close(function() {
		// all connections are closed
		console.log('all closed');
		process.exit(1);  // all clear to exit
	});

	// safety
	setTimeout(function() {
		console.error("Shutdown taking too long ! Forcefully quitting…");
		process.exit(2);
	}, 9*1000); // 9s = slightly below heroku 10s limit
});

/************************************************************************/
server = app.listen(listening_port, function() {
	console.log('Now listening on port ' + listening_port);
	console.log('(Ctrl+C to stop)');
});
server.on('close', function() { console.log('close event', arguments); } );

//process.stdin.resume();//so the program will not close instantly
