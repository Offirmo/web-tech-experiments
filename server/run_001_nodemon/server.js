#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// I feel that nodemon is not working well. Let's test it.

process.on('exit', function(code) {
	console.log('* process.exit detected, about to exit with code :', code);
});

process.once('SIGUSR2', function(code) {
	console.log('* SIGUSR2 detected');
	//process.kill(process.pid, 'SIGUSR2');
	//process.abort();
	//process.exit(1);
	/*setInterval(function() {
		console.log('* exiting');
		process.exit(1);
	}, 1000);*/
});

//process.exit(1);

setInterval(function() {
	console.log('still alive...');
}, 2 * 1000);

