#!/usr/bin/env node
'use strict';

console.log('Hello world !');

process.on('uncaughtException', function(err){
	console.error('uncaught exception !', err);
});

// http://nodejs.org/api/domain.html#domain_domain
// interesting reads :
// http://stackoverflow.com/questions/19461234/domains-not-properly-catching-errors-while-testing-nodejs-in-mocha
var domain = require('domain');


var d = domain.create();
d.on('error', function(err) {
	console.error('domain caught error', err);

	// Note: we're in dangerous territory!
	// By definition, something unexpected occurred,
	// which we probably didn't want.
	// Anything can happen now!  Be very careful!

	try {
		// make sure we close down within 30 seconds
		var killtimer = setTimeout(function () {
			process.exit(1);
		}, 30000);
		// But don't keep the process open just for that!
		killtimer.unref();

		// stop taking new requests.
		// ...

		// Let the master know we're dead.  This will trigger a
		// 'disconnect' in the cluster master, and then it will fork
		// a new worker.
		//cluster.worker.disconnect();

		// try to send an error to the request that triggered the problem
	} catch (err2) {
		// oh well, not much we can do at this point.
		console.error('Error sending 500 !', err2.stack);
	}
});

function callback() {
	throw new Error('Ah ah a nasty error !');
}

// 1 - no domain
//setTimeout(callback);

// 2 - domain on callback
//setTimeout(d.intercept(callback));

// 3 - auto-bound domain
d.run(function() {
	setTimeout(callback);
});

