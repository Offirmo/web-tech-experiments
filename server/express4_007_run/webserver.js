#!/usr/bin/env node
'use strict';

// a minimal server to test error handling

console.log('\n*** Hello from cluster master ! ***');


///////////////////////////////////////////////
var util = require('util');

console.log('This app entry point :', require.main.filename);
console.log('Am I the entry point ? ' + (require.main === module));

// http://stackoverflow.com/a/18087021/587407
function patchEmitterForDebug(event_emitter, event_emitter_name) {
	var oldEmit = event_emitter.emit;
	event_emitter_name = event_emitter_name || '?';

	event_emitter.emit = function(event_id) {
		console.log('! intercepted event emission of "' + event_id + '" from "' + event_emitter_name + '" with arguments :', arguments);
		oldEmit.apply(event_emitter, arguments);
	};
}

function installDebugEventWatcher(event_emitter, event_id, event_emitter_name) {
	event_emitter_name = event_emitter_name || '?';
	event_emitter.on(event_id, function() {
		if(event_id === 'SIGINT')
			console.log(''); // to pass the ^C which was written in console
		console.log('! got event "' + event_id + '" from "' + event_emitter_name + '" with params :', arguments);
		if(event_id === 'SIGINT')
			process.exit(128 + 2);
		if(event_id === 'SIGTERM')
			process.exit(128 + 15);
	});
}

patchEmitterForDebug(process, 'process');
installDebugEventWatcher(process, 'newListener', 'process');
installDebugEventWatcher(process, '*', 'process');

installDebugEventWatcher(process, 'removeListener', 'process');
installDebugEventWatcher(process, 'exit', 'process');
installDebugEventWatcher(process, 'uncaughtException', 'process');

// unix signals, list taken from http://man7.org/linux/man-pages/man7/signal.7.html
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
installDebugEventWatcher(process, 'SIGTSTP', 'process');
installDebugEventWatcher(process, 'SIGTTIN', 'process');
installDebugEventWatcher(process, 'SIGTTOU', 'process');




console.log(process.env);
console.log('getgid', process.getgid());
console.log('getuid', process.getuid());
console.log('getgroups', process.getgroups());
console.log('process.version', process.version);
console.log('process.versions', process.versions);
console.log('process.config', process.config);
console.log('process.pid', process.pid);
console.log('process.title', process.title);
console.log('process.arch', process.arch);
console.log('process.platform', process.platform);
console.log('process.maxTickDepth', process.maxTickDepth);
console.log('process.umask()', process.umask());

console.log('process.memoryUsage()', process.memoryUsage());
console.log('process.uptime()', process.uptime());
console.log('process.hrtime()', process.hrtime());

setInterval(function() {
	console.log('process.memoryUsage()', process.memoryUsage());
	console.log('process.uptime()', process.uptime());
}, 10 * 1000).unref();


var cluster = require('cluster');
patchEmitterForDebug(cluster, 'cluster');
installDebugEventWatcher(cluster, 'fork', 'cluster');
installDebugEventWatcher(cluster, 'online', 'cluster');
installDebugEventWatcher(cluster, 'listening', 'cluster');
installDebugEventWatcher(cluster, 'disconnect', 'cluster');
installDebugEventWatcher(cluster, 'exit', 'cluster');
installDebugEventWatcher(cluster, 'setup', 'cluster');

console.log('cluster.isMaster', cluster.isMaster);
console.log('cluster.isWorker', cluster.isWorker);
if (cluster.isWorker) {
	console.log('I am worker #' + cluster.worker.id);
	console.log('cluster.worker', cluster.worker);
	patchEmitterForDebug(cluster.worker, 'cluster.worker');
	installDebugEventWatcher(cluster.worker, 'message', 'cluster.worker');
	installDebugEventWatcher(cluster.worker, 'online', 'cluster.worker');
	installDebugEventWatcher(cluster.worker, 'listening', 'cluster.worker');
	installDebugEventWatcher(cluster.worker, 'disconnect', 'cluster.worker');
	installDebugEventWatcher(cluster.worker, 'exit', 'cluster.worker');
	installDebugEventWatcher(cluster.worker, 'error', 'cluster.worker');
}


var os = require('os');
console.log('os.cpus()', os.cpus());
console.log(util.inspect(os.cpus(), { depth: null, colors: true }));


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
