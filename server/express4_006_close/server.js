#!/usr/bin/env node
'use strict';

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
	// and to wait for existing connections to close.
	server.close(function() {
		// all connections are closed
		console.log('all closed');
		process.exit(1);  // all clear to exit
	});

	// safety
	setTimeout(function() {
		console.error("Shutdown taking too long ! Forcefully quitting…");
		process.exit(2);
	}, 5*1000);
});

/************************************************************************/
server = app.listen(listening_port, function() {
	console.log('Now listening on port ' + listening_port);
	console.log('(Ctrl+C to stop)');
});
server.on('close', function() { console.log('close event', arguments); } );
