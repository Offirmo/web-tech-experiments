#!/usr/bin/env node
'use strict';

// just run me with `node server`

console.log('Hello world !');

/*
process.on('uncaughtException', function() {
	console.error('* (1) uncaughtException', arguments);
});

process.on('uncaughtException', function() {
	console.error('* (2) uncaughtException', arguments);
});*/

process.on('exit', function(code) {
	console.log('* (1) process.exit : About to exit with code :', code);
});

process.on('exit', function(code) {
	console.log('* (2) process.exit : About to exit with code :', code);
});

process.on('error', function() {
	console.log('* process error ?', arguments);
});

// setting a handler remove default action (exit)
process.on('SIGTERM', function() {
	console.log('* seen SIGTERM...');
});

process.on('SIGABRT', function() {
	console.log('* seen SIGABRT...');
});



console.log('stdout');
console.error('stderr');


setTimeout(function() {
	console.log('Will I be executed ?'); // no
}, 1000);



setTimeout(function() { throw new Error('async error !');});
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



console.log('XXX stdout');
console.error('XXX stderr');
